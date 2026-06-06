/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Agency, Car } from "../types";
import { Search, MapPin, Phone, Star, ShieldCheck, Car as CarIcon, X, Check, Eye } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface AgenciesTabProps {
  agencies: Agency[];
  cars: Car[];
  onSelectCar: (car: Car) => void;
}

export default function AgenciesTab({ agencies, cars, onSelectCar }: AgenciesTabProps) {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedAgency, setSelectedAgency] = useState<Agency | null>(null);
  const [callingAgency, setCallingAgency] = useState<Agency | null>(null);

  const filteredAgencies = agencies.filter(agency => {
    return agency.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
           agency.city.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const getAgencyCars = (agencyId: string) => {
    return cars.filter(car => car.agencyId === agencyId);
  };

  return (
    <div id="agencies-tab-view" className="flex flex-col h-full bg-black text-white overflow-y-auto no-scrollbar pb-24 pr-1">
      {/* Agency Header Banner */}
      <div className="bg-zinc-950 px-5 pt-8 pb-8 text-right border-b border-zinc-900 shadow-md shrink-0">
        <h1 className="text-base font-extrabold text-white">وكالات كراء السيارات المعتمدة 🏢</h1>
        <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed font-semibold">
          تصفح وتواصل مباشرة مع أفضل الوكالات في ولايات الجزائر لتأمين سيارتك براحة بال تامة وعقود رسمية الكترونية.
        </p>

        {/* Agency Search bar */}
        <div className="mt-4 bg-zinc-900 rounded-full p-2.5 shadow-md flex items-center gap-2 border border-zinc-800">
          <Search className="w-5 h-5 text-zinc-500 shrink-0 mr-1" />
          <input 
            id="agency-search-input"
            type="text"
            placeholder="ابحث باسم الوكالة أو الولاية..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs font-semibold bg-transparent text-white border-none outline-none placeholder-zinc-500 focus:ring-0 cursor-pointer"
          />
        </div>
      </div>

      {/* Grid of Agencies */}
      <div className="px-4 mt-5">
        <h2 className="text-xs font-extrabold text-zinc-400 mb-3.5 tracking-tight">شركاء الخدمة المعتمدين بالجزائر ({filteredAgencies.length})</h2>
        
        {filteredAgencies.length === 0 ? (
          <div className="bg-zinc-900 rounded-2xl p-6 text-center border border-zinc-800 py-10">
            <p className="text-xs font-bold text-zinc-400">لا توجــد وكالات حالياً مطابقة لمعيار البحث.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {filteredAgencies.map((agency) => {
              const agencyCars = getAgencyCars(agency.id);
              return (
                <div 
                  key={agency.id}
                  className="bg-zinc-900 rounded-2xl shadow-md border border-zinc-800/70 overflow-hidden relative"
                >
                  {/* Banner background with logo */}
                  <div className="relative h-20 w-full overflow-hidden bg-zinc-955">
                    <img 
                      src={agency.banner} 
                      alt="" 
                      className="w-full h-full object-cover brightness-[0.5]"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-2 left-2 flex gap-1">
                      {agency.verified && (
                        <span className="bg-emerald-950/70 border border-emerald-900 backdrop-blur-md text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5">
                          <ShieldCheck className="w-3 h-3 stroke-[2.5]" /> معتمدة
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-4 pt-10 relative">
                    {/* Floating circular Logo */}
                    <div className="w-14 h-14 rounded-xl border-4 border-zinc-900 bg-zinc-900 absolute -top-8 right-4 shadow-lg overflow-hidden">
                      <img 
                        src={agency.logo} 
                        alt={agency.name} 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    <div className="flex justify-between items-start mb-2 text-right">
                      <div>
                        <h3 className="text-xs font-extrabold text-white">{agency.name}</h3>
                        <p className="text-[10px] text-zinc-400 font-semibold mt-1 flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                          <span>{agency.city} • {agency.address}</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-3 pt-3 border-t border-zinc-800/60">
                      <div className="flex gap-3 text-xs">
                        <div className="flex items-center gap-0.5 text-amber-400 font-bold">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                          <span>{agency.rating}</span>
                        </div>
                        <span className="text-zinc-500 text-[10px] font-semibold">({agency.reviewsCount} تقييم)</span>
                      </div>

                      <div className="flex items-center gap-1 text-[10px] text-zinc-300 font-bold">
                        <CarIcon className="w-4 h-4 text-purple-400" />
                        <span>{agencyCars.length} سيارات ممتازة</span>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="grid grid-cols-2 gap-2 mt-4 text-center">
                      <button
                        onClick={() => setSelectedAgency(agency)}
                        className="py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold rounded-full flex items-center justify-center gap-1 cursor-pointer border border-zinc-700 transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                        عرض الأسطول
                      </button>

                      <button
                        onClick={() => setCallingAgency(agency)}
                        className="py-2 bg-purple-600 text-white text-xs font-bold rounded-full flex items-center justify-center gap-1 shadow-md hover:bg-purple-700 active:scale-95 transition-all cursor-pointer border border-purple-500"
                      >
                        <Phone className="w-4 h-4" />
                        اتصل بالوكيل
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Renders calling simulation popup */}
      <AnimatePresence>
        {callingAgency && (
          <div id="calling-modal" className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-5 text-white text-right">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-zinc-950 rounded-3xl p-6 text-center w-full max-w-sm border border-zinc-800"
            >
              <div className="w-16 h-16 bg-purple-650 mx-auto rounded-full flex items-center justify-center animate-pulse mb-6 shadow-lg shadow-purple-900/40">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xs text-zinc-500 mb-1 font-semibold">يجري الاتصال برقم هاتف الوكيل...</h3>
              <h2 className="text-sm font-extrabold mb-4">{callingAgency.name}</h2>
              <div className="text-lg font-mono text-emerald-400 font-extrabold mb-8">{callingAgency.phone}</div>
              
              <p className="text-[10px] text-zinc-500 mb-6 font-semibold leading-relaxed">
                ملاحظة: هذا اتصال افتراضي ومحاكاة مدمجة داخل تطبيق تورو الجزائر لسهولة تواصل الأعضاء.
              </p>

              <button
                onClick={() => setCallingAgency(null)}
                className="w-full py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-full transition-colors cursor-pointer"
              >
                إنهاء الاتصال بالوكيل
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Agency fleet details sheet */}
      <AnimatePresence>
        {selectedAgency && (
          <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/75 backdrop-blur-xs text-right text-white">
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25 }}
              className="bg-zinc-950 w-full max-w-md rounded-t-3xl max-h-[85vh] flex flex-col shadow-2xl relative border-t border-zinc-850"
            >
              <button 
                onClick={() => setSelectedAgency(null)}
                className="absolute top-4 left-4 p-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white"
                title="إغلاق التقرير"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-4 border-b border-zinc-900 shrink-0">
                <div className="flex gap-3 items-center">
                  <img 
                    src={selectedAgency.logo} 
                    alt="" 
                    className="w-11 h-11 rounded-xl object-cover shrink-0 border border-zinc-800"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h3 className="text-xs font-extrabold text-white">{selectedAgency.name}</h3>
                    <p className="text-[10px] text-zinc-400 font-semibold">{selectedAgency.city} • {selectedAgency.address}</p>
                  </div>
                </div>
              </div>

              {/* Fleet List wrapper */}
              <div className="p-4 overflow-y-auto no-scrollbar flex-1 pb-12">
                <h4 className="text-[11px] font-extrabold text-zinc-400 mb-3.5">المركبات المتاحة حالياً للكراء بالولاية:</h4>
                <div className="space-y-3">
                  {getAgencyCars(selectedAgency.id).length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-xs font-semibold text-zinc-500">لا توجد سيارات معلنة لهذا المكتب حالياً.</p>
                    </div>
                  ) : (
                    getAgencyCars(selectedAgency.id).map(car => (
                      <div 
                        key={car.id}
                        onClick={() => {
                          onSelectCar(car);
                          setSelectedAgency(null);
                        }}
                        className="flex border border-zinc-800 rounded-xl p-2 bg-zinc-900/60 hover:bg-zinc-850 cursor-pointer transition-colors items-center gap-3"
                      >
                        <img 
                          src={car.image} 
                          alt="" 
                          className="w-20 h-14 rounded-lg object-cover shrink-0 bg-zinc-950"
                          referrerPolicy="no-referrer"
                        />
                        <div className="flex-1 min-w-0">
                          <h5 className="text-xs font-extrabold text-white truncate">{car.brand} {car.model}</h5>
                          <p className="text-[9px] text-zinc-400 font-semibold mt-1">{car.year} • {car.transmission === 'automatic' ? 'أوتوماتيك' : 'يدوي'}</p>
                        </div>
                        <div className="text-left font-black text-xs text-purple-400 pr-1 select-none font-mono">
                          {car.pricePerDay.toLocaleString()} دج
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
