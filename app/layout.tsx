import "../app/globals.css";
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import GrainOverlay from '@/components/layout/GrainOverlay';
import LoadingScreen from '@/components/layout/LoadingScreen';
import CustomCursor from '@/components/layout/CustomCursor';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AUREN — eg',
  description: 'Luxury streetwear for the modern individual. Premium garments built to last.',
  keywords: ['luxury streetwear', 'premium fashion', 'AUREN', 'minimal clothing'],
  openGraph: {
    title: 'AUREN — eg',
    description: 'Luxury streetwear for the modern individual.',
    siteName: 'AUREN',
    images: [{ url: 'https://images.pexels.com/photos/1192609/pexels-photo-1192609.jpeg' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AUREN — eg',
    images: ['https://images.pexels.com/photos/1192609/pexels-photo-1192609.jpeg'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className} style={{ backgroundColor: '#1A120E', color: '#F3EEE8' }}>
        <LoadingScreen />
        <GrainOverlay />
        <CustomCursor />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
