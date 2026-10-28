import React from "react";
import logo from "@/assets/logo-color.png"; // update path if needed

const CookiePolicy = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_260px] gap-8">

        {/* LEFT CONTENT */}
        <main className="text-gray-800 text-sm leading-snug">
          <h1 className="text-2xl font-semibold mb-4">Cookie Policy</h1>

          {/* 1 */}
          <section className="mb-4">
            <h2 className="font-semibold mb-1">1. Introduction</h2>
            <p>
              This Cookie Policy explains how <strong>Fstone Technologies </strong>
                we uses cookies and similar technologies on
              the <strong>Hirees</strong> job portal (“Platform”). This Policy
              should be read together with our Privacy Policy.
            </p>
          </section>

          {/* 2 */}
          <section className="mb-4">
            <h2 className="font-semibold mb-1">2. What Are Cookies?</h2>
            <p>
              Cookies are small text files stored on your device when you visit
              a website. Cookies help websites function efficiently, remember
              user preferences, and improve overall user experience.
            </p>
          </section>

          {/* 3 */}
          <section className="mb-4">
            <h2 className="font-semibold mb-1">3. Types of Cookies We Use</h2>

            <p className="mb-2">
              Hirees may use the following categories of cookies:
            </p>

            <ul className="list-disc ml-5 space-y-1">
              <li>
                <strong>Essential Cookies:</strong> Required for basic Platform
                functionality such as login, session management, and security.
                These cookies cannot be disabled.
              </li>
              <li>
                <strong>Performance & Analytics Cookies:</strong> Help us
                understand how users interact with the Platform, enabling us to
                improve performance, design, and content.
              </li>
              <li>
                <strong>Functionality Cookies:</strong> Remember user
                preferences such as language, region, and login state to
                enhance user experience.
              </li>
              <li>
                <strong>Advertising & Targeting Cookies:</strong> Used to
                display relevant job recommendations or promotional content.
                These cookies may be set by trusted third-party partners.
              </li>
            </ul>
          </section>

          {/* 4 */}
          <section className="mb-4">
            <h2 className="font-semibold mb-1">
              4. Third-Party Cookies
            </h2>
            <p>
              Hirees may allow third-party service providers such as analytics
              or advertising partners to place cookies on your device. These
              third parties may collect information about your online activity
              across different websites. We do not control these cookies and
              recommend reviewing the privacy policies of such providers.
            </p>
          </section>

          {/* 5 */}
          <section className="mb-4">
            <h2 className="font-semibold mb-1">
              5. How We Use Cookies
            </h2>
            <ul className="list-disc ml-5 space-y-1">
              <li>To maintain secure user sessions.</li>
              <li>To remember user preferences.</li>
              <li>To analyze usage and improve Platform performance.</li>
              <li>To deliver relevant job alerts and content.</li>
              <li>To prevent fraudulent or unauthorized activity.</li>
            </ul>
          </section>

          {/* 6 */}
          <section className="mb-4">
            <h2 className="font-semibold mb-1">
              6. Managing Cookies
            </h2>
            <p className="mb-2">
              You can manage or disable cookies through your browser settings.
              Please note that disabling certain cookies may affect Platform
              functionality and user experience.
            </p>
            <p>
              Most browsers allow you to delete existing cookies, block new
              cookies, or notify you when cookies are placed.
            </p>
          </section>

          {/* 7 */}
          <section className="mb-4">
            <h2 className="font-semibold mb-1">
              7. Changes to This Cookie Policy
            </h2>
            <p>
              Fstone Technologies reserves the right to update this Cookie
              Policy at any time. Any changes will be effective upon posting on
              the Platform. Continued use of Hirees constitutes acceptance of
              the updated Policy.
            </p>
          </section>

          {/* 8 */}
          <section>
            <h2 className="font-semibold mb-1">8. Contact Information</h2>
            <p>
              If you have questions regarding this Cookie Policy, you may
              contact us at:
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

export default CookiePolicy;
