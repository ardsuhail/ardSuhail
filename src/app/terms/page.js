export const metadata = {
  title: "Terms & Conditions | ArdSuhail",
  description:
    "Read the Terms & Conditions for using the ArdSuhail portfolio website and freelance services.",
};

export default function TermsAndConditions() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-bold mb-3">Terms & Conditions</h1>

      <p className="text-gray-500 mb-10">
        <strong>Last Updated:</strong> July 20, 2026
      </p>

      <p className="mb-8">
        Welcome to <strong>ArdSuhail</strong> (https://www.ardsuhail.com). By
        accessing or using this website, you agree to the following Terms &
        Conditions.
      </p>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Website Purpose</h2>

        <p>
          This website serves as my personal portfolio to showcase my work,
          technical skills, and freelance services as a Full Stack MERN
          Developer. It may also include links to my profiles on freelance
          platforms such as Fiverr and Upwork.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">
          Intellectual Property
        </h2>

        <p>
          Unless otherwise stated, all content on this website—including text,
          graphics, designs, source code, images, and other materials—is the
          property of ArdSuhail and may not be copied, reproduced, modified, or
          redistributed without prior written permission.
        </p>

        <p className="mt-4">
          Third-party logos, trademarks, and brand names remain the property of
          their respective owners.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Portfolio Projects</h2>

        <p>
          Portfolio projects are displayed for demonstration purposes. Some
          projects may have been developed for clients and are presented with
          appropriate permission or in accordance with applicable agreements.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">
          Freelance Services & Third-Party Platforms
        </h2>

        <p>
          This website may contain links to third-party platforms such as
          Fiverr, Upwork, LinkedIn, GitHub, and others. These platforms operate
          independently and have their own terms and privacy policies. I am not
          responsible for their content, availability, or practices.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Contact Form</h2>

        <p>
          By submitting the contact form, you confirm that the information you
          provide is accurate and that you are contacting me for genuine
          business, project, or collaboration purposes.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">No Guarantees</h2>

        <p>
          While I strive to keep this website accurate, secure, and available, I
          do not guarantee uninterrupted access or that the website will always
          be free from errors, bugs, or technical issues.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">
          Limitation of Liability
        </h2>

        <p>
          To the fullest extent permitted by applicable law, I shall not be
          liable for any direct, indirect, incidental, or consequential damages
          arising from the use of this website or reliance on its content.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">
          Changes to These Terms
        </h2>

        <p>
          These Terms & Conditions may be updated from time to time. The latest
          version will always be available on this page with the updated date.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Contact</h2>

        <p>
          If you have any questions regarding these Terms & Conditions, you can
          contact me using the details below:
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
    </main>
  );
}