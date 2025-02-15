import type { Metadata } from "next";
import "../sass/style.scss"
import "../sass/globals.css"
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/shift-away.css';

import { ToastContainer } from "react-toastify"

import GraphqlProvider from "../graphql/GraphqlProvider";

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
      <head>
        {/* <script src="https://unpkg.com/react-scan/dist/auto.global.js"></script> */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;800&family=Poppins:wght@400;600&display=swap"
          rel="stylesheet"
        />

        <link href="https://fonts.googleapis.com/css2?family=Albert+Sans:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />


      </head>
      <GraphqlProvider>
        <body className="mirai">
          {children}
          <ToastContainer />
        </body>
      </GraphqlProvider>
    </html>
  );
}
