/* ============================================================
   Renovatie-foto's — manifest (Google Drive)
   Vul de folder op "Iedereen met de link → Viewer" en alle
   foto's laden automatisch via onderstaande URLs.
   Nummer = bestandsnaam in Drive (1.jpg ... 28.jpg)
   ============================================================ */
window.RENO_PHOTOS = {
  1:'1bTvEAClMEcoiTIZOmBk6Tc3fdP_3FH5k',
  2:'1UOshy2i6ueNrXt4s-dqnBq2Md_3SORJJ',
  3:'1usLVhQ-QU-SC8vue1tyIZ8mZLOgERwr7',
  4:'13A4ag_M9fSOsx8zSh5CVK9Bo8sD3LWtd',
  5:'1WoLmWlI2SYU5EABeluxs90i0rx02bHNn',
  6:'1QDa9-BHrg7twPqKIr3Jk1ZGVUMvJy3ef',
  7:'128MG3FG6Woj-UScAirL92Rfg5wvpm7jk',
  8:'1owHbtYYVGnC8F5x0oNyByz9Shnv1uGh3',
  9:'1FMgMYbew3uXkWaVGE4Umu3ySIVZgzF6T',
  10:'1QXdusLbSka5NTbx-_7iFxbR5f8jIyDsf',
  11:'1ogHWAFZsTwIeWWGxsya95UI_mOCT-nLO',
  12:'1iOP6suNKvIcpFuNtAtkPQTMl_liISv3Q',
  13:'1CLZCwSZjn3em93-Z6RdWF2KkO37_9KXk',
  14:'1aEIgaqqYwgeWJFIZWz6TJZrGlwbrxnvc',
  15:'1E6fO-kkN0HGoPw72cF8QnzsMNfsNmCd4',
  16:'12W5OZQRlZ0XPyDebSJpCXRnhCDtJXFa8',
  17:'1UTbIWQspZzfMq3FlFUI2WoMAP7UDaBMo',
  18:'1cvmpFqfbOquyx4idc1hpE3FGoM8gnFBt',
  19:'18awJLbkY4l773V6HEh72UbjLfNd4e0gC',
  20:'1ss_pZEvYvqV6Fm21VKgHZTlZouLuAEkB',
  21:'1S-mAjADl4RJFFjafI-ZBn2XTHN610LDE',
  22:'15ZMF-ZkoixV6CTmDFfhV_Xt4ipyxhsqd',
  23:'1Y3Lh5i2xe8Nu37Y6K6mO7xhgIsI2YS6G',
  24:'1uXkwMagikprAiW32AGlF0wLtU1JwBNbQ',
  25:'1ujpXCB_v401MxHIxJaatq1cLD5TeOEi1',
  26:'1PIZvdHeIkBQtinF4n_scc_a180e5gYop',
  27:'1vegSJShorsvvsyk_oS7wpUj8JmE0TrKS',
  28:'1C8kWYWozOLz-H7Y6TvROg4hD1QngPdy-',
};
// Google Drive directe afbeeldings-URL (werkt voor publiek gedeelde bestanden)
window.renoSrc = function(n, w){
  w = w || 1600;
  var id = window.RENO_PHOTOS[Number(n)];
  return id ? ('https://drive.google.com/thumbnail?id=' + id + '&sz=w' + w) : '';
};

/* ---- Eindbeelden uit map "Foto's ikc din" (de NA-foto's) ---- */
window.NA_PHOTOS = {
  dzamija:    '1xaCuiPNVwSsqDMGb9NghEdH5gWTS7fo7', // ikc din dzamija high res — HIGHLIGHT
  daylight:   '1DPsQRTXQ4V5jDlD2tbNfX0p6g9HnOWNB', // IMG_9147 (gevel na — Daylight stond op Overslaan)
  podrum:     '1RzRKWLxV30ggKUY48kX6KP1osNcVf7x4', // kelder / podrum
  divanhana:  '1lJKOapWjtmGslmKPb8qQRk5vh-ypfmra', // divanhana
  mihrab:     '1yBb_QPNDaERaanKFo5lFXAy7fp-z690l', // mihrab
  nightpray:  '1bW_ghc6N7h9x5iMZ48_09VTbWP2ipT4H', // nighttime prayer room
  mekteb:     '1w4GQVKCAjAmbMMppabmlHh0RVHXCxPdR', // mekteb-02 (na — door jou bevestigd)
  exterieur:  '1QEJBDRbkDqj9p7iM6RzyjUBthtA28ggh', // IMG_1186 (gevel)
  img9146:    '1zhKl_VA8h2q6K6WYJQ0aUat9q4VjfAbg', // exterieur alt
  img9147:    '1DPsQRTXQ4V5jDlD2tbNfX0p6g9HnOWNB', // exterieur alt
  img9148:    '1iugzS2nasWWFSISsrjkpprWRbR6Jk_VJ', // interieur
  img9961:    '1_j8tZvmCzvvnilv8BKMVZj-sWCrqxWND', // interieur
};
window.naSrc = function(key, w){
  w = w || 1600;
  var id = window.NA_PHOTOS[key];
  return id ? ('https://drive.google.com/thumbnail?id=' + id + '&sz=w' + w) : '';
};
