import React, { useState } from 'react';
import { Send, MessageSquare, Phone, CheckCircle2, XCircle, Clock, AlertTriangle, ShieldCheck, Database, Settings, HelpCircle, ArrowRight } from 'lucide-react';

export default function App() {
  const [platform, setPlatform] = useState('whatsapp');
  const [message, setMessage] = useState('');
  const [numbersInput, setNumbersInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('campaign'); // campaign | logs | settings

  const parseNumbers = (input) => {
    return input
      .split(/[\n,]+/)
      .map(n => n.trim())
      .filter(n => n.length > 0)
      .map(n => n.replace(/[^0-9+]/g, ''))
      .filter(n => n.length >= 10);
  };

  const handleStartSending = async () => {
    setError('');
    const validNumbers = parseNumbers(numbersInput);
    
    if (validNumbers.length === 0) {
      setError('لطفاً حداقل یک شماره معتبر وارد کنید.');
      return;
    }
    if (!message.trim()) {
      setError('متن پیام کمپین نمی‌تواند خالی باشد.');
      return;
    }

    const initialTasks = validNumbers.map(num => ({
      number: num,
      status: 'pending'
    }));
    
    setTasks(initialTasks);
    setIsSending(true);
    setProgress(0);
    setActiveTab('logs'); // سوئیچ خودکار به تب گزارشات هنگام ارسال

    for (let i = 0; i < initialTasks.length; i++) {
      setTasks(prev => prev.map((t, index) => 
        index === i ? { ...t, status: 'sending' } : t
      ));

      // تاخیر تصادفی بیزنسی جهت جلوگیری از اسپم (Anti-Ban)
      const delay = Math.floor(Math.random() * 800) + 1200;
      await new Promise(resolve => setTimeout(resolve, delay));

      const isSuccess = Math.random() > 0.08;

      setTasks(prev => prev.map((t, index) => 
        index === i ? { ...t, status: isSuccess ? 'success' : 'failed' } : t
      ));

      setProgress(Math.round(((i + 1) / initialTasks.length) * 100));
    }

    setIsSending(false);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#202124] font-sans flex flex-col select-none" dir="rtl">
      
      {/* Google Header / App Bar */}
      <header className="bg-white border-b border-[#dadce0] px-6 py-3.5 flex items-center justify-between shadow-sm z-20">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-[#1a73e8] rounded-xl flex items-center justify-center text-white font-bold shadow-md shadow-blue-200">
            S
          </div>
          <div>
            <h1 className="text-base font-semibold text-[#202124] leading-tight">SmartSender Enterprise</h1>
            <p className="text-xs text-[#5f6368]">سیستم هوشمند ارسال انبوه شرکتی</p>
          </div>
        </div>

        {/* Navigation Tabs (Google Style) */}
        <div className="flex bg-[#f1f3f4] p-1 rounded-xl border border-[#dadce0]/60">
          <button 
            onClick={() => setActiveTab('campaign')}
            className={`px-4 py-1.5 text-xs font-medium rounded-lg transition-all ${activeTab === 'campaign' ? 'bg-white text-[#1a73e8] shadow-sm font-semibold' : 'text-[#5f6368] hover:text-[#202124]'}`}
          >
            مدیریت کمپین
          </button>
          <button 
            onClick={() => setActiveTab('logs')}
            className={`px-4 py-1.5 text-xs font-medium rounded-lg transition-all ${activeTab === 'logs' ? 'bg-white text-[#1a73e8] shadow-sm font-semibold' : 'text-[#5f6368] hover:text-[#202124]'}`}
          >
            وضعیت و گزارشات ({tasks.length})
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#e6f4ea] text-[#137333] border border-[#ceead6]">
            <span className="w-2 h-2 rounded-full bg-[#137333] animate-pulse"></span>
            آماده ارسال
          </span>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-6 flex flex-col">
        
        {/* Error Alert Box */}
        {error && (
          <div className="mb-6 bg-[#fce8e6] border border-[#fad2cf] text-[#c5221f] px-4 py-3 rounded-xl flex items-center gap-3 text-sm font-medium animate-shake">
            <AlertTriangle size={18} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {activeTab === 'campaign' ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1">
            
            {/* Left Panel: Configuration */}
            <div className="md:col-span-1 space-y-6">
              
              {/* Platform Selector Card */}
              <div className="bg-white p-5 rounded-2xl border border-[#dadce0] shadow-sm space-y-3">
                <label className="text-xs font-semibold text-[#5f6368] uppercase tracking-wider">انتخاب کانال ارسال</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setPlatform('whatsapp')}
                    className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border text-xs font-medium transition-all ${platform === 'whatsapp' ? 'border-[#137333] bg-[#e6f4ea]/50 text-[#137333] font-semibold ring-1 ring-[#137333]' : 'border-[#dadce0] text-[#5f6368] hover:bg-[#f8f9fa]'}`}
                  >
                    <Phone size={16} />
                    واتس‌اپ بیزینس
                  </button>
                  <button
                    onClick={() => setPlatform('telegram')}
                    className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border text-xs font-medium transition-all ${platform === 'telegram' ? 'border-[#1a73e8] bg-[#e8f0fe] text-[#1a73e8] font-semibold ring-1 ring-[#1a73e8]' : 'border-[#dadce0] text-[#5f6368] hover:bg-[#f8f9fa]'}`}
                  >
                    <MessageSquare size={16} />
                    تلگرام شرکتی
                  </button>
                </div>
              </div>

              {/* Security & Anti-Ban Info Card */}
              <div className="bg-white p-5 rounded-2xl border border-[#dadce0] shadow-sm space-y-3">
                <div className="flex items-center gap-2 text-[#1a73e8]">
                  <ShieldCheck size={18} />
                  <span className="text-xs font-semibold">پروتکل ضد مسدودی (Anti-Ban)</span>
                </div>
                <p className="text-xs text-[#5f6368] leading-relaxed">
                  سیستم به صورت خودکار بین ارسال هر پیام بین ۱.۲ تا ۲ ثانیه تاخیر تصادفی اعمال می‌کند تا اکانت شما ایمن بماند.
                </p>
              </div>

            </div>

            {/* Right Panel: Inputs and Actions */}
            <div className="md:col-span-2 space-y-6 flex flex-col">
              
              {/* Message Template Card */}
              <div className="bg-white p-5 rounded-2xl border border-[#dadce0] shadow-sm space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-semibold text-[#5f6368] uppercase tracking-wider">متن پیام کمپین</label>
                  <span className="text-xs text-[#5f6368]">{message.length} کاراکتر</span>
                </div>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  disabled={isSending}
                  placeholder="سلام، دعوت‌نامه حضور در همایش سالانه شرکت ارسال شد..."
                  className="w-full h-36 bg-[#f8f9fa] border border-[#dadce0] rounded-xl p-3.5 text-sm text-[#202124] placeholder-[#80868b] focus:outline-none focus:border-[#1a73e8] focus:bg-white focus:ring-1 focus:ring-[#1a73e8] transition-all resize-none"
                />
              </div>

              {/* Numbers Input Card */}
              <div className="bg-white p-5 rounded-2xl border border-[#dadce0] shadow-sm space-y-2 flex-1 flex flex-col">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-semibold text-[#5f6368] uppercase tracking-wider">لیست شماره مخاطبین</label>
                  <span className="text-xs text-[#5f6368]">هر خط یک شماره یا جدا شده با کاما</span>
                </div>
                <textarea
                  value={numbersInput}
                  onChange={(e) => setNumbersInput(e.target.value)}
                  disabled={isSending}
                  placeholder="09123456789&#10;+989351234567"
                  className="w-full flex-1 min-h-[140px] bg-[#f8f9fa] border border-[#dadce0] rounded-xl p-3.5 text-sm text-[#202124] placeholder-[#80868b] focus:outline-none focus:border-[#1a73e8] focus:bg-white focus:ring-1 focus:ring-[#1a73e8] transition-all resize-none font-mono text-left"
                  dir="ltr"
                />
              </div>

              {/* Action Button */}
              <button
                onClick={handleStartSending}
                disabled={isSending}
                className={`w-full py-4 rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.99] ${
                  isSending 
                    ? 'bg-[#dadce0] cursor-not-allowed text-[#5f6368]' 
                    : 'bg-[#1a73e8] hover:bg-[#1557b0] shadow-blue-200'
                }`}
              >
                {isSending ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    در حال ارسال دسته‌ای...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    شروع ارسال کمپین ({parseNumbers(numbersInput).length} مخاطب)
                  </>
                )}
              </button>

            </div>

          </div>
        ) : (
          /* Logs & Progress Tab */
          <div className="bg-white rounded-2xl border border-[#dadce0] shadow-sm p-6 flex-1 flex flex-col space-y-6">
            
            <div className="flex justify-between items-center border-b border-[#dadce0] pb-4">
              <div>
                <h2 className="text-base font-semibold text-[#202124]">گزارش لحظه‌ای وضعیت ارسال</h2>
                <p className="text-xs text-[#5f6368]">پیگیری پیشرفت صف ارسال کمپین فعال</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-[#1a73e8]">{progress}% پیشرفت</span>
                <button 
                  onClick={() => setActiveTab('campaign')}
                  className="text-xs font-medium text-[#1a73e8] hover:underline flex items-center gap-1"
                >
                  بازگشت به تنظیمات <ArrowRight size={14} />
                </button>
              </div>
            </div>

            {/* Progress Bar (Google Material Style) */}
            <div className="w-full bg-[#f1f3f4] h-3 rounded-full overflow-hidden border border-[#dadce0]/40">
              <div 
                className="bg-[#1a73e8] h-full transition-all duration-300 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Tasks Data Grid */}
            <div className="flex-1 overflow-y-auto max-h-[380px] space-y-2 pr-1 custom-scrollbar">
              {tasks.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-16 text-[#5f6368]">
                  <Database size={40} className="text-[#dadce0] mb-2" />
                  <p className="text-sm">هیچ تسکی در صف ارسال وجود ندارد.</p>
                  <p className="text-xs text-[#80868b] mt-1">ابتدا شماره‌ها را وارد کرده و کمپین را آغاز کنید.</p>
                </div>
              ) : (
                tasks.map((task, idx) => (
                  <div key={idx} className="flex justify-between items-center bg-[#f8f9fa] hover:bg-[#f1f3f4] transition-colors p-3.5 rounded-xl border border-[#dadce0]">
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-[#80868b] font-mono w-6">#{idx + 1}</span>
                      <span className="text-sm font-mono font-medium text-[#202124]" dir="ltr">{task.number}</span>
                    </div>
                    <div>
                      {task.status === 'pending' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-[#f1f3f4] text-[#5f6368]">
                          <Clock size={13} /> در انتظار صف
                        </span>
                      )}
                      {task.status === 'sending' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-[#e8f0fe] text-[#1a73e8]">
                          <div className="w-3 h-3 border-2 border-[#1a73e8] border-t-transparent rounded-full animate-spin" /> در حال ارسال...
                        </span>
                      )}
                      {task.status === 'success' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-[#e6f4ea] text-[#137333]">
                          <CheckCircle2 size={13} /> موفق
                        </span>
                      )}
                      {task.status === 'failed' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-[#fce8e6] text-[#c5221f]">
                          <XCircle size={13} /> ناموفق
                        </span>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>

          </div>
        )}

      </main>

      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #dadce0; border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #bdc1c6; }
      `}} />
    </div>
  );
}
