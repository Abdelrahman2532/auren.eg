import Link from "next/link";
export default function ProductSection() {
  return (
    <section 
     id="products"
    className="bg-[#0d0d0d] text-white py-20 px-6">
      <div className="max-w-5xl mx-auto">

        <h2 className="text-4xl font-bold mb-3">
          Henley Shirt
        </h2>

        <p className="text-white/60 mb-10">
          Minimal. Clean. Not for everyone.
        </p>

        <div className="grid md:grid-cols-2 gap-6">

          {/* White Shirt */}
          <Link href="/products/white-henley">
          <div className="bg-[#111] p-5 rounded-2xl max-w-[420px] mx-auto group">

            <div className="relative overflow-hidden rounded-xl">

              {/* Original Image */}
              <img
                src="/images/white-henley.jpg"
                alt="White Henley Shirt"
                className="w-full h-[500px] object-cover transition-opacity duration-500 group-hover:opacity-0"
              />

              {/* Hover Image */}
              <img
                src="/images/white-model.jpg"
                alt="White Henley Model"
                className="w-full h-[500px] object-cover absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />

            </div>

            <h3 className="text-xl font-semibold mt-5 mb-2">
              White Henley
            </h3>

            <p className="text-white/70 mb-4">
              600 L.E
            </p>

            <div className="flex gap-3">
              <span className="border border-white/20 px-4 py-2 rounded-full">
                S
              </span>

              <span className="border border-white/20 px-4 py-2 rounded-full">
                M
              </span>

              <span className="border border-white/20 px-4 py-2 rounded-full">
                L
              </span>
            </div>
          </div>
          </Link>

          {/* Black Shirt */}
          <Link href="/products/black-henley">
          <div className="bg-[#111] p-5 rounded-2xl max-w-[420px] mx-auto group">

            <div className="relative overflow-hidden rounded-xl">

              {/* Original Image */}
              <img
                src="/images/black-henley.jpg"
                alt="Black Henley Shirt"
                className="w-full h-[500px] object-cover transition-opacity duration-500 group-hover:opacity-0"
              />

              {/* Hover Image */}
              <img
                src="/images/black-model.jpg"
                alt="Black Henley Model"
                className="w-full h-[500px] object-cover absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />

            </div>

            <h3 className="text-xl font-semibold mt-5 mb-2">
              Black Henley
            </h3>

            <p className="text-white/70 mb-4">
              600 L.E
            </p>

            <div className="flex gap-3">
              <span className="border border-white/20 px-4 py-2 rounded-full">
                S
              </span>

              <span className="border border-white/20 px-4 py-2 rounded-full">
                M
              </span>

              <span className="border border-white/20 px-4 py-2 rounded-full">
                L
              </span>
            </div>
          </div>
          </Link>
        </div>
      </div>
      
    </section>
  );
}