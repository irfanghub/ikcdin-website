function IkcLetters(a){return a.slice().sort(function(x,y){return new Date(y.sent_iso)-new Date(x.sent_iso)})}
function IkcDst(d){var y=d.getFullYear(),a=new Date(y,2,31),b=new Date(y,9,31);for(;a.getDay()!==0;)a.setDate(a.getDate()-1);for(;b.getDay()!==0;)b.setDate(b.getDate()-1);return d>=a&&d<b}
function IkcNews(a){var M={januari:0,februari:1,maart:2,april:3,mei:4,juni:5,juli:6,augustus:7,september:8,oktober:9,november:10,december:11},ts=function(x){var p=String(x.date||"").split(" ");return new Date(+p[2],M[p[1]]||0,+p[0]).getTime()||0};return a.slice().sort(function(x,y){return ts(y)-ts(x)})}
function IkcEvents(){var now=new Date(),mn=["JAN","FEB","MRT","APR","MEI","JUN","JUL","AUG","SEP","OKT","NOV","DEC"],mb=["JAN","FEB","MAR","APR","MAJ","JUN","JUL","AVG","SEP","OKT","NOV","DEC"],
nx=function(dow,h){var d=new Date(now.getFullYear(),now.getMonth(),now.getDate(),h,0);d.setDate(d.getDate()+(dow-d.getDay()+7)%7);if(d<now)d.setDate(d.getDate()+7);return d},
mk=function(d,o){o.day=String(d.getDate());o.m_nl=mn[d.getMonth()];o.m_bs=mb[d.getMonth()];o._t=d.getTime();return o},
hal=nx(0,12),mek=nx(0,12),ju=nx(5,15),w=IkcDst(ju);
return[
mk(hal,{t_nl:"Halaqa \u2014 Koranlessen voor vrouwen",t_bs:"Halaqa \u2014 u\u010Denje Kur'ana za \u017Eene",meta_nl:"Elke zondag om 10:00 \xB7 IKC Din",meta_bs:"Nedjeljom u 10:00 \xB7 IKC Din",b_nl:"Wekelijks",b_bs:"Sedmi\u010Dno"}),
mk(mek,{t_nl:"Mekteb",t_bs:"Mekteb",meta_nl:"Elke zondag vanaf 10:00 \xB7 IKC Din",meta_bs:"Nedjeljom od 10:00 \xB7 IKC Din",b_nl:"Wekelijks",b_bs:"Sedmi\u010Dno"}),
mk(ju,{t_nl:"Vrijdaggebed om "+(w?"14:00":"13:00"),t_bs:"D\u017Euma u "+(w?"14:00":"13:00"),meta_nl:"Vrijdag \xB7 "+(w?"zomertijd":"wintertijd")+" \xB7 IKC Din",meta_bs:"Petak \xB7 "+(w?"ljetno":"zimsko")+" vrijeme \xB7 IKC Din",b_nl:w?"Zomertijd":"Wintertijd",b_bs:w?"Ljetno vrijeme":"Zimsko vrijeme"})
].sort(function(a,b){return a._t-b._t})}
