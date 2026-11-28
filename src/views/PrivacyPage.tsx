"use client";

import LegalPage, { LegalCallout, LegalPart, LegalSection, LegalTable } from "@/components/LegalPage";

const PrivacyPage = () => (
  <LegalPage
    eyebrow="Your data"
    title="Data Privacy Notice"
    intro={[
      <>Effective 25 November 2026 · Version 1.0 (initial)</>,
      <>We (meaning <strong>OpenPlan AI</strong>, operated by Velmond Labs Private Limited, registered at Lawsonbay Colony, MVP Sector 11, Visakhapatnam, Andhra Pradesh, India) believe that protecting the security and privacy of your personal data is important. This notice explains how we collect, store, use, disclose and transfer (“process”) your personal data. What we collect depends on how you interact with us, the features you use, your location and applicable law.</>,
    ]}
  >
    <LegalCallout>
      <p><strong>Our two roles.</strong> For your account, sign-in, security and our website, we decide why and how your data is used. For the work content your organisation puts into its workspace (tasks, issues, BOMs, requirements, files), your organisation decides how it is used and we process it on its behalf under our Data Processing Addendum. If you use OpenPlan AI through your employer, your employer answers requests about that content.</p>
    </LegalCallout>

    <LegalPart title="How we handle your data" />

    <LegalSection n={1} title="Processing of personal data related to your use of our website, app and services">
      <LegalTable>
        <thead>
          <tr><th>What</th><th>Examples</th><th>Why we use it</th></tr>
        </thead>
        <tbody>
          <tr><td>Account</td><td>Email, password (stored only as a one-way hash), verified status, last sign-in time</td><td>Create and secure your account, let you sign in</td></tr>
          <tr><td>Profile</td><td>Name, phone, job title, bio, time zone, profile photo, Google Meet email if you connect it</td><td>Show who you are to teammates, enable calls</td></tr>
          <tr><td>Sessions and security</td><td>IP address, browser and device type, sign-in attempts, one-time codes (stored hashed)</td><td>Keep accounts secure, detect abuse</td></tr>
          <tr><td>Organisation membership</td><td>Invitation email, role, department, who invited you</td><td>Add you to your organisation’s workspace</td></tr>
          <tr><td>Push notifications</td><td>Browser notification address, device type</td><td>Send notifications you turn on</td></tr>
          <tr><td>Technical logs and error reports</td><td>API logs (emails and tokens masked), error reports with user ID only</td><td>Run the service, fix bugs</td></tr>
          <tr><td>Staff and admin logs</td><td>Actions by OpenPlan staff in our admin console, with IP and browser</td><td>Keep an accountable record of staff actions</td></tr>
          <tr><td>Website visitors</td><td>Analytics cookies and IP address, details typed in waitlist or demo forms</td><td>Understand site use, reply to your request</td></tr>
        </tbody>
      </LegalTable>
      <p>We use aggregated usage information, which does not identify any person or reveal your content, to run and improve our website, app and services. We send you messages about your account and the service, including important product updates.</p>
      <p>We do not knowingly collect data for advertising and we do not sell personal data.</p>
    </LegalSection>

    <LegalSection n={2} title="Processing of personal data related to your workspace content and collaboration features">
      <p>Tasks, issues, comments, requirements, BOMs, change orders, test results, meetings, activity history and attachments are processed to provide the service to your organisation, on its instructions.</p>
      <p><strong>Chat:</strong> direct and group messages and attachments let teammates message each other.</p>
      <p><strong>Google connections:</strong> if you connect Drive, Sheets, Meet or Calendar, we store connection tokens and the connected Google email so you can link files and meetings. You start the connection and can disconnect it.</p>
    </LegalSection>

    <LegalSection n={3} title="Processing of personal data related to your use of our AI Offerings">
      <p>When you use AI features (the AI assistant and AI imports, including BOM column detection), the content needed to answer you is sent to an AI provider: <strong>Google (Gemini)</strong>, <strong>Microsoft (Azure OpenAI)</strong> or <strong>Anthropic</strong>. If one is unavailable, another may be used. This can include chat messages, files you upload, bills of materials, requirements, tasks and issues. For BOM price research, part details are sent to a web search run by Anthropic or Microsoft.</p>
      <p><strong>Voice input:</strong> when you press the microphone, audio is streamed to our speech provider to turn speech into text. <strong>We do not store the audio.</strong></p>
      <ul>
        <li>We do not use your organisation’s workspace content to train our own models.</li>
      </ul>
    </LegalSection>

    <LegalSection n={4} title="Information from Google accounts (Google API Services User Data Policy)">
      <p>OpenPlan AI’s use and transfer of information received from Google APIs will adhere to the <a href="https://developers.google.com/terms/api-services-user-data-policy" target="_blank" rel="noopener noreferrer">Google API Services User Data Policy</a>, including the Limited Use requirements.</p>
      <p>Data accessed through the Google Sheets, Google Drive, Google Calendar and Google Meet integrations is used solely to provide the specific feature you connect it to, such as syncing a linked bill of materials spreadsheet, storing an uploaded attachment, or creating a calendar event with a meeting link. This data is never sold, shared for advertising, or used for any purpose beyond the feature you explicitly enable.</p>
      <p>If the columns of a linked Google Sheet are not recognised automatically, the column headers and a small sample of rows are sent to one of the AI providers named in section 3 to match the columns. We do not use data from your Google account to train our own models.</p>
    </LegalSection>

    <LegalSection n={5} title="Processing of personal data related to your business relationship with us">
      <p><strong>Support requests:</strong> reporter email, IP address and browser type, handled for your organisation’s support channel (processor).</p>
      <p><strong>Website forms:</strong> details you type in waitlist or demo forms (name, email, company) are used to reply to your request. Demo bookings go through Calendly; Cloudflare Turnstile protects forms from bots.</p>
    </LegalSection>

    <LegalSection n={6} title="Cookies">
      <ul>
        <li><strong>The app</strong> uses cookies needed to keep you signed in. It uses Google Analytics cookies only if you click <em>Accept</em> on its cookie banner; you can change your choice at any time in the app under Settings → Profile → Privacy.</li>
        <li><strong>Our website</strong> uses Google Analytics cookies when you visit it. The contact page shows a Google map and our booking calendar is provided by Calendly, which may set their own cookies. You can block or delete cookies in your browser settings.</li>
        <li>We do not use advertising cookies.</li>
      </ul>
    </LegalSection>

    <LegalSection n={7} title="Transfer and disclosure of personal data">
      <p>We use the service providers (sub-processors) below. They may use data only to provide their service to us. Account and workspace data are stored in India; data leaves India only when a feature calls a provider listed here.</p>
      <LegalTable>
        <thead>
          <tr><th>Provider</th><th>Purpose</th><th>Location</th></tr>
        </thead>
        <tbody>
          <tr><td>Amazon Web Services</td><td>Database, files, cache, logs</td><td>India (Hyderabad)</td></tr>
          <tr><td>Google (Gemini)</td><td>AI assistant, AI imports</td><td>Global (may be outside India)</td></tr>
          <tr><td>Anthropic</td><td>AI assistant, AI imports, price research</td><td>United States</td></tr>
          <tr><td>Microsoft Azure OpenAI</td><td>AI assistant, AI imports, price research</td><td>Singapore (Southeast Asia)</td></tr>
          <tr><td>Sarvam AI</td><td>Voice-to-text</td><td>India</td></tr>
          <tr><td>Resend</td><td>Sending email</td><td>Sent from Japan; stored in the United States</td></tr>
          <tr><td>Stripe, Razorpay</td><td>Payment processing (cards, UPI, net banking) for paid plans</td><td>Various</td></tr>
          <tr><td>Google</td><td>Drive, Sheets, Meet, Calendar (only what you connect); Analytics (website, and the app only if you accept); Maps on our contact page; storing website form entries</td><td>Various</td></tr>
          <tr><td>Sentry</td><td>Error monitoring (user ID only)</td><td>May be outside India</td></tr>
          <tr><td>Cloudflare, Calendly</td><td>Bot protection, demo booking</td><td>Various</td></tr>
          <tr><td>Vercel</td><td>Serving website and app</td><td>Global network (may be outside India)</td></tr>
          <tr><td>Zoho</td><td>Company email, including messages you send us</td><td>India</td></tr>
        </tbody>
      </LegalTable>
      <p>This table is our current list. We tell customers 30 days before adding a new one. Your organisation’s administrators can download records of members’ sign-ins, password changes and role changes, including IP address and device, for the last 12 months and only for the time of membership. We also disclose data where the law requires it or to protect our rights or others’ safety, and not otherwise.</p>
    </LegalSection>

    <LegalSection n={8} title="Retention periods">
      <LegalTable>
        <thead>
          <tr><th>Data</th><th>Retention</th></tr>
        </thead>
        <tbody>
          <tr><td>Account and profile</td><td>While active. After you delete your account, erased or anonymised within <strong>30 days</strong></td></tr>
          <tr><td>Sessions, tokens, one-time codes</td><td>Expired tokens removed within 30 days</td></tr>
          <tr><td>Workspace content and files</td><td>Until your organisation deletes it or the contract ends; permanently removed within 30 days</td></tr>
          <tr><td>Security and staff-action logs</td><td>At least 1 year, then deleted</td></tr>
          <tr><td>Error reports</td><td>90 days</td></tr>
          <tr><td>Website forms</td><td>12 months</td></tr>
          <tr><td>Backups</td><td>Rolling 7 days</td></tr>
        </tbody>
      </LegalTable>
      <p>We may keep limited data longer where required by law.</p>
    </LegalSection>

    <LegalSection n={9} title="Your rights">
      <ul>
        <li><strong>Access</strong> a summary of your personal data, its use and recipients.</li>
        <li><strong>Correct</strong> or complete it (you can edit your profile in Settings).</li>
        <li><strong>Erase</strong> your account and data.</li>
        <li><strong>Withdraw consent</strong> at any time, as easily as you gave it. Earlier processing stays valid, and we may then be unable to provide the service.</li>
        <li><strong>Nominate</strong> someone to act for you if you die or cannot act.</li>
        <li><strong>Complain</strong> to us about how we handle your data.</li>
        <li>Choose which notifications you receive, in the app’s settings.</li>
      </ul>
      <p><strong>How:</strong> in the app, Settings (Profile tab: Raise a privacy request; Danger tab: Download your data, Delete account), or email info@openplanai.com. We respond within 30 days. We may need to confirm it is you. Requests about your organisation’s workspace content are passed to its administrator.</p>
      <p>If you are not satisfied with our reply, you can complain to the <strong>Data Protection Board of India</strong>.</p>
    </LegalSection>

    <LegalSection n={10} title="Security">
      <p>We use encryption in transit (TLS) and at rest, a separate encryption key per organisation for workspace content, role-based access, hashed passwords, and masking of personal data in logs and error reports. OpenPlan AI staff access customer data only when needed to operate, support or secure the service. We monitor the service and keep backups. No online service can be guaranteed completely secure. If a breach affects you we will notify you and the authorities as required; customer administrators are notified without undue delay and within 48 hours of discovery.</p>
    </LegalSection>

    <LegalSection n={11} title="Data privacy contact">
      <LegalCallout>
        <p><strong>Grievance Officer / Privacy contact</strong><br /><a href="mailto:info@openplanai.com">info@openplanai.com</a><br />Lawsonbay Colony, MVP Sector 11, Visakhapatnam, Andhra Pradesh, India</p>
        <p>General support: <a href="mailto:support@openplanai.com">support@openplanai.com</a></p>
      </LegalCallout>
    </LegalSection>

    <LegalSection n={12} title="Processing of personal data of children">
      <p>OpenPlan AI is for people aged 18 or over. We do not knowingly collect data from anyone under 18. If you think a child has an account, contact us using section 11 and we will delete it.</p>
    </LegalSection>

    <LegalSection n={13} title="Changes to this notice">
      <p>We post changes here with a new date and version. For significant changes we tell you in the app or by email, and ask for your consent again where needed.</p>
    </LegalSection>
  </LegalPage>
);

export default PrivacyPage;
