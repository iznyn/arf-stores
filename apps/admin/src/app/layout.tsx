import type { Metadata } from 'next';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import './globals.css';
import { LayoutWrapper } from '@/components/organisms/Layout/LayoutWrapper';
import { SessionProvider } from 'next-auth/react';
import { auth } from '@/lib/auth';

export const metadata: Metadata = {
  title: 'Store Admin Dashboard',
  description: 'Daily Product Store Admin Dashboard',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  
  return (
    <html lang="en" className="dark">
      <body className="antialiased font-sans bg-background text-foreground">
        <SessionProvider session={session}>
          <LayoutWrapper userName={session?.user?.name || undefined}>
            {children}
          </LayoutWrapper>
        </SessionProvider>
      </body>
    </html>
  );
}
