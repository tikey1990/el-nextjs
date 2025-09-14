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
import Script from "next/script";
import { Suspense } from "react";
import Metrika from "@components/YandexMetrika/YandexMetrica";
import { ToastContainer } from "react-toastify";

export const metadata = {
  title:
    "EasyLiker - накрутка зрителей для Твич, Ютуб, Вк Видео и Кик. Лайки, подписчики, просмотры для Инстаграм, Телеграм, Тик ток, Вконтакте",
  description:
    "EasyLiker.ru - профессиональный сервис накрутки в социальных сетях. Мы сделаем вас или ваш бизнес популярным в Instagram, ВКонтакте, YouTube, Telegram, TikTok, Twitch, Twitter!",
  keywords:
    "накрутка лайков, накрутка vk, накрутить вконтакте, раскрутка социальных сетей, smm, продвижение бизнеса, раскрутка аккаунта, накрутка подписчиков, услуги пиара, Instagram, ВКонтакте, YouTube, Telegram, TikTok, Twitch, Twitter, накрутка всего",
};

const RootLayout = async ({ children }) => {
  const headersList = await headers();
  const ua = userAgent({ headers: headersList }); // Is mobile
  const isMobile = ua.device.type === "mobile";
  const { isAuth } = await verifySession();
  const host = headersList.get("host");
  const positionNotification = isMobile ? "top-center" : "bottom-left";
  return (
    <html>
      <body>
        <AuthContextProvider value={{ isAuth, host }}>
          <Flowbite theme={{ theme: flowBiteCustomTheme }}>
            <ToastContainer
              toastStyle={{
                minWidth: isMobile ? "initial" : "max-content",
                maxWidth: isMobile ? "initial" : "600px",
              }}
              bodyStyle={{
                maxWidth: isMobile ? "initial" : "600px",
                minWidth: isMobile ? "initial" : "350px",
              }}
              position={positionNotification}
              autoClose={4000}
              theme="colored"
              newestOnTop
              draggable
            />
            <div className="app max-sm:overscroll-none">
              <StoreProvider>
                <Header isMobile={isMobile} />
                <Details version={1} />
                {children}
                <Suspense>
                  <Metrika />
                </Suspense>
                <Footer />
              </StoreProvider>
            </div>
          </Flowbite>
        </AuthContextProvider>
        <Script src="//code.jivo.ru/widget/Z0GOZbXarh" />
      </body>
    </html>
  );
};

export default RootLayout;
