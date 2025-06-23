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

  const form = formidable({ multiples: true, keepExtensions: true, allowEmptyFiles: true, minFileSize: 0  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Form parsing error:', err);
      return res.status(500).json({ message: 'Form parsing error' });
    }

    try {
      const formData = new FormData();

      // Append form fields
      for (const key in fields) {
        const value = fields[key];
        formData.append(key, Array.isArray(value) ? value.join(', ') : value);
      }

      // Append uploaded files (only if present and valid)
      // Append uploaded files (only if valid)
for (const key in files) {
  const file = files[key];
  const fileList = Array.isArray(file) ? file : [file];

  for (const f of fileList) {
    // Skip if no file was uploaded
    if (!f || !f.filepath || !fs.existsSync(f.filepath) || f.size === 0) {
      console.warn(`⚠️ Skipping empty or invalid file for key "${key}"`);
      continue;
    }

    console.log(`Uploading file: ${f.originalFilename}`);
    formData.append(key, fs.createReadStream(f.filepath), f.originalFilename);
  }
}


      // Send to Gravity Forms REST API
      const response = await axios.post(
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

      console.log('Gravity Forms response:', response.data);
      res.status(200).json({ message: 'Form submitted', data: response.data });
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
