var IKC_HUTBE=__HUTBE__;
function IkcWaIcon(){return o.jsx("svg",{viewBox:"0 0 24 24",width:18,height:18,"aria-hidden":"true",className:"hb-ic",children:o.jsx("path",{fill:"currentColor",d:"M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"})})}
function IkcArchIcon(){return o.jsxs("svg",{viewBox:"0 0 24 24",width:26,height:26,"aria-hidden":"true",className:"hb-ic",fill:"none",stroke:"currentColor",strokeWidth:1.6,strokeLinecap:"round",strokeLinejoin:"round",children:[o.jsx("rect",{x:3,y:3.5,width:18,height:5,rx:1.2}),o.jsx("path",{d:"M4.5 8.5v10a1.5 1.5 0 0 0 1.5 1.5h12a1.5 1.5 0 0 0 1.5-1.5v-10"}),o.jsx("path",{d:"M9.5 12.5h5"})]})}
function IkcToArch(){var a=document.querySelector(".hutba-arch");if(a){a.scrollIntoView({behavior:"smooth",block:"center"});a.classList.remove("flash");void a.offsetWidth;a.classList.add("flash")}}
function IkcSup(t){return t.split(/(\[\d+\])/).map(function(a,i){return /^\[\d+\]$/.test(a)?o.jsx("sup",{className:"hb-sup",children:a},i):a})}
function IkcHutbaReader(p){var J=o.jsx,X=o.jsxs,nl=p.lang==="nl",t=p.item;
_e.default.useEffect(function(){var k=function(a){a.key==="Escape"&&p.onClose()};window.addEventListener("keydown",k);var ov=document.body.style.overflow;document.body.style.overflow="hidden";return function(){window.removeEventListener("keydown",k);document.body.style.overflow=ov}},[]);
var title=nl?t.title_nl:t.title_bs,date=nl?t.date_nl:t.date_bs;
var wa="https://wa.me/?text="+encodeURIComponent(t.title_bs+" \u2014 IKC DIN Eindhoven\n"+location.origin);
var r=function(b,i){var ty=b[0],tx=b[1];
if(ty==="ar")return J("div",{className:"hb-ar",dir:"rtl",lang:"ar",children:tx.replace(/^\(|\)$/g,"")},i);
if(ty==="ayah")return J("blockquote",{className:"hb-ayah",children:tx},i);
if(ty==="ref")return J("div",{className:"hb-ref",children:tx},i);
if(ty==="hadith")return J("blockquote",{className:"hb-hadith",children:IkcSup(tx)},i);
if(ty==="quote")return J("blockquote",{className:"hb-quote",children:tx},i);
if(ty==="link")return J("p",{className:"hb-p",children:J("a",{href:tx,target:"_blank",rel:"noopener",style:{color:"var(--gold)",wordBreak:"break-all"},children:tx})},i);
if(ty==="lead")return J("p",{className:"hb-lead",children:tx},i);
if(ty==="dua")return J("p",{className:"hb-dua",children:tx},i);
return J("p",{className:"hb-p",children:IkcSup(tx)},i)};
return J("div",{className:"hutba-lb",onClick:function(a){a.target===a.currentTarget&&p.onClose()},children:X("div",{className:"hutba-paper",children:[
X("div",{className:"hutba-bar",children:[J("span",{className:"hutba-bar-l",children:(t.label_bs?"\u2709\uFE0F ":"\u{1F54C} ")+(nl?(t.label_nl||"D\u017euma-hutba"):(t.label_bs||"D\u017euma hutba"))}),J("button",{className:"hutba-close",onClick:p.onClose,"aria-label":"Close",children:"\u2715"})]}),
J("h2",{className:"hutba-h",children:title}),
J("div",{className:"hutba-meta",children:date+" \u00b7 "+t.min+(nl?" min leestijd \u00b7 Bosnisch":" min \u010ditanja")}),
J("div",{className:"divider"}),
t.blocks.map(r),
X("div",{className:"hutba-foot",children:[X("a",{className:"btn btn-gold hb-wa","data-tip":nl?"Opent WhatsApp en deelt de link naar deze hutba":"Otvara WhatsApp i \u0161alje link na ovu hutbu",href:wa,target:"_blank",rel:"noopener",children:[IkcWaIcon(),nl?"Deel via WhatsApp":"Podijeli na WhatsAppu"]}),J("button",{className:"btn btn-outline",onClick:p.onClose,children:nl?"Sluiten":"Zatvori"})]})]})})}
function IkcHutbaArchive(p){var J=o.jsx,X=o.jsxs,nl=p.lang==="nl",T=p.T;
_e.default.useEffect(function(){var k=function(a){a.key==="Escape"&&p.onClose()};window.addEventListener("keydown",k);var ov=document.body.style.overflow;document.body.style.overflow="hidden";return function(){window.removeEventListener("keydown",k);document.body.style.overflow=ov}},[]);
return J("div",{className:"hutba-lb",onClick:function(a){a.target===a.currentTarget&&p.onClose()},children:X("div",{className:"hutba-paper hutba-archive",children:[
X("div",{className:"hutba-bar",children:[J("span",{className:"hutba-bar-l",children:"\u{1F5C2}\uFE0F "+T.arch}),J("button",{className:"hutba-close",onClick:p.onClose,"aria-label":"Close",children:"\u2715"})]}),
J("h2",{className:"hutba-h",children:T.arch}),J("div",{className:"divider"}),
p.items.map(function(a,i){return X("button",{className:"hutba-arch-row hutba-arch-big",onClick:function(){p.onPick(a)},children:[X("span",{className:"hutba-arch-main",children:[J("b",{children:nl?a.title_nl:a.title_bs}),J("small",{children:"\u201e"+a.teaser+"\u201c"})]}),X("span",{className:"hutba-arch-side",children:[J("span",{className:"hutba-arch-d",children:nl?a.date_nl:a.date_bs}),i===0&&J("span",{className:"hutba-arch-new",children:T.now})]})]},i)})]})})}
function IkcHutba({lang:e}){var J=o.jsx,X=o.jsxs,nl=e==="nl",st=_e.default.useState(null),op=st[0],setOp=st[1],ar=_e.default.useState(false),arch=ar[0],setArch=ar[1],H=IKC_HUTBE.slice().sort(function(a,b){return a.id<b.id?1:-1}),cur=H[0],rest=H.slice(1);
_e.default.useEffect(function(){var f=function(a){setOp(a.detail)};window.addEventListener("ikc-read",f);return function(){window.removeEventListener("ikc-read",f)}},[]);
var T=nl?{label:"\u{1F54C} D\u017euma-hutba",title:"De hutba van deze vrijdag",sub:"Elke week publiceren we de preek van de D\u017euma \u2014 lees, deel en kom er altijd op terug.",read:"Lees de hutba",share:"Delen",min:" min leestijd",lang:"Bosnisch",old:"Hutba-archief",now:"Actueel",watip:"Opent WhatsApp en deelt de link naar deze hutba",arch:"Hutba-archief",archtip:"Bekijk alle eerdere hutba\u2019s",cnt:"hutba\u2019s",note:"Elke week komt er een hutba bij \u2014 eerdere blijven hier in het archief.",tag:"Vrijdag \u00b7 D\u017euma"}:{label:"\u{1F54C} D\u017euma hutba",title:"Hutba ovog petka",sub:"Svake sedmice objavljujemo hutbu s d\u017eume \u2014 \u010ditajte, podijelite i vratite se na nju kad god \u017eelite.",read:"Pro\u010ditaj hutbu",share:"Podijeli",min:" min \u010ditanja",lang:"Bosanski",old:"Arhiva hutbi",now:"Aktuelna",watip:"Otvara WhatsApp i \u0161alje link na ovu hutbu",arch:"Arhiva hutbi",archtip:"Pogledaj sve prethodne hutbe",cnt:"",note:"Nove hutbe se dodaju svake sedmice \u2014 prethodne ostaju ovdje u arhivi.",tag:"Petak \u00b7 D\u017euma"};
var wa="https://wa.me/?text="+encodeURIComponent(cur.title_bs+" \u2014 IKC DIN Eindhoven\n"+location.origin);
return X("section",{className:"section hutba-sec",id:"hutba",children:[X("div",{className:"container",children:[
J("div",{className:"section-label",children:T.label}),J("h2",{className:"section-title",children:T.title}),J("div",{className:"divider"}),J("p",{className:"section-sub",style:{marginBottom:28},children:T.sub}),
X("div",{className:"hutba-card",children:[
X("div",{className:"hutba-main",children:[X("div",{className:"hutba-tags",children:[J("span",{className:"hutba-tag",children:T.tag}),J("span",{className:"hutba-date",children:nl?cur.date_nl:cur.date_bs})]}),
J("h3",{className:"hutba-title",children:nl?cur.title_nl:cur.title_bs}),
J("blockquote",{className:"hutba-teaser",children:"\u201e"+cur.teaser+"\u201c"}),
X("div",{className:"hutba-info",children:["\u23f1 "+cur.min+T.min,"  \u00b7  \u{1F399} "+T.lang]}),
X("div",{className:"hutba-actions",children:[J("button",{className:"btn btn-gold",onClick:function(){setOp(cur)},children:T.read+" \u2192"}),X("a",{className:"btn btn-outline hb-wa","data-tip":T.watip,href:wa,target:"_blank",rel:"noopener",children:[IkcWaIcon(),T.share]})]}),X("button",{className:"hutba-archbtn","data-tip":T.archtip,onClick:function(){setArch(true)},children:[J("span",{className:"hutba-archbtn-ic",children:IkcArchIcon()}),X("span",{className:"hutba-archbtn-t",children:[J("b",{children:T.arch}),J("small",{children:H.length+" "+(nl?T.cnt:(H.length===1?"hutba":H.length<5?"hutbe":"hutbi"))})]})]})]}),
cur.ayah&&X("div",{className:"hutba-ayah",children:[J("div",{className:"hutba-ayah-ar",dir:"rtl",lang:"ar",children:cur.ayah.ar}),J("div",{className:"hutba-ayah-bs",children:cur.ayah.bs}),cur.ayah.ref&&J("div",{className:"hutba-ayah-ref",children:"\u2014 "+cur.ayah.ref})]})]}),
]}),
arch&&J(IkcHutbaArchive,{lang:e,items:H,T:T,onPick:function(a){setArch(false);setOp(a)},onClose:function(){setArch(false)}}),
op&&J(IkcHutbaReader,{lang:e,item:op,onClose:function(){setOp(null)}})]})}
