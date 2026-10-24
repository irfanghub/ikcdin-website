function IkcHeroEvents({lang:e}){var J=o.jsx,X=o.jsxs,nl=e==="nl",ev=IkcEvents();
return X("div",{className:"vk-panel hero-ev",children:[
J("div",{className:"hero-ev-t",children:"\u{1F4C5} "+(nl?"KOMENDE ACTIVITEITEN":"PREDSTOJE\u0106E AKTIVNOSTI")}),
ev.map(function(r,i){return X("div",{className:"hero-ev-row",children:[
X("div",{className:"hero-ev-d",children:[J("b",{children:r.day}),J("small",{children:nl?r.m_nl:r.m_bs})]}),
X("div",{className:"hero-ev-x",children:[J("div",{className:"hero-ev-n",children:nl?r.t_nl:r.t_bs}),J("div",{className:"hero-ev-m",children:(nl?r.meta_nl:r.meta_bs).replace(" \xB7 IKC Din","")})]})]},i)})]})}
