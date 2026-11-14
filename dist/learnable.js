var LearnAble=(function(R){"use strict";var Rn=Object.defineProperty;var Pn=(R,q,Y)=>q in R?Rn(R,q,{enumerable:!0,configurable:!0,writable:!0,value:Y}):R[q]=Y;var B=(R,q,Y)=>Pn(R,typeof q!="symbol"?q+"":q,Y);let q="",Y="";function Ce(t){t!=null&&t.src&&(q=new URL(".",t.src).href)}function Te(t){t&&(Y=new URL(t,document.baseURI).href,Y.endsWith("/")||(Y+="/"))}function Le(){return Y||q||new URL("/",document.baseURI).href}function Z(t){return!t||t==="false"||/^(https?:|data:|blob:)/i.test(t)?t:t.startsWith("/")?new URL(t,document.baseURI).href:new URL(t,Le()).href}const gt={en:{larger:"Larger text",contrast:"High contrast",stop:"Stop motion",read:"Read this page",stopRead:"Stop reading",language:"Language",images:"Image check",skip:"Skip to content",menu:"Menu"},am:{larger:"ትልቅ ጽሑፍ",contrast:"ከፍተኛ ንጽጽር",stop:"እንቅስቃሴ አቁም",read:"ይህን ገጽ አንብብ",stopRead:"ማንበብ አቁም",language:"ቋንቋ",images:"የምስል ምርመራ",skip:"ወደ ዋናው ይዘት ዝለል",menu:"ምናሌ"}},Wt={white:{label:"White on black",fg:"#ffffff",bg:"#111111"},yellow:{label:"Yellow on black",fg:"#ffee00",bg:"#111111"},black:{label:"Black on white",fg:"#172033",bg:"#f2f0ea"},cyan:{label:"Cyan on black",fg:"#00ffff",bg:"#111111"}},mt="learnable-widget",Ut=()=>({toolbar:!0,signWindow:!0,audioDescription:!0,offlinePack:!1,braille:!1,taggedDocs:!1}),bt=()=>({lang:"en",uiLang:"en",largeText:!1,highContrast:!1,stopMotion:!1,captionScale:1.15,captionPreset:"white"});let Yt=Ut(),z=bt(),Nt="paper",ut=!0;function ot(t){return ut===!1?!1:ut===!0?!0:ut[t]!==!1}function Gt(){try{return window.matchMedia("(prefers-reduced-motion: reduce)").matches}catch{return!1}}function Ot(){const t=bt();t.stopMotion=Gt();try{const n=localStorage.getItem(mt);if(!n)return t;const e=JSON.parse(n),r=e.lang==="am"?"am":e.lang==="en"?"en":t.lang,a=e.uiLang==="am"?"am":e.uiLang==="en"?"en":t.uiLang;return{...t,...e,lang:r,uiLang:a}}catch{return t}}function C(){return{...z}}function dt(){return{...Yt}}function Be(){return Nt}function xt(t){z={...t},localStorage.setItem(mt,JSON.stringify(z)),window.dispatchEvent(new CustomEvent("learnable-settings",{detail:C()}))}function H(t){const n={...C(),...t};return xt(n),C()}function Fe(t={}){Yt={...Ut(),...t.features},t.theme&&(Nt=t.theme),t.enhance!==void 0&&(ut=t.enhance);const n=Ot();z={...n,lang:t.lang??n.lang,uiLang:t.uiLang??n.uiLang},xt(z)}function Ie(){return localStorage.removeItem(mt),z=bt(),z.stopMotion=Gt(),xt(z),C()}function Vt(t,n,e){return t.hasAttribute(n)?t.getAttribute(n)!=="false":e}const Me=["captions-en","captions-am","sign","describe","audio-en","audio-am","offline","braille","docs"];function $e(t,n){for(const r of Me){const a=t.getAttribute(`data-learnable-${r}`);a!==null&&n.setAttribute(r,a)}const e=t.getAttribute("src");e&&!n.getAttribute("src")&&n.setAttribute("src",e)}function Zt(t){if(t.dataset.learnableUpgraded==="true"||t.closest("learnable-player"))return;t.dataset.learnableUpgraded="true";const n=document.createElement("learnable-player");$e(t,n),n.hasAttribute("offline")||n.setAttribute("offline",""),n.hasAttribute("braille")||n.setAttribute("braille",""),n.hasAttribute("docs")||n.setAttribute("docs",""),t.slot="media",t.replaceWith(n),n.append(t)}function De(){ot("media")&&(document.querySelectorAll("video, audio").forEach(t=>{t instanceof HTMLElement&&Zt(t)}),document.querySelectorAll("iframe").forEach(t=>{const n=t.getAttribute("src")||"";/youtube\.com|youtu\.be|player\.vimeo\.com|vimeo\.com/.test(n)&&t instanceof HTMLElement&&Zt(t)}))}function Re(){if(!ot("skip")||document.querySelector("a.learnable-skip, a[href='#content'], a[href='#main']"))return;const t=document.querySelector("main");t&&!t.id&&(t.id="content");const n=document.createElement("a");n.className="learnable-skip",n.href=t!=null&&t.id?`#${t.id}`:"#content",n.textContent=gt[C().uiLang].skip,document.body.prepend(n)}function Pe(){if(!ot("landmarks"))return;const t=document.querySelector(".header");t&&!document.querySelector("header, [role='banner']")&&t.setAttribute("role","banner");const n=document.getElementById("sidebar");n&&!document.querySelector("nav, [role='navigation']")&&(n.setAttribute("role","navigation"),n.getAttribute("aria-label")||n.setAttribute("aria-label","Sidebar"))}function qe(t){return[...document.querySelectorAll(t)].filter(n=>!n.closest("learnable-player, learnable-toolbar"))}function je(t,n,e){const r=t.indexOf(n);if(r<0)return;t[(r+e+t.length)%t.length].focus()}function We(t){const n=t.target;if(!(n instanceof HTMLElement)||n.closest("learnable-player, learnable-toolbar, input, textarea, select"))return;n.classList.contains("hamburger")&&(t.key==="Enter"||t.key===" ")&&(t.preventDefault(),n.click(),n.setAttribute("aria-expanded",document.body.classList.contains("sidebar-collapsed")?"false":"true")),t.key==="Escape"&&(document.querySelectorAll(".collapse.show").forEach(r=>{const a=document.querySelector(`[data-bs-target="#${r.id}"]`);(a==null?void 0:a.getAttribute("aria-expanded"))==="true"&&a.click()}),document.querySelectorAll(".dropdown-menu.show").forEach(r=>{r.classList.remove("show")}));const e=[".homepage-nav .nav-link","button[data-section-index]",".accordion-button",".dropdown-menu.show .dropdown-item"];if(!(t.key!=="ArrowRight"&&t.key!=="ArrowLeft"&&t.key!=="ArrowDown"&&t.key!=="ArrowUp"))for(const r of e){const a=qe(r);if(!a.includes(n))continue;t.preventDefault();const o=t.key==="ArrowRight"||t.key==="ArrowDown"?1:-1;je(a,n,o);break}}function Ue(){ot("keyboard")&&(document.querySelectorAll(".hamburger").forEach(t=>{t.dataset.learnableKey!=="true"&&(t.dataset.learnableKey="true",t.tabIndex=0,t.setAttribute("role","button"),t.setAttribute("aria-label",gt[C().uiLang].menu),t.setAttribute("aria-expanded",String(!document.body.classList.contains("sidebar-collapsed"))))}),document.documentElement.dataset.learnableKeys!=="true"&&(document.documentElement.dataset.learnableKeys="true",document.addEventListener("keydown",We)))}function Ye(){return[...document.querySelectorAll("img")].filter(t=>{var n;return!t.hasAttribute("alt")||t.getAttribute("alt")===((n=t.getAttribute("src"))==null?void 0:n.split("/").pop())})}function vt(){const t=Ye();if(t.length===0)return"Every image on this page has a text alternative.";const n=t.slice(0,8).map(e=>e.currentSrc||e.getAttribute("src")||"image");return`${t.length} image${t.length===1?"":"s"} need a description. Nothing was sent off this page. ${n.join(" ")}`}function Ne(){De(),Re(),Pe(),Ue()}function Ge(){var a,o;const t=C().uiLang,n=[...document.querySelectorAll("[lang='am']")].map(i=>i.innerText.trim()).filter(Boolean).join(" "),e=document.querySelector("main"),r=((e==null?void 0:e.innerText)||document.body.innerText||"").replace(/\s+/g," ").trim().slice(0,1500);return t==="am"&&n?(((o=(a=window.speechSynthesis)==null?void 0:a.getVoices)==null?void 0:o.call(a))??[]).some(l=>l.lang.toLowerCase().startsWith("am"))?{text:n.slice(0,1500),lang:"am",notice:"Reading the Amharic text on this page. Nothing is sent off this device."}:{text:r,lang:"en",notice:"This browser has no Amharic voice. The English text is read instead. Nothing is sent off this device."}:{text:r,lang:"en",notice:"Reading the start of this page. Nothing is sent off this device."}}function Oe(t){var e;return(e=document.querySelector("script[src*='learnable']"))==null?void 0:e.getAttribute("data-learnable-api"),vt()}const yt="learnable-host-adjust";function Ve(){return`
html { scroll-padding-top: 5rem; scroll-padding-bottom: 7rem; }
:focus { scroll-margin-top: 5rem; scroll-margin-bottom: 7rem; }
:focus-visible { outline: 3px solid #0b3d91; outline-offset: 2px; }
.learnable-skip {
  position: absolute; left: 0.5rem; top: 0.5rem; transform: translateY(-150%);
  background: #1b3048; color: #f7f4ee; padding: 0.6rem 1rem; z-index: 2147483001;
}
.learnable-skip:focus { transform: none; }
html[data-learnable-text="large"] { font-size: 112.5%; }
html[data-learnable-contrast="high"] :focus-visible { outline: 3px solid #ffee00; outline-offset: 3px; }
html[data-learnable-contrast="high"] a { text-decoration: underline; }
html[data-learnable-motion="reduce"] *,
html[data-learnable-motion="reduce"] *::before,
html[data-learnable-motion="reduce"] *::after {
  animation-duration: 0.01ms !important;
  animation-iteration-count: 1 !important;
  transition-duration: 0.01ms !important;
  scroll-behavior: auto !important;
}
@font-face {
  font-family: "Atkinson Hyperlegible";
  src: url("${Z("/fonts/atkinson-latin-400.woff2")}") format("woff2");
  font-display: swap;
}
@font-face {
  font-family: Literata;
  src: url("${Z("/fonts/literata-latin-600.woff2")}") format("woff2");
  font-display: swap;
}
@font-face {
  font-family: "Noto Sans Ethiopic";
  src: url("${Z("/fonts/NotoSansEthiopic-Regular.ttf")}") format("truetype");
  font-display: swap;
}
`}function Q(t){const n=document.documentElement;n.dataset.learnableText=t.largeText?"large":"default",n.dataset.learnableContrast=t.highContrast?"high":"default",n.dataset.learnableMotion=t.stopMotion?"reduce":"allow";let e=document.getElementById(yt);e||(e=document.createElement("style"),e.id=yt,document.head.append(e)),e.textContent=Ve()}function Ze(){var n;(n=document.getElementById(yt))==null||n.remove();const t=document.documentElement;delete t.dataset.learnableText,delete t.dataset.learnableContrast,delete t.dataset.learnableMotion}const ze={chat:[{time:.4,speaker:"Facilitator",text:"We are watching together. Captions are on."},{time:5.590000000000001,speaker:"Hana",text:"Please make the Amharic text larger."},{time:12.102,speaker:"Facilitator",text:"Move the sign window if it covers the caption."},{time:22.436,speaker:"Yonas",text:"I will turn on audio description."},{time:29.319,speaker:"Hana",text:"I am saving the small pack before the network drops."},{time:37.161,speaker:"Facilitator",text:"The text page matches what you just heard."}]},He=[{id:"caption-partner",title:"Caption partner",titleAm:"የንዑስ ጽሑፍ አጋር",org:"Bole Open Classroom",place:"Addis Ababa",time:"Part time",access:"The summary is on the card, and the same words can be spoken. This card is a fictional demo.",summary:"Bole Open Classroom is hiring a caption partner in Addis Ababa. The work is part time. You write English and Amharic captions for short lessons. You need a careful ear and a phone that can play audio. This card is a fictional demo for the hackathon, so an employer can hear how a job summary sounds."},{id:"caption-intern",title:"Caption intern",titleAm:"የንዑስ ጽሑፍ ልምምድ",org:"Community radio",place:"Bahir Dar",time:"Sample stipend",access:"Deaf applicants are welcome in this story. Ethiopian Sign Language is used in the newsroom two days a week. Fictional demo.",summary:"Turn recorded Amharic shows into captions. A senior editor checks every file. This card is a fictional demo, so the stipend is not a real offer."},{id:"pdf-maker",title:"Accessible PDF maker",titleAm:"ተደራሽ ፒዲኤፍ አዘጋጅ",org:"Training desk",place:"Remote, sized for 3G",time:"Sample contract",access:"The work can be done from a downloaded pack. Live video meetings are not required. Fictional demo.",summary:"Add image descriptions and tags to training documents that already exist. This card is a fictional demo, so the contract is not a real offer."}],zt={publicKey:{crv:"Ed25519",x:"UXNpzoUhtt_tIteTXTiCYkiF4KBKlRyXYLi4Y3vyQdY",kty:"OKP"},jwt:"eyJhbGciOiJFZERTQSIsInR5cCI6InZjK2p3dCIsImtpZCI6ImxlYXJuYWJsZS1kZW1vIn0.eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvbnMvY3JlZGVudGlhbHMvdjIiLCJodHRwczovL3B1cmwuaW1zZ2xvYmFsLm9yZy9zcGVjL29iL3YzcDAvY29udGV4dC0zLjAuMy5qc29uIl0sInR5cGUiOlsiVmVyaWZpYWJsZUNyZWRlbnRpYWwiLCJPcGVuQmFkZ2VDcmVkZW50aWFsIl0sImlzc3VlciI6eyJpZCI6Imh0dHBzOi8vbGVhcm5hYmxlLmxvY2FsL2lzc3VlciIsInR5cGUiOlsiUHJvZmlsZSJdLCJuYW1lIjoiTGVhcm5BYmxlIGRlbW8ifSwidmFsaWRGcm9tIjoiMjAyNi0xMS0xNVQwMDowMDowMFoiLCJuYW1lIjoiQWNjZXNzaWJsZSBtZWRpYSwgZGVtbyBsZXNzb24iLCJjcmVkZW50aWFsU3ViamVjdCI6eyJ0eXBlIjpbIkFjaGlldmVtZW50U3ViamVjdCJdLCJuYW1lIjoiSGFuYSBCZWtlbGUiLCJpZGVudGlmaWVyIjoiaGFuYS1kZW1vLTIwMjYiLCJhY2hpZXZlbWVudCI6eyJpZCI6Imh0dHBzOi8vbGVhcm5hYmxlLmxvY2FsL2FjaGlldmVtZW50cy9hY2Nlc3NpYmxlLW1lZGlhLWRlbW8iLCJ0eXBlIjpbIkFjaGlldmVtZW50Il0sIm5hbWUiOiJBY2Nlc3NpYmxlIG1lZGlhLCBkZW1vIGxlc3NvbiIsImRlc2NyaXB0aW9uIjoiQ29tcGxldGVkIHRoZSBMZWFybkFibGUgZGVtbyBvbiBjYXB0aW9ucywgc2lnbiwgYXVkaW8gZGVzY3JpcHRpb24sIGFuZCB0aGUgb2ZmbGluZSBwYWNrLiJ9fX0.v-8f4fVY60MgLeFQY6uJv6gwqqBQdcJijKgEjRh_sxwvqfcMjaFOV1V3WDLrETBkIKTr5UeChmFH4OPP-ZAlCw"};function Je(t){const n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",e=t.replace(/-/g,"+").replace(/_/g,"/").replace(/=+$/,""),r=new Uint8Array(Math.floor(e.length*3/4));let a=0,o=0,i=0;for(const s of e){const l=n.indexOf(s);if(l<0)return new Uint8Array;a=a<<6|l,o+=6,o>=8&&(o-=8,r[i]=a>>o&255,i+=1)}return r.subarray(0,i)}async function Ke(t=zt.jwt,n=zt.publicKey){const[e,r,a]=t.split(".");if(!e||!r||!a)return!1;const o=await crypto.subtle.importKey("jwk",n,{name:"Ed25519"},!1,["verify"]),i=new TextEncoder().encode(`${e}.${r}`);return crypto.subtle.verify({name:"Ed25519"},o,Je(a),i)}const Xe=`# Ethiopic-G1
# The Ethiopic Letters and punctuation Braille Table.
#
# Copyright (C) 2012, 2018 Dr. Tamru E. Belay <tamru@sympatico.ca>
# Copyright (C) 2012, 2015 Mesar Hameed <mesar.hameed@gmail.com>
#
# This file is part of liblouis.
#
#  liblouis is free software: you can redistribute it and/or modify it
#  under the terms of the GNU Lesser General Public License as
#  published by the Free Software Foundation, either version 2.1 of the
#  License, or (at your option) any later version.
#
#  liblouis is distributed in the hope that it will be useful, but
#  WITHOUT ANY WARRANTY; without even the implied warranty of
#  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
#  Lesser General Public License for more details.
#
#  You should have received a copy of the GNU Lesser General Public
#  License along with liblouis. If not, see
#  <http://www.gnu.org/licenses/>.

# The Ethiopic Braille Table has developed by:
# Dr. Tamru E. Belay
# Adaptive Technology Center for the Blind/ATCB
# Ethiopic Braille Programmer
# E-mail: <tamru@sympatico.ca <ethiopic.braille@gmail.com
#
# "Ethiopic script has been in use since 100 BC. It is the only indigenous African alphabet still in use today."

# -------------------------

# Latin symbols
include en-chardefs.cti English character definitions
include litdigits6Dots.uti
numsign 3456

# braille patterns
include braille-patterns.cti

# Ethiopic symbols
letter \\x1200 125-26
letter \\x1201 125-136
letter \\x1202 125-24
letter \\x1203 125-1
letter \\x1204 125-15
letter \\x1205 125
letter \\x1206 125-135
letter \\x1207 125-1346
letter \\x1208 123-26
letter \\x1209 123-136
letter \\x120A 123-24
letter \\x120B 123-1
letter \\x120C 123-15
letter \\x120D 123
letter \\x120E 123-135
letter \\x120F 123-1346
letter \\x1210 126-26
letter \\x1211 126-136
letter \\x1212 126-24
letter \\x1213 126-1
letter \\x1214 126-15
letter \\x1215 126
letter \\x1216 126-135
letter \\x1218 134-26
letter \\x1219 134-136
letter \\x121A 134-24
letter \\x121B 134-1
letter \\x121C 134-15
letter \\x121D 134
letter \\x121E 134-135
letter \\x121F 134-1346
letter \\x1220 1456-26
letter \\x1221 1456-136
letter \\x1222 1456-24
letter \\x1223 1456-1
letter \\x1224 1456-15
letter \\x1225 1456
letter \\x1226 1456-135
letter \\x1227 1456-1346
letter \\x1228 1235-26
letter \\x1229 1235-136
letter \\x122A 1235-24
letter \\x122B 1235-1
letter \\x122C 1235-15
letter \\x122D 1235
letter \\x122E 1235-135
letter \\x122F 1235-1346
letter \\x1230 234-26
letter \\x1231 234-136
letter \\x1232 234-24
letter \\x1233 234-1
letter \\x1234 234-15
letter \\x1235 234
letter \\x1236 234-135
letter \\x1237 234-1346
letter \\x1238 146-26
letter \\x1239 146-136
letter \\x123A 146-24
letter \\x123B 146-1
letter \\x123C 146-15
letter \\x123D 146
letter \\x123E 146-135
letter \\x123F 146-1346
letter \\x1240 12345-26
letter \\x1241 12345-136
letter \\x1242 12345-24
letter \\x1243 12345-1
letter \\x1244 12345-15
letter \\x1245 12345
letter \\x1246 12345-135
letter \\x1247 12345-1346
letter \\x1248 12456-26
letter \\x124A 12456-136
letter \\x124B 12345-1346
letter \\x124C 12456-1
letter \\x124D 12456-15
letter \\x124E 12456
letter \\x124F 12456-135
letter \\x1260 12-26
letter \\x1261 12-136
letter \\x1262 12-24
letter \\x1263 12-1
letter \\x1264 12-15
letter \\x1265 12
letter \\x1266 12-135
letter \\x1267 12-1346
letter \\x1268 1236-26
letter \\x1269 1236-136
letter \\x126A 1236-24
letter \\x126B 1236-1
letter \\x126C 1236-15
letter \\x126D 1236
letter \\x126E 1236-135
letter \\x126F 1236-1346
letter \\x1270 2345-26
letter \\x1271 2345-136
letter \\x1272 2345-24
letter \\x1273 2345-1
letter \\x1274 2345-15
letter \\x1275 2345
letter \\x1276 2345-135
letter \\x1277 2345-1346
letter \\x1278 16-26
letter \\x1279 16-136
letter \\x127A 16-24
letter \\x127B 16-1
letter \\x127C 16-15
letter \\x127D 16
letter \\x127E 16-135
letter \\x127F 16-1346
letter \\x1280 156-26
letter \\x1281 156-136
letter \\x1282 156-24
letter \\x1283 156-1
letter \\x1284 156-15
letter \\x1285 156
letter \\x1286 156-135
letter \\x1287 156-1346
letter \\x1290 1345-26
letter \\x1291 1345-136
letter \\x1292 1345-24
letter \\x1293 1345-1
letter \\x1294 1345-15
letter \\x1295 1345
letter \\x1296 1345-135
letter \\x1297 1345-1346
letter \\x1298 346-26
letter \\x1299 346-136
letter \\x129A 346-24
letter \\x129B 346-1
letter \\x129C 346-15
letter \\x129D 346
letter \\x129E 346-135
letter \\x129F 346-1346
letter \\x12A0 12356-26
letter \\x12A1 12356-136
letter \\x12A2 12356-24
letter \\x12A3 12356-1
letter \\x12A4 12356-15
letter \\x12A5 12356
letter \\x12A6 12356-135
letter \\x12A7 5-12356
letter \\x12A8 13-26
letter \\x12A9 13-136
letter \\x12AA 13-24
letter \\x12AB 13-1
letter \\x12Ac 13-15
letter \\x12AD 13
letter \\x12AE 13-135
letter \\x12AF 13-1346
letter \\x12B3 13-1346
letter \\x12B8 236-26
letter \\x12B9 236-136
letter \\x12BA 236-24
letter \\x12BB 236-1
letter \\x12BC 236-15
letter \\x12BD 236
letter \\x12BE 236-135
letter \\x12C8 2456-26
letter \\x12C9 2456-136
letter \\x12CA 2456-24
letter \\x12CB 2456-1
letter \\x12CC 2456-15
letter \\x12CD 2456
letter \\x12CE 2456-135
letter \\x12CF 2456-1346
letter \\x12D0 1256-26
letter \\x12D1 1256-136
letter \\x12D2 1256-24
letter \\x12D3 1256-1
letter \\x12D4 1256-15
letter \\x12D5 1256
letter \\x12D6 1256-135
letter \\x12d7 6-135
letter \\x12D8 1356-26
letter \\x12D9 1356-136
letter \\x12DA 1356-24
letter \\x12DB 1356-1
letter \\x12DC 1356-15
letter \\x12DD 1356
letter \\x12DE 1356-135
letter \\x12DF 1356-1346
letter \\x12E0 356-26
letter \\x12E1 356-136
letter \\x12E2 356-24
letter \\x12E3 356-1
letter \\x12E4 356-15
letter \\x12E5 356
letter \\x12E6 356-135
letter \\x12E7 356-1346
letter \\x12E8 13456-26
letter \\x12E9 13456-136
letter \\x12EA 13456-24
letter \\x12EB 13456-1
letter \\x12EC 13456-15
letter \\x12ED 13456
letter \\x12EE 13456-135
letter \\x12EF 13456-1346
letter \\x12F0 145-26
letter \\x12F1 145-136
letter \\x12F2 145-24
letter \\x12F3 145-1
letter \\x12F4 145-15
letter \\x12F5 145
letter \\x12F6 145-135
letter \\x12F7 145-1346
letter \\x12F8 4-145-26
letter \\x12F9 4-145-136
letter \\x12FA 4-145-24
letter \\x12FB 4-145-1
letter \\x12FC 4-145-15
letter \\x12FD 4-145
letter \\x12FE 4-145-135
letter \\x12FF 4-145-1346
letter \\x1300 245-26
letter \\x1301 245-136
letter \\x1302 245-24
letter \\x1303 245-1
letter \\x1304 245-15
letter \\x1305 245
letter \\x1306 245-135
letter \\x1307 245-1346
letter \\x1308 1245-26
letter \\x1309 1245-136
letter \\x130A 1245-24
letter \\x130B 1245-1
letter \\x130C 1245-15
letter \\x130D 1245
letter \\x130E 1245-135
letter \\x130F 1245-135-2456-26
letter \\x1313 1245-1346
letter \\x1312 1245-2456-24
letter \\x1320 23456-26
letter \\x1321 23456-136
letter \\x1322 23456-24
letter \\x1323 23456-1
letter \\x1324 23456-15
letter \\x1325 23456
letter \\x1326 23456-135
letter \\x1327 23456-1346
letter \\x1328 14-26
letter \\x1329 14-136
letter \\x132A 14-24
letter \\x132B 14-1
letter \\x132C 14-15
letter \\x132D 14
letter \\x132E 14-135
letter \\x132F 14-1346
letter \\x1338 2346-26
letter \\x1339 2346-136
letter \\x133A 2346-24
letter \\x133B 2346-1
letter \\x133C 2346-15
letter \\x133D 2346
letter \\x133E 2346-135
letter \\x133F 2346-1346
letter \\x1340 12346-26
letter \\x1341 12346-136
letter \\x1342 12346-24
letter \\x1343 12346-1
letter \\x1344 12346-15
letter \\x1345 12346
letter \\x1346 12346-135
letter \\x1330 235-26
letter \\x1331 235-136
letter \\x1332 235-24
letter \\x1333 235-1
letter \\x1334 235-15
letter \\x1335 235
letter \\x1336 235-135
letter \\x1337 235-1346
letter \\x1348 124-26
letter \\x1349 124-136
letter \\x134A 124-24
letter \\x134B 124-1
letter \\x134C 124-15
letter \\x134D 124
letter \\x134E 124-135
letter \\x134F 124-1346
letter \\x1350 1234-26
letter \\x1351 1234-136
letter \\x1352 1234-24
letter \\x1353 1234-1
letter \\x1354 1234-15
letter \\x1355 1234
letter \\x1356 1234-135
letter \\x1357 1234-1346

# The Ethiopic punctuation Braille Table
punctuation \\x1361 2
punctuation \\x1362 256
punctuation \\x1363 25
punctuation \\x1364 56
punctuation \\x1367 236
`,_e=` A1B'K2L@CIF/MSP"E3H9O6R^DJG>NTQ,*5<-U8V.%[$+X!&;:4\\0Z7(_?W]#Y)=`,Qe="JABCDEFGHI",tn={".":"4",",":"1","?":"8","!":"6","'":"'","-":"-",":":"3",";":"2"};function en(t){return t<0||t>63?"?":_e[t]??"?"}function nn(t){let n=0;for(const e of t){const r=Number(e);r>=1&&r<=6&&(n|=1<<r-1)}return n}function rn(t){const n=new Map;for(const e of t.split(/\r?\n/)){const r=/^(?:letter|punctuation)\s+\\x([0-9A-Fa-f]+)\s+(\S+)/.exec(e.trim());if(!r)continue;const a=Number.parseInt(r[1],16);n.set(a,r[2].split("-").map(nn))}return n}const an=rn(Xe);function on(t){let n="",e=!1;for(const r of t){const a=r.codePointAt(0)??0,o=an.get(a);if(o){e=!1,n+=o.map(en).join("");continue}if(r===`
`){e=!1,n+=`
`;continue}if(r===" "){e=!1,n+=" ";continue}if(/[0-9]/.test(r)){e||(n+="#",e=!0),n+=Qe[Number(r)];continue}if(e=!1,/[a-z]/.test(r)){n+=r.toUpperCase();continue}if(/[A-Z]/.test(r)){n+=`,${r}`;continue}n+=tn[r]??"?"}return n}function wt(t,n=40){const e=on(t),r=[];for(const a of e.split(`
`)){const o=a.split(" ");let i="";for(const s of o){if(!i){i=s;continue}i.length+1+s.length<=n?i+=` ${s}`:(r.push(i),i=s)}i&&r.push(i)}return`${r.join(`
`)}
`}function sn(t){if(t.metaKey||t.ctrlKey||t.altKey)return null;switch(t.key){case" ":case"k":case"K":return{type:"toggle-play"};case"c":case"C":return{type:"cycle-captions"};case"d":case"D":return{type:"toggle-ad"};case"s":case"S":return{type:"toggle-sign"};case"ArrowLeft":return{type:"seek",by:-5};case"ArrowRight":return{type:"seek",by:5};case"j":case"J":return{type:"seek",by:-10};case"l":case"L":return{type:"seek",by:10};case"ArrowUp":return{type:"volume",by:.1};case"ArrowDown":return{type:"volume",by:-.1};case"m":case"M":return{type:"mute"};case"f":case"F":return{type:"fullscreen"};case"Home":return{type:"seek-to",to:"start"};case"End":return{type:"seek-to",to:"end"};case"?":return{type:"help"};default:return null}}var T=Uint8Array,I=Uint16Array,At=Int32Array,kt=new T([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),St=new T([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),Ht=new T([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),Jt=function(t,n){for(var e=new I(31),r=0;r<31;++r)e[r]=n+=1<<t[r-1];for(var a=new At(e[30]),r=1;r<30;++r)for(var o=e[r];o<e[r+1];++o)a[o]=o-e[r]<<5|r;return{b:e,r:a}},Kt=Jt(kt,2),ln=Kt.b,Et=Kt.r;ln[28]=258,Et[258]=28;for(var cn=Jt(St,0),Xt=cn.r,Ct=new I(32768),v=0;v<32768;++v){var J=(v&43690)>>1|(v&21845)<<1;J=(J&52428)>>2|(J&13107)<<2,J=(J&61680)>>4|(J&3855)<<4,Ct[v]=((J&65280)>>8|(J&255)<<8)>>1}for(var it=(function(t,n,e){for(var r=t.length,a=0,o=new I(n);a<r;++a)t[a]&&++o[t[a]-1];var i=new I(n);for(a=1;a<n;++a)i[a]=i[a-1]+o[a-1]<<1;var s;if(e){s=new I(1<<n);var l=15-n;for(a=0;a<r;++a)if(t[a])for(var d=a<<4|t[a],c=n-t[a],u=i[t[a]-1]++<<c,g=u|(1<<c)-1;u<=g;++u)s[Ct[u]>>l]=d}else for(s=new I(r),a=0;a<r;++a)t[a]&&(s[a]=Ct[i[t[a]-1]++]>>15-t[a]);return s}),X=new T(288),v=0;v<144;++v)X[v]=8;for(var v=144;v<256;++v)X[v]=9;for(var v=256;v<280;++v)X[v]=7;for(var v=280;v<288;++v)X[v]=8;for(var ht=new T(32),v=0;v<32;++v)ht[v]=5;var un=it(X,9,0),dn=it(ht,5,0),_t=function(t){return(t+7)/8|0},Qt=function(t,n,e){return(e==null||e>t.length)&&(e=t.length),new T(t.subarray(n,e))},hn=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],ft=function(t,n,e){var r=new Error(n||hn[t]);if(r.code=t,Error.captureStackTrace&&Error.captureStackTrace(r,ft),!e)throw r;return r},V=function(t,n,e){e<<=n&7;var r=n/8|0;t[r]|=e,t[r+1]|=e>>8},st=function(t,n,e){e<<=n&7;var r=n/8|0;t[r]|=e,t[r+1]|=e>>8,t[r+2]|=e>>16},Tt=function(t,n){for(var e=[],r=0;r<t.length;++r)t[r]&&e.push({s:r,f:t[r]});var a=e.length,o=e.slice();if(!a)return{t:re,l:0};if(a==1){var i=new T(e[0].s+1);return i[e[0].s]=1,{t:i,l:1}}e.sort(function(F,M){return F.f-M.f}),e.push({s:-1,f:25001});var s=e[0],l=e[1],d=0,c=1,u=2;for(e[0]={s:-1,f:s.f+l.f,l:s,r:l};c!=a-1;)s=e[e[d].f<e[u].f?d++:u++],l=e[d!=c&&e[d].f<e[u].f?d++:u++],e[c++]={s:-1,f:s.f+l.f,l:s,r:l};for(var g=o[0].s,r=1;r<a;++r)o[r].s>g&&(g=o[r].s);var b=new I(g+1),h=Lt(e[c-1],b,0);if(h>n){var r=0,p=0,f=h-n,y=1<<f;for(o.sort(function(M,A){return b[A.s]-b[M.s]||M.f-A.f});r<a;++r){var L=o[r].s;if(b[L]>n)p+=y-(1<<h-b[L]),b[L]=n;else break}for(p>>=f;p>0;){var P=o[r].s;b[P]<n?p-=1<<n-b[P]++-1:++r}for(;r>=0&&p;--r){var w=o[r].s;b[w]==n&&(--b[w],++p)}h=n}return{t:new T(b),l:h}},Lt=function(t,n,e){return t.s==-1?Math.max(Lt(t.l,n,e+1),Lt(t.r,n,e+1)):n[t.s]=e},te=function(t){for(var n=t.length;n&&!t[--n];);for(var e=new I(++n),r=0,a=t[0],o=1,i=function(l){e[r++]=l},s=1;s<=n;++s)if(t[s]==a&&s!=n)++o;else{if(!a&&o>2){for(;o>138;o-=138)i(32754);o>2&&(i(o>10?o-11<<5|28690:o-3<<5|12305),o=0)}else if(o>3){for(i(a),--o;o>6;o-=6)i(8304);o>2&&(i(o-3<<5|8208),o=0)}for(;o--;)i(a);o=1,a=t[s]}return{c:e.subarray(0,r),n}},lt=function(t,n){for(var e=0,r=0;r<n.length;++r)e+=t[r]*n[r];return e},ee=function(t,n,e){var r=e.length,a=_t(n+2);t[a]=r&255,t[a+1]=r>>8,t[a+2]=t[a]^255,t[a+3]=t[a+1]^255;for(var o=0;o<r;++o)t[a+o+4]=e[o];return(a+4+r)*8},ne=function(t,n,e,r,a,o,i,s,l,d,c){V(n,c++,e),++a[256];for(var u=Tt(a,15),g=u.t,b=u.l,h=Tt(o,15),p=h.t,f=h.l,y=te(g),L=y.c,P=y.n,w=te(p),F=w.c,M=w.n,A=new I(19),x=0;x<L.length;++x)++A[L[x]&31];for(var x=0;x<F.length;++x)++A[F[x]&31];for(var m=Tt(A,7),$=m.t,et=m.l,D=19;D>4&&!$[Ht[D-1]];--D);var nt=d+5<<3,j=lt(a,X)+lt(o,ht)+i,W=lt(a,g)+lt(o,p)+i+14+3*D+lt(A,$)+2*A[16]+3*A[17]+7*A[18];if(l>=0&&nt<=j&&nt<=W)return ee(n,c,t.subarray(l,l+d));var N,S,U,K;if(V(n,c,1+(W<j)),c+=2,W<j){N=it(g,b,0),S=g,U=it(p,f,0),K=p;var Rt=it($,et,0);V(n,c,P-257),V(n,c+5,M-1),V(n,c+10,D-4),c+=14;for(var x=0;x<D;++x)V(n,c+3*x,$[Ht[x]]);c+=3*D;for(var G=[L,F],ct=0;ct<2;++ct)for(var rt=G[ct],x=0;x<rt.length;++x){var O=rt[x]&31;V(n,c,Rt[O]),c+=$[O],O>15&&(V(n,c,rt[x]>>5&127),c+=rt[x]>>12)}}else N=un,S=X,U=dn,K=ht;for(var x=0;x<s;++x){var E=r[x];if(E>255){var O=E>>18&31;st(n,c,N[O+257]),c+=S[O+257],O>7&&(V(n,c,E>>23&31),c+=kt[O]);var at=E&31;st(n,c,U[at]),c+=K[at],at>3&&(st(n,c,E>>5&8191),c+=St[at])}else st(n,c,N[E]),c+=S[E]}return st(n,c,N[256]),c+S[256]},fn=new At([65540,131080,131088,131104,262176,1048704,1048832,2114560,2117632]),re=new T(0),pn=function(t,n,e,r,a,o){var i=o.z||t.length,s=new T(r+i+5*(1+Math.ceil(i/7e3))+a),l=s.subarray(r,s.length-a),d=o.l,c=(o.r||0)&7;if(n){c&&(l[0]=o.r>>3);for(var u=fn[n-1],g=u>>13,b=u&8191,h=(1<<e)-1,p=o.p||new I(32768),f=o.h||new I(h+1),y=Math.ceil(e/3),L=2*y,P=function(jt){return(t[jt]^t[jt+1]<<y^t[jt+2]<<L)&h},w=new At(25e3),F=new I(288),M=new I(32),A=0,x=0,m=o.i||0,$=0,et=o.w||0,D=0;m+2<i;++m){var nt=P(m),j=m&32767,W=f[nt];if(p[j]=W,f[nt]=j,et<=m){var N=i-m;if((A>7e3||$>24576)&&(N>423||!d)){c=ne(t,l,0,w,F,M,x,$,D,m-D,c),$=A=x=0,D=m;for(var S=0;S<286;++S)F[S]=0;for(var S=0;S<30;++S)M[S]=0}var U=2,K=0,Rt=b,G=j-W&32767;if(N>2&&nt==P(m-G))for(var ct=Math.min(g,N)-1,rt=Math.min(32767,m),O=Math.min(258,N);G<=rt&&--Rt&&j!=W;){if(t[m+U]==t[m+U-G]){for(var E=0;E<O&&t[m+E]==t[m+E-G];++E);if(E>U){if(U=E,K=G,E>ct)break;for(var at=Math.min(G,E-2),Ae=0,S=0;S<at;++S){var Pt=m-G+S&32767,Dn=p[Pt],ke=Pt-Dn&32767;ke>Ae&&(Ae=ke,W=Pt)}}}j=W,W=p[j],G+=j-W&32767}if(K){w[$++]=268435456|Et[U]<<18|Xt[K];var Se=Et[U]&31,Ee=Xt[K]&31;x+=kt[Se]+St[Ee],++F[257+Se],++M[Ee],et=m+U,++A}else w[$++]=t[m],++F[t[m]]}}for(m=Math.max(m,et);m<i;++m)w[$++]=t[m],++F[t[m]];c=ne(t,l,d,w,F,M,x,$,D,m-D,c),d||(o.r=c&7|l[c/8|0]<<3,c-=7,o.h=f,o.p=p,o.i=m,o.w=et)}else{for(var m=o.w||0;m<i+d;m+=65535){var qt=m+65535;qt>=i&&(l[c/8|0]=d,qt=i),c=ee(l,c+1,t.subarray(m,qt))}o.i=i}return Qt(s,0,r+_t(c)+a)},gn=(function(){for(var t=new Int32Array(256),n=0;n<256;++n){for(var e=n,r=9;--r;)e=(e&1&&-306674912)^e>>>1;t[n]=e}return t})(),mn=function(){var t=-1;return{p:function(n){for(var e=t,r=0;r<n.length;++r)e=gn[e&255^n[r]]^e>>>8;t=e},d:function(){return~t}}},bn=function(t,n,e,r,a){if(!a&&(a={l:1},n.dictionary)){var o=n.dictionary.subarray(-32768),i=new T(o.length+t.length);i.set(o),i.set(t,o.length),t=i,a.w=o.length}return pn(t,n.level==null?6:n.level,n.mem==null?a.l?Math.ceil(Math.max(8,Math.min(13,Math.log(t.length)))*1.5):20:12+n.mem,e,r,a)},ae=function(t,n){var e={};for(var r in t)e[r]=t[r];for(var r in n)e[r]=n[r];return e},k=function(t,n,e){for(;e;++n)t[n]=e,e>>>=8};function xn(t,n){return bn(t,n||{},0,0)}var oe=function(t,n,e,r){for(var a in t){var o=t[a],i=n+a,s=r;Array.isArray(o)&&(s=ae(r,o[1]),o=o[0]),ArrayBuffer.isView(o)?e[i]=[o,s]:(e[i+="/"]=[new T(0),s],oe(o,i,e,r))}},ie=typeof TextEncoder<"u"&&new TextEncoder,vn=typeof TextDecoder<"u"&&new TextDecoder,yn=0;try{vn.decode(re,{stream:!0}),yn=1}catch{}function se(t,n){var e;if(ie)return ie.encode(t);for(var r=t.length,a=new T(t.length+(t.length>>1)),o=0,i=function(d){a[o++]=d},e=0;e<r;++e){if(o+5>a.length){var s=new T(o+8+(r-e<<1));s.set(a),a=s}var l=t.charCodeAt(e);l<128||n?i(l):l<2048?(i(192|l>>6),i(128|l&63)):l>55295&&l<57344?(l=65536+(l&1047552)|t.charCodeAt(++e)&1023,i(240|l>>18),i(128|l>>12&63),i(128|l>>6&63),i(128|l&63)):(i(224|l>>12),i(128|l>>6&63),i(128|l&63))}return Qt(a,0,o)}var Bt=function(t){var n=0;if(t)for(var e in t){var r=t[e].length;r>65535&&ft(9),n+=r+4}return n},le=function(t,n,e,r,a,o,i,s){var l=r.length,d=e.extra,c=s&&s.length,u=Bt(d);k(t,n,i!=null?33639248:67324752),n+=4,i!=null&&(t[n++]=20,t[n++]=e.os),t[n]=20,n+=2,t[n++]=e.flag<<1|(o<0&&8),t[n++]=a&&8,t[n++]=e.compression&255,t[n++]=e.compression>>8;var g=new Date(e.mtime==null?Date.now():e.mtime),b=g.getFullYear()-1980;if((b<0||b>119)&&ft(10),k(t,n,b<<25|g.getMonth()+1<<21|g.getDate()<<16|g.getHours()<<11|g.getMinutes()<<5|g.getSeconds()>>1),n+=4,o!=-1&&(k(t,n,e.crc),k(t,n+4,o<0?-o-2:o),k(t,n+8,e.size)),k(t,n+12,l),k(t,n+14,u),n+=16,i!=null&&(k(t,n,c),k(t,n+6,e.attrs),k(t,n+10,i),n+=14),t.set(r,n),n+=l,u)for(var h in d){var p=d[h],f=p.length;k(t,n,+h),k(t,n+2,f),t.set(p,n+4),n+=4+f}return c&&(t.set(s,n),n+=c),n},wn=function(t,n,e,r,a){k(t,n,101010256),k(t,n+8,e),k(t,n+10,e),k(t,n+12,r),k(t,n+16,a)};function An(t,n){n||(n={});var e={},r=[];oe(t,"",e,n);var a=0,o=0;for(var i in e){var s=e[i],l=s[0],d=s[1],c=d.level==0?0:8,u=se(i),g=u.length,b=d.comment,h=b&&se(b),p=h&&h.length,f=Bt(d.extra);g>65535&&ft(11);var y=c?xn(l,d):l,L=y.length,P=mn();P.p(l),r.push(ae(d,{size:l.length,crc:P.d(),c:y,f:u,m:h,u:g!=i.length||h&&b.length!=p,o:a,compression:c})),a+=30+g+f+L,o+=76+2*(g+f)+(p||0)+L}for(var w=new T(o+22),F=a,M=o-a,A=0;A<r.length;++A){var u=r[A];le(w,u.o,u,u.f,u.u,u.c.length);var x=30+u.f.length+Bt(u.extra);w.set(u.c,u.o+x),le(w,a,u,u.f,u.u,u.c.length,u.o,u.m),a+=16+x+(u.m?u.m.length:0)}return wn(w,a,r.length,M,F),w}const kn='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" role="img"><title>A navy phone on a paper background, with an English and Amharic caption under the screen.</title><rect width="640" height="480" fill="#f2f0ea"/><rect x="230" y="40" width="180" height="320" rx="28" fill="#ffffff" stroke="#1b3048" stroke-width="8"/><rect x="254" y="72" width="132" height="210" rx="6" fill="#f2f0ea" stroke="#1b3048" stroke-width="3"/><rect x="120" y="390" width="400" height="36" fill="#111111"/><rect x="140" y="400" width="160" height="8" fill="#ffee00"/></svg>',Sn="A navy phone on a paper background, with an English and Amharic caption under the screen.";function En(t,n,e,r){const a=t.split(`
`).filter(Boolean),o=n.split(`
`).filter(Boolean),i=a.map((s,l)=>`<section><h2>${s}</h2>${o[l]?`<p lang="am">${o[l]}</p>`:""}</section>`).join("");return`<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><title>LearnAble light lesson</title></head><body><main><h1>LearnAble light lesson</h1><p>Sound, text, and this page. The video is not in the pack.</p><figure><img src="lesson-figure.svg" alt="${Sn}"></figure><h2>English</h2>${r?'<audio controls src="lesson-en.wav"></audio>':"<p>The narration file was not on this host.</p>"}<h2 lang="am">አማርኛ</h2>${r?'<audio controls src="lesson-am.wav"></audio>':""}${i}${e?`<h2>Audio description</h2><p>${e}</p>`:""}</main></body></html>`}async function ce(t){if(!t)return null;try{const n=await fetch(t);return n.ok?new Uint8Array(await n.arrayBuffer()):null}catch{return null}}async function Cn(t){const n=await ce(t.audioEn),e=await ce(t.audioAm),r={"index.html":new TextEncoder().encode(En(t.english,t.amharic,t.descriptions||"",!!(n||e))),"lesson-figure.svg":new TextEncoder().encode(kn),"transcript-en.brf":new TextEncoder().encode(wt(t.english)),"transcript-am.brf":new TextEncoder().encode(wt(t.amharic))};return n&&(r["lesson-en.wav"]=n),e&&(r["lesson-am.wav"]=e),{bytes:An(r),audio:!!(n||e)}}function tt(t,n,e){const r=new Blob([Uint8Array.from(t)],{type:e}),a=URL.createObjectURL(r),o=document.createElement("a");o.href=a,o.download=n,document.body.append(o),o.click(),o.remove(),URL.revokeObjectURL(a)}function ue(){return typeof window<"u"&&"speechSynthesis"in window}function Ft(t,n,e=1){if(!ue()||!t.trim())return;window.speechSynthesis.cancel();const r=new SpeechSynthesisUtterance(t);r.lang=n,r.rate=Math.min(2,Math.max(.5,e));const a=n.toLowerCase().slice(0,2),o=window.speechSynthesis.getVoices().find(i=>i.lang.toLowerCase().startsWith(a));o&&(r.voice=o),window.speechSynthesis.speak(r)}function de(){ue()&&window.speechSynthesis.cancel()}function It(t){return t.replace(/[^\t\n\r\x20-\x7E]/g,"?").replace(/\\/g,"\\\\").replace(/\(/g,"\\(").replace(/\)/g,"\\)")}function Tn(t,n){const e=t.split(/\s+/).filter(Boolean),r=[];let a="";for(const o of e)a?a.length+1+o.length<=n?a+=` ${o}`:(r.push(a),a=o):a=o;return a&&r.push(a),r.length>0?r:[""]}function Ln(t){const n=[{tag:"H1",text:t.title},...t.paragraphs.map(h=>({tag:"P",text:h})),{tag:"Figure",text:t.figureAlt}],e=[];let r=740;n.forEach((h,p)=>{if(h.tag==="Figure"){e.push(`/Figure <</MCID ${p}>> BDC`),e.push("0.106 0.188 0.282 RG"),e.push(`56 ${Math.max(72,r-64)} 180 56 re S`),e.push("EMC");return}const f=h.tag==="H1"?18:12,y=f+4,L=Tn(h.text,h.tag==="H1"?58:86);e.push(`/${h.tag} <</MCID ${p}>> BDC`),e.push("BT"),e.push(`/F1 ${f} Tf`),e.push(`1 0 0 1 56 ${r} Tm`),L.forEach((P,w)=>{w>0&&e.push(`0 -${y} Td`),e.push(`(${It(P)}) Tj`)}),e.push("ET"),e.push("EMC"),r-=L.length*y+12});const a=e.join(`
`),o=n.map((h,p)=>`${8+p} 0 R`).join(" "),i=n.map((h,p)=>`${8+p} 0 R`).join(" "),s=8+n.length,l=s+1,d=[],c=h=>{d.push(h)};c("<< /Type /Catalog /Pages 3 0 R /Lang (en) /MarkInfo << /Marked true >> /ViewerPreferences << /DisplayDocTitle true >> /StructTreeRoot 2 0 R >>"),c(`<< /Type /StructTreeRoot /K 7 0 R /ParentTree ${s} 0 R >>`),c("<< /Type /Pages /Count 1 /Kids [4 0 R] >>"),c("<< /Type /Page /Parent 3 0 R /MediaBox [0 0 612 792] /Contents 5 0 R /Resources << /Font << /F1 6 0 R >> >> /StructParents 0 /Tabs /S >>"),c(`<< /Length ${a.length} >>
stream
${a}
endstream`),c("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>"),c(`<< /Type /StructElem /S /Document /P 2 0 R /Lang (en) /K [${o}] >>`),n.forEach((h,p)=>{const f=h.tag==="Figure"?` /Alt (${It(t.figureAlt)})`:"";c(`<< /Type /StructElem /S /${h.tag} /P 7 0 R /Pg 4 0 R${f} /K << /Type /MCR /Pg 4 0 R /MCID ${p} >> >>`)}),c(`<< /Nums [ 0 [${i}] ] >>`),c(`<< /Title (${It(t.title)}) /Author (LearnAble) >>`);let u=`%PDF-1.7
`;const g=[0];d.forEach((h,p)=>{g.push(u.length),u+=`${p+1} 0 obj
${h}
endobj
`});const b=u.length;u+=`xref
0 ${d.length+1}
`,u+=`0000000000 65535 f 
`;for(let h=1;h<g.length;h+=1)u+=`${g[h].toString().padStart(10,"0")} 00000 n 
`;return u+=`trailer
<< /Size ${d.length+1} /Root 1 0 R /Info ${l} 0 R >>
`,u+=`startxref
${b}
%%EOF`,new TextEncoder().encode(u)}function pt(t){(!Number.isFinite(t)||t<0)&&(t=0);const n=Math.floor(t),e=Math.floor(n/60),r=n%60;return`${e}:${r.toString().padStart(2,"0")}`}function he(t){const n=/^(?:(\d+):)?(\d{2}):(\d{2})\.(\d{3})$/.exec(t.trim());if(!n)throw new Error(`Bad WebVTT timestamp: ${t}`);const e=Number(n[1]??0),r=Number(n[2]),a=Number(n[3]),o=Number(n[4]);return e*3600+r*60+a+o/1e3}function Bn(t){var a;const n=t.replace(/^\uFEFF/,"").split(/\r?\n/),e=[];let r=0;if((a=n[0])!=null&&a.startsWith("WEBVTT"))for(r=1;r<n.length&&n[r].trim()!=="";)r+=1;for(;r<n.length;){if(n[r].trim()===""){r+=1;continue}let o=n[r];!o.includes("-->")&&r+1<n.length&&(r+=1,o=n[r]);const i=o.split("-->");if(i.length<2){r+=1;continue}const s=he(i[0]),l=i[1].trim().split(/\s+/)[0],d=he(l);r+=1;const c=[];for(;r<n.length&&n[r].trim()!=="";)c.push(n[r]),r+=1;e.push({start:s,end:d,text:c.join(`
`)})}return e}function fe(t){const n=Math.max(0,Math.round(t*1e3)),e=Math.floor(n/36e5),r=Math.floor(n%36e5/6e4),a=Math.floor(n%6e4/1e3),o=n%1e3;return`${String(e).padStart(2,"0")}:${String(r).padStart(2,"0")}:${String(a).padStart(2,"0")}.${String(o).padStart(3,"0")}`}function Fn(t){return`WEBVTT

${t.map(e=>`${fe(e.start)} --> ${fe(e.end)}
${e.text}`).join(`

`)}
`}function pe(t,n){const e=t.find(a=>n>=a.start&&n<a.end);if(e)return e;const r=t[t.length-1];if(r&&n>=r.start&&n<=r.end+.05)return r}const ge=`
:host {
  --color-paper: #f2f0ea;
  --color-ink: #172033;
  --color-navy: #1b3048;
  --color-navy-ink: #f7f4ee;
  --color-line: #d5d0c6;
  --color-moss: #0e5a42;
  --color-focus: #0b3d91;
  --color-caption: #ffee00;
  --color-stage: #111111;
  --color-muted: #3d4d63;
  --font-text: "Atkinson Hyperlegible", "Noto Sans Ethiopic", sans-serif;
  --font-display: Literata, "Noto Serif Ethiopic", Georgia, serif;
  --bar-height: 0.28rem;
  --focus-width: 3px;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  color: var(--color-ink);
  font-family: var(--font-text);
  font-size: 1rem;
  line-height: 1.45;
  display: block;
}
:host([theme="navy"]) {
  --color-paper: #1b3048;
  --color-ink: #f7f4ee;
}
:host([contrast="high"]) {
  --color-paper: #000;
  --color-ink: #fff;
  --color-navy: #000;
  --color-navy-ink: #fff;
  --color-line: #fff;
  --color-focus: #ffee00;
  --color-caption: #ffee00;
  --color-stage: #000;
  --color-muted: #fff;
}
:host-context(html[data-learnable-contrast="high"]) {
  --color-paper: #000;
  --color-ink: #fff;
  --color-navy: #000;
  --color-navy-ink: #fff;
  --color-line: #fff;
  --color-focus: #ffee00;
  --color-caption: #ffee00;
  --color-stage: #000;
  --color-muted: #fff;
}
* { box-sizing: border-box; }
:focus-visible { outline: var(--focus-width) solid var(--color-focus); outline-offset: 3px; }
button {
  font: inherit;
  min-height: 2.75rem;
  padding: 0.35rem 0.75rem;
  background: var(--color-navy);
  color: var(--color-navy-ink);
  border: 2px solid var(--color-navy);
  box-shadow: inset 0 calc(var(--bar-height) * -1) 0 var(--color-caption);
  cursor: pointer;
}
button[aria-pressed="true"] { background: var(--color-ink); }
.stage { position: relative; background: var(--color-stage); aspect-ratio: 16 / 9; }
video { width: 100%; height: 100%; display: block; background: var(--color-stage); object-fit: contain; }
.caption {
  position: absolute; left: 3%; right: 3%; bottom: 4%;
  margin: 0; padding: 0.35em 0.55em; text-align: center; line-height: 1.35;
}
.row { display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: center; padding: 0.6rem 0; }
.status { color: var(--color-muted); margin: 0.25rem 0; }
.sign { max-width: 100%;
  margin-top: 0.6rem; border: 3px solid var(--color-moss); background: var(--color-paper); color: var(--color-ink);
}
.sign h2 { font-family: var(--font-display); font-size: 1.1rem; margin: 0; padding: 0.5rem 0.75rem; background: var(--color-navy); color: var(--color-navy-ink); cursor: grab; touch-action: none; }
.sign video { width: 100%; max-height: 9rem; background: var(--color-stage); object-fit: contain; }
video[data-fallback][hidden] { display: none; }
.chat { margin: 0.5rem 0; padding-left: 1.2rem; }
.bar .status, .bar .consent { color: inherit; }
.bar select { min-height: 2.75rem; color: var(--color-ink); background: var(--color-paper); }
.sign p { margin: 0.5rem 0.75rem; }
.gloss { font-family: var(--font-display); font-size: 1.6rem; }
.mark { display: block; width: 2.5rem; height: 1.1rem; border: 2px solid var(--color-navy); box-shadow: 0 var(--bar-height) 0 var(--color-caption); margin-bottom: 0.4rem; }
label { display: flex; flex-direction: column; gap: 0.2rem; min-width: 8rem; }
input[type="range"] { width: 100%; min-height: 2.75rem; }
.bar {
  position: fixed; z-index: 2147483000; top: 0.5rem; right: 0.5rem; left: auto; bottom: auto;
  background: var(--color-navy); color: var(--color-navy-ink); padding: 0.6rem;
  display: flex; flex-wrap: wrap; gap: 0.4rem; max-width: min(22rem, calc(100vw - 1rem));
  max-height: 70vh; overflow: auto;
}
.transcript { list-style: none; margin: 0.5rem 0; padding: 0; max-height: 16rem; overflow: auto; }
.transcript button { background: transparent; color: var(--color-ink); border: 0; box-shadow: none; text-align: left; width: 100%; }
.sign .row button { background: var(--color-paper); color: var(--color-ink); border-color: var(--color-navy); box-shadow: none; }
.bar button { background: transparent; color: inherit; border-color: transparent; box-shadow: inset 0 calc(var(--bar-height) * -1) 0 transparent; }
.bar button[aria-pressed="true"] { box-shadow: inset 0 calc(var(--bar-height) * -1) 0 var(--color-caption); background: transparent; }
`;function Mt(t,n,e){const r=new CustomEvent(n,{bubbles:!0,composed:!0,detail:e});t.dispatchEvent(r),window.dispatchEvent(new CustomEvent(n,{detail:e}))}class me extends HTMLElement{constructor(){super();B(this,"root");B(this,"video",null);B(this,"signClip",null);B(this,"en",[]);B(this,"am",[]);B(this,"ad",[]);B(this,"mode","en");B(this,"adOn",!1);B(this,"signOn",!0);B(this,"lastAd","");B(this,"built",!1);B(this,"onSettings",()=>{this.applySettings()});this.root=this.attachShadow({mode:"open"})}connectedCallback(){this.built||this.mount(),this.loadTracks(),this.applySettings(),window.addEventListener("learnable-settings",this.onSettings)}refresh(){this.built=!1,this.mount(),this.loadTracks(),this.applySettings()}disconnectedCallback(){window.removeEventListener("learnable-settings",this.onSettings),de()}mount(){var c,u,g,b,h,p;this.built=!0;const e=dt(),r=Vt(this,"sign",e.signWindow),a=Vt(this,"describe",e.audioDescription),o=this.hasAttribute("offline")||e.offlinePack,i=this.hasAttribute("braille")||e.braille,s=this.hasAttribute("docs")||e.taggedDocs;this.root.innerHTML=`
      <style>${ge}</style>
      <section aria-label="LearnAble lesson">
        <div class="stage" tabindex="0" role="region" aria-label="Lesson picture. Press question mark for keyboard shortcuts.">
          <slot name="media"></slot>
          <video data-fallback playsinline preload="metadata"></video>
          <p class="caption" aria-hidden="true"></p>
        </div>
        <p class="status" aria-live="polite">Paused.</p>
        <div class="row">
          <button type="button" data-act="play">Play</button>
          <button type="button" data-act="captions">Captions: English</button>
          ${a?'<button type="button" data-act="ad" aria-pressed="false">Audio description</button>':""}
          ${r?'<button type="button" data-act="sign" aria-pressed="true">Sign window</button>':""}
          <label>Caption size <input data-act="size" type="range" min="1" max="2.2" step="0.1" value="1.15" /></label>
          <label>Caption colours
            <select data-act="preset">
              <option value="white">White on black</option>
              <option value="yellow">Yellow on black</option>
              <option value="black">Black on white</option>
              <option value="cyan">Cyan on black</option>
            </select>
          </label>
        </div>
        <div class="row extras">
          ${o?'<button type="button" data-act="pack">Download 3G pack</button>':""}
          ${i?'<button type="button" data-act="braille">Download braille</button>':""}
          ${s?'<button type="button" data-act="pdf">Download tagged PDF</button>':""}
          ${s?'<button type="button" data-act="html">Download HTML</button>':""}
          <button type="button" data-act="vtt-en">Download English VTT</button>
          <button type="button" data-act="vtt-am">Download Amharic VTT</button>
        </div>
        <h2>Transcript</h2>
        <ol class="transcript"></ol>
        <h2>Job card</h2>
        <p data-job>${(c=He[0])==null?void 0:c.summary}</p>
        <div class="row">
          <button type="button" data-act="job">Play audio summary</button>
          <button type="button" data-act="badge">Check certificate</button>
        </div>
        <h2>Session chat</h2>
        <ol class="chat">
          ${ze.chat.map(f=>`<li><span>${pt(f.time)}</span> ${f.speaker}: ${f.text}</li>`).join("")}
        </ol>
        ${r?`<div class="sign" data-sign>
                <h2 tabindex="0">Ethiopian Sign Language</h2>
                <div style="padding:0.75rem">
                  <video data-sign-video muted playsinline preload="metadata"></video>
                  <span class="mark" aria-hidden="true"></span>
                  <p class="gloss">OPEN</p>
                  <p>This is not a signer. Point the sign attribute at a recorded clip. The gloss follows the captions. Move and resize with the buttons. S also toggles this window when the picture is selected.</p>
                  <div class="row">
                    <button type="button" data-act="left">Move left</button>
                    <button type="button" data-act="right">Move right</button>
                    <button type="button" data-act="up">Move up</button>
                    <button type="button" data-act="down">Move down</button>
                    <button type="button" data-act="shrink">Smaller</button>
                    <button type="button" data-act="grow">Larger</button>
                  </div>
                </div>
              </div>`:""}
      </section>
    `,this.bindMedia();const l=this.root.querySelector(".sign h2");l==null||l.addEventListener("pointerdown",f=>this.dragSign(f)),l==null||l.addEventListener("keydown",f=>{f.key==="ArrowLeft"&&this.nudge("left"),f.key==="ArrowRight"&&this.nudge("right"),f.key==="ArrowUp"&&this.nudge("up"),f.key==="ArrowDown"&&this.nudge("down")});const d=this.root.querySelector(".stage");d==null||d.addEventListener("keydown",f=>this.onKey(f)),this.root.querySelectorAll("button[data-act]").forEach(f=>{f.addEventListener("click",()=>this.onAction(f.dataset.act||""))}),(u=this.root.querySelector("[data-act=size]"))==null||u.addEventListener("input",f=>{const y=Number(f.target.value);H({captionScale:y}),this.styleCaption(y,C().captionPreset)}),(g=this.root.querySelector("[data-act=preset]"))==null||g.addEventListener("change",f=>{const y=f.target.value;H({captionPreset:y}),this.styleCaption(C().captionScale,y)}),(b=this.video)==null||b.addEventListener("timeupdate",()=>this.sync()),(h=this.video)==null||h.addEventListener("play",()=>{this.setPlayLabel(!0),Mt(this,"learnable-play",{playing:!0})}),(p=this.video)==null||p.addEventListener("pause",()=>{this.setPlayLabel(!1),Mt(this,"learnable-play",{playing:!1})})}bindMedia(){const e=this.querySelector("video, audio"),r=this.root.querySelector("[data-fallback]");if(e instanceof HTMLMediaElement&&e.slot==="media")this.video=e,r&&(r.hidden=!0),e.setAttribute("playsinline","");else if(r){this.video=r;const i=this.getAttribute("src");i&&(r.src=Z(i))}this.signClip=this.root.querySelector("[data-sign-video]");const a=this.getAttribute("sign");this.signClip&&a&&a!=="false"&&(this.signClip.src=Z(a));const o=this.querySelector("iframe");o&&!o.getAttribute("title")&&o.setAttribute("title","Embedded lesson video")}dragSign(e){var g;if(e.button!==0)return;const r=this.root.querySelector("[data-sign]"),a=e.currentTarget;if(!r||!(a instanceof HTMLElement))return;const o=e.clientX,i=e.clientY,s=((g=r.style.transform.match(/-?\d+/g))==null?void 0:g.map(Number))??[0,0],l=s[0]??0,d=s[1]??0,c=b=>{r.style.transform=`translate(${l+b.clientX-o}px, ${d+b.clientY-i}px)`},u=()=>{a.removeEventListener("pointermove",c),a.removeEventListener("pointerup",u)};a.setPointerCapture(e.pointerId),a.addEventListener("pointermove",c),a.addEventListener("pointerup",u)}async loadTracks(){this.en=await this.fetchCues(this.getAttribute("captions-en")),this.am=await this.fetchCues(this.getAttribute("captions-am")),this.ad=await this.fetchCues(this.getAttribute("describe"));const e=this.root.querySelector("[data-sign]");e&&(e.hidden=!this.signOn),this.renderTranscript(),this.sync()}renderTranscript(){const e=this.root.querySelector(".transcript");if(!e)return;const r=this.en.length?this.en:this.am;e.replaceChildren();for(const a of r){const o=document.createElement("li"),i=document.createElement("button");i.type="button",i.dataset.seek=String(a.start),i.textContent=`${pt(a.start)} ${a.text}`,i.addEventListener("click",()=>{this.video&&(this.video.currentTime=a.start)}),o.append(i),e.append(o)}}async fetchCues(e){if(!e||e==="false")return[];try{const r=await fetch(Z(e));return r.ok?Bn(await r.text()):[]}catch{return[]}}applySettings(){const e=C();this.mode=e.lang,e.highContrast?this.setAttribute("contrast","high"):this.removeAttribute("contrast"),this.setAttribute("theme",Be());const r=this.root.querySelector("[data-act=preset]"),a=this.root.querySelector("[data-act=size]");r&&(r.value=e.captionPreset),a&&(a.value=String(e.captionScale)),this.styleCaption(e.captionScale,e.captionPreset),this.sync()}styleCaption(e,r){const a=this.root.querySelector(".caption"),o=Wt[r]??Wt.white;a&&(a.style.color=o.fg,a.style.background=o.bg,a.style.fontSize=`${e}rem`)}setPlayLabel(e){const r=this.root.querySelector("[data-act=play]");r&&(r.textContent=e?"Pause":"Play");const a=this.root.querySelector(".status"),o=(a==null?void 0:a.textContent)||"";a&&this.video&&(o.startsWith("Playing")||o.startsWith("Paused"))&&(a.textContent=`${e?"Playing":"Paused"}. ${pt(this.video.currentTime)} of ${pt(this.video.duration||0)}.`)}sync(){var l;if(!this.video)return;const e=this.video.currentTime,r=this.mode==="am"?this.am:this.mode==="en"?this.en:[],a=this.mode==="off"?void 0:pe(r,e),o=this.root.querySelector(".caption");o&&(o.textContent=(a==null?void 0:a.text)??"",o.setAttribute("lang",this.mode==="am"?"am":"en"));const i=this.root.querySelector(".gloss");if(i&&(i.textContent=a?a.text.split(" ").slice(0,2).join(" "):"OPEN"),(l=this.signClip)!=null&&l.getAttribute("src")&&this.video&&Math.abs(this.signClip.currentTime-e)>.4&&(this.signClip.currentTime=e),this.adOn){const d=pe(this.ad,e);d&&d.text!==this.lastAd&&(this.lastAd=d.text,Ft(d.text,"en"))}const s=this.root.querySelector("[data-act=captions]");s&&(s.textContent=this.mode==="off"?"Captions: off":this.mode==="am"?"Captions: Amharic":"Captions: English"),this.setPlayLabel(!this.video.paused)}onKey(e){const r=sn(e);r&&(e.preventDefault(),r.type==="toggle-play"&&this.toggle(),r.type==="cycle-captions"&&this.cycleCaptions(),r.type==="toggle-ad"&&this.toggleAd(),r.type==="toggle-sign"&&this.toggleSign(),r.type==="seek"&&this.video&&(this.video.currentTime=Math.max(0,this.video.currentTime+r.by)),r.type==="seek-to"&&this.video&&(this.video.currentTime=r.to==="start"?0:this.video.duration||0),r.type==="mute"&&this.video&&(this.video.muted=!this.video.muted),r.type==="volume"&&this.video&&(this.video.volume=Math.min(1,Math.max(0,this.video.volume+r.by))))}async toggle(){var e,r;if(this.video)try{this.video.paused?(await this.video.play(),(e=this.signClip)!=null&&e.getAttribute("src")&&this.signClip.play().catch(()=>{})):(this.video.pause(),(r=this.signClip)==null||r.pause())}catch{this.setStatus("The video did not play. Captions are still listed when the file loads.")}}cycleCaptions(){this.mode=this.mode==="off"?"en":this.mode==="en"?"am":"off",this.sync(),Mt(this,"learnable-captions",{lang:this.mode})}toggleAd(){this.adOn=!this.adOn,this.adOn||de();const e=this.root.querySelector("[data-act=ad]");e&&e.setAttribute("aria-pressed",String(this.adOn))}nudge(e){var s;const r=this.root.querySelector("[data-sign]");if(!r)return;const a=((s=r.style.transform.match(/-?\d+/g))==null?void 0:s.map(Number))??[0,0],o=(a[0]??0)+(e==="left"?-24:e==="right"?24:0),i=(a[1]??0)+(e==="up"?-24:e==="down"?24:0);r.style.transform=`translate(${o}px, ${i}px)`}scaleSign(e){const r=this.root.querySelector("[data-sign]");if(!r)return;const a=Math.min(560,Math.max(180,(r.offsetWidth||280)+e*40));r.style.width=`${a}px`,r.style.maxWidth="100%"}toggleSign(){this.signOn=!this.signOn;const e=this.root.querySelector("[data-sign]");e&&(e.hidden=!this.signOn);const r=this.root.querySelector("[data-act=sign]");r&&r.setAttribute("aria-pressed",String(this.signOn))}setStatus(e){const r=this.root.querySelector(".status");r&&(r.textContent=e)}textOf(e){return e.map(r=>r.text).join(`
`)}async onAction(e){var r;if(e==="play"&&this.toggle(),e==="captions"&&this.cycleCaptions(),e==="ad"&&this.toggleAd(),e==="sign"&&this.toggleSign(),(e==="left"||e==="right"||e==="up"||e==="down")&&this.nudge(e),(e==="shrink"||e==="grow")&&this.scaleSign(e==="grow"?1:-1),e==="pack")try{const a=await Cn({english:this.textOf(this.en),amharic:this.textOf(this.am),descriptions:this.textOf(this.ad),audioEn:this.optionalUrl("audio-en"),audioAm:this.optionalUrl("audio-am")});tt(a.bytes,"learnable-3g-pack.zip","application/zip"),this.setStatus(a.audio?"3G pack downloaded, with narration and text.":"Text pack downloaded. Narration files were not beside the video.")}catch(a){this.setStatus(a instanceof Error?a.message:"The pack could not be built.")}if(e==="braille"){const a=this.mode==="am"?"am":"en",o=a==="am"?this.textOf(this.am):this.textOf(this.en);tt(new TextEncoder().encode(wt(o)),`lesson-${a}.brf`,"text/plain"),this.setStatus("Braille file downloaded.")}if(e==="pdf"){try{const o=await fetch(Z(this.getAttribute("pdf")||"/media/learnable-lesson.pdf"));if(o.ok){tt(new Uint8Array(await o.arrayBuffer()),"learnable-lesson.pdf","application/pdf"),this.setStatus("Tagged PDF downloaded, with Amharic and the picture description.");return}}catch{}const a=Ln({title:"LearnAble lesson",paragraphs:this.en.map(o=>o.text),figureAlt:"Lesson picture with English and Amharic captions."});tt(a,"learnable-lesson.pdf","application/pdf"),this.setStatus("Tagged PDF downloaded. Amharic stays in the captions.")}if(e==="html"){const a=this.en.map(s=>`<h2>${s.text}</h2>`).join(""),o=this.am.map(s=>`<p lang="am">${s.text}</p>`).join(""),i=`<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><title>LearnAble lesson</title></head><body><main><h1>LearnAble lesson</h1><p>Picture: A navy phone on a paper background, with an English and Amharic caption under the screen.</p>${a}${o}</main></body></html>`;tt(new TextEncoder().encode(i),"learnable-lesson.html","text/html"),this.setStatus("HTML text version downloaded, with the picture description.")}if(e==="vtt-en"||e==="vtt-am"){const a=e==="vtt-am"?this.am:this.en;tt(new TextEncoder().encode(Fn(a)),e==="vtt-am"?"captions-am.vtt":"captions-en.vtt","text/vtt"),this.setStatus(e==="vtt-am"?"Amharic captions downloaded.":"English captions downloaded.")}if(e==="job"){const a=((r=this.root.querySelector("[data-job]"))==null?void 0:r.textContent)||"";Ft(a,"en"),this.setStatus("Playing the job summary on this device.")}if(e==="badge"){const a=await Ke();this.setStatus(a?"The certificate proof matches the published public key.":"The certificate proof does not match.")}}optionalUrl(e){const r=this.getAttribute(e);if(!(!r||r==="false"))return Z(r)}}class In extends HTMLElement{constructor(){super();B(this,"root");B(this,"built",!1);this.root=this.attachShadow({mode:"open"})}connectedCallback(){var e,r,a,o,i;this.built||(this.built=!0,this.root.innerHTML=`
      <style>${ge}</style>
      <div class="bar" role="group" aria-label="LearnAble display">
        <button type="button" data-key="largeText" aria-pressed="false">Larger text</button>
        <button type="button" data-key="highContrast" aria-pressed="false">High contrast</button>
        <button type="button" data-key="stopMotion" aria-pressed="false">Stop motion</button>
        <button type="button" data-act="read">Read this page</button>
        <button type="button" data-act="images">Image check</button>
        <label>Caption size <input data-key="captionScale" type="range" min="1" max="2.2" step="0.1" value="1.15" /></label>
        <label>Caption background
          <select data-key="captionPreset">
            <option value="white">White on black</option>
            <option value="yellow">Yellow on black</option>
            <option value="black">Black on white</option>
            <option value="cyan">Cyan on black</option>
          </select>
        </label>
        <label class="lang-pick">Language
          <select data-key="uiLang">
            <option value="en">English</option>
            <option value="am">አማርኛ</option>
          </select>
        </label>
        <p class="status" data-note></p>
        <label class="consent"><input type="checkbox" data-act="consent" /> I agree a description service may see pictures that have no alternative. Nothing is sent until this is checked.</label>
      </div>
    `,this.root.querySelectorAll("button[data-key]").forEach(s=>{s.addEventListener("click",()=>{const l=s.dataset.key,d=C(),c=H({[l]:!d[l]});Q(c),this.reflect()})}),(e=this.root.querySelector("[data-key=captionScale]"))==null||e.addEventListener("input",s=>{const l=H({captionScale:Number(s.target.value)});Q(l)}),(r=this.root.querySelector("[data-key=captionPreset]"))==null||r.addEventListener("change",s=>{const l=H({captionPreset:s.target.value});Q(l)}),(a=this.root.querySelector("[data-key=uiLang]"))==null||a.addEventListener("change",s=>{H({uiLang:s.target.value==="am"?"am":"en"}),this.reflect()}),(o=this.root.querySelector("[data-act=read]"))==null||o.addEventListener("click",()=>{const s=Ge(),l=this.root.querySelector("[data-note]");l&&(l.textContent=s.notice),Ft(s.text,s.lang==="am"?"am-ET":"en")}),(i=this.root.querySelector("[data-act=images]"))==null||i.addEventListener("click",()=>{var d;const s=((d=this.root.querySelector("[data-act=consent]"))==null?void 0:d.checked)===!0,l=this.root.querySelector("[data-note]");l&&(l.textContent=s?Oe():vt())}),this.reflect())}reflect(){const e=C();this.root.querySelectorAll("button[data-key]").forEach(c=>{const u=c.dataset.key;c.setAttribute("aria-pressed",String(e[u]))});const r=gt[e.uiLang];this.root.querySelector("[data-key=largeText]").textContent=r.larger,this.root.querySelector("[data-key=highContrast]").textContent=r.contrast,this.root.querySelector("[data-key=stopMotion]").textContent=r.stop;const a=this.root.querySelector("[data-act=read]"),o=this.root.querySelector("[data-act=images]");a&&(a.textContent=r.read),o&&(o.textContent=r.images);const i=this.root.querySelector("[data-key=captionScale]"),s=this.root.querySelector("[data-key=captionPreset]"),l=this.root.querySelector("[data-key=uiLang]");i&&(i.value=String(e.captionScale)),s&&(s.value=e.captionPreset),l&&(l.value=e.uiLang);const d=document.querySelector(".learnable-skip");d&&(d.textContent=r.skip),e.highContrast?this.setAttribute("contrast","high"):this.removeAttribute("contrast")}}Ce(document.currentScript instanceof HTMLScriptElement?document.currentScript:null);let be=!1,_=null;function xe(){customElements.get("learnable-player")||customElements.define("learnable-player",me),customElements.get("learnable-toolbar")||customElements.define("learnable-toolbar",In)}function Mn(){const t=document.querySelector("script[src*='learnable']"),n=t==null?void 0:t.getAttribute("data-learnable-enhance"),e=document.documentElement.dataset.learnableEnhance,r=t==null?void 0:t.getAttribute("data-learnable-lang");return{enhance:!(e==="off"||n==="false"||n==="off"),lang:r==="am"||r==="en"?r:void 0,assetBase:(t==null?void 0:t.getAttribute("data-learnable-base"))||void 0}}function $n(){var t;if(!ot("toolbar")||!dt().toolbar||document.documentElement.dataset.learnableToolbar==="page"){_==null||_.remove(),_=null;return}document.querySelector("learnable-toolbar")||(_=document.createElement("learnable-toolbar"),_.dataset.auto="true",(t=document.body)==null||t.append(_))}function ve(t={}){const n=Mn(),e=t.enhance!==void 0?t.enhance:n.enhance;Fe({...n,...t,enhance:e}),Te(t.assetBase||n.assetBase),xe(),Q(C()),$n(),e!==!1&&Ne(),document.querySelectorAll("learnable-player").forEach(r=>{r instanceof me&&r.refresh()}),be=!0,window.dispatchEvent(new CustomEvent("learnable-ready",{detail:{settings:C(),features:dt()}}))}function $t(){const t=Ot();H(t),ve()}function ye(t={}){return ve(t),Dt}function we(){const t=Ie();return Ze(),Q(t),t}const Dt={init:ye,boot:$t,reset:we,getSettings:C,setSettings(t){const n=H(t);return Q(n),n},getFeatures:dt,version:"0.3.0"};if(typeof window<"u"){window.LearnAble=Dt,xe();const t=()=>{be||$t()};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",t):t()}return R.boot=$t,R.default=Dt,R.init=ye,R.reset=we,Object.defineProperties(R,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}}),R})({});typeof LearnAble<"u"&&LearnAble.default&&(window.LearnAble=LearnAble.default);
//# sourceMappingURL=learnable.js.map
