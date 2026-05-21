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

  const [productName, setProductName] =
    useState('');

  const [productPrice, setProductPrice] =
    useState('');

  const [productDescription, setProductDescription] =
    useState('');

  const [fabric, setFabric] =
    useState('');

  const [fit, setFit] =
    useState('');

  const [styling, setStyling] =
    useState('');

  const [sizes, setSizes] =
    useState('');

  const [colors, setColors] =
   useState('');

  const [mainImage, setMainImage] =
   useState<File | null>(null);

  const [hoverImage, setHoverImage] =
   useState<File | null>(null);

  const [galleryImages, setGalleryImages] =
   useState<FileList | null>(null);

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
  async function uploadImage(file: File) {

   const fileName =
    `${Date.now()}-${file.name}`;

   const { error } =
     await supabase.storage
      .from('products')
      .upload(fileName, file);

  if (error) {
    console.log(error);
    return null;
  }

  const {
    data: { publicUrl },
  } = supabase.storage
    .from('products')
    .getPublicUrl(fileName);

  return publicUrl;
}
async function addProduct() {

  try {

    if (
      !mainImage ||
      !hoverImage
    ) {
      toast.error(
        'Upload images first'
      );
      return;
    }

    const mainImageUrl =
      await uploadImage(mainImage);

    const hoverImageUrl =
      await uploadImage(hoverImage);

    const galleryUrls = [];

    if (galleryImages) {

      for (
        let i = 0;
        i < galleryImages.length;
        i++
      ) {

        const url =
          await uploadImage(
            galleryImages[i]
          );

        if (url) {
          galleryUrls.push(url);
        }
      }
    }

    const slug =
      productName
        .toLowerCase()
        .replaceAll(' ', '-');

    const { error } =
      await supabase
        .from('products')
        .insert({

          name: productName,

          slug,

          price: Number(
            productPrice
          ),

          description:
            productDescription,

          fabric,

          fit,

          styling,

          main_image:
            mainImageUrl,

          hover_image:
            hoverImageUrl,

          gallery_images:
            galleryUrls,

          sizes:
            sizes.split(','),

          colors:
            colors.split(','),

        });

    if (error) {

      console.log(error);

      toast.error(
        'Failed to add product'
      );

      return;
    }

    toast.success(
      'Product added successfully'
    );

  } catch (error) {

    console.log(error);

    toast.error(
      'Something went wrong'
    );
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
          <button
  onClick={() =>
    setTab('products')
  }
  className={`whitespace-nowrap px-4 py-3 rounded-xl transition ${
    tab === 'products'
      ? 'bg-[#3b2a22]'
      : 'hover:bg-[#241814]'
  }`}
>
  Products
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

                    {/* FULL ORDER INFO */}
                    <div className="bg-[#1a120e] rounded-2xl p-4 md:p-6 space-y-4">

                      <div>
                        <p className="text-[#b89f8c] text-sm mb-1">
                          Address
                        </p>

                        <p className="break-words">
                          {order.address}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        <div>
                          <p className="text-[#b89f8c] text-sm mb-1">
                            City
                          </p>

                          <p>
                            {order.city}
                          </p>
                        </div>

                        <div>
                          <p className="text-[#b89f8c] text-sm mb-1">
                            Governorate
                          </p>

                          <p>
                            {order.governorate}
                          </p>
                        </div>

                      </div>

                      {order.notes && (

                        <div>
                          <p className="text-[#b89f8c] text-sm mb-1">
                            Notes
                          </p>

                          <p className="break-words">
                            {order.notes}
                          </p>
                        </div>

                      )}

                      <div>

                        <p className="text-[#b89f8c] text-sm mb-4">
                          Ordered Items
                        </p>

                        <div className="space-y-4">

                          {order.items?.map(
                            (
                              item: any,
                              index: number
                            ) => (

                              <div
                                key={index}
                                className="bg-[#241814] rounded-xl p-4"
                              >

                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                                  <div>

                                    <p className="font-semibold text-lg">
                                      {item.name}
                                    </p>

                                    <div className="space-y-1 mt-2 text-sm text-[#b89f8c]">

                                      <p>
                                        Size: {item.size}
                                      </p>

                                      <p>
                                        Color: {item.color || 'N/A'}
                                      </p>

                                      <p>
                                        Quantity: {item.quantity}
                                      </p>

                                      <p>
                                        Price: {item.price} EGP
                                      </p>

                                    </div>

                                  </div>

                                  <div className="text-left md:text-right">

                                    <p className="text-xl font-bold">
                                      {item.price * item.quantity} EGP
                                    </p>

                                  </div>

                                </div>

                              </div>

                            )
                          )}

                        </div>

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

    <div className="flex items-start justify-between gap-4">

      <div>

        <h3 className="font-semibold text-lg md:text-xl">
          {review.name}
        </h3>

        <p className="text-[#b89f8c] mt-1 break-words">
          Product: {review.product_slug}
        </p>

      </div>

      <button
        onClick={async () => {

          const confirmDelete =
            confirm(
              'Delete this review?'
            );

          if (!confirmDelete) return;

          const { error } =
            await supabase
              .from('reviews')
              .delete()
              .eq('id', review.id);

          if (error) {

            console.log(error);

            toast.error(
              'Failed to delete review'
            );

            return;
          }

          toast.success(
            'Review deleted'
          );

          fetchReviews();

        }}
        className="bg-red-500 hover:bg-red-600 transition px-4 py-2 rounded-xl text-sm font-semibold"
      >
        Delete
      </button>

    </div>

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
        {/* PRODUCTS */}
        {tab === 'products' && (

  <div>

    <h2 className="text-3xl font-bold mb-8">
      Add Product
    </h2>

    <div className="bg-[#2a1d18] p-6 rounded-2xl space-y-4">

      <input
        type="text"
        placeholder="Product Name"
        value={productName}
        onChange={(e) =>
          setProductName(
            e.target.value
          )
        }
        className="w-full bg-[#1a120e] p-4 rounded-xl outline-none"
      />

      <input
        type="number"
        placeholder="Price"
        value={productPrice}
        onChange={(e) =>
          setProductPrice(
            e.target.value
          )
        }
        className="w-full bg-[#1a120e] p-4 rounded-xl outline-none"
      />

      <textarea
        placeholder="Description"
        value={productDescription}
        onChange={(e) =>
          setProductDescription(
            e.target.value
          )
        }
        className="w-full bg-[#1a120e] p-4 rounded-xl outline-none min-h-[120px]"
      />

      <input
        type="text"
        placeholder="Fabric"
        value={fabric}
        onChange={(e) =>
          setFabric(
            e.target.value
          )
        }
        className="w-full bg-[#1a120e] p-4 rounded-xl outline-none"
      />

      <input
        type="text"
        placeholder="Fit"
        value={fit}
        onChange={(e) =>
          setFit(
            e.target.value
          )
        }
        className="w-full bg-[#1a120e] p-4 rounded-xl outline-none"
      />

      <input
        type="text"
        placeholder="Styling"
        value={styling}
        onChange={(e) =>
          setStyling(
            e.target.value
          )
        }
        className="w-full bg-[#1a120e] p-4 rounded-xl outline-none"
      />

      <input
        type="text"
        placeholder="Sizes example: S,M,L"
        value={sizes}
        onChange={(e) =>
          setSizes(
            e.target.value
          )
        }
        className="w-full bg-[#1a120e] p-4 rounded-xl outline-none"
      />

      <input
        type="text"
        placeholder="Colors example: White,Black"
        value={colors}
        onChange={(e) =>
          setColors(
            e.target.value
          )
        }
        className="w-full bg-[#1a120e] p-4 rounded-xl outline-none"
      />

      <div>

        <p className="mb-2">
          Main Image
        </p>

        <label
  htmlFor="mainImage"
  className="mb-2 block"
>
  Main Image
</label>

<input
  id="mainImage"
  type="file"
  accept="image/*"
  onChange={(e) =>
    setMainImage(
      e.target.files?.[0] ||
      null
    )
  }
/>
      </div>

      <div>

        <p className="mb-2">
          Hover Image
        </p>

        <label
  htmlFor="hoverImage"
  className="mb-2 block"
>
  Hover Image
</label>

<input
  id="hoverImage"
  type="file"
  accept="image/*"
  onChange={(e) =>
    setHoverImage(
      e.target.files?.[0] ||
      null
    )
  }
/>

      </div>

      <div>

        <p className="mb-2">
          Gallery Images
        </p>

        <label
  htmlFor="galleryImages"
  className="mb-2 block"
>
  Gallery Images
</label>

<input
  id="galleryImages"
  type="file"
  multiple
  accept="image/*"
  onChange={(e) =>
    setGalleryImages(
      e.target.files
    )
  }
/>

      </div>

      <button
        onClick={addProduct}
        className="bg-white text-black px-6 py-4 rounded-xl font-semibold"
      >
        Add Product
      </button>

    </div>

  </div>

)}



      </div>

    </main>

  );
}

