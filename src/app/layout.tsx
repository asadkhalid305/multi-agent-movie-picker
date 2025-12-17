import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Movie & Show Picker",
  description:
    "A multi-agent AI system that recommends movies & shows based on natural language requests",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = localStorage.getItem('theme') || 'dark';
                document.documentElement.classList.toggle('dark', theme === 'dark');
              })();
            `,
          }}
        />
      </head>
      <body className="bg-white dark:bg-[#202020] transition-all duration-300 ease-in-out">
        {children}
      </body>
    </html>
  );
}
