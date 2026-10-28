import React from "react";
import logo from "@/assets/logo-color.png"; // update path if needed

const TermsConditions = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_260px] gap-8">

        {/* LEFT CONTENT */}
        <main className="text-gray-800 text-sm leading-snug">
          <h1 className="text-2xl font-semibold mb-4">
            Terms & Conditions
          </h1>

          {/* 1 */}
          <section className="mb-4">
            <h2 className="font-semibold mb-1">1. Purpose of Hirees</h2>
            <p>
              Hirees is a job portal operated by <strong>Fstone Technologies</strong>
              and is intended solely to facilitate genuine employment-related
              interactions between job seekers and recruiters. The Platform may
              also offer career enhancement tools, alerts, and related services.
            </p>
          </section>

          {/* 2 */}
          <section className="mb-4">
            <h2 className="font-semibold mb-1">2. Eligibility</h2>
            <p>
              You must be at least 18 years of age and legally competent to enter
              into a binding contract under applicable Indian laws. By using the
              Platform, you confirm that all information provided by you is true,
              accurate, and up to date.
            </p>
          </section>

          {/* 3 */}
          <section className="mb-4">
            <h2 className="font-semibold mb-1">3. Acceptable Use</h2>
            <ul className="list-disc ml-5 space-y-1">
              <li>Use Hirees only for lawful employment-related purposes.</li>
              <li>
                Do not copy, scrape, crawl, reproduce, sell, or commercially
                exploit Platform data.
              </li>
              <li>
                Do not share login credentials or allow unauthorized access.
              </li>
              <li>
                Do not use the Platform for spam, fraud, or misleading activity.
              </li>
            </ul>
          </section>

          {/* 4 */}
          <section className="mb-4">
            <h2 className="font-semibold mb-1">4. User Responsibilities</h2>
            <p>
              You are solely responsible for maintaining the confidentiality of
              your account credentials and for all activity conducted through
              your account. Hirees shall not be liable for any loss arising from
              misuse of your account.
            </p>
          </section>

          {/* 5 */}
          <section className="mb-4">
            <h2 className="font-semibold mb-1">
              5. Content & Conduct Guidelines
            </h2>
            <p className="mb-1">
              Users must not upload, publish, or transmit content that:
            </p>
            <ul className="list-disc ml-5 space-y-1">
              <li>Is unlawful, abusive, obscene, or defamatory.</li>
              <li>Violates intellectual property or privacy rights.</li>
              <li>Contains malware, viruses, or harmful code.</li>
              <li>Impersonates any person or organization.</li>
            </ul>
          </section>

          {/* 6 */}
          <section className="mb-4">
            <h2 className="font-semibold mb-1">
              6. Recruiter & Jobseeker Disclaimer
            </h2>
            <p>
              Hirees does not guarantee job offers, interviews, recruiter
              responses, or employment outcomes. Users are responsible for
              verifying the authenticity of job postings and recruiter
              communications.
            </p>
          </section>

          {/* 7 */}
          <section className="mb-4">
            <h2 className="font-semibold mb-1">
              7. Communications & Platform Security
            </h2>
            <p>
              To prevent fraud and misuse, Hirees may apply automated systems,
              masking, filtering, or limited review of communications in
              accordance with applicable law. These actions are performed as
              due diligence and not as surveillance.
            </p>
          </section>

          {/* 8 */}
          <section className="mb-4">
            <h2 className="font-semibold mb-1">8. Payments</h2>
            <p>
              Where paid services are offered, fees must be paid in advance and
              are non-refundable unless explicitly stated. Hirees does not store
              credit or debit card details. Payments are processed via secure
              third-party gateways.
            </p>
          </section>

          {/* 9 */}
          <section className="mb-4">
            <h2 className="font-semibold mb-1">
              9. Intellectual Property
            </h2>
            <p>
              All Platform content, branding, software, and design belong to
              Fstone Technologies or its licensors. Users retain ownership of
              their uploaded content but grant Hirees a limited license to
              display it for Platform operations.
            </p>
          </section>

          {/* 10 */}
          <section className="mb-4">
            <h2 className="font-semibold mb-1">
              10. Limitation of Liability
            </h2>
            <p>
              To the maximum extent permitted by law, Fstone Technologies shall
              not be liable for indirect, incidental, or consequential damages.
              Any liability shall be limited to the amount paid for services.
            </p>
          </section>

          {/* 11 */}
          <section className="mb-4">
            <h2 className="font-semibold mb-1">11. Termination</h2>
            <p>
              Hirees reserves the right to suspend or terminate access without
              notice if these Terms are violated or if required by law or
              security considerations.
            </p>
          </section>

          {/* 12 */}
          <section className="mb-4">
            <h2 className="font-semibold mb-1">
              12. Governing Law & Disputes
            </h2>
            <p>
              These Terms are governed by the laws of India. Any disputes shall
              be resolved by arbitration seated in New Delhi, and courts in New
              Delhi shall have exclusive jurisdiction.
            </p>
          </section>

          {/* 13 */}
          <section className="mb-4">
            <h2 className="font-semibold mb-1">13. Amendments</h2>
            <p>
              Fstone Technologies may modify these Terms at any time. Continued
              use of the Platform constitutes acceptance of the updated Terms.
            </p>
          </section>

          {/* CONTACT */}
          <section>
            <h2 className="font-semibold mb-1">14. Contact Information</h2>
            <p>
              For questions or concerns regarding these Terms, contact:
            </p>
            <p className="font-medium">
              📧 info@fstonetechnologies.com
            </p>
          </section>
        </main>

        {/* RIGHT LOGO */}
        <aside className="md:sticky md:top-24 h-fit flex justify-center md:justify-end">
          <div className="text-center">
            <img
              src={logo}
              alt="Fstone Technologies"
              className="w-48 object-contain mx-auto"
            />
          </div>
        </aside>

      </div>
    </div>
  );
};

export default TermsConditions;
