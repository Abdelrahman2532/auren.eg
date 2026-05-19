export default function OrderSuccessPage() {
  return (
    <main className="min-h-screen bg-[#1a120e] text-white flex items-center justify-center px-6">

      <div className="bg-[#2a1d18] p-10 rounded-3xl max-w-xl w-full text-center">

        <h1 className="text-4xl font-bold mb-4">
          Order Placed Successfully 🎉
        </h1>

        <p className="text-[#b89f8c] leading-8 mb-8">
          Thank you for shopping with AUREN.
          Your order has been received successfully.
        </p>

        <div className="flex flex-col gap-4">

          <a
            href="/"
            className="bg-[#f5ede3] text-[#1a120e] py-4 rounded-xl font-semibold"
          >
            Back To Home
          </a>

          <a
            href="https://wa.me/201090382882"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-[#3b2a22] py-4 rounded-xl"
          >
            Contact Support
          </a>

        </div>

      </div>

    </main>
  );
}