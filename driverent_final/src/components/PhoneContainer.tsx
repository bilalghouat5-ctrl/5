/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Bell, Wifi, Battery, Signal, Expand, ArrowLeft, ArrowRight, Settings, Info } from "lucide-react";
import { motion } from "motion/react";

interface PhoneContainerProps {
  children: React.ReactNode;
  unreadNotifications: number;
  onOpenNotifications: () => void;
}

export default function PhoneContainer({ children, unreadNotifications, onOpenNotifications }: PhoneContainerProps) {
  const [deviceTime, setDeviceTime] = useState<string>("12:00");
  const [usePhoneFrame, setUsePhoneFrame] = useState<boolean>(true);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      let minutes = now.getMinutes();
      const minutesStr = minutes < 10 ? `0${minutes}` : `${minutes}`;
      setDeviceTime(`${hours}:${minutesStr}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col lg:flex-row items-center justify-center font-sans relative antialiased no-scrollbar select-none overflow-x-hidden">
      
      {/* Informative Side Panel on Large Desktop Screens */}
      {usePhoneFrame && (
        <div className="hidden lg:flex flex-col max-w-sm p-6 text-zinc-300 bg-zinc-900 rounded-3xl shadow-2xl border border-zinc-800/80 mr-8 text-right self-center select-none">
          <div className="flex items-center gap-2 mb-3">
            <span className="p-2 bg-purple-950/50 text-purple-400 rounded-xl border border-purple-800/30">
              <Info className="w-5 h-5" />
            </span>
            <h2 className="text-sm font-extrabold text-white">تورو الجزائر • Turo DZ</h2>
          </div>
          <p className="text-xs text-zinc-400 leading-relaxed font-normal">
            تمت ترقية تصميم التطبيق بالكامل ليطابق <span className="font-bold text-purple-400">تطبيق الهاتف الفاخر (Premium Mobile App)</span> بتصميم مظلم مذهل.
          </p>
          <ul className="text-[11px] text-zinc-500 space-y-1.5 mt-3 pr-2 list-disc list-inside">
            <li>رصيد المحفظة يتفاعل بشكل حقيقي مع عمليات الكراء.</li>
            <li>يمكن للمالكين إضافة وإلغاء وتعديل إتاحة أسطولهم.</li>
            <li>وثائق الترخيص تتيح الفتح الفوري للحجوزات.</li>
            <li>عقود موحدة باللغتين العربية والفرنسية صالحة للتحميل.</li>
          </ul>

          <button 
            onClick={() => setUsePhoneFrame(false)}
            className="mt-5 w-full py-2.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-lg shadow-purple-900/35 transition-all cursor-pointer"
          >
            <Expand className="w-4 h-4" />
            عرض ملء الشاشة (الموقع الكامل)
          </button>
        </div>
      )}

      {/* Renders Toggle for Frame */}
      {!usePhoneFrame && (
        <button 
          onClick={() => setUsePhoneFrame(true)}
          className="hidden lg:flex fixed top-4 right-4 z-50 bg-zinc-900/90 text-white hover:bg-zinc-800 border border-zinc-800 rounded-2xl px-4 py-2.5 items-center gap-2 shadow-lg text-xs font-bold cursor-pointer"
        >
          <Expand className="w-4 h-4" />
          العودة لوضع إطار الهاتف الفاخر
        </button>
      )}

      {/* Main container wrapper */}
      <div className={`w-full transition-all duration-300 ${
        usePhoneFrame 
          ? "max-w-[400px] h-[820px] rounded-[50px] border-[12px] border-zinc-900 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] bg-black relative flex flex-col overflow-hidden my-4" 
          : "max-w-none h-screen w-screen bg-black relative flex flex-col overflow-hidden"
      }`}>
        
        {/* Phone Frame Mock Status bar (Only displayed in frame mode or responsive headers) */}
        <div className={`w-full bg-black text-white px-5 pt-3.5 pb-1.5 flex justify-between items-center z-50 select-none relative ${
          usePhoneFrame ? "h-11" : "h-10"
        }`}>
          {/* Clock: iOS Left side layout (even in RTL, the device clock sits here) */}
          <div className="flex items-center">
            <span className="text-[12px] font-extrabold font-sans leading-none tracking-tight text-white/95">{deviceTime}</span>
          </div>

          {/* Notch Spacer */}
          {usePhoneFrame && (
            <div className="w-24 h-4.5 bg-black rounded-full absolute left-1/2 -translate-x-1/2 top-1.5 shadow-inner" />
          )}

          {/* Signal Indicator & Battery Icons */}
          <div className="flex items-center gap-1.5">
            {/* iOS style 4 signal bars */}
            <div className="flex items-end gap-[1.5px] h-2.5 pb-[0.5px]">
              <div className="w-[3px] h-[3px] bg-white rounded-[0.5px]" />
              <div className="w-[3px] h-[5px] bg-white rounded-[0.5px]" />
              <div className="w-[3px] h-[7px] bg-white rounded-[0.5px]" />
              <div className="w-[3px] h-[9px] bg-white rounded-[0.5px]" />
            </div>

            <Wifi className="w-3.5 h-3.5 text-white stroke-[2.2]" />

            {/* Custom high-fidelity Battery Capsule with percentage written inside */}
            <div className="flex items-center gap-0.5">
              <div className="relative w-6 h-3 rounded-[3.5px] bg-zinc-800 flex items-center p-[1px] border border-zinc-700/60">
                {/* 54% charge fill */}
                <div className="h-full w-[54%] bg-white rounded-[2px]" />
                {/* Embedded battery number */}
                <span className="absolute inset-0 flex items-center justify-center text-[7.5px] font-black text-zinc-100 font-sans z-10 leading-none">54</span>
              </div>
              <div className="w-[1.2px] h-1 bg-zinc-650 rounded-r-[1px]" />
            </div>
          </div>
        </div>

        {/* Inner viewport container carrying tabs */}
        <div className="flex-1 w-full bg-black relative overflow-hidden">
          {children}
        </div>

        {/* Bottom swipe bar frame mockup */}
        {usePhoneFrame && (
          <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-1 bg-zinc-850 rounded-full z-50 pointer-events-none" />
        )}
      </div>
    </div>
  );
}
