import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  console.log(
  'SECRET =>',
  process.env.PAYMOB_SECRET_KEY
);

  try {

    const body = await req.json();

    const {
      amount,
      firstName,
      lastName,
      email,
      phone,
    } = body;

    // AUTH TOKEN
   const authResponse = await fetch(
  'https://accept.paymob.com/api/auth/tokens',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      api_key: process.env.PAYMOB_SECRET_KEY,
    }),
  }
);

const authData = await authResponse.json();

console.log('AUTH DATA =>', authData);

const token = authData.token;
    // ORDER
    const orderResponse = await fetch(
      'https://accept.paymob.com/api/ecommerce/orders',
      {
        method: 'POST',
        
        headers: {
          
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          auth_token: token,
          delivery_needed: false,
          amount_cents: amount * 100,
          currency: 'EGP',
          items: [],
        }),
      }
    );

    const orderData = await orderResponse.json();

    // PAYMENT KEY
    const paymentResponse = await fetch(
      'https://accept.paymob.com/api/acceptance/payment_keys',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        
        body: JSON.stringify({
          auth_token: token,
          amount_cents: amount * 100,
          expiration: 3600,
          order_id: orderData.id,
          billing_data: {
            apartment: 'NA',
            email,
            floor: 'NA',
            first_name: firstName,
            street: 'NA',
            building: 'NA',
            phone_number: phone,
            shipping_method: 'NA',
            postal_code: 'NA',
            city: 'Cairo',
            country: 'EG',
            last_name: lastName,
            state: 'Cairo',
          },
          currency: 'EGP',

          integration_id: 5676650,
        }),
      }
    );

    const paymentData = await paymentResponse.json();
  console.log('PAYMENT DATA =>', paymentData);

  console.log('TOKEN =>', paymentData.token);

    return NextResponse.json({
      token: paymentData.token,
    });

  }  catch (error: any) {

  console.log('PAYMOB ERROR =>', error);

  return NextResponse.json(
    {
      error: error?.message || 'Something went wrong',
    },
    {
      status: 500,
    }
  );
}
}