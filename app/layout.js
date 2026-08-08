import './globals.css'

export const metadata = {
  metadataBase: new URL(process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://hhgoa-2026-five.vercel.app'),
  title: 'Frame In Goa — HH Goa 2026 Boarding Pass & ID Generator',
  description: 'Generate your personalized Hacker House Goa 2026 boarding pass, VIP builder ID card, or team frame. Upload your photo and share with #FrameInGoa.',
  keywords: ['Hacker House Goa', 'HH Goa 2026', 'FrameInGoa', 'frame generator', 'builder ID', 'boarding pass', 'ID card', '2:47PM Studio'],
  openGraph: {
    title: 'Frame In Goa — HH Goa 2026 Boarding Pass Generator',
    description: 'Generate your personalized Hacker House Goa 2026 boarding pass. Upload your photo, customize your pass, share it with #FrameInGoa.',
    type: 'website',
    url: 'https://hhgoa-2026-five.vercel.app',
    images: [{ url: '/assets/brand-banner.webp', width: 1455, height: 816 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Frame In Goa — HH Goa 2026 Boarding Pass Generator',
    description: 'Get your HH Goa 2026 boarding pass. Drop a pic, grab your pass. #FrameInGoa',
    images: ['/assets/brand-banner.webp'],
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#0B6839',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&family=Bebas+Neue&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
