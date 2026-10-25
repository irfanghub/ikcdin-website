var IKC_RASP=__RASP__;
function IkcHeroSched({lang:e}){var J=o.jsx,X=o.jsxs,nl=e==="nl",R=IKC_RASP,td=(new Date().getDay()+6)%7,st=_e.default.useState(td),sel=st[0],setSel=st[1],
dd=new Date();dd.setDate(dd.getDate()+((sel-td+7)%7));var jt=IkcDst(dd)?"14:00":"13:00";
var pk=R.prayers[String(sel)],ptxt=pk==="all"?(nl?"Alle 5 gebeden \xB7 volgens vaktija":"Svih 5 namaza \xB7 po vaktiji"):pk==="evening"?(nl?"Maghrib en Isha \xB7 volgens vaktija":"Ak\u0161am i jacija \xB7 po vaktiji"):pk==="juma"?(nl?"Vrijdaggebed "+jt+" \xB7 overige gebeden volgens vaktija":"D\u017Euma "+jt+" \xB7 ostali namazi po vaktiji"):"";
var rows=[];R.acts.forEach(function(a){var s=a.slots.filter(function(x){return x.day===sel});if(!s.length)return;
var title=nl?a.title_nl:a.title_bs,aud=nl?a.sub_nl:a.sub_bs,t,sub=[];
if(s.length>1){var fr=s.map(function(x){return x.from}).sort()[0],to=s.map(function(x){return x.to}).sort().pop();t=fr;sub.push(s.length+(nl?" groepen":" grupe"));if(to)sub.push((nl?"tot ":"do ")+to)}
else{var x=s[0];t=x.from||"";if(x.to)sub.push((nl?"tot ":"do ")+x.to);var nt=nl?x.note_nl:x.note_bs;if(nt)sub.push(nt);var wh=nl?x.when_nl:x.when_bs;if(wh)sub.push(wh)}
if(aud)sub.push(aud);
rows.push({t:t,s:s[0].sort||t||"99",c:a.color,n:title,m:sub.join(" \xB7 ")})});
rows.sort(function(a,b){return a.s<b.s?-1:a.s>b.s?1:0});
var days=nl?R.days_nl:R.days_bs,lt=nl?R.letters_nl:R.letters_bs;
return X("div",{className:"vk-panel hero-ev hs-card",children:[
X("div",{className:"hs-head",children:[J("div",{className:"hero-ev-t",children:"\u{1F4C5} "+(nl?"ACTIVITEITENROOSTER":"RASPORED AKTIVNOSTI")}),J("div",{className:"hs-day",children:days[sel]})]}),
J("div",{className:"hs-tabs",children:lt.map(function(l,i){return X("button",{className:"hs-tab"+(i===sel?" on":""),title:days[i],"aria-pressed":i===sel,onClick:function(){setSel(i)},children:[l,i===td&&J("span",{className:"hs-dot"})]},i)})}),
ptxt&&X("div",{className:"hs-pray",children:[J("span",{children:"\u{1F54C}"}),J("span",{children:ptxt})]}),
J("div",{className:"hs-list",children:rows.length?rows.map(function(r,i){return X("div",{className:"hs-row",children:[J("div",{className:"hs-t",style:{color:r.c},children:r.t||"\u2022"}),X("div",{className:"hs-x",children:[J("div",{className:"hs-n",children:r.n}),J("div",{className:"hs-m",children:r.m})]})]},i)}):(pk==="none"?J("div",{className:"hs-empty",children:nl?"Geen activiteiten gepland":"Nema planiranih aktivnosti"}):null)})]})}
