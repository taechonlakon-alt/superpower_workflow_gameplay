import "../styles.css";

export const metadata = {
  title: "SUPERPOWER WORKFLOW",
  description: "A single-screen browser game about managing AI-assisted work through a structured workflow.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="th" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <div id="app">
          {children}
        </div>
      </body>
    </html>
  );
}
