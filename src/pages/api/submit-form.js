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
      // ✅ Step 1: Server-side reCAPTCHA verification
      const recaptchaToken = fields['g-recaptcha-response'] || fields['g_recaptcha_response'];
      if (!recaptchaToken) {
        return res.status(400).json({ message: 'reCAPTCHA token missing' });
      }

      const captchaVerifyRes = await axios.post(
        'https://www.google.com/recaptcha/api/siteverify',
        new URLSearchParams({
          secret: process.env.RECAPTCHA_SECRET_KEY,
          response: recaptchaToken,
          remoteip: req.headers['x-forwarded-for'] || req.connection.remoteAddress || '',
        }).toString(),
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        }
      );

      if (!captchaVerifyRes.data.success) {
        console.warn('reCAPTCHA verification failed:', captchaVerifyRes.data);
        return res.status(400).json({
          message: 'reCAPTCHA verification failed',
          errors: captchaVerifyRes.data['error-codes'],
        });
      }

      // ✅ Step 2: Build the formData to send to Gravity Forms
      const formData = new FormData();

      // Append fields
      for (const key in fields) {
        const value = fields[key];
        formData.append(key, Array.isArray(value) ? value.join(', ') : value);
      }

      // Append valid uploaded files
      for (const key in files) {
        const file = files[key];
        const fileList = Array.isArray(file) ? file : [file];

        for (const f of fileList) {
          if (!f || !f.filepath || !fs.existsSync(f.filepath) || f.size === 0) {
            console.warn(`⚠️ Skipping empty or invalid file for key "${key}"`);
            continue;
          }

          console.log(`Uploading file: ${f.originalFilename}`);
          formData.append(key, fs.createReadStream(f.filepath), f.originalFilename);
        }
      }

      // ✅ Step 3: Submit to Gravity Forms REST API
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
      return res.status(200).json({ message: 'Form submitted successfully', data: gfResponse.data });

    } catch (error) {
      console.error('Form submission error:', error.message);
      return res.status(500).json({
        message: 'Submission failed',
        error: error.response?.data || error.message,
      });
    }
  });
}
