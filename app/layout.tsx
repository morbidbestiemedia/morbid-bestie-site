import "./globals.css";

export const metadata = {
  title: "Morbid Besties",
  description: "Landing page with video background and Ouija board",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}