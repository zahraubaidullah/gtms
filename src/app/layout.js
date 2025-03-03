import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata = {
  title: 'GTMS - Gem Trade Management System',
  description: 'A specialized B2B/B2C e-commerce platform for the Sri Lankan gem and jewelry industry',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-blue-50 text-slate-800 flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}