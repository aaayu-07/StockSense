import ContentPageShell from "../components/ContentPageShell";

export default function PrivacyPage() {
  return (
    <ContentPageShell
      title="Privacy Policy"
      intro="StockSense is designed to deliver market intelligence with a lightweight, transparent experience."
    >
      <p>
        We focus on a minimal data footprint. The current product experience is centered on public
        market analytics, charting, and educational stock insights rather than collecting sensitive
        investing credentials or account-linked brokerage information.
      </p>
      <p>
        Information submitted through the website, such as contact form messages, may be used to
        respond to inquiries, improve product quality, and support the user experience. We do not
        position StockSense as a platform for storing personal financial profiles.
      </p>
      <p>
        Usage analytics, performance diagnostics, and operational logs may be reviewed to maintain
        reliability, monitor uptime, and improve interface performance across devices. These
        insights help us refine the dashboard and keep the experience stable.
      </p>
      <p>
        If our data practices change materially in the future, this page should be updated to
        reflect those changes clearly so users always understand how product interactions are
        handled.
      </p>
    </ContentPageShell>
  );
}
