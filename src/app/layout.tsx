'use client'
import "./globals.css";
import Menu from "@/components/Menu";
import { AuthProvider } from "@/context/AuthContext";



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
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
