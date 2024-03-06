import "./globals.css";

export const metadata = {
  title: 'Goodlord Reference Form',
  description: 'Goodlord Reference Form',
};

const RootLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
};

export default RootLayout;
