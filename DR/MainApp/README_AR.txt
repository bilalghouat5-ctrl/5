MainApp — تطبيق المستخدم الرئيسي RENT درايف

هذا المجلد مستقل وجاهز للرفع إلى GitHub أو Vercel كمشروع منفصل.

التشغيل المحلي:
npm install
npm run dev

البناء:
npm run build

Vercel:
Root Directory: MainApp
Build Command: npm run build
Output Directory: dist

متغيرات البيئة:
انسخ .env.example إلى .env محلياً، وفي Vercel أضف:
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
