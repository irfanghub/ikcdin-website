function IkcRowsFor(sel,nl){var R=IKC_RASP,td=(new Date().getDay()+6)%7,dd=new Date();dd.setDate(dd.getDate()+((sel-td+7)%7));var jt=IkcDst(dd)?"14:00":"13:00";
var pk=R.prayers[String(sel)],ptxt=pk==="all"?(nl?"Alle 5 gebeden \xB7 volgens vaktija":"Svih 5 namaza \xB7 po vaktiji"):pk==="evening"?(nl?"Maghrib en Isha \xB7 volgens vaktija":"Ak\u0161am i jacija \xB7 po vaktiji"):pk==="juma"?(nl?"Vrijdaggebed "+jt+" \xB7 overige gebeden volgens vaktija":"D\u017Euma "+jt+" \xB7 ostali namazi po vaktiji"):"",rows=[];
R.acts.forEach(function(a){var s=a.slots.filter(function(x){return x.day===sel});if(!s.length)return;var t,sub=[];
if(s.length>1){var fr=s.map(function(x){return x.from}).sort()[0],to=s.map(function(x){return x.to}).sort().pop();t=fr;sub.push(s.length+(nl?" groepen":" grupe"));if(to)sub.push((nl?"tot ":"do ")+to)}
else{var x=s[0];t=x.from||"";if(x.to)sub.push((nl?"tot ":"do ")+x.to)}
rows.push({t:t,s:s[0].sort||t||"99",c:a.color,n:nl?a.title_nl:a.title_bs,m:sub.join(" \xB7 ")})});
rows.sort(function(a,b){return a.s<b.s?-1:a.s>b.s?1:0});return{pray:ptxt,rows:rows}}
function IkcPopAktiv(nl){var J=o.jsx,X=o.jsxs,td=(new Date().getDay()+6)%7,r=IkcRowsFor(td,nl),R=IKC_RASP;
return X("div",{className:"nav-pop-list",children:[J("div",{className:"nav-pop-row",children:J("span",{children:"\u{1F4C5} "+(nl?"Vandaag":"Danas")+" \xB7 "+(nl?R.days_nl:R.days_bs)[td]})}),
r.pray&&J("div",{className:"nav-pop-row",children:J("span",{children:"\u{1F54C} "+r.pray})}),
r.rows.slice(0,3).map(function(a,i){return X("div",{className:"nav-pop-row",children:[J("span",{className:"nav-pop-step",style:{color:a.c},children:a.t||"\u2022"}),J("span",{children:a.n})]},i)}),
!r.rows.length&&!r.pray&&J("div",{className:"nav-pop-row",children:J("span",{children:nl?"Geen activiteiten gepland":"Nema planiranih aktivnosti"})})]})}
function IkcAktiv({lang:e}){var J=o.jsx,X=o.jsxs,nl=e==="nl",R=IKC_RASP,tk=_e.default.useState(0),tick=tk[1],tp=_e.default.useState(null),tip=tp[0],setTip=tp[1],td=(new Date().getDay()+6)%7,T0=540,T1=1380,HP=50,H=(T1-T0)/60*HP;
_e.default.useEffect(function(){var i=setInterval(function(){tick(function(x){return x+1})},60000);return function(){clearInterval(i)}},[]);
function dateOf(d){var x=new Date();x.setHours(12,0,0,0);x.setDate(x.getDate()+((d-td+7)%7));return x}
function mm(s){var a=s.split(":");return +a[0]*60+ +a[1]}
function hm(m){return String(Math.floor(m/60)).padStart(2,"0")+":"+String(m%60).padStart(2,"0")}
var evs=[[],[],[],[],[],[],[]];
R.acts.forEach(function(a){a.slots.forEach(function(s){var st,en,dash=false,det="";
if(s.from){st=mm(s.from);en=s.to?mm(s.to):st+60;dash=!s.to;det=s.from+(s.to?"\u2013"+s.to:"")}
else if(s.when_bs){var t=Ud(dateOf(s.day));st=mm(t[4]);en=mm(t[5]);dash=true;det=nl?"tussen maghrib en isha":"izme\u0111u ak\u0161ama i jacije"}else return;
evs[s.day].push({a:a.id,c:a.color,n:nl?a.short_nl:a.short_bs,full:nl?a.title_nl:a.title_bs,s:st,e:en,dash:dash,det:det,note:nl?s.note_nl:s.note_bs})})});
var jd=dateOf(4),jh=IkcDst(jd)?840:780;evs[4].push({a:"juma",c:"#c9a84c",n:"D\u017euma",full:nl?"Vrijdaggebed (D\u017euma)":"D\u017euma",s:jh,e:jh+45,dash:false,gold:true,det:hm(jh),note:nl?"zomer 14:00 \xB7 winter 13:00":"ljeti 14:00 \xB7 zimi 13:00"});
evs.forEach(function(L){var acts={},ord=[];L.forEach(function(v){var q=acts[v.a];if(!q){q=acts[v.a]={s:1e9,e:0,l:0};ord.push(v.a)}q.s=Math.min(q.s,v.s);q.e=Math.max(q.e,v.e)});
var placed=[];ord.forEach(function(k){var q=acts[k],l=0;while(placed.some(function(p){return p.l===l&&p.s<q.e&&q.s<p.e}))l++;q.l=l;placed.push(q)});
var nn=placed.reduce(function(m,p){return Math.max(m,p.l+1)},1);L.forEach(function(v){v.l=acts[v.a].l;v.nn=nn})});
var DN=nl?["MA","DI","WO","DO","VR","ZA","ZO"]:["PON","UTO","SRI","\u010CET","PET","SUB","NED"],jt=IkcDst(jd)?"14:00":"13:00",
PR=nl?["","","Maghrib \xB7 Isha","Maghrib \xB7 Isha","Vrijdaggebed "+jt+" + 4 gebeden","Alle 5 gebeden","Alle 5 gebeden"]:["","","Ak\u0161am \xB7 Jacija","Ak\u0161am \xB7 Jacija","D\u017euma "+jt+" + 4 namaza","Svih 5 namaza","Svih 5 namaza"],
now=new Date(),nm=now.getHours()*60+now.getMinutes(),cells=[];
cells.push(J("div",{className:"ikc-hd"},"h"));DN.forEach(function(d,i){cells.push(X("div",{className:"ikc-hd"+(i===td?" today":""),children:[d,i===td&&J("span",{className:"ikc-today",children:nl?"VANDAAG":"DANAS"})]},"d"+i))});
cells.push(J("div",{className:"ikc-pr none",children:"\u{1F54C}"},"p"));PR.forEach(function(p,i){cells.push(J("div",{className:"ikc-pr"+(p?"":" none"),children:p?"\u{1F54C} "+p:""},"pr"+i))});
var ax=[];for(var m=T0;m<=T1;m+=60)ax.push(J("span",{style:{top:(m-T0)/60*HP},children:hm(m)},m));
cells.push(J("div",{className:"ikc-axis",children:ax},"ax"));
evs.forEach(function(L,d){var kids=[];L.forEach(function(v,k){if(v.s>=T1||v.e<=T0)return;var s0=Math.max(v.s,T0),e0=Math.min(v.e,T1);
kids.push(X("div",{className:"ikc-ev"+(v.dash?" dash":"")+(v.gold?" gold":""),style:{"--c":v.c,top:(s0-T0)/60*HP+1,height:(e0-s0)/60*HP-2,left:"calc("+v.l*100/v.nn+"% + 3px)",width:"calc("+100/v.nn+"% - 6px)"},onMouseMove:function(ev){setTip({x:ev.clientX,y:ev.clientY,t:v.full,d:v.det+(v.note?" \xB7 "+v.note:"")})},onMouseLeave:function(){setTip(null)},children:[J("b",{children:v.n}),J("small",{children:v.det})]},k))});
if(d===td&&nm>=T0&&nm<=T1)kids.push(J("div",{className:"ikc-now",style:{top:(nm-T0)/60*HP}},"now"));
cells.push(J("div",{className:"ikc-col"+(d===6?" sun":"")+(d===td?" today":""),children:kids},"c"+d))});
return X("section",{className:"section ikc-aktiv",children:[X("div",{className:"container",children:[
J("div",{className:"section-label",children:"\u{1F4C5} "+(nl?"ACTIVITEITEN":"AKTIVNOSTI")}),J("h1",{className:"section-title",children:nl?"Activiteitenrooster":"Raspored aktivnosti"}),J("div",{className:"divider"}),
J("p",{className:"section-sub",style:{marginBottom:26},children:nl?"Alles wat er in IKC Din gebeurt, de hele week op \xE9\xE9n plek. Gebedstijden zijn altijd volgens de vaktija.":"Sve \u0161to se doga\u0111a u IKC Din tokom sedmice na jednom mjestu. Vrijeme namaza je uvijek po vaktiji."}),
J("div",{className:"ikc-scroller",children:J("div",{className:"ikc-cal",style:{"--H":H+"px","--HP":HP+"px"},onMouseLeave:function(){setTip(null)},children:J("div",{className:"ikc-cal-grid",children:cells})})}),
X("div",{className:"ikc-foot",children:[J("span",{children:"\u{1F54C} "+(nl?"Vrijdaggebed: 13:00 in de winter \xB7 14:00 in de zomer":"D\u017euma: 13:00 zimi \xB7 14:00 ljeti")}),J("span",{children:nl?"Gestippelde rand = tijd niet bevestigd of volgens de vaktija":"Isprekidani okvir = vrijeme nije potvr\u0111eno ili je po vaktiji"}),J("span",{children:"\u26BD "+(nl?"Ontmoeting voor jongeren: tijdstip volgt binnenkort":"Dru\u017eenje za omladinu: termin uskoro")})]})]}),
tip&&X("div",{className:"ikc-tip",style:{left:Math.min(window.innerWidth-280,tip.x+14),top:tip.y+16},children:[J("b",{children:tip.t}),tip.d]})]})}
