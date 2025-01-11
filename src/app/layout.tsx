import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Mirai",
  description: "Mirai Ecomerce",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        {children}
      </body>
    </html>
  );
}
