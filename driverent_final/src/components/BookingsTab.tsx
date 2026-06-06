/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Reservation, User, Notification, Review } from "../types";
import { Calendar, UserCheck, ShieldCheck, CreditCard, ChevronRight, CheckCircle2, Ticket, Ban, Download, FileText, X, AlertCircle, Star } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface BookingsTabProps {
  bookings: Reservation[];
  user: User;
  onUpdateUser: (updated: User) => void;
  onUpdateBookingStatus: (id: string, status: "pending" | "confirmed" | "cancelled" | "active" | "completed") => void;
  onAddNotification: (notif: Notification) => void;
  onAddReview: (review: Review) => void;
  onChangeTab?: (tab: string) => void;
}

export default function BookingsTab({ bookings, user, onUpdateUser, onUpdateBookingStatus, onAddNotification, onAddReview, onChangeTab }: BookingsTabProps) {
  const [activeSegment, setActiveSegment] = useState<"current" | "past">("current");
  const [selectedBookingForContract, setSelectedBookingForContract] = useState<Reservation | null>(null);
  
  // Review Flow State
  const [reviewBooking, setReviewBooking] = useState<Reservation | null>(null);
  const [reviewStars, setReviewStars] = useState<number>(5);
  const [reviewComment, setReviewComment] = useState<string>("");

  const currentBookings = bookings.filter(b => b.status === "confirmed" || b.status === "active" || b.status === "pending");
  const pastBookings = bookings.filter(b => b.status === "completed" || b.status === "cancelled");
  const selectedList = activeSegment === "current" ? currentBookings : pastBookings;

  const handleCancelBooking = (booking: Reservation) => {
    if (window.confirm("هل أنت متأكد من إلغاء هذا الحجز؟ سيتم استرجاع المبلغ بالكامل إلى محفظتك.")) {
      // Refund money
      const newBalance = user.walletBalance + booking.totalPrice;
      onUpdateUser({
        ...user,
        walletBalance: newBalance
      });

      onUpdateBookingStatus(booking.id, "cancelled");

      // Send notification
      onAddNotification({
        id: "cancel_" + Date.now(),
        title: "تم إلغاء الحجز واسترداد المبلغ 💰",
        content: `لقد قمت بإلغاء حجز السيارة ${booking.carName}. تم إرجاع ${booking.totalPrice.toLocaleString()} دج بنجاح إلى رصيد محفظتك.`,
        type: "wallet",
        date: "الآن",
        read: false
      });
    }
  };

  const submitReview = () => {
    if (!reviewBooking) return;
    
    onAddReview({
      id: "rev_" + Date.now(),
      userName: user.name,
      userAvatar: user.avatar,
      rating: reviewStars,
      comment: reviewComment || "تجربة ممتازة وسيارة رائعة، أنصح بها بشدة في الجزائر!",
      date: new Date().toISOString().split('T')[0],
      carId: reviewBooking.carId
    });

    onUpdateBookingStatus(reviewBooking.id, "completed"); // Set rated / completed
    const found = bookings.find(b => b.id === reviewBooking.id);
    if (found) found.ratingGiven = reviewStars;
    
    // Notify
    onAddNotification({
      id: "rev_not_" + Date.now(),
      title: "شكراً على تقييمك النبيل ⭐️",
      content: "تم نشر مراجعتك بنجاح. تعليقاتك تساعد في تحسين مجتمع تورو الجزائر.",
      type: "system",
      date: "الآن",
      read: false
    });

    setReviewBooking(null);
    setReviewComment("");
    setReviewStars(5);
  };

  return (
    <div id="bookings-tab-view" className="flex flex-col h-full bg-black text-white overflow-y-auto no-scrollbar pb-24 text-right" dir="rtl">
      
      {/* Centered screen title matching the screenshot exactly */}
      <div className="w-full bg-[#111113] h-[64px] border-b border-zinc-900/80 relative flex items-center justify-center px-4 shrink-0">
        <h1 className="text-[15.5px] font-black text-white tracking-wide font-sans text-center">
          الرحلات
        </h1>
      </div>

      {/* Tab Segments (only visible if the user has booked anything before, to allow them to view it, otherwise keeps the screen clean and empty like the screenshot) */}
      {bookings.length > 0 && (
        <div className="bg-[#111113] border-b border-zinc-900/60 flex shrink-0 h-10">
          <button
            onClick={() => setActiveSegment("current")}
            className="flex-1 text-center relative focus:outline-none transition-colors h-full flex items-center justify-center cursor-pointer"
          >
            <span className={`text-[10.5px] font-black tracking-widest font-sans ${
              activeSegment === "current" ? "text-white" : "text-zinc-500"
            }`}>
              النشطة ({currentBookings.length})
            </span>
            {activeSegment === "current" && (
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#5c61ec] rounded-t-full" />
            )}
          </button>
          
          <button
            onClick={() => setActiveSegment("past")}
            className="flex-1 text-center relative focus:outline-none transition-colors h-full flex items-center justify-center cursor-pointer"
          >
            <span className={`text-[10.5px] font-black tracking-widest font-sans ${
              activeSegment === "past" ? "text-white" : "text-zinc-500"
            }`}>
              المنتهية/الملغاة ({pastBookings.length})
            </span>
            {activeSegment === "past" && (
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#5c61ec] rounded-t-full" />
            )}
          </button>
        </div>
      )}

      {/* Bookings List Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar w-full relative bg-black">
        {selectedList.length === 0 ? (
          /* High-Fidelity Retro Desert Car Illustration matching Screenshot 4 precisely */
          <div className="flex flex-col items-center justify-center h-full min-h-[460px] px-6 text-center select-none py-10">
            {/* Outer relative block carrying desert artwork */}
            <div className="relative w-80 h-52 flex items-center justify-center mb-6">
              {/* Dark radial backdrop oval */}
              <div className="absolute w-[280px] h-[140px] bg-[#141416]/90 rounded-[50%] blur-xl opacity-80 transform -rotate-3" />

              {/* Hand-crafted inline SVG reflecting Screenshot 4:
                  Vintage lavender car, hot pink/magenta saguaro cactus on the left, dry brushes, and dark horizontal roads */}
              <svg className="w-full max-w-[325px] h-[190px] mx-auto overflow-visible select-none" viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Custom Sparkle/Stars in the 80s Desert Night sky */}
                <path d="M100 25 L102 29 L106 30 L102 31 L100 35 L98 31 L94 30 L98 29 Z" fill="#ec4899" opacity="0.6" />
                <path d="M250 15 L251 17 L253 18 L251 19 L250 21 L249 19 L247 18 L249 17 Z" fill="#c084fc" opacity="0.5" />
                <path d="M40 50 L41 52 L43 53 L41 54 L40 56 L39 54 L37 53 L39 52 Z" fill="#c084fc" opacity="0.4" />
                
                {/* The Desert Highway Road under the car */}
                <line x1="10" y1="115" x2="310" y2="115" stroke="#312e81" strokeWidth="1.5" opacity="0.6" />
                <line x1="30" y1="125" x2="290" y2="125" stroke="#4f46e5" strokeWidth="2" strokeDasharray="30 15" opacity="0.5" />
                <line x1="0" y1="135" x2="320" y2="135" stroke="#101012" strokeWidth="2.5" />
                <line x1="20" y1="145" x2="300" y2="145" stroke="#311042" strokeWidth="1.5" strokeDasharray="60 25" />

                {/* Left side Saguaro Cactus in Hot Magenta */}
                <g transform="translate(68, 20)">
                  {/* Main trunk */}
                  <rect x="8" y="10" width="12" height="95" rx="6" fill="#d946ef" />
                  {/* Left arm bent upwards */}
                  <path d="M8,45 H0 A4,4 0 0,0 -4,49 V25 A4,4 0 0,1 0,21 H4 A4,4 0 0,1 8,25" fill="#d946ef" />
                  <path d="M2,45 H0 A2,2 0 0,0 -2,47 V23 A2,2 0 0,1 0,21 H4 A2,2 0 0,1 6,23" fill="#8108c4" opacity="0.2" />
                  {/* Right arm bent upwards */}
                  <path d="M20,60 H28 A4,4 0 0,1 32,64 V40 A4,4 0 0,0 28,36 H24 A4,4 0 0,0 20,40" fill="#d946ef" />
                  {/* Vertical stripe details on cactus */}
                  <line x1="14" y1="18" x2="14" y2="100" stroke="#8108c4" strokeWidth="1" opacity="0.4" strokeDasharray="10 4" />
                  <line x1="11" y1="22" x2="11" y2="98" stroke="#8108c4" strokeWidth="1" opacity="0.4" strokeDasharray="8 6" />
                  <line x1="17" y1="22" x2="17" y2="98" stroke="#8108c4" strokeWidth="1" opacity="0.4" strokeDasharray="6 8" />
                </g>
                
                {/* Retro convertible sports car parked on road */}
                <g transform="translate(45, 30)">
                  {/* Steering Wheel */}
                  <circle cx="120" cy="50" r="8" stroke="#ffffff" strokeWidth="1.5" fill="none" opacity="0.8" />
                  <line x1="120" y1="50" x2="118" y2="58" stroke="#ffffff" strokeWidth="1.5" />

                  {/* Windshield */}
                  <path d="M110,55 L135,32 L140,32 L132,55 Z" fill="#ffffff" opacity="0.7" />
                  <path d="M135,32 L137,32 L130,55 L128,55 Z" fill="#1e1540" />

                  {/* White reflection shine line */}
                  <path d="M50,56 L75,56 T95,56" stroke="#ffffff" strokeWidth="1.5" opacity="0.5" strokeLinecap="round" />

                  {/* Car body - Upper section */}
                  <path d="M10,55 L108,55 L132,55 L212,55 C220,55 225,59 223,66 L218,85 L5,85 L2,68 C1,60 5,55 10,55 Z" fill="#6366f1" />

                  {/* Shading/details on upper body */}
                  <path d="M10,55 L108,55 L132,55 L160,55 L155,62 L10,62 Z" fill="#818cf8" opacity="0.4" />
                  
                  {/* Door lines and handle */}
                  <path d="M108,55 L105,82" stroke="#1e1b4b" strokeWidth="2" />
                  <path d="M165,55 L162,82" stroke="#1e1b4b" strokeWidth="2" />
                  <rect x="145" y="59" width="10" height="2" rx="1" fill="#ffffff" />

                  {/* Chrome Side Moulding line */}
                  <line x1="5" y1="72" x2="215" y2="72" stroke="#ffffff" strokeWidth="1.5" opacity="0.9" />

                  {/* Car body - Lower fenders cover */}
                  <path d="M5,80 L218,80 C223,80 225,83 224,88 L220,100 C218,103 213,105 205,105 L15,105 C8,105 4,103 2,98 L1,88 C0,83 2,80 5,80 Z" fill="#4f46e5" />
                  
                  {/* Wheels wells cuts */}
                  <circle cx="50" cy="102" r="21" fill="#000000" />
                  <circle cx="180" cy="102" r="21" fill="#000000" />

                  {/* Wheel 1 (Front) & Wheel 2 (Rear) */}
                  <circle cx="50" cy="102" r="18" fill="#111116" stroke="#ffffff" strokeWidth="1" />
                  <circle cx="180" cy="102" r="18" fill="#111116" stroke="#ffffff" strokeWidth="1" />
                  {/* White tire walls */}
                  <circle cx="50" cy="102" r="11" fill="#ffffff" />
                  <circle cx="180" cy="102" r="11" fill="#ffffff" />
                  {/* Metal hubs with Pink and Silver centers */}
                  <circle cx="50" cy="102" r="8" fill="#db2777" />
                  <circle cx="180" cy="102" r="8" fill="#db2777" />
                  <circle cx="50" cy="102" r="4" fill="#ffffff" />
                  <circle cx="180" cy="102" r="4" fill="#ffffff" />
                  <circle cx="50" cy="102" r="1.5" fill="#111116" />
                  <circle cx="180" cy="102" r="1.5" fill="#111116" />

                  {/* Headlights and taillight colors */}
                  <path d="M220,62 L223,62 L224,67 L221,68 Z" fill="#f59e0b" />
                  <path d="M2,62 L5,62 L4,68 L1,67 Z" fill="#ef4444" />
                </g>

                {/* Left Side Shrub tumbleweed underneath */}
                <g transform="translate(160, 110)" stroke="#71717a" strokeWidth="1" strokeLinecap="round">
                  <path d="M10,15 C5,5 2,12 0,15 C-2,18 2,22 5,20 C8,18 10,25 15,18 C20,11 12,5 10,15 Z" />
                  <path d="M5,10 C1,-2 -5,8 2,15" />
                  <path d="M12,12 C18,2 25,12 15,22" />
                  <path d="M15,16 C12,14 11,8 8,11" stroke="#3f3f46" />
                </g>

                {/* Dynamic Purple Desert Bush on Far Right */}
                <g transform="translate(245, 112)">
                  <path d="M5,12 C10,4 20,-2 25,5 C30,12 28,20 22,22 C16,24 10,25 5,20 C0,15 0,12 5,12 Z" fill="#6366f1" opacity="0.3" />
                  <path d="M10,15 C14,8 22,4 24,10 C26,16 22,22 18,21" stroke="#4f46e5" strokeWidth="1.5" />
                  <path d="M5,18 C8,12 12,10 14,15 C16,20 12,22 9,21" stroke="#a78bfa" strokeWidth="1.2" />
                </g>
              </svg>
            </div>

            {/* Centered screen typography reflecting the screenshot 4 precisely */}
            <h2 className="text-[25.5px] font-extrabold text-white tracking-tight font-sans">
              لا توجد رحلات قادمة بعد
            </h2>

            <p className="text-zinc-400 text-[10.5px] font-bold mt-1.5 max-w-[250px] leading-relaxed mx-auto">
              أكتشف آلاف السيارات المتاحة على تورو وأحجز رحلتك القادمة.
            </p>

            <button
              onClick={() => onChangeTab?.("explore")}
              className="mt-6 px-4.5 py-4 w-56 bg-[#5c61ec] hover:bg-[#4b50cf] text-white text-[11px] font-extrabold rounded-xl transition-all shadow-lg active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer font-sans"
              type="button"
            >
              ابدأ البحث
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {selectedList.map((booking) => (
              <div 
                key={booking.id}
                className="bg-zinc-900 rounded-2xl p-4 shadow-md border border-zinc-800/80 relative overflow-hidden"
              >
                {/* Status sticker */}
                <div className="absolute top-4 left-4">
                  {booking.status === "confirmed" && (
                    <span className="bg-emerald-950/70 text-emerald-400 border border-emerald-900 text-[9px] font-black px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
                      <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" /> مؤكد ودفع
                    </span>
                  )}
                  {booking.status === "cancelled" && (
                    <span className="bg-rose-950/70 border border-rose-900 text-rose-400 text-[10px] font-extrabold px-2.5 py-1 rounded-full">
                      تم الإلغاء والإرجاع
                    </span>
                  )}
                  {booking.status === "completed" && (
                    <span className="bg-zinc-800 border border-zinc-700 text-zinc-400 text-[10px] font-extrabold px-2.5 py-1 rounded-full">
                      مكتملة ومستلمة
                    </span>
                  )}
                </div>

                <div className="flex gap-3.5 items-center mb-4 text-right">
                  <img 
                    src={booking.carImage} 
                    alt="" 
                    className="w-20 h-14 object-cover rounded-xl shrink-0 bg-zinc-950"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h3 className="text-xs font-extrabold text-white uppercase">{booking.carName}</h3>
                    <p className="text-[10px] text-zinc-500 mt-1 font-semibold">تذكرة الحجز: <span className="font-mono font-extrabold text-zinc-300">{booking.bookingCode}</span></p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 bg-zinc-950 rounded-xl p-3 text-right border border-zinc-850">
                  <div>
                    <span className="text-[8px] text-zinc-500 block">تاريخ الاستلام بالجزائر</span>
                    <span className="text-[10px] font-extrabold text-zinc-300 block mt-0.5">{booking.startDate}</span>
                  </div>
                  <div>
                    <span className="text-[8px] text-zinc-500 block">تاريخ الإرجاع والمدة</span>
                    <span className="text-[10px] font-extrabold text-zinc-300 block mt-0.5">{booking.endDate} ({booking.totalDays} أيام)</span>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-3.5 pt-3 border-t border-zinc-800/60">
                  <div className="text-right">
                    <span className="text-[8px] text-zinc-500 block">المبلغ الإجمالي</span>
                    <span className="text-xs font-black text-purple-400 font-mono">{booking.totalPrice.toLocaleString()} دج</span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-1.5">
                    {booking.status === "confirmed" && (
                      <>
                        <button
                          onClick={() => setSelectedBookingForContract(booking)}
                          className="px-3 py-1.5 bg-zinc-850 border border-zinc-750 text-zinc-300 text-[10px] font-bold rounded-lg flex items-center gap-1 active:scale-95 transition-all cursor-pointer"
                        >
                          <FileText className="w-3.5 h-3.5 text-purple-400" />
                          عقد الإيجار
                        </button>
                        <button
                          onClick={() => handleCancelBooking(booking)}
                          className="px-3 py-1.5 bg-rose-950/50 hover:bg-rose-950 border border-rose-900/60 text-rose-400 text-[10px] font-bold rounded-lg flex items-center gap-1 active:scale-95 transition-all cursor-pointer"
                          title="إلغاء حجز"
                        >
                          <Ban className="w-3.5 h-3.5" />
                          إلغاء
                        </button>
                      </>
                    )}

                    {booking.status === "completed" && !booking.ratingGiven && (
                      <button
                        onClick={() => setReviewBooking(booking)}
                        className="px-3.5 py-1.5 bg-amber-500 text-white text-[10px] font-bold rounded-full flex items-center gap-1 shadow-md cursor-pointer"
                      >
                        قيّم سيارتك ⭐
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Renders Bilingual Algerian Lease Agreement terms */}
      <AnimatePresence>
        {selectedBookingForContract && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 text-white text-right">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-zinc-950 rounded-3xl p-5 w-full max-w-sm max-h-[85vh] flex flex-col border border-zinc-800"
            >
              <div className="flex justify-between items-center pb-3 border-b border-zinc-900 shrink-0">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="text-emerald-400 w-5 h-5 stroke-[2.5]" />
                  <span className="text-xs font-extrabold text-white">عقد الكراء الموحد للتطبيق</span>
                </div>
                <button
                  onClick={() => setSelectedBookingForContract(null)}
                  className="p-1 rounded-full bg-zinc-900 border border-zinc-850 text-zinc-500 hover:text-white"
                  title="إغلاق التقرير"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Terms Content */}
              <div className="py-4 overflow-y-auto no-scrollbar space-y-4 text-zinc-300 flex-1">
                {/* Official Stamp style of Turo DZ */}
                <div className="text-center bg-zinc-900 p-3 rounded-2xl border border-zinc-800">
                  <span className="text-[10px] bg-purple-950 border border-purple-800 text-purple-400 font-extrabold px-2.5 py-0.5 rounded-full block w-max mx-auto mb-2">
                    كود التحقق: {selectedBookingForContract.bookingCode}
                  </span>
                  <p className="text-xs font-black text-white">{selectedBookingForContract.carName}</p>
                  <p className="text-[10px] text-zinc-500 font-semibold mt-1">تاريخ الصلاحية: {selectedBookingForContract.startDate} إلى {selectedBookingForContract.endDate}</p>
                </div>

                {/* Terms in Arabic and French */}
                <div className="space-y-3 font-semibold text-[10px] leading-relaxed">
                  <div>
                    <h4 className="text-white text-[11px] font-extrabold block mb-1">الطرف الأول: شركة تورو كراء السيارات بالجزائر</h4>
                    <p className="text-zinc-500 leading-normal">
                      بصفته الوسيط التراخيص المعتمد والشركة المقدمة تكنولوجياً عبر شبكات ريادة الأعمال الجزائرية.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-white text-[11px] font-extrabold block mb-1">الطرف الثاني: المستأجر ({user.name})</h4>
                    <p className="text-zinc-500 leading-normal">
                      حامل رخصة سياقة الكترونية مبرمة رقم: <span className="font-mono text-zinc-350">{user.licenseNumber || "1214-41124-05"}</span>.
                    </p>
                  </div>

                  <hr className="border-zinc-900" />

                  <div className="space-y-2 text-zinc-400">
                    <p className="font-extrabold text-white select-none">البنود والشروط الأساسية / Conditions du contrat:</p>
                    <p>1. يلتزم المستعلم بإرجاع السيارة بكافة تجهيزاتها ووقودها المتفق عليه عند التسليم للوكيل.</p>
                    <p>2. لا يجوز قيادة السيارة الفارهة من طرف شخص غير مدون في الوثيقة أو تذكرة شركة تورو.</p>
                    <p>3. التأمين إلزامي ويغطي كافة ترسبات الحوادث الموثقة بمحاضر مصلحة الدرك الوطني الجزائري.</p>
                    <p className="italic text-zinc-500 text-[9px] mt-2">
                      Ce contrat réglementaire numérique est conforme aux lois nationales de la République Algérienne Populaire.
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Stamp action */}
              <div className="pt-4 border-t border-zinc-900 flex gap-2 shrink-0">
                <button
                  onClick={() => alert("تم حفظ نسخة عقد الكراء الموحد PDF بالهاتف بنجاح 📁")}
                  className="flex-1 py-2.5 bg-purple-650 hover:bg-purple-700 text-white border border-purple-500 text-xs font-bold rounded-full flex items-center justify-center gap-1.5 shadow"
                >
                  <Download className="w-4 h-4" />
                  حفظ نسخة العقد PDF
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Booking Review Modal Sheet */}
      <AnimatePresence>
        {reviewBooking && (
          <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/85 backdrop-blur-xs p-4 text-white text-right">
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              className="bg-zinc-950 w-full max-w-sm rounded-t-3xl p-5 border-t border-zinc-800 space-y-4 shadow-2xl relative"
            >
              <button
                onClick={() => setReviewBooking(null)}
                className="absolute top-4 left-4 text-zinc-500 hover:text-white"
                title="إغلاق"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-sm font-extrabold text-zinc-200">شاركنا تقييمك للسيارة ⭐</h3>
              <p className="text-[10px] text-zinc-500 font-semibold mb-2">كيف كانت تجربتك مع سيارة {reviewBooking.carName}؟</p>

              {/* Stars selection */}
              <div className="flex gap-2.5 justify-center py-2.5">
                {[1, 2, 3, 4, 5].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setReviewStars(num)}
                    className="p-1 cursor-pointer transition-transform active:scale-125"
                  >
                    <Star className={`w-8 h-8 ${num <= reviewStars ? "text-amber-400 fill-amber-400" : "text-zinc-700"}`} />
                  </button>
                ))}
              </div>

              {/* Comment inputs */}
              <div>
                <label htmlFor="review-comment-textarea" className="text-[9px] font-bold text-zinc-500 block mb-1">اكتب تعليقك بصراحة*</label>
                <textarea
                  id="review-comment-textarea"
                  rows={3}
                  required
                  placeholder="مثال: السيارة ممتازة، نظيفة جداً، والمعاملة راقية وسريعة..."
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  className="w-full text-xs font-semibold bg-zinc-900 border border-zinc-800 rounded-xl p-2.5 text-zinc-200 outline-none focus:border-purple-550"
                />
              </div>

              <button
                onClick={submitReview}
                className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-full text-xs font-black shadow-lg cursor-pointer border border-purple-500 text-center"
              >
                إرسال التقييم للمجتمع
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
