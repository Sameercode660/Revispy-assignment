
import localFont from "next/font/local";
import "./globals.css";
import Menu from "@/components/Menu";
import { RecoilRoot } from "recoil";

 

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        <Menu></Menu>
        {children}
      </body>
    </html>
  );
}
