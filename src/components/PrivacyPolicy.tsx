import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="flex-1 bg-[#070B14] text-slate-300">
      <div className="max-w-3xl mx-auto px-6 py-16 w-full">
        <h1 className="text-4xl font-serif text-white mb-8">Privacy Policy</h1>
        <div className="prose prose-invert prose-teal max-w-none">
          <p><strong>Effective Date:</strong> September 3, 2026</p>
          
          <h2>1. Information We Collect</h2>
          <p>We only collect the information necessary to provide and secure your writing workspace:</p>
          <ul>
            <li><strong>Account Information:</strong> When you register using Google OAuth, we collect your authentication credentials via Firebase Authentication.</li>
            <li><strong>User Content:</strong> We collect and store the text you actively type into the application, including your workbook inputs, timeline notes, scratchpad entries, and assembled essay drafts.</li>
          </ul>

          <h2>2. How We Use Your Information</h2>
          <p>Your data is used exclusively to operate the application, save your progress, and sync your drafts across devices.</p>
          <p><strong>The "Zero-AI" Guarantee:</strong> We maintain a strict "Zero Generative AI" policy. Your personal stories, vulnerabilities, and drafts are never fed into Large Language Models (LLMs), nor are they used to train any artificial intelligence systems. The authorship remains 100% yours.</p>

          <h2>3. Data Storage and Security</h2>
          <p>We utilize a cloud-first state management strategy to protect your work from accidental deletion.</p>
          <ul>
            <li><strong>Cloud Storage:</strong> Your narrative data is stored securely in a flat NoSQL document structure using Firebase Firestore.</li>
            <li><strong>Local Caching:</strong> To provide offline resilience and prevent data loss if your internet connection drops, we leverage the Firebase Web SDK's native IndexedDB caching to save your keystrokes locally in your browser before syncing them to the cloud.</li>
          </ul>

          <h2>4. Children’s Privacy (COPPA Compliance)</h2>
          <p>The Essay Loom is not designed for or directed at children under the age of 13. To comply with the Children's Online Privacy Protection Act (COPPA), our onboarding flow mandates a neutral Date of Birth input. Any user attempting to register with a birth date indicating they are under 13 years of age is strictly hard-blocked from creating an account. We do not knowingly collect personal information from children under 13.</p>

          <h2>5. Data Sharing</h2>
          <p>We do not sell, rent, or trade your personal information or essay content to third parties. Your data is shared only with our backend infrastructure provider (Google Firebase) strictly for the purpose of hosting, authentication, and database operations.</p>

          <h2>6. User Rights and Data Deletion</h2>
          <p>You maintain total ownership of your intellectual property and have the right to be forgotten.</p>
          <p><strong>Self-Service Deletion:</strong> You may permanently delete your account at any time through the application settings. Initiating this action triggers a cascading deletion protocol which irreversibly purges your authentication record and all associated essay data from our servers.</p>
          
          <h2>7. Contact Us</h2>
          <p>If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at: <strong>theessayloom@gmail.com</strong></p>
        </div>
      </div>
    </div>
  );
}
