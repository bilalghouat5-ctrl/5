/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { User, Notification } from "../types";
import { UserCheck, ShieldCheck, CreditCard, ChevronLeft, Wallet, Headphones, LogOut, Check, Sliders, BellRing, Award, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ProfileTabProps {
  user: User;
  onUpdateUser: (updated: User) => void;
  onAddNotification: (notif: Notification) => void;
}

export default function ProfileTab({ user, onUpdateUser, onAddNotification }: ProfileTabProps) {
  const [showTopUpSheet, setShowTopUpSheet] = useState<boolean>(false);
  const [topUpAmount, setTopUpAmount] = useState<number>(5000);
  const [cardNumber, setCardNumber] = useState<string>("");
  const [isTopUpSuccess, setIsTopUpSuccess] = useState<boolean>(false);

  // Verification states
  const [showLicenseVerification, setShowLicenseVerification] = useState<boolean>(false);
  const [inputLicense, setInputLicense] = useState<string>("");
  const [inputCni, setInputCni] = useState<string>("");

  // Support Chat states
  const [showSupportModal, setShowSupportModal] = useState<boolean>(false);
  const [supportMessage, setSupportMessage] = useState<string>("");
  const [chatMessages, setChatMessages] = useState<Array<{ sender: "user" | "bot"; text: string }>>([
    { sender: "bot", text: "مرحباً بلال! أنا دليلك الذكي في تطبيق تورو الجزائر. كيف يمكنني مساعدتك بخصوص كراء السيارات أو إدارة رصيدك اليوم؟" }
  ]);

  const handleWalletTopUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (topUpAmount <= 0) return;

    const updatedUser: User = {
      ...user,
      walletBalance: user.walletBalance + Number(topUpAmount)
    };
    onUpdateUser(updatedUser);

    onAddNotification({
      id: "wallet_add_" + Date.now(),
      title: "تمت شحن المحفظة بنجاح 💸",
      content: `لقد قمت بإيداع مبلغ ${Number(topUpAmount).toLocaleString()} دج بنجاح باستخدام البطاقة الذهبية في رصيدك. سنقوم بإرسال الفاتورة عبر البريد الإلكتروني.`,
      type: "wallet",
      date: "الآن",
      read: false
    });

    setIsTopUpSuccess(true);
    setTimeout(() => {
      setIsTopUpSuccess(false);
      setShowTopUpSheet(false);
      setCardNumber("");
    }, 2000);
  };

  const handleVerifyLicense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputLicense || !inputCni) return;

    onUpdateUser({
      ...user,
      isDriverVerified: true,
      licenseNumber: inputLicense,
      identityCardNumber: inputCni
    });

    onAddNotification({
      id: "license_notif_" + Date.now(),
      title: "تم توثيق رخصتك وبطاقتك بنجاح ✨",
      content: `تم مراجعة رخصة السياقة رقم ${inputLicense} وبطاقة التعريف الوطنية بالجزائر وتوثيق حسابك فورياً كمستأجر آمن.`,
      type: "system",
      date: "الآن",
      read: false
    });

    setShowLicenseVerification(false);
  };

  const handleSendSupportMessage = () => {
    if (!supportMessage.trim()) return;

    const userMsg = supportMessage;
    const newMsgs = [...chatMessages, { sender: "user" as const, text: userMsg }];
    setChatMessages(newMsgs);
    setSupportMessage("");

    // Simple clever bot responses tailored for Algeria
    setTimeout(() => {
      let botReply = "شكراً لتواصلك مع دعم تورو الجزائر. سيقوم وكيل خدمة العملاء بالرد عليك فوراً عبر الهاتف.";
      if (userMsg.includes("شحن") || userMsg.includes("محفظة") || userMsg.includes("الدفع")) {
        botReply = "يمكنك شحن محفظتك مباشرة عبر البطاقة الذهبية لبريد الجزائر أو بطاقة CIB البنكية. العملية آمنة 100% ويتم تحديث الرصيد فورياً.";
      } else if (userMsg.includes("عقد") || userMsg.includes("قانون") || userMsg.includes("توقيع")) {
        botReply = "عقود الإيجار المبرمة على منصة تورو الجزائر موحدة وخاضعة للتشريع التجاري الجزائري لضمان حقوق المؤجر والمستأجر بالتساوي.";
      } else if (userMsg.includes("تأمين") || userMsg.includes("ضمان")) {
        botReply = "جميع السيارات المستأجرة مؤمنة. في حال وقوع حادث، قضاء وقدر، وجب تعبئة محضر ودادي للدرك أو الشرطة في غضون 24 ساعة.";
      }

      setChatMessages(prev => [...prev, { sender: "bot", text: botReply }]);
    }, 1200);
  };

  return (
    <div id="profile-tab-view" className="flex flex-col h-full bg-black text-white overflow-y-auto no-scrollbar pb-24 pr-1 text-right">
      
      {/* Profile Header Block */}
      <div className="bg-zinc-950 px-5 pt-10 pb-16 text-white border-b border-zinc-900 shadow-md relative shrink-0">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img 
              src={user.avatar} 
              alt={user.name} 
              className="w-16 h-16 rounded-2xl border-4 border-zinc-800 object-cover shadow-md bg-zinc-900"
              referrerPolicy="no-referrer"
            />
            {user.isDriverVerified && (
              <span className="absolute -bottom-1 -left-1 bg-emerald-500 text-white p-1 rounded-lg shadow-md border border-zinc-950">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </span>
            )}
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1.5 justify-start">
              <h1 className="text-base font-extrabold">{user.name}</h1>
              {user.isDriverVerified && (
                <span className="text-[9px] bg-emerald-950/70 border border-emerald-900 text-emerald-400 font-extrabold px-2 py-0.5 rounded-full select-none">
                  حساب معتمد
                </span>
              )}
            </div>
            <p className="text-xs text-zinc-400 mt-1 font-semibold">{user.email}</p>
          </div>
        </div>
      </div>

      {/* Floating Card for Wallet */}
      <div className="px-5 -mt-8 shrink-0 relative z-10">
        <div className="bg-zinc-900 rounded-2xl p-4 shadow-lg border border-zinc-800 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-950/70 text-purple-400 rounded-xl border border-purple-900/40">
              <Wallet className="w-6 h-6" />
            </div>
            <div className="text-right">
              <span className="text-[9px] text-zinc-500 block font-semibold">رصيد محفظتي الرقمية</span>
              <span className="text-sm font-extrabold text-white font-mono">{user.walletBalance.toLocaleString()} دج</span>
            </div>
          </div>

          <button
            onClick={() => setShowTopUpSheet(true)}
            className="px-4 py-2.5 bg-purple-650 text-white text-xs font-black rounded-full shadow-md active:scale-95 transition-all cursor-pointer border border-purple-500"
          >
            شحن الرصيد
          </button>
        </div>
      </div>

      {/* Verification Status Banner */}
      <div className="px-5 mt-6 shrink-0">
        {!user.isDriverVerified ? (
          <div className="bg-amber-950/20 border border-amber-900/50 rounded-2xl p-4 flex gap-3 items-start">
            <Sliders className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
            <div className="text-right flex-1">
              <h4 className="text-xs font-extrabold text-amber-400">حسابك بحاجة إلى توثيق رخصتك ⚠️</h4>
              <p className="text-[10px] text-zinc-400 mt-1 leading-relaxed font-semibold">
                لتتمكن من حجز المركبات، تفرض تورو إدخال معلومات رخصة السياقة والبطاقة الوطنية بالجزائر لضمان حماية أصحاب المركبات.
              </p>
              <button
                onClick={() => setShowLicenseVerification(true)}
                className="mt-3 text-[10px] font-black text-white bg-purple-600 border border-purple-500 px-3.5 py-1.5 rounded-full active:scale-95 transition-all cursor-pointer shadow-md"
              >
                وثق مستنداتك في ثوانٍ
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-emerald-950/30 border border-emerald-900/60 rounded-2xl p-3.5 flex gap-3 items-center">
            <Award className="w-5 h-5 text-emerald-400 shrink-0" />
            <div className="text-right">
              <h4 className="text-xs font-semibold text-white">تأجيرك وسياقتك معتمدة بنجاح ✅</h4>
              <p className="text-[9px] text-zinc-500 font-bold mt-0.5">رخصة: {user.licenseNumber} • بطاقة: {user.identityCardNumber}</p>
            </div>
          </div>
        )}
      </div>

      {/* Menu Options */}
      <div className="px-5 mt-6">
        <h3 className="text-xs font-extrabold text-zinc-400 mb-3 tracking-tight">إعدادات الحساب وتفضيلاتي</h3>
        <div className="bg-zinc-900 rounded-2xl border border-zinc-800/80 divide-y divide-zinc-800 overflow-hidden shadow-md">
          {/* Support Center option */}
          <button
            onClick={() => setShowSupportModal(true)}
            className="w-full p-4 flex justify-between items-center hover:bg-zinc-850/60 text-right cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4 text-zinc-600" />
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-zinc-100">دعم العملاء والذكاء الاصطناعي 💬</span>
              <Headphones className="w-4.5 h-4.5 text-purple-400" />
            </div>
          </button>

          {/* Verification documents click edit */}
          <button
            onClick={() => setShowLicenseVerification(true)}
            className="w-full p-4 flex justify-between items-center hover:bg-zinc-850/60 text-right cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4 text-zinc-600" />
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-zinc-100">تعديل وتحديث بطاقة رخصة السياقة</span>
              <UserCheck className="w-4.5 h-4.5 text-purple-400" />
            </div>
          </button>

          <div className="p-4 flex justify-between items-center select-none">
            <div className="w-8 h-4.5 bg-purple-650 rounded-full relative cursor-pointer shadow-inner">
              <div className="w-3.5 h-3.5 bg-white rounded-full absolute top-0.5 left-0.5 shadow" />
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-zinc-100">إشعارات الهاتف وتنبيه الحجوزات ⚡</span>
              <BellRing className="w-4.5 h-4.5 text-rose-500" />
            </div>
          </div>

          <button
            onClick={() => {
              if (window.confirm("هل ترغب حقاً في تسجيل الخروج؟")) {
                alert("تم تسجيل الخروج كمحاكاة فقط؛ ستبقى جلسة بلال نشطة.");
              }
            }}
            className="w-full p-4 flex justify-between items-center hover:bg-rose-950/20 text-right text-rose-400 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4 text-rose-850" />
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold">تسجيل الخروج من الحساب</span>
              <LogOut className="w-4.5 h-4.5" />
            </div>
          </button>
        </div>

        {/* Footnote footer */}
        <p className="text-[10px] text-zinc-600 text-center mt-6 font-semibold select-none">
          تورو كراء السيارات بالجزائر v1.4.0 • أسرع خدمة كود موحد 🇩🇿
        </p>
      </div>

      {/* Dahibya Wallet Refill Sheet */}
      <AnimatePresence>
        {showTopUpSheet && (
          <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/85 backdrop-blur-xs text-white text-right">
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              className="bg-zinc-950 w-full max-w-md rounded-t-3xl shadow-2xl p-5 relative border-t border-zinc-850"
            >
              <button
                onClick={() => setShowTopUpSheet(false)}
                className="absolute top-4 left-4 p-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-500 hover:text-white"
                title="إغلاق التقرير"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-xs font-extrabold text-white mb-4 mt-1 flex items-center gap-1.5 justify-end">
                 شحن الرصيد بالبطاقة الذهبية للمركبات <CreditCard className="w-4.5 h-4.5 text-purple-400" />
              </h3>

              {isTopUpSuccess ? (
                <div className="py-6 text-center flex flex-col items-center">
                  <div className="w-12 h-12 bg-emerald-950/60 border border-emerald-900 text-emerald-400 rounded-full flex items-center justify-center mb-2 shadow-lg animate-bounce">
                    <Check className="w-6 h-6 stroke-[3]" />
                  </div>
                  <h4 className="text-xs font-bold text-emerald-400">تم شحن رصيد محفظتك بالدينار!</h4>
                  <p className="text-[10px] text-zinc-500 mt-1 font-semibold">يمكنك الآن حجز سيارة فارهة أو سداد الكفالات فورا.</p>
                </div>
              ) : (
                <form onSubmit={handleWalletTopUp} className="space-y-4">
                  <div className="grid grid-cols-3 gap-2 font-mono">
                    {[5000, 15000, 30000].map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => setTopUpAmount(amt)}
                        className={`py-2 text-[10px] font-black rounded-full border transition-all ${
                          topUpAmount === amt 
                            ? 'bg-purple-650 border-purple-550 text-white shadow-md' 
                            : 'border-zinc-800 bg-zinc-900 text-zinc-400 hover:bg-zinc-850'
                        }`}
                      >
                        {amt.toLocaleString()} دج
                      </button>
                    ))}
                  </div>

                  <div>
                    <label htmlFor="topup-amount-input" className="text-[9px] font-bold text-zinc-500 block mb-1">المبلغ المخصص للشحن (دج)*</label>
                    <input 
                      id="topup-amount-input"
                      type="number"
                      min="1000"
                      max="150000"
                      value={topUpAmount}
                      onChange={(e) => setTopUpAmount(Number(e.target.value))}
                      className="w-full text-xs font-extrabold bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-purple-400 focus:border-purple-550 outline-none text-right font-mono"
                    />
                  </div>

                  <div>
                    <label htmlFor="card-number-input" className="text-[9px] font-bold text-zinc-500 block mb-1">رقم بطاقة كارت الذهبية بريد الجزائر (16 رقم)*</label>
                    <input 
                      id="card-number-input"
                      type="text"
                      required
                      placeholder="6283 07XX XXXX XXXX"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full text-xs font-mono bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-zinc-200 outline-none text-left"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-purple-650 hover:bg-purple-750 text-white border border-purple-550 rounded-full text-xs font-black shadow-lg"
                  >
                    تأكيد تعبئة {Number(topUpAmount).toLocaleString()} دج
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Driver License & Identity card Modal */}
      <AnimatePresence>
        {showLicenseVerification && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-5 text-white text-right">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-zinc-950 rounded-3xl p-5 w-full max-w-sm border border-zinc-800"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xs font-extrabold text-white">توثيق رخصة السياقة والهوية بالجزائر</h3>
                <button
                  onClick={() => setShowLicenseVerification(false)}
                  className="p-1 rounded-full bg-zinc-900 border border-zinc-850 text-zinc-500 hover:text-white"
                  title="إغلاق التقرير"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleVerifyLicense} className="space-y-4 font-semibold">
                <div>
                  <label htmlFor="license-number-input" className="text-[9px] font-bold text-zinc-500 block mb-1">رقم رخصة السياقة الوطنية</label>
                  <input 
                    id="license-number-input"
                    type="text"
                    required
                    placeholder="مثال: DZ-2019-102938"
                    value={inputLicense}
                    onChange={(e) => setInputLicense(e.target.value)}
                    className="w-full text-xs font-mono bg-zinc-900 border border-zinc-800 rounded-xl p-3 outline-none focus:border-purple-500 text-left"
                  />
                </div>

                <div>
                  <label htmlFor="identity-number-input" className="text-[9px] font-bold text-zinc-500 block mb-1">رقم التعريف الوطني البيومتري (NIN)</label>
                  <input 
                    id="identity-number-input"
                    type="text"
                    required
                    placeholder="مثال: NIN-1029384759"
                    value={inputCni}
                    onChange={(e) => setInputCni(e.target.value)}
                    className="w-full text-xs font-mono bg-zinc-900 border border-zinc-800 rounded-xl p-3 outline-none focus:border-purple-500 text-left"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-purple-650 hover:bg-purple-750 text-white rounded-full text-xs font-black shadow-lg border border-purple-550"
                >
                  تأكيد التوثيق والاعتماد
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Help Chat bot modal */}
      <AnimatePresence>
        {showSupportModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 text-white text-right">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-zinc-950 rounded-3xl w-full max-w-sm h-[75vh] flex flex-col overflow-hidden border border-zinc-800"
            >
              {/* Chat header */}
              <div className="bg-zinc-900 border-b border-zinc-800 p-4 text-white flex justify-between items-center shrink-0">
                <button
                  onClick={() => setShowSupportModal(false)}
                  className="p-1 rounded-full bg-zinc-950 border border-zinc-800 text-zinc-500 hover:text-white"
                  title="إغلاق التقرير"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-2">
                  <div>
                    <h3 className="text-xs font-extrabold text-white">مساعد تورو الذكي بالجزائر 🤖</h3>
                    <p className="text-[9px] text-zinc-500 font-semibold">إجابات حية فورية وموثوقة</p>
                  </div>
                </div>
              </div>

              {/* Chat message threads */}
              <div className="flex-1 p-4 overflow-y-auto no-scrollbar space-y-3.5 bg-zinc-950">
                {chatMessages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`p-3 max-w-[80%] rounded-2xl text-[11px] font-semibold leading-relaxed shadow ${
                      msg.sender === 'user' 
                        ? 'bg-purple-650 border border-purple-550 text-white rounded-tl-none' 
                        : 'bg-zinc-900 border border-zinc-800 text-zinc-200 rounded-tr-none'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Input block */}
              <div className="p-3 bg-zinc-900 border-t border-zinc-800 flex gap-2 shrink-0">
                <input 
                  id="support-message-input"
                  type="text"
                  placeholder="اكتب رسالتك للمساعد الذكي..."
                  value={supportMessage}
                  onChange={(e) => setSupportMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSendSupportMessage();
                  }}
                  className="flex-1 text-xs bg-zinc-950 border border-zinc-800 rounded-full px-4 py-2.5 outline-none focus:border-purple-550"
                />
                <button
                  onClick={handleSendSupportMessage}
                  className="px-4 py-2.5 bg-purple-600 border border-purple-500 text-white text-xs font-bold rounded-full hover:bg-purple-750 active:scale-95 transition-all cursor-pointer"
                >
                  إرسال
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
