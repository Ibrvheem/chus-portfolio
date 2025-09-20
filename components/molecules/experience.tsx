import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionPanel,
} from "@/components/animate-ui/components/base/accordion";
import Image from "next/image";

const ITEMS = [
  {
    logo: "./icons/amiron.svg",
    company: "Amiron Ventures",
    role: "Freelance Product Designer",
    year: "2021 - 2023",
    content:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rem dolore dignissimos, nostrum cupiditate nam soluta cum repudiandae odit et maxime totam officiis fugit, excepturi in? Qui eius ad nulla incidunt illum quos exercitationem vero nesciunt reprehenderit voluptatem maxime aut, cumque ullam aliquid ipsum, amet ducimus doloribus nisi atque? Libero sint, iusto ea doloremque sed odit quam doloribus alias, reiciendis nisi repudiandae. At porro aliquid quisquam fugiat placeat quaerat labore quam ad minima est quis alias, illo sapiente. Ullam ratione sint ut doloribus, ad et, vero blanditiis libero mollitia, laborum consequatur vel quae. Tempore provident saepe nam officia eos. Numquam quis illum mollitia molestiae repudiandae voluptatibus nostrum alias eaque tempora, tenetur amet vitae illo veniam vel cupiditate deleniti voluptates culpa id recusandae quia cumque magni quaerat? Odio illum sit porro quas voluptatem sint laudantium fugit eaque amet, ducimus praesentium quae reprehenderit animi, nisi ipsa minus officiis! Necessitatibus nulla doloribus, mollitia molestias neque ab sapiente voluptates. Inventore, cupiditate expedita quaerat facere accusamus neque eos natus non temporibus rerum eum quo deserunt nemo excepturi ducimus ipsum soluta repellendus praesentium. In, non doloribus. Enim provident assumenda vero fugiat nihil magni aspernatur animi sunt illo voluptatum, sapiente ab illum voluptatibus et dolore facilis architecto aut.",
  },
  {
    logo: "./icons/itcentral.svg",
    company: "iT Central Limited",
    role: "Junior Partner",
    year: "2021 - 2023",
    content:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rem dolore dignissimos, nostrum cupiditate nam soluta cum repudiandae odit et maxime totam officiis fugit, excepturi in? Qui eius ad nulla incidunt illum quos exercitationem vero nesciunt reprehenderit voluptatem maxime aut, cumque ullam aliquid ipsum, amet ducimus doloribus nisi atque? Libero sint, iusto ea doloremque sed odit quam doloribus alias, reiciendis nisi repudiandae. At porro aliquid quisquam fugiat placeat quaerat labore quam ad minima est quis alias, illo sapiente. Ullam ratione sint ut doloribus, ad et, vero blanditiis libero mollitia, laborum consequatur vel quae. Tempore provident saepe nam officia eos. Numquam quis illum mollitia molestiae repudiandae voluptatibus nostrum alias eaque tempora, tenetur amet vitae illo veniam vel cupiditate deleniti voluptates culpa id recusandae quia cumque magni quaerat? Odio illum sit porro quas voluptatem sint laudantium fugit eaque amet, ducimus praesentium quae reprehenderit animi, nisi ipsa minus officiis! Necessitatibus nulla doloribus, mollitia molestias neque ab sapiente voluptates. Inventore, cupiditate expedita quaerat facere accusamus neque eos natus non temporibus rerum eum quo deserunt nemo excepturi ducimus ipsum soluta repellendus praesentium. In, non doloribus. Enim provident assumenda vero fugiat nihil magni aspernatur animi sunt illo voluptatum, sapiente ab illum voluptatibus et dolore facilis architecto aut.",
  },
  {
    logo: "./icons/itcentral.svg",
    company: "iT Central Limited",
    role: "Product Design Tutor",
    year: "2021 - 2023",
    content:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rem dolore dignissimos, nostrum cupiditate nam soluta cum repudiandae odit et maxime totam officiis fugit, excepturi in? Qui eius ad nulla incidunt illum quos exercitationem vero nesciunt reprehenderit voluptatem maxime aut, cumque ullam aliquid ipsum, amet ducimus doloribus nisi atque? Libero sint, iusto ea doloremque sed odit quam doloribus alias, reiciendis nisi repudiandae. At porro aliquid quisquam fugiat placeat quaerat labore quam ad minima est quis alias, illo sapiente. Ullam ratione sint ut doloribus, ad et, vero blanditiis libero mollitia, laborum consequatur vel quae. Tempore provident saepe nam officia eos. Numquam quis illum mollitia molestiae repudiandae voluptatibus nostrum alias eaque tempora, tenetur amet vitae illo veniam vel cupiditate deleniti voluptates culpa id recusandae quia cumque magni quaerat? Odio illum sit porro quas voluptatem sint laudantium fugit eaque amet, ducimus praesentium quae reprehenderit animi, nisi ipsa minus officiis! Necessitatibus nulla doloribus, mollitia molestias neque ab sapiente voluptates. Inventore, cupiditate expedita quaerat facere accusamus neque eos natus non temporibus rerum eum quo deserunt nemo excepturi ducimus ipsum soluta repellendus praesentium. In, non doloribus. Enim provident assumenda vero fugiat nihil magni aspernatur animi sunt illo voluptatum, sapiente ab illum voluptatibus et dolore facilis architecto aut.",
  },
  {
    logo: "./icons/schoola.svg",
    company: "Schoola",
    role: "Product Designer",
    year: "2021 - 2023",
    content:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rem dolore dignissimos, nostrum cupiditate nam soluta cum repudiandae odit et maxime totam officiis fugit, excepturi in? Qui eius ad nulla incidunt illum quos exercitationem vero nesciunt reprehenderit voluptatem maxime aut, cumque ullam aliquid ipsum, amet ducimus doloribus nisi atque? Libero sint, iusto ea doloremque sed odit quam doloribus alias, reiciendis nisi repudiandae. At porro aliquid quisquam fugiat placeat quaerat labore quam ad minima est quis alias, illo sapiente. Ullam ratione sint ut doloribus, ad et, vero blanditiis libero mollitia, laborum consequatur vel quae. Tempore provident saepe nam officia eos. Numquam quis illum mollitia molestiae repudiandae voluptatibus nostrum alias eaque tempora, tenetur amet vitae illo veniam vel cupiditate deleniti voluptates culpa id recusandae quia cumque magni quaerat? Odio illum sit porro quas voluptatem sint laudantium fugit eaque amet, ducimus praesentium quae reprehenderit animi, nisi ipsa minus officiis! Necessitatibus nulla doloribus, mollitia molestias neque ab sapiente voluptates. Inventore, cupiditate expedita quaerat facere accusamus neque eos natus non temporibus rerum eum quo deserunt nemo excepturi ducimus ipsum soluta repellendus praesentium. In, non doloribus. Enim provident assumenda vero fugiat nihil magni aspernatur animi sunt illo voluptatum, sapiente ab illum voluptatibus et dolore facilis architecto aut.",
  },
];

type BaseAccordionDemoProps = {
  openMultiple?: boolean;
  keepRendered?: boolean;
  showArrow?: boolean;
};

export const Experience = ({
  openMultiple = false,
  keepRendered = false,
  showArrow = true,
}: BaseAccordionDemoProps) => {
  return (
    <div>
      <h1 className="font-gasoek-one text-4xl sm:text-6xl text-left text-white my-16">
        Experiences
      </h1>
      <Accordion openMultiple={openMultiple} className="">
        {ITEMS.map((item, index) => (
          <AccordionItem
            key={index}
            value={`item-${index + 1}`}
            className={
              "mt-4 border  px-4 rounded-[40px] bg-white/5 border-white/10 "
            }
          >
            <AccordionTrigger showArrow={showArrow}>
              <div className="flex flex-row items-center gap-4">
                <Image
                  src={item.logo}
                  height={24}
                  width={24}
                  alt={`${item.company} logo`}
                  className="bg-white rounded-full h-12 w-12 p-2"
                />

                <div>
                  <p className="text-lg font-semibold">{item.company}</p>
                  <div className="flex items-center gap-2 font-light text-white/70">
                    <p className="text-sm">{item.role}</p>
                    <div className="h-1 w-1 rounded-full bg-red-500" />
                    <p className="">{item.year}</p>
                  </div>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionPanel
              keepRendered={keepRendered}
              className={"text-left ml-16 text-white/40 font-normal"}
            >
              {item.content}
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};
