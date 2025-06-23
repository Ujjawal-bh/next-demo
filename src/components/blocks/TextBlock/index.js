// TextBlock Block Component
export default function TextBlock({ text }) {
    return <section className="py-5"><div className="max-w-screen-xl mx-auto text-gray-600 gap-x-12 items-center justify-between overflow-hidden md:flex md:px-8"><div className="prose mb-6" dangerouslySetInnerHTML={{__html: text}}/></div></section>
  }