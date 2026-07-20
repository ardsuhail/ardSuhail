export const metadata = {
  title: "Privacy Policy | ArdSuhail",
  description:
    "Read the Privacy Policy for ArdSuhail. Learn how your information is collected, used, and protected.",
};

export default function PrivacyPolicy() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-bold mb-3">Privacy Policy</h1>

      <p className="text-gray-500 mb-10">
        <strong>Last Updated:</strong> July 20, 2026
      </p>

      <p className="mb-8">
        Welcome to <strong>ArdSuhail</strong> (https://www.ardsuhail.com).
        Your privacy is important to me. This Privacy Policy explains what
        information is collected through this website and how it is used.
      </p>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">
          Information I Collect
        </h2>

        <p className="mb-4">
          When you use the contact form on this website or communicate with me
          regarding a project, I may collect:
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>Name</li>
          <li>Email Address</li>
          <li>Message / Project Details</li>
        </ul>

        <p className="mt-4">
          I only collect the information you voluntarily provide.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">
          How Your Information Is Used
        </h2>

        <p className="mb-4">Your information may be used to:</p>

        <ul className="list-disc pl-6 space-y-2">
          <li>Respond to your inquiries.</li>
          <li>Communicate regarding potential projects.</li>
          <li>Provide requested services.</li>
          <li>Manage freelance projects and client communication.</li>
        </ul>

        <p className="mt-4">
          I do not sell, rent, or share your personal information with third
          parties for marketing purposes.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Data Security</h2>

        <p>
          I take reasonable technical and organizational measures to protect
          your information. However, no method of transmission over the internet
          or electronic storage is completely secure.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">
          Third-Party Services
        </h2>

        <p>
         This website may use trusted third-party services such as Vercel (hosting) and Nodemailer (for email delivery), as required to operate the website.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">External Links</h2>

        <p>
          This website may contain links to third-party websites including
          Fiverr, Upwork, LinkedIn, GitHub, and other platforms. I am not
          responsible for the privacy practices or content of those websites.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Contact</h2>

        <p>
          If you have any questions regarding this Privacy Policy, you can
          contact me at:
        </p>

        <div className="mt-4 space-y-2">
          <p>
            <strong>Email:</strong>{" "}
            <a
              href="mailto:ardsuhail47@gmail.com"
              className="text-blue-600 hover:underline"
            >
              ardsuhail47@gmail.com
            </a>
          </p>

          <p>
            <strong>Instagram:</strong> @ardsuhail
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">
          Changes to This Policy
        </h2>

        <p>
          This Privacy Policy may be updated from time to time. The latest
          version will always be available on this page with the updated date.
        </p>
      </section>
    </main>
  );
}