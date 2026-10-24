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
function IkcFeedItem(m){m=Object.assign({},m,{subject:String(m.subject).replace(/^((fwd?|re):\s*)+/i,"")});var d=new Date(m.sent_iso),mb=["januar","februar","mart","april","maj","juni","juli","august","septembar","oktobar","novembar","decembar"],mn=["januari","februari","maart","april","mei","juni","juli","augustus","september","oktober","november","december"],ab=["Jan","Feb","Mar","Apr","Maj","Jun","Jul","Aug","Sep","Okt","Nov","Dec"],
txt=m.blocks.filter(function(b){return b[0]==="p"}).map(function(b){return b[1]}),sn=txt.filter(function(x){return x.length>70})[0]||txt[0]||"";
if(sn.length>180)sn=sn.slice(0,177).replace(/\s+\S*$/,"")+"\u2026";
var sw={podsjetnik:1,obavijest:1,newsletter:1,fwd:1},w=(m.subject.match(/[A-Za-z\u010C\u010D\u0106\u0107\u0160\u0161\u017D\u017E\u0110\u0111]{4,}/g)||[]).filter(function(x){return!sw[x.toLowerCase()]})[0]||"Newsletter",
n=m.blocks.reduce(function(a,b){return a+(b[0]==="link"?0:b[1].split(/\s+/).length)},0);
return{id:m.id,edition:ab[d.getMonth()]+" "+d.getFullYear(),sent_iso:m.sent_iso,subject_nl:m.subject,subject_bs:m.subject,snippet_nl:sn,snippet_bs:sn,tags_nl:[],tags_bs:[],cover_glyph:w,url:"#",blocks:m.blocks,title_bs:m.subject,title_nl:m.subject,date_bs:d.getDate()+". "+mb[d.getMonth()]+" "+d.getFullYear()+".",date_nl:d.getDate()+" "+mn[d.getMonth()]+" "+d.getFullYear(),min:Math.max(1,Math.round(n/200)),label_bs:"Newsletter",label_nl:"Nieuwsbrief"}}
function IkcLetterList(st,feed){var nz=function(s){return String(s).toLowerCase().replace(/^(fwd?|re):\s*/,"").replace(/[^a-z0-9\u0161\u0111\u010D\u0107\u017E]+/g," ").trim()},seen={},out=[];
(feed||[]).map(IkcFeedItem).concat(st).forEach(function(x){var k=nz(x.subject_bs);if(!seen[k]){seen[k]=1;out.push(x)}});
return IkcLetters(out).slice(0,6)}
