import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

// Font Serif Elegan (Gaya Recoleta / Rose / Cold untuk Heading)
const serifFont = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-serif-custom",
});

// Font Sans untuk Body Text agar tetap bersih dan nyaman dibaca
const sansFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans-custom",
});

export const metadata: Metadata = {
  title: "Firman Damai Zebua | Software Developer",
  description: "Portfolio website of Firman Damai Zebua, S.Kom. - Software Developer & Full-Stack Engineer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark scroll-smooth ${serifFont.variable} ${sansFont.variable}`}>
      <body className="bg-[#09090B] text-[#FAFAFA] antialiased">
        {children}
      </body>
    </html>
  );
}