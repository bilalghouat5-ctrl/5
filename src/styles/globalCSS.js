const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&display=swap');
  *{box-sizing:border-box;margin:0;padding:0;}
  html{width:100%;min-height:100%;-webkit-overflow-scrolling:touch;-webkit-text-size-adjust:100%;text-size-adjust:100%;background:#07080F;}
  body{width:100%;min-height:100%;background:#07080F;font-family:'Cairo',system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;direction:rtl;overflow-x:hidden;-webkit-overflow-scrolling:touch;overscroll-behavior-y:none;}
  html[dir="ltr"] body, body[data-lang="fr"], body[data-lang="en"], body[data-lang="tz"]{direction:ltr;}
  html[dir="ltr"] #root{direction:ltr;}
  html[dir="ltr"] input, html[dir="ltr"] textarea, html[dir="ltr"] select{text-align:left;}
  .compact-text, .compact-text *{font-size:0.88em;}
  .tiny-ui, .tiny-ui *{font-size:0.72em;}
  [data-no-i18n="true"]{unicode-bidi:plaintext;}
  #root{width:100%;min-height:100dvh;background:#07080F;}
  button,input,textarea,select{font-family:'Cairo',system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;}
  input,textarea{font-size:16px;}
  [style*="overflow"]{-webkit-overflow-scrolling:touch;}
  .momentum-scroll{overflow-x:auto;scroll-snap-type:x proximity;-webkit-overflow-scrolling:touch;overscroll-behavior-x:contain;}
  .momentum-scroll > *{scroll-snap-align:start;}
  ::-webkit-scrollbar{width:4px;}
  ::-webkit-scrollbar-thumb{background:#3B3F6B;border-radius:4px;}

  /* ── Animations ── */
  @keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
  @keyframes fadeIn{from{opacity:0}to{opacity:1}}
  @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
  @keyframes glow{0%,100%{opacity:.5}50%{opacity:1}}
  @keyframes shimmer{0%{background-position:-500px 0}100%{background-position:500px 0}}
  @keyframes barFill{from{width:0}to{width:100%}}
  @keyframes heartPop{0%{transform:scale(1)}40%{transform:scale(1.4)}70%{transform:scale(.88)}100%{transform:scale(1)}}
  @keyframes starPop{0%{transform:scale(0) rotate(-20deg);opacity:0}65%{transform:scale(1.3)}100%{transform:scale(1);opacity:1}}
  @keyframes cardIn{from{opacity:0;transform:scale(.94)}to{opacity:1;transform:scale(1)}}
  @keyframes springIn{0%{opacity:0;transform:scale(.82) translateY(18px)}70%{transform:scale(1.03) translateY(-3px)}100%{opacity:1;transform:scale(1) translateY(0)}}
  @keyframes sectionIn{from{opacity:0;transform:translateX(28px)}to{opacity:1;transform:translateX(0)}}
  @keyframes pageSlideIn{from{opacity:0;transform:translateX(-34px) scale(.985)}to{opacity:1;transform:translateX(0) scale(1)}}
  @keyframes badgePop{0%{transform:scale(0)}70%{transform:scale(1.12)}100%{transform:scale(1)}}
  @keyframes sheetUp{from{opacity:.65;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
  @keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}
  @keyframes fadeScale{from{opacity:0;transform:scale(.96)}to{opacity:1;transform:scale(1)}}
  @keyframes authSheetUp{0%{opacity:.7;transform:translateY(100%)}65%{opacity:1;transform:translateY(-10px)}100%{opacity:1;transform:translateY(0)}}
  @keyframes authBackdropIn{from{opacity:0}to{opacity:1}}

  /* ── Base styles ── */
  .skel{background:linear-gradient(90deg,rgba(255,255,255,.04) 25%,rgba(255,255,255,.09) 50%,rgba(255,255,255,.04) 75%);background-size:500px 100%;animation:shimmer 1.5s infinite linear;border-radius:8px;}
  .car-img{transition:transform .5s ease;}
  .hov:hover .car-img{transform:scale(1.07);}
  .hov{transition:transform .25s ease,box-shadow .25s ease;}
  .hov:hover{transform:translateY(-4px);}
  .btn{transition:all .2s ease;}
  .btn:hover{filter:brightness(1.1);transform:scale(1.02);}
  .btn:active{transform:scale(.97);}
  .sug:hover{background:rgba(124,58,237,.18)!important;}
  .btn-press{transition:transform .15s ease,filter .15s ease;}
  .btn-press:active{transform:scale(.94);filter:brightness(.88);}

  /* ── Responsive CSS variables ── */
  :root {
    --app-max-width: 900px;
    --safe-top: max(0px, env(safe-area-inset-top, 0px));
    --standalone-extra-top: 0px;
    --top-nav-total: calc(var(--nav-height, 58px) + var(--standalone-extra-top, 0px));
    --app-padding: 14px;
    --card-img-h: 188px;
    --section-card-w: 200px;
    --section-card-img-h: 100px;
    --nav-height: 58px;
    --bottom-nav-h: 62px;
    --hero-padding: 22px 10px 18px;
    --grid-cols: repeat(auto-fill, minmax(min(260px,44vw), 1fr));
    --font-hero: clamp(22px, 5vw, 38px);
    --font-card-title: 15px;
    --font-card-price: 18px;
    --section-card-font: 13px;
  }

  /* ── Small phones (≤ 360px) ── */
  @media (max-width: 360px) {
    :root {
      --app-padding: 10px;
      --card-img-h: 155px;
      --section-card-w: 165px;
      --section-card-img-h: 88px;
      --font-card-title: 13px;
      --font-card-price: 16px;
      --section-card-font: 11px;
      --hero-padding: 16px 8px 12px;
      --grid-cols: repeat(1, 1fr);
    }
    .nav-label { font-size: 9px !important; }
    .nav-icon-wrap { padding: 3px 5px !important; }
  }

  /* ── Standard phones (361px – 480px) ── */
  @media (min-width: 361px) and (max-width: 480px) {
    :root {
      --app-padding: 12px;
      --card-img-h: 168px;
      --section-card-w: 180px;
      --section-card-img-h: 95px;
      --grid-cols: repeat(1, 1fr);
    }
  }

  /* ── Large phones (481px – 600px) ── */
  @media (min-width: 481px) and (max-width: 600px) {
    :root {
      --grid-cols: repeat(2, 1fr);
      --card-img-h: 175px;
      --section-card-w: 185px;
    }
  }

  /* ── Small tablets (601px – 768px) ── */
  @media (min-width: 601px) and (max-width: 768px) {
    :root {
      --app-padding: 18px;
      --card-img-h: 185px;
      --section-card-w: 205px;
      --section-card-img-h: 108px;
      --grid-cols: repeat(2, 1fr);
      --nav-height: 62px;
      --font-card-title: 16px;
    }
    .nav-label { font-size: 11px !important; }
  }

  /* ── Large tablets (769px – 1024px) ── */
  @media (min-width: 769px) and (max-width: 1024px) {
    :root {
      --app-max-width: 860px;
      --app-padding: 22px;
      --card-img-h: 200px;
      --section-card-w: 220px;
      --section-card-img-h: 115px;
      --grid-cols: repeat(3, 1fr);
      --nav-height: 66px;
      --bottom-nav-h: 72px;
      --font-card-title: 16px;
      --font-card-price: 20px;
      --section-card-font: 14px;
    }
    .nav-label { font-size: 12px !important; }
    .nav-icon-wrap { padding: 5px 16px !important; }
  }

  /* ── Desktop (≥ 1025px) ── */
  @media (min-width: 1025px) {
    :root {
      --app-max-width: 1100px;
      --app-padding: 28px;
      --card-img-h: 215px;
      --section-card-w: 240px;
      --section-card-img-h: 125px;
      --grid-cols: repeat(3, 1fr);
      --nav-height: 68px;
      --bottom-nav-h: 76px;
      --font-card-title: 17px;
      --font-card-price: 21px;
      --section-card-font: 14px;
    }
    .nav-label { font-size: 12px !important; }
    .hov:hover { transform: translateY(-6px); box-shadow: 0 20px 50px rgba(0,0,0,.4); }
  }

  /* ── Touch devices: disable hover effects ── */
  @media (hover: none) {
    .hov:hover { transform: none; }
    .hov:hover .car-img { transform: none; }
    .btn:hover { filter: none; transform: none; }
  }

  @media (display-mode: standalone) {
    html,body,#root{min-height:100dvh;}
    body{background:#07080F;}
    :root{--nav-height:58px;--bottom-nav-h:62px;--standalone-extra-top: max(22px, env(safe-area-inset-top, 0px));}
  }

  /* ── Safe area support (notch phones) ── */
  .bottom-nav {
    padding-bottom: max(10px, env(safe-area-inset-bottom)) !important;
  }
  .top-content {
    padding-top: var(--safe-top, 0px);
  }

  html[dir="ltr"] .bottom-nav, body[data-lang="fr"] .bottom-nav, body[data-lang="en"] .bottom-nav{direction:ltr !important; flex-direction:row !important;}
  html[dir="rtl"] .bottom-nav, body[data-lang="ar"] .bottom-nav{direction:rtl !important; flex-direction:row !important;}
  html[dir="ltr"] .bottom-nav button{direction:ltr !important;}
  html[dir="ltr"] [data-force-ltr="true"]{direction:ltr !important; text-align:left !important;}

  /* ── Utility ── */
  @media (max-width: 360px) {
    .hide-xs { display: none !important; }
  }
`;

export default CSS;
