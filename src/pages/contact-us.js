import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import client from "../lib/apolloClient";
import Layout from "@/components/layout/Layout";
import { GET_HEADER_FOOTER } from "../graphql/queries/getHeaderFooter";

export default function Contact(props) {
  const [status, setStatus] = useState("");
  const [errors, setErrors] = useState({});
  const recaptchaRef = useRef();

  const validateForm = (formData) => {
    const newErrors = {};

    if (!formData.get("input_1")?.trim()) {
      newErrors.input_1 = "Name is required";
    }

    const email = formData.get("input_3")?.trim();
    if (!email) {
      newErrors.input_3 = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.input_3 = "Invalid email format";
    }

    if (!formData.get("input_4")?.trim()) {
      newErrors.input_4 = "Message is required";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");
    setErrors({});

    const formData = new FormData(e.target);
    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      // Execute reCAPTCHA
      const token = await recaptchaRef.current.executeAsync();
      recaptchaRef.current.reset();
      formData.append("g-recaptcha-response", token);

      console.log('reCAPTCHA token:', token);
      setStatus("Submitting...");

      const res = await fetch("/api/submit-form", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();
      console.log('reCAPTCHA verified:', result.recaptcha);
      if (res.ok) {
        setStatus("Form submitted successfully!");
        e.target.reset();
      } else {
        setStatus(`Error: ${result.message}`);
      }
    } catch (err) {
      console.error(err);
      setStatus("Something went wrong.");
    }
  };

  return (
    <Layout menuItem={props.menuItem} themeOption={props.themeOptions}>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="w-full max-w-lg bg-white shadow-lg rounded-xl p-8 space-y-6"
        >
          <h2 className="text-2xl font-semibold text-gray-800">Contact Us</h2>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              name="input_1"
              placeholder="Your name"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.input_1 ? "border-red-500" : "focus:ring-blue-500"
              }`}
            />
            {errors.input_1 && (
              <p className="text-red-500 text-sm mt-1">{errors.input_1}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="input_3"
              placeholder="you@example.com"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.input_3 ? "border-red-500" : "focus:ring-blue-500"
              }`}
            />
            {errors.input_3 && (
              <p className="text-red-500 text-sm mt-1">{errors.input_3}</p>
            )}
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Message
            </label>
            <textarea
              name="input_4"
              rows="4"
              placeholder="Your message..."
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.input_4 ? "border-red-500" : "focus:ring-blue-500"
              }`}
            />
            {errors.input_4 && (
              <p className="text-red-500 text-sm mt-1">{errors.input_4}</p>
            )}
          </div>

          {/* File */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload File
            </label>
            <input
              type="file"
              name="input_5"
              className={`block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:border-0 file:rounded-md file:bg-blue-600 file:text-white hover:file:bg-blue-700 ${
                errors.input_5 ? "border border-red-500 rounded-md mt-1" : ""
              }`}
            />
          </div>
            
          {/* Invisible reCAPTCHA */}
          <ReCAPTCHA
            ref={recaptchaRef}
            size="invisible"
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
          />

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition"
          >
            Submit
          </button>

          {/* Status */}
          {status && (
            <p className="text-sm text-center text-gray-600 mt-2">{status}</p>
          )}
        </form>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const { data } = await client.query({
    query: GET_HEADER_FOOTER,
  });

  return {
    props: {
      menuItem: data?.menuItems?.nodes || [],
      themeOptions: data?.themeOptions?.themeSettings || [],
    },
    revalidate: 60,
  };
}
