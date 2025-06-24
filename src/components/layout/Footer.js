import Link from "next/link";
import SocialIcons from '@/components/layout/SocialIcons';

const Footer = ({ themeOption }) => {
  //console.log("themeoption", themeOption);

  const sections = Object.entries(themeOption.footerlinks)
    .filter(([key]) => key.includes("Label"))
    .map(([labelKey]) => {
      const base = labelKey.replace("Label", "");
      return {
        label: themeOption.footerlinks[labelKey],
        links: themeOption.footerlinks[`${base}Links`] || [],
        key: base,
      };
    });
  const copyrightText = themeOption?.copyrightText || "";
  const links = themeOption?.socialLinks || [];

  return (
    <footer className="pt-10">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="flex-1 mt-16 space-y-6 justify-between sm:flex md:space-y-0">
          {sections.map(({ label, links, key }, idx) => (
            <ul className="space-y-4 text-gray-600" key={idx}>
              <h4 className="text-gray-800 font-semibold sm:pb-2">{label}</h4>
              {links.map((item, index) => {
                // Dynamically find the link object (e.g., footerOneLink, footerThreeLink, etc.)
                const linkObj = item[Object.keys(item).find((k) => k.includes("Link"))];

                // Skip if link is null
                if (!linkObj) return null;

                return (
                  <li key={index}>
                    <Link
                      href={linkObj.url}
                      target={linkObj.target || "_self"}
                      rel={
                        linkObj.target === "_blank" ? "noopener noreferrer" : ""
                      }
                      className="hover:text-gray-800 duration-150"
                    >
                      {linkObj.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          ))}
        </div>
        <div className="mt-10 py-10 border-t items-center justify-between sm:flex">
          {copyrightText && <p className="text-gray-600">{copyrightText}</p>}
          {/* Social Icons */}
          <SocialIcons links={links} />
          
        </div>
      </div>
    </footer>
  );
};
export default Footer;
