/* ==========================================================================
   SHARED PRELUDE
   Prepended to every generated inner page. Opens the IIFE and provides the
   image/link helpers and the template helpers the page source relies on.
   ========================================================================== */
(function () {
  'use strict';

  /* Wix media helpers. img() asks the library for an exact crop at the size
     the slot actually renders; raw() returns the untouched original, which is
     what logos and anything needing transparency want. */
  var M = 'https://static.wixstatic.com/media/';
  function img(id, w, h) {
    return M + id + '/v1/fill/w_' + w + ',h_' + h + ',al_c,q_85,enc_auto/x.jpg';
  }
  function raw(id) { return M + id; }

  /* Site-wide links, so a URL is never typed twice across pages. */
  var L = {
    home:      'https://www.canduscarpet.co.in',
    about:     'https://www.canduscarpet.co.in/about-us',
    contact:   'https://www.canduscarpet.co.in/contact',
    whatsapp:  'https://api.whatsapp.com/send?phone=918105810604',
    tel:       'tel:+918105810604',
    carpets:   'https://www.canduscarpet.co.in/projects-1',
    tiles:     'https://www.canduscarpet.co.in/projects-2',
    rugs:      'https://www.canduscarpet.co.in/projects-8',
    wilton:    'https://www.canduscarpet.co.in/s-projects-basic',
    laminate:  'https://www.canduscarpet.co.in/laminated-wooden-flooring',
    projects:  'https://www.canduscarpet.co.in/team-4',
    customise: 'https://www.canduscarpet.co.in/about-2',
    brochure:  'https://www.canduscarpet.co.in/general-6'
  };

  function map(arr, fn) { return arr.map(fn).join(''); }

  /* A WhatsApp deep link carrying a page-specific opening message. */
  function wa(msg) { return L.whatsapp + '&text=' + encodeURIComponent(msg); }

  /* ---- shared section builders -------------------------------------------
     Each returns a markup string. Pages compose these so every inner page
     lands on the same components, spacing and surface rules as the three
     already approved.
     ---------------------------------------------------------------------- */

  /* Hero with a full-bleed photo, optional spec/stat strip beneath. */
  function hero(o) {
    return '<section class="cd-hero' + (o.strip ? ' cd-hero--spec' : '') + '" id="cd-top">' +
      '<div class="cd-hero__slides">' +
        '<div class="cd-hero__slide is-active" style="background-image:url(' + o.img + ')" role="img" ' +
          'aria-label="' + o.alt + '"></div>' +
      '</div>' +
      '<div class="cd-hero__scrim"></div>' +
      '<div class="cd-hero__in"><div class="cd-hero__copy">' +
        '<span class="cd-eyebrow">' + o.eyebrow + '</span>' +
        '<h1 class="cd-h1 cd-hero__title">' + o.title + (o.accent ? '<em>' + o.accent + '</em>' : '') + '</h1>' +
        '<p class="cd-hero__text">' + o.text + '</p>' +
        '<div class="cd-hero__cta">' + map(o.ctas, function (c, i) {
          return '<a class="cd-btn ' + (i === 0 ? 'cd-btn--gold' : 'cd-btn--ghost') + '" href="' + c.href + '"' +
                 (/^https?:/.test(c.href) && !/canduscarpet\.co\.in/.test(c.href) ? ' target="_blank" rel="noopener"' : '') +
                 '>' + c.label + '</a>';
        }) + '</div>' +
      '</div></div>' +
      (o.strip ? '<div class="cd-specstrip"><div class="cd-specstrip__in">' +
        map(o.strip, function (s) {
          return '<div class="cd-specitem">' + s.i + '<div><b>' + s.b + '</b><span>' + s.s + '</span></div></div>';
        }) + '</div></div>' : '') +
    '</section>';
  }

  /* Centred section heading. */
  function head(o) {
    return '<div class="cd-head cd-head--center cd-reveal">' +
      (o.eyebrow ? '<span class="cd-eyebrow cd-eyebrow--center">' + o.eyebrow + '</span>' : '') +
      '<h2 class="cd-h2">' + o.h2 + '</h2>' +
      (o.lede ? '<p class="cd-lede">' + o.lede + '</p>' : '') +
    '</div>';
  }

  /* Image + copy split. flip:true puts the image on the right. */
  function split(o) {
    return '<div class="cd-wrap cd-split' + (o.flip ? ' cd-split--flip' : '') + ' cd-reveal">' +
      '<div class="cd-split__media" style="background-image:url(' + o.img + ')" role="img" aria-label="' + o.alt + '"></div>' +
      '<div>' +
        (o.eyebrow ? '<span class="cd-eyebrow">' + o.eyebrow + '</span>' : '') +
        '<h2 class="cd-h2" style="margin-top:14px">' + o.h2 + '</h2>' +
        map(o.paras || [], function (p) { return '<p class="cd-lede">' + p + '</p>'; }) +
        (o.list ? '<ul class="cd-list">' + map(o.list, function (i) { return '<li>' + i + '</li>'; }) + '</ul>' : '') +
        (o.note ? '<p class="cd-note">' + o.note + '</p>' : '') +
        (o.ctas ? btnrow(o.ctas) : '') +
      '</div>' +
    '</div>';
  }

  /* Icon feature cards. cols: 2 | 3 | 4 */
  function feats(items, cols) {
    return '<div class="cd-feats' + (cols === 3 ? ' cd-feats--3' : cols === 2 ? ' cd-feats--2' : '') + '">' +
      map(items, function (f) {
        return '<article class="cd-feat cd-reveal">' +
          (f.i ? '<div class="cd-feat__ico">' + f.i + '</div>' : '') +
          '<h3>' + f.t + '</h3>' + (f.d ? '<p>' + f.d + '</p>' : '') + '</article>';
      }) + '</div>';
  }

  /* Photo-on-top cards with a solid body. cols: 2 | 3 */
  function useCards(items, cols) {
    return '<div class="cd-usecards' + (cols === 3 ? ' cd-usecards--3' : '') + '">' +
      map(items, function (u) {
        var inner =
          '<div class="cd-usecard__img" style="background-image:url(' + u.img + ')" role="img" aria-label="' + (u.alt || u.t) + '"></div>' +
          '<div class="cd-usecard__body"><h3>' + u.t + '</h3>' +
          (u.d ? '<p>' + u.d + '</p>' : '') +
          (u.list ? '<ul class="cd-list">' + map(u.list, function (i) { return '<li>' + i + '</li>'; }) + '</ul>' : '') +
          (u.cta ? '<span class="cd-colcard__link">' + u.cta + ' &#8594;</span>' : '') +
          '</div>';
        return u.href
          ? '<a class="cd-usecard cd-reveal" href="' + u.href + '">' + inner + '</a>'
          : '<article class="cd-usecard cd-reveal">' + inner + '</article>';
      }) + '</div>';
  }

  /* Spec-sheet rows — a label column and a description column. */
  function specRows(rows) {
    return '<div class="cd-mats">' + map(rows, function (r) {
      return '<article class="cd-mat cd-reveal"><h4>' + r[0] + '</h4><p>' + r[1] + '</p></article>';
    }) + '</div>';
  }

  /* Numbered editorial list, two columns. */
  function numbered(items) {
    return '<div class="cd-why">' + map(items, function (w, i) {
      return '<article class="cd-whyrow cd-reveal">' +
        '<span class="cd-whyrow__n">' + ('0' + (i + 1)) + '</span>' +
        '<div><h3>' + w.t + '</h3><p>' + w.d + '</p></div></article>';
    }) + '</div>';
  }

  /* Bordered FAQ accordion. */
  function faq(items) {
    return '<div class="cd-faq" data-cd-faq>' + map(items, function (f, i) {
      return '<div class="cd-faq__item' + (i === 0 ? ' is-open' : '') + '">' +
        '<button class="cd-faq__q" type="button" aria-expanded="' + (i === 0) + '">' +
          '<span>' + f.q + '</span><span class="cd-faq__ico" aria-hidden="true">&#43;</span>' +
        '</button>' +
        '<div class="cd-faq__a"><p>' + f.a + '</p></div></div>';
    }) + '</div>';
  }

  /* Button row. The first button is the gold primary. */
  function btnrow(ctas, center) {
    return '<div class="cd-btnrow' + (center ? ' cd-btnrow--center' : '') + ' cd-reveal">' +
      map(ctas, function (c, i) {
        var cls = c.style || (i === 0 ? 'cd-btn--gold' : 'cd-btn--ghost');
        return '<a class="cd-btn ' + cls + '" href="' + c.href + '"' +
          (/^https?:/.test(c.href) && !/canduscarpet\.co\.in/.test(c.href) ? ' target="_blank" rel="noopener"' : '') +
          '>' + c.label + '</a>';
      }) + '</div>';
  }

  /* Closing call to action. */
  function finalCta(o) {
    return '<section class="cd-cta">' +
      '<div class="cd-wrap"><h2 class="cd-h2">' + o.h2 + '</h2>' +
      map(o.paras || [], function (p) { return '<p class="cd-lede">' + p + '</p>'; }) +
      '<div class="cd-cta__btns">' + map(o.ctas, function (c, i) {
        var cls = c.style || (i === 0 ? 'cd-btn--gold' : 'cd-btn--ghost');
        return '<a class="cd-btn ' + cls + '" href="' + c.href + '"' +
          (/^https?:/.test(c.href) && !/canduscarpet\.co\.in/.test(c.href) ? ' target="_blank" rel="noopener"' : '') +
          '>' + c.label + '</a>';
      }) + '</div></div></section>';
  }

  /* Chip row; gold:true fills them. */
  function chips(items, gold) {
    return '<div class="cd-chips cd-reveal">' + map(items, function (s) {
      return '<span class="cd-chip' + (gold ? ' cd-chip--gold' : '') + '">' + s + '</span>';
    }) + '</div>';
  }

  /* Split hero: copy on the left, photo on the right, category rail at the
     right edge. Used where the client wants the text and the image both
     fully visible rather than text sitting over the photo. */
  function heroSplit(o) {
    return '<section class="cd-herosplit cd-reveal" id="cd-top">' +
      '<div class="cd-herosplit__copy">' +
        '<span class="cd-eyebrow">' + o.eyebrow + '</span>' +
        '<h1 class="cd-h1">' + o.title + (o.accent ? '<em>' + o.accent + '</em>' : '') + '</h1>' +
        '<p class="cd-hero__text">' + o.text + '</p>' +
        btnrow(o.ctas) +
      '</div>' +
      '<div class="cd-herosplit__media" style="background-image:url(' + o.img + ')" role="img" aria-label="' + o.alt + '"></div>' +
      (o.rail ? '<div class="cd-herosplit__rail" aria-hidden="true">' +
        map(o.rail, function (r) { return '<span>' + r + '</span>'; }) + '</div>' : '') +
    '</section>';
  }

  /* Gold circular icon badges. */
  function badges(items) {
    return '<div class="cd-badges cd-reveal">' + map(items, function (b) {
      return '<div class="cd-badge"><div class="cd-badge__ring">' + b.i + '</div><span>' + b.t + '</span></div>';
    }) + '</div>';
  }

  /* Expanding panel rail. One panel is open at a time; the rest collapse to a
     vertical label. wire() in the shell drives it. */
  function expRail(items) {
    return '<div class="cd-panels-exp cd-reveal" data-cd-exp>' + map(items, function (p, i) {
      return '<article class="cd-exp' + (i === 0 ? ' is-open' : '') + '" tabindex="0">' +
        '<div class="cd-exp__img" style="background-image:url(' + p.img + ')" role="img" aria-label="' + p.alt + '"></div>' +
        '<div class="cd-exp__body"><h3 class="cd-exp__t">' + p.t + '</h3>' +
        '<p class="cd-exp__d">' + p.d + '</p></div></article>';
    }) + '</div>';
  }

  /* Numbered headings that slide in from the left, one after another. */
  function bullets(items) {
    return '<div class="cd-bullets">' + map(items, function (t, i) {
      return '<div class="cd-bullet" data-cd-i="' + i + '">' +
        '<span class="cd-bullet__n">' + ('0' + (i + 1)) + '</span>' +
        '<h3 class="cd-bullet__t">' + t + '</h3>' +
        '<span class="cd-bullet__bar"></span></div>';
    }) + '</div>';
  }

  /* Carpet design swatches, zooming on hover. */
  function designs(items) {
    return '<div class="cd-designs cd-reveal">' + map(items, function (d) {
      return '<div class="cd-design" style="background-image:url(' + d.img + ')" role="img" aria-label="' + d.alt + '"></div>';
    }) + '</div>';
  }

  /* Photo on one side, cream panel on the other, both the same height. */
  function duo(o) {
    return '<div class="cd-duo cd-reveal">' +
      '<div class="cd-duo__media" style="background-image:url(' + o.img + ')" role="img" aria-label="' + o.alt + '"></div>' +
      '<div class="cd-duo__panel">' +
        (o.eyebrow ? '<span class="cd-eyebrow">' + o.eyebrow + '</span>' : '') +
        '<h2 class="cd-h2" style="margin-top:14px">' + o.h2 + '</h2>' +
        map(o.paras || [], function (t) { return '<p>' + t + '</p>'; }) +
        btnrow(o.ctas) +
      '</div></div>';
  }

  /* Cross-links to the other product ranges. */
  function related(items) {
    return '<div class="cd-grid-ind cd-grid-ind--' + items.length + '">' +
      map(items, function (o) {
        return '<a class="cd-colcard cd-reveal" style="width:auto" href="' + o.href + '">' +
          '<div class="cd-colcard__img" style="background-image:url(' + o.img + ')" role="img" aria-label="' + o.n + '"></div>' +
          '<div class="cd-colcard__body"><h3 class="cd-h3">' + o.n + '</h3><p>' + o.d + '</p>' +
          '<span class="cd-colcard__link">' + o.cta + ' &#8594;</span></div></a>';
      }) + '</div>';
  }

/* Stroke icons shared by the inner pages. Appended to the prelude. */
  var ICON = {
    shield:  '<svg viewBox="0 0 24 24"><path d="M12 3l7 3v5c0 4.4-2.9 8.3-7 9.6C7.9 19.3 5 15.4 5 11V6l7-3z"/><path d="M9 12l2 2 4-4"/></svg>',
    layers:  '<svg viewBox="0 0 24 24"><path d="M12 3l9 5-9 5-9-5 9-5z"/><path d="M3 13l9 5 9-5"/></svg>',
    stack:   '<svg viewBox="0 0 24 24"><rect x="3" y="4.5" width="18" height="3" rx="1"/><rect x="3" y="9" width="18" height="3" rx="1"/><rect x="3" y="13.5" width="18" height="3" rx="1"/><rect x="3" y="18" width="18" height="2.2" rx="1"/></svg>',
    ruler:   '<svg viewBox="0 0 24 24"><rect x="2.5" y="9.5" width="19" height="5" rx="1"/><path d="M2.5 17.5h19M4 16.2v2.6M20 16.2v2.6"/></svg>',
    grid:    '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="8" height="8" rx="1"/><rect x="13" y="3" width="8" height="8" rx="1"/><rect x="3" y="13" width="8" height="8" rx="1"/><rect x="13" y="13" width="8" height="8" rx="1"/></svg>',
    swap:    '<svg viewBox="0 0 24 24"><path d="M4 8h13l-3-3M20 16H7l3 3"/></svg>',
    click:   '<svg viewBox="0 0 24 24"><path d="M4 9h7V5l6 4v6l-6 4v-4H4z"/></svg>',
    drop:    '<svg viewBox="0 0 24 24"><path d="M12 3s6 6.5 6 10a6 6 0 0 1-12 0c0-3.5 6-10 6-10z"/></svg>',
    sound:   '<svg viewBox="0 0 24 24"><path d="M4 9v6h4l5 4V5L8 9H4z"/><path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12"/></svg>',
    broom:   '<svg viewBox="0 0 24 24"><path d="M14 3l-7 7 4 4 7-7z"/><path d="M7 10l-3 8 8-3"/></svg>',
    star:    '<svg viewBox="0 0 24 24"><path d="M12 4l2.4 5 5.6.8-4 3.9 1 5.5-5-2.6-5 2.6 1-5.5-4-3.9 5.6-.8z"/></svg>',
    tag:     '<svg viewBox="0 0 24 24"><path d="M4 12V5h7l9 9-7 7z"/><circle cx="8.5" cy="8.5" r="1.4"/></svg>',
    palette: '<svg viewBox="0 0 24 24"><path d="M12 3a9 9 0 1 0 0 18c1.4 0 2-1 1.4-2-.7-1.2.2-2.4 1.6-2.4H17a4 4 0 0 0 4-4C21 7 17 3 12 3z"/><circle cx="8" cy="10" r="1"/><circle cx="12" cy="7.5" r="1"/><circle cx="16" cy="10" r="1"/></svg>',
    people:  '<svg viewBox="0 0 24 24"><circle cx="9" cy="8" r="3.2"/><path d="M3 20c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5"/><path d="M16 5.2a3.2 3.2 0 0 1 0 5.6M17.5 14.8c2.1.7 3.5 2.5 3.5 5.2"/></svg>',
    chat:    '<svg viewBox="0 0 24 24"><path d="M21 12a8 8 0 0 1-8 8H5l-2 2V12a8 8 0 0 1 8-8h2a8 8 0 0 1 8 8z"/><path d="M9 11h6M9 14h4"/></svg>',
    check:   '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5"/><path d="M8.5 12.2l2.4 2.4 4.6-4.9"/></svg>',
    heart:   '<svg viewBox="0 0 24 24"><path d="M12 20s-7-4.5-7-9.5A4 4 0 0 1 12 8a4 4 0 0 1 7 2.5C19 15.5 12 20 12 20z"/></svg>',
    leaf:    '<svg viewBox="0 0 24 24"><path d="M20 4C9 4 4 9 4 17v3h3c8 0 13-5 13-16z"/><path d="M4 20c4-6 8-9 13-11"/></svg>',
    rupee:   '<svg viewBox="0 0 24 24"><path d="M7 5h10M7 9h10M7 5c5 0 7 1.6 7 4s-2 4-7 4h2l7 6"/></svg>',
    clock:   '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/></svg>',
    pin:     '<svg viewBox="0 0 24 24"><path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z"/><circle cx="12" cy="10" r="2.6"/></svg>',
    doc:     '<svg viewBox="0 0 24 24"><path d="M14 3H6v18h12V7z"/><path d="M14 3v4h4M9 12h6M9 16h6"/></svg>',
    download:'<svg viewBox="0 0 24 24"><path d="M12 4v11m0 0l-4-4m4 4l4-4M5 19h14"/></svg>',
    eye:     '<svg viewBox="0 0 24 24"><path d="M2.5 12S6 6 12 6s9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6z"/><circle cx="12" cy="12" r="2.8"/></svg>',
    grain:   '<svg viewBox="0 0 24 24"><path d="M4 6c4 2 12 2 16 0M4 12c4 2 12 2 16 0M4 18c4 2 12 2 16 0"/></svg>',
    scissors:'<svg viewBox="0 0 24 24"><circle cx="6" cy="18" r="2.4"/><circle cx="18" cy="18" r="2.4"/><path d="M7.7 16.3L18 4M16.3 16.3L6 4"/></svg>',
    sparkle: '<svg viewBox="0 0 24 24"><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M18 15l.9 2.1L21 18l-2.1.9L18 21l-.9-2.1L15 18l2.1-.9z"/></svg>'
  };

/* @meta
tag: candus-wilton-carpets
id: candus-wilton-carpets
file: candus-wilton-carpets
slug: luxury-wilton-carpets
title: Luxury Wilton Carpets for Events | Candus Carpet
description: Discover Luxury Wilton Carpets for weddings, banquets, hotels and celebrations. Explore royal carpet styles with Candus Carpet for your venue or event.
*/

  var PAGE = { tag: 'candus-wilton-carpets', id: 'candus-wilton-carpets' };

  /* Images chosen per the 11 Nov notes: the carpet leads every frame, and no
     photograph with people in it is used. The comment on each line is the SEO
     file name from the copy deck's image table. */
  var IMG = {
    // luxury-wilton-carpets-candus-carpet-celebration-hero.jpg
    hero:     img('835200_1da4ad67d5b748baacd809de3d6d063a~mv2.jpg', 1400, 1000),
    // luxury-wilton-carpets-pattern-detail.jpg
    art:      img('835200_24aa0f59cfdf4ca8958baa95f34b8cc7~mv2.jpeg', 1000, 1000),

    // the six application panels
    wedding:  img('835200_2ca097b7fa824eed8bec63be0675bbe9~mv2.jpg', 900, 920),   // luxury-wilton-carpets-wedding-reception-hall.jpg
    banquet:  img('835200_1cf720e173e84a4fa1793a5349b07dc7~mv2.jpg', 900, 920),   // luxury-wilton-carpets-banquet-hall.jpg
    hotel:    img('835200_1a54a2a7bafe42c091329324b0c3920f~mv2.jpg', 900, 920),   // luxury-wilton-carpets-hotel-event-suite.jpg
    corporate:img('835200_c34aa82b28bb45689f917b572f7285be~mv2.png', 900, 920),   // luxury-wilton-carpets-conference-venue.jpg
    showroom: img('835200_10447612d4f74c929996b5d6d9820054~mv2.jpg', 900, 920),   // luxury-wilton-carpets-premium-showroom.jpg
    home:     img('835200_1e04e0fa574f4d57b769f3ba79572b8c~mv2.jpeg', 900, 920),  // luxury-wilton-carpets-festive-home-gathering.jpg

    // the four design swatches
    d1:       img('835200_1089dd6e83ca4700b495e5a41b21aa14~mv2.jpg', 700, 525),   // luxury-wilton-carpets-pattern-detail.jpg
    d2:       img('835200_12b71d83bbf44f10b4152bf009b52f68~mv2.png', 700, 525),   // luxury-wilton-carpets-texture-close-up.jpg
    d3:       img('835200_475ec124a1084fb4bfa4511e4197f4ad~mv2.jpeg', 700, 525),  // luxury-wilton-carpets-rich-colour-palette.jpg
    d4:       img('835200_9212d1c1942848a2b0c0fc38826992fb~mv2.jpg', 700, 525),  // luxury-wilton-carpets-stage-seating-coordination.jpg

    // luxury-wilton-carpets-event-entrance.jpg
    transform:img('835200_ef0e1931d4b84660b147911ce9e74e7b~mv2.jpg', 1000, 900),
    // luxury-wilton-carpets-venue-planning.jpg
    closing:  img('835200_dbc12cc209ab4e638323e83c6574396a~mv2.jpg', 1920, 900)
  };

  var WA = wa('Hello Candus Carpet, I would like to enquire about Luxury Wilton Carpets.');

  /* the rail down the right edge of the hero */
  var RAIL = ['Weddings', 'Banquets', 'Hotels', 'Events', 'Exhibitions'];

  var BADGES = [
    { i: ICON.sparkle, t: 'Royal Designs' },
    { i: ICON.grain,   t: 'Rich Textures' },
    { i: ICON.star,    t: 'Formal Elegance' }
  ];

  /* The six application panels. Copy cut right down, as asked — each line is
     drawn from the deck's own sentence for that space. */
  var APPS = [
    { t: 'Weddings &amp; Celebrations', img: IMG.wedding,
      alt: 'Patterned Wilton carpet in a wedding reception hall',
      d: 'Indoor wedding halls, pre-function areas, ceremonial spaces and selected pathways.' },
    { t: 'Banquet Halls &amp; Event Venues', img: IMG.banquet,
      alt: 'Wilton carpet in a banquet hall laid out for a function',
      d: 'Family celebrations and corporate gatherings, right through the year.' },
    { t: 'Hotels &amp; Hospitality', img: IMG.hotel,
      alt: 'Richly patterned Wilton carpet in a hotel event corridor',
      d: 'Banquet rooms, event suites and other indoor function areas.' },
    { t: 'Stages, Auditoriums &amp; Conferences', img: IMG.corporate,
      alt: 'Wilton carpet in a conference auditorium',
      d: 'Launches, award ceremonies, conferences, exhibitions and formal dinners.' },
    { t: 'Showrooms &amp; Premium Retail', img: IMG.showroom,
      alt: 'Wilton carpet in a premium showroom interior',
      d: 'Jewellery stores, boutiques and premium display environments.' },
    { t: 'Premium Residences &amp; Private Events', img: IMG.home,
      alt: 'Decorative Wilton carpet in a private residence',
      d: 'Family functions, festive gatherings and special occasions at home.' }
  ];

  /* Benefits are headings only now — the running text has been removed. */
  var BENEFIT_HEADINGS = [
    'A Royal and Premium Visual Finish',
    'A More Cohesive Event Setting',
    'Comfort and a Welcoming Underfoot Feel',
    'A Suitable Backdrop for Photography and D&#233;cor',
    'Versatility Across Different Formal Occasions'
  ];

  var KEY_BENEFITS = [
    { i: ICON.sparkle, t: 'A rich, coordinated foundation for selected celebrations and formal venues' },
    { i: ICON.palette, t: 'Complements stage d&#233;cor, floral arrangements, lighting and event colour palettes' },
    { i: ICON.heart,   t: 'Can contribute to a softer underfoot feel in suitable indoor areas' },
    { i: ICON.star,    t: 'A polished visual identity for banquets, receptions and corporate events' },
    { i: ICON.tag,     t: 'Design possibilities for premium hospitality and selected retail interiors' },
    { i: ICON.people,  t: 'Can be considered for residential celebrations when the setup is suitable' }
  ];

  /* Section 5 is now four separate cards in two columns. */
  var WHY_CARDS = [
    { i: ICON.shield, t: 'A Trusted Manufacturer and Supplier',
      d: 'Candus Floors and Furnishings LLP operates under the Candus Carpet brand and serves residential and commercial customers across India. The wider portfolio includes carpets, rugs, carpet tiles, laminated wooden flooring and customised design discussions.' },
    { i: ICON.chat, t: 'Support for Event Planners, Venues and Project Buyers',
      d: 'Event planners may need to coordinate d&#233;cor and installation timing; venue managers may focus on repeated use and cleaning. Architects and designers may need samples and technical specifications, while families may want help comparing colours and styles. Sharing these details at the start makes the enquiry more focused.' },
    { i: ICON.pin, t: 'PAN-India Dealer and Distributor Network',
      d: 'If you are planning an event or project outside the main service location, share the site city and expected schedule so the team can discuss the appropriate contact and available arrangements. Coverage, stock, delivery timelines and installation availability should be confirmed for the specific project.' },
    { i: ICON.layers, t: 'A Broader Flooring Portfolio for Connected Spaces',
      d: 'Some projects need more than one flooring category. Wilton carpets may suit selected celebration areas, while Carpet Tiles, wall-to-wall carpets, Hand Made Rugs or laminated wooden flooring may suit other zones.' }
  ];

  var DESIGNS = [
    { img: IMG.d1, alt: 'Floral Wilton carpet pattern in deep blue and gold' },
    { img: IMG.d2, alt: 'Abstract Wilton carpet pattern in rust and slate' },
    { img: IMG.d3, alt: 'Geometric Wilton carpet pattern in warm neutrals' },
    { img: IMG.d4, alt: 'Deep red Wilton carpet pattern with a traditional motif' }
  ];

  var FEATURES = [
    ['Colour, Pattern and the Royal Look',
     'Begin with the atmosphere you want to create. Deep, rich colours may suit a dramatic formal setting, while lighter or more restrained designs may complement a contemporary venue. Patterns should work with the stage, seating, flowers, lighting and wall finishes. Review the actual product under lighting similar to the venue before making the final choice.'],
    ['Venue Type and Expected Foot Traffic',
     'A wedding hall, hotel banquet room, showroom and home celebration have different needs. Consider how many people will use the area, whether furniture will be moved, and how often the carpet will be cleaned or reinstalled.'],
    ['Installation, Edges and Transitions',
     'The installer should assess the surface, layout, joins, edges, transitions and any changes in floor level. For public venues, make sure the installation method and edge treatments meet the venue&#8217;s safety requirements and do not create trip hazards.'],
    ['Cleaning, Storage and Repeated Use',
     'Ask how to remove spills, maintain the carpet, and store it if it will be used on selected occasions rather than left in place. Confirm handling procedures, suitable cleaning products and drying requirements.'],
    ['Dimensions, Schedule and Project Coordination',
     'Share measurements, event date, installation window, access restrictions and delivery location. For larger venues, confirm quantities, cutting allowance, stock availability, transport, and the responsibilities of the venue, supplier, decorator and installer.']
  ];

  var RANGES = [
    ['Explore wall-to-wall carpets', L.carpets],
    ['View carpet tile options', L.tiles],
    ['Explore Hand Made Rugs', L.rugs],
    ['Explore laminated wooden flooring', L.laminate]
  ];

  var FAQS = [
    { q: 'What makes Luxury Wilton Carpets suitable for celebrations?',
      a: 'Their decorative appearance can help create a formal, coordinated setting for selected celebrations and event spaces. Suitability depends on the specific design, construction, venue conditions, installation method and care requirements. Review current product information with Candus Carpet before choosing a carpet for an event.' },
    { q: 'Where can Wilton carpets be used?',
      a: 'They may be considered for suitable indoor wedding venues, banquet halls, hotel event spaces, corporate functions, showrooms and selected residential celebrations. The correct choice depends on traffic, cleaning, installation, and any venue-specific safety or building requirements.' },
    { q: 'Are Luxury Wilton Carpets suitable for repeated events?',
      a: 'That depends on the product construction, how it is installed, the intensity of use, and the maintenance routine. If the carpet will be used for recurring events, ask about handling, cleaning, storage, replacement availability, and the product&#8217;s intended application before purchasing.' },
    { q: 'How should Wilton carpets be maintained?',
      a: 'Follow the care instructions provided for the specific carpet. Routine care may include appropriate vacuuming and prompt attention to spills, but cleaning methods vary by fibre, construction, backing and finish. Confirm which cleaning products and techniques are recommended and test any approved method in an inconspicuous area.' },
    { q: 'Can Candus Carpet assist with project or installation enquiries?',
      a: 'Candus Carpet welcomes enquiries from event planners, venues, trade professionals, businesses and residential customers. Share the site location, approximate area, event or project date, preferred design and installation requirements so the team can confirm product availability and the scope of support offered for your location.' }
  ];

  /* ---------------------------------------------------------------------- */
  function buildHTML() {
    return '' +

    /* 1 — HERO (dark). Copy left, photo right, category rail on the edge. */
    heroSplit({
      img: IMG.hero,
      alt: 'Luxury Wilton Carpet by Candus Carpet in a grand celebration venue',
      eyebrow: 'Wilton Carpets',
      title: 'Luxury Wilton Carpets for Grand Celebrations ',
      accent: 'and Elegant Interiors.',
      text: 'Some occasions deserve a setting that feels truly special. Luxury Wilton Carpets bring a rich, refined finish ' +
            'to celebration spaces, helping the venue feel welcoming, coordinated and ready for the moment.',
      ctas: [
        { label: 'Explore Wilton Carpets', href: '#cd-uses' },
        { label: 'Enquire on WhatsApp', href: WA }
      ],
      rail: RAIL
    }) +

    /* 2 — THE ART OF WILTON CARPETS (light). Centred container, left copy and
           right image at matching heights, heading enlarged. */
    '<section class="cd-cream cd-section" id="cd-intro">' +
      '<div class="cd-wrap cd-split cd-split--flip cd-split--match cd-reveal">' +
        '<div class="cd-split__media" style="background-image:url(' + IMG.art + ')" role="img" ' +
          'aria-label="Richly patterned Wilton carpet running through a hotel corridor"></div>' +
        '<div style="display:flex;flex-direction:column;justify-content:center">' +
          '<span class="cd-eyebrow">The Art of</span>' +
          '<h2 class="cd-h2 cd-h2--xl" style="margin-top:12px">Wilton Carpets</h2>' +
          '<p class="cd-label-rule">Classic Craftsmanship. Timeless Elegance.</p>' +
          '<p class="cd-lede">At Candus Carpet, we help residential and commercial customers explore carpet and flooring ' +
            'solutions. This page focuses on the royal, premium character of Wilton carpets for celebrations, functions and ' +
            'selected interiors. For a wedding venue, hotel event, banquet hall, showroom or special gathering at home, the ' +
            'right carpet can complete the setting with warmth, colour and elegance.</p>' +
          '<p class="cd-note">Candus Floors and Furnishings LLP serves customers through a PAN-India dealer and distributor ' +
            'network. Share your venue type, approximate area, preferred colours, event date and installation requirements ' +
            'with our team.</p>' +
          btnrow([{ label: 'Discover Our Collection', href: L.contact, style: 'cd-btn--gold' }]) +
        '</div>' +
      '</div>' +
      '<div class="cd-wrap" style="margin-top:46px">' + badges(BADGES) + '</div>' +
    '</section>' +

    /* 3 — APPLICATIONS (dark). Centred full-width heading, then the six
           expanding panels with short captions and a zoom on open. */
    '<section class="cd-dark cd-section" id="cd-uses">' +
      '<div class="cd-wrap">' +
        head({
          eyebrow: 'Applications',
          h2: 'Where Luxury <em>Wilton Carpets</em> Create Memorable Experiences',
          lede: 'From grand weddings to premium hospitality, Wilton carpets set the stage for celebrations and formal interiors.'
        }) +
        expRail(APPS) +
        btnrow([{ label: 'Discuss Your Event or Venue Requirements', href: L.contact }], true) +
      '</div>' +
    '</section>' +

    /* 4 — WHY CANDUS (light). Four separate cards, two columns. */
    '<section class="cd-cream cd-section" id="cd-why">' +
      '<div class="cd-wrap">' +
        head({ eyebrow: 'Why Candus Carpet', h2: 'Why Choose Candus Wilton Carpets?' }) +
        '<div class="cd-panels">' + map(WHY_CARDS, function (c) {
          return '<article class="cd-panel cd-reveal">' +
            '<div class="cd-badge__ring" style="margin:0 0 20px">' + c.i + '</div>' +
            '<h3>' + c.t + '</h3><p>' + c.d + '</p></article>';
        }) + '</div>' +
        '<p class="cd-note cd-reveal">Before confirming an order, request current designs, accurate dimensions, product ' +
          'specifications, cleaning guidance, stock status, lead time, installation scope, warranty terms where applicable, ' +
          'and any documentation required by the venue. Do not assume every carpet has the same technical properties or is ' +
          'suitable for every event space.</p>' +
        btnrow([{ label: 'Speak to Candus Carpet', href: L.contact }], true) +
      '</div>' +
    '</section>' +

    /* 5 — BENEFITS (dark). Big centred heading, headings only as bullets that
           slide in from the left, then the key benefits as icon cards. */
    '<section class="cd-dark cd-section" id="cd-benefits">' +
      '<div class="cd-wrap">' +
        head({
          eyebrow: 'Benefits',
          h2: 'Benefits of Using Luxury Wilton Carpets for Celebrations and Interiors'
        }) +
        bullets(BENEFIT_HEADINGS) +
        '<h3 class="cd-h3 cd-reveal" style="margin-top:62px;text-align:center">Key Benefits to Consider</h3>' +
        feats(KEY_BENEFITS.map(function (k) { return { i: k.i, t: k.t, d: '' }; }), 3) +
      '</div>' +
    '</section>' +

    /* 6 — DESIGNS THAT SPEAK OF GRANDEUR (light). Copy left, four swatches
           right, both the same height. */
    '<section class="cd-light cd-section" id="cd-designs">' +
      '<div class="cd-wrap cd-split cd-reveal" style="align-items:center">' +
        '<div>' +
          '<span class="cd-eyebrow">A collection for every occasion</span>' +
          '<h2 class="cd-h2 cd-h2--xl" style="margin-top:12px">Designs That Speak of Grandeur</h2>' +
          '<p class="cd-lede">Begin with the atmosphere you want to create. Deep, rich colours may suit a dramatic formal ' +
            'setting, while lighter or more restrained designs may complement a contemporary venue. Patterns should work ' +
            'with the stage, seating, flowers, lighting and wall finishes.</p>' +
          '<p class="cd-note">Review the actual product under lighting similar to the venue before making the final choice.</p>' +
          btnrow([{ label: 'Explore Designs', href: L.contact, style: 'cd-btn--gold' }]) +
        '</div>' +
        designs(DESIGNS) +
      '</div>' +
      '<div class="cd-wrap" style="margin-top:62px">' +
        '<h3 class="cd-h3 cd-reveal" style="text-align:center">Features to Consider When Selecting Luxury Wilton Carpets</h3>' +
        specRows(FEATURES) +
      '</div>' +
    '</section>' +

    /* 7 — TRANSFORM EVERY EVENT (dark). Photo and panel at equal height. */
    '<section class="cd-dark cd-section" id="cd-transform">' +
      '<div class="cd-wrap">' +
        duo({
          img: IMG.transform,
          alt: 'Dramatic patterned Wilton carpet running through an event venue',
          eyebrow: 'Ready when you are',
          h2: 'Transform Every Event into a Royal Affair',
          paras: [
            'Whether it is a wedding, a corporate event or a special celebration, Candus Wilton Carpets add an unmatched ' +
            'sense of elegance and grandeur to your venue.',
            'Share your venue type, approximate area, preferred colours, event date and installation requirements and our ' +
            'team will confirm what is available.'
          ],
          ctas: [
            { label: 'Get a Quote', href: L.contact },
            { label: 'Request the Catalogue', href: L.brochure, style: 'cd-btn--ghost-dark' }
          ]
        }) +
      '</div>' +
    '</section>' +

    /* 8 — FAQ (light), unchanged, now sitting after Transform Every Event. */
    '<section class="cd-light cd-section" id="cd-faq">' +
      '<div class="cd-wrap">' +
        head({ eyebrow: 'FAQs', h2: 'Frequently Asked Questions About Luxury Wilton Carpets' }) +
        faq(FAQS) +
        '<p class="cd-note cd-reveal" style="text-align:center">Coordinating more than one floor? ' +
          map(RANGES, function (r, i) {
            return (i ? ' &nbsp;&middot;&nbsp; ' : '') + '<a class="cd-inline" href="' + r[1] + '">' + r[0] + '</a>';
          }) + '</p>' +
      '</div>' +
    '</section>' +

    /* 9 — CLOSING CTA (dark) */
    '<section class="cd-cta cd-cta--photo" id="cd-contact" style="background-image:url(' + IMG.closing + ')">' +
      '<div class="cd-wrap">' +
        '<span class="cd-eyebrow cd-eyebrow--center">Create a grand setting</span>' +
        '<h2 class="cd-h2 cd-h2--xl">Let&#8217;s Create Extraordinary Spaces Together</h2>' +
        '<p class="cd-lede">The right carpet can bring colour, visual continuity and a royal finishing touch to a suitable ' +
          'venue. Get in touch with our team for product information, samples or expert advice to find the perfect Wilton ' +
          'carpet for your next project.</p>' +
        '<div class="cd-cta__btns">' +
          '<a class="cd-btn cd-btn--gold" href="' + L.contact + '">Contact Us</a>' +
          '<a class="cd-btn cd-btn--ghost" href="' + WA + '" target="_blank" rel="noopener">WhatsApp Candus Carpet</a>' +
          '<a class="cd-btn cd-btn--ghost" href="' + L.tel + '">Call 081058 10604</a>' +
        '</div>' +
      '</div>' +
    '</section>';
  }

/* ==========================================================================
   SHARED PAGE RUNTIME
   Appended to every generated inner page by tools/build-pages.js. The page
   source that precedes it defines PAGE (tag + id), buildHTML() and, if the
   page has an accordion, FAQS. Everything below is identical across pages, so
   it lives here once instead of being copied into each file by hand.
   ========================================================================== */

  /* ---- behaviour: FAQ accordion, in-page anchors, scroll reveal, marquee ---- */
  function wire(root) {
    var qa = function (s) { return Array.prototype.slice.call(root.querySelectorAll(s)); };
    var observers = [];

    qa('a[href^="#cd-"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var t = root.querySelector(a.getAttribute('href'));
        if (!t) return;
        e.preventDefault();
        window.scrollTo({ top: t.getBoundingClientRect().top + window.pageYOffset - 70, behavior: 'smooth' });
      });
    });

    qa('[data-cd-faq] .cd-faq__item').forEach(function (item) {
      var btn = item.querySelector('.cd-faq__q');
      var body = item.querySelector('.cd-faq__a');
      var ico = item.querySelector('.cd-faq__ico');

      function setOpen(open) {
        item.classList.toggle('is-open', open);
        btn.setAttribute('aria-expanded', String(open));
        body.style.maxHeight = open ? body.scrollHeight + 'px' : '0px';
        if (ico) ico.innerHTML = open ? '&#8722;' : '&#43;';
      }
      setOpen(item.classList.contains('is-open'));

      btn.addEventListener('click', function () {
        var willOpen = !item.classList.contains('is-open');
        qa('[data-cd-faq] .cd-faq__item').forEach(function (o) {
          if (o === item) return;
          o.classList.remove('is-open');
          o.querySelector('.cd-faq__q').setAttribute('aria-expanded', 'false');
          o.querySelector('.cd-faq__a').style.maxHeight = '0px';
          var oi = o.querySelector('.cd-faq__ico');
          if (oi) oi.innerHTML = '&#43;';
        });
        setOpen(willOpen);
      });
    });

    var onResize = function () {
      qa('[data-cd-faq] .cd-faq__item.is-open .cd-faq__a').forEach(function (b) {
        b.style.maxHeight = b.scrollHeight + 'px';
      });
    };
    window.addEventListener('resize', onResize);

    /* horizontal rails: the arrows tween scrollLeft by hand, because older iOS
       Safari ignores scrollBy({behavior:'smooth'}) on a nested scroller */
    qa('[data-cd-rail]').forEach(function (rail) {
      var anim = null;
      var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      var step = function () {
        var card = rail.firstElementChild;
        return card ? card.getBoundingClientRect().width + 22 : 330;
      };
      var glide = function (delta) {
        var max = rail.scrollWidth - rail.clientWidth;
        var from = rail.scrollLeft;
        var to = Math.max(0, Math.min(max, from + delta));
        if (to === from) return;
        if (reduce) { rail.scrollLeft = to; return; }
        if (anim) cancelAnimationFrame(anim);
        var t0 = null, dur = 420;
        var tick = function (now) {
          if (t0 === null) t0 = now;
          var p = Math.min(1, (now - t0) / dur);
          var e = p < .5 ? 2 * p * p : -1 + (4 - 2 * p) * p;
          rail.scrollLeft = from + (to - from) * e;
          if (p < 1) anim = requestAnimationFrame(tick); else anim = null;
        };
        anim = requestAnimationFrame(tick);
      };
      var wrap = rail.closest('[data-cd-railwrap]') || root;
      var prev = wrap.querySelector('[data-cd-railprev]');
      var next = wrap.querySelector('[data-cd-railnext]');
      if (prev) prev.addEventListener('click', function () { glide(-step()); });
      if (next) next.addEventListener('click', function () { glide(step()); });
    });

    /* category filters: buttons carrying data-cd-filter=<key> show only the
       items in [data-cd-filterable] whose data-cd-cat matches (all = every item) */
    var fbtns = qa('[data-cd-filter]');
    if (fbtns.length) {
      var apply = function (key) {
        fbtns.forEach(function (b) {
          var on = b.getAttribute('data-cd-filter') === key;
          b.classList.toggle('is-active', on);
          b.setAttribute('aria-pressed', String(on));
        });
        qa('[data-cd-filterable] [data-cd-cat]').forEach(function (it) {
          var show = key === 'all' || it.getAttribute('data-cd-cat') === key;
          it.hidden = !show;
        });
      };
      fbtns.forEach(function (b) {
        b.addEventListener('click', function () { apply(b.getAttribute('data-cd-filter')); });
      });
      apply('all');
    }

    /* expanding panel rail: the hovered (or focused, or tapped) panel opens
       and the rest collapse, the way the reference section behaves */
    qa('[data-cd-exp]').forEach(function (rail) {
      var panels = Array.prototype.slice.call(rail.querySelectorAll('.cd-exp'));
      var open = function (p) {
        panels.forEach(function (o) { o.classList.toggle('is-open', o === p); });
      };
      panels.forEach(function (p) {
        p.addEventListener('mouseenter', function () { open(p); });
        p.addEventListener('focusin', function () { open(p); });
        p.addEventListener('click', function () { open(p); });
      });
      if (panels[0]) open(panels[0]);
    });

    /* bullet rows slide in from the left, one after another */
    var bullets = qa('.cd-bullet');
    if (bullets.length && 'IntersectionObserver' in window) {
      var bio = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          var row = en.target;
          var i = parseInt(row.getAttribute('data-cd-i'), 10) || 0;
          setTimeout(function () { row.classList.add('is-in'); }, i * 110);
          bio.unobserve(row);
        });
      }, { rootMargin: '0px 0px -10% 0px', threshold: .2 });
      bullets.forEach(function (b) { bio.observe(b); });
      observers.push(bio);
    } else {
      bullets.forEach(function (b) { b.classList.add('is-in'); });
    }

    var reveals = qa('.cd-reveal');
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: .08 });
      reveals.forEach(function (el) { io.observe(el); });
      observers.push(io);
    } else {
      reveals.forEach(function (el) { el.classList.add('is-in'); });
    }

    return function () {
      observers.forEach(function (o) { o.disconnect(); });
      window.removeEventListener('resize', onResize);
    };
  }

  /* ---- FAQPage structured data, built from the same FAQS the accordion uses ---- */
  function injectSchema() {
    if (typeof FAQS === 'undefined' || !FAQS.length) return;
    var id = 'cd-faq-schema-' + PAGE.id;
    if (document.getElementById(id)) return;
    var strip = function (s) {
      return String(s).replace(/&amp;/g, '&').replace(/&#43;/g, '+').replace(/&#8217;/g, '’').replace(/<[^>]*>/g, '');
    };
    var s = document.createElement('script');
    s.id = id;
    s.type = 'application/ld+json';
    s.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQS.map(function (f) {
        return { '@type': 'Question', name: strip(f.q),
                 acceptedAnswer: { '@type': 'Answer', text: strip(f.a) } };
      })
    });
    document.head.appendChild(s);
  }

  /* ---- the custom element ---- */
  if (window.customElements && customElements.get(PAGE.tag)) return;

  var El = function () {
    var self = Reflect.construct(HTMLElement, [], El);
    self._teardown = null;
    return self;
  };
  El.prototype = Object.create(HTMLElement.prototype);
  El.prototype.constructor = El;
  Object.setPrototypeOf(El, HTMLElement);

  El.prototype.connectedCallback = function () {
    if (this._rendered) return;
    this._rendered = true;
    this.id = this.id || PAGE.id;
    this.classList.add('cd-root');   // shared stylesheet scope
    this.innerHTML = buildHTML();
    this._teardown = wire(this);
    try { injectSchema(); } catch (e) { /* schema is a bonus, never fatal */ }
  };

  El.prototype.disconnectedCallback = function () {
    if (this._teardown) { this._teardown(); this._teardown = null; }
  };

  customElements.define(PAGE.tag, El);
})();
