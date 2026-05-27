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
  const [timer, setTimer] = useState(60);

  // تشغيل الكاميرا
  useEffect(() => {
    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setStatus('ready');
          setMessage('وقف قدام الكاميرا وخلي جسمك كله يظهر');
          speak('أهلاً! عندك 60 ثانية تقف قدام الكاميرا وخلي جسمك كله يظهر في الإطار');
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

  // التايمر
  useEffect(() => {
    if (status !== 'ready') return;

    if (timer === 0) {
      captureAndAnalyze();
      return;
    }

    // تنبيه صوتي كل 20 ثانية
    if (timer === 40) {
      speak('20 ثانية فضلت، تأكد إن جسمك كله ظاهر في الإطار');
    }
    if (timer === 20) {
      speak('20 ثانية فضلت، تأكد إن جسمك كله ظاهر في الإطار');
    }
    if (timer === 10) {
      speak('10 ثواني');
    }
    if (timer === 3) {
      speak('3');
    }
    if (timer === 2) {
      speak('2');
    }
    if (timer === 1) {
      speak('1');
    }

    const interval = setTimeout(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(interval);
  }, [timer, status]);

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
      setTimer(60);
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

        {/* التايمر */}
        {status === 'ready' && (
          <div className="absolute top-6 left-0 right-0 flex justify-center">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center border-2 ${
              timer <= 10 ? 'border-red-400 bg-red-400/20' : 'border-white/40 bg-black/50'
            }`}>
              <span className={`text-2xl font-bold ${timer <= 10 ? 'text-red-400' : 'text-white'}`}>
                {timer}
              </span>
            </div>
          </div>
        )}

        {/* Status message */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center">
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
            onClick={() => {
              setResult('');
              setStatus('ready');
              setTimer(60);
              setMessage('وقف قدام الكاميرا وخلي جسمك كله يظهر');
              speak('تمام! عندك 60 ثانية تاني، وقف قدام الكاميرا');
            }}
            className="mt-4 text-white/40 text-xs underline"
          >
            حاول تاني
          </button>
        </div>
      )}

      {/* analyzing */}
      {status === 'analyzing' && (
        <div className="px-6 py-6 border-t border-white/10 flex justify-center">
          <p className="text-white/50 text-sm">جاري التحليل...</p>
        </div>
      )}

    </div>
  );
}