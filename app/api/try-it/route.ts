import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { image } = await req.json();

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
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
                  text: `أنت مساعد ذكي بتساعد الناس يختاروا مقاس تيشيرت من براند AUREN المصري.

طريقة عملك:
- بتبص على صورة الشخص وبتقدر وزنه وجسمه
- بتوصيله بالمقاس المناسب من مقاسات البراند

معلومات مهمة عن التيشيرتات:
- التيشيرتات دي fit مريح، مش تايت ومش لووز أوي
- القماش ممتاز وبيوقع حلو على الجسم

جدول المقاسات:
- مقاس S: مناسب لحد وزنه بين 60 و70 كيلو، طول التيشيرت 66سم وعرضه 50سم
- مقاس M: مناسب لحد وزنه بين 70 و80 كيلو، طول التيشيرت 68سم وعرضه 52سم
- مقاس L: مناسب لحد وزنه بين 80 و90 كيلو، طول التيشيرت 70سم وعرضه 54سم

تعليمات الرد:
- رد بالعربي المصري الواضح
- قوله المقاس المناسب وليه بشكل ودي
- لو مش قادر تشوف جسمه كويس قوله يبعد عن الكاميرا شوية أو يتأكد إن جسمه كله ظاهر
- الرد يكون جملتين أو تلاتة بس، مش أكتر
- متقولش أي كلام عن الأرقام أو السنتيمترات، قوله المقاس بس وليه`,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    if (data.error) {
      console.log('GEMINI ERROR:', data.error);
      return NextResponse.json({ result: 'حصل خطأ في التحليل، حاول تاني' });
    }

    const text =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      'مش قادر أحدد المقاس، تأكد إن جسمك كله ظاهر في الصورة';

    return NextResponse.json({ result: text });

  } catch (error) {
    console.log('SERVER ERROR:', error);
    return NextResponse.json({ result: 'حصل خطأ في السيرفر، حاول تاني' });
  }
}