var LearnAble=(function(R){"use strict";var Qn=Object.defineProperty;var tr=(R,P,U)=>P in R?Qn(R,P,{enumerable:!0,configurable:!0,writable:!0,value:U}):R[P]=U;var B=(R,P,U)=>tr(R,typeof P!="symbol"?P+"":P,U);let P="",U="";function Ne(t){t!=null&&t.src&&(P=new URL(".",t.src).href)}function je(t){t&&(U=new URL(t,document.baseURI).href,U.endsWith("/")||(U+="/"))}function We(){return U||P||new URL("/",document.baseURI).href}function Z(t){return!t||t==="false"||/^(https?:|data:|blob:)/i.test(t)?t:t.startsWith("/")?new URL(t,document.baseURI).href:new URL(t,We()).href}const ft={segments:[{start:0,end:5.19,en:"Hana opens her lesson on a phone in Addis Ababa.",am:"ሃና ትምህርቷን በአዲስ አበባ በስልኳ ትከፍታለች።",ad:"A phone is drawn on a paper-coloured screen, with a short caption under it.",gloss:"OPEN"},{start:5.19,end:11.702,en:"She needs English and Amharic captions she can make larger.",am:"የእንግሊዝኛ እና የአማርኛ ጽሑፍ መግለጫዎችን ማተለቅ ትፈልጋለች።",ad:"The caption bar grows taller. The letters are yellow on a black band.",gloss:"LARGER"},{start:11.702,end:22.036,en:"A sign window can move and grow, so Ethiopian Sign Language sits where she needs it.",am:"የምልክት መስኮቱን ማንቀሳቀስና ማተለቅ ትችላለች። የኢትዮጵያ የምልክት ቋንቋ የምትፈልገውን ቦታ ይይዛል።",ad:"A second window lifts off the phone. It is labelled Ethiopian Sign Language.",gloss:"SIGN"},{start:22.036,end:28.919,en:"Audio description says what the picture is doing, for a learner who cannot see it.",am:"የድምጽ መግለጫ ሥዕሉ ምን እንደሚያደርግ ይናገራል። ለማያየው ተማሪ ነው።",ad:"A round speaker icon appears beside the phone.",gloss:"SPEAK"},{start:28.919,end:36.761,en:"When the network is slow she keeps a small pack: sound, text, and a light page.",am:"ኔትወርኩ ሲዘገይ ትንሽ ጥቅል ታስቀምጣለች። ድምጽ፣ ጽሑፍ፣ እና ቀላል ገጽ።",ad:"The phone is replaced by a short stack of pages and a sound file.",gloss:"PACK"},{start:36.761,end:43.179,en:"The lesson on this page is the same one, with the network or without it.",am:"በዚህ ገጽ ላይ ያለው ትምህርት አንድ ነው። ኔትወርክ ቢኖርም ባይኖርም።",ad:"The stack of pages stays in the centre of the screen.",gloss:"SAME"}],chat:[{time:.4,speaker:"Facilitator",text:"We are watching together. Captions are on."},{time:5.590000000000001,speaker:"Hana",text:"Please make the Amharic text larger."},{time:12.102,speaker:"Facilitator",text:"Move the sign window if it covers the caption."},{time:22.436,speaker:"Yonas",text:"I will turn on audio description."},{time:29.319,speaker:"Hana",text:"I am saving the small pack before the network drops."},{time:37.161,speaker:"Facilitator",text:"The text page matches what you just heard."}]},zt=[{id:"caption-partner",title:"Caption partner",titleAm:"የንዑስ ጽሑፍ አጋር",org:"Bole Open Classroom",place:"Addis Ababa",time:"Part time",access:"The summary is on the card, and the same words can be spoken. This card is a fictional demo.",summary:"Bole Open Classroom is hiring a caption partner in Addis Ababa. The work is part time. You write English and Amharic captions for short lessons. You need a careful ear and a phone that can play audio. This card is a fictional demo for the hackathon, so an employer can hear how a job summary sounds."},{id:"caption-intern",title:"Caption intern",titleAm:"የንዑስ ጽሑፍ ልምምድ",org:"Community radio",place:"Bahir Dar",time:"Sample stipend",access:"Deaf applicants are welcome in this story. Ethiopian Sign Language is used in the newsroom two days a week. Fictional demo.",summary:"Turn recorded Amharic shows into captions. A senior editor checks every file. This card is a fictional demo, so the stipend is not a real offer."},{id:"pdf-maker",title:"Accessible PDF maker",titleAm:"ተደራሽ ፒዲኤፍ አዘጋጅ",org:"Training desk",place:"Remote, sized for 3G",time:"Sample contract",access:"The work can be done from a downloaded pack. Live video meetings are not required. Fictional demo.",summary:"Add image descriptions and tags to training documents that already exist. This card is a fictional demo, so the contract is not a real offer."}],Zt={publicKey:{crv:"Ed25519",x:"UXNpzoUhtt_tIteTXTiCYkiF4KBKlRyXYLi4Y3vyQdY",kty:"OKP"},jwt:"eyJhbGciOiJFZERTQSIsInR5cCI6InZjK2p3dCIsImtpZCI6ImxlYXJuYWJsZS1kZW1vIn0.eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvbnMvY3JlZGVudGlhbHMvdjIiLCJodHRwczovL3B1cmwuaW1zZ2xvYmFsLm9yZy9zcGVjL29iL3YzcDAvY29udGV4dC0zLjAuMy5qc29uIl0sInR5cGUiOlsiVmVyaWZpYWJsZUNyZWRlbnRpYWwiLCJPcGVuQmFkZ2VDcmVkZW50aWFsIl0sImlzc3VlciI6eyJpZCI6Imh0dHBzOi8vbGVhcm5hYmxlLmxvY2FsL2lzc3VlciIsInR5cGUiOlsiUHJvZmlsZSJdLCJuYW1lIjoiTGVhcm5BYmxlIGRlbW8ifSwidmFsaWRGcm9tIjoiMjAyNi0xMS0xNVQwMDowMDowMFoiLCJuYW1lIjoiQWNjZXNzaWJsZSBtZWRpYSwgZGVtbyBsZXNzb24iLCJjcmVkZW50aWFsU3ViamVjdCI6eyJ0eXBlIjpbIkFjaGlldmVtZW50U3ViamVjdCJdLCJuYW1lIjoiSGFuYSBCZWtlbGUiLCJpZGVudGlmaWVyIjoiaGFuYS1kZW1vLTIwMjYiLCJhY2hpZXZlbWVudCI6eyJpZCI6Imh0dHBzOi8vbGVhcm5hYmxlLmxvY2FsL2FjaGlldmVtZW50cy9hY2Nlc3NpYmxlLW1lZGlhLWRlbW8iLCJ0eXBlIjpbIkFjaGlldmVtZW50Il0sIm5hbWUiOiJBY2Nlc3NpYmxlIG1lZGlhLCBkZW1vIGxlc3NvbiIsImRlc2NyaXB0aW9uIjoiQ29tcGxldGVkIHRoZSBMZWFybkFibGUgZGVtbyBvbiBjYXB0aW9ucywgc2lnbiwgYXVkaW8gZGVzY3JpcHRpb24sIGFuZCB0aGUgb2ZmbGluZSBwYWNrLiJ9fX0.v-8f4fVY60MgLeFQY6uJv6gwqqBQdcJijKgEjRh_sxwvqfcMjaFOV1V3WDLrETBkIKTr5UeChmFH4OPP-ZAlCw"};function Ue(t){const n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",e=t.replace(/-/g,"+").replace(/_/g,"/").replace(/=+$/,""),r=new Uint8Array(Math.floor(e.length*3/4));let a=0,o=0,i=0;for(const s of e){const l=n.indexOf(s);if(l<0)return new Uint8Array;a=a<<6|l,o+=6,o>=8&&(o-=8,r[i]=a>>o&255,i+=1)}return r.subarray(0,i)}async function Ht(t=Zt.jwt,n=Zt.publicKey){const[e,r,a]=t.split(".");if(!e||!r||!a)return!1;const o=await crypto.subtle.importKey("jwk",n,{name:"Ed25519"},!1,["verify"]),i=new TextEncoder().encode(`${e}.${r}`);return crypto.subtle.verify({name:"Ed25519"},o,Ue(a),i)}var C=Uint8Array,F=Uint16Array,wt=Int32Array,At=new C([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),St=new C([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),Jt=new C([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),Kt=function(t,n){for(var e=new F(31),r=0;r<31;++r)e[r]=n+=1<<t[r-1];for(var a=new wt(e[30]),r=1;r<30;++r)for(var o=e[r];o<e[r+1];++o)a[o]=o-e[r]<<5|r;return{b:e,r:a}},Xt=Kt(At,2),Ye=Xt.b,kt=Xt.r;Ye[28]=258,kt[258]=28;for(var Ge=Kt(St,0),_t=Ge.r,Et=new F(32768),y=0;y<32768;++y){var H=(y&43690)>>1|(y&21845)<<1;H=(H&52428)>>2|(H&13107)<<2,H=(H&61680)>>4|(H&3855)<<4,Et[y]=((H&65280)>>8|(H&255)<<8)>>1}for(var lt=(function(t,n,e){for(var r=t.length,a=0,o=new F(n);a<r;++a)t[a]&&++o[t[a]-1];var i=new F(n);for(a=1;a<n;++a)i[a]=i[a-1]+o[a-1]<<1;var s;if(e){s=new F(1<<n);var l=15-n;for(a=0;a<r;++a)if(t[a])for(var d=a<<4|t[a],c=n-t[a],u=i[t[a]-1]++<<c,f=u|(1<<c)-1;u<=f;++u)s[Et[u]>>l]=d}else for(s=new F(r),a=0;a<r;++a)t[a]&&(s[a]=Et[i[t[a]-1]++]>>15-t[a]);return s}),Q=new C(288),y=0;y<144;++y)Q[y]=8;for(var y=144;y<256;++y)Q[y]=9;for(var y=256;y<280;++y)Q[y]=7;for(var y=280;y<288;++y)Q[y]=8;for(var pt=new C(32),y=0;y<32;++y)pt[y]=5;var Oe=lt(Q,9,0),Ve=lt(pt,5,0),Qt=function(t){return(t+7)/8|0},te=function(t,n,e){return(e==null||e>t.length)&&(e=t.length),new C(t.subarray(n,e))},ze=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],gt=function(t,n,e){var r=new Error(n||ze[t]);if(r.code=t,Error.captureStackTrace&&Error.captureStackTrace(r,gt),!e)throw r;return r},z=function(t,n,e){e<<=n&7;var r=n/8|0;t[r]|=e,t[r+1]|=e>>8},ct=function(t,n,e){e<<=n&7;var r=n/8|0;t[r]|=e,t[r+1]|=e>>8,t[r+2]|=e>>16},Ct=function(t,n){for(var e=[],r=0;r<t.length;++r)t[r]&&e.push({s:r,f:t[r]});var a=e.length,o=e.slice();if(!a)return{t:ae,l:0};if(a==1){var i=new C(e[0].s+1);return i[e[0].s]=1,{t:i,l:1}}e.sort(function(M,I){return M.f-I.f}),e.push({s:-1,f:25001});var s=e[0],l=e[1],d=0,c=1,u=2;for(e[0]={s:-1,f:s.f+l.f,l:s,r:l};c!=a-1;)s=e[e[d].f<e[u].f?d++:u++],l=e[d!=c&&e[d].f<e[u].f?d++:u++],e[c++]={s:-1,f:s.f+l.f,l:s,r:l};for(var f=o[0].s,r=1;r<a;++r)o[r].s>f&&(f=o[r].s);var p=new F(f+1),h=Tt(e[c-1],p,0);if(h>n){var r=0,m=0,g=h-n,v=1<<g;for(o.sort(function(I,A){return p[A.s]-p[I.s]||I.f-A.f});r<a;++r){var L=o[r].s;if(p[L]>n)m+=v-(1<<h-p[L]),p[L]=n;else break}for(m>>=g;m>0;){var D=o[r].s;p[D]<n?m-=1<<n-p[D]++-1:++r}for(;r>=0&&m;--r){var w=o[r].s;p[w]==n&&(--p[w],++m)}h=n}return{t:new C(p),l:h}},Tt=function(t,n,e){return t.s==-1?Math.max(Tt(t.l,n,e+1),Tt(t.r,n,e+1)):n[t.s]=e},ee=function(t){for(var n=t.length;n&&!t[--n];);for(var e=new F(++n),r=0,a=t[0],o=1,i=function(l){e[r++]=l},s=1;s<=n;++s)if(t[s]==a&&s!=n)++o;else{if(!a&&o>2){for(;o>138;o-=138)i(32754);o>2&&(i(o>10?o-11<<5|28690:o-3<<5|12305),o=0)}else if(o>3){for(i(a),--o;o>6;o-=6)i(8304);o>2&&(i(o-3<<5|8208),o=0)}for(;o--;)i(a);o=1,a=t[s]}return{c:e.subarray(0,r),n}},ut=function(t,n){for(var e=0,r=0;r<n.length;++r)e+=t[r]*n[r];return e},ne=function(t,n,e){var r=e.length,a=Qt(n+2);t[a]=r&255,t[a+1]=r>>8,t[a+2]=t[a]^255,t[a+3]=t[a+1]^255;for(var o=0;o<r;++o)t[a+o+4]=e[o];return(a+4+r)*8},re=function(t,n,e,r,a,o,i,s,l,d,c){z(n,c++,e),++a[256];for(var u=Ct(a,15),f=u.t,p=u.l,h=Ct(o,15),m=h.t,g=h.l,v=ee(f),L=v.c,D=v.n,w=ee(m),M=w.c,I=w.n,A=new F(19),x=0;x<L.length;++x)++A[L[x]&31];for(var x=0;x<M.length;++x)++A[M[x]&31];for(var b=Ct(A,7),$=b.t,at=b.l,q=19;q>4&&!$[Jt[q-1]];--q);var ot=d+5<<3,N=ut(a,Q)+ut(o,pt)+i,j=ut(a,f)+ut(o,m)+i+14+3*q+ut(A,$)+2*A[16]+3*A[17]+7*A[18];if(l>=0&&ot<=N&&ot<=j)return ne(n,c,t.subarray(l,l+d));var G,k,W,_;if(z(n,c,1+(j<N)),c+=2,j<N){G=lt(f,p,0),k=f,W=lt(m,g,0),_=m;var Yt=lt($,at,0);z(n,c,D-257),z(n,c+5,I-1),z(n,c+10,q-4),c+=14;for(var x=0;x<q;++x)z(n,c+3*x,$[Jt[x]]);c+=3*q;for(var O=[L,M],ht=0;ht<2;++ht)for(var it=O[ht],x=0;x<it.length;++x){var V=it[x]&31;z(n,c,Yt[V]),c+=$[V],V>15&&(z(n,c,it[x]>>5&127),c+=it[x]>>12)}}else G=Oe,k=Q,W=Ve,_=pt;for(var x=0;x<s;++x){var E=r[x];if(E>255){var V=E>>18&31;ct(n,c,G[V+257]),c+=k[V+257],V>7&&(z(n,c,E>>23&31),c+=At[V]);var st=E&31;ct(n,c,W[st]),c+=_[st],st>3&&(ct(n,c,E>>5&8191),c+=St[st])}else ct(n,c,G[E]),c+=k[E]}return ct(n,c,G[256]),c+k[256]},Ze=new wt([65540,131080,131088,131104,262176,1048704,1048832,2114560,2117632]),ae=new C(0),He=function(t,n,e,r,a,o){var i=o.z||t.length,s=new C(r+i+5*(1+Math.ceil(i/7e3))+a),l=s.subarray(r,s.length-a),d=o.l,c=(o.r||0)&7;if(n){c&&(l[0]=o.r>>3);for(var u=Ze[n-1],f=u>>13,p=u&8191,h=(1<<e)-1,m=o.p||new F(32768),g=o.h||new F(h+1),v=Math.ceil(e/3),L=2*v,D=function(Vt){return(t[Vt]^t[Vt+1]<<v^t[Vt+2]<<L)&h},w=new wt(25e3),M=new F(288),I=new F(32),A=0,x=0,b=o.i||0,$=0,at=o.w||0,q=0;b+2<i;++b){var ot=D(b),N=b&32767,j=g[ot];if(m[N]=j,g[ot]=N,at<=b){var G=i-b;if((A>7e3||$>24576)&&(G>423||!d)){c=re(t,l,0,w,M,I,x,$,q,b-q,c),$=A=x=0,q=b;for(var k=0;k<286;++k)M[k]=0;for(var k=0;k<30;++k)I[k]=0}var W=2,_=0,Yt=p,O=N-j&32767;if(G>2&&ot==D(b-O))for(var ht=Math.min(f,G)-1,it=Math.min(32767,b),V=Math.min(258,G);O<=it&&--Yt&&N!=j;){if(t[b+W]==t[b+W-O]){for(var E=0;E<V&&t[b+E]==t[b+E-O];++E);if(E>W){if(W=E,_=O,E>ht)break;for(var st=Math.min(O,E-2),qe=0,k=0;k<st;++k){var Gt=b-O+k&32767,_n=m[Gt],Re=Gt-_n&32767;Re>qe&&(qe=Re,j=Gt)}}}N=j,j=m[N],O+=N-j&32767}if(_){w[$++]=268435456|kt[W]<<18|_t[_];var De=kt[W]&31,Pe=_t[_]&31;x+=At[De]+St[Pe],++M[257+De],++I[Pe],at=b+W,++A}else w[$++]=t[b],++M[t[b]]}}for(b=Math.max(b,at);b<i;++b)w[$++]=t[b],++M[t[b]];c=re(t,l,d,w,M,I,x,$,q,b-q,c),d||(o.r=c&7|l[c/8|0]<<3,c-=7,o.h=g,o.p=m,o.i=b,o.w=at)}else{for(var b=o.w||0;b<i+d;b+=65535){var Ot=b+65535;Ot>=i&&(l[c/8|0]=d,Ot=i),c=ne(l,c+1,t.subarray(b,Ot))}o.i=i}return te(s,0,r+Qt(c)+a)},Je=(function(){for(var t=new Int32Array(256),n=0;n<256;++n){for(var e=n,r=9;--r;)e=(e&1&&-306674912)^e>>>1;t[n]=e}return t})(),Ke=function(){var t=-1;return{p:function(n){for(var e=t,r=0;r<n.length;++r)e=Je[e&255^n[r]]^e>>>8;t=e},d:function(){return~t}}},Xe=function(t,n,e,r,a){if(!a&&(a={l:1},n.dictionary)){var o=n.dictionary.subarray(-32768),i=new C(o.length+t.length);i.set(o),i.set(t,o.length),t=i,a.w=o.length}return He(t,n.level==null?6:n.level,n.mem==null?a.l?Math.ceil(Math.max(8,Math.min(13,Math.log(t.length)))*1.5):20:12+n.mem,e,r,a)},oe=function(t,n){var e={};for(var r in t)e[r]=t[r];for(var r in n)e[r]=n[r];return e},S=function(t,n,e){for(;e;++n)t[n]=e,e>>>=8};function _e(t,n){return Xe(t,n||{},0,0)}var ie=function(t,n,e,r){for(var a in t){var o=t[a],i=n+a,s=r;Array.isArray(o)&&(s=oe(r,o[1]),o=o[0]),ArrayBuffer.isView(o)?e[i]=[o,s]:(e[i+="/"]=[new C(0),s],ie(o,i,e,r))}},se=typeof TextEncoder<"u"&&new TextEncoder,Qe=typeof TextDecoder<"u"&&new TextDecoder,tn=0;try{Qe.decode(ae,{stream:!0}),tn=1}catch{}function le(t,n){var e;if(se)return se.encode(t);for(var r=t.length,a=new C(t.length+(t.length>>1)),o=0,i=function(d){a[o++]=d},e=0;e<r;++e){if(o+5>a.length){var s=new C(o+8+(r-e<<1));s.set(a),a=s}var l=t.charCodeAt(e);l<128||n?i(l):l<2048?(i(192|l>>6),i(128|l&63)):l>55295&&l<57344?(l=65536+(l&1047552)|t.charCodeAt(++e)&1023,i(240|l>>18),i(128|l>>12&63),i(128|l>>6&63),i(128|l&63)):(i(224|l>>12),i(128|l>>6&63),i(128|l&63))}return te(a,0,o)}var Lt=function(t){var n=0;if(t)for(var e in t){var r=t[e].length;r>65535&&gt(9),n+=r+4}return n},ce=function(t,n,e,r,a,o,i,s){var l=r.length,d=e.extra,c=s&&s.length,u=Lt(d);S(t,n,i!=null?33639248:67324752),n+=4,i!=null&&(t[n++]=20,t[n++]=e.os),t[n]=20,n+=2,t[n++]=e.flag<<1|(o<0&&8),t[n++]=a&&8,t[n++]=e.compression&255,t[n++]=e.compression>>8;var f=new Date(e.mtime==null?Date.now():e.mtime),p=f.getFullYear()-1980;if((p<0||p>119)&&gt(10),S(t,n,p<<25|f.getMonth()+1<<21|f.getDate()<<16|f.getHours()<<11|f.getMinutes()<<5|f.getSeconds()>>1),n+=4,o!=-1&&(S(t,n,e.crc),S(t,n+4,o<0?-o-2:o),S(t,n+8,e.size)),S(t,n+12,l),S(t,n+14,u),n+=16,i!=null&&(S(t,n,c),S(t,n+6,e.attrs),S(t,n+10,i),n+=14),t.set(r,n),n+=l,u)for(var h in d){var m=d[h],g=m.length;S(t,n,+h),S(t,n+2,g),t.set(m,n+4),n+=4+g}return c&&(t.set(s,n),n+=c),n},en=function(t,n,e,r,a){S(t,n,101010256),S(t,n+8,e),S(t,n+10,e),S(t,n+12,r),S(t,n+16,a)};function nn(t,n){n||(n={});var e={},r=[];ie(t,"",e,n);var a=0,o=0;for(var i in e){var s=e[i],l=s[0],d=s[1],c=d.level==0?0:8,u=le(i),f=u.length,p=d.comment,h=p&&le(p),m=h&&h.length,g=Lt(d.extra);f>65535&&gt(11);var v=c?_e(l,d):l,L=v.length,D=Ke();D.p(l),r.push(oe(d,{size:l.length,crc:D.d(),c:v,f:u,m:h,u:f!=i.length||h&&p.length!=m,o:a,compression:c})),a+=30+f+g+L,o+=76+2*(f+g)+(m||0)+L}for(var w=new C(o+22),M=a,I=o-a,A=0;A<r.length;++A){var u=r[A];ce(w,u.o,u,u.f,u.u,u.c.length);var x=30+u.f.length+Lt(u.extra);w.set(u.c,u.o+x),ce(w,a,u,u.f,u.u,u.c.length,u.o,u.m),a+=16+x+(u.m?u.m.length:0)}return en(w,a,r.length,I,M),w}const rn=`# Ethiopic-G1
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
`,an=` A1B'K2L@CIF/MSP"E3H9O6R^DJG>NTQ,*5<-U8V.%[$+X!&;:4\\0Z7(_?W]#Y)=`,on="JABCDEFGHI",sn={".":"4",",":"1","?":"8","!":"6","'":"'","-":"-",":":"3",";":"2"};function ln(t){return t<0||t>63?"?":an[t]??"?"}function cn(t){let n=0;for(const e of t){const r=Number(e);r>=1&&r<=6&&(n|=1<<r-1)}return n}function un(t){const n=new Map;for(const e of t.split(/\r?\n/)){const r=/^(?:letter|punctuation)\s+\\x([0-9A-Fa-f]+)\s+(\S+)/.exec(e.trim());if(!r)continue;const a=Number.parseInt(r[1],16);n.set(a,r[2].split("-").map(cn))}return n}const dn=un(rn);function hn(t){let n="",e=!1;for(const r of t){const a=r.codePointAt(0)??0,o=dn.get(a);if(o){e=!1,n+=o.map(ln).join("");continue}if(r===`
`){e=!1,n+=`
`;continue}if(r===" "){e=!1,n+=" ";continue}if(/[0-9]/.test(r)){e||(n+="#",e=!0),n+=on[Number(r)];continue}if(e=!1,/[a-z]/.test(r)){n+=r.toUpperCase();continue}if(/[A-Z]/.test(r)){n+=`,${r}`;continue}n+=sn[r]??"?"}return n}function Bt(t,n=40){const e=hn(t),r=[];for(const a of e.split(`
`)){const o=a.split(" ");let i="";for(const s of o){if(!i){i=s;continue}i.length+1+s.length<=n?i+=` ${s}`:(r.push(i),i=s)}i&&r.push(i)}return`${r.join(`
`)}
`}const fn='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" role="img"><title>A navy phone on a paper background, with an English and Amharic caption under the screen.</title><rect width="640" height="480" fill="#f2f0ea"/><rect x="230" y="40" width="180" height="320" rx="28" fill="#ffffff" stroke="#1b3048" stroke-width="8"/><rect x="254" y="72" width="132" height="210" rx="6" fill="#f2f0ea" stroke="#1b3048" stroke-width="3"/><rect x="120" y="390" width="400" height="36" fill="#111111"/><rect x="140" y="400" width="160" height="8" fill="#ffee00"/></svg>',pn="A navy phone on a paper background, with an English and Amharic caption under the screen.";function gn(t,n,e,r){const a=t.split(`
`).filter(Boolean),o=n.split(`
`).filter(Boolean),i=a.map((s,l)=>`<section><h2>${s}</h2>${o[l]?`<p lang="am">${o[l]}</p>`:""}</section>`).join("");return`<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><title>LearnAble light lesson</title></head><body><main><h1>LearnAble light lesson</h1><p>Sound, text, and this page. The video is not in the pack.</p><figure><img src="lesson-figure.svg" alt="${pn}"></figure><h2>English</h2>${r?'<audio controls src="lesson-en.wav"></audio>':"<p>The narration file was not on this host.</p>"}<h2 lang="am">አማርኛ</h2>${r?'<audio controls src="lesson-am.wav"></audio>':""}${i}${e?`<h2>Audio description</h2><p>${e}</p>`:""}</main></body></html>`}async function ue(t){if(!t)return null;try{const n=await fetch(t);return n.ok?new Uint8Array(await n.arrayBuffer()):null}catch{return null}}async function mn(t){const n=await ue(t.audioEn),e=await ue(t.audioAm),r={"index.html":new TextEncoder().encode(gn(t.english,t.amharic,t.descriptions||"",!!(n||e))),"lesson-figure.svg":new TextEncoder().encode(fn),"transcript-en.brf":new TextEncoder().encode(Bt(t.english)),"transcript-am.brf":new TextEncoder().encode(Bt(t.amharic))};return n&&(r["lesson-en.wav"]=n),e&&(r["lesson-am.wav"]=e),{bytes:nn(r),audio:!!(n||e)}}function tt(t,n,e){const r=new Blob([Uint8Array.from(t)],{type:e}),a=URL.createObjectURL(r),o=document.createElement("a");o.href=a,o.download=n,document.body.append(o),o.click(),o.remove(),URL.revokeObjectURL(a)}function de(){return typeof window<"u"&&"speechSynthesis"in window}function mt(t,n,e=1){if(!de()||!t.trim())return;window.speechSynthesis.cancel();const r=new SpeechSynthesisUtterance(t);r.lang=n,r.rate=Math.min(2,Math.max(.5,e));const a=n.toLowerCase().slice(0,2),o=window.speechSynthesis.getVoices().find(i=>i.lang.toLowerCase().startsWith(a));o&&(r.voice=o),window.speechSynthesis.speak(r)}function he(){de()&&window.speechSynthesis.cancel()}function fe(t){const n=/^(?:(\d+):)?(\d{2}):(\d{2})\.(\d{3})$/.exec(t.trim());if(!n)throw new Error(`Bad WebVTT timestamp: ${t}`);const e=Number(n[1]??0),r=Number(n[2]),a=Number(n[3]),o=Number(n[4]);return e*3600+r*60+a+o/1e3}function bn(t){var a;const n=t.replace(/^\uFEFF/,"").split(/\r?\n/),e=[];let r=0;if((a=n[0])!=null&&a.startsWith("WEBVTT"))for(r=1;r<n.length&&n[r].trim()!=="";)r+=1;for(;r<n.length;){if(n[r].trim()===""){r+=1;continue}let o=n[r];!o.includes("-->")&&r+1<n.length&&(r+=1,o=n[r]);const i=o.split("-->");if(i.length<2){r+=1;continue}const s=fe(i[0]),l=i[1].trim().split(/\s+/)[0],d=fe(l);r+=1;const c=[];for(;r<n.length&&n[r].trim()!=="";)c.push(n[r]),r+=1;e.push({start:s,end:d,text:c.join(`
`)})}return e}function pe(t){const n=Math.max(0,Math.round(t*1e3)),e=Math.floor(n/36e5),r=Math.floor(n%36e5/6e4),a=Math.floor(n%6e4/1e3),o=n%1e3;return`${String(e).padStart(2,"0")}:${String(r).padStart(2,"0")}:${String(a).padStart(2,"0")}.${String(o).padStart(3,"0")}`}function ge(t){return`WEBVTT

${t.map(e=>`${pe(e.start)} --> ${pe(e.end)}
${e.text}`).join(`

`)}
`}function me(t,n){const e=t.find(a=>n>=a.start&&n<a.end);if(e)return e;const r=t[t.length-1];if(r&&n>=r.start&&n<=r.end+.05)return r}const Mt={en:{larger:"Larger text",contrast:"High contrast",stop:"Stop motion",read:"Read this page",stopRead:"Stop reading",language:"Language",images:"Image check",skip:"Skip to content",menu:"Menu",pipeline:"Transcript",job:"Job card",session:"Session"},am:{larger:"ትልቅ ጽሑፍ",contrast:"ከፍተኛ ንጽጽር",stop:"እንቅስቃሴ አቁም",read:"ይህን ገጽ አንብብ",stopRead:"ማንበብ አቁም",language:"ቋንቋ",images:"የምስል ምርመራ",skip:"ወደ ዋናው ይዘት ዝለል",menu:"ምናሌ",pipeline:"ጽሑፍ",job:"የስራ ካርድ",session:"ክፍለ ጊዜ"}},Y="data-learnable-repair";function be(t){var i,s,l,d,c;const n=(i=t.getAttribute("aria-label"))==null?void 0:i.trim();if(n)return n;const e=t.getAttribute("aria-labelledby");if(e){const u=e.split(/\s+/).map(f=>{var p;return((p=document.getElementById(f))==null?void 0:p.textContent)||""}).join(" ").replace(/\s+/g," ").trim();if(u)return u}const r=((s=t.textContent)==null?void 0:s.replace(/\s+/g," ").trim())||"";if(r)return r;const a=(d=(l=t.querySelector("img[alt]"))==null?void 0:l.getAttribute("alt"))==null?void 0:d.trim();if(a)return a;const o=(c=t.getAttribute("title"))==null?void 0:c.trim();return o||""}function J(t){return!!t.closest("learnable-player, learnable-toolbar, .learnable-gateway")}function xn(){document.querySelectorAll("a, button, [role='button']").forEach(t=>{var a;if(J(t)||be(t))return;const n=(a=t.getAttribute("title"))==null?void 0:a.trim(),r=t.classList.contains("logo-container")||t.querySelector(".logo")?"ALX home":t.tagName==="A"?"Link":"Button";t.setAttribute("aria-label",n||r),t.setAttribute(Y,"name")}),document.querySelectorAll("input, select, textarea").forEach(t=>{var a,o,i;if(J(t)||t.getAttribute("type")==="hidden"||t.getAttribute("aria-label")||t.closest("label"))return;const n=t.getAttribute("id");if(n&&document.querySelector(`label[for="${CSS.escape(n)}"]`))return;const e=(a=t.getAttribute("placeholder"))==null?void 0:a.trim(),r=(i=(o=t.previousElementSibling)==null?void 0:o.textContent)==null?void 0:i.replace(/\s+/g," ").trim();t.setAttribute("aria-label",e||r||t.getAttribute("name")||"Input"),t.setAttribute(Y,"label")})}function yn(){document.querySelectorAll("img").forEach(t=>{if(J(t)||t.hasAttribute("alt"))return;if(!!t.closest("[aria-hidden='true']")||t.className.toString().includes("icon")||t.width>0&&t.width<8)t.alt="",t.setAttribute("role","presentation");else{t.alt="Needs a description";const e=document.createElement("span");e.className="learnable-alt-note",e.textContent="Needs a description",t.after(e)}t.setAttribute(Y,"alt")})}function vn(){document.querySelectorAll("[aria-expanded]").forEach(t=>{if(J(t))return;const n=t.getAttribute("role"),e=t.tagName;n||e==="BUTTON"||e==="A"||e==="SUMMARY"||(t.setAttribute("role","button"),t.hasAttribute("tabindex")||t.setAttribute("tabindex","0"),t.setAttribute(Y,"aria"))}),document.querySelectorAll("[role='progressbar']").forEach(t=>{var e,r,a;if(J(t)||be(t))return;const n=(a=(r=(e=t.closest("div"))==null?void 0:e.parentElement)==null?void 0:r.textContent)==null?void 0:a.replace(/\s+/g," ").trim().slice(0,80);t.setAttribute("aria-label",n||"Progress"),t.setAttribute(Y,"aria")}),document.querySelectorAll("a.anchor[aria-hidden='true'], [aria-hidden='true'][tabindex]").forEach(t=>{t.setAttribute("tabindex","-1"),t.getAttribute("aria-hidden")==="true"&&t.classList.contains("modal")&&t.removeAttribute("tabindex"),t.setAttribute(Y,"aria")}),document.querySelectorAll("span[aria-label], div[aria-label]").forEach(t=>{J(t)||t.getAttribute("role")||(t.setAttribute("role","note"),t.setAttribute(Y,"aria"))})}function wn(){document.querySelectorAll("ul, ol").forEach(t=>{J(t)||[...t.children].forEach(n=>{if(n.tagName==="LI"||n.tagName==="SCRIPT"||n.tagName==="TEMPLATE")return;const e=document.createElement("li");n.replaceWith(e),e.append(n),e.setAttribute(Y,"list")})})}function Ft(t){const n=t/255;return n<=.03928?n/12.92:((n+.055)/1.055)**2.4}function bt(t){return .2126*Ft(t[0])+.7152*Ft(t[1])+.0722*Ft(t[2])}function et(t,n){const e=Math.max(bt(t),bt(n)),r=Math.min(bt(t),bt(n));return(e+.05)/(r+.05)}function xe(t){const n=t.match(/rgba?\(([^)]+)\)/);if(!n)return null;const e=n[1].split(",").map(r=>Number.parseFloat(r.trim()));return e.length<3||e.some(r=>Number.isNaN(r))?null:[e[0],e[1],e[2],e[3]??1]}function An(t,n){const e=t[3];return[t[0]*e+n[0]*(1-e),t[1]*e+n[1]*(1-e),t[2]*e+n[2]*(1-e),1]}function Sn(t){const n=[];let e=t;for(;e;){const a=xe(getComputedStyle(e).backgroundColor);if(a&&a[3]>0&&n.push(a),a&&a[3]>=1)break;e=e.parentElement}if(n.length===0)return[255,255,255,1];let r=n[n.length-1];for(let a=n.length-2;a>=0;a-=1)r=An(n[a],r);return r}function It(t,n,e){return[Math.round(t[0]+(n[0]-t[0])*e),Math.round(t[1]+(n[1]-t[1])*e),Math.round(t[2]+(n[2]-t[2])*e),1]}function kn(t){const n=getComputedStyle(t),e=Number.parseFloat(n.fontSize),r=Number.parseInt(n.fontWeight,10)||400;return e>=24||e>=18.67&&r>=700?3:4.5}function En(){document.querySelectorAll("a, button, span, p, h1, h2, h3, h4, li, label, div, td, th, code, small, strong, b, em").forEach(t=>{if(J(t)||t.getAttribute(Y)==="contrast"||![...t.childNodes].some(l=>{var d;return l.nodeType===Node.TEXT_NODE&&((d=l.textContent)==null?void 0:d.trim())})||t.getClientRects().length===0)return;const e=xe(getComputedStyle(t).color);if(!e)return;const r=Sn(t),a=kn(t);if(et(e,r)>=a)return;const o=a+.45;let i=e,s=2;for(const l of[[0,0,0],[255,255,255]]){let d=0,c=1;for(let p=0;p<10;p+=1){const h=(d+c)/2;et(It(e,l,h),r)>=o?c=h:d=h}let u=c,f=It(e,l,u);for(;et(f,r)<o&&u<1;)u=Math.min(1,u+.08),f=It(e,l,u);et(f,r)>=o&&u<s&&(i=f,s=u)}if(et(i,r)<o){const l=[0,0,0,1],d=[255,255,255,1];i=et(l,r)>=et(d,r)?l:d}t.style.setProperty("color",`rgb(${i[0]}, ${i[1]}, ${i[2]})`,"important"),t.setAttribute(Y,"contrast")})}function Cn(){xn(),yn(),vn(),wn(),En()}const ye={white:{label:"White on black",fg:"#ffffff",bg:"#111111"},yellow:{label:"Yellow on black",fg:"#ffee00",bg:"#111111"},black:{label:"Black on white",fg:"#172033",bg:"#f2f0ea"},cyan:{label:"Cyan on black",fg:"#00ffff",bg:"#111111"}},$t="learnable-widget",ve=()=>({toolbar:!0,signWindow:!0,audioDescription:!0,offlinePack:!1,braille:!1,taggedDocs:!1}),qt=()=>({lang:"en",uiLang:"en",largeText:!1,highContrast:!1,stopMotion:!1,captionScale:1.15,captionPreset:"white"});let we=ve(),K=qt(),Ae="paper",xt=!0;function dt(t){return xt===!1?!1:xt===!0?!0:xt[t]!==!1}function Se(){try{return window.matchMedia("(prefers-reduced-motion: reduce)").matches}catch{return!1}}function ke(){const t=qt();t.stopMotion=Se();try{const n=localStorage.getItem($t);if(!n)return t;const e=JSON.parse(n),r=e.lang==="am"?"am":e.lang==="en"?"en":t.lang,a=e.uiLang==="am"?"am":e.uiLang==="en"?"en":t.uiLang;return{...t,...e,lang:r,uiLang:a}}catch{return t}}function T(){return{...K}}function yt(){return{...we}}function Tn(){return Ae}function Rt(t){K={...t},localStorage.setItem($t,JSON.stringify(K)),window.dispatchEvent(new CustomEvent("learnable-settings",{detail:T()}))}function X(t){const n={...T(),...t};return Rt(n),T()}function Ln(t={}){we={...ve(),...t.features},t.theme&&(Ae=t.theme),t.enhance!==void 0&&(xt=t.enhance);const n=ke();K={...n,lang:t.lang??n.lang,uiLang:t.uiLang??n.uiLang},Rt(K)}function Bn(){return localStorage.removeItem($t),K=qt(),K.stopMotion=Se(),Rt(K),T()}function Ee(t,n,e){return t.hasAttribute(n)?t.getAttribute(n)!=="false":e}const Mn=["captions-en","captions-am","sign","describe","audio-en","audio-am","offline","braille","docs"];function Fn(t,n){for(const r of Mn){const a=t.getAttribute(`data-learnable-${r}`);a!==null&&n.setAttribute(r,a)}const e=t.getAttribute("src");e&&!n.getAttribute("src")&&n.setAttribute("src",e)}function Ce(t){if(t.dataset.learnableUpgraded==="true"||t.closest("learnable-player"))return;t.dataset.learnableUpgraded="true";const n=document.createElement("learnable-player");Fn(t,n),n.hasAttribute("offline")||n.setAttribute("offline",""),n.hasAttribute("braille")||n.setAttribute("braille",""),n.hasAttribute("docs")||n.setAttribute("docs",""),t.slot="media",t.replaceWith(n),n.append(t)}function In(){dt("media")&&(document.querySelectorAll("video, audio").forEach(t=>{t instanceof HTMLElement&&Ce(t)}),document.querySelectorAll("iframe").forEach(t=>{const n=t.getAttribute("src")||"";/youtube\.com|youtu\.be|player\.vimeo\.com|vimeo\.com/.test(n)&&t instanceof HTMLElement&&Ce(t)}))}function $n(){if(!dt("skip")||document.querySelector("a.learnable-skip, a[href='#content'], a[href='#main']"))return;const t=document.querySelector("main");t&&!t.id&&(t.id="content");const n=document.createElement("a");n.className="learnable-skip",n.href=t!=null&&t.id?`#${t.id}`:"#content",n.textContent=Mt[T().uiLang].skip,document.body.prepend(n)}function qn(){if(!dt("landmarks"))return;const t=document.querySelector(".header");t&&!document.querySelector("header, [role='banner']")&&t.setAttribute("role","banner");const n=document.getElementById("sidebar");n&&!document.querySelector("nav, [role='navigation']")&&(n.setAttribute("role","navigation"),n.getAttribute("aria-label")||n.setAttribute("aria-label","Sidebar"))}function Rn(t){return[...document.querySelectorAll(t)].filter(n=>!n.closest("learnable-player, learnable-toolbar"))}function Dn(t,n,e){const r=t.indexOf(n);if(r<0)return;t[(r+e+t.length)%t.length].focus()}function Pn(t){const n=t.target;if(!(n instanceof HTMLElement)||n.closest("learnable-player, learnable-toolbar, input, textarea, select"))return;n.classList.contains("hamburger")&&(t.key==="Enter"||t.key===" ")&&(t.preventDefault(),n.click(),n.setAttribute("aria-expanded",document.body.classList.contains("sidebar-collapsed")?"false":"true")),t.key==="Escape"&&(document.querySelectorAll(".collapse.show").forEach(r=>{const a=document.querySelector(`[data-bs-target="#${r.id}"]`);(a==null?void 0:a.getAttribute("aria-expanded"))==="true"&&a.click()}),document.querySelectorAll(".dropdown-menu.show").forEach(r=>{r.classList.remove("show")}));const e=[".homepage-nav .nav-link","button[data-section-index]",".accordion-button",".dropdown-menu.show .dropdown-item"];if(!(t.key!=="ArrowRight"&&t.key!=="ArrowLeft"&&t.key!=="ArrowDown"&&t.key!=="ArrowUp"))for(const r of e){const a=Rn(r);if(!a.includes(n))continue;t.preventDefault();const o=t.key==="ArrowRight"||t.key==="ArrowDown"?1:-1;Dn(a,n,o);break}}function Nn(){dt("keyboard")&&(document.querySelectorAll(".hamburger").forEach(t=>{t.dataset.learnableKey!=="true"&&(t.dataset.learnableKey="true",t.tabIndex=0,t.setAttribute("role","button"),t.setAttribute("aria-label",Mt[T().uiLang].menu),t.setAttribute("aria-expanded",String(!document.body.classList.contains("sidebar-collapsed"))))}),document.documentElement.dataset.learnableKeys!=="true"&&(document.documentElement.dataset.learnableKeys="true",document.addEventListener("keydown",Pn)))}function jn(){return[...document.querySelectorAll("img")].filter(t=>{var n;return!t.hasAttribute("alt")||t.getAttribute("alt")===((n=t.getAttribute("src"))==null?void 0:n.split("/").pop())})}function Dt(){const t=jn();if(t.length===0)return"Every image on this page has a text alternative.";const n=t.slice(0,8).map(e=>e.currentSrc||e.getAttribute("src")||"image");return`${t.length} image${t.length===1?"":"s"} need a description. Nothing was sent off this page. ${n.join(" ")}`}function Wn(){var a,o,i;if(document.getElementById("learnable-gateway"))return;const t=document.querySelector("main")||document.body,n=zt[0],e=document.createElement("section");e.id="learnable-gateway",e.className="learnable-gateway",e.setAttribute("aria-label","LearnAble lesson tools");const r=ft.chat.map(s=>`<li>${s.speaker}: ${s.text}</li>`).join("");e.innerHTML=`
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
  `,t.append(e),e.querySelectorAll("[data-vtt]").forEach(s=>{s.addEventListener("click",()=>{const l=s.dataset.vtt==="am",d=ft.segments.map(u=>({start:u.start,end:u.end,text:l?u.am:u.en}));tt(new TextEncoder().encode(ge(d)),l?"captions-am.vtt":"captions-en.vtt","text/vtt");const c=e.querySelector("[data-pipeline-note]");c&&(c.textContent=l?"Amharic captions downloaded from the sample lesson.":"English captions downloaded from the sample lesson.")})}),(a=e.querySelector("[data-pipeline-file]"))==null||a.addEventListener("change",()=>{var d,c;const s=(c=(d=e.querySelector("[data-pipeline-file]"))==null?void 0:d.files)==null?void 0:c[0],l=e.querySelector("[data-pipeline-note]");!s||!l||s.text().then(u=>{const f=ft.segments.find(p=>u.includes(p.en));l.textContent=f?`Sample translation: ${f.am}`:"No translation service is running, and this text is not in the sample lesson."})}),(o=e.querySelector("[data-job]"))==null||o.addEventListener("click",()=>{var s;mt(((s=e.querySelector("[data-job-summary]"))==null?void 0:s.textContent)||"","en")}),(i=e.querySelector("[data-badge]"))==null||i.addEventListener("click",()=>{const s=e.querySelector("[data-cert]");Ht().then(l=>{s&&(s.textContent=l?"The certificate proof matches the published public key.":"The certificate proof does not match.")})})}function Un(){In(),$n(),qn(),Nn(),Wn(),Cn()}function Yn(){var a,o;const t=T().uiLang,n=[...document.querySelectorAll("[lang='am']")].map(i=>i.innerText.trim()).filter(Boolean).join(" "),e=document.querySelector("main"),r=((e==null?void 0:e.innerText)||document.body.innerText||"").replace(/\s+/g," ").trim().slice(0,1500);return t==="am"&&n?(((o=(a=window.speechSynthesis)==null?void 0:a.getVoices)==null?void 0:o.call(a))??[]).some(l=>l.lang.toLowerCase().startsWith("am"))?{text:n.slice(0,1500),lang:"am",notice:"Reading the Amharic text on this page. Nothing is sent off this device."}:{text:r,lang:"en",notice:"This browser has no Amharic voice. The English text is read instead. Nothing is sent off this device."}:{text:r,lang:"en",notice:"Reading the start of this page. Nothing is sent off this device."}}function Gn(t){var e;return(e=document.querySelector("script[src*='learnable']"))==null?void 0:e.getAttribute("data-learnable-api"),Dt()}const Pt="learnable-host-adjust";function On(){return`
html { scroll-padding-top: 5rem; scroll-padding-bottom: 7rem; }
:focus { scroll-margin-top: 5rem; scroll-margin-bottom: 7rem; }
:focus-visible { outline: 3px solid #0b3d91; outline-offset: 2px; }
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
.learnable-gateway input { min-height: 2.75rem; max-width: 100%; }
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
`}function rt(t){const n=document.documentElement;n.dataset.learnableText=t.largeText?"large":"default",n.dataset.learnableContrast=t.highContrast?"high":"default",n.dataset.learnableMotion=t.stopMotion?"reduce":"allow";let e=document.getElementById(Pt);e||(e=document.createElement("style"),e.id=Pt,document.head.append(e)),e.textContent=On()}function Vn(){var n;(n=document.getElementById(Pt))==null||n.remove();const t=document.documentElement;delete t.dataset.learnableText,delete t.dataset.learnableContrast,delete t.dataset.learnableMotion}function zn(t){if(t.metaKey||t.ctrlKey||t.altKey)return null;switch(t.key){case" ":case"k":case"K":return{type:"toggle-play"};case"c":case"C":return{type:"cycle-captions"};case"d":case"D":return{type:"toggle-ad"};case"s":case"S":return{type:"toggle-sign"};case"ArrowLeft":return{type:"seek",by:-5};case"ArrowRight":return{type:"seek",by:5};case"j":case"J":return{type:"seek",by:-10};case"l":case"L":return{type:"seek",by:10};case"ArrowUp":return{type:"volume",by:.1};case"ArrowDown":return{type:"volume",by:-.1};case"m":case"M":return{type:"mute"};case"f":case"F":return{type:"fullscreen"};case"Home":return{type:"seek-to",to:"start"};case"End":return{type:"seek-to",to:"end"};case"?":return{type:"help"};default:return null}}function Nt(t){return t.replace(/[^\t\n\r\x20-\x7E]/g,"?").replace(/\\/g,"\\\\").replace(/\(/g,"\\(").replace(/\)/g,"\\)")}function Zn(t,n){const e=t.split(/\s+/).filter(Boolean),r=[];let a="";for(const o of e)a?a.length+1+o.length<=n?a+=` ${o}`:(r.push(a),a=o):a=o;return a&&r.push(a),r.length>0?r:[""]}function Hn(t){const n=[{tag:"H1",text:t.title},...t.paragraphs.map(h=>({tag:"P",text:h})),{tag:"Figure",text:t.figureAlt}],e=[];let r=740;n.forEach((h,m)=>{if(h.tag==="Figure"){e.push(`/Figure <</MCID ${m}>> BDC`),e.push("0.106 0.188 0.282 RG"),e.push(`56 ${Math.max(72,r-64)} 180 56 re S`),e.push("EMC");return}const g=h.tag==="H1"?18:12,v=g+4,L=Zn(h.text,h.tag==="H1"?58:86);e.push(`/${h.tag} <</MCID ${m}>> BDC`),e.push("BT"),e.push(`/F1 ${g} Tf`),e.push(`1 0 0 1 56 ${r} Tm`),L.forEach((D,w)=>{w>0&&e.push(`0 -${v} Td`),e.push(`(${Nt(D)}) Tj`)}),e.push("ET"),e.push("EMC"),r-=L.length*v+12});const a=e.join(`
`),o=n.map((h,m)=>`${8+m} 0 R`).join(" "),i=n.map((h,m)=>`${8+m} 0 R`).join(" "),s=8+n.length,l=s+1,d=[],c=h=>{d.push(h)};c("<< /Type /Catalog /Pages 3 0 R /Lang (en) /MarkInfo << /Marked true >> /ViewerPreferences << /DisplayDocTitle true >> /StructTreeRoot 2 0 R >>"),c(`<< /Type /StructTreeRoot /K 7 0 R /ParentTree ${s} 0 R >>`),c("<< /Type /Pages /Count 1 /Kids [4 0 R] >>"),c("<< /Type /Page /Parent 3 0 R /MediaBox [0 0 612 792] /Contents 5 0 R /Resources << /Font << /F1 6 0 R >> >> /StructParents 0 /Tabs /S >>"),c(`<< /Length ${a.length} >>
stream
${a}
endstream`),c("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>"),c(`<< /Type /StructElem /S /Document /P 2 0 R /Lang (en) /K [${o}] >>`),n.forEach((h,m)=>{const g=h.tag==="Figure"?` /Alt (${Nt(t.figureAlt)})`:"";c(`<< /Type /StructElem /S /${h.tag} /P 7 0 R /Pg 4 0 R${g} /K << /Type /MCR /Pg 4 0 R /MCID ${m} >> >>`)}),c(`<< /Nums [ 0 [${i}] ] >>`),c(`<< /Title (${Nt(t.title)}) /Author (LearnAble) >>`);let u=`%PDF-1.7
`;const f=[0];d.forEach((h,m)=>{f.push(u.length),u+=`${m+1} 0 obj
${h}
endobj
`});const p=u.length;u+=`xref
0 ${d.length+1}
`,u+=`0000000000 65535 f 
`;for(let h=1;h<f.length;h+=1)u+=`${f[h].toString().padStart(10,"0")} 00000 n 
`;return u+=`trailer
<< /Size ${d.length+1} /Root 1 0 R /Info ${l} 0 R >>
`,u+=`startxref
${p}
%%EOF`,new TextEncoder().encode(u)}function vt(t){(!Number.isFinite(t)||t<0)&&(t=0);const n=Math.floor(t),e=Math.floor(n/60),r=n%60;return`${e}:${r.toString().padStart(2,"0")}`}const Te=`
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
.bar select, .bar a { min-height: 2.75rem; color: var(--color-ink); background: var(--color-paper); }
.bar a { display: inline-flex; align-items: center; padding: 0 0.6rem; text-decoration: underline; }
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
`;function jt(t,n,e){const r=new CustomEvent(n,{bubbles:!0,composed:!0,detail:e});t.dispatchEvent(r),window.dispatchEvent(new CustomEvent(n,{detail:e}))}class Le extends HTMLElement{constructor(){super();B(this,"root");B(this,"video",null);B(this,"signClip",null);B(this,"en",[]);B(this,"am",[]);B(this,"ad",[]);B(this,"mode","en");B(this,"adOn",!1);B(this,"signOn",!0);B(this,"lastAd","");B(this,"built",!1);B(this,"onSettings",()=>{this.applySettings()});this.root=this.attachShadow({mode:"open"})}connectedCallback(){this.built||this.mount(),this.loadTracks(),this.applySettings(),window.addEventListener("learnable-settings",this.onSettings)}refresh(){this.built=!1,this.mount(),this.loadTracks(),this.applySettings()}disconnectedCallback(){window.removeEventListener("learnable-settings",this.onSettings),he()}mount(){var c,u,f,p,h,m;this.built=!0;const e=yt(),r=Ee(this,"sign",e.signWindow),a=Ee(this,"describe",e.audioDescription),o=this.hasAttribute("offline")||e.offlinePack,i=this.hasAttribute("braille")||e.braille,s=this.hasAttribute("docs")||e.taggedDocs;this.root.innerHTML=`
      <style>${Te}</style>
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
        <p data-job>${(c=zt[0])==null?void 0:c.summary}</p>
        <div class="row">
          <button type="button" data-act="job">Play audio summary</button>
          <button type="button" data-act="badge">Check certificate</button>
        </div>
        <h2>Session chat</h2>
        <ol class="chat">
          ${ft.chat.map(g=>`<li><span>${vt(g.time)}</span> ${g.speaker}: ${g.text}</li>`).join("")}
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
    `,this.bindMedia();const l=this.root.querySelector(".sign h2");l==null||l.addEventListener("pointerdown",g=>this.dragSign(g)),l==null||l.addEventListener("keydown",g=>{g.key==="ArrowLeft"&&this.nudge("left"),g.key==="ArrowRight"&&this.nudge("right"),g.key==="ArrowUp"&&this.nudge("up"),g.key==="ArrowDown"&&this.nudge("down")});const d=this.root.querySelector(".stage");d==null||d.addEventListener("keydown",g=>this.onKey(g)),this.root.querySelectorAll("button[data-act]").forEach(g=>{g.addEventListener("click",()=>this.onAction(g.dataset.act||""))}),(u=this.root.querySelector("[data-act=size]"))==null||u.addEventListener("input",g=>{const v=Number(g.target.value);X({captionScale:v}),this.styleCaption(v,T().captionPreset)}),(f=this.root.querySelector("[data-act=preset]"))==null||f.addEventListener("change",g=>{const v=g.target.value;X({captionPreset:v}),this.styleCaption(T().captionScale,v)}),(p=this.video)==null||p.addEventListener("timeupdate",()=>this.sync()),(h=this.video)==null||h.addEventListener("play",()=>{this.setPlayLabel(!0),jt(this,"learnable-play",{playing:!0})}),(m=this.video)==null||m.addEventListener("pause",()=>{this.setPlayLabel(!1),jt(this,"learnable-play",{playing:!1})})}bindMedia(){const e=this.querySelector("video, audio"),r=this.root.querySelector("[data-fallback]");if(e instanceof HTMLMediaElement&&e.slot==="media")this.video=e,r&&(r.hidden=!0),e.setAttribute("playsinline","");else if(r){this.video=r;const i=this.getAttribute("src");i&&(r.src=Z(i))}this.signClip=this.root.querySelector("[data-sign-video]");const a=this.getAttribute("sign");this.signClip&&a&&a!=="false"&&(this.signClip.src=Z(a));const o=this.querySelector("iframe");o&&!o.getAttribute("title")&&o.setAttribute("title","Embedded lesson video")}dragSign(e){var f;if(e.button!==0)return;const r=this.root.querySelector("[data-sign]"),a=e.currentTarget;if(!r||!(a instanceof HTMLElement))return;const o=e.clientX,i=e.clientY,s=((f=r.style.transform.match(/-?\d+/g))==null?void 0:f.map(Number))??[0,0],l=s[0]??0,d=s[1]??0,c=p=>{r.style.transform=`translate(${l+p.clientX-o}px, ${d+p.clientY-i}px)`},u=()=>{a.removeEventListener("pointermove",c),a.removeEventListener("pointerup",u)};a.setPointerCapture(e.pointerId),a.addEventListener("pointermove",c),a.addEventListener("pointerup",u)}async loadTracks(){this.en=await this.fetchCues(this.getAttribute("captions-en")),this.am=await this.fetchCues(this.getAttribute("captions-am")),this.ad=await this.fetchCues(this.getAttribute("describe"));const e=this.root.querySelector("[data-sign]");e&&(e.hidden=!this.signOn),this.renderTranscript(),this.sync()}renderTranscript(){const e=this.root.querySelector(".transcript");if(!e)return;const r=this.en.length?this.en:this.am;e.replaceChildren();for(const a of r){const o=document.createElement("li"),i=document.createElement("button");i.type="button",i.dataset.seek=String(a.start),i.textContent=`${vt(a.start)} ${a.text}`,i.addEventListener("click",()=>{this.video&&(this.video.currentTime=a.start)}),o.append(i),e.append(o)}}async fetchCues(e){if(!e||e==="false")return[];try{const r=await fetch(Z(e));return r.ok?bn(await r.text()):[]}catch{return[]}}applySettings(){const e=T();this.mode=e.lang,e.highContrast?this.setAttribute("contrast","high"):this.removeAttribute("contrast"),this.setAttribute("theme",Tn());const r=this.root.querySelector("[data-act=preset]"),a=this.root.querySelector("[data-act=size]");r&&(r.value=e.captionPreset),a&&(a.value=String(e.captionScale)),this.styleCaption(e.captionScale,e.captionPreset),this.sync()}styleCaption(e,r){const a=this.root.querySelector(".caption"),o=ye[r]??ye.white;a&&(a.style.color=o.fg,a.style.background=o.bg,a.style.fontSize=`${e}rem`)}setPlayLabel(e){const r=this.root.querySelector("[data-act=play]");r&&(r.textContent=e?"Pause":"Play");const a=this.root.querySelector(".status"),o=(a==null?void 0:a.textContent)||"";a&&this.video&&(o.startsWith("Playing")||o.startsWith("Paused"))&&(a.textContent=`${e?"Playing":"Paused"}. ${vt(this.video.currentTime)} of ${vt(this.video.duration||0)}.`)}sync(){var l;if(!this.video)return;const e=this.video.currentTime,r=this.mode==="am"?this.am:this.mode==="en"?this.en:[],a=this.mode==="off"?void 0:me(r,e),o=this.root.querySelector(".caption");o&&(o.textContent=(a==null?void 0:a.text)??"",o.setAttribute("lang",this.mode==="am"?"am":"en"));const i=this.root.querySelector(".gloss");if(i&&(i.textContent=a?a.text.split(" ").slice(0,2).join(" "):"OPEN"),(l=this.signClip)!=null&&l.getAttribute("src")&&this.video&&Math.abs(this.signClip.currentTime-e)>.4&&(this.signClip.currentTime=e),this.adOn){const d=me(this.ad,e);d&&d.text!==this.lastAd&&(this.lastAd=d.text,mt(d.text,"en"))}const s=this.root.querySelector("[data-act=captions]");s&&(s.textContent=this.mode==="off"?"Captions: off":this.mode==="am"?"Captions: Amharic":"Captions: English"),this.setPlayLabel(!this.video.paused)}onKey(e){const r=zn(e);r&&(e.preventDefault(),r.type==="toggle-play"&&this.toggle(),r.type==="cycle-captions"&&this.cycleCaptions(),r.type==="toggle-ad"&&this.toggleAd(),r.type==="toggle-sign"&&this.toggleSign(),r.type==="seek"&&this.video&&(this.video.currentTime=Math.max(0,this.video.currentTime+r.by)),r.type==="seek-to"&&this.video&&(this.video.currentTime=r.to==="start"?0:this.video.duration||0),r.type==="mute"&&this.video&&(this.video.muted=!this.video.muted),r.type==="volume"&&this.video&&(this.video.volume=Math.min(1,Math.max(0,this.video.volume+r.by))))}async toggle(){var e,r;if(this.video)try{this.video.paused?(await this.video.play(),(e=this.signClip)!=null&&e.getAttribute("src")&&this.signClip.play().catch(()=>{})):(this.video.pause(),(r=this.signClip)==null||r.pause())}catch{this.setStatus("The video did not play. Captions are still listed when the file loads.")}}cycleCaptions(){this.mode=this.mode==="off"?"en":this.mode==="en"?"am":"off",this.sync(),jt(this,"learnable-captions",{lang:this.mode})}toggleAd(){this.adOn=!this.adOn,this.adOn||he();const e=this.root.querySelector("[data-act=ad]");e&&e.setAttribute("aria-pressed",String(this.adOn))}nudge(e){var s;const r=this.root.querySelector("[data-sign]");if(!r)return;const a=((s=r.style.transform.match(/-?\d+/g))==null?void 0:s.map(Number))??[0,0],o=(a[0]??0)+(e==="left"?-24:e==="right"?24:0),i=(a[1]??0)+(e==="up"?-24:e==="down"?24:0);r.style.transform=`translate(${o}px, ${i}px)`}scaleSign(e){const r=this.root.querySelector("[data-sign]");if(!r)return;const a=Math.min(560,Math.max(180,(r.offsetWidth||280)+e*40));r.style.width=`${a}px`,r.style.maxWidth="100%"}toggleSign(){this.signOn=!this.signOn;const e=this.root.querySelector("[data-sign]");e&&(e.hidden=!this.signOn);const r=this.root.querySelector("[data-act=sign]");r&&r.setAttribute("aria-pressed",String(this.signOn))}setStatus(e){const r=this.root.querySelector(".status");r&&(r.textContent=e)}textOf(e){return e.map(r=>r.text).join(`
`)}async onAction(e){var r;if(e==="play"&&this.toggle(),e==="captions"&&this.cycleCaptions(),e==="ad"&&this.toggleAd(),e==="sign"&&this.toggleSign(),(e==="left"||e==="right"||e==="up"||e==="down")&&this.nudge(e),(e==="shrink"||e==="grow")&&this.scaleSign(e==="grow"?1:-1),e==="pack")try{const a=await mn({english:this.textOf(this.en),amharic:this.textOf(this.am),descriptions:this.textOf(this.ad),audioEn:this.optionalUrl("audio-en"),audioAm:this.optionalUrl("audio-am")});tt(a.bytes,"learnable-3g-pack.zip","application/zip"),this.setStatus(a.audio?"3G pack downloaded, with narration and text.":"Text pack downloaded. Narration files were not beside the video.")}catch(a){this.setStatus(a instanceof Error?a.message:"The pack could not be built.")}if(e==="braille"){const a=this.mode==="am"?"am":"en",o=a==="am"?this.textOf(this.am):this.textOf(this.en);tt(new TextEncoder().encode(Bt(o)),`lesson-${a}.brf`,"text/plain"),this.setStatus("Braille file downloaded.")}if(e==="pdf"){try{const o=await fetch(Z(this.getAttribute("pdf")||"/media/learnable-lesson.pdf"));if(o.ok){tt(new Uint8Array(await o.arrayBuffer()),"learnable-lesson.pdf","application/pdf"),this.setStatus("Tagged PDF downloaded, with Amharic and the picture description.");return}}catch{}const a=Hn({title:"LearnAble lesson",paragraphs:this.en.map(o=>o.text),figureAlt:"Lesson picture with English and Amharic captions."});tt(a,"learnable-lesson.pdf","application/pdf"),this.setStatus("Tagged PDF downloaded. Amharic stays in the captions.")}if(e==="html"){const a=this.en.map(s=>`<h2>${s.text}</h2>`).join(""),o=this.am.map(s=>`<p lang="am">${s.text}</p>`).join(""),i=`<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><title>LearnAble lesson</title></head><body><main><h1>LearnAble lesson</h1><p>Picture: A navy phone on a paper background, with an English and Amharic caption under the screen.</p>${a}${o}</main></body></html>`;tt(new TextEncoder().encode(i),"learnable-lesson.html","text/html"),this.setStatus("HTML text version downloaded, with the picture description.")}if(e==="vtt-en"||e==="vtt-am"){const a=e==="vtt-am"?this.am:this.en;tt(new TextEncoder().encode(ge(a)),e==="vtt-am"?"captions-am.vtt":"captions-en.vtt","text/vtt"),this.setStatus(e==="vtt-am"?"Amharic captions downloaded.":"English captions downloaded.")}if(e==="job"){const a=((r=this.root.querySelector("[data-job]"))==null?void 0:r.textContent)||"";mt(a,"en"),this.setStatus("Playing the job summary on this device.")}if(e==="badge"){const a=await Ht();this.setStatus(a?"The certificate proof matches the published public key.":"The certificate proof does not match.")}}optionalUrl(e){const r=this.getAttribute(e);if(!(!r||r==="false"))return Z(r)}}class Jn extends HTMLElement{constructor(){super();B(this,"root");B(this,"built",!1);this.root=this.attachShadow({mode:"open"})}connectedCallback(){var e,r,a,o,i;this.built||(this.built=!0,this.root.innerHTML=`
      <style>${Te}</style>
      <div class="bar" role="group" aria-label="LearnAble display">
        <button type="button" data-key="largeText" aria-pressed="false">Larger text</button>
        <button type="button" data-key="highContrast" aria-pressed="false">High contrast</button>
        <button type="button" data-key="stopMotion" aria-pressed="false">Stop motion</button>
        <button type="button" data-act="read">Read this page</button>
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
      </div>
    `,this.root.querySelectorAll("button[data-key]").forEach(s=>{s.addEventListener("click",()=>{const l=s.dataset.key,d=T(),c=X({[l]:!d[l]});rt(c),this.reflect()})}),(e=this.root.querySelector("[data-key=captionScale]"))==null||e.addEventListener("input",s=>{const l=X({captionScale:Number(s.target.value)});rt(l)}),(r=this.root.querySelector("[data-key=captionPreset]"))==null||r.addEventListener("change",s=>{const l=X({captionPreset:s.target.value});rt(l)}),(a=this.root.querySelector("[data-key=uiLang]"))==null||a.addEventListener("change",s=>{X({uiLang:s.target.value==="am"?"am":"en"}),this.reflect()}),(o=this.root.querySelector("[data-act=read]"))==null||o.addEventListener("click",()=>{const s=Yn(),l=this.root.querySelector("[data-note]");l&&(l.textContent=s.notice),mt(s.text,s.lang==="am"?"am-ET":"en")}),(i=this.root.querySelector("[data-act=images]"))==null||i.addEventListener("click",()=>{var d;const s=((d=this.root.querySelector("[data-act=consent]"))==null?void 0:d.checked)===!0,l=this.root.querySelector("[data-note]");l&&(l.textContent=s?Gn():Dt())}),this.reflect())}reflect(){const e=T();this.root.querySelectorAll("button[data-key]").forEach(p=>{const h=p.dataset.key;p.setAttribute("aria-pressed",String(e[h]))});const r=Mt[e.uiLang];this.root.querySelector("[data-key=largeText]").textContent=r.larger,this.root.querySelector("[data-key=highContrast]").textContent=r.contrast,this.root.querySelector("[data-key=stopMotion]").textContent=r.stop;const a=this.root.querySelector("[data-act=read]"),o=this.root.querySelector("[data-act=images]");a&&(a.textContent=r.read),o&&(o.textContent=r.images);const i=this.root.querySelector("[href='#learnable-pipeline']"),s=this.root.querySelector("[href='#learnable-job']"),l=this.root.querySelector("[href='#learnable-session']");i&&(i.textContent=r.pipeline),s&&(s.textContent=r.job),l&&(l.textContent=r.session);const d=this.root.querySelector("[data-key=captionScale]"),c=this.root.querySelector("[data-key=captionPreset]"),u=this.root.querySelector("[data-key=uiLang]");d&&(d.value=String(e.captionScale)),c&&(c.value=e.captionPreset),u&&(u.value=e.uiLang);const f=document.querySelector(".learnable-skip");f&&(f.textContent=r.skip),e.highContrast?this.setAttribute("contrast","high"):this.removeAttribute("contrast")}}Ne(document.currentScript instanceof HTMLScriptElement?document.currentScript:null);let Be=!1,nt=null;function Me(){customElements.get("learnable-player")||customElements.define("learnable-player",Le),customElements.get("learnable-toolbar")||customElements.define("learnable-toolbar",Jn)}function Kn(){const t=document.querySelector("script[src*='learnable']"),n=t==null?void 0:t.getAttribute("data-learnable-enhance"),e=document.documentElement.dataset.learnableEnhance,r=t==null?void 0:t.getAttribute("data-learnable-lang");return{enhance:!(e==="off"||n==="false"||n==="off"),lang:r==="am"||r==="en"?r:void 0,assetBase:(t==null?void 0:t.getAttribute("data-learnable-base"))||void 0}}function Xn(){var t;if(!dt("toolbar")||!yt().toolbar||document.documentElement.dataset.learnableToolbar==="page"){nt==null||nt.remove(),nt=null;return}document.querySelector("learnable-toolbar")||(nt=document.createElement("learnable-toolbar"),nt.dataset.auto="true",(t=document.body)==null||t.append(nt))}function Fe(t={}){const n=Kn(),e=t.enhance!==void 0?t.enhance:n.enhance;Ln({...n,...t,enhance:e}),je(t.assetBase||n.assetBase),Me(),rt(T()),Xn(),e!==!1&&Un(),document.querySelectorAll("learnable-player").forEach(r=>{r instanceof Le&&r.refresh()}),Be=!0,window.dispatchEvent(new CustomEvent("learnable-ready",{detail:{settings:T(),features:yt()}}))}function Wt(){const t=ke();X(t),Fe()}function Ie(t={}){return Fe(t),Ut}function $e(){const t=Bn();return Vn(),rt(t),t}const Ut={init:Ie,boot:Wt,reset:$e,getSettings:T,setSettings(t){const n=X(t);return rt(n),n},getFeatures:yt,version:"0.3.0"};if(typeof window<"u"){window.LearnAble=Ut,Me();const t=()=>{Be||Wt()};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",t):t()}return R.boot=Wt,R.default=Ut,R.init=Ie,R.reset=$e,Object.defineProperties(R,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}}),R})({});typeof LearnAble<"u"&&LearnAble.default&&(window.LearnAble=LearnAble.default);
//# sourceMappingURL=learnable.js.map
