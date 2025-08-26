import { StoreProvider } from "@providers";
import "./globals.scss";
import { Flowbite } from "flowbite-react";
import { flowBiteCustomTheme } from "@theme";
import Header from "@components/header/Header";
import { headers } from "next/headers";
import { userAgent } from "next/server";
import Footer from "@components/footer/Footer";
import { Details } from "@components";
import { verifySession } from "@/server/auth";
import { AuthContextProvider } from "@/providers/auth";

const RootLayout = async ({ children }) => {
  const headersList = await headers();
  const ua = userAgent({ headers: headersList }); // Is mobile
  const isMobile = ua.device.type === "mobile";
  const { isAuth } = await verifySession();
  const host = headersList.get("host");
  return (
    <html>
      <body>
        <AuthContextProvider value={{ isAuth, host }}>
          <Flowbite theme={{ theme: flowBiteCustomTheme }}>
            <div className="app max-sm:overscroll-none">
              <StoreProvider>
                <Header isMobile={isMobile} />
                <Details version={1} />
                {children}
                <Footer />
              </StoreProvider>
            </div>
          </Flowbite>
        </AuthContextProvider>
      </body>
    </html>
  );
};

export default RootLayout;
