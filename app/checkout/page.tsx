'use client';
import { toast } from 'sonner';
import { useState } from 'react';
import { useCartStore } from '@/lib/cart-store';
import { supabase } from '@/lib/supabase';

export default function CheckoutPage() {

  const { items, clearCart } = useCartStore();

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // FORM STATES
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [governorate, setGovernorate] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');

  // PAYMENT
  const [paymentMethod, setPaymentMethod] = useState('cash');

  const [loading, setLoading] = useState(false);

  // =========================
  // SHIPPING SYSTEM
  // =========================

  const gov = governorate.toLowerCase();

  let shippingPrice = 155;

// القاهرة والجيزة
if (
  governorate === 'Cairo' ||
  governorate === 'Giza'
) {
  shippingPrice = 80;
}

// اسكندرية
else if (
  governorate === 'Alexandria'
) {
  shippingPrice = 85;
}

// الدلتا
else if (
  governorate === 'Dakahlia' ||
  governorate === 'Gharbia' ||
  governorate === 'Monufia' ||
  governorate === 'Sharqia' ||
  governorate === 'Beheira' ||
  governorate === 'Kafr El Sheikh'
) {
  shippingPrice = 90;
}

// القناة
else if (
  governorate === 'Ismailia' ||
  governorate === 'Suez' ||
  governorate === 'Port Said'
) {
  shippingPrice = 95;
}

// شمال الصعيد + البحر الأحمر + مطروح
else if (
  governorate === 'Fayoum' ||
  governorate === 'Beni Suef' ||
  governorate === 'Minya' ||
  governorate === 'Red Sea' ||
  governorate === 'Matrouh'
) {
  shippingPrice = 110;
}

  const finalTotal = total + shippingPrice;

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
      toast.error('Please fill all fields');
      return;
    }

    if (items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    setLoading(true);

    // =========================
    // CASH ON DELIVERY
    // =========================

    if (paymentMethod === 'cash') {

      // INSERT ORDER
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert([
          {
            name: `${firstName} ${lastName}`,

            customer_name: `${firstName} ${lastName}`,
            customer_email: email,

            phone,
            address,
            governorate,
            city,

            items,

            total: finalTotal,
            total_price: finalTotal,

            shipping_price: shippingPrice,

            payment_method: 'cash',
            payment_status: 'pending',
            order_status: 'new',
          },
        ])
        .select();

      if (orderError) {

        console.log('ORDER ERROR:', orderError);

        setLoading(false);
        
        toast.error(orderError.message);


        return;
      }

      // ORDER ID
      const orderId = orderData?.[0]?.id;

      // INSERT ORDER ITEMS
      const orderItems = items.map((item) => ({
        order_id: orderId,

        product_id: item.id,
        product_name: item.name,

        size: item.size,

        quantity: item.quantity,

        price: item.price,

        image: item.image,
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      setLoading(false);

      if (itemsError) {

        console.log('ITEMS ERROR:', itemsError);

        toast.error(itemsError.message);
        return;
      }

      clearCart();
     
      window.location.href = '/order-success';

      return;
    }

    // =========================
    // PAYMOB CARD PAYMENT
    // =========================

    try {

      const response = await fetch(
        '/api/paymob/create-payment',
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON.stringify({
            amount: finalTotal,

            firstName,
            lastName,
            email,
            phone,
          }),
        }
      );

      const data = await response.json();

      setLoading(false);

      console.log(data);

      if (!response.ok) {

        toast.error(data.error || 'Payment failed');
        return;
      }

      // REDIRECT TO PAYMOB
      window.location.href =
        `https://accept.paymob.com/api/acceptance/iframes/5676650?payment_token=${data.token}`;

    } catch (error: any) {

      console.log(error);

      setLoading(false);

      toast.error(error.message || 'An error occurred');
    }
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
              type="email"
              placeholder="Email"
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

              <select
  value={governorate}
  onChange={(e) =>
    setGovernorate(e.target.value)
  }
  className="w-full bg-transparent border border-[#4b362c] px-5 py-4 rounded-xl outline-none focus:border-[#8b5e3c]"
>

  <option value="">
    Select Governorate
  </option>

  {/* القاهرة والجيزة */}
  <option value="Cairo">
    Cairo
  </option>

  <option value="Giza">
    Giza
  </option>

  {/* اسكندرية */}
  <option value="Alexandria">
    Alexandria
  </option>

  {/* الدلتا */}
  <option value="Dakahlia">
    Dakahlia
  </option>

  <option value="Gharbia">
    Gharbia
  </option>

  <option value="Monufia">
    Monufia
  </option>

  <option value="Sharqia">
    Sharqia
  </option>

  <option value="Beheira">
    Beheira
  </option>

  <option value="Kafr El Sheikh">
    Kafr El Sheikh
  </option>

  {/* القناة */}
  <option value="Ismailia">
    Ismailia
  </option>

  <option value="Suez">
    Suez
  </option>

  <option value="Port Said">
    Port Said
  </option>

  {/* شمال الصعيد */}
  <option value="Fayoum">
    Fayoum
  </option>

  <option value="Beni Suef">
    Beni Suef
  </option>

  <option value="Minya">
    Minya
  </option>

  {/* البحر الأحمر ومطروح */}
  <option value="Red Sea">
    Red Sea
  </option>

  <option value="Matrouh">
    Matrouh
  </option>

  {/* جنوب الصعيد وسينا */}
  <option value="Aswan">
    Aswan
  </option>

  <option value="Luxor">
    Luxor
  </option>

  <option value="Qena">
    Qena
  </option>

  <option value="Sohag">
    Sohag
  </option>

  <option value="New Valley">
    New Valley
  </option>

  <option value="North Sinai">
    North Sinai
  </option>

  <option value="South Sinai">
    South Sinai
  </option>

</select>

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

              <h3 className="text-lg font-medium mb-4">
                Payment Method
              </h3>

              <div className="space-y-3">

                {/* CASH */}
                <label className="flex items-center gap-3 cursor-pointer">

                  <input
                    type="radio"
                    value="cash"
                    checked={paymentMethod === 'cash'}
                    onChange={(e) =>
                      setPaymentMethod(e.target.value)
                    }
                  />

                  <span>
                    Cash on Delivery
                  </span>

                </label>

                {/* CARD */}
                <label className="flex items-center gap-3 cursor-pointer opacity-50">

                  <input
                    type="radio"
                    value="card"
                    disabled
                  />

                  <span>
                    Visa / Mastercard (Coming Soon)
                  </span>

                </label>

              </div>

            </div>

            {/* BUTTON */}
            <button
              onClick={handleOrder}
              disabled={loading}
              className="w-full bg-[#f5ede3] text-[#1a120e] py-4 rounded-xl font-semibold mt-6 hover:opacity-90 transition disabled:opacity-50"
            >
              {loading
                ? 'Processing...'
                : 'Complete Order'}
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

            {/* SUBTOTAL */}
            <div className="flex justify-between text-[#b8a89b] pt-4">

              <span>
                Subtotal
              </span>

              <span>
                {total} L.E
              </span>

            </div>

            {/* SHIPPING */}
            <div className="flex justify-between text-[#b8a89b]">

              <span>
                Shipping
              </span>

              <span>
                {shippingPrice} L.E
              </span>

            </div>

            {/* TOTAL */}
            <div className="flex justify-between pt-4 text-lg font-semibold border-t border-[#3b2a22]">

              <span>
                Total
              </span>

              <span>
                {finalTotal} L.E
              </span>

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}