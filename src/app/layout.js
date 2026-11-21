'use client';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import { I18nProvider } from '@/lib/i18n';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function RootLayout({ children }) {
  return (
    <html lang="fr" dir="ltr" suppressHydrationWarning>
      <head>
        <title>Foncier Mauritanie — Bourse immobiliere</title>
        <meta name="description" content="La premiere plateforme immobiliere en Mauritanie. Achetez, vendez et louez des biens immobiliers en toute confiance." />
      </head>
      <body className="min-h-screen">
        <I18nProvider>
          <Toaster position="top-right" toastOptions={{
            style: { borderRadius: '12px', padding: '14px 20px', fontSize: '14px' },
          }} />
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </I18nProvider>
      </body>
    </html>
  );
}
