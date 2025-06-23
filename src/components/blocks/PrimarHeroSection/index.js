// HeroSection Block Component
import Link from "next/link";
export default function PrimarHeroSection({
  description,
  heading,
  ctaButtonTwo,
  ctaButtonOne,
}) {
  return (
    <section className="mt-24 mx-auto max-w-screen-xl pb-4 px-4 sm:px-8">
      <div className="text-center space-y-4">
        {heading && (
          <h1 className="text-gray-800 font-bold text-4xl md:text-5xl">
            {heading}
          </h1>
        )}
        {description && (
          <p className="text-gray-500 max-w-xl mx-auto leading-relaxed">
            {description}
          </p>
        )}
      </div>
      <div className="mt-12 justify-center items-center space-y-3 sm:space-x-6 sm:space-y-0 sm:flex">
        {ctaButtonTwo?.url && (
          <Link
            href={ctaButtonTwo.url}
            target={ctaButtonTwo.target}
            className="px-10 py-3.5 w-full bg-indigo-600 text-white text-center rounded-md shadow-md block sm:w-auto"
          >
            {ctaButtonTwo.title}
          </Link>
        )}

        {ctaButtonOne?.url && (
          <Link
            href={ctaButtonOne.url}
            target={ctaButtonOne.target}
            className="px-10 py-3.5 w-full text-gray-500 text-center border rounded-md duration-300 hover:text-indigo-600 hover:shadow block sm:w-auto"
          >
            {ctaButtonOne.title}
          </Link>
        )}
      </div>
    </section>
  );
}
