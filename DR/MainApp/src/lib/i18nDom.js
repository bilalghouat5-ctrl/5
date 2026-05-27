import { useEffect } from "react";

const UI = {
  fr: {
    "استكشف": "Explorer",
    "المفضلة": "Favoris",
    "رحلاتي": "Mes trajets",
    "رسائل": "Messages",
    "حسابي": "Mon compte",
    "تسجيل الدخول": "Connexion",
    "إنشاء حساب": "Créer un compte",
    "إنشاء حساب جديد": "Créer un nouveau compte",
    "سجّل الدخول للمتابعة": "Connectez-vous pour continuer",
    "هذه الصفحة مخصصة للمستخدمين المسجلين.": "Cette page est réservée aux utilisateurs connectés.",
    "قريب مني": "Près de moi",
    "اقترح لي سيارة": "Suggérer une voiture",
    "ابحث: سيارة، ولاية، نوع...": "Rechercher : voiture, wilaya, type...",
    "أجر سيارتك المثالية بكل سهولة": "Louez la voiture idéale en toute simplicité",
    "تحديد الموقع...": "Localisation...",
    "أكثر من +1000 سيارة تنتظركم": "+1000 voitures vous attendent",
    "فلتر": "Filtre",
    "الكل": "Tous",
    "من": "De",
    "إلى": "À",
    "بنزين": "Essence",
    "ديزل": "Diesel",
    "كهربائي": "Électrique",
    "كهربائية": "Électrique",
    "هيبرد": "Hybride",
    "غاز": "GPL",
    "أوتوماتيك": "Automatique",
    "يدوي": "Manuelle",
    "فاخرة": "Luxe",
    "فان": "Van",
    "زفاف": "Mariage",
    "سيدان": "Berline",
    "سيارات رباعية الدفع 4X4": "Voitures 4X4",
    "تمتع بتجربة قيادتها على رمال الصحراء الكبرى": "Profitez d’une conduite sur les dunes du Sahara",
    "السيارات الفاخرة": "Voitures de luxe",
    "تجربة قيادة استثنائية": "Une expérience de conduite exceptionnelle",
    "سيارات الفان": "Vans",
    "اختيار عملي للعائلات والرحلات الجماعية": "Un choix pratique pour les familles et les groupes",
    "السيارات الكهربائية": "Voitures électriques",
    "تنقل هادئ واقتصادي بتقنيات حديثة": "Mobilité silencieuse et économique avec des technologies modernes",
    "عرض الكل": "Voir tout",
    "الكل": "Tous",
    "كل الوكالات": "Toutes les agences",
    "استعرض جميع الوكالات المعتمدة في الجزائر": "Parcourez toutes les agences agréées en Algérie",
    "كل سيارات الزفاف": "Toutes les voitures de mariage",
    "سيارات فاخرة للمناسبات والأعراس": "Voitures premium pour événements et mariages",
    "كل السيارات الفاخرة": "Toutes les voitures de luxe",
    "اختيارات راقية لتجربة قيادة مميزة": "Des choix premium pour une conduite distinguée",
    "كل سيارات رباعية الدفع 4X4": "Tous les véhicules 4X4",
    "كل سيارات الفان": "Tous les vans",
    "سيارات عملية للعائلات والرحلات الجماعية": "Des voitures pratiques pour familles et groupes",
    "كل السيارات الكهربائية": "Toutes les voitures électriques",
    "رجوع": "Retour",
    "مشاركة": "Partager",
    "مفضلة": "Favori",
    "سيارة": "Voiture",
    "مقاعد": "places",
    "علبة السرعات": "Boîte de vitesses",
    "عداد الكيلومترات": "Compteur kilométrique",
    "تاريخ الاستلام": "Date de départ",
    "تاريخ الإرجاع": "Date de retour",
    "تعديل": "Modifier",
    "اسمك ولقبك في الوثائق الرسمية": "Nom et prénom officiels",
    "رقم الهاتف": "Numéro de téléphone",
    "أحتاج سائق": "J’ai besoin d’un chauffeur",
    "لا أحتاج سائق": "Je n’ai pas besoin de chauffeur",
    "رحلتك": "Votre trajet",
    "حجز الآن": "Réserver maintenant",
    "حفظ الرحلة": "Enregistrer le trajet",
    "الحجز عبر واتساب": "Réserver via WhatsApp",
    "الحجز عبر منصة الوكالة": "Réserver via la plateforme de l’agence",
    "اختر طريقة الحجز": "Choisissez le mode de réservation",
    "سيتم الاتصال بك قريباً من طرف وكالتنا": "Notre agence vous contactera bientôt",
    "تقييم السيارة": "Évaluer la voiture",
    "إضافة تقييم للسيارة": "Ajouter un avis sur la voiture",
    "اكتب تعليقك على السيارة...": "Écrivez votre commentaire sur la voiture...",
    "تعليقات المستخدمين": "Avis des utilisateurs",
    "السيارة نظيفة ومريحة، والوكالة تعاملها ممتاز.": "La voiture est propre et confortable, et l’agence est excellente.",
    "تجربة جيدة، الاستلام كان سريعًا والسيارة مطابقة للصور.": "Bonne expérience, prise en charge rapide et voiture conforme aux photos.",
    "هذا الأسبوع": "Cette semaine",
    "الشهر الماضي": "Le mois dernier",
    "الآن": "Maintenant",
    "اليوم": "Aujourd’hui",
    "أمس": "Hier",
    "قبل 10 د": "Il y a 10 min",
    "الوكالة": "Agence",
    "العنوان": "Adresse",
    "عدد السيارات": "Nombre de voitures",
    "أوقات العمل": "Horaires",
    "كل يوم · 24/7": "Tous les jours · 24/7",
    "تواصل مع الوكالة": "Contacter l’agence",
    "اتصل على الرقم الأول": "Appeler le premier numéro",
    "اتصل على الرقم الثاني": "Appeler le deuxième numéro",
    "اتصل على الرقم الثالث": "Appeler le troisième numéro",
    "تواصل معنا على الواتساب": "Nous contacter sur WhatsApp",
    "إضافة للمفضلة": "Ajouter aux favoris",
    "وكالة موثقة": "Agence vérifiée",
    "موقعك": "Votre position",
    "ابحث عن ولايتك...": "Rechercher votre wilaya...",
    "عرض السيارات المتاحة في ولايتك": "Afficher les voitures disponibles dans votre wilaya",
    "نتائج بحث أسرع وأكثر دقة": "Résultats plus rapides et plus précis",
    "موقعك لا يُشارك مع أحد": "Votre position n’est partagée avec personne",
    "تخطي": "Ignorer",
    "متابعة": "Continuer",
    "السماح بالموقع": "Autoriser la localisation",
    "اختيار يدوي": "Choisir manuellement",
    "استخدام موقعي": "Utiliser ma position",
    "استعمال يومي": "Usage quotidien",
    "عائلة": "Famille",
    "زفاف": "Mariage",
    "الجزائر": "Alger",
    "ابحث عن رحلتك": "Trouvez votre trajet",
    "الدخول عبر Google": "Connexion avec Google",
    "الدخول عبر Apple": "Connexion avec Apple",
    "المتابعة عبر Google": "Continuer avec Google",
    "المتابعة عبر Apple": "Continuer avec Apple",
    "سجّل الدخول لإكمال هذه العملية": "Connectez-vous pour continuer cette action",
    "بيانات الوكالة": "Données de l’agence",
    "بيانات الحساب": "Données du compte",
    "التحقق والإرسال": "Vérification et envoi",
    "اسم الوكالة": "Nom de l’agence",
    "الاسم الكامل": "Nom complet",
    "الاسم واللقب": "Nom et prénom",
    "الولاية": "Wilaya",
    "اسم المستخدم": "Nom d’utilisateur",
    "الإيميل": "E-mail",
    "الهاتف": "Téléphone",
    "مثال: وكالة الجزائر بريميوم": "Exemple : Agence Alger Premium",
    "ستتلقى اتصالاً هاتفياً من قبل فريقنا خلال 24 ساعة القادمة": "Vous recevrez un appel de notre équipe dans les prochaines 24 heures",
    "إرسال الطلب": "Envoyer la demande",
    "التالي": "Suivant",
    "السابق": "Précédent",
    "أدخل بيانات حسابك للمتابعة": "Saisissez vos informations pour continuer",
    "تسجيل الدخول": "Connexion",
    "كلمة السر": "Mot de passe",
    "البريد الإلكتروني": "E-mail",
    "نسيت كلمة المرور؟": "Mot de passe oublié ?",
    "دخول": "Connexion",
    "أو": "Ou",
    "ليس لديك حساب؟": "Vous n’avez pas de compte ?",
    "تم الإرسال": "Envoyé",
    "أرسلنا رابط استرجاع كلمة المرور إلى بريدك.": "Nous avons envoyé un lien de récupération à votre e-mail.",
    "حسنًا": "OK",
    "استرجاع كلمة المرور": "Récupérer le mot de passe",
    "أدخل بريدك الإلكتروني وسنرسل رابط الاسترجاع.": "Entrez votre e-mail et nous enverrons un lien de récupération.",
    "جاري الإرسال...": "Envoi...",
    "إرسال الرابط": "Envoyer le lien",
    "كلمة المرور يجب أن تكون 6 أحرف على الأقل": "Le mot de passe doit contenir au moins 6 caractères",
    "محمد أمين": "Mohamed Amine",
    "أوافق على": "J’accepte",
    "شروط الاستخدام": "les conditions d’utilisation",
    "سياسة الخصوصية": "la politique de confidentialité",
    "جاري الإنشاء...": "Création...",
    "التسجيل عبر Google": "Inscription avec Google",
    "التسجيل عبر Apple": "Inscription avec Apple",
    "لديك حساب بالفعل؟": "Vous avez déjà un compte ?",
    "اللغة": "Langue",
    "اختر لغة التطبيق": "Choisissez la langue de l’application",
    "الدعم والمساعدة": "Aide et support",
    "تواصل مع فريق درايف Rent": "Contacter l’équipe Drive Rent",
    "الإشعارات": "Notifications",
    "تنبيهات الحجوزات والرسائل": "Alertes de réservations et de messages",
    "تسجيل الخروج": "Déconnexion",
    "الخروج من حساب المستخدم": "Quitter le compte utilisateur",
    "سيتم إضافة مركز المساعدة قريبًا": "Le centre d’aide sera bientôt ajouté",
    "الإشعارات مفعّلة": "Notifications activées",
    "تم إرسال طلب الحجز": "Demande de réservation envoyée",
    "طلبك وصل إلى الوكالة وسيتم الرد عليك قريبًا.": "Votre demande est arrivée à l’agence, une réponse suivra bientôt.",
    "الوكالة ستتصل بك قريبًا": "L’agence vous appellera bientôt",
    "تابع هاتفك خلال الساعات القادمة لتأكيد تفاصيل الرحلة.": "Gardez votre téléphone disponible pour confirmer les détails du trajet.",
    "تم حفظ الرحلة": "Trajet enregistré",
    "يمكنك الرجوع إليها من صفحة رحلاتي في أي وقت.": "Vous pouvez le retrouver dans Mes trajets à tout moment.",
    "عرض جديد في ولايتك": "Nouvelle offre dans votre wilaya",
    "سيارات 4X4 متاحة الآن لعطلة نهاية الأسبوع.": "Des 4X4 sont disponibles pour le week-end.",
    "الرسائل": "Messages",
    "إشعارات": "Notifications",
    "رسائل": "Messages",
    "السيارة متوفرة، يمكننا الاتصال بك لتأكيد الحجز.": "La voiture est disponible, nous pouvons vous appeler pour confirmer.",
    "مكان الاستلام من مقر الوكالة أو الفندق.": "Prise en charge au siège de l’agence ou à l’hôtel.",
    "هل السيارة متوفرة؟": "La voiture est-elle disponible ?",
    "أين مكان الاستلام؟": "Où se fait la prise en charge ?",
    "هل يوجد سائق؟": "Y a-t-il un chauffeur ?",
    "ما هي وثائق الحجز؟": "Quels documents sont nécessaires ?",
    "اكتب رسالة سريعة...": "Écrivez un message rapide...",
    "متصل الآن": "En ligne",
    "مرحبا": "Bonjour",
    "كيف يمكننا مساعدتك؟": "Comment pouvons-nous vous aider ?",
    "طلبات": "Demandes",
    "جارية": "En cours",
    "منتهية": "Terminées",
    "مدفوع": "Payé",
    "بانتظار الوكالة": "En attente de l’agence",
    "عند الاستلام": "À la prise en charge",
    "لم تحفظ أي سيارة بعد": "Aucune voiture enregistrée",
    "خدمة الموقع غير متاحة على هذا الجهاز": "La localisation n’est pas disponible sur cet appareil",
    "جاري التحميل...": "Chargement...",
    "أضف": "Ajouter",
    "وكالتك": "votre agence",
  },
  en: {
    "استكشف": "Explore",
    "المفضلة": "Favorites",
    "رحلاتي": "My trips",
    "رسائل": "Messages",
    "حسابي": "Account",
    "تسجيل الدخول": "Sign in",
    "إنشاء حساب": "Create account",
    "إنشاء حساب جديد": "Create new account",
    "سجّل الدخول للمتابعة": "Sign in to continue",
    "هذه الصفحة مخصصة للمستخدمين المسجلين.": "This page is for signed-in users.",
    "قريب مني": "Near me",
    "اقترح لي سيارة": "Suggest a car",
    "ابحث: سيارة، ولاية، نوع...": "Search: car, wilaya, type...",
    "أجر سيارتك المثالية بكل سهولة": "Rent your perfect car easily",
    "تحديد الموقع...": "Locating...",
    "أكثر من +1000 سيارة تنتظركم": "+1000 cars are waiting for you",
    "فلتر": "Filter",
    "الكل": "All",
    "من": "From",
    "إلى": "To",
    "بنزين": "Gasoline",
    "ديزل": "Diesel",
    "كهربائي": "Electric",
    "كهربائية": "Electric",
    "هيبرد": "Hybrid",
    "غاز": "Gas",
    "أوتوماتيك": "Automatic",
    "يدوي": "Manual",
    "فاخرة": "Luxury",
    "فان": "Van",
    "زفاف": "Wedding",
    "سيدان": "Sedan",
    "سيارات رباعية الدفع 4X4": "4X4 cars",
    "تمتع بتجربة قيادتها على رمال الصحراء الكبرى": "Enjoy driving across the Sahara dunes",
    "السيارات الفاخرة": "Luxury cars",
    "تجربة قيادة استثنائية": "An exceptional driving experience",
    "سيارات الفان": "Vans",
    "اختيار عملي للعائلات والرحلات الجماعية": "A practical choice for families and group trips",
    "السيارات الكهربائية": "Electric cars",
    "تنقل هادئ واقتصادي بتقنيات حديثة": "Quiet, efficient mobility with modern tech",
    "عرض الكل": "See all",
    "كل الوكالات": "All agencies",
    "استعرض جميع الوكالات المعتمدة في الجزائر": "Browse all approved agencies in Algeria",
    "كل سيارات الزفاف": "All wedding cars",
    "سيارات فاخرة للمناسبات والأعراس": "Premium cars for events and weddings",
    "كل السيارات الفاخرة": "All luxury cars",
    "اختيارات راقية لتجربة قيادة مميزة": "Premium choices for a distinctive drive",
    "كل سيارات رباعية الدفع 4X4": "All 4X4 vehicles",
    "كل سيارات الفان": "All vans",
    "سيارات عملية للعائلات والرحلات الجماعية": "Practical cars for families and groups",
    "كل السيارات الكهربائية": "All electric cars",
    "رجوع": "Back",
    "مشاركة": "Share",
    "مفضلة": "Favorite",
    "سيارة": "Car",
    "مقاعد": "seats",
    "علبة السرعات": "Gearbox",
    "عداد الكيلومترات": "Odometer",
    "تاريخ الاستلام": "Pickup date",
    "تاريخ الإرجاع": "Return date",
    "تعديل": "Edit",
    "اسمك ولقبك في الوثائق الرسمية": "Your official first and last name",
    "رقم الهاتف": "Phone number",
    "أحتاج سائق": "I need a driver",
    "لا أحتاج سائق": "I don’t need a driver",
    "رحلتك": "Your trip",
    "حجز الآن": "Book now",
    "حفظ الرحلة": "Save trip",
    "الحجز عبر واتساب": "Book via WhatsApp",
    "الحجز عبر منصة الوكالة": "Book via agency platform",
    "اختر طريقة الحجز": "Choose booking method",
    "سيتم الاتصال بك قريباً من طرف وكالتنا": "Our agency will contact you soon",
    "تقييم السيارة": "Car rating",
    "إضافة تقييم للسيارة": "Add a car review",
    "اكتب تعليقك على السيارة...": "Write your review of the car...",
    "تعليقات المستخدمين": "User reviews",
    "السيارة نظيفة ومريحة، والوكالة تعاملها ممتاز.": "The car is clean and comfortable, and the agency is excellent.",
    "تجربة جيدة، الاستلام كان سريعًا والسيارة مطابقة للصور.": "Good experience, pickup was fast and the car matched the photos.",
    "هذا الأسبوع": "This week",
    "الشهر الماضي": "Last month",
    "الآن": "Now",
    "اليوم": "Today",
    "أمس": "Yesterday",
    "قبل 10 د": "10 min ago",
    "الوكالة": "Agency",
    "العنوان": "Address",
    "عدد السيارات": "Number of cars",
    "أوقات العمل": "Working hours",
    "كل يوم · 24/7": "Every day · 24/7",
    "تواصل مع الوكالة": "Contact agency",
    "اتصل على الرقم الأول": "Call the first number",
    "اتصل على الرقم الثاني": "Call the second number",
    "اتصل على الرقم الثالث": "Call the third number",
    "تواصل معنا على الواتساب": "Contact us on WhatsApp",
    "إضافة للمفضلة": "Add to favorites",
    "وكالة موثقة": "Verified agency",
    "موقعك": "Your location",
    "ابحث عن ولايتك...": "Search your wilaya...",
    "عرض السيارات المتاحة في ولايتك": "Show available cars in your wilaya",
    "نتائج بحث أسرع وأكثر دقة": "Faster and more accurate results",
    "موقعك لا يُشارك مع أحد": "Your location is not shared with anyone",
    "تخطي": "Skip",
    "متابعة": "Continue",
    "السماح بالموقع": "Allow location",
    "اختيار يدوي": "Choose manually",
    "استخدام موقعي": "Use my location",
    "استعمال يومي": "Daily use",
    "عائلة": "Family",
    "زفاف": "Wedding",
    "الجزائر": "Algiers",
    "ابحث عن رحلتك": "Find your trip",
    "الدخول عبر Google": "Sign in with Google",
    "الدخول عبر Apple": "Sign in with Apple",
    "المتابعة عبر Google": "Continue with Google",
    "المتابعة عبر Apple": "Continue with Apple",
    "سجّل الدخول لإكمال هذه العملية": "Sign in to complete this action",
    "بيانات الوكالة": "Agency details",
    "بيانات الحساب": "Account details",
    "التحقق والإرسال": "Verify and submit",
    "اسم الوكالة": "Agency name",
    "الاسم الكامل": "Full name",
    "الاسم واللقب": "First and last name",
    "الولاية": "Wilaya",
    "اسم المستخدم": "Username",
    "الإيميل": "Email",
    "الهاتف": "Phone",
    "مثال: وكالة الجزائر بريميوم": "Example: Algiers Premium Agency",
    "ستتلقى اتصالاً هاتفياً من قبل فريقنا خلال 24 ساعة القادمة": "You will receive a phone call from our team within the next 24 hours",
    "إرسال الطلب": "Submit request",
    "التالي": "Next",
    "السابق": "Previous",
    "أدخل بيانات حسابك للمتابعة": "Enter your account details to continue",
    "تسجيل الدخول": "Sign in",
    "كلمة السر": "Password",
    "البريد الإلكتروني": "Email",
    "نسيت كلمة المرور؟": "Forgot password?",
    "دخول": "Sign in",
    "أو": "Or",
    "ليس لديك حساب؟": "Don’t have an account?",
    "تم الإرسال": "Sent",
    "أرسلنا رابط استرجاع كلمة المرور إلى بريدك.": "We sent a password recovery link to your email.",
    "حسنًا": "OK",
    "استرجاع كلمة المرور": "Recover password",
    "أدخل بريدك الإلكتروني وسنرسل رابط الاسترجاع.": "Enter your email and we’ll send a recovery link.",
    "جاري الإرسال...": "Sending...",
    "إرسال الرابط": "Send link",
    "كلمة المرور يجب أن تكون 6 أحرف على الأقل": "Password must be at least 6 characters",
    "محمد أمين": "Mohamed Amine",
    "أوافق على": "I agree to",
    "شروط الاستخدام": "terms of use",
    "سياسة الخصوصية": "privacy policy",
    "جاري الإنشاء...": "Creating...",
    "التسجيل عبر Google": "Sign up with Google",
    "التسجيل عبر Apple": "Sign up with Apple",
    "لديك حساب بالفعل؟": "Already have an account?",
    "اللغة": "Language",
    "اختر لغة التطبيق": "Choose app language",
    "الدعم والمساعدة": "Support and help",
    "تواصل مع فريق درايف Rent": "Contact the Drive Rent team",
    "الإشعارات": "Notifications",
    "تنبيهات الحجوزات والرسائل": "Booking and message alerts",
    "تسجيل الخروج": "Sign out",
    "الخروج من حساب المستخدم": "Log out of the user account",
    "سيتم إضافة مركز المساعدة قريبًا": "The help center will be added soon",
    "الإشعارات مفعّلة": "Notifications are enabled",
    "تم إرسال طلب الحجز": "Booking request sent",
    "طلبك وصل إلى الوكالة وسيتم الرد عليك قريبًا.": "Your request reached the agency and they will reply soon.",
    "الوكالة ستتصل بك قريبًا": "The agency will contact you soon",
    "تابع هاتفك خلال الساعات القادمة لتأكيد تفاصيل الرحلة.": "Keep your phone available to confirm trip details.",
    "تم حفظ الرحلة": "Trip saved",
    "يمكنك الرجوع إليها من صفحة رحلاتي في أي وقت.": "You can find it in My trips anytime.",
    "عرض جديد في ولايتك": "New offer in your wilaya",
    "سيارات 4X4 متاحة الآن لعطلة نهاية الأسبوع.": "4X4 cars are available for the weekend.",
    "الرسائل": "Messages",
    "إشعارات": "Notifications",
    "رسائل": "Messages",
    "السيارة متوفرة، يمكننا الاتصال بك لتأكيد الحجز.": "The car is available; we can call you to confirm.",
    "مكان الاستلام من مقر الوكالة أو الفندق.": "Pickup is from the agency office or hotel.",
    "هل السيارة متوفرة؟": "Is the car available?",
    "أين مكان الاستلام؟": "Where is pickup?",
    "هل يوجد سائق؟": "Is a driver available?",
    "ما هي وثائق الحجز؟": "What documents are required?",
    "اكتب رسالة سريعة...": "Write a quick message...",
    "متصل الآن": "Online now",
    "مرحبا": "Hello",
    "كيف يمكننا مساعدتك؟": "How can we help you?",
    "طلبات": "Requests",
    "جارية": "Active",
    "منتهية": "Completed",
    "مدفوع": "Paid",
    "بانتظار الوكالة": "Waiting for agency",
    "عند الاستلام": "On pickup",
    "لم تحفظ أي سيارة بعد": "No saved cars yet",
    "خدمة الموقع غير متاحة على هذا الجهاز": "Location is not available on this device",
    "جاري التحميل...": "Loading...",
    "أضف": "Add",
    "وكالتك": "your agency",
  }
};

const WILAYAS = {
  fr: {
    "أدرار":"Adrar","الشلف":"Chlef","الأغواط":"Laghouat","أم البواقي":"Oum El Bouaghi","باتنة":"Batna","بجاية":"Béjaïa","بسكرة":"Biskra","بشار":"Béchar","البليدة":"Blida","البويرة":"Bouira","تمنراست":"Tamanrasset","تبسة":"Tébessa","تلمسان":"Tlemcen","تيارت":"Tiaret","تيزي وزو":"Tizi Ouzou","الجزائر":"Alger","الجلفة":"Djelfa","جيجل":"Jijel","سطيف":"Sétif","سعيدة":"Saïda","سكيكدة":"Skikda","سيدي بلعباس":"Sidi Bel Abbès","عنابة":"Annaba","قالمة":"Guelma","قسنطينة":"Constantine","المدية":"Médéa","مستغانم":"Mostaganem","المسيلة":"M’Sila","معسكر":"Mascara","ورقلة":"Ouargla","وهران":"Oran","البيض":"El Bayadh","إليزي":"Illizi","برج بوعريريج":"Bordj Bou Arréridj","بومرداس":"Boumerdès","الطارف":"El Tarf","تندوف":"Tindouf","تيسمسيلت":"Tissemsilt","الوادي":"El Oued","خنشلة":"Khenchela","سوق أهراس":"Souk Ahras","تيبازة":"Tipaza","ميلة":"Mila","عين الدفلى":"Aïn Defla","النعامة":"Naâma","عين تموشنت":"Aïn Témouchent","غرداية":"Ghardaïa","غليزان":"Relizane","تيميمون":"Timimoun","برج باجي مختار":"Bordj Badji Mokhtar","أولاد جلال":"Ouled Djellal","بني عباس":"Béni Abbès","عين صالح":"In Salah","عين قزام":"In Guezzam","تقرت":"Touggourt","جانت":"Djanet","المغير":"El M’Ghair","المنيعة":"El Meniaa"
  },
  en: {
    "أدرار":"Adrar","الشلف":"Chlef","الأغواط":"Laghouat","أم البواقي":"Oum El Bouaghi","باتنة":"Batna","بجاية":"Bejaia","بسكرة":"Biskra","بشار":"Bechar","البليدة":"Blida","البويرة":"Bouira","تمنراست":"Tamanrasset","تبسة":"Tebessa","تلمسان":"Tlemcen","تيارت":"Tiaret","تيزي وزو":"Tizi Ouzou","الجزائر":"Algiers","الجلفة":"Djelfa","جيجل":"Jijel","سطيف":"Setif","سعيدة":"Saida","سكيكدة":"Skikda","سيدي بلعباس":"Sidi Bel Abbes","عنابة":"Annaba","قالمة":"Guelma","قسنطينة":"Constantine","المدية":"Medea","مستغانم":"Mostaganem","المسيلة":"M'Sila","معسكر":"Mascara","ورقلة":"Ouargla","وهران":"Oran","البيض":"El Bayadh","إليزي":"Illizi","برج بوعريريج":"Bordj Bou Arreridj","بومرداس":"Boumerdes","الطارف":"El Tarf","تندوف":"Tindouf","تيسمسيلت":"Tissemsilt","الوادي":"El Oued","خنشلة":"Khenchela","سوق أهراس":"Souk Ahras","تيبازة":"Tipaza","ميلة":"Mila","عين الدفلى":"Ain Defla","النعامة":"Naama","عين تموشنت":"Ain Temouchent","غرداية":"Ghardaia","غليزان":"Relizane","تيميمون":"Timimoun","برج باجي مختار":"Bordj Badji Mokhtar","أولاد جلال":"Ouled Djellal","بني عباس":"Beni Abbes","عين صالح":"In Salah","عين قزام":"In Guezzam","تقرت":"Touggourt","جانت":"Djanet","المغير":"El M'Ghair","المنيعة":"El Meniaa"
  }
};


Object.assign(UI.fr, {
  "🇩🇿 منصة جزائرية":"🇩🇿 Plateforme algérienne",
  "أكثر من":"Plus de",
  "1500 سيارة":"1500 voitures",
  "فاخرة · اقتصادية · كهربائية · زفاف":"Luxe · économique · électrique · mariage",
  "كلها تنتظر حجزك الآن":"Toutes prêtes à être réservées",
  "وكالة":"agences",
  "ولاية":"wilayas",
  "📍 تغطية شاملة":"📍 Couverture complète",
  "في كل":"Dans chaque",
  "ولاية جزائرية":"wilaya algérienne",
  "من الجزائر العاصمة إلى تمنراست":"D’Alger à Tamanrasset",
  "احجز سيارتك أينما كنت":"Réservez votre voiture où que vous soyez",
  "وقت الحجز":"temps de réservation",
  "خدمة":"service",
  "🛡️ أمان تام":"🛡️ Sécurité totale",
  "وكالات موثقة":"Agences vérifiées",
  "كل وكالة مفحوصة ومعتمدة رسمياً":"Chaque agence est vérifiée et approuvée officiellement",
  "تأمين شامل وإلغاء مجاني":"Assurance complète et annulation gratuite",
  "تقييم":"note",
  "موثوقية":"fiabilité",
  "مشاكل":"problèmes",
  "⚡ سريع وسهل":"⚡ Rapide et simple",
  "ابدأ رحلتك في":"Commencez votre trajet en",
  "3 خطوات":"3 étapes",
  "ابحث · اختر · احجز":"Cherchez · choisissez · réservez",
  "بدون تعقيدات، بدون انتظار":"Sans complication, sans attente",
  "خطوات":"étapes",
  "فوري":"instantané",
  "تأكيد":"confirmation",
  "مجاني":"gratuit",
  "إلغاء":"annulation",
  "ابدأ الآن 🚗":"Commencer maintenant 🚗",
  "خصوصية تامة":"Confidentialité totale",
  "لا تُشارك Apple كلمة مرورك مع أي جهة":"Apple ne partage jamais votre mot de passe",
  "إخفاء البريد":"Masquer l’e-mail",
  "يمكنك إخفاء بريدك الحقيقي عبر بريد وهمي":"Vous pouvez masquer votre vrai e-mail avec un relais privé",
  "دخول سريع":"Connexion rapide",
  "تسجيل دخول بلمسة واحدة في أي وقت":"Connexion en un geste à tout moment",
  "مشاركة بريدي الحقيقي":"Partager mon vrai e-mail",
  "إخفاء بريدي":"Masquer mon e-mail",
  "سيتم إخفاء بريدك الحقيقي وإرسال بريد وهمي للتطبيق":"Votre vrai e-mail sera masqué et un relais sera envoyé à l’application",
  "ستُشارك بريدك الحقيقي مع درايف RENT":"Votre vrai e-mail sera partagé avec Drive RENT",
  "استخدام حساب آخر":"Utiliser un autre compte",
  "جاري الربط...":"Connexion...",
  "درايف Rent":"Drive Rent",
  "RENT درايف":"Drive RENT",
  "درايف":"Drive",
  "أضف وكالتك":"Ajouter votre agence",
  "جديدة":"Nouveau",
  "الأفضل":"Meilleur",
  "مميز":"Vedette"
});
Object.assign(UI.en, {
  "🇩🇿 منصة جزائرية":"🇩🇿 Algerian platform",
  "أكثر من":"More than",
  "1500 سيارة":"1500 cars",
  "فاخرة · اقتصادية · كهربائية · زفاف":"Luxury · economy · electric · wedding",
  "كلها تنتظر حجزك الآن":"All ready for your booking",
  "وكالة":"agencies",
  "ولاية":"wilayas",
  "📍 تغطية شاملة":"📍 Full coverage",
  "في كل":"In every",
  "ولاية جزائرية":"Algerian wilaya",
  "من الجزائر العاصمة إلى تمنراست":"From Algiers to Tamanrasset",
  "احجز سيارتك أينما كنت":"Book your car wherever you are",
  "وقت الحجز":"booking time",
  "خدمة":"service",
  "🛡️ أمان تام":"🛡️ Full safety",
  "وكالات موثقة":"Verified agencies",
  "كل وكالة مفحوصة ومعتمدة رسمياً":"Every agency is reviewed and officially approved",
  "تأمين شامل وإلغاء مجاني":"Full insurance and free cancellation",
  "تقييم":"rating",
  "موثوقية":"reliability",
  "مشاكل":"issues",
  "⚡ سريع وسهل":"⚡ Fast and easy",
  "ابدأ رحلتك في":"Start your trip in",
  "3 خطوات":"3 steps",
  "ابحث · اختر · احجز":"Search · choose · book",
  "بدون تعقيدات، بدون انتظار":"No complications, no waiting",
  "خطوات":"steps",
  "فوري":"instant",
  "تأكيد":"confirmation",
  "مجاني":"free",
  "إلغاء":"cancellation",
  "ابدأ الآن 🚗":"Get started 🚗",
  "خصوصية تامة":"Full privacy",
  "لا تُشارك Apple كلمة مرورك مع أي جهة":"Apple never shares your password",
  "إخفاء البريد":"Hide email",
  "يمكنك إخفاء بريدك الحقيقي عبر بريد وهمي":"You can hide your real email using a private relay",
  "دخول سريع":"Quick sign-in",
  "تسجيل دخول بلمسة واحدة في أي وقت":"One-tap sign-in anytime",
  "مشاركة بريدي الحقيقي":"Share my real email",
  "إخفاء بريدي":"Hide my email",
  "سيتم إخفاء بريدك الحقيقي وإرسال بريد وهمي للتطبيق":"Your real email will be hidden and a relay email will be sent to the app",
  "ستُشارك بريدك الحقيقي مع درايف RENT":"Your real email will be shared with Drive RENT",
  "استخدام حساب آخر":"Use another account",
  "جاري الربط...":"Connecting...",
  "درايف Rent":"Drive Rent",
  "RENT درايف":"Drive RENT",
  "درايف":"Drive",
  "أضف وكالتك":"Add your agency",
  "جديدة":"New",
  "الأفضل":"Best",
  "مميز":"Featured"
});

Object.assign(UI.fr, {
  "فشل التسجيل":"Échec de l’inscription",
  "بيانات الدخول غير صحيحة":"Identifiants incorrects",
  "فشل الإرسال":"Échec de l’envoi",
  "خطأ في قاعدة البيانات":"Erreur de base de données",
  "فشل الحفظ":"Échec de l’enregistrement",
  "فشل التحديث":"Échec de la mise à jour",
  "غير محدد":"Non défini",
  "مستخدم درايف":"Utilisateur Drive",
  "تجربة جيدة مع هذه السيارة.":"Bonne expérience avec cette voiture.",
  "شارع الاستقلال، وسط المدينة، ولاية":"Rue de l’Indépendance, centre-ville, wilaya de",
  "المطار":"Aéroport",
  "وهران":"Oran",
  "قسنطينة":"Constantine"
});
Object.assign(UI.en, {
  "فشل التسجيل":"Registration failed",
  "بيانات الدخول غير صحيحة":"Incorrect login details",
  "فشل الإرسال":"Sending failed",
  "خطأ في قاعدة البيانات":"Database error",
  "فشل الحفظ":"Save failed",
  "فشل التحديث":"Update failed",
  "غير محدد":"Not specified",
  "مستخدم درايف":"Drive user",
  "تجربة جيدة مع هذه السيارة.":"Good experience with this car.",
  "شارع الاستقلال، وسط المدينة، ولاية":"Independence Street, city center, wilaya of",
  "المطار":"Airport",
  "وهران":"Oran",
  "قسنطينة":"Constantine"
});



Object.assign(UI.fr, {
  "أكثر": "Plus",
  "الوكالات المميزة": "Agences vedettes",
  "وكالات موثقة بأعلى التقييمات": "Agences vérifiées les mieux notées",
  "سيارات الزفاف": "Voitures de mariage",
  "سيارات الMariage": "Voitures de mariage",
  "فلاتر": "Filtres",
  "الفلاتر": "Filtres",
  "نوع السيارة": "Type de voiture",
  "السعر": "Prix",
  "السعر اليومي": "Prix par jour",
  "الوقود": "Carburant",
  "ناقل الحركة": "Transmission",
  "موثقة فقط": "Vérifiées seulement",
  "تطبيق الفلاتر": "Appliquer les filtres",
  "مسح الفلاتر": "Réinitialiser les filtres",
  "الإجمالي": "Total",
  "يوم": "jour",
  "أيام": "jours",
  "اليوم": "jour",
  "الإجمالي ": "Total ",
  "دج / اليوم": "DA / jour",
  "دج/يوم": "DA/jour",
  "حساب": "Compte",
  "معلومات الحساب": "Informations du compte",
  "إعدادات الإشعارات": "Paramètres de notifications",
  "علبة السرعات المفضلة": "Transmission préférée",
  "السيارات المحفوظة": "Voitures enregistrées",
  "قائمتك فارغة": "Votre liste est vide",
  "اضغط على أيقونة القلب في أي سيارة لإضافتها هنا": "Appuyez sur le cœur d’une voiture pour l’ajouter ici",
  "طلبات ورحلات مسجّلة": "demandes et trajets enregistrés",
  "لا توجد رحلات في هذا القسم": "Aucun trajet dans cette section",
  "رقم الطلب:": "N° de demande :",
  "أضف وكالتك": "Ajouter votre agence",
  "الخطوة": "Étape",
  "من": "sur",
  "العودة للرئيسية": "Retour à l’accueil",
  "الإيميل الخاص به": "Son e-mail",
  "رقم الهاتف الخاص به": "Son numéro de téléphone",
  "راجع البيانات ثم أرسل الطلب. سيتواصل فريق درايف Rent معك هاتفياً لتأكيد معلومات الوكالة.": "Vérifiez les informations puis envoyez la demande. L’équipe Drive Rent vous appellera pour confirmer l’agence.",
  "أؤكد أن المعلومات صحيحة وأوافق على": "Je confirme que les informations sont correctes et j’accepte",
  "شروط الاستخدام وسياسة الخصوصية": "les conditions d’utilisation et la politique de confidentialité",
  "الخاصة بدرايف Rent.": "de Drive Rent.",
  "رجوع": "Retour",
  "المفضلة": "Favoris",
  "رحلاتي": "Mes trajets",
  "رسائل": "Messages",
  "أكثر": "Plus"
});
Object.assign(UI.en, {
  "أكثر": "More",
  "الوكالات المميزة": "Featured agencies",
  "وكالات موثقة بأعلى التقييمات": "Verified top-rated agencies",
  "سيارات الزفاف": "Wedding cars",
  "سيارات الMariage": "Wedding cars",
  "فلاتر": "Filters",
  "الفلاتر": "Filters",
  "نوع السيارة": "Car type",
  "السعر": "Price",
  "السعر اليومي": "Daily price",
  "الوقود": "Fuel",
  "ناقل الحركة": "Transmission",
  "موثقة فقط": "Verified only",
  "تطبيق الفلاتر": "Apply filters",
  "مسح الفلاتر": "Reset filters",
  "الإجمالي": "Total",
  "يوم": "day",
  "أيام": "days",
  "اليوم": "day",
  "الإجمالي ": "Total ",
  "دج / اليوم": "DZD / day",
  "دج/يوم": "DZD/day",
  "حساب": "Account",
  "معلومات الحساب": "Account info",
  "إعدادات الإشعارات": "Notification settings",
  "علبة السرعات المفضلة": "Preferred transmission",
  "السيارات المحفوظة": "Saved cars",
  "قائمتك فارغة": "Your list is empty",
  "اضغط على أيقونة القلب في أي سيارة لإضافتها هنا": "Tap the heart on any car to add it here",
  "طلبات ورحلات مسجّلة": "requests and trips",
  "لا توجد رحلات في هذا القسم": "No trips in this section",
  "رقم الطلب:": "Request ID:",
  "أضف وكالتك": "Add your agency",
  "الخطوة": "Step",
  "من": "of",
  "العودة للرئيسية": "Back to home",
  "الإيميل الخاص به": "His e-mail",
  "رقم الهاتف الخاص به": "His phone number",
  "راجع البيانات ثم أرسل الطلب. سيتواصل فريق درايف Rent معك هاتفياً لتأكيد معلومات الوكالة.": "Review the information and send the request. The Drive Rent team will call you to confirm the agency details.",
  "أؤكد أن المعلومات صحيحة وأوافق على": "I confirm the information is correct and I accept",
  "شروط الاستخدام وسياسة الخصوصية": "the terms of use and privacy policy",
  "الخاصة بدرايف Rent.": "of Drive Rent.",
  "رجوع": "Back",
  "المفضلة": "Favorites",
  "رحلاتي": "My trips",
  "رسائل": "Messages",
  "أكثر": "More"
});


Object.assign(UI.fr, {
  "تم إرسال طلبك": "Votre demande a été envoyée",
  "ستتلقى اتصالاً هاتفياً من قبل فريقنا خلال 24 ساعة القادمة على الرقم:": "Vous recevrez un appel de notre équipe dans les prochaines 24 heures au numéro :",
  "بيانات الوكالة الأساسية": "Informations principales de l’agence",
  "ابدأ باسم الوكالة والممثل الرسمي والولاية": "Commencez par le nom de l’agence, le représentant officiel et la wilaya",
  "الاسم الحقيقي الكامل": "Nom complet réel",
  "اختر الولاية": "Choisissez la wilaya",
  "بيانات الدخول": "Identifiants de connexion",
  "ستستعملها لاحقاً للدخول إلى منصة الوكالة": "Vous les utiliserez plus tard pour accéder à la plateforme de l’agence",
  "الاسم الحقيقي الكامل *": "Nom complet réel *",
  "اسم الوكالة *": "Nom de l’agence *",
  "الولاية *": "Wilaya *",
  "اسم المستخدم *": "Nom d’utilisateur *",
  "كلمة السر *": "Mot de passe *",
  "الإيميل الخاص به *": "Son e-mail *",
  "رقم الهاتف الخاص به *": "Son numéro de téléphone *",
  "رقم الهاتف": "Numéro de téléphone",
  "اختر الولاية": "Choisissez la wilaya",
  "إرسال الطلب": "Envoyer la demande",
  "التالي": "Suivant",
  "رجوع": "Retour",
  "العودة للرئيسية": "Retour à l’accueil",
  "أؤكد أن المعلومات صحيحة وأوافق على": "Je confirme que les informations sont correctes et j’accepte",
  "شروط الاستخدام وسياسة الخصوصية": "les conditions d’utilisation et la politique de confidentialité",
  "الخاصة بدرايف Rent.": "de Drive Rent.",
  "كلمة السر يجب أن تكون 6 أحرف على الأقل": "Le mot de passe doit contenir au moins 6 caractères",
  "أضف\nوكالتك": "Ajouter\nvotre agence",
  "أضف وكالتك": "Ajouter votre agence"
});
Object.assign(UI.en, {
  "تم إرسال طلبك": "Your request has been sent",
  "ستتلقى اتصالاً هاتفياً من قبل فريقنا خلال 24 ساعة القادمة على الرقم:": "You will receive a phone call from our team within the next 24 hours at:",
  "بيانات الوكالة الأساسية": "Main agency information",
  "ابدأ باسم الوكالة والممثل الرسمي والولاية": "Start with the agency name, official representative, and wilaya",
  "الاسم الحقيقي الكامل": "Real full name",
  "اختر الولاية": "Choose wilaya",
  "بيانات الدخول": "Login details",
  "ستستعملها لاحقاً للدخول إلى منصة الوكالة": "You will use them later to access the agency platform",
  "الاسم الحقيقي الكامل *": "Real full name *",
  "اسم الوكالة *": "Agency name *",
  "الولاية *": "Wilaya *",
  "اسم المستخدم *": "Username *",
  "كلمة السر *": "Password *",
  "الإيميل الخاص به *": "His e-mail *",
  "رقم الهاتف الخاص به *": "His phone number *",
  "رقم الهاتف": "Phone number",
  "إرسال الطلب": "Submit request",
  "التالي": "Next",
  "رجوع": "Back",
  "العودة للرئيسية": "Back to home",
  "أؤكد أن المعلومات صحيحة وأوافق على": "I confirm the information is correct and I accept",
  "شروط الاستخدام وسياسة الخصوصية": "the terms of use and privacy policy",
  "الخاصة بدرايف Rent.": "of Drive Rent.",
  "كلمة السر يجب أن تكون 6 أحرف على الأقل": "Password must be at least 6 characters",
  "أضف\nوكالتك": "Add\nyour agency",
  "أضف وكالتك": "Add your agency"
});

// Tamazight option currently uses Arabic copy until a full native translation is added.
UI.tz = UI.ar || {};
WILAYAS.tz = WILAYAS.ar || {};

const PLACEHOLDERS = {
  fr: {
    "ابحث: سيارة، ولاية، نوع...":"Rechercher : voiture, wilaya, type...",
    "ابحث عن ولايتك...":"Rechercher votre wilaya...",
    "مثال: محمد أمين":"Exemple : Mohamed Amine",
    "اكتب تعليقك على السيارة...":"Écrivez votre commentaire sur la voiture...",
    "اكتب رسالة سريعة...":"Écrivez un message rapide...",
    "مثال: وكالة الجزائر بريميوم":"Exemple : Agence Alger Premium",
    "example@email.com":"example@email.com",
  },
  en: {
    "ابحث: سيارة، ولاية، نوع...":"Search: car, wilaya, type...",
    "ابحث عن ولايتك...":"Search your wilaya...",
    "مثال: محمد أمين":"Example: Mohamed Amine",
    "اكتب تعليقك على السيارة...":"Write your review of the car...",
    "اكتب رسالة سريعة...":"Write a quick message...",
    "مثال: وكالة الجزائر بريميوم":"Example: Algiers Premium Agency",
    "example@email.com":"example@email.com",
  }
};

function normalizeText(s) {
  return String(s || "").replace(/\s+/g, " ").trim();
}

function translateExact(text, lang) {
  if (lang === "ar") return text;
  const normalized = normalizeText(text);
  const dict = UI[lang] || {};
  const wilayas = WILAYAS[lang] || {};
  if (dict[normalized]) return preserveSpace(text, dict[normalized]);
  if (wilayas[normalized]) return preserveSpace(text, wilayas[normalized]);
  return null;
}

function preserveSpace(src, translated) {
  const lead = String(src).match(/^\s*/)?.[0] || "";
  const tail = String(src).match(/\s*$/)?.[0] || "";
  return `${lead}${translated}${tail}`;
}

export function tText(text, lang) {
  if (!text || lang === "ar") return text;
  const exact = translateExact(text, lang);
  if (exact != null) return exact;
  let out = String(text);
  const dict = { ...(UI[lang] || {}), ...(WILAYAS[lang] || {}) };
  Object.keys(dict).filter((ar) => ar && ar.length >= 3).sort((a,b)=>b.length-a.length).forEach((ar) => {
    if (out.includes(ar)) out = out.split(ar).join(dict[ar]);
  });
  if (lang === "fr") {
    out = out
      .replace(/([\d\s.,]+)\s*دج/g, "$1 DA")
      .replace(/دج\s*\/\s*يوم/g, "DA/jour")
      .replace(/الإجمالي/g, "Total")
      .replace(/اليوم/g, "jour")
      .replace(/([0-9]+)\s*يوم/g, "$1 jour")
      .replace(/(\d+)\s*مقاعد/g, "$1 places")
      .replace(/(\d+)\s*سيارة/g, "$1 voitures")
      .replace(/(\d+)\s*رحلة/g, "$1 trajets")
      .replace(/(\d+)\s*ألف كم/g, "$1 k km")
      .replace(/سيارات في\s+(.+)/, "Voitures à $1")
      .replace(/شارع الاستقلال، وسط المدينة، ولاية\s+(.+)/, "Rue de l’Indépendance, centre-ville, wilaya de $1")
      .replace(/مرحبا، أريد حجز\s+(.+)\s+من\s+(.+)\./, "Bonjour, je souhaite réserver $1 chez $2.")
      .replace(/تاريخ الاستلام:/g, "Date de départ :")
      .replace(/تاريخ الإرجاع:/g, "Date de retour :")
      .replace(/الاسم:/g, "Nom :")
      .replace(/الهاتف:/g, "Téléphone :");
  } else if (lang === "en") {
    out = out
      .replace(/([\d\s.,]+)\s*دج/g, "$1 DZD")
      .replace(/دج\s*\/\s*يوم/g, "DZD/day")
      .replace(/الإجمالي/g, "Total")
      .replace(/اليوم/g, "day")
      .replace(/([0-9]+)\s*يوم/g, "$1 day")
      .replace(/(\d+)\s*مقاعد/g, "$1 seats")
      .replace(/(\d+)\s*سيارة/g, "$1 cars")
      .replace(/(\d+)\s*رحلة/g, "$1 trips")
      .replace(/(\d+)\s*ألف كم/g, "$1 k km")
      .replace(/سيارات في\s+(.+)/, "Cars in $1")
      .replace(/شارع الاستقلال، وسط المدينة، ولاية\s+(.+)/, "Independence Street, city center, wilaya of $1")
      .replace(/مرحبا، أريد حجز\s+(.+)\s+من\s+(.+)\./, "Hello, I would like to book $1 from $2.")
      .replace(/تاريخ الاستلام:/g, "Pickup date:")
      .replace(/تاريخ الإرجاع:/g, "Return date:")
      .replace(/الاسم:/g, "Name:")
      .replace(/الهاتف:/g, "Phone:");
  }
  return out;
}

const SKIP_TAGS = new Set(["SCRIPT", "STYLE", "NOSCRIPT", "SVG", "PATH"]);

function shouldSkip(node) {
  const el = node.nodeType === Node.ELEMENT_NODE ? node : node.parentElement;
  if (!el) return true;
  if (SKIP_TAGS.has(el.tagName)) return true;
  if (el.closest?.("script,style,noscript,svg")) return true;
  if (el.closest?.('[data-no-i18n="true"]')) return true;
  return false;
}

function translateTextNode(node, lang) {
  if (!node.nodeValue) return;
  if (shouldSkip(node)) return;
  if (!node.__driverentOriginalText && !/[\u0600-\u06FF]/.test(node.nodeValue)) return;
  const original = node.__driverentOriginalText || node.nodeValue;
  node.__driverentOriginalText = original;
  const translated = tText(original, lang);
  if (translated !== node.nodeValue) node.nodeValue = translated;
}

function translateAttrs(el, lang) {
  if (!(el instanceof Element) || shouldSkip(el)) return;
  ["placeholder", "aria-label", "title", "alt"].forEach((attr) => {
    if (!el.hasAttribute(attr)) return;
    const marker = `data-driverent-original-${attr}`;
    const current = el.getAttribute(attr) || "";
    if (!current) return;
    const original = el.getAttribute(marker) || current;
    if (/[\u0600-\u06FF]/.test(original)) el.setAttribute(marker, original);
    const pmap = PLACEHOLDERS[lang] || {};
    const translated = lang === "ar" ? original : (pmap[original] || tText(original, lang));
    if (translated && translated !== current) el.setAttribute(attr, translated);
  });
}

function walk(root, lang) {
  if (!root) return;
  if (root.nodeType === Node.TEXT_NODE) {
    translateTextNode(root, lang);
    return;
  }
  if (root.nodeType !== Node.ELEMENT_NODE && root.nodeType !== Node.DOCUMENT_NODE) return;
  if (root.nodeType === Node.ELEMENT_NODE) translateAttrs(root, lang);
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT);
  let node;
  while ((node = walker.nextNode())) {
    if (node.nodeType === Node.TEXT_NODE) translateTextNode(node, lang);
    else if (node.nodeType === Node.ELEMENT_NODE) translateAttrs(node, lang);
  }
}

export function applyI18nDom(lang) {
  if (typeof document === "undefined") return;
  document.documentElement.lang = lang || "ar";
  const dir = lang === "ar" ? "rtl" : "ltr";
  document.documentElement.dir = dir;
  document.body?.setAttribute("dir", dir);
  document.body?.setAttribute("data-lang", lang || "ar");
  document.getElementById("root")?.setAttribute("dir", dir);
  walk(document.body, lang);
}

export function useI18nDom(lang, deps = []) {
  useEffect(() => {
    const run = () => applyI18nDom(lang);
    const id = requestAnimationFrame(run);
    const observer = new MutationObserver(() => requestAnimationFrame(run));
    observer.observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ["placeholder", "aria-label", "title", "alt"] });
    return () => {
      cancelAnimationFrame(id);
      observer.disconnect();
    };
  }, [lang, ...deps]);
}
