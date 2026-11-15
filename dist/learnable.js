var LearnAble=(function(W){"use strict";var Yo=Object.defineProperty;var Xo=(W,U,le)=>U in W?Yo(W,U,{enumerable:!0,configurable:!0,writable:!0,value:le}):W[U]=le;var A=(W,U,le)=>Xo(W,typeof U!="symbol"?U+"":U,le);var U=typeof document<"u"?document.currentScript:null;const le=new Set(["__proto__","constructor","prototype"]);function D(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Ue(e){if(!e||typeof e!="object"||Array.isArray(e))return Object.create(null);const n=Object.create(null);for(const t of Object.keys(e))le.has(t)||(n[t]=e[t]);return n}const Dt=new Set;function yr(e){try{Dt.add(new URL(e,location.href).origin)}catch{}}function vr(e){let n;try{n=new URL(e,location.href)}catch{return!1}return n.protocol!=="http:"&&n.protocol!=="https:"?!1:n.origin===location.origin?!0:Dt.has(n.origin)}async function Ge(e,n){const t=typeof e=="string"?e:e instanceof URL?e.href:e.url;if(!vr(t))throw new Error("Blocked a request to an origin that is not this page or the configured LearnAble base.");return fetch(e,n)}let ce="",de="";function xr(e){e!=null&&e.src&&(ce=new URL(".",e.src).href)}function wr(e){if(!(ce||!e))try{const n=new URL(e);if(n.protocol!=="http:"&&n.protocol!=="https:")return;ce=new URL(".",n).href}catch{}}function Ar(e){e&&(de=new URL(e,ce||`${location.origin}/`).href,de.endsWith("/")||(de+="/"),yr(de))}function Sr(){return de||ce||`${location.origin}/`}function P(e){if(!e||e==="false"||/^(https?:|data:|blob:)/i.test(e))return e;const n=Sr();return e.startsWith("/")?new URL(e,new URL(n).origin).href:new URL(e,n).href}const ke={segments:[{start:0,end:5.19,en:"Hana opens her lesson on a phone in Addis Ababa.",am:"ሃና ትምህርቷን በአዲስ አበባ በስልኳ ትከፍታለች።",ad:"A phone is drawn on a paper-coloured screen, with a short caption under it.",gloss:"fs-ADDIS fs-ABABA, HANA IX-3 PHONE LESSON OPEN"},{start:5.19,end:11.702,en:"She needs English and Amharic captions she can make larger.",am:"የእንግሊዝኛ እና የአማርኛ ጽሑፍ መግለጫዎችን ማተለቅ ትፈልጋለች።",ad:"The caption bar grows taller. The letters are yellow on a black band.",gloss:"ENGLISH AMHARIC CAPTIONS, IX-3 NEED LARGER"},{start:11.702,end:22.036,en:"A sign window can move and grow, so Ethiopian Sign Language sits where she needs it.",am:"የምልክት መስኮቱን ማንቀሳቀስና ማተለቅ ትችላለች። የኢትዮጵያ የምልክት ቋንቋ የምትፈልገውን ቦታ ይይዛል።",ad:"A second window lifts off the phone. It is labelled Ethiopian Sign Language.",gloss:"SIGN WINDOW, CAN MOVE GROW. ETHIOPIAN SIGN, WHERE IX-3 NEED"},{start:22.036,end:28.919,en:"Audio description says what the picture is doing, for a learner who cannot see it.",am:"የድምጽ መግለጫ ሥዕሉ ምን እንደሚያደርግ ይናገራል። ለማያየው ተማሪ ነው።",ad:"A round speaker icon appears beside the phone.",gloss:"AUDIO DESCRIPTION, PICTURE DO-WHAT. LEARNER SEE-NOT, FOR IX-3"},{start:28.919,end:36.761,en:"When the network is slow she keeps a small pack: sound, text, and a light page.",am:"ኔትወርኩ ሲዘገይ ትንሽ ጥቅል ታስቀምጣለች። ድምጽ፣ ጽሑፍ፣ እና ቀላል ገጽ።",ad:"The phone is replaced by a short stack of pages and a sound file.",gloss:"NETWORK SLOW, IX-3 KEEP PACK SMALL: SOUND TEXT PAGE LIGHT"},{start:36.761,end:43.179,en:"The lesson on this page is the same one, with the network or without it.",am:"በዚህ ገጽ ላይ ያለው ትምህርት አንድ ነው። ኔትወርክ ቢኖርም ባይኖርም።",ad:"The stack of pages stays in the centre of the screen.",gloss:"PAGE THIS, LESSON SAME. NETWORK WITH OR WITHOUT, SAME"}],chat:[{time:.4,speaker:"Facilitator",text:"We are watching together. Captions are on."},{time:5.590000000000001,speaker:"Hana",text:"Please make the Amharic text larger."},{time:12.102,speaker:"Facilitator",text:"Move the sign window if it covers the caption."},{time:22.436,speaker:"Yonas",text:"I will turn on audio description."},{time:29.319,speaker:"Hana",text:"I am saving the small pack before the network drops."},{time:37.161,speaker:"Facilitator",text:"The text page matches what you just heard."}]},Le=[{id:"caption-partner",title:"Caption partner",titleAm:"የንዑስ ጽሑፍ አጋር",org:"Bole Open Classroom",place:"Addis Ababa",time:"Part time",access:"The summary is on the card, and the same words can be spoken. This card is a fictional demo.",summary:"Bole Open Classroom is hiring a caption partner in Addis Ababa. The work is part time. You write English and Amharic captions for short lessons. You need a careful ear and a phone that can play audio. This card is a fictional demo for the hackathon, so an employer can hear how a job summary sounds.",summaryAm:"ቦሌ ክፍት ክፍል በአዲስ አበባ የንዑስ ጽሑፍ አጋር ይፈልጋል። ሥራው የትርፍ ሰዓት ነው። ለአጭር ትምህርቶች የእንግሊዝኛ እና የአማርኛ መግለጫ ይጻፋል። ይህ ካርድ ልብ ወለድ ማሳያ ነው፣ እውነተኛ ቅጥር አይደለም።"},{id:"caption-intern",title:"Caption intern",titleAm:"የንዑስ ጽሑፍ ልምምድ",org:"Community radio",place:"Bahir Dar",time:"Sample stipend",access:"Deaf applicants are welcome in this story. Ethiopian Sign Language is used in the newsroom two days a week. Fictional demo.",summary:"Turn recorded Amharic shows into captions. A senior editor checks every file. This card is a fictional demo, so the stipend is not a real offer.",summaryAm:"የተቀዳ የአማርኛ ፕሮግራም ወደ መግለጫ ይቀየራል። ከፍተኛ አርታኢ እያንዳንዱን ፋይል ይመለከታል። ይህ ካርድ ልብ ወለድ ማሳያ ነው፣ እውነተኛ ደመወዝ አይደለም።"},{id:"pdf-maker",title:"Accessible PDF maker",titleAm:"ተደራሽ ፒዲኤፍ አዘጋጅ",org:"Training desk",place:"Remote, sized for 3G",time:"Sample contract",access:"The work can be done from a downloaded pack. Live video meetings are not required. Fictional demo.",summary:"Add image descriptions and tags to training documents that already exist. This card is a fictional demo, so the contract is not a real offer.",summaryAm:"ቀድሞ ላለው የስልጠና ሰነድ የምስል መግለጫ እና መለያ ይጨመራል። ይህ ካርድ ልብ ወለድ ማሳያ ነው፣ እውነተኛ ውል አይደለም።"}],Pt={publicKey:{crv:"Ed25519",x:"UXNpzoUhtt_tIteTXTiCYkiF4KBKlRyXYLi4Y3vyQdY",kty:"OKP"},jwt:"eyJhbGciOiJFZERTQSIsInR5cCI6InZjK2p3dCIsImtpZCI6ImxlYXJuYWJsZS1kZW1vIn0.eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvbnMvY3JlZGVudGlhbHMvdjIiLCJodHRwczovL3B1cmwuaW1zZ2xvYmFsLm9yZy9zcGVjL29iL3YzcDAvY29udGV4dC0zLjAuMy5qc29uIl0sInR5cGUiOlsiVmVyaWZpYWJsZUNyZWRlbnRpYWwiLCJPcGVuQmFkZ2VDcmVkZW50aWFsIl0sImlzc3VlciI6eyJpZCI6Imh0dHBzOi8vbGVhcm5hYmxlLmxvY2FsL2lzc3VlciIsInR5cGUiOlsiUHJvZmlsZSJdLCJuYW1lIjoiTGVhcm5BYmxlIGRlbW8ifSwidmFsaWRGcm9tIjoiMjAyNi0xMS0xNVQwMDowMDowMFoiLCJuYW1lIjoiQWNjZXNzaWJsZSBtZWRpYSwgZGVtbyBsZXNzb24iLCJjcmVkZW50aWFsU3ViamVjdCI6eyJ0eXBlIjpbIkFjaGlldmVtZW50U3ViamVjdCJdLCJuYW1lIjoiSGFuYSBCZWtlbGUiLCJpZGVudGlmaWVyIjoiaGFuYS1kZW1vLTIwMjYiLCJhY2hpZXZlbWVudCI6eyJpZCI6Imh0dHBzOi8vbGVhcm5hYmxlLmxvY2FsL2FjaGlldmVtZW50cy9hY2Nlc3NpYmxlLW1lZGlhLWRlbW8iLCJ0eXBlIjpbIkFjaGlldmVtZW50Il0sIm5hbWUiOiJBY2Nlc3NpYmxlIG1lZGlhLCBkZW1vIGxlc3NvbiIsImRlc2NyaXB0aW9uIjoiQ29tcGxldGVkIHRoZSBMZWFybkFibGUgZGVtbyBvbiBjYXB0aW9ucywgc2lnbiwgYXVkaW8gZGVzY3JpcHRpb24sIGFuZCB0aGUgb2ZmbGluZSBwYWNrLiJ9fX0.v-8f4fVY60MgLeFQY6uJv6gwqqBQdcJijKgEjRh_sxwvqfcMjaFOV1V3WDLrETBkIKTr5UeChmFH4OPP-ZAlCw"};function Er(e){const n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",t=e.replace(/-/g,"+").replace(/_/g,"/").replace(/=+$/,""),r=new Uint8Array(Math.floor(t.length*3/4));let a=0,o=0,i=0;for(const s of t){const l=n.indexOf(s);if(l<0)return new Uint8Array;a=a<<6|l,o+=6,o>=8&&(o-=8,r[i]=a>>o&255,i+=1)}return r.subarray(0,i)}async function Bt(e=Pt.jwt,n=Pt.publicKey){const[t,r,a]=e.split(".");if(!t||!r||!a)return!1;const o=await crypto.subtle.importKey("jwk",n,{name:"Ed25519"},!1,["verify"]),i=new TextEncoder().encode(`${t}.${r}`);return crypto.subtle.verify({name:"Ed25519"},o,Er(a),i)}var B=Uint8Array,H=Uint16Array,je=Int32Array,Ve=new B([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),ze=new B([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),$t=new B([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),Ft=function(e,n){for(var t=new H(31),r=0;r<31;++r)t[r]=n+=1<<e[r-1];for(var a=new je(t[30]),r=1;r<30;++r)for(var o=t[r];o<t[r+1];++o)a[o]=o-t[r]<<5|r;return{b:t,r:a}},Ht=Ft(Ve,2),kr=Ht.b,Ke=Ht.r;kr[28]=258,Ke[258]=28;for(var Lr=Ft(ze,0),Ot=Lr.r,Ye=new H(32768),k=0;k<32768;++k){var J=(k&43690)>>1|(k&21845)<<1;J=(J&52428)>>2|(J&13107)<<2,J=(J&61680)>>4|(J&3855)<<4,Ye[k]=((J&65280)>>8|(J&255)<<8)>>1}for(var ve=(function(e,n,t){for(var r=e.length,a=0,o=new H(n);a<r;++a)e[a]&&++o[e[a]-1];var i=new H(n);for(a=1;a<n;++a)i[a]=i[a-1]+o[a-1]<<1;var s;if(t){s=new H(1<<n);var l=15-n;for(a=0;a<r;++a)if(e[a])for(var d=a<<4|e[a],c=n-e[a],h=i[e[a]-1]++<<c,g=h|(1<<c)-1;h<=g;++h)s[Ye[h]>>l]=d}else for(s=new H(r),a=0;a<r;++a)e[a]&&(s[a]=Ye[i[e[a]-1]++]>>15-e[a]);return s}),re=new B(288),k=0;k<144;++k)re[k]=8;for(var k=144;k<256;++k)re[k]=9;for(var k=256;k<280;++k)re[k]=7;for(var k=280;k<288;++k)re[k]=8;for(var Ce=new B(32),k=0;k<32;++k)Ce[k]=5;var Cr=ve(re,9,0),Tr=ve(Ce,5,0),Wt=function(e){return(e+7)/8|0},Ut=function(e,n,t){return(t==null||t>e.length)&&(t=e.length),new B(e.subarray(n,t))},Mr=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],Te=function(e,n,t){var r=new Error(n||Mr[e]);if(r.code=e,Error.captureStackTrace&&Error.captureStackTrace(r,Te),!t)throw r;return r},Z=function(e,n,t){t<<=n&7;var r=n/8|0;e[r]|=t,e[r+1]|=t>>8},xe=function(e,n,t){t<<=n&7;var r=n/8|0;e[r]|=t,e[r+1]|=t>>8,e[r+2]|=t>>16},Xe=function(e,n){for(var t=[],r=0;r<e.length;++r)e[r]&&t.push({s:r,f:e[r]});var a=t.length,o=t.slice();if(!a)return{t:zt,l:0};if(a==1){var i=new B(t[0].s+1);return i[t[0].s]=1,{t:i,l:1}}t.sort(function(M,I){return M.f-I.f}),t.push({s:-1,f:25001});var s=t[0],l=t[1],d=0,c=1,h=2;for(t[0]={s:-1,f:s.f+l.f,l:s,r:l};c!=a-1;)s=t[t[d].f<t[h].f?d++:h++],l=t[d!=c&&t[d].f<t[h].f?d++:h++],t[c++]={s:-1,f:s.f+l.f,l:s,r:l};for(var g=o[0].s,r=1;r<a;++r)o[r].s>g&&(g=o[r].s);var m=new H(g+1),f=_e(t[c-1],m,0);if(f>n){var r=0,b=0,x=f-n,w=1<<x;for(o.sort(function(I,L){return m[L.s]-m[I.s]||I.f-L.f});r<a;++r){var S=o[r].s;if(m[S]>n)b+=w-(1<<f-m[S]),m[S]=n;else break}for(b>>=x;b>0;){var T=o[r].s;m[T]<n?b-=1<<n-m[T]++-1:++r}for(;r>=0&&b;--r){var E=o[r].s;m[E]==n&&(--m[E],++b)}f=n}return{t:new B(m),l:f}},_e=function(e,n,t){return e.s==-1?Math.max(_e(e.l,n,t+1),_e(e.r,n,t+1)):n[e.s]=t},Gt=function(e){for(var n=e.length;n&&!e[--n];);for(var t=new H(++n),r=0,a=e[0],o=1,i=function(l){t[r++]=l},s=1;s<=n;++s)if(e[s]==a&&s!=n)++o;else{if(!a&&o>2){for(;o>138;o-=138)i(32754);o>2&&(i(o>10?o-11<<5|28690:o-3<<5|12305),o=0)}else if(o>3){for(i(a),--o;o>6;o-=6)i(8304);o>2&&(i(o-3<<5|8208),o=0)}for(;o--;)i(a);o=1,a=e[s]}return{c:t.subarray(0,r),n}},we=function(e,n){for(var t=0,r=0;r<n.length;++r)t+=e[r]*n[r];return t},jt=function(e,n,t){var r=t.length,a=Wt(n+2);e[a]=r&255,e[a+1]=r>>8,e[a+2]=e[a]^255,e[a+3]=e[a+1]^255;for(var o=0;o<r;++o)e[a+o+4]=t[o];return(a+4+r)*8},Vt=function(e,n,t,r,a,o,i,s,l,d,c){Z(n,c++,t),++a[256];for(var h=Xe(a,15),g=h.t,m=h.l,f=Xe(o,15),b=f.t,x=f.l,w=Gt(g),S=w.c,T=w.n,E=Gt(b),M=E.c,I=E.n,L=new H(19),p=0;p<S.length;++p)++L[S[p]&31];for(var p=0;p<M.length;++p)++L[M[p]&31];for(var u=Xe(L,7),y=u.t,O=u.l,F=19;F>4&&!y[$t[F-1]];--F);var me=d+5<<3,j=we(a,re)+we(o,Ce)+i,V=we(a,g)+we(o,b)+i+14+3*F+we(L,y)+2*L[16]+3*L[17]+7*L[18];if(l>=0&&me<=j&&me<=V)return jt(n,c,e.subarray(l,l+d));var Y,R,z,ne;if(Z(n,c,1+(V<j)),c+=2,V<j){Y=ve(g,m,0),R=g,z=ve(b,x,0),ne=b;var It=ve(y,O,0);Z(n,c,T-257),Z(n,c+5,I-1),Z(n,c+10,F-4),c+=14;for(var p=0;p<F;++p)Z(n,c+3*p,y[$t[p]]);c+=3*F;for(var X=[S,M],Ee=0;Ee<2;++Ee)for(var be=X[Ee],p=0;p<be.length;++p){var _=be[p]&31;Z(n,c,It[_]),c+=y[_],_>15&&(Z(n,c,be[p]>>5&127),c+=be[p]>>12)}}else Y=Cr,R=re,z=Tr,ne=Ce;for(var p=0;p<s;++p){var q=r[p];if(q>255){var _=q>>18&31;xe(n,c,Y[_+257]),c+=R[_+257],_>7&&(Z(n,c,q>>23&31),c+=Ve[_]);var ye=q&31;xe(n,c,z[ye]),c+=ne[ye],ye>3&&(xe(n,c,q>>5&8191),c+=ze[ye])}else xe(n,c,Y[q]),c+=R[q]}return xe(n,c,Y[256]),c+R[256]},Ir=new je([65540,131080,131088,131104,262176,1048704,1048832,2114560,2117632]),zt=new B(0),Nr=function(e,n,t,r,a,o){var i=o.z||e.length,s=new B(r+i+5*(1+Math.ceil(i/7e3))+a),l=s.subarray(r,s.length-a),d=o.l,c=(o.r||0)&7;if(n){c&&(l[0]=o.r>>3);for(var h=Ir[n-1],g=h>>13,m=h&8191,f=(1<<t)-1,b=o.p||new H(32768),x=o.h||new H(f+1),w=Math.ceil(t/3),S=2*w,T=function(qt){return(e[qt]^e[qt+1]<<w^e[qt+2]<<S)&f},E=new je(25e3),M=new H(288),I=new H(32),L=0,p=0,u=o.i||0,y=0,O=o.w||0,F=0;u+2<i;++u){var me=T(u),j=u&32767,V=x[me];if(b[j]=V,x[me]=j,O<=u){var Y=i-u;if((L>7e3||y>24576)&&(Y>423||!d)){c=Vt(e,l,0,E,M,I,p,y,F,u-F,c),y=L=p=0,F=u;for(var R=0;R<286;++R)M[R]=0;for(var R=0;R<30;++R)I[R]=0}var z=2,ne=0,It=m,X=j-V&32767;if(Y>2&&me==T(u-X))for(var Ee=Math.min(g,Y)-1,be=Math.min(32767,u),_=Math.min(258,Y);X<=be&&--It&&j!=V;){if(e[u+z]==e[u+z-X]){for(var q=0;q<_&&e[u+q]==e[u+q-X];++q);if(q>z){if(z=q,ne=X,q>Ee)break;for(var ye=Math.min(X,q-2),fr=0,R=0;R<ye;++R){var Nt=u-X+R&32767,Ko=b[Nt],gr=Nt-Ko&32767;gr>fr&&(fr=gr,V=Nt)}}}j=V,V=b[j],X+=j-V&32767}if(ne){E[y++]=268435456|Ke[z]<<18|Ot[ne];var mr=Ke[z]&31,br=Ot[ne]&31;p+=Ve[mr]+ze[br],++M[257+mr],++I[br],O=u+z,++L}else E[y++]=e[u],++M[e[u]]}}for(u=Math.max(u,O);u<i;++u)E[y++]=e[u],++M[e[u]];c=Vt(e,l,d,E,M,I,p,y,F,u-F,c),d||(o.r=c&7|l[c/8|0]<<3,c-=7,o.h=x,o.p=b,o.i=u,o.w=O)}else{for(var u=o.w||0;u<i+d;u+=65535){var Rt=u+65535;Rt>=i&&(l[c/8|0]=d,Rt=i),c=jt(l,c+1,e.subarray(u,Rt))}o.i=i}return Ut(s,0,r+Wt(c)+a)},Rr=(function(){for(var e=new Int32Array(256),n=0;n<256;++n){for(var t=n,r=9;--r;)t=(t&1&&-306674912)^t>>>1;e[n]=t}return e})(),qr=function(){var e=-1;return{p:function(n){for(var t=e,r=0;r<n.length;++r)t=Rr[t&255^n[r]]^t>>>8;e=t},d:function(){return~e}}},Dr=function(e,n,t,r,a){if(!a&&(a={l:1},n.dictionary)){var o=n.dictionary.subarray(-32768),i=new B(o.length+e.length);i.set(o),i.set(e,o.length),e=i,a.w=o.length}return Nr(e,n.level==null?6:n.level,n.mem==null?a.l?Math.ceil(Math.max(8,Math.min(13,Math.log(e.length)))*1.5):20:12+n.mem,t,r,a)},Kt=function(e,n){var t={};for(var r in e)t[r]=e[r];for(var r in n)t[r]=n[r];return t},N=function(e,n,t){for(;t;++n)e[n]=t,t>>>=8};function Pr(e,n){return Dr(e,n||{},0,0)}var Yt=function(e,n,t,r){for(var a in e){var o=e[a],i=n+a,s=r;Array.isArray(o)&&(s=Kt(r,o[1]),o=o[0]),ArrayBuffer.isView(o)?t[i]=[o,s]:(t[i+="/"]=[new B(0),s],Yt(o,i,t,r))}},Xt=typeof TextEncoder<"u"&&new TextEncoder,Br=typeof TextDecoder<"u"&&new TextDecoder,$r=0;try{Br.decode(zt,{stream:!0}),$r=1}catch{}function _t(e,n){var t;if(Xt)return Xt.encode(e);for(var r=e.length,a=new B(e.length+(e.length>>1)),o=0,i=function(d){a[o++]=d},t=0;t<r;++t){if(o+5>a.length){var s=new B(o+8+(r-t<<1));s.set(a),a=s}var l=e.charCodeAt(t);l<128||n?i(l):l<2048?(i(192|l>>6),i(128|l&63)):l>55295&&l<57344?(l=65536+(l&1047552)|e.charCodeAt(++t)&1023,i(240|l>>18),i(128|l>>12&63),i(128|l>>6&63),i(128|l&63)):(i(224|l>>12),i(128|l>>6&63),i(128|l&63))}return Ut(a,0,o)}var Ze=function(e){var n=0;if(e)for(var t in e){var r=e[t].length;r>65535&&Te(9),n+=r+4}return n},Zt=function(e,n,t,r,a,o,i,s){var l=r.length,d=t.extra,c=s&&s.length,h=Ze(d);N(e,n,i!=null?33639248:67324752),n+=4,i!=null&&(e[n++]=20,e[n++]=t.os),e[n]=20,n+=2,e[n++]=t.flag<<1|(o<0&&8),e[n++]=a&&8,e[n++]=t.compression&255,e[n++]=t.compression>>8;var g=new Date(t.mtime==null?Date.now():t.mtime),m=g.getFullYear()-1980;if((m<0||m>119)&&Te(10),N(e,n,m<<25|g.getMonth()+1<<21|g.getDate()<<16|g.getHours()<<11|g.getMinutes()<<5|g.getSeconds()>>1),n+=4,o!=-1&&(N(e,n,t.crc),N(e,n+4,o<0?-o-2:o),N(e,n+8,t.size)),N(e,n+12,l),N(e,n+14,h),n+=16,i!=null&&(N(e,n,c),N(e,n+6,t.attrs),N(e,n+10,i),n+=14),e.set(r,n),n+=l,h)for(var f in d){var b=d[f],x=b.length;N(e,n,+f),N(e,n+2,x),e.set(b,n+4),n+=4+x}return c&&(e.set(s,n),n+=c),n},Fr=function(e,n,t,r,a){N(e,n,101010256),N(e,n+8,t),N(e,n+10,t),N(e,n+12,r),N(e,n+16,a)};function Hr(e,n){n||(n={});var t={},r=[];Yt(e,"",t,n);var a=0,o=0;for(var i in t){var s=t[i],l=s[0],d=s[1],c=d.level==0?0:8,h=_t(i),g=h.length,m=d.comment,f=m&&_t(m),b=f&&f.length,x=Ze(d.extra);g>65535&&Te(11);var w=c?Pr(l,d):l,S=w.length,T=qr();T.p(l),r.push(Kt(d,{size:l.length,crc:T.d(),c:w,f:h,m:f,u:g!=i.length||f&&m.length!=b,o:a,compression:c})),a+=30+g+x+S,o+=76+2*(g+x)+(b||0)+S}for(var E=new B(o+22),M=a,I=o-a,L=0;L<r.length;++L){var h=r[L];Zt(E,h.o,h,h.f,h.u,h.c.length);var p=30+h.f.length+Ze(h.extra);E.set(h.c,h.o+p),Zt(E,a,h,h.f,h.u,h.c.length,h.o,h.m),a+=16+p+(h.m?h.m.length:0)}return Fr(E,a,r.length,I,M),E}const Or=`# Ethiopic-G1
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
`,Wr=` A1B'K2L@CIF/MSP"E3H9O6R^DJG>NTQ,*5<-U8V.%[$+X!&;:4\\0Z7(_?W]#Y)=`,Ur="JABCDEFGHI",Gr={".":"4",",":"1","?":"8","!":"6","'":"'","-":"-",":":"3",";":"2"};function jr(e){return e<0||e>63?"?":Wr[e]??"?"}function Vr(e){let n=0;for(const t of e){const r=Number(t);r>=1&&r<=6&&(n|=1<<r-1)}return n}function zr(e){const n=new Map;for(const t of e.split(/\r?\n/)){const r=/^(?:letter|punctuation)\s+\\x([0-9A-Fa-f]+)\s+(\S+)/.exec(t.trim());if(!r)continue;const a=Number.parseInt(r[1],16);n.set(a,r[2].split("-").map(Vr))}return n}const Kr=zr(Or);function Yr(e){let n="",t=!1;for(const r of e){const a=r.codePointAt(0)??0,o=Kr.get(a);if(o){t=!1,n+=o.map(jr).join("");continue}if(r===`
`){t=!1,n+=`
`;continue}if(r===" "){t=!1,n+=" ";continue}if(/[0-9]/.test(r)){t||(n+="#",t=!0),n+=Ur[Number(r)];continue}if(t=!1,/[a-z]/.test(r)){n+=r.toUpperCase();continue}if(/[A-Z]/.test(r)){n+=`,${r}`;continue}n+=Gr[r]??"?"}return n}function Je(e,n=40){const t=Yr(e),r=[];for(const a of t.split(`
`)){const o=a.split(" ");let i="";for(const s of o){if(!i){i=s;continue}i.length+1+s.length<=n?i+=` ${s}`:(r.push(i),i=s)}i&&r.push(i)}return`${r.join(`
`)}
`}const Xr='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" role="img"><title>A navy phone on a paper background, with an English and Amharic caption under the screen.</title><rect width="640" height="480" fill="#f2f0ea"/><rect x="230" y="40" width="180" height="320" rx="28" fill="#ffffff" stroke="#1b3048" stroke-width="8"/><rect x="254" y="72" width="132" height="210" rx="6" fill="#f2f0ea" stroke="#1b3048" stroke-width="3"/><rect x="120" y="390" width="400" height="36" fill="#111111"/><rect x="140" y="400" width="160" height="8" fill="#ffee00"/></svg>',_r="A navy phone on a paper background, with an English and Amharic caption under the screen.",Zr={opus:"audio/ogg; codecs=opus",m4a:"audio/mp4",mp3:"audio/mpeg",wav:"audio/wav"};function Jt(e,n){const t=(e||"").split("?")[0].split("/").pop()||"",r=/\.(opus|m4a|mp3|wav)$/i.exec(t);return`lesson-${n}.${r?r[1].toLowerCase():"m4a"}`}function Qt(e,n){return e.length?`<audio controls>${e.map(r=>{const a=r.split(".").pop()||"";return`<source src="${r}" type="${Zr[a]||"application/octet-stream"}">`}).join("")}</audio>`:n?"<p>The narration file was not on this host.</p>":""}function Jr(e,n,t,r,a){const o=e.split(`
`).filter(Boolean),i=n.split(`
`).filter(Boolean),s=o.map((d,c)=>`<section><h2>${D(d)}</h2>${i[c]?`<p lang="am">${D(i[c])}</p>`:""}</section>`).join(""),l=t?`<h2>Audio description</h2><p>${D(t)}</p>`:"";return`<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><title>LearnAble light lesson</title></head><body><main><h1>LearnAble light lesson</h1><p>Sound, text, and this page. The video is not in the pack.</p><figure><img src="lesson-figure.svg" alt="${D(_r)}"></figure><h2>English</h2>${Qt(r,!0)}<h2 lang="am">አማርኛ</h2>${Qt(a,!1)}${s}${l}</main></body></html>`}async function en(e){if(!e)return null;try{const n=await Ge(e);return n.ok?new Uint8Array(await n.arrayBuffer()):null}catch{return null}}async function Qr(e){const n=await en(e.audioEn),t=await en(e.audioAm),r=n?Jt(e.audioEn,"en"):"",a=t?Jt(e.audioAm,"am"):"",o={"index.html":new TextEncoder().encode(Jr(e.english,e.amharic,e.descriptions||"",r?[r]:[],a?[a]:[])),"lesson-figure.svg":new TextEncoder().encode(Xr),"transcript-en.brf":new TextEncoder().encode(Je(e.english)),"transcript-am.brf":new TextEncoder().encode(Je(e.amharic))};return n&&r&&(o[r]=n),t&&a&&(o[a]=t),{bytes:Hr(o),audio:!!(n||t)}}function Q(e,n,t){const r=new Blob([Uint8Array.from(e)],{type:t}),a=URL.createObjectURL(r),o=document.createElement("a");o.href=a,o.download=n,document.body.append(o),o.click(),o.remove(),URL.revokeObjectURL(a)}async function ea(e,n,t){var r;try{const o=await import(P("/learnable/espeak/speak.js")),i=o.speak||((r=o.default)==null?void 0:r.speak);return typeof i!="function"?!1:(await i(e,n,t),!0)}catch{return!1}}let Me=0,Qe=!1,ue=null,tn=!1,nn=!1;function rn(){var e;return typeof window<"u"&&"speechSynthesis"in window&&typeof((e=window.speechSynthesis)==null?void 0:e.speak)=="function"}function an(){var e;Qe=!0;try{(e=window.speechSynthesis)==null||e.resume()}catch{}}function ta(){if(!Qe||!ue)return;const e=ue;ue=null,ln(e.text,e.lang,e.hooks)}function on(e){return e.toLowerCase().slice(0,2)}function na(e){var t,r;return(((r=(t=window.speechSynthesis)==null?void 0:t.getVoices)==null?void 0:r.call(t))??[]).find(a=>a.lang.toLowerCase().startsWith(on(e)))}function sn(e){if(tn)return;tn=!0;const n=document.getElementById("learnable-reader-live");if(!n)return;const t=on(e)==="am"?"Amharic":e;n.textContent=`No ${t} voice in this browser. The optional eSpeak file is not on this site, so this line stays on screen.`}function ra(e,n,t){var r,a;e!==Me||t?(r=n.oncancel)==null||r.call(n):(a=n.onend)==null||a.call(n)}async function ln(e,n,t){var h,g,m,f,b,x;const r=++Me,a=Math.min(2,Math.max(.5,t.rate??1)),o=Math.min(2,Math.max(0,t.pitch??1));try{(h=window.speechSynthesis)==null||h.cancel()}catch{}const i=((m=(g=window.speechSynthesis)==null?void 0:g.getVoices)==null?void 0:m.call(g))??[],s=na(n);if(!s&&i.length>0){const w=await ea(e,n,a);if(r!==Me){(f=t.oncancel)==null||f.call(t);return}if(w){(b=t.onend)==null||b.call(t);return}sn(n)}if(!rn()){s||sn(n),(x=t.onend)==null||x.call(t);return}const l=new SpeechSynthesisUtterance(e);l.lang=n.startsWith("am")?"am":n,l.rate=a,l.pitch=o;try{s&&(l.voice=s)}catch{}let d=!1;const c=w=>{d||(d=!0,ra(r,t,w))};l.onend=()=>c(!1),l.onerror=()=>c(!0),window.speechSynthesis.speak(l)}function he(e,n,t=1,r={}){var i,s;const a=e.replace(/\s+/g," ").trim();if(!a)return;const o={text:a,lang:n,hooks:{...r,rate:r.rate??t}};if(!nn&&rn()&&(nn=!0,(s=(i=window.speechSynthesis).addEventListener)==null||s.call(i,"voiceschanged",()=>{window.speechSynthesis.getVoices()}),window.speechSynthesis.getVoices()),!Qe){ue=o;return}ue=null,ln(o.text,o.lang,o.hooks)}function cn(e){const n=typeof window>"u"?void 0:window.speechSynthesis;if(!n||typeof n.getVoices!="function")return"missing";const t=n.getVoices();if(!t.length)return"missing";const r=e.toLowerCase().slice(0,2);return t.some(a=>a.lang.toLowerCase().startsWith(r))?"ready":"missing"}function aa(e){if(cn(e)==="ready")return Promise.resolve("ready");const n=typeof window>"u"?void 0:window.speechSynthesis;return n!=null&&n.addEventListener?new Promise(t=>{let r=!1;const a=()=>{r||(r=!0,t(cn(e)))};try{n.addEventListener("voiceschanged",a,{once:!0})}catch{a();return}window.setTimeout(a,300)}):Promise.resolve("missing")}function pe(){var e;Me+=1,ue=null;try{(e=window.speechSynthesis)==null||e.cancel()}catch{}}function dn(e){const n=/^(?:(\d+):)?(\d{2}):(\d{2})\.(\d{3})$/.exec(e.trim());if(!n)throw new Error(`Bad WebVTT timestamp: ${e}`);const t=Number(n[1]??0),r=Number(n[2]),a=Number(n[3]),o=Number(n[4]);return t*3600+r*60+a+o/1e3}function oa(e){var a;const n=e.replace(/^\uFEFF/,"").split(/\r?\n/),t=[];let r=0;if((a=n[0])!=null&&a.startsWith("WEBVTT"))for(r=1;r<n.length&&n[r].trim()!=="";)r+=1;for(;r<n.length;){if(n[r].trim()===""){r+=1;continue}let o=n[r];!o.includes("-->")&&r+1<n.length&&(r+=1,o=n[r]);const i=o.split("-->");if(i.length<2){r+=1;continue}const s=dn(i[0]),l=i[1].trim().split(/\s+/)[0],d=dn(l);r+=1;const c=[];for(;r<n.length&&n[r].trim()!=="";)c.push(n[r]),r+=1;t.push({start:s,end:d,text:c.join(`
`)})}return t}function un(e){const n=Math.max(0,Math.round(e*1e3)),t=Math.floor(n/36e5),r=Math.floor(n%36e5/6e4),a=Math.floor(n%6e4/1e3),o=n%1e3;return`${String(t).padStart(2,"0")}:${String(r).padStart(2,"0")}:${String(a).padStart(2,"0")}.${String(o).padStart(3,"0")}`}function hn(e){return`WEBVTT

${e.map(t=>`${un(t.start)} --> ${un(t.end)}
${t.text}`).join(`

`)}
`}function ia(e,n){const t=e.find(a=>n>=a.start&&n<a.end);if(t)return t;const r=e[e.length-1];if(r&&n>=r.start&&n<=r.end+.05)return r}const et={en:{larger:"Larger text",contrast:"High contrast",stop:"Stop motion",read:"Read this page",stopRead:"Stop reading",language:"Language",images:"Image check",skip:"Skip to content",menu:"Menu",pipeline:"Transcript",job:"Job card",session:"Session"},am:{larger:"ትልቅ ጽሑፍ",contrast:"ከፍተኛ ንጽጽር",stop:"እንቅስቃሴ አቁም",read:"ይህን ገጽ አንብብ",stopRead:"ማንበብ አቁም",language:"ቋንቋ",images:"የምስል ምርመራ",skip:"ወደ ዋናው ይዘት ዝለል",menu:"ምናሌ",pipeline:"ጽሑፍ",job:"የስራ ካርድ",session:"ክፍለ ጊዜ"}},sa={"VA-Content-Banner.png":"A wide banner for the virtual assistant lesson.","lesson-figure.svg":"A navy phone on a paper background, with an English and Amharic caption under the screen.","poster.png":"A still frame from the lesson: a phone with a caption bar.","esl-placeholder.png":"A placeholder card where an Ethiopian Sign Language clip can be added."},pn="Description not yet provided",fn=sa;function gn(e){var t;const n=e.currentSrc||e.getAttribute("src")||"";return decodeURIComponent(((t=n.split("/").pop())==null?void 0:t.split("?")[0])||"")}function la(e){if(e.getAttribute("aria-hidden")==="true"||e.closest("[aria-hidden='true']"))return!0;const n=e.getAttribute("role");return n==="presentation"||n==="none"||e.getAttribute("alt")===""}function mn(e,n){if(n===pn||n==="Needs a description")return!0;const t=gn(e),r=t.replace(/\.[^.]+$/,"");return n===t||n===r}function tt(e){var r;if(la(e))return null;const n=((r=e.getAttribute("alt"))==null?void 0:r.trim())??"";if(n&&!mn(e,n))return n;const t=gn(e);return fn[t]?fn[t]:pn}function ca(){document.querySelectorAll("img").forEach(e=>{var a;if(e.closest("learnable-player, learnable-toolbar"))return;const n=tt(e);if(!n)return;const t=((a=e.getAttribute("alt"))==null?void 0:a.trim())??"";(!t||mn(e,t))&&(e.alt=n),!e.closest("a, button, [role='link'], [role='button']")&&e.tabIndex<0&&(e.tabIndex=0,e.dataset.learnableImage="true")})}const bn={white:{label:"White on black",fg:"#ffffff",bg:"#111111"},yellow:{label:"Yellow on black",fg:"#ffee00",bg:"#111111"},black:{label:"Black on white",fg:"#172033",bg:"#f2f0ea"},cyan:{label:"Cyan on black",fg:"#00ffff",bg:"#111111"}},nt="learnable-widget",rt=()=>({toolbar:!0,signWindow:!0,audioDescription:!0,offlinePack:!1,braille:!1,taggedDocs:!1}),at=()=>({lang:"en",uiLang:"en",largeText:!1,highContrast:!1,stopMotion:!1,captionScale:1.15,captionPreset:"white",contrastMode:"off",contrastLevel:7,readRate:1,readPitch:1,readVerbosity:"sentences",haptics:!1,voice:!0,voiceChosen:!1,audioDescription:!0,descriptionMode:"spoken",keyboard:!0,keys:{heading:"h",landmark:"l",help:"?",voice:"Alt+Shift+S"},toolbarCorner:"bl",toolbarCollapsed:!0,toolbarVisited:!1});let ot=rt(),G=at(),yn="paper",Ie=!0;function Ne(e){return Ie===!1?!1:Ie===!0?!0:Ie[e]!==!1}function Re(e,n){if(typeof e!="string")return n;const t=e.trim();return!t||t.length>32?n:t}function vn(){try{return window.matchMedia("(prefers-reduced-motion: reduce)").matches}catch{return!1}}function xn(){const e=at();e.stopMotion=vn();try{const n=localStorage.getItem(nt);if(!n)return e;const t=Ue(JSON.parse(n)),r=t.lang==="am"?"am":t.lang==="en"?"en":e.lang,a=t.uiLang==="am"?"am":t.uiLang==="en"?"en":e.uiLang,o=t.contrastMode==="bw"||t.contrastMode==="yb"?t.contrastMode:"off",i=Math.min(10,Math.max(1,Number(t.contrastLevel)||e.contrastLevel)),s={...e.keys,...t.keys||{}},l=t.descriptionMode==="off"||t.descriptionMode==="spoken"||t.descriptionMode==="text"?t.descriptionMode:typeof t.audioDescription=="boolean"?t.audioDescription?"spoken":"off":e.descriptionMode;return{...e,lang:r,uiLang:a,contrastMode:o,contrastLevel:i,voice:typeof t.voice=="boolean"?t.voice:e.voice,voiceChosen:t.voiceChosen===!0,audioDescription:l!=="off",descriptionMode:l,keyboard:t.keyboard!==!1,keys:{heading:Re(s.heading,e.keys.heading),landmark:Re(s.landmark,e.keys.landmark),help:Re(s.help,e.keys.help),voice:Re(s.voice,e.keys.voice)},toolbarCorner:t.toolbarCorner==="tl"||t.toolbarCorner==="tr"||t.toolbarCorner==="br"||t.toolbarCorner==="bl"?t.toolbarCorner:"bl",toolbarCollapsed:t.toolbarCollapsed===!0,toolbarVisited:t.toolbarVisited===!0}}catch{return e}}function v(){return{...G}}function qe(){return{...ot}}function da(){return yn}function it(e){G={...e},localStorage.setItem(nt,JSON.stringify(G)),window.dispatchEvent(new CustomEvent("learnable-settings",{detail:v()}))}function C(e){const n={...v(),...Ue(e)};return it(n),v()}function ua(e={}){const n=Ue(e.features);ot={...rt()};for(const r of Object.keys(rt()))typeof n[r]=="boolean"&&(ot[r]=n[r]);e.theme&&(yn=e.theme),e.enhance!==void 0&&(Ie=e.enhance);const t=xn();G={...t,lang:e.lang??t.lang,uiLang:e.uiLang??t.uiLang},t.voiceChosen!==!0&&e.voice&&(G.voice=e.voice==="on",e.voice==="off"&&(G.audioDescription=!1,G.descriptionMode="off")),it(G)}function ha(){return localStorage.removeItem(nt),G=at(),G.stopMotion=vn(),it(G),v()}function wn(e,n,t){return e.hasAttribute(n)?e.getAttribute(n)!=="false":t}function pa(){if(document.documentElement.dataset.learnableProfile==="savanna")return!0;const e=location.pathname;return/savanna|with-learnable|homepage-v1|concept-with|index-learnable/.test(e)}function fa(e){return[...document.querySelectorAll(e)].filter(n=>!n.closest("learnable-player, learnable-toolbar"))}function ga(e,n,t){const r=e.indexOf(n);if(r<0)return;e[(r+t+e.length)%e.length].focus()}function ma(e){const n=e.target;if(!(n instanceof HTMLElement)||n.closest("learnable-player, learnable-toolbar, input, textarea, select"))return;n.classList.contains("hamburger")&&(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),n.click(),n.setAttribute("aria-expanded",document.body.classList.contains("sidebar-collapsed")?"false":"true")),e.key==="Escape"&&(document.querySelectorAll(".collapse.show").forEach(r=>{const a=document.querySelector(`[data-bs-target="#${r.id}"]`);(a==null?void 0:a.getAttribute("aria-expanded"))==="true"&&a.click()}),document.querySelectorAll(".dropdown-menu.show").forEach(r=>r.classList.remove("show")));const t=[".homepage-nav .nav-link","button[data-section-index]",".accordion-button",".dropdown-menu.show .dropdown-item"];if(!(e.key!=="ArrowRight"&&e.key!=="ArrowLeft"&&e.key!=="ArrowDown"&&e.key!=="ArrowUp"))for(const r of t){const a=fa(r);if(a.includes(n)){e.preventDefault(),ga(a,n,e.key==="ArrowRight"||e.key==="ArrowDown"?1:-1);break}}}function ba(){const e=document.querySelector(".header");e&&!document.querySelector("header, [role='banner']")&&(e.setAttribute("role","banner"),e.setAttribute("data-learnable-repair","landmark"));const n=document.getElementById("sidebar");n&&!document.querySelector("nav, [role='navigation']")&&(n.setAttribute("role","navigation"),n.getAttribute("aria-label")||n.setAttribute("aria-label","Sidebar"),n.setAttribute("data-learnable-repair","landmark")),document.querySelectorAll(".hamburger").forEach(t=>{t.dataset.learnableKey!=="true"&&(t.dataset.learnableKey="true",t.tabIndex=0,t.setAttribute("role","button"),t.setAttribute("aria-label",et[v().uiLang].menu),t.setAttribute("aria-expanded",String(!document.body.classList.contains("sidebar-collapsed"))),t.setAttribute("data-learnable-repair","aria"))}),document.documentElement.dataset.learnableSavanna!=="true"&&(document.documentElement.dataset.learnableSavanna="true",document.addEventListener("keydown",ma))}const $="data-learnable-repair";function ya(e){var i,s,l,d,c;const n=(i=e.getAttribute("aria-label"))==null?void 0:i.trim();if(n)return n;const t=e.getAttribute("aria-labelledby");if(t){const h=t.split(/\s+/).map(g=>{var m;return((m=document.getElementById(g))==null?void 0:m.textContent)||""}).join(" ").replace(/\s+/g," ").trim();if(h)return h}const r=((s=e.textContent)==null?void 0:s.replace(/\s+/g," ").trim())||"";if(r)return r;const a=(d=(l=e.querySelector("img[alt]"))==null?void 0:l.getAttribute("alt"))==null?void 0:d.trim();if(a)return a;const o=(c=e.getAttribute("title"))==null?void 0:c.trim();return o||""}function K(e){return!!e.closest("learnable-player, learnable-toolbar, .learnable-gateway")}function st(e){return/[\p{L}\p{N}]/u.test(e)}function va(e){const n=[],t=document.createTreeWalker(e,NodeFilter.SHOW_TEXT);for(;t.nextNode();){const r=t.currentNode.parentElement;if(!r)continue;const a=getComputedStyle(r);a.display==="none"||a.visibility==="hidden"||n.push(t.currentNode.textContent||"")}return n.join(" ").replace(/\s+/g," ").trim()}function An(){document.querySelectorAll("a, button, [role='button']").forEach(e=>{var s,l,d;if(K(e)||e.getAttribute("aria-label")||e.getAttribute("aria-labelledby"))return;const n=((l=(s=e.querySelector("img[alt]"))==null?void 0:s.getAttribute("alt"))==null?void 0:l.trim())||"";if(st(va(e))||st(n))return;const t=(d=e.getAttribute("title"))==null?void 0:d.trim(),r=e.getAttribute("href")||"",a=r==="/"||r==="#/"||/(^|\/)home\/?$/.test(r),i=/cite_|#cite|reference/i.test(r)?"Back to reference":a?"Home":e.tagName==="A"?"Link":"Button";e.setAttribute("aria-label",(t&&st(t)?t:"")||i),e.setAttribute($,"name")}),document.querySelectorAll("input, select, textarea").forEach(e=>{var a,o,i;if(K(e)||e.getAttribute("type")==="hidden"||e.getAttribute("aria-label")||e.closest("label"))return;const n=e.getAttribute("id");if(n&&document.querySelector(`label[for="${CSS.escape(n)}"]`))return;const t=(a=e.getAttribute("placeholder"))==null?void 0:a.trim(),r=(i=(o=e.previousElementSibling)==null?void 0:o.textContent)==null?void 0:i.replace(/\s+/g," ").trim();e.setAttribute("aria-label",t||r||e.getAttribute("name")||"Input"),e.setAttribute($,"label")})}function Sn(){document.querySelectorAll("img").forEach(e=>{if(K(e)||e.hasAttribute("alt"))return;if(!!e.closest("[aria-hidden='true']")||e.className.toString().includes("icon")||e.width>0&&e.width<8)e.alt="",e.setAttribute("role","presentation");else{e.alt="Description not yet provided";const t=document.createElement("span");t.className="learnable-alt-note",t.textContent="Description not yet provided",e.after(t)}e.setAttribute($,"alt")})}function En(){document.querySelectorAll("[aria-expanded]").forEach(e=>{if(K(e))return;const n=e.getAttribute("role"),t=e.tagName;n||t==="BUTTON"||t==="A"||t==="SUMMARY"||(e.setAttribute("role","button"),e.hasAttribute("tabindex")||e.setAttribute("tabindex","0"),e.setAttribute($,"aria"))}),document.querySelectorAll("[role='progressbar']").forEach(e=>{var t,r,a;if(K(e)||ya(e))return;const n=(a=(r=(t=e.closest("div"))==null?void 0:t.parentElement)==null?void 0:r.textContent)==null?void 0:a.replace(/\s+/g," ").trim().slice(0,80);e.setAttribute("aria-label",n||"Progress"),e.setAttribute($,"aria")}),document.querySelectorAll("[aria-hidden='true']").forEach(e=>{if(K(e))return;const n=e instanceof HTMLElement?[e]:[],t=e.querySelectorAll("a, button, input, select, textarea, [tabindex]");[...n,...t].forEach(r=>{r.tabIndex>=0&&(r.tabIndex=-1),r.setAttribute($,"aria")})}),document.querySelectorAll("span[aria-label], div[aria-label]").forEach(e=>{K(e)||e.getAttribute("role")||(e.setAttribute("role","note"),e.setAttribute($,"aria"))})}function kn(){document.querySelectorAll("ul, ol").forEach(e=>{K(e)||[...e.children].forEach(n=>{if(n.tagName==="LI"||n.tagName==="SCRIPT"||n.tagName==="TEMPLATE")return;const t=document.createElement("li");n.replaceWith(t),t.append(n),t.setAttribute($,"list")})})}function lt(e){const n=e/255;return n<=.03928?n/12.92:((n+.055)/1.055)**2.4}function De(e){return .2126*lt(e[0])+.7152*lt(e[1])+.0722*lt(e[2])}function ae(e,n){const t=Math.max(De(e),De(n)),r=Math.min(De(e),De(n));return(t+.05)/(r+.05)}function Ln(e){const n=e.match(/rgba?\(([^)]+)\)/);if(!n)return null;const t=n[1].split(",").map(r=>Number.parseFloat(r.trim()));return t.length<3||t.some(r=>Number.isNaN(r))?null:[t[0],t[1],t[2],t[3]??1]}function xa(e,n){const t=e[3];return[e[0]*t+n[0]*(1-t),e[1]*t+n[1]*(1-t),e[2]*t+n[2]*(1-t),1]}function wa(e){const n=[];let t=e;for(;t;){const a=Ln(getComputedStyle(t).backgroundColor);if(a&&a[3]>0&&n.push(a),a&&a[3]>=1)break;t=t.parentElement}if(n.length===0)return[255,255,255,1];let r=n[n.length-1];for(let a=n.length-2;a>=0;a-=1)r=xa(n[a],r);return r}function ct(e,n,t){return[Math.round(e[0]+(n[0]-e[0])*t),Math.round(e[1]+(n[1]-e[1])*t),Math.round(e[2]+(n[2]-e[2])*t),1]}function Aa(e){const n=getComputedStyle(e),t=Number.parseFloat(n.fontSize),r=Number.parseInt(n.fontWeight,10)||400;return t>=24||t>=18.67&&r>=700?3:4.5}function Sa(){document.querySelectorAll("[data-learnable-repair='contrast']").forEach(e=>{e.style.removeProperty("color"),e.removeAttribute($)})}function Cn(){document.documentElement.dataset.learnableContrast!=="on"&&document.querySelectorAll("a, button, span, p, h1, h2, h3, h4, h5, h6, li, label, div, td, th, code, small, strong, b, em, i, u, abbr, acronym, font, cite, sup, sub").forEach(e=>{if(K(e)||e.getAttribute($)==="contrast"||![...e.childNodes].some(l=>{var d;return l.nodeType===Node.TEXT_NODE&&((d=l.textContent)==null?void 0:d.trim())})||e.getClientRects().length===0)return;const t=Ln(getComputedStyle(e).color);if(!t)return;const r=wa(e),a=Aa(e);if(ae(t,r)>=a)return;const o=a+.45;let i=t,s=2;for(const l of[[0,0,0],[255,255,255]]){let d=0,c=1;for(let m=0;m<10;m+=1){const f=(d+c)/2;ae(ct(t,l,f),r)>=o?c=f:d=f}let h=c,g=ct(t,l,h);for(;ae(g,r)<o&&h<1;)h=Math.min(1,h+.08),g=ct(t,l,h);ae(g,r)>=o&&h<s&&(i=g,s=h)}if(ae(i,r)<o){const l=[0,0,0,1],d=[255,255,255,1];i=ae(l,r)>=ae(d,r)?l:d}e.style.setProperty("color",`rgb(${i[0]}, ${i[1]}, ${i[2]})`,"important"),e.tagName==="A"&&e.style.setProperty("text-decoration","underline","important"),e.setAttribute($,"contrast")})}function Tn(){var t;const e=[...document.querySelectorAll("h1, h2, h3, h4, h5, h6")].filter(r=>!K(r));let n=0;for(const r of e){const a=Number(r.tagName.slice(1));!((t=r.textContent)!=null&&t.trim())&&!r.getAttribute("aria-label")&&(r.setAttribute("aria-label","Heading"),r.setAttribute($,"outline"));const o=n===0?1:Math.min(a,n+1);a>o?(r.setAttribute("aria-level",String(o)),r.setAttribute($,"outline"),n=o):n=a}}function Mn(){var o,i,s;const e=document.documentElement;if(e.lang||e.getAttribute("xml:lang"))return;const n=((o=document.body)==null?void 0:o.getAttribute("lang"))||((i=document.body)==null?void 0:i.getAttribute("xml:lang"))||"",t=document.querySelector('meta[http-equiv="content-language" i], meta[name="language" i], meta[property="og:locale" i]'),r=(t==null?void 0:t.getAttribute("content"))||"",a=(s=(n||r).split(/[,;]/)[0])==null?void 0:s.trim().replace("_","-");a&&(e.lang=a,e.dataset.learnableLangAdded="true")}function In(){document.documentElement.dataset.learnableLinkCue="on"}function Ea(){document.querySelectorAll("[data-learnable-repair]").forEach(n=>{const t=n.getAttribute($);(t==="name"||t==="label")&&n.removeAttribute("aria-label"),(t==="aria"||t==="landmark")&&n.removeAttribute("role"),t==="outline"&&(n.removeAttribute("aria-level"),n.getAttribute("aria-label")==="Heading"&&n.removeAttribute("aria-label")),t==="alt"&&n.removeAttribute("alt"),t==="contrast"&&(n.style.removeProperty("color"),n.style.removeProperty("text-decoration")),n.removeAttribute($)}),document.querySelectorAll(".learnable-skip, .learnable-alt-note, #learnable-gateway").forEach(n=>n.remove());const e=document.documentElement;e.dataset.learnableLangAdded==="true"&&(e.removeAttribute("lang"),delete e.dataset.learnableLangAdded),delete e.dataset.learnableLinkCue}function Nn(){var e;if(document.readyState!=="complete"&&document.documentElement.dataset.learnableRepairLoad!=="true"&&(document.documentElement.dataset.learnableRepairLoad="true",window.addEventListener("load",()=>Nn(),{once:!0})),(e=window.matchMedia)!=null&&e.call(window,"(forced-colors: active)").matches){Mn(),Sn(),An(),En(),kn(),Tn(),In();return}Mn(),Sn(),An(),En(),kn(),Tn(),In(),Cn()}const ka=["captions-en","captions-am","sign","describe","audio-en","audio-am","offline","braille","docs"];function La(e,n){for(const r of ka){const a=e.getAttribute(`data-learnable-${r}`);a!==null&&n.setAttribute(r,a)}const t=e.getAttribute("src");t&&!n.getAttribute("src")&&n.setAttribute("src",t)}function Rn(e){if(e.dataset.learnableUpgraded==="true"||e.closest("learnable-player"))return;e.dataset.learnableUpgraded="true";const n=document.createElement("learnable-player");La(e,n),n.hasAttribute("offline")||n.setAttribute("offline",""),n.hasAttribute("braille")||n.setAttribute("braille",""),n.hasAttribute("docs")||n.setAttribute("docs",""),n.hasAttribute("describe")||n.setAttribute("describe","/media/descriptions.vtt");const t=e.parentNode,r=e.nextSibling;e.slot="media",n.append(e),t==null||t.insertBefore(n,r)}function Ca(){Ne("media")&&(document.querySelectorAll("video, audio").forEach(e=>{e instanceof HTMLElement&&Rn(e)}),document.querySelectorAll("iframe").forEach(e=>{const n=e.getAttribute("src")||"";/youtube\.com|youtu\.be|player\.vimeo\.com|vimeo\.com/.test(n)&&e instanceof HTMLElement&&Rn(e)}))}function Ae(e){e.setAttribute("data-learnable-repair","landmark")}function dt(e,n){return e.id||(e.id=n),e.hasAttribute("tabindex")||(e.tabIndex=-1),`#${e.id}`}function Ta(){const e=document.querySelector("main, [role='main']");if(e)return dt(e,"learnable-main");const n=document.querySelector("#main, #content, [role='main']");if(n)return dt(n,n.id||"learnable-main");const t=document.querySelector("h1, h2");return t?dt(t,"learnable-top"):"#learnable-main"}function Ma(){if(!Ne("skip")||document.querySelector("a.learnable-skip, a[href='#content'], a[href='#main'], a[href='#learnable-main']"))return;const e=document.createElement("a");e.className="learnable-skip",e.href=Ta(),e.textContent=et[v().uiLang].skip,document.body.prepend(e)}function Pe(e){const n=document.querySelector(e);return n&&!n.closest("learnable-player, learnable-toolbar")?n:null}function Ia(){if(Ne("landmarks")){if(!document.querySelector("header, [role='banner']")){const e=Pe("#header, #banner, .site-header, .page-header, .header");e&&(e.setAttribute("role","banner"),Ae(e))}if(!document.querySelector("nav, [role='navigation']")){const e=Pe("#nav, #navigation, #menu, .site-nav, .nav, .navbar, .menu");e&&(e.setAttribute("role","navigation"),e.getAttribute("aria-label")||e.setAttribute("aria-label","Site"),Ae(e))}if(!document.querySelector("main, [role='main']")){const e=Pe("#main, #content, article, [role='main']");if(e&&e.tagName!=="MAIN"&&e.tagName!=="ARTICLE")e.setAttribute("role","main"),Ae(e);else if(!e){const n=document.querySelector("h1"),t=n==null?void 0:n.parentElement;t&&t!==document.body&&t!==document.documentElement&&(t.setAttribute("role","main"),Ae(t))}}if(!document.querySelector("footer, [role='contentinfo']")){const e=Pe("#footer, .site-footer, .footer");e&&(e.setAttribute("role","contentinfo"),Ae(e))}}}function Na(){return[...document.querySelectorAll("img")].filter(e=>{var n;return!e.hasAttribute("alt")||e.getAttribute("alt")===((n=e.getAttribute("src"))==null?void 0:n.split("/").pop())})}function ut(){const e=Na();if(e.length===0)return"Every image on this page has a text alternative.";const n=e.slice(0,8).map(t=>t.currentSrc||t.getAttribute("src")||"image");return`${e.length} image${e.length===1?"":"s"} need a description. Nothing was sent off this page. ${n.join(" ")}`}function Ra(){var a,o,i;if(document.getElementById("learnable-gateway"))return;const e=document.querySelector("main")||document.body,n=Le[0],t=document.createElement("section");t.id="learnable-gateway",t.className="learnable-gateway",t.setAttribute("aria-label","LearnAble lesson tools");const r=ke.chat.map(s=>`<li>${D(s.speaker)}: ${D(s.text)}</li>`).join("");t.innerHTML=`
    <h2 id="learnable-pipeline">Transcript</h2>
    <p>These are the lesson captions. English is the transcript. Amharic is the bundled translation. Nothing is sent off this page.</p>
    <div class="learnable-row">
      <button type="button" data-vtt="en">Download English VTT</button>
      <button type="button" data-vtt="am">Download Amharic VTT</button>
    </div>
    <label>Choose a text file to check against the sample lesson
      <input type="file" accept=".txt,.vtt,text/plain" data-pipeline-file />
    </label>
    <p data-pipeline-note></p>
    <h2 id="learnable-job">Job card</h2>
    <p>${D(n==null?void 0:n.title)}</p>
    <p lang="am">${D(n==null?void 0:n.titleAm)}</p>
    <p data-job-summary>${D(n==null?void 0:n.summary)}</p>
    <div class="learnable-row">
      <button type="button" data-job>Play audio summary</button>
      <button type="button" data-badge>Check certificate</button>
    </div>
    <p data-cert></p>
    <h2 id="learnable-session">Session</h2>
    <p>Recorded session chat. The captions are the lesson transcript above.</p>
    <ol>${r}</ol>
  `,e.append(t),t.querySelectorAll("[data-vtt]").forEach(s=>{s.addEventListener("click",()=>{const l=s.dataset.vtt==="am",d=ke.segments.map(h=>({start:h.start,end:h.end,text:l?h.am:h.en}));Q(new TextEncoder().encode(hn(d)),l?"captions-am.vtt":"captions-en.vtt","text/vtt");const c=t.querySelector("[data-pipeline-note]");c&&(c.textContent=l?"Amharic captions downloaded from the sample lesson.":"English captions downloaded from the sample lesson.")})}),(a=t.querySelector("[data-pipeline-file]"))==null||a.addEventListener("change",()=>{var d,c;const s=(c=(d=t.querySelector("[data-pipeline-file]"))==null?void 0:d.files)==null?void 0:c[0],l=t.querySelector("[data-pipeline-note]");!s||!l||s.text().then(h=>{const g=ke.segments.find(m=>h.includes(m.en));l.textContent=g?`Sample translation: ${g.am}`:"No translation service is running, and this text is not in the sample lesson."})}),(o=t.querySelector("[data-job]"))==null||o.addEventListener("click",()=>{var s;he(((s=t.querySelector("[data-job-summary]"))==null?void 0:s.textContent)||"","en")}),(i=t.querySelector("[data-badge]"))==null||i.addEventListener("click",()=>{const s=t.querySelector("[data-cert]");Bt().then(l=>{s&&(s.textContent=l?"The certificate proof matches the published public key.":"The certificate proof does not match.")})})}function qa(){if(Ca(),Ma(),Ia(),pa()&&ba(),Ra(),!document.getElementById("learnable-reader-live")){const e=document.createElement("p");e.id="learnable-reader-live",e.setAttribute("role","status"),document.body.append(e)}Nn(),ca()}function Da(e){var t;return(t=document.querySelector("script[src*='learnable']"))==null?void 0:t.getAttribute("data-learnable-api"),ut()}function Be(e,n,t){const r=s=>[0,2,4].map(l=>Number.parseInt(s.slice(l,l+2),16)),a=r(e.replace("#","")),o=r(n.replace("#",""));return`#${a.map((s,l)=>Math.round(s+(o[l]-s)*t)).map(s=>s.toString(16).padStart(2,"0")).join("")}`}function Pa(e,n){const r=(Math.min(10,Math.max(1,Math.round(n)))-1)/9;return e==="yb"?{bg:Be("16140c","12100c",r),fg:Be("e6c200","ffe566",r),focus:"#ffffff"}:{bg:Be("1c1c1c","121212",r),fg:Be("e6e6e6","f2f2f2",r),focus:"#ffe14a"}}const ht="learnable-host-adjust";function Ba(e){var a;const t=typeof window<"u"&&((a=window.matchMedia)==null?void 0:a.call(window,"(forced-colors: active)").matches)||e.contrastMode==="off"?null:Pa(e.contrastMode,e.contrastLevel);return`
html { scroll-padding-top: 5rem; scroll-padding-bottom: 7rem; }
:focus { scroll-margin-top: 5rem; scroll-margin-bottom: 7rem; }
:focus-visible { outline: 3px solid #0b3d91 !important; outline-offset: 3px !important; }
.learnable-skip {
  position: absolute; left: 0.5rem; top: 0.5rem; transform: translateY(-150%);
  background: #1b3048; color: #f7f4ee; padding: 0.6rem 1rem; z-index: 2147483001;
}
.learnable-skip:focus { transform: none; }
.learnable-alt-note { display: inline-block; margin-left: 0.35rem; color: #172033; background: #ffee00; padding: 0.15rem 0.4rem; }
.learnable-gateway {
  margin: 2rem 1rem; padding: 1rem; max-width: 40rem;
  background: #f2f0ea; color: #172033; border-top: 0.28rem solid #1b3048;
  font-family: "Atkinson Hyperlegible", "Noto Sans Ethiopic", sans-serif;
}
.learnable-gateway h2 { font-family: Literata, Georgia, serif; }
.learnable-gateway a, .learnable-gateway button {
  min-height: 2.75rem; color: #f7f4ee; background: #1b3048; border: 2px solid #1b3048;
  padding: 0.4rem 0.8rem;
}
.learnable-row { display: flex; flex-wrap: wrap; gap: 0.5rem; }
.learnable-dialog {
  position: fixed; z-index: 2147483003; top: 1rem; left: 50%; transform: translateX(-50%);
  width: min(32rem, calc(100vw - 1rem)); max-height: calc(100vh - 2rem); overflow: auto;
  background: #f2f0ea; color: #172033; border: 3px solid #1b3048; border-top: 0.28rem solid #1b3048;
  padding: 1rem; font-family: "Atkinson Hyperlegible", "Noto Sans Ethiopic", sans-serif;
}
.learnable-dialog h2 { font-family: Literata, Georgia, serif; font-size: 1.4rem; margin: 0 0 0.5rem; }
.learnable-dialog p, .learnable-dialog li { line-height: 1.45; }
.learnable-dialog button, .learnable-dialog input, .learnable-dialog select {
  font: inherit; min-height: 2.75rem; color: #172033; background: #f2f0ea;
}
.learnable-dialog button {
  background: #1b3048 !important; color: #f7f4ee !important; border: 2px solid #1b3048 !important;
  box-shadow: inset 0 -0.28rem 0 #ffee00; padding: 0.45rem 0.75rem; cursor: pointer;
}
.learnable-dialog label { display: flex; flex-direction: column; gap: 0.2rem; min-width: 8rem; }
.learnable-gateway input { min-height: 2.75rem; max-width: 100%; }
.learnable-sentence.is-current, .is-current {
  outline: 3px solid #0b3d91; outline-offset: 2px; background: #ffee00; color: #172033;
}
#learnable-reader-live { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }
html[data-learnable-link-cue="on"] :is(p, li, td, th, dd, dt, figcaption, blockquote, caption, div, span):not(:is(nav, header, footer, [role="navigation"], [role="banner"], [role="contentinfo"], [role="menubar"]) *) a[href]:not([role="button"]):not([class*="btn"]):not([class*="button"]) {
  text-decoration-line: underline !important;
  text-underline-offset: 0.12em;
}
html[data-learnable-text="large"] { font-size: 112.5%; }
${t?`
html[data-learnable-contrast="on"] { --la-hc-bg: ${t.bg}; --la-hc-fg: ${t.fg}; --la-hc-focus: ${t.focus}; }
html[data-learnable-contrast="on"] body,
html[data-learnable-contrast="on"] body *:not(img):not(video):not(svg):not(canvas):not(iframe):not(learnable-player):not(learnable-player *):not(learnable-toolbar):not(learnable-toolbar *) {
  background-color: var(--la-hc-bg) !important;
  color: var(--la-hc-fg) !important;
  border-color: var(--la-hc-fg) !important;
  text-shadow: none !important;
}
html[data-learnable-contrast="on"] :focus-visible { outline: 3px solid var(--la-hc-focus) !important; outline-offset: 3px !important; }
`:""}
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
  src: url("${P("/fonts/atkinson-latin-400.woff2")}") format("woff2");
  font-display: swap;
}
@font-face {
  font-family: Literata;
  src: url("${P("/fonts/literata-latin-600.woff2")}") format("woff2");
  font-display: swap;
}
@font-face {
  font-family: "Noto Sans Ethiopic";
  src: url("${P("/fonts/NotoSansEthiopic-Regular.ttf")}") format("truetype");
  font-display: swap;
}
`}function ee(e){const n=document.documentElement;n.dataset.learnableText=e.largeText?"large":"default",n.dataset.learnableMotion=e.stopMotion?"reduce":"allow";let t=document.getElementById(ht);t||(t=document.createElement("style"),t.id=ht,document.head.append(t)),t.textContent=Ba(e),n.dataset.learnableContrast=e.contrastMode==="off"?"off":"on",e.contrastMode==="off"?Cn():Sa()}function $a(){var n;(n=document.getElementById(ht))==null||n.remove();const e=document.documentElement;delete e.dataset.learnableText,delete e.dataset.learnableContrast,delete e.dataset.learnableMotion}function Fa(e){if(e.metaKey||e.ctrlKey||e.altKey)return null;switch(e.key){case" ":case"k":case"K":return{type:"toggle-play"};case"c":case"C":return{type:"cycle-captions"};case"d":case"D":return{type:"toggle-ad"};case"s":case"S":return{type:"toggle-sign"};case"ArrowLeft":return{type:"seek",by:-5};case"ArrowRight":return{type:"seek",by:5};case"j":case"J":return{type:"seek",by:-10};case"l":case"L":return{type:"seek",by:10};case"ArrowUp":return{type:"volume",by:.1};case"ArrowDown":return{type:"volume",by:-.1};case"m":case"M":return{type:"mute"};case"f":case"F":return{type:"fullscreen"};case"Home":return{type:"seek-to",to:"start"};case"End":return{type:"seek-to",to:"end"};case"?":return{type:"help"};default:return null}}function Ha(e,n,t=1){return pt(e,t)>Math.max(0,n)+.25}function pt(e,n=1){const t=e.trim().split(/\s+/).filter(Boolean).length;if(t===0)return 0;const r=Math.min(2,Math.max(.5,n));return t/(2.5*r)}function Oa(e,n=1){const t=[...e].sort((a,o)=>a.start-o.start||a.end-o.end);let r=0;return t.map(a=>{const o=Math.max(a.start,r),i=Math.max(a.end,o+.05),s=Math.max(i,o+pt(a.text,n));return r=s,{start:o,end:i,text:a.text,holdUntil:s}})}function Wa(e,n,t){if(t&&n>=t.start&&n<t.holdUntil)return null;const r=e.find(a=>n>=a.start&&n<a.holdUntil);return!r||t&&t.text===r.text&&t.start===r.start?null:r}function ft(e){return e.replace(/[^\t\n\r\x20-\x7E]/g,"?").replace(/\\/g,"\\\\").replace(/\(/g,"\\(").replace(/\)/g,"\\)")}function Ua(e,n){const t=e.split(/\s+/).filter(Boolean),r=[];let a="";for(const o of t)a?a.length+1+o.length<=n?a+=` ${o}`:(r.push(a),a=o):a=o;return a&&r.push(a),r.length>0?r:[""]}function Ga(e){const n=[{tag:"H1",text:e.title},...e.paragraphs.map(f=>({tag:"P",text:f})),{tag:"Figure",text:e.figureAlt}],t=[];let r=740;n.forEach((f,b)=>{if(f.tag==="Figure"){t.push(`/Figure <</MCID ${b}>> BDC`),t.push("0.106 0.188 0.282 RG"),t.push(`56 ${Math.max(72,r-64)} 180 56 re S`),t.push("EMC");return}const x=f.tag==="H1"?18:12,w=x+4,S=Ua(f.text,f.tag==="H1"?58:86);t.push(`/${f.tag} <</MCID ${b}>> BDC`),t.push("BT"),t.push(`/F1 ${x} Tf`),t.push(`1 0 0 1 56 ${r} Tm`),S.forEach((T,E)=>{E>0&&t.push(`0 -${w} Td`),t.push(`(${ft(T)}) Tj`)}),t.push("ET"),t.push("EMC"),r-=S.length*w+12});const a=t.join(`
`),o=n.map((f,b)=>`${8+b} 0 R`).join(" "),i=n.map((f,b)=>`${8+b} 0 R`).join(" "),s=8+n.length,l=s+1,d=[],c=f=>{d.push(f)};c("<< /Type /Catalog /Pages 3 0 R /Lang (en) /MarkInfo << /Marked true >> /ViewerPreferences << /DisplayDocTitle true >> /StructTreeRoot 2 0 R >>"),c(`<< /Type /StructTreeRoot /K 7 0 R /ParentTree ${s} 0 R >>`),c("<< /Type /Pages /Count 1 /Kids [4 0 R] >>"),c("<< /Type /Page /Parent 3 0 R /MediaBox [0 0 612 792] /Contents 5 0 R /Resources << /Font << /F1 6 0 R >> >> /StructParents 0 /Tabs /S >>"),c(`<< /Length ${a.length} >>
stream
${a}
endstream`),c("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>"),c(`<< /Type /StructElem /S /Document /P 2 0 R /Lang (en) /K [${o}] >>`),n.forEach((f,b)=>{const x=f.tag==="Figure"?` /Alt (${ft(e.figureAlt)})`:"";c(`<< /Type /StructElem /S /${f.tag} /P 7 0 R /Pg 4 0 R${x} /K << /Type /MCR /Pg 4 0 R /MCID ${b} >> >>`)}),c(`<< /Nums [ 0 [${i}] ] >>`),c(`<< /Title (${ft(e.title)}) /Author (LearnAble) >>`);let h=`%PDF-1.7
`;const g=[0];d.forEach((f,b)=>{g.push(h.length),h+=`${b+1} 0 obj
${f}
endobj
`});const m=h.length;h+=`xref
0 ${d.length+1}
`,h+=`0000000000 65535 f 
`;for(let f=1;f<g.length;f+=1)h+=`${g[f].toString().padStart(10,"0")} 00000 n 
`;return h+=`trailer
<< /Size ${d.length+1} /Root 1 0 R /Info ${l} 0 R >>
`,h+=`startxref
${m}
%%EOF`,new TextEncoder().encode(h)}function $e(e){(!Number.isFinite(e)||e<0)&&(e=0);const n=Math.floor(e),t=Math.floor(n/60),r=n%60;return`${t}:${r.toString().padStart(2,"0")}`}const ja=20,Va=80,qn=192,Dn=160,gt={x:16,y:16,width:320,height:240},Pn="learnable-embed-sign-frame";function Fe(e,n,t){return t<n?n:Math.min(t,Math.max(n,e))}function Bn(e,n){const t=Math.max(qn,n.width*.8),r=Math.max(Dn,n.height*.8),a=Fe(e.width,Math.min(qn,Math.max(1,n.width)),t),o=Fe(e.height,Math.min(Dn,Math.max(1,n.height)),r),i=Fe(e.x,n.left,n.left+Math.max(0,n.width-a)),s=Fe(e.y,n.top,n.top+Math.max(0,n.height-o));return{x:i,y:s,width:a,height:o}}function $n(e,n,t,r){return Bn({...e,x:e.x+n,y:e.y+t},r)}function mt(e){const n=Math.round(e.x),t=Math.round(e.y);return`Moved. ${n} pixels from the left, ${t} pixels from the top.`}function za(e,n){return n.width>=32&&n.height>=32?{left:0,top:0,width:n.width,height:n.height}:{left:0,top:0,width:1280,height:800}}function Ka(e,n){if(!e)return null;try{const t=e.getItem(n);if(!t)return null;const r=JSON.parse(t);return[r==null?void 0:r.x,r==null?void 0:r.y,r==null?void 0:r.width,r==null?void 0:r.height].every(o=>typeof o=="number"&&Number.isFinite(o))?{x:r.x,y:r.y,width:r.width,height:r.height}:null}catch{return null}}function Ya(e,n,t){if(e)try{e.setItem(n,JSON.stringify(t))}catch{}}function Xa(e){try{return window.matchMedia(e).matches}catch{return!1}}const Fn={model:"Suyash2205/signbridge-t5-base-asl-gloss",cues:[{en:"Hana opens her lesson on a phone in Addis Ababa.",gloss:"HANA DESC-OPEN X-SHE LESSON ON PHONE IN ADDUS ABRAHAM .",corrected:"fs-ADDIS fs-ABABA, HANA IX-3 PHONE LESSON OPEN",seconds:.786,pass:"cold"},{en:"She needs English and Amharic captions she can make larger.",gloss:"X-SHE NEED , AND AMHARAC , CAPTEXT X-SHE CAN MAKE DESC-LARGER .",corrected:"ENGLISH AMHARIC CAPTIONS, IX-3 NEED LARGER",seconds:.709,pass:"warm"},{en:"A sign window can move and grow, so Ethiopian Sign Language sits where she needs it.",gloss:"SIGN WINDOW CAN MOVE AND GROW , DESC-SO ETHIOPIAN SIGN LANGUAGE SIT WHERE X-SHE NEED X-IT .",corrected:"SIGN WINDOW, CAN MOVE GROW. ETHIOPIAN SIGN, WHERE IX-3 NEED",seconds:.942,pass:"warm"},{en:"Audio description says what the picture is doing, for a learner who cannot see it.",gloss:"AUDIO DESCRIPTION SAY WHAT PICTURE BE DO , FOR LEARNER WHO CAN DESC-NOT SEE X-IT .",corrected:"AUDIO DESCRIPTION, PICTURE DO-WHAT. LEARNER SEE-NOT, FOR IX-3",seconds:.806,pass:"warm"},{en:"When the network is slow she keeps a small pack: sound, text, and a light page.",gloss:"WHEN NETWORK BE DESC-SLOW , X-SHE KEEP DESC-SMALL PACK : SOUND , TEXT , AND LIGHT PAGE .",corrected:"NETWORK SLOW, IX-3 KEEP PACK SMALL: SOUND TEXT PAGE LIGHT",seconds:.945,pass:"warm"},{en:"The lesson on this page is the same one, with the network or without it.",gloss:"LESSON ON THIS PAGE BE DESC-SAME ONE , WITH NETWORK OR WITHOUT X-IT .",corrected:"PAGE THIS, LESSON SAME. NETWORK WITH OR WITHOUT, SAME",seconds:.699,pass:"warm"}]},_a={signs:[{match:"Hana opens",gloss:"OPEN",clip:null},{match:"captions she can make larger",gloss:"LARGER",clip:null},{match:"sign window",gloss:"SIGN",clip:null},{match:"Audio description",gloss:"SPEAK",clip:null},{match:"small pack",gloss:"PACK",clip:null},{match:"same one",gloss:"SAME",clip:null}]},bt="ASL gloss (English → ASL), not Ethiopian Sign Language",Za="Amharic captions are not turned into ASL gloss.",Ja=Fn.model;let Hn=_a.signs;function Qa(e){Hn=e.map(n=>({match:n.match,gloss:n.gloss,clip:n.clip??null})),window.dispatchEvent(new CustomEvent("learnable-settings"))}function On(e){return[...e.toUpperCase()].filter(n=>/[A-Z]/.test(n))}function Wn(e){return e.split(/\s+/).map(n=>n.replace(/^[,.:;]+|[,.:;]+$/g,"")).filter(n=>n.length>0&&!/^[,.:;]+$/.test(n))}function Un(e){return e.replace(/^(?:X-|DESC-)+/i,"").replace(/[^A-Za-z]/g,"").toUpperCase()}function eo(e){const n=e.replace(/^[,.:;]+|[,.:;]+$/g,"");if(/^fs-/i.test(n)){const o=n.replace(/^fs-/i,"").replace(/[^A-Za-z]/g,"").toUpperCase();return{token:e,key:o,clip:null,letters:On(o)}}if(/^IX(?:-\d+)?$/i.test(n))return{token:e,key:n.toUpperCase(),clip:null,letters:[]};const t=Un(n),r=Hn.find(o=>o.gloss.toUpperCase()===t),a=(r==null?void 0:r.clip)??null;return{token:e,key:t,clip:a,letters:a||!t?[]:On(t)}}function to(e){const n=e.trim(),t=Fn.cues.find(a=>a.en.trim()===n);if(!(t!=null&&t.gloss))return null;const r="corrected"in t&&typeof t.corrected=="string"?t.corrected:t.gloss;return{model:t.gloss,corrected:r}}function Gn(e){var a;const n=Wn(e).map(eo),t=((a=n.find(o=>o.clip))==null?void 0:a.clip)??null,r=n.filter(o=>!o.clip&&o.letters.length);return r.length?{spell:`Fingerspelling placeholder: ${r.map(o=>o.letters.join(" ")).join(" · ")}`,clip:t}:{spell:t?"A clip is available for a gloss token.":"",clip:t}}const jn=(e,n)=>({gloss:"",model:"",note:e,spell:"",clip:null,source:n});function Vn(e,n){if(n==="am")return jn(Za,"amharic");if(n==="off"||!e.trim())return jn("ASL gloss is shown with English captions.","off");const t=to(e);if(t){const i=Gn(t.corrected);return{gloss:t.corrected,model:t.model,note:"Corrected by hand for this demo. A Deaf ASL signer should review it. This is ASL, not Ethiopian Sign Language, and not a recorded signer.",spell:i.spell,clip:i.clip,source:"precomputed"}}const a=e.replace(/[^A-Za-z]/g," ").trim().split(/\s+/).filter(Boolean).map(i=>i.toUpperCase()).join(" "),o=Gn(a);return{gloss:a,model:"",note:"This caption has no shipped gloss, and the model is not running. These are the English words, not model output.",spell:o.spell,clip:o.clip,source:"offline"}}const no="/signs/fingerspell";function zn(e){const n=[];for(const t of Wn(e)){if(/^fs-/i.test(t)){const a=t.replace(/^fs-/i,"").replace(/[^A-Za-z]/g,"").toUpperCase();for(const o of a)n.push(Kn(o));continue}if(/^IX(?:-\d+)?$/i.test(t)){n.push({src:null,alt:"ASL point, no picture shipped",caption:t.toUpperCase(),kind:"point"});continue}const r=Un(t);for(const a of r)n.push(Kn(a))}return n}function Kn(e){return{src:`${no}/${e}.svg`,alt:`ASL fingerspelling: ${e}`,caption:e,kind:"fingerspell"}}function Yn(e){if(!e.length)return"";const n=e.filter(a=>a.kind==="fingerspell").map(a=>a.caption),t=e.filter(a=>a.kind==="point").map(a=>a.caption),r=["ASL. Fingerspelled."];return n.length&&r.push(n.join(" ")),t.length&&r.push(t.join(" ")),r.join(" ")}const ro="No Ethiopian Sign Language recording is available for this lesson yet",ao="Placeholder, not a sign language recording",Xn="Ethiopian Sign Language";function oo(e){if(!e)return!1;const n=e.split("?")[0].split("#")[0].toLowerCase();return n.endsWith("/esl-placeholder.mp4")||n.endsWith("esl-placeholder.mp4")}function yt(e){const n=(e.src||"").trim(),t=(e.signLang||"").trim().toLowerCase(),r=n===""||n==="false"||oo(n),a=e.load==="error"||e.load==="missing",o=!r&&!a,i=t==="ethiopian"&&o&&e.load==="ready";return{heading:i?Xn:bt,shortHeading:i?Xn:"ASL",videoLabel:!i&&(r||t===""||a)?ao:null,missingNotice:r||a?ro:null,showVideo:o}}const io=.3,so=500;function _n(e,n){const t=Number.isFinite(e)?e:0,r=Number.isFinite(n)?n:0;return Math.max(0,t+r)}function lo(e,n,t=0,r=io){return!Number.isFinite(e)||!Number.isFinite(n)?!1:Math.abs(n-_n(e,t))>r}function co(e,n,t,r){try{if(r==="ratechange"||r==="play"){const a=Number.isFinite(e.playbackRate)&&e.playbackRate>0?e.playbackRate:1;n.playbackRate=a}if(r==="pause"){n.pause();return}if(r==="drift"&&!lo(e.currentTime,n.currentTime,t))return;if((r==="play"||r==="seeking"||r==="seeked"||r==="drift")&&(n.currentTime=_n(e.currentTime,t)),r==="play"||r==="seeked"&&!e.paused){const a=n.play();a&&typeof a.catch=="function"&&a.catch(()=>{})}}catch{}}function uo(e,n,t){const r=c=>co(e,n,t(),c),a=()=>r("play"),o=()=>r("pause"),i=()=>r("seeking"),s=()=>r("seeked"),l=()=>r("ratechange");e.addEventListener("play",a),e.addEventListener("pause",o),e.addEventListener("seeking",i),e.addEventListener("seeked",s),e.addEventListener("ratechange",l);const d=setInterval(()=>r("drift"),so);return()=>{clearInterval(d),e.removeEventListener("play",a),e.removeEventListener("pause",o),e.removeEventListener("seeking",i),e.removeEventListener("seeked",s),e.removeEventListener("ratechange",l)}}function Zn(){if(v().stopMotion)return!0;try{return window.matchMedia("(prefers-reduced-motion: reduce)").matches}catch{return!1}}function ho(){const e=v();return e.contrastMode!=="off"||e.highContrast}const po=`
.signer { margin: 0.5rem 0.75rem; color: var(--color-ink, #172033); }
.signer-label { margin: 0 0 0.35rem; font-weight: 700; }
.signer-stage {
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 360 / 420;
  background: #f7f4ee;
  border: 2px solid var(--color-line, #172033);
  overflow: hidden;
}
.signer-skin { fill: #e4cbb8; }
.signer-cloth { fill: var(--color-navy, #1b3048); }
.signer-limb { fill: none; stroke: #e4cbb8; stroke-width: 18; stroke-linecap: round; }
.signer-joint { fill: var(--color-navy, #1b3048); }
.signer-shoulder, .signer-elbow, .signer-wrist { transition: transform 320ms ease-in-out; }
.signer-arm .signer-shoulder { transform-origin: 156px 150px; }
.signer-arm .signer-elbow { transform-origin: 92px 228px; }
.signer-arm .signer-wrist { transform-origin: 78px 156px; }
.signer-rest .signer-shoulder { transform-origin: 268px 150px; }
.signer-rest .signer-elbow { transform-origin: 312px 228px; }
.signer-arm[data-pose="0"] .signer-shoulder { transform: rotate(-6deg); }
.signer-arm[data-pose="0"] .signer-elbow { transform: rotate(4deg); }
.signer-arm[data-pose="1"] .signer-shoulder { transform: rotate(12deg); }
.signer-arm[data-pose="1"] .signer-elbow { transform: rotate(-14deg); }
.signer-arm[data-pose="1"] .signer-wrist { transform: rotate(8deg); }
.signer-arm[data-pose="2"] .signer-shoulder { transform: rotate(-14deg); }
.signer-arm[data-pose="2"] .signer-elbow { transform: rotate(16deg); }
.signer-arm[data-pose="2"] .signer-wrist { transform: rotate(-10deg); }
.signer-now { margin: 0.35rem 0 0; }
.signer-steps { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-top: 0.4rem; }
.signer-steps button { white-space: nowrap; }
:host([contrast="high"]) .signer-stage,
.signer[data-contrast="on"] .signer-stage { background: #f7f4ee; border-color: #121212; }
:host([contrast="high"]) .signer-skin,
.signer[data-contrast="on"] .signer-skin { fill: #f7f4ee; stroke: #121212; stroke-width: 2; }
:host([contrast="high"]) .signer-cloth,
.signer[data-contrast="on"] .signer-cloth { fill: #121212; }
:host([contrast="high"]) .signer-limb,
.signer[data-contrast="on"] .signer-limb { stroke: #121212; }
:host([contrast="high"]) .signer-joint,
.signer[data-contrast="on"] .signer-joint { fill: #121212; }
@media (prefers-reduced-motion: no-preference) {
  .signer:not([data-motion="reduced"]) .signer-arm { animation: signer-idle 2.8s ease-in-out infinite; }
  .signer:not([data-motion="reduced"]) .signer-rest { animation: signer-idle 3.6s ease-in-out infinite reverse; }
}
@keyframes signer-idle {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-4px); }
}
@media (prefers-reduced-motion: reduce) {
  .signer-arm, .signer-rest, .signer-shoulder, .signer-elbow, .signer-wrist { animation: none; transition: none; }
}
.signer[data-motion="reduced"] .signer-arm,
.signer[data-motion="reduced"] .signer-rest,
.signer[data-motion="reduced"] .signer-shoulder,
.signer[data-motion="reduced"] .signer-elbow,
.signer[data-motion="reduced"] .signer-wrist { animation: none; transition: none; }
`;function Jn(e){var c;if(e.querySelector("[data-signer]"))return;e.replaceChildren();const n=document.createElement("div");n.className="signer",n.dataset.signer="true";const t=document.createElement("style");t.textContent=po;const r=document.createElement("p");r.className="signer-label",r.textContent="Computer-generated signing. ASL fingerspelling.";const a=document.createElementNS("http://www.w3.org/2000/svg","svg");a.setAttribute("viewBox","0 0 360 420"),a.setAttribute("class","signer-stage"),a.setAttribute("role","img"),a.setAttribute("aria-hidden","true"),a.innerHTML=`
    <g class="signer-rest" data-rest>
      <g class="signer-shoulder">
        <path class="signer-limb" d="M268 150 L312 228"/>
        <circle class="signer-joint" cx="268" cy="150" r="7"/>
        <g class="signer-elbow">
          <path class="signer-limb" d="M312 228 L286 308"/>
          <circle class="signer-joint" cx="312" cy="228" r="7"/>
          <g class="signer-wrist">
            <ellipse class="signer-skin" cx="286" cy="324" rx="13" ry="15"/>
            <circle class="signer-joint" cx="286" cy="308" r="6"/>
          </g>
        </g>
      </g>
    </g>
    <g class="signer-body">
      <ellipse class="signer-skin" cx="210" cy="64" rx="32" ry="36"/>
      <rect class="signer-skin" x="196" y="96" width="28" height="20" rx="8"/>
      <path class="signer-cloth" d="M150 146 C178 122 246 122 274 146 L258 300 Q212 322 166 300 Z"/>
    </g>
    <g class="signer-arm" data-arm>
      <g class="signer-shoulder">
        <path class="signer-limb" d="M156 150 L92 228"/>
        <circle class="signer-joint" cx="156" cy="150" r="7"/>
        <g class="signer-elbow">
          <path class="signer-limb" d="M92 228 L78 156"/>
          <circle class="signer-joint" cx="92" cy="228" r="7"/>
          <g class="signer-wrist" data-wrist>
            <circle class="signer-joint" cx="78" cy="156" r="6"/>
          </g>
        </g>
      </g>
    </g>
  `;const o=document.createElementNS("http://www.w3.org/2000/svg","image");o.setAttribute("data-hand","true"),o.setAttribute("x","18"),o.setAttribute("y","48"),o.setAttribute("width","118"),o.setAttribute("height","148"),o.setAttribute("preserveAspectRatio","xMidYMid meet"),(c=a.querySelector("[data-wrist]"))==null||c.append(o);const i=document.createElement("p");i.className="signer-now",i.dataset.signerNow="true";const s=document.createElement("div");s.className="signer-steps",s.dataset.signerSteps="true";const l=document.createElement("button");l.type="button",l.dataset.act="sign-prev",l.textContent="Previous handshape";const d=document.createElement("button");d.type="button",d.dataset.act="sign-next",d.textContent="Next handshape",s.append(l,d),n.append(t,r,a,i,s),e.append(n)}function vt(e,n,t){Jn(e);const r=Zn(),a=e.querySelector("[data-signer]");a&&(a.dataset.motion=r?"reduced":"eased",a.dataset.contrast=ho()?"on":"off");const o=e.querySelector("[data-signer-steps]");o&&(o.hidden=!r||n.length<2);const i=e.querySelector("[data-arm]"),s=e.querySelector("[data-hand]"),l=e.querySelector("[data-signer-now]");if(!n.length){s&&(s.removeAttribute("href"),s.setAttribute("hidden","")),l&&(l.textContent="");return}const d=n[Math.max(0,Math.min(n.length-1,t))];if(i&&(i.dataset.pose=String(t%3)),s)if(d.src){const c=P(d.src);s.setAttribute("href",c),s.setAttributeNS("http://www.w3.org/1999/xlink","href",c),s.removeAttribute("hidden"),s.setAttribute("aria-label",d.alt)}else s.removeAttribute("href"),s.setAttribute("hidden","");l&&(l.textContent=d.kind==="point"?`Point. ${d.caption}`:`Fingerspelling ${d.caption}`)}const Qn=`
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
  --color-surface: #ffffff;
  --font-text: "Atkinson Hyperlegible", "Noto Sans Ethiopic", sans-serif;
  --font-display: Literata, "Noto Serif Ethiopic", Georgia, serif;
  --bar-height: 0.28rem;
  --focus-width: 3px;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --radius-sm: 0.5rem;
  --radius-md: 0.75rem;
  --radius-lg: 1rem;
  --elevation-sm: 0 2px 4px rgba(23, 32, 51, 0.08), 0 1px 2px rgba(23, 32, 51, 0.04);
  --elevation-md: 0 4px 12px rgba(23, 32, 51, 0.1), 0 2px 4px rgba(23, 32, 51, 0.06);
  --elevation-lg: 0 8px 24px rgba(23, 32, 51, 0.12), 0 4px 8px rgba(23, 32, 51, 0.06);
  --motion-fast: 120ms;
  --motion-ease: ease-out;
  color: var(--color-ink);
  font-family: var(--font-text);
  font-size: 1rem;
  line-height: 1.45;
  display: block;
  position: fixed;
  z-index: 2147483000;
  max-width: min(22rem, calc(100vw - 1rem));
  max-height: calc(100vh - 1rem);
}
:host([data-corner="bl"]) { left: 0.5rem; bottom: 0.5rem; top: auto; right: auto; }
:host([data-corner="br"]) { right: 0.5rem; bottom: 0.5rem; left: auto; top: auto; }
:host([data-corner="tl"]) { left: 0.5rem; top: 0.5rem; right: auto; bottom: auto; }
:host([data-corner="tr"]) { right: 0.5rem; top: 0.5rem; left: auto; bottom: auto; }
:host([theme="navy"]) {
  --color-paper: #1b3048;
  --color-ink: #f7f4ee;
  --color-surface: #1b3048;
}
:host([contrast="high"]),
:host-context(html[data-learnable-contrast="on"]) {
  --color-paper: var(--la-hc-bg, #121212);
  --color-ink: var(--la-hc-fg, #f2f2f2);
  --color-navy: var(--la-hc-bg, #121212);
  --color-navy-ink: var(--la-hc-fg, #f2f2f2);
  --color-line: var(--la-hc-fg, #f2f2f2);
  --color-moss: var(--la-hc-fg, #f2f2f2);
  --color-focus: var(--la-hc-focus, #ffe14a);
  --color-caption: var(--la-hc-focus, #ffe14a);
  --color-stage: var(--la-hc-bg, #121212);
  --color-muted: var(--la-hc-fg, #f2f2f2);
  --color-surface: var(--la-hc-bg, #121212);
  --elevation-sm: none;
  --elevation-md: none;
  --elevation-lg: 0 0 0 2px var(--la-hc-fg, #f2f2f2);
}
* { box-sizing: border-box; }
:focus-visible { outline: var(--focus-width) solid var(--color-focus); outline-offset: 3px; }
button {
  font: inherit;
  font-weight: 500;
  min-height: 2.75rem;
  padding: 0.5rem 1rem;
  background: var(--color-navy);
  color: var(--color-navy-ink);
  border: 2px solid var(--color-navy);
  border-radius: var(--radius-sm);
  box-shadow: var(--elevation-sm);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: background-color var(--motion-fast) var(--motion-ease),
              border-color var(--motion-fast) var(--motion-ease),
              box-shadow var(--motion-fast) var(--motion-ease),
              transform 80ms var(--motion-ease);
}
button:hover {
  background: var(--color-ink);
  border-color: var(--color-ink);
  box-shadow: var(--elevation-md);
}
button:active { transform: translateY(1px); box-shadow: none; }
button[aria-pressed="true"] {
  background: var(--color-ink);
  color: var(--color-paper);
  box-shadow: inset 0 -3px 0 var(--color-caption);
}
.media-row { display: grid; grid-template-columns: minmax(0, 1fr) 0.5rem minmax(0, var(--sign-col, 16rem)); gap: 0.5rem; align-items: start; min-width: 0; }
.sign-grip {
  position: relative;
  z-index: 6;
  cursor: col-resize;
  background: var(--color-moss);
  color: var(--color-paper);
  min-height: 2.75rem;
  min-width: max-content;
  white-space: nowrap;
  overflow-wrap: normal;
  word-break: keep-all;
  border-radius: var(--radius-sm);
  transition: background-color var(--motion-fast) var(--motion-ease);
}
.sign-grip:hover { background: color-mix(in srgb, var(--color-moss) 85%, black); }
@media (max-width: 52rem) {
  .media-row { grid-template-columns: 1fr; }
  .sign-grip { display: none; }
}
.stage {
  position: relative;
  background: var(--color-stage);
  aspect-ratio: 16 / 9;
  border-radius: var(--radius-lg);
  box-shadow: var(--elevation-lg);
  overflow: hidden;
}
video { width: 100%; height: 100%; display: block; background: var(--color-stage); object-fit: contain; }
.caption {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: var(--space-4);
  max-width: 90%;
  margin: 0;
  padding: 0.5em 1em;
  text-align: center;
  line-height: 1.4;
  border-radius: var(--radius-md);
  backdrop-filter: blur(4px);
}
.row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  align-items: center;
  padding: var(--space-3) var(--space-4);
  margin-top: var(--space-3);
  background: var(--color-surface);
  border-radius: var(--radius-md);
  box-shadow: var(--elevation-sm);
}
.row.extras { background: transparent; box-shadow: none; padding: var(--space-3) 0; }
.status {
  color: var(--color-muted);
  margin: var(--space-2) 0;
  padding: var(--space-2) var(--space-3);
  background: var(--color-paper);
  border-radius: var(--radius-sm);
  font-size: 0.875rem;
  font-variant-numeric: tabular-nums lining-nums;
}
.sign {
  max-width: 100%;
  margin-top: var(--space-3);
  border: 2px solid var(--color-moss);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  color: var(--color-ink);
  overflow: hidden;
}
.sign h2 {
  font-family: var(--font-display);
  font-size: 1rem;
  line-height: 1.35;
  font-weight: 500;
  margin: 0;
  padding: var(--space-3) var(--space-4);
  background: var(--color-navy);
  color: var(--color-navy-ink);
  overflow-wrap: anywhere;
  display: flex;
  align-items: center;
  gap: var(--space-2);
}
.sign h2::before {
  content: "";
  display: block;
  width: 6px;
  height: 20px;
  background: var(--color-navy-ink);
  opacity: 0.6;
  flex-shrink: 0;
}
.sign video {
  width: 100%;
  max-height: 9rem;
  background: var(--color-stage);
  object-fit: contain;
  border-radius: var(--radius-sm);
  margin: var(--space-2);
  width: calc(100% - var(--space-4));
}
video[data-fallback][hidden] { display: none; }
.chat { margin: 0.5rem 0; padding-left: 1.2rem; }
.bar .status, .bar .consent, .bar label { color: var(--color-navy-ink); }
.bar select, .bar a { min-height: 2.75rem; color: var(--color-ink); background: var(--color-paper); border-radius: var(--radius-sm); }
.bar a { display: inline-flex; align-items: center; padding: 0 0.75rem; text-decoration: underline; }
.sign p { margin: var(--space-3) var(--space-4); }
.gloss { font-family: var(--font-display); font-size: 1.15rem; line-height: 1.35; overflow-wrap: anywhere; }
.mark { display: block; width: 2.5rem; height: 1.1rem; border: 2px solid var(--color-navy); box-shadow: 0 var(--bar-height) 0 var(--color-caption); margin-bottom: 0.4rem; }
label {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 8rem;
  font-size: 0.875rem;
  color: var(--color-muted);
}
select, input, textarea {
  color: var(--color-ink);
  background-color: var(--color-surface);
  border: 2px solid var(--color-line);
  border-radius: var(--radius-sm);
  padding: var(--space-2);
  transition: border-color var(--motion-fast) var(--motion-ease);
}
select:hover, input:hover, textarea:hover { border-color: var(--color-navy); }
input[type="range"] {
  width: 100%;
  min-height: 2.75rem;
  -webkit-appearance: none;
  appearance: none;
  background: transparent;
  padding: 0;
  border: none;
}
input[type="range"]::-webkit-slider-runnable-track {
  height: 6px;
  background: var(--color-line);
  border-radius: 9999px;
}
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 24px;
  height: 24px;
  background: var(--color-navy);
  border-radius: 50%;
  border: 2px solid var(--color-surface);
  margin-top: -9px;
  box-shadow: var(--elevation-sm);
  transition: transform var(--motion-fast) var(--motion-ease);
}
input[type="range"]:hover::-webkit-slider-thumb { transform: scale(1.1); }
input[type="range"]::-moz-range-track {
  height: 6px;
  background: var(--color-line);
  border-radius: 9999px;
}
input[type="range"]::-moz-range-thumb {
  width: 24px;
  height: 24px;
  background: var(--color-navy);
  border-radius: 50%;
  border: 2px solid var(--color-surface);
  box-shadow: var(--elevation-sm);
}
input[type="range"]::-moz-range-progress {
  height: 6px;
  background: var(--color-navy);
  border-radius: 9999px;
}
section {
  background: var(--color-paper);
  color: var(--color-ink);
  border-radius: var(--radius-lg);
  padding: var(--space-4);
}
.launcher, .handle { min-width: 2.75rem; }
.dock { display: flex; flex-direction: column; gap: 0.35rem; align-items: flex-start; }
.bar {
  position: static;
  background: var(--color-navy);
  color: var(--color-navy-ink);
  padding: var(--space-3);
  border-radius: var(--radius-md);
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  max-width: min(22rem, calc(100vw - 1rem));
  max-height: min(70vh, calc(100vh - 4rem));
  overflow: auto;
}
@media (forced-colors: active) {
  :host, .bar, .launcher, .handle, button, a, select, input {
    background: Canvas !important; color: CanvasText !important; border-color: CanvasText !important;
  }
}
.transcript { list-style: none; margin: 0.5rem 0; padding: 0; max-height: 16rem; overflow: auto; }
.transcript button {
  background: transparent;
  color: var(--color-ink);
  border: 0;
  box-shadow: none;
  text-align: left;
  width: 100%;
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-sm);
  transition: background-color var(--motion-fast) var(--motion-ease);
}
.transcript button:hover { background: rgba(27, 48, 72, 0.06); }
.sign .row {
  background: var(--color-paper);
  border-top: 1px solid var(--color-line);
  border-radius: 0;
  margin-top: 0;
  padding: var(--space-3);
}
.sign .row button {
  background: var(--color-surface);
  color: var(--color-ink);
  border-color: var(--color-line);
  box-shadow: none;
  font-size: 0.875rem;
  padding: var(--space-2) var(--space-3);
}
.sign .row button:hover {
  background: var(--color-navy);
  color: var(--color-navy-ink);
  border-color: var(--color-navy);
}
.gloss-lines { margin: 0.5rem 0.75rem; min-width: 0; max-width: 100%; }
.gloss-lines dt { font-weight: 700; margin: 0.45rem 0 0.15rem; overflow-wrap: anywhere; }
.gloss-lines dd { margin: 0 0 0.35rem; min-width: 0; }
.sign, .sign h2, .sign p, .spell { min-width: 0; max-width: 100%; overflow-wrap: anywhere; }
.bar button {
  background: transparent;
  color: inherit;
  border-color: transparent;
  box-shadow: none;
  border-radius: var(--radius-sm);
  transition: background-color var(--motion-fast) var(--motion-ease), box-shadow var(--motion-fast) var(--motion-ease);
}
.bar button:hover { background: rgba(255, 255, 255, 0.1); box-shadow: none; }
.bar button[aria-pressed="true"] {
  box-shadow: inset 0 -3px 0 var(--color-caption);
  background: rgba(255, 238, 0, 0.15);
}
.bar button[aria-pressed="true"]::after { content: " On"; }
[hidden] { display: none !important; }
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
`;function xt(e,n,t){const r=new CustomEvent(n,{bubbles:!0,composed:!0,detail:t});e.dispatchEvent(r),window.dispatchEvent(new CustomEvent(n,{detail:t}))}class er extends HTMLElement{constructor(){super();A(this,"root");A(this,"video",null);A(this,"signClip",null);A(this,"en",[]);A(this,"am",[]);A(this,"ad",[]);A(this,"adAm",[]);A(this,"mode","en");A(this,"signOn",!0);A(this,"held",!1);A(this,"adLock",null);A(this,"adTimer",0);A(this,"built",!1);A(this,"handKey","");A(this,"handFrames",[]);A(this,"handIndex",0);A(this,"signLoad","idle");A(this,"moving",!1);A(this,"frame",{...gt});A(this,"moveTimer",0);A(this,"stopSignSync");A(this,"onHostResize",()=>{this.frame=Bn(this.frame,this.signBounds()),this.layoutSign()});A(this,"onSettings",()=>{this.applySettings()});A(this,"onSpeechCancel",()=>{this.resumeHeld()});this.root=this.attachShadow({mode:"open"})}connectedCallback(){this.built||this.mount(),this.loadTracks(),this.applySettings(),window.addEventListener("learnable-settings",this.onSettings),window.addEventListener("learnable-speech-cancel",this.onSpeechCancel),window.addEventListener("resize",this.onHostResize)}refresh(){this.built=!1,this.mount(),this.loadTracks(),this.applySettings()}disconnectedCallback(){var t;window.removeEventListener("learnable-settings",this.onSettings),window.removeEventListener("learnable-speech-cancel",this.onSpeechCancel),window.removeEventListener("resize",this.onHostResize),(t=this.stopSignSync)==null||t.call(this),window.clearTimeout(this.moveTimer),window.clearTimeout(this.adTimer),pe()}mount(){var c,h,g,m,f,b,x,w,S,T,E,M,I,L;this.built=!0;const t=qe(),r=wn(this,"sign",t.signWindow),a=wn(this,"describe",t.audioDescription),o=this.hasAttribute("offline")||t.offlinePack,i=this.hasAttribute("braille")||t.braille,s=this.hasAttribute("docs")||t.taggedDocs;this.root.innerHTML=`
      <style>${Qn}
:host { position: relative; z-index: auto; width: 100%; max-width: none; max-height: none; container-type: inline-size; }
.media-row { grid-template-columns: minmax(0, 1fr) auto minmax(16rem, 38%); }
.stage, .stage video, video { min-width: 0; max-width: 100%; }
@container (max-width: 36rem) {
  .media-row { grid-template-columns: 1fr; }
}
.sign { height: auto; overflow: visible; }
.sign-head {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  min-width: 0;
  background: var(--color-navy);
  color: var(--color-navy-ink);
  padding: 0.5rem 0.75rem;
}
.sign-head h2 {
  flex: 1 1 auto;
  min-width: 0;
  margin: 0;
  padding: 0;
  background: transparent;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  overflow-wrap: normal;
  word-break: keep-all;
}
.sign-head .sign-resize-grip,
.sign .row button,
.sign-grip {
  position: static;
  flex: 0 0 auto;
  width: auto;
  height: auto;
  min-width: max-content;
  max-width: none;
  white-space: nowrap;
  overflow-wrap: normal;
  word-break: keep-all;
  writing-mode: horizontal-tb;
}
.gloss-small { font-size: 0.95rem; }
.sign-info { margin: 0.35rem 0.75rem 0.6rem; }
.sign-info summary { cursor: pointer; min-height: 2.75rem; display: flex; align-items: center; }
.sign-float { position: absolute; z-index: 5; margin-top: 0; }
.sign-stacked.sign-float { position: static; left: auto; top: auto; width: auto; height: auto; }
.sign-drag-handle { touch-action: none; cursor: grab; }
.sign-resize-grip { position: static; width: auto; height: auto; min-width: max-content; cursor: nwse-resize; white-space: nowrap; }
.sign-missing, .sign-video-label, .sign-moved { margin: 0.5rem 0.75rem; }
.sign-move-controls { display: contents; }
.sign-stacked .sign-move-controls, .sign-move-controls[hidden] { display: none; }
@media (max-width: 52rem) {
  .sign-move-controls { display: none; }
}
.sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }
.media-error { margin: 0.5rem 0.75rem; }
.media-error a { color: var(--color-focus); }
</style>
      <section aria-label="LearnAble lesson">
        <div class="media-row">
        <div class="stage" tabindex="0" role="region" aria-label="Lesson picture. Press question mark for keyboard shortcuts.">
          <slot name="media"></slot>
          <video data-fallback playsinline preload="metadata" poster="${P("/media/poster.png")}"></video>
          <p class="caption" aria-hidden="true"></p>
          <p class="media-error" data-media-error hidden role="alert"></p>
        </div>
        <button type="button" class="sign-grip" aria-label="Resize the sign panel">Resize</button>
        ${r?`<aside class="sign" data-sign aria-label="${bt}">
                <div class="sign-head">
                  <h2 data-sign-heading class="sign-drag-handle">ASL</h2>
                  <button type="button" class="sign-resize-grip" data-sign-resize aria-label="Resize sign window">Resize</button>
                </div>
                <p class="sr" aria-live="polite" data-sign-live></p>
                <p class="sign-missing" data-sign-notice hidden></p>
                <p class="sign-video-label" data-sign-label hidden></p>
                <video data-sign-video muted playsinline preload="metadata" hidden></video>
                <div class="hands" data-hands></div>
                <p class="sign-kind" data-sign-kind></p>
                <p class="gloss gloss-small" data-gloss-corrected lang="en"></p>
                <p class="sign-note" data-sign-note></p>
                <details class="sign-info">
                  <summary>About this ASL</summary>
                  <p>${bt}. Computer-generated signing uses ASL fingerspelling. A real recording is optional. If you have one, put an H.264 file at public/media/signs/ and set its clip in src/content/signs.json. This panel does not require that file.</p>
                  <p data-model-term>Model output (${Ja})</p>
                  <p class="gloss gloss-small" data-gloss-model lang="en"></p>
                  <p>Fingerspelling drawings are public domain, from WPClipart (edited by Paul Sherman), the files Sign language A.svg through Z.svg on Wikimedia Commons. ASL-LEX is CC BY-NC, so it is not included. Lifeprint and Handspeak are not open licences, so they are not included. No lexical sign picture is shipped. Every word here is fingerspelled.</p>
                </details>
                <p class="spell" data-spell></p>
                <video data-gloss-clip muted playsinline preload="metadata" hidden></video>
                <p class="sign-moved" aria-live="polite" data-sign-moved></p>
                <div class="row">
                  <span class="sign-move-controls">
                    <button type="button" data-act="move" aria-pressed="false" aria-keyshortcuts="ArrowUp ArrowDown ArrowLeft ArrowRight">Move</button>
                  </span>
                  <button type="button" data-act="shrink">Smaller</button>
                  <button type="button" data-act="grow">Larger</button>
                  <button type="button" data-act="reset">Reset</button>
                  <button type="button" data-act="left">Narrower</button>
                  <button type="button" data-act="right">Wider</button>
                </div>
              </aside>`:""}
        </div>
        <p class="status" aria-live="polite">Paused.</p>
        <p class="time" data-time>0:00 of 0:00.</p>
        <p class="ad-live" aria-live="polite" data-ad-live></p>
        <div class="row">
          <button type="button" data-act="play">Play</button>
          <button type="button" data-act="captions">Captions: English</button>
          ${a?`<button type="button" data-act="ad" aria-pressed="${v().audioDescription}">Audio description</button>
          <fieldset data-ad-choice>
            <legend>Audio description</legend>
            <label><input type="radio" name="ad-mode" value="off" data-ad-mode="off"${v().descriptionMode==="off"?" checked":""}> Off</label>
            <label><input type="radio" name="ad-mode" value="spoken" data-ad-mode="spoken"${v().descriptionMode==="spoken"?" checked":""}> Spoken</label>
            <label><input type="radio" name="ad-mode" value="text" data-ad-mode="text"${v().descriptionMode==="text"?" checked":""}> Text for my screen reader</label>
          </fieldset>`:""}
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
        <p data-job>${(c=Le[0])==null?void 0:c.summary}</p>
        <p lang="am" data-job-am>${(h=Le[0])==null?void 0:h.summaryAm}</p>
        <p data-job-voice role="status"></p>
        <div class="row">
          <button type="button" data-act="job">Play audio summary</button>
          <button type="button" data-act="badge">Check certificate</button>
        </div>
        <h2>Session chat</h2>
        <ol class="chat">
          ${ke.chat.map(p=>`<li><span>${$e(p.time)}</span> ${p.speaker}: ${p.text}</li>`).join("")}
        </ol>
        <button type="button" data-act="txt">Download transcript text</button>
      </section>
    `,this.bindMedia();const l=this.root.querySelector(".sign-grip");l==null||l.addEventListener("pointerdown",p=>this.dragSign(p)),l==null||l.addEventListener("keydown",p=>{(p.key==="ArrowLeft"||p.key==="ArrowDown")&&this.nudge("left"),(p.key==="ArrowRight"||p.key==="ArrowUp")&&this.nudge("right"),p.key==="Home"&&this.setSignColumn(12),p.key==="End"&&this.setSignColumn(24)}),(g=this.root.querySelector("[data-sign-heading]"))==null||g.addEventListener("pointerdown",p=>this.dragFrame(p)),(m=this.root.querySelector("[data-sign-resize]"))==null||m.addEventListener("pointerdown",p=>this.resizeFramePointer(p)),(f=this.root.querySelector("[data-act=move]"))==null||f.addEventListener("keydown",p=>this.onMoveKey(p)),this.signClip=this.root.querySelector("[data-sign-video]"),(b=this.signClip)==null||b.addEventListener("loadeddata",()=>{this.signLoad="ready",this.applySignPresentation(),this.bindSignSync()}),(x=this.signClip)==null||x.addEventListener("error",()=>{this.signLoad="error",this.signClip&&(this.signClip.hidden=!0),this.applySignPresentation(),this.bindSignSync()}),this.frame=Ka(this.storage(),Pn)??{...gt},this.layoutSign(),this.applySignSource();const d=this.root.querySelector(".stage");d==null||d.addEventListener("keydown",p=>this.onKey(p)),this.root.querySelectorAll("button[data-act]").forEach(p=>{p.addEventListener("click",()=>this.onAction(p.dataset.act||""))}),this.root.addEventListener("click",p=>{const u=p.target instanceof Element?p.target.closest("button[data-act]"):null;u instanceof HTMLButtonElement&&(u.dataset.act==="sign-prev"&&this.stepHand(-1),u.dataset.act==="sign-next"&&this.stepHand(1))}),this.root.querySelectorAll("[data-ad-mode]").forEach(p=>{p.addEventListener("change",()=>{if(!p.checked)return;const u=p.value==="text"||p.value==="spoken"?p.value:"off";this.applyDescriptionMode(u)})}),(w=this.root.querySelector("[data-act=size]"))==null||w.addEventListener("input",p=>{const u=Number(p.target.value);C({captionScale:u}),this.styleCaption(u,v().captionPreset)}),(S=this.root.querySelector("[data-act=preset]"))==null||S.addEventListener("change",p=>{const u=p.target.value;C({captionPreset:u}),this.styleCaption(v().captionScale,u)}),(T=this.video)==null||T.addEventListener("timeupdate",()=>this.sync()),(E=this.video)==null||E.addEventListener("seeking",()=>{this.adLock=null,window.clearTimeout(this.adTimer),pe()}),(M=this.video)==null||M.addEventListener("error",()=>this.showMediaError()),(I=this.video)==null||I.addEventListener("play",()=>{this.clearMediaError(),this.setPlayLabel(!0),this.setStatus("Playing."),xt(this,"learnable-play",{playing:!0})}),(L=this.video)==null||L.addEventListener("pause",()=>{this.setPlayLabel(!1),this.held||this.setStatus("Paused."),xt(this,"learnable-play",{playing:!1})})}bindMedia(){const t=this.querySelector("video, audio"),r=this.root.querySelector("[data-fallback]");if(t instanceof HTMLMediaElement&&t.slot==="media")this.video=t,r&&(r.hidden=!0),t.setAttribute("playsinline",""),t instanceof HTMLVideoElement&&!t.getAttribute("poster")&&(t.poster=P("/media/poster.png"));else if(r){this.video=r;const o=this.getAttribute("src");o&&(r.src=P(o))}this.ensureDescriptionTrack();const a=this.querySelector("iframe");a&&(a.getAttribute("title")||a.setAttribute("title","Embedded lesson video"),a.getAttribute("sandbox")||a.setAttribute("sandbox","allow-scripts allow-same-origin allow-presentation"))}signColumn(){const t=this.root.querySelector(".media-row"),r=Number.parseFloat((t==null?void 0:t.style.getPropertyValue("--sign-col"))||"16");return Number.isFinite(r)?r:16}setSignColumn(t){const r=this.root.querySelector(".media-row");r&&r.style.setProperty("--sign-col",`${Math.min(28,Math.max(10,t))}rem`)}dragSign(t){if(t.button!==0)return;const r=t.currentTarget;if(!(r instanceof HTMLElement))return;const a=t.clientX,o=this.signColumn(),i=l=>this.setSignColumn(o+(a-l.clientX)/16),s=()=>{r.removeEventListener("pointermove",i),r.removeEventListener("pointerup",s)};r.setPointerCapture(t.pointerId),r.addEventListener("pointermove",i),r.addEventListener("pointerup",s)}async loadTracks(){this.en=await this.fetchCues(this.getAttribute("captions-en")),this.am=await this.fetchCues(this.getAttribute("captions-am")),this.ad=await this.fetchCues(this.getAttribute("describe"));const t=this.getAttribute("descriptions-am")||(this.getAttribute("describe")&&this.getAttribute("describe")!=="false"?"/media/descriptions-am.vtt":null);this.adAm=await this.fetchCues(t);const r=this.root.querySelector("[data-sign]");r&&(r.hidden=!this.signOn),this.renderTranscript(),this.sync()}renderTranscript(){const t=this.root.querySelector(".transcript");if(!t)return;const r=this.en.length?this.en:this.am;t.replaceChildren();for(const a of r){const o=document.createElement("li"),i=document.createElement("button");i.type="button",i.dataset.seek=String(a.start),i.textContent=`${$e(a.start)} ${a.text}`,i.addEventListener("click",()=>{this.video&&(this.video.currentTime=a.start)}),o.append(i),t.append(o)}}async fetchCues(t){if(!t||t==="false")return[];try{const r=await Ge(P(t));return r.ok?oa(await r.text()):[]}catch{return[]}}applySettings(){const t=v();this.mode=t.lang,t.contrastMode!=="off"||t.highContrast?this.setAttribute("contrast","high"):this.removeAttribute("contrast"),this.setAttribute("theme",da());const r=this.root.querySelector("[data-act=preset]"),a=this.root.querySelector("[data-act=size]");r&&(r.value=t.captionPreset),a&&(a.value=String(t.captionScale)),this.styleCaption(t.captionScale,t.captionPreset),this.root.querySelectorAll("[data-ad-mode]").forEach(i=>{i.checked=i.value===t.descriptionMode});const o=this.root.querySelector("[data-act=ad]");o&&o.setAttribute("aria-pressed",String(t.descriptionMode!=="off")),this.sync()}ensureDescriptionTrack(){if(!(this.video instanceof HTMLVideoElement))return;const t=this.getAttribute("describe");if(!t||t==="false")return;const r=P(t);let a=this.video.querySelector("track[kind='descriptions']");a||(a=document.createElement("track"),a.kind="descriptions",a.label="Audio description",a.srclang="en",this.video.append(a)),a.getAttribute("src")!==r&&(a.src=r);const o=this.getAttribute("descriptions-am")||"/media/descriptions-am.vtt";let i=this.video.querySelector("track[data-descriptions-am]");i||(i=document.createElement("track"),i.kind="descriptions",i.label="Amharic audio description",i.srclang="am",i.dataset.descriptionsAm="true",this.video.append(i));const s=P(o);i.getAttribute("src")!==s&&(i.src=s)}resumeHeld(){!this.held||!this.video||(this.held=!1,this.video.play().catch(()=>{}))}styleCaption(t,r){const a=this.root.querySelector(".caption"),o=bn[r]??bn.white;a&&(a.style.color=o.fg,a.style.background=o.bg,a.style.fontSize=`${t}rem`)}setPlayLabel(t){const r=this.root.querySelector("[data-act=play]");r&&(r.textContent=t?"Pause":"Play");const a=this.root.querySelector("[data-time]");a&&this.video&&(a.textContent=`${$e(this.video.currentTime)} of ${$e(this.video.duration||0)}.`)}paintHands(t,r){const a=this.root.querySelector("[data-hands]");if(!a)return;if(!t.length){a.replaceChildren(),this.handKey="",this.handFrames=[],this.handIndex=0;return}const o=t.map(i=>i.alt).join("|");if(o!==this.handKey&&(this.handKey=o,this.handFrames=t,this.handIndex=0),!Zn()&&r&&this.handFrames.length&&this.video){const i=Math.max(.2,r.end-r.start),s=Math.min(.999,Math.max(0,(this.video.currentTime-r.start)/i));this.handIndex=Math.floor(s*this.handFrames.length)}vt(a,this.handFrames,this.handIndex)}stepHand(t){if(!this.handFrames.length)return;const r=this.handFrames.length;this.handIndex=(this.handIndex+t+r)%r;const a=this.root.querySelector("[data-hands]");a&&vt(a,this.handFrames,this.handIndex)}sync(){if(!this.video)return;const t=this.video.currentTime,r=this.mode==="am"?this.am:this.mode==="en"?this.en:[],a=this.mode==="off"?void 0:ia(r,t),o=this.root.querySelector(".caption");o&&(o.textContent=(a==null?void 0:a.text)??"",o.setAttribute("lang",this.mode==="am"?"am":"en"));const i=Vn((a==null?void 0:a.text)||"",this.mode),s=i.gloss?zn(i.gloss):[];this.paintHands(s,a);const l=this.root.querySelector("[data-gloss-corrected]"),d=this.root.querySelector("[data-gloss-model]"),c=this.root.querySelector("[data-model-term]");l&&(l.textContent=i.source==="precomputed"?`Corrected by hand. ${i.gloss}`:i.gloss),d&&(d.textContent=i.model),c&&(c.hidden=!i.model);const h=this.root.querySelector("[data-sign-kind]");h&&(h.textContent=s.length?"Fingerspelled. These drawings are handshapes, not recorded signs.":"");const g=this.root.querySelector("[data-sign-note]");g&&(g.textContent=i.source==="precomputed"?"":i.note);const m=this.root.querySelector("[data-sign-live]"),f=i.source==="amharic"?i.note:Yn(s);m&&m.textContent!==f&&(m.textContent=f);const b=this.root.querySelector("[data-spell]");b&&(b.textContent=s.length?"":i.spell);const x=this.root.querySelector("[data-gloss-clip]");if(x)if(i.clip){x.hidden=!1;const S=P(i.clip);x.getAttribute("src")!==S&&(x.src=S,x.play().catch(()=>{}))}else x.hidden||(x.pause(),x.hidden=!0);this.deliverDescription();const w=this.root.querySelector("[data-act=captions]");w&&(w.textContent=this.mode==="off"?"Captions: off":this.mode==="am"?"Captions: Amharic":"Captions: English"),this.setPlayLabel(!this.video.paused)}onKey(t){const r=Fa(t);r&&(t.preventDefault(),r.type==="toggle-play"&&this.toggle(),r.type==="cycle-captions"&&this.cycleCaptions(),r.type==="toggle-ad"&&this.toggleAd(),r.type==="toggle-sign"&&this.toggleSign(),r.type==="seek"&&this.video&&(this.video.currentTime=Math.max(0,this.video.currentTime+r.by)),r.type==="seek-to"&&this.video&&(this.video.currentTime=r.to==="start"?0:this.video.duration||0),r.type==="mute"&&this.video&&(this.video.muted=!this.video.muted),r.type==="volume"&&this.video&&(this.video.volume=Math.min(1,Math.max(0,this.video.volume+r.by))))}async toggle(){var t,r;if(this.video)try{if(this.video.paused){if(await this.video.play(),(t=this.signClip)!=null&&t.getAttribute("src"))try{this.signClip.play().catch(()=>{})}catch{}}else{this.video.pause();try{(r=this.signClip)==null||r.pause()}catch{}}}catch{this.showMediaError("The video did not play. Captions are still listed when the file loads.")}}showMediaError(t){var s,l,d,c;const r=this.root.querySelector("[data-media-error]");if(!r)return;const a=(l=(s=this.video)==null?void 0:s.error)==null?void 0:l.code,o=a===3?"The browser could not decode this video.":a===4?"This video format is not supported.":a===2?"The video file did not load.":t||"The video did not play.",i=((d=this.video)==null?void 0:d.currentSrc)||((c=this.video)==null?void 0:c.getAttribute("src"))||"";if(r.hidden=!1,r.replaceChildren(),r.append(document.createTextNode(`${o} `)),i){const h=document.createElement("a");h.href=i,h.download="",h.textContent="Download the video",r.append(h)}this.setStatus(o)}clearMediaError(){const t=this.root.querySelector("[data-media-error]");t&&(t.hidden=!0,t.replaceChildren())}cycleCaptions(){this.mode=this.mode==="off"?"en":this.mode==="en"?"am":"off",this.sync(),this.setStatus(this.mode==="off"?"Captions off.":this.mode==="am"?"Amharic captions on.":"English captions on."),xt(this,"learnable-captions",{lang:this.mode})}applyDescriptionMode(t){C({descriptionMode:t,audioDescription:t!=="off"}),this.adLock=null,window.clearTimeout(this.adTimer),t!=="spoken"&&pe(),t==="off"&&this.resumeHeld();const r=this.root.querySelector("[data-ad-live]");r&&t!=="text"&&(r.textContent="");const a=this.root.querySelector("[data-act=ad]");a&&a.setAttribute("aria-pressed",String(t!=="off")),this.setStatus(t==="off"?"Audio description off.":t==="text"?"Audio description as text.":"Audio description on."),this.sync()}toggleAd(){const t=v().descriptionMode,r=t==="off"?"spoken":t==="spoken"?"text":"off";this.applyDescriptionMode(r)}descriptionCues(){return v().lang==="am"&&this.adAm.length?this.adAm:this.ad}deliverDescription(){if(!this.video)return;const t=v(),r=this.root.querySelector("[data-ad-live]");if(t.descriptionMode==="off"){this.adLock=null,r&&(r.textContent="");return}if(this.video.paused&&!this.held)return;const a=Oa(this.descriptionCues(),t.readRate),o=Wa(a,this.video.currentTime,this.adLock);if(!o)return;this.adLock={text:o.text,start:o.start,holdUntil:o.holdUntil};const i=Ha(o.text,Math.max(0,o.end-o.start),t.readRate),s=t.lang==="am"&&this.adAm.length?"am":"en";if(i&&!this.video.paused&&(this.held=!0,this.video.pause()),t.descriptionMode==="text"){pe(),r&&(r.lang=s,r.textContent=o.text),i&&(window.clearTimeout(this.adTimer),this.adTimer=window.setTimeout(()=>this.resumeHeld(),pt(o.text,t.readRate)*1e3));return}r&&(r.textContent=""),he(o.text,s,t.readRate,{pitch:t.readPitch,onend:()=>this.resumeHeld(),oncancel:()=>this.resumeHeld()})}nudge(t){const r=t==="left"||t==="shrink"?-2:2;this.setSignColumn(this.signColumn()+r)}scaleSign(t){this.setSignColumn(this.signColumn()+t*2)}signLang(){return(this.getAttribute("sign-lang")||"").trim().toLowerCase()}signOffset(){const t=Number(this.getAttribute("sign-offset"));return Number.isFinite(t)?t:0}storage(){try{return window.localStorage}catch{return null}}signBounds(){const t=this.getBoundingClientRect();return t.width>=32&&t.height>=32?{left:0,top:0,width:t.width,height:t.height}:za(null,{width:window.innerWidth||0,height:window.innerHeight||0})}signStacked(){if(Xa("(max-width: 52rem)"))return!0;const t=this.getBoundingClientRect().width;return t>0&&t<=576}persistFrame(){Ya(this.storage(),Pn,this.frame)}layoutSign(){const t=this.root.querySelector(".sign");if(!t)return;const r=this.signStacked();t.classList.toggle("sign-stacked",r),t.classList.remove("sign-float");const a=this.root.querySelector(".sign-move-controls");a&&(a.hidden=r),t.style.left="",t.style.top="",t.style.width="",t.style.height=""}applySignSource(){this.signClip=this.root.querySelector("[data-sign-video]");const t=this.getAttribute("sign"),r=yt({src:t,signLang:this.signLang(),load:"idle"});if(this.signLoad=r.showVideo?"loading":"idle",this.signClip){if(this.signClip.muted=!0,!r.showVideo)this.signClip.removeAttribute("src"),this.signClip.hidden=!0;else if(t){const a=P(t);this.signClip.getAttribute("src")!==a&&(this.signClip.src=a),this.signClip.hidden=!1}}this.applySignPresentation(),this.bindSignSync()}applySignPresentation(){const t=yt({src:this.getAttribute("sign"),signLang:this.signLang(),load:this.signLoad}),r=this.root.querySelector("[data-sign-heading]");r&&(r.textContent=t.shortHeading);const a=this.root.querySelector("[data-sign]");a&&a.setAttribute("aria-label",t.heading);const o=this.root.querySelector("[data-sign-notice]");o&&(o.hidden=!t.missingNotice,o.textContent=t.missingNotice??"");const i=this.root.querySelector("[data-sign-label]");i&&(i.hidden=!t.videoLabel,i.textContent=t.videoLabel??""),this.signClip&&(this.signClip.hidden=!t.showVideo)}bindSignSync(){var r;(r=this.stopSignSync)==null||r.call(this),this.stopSignSync=void 0;const t=yt({src:this.getAttribute("sign"),signLang:this.signLang(),load:this.signLoad});!this.video||!this.signClip||!t.showVideo||(this.stopSignSync=uo(this.video,this.signClip,()=>this.signOffset()))}enterMove(){var t;this.moving=!0,(t=this.root.querySelector("[data-act=move]"))==null||t.setAttribute("aria-pressed","true")}exitMove(t=!0){var a;if(this.moving=!1,window.clearTimeout(this.moveTimer),(a=this.root.querySelector("[data-act=move]"))==null||a.setAttribute("aria-pressed","false"),!t)return;const r=this.root.querySelector("[data-sign-moved]");r&&(r.textContent=mt(this.frame))}nudgeFrameBy(t,r){this.frame=$n(this.frame,t,r,this.signBounds()),this.persistFrame(),this.layoutSign(),window.clearTimeout(this.moveTimer),this.moveTimer=window.setTimeout(()=>{const a=this.root.querySelector("[data-sign-moved]");a&&(a.textContent=mt(this.frame))},800)}onMoveKey(t){if(t.key==="Escape"){t.preventDefault(),this.moving&&this.exitMove();return}if(t.key==="Enter"||t.key===" "){t.preventDefault(),this.moving?this.exitMove():this.enterMove();return}if(!this.moving)return;const r=t.shiftKey?Va:ja;let a=0,o=0;if(t.key==="ArrowLeft")a=-r;else if(t.key==="ArrowRight")a=r;else if(t.key==="ArrowUp")o=-r;else if(t.key==="ArrowDown")o=r;else return;t.preventDefault(),this.nudgeFrameBy(a,o)}dragFrame(t){if(this.signStacked()||t.button!==0)return;const r=t.currentTarget;if(!(r instanceof HTMLElement))return;const a=t.clientX,o=t.clientY,i={...this.frame},s=d=>{this.frame=$n(i,d.clientX-a,d.clientY-o,this.signBounds()),this.layoutSign()},l=()=>{r.removeEventListener("pointermove",s),r.removeEventListener("pointerup",l),this.persistFrame();const d=this.root.querySelector("[data-sign-moved]");d&&(d.textContent=mt(this.frame))};r.setPointerCapture(t.pointerId),r.addEventListener("pointermove",s),r.addEventListener("pointerup",l)}resizeFramePointer(t){if(t.button!==0)return;t.preventDefault(),t.stopPropagation();const r=t.currentTarget;if(!(r instanceof HTMLElement))return;const a=t.clientX,o=this.signColumn(),i=l=>{this.setSignColumn(o+(l.clientX-a)/16)},s=()=>{r.removeEventListener("pointermove",i),r.removeEventListener("pointerup",s),this.persistFrame()};r.setPointerCapture(t.pointerId),r.addEventListener("pointermove",i),r.addEventListener("pointerup",s)}toggleSign(){this.signOn=!this.signOn;const t=this.root.querySelector("[data-sign]");t&&(t.hidden=!this.signOn);const r=this.root.querySelector("[data-act=sign]");r&&r.setAttribute("aria-pressed",String(this.signOn)),this.setStatus(this.signOn?"Sign window opened.":"Sign window closed.")}setStatus(t){const r=this.root.querySelector(".status");r&&(r.textContent=t)}textOf(t){return t.map(r=>r.text).join(`
`)}async onAction(t){if(t==="play"&&this.toggle(),t==="captions"&&this.cycleCaptions(),t==="ad"&&this.applyDescriptionMode(v().descriptionMode==="off"?"spoken":"off"),t==="sign"&&this.toggleSign(),(t==="left"||t==="right"||t==="up"||t==="down")&&this.nudge(t),(t==="shrink"||t==="grow")&&this.scaleSign(t==="grow"?1:-1),t==="move"&&(this.moving?this.exitMove():this.enterMove()),t==="reset"&&(this.frame={...gt},this.persistFrame(),this.setSignColumn(16),this.layoutSign()),t==="pack")try{const r=await Qr({english:this.textOf(this.en),amharic:this.textOf(this.am),descriptions:this.textOf(this.ad),audioEn:this.optionalUrl("audio-en"),audioAm:this.optionalUrl("audio-am")});Q(r.bytes,"learnable-3g-pack.zip","application/zip"),this.setStatus(r.audio?"3G pack downloaded, with narration and text.":"Text pack downloaded. Narration files were not beside the video.")}catch(r){this.setStatus(r instanceof Error?r.message:"The pack could not be built.")}if(t==="braille"){const r=this.mode==="am"?"am":"en",a=r==="am"?this.textOf(this.am):this.textOf(this.en);Q(new TextEncoder().encode(Je(a)),`lesson-${r}.brf`,"text/plain"),this.setStatus("Braille file downloaded.")}if(t==="pdf"){try{const a=await Ge(P(this.getAttribute("pdf")||"/media/learnable-lesson.pdf"));if(a.ok){Q(new Uint8Array(await a.arrayBuffer()),"learnable-lesson.pdf","application/pdf"),this.setStatus("Tagged PDF downloaded, with Amharic and the picture description.");return}}catch{}const r=Ga({title:"LearnAble lesson",paragraphs:this.en.map(a=>a.text),figureAlt:"Lesson picture with English and Amharic captions."});Q(r,"learnable-lesson.pdf","application/pdf"),this.setStatus("Tagged PDF downloaded. Amharic stays in the captions.")}if(t==="html"){const r=this.en.map(i=>`<h2>${i.text}</h2>`).join(""),a=this.am.map(i=>`<p lang="am">${i.text}</p>`).join(""),o=`<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><title>LearnAble lesson</title></head><body><main><h1>LearnAble lesson</h1><p>Picture: A navy phone on a paper background, with an English and Amharic caption under the screen.</p>${r}${a}</main></body></html>`;Q(new TextEncoder().encode(o),"learnable-lesson.html","text/html"),this.setStatus("HTML text version downloaded, with the picture description.")}if(t==="txt"){const r=`English
${this.textOf(this.en)}

Amharic
${this.textOf(this.am)}
`;Q(new TextEncoder().encode(r),"learnable-transcript.txt","text/plain"),this.setStatus("Transcript text downloaded.")}if(t==="vtt-en"||t==="vtt-am"){const r=t==="vtt-am"?this.am:this.en;Q(new TextEncoder().encode(hn(r)),t==="vtt-am"?"captions-am.vtt":"captions-en.vtt","text/vtt"),this.setStatus(t==="vtt-am"?"Amharic captions downloaded.":"English captions downloaded.")}if(t==="job"){const r=v().lang==="am"?"am":"en",a=Le[0],o=r==="am"?a==null?void 0:a.summaryAm:a==null?void 0:a.summary,i=this.root.querySelector("[data-job-voice]");if(r==="am"&&await aa("am")!=="ready"){i&&(i.textContent="No Amharic voice is available on this device. The Amharic summary stays on this page.");return}i&&(i.textContent=""),he(o,r),this.setStatus(r==="am"?"Playing the Amharic job summary on this device.":"Playing the job summary on this device.")}if(t==="badge"){const r=await Bt();this.setStatus(r?"The certificate proof matches the published public key.":"The certificate proof does not match.")}}optionalUrl(t){const r=this.getAttribute(t);if(!(!r||r==="false"))return P(r)}}let fe=[],He=0,te=!1,wt=!1;function oe(e){const n=document.getElementById("learnable-reader-live");n&&(n.textContent=e)}function fo(){document.querySelectorAll(".learnable-sentence").forEach(e=>{e.replaceWith(document.createTextNode(e.textContent||""))}),document.querySelectorAll(".is-current").forEach(e=>e.classList.remove("is-current")),wt=!1,fe=[]}function go(e){const n=document.createTreeWalker(e,NodeFilter.SHOW_TEXT),t=[];for(;n.nextNode();)t.push(n.currentNode);const r=[];return t.forEach(a=>{const o=a.parentElement;if(!o||o.closest("script, style, learnable-player, learnable-toolbar, .learnable-gateway, .learnable-sentence"))return;const i=(a.textContent||"").split(new RegExp("(?<=[.!?])\\s+")).filter(l=>l.trim());if(i.length===0)return;const s=document.createDocumentFragment();i.forEach(l=>{const d=document.createElement("span");d.className="learnable-sentence",d.textContent=l,s.append(d,document.createTextNode(" ")),r.push(d)}),a.replaceWith(s)}),wt=!0,r}function mo(){const e=document.querySelector("main");if(!e)return[];const n=v().readVerbosity;return n==="headings"?[...e.querySelectorAll("h1, h2, h3")]:n==="links"?[...e.querySelectorAll("a")]:wt?[...e.querySelectorAll(".learnable-sentence")]:go(e)}function bo(){var n;!v().haptics||!("vibrate"in navigator)||(n=navigator.vibrate)==null||n.call(navigator,20)}function tr(){var r,a;(r=window.speechSynthesis)==null||r.cancel();const e=fe[He];if(fe.forEach(o=>o.classList.remove("is-current")),!e){te=!1,oe("Reading stopped.");return}e.classList.add("is-current"),e.scrollIntoView({block:"nearest"});const n=v(),t=new SpeechSynthesisUtterance(e.textContent||"");t.rate=n.readRate,t.pitch=n.readPitch,t.lang=document.documentElement.lang||"en",t.onend=()=>{te&&(He+=1,tr())},oe(`Reading ${He+1} of ${fe.length}.`),bo(),(a=window.speechSynthesis)==null||a.speak(t)}function yo(){if(!window.speechSynthesis){oe("This browser has no speech synthesis. Nothing was spoken.");return}if(fe=mo(),fe.length===0){oe("There is no text to read in the main region.");return}te=!0,tr()}function vo(){var e;te=!1,(e=window.speechSynthesis)==null||e.cancel(),oe("Reading paused.")}function At(){var e;te=!1,He=0,(e=window.speechSynthesis)==null||e.cancel(),fo(),oe("Reading stopped. The page text is unchanged.")}function xo(){te&&At()}window.addEventListener("learnable-speech-cancel",()=>{te&&(te=!1,oe("Reading paused."))});const wo={en:{button:"Button",link:"Link",heading:"Heading",level:"level",image:"Image",paragraph:"Paragraph",navigation:"Navigation",main:"Main",banner:"Banner",contentinfo:"Content info",region:"Region",search:"Search",complementary:"Complementary",checkbox:"Checkbox",slider:"Slider",combobox:"List",textbox:"Text field",pressed:"pressed",notPressed:"not pressed",checked:"checked",notChecked:"not checked",expanded:"expanded",collapsed:"collapsed",disabled:"disabled",current:"current"},am:{button:"ቁልፍ",link:"ማገናኛ",heading:"ርዕስ",level:"ደረጃ",image:"ምስል",paragraph:"አንቀጽ",navigation:"አሰሳ",main:"ዋና",banner:"ራስጌ",contentinfo:"ግርጌ",region:"ክልል",search:"ፍለጋ",complementary:"ተጨማሪ",checkbox:"ሳጥን",slider:"ተንሸራታች",combobox:"ዝርዝር",textbox:"የጽሑፍ ሳጥን",pressed:"ተጭኗል",notPressed:"አልተጫነም",checked:"ተመርጧል",notChecked:"አልተመረጠም",expanded:"ተከፍቷል",collapsed:"ተዘግቷል",disabled:"ተሰናክሏል",current:"የአሁኑ"}};function Ao(e){var t;return(((t=e.closest("[lang]"))==null?void 0:t.getAttribute("lang"))||document.documentElement.lang||"en").toLowerCase().startsWith("am")?"am":"en"}function So(e){const n=e.getAttribute("role");if(n)return n;const t=e.tagName;return t==="A"&&e.hasAttribute("href")?"link":t==="BUTTON"?"button":/^H[1-6]$/.test(t)?"heading":t==="IMG"?"image":t==="NAV"?"navigation":t==="MAIN"?"main":t==="HEADER"?"banner":t==="FOOTER"?"contentinfo":t==="ASIDE"?"complementary":t==="P"?"paragraph":t==="SELECT"?"combobox":t==="TEXTAREA"?"textbox":t==="SECTION"&&(e.hasAttribute("aria-label")||e.hasAttribute("aria-labelledby"))?"region":e instanceof HTMLInputElement?e.type==="checkbox"||e.type==="radio"?"checkbox":e.type==="range"?"slider":e.type==="button"||e.type==="submit"?"button":"textbox":""}function Eo(e){var a,o;const n=e.getAttribute("aria-labelledby");if(n){const i=n.split(/\s+/).map(s=>{var l;return((l=document.getElementById(s))==null?void 0:l.textContent)||""}).join(" ").replace(/\s+/g," ").trim();if(i)return i}const t=(a=e.getAttribute("aria-label"))==null?void 0:a.trim();if(t)return t;if(e instanceof HTMLImageElement)return tt(e)||e.alt.trim();if(e instanceof HTMLInputElement||e instanceof HTMLSelectElement||e instanceof HTMLTextAreaElement){const i=e.id,s=i?document.querySelector(`label[for="${CSS.escape(i)}"]`):null,l=e.closest("label"),d=((s==null?void 0:s.textContent)||(l==null?void 0:l.textContent)||"").replace(/\s+/g," ").trim();if(d)return d}const r=(e.innerText||e.textContent||"").replace(/\s+/g," ").trim();return r?r.slice(0,280):((o=e.getAttribute("title"))==null?void 0:o.trim())||""}function ko(e,n){const r=[...e.querySelectorAll("img")].map(a=>tt(a)).filter(a=>!!(a&&!n.includes(a)));return r.length===0?n:[n,...r].filter(Boolean).join(". ")}function Lo(e){if(e===document.body||e===document.documentElement)return null;const n=So(e);if(!n&&e.tagName!=="P")return null;const t=Ao(e),r=wo[t],a=r[n]||n;let o=ko(e,Eo(e));if(n==="heading"){const h=e.getAttribute("aria-level")||e.tagName.slice(1);o=`${r.level} ${h}, ${o}`.trim()}const i=[],s=e.getAttribute("aria-pressed");s==="true"&&i.push(r.pressed),s==="false"&&i.push(r.notPressed);const l=e.getAttribute("aria-checked")??(e instanceof HTMLInputElement&&e.type==="checkbox"?String(e.checked):null);l==="true"&&i.push(r.checked),l==="false"&&i.push(r.notChecked);const d=e.getAttribute("aria-expanded");d==="true"&&i.push(r.expanded),d==="false"&&i.push(r.collapsed),(e.hasAttribute("disabled")||e.getAttribute("aria-disabled")==="true")&&i.push(r.disabled),e.hasAttribute("aria-current")&&e.getAttribute("aria-current")!=="false"&&i.push(r.current);const c=[a,o,...i].filter(Boolean).join(", ");return c.trim()?{text:c,lang:t}:null}function St(e){return e.composedPath().some(n=>n instanceof HTMLElement?n.isContentEditable?!0:n.tagName==="INPUT"||n.tagName==="TEXTAREA"||n.tagName==="SELECT":!1)}function Co(e){return e.composedPath().some(n=>n instanceof HTMLElement&&n.tagName==="LEARNABLE-PLAYER")}function Et(e,n){return e.altKey||e.ctrlKey||e.metaKey?!1:n==="?"?e.key==="?":e.key.toLowerCase()===n.toLowerCase()}function nr(e,n){const t=n.split("+").map(s=>s.trim().toLowerCase()).filter(Boolean);if(t.length===0)return!1;const r=t[t.length-1],a=t.includes("alt"),o=t.includes("shift"),i=t.includes("ctrl")||t.includes("control");return a!==e.altKey||o!==e.shiftKey||i!==(e.ctrlKey||e.metaKey)?!1:e.key.toLowerCase()===r}const ie="learnable-voice-prompt",ge="learnable-help";let rr=!1,kt=0,Lt=null;function Oe(e){const n=document.getElementById("learnable-reader-live");n&&(n.textContent="",n.textContent=e)}function To(){var n,t;const e=(t=(n=document.querySelector("learnable-toolbar"))==null?void 0:n.shadowRoot)==null?void 0:t.querySelector("[data-act=voice]");e==null||e.focus()}function ar(e,n){if(n.key!=="Tab")return;const t=[...e.querySelectorAll("button, a[href], input, select, textarea")].filter(i=>!i.hasAttribute("disabled"));if(t.length===0)return;const r=t[0],a=t[t.length-1],o=e.contains(document.activeElement)?document.activeElement:null;n.shiftKey&&(o===r||!o)?(n.preventDefault(),a.focus()):!n.shiftKey&&o===a&&(n.preventDefault(),r.focus())}function Se(e,n){var t;C({voice:e,voiceChosen:!0,...n==="prompt"?{audioDescription:e,descriptionMode:e?"spoken":"off"}:{}}),(t=document.getElementById(ie))==null||t.remove(),Oe(e?"LearnAble voice on.":"LearnAble voice off."),e?he("LearnAble voice on.","en",v().readRate):pe(),n==="prompt"&&(kt=0,To())}function Mo(){var n,t,r;if(v().voiceChosen||document.getElementById(ie)||!document.body)return;const e=document.createElement("div");e.id=ie,e.className="learnable-dialog",e.tabIndex=-1,e.setAttribute("role","alertdialog"),e.setAttribute("aria-modal","true"),e.setAttribute("aria-labelledby","learnable-voice-title"),e.setAttribute("aria-describedby","learnable-voice-desc"),e.innerHTML=`
    <h2 id="learnable-voice-title">LearnAble voice</h2>
    <p id="learnable-voice-desc">LearnAble can speak the control, heading, or picture you move to. If you already use a screen reader, turn this voice off so the two do not talk at once. Some browsers speak only after the first click or key. Choosing here unlocks that. Escape turns the voice off.</p>
    <div class="learnable-row">
      <button type="button" data-voice="keep">Keep LearnAble voice</button>
      <button type="button" data-voice="reader">I use my own screen reader (turn LearnAble voice off)</button>
    </div>
  `,(n=e.querySelector("[data-voice=keep]"))==null||n.addEventListener("click",()=>Se(!0,"prompt")),(t=e.querySelector("[data-voice=reader]"))==null||t.addEventListener("click",()=>Se(!1,"prompt")),document.body.append(e),(r=e.querySelector("[data-voice=keep]"))==null||r.focus()}function Io(){const e=v().keys;return`
    <li>Tab and Shift+Tab move through the page. The skip link is first.</li>
    <li>${D(e.heading.toUpperCase())} next heading. Shift+${D(e.heading.toUpperCase())} previous heading.</li>
    <li>${D(e.landmark.toUpperCase())} next landmark. Shift+${D(e.landmark.toUpperCase())} previous landmark.</li>
    <li>${D(e.help)} opens this help. Escape closes it and returns focus.</li>
    <li>${D(e.voice)} toggles LearnAble voice. The LearnAble voice button does the same. This chord is not an NVDA, JAWS, Orca, VoiceOver, or Chrome shortcut. On some Mac layouts it types a character in a text field, so it does not run there.</li>
    <li>Alt+Shift+L opens the LearnAble tools and focuses the first control. Escape closes them and returns focus.</li>
    <li>Picture frame, while it is focused: Space or K play, C captions, D audio description, S sign panel, arrows seek, J and L move further. L is landmarks everywhere else.</li>
    <li>NVDA and JAWS browse mode take H and L before the page sees them. That is expected.</li>
    <li>Single-letter keys do nothing in a text field, and they can be turned off or changed below.</li>
  `}function or(e){var a,o,i;if(document.getElementById(ie))return;Lt=e??(document.activeElement instanceof HTMLElement?document.activeElement:null),(a=document.getElementById(ge))==null||a.remove();const n=v().keys,t=document.createElement("div");t.id=ge,t.className="learnable-dialog",t.tabIndex=-1,t.setAttribute("role","dialog"),t.setAttribute("aria-modal","true"),t.setAttribute("aria-labelledby","learnable-help-title"),t.innerHTML=`
    <h2 id="learnable-help-title">Keyboard shortcuts</h2>
    <ul>${Io()}</ul>
    <div class="learnable-row">
      <label>Heading key <input data-map="heading" value="${We(n.heading)}" maxlength="8" /></label>
      <label>Landmark key <input data-map="landmark" value="${We(n.landmark)}" maxlength="8" /></label>
      <label>Help key <input data-map="help" value="${We(n.help)}" maxlength="8" /></label>
      <label>Voice shortcut <input data-map="voice" value="${We(n.voice)}" maxlength="32" /></label>
    </div>
    <div class="learnable-row">
      <button type="button" data-help="close">Close shortcuts</button>
    </div>
  `,t.querySelectorAll("[data-map]").forEach(s=>{s.addEventListener("change",()=>{const l=s.dataset.map,d=s.value.trim();d&&C({keys:{...v().keys,[l]:d}})})});const r=()=>ir();(o=t.querySelector("[data-help=close]"))==null||o.addEventListener("click",r),document.body.append(t),(i=t.querySelector("[data-help=close]"))==null||i.focus()}function ir(){var n;(n=document.getElementById(ge))==null||n.remove();const e=Lt;Lt=null,e==null||e.focus()}function No(e){if(e.closest(`#${ie}, #${ge}, [hidden]`))return!1;const n=getComputedStyle(e);return n.display!=="none"&&n.visibility!=="hidden"}function Ro(e){(!e.matches("a[href], button, input, select, textarea, summary, [tabindex]")||e.tabIndex<0)&&(e.tabIndex=-1),e.focus()}function sr(e,n){const t=[...document.querySelectorAll(e)].filter(No),r=[...new Set(t)];if(r.length===0)return;const a=document.activeElement instanceof HTMLElement?document.activeElement:null;let o=r.findIndex(s=>s===a||s.contains(a));o<0&&(o=n>0?-1:0);const i=r[(o+n+r.length)%r.length];Ro(i)}const qo="header, [role='banner'], nav, [role='navigation'], main, [role='main'], footer, [role='contentinfo'], aside, [role='complementary'], [role='search'], form[aria-label], form[aria-labelledby], section[aria-label], section[aria-labelledby]";function Do(e){if(performance.now()>kt)return;const n=e.composedPath()[0];if(!(n instanceof HTMLElement)||n.closest(`#${ie}, #${ge}`))return;const t=v();if(!t.voice||!t.voiceChosen)return;const r=Lo(n);r&&he(r.text,r.lang,t.readRate,{pitch:t.readPitch})}function Po(e){kt=performance.now()+800,an();const n=v(),t=document.getElementById(ie),r=document.getElementById(ge);if(t&&ar(t,e),r&&ar(r,e),nr(e,"Alt+Shift+L")&&!St(e)){e.preventDefault(),e.stopPropagation(),window.dispatchEvent(new CustomEvent("learnable-open-tools"));return}if(nr(e,n.keys.voice)&&!St(e)){e.preventDefault(),e.stopPropagation(),Se(!v().voice,"toggle");return}if(pe(),window.dispatchEvent(new CustomEvent("learnable-speech-cancel")),e.key==="Escape"){if(t){e.preventDefault(),Se(!1,"prompt");return}if(r){e.preventDefault(),e.stopPropagation(),ir();return}xo()}if(!(t||r)&&!(St(e)||!n.keyboard)){if(Et(e,n.keys.help)){e.preventDefault(),e.stopPropagation(),or(document.activeElement instanceof HTMLElement?document.activeElement:null);return}Co(e)||(Et(e,n.keys.heading)?(e.preventDefault(),sr("h1, h2, h3, h4, h5, h6",e.shiftKey?-1:1)):Et(e,n.keys.landmark)&&(e.preventDefault(),sr(qo,e.shiftKey?-1:1)))}}function Bo(){an(),ta()}function We(e){return e.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;")}function $o(){if(document.getElementById("learnable-reader-live")||!document.body)return;const e=document.createElement("p");e.id="learnable-reader-live",e.setAttribute("role","status"),e.setAttribute("aria-live","polite"),document.body.append(e)}function Fo(){$o(),Mo(),!rr&&(rr=!0,Oe("LearnAble loaded. Press Alt+Shift+L for accessibility tools."),document.addEventListener("keydown",Po,!0),document.addEventListener("focusin",Do,!0),document.addEventListener("pointerdown",Bo,!0))}const Ho=["tl","tr","bl","br"];function lr(e,n){return e.left<n.right&&e.right>n.left&&e.top<n.bottom&&e.bottom>n.top}class Oo extends HTMLElement{constructor(){super();A(this,"root");A(this,"built",!1);A(this,"open",!0);A(this,"returnFocus",null);this.root=this.attachShadow({mode:"open"})}connectedCallback(){var a,o,i,s,l,d,c,h,g,m,f,b,x,w,S,T,E,M,I,L,p;if(this.built)return;this.built=!0,this.root.innerHTML=`
      <style>${Qn}</style>
      <button type="button" class="launcher" data-act="launcher" aria-expanded="false" aria-controls="learnable-panel">LearnAble</button>
      <div class="dock">
      <button type="button" class="handle" data-act="move" aria-label="Move LearnAble. Arrow keys move it. The corner buttons place it without dragging.">Move</button>
      <div class="bar" id="learnable-panel" role="toolbar" aria-label="LearnAble display" aria-orientation="horizontal">
        <button type="button" data-act="voice" aria-pressed="true" aria-keyshortcuts="Alt+Shift+S">LearnAble voice</button>
        <button type="button" data-act="sign-selection">Sign selection</button>
        <button type="button" data-act="describe" aria-pressed="true">Audio description</button>
        <button type="button" data-key="largeText" aria-pressed="false">Larger text</button>
        <button type="button" data-key="stopMotion" aria-pressed="false">Stop motion</button>
        <label>Contrast
          <select data-key="contrastMode">
            <option value="off">Off</option>
            <option value="bw">Black and white</option>
            <option value="yb">Yellow on black</option>
          </select>
        </label>
        <label>Contrast strength
          <input data-key="contrastLevel" type="range" min="1" max="10" step="1" value="7" />
          <span data-contrast-value>7</span>
        </label>
        <button type="button" data-act="read-play">Play reading</button>
        <button type="button" data-act="read-pause">Pause reading</button>
        <button type="button" data-act="read-stop">Stop reading</button>
        <label>Speech speed <input data-key="readRate" type="range" min="0.6" max="1.6" step="0.1" value="1" /></label>
        <label>Speech pitch <input data-key="readPitch" type="range" min="0.8" max="1.4" step="0.1" value="1" /></label>
        <label>Verbosity
          <select data-key="readVerbosity">
            <option value="sentences">Sentences</option>
            <option value="headings">Headings</option>
            <option value="links">Links</option>
          </select>
        </label>
        <label class="consent"><input type="checkbox" data-key="haptics" /> Vibration on Android, off until checked</label>
        <button type="button" data-act="images">Image check</button>
        <a href="#learnable-pipeline">Transcript</a>
        <a href="#learnable-job">Job card</a>
        <a href="#learnable-session">Session</a>
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
        <button type="button" data-act="keys" aria-pressed="true">Keyboard shortcuts</button>
        <button type="button" data-act="help">Keyboard help</button>
        <button type="button" data-act="collapse">Minimise</button>
        <button type="button" data-corner="tl">Top left</button>
        <button type="button" data-corner="tr">Top right</button>
        <button type="button" data-corner="bl">Bottom left</button>
        <button type="button" data-corner="br">Bottom right</button>
      </div>
      </div>
    `,this.root.querySelectorAll("button[data-key]").forEach(u=>{u.addEventListener("click",()=>{const y=u.dataset.key,O=v(),F=C({[y]:!O[y]});ee(F),this.reflect()})}),(a=this.root.querySelector("[data-key=captionScale]"))==null||a.addEventListener("input",u=>{const y=C({captionScale:Number(u.target.value)});ee(y)}),(o=this.root.querySelector("[data-key=captionPreset]"))==null||o.addEventListener("change",u=>{const y=C({captionPreset:u.target.value});ee(y)}),(i=this.root.querySelector("[data-key=uiLang]"))==null||i.addEventListener("change",u=>{C({uiLang:u.target.value==="am"?"am":"en"}),this.reflect()}),(s=this.root.querySelector("[data-key=contrastMode]"))==null||s.addEventListener("change",u=>{const y=u.target.value,O=C({contrastMode:y==="bw"||y==="yb"?y:"off"});ee(O),this.reflect()}),(l=this.root.querySelector("[data-key=contrastLevel]"))==null||l.addEventListener("input",u=>{const y=C({contrastLevel:Number(u.target.value)});ee(y),this.reflect()}),(d=this.root.querySelector("[data-key=readRate]"))==null||d.addEventListener("input",u=>{C({readRate:Number(u.target.value)})}),(c=this.root.querySelector("[data-key=readPitch]"))==null||c.addEventListener("input",u=>{C({readPitch:Number(u.target.value)})}),(h=this.root.querySelector("[data-key=readVerbosity]"))==null||h.addEventListener("change",u=>{const y=u.target.value;C({readVerbosity:y==="headings"||y==="links"?y:"sentences"})}),(g=this.root.querySelector("[data-key=haptics]"))==null||g.addEventListener("change",u=>{C({haptics:u.target.checked})}),(m=this.root.querySelector("[data-act=read-play]"))==null||m.addEventListener("click",()=>yo()),(f=this.root.querySelector("[data-act=read-pause]"))==null||f.addEventListener("click",()=>vo()),(b=this.root.querySelector("[data-act=read-stop]"))==null||b.addEventListener("click",()=>At()),this.root.addEventListener("keydown",u=>{u instanceof KeyboardEvent&&u.key==="Escape"&&At()}),(x=this.root.querySelector("[data-act=voice]"))==null||x.addEventListener("click",()=>{Se(!v().voice,"toggle")}),(w=this.root.querySelector("[data-act=describe]"))==null||w.addEventListener("click",()=>{const u=v().descriptionMode,y=u==="off"?"spoken":u==="spoken"?"text":"off";C({descriptionMode:y,audioDescription:y!=="off"}),Oe(y==="off"?"Audio description off.":y==="text"?"Audio description as text.":"Audio description on.")}),(S=this.root.querySelector("[data-act=keys]"))==null||S.addEventListener("click",()=>{const u=!v().keyboard;C({keyboard:u}),Oe(u?"Keyboard shortcuts on.":"Keyboard shortcuts off. The buttons still work.")}),(T=this.root.querySelector("[data-act=help]"))==null||T.addEventListener("click",u=>{or(u.currentTarget instanceof HTMLElement?u.currentTarget:null)}),window.addEventListener("learnable-settings",()=>this.reflect()),(E=this.root.querySelector("[data-act=images]"))==null||E.addEventListener("click",()=>{var O;const u=((O=this.root.querySelector("[data-act=consent]"))==null?void 0:O.checked)===!0,y=this.root.querySelector("[data-note]");y&&(y.textContent=u?Da():ut())});const t=v();this.open=t.toolbarVisited?!t.toolbarCollapsed:!1,t.toolbarVisited||C({toolbarVisited:!0,toolbarCollapsed:!0}),this.place(t.toolbarCorner),(M=this.root.querySelector("[data-act=launcher]"))==null||M.addEventListener("click",()=>this.setOpen(!0)),(I=this.root.querySelector("[data-act=collapse]"))==null||I.addEventListener("click",()=>this.setOpen(!1)),this.root.querySelectorAll("[data-corner]").forEach(u=>{u.addEventListener("click",()=>this.place(u.dataset.corner,!0))});const r=this.root.querySelector("[data-act=move]");r==null||r.addEventListener("pointerdown",u=>this.drag(u)),r==null||r.addEventListener("keydown",u=>this.moveByKey(u)),(L=this.root.querySelector(".bar"))==null||L.addEventListener("keydown",u=>this.rove(u)),document.addEventListener("focusin",u=>this.avoid(u)),window.addEventListener("learnable-open-tools",()=>{const u=document.activeElement;u instanceof HTMLElement&&!this.contains(u)&&(this.returnFocus=u),this.setOpen(!0)}),this.addEventListener("keydown",u=>{if(u.key!=="Escape"||!this.open)return;u.preventDefault();const y=this.returnFocus;this.returnFocus=null,this.setOpen(!1),y&&document.contains(y)&&y.focus()}),(p=this.root.querySelector("[data-act=sign-selection]"))==null||p.addEventListener("click",()=>{window.dispatchEvent(new CustomEvent("learnable-sign-selection"))}),this.paint(),this.reflect()}controls(){return[...this.root.querySelectorAll(".bar button, .bar a[href], .bar select, .bar input")]}setOpen(t){this.open=t,C({toolbarCollapsed:!t,toolbarVisited:!0}),this.paint();const r=t?this.root.querySelector("[data-act=move]"):this.root.querySelector("[data-act=launcher]");r==null||r.focus()}place(t,r=!1){Ho.includes(t)&&(this.dataset.corner=t,this.style.left="",this.style.top="",this.style.right="",this.style.bottom="",r&&C({toolbarCorner:t}))}drag(t){if(t.button!==0)return;const r=t.currentTarget;if(!(r instanceof HTMLElement))return;const a=t.clientX,o=t.clientY,i=this.getBoundingClientRect(),s=d=>{const c=Math.min(window.innerWidth-48,Math.max(0,i.left+d.clientX-a)),h=Math.min(window.innerHeight-48,Math.max(0,i.top+d.clientY-o));this.dataset.corner="free",this.style.left=`${c}px`,this.style.top=`${h}px`,this.style.right="auto",this.style.bottom="auto"},l=()=>{r.removeEventListener("pointermove",s),r.removeEventListener("pointerup",l)};r.setPointerCapture(t.pointerId),r.addEventListener("pointermove",s),r.addEventListener("pointerup",l)}moveByKey(t){if(!t.key.startsWith("Arrow"))return;t.preventDefault(),t.stopPropagation();const r=this.getBoundingClientRect(),a=24,o=r.left+(t.key==="ArrowLeft"?-a:t.key==="ArrowRight"?a:0),i=r.top+(t.key==="ArrowUp"?-a:t.key==="ArrowDown"?a:0);this.dataset.corner="free",this.style.left=`${Math.min(window.innerWidth-48,Math.max(0,o))}px`,this.style.top=`${Math.min(window.innerHeight-48,Math.max(0,i))}px`,this.style.right="auto",this.style.bottom="auto"}rove(t){const r=t.composedPath()[0];if(!(r instanceof HTMLElement)||r.closest("input, select, textarea")||r.dataset.act==="move")return;const a=this.controls(),o=a.indexOf(r);if(o<0)return;let i=o;if(t.key==="ArrowRight"||t.key==="ArrowDown")i=(o+1)%a.length;else if(t.key==="ArrowLeft"||t.key==="ArrowUp")i=(o-1+a.length)%a.length;else if(t.key==="Home")i=0;else if(t.key==="End")i=a.length-1;else return;t.preventDefault(),a.forEach((s,l)=>s.setAttribute("tabindex",l===i?"0":"-1")),a[i].focus()}avoid(t){const r=t.composedPath()[0];if(!(r instanceof HTMLElement)||t.composedPath().includes(this))return;const a=r.getBoundingClientRect();if(a.width===0&&a.height===0||!lr(this.getBoundingClientRect(),a))return;const o=["tr","tl","br","bl"];for(const i of o)if(this.place(i),!lr(this.getBoundingClientRect(),r.getBoundingClientRect())){C({toolbarCorner:i});return}r.style.scrollMargin="5rem",r.scrollIntoView({block:"nearest",inline:"nearest"})}paint(){const t=this.root.querySelector("[data-act=launcher]"),r=this.root.querySelector(".dock");t&&(t.hidden=this.open,t.setAttribute("aria-expanded",String(this.open))),r&&(r.hidden=!this.open),this.open&&this.controls().forEach((o,i)=>o.setAttribute("tabindex",i===0?"0":"-1"))}reflect(){const t=v();this.root.querySelectorAll("button[data-key]").forEach(T=>{const E=T.dataset.key;T.setAttribute("aria-pressed",String(t[E]))});const r=et[t.uiLang];this.root.querySelector("[data-key=largeText]").textContent=r.larger,this.root.querySelector("[data-key=stopMotion]").textContent=r.stop;const a=this.root.querySelector("[data-act=images]");a&&(a.textContent=r.images);const o=this.root.querySelector("[href='#learnable-pipeline']"),i=this.root.querySelector("[href='#learnable-job']"),s=this.root.querySelector("[href='#learnable-session']");o&&(o.textContent=r.pipeline),i&&(i.textContent=r.job),s&&(s.textContent=r.session);const l=this.root.querySelector("[data-key=captionScale]"),d=this.root.querySelector("[data-key=captionPreset]"),c=this.root.querySelector("[data-key=uiLang]");l&&(l.value=String(t.captionScale)),d&&(d.value=t.captionPreset),c&&(c.value=t.uiLang);const h=this.root.querySelector("[data-key=contrastMode]"),g=this.root.querySelector("[data-key=contrastLevel]"),m=this.root.querySelector("[data-contrast-value]");h&&(h.value=t.contrastMode),g&&(g.value=String(t.contrastLevel)),m&&(m.textContent=String(t.contrastLevel));const f=this.root.querySelector("[data-key=haptics]");f&&(f.checked=t.haptics);const b=this.root.querySelector("[data-act=voice]"),x=this.root.querySelector("[data-act=describe]"),w=this.root.querySelector("[data-act=keys]");b&&(b.setAttribute("aria-pressed",String(t.voice)),b.setAttribute("aria-keyshortcuts",t.keys.voice)),x&&x.setAttribute("aria-pressed",String(t.audioDescription)),w&&w.setAttribute("aria-pressed",String(t.keyboard));const S=document.querySelector(".learnable-skip");S&&(S.textContent=r.skip),t.contrastMode!=="off"?this.setAttribute("contrast","high"):this.removeAttribute("contrast")}}function Wo(){var t;const e=((t=window.getSelection())==null?void 0:t.toString().replace(/\s+/g," ").trim())||"";return e.length>1?e.slice(0,280):((document.querySelector("main")||document.body).textContent||"").replace(/\s+/g," ").trim().slice(0,280)}function Uo(){let e=document.getElementById("learnable-text-sign");if(e)return e;e=document.createElement("section"),e.id="learnable-text-sign",e.setAttribute("aria-label","Computer-generated signing for the selected text");const n=document.createElement("h2");n.textContent="Computer-generated signing";const t=document.createElement("p");t.dataset.textNote="true";const r=document.createElement("div");r.dataset.hands="true";const a=document.createElement("p");return a.dataset.gloss="true",e.append(n,t,r,a),document.body.append(e),e}function Go(){const e=Wo(),n=Vn(e,"en"),t=zn(n.gloss),r=Uo(),a=r.querySelector("[data-text-note]");a&&(a.textContent="Computer-generated signing. ASL fingerspelling. This is not Ethiopian Sign Language.");const o=r.querySelector("[data-gloss]");o&&(o.textContent=n.gloss);const i=r.querySelector("[data-hands]");i&&(Jn(i),vt(i,t,0));const s=document.getElementById("learnable-reader-live"),l=Yn(t)||"No text to sign.";s&&(s.textContent=l),e&&he(e.slice(0,280),"en")}function jo(){window.addEventListener("learnable-sign-selection",()=>Go())}xr(document.currentScript instanceof HTMLScriptElement?document.currentScript:null);const Ct=U&&U.tagName.toUpperCase()==="SCRIPT"&&U.src||new URL("learnable.js",document.baseURI).href;Ct&&Ct!==new URL("learnable.js",document.baseURI).href&&wr(Ct);let cr=!1,se=null;function dr(){customElements.get("learnable-player")||customElements.define("learnable-player",er),customElements.get("learnable-toolbar")||customElements.define("learnable-toolbar",Oo)}function Vo(){const e=document.querySelector("script[src*='learnable']"),n=e==null?void 0:e.getAttribute("data-learnable-enhance"),t=document.documentElement.dataset.learnableEnhance,r=e==null?void 0:e.getAttribute("data-learnable-lang"),a=e==null?void 0:e.getAttribute("data-learnable-voice");return{enhance:!(t==="off"||n==="false"||n==="off"),lang:r==="am"||r==="en"?r:void 0,assetBase:(e==null?void 0:e.getAttribute("data-learnable-base"))||void 0,voice:a==="on"||a==="off"?a:void 0}}function zo(){var e;if(!Ne("toolbar")||!qe().toolbar||document.documentElement.dataset.learnableToolbar==="page"){se==null||se.remove(),se=null;return}document.querySelector("learnable-toolbar")||(se=document.createElement("learnable-toolbar"),se.dataset.auto="true",(e=document.body)==null||e.append(se))}function ur(e={}){const n=Vo(),t=e.enhance!==void 0?e.enhance:n.enhance;ua({...n,...e,enhance:t}),Ar(e.assetBase||n.assetBase),dr(),ee(v()),zo(),t!==!1&&qa(),Fo(),jo(),document.querySelectorAll("learnable-player").forEach(r=>{r instanceof er&&r.refresh()}),cr=!0,window.dispatchEvent(new CustomEvent("learnable-ready",{detail:{settings:v(),features:qe()}}))}function Tt(){const e=xn();C(e),ur()}function hr(e={}){return ur(e),Mt}function pr(){const e=ha();return $a(),ee(e),e}const Mt={init:hr,boot:Tt,reset:pr,getSettings:v,setSettings(e){const n=C(e);return ee(n),n},getFeatures:qe,clearRepairs:Ea,setSignDictionary(e){Qa(e)},version:"0.4.0"};if(typeof window<"u"){window.LearnAble=Mt,dr();const e=()=>{cr||Tt()};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e):e()}return W.boot=Tt,W.default=Mt,W.init=hr,W.reset=pr,Object.defineProperties(W,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}}),W})({});typeof LearnAble<"u"&&LearnAble.default&&(window.LearnAble=LearnAble.default);
//# sourceMappingURL=learnable.js.map
