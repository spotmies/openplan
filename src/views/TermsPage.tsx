"use client";

import Link from "next/link";

import LegalPage, { LegalCallout, LegalPart, LegalPartNav, LegalSection, LegalText } from "@/components/LegalPage";

const TermsPage = () => (
  <LegalPage
    eyebrow="Legal"
    title="Terms of Use"
    intro={[
      <>OpenPlan AI · Effective 25 November 2026 · Version 1.0 (initial)</>,
      <>These Terms are an agreement between you and <strong>Velmond Labs Private Limited</strong>, registered at Lawsonbay Colony, MVP Sector 11, Visakhapatnam, Andhra Pradesh, India (“<strong>OpenPlan</strong>”, “we”, “us”). They apply to OpenPlan AI, our web app, admin tools, APIs and related services (the “<strong>Service</strong>”). By creating an account, accepting an invitation or using the Service, you agree to these Terms and to our <Link href="/privacy">Privacy Notice</Link>.</>,
    ]}
  >
    <LegalPartNav links={[{ href: "#part-a", label: "A. General Terms of Use" }, { href: "#part-b", label: "B. Workspace and Subscription Terms" }, { href: "#part-c", label: "C. AI Terms of Use" }]} />

    <LegalPart id="part-a" title="A. General Terms of Use" />

    <LegalSection n={1} title="Scope">
      <p>Part A applies to everyone who uses the Service. Part B adds terms for organisations and paid subscriptions. Part C adds terms for AI features. If Part B or C conflicts with Part A, Part B or C prevails for its subject.</p>
      <p>You must be <strong>18 years or older</strong> and able to enter a binding contract. We do not knowingly allow anyone under 18 to hold an account and will close any we find. If you use the Service for an organisation, you confirm you may bind it, and “you” includes that organisation.</p>
    </LegalSection>

    <LegalSection n={2} title="Services">
      <p>OpenPlan AI helps teams plan and manage hardware work: tasks, issues, requirements, bills of materials, change orders, test records, meetings, chat and an AI assistant.</p>
      <ul>
        <li>We work to keep the Service running, but <strong>we do not promise uninterrupted or error-free service</strong>.</li>
        <li>We may update, add or remove features and may carry out maintenance that causes short interruptions. If a change materially reduces what a paying customer receives, we give reasonable notice.</li>
        <li>Support: <a href="mailto:support@openplanai.com">support@openplanai.com</a> Monday to Friday, 9:00 AM to 6:00 PM IST.</li>
      </ul>
    </LegalSection>

    <LegalSection n={3} title="Registration, Password">
      <ul>
        <li>Give accurate information and keep it up to date.</li>
        <li>Keep your password secret. You are responsible for everything done through your account unless you told us promptly that it was misused.</li>
        <li>Tell us at info@openplanai.com right away if you suspect unauthorised access.</li>
        <li>Each person needs their own account. Do not share logins.</li>
        <li>An organisation administrator can invite people, set roles and remove members, and decides who in the organisation sees its workspace content.</li>
        <li>Review who has access regularly, and remove it promptly when people leave or change roles.</li>
      </ul>
    </LegalSection>

    <LegalSection n={4} title="Right of use to the Service and documentation">
      <p>During your subscription we give you a limited, non-exclusive, non-transferable right to use the Service and its documentation for your internal business purposes, within your plan. You may not resell or sublicense the Service, or copy, reverse engineer or extract source code, except where the law allows it despite this clause.</p>
    </LegalSection>

    <LegalSection n={5} title="Intellectual Property">
      <p>We and our licensors own the Service, its software, design and branding. <strong>You own your content</strong> (see B.9). If you give us feedback or suggestions, we may use them without obligation to you.</p>
    </LegalSection>

    <LegalSection n={6} title="Duties of the User, Content Moderation, and Indemnification">
      <p>You must not, and must not allow others to:</p>
      <ol>
        <li>break any law or infringe anyone’s rights, including intellectual property and privacy rights;</li>
        <li>upload malware or anything designed to damage, disrupt or gain unauthorised access to the Service or other users;</li>
        <li>access another organisation’s data, bypass access controls or limits, or probe the Service for weaknesses without our written permission (report vulnerabilities to info@openplanai.com);</li>
        <li>overload the Service or use bots or scraping other than our published APIs;</li>
        <li>upload content that is unlawful, defamatory, abusive or sexually explicit, or that you have no right to upload;</li>
        <li>impersonate anyone or give false information;</li>
        <li>build a competing product with the Service, or use its AI features to train a competing AI model;</li>
        <li>store information the Service is not designed for, such as payment card numbers, unless we agree in writing.</li>
      </ol>
      <p><strong>Content moderation.</strong> We may remove content or suspend an account or organisation to protect security, investigate misuse or follow the law. Affected administrators are told why, unless the law prevents us.</p>
      <p><strong>Indemnification.</strong> You will compensate us for third-party claims arising from your content, your breach of these Terms or your breach of law, to the extent caused by you.</p>
    </LegalSection>

    <LegalSection n={7} title="Hyperlinks and third-party services">
      <p>The Service connects to services such as Google Drive, Google Sheets and Google Meet. If you connect them, you authorise us to access your account there only for the features you use. Their own terms apply. We are not responsible for third-party services or linked sites.</p>
    </LegalSection>

    <LegalSection n={8} title="Liability for defects">
      <p>The Service is provided “as is” and “as available”. To the extent the law allows, we give no warranty beyond those stated in these Terms, including fitness for a particular purpose. If the Service has a defect, we will make reasonable efforts to correct it.</p>
    </LegalSection>

    <LegalSection n={9} title="Other Liability">
      <ul>
        <li>We are not liable for indirect or consequential loss, loss of profits, loss of data you could have backed up, or business interruption.</li>
        <li>Our total liability for all claims relating to the Service is limited to the fees you paid in the 12 months before the event, or ₹10,000 if you pay nothing.</li>
        <li>Nothing here excludes liability that cannot be excluded by law, including for fraud, or for death or personal injury caused by negligence.</li>
        <li>You are responsible for decisions made using the Service, including those based on AI output.</li>
      </ul>
    </LegalSection>

    <LegalSection n={10} title="Personal data">
      <p>For your account, sign-in, security and our website, we are responsible for your personal data as described in our <Link href="/privacy">Privacy Notice</Link>. For personal data inside your organisation’s workspace, your organisation is responsible and we process it on its behalf under our <strong>Data Processing Addendum</strong>, which we agree with customer organisations on request at <a href="mailto:info@openplanai.com">info@openplanai.com</a> and which then forms part of these Terms. You must have the right to put any personal data into the Service and give any notices required. Our sub-processors are listed in our <Link href="/privacy">Privacy Notice</Link>.</p>
    </LegalSection>

    <LegalSection n={11} title="Termination, export and deletion">
      <ul>
        <li><strong>You</strong> can delete your account in Settings. An organisation can end its subscription by writing to info@openplanai.com.</li>
        <li><strong>We</strong> may suspend or end access if you break these Terms or do not pay, if the law requires, or if your use risks harm to the Service or others. Where reasonable we warn you first.</li>
        <li><strong>After an organisation’s contract ends:</strong> it has 30 days to export its data; we then delete workspace content within 30 days, and it leaves backups within 7 days. We may keep limited records the law requires.</li>
        <li>Terms that by nature should continue (ownership, fees owed, liability, governing law) continue after termination.</li>
      </ul>
    </LegalSection>

    <LegalSection n={12} title="Changes, Supplementary Agreements, Place of Jurisdiction, Applicable Law">
      <p><strong>Changes.</strong> We may update these Terms. We post the new version with a new date and tell you in the app or by email at least 30 days before changes that matter to you take effect. If you keep using the Service afterwards, you accept them.</p>
      <p><strong>Supplementary agreements.</strong> These Terms, the Privacy Notice and, where it applies, the Data Processing Addendum are the whole agreement on the Service. If a part is invalid, the rest applies. Not enforcing a right straight away is not a waiver. You may not transfer these Terms without consent; we may transfer them in a merger or sale of our business. Notices go to your account email or appear in the app.</p>
      <p><strong>Jurisdiction and law.</strong> These Terms are governed by the laws of India. The courts at Visakhapatnam, Andhra Pradesh have exclusive jurisdiction.</p>
    </LegalSection>

    <LegalPart id="part-b" title="B. Workspace and Subscription Terms" />

    <LegalText>
      <p>These terms supplement Part A for organisations and paid use. If Part B conflicts with Part A, Part B prevails.</p>
    </LegalText>

    <LegalSection n={1} title="B2B Environment">
      <p>The Service is offered to businesses and their staff, not to consumers. You confirm you use it for business purposes.</p>
    </LegalSection>

    <LegalSection n={2} title="Types of Offerings and Role of OpenPlan">
      <p>When you join an organisation’s workspace, the organisation controls its content and who can access it, and decides what to store there. If you leave or are removed, you may lose access. OpenPlan provides the platform; we do not review workspace content in the ordinary course.</p>
    </LegalSection>

    <LegalSection n={3} title="Governing Terms for Offerings">
      <p>For a customer organisation, these Terms, the order form or plan page, the Privacy Notice and the Data Processing Addendum apply. If an order form conflicts with these Terms, the order form prevails for its subject.</p>
    </LegalSection>

    <LegalSection n={4} title="Orders and Conclusion of Contract">
      <p>A contract starts when we accept an order or the organisation completes sign-up, and runs for the subscription period shown. There is a Free plan (one active project, up to 5 users); there is no separate free trial.</p>
    </LegalSection>

    <LegalSection n={5} title="Maintenance and Support">
      <p>We provide support at <a href="mailto:support@openplanai.com">support@openplanai.com</a> Monday to Friday, 9:00 AM to 6:00 PM IST and may schedule maintenance. No uptime percentage is promised unless agreed in writing.</p>
    </LegalSection>

    <LegalSection n={6} title="Payments and Invoicing">
      <ul>
        <li>Plans and prices are at <a href="https://www.openplanai.com/pricing" target="_blank" rel="noopener noreferrer">openplanai.com/pricing</a> or in your order form.</li>
        <li>Fees are monthly or yearly, as shown for your plan in US dollars or Indian rupees, exclusive of taxes (GST is added where applicable).</li>
        <li>Unless stated otherwise, fees are non-refundable.</li>
        <li>We give 30 days’ notice before changing prices for your next billing period.</li>
      </ul>
    </LegalSection>

    <LegalSection n={7} title="User’s Representations and Authorizations">
      <p>You confirm that you have authority to bind your organisation, that the information you give is accurate, and that you have the rights and permissions to upload your content, including personal data of other people.</p>
    </LegalSection>

    <LegalSection n={8} title="Failed Payments">
      <p>If you do not pay on time, we may suspend the Service after 15 days’ notice. Access returns once payment is received, and content is kept as set out in A.11.</p>
    </LegalSection>

    <LegalSection n={9} title="Ownership">
      <p><strong>You own your content:</strong> everything you or your organisation put into the Service (tasks, issues, requirements, bills of materials, change orders, test records, files, chat messages). You give us a limited licence to host, process and display it <strong>only to provide the Service</strong> as described in these Terms, the Privacy Notice and the DPA. We do not use workspace content for our own purposes such as advertising. We may use aggregated usage statistics, which do not identify any person or reveal your content, to run and improve the Service.</p>
    </LegalSection>

    <LegalSection n={10} title="User Generated Content">
      <p>You are responsible for your content, for backing up what matters to you, and for its lawfulness. We may remove content as set out in A.6. If your organisation handles regulated or sensitive data, you are responsible for access, review and retention practices that meet your own policies and legal duties.</p>
    </LegalSection>

    <LegalPart id="part-c" title="C. AI Terms of Use" />

    <LegalText>
      <p>These terms supplement Parts A and B for the AI assistant, voice input, price research and import tools (“AI Services”).</p>
    </LegalText>

    <LegalSection n={1} title="Nature and Limitations of Content">
      <p><strong>AI output can be wrong or incomplete.</strong> It is not engineering, legal, safety, regulatory or purchasing advice. You must check AI suggestions, bills of materials, part data, prices and requirements before relying on them. AI features create proposals; you decide whether to accept them.</p>
    </LegalSection>

    <LegalSection n={2} title="AI Services Use Restrictions">
      <p>Besides A.6, you must not use AI Services to build or train a competing AI model, to generate unlawful content, or to try to extract the underlying models or prompts.</p>
    </LegalSection>

    <LegalSection n={3} title="High-Risk Use">
      <p>AI Services are not designed for uses where an error could cause death, injury or serious harm. Anything used in manufacturing, safety or regulated products needs independent human review by qualified people before use.</p>
    </LegalSection>

    <LegalSection n={4} title="Liability">
      <p>Section A.9 applies to AI Services. To the extent the law allows, we are not liable for loss arising from reliance on AI output.</p>
    </LegalSection>

    <LegalSection n={5} title="Use Rights of OpenPlan">
      <p>To answer you, content you submit is sent to third-party AI providers (Google Gemini, Microsoft Azure OpenAI and Anthropic) and, for voice, our speech provider (Sarvam AI), as listed in our sub-processor list. They may use it only to provide their service to us. We do not use your organisation’s workspace content to train our own models.</p>
    </LegalSection>

    <LegalSection n={6} title="Use Rights for the User">
      <p>As between you and us, you may use AI output for your business, subject to these Terms. Output may be similar for different users, so we cannot promise it is unique.</p>
    </LegalSection>

    <LegalSection n={7} title="Changes to these AI Terms of Use">
      <p>We may update Part C as AI features change, using the notice process in A.12.</p>
    </LegalSection>

    <LegalPart title="Contact" />

    <LegalCallout>
      <p><strong>Velmond Labs Private Limited</strong><br />Lawsonbay Colony, MVP Sector 11, Visakhapatnam, Andhra Pradesh, India<br />Support: <a href="mailto:support@openplanai.com">support@openplanai.com</a><br />Legal and privacy: info@openplanai.com</p>
    </LegalCallout>
  </LegalPage>
);

export default TermsPage;
