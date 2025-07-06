import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

function TermsOfService() {
  useEffect(() => {
    document.title = 'Terms of Service | Elevat Rehabilitation Center';
  }, []);

  return (
    <div className="min-h-screen py-16 bg-gray-50">
      <div className="container">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
          
          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">1. Agreement to Terms</h2>
              <p className="mb-4">
                By accessing and using Elevat Rehabilitation Center's services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">2. Description of Services</h2>
              <p className="mb-4">
                Elevat Rehabilitation Center provides mental health and rehabilitation services, including but not limited to:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Individual therapy sessions</li>
                <li>Psychological assessments</li>
                <li>Mental health resources and educational materials</li>
                <li>Rehabilitation programs</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">3. User Responsibilities</h2>
              <p className="mb-4">
                Users of Elevat Rehabilitation Center services agree to:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Provide accurate and complete information</li>
                <li>Maintain the confidentiality of their account credentials</li>
                <li>Comply with all applicable laws and regulations</li>
                <li>Respect the privacy and rights of other users</li>
              </ul>
            </section>

            {/* <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">4. Payment Terms</h2>
              <p className="mb-4">
                Payment for services is required at the time of booking unless otherwise specified. We accept major credit cards and insurance plans as outlined in our payment policy.
              </p>
              <p className="mb-4">
                Cancellations must be made at least 24 hours in advance to avoid charges.
              </p>
            </section> */}

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">4. Privacy and Confidentiality</h2>
              <p className="mb-4">
                We are committed to protecting your privacy and maintaining the confidentiality of your health information. For more details, please review our{' '}
                <Link to="/privacy-policy" className="text-blue-600 hover:text-blue-800">
                  Privacy Policy
                </Link>.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">5. Limitation of Liability</h2>
              <p className="mb-4">
                Elevat Rehabilitation Center shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">6. Changes to Terms</h2>
              <p className="mb-4">
                We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to our website. Your continued use of our services constitutes acceptance of these changes.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">7. Contact Information</h2>
              <p className="mb-4">
                If you have any questions about these Terms of Service, please contact us at:
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default TermsOfService;