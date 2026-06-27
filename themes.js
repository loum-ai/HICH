/* HICH HOUSE — mood engine
   All 21 moodboard directions as switchable "subpages".
   Each mood sets the full design system: colours, type, tracking, case.
   Colours/fonts are 1:1 from the moodboard source (data-v3).
   Photos are local files, content-verified — every key names what the
   photo actually shows (no more beds in the coworking gallery). */
(function(){
  "use strict";

  /* view mode — ?view=public&mood=XX = the end-customer link: one locked mood,
     no wizard / no mood index / no showcase (chrome hidden via body.public in CSS) */
  var VIEW = new URLSearchParams(location.search);
  var PUBLIC = VIEW.get("view") === "public";
  var lockMood = VIEW.get("mood");
  if (PUBLIC && document.body) document.body.classList.add("public");

  window.HICH_MOODS = [
    { no:"01", name:"Lumière", ref:"Fashion · Timeless Elegance", dark:true,
      vars:{"bg":"#1B1714","ink":"#EFE7D6","panel":"#211C18","panel2":"#262019","accent":"#C49A57","accent2":"#6E3326","ph":"#332c24","muted":"#a99d86","filter":"brightness(.62) saturate(.85) contrast(1.05)"},
      fonts:{"disp":"'Playfair Display',serif","body":"'Outfit',sans-serif","dispw":500,"htrack":".005em","hcase":"none"},
      hero:"salon", photos:[{"key":"snug","cap":"The snug"},{"key":"salon","cap":"Salon"},{"key":"majlis","cap":"The majlis"},{"key":"lounge","cap":"Lantern lounge"},{"key":"dining","cap":"Dining room"}],
      palette:["#EFE7D6","#C49A57","#6E3326","#262019","#1B1714"] },
    { no:"02", name:"Amonre", ref:"Beauty · Subtle Opulence",
      vars:{"bg":"#EFE9DD","ink":"#3A332A","panel":"#F4EFE5","panel2":"#FAF6EE","accent":"#B59A6E","accent2":"#CDB892","ph":"#d8cdb8","muted":"#9b8f78","filter":"none"},
      fonts:{"disp":"'Cormorant Garamond',serif","body":"'Jost',sans-serif","dispw":400,"htrack":".01em","hcase":"none"},
      hero:"retreat", photos:[{"key":"salon","cap":"Salon"},{"key":"lounge","cap":"Lantern lounge"},{"key":"room","cap":"Room"},{"key":"stay","cap":"Suite"},{"key":"dining","cap":"Dining room"},{"key":"snug","cap":"The snug"},{"key":"poolside","cap":"Poolside"},{"key":"retreat","cap":"Retreat"}],
      palette:["#F4EFE5","#E4D9C4","#CDB892","#9B8F78","#3A332A"] },
    { no:"03", name:"Botanical Commune", ref:"Editorial · The Revival of Beauty",
      vars:{"bg":"#EFE7D6","ink":"#23201A","panel":"#F4ECDC","panel2":"#F8F2E6","accent":"#7A7A45","accent2":"#E3D8C0","ph":"#cdbf9f","muted":"#8b8268","filter":"none"},
      fonts:{"disp":"'Bodoni Moda',serif","body":"'Jost',sans-serif","dispw":500,"htrack":".02em","hcase":"uppercase"},
      hero:"garden", photos:[{"key":"garden","cap":"The garden"},{"key":"pavilion","cap":"The pavilion"},{"key":"terrace","cap":"The terrace"},{"key":"gardenseat","cap":"Garden seating"},{"key":"living","cap":"Living room"}],
      palette:["#EFE7D6","#E3D8C0","#7A7A45","#4A5238","#23201A"] },
    { no:"04", name:"Spazio", ref:"Interior · Realization in Space",
      vars:{"bg":"#F1EFEA","ink":"#33332E","panel":"#F7F6F2","panel2":"#FBFAF7","accent":"#5C5A52","accent2":"#A89F90","ph":"#c9c6bd","muted":"#8a887f","filter":"none"},
      fonts:{"disp":"'Archivo',sans-serif","body":"'Spectral',serif","dispw":600,"htrack":"0","hcase":"uppercase"},
      hero:"cowork", photos:[{"key":"cowork","cap":"Coworking"},{"key":"desk","cap":"Workspace"},{"key":"living","cap":"Living room"},{"key":"kitchen","cap":"Kitchen"},{"key":"corner","cap":"Corner"}],
      palette:["#F7F6F2","#D7D3C8","#A89F90","#5C5A52","#33332E"] },
    { no:"05", name:"Mediterraneo", ref:"Real Estate · Casa Oasis",
      vars:{"bg":"#EBDFCB","ink":"#21384B","panel":"#F1E8D7","panel2":"#F6EFE0","accent":"#B8612F","accent2":"#E0A971","ph":"#cdbfa0","muted":"#8a7d66","filter":"none"},
      fonts:{"disp":"'Bodoni Moda',serif","body":"'Inter',sans-serif","dispw":500,"htrack":".005em","hcase":"none"},
      hero:"court", photos:[{"key":"court","cap":"Courtyard"},{"key":"living","cap":"Living room"},{"key":"salon","cap":"Salon"},{"key":"retreat","cap":"Retreat"},{"key":"stay","cap":"Suite"}],
      palette:["#EAD9C2","#E0A971","#B8612F","#2F5E7A","#21384B"] },
    { no:"06", name:"Tavola", ref:"Gastronomy · Bocuse", dark:true,
      vars:{"bg":"#22312A","ink":"#EDE6D2","panel":"#28382F","panel2":"#2E3F35","accent":"#C9A24B","accent2":"#EDE6D2","ph":"#33453b","muted":"#a7b09c","filter":"brightness(.62) saturate(.9)"},
      fonts:{"disp":"'Newsreader',serif","body":"'Jost',sans-serif","dispw":400,"htrack":".005em","hcase":"none"},
      hero:"dining", photos:[{"key":"kitchen","cap":"Kitchen"},{"key":"dining","cap":"Dining room"},{"key":"longtable","cap":"The long table"},{"key":"majlis","cap":"The majlis"},{"key":"salon","cap":"Salon"}],
      palette:["#EDE6D2","#C9A24B","#A7B09C","#28382F","#22312A"] },
    { no:"07", name:"Bottega", ref:"Craft · Made with Purpose",
      vars:{"bg":"#EBE6DC","ink":"#46341F","panel":"#F2EEE5","panel2":"#F8F5EF","accent":"#6E7148","accent2":"#6E7148","ph":"#cfc8ba","muted":"#8a8170","filter":"none"},
      fonts:{"disp":"'Cinzel',serif","body":"'Inter',sans-serif","dispw":400,"htrack":".1em","hcase":"uppercase"},
      hero:"pavilion", photos:[{"key":"craft","cap":"Crafted detail"},{"key":"cowork","cap":"Coworking"},{"key":"desk","cap":"Workspace"},{"key":"longtable","cap":"The long table"},{"key":"kitchen2","cap":"Kitchen · detail"},{"key":"corner","cap":"Corner"},{"key":"games","cap":"Backgammon"},{"key":"dining","cap":"Dining room"}],
      palette:["#E7DCC4","#D6BE94","#B27636","#6E7148","#46341F"] },
    { no:"08", name:"Principia", ref:"Editorial · Principles of Design",
      vars:{"bg":"#E9E4D6","ink":"#1A1813","panel":"#EFEADD","panel2":"#F4F0E5","accent":"#1A1813","accent2":"#CFC9B9","ph":"#c7c1b1","muted":"#7d786c","filter":"none"},
      fonts:{"disp":"'Archivo',sans-serif","body":"'Archivo',sans-serif","dispw":700,"htrack":"-.01em","hcase":"none"},
      hero:"desk", photos:[{"key":"desk","cap":"Workspace"},{"key":"cowork","cap":"Coworking"},{"key":"living","cap":"Living room"},{"key":"kitchen","cap":"Kitchen"},{"key":"craft","cap":"Detail"}],
      palette:["#E9E4D6","#CFC9B9","#7D786C","#3A372F","#1A1813"] },
    { no:"09", name:"Quiet Stone", ref:"Interior · Mineral Calm",
      vars:{"bg":"#EDE7DD","ink":"#3C3527","panel":"#F4EFE6","panel2":"#f9f6f1","accent":"#B7A892","accent2":"#CFC4B4","ph":"#c6c0b5","muted":"#8c8579","filter":"none"},
      fonts:{"disp":"'Fraunces',serif","body":"'Jost',sans-serif","dispw":300,"htrack":".005em","hcase":"none"},
      hero:"corner", photos:[{"key":"living","cap":"Living room"},{"key":"salon","cap":"Salon"},{"key":"snug","cap":"The snug"},{"key":"room2","cap":"Reading corner"},{"key":"longtable","cap":"The long table"},{"key":"corner","cap":"Corner"},{"key":"court","cap":"Courtyard"},{"key":"terrace","cap":"The terrace"}],
      palette:["#EDE7DD","#CFC4B4","#B7A892","#8A7C68","#3C3527"] },
    { no:"10", name:"Botanical Salon", ref:"Editorial · Botanical Host",
      vars:{"bg":"#E3E8D8","ink":"#2B4A3C","panel":"#EEF1E6","panel2":"#f6f7f1","accent":"#A9B5A0","accent2":"#E8C7BE","ph":"#bbc5b6","muted":"#7e9182","filter":"none"},
      fonts:{"disp":"'Cormorant Garamond',serif","body":"'EB Garamond',serif","dispw":400,"htrack":".01em","hcase":"none"},
      hero:"gardenseat", photos:[{"key":"gardenseat","cap":"Garden seating"},{"key":"garden","cap":"The garden"},{"key":"salon","cap":"Salon"},{"key":"massage","cap":"The massage deck"},{"key":"living","cap":"Living room"}],
      palette:["#E3E8D8","#A9B5A0","#8A9B8F","#2B4A3C","#E8C7BE"] },
    { no:"11", name:"Terracotta", ref:"Real Estate · Mediterranean",
      vars:{"bg":"#EAD9C2","ink":"#4A3B24","panel":"#F1E4D2","panel2":"#f7f0e6","accent":"#C2683C","accent2":"#E0A971","ph":"#c7b69f","muted":"#92826b","filter":"none"},
      fonts:{"disp":"'Marcellus',serif","body":"'Outfit',sans-serif","dispw":400,"htrack":".01em","hcase":"none"},
      hero:"nook", photos:[{"key":"nook","cap":"Garden nook"},{"key":"court","cap":"Courtyard"},{"key":"lounge","cap":"Lantern lounge"},{"key":"shower","cap":"The shower"},{"key":"retreat","cap":"Retreat"}],
      palette:["#EAD9C2","#E0A971","#C2683C","#9A4B2E","#4A3B24"] },
    { no:"12", name:"Jardin Calcaire", ref:"Interior · Stone Garden",
      vars:{"bg":"#E8E6D7","ink":"#33402F","panel":"#F1EFE3","panel2":"#f7f6f0","accent":"#A9B099","accent2":"#E8C7BE","ph":"#c0c1b2","muted":"#848b7b","filter":"none"},
      fonts:{"disp":"'Fraunces',serif","body":"'EB Garamond',serif","dispw":300,"htrack":"0","hcase":"none"},
      hero:"terrace", photos:[{"key":"court","cap":"Courtyard"},{"key":"garden","cap":"The garden"},{"key":"pavilion","cap":"The pavilion"},{"key":"massage2","cap":"The massage deck"},{"key":"living","cap":"Living room"}],
      palette:["#EDE7DD","#CFC4B4","#A9B5A0","#33402F","#E8C7BE"] },
    { no:"13", name:"Terra Calce", ref:"Craft · Sun-warmed Lime",
      vars:{"bg":"#EBDFCB","ink":"#3C3527","panel":"#F3EADB","panel2":"#f8f3eb","accent":"#C98B5C","accent2":"#E0A971","ph":"#c5baa7","muted":"#8b8271","filter":"none"},
      fonts:{"disp":"'Marcellus',serif","body":"'Jost',sans-serif","dispw":400,"htrack":".01em","hcase":"none"},
      hero:"lounge", photos:[{"key":"lounge","cap":"Lantern lounge"},{"key":"retreat","cap":"Retreat"},{"key":"salon","cap":"Salon"},{"key":"court","cap":"Courtyard"},{"key":"terrace","cap":"The terrace"}],
      palette:["#EDE7DD","#EAD9C2","#E0A971","#C2683C","#3C3527"] },
    { no:"14", name:"Oliveto", ref:"Beauty · Olive Grove",
      vars:{"bg":"#E0DAC4","ink":"#3A3A22","panel":"#EBE6D3","panel2":"#f4f1e7","accent":"#6E7148","accent2":"#E8C7BE","ph":"#bbb7a0","muted":"#85826b","filter":"none"},
      fonts:{"disp":"'Cormorant Garamond',serif","body":"'Outfit',sans-serif","dispw":500,"htrack":"0","hcase":"none"},
      hero:"saunagarden", photos:[{"key":"saunagarden","cap":"The dry garden"},{"key":"garden","cap":"The garden"},{"key":"gardenseat","cap":"Garden seating"},{"key":"corner","cap":"Corner"},{"key":"sunset","cap":"Dusk"}],
      palette:["#CDCBA6","#8A9B8F","#6E7148","#B0683E","#E8C7BE"] },
    { no:"15", name:"Casa Trio", ref:"House · All Three United",
      vars:{"bg":"#EAE6D8","ink":"#3A3B2C","panel":"#F2EFE3","panel2":"#f8f6f0","accent":"#B79E7E","accent2":"#A9B5A0","ph":"#c3c0b2","muted":"#898879","filter":"none"},
      fonts:{"disp":"'Fraunces',serif","body":"'Outfit',sans-serif","dispw":300,"htrack":".005em","hcase":"none"},
      hero:"living", photos:[{"key":"salon","cap":"Salon"},{"key":"dining","cap":"Dining room"},{"key":"kitchen","cap":"Kitchen"},{"key":"lounge","cap":"Lantern lounge"},{"key":"majlis","cap":"The majlis"},{"key":"piano","cap":"The piano"},{"key":"court","cap":"Courtyard"},{"key":"garden","cap":"The garden"}],
      palette:["#EDE7DD","#A9B5A0","#EAD9C2","#C2683C","#2B4A3C"] },
    { no:"16", name:"Salvia Profonda", ref:"Editorial · Deep Sage",
      vars:{"bg":"#DDE3D2","ink":"#2E3A26","panel":"#EBEFE0","panel2":"#f4f6ee","accent":"#9DAE96","accent2":"#46553B","ph":"#b7beac","muted":"#7d8673","filter":"none"},
      fonts:{"disp":"'Cormorant Garamond',serif","body":"'Jost',sans-serif","dispw":500,"htrack":"0","hcase":"none"},
      hero:"massage", photos:[{"key":"massage","cap":"The massage deck"},{"key":"garden","cap":"The garden"},{"key":"yoga","cap":"Yoga deck"},{"key":"gardenseat","cap":"Garden seating"},{"key":"living","cap":"Living room"}],
      palette:["#EFE8D8","#D9E0CE","#9DAE96","#7C8C72","#46553B"] },
    { no:"17", name:"Terra & Cobalto", ref:"Real Estate · Glazed Ceramic",
      vars:{"bg":"#EAD9C2","ink":"#20364A","panel":"#F1E4D2","panel2":"#f7f0e6","accent":"#2F5E7A","accent2":"#C2683C","ph":"#beb5a8","muted":"#7b7f80","filter":"none"},
      fonts:{"disp":"'Marcellus',serif","body":"'Outfit',sans-serif","dispw":400,"htrack":".01em","hcase":"none"},
      hero:"pool3", photos:[{"key":"pool3","cap":"The pool"},{"key":"court","cap":"Courtyard"},{"key":"poolside","cap":"Poolside"},{"key":"nook","cap":"Garden nook"},{"key":"living","cap":"Living room"}],
      palette:["#EAD9C2","#E0A971","#C2683C","#2F5E7A","#20364A"] },
    { no:"18", name:"Argilla Verde", ref:"Craft · Green Clay",
      vars:{"bg":"#D9D3B8","ink":"#3A3B24","panel":"#E6E1CB","panel2":"#f1efe2","accent":"#8E8A5A","accent2":"#B0683E","ph":"#b6b297","muted":"#827f67","filter":"none"},
      fonts:{"disp":"'Marcellus',serif","body":"'Outfit',sans-serif","dispw":400,"htrack":".01em","hcase":"none"},
      hero:"pavilion2", photos:[{"key":"pavilion2","cap":"The pavilion · dusk"},{"key":"pavilion","cap":"The pavilion"},{"key":"garden","cap":"The garden"},{"key":"corner","cap":"Corner"},{"key":"saunagarden","cap":"The dry garden"}],
      palette:["#EDE7DD","#CDCBA6","#6E7148","#B0683E","#4A3B24"] },
    { no:"19", name:"Calce Salvia", ref:"Interior · Lime & Sage",
      vars:{"bg":"#E6E6D6","ink":"#3C4031","panel":"#F1F0E4","panel2":"#f7f7f0","accent":"#A9B099","accent2":"#E8C7BE","ph":"#c1c1b2","muted":"#898b7b","filter":"none"},
      fonts:{"disp":"'Fraunces',serif","body":"'EB Garamond',serif","dispw":300,"htrack":"0","hcase":"none"},
      hero:"massage2", photos:[{"key":"massage2","cap":"The massage deck"},{"key":"garden","cap":"The garden"},{"key":"living","cap":"Living room"},{"key":"yoga","cap":"Yoga deck"},{"key":"salon","cap":"Salon"}],
      palette:["#EDE7DD","#CFC4B4","#A9B5A0","#33402F","#E8C7BE"] },
    { no:"20", name:"Sale & Cobalto", ref:"Editorial · Salt & Cobalt",
      vars:{"bg":"#E4E6DC","ink":"#2C3E4A","panel":"#EFF0E8","panel2":"#f6f7f2","accent":"#2F5E7A","accent2":"#20364A","ph":"#bcc1bc","muted":"#7f8a8c","filter":"none"},
      fonts:{"disp":"'Fraunces',serif","body":"'Jost',sans-serif","dispw":300,"htrack":".005em","hcase":"none"},
      hero:"pool", photos:[{"key":"pool","cap":"The pool"},{"key":"poolside","cap":"Poolside"},{"key":"pool3","cap":"The pool · canopy"},{"key":"terrace","cap":"The terrace"},{"key":"bath","cap":"Bath"}],
      palette:["#EFF0E8","#CFC4B4","#A9B5A0","#2F5E7A","#20364A"] },
    { no:"21", name:"Ibiza", ref:"Island · Pale Clay",
      vars:{"bg":"#EEE8DA","ink":"#4A4133","panel":"#F7F2E7","panel2":"#fbf8f2","accent":"#CDBFA2","accent2":"#C9A982","ph":"#cac3b5","muted":"#948c7e","filter":"none"},
      fonts:{"disp":"'Fraunces',serif","body":"'Outfit',sans-serif","dispw":300,"htrack":".005em","hcase":"none"},
      hero:"stay", photos:[{"key":"room","cap":"Room"},{"key":"room2","cap":"Reading corner"},{"key":"retreat","cap":"Retreat"},{"key":"salon","cap":"Salon"},{"key":"living","cap":"Living room"},{"key":"view","cap":"The view"},{"key":"poolside","cap":"Poolside"},{"key":"terrace","cap":"The terrace"}],
      palette:["#F7F2E7","#EDE7DD","#EAD9C2","#C9A982","#BCC2AC"] },
    { no:"22", name:"Argilla & Cobalto", ref:"Island · Clay & Cobalt",
      vars:{"bg":"#EEE8DA","ink":"#22384A","panel":"#F4EEE0","panel2":"#FAF6EE","accent":"#2F5E7A","accent2":"#C9A982","ph":"#c3c0b3","muted":"#7e8488","filter":"none"},
      fonts:{"disp":"'Fraunces',serif","body":"'Jost',sans-serif","dispw":300,"htrack":".005em","hcase":"none"},
      hero:"pool", photos:[{"key":"pool","cap":"The pool"},{"key":"view","cap":"The view"},{"key":"poolside","cap":"Poolside"},{"key":"stay","cap":"Suite"},{"key":"court","cap":"Courtyard"}],
      palette:["#F7F2E7","#EAD9C2","#C9A982","#2F5E7A","#22384A"] }
  ];

  /* Local photo library — every file content-verified against the source
     image (originals in »HICH House 2026-- Folder/Links«). */
  window.HICH_PHOTOS = {
    "living":"living.jpg",         /* HICH House- 014 — living room, bookshelves */
    "salon":"salon.jpg",           /* IMG_8686 — salon sofa, Persian miniature paintings */
    "salon2":"salon2.jpg",         /* HICH House- 190 — salon · painting detail */
    "piano":"piano.jpg",           /* HICH House- 197 — piano corner */
    "snug":"snug.jpg",             /* CASA JONATHAN-0039 — media snug, backlit wood */
    "lounge":"lounge.jpg",         /* HICH House- 001 — lantern-wall seating */
    "majlis":"majlis.jpg",         /* IMG_3076 — draped majlis lounge, lanterns */
    "dining":"dining.jpg",         /* HICH House- 010 — draped dining room */
    "longtable":"longtable.jpg",   /* IMG_3472 — long table under the pergola */
    "kitchen":"kitchen.jpg",       /* HICH House- 203 — the kitchen */
    "kitchen2":"kitchen2.jpg",     /* HICH House- 205 — kitchen still life */
    "cowork":"cowork.jpg",         /* IMG_3919 — long work table, woven pendants */
    "desk":"desk.jpg",             /* HICH House- 211 — single desk, round mirror */
    "craft":"craft.jpg",           /* IMG_8715 — carved console, arched mirror */
    "games":"games.jpg",           /* HICH House- 108 — backgammon board */
    "corner":"corner.jpg",         /* HICH House- 096 — stone table corner */
    "stay":"stay.jpg",             /* CASA JONATHAN-0076 — the suite */
    "room":"room.jpg",             /* HICH House- 231 — room, olive linen */
    "retreat":"retreat.jpg",       /* HICH House- 061 — terracotta bedroom */
    "room2":"room2.jpg",           /* HICH House- 234 — reading corner */
    "view":"view.jpg",             /* IMG_2984 — balcony view over the pool */
    "bath":"bath.jpg",             /* CASA JONATHAN-0096 — bath, tub & robes */
    "basin":"basin.jpg",           /* CASA JONATHAN-0093 — stone basin detail */
    "basin2":"basin2.jpg",         /* CASA JONATHAN-0152 — double stone basins */
    "shower":"shower.jpg",         /* IMG_2979 — sculpted terracotta shower */
    "rockshower":"rockshower.jpg", /* IMG_3513 — outdoor rock shower */
    "court":"court.jpg",           /* IMG_3078 — sunken lantern courtyard */
    "arch":"arch.jpg",             /* IMG_3302 — the arched gateway into the garden */
    "terrace":"terrace.jpg",       /* HICH House- 085 — the house from the lawn */
    "garden":"garden.jpg",         /* IMG_3285 — garden pavilion in the green */
    "pavilion":"pavilion.jpg",     /* HICH House- 144 — organic pavilion interior */
    "pavilion2":"pavilion2.jpg",   /* IMG_8623 — pavilion at dusk */
    "pool":"pool.jpg",             /* HICH House- 130 — pool & canopy */
    "pool2":"pool2.jpg",           /* IMG_8627 — pool at golden hour */
    "pool3":"pool3.jpg",           /* IMG_3538 — pool from the pavilion */
    "poolside":"poolside.jpg",     /* HICH House- 122 — poolside loungers */
    "yoga":"yoga.jpg",             /* IMG_3133 — the 70 m² yoga deck */
    "massage":"massage.jpg",       /* HICH House- 146 — massage deck, jasmine */
    "massage2":"massage2.jpg",     /* HICH House- 152 — massage deck */
    "sauna":"sauna.jpg",           /* HICH House- 166 — the iglu sauna */
    "saunagarden":"saunagarden.jpg",/* HICH House- 165 — sauna in the dry garden */
    "sunset":"sunset.jpg",         /* IMG_7276 — sunset over the garden */
    "nook":"nook.jpg",             /* HICH House- 107 — terracotta garden nook */
    "gardenseat":"gardenseat.jpg"  /* HICH House- 105 — round garden seating */
  };
  function phUrl(key){ return "assets/photos/" + (HICH_PHOTOS[key] || key); }

  /* mood-curated imagery: hero + editorial slots, deduped; bathrooms never in the hero */
  function assignPhotos(m){
    var used = {};
    var photoKeys = (m.photos||[]).map(function(p){ return p.key; });
    var caps = {}; (m.photos||[]).forEach(function(p){ caps[p.key]=p.cap; });
    function pick(prefs){
      for (var i=0;i<prefs.length;i++){ var k=prefs[i]; if(k && HICH_PHOTOS[k] && !used[k]) { used[k]=1; return k; } }
      return null;
    }
    var noBath = function(k){ return k!=='bath' && k!=='basin' && k!=='basin2' && k!=='shower' && k!=='rockshower'; };
    /* category sets — each mood's OWN curated photos fill its House interiors + pool slot,
       so every mood tells a distinct image story (not the same global picks everywhere). */
    var INT_SET = {living:1,lounge:1,salon:1,salon2:1,majlis:1,snug:1,piano:1,dining:1,longtable:1,kitchen:1,kitchen2:1,cowork:1,desk:1,craft:1,games:1,corner:1,retreat:1,stay:1,room:1,room2:1,view:1};
    var POOL_SET = {pool:1,pool2:1,pool3:1,poolside:1,court:1,nook:1};
    function moodCat(set){ return photoKeys.filter(function(k){ return set[k] && !used[k]; }); }
    var heroKey = pick([m.hero].concat(photoKeys).filter(noBath).concat(['terrace','court','living']));
    var slots = {
      hero:     heroKey,
      garden:   pick(['garden','terrace','pavilion2','sunset','saunagarden'].concat(photoKeys)),
      court:    pick(moodCat(POOL_SET).concat(['pool2','court','nook','poolside'])),
      hsa:      pick(moodCat(INT_SET).concat(['pavilion','terrace','living'])),
      hsb:      pick(moodCat(INT_SET).concat(['craft','games','kitchen2','corner'])),
      marble1:  pick(moodCat(INT_SET).concat(['salon','living','lounge'])),
      marble2:  pick(moodCat(INT_SET).concat(['dining','majlis','snug','piano'])),
      marble3:  pick(moodCat(INT_SET).concat(['kitchen','longtable','court','living']))
    };
    var defCaps = { garden:'The garden', court:'Courtyard', terrace:'The terrace', arch:'The arched gateway',
      pavilion:'The pavilion', pavilion2:'The pavilion · dusk', salon:'Salon', salon2:'Salon · detail',
      living:'Living room', lounge:'Lantern lounge', majlis:'The majlis', snug:'The snug', piano:'The piano',
      dining:'Dining room', longtable:'The long table', kitchen:'Kitchen', kitchen2:'Kitchen · detail',
      cowork:'Coworking', desk:'Workspace', craft:'Detail', games:'Backgammon', corner:'Corner',
      stay:'Suite', room:'Room', room2:'Reading corner', retreat:'Retreat', view:'The view',
      bath:'Bath', basin:'Stone basin', basin2:'Bath · detail', shower:'The shower', rockshower:'Rock shower',
      pool:'The pool', pool2:'The pool · golden hour', pool3:'The pool', poolside:'Poolside',
      yoga:'Yoga deck', massage:'The massage deck', massage2:'The massage deck', sauna:'Iglu sauna',
      saunagarden:'The dry garden', sunset:'Dusk', nook:'Garden nook', gardenseat:'Garden seating' };
    function setSlot(sel, key, withCap){
      var el = document.querySelector(sel); if(!el || !key) return;
      el.style.setProperty('--img', "url('" + phUrl(key) + "')");
      if (withCap) el.setAttribute('data-cap', caps[key] || defCaps[key] || '');
      if (el.getAttribute('role') === 'img') el.setAttribute('aria-label', (caps[key] || defCaps[key] || 'HICH House') + ' at HICH House');
    }
    /* Only the full-bleed hero + the duotone garden hero follow the mood (image only, no caption).
       The House spread/triptych + courtyard keep their authored, text-matching images & captions
       from index.html on EVERY mood — images fit the text, not the mood. */
    setSlot('.hero-img .ph', slots.hero, false);
    setSlot('#garden .g-img .ph', slots.garden, false);
  }

  const DEFAULT_NO = "02";
  /* client-facing curation — only these directions are shown in the index / reachable.
     The full set stays in HICH_MOODS for internal review (apply by console/hash). */
  const CLIENT_MOODS = ["02","07","09","15","21"];
  function isClient(no){ return CLIENT_MOODS.indexOf(no) !== -1; }

  function findMood(no){
    return HICH_MOODS.find(function(m){ return m.no === no; }) ||
           HICH_MOODS.find(function(m){ return m.no === DEFAULT_NO; });
  }

  /* colour utils — deterministic contrast-safe highlight from the mood's own accent */
  function hex2rgb(h){ h=h.replace('#',''); return [parseInt(h.substr(0,2),16),parseInt(h.substr(2,2),16),parseInt(h.substr(4,2),16)]; }
  function mixc(a,b,t){ return a.map(function(v,i){ return Math.round(v+(b[i]-v)*t); }); }
  function rgb2hex(c){ return '#'+c.map(function(v){ return v.toString(16).padStart(2,'0'); }).join(''); }
  function lumin(c){ var f=function(v){ v/=255; return v<=0.04045 ? v/12.92 : Math.pow((v+0.055)/1.055,2.4); };
    return .2126*f(c[0])+.7152*f(c[1])+.0722*f(c[2]); }
  function contrast(a,b){ var l1=lumin(a),l2=lumin(b); return (Math.max(l1,l2)+.05)/(Math.min(l1,l2)+.05); }

  window.applyMood = function(no, opts){
    const m = findMood(no);
    const r = document.documentElement.style;
    const v = m.vars, f = m.fonts;
    r.setProperty("--bg", v.bg);
    r.setProperty("--ink", v.ink);
    r.setProperty("--panel", v.panel);
    r.setProperty("--panel2", v.panel2);
    r.setProperty("--accent", v.accent);
    r.setProperty("--accent2", v.accent2 || v.accent);
    /* highlight = the mood's PURE accent; nudged toward ink in the finest steps only if below AA-large (3:1) */
    var hl = hex2rgb(v.accent), bgc = hex2rgb(v.bg), pnc = hex2rgb(v.panel), inkc = hex2rgb(v.ink);
    for (var i = 0; i < 30 && (contrast(hl, bgc) < 3.0 || contrast(hl, pnc) < 3.0); i++){ hl = mixc(hl, inkc, 0.04); }
    /* emphasis must also read AGAINST the ink it sits beside — when accent ≈ ink (e.g. cobalt on navy),
       the italic <em> vanishes. Lift toward paper until it separates, never past the 3:1 paper floor. */
    for (var i2 = 0; i2 < 30 && contrast(hl, inkc) < 2.6 && contrast(hl, bgc) > 3.25 && contrast(hl, pnc) > 3.25; i2++){ hl = mixc(hl, bgc, 0.05); }
    r.setProperty("--hl", rgb2hex(hl));
    /* secondary highlight — accent2 made readable on the KPI/courtyard TINT ground it now sits on
       (tint mirrors the CSS: accent2 26% over panel2, or 16% over bg in dark moods) */
    var a2 = hex2rgb(v.accent2 || v.accent);
    var tintc = mixc(a2, (m.dark ? bgc : hex2rgb(v.panel2)), m.dark ? 0.84 : 0.74);
    var hl2 = a2.slice();
    for (var k = 0; k < 50 && (contrast(hl2, bgc) < 3.0 || contrast(hl2, pnc) < 3.0 || contrast(hl2, tintc) < 3.0); k++){ hl2 = mixc(hl2, inkc, 0.05); }
    r.setProperty("--hl2", rgb2hex(hl2));
    /* inverted highlight — accent lifted toward paper until ≥3:1 on the ink ground (interlude) */
    var hlInv = hex2rgb(v.accent);
    for (var j = 0; j < 30 && contrast(hlInv, inkc) < 3.0; j++){ hlInv = mixc(hlInv, bgc, 0.06); }
    r.setProperty("--hl-inv", rgb2hex(hlInv));
    (m.palette || []).slice(0,5).forEach(function(c, i){ r.setProperty("--pal" + (i+1), c); });
    /* SURFACE THE FAN: section grounds take the palette tone that best differentiates this mood
       from its own ground — graduated toward the ground so each mood visibly colours the page
       while dark ink stays AA-legible. (light moods only — dark moods keep their tuned panels) */
    if (!m.dark && (m.palette || []).length >= 2){
      var bgr = hex2rgb(v.bg), inkr = hex2rgb(v.ink), best = null, bestD = -1;
      m.palette.forEach(function(c){
        var rc = hex2rgb(c);
        if (contrast(rc, inkr) < 4.5) return;                  /* keep dark ink readable on this ground */
        var d = Math.abs(rc[0]-bgr[0]) + Math.abs(rc[1]-bgr[1]) + Math.abs(rc[2]-bgr[2]);
        if (d > bestD){ bestD = d; best = rc; }
      });
      if (best && bestD > 12){
        r.setProperty("--tint",   rgb2hex(mixc(best, bgr, 0.34)));   /* strongest beat — #garden / KPI */
        r.setProperty("--panel",  rgb2hex(mixc(best, bgr, 0.54)));   /* #house · #around */
        r.setProperty("--panel2", rgb2hex(mixc(best, bgr, 0.72)));   /* #rooms · chapter index */
      }
    }
    /* lightest + darkest tone of the ACTIVE palette only — photo-overlay text & scrims */
    var byLum = (m.palette || [v.bg, v.ink]).slice().sort(function(a, b){ return lumin(hex2rgb(b)) - lumin(hex2rgb(a)); });
    var paperC = byLum[0] || v.bg;
    if (lumin(hex2rgb(v.bg)) > lumin(hex2rgb(paperC))) paperC = v.bg;
    var deepC = byLum[byLum.length - 1] || v.ink;
    if (lumin(hex2rgb(v.ink)) < lumin(hex2rgb(deepC))) deepC = v.ink;
    r.setProperty("--paper", paperC);
    r.setProperty("--deep", deepC);
    assignPhotos(m);
    r.setProperty("--ph", v.ph);
    r.setProperty("--muted", v.muted);
    r.setProperty("--filter", v.filter || "none");
    r.setProperty("--disp", f.disp);
    r.setProperty("--body-font", f.body);
    r.setProperty("--dispw", f.dispw);
    r.setProperty("--htrack", f.htrack);
    r.setProperty("--hcase", f.hcase);
    document.body.classList.toggle("dark-mood", !!m.dark);
    document.body.dataset.mood = m.no;
    const label = document.getElementById("moodLabel");
    if (label){
      label.textContent = (innerWidth <= 720) ? "Mood · " + m.no : "Mood · " + m.no + " " + m.name;
      label.setAttribute("aria-label", "Mood " + m.no + " " + m.name + " — open the mood index");
    }
    document.querySelectorAll(".moods-list button").forEach(function(b){
      b.classList.toggle("current", b.dataset.mood === m.no);
    });
    try { localStorage.setItem("hich-mood", m.no); } catch(e){}
    if (!opts || !opts.silentHash){
      history.replaceState(null, "", "#mood-" + m.no);
    }
  };

  /* smooth return to the hero so the new mood is seen from the top */
  function scrollTopSmooth(){
    const el = document.scrollingElement || document.documentElement;
    if (el.scrollTop < 80) return;
    document.documentElement.style.scrollBehavior = "auto";
    if (matchMedia("(prefers-reduced-motion: reduce)").matches){ el.scrollTop = 0; return; }
    const start = el.scrollTop, t0 = performance.now(), dur = 800;
    requestAnimationFrame(function f(now){
      const p = Math.min((now - t0) / dur, 1);
      const e = 1 - Math.pow(1 - p, 3);
      el.scrollTop = start * (1 - e);
      if (p < 1) requestAnimationFrame(f);
    });
  }

  /* ---------- editorial mood index (overlay) ---------- */
  function buildOverlay(){
    const shown = HICH_MOODS.filter(function(m){ return isClient(m.no); });
    const ov = document.createElement("div");
    ov.className = "moods-overlay";
    ov.setAttribute("role", "dialog");
    ov.setAttribute("aria-modal", "true");
    ov.setAttribute("aria-label", "Moodboard directions");
    ov.innerHTML =
      '<div class="mo-head">' +
        '<span class="mo-eyebrow">HICH House · Brand Moodboards · 2026</span>' +
        '<button class="mo-close" aria-label="Close">Close ✕</button>' +
      '</div>' +
      '<div class="mo-title">' + shown.length + ' <em>directions</em>, one house.</div>' +
      '<div class="moods-list"></div>';
    const list = ov.querySelector(".moods-list");
    shown.forEach(function(m){
      const b = document.createElement("button");
      b.dataset.mood = m.no;
      b.innerHTML =
        '<span class="ml-no">' + m.no + '</span>' +
        '<b class="ml-name" style="font-family:' + m.fonts.disp.replace(/"/g,"'") + '">' + m.name + '</b>' +
        '<i class="ml-ref">' + m.ref + '</i>' +
        '<span class="ml-bands">' + m.palette.map(function(c){ return '<span style="background:' + c + '"></span>'; }).join("") + '</span>';
      b.addEventListener("click", function(){
        applyMood(m.no);
        closeOverlay();
        scrollTopSmooth();
      });
      list.appendChild(b);
    });
    ov.querySelector(".mo-close").addEventListener("click", closeOverlay);
    document.body.appendChild(ov);
    return ov;
  }

  let overlay = null;
  let lastFocus = null;
  function openOverlay(){
    if (!overlay) overlay = buildOverlay();
    lastFocus = document.activeElement;
    overlay.classList.add("open");
    document.body.style.overflow = "hidden";
    const btn = document.querySelector(".nav-moods");
    if (btn) btn.setAttribute("aria-expanded", "true");
    const close = overlay.querySelector(".mo-close");
    if (close) close.focus();
  }
  function closeOverlay(){
    if (overlay) overlay.classList.remove("open");
    document.body.style.overflow = "";
    const btn = document.querySelector(".nav-moods");
    if (btn) btn.setAttribute("aria-expanded", "false");
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  addEventListener("keydown", function(e){
    if (e.key === "Escape") closeOverlay();
    /* keep focus inside the dialog while open (WCAG 2.1.2) */
    if (e.key === "Tab" && overlay && overlay.classList.contains("open")){
      const focusables = overlay.querySelectorAll("button");
      if (!focusables.length) return;
      const first = focusables[0], last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first){ e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last){ e.preventDefault(); first.focus(); }
      else if (!overlay.contains(document.activeElement)){ e.preventDefault(); first.focus(); }
    }
  });

  document.addEventListener("DOMContentLoaded", function(){
    if (PUBLIC) return;                              /* end-customer link has no wizard */
    const btn = document.querySelector(".nav-moods");
    if (btn) btn.addEventListener("click", openOverlay);
  });

  /* keep the mood button label legible on resize across the mobile breakpoint */
  addEventListener("resize", function(){
    const label = document.getElementById("moodLabel");
    const m = findMood(document.body.dataset.mood);
    if (label && m) label.textContent = (innerWidth <= 720) ? "Mood · " + m.no : "Mood · " + m.no + " " + m.name;
  });

  /* ---------- initial mood ---------- */
  function moodFromHash(){
    const m = (location.hash || "").match(/mood-(\d{2})/);
    return m ? m[1] : null;
  }
  if (PUBLIC){
    /* locked to the shared mood (any of the 22; applyMood falls back to default if unknown) */
    applyMood(lockMood || DEFAULT_NO, { silentHash: true });
  } else {
    let initial = moodFromHash();
    if (!initial){ try { initial = localStorage.getItem("hich-mood"); } catch(e){} }
    if (!isClient(initial)) initial = null;          /* hidden/stale → fall back to the curated default */
    applyMood(initial || DEFAULT_NO, { silentHash: !(moodFromHash() && isClient(moodFromHash())) });
    addEventListener("hashchange", function(){
      const no = moodFromHash();
      if (no && isClient(no)) applyMood(no, { silentHash: true });
    });
  }
})();
