import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BizXThai Reviews",
  description: "Read trusted reviews from BizXThai members.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <body>
        <nav className="navbar">
          <div className="navbar-brand">biz<span style={{ color: "#10B981" }}>x</span>thai reviews</div>
        </nav>
        {children}
      </body>
    </html>
  );
}
