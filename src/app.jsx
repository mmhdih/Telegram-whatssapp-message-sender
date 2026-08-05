import React, { useState, useEffect, useRef } from 'react';
import { Send, MessageCircle, Phone, CheckCircle2, XCircle, Clock, AlertCircle, Smartphone } from 'lucide-react';

export default function App() {
  const [platform, setPlatform] = useState('whatsapp');
  const [message, setMessage] = useState('');
  const [numbersInput, setNumbersInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');

  const parseNumbers = (input) => {
    return input
      .split(/[\n,]+/)
      .map(n => n.trim())
      .filter(n => n.length > 0)
      .map(n => {
        // حذف صفر اول و کاراکترهای اضافه برای استانداردسازی
        const cleanNumber = n.replace(/[^0-9+]/g, '');
        return cleanNumber;
      })
      .filter(n => n.length >= 10); // حداقل طول منطقی یک شماره
  };

  const handleStartSending = async () => {
    setError('');
    const validNumbers = parseNumbers(numbersInput);
    
    if (validNumbers.length === 0) {
      setError('لطفاً حداقل یک شماره معتبر وارد کنید.');
      return;
    }
    if (!message.trim()) {
      setError('متن پیام نمی‌تواند خالی باشد.');
      return;
    }

    // ایجاد لیست وظایف ارسال
    const initialTasks = validNumbers.map(num => ({
      number: num,
      status: 'pending' // pending, sending, success, failed
    }));
    
    setTasks(initialTasks);
    setIsSending(true);
    setProgress(0);

    // شبیه‌سازی ارسال تک به تک برای جلوگیری از بن شدن (Delay بین ارسال‌ها)
    for (let i = 0; i < initialTasks.length; i++) {
      // آپدیت وضعیت به در حال ارسال
      setTasks(prev => prev.map((t, index) => 
        index === i ? { ...t, status: 'sending' } : t
      ));

      // شبیه‌سازی زمان ارسال در شبکه (بین 1 تا 2 ثانیه)
      const delay = Math.floor(Math.random() * 1000) + 1000;
      await new Promise(resolve => setTimeout(resolve, delay));

      // شبیه‌سازی نتیجه (90% موفقیت)
      const isSuccess = Math.random() > 0.1;

      setTasks(prev => prev.map((t, index) => 
        index === i ? { ...t, status: isSuccess ? 'success' : 'failed' } : t
      ));

      setProgress(Math.round(((i + 1) / initialTasks.length) * 100));
    }

    setIsSending(false);
  };

  return (
    <div className="min-h-screen bg-[#F2F2F7] flex items-center justify-center p-4 font-sans dir-rtl" style={{ direction: 'rtl' }}>
      
      {/* Container اصلی با ظاهر اپل */}
      <div className="bg-white w-full max-w-md rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden border border-gray-100 flex flex-col h-[85vh]">
        
        {/* Header (iOS Style) */}
        <div className="bg-white/80 backdrop-blur-md pt-12 pb-4 px-6 sticky top-0 z-10 border-b border-gray-100">
          <h1 className="text-2xl font-bold text-gray-900 text-center tracking-tight">ارسال گروهی</h1>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Segmented Control برای انتخاب پلتفرم */}
          <div className="bg-[#EEEEF0] p-1 rounded-xl flex relative">
            <div 
              className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white rounded-lg shadow-sm transition-all duration-300 ease-in-out ${platform === 'whatsapp' ? 'right-1' : 'right-[50%]'}`}
            />
            <button 
              onClick={() => setPlatform('whatsapp')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium z-10 transition-colors ${platform === 'whatsapp' ? 'text-green-600' : 'text-gray-500'}`}
            >
              <Phone size={18} />
              واتس‌اپ
            </button>
            <button 
              onClick={() => setPlatform('telegram')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium z-10 transition-colors ${platform === 'telegram' ? 'text-blue-500' : 'text-gray-500'}`}
            >
              <MessageCircle size={18} />
              تلگرام
            </button>
          </div>

          {/* ارور باکس */}
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-xl flex items-center gap-2 text-sm font-medium animate-pulse">
              <AlertCircle size={18} />
              {error}
            </div>
          )}

          {/* فیلد متن پیام */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 px-1">متن پیام</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={isSending}
              placeholder="سلام، این یک پیام تستی است..."
              className="w-full h-32 bg-gray-50 border border-gray-200 rounded-2xl p-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all resize-none text-base"
            />
          </div>

          {/* فیلد شماره‌ها */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 px-1 flex justify-between">
              <span>لیست شماره‌ها</span>
              <span className="text-xs text-gray-400">با خط جدید یا کاما جدا کنید</span>
            </label>
            <textarea
              value={numbersInput}
              onChange={(e) => setNumbersInput(e.target.value)}
              disabled={isSending}
              placeholder="09123456789&#10;+989351234567"
              className="w-full h-32 bg-gray-50 border border-gray-200 rounded-2xl p-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all resize-none text-left"
              dir="ltr"
            />
          </div>

          {/* نمایش وضعیت و نوار پیشرفت هنگام ارسال */}
          {tasks.length > 0 && (
            <div className="bg-gray-50 rounded-2xl p-4 space-y-4 border border-gray-100">
              <div className="flex justify-between items-center text-sm font-medium">
                <span className="text-gray-700">وضعیت ارسال</span>
                <span className="text-blue-600">{progress}%</span>
              </div>
              
              {/* Progress Bar */}
              <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-500 ease-out ${platform === 'whatsapp' ? 'bg-green-500' : 'bg-blue-500'}`}
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* لیست شماره‌ها و استاتوس */}
              <div className="max-h-40 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
                {tasks.map((task, idx) => (
                  <div key={idx} className="flex justify-between items-center bg-white p-2 rounded-lg shadow-sm border border-gray-50 text-sm">
                    <span className="text-gray-600 font-mono" dir="ltr">{task.number}</span>
                    <div>
                      {task.status === 'pending' && <Clock size={16} className="text-gray-400" />}
                      {task.status === 'sending' && <Send size={16} className="text-blue-500 animate-pulse" />}
                      {task.status === 'success' && <CheckCircle2 size={16} className="text-green-500" />}
                      {task.status === 'failed' && <XCircle size={16} className="text-red-500" />}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* بخش پایین و دکمه ارسال (iOS Style Bottom Area) */}
        <div className="p-6 bg-white border-t border-gray-100">
          <button
            onClick={handleStartSending}
            disabled={isSending}
            className={`w-full flex items-center justify-center gap-2 py-4 rounded-2xl text-white font-semibold text-lg transition-all active:scale-[0.98] ${
              isSending 
                ? 'bg-gray-400 cursor-not-allowed' 
                : platform === 'whatsapp' 
                  ? 'bg-[#34C759] hover:bg-green-600 shadow-lg shadow-green-200' 
                  : 'bg-[#007AFF] hover:bg-blue-600 shadow-lg shadow-blue-200'
            }`}
          >
            {isSending ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                در حال ارسال...
              </>
            ) : (
              <>
                <Send size={20} />
                ارسال به {platform === 'whatsapp' ? 'واتس‌اپ' : 'تلگرام'}
              </>
            )}
          </button>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #E5E7EB; border-radius: 4px; }
      `}} />
    </div>
  );
}