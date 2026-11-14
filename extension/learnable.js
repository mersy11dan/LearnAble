var LearnAble=(function(O){"use strict";var za=Object.defineProperty;var Xa=(O,F,W)=>F in O?za(O,F,{enumerable:!0,configurable:!0,writable:!0,value:W}):O[F]=W;var T=(O,F,W)=>Xa(O,typeof F!="symbol"?F+"":F,W);var F=typeof document<"u"?document.currentScript:null;let W="",pe="";function Gn(e){e!=null&&e.src&&(W=new URL(".",e.src).href)}function Vn(e){if(!(W||!e))try{const n=new URL(e);if(n.protocol!=="http:"&&n.protocol!=="https:")return;W=new URL(".",n).href}catch{}}function jn(e){e&&(pe=new URL(e,W||`${location.origin}/`).href,pe.endsWith("/")||(pe+="/"))}function Kn(){return pe||W||`${location.origin}/`}function H(e){if(!e||e==="false"||/^(https?:|data:|blob:)/i.test(e))return e;const n=Kn();return e.startsWith("/")?new URL(e,new URL(n).origin).href:new URL(e,n).href}const Ae={segments:[{start:0,end:5.19,en:"Hana opens her lesson on a phone in Addis Ababa.",am:"ሃና ትምህርቷን በአዲስ አበባ በስልኳ ትከፍታለች።",ad:"A phone is drawn on a paper-coloured screen, with a short caption under it.",gloss:"fs-ADDIS fs-ABABA, HANA IX-3 PHONE LESSON OPEN"},{start:5.19,end:11.702,en:"She needs English and Amharic captions she can make larger.",am:"የእንግሊዝኛ እና የአማርኛ ጽሑፍ መግለጫዎችን ማተለቅ ትፈልጋለች።",ad:"The caption bar grows taller. The letters are yellow on a black band.",gloss:"ENGLISH AMHARIC CAPTIONS, IX-3 NEED LARGER"},{start:11.702,end:22.036,en:"A sign window can move and grow, so Ethiopian Sign Language sits where she needs it.",am:"የምልክት መስኮቱን ማንቀሳቀስና ማተለቅ ትችላለች። የኢትዮጵያ የምልክት ቋንቋ የምትፈልገውን ቦታ ይይዛል።",ad:"A second window lifts off the phone. It is labelled Ethiopian Sign Language.",gloss:"SIGN WINDOW, CAN MOVE GROW. ETHIOPIAN SIGN, WHERE IX-3 NEED"},{start:22.036,end:28.919,en:"Audio description says what the picture is doing, for a learner who cannot see it.",am:"የድምጽ መግለጫ ሥዕሉ ምን እንደሚያደርግ ይናገራል። ለማያየው ተማሪ ነው።",ad:"A round speaker icon appears beside the phone.",gloss:"AUDIO DESCRIPTION, PICTURE DO-WHAT. LEARNER SEE-NOT, FOR IX-3"},{start:28.919,end:36.761,en:"When the network is slow she keeps a small pack: sound, text, and a light page.",am:"ኔትወርኩ ሲዘገይ ትንሽ ጥቅል ታስቀምጣለች። ድምጽ፣ ጽሑፍ፣ እና ቀላል ገጽ።",ad:"The phone is replaced by a short stack of pages and a sound file.",gloss:"NETWORK SLOW, IX-3 KEEP PACK SMALL: SOUND TEXT PAGE LIGHT"},{start:36.761,end:43.179,en:"The lesson on this page is the same one, with the network or without it.",am:"በዚህ ገጽ ላይ ያለው ትምህርት አንድ ነው። ኔትወርክ ቢኖርም ባይኖርም።",ad:"The stack of pages stays in the centre of the screen.",gloss:"PAGE THIS, LESSON SAME. NETWORK WITH OR WITHOUT, SAME"}],chat:[{time:.4,speaker:"Facilitator",text:"We are watching together. Captions are on."},{time:5.590000000000001,speaker:"Hana",text:"Please make the Amharic text larger."},{time:12.102,speaker:"Facilitator",text:"Move the sign window if it covers the caption."},{time:22.436,speaker:"Yonas",text:"I will turn on audio description."},{time:29.319,speaker:"Hana",text:"I am saving the small pack before the network drops."},{time:37.161,speaker:"Facilitator",text:"The text page matches what you just heard."}]},vt=[{id:"caption-partner",title:"Caption partner",titleAm:"የንዑስ ጽሑፍ አጋር",org:"Bole Open Classroom",place:"Addis Ababa",time:"Part time",access:"The summary is on the card, and the same words can be spoken. This card is a fictional demo.",summary:"Bole Open Classroom is hiring a caption partner in Addis Ababa. The work is part time. You write English and Amharic captions for short lessons. You need a careful ear and a phone that can play audio. This card is a fictional demo for the hackathon, so an employer can hear how a job summary sounds."},{id:"caption-intern",title:"Caption intern",titleAm:"የንዑስ ጽሑፍ ልምምድ",org:"Community radio",place:"Bahir Dar",time:"Sample stipend",access:"Deaf applicants are welcome in this story. Ethiopian Sign Language is used in the newsroom two days a week. Fictional demo.",summary:"Turn recorded Amharic shows into captions. A senior editor checks every file. This card is a fictional demo, so the stipend is not a real offer."},{id:"pdf-maker",title:"Accessible PDF maker",titleAm:"ተደራሽ ፒዲኤፍ አዘጋጅ",org:"Training desk",place:"Remote, sized for 3G",time:"Sample contract",access:"The work can be done from a downloaded pack. Live video meetings are not required. Fictional demo.",summary:"Add image descriptions and tags to training documents that already exist. This card is a fictional demo, so the contract is not a real offer."}],xt={publicKey:{crv:"Ed25519",x:"UXNpzoUhtt_tIteTXTiCYkiF4KBKlRyXYLi4Y3vyQdY",kty:"OKP"},jwt:"eyJhbGciOiJFZERTQSIsInR5cCI6InZjK2p3dCIsImtpZCI6ImxlYXJuYWJsZS1kZW1vIn0.eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvbnMvY3JlZGVudGlhbHMvdjIiLCJodHRwczovL3B1cmwuaW1zZ2xvYmFsLm9yZy9zcGVjL29iL3YzcDAvY29udGV4dC0zLjAuMy5qc29uIl0sInR5cGUiOlsiVmVyaWZpYWJsZUNyZWRlbnRpYWwiLCJPcGVuQmFkZ2VDcmVkZW50aWFsIl0sImlzc3VlciI6eyJpZCI6Imh0dHBzOi8vbGVhcm5hYmxlLmxvY2FsL2lzc3VlciIsInR5cGUiOlsiUHJvZmlsZSJdLCJuYW1lIjoiTGVhcm5BYmxlIGRlbW8ifSwidmFsaWRGcm9tIjoiMjAyNi0xMS0xNVQwMDowMDowMFoiLCJuYW1lIjoiQWNjZXNzaWJsZSBtZWRpYSwgZGVtbyBsZXNzb24iLCJjcmVkZW50aWFsU3ViamVjdCI6eyJ0eXBlIjpbIkFjaGlldmVtZW50U3ViamVjdCJdLCJuYW1lIjoiSGFuYSBCZWtlbGUiLCJpZGVudGlmaWVyIjoiaGFuYS1kZW1vLTIwMjYiLCJhY2hpZXZlbWVudCI6eyJpZCI6Imh0dHBzOi8vbGVhcm5hYmxlLmxvY2FsL2FjaGlldmVtZW50cy9hY2Nlc3NpYmxlLW1lZGlhLWRlbW8iLCJ0eXBlIjpbIkFjaGlldmVtZW50Il0sIm5hbWUiOiJBY2Nlc3NpYmxlIG1lZGlhLCBkZW1vIGxlc3NvbiIsImRlc2NyaXB0aW9uIjoiQ29tcGxldGVkIHRoZSBMZWFybkFibGUgZGVtbyBvbiBjYXB0aW9ucywgc2lnbiwgYXVkaW8gZGVzY3JpcHRpb24sIGFuZCB0aGUgb2ZmbGluZSBwYWNrLiJ9fX0.v-8f4fVY60MgLeFQY6uJv6gwqqBQdcJijKgEjRh_sxwvqfcMjaFOV1V3WDLrETBkIKTr5UeChmFH4OPP-ZAlCw"};function Yn(e){const n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",t=e.replace(/-/g,"+").replace(/_/g,"/").replace(/=+$/,""),r=new Uint8Array(Math.floor(t.length*3/4));let a=0,o=0,i=0;for(const s of t){const l=n.indexOf(s);if(l<0)return new Uint8Array;a=a<<6|l,o+=6,o>=8&&(o-=8,r[i]=a>>o&255,i+=1)}return r.subarray(0,i)}async function wt(e=xt.jwt,n=xt.publicKey){const[t,r,a]=e.split(".");if(!t||!r||!a)return!1;const o=await crypto.subtle.importKey("jwk",n,{name:"Ed25519"},!1,["verify"]),i=new TextEncoder().encode(`${t}.${r}`);return crypto.subtle.verify({name:"Ed25519"},o,Yn(a),i)}var P=Uint8Array,B=Uint16Array,$e=Int32Array,Oe=new P([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),He=new P([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),At=new P([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),Et=function(e,n){for(var t=new B(31),r=0;r<31;++r)t[r]=n+=1<<e[r-1];for(var a=new $e(t[30]),r=1;r<30;++r)for(var o=t[r];o<t[r+1];++o)a[o]=o-t[r]<<5|r;return{b:t,r:a}},St=Et(Oe,2),zn=St.b,Fe=St.r;zn[28]=258,Fe[258]=28;for(var Xn=Et(He,0),kt=Xn.r,We=new B(32768),w=0;w<32768;++w){var J=(w&43690)>>1|(w&21845)<<1;J=(J&52428)>>2|(J&13107)<<2,J=(J&61680)>>4|(J&3855)<<4,We[w]=((J&65280)>>8|(J&255)<<8)>>1}for(var me=(function(e,n,t){for(var r=e.length,a=0,o=new B(n);a<r;++a)e[a]&&++o[e[a]-1];var i=new B(n);for(a=1;a<n;++a)i[a]=i[a-1]+o[a-1]<<1;var s;if(t){s=new B(1<<n);var l=15-n;for(a=0;a<r;++a)if(e[a])for(var u=a<<4|e[a],c=n-e[a],d=i[e[a]-1]++<<c,m=d|(1<<c)-1;d<=m;++d)s[We[d]>>l]=u}else for(s=new B(r),a=0;a<r;++a)e[a]&&(s[a]=We[i[e[a]-1]++]>>15-e[a]);return s}),re=new P(288),w=0;w<144;++w)re[w]=8;for(var w=144;w<256;++w)re[w]=9;for(var w=256;w<280;++w)re[w]=7;for(var w=280;w<288;++w)re[w]=8;for(var Ee=new P(32),w=0;w<32;++w)Ee[w]=5;var Zn=me(re,9,0),Jn=me(Ee,5,0),Ct=function(e){return(e+7)/8|0},Lt=function(e,n,t){return(t==null||t>e.length)&&(t=e.length),new P(e.subarray(n,t))},_n=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],Se=function(e,n,t){var r=new Error(n||_n[e]);if(r.code=e,Error.captureStackTrace&&Error.captureStackTrace(r,Se),!t)throw r;return r},Z=function(e,n,t){t<<=n&7;var r=n/8|0;e[r]|=t,e[r+1]|=t>>8},be=function(e,n,t){t<<=n&7;var r=n/8|0;e[r]|=t,e[r+1]|=t>>8,e[r+2]|=t>>16},Ue=function(e,n){for(var t=[],r=0;r<e.length;++r)e[r]&&t.push({s:r,f:e[r]});var a=t.length,o=t.slice();if(!a)return{t:Mt,l:0};if(a==1){var i=new P(t[0].s+1);return i[t[0].s]=1,{t:i,l:1}}t.sort(function(N,D){return N.f-D.f}),t.push({s:-1,f:25001});var s=t[0],l=t[1],u=0,c=1,d=2;for(t[0]={s:-1,f:s.f+l.f,l:s,r:l};c!=a-1;)s=t[t[u].f<t[d].f?u++:d++],l=t[u!=c&&t[u].f<t[d].f?u++:d++],t[c++]={s:-1,f:s.f+l.f,l:s,r:l};for(var m=o[0].s,r=1;r<a;++r)o[r].s>m&&(m=o[r].s);var y=new B(m+1),f=Ge(t[c-1],y,0);if(f>n){var r=0,g=0,p=f-n,v=1<<p;for(o.sort(function(D,k){return y[k.s]-y[D.s]||D.f-k.f});r<a;++r){var S=o[r].s;if(y[S]>n)g+=v-(1<<f-y[S]),y[S]=n;else break}for(g>>=p;g>0;){var L=o[r].s;y[L]<n?g-=1<<n-y[L]++-1:++r}for(;r>=0&&g;--r){var A=o[r].s;y[A]==n&&(--y[A],++g)}f=n}return{t:new P(y),l:f}},Ge=function(e,n,t){return e.s==-1?Math.max(Ge(e.l,n,t+1),Ge(e.r,n,t+1)):n[e.s]=t},Tt=function(e){for(var n=e.length;n&&!e[--n];);for(var t=new B(++n),r=0,a=e[0],o=1,i=function(l){t[r++]=l},s=1;s<=n;++s)if(e[s]==a&&s!=n)++o;else{if(!a&&o>2){for(;o>138;o-=138)i(32754);o>2&&(i(o>10?o-11<<5|28690:o-3<<5|12305),o=0)}else if(o>3){for(i(a),--o;o>6;o-=6)i(8304);o>2&&(i(o-3<<5|8208),o=0)}for(;o--;)i(a);o=1,a=e[s]}return{c:t.subarray(0,r),n}},ge=function(e,n){for(var t=0,r=0;r<n.length;++r)t+=e[r]*n[r];return t},It=function(e,n,t){var r=t.length,a=Ct(n+2);e[a]=r&255,e[a+1]=r>>8,e[a+2]=e[a]^255,e[a+3]=e[a+1]^255;for(var o=0;o<r;++o)e[a+o+4]=t[o];return(a+4+r)*8},Nt=function(e,n,t,r,a,o,i,s,l,u,c){Z(n,c++,t),++a[256];for(var d=Ue(a,15),m=d.t,y=d.l,f=Ue(o,15),g=f.t,p=f.l,v=Tt(m),S=v.c,L=v.n,A=Tt(g),N=A.c,D=A.n,k=new B(19),h=0;h<S.length;++h)++k[S[h]&31];for(var h=0;h<N.length;++h)++k[N[h]&31];for(var b=Ue(k,7),C=b.t,te=b.l,$=19;$>4&&!C[At[$-1]];--$);var de=u+5<<3,U=ge(a,re)+ge(o,Ee)+i,G=ge(a,m)+ge(o,g)+i+14+3*$+ge(k,C)+2*k[16]+3*k[17]+7*k[18];if(l>=0&&de<=U&&de<=G)return It(n,c,e.subarray(l,l+u));var Y,M,V,ne;if(Z(n,c,1+(G<U)),c+=2,G<U){Y=me(m,y,0),M=m,V=me(g,p,0),ne=g;var mt=me(C,te,0);Z(n,c,L-257),Z(n,c+5,D-1),Z(n,c+10,$-4),c+=14;for(var h=0;h<$;++h)Z(n,c+3*h,C[At[h]]);c+=3*$;for(var z=[S,N],we=0;we<2;++we)for(var he=z[we],h=0;h<he.length;++h){var X=he[h]&31;Z(n,c,mt[X]),c+=C[X],X>15&&(Z(n,c,he[h]>>5&127),c+=he[h]>>12)}}else Y=Zn,M=re,V=Jn,ne=Ee;for(var h=0;h<s;++h){var R=r[h];if(R>255){var X=R>>18&31;be(n,c,Y[X+257]),c+=M[X+257],X>7&&(Z(n,c,R>>23&31),c+=Oe[X]);var fe=R&31;be(n,c,V[fe]),c+=ne[fe],fe>3&&(be(n,c,R>>5&8191),c+=He[fe])}else be(n,c,Y[R]),c+=M[R]}return be(n,c,Y[256]),c+M[256]},Qn=new $e([65540,131080,131088,131104,262176,1048704,1048832,2114560,2117632]),Mt=new P(0),er=function(e,n,t,r,a,o){var i=o.z||e.length,s=new P(r+i+5*(1+Math.ceil(i/7e3))+a),l=s.subarray(r,s.length-a),u=o.l,c=(o.r||0)&7;if(n){c&&(l[0]=o.r>>3);for(var d=Qn[n-1],m=d>>13,y=d&8191,f=(1<<t)-1,g=o.p||new B(32768),p=o.h||new B(f+1),v=Math.ceil(t/3),S=2*v,L=function(yt){return(e[yt]^e[yt+1]<<v^e[yt+2]<<S)&f},A=new $e(25e3),N=new B(288),D=new B(32),k=0,h=0,b=o.i||0,C=0,te=o.w||0,$=0;b+2<i;++b){var de=L(b),U=b&32767,G=p[de];if(g[U]=G,p[de]=U,te<=b){var Y=i-b;if((k>7e3||C>24576)&&(Y>423||!u)){c=Nt(e,l,0,A,N,D,h,C,$,b-$,c),C=k=h=0,$=b;for(var M=0;M<286;++M)N[M]=0;for(var M=0;M<30;++M)D[M]=0}var V=2,ne=0,mt=y,z=U-G&32767;if(Y>2&&de==L(b-z))for(var we=Math.min(m,Y)-1,he=Math.min(32767,b),X=Math.min(258,Y);z<=he&&--mt&&U!=G;){if(e[b+V]==e[b+V-z]){for(var R=0;R<X&&e[b+R]==e[b+R-z];++R);if(R>V){if(V=R,ne=z,R>we)break;for(var fe=Math.min(z,R-2),Hn=0,M=0;M<fe;++M){var bt=b-z+M&32767,Ya=g[bt],Fn=bt-Ya&32767;Fn>Hn&&(Hn=Fn,G=bt)}}}U=G,G=g[U],z+=U-G&32767}if(ne){A[C++]=268435456|Fe[V]<<18|kt[ne];var Wn=Fe[V]&31,Un=kt[ne]&31;h+=Oe[Wn]+He[Un],++N[257+Wn],++D[Un],te=b+V,++k}else A[C++]=e[b],++N[e[b]]}}for(b=Math.max(b,te);b<i;++b)A[C++]=e[b],++N[e[b]];c=Nt(e,l,u,A,N,D,h,C,$,b-$,c),u||(o.r=c&7|l[c/8|0]<<3,c-=7,o.h=p,o.p=g,o.i=b,o.w=te)}else{for(var b=o.w||0;b<i+u;b+=65535){var gt=b+65535;gt>=i&&(l[c/8|0]=u,gt=i),c=It(l,c+1,e.subarray(b,gt))}o.i=i}return Lt(s,0,r+Ct(c)+a)},tr=(function(){for(var e=new Int32Array(256),n=0;n<256;++n){for(var t=n,r=9;--r;)t=(t&1&&-306674912)^t>>>1;e[n]=t}return e})(),nr=function(){var e=-1;return{p:function(n){for(var t=e,r=0;r<n.length;++r)t=tr[t&255^n[r]]^t>>>8;e=t},d:function(){return~e}}},rr=function(e,n,t,r,a){if(!a&&(a={l:1},n.dictionary)){var o=n.dictionary.subarray(-32768),i=new P(o.length+e.length);i.set(o),i.set(e,o.length),e=i,a.w=o.length}return er(e,n.level==null?6:n.level,n.mem==null?a.l?Math.ceil(Math.max(8,Math.min(13,Math.log(e.length)))*1.5):20:12+n.mem,t,r,a)},Dt=function(e,n){var t={};for(var r in e)t[r]=e[r];for(var r in n)t[r]=n[r];return t},I=function(e,n,t){for(;t;++n)e[n]=t,t>>>=8};function ar(e,n){return rr(e,n||{},0,0)}var Rt=function(e,n,t,r){for(var a in e){var o=e[a],i=n+a,s=r;Array.isArray(o)&&(s=Dt(r,o[1]),o=o[0]),ArrayBuffer.isView(o)?t[i]=[o,s]:(t[i+="/"]=[new P(0),s],Rt(o,i,t,r))}},Pt=typeof TextEncoder<"u"&&new TextEncoder,or=typeof TextDecoder<"u"&&new TextDecoder,ir=0;try{or.decode(Mt,{stream:!0}),ir=1}catch{}function qt(e,n){var t;if(Pt)return Pt.encode(e);for(var r=e.length,a=new P(e.length+(e.length>>1)),o=0,i=function(u){a[o++]=u},t=0;t<r;++t){if(o+5>a.length){var s=new P(o+8+(r-t<<1));s.set(a),a=s}var l=e.charCodeAt(t);l<128||n?i(l):l<2048?(i(192|l>>6),i(128|l&63)):l>55295&&l<57344?(l=65536+(l&1047552)|e.charCodeAt(++t)&1023,i(240|l>>18),i(128|l>>12&63),i(128|l>>6&63),i(128|l&63)):(i(224|l>>12),i(128|l>>6&63),i(128|l&63))}return Lt(a,0,o)}var Ve=function(e){var n=0;if(e)for(var t in e){var r=e[t].length;r>65535&&Se(9),n+=r+4}return n},Bt=function(e,n,t,r,a,o,i,s){var l=r.length,u=t.extra,c=s&&s.length,d=Ve(u);I(e,n,i!=null?33639248:67324752),n+=4,i!=null&&(e[n++]=20,e[n++]=t.os),e[n]=20,n+=2,e[n++]=t.flag<<1|(o<0&&8),e[n++]=a&&8,e[n++]=t.compression&255,e[n++]=t.compression>>8;var m=new Date(t.mtime==null?Date.now():t.mtime),y=m.getFullYear()-1980;if((y<0||y>119)&&Se(10),I(e,n,y<<25|m.getMonth()+1<<21|m.getDate()<<16|m.getHours()<<11|m.getMinutes()<<5|m.getSeconds()>>1),n+=4,o!=-1&&(I(e,n,t.crc),I(e,n+4,o<0?-o-2:o),I(e,n+8,t.size)),I(e,n+12,l),I(e,n+14,d),n+=16,i!=null&&(I(e,n,c),I(e,n+6,t.attrs),I(e,n+10,i),n+=14),e.set(r,n),n+=l,d)for(var f in u){var g=u[f],p=g.length;I(e,n,+f),I(e,n+2,p),e.set(g,n+4),n+=4+p}return c&&(e.set(s,n),n+=c),n},sr=function(e,n,t,r,a){I(e,n,101010256),I(e,n+8,t),I(e,n+10,t),I(e,n+12,r),I(e,n+16,a)};function lr(e,n){n||(n={});var t={},r=[];Rt(e,"",t,n);var a=0,o=0;for(var i in t){var s=t[i],l=s[0],u=s[1],c=u.level==0?0:8,d=qt(i),m=d.length,y=u.comment,f=y&&qt(y),g=f&&f.length,p=Ve(u.extra);m>65535&&Se(11);var v=c?ar(l,u):l,S=v.length,L=nr();L.p(l),r.push(Dt(u,{size:l.length,crc:L.d(),c:v,f:d,m:f,u:m!=i.length||f&&y.length!=g,o:a,compression:c})),a+=30+m+p+S,o+=76+2*(m+p)+(g||0)+S}for(var A=new P(o+22),N=a,D=o-a,k=0;k<r.length;++k){var d=r[k];Bt(A,d.o,d,d.f,d.u,d.c.length);var h=30+d.f.length+Ve(d.extra);A.set(d.c,d.o+h),Bt(A,a,d,d.f,d.u,d.c.length,d.o,d.m),a+=16+h+(d.m?d.m.length:0)}return sr(A,a,r.length,D,N),A}const cr=`# Ethiopic-G1
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
`,ur=` A1B'K2L@CIF/MSP"E3H9O6R^DJG>NTQ,*5<-U8V.%[$+X!&;:4\\0Z7(_?W]#Y)=`,dr="JABCDEFGHI",hr={".":"4",",":"1","?":"8","!":"6","'":"'","-":"-",":":"3",";":"2"};function fr(e){return e<0||e>63?"?":ur[e]??"?"}function pr(e){let n=0;for(const t of e){const r=Number(t);r>=1&&r<=6&&(n|=1<<r-1)}return n}function mr(e){const n=new Map;for(const t of e.split(/\r?\n/)){const r=/^(?:letter|punctuation)\s+\\x([0-9A-Fa-f]+)\s+(\S+)/.exec(t.trim());if(!r)continue;const a=Number.parseInt(r[1],16);n.set(a,r[2].split("-").map(pr))}return n}const br=mr(cr);function gr(e){let n="",t=!1;for(const r of e){const a=r.codePointAt(0)??0,o=br.get(a);if(o){t=!1,n+=o.map(fr).join("");continue}if(r===`
`){t=!1,n+=`
`;continue}if(r===" "){t=!1,n+=" ";continue}if(/[0-9]/.test(r)){t||(n+="#",t=!0),n+=dr[Number(r)];continue}if(t=!1,/[a-z]/.test(r)){n+=r.toUpperCase();continue}if(/[A-Z]/.test(r)){n+=`,${r}`;continue}n+=hr[r]??"?"}return n}function je(e,n=40){const t=gr(e),r=[];for(const a of t.split(`
`)){const o=a.split(" ");let i="";for(const s of o){if(!i){i=s;continue}i.length+1+s.length<=n?i+=` ${s}`:(r.push(i),i=s)}i&&r.push(i)}return`${r.join(`
`)}
`}const yr='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" role="img"><title>A navy phone on a paper background, with an English and Amharic caption under the screen.</title><rect width="640" height="480" fill="#f2f0ea"/><rect x="230" y="40" width="180" height="320" rx="28" fill="#ffffff" stroke="#1b3048" stroke-width="8"/><rect x="254" y="72" width="132" height="210" rx="6" fill="#f2f0ea" stroke="#1b3048" stroke-width="3"/><rect x="120" y="390" width="400" height="36" fill="#111111"/><rect x="140" y="400" width="160" height="8" fill="#ffee00"/></svg>',vr="A navy phone on a paper background, with an English and Amharic caption under the screen.";function xr(e,n,t,r){const a=e.split(`
`).filter(Boolean),o=n.split(`
`).filter(Boolean),i=a.map((s,l)=>`<section><h2>${s}</h2>${o[l]?`<p lang="am">${o[l]}</p>`:""}</section>`).join("");return`<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><title>LearnAble light lesson</title></head><body><main><h1>LearnAble light lesson</h1><p>Sound, text, and this page. The video is not in the pack.</p><figure><img src="lesson-figure.svg" alt="${vr}"></figure><h2>English</h2>${r?'<audio controls src="lesson-en.wav"></audio>':"<p>The narration file was not on this host.</p>"}<h2 lang="am">አማርኛ</h2>${r?'<audio controls src="lesson-am.wav"></audio>':""}${i}${t?`<h2>Audio description</h2><p>${t}</p>`:""}</main></body></html>`}async function $t(e){if(!e)return null;try{const n=await fetch(e);return n.ok?new Uint8Array(await n.arrayBuffer()):null}catch{return null}}async function wr(e){const n=await $t(e.audioEn),t=await $t(e.audioAm),r={"index.html":new TextEncoder().encode(xr(e.english,e.amharic,e.descriptions||"",!!(n||t))),"lesson-figure.svg":new TextEncoder().encode(yr),"transcript-en.brf":new TextEncoder().encode(je(e.english)),"transcript-am.brf":new TextEncoder().encode(je(e.amharic))};return n&&(r["lesson-en.wav"]=n),t&&(r["lesson-am.wav"]=t),{bytes:lr(r),audio:!!(n||t)}}function _(e,n,t){const r=new Blob([Uint8Array.from(e)],{type:t}),a=URL.createObjectURL(r),o=document.createElement("a");o.href=a,o.download=n,document.body.append(o),o.click(),o.remove(),URL.revokeObjectURL(a)}async function Ar(e,n,t){var r;try{const o=await import(H("/learnable/espeak/speak.js")),i=o.speak||((r=o.default)==null?void 0:r.speak);return typeof i!="function"?!1:(await i(e,n,t),!0)}catch{return!1}}let ke=0,Ke=!1,le=null,Ot=!1,Ht=!1;function Ft(){var e;return typeof window<"u"&&"speechSynthesis"in window&&typeof((e=window.speechSynthesis)==null?void 0:e.speak)=="function"}function Wt(){var e;Ke=!0;try{(e=window.speechSynthesis)==null||e.resume()}catch{}}function Er(){if(!Ke||!le)return;const e=le;le=null,Vt(e.text,e.lang,e.hooks)}function Ut(e){return e.toLowerCase().slice(0,2)}function Sr(e){var t,r;return(((r=(t=window.speechSynthesis)==null?void 0:t.getVoices)==null?void 0:r.call(t))??[]).find(a=>a.lang.toLowerCase().startsWith(Ut(e)))}function Gt(e){if(Ot)return;Ot=!0;const n=document.getElementById("learnable-reader-live");if(!n)return;const t=Ut(e)==="am"?"Amharic":e;n.textContent=`No ${t} voice in this browser. The optional eSpeak file is not on this site, so this line stays on screen.`}function kr(e,n,t){var r,a;e!==ke||t?(r=n.oncancel)==null||r.call(n):(a=n.onend)==null||a.call(n)}async function Vt(e,n,t){var d,m,y,f,g,p;const r=++ke,a=Math.min(2,Math.max(.5,t.rate??1)),o=Math.min(2,Math.max(0,t.pitch??1));try{(d=window.speechSynthesis)==null||d.cancel()}catch{}const i=((y=(m=window.speechSynthesis)==null?void 0:m.getVoices)==null?void 0:y.call(m))??[],s=Sr(n);if(!s&&i.length>0){const v=await Ar(e,n,a);if(r!==ke){(f=t.oncancel)==null||f.call(t);return}if(v){(g=t.onend)==null||g.call(t);return}Gt(n)}if(!Ft()){s||Gt(n),(p=t.onend)==null||p.call(t);return}const l=new SpeechSynthesisUtterance(e);l.lang=n.startsWith("am")?"am":n,l.rate=a,l.pitch=o;try{s&&(l.voice=s)}catch{}let u=!1;const c=v=>{u||(u=!0,kr(r,t,v))};l.onend=()=>c(!1),l.onerror=()=>c(!0),window.speechSynthesis.speak(l)}function ye(e,n,t=1,r={}){var i,s;const a=e.replace(/\s+/g," ").trim();if(!a)return;const o={text:a,lang:n,hooks:{...r,rate:r.rate??t}};if(!Ht&&Ft()&&(Ht=!0,(s=(i=window.speechSynthesis).addEventListener)==null||s.call(i,"voiceschanged",()=>{window.speechSynthesis.getVoices()}),window.speechSynthesis.getVoices()),!Ke){le=o;return}le=null,Vt(o.text,o.lang,o.hooks)}function Ce(){var e;ke+=1,le=null;try{(e=window.speechSynthesis)==null||e.cancel()}catch{}}function jt(e){const n=/^(?:(\d+):)?(\d{2}):(\d{2})\.(\d{3})$/.exec(e.trim());if(!n)throw new Error(`Bad WebVTT timestamp: ${e}`);const t=Number(n[1]??0),r=Number(n[2]),a=Number(n[3]),o=Number(n[4]);return t*3600+r*60+a+o/1e3}function Cr(e){var a;const n=e.replace(/^\uFEFF/,"").split(/\r?\n/),t=[];let r=0;if((a=n[0])!=null&&a.startsWith("WEBVTT"))for(r=1;r<n.length&&n[r].trim()!=="";)r+=1;for(;r<n.length;){if(n[r].trim()===""){r+=1;continue}let o=n[r];!o.includes("-->")&&r+1<n.length&&(r+=1,o=n[r]);const i=o.split("-->");if(i.length<2){r+=1;continue}const s=jt(i[0]),l=i[1].trim().split(/\s+/)[0],u=jt(l);r+=1;const c=[];for(;r<n.length&&n[r].trim()!=="";)c.push(n[r]),r+=1;t.push({start:s,end:u,text:c.join(`
`)})}return t}function Kt(e){const n=Math.max(0,Math.round(e*1e3)),t=Math.floor(n/36e5),r=Math.floor(n%36e5/6e4),a=Math.floor(n%6e4/1e3),o=n%1e3;return`${String(t).padStart(2,"0")}:${String(r).padStart(2,"0")}:${String(a).padStart(2,"0")}.${String(o).padStart(3,"0")}`}function Yt(e){return`WEBVTT

${e.map(t=>`${Kt(t.start)} --> ${Kt(t.end)}
${t.text}`).join(`

`)}
`}function zt(e,n){const t=e.find(a=>n>=a.start&&n<a.end);if(t)return t;const r=e[e.length-1];if(r&&n>=r.start&&n<=r.end+.05)return r}const Ye={en:{larger:"Larger text",contrast:"High contrast",stop:"Stop motion",read:"Read this page",stopRead:"Stop reading",language:"Language",images:"Image check",skip:"Skip to content",menu:"Menu",pipeline:"Transcript",job:"Job card",session:"Session"},am:{larger:"ትልቅ ጽሑፍ",contrast:"ከፍተኛ ንጽጽር",stop:"እንቅስቃሴ አቁም",read:"ይህን ገጽ አንብብ",stopRead:"ማንበብ አቁም",language:"ቋንቋ",images:"የምስል ምርመራ",skip:"ወደ ዋናው ይዘት ዝለል",menu:"ምናሌ",pipeline:"ጽሑፍ",job:"የስራ ካርድ",session:"ክፍለ ጊዜ"}},Lr={"VA-Content-Banner.png":"A wide banner for the virtual assistant lesson.","lesson-figure.svg":"A navy phone on a paper background, with an English and Amharic caption under the screen.","poster.png":"A still frame from the lesson: a phone with a caption bar.","esl-placeholder.png":"A placeholder card where an Ethiopian Sign Language clip can be added."},Xt="Description not yet provided",Zt=Lr;function Jt(e){var t;const n=e.currentSrc||e.getAttribute("src")||"";return decodeURIComponent(((t=n.split("/").pop())==null?void 0:t.split("?")[0])||"")}function Tr(e){if(e.getAttribute("aria-hidden")==="true"||e.closest("[aria-hidden='true']"))return!0;const n=e.getAttribute("role");return n==="presentation"||n==="none"||e.getAttribute("alt")===""}function _t(e,n){if(n===Xt||n==="Needs a description")return!0;const t=Jt(e),r=t.replace(/\.[^.]+$/,"");return n===t||n===r}function ze(e){var r;if(Tr(e))return null;const n=((r=e.getAttribute("alt"))==null?void 0:r.trim())??"";if(n&&!_t(e,n))return n;const t=Jt(e);return Zt[t]?Zt[t]:Xt}function Ir(){document.querySelectorAll("img").forEach(e=>{var a;if(e.closest("learnable-player, learnable-toolbar"))return;const n=ze(e);if(!n)return;const t=((a=e.getAttribute("alt"))==null?void 0:a.trim())??"";(!t||_t(e,t))&&(e.alt=n),!e.closest("a, button, [role='link'], [role='button']")&&e.tabIndex<0&&(e.tabIndex=0,e.dataset.learnableImage="true")})}const Qt={white:{label:"White on black",fg:"#ffffff",bg:"#111111"},yellow:{label:"Yellow on black",fg:"#ffee00",bg:"#111111"},black:{label:"Black on white",fg:"#172033",bg:"#f2f0ea"},cyan:{label:"Cyan on black",fg:"#00ffff",bg:"#111111"}},Xe="learnable-widget",en=()=>({toolbar:!0,signWindow:!0,audioDescription:!0,offlinePack:!1,braille:!1,taggedDocs:!1}),Ze=()=>({lang:"en",uiLang:"en",largeText:!1,highContrast:!1,stopMotion:!1,captionScale:1.15,captionPreset:"white",contrastMode:"off",contrastLevel:7,readRate:1,readPitch:1,readVerbosity:"sentences",haptics:!1,voice:!0,voiceChosen:!1,audioDescription:!0,keyboard:!0,keys:{heading:"h",landmark:"l",help:"?",voice:"Alt+Shift+S"},toolbarCorner:"bl",toolbarCollapsed:!1,toolbarVisited:!1});let tn=en(),j=Ze(),nn="paper",Le=!0;function Te(e){return Le===!1?!1:Le===!0?!0:Le[e]!==!1}function Ie(e,n){if(typeof e!="string")return n;const t=e.trim();return!t||t.length>32?n:t}function rn(){try{return window.matchMedia("(prefers-reduced-motion: reduce)").matches}catch{return!1}}function an(){const e=Ze();e.stopMotion=rn();try{const n=localStorage.getItem(Xe);if(!n)return e;const t=JSON.parse(n),r=t.lang==="am"?"am":t.lang==="en"?"en":e.lang,a=t.uiLang==="am"?"am":t.uiLang==="en"?"en":e.uiLang,o=t.contrastMode==="bw"||t.contrastMode==="yb"?t.contrastMode:"off",i=Math.min(10,Math.max(1,Number(t.contrastLevel)||e.contrastLevel)),s={...e.keys,...t.keys||{}};return{...e,...t,lang:r,uiLang:a,contrastMode:o,contrastLevel:i,voice:typeof t.voice=="boolean"?t.voice:e.voice,voiceChosen:t.voiceChosen===!0,audioDescription:typeof t.audioDescription=="boolean"?t.audioDescription:e.audioDescription,keyboard:t.keyboard!==!1,keys:{heading:Ie(s.heading,e.keys.heading),landmark:Ie(s.landmark,e.keys.landmark),help:Ie(s.help,e.keys.help),voice:Ie(s.voice,e.keys.voice)},toolbarCorner:t.toolbarCorner==="tl"||t.toolbarCorner==="tr"||t.toolbarCorner==="br"||t.toolbarCorner==="bl"?t.toolbarCorner:"bl",toolbarCollapsed:t.toolbarCollapsed===!0,toolbarVisited:t.toolbarVisited===!0}}catch{return e}}function x(){return{...j}}function Ne(){return{...tn}}function Nr(){return nn}function Je(e){j={...e},localStorage.setItem(Xe,JSON.stringify(j)),window.dispatchEvent(new CustomEvent("learnable-settings",{detail:x()}))}function E(e){const n={...x(),...e};return Je(n),x()}function Mr(e={}){tn={...en(),...e.features},e.theme&&(nn=e.theme),e.enhance!==void 0&&(Le=e.enhance);const n=an();j={...n,lang:e.lang??n.lang,uiLang:e.uiLang??n.uiLang},n.voiceChosen!==!0&&e.voice&&(j.voice=e.voice==="on",e.voice==="off"&&(j.audioDescription=!1)),Je(j)}function Dr(){return localStorage.removeItem(Xe),j=Ze(),j.stopMotion=rn(),Je(j),x()}function on(e,n,t){return e.hasAttribute(n)?e.getAttribute(n)!=="false":t}function Rr(){if(document.documentElement.dataset.learnableProfile==="savanna")return!0;const e=location.pathname;return/savanna|with-learnable|homepage-v1|concept-with|index-learnable/.test(e)}function Pr(e){return[...document.querySelectorAll(e)].filter(n=>!n.closest("learnable-player, learnable-toolbar"))}function qr(e,n,t){const r=e.indexOf(n);if(r<0)return;e[(r+t+e.length)%e.length].focus()}function Br(e){const n=e.target;if(!(n instanceof HTMLElement)||n.closest("learnable-player, learnable-toolbar, input, textarea, select"))return;n.classList.contains("hamburger")&&(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),n.click(),n.setAttribute("aria-expanded",document.body.classList.contains("sidebar-collapsed")?"false":"true")),e.key==="Escape"&&(document.querySelectorAll(".collapse.show").forEach(r=>{const a=document.querySelector(`[data-bs-target="#${r.id}"]`);(a==null?void 0:a.getAttribute("aria-expanded"))==="true"&&a.click()}),document.querySelectorAll(".dropdown-menu.show").forEach(r=>r.classList.remove("show")));const t=[".homepage-nav .nav-link","button[data-section-index]",".accordion-button",".dropdown-menu.show .dropdown-item"];if(!(e.key!=="ArrowRight"&&e.key!=="ArrowLeft"&&e.key!=="ArrowDown"&&e.key!=="ArrowUp"))for(const r of t){const a=Pr(r);if(a.includes(n)){e.preventDefault(),qr(a,n,e.key==="ArrowRight"||e.key==="ArrowDown"?1:-1);break}}}function $r(){const e=document.querySelector(".header");e&&!document.querySelector("header, [role='banner']")&&(e.setAttribute("role","banner"),e.setAttribute("data-learnable-repair","landmark"));const n=document.getElementById("sidebar");n&&!document.querySelector("nav, [role='navigation']")&&(n.setAttribute("role","navigation"),n.getAttribute("aria-label")||n.setAttribute("aria-label","Sidebar"),n.setAttribute("data-learnable-repair","landmark")),document.querySelectorAll(".hamburger").forEach(t=>{t.dataset.learnableKey!=="true"&&(t.dataset.learnableKey="true",t.tabIndex=0,t.setAttribute("role","button"),t.setAttribute("aria-label",Ye[x().uiLang].menu),t.setAttribute("aria-expanded",String(!document.body.classList.contains("sidebar-collapsed"))),t.setAttribute("data-learnable-repair","aria"))}),document.documentElement.dataset.learnableSavanna!=="true"&&(document.documentElement.dataset.learnableSavanna="true",document.addEventListener("keydown",Br))}const q="data-learnable-repair";function Or(e){var i,s,l,u,c;const n=(i=e.getAttribute("aria-label"))==null?void 0:i.trim();if(n)return n;const t=e.getAttribute("aria-labelledby");if(t){const d=t.split(/\s+/).map(m=>{var y;return((y=document.getElementById(m))==null?void 0:y.textContent)||""}).join(" ").replace(/\s+/g," ").trim();if(d)return d}const r=((s=e.textContent)==null?void 0:s.replace(/\s+/g," ").trim())||"";if(r)return r;const a=(u=(l=e.querySelector("img[alt]"))==null?void 0:l.getAttribute("alt"))==null?void 0:u.trim();if(a)return a;const o=(c=e.getAttribute("title"))==null?void 0:c.trim();return o||""}function K(e){return!!e.closest("learnable-player, learnable-toolbar, .learnable-gateway")}function _e(e){return/[\p{L}\p{N}]/u.test(e)}function Hr(e){const n=[],t=document.createTreeWalker(e,NodeFilter.SHOW_TEXT);for(;t.nextNode();){const r=t.currentNode.parentElement;if(!r)continue;const a=getComputedStyle(r);a.display==="none"||a.visibility==="hidden"||n.push(t.currentNode.textContent||"")}return n.join(" ").replace(/\s+/g," ").trim()}function sn(){document.querySelectorAll("a, button, [role='button']").forEach(e=>{var s,l,u;if(K(e)||e.getAttribute("aria-label")||e.getAttribute("aria-labelledby"))return;const n=((l=(s=e.querySelector("img[alt]"))==null?void 0:s.getAttribute("alt"))==null?void 0:l.trim())||"";if(_e(Hr(e))||_e(n))return;const t=(u=e.getAttribute("title"))==null?void 0:u.trim(),r=e.getAttribute("href")||"",a=r==="/"||r==="#/"||/(^|\/)home\/?$/.test(r),i=/cite_|#cite|reference/i.test(r)?"Back to reference":a?"Home":e.tagName==="A"?"Link":"Button";e.setAttribute("aria-label",(t&&_e(t)?t:"")||i),e.setAttribute(q,"name")}),document.querySelectorAll("input, select, textarea").forEach(e=>{var a,o,i;if(K(e)||e.getAttribute("type")==="hidden"||e.getAttribute("aria-label")||e.closest("label"))return;const n=e.getAttribute("id");if(n&&document.querySelector(`label[for="${CSS.escape(n)}"]`))return;const t=(a=e.getAttribute("placeholder"))==null?void 0:a.trim(),r=(i=(o=e.previousElementSibling)==null?void 0:o.textContent)==null?void 0:i.replace(/\s+/g," ").trim();e.setAttribute("aria-label",t||r||e.getAttribute("name")||"Input"),e.setAttribute(q,"label")})}function ln(){document.querySelectorAll("img").forEach(e=>{if(K(e)||e.hasAttribute("alt"))return;if(!!e.closest("[aria-hidden='true']")||e.className.toString().includes("icon")||e.width>0&&e.width<8)e.alt="",e.setAttribute("role","presentation");else{e.alt="Description not yet provided";const t=document.createElement("span");t.className="learnable-alt-note",t.textContent="Description not yet provided",e.after(t)}e.setAttribute(q,"alt")})}function cn(){document.querySelectorAll("[aria-expanded]").forEach(e=>{if(K(e))return;const n=e.getAttribute("role"),t=e.tagName;n||t==="BUTTON"||t==="A"||t==="SUMMARY"||(e.setAttribute("role","button"),e.hasAttribute("tabindex")||e.setAttribute("tabindex","0"),e.setAttribute(q,"aria"))}),document.querySelectorAll("[role='progressbar']").forEach(e=>{var t,r,a;if(K(e)||Or(e))return;const n=(a=(r=(t=e.closest("div"))==null?void 0:t.parentElement)==null?void 0:r.textContent)==null?void 0:a.replace(/\s+/g," ").trim().slice(0,80);e.setAttribute("aria-label",n||"Progress"),e.setAttribute(q,"aria")}),document.querySelectorAll("[aria-hidden='true']").forEach(e=>{if(K(e))return;const n=e instanceof HTMLElement?[e]:[],t=e.querySelectorAll("a, button, input, select, textarea, [tabindex]");[...n,...t].forEach(r=>{r.tabIndex>=0&&(r.tabIndex=-1),r.setAttribute(q,"aria")})}),document.querySelectorAll("span[aria-label], div[aria-label]").forEach(e=>{K(e)||e.getAttribute("role")||(e.setAttribute("role","note"),e.setAttribute(q,"aria"))})}function un(){document.querySelectorAll("ul, ol").forEach(e=>{K(e)||[...e.children].forEach(n=>{if(n.tagName==="LI"||n.tagName==="SCRIPT"||n.tagName==="TEMPLATE")return;const t=document.createElement("li");n.replaceWith(t),t.append(n),t.setAttribute(q,"list")})})}function Qe(e){const n=e/255;return n<=.03928?n/12.92:((n+.055)/1.055)**2.4}function Me(e){return .2126*Qe(e[0])+.7152*Qe(e[1])+.0722*Qe(e[2])}function ae(e,n){const t=Math.max(Me(e),Me(n)),r=Math.min(Me(e),Me(n));return(t+.05)/(r+.05)}function dn(e){const n=e.match(/rgba?\(([^)]+)\)/);if(!n)return null;const t=n[1].split(",").map(r=>Number.parseFloat(r.trim()));return t.length<3||t.some(r=>Number.isNaN(r))?null:[t[0],t[1],t[2],t[3]??1]}function Fr(e,n){const t=e[3];return[e[0]*t+n[0]*(1-t),e[1]*t+n[1]*(1-t),e[2]*t+n[2]*(1-t),1]}function Wr(e){const n=[];let t=e;for(;t;){const a=dn(getComputedStyle(t).backgroundColor);if(a&&a[3]>0&&n.push(a),a&&a[3]>=1)break;t=t.parentElement}if(n.length===0)return[255,255,255,1];let r=n[n.length-1];for(let a=n.length-2;a>=0;a-=1)r=Fr(n[a],r);return r}function et(e,n,t){return[Math.round(e[0]+(n[0]-e[0])*t),Math.round(e[1]+(n[1]-e[1])*t),Math.round(e[2]+(n[2]-e[2])*t),1]}function Ur(e){const n=getComputedStyle(e),t=Number.parseFloat(n.fontSize),r=Number.parseInt(n.fontWeight,10)||400;return t>=24||t>=18.67&&r>=700?3:4.5}function Gr(){document.querySelectorAll("[data-learnable-repair='contrast']").forEach(e=>{e.style.removeProperty("color"),e.removeAttribute(q)})}function hn(){document.documentElement.dataset.learnableContrast!=="on"&&document.querySelectorAll("a, button, span, p, h1, h2, h3, h4, h5, h6, li, label, div, td, th, code, small, strong, b, em, i, u, abbr, acronym, font, cite, sup, sub").forEach(e=>{if(K(e)||e.getAttribute(q)==="contrast"||![...e.childNodes].some(l=>{var u;return l.nodeType===Node.TEXT_NODE&&((u=l.textContent)==null?void 0:u.trim())})||e.getClientRects().length===0)return;const t=dn(getComputedStyle(e).color);if(!t)return;const r=Wr(e),a=Ur(e);if(ae(t,r)>=a)return;const o=a+.45;let i=t,s=2;for(const l of[[0,0,0],[255,255,255]]){let u=0,c=1;for(let y=0;y<10;y+=1){const f=(u+c)/2;ae(et(t,l,f),r)>=o?c=f:u=f}let d=c,m=et(t,l,d);for(;ae(m,r)<o&&d<1;)d=Math.min(1,d+.08),m=et(t,l,d);ae(m,r)>=o&&d<s&&(i=m,s=d)}if(ae(i,r)<o){const l=[0,0,0,1],u=[255,255,255,1];i=ae(l,r)>=ae(u,r)?l:u}e.style.setProperty("color",`rgb(${i[0]}, ${i[1]}, ${i[2]})`,"important"),e.tagName==="A"&&e.style.setProperty("text-decoration","underline","important"),e.setAttribute(q,"contrast")})}function fn(){var t;const e=[...document.querySelectorAll("h1, h2, h3, h4, h5, h6")].filter(r=>!K(r));let n=0;for(const r of e){const a=Number(r.tagName.slice(1));!((t=r.textContent)!=null&&t.trim())&&!r.getAttribute("aria-label")&&(r.setAttribute("aria-label","Heading"),r.setAttribute(q,"outline"));const o=n===0?1:Math.min(a,n+1);a>o?(r.setAttribute("aria-level",String(o)),r.setAttribute(q,"outline"),n=o):n=a}}function pn(){var o,i,s;const e=document.documentElement;if(e.lang||e.getAttribute("xml:lang"))return;const n=((o=document.body)==null?void 0:o.getAttribute("lang"))||((i=document.body)==null?void 0:i.getAttribute("xml:lang"))||"",t=document.querySelector('meta[http-equiv="content-language" i], meta[name="language" i], meta[property="og:locale" i]'),r=(t==null?void 0:t.getAttribute("content"))||"",a=(s=(n||r).split(/[,;]/)[0])==null?void 0:s.trim().replace("_","-");a&&(e.lang=a,e.dataset.learnableLangAdded="true")}function mn(){document.documentElement.dataset.learnableLinkCue="on"}function Vr(){document.querySelectorAll("[data-learnable-repair]").forEach(n=>{const t=n.getAttribute(q);(t==="name"||t==="label")&&n.removeAttribute("aria-label"),(t==="aria"||t==="landmark")&&n.removeAttribute("role"),t==="outline"&&(n.removeAttribute("aria-level"),n.getAttribute("aria-label")==="Heading"&&n.removeAttribute("aria-label")),t==="alt"&&n.removeAttribute("alt"),t==="contrast"&&(n.style.removeProperty("color"),n.style.removeProperty("text-decoration")),n.removeAttribute(q)}),document.querySelectorAll(".learnable-skip, .learnable-alt-note, #learnable-gateway").forEach(n=>n.remove());const e=document.documentElement;e.dataset.learnableLangAdded==="true"&&(e.removeAttribute("lang"),delete e.dataset.learnableLangAdded),delete e.dataset.learnableLinkCue}function bn(){var e;if(document.readyState!=="complete"&&document.documentElement.dataset.learnableRepairLoad!=="true"&&(document.documentElement.dataset.learnableRepairLoad="true",window.addEventListener("load",()=>bn(),{once:!0})),(e=window.matchMedia)!=null&&e.call(window,"(forced-colors: active)").matches){pn(),ln(),sn(),cn(),un(),fn(),mn();return}pn(),ln(),sn(),cn(),un(),fn(),mn(),hn()}const jr=["captions-en","captions-am","sign","describe","audio-en","audio-am","offline","braille","docs"];function Kr(e,n){for(const r of jr){const a=e.getAttribute(`data-learnable-${r}`);a!==null&&n.setAttribute(r,a)}const t=e.getAttribute("src");t&&!n.getAttribute("src")&&n.setAttribute("src",t)}function gn(e){if(e.dataset.learnableUpgraded==="true"||e.closest("learnable-player"))return;e.dataset.learnableUpgraded="true";const n=document.createElement("learnable-player");Kr(e,n),n.hasAttribute("offline")||n.setAttribute("offline",""),n.hasAttribute("braille")||n.setAttribute("braille",""),n.hasAttribute("docs")||n.setAttribute("docs",""),n.hasAttribute("describe")||n.setAttribute("describe","/media/descriptions.vtt"),e.slot="media",e.replaceWith(n),n.append(e)}function Yr(){Te("media")&&(document.querySelectorAll("video, audio").forEach(e=>{e instanceof HTMLElement&&gn(e)}),document.querySelectorAll("iframe").forEach(e=>{const n=e.getAttribute("src")||"";/youtube\.com|youtu\.be|player\.vimeo\.com|vimeo\.com/.test(n)&&e instanceof HTMLElement&&gn(e)}))}function ve(e){e.setAttribute("data-learnable-repair","landmark")}function tt(e,n){return e.id||(e.id=n),e.hasAttribute("tabindex")||(e.tabIndex=-1),`#${e.id}`}function zr(){const e=document.querySelector("main, [role='main']");if(e)return tt(e,"learnable-main");const n=document.querySelector("#main, #content, [role='main']");if(n)return tt(n,n.id||"learnable-main");const t=document.querySelector("h1, h2");return t?tt(t,"learnable-top"):"#learnable-main"}function Xr(){if(!Te("skip")||document.querySelector("a.learnable-skip, a[href='#content'], a[href='#main'], a[href='#learnable-main']"))return;const e=document.createElement("a");e.className="learnable-skip",e.href=zr(),e.textContent=Ye[x().uiLang].skip,document.body.prepend(e)}function De(e){const n=document.querySelector(e);return n&&!n.closest("learnable-player, learnable-toolbar")?n:null}function Zr(){if(Te("landmarks")){if(!document.querySelector("header, [role='banner']")){const e=De("#header, #banner, .site-header, .page-header, .header");e&&(e.setAttribute("role","banner"),ve(e))}if(!document.querySelector("nav, [role='navigation']")){const e=De("#nav, #navigation, #menu, .site-nav, .nav, .navbar, .menu");e&&(e.setAttribute("role","navigation"),e.getAttribute("aria-label")||e.setAttribute("aria-label","Site"),ve(e))}if(!document.querySelector("main, [role='main']")){const e=De("#main, #content, article, [role='main']");if(e&&e.tagName!=="MAIN"&&e.tagName!=="ARTICLE")e.setAttribute("role","main"),ve(e);else if(!e){const n=document.querySelector("h1"),t=n==null?void 0:n.parentElement;t&&t!==document.body&&t!==document.documentElement&&(t.setAttribute("role","main"),ve(t))}}if(!document.querySelector("footer, [role='contentinfo']")){const e=De("#footer, .site-footer, .footer");e&&(e.setAttribute("role","contentinfo"),ve(e))}}}function Jr(){return[...document.querySelectorAll("img")].filter(e=>{var n;return!e.hasAttribute("alt")||e.getAttribute("alt")===((n=e.getAttribute("src"))==null?void 0:n.split("/").pop())})}function nt(){const e=Jr();if(e.length===0)return"Every image on this page has a text alternative.";const n=e.slice(0,8).map(t=>t.currentSrc||t.getAttribute("src")||"image");return`${e.length} image${e.length===1?"":"s"} need a description. Nothing was sent off this page. ${n.join(" ")}`}function _r(){var a,o,i;if(document.getElementById("learnable-gateway"))return;const e=document.querySelector("main")||document.body,n=vt[0],t=document.createElement("section");t.id="learnable-gateway",t.className="learnable-gateway",t.setAttribute("aria-label","LearnAble lesson tools");const r=Ae.chat.map(s=>`<li>${s.speaker}: ${s.text}</li>`).join("");t.innerHTML=`
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
  `,e.append(t),t.querySelectorAll("[data-vtt]").forEach(s=>{s.addEventListener("click",()=>{const l=s.dataset.vtt==="am",u=Ae.segments.map(d=>({start:d.start,end:d.end,text:l?d.am:d.en}));_(new TextEncoder().encode(Yt(u)),l?"captions-am.vtt":"captions-en.vtt","text/vtt");const c=t.querySelector("[data-pipeline-note]");c&&(c.textContent=l?"Amharic captions downloaded from the sample lesson.":"English captions downloaded from the sample lesson.")})}),(a=t.querySelector("[data-pipeline-file]"))==null||a.addEventListener("change",()=>{var u,c;const s=(c=(u=t.querySelector("[data-pipeline-file]"))==null?void 0:u.files)==null?void 0:c[0],l=t.querySelector("[data-pipeline-note]");!s||!l||s.text().then(d=>{const m=Ae.segments.find(y=>d.includes(y.en));l.textContent=m?`Sample translation: ${m.am}`:"No translation service is running, and this text is not in the sample lesson."})}),(o=t.querySelector("[data-job]"))==null||o.addEventListener("click",()=>{var s;ye(((s=t.querySelector("[data-job-summary]"))==null?void 0:s.textContent)||"","en")}),(i=t.querySelector("[data-badge]"))==null||i.addEventListener("click",()=>{const s=t.querySelector("[data-cert]");wt().then(l=>{s&&(s.textContent=l?"The certificate proof matches the published public key.":"The certificate proof does not match.")})})}function Qr(){if(Yr(),Xr(),Zr(),Rr()&&$r(),_r(),!document.getElementById("learnable-reader-live")){const e=document.createElement("p");e.id="learnable-reader-live",e.setAttribute("role","status"),document.body.append(e)}bn(),Ir()}function ea(e){var t;return(t=document.querySelector("script[src*='learnable']"))==null?void 0:t.getAttribute("data-learnable-api"),nt()}function Re(e,n,t){const r=s=>[0,2,4].map(l=>Number.parseInt(s.slice(l,l+2),16)),a=r(e.replace("#","")),o=r(n.replace("#",""));return`#${a.map((s,l)=>Math.round(s+(o[l]-s)*t)).map(s=>s.toString(16).padStart(2,"0")).join("")}`}function ta(e,n){const r=(Math.min(10,Math.max(1,Math.round(n)))-1)/9;return e==="yb"?{bg:Re("16140c","12100c",r),fg:Re("e6c200","ffe566",r),focus:"#ffffff"}:{bg:Re("1c1c1c","121212",r),fg:Re("e6e6e6","f2f2f2",r),focus:"#ffe14a"}}const rt="learnable-host-adjust";function na(e){var a;const t=typeof window<"u"&&((a=window.matchMedia)==null?void 0:a.call(window,"(forced-colors: active)").matches)||e.contrastMode==="off"?null:ta(e.contrastMode,e.contrastLevel);return`
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
  src: url("${H("/fonts/atkinson-latin-400.woff2")}") format("woff2");
  font-display: swap;
}
@font-face {
  font-family: Literata;
  src: url("${H("/fonts/literata-latin-600.woff2")}") format("woff2");
  font-display: swap;
}
@font-face {
  font-family: "Noto Sans Ethiopic";
  src: url("${H("/fonts/NotoSansEthiopic-Regular.ttf")}") format("truetype");
  font-display: swap;
}
`}function Q(e){const n=document.documentElement;n.dataset.learnableText=e.largeText?"large":"default",n.dataset.learnableMotion=e.stopMotion?"reduce":"allow";let t=document.getElementById(rt);t||(t=document.createElement("style"),t.id=rt,document.head.append(t)),t.textContent=na(e),n.dataset.learnableContrast=e.contrastMode==="off"?"off":"on",e.contrastMode==="off"?hn():Gr()}function ra(){var n;(n=document.getElementById(rt))==null||n.remove();const e=document.documentElement;delete e.dataset.learnableText,delete e.dataset.learnableContrast,delete e.dataset.learnableMotion}function aa(e){if(e.metaKey||e.ctrlKey||e.altKey)return null;switch(e.key){case" ":case"k":case"K":return{type:"toggle-play"};case"c":case"C":return{type:"cycle-captions"};case"d":case"D":return{type:"toggle-ad"};case"s":case"S":return{type:"toggle-sign"};case"ArrowLeft":return{type:"seek",by:-5};case"ArrowRight":return{type:"seek",by:5};case"j":case"J":return{type:"seek",by:-10};case"l":case"L":return{type:"seek",by:10};case"ArrowUp":return{type:"volume",by:.1};case"ArrowDown":return{type:"volume",by:-.1};case"m":case"M":return{type:"mute"};case"f":case"F":return{type:"fullscreen"};case"Home":return{type:"seek-to",to:"start"};case"End":return{type:"seek-to",to:"end"};case"?":return{type:"help"};default:return null}}function oa(e,n,t=1){const r=e.trim().split(/\s+/).filter(Boolean).length;return r===0?!1:r/(2.5*Math.min(2,Math.max(.5,t)))>Math.max(0,n)+.25}function at(e){return e.replace(/[^\t\n\r\x20-\x7E]/g,"?").replace(/\\/g,"\\\\").replace(/\(/g,"\\(").replace(/\)/g,"\\)")}function ia(e,n){const t=e.split(/\s+/).filter(Boolean),r=[];let a="";for(const o of t)a?a.length+1+o.length<=n?a+=` ${o}`:(r.push(a),a=o):a=o;return a&&r.push(a),r.length>0?r:[""]}function sa(e){const n=[{tag:"H1",text:e.title},...e.paragraphs.map(f=>({tag:"P",text:f})),{tag:"Figure",text:e.figureAlt}],t=[];let r=740;n.forEach((f,g)=>{if(f.tag==="Figure"){t.push(`/Figure <</MCID ${g}>> BDC`),t.push("0.106 0.188 0.282 RG"),t.push(`56 ${Math.max(72,r-64)} 180 56 re S`),t.push("EMC");return}const p=f.tag==="H1"?18:12,v=p+4,S=ia(f.text,f.tag==="H1"?58:86);t.push(`/${f.tag} <</MCID ${g}>> BDC`),t.push("BT"),t.push(`/F1 ${p} Tf`),t.push(`1 0 0 1 56 ${r} Tm`),S.forEach((L,A)=>{A>0&&t.push(`0 -${v} Td`),t.push(`(${at(L)}) Tj`)}),t.push("ET"),t.push("EMC"),r-=S.length*v+12});const a=t.join(`
`),o=n.map((f,g)=>`${8+g} 0 R`).join(" "),i=n.map((f,g)=>`${8+g} 0 R`).join(" "),s=8+n.length,l=s+1,u=[],c=f=>{u.push(f)};c("<< /Type /Catalog /Pages 3 0 R /Lang (en) /MarkInfo << /Marked true >> /ViewerPreferences << /DisplayDocTitle true >> /StructTreeRoot 2 0 R >>"),c(`<< /Type /StructTreeRoot /K 7 0 R /ParentTree ${s} 0 R >>`),c("<< /Type /Pages /Count 1 /Kids [4 0 R] >>"),c("<< /Type /Page /Parent 3 0 R /MediaBox [0 0 612 792] /Contents 5 0 R /Resources << /Font << /F1 6 0 R >> >> /StructParents 0 /Tabs /S >>"),c(`<< /Length ${a.length} >>
stream
${a}
endstream`),c("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>"),c(`<< /Type /StructElem /S /Document /P 2 0 R /Lang (en) /K [${o}] >>`),n.forEach((f,g)=>{const p=f.tag==="Figure"?` /Alt (${at(e.figureAlt)})`:"";c(`<< /Type /StructElem /S /${f.tag} /P 7 0 R /Pg 4 0 R${p} /K << /Type /MCR /Pg 4 0 R /MCID ${g} >> >>`)}),c(`<< /Nums [ 0 [${i}] ] >>`),c(`<< /Title (${at(e.title)}) /Author (LearnAble) >>`);let d=`%PDF-1.7
`;const m=[0];u.forEach((f,g)=>{m.push(d.length),d+=`${g+1} 0 obj
${f}
endobj
`});const y=d.length;d+=`xref
0 ${u.length+1}
`,d+=`0000000000 65535 f 
`;for(let f=1;f<m.length;f+=1)d+=`${m[f].toString().padStart(10,"0")} 00000 n 
`;return d+=`trailer
<< /Size ${u.length+1} /Root 1 0 R /Info ${l} 0 R >>
`,d+=`startxref
${y}
%%EOF`,new TextEncoder().encode(d)}function Pe(e){(!Number.isFinite(e)||e<0)&&(e=0);const n=Math.floor(e),t=Math.floor(n/60),r=n%60;return`${t}:${r.toString().padStart(2,"0")}`}const yn={model:"Suyash2205/signbridge-t5-base-asl-gloss",cues:[{en:"Hana opens her lesson on a phone in Addis Ababa.",gloss:"HANA DESC-OPEN X-SHE LESSON ON PHONE IN ADDUS ABRAHAM .",corrected:"fs-ADDIS fs-ABABA, HANA IX-3 PHONE LESSON OPEN",seconds:.786,pass:"cold"},{en:"She needs English and Amharic captions she can make larger.",gloss:"X-SHE NEED , AND AMHARAC , CAPTEXT X-SHE CAN MAKE DESC-LARGER .",corrected:"ENGLISH AMHARIC CAPTIONS, IX-3 NEED LARGER",seconds:.709,pass:"warm"},{en:"A sign window can move and grow, so Ethiopian Sign Language sits where she needs it.",gloss:"SIGN WINDOW CAN MOVE AND GROW , DESC-SO ETHIOPIAN SIGN LANGUAGE SIT WHERE X-SHE NEED X-IT .",corrected:"SIGN WINDOW, CAN MOVE GROW. ETHIOPIAN SIGN, WHERE IX-3 NEED",seconds:.942,pass:"warm"},{en:"Audio description says what the picture is doing, for a learner who cannot see it.",gloss:"AUDIO DESCRIPTION SAY WHAT PICTURE BE DO , FOR LEARNER WHO CAN DESC-NOT SEE X-IT .",corrected:"AUDIO DESCRIPTION, PICTURE DO-WHAT. LEARNER SEE-NOT, FOR IX-3",seconds:.806,pass:"warm"},{en:"When the network is slow she keeps a small pack: sound, text, and a light page.",gloss:"WHEN NETWORK BE DESC-SLOW , X-SHE KEEP DESC-SMALL PACK : SOUND , TEXT , AND LIGHT PAGE .",corrected:"NETWORK SLOW, IX-3 KEEP PACK SMALL: SOUND TEXT PAGE LIGHT",seconds:.945,pass:"warm"},{en:"The lesson on this page is the same one, with the network or without it.",gloss:"LESSON ON THIS PAGE BE DESC-SAME ONE , WITH NETWORK OR WITHOUT X-IT .",corrected:"PAGE THIS, LESSON SAME. NETWORK WITH OR WITHOUT, SAME",seconds:.699,pass:"warm"}]},la={signs:[{match:"Hana opens",gloss:"OPEN",clip:null},{match:"captions she can make larger",gloss:"LARGER",clip:null},{match:"sign window",gloss:"SIGN",clip:null},{match:"Audio description",gloss:"SPEAK",clip:null},{match:"small pack",gloss:"PACK",clip:null},{match:"same one",gloss:"SAME",clip:null}]},vn="ASL gloss (English → ASL), not Ethiopian Sign Language",ca="Amharic captions are not turned into ASL gloss.",ua=yn.model;let xn=la.signs;function da(e){xn=e.map(n=>({match:n.match,gloss:n.gloss,clip:n.clip??null})),window.dispatchEvent(new CustomEvent("learnable-settings"))}function wn(e){return[...e.toUpperCase()].filter(n=>/[A-Z]/.test(n))}function ha(e){return e.split(/\s+/).map(n=>n.replace(/^[,.:;]+|[,.:;]+$/g,"")).filter(n=>n.length>0&&!/^[,.:;]+$/.test(n))}function fa(e){return e.replace(/^(?:X-|DESC-)+/i,"").replace(/[^A-Za-z]/g,"").toUpperCase()}function pa(e){const n=e.replace(/^[,.:;]+|[,.:;]+$/g,"");if(/^fs-/i.test(n)){const o=n.replace(/^fs-/i,"").replace(/[^A-Za-z]/g,"").toUpperCase();return{token:e,key:o,clip:null,letters:wn(o)}}if(/^IX(?:-\d+)?$/i.test(n))return{token:e,key:n.toUpperCase(),clip:null,letters:[]};const t=fa(n),r=xn.find(o=>o.gloss.toUpperCase()===t),a=(r==null?void 0:r.clip)??null;return{token:e,key:t,clip:a,letters:a||!t?[]:wn(t)}}function ma(e){const n=e.trim(),t=yn.cues.find(a=>a.en.trim()===n);if(!(t!=null&&t.gloss))return null;const r="corrected"in t&&typeof t.corrected=="string"?t.corrected:t.gloss;return{model:t.gloss,corrected:r}}function An(e){var a;const n=ha(e).map(pa),t=((a=n.find(o=>o.clip))==null?void 0:a.clip)??null,r=n.filter(o=>!o.clip&&o.letters.length);return r.length?{spell:`Fingerspelling placeholder: ${r.map(o=>o.letters.join(" ")).join(" · ")}`,clip:t}:{spell:t?"A clip is available for a gloss token.":"",clip:t}}const En=(e,n)=>({gloss:"",model:"",note:e,spell:"",clip:null,source:n});function ba(e,n){if(n==="am")return En(ca,"amharic");if(n==="off"||!e.trim())return En("ASL gloss is shown with English captions.","off");const t=ma(e);if(t){const i=An(t.corrected);return{gloss:t.corrected,model:t.model,note:"Corrected by hand for this demo. A Deaf ASL signer should review it. This is ASL, not Ethiopian Sign Language, and not a recorded signer.",spell:i.spell,clip:i.clip,source:"precomputed"}}const a=e.replace(/[^A-Za-z]/g," ").trim().split(/\s+/).filter(Boolean).map(i=>i.toUpperCase()).join(" "),o=An(a);return{gloss:a,model:"",note:"This caption has no shipped gloss, and the model is not running. These are the English words, not model output.",spell:o.spell,clip:o.clip,source:"offline"}}const Sn=`
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
.media-row { display: grid; grid-template-columns: minmax(0, 1fr) 0.5rem minmax(0, var(--sign-col, 16rem)); gap: 0.5rem; align-items: start; min-width: 0; }
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
.sign h2 { font-family: var(--font-display); font-size: 1rem; line-height: 1.35; margin: 0; padding: 0.5rem 0.75rem; background: var(--color-navy); color: var(--color-navy-ink); overflow-wrap: anywhere; }
.sign video { width: 100%; max-height: 9rem; background: var(--color-stage); object-fit: contain; }
video[data-fallback][hidden] { display: none; }
.chat { margin: 0.5rem 0; padding-left: 1.2rem; }
.bar .status, .bar .consent { color: inherit; }
.bar select, .bar a { min-height: 2.75rem; color: var(--color-ink); background: var(--color-paper); }
.bar a { display: inline-flex; align-items: center; padding: 0 0.6rem; text-decoration: underline; }
.sign p { margin: 0.5rem 0.75rem; }
.gloss { font-family: var(--font-display); font-size: 1.15rem; line-height: 1.35; overflow-wrap: anywhere; }
.mark { display: block; width: 2.5rem; height: 1.1rem; border: 2px solid var(--color-navy); box-shadow: 0 var(--bar-height) 0 var(--color-caption); margin-bottom: 0.4rem; }
label { display: flex; flex-direction: column; gap: 0.2rem; min-width: 8rem; }
select, input, textarea { color: var(--color-ink); background-color: var(--color-paper); }
input[type="range"] { width: 100%; min-height: 2.75rem; }
section { background: var(--color-paper); color: var(--color-ink); }
.launcher, .handle { min-width: 2.75rem; }
.dock { display: flex; flex-direction: column; gap: 0.35rem; align-items: flex-start; }
.bar {
  position: static;
  background: var(--color-navy); color: var(--color-navy-ink); padding: 0.6rem;
  display: flex; flex-wrap: wrap; gap: 0.4rem; max-width: min(22rem, calc(100vw - 1rem));
  max-height: min(70vh, calc(100vh - 4rem)); overflow: auto;
}
@media (forced-colors: active) {
  :host, .bar, .launcher, .handle, button, a, select, input {
    background: Canvas !important; color: CanvasText !important; border-color: CanvasText !important;
  }
}
.transcript { list-style: none; margin: 0.5rem 0; padding: 0; max-height: 16rem; overflow: auto; }
.transcript button { background: transparent; color: var(--color-ink); border: 0; box-shadow: none; text-align: left; width: 100%; }
.sign .row button { background: var(--color-paper); color: var(--color-ink); border-color: var(--color-navy); box-shadow: none; }
.gloss-lines { margin: 0.5rem 0.75rem; min-width: 0; max-width: 100%; }
.gloss-lines dt { font-weight: 700; margin: 0.45rem 0 0.15rem; overflow-wrap: anywhere; }
.gloss-lines dd { margin: 0 0 0.35rem; min-width: 0; }
.sign, .sign h2, .sign p, .spell { min-width: 0; max-width: 100%; overflow-wrap: anywhere; }
[hidden] { display: none !important; }
.bar button { background: transparent; color: inherit; border-color: transparent; box-shadow: inset 0 calc(var(--bar-height) * -1) 0 transparent; }
.bar button[aria-pressed="true"] { box-shadow: inset 0 calc(var(--bar-height) * -1) 0 var(--color-caption); background: transparent; }
`;function ot(e,n,t){const r=new CustomEvent(n,{bubbles:!0,composed:!0,detail:t});e.dispatchEvent(r),window.dispatchEvent(new CustomEvent(n,{detail:t}))}class kn extends HTMLElement{constructor(){super();T(this,"root");T(this,"video",null);T(this,"signClip",null);T(this,"en",[]);T(this,"am",[]);T(this,"ad",[]);T(this,"mode","en");T(this,"adOn",!1);T(this,"signOn",!0);T(this,"lastAd","");T(this,"held",!1);T(this,"built",!1);T(this,"onSettings",()=>{this.applySettings()});T(this,"onSpeechCancel",()=>{this.resumeHeld()});this.root=this.attachShadow({mode:"open"})}connectedCallback(){this.built||this.mount(),this.loadTracks(),this.applySettings(),window.addEventListener("learnable-settings",this.onSettings),window.addEventListener("learnable-speech-cancel",this.onSpeechCancel)}refresh(){this.built=!1,this.mount(),this.loadTracks(),this.applySettings()}disconnectedCallback(){window.removeEventListener("learnable-settings",this.onSettings),window.removeEventListener("learnable-speech-cancel",this.onSpeechCancel),Ce()}mount(){var c,d,m,y,f,g;this.built=!0;const t=Ne(),r=on(this,"sign",t.signWindow),a=on(this,"describe",t.audioDescription),o=this.hasAttribute("offline")||t.offlinePack,i=this.hasAttribute("braille")||t.braille,s=this.hasAttribute("docs")||t.taggedDocs;this.root.innerHTML=`
      <style>${Sn}</style>
      <section aria-label="LearnAble lesson">
        <div class="media-row">
        <div class="stage" tabindex="0" role="region" aria-label="Lesson picture. Press question mark for keyboard shortcuts.">
          <slot name="media"></slot>
          <video data-fallback playsinline preload="metadata"></video>
          <p class="caption" aria-hidden="true"></p>
        </div>
        <button type="button" class="sign-grip" aria-label="Resize the sign panel">Resize</button>
        ${r?`<aside class="sign" data-sign aria-label="${vn}">
                <h2>${vn}</h2>
                <p class="sign-note" data-sign-note>English captions use a precomputed ASL gloss. Amharic captions are not glossed. This is not a recorded signer.</p>
                <dl class="gloss-lines" data-gloss-lines hidden>
                  <dt data-corrected-term>Corrected by hand</dt>
                  <dd class="gloss" data-gloss-corrected lang="en"></dd>
                  <dt data-model-term>Model output (${ua})</dt>
                  <dd class="gloss gloss-model" data-gloss-model lang="en"></dd>
                </dl>
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
        <p data-job>${(c=vt[0])==null?void 0:c.summary}</p>
        <div class="row">
          <button type="button" data-act="job">Play audio summary</button>
          <button type="button" data-act="badge">Check certificate</button>
        </div>
        <h2>Session chat</h2>
        <ol class="chat">
          ${Ae.chat.map(p=>`<li><span>${Pe(p.time)}</span> ${p.speaker}: ${p.text}</li>`).join("")}
        </ol>
        <button type="button" data-act="txt">Download transcript text</button>
      </section>
    `,this.bindMedia();const l=this.root.querySelector(".sign-grip");l==null||l.addEventListener("pointerdown",p=>this.dragSign(p)),l==null||l.addEventListener("keydown",p=>{(p.key==="ArrowLeft"||p.key==="ArrowDown")&&this.nudge("left"),(p.key==="ArrowRight"||p.key==="ArrowUp")&&this.nudge("right"),p.key==="Home"&&this.setSignColumn(12),p.key==="End"&&this.setSignColumn(24)});const u=this.root.querySelector(".stage");u==null||u.addEventListener("keydown",p=>this.onKey(p)),this.root.querySelectorAll("button[data-act]").forEach(p=>{p.addEventListener("click",()=>this.onAction(p.dataset.act||""))}),(d=this.root.querySelector("[data-act=size]"))==null||d.addEventListener("input",p=>{const v=Number(p.target.value);E({captionScale:v}),this.styleCaption(v,x().captionPreset)}),(m=this.root.querySelector("[data-act=preset]"))==null||m.addEventListener("change",p=>{const v=p.target.value;E({captionPreset:v}),this.styleCaption(x().captionScale,v)}),(y=this.video)==null||y.addEventListener("timeupdate",()=>this.sync()),(f=this.video)==null||f.addEventListener("play",()=>{this.setPlayLabel(!0),ot(this,"learnable-play",{playing:!0})}),(g=this.video)==null||g.addEventListener("pause",()=>{this.setPlayLabel(!1),ot(this,"learnable-play",{playing:!1})})}bindMedia(){const t=this.querySelector("video, audio"),r=this.root.querySelector("[data-fallback]");if(t instanceof HTMLMediaElement&&t.slot==="media")this.video=t,r&&(r.hidden=!0),t.setAttribute("playsinline","");else if(r){this.video=r;const i=this.getAttribute("src");i&&(r.src=H(i))}this.ensureDescriptionTrack(),this.signClip=this.root.querySelector("[data-sign-video]");const a=this.getAttribute("sign");this.signClip&&a&&a!=="false"&&(this.signClip.src=H(a));const o=this.querySelector("iframe");o&&!o.getAttribute("title")&&o.setAttribute("title","Embedded lesson video")}signColumn(){const t=this.root.querySelector(".media-row"),r=Number.parseFloat((t==null?void 0:t.style.getPropertyValue("--sign-col"))||"16");return Number.isFinite(r)?r:16}setSignColumn(t){const r=this.root.querySelector(".media-row");r&&r.style.setProperty("--sign-col",`${Math.min(28,Math.max(10,t))}rem`)}dragSign(t){if(t.button!==0)return;const r=t.currentTarget;if(!(r instanceof HTMLElement))return;const a=t.clientX,o=this.signColumn(),i=l=>this.setSignColumn(o+(a-l.clientX)/16),s=()=>{r.removeEventListener("pointermove",i),r.removeEventListener("pointerup",s)};r.setPointerCapture(t.pointerId),r.addEventListener("pointermove",i),r.addEventListener("pointerup",s)}async loadTracks(){this.en=await this.fetchCues(this.getAttribute("captions-en")),this.am=await this.fetchCues(this.getAttribute("captions-am")),this.ad=await this.fetchCues(this.getAttribute("describe"));const t=this.root.querySelector("[data-sign]");t&&(t.hidden=!this.signOn),this.renderTranscript(),this.sync()}renderTranscript(){const t=this.root.querySelector(".transcript");if(!t)return;const r=this.en.length?this.en:this.am;t.replaceChildren();for(const a of r){const o=document.createElement("li"),i=document.createElement("button");i.type="button",i.dataset.seek=String(a.start),i.textContent=`${Pe(a.start)} ${a.text}`,i.addEventListener("click",()=>{this.video&&(this.video.currentTime=a.start)}),o.append(i),t.append(o)}}async fetchCues(t){if(!t||t==="false")return[];try{const r=await fetch(H(t));return r.ok?Cr(await r.text()):[]}catch{return[]}}applySettings(){const t=x();this.mode=t.lang,t.contrastMode!=="off"||t.highContrast?this.setAttribute("contrast","high"):this.removeAttribute("contrast"),this.setAttribute("theme",Nr());const r=this.root.querySelector("[data-act=preset]"),a=this.root.querySelector("[data-act=size]");r&&(r.value=t.captionPreset),a&&(a.value=String(t.captionScale)),this.styleCaption(t.captionScale,t.captionPreset),this.adOn=t.audioDescription;const o=this.root.querySelector("[data-act=ad]");o&&o.setAttribute("aria-pressed",String(this.adOn)),this.sync()}ensureDescriptionTrack(){if(!(this.video instanceof HTMLVideoElement))return;const t=this.getAttribute("describe");if(!t||t==="false")return;const r=H(t);let a=this.video.querySelector("track[kind='descriptions']");a||(a=document.createElement("track"),a.kind="descriptions",a.label="Audio description",a.srclang="en",this.video.append(a)),a.getAttribute("src")!==r&&(a.src=r)}resumeHeld(){!this.held||!this.video||(this.held=!1,this.video.play().catch(()=>{}))}styleCaption(t,r){const a=this.root.querySelector(".caption"),o=Qt[r]??Qt.white;a&&(a.style.color=o.fg,a.style.background=o.bg,a.style.fontSize=`${t}rem`)}setPlayLabel(t){const r=this.root.querySelector("[data-act=play]");r&&(r.textContent=t?"Pause":"Play");const a=this.root.querySelector(".status"),o=(a==null?void 0:a.textContent)||"";a&&this.video&&(o.startsWith("Playing")||o.startsWith("Paused"))&&(a.textContent=`${t?"Playing":"Paused"}. ${Pe(this.video.currentTime)} of ${Pe(this.video.duration||0)}.`)}sync(){var g;if(!this.video)return;const t=this.video.currentTime,r=this.mode==="am"?this.am:this.mode==="en"?this.en:[],a=this.mode==="off"?void 0:zt(r,t),o=this.root.querySelector(".caption");o&&(o.textContent=(a==null?void 0:a.text)??"",o.setAttribute("lang",this.mode==="am"?"am":"en"));const i=ba((a==null?void 0:a.text)||"",this.mode),s=this.root.querySelector("[data-gloss-lines]"),l=this.root.querySelector("[data-corrected-term]");l&&(l.textContent=i.source==="precomputed"?"Corrected by hand":"Offline fallback");const u=this.root.querySelector("[data-gloss-corrected]"),c=this.root.querySelector("[data-gloss-model]"),d=this.root.querySelector("[data-model-term]");u&&(u.textContent=i.gloss),c&&(c.textContent=i.model,c.hidden=!i.model),d&&(d.hidden=!i.model),s&&(s.hidden=!i.gloss&&!i.model);const m=this.root.querySelector("[data-sign-note]");m&&(m.textContent=i.note);const y=this.root.querySelector("[data-spell]");if(y&&(y.textContent=i.spell),this.signClip&&(i.clip?(this.signClip.hidden=!1,this.signClip.getAttribute("src")!==H(i.clip)&&(this.signClip.src=H(i.clip))):this.signClip.hidden=!0),(g=this.signClip)!=null&&g.getAttribute("src")&&this.video&&Math.abs(this.signClip.currentTime-t)>.4&&(this.signClip.currentTime=t),this.adOn){const p=zt(this.ad,t);if(!p)this.lastAd="";else if(p.text!==this.lastAd){this.lastAd=p.text;const v=x(),S=p.end-p.start;oa(p.text,S,v.readRate)&&!this.video.paused&&(this.video.pause(),this.held=!0),ye(p.text,"en",v.readRate,{pitch:v.readPitch,onend:()=>this.resumeHeld(),oncancel:()=>this.resumeHeld()})}}const f=this.root.querySelector("[data-act=captions]");f&&(f.textContent=this.mode==="off"?"Captions: off":this.mode==="am"?"Captions: Amharic":"Captions: English"),this.setPlayLabel(!this.video.paused)}onKey(t){const r=aa(t);r&&(t.preventDefault(),r.type==="toggle-play"&&this.toggle(),r.type==="cycle-captions"&&this.cycleCaptions(),r.type==="toggle-ad"&&this.toggleAd(),r.type==="toggle-sign"&&this.toggleSign(),r.type==="seek"&&this.video&&(this.video.currentTime=Math.max(0,this.video.currentTime+r.by)),r.type==="seek-to"&&this.video&&(this.video.currentTime=r.to==="start"?0:this.video.duration||0),r.type==="mute"&&this.video&&(this.video.muted=!this.video.muted),r.type==="volume"&&this.video&&(this.video.volume=Math.min(1,Math.max(0,this.video.volume+r.by))))}async toggle(){var t,r;if(this.video)try{this.video.paused?(await this.video.play(),(t=this.signClip)!=null&&t.getAttribute("src")&&this.signClip.play().catch(()=>{})):(this.video.pause(),(r=this.signClip)==null||r.pause())}catch{this.setStatus("The video did not play. Captions are still listed when the file loads.")}}cycleCaptions(){this.mode=this.mode==="off"?"en":this.mode==="en"?"am":"off",this.sync(),ot(this,"learnable-captions",{lang:this.mode})}toggleAd(){const t=!x().audioDescription;E({audioDescription:t}),t||(Ce(),this.resumeHeld())}nudge(t){const r=t==="left"||t==="shrink"?-2:2;this.setSignColumn(this.signColumn()+r)}scaleSign(t){this.setSignColumn(this.signColumn()+t*2)}toggleSign(){this.signOn=!this.signOn;const t=this.root.querySelector("[data-sign]");t&&(t.hidden=!this.signOn);const r=this.root.querySelector("[data-act=sign]");r&&r.setAttribute("aria-pressed",String(this.signOn))}setStatus(t){const r=this.root.querySelector(".status");r&&(r.textContent=t)}textOf(t){return t.map(r=>r.text).join(`
`)}async onAction(t){var r;if(t==="play"&&this.toggle(),t==="captions"&&this.cycleCaptions(),t==="ad"&&this.toggleAd(),t==="sign"&&this.toggleSign(),(t==="left"||t==="right"||t==="up"||t==="down")&&this.nudge(t),(t==="shrink"||t==="grow")&&this.scaleSign(t==="grow"?1:-1),t==="pack")try{const a=await wr({english:this.textOf(this.en),amharic:this.textOf(this.am),descriptions:this.textOf(this.ad),audioEn:this.optionalUrl("audio-en"),audioAm:this.optionalUrl("audio-am")});_(a.bytes,"learnable-3g-pack.zip","application/zip"),this.setStatus(a.audio?"3G pack downloaded, with narration and text.":"Text pack downloaded. Narration files were not beside the video.")}catch(a){this.setStatus(a instanceof Error?a.message:"The pack could not be built.")}if(t==="braille"){const a=this.mode==="am"?"am":"en",o=a==="am"?this.textOf(this.am):this.textOf(this.en);_(new TextEncoder().encode(je(o)),`lesson-${a}.brf`,"text/plain"),this.setStatus("Braille file downloaded.")}if(t==="pdf"){try{const o=await fetch(H(this.getAttribute("pdf")||"/media/learnable-lesson.pdf"));if(o.ok){_(new Uint8Array(await o.arrayBuffer()),"learnable-lesson.pdf","application/pdf"),this.setStatus("Tagged PDF downloaded, with Amharic and the picture description.");return}}catch{}const a=sa({title:"LearnAble lesson",paragraphs:this.en.map(o=>o.text),figureAlt:"Lesson picture with English and Amharic captions."});_(a,"learnable-lesson.pdf","application/pdf"),this.setStatus("Tagged PDF downloaded. Amharic stays in the captions.")}if(t==="html"){const a=this.en.map(s=>`<h2>${s.text}</h2>`).join(""),o=this.am.map(s=>`<p lang="am">${s.text}</p>`).join(""),i=`<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><title>LearnAble lesson</title></head><body><main><h1>LearnAble lesson</h1><p>Picture: A navy phone on a paper background, with an English and Amharic caption under the screen.</p>${a}${o}</main></body></html>`;_(new TextEncoder().encode(i),"learnable-lesson.html","text/html"),this.setStatus("HTML text version downloaded, with the picture description.")}if(t==="txt"){const a=`English
${this.textOf(this.en)}

Amharic
${this.textOf(this.am)}
`;_(new TextEncoder().encode(a),"learnable-transcript.txt","text/plain"),this.setStatus("Transcript text downloaded.")}if(t==="vtt-en"||t==="vtt-am"){const a=t==="vtt-am"?this.am:this.en;_(new TextEncoder().encode(Yt(a)),t==="vtt-am"?"captions-am.vtt":"captions-en.vtt","text/vtt"),this.setStatus(t==="vtt-am"?"Amharic captions downloaded.":"English captions downloaded.")}if(t==="job"){const a=((r=this.root.querySelector("[data-job]"))==null?void 0:r.textContent)||"";ye(a,"en"),this.setStatus("Playing the job summary on this device.")}if(t==="badge"){const a=await wt();this.setStatus(a?"The certificate proof matches the published public key.":"The certificate proof does not match.")}}optionalUrl(t){const r=this.getAttribute(t);if(!(!r||r==="false"))return H(r)}}let ce=[],qe=0,ee=!1,it=!1;function oe(e){const n=document.getElementById("learnable-reader-live");n&&(n.textContent=e)}function ga(){document.querySelectorAll(".learnable-sentence").forEach(e=>{e.replaceWith(document.createTextNode(e.textContent||""))}),document.querySelectorAll(".is-current").forEach(e=>e.classList.remove("is-current")),it=!1,ce=[]}function ya(e){const n=document.createTreeWalker(e,NodeFilter.SHOW_TEXT),t=[];for(;n.nextNode();)t.push(n.currentNode);const r=[];return t.forEach(a=>{const o=a.parentElement;if(!o||o.closest("script, style, learnable-player, learnable-toolbar, .learnable-gateway, .learnable-sentence"))return;const i=(a.textContent||"").split(new RegExp("(?<=[.!?])\\s+")).filter(l=>l.trim());if(i.length===0)return;const s=document.createDocumentFragment();i.forEach(l=>{const u=document.createElement("span");u.className="learnable-sentence",u.textContent=l,s.append(u,document.createTextNode(" ")),r.push(u)}),a.replaceWith(s)}),it=!0,r}function va(){const e=document.querySelector("main");if(!e)return[];const n=x().readVerbosity;return n==="headings"?[...e.querySelectorAll("h1, h2, h3")]:n==="links"?[...e.querySelectorAll("a")]:it?[...e.querySelectorAll(".learnable-sentence")]:ya(e)}function xa(){var n;!x().haptics||!("vibrate"in navigator)||(n=navigator.vibrate)==null||n.call(navigator,20)}function Cn(){var r,a;(r=window.speechSynthesis)==null||r.cancel();const e=ce[qe];if(ce.forEach(o=>o.classList.remove("is-current")),!e){ee=!1,oe("Reading stopped.");return}e.classList.add("is-current"),e.scrollIntoView({block:"nearest"});const n=x(),t=new SpeechSynthesisUtterance(e.textContent||"");t.rate=n.readRate,t.pitch=n.readPitch,t.lang=document.documentElement.lang||"en",t.onend=()=>{ee&&(qe+=1,Cn())},oe(`Reading ${qe+1} of ${ce.length}.`),xa(),(a=window.speechSynthesis)==null||a.speak(t)}function wa(){if(!window.speechSynthesis){oe("This browser has no speech synthesis. Nothing was spoken.");return}if(ce=va(),ce.length===0){oe("There is no text to read in the main region.");return}ee=!0,Cn()}function Aa(){var e;ee=!1,(e=window.speechSynthesis)==null||e.cancel(),oe("Reading paused.")}function st(){var e;ee=!1,qe=0,(e=window.speechSynthesis)==null||e.cancel(),ga(),oe("Reading stopped. The page text is unchanged.")}function Ea(){ee&&st()}window.addEventListener("learnable-speech-cancel",()=>{ee&&(ee=!1,oe("Reading paused."))});const Sa={en:{button:"Button",link:"Link",heading:"Heading",level:"level",image:"Image",paragraph:"Paragraph",navigation:"Navigation",main:"Main",banner:"Banner",contentinfo:"Content info",region:"Region",search:"Search",complementary:"Complementary",checkbox:"Checkbox",slider:"Slider",combobox:"List",textbox:"Text field",pressed:"pressed",notPressed:"not pressed",checked:"checked",notChecked:"not checked",expanded:"expanded",collapsed:"collapsed",disabled:"disabled",current:"current"},am:{button:"ቁልፍ",link:"ማገናኛ",heading:"ርዕስ",level:"ደረጃ",image:"ምስል",paragraph:"አንቀጽ",navigation:"አሰሳ",main:"ዋና",banner:"ራስጌ",contentinfo:"ግርጌ",region:"ክልል",search:"ፍለጋ",complementary:"ተጨማሪ",checkbox:"ሳጥን",slider:"ተንሸራታች",combobox:"ዝርዝር",textbox:"የጽሑፍ ሳጥን",pressed:"ተጭኗል",notPressed:"አልተጫነም",checked:"ተመርጧል",notChecked:"አልተመረጠም",expanded:"ተከፍቷል",collapsed:"ተዘግቷል",disabled:"ተሰናክሏል",current:"የአሁኑ"}};function ka(e){var t;return(((t=e.closest("[lang]"))==null?void 0:t.getAttribute("lang"))||document.documentElement.lang||"en").toLowerCase().startsWith("am")?"am":"en"}function Ca(e){const n=e.getAttribute("role");if(n)return n;const t=e.tagName;return t==="A"&&e.hasAttribute("href")?"link":t==="BUTTON"?"button":/^H[1-6]$/.test(t)?"heading":t==="IMG"?"image":t==="NAV"?"navigation":t==="MAIN"?"main":t==="HEADER"?"banner":t==="FOOTER"?"contentinfo":t==="ASIDE"?"complementary":t==="P"?"paragraph":t==="SELECT"?"combobox":t==="TEXTAREA"?"textbox":t==="SECTION"&&(e.hasAttribute("aria-label")||e.hasAttribute("aria-labelledby"))?"region":e instanceof HTMLInputElement?e.type==="checkbox"||e.type==="radio"?"checkbox":e.type==="range"?"slider":e.type==="button"||e.type==="submit"?"button":"textbox":""}function La(e){var a,o;const n=e.getAttribute("aria-labelledby");if(n){const i=n.split(/\s+/).map(s=>{var l;return((l=document.getElementById(s))==null?void 0:l.textContent)||""}).join(" ").replace(/\s+/g," ").trim();if(i)return i}const t=(a=e.getAttribute("aria-label"))==null?void 0:a.trim();if(t)return t;if(e instanceof HTMLImageElement)return ze(e)||e.alt.trim();if(e instanceof HTMLInputElement||e instanceof HTMLSelectElement||e instanceof HTMLTextAreaElement){const i=e.id,s=i?document.querySelector(`label[for="${CSS.escape(i)}"]`):null,l=e.closest("label"),u=((s==null?void 0:s.textContent)||(l==null?void 0:l.textContent)||"").replace(/\s+/g," ").trim();if(u)return u}const r=(e.innerText||e.textContent||"").replace(/\s+/g," ").trim();return r?r.slice(0,280):((o=e.getAttribute("title"))==null?void 0:o.trim())||""}function Ta(e,n){const r=[...e.querySelectorAll("img")].map(a=>ze(a)).filter(a=>!!(a&&!n.includes(a)));return r.length===0?n:[n,...r].filter(Boolean).join(". ")}function Ia(e){if(e===document.body||e===document.documentElement)return null;const n=Ca(e);if(!n&&e.tagName!=="P")return null;const t=ka(e),r=Sa[t],a=r[n]||n;let o=Ta(e,La(e));if(n==="heading"){const d=e.getAttribute("aria-level")||e.tagName.slice(1);o=`${r.level} ${d}, ${o}`.trim()}const i=[],s=e.getAttribute("aria-pressed");s==="true"&&i.push(r.pressed),s==="false"&&i.push(r.notPressed);const l=e.getAttribute("aria-checked")??(e instanceof HTMLInputElement&&e.type==="checkbox"?String(e.checked):null);l==="true"&&i.push(r.checked),l==="false"&&i.push(r.notChecked);const u=e.getAttribute("aria-expanded");u==="true"&&i.push(r.expanded),u==="false"&&i.push(r.collapsed),(e.hasAttribute("disabled")||e.getAttribute("aria-disabled")==="true")&&i.push(r.disabled),e.hasAttribute("aria-current")&&e.getAttribute("aria-current")!=="false"&&i.push(r.current);const c=[a,o,...i].filter(Boolean).join(", ");return c.trim()?{text:c,lang:t}:null}function Ln(e){return e.composedPath().some(n=>n instanceof HTMLElement?n.isContentEditable?!0:n.tagName==="INPUT"||n.tagName==="TEXTAREA"||n.tagName==="SELECT":!1)}function Na(e){return e.composedPath().some(n=>n instanceof HTMLElement&&n.tagName==="LEARNABLE-PLAYER")}function lt(e,n){return e.altKey||e.ctrlKey||e.metaKey?!1:n==="?"?e.key==="?":e.key.toLowerCase()===n.toLowerCase()}function Ma(e,n){const t=n.split("+").map(s=>s.trim().toLowerCase()).filter(Boolean);if(t.length===0)return!1;const r=t[t.length-1],a=t.includes("alt"),o=t.includes("shift"),i=t.includes("ctrl")||t.includes("control");return a!==e.altKey||o!==e.shiftKey||i!==(e.ctrlKey||e.metaKey)?!1:e.key.toLowerCase()===r}const ie="learnable-voice-prompt",ue="learnable-help";let Tn=!1,ct=0,ut=null;function dt(e){const n=document.getElementById("learnable-reader-live");n&&(n.textContent="",n.textContent=e)}function Da(){var n,t;const e=(t=(n=document.querySelector("learnable-toolbar"))==null?void 0:n.shadowRoot)==null?void 0:t.querySelector("[data-act=voice]");e==null||e.focus()}function In(e,n){if(n.key!=="Tab")return;const t=[...e.querySelectorAll("button, a[href], input, select, textarea")].filter(i=>!i.hasAttribute("disabled"));if(t.length===0)return;const r=t[0],a=t[t.length-1],o=e.contains(document.activeElement)?document.activeElement:null;n.shiftKey&&(o===r||!o)?(n.preventDefault(),a.focus()):!n.shiftKey&&o===a&&(n.preventDefault(),r.focus())}function xe(e,n){var t;E({voice:e,voiceChosen:!0,...n==="prompt"?{audioDescription:e}:{}}),(t=document.getElementById(ie))==null||t.remove(),dt(e?"LearnAble voice on.":"LearnAble voice off."),e?ye("LearnAble voice on.","en",x().readRate):Ce(),n==="prompt"&&(ct=0,Da())}function Ra(){var n,t,r;if(x().voiceChosen||document.getElementById(ie)||!document.body)return;const e=document.createElement("div");e.id=ie,e.className="learnable-dialog",e.tabIndex=-1,e.setAttribute("role","alertdialog"),e.setAttribute("aria-modal","true"),e.setAttribute("aria-labelledby","learnable-voice-title"),e.setAttribute("aria-describedby","learnable-voice-desc"),e.innerHTML=`
    <h2 id="learnable-voice-title">LearnAble voice</h2>
    <p id="learnable-voice-desc">LearnAble can speak the control, heading, or picture you move to. If you already use a screen reader, turn this voice off so the two do not talk at once. Some browsers speak only after the first click or key. Choosing here unlocks that. Escape turns the voice off.</p>
    <div class="learnable-row">
      <button type="button" data-voice="keep">Keep LearnAble voice</button>
      <button type="button" data-voice="reader">I use my own screen reader (turn LearnAble voice off)</button>
    </div>
  `,(n=e.querySelector("[data-voice=keep]"))==null||n.addEventListener("click",()=>xe(!0,"prompt")),(t=e.querySelector("[data-voice=reader]"))==null||t.addEventListener("click",()=>xe(!1,"prompt")),document.body.append(e),(r=e.querySelector("[data-voice=keep]"))==null||r.focus()}function Pa(){const e=x().keys;return`
    <li>Tab and Shift+Tab move through the page. The skip link is first.</li>
    <li>${e.heading.toUpperCase()} next heading. Shift+${e.heading.toUpperCase()} previous heading.</li>
    <li>${e.landmark.toUpperCase()} next landmark. Shift+${e.landmark.toUpperCase()} previous landmark.</li>
    <li>${e.help} opens this help. Escape closes it and returns focus.</li>
    <li>${e.voice} toggles LearnAble voice. The LearnAble voice button does the same. This chord is not an NVDA, JAWS, Orca, VoiceOver, or Chrome shortcut. On some Mac layouts it types a character in a text field, so it does not run there.</li>
    <li>Picture frame, while it is focused: Space or K play, C captions, D audio description, S sign panel, arrows seek, J and L move further. L is landmarks everywhere else.</li>
    <li>NVDA and JAWS browse mode take H and L before the page sees them. That is expected.</li>
    <li>Single-letter keys do nothing in a text field, and they can be turned off or changed below.</li>
  `}function Nn(e){var a,o,i;if(document.getElementById(ie))return;ut=e??(document.activeElement instanceof HTMLElement?document.activeElement:null),(a=document.getElementById(ue))==null||a.remove();const n=x().keys,t=document.createElement("div");t.id=ue,t.className="learnable-dialog",t.tabIndex=-1,t.setAttribute("role","dialog"),t.setAttribute("aria-modal","true"),t.setAttribute("aria-labelledby","learnable-help-title"),t.innerHTML=`
    <h2 id="learnable-help-title">Keyboard shortcuts</h2>
    <ul>${Pa()}</ul>
    <div class="learnable-row">
      <label>Heading key <input data-map="heading" value="${Be(n.heading)}" maxlength="8" /></label>
      <label>Landmark key <input data-map="landmark" value="${Be(n.landmark)}" maxlength="8" /></label>
      <label>Help key <input data-map="help" value="${Be(n.help)}" maxlength="8" /></label>
      <label>Voice shortcut <input data-map="voice" value="${Be(n.voice)}" maxlength="32" /></label>
    </div>
    <div class="learnable-row">
      <button type="button" data-help="close">Close shortcuts</button>
    </div>
  `,t.querySelectorAll("[data-map]").forEach(s=>{s.addEventListener("change",()=>{const l=s.dataset.map,u=s.value.trim();u&&E({keys:{...x().keys,[l]:u}})})});const r=()=>Mn();(o=t.querySelector("[data-help=close]"))==null||o.addEventListener("click",r),document.body.append(t),(i=t.querySelector("[data-help=close]"))==null||i.focus()}function Mn(){var n;(n=document.getElementById(ue))==null||n.remove();const e=ut;ut=null,e==null||e.focus()}function qa(e){if(e.closest(`#${ie}, #${ue}, [hidden]`))return!1;const n=getComputedStyle(e);return n.display!=="none"&&n.visibility!=="hidden"}function Ba(e){(!e.matches("a[href], button, input, select, textarea, summary, [tabindex]")||e.tabIndex<0)&&(e.tabIndex=-1),e.focus()}function Dn(e,n){const t=[...document.querySelectorAll(e)].filter(qa),r=[...new Set(t)];if(r.length===0)return;const a=document.activeElement instanceof HTMLElement?document.activeElement:null;let o=r.findIndex(s=>s===a||s.contains(a));o<0&&(o=n>0?-1:0);const i=r[(o+n+r.length)%r.length];Ba(i)}const $a="header, [role='banner'], nav, [role='navigation'], main, [role='main'], footer, [role='contentinfo'], aside, [role='complementary'], [role='search'], form[aria-label], form[aria-labelledby], section[aria-label], section[aria-labelledby]";function Oa(e){if(performance.now()>ct)return;const n=e.composedPath()[0];if(!(n instanceof HTMLElement)||n.closest(`#${ie}, #${ue}`))return;const t=x();if(!t.voice||!t.voiceChosen)return;const r=Ia(n);r&&ye(r.text,r.lang,t.readRate,{pitch:t.readPitch})}function Ha(e){ct=performance.now()+800,Wt();const n=x(),t=document.getElementById(ie),r=document.getElementById(ue);if(t&&In(t,e),r&&In(r,e),Ma(e,n.keys.voice)&&!Ln(e)){e.preventDefault(),e.stopPropagation(),xe(!x().voice,"toggle");return}if(Ce(),window.dispatchEvent(new CustomEvent("learnable-speech-cancel")),e.key==="Escape"){if(t){e.preventDefault(),xe(!1,"prompt");return}if(r){e.preventDefault(),e.stopPropagation(),Mn();return}Ea()}if(!(t||r)&&!(Ln(e)||!n.keyboard)){if(lt(e,n.keys.help)){e.preventDefault(),e.stopPropagation(),Nn(document.activeElement instanceof HTMLElement?document.activeElement:null);return}Na(e)||(lt(e,n.keys.heading)?(e.preventDefault(),Dn("h1, h2, h3, h4, h5, h6",e.shiftKey?-1:1)):lt(e,n.keys.landmark)&&(e.preventDefault(),Dn($a,e.shiftKey?-1:1)))}}function Fa(){Wt(),Er()}function Be(e){return e.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;")}function Wa(){if(document.getElementById("learnable-reader-live")||!document.body)return;const e=document.createElement("p");e.id="learnable-reader-live",e.setAttribute("role","status"),e.setAttribute("aria-live","polite"),document.body.append(e)}function Ua(){Wa(),Ra(),!Tn&&(Tn=!0,document.addEventListener("keydown",Ha,!0),document.addEventListener("focusin",Oa,!0),document.addEventListener("pointerdown",Fa,!0))}const Ga=["tl","tr","bl","br"];function Rn(e,n){return e.left<n.right&&e.right>n.left&&e.top<n.bottom&&e.bottom>n.top}class Va extends HTMLElement{constructor(){super();T(this,"root");T(this,"built",!1);T(this,"open",!0);this.root=this.attachShadow({mode:"open"})}connectedCallback(){var a,o,i,s,l,u,c,d,m,y,f,g,p,v,S,L,A,N,D,k;if(this.built)return;this.built=!0,this.root.innerHTML=`
      <style>${Sn}</style>
      <button type="button" class="launcher" data-act="launcher" aria-expanded="false" aria-controls="learnable-panel">LearnAble</button>
      <div class="dock">
      <button type="button" class="handle" data-act="move" aria-label="Move LearnAble. Arrow keys move it. The corner buttons place it without dragging.">Move</button>
      <div class="bar" id="learnable-panel" role="toolbar" aria-label="LearnAble display" aria-orientation="horizontal">
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
        <button type="button" data-act="collapse">Minimise</button>
        <button type="button" data-corner="tl">Top left</button>
        <button type="button" data-corner="tr">Top right</button>
        <button type="button" data-corner="bl">Bottom left</button>
        <button type="button" data-corner="br">Bottom right</button>
      </div>
      </div>
    `,this.root.querySelectorAll("button[data-key]").forEach(h=>{h.addEventListener("click",()=>{const b=h.dataset.key,C=x(),te=E({[b]:!C[b]});Q(te),this.reflect()})}),(a=this.root.querySelector("[data-key=captionScale]"))==null||a.addEventListener("input",h=>{const b=E({captionScale:Number(h.target.value)});Q(b)}),(o=this.root.querySelector("[data-key=captionPreset]"))==null||o.addEventListener("change",h=>{const b=E({captionPreset:h.target.value});Q(b)}),(i=this.root.querySelector("[data-key=uiLang]"))==null||i.addEventListener("change",h=>{E({uiLang:h.target.value==="am"?"am":"en"}),this.reflect()}),(s=this.root.querySelector("[data-key=contrastMode]"))==null||s.addEventListener("change",h=>{const b=h.target.value,C=E({contrastMode:b==="bw"||b==="yb"?b:"off"});Q(C),this.reflect()}),(l=this.root.querySelector("[data-key=contrastLevel]"))==null||l.addEventListener("input",h=>{const b=E({contrastLevel:Number(h.target.value)});Q(b),this.reflect()}),(u=this.root.querySelector("[data-key=readRate]"))==null||u.addEventListener("input",h=>{E({readRate:Number(h.target.value)})}),(c=this.root.querySelector("[data-key=readPitch]"))==null||c.addEventListener("input",h=>{E({readPitch:Number(h.target.value)})}),(d=this.root.querySelector("[data-key=readVerbosity]"))==null||d.addEventListener("change",h=>{const b=h.target.value;E({readVerbosity:b==="headings"||b==="links"?b:"sentences"})}),(m=this.root.querySelector("[data-key=haptics]"))==null||m.addEventListener("change",h=>{E({haptics:h.target.checked})}),(y=this.root.querySelector("[data-act=read-play]"))==null||y.addEventListener("click",()=>wa()),(f=this.root.querySelector("[data-act=read-pause]"))==null||f.addEventListener("click",()=>Aa()),(g=this.root.querySelector("[data-act=read-stop]"))==null||g.addEventListener("click",()=>st()),this.root.addEventListener("keydown",h=>{h instanceof KeyboardEvent&&h.key==="Escape"&&st()}),(p=this.root.querySelector("[data-act=voice]"))==null||p.addEventListener("click",()=>{xe(!x().voice,"toggle")}),(v=this.root.querySelector("[data-act=describe]"))==null||v.addEventListener("click",()=>{const h=!x().audioDescription;E({audioDescription:h}),dt(h?"Audio description on.":"Audio description off.")}),(S=this.root.querySelector("[data-act=keys]"))==null||S.addEventListener("click",()=>{const h=!x().keyboard;E({keyboard:h}),dt(h?"Keyboard shortcuts on.":"Keyboard shortcuts off. The buttons still work.")}),(L=this.root.querySelector("[data-act=help]"))==null||L.addEventListener("click",h=>{Nn(h.currentTarget instanceof HTMLElement?h.currentTarget:null)}),window.addEventListener("learnable-settings",()=>this.reflect()),(A=this.root.querySelector("[data-act=images]"))==null||A.addEventListener("click",()=>{var C;const h=((C=this.root.querySelector("[data-act=consent]"))==null?void 0:C.checked)===!0,b=this.root.querySelector("[data-note]");b&&(b.textContent=h?ea():nt())});const t=x();this.open=t.toolbarVisited?!t.toolbarCollapsed:!0,t.toolbarVisited||E({toolbarVisited:!0,toolbarCollapsed:!0}),this.place(t.toolbarCorner),(N=this.root.querySelector("[data-act=launcher]"))==null||N.addEventListener("click",()=>this.setOpen(!0)),(D=this.root.querySelector("[data-act=collapse]"))==null||D.addEventListener("click",()=>this.setOpen(!1)),this.root.querySelectorAll("[data-corner]").forEach(h=>{h.addEventListener("click",()=>this.place(h.dataset.corner,!0))});const r=this.root.querySelector("[data-act=move]");r==null||r.addEventListener("pointerdown",h=>this.drag(h)),r==null||r.addEventListener("keydown",h=>this.moveByKey(h)),(k=this.root.querySelector(".bar"))==null||k.addEventListener("keydown",h=>this.rove(h)),document.addEventListener("focusin",h=>this.avoid(h)),this.paint(),this.reflect()}controls(){return[...this.root.querySelectorAll(".bar button, .bar a[href], .bar select, .bar input")]}setOpen(t){this.open=t,E({toolbarCollapsed:!t,toolbarVisited:!0}),this.paint();const r=t?this.root.querySelector("[data-act=move]"):this.root.querySelector("[data-act=launcher]");r==null||r.focus()}place(t,r=!1){Ga.includes(t)&&(this.dataset.corner=t,this.style.left="",this.style.top="",this.style.right="",this.style.bottom="",r&&E({toolbarCorner:t}))}drag(t){if(t.button!==0)return;const r=t.currentTarget;if(!(r instanceof HTMLElement))return;const a=t.clientX,o=t.clientY,i=this.getBoundingClientRect(),s=u=>{const c=Math.min(window.innerWidth-48,Math.max(0,i.left+u.clientX-a)),d=Math.min(window.innerHeight-48,Math.max(0,i.top+u.clientY-o));this.dataset.corner="free",this.style.left=`${c}px`,this.style.top=`${d}px`,this.style.right="auto",this.style.bottom="auto"},l=()=>{r.removeEventListener("pointermove",s),r.removeEventListener("pointerup",l)};r.setPointerCapture(t.pointerId),r.addEventListener("pointermove",s),r.addEventListener("pointerup",l)}moveByKey(t){if(!t.key.startsWith("Arrow"))return;t.preventDefault(),t.stopPropagation();const r=this.getBoundingClientRect(),a=24,o=r.left+(t.key==="ArrowLeft"?-a:t.key==="ArrowRight"?a:0),i=r.top+(t.key==="ArrowUp"?-a:t.key==="ArrowDown"?a:0);this.dataset.corner="free",this.style.left=`${Math.min(window.innerWidth-48,Math.max(0,o))}px`,this.style.top=`${Math.min(window.innerHeight-48,Math.max(0,i))}px`,this.style.right="auto",this.style.bottom="auto"}rove(t){const r=t.composedPath()[0];if(!(r instanceof HTMLElement)||r.closest("input, select, textarea")||r.dataset.act==="move")return;const a=this.controls(),o=a.indexOf(r);if(o<0)return;let i=o;if(t.key==="ArrowRight"||t.key==="ArrowDown")i=(o+1)%a.length;else if(t.key==="ArrowLeft"||t.key==="ArrowUp")i=(o-1+a.length)%a.length;else if(t.key==="Home")i=0;else if(t.key==="End")i=a.length-1;else return;t.preventDefault(),a.forEach((s,l)=>s.setAttribute("tabindex",l===i?"0":"-1")),a[i].focus()}avoid(t){const r=t.composedPath()[0];if(!(r instanceof HTMLElement)||t.composedPath().includes(this))return;const a=r.getBoundingClientRect();if(a.width===0&&a.height===0||!Rn(this.getBoundingClientRect(),a))return;const o=["tr","tl","br","bl"];for(const i of o)if(this.place(i),!Rn(this.getBoundingClientRect(),r.getBoundingClientRect())){E({toolbarCorner:i});return}r.style.scrollMargin="5rem",r.scrollIntoView({block:"nearest",inline:"nearest"})}paint(){const t=this.root.querySelector("[data-act=launcher]"),r=this.root.querySelector(".dock");t&&(t.hidden=this.open,t.setAttribute("aria-expanded",String(this.open))),r&&(r.hidden=!this.open),this.open&&this.controls().forEach((o,i)=>o.setAttribute("tabindex",i===0?"0":"-1"))}reflect(){const t=x();this.root.querySelectorAll("button[data-key]").forEach(L=>{const A=L.dataset.key;L.setAttribute("aria-pressed",String(t[A]))});const r=Ye[t.uiLang];this.root.querySelector("[data-key=largeText]").textContent=r.larger,this.root.querySelector("[data-key=stopMotion]").textContent=r.stop;const a=this.root.querySelector("[data-act=images]");a&&(a.textContent=r.images);const o=this.root.querySelector("[href='#learnable-pipeline']"),i=this.root.querySelector("[href='#learnable-job']"),s=this.root.querySelector("[href='#learnable-session']");o&&(o.textContent=r.pipeline),i&&(i.textContent=r.job),s&&(s.textContent=r.session);const l=this.root.querySelector("[data-key=captionScale]"),u=this.root.querySelector("[data-key=captionPreset]"),c=this.root.querySelector("[data-key=uiLang]");l&&(l.value=String(t.captionScale)),u&&(u.value=t.captionPreset),c&&(c.value=t.uiLang);const d=this.root.querySelector("[data-key=contrastMode]"),m=this.root.querySelector("[data-key=contrastLevel]"),y=this.root.querySelector("[data-contrast-value]");d&&(d.value=t.contrastMode),m&&(m.value=String(t.contrastLevel)),y&&(y.textContent=String(t.contrastLevel));const f=this.root.querySelector("[data-key=haptics]");f&&(f.checked=t.haptics);const g=this.root.querySelector("[data-act=voice]"),p=this.root.querySelector("[data-act=describe]"),v=this.root.querySelector("[data-act=keys]");g&&(g.setAttribute("aria-pressed",String(t.voice)),g.setAttribute("aria-keyshortcuts",t.keys.voice)),p&&p.setAttribute("aria-pressed",String(t.audioDescription)),v&&v.setAttribute("aria-pressed",String(t.keyboard));const S=document.querySelector(".learnable-skip");S&&(S.textContent=r.skip),t.contrastMode!=="off"?this.setAttribute("contrast","high"):this.removeAttribute("contrast")}}Gn(document.currentScript instanceof HTMLScriptElement?document.currentScript:null);const ht=F&&F.tagName.toUpperCase()==="SCRIPT"&&F.src||new URL("learnable.js",document.baseURI).href;ht&&ht!==new URL("learnable.js",document.baseURI).href&&Vn(ht);let Pn=!1,se=null;function qn(){customElements.get("learnable-player")||customElements.define("learnable-player",kn),customElements.get("learnable-toolbar")||customElements.define("learnable-toolbar",Va)}function ja(){const e=document.querySelector("script[src*='learnable']"),n=e==null?void 0:e.getAttribute("data-learnable-enhance"),t=document.documentElement.dataset.learnableEnhance,r=e==null?void 0:e.getAttribute("data-learnable-lang"),a=e==null?void 0:e.getAttribute("data-learnable-voice");return{enhance:!(t==="off"||n==="false"||n==="off"),lang:r==="am"||r==="en"?r:void 0,assetBase:(e==null?void 0:e.getAttribute("data-learnable-base"))||void 0,voice:a==="on"||a==="off"?a:void 0}}function Ka(){var e;if(!Te("toolbar")||!Ne().toolbar||document.documentElement.dataset.learnableToolbar==="page"){se==null||se.remove(),se=null;return}document.querySelector("learnable-toolbar")||(se=document.createElement("learnable-toolbar"),se.dataset.auto="true",(e=document.body)==null||e.append(se))}function Bn(e={}){const n=ja(),t=e.enhance!==void 0?e.enhance:n.enhance;Mr({...n,...e,enhance:t}),jn(e.assetBase||n.assetBase),qn(),Q(x()),Ka(),t!==!1&&Qr(),Ua(),document.querySelectorAll("learnable-player").forEach(r=>{r instanceof kn&&r.refresh()}),Pn=!0,window.dispatchEvent(new CustomEvent("learnable-ready",{detail:{settings:x(),features:Ne()}}))}function ft(){const e=an();E(e),Bn()}function $n(e={}){return Bn(e),pt}function On(){const e=Dr();return ra(),Q(e),e}const pt={init:$n,boot:ft,reset:On,getSettings:x,setSettings(e){const n=E(e);return Q(n),n},getFeatures:Ne,clearRepairs:Vr,setSignDictionary(e){da(e)},version:"0.3.0"};if(typeof window<"u"){window.LearnAble=pt,qn();const e=()=>{Pn||ft()};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e):e()}return O.boot=ft,O.default=pt,O.init=$n,O.reset=On,Object.defineProperties(O,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}}),O})({});typeof LearnAble<"u"&&LearnAble.default&&(window.LearnAble=LearnAble.default);
//# sourceMappingURL=learnable.js.map
