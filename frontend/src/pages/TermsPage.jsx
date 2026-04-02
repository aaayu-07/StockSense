import ContentPageShell from "../components/ContentPageShell";

export default function TermsPage() {
  return (
    <ContentPageShell
      title="Terms of Service"
      intro="StockSense provides a polished analytics interface for educational, informational, and product demonstration purposes."
    >
      <p>
        Market data, visualizations, summaries, and comparative insights presented in StockSense
        should support your research workflow and understanding of price movement. They are not a
        substitute for licensed financial advice or independent due diligence.
      </p>
      <p>
        By using the platform, you agree to evaluate insights responsibly and understand that data
        availability, timing, and market conditions may change. Financial markets are volatile, and
        no chart or metric guarantees future performance.
      </p>
      <p>
        The application is provided on an as-available basis. We aim for reliability and a premium
        user experience, but temporary interruptions, data latency, or interface changes may occur
        as the product evolves.
      </p>
      <p>
        Continued use of StockSense indicates acceptance of these usage boundaries and the intended
        informational role of the product.
      </p>
    </ContentPageShell>
  );
}
