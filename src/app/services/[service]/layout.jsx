import {
  AsideCategoriesServices,
  AsidePage,
} from "@components/aside/components";
import Head from "next/head";

export async function generateMetadata({ params }) {
  const { service } = await params;

  const feesData = await fetch("https://easyliker.ru/api/ajax/fees", {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "x-requested-with": "XMLHttpRequest",
      Accept: "*/*",
    },
    cache: "force-cache",
    body: "MethodAndForm=getFeesTypes",
  }).then((resp) => {
    return resp.json();
  });

  const service_obj = feesData.data.find((item) => item.name === service);

  return {
    title: service_obj?.html_title?.replace(/<[^>]*>?/gm, "") || "",
    description: (
      service_obj?.html_text?.replace(/<[^>]*>?/gm, "") || ""
    ).slice(0, 250),
    alternates: {
      canonical: `https://easyliker.ru/services/${service}/`,
    },
  };
}

const ConcreteServiceLayout = async ({ children, params }) => {
  const { service, category } = await params;
  const feesData = await fetch("https://easyliker.ru/api/ajax/fees", {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "x-requested-with": "XMLHttpRequest",
      Accept: "*/*",
    },
    cache: "force-cache",
    body: "MethodAndForm=getFeesTypes",
  }).then((resp) => {
    return resp.json();
  });
  return (
    <>
      <aside className="aside max-sm:w-full sm:min-w-[278px] relative flex flex-nowrap flex-col gap-4">
        <AsidePage />
        <AsideCategoriesServices
          feesData={feesData}
          service={service}
          category={category}
        />
      </aside>
      {children}
    </>
  );
};

export default ConcreteServiceLayout;
