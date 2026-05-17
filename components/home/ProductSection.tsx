
import Link from "next/link";

export default function ProductSection() {
  return (
    <section
      id="products"
      className="bg-[#0d0d0d] text-white py-20 px-4 md:px-6"
    >
      <div className="max-w-6xl mx-auto">

        <h2 className="text-4xl font-bold mb-3">
          Products
        </h2>

        <p className="text-white/60 mb-10">
          Minimal. Clean. Not for everyone.
        </p>

        {/* PRODUCTS GRID */}
        <div className="grid grid-cols-2 gap-4 md:gap-6">

          {/* White Shirt */}
          <Link href="/products/white-henley">
            <div className="bg-[#111] p-3 md:p-5 rounded-2xl group">

              <div className="relative overflow-hidden rounded-xl aspect-[3/4]">

                {/* Original Image */}
                <img
                  src="/images/white-henley.jpg"
                  alt="White Henley Shirt"
                  className="w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
                />

                {/* Hover Image */}
                <img
                  src="/images/white-model.jpg"
                  alt="White Henley Model"
                  className="w-full h-full object-cover absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />

              </div>

              <h3 className="text-lg md:text-xl font-semibold mt-4 mb-2">
                White Henley
              </h3>

              <p className="text-white/70 mb-4 text-sm md:text-base">
                600 L.E
              </p>

              <div className="flex gap-2 md:gap-3">

                <span className="border border-white/20 px-3 py-1 md:px-4 md:py-2 rounded-full text-sm">
                  S
                </span>

                <span className="border border-white/20 px-3 py-1 md:px-4 md:py-2 rounded-full text-sm">
                  M
                </span>

                <span className="border border-white/20 px-3 py-1 md:px-4 md:py-2 rounded-full text-sm">
                  L
                </span>

              </div>
            </div>
          </Link>

          {/* Black Shirt */}
          <Link href="/products/black-henley">
            <div className="bg-[#111] p-3 md:p-5 rounded-2xl group">

              <div className="relative overflow-hidden rounded-xl aspect-[3/4]">

                {/* Original Image */}
                <img
                  src="/images/black-henley.jpg"
                  alt="Black Henley Shirt"
                  className="w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
                />

                {/* Hover Image */}
                <img
                  src="/images/black-model.jpg"
                  alt="Black Henley Model"
                  className="w-full h-full object-cover absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />

              </div>

              <h3 className="text-lg md:text-xl font-semibold mt-4 mb-2">
                Black Henley
              </h3>

              <p className="text-white/70 mb-4 text-sm md:text-base">
                600 L.E
              </p>

              <div className="flex gap-2 md:gap-3">

                <span className="border border-white/20 px-3 py-1 md:px-4 md:py-2 rounded-full text-sm">
                  S
                </span>

                <span className="border border-white/20 px-3 py-1 md:px-4 md:py-2 rounded-full text-sm">
                  M
                </span>

                <span className="border border-white/20 px-3 py-1 md:px-4 md:py-2 rounded-full text-sm">
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

