import "../../app/globals.scss";
import { classContainer } from "@utils";
import SocialTabs from "@components/services/components/tabs/SocialTabs";

const ServicesLayout = async ({ children }) => {
  return (
    <section className={classContainer("mb-16 flex flex-col flex-nowrap")}>
      <SocialTabs />
      <div className="z-[2] w-full flex flex-col gap-4 sm:gap-[30px] sm:flex-row">
        {children}
      </div>
    </section>
  );
};

export default ServicesLayout;
