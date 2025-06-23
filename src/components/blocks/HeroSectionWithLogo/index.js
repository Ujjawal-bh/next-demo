import Link from "next/link";

export default function HeroSectionWithLogo({
  subheading,
  heading,
  description,
  ctaButtonOne,
  ctaButtonTwo,
  heroImage,
  logoSectionHeading,
  logoRepeater,
}) {
  return (
    <section className="py-28">
      <div className="max-w-screen-xl mx-auto text-gray-600 gap-x-12 items-center justify-between overflow-hidden md:flex md:px-8">
        <div className="flex-none space-y-5 px-4 sm:max-w-lg md:px-0 lg:max-w-xl">
          {subheading && (
            <h1 className="text-sm text-indigo-600 font-medium">
              {subheading}
            </h1>
          )}

          {heading && (
            <h2 className="text-4xl text-gray-800 font-extrabold md:text-5xl">
              {heading}
            </h2>
          )}

          {description && <p>{description}</p>}

          {(ctaButtonOne || ctaButtonTwo) && (
            <div className="items-center gap-x-3 space-y-3 sm:flex sm:space-y-0">
              {ctaButtonOne?.url && (
                <Link
                  href={ctaButtonOne.url || "#"}
                  target={ctaButtonOne.target || "_self"}
                  className="block py-2 px-4 text-center text-white font-medium bg-indigo-600 duration-150 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg shadow-lg hover:shadow-none"
                >
                  {ctaButtonOne.title || "Button"}
                </Link>
              )}

              {ctaButtonTwo?.url && (
                <Link
                  href={ctaButtonTwo.url || "#"}
                  target={ctaButtonTwo.target || "_self"}
                  className="flex items-center justify-center gap-x-2 py-2 px-4 text-gray-700 hover:text-gray-500 font-medium duration-150 active:bg-gray-100 border rounded-lg md:inline-flex"
                >
                  {ctaButtonTwo.title || "Button"}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              )}
            </div>
          )}
        </div>

        {heroImage?.node?.sourceUrl && (
          <div className="flex-none mt-14 md:mt-0 md:max-w-xl">
            <img
              src={heroImage.node.sourceUrl}
              className="md:rounded-tl-[108px]"
              alt={heroImage.node.altText || ""}
            />
          </div>
        )}
      </div>

      {(logoSectionHeading || logoRepeater?.length > 0) && (
        <div className="mt-14 px-4 md:px-8">
          {logoSectionHeading && (
            <p className="text-center text-sm text-gray-700 font-semibold">
              {logoSectionHeading}
            </p>
          )}

          {logoRepeater?.length > 0 && (
            <div className="flex justify-center items-center flex-wrap gap-x-12 gap-y-6 mt-6">
              {logoRepeater.map(
                (logoItem, index) =>
                  logoItem?.logo?.node?.sourceUrl && (
                    <img
                      key={index}
                      src={logoItem.logo.node.sourceUrl}
                      alt={logoItem.logo.node.altText || ""}
                      className="h-8 object-contain"
                    />
                  )
              )}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
