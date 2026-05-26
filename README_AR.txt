درايف Rent - نسخة تطويرية محسنة

تمت إضافة هذه الخصائص مع الحفاظ على نفس التصميم العام:

1) نظام حجز حقيقي داخل الواجهة:
- اختيار تاريخ الاستلام والإرجاع.
- اختيار طريقة الاستلام: الوكالة / توصيل داخل الولاية / المطار / الفندق.
- إدخال اسم السائق ورقم الهاتف.
- حفظ طلب الحجز في localStorage.
- ظهور الطلب مباشرة في صفحة "رحلاتي" بحالة "بانتظار الوكالة".

2) Location Services:
- دعم 58 ولاية جزائرية.
- تحديد الولاية الأقرب حسب GPS.
- زر "قريب مني" داخل الصفحة الرئيسية.
- ترتيب الوكالات والسيارات حسب الولاية المختارة.

3) PWA محسّن:
- Manifest موجود.
- Service Worker v3.
- Offline fallback page.
- Cache للصور والأصول الأساسية.
- Install prompt داخل الواجهة عند توفره.
- Splash/App icons موجودة.

4) UX Mobile First:
- Bottom Sheet ذكي للاقتراحات.
- Backdrop blur.
- Fade background.
- Spring animations.
- Momentum scrolling.
- Skeleton loading موجود ومُحافظ عليه.

5) اقترح لي سيارة:
- اختيار الولاية.
- تحديد الميزانية اليومية.
- اختيار نوع الرحلة.
- ترتيب السيارات حسب التطابق والسعر والتقييم والتوفر في نفس الولاية.

إعدادات Vercel:
Framework Preset: Vite
Install Command: npm install --registry=https://registry.npmjs.org/
Build Command: npm run build
Output Directory: dist
Root Directory: ./
