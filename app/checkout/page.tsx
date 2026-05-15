
'use client';

import { useState } from 'react';
import { useCartStore } from '@/lib/cart-store';
import { supabase } from "@/lib/supabase";

export default function CheckoutPage() {

  const { items } = useCartStore();

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // FORM STATES
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [governorate, setGovernorate] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");

  const [loading, setLoading] = useState(false);

  // COMPLETE ORDER
  async function handleOrder() {

    if (
      !email ||
      !firstName ||
      !lastName ||
      !address ||
      !governorate ||
      !city ||
      !phone
    ) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    const { error } = await supabase
      .from("orders")
      .insert([
        {
         name: firstName + " " + lastName,
         phone,
         governorate,
         city,
         items,
         total,
        },
      ]);

    setLoading(false);

   if (error) {

  console.log("SUPABASE ERROR:", error);

  alert(error.message);

  return;
}
    alert("Order placed successfully");
  }

  return (
    <main className="min-h-screen bg-[#1a120e] text-[#f5ede3]">

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 px-6 py-12">

        {/* LEFT SIDE */}
        <div>

          <h2 className="text-2xl font-semibold mb-8">
            Checkout
          </h2>

          <div className="space-y-5">

            {/* EMAIL */}
            <input
              type="text"
              placeholder="Email or mobile phone number"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="w-full bg-transparent border border-[#4b362c] px-5 py-4 rounded-xl outline-none focus:border-[#8b5e3c]"
            />

            {/* FIRST + LAST NAME */}
            <div className="grid grid-cols-2 gap-4">

              <input
                type="text"
                placeholder="First name"
                value={firstName}
                onChange={(e) =>
                  setFirstName(e.target.value)
                }
                className="w-full bg-transparent border border-[#4b362c] px-5 py-4 rounded-xl outline-none focus:border-[#8b5e3c]"
              />

              <input
                type="text"
                placeholder="Last name"
                value={lastName}
                onChange={(e) =>
                  setLastName(e.target.value)
                }
                className="w-full bg-transparent border border-[#4b362c] px-5 py-4 rounded-xl outline-none focus:border-[#8b5e3c]"
              />

            </div>

            {/* ADDRESS */}
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) =>
                setAddress(e.target.value)
              }
              className="w-full bg-transparent border border-[#4b362c] px-5 py-4 rounded-xl outline-none focus:border-[#8b5e3c]"
            />

            {/* GOVERNORATE + CITY */}
            <div className="grid grid-cols-2 gap-4">

              <input
                type="text"
                placeholder="Governorate"
                value={governorate}
                onChange={(e) =>
                  setGovernorate(e.target.value)
                }
                className="w-full bg-transparent border border-[#4b362c] px-5 py-4 rounded-xl outline-none focus:border-[#8b5e3c]"
              />

              <input
                type="text"
                placeholder="City"
                value={city}
                onChange={(e) =>
                  setCity(e.target.value)
                }
                className="w-full bg-transparent border border-[#4b362c] px-5 py-4 rounded-xl outline-none focus:border-[#8b5e3c]"
              />

            </div>

            {/* PHONE */}
            <input
              type="text"
              placeholder="Phone"
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value)
              }
              className="w-full bg-transparent border border-[#4b362c] px-5 py-4 rounded-xl outline-none focus:border-[#8b5e3c]"
            />

            {/* PAYMENT */}
            <div className="border border-[#4b362c] rounded-xl p-5 mt-8">

              <h3 className="text-lg font-medium mb-2">
                Payment Method
              </h3>

              <p className="text-[#c8b6a6]">
                Cash on Delivery
              </p>

            </div>

            {/* BUTTON */}
            <button
              onClick={handleOrder}
              disabled={loading}
              className="w-full bg-[#f5ede3] text-[#1a120e] py-4 rounded-xl font-semibold mt-6 hover:opacity-90 transition"
            >
              {loading
                ? "Placing Order..."
                : "Complete Order"}
            </button>

          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="bg-[#221814] rounded-2xl p-6 h-fit">

          <h2 className="text-2xl font-semibold mb-6">
            Your Order
          </h2>

          <div className="space-y-4">

            {items.map((item) => (

              <div
                key={`${item.id}-${item.size}`}
                className="flex justify-between border-b border-[#3b2a22] pb-4"
              >

                <div>

                  <p className="font-medium">
                    {item.name}
                  </p>

                  <p className="text-sm text-[#b8a89b]">
                    Size {item.size} × {item.quantity}
                  </p>

                </div>

                <p>
                  {item.price * item.quantity} L.E
                </p>

              </div>

            ))}

            {/* TOTAL */}
            <div className="flex justify-between pt-4 text-lg font-semibold">

              <span>Total</span>

              <span>
                {total} L.E
              </span>

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}

