/* ==========================================================
   ASTAR ASSOCIATES — shared site script (vanilla JavaScript)
   ========================================================== */

(function () {
    "use strict";

    var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* ---------- 1. Icons ----------
       Elements with data-icon="name" receive an inline SVG.
       Inline SVG works when pages are opened straight from disk (file://). */
    var ICONS = {
        "arrow-right": '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
        "arrow-up-right": '<path d="M7 17 17 7"/><path d="M7 7h10v10"/>',
        "chevron-left": '<path d="m15 18-6-6 6-6"/>',
        "chevron-right": '<path d="m9 18 6-6-6-6"/>',
        "close": '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
        "phone": '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>',
        "mail": '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
        "map-pin": '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
        "users": '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
        "leaf": '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>',
        "message": '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="M8 10h.01"/><path d="M12 10h.01"/><path d="M16 10h.01"/>',
        "shield-check": '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
        "star": '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
        "layout-map": '<path d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z"/><path d="M15 5.764v15"/><path d="M9 3.236v15"/>',
        "hard-hat": '<path d="M2 18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v2z"/><path d="M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5"/><path d="M4 15v-3a6 6 0 0 1 6-6"/><path d="M14 6a6 6 0 0 1 6 6v3"/>',
        "building": '<rect width="16" height="20" x="4" y="2" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/>',
        "sofa": '<path d="M20 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3"/><path d="M2 16a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v1.5a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5V11a2 2 0 0 0-4 0z"/><path d="M4 18v2"/><path d="M20 18v2"/><path d="M12 4v9"/>',
        "wrench": '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
        "compass": '<circle cx="12" cy="5" r="2"/><path d="m3 21 8.02-14.26"/><path d="m12.99 6.74 1.93 3.44"/><path d="M19 12c-3.87 4-10.13 4-14 0"/><path d="m21 21-2.16-3.84"/>',
        "target": '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
        "eye": '<path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/>',
        "calendar": '<rect width="18" height="18" x="3" y="4" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/>',
        "layers": '<path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/>',
        "file-check": '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="m9 15 2 2 4-4"/>',
        "handshake": '<path d="m11 17 2 2a1 1 0 1 0 3-3"/><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"/><path d="m21 3 1 11h-2"/><path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3"/><path d="M3 4h8"/>',
        "chart": '<path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/>',
        "check-circle": '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
        "alert": '<circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/>',
        "zoom": '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/><path d="M11 8v6"/><path d="M8 11h6"/>',
        "play": '<polygon points="6 3 20 12 6 21 6 3" fill="currentColor"/>',
        "instagram": '<rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><path d="M17.5 6.5h.01"/>'
    };

    var FILLED_ICONS = {
        "whatsapp": '<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>'
    };

    function renderIcons(root) {
        (root || document).querySelectorAll("[data-icon]").forEach(function (el) {
            var name = el.getAttribute("data-icon");
            var svg;
            if (FILLED_ICONS[name]) {
                svg = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">' + FILLED_ICONS[name] + "</svg>";
            } else if (ICONS[name]) {
                svg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' + ICONS[name] + "</svg>";
            } else {
                return;
            }
            el.classList.add("icon");
            el.setAttribute("aria-hidden", "true");
            el.innerHTML = svg;
            el.removeAttribute("data-icon");
        });
    }

    /* ---------- 2. Header scroll state ---------- */
    function initHeader() {
        var header = document.querySelector(".site-header");
        if (!header) return;
        var update = function () {
            header.classList.toggle("is-scrolled", window.scrollY > 40);
        };
        update();
        window.addEventListener("scroll", update, { passive: true });
    }

    /* ---------- 3. Active navigation ---------- */
    function initActiveNav() {
        var page = window.location.pathname.split("/").pop() || "index.html";
        if (page === "our-team.html") page = "team.html";
        document.querySelectorAll(".nav-link, .footer-nav a").forEach(function (link) {
            var isActive = link.getAttribute("href") === page;
            link.classList.toggle("is-active", isActive);
            if (isActive) {
                link.setAttribute("aria-current", "page");
            } else {
                link.removeAttribute("aria-current");
            }
        });
    }

    /* ---------- 4. Mobile navigation ---------- */
    function initMobileNav() {
        var toggle = document.querySelector(".nav-toggle");
        var nav = document.getElementById("main-nav");
        var backdrop = document.querySelector(".nav-backdrop");
        if (!toggle || !nav) return;

        function setOpen(open) {
            toggle.setAttribute("aria-expanded", String(open));
            toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
            nav.classList.toggle("is-open", open);
            document.body.classList.toggle("nav-open", open);
            if (backdrop) backdrop.classList.toggle("is-visible", open);
        }

        toggle.addEventListener("click", function () {
            setOpen(toggle.getAttribute("aria-expanded") !== "true");
        });

        nav.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                setOpen(false);
            });
        });

        if (backdrop) backdrop.addEventListener("click", function () {
            setOpen(false);
        });

        document.addEventListener("keydown", function (e) {
            if (e.key === "Escape" && nav.classList.contains("is-open")) {
                setOpen(false);
                toggle.focus();
            }
        });

        window.matchMedia("(min-width: 1025px)").addEventListener("change", function (mq) {
            if (mq.matches) setOpen(false);
        });
    }

    /* ---------- 5. Hero slider ---------- */
    function initHeroSlider() {
        var hero = document.querySelector("[data-hero-slider]");
        if (!hero) return;

        var slides = hero.querySelectorAll(".hero-slide");
        var dots = hero.querySelectorAll(".slide-dot");
        var progress = hero.querySelector(".slide-progress span");
        var caption = hero.querySelector("[data-hero-caption]");
        var DURATION = 6000;
        var current = 0;
        var timer = null;

        if (slides.length < 2) return;
        hero.style.setProperty("--slide-duration", DURATION + "ms");

        function goTo(index) {
            slides[current].classList.remove("is-active");
            dots[current].classList.remove("is-active");
            dots[current].removeAttribute("aria-current");

            current = (index + slides.length) % slides.length;

            slides[current].classList.add("is-active");
            dots[current].classList.add("is-active");
            dots[current].setAttribute("aria-current", "true");
            if (caption) caption.textContent = slides[current].getAttribute("data-caption") || "";
            restartProgress();
        }

        function restartProgress() {
            if (!progress) return;
            progress.classList.remove("is-running");
            void progress.offsetWidth; // restart CSS animation
            if (timer) progress.classList.add("is-running");
        }

        function start() {
            if (prefersReducedMotion) return;
            stop();
            timer = window.setInterval(function () {
                goTo(current + 1);
            }, DURATION);
            restartProgress();
        }

        function stop() {
            window.clearInterval(timer);
            timer = null;
            if (progress) progress.classList.remove("is-running");
        }

        dots.forEach(function (dot, i) {
            dot.addEventListener("click", function () {
                goTo(i);
                start();
            });
        });

        document.addEventListener("visibilitychange", function () {
            if (document.hidden) {
                stop();
            } else {
                start();
            }
        });

        start();
    }

    /* ---------- 6. Gallery filter ---------- */
    function initGalleryFilter() {
        var bar = document.querySelector(".filter-bar");
        var items = document.querySelectorAll(".gallery-item");
        var empty = document.querySelector(".gallery-empty");
        if (!bar || !items.length) return;

        var buttons = bar.querySelectorAll(".filter-btn");

        // Hide category buttons that have no tagged items yet (no empty categories are shown).
        buttons.forEach(function (btn) {
            var filter = btn.getAttribute("data-filter");
            if (filter === "all") return;
            var count = Array.prototype.filter.call(items, function (item) {
                return (item.getAttribute("data-category") || "").split(" ").indexOf(filter) !== -1;
            }).length;
            if (!count) btn.hidden = true;
        });

        buttons.forEach(function (btn) {
            btn.addEventListener("click", function () {
                var filter = btn.getAttribute("data-filter");
                var visible = 0;

                buttons.forEach(function (b) {
                    b.classList.toggle("is-active", b === btn);
                    b.setAttribute("aria-pressed", String(b === btn));
                });

                items.forEach(function (item) {
                    var cats = (item.getAttribute("data-category") || "").split(" ");
                    var show = filter === "all" || cats.indexOf(filter) !== -1;
                    item.classList.remove("is-entering");
                    item.classList.toggle("is-hidden", !show);
                    if (show) {
                        void item.offsetWidth;
                        item.classList.add("is-entering");
                        visible++;
                    }
                });

                if (empty) empty.hidden = visible > 0;
            });
        });
    }

    /* ---------- 7. Lightbox ---------- */
    function initLightbox() {
        var lightbox = document.getElementById("lightbox");
        var items = document.querySelectorAll(".gallery-item");
        if (!lightbox || !items.length) return;

        var media = lightbox.querySelector(".lightbox-media");
        var captionEl = lightbox.querySelector(".lightbox-title");
        var counterEl = lightbox.querySelector(".lightbox-counter");
        var closeBtn = lightbox.querySelector(".lightbox-close");
        var prevBtn = lightbox.querySelector(".lightbox-prev");
        var nextBtn = lightbox.querySelector(".lightbox-next");
        var list = [];
        var index = 0;
        var lastFocus = null;

        function visibleItems() {
            return Array.prototype.filter.call(items, function (item) {
                return !item.classList.contains("is-hidden");
            });
        }

        function show(i) {
            index = (i + list.length) % list.length;
            var item = list[index];
            var src = item.getAttribute("data-src");
            var title = item.getAttribute("data-title") || "";
            var el;

            if (item.getAttribute("data-type") === "video") {
                el = document.createElement("video");
                el.src = src;
                el.controls = true;
                el.autoplay = true;
                el.muted = true;
                el.loop = true;
                el.playsInline = true;
                el.setAttribute("aria-label", title);
            } else {
                el = document.createElement("img");
                el.src = src;
                el.alt = item.querySelector("img") ? item.querySelector("img").alt : title;
            }

            media.innerHTML = "";
            media.appendChild(el);
            captionEl.textContent = title;
            counterEl.textContent = (index + 1) + " / " + list.length;
        }

        function open(item) {
            list = visibleItems();
            lastFocus = document.activeElement;
            show(list.indexOf(item));
            lightbox.classList.add("is-open");
            lightbox.setAttribute("aria-hidden", "false");
            document.body.classList.add("lightbox-open");
            closeBtn.focus();
        }

        function close() {
            lightbox.classList.remove("is-open");
            lightbox.setAttribute("aria-hidden", "true");
            document.body.classList.remove("lightbox-open");
            media.innerHTML = "";
            if (lastFocus) lastFocus.focus();
        }

        items.forEach(function (item) {
            item.addEventListener("click", function () {
                open(item);
            });
        });

        closeBtn.addEventListener("click", close);
        prevBtn.addEventListener("click", function () { show(index - 1); });
        nextBtn.addEventListener("click", function () { show(index + 1); });

        lightbox.addEventListener("click", function (e) {
            if (e.target === lightbox) close();
        });

        document.addEventListener("keydown", function (e) {
            if (!lightbox.classList.contains("is-open")) return;
            if (e.key === "Escape") close();
            if (e.key === "ArrowLeft") show(index - 1);
            if (e.key === "ArrowRight") show(index + 1);
            if (e.key === "Tab") {
                // keep focus inside the lightbox controls
                var focusables = [closeBtn, prevBtn, nextBtn];
                var pos = focusables.indexOf(document.activeElement);
                e.preventDefault();
                var next = e.shiftKey ? pos - 1 : pos + 1;
                focusables[(next + focusables.length) % focusables.length].focus();
            }
        });

        // Simple swipe support on touch screens
        var startX = null;
        lightbox.addEventListener("touchstart", function (e) {
            startX = e.touches[0].clientX;
        }, { passive: true });
        lightbox.addEventListener("touchend", function (e) {
            if (startX === null) return;
            var dx = e.changedTouches[0].clientX - startX;
            if (Math.abs(dx) > 50) show(dx < 0 ? index + 1 : index - 1);
            startX = null;
        });
    }

    /* ---------- 7b. Gallery videos: muted autoplay, paused while off-screen ---------- */
    function initGalleryVideos() {
        var videos = document.querySelectorAll(".gallery-item video");
        if (!videos.length) return;

        videos.forEach(function (video) {
            video.muted = true; // required for autoplay in every browser
            var playing = video.play();
            if (playing && playing.catch) playing.catch(function () {});
        });

        if (!("IntersectionObserver" in window)) return;
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                var video = entry.target;
                if (entry.isIntersecting && !video.closest(".is-hidden")) {
                    var p = video.play();
                    if (p && p.catch) p.catch(function () {});
                } else {
                    video.pause();
                }
            });
        }, { threshold: 0.2 });
        videos.forEach(function (video) { observer.observe(video); });
    }

    /* ---------- 8. Contact form validation ---------- */
    function initContactForm() {
        var form = document.getElementById("enquiry-form");
        if (!form) return;

        var status = document.getElementById("form-status");
        var EMAIL = "astarassociates@yahoo.in";

        // Pre-fill the subject when arriving from a service card (contact.html?service=Layouts)
        var service = new URLSearchParams(window.location.search).get("service");
        if (service && form.subject && !form.subject.value) {
            form.subject.value = "Enquiry: " + service.slice(0, 60);
        }

        var rules = {
            name: function (v) {
                if (!v) return "Please enter your full name.";
                if (v.length < 2) return "Name should be at least 2 characters.";
                return "";
            },
            email: function (v) {
                if (!v) return "Please enter your email address.";
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return "Please enter a valid email address.";
                return "";
            },
            mobile: function (v) {
                if (!v) return "Please enter your mobile number.";
                var digits = v.replace(/[\s()-]/g, "");
                if (!/^(\+?91)?[6-9]\d{9}$/.test(digits) && !/^\+?\d{10,15}$/.test(digits)) {
                    return "Please enter a valid mobile number (e.g. 90306 28100).";
                }
                return "";
            },
            subject: function (v) {
                if (!v) return "Please enter a subject.";
                return "";
            },
            message: function (v) {
                if (!v) return "Please write your message.";
                if (v.length < 10) return "Please add a little more detail (at least 10 characters).";
                return "";
            }
        };

        function validateField(input) {
            var rule = rules[input.name];
            if (!rule) return true;
            var error = rule(input.value.trim());
            var field = input.closest(".field");
            var errorEl = field.querySelector(".field-error");
            field.classList.toggle("has-error", !!error);
            input.setAttribute("aria-invalid", error ? "true" : "false");
            if (errorEl) errorEl.textContent = error;
            return !error;
        }

        Object.keys(rules).forEach(function (name) {
            var input = form.elements[name];
            if (!input) return;
            input.addEventListener("blur", function () {
                if (input.value.trim()) validateField(input);
            });
            input.addEventListener("input", function () {
                if (input.closest(".field").classList.contains("has-error")) validateField(input);
            });
        });

        function showStatus(type, html) {
            status.className = "form-status is-visible " + (type === "success" ? "is-success" : "is-error");
            status.innerHTML = html;
            renderIcons(status);
        }

        form.addEventListener("submit", function (e) {
            e.preventDefault();
            var firstInvalid = null;

            Object.keys(rules).forEach(function (name) {
                var input = form.elements[name];
                if (input && !validateField(input) && !firstInvalid) firstInvalid = input;
            });

            if (firstInvalid) {
                showStatus("error", '<span data-icon="alert"></span><div>Please correct the highlighted fields and try again.</div>');
                firstInvalid.focus();
                return;
            }

            var v = function (n) { return form.elements[n].value.trim(); };
            var body = "Name: " + v("name") + "\nEmail: " + v("email") + "\nMobile: " + v("mobile") + "\n\n" + v("message");
            var mailto = "mailto:" + EMAIL + "?subject=" + encodeURIComponent(v("subject")) + "&body=" + encodeURIComponent(body);

            // No backend is connected: the enquiry is prepared and handed to the visitor's email app.
            showStatus("success",
                '<span data-icon="check-circle"></span><div><strong>Thank you! Your enquiry has been prepared successfully.</strong><br>' +
                "Our team will contact you shortly once it reaches us. To send it now, open it in your email app, or call us on " +
                '<a href="tel:+919030628100">+91 9030628100</a>.<br>' +
                '<a href="' + mailto + '">Send via email app <span data-icon="arrow-right"></span></a></div>');
            status.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "nearest" });
        });

        form.addEventListener("reset", function () {
            form.querySelectorAll(".field").forEach(function (f) { f.classList.remove("has-error"); });
            status.className = "form-status";
        });
    }

    /* ---------- 9. Counters ---------- */
    function animateCounter(el) {
        var target = parseInt(el.getAttribute("data-count"), 10);
        var suffix = el.getAttribute("data-suffix") || "";
        if (isNaN(target)) return;
        if (prefersReducedMotion) {
            el.textContent = target + suffix;
            return;
        }
        var duration = 1400;
        var start = null;
        function step(ts) {
            if (!start) start = ts;
            var p = Math.min((ts - start) / duration, 1);
            var eased = 1 - Math.pow(1 - p, 3);
            el.textContent = Math.round(target * eased) + suffix;
            if (p < 1) window.requestAnimationFrame(step);
        }
        window.requestAnimationFrame(step);
    }

    /* ---------- 10. Scroll reveal + counters on view ---------- */
    function initObservers() {
        var revealEls = document.querySelectorAll("[data-reveal]");
        var counters = document.querySelectorAll("[data-count]");

        if (!("IntersectionObserver" in window)) {
            revealEls.forEach(function (el) { el.classList.add("is-visible"); });
            return;
        }

        var revealObserver = new IntersectionObserver(function (entries, obs) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
        revealEls.forEach(function (el) { revealObserver.observe(el); });

        var counterObserver = new IntersectionObserver(function (entries, obs) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.6 });
        counters.forEach(function (el) { counterObserver.observe(el); });
    }

    /* ---------- 11. Footer year ---------- */
    function initYear() {
        document.querySelectorAll("[data-year]").forEach(function (el) {
            el.textContent = new Date().getFullYear();
        });
    }

    document.addEventListener("DOMContentLoaded", function () {
        renderIcons();
        initHeader();
        initActiveNav();
        initMobileNav();
        initHeroSlider();
        initGalleryFilter();
        initLightbox();
        initGalleryVideos();
        initContactForm();
        initObservers();
        initYear();
    });
})();
