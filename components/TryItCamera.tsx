'use client';

import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';

function speak(text: string) {
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = 'ar-EG';
  utter.rate = 0.9;
  window.speechSynthesis.speak(utter);
}

export default function TryItCamera({ onClose }: { onClose: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'analyzing' | 'done'>('loading');
  const [message, setMessage] = useState('جاري تشغيل الكاميرا...');
  const [result, setResult] = useState('');

  // تشغيل الكاميرا
  useEffect(() => {
    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setStatus('ready');
          setMessage('وقف قدام الكاميرا وخلي جسمك كله يظهر');
          speak('وقف قدام الكاميرا وخلي جسمك كله يظهر في الصورة');
        }
      } catch {
        setMessage('مش قادر يوصل للكاميرا');
        speak('مش قادر يوصل للكاميرا');
      }
    }
    startCamera();

    return () => {
      const stream = videoRef.current?.srcObject as MediaStream;
      stream?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  async function captureAndAnalyze() {
    if (!videoRef.current || !canvasRef.current) return;
    setStatus('analyzing');
    setMessage('بيحلل الصورة...');
    speak('استنى شوية بحلل الصورة');

    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx?.drawImage(video, 0, 0);

    const base64 = canvas.toDataURL('image/jpeg', 0.8).split(',')[1];

    try {
      const response = await fetch('/api/try-it', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: base64 }),
      });

      const data = await response.json();
      const text = data.result;
      setResult(text);
      setStatus('done');
      speak(text);
    } catch {
      setResult('حصل خطأ، حاول تاني');
      speak('حصل خطأ، حاول تاني');
      setStatus('ready');
    }
  }

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex flex-col">

      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
        <p className="text-white font-semibold tracking-widest uppercase text-sm">Try It</p>
        <button onClick={onClose} className="text-white/60 hover:text-white transition">
          <X size={20} />
        </button>
      </div>

      {/* Camera */}
      <div className="relative flex-1 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover scale-x-[-1]"
        />
        <canvas ref={canvasRef} className="hidden" />

        {/* الإطار */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="border-2 border-white/40 rounded-3xl w-[60%] h-[80%] flex items-center justify-center">
            <p className="text-white/30 text-xs tracking-widest uppercase">خليك جوا الإطار</p>
          </div>
        </div>

        {/* Status message */}
        <div className="absolute bottom-24 left-0 right-0 flex justify-center">
          <div className="bg-black/70 backdrop-blur-sm px-6 py-3 rounded-full">
            <p className="text-white text-sm text-center">{message}</p>
          </div>
        </div>
      </div>

      {/* Result */}
      {result && (
        <div className="bg-[#1a120e] border-t border-white/10 px-6 py-5">
          <p className="text-white/50 text-xs tracking-widest uppercase mb-2">النتيجة</p>
          <p className="text-white leading-7">{result}</p>
          <button
            onClick={() => { setResult(''); setStatus('ready'); setMessage('وقف قدام الكاميرا وخلي جسمك كله يظهر'); }}
            className="mt-4 text-white/40 text-xs underline"
          >
            حاول تاني
          </button>
        </div>
      )}

      {/* Button */}
      {status === 'ready' && !result && (
        <div className="px-6 py-6 border-t border-white/10">
          <button
            onClick={captureAndAnalyze}
            className="w-full bg-white text-black py-4 rounded-full font-semibold text-lg hover:bg-white/90 transition"
          >
            📸 صورني وحدد مقاسي
          </button>
        </div>
      )}

      {status === 'analyzing' && (
        <div className="px-6 py-6 border-t border-white/10 flex justify-center">
          <p className="text-white/50 text-sm">جاري التحليل...</p>
        </div>
      )}

    </div>
  );
}