/**
 * IKC DIN – Gmail-label "website" -> JSON-feed voor de website
 *
 * Alleen mails MET het label "website" komen in de feed. Niets anders wordt gelezen of gepubliceerd.
 * Handtekening (vanaf "Predsjednik:") en doorstuur-kopregels worden eruit gehaald.
 */
var LABEL = 'website';
var MAX_THREADS = 20;

function doGet() {
  var cache = CacheService.getScriptCache();
  var hit = cache.get('feed');
  if (hit) return out_(hit);
  var json = JSON.stringify({ updated: new Date().toISOString(), items: buildItems_() });
  if (json.length < 90000) cache.put('feed', json, 600); // 10 min cache
  return out_(json);
}

function out_(s) {
  return ContentService.createTextOutput(s).setMimeType(ContentService.MimeType.JSON);
}

function buildItems_() {
  var threads = GmailApp.search('label:' + LABEL, 0, MAX_THREADS);
  var items = [];
  threads.forEach(function (t) {
    var m = t.getMessages()[0];
    var blocks = toBlocks_(cleanBody_(m.getPlainBody()));
    if (!blocks.length) return;
    items.push({
      id: m.getId(),
      sent_iso: Utilities.formatDate(m.getDate(), 'Europe/Amsterdam', "yyyy-MM-dd'T'HH:mm:ssXXX"),
      subject: m.getSubject().replace(/^((fwd?|re):\s*)+/i, ''),
      blocks: blocks
    });
  });
  return items;
}

// ---- pure text functions (testable) ----
function cleanBody_(text) {
  text = String(text).replace(/\r\n/g, '\n');
  // forwarded-message header block ("---------- Doorgestuurd bericht ---------- Van:/Datum:/Onderwerp:/Aan:")
  text = text.replace(/^-{3,}[^\n]*(doorgestuurd|forwarded|prosljeđen)[^\n]*-{3,}\n(?:\s*(van|from|datum|date|onderwerp|subject|aan|to|cc)\s*:[^\n]*\n)+/im, '');
  // cut signature block
  var sig = text.search(/\n\s*Predsjednik\s*:/i);
  if (sig > -1) text = text.slice(0, sig);
  return text
    .replace(/<mailto:[^>]*>/gi, '')
    .replace(/<https?:\/\/[^>]*>/gi, '')
    .replace(/\[(image|cid):[^\]]*\]/gi, '')
    .replace(/\*([^*\n]+)\*/g, '$1')
    .trim();
}

function toBlocks_(text) {
  return text.split(/\n\s*\n/).map(function (p) {
    return p.replace(/\s*\n\s*/g, ' ').trim();
  }).filter(function (p) { return p; }).map(function (p) {
    return /^https?:\/\/\S+$/.test(p) ? ['link', p] : ['p', p];
  });
}
