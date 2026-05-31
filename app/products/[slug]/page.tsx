"use client";
import TryItCamera from '@/components/TryItCamera';
import { useCartStore } from "@/lib/cart-store";
import Image from "next/image";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
const outOfStock = {
  "white-henley": ["S", "L"],
  "grey-henley": ["S"],
};
const products = {
  "white-henley": {
    name: "White Henley",
    price: 600,
    fabric: "Soft Ribbed",
    mainImage: "/images/white-henley.jpg",

    gallery: [
      "/images/white-model-1.jpg",
      "/images/white-model-2.jpg",
    ],
  },

  "black-henley": {
    name: "Black Henley",
    price: 600,
    fabric: "Soft Ribbed",
    mainImage: "/images/black-henley.jpg",

    gallery: [
      "/images/black-model-1.png",
      "/images/black-model-2.jpg",
    ],
  },
   "grey-henley": {
    name: "Grey Henley",
    price: 600,
    fabric: "Soft Ribbed",

    mainImage: "/images/grey-henley.png",

    gallery: [
      "/images/grey-model-1.png",
      "/images/grey-model-2.png",
    ],
  },
  "white-basic": {
    name: "White Basic",
    price: 600,
    fabric: "Premium Interlock",
    mainImage: "/images/white-basic.png",

    gallery: [
      "/images/white-basic-model-1.png",
      "/images/white-basic-model-2.jpg",
    ],
  },
  "black-basic": {
    name: "Black Basic",
    price: 600,
    fabric: "Premium Interlock",
    mainImage: "/images/black-basic.png",

    gallery: [
      "/images/black-basic-model-1.png",
      "/images/black-basic-model-2.png",
    ],
  },
};

export default function ProductPage({
  params,
}: {
  params: { slug: string };
}) {

  const router = useRouter();

  const { addItem } = useCartStore();

  const product =
    products[params.slug as keyof typeof products];

  const [selectedImage, setSelectedImage] =
    useState<string | null>(null);

  const [selectedSize, setSelectedSize] =
    useState("M");

  const [quantity, setQuantity] =
    useState(1);

  const [showSizeGuide, setShowSizeGuide] =
    useState(false);
  
  const [showTryIt, setShowTryIt] = useState(false);  

  const [activeTab, setActiveTab] =
    useState("description");

  const [reviews, setReviews] = useState<any[]>([]);

  const [reviewName, setReviewName] =
    useState("");

  const [reviewText, setReviewText] =
    useState("");

  const fetchReviews = async () => {

    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .eq("product_slug", params.slug)
      .order("created_at", { ascending: false });

    if (!error && data) {
      setReviews(data);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  if (!product) {
    return <div>Product not found</div>;
  }

  const submitReview = async () => {

    if (!reviewName || !reviewText) return;

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("You must login first");
      return;
    }

    const { error } = await supabase
      .from("reviews")
      .insert([
        {
          product_slug: params.slug,
          name: reviewName,
          text: reviewText,
        },
      ]);

    if (error) {
      alert("Something went wrong");
      return;
    }

    setReviewName("");
    setReviewText("");

    fetchReviews();
  };

  return (
    <section className="bg-white min-h-screen text-black py-10 px-6">

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">

        {/* LEFT SIDE */}
        <div>

          {/* MAIN IMAGE */}
          <div
            className="rounded-3xl overflow-hidden mb-6 cursor-pointer"
            onClick={() =>
              setSelectedImage(product.mainImage)
            }
          >
            <Image
              src={product.mainImage}
              alt={product.name}
              width={800}
              height={1000}
              className="w-full object-cover"
            />
          </div>

          {/* GALLERY */}
          <div className="grid grid-cols-2 gap-4">

            {product.gallery.map((img, index) => (

              <div
                key={index}
                className="rounded-2xl overflow-hidden cursor-pointer"
                onClick={() =>
                  setSelectedImage(img)
                }
              >
                <Image
                  src={img}
                  alt={product.name}
                  width={500}
                  height={700}
                  className="w-full object-cover"
                />
              </div>

            ))}

          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="pt-10 relative">

          <p className="tracking-[0.3em] text-gray-500 mb-4">
            AUREN
          </p>

          <h1 className="text-6xl font-light mb-6">
            {product.name}
          </h1>

          <p className="text-4xl mb-10">
            {product.price} L.E
          </p>

          {/* SIZE */}
          <div className="mb-10">

            <p className="mb-4 text-gray-600">
              Size
            </p>

            <div className="flex gap-4">

              {["S", "M", "L"].map((size) => {
  const isOutOfStock = outOfStock[params.slug as keyof typeof outOfStock]?.includes(size);
  return (
    <button
      key={size}
      onClick={() => {
        if (isOutOfStock) {
          alert("Out of Stock");
          return;
        }
        setSelectedSize(size);
      }}
      className={`w-14 h-14 rounded-full border transition-all duration-300 ${
        isOutOfStock
          ? "border-black/20 text-black/20 line-through cursor-not-allowed"
          : selectedSize === size
          ? "bg-black text-white border-black"
          : "border-black text-black"
      }`}
    >
      {size}
    </button>
  );
})}
            </div>

          </div>

          {/* QUANTITY */}
          <div className="mb-10">

            <p className="mb-4 text-gray-600">
              Quantity
            </p>

            <div className="flex items-center gap-4">

              <button
                onClick={() =>
                  setQuantity((prev) =>
                    prev > 1 ? prev - 1 : 1
                  )
                }
                className="w-12 h-12 border border-black rounded-full text-xl"
              >
                -
              </button>

              <span className="text-2xl w-10 text-center">
                {quantity}
              </span>

              <button
                onClick={() =>
                  setQuantity((prev) => prev + 1)
                }
                className="w-12 h-12 border border-black rounded-full text-xl"
              >
                +
              </button>

            </div>

          </div>

          {/* BUTTONS */}
          <div className="space-y-4">

            {/* ADD TO CART */}
            <button
              onClick={() => {

                addItem({
                  id: params.slug,
                  name: product.name,
                  price: product.price,
                  image: product.mainImage,
                  size: selectedSize,
                  quantity,
                });

                alert("Added to cart");

              }}
              className="w-full bg-black text-white py-5 rounded-full text-lg"
            >
              Add to cart
            </button>

            {/* BUY IT NOW */}
            <button
              onClick={() => {

                addItem({
                  id: params.slug,
                  name: product.name,
                  price: product.price,
                  image: product.mainImage,
                  size: selectedSize,
                  quantity,
                });

                router.push("/checkout");

              }}
              className="w-full border border-black py-4 rounded-full text-lg font-medium hover:bg-black hover:text-white transition"
            >
              Buy it now
            </button>
            {/* TRY IT */}
<button
  onClick={() => setShowTryIt(true)}
  className="w-full border border-black py-4 rounded-full text-lg font-medium hover:bg-black hover:text-white transition"
>
  Try it
</button>

{showTryIt && <TryItCamera onClose={() => setShowTryIt(false)} />}

          </div>

          {/* PRODUCT INFO */}
          <div className="mt-20 border-t border-black/10 pt-10">

            {/* TABS */}
            <div className="flex gap-10 text-lg mb-10">

              <button
                onClick={() => setActiveTab("description")}
                className={`pb-2 ${
                  activeTab === "description"
                    ? "border-b border-black"
                    : "text-black/50"
                }`}
              >
                Description
              </button>

              <button
                onClick={() => setActiveTab("reviews")}
                className={`pb-2 ${
                  activeTab === "reviews"
                    ? "border-b border-black"
                    : "text-black/50"
                }`}
              >
                Reviews
              </button>

              <button
                onClick={() => setActiveTab("policy")}
                className={`pb-2 ${
                  activeTab === "policy"
                    ? "border-b border-black"
                    : "text-black/50"
                }`}
              >
                Return Policy
              </button>

            </div>

            {/* DESCRIPTION */}
            {activeTab === "description" && (

              <div className="space-y-5 text-[#444] leading-8">

                <p>
                  <span className="font-semibold text-black">
                    Fabric :
                  </span>{" "}
                  {product.fabric}
                </p>

                <p>
                  <span className="font-semibold text-black">
                    Fit :
                  </span>{" "}
                  regular clean on the body without being tight
                </p>

                <p>
                  <span className="font-semibold text-black">
                    Styling :
                  </span>{" "}
                  suitable for any style, whether tailored or denim
                </p>

              </div>

            )}

            {/* REVIEWS */}
            {activeTab === "reviews" && (

              <div>

                <div className="space-y-6 mb-10">

                  {reviews.map((review, index) => (

                    <div
                      key={index}
                      className="border border-black/10 rounded-2xl p-5"
                    >
                      <h3 className="font-semibold mb-2">
                        {review.name}
                      </h3>

                      <p className="text-[#555]">
                        {review.text}
                      </p>

                      <p className="text-sm text-gray-400 mt-3">
                        Verified Customer
                      </p>
                    </div>

                  ))}

                </div>

                <div className="space-y-4">

                  <input
                    type="text"
                    placeholder="Your name"
                    value={reviewName}
                    onChange={(e) =>
                      setReviewName(e.target.value)
                    }
                    className="w-full border border-black/20 rounded-xl px-5 py-4 outline-none"
                  />

                  <textarea
                    placeholder="Write your review"
                    value={reviewText}
                    onChange={(e) =>
                      setReviewText(e.target.value)
                    }
                    className="w-full border border-black/20 rounded-xl px-5 py-4 outline-none h-32 resize-none"
                  />

                  <button
                    onClick={submitReview}
                    className="bg-black text-white px-8 py-4 rounded-full"
                  >
                    Submit Review
                  </button>

                </div>

              </div>

            )}

            {/* RETURN POLICY */}
            {activeTab === "policy" && (

              <div className="space-y-5 text-[#444] leading-8">

                <p>
                  You have 2 days from the receipt of your order to initiate a return.
                </p>

                <p>
                  Items must be unused, in their original packaging, and in the same condition as received.
                </p>

                <p>
                  Receipt or proof of purchase is required.
                </p>

                <p>
                  Check the item while the courier is there and return it immediately if there’s an issue.
                </p>

                <p>
                  After delivery, report any problems with proof within 24 hours.
                </p>

              </div>

            )}

          </div>

        </div>

      </div>

      {/* SIZE GUIDE BUTTON */}
      <div className="fixed right-5 top-1/2 -translate-y-1/2 z-50">

        <button
          onClick={() => setShowSizeGuide(true)}
          className="bg-white border border-black rounded-xl px-4 py-8 shadow-lg hover:bg-black hover:text-white transition"
        >
          <h3 className="rotate-180 [writing-mode:vertical-rl] text-sm tracking-[0.2em] uppercase">
            Size Guide
          </h3>
        </button>

      </div>

      {/* SIZE GUIDE POPUP */}
      {showSizeGuide && (

        <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center">

          <div className="bg-[#111] text-white rounded-3xl p-10 w-[90%] max-w-3xl relative">

            <button
              onClick={() => setShowSizeGuide(false)}
              className="absolute top-5 right-5 text-3xl"
            >
              ×
            </button>

            <h2 className="text-3xl font-semibold mb-10 text-center tracking-[0.2em]">
              SIZE GUIDE
            </h2>

            <div className="grid grid-cols-4 text-center border border-[#333]">

              <div className="p-4 border-b border-r border-[#333] font-semibold">
                SIZE
              </div>

              <div className="p-4 border-b border-r border-[#333] font-semibold">
                LENGTH
              </div>

              <div className="p-4 border-b border-r border-[#333] font-semibold">
                WIDTH
              </div>

              <div className="p-4 border-b border-[#333] font-semibold">
                GUIDE
              </div>

              <div className="p-4 border-r border-t border-[#333]">S</div>
              <div className="p-4 border-r border-t border-[#333]">66</div>
              <div className="p-4 border-r border-t border-[#333]">50</div>
              <div className="p-4 border-t border-[#333]">60-70KG</div>

              <div className="p-4 border-r border-t border-[#333]">M</div>
              <div className="p-4 border-r border-t border-[#333]">68</div>
              <div className="p-4 border-r border-t border-[#333]">52</div>
              <div className="p-4 border-t border-[#333]">70-75KG</div>

              <div className="p-4 border-r border-t border-[#333]">L</div>
              <div className="p-4 border-r border-t border-[#333]">70</div>
              <div className="p-4 border-r border-t border-[#333]">54</div>
              <div className="p-4 border-t border-[#333]">80-85KG</div>

              <div className="p-4 border-r border-t border-[#333]">XL</div>
              <div className="p-4 border-r border-t border-[#333]">72</div>
              <div className="p-4 border-r border-t border-[#333]">56</div>
              <div className="p-4 border-t border-[#333]">85-90KG</div>

            </div>

          </div>

        </div>

      )}

      {/* IMAGE POPUP */}
      {selectedImage && (

        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-6"
          onClick={() => setSelectedImage(null)}
        >

          <div className="relative max-w-xl w-full">

            <Image
              src={selectedImage}
              alt="Preview"
              width={800}
              height={1000}
              className="w-full h-auto rounded-2xl object-contain"
            />

          </div>

        </div>

      )}

    </section>
  );
}