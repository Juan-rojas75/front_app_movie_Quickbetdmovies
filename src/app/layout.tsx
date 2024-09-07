"use client";
import { ThemeProvider } from "next-themes"
import { Provider } from 'react-redux';
import store from '../lib/store/store';
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <html lang="en">
      <Provider store={store}>
          <ThemeProvider attribute="class">
            <body className={inter.className}>{children}</body>
          </ThemeProvider>     
      </Provider>
    </html>
  );
}