export const ALGERIA_WILAYAS = [
  "أدرار", "الشلف", "الأغواط", "أم البواقي", "باتنة", "بجاية", "بسكرة", "بشار",
  "البليدة", "البويرة", "تمنراست", "تبسة", "تلمسان", "تيارت", "تيزي وزو", "الجزائر",
  "الجلفة", "جيجل", "سطيف", "سعيدة", "سكيكدة", "سيدي بلعباس", "عنابة", "قالمة",
  "قسنطينة", "المدية", "مستغانم", "المسيلة", "معسكر", "ورقلة", "وهران", "البيض",
  "إليزي", "برج بوعريريج", "بومرداس", "الطارف", "تندوف", "تيسمسيلت", "الوادي", "خنشلة",
  "سوق أهراس", "تيبازة", "ميلة", "عين الدفلى", "النعامة", "عين تموشنت", "غرداية", "غليزان",
  "تيميمون", "برج باجي مختار", "أولاد جلال", "بني عباس", "عين صالح", "عين قزام", "تقرت", "جانت",
  "المغير", "المنيعة"
];

export const CARS = [
  {id:1, name:"Mercedes S-Class",      type:"luxury",  price:15000,rating:4.95,trips:128,reviews:94, year:2023,seats:5,wilaya:"الجزائر",  img:"https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=700&q=80",badge:"فاخرة",  verified:true, fuel:"بنزين",  trans:"أوتوماتيك",freeCancel:false},
  {id:2, name:"BMW 5 Series",          type:"luxury",  price:12000,rating:4.9, trips:87, reviews:72, year:2022,seats:5,wilaya:"وهران",    img:"https://images.unsplash.com/photo-1555215695-3004980ad54e?w=700&q=80",badge:"فاخرة",  verified:true, fuel:"بنزين",  trans:"أوتوماتيك",freeCancel:false},
  {id:3, name:"Toyota RAV4",           type:"suv",     price:7000, rating:4.85,trips:203,reviews:181,year:2023,seats:7,wilaya:"الجزائر",  img:"https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=700&q=80",badge:"SUV",     verified:true, fuel:"بنزين",  trans:"أوتوماتيك",freeCancel:true },
  {id:4, name:"Tesla Model 3",         type:"electric",price:9000, rating:4.95,trips:65, reviews:58, year:2024,seats:5,wilaya:"قسنطينة", img:"https://images.unsplash.com/photo-1617788138017-80ad40651399?w=700&q=80",badge:"كهربائية",verified:true, fuel:"كهربائي",trans:"أوتوماتيك",freeCancel:true },
  {id:5, name:"Rolls-Royce Phantom",   type:"wedding", price:80000,rating:5.0, trips:42, reviews:42, year:2023,seats:5,wilaya:"الجزائر",  img:"https://images.unsplash.com/photo-1631295868223-63265b40d9e4?w=700&q=80",badge:"زفاف",   verified:true, fuel:"بنزين",  trans:"أوتوماتيك",freeCancel:false},
  {id:6, name:"Range Rover Vogue",     type:"suv",     price:18000,rating:4.9, trips:55, reviews:51, year:2023,seats:5,wilaya:"وهران",    img:"https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=700&q=80",badge:"SUV",     verified:true, fuel:"ديزل",   trans:"أوتوماتيك",freeCancel:true },
  {id:7, name:"Dacia Duster",          type:"suv",     price:3500, rating:4.75,trips:310,reviews:278,year:2022,seats:5,wilaya:"سطيف",     img:"https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=700&q=80",badge:"SUV",     verified:false,fuel:"بنزين",  trans:"يدوي",    freeCancel:true },
  {id:8, name:"Audi A6",              type:"luxury",  price:13500,rating:4.88,trips:72, reviews:65, year:2023,seats:5,wilaya:"قسنطينة", img:"https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=700&q=80",badge:"فاخرة",  verified:true, fuel:"بنزين",  trans:"أوتوماتيك",freeCancel:false},
  {id:9, name:"Toyota Land Cruiser",  type:"4x4",     price:16000,rating:4.9, trips:95, reviews:88, year:2023,seats:7,wilaya:"الجزائر",  img:"https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=700&q=80",badge:"4×4",    verified:true, fuel:"ديزل",   trans:"أوتوماتيك",freeCancel:true },
  {id:10,name:"Tesla Model Y",        type:"electric",price:11000,rating:4.97,trips:38, reviews:35, year:2024,seats:7,wilaya:"قسنطينة", img:"https://images.unsplash.com/photo-1617788138017-80ad40651399?w=700&q=80",badge:"كهربائية",verified:true, fuel:"كهربائي",trans:"أوتوماتيك",freeCancel:true },
  {id:11,name:"Bentley Continental",  type:"wedding", price:65000,rating:4.98,trips:38, reviews:37, year:2022,seats:4,wilaya:"الجزائر",  img:"https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=700&q=80",badge:"زفاف",   verified:true, fuel:"بنزين",  trans:"أوتوماتيك",freeCancel:false},
  {id:12,name:"Renault Clio",         type:"sedan",   price:2800, rating:4.6, trips:290,reviews:260,year:2022,seats:5,wilaya:"سطيف",     img:"https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=700&q=80",badge:"سيدان",  verified:false,fuel:"بنزين",  trans:"يدوي",    freeCancel:true },
];

export const AGENCIES = [
  {id:1, name:"وكالة الجزائر بريميوم", wilaya:"الجزائر", rating:4.97, cars:42, badge:"الأفضل", color:"#7C3AED", img:"https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&q=80"},
  {id:2, name:"وهران درايف",           wilaya:"وهران",   rating:4.92, cars:28, badge:"موثوقة", color:"#2563EB", img:"https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80"},
  {id:3, name:"قسنطينة لوكس",          wilaya:"قسنطينة", rating:4.89, cars:19, badge:"جديدة",  color:"#059669", img:"https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400&q=80"},
  {id:4, name:"عنابة كارز",            wilaya:"عنابة",   rating:4.85, cars:15, badge:"موثوقة", color:"#DC2626", img:"https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&q=80"},
  {id:5, name:"سطيف أوتو",             wilaya:"سطيف",   rating:4.8,  cars:12, badge:"",        color:"#D97706", img:"https://images.unsplash.com/photo-1556761175-4b46a572b786?w=400&q=80"},
  {id:6, name:"تيزي وزو رينت",         wilaya:"تيزي وزو",rating:4.93, cars:22, badge:"مميزة",  color:"#7C3AED", img:"https://images.unsplash.com/photo-1577412647305-991150c7d163?w=400&q=80"},
];

export const MONTH_CARS = [
  {id:1,  name:"Mercedes S-Class",    wilaya:"الجزائر",  price:15000, rating:4.95, img:"https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&q=85", fuel:"بنزين",   badge:"فاخرة",    verified:true},
  {id:2,  name:"Tesla Model 3",       wilaya:"قسنطينة",  price:9000,  rating:4.95, img:"https://images.unsplash.com/photo-1617788138017-80ad40651399?w=600&q=85", fuel:"كهربائي", badge:"كهربائية",  verified:true},
  {id:3,  name:"Toyota RAV4",         wilaya:"وهران",    price:7000,  rating:4.85, img:"https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=600&q=85", fuel:"بنزين",   badge:"SUV",       verified:true},
  {id:4,  name:"BMW 5 Series",        wilaya:"الجزائر",  price:12000, rating:4.9,  img:"https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&q=85", fuel:"بنزين",   badge:"فاخرة",    verified:true},
  {id:5,  name:"Range Rover Vogue",   wilaya:"وهران",    price:18000, rating:4.9,  img:"https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=600&q=85", fuel:"ديزل",    badge:"SUV",       verified:true},
  {id:6,  name:"Dacia Duster",        wilaya:"سطيف",     price:3500,  rating:4.75, img:"https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&q=85", fuel:"بنزين",   badge:"SUV",       verified:false},
  {id:7,  name:"Tesla Model Y",       wilaya:"قسنطينة",  price:11000, rating:4.97, img:"https://images.unsplash.com/photo-1617788138017-80ad40651399?w=600&q=85", fuel:"كهربائي", badge:"كهربائية",  verified:true},
  {id:8,  name:"Audi A6",            wilaya:"الجزائر",  price:13500, rating:4.88, img:"https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600&q=85", fuel:"بنزين",   badge:"فاخرة",    verified:true},
];

export const WEDDING_CARS = [
  {id:1, name:"Rolls-Royce Phantom",    wilaya:"الجزائر",  price:80000, rating:5.0,  img:"https://images.unsplash.com/photo-1631295868223-63265b40d9e4?w=600&q=85", desc:"الفخامة المطلقة لليلة العمر"},
  {id:2, name:"Bentley Continental GT", wilaya:"الجزائر",  price:65000, rating:4.98, img:"https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=600&q=85", desc:"أناقة بريطانية لا تُضاهى"},
  {id:3, name:"Mercedes S560",          wilaya:"وهران",    price:35000, rating:4.9,  img:"https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&q=85", desc:"رفاهية ألمانية لحفل الأحلام"},
  {id:4, name:"BMW 7 Series",           wilaya:"قسنطينة",  price:28000, rating:4.87, img:"https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&q=85", desc:"فخامة وأناقة بلا حدود"},
  {id:5, name:"Porsche Panamera",       wilaya:"تيزي وزو", price:45000, rating:4.95, img:"https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600&q=85", desc:"رياضي وفاخر في آنٍ واحد"},
];

export const LUXURY_CARS = [
  {id:1, name:"Lamborghini Urus",    price:50000, rating:5.0,  wilaya:"الجزائر",  img:"https://images.unsplash.com/photo-1573950940509-d924ee3fd345?w=600&q=85",  hp:"650", seats:4},
  {id:2, name:"Mercedes S-Class",   price:15000, rating:4.95, wilaya:"الجزائر",  img:"https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&q=85", hp:"496", seats:5},
  {id:3, name:"Audi A8",            price:16000, rating:4.9,  wilaya:"وهران",    img:"https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600&q=85",  hp:"340", seats:5},
  {id:4, name:"BMW 7 Series",       price:14000, rating:4.88, wilaya:"الجزائر",  img:"https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&q=85",  hp:"530", seats:5},
  {id:5, name:"Maserati Ghibli",    price:22000, rating:4.92, wilaya:"قسنطينة",  img:"https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=600&q=85",  hp:"430", seats:4},
  {id:6, name:"Porsche Cayenne",    price:25000, rating:4.94, wilaya:"الجزائر",  img:"https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=600&q=85",  hp:"340", seats:5},
];

export const INIT_REVIEWS = [
  {id:1,carId:1,name:"أحمد بن علي",  avatar:"https://i.pravatar.cc/60?img=33",rating:5,comment:"سيارة رائعة ونظيفة جداً، الوكالة محترفة!",date:"أبريل 2025"},
  {id:2,carId:1,name:"Karim M.",     avatar:"https://i.pravatar.cc/60?img=52",rating:4,comment:"Très bonne voiture, propre et confortable.",   date:"مارس 2025"},
  {id:3,carId:3,name:"يوسف قاسم",   avatar:"https://i.pravatar.cc/60?img=15",rating:5,comment:"SUV مريح جداً للعائلة، سعر معقول.",            date:"أبريل 2025"},
  {id:4,carId:4,name:"Sofiane L.",   avatar:"https://i.pravatar.cc/60?img=60",rating:5,comment:"تجربة استثنائية مع التيسلا!",                  date:"مارس 2025"},
];

export const TYPES = [
  {k:"all",ar:"الكل",icon:"🚘"},{k:"sedan",ar:"سيدان",icon:"🚗"},
  {k:"suv",ar:"SUV",icon:"🚙"},{k:"4x4",ar:"4×4",icon:"🏔️"},
  {k:"luxury",ar:"فاخرة",icon:"💎"},{k:"electric",ar:"كهربائية",icon:"⚡"},
  {k:"van",ar:"فان",icon:"🚐"},{k:"wedding",ar:"زفاف",icon:"💍"},
];

export const ONBOARDING = [
  {
    accent:"#7C3AED", light:"#A78BFA",
    bg:"radial-gradient(ellipse 100% 70% at 50% 30%, #2D1060 0%, #12003A 50%, #07080F 100%)",
    badge:"🇩🇿 منصة جزائرية",
    title1:"أكثر من", title2:"1500 سيارة",
    sub1:"فاخرة · اقتصادية · كهربائية · زفاف",
    sub2:"كلها تنتظر حجزك الآن",
    stats:[{n:"1500+",l:"سيارة"},{n:"500+",l:"وكالة"},{n:"58",l:"ولاية"}],
    cta:"التالي",
  },
  {
    accent:"#2563EB", light:"#60A5FA",
    bg:"radial-gradient(ellipse 100% 70% at 50% 30%, #001B4A 0%, #000D2E 50%, #07080F 100%)",
    badge:"📍 تغطية شاملة",
    title1:"في كل", title2:"ولاية جزائرية",
    sub1:"من الجزائر العاصمة إلى تمنراست",
    sub2:"احجز سيارتك أينما كنت",
    stats:[{n:"58",l:"ولاية"},{n:"2min",l:"وقت الحجز"},{n:"24/7",l:"خدمة"}],
    cta:"التالي",
  },
  {
    accent:"#059669", light:"#34D399",
    bg:"radial-gradient(ellipse 100% 70% at 50% 30%, #002818 0%, #001208 50%, #07080F 100%)",
    badge:"🛡️ أمان تام",
    title1:"وكالات موثقة", title2:"100%",
    sub1:"كل وكالة مفحوصة ومعتمدة رسمياً",
    sub2:"تأمين شامل وإلغاء مجاني",
    stats:[{n:"4.9★",l:"تقييم"},{n:"100%",l:"موثوقية"},{n:"0",l:"مشاكل"}],
    cta:"التالي",
  },
  {
    accent:"#D97706", light:"#FCD34D",
    bg:"radial-gradient(ellipse 100% 70% at 50% 30%, #2A1200 0%, #120800 50%, #07080F 100%)",
    badge:"⚡ سريع وسهل",
    title1:"ابدأ رحلتك في", title2:"3 خطوات",
    sub1:"ابحث · اختر · احجز",
    sub2:"بدون تعقيدات، بدون انتظار",
    stats:[{n:"3",l:"خطوات"},{n:"فوري",l:"تأكيد"},{n:"مجاني",l:"إلغاء"}],
    cta:"ابدأ الآن 🚗",
  },
];
