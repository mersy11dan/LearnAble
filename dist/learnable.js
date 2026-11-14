var LearnAble=(function(R){"use strict";var br=Object.defineProperty;var yr=(R,D,O)=>D in R?br(R,D,{enumerable:!0,configurable:!0,writable:!0,value:O}):R[D]=O;var M=(R,D,O)=>yr(R,typeof D!="symbol"?D+"":D,O);let D="",O="";function ze(t){t!=null&&t.src&&(D=new URL(".",t.src).href)}function Ze(t){t&&(O=new URL(t,document.baseURI).href,O.endsWith("/")||(O+="/"))}function Je(){return O||D||new URL("/",document.baseURI).href}function V(t){return!t||t==="false"||/^(https?:|data:|blob:)/i.test(t)?t:t.startsWith("/")?new URL(t,document.baseURI).href:new URL(t,Je()).href}const mt={segments:[{start:0,end:5.19,en:"Hana opens her lesson on a phone in Addis Ababa.",am:"ሃና ትምህርቷን በአዲስ አበባ በስልኳ ትከፍታለች።",ad:"A phone is drawn on a paper-coloured screen, with a short caption under it.",gloss:"OPEN"},{start:5.19,end:11.702,en:"She needs English and Amharic captions she can make larger.",am:"የእንግሊዝኛ እና የአማርኛ ጽሑፍ መግለጫዎችን ማተለቅ ትፈልጋለች።",ad:"The caption bar grows taller. The letters are yellow on a black band.",gloss:"LARGER"},{start:11.702,end:22.036,en:"A sign window can move and grow, so Ethiopian Sign Language sits where she needs it.",am:"የምልክት መስኮቱን ማንቀሳቀስና ማተለቅ ትችላለች። የኢትዮጵያ የምልክት ቋንቋ የምትፈልገውን ቦታ ይይዛል።",ad:"A second window lifts off the phone. It is labelled Ethiopian Sign Language.",gloss:"SIGN"},{start:22.036,end:28.919,en:"Audio description says what the picture is doing, for a learner who cannot see it.",am:"የድምጽ መግለጫ ሥዕሉ ምን እንደሚያደርግ ይናገራል። ለማያየው ተማሪ ነው።",ad:"A round speaker icon appears beside the phone.",gloss:"SPEAK"},{start:28.919,end:36.761,en:"When the network is slow she keeps a small pack: sound, text, and a light page.",am:"ኔትወርኩ ሲዘገይ ትንሽ ጥቅል ታስቀምጣለች። ድምጽ፣ ጽሑፍ፣ እና ቀላል ገጽ።",ad:"The phone is replaced by a short stack of pages and a sound file.",gloss:"PACK"},{start:36.761,end:43.179,en:"The lesson on this page is the same one, with the network or without it.",am:"በዚህ ገጽ ላይ ያለው ትምህርት አንድ ነው። ኔትወርክ ቢኖርም ባይኖርም።",ad:"The stack of pages stays in the centre of the screen.",gloss:"SAME"}],chat:[{time:.4,speaker:"Facilitator",text:"We are watching together. Captions are on."},{time:5.590000000000001,speaker:"Hana",text:"Please make the Amharic text larger."},{time:12.102,speaker:"Facilitator",text:"Move the sign window if it covers the caption."},{time:22.436,speaker:"Yonas",text:"I will turn on audio description."},{time:29.319,speaker:"Hana",text:"I am saving the small pack before the network drops."},{time:37.161,speaker:"Facilitator",text:"The text page matches what you just heard."}]},_t=[{id:"caption-partner",title:"Caption partner",titleAm:"የንዑስ ጽሑፍ አጋር",org:"Bole Open Classroom",place:"Addis Ababa",time:"Part time",access:"The summary is on the card, and the same words can be spoken. This card is a fictional demo.",summary:"Bole Open Classroom is hiring a caption partner in Addis Ababa. The work is part time. You write English and Amharic captions for short lessons. You need a careful ear and a phone that can play audio. This card is a fictional demo for the hackathon, so an employer can hear how a job summary sounds."},{id:"caption-intern",title:"Caption intern",titleAm:"የንዑስ ጽሑፍ ልምምድ",org:"Community radio",place:"Bahir Dar",time:"Sample stipend",access:"Deaf applicants are welcome in this story. Ethiopian Sign Language is used in the newsroom two days a week. Fictional demo.",summary:"Turn recorded Amharic shows into captions. A senior editor checks every file. This card is a fictional demo, so the stipend is not a real offer."},{id:"pdf-maker",title:"Accessible PDF maker",titleAm:"ተደራሽ ፒዲኤፍ አዘጋጅ",org:"Training desk",place:"Remote, sized for 3G",time:"Sample contract",access:"The work can be done from a downloaded pack. Live video meetings are not required. Fictional demo.",summary:"Add image descriptions and tags to training documents that already exist. This card is a fictional demo, so the contract is not a real offer."}],Qt={publicKey:{crv:"Ed25519",x:"UXNpzoUhtt_tIteTXTiCYkiF4KBKlRyXYLi4Y3vyQdY",kty:"OKP"},jwt:"eyJhbGciOiJFZERTQSIsInR5cCI6InZjK2p3dCIsImtpZCI6ImxlYXJuYWJsZS1kZW1vIn0.eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvbnMvY3JlZGVudGlhbHMvdjIiLCJodHRwczovL3B1cmwuaW1zZ2xvYmFsLm9yZy9zcGVjL29iL3YzcDAvY29udGV4dC0zLjAuMy5qc29uIl0sInR5cGUiOlsiVmVyaWZpYWJsZUNyZWRlbnRpYWwiLCJPcGVuQmFkZ2VDcmVkZW50aWFsIl0sImlzc3VlciI6eyJpZCI6Imh0dHBzOi8vbGVhcm5hYmxlLmxvY2FsL2lzc3VlciIsInR5cGUiOlsiUHJvZmlsZSJdLCJuYW1lIjoiTGVhcm5BYmxlIGRlbW8ifSwidmFsaWRGcm9tIjoiMjAyNi0xMS0xNVQwMDowMDowMFoiLCJuYW1lIjoiQWNjZXNzaWJsZSBtZWRpYSwgZGVtbyBsZXNzb24iLCJjcmVkZW50aWFsU3ViamVjdCI6eyJ0eXBlIjpbIkFjaGlldmVtZW50U3ViamVjdCJdLCJuYW1lIjoiSGFuYSBCZWtlbGUiLCJpZGVudGlmaWVyIjoiaGFuYS1kZW1vLTIwMjYiLCJhY2hpZXZlbWVudCI6eyJpZCI6Imh0dHBzOi8vbGVhcm5hYmxlLmxvY2FsL2FjaGlldmVtZW50cy9hY2Nlc3NpYmxlLW1lZGlhLWRlbW8iLCJ0eXBlIjpbIkFjaGlldmVtZW50Il0sIm5hbWUiOiJBY2Nlc3NpYmxlIG1lZGlhLCBkZW1vIGxlc3NvbiIsImRlc2NyaXB0aW9uIjoiQ29tcGxldGVkIHRoZSBMZWFybkFibGUgZGVtbyBvbiBjYXB0aW9ucywgc2lnbiwgYXVkaW8gZGVzY3JpcHRpb24sIGFuZCB0aGUgb2ZmbGluZSBwYWNrLiJ9fX0.v-8f4fVY60MgLeFQY6uJv6gwqqBQdcJijKgEjRh_sxwvqfcMjaFOV1V3WDLrETBkIKTr5UeChmFH4OPP-ZAlCw"};function Ke(t){const n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",e=t.replace(/-/g,"+").replace(/_/g,"/").replace(/=+$/,""),r=new Uint8Array(Math.floor(e.length*3/4));let a=0,o=0,i=0;for(const l of e){const s=n.indexOf(l);if(s<0)return new Uint8Array;a=a<<6|s,o+=6,o>=8&&(o-=8,r[i]=a>>o&255,i+=1)}return r.subarray(0,i)}async function te(t=Qt.jwt,n=Qt.publicKey){const[e,r,a]=t.split(".");if(!e||!r||!a)return!1;const o=await crypto.subtle.importKey("jwk",n,{name:"Ed25519"},!1,["verify"]),i=new TextEncoder().encode(`${e}.${r}`);return crypto.subtle.verify({name:"Ed25519"},o,Ke(a),i)}var T=Uint8Array,I=Uint16Array,Et=Int32Array,Ct=new T([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),Lt=new T([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),ee=new T([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),ne=function(t,n){for(var e=new I(31),r=0;r<31;++r)e[r]=n+=1<<t[r-1];for(var a=new Et(e[30]),r=1;r<30;++r)for(var o=e[r];o<e[r+1];++o)a[o]=o-e[r]<<5|r;return{b:e,r:a}},re=ne(Ct,2),Xe=re.b,Tt=re.r;Xe[28]=258,Tt[258]=28;for(var _e=ne(Lt,0),ae=_e.r,Mt=new I(32768),v=0;v<32768;++v){var J=(v&43690)>>1|(v&21845)<<1;J=(J&52428)>>2|(J&13107)<<2,J=(J&61680)>>4|(J&3855)<<4,Mt[v]=((J&65280)>>8|(J&255)<<8)>>1}for(var ut=(function(t,n,e){for(var r=t.length,a=0,o=new I(n);a<r;++a)t[a]&&++o[t[a]-1];var i=new I(n);for(a=1;a<n;++a)i[a]=i[a-1]+o[a-1]<<1;var l;if(e){l=new I(1<<n);var s=15-n;for(a=0;a<r;++a)if(t[a])for(var d=a<<4|t[a],c=n-t[a],u=i[t[a]-1]++<<c,g=u|(1<<c)-1;u<=g;++u)l[Mt[u]>>s]=d}else for(l=new I(r),a=0;a<r;++a)t[a]&&(l[a]=Mt[i[t[a]-1]++]>>15-t[a]);return l}),et=new T(288),v=0;v<144;++v)et[v]=8;for(var v=144;v<256;++v)et[v]=9;for(var v=256;v<280;++v)et[v]=7;for(var v=280;v<288;++v)et[v]=8;for(var bt=new T(32),v=0;v<32;++v)bt[v]=5;var Qe=ut(et,9,0),tn=ut(bt,5,0),oe=function(t){return(t+7)/8|0},ie=function(t,n,e){return(e==null||e>t.length)&&(e=t.length),new T(t.subarray(n,e))},en=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],yt=function(t,n,e){var r=new Error(n||en[t]);if(r.code=t,Error.captureStackTrace&&Error.captureStackTrace(r,yt),!e)throw r;return r},Z=function(t,n,e){e<<=n&7;var r=n/8|0;t[r]|=e,t[r+1]|=e>>8},dt=function(t,n,e){e<<=n&7;var r=n/8|0;t[r]|=e,t[r+1]|=e>>8,t[r+2]|=e>>16},Bt=function(t,n){for(var e=[],r=0;r<t.length;++r)t[r]&&e.push({s:r,f:t[r]});var a=e.length,o=e.slice();if(!a)return{t:ue,l:0};if(a==1){var i=new T(e[0].s+1);return i[e[0].s]=1,{t:i,l:1}}e.sort(function(F,$){return F.f-$.f}),e.push({s:-1,f:25001});var l=e[0],s=e[1],d=0,c=1,u=2;for(e[0]={s:-1,f:l.f+s.f,l,r:s};c!=a-1;)l=e[e[d].f<e[u].f?d++:u++],s=e[d!=c&&e[d].f<e[u].f?d++:u++],e[c++]={s:-1,f:l.f+s.f,l,r:s};for(var g=o[0].s,r=1;r<a;++r)o[r].s>g&&(g=o[r].s);var m=new I(g+1),p=Ft(e[c-1],m,0);if(p>n){var r=0,h=0,f=p-n,x=1<<f;for(o.sort(function($,A){return m[A.s]-m[$.s]||$.f-A.f});r<a;++r){var E=o[r].s;if(m[E]>n)h+=x-(1<<p-m[E]),m[E]=n;else break}for(h>>=f;h>0;){var N=o[r].s;m[N]<n?h-=1<<n-m[N]++-1:++r}for(;r>=0&&h;--r){var w=o[r].s;m[w]==n&&(--m[w],++h)}p=n}return{t:new T(m),l:p}},Ft=function(t,n,e){return t.s==-1?Math.max(Ft(t.l,n,e+1),Ft(t.r,n,e+1)):n[t.s]=e},se=function(t){for(var n=t.length;n&&!t[--n];);for(var e=new I(++n),r=0,a=t[0],o=1,i=function(s){e[r++]=s},l=1;l<=n;++l)if(t[l]==a&&l!=n)++o;else{if(!a&&o>2){for(;o>138;o-=138)i(32754);o>2&&(i(o>10?o-11<<5|28690:o-3<<5|12305),o=0)}else if(o>3){for(i(a),--o;o>6;o-=6)i(8304);o>2&&(i(o-3<<5|8208),o=0)}for(;o--;)i(a);o=1,a=t[l]}return{c:e.subarray(0,r),n}},ht=function(t,n){for(var e=0,r=0;r<n.length;++r)e+=t[r]*n[r];return e},le=function(t,n,e){var r=e.length,a=oe(n+2);t[a]=r&255,t[a+1]=r>>8,t[a+2]=t[a]^255,t[a+3]=t[a+1]^255;for(var o=0;o<r;++o)t[a+o+4]=e[o];return(a+4+r)*8},ce=function(t,n,e,r,a,o,i,l,s,d,c){Z(n,c++,e),++a[256];for(var u=Bt(a,15),g=u.t,m=u.l,p=Bt(o,15),h=p.t,f=p.l,x=se(g),E=x.c,N=x.n,w=se(h),F=w.c,$=w.n,A=new I(19),y=0;y<E.length;++y)++A[E[y]&31];for(var y=0;y<F.length;++y)++A[F[y]&31];for(var b=Bt(A,7),q=b.t,it=b.l,P=19;P>4&&!q[ee[P-1]];--P);var st=d+5<<3,W=ht(a,et)+ht(o,bt)+i,U=ht(a,g)+ht(o,h)+i+14+3*P+ht(A,q)+2*A[16]+3*A[17]+7*A[18];if(s>=0&&st<=W&&st<=U)return le(n,c,t.subarray(s,s+d));var Y,C,G,tt;if(Z(n,c,1+(U<W)),c+=2,U<W){Y=ut(g,m,0),C=g,G=ut(h,f,0),tt=h;var Zt=ut(q,it,0);Z(n,c,N-257),Z(n,c+5,$-1),Z(n,c+10,P-4),c+=14;for(var y=0;y<P;++y)Z(n,c+3*y,q[ee[y]]);c+=3*P;for(var H=[E,F],gt=0;gt<2;++gt)for(var lt=H[gt],y=0;y<lt.length;++y){var z=lt[y]&31;Z(n,c,Zt[z]),c+=q[z],z>15&&(Z(n,c,lt[y]>>5&127),c+=lt[y]>>12)}}else Y=Qe,C=et,G=tn,tt=bt;for(var y=0;y<l;++y){var L=r[y];if(L>255){var z=L>>18&31;dt(n,c,Y[z+257]),c+=C[z+257],z>7&&(Z(n,c,L>>23&31),c+=Ct[z]);var ct=L&31;dt(n,c,G[ct]),c+=tt[ct],ct>3&&(dt(n,c,L>>5&8191),c+=Lt[ct])}else dt(n,c,Y[L]),c+=C[L]}return dt(n,c,Y[256]),c+C[256]},nn=new Et([65540,131080,131088,131104,262176,1048704,1048832,2114560,2117632]),ue=new T(0),rn=function(t,n,e,r,a,o){var i=o.z||t.length,l=new T(r+i+5*(1+Math.ceil(i/7e3))+a),s=l.subarray(r,l.length-a),d=o.l,c=(o.r||0)&7;if(n){c&&(s[0]=o.r>>3);for(var u=nn[n-1],g=u>>13,m=u&8191,p=(1<<e)-1,h=o.p||new I(32768),f=o.h||new I(p+1),x=Math.ceil(e/3),E=2*x,N=function(Xt){return(t[Xt]^t[Xt+1]<<x^t[Xt+2]<<E)&p},w=new Et(25e3),F=new I(288),$=new I(32),A=0,y=0,b=o.i||0,q=0,it=o.w||0,P=0;b+2<i;++b){var st=N(b),W=b&32767,U=f[st];if(h[W]=U,f[st]=W,it<=b){var Y=i-b;if((A>7e3||q>24576)&&(Y>423||!d)){c=ce(t,s,0,w,F,$,y,q,P,b-P,c),q=A=y=0,P=b;for(var C=0;C<286;++C)F[C]=0;for(var C=0;C<30;++C)$[C]=0}var G=2,tt=0,Zt=m,H=W-U&32767;if(Y>2&&st==N(b-H))for(var gt=Math.min(g,Y)-1,lt=Math.min(32767,b),z=Math.min(258,Y);H<=lt&&--Zt&&W!=U;){if(t[b+G]==t[b+G-H]){for(var L=0;L<z&&t[b+L]==t[b+L-H];++L);if(L>G){if(G=L,tt=H,L>gt)break;for(var ct=Math.min(H,L-2),Oe=0,C=0;C<ct;++C){var Jt=b-H+C&32767,mr=h[Jt],Ve=Jt-mr&32767;Ve>Oe&&(Oe=Ve,U=Jt)}}}W=U,U=h[W],H+=W-U&32767}if(tt){w[q++]=268435456|Tt[G]<<18|ae[tt];var Ye=Tt[G]&31,He=ae[tt]&31;y+=Ct[Ye]+Lt[He],++F[257+Ye],++$[He],it=b+G,++A}else w[q++]=t[b],++F[t[b]]}}for(b=Math.max(b,it);b<i;++b)w[q++]=t[b],++F[t[b]];c=ce(t,s,d,w,F,$,y,q,P,b-P,c),d||(o.r=c&7|s[c/8|0]<<3,c-=7,o.h=f,o.p=h,o.i=b,o.w=it)}else{for(var b=o.w||0;b<i+d;b+=65535){var Kt=b+65535;Kt>=i&&(s[c/8|0]=d,Kt=i),c=le(s,c+1,t.subarray(b,Kt))}o.i=i}return ie(l,0,r+oe(c)+a)},an=(function(){for(var t=new Int32Array(256),n=0;n<256;++n){for(var e=n,r=9;--r;)e=(e&1&&-306674912)^e>>>1;t[n]=e}return t})(),on=function(){var t=-1;return{p:function(n){for(var e=t,r=0;r<n.length;++r)e=an[e&255^n[r]]^e>>>8;t=e},d:function(){return~t}}},sn=function(t,n,e,r,a){if(!a&&(a={l:1},n.dictionary)){var o=n.dictionary.subarray(-32768),i=new T(o.length+t.length);i.set(o),i.set(t,o.length),t=i,a.w=o.length}return rn(t,n.level==null?6:n.level,n.mem==null?a.l?Math.ceil(Math.max(8,Math.min(13,Math.log(t.length)))*1.5):20:12+n.mem,e,r,a)},de=function(t,n){var e={};for(var r in t)e[r]=t[r];for(var r in n)e[r]=n[r];return e},S=function(t,n,e){for(;e;++n)t[n]=e,e>>>=8};function ln(t,n){return sn(t,n||{},0,0)}var he=function(t,n,e,r){for(var a in t){var o=t[a],i=n+a,l=r;Array.isArray(o)&&(l=de(r,o[1]),o=o[0]),ArrayBuffer.isView(o)?e[i]=[o,l]:(e[i+="/"]=[new T(0),l],he(o,i,e,r))}},fe=typeof TextEncoder<"u"&&new TextEncoder,cn=typeof TextDecoder<"u"&&new TextDecoder,un=0;try{cn.decode(ue,{stream:!0}),un=1}catch{}function pe(t,n){var e;if(fe)return fe.encode(t);for(var r=t.length,a=new T(t.length+(t.length>>1)),o=0,i=function(d){a[o++]=d},e=0;e<r;++e){if(o+5>a.length){var l=new T(o+8+(r-e<<1));l.set(a),a=l}var s=t.charCodeAt(e);s<128||n?i(s):s<2048?(i(192|s>>6),i(128|s&63)):s>55295&&s<57344?(s=65536+(s&1047552)|t.charCodeAt(++e)&1023,i(240|s>>18),i(128|s>>12&63),i(128|s>>6&63),i(128|s&63)):(i(224|s>>12),i(128|s>>6&63),i(128|s&63))}return ie(a,0,o)}var It=function(t){var n=0;if(t)for(var e in t){var r=t[e].length;r>65535&&yt(9),n+=r+4}return n},ge=function(t,n,e,r,a,o,i,l){var s=r.length,d=e.extra,c=l&&l.length,u=It(d);S(t,n,i!=null?33639248:67324752),n+=4,i!=null&&(t[n++]=20,t[n++]=e.os),t[n]=20,n+=2,t[n++]=e.flag<<1|(o<0&&8),t[n++]=a&&8,t[n++]=e.compression&255,t[n++]=e.compression>>8;var g=new Date(e.mtime==null?Date.now():e.mtime),m=g.getFullYear()-1980;if((m<0||m>119)&&yt(10),S(t,n,m<<25|g.getMonth()+1<<21|g.getDate()<<16|g.getHours()<<11|g.getMinutes()<<5|g.getSeconds()>>1),n+=4,o!=-1&&(S(t,n,e.crc),S(t,n+4,o<0?-o-2:o),S(t,n+8,e.size)),S(t,n+12,s),S(t,n+14,u),n+=16,i!=null&&(S(t,n,c),S(t,n+6,e.attrs),S(t,n+10,i),n+=14),t.set(r,n),n+=s,u)for(var p in d){var h=d[p],f=h.length;S(t,n,+p),S(t,n+2,f),t.set(h,n+4),n+=4+f}return c&&(t.set(l,n),n+=c),n},dn=function(t,n,e,r,a){S(t,n,101010256),S(t,n+8,e),S(t,n+10,e),S(t,n+12,r),S(t,n+16,a)};function hn(t,n){n||(n={});var e={},r=[];he(t,"",e,n);var a=0,o=0;for(var i in e){var l=e[i],s=l[0],d=l[1],c=d.level==0?0:8,u=pe(i),g=u.length,m=d.comment,p=m&&pe(m),h=p&&p.length,f=It(d.extra);g>65535&&yt(11);var x=c?ln(s,d):s,E=x.length,N=on();N.p(s),r.push(de(d,{size:s.length,crc:N.d(),c:x,f:u,m:p,u:g!=i.length||p&&m.length!=h,o:a,compression:c})),a+=30+g+f+E,o+=76+2*(g+f)+(h||0)+E}for(var w=new T(o+22),F=a,$=o-a,A=0;A<r.length;++A){var u=r[A];ge(w,u.o,u,u.f,u.u,u.c.length);var y=30+u.f.length+It(u.extra);w.set(u.c,u.o+y),ge(w,a,u,u.f,u.u,u.c.length,u.o,u.m),a+=16+y+(u.m?u.m.length:0)}return dn(w,a,r.length,$,F),w}const fn=`# Ethiopic-G1
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
`,pn=` A1B'K2L@CIF/MSP"E3H9O6R^DJG>NTQ,*5<-U8V.%[$+X!&;:4\\0Z7(_?W]#Y)=`,gn="JABCDEFGHI",mn={".":"4",",":"1","?":"8","!":"6","'":"'","-":"-",":":"3",";":"2"};function bn(t){return t<0||t>63?"?":pn[t]??"?"}function yn(t){let n=0;for(const e of t){const r=Number(e);r>=1&&r<=6&&(n|=1<<r-1)}return n}function xn(t){const n=new Map;for(const e of t.split(/\r?\n/)){const r=/^(?:letter|punctuation)\s+\\x([0-9A-Fa-f]+)\s+(\S+)/.exec(e.trim());if(!r)continue;const a=Number.parseInt(r[1],16);n.set(a,r[2].split("-").map(yn))}return n}const vn=xn(fn);function wn(t){let n="",e=!1;for(const r of t){const a=r.codePointAt(0)??0,o=vn.get(a);if(o){e=!1,n+=o.map(bn).join("");continue}if(r===`
`){e=!1,n+=`
`;continue}if(r===" "){e=!1,n+=" ";continue}if(/[0-9]/.test(r)){e||(n+="#",e=!0),n+=gn[Number(r)];continue}if(e=!1,/[a-z]/.test(r)){n+=r.toUpperCase();continue}if(/[A-Z]/.test(r)){n+=`,${r}`;continue}n+=mn[r]??"?"}return n}function $t(t,n=40){const e=wn(t),r=[];for(const a of e.split(`
`)){const o=a.split(" ");let i="";for(const l of o){if(!i){i=l;continue}i.length+1+l.length<=n?i+=` ${l}`:(r.push(i),i=l)}i&&r.push(i)}return`${r.join(`
`)}
`}const An='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" role="img"><title>A navy phone on a paper background, with an English and Amharic caption under the screen.</title><rect width="640" height="480" fill="#f2f0ea"/><rect x="230" y="40" width="180" height="320" rx="28" fill="#ffffff" stroke="#1b3048" stroke-width="8"/><rect x="254" y="72" width="132" height="210" rx="6" fill="#f2f0ea" stroke="#1b3048" stroke-width="3"/><rect x="120" y="390" width="400" height="36" fill="#111111"/><rect x="140" y="400" width="160" height="8" fill="#ffee00"/></svg>',Sn="A navy phone on a paper background, with an English and Amharic caption under the screen.";function kn(t,n,e,r){const a=t.split(`
`).filter(Boolean),o=n.split(`
`).filter(Boolean),i=a.map((l,s)=>`<section><h2>${l}</h2>${o[s]?`<p lang="am">${o[s]}</p>`:""}</section>`).join("");return`<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><title>LearnAble light lesson</title></head><body><main><h1>LearnAble light lesson</h1><p>Sound, text, and this page. The video is not in the pack.</p><figure><img src="lesson-figure.svg" alt="${Sn}"></figure><h2>English</h2>${r?'<audio controls src="lesson-en.wav"></audio>':"<p>The narration file was not on this host.</p>"}<h2 lang="am">አማርኛ</h2>${r?'<audio controls src="lesson-am.wav"></audio>':""}${i}${e?`<h2>Audio description</h2><p>${e}</p>`:""}</main></body></html>`}async function me(t){if(!t)return null;try{const n=await fetch(t);return n.ok?new Uint8Array(await n.arrayBuffer()):null}catch{return null}}async function En(t){const n=await me(t.audioEn),e=await me(t.audioAm),r={"index.html":new TextEncoder().encode(kn(t.english,t.amharic,t.descriptions||"",!!(n||e))),"lesson-figure.svg":new TextEncoder().encode(An),"transcript-en.brf":new TextEncoder().encode($t(t.english)),"transcript-am.brf":new TextEncoder().encode($t(t.amharic))};return n&&(r["lesson-en.wav"]=n),e&&(r["lesson-am.wav"]=e),{bytes:hn(r),audio:!!(n||e)}}function K(t,n,e){const r=new Blob([Uint8Array.from(t)],{type:e}),a=URL.createObjectURL(r),o=document.createElement("a");o.href=a,o.download=n,document.body.append(o),o.click(),o.remove(),URL.revokeObjectURL(a)}function be(){return typeof window<"u"&&"speechSynthesis"in window}function qt(t,n,e=1){if(!be()||!t.trim())return;window.speechSynthesis.cancel();const r=new SpeechSynthesisUtterance(t);r.lang=n,r.rate=Math.min(2,Math.max(.5,e));const a=n.toLowerCase().slice(0,2),o=window.speechSynthesis.getVoices().find(i=>i.lang.toLowerCase().startsWith(a));o&&(r.voice=o),window.speechSynthesis.speak(r)}function ye(){be()&&window.speechSynthesis.cancel()}function xe(t){const n=/^(?:(\d+):)?(\d{2}):(\d{2})\.(\d{3})$/.exec(t.trim());if(!n)throw new Error(`Bad WebVTT timestamp: ${t}`);const e=Number(n[1]??0),r=Number(n[2]),a=Number(n[3]),o=Number(n[4]);return e*3600+r*60+a+o/1e3}function Cn(t){var a;const n=t.replace(/^\uFEFF/,"").split(/\r?\n/),e=[];let r=0;if((a=n[0])!=null&&a.startsWith("WEBVTT"))for(r=1;r<n.length&&n[r].trim()!=="";)r+=1;for(;r<n.length;){if(n[r].trim()===""){r+=1;continue}let o=n[r];!o.includes("-->")&&r+1<n.length&&(r+=1,o=n[r]);const i=o.split("-->");if(i.length<2){r+=1;continue}const l=xe(i[0]),s=i[1].trim().split(/\s+/)[0],d=xe(s);r+=1;const c=[];for(;r<n.length&&n[r].trim()!=="";)c.push(n[r]),r+=1;e.push({start:l,end:d,text:c.join(`
`)})}return e}function ve(t){const n=Math.max(0,Math.round(t*1e3)),e=Math.floor(n/36e5),r=Math.floor(n%36e5/6e4),a=Math.floor(n%6e4/1e3),o=n%1e3;return`${String(e).padStart(2,"0")}:${String(r).padStart(2,"0")}:${String(a).padStart(2,"0")}.${String(o).padStart(3,"0")}`}function we(t){return`WEBVTT

${t.map(e=>`${ve(e.start)} --> ${ve(e.end)}
${e.text}`).join(`

`)}
`}function Ae(t,n){const e=t.find(a=>n>=a.start&&n<a.end);if(e)return e;const r=t[t.length-1];if(r&&n>=r.start&&n<=r.end+.05)return r}const Pt={en:{larger:"Larger text",contrast:"High contrast",stop:"Stop motion",read:"Read this page",stopRead:"Stop reading",language:"Language",images:"Image check",skip:"Skip to content",menu:"Menu",pipeline:"Transcript",job:"Job card",session:"Session"},am:{larger:"ትልቅ ጽሑፍ",contrast:"ከፍተኛ ንጽጽር",stop:"እንቅስቃሴ አቁም",read:"ይህን ገጽ አንብብ",stopRead:"ማንበብ አቁም",language:"ቋንቋ",images:"የምስል ምርመራ",skip:"ወደ ዋናው ይዘት ዝለል",menu:"ምናሌ",pipeline:"ጽሑፍ",job:"የስራ ካርድ",session:"ክፍለ ጊዜ"}},j="data-learnable-repair";function Se(t){var i,l,s,d,c;const n=(i=t.getAttribute("aria-label"))==null?void 0:i.trim();if(n)return n;const e=t.getAttribute("aria-labelledby");if(e){const u=e.split(/\s+/).map(g=>{var m;return((m=document.getElementById(g))==null?void 0:m.textContent)||""}).join(" ").replace(/\s+/g," ").trim();if(u)return u}const r=((l=t.textContent)==null?void 0:l.replace(/\s+/g," ").trim())||"";if(r)return r;const a=(d=(s=t.querySelector("img[alt]"))==null?void 0:s.getAttribute("alt"))==null?void 0:d.trim();if(a)return a;const o=(c=t.getAttribute("title"))==null?void 0:c.trim();return o||""}function X(t){return!!t.closest("learnable-player, learnable-toolbar, .learnable-gateway")}function Ln(){document.querySelectorAll("a, button, [role='button']").forEach(t=>{var a;if(X(t)||Se(t))return;const n=(a=t.getAttribute("title"))==null?void 0:a.trim(),r=t.classList.contains("logo-container")||t.querySelector(".logo")?"ALX home":t.tagName==="A"?"Link":"Button";t.setAttribute("aria-label",n||r),t.setAttribute(j,"name")}),document.querySelectorAll("input, select, textarea").forEach(t=>{var a,o,i;if(X(t)||t.getAttribute("type")==="hidden"||t.getAttribute("aria-label")||t.closest("label"))return;const n=t.getAttribute("id");if(n&&document.querySelector(`label[for="${CSS.escape(n)}"]`))return;const e=(a=t.getAttribute("placeholder"))==null?void 0:a.trim(),r=(i=(o=t.previousElementSibling)==null?void 0:o.textContent)==null?void 0:i.replace(/\s+/g," ").trim();t.setAttribute("aria-label",e||r||t.getAttribute("name")||"Input"),t.setAttribute(j,"label")})}function Tn(){document.querySelectorAll("img").forEach(t=>{if(X(t)||t.hasAttribute("alt"))return;if(!!t.closest("[aria-hidden='true']")||t.className.toString().includes("icon")||t.width>0&&t.width<8)t.alt="",t.setAttribute("role","presentation");else{t.alt="Needs a description";const e=document.createElement("span");e.className="learnable-alt-note",e.textContent="Needs a description",t.after(e)}t.setAttribute(j,"alt")})}function Mn(){document.querySelectorAll("[aria-expanded]").forEach(t=>{if(X(t))return;const n=t.getAttribute("role"),e=t.tagName;n||e==="BUTTON"||e==="A"||e==="SUMMARY"||(t.setAttribute("role","button"),t.hasAttribute("tabindex")||t.setAttribute("tabindex","0"),t.setAttribute(j,"aria"))}),document.querySelectorAll("[role='progressbar']").forEach(t=>{var e,r,a;if(X(t)||Se(t))return;const n=(a=(r=(e=t.closest("div"))==null?void 0:e.parentElement)==null?void 0:r.textContent)==null?void 0:a.replace(/\s+/g," ").trim().slice(0,80);t.setAttribute("aria-label",n||"Progress"),t.setAttribute(j,"aria")}),document.querySelectorAll("a.anchor[aria-hidden='true'], [aria-hidden='true'][tabindex]").forEach(t=>{t.setAttribute("tabindex","-1"),t.getAttribute("aria-hidden")==="true"&&t.classList.contains("modal")&&t.removeAttribute("tabindex"),t.setAttribute(j,"aria")}),document.querySelectorAll("span[aria-label], div[aria-label]").forEach(t=>{X(t)||t.getAttribute("role")||(t.setAttribute("role","note"),t.setAttribute(j,"aria"))})}function Bn(){document.querySelectorAll("ul, ol").forEach(t=>{X(t)||[...t.children].forEach(n=>{if(n.tagName==="LI"||n.tagName==="SCRIPT"||n.tagName==="TEMPLATE")return;const e=document.createElement("li");n.replaceWith(e),e.append(n),e.setAttribute(j,"list")})})}function Rt(t){const n=t/255;return n<=.03928?n/12.92:((n+.055)/1.055)**2.4}function xt(t){return .2126*Rt(t[0])+.7152*Rt(t[1])+.0722*Rt(t[2])}function nt(t,n){const e=Math.max(xt(t),xt(n)),r=Math.min(xt(t),xt(n));return(e+.05)/(r+.05)}function ke(t){const n=t.match(/rgba?\(([^)]+)\)/);if(!n)return null;const e=n[1].split(",").map(r=>Number.parseFloat(r.trim()));return e.length<3||e.some(r=>Number.isNaN(r))?null:[e[0],e[1],e[2],e[3]??1]}function Fn(t,n){const e=t[3];return[t[0]*e+n[0]*(1-e),t[1]*e+n[1]*(1-e),t[2]*e+n[2]*(1-e),1]}function In(t){const n=[];let e=t;for(;e;){const a=ke(getComputedStyle(e).backgroundColor);if(a&&a[3]>0&&n.push(a),a&&a[3]>=1)break;e=e.parentElement}if(n.length===0)return[255,255,255,1];let r=n[n.length-1];for(let a=n.length-2;a>=0;a-=1)r=Fn(n[a],r);return r}function Nt(t,n,e){return[Math.round(t[0]+(n[0]-t[0])*e),Math.round(t[1]+(n[1]-t[1])*e),Math.round(t[2]+(n[2]-t[2])*e),1]}function $n(t){const n=getComputedStyle(t),e=Number.parseFloat(n.fontSize),r=Number.parseInt(n.fontWeight,10)||400;return e>=24||e>=18.67&&r>=700?3:4.5}function qn(){document.querySelectorAll("[data-learnable-repair='contrast']").forEach(t=>{t.style.removeProperty("color"),t.removeAttribute(j)})}function Ee(){document.documentElement.dataset.learnableContrast!=="on"&&document.querySelectorAll("a, button, span, p, h1, h2, h3, h4, li, label, div, td, th, code, small, strong, b, em").forEach(t=>{if(X(t)||t.getAttribute(j)==="contrast"||![...t.childNodes].some(s=>{var d;return s.nodeType===Node.TEXT_NODE&&((d=s.textContent)==null?void 0:d.trim())})||t.getClientRects().length===0)return;const e=ke(getComputedStyle(t).color);if(!e)return;const r=In(t),a=$n(t);if(nt(e,r)>=a)return;const o=a+.45;let i=e,l=2;for(const s of[[0,0,0],[255,255,255]]){let d=0,c=1;for(let m=0;m<10;m+=1){const p=(d+c)/2;nt(Nt(e,s,p),r)>=o?c=p:d=p}let u=c,g=Nt(e,s,u);for(;nt(g,r)<o&&u<1;)u=Math.min(1,u+.08),g=Nt(e,s,u);nt(g,r)>=o&&u<l&&(i=g,l=u)}if(nt(i,r)<o){const s=[0,0,0,1],d=[255,255,255,1];i=nt(s,r)>=nt(d,r)?s:d}t.style.setProperty("color",`rgb(${i[0]}, ${i[1]}, ${i[2]})`,"important"),t.setAttribute(j,"contrast")})}function Pn(){Ln(),Tn(),Mn(),Bn(),Ee()}const Ce={white:{label:"White on black",fg:"#ffffff",bg:"#111111"},yellow:{label:"Yellow on black",fg:"#ffee00",bg:"#111111"},black:{label:"Black on white",fg:"#172033",bg:"#f2f0ea"},cyan:{label:"Cyan on black",fg:"#00ffff",bg:"#111111"}},Dt="learnable-widget",Le=()=>({toolbar:!0,signWindow:!0,audioDescription:!0,offlinePack:!1,braille:!1,taggedDocs:!1}),jt=()=>({lang:"en",uiLang:"en",largeText:!1,highContrast:!1,stopMotion:!1,captionScale:1.15,captionPreset:"white",contrastMode:"off",contrastLevel:7,readRate:1,readPitch:1,readVerbosity:"sentences",haptics:!1});let Te=Le(),_=jt(),Me="paper",vt=!0;function ft(t){return vt===!1?!1:vt===!0?!0:vt[t]!==!1}function Be(){try{return window.matchMedia("(prefers-reduced-motion: reduce)").matches}catch{return!1}}function Fe(){const t=jt();t.stopMotion=Be();try{const n=localStorage.getItem(Dt);if(!n)return t;const e=JSON.parse(n),r=e.lang==="am"?"am":e.lang==="en"?"en":t.lang,a=e.uiLang==="am"?"am":e.uiLang==="en"?"en":t.uiLang,o=e.contrastMode==="bw"||e.contrastMode==="yb"?e.contrastMode:"off",i=Math.min(10,Math.max(1,Number(e.contrastLevel)||t.contrastLevel));return{...t,...e,lang:r,uiLang:a,contrastMode:o,contrastLevel:i}}catch{return t}}function k(){return{..._}}function wt(){return{...Te}}function Rn(){return Me}function Wt(t){_={...t},localStorage.setItem(Dt,JSON.stringify(_)),window.dispatchEvent(new CustomEvent("learnable-settings",{detail:k()}))}function B(t){const n={...k(),...t};return Wt(n),k()}function Nn(t={}){Te={...Le(),...t.features},t.theme&&(Me=t.theme),t.enhance!==void 0&&(vt=t.enhance);const n=Fe();_={...n,lang:t.lang??n.lang,uiLang:t.uiLang??n.uiLang},Wt(_)}function Dn(){return localStorage.removeItem(Dt),_=jt(),_.stopMotion=Be(),Wt(_),k()}function Ie(t,n,e){return t.hasAttribute(n)?t.getAttribute(n)!=="false":e}const jn=["captions-en","captions-am","sign","describe","audio-en","audio-am","offline","braille","docs"];function Wn(t,n){for(const r of jn){const a=t.getAttribute(`data-learnable-${r}`);a!==null&&n.setAttribute(r,a)}const e=t.getAttribute("src");e&&!n.getAttribute("src")&&n.setAttribute("src",e)}function $e(t){if(t.dataset.learnableUpgraded==="true"||t.closest("learnable-player"))return;t.dataset.learnableUpgraded="true";const n=document.createElement("learnable-player");Wn(t,n),n.hasAttribute("offline")||n.setAttribute("offline",""),n.hasAttribute("braille")||n.setAttribute("braille",""),n.hasAttribute("docs")||n.setAttribute("docs",""),t.slot="media",t.replaceWith(n),n.append(t)}function Un(){ft("media")&&(document.querySelectorAll("video, audio").forEach(t=>{t instanceof HTMLElement&&$e(t)}),document.querySelectorAll("iframe").forEach(t=>{const n=t.getAttribute("src")||"";/youtube\.com|youtu\.be|player\.vimeo\.com|vimeo\.com/.test(n)&&t instanceof HTMLElement&&$e(t)}))}function Gn(){if(!ft("skip")||document.querySelector("a.learnable-skip, a[href='#content'], a[href='#main']"))return;const t=document.querySelector("main");t&&!t.id&&(t.id="content");const n=document.createElement("a");n.className="learnable-skip",n.href=t!=null&&t.id?`#${t.id}`:"#content",n.textContent=Pt[k().uiLang].skip,document.body.prepend(n)}function On(){if(!ft("landmarks"))return;const t=document.querySelector(".header");t&&!document.querySelector("header, [role='banner']")&&t.setAttribute("role","banner");const n=document.getElementById("sidebar");n&&!document.querySelector("nav, [role='navigation']")&&(n.setAttribute("role","navigation"),n.getAttribute("aria-label")||n.setAttribute("aria-label","Sidebar"))}function Vn(t){return[...document.querySelectorAll(t)].filter(n=>!n.closest("learnable-player, learnable-toolbar"))}function Yn(t,n,e){const r=t.indexOf(n);if(r<0)return;t[(r+e+t.length)%t.length].focus()}function Hn(t){const n=t.target;if(!(n instanceof HTMLElement)||n.closest("learnable-player, learnable-toolbar, input, textarea, select"))return;n.classList.contains("hamburger")&&(t.key==="Enter"||t.key===" ")&&(t.preventDefault(),n.click(),n.setAttribute("aria-expanded",document.body.classList.contains("sidebar-collapsed")?"false":"true")),t.key==="Escape"&&(document.querySelectorAll(".collapse.show").forEach(r=>{const a=document.querySelector(`[data-bs-target="#${r.id}"]`);(a==null?void 0:a.getAttribute("aria-expanded"))==="true"&&a.click()}),document.querySelectorAll(".dropdown-menu.show").forEach(r=>{r.classList.remove("show")}));const e=[".homepage-nav .nav-link","button[data-section-index]",".accordion-button",".dropdown-menu.show .dropdown-item"];if(!(t.key!=="ArrowRight"&&t.key!=="ArrowLeft"&&t.key!=="ArrowDown"&&t.key!=="ArrowUp"))for(const r of e){const a=Vn(r);if(!a.includes(n))continue;t.preventDefault();const o=t.key==="ArrowRight"||t.key==="ArrowDown"?1:-1;Yn(a,n,o);break}}function zn(){ft("keyboard")&&(document.querySelectorAll(".hamburger").forEach(t=>{t.dataset.learnableKey!=="true"&&(t.dataset.learnableKey="true",t.tabIndex=0,t.setAttribute("role","button"),t.setAttribute("aria-label",Pt[k().uiLang].menu),t.setAttribute("aria-expanded",String(!document.body.classList.contains("sidebar-collapsed"))))}),document.documentElement.dataset.learnableKeys!=="true"&&(document.documentElement.dataset.learnableKeys="true",document.addEventListener("keydown",Hn)))}function Zn(){return[...document.querySelectorAll("img")].filter(t=>{var n;return!t.hasAttribute("alt")||t.getAttribute("alt")===((n=t.getAttribute("src"))==null?void 0:n.split("/").pop())})}function Ut(){const t=Zn();if(t.length===0)return"Every image on this page has a text alternative.";const n=t.slice(0,8).map(e=>e.currentSrc||e.getAttribute("src")||"image");return`${t.length} image${t.length===1?"":"s"} need a description. Nothing was sent off this page. ${n.join(" ")}`}function Jn(){var a,o,i;if(document.getElementById("learnable-gateway"))return;const t=document.querySelector("main")||document.body,n=_t[0],e=document.createElement("section");e.id="learnable-gateway",e.className="learnable-gateway",e.setAttribute("aria-label","LearnAble lesson tools");const r=mt.chat.map(l=>`<li>${l.speaker}: ${l.text}</li>`).join("");e.innerHTML=`
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
  `,t.append(e),e.querySelectorAll("[data-vtt]").forEach(l=>{l.addEventListener("click",()=>{const s=l.dataset.vtt==="am",d=mt.segments.map(u=>({start:u.start,end:u.end,text:s?u.am:u.en}));K(new TextEncoder().encode(we(d)),s?"captions-am.vtt":"captions-en.vtt","text/vtt");const c=e.querySelector("[data-pipeline-note]");c&&(c.textContent=s?"Amharic captions downloaded from the sample lesson.":"English captions downloaded from the sample lesson.")})}),(a=e.querySelector("[data-pipeline-file]"))==null||a.addEventListener("change",()=>{var d,c;const l=(c=(d=e.querySelector("[data-pipeline-file]"))==null?void 0:d.files)==null?void 0:c[0],s=e.querySelector("[data-pipeline-note]");!l||!s||l.text().then(u=>{const g=mt.segments.find(m=>u.includes(m.en));s.textContent=g?`Sample translation: ${g.am}`:"No translation service is running, and this text is not in the sample lesson."})}),(o=e.querySelector("[data-job]"))==null||o.addEventListener("click",()=>{var l;qt(((l=e.querySelector("[data-job-summary]"))==null?void 0:l.textContent)||"","en")}),(i=e.querySelector("[data-badge]"))==null||i.addEventListener("click",()=>{const l=e.querySelector("[data-cert]");te().then(s=>{l&&(l.textContent=s?"The certificate proof matches the published public key.":"The certificate proof does not match.")})})}function Kn(){if(Un(),Gn(),On(),zn(),Jn(),!document.getElementById("learnable-reader-live")){const t=document.createElement("p");t.id="learnable-reader-live",t.setAttribute("role","status"),document.body.append(t)}Pn()}function Xn(t){var e;return(e=document.querySelector("script[src*='learnable']"))==null?void 0:e.getAttribute("data-learnable-api"),Ut()}function At(t,n,e){const r=l=>[0,2,4].map(s=>Number.parseInt(l.slice(s,s+2),16)),a=r(t.replace("#","")),o=r(n.replace("#",""));return`#${a.map((l,s)=>Math.round(l+(o[s]-l)*e)).map(l=>l.toString(16).padStart(2,"0")).join("")}`}function _n(t,n){const r=(Math.min(10,Math.max(1,Math.round(n)))-1)/9;return t==="yb"?{bg:At("16140c","12100c",r),fg:At("e6c200","ffe566",r),focus:"#ffffff"}:{bg:At("1c1c1c","121212",r),fg:At("e6e6e6","f2f2f2",r),focus:"#ffe14a"}}const Gt="learnable-host-adjust";function Qn(t){const n=t.contrastMode==="off"?null:_n(t.contrastMode,t.contrastLevel);return`
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
.learnable-sentence.is-current, .is-current {
  outline: 3px solid #0b3d91; outline-offset: 2px; background: #ffee00; color: #172033;
}
#learnable-reader-live { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }
html[data-learnable-text="large"] { font-size: 112.5%; }
${n?`
html[data-learnable-contrast="on"] { --la-hc-bg: ${n.bg}; --la-hc-fg: ${n.fg}; --la-hc-focus: ${n.focus}; }
html[data-learnable-contrast="on"] body,
html[data-learnable-contrast="on"] body *:not(img):not(video):not(svg):not(canvas):not(iframe) {
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
  src: url("${V("/fonts/atkinson-latin-400.woff2")}") format("woff2");
  font-display: swap;
}
@font-face {
  font-family: Literata;
  src: url("${V("/fonts/literata-latin-600.woff2")}") format("woff2");
  font-display: swap;
}
@font-face {
  font-family: "Noto Sans Ethiopic";
  src: url("${V("/fonts/NotoSansEthiopic-Regular.ttf")}") format("truetype");
  font-display: swap;
}
`}function Q(t){const n=document.documentElement;n.dataset.learnableText=t.largeText?"large":"default",n.dataset.learnableMotion=t.stopMotion?"reduce":"allow";let e=document.getElementById(Gt);e||(e=document.createElement("style"),e.id=Gt,document.head.append(e)),e.textContent=Qn(t),n.dataset.learnableContrast=t.contrastMode==="off"?"off":"on",t.contrastMode==="off"?Ee():qn()}function tr(){var n;(n=document.getElementById(Gt))==null||n.remove();const t=document.documentElement;delete t.dataset.learnableText,delete t.dataset.learnableContrast,delete t.dataset.learnableMotion}function er(t){if(t.metaKey||t.ctrlKey||t.altKey)return null;switch(t.key){case" ":case"k":case"K":return{type:"toggle-play"};case"c":case"C":return{type:"cycle-captions"};case"d":case"D":return{type:"toggle-ad"};case"s":case"S":return{type:"toggle-sign"};case"ArrowLeft":return{type:"seek",by:-5};case"ArrowRight":return{type:"seek",by:5};case"j":case"J":return{type:"seek",by:-10};case"l":case"L":return{type:"seek",by:10};case"ArrowUp":return{type:"volume",by:.1};case"ArrowDown":return{type:"volume",by:-.1};case"m":case"M":return{type:"mute"};case"f":case"F":return{type:"fullscreen"};case"Home":return{type:"seek-to",to:"start"};case"End":return{type:"seek-to",to:"end"};case"?":return{type:"help"};default:return null}}function Ot(t){return t.replace(/[^\t\n\r\x20-\x7E]/g,"?").replace(/\\/g,"\\\\").replace(/\(/g,"\\(").replace(/\)/g,"\\)")}function nr(t,n){const e=t.split(/\s+/).filter(Boolean),r=[];let a="";for(const o of e)a?a.length+1+o.length<=n?a+=` ${o}`:(r.push(a),a=o):a=o;return a&&r.push(a),r.length>0?r:[""]}function rr(t){const n=[{tag:"H1",text:t.title},...t.paragraphs.map(p=>({tag:"P",text:p})),{tag:"Figure",text:t.figureAlt}],e=[];let r=740;n.forEach((p,h)=>{if(p.tag==="Figure"){e.push(`/Figure <</MCID ${h}>> BDC`),e.push("0.106 0.188 0.282 RG"),e.push(`56 ${Math.max(72,r-64)} 180 56 re S`),e.push("EMC");return}const f=p.tag==="H1"?18:12,x=f+4,E=nr(p.text,p.tag==="H1"?58:86);e.push(`/${p.tag} <</MCID ${h}>> BDC`),e.push("BT"),e.push(`/F1 ${f} Tf`),e.push(`1 0 0 1 56 ${r} Tm`),E.forEach((N,w)=>{w>0&&e.push(`0 -${x} Td`),e.push(`(${Ot(N)}) Tj`)}),e.push("ET"),e.push("EMC"),r-=E.length*x+12});const a=e.join(`
`),o=n.map((p,h)=>`${8+h} 0 R`).join(" "),i=n.map((p,h)=>`${8+h} 0 R`).join(" "),l=8+n.length,s=l+1,d=[],c=p=>{d.push(p)};c("<< /Type /Catalog /Pages 3 0 R /Lang (en) /MarkInfo << /Marked true >> /ViewerPreferences << /DisplayDocTitle true >> /StructTreeRoot 2 0 R >>"),c(`<< /Type /StructTreeRoot /K 7 0 R /ParentTree ${l} 0 R >>`),c("<< /Type /Pages /Count 1 /Kids [4 0 R] >>"),c("<< /Type /Page /Parent 3 0 R /MediaBox [0 0 612 792] /Contents 5 0 R /Resources << /Font << /F1 6 0 R >> >> /StructParents 0 /Tabs /S >>"),c(`<< /Length ${a.length} >>
stream
${a}
endstream`),c("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>"),c(`<< /Type /StructElem /S /Document /P 2 0 R /Lang (en) /K [${o}] >>`),n.forEach((p,h)=>{const f=p.tag==="Figure"?` /Alt (${Ot(t.figureAlt)})`:"";c(`<< /Type /StructElem /S /${p.tag} /P 7 0 R /Pg 4 0 R${f} /K << /Type /MCR /Pg 4 0 R /MCID ${h} >> >>`)}),c(`<< /Nums [ 0 [${i}] ] >>`),c(`<< /Title (${Ot(t.title)}) /Author (LearnAble) >>`);let u=`%PDF-1.7
`;const g=[0];d.forEach((p,h)=>{g.push(u.length),u+=`${h+1} 0 obj
${p}
endobj
`});const m=u.length;u+=`xref
0 ${d.length+1}
`,u+=`0000000000 65535 f 
`;for(let p=1;p<g.length;p+=1)u+=`${g[p].toString().padStart(10,"0")} 00000 n 
`;return u+=`trailer
<< /Size ${d.length+1} /Root 1 0 R /Info ${s} 0 R >>
`,u+=`startxref
${m}
%%EOF`,new TextEncoder().encode(u)}function St(t){(!Number.isFinite(t)||t<0)&&(t=0);const n=Math.floor(t),e=Math.floor(n/60),r=n%60;return`${e}:${r.toString().padStart(2,"0")}`}const ar={signs:[{match:"Hana opens",gloss:"OPEN",clip:null},{match:"captions she can make larger",gloss:"LARGER",clip:null},{match:"sign window",gloss:"SIGN",clip:null},{match:"Audio description",gloss:"SPEAK",clip:null},{match:"small pack",gloss:"PACK",clip:null},{match:"same one",gloss:"SAME",clip:null}]};function or(t){const n=ar.signs.find(r=>t.toLowerCase().includes(r.match.toLowerCase()));return n?{gloss:n.gloss,clip:n.clip,placeholder:!0}:{gloss:(t.replace(/[^A-Za-z\u1200-\u137F]/g," ").trim().split(/\s+/)[0]||"SIGN").slice(0,12).toUpperCase(),clip:null,placeholder:!0}}function ir(t){return[...t.toUpperCase()].filter(n=>/[A-Z]/.test(n))}const qe=`
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
.media-row { display: grid; grid-template-columns: minmax(0, 1fr) 0.5rem var(--sign-col, 16rem); gap: 0.5rem; align-items: start; }
.sign-grip { cursor: col-resize; background: var(--color-moss); min-height: 2.75rem; }
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
input[type="range"] { width: 100%; min-height: 2.75rem; }
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
`;function Vt(t,n,e){const r=new CustomEvent(n,{bubbles:!0,composed:!0,detail:e});t.dispatchEvent(r),window.dispatchEvent(new CustomEvent(n,{detail:e}))}class Pe extends HTMLElement{constructor(){super();M(this,"root");M(this,"video",null);M(this,"signClip",null);M(this,"en",[]);M(this,"am",[]);M(this,"ad",[]);M(this,"mode","en");M(this,"adOn",!1);M(this,"signOn",!0);M(this,"lastAd","");M(this,"built",!1);M(this,"onSettings",()=>{this.applySettings()});this.root=this.attachShadow({mode:"open"})}connectedCallback(){this.built||this.mount(),this.loadTracks(),this.applySettings(),window.addEventListener("learnable-settings",this.onSettings)}refresh(){this.built=!1,this.mount(),this.loadTracks(),this.applySettings()}disconnectedCallback(){window.removeEventListener("learnable-settings",this.onSettings),ye()}mount(){var c,u,g,m,p,h;this.built=!0;const e=wt(),r=Ie(this,"sign",e.signWindow),a=Ie(this,"describe",e.audioDescription),o=this.hasAttribute("offline")||e.offlinePack,i=this.hasAttribute("braille")||e.braille,l=this.hasAttribute("docs")||e.taggedDocs;this.root.innerHTML=`
      <style>${qe}</style>
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
          ${l?'<button type="button" data-act="pdf">Download tagged PDF</button>':""}
          ${l?'<button type="button" data-act="html">Download HTML</button>':""}
          <button type="button" data-act="vtt-en">Download English VTT</button>
          <button type="button" data-act="vtt-am">Download Amharic VTT</button>
        </div>
        <h2>Transcript</h2>
        <ol class="transcript"></ol>
        <h2>Job card</h2>
        <p data-job>${(c=_t[0])==null?void 0:c.summary}</p>
        <div class="row">
          <button type="button" data-act="job">Play audio summary</button>
          <button type="button" data-act="badge">Check certificate</button>
        </div>
        <h2>Session chat</h2>
        <ol class="chat">
          ${mt.chat.map(f=>`<li><span>${St(f.time)}</span> ${f.speaker}: ${f.text}</li>`).join("")}
        </ol>
        <button type="button" data-act="txt">Download transcript text</button>
      </section>
    `,this.bindMedia();const s=this.root.querySelector(".sign-grip");s==null||s.addEventListener("pointerdown",f=>this.dragSign(f)),s==null||s.addEventListener("keydown",f=>{(f.key==="ArrowLeft"||f.key==="ArrowDown")&&this.nudge("left"),(f.key==="ArrowRight"||f.key==="ArrowUp")&&this.nudge("right"),f.key==="Home"&&this.setSignColumn(12),f.key==="End"&&this.setSignColumn(24)});const d=this.root.querySelector(".stage");d==null||d.addEventListener("keydown",f=>this.onKey(f)),this.root.querySelectorAll("button[data-act]").forEach(f=>{f.addEventListener("click",()=>this.onAction(f.dataset.act||""))}),(u=this.root.querySelector("[data-act=size]"))==null||u.addEventListener("input",f=>{const x=Number(f.target.value);B({captionScale:x}),this.styleCaption(x,k().captionPreset)}),(g=this.root.querySelector("[data-act=preset]"))==null||g.addEventListener("change",f=>{const x=f.target.value;B({captionPreset:x}),this.styleCaption(k().captionScale,x)}),(m=this.video)==null||m.addEventListener("timeupdate",()=>this.sync()),(p=this.video)==null||p.addEventListener("play",()=>{this.setPlayLabel(!0),Vt(this,"learnable-play",{playing:!0})}),(h=this.video)==null||h.addEventListener("pause",()=>{this.setPlayLabel(!1),Vt(this,"learnable-play",{playing:!1})})}bindMedia(){const e=this.querySelector("video, audio"),r=this.root.querySelector("[data-fallback]");if(e instanceof HTMLMediaElement&&e.slot==="media")this.video=e,r&&(r.hidden=!0),e.setAttribute("playsinline","");else if(r){this.video=r;const i=this.getAttribute("src");i&&(r.src=V(i))}this.signClip=this.root.querySelector("[data-sign-video]");const a=this.getAttribute("sign");this.signClip&&a&&a!=="false"&&(this.signClip.src=V(a));const o=this.querySelector("iframe");o&&!o.getAttribute("title")&&o.setAttribute("title","Embedded lesson video")}signColumn(){const e=this.root.querySelector(".media-row"),r=Number.parseFloat((e==null?void 0:e.style.getPropertyValue("--sign-col"))||"16");return Number.isFinite(r)?r:16}setSignColumn(e){const r=this.root.querySelector(".media-row");r&&r.style.setProperty("--sign-col",`${Math.min(28,Math.max(10,e))}rem`)}dragSign(e){if(e.button!==0)return;const r=e.currentTarget;if(!(r instanceof HTMLElement))return;const a=e.clientX,o=this.signColumn(),i=s=>this.setSignColumn(o+(a-s.clientX)/16),l=()=>{r.removeEventListener("pointermove",i),r.removeEventListener("pointerup",l)};r.setPointerCapture(e.pointerId),r.addEventListener("pointermove",i),r.addEventListener("pointerup",l)}async loadTracks(){this.en=await this.fetchCues(this.getAttribute("captions-en")),this.am=await this.fetchCues(this.getAttribute("captions-am")),this.ad=await this.fetchCues(this.getAttribute("describe"));const e=this.root.querySelector("[data-sign]");e&&(e.hidden=!this.signOn),this.renderTranscript(),this.sync()}renderTranscript(){const e=this.root.querySelector(".transcript");if(!e)return;const r=this.en.length?this.en:this.am;e.replaceChildren();for(const a of r){const o=document.createElement("li"),i=document.createElement("button");i.type="button",i.dataset.seek=String(a.start),i.textContent=`${St(a.start)} ${a.text}`,i.addEventListener("click",()=>{this.video&&(this.video.currentTime=a.start)}),o.append(i),e.append(o)}}async fetchCues(e){if(!e||e==="false")return[];try{const r=await fetch(V(e));return r.ok?Cn(await r.text()):[]}catch{return[]}}applySettings(){const e=k();this.mode=e.lang,e.highContrast?this.setAttribute("contrast","high"):this.removeAttribute("contrast"),this.setAttribute("theme",Rn());const r=this.root.querySelector("[data-act=preset]"),a=this.root.querySelector("[data-act=size]");r&&(r.value=e.captionPreset),a&&(a.value=String(e.captionScale)),this.styleCaption(e.captionScale,e.captionPreset),this.sync()}styleCaption(e,r){const a=this.root.querySelector(".caption"),o=Ce[r]??Ce.white;a&&(a.style.color=o.fg,a.style.background=o.bg,a.style.fontSize=`${e}rem`)}setPlayLabel(e){const r=this.root.querySelector("[data-act=play]");r&&(r.textContent=e?"Pause":"Play");const a=this.root.querySelector(".status"),o=(a==null?void 0:a.textContent)||"";a&&this.video&&(o.startsWith("Playing")||o.startsWith("Paused"))&&(a.textContent=`${e?"Playing":"Paused"}. ${St(this.video.currentTime)} of ${St(this.video.duration||0)}.`)}sync(){var c;if(!this.video)return;const e=this.video.currentTime,r=this.mode==="am"?this.am:this.mode==="en"?this.en:[],a=this.mode==="off"?void 0:Ae(r,e),o=this.root.querySelector(".caption");o&&(o.textContent=(a==null?void 0:a.text)??"",o.setAttribute("lang",this.mode==="am"?"am":"en"));const i=or((a==null?void 0:a.text)||""),l=this.root.querySelector(".gloss");l&&(l.textContent=i.gloss);const s=this.root.querySelector("[data-spell]");if(s&&(s.textContent=i.clip?"":`Fingerspelling placeholder: ${ir(i.gloss).join(" ")}`),this.signClip&&(i.clip?(this.signClip.hidden=!1,this.signClip.getAttribute("src")!==V(i.clip)&&(this.signClip.src=V(i.clip))):this.signClip.hidden=!0),(c=this.signClip)!=null&&c.getAttribute("src")&&this.video&&Math.abs(this.signClip.currentTime-e)>.4&&(this.signClip.currentTime=e),this.adOn){const u=Ae(this.ad,e);u&&u.text!==this.lastAd&&(this.lastAd=u.text,qt(u.text,"en"))}const d=this.root.querySelector("[data-act=captions]");d&&(d.textContent=this.mode==="off"?"Captions: off":this.mode==="am"?"Captions: Amharic":"Captions: English"),this.setPlayLabel(!this.video.paused)}onKey(e){const r=er(e);r&&(e.preventDefault(),r.type==="toggle-play"&&this.toggle(),r.type==="cycle-captions"&&this.cycleCaptions(),r.type==="toggle-ad"&&this.toggleAd(),r.type==="toggle-sign"&&this.toggleSign(),r.type==="seek"&&this.video&&(this.video.currentTime=Math.max(0,this.video.currentTime+r.by)),r.type==="seek-to"&&this.video&&(this.video.currentTime=r.to==="start"?0:this.video.duration||0),r.type==="mute"&&this.video&&(this.video.muted=!this.video.muted),r.type==="volume"&&this.video&&(this.video.volume=Math.min(1,Math.max(0,this.video.volume+r.by))))}async toggle(){var e,r;if(this.video)try{this.video.paused?(await this.video.play(),(e=this.signClip)!=null&&e.getAttribute("src")&&this.signClip.play().catch(()=>{})):(this.video.pause(),(r=this.signClip)==null||r.pause())}catch{this.setStatus("The video did not play. Captions are still listed when the file loads.")}}cycleCaptions(){this.mode=this.mode==="off"?"en":this.mode==="en"?"am":"off",this.sync(),Vt(this,"learnable-captions",{lang:this.mode})}toggleAd(){this.adOn=!this.adOn,this.adOn||ye();const e=this.root.querySelector("[data-act=ad]");e&&e.setAttribute("aria-pressed",String(this.adOn))}nudge(e){const r=e==="left"||e==="shrink"?-2:2;this.setSignColumn(this.signColumn()+r)}scaleSign(e){this.setSignColumn(this.signColumn()+e*2)}toggleSign(){this.signOn=!this.signOn;const e=this.root.querySelector("[data-sign]");e&&(e.hidden=!this.signOn);const r=this.root.querySelector("[data-act=sign]");r&&r.setAttribute("aria-pressed",String(this.signOn))}setStatus(e){const r=this.root.querySelector(".status");r&&(r.textContent=e)}textOf(e){return e.map(r=>r.text).join(`
`)}async onAction(e){var r;if(e==="play"&&this.toggle(),e==="captions"&&this.cycleCaptions(),e==="ad"&&this.toggleAd(),e==="sign"&&this.toggleSign(),(e==="left"||e==="right"||e==="up"||e==="down")&&this.nudge(e),(e==="shrink"||e==="grow")&&this.scaleSign(e==="grow"?1:-1),e==="pack")try{const a=await En({english:this.textOf(this.en),amharic:this.textOf(this.am),descriptions:this.textOf(this.ad),audioEn:this.optionalUrl("audio-en"),audioAm:this.optionalUrl("audio-am")});K(a.bytes,"learnable-3g-pack.zip","application/zip"),this.setStatus(a.audio?"3G pack downloaded, with narration and text.":"Text pack downloaded. Narration files were not beside the video.")}catch(a){this.setStatus(a instanceof Error?a.message:"The pack could not be built.")}if(e==="braille"){const a=this.mode==="am"?"am":"en",o=a==="am"?this.textOf(this.am):this.textOf(this.en);K(new TextEncoder().encode($t(o)),`lesson-${a}.brf`,"text/plain"),this.setStatus("Braille file downloaded.")}if(e==="pdf"){try{const o=await fetch(V(this.getAttribute("pdf")||"/media/learnable-lesson.pdf"));if(o.ok){K(new Uint8Array(await o.arrayBuffer()),"learnable-lesson.pdf","application/pdf"),this.setStatus("Tagged PDF downloaded, with Amharic and the picture description.");return}}catch{}const a=rr({title:"LearnAble lesson",paragraphs:this.en.map(o=>o.text),figureAlt:"Lesson picture with English and Amharic captions."});K(a,"learnable-lesson.pdf","application/pdf"),this.setStatus("Tagged PDF downloaded. Amharic stays in the captions.")}if(e==="html"){const a=this.en.map(l=>`<h2>${l.text}</h2>`).join(""),o=this.am.map(l=>`<p lang="am">${l.text}</p>`).join(""),i=`<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><title>LearnAble lesson</title></head><body><main><h1>LearnAble lesson</h1><p>Picture: A navy phone on a paper background, with an English and Amharic caption under the screen.</p>${a}${o}</main></body></html>`;K(new TextEncoder().encode(i),"learnable-lesson.html","text/html"),this.setStatus("HTML text version downloaded, with the picture description.")}if(e==="txt"){const a=`English
${this.textOf(this.en)}

Amharic
${this.textOf(this.am)}
`;K(new TextEncoder().encode(a),"learnable-transcript.txt","text/plain"),this.setStatus("Transcript text downloaded.")}if(e==="vtt-en"||e==="vtt-am"){const a=e==="vtt-am"?this.am:this.en;K(new TextEncoder().encode(we(a)),e==="vtt-am"?"captions-am.vtt":"captions-en.vtt","text/vtt"),this.setStatus(e==="vtt-am"?"Amharic captions downloaded.":"English captions downloaded.")}if(e==="job"){const a=((r=this.root.querySelector("[data-job]"))==null?void 0:r.textContent)||"";qt(a,"en"),this.setStatus("Playing the job summary on this device.")}if(e==="badge"){const a=await te();this.setStatus(a?"The certificate proof matches the published public key.":"The certificate proof does not match.")}}optionalUrl(e){const r=this.getAttribute(e);if(!(!r||r==="false"))return V(r)}}let at=[],kt=0,pt=!1,Yt=!1;function ot(t){const n=document.getElementById("learnable-reader-live");n&&(n.textContent=t)}function sr(){document.querySelectorAll(".learnable-sentence").forEach(t=>{t.replaceWith(document.createTextNode(t.textContent||""))}),document.querySelectorAll(".is-current").forEach(t=>t.classList.remove("is-current")),Yt=!1,at=[]}function lr(t){const n=document.createTreeWalker(t,NodeFilter.SHOW_TEXT),e=[];for(;n.nextNode();)e.push(n.currentNode);const r=[];return e.forEach(a=>{const o=a.parentElement;if(!o||o.closest("script, style, learnable-player, learnable-toolbar, .learnable-gateway, .learnable-sentence"))return;const i=(a.textContent||"").split(new RegExp("(?<=[.!?])\\s+")).filter(s=>s.trim());if(i.length===0)return;const l=document.createDocumentFragment();i.forEach(s=>{const d=document.createElement("span");d.className="learnable-sentence",d.textContent=s,l.append(d,document.createTextNode(" ")),r.push(d)}),a.replaceWith(l)}),Yt=!0,r}function cr(){const t=document.querySelector("main");if(!t)return[];const n=k().readVerbosity;return n==="headings"?[...t.querySelectorAll("h1, h2, h3")]:n==="links"?[...t.querySelectorAll("a")]:Yt?[...t.querySelectorAll(".learnable-sentence")]:lr(t)}function ur(){var n;!k().haptics||!("vibrate"in navigator)||(n=navigator.vibrate)==null||n.call(navigator,20)}function Re(){var r,a;(r=window.speechSynthesis)==null||r.cancel();const t=at[kt];if(at.forEach(o=>o.classList.remove("is-current")),!t){pt=!1,ot("Reading stopped.");return}t.classList.add("is-current"),t.scrollIntoView({block:"nearest"});const n=k(),e=new SpeechSynthesisUtterance(t.textContent||"");e.rate=n.readRate,e.pitch=n.readPitch,e.lang=document.documentElement.lang||"en",e.onend=()=>{pt&&(kt+=1,Re())},ot(`Reading ${kt+1} of ${at.length}.`),ur(),(a=window.speechSynthesis)==null||a.speak(e)}function dr(){if(!window.speechSynthesis){ot("This browser has no speech synthesis. Nothing was spoken.");return}if(at=cr(),at.length===0){ot("There is no text to read in the main region.");return}pt=!0,Re()}function hr(){var t;pt=!1,(t=window.speechSynthesis)==null||t.cancel(),ot("Reading paused.")}function Ne(){var t;pt=!1,kt=0,(t=window.speechSynthesis)==null||t.cancel(),sr(),ot("Reading stopped. The page text is unchanged.")}class fr extends HTMLElement{constructor(){super();M(this,"root");M(this,"built",!1);this.root=this.attachShadow({mode:"open"})}connectedCallback(){var e,r,a,o,i,l,s,d,c,u,g,m,p;this.built||(this.built=!0,this.root.innerHTML=`
      <style>${qe}</style>
      <div class="bar" role="group" aria-label="LearnAble display">
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
        <details>
          <summary>Keyboard help</summary>
          <p>Reading keys work only while this toolbar is focused, so they do not cover a screen reader. Escape stops reading.</p>
        </details>
      </div>
    `,this.root.querySelectorAll("button[data-key]").forEach(h=>{h.addEventListener("click",()=>{const f=h.dataset.key,x=k(),E=B({[f]:!x[f]});Q(E),this.reflect()})}),(e=this.root.querySelector("[data-key=captionScale]"))==null||e.addEventListener("input",h=>{const f=B({captionScale:Number(h.target.value)});Q(f)}),(r=this.root.querySelector("[data-key=captionPreset]"))==null||r.addEventListener("change",h=>{const f=B({captionPreset:h.target.value});Q(f)}),(a=this.root.querySelector("[data-key=uiLang]"))==null||a.addEventListener("change",h=>{B({uiLang:h.target.value==="am"?"am":"en"}),this.reflect()}),(o=this.root.querySelector("[data-key=contrastMode]"))==null||o.addEventListener("change",h=>{const f=h.target.value,x=B({contrastMode:f==="bw"||f==="yb"?f:"off"});Q(x),this.reflect()}),(i=this.root.querySelector("[data-key=contrastLevel]"))==null||i.addEventListener("input",h=>{const f=B({contrastLevel:Number(h.target.value)});Q(f),this.reflect()}),(l=this.root.querySelector("[data-key=readRate]"))==null||l.addEventListener("input",h=>{B({readRate:Number(h.target.value)})}),(s=this.root.querySelector("[data-key=readPitch]"))==null||s.addEventListener("input",h=>{B({readPitch:Number(h.target.value)})}),(d=this.root.querySelector("[data-key=readVerbosity]"))==null||d.addEventListener("change",h=>{const f=h.target.value;B({readVerbosity:f==="headings"||f==="links"?f:"sentences"})}),(c=this.root.querySelector("[data-key=haptics]"))==null||c.addEventListener("change",h=>{B({haptics:h.target.checked})}),(u=this.root.querySelector("[data-act=read-play]"))==null||u.addEventListener("click",()=>dr()),(g=this.root.querySelector("[data-act=read-pause]"))==null||g.addEventListener("click",()=>hr()),(m=this.root.querySelector("[data-act=read-stop]"))==null||m.addEventListener("click",()=>Ne()),this.root.addEventListener("keydown",h=>{h instanceof KeyboardEvent&&h.key==="Escape"&&Ne()}),(p=this.root.querySelector("[data-act=images]"))==null||p.addEventListener("click",()=>{var x;const h=((x=this.root.querySelector("[data-act=consent]"))==null?void 0:x.checked)===!0,f=this.root.querySelector("[data-note]");f&&(f.textContent=h?Xn():Ut())}),this.reflect())}reflect(){const e=k();this.root.querySelectorAll("button[data-key]").forEach(f=>{const x=f.dataset.key;f.setAttribute("aria-pressed",String(e[x]))});const r=Pt[e.uiLang];this.root.querySelector("[data-key=largeText]").textContent=r.larger,this.root.querySelector("[data-key=stopMotion]").textContent=r.stop;const a=this.root.querySelector("[data-act=images]");a&&(a.textContent=r.images);const o=this.root.querySelector("[href='#learnable-pipeline']"),i=this.root.querySelector("[href='#learnable-job']"),l=this.root.querySelector("[href='#learnable-session']");o&&(o.textContent=r.pipeline),i&&(i.textContent=r.job),l&&(l.textContent=r.session);const s=this.root.querySelector("[data-key=captionScale]"),d=this.root.querySelector("[data-key=captionPreset]"),c=this.root.querySelector("[data-key=uiLang]");s&&(s.value=String(e.captionScale)),d&&(d.value=e.captionPreset),c&&(c.value=e.uiLang);const u=this.root.querySelector("[data-key=contrastMode]"),g=this.root.querySelector("[data-key=contrastLevel]"),m=this.root.querySelector("[data-contrast-value]");u&&(u.value=e.contrastMode),g&&(g.value=String(e.contrastLevel)),m&&(m.textContent=String(e.contrastLevel));const p=this.root.querySelector("[data-key=haptics]");p&&(p.checked=e.haptics);const h=document.querySelector(".learnable-skip");h&&(h.textContent=r.skip),e.contrastMode!=="off"?this.setAttribute("contrast","high"):this.removeAttribute("contrast")}}ze(document.currentScript instanceof HTMLScriptElement?document.currentScript:null);let De=!1,rt=null;function je(){customElements.get("learnable-player")||customElements.define("learnable-player",Pe),customElements.get("learnable-toolbar")||customElements.define("learnable-toolbar",fr)}function pr(){const t=document.querySelector("script[src*='learnable']"),n=t==null?void 0:t.getAttribute("data-learnable-enhance"),e=document.documentElement.dataset.learnableEnhance,r=t==null?void 0:t.getAttribute("data-learnable-lang");return{enhance:!(e==="off"||n==="false"||n==="off"),lang:r==="am"||r==="en"?r:void 0,assetBase:(t==null?void 0:t.getAttribute("data-learnable-base"))||void 0}}function gr(){var t;if(!ft("toolbar")||!wt().toolbar||document.documentElement.dataset.learnableToolbar==="page"){rt==null||rt.remove(),rt=null;return}document.querySelector("learnable-toolbar")||(rt=document.createElement("learnable-toolbar"),rt.dataset.auto="true",(t=document.body)==null||t.append(rt))}function We(t={}){const n=pr(),e=t.enhance!==void 0?t.enhance:n.enhance;Nn({...n,...t,enhance:e}),Ze(t.assetBase||n.assetBase),je(),Q(k()),gr(),e!==!1&&Kn(),document.querySelectorAll("learnable-player").forEach(r=>{r instanceof Pe&&r.refresh()}),De=!0,window.dispatchEvent(new CustomEvent("learnable-ready",{detail:{settings:k(),features:wt()}}))}function Ht(){const t=Fe();B(t),We()}function Ue(t={}){return We(t),zt}function Ge(){const t=Dn();return tr(),Q(t),t}const zt={init:Ue,boot:Ht,reset:Ge,getSettings:k,setSettings(t){const n=B(t);return Q(n),n},getFeatures:wt,version:"0.3.0"};if(typeof window<"u"){window.LearnAble=zt,je();const t=()=>{De||Ht()};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",t):t()}return R.boot=Ht,R.default=zt,R.init=Ue,R.reset=Ge,Object.defineProperties(R,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}}),R})({});typeof LearnAble<"u"&&LearnAble.default&&(window.LearnAble=LearnAble.default);
//# sourceMappingURL=learnable.js.map
