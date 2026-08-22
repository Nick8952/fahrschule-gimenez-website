/* =========================================================
   Fahrschule Roberto Gimenez – Interaktivität & Effekte
   ========================================================= */
(function () {
  "use strict";

  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- Jahr im Footer ---- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- Header: Schatten beim Scrollen + Scroll-Fortschritt ---- */
  var header = document.getElementById("siteHeader");
  var progress = document.getElementById("scrollProgress");

  function onScroll() {
    var y = window.scrollY || document.documentElement.scrollTop;
    if (header) header.classList.toggle("scrolled", y > 10);
    if (progress) {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = (h > 0 ? (y / h) * 100 : 0) + "%";
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- Mobile-Navigation ---- */
  var toggle = document.getElementById("navToggle");
  var nav = document.getElementById("mainNav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Menü schliessen" : "Menü öffnen");
    });
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        nav.classList.remove("open");
        toggle.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---- Reveal-on-Scroll ---- */
  var revealEls = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
  if (prefersReduced || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("visible"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var delay = parseInt(entry.target.getAttribute("data-delay") || "0", 10);
          setTimeout(function () { entry.target.classList.add("visible"); }, delay);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  }

  /* ---- Animierte Zähler (Stats) ---- */
  var counters = Array.prototype.slice.call(document.querySelectorAll(".stat-num[data-count]"));
  function animateCount(el) {
    var target = parseInt(el.getAttribute("data-count"), 10) || 0;
    var suffix = el.getAttribute("data-suffix") || "";
    if (prefersReduced) { el.textContent = target + suffix; return; }
    var start = 0, dur = 1400, t0 = null;
    function tick(ts) {
      if (!t0) t0 = ts;
      var p = Math.min((ts - t0) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(start + (target - start) * eased) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  if (counters.length) {
    if (!("IntersectionObserver" in window)) {
      counters.forEach(animateCount);
    } else {
      var co = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) { animateCount(entry.target); co.unobserve(entry.target); }
        });
      }, { threshold: 0.6 });
      counters.forEach(function (el) { co.observe(el); });
    }
  }

  /* ---- Aktiver Navigationslink je nach Abschnitt ---- */
  var sections = Array.prototype.slice.call(document.querySelectorAll("main section[id]"));
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav a[href^="#"]'));
  if (sections.length && navLinks.length && "IntersectionObserver" in window) {
    var so = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.getAttribute("id");
          navLinks.forEach(function (l) {
            l.classList.toggle("active", l.getAttribute("href") === "#" + id);
          });
        }
      });
    }, { threshold: 0.5 });
    sections.forEach(function (s) { so.observe(s); });
  }

  /* ---- Kontaktformular (öffnet vorbefüllte E-Mail) ---- */
  var form = document.getElementById("contactForm");
  var note = document.getElementById("formNote");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = (form.name.value || "").trim();
      var phone = (form.phone.value || "").trim();
      if (!name || !phone) {
        if (note) { note.textContent = "Bitte Name und Telefon angeben."; note.className = "form-note err"; }
        return;
      }
      var topic = form.topic.value;
      var msg = (form.message.value || "").trim();
      var subject = encodeURIComponent("Anfrage Fahrschule – " + topic);
      var body = encodeURIComponent(
        "Name: " + name + "\nTelefon: " + phone + "\nInteresse: " + topic + "\n\n" + msg
      );
      window.location.href = "mailto:info@gimenez.ch?subject=" + subject + "&body=" + body;
      if (note) { note.textContent = "Danke! Dein E-Mail-Programm öffnet sich – wir melden uns rasch zurück."; note.className = "form-note ok"; }
      form.reset();
    });
  }

  /* ---- FAQ-Akkordeon ---- */
  var faqItems = Array.prototype.slice.call(document.querySelectorAll(".faq-item"));
  faqItems.forEach(function (item) {
    var q = item.querySelector(".faq-q");
    var a = item.querySelector(".faq-a");
    if (!q || !a) return;
    q.setAttribute("aria-expanded", "false");
    q.addEventListener("click", function () {
      var isOpen = item.classList.contains("open");
      // andere schliessen (Accordion-Verhalten)
      faqItems.forEach(function (other) {
        if (other !== item) {
          other.classList.remove("open");
          var oa = other.querySelector(".faq-a");
          var oq = other.querySelector(".faq-q");
          if (oa) oa.style.maxHeight = null;
          if (oq) oq.setAttribute("aria-expanded", "false");
        }
      });
      if (isOpen) {
        item.classList.remove("open");
        a.style.maxHeight = null;
        q.setAttribute("aria-expanded", "false");
      } else {
        item.classList.add("open");
        a.style.maxHeight = a.scrollHeight + "px";
        q.setAttribute("aria-expanded", "true");
      }
    });
  });

  /* ---- Sanftes Scrollen für interne Links (Fallback) ---- */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener("click", function (e) {
      var id = a.getAttribute("href");
      if (id.length > 1) {
        var target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          var top = target.getBoundingClientRect().top + window.scrollY - 70;
          window.scrollTo({ top: top, behavior: prefersReduced ? "auto" : "smooth" });
        }
      }
    });
  });

  /* =========================================================
     Warenkorb / Buchung (clientseitig, localStorage)
     ========================================================= */
  var CART_KEY = "fg_cart_v1";
  var ORDER_KEY = "fg_order_v1";
  var SHOP_EMAIL = "info@gimenez.ch";

  function readCart() {
    try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
    catch (e) { return []; }
  }
  function writeCart(items) {
    try { localStorage.setItem(CART_KEY, JSON.stringify(items)); } catch (e) {}
    updateCartCount(true);
  }
  function cartTotalQty() {
    return readCart().reduce(function (n, i) { return n + i.qty; }, 0);
  }
  function cartTotalPrice() {
    return readCart().reduce(function (s, i) { return s + i.price * i.qty; }, 0);
  }
  function money(n) {
    return "CHF " + (Math.round(n * 100) / 100).toFixed(2);
  }
  function updateCartCount(animate) {
    var count = cartTotalQty();
    var badges = document.querySelectorAll(".cart-count");
    badges.forEach(function (b) {
      b.textContent = count;
      b.classList.toggle("is-empty", count === 0);
      if (animate && count > 0 && !prefersReduced) {
        b.classList.remove("pop");
        void b.offsetWidth; // reflow, damit die Animation neu startet
        b.classList.add("pop");
      }
    });
  }
  updateCartCount(false);

  /* ---- In den Warenkorb (Event-Delegation) ---- */
  document.addEventListener("click", function (e) {
    var btn = e.target.closest ? e.target.closest(".add-to-cart") : null;
    if (!btn) return;
    var id = btn.getAttribute("data-id");
    var name = btn.getAttribute("data-name");
    var price = parseFloat(btn.getAttribute("data-price")) || 0;
    var items = readCart();
    var existing = null;
    for (var i = 0; i < items.length; i++) { if (items[i].id === id) { existing = items[i]; break; } }
    if (existing) { existing.qty += 1; } else { items.push({ id: id, name: name, price: price, qty: 1 }); }
    writeCart(items);
    var orig = btn.getAttribute("data-label") || btn.textContent;
    btn.setAttribute("data-label", orig);
    btn.classList.add("added");
    btn.textContent = "✓ Im Warenkorb";
    setTimeout(function () { btn.textContent = orig; btn.classList.remove("added"); }, 1500);
  });

  /* ---- Warenkorb-Seite rendern ---- */
  var cartRoot = document.getElementById("cartRoot");
  function renderCart() {
    if (!cartRoot) return;
    var items = readCart();
    if (!items.length) {
      cartRoot.innerHTML =
        '<div class="cart-empty">' +
          '<div class="cart-empty-icon" aria-hidden="true"><svg class="icon" viewBox="0 0 24 24"><circle cx="9" cy="20" r="1.4" fill="currentColor" stroke="none"/><circle cx="17" cy="20" r="1.4" fill="currentColor" stroke="none"/><path d="M2.5 3h2l2.4 12.1a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6L20.5 7H6"/></svg></div>' +
          '<h2>Dein Warenkorb ist leer</h2>' +
          '<p>Stöbere durch unsere Kurse und Fahrstunden und leg dir zusammen, was du brauchst.</p>' +
          '<a href="preise.html" class="btn btn-primary btn-lg">Zu den Preisen</a>' +
        '</div>';
      return;
    }
    var html = "";
    items.forEach(function (it) {
      html +=
        '<div class="cart-item" data-id="' + it.id + '">' +
          '<div class="cart-item-info"><strong>' + it.name + '</strong><small>' + money(it.price) + ' / Einheit</small></div>' +
          '<div class="qty">' +
            '<button type="button" class="qty-dec" aria-label="Weniger">−</button>' +
            '<span class="qty-val">' + it.qty + '</span>' +
            '<button type="button" class="qty-inc" aria-label="Mehr">+</button>' +
          '</div>' +
          '<div class="cart-item-price">' + money(it.price * it.qty) + '</div>' +
          '<button type="button" class="cart-remove" aria-label="Entfernen">' +
            '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/></svg>' +
          '</button>' +
        '</div>';
    });
    html +=
      '<div class="cart-summary">' +
        '<div class="line"><span>Zwischensumme (Richtpreise)</span><span>' + money(cartTotalPrice()) + '</span></div>' +
        '<div class="line total"><span>Total</span><span>' + money(cartTotalPrice()) + '</span></div>' +
        '<p class="order-hint">Preise sind Richtwerte. Den definitiven Preis bestätigt dir die Fahrschule – es erfolgt keine Online-Zahlung.</p>' +
      '</div>' +
      '<div class="cart-actions">' +
        '<a href="preise.html" class="btn btn-outline">← Weiter stöbern</a>' +
        '<a href="kasse.html" class="btn btn-primary btn-lg">Zur Kasse →</a>' +
      '</div>';
    cartRoot.innerHTML = html;
  }
  if (cartRoot) {
    renderCart();
    cartRoot.addEventListener("click", function (e) {
      var row = e.target.closest ? e.target.closest(".cart-item") : null;
      if (!row) return;
      var id = row.getAttribute("data-id");
      var items = readCart();
      var idx = -1;
      for (var i = 0; i < items.length; i++) { if (items[i].id === id) { idx = i; break; } }
      if (idx < 0) return;
      if (e.target.closest(".qty-inc")) { items[idx].qty += 1; }
      else if (e.target.closest(".qty-dec")) { items[idx].qty -= 1; if (items[idx].qty < 1) items.splice(idx, 1); }
      else if (e.target.closest(".cart-remove")) { items.splice(idx, 1); }
      else { return; }
      writeCart(items);
      renderCart();
    });
  }

  /* ---- Bestell-Zusammenfassung (HTML) ---- */
  function orderSummaryHTML(items) {
    var html = '<ul class="order-summary">';
    items.forEach(function (it) {
      html += '<li><span>' + it.name + ' <span class="qtybadge">× ' + it.qty + '</span></span><span>' + money(it.price * it.qty) + '</span></li>';
    });
    html += '</ul>';
    var total = items.reduce(function (s, i) { return s + i.price * i.qty; }, 0);
    html += '<div class="order-total"><span>Total (Richtpreis)</span><span>' + money(total) + '</span></div>';
    html += '<p class="order-hint">Unverbindlich – keine Online-Zahlung. Wir bestätigen Termin und Preis.</p>';
    return html;
  }

  /* ---- Kasse: Zusammenfassung + Formular ---- */
  var checkoutSummary = document.getElementById("checkoutSummary");
  if (checkoutSummary) {
    var coItems = readCart();
    if (coItems.length) {
      checkoutSummary.innerHTML = orderSummaryHTML(coItems);
    } else {
      checkoutSummary.innerHTML = '<p class="order-hint">Dein Warenkorb ist leer. <a href="preise.html">Kurse auswählen →</a></p>';
    }
  }

  var checkoutForm = document.getElementById("checkoutForm");
  var checkoutNote = document.getElementById("checkoutNote");
  if (checkoutForm) {
    checkoutForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var items = readCart();
      if (!items.length) {
        if (checkoutNote) { checkoutNote.textContent = "Dein Warenkorb ist leer – bitte wähle zuerst einen Kurs aus."; checkoutNote.className = "form-note err"; }
        return;
      }
      var f = checkoutForm;
      var first = (f.firstname.value || "").trim();
      var last = (f.lastname.value || "").trim();
      var email = (f.email.value || "").trim();
      var phone = (f.phone.value || "").trim();
      if (!first || !last || !email || !phone) {
        if (checkoutNote) { checkoutNote.textContent = "Bitte fülle Vorname, Nachname, E-Mail und Telefon aus."; checkoutNote.className = "form-note err"; }
        return;
      }
      if (!f.agb.checked) {
        if (checkoutNote) { checkoutNote.textContent = "Bitte akzeptiere AGB und Datenschutzerklärung."; checkoutNote.className = "form-note err"; }
        return;
      }
      var d = new Date();
      var ref = "FG-" + d.getFullYear() + ("0" + (d.getMonth() + 1)).slice(-2) + ("0" + d.getDate()).slice(-2) + "-" + Math.floor(1000 + Math.random() * 9000);
      var order = {
        ref: ref,
        date: d.toLocaleDateString("de-CH") + " " + d.toLocaleTimeString("de-CH"),
        firstname: first, lastname: last, email: email, phone: phone,
        language: f.language.value, preferred: (f.preferred.value || "").trim(),
        message: (f.message.value || "").trim(),
        payment: (f.querySelector('input[name="payment"]:checked') || {}).value || "",
        items: items, total: cartTotalPrice()
      };
      try { sessionStorage.setItem(ORDER_KEY, JSON.stringify(order)); } catch (err) {}
      writeCart([]); // Warenkorb leeren
      window.location.href = "bestaetigung.html";
    });
  }

  /* ---- Bestätigungsseite ---- */
  var confirmRoot = document.getElementById("orderConfirmation");
  function buildMailto(order) {
    var lines = [];
    lines.push("Neue Buchungsanfrage über die Website");
    lines.push("Referenz: " + order.ref);
    lines.push("Datum: " + order.date);
    lines.push("");
    lines.push("Name: " + order.firstname + " " + order.lastname);
    lines.push("E-Mail: " + order.email);
    lines.push("Telefon: " + order.phone);
    lines.push("Sprache: " + order.language);
    if (order.preferred) lines.push("Wunschtermin: " + order.preferred);
    lines.push("Bezahlung: " + order.payment);
    lines.push("");
    lines.push("Gewählte Kurse / Fahrstunden:");
    order.items.forEach(function (it) {
      lines.push("- " + it.name + " x " + it.qty + " = " + money(it.price * it.qty));
    });
    lines.push("Total (Richtpreis): " + money(order.total));
    if (order.message) { lines.push(""); lines.push("Bemerkung: " + order.message); }
    lines.push("");
    lines.push("(Unverbindliche Anfrage – bitte Termin und definitiven Preis bestätigen.)");
    return "mailto:" + SHOP_EMAIL +
      "?subject=" + encodeURIComponent("Buchungsanfrage " + order.ref + " – " + order.firstname + " " + order.lastname) +
      "&body=" + encodeURIComponent(lines.join("\n"));
  }
  if (confirmRoot) {
    var order = null;
    try { order = JSON.parse(sessionStorage.getItem(ORDER_KEY)); } catch (e) {}
    if (!order) {
      confirmRoot.innerHTML =
        '<div class="confirm-card">' +
          '<h1>Keine aktuelle Buchung gefunden</h1>' +
          '<p>Vielleicht hast du die Seite direkt aufgerufen oder neu geladen. Starte deine Anfrage einfach über die Preisseite.</p>' +
          '<div class="confirm-actions"><a href="preise.html" class="btn btn-primary btn-lg">Zu den Preisen</a><a href="kontakt.html" class="btn btn-outline btn-lg">Kontakt</a></div>' +
        '</div>';
    } else {
      confirmRoot.innerHTML =
        '<div class="confirm-card">' +
          '<div class="confirm-badge" aria-hidden="true"><svg viewBox="0 0 24 24" width="38" height="38" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></div>' +
          '<h1>Vielen Dank, ' + order.firstname + '!</h1>' +
          '<p>Deine unverbindliche Buchungsanfrage ist bereit. Sende sie mit einem Klick an die Fahrschule – wir melden uns rasch mit den freien Terminen.</p>' +
          '<span class="order-ref">Referenz: ' + order.ref + '</span>' +
          '<div class="confirm-details">' +
            '<h3>Deine Auswahl</h3>' + orderSummaryHTML(order.items) +
            '<p class="order-hint" style="margin-top:1rem"><strong>Kontakt:</strong> ' + order.firstname + ' ' + order.lastname + ' · ' + order.phone + ' · ' + order.email + '<br><strong>Bezahlung:</strong> ' + order.payment + (order.preferred ? '<br><strong>Wunschtermin:</strong> ' + order.preferred : '') + '</p>' +
          '</div>' +
          '<div class="confirm-actions">' +
            '<a href="' + buildMailto(order) + '" class="btn btn-primary btn-lg"><svg class="icon" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg> Anfrage jetzt senden</a>' +
            '<a href="tel:+41796759275" class="btn btn-outline btn-lg">Lieber anrufen</a>' +
          '</div>' +
          '<p class="fineprint" style="margin-top:1.4rem">Es erfolgt keine Online-Zahlung. Mit „Anfrage senden“ öffnet sich dein E-Mail-Programm mit einer vorbereiteten Nachricht an ' + SHOP_EMAIL + '.</p>' +
        '</div>';
    }
  }
})();
