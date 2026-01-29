import { renderers } from './renderers.mjs';
import { s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_CvSoi7hX.mjs';
import { manifest } from './manifest_x0jai_Qp.mjs';
import { createExports } from '@astrojs/netlify/ssr-function.js';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/api/comments.astro.mjs');
const _page2 = () => import('./pages/armada/_slug_.astro.mjs');
const _page3 = () => import('./pages/armada.astro.mjs');
const _page4 = () => import('./pages/blog/kategori/_category_.astro.mjs');
const _page5 = () => import('./pages/blog/tag/_tag_.astro.mjs');
const _page6 = () => import('./pages/blog/_slug_.astro.mjs');
const _page7 = () => import('./pages/blog.astro.mjs');
const _page8 = () => import('./pages/faq.astro.mjs');
const _page9 = () => import('./pages/harga.astro.mjs');
const _page10 = () => import('./pages/kontak.astro.mjs');
const _page11 = () => import('./pages/layanan/_slug_.astro.mjs');
const _page12 = () => import('./pages/privacy.astro.mjs');
const _page13 = () => import('./pages/syarat-ketentuan.astro.mjs');
const _page14 = () => import('./pages/tentang.astro.mjs');
const _page15 = () => import('./pages/terms.astro.mjs');
const _page16 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/api/comments.ts", _page1],
    ["src/pages/armada/[slug].astro", _page2],
    ["src/pages/armada/index.astro", _page3],
    ["src/pages/blog/kategori/[category].astro", _page4],
    ["src/pages/blog/tag/[tag].astro", _page5],
    ["src/pages/blog/[slug].astro", _page6],
    ["src/pages/blog/index.astro", _page7],
    ["src/pages/faq.astro", _page8],
    ["src/pages/harga.astro", _page9],
    ["src/pages/kontak.astro", _page10],
    ["src/pages/layanan/[slug].astro", _page11],
    ["src/pages/privacy.astro", _page12],
    ["src/pages/syarat-ketentuan.astro", _page13],
    ["src/pages/tentang.astro", _page14],
    ["src/pages/terms.astro", _page15],
    ["src/pages/index.astro", _page16]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_astro-internal_middleware.mjs')
});
const _args = {
    "middlewareSecret": "a7b66499-fc7f-4aa7-a9b9-0f8261663d73"
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };
