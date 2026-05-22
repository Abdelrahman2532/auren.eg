'use client';

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, Star } from "lucide-react";

export default function Footer() {
  const [showPolicy, setShowPolicy] = useState(false);

  return (
<footer className="bg-[#120b08] text-white px-6 py-20 mt-20 border-t-2 border-[#3b2a22]">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-16">

        {/* BRAND */}
        <div>
          <h2 className="text-4xl font-bold mb-6 tracking-[0.25em]">
            AUREN
          </h2>

          <p className="text-gray-300 leading-8 text-lg">
            Silence is the ultimate luxury.
            <br />
            Not for everyone.
          </p>

          {/* REVIEWS */}
          <div className="mt-10">

            <div className="flex items-center gap-1 text-[#f5ede3]">

              <Star size={16} fill="white" />
              <Star size={16} fill="white" />
              <Star size={16} fill="white" />
              <Star size={16} fill="white" />
              <Star size={16} fill="white" />

              <span className="text-sm text-gray-400 ml-2">
                (128 Reviews)
              </span>

            </div>

            <p className="text-sm text-gray-400 leading-7 mt-4">
              Loved by customers for minimal premium quality
              and clean oversized fits.
            </p>

          </div>
        </div>

        {/* INSTAGRAM + POLICY */}
        <div className="flex flex-col gap-14">

          {/* INSTAGRAM */}
          <div>
            <h3 className="text-xl mb-5 uppercase tracking-[0.25em]">
              Instagram
            </h3>

            <Link
              href="https://www.instagram.com/auren.eg1?igsh=N25tZ2JxMGExN3lt"
              target="_blank"
              className="text-gray-300 hover:text-white transition text-lg"
            >
              @auren.eg1
            </Link>
          </div>

          {/* POLICY */}
          <div className="border-t border-white/10 pt-6">

            <button
              onClick={() => setShowPolicy(!showPolicy)}
              className="w-full flex items-center justify-between text-left"
            >
              <h3 className="text-lg tracking-[0.3em] uppercase">
                Policy
              </h3>

              <ChevronDown
                size={18}
                className={`transition-transform duration-300 ${
                  showPolicy ? "rotate-180" : ""
                }`}
              />
            </button>

            {showPolicy && (
              <div className="mt-6 space-y-5 text-gray-300 leading-8 text-sm">

                <p>
                  You have 2 days from the receipt of your order to initiate a return.
                </p>

                <p>
                  Items must be unused, in their original packaging,
                  and in the same condition as received.
                </p>

                <p>
                  Receipt or proof of purchase is required.
                </p>

                <p>
                  Check the item while the courier is there and return it immediately if there&apos;s an issue.
                </p>

                <p>
                  After delivery, report any problems with proof within 24 hours.
                </p>

              </div>
            )}

          </div>
        </div>

        {/* CONTACT */}
        <div className="flex flex-col justify-between">

          <div>

            <h3 className="text-xl mb-6 uppercase tracking-[0.25em]">
              Contact
            </h3>

            <div className="space-y-4 text-gray-300">

              <p>Egypt</p>

              <p>support@auren.store</p>

              {/* WHATSAPP */}
              <Link
                href="https://wa.me/201090382882"
                target="_blank"
                className="hover:text-white transition block"
              >
                +20 10 90382882
              </Link>

            </div>

          </div>

          <div className="mt-16">

            <p className="text-gray-500 text-sm">
              © 2026 AUREN. All rights reserved.
            </p>

          </div>

        </div>

      </div>

    </footer>
  );
}