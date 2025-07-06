import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

function PrivacyPolicy() {
  useEffect(() => {
    document.title = 'Privacy Policy | Elevat Rehabilitation Center';
  }, []);

  return (
    <div className="min-h-screen py-16 bg-gray-50">
      <div className="container">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
          
          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
              <p className="mb-4">
                At Elavat Rehabilitation Center, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">2. Information We Collect</h2>
              <h3 className="text-xl font-bold mb-2">Personal Information:</h3>
              <ul className="list-disc pl-6 mb-4">
                <li>Name and contact information</li>
                <li>Date of birth</li>
                <li>Medical history and conditions</li>
                <li>Emergency contact details</li>
              </ul>

              <h3 className="text-xl font-bold mb-2">Technical Information:</h3>
              <ul className="list-disc pl-6 mb-4">
                <li>Device and browser information</li>
                <li>IP address</li>
                <li>Usage data</li>
                <li>Cookies and similar technologies</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">3. How We Use Your Information</h2>
              <p className="mb-4">We use your information to:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Provide and improve our services</li>
                <li>Communicate with you about appointments and treatment</li>
                <li>Comply with legal obligations</li>
                <li>Send you relevant updates and information</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">4. Information Sharing and Disclosure</h2>
              <p className="mb-4">
                We may share your information with:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Healthcare providers involved in your treatment</li>
                <li>Legal authorities when required by law</li>
                <li>Service providers who assist in our operations</li>
              </ul>
              <p className="mb-4">
                We will never sell your personal information to third parties.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">5. Data Security</h2>
              <p className="mb-4">
                We implement appropriate technical and organizational measures to protect your personal information, including:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Encryption of data in transit and at rest</li>
                <li>Regular security assessments</li>
                <li>Employee training on privacy and security</li>
                <li>Access controls and authentication measures</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">6. Your Rights</h2>
              <p className="mb-4">
                You have the right to:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Access your personal information</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your information</li>
                <li>Opt-out of marketing communications</li>
                <li>File a complaint with regulatory authorities</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">7. Cookies and Tracking</h2>
              <p className="mb-4">
                We use cookies and similar tracking technologies to improve your experience on our website. You can control cookie settings through your browser preferences.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">8. Children's Privacy</h2>
              <p className="mb-4">
                We do not knowingly collect information from children under 13 without parental consent. If you believe we have inadvertently collected such information, please contact us immediately.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">9. Changes to This Policy</h2>
              <p className="mb-4">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last Updated" date.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">10. Contact Us</h2>
              <p className="mb-4">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p>Email: info@elevatrehabilitationcenter.org</p>
                <p>Phone: +254 704 376 452</p>
                <p>Address: 2344, Kiambu</p>
              </div>
            </section>
          </div>

          <div className="mt-8 pt-8 border-t">
            <p className="text-gray-600 text-sm">
              Last updated: June 15, 2025
            </p>
            <p className="text-gray-600 text-sm mt-2">
              For more information about our terms of service, please review our{' '}
              <Link to="/terms-of-service" className="text-blue-600 hover:text-blue-800">
                Terms of Service
              </Link>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;