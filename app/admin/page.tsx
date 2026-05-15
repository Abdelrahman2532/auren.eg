"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminPage() {

  const [orders, setOrders] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    fetchOrders();
    fetchReviews();
  }, []);

  const fetchOrders = async () => {

    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setOrders(data);
    }
  };

  const fetchReviews = async () => {

    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setReviews(data);
    }
  };

  const deleteReview = async (id: string) => {

    await supabase
      .from("reviews")
      .delete()
      .eq("id", id);

    fetchReviews();
  };

  return (
    <main className="min-h-screen bg-black text-white p-10">

      <h1 className="text-5xl mb-12 font-bold">
        ADMIN DASHBOARD
      </h1>

      {/* ORDERS */}
      <div className="mb-20">

        <h2 className="text-3xl mb-8">
          Orders
        </h2>

        <div className="space-y-6">

          {orders.map((order) => (

            <div
              key={order.id}
              className="border border-white/10 rounded-2xl p-6"
            >

              <div className="space-y-2">

                <p>
                  <span className="text-gray-400">
                    Name:
                  </span>{" "}
                  {order.name}
                </p>

                <p>
                  <span className="text-gray-400">
                    Phone:
                  </span>{" "}
                  {order.phone}
                </p>

                <p>
                  <span className="text-gray-400">
                    Address:
                  </span>{" "}
                  {order.address}
                </p>

                <p>
                  <span className="text-gray-400">
                    Total:
                  </span>{" "}
                  {order.total} L.E
                </p>

              </div>

            </div>

          ))}

        </div>

      </div>

      {/* REVIEWS */}
      <div>

        <h2 className="text-3xl mb-8">
          Reviews
        </h2>

        <div className="space-y-6">

          {reviews.map((review) => (

            <div
              key={review.id}
              className="border border-white/10 rounded-2xl p-6 flex items-center justify-between"
            >

              <div>

                <h3 className="text-xl mb-2">
                  {review.name}
                </h3>

                <p className="text-gray-400">
                  {review.text}
                </p>

              </div>

              <button
                onClick={() =>
                  deleteReview(review.id)
                }
                className="bg-red-500 px-5 py-3 rounded-xl"
              >
                Delete
              </button>

            </div>

          ))}

        </div>

      </div>

    </main>
  );
}