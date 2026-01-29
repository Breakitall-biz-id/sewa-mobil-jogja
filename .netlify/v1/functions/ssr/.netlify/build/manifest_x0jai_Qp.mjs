import '@astrojs/internal-helpers/path';
import '@astrojs/internal-helpers/remote';
import 'piccolore';
import { v as NOOP_MIDDLEWARE_HEADER, w as decodeKey } from './chunks/astro/server_BEUeLkDn.mjs';
import 'clsx';
import './chunks/shared_9gEenf6c.mjs';
import 'es-module-lexer';
import 'html-escaper';

const NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
  const response = await next();
  response.headers.set(NOOP_MIDDLEWARE_HEADER, "true");
  return response;
};

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/ftiuii/Documents/Projects/breakitall/sewa-mobil-jogja/astro/","cacheDir":"file:///Users/ftiuii/Documents/Projects/breakitall/sewa-mobil-jogja/astro/node_modules/.astro/","outDir":"file:///Users/ftiuii/Documents/Projects/breakitall/sewa-mobil-jogja/astro/dist/","srcDir":"file:///Users/ftiuii/Documents/Projects/breakitall/sewa-mobil-jogja/astro/src/","publicDir":"file:///Users/ftiuii/Documents/Projects/breakitall/sewa-mobil-jogja/astro/public/","buildClientDir":"file:///Users/ftiuii/Documents/Projects/breakitall/sewa-mobil-jogja/astro/dist/","buildServerDir":"file:///Users/ftiuii/Documents/Projects/breakitall/sewa-mobil-jogja/astro/.netlify/build/","adapterName":"@astrojs/netlify","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"armada/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/armada","isIndex":true,"type":"page","pattern":"^\\/armada\\/?$","segments":[[{"content":"armada","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/armada/index.astro","pathname":"/armada","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"blog/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/blog","isIndex":true,"type":"page","pattern":"^\\/blog\\/?$","segments":[[{"content":"blog","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/blog/index.astro","pathname":"/blog","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"faq/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/faq","isIndex":false,"type":"page","pattern":"^\\/faq\\/?$","segments":[[{"content":"faq","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/faq.astro","pathname":"/faq","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"harga/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/harga","isIndex":false,"type":"page","pattern":"^\\/harga\\/?$","segments":[[{"content":"harga","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/harga.astro","pathname":"/harga","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"kontak/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/kontak","isIndex":false,"type":"page","pattern":"^\\/kontak\\/?$","segments":[[{"content":"kontak","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/kontak.astro","pathname":"/kontak","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"privacy/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/privacy","isIndex":false,"type":"page","pattern":"^\\/privacy\\/?$","segments":[[{"content":"privacy","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/privacy.astro","pathname":"/privacy","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"syarat-ketentuan/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/syarat-ketentuan","isIndex":false,"type":"page","pattern":"^\\/syarat-ketentuan\\/?$","segments":[[{"content":"syarat-ketentuan","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/syarat-ketentuan.astro","pathname":"/syarat-ketentuan","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"tentang/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/tentang","isIndex":false,"type":"page","pattern":"^\\/tentang\\/?$","segments":[[{"content":"tentang","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/tentang.astro","pathname":"/tentang","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"terms/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/terms","isIndex":false,"type":"page","pattern":"^\\/terms\\/?$","segments":[[{"content":"terms","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/terms.astro","pathname":"/terms","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/comments","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/comments\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"comments","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/comments.ts","pathname":"/api/comments","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"site":"https://sewamobiljogjaku.id","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/ftiuii/Documents/Projects/breakitall/sewa-mobil-jogja/astro/src/pages/blog/[slug].astro",{"propagation":"none","containsHead":true}],["/Users/ftiuii/Documents/Projects/breakitall/sewa-mobil-jogja/astro/src/pages/armada/[slug].astro",{"propagation":"none","containsHead":true}],["/Users/ftiuii/Documents/Projects/breakitall/sewa-mobil-jogja/astro/src/pages/armada/index.astro",{"propagation":"none","containsHead":true}],["/Users/ftiuii/Documents/Projects/breakitall/sewa-mobil-jogja/astro/src/pages/blog/index.astro",{"propagation":"none","containsHead":true}],["/Users/ftiuii/Documents/Projects/breakitall/sewa-mobil-jogja/astro/src/pages/blog/kategori/[category].astro",{"propagation":"none","containsHead":true}],["/Users/ftiuii/Documents/Projects/breakitall/sewa-mobil-jogja/astro/src/pages/blog/tag/[tag].astro",{"propagation":"none","containsHead":true}],["/Users/ftiuii/Documents/Projects/breakitall/sewa-mobil-jogja/astro/src/pages/faq.astro",{"propagation":"none","containsHead":true}],["/Users/ftiuii/Documents/Projects/breakitall/sewa-mobil-jogja/astro/src/pages/harga.astro",{"propagation":"none","containsHead":true}],["/Users/ftiuii/Documents/Projects/breakitall/sewa-mobil-jogja/astro/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/Users/ftiuii/Documents/Projects/breakitall/sewa-mobil-jogja/astro/src/pages/kontak.astro",{"propagation":"none","containsHead":true}],["/Users/ftiuii/Documents/Projects/breakitall/sewa-mobil-jogja/astro/src/pages/layanan/[slug].astro",{"propagation":"none","containsHead":true}],["/Users/ftiuii/Documents/Projects/breakitall/sewa-mobil-jogja/astro/src/pages/privacy.astro",{"propagation":"none","containsHead":true}],["/Users/ftiuii/Documents/Projects/breakitall/sewa-mobil-jogja/astro/src/pages/syarat-ketentuan.astro",{"propagation":"none","containsHead":true}],["/Users/ftiuii/Documents/Projects/breakitall/sewa-mobil-jogja/astro/src/pages/tentang.astro",{"propagation":"none","containsHead":true}],["/Users/ftiuii/Documents/Projects/breakitall/sewa-mobil-jogja/astro/src/pages/terms.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000astro-internal:middleware":"_astro-internal_middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/api/comments@_@ts":"pages/api/comments.astro.mjs","\u0000@astro-page:src/pages/armada/[slug]@_@astro":"pages/armada/_slug_.astro.mjs","\u0000@astro-page:src/pages/armada/index@_@astro":"pages/armada.astro.mjs","\u0000@astro-page:src/pages/blog/kategori/[category]@_@astro":"pages/blog/kategori/_category_.astro.mjs","\u0000@astro-page:src/pages/blog/tag/[tag]@_@astro":"pages/blog/tag/_tag_.astro.mjs","\u0000@astro-page:src/pages/blog/[slug]@_@astro":"pages/blog/_slug_.astro.mjs","\u0000@astro-page:src/pages/blog/index@_@astro":"pages/blog.astro.mjs","\u0000@astro-page:src/pages/faq@_@astro":"pages/faq.astro.mjs","\u0000@astro-page:src/pages/harga@_@astro":"pages/harga.astro.mjs","\u0000@astro-page:src/pages/kontak@_@astro":"pages/kontak.astro.mjs","\u0000@astro-page:src/pages/layanan/[slug]@_@astro":"pages/layanan/_slug_.astro.mjs","\u0000@astro-page:src/pages/privacy@_@astro":"pages/privacy.astro.mjs","\u0000@astro-page:src/pages/syarat-ketentuan@_@astro":"pages/syarat-ketentuan.astro.mjs","\u0000@astro-page:src/pages/tentang@_@astro":"pages/tentang.astro.mjs","\u0000@astro-page:src/pages/terms@_@astro":"pages/terms.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_x0jai_Qp.mjs","/Users/ftiuii/Documents/Projects/breakitall/sewa-mobil-jogja/astro/node_modules/unstorage/drivers/netlify-blobs.mjs":"chunks/netlify-blobs_DM36vZAS.mjs","/Users/ftiuii/Documents/Projects/breakitall/sewa-mobil-jogja/astro/src/components/car/GoogleMapPicker.tsx":"_astro/GoogleMapPicker.D77Cz5Kd.js","/Users/ftiuii/Documents/Projects/breakitall/sewa-mobil-jogja/astro/src/components/car/MobileBookingDrawer":"_astro/MobileBookingDrawer.DSsLGr2s.js","/Users/ftiuii/Documents/Projects/breakitall/sewa-mobil-jogja/astro/src/pages/armada/index.astro?astro&type=script&index=0&lang.ts":"_astro/index.astro_astro_type_script_index_0_lang.CrQf41bd.js","/Users/ftiuii/Documents/Projects/breakitall/sewa-mobil-jogja/astro/src/pages/kontak.astro?astro&type=script&index=0&lang.ts":"_astro/kontak.astro_astro_type_script_index_0_lang.Bg0qfZCF.js","/Users/ftiuii/Documents/Projects/breakitall/sewa-mobil-jogja/astro/src/layouts/BaseLayout.astro?astro&type=script&index=0&lang.ts":"_astro/BaseLayout.astro_astro_type_script_index_0_lang.DTtqdM4M.js","/Users/ftiuii/Documents/Projects/breakitall/sewa-mobil-jogja/astro/src/components/Header.astro?astro&type=script&index=0&lang.ts":"_astro/Header.astro_astro_type_script_index_0_lang.BkoFJ0Lt.js","/Users/ftiuii/Documents/Projects/breakitall/sewa-mobil-jogja/astro/src/components/blog/BlogShareSidebar.astro?astro&type=script&index=0&lang.ts":"_astro/BlogShareSidebar.astro_astro_type_script_index_0_lang.CTl_fO0S.js","/Users/ftiuii/Documents/Projects/breakitall/sewa-mobil-jogja/astro/src/components/blog/BlogCommentForm.tsx":"_astro/BlogCommentForm.BMUN4N-6.js","@astrojs/react/client.js":"_astro/client.HnvPyHMC.js","/Users/ftiuii/Documents/Projects/breakitall/sewa-mobil-jogja/astro/src/components/forms/QuickSearchForm":"_astro/QuickSearchForm.BmG38wv-.js","/Users/ftiuii/Documents/Projects/breakitall/sewa-mobil-jogja/astro/node_modules/@sanity/ui/dist/_chunks-es/refractor.mjs":"_astro/refractor.C5FpBwg_.js","/Users/ftiuii/Documents/Projects/breakitall/sewa-mobil-jogja/astro/src/components/car/BookingForm":"_astro/BookingForm.BgbqPWwn.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/Users/ftiuii/Documents/Projects/breakitall/sewa-mobil-jogja/astro/src/pages/armada/index.astro?astro&type=script&index=0&lang.ts","document.addEventListener(\"astro:page-load\",()=>{s()});document.readyState===\"complete\"||document.readyState===\"interactive\"?s():document.addEventListener(\"DOMContentLoaded\",s);function s(){const c=document.querySelectorAll(\"#category-filters button\"),l=document.querySelectorAll(\"#car-grid article\");c.forEach(t=>{t.addEventListener(\"click\",()=>{c.forEach(e=>{e.classList.remove(\"bg-[#1f3b61]\",\"hover:shadow-lg\"),e.classList.add(\"bg-white\",\"border\",\"border-[#e5e7eb]\",\"hover:bg-gray-50\");const o=e.querySelector(\"p\");o&&(o.classList.remove(\"text-white\",\"font-bold\"),o.classList.add(\"text-[#6a7381]\",\"group-hover:text-[#1f3b61]\"))}),t.classList.remove(\"bg-white\",\"border\",\"border-[#e5e7eb]\",\"hover:bg-gray-50\"),t.classList.add(\"bg-[#1f3b61]\",\"hover:shadow-lg\");const a=t.querySelector(\"p\");a&&(a.classList.remove(\"text-[#6a7381]\",\"group-hover:text-[#1f3b61]\"),a.classList.add(\"text-white\",\"font-bold\"));const d=t.getAttribute(\"data-category\");l.forEach(e=>{const o=e.getAttribute(\"data-category\"),r=e;d===\"all\"||o===d?(r.style.display=\"flex\",r.style.opacity=\"0\",setTimeout(()=>r.style.opacity=\"1\",50)):r.style.display=\"none\"})})})}"],["/Users/ftiuii/Documents/Projects/breakitall/sewa-mobil-jogja/astro/src/pages/kontak.astro?astro&type=script&index=0&lang.ts","document.querySelectorAll(\".copy-btn\").forEach(e=>{e.addEventListener(\"click\",()=>{const r=e.dataset.number;r&&(navigator.clipboard.writeText(r.replace(/-/g,\"\")),alert(\"Nomor rekening disalin!\"))})});"],["/Users/ftiuii/Documents/Projects/breakitall/sewa-mobil-jogja/astro/src/components/Header.astro?astro&type=script&index=0&lang.ts","const e=document.getElementById(\"mobile-menu-btn\"),n=document.getElementById(\"mobile-menu\");e?.addEventListener(\"click\",()=>{n?.classList.toggle(\"hidden\")});"],["/Users/ftiuii/Documents/Projects/breakitall/sewa-mobil-jogja/astro/src/components/blog/BlogShareSidebar.astro?astro&type=script&index=0&lang.ts","document.querySelectorAll(\".copy-link-btn\").forEach(t=>{t.addEventListener(\"click\",async()=>{const i=t.getAttribute(\"data-url\");if(i){await navigator.clipboard.writeText(i);const e=t.querySelector(\".material-symbols-outlined\");e&&(e.textContent=\"check\",setTimeout(()=>{e.textContent=\"link\"},2e3))}})});"]],"assets":["/_astro/contact-hero-bg.Df8u_C3C.jpg","/_astro/contact-about.BvLKp3rk.jpg","/_astro/hero-prambanan.CbFJ8eeV.jpg","/_astro/map-yogya.C-D_xqoj.webp","/_astro/_slug_.Cwpt1Zi5.css","/apple-touch-icon.png","/favicon.ico","/favicon.svg","/og-image.png","/robots.txt","/_astro/BaseLayout.astro_astro_type_script_index_0_lang.DTtqdM4M.js","/_astro/BlogCommentForm.BMUN4N-6.js","/_astro/BookingForm.BgbqPWwn.js","/_astro/BookingForm.C504nwwn.js","/_astro/GoogleMapPicker.D77Cz5Kd.js","/_astro/MobileBookingDrawer.DSsLGr2s.js","/_astro/QuickSearchForm.BmG38wv-.js","/_astro/button.D_cK8Gn3.js","/_astro/client.HnvPyHMC.js","/_astro/client.ux76dPWV.js","/_astro/floating-ui.react-dom.BJuQ9FRx.js","/_astro/index.5VBTLnzS.js","/_astro/index.BMnOYKaZ.js","/_astro/index.CjZtzr9I.js","/_astro/index.D7fbw3Si.js","/_astro/popover.BYnQrwGY.js","/_astro/preload-helper.BlTxHScW.js","/_astro/refractor.C5FpBwg_.js","/_astro/renderVisualEditing.DJXEGYDl.js","/_astro/textarea.CmIzzSC0.js","/_astro/tslib.es6.Byhrq50X.js","/images/hero-prambanan.jpg","/images/logo.webp","/armada/index.html","/blog/index.html","/faq/index.html","/harga/index.html","/kontak/index.html","/privacy/index.html","/syarat-ketentuan/index.html","/tentang/index.html","/terms/index.html","/index.html"],"i18n":{"fallbackType":"redirect","strategy":"pathname-prefix-other-locales","locales":["id","en"],"defaultLocale":"id","domainLookupTable":{}},"buildFormat":"directory","checkOrigin":true,"allowedDomains":[],"serverIslandNameMap":[],"key":"f7TRHvN2l08TBhHliGDMh2hvkMyUzglkdxQz+QZOoQo=","sessionConfig":{"driver":"netlify-blobs","options":{"name":"astro-sessions","consistency":"strong"}}});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = () => import('./chunks/netlify-blobs_DM36vZAS.mjs');

export { manifest };
