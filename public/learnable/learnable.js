var LearnAble=(function(F){"use strict";var xa=Object.defineProperty;var wa=(F,H,O)=>H in F?xa(F,H,{enumerable:!0,configurable:!0,writable:!0,value:O}):F[H]=O;var I=(F,H,O)=>wa(F,typeof H!="symbol"?H+"":H,O);let H="",O="";function kn(e){e!=null&&e.src&&(H=new URL(".",e.src).href)}function Sn(e){e&&(O=new URL(e,document.baseURI).href,O.endsWith("/")||(O+="/"))}function En(){return O||H||new URL("/",document.baseURI).href}function N(e){return!e||e==="false"||/^(https?:|data:|blob:)/i.test(e)?e:e.startsWith("/")?new URL(e,document.baseURI).href:new URL(e,En()).href}const we={segments:[{start:0,end:5.19,en:"Hana opens her lesson on a phone in Addis Ababa.",am:"ሃና ትምህርቷን በአዲስ አበባ በስልኳ ትከፍታለች።",ad:"A phone is drawn on a paper-coloured screen, with a short caption under it.",gloss:"OPEN"},{start:5.19,end:11.702,en:"She needs English and Amharic captions she can make larger.",am:"የእንግሊዝኛ እና የአማርኛ ጽሑፍ መግለጫዎችን ማተለቅ ትፈልጋለች።",ad:"The caption bar grows taller. The letters are yellow on a black band.",gloss:"LARGER"},{start:11.702,end:22.036,en:"A sign window can move and grow, so Ethiopian Sign Language sits where she needs it.",am:"የምልክት መስኮቱን ማንቀሳቀስና ማተለቅ ትችላለች። የኢትዮጵያ የምልክት ቋንቋ የምትፈልገውን ቦታ ይይዛል።",ad:"A second window lifts off the phone. It is labelled Ethiopian Sign Language.",gloss:"SIGN"},{start:22.036,end:28.919,en:"Audio description says what the picture is doing, for a learner who cannot see it.",am:"የድምጽ መግለጫ ሥዕሉ ምን እንደሚያደርግ ይናገራል። ለማያየው ተማሪ ነው።",ad:"A round speaker icon appears beside the phone.",gloss:"SPEAK"},{start:28.919,end:36.761,en:"When the network is slow she keeps a small pack: sound, text, and a light page.",am:"ኔትወርኩ ሲዘገይ ትንሽ ጥቅል ታስቀምጣለች። ድምጽ፣ ጽሑፍ፣ እና ቀላል ገጽ።",ad:"The phone is replaced by a short stack of pages and a sound file.",gloss:"PACK"},{start:36.761,end:43.179,en:"The lesson on this page is the same one, with the network or without it.",am:"በዚህ ገጽ ላይ ያለው ትምህርት አንድ ነው። ኔትወርክ ቢኖርም ባይኖርም።",ad:"The stack of pages stays in the centre of the screen.",gloss:"SAME"}],chat:[{time:.4,speaker:"Facilitator",text:"We are watching together. Captions are on."},{time:5.590000000000001,speaker:"Hana",text:"Please make the Amharic text larger."},{time:12.102,speaker:"Facilitator",text:"Move the sign window if it covers the caption."},{time:22.436,speaker:"Yonas",text:"I will turn on audio description."},{time:29.319,speaker:"Hana",text:"I am saving the small pack before the network drops."},{time:37.161,speaker:"Facilitator",text:"The text page matches what you just heard."}]},ft=[{id:"caption-partner",title:"Caption partner",titleAm:"የንዑስ ጽሑፍ አጋር",org:"Bole Open Classroom",place:"Addis Ababa",time:"Part time",access:"The summary is on the card, and the same words can be spoken. This card is a fictional demo.",summary:"Bole Open Classroom is hiring a caption partner in Addis Ababa. The work is part time. You write English and Amharic captions for short lessons. You need a careful ear and a phone that can play audio. This card is a fictional demo for the hackathon, so an employer can hear how a job summary sounds."},{id:"caption-intern",title:"Caption intern",titleAm:"የንዑስ ጽሑፍ ልምምድ",org:"Community radio",place:"Bahir Dar",time:"Sample stipend",access:"Deaf applicants are welcome in this story. Ethiopian Sign Language is used in the newsroom two days a week. Fictional demo.",summary:"Turn recorded Amharic shows into captions. A senior editor checks every file. This card is a fictional demo, so the stipend is not a real offer."},{id:"pdf-maker",title:"Accessible PDF maker",titleAm:"ተደራሽ ፒዲኤፍ አዘጋጅ",org:"Training desk",place:"Remote, sized for 3G",time:"Sample contract",access:"The work can be done from a downloaded pack. Live video meetings are not required. Fictional demo.",summary:"Add image descriptions and tags to training documents that already exist. This card is a fictional demo, so the contract is not a real offer."}],pt={publicKey:{crv:"Ed25519",x:"UXNpzoUhtt_tIteTXTiCYkiF4KBKlRyXYLi4Y3vyQdY",kty:"OKP"},jwt:"eyJhbGciOiJFZERTQSIsInR5cCI6InZjK2p3dCIsImtpZCI6ImxlYXJuYWJsZS1kZW1vIn0.eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvbnMvY3JlZGVudGlhbHMvdjIiLCJodHRwczovL3B1cmwuaW1zZ2xvYmFsLm9yZy9zcGVjL29iL3YzcDAvY29udGV4dC0zLjAuMy5qc29uIl0sInR5cGUiOlsiVmVyaWZpYWJsZUNyZWRlbnRpYWwiLCJPcGVuQmFkZ2VDcmVkZW50aWFsIl0sImlzc3VlciI6eyJpZCI6Imh0dHBzOi8vbGVhcm5hYmxlLmxvY2FsL2lzc3VlciIsInR5cGUiOlsiUHJvZmlsZSJdLCJuYW1lIjoiTGVhcm5BYmxlIGRlbW8ifSwidmFsaWRGcm9tIjoiMjAyNi0xMS0xNVQwMDowMDowMFoiLCJuYW1lIjoiQWNjZXNzaWJsZSBtZWRpYSwgZGVtbyBsZXNzb24iLCJjcmVkZW50aWFsU3ViamVjdCI6eyJ0eXBlIjpbIkFjaGlldmVtZW50U3ViamVjdCJdLCJuYW1lIjoiSGFuYSBCZWtlbGUiLCJpZGVudGlmaWVyIjoiaGFuYS1kZW1vLTIwMjYiLCJhY2hpZXZlbWVudCI6eyJpZCI6Imh0dHBzOi8vbGVhcm5hYmxlLmxvY2FsL2FjaGlldmVtZW50cy9hY2Nlc3NpYmxlLW1lZGlhLWRlbW8iLCJ0eXBlIjpbIkFjaGlldmVtZW50Il0sIm5hbWUiOiJBY2Nlc3NpYmxlIG1lZGlhLCBkZW1vIGxlc3NvbiIsImRlc2NyaXB0aW9uIjoiQ29tcGxldGVkIHRoZSBMZWFybkFibGUgZGVtbyBvbiBjYXB0aW9ucywgc2lnbiwgYXVkaW8gZGVzY3JpcHRpb24sIGFuZCB0aGUgb2ZmbGluZSBwYWNrLiJ9fX0.v-8f4fVY60MgLeFQY6uJv6gwqqBQdcJijKgEjRh_sxwvqfcMjaFOV1V3WDLrETBkIKTr5UeChmFH4OPP-ZAlCw"};function Cn(e){const n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",t=e.replace(/-/g,"+").replace(/_/g,"/").replace(/=+$/,""),r=new Uint8Array(Math.floor(t.length*3/4));let a=0,o=0,i=0;for(const s of t){const l=n.indexOf(s);if(l<0)return new Uint8Array;a=a<<6|l,o+=6,o>=8&&(o-=8,r[i]=a>>o&255,i+=1)}return r.subarray(0,i)}async function mt(e=pt.jwt,n=pt.publicKey){const[t,r,a]=e.split(".");if(!t||!r||!a)return!1;const o=await crypto.subtle.importKey("jwk",n,{name:"Ed25519"},!1,["verify"]),i=new TextEncoder().encode(`${t}.${r}`);return crypto.subtle.verify({name:"Ed25519"},o,Cn(a),i)}var B=Uint8Array,D=Uint16Array,De=Int32Array,Pe=new B([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),Re=new B([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),gt=new B([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),bt=function(e,n){for(var t=new D(31),r=0;r<31;++r)t[r]=n+=1<<e[r-1];for(var a=new De(t[30]),r=1;r<30;++r)for(var o=t[r];o<t[r+1];++o)a[o]=o-t[r]<<5|r;return{b:t,r:a}},yt=bt(Pe,2),Ln=yt.b,Fe=yt.r;Ln[28]=258,Fe[258]=28;for(var Tn=bt(Re,0),vt=Tn.r,Ne=new D(32768),k=0;k<32768;++k){var J=(k&43690)>>1|(k&21845)<<1;J=(J&52428)>>2|(J&13107)<<2,J=(J&61680)>>4|(J&3855)<<4,Ne[k]=((J&65280)>>8|(J&255)<<8)>>1}for(var pe=(function(e,n,t){for(var r=e.length,a=0,o=new D(n);a<r;++a)e[a]&&++o[e[a]-1];var i=new D(n);for(a=1;a<n;++a)i[a]=i[a-1]+o[a-1]<<1;var s;if(t){s=new D(1<<n);var l=15-n;for(a=0;a<r;++a)if(e[a])for(var d=a<<4|e[a],c=n-e[a],u=i[e[a]-1]++<<c,f=u|(1<<c)-1;u<=f;++u)s[Ne[u]>>l]=d}else for(s=new D(r),a=0;a<r;++a)e[a]&&(s[a]=Ne[i[e[a]-1]++]>>15-e[a]);return s}),ne=new B(288),k=0;k<144;++k)ne[k]=8;for(var k=144;k<256;++k)ne[k]=9;for(var k=256;k<280;++k)ne[k]=7;for(var k=280;k<288;++k)ne[k]=8;for(var Ae=new B(32),k=0;k<32;++k)Ae[k]=5;var Mn=pe(ne,9,0),In=pe(Ae,5,0),xt=function(e){return(e+7)/8|0},wt=function(e,n,t){return(t==null||t>e.length)&&(t=e.length),new B(e.subarray(n,t))},$n=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],ke=function(e,n,t){var r=new Error(n||$n[e]);if(r.code=e,Error.captureStackTrace&&Error.captureStackTrace(r,ke),!t)throw r;return r},Z=function(e,n,t){t<<=n&7;var r=n/8|0;e[r]|=t,e[r+1]|=t>>8},me=function(e,n,t){t<<=n&7;var r=n/8|0;e[r]|=t,e[r+1]|=t>>8,e[r+2]|=t>>16},He=function(e,n){for(var t=[],r=0;r<e.length;++r)e[r]&&t.push({s:r,f:e[r]});var a=t.length,o=t.slice();if(!a)return{t:Et,l:0};if(a==1){var i=new B(t[0].s+1);return i[t[0].s]=1,{t:i,l:1}}t.sort(function(E,q){return E.f-q.f}),t.push({s:-1,f:25001});var s=t[0],l=t[1],d=0,c=1,u=2;for(t[0]={s:-1,f:s.f+l.f,l:s,r:l};c!=a-1;)s=t[t[d].f<t[u].f?d++:u++],l=t[d!=c&&t[d].f<t[u].f?d++:u++],t[c++]={s:-1,f:s.f+l.f,l:s,r:l};for(var f=o[0].s,r=1;r<a;++r)o[r].s>f&&(f=o[r].s);var g=new D(f+1),h=je(t[c-1],g,0);if(h>n){var r=0,b=0,p=h-n,A=1<<p;for(o.sort(function(q,L){return g[L.s]-g[q.s]||q.f-L.f});r<a;++r){var S=o[r].s;if(g[S]>n)b+=A-(1<<h-g[S]),g[S]=n;else break}for(b>>=p;b>0;){var m=o[r].s;g[m]<n?b-=1<<n-g[m]++-1:++r}for(;r>=0&&b;--r){var y=o[r].s;g[y]==n&&(--g[y],++b)}h=n}return{t:new B(g),l:h}},je=function(e,n,t){return e.s==-1?Math.max(je(e.l,n,t+1),je(e.r,n,t+1)):n[e.s]=t},At=function(e){for(var n=e.length;n&&!e[--n];);for(var t=new D(++n),r=0,a=e[0],o=1,i=function(l){t[r++]=l},s=1;s<=n;++s)if(e[s]==a&&s!=n)++o;else{if(!a&&o>2){for(;o>138;o-=138)i(32754);o>2&&(i(o>10?o-11<<5|28690:o-3<<5|12305),o=0)}else if(o>3){for(i(a),--o;o>6;o-=6)i(8304);o>2&&(i(o-3<<5|8208),o=0)}for(;o--;)i(a);o=1,a=e[s]}return{c:t.subarray(0,r),n}},ge=function(e,n){for(var t=0,r=0;r<n.length;++r)t+=e[r]*n[r];return t},kt=function(e,n,t){var r=t.length,a=xt(n+2);e[a]=r&255,e[a+1]=r>>8,e[a+2]=e[a]^255,e[a+3]=e[a+1]^255;for(var o=0;o<r;++o)e[a+o+4]=t[o];return(a+4+r)*8},St=function(e,n,t,r,a,o,i,s,l,d,c){Z(n,c++,t),++a[256];for(var u=He(a,15),f=u.t,g=u.l,h=He(o,15),b=h.t,p=h.l,A=At(f),S=A.c,m=A.n,y=At(b),E=y.c,q=y.n,L=new D(19),w=0;w<S.length;++w)++L[S[w]&31];for(var w=0;w<E.length;++w)++L[E[w]&31];for(var v=He(L,7),P=v.t,ue=v.l,R=19;R>4&&!P[gt[R-1]];--R);var de=d+5<<3,U=ge(a,ne)+ge(o,Ae)+i,W=ge(a,f)+ge(o,b)+i+14+3*R+ge(L,P)+2*L[16]+3*L[17]+7*L[18];if(l>=0&&de<=U&&de<=W)return kt(n,c,e.subarray(l,l+d));var K,M,V,te;if(Z(n,c,1+(W<U)),c+=2,W<U){K=pe(f,g,0),M=f,V=pe(b,p,0),te=b;var ct=pe(P,ue,0);Z(n,c,m-257),Z(n,c+5,q-1),Z(n,c+10,R-4),c+=14;for(var w=0;w<R;++w)Z(n,c+3*w,P[gt[w]]);c+=3*R;for(var Y=[S,E],xe=0;xe<2;++xe)for(var he=Y[xe],w=0;w<he.length;++w){var z=he[w]&31;Z(n,c,ct[z]),c+=P[z],z>15&&(Z(n,c,he[w]>>5&127),c+=he[w]>>12)}}else K=Mn,M=ne,V=In,te=Ae;for(var w=0;w<s;++w){var $=r[w];if($>255){var z=$>>18&31;me(n,c,K[z+257]),c+=M[z+257],z>7&&(Z(n,c,$>>23&31),c+=Pe[z]);var fe=$&31;me(n,c,V[fe]),c+=te[fe],fe>3&&(me(n,c,$>>5&8191),c+=Re[fe])}else me(n,c,K[$]),c+=M[$]}return me(n,c,K[256]),c+M[256]},Bn=new De([65540,131080,131088,131104,262176,1048704,1048832,2114560,2117632]),Et=new B(0),qn=function(e,n,t,r,a,o){var i=o.z||e.length,s=new B(r+i+5*(1+Math.ceil(i/7e3))+a),l=s.subarray(r,s.length-a),d=o.l,c=(o.r||0)&7;if(n){c&&(l[0]=o.r>>3);for(var u=Bn[n-1],f=u>>13,g=u&8191,h=(1<<t)-1,b=o.p||new D(32768),p=o.h||new D(h+1),A=Math.ceil(t/3),S=2*A,m=function(ht){return(e[ht]^e[ht+1]<<A^e[ht+2]<<S)&h},y=new De(25e3),E=new D(288),q=new D(32),L=0,w=0,v=o.i||0,P=0,ue=o.w||0,R=0;v+2<i;++v){var de=m(v),U=v&32767,W=p[de];if(b[U]=W,p[de]=U,ue<=v){var K=i-v;if((L>7e3||P>24576)&&(K>423||!d)){c=St(e,l,0,y,E,q,w,P,R,v-R,c),P=L=w=0,R=v;for(var M=0;M<286;++M)E[M]=0;for(var M=0;M<30;++M)q[M]=0}var V=2,te=0,ct=g,Y=U-W&32767;if(K>2&&de==m(v-Y))for(var xe=Math.min(f,K)-1,he=Math.min(32767,v),z=Math.min(258,K);Y<=he&&--ct&&U!=W;){if(e[v+V]==e[v+V-Y]){for(var $=0;$<z&&e[v+$]==e[v+$-Y];++$);if($>V){if(V=$,te=Y,$>xe)break;for(var fe=Math.min(Y,$-2),vn=0,M=0;M<fe;++M){var ut=v-Y+M&32767,va=b[ut],xn=ut-va&32767;xn>vn&&(vn=xn,W=ut)}}}U=W,W=b[U],Y+=U-W&32767}if(te){y[P++]=268435456|Fe[V]<<18|vt[te];var wn=Fe[V]&31,An=vt[te]&31;w+=Pe[wn]+Re[An],++E[257+wn],++q[An],ue=v+V,++L}else y[P++]=e[v],++E[e[v]]}}for(v=Math.max(v,ue);v<i;++v)y[P++]=e[v],++E[e[v]];c=St(e,l,d,y,E,q,w,P,R,v-R,c),d||(o.r=c&7|l[c/8|0]<<3,c-=7,o.h=p,o.p=b,o.i=v,o.w=ue)}else{for(var v=o.w||0;v<i+d;v+=65535){var dt=v+65535;dt>=i&&(l[c/8|0]=d,dt=i),c=kt(l,c+1,e.subarray(v,dt))}o.i=i}return wt(s,0,r+xt(c)+a)},Dn=(function(){for(var e=new Int32Array(256),n=0;n<256;++n){for(var t=n,r=9;--r;)t=(t&1&&-306674912)^t>>>1;e[n]=t}return e})(),Pn=function(){var e=-1;return{p:function(n){for(var t=e,r=0;r<n.length;++r)t=Dn[t&255^n[r]]^t>>>8;e=t},d:function(){return~e}}},Rn=function(e,n,t,r,a){if(!a&&(a={l:1},n.dictionary)){var o=n.dictionary.subarray(-32768),i=new B(o.length+e.length);i.set(o),i.set(e,o.length),e=i,a.w=o.length}return qn(e,n.level==null?6:n.level,n.mem==null?a.l?Math.ceil(Math.max(8,Math.min(13,Math.log(e.length)))*1.5):20:12+n.mem,t,r,a)},Ct=function(e,n){var t={};for(var r in e)t[r]=e[r];for(var r in n)t[r]=n[r];return t},T=function(e,n,t){for(;t;++n)e[n]=t,t>>>=8};function Fn(e,n){return Rn(e,n||{},0,0)}var Lt=function(e,n,t,r){for(var a in e){var o=e[a],i=n+a,s=r;Array.isArray(o)&&(s=Ct(r,o[1]),o=o[0]),ArrayBuffer.isView(o)?t[i]=[o,s]:(t[i+="/"]=[new B(0),s],Lt(o,i,t,r))}},Tt=typeof TextEncoder<"u"&&new TextEncoder,Nn=typeof TextDecoder<"u"&&new TextDecoder,Hn=0;try{Nn.decode(Et,{stream:!0}),Hn=1}catch{}function Mt(e,n){var t;if(Tt)return Tt.encode(e);for(var r=e.length,a=new B(e.length+(e.length>>1)),o=0,i=function(d){a[o++]=d},t=0;t<r;++t){if(o+5>a.length){var s=new B(o+8+(r-t<<1));s.set(a),a=s}var l=e.charCodeAt(t);l<128||n?i(l):l<2048?(i(192|l>>6),i(128|l&63)):l>55295&&l<57344?(l=65536+(l&1047552)|e.charCodeAt(++t)&1023,i(240|l>>18),i(128|l>>12&63),i(128|l>>6&63),i(128|l&63)):(i(224|l>>12),i(128|l>>6&63),i(128|l&63))}return wt(a,0,o)}var Ue=function(e){var n=0;if(e)for(var t in e){var r=e[t].length;r>65535&&ke(9),n+=r+4}return n},It=function(e,n,t,r,a,o,i,s){var l=r.length,d=t.extra,c=s&&s.length,u=Ue(d);T(e,n,i!=null?33639248:67324752),n+=4,i!=null&&(e[n++]=20,e[n++]=t.os),e[n]=20,n+=2,e[n++]=t.flag<<1|(o<0&&8),e[n++]=a&&8,e[n++]=t.compression&255,e[n++]=t.compression>>8;var f=new Date(t.mtime==null?Date.now():t.mtime),g=f.getFullYear()-1980;if((g<0||g>119)&&ke(10),T(e,n,g<<25|f.getMonth()+1<<21|f.getDate()<<16|f.getHours()<<11|f.getMinutes()<<5|f.getSeconds()>>1),n+=4,o!=-1&&(T(e,n,t.crc),T(e,n+4,o<0?-o-2:o),T(e,n+8,t.size)),T(e,n+12,l),T(e,n+14,u),n+=16,i!=null&&(T(e,n,c),T(e,n+6,t.attrs),T(e,n+10,i),n+=14),e.set(r,n),n+=l,u)for(var h in d){var b=d[h],p=b.length;T(e,n,+h),T(e,n+2,p),e.set(b,n+4),n+=4+p}return c&&(e.set(s,n),n+=c),n},jn=function(e,n,t,r,a){T(e,n,101010256),T(e,n+8,t),T(e,n+10,t),T(e,n+12,r),T(e,n+16,a)};function Un(e,n){n||(n={});var t={},r=[];Lt(e,"",t,n);var a=0,o=0;for(var i in t){var s=t[i],l=s[0],d=s[1],c=d.level==0?0:8,u=Mt(i),f=u.length,g=d.comment,h=g&&Mt(g),b=h&&h.length,p=Ue(d.extra);f>65535&&ke(11);var A=c?Fn(l,d):l,S=A.length,m=Pn();m.p(l),r.push(Ct(d,{size:l.length,crc:m.d(),c:A,f:u,m:h,u:f!=i.length||h&&g.length!=b,o:a,compression:c})),a+=30+f+p+S,o+=76+2*(f+p)+(b||0)+S}for(var y=new B(o+22),E=a,q=o-a,L=0;L<r.length;++L){var u=r[L];It(y,u.o,u,u.f,u.u,u.c.length);var w=30+u.f.length+Ue(u.extra);y.set(u.c,u.o+w),It(y,a,u,u.f,u.u,u.c.length,u.o,u.m),a+=16+w+(u.m?u.m.length:0)}return jn(y,a,r.length,q,E),y}const Wn=`# Ethiopic-G1
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
`,Vn=` A1B'K2L@CIF/MSP"E3H9O6R^DJG>NTQ,*5<-U8V.%[$+X!&;:4\\0Z7(_?W]#Y)=`,On="JABCDEFGHI",Gn={".":"4",",":"1","?":"8","!":"6","'":"'","-":"-",":":"3",";":"2"};function Kn(e){return e<0||e>63?"?":Vn[e]??"?"}function Yn(e){let n=0;for(const t of e){const r=Number(t);r>=1&&r<=6&&(n|=1<<r-1)}return n}function zn(e){const n=new Map;for(const t of e.split(/\r?\n/)){const r=/^(?:letter|punctuation)\s+\\x([0-9A-Fa-f]+)\s+(\S+)/.exec(t.trim());if(!r)continue;const a=Number.parseInt(r[1],16);n.set(a,r[2].split("-").map(Yn))}return n}const Zn=zn(Wn);function Jn(e){let n="",t=!1;for(const r of e){const a=r.codePointAt(0)??0,o=Zn.get(a);if(o){t=!1,n+=o.map(Kn).join("");continue}if(r===`
`){t=!1,n+=`
`;continue}if(r===" "){t=!1,n+=" ";continue}if(/[0-9]/.test(r)){t||(n+="#",t=!0),n+=On[Number(r)];continue}if(t=!1,/[a-z]/.test(r)){n+=r.toUpperCase();continue}if(/[A-Z]/.test(r)){n+=`,${r}`;continue}n+=Gn[r]??"?"}return n}function We(e,n=40){const t=Jn(e),r=[];for(const a of t.split(`
`)){const o=a.split(" ");let i="";for(const s of o){if(!i){i=s;continue}i.length+1+s.length<=n?i+=` ${s}`:(r.push(i),i=s)}i&&r.push(i)}return`${r.join(`
`)}
`}const Xn='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" role="img"><title>A navy phone on a paper background, with an English and Amharic caption under the screen.</title><rect width="640" height="480" fill="#f2f0ea"/><rect x="230" y="40" width="180" height="320" rx="28" fill="#ffffff" stroke="#1b3048" stroke-width="8"/><rect x="254" y="72" width="132" height="210" rx="6" fill="#f2f0ea" stroke="#1b3048" stroke-width="3"/><rect x="120" y="390" width="400" height="36" fill="#111111"/><rect x="140" y="400" width="160" height="8" fill="#ffee00"/></svg>',_n="A navy phone on a paper background, with an English and Amharic caption under the screen.";function Qn(e,n,t,r){const a=e.split(`
`).filter(Boolean),o=n.split(`
`).filter(Boolean),i=a.map((s,l)=>`<section><h2>${s}</h2>${o[l]?`<p lang="am">${o[l]}</p>`:""}</section>`).join("");return`<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><title>LearnAble light lesson</title></head><body><main><h1>LearnAble light lesson</h1><p>Sound, text, and this page. The video is not in the pack.</p><figure><img src="lesson-figure.svg" alt="${_n}"></figure><h2>English</h2>${r?'<audio controls src="lesson-en.wav"></audio>':"<p>The narration file was not on this host.</p>"}<h2 lang="am">አማርኛ</h2>${r?'<audio controls src="lesson-am.wav"></audio>':""}${i}${t?`<h2>Audio description</h2><p>${t}</p>`:""}</main></body></html>`}async function $t(e){if(!e)return null;try{const n=await fetch(e);return n.ok?new Uint8Array(await n.arrayBuffer()):null}catch{return null}}async function er(e){const n=await $t(e.audioEn),t=await $t(e.audioAm),r={"index.html":new TextEncoder().encode(Qn(e.english,e.amharic,e.descriptions||"",!!(n||t))),"lesson-figure.svg":new TextEncoder().encode(Xn),"transcript-en.brf":new TextEncoder().encode(We(e.english)),"transcript-am.brf":new TextEncoder().encode(We(e.amharic))};return n&&(r["lesson-en.wav"]=n),t&&(r["lesson-am.wav"]=t),{bytes:Un(r),audio:!!(n||t)}}function X(e,n,t){const r=new Blob([Uint8Array.from(e)],{type:t}),a=URL.createObjectURL(r),o=document.createElement("a");o.href=a,o.download=n,document.body.append(o),o.click(),o.remove(),URL.revokeObjectURL(a)}async function tr(e,n,t){var r;try{const o=await import(N("/learnable/espeak/speak.js")),i=o.speak||((r=o.default)==null?void 0:r.speak);return typeof i!="function"?!1:(await i(e,n,t),!0)}catch{return!1}}let Se=0,Ve=!1,se=null,Bt=!1,qt=!1;function Dt(){var e;return typeof window<"u"&&"speechSynthesis"in window&&typeof((e=window.speechSynthesis)==null?void 0:e.speak)=="function"}function Pt(){var e;Ve=!0;try{(e=window.speechSynthesis)==null||e.resume()}catch{}}function nr(){if(!Ve||!se)return;const e=se;se=null,Nt(e.text,e.lang,e.hooks)}function Rt(e){return e.toLowerCase().slice(0,2)}function rr(e){var t,r;return(((r=(t=window.speechSynthesis)==null?void 0:t.getVoices)==null?void 0:r.call(t))??[]).find(a=>a.lang.toLowerCase().startsWith(Rt(e)))}function Ft(e){if(Bt)return;Bt=!0;const n=document.getElementById("learnable-reader-live");if(!n)return;const t=Rt(e)==="am"?"Amharic":e;n.textContent=`No ${t} voice in this browser. The optional eSpeak file is not on this site, so this line stays on screen.`}function ar(e,n,t){var r,a;e!==Se||t?(r=n.oncancel)==null||r.call(n):(a=n.onend)==null||a.call(n)}async function Nt(e,n,t){var u,f,g,h,b,p;const r=++Se,a=Math.min(2,Math.max(.5,t.rate??1)),o=Math.min(2,Math.max(0,t.pitch??1));try{(u=window.speechSynthesis)==null||u.cancel()}catch{}const i=((g=(f=window.speechSynthesis)==null?void 0:f.getVoices)==null?void 0:g.call(f))??[],s=rr(n);if(!s&&i.length>0){const A=await tr(e,n,a);if(r!==Se){(h=t.oncancel)==null||h.call(t);return}if(A){(b=t.onend)==null||b.call(t);return}Ft(n)}if(!Dt()){s||Ft(n),(p=t.onend)==null||p.call(t);return}const l=new SpeechSynthesisUtterance(e);l.lang=n.startsWith("am")?"am":n,l.rate=a,l.pitch=o;try{s&&(l.voice=s)}catch{}let d=!1;const c=A=>{d||(d=!0,ar(r,t,A))};l.onend=()=>c(!1),l.onerror=()=>c(!0),window.speechSynthesis.speak(l)}function be(e,n,t=1,r={}){var i,s;const a=e.replace(/\s+/g," ").trim();if(!a)return;const o={text:a,lang:n,hooks:{...r,rate:r.rate??t}};if(!qt&&Dt()&&(qt=!0,(s=(i=window.speechSynthesis).addEventListener)==null||s.call(i,"voiceschanged",()=>{window.speechSynthesis.getVoices()}),window.speechSynthesis.getVoices()),!Ve){se=o;return}se=null,Nt(o.text,o.lang,o.hooks)}function Ee(){var e;Se+=1,se=null;try{(e=window.speechSynthesis)==null||e.cancel()}catch{}}function Ht(e){const n=/^(?:(\d+):)?(\d{2}):(\d{2})\.(\d{3})$/.exec(e.trim());if(!n)throw new Error(`Bad WebVTT timestamp: ${e}`);const t=Number(n[1]??0),r=Number(n[2]),a=Number(n[3]),o=Number(n[4]);return t*3600+r*60+a+o/1e3}function or(e){var a;const n=e.replace(/^\uFEFF/,"").split(/\r?\n/),t=[];let r=0;if((a=n[0])!=null&&a.startsWith("WEBVTT"))for(r=1;r<n.length&&n[r].trim()!=="";)r+=1;for(;r<n.length;){if(n[r].trim()===""){r+=1;continue}let o=n[r];!o.includes("-->")&&r+1<n.length&&(r+=1,o=n[r]);const i=o.split("-->");if(i.length<2){r+=1;continue}const s=Ht(i[0]),l=i[1].trim().split(/\s+/)[0],d=Ht(l);r+=1;const c=[];for(;r<n.length&&n[r].trim()!=="";)c.push(n[r]),r+=1;t.push({start:s,end:d,text:c.join(`
`)})}return t}function jt(e){const n=Math.max(0,Math.round(e*1e3)),t=Math.floor(n/36e5),r=Math.floor(n%36e5/6e4),a=Math.floor(n%6e4/1e3),o=n%1e3;return`${String(t).padStart(2,"0")}:${String(r).padStart(2,"0")}:${String(a).padStart(2,"0")}.${String(o).padStart(3,"0")}`}function Ut(e){return`WEBVTT

${e.map(t=>`${jt(t.start)} --> ${jt(t.end)}
${t.text}`).join(`

`)}
`}function Wt(e,n){const t=e.find(a=>n>=a.start&&n<a.end);if(t)return t;const r=e[e.length-1];if(r&&n>=r.start&&n<=r.end+.05)return r}const Oe={en:{larger:"Larger text",contrast:"High contrast",stop:"Stop motion",read:"Read this page",stopRead:"Stop reading",language:"Language",images:"Image check",skip:"Skip to content",menu:"Menu",pipeline:"Transcript",job:"Job card",session:"Session"},am:{larger:"ትልቅ ጽሑፍ",contrast:"ከፍተኛ ንጽጽር",stop:"እንቅስቃሴ አቁም",read:"ይህን ገጽ አንብብ",stopRead:"ማንበብ አቁም",language:"ቋንቋ",images:"የምስል ምርመራ",skip:"ወደ ዋናው ይዘት ዝለል",menu:"ምናሌ",pipeline:"ጽሑፍ",job:"የስራ ካርድ",session:"ክፍለ ጊዜ"}},ir={"VA-Content-Banner.png":"A wide banner for the virtual assistant lesson.","lesson-figure.svg":"A navy phone on a paper background, with an English and Amharic caption under the screen.","poster.png":"A still frame from the lesson: a phone with a caption bar.","esl-placeholder.png":"A placeholder card where an Ethiopian Sign Language clip can be added."},Vt="Description not yet provided",Ot=ir;function Gt(e){var t;const n=e.currentSrc||e.getAttribute("src")||"";return decodeURIComponent(((t=n.split("/").pop())==null?void 0:t.split("?")[0])||"")}function sr(e){if(e.getAttribute("aria-hidden")==="true"||e.closest("[aria-hidden='true']"))return!0;const n=e.getAttribute("role");return n==="presentation"||n==="none"||e.getAttribute("alt")===""}function Kt(e,n){if(n===Vt||n==="Needs a description")return!0;const t=Gt(e),r=t.replace(/\.[^.]+$/,"");return n===t||n===r}function Ge(e){var r;if(sr(e))return null;const n=((r=e.getAttribute("alt"))==null?void 0:r.trim())??"";if(n&&!Kt(e,n))return n;const t=Gt(e);return Ot[t]?Ot[t]:Vt}function lr(){document.querySelectorAll("img").forEach(e=>{var a;if(e.closest("learnable-player, learnable-toolbar"))return;const n=Ge(e);if(!n)return;const t=((a=e.getAttribute("alt"))==null?void 0:a.trim())??"";(!t||Kt(e,t))&&(e.alt=n),!e.closest("a, button, [role='link'], [role='button']")&&e.tabIndex<0&&(e.tabIndex=0,e.dataset.learnableImage="true")})}const j="data-learnable-repair";function Yt(e){var i,s,l,d,c;const n=(i=e.getAttribute("aria-label"))==null?void 0:i.trim();if(n)return n;const t=e.getAttribute("aria-labelledby");if(t){const u=t.split(/\s+/).map(f=>{var g;return((g=document.getElementById(f))==null?void 0:g.textContent)||""}).join(" ").replace(/\s+/g," ").trim();if(u)return u}const r=((s=e.textContent)==null?void 0:s.replace(/\s+/g," ").trim())||"";if(r)return r;const a=(d=(l=e.querySelector("img[alt]"))==null?void 0:l.getAttribute("alt"))==null?void 0:d.trim();if(a)return a;const o=(c=e.getAttribute("title"))==null?void 0:c.trim();return o||""}function _(e){return!!e.closest("learnable-player, learnable-toolbar, .learnable-gateway")}function cr(){document.querySelectorAll("a, button, [role='button']").forEach(e=>{var a;if(_(e)||Yt(e))return;const n=(a=e.getAttribute("title"))==null?void 0:a.trim(),r=e.classList.contains("logo-container")||e.querySelector(".logo")?"ALX home":e.tagName==="A"?"Link":"Button";e.setAttribute("aria-label",n||r),e.setAttribute(j,"name")}),document.querySelectorAll("input, select, textarea").forEach(e=>{var a,o,i;if(_(e)||e.getAttribute("type")==="hidden"||e.getAttribute("aria-label")||e.closest("label"))return;const n=e.getAttribute("id");if(n&&document.querySelector(`label[for="${CSS.escape(n)}"]`))return;const t=(a=e.getAttribute("placeholder"))==null?void 0:a.trim(),r=(i=(o=e.previousElementSibling)==null?void 0:o.textContent)==null?void 0:i.replace(/\s+/g," ").trim();e.setAttribute("aria-label",t||r||e.getAttribute("name")||"Input"),e.setAttribute(j,"label")})}function ur(){document.querySelectorAll("img").forEach(e=>{if(_(e)||e.hasAttribute("alt"))return;if(!!e.closest("[aria-hidden='true']")||e.className.toString().includes("icon")||e.width>0&&e.width<8)e.alt="",e.setAttribute("role","presentation");else{e.alt="Description not yet provided";const t=document.createElement("span");t.className="learnable-alt-note",t.textContent="Description not yet provided",e.after(t)}e.setAttribute(j,"alt")})}function dr(){document.querySelectorAll("[aria-expanded]").forEach(e=>{if(_(e))return;const n=e.getAttribute("role"),t=e.tagName;n||t==="BUTTON"||t==="A"||t==="SUMMARY"||(e.setAttribute("role","button"),e.hasAttribute("tabindex")||e.setAttribute("tabindex","0"),e.setAttribute(j,"aria"))}),document.querySelectorAll("[role='progressbar']").forEach(e=>{var t,r,a;if(_(e)||Yt(e))return;const n=(a=(r=(t=e.closest("div"))==null?void 0:t.parentElement)==null?void 0:r.textContent)==null?void 0:a.replace(/\s+/g," ").trim().slice(0,80);e.setAttribute("aria-label",n||"Progress"),e.setAttribute(j,"aria")}),document.querySelectorAll("a.anchor[aria-hidden='true'], [aria-hidden='true'][tabindex]").forEach(e=>{e.setAttribute("tabindex","-1"),e.getAttribute("aria-hidden")==="true"&&e.classList.contains("modal")&&e.removeAttribute("tabindex"),e.setAttribute(j,"aria")}),document.querySelectorAll("span[aria-label], div[aria-label]").forEach(e=>{_(e)||e.getAttribute("role")||(e.setAttribute("role","note"),e.setAttribute(j,"aria"))})}function hr(){document.querySelectorAll("ul, ol").forEach(e=>{_(e)||[...e.children].forEach(n=>{if(n.tagName==="LI"||n.tagName==="SCRIPT"||n.tagName==="TEMPLATE")return;const t=document.createElement("li");n.replaceWith(t),t.append(n),t.setAttribute(j,"list")})})}function Ke(e){const n=e/255;return n<=.03928?n/12.92:((n+.055)/1.055)**2.4}function Ce(e){return .2126*Ke(e[0])+.7152*Ke(e[1])+.0722*Ke(e[2])}function re(e,n){const t=Math.max(Ce(e),Ce(n)),r=Math.min(Ce(e),Ce(n));return(t+.05)/(r+.05)}function zt(e){const n=e.match(/rgba?\(([^)]+)\)/);if(!n)return null;const t=n[1].split(",").map(r=>Number.parseFloat(r.trim()));return t.length<3||t.some(r=>Number.isNaN(r))?null:[t[0],t[1],t[2],t[3]??1]}function fr(e,n){const t=e[3];return[e[0]*t+n[0]*(1-t),e[1]*t+n[1]*(1-t),e[2]*t+n[2]*(1-t),1]}function pr(e){const n=[];let t=e;for(;t;){const a=zt(getComputedStyle(t).backgroundColor);if(a&&a[3]>0&&n.push(a),a&&a[3]>=1)break;t=t.parentElement}if(n.length===0)return[255,255,255,1];let r=n[n.length-1];for(let a=n.length-2;a>=0;a-=1)r=fr(n[a],r);return r}function Ye(e,n,t){return[Math.round(e[0]+(n[0]-e[0])*t),Math.round(e[1]+(n[1]-e[1])*t),Math.round(e[2]+(n[2]-e[2])*t),1]}function mr(e){const n=getComputedStyle(e),t=Number.parseFloat(n.fontSize),r=Number.parseInt(n.fontWeight,10)||400;return t>=24||t>=18.67&&r>=700?3:4.5}function gr(){document.querySelectorAll("[data-learnable-repair='contrast']").forEach(e=>{e.style.removeProperty("color"),e.removeAttribute(j)})}function Zt(){document.documentElement.dataset.learnableContrast!=="on"&&document.querySelectorAll("a, button, span, p, h1, h2, h3, h4, li, label, div, td, th, code, small, strong, b, em").forEach(e=>{if(_(e)||e.getAttribute(j)==="contrast"||![...e.childNodes].some(l=>{var d;return l.nodeType===Node.TEXT_NODE&&((d=l.textContent)==null?void 0:d.trim())})||e.getClientRects().length===0)return;const t=zt(getComputedStyle(e).color);if(!t)return;const r=pr(e),a=mr(e);if(re(t,r)>=a)return;const o=a+.45;let i=t,s=2;for(const l of[[0,0,0],[255,255,255]]){let d=0,c=1;for(let g=0;g<10;g+=1){const h=(d+c)/2;re(Ye(t,l,h),r)>=o?c=h:d=h}let u=c,f=Ye(t,l,u);for(;re(f,r)<o&&u<1;)u=Math.min(1,u+.08),f=Ye(t,l,u);re(f,r)>=o&&u<s&&(i=f,s=u)}if(re(i,r)<o){const l=[0,0,0,1],d=[255,255,255,1];i=re(l,r)>=re(d,r)?l:d}e.style.setProperty("color",`rgb(${i[0]}, ${i[1]}, ${i[2]})`,"important"),e.setAttribute(j,"contrast")})}function br(){cr(),ur(),dr(),hr(),Zt()}const Jt={white:{label:"White on black",fg:"#ffffff",bg:"#111111"},yellow:{label:"Yellow on black",fg:"#ffee00",bg:"#111111"},black:{label:"Black on white",fg:"#172033",bg:"#f2f0ea"},cyan:{label:"Cyan on black",fg:"#00ffff",bg:"#111111"}},ze="learnable-widget",Xt=()=>({toolbar:!0,signWindow:!0,audioDescription:!0,offlinePack:!1,braille:!1,taggedDocs:!1}),Ze=()=>({lang:"en",uiLang:"en",largeText:!1,highContrast:!1,stopMotion:!1,captionScale:1.15,captionPreset:"white",contrastMode:"off",contrastLevel:7,readRate:1,readPitch:1,readVerbosity:"sentences",haptics:!1,voice:!0,voiceChosen:!1,audioDescription:!0,keyboard:!0,keys:{heading:"h",landmark:"l",help:"?",voice:"Alt+Shift+S"}});let _t=Xt(),G=Ze(),Qt="paper",Le=!0;function ye(e){return Le===!1?!1:Le===!0?!0:Le[e]!==!1}function Te(e,n){if(typeof e!="string")return n;const t=e.trim();return!t||t.length>32?n:t}function en(){try{return window.matchMedia("(prefers-reduced-motion: reduce)").matches}catch{return!1}}function tn(){const e=Ze();e.stopMotion=en();try{const n=localStorage.getItem(ze);if(!n)return e;const t=JSON.parse(n),r=t.lang==="am"?"am":t.lang==="en"?"en":e.lang,a=t.uiLang==="am"?"am":t.uiLang==="en"?"en":e.uiLang,o=t.contrastMode==="bw"||t.contrastMode==="yb"?t.contrastMode:"off",i=Math.min(10,Math.max(1,Number(t.contrastLevel)||e.contrastLevel)),s={...e.keys,...t.keys||{}};return{...e,...t,lang:r,uiLang:a,contrastMode:o,contrastLevel:i,voice:typeof t.voice=="boolean"?t.voice:e.voice,voiceChosen:t.voiceChosen===!0,audioDescription:typeof t.audioDescription=="boolean"?t.audioDescription:e.audioDescription,keyboard:t.keyboard!==!1,keys:{heading:Te(s.heading,e.keys.heading),landmark:Te(s.landmark,e.keys.landmark),help:Te(s.help,e.keys.help),voice:Te(s.voice,e.keys.voice)}}}catch{return e}}function x(){return{...G}}function Me(){return{..._t}}function yr(){return Qt}function Je(e){G={...e},localStorage.setItem(ze,JSON.stringify(G)),window.dispatchEvent(new CustomEvent("learnable-settings",{detail:x()}))}function C(e){const n={...x(),...e};return Je(n),x()}function vr(e={}){_t={...Xt(),...e.features},e.theme&&(Qt=e.theme),e.enhance!==void 0&&(Le=e.enhance);const n=tn();G={...n,lang:e.lang??n.lang,uiLang:e.uiLang??n.uiLang},n.voiceChosen!==!0&&e.voice&&(G.voice=e.voice==="on",e.voice==="off"&&(G.audioDescription=!1)),Je(G)}function xr(){return localStorage.removeItem(ze),G=Ze(),G.stopMotion=en(),Je(G),x()}function nn(e,n,t){return e.hasAttribute(n)?e.getAttribute(n)!=="false":t}const wr=["captions-en","captions-am","sign","describe","audio-en","audio-am","offline","braille","docs"];function Ar(e,n){for(const r of wr){const a=e.getAttribute(`data-learnable-${r}`);a!==null&&n.setAttribute(r,a)}const t=e.getAttribute("src");t&&!n.getAttribute("src")&&n.setAttribute("src",t)}function rn(e){if(e.dataset.learnableUpgraded==="true"||e.closest("learnable-player"))return;e.dataset.learnableUpgraded="true";const n=document.createElement("learnable-player");Ar(e,n),n.hasAttribute("offline")||n.setAttribute("offline",""),n.hasAttribute("braille")||n.setAttribute("braille",""),n.hasAttribute("docs")||n.setAttribute("docs",""),n.hasAttribute("describe")||n.setAttribute("describe","/media/descriptions.vtt"),e.slot="media",e.replaceWith(n),n.append(e)}function kr(){ye("media")&&(document.querySelectorAll("video, audio").forEach(e=>{e instanceof HTMLElement&&rn(e)}),document.querySelectorAll("iframe").forEach(e=>{const n=e.getAttribute("src")||"";/youtube\.com|youtu\.be|player\.vimeo\.com|vimeo\.com/.test(n)&&e instanceof HTMLElement&&rn(e)}))}function Sr(){if(!ye("skip")||document.querySelector("a.learnable-skip, a[href='#content'], a[href='#main']"))return;const e=document.querySelector("main");e&&!e.id&&(e.id="content");const n=document.createElement("a");n.className="learnable-skip",n.href=e!=null&&e.id?`#${e.id}`:"#content",n.textContent=Oe[x().uiLang].skip,document.body.prepend(n)}function Er(){if(!ye("landmarks"))return;const e=document.querySelector(".header");e&&!document.querySelector("header, [role='banner']")&&e.setAttribute("role","banner");const n=document.getElementById("sidebar");n&&!document.querySelector("nav, [role='navigation']")&&(n.setAttribute("role","navigation"),n.getAttribute("aria-label")||n.setAttribute("aria-label","Sidebar"))}function Cr(e){return[...document.querySelectorAll(e)].filter(n=>!n.closest("learnable-player, learnable-toolbar"))}function Lr(e,n,t){const r=e.indexOf(n);if(r<0)return;e[(r+t+e.length)%e.length].focus()}function Tr(e){const n=e.target;if(!(n instanceof HTMLElement)||n.closest("learnable-player, learnable-toolbar, input, textarea, select"))return;n.classList.contains("hamburger")&&(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),n.click(),n.setAttribute("aria-expanded",document.body.classList.contains("sidebar-collapsed")?"false":"true")),e.key==="Escape"&&(document.querySelectorAll(".collapse.show").forEach(r=>{const a=document.querySelector(`[data-bs-target="#${r.id}"]`);(a==null?void 0:a.getAttribute("aria-expanded"))==="true"&&a.click()}),document.querySelectorAll(".dropdown-menu.show").forEach(r=>{r.classList.remove("show")}));const t=[".homepage-nav .nav-link","button[data-section-index]",".accordion-button",".dropdown-menu.show .dropdown-item"];if(!(e.key!=="ArrowRight"&&e.key!=="ArrowLeft"&&e.key!=="ArrowDown"&&e.key!=="ArrowUp"))for(const r of t){const a=Cr(r);if(!a.includes(n))continue;e.preventDefault();const o=e.key==="ArrowRight"||e.key==="ArrowDown"?1:-1;Lr(a,n,o);break}}function Mr(){ye("keyboard")&&(document.querySelectorAll(".hamburger").forEach(e=>{e.dataset.learnableKey!=="true"&&(e.dataset.learnableKey="true",e.tabIndex=0,e.setAttribute("role","button"),e.setAttribute("aria-label",Oe[x().uiLang].menu),e.setAttribute("aria-expanded",String(!document.body.classList.contains("sidebar-collapsed"))))}),document.documentElement.dataset.learnableKeys!=="true"&&(document.documentElement.dataset.learnableKeys="true",document.addEventListener("keydown",Tr)))}function Ir(){return[...document.querySelectorAll("img")].filter(e=>{var n;return!e.hasAttribute("alt")||e.getAttribute("alt")===((n=e.getAttribute("src"))==null?void 0:n.split("/").pop())})}function Xe(){const e=Ir();if(e.length===0)return"Every image on this page has a text alternative.";const n=e.slice(0,8).map(t=>t.currentSrc||t.getAttribute("src")||"image");return`${e.length} image${e.length===1?"":"s"} need a description. Nothing was sent off this page. ${n.join(" ")}`}function $r(){var a,o,i;if(document.getElementById("learnable-gateway"))return;const e=document.querySelector("main")||document.body,n=ft[0],t=document.createElement("section");t.id="learnable-gateway",t.className="learnable-gateway",t.setAttribute("aria-label","LearnAble lesson tools");const r=we.chat.map(s=>`<li>${s.speaker}: ${s.text}</li>`).join("");t.innerHTML=`
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
    <p>${n==null?void 0:n.title}</p>
    <p lang="am">${n==null?void 0:n.titleAm}</p>
    <p data-job-summary>${n==null?void 0:n.summary}</p>
    <div class="learnable-row">
      <button type="button" data-job>Play audio summary</button>
      <button type="button" data-badge>Check certificate</button>
    </div>
    <p data-cert></p>
    <h2 id="learnable-session">Session</h2>
    <p>Recorded session chat. The captions are the lesson transcript above.</p>
    <ol>${r}</ol>
  `,e.append(t),t.querySelectorAll("[data-vtt]").forEach(s=>{s.addEventListener("click",()=>{const l=s.dataset.vtt==="am",d=we.segments.map(u=>({start:u.start,end:u.end,text:l?u.am:u.en}));X(new TextEncoder().encode(Ut(d)),l?"captions-am.vtt":"captions-en.vtt","text/vtt");const c=t.querySelector("[data-pipeline-note]");c&&(c.textContent=l?"Amharic captions downloaded from the sample lesson.":"English captions downloaded from the sample lesson.")})}),(a=t.querySelector("[data-pipeline-file]"))==null||a.addEventListener("change",()=>{var d,c;const s=(c=(d=t.querySelector("[data-pipeline-file]"))==null?void 0:d.files)==null?void 0:c[0],l=t.querySelector("[data-pipeline-note]");!s||!l||s.text().then(u=>{const f=we.segments.find(g=>u.includes(g.en));l.textContent=f?`Sample translation: ${f.am}`:"No translation service is running, and this text is not in the sample lesson."})}),(o=t.querySelector("[data-job]"))==null||o.addEventListener("click",()=>{var s;be(((s=t.querySelector("[data-job-summary]"))==null?void 0:s.textContent)||"","en")}),(i=t.querySelector("[data-badge]"))==null||i.addEventListener("click",()=>{const s=t.querySelector("[data-cert]");mt().then(l=>{s&&(s.textContent=l?"The certificate proof matches the published public key.":"The certificate proof does not match.")})})}function Br(){if(kr(),Sr(),Er(),Mr(),$r(),!document.getElementById("learnable-reader-live")){const e=document.createElement("p");e.id="learnable-reader-live",e.setAttribute("role","status"),document.body.append(e)}br(),lr()}function qr(e){var t;return(t=document.querySelector("script[src*='learnable']"))==null?void 0:t.getAttribute("data-learnable-api"),Xe()}function Ie(e,n,t){const r=s=>[0,2,4].map(l=>Number.parseInt(s.slice(l,l+2),16)),a=r(e.replace("#","")),o=r(n.replace("#",""));return`#${a.map((s,l)=>Math.round(s+(o[l]-s)*t)).map(s=>s.toString(16).padStart(2,"0")).join("")}`}function Dr(e,n){const r=(Math.min(10,Math.max(1,Math.round(n)))-1)/9;return e==="yb"?{bg:Ie("16140c","12100c",r),fg:Ie("e6c200","ffe566",r),focus:"#ffffff"}:{bg:Ie("1c1c1c","121212",r),fg:Ie("e6e6e6","f2f2f2",r),focus:"#ffe14a"}}const _e="learnable-host-adjust";function Pr(e){const n=e.contrastMode==="off"?null:Dr(e.contrastMode,e.contrastLevel);return`
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
html[data-learnable-text="large"] { font-size: 112.5%; }
${n?`
html[data-learnable-contrast="on"] { --la-hc-bg: ${n.bg}; --la-hc-fg: ${n.fg}; --la-hc-focus: ${n.focus}; }
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
  src: url("${N("/fonts/atkinson-latin-400.woff2")}") format("woff2");
  font-display: swap;
}
@font-face {
  font-family: Literata;
  src: url("${N("/fonts/literata-latin-600.woff2")}") format("woff2");
  font-display: swap;
}
@font-face {
  font-family: "Noto Sans Ethiopic";
  src: url("${N("/fonts/NotoSansEthiopic-Regular.ttf")}") format("truetype");
  font-display: swap;
}
`}function Q(e){const n=document.documentElement;n.dataset.learnableText=e.largeText?"large":"default",n.dataset.learnableMotion=e.stopMotion?"reduce":"allow";let t=document.getElementById(_e);t||(t=document.createElement("style"),t.id=_e,document.head.append(t)),t.textContent=Pr(e),n.dataset.learnableContrast=e.contrastMode==="off"?"off":"on",e.contrastMode==="off"?Zt():gr()}function Rr(){var n;(n=document.getElementById(_e))==null||n.remove();const e=document.documentElement;delete e.dataset.learnableText,delete e.dataset.learnableContrast,delete e.dataset.learnableMotion}function Fr(e){if(e.metaKey||e.ctrlKey||e.altKey)return null;switch(e.key){case" ":case"k":case"K":return{type:"toggle-play"};case"c":case"C":return{type:"cycle-captions"};case"d":case"D":return{type:"toggle-ad"};case"s":case"S":return{type:"toggle-sign"};case"ArrowLeft":return{type:"seek",by:-5};case"ArrowRight":return{type:"seek",by:5};case"j":case"J":return{type:"seek",by:-10};case"l":case"L":return{type:"seek",by:10};case"ArrowUp":return{type:"volume",by:.1};case"ArrowDown":return{type:"volume",by:-.1};case"m":case"M":return{type:"mute"};case"f":case"F":return{type:"fullscreen"};case"Home":return{type:"seek-to",to:"start"};case"End":return{type:"seek-to",to:"end"};case"?":return{type:"help"};default:return null}}function Nr(e,n,t=1){const r=e.trim().split(/\s+/).filter(Boolean).length;return r===0?!1:r/(2.5*Math.min(2,Math.max(.5,t)))>Math.max(0,n)+.25}function Qe(e){return e.replace(/[^\t\n\r\x20-\x7E]/g,"?").replace(/\\/g,"\\\\").replace(/\(/g,"\\(").replace(/\)/g,"\\)")}function Hr(e,n){const t=e.split(/\s+/).filter(Boolean),r=[];let a="";for(const o of t)a?a.length+1+o.length<=n?a+=` ${o}`:(r.push(a),a=o):a=o;return a&&r.push(a),r.length>0?r:[""]}function jr(e){const n=[{tag:"H1",text:e.title},...e.paragraphs.map(h=>({tag:"P",text:h})),{tag:"Figure",text:e.figureAlt}],t=[];let r=740;n.forEach((h,b)=>{if(h.tag==="Figure"){t.push(`/Figure <</MCID ${b}>> BDC`),t.push("0.106 0.188 0.282 RG"),t.push(`56 ${Math.max(72,r-64)} 180 56 re S`),t.push("EMC");return}const p=h.tag==="H1"?18:12,A=p+4,S=Hr(h.text,h.tag==="H1"?58:86);t.push(`/${h.tag} <</MCID ${b}>> BDC`),t.push("BT"),t.push(`/F1 ${p} Tf`),t.push(`1 0 0 1 56 ${r} Tm`),S.forEach((m,y)=>{y>0&&t.push(`0 -${A} Td`),t.push(`(${Qe(m)}) Tj`)}),t.push("ET"),t.push("EMC"),r-=S.length*A+12});const a=t.join(`
`),o=n.map((h,b)=>`${8+b} 0 R`).join(" "),i=n.map((h,b)=>`${8+b} 0 R`).join(" "),s=8+n.length,l=s+1,d=[],c=h=>{d.push(h)};c("<< /Type /Catalog /Pages 3 0 R /Lang (en) /MarkInfo << /Marked true >> /ViewerPreferences << /DisplayDocTitle true >> /StructTreeRoot 2 0 R >>"),c(`<< /Type /StructTreeRoot /K 7 0 R /ParentTree ${s} 0 R >>`),c("<< /Type /Pages /Count 1 /Kids [4 0 R] >>"),c("<< /Type /Page /Parent 3 0 R /MediaBox [0 0 612 792] /Contents 5 0 R /Resources << /Font << /F1 6 0 R >> >> /StructParents 0 /Tabs /S >>"),c(`<< /Length ${a.length} >>
stream
${a}
endstream`),c("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>"),c(`<< /Type /StructElem /S /Document /P 2 0 R /Lang (en) /K [${o}] >>`),n.forEach((h,b)=>{const p=h.tag==="Figure"?` /Alt (${Qe(e.figureAlt)})`:"";c(`<< /Type /StructElem /S /${h.tag} /P 7 0 R /Pg 4 0 R${p} /K << /Type /MCR /Pg 4 0 R /MCID ${b} >> >>`)}),c(`<< /Nums [ 0 [${i}] ] >>`),c(`<< /Title (${Qe(e.title)}) /Author (LearnAble) >>`);let u=`%PDF-1.7
`;const f=[0];d.forEach((h,b)=>{f.push(u.length),u+=`${b+1} 0 obj
${h}
endobj
`});const g=u.length;u+=`xref
0 ${d.length+1}
`,u+=`0000000000 65535 f 
`;for(let h=1;h<f.length;h+=1)u+=`${f[h].toString().padStart(10,"0")} 00000 n 
`;return u+=`trailer
<< /Size ${d.length+1} /Root 1 0 R /Info ${l} 0 R >>
`,u+=`startxref
${g}
%%EOF`,new TextEncoder().encode(u)}function $e(e){(!Number.isFinite(e)||e<0)&&(e=0);const n=Math.floor(e),t=Math.floor(n/60),r=n%60;return`${t}:${r.toString().padStart(2,"0")}`}const Ur={signs:[{match:"Hana opens",gloss:"OPEN",clip:null},{match:"captions she can make larger",gloss:"LARGER",clip:null},{match:"sign window",gloss:"SIGN",clip:null},{match:"Audio description",gloss:"SPEAK",clip:null},{match:"small pack",gloss:"PACK",clip:null},{match:"same one",gloss:"SAME",clip:null}]};function Wr(e){const n=Ur.signs.find(r=>e.toLowerCase().includes(r.match.toLowerCase()));return n?{gloss:n.gloss,clip:n.clip,placeholder:!0}:{gloss:(e.replace(/[^A-Za-z\u1200-\u137F]/g," ").trim().split(/\s+/)[0]||"SIGN").slice(0,12).toUpperCase(),clip:null,placeholder:!0}}function Vr(e){return[...e.toUpperCase()].filter(n=>/[A-Z]/.test(n))}const an=`
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
button[aria-pressed="true"] { background: var(--color-ink); color: var(--color-paper); }
.media-row { display: grid; grid-template-columns: minmax(0, 1fr) 0.5rem var(--sign-col, 16rem); gap: 0.5rem; align-items: start; }
.sign-grip { cursor: col-resize; background: var(--color-moss); color: var(--color-paper); min-height: 2.75rem; }
@media (max-width: 52rem) {
  .media-row { grid-template-columns: 1fr; }
  .sign-grip { display: none; }
}
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
.bar select, .bar a { min-height: 2.75rem; color: var(--color-ink); background: var(--color-paper); }
.bar a { display: inline-flex; align-items: center; padding: 0 0.6rem; text-decoration: underline; }
.sign p { margin: 0.5rem 0.75rem; }
.gloss { font-family: var(--font-display); font-size: 1.6rem; }
.mark { display: block; width: 2.5rem; height: 1.1rem; border: 2px solid var(--color-navy); box-shadow: 0 var(--bar-height) 0 var(--color-caption); margin-bottom: 0.4rem; }
label { display: flex; flex-direction: column; gap: 0.2rem; min-width: 8rem; }
select, input, textarea { color: var(--color-ink); background-color: var(--color-paper); }
input[type="range"] { width: 100%; min-height: 2.75rem; }
section { background: var(--color-paper); color: var(--color-ink); }
.bar {
  position: fixed; z-index: 2147483000; top: auto; bottom: 0.5rem; left: 0.5rem; right: auto;
  background: var(--color-navy); color: var(--color-navy-ink); padding: 0.6rem;
  display: flex; flex-wrap: wrap; gap: 0.4rem; max-width: min(22rem, calc(100vw - 1rem));
  max-height: 70vh; overflow: auto;
}
.transcript { list-style: none; margin: 0.5rem 0; padding: 0; max-height: 16rem; overflow: auto; }
.transcript button { background: transparent; color: var(--color-ink); border: 0; box-shadow: none; text-align: left; width: 100%; }
.sign .row button { background: var(--color-paper); color: var(--color-ink); border-color: var(--color-navy); box-shadow: none; }
.bar button { background: transparent; color: inherit; border-color: transparent; box-shadow: inset 0 calc(var(--bar-height) * -1) 0 transparent; }
.bar button[aria-pressed="true"] { box-shadow: inset 0 calc(var(--bar-height) * -1) 0 var(--color-caption); background: transparent; }
`;function et(e,n,t){const r=new CustomEvent(n,{bubbles:!0,composed:!0,detail:t});e.dispatchEvent(r),window.dispatchEvent(new CustomEvent(n,{detail:t}))}class on extends HTMLElement{constructor(){super();I(this,"root");I(this,"video",null);I(this,"signClip",null);I(this,"en",[]);I(this,"am",[]);I(this,"ad",[]);I(this,"mode","en");I(this,"adOn",!1);I(this,"signOn",!0);I(this,"lastAd","");I(this,"held",!1);I(this,"built",!1);I(this,"onSettings",()=>{this.applySettings()});I(this,"onSpeechCancel",()=>{this.resumeHeld()});this.root=this.attachShadow({mode:"open"})}connectedCallback(){this.built||this.mount(),this.loadTracks(),this.applySettings(),window.addEventListener("learnable-settings",this.onSettings),window.addEventListener("learnable-speech-cancel",this.onSpeechCancel)}refresh(){this.built=!1,this.mount(),this.loadTracks(),this.applySettings()}disconnectedCallback(){window.removeEventListener("learnable-settings",this.onSettings),window.removeEventListener("learnable-speech-cancel",this.onSpeechCancel),Ee()}mount(){var c,u,f,g,h,b;this.built=!0;const t=Me(),r=nn(this,"sign",t.signWindow),a=nn(this,"describe",t.audioDescription),o=this.hasAttribute("offline")||t.offlinePack,i=this.hasAttribute("braille")||t.braille,s=this.hasAttribute("docs")||t.taggedDocs;this.root.innerHTML=`
      <style>${an}</style>
      <section aria-label="LearnAble lesson">
        <div class="media-row">
        <div class="stage" tabindex="0" role="region" aria-label="Lesson picture. Press question mark for keyboard shortcuts.">
          <slot name="media"></slot>
          <video data-fallback playsinline preload="metadata"></video>
          <p class="caption" aria-hidden="true"></p>
        </div>
        <button type="button" class="sign-grip" aria-label="Resize the sign panel">Resize</button>
        ${r?`<aside class="sign" data-sign>
                <h2>Ethiopian Sign Language</h2>
                <p class="sign-note">Placeholder. This is not a recorded signer. A Deaf teacher can add a clip.</p>
                <p class="gloss">OPEN</p>
                <p class="spell" data-spell></p>
                <video data-sign-video muted playsinline preload="metadata" hidden></video>
                <div class="row">
                  <button type="button" data-act="left">Narrower</button>
                  <button type="button" data-act="right">Wider</button>
                  <button type="button" data-act="shrink">Smaller</button>
                  <button type="button" data-act="grow">Larger</button>
                </div>
              </aside>`:""}
        </div>
        <p class="status" aria-live="polite">Paused.</p>
        <div class="row">
          <button type="button" data-act="play">Play</button>
          <button type="button" data-act="captions">Captions: English</button>
          ${a?`<button type="button" data-act="ad" aria-pressed="${x().audioDescription}">Audio description</button>`:""}
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
        <p data-job>${(c=ft[0])==null?void 0:c.summary}</p>
        <div class="row">
          <button type="button" data-act="job">Play audio summary</button>
          <button type="button" data-act="badge">Check certificate</button>
        </div>
        <h2>Session chat</h2>
        <ol class="chat">
          ${we.chat.map(p=>`<li><span>${$e(p.time)}</span> ${p.speaker}: ${p.text}</li>`).join("")}
        </ol>
        <button type="button" data-act="txt">Download transcript text</button>
      </section>
    `,this.bindMedia();const l=this.root.querySelector(".sign-grip");l==null||l.addEventListener("pointerdown",p=>this.dragSign(p)),l==null||l.addEventListener("keydown",p=>{(p.key==="ArrowLeft"||p.key==="ArrowDown")&&this.nudge("left"),(p.key==="ArrowRight"||p.key==="ArrowUp")&&this.nudge("right"),p.key==="Home"&&this.setSignColumn(12),p.key==="End"&&this.setSignColumn(24)});const d=this.root.querySelector(".stage");d==null||d.addEventListener("keydown",p=>this.onKey(p)),this.root.querySelectorAll("button[data-act]").forEach(p=>{p.addEventListener("click",()=>this.onAction(p.dataset.act||""))}),(u=this.root.querySelector("[data-act=size]"))==null||u.addEventListener("input",p=>{const A=Number(p.target.value);C({captionScale:A}),this.styleCaption(A,x().captionPreset)}),(f=this.root.querySelector("[data-act=preset]"))==null||f.addEventListener("change",p=>{const A=p.target.value;C({captionPreset:A}),this.styleCaption(x().captionScale,A)}),(g=this.video)==null||g.addEventListener("timeupdate",()=>this.sync()),(h=this.video)==null||h.addEventListener("play",()=>{this.setPlayLabel(!0),et(this,"learnable-play",{playing:!0})}),(b=this.video)==null||b.addEventListener("pause",()=>{this.setPlayLabel(!1),et(this,"learnable-play",{playing:!1})})}bindMedia(){const t=this.querySelector("video, audio"),r=this.root.querySelector("[data-fallback]");if(t instanceof HTMLMediaElement&&t.slot==="media")this.video=t,r&&(r.hidden=!0),t.setAttribute("playsinline","");else if(r){this.video=r;const i=this.getAttribute("src");i&&(r.src=N(i))}this.ensureDescriptionTrack(),this.signClip=this.root.querySelector("[data-sign-video]");const a=this.getAttribute("sign");this.signClip&&a&&a!=="false"&&(this.signClip.src=N(a));const o=this.querySelector("iframe");o&&!o.getAttribute("title")&&o.setAttribute("title","Embedded lesson video")}signColumn(){const t=this.root.querySelector(".media-row"),r=Number.parseFloat((t==null?void 0:t.style.getPropertyValue("--sign-col"))||"16");return Number.isFinite(r)?r:16}setSignColumn(t){const r=this.root.querySelector(".media-row");r&&r.style.setProperty("--sign-col",`${Math.min(28,Math.max(10,t))}rem`)}dragSign(t){if(t.button!==0)return;const r=t.currentTarget;if(!(r instanceof HTMLElement))return;const a=t.clientX,o=this.signColumn(),i=l=>this.setSignColumn(o+(a-l.clientX)/16),s=()=>{r.removeEventListener("pointermove",i),r.removeEventListener("pointerup",s)};r.setPointerCapture(t.pointerId),r.addEventListener("pointermove",i),r.addEventListener("pointerup",s)}async loadTracks(){this.en=await this.fetchCues(this.getAttribute("captions-en")),this.am=await this.fetchCues(this.getAttribute("captions-am")),this.ad=await this.fetchCues(this.getAttribute("describe"));const t=this.root.querySelector("[data-sign]");t&&(t.hidden=!this.signOn),this.renderTranscript(),this.sync()}renderTranscript(){const t=this.root.querySelector(".transcript");if(!t)return;const r=this.en.length?this.en:this.am;t.replaceChildren();for(const a of r){const o=document.createElement("li"),i=document.createElement("button");i.type="button",i.dataset.seek=String(a.start),i.textContent=`${$e(a.start)} ${a.text}`,i.addEventListener("click",()=>{this.video&&(this.video.currentTime=a.start)}),o.append(i),t.append(o)}}async fetchCues(t){if(!t||t==="false")return[];try{const r=await fetch(N(t));return r.ok?or(await r.text()):[]}catch{return[]}}applySettings(){const t=x();this.mode=t.lang,t.contrastMode!=="off"||t.highContrast?this.setAttribute("contrast","high"):this.removeAttribute("contrast"),this.setAttribute("theme",yr());const r=this.root.querySelector("[data-act=preset]"),a=this.root.querySelector("[data-act=size]");r&&(r.value=t.captionPreset),a&&(a.value=String(t.captionScale)),this.styleCaption(t.captionScale,t.captionPreset),this.adOn=t.audioDescription;const o=this.root.querySelector("[data-act=ad]");o&&o.setAttribute("aria-pressed",String(this.adOn)),this.sync()}ensureDescriptionTrack(){if(!(this.video instanceof HTMLVideoElement))return;const t=this.getAttribute("describe");if(!t||t==="false")return;const r=N(t);let a=this.video.querySelector("track[kind='descriptions']");a||(a=document.createElement("track"),a.kind="descriptions",a.label="Audio description",a.srclang="en",this.video.append(a)),a.getAttribute("src")!==r&&(a.src=r)}resumeHeld(){!this.held||!this.video||(this.held=!1,this.video.play().catch(()=>{}))}styleCaption(t,r){const a=this.root.querySelector(".caption"),o=Jt[r]??Jt.white;a&&(a.style.color=o.fg,a.style.background=o.bg,a.style.fontSize=`${t}rem`)}setPlayLabel(t){const r=this.root.querySelector("[data-act=play]");r&&(r.textContent=t?"Pause":"Play");const a=this.root.querySelector(".status"),o=(a==null?void 0:a.textContent)||"";a&&this.video&&(o.startsWith("Playing")||o.startsWith("Paused"))&&(a.textContent=`${t?"Playing":"Paused"}. ${$e(this.video.currentTime)} of ${$e(this.video.duration||0)}.`)}sync(){var c;if(!this.video)return;const t=this.video.currentTime,r=this.mode==="am"?this.am:this.mode==="en"?this.en:[],a=this.mode==="off"?void 0:Wt(r,t),o=this.root.querySelector(".caption");o&&(o.textContent=(a==null?void 0:a.text)??"",o.setAttribute("lang",this.mode==="am"?"am":"en"));const i=Wr((a==null?void 0:a.text)||""),s=this.root.querySelector(".gloss");s&&(s.textContent=i.gloss);const l=this.root.querySelector("[data-spell]");if(l&&(l.textContent=i.clip?"":`Fingerspelling placeholder: ${Vr(i.gloss).join(" ")}`),this.signClip&&(i.clip?(this.signClip.hidden=!1,this.signClip.getAttribute("src")!==N(i.clip)&&(this.signClip.src=N(i.clip))):this.signClip.hidden=!0),(c=this.signClip)!=null&&c.getAttribute("src")&&this.video&&Math.abs(this.signClip.currentTime-t)>.4&&(this.signClip.currentTime=t),this.adOn){const u=Wt(this.ad,t);if(!u)this.lastAd="";else if(u.text!==this.lastAd){this.lastAd=u.text;const f=x(),g=u.end-u.start;Nr(u.text,g,f.readRate)&&!this.video.paused&&(this.video.pause(),this.held=!0),be(u.text,"en",f.readRate,{pitch:f.readPitch,onend:()=>this.resumeHeld(),oncancel:()=>this.resumeHeld()})}}const d=this.root.querySelector("[data-act=captions]");d&&(d.textContent=this.mode==="off"?"Captions: off":this.mode==="am"?"Captions: Amharic":"Captions: English"),this.setPlayLabel(!this.video.paused)}onKey(t){const r=Fr(t);r&&(t.preventDefault(),r.type==="toggle-play"&&this.toggle(),r.type==="cycle-captions"&&this.cycleCaptions(),r.type==="toggle-ad"&&this.toggleAd(),r.type==="toggle-sign"&&this.toggleSign(),r.type==="seek"&&this.video&&(this.video.currentTime=Math.max(0,this.video.currentTime+r.by)),r.type==="seek-to"&&this.video&&(this.video.currentTime=r.to==="start"?0:this.video.duration||0),r.type==="mute"&&this.video&&(this.video.muted=!this.video.muted),r.type==="volume"&&this.video&&(this.video.volume=Math.min(1,Math.max(0,this.video.volume+r.by))))}async toggle(){var t,r;if(this.video)try{this.video.paused?(await this.video.play(),(t=this.signClip)!=null&&t.getAttribute("src")&&this.signClip.play().catch(()=>{})):(this.video.pause(),(r=this.signClip)==null||r.pause())}catch{this.setStatus("The video did not play. Captions are still listed when the file loads.")}}cycleCaptions(){this.mode=this.mode==="off"?"en":this.mode==="en"?"am":"off",this.sync(),et(this,"learnable-captions",{lang:this.mode})}toggleAd(){const t=!x().audioDescription;C({audioDescription:t}),t||(Ee(),this.resumeHeld())}nudge(t){const r=t==="left"||t==="shrink"?-2:2;this.setSignColumn(this.signColumn()+r)}scaleSign(t){this.setSignColumn(this.signColumn()+t*2)}toggleSign(){this.signOn=!this.signOn;const t=this.root.querySelector("[data-sign]");t&&(t.hidden=!this.signOn);const r=this.root.querySelector("[data-act=sign]");r&&r.setAttribute("aria-pressed",String(this.signOn))}setStatus(t){const r=this.root.querySelector(".status");r&&(r.textContent=t)}textOf(t){return t.map(r=>r.text).join(`
`)}async onAction(t){var r;if(t==="play"&&this.toggle(),t==="captions"&&this.cycleCaptions(),t==="ad"&&this.toggleAd(),t==="sign"&&this.toggleSign(),(t==="left"||t==="right"||t==="up"||t==="down")&&this.nudge(t),(t==="shrink"||t==="grow")&&this.scaleSign(t==="grow"?1:-1),t==="pack")try{const a=await er({english:this.textOf(this.en),amharic:this.textOf(this.am),descriptions:this.textOf(this.ad),audioEn:this.optionalUrl("audio-en"),audioAm:this.optionalUrl("audio-am")});X(a.bytes,"learnable-3g-pack.zip","application/zip"),this.setStatus(a.audio?"3G pack downloaded, with narration and text.":"Text pack downloaded. Narration files were not beside the video.")}catch(a){this.setStatus(a instanceof Error?a.message:"The pack could not be built.")}if(t==="braille"){const a=this.mode==="am"?"am":"en",o=a==="am"?this.textOf(this.am):this.textOf(this.en);X(new TextEncoder().encode(We(o)),`lesson-${a}.brf`,"text/plain"),this.setStatus("Braille file downloaded.")}if(t==="pdf"){try{const o=await fetch(N(this.getAttribute("pdf")||"/media/learnable-lesson.pdf"));if(o.ok){X(new Uint8Array(await o.arrayBuffer()),"learnable-lesson.pdf","application/pdf"),this.setStatus("Tagged PDF downloaded, with Amharic and the picture description.");return}}catch{}const a=jr({title:"LearnAble lesson",paragraphs:this.en.map(o=>o.text),figureAlt:"Lesson picture with English and Amharic captions."});X(a,"learnable-lesson.pdf","application/pdf"),this.setStatus("Tagged PDF downloaded. Amharic stays in the captions.")}if(t==="html"){const a=this.en.map(s=>`<h2>${s.text}</h2>`).join(""),o=this.am.map(s=>`<p lang="am">${s.text}</p>`).join(""),i=`<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><title>LearnAble lesson</title></head><body><main><h1>LearnAble lesson</h1><p>Picture: A navy phone on a paper background, with an English and Amharic caption under the screen.</p>${a}${o}</main></body></html>`;X(new TextEncoder().encode(i),"learnable-lesson.html","text/html"),this.setStatus("HTML text version downloaded, with the picture description.")}if(t==="txt"){const a=`English
${this.textOf(this.en)}

Amharic
${this.textOf(this.am)}
`;X(new TextEncoder().encode(a),"learnable-transcript.txt","text/plain"),this.setStatus("Transcript text downloaded.")}if(t==="vtt-en"||t==="vtt-am"){const a=t==="vtt-am"?this.am:this.en;X(new TextEncoder().encode(Ut(a)),t==="vtt-am"?"captions-am.vtt":"captions-en.vtt","text/vtt"),this.setStatus(t==="vtt-am"?"Amharic captions downloaded.":"English captions downloaded.")}if(t==="job"){const a=((r=this.root.querySelector("[data-job]"))==null?void 0:r.textContent)||"";be(a,"en"),this.setStatus("Playing the job summary on this device.")}if(t==="badge"){const a=await mt();this.setStatus(a?"The certificate proof matches the published public key.":"The certificate proof does not match.")}}optionalUrl(t){const r=this.getAttribute(t);if(!(!r||r==="false"))return N(r)}}let le=[],Be=0,ee=!1,tt=!1;function ae(e){const n=document.getElementById("learnable-reader-live");n&&(n.textContent=e)}function Or(){document.querySelectorAll(".learnable-sentence").forEach(e=>{e.replaceWith(document.createTextNode(e.textContent||""))}),document.querySelectorAll(".is-current").forEach(e=>e.classList.remove("is-current")),tt=!1,le=[]}function Gr(e){const n=document.createTreeWalker(e,NodeFilter.SHOW_TEXT),t=[];for(;n.nextNode();)t.push(n.currentNode);const r=[];return t.forEach(a=>{const o=a.parentElement;if(!o||o.closest("script, style, learnable-player, learnable-toolbar, .learnable-gateway, .learnable-sentence"))return;const i=(a.textContent||"").split(new RegExp("(?<=[.!?])\\s+")).filter(l=>l.trim());if(i.length===0)return;const s=document.createDocumentFragment();i.forEach(l=>{const d=document.createElement("span");d.className="learnable-sentence",d.textContent=l,s.append(d,document.createTextNode(" ")),r.push(d)}),a.replaceWith(s)}),tt=!0,r}function Kr(){const e=document.querySelector("main");if(!e)return[];const n=x().readVerbosity;return n==="headings"?[...e.querySelectorAll("h1, h2, h3")]:n==="links"?[...e.querySelectorAll("a")]:tt?[...e.querySelectorAll(".learnable-sentence")]:Gr(e)}function Yr(){var n;!x().haptics||!("vibrate"in navigator)||(n=navigator.vibrate)==null||n.call(navigator,20)}function sn(){var r,a;(r=window.speechSynthesis)==null||r.cancel();const e=le[Be];if(le.forEach(o=>o.classList.remove("is-current")),!e){ee=!1,ae("Reading stopped.");return}e.classList.add("is-current"),e.scrollIntoView({block:"nearest"});const n=x(),t=new SpeechSynthesisUtterance(e.textContent||"");t.rate=n.readRate,t.pitch=n.readPitch,t.lang=document.documentElement.lang||"en",t.onend=()=>{ee&&(Be+=1,sn())},ae(`Reading ${Be+1} of ${le.length}.`),Yr(),(a=window.speechSynthesis)==null||a.speak(t)}function zr(){if(!window.speechSynthesis){ae("This browser has no speech synthesis. Nothing was spoken.");return}if(le=Kr(),le.length===0){ae("There is no text to read in the main region.");return}ee=!0,sn()}function Zr(){var e;ee=!1,(e=window.speechSynthesis)==null||e.cancel(),ae("Reading paused.")}function nt(){var e;ee=!1,Be=0,(e=window.speechSynthesis)==null||e.cancel(),Or(),ae("Reading stopped. The page text is unchanged.")}function Jr(){ee&&nt()}window.addEventListener("learnable-speech-cancel",()=>{ee&&(ee=!1,ae("Reading paused."))});const Xr={en:{button:"Button",link:"Link",heading:"Heading",level:"level",image:"Image",paragraph:"Paragraph",navigation:"Navigation",main:"Main",banner:"Banner",contentinfo:"Content info",region:"Region",search:"Search",complementary:"Complementary",checkbox:"Checkbox",slider:"Slider",combobox:"List",textbox:"Text field",pressed:"pressed",notPressed:"not pressed",checked:"checked",notChecked:"not checked",expanded:"expanded",collapsed:"collapsed",disabled:"disabled",current:"current"},am:{button:"ቁልፍ",link:"ማገናኛ",heading:"ርዕስ",level:"ደረጃ",image:"ምስል",paragraph:"አንቀጽ",navigation:"አሰሳ",main:"ዋና",banner:"ራስጌ",contentinfo:"ግርጌ",region:"ክልል",search:"ፍለጋ",complementary:"ተጨማሪ",checkbox:"ሳጥን",slider:"ተንሸራታች",combobox:"ዝርዝር",textbox:"የጽሑፍ ሳጥን",pressed:"ተጭኗል",notPressed:"አልተጫነም",checked:"ተመርጧል",notChecked:"አልተመረጠም",expanded:"ተከፍቷል",collapsed:"ተዘግቷል",disabled:"ተሰናክሏል",current:"የአሁኑ"}};function _r(e){var t;return(((t=e.closest("[lang]"))==null?void 0:t.getAttribute("lang"))||document.documentElement.lang||"en").toLowerCase().startsWith("am")?"am":"en"}function Qr(e){const n=e.getAttribute("role");if(n)return n;const t=e.tagName;return t==="A"&&e.hasAttribute("href")?"link":t==="BUTTON"?"button":/^H[1-6]$/.test(t)?"heading":t==="IMG"?"image":t==="NAV"?"navigation":t==="MAIN"?"main":t==="HEADER"?"banner":t==="FOOTER"?"contentinfo":t==="ASIDE"?"complementary":t==="P"?"paragraph":t==="SELECT"?"combobox":t==="TEXTAREA"?"textbox":t==="SECTION"&&(e.hasAttribute("aria-label")||e.hasAttribute("aria-labelledby"))?"region":e instanceof HTMLInputElement?e.type==="checkbox"||e.type==="radio"?"checkbox":e.type==="range"?"slider":e.type==="button"||e.type==="submit"?"button":"textbox":""}function ea(e){var a,o;const n=e.getAttribute("aria-labelledby");if(n){const i=n.split(/\s+/).map(s=>{var l;return((l=document.getElementById(s))==null?void 0:l.textContent)||""}).join(" ").replace(/\s+/g," ").trim();if(i)return i}const t=(a=e.getAttribute("aria-label"))==null?void 0:a.trim();if(t)return t;if(e instanceof HTMLImageElement)return Ge(e)||e.alt.trim();if(e instanceof HTMLInputElement||e instanceof HTMLSelectElement||e instanceof HTMLTextAreaElement){const i=e.id,s=i?document.querySelector(`label[for="${CSS.escape(i)}"]`):null,l=e.closest("label"),d=((s==null?void 0:s.textContent)||(l==null?void 0:l.textContent)||"").replace(/\s+/g," ").trim();if(d)return d}const r=(e.innerText||e.textContent||"").replace(/\s+/g," ").trim();return r?r.slice(0,280):((o=e.getAttribute("title"))==null?void 0:o.trim())||""}function ta(e,n){const r=[...e.querySelectorAll("img")].map(a=>Ge(a)).filter(a=>!!(a&&!n.includes(a)));return r.length===0?n:[n,...r].filter(Boolean).join(". ")}function na(e){if(e===document.body||e===document.documentElement)return null;const n=Qr(e);if(!n&&e.tagName!=="P")return null;const t=_r(e),r=Xr[t],a=r[n]||n;let o=ta(e,ea(e));if(n==="heading"){const u=e.getAttribute("aria-level")||e.tagName.slice(1);o=`${r.level} ${u}, ${o}`.trim()}const i=[],s=e.getAttribute("aria-pressed");s==="true"&&i.push(r.pressed),s==="false"&&i.push(r.notPressed);const l=e.getAttribute("aria-checked")??(e instanceof HTMLInputElement&&e.type==="checkbox"?String(e.checked):null);l==="true"&&i.push(r.checked),l==="false"&&i.push(r.notChecked);const d=e.getAttribute("aria-expanded");d==="true"&&i.push(r.expanded),d==="false"&&i.push(r.collapsed),(e.hasAttribute("disabled")||e.getAttribute("aria-disabled")==="true")&&i.push(r.disabled),e.hasAttribute("aria-current")&&e.getAttribute("aria-current")!=="false"&&i.push(r.current);const c=[a,o,...i].filter(Boolean).join(", ");return c.trim()?{text:c,lang:t}:null}function ln(e){return e.composedPath().some(n=>n instanceof HTMLElement?n.isContentEditable?!0:n.tagName==="INPUT"||n.tagName==="TEXTAREA"||n.tagName==="SELECT":!1)}function ra(e){return e.composedPath().some(n=>n instanceof HTMLElement&&n.tagName==="LEARNABLE-PLAYER")}function rt(e,n){return e.altKey||e.ctrlKey||e.metaKey?!1:n==="?"?e.key==="?":e.key.toLowerCase()===n.toLowerCase()}function aa(e,n){const t=n.split("+").map(s=>s.trim().toLowerCase()).filter(Boolean);if(t.length===0)return!1;const r=t[t.length-1],a=t.includes("alt"),o=t.includes("shift"),i=t.includes("ctrl")||t.includes("control");return a!==e.altKey||o!==e.shiftKey||i!==(e.ctrlKey||e.metaKey)?!1:e.key.toLowerCase()===r}const oe="learnable-voice-prompt",ce="learnable-help";let cn=!1,at=0,ot=null;function it(e){const n=document.getElementById("learnable-reader-live");n&&(n.textContent="",n.textContent=e)}function oa(){var n,t;const e=(t=(n=document.querySelector("learnable-toolbar"))==null?void 0:n.shadowRoot)==null?void 0:t.querySelector("[data-act=voice]");e==null||e.focus()}function un(e,n){if(n.key!=="Tab")return;const t=[...e.querySelectorAll("button, a[href], input, select, textarea")].filter(i=>!i.hasAttribute("disabled"));if(t.length===0)return;const r=t[0],a=t[t.length-1],o=e.contains(document.activeElement)?document.activeElement:null;n.shiftKey&&(o===r||!o)?(n.preventDefault(),a.focus()):!n.shiftKey&&o===a&&(n.preventDefault(),r.focus())}function ve(e,n){var t;C({voice:e,voiceChosen:!0,...n==="prompt"?{audioDescription:e}:{}}),(t=document.getElementById(oe))==null||t.remove(),it(e?"LearnAble voice on.":"LearnAble voice off."),e?be("LearnAble voice on.","en",x().readRate):Ee(),n==="prompt"&&(at=0,oa())}function ia(){var n,t,r;if(x().voiceChosen||document.getElementById(oe)||!document.body)return;const e=document.createElement("div");e.id=oe,e.className="learnable-dialog",e.tabIndex=-1,e.setAttribute("role","alertdialog"),e.setAttribute("aria-modal","true"),e.setAttribute("aria-labelledby","learnable-voice-title"),e.setAttribute("aria-describedby","learnable-voice-desc"),e.innerHTML=`
    <h2 id="learnable-voice-title">LearnAble voice</h2>
    <p id="learnable-voice-desc">LearnAble can speak the control, heading, or picture you move to. If you already use a screen reader, turn this voice off so the two do not talk at once. Some browsers speak only after the first click or key. Choosing here unlocks that. Escape turns the voice off.</p>
    <div class="learnable-row">
      <button type="button" data-voice="keep">Keep LearnAble voice</button>
      <button type="button" data-voice="reader">I use my own screen reader (turn LearnAble voice off)</button>
    </div>
  `,(n=e.querySelector("[data-voice=keep]"))==null||n.addEventListener("click",()=>ve(!0,"prompt")),(t=e.querySelector("[data-voice=reader]"))==null||t.addEventListener("click",()=>ve(!1,"prompt")),document.body.append(e),(r=e.querySelector("[data-voice=keep]"))==null||r.focus()}function sa(){const e=x().keys;return`
    <li>Tab and Shift+Tab move through the page. The skip link is first.</li>
    <li>${e.heading.toUpperCase()} next heading. Shift+${e.heading.toUpperCase()} previous heading.</li>
    <li>${e.landmark.toUpperCase()} next landmark. Shift+${e.landmark.toUpperCase()} previous landmark.</li>
    <li>${e.help} opens this help. Escape closes it and returns focus.</li>
    <li>${e.voice} toggles LearnAble voice. The LearnAble voice button does the same. This chord is not an NVDA, JAWS, Orca, VoiceOver, or Chrome shortcut. On some Mac layouts it types a character in a text field, so it does not run there.</li>
    <li>Picture frame, while it is focused: Space or K play, C captions, D audio description, S sign panel, arrows seek, J and L move further. L is landmarks everywhere else.</li>
    <li>NVDA and JAWS browse mode take H and L before the page sees them. That is expected.</li>
    <li>Single-letter keys do nothing in a text field, and they can be turned off or changed below.</li>
  `}function dn(e){var a,o,i;if(document.getElementById(oe))return;ot=e??(document.activeElement instanceof HTMLElement?document.activeElement:null),(a=document.getElementById(ce))==null||a.remove();const n=x().keys,t=document.createElement("div");t.id=ce,t.className="learnable-dialog",t.tabIndex=-1,t.setAttribute("role","dialog"),t.setAttribute("aria-modal","true"),t.setAttribute("aria-labelledby","learnable-help-title"),t.innerHTML=`
    <h2 id="learnable-help-title">Keyboard shortcuts</h2>
    <ul>${sa()}</ul>
    <div class="learnable-row">
      <label>Heading key <input data-map="heading" value="${qe(n.heading)}" maxlength="8" /></label>
      <label>Landmark key <input data-map="landmark" value="${qe(n.landmark)}" maxlength="8" /></label>
      <label>Help key <input data-map="help" value="${qe(n.help)}" maxlength="8" /></label>
      <label>Voice shortcut <input data-map="voice" value="${qe(n.voice)}" maxlength="32" /></label>
    </div>
    <div class="learnable-row">
      <button type="button" data-help="close">Close shortcuts</button>
    </div>
  `,t.querySelectorAll("[data-map]").forEach(s=>{s.addEventListener("change",()=>{const l=s.dataset.map,d=s.value.trim();d&&C({keys:{...x().keys,[l]:d}})})});const r=()=>hn();(o=t.querySelector("[data-help=close]"))==null||o.addEventListener("click",r),document.body.append(t),(i=t.querySelector("[data-help=close]"))==null||i.focus()}function hn(){var n;(n=document.getElementById(ce))==null||n.remove();const e=ot;ot=null,e==null||e.focus()}function la(e){if(e.closest(`#${oe}, #${ce}, [hidden]`))return!1;const n=getComputedStyle(e);return n.display!=="none"&&n.visibility!=="hidden"}function ca(e){(!e.matches("a[href], button, input, select, textarea, summary, [tabindex]")||e.tabIndex<0)&&(e.tabIndex=-1),e.focus()}function fn(e,n){const t=[...document.querySelectorAll(e)].filter(la),r=[...new Set(t)];if(r.length===0)return;const a=document.activeElement instanceof HTMLElement?document.activeElement:null;let o=r.findIndex(s=>s===a||s.contains(a));o<0&&(o=n>0?-1:0);const i=r[(o+n+r.length)%r.length];ca(i)}const ua="header, [role='banner'], nav, [role='navigation'], main, [role='main'], footer, [role='contentinfo'], aside, [role='complementary'], [role='search'], form[aria-label], form[aria-labelledby], section[aria-label], section[aria-labelledby]";function da(e){if(performance.now()>at)return;const n=e.composedPath()[0];if(!(n instanceof HTMLElement)||n.closest(`#${oe}, #${ce}`))return;const t=x();if(!t.voice||!t.voiceChosen)return;const r=na(n);r&&be(r.text,r.lang,t.readRate,{pitch:t.readPitch})}function ha(e){at=performance.now()+800,Pt();const n=x(),t=document.getElementById(oe),r=document.getElementById(ce);if(t&&un(t,e),r&&un(r,e),aa(e,n.keys.voice)&&!ln(e)){e.preventDefault(),e.stopPropagation(),ve(!x().voice,"toggle");return}if(Ee(),window.dispatchEvent(new CustomEvent("learnable-speech-cancel")),e.key==="Escape"){if(t){e.preventDefault(),ve(!1,"prompt");return}if(r){e.preventDefault(),e.stopPropagation(),hn();return}Jr()}if(!(t||r)&&!(ln(e)||!n.keyboard)){if(rt(e,n.keys.help)){e.preventDefault(),e.stopPropagation(),dn(document.activeElement instanceof HTMLElement?document.activeElement:null);return}ra(e)||(rt(e,n.keys.heading)?(e.preventDefault(),fn("h1, h2, h3, h4, h5, h6",e.shiftKey?-1:1)):rt(e,n.keys.landmark)&&(e.preventDefault(),fn(ua,e.shiftKey?-1:1)))}}function fa(){Pt(),nr()}function qe(e){return e.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;")}function pa(){if(document.getElementById("learnable-reader-live")||!document.body)return;const e=document.createElement("p");e.id="learnable-reader-live",e.setAttribute("role","status"),e.setAttribute("aria-live","polite"),document.body.append(e)}function ma(){pa(),ia(),!cn&&(cn=!0,document.addEventListener("keydown",ha,!0),document.addEventListener("focusin",da,!0),document.addEventListener("pointerdown",fa,!0))}class ga extends HTMLElement{constructor(){super();I(this,"root");I(this,"built",!1);this.root=this.attachShadow({mode:"open"})}connectedCallback(){var t,r,a,o,i,s,l,d,c,u,f,g,h,b,p,A,S;this.built||(this.built=!0,this.root.innerHTML=`
      <style>${an}</style>
      <div class="bar" role="group" aria-label="LearnAble display">
        <button type="button" data-act="voice" aria-pressed="true" aria-keyshortcuts="Alt+Shift+S">LearnAble voice</button>
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
      </div>
    `,this.root.querySelectorAll("button[data-key]").forEach(m=>{m.addEventListener("click",()=>{const y=m.dataset.key,E=x(),q=C({[y]:!E[y]});Q(q),this.reflect()})}),(t=this.root.querySelector("[data-key=captionScale]"))==null||t.addEventListener("input",m=>{const y=C({captionScale:Number(m.target.value)});Q(y)}),(r=this.root.querySelector("[data-key=captionPreset]"))==null||r.addEventListener("change",m=>{const y=C({captionPreset:m.target.value});Q(y)}),(a=this.root.querySelector("[data-key=uiLang]"))==null||a.addEventListener("change",m=>{C({uiLang:m.target.value==="am"?"am":"en"}),this.reflect()}),(o=this.root.querySelector("[data-key=contrastMode]"))==null||o.addEventListener("change",m=>{const y=m.target.value,E=C({contrastMode:y==="bw"||y==="yb"?y:"off"});Q(E),this.reflect()}),(i=this.root.querySelector("[data-key=contrastLevel]"))==null||i.addEventListener("input",m=>{const y=C({contrastLevel:Number(m.target.value)});Q(y),this.reflect()}),(s=this.root.querySelector("[data-key=readRate]"))==null||s.addEventListener("input",m=>{C({readRate:Number(m.target.value)})}),(l=this.root.querySelector("[data-key=readPitch]"))==null||l.addEventListener("input",m=>{C({readPitch:Number(m.target.value)})}),(d=this.root.querySelector("[data-key=readVerbosity]"))==null||d.addEventListener("change",m=>{const y=m.target.value;C({readVerbosity:y==="headings"||y==="links"?y:"sentences"})}),(c=this.root.querySelector("[data-key=haptics]"))==null||c.addEventListener("change",m=>{C({haptics:m.target.checked})}),(u=this.root.querySelector("[data-act=read-play]"))==null||u.addEventListener("click",()=>zr()),(f=this.root.querySelector("[data-act=read-pause]"))==null||f.addEventListener("click",()=>Zr()),(g=this.root.querySelector("[data-act=read-stop]"))==null||g.addEventListener("click",()=>nt()),this.root.addEventListener("keydown",m=>{m instanceof KeyboardEvent&&m.key==="Escape"&&nt()}),(h=this.root.querySelector("[data-act=voice]"))==null||h.addEventListener("click",()=>{ve(!x().voice,"toggle")}),(b=this.root.querySelector("[data-act=describe]"))==null||b.addEventListener("click",()=>{const m=!x().audioDescription;C({audioDescription:m}),it(m?"Audio description on.":"Audio description off.")}),(p=this.root.querySelector("[data-act=keys]"))==null||p.addEventListener("click",()=>{const m=!x().keyboard;C({keyboard:m}),it(m?"Keyboard shortcuts on.":"Keyboard shortcuts off. The buttons still work.")}),(A=this.root.querySelector("[data-act=help]"))==null||A.addEventListener("click",m=>{dn(m.currentTarget instanceof HTMLElement?m.currentTarget:null)}),window.addEventListener("learnable-settings",()=>this.reflect()),(S=this.root.querySelector("[data-act=images]"))==null||S.addEventListener("click",()=>{var E;const m=((E=this.root.querySelector("[data-act=consent]"))==null?void 0:E.checked)===!0,y=this.root.querySelector("[data-note]");y&&(y.textContent=m?qr():Xe())}),this.reflect())}reflect(){const t=x();this.root.querySelectorAll("button[data-key]").forEach(m=>{const y=m.dataset.key;m.setAttribute("aria-pressed",String(t[y]))});const r=Oe[t.uiLang];this.root.querySelector("[data-key=largeText]").textContent=r.larger,this.root.querySelector("[data-key=stopMotion]").textContent=r.stop;const a=this.root.querySelector("[data-act=images]");a&&(a.textContent=r.images);const o=this.root.querySelector("[href='#learnable-pipeline']"),i=this.root.querySelector("[href='#learnable-job']"),s=this.root.querySelector("[href='#learnable-session']");o&&(o.textContent=r.pipeline),i&&(i.textContent=r.job),s&&(s.textContent=r.session);const l=this.root.querySelector("[data-key=captionScale]"),d=this.root.querySelector("[data-key=captionPreset]"),c=this.root.querySelector("[data-key=uiLang]");l&&(l.value=String(t.captionScale)),d&&(d.value=t.captionPreset),c&&(c.value=t.uiLang);const u=this.root.querySelector("[data-key=contrastMode]"),f=this.root.querySelector("[data-key=contrastLevel]"),g=this.root.querySelector("[data-contrast-value]");u&&(u.value=t.contrastMode),f&&(f.value=String(t.contrastLevel)),g&&(g.textContent=String(t.contrastLevel));const h=this.root.querySelector("[data-key=haptics]");h&&(h.checked=t.haptics);const b=this.root.querySelector("[data-act=voice]"),p=this.root.querySelector("[data-act=describe]"),A=this.root.querySelector("[data-act=keys]");b&&(b.setAttribute("aria-pressed",String(t.voice)),b.setAttribute("aria-keyshortcuts",t.keys.voice)),p&&p.setAttribute("aria-pressed",String(t.audioDescription)),A&&A.setAttribute("aria-pressed",String(t.keyboard));const S=document.querySelector(".learnable-skip");S&&(S.textContent=r.skip),t.contrastMode!=="off"?this.setAttribute("contrast","high"):this.removeAttribute("contrast")}}kn(document.currentScript instanceof HTMLScriptElement?document.currentScript:null);let pn=!1,ie=null;function mn(){customElements.get("learnable-player")||customElements.define("learnable-player",on),customElements.get("learnable-toolbar")||customElements.define("learnable-toolbar",ga)}function ba(){const e=document.querySelector("script[src*='learnable']"),n=e==null?void 0:e.getAttribute("data-learnable-enhance"),t=document.documentElement.dataset.learnableEnhance,r=e==null?void 0:e.getAttribute("data-learnable-lang"),a=e==null?void 0:e.getAttribute("data-learnable-voice");return{enhance:!(t==="off"||n==="false"||n==="off"),lang:r==="am"||r==="en"?r:void 0,assetBase:(e==null?void 0:e.getAttribute("data-learnable-base"))||void 0,voice:a==="on"||a==="off"?a:void 0}}function ya(){var e;if(!ye("toolbar")||!Me().toolbar||document.documentElement.dataset.learnableToolbar==="page"){ie==null||ie.remove(),ie=null;return}document.querySelector("learnable-toolbar")||(ie=document.createElement("learnable-toolbar"),ie.dataset.auto="true",(e=document.body)==null||e.append(ie))}function gn(e={}){const n=ba(),t=e.enhance!==void 0?e.enhance:n.enhance;vr({...n,...e,enhance:t}),Sn(e.assetBase||n.assetBase),mn(),Q(x()),ya(),t!==!1&&Br(),ma(),document.querySelectorAll("learnable-player").forEach(r=>{r instanceof on&&r.refresh()}),pn=!0,window.dispatchEvent(new CustomEvent("learnable-ready",{detail:{settings:x(),features:Me()}}))}function st(){const e=tn();C(e),gn()}function bn(e={}){return gn(e),lt}function yn(){const e=xr();return Rr(),Q(e),e}const lt={init:bn,boot:st,reset:yn,getSettings:x,setSettings(e){const n=C(e);return Q(n),n},getFeatures:Me,version:"0.3.0"};if(typeof window<"u"){window.LearnAble=lt,mn();const e=()=>{pn||st()};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e):e()}return F.boot=st,F.default=lt,F.init=bn,F.reset=yn,Object.defineProperties(F,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}}),F})({});typeof LearnAble<"u"&&LearnAble.default&&(window.LearnAble=LearnAble.default);
//# sourceMappingURL=learnable.js.map
