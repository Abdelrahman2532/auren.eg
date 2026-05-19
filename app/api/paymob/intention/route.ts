import { NextResponse } from 'next/server';

export async function POST(req: Request) {

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

    const token = authData.token;

    // CREATE PAYMENT KEY
    const paymentResponse = await fetch(
      'https://accept.paymob.com/v1/intention/',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({
          amount: amount * 100,

          currency: 'EGP',

          payment_methods: [
            5676650
          ],

          items: [],

          billing_data: {
            apartment: 'NA',
            first_name: firstName,
            last_name: lastName,
            street: 'NA',
            building: 'NA',
            phone_number: phone,
            country: 'EG',
            email,
            floor: 'NA',
            state: 'NA',
            city: 'Cairo',
          },
        }),
      }
    );

    const paymentData =
      await paymentResponse.json();

    return NextResponse.json(paymentData);

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {
        error: 'Something went wrong',
      },
      {
        status: 500,
      }
    );
  }
}