
'use client';

import { toast } from 'sonner';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function AdminDashboard() {

  const router = useRouter();

  const [tab, setTab] =
    useState('overview');

  const [orders, setOrders] =
    useState<any[]>([]);

  const [reviews, setReviews] =
    useState<any[]>([]);

  const [loadingPage, setLoadingPage] =
    useState(true);

  const [search, setSearch] =
    useState('');

  const [statusFilter, setStatusFilter] =
    useState('all');

  useEffect(() => {

    async function checkAdmin() {

      try {

        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          router.push('/');
          return;
        }

        if (
          user.email !==
          'ahmedadel555@auren.com'
        ) {
          router.push('/');
          return;
        }

        await fetchOrders();
        await fetchReviews();

      } catch (error) {

        console.log(error);

      } finally {

        setLoadingPage(false);

      }
    }

    checkAdmin();

  }, [router]);

  async function fetchOrders() {

    const { data, error } =
      await supabase
        .from('orders')
        .select('*')
        .order('created_at', {
          ascending: false,
        });

    if (error) {
      console.log(error);
      return;
    }

    if (data) {
      setOrders(data);
    }
  }

  async function fetchReviews() {

    const { data, error } =
      await supabase
        .from('reviews')
        .select('*')
        .order('created_at', {
          ascending: false,
        });

    if (error) {
      console.log(error);
      return;
    }

    if (data) {
      setReviews(data);
    }
  }

  const totalRevenue = orders.reduce(
    (sum, order) =>
      sum +
      (order.total_price ||
        order.total ||
        0),
    0
  );

  const pendingOrders = orders.filter(
    (order) =>
      order.order_status ===
      'pending'
  ).length;

  const deliveredOrders =
    orders.filter(
      (order) =>
        order.order_status ===
        'delivered'
    ).length;

  const filteredOrders =
    orders.filter((order) => {

      const matchesSearch =

        order.customer_name
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||

        order.phone
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesStatus =
        statusFilter === 'all' ||
        order.order_status ===
          statusFilter;

      return (
        matchesSearch &&
        matchesStatus
      );
    });

  if (loadingPage) {

    return (

      <div className="min-h-screen bg-[#1a120e] flex items-center justify-center">

        <h1 className="text-white text-3xl font-bold">
          Loading...
        </h1>

      </div>

    );
  }

  return (

    <main className="min-h-screen pt-20 md:pt-0 bg-[#1a120e] text-white flex flex-col md:flex-row">
      {/* SIDEBAR */}
      <div className="w-full md:w-[260px] bg-[#120c09] border-b md:border-b-0 md:border-r border-[#2d211b] p-4 md:p-6">

        <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-visible">

          <button
            onClick={() =>
              setTab('overview')
            }
            className={`whitespace-nowrap px-4 py-3 rounded-xl transition ${
              tab === 'overview'
                ? 'bg-[#3b2a22]'
                : 'hover:bg-[#241814]'
            }`}
          >
            Dashboard
          </button>

          <button
            onClick={() =>
              setTab('orders')
            }
            className={`whitespace-nowrap px-4 py-3 rounded-xl transition ${
              tab === 'orders'
                ? 'bg-[#3b2a22]'
                : 'hover:bg-[#241814]'
            }`}
          >
            Orders
          </button>

          <button
            onClick={() =>
              setTab('reviews')
            }
            className={`whitespace-nowrap px-4 py-3 rounded-xl transition ${
              tab === 'reviews'
                ? 'bg-[#3b2a22]'
                : 'hover:bg-[#241814]'
            }`}
          >
            Reviews
          </button>

          <button
            onClick={() =>
              setTab('analytics')
            }
            className={`whitespace-nowrap px-4 py-3 rounded-xl transition ${
              tab === 'analytics'
                ? 'bg-[#3b2a22]'
                : 'hover:bg-[#241814]'
            }`}
          >
            Analytics
          </button>

        </div>

      </div>

      {/* CONTENT */}
      <div className="flex-1 p-4 md:p-8 overflow-y-auto">

        {/* OVERVIEW */}
        {tab === 'overview' && (

          <div>

            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              Overview
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

              <div className="bg-[#2a1d18] p-6 rounded-2xl">

                <p className="text-[#b89f8c]">
                  Total Orders
                </p>

                <h3 className="text-3xl font-bold mt-3">
                  {orders.length}
                </h3>

              </div>

              <div className="bg-[#2a1d18] p-6 rounded-2xl">

                <p className="text-[#b89f8c]">
                  Total Revenue
                </p>

                <h3 className="text-3xl font-bold mt-3">
                  {totalRevenue} EGP
                </h3>

              </div>

              <div className="bg-[#2a1d18] p-6 rounded-2xl">

                <p className="text-[#b89f8c]">
                  Pending Orders
                </p>

                <h3 className="text-3xl font-bold mt-3">
                  {pendingOrders}
                </h3>

              </div>

              <div className="bg-[#2a1d18] p-6 rounded-2xl">

                <p className="text-[#b89f8c]">
                  Delivered Orders
                </p>

                <h3 className="text-3xl font-bold mt-3">
                  {deliveredOrders}
                </h3>

              </div>

            </div>

          </div>

        )}

        {/* ORDERS */}
        {tab === 'orders' && (

          <div>

            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              Orders
            </h2>

            <div className="flex flex-col md:flex-row gap-4 mb-8">

              <input
                type="text"
                placeholder="Search by customer or phone..."
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
                className="bg-[#2a1d18] border border-[#3b2a22] rounded-xl px-4 py-3 w-full outline-none"
              />

              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(
                    e.target.value
                  )
                }
                className="bg-[#2a1d18] border border-[#3b2a22] rounded-xl px-4 py-3 outline-none"
              >

                <option value="all">
                  All
                </option>

                <option value="pending">
                  Pending
                </option>

                <option value="confirmed">
                  Confirmed
                </option>

                <option value="shipped">
                  Shipped
                </option>

                <option value="delivered">
                  Delivered
                </option>

                <option value="cancelled">
                  Cancelled
                </option>

              </select>

            </div>

            <div className="space-y-6">

              {filteredOrders.length === 0 && (

                <p className="text-[#b89f8c]">
                  No orders found
                </p>

              )}

              {filteredOrders.map(
                (order) => (

                  <div
                    key={order.id}
                    className="bg-[#2a1d18] rounded-2xl p-4 md:p-6 border border-[#3b2a22]"
                  >

                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">

                      <div>

                        <h3 className="text-xl md:text-2xl font-semibold break-words">
                          {order.customer_name ||
                            order.name}
                        </h3>

                        <p className="text-[#b89f8c] mt-1 break-all">
                          {order.customer_email}
                        </p>

                        <p className="text-[#b89f8c]">
                          {order.phone}
                        </p>

                      </div>

                      <div className="text-left lg:text-right">

                        <p className="text-sm text-[#b89f8c]">

                          Subtotal:{' '}

                          {(order.total_price ||
                            order.total) -
                            (order.shipping_price ||
                              0)}{' '}
                          EGP

                        </p>

                        <p className="text-2xl font-bold">
                          {order.total_price ||
                            order.total}{' '}
                          EGP
                        </p>

                        <p className="text-sm text-[#b89f8c]">

                          Shipping:{' '}
                          {
                            order.shipping_price
                          }{' '}
                          EGP

                        </p>

                        <select
                          value={
                            order.order_status ||
                            'pending'
                          }
                          onChange={async (
                            e
                          ) => {

                            const newStatus =
                              e.target.value;

                            const {
                              error,
                            } =
                              await supabase
                                .from(
                                  'orders'
                                )
                                .update({
                                  order_status:
                                    newStatus,
                                })
                                .eq(
                                  'id',
                                  order.id
                                );

                            if (error) {

                              console.log(
                                error
                              );

                              toast.error(
                                'Failed to update status'
                              );

                              return;
                            }

                            fetchOrders();

                            toast.success(
                              'Order status updated'
                            );
                          }}
                          className="bg-[#1a120e] border border-[#3b2a22] px-3 py-2 rounded-lg text-sm mt-2 outline-none w-full lg:w-auto"
                        >

                          <option value="pending">
                            Pending
                          </option>

                          <option value="confirmed">
                            Confirmed
                          </option>

                          <option value="shipped">
                            Shipped
                          </option>

                          <option value="delivered">
                            Delivered
                          </option>

                          <option value="cancelled">
                            Cancelled
                          </option>

                        </select>

                        <p className="text-sm text-[#8d7564] mt-2">
                          {order.payment_method}
                        </p>

                      </div>

                    </div>

                  </div>

                )
              )}

            </div>

          </div>

        )}

        {/* REVIEWS */}
        {tab === 'reviews' && (

          <div>

            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              Reviews
            </h2>

            <div className="space-y-5">

              {reviews.length === 0 && (

                <p className="text-[#b89f8c]">
                  No reviews yet
                </p>

              )}

              {reviews.map((review) => (

                <div
                  key={review.id}
                  className="bg-[#2a1d18] p-4 md:p-6 rounded-2xl border border-[#3b2a22]"
                >

                  <h3 className="font-semibold text-lg md:text-xl">
                    {review.name}
                  </h3>

                  <p className="text-[#b89f8c] mt-1 break-words">
                    Product:{' '}
                    {review.product_slug}
                  </p>

                  <p className="text-[#e7d7cc] leading-7 break-words mt-4">
                    {review.text}
                  </p>

                </div>

              ))}

            </div>

          </div>

        )}

        {/* ANALYTICS */}
        {tab === 'analytics' && (

          <div>

            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              Analytics
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div className="bg-[#2a1d18] p-6 md:p-8 rounded-2xl">

                <h3 className="text-2xl font-semibold mb-6">
                  Orders Analytics
                </h3>

                <div className="space-y-4">

                  <div className="flex justify-between">
                    <span>
                      Total Orders
                    </span>

                    <span>
                      {orders.length}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>
                      Pending Orders
                    </span>

                    <span>
                      {pendingOrders}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>
                      Delivered Orders
                    </span>

                    <span>
                      {deliveredOrders}
                    </span>
                  </div>

                </div>

              </div>

              <div className="bg-[#2a1d18] p-6 md:p-8 rounded-2xl">

                <h3 className="text-2xl font-semibold mb-6">
                  Revenue Analytics
                </h3>

                <div className="space-y-4">

                  <div className="flex justify-between">
                    <span>
                      Total Revenue
                    </span>

                    <span>
                      {totalRevenue} EGP
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>
                      Total Reviews
                    </span>

                    <span>
                      {reviews.length}
                    </span>
                  </div>

                </div>

              </div>

            </div>

          </div>

        )}

      </div>

    </main>

  );
}

