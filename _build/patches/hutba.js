var IKC_HUTBE=__HUTBE__;
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
X("div",{className:"hutba-foot",children:[X("a",{className:"btn btn-gold",href:wa,target:"_blank",rel:"noopener",children:["\u{1F4AC} ",nl?"Deel via WhatsApp":"Podijeli na WhatsAppu"]}),J("button",{className:"btn btn-outline",onClick:p.onClose,children:nl?"Sluiten":"Zatvori"})]})]})})}
function IkcHutba({lang:e}){var J=o.jsx,X=o.jsxs,nl=e==="nl",st=_e.default.useState(null),op=st[0],setOp=st[1],H=IKC_HUTBE.slice().sort(function(a,b){return a.id<b.id?1:-1}),cur=H[0],rest=H.slice(1);
_e.default.useEffect(function(){var f=function(a){setOp(a.detail)};window.addEventListener("ikc-read",f);return function(){window.removeEventListener("ikc-read",f)}},[]);
var T=nl?{label:"\u{1F54C} D\u017euma-hutba",title:"De hutba van deze vrijdag",sub:"Elke week publiceren we de preek van de D\u017euma \u2014 lees, deel en kom er altijd op terug.",read:"Lees de hutba",share:"Delen",min:" min leestijd",lang:"Bosnisch",old:"Hutba-archief",now:"Actueel",note:"Elke week komt er een hutba bij \u2014 eerdere blijven hier in het archief.",tag:"Vrijdag \u00b7 D\u017euma"}:{label:"\u{1F54C} D\u017euma hutba",title:"Hutba ovog petka",sub:"Svake sedmice objavljujemo hutbu s d\u017eume \u2014 \u010ditajte, podijelite i vratite se na nju kad god \u017eelite.",read:"Pro\u010ditaj hutbu",share:"Podijeli",min:" min \u010ditanja",lang:"Bosanski",old:"Arhiva hutbi",now:"Aktuelna",note:"Nove hutbe se dodaju svake sedmice \u2014 prethodne ostaju ovdje u arhivi.",tag:"Petak \u00b7 D\u017euma"};
var wa="https://wa.me/?text="+encodeURIComponent(cur.title_bs+" \u2014 IKC DIN Eindhoven\n"+location.origin);
return X("section",{className:"section hutba-sec",id:"hutba",children:[X("div",{className:"container",children:[
J("div",{className:"section-label",children:T.label}),J("h2",{className:"section-title",children:T.title}),J("div",{className:"divider"}),J("p",{className:"section-sub",style:{marginBottom:28},children:T.sub}),
X("div",{className:"hutba-card",children:[
X("div",{className:"hutba-main",children:[X("div",{className:"hutba-tags",children:[J("span",{className:"hutba-tag",children:T.tag}),J("span",{className:"hutba-date",children:nl?cur.date_nl:cur.date_bs})]}),
J("h3",{className:"hutba-title",children:nl?cur.title_nl:cur.title_bs}),
J("blockquote",{className:"hutba-teaser",children:"\u201e"+cur.teaser+"\u201c"}),
X("div",{className:"hutba-info",children:["\u23f1 "+cur.min+T.min,"  \u00b7  \u{1F399} "+T.lang]}),
X("div",{className:"hutba-actions",children:[J("button",{className:"btn btn-gold",onClick:function(){setOp(cur)},children:T.read+" \u2192"}),X("a",{className:"btn btn-outline",href:wa,target:"_blank",rel:"noopener",children:["\u{1F4AC} ",T.share]})]})]}),
cur.ayah&&X("div",{className:"hutba-ayah",children:[J("div",{className:"hutba-ayah-ar",dir:"rtl",lang:"ar",children:cur.ayah.ar}),J("div",{className:"hutba-ayah-bs",children:cur.ayah.bs}),J("div",{className:"hutba-ayah-ref",children:"\u2014 "+cur.ayah.ref})]})]}),
X("div",{className:"hutba-arch",children:[J("div",{className:"hutba-arch-t",children:T.old}),H.map(function(a,i){return X("button",{className:"hutba-arch-row",onClick:function(){setOp(a)},children:[J("span",{children:(i===0?T.now+" \u00b7 ":"")+(nl?a.title_nl:a.title_bs)}),J("span",{className:"hutba-arch-d",children:nl?a.date_nl:a.date_bs})]},i)}),H.length<2&&J("div",{className:"hutba-arch-note",children:T.note})]})]}),
op&&J(IkcHutbaReader,{lang:e,item:op,onClose:function(){setOp(null)}})]})}
