// app/layout.tsx
import "./global.css";
import "./VideoBackground.css";
import "./MWTM-Home/home-board.css"; // ← correct relative path

export const metadata = {
  title: "Morbid Besties",
  description: "Landing page with video background and Ouija board",
  other: {
    "facebook-domain-verification": "hcmrw3s8xooppxabnuj1baiwq88o9e",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
