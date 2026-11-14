var LearnAble=(function(F){"use strict";var Ma=Object.defineProperty;var Ia=(F,V,j)=>V in F?Ma(F,V,{enumerable:!0,configurable:!0,writable:!0,value:j}):F[V]=j;var T=(F,V,j)=>Ia(F,typeof V!="symbol"?V+"":V,j);let V="",j="";function Bn(e){e!=null&&e.src&&(V=new URL(".",e.src).href)}function $n(e){e&&(j=new URL(e,document.baseURI).href,j.endsWith("/")||(j+="/"))}function Pn(){return j||V||new URL("/",document.baseURI).href}function H(e){return!e||e==="false"||/^(https?:|data:|blob:)/i.test(e)?e:e.startsWith("/")?new URL(e,document.baseURI).href:new URL(e,Pn()).href}const we={segments:[{start:0,end:5.19,en:"Hana opens her lesson on a phone in Addis Ababa.",am:"ሃና ትምህርቷን በአዲስ አበባ በስልኳ ትከፍታለች።",ad:"A phone is drawn on a paper-coloured screen, with a short caption under it.",gloss:"OPEN"},{start:5.19,end:11.702,en:"She needs English and Amharic captions she can make larger.",am:"የእንግሊዝኛ እና የአማርኛ ጽሑፍ መግለጫዎችን ማተለቅ ትፈልጋለች።",ad:"The caption bar grows taller. The letters are yellow on a black band.",gloss:"LARGER"},{start:11.702,end:22.036,en:"A sign window can move and grow, so Ethiopian Sign Language sits where she needs it.",am:"የምልክት መስኮቱን ማንቀሳቀስና ማተለቅ ትችላለች። የኢትዮጵያ የምልክት ቋንቋ የምትፈልገውን ቦታ ይይዛል።",ad:"A second window lifts off the phone. It is labelled Ethiopian Sign Language.",gloss:"SIGN"},{start:22.036,end:28.919,en:"Audio description says what the picture is doing, for a learner who cannot see it.",am:"የድምጽ መግለጫ ሥዕሉ ምን እንደሚያደርግ ይናገራል። ለማያየው ተማሪ ነው።",ad:"A round speaker icon appears beside the phone.",gloss:"SPEAK"},{start:28.919,end:36.761,en:"When the network is slow she keeps a small pack: sound, text, and a light page.",am:"ኔትወርኩ ሲዘገይ ትንሽ ጥቅል ታስቀምጣለች። ድምጽ፣ ጽሑፍ፣ እና ቀላል ገጽ።",ad:"The phone is replaced by a short stack of pages and a sound file.",gloss:"PACK"},{start:36.761,end:43.179,en:"The lesson on this page is the same one, with the network or without it.",am:"በዚህ ገጽ ላይ ያለው ትምህርት አንድ ነው። ኔትወርክ ቢኖርም ባይኖርም።",ad:"The stack of pages stays in the centre of the screen.",gloss:"SAME"}],chat:[{time:.4,speaker:"Facilitator",text:"We are watching together. Captions are on."},{time:5.590000000000001,speaker:"Hana",text:"Please make the Amharic text larger."},{time:12.102,speaker:"Facilitator",text:"Move the sign window if it covers the caption."},{time:22.436,speaker:"Yonas",text:"I will turn on audio description."},{time:29.319,speaker:"Hana",text:"I am saving the small pack before the network drops."},{time:37.161,speaker:"Facilitator",text:"The text page matches what you just heard."}]},bt=[{id:"caption-partner",title:"Caption partner",titleAm:"የንዑስ ጽሑፍ አጋር",org:"Bole Open Classroom",place:"Addis Ababa",time:"Part time",access:"The summary is on the card, and the same words can be spoken. This card is a fictional demo.",summary:"Bole Open Classroom is hiring a caption partner in Addis Ababa. The work is part time. You write English and Amharic captions for short lessons. You need a careful ear and a phone that can play audio. This card is a fictional demo for the hackathon, so an employer can hear how a job summary sounds."},{id:"caption-intern",title:"Caption intern",titleAm:"የንዑስ ጽሑፍ ልምምድ",org:"Community radio",place:"Bahir Dar",time:"Sample stipend",access:"Deaf applicants are welcome in this story. Ethiopian Sign Language is used in the newsroom two days a week. Fictional demo.",summary:"Turn recorded Amharic shows into captions. A senior editor checks every file. This card is a fictional demo, so the stipend is not a real offer."},{id:"pdf-maker",title:"Accessible PDF maker",titleAm:"ተደራሽ ፒዲኤፍ አዘጋጅ",org:"Training desk",place:"Remote, sized for 3G",time:"Sample contract",access:"The work can be done from a downloaded pack. Live video meetings are not required. Fictional demo.",summary:"Add image descriptions and tags to training documents that already exist. This card is a fictional demo, so the contract is not a real offer."}],gt={publicKey:{crv:"Ed25519",x:"UXNpzoUhtt_tIteTXTiCYkiF4KBKlRyXYLi4Y3vyQdY",kty:"OKP"},jwt:"eyJhbGciOiJFZERTQSIsInR5cCI6InZjK2p3dCIsImtpZCI6ImxlYXJuYWJsZS1kZW1vIn0.eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvbnMvY3JlZGVudGlhbHMvdjIiLCJodHRwczovL3B1cmwuaW1zZ2xvYmFsLm9yZy9zcGVjL29iL3YzcDAvY29udGV4dC0zLjAuMy5qc29uIl0sInR5cGUiOlsiVmVyaWZpYWJsZUNyZWRlbnRpYWwiLCJPcGVuQmFkZ2VDcmVkZW50aWFsIl0sImlzc3VlciI6eyJpZCI6Imh0dHBzOi8vbGVhcm5hYmxlLmxvY2FsL2lzc3VlciIsInR5cGUiOlsiUHJvZmlsZSJdLCJuYW1lIjoiTGVhcm5BYmxlIGRlbW8ifSwidmFsaWRGcm9tIjoiMjAyNi0xMS0xNVQwMDowMDowMFoiLCJuYW1lIjoiQWNjZXNzaWJsZSBtZWRpYSwgZGVtbyBsZXNzb24iLCJjcmVkZW50aWFsU3ViamVjdCI6eyJ0eXBlIjpbIkFjaGlldmVtZW50U3ViamVjdCJdLCJuYW1lIjoiSGFuYSBCZWtlbGUiLCJpZGVudGlmaWVyIjoiaGFuYS1kZW1vLTIwMjYiLCJhY2hpZXZlbWVudCI6eyJpZCI6Imh0dHBzOi8vbGVhcm5hYmxlLmxvY2FsL2FjaGlldmVtZW50cy9hY2Nlc3NpYmxlLW1lZGlhLWRlbW8iLCJ0eXBlIjpbIkFjaGlldmVtZW50Il0sIm5hbWUiOiJBY2Nlc3NpYmxlIG1lZGlhLCBkZW1vIGxlc3NvbiIsImRlc2NyaXB0aW9uIjoiQ29tcGxldGVkIHRoZSBMZWFybkFibGUgZGVtbyBvbiBjYXB0aW9ucywgc2lnbiwgYXVkaW8gZGVzY3JpcHRpb24sIGFuZCB0aGUgb2ZmbGluZSBwYWNrLiJ9fX0.v-8f4fVY60MgLeFQY6uJv6gwqqBQdcJijKgEjRh_sxwvqfcMjaFOV1V3WDLrETBkIKTr5UeChmFH4OPP-ZAlCw"};function Dn(e){const n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",t=e.replace(/-/g,"+").replace(/_/g,"/").replace(/=+$/,""),r=new Uint8Array(Math.floor(t.length*3/4));let a=0,o=0,i=0;for(const s of t){const l=n.indexOf(s);if(l<0)return new Uint8Array;a=a<<6|l,o+=6,o>=8&&(o-=8,r[i]=a>>o&255,i+=1)}return r.subarray(0,i)}async function yt(e=gt.jwt,n=gt.publicKey){const[t,r,a]=e.split(".");if(!t||!r||!a)return!1;const o=await crypto.subtle.importKey("jwk",n,{name:"Ed25519"},!1,["verify"]),i=new TextEncoder().encode(`${t}.${r}`);return crypto.subtle.verify({name:"Ed25519"},o,Dn(a),i)}var P=Uint8Array,R=Uint16Array,Re=Int32Array,Ne=new P([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),Fe=new P([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),vt=new P([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),xt=function(e,n){for(var t=new R(31),r=0;r<31;++r)t[r]=n+=1<<e[r-1];for(var a=new Re(t[30]),r=1;r<30;++r)for(var o=t[r];o<t[r+1];++o)a[o]=o-t[r]<<5|r;return{b:t,r:a}},wt=xt(Ne,2),Rn=wt.b,He=wt.r;Rn[28]=258,He[258]=28;for(var Nn=xt(Fe,0),At=Nn.r,Ve=new R(32768),w=0;w<32768;++w){var X=(w&43690)>>1|(w&21845)<<1;X=(X&52428)>>2|(X&13107)<<2,X=(X&61680)>>4|(X&3855)<<4,Ve[w]=((X&65280)>>8|(X&255)<<8)>>1}for(var pe=(function(e,n,t){for(var r=e.length,a=0,o=new R(n);a<r;++a)e[a]&&++o[e[a]-1];var i=new R(n);for(a=1;a<n;++a)i[a]=i[a-1]+o[a-1]<<1;var s;if(t){s=new R(1<<n);var l=15-n;for(a=0;a<r;++a)if(e[a])for(var d=a<<4|e[a],c=n-e[a],u=i[e[a]-1]++<<c,p=u|(1<<c)-1;u<=p;++u)s[Ve[u]>>l]=d}else for(s=new R(r),a=0;a<r;++a)e[a]&&(s[a]=Ve[i[e[a]-1]++]>>15-e[a]);return s}),re=new P(288),w=0;w<144;++w)re[w]=8;for(var w=144;w<256;++w)re[w]=9;for(var w=256;w<280;++w)re[w]=7;for(var w=280;w<288;++w)re[w]=8;for(var Ae=new P(32),w=0;w<32;++w)Ae[w]=5;var Fn=pe(re,9,0),Hn=pe(Ae,5,0),kt=function(e){return(e+7)/8|0},St=function(e,n,t){return(t==null||t>e.length)&&(t=e.length),new P(e.subarray(n,t))},Vn=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],ke=function(e,n,t){var r=new Error(n||Vn[e]);if(r.code=e,Error.captureStackTrace&&Error.captureStackTrace(r,ke),!t)throw r;return r},J=function(e,n,t){t<<=n&7;var r=n/8|0;e[r]|=t,e[r+1]|=t>>8},me=function(e,n,t){t<<=n&7;var r=n/8|0;e[r]|=t,e[r+1]|=t>>8,e[r+2]|=t>>16},Oe=function(e,n){for(var t=[],r=0;r<e.length;++r)e[r]&&t.push({s:r,f:e[r]});var a=t.length,o=t.slice();if(!a)return{t:Tt,l:0};if(a==1){var i=new P(t[0].s+1);return i[t[0].s]=1,{t:i,l:1}}t.sort(function(I,B){return I.f-B.f}),t.push({s:-1,f:25001});var s=t[0],l=t[1],d=0,c=1,u=2;for(t[0]={s:-1,f:s.f+l.f,l:s,r:l};c!=a-1;)s=t[t[d].f<t[u].f?d++:u++],l=t[d!=c&&t[d].f<t[u].f?d++:u++],t[c++]={s:-1,f:s.f+l.f,l:s,r:l};for(var p=o[0].s,r=1;r<a;++r)o[r].s>p&&(p=o[r].s);var g=new R(p+1),f=We(t[c-1],g,0);if(f>n){var r=0,y=0,b=f-n,x=1<<b;for(o.sort(function(B,E){return g[E.s]-g[B.s]||B.f-E.f});r<a;++r){var S=o[r].s;if(g[S]>n)y+=x-(1<<f-g[S]),g[S]=n;else break}for(y>>=b;y>0;){var L=o[r].s;g[L]<n?y-=1<<n-g[L]++-1:++r}for(;r>=0&&y;--r){var A=o[r].s;g[A]==n&&(--g[A],++y)}f=n}return{t:new P(g),l:f}},We=function(e,n,t){return e.s==-1?Math.max(We(e.l,n,t+1),We(e.r,n,t+1)):n[e.s]=t},Et=function(e){for(var n=e.length;n&&!e[--n];);for(var t=new R(++n),r=0,a=e[0],o=1,i=function(l){t[r++]=l},s=1;s<=n;++s)if(e[s]==a&&s!=n)++o;else{if(!a&&o>2){for(;o>138;o-=138)i(32754);o>2&&(i(o>10?o-11<<5|28690:o-3<<5|12305),o=0)}else if(o>3){for(i(a),--o;o>6;o-=6)i(8304);o>2&&(i(o-3<<5|8208),o=0)}for(;o--;)i(a);o=1,a=e[s]}return{c:t.subarray(0,r),n}},be=function(e,n){for(var t=0,r=0;r<n.length;++r)t+=e[r]*n[r];return t},Ct=function(e,n,t){var r=t.length,a=kt(n+2);e[a]=r&255,e[a+1]=r>>8,e[a+2]=e[a]^255,e[a+3]=e[a+1]^255;for(var o=0;o<r;++o)e[a+o+4]=t[o];return(a+4+r)*8},Lt=function(e,n,t,r,a,o,i,s,l,d,c){J(n,c++,t),++a[256];for(var u=Oe(a,15),p=u.t,g=u.l,f=Oe(o,15),y=f.t,b=f.l,x=Et(p),S=x.c,L=x.n,A=Et(y),I=A.c,B=A.n,E=new R(19),h=0;h<S.length;++h)++E[S[h]&31];for(var h=0;h<I.length;++h)++E[I[h]&31];for(var m=Oe(E,7),C=m.t,te=m.l,N=19;N>4&&!C[vt[N-1]];--N);var de=d+5<<3,O=be(a,re)+be(o,Ae)+i,W=be(a,p)+be(o,y)+i+14+3*N+be(E,C)+2*E[16]+3*E[17]+7*E[18];if(l>=0&&de<=O&&de<=W)return Ct(n,c,e.subarray(l,l+d));var K,q,U,ne;if(J(n,c,1+(W<O)),c+=2,W<O){K=pe(p,g,0),q=p,U=pe(y,b,0),ne=y;var ht=pe(C,te,0);J(n,c,L-257),J(n,c+5,B-1),J(n,c+10,N-4),c+=14;for(var h=0;h<N;++h)J(n,c+3*h,C[vt[h]]);c+=3*N;for(var z=[S,I],xe=0;xe<2;++xe)for(var he=z[xe],h=0;h<he.length;++h){var Z=he[h]&31;J(n,c,ht[Z]),c+=C[Z],Z>15&&(J(n,c,he[h]>>5&127),c+=he[h]>>12)}}else K=Fn,q=re,U=Hn,ne=Ae;for(var h=0;h<s;++h){var $=r[h];if($>255){var Z=$>>18&31;me(n,c,K[Z+257]),c+=q[Z+257],Z>7&&(J(n,c,$>>23&31),c+=Ne[Z]);var fe=$&31;me(n,c,U[fe]),c+=ne[fe],fe>3&&(me(n,c,$>>5&8191),c+=Fe[fe])}else me(n,c,K[$]),c+=q[$]}return me(n,c,K[256]),c+q[256]},On=new Re([65540,131080,131088,131104,262176,1048704,1048832,2114560,2117632]),Tt=new P(0),Wn=function(e,n,t,r,a,o){var i=o.z||e.length,s=new P(r+i+5*(1+Math.ceil(i/7e3))+a),l=s.subarray(r,s.length-a),d=o.l,c=(o.r||0)&7;if(n){c&&(l[0]=o.r>>3);for(var u=On[n-1],p=u>>13,g=u&8191,f=(1<<t)-1,y=o.p||new R(32768),b=o.h||new R(f+1),x=Math.ceil(t/3),S=2*x,L=function(mt){return(e[mt]^e[mt+1]<<x^e[mt+2]<<S)&f},A=new Re(25e3),I=new R(288),B=new R(32),E=0,h=0,m=o.i||0,C=0,te=o.w||0,N=0;m+2<i;++m){var de=L(m),O=m&32767,W=b[de];if(y[O]=W,b[de]=O,te<=m){var K=i-m;if((E>7e3||C>24576)&&(K>423||!d)){c=Lt(e,l,0,A,I,B,h,C,N,m-N,c),C=E=h=0,N=m;for(var q=0;q<286;++q)I[q]=0;for(var q=0;q<30;++q)B[q]=0}var U=2,ne=0,ht=g,z=O-W&32767;if(K>2&&de==L(m-z))for(var xe=Math.min(p,K)-1,he=Math.min(32767,m),Z=Math.min(258,K);z<=he&&--ht&&O!=W;){if(e[m+U]==e[m+U-z]){for(var $=0;$<Z&&e[m+$]==e[m+$-z];++$);if($>U){if(U=$,ne=z,$>xe)break;for(var fe=Math.min(z,$-2),Tn=0,q=0;q<fe;++q){var ft=m-z+q&32767,Ta=y[ft],Mn=ft-Ta&32767;Mn>Tn&&(Tn=Mn,W=ft)}}}O=W,W=y[O],z+=O-W&32767}if(ne){A[C++]=268435456|He[U]<<18|At[ne];var In=He[U]&31,qn=At[ne]&31;h+=Ne[In]+Fe[qn],++I[257+In],++B[qn],te=m+U,++E}else A[C++]=e[m],++I[e[m]]}}for(m=Math.max(m,te);m<i;++m)A[C++]=e[m],++I[e[m]];c=Lt(e,l,d,A,I,B,h,C,N,m-N,c),d||(o.r=c&7|l[c/8|0]<<3,c-=7,o.h=b,o.p=y,o.i=m,o.w=te)}else{for(var m=o.w||0;m<i+d;m+=65535){var pt=m+65535;pt>=i&&(l[c/8|0]=d,pt=i),c=Ct(l,c+1,e.subarray(m,pt))}o.i=i}return St(s,0,r+kt(c)+a)},Un=(function(){for(var e=new Int32Array(256),n=0;n<256;++n){for(var t=n,r=9;--r;)t=(t&1&&-306674912)^t>>>1;e[n]=t}return e})(),jn=function(){var e=-1;return{p:function(n){for(var t=e,r=0;r<n.length;++r)t=Un[t&255^n[r]]^t>>>8;e=t},d:function(){return~e}}},Gn=function(e,n,t,r,a){if(!a&&(a={l:1},n.dictionary)){var o=n.dictionary.subarray(-32768),i=new P(o.length+e.length);i.set(o),i.set(e,o.length),e=i,a.w=o.length}return Wn(e,n.level==null?6:n.level,n.mem==null?a.l?Math.ceil(Math.max(8,Math.min(13,Math.log(e.length)))*1.5):20:12+n.mem,t,r,a)},Mt=function(e,n){var t={};for(var r in e)t[r]=e[r];for(var r in n)t[r]=n[r];return t},M=function(e,n,t){for(;t;++n)e[n]=t,t>>>=8};function Yn(e,n){return Gn(e,n||{},0,0)}var It=function(e,n,t,r){for(var a in e){var o=e[a],i=n+a,s=r;Array.isArray(o)&&(s=Mt(r,o[1]),o=o[0]),ArrayBuffer.isView(o)?t[i]=[o,s]:(t[i+="/"]=[new P(0),s],It(o,i,t,r))}},qt=typeof TextEncoder<"u"&&new TextEncoder,Kn=typeof TextDecoder<"u"&&new TextDecoder,zn=0;try{Kn.decode(Tt,{stream:!0}),zn=1}catch{}function Bt(e,n){var t;if(qt)return qt.encode(e);for(var r=e.length,a=new P(e.length+(e.length>>1)),o=0,i=function(d){a[o++]=d},t=0;t<r;++t){if(o+5>a.length){var s=new P(o+8+(r-t<<1));s.set(a),a=s}var l=e.charCodeAt(t);l<128||n?i(l):l<2048?(i(192|l>>6),i(128|l&63)):l>55295&&l<57344?(l=65536+(l&1047552)|e.charCodeAt(++t)&1023,i(240|l>>18),i(128|l>>12&63),i(128|l>>6&63),i(128|l&63)):(i(224|l>>12),i(128|l>>6&63),i(128|l&63))}return St(a,0,o)}var Ue=function(e){var n=0;if(e)for(var t in e){var r=e[t].length;r>65535&&ke(9),n+=r+4}return n},$t=function(e,n,t,r,a,o,i,s){var l=r.length,d=t.extra,c=s&&s.length,u=Ue(d);M(e,n,i!=null?33639248:67324752),n+=4,i!=null&&(e[n++]=20,e[n++]=t.os),e[n]=20,n+=2,e[n++]=t.flag<<1|(o<0&&8),e[n++]=a&&8,e[n++]=t.compression&255,e[n++]=t.compression>>8;var p=new Date(t.mtime==null?Date.now():t.mtime),g=p.getFullYear()-1980;if((g<0||g>119)&&ke(10),M(e,n,g<<25|p.getMonth()+1<<21|p.getDate()<<16|p.getHours()<<11|p.getMinutes()<<5|p.getSeconds()>>1),n+=4,o!=-1&&(M(e,n,t.crc),M(e,n+4,o<0?-o-2:o),M(e,n+8,t.size)),M(e,n+12,l),M(e,n+14,u),n+=16,i!=null&&(M(e,n,c),M(e,n+6,t.attrs),M(e,n+10,i),n+=14),e.set(r,n),n+=l,u)for(var f in d){var y=d[f],b=y.length;M(e,n,+f),M(e,n+2,b),e.set(y,n+4),n+=4+b}return c&&(e.set(s,n),n+=c),n},Zn=function(e,n,t,r,a){M(e,n,101010256),M(e,n+8,t),M(e,n+10,t),M(e,n+12,r),M(e,n+16,a)};function Jn(e,n){n||(n={});var t={},r=[];It(e,"",t,n);var a=0,o=0;for(var i in t){var s=t[i],l=s[0],d=s[1],c=d.level==0?0:8,u=Bt(i),p=u.length,g=d.comment,f=g&&Bt(g),y=f&&f.length,b=Ue(d.extra);p>65535&&ke(11);var x=c?Yn(l,d):l,S=x.length,L=jn();L.p(l),r.push(Mt(d,{size:l.length,crc:L.d(),c:x,f:u,m:f,u:p!=i.length||f&&g.length!=y,o:a,compression:c})),a+=30+p+b+S,o+=76+2*(p+b)+(y||0)+S}for(var A=new P(o+22),I=a,B=o-a,E=0;E<r.length;++E){var u=r[E];$t(A,u.o,u,u.f,u.u,u.c.length);var h=30+u.f.length+Ue(u.extra);A.set(u.c,u.o+h),$t(A,a,u,u.f,u.u,u.c.length,u.o,u.m),a+=16+h+(u.m?u.m.length:0)}return Zn(A,a,r.length,B,I),A}const Xn=`# Ethiopic-G1
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
`,_n=` A1B'K2L@CIF/MSP"E3H9O6R^DJG>NTQ,*5<-U8V.%[$+X!&;:4\\0Z7(_?W]#Y)=`,Qn="JABCDEFGHI",er={".":"4",",":"1","?":"8","!":"6","'":"'","-":"-",":":"3",";":"2"};function tr(e){return e<0||e>63?"?":_n[e]??"?"}function nr(e){let n=0;for(const t of e){const r=Number(t);r>=1&&r<=6&&(n|=1<<r-1)}return n}function rr(e){const n=new Map;for(const t of e.split(/\r?\n/)){const r=/^(?:letter|punctuation)\s+\\x([0-9A-Fa-f]+)\s+(\S+)/.exec(t.trim());if(!r)continue;const a=Number.parseInt(r[1],16);n.set(a,r[2].split("-").map(nr))}return n}const ar=rr(Xn);function or(e){let n="",t=!1;for(const r of e){const a=r.codePointAt(0)??0,o=ar.get(a);if(o){t=!1,n+=o.map(tr).join("");continue}if(r===`
`){t=!1,n+=`
`;continue}if(r===" "){t=!1,n+=" ";continue}if(/[0-9]/.test(r)){t||(n+="#",t=!0),n+=Qn[Number(r)];continue}if(t=!1,/[a-z]/.test(r)){n+=r.toUpperCase();continue}if(/[A-Z]/.test(r)){n+=`,${r}`;continue}n+=er[r]??"?"}return n}function je(e,n=40){const t=or(e),r=[];for(const a of t.split(`
`)){const o=a.split(" ");let i="";for(const s of o){if(!i){i=s;continue}i.length+1+s.length<=n?i+=` ${s}`:(r.push(i),i=s)}i&&r.push(i)}return`${r.join(`
`)}
`}const ir='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" role="img"><title>A navy phone on a paper background, with an English and Amharic caption under the screen.</title><rect width="640" height="480" fill="#f2f0ea"/><rect x="230" y="40" width="180" height="320" rx="28" fill="#ffffff" stroke="#1b3048" stroke-width="8"/><rect x="254" y="72" width="132" height="210" rx="6" fill="#f2f0ea" stroke="#1b3048" stroke-width="3"/><rect x="120" y="390" width="400" height="36" fill="#111111"/><rect x="140" y="400" width="160" height="8" fill="#ffee00"/></svg>',sr="A navy phone on a paper background, with an English and Amharic caption under the screen.";function lr(e,n,t,r){const a=e.split(`
`).filter(Boolean),o=n.split(`
`).filter(Boolean),i=a.map((s,l)=>`<section><h2>${s}</h2>${o[l]?`<p lang="am">${o[l]}</p>`:""}</section>`).join("");return`<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><title>LearnAble light lesson</title></head><body><main><h1>LearnAble light lesson</h1><p>Sound, text, and this page. The video is not in the pack.</p><figure><img src="lesson-figure.svg" alt="${sr}"></figure><h2>English</h2>${r?'<audio controls src="lesson-en.wav"></audio>':"<p>The narration file was not on this host.</p>"}<h2 lang="am">አማርኛ</h2>${r?'<audio controls src="lesson-am.wav"></audio>':""}${i}${t?`<h2>Audio description</h2><p>${t}</p>`:""}</main></body></html>`}async function Pt(e){if(!e)return null;try{const n=await fetch(e);return n.ok?new Uint8Array(await n.arrayBuffer()):null}catch{return null}}async function cr(e){const n=await Pt(e.audioEn),t=await Pt(e.audioAm),r={"index.html":new TextEncoder().encode(lr(e.english,e.amharic,e.descriptions||"",!!(n||t))),"lesson-figure.svg":new TextEncoder().encode(ir),"transcript-en.brf":new TextEncoder().encode(je(e.english)),"transcript-am.brf":new TextEncoder().encode(je(e.amharic))};return n&&(r["lesson-en.wav"]=n),t&&(r["lesson-am.wav"]=t),{bytes:Jn(r),audio:!!(n||t)}}function _(e,n,t){const r=new Blob([Uint8Array.from(e)],{type:t}),a=URL.createObjectURL(r),o=document.createElement("a");o.href=a,o.download=n,document.body.append(o),o.click(),o.remove(),URL.revokeObjectURL(a)}async function ur(e,n,t){var r;try{const o=await import(H("/learnable/espeak/speak.js")),i=o.speak||((r=o.default)==null?void 0:r.speak);return typeof i!="function"?!1:(await i(e,n,t),!0)}catch{return!1}}let Se=0,Ge=!1,le=null,Dt=!1,Rt=!1;function Nt(){var e;return typeof window<"u"&&"speechSynthesis"in window&&typeof((e=window.speechSynthesis)==null?void 0:e.speak)=="function"}function Ft(){var e;Ge=!0;try{(e=window.speechSynthesis)==null||e.resume()}catch{}}function dr(){if(!Ge||!le)return;const e=le;le=null,Ot(e.text,e.lang,e.hooks)}function Ht(e){return e.toLowerCase().slice(0,2)}function hr(e){var t,r;return(((r=(t=window.speechSynthesis)==null?void 0:t.getVoices)==null?void 0:r.call(t))??[]).find(a=>a.lang.toLowerCase().startsWith(Ht(e)))}function Vt(e){if(Dt)return;Dt=!0;const n=document.getElementById("learnable-reader-live");if(!n)return;const t=Ht(e)==="am"?"Amharic":e;n.textContent=`No ${t} voice in this browser. The optional eSpeak file is not on this site, so this line stays on screen.`}function fr(e,n,t){var r,a;e!==Se||t?(r=n.oncancel)==null||r.call(n):(a=n.onend)==null||a.call(n)}async function Ot(e,n,t){var u,p,g,f,y,b;const r=++Se,a=Math.min(2,Math.max(.5,t.rate??1)),o=Math.min(2,Math.max(0,t.pitch??1));try{(u=window.speechSynthesis)==null||u.cancel()}catch{}const i=((g=(p=window.speechSynthesis)==null?void 0:p.getVoices)==null?void 0:g.call(p))??[],s=hr(n);if(!s&&i.length>0){const x=await ur(e,n,a);if(r!==Se){(f=t.oncancel)==null||f.call(t);return}if(x){(y=t.onend)==null||y.call(t);return}Vt(n)}if(!Nt()){s||Vt(n),(b=t.onend)==null||b.call(t);return}const l=new SpeechSynthesisUtterance(e);l.lang=n.startsWith("am")?"am":n,l.rate=a,l.pitch=o;try{s&&(l.voice=s)}catch{}let d=!1;const c=x=>{d||(d=!0,fr(r,t,x))};l.onend=()=>c(!1),l.onerror=()=>c(!0),window.speechSynthesis.speak(l)}function ge(e,n,t=1,r={}){var i,s;const a=e.replace(/\s+/g," ").trim();if(!a)return;const o={text:a,lang:n,hooks:{...r,rate:r.rate??t}};if(!Rt&&Nt()&&(Rt=!0,(s=(i=window.speechSynthesis).addEventListener)==null||s.call(i,"voiceschanged",()=>{window.speechSynthesis.getVoices()}),window.speechSynthesis.getVoices()),!Ge){le=o;return}le=null,Ot(o.text,o.lang,o.hooks)}function Ee(){var e;Se+=1,le=null;try{(e=window.speechSynthesis)==null||e.cancel()}catch{}}function Wt(e){const n=/^(?:(\d+):)?(\d{2}):(\d{2})\.(\d{3})$/.exec(e.trim());if(!n)throw new Error(`Bad WebVTT timestamp: ${e}`);const t=Number(n[1]??0),r=Number(n[2]),a=Number(n[3]),o=Number(n[4]);return t*3600+r*60+a+o/1e3}function pr(e){var a;const n=e.replace(/^\uFEFF/,"").split(/\r?\n/),t=[];let r=0;if((a=n[0])!=null&&a.startsWith("WEBVTT"))for(r=1;r<n.length&&n[r].trim()!=="";)r+=1;for(;r<n.length;){if(n[r].trim()===""){r+=1;continue}let o=n[r];!o.includes("-->")&&r+1<n.length&&(r+=1,o=n[r]);const i=o.split("-->");if(i.length<2){r+=1;continue}const s=Wt(i[0]),l=i[1].trim().split(/\s+/)[0],d=Wt(l);r+=1;const c=[];for(;r<n.length&&n[r].trim()!=="";)c.push(n[r]),r+=1;t.push({start:s,end:d,text:c.join(`
`)})}return t}function Ut(e){const n=Math.max(0,Math.round(e*1e3)),t=Math.floor(n/36e5),r=Math.floor(n%36e5/6e4),a=Math.floor(n%6e4/1e3),o=n%1e3;return`${String(t).padStart(2,"0")}:${String(r).padStart(2,"0")}:${String(a).padStart(2,"0")}.${String(o).padStart(3,"0")}`}function jt(e){return`WEBVTT

${e.map(t=>`${Ut(t.start)} --> ${Ut(t.end)}
${t.text}`).join(`

`)}
`}function Gt(e,n){const t=e.find(a=>n>=a.start&&n<a.end);if(t)return t;const r=e[e.length-1];if(r&&n>=r.start&&n<=r.end+.05)return r}const Ye={en:{larger:"Larger text",contrast:"High contrast",stop:"Stop motion",read:"Read this page",stopRead:"Stop reading",language:"Language",images:"Image check",skip:"Skip to content",menu:"Menu",pipeline:"Transcript",job:"Job card",session:"Session"},am:{larger:"ትልቅ ጽሑፍ",contrast:"ከፍተኛ ንጽጽር",stop:"እንቅስቃሴ አቁም",read:"ይህን ገጽ አንብብ",stopRead:"ማንበብ አቁም",language:"ቋንቋ",images:"የምስል ምርመራ",skip:"ወደ ዋናው ይዘት ዝለል",menu:"ምናሌ",pipeline:"ጽሑፍ",job:"የስራ ካርድ",session:"ክፍለ ጊዜ"}},mr={"VA-Content-Banner.png":"A wide banner for the virtual assistant lesson.","lesson-figure.svg":"A navy phone on a paper background, with an English and Amharic caption under the screen.","poster.png":"A still frame from the lesson: a phone with a caption bar.","esl-placeholder.png":"A placeholder card where an Ethiopian Sign Language clip can be added."},Yt="Description not yet provided",Kt=mr;function zt(e){var t;const n=e.currentSrc||e.getAttribute("src")||"";return decodeURIComponent(((t=n.split("/").pop())==null?void 0:t.split("?")[0])||"")}function br(e){if(e.getAttribute("aria-hidden")==="true"||e.closest("[aria-hidden='true']"))return!0;const n=e.getAttribute("role");return n==="presentation"||n==="none"||e.getAttribute("alt")===""}function Zt(e,n){if(n===Yt||n==="Needs a description")return!0;const t=zt(e),r=t.replace(/\.[^.]+$/,"");return n===t||n===r}function Ke(e){var r;if(br(e))return null;const n=((r=e.getAttribute("alt"))==null?void 0:r.trim())??"";if(n&&!Zt(e,n))return n;const t=zt(e);return Kt[t]?Kt[t]:Yt}function gr(){document.querySelectorAll("img").forEach(e=>{var a;if(e.closest("learnable-player, learnable-toolbar"))return;const n=Ke(e);if(!n)return;const t=((a=e.getAttribute("alt"))==null?void 0:a.trim())??"";(!t||Zt(e,t))&&(e.alt=n),!e.closest("a, button, [role='link'], [role='button']")&&e.tabIndex<0&&(e.tabIndex=0,e.dataset.learnableImage="true")})}const Jt={white:{label:"White on black",fg:"#ffffff",bg:"#111111"},yellow:{label:"Yellow on black",fg:"#ffee00",bg:"#111111"},black:{label:"Black on white",fg:"#172033",bg:"#f2f0ea"},cyan:{label:"Cyan on black",fg:"#00ffff",bg:"#111111"}},ze="learnable-widget",Xt=()=>({toolbar:!0,signWindow:!0,audioDescription:!0,offlinePack:!1,braille:!1,taggedDocs:!1}),Ze=()=>({lang:"en",uiLang:"en",largeText:!1,highContrast:!1,stopMotion:!1,captionScale:1.15,captionPreset:"white",contrastMode:"off",contrastLevel:7,readRate:1,readPitch:1,readVerbosity:"sentences",haptics:!1,voice:!0,voiceChosen:!1,audioDescription:!0,keyboard:!0,keys:{heading:"h",landmark:"l",help:"?",voice:"Alt+Shift+S"},toolbarCorner:"bl",toolbarCollapsed:!1,toolbarVisited:!1});let _t=Xt(),G=Ze(),Qt="paper",Ce=!0;function Le(e){return Ce===!1?!1:Ce===!0?!0:Ce[e]!==!1}function Te(e,n){if(typeof e!="string")return n;const t=e.trim();return!t||t.length>32?n:t}function en(){try{return window.matchMedia("(prefers-reduced-motion: reduce)").matches}catch{return!1}}function tn(){const e=Ze();e.stopMotion=en();try{const n=localStorage.getItem(ze);if(!n)return e;const t=JSON.parse(n),r=t.lang==="am"?"am":t.lang==="en"?"en":e.lang,a=t.uiLang==="am"?"am":t.uiLang==="en"?"en":e.uiLang,o=t.contrastMode==="bw"||t.contrastMode==="yb"?t.contrastMode:"off",i=Math.min(10,Math.max(1,Number(t.contrastLevel)||e.contrastLevel)),s={...e.keys,...t.keys||{}};return{...e,...t,lang:r,uiLang:a,contrastMode:o,contrastLevel:i,voice:typeof t.voice=="boolean"?t.voice:e.voice,voiceChosen:t.voiceChosen===!0,audioDescription:typeof t.audioDescription=="boolean"?t.audioDescription:e.audioDescription,keyboard:t.keyboard!==!1,keys:{heading:Te(s.heading,e.keys.heading),landmark:Te(s.landmark,e.keys.landmark),help:Te(s.help,e.keys.help),voice:Te(s.voice,e.keys.voice)},toolbarCorner:t.toolbarCorner==="tl"||t.toolbarCorner==="tr"||t.toolbarCorner==="br"||t.toolbarCorner==="bl"?t.toolbarCorner:"bl",toolbarCollapsed:t.toolbarCollapsed===!0,toolbarVisited:t.toolbarVisited===!0}}catch{return e}}function v(){return{...G}}function Me(){return{..._t}}function yr(){return Qt}function Je(e){G={...e},localStorage.setItem(ze,JSON.stringify(G)),window.dispatchEvent(new CustomEvent("learnable-settings",{detail:v()}))}function k(e){const n={...v(),...e};return Je(n),v()}function vr(e={}){_t={...Xt(),...e.features},e.theme&&(Qt=e.theme),e.enhance!==void 0&&(Ce=e.enhance);const n=tn();G={...n,lang:e.lang??n.lang,uiLang:e.uiLang??n.uiLang},n.voiceChosen!==!0&&e.voice&&(G.voice=e.voice==="on",e.voice==="off"&&(G.audioDescription=!1)),Je(G)}function xr(){return localStorage.removeItem(ze),G=Ze(),G.stopMotion=en(),Je(G),v()}function nn(e,n,t){return e.hasAttribute(n)?e.getAttribute(n)!=="false":t}function wr(){if(document.documentElement.dataset.learnableProfile==="savanna")return!0;const e=location.pathname;return/savanna|with-learnable|homepage-v1|concept-with|index-learnable/.test(e)}function Ar(e){return[...document.querySelectorAll(e)].filter(n=>!n.closest("learnable-player, learnable-toolbar"))}function kr(e,n,t){const r=e.indexOf(n);if(r<0)return;e[(r+t+e.length)%e.length].focus()}function Sr(e){const n=e.target;if(!(n instanceof HTMLElement)||n.closest("learnable-player, learnable-toolbar, input, textarea, select"))return;n.classList.contains("hamburger")&&(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),n.click(),n.setAttribute("aria-expanded",document.body.classList.contains("sidebar-collapsed")?"false":"true")),e.key==="Escape"&&(document.querySelectorAll(".collapse.show").forEach(r=>{const a=document.querySelector(`[data-bs-target="#${r.id}"]`);(a==null?void 0:a.getAttribute("aria-expanded"))==="true"&&a.click()}),document.querySelectorAll(".dropdown-menu.show").forEach(r=>r.classList.remove("show")));const t=[".homepage-nav .nav-link","button[data-section-index]",".accordion-button",".dropdown-menu.show .dropdown-item"];if(!(e.key!=="ArrowRight"&&e.key!=="ArrowLeft"&&e.key!=="ArrowDown"&&e.key!=="ArrowUp"))for(const r of t){const a=Ar(r);if(a.includes(n)){e.preventDefault(),kr(a,n,e.key==="ArrowRight"||e.key==="ArrowDown"?1:-1);break}}}function Er(){const e=document.querySelector(".header");e&&!document.querySelector("header, [role='banner']")&&(e.setAttribute("role","banner"),e.setAttribute("data-learnable-repair","landmark"));const n=document.getElementById("sidebar");n&&!document.querySelector("nav, [role='navigation']")&&(n.setAttribute("role","navigation"),n.getAttribute("aria-label")||n.setAttribute("aria-label","Sidebar"),n.setAttribute("data-learnable-repair","landmark")),document.querySelectorAll(".hamburger").forEach(t=>{t.dataset.learnableKey!=="true"&&(t.dataset.learnableKey="true",t.tabIndex=0,t.setAttribute("role","button"),t.setAttribute("aria-label",Ye[v().uiLang].menu),t.setAttribute("aria-expanded",String(!document.body.classList.contains("sidebar-collapsed"))),t.setAttribute("data-learnable-repair","aria"))}),document.documentElement.dataset.learnableSavanna!=="true"&&(document.documentElement.dataset.learnableSavanna="true",document.addEventListener("keydown",Sr))}const D="data-learnable-repair";function rn(e){var i,s,l,d,c;const n=(i=e.getAttribute("aria-label"))==null?void 0:i.trim();if(n)return n;const t=e.getAttribute("aria-labelledby");if(t){const u=t.split(/\s+/).map(p=>{var g;return((g=document.getElementById(p))==null?void 0:g.textContent)||""}).join(" ").replace(/\s+/g," ").trim();if(u)return u}const r=((s=e.textContent)==null?void 0:s.replace(/\s+/g," ").trim())||"";if(r)return r;const a=(d=(l=e.querySelector("img[alt]"))==null?void 0:l.getAttribute("alt"))==null?void 0:d.trim();if(a)return a;const o=(c=e.getAttribute("title"))==null?void 0:c.trim();return o||""}function Y(e){return!!e.closest("learnable-player, learnable-toolbar, .learnable-gateway")}function an(){document.querySelectorAll("a, button, [role='button']").forEach(e=>{var o;if(Y(e)||rn(e))return;const n=(o=e.getAttribute("title"))==null?void 0:o.trim(),t=e.getAttribute("href")||"",a=t==="/"||t==="#/"||/(^|\/)home\/?$/.test(t)?"Home":e.tagName==="A"?"Link":"Button";e.setAttribute("aria-label",n||a),e.setAttribute(D,"name")}),document.querySelectorAll("input, select, textarea").forEach(e=>{var a,o,i;if(Y(e)||e.getAttribute("type")==="hidden"||e.getAttribute("aria-label")||e.closest("label"))return;const n=e.getAttribute("id");if(n&&document.querySelector(`label[for="${CSS.escape(n)}"]`))return;const t=(a=e.getAttribute("placeholder"))==null?void 0:a.trim(),r=(i=(o=e.previousElementSibling)==null?void 0:o.textContent)==null?void 0:i.replace(/\s+/g," ").trim();e.setAttribute("aria-label",t||r||e.getAttribute("name")||"Input"),e.setAttribute(D,"label")})}function on(){document.querySelectorAll("img").forEach(e=>{if(Y(e)||e.hasAttribute("alt"))return;if(!!e.closest("[aria-hidden='true']")||e.className.toString().includes("icon")||e.width>0&&e.width<8)e.alt="",e.setAttribute("role","presentation");else{e.alt="Description not yet provided";const t=document.createElement("span");t.className="learnable-alt-note",t.textContent="Description not yet provided",e.after(t)}e.setAttribute(D,"alt")})}function sn(){document.querySelectorAll("[aria-expanded]").forEach(e=>{if(Y(e))return;const n=e.getAttribute("role"),t=e.tagName;n||t==="BUTTON"||t==="A"||t==="SUMMARY"||(e.setAttribute("role","button"),e.hasAttribute("tabindex")||e.setAttribute("tabindex","0"),e.setAttribute(D,"aria"))}),document.querySelectorAll("[role='progressbar']").forEach(e=>{var t,r,a;if(Y(e)||rn(e))return;const n=(a=(r=(t=e.closest("div"))==null?void 0:t.parentElement)==null?void 0:r.textContent)==null?void 0:a.replace(/\s+/g," ").trim().slice(0,80);e.setAttribute("aria-label",n||"Progress"),e.setAttribute(D,"aria")}),document.querySelectorAll("[aria-hidden='true']").forEach(e=>{if(Y(e))return;const n=e instanceof HTMLElement?[e]:[],t=e.querySelectorAll("a, button, input, select, textarea, [tabindex]");[...n,...t].forEach(r=>{r.tabIndex>=0&&(r.tabIndex=-1),r.setAttribute(D,"aria")})}),document.querySelectorAll("span[aria-label], div[aria-label]").forEach(e=>{Y(e)||e.getAttribute("role")||(e.setAttribute("role","note"),e.setAttribute(D,"aria"))})}function ln(){document.querySelectorAll("ul, ol").forEach(e=>{Y(e)||[...e.children].forEach(n=>{if(n.tagName==="LI"||n.tagName==="SCRIPT"||n.tagName==="TEMPLATE")return;const t=document.createElement("li");n.replaceWith(t),t.append(n),t.setAttribute(D,"list")})})}function Xe(e){const n=e/255;return n<=.03928?n/12.92:((n+.055)/1.055)**2.4}function Ie(e){return .2126*Xe(e[0])+.7152*Xe(e[1])+.0722*Xe(e[2])}function ae(e,n){const t=Math.max(Ie(e),Ie(n)),r=Math.min(Ie(e),Ie(n));return(t+.05)/(r+.05)}function cn(e){const n=e.match(/rgba?\(([^)]+)\)/);if(!n)return null;const t=n[1].split(",").map(r=>Number.parseFloat(r.trim()));return t.length<3||t.some(r=>Number.isNaN(r))?null:[t[0],t[1],t[2],t[3]??1]}function Cr(e,n){const t=e[3];return[e[0]*t+n[0]*(1-t),e[1]*t+n[1]*(1-t),e[2]*t+n[2]*(1-t),1]}function Lr(e){const n=[];let t=e;for(;t;){const a=cn(getComputedStyle(t).backgroundColor);if(a&&a[3]>0&&n.push(a),a&&a[3]>=1)break;t=t.parentElement}if(n.length===0)return[255,255,255,1];let r=n[n.length-1];for(let a=n.length-2;a>=0;a-=1)r=Cr(n[a],r);return r}function _e(e,n,t){return[Math.round(e[0]+(n[0]-e[0])*t),Math.round(e[1]+(n[1]-e[1])*t),Math.round(e[2]+(n[2]-e[2])*t),1]}function Tr(e){const n=getComputedStyle(e),t=Number.parseFloat(n.fontSize),r=Number.parseInt(n.fontWeight,10)||400;return t>=24||t>=18.67&&r>=700?3:4.5}function Mr(){document.querySelectorAll("[data-learnable-repair='contrast']").forEach(e=>{e.style.removeProperty("color"),e.removeAttribute(D)})}function un(){document.documentElement.dataset.learnableContrast!=="on"&&document.querySelectorAll("a, button, span, p, h1, h2, h3, h4, li, label, div, td, th, code, small, strong, b, em").forEach(e=>{if(Y(e)||e.getAttribute(D)==="contrast"||![...e.childNodes].some(l=>{var d;return l.nodeType===Node.TEXT_NODE&&((d=l.textContent)==null?void 0:d.trim())})||e.getClientRects().length===0)return;const t=cn(getComputedStyle(e).color);if(!t)return;const r=Lr(e),a=Tr(e);if(ae(t,r)>=a)return;const o=a+.45;let i=t,s=2;for(const l of[[0,0,0],[255,255,255]]){let d=0,c=1;for(let g=0;g<10;g+=1){const f=(d+c)/2;ae(_e(t,l,f),r)>=o?c=f:d=f}let u=c,p=_e(t,l,u);for(;ae(p,r)<o&&u<1;)u=Math.min(1,u+.08),p=_e(t,l,u);ae(p,r)>=o&&u<s&&(i=p,s=u)}if(ae(i,r)<o){const l=[0,0,0,1],d=[255,255,255,1];i=ae(l,r)>=ae(d,r)?l:d}e.style.setProperty("color",`rgb(${i[0]}, ${i[1]}, ${i[2]})`,"important"),e.tagName==="A"&&e.style.setProperty("text-decoration","underline","important"),e.setAttribute(D,"contrast")})}function dn(){var t;const e=[...document.querySelectorAll("h1, h2, h3, h4, h5, h6")].filter(r=>!Y(r));let n=0;for(const r of e){const a=Number(r.tagName.slice(1));!((t=r.textContent)!=null&&t.trim())&&!r.getAttribute("aria-label")&&(r.setAttribute("aria-label","Heading"),r.setAttribute(D,"outline"));const o=n===0?1:Math.min(a,n+1);a>o?(r.setAttribute("aria-level",String(o)),r.setAttribute(D,"outline"),n=o):n=a}}function Ir(){document.querySelectorAll("[data-learnable-repair]").forEach(e=>{const n=e.getAttribute(D);(n==="name"||n==="label")&&e.removeAttribute("aria-label"),(n==="aria"||n==="landmark")&&e.removeAttribute("role"),n==="outline"&&(e.removeAttribute("aria-level"),e.getAttribute("aria-label")==="Heading"&&e.removeAttribute("aria-label")),n==="alt"&&e.removeAttribute("alt"),n==="contrast"&&(e.style.removeProperty("color"),e.style.removeProperty("text-decoration")),e.removeAttribute(D)}),document.querySelectorAll(".learnable-skip, .learnable-alt-note, #learnable-gateway").forEach(e=>e.remove())}function qr(){var e;if((e=window.matchMedia)!=null&&e.call(window,"(forced-colors: active)").matches){on(),an(),sn(),ln(),dn();return}on(),an(),sn(),ln(),dn(),un()}const Br=["captions-en","captions-am","sign","describe","audio-en","audio-am","offline","braille","docs"];function $r(e,n){for(const r of Br){const a=e.getAttribute(`data-learnable-${r}`);a!==null&&n.setAttribute(r,a)}const t=e.getAttribute("src");t&&!n.getAttribute("src")&&n.setAttribute("src",t)}function hn(e){if(e.dataset.learnableUpgraded==="true"||e.closest("learnable-player"))return;e.dataset.learnableUpgraded="true";const n=document.createElement("learnable-player");$r(e,n),n.hasAttribute("offline")||n.setAttribute("offline",""),n.hasAttribute("braille")||n.setAttribute("braille",""),n.hasAttribute("docs")||n.setAttribute("docs",""),n.hasAttribute("describe")||n.setAttribute("describe","/media/descriptions.vtt"),e.slot="media",e.replaceWith(n),n.append(e)}function Pr(){Le("media")&&(document.querySelectorAll("video, audio").forEach(e=>{e instanceof HTMLElement&&hn(e)}),document.querySelectorAll("iframe").forEach(e=>{const n=e.getAttribute("src")||"";/youtube\.com|youtu\.be|player\.vimeo\.com|vimeo\.com/.test(n)&&e instanceof HTMLElement&&hn(e)}))}function ye(e){e.setAttribute("data-learnable-repair","landmark")}function Qe(e,n){return e.id||(e.id=n),e.hasAttribute("tabindex")||(e.tabIndex=-1),`#${e.id}`}function Dr(){const e=document.querySelector("main, [role='main']");if(e)return Qe(e,"learnable-main");const n=document.querySelector("#main, #content, [role='main']");if(n)return Qe(n,n.id||"learnable-main");const t=document.querySelector("h1, h2");return t?Qe(t,"learnable-top"):"#learnable-main"}function Rr(){if(!Le("skip")||document.querySelector("a.learnable-skip, a[href='#content'], a[href='#main'], a[href='#learnable-main']"))return;const e=document.createElement("a");e.className="learnable-skip",e.href=Dr(),e.textContent=Ye[v().uiLang].skip,document.body.prepend(e)}function qe(e){const n=document.querySelector(e);return n&&!n.closest("learnable-player, learnable-toolbar")?n:null}function Nr(){if(Le("landmarks")){if(!document.querySelector("header, [role='banner']")){const e=qe("#header, #banner, .site-header, .page-header, .header");e&&(e.setAttribute("role","banner"),ye(e))}if(!document.querySelector("nav, [role='navigation']")){const e=qe("#nav, #navigation, #menu, .site-nav, .nav, .navbar, .menu");e&&(e.setAttribute("role","navigation"),e.getAttribute("aria-label")||e.setAttribute("aria-label","Site"),ye(e))}if(!document.querySelector("main, [role='main']")){const e=qe("#main, #content, article, [role='main']");if(e&&e.tagName!=="MAIN"&&e.tagName!=="ARTICLE")e.setAttribute("role","main"),ye(e);else if(!e){const n=document.querySelector("h1"),t=n==null?void 0:n.parentElement;t&&t!==document.body&&t!==document.documentElement&&(t.setAttribute("role","main"),ye(t))}}if(!document.querySelector("footer, [role='contentinfo']")){const e=qe("#footer, .site-footer, .footer");e&&(e.setAttribute("role","contentinfo"),ye(e))}}}function Fr(){return[...document.querySelectorAll("img")].filter(e=>{var n;return!e.hasAttribute("alt")||e.getAttribute("alt")===((n=e.getAttribute("src"))==null?void 0:n.split("/").pop())})}function et(){const e=Fr();if(e.length===0)return"Every image on this page has a text alternative.";const n=e.slice(0,8).map(t=>t.currentSrc||t.getAttribute("src")||"image");return`${e.length} image${e.length===1?"":"s"} need a description. Nothing was sent off this page. ${n.join(" ")}`}function Hr(){var a,o,i;if(document.getElementById("learnable-gateway"))return;const e=document.querySelector("main")||document.body,n=bt[0],t=document.createElement("section");t.id="learnable-gateway",t.className="learnable-gateway",t.setAttribute("aria-label","LearnAble lesson tools");const r=we.chat.map(s=>`<li>${s.speaker}: ${s.text}</li>`).join("");t.innerHTML=`
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
  `,e.append(t),t.querySelectorAll("[data-vtt]").forEach(s=>{s.addEventListener("click",()=>{const l=s.dataset.vtt==="am",d=we.segments.map(u=>({start:u.start,end:u.end,text:l?u.am:u.en}));_(new TextEncoder().encode(jt(d)),l?"captions-am.vtt":"captions-en.vtt","text/vtt");const c=t.querySelector("[data-pipeline-note]");c&&(c.textContent=l?"Amharic captions downloaded from the sample lesson.":"English captions downloaded from the sample lesson.")})}),(a=t.querySelector("[data-pipeline-file]"))==null||a.addEventListener("change",()=>{var d,c;const s=(c=(d=t.querySelector("[data-pipeline-file]"))==null?void 0:d.files)==null?void 0:c[0],l=t.querySelector("[data-pipeline-note]");!s||!l||s.text().then(u=>{const p=we.segments.find(g=>u.includes(g.en));l.textContent=p?`Sample translation: ${p.am}`:"No translation service is running, and this text is not in the sample lesson."})}),(o=t.querySelector("[data-job]"))==null||o.addEventListener("click",()=>{var s;ge(((s=t.querySelector("[data-job-summary]"))==null?void 0:s.textContent)||"","en")}),(i=t.querySelector("[data-badge]"))==null||i.addEventListener("click",()=>{const s=t.querySelector("[data-cert]");yt().then(l=>{s&&(s.textContent=l?"The certificate proof matches the published public key.":"The certificate proof does not match.")})})}function Vr(){if(Pr(),Rr(),Nr(),wr()&&Er(),Hr(),!document.getElementById("learnable-reader-live")){const e=document.createElement("p");e.id="learnable-reader-live",e.setAttribute("role","status"),document.body.append(e)}qr(),gr()}function Or(e){var t;return(t=document.querySelector("script[src*='learnable']"))==null?void 0:t.getAttribute("data-learnable-api"),et()}function Be(e,n,t){const r=s=>[0,2,4].map(l=>Number.parseInt(s.slice(l,l+2),16)),a=r(e.replace("#","")),o=r(n.replace("#",""));return`#${a.map((s,l)=>Math.round(s+(o[l]-s)*t)).map(s=>s.toString(16).padStart(2,"0")).join("")}`}function Wr(e,n){const r=(Math.min(10,Math.max(1,Math.round(n)))-1)/9;return e==="yb"?{bg:Be("16140c","12100c",r),fg:Be("e6c200","ffe566",r),focus:"#ffffff"}:{bg:Be("1c1c1c","121212",r),fg:Be("e6e6e6","f2f2f2",r),focus:"#ffe14a"}}const tt="learnable-host-adjust";function Ur(e){var a;const t=typeof window<"u"&&((a=window.matchMedia)==null?void 0:a.call(window,"(forced-colors: active)").matches)||e.contrastMode==="off"?null:Wr(e.contrastMode,e.contrastLevel);return`
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
`}function Q(e){const n=document.documentElement;n.dataset.learnableText=e.largeText?"large":"default",n.dataset.learnableMotion=e.stopMotion?"reduce":"allow";let t=document.getElementById(tt);t||(t=document.createElement("style"),t.id=tt,document.head.append(t)),t.textContent=Ur(e),n.dataset.learnableContrast=e.contrastMode==="off"?"off":"on",e.contrastMode==="off"?un():Mr()}function jr(){var n;(n=document.getElementById(tt))==null||n.remove();const e=document.documentElement;delete e.dataset.learnableText,delete e.dataset.learnableContrast,delete e.dataset.learnableMotion}function Gr(e){if(e.metaKey||e.ctrlKey||e.altKey)return null;switch(e.key){case" ":case"k":case"K":return{type:"toggle-play"};case"c":case"C":return{type:"cycle-captions"};case"d":case"D":return{type:"toggle-ad"};case"s":case"S":return{type:"toggle-sign"};case"ArrowLeft":return{type:"seek",by:-5};case"ArrowRight":return{type:"seek",by:5};case"j":case"J":return{type:"seek",by:-10};case"l":case"L":return{type:"seek",by:10};case"ArrowUp":return{type:"volume",by:.1};case"ArrowDown":return{type:"volume",by:-.1};case"m":case"M":return{type:"mute"};case"f":case"F":return{type:"fullscreen"};case"Home":return{type:"seek-to",to:"start"};case"End":return{type:"seek-to",to:"end"};case"?":return{type:"help"};default:return null}}function Yr(e,n,t=1){const r=e.trim().split(/\s+/).filter(Boolean).length;return r===0?!1:r/(2.5*Math.min(2,Math.max(.5,t)))>Math.max(0,n)+.25}function nt(e){return e.replace(/[^\t\n\r\x20-\x7E]/g,"?").replace(/\\/g,"\\\\").replace(/\(/g,"\\(").replace(/\)/g,"\\)")}function Kr(e,n){const t=e.split(/\s+/).filter(Boolean),r=[];let a="";for(const o of t)a?a.length+1+o.length<=n?a+=` ${o}`:(r.push(a),a=o):a=o;return a&&r.push(a),r.length>0?r:[""]}function zr(e){const n=[{tag:"H1",text:e.title},...e.paragraphs.map(f=>({tag:"P",text:f})),{tag:"Figure",text:e.figureAlt}],t=[];let r=740;n.forEach((f,y)=>{if(f.tag==="Figure"){t.push(`/Figure <</MCID ${y}>> BDC`),t.push("0.106 0.188 0.282 RG"),t.push(`56 ${Math.max(72,r-64)} 180 56 re S`),t.push("EMC");return}const b=f.tag==="H1"?18:12,x=b+4,S=Kr(f.text,f.tag==="H1"?58:86);t.push(`/${f.tag} <</MCID ${y}>> BDC`),t.push("BT"),t.push(`/F1 ${b} Tf`),t.push(`1 0 0 1 56 ${r} Tm`),S.forEach((L,A)=>{A>0&&t.push(`0 -${x} Td`),t.push(`(${nt(L)}) Tj`)}),t.push("ET"),t.push("EMC"),r-=S.length*x+12});const a=t.join(`
`),o=n.map((f,y)=>`${8+y} 0 R`).join(" "),i=n.map((f,y)=>`${8+y} 0 R`).join(" "),s=8+n.length,l=s+1,d=[],c=f=>{d.push(f)};c("<< /Type /Catalog /Pages 3 0 R /Lang (en) /MarkInfo << /Marked true >> /ViewerPreferences << /DisplayDocTitle true >> /StructTreeRoot 2 0 R >>"),c(`<< /Type /StructTreeRoot /K 7 0 R /ParentTree ${s} 0 R >>`),c("<< /Type /Pages /Count 1 /Kids [4 0 R] >>"),c("<< /Type /Page /Parent 3 0 R /MediaBox [0 0 612 792] /Contents 5 0 R /Resources << /Font << /F1 6 0 R >> >> /StructParents 0 /Tabs /S >>"),c(`<< /Length ${a.length} >>
stream
${a}
endstream`),c("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>"),c(`<< /Type /StructElem /S /Document /P 2 0 R /Lang (en) /K [${o}] >>`),n.forEach((f,y)=>{const b=f.tag==="Figure"?` /Alt (${nt(e.figureAlt)})`:"";c(`<< /Type /StructElem /S /${f.tag} /P 7 0 R /Pg 4 0 R${b} /K << /Type /MCR /Pg 4 0 R /MCID ${y} >> >>`)}),c(`<< /Nums [ 0 [${i}] ] >>`),c(`<< /Title (${nt(e.title)}) /Author (LearnAble) >>`);let u=`%PDF-1.7
`;const p=[0];d.forEach((f,y)=>{p.push(u.length),u+=`${y+1} 0 obj
${f}
endobj
`});const g=u.length;u+=`xref
0 ${d.length+1}
`,u+=`0000000000 65535 f 
`;for(let f=1;f<p.length;f+=1)u+=`${p[f].toString().padStart(10,"0")} 00000 n 
`;return u+=`trailer
<< /Size ${d.length+1} /Root 1 0 R /Info ${l} 0 R >>
`,u+=`startxref
${g}
%%EOF`,new TextEncoder().encode(u)}function $e(e){(!Number.isFinite(e)||e<0)&&(e=0);const n=Math.floor(e),t=Math.floor(n/60),r=n%60;return`${t}:${r.toString().padStart(2,"0")}`}const Zr={signs:[{match:"Hana opens",gloss:"OPEN",clip:null},{match:"captions she can make larger",gloss:"LARGER",clip:null},{match:"sign window",gloss:"SIGN",clip:null},{match:"Audio description",gloss:"SPEAK",clip:null},{match:"small pack",gloss:"PACK",clip:null},{match:"same one",gloss:"SAME",clip:null}]};function Jr(e){const n=Zr.signs.find(r=>e.toLowerCase().includes(r.match.toLowerCase()));return n?{gloss:n.gloss,clip:n.clip,placeholder:!0}:{gloss:(e.replace(/[^A-Za-z\u1200-\u137F]/g," ").trim().split(/\s+/)[0]||"SIGN").slice(0,12).toUpperCase(),clip:null,placeholder:!0}}function Xr(e){return[...e.toUpperCase()].filter(n=>/[A-Z]/.test(n))}const fn=`
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
.bar button { background: transparent; color: inherit; border-color: transparent; box-shadow: inset 0 calc(var(--bar-height) * -1) 0 transparent; }
.bar button[aria-pressed="true"] { box-shadow: inset 0 calc(var(--bar-height) * -1) 0 var(--color-caption); background: transparent; }
`;function rt(e,n,t){const r=new CustomEvent(n,{bubbles:!0,composed:!0,detail:t});e.dispatchEvent(r),window.dispatchEvent(new CustomEvent(n,{detail:t}))}class pn extends HTMLElement{constructor(){super();T(this,"root");T(this,"video",null);T(this,"signClip",null);T(this,"en",[]);T(this,"am",[]);T(this,"ad",[]);T(this,"mode","en");T(this,"adOn",!1);T(this,"signOn",!0);T(this,"lastAd","");T(this,"held",!1);T(this,"built",!1);T(this,"onSettings",()=>{this.applySettings()});T(this,"onSpeechCancel",()=>{this.resumeHeld()});this.root=this.attachShadow({mode:"open"})}connectedCallback(){this.built||this.mount(),this.loadTracks(),this.applySettings(),window.addEventListener("learnable-settings",this.onSettings),window.addEventListener("learnable-speech-cancel",this.onSpeechCancel)}refresh(){this.built=!1,this.mount(),this.loadTracks(),this.applySettings()}disconnectedCallback(){window.removeEventListener("learnable-settings",this.onSettings),window.removeEventListener("learnable-speech-cancel",this.onSpeechCancel),Ee()}mount(){var c,u,p,g,f,y;this.built=!0;const t=Me(),r=nn(this,"sign",t.signWindow),a=nn(this,"describe",t.audioDescription),o=this.hasAttribute("offline")||t.offlinePack,i=this.hasAttribute("braille")||t.braille,s=this.hasAttribute("docs")||t.taggedDocs;this.root.innerHTML=`
      <style>${fn}</style>
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
          ${a?`<button type="button" data-act="ad" aria-pressed="${v().audioDescription}">Audio description</button>`:""}
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
        <p data-job>${(c=bt[0])==null?void 0:c.summary}</p>
        <div class="row">
          <button type="button" data-act="job">Play audio summary</button>
          <button type="button" data-act="badge">Check certificate</button>
        </div>
        <h2>Session chat</h2>
        <ol class="chat">
          ${we.chat.map(b=>`<li><span>${$e(b.time)}</span> ${b.speaker}: ${b.text}</li>`).join("")}
        </ol>
        <button type="button" data-act="txt">Download transcript text</button>
      </section>
    `,this.bindMedia();const l=this.root.querySelector(".sign-grip");l==null||l.addEventListener("pointerdown",b=>this.dragSign(b)),l==null||l.addEventListener("keydown",b=>{(b.key==="ArrowLeft"||b.key==="ArrowDown")&&this.nudge("left"),(b.key==="ArrowRight"||b.key==="ArrowUp")&&this.nudge("right"),b.key==="Home"&&this.setSignColumn(12),b.key==="End"&&this.setSignColumn(24)});const d=this.root.querySelector(".stage");d==null||d.addEventListener("keydown",b=>this.onKey(b)),this.root.querySelectorAll("button[data-act]").forEach(b=>{b.addEventListener("click",()=>this.onAction(b.dataset.act||""))}),(u=this.root.querySelector("[data-act=size]"))==null||u.addEventListener("input",b=>{const x=Number(b.target.value);k({captionScale:x}),this.styleCaption(x,v().captionPreset)}),(p=this.root.querySelector("[data-act=preset]"))==null||p.addEventListener("change",b=>{const x=b.target.value;k({captionPreset:x}),this.styleCaption(v().captionScale,x)}),(g=this.video)==null||g.addEventListener("timeupdate",()=>this.sync()),(f=this.video)==null||f.addEventListener("play",()=>{this.setPlayLabel(!0),rt(this,"learnable-play",{playing:!0})}),(y=this.video)==null||y.addEventListener("pause",()=>{this.setPlayLabel(!1),rt(this,"learnable-play",{playing:!1})})}bindMedia(){const t=this.querySelector("video, audio"),r=this.root.querySelector("[data-fallback]");if(t instanceof HTMLMediaElement&&t.slot==="media")this.video=t,r&&(r.hidden=!0),t.setAttribute("playsinline","");else if(r){this.video=r;const i=this.getAttribute("src");i&&(r.src=H(i))}this.ensureDescriptionTrack(),this.signClip=this.root.querySelector("[data-sign-video]");const a=this.getAttribute("sign");this.signClip&&a&&a!=="false"&&(this.signClip.src=H(a));const o=this.querySelector("iframe");o&&!o.getAttribute("title")&&o.setAttribute("title","Embedded lesson video")}signColumn(){const t=this.root.querySelector(".media-row"),r=Number.parseFloat((t==null?void 0:t.style.getPropertyValue("--sign-col"))||"16");return Number.isFinite(r)?r:16}setSignColumn(t){const r=this.root.querySelector(".media-row");r&&r.style.setProperty("--sign-col",`${Math.min(28,Math.max(10,t))}rem`)}dragSign(t){if(t.button!==0)return;const r=t.currentTarget;if(!(r instanceof HTMLElement))return;const a=t.clientX,o=this.signColumn(),i=l=>this.setSignColumn(o+(a-l.clientX)/16),s=()=>{r.removeEventListener("pointermove",i),r.removeEventListener("pointerup",s)};r.setPointerCapture(t.pointerId),r.addEventListener("pointermove",i),r.addEventListener("pointerup",s)}async loadTracks(){this.en=await this.fetchCues(this.getAttribute("captions-en")),this.am=await this.fetchCues(this.getAttribute("captions-am")),this.ad=await this.fetchCues(this.getAttribute("describe"));const t=this.root.querySelector("[data-sign]");t&&(t.hidden=!this.signOn),this.renderTranscript(),this.sync()}renderTranscript(){const t=this.root.querySelector(".transcript");if(!t)return;const r=this.en.length?this.en:this.am;t.replaceChildren();for(const a of r){const o=document.createElement("li"),i=document.createElement("button");i.type="button",i.dataset.seek=String(a.start),i.textContent=`${$e(a.start)} ${a.text}`,i.addEventListener("click",()=>{this.video&&(this.video.currentTime=a.start)}),o.append(i),t.append(o)}}async fetchCues(t){if(!t||t==="false")return[];try{const r=await fetch(H(t));return r.ok?pr(await r.text()):[]}catch{return[]}}applySettings(){const t=v();this.mode=t.lang,t.contrastMode!=="off"||t.highContrast?this.setAttribute("contrast","high"):this.removeAttribute("contrast"),this.setAttribute("theme",yr());const r=this.root.querySelector("[data-act=preset]"),a=this.root.querySelector("[data-act=size]");r&&(r.value=t.captionPreset),a&&(a.value=String(t.captionScale)),this.styleCaption(t.captionScale,t.captionPreset),this.adOn=t.audioDescription;const o=this.root.querySelector("[data-act=ad]");o&&o.setAttribute("aria-pressed",String(this.adOn)),this.sync()}ensureDescriptionTrack(){if(!(this.video instanceof HTMLVideoElement))return;const t=this.getAttribute("describe");if(!t||t==="false")return;const r=H(t);let a=this.video.querySelector("track[kind='descriptions']");a||(a=document.createElement("track"),a.kind="descriptions",a.label="Audio description",a.srclang="en",this.video.append(a)),a.getAttribute("src")!==r&&(a.src=r)}resumeHeld(){!this.held||!this.video||(this.held=!1,this.video.play().catch(()=>{}))}styleCaption(t,r){const a=this.root.querySelector(".caption"),o=Jt[r]??Jt.white;a&&(a.style.color=o.fg,a.style.background=o.bg,a.style.fontSize=`${t}rem`)}setPlayLabel(t){const r=this.root.querySelector("[data-act=play]");r&&(r.textContent=t?"Pause":"Play");const a=this.root.querySelector(".status"),o=(a==null?void 0:a.textContent)||"";a&&this.video&&(o.startsWith("Playing")||o.startsWith("Paused"))&&(a.textContent=`${t?"Playing":"Paused"}. ${$e(this.video.currentTime)} of ${$e(this.video.duration||0)}.`)}sync(){var c;if(!this.video)return;const t=this.video.currentTime,r=this.mode==="am"?this.am:this.mode==="en"?this.en:[],a=this.mode==="off"?void 0:Gt(r,t),o=this.root.querySelector(".caption");o&&(o.textContent=(a==null?void 0:a.text)??"",o.setAttribute("lang",this.mode==="am"?"am":"en"));const i=Jr((a==null?void 0:a.text)||""),s=this.root.querySelector(".gloss");s&&(s.textContent=i.gloss);const l=this.root.querySelector("[data-spell]");if(l&&(l.textContent=i.clip?"":`Fingerspelling placeholder: ${Xr(i.gloss).join(" ")}`),this.signClip&&(i.clip?(this.signClip.hidden=!1,this.signClip.getAttribute("src")!==H(i.clip)&&(this.signClip.src=H(i.clip))):this.signClip.hidden=!0),(c=this.signClip)!=null&&c.getAttribute("src")&&this.video&&Math.abs(this.signClip.currentTime-t)>.4&&(this.signClip.currentTime=t),this.adOn){const u=Gt(this.ad,t);if(!u)this.lastAd="";else if(u.text!==this.lastAd){this.lastAd=u.text;const p=v(),g=u.end-u.start;Yr(u.text,g,p.readRate)&&!this.video.paused&&(this.video.pause(),this.held=!0),ge(u.text,"en",p.readRate,{pitch:p.readPitch,onend:()=>this.resumeHeld(),oncancel:()=>this.resumeHeld()})}}const d=this.root.querySelector("[data-act=captions]");d&&(d.textContent=this.mode==="off"?"Captions: off":this.mode==="am"?"Captions: Amharic":"Captions: English"),this.setPlayLabel(!this.video.paused)}onKey(t){const r=Gr(t);r&&(t.preventDefault(),r.type==="toggle-play"&&this.toggle(),r.type==="cycle-captions"&&this.cycleCaptions(),r.type==="toggle-ad"&&this.toggleAd(),r.type==="toggle-sign"&&this.toggleSign(),r.type==="seek"&&this.video&&(this.video.currentTime=Math.max(0,this.video.currentTime+r.by)),r.type==="seek-to"&&this.video&&(this.video.currentTime=r.to==="start"?0:this.video.duration||0),r.type==="mute"&&this.video&&(this.video.muted=!this.video.muted),r.type==="volume"&&this.video&&(this.video.volume=Math.min(1,Math.max(0,this.video.volume+r.by))))}async toggle(){var t,r;if(this.video)try{this.video.paused?(await this.video.play(),(t=this.signClip)!=null&&t.getAttribute("src")&&this.signClip.play().catch(()=>{})):(this.video.pause(),(r=this.signClip)==null||r.pause())}catch{this.setStatus("The video did not play. Captions are still listed when the file loads.")}}cycleCaptions(){this.mode=this.mode==="off"?"en":this.mode==="en"?"am":"off",this.sync(),rt(this,"learnable-captions",{lang:this.mode})}toggleAd(){const t=!v().audioDescription;k({audioDescription:t}),t||(Ee(),this.resumeHeld())}nudge(t){const r=t==="left"||t==="shrink"?-2:2;this.setSignColumn(this.signColumn()+r)}scaleSign(t){this.setSignColumn(this.signColumn()+t*2)}toggleSign(){this.signOn=!this.signOn;const t=this.root.querySelector("[data-sign]");t&&(t.hidden=!this.signOn);const r=this.root.querySelector("[data-act=sign]");r&&r.setAttribute("aria-pressed",String(this.signOn))}setStatus(t){const r=this.root.querySelector(".status");r&&(r.textContent=t)}textOf(t){return t.map(r=>r.text).join(`
`)}async onAction(t){var r;if(t==="play"&&this.toggle(),t==="captions"&&this.cycleCaptions(),t==="ad"&&this.toggleAd(),t==="sign"&&this.toggleSign(),(t==="left"||t==="right"||t==="up"||t==="down")&&this.nudge(t),(t==="shrink"||t==="grow")&&this.scaleSign(t==="grow"?1:-1),t==="pack")try{const a=await cr({english:this.textOf(this.en),amharic:this.textOf(this.am),descriptions:this.textOf(this.ad),audioEn:this.optionalUrl("audio-en"),audioAm:this.optionalUrl("audio-am")});_(a.bytes,"learnable-3g-pack.zip","application/zip"),this.setStatus(a.audio?"3G pack downloaded, with narration and text.":"Text pack downloaded. Narration files were not beside the video.")}catch(a){this.setStatus(a instanceof Error?a.message:"The pack could not be built.")}if(t==="braille"){const a=this.mode==="am"?"am":"en",o=a==="am"?this.textOf(this.am):this.textOf(this.en);_(new TextEncoder().encode(je(o)),`lesson-${a}.brf`,"text/plain"),this.setStatus("Braille file downloaded.")}if(t==="pdf"){try{const o=await fetch(H(this.getAttribute("pdf")||"/media/learnable-lesson.pdf"));if(o.ok){_(new Uint8Array(await o.arrayBuffer()),"learnable-lesson.pdf","application/pdf"),this.setStatus("Tagged PDF downloaded, with Amharic and the picture description.");return}}catch{}const a=zr({title:"LearnAble lesson",paragraphs:this.en.map(o=>o.text),figureAlt:"Lesson picture with English and Amharic captions."});_(a,"learnable-lesson.pdf","application/pdf"),this.setStatus("Tagged PDF downloaded. Amharic stays in the captions.")}if(t==="html"){const a=this.en.map(s=>`<h2>${s.text}</h2>`).join(""),o=this.am.map(s=>`<p lang="am">${s.text}</p>`).join(""),i=`<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><title>LearnAble lesson</title></head><body><main><h1>LearnAble lesson</h1><p>Picture: A navy phone on a paper background, with an English and Amharic caption under the screen.</p>${a}${o}</main></body></html>`;_(new TextEncoder().encode(i),"learnable-lesson.html","text/html"),this.setStatus("HTML text version downloaded, with the picture description.")}if(t==="txt"){const a=`English
${this.textOf(this.en)}

Amharic
${this.textOf(this.am)}
`;_(new TextEncoder().encode(a),"learnable-transcript.txt","text/plain"),this.setStatus("Transcript text downloaded.")}if(t==="vtt-en"||t==="vtt-am"){const a=t==="vtt-am"?this.am:this.en;_(new TextEncoder().encode(jt(a)),t==="vtt-am"?"captions-am.vtt":"captions-en.vtt","text/vtt"),this.setStatus(t==="vtt-am"?"Amharic captions downloaded.":"English captions downloaded.")}if(t==="job"){const a=((r=this.root.querySelector("[data-job]"))==null?void 0:r.textContent)||"";ge(a,"en"),this.setStatus("Playing the job summary on this device.")}if(t==="badge"){const a=await yt();this.setStatus(a?"The certificate proof matches the published public key.":"The certificate proof does not match.")}}optionalUrl(t){const r=this.getAttribute(t);if(!(!r||r==="false"))return H(r)}}let ce=[],Pe=0,ee=!1,at=!1;function oe(e){const n=document.getElementById("learnable-reader-live");n&&(n.textContent=e)}function _r(){document.querySelectorAll(".learnable-sentence").forEach(e=>{e.replaceWith(document.createTextNode(e.textContent||""))}),document.querySelectorAll(".is-current").forEach(e=>e.classList.remove("is-current")),at=!1,ce=[]}function Qr(e){const n=document.createTreeWalker(e,NodeFilter.SHOW_TEXT),t=[];for(;n.nextNode();)t.push(n.currentNode);const r=[];return t.forEach(a=>{const o=a.parentElement;if(!o||o.closest("script, style, learnable-player, learnable-toolbar, .learnable-gateway, .learnable-sentence"))return;const i=(a.textContent||"").split(new RegExp("(?<=[.!?])\\s+")).filter(l=>l.trim());if(i.length===0)return;const s=document.createDocumentFragment();i.forEach(l=>{const d=document.createElement("span");d.className="learnable-sentence",d.textContent=l,s.append(d,document.createTextNode(" ")),r.push(d)}),a.replaceWith(s)}),at=!0,r}function ea(){const e=document.querySelector("main");if(!e)return[];const n=v().readVerbosity;return n==="headings"?[...e.querySelectorAll("h1, h2, h3")]:n==="links"?[...e.querySelectorAll("a")]:at?[...e.querySelectorAll(".learnable-sentence")]:Qr(e)}function ta(){var n;!v().haptics||!("vibrate"in navigator)||(n=navigator.vibrate)==null||n.call(navigator,20)}function mn(){var r,a;(r=window.speechSynthesis)==null||r.cancel();const e=ce[Pe];if(ce.forEach(o=>o.classList.remove("is-current")),!e){ee=!1,oe("Reading stopped.");return}e.classList.add("is-current"),e.scrollIntoView({block:"nearest"});const n=v(),t=new SpeechSynthesisUtterance(e.textContent||"");t.rate=n.readRate,t.pitch=n.readPitch,t.lang=document.documentElement.lang||"en",t.onend=()=>{ee&&(Pe+=1,mn())},oe(`Reading ${Pe+1} of ${ce.length}.`),ta(),(a=window.speechSynthesis)==null||a.speak(t)}function na(){if(!window.speechSynthesis){oe("This browser has no speech synthesis. Nothing was spoken.");return}if(ce=ea(),ce.length===0){oe("There is no text to read in the main region.");return}ee=!0,mn()}function ra(){var e;ee=!1,(e=window.speechSynthesis)==null||e.cancel(),oe("Reading paused.")}function ot(){var e;ee=!1,Pe=0,(e=window.speechSynthesis)==null||e.cancel(),_r(),oe("Reading stopped. The page text is unchanged.")}function aa(){ee&&ot()}window.addEventListener("learnable-speech-cancel",()=>{ee&&(ee=!1,oe("Reading paused."))});const oa={en:{button:"Button",link:"Link",heading:"Heading",level:"level",image:"Image",paragraph:"Paragraph",navigation:"Navigation",main:"Main",banner:"Banner",contentinfo:"Content info",region:"Region",search:"Search",complementary:"Complementary",checkbox:"Checkbox",slider:"Slider",combobox:"List",textbox:"Text field",pressed:"pressed",notPressed:"not pressed",checked:"checked",notChecked:"not checked",expanded:"expanded",collapsed:"collapsed",disabled:"disabled",current:"current"},am:{button:"ቁልፍ",link:"ማገናኛ",heading:"ርዕስ",level:"ደረጃ",image:"ምስል",paragraph:"አንቀጽ",navigation:"አሰሳ",main:"ዋና",banner:"ራስጌ",contentinfo:"ግርጌ",region:"ክልል",search:"ፍለጋ",complementary:"ተጨማሪ",checkbox:"ሳጥን",slider:"ተንሸራታች",combobox:"ዝርዝር",textbox:"የጽሑፍ ሳጥን",pressed:"ተጭኗል",notPressed:"አልተጫነም",checked:"ተመርጧል",notChecked:"አልተመረጠም",expanded:"ተከፍቷል",collapsed:"ተዘግቷል",disabled:"ተሰናክሏል",current:"የአሁኑ"}};function ia(e){var t;return(((t=e.closest("[lang]"))==null?void 0:t.getAttribute("lang"))||document.documentElement.lang||"en").toLowerCase().startsWith("am")?"am":"en"}function sa(e){const n=e.getAttribute("role");if(n)return n;const t=e.tagName;return t==="A"&&e.hasAttribute("href")?"link":t==="BUTTON"?"button":/^H[1-6]$/.test(t)?"heading":t==="IMG"?"image":t==="NAV"?"navigation":t==="MAIN"?"main":t==="HEADER"?"banner":t==="FOOTER"?"contentinfo":t==="ASIDE"?"complementary":t==="P"?"paragraph":t==="SELECT"?"combobox":t==="TEXTAREA"?"textbox":t==="SECTION"&&(e.hasAttribute("aria-label")||e.hasAttribute("aria-labelledby"))?"region":e instanceof HTMLInputElement?e.type==="checkbox"||e.type==="radio"?"checkbox":e.type==="range"?"slider":e.type==="button"||e.type==="submit"?"button":"textbox":""}function la(e){var a,o;const n=e.getAttribute("aria-labelledby");if(n){const i=n.split(/\s+/).map(s=>{var l;return((l=document.getElementById(s))==null?void 0:l.textContent)||""}).join(" ").replace(/\s+/g," ").trim();if(i)return i}const t=(a=e.getAttribute("aria-label"))==null?void 0:a.trim();if(t)return t;if(e instanceof HTMLImageElement)return Ke(e)||e.alt.trim();if(e instanceof HTMLInputElement||e instanceof HTMLSelectElement||e instanceof HTMLTextAreaElement){const i=e.id,s=i?document.querySelector(`label[for="${CSS.escape(i)}"]`):null,l=e.closest("label"),d=((s==null?void 0:s.textContent)||(l==null?void 0:l.textContent)||"").replace(/\s+/g," ").trim();if(d)return d}const r=(e.innerText||e.textContent||"").replace(/\s+/g," ").trim();return r?r.slice(0,280):((o=e.getAttribute("title"))==null?void 0:o.trim())||""}function ca(e,n){const r=[...e.querySelectorAll("img")].map(a=>Ke(a)).filter(a=>!!(a&&!n.includes(a)));return r.length===0?n:[n,...r].filter(Boolean).join(". ")}function ua(e){if(e===document.body||e===document.documentElement)return null;const n=sa(e);if(!n&&e.tagName!=="P")return null;const t=ia(e),r=oa[t],a=r[n]||n;let o=ca(e,la(e));if(n==="heading"){const u=e.getAttribute("aria-level")||e.tagName.slice(1);o=`${r.level} ${u}, ${o}`.trim()}const i=[],s=e.getAttribute("aria-pressed");s==="true"&&i.push(r.pressed),s==="false"&&i.push(r.notPressed);const l=e.getAttribute("aria-checked")??(e instanceof HTMLInputElement&&e.type==="checkbox"?String(e.checked):null);l==="true"&&i.push(r.checked),l==="false"&&i.push(r.notChecked);const d=e.getAttribute("aria-expanded");d==="true"&&i.push(r.expanded),d==="false"&&i.push(r.collapsed),(e.hasAttribute("disabled")||e.getAttribute("aria-disabled")==="true")&&i.push(r.disabled),e.hasAttribute("aria-current")&&e.getAttribute("aria-current")!=="false"&&i.push(r.current);const c=[a,o,...i].filter(Boolean).join(", ");return c.trim()?{text:c,lang:t}:null}function bn(e){return e.composedPath().some(n=>n instanceof HTMLElement?n.isContentEditable?!0:n.tagName==="INPUT"||n.tagName==="TEXTAREA"||n.tagName==="SELECT":!1)}function da(e){return e.composedPath().some(n=>n instanceof HTMLElement&&n.tagName==="LEARNABLE-PLAYER")}function it(e,n){return e.altKey||e.ctrlKey||e.metaKey?!1:n==="?"?e.key==="?":e.key.toLowerCase()===n.toLowerCase()}function ha(e,n){const t=n.split("+").map(s=>s.trim().toLowerCase()).filter(Boolean);if(t.length===0)return!1;const r=t[t.length-1],a=t.includes("alt"),o=t.includes("shift"),i=t.includes("ctrl")||t.includes("control");return a!==e.altKey||o!==e.shiftKey||i!==(e.ctrlKey||e.metaKey)?!1:e.key.toLowerCase()===r}const ie="learnable-voice-prompt",ue="learnable-help";let gn=!1,st=0,lt=null;function ct(e){const n=document.getElementById("learnable-reader-live");n&&(n.textContent="",n.textContent=e)}function fa(){var n,t;const e=(t=(n=document.querySelector("learnable-toolbar"))==null?void 0:n.shadowRoot)==null?void 0:t.querySelector("[data-act=voice]");e==null||e.focus()}function yn(e,n){if(n.key!=="Tab")return;const t=[...e.querySelectorAll("button, a[href], input, select, textarea")].filter(i=>!i.hasAttribute("disabled"));if(t.length===0)return;const r=t[0],a=t[t.length-1],o=e.contains(document.activeElement)?document.activeElement:null;n.shiftKey&&(o===r||!o)?(n.preventDefault(),a.focus()):!n.shiftKey&&o===a&&(n.preventDefault(),r.focus())}function ve(e,n){var t;k({voice:e,voiceChosen:!0,...n==="prompt"?{audioDescription:e}:{}}),(t=document.getElementById(ie))==null||t.remove(),ct(e?"LearnAble voice on.":"LearnAble voice off."),e?ge("LearnAble voice on.","en",v().readRate):Ee(),n==="prompt"&&(st=0,fa())}function pa(){var n,t,r;if(v().voiceChosen||document.getElementById(ie)||!document.body)return;const e=document.createElement("div");e.id=ie,e.className="learnable-dialog",e.tabIndex=-1,e.setAttribute("role","alertdialog"),e.setAttribute("aria-modal","true"),e.setAttribute("aria-labelledby","learnable-voice-title"),e.setAttribute("aria-describedby","learnable-voice-desc"),e.innerHTML=`
    <h2 id="learnable-voice-title">LearnAble voice</h2>
    <p id="learnable-voice-desc">LearnAble can speak the control, heading, or picture you move to. If you already use a screen reader, turn this voice off so the two do not talk at once. Some browsers speak only after the first click or key. Choosing here unlocks that. Escape turns the voice off.</p>
    <div class="learnable-row">
      <button type="button" data-voice="keep">Keep LearnAble voice</button>
      <button type="button" data-voice="reader">I use my own screen reader (turn LearnAble voice off)</button>
    </div>
  `,(n=e.querySelector("[data-voice=keep]"))==null||n.addEventListener("click",()=>ve(!0,"prompt")),(t=e.querySelector("[data-voice=reader]"))==null||t.addEventListener("click",()=>ve(!1,"prompt")),document.body.append(e),(r=e.querySelector("[data-voice=keep]"))==null||r.focus()}function ma(){const e=v().keys;return`
    <li>Tab and Shift+Tab move through the page. The skip link is first.</li>
    <li>${e.heading.toUpperCase()} next heading. Shift+${e.heading.toUpperCase()} previous heading.</li>
    <li>${e.landmark.toUpperCase()} next landmark. Shift+${e.landmark.toUpperCase()} previous landmark.</li>
    <li>${e.help} opens this help. Escape closes it and returns focus.</li>
    <li>${e.voice} toggles LearnAble voice. The LearnAble voice button does the same. This chord is not an NVDA, JAWS, Orca, VoiceOver, or Chrome shortcut. On some Mac layouts it types a character in a text field, so it does not run there.</li>
    <li>Picture frame, while it is focused: Space or K play, C captions, D audio description, S sign panel, arrows seek, J and L move further. L is landmarks everywhere else.</li>
    <li>NVDA and JAWS browse mode take H and L before the page sees them. That is expected.</li>
    <li>Single-letter keys do nothing in a text field, and they can be turned off or changed below.</li>
  `}function vn(e){var a,o,i;if(document.getElementById(ie))return;lt=e??(document.activeElement instanceof HTMLElement?document.activeElement:null),(a=document.getElementById(ue))==null||a.remove();const n=v().keys,t=document.createElement("div");t.id=ue,t.className="learnable-dialog",t.tabIndex=-1,t.setAttribute("role","dialog"),t.setAttribute("aria-modal","true"),t.setAttribute("aria-labelledby","learnable-help-title"),t.innerHTML=`
    <h2 id="learnable-help-title">Keyboard shortcuts</h2>
    <ul>${ma()}</ul>
    <div class="learnable-row">
      <label>Heading key <input data-map="heading" value="${De(n.heading)}" maxlength="8" /></label>
      <label>Landmark key <input data-map="landmark" value="${De(n.landmark)}" maxlength="8" /></label>
      <label>Help key <input data-map="help" value="${De(n.help)}" maxlength="8" /></label>
      <label>Voice shortcut <input data-map="voice" value="${De(n.voice)}" maxlength="32" /></label>
    </div>
    <div class="learnable-row">
      <button type="button" data-help="close">Close shortcuts</button>
    </div>
  `,t.querySelectorAll("[data-map]").forEach(s=>{s.addEventListener("change",()=>{const l=s.dataset.map,d=s.value.trim();d&&k({keys:{...v().keys,[l]:d}})})});const r=()=>xn();(o=t.querySelector("[data-help=close]"))==null||o.addEventListener("click",r),document.body.append(t),(i=t.querySelector("[data-help=close]"))==null||i.focus()}function xn(){var n;(n=document.getElementById(ue))==null||n.remove();const e=lt;lt=null,e==null||e.focus()}function ba(e){if(e.closest(`#${ie}, #${ue}, [hidden]`))return!1;const n=getComputedStyle(e);return n.display!=="none"&&n.visibility!=="hidden"}function ga(e){(!e.matches("a[href], button, input, select, textarea, summary, [tabindex]")||e.tabIndex<0)&&(e.tabIndex=-1),e.focus()}function wn(e,n){const t=[...document.querySelectorAll(e)].filter(ba),r=[...new Set(t)];if(r.length===0)return;const a=document.activeElement instanceof HTMLElement?document.activeElement:null;let o=r.findIndex(s=>s===a||s.contains(a));o<0&&(o=n>0?-1:0);const i=r[(o+n+r.length)%r.length];ga(i)}const ya="header, [role='banner'], nav, [role='navigation'], main, [role='main'], footer, [role='contentinfo'], aside, [role='complementary'], [role='search'], form[aria-label], form[aria-labelledby], section[aria-label], section[aria-labelledby]";function va(e){if(performance.now()>st)return;const n=e.composedPath()[0];if(!(n instanceof HTMLElement)||n.closest(`#${ie}, #${ue}`))return;const t=v();if(!t.voice||!t.voiceChosen)return;const r=ua(n);r&&ge(r.text,r.lang,t.readRate,{pitch:t.readPitch})}function xa(e){st=performance.now()+800,Ft();const n=v(),t=document.getElementById(ie),r=document.getElementById(ue);if(t&&yn(t,e),r&&yn(r,e),ha(e,n.keys.voice)&&!bn(e)){e.preventDefault(),e.stopPropagation(),ve(!v().voice,"toggle");return}if(Ee(),window.dispatchEvent(new CustomEvent("learnable-speech-cancel")),e.key==="Escape"){if(t){e.preventDefault(),ve(!1,"prompt");return}if(r){e.preventDefault(),e.stopPropagation(),xn();return}aa()}if(!(t||r)&&!(bn(e)||!n.keyboard)){if(it(e,n.keys.help)){e.preventDefault(),e.stopPropagation(),vn(document.activeElement instanceof HTMLElement?document.activeElement:null);return}da(e)||(it(e,n.keys.heading)?(e.preventDefault(),wn("h1, h2, h3, h4, h5, h6",e.shiftKey?-1:1)):it(e,n.keys.landmark)&&(e.preventDefault(),wn(ya,e.shiftKey?-1:1)))}}function wa(){Ft(),dr()}function De(e){return e.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;")}function Aa(){if(document.getElementById("learnable-reader-live")||!document.body)return;const e=document.createElement("p");e.id="learnable-reader-live",e.setAttribute("role","status"),e.setAttribute("aria-live","polite"),document.body.append(e)}function ka(){Aa(),pa(),!gn&&(gn=!0,document.addEventListener("keydown",xa,!0),document.addEventListener("focusin",va,!0),document.addEventListener("pointerdown",wa,!0))}const Sa=["tl","tr","bl","br"];function An(e,n){return e.left<n.right&&e.right>n.left&&e.top<n.bottom&&e.bottom>n.top}class Ea extends HTMLElement{constructor(){super();T(this,"root");T(this,"built",!1);T(this,"open",!0);this.root=this.attachShadow({mode:"open"})}connectedCallback(){var a,o,i,s,l,d,c,u,p,g,f,y,b,x,S,L,A,I,B,E;if(this.built)return;this.built=!0,this.root.innerHTML=`
      <style>${fn}</style>
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
    `,this.root.querySelectorAll("button[data-key]").forEach(h=>{h.addEventListener("click",()=>{const m=h.dataset.key,C=v(),te=k({[m]:!C[m]});Q(te),this.reflect()})}),(a=this.root.querySelector("[data-key=captionScale]"))==null||a.addEventListener("input",h=>{const m=k({captionScale:Number(h.target.value)});Q(m)}),(o=this.root.querySelector("[data-key=captionPreset]"))==null||o.addEventListener("change",h=>{const m=k({captionPreset:h.target.value});Q(m)}),(i=this.root.querySelector("[data-key=uiLang]"))==null||i.addEventListener("change",h=>{k({uiLang:h.target.value==="am"?"am":"en"}),this.reflect()}),(s=this.root.querySelector("[data-key=contrastMode]"))==null||s.addEventListener("change",h=>{const m=h.target.value,C=k({contrastMode:m==="bw"||m==="yb"?m:"off"});Q(C),this.reflect()}),(l=this.root.querySelector("[data-key=contrastLevel]"))==null||l.addEventListener("input",h=>{const m=k({contrastLevel:Number(h.target.value)});Q(m),this.reflect()}),(d=this.root.querySelector("[data-key=readRate]"))==null||d.addEventListener("input",h=>{k({readRate:Number(h.target.value)})}),(c=this.root.querySelector("[data-key=readPitch]"))==null||c.addEventListener("input",h=>{k({readPitch:Number(h.target.value)})}),(u=this.root.querySelector("[data-key=readVerbosity]"))==null||u.addEventListener("change",h=>{const m=h.target.value;k({readVerbosity:m==="headings"||m==="links"?m:"sentences"})}),(p=this.root.querySelector("[data-key=haptics]"))==null||p.addEventListener("change",h=>{k({haptics:h.target.checked})}),(g=this.root.querySelector("[data-act=read-play]"))==null||g.addEventListener("click",()=>na()),(f=this.root.querySelector("[data-act=read-pause]"))==null||f.addEventListener("click",()=>ra()),(y=this.root.querySelector("[data-act=read-stop]"))==null||y.addEventListener("click",()=>ot()),this.root.addEventListener("keydown",h=>{h instanceof KeyboardEvent&&h.key==="Escape"&&ot()}),(b=this.root.querySelector("[data-act=voice]"))==null||b.addEventListener("click",()=>{ve(!v().voice,"toggle")}),(x=this.root.querySelector("[data-act=describe]"))==null||x.addEventListener("click",()=>{const h=!v().audioDescription;k({audioDescription:h}),ct(h?"Audio description on.":"Audio description off.")}),(S=this.root.querySelector("[data-act=keys]"))==null||S.addEventListener("click",()=>{const h=!v().keyboard;k({keyboard:h}),ct(h?"Keyboard shortcuts on.":"Keyboard shortcuts off. The buttons still work.")}),(L=this.root.querySelector("[data-act=help]"))==null||L.addEventListener("click",h=>{vn(h.currentTarget instanceof HTMLElement?h.currentTarget:null)}),window.addEventListener("learnable-settings",()=>this.reflect()),(A=this.root.querySelector("[data-act=images]"))==null||A.addEventListener("click",()=>{var C;const h=((C=this.root.querySelector("[data-act=consent]"))==null?void 0:C.checked)===!0,m=this.root.querySelector("[data-note]");m&&(m.textContent=h?Or():et())});const t=v();this.open=t.toolbarVisited?!t.toolbarCollapsed:!0,t.toolbarVisited||k({toolbarVisited:!0,toolbarCollapsed:!0}),this.place(t.toolbarCorner),(I=this.root.querySelector("[data-act=launcher]"))==null||I.addEventListener("click",()=>this.setOpen(!0)),(B=this.root.querySelector("[data-act=collapse]"))==null||B.addEventListener("click",()=>this.setOpen(!1)),this.root.querySelectorAll("[data-corner]").forEach(h=>{h.addEventListener("click",()=>this.place(h.dataset.corner,!0))});const r=this.root.querySelector("[data-act=move]");r==null||r.addEventListener("pointerdown",h=>this.drag(h)),r==null||r.addEventListener("keydown",h=>this.moveByKey(h)),(E=this.root.querySelector(".bar"))==null||E.addEventListener("keydown",h=>this.rove(h)),document.addEventListener("focusin",h=>this.avoid(h)),this.paint(),this.reflect()}controls(){return[...this.root.querySelectorAll(".bar button, .bar a[href], .bar select, .bar input")]}setOpen(t){this.open=t,k({toolbarCollapsed:!t,toolbarVisited:!0}),this.paint();const r=t?this.root.querySelector("[data-act=move]"):this.root.querySelector("[data-act=launcher]");r==null||r.focus()}place(t,r=!1){Sa.includes(t)&&(this.dataset.corner=t,this.style.left="",this.style.top="",this.style.right="",this.style.bottom="",r&&k({toolbarCorner:t}))}drag(t){if(t.button!==0)return;const r=t.currentTarget;if(!(r instanceof HTMLElement))return;const a=t.clientX,o=t.clientY,i=this.getBoundingClientRect(),s=d=>{const c=Math.min(window.innerWidth-48,Math.max(0,i.left+d.clientX-a)),u=Math.min(window.innerHeight-48,Math.max(0,i.top+d.clientY-o));this.dataset.corner="free",this.style.left=`${c}px`,this.style.top=`${u}px`,this.style.right="auto",this.style.bottom="auto"},l=()=>{r.removeEventListener("pointermove",s),r.removeEventListener("pointerup",l)};r.setPointerCapture(t.pointerId),r.addEventListener("pointermove",s),r.addEventListener("pointerup",l)}moveByKey(t){if(!t.key.startsWith("Arrow"))return;t.preventDefault(),t.stopPropagation();const r=this.getBoundingClientRect(),a=24,o=r.left+(t.key==="ArrowLeft"?-a:t.key==="ArrowRight"?a:0),i=r.top+(t.key==="ArrowUp"?-a:t.key==="ArrowDown"?a:0);this.dataset.corner="free",this.style.left=`${Math.min(window.innerWidth-48,Math.max(0,o))}px`,this.style.top=`${Math.min(window.innerHeight-48,Math.max(0,i))}px`,this.style.right="auto",this.style.bottom="auto"}rove(t){const r=t.composedPath()[0];if(!(r instanceof HTMLElement)||r.closest("input, select, textarea")||r.dataset.act==="move")return;const a=this.controls(),o=a.indexOf(r);if(o<0)return;let i=o;if(t.key==="ArrowRight"||t.key==="ArrowDown")i=(o+1)%a.length;else if(t.key==="ArrowLeft"||t.key==="ArrowUp")i=(o-1+a.length)%a.length;else if(t.key==="Home")i=0;else if(t.key==="End")i=a.length-1;else return;t.preventDefault(),a.forEach((s,l)=>s.setAttribute("tabindex",l===i?"0":"-1")),a[i].focus()}avoid(t){const r=t.composedPath()[0];if(!(r instanceof HTMLElement)||t.composedPath().includes(this))return;const a=r.getBoundingClientRect();if(a.width===0&&a.height===0||!An(this.getBoundingClientRect(),a))return;const o=["tr","tl","br","bl"];for(const i of o)if(this.place(i),!An(this.getBoundingClientRect(),r.getBoundingClientRect())){k({toolbarCorner:i});return}r.style.scrollMargin="5rem",r.scrollIntoView({block:"nearest",inline:"nearest"})}paint(){const t=this.root.querySelector("[data-act=launcher]"),r=this.root.querySelector(".dock");t&&(t.hidden=this.open,t.setAttribute("aria-expanded",String(this.open))),r&&(r.hidden=!this.open),this.open&&this.controls().forEach((o,i)=>o.setAttribute("tabindex",i===0?"0":"-1"))}reflect(){const t=v();this.root.querySelectorAll("button[data-key]").forEach(L=>{const A=L.dataset.key;L.setAttribute("aria-pressed",String(t[A]))});const r=Ye[t.uiLang];this.root.querySelector("[data-key=largeText]").textContent=r.larger,this.root.querySelector("[data-key=stopMotion]").textContent=r.stop;const a=this.root.querySelector("[data-act=images]");a&&(a.textContent=r.images);const o=this.root.querySelector("[href='#learnable-pipeline']"),i=this.root.querySelector("[href='#learnable-job']"),s=this.root.querySelector("[href='#learnable-session']");o&&(o.textContent=r.pipeline),i&&(i.textContent=r.job),s&&(s.textContent=r.session);const l=this.root.querySelector("[data-key=captionScale]"),d=this.root.querySelector("[data-key=captionPreset]"),c=this.root.querySelector("[data-key=uiLang]");l&&(l.value=String(t.captionScale)),d&&(d.value=t.captionPreset),c&&(c.value=t.uiLang);const u=this.root.querySelector("[data-key=contrastMode]"),p=this.root.querySelector("[data-key=contrastLevel]"),g=this.root.querySelector("[data-contrast-value]");u&&(u.value=t.contrastMode),p&&(p.value=String(t.contrastLevel)),g&&(g.textContent=String(t.contrastLevel));const f=this.root.querySelector("[data-key=haptics]");f&&(f.checked=t.haptics);const y=this.root.querySelector("[data-act=voice]"),b=this.root.querySelector("[data-act=describe]"),x=this.root.querySelector("[data-act=keys]");y&&(y.setAttribute("aria-pressed",String(t.voice)),y.setAttribute("aria-keyshortcuts",t.keys.voice)),b&&b.setAttribute("aria-pressed",String(t.audioDescription)),x&&x.setAttribute("aria-pressed",String(t.keyboard));const S=document.querySelector(".learnable-skip");S&&(S.textContent=r.skip),t.contrastMode!=="off"?this.setAttribute("contrast","high"):this.removeAttribute("contrast")}}Bn(document.currentScript instanceof HTMLScriptElement?document.currentScript:null);let kn=!1,se=null;function Sn(){customElements.get("learnable-player")||customElements.define("learnable-player",pn),customElements.get("learnable-toolbar")||customElements.define("learnable-toolbar",Ea)}function Ca(){const e=document.querySelector("script[src*='learnable']"),n=e==null?void 0:e.getAttribute("data-learnable-enhance"),t=document.documentElement.dataset.learnableEnhance,r=e==null?void 0:e.getAttribute("data-learnable-lang"),a=e==null?void 0:e.getAttribute("data-learnable-voice");return{enhance:!(t==="off"||n==="false"||n==="off"),lang:r==="am"||r==="en"?r:void 0,assetBase:(e==null?void 0:e.getAttribute("data-learnable-base"))||void 0,voice:a==="on"||a==="off"?a:void 0}}function La(){var e;if(!Le("toolbar")||!Me().toolbar||document.documentElement.dataset.learnableToolbar==="page"){se==null||se.remove(),se=null;return}document.querySelector("learnable-toolbar")||(se=document.createElement("learnable-toolbar"),se.dataset.auto="true",(e=document.body)==null||e.append(se))}function En(e={}){const n=Ca(),t=e.enhance!==void 0?e.enhance:n.enhance;vr({...n,...e,enhance:t}),$n(e.assetBase||n.assetBase),Sn(),Q(v()),La(),t!==!1&&Vr(),ka(),document.querySelectorAll("learnable-player").forEach(r=>{r instanceof pn&&r.refresh()}),kn=!0,window.dispatchEvent(new CustomEvent("learnable-ready",{detail:{settings:v(),features:Me()}}))}function ut(){const e=tn();k(e),En()}function Cn(e={}){return En(e),dt}function Ln(){const e=xr();return jr(),Q(e),e}const dt={init:Cn,boot:ut,reset:Ln,getSettings:v,setSettings(e){const n=k(e);return Q(n),n},getFeatures:Me,clearRepairs:Ir,version:"0.3.0"};if(typeof window<"u"){window.LearnAble=dt,Sn();const e=()=>{kn||ut()};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e):e()}return F.boot=ut,F.default=dt,F.init=Cn,F.reset=Ln,Object.defineProperties(F,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}}),F})({});typeof LearnAble<"u"&&LearnAble.default&&(window.LearnAble=LearnAble.default);
//# sourceMappingURL=learnable.js.map
