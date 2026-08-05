<div align="center">

# 🚀 اسمارت سندر (Smart Sender)

**اپلیکیشن دسکتاپ ارسال گروهی پیام برای واتس‌اپ و تلگرام با رابط کاربری iOS**

[![Build Status](https://img.shields.io/github/actions/workflow/status/mmhdih/Telegram-whatssapp-message-sender/build.yml?style=flat-square&logo=github&label=Build%20EXE)](https://github.com/mmhdih/Telegram-whatssapp-message-sender/actions)
[![React Version](https://img.shields.io/badge/React-18.2.0-blue?style=flat-square&logo=react)](https://reactjs.org/)
[![Electron Version](https://img.shields.io/badge/Electron-27.0-47848F?style=flat-square&logo=electron)](https://www.electronjs.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](LICENSE)

<br/>
<!-- اینجا می‌توانید آدرس یک اسکرین‌شات از برنامه خود را قرار دهید -->
<img src="https://via.placeholder.com/600x400/F2F2F7/000000?text=Screenshot+Preview+Here" alt="Smart Sender Preview" width="600" style="border-radius: 16px; box-shadow: 0 8px 30px rgba(0,0,0,0.1);"/>
<br/>
<br/>

</div>

## ✨ ویژگی‌های کلیدی

- 🎨 **رابط کاربری چشم‌نواز:** طراحی کاملاً مشابه برنامه‌های بومی iOS (افکت شیشه‌ای، انیمیشن‌های روان و طراحی مینیمال).
- 🛡️ **ارسال هوشمند و ضد-بن:** اعمال تاخیرهای زمانی تصادفی (Random Delay) بین ارسال‌ها برای جلوگیری از مسدود شدن اکانت.
- 📱 **پشتیبانی دوگانه:** امکان انتخاب بین پلتفرم‌های **WhatsApp** و **Telegram**.
- 📊 **گزارش لحظه‌ای:** نمایش نوار پیشرفت (Progress Bar) و وضعیت ارسال تک‌تک شماره‌ها (موفق، در حال ارسال، ناموفق).
- 🧳 **کاملاً پرتابل:** بدون نیاز به نصب! فقط کافیست فایل `.exe` را اجرا کنید.
- ⚙️ **بیلد خودکار:** استفاده از GitHub Actions برای ساخت اتوماتیک فایل اجرایی پس از هر آپدیت.

---

## 🛠️ تکنولوژی‌های استفاده شده

- **فرانت‌اند:** React.js, Tailwind CSS, Lucide Icons
- **بکند و دسکتاپ:** Electron.js, Node.js
- **DevOps (اتوماسیون):** GitHub Actions, Electron Builder

---

## 📥 نحوه دانلود و استفاده (برای کاربران)

اگر فقط می‌خواهید از برنامه استفاده کنید و نیازی به کدهای منبع ندارید:
1. به تب **[Releases](https://github.com/mmhdih/Telegram-whatssapp-message-sender/releases)** در همین مخزن بروید.
2. آخرین نسخه فایل `SmartSender-Portable.exe` را دانلود کنید.
3. فایل را در ویندوز اجرا کنید (نیاز به نصب ندارد).

---

## 💻 راهنمای توسعه‌دهندگان (اجرای لوکال)

اگر می‌خواهید کدها را ویرایش کنید و برنامه را روی سیستم خود توسعه دهید:

### پیش‌نیازها
- نصب بودن [Node.js](https://nodejs.org/) روی سیستم.

### نصب و اجرا
ابتدا مخزن را کلون کرده و وابستگی‌ها را نصب کنید:

```bash
# کلون کردن پروژه
git clone [https://github.com/mmhdih/Telegram-whatssapp-message-sender.git](https://github.com/mmhdih/Telegram-whatssapp-message-sender.git)
cd Telegram-whatssapp-message-sender

# نصب پکیج‌ها
npm install

# اجرای برنامه در حالت توسعه (Development Mode)
npm run electron:start