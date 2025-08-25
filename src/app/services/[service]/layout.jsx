import {
  AsideCategoriesServices,
  AsidePage,
} from "@components/aside/components";

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
