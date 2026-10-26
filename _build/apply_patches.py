#!/usr/bin/env python3
"""IKC DIN site build.  Run from the repo root:   python3 _build/apply_patches.py

Input : _build/base/bundle.js + _build/base/index.html  (= pure Claude Design export, never edited by hand)
        _build/content/*.json   (Irfan's content: hutbe, news, vaktija table)
        _build/patches/*        (nav hover windows, hutba section, events, styling)
Output: ./bundle.js and ./index.html  (what Vercel serves)

After a NEW Claude Design export: copy the new bundle.js / index.html into _build/base/ and run this script again.
All content added by Irfan then comes back automatically."""
import json, os, sys
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
B = lambda *p: os.path.join(ROOT, '_build', *p)
rd = lambda p: open(p, encoding='utf-8').read()

def rep(src, old, new, count=1):
    n = src.count(old)
    if n != count:
        sys.exit(f"PATCH FAILED (found {n}x, expected {count}): {old[:90]!r}\n-> the Claude Design export changed; adapt this patch.")
    return src.replace(old, new)

def match(s, j, o, c):  # string-aware bracket matching
    d = 0; k = j; q = None; esc = False
    while k < len(s):
        ch = s[k]
        if q:
            if esc: esc = False
            elif ch == '\\': esc = True
            elif ch == q: q = None
        elif ch in '"\'`': q = ch
        elif ch == o: d += 1
        elif ch == c:
            d -= 1
            if d == 0: return k
        k += 1
    sys.exit('unbalanced')

bundle = rd(B('base', 'bundle.js'))
html = rd(B('base', 'index.html'))
jd = lambda o: json.dumps(o, ensure_ascii=True, separators=(',', ':'))

# 1. vaktija: official IZBN table instead of live calculation
i = bundle.find('function Ud(e){'); j = match(bundle, bundle.find('{', i), '{', '}')
bundle = bundle[:i] + rd(B('patches', 'vaktija.js')).strip().replace('__VT__', rd(B('content', 'vaktija_2026.json')).strip()) + bundle[j+1:]
bundle = rep(bundle, r'Eindhoven \xB7 51.44\xB0N \xB7 Hanafi / MWL', r'Eindhoven \xB7 IZBN vaktija 2026')

# 2. news (content) + always newest first; dates per language
i = bundle.find('_p=[{tag_nl'); j = match(bundle, bundle.find('[', i), '[', ']')
bundle = bundle[:i] + '_p=' + jd(json.load(open(B('content', 'news.json'), encoding='utf-8'))) + bundle[j+1:]
bundle = rep(bundle, '_p.map((r,a)=>', 'IkcNews(_p).map((r,a)=>')
bundle = rep(bundle, '[r.date,r.flyer&&', '[e==="bs"&&r.date_bs?r.date_bs:r.date,r.flyer&&')

# 3. upcoming activities: card in the hero under the vaktija panel (option C); news gets full width
bundle = rep(bundle, 'className:"hero-vk",children:(0,o.jsxs)("div",{className:"vk-panel",children:[',
             'className:"hero-vk",children:[(0,o.jsxs)("div",{className:"vk-panel",children:[')
bundle = rep(bundle, '[0]]})]})]})})]})}function Op(',
             '[0]]})]})]}),(0,o.jsx)(IkcHeroSched,{lang:e,setPage:t})]})]})}function Op(')
bundle = rep(bundle, 'function Wp({lang:e}){', rd(B('patches', 'events.js')).strip() + '\n' + rd(B('patches', 'herosched.js')).strip().replace('__RASP__', jd(json.load(open(B('content', 'raspored.json'), encoding='utf-8')))) + '\n' + rd(B('patches', 'aktiv.js')).strip() + '\nfunction Wp({lang:e}){')
bundle = rep(bundle, 'gridTemplateColumns:"1fr 1fr",gap:64,alignItems:"start"', 'gridTemplateColumns:"1fr",gap:0,alignItems:"start"')
bundle = rep(bundle, 'className:"stagger",children:IkcNews(_p).map((r,a)=>', 'className:"stagger ikc-news-grid",children:IkcNews(_p).map((r,a)=>')
# drop the old events column from the news section
k = bundle.find(',(0,o.jsxs)("div",{children:[(0,o.jsxs)("div",{className:"section-label",children:["\\u{1F4C5} ",t.events_label]})')
assert k > 0, 'events column not found'
p = bundle.find('(0,o.jsxs)(', k)
q = match(bundle, bundle.find('(', p + 10), '(', ')')
bundle = bundle[:k] + bundle[q+1:]

# 3b. new tab "Aktivnosti": nav arrays + route
bundle = rep(bundle, 'nav:["Home","Ons Verhaal","Lidmaatschap","Mekteb","Doneer","Contact"],sections:["home","verhaal","aanmelden","mekteb","inzameling","contact"]',
             'nav:["Home","Ons Verhaal","Lidmaatschap","Mekteb","Activiteiten","Doneer","Contact"],sections:["home","verhaal","aanmelden","mekteb","aktiv","inzameling","contact"]')
bundle = rep(bundle, r'nav:["Po\u010Detna","Na\u0161a Pri\u010Da","\u010Clanstvo","Mekteb","Doniraj","Kontakt"],sections:["home","verhaal","aanmelden","mekteb","inzameling","contact"]',
             r'nav:["Po\u010Detna","Na\u0161a Pri\u010Da","\u010Clanstvo","Mekteb","Aktivnosti","Doniraj","Kontakt"],sections:["home","verhaal","aanmelden","mekteb","aktiv","inzameling","contact"]')
bundle = rep(bundle, 'n==="mekteb"&&(0,o.jsx)(Fp,{lang:e}),', 'n==="mekteb"&&(0,o.jsx)(Fp,{lang:e}),n==="aktiv"&&(0,o.jsx)(IkcAktiv,{lang:e}),')

# 4. contact block: Džuma time summer/winter
bundle = rep(bundle, r'Vrijdag Jumua: 13:30', r'Vrijdag Jumua: 14:00 (zomertijd) \xB7 13:00 (wintertijd)')
bundle = rep(bundle, r'Petak D\u017Euma: 13:30', r'Petak D\u017Euma: 14:00 (ljetno) \xB7 13:00 (zimsko vrijeme)')

# 5. newsletter cards: Bosnian month names + "x ago" computed from the real date
bundle = rep(bundle, ',v=e==="nl"?"nl-NL":"hr";return c.toLocaleDateString(v,{day:"numeric",month:"short",year:"numeric"})',
             ';if(e!=="nl")return c.getDate()+". "+["jan","feb","mar","apr","maj","jun","jul","aug","sep","okt","nov","dec"][c.getMonth()]+" "+c.getFullYear()+".";return c.toLocaleDateString("nl-NL",{day:"numeric",month:"short",year:"numeric"})')
bundle = rep(bundle, 'u(s.sent_ago_days)', 'u(Math.max(0,Math.floor((Date.now()-new Date(s.sent_iso).getTime())/864e5)))')

# 5b. newsletters: real mails from info@icc-din.nl instead of the Mailchimp placeholders
i = bundle.find('Cp=[{'); j = match(bundle, bundle.find('[', i), '[', ']')
bundle = bundle[:i] + 'Cp=' + jd(json.load(open(B('content', 'newsletters.json'), encoding='utf-8'))) + bundle[j+1:]
bundle = rep(bundle, 'Cp.map((s,c)=>', 'IkcLetterList(Cp,fd).map((s,c)=>')
bundle = rep(bundle, 'onClick:s.flyer?v=>{v.preventDefault(),i(s)}:void 0,style:{"--i":c,cursor:"pointer"}',
             'onClick:s.flyer?v=>{v.preventDefault(),i(s)}:s.blocks?v=>{v.preventDefault(),window.dispatchEvent(new CustomEvent("ikc-read",{detail:s}))}:void 0,style:{"--i":c,cursor:"pointer"}')
bundle = rep(bundle, r'nl_live:"Live \xB7 Mailchimp feed"', r'nl_live:"Uit onze inbox"')
bundle = rep(bundle, r'nl_live:"U\u017Eivo \xB7 Mailchimp feed"', r'nl_live:"Iz na\u0161eg inboxa"')
bundle = rep(bundle, r'nl_sub:"Elke nieuwsbrief die we versturen verschijnt automatisch hier \u2014 via Mailchimp."',
             r'nl_sub:"Elke nieuwsbrief en mededeling die we naar de gemeenschap sturen verschijnt hier \u2014 rechtstreeks uit info@icc-din.nl."')
bundle = rep(bundle, r'nl_sub:"Svaki newsletter koji po\u0161aljemo automatski se pojavljuje ovdje \u2014 putem Mailchimpa."',
             r'nl_sub:"Svaki newsletter i obavijest koji po\u0161aljemo d\u017Eematlijama pojavljuje se ovdje \u2014 direktno iz info@icc-din.nl."')
bundle = rep(bundle, 'title:"Auto-sync via Mailchimp RSS"', 'title:"info@icc-din.nl"')
bundle = rep(bundle, 's.preventDefault();let c=s.target.elements.email.value;c&&(a(c),s.target.reset())',
             's.preventDefault();let c=s.target.elements.email.value;c&&(window.location.href="mailto:info@icc-din.nl?subject="+encodeURIComponent("Prijava na newsletter / Aanmelding nieuwsbrief")+"&body="+encodeURIComponent("Molim da me dodate na listu / Graag toevoegen aan de lijst: "+c),s.target.reset())')

# 5b2. live feed of labelled Gmail mails (Google Apps Script) - merged with the curated items above
bundle = rep(bundle, '[r,a]=_e.default.useState(null);_e.default.useEffect(()=>{if(!r)return;',
             '[r,a]=_e.default.useState(null),[fd,setFd]=_e.default.useState([]);_e.default.useEffect(function(){if(!window.IKC_FEED_URL)return;var c=!0;fetch(window.IKC_FEED_URL).then(function(x){return x.json()}).then(function(j){c&&j&&j.items&&setFd(j.items)}).catch(function(){});return function(){c=!1}},[]),_e.default.useEffect(()=>{if(!r)return;')
feed_url = json.load(open(B('content', 'feed.json'), encoding='utf-8')).get('url', '')

# 5c. countdown after the last prayer: use TOMORROW's sabah (not today's)
bundle = rep(bundle, 'return{idx:0,remain:24*3600-i+(e[0]?r(e[0]):0)}',
             'var nx=Ud(new Date(t.getFullYear(),t.getMonth(),t.getDate()+1));return{idx:0,remain:24*3600-i+r(nx[0])}')

# 5d. newsletter subscribe button: nobody pays for a newsletter -> "Prijavite se" / "Aanmelden"
bundle = rep(bundle, 'nl_subscribe:"Abonneren"', 'nl_subscribe:"Aanmelden"')
bundle = rep(bundle, 'nl_subscribe:"Pretplatite se"', 'nl_subscribe:"Prijavite se"')

# 6. nav tabs with hover windows
bundle = rep(bundle, 'function Lp({lang:e,setLang:t', rd(B('patches', 'nav.js')).strip() + '\nfunction Lp({lang:e,setLang:t')
bundle = rep(bundle, '[c,v]=_e.default.useState(!1),h=f=>{u(f),v(!1),window.scrollTo',
             '[c,v]=_e.default.useState(!1),[hv,setHv]=_e.default.useState(null),h=f=>{u(f),v(!1),setHv(null),window.scrollTo')
old_map = 's.nav.map((f,k)=>(0,o.jsx)("button",{className:`nav-link${l===s.sections[k]?" active":""}`,onClick:()=>h(s.sections[k]),children:f},k))'
new_map = ('(0,o.jsx)("div",{className:"nav-tabs",onMouseLeave:()=>setHv(null),children:s.nav.map((f,k)=>(0,o.jsxs)("div",{className:"nav-item"+(hv===k?" is-open":""),onMouseEnter:()=>setHv(k),children:[(0,o.jsx)("button",{className:`nav-link${l===s.sections[k]?" active":""}`,onClick:()=>h(s.sections[k]),onFocus:()=>setHv(k),children:f}),hv===k&&(0,o.jsx)(IkcNavPop,{lang:e,s:s,sec:s.sections[k],go:h,right:k>=3})]},k))})')
bundle = rep(bundle, old_map, new_map)

# 7. Friday hutba section on the home page (between hadis strip and news)
hut = rd(B('patches', 'hutba.js')).strip().replace('__HUTBE__', jd(json.load(open(B('content', 'hutbe.json'), encoding='utf-8'))))
bundle = rep(bundle, 'function Wp({lang:e}){', hut + '\nfunction Wp({lang:e}){')
bundle = rep(bundle, '(0,o.jsx)(rv,{lang:e}),(0,o.jsx)(Wp,{lang:e})', '(0,o.jsx)(IkcHutba,{lang:e}),(0,o.jsx)(rv,{lang:e}),(0,o.jsx)(Wp,{lang:e})')

# 8. styling
html = rep(html, '</head>', '<script>window.IKC_FEED_URL=' + json.dumps(feed_url) + ';</script>\n<style id="ikc-patch">\n' + rd(B('patches', 'style.css')).replace('<style id="ikc-patch-okt26">', '').replace('</style>', '').strip() + '\n</style>\n</head>')

open(os.path.join(ROOT, 'bundle.js'), 'w', encoding='utf-8').write(bundle)
open(os.path.join(ROOT, 'index.html'), 'w', encoding='utf-8').write(html)
print('OK: bundle.js', len(bundle), 'bytes, index.html', len(html), 'bytes')
