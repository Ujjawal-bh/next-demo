import formidable from 'formidable';
import fs from 'fs';
import axios from 'axios';
import FormData from 'form-data';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const form = formidable({
    multiples: true,
    keepExtensions: true,
    allowEmptyFiles: true,
    minFileSize: 0,
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Form parsing error:', err);
      return res.status(500).json({ message: 'Form parsing error' });
    }

    try {
      // ✅ 1. Server-side reCAPTCHA verification
      const recaptchaToken = fields['g-recaptcha-response'] || fields['g_recaptcha_response'];
      if (!recaptchaToken) {
        return res.status(400).json({ message: 'reCAPTCHA token missing' });
      }

      const verifyRes = await axios.post(
        `https://www.google.com/recaptcha/api/siteverify`,
        null,
        {
          params: {
            secret: process.env.RECAPTCHA_SECRET_KEY,
            response: recaptchaToken,
          },
        }
      );

      if (!verifyRes.data.success) {
        console.warn('reCAPTCHA verification failed:', verifyRes.data);
        return res.status(400).json({ message: 'reCAPTCHA verification failed' });
      }

      // ✅ 2. Prepare form data to send to Gravity Forms
      const formData = new FormData();

      // Append all fields
      for (const key in fields) {
        const value = fields[key];
        formData.append(key, Array.isArray(value) ? value.join(', ') : value);
      }

      // Append files if valid
      for (const key in files) {
        const file = files[key];
        const fileList = Array.isArray(file) ? file : [file];

        for (const f of fileList) {
          if (!f || !f.filepath || !fs.existsSync(f.filepath) || f.size === 0) {
            console.warn(`⚠️ Skipping invalid file for key "${key}"`);
            continue;
          }

          console.log(`Uploading file: ${f.originalFilename}`);
          formData.append(key, fs.createReadStream(f.filepath), f.originalFilename);
        }
      }

      // ✅ 3. Submit to Gravity Forms REST API
      const gfResponse = await axios.post(
        `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/gf/v2/forms/${process.env.NEXT_PUBLIC_GF_FORM_ID}/submissions`,
        formData,
        {
          headers: {
            ...formData.getHeaders(),
            Authorization: `Basic ${Buffer.from(
              `${process.env.GF_CONSUMER_KEY}:${process.env.GF_CONSUMER_SECRET}`
            ).toString('base64')}`,
          },
        }
      );

      console.log('Gravity Forms response:', gfResponse.data);
      res.status(200).json({ message: 'Form submitted', data: gfResponse.data });

    } catch (error) {
      console.error('Gravity Forms Submission Error');

      if (error.response) {
        console.error('Status:', error.response.status);
        console.error('Headers:', error.response.headers);
        console.error('Data:', error.response.data);
      } else {
        console.error('Error:', error.message);
      }

      res.status(500).json({
        message: 'Submission failed',
        error: error.response?.data || error.message,
      });
    }
  });
}
