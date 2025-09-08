import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ApexPredict - F1 Race Winner Predictions',
  description: 'Outsmart the Podium: Real-time F1 Race Winner Predictions with AI-powered insights',
  keywords: ['F1', 'Formula 1', 'predictions', 'racing', 'AI', 'betting'],
  authors: [{ name: 'ApexPredict Team' }],
  openGraph: {
    title: 'ApexPredict - F1 Race Winner Predictions',
    description: 'Outsmart the Podium: Real-time F1 Race Winner Predictions',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
