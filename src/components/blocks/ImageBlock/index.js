export default function ImageBlock({ image }) {
    return (
    <section className="py-5">
      <div className="max-w-screen-xl mx-auto text-gray-600 gap-x-12 items-center justify-between overflow-hidden md:flex md:px-8">
      <img
        src={image?.node?.sourceUrl}
        alt={image?.altText || ""}
        className="w-full rounded mb-6"
      />
      </div>
      </section>
    );
  }
  