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

        <p className="text-white/60 mb-16">
          Minimal. Clean. Not for everyone.
        </p>

        {/* ==================== */}
        {/* HENLEY COLLECTION */}
        {/* ==================== */}
        <div className="mb-16">

          <div className="flex items-center gap-4 mb-8">
            <h3 className="text-2xl font-semibold">Henleys T-shirts</h3>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          <div className="grid grid-cols-2 gap-4 md:gap-6">

            {/* White Henley */}
            <Link href="/products/white-henley">
              <div className="bg-[#111] p-3 md:p-5 rounded-2xl group">
                <div className="relative overflow-hidden rounded-xl aspect-[3/4]">
                  <img
                    src="/images/white-henley.jpg"
                    alt="White Henley Shirt"
                    className="w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
                  />
                  <img
                    src="/images/white-model.jpg"
                    alt="White Henley Model"
                    className="w-full h-full object-cover absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />
                </div>
                <h3 className="text-lg md:text-xl font-semibold mt-4 mb-2">White Henley</h3>
                <p className="text-white/70 mb-4 text-sm md:text-base">600 L.E</p>
                <div className="flex gap-2 md:gap-3">
                  <span className="border border-white/20 px-3 py-1 md:px-4 md:py-2 rounded-full text-sm">S</span>
                  <span className="border border-white/20 px-3 py-1 md:px-4 md:py-2 rounded-full text-sm">M</span>
                  <span className="border border-white/20 px-3 py-1 md:px-4 md:py-2 rounded-full text-sm">L</span>
                </div>
              </div>
            </Link>

            {/* Black Henley */}
            <Link href="/products/black-henley">
              <div className="bg-[#111] p-3 md:p-5 rounded-2xl group">
                <div className="relative overflow-hidden rounded-xl aspect-[3/4]">
                  <img
                    src="/images/black-henley.jpg"
                    alt="Black Henley Shirt"
                    className="w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
                  />
                  <img
                    src="/images/black-model.jpg"
                    alt="Black Henley Model"
                    className="w-full h-full object-cover absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />
                </div>
                <h3 className="text-lg md:text-xl font-semibold mt-4 mb-2">Black Henley</h3>
                <p className="text-white/70 mb-4 text-sm md:text-base">600 L.E</p>
                <div className="flex gap-2 md:gap-3">
                  <span className="border border-white/20 px-3 py-1 md:px-4 md:py-2 rounded-full text-sm">S</span>
                  <span className="relative border border-white/10 px-3 py-1 md:px-4 md:py-2 rounded-full text-sm text-white/20 line-through cursor-not-allowed">M</span>
                  <span className="border border-white/20 px-3 py-1 md:px-4 md:py-2 rounded-full text-sm">L</span>
                </div>
              </div>
            </Link>

            {/* Grey Henley */}
            <Link href="/products/grey-henley">
              <div className="bg-[#111] p-3 md:p-5 rounded-2xl group">
                <div className="relative overflow-hidden rounded-xl aspect-[3/4]">
                  <img
                    src="/images/grey-henley.png"
                    alt="Grey Henley Shirt"
                    className="w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
                  />
                  <img
                    src="/images/grey-model.png"
                    alt="Grey Henley Model"
                    className="w-full h-full object-cover absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />
                </div>
                <h3 className="text-lg md:text-xl font-semibold mt-4 mb-2">Grey Henley</h3>
                <p className="text-white/70 mb-4 text-sm md:text-base">600 L.E</p>
                <div className="flex gap-2 md:gap-3">
                  <span className="border border-white/20 px-3 py-1 md:px-4 md:py-2 rounded-full text-sm">S</span>
                  <span className="border border-white/20 px-3 py-1 md:px-4 md:py-2 rounded-full text-sm">M</span>
                  <span className="border border-white/20 px-3 py-1 md:px-4 md:py-2 rounded-full text-sm">L</span>
                </div>
              </div>
            </Link>

          </div>
        </div>

        {/* ==================== */}
        {/* BASIC COLLECTION */}
        {/* ==================== */}
        <div>

          <div className="flex items-center gap-4 mb-8">
            <h3 className="text-2xl font-semibold">Basics T-shirts</h3>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          <div className="grid grid-cols-2 gap-4 md:gap-6">

            {/* White Basic */}
            <Link href="/products/white-basic">
              <div className="bg-[#111] p-3 md:p-5 rounded-2xl group">
                <div className="relative overflow-hidden rounded-xl aspect-[3/4]">
                  <img
                    src="/images/white-basic.png"
                    alt="White Basic Shirt"
                    className="w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
                  />
                  <img
                    src="/images/white-basic-model.png"
                    alt="White Basic Model"
                    className="w-full h-full object-cover absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />
                </div>
                <h3 className="text-lg md:text-xl font-semibold mt-4 mb-2">White Basic</h3>
                <p className="text-white/70 mb-4 text-sm md:text-base">600 L.E</p>
                <div className="flex gap-2 md:gap-3">
                  <span className="border border-white/20 px-3 py-1 md:px-4 md:py-2 rounded-full text-sm">S</span>
                  <span className="border border-white/20 px-3 py-1 md:px-4 md:py-2 rounded-full text-sm">M</span>
                  <span className="border border-white/20 px-3 py-1 md:px-4 md:py-2 rounded-full text-sm">L</span>
                </div>
              </div>
            </Link>

            {/* Black Basic */}
            <Link href="/products/black-basic">
              <div className="bg-[#111] p-3 md:p-5 rounded-2xl group">
                <div className="relative overflow-hidden rounded-xl aspect-[3/4]">
                  <img
                    src="/images/black-basic.png"
                    alt="Black Basic Shirt"
                    className="w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
                  />
                  <img
                    src="/images/black-basic-model.png"
                    alt="Black Basic Model"
                    className="w-full h-full object-cover absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />
                </div>
                <h3 className="text-lg md:text-xl font-semibold mt-4 mb-2">Black Basic</h3>
                <p className="text-white/70 mb-4 text-sm md:text-base">600 L.E</p>
                <div className="flex gap-2 md:gap-3">
                  <span className="border border-white/20 px-3 py-1 md:px-4 md:py-2 rounded-full text-sm">S</span>
                  <span className="border border-white/20 px-3 py-1 md:px-4 md:py-2 rounded-full text-sm">M</span>
                  <span className="border border-white/20 px-3 py-1 md:px-4 md:py-2 rounded-full text-sm">L</span>
                </div>
              </div>
            </Link>

          </div>
        </div>

      </div>
    </section>
  );
}