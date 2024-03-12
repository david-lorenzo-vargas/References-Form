import GoodLordLogo from "./Components/icons/GoodLordLogo";
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
      <body>
        <main className="flex h-screen flex-col items-center justify-center bg-veryDarkBlue pb-10">
          <div className="w-full pl-10">
            <GoodLordLogo size="150"/>
          </div>
          {children}
        </main>
      </body>
    </html>
  )
};

export default RootLayout;
