import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { image } = await req.json();

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                inline_data: {
                  mime_type: 'image/jpeg',
                  data: image,
                },
              },
              {
                text: `أنت مساعد متخصص في تحديد مقاسات الملابس.
شوف الصورة دي وحدد المقاس المناسب للشخص بناءً على جسمه.

مقاسات البراند:
مقاس S: طول 66سم، عرض 50سم، مناسب لـ 60-70 كيلو
مقاس M: طول 68سم، عرض 52سم، مناسب لـ 70-75 كيلو  
مقاس L: طول 70سم، عرض 54سم، مناسب لـ 80-85 كيلو

رد بالعربي بشكل طبيعي وودي، قولله المقاس المناسب وليه.
الرد يكون قصير مش أكتر من 3 جمل.`,
              },
            ],
          },
        ],
      }),
    }
  );

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text || 'مش قادر أحدد المقاس';

  return NextResponse.json({ result: text });
}