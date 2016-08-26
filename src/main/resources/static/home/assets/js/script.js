+ function(t) {
    "use strict";

    function n() {
        t(i).remove(), t(o).each(function(n) {
            var i = e(t(this));
            i.hasClass("open") && (i.trigger(n = t.Event("hide.bs.dropdown")), n.isDefaultPrevented() || i.removeClass("open").trigger("hidden.bs.dropdown"))
        })
    }

    function e(n) {
        var e = n.attr("data-target");
        e || (e = n.attr("href"), e = e && /#/.test(e) && e.replace(/.*(?=#[^\s]*$)/, ""));
        var i = e && t(e);
        return i && i.length ? i : n.parent()
    }
    var i = ".dropdown-backdrop",
        o = "[data-toggle=dropdown]",
        a = function(n) {
            t(n).on("click.bs.dropdown", this.toggle)
        };
    a.prototype.toggle = function(i) {
        var o = t(this);
        if (!o.is(".disabled, :disabled")) {
            var a = e(o),
                s = a.hasClass("open");
            if (n(), !s) {
                if ("ontouchstart" in document.documentElement && !a.closest(".navbar-nav").length && t('<div class="dropdown-backdrop"/>').insertAfter(t(this)).on("click", n), a.trigger(i = t.Event("show.bs.dropdown")), i.isDefaultPrevented()) return;
                a.toggleClass("open").trigger("shown.bs.dropdown"), o.focus()
            }
            return !1
        }
    }, a.prototype.keydown = function(n) {
        if (/(38|40|27)/.test(n.keyCode)) {
            var i = t(this);
            if (n.preventDefault(), n.stopPropagation(), !i.is(".disabled, :disabled")) {
                var a = e(i),
                    s = a.hasClass("open");
                if (!s || s && 27 == n.keyCode) return 27 == n.which && a.find(o).focus(), i.click();
                var r = t("[role=menu] li:not(.divider):visible a", a);
                if (r.length) {
                    var l = r.index(r.filter(":focus"));
                    38 == n.keyCode && l > 0 && l--, 40 == n.keyCode && l < r.length - 1 && l++, ~l || (l = 0), r.eq(l).focus()
                }
            }
        }
    };
    var s = t.fn.dropdown;
    t.fn.dropdown = function(n) {
        return this.each(function() {
            var e = t(this),
                i = e.data("bs.dropdown");
            i || e.data("bs.dropdown", i = new a(this)), "string" == typeof n && i[n].call(e)
        })
    }, t.fn.dropdown.Constructor = a, t.fn.dropdown.noConflict = function() {
        return t.fn.dropdown = s, this
    }, t(document).on("click.bs.dropdown.data-api", n).on("click.bs.dropdown.data-api", ".dropdown form", function(t) {
        t.stopPropagation()
    }).on("click.bs.dropdown.data-api", o, a.prototype.toggle).on("keydown.bs.dropdown.data-api", o + ", [role=menu]", a.prototype.keydown)
}(jQuery), + function(t) {
    "use strict";
    var n = function(n) {
        this.element = t(n)
    };
    n.prototype.show = function() {
        var n = this.element,
            e = n.closest("ul:not(.dropdown-menu)"),
            i = n.data("target");
        if (i || (i = n.attr("href"), i = i && i.replace(/.*(?=#[^\s]*$)/, "")), !n.parent("li").hasClass("active")) {
            var o = e.find(".active:last a")[0],
                a = t.Event("show.bs.tab", {
                    relatedTarget: o
                });
            if (n.trigger(a), !a.isDefaultPrevented()) {
                var s = t(i);
                this.activate(n.parent("li"), e), this.activate(s, s.parent(), function() {
                    n.trigger({
                        type: "shown.bs.tab",
                        relatedTarget: o
                    })
                })
            }
        }
    }, n.prototype.activate = function(n, e, i) {
        function o() {
            a.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"), n.addClass("active"), s ? (n[0].offsetWidth, n.addClass("in")) : n.removeClass("fade"), n.parent(".dropdown-menu") && n.closest("li.dropdown").addClass("active"), i && i()
        }
        var a = e.find("> .active"),
            s = i && t.support.transition && a.hasClass("fade");
        s ? a.one(t.support.transition.end, o).emulateTransitionEnd(150) : o(), a.removeClass("in")
    };
    var e = t.fn.tab;
    t.fn.tab = function(e) {
        return this.each(function() {
            var i = t(this),
                o = i.data("bs.tab");
            o || i.data("bs.tab", o = new n(this)), "string" == typeof e && o[e]()
        })
    }, t.fn.tab.Constructor = n, t.fn.tab.noConflict = function() {
        return t.fn.tab = e, this
    }, t(document).on("click.bs.tab.data-api", '[data-toggle="tab"], [data-toggle="pill"]', function(n) {
        n.preventDefault(), t(this).tab("show")
    })
}(jQuery), + function(t) {
    "use strict";
    var n = function(e, i) {
        this.$element = t(e), this.options = t.extend({}, n.DEFAULTS, i), this.transitioning = null, this.options.parent && (this.$parent = t(this.options.parent)), this.options.toggle && this.toggle()
    };
    n.DEFAULTS = {
        toggle: !0
    }, n.prototype.dimension = function() {
        var t = this.$element.hasClass("width");
        return t ? "width" : "height"
    }, n.prototype.show = function() {
        if (!this.transitioning && !this.$element.hasClass("in")) {
            var n = t.Event("show.bs.collapse");
            if (this.$element.trigger(n), !n.isDefaultPrevented()) {
                var e = this.$parent && this.$parent.find("> .panel > .in");
                if (e && e.length) {
                    var i = e.data("bs.collapse");
                    if (i && i.transitioning) return;
                    e.collapse("hide"), i || e.data("bs.collapse", null)
                }
                var o = this.dimension();
                this.$element.removeClass("collapse").addClass("collapsing")[o](0), this.transitioning = 1;
                var a = function() {
                    this.$element.removeClass("collapsing").addClass("in")[o]("auto"), this.transitioning = 0, this.$element.trigger("shown.bs.collapse")
                };
                if (!t.support.transition) return a.call(this);
                var s = t.camelCase(["scroll", o].join("-"));
                this.$element.one(t.support.transition.end, t.proxy(a, this)).emulateTransitionEnd(350)[o](this.$element[0][s])
            }
        }
    }, n.prototype.hide = function() {
        if (!this.transitioning && this.$element.hasClass("in")) {
            var n = t.Event("hide.bs.collapse");
            if (this.$element.trigger(n), !n.isDefaultPrevented()) {
                var e = this.dimension();
                this.$element[e](this.$element[e]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse").removeClass("in"), this.transitioning = 1;
                var i = function() {
                    this.transitioning = 0, this.$element.trigger("hidden.bs.collapse").removeClass("collapsing").addClass("collapse")
                };
                return t.support.transition ? (this.$element[e](0).one(t.support.transition.end, t.proxy(i, this)).emulateTransitionEnd(350), void 0) : i.call(this)
            }
        }
    }, n.prototype.toggle = function() {
        this[this.$element.hasClass("in") ? "hide" : "show"]()
    };
    var e = t.fn.collapse;
    t.fn.collapse = function(e) {
        return this.each(function() {
            var i = t(this),
                o = i.data("bs.collapse"),
                a = t.extend({}, n.DEFAULTS, i.data(), "object" == typeof e && e);
            o || i.data("bs.collapse", o = new n(this, a)), "string" == typeof e && o[e]()
        })
    }, t.fn.collapse.Constructor = n, t.fn.collapse.noConflict = function() {
        return t.fn.collapse = e, this
    }, t(document).on("click.bs.collapse.data-api", "[data-toggle=collapse]", function(n) {
        var e, i = t(this),
            o = i.attr("data-target") || n.preventDefault() || (e = i.attr("href")) && e.replace(/.*(?=#[^\s]+$)/, ""),
            a = t(o),
            s = a.data("bs.collapse"),
            r = s ? "toggle" : i.data(),
            l = i.attr("data-parent"),
            d = l && t(l);
        s && s.transitioning || (d && d.find('[data-toggle=collapse][data-parent="' + l + '"]').not(i).addClass("collapsed"), i[a.hasClass("in") ? "addClass" : "removeClass"]("collapsed")), a.collapse(r)
    })
}(jQuery), + function(t) {
    "use strict";

    function n() {
        var t = document.createElement("bootstrap"),
            n = {
                WebkitTransition: "webkitTransitionEnd",
                MozTransition: "transitionend",
                OTransition: "oTransitionEnd otransitionend",
                transition: "transitionend"
            };
        for (var e in n)
            if (void 0 !== t.style[e]) return {
                end: n[e]
            }
    }
    t.fn.emulateTransitionEnd = function(n) {
        var e = !1,
            i = this;
        t(this).one(t.support.transition.end, function() {
            e = !0
        });
        var o = function() {
            e || t(i).trigger(t.support.transition.end)
        };
        return setTimeout(o, n), this
    }, t(function() {
        t.support.transition = n()
    })
}(jQuery); + function(t) {
    "use strict";
    var e = function(e, i) {
        this.$element = t(e), this.$indicators = this.$element.find(".carousel-indicators"), this.options = i, this.paused = this.sliding = this.interval = this.$active = this.$items = null, "hover" == this.options.pause && this.$element.on("mouseenter", t.proxy(this.pause, this)).on("mouseleave", t.proxy(this.cycle, this))
    };
    e.DEFAULTS = {
        interval: 5e3,
        pause: "hover",
        wrap: !0
    }, e.prototype.cycle = function(e) {
        return e || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(t.proxy(this.next, this), this.options.interval)), this
    }, e.prototype.getActiveIndex = function() {
        return this.$active = this.$element.find(".item.active"), this.$items = this.$active.parent().children(), this.$items.index(this.$active)
    }, e.prototype.to = function(e) {
        var i = this,
            s = this.getActiveIndex();
        return e > this.$items.length - 1 || 0 > e ? void 0 : this.sliding ? this.$element.one("slid", function() {
            i.to(e)
        }) : s == e ? this.pause().cycle() : this.slide(e > s ? "next" : "prev", t(this.$items[e]))
    }, e.prototype.pause = function(e) {
        return e || (this.paused = !0), this.$element.find(".next, .prev").length && t.support.transition.end && (this.$element.trigger(t.support.transition.end), this.cycle(!0)), this.interval = clearInterval(this.interval), this
    }, e.prototype.next = function() {
        return this.sliding ? void 0 : this.slide("next")
    }, e.prototype.prev = function() {
        return this.sliding ? void 0 : this.slide("prev")
    }, e.prototype.slide = function(e, i) {
        var s = this.$element.find(".item.active"),
            n = i || s[e](),
            a = this.interval,
            r = "next" == e ? "left" : "right",
            l = "next" == e ? "first" : "last",
            o = this;
        if (!n.length) {
            if (!this.options.wrap) return;
            n = this.$element.find(".item")[l]()
        }
        this.sliding = !0, a && this.pause();
        var d = t.Event("slide.bs.carousel", {
            relatedTarget: n[0],
            direction: r
        });
        if (!n.hasClass("active")) {
            if (this.$indicators.length && (this.$indicators.find(".active").removeClass("active"), this.$element.one("slid", function() {
                    var e = t(o.$indicators.children()[o.getActiveIndex()]);
                    e && e.addClass("active")
                })), t.support.transition && this.$element.hasClass("slide")) {
                if (this.$element.trigger(d), d.isDefaultPrevented()) return;
                n.addClass(e), n[0].offsetWidth, s.addClass(r), n.addClass(r), s.one(t.support.transition.end, function() {
                    n.removeClass([e, r].join(" ")).addClass("active"), s.removeClass(["active", r].join(" ")), o.sliding = !1, setTimeout(function() {
                        o.$element.trigger("slid")
                    }, 0)
                }).emulateTransitionEnd(600)
            } else if (this.$element.hasClass("slide")) {
                if (this.$element.trigger(d), d.isDefaultPrevented()) return;
                s.animate({
                    left: "right" == r ? "100%" : "-100%"
                }, 600, function() {
                    s.removeClass("active"), o.sliding = !1, setTimeout(function() {
                        o.$element.trigger("slid")
                    }, 0)
                }), n.addClass(e).css({
                    left: "right" == r ? "-100%" : "100%"
                }).animate({
                    left: 0
                }, 600, function() {
                    n.removeClass(e).addClass("active")
                })
            } else {
                if (this.$element.trigger(d), d.isDefaultPrevented()) return;
                s.removeClass("active"), n.addClass("active"), this.sliding = !1, this.$element.trigger("slid")
            }
            return a && this.cycle(), this
        }
    };
    var i = t.fn.carousel;
    t.fn.carousel = function(i) {
        return this.each(function() {
            var s = t(this),
                n = s.data("bs.carousel"),
                a = t.extend({}, e.DEFAULTS, s.data(), "object" == typeof i && i),
                r = "string" == typeof i ? i : a.slide;
            n || s.data("bs.carousel", n = new e(this, a)), "number" == typeof i ? n.to(i) : r ? n[r]() : a.interval && n.pause().cycle()
        })
    }, t.fn.carousel.Constructor = e, t.fn.carousel.noConflict = function() {
        return t.fn.carousel = i, this
    }, t(document).on("click.bs.carousel.data-api", "[data-slide], [data-slide-to]", function(e) {
        var i, s = t(this),
            n = t(s.attr("data-target") || (i = s.attr("href")) && i.replace(/.*(?=#[^\s]+$)/, "")),
            a = t.extend({}, n.data(), s.data()),
            r = s.attr("data-slide-to");
        r && (a.interval = !1), n.carousel(a), (r = s.attr("data-slide-to")) && n.data("bs.carousel").to(r), e.preventDefault()
    }), t(window).on("load", function() {
        t('[data-ride="carousel"]').each(function() {
            var e = t(this);
            e.carousel(e.data())
        })
    })
}(window.jQuery);
window.Modernizr = function(e, t, n) {
    function r(e) {
        v.cssText = e
    }

    function o(e, t) {
        return typeof e === t
    }

    function i(e, t) {
        return !!~("" + e).indexOf(t)
    }

    function a(e, t) {
        for (var r in e) {
            var o = e[r];
            if (!i(o, "-") && v[o] !== n) return "pfx" == t ? o : !0
        }
        return !1
    }

    function c(e, t, r) {
        for (var i in e) {
            var a = t[e[i]];
            if (a !== n) return r === !1 ? e[i] : o(a, "function") ? a.bind(r || t) : a
        }
        return !1
    }

    function s(e, t, n) {
        var r = e.charAt(0).toUpperCase() + e.slice(1),
            i = (e + " " + E.join(r + " ") + r).split(" ");
        return o(t, "string") || o(t, "undefined") ? a(i, t) : (i = (e + " " + j.join(r + " ") + r).split(" "), c(i, t, n))
    }
    var l, u, f, p = "2.6.2",
        d = {}, h = !0,
        m = t.documentElement,
        y = "modernizr",
        g = t.createElement(y),
        v = g.style,
        b = ({}.toString, "Webkit Moz O ms"),
        E = b.split(" "),
        j = b.toLowerCase().split(" "),
        S = {}, C = [],
        w = C.slice,
        x = {}.hasOwnProperty;
    f = o(x, "undefined") || o(x.call, "undefined") ? function(e, t) {
        return t in e && o(e.constructor.prototype[t], "undefined")
    } : function(e, t) {
        return x.call(e, t)
    }, Function.prototype.bind || (Function.prototype.bind = function(e) {
        var t = this;
        if ("function" != typeof t) throw new TypeError;
        var n = w.call(arguments, 1),
            r = function() {
                if (this instanceof r) {
                    var o = function() {};
                    o.prototype = t.prototype;
                    var i = new o,
                        a = t.apply(i, n.concat(w.call(arguments)));
                    return Object(a) === a ? a : i
                }
                return t.apply(e, n.concat(w.call(arguments)))
            };
        return r
    }), S.csstransitions = function() {
        return s("transition")
    };
    for (var F in S) f(S, F) && (u = F.toLowerCase(), d[u] = S[F](), C.push((d[u] ? "" : "no-") + u));
    return d.addTest = function(e, t) {
        if ("object" == typeof e)
            for (var r in e) f(e, r) && d.addTest(r, e[r]);
        else {
            if (e = e.toLowerCase(), d[e] !== n) return d;
            t = "function" == typeof t ? t() : t, "undefined" != typeof h && h && (m.className += " " + (t ? "" : "no-") + e), d[e] = t
        }
        return d
    }, r(""), g = l = null,
        function(e, t) {
            function n(e, t) {
                var n = e.createElement("p"),
                    r = e.getElementsByTagName("head")[0] || e.documentElement;
                return n.innerHTML = "x<style>" + t + "</style>", r.insertBefore(n.lastChild, r.firstChild)
            }

            function r() {
                var e = g.elements;
                return "string" == typeof e ? e.split(" ") : e
            }

            function o(e) {
                var t = y[e[h]];
                return t || (t = {}, m++, e[h] = m, y[m] = t), t
            }

            function i(e, n, r) {
                if (n || (n = t), u) return n.createElement(e);
                r || (r = o(n));
                var i;
                return i = r.cache[e] ? r.cache[e].cloneNode() : d.test(e) ? (r.cache[e] = r.createElem(e)).cloneNode() : r.createElem(e), i.canHaveChildren && !p.test(e) ? r.frag.appendChild(i) : i
            }

            function a(e, n) {
                if (e || (e = t), u) return e.createDocumentFragment();
                n = n || o(e);
                for (var i = n.frag.cloneNode(), a = 0, c = r(), s = c.length; s > a; a++) i.createElement(c[a]);
                return i
            }

            function c(e, t) {
                t.cache || (t.cache = {}, t.createElem = e.createElement, t.createFrag = e.createDocumentFragment, t.frag = t.createFrag()), e.createElement = function(n) {
                    return g.shivMethods ? i(n, e, t) : t.createElem(n)
                }, e.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + r().join().replace(/\w+/g, function(e) {
                        return t.createElem(e), t.frag.createElement(e), 'c("' + e + '")'
                    }) + ");return n}")(g, t.frag)
            }

            function s(e) {
                e || (e = t);
                var r = o(e);
                return g.shivCSS && !l && !r.hasCSS && (r.hasCSS = !! n(e, "article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}mark{background:#FF0;color:#000}")), u || c(e, r), e
            }
            var l, u, f = e.html5 || {}, p = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,
                d = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,
                h = "_html5shiv",
                m = 0,
                y = {};
            ! function() {
                try {
                    var e = t.createElement("a");
                    e.innerHTML = "<xyz></xyz>", l = "hidden" in e, u = 1 == e.childNodes.length || function() {
                            t.createElement("a");
                            var e = t.createDocumentFragment();
                            return "undefined" == typeof e.cloneNode || "undefined" == typeof e.createDocumentFragment || "undefined" == typeof e.createElement
                        }()
                } catch (n) {
                    l = !0, u = !0
                }
            }();
            var g = {
                elements: f.elements || "abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",
                shivCSS: f.shivCSS !== !1,
                supportsUnknownElements: u,
                shivMethods: f.shivMethods !== !1,
                type: "default",
                shivDocument: s,
                createElement: i,
                createDocumentFragment: a
            };
            e.html5 = g, s(t)
        }(this, t), d._version = p, d._domPrefixes = j, d._cssomPrefixes = E, d.testProp = function(e) {
        return a([e])
    }, d.testAllProps = s, m.className = m.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + (h ? " js " + C.join(" ") : ""), d
}(this, this.document),
    function(e, t, n) {
        function r(e) {
            return "[object Function]" == y.call(e)
        }

        function o(e) {
            return "string" == typeof e
        }

        function i() {}

        function a(e) {
            return !e || "loaded" == e || "complete" == e || "uninitialized" == e
        }

        function c() {
            var e = g.shift();
            v = 1, e ? e.t ? h(function() {
                ("c" == e.t ? p.injectCss : p.injectJs)(e.s, 0, e.a, e.x, e.e, 1)
            }, 0) : (e(), c()) : v = 0
        }

        function s(e, n, r, o, i, s, l) {
            function u(t) {
                if (!d && a(f.readyState) && (b.r = d = 1, !v && c(), f.onload = f.onreadystatechange = null, t)) {
                    "img" != e && h(function() {
                        j.removeChild(f)
                    }, 50);
                    for (var r in F[n]) F[n].hasOwnProperty(r) && F[n][r].onload()
                }
            }
            var l = l || p.errorTimeout,
                f = t.createElement(e),
                d = 0,
                y = 0,
                b = {
                    t: r,
                    s: n,
                    e: i,
                    a: s,
                    x: l
                };
            1 === F[n] && (y = 1, F[n] = []), "object" == e ? f.data = n : (f.src = n, f.type = e), f.width = f.height = "0", f.onerror = f.onload = f.onreadystatechange = function() {
                u.call(this, y)
            }, g.splice(o, 0, b), "img" != e && (y || 2 === F[n] ? (j.insertBefore(f, E ? null : m), h(u, l)) : F[n].push(f))
        }

        function l(e, t, n, r, i) {
            return v = 0, t = t || "j", o(e) ? s("c" == t ? C : S, e, t, this.i++, n, r, i) : (g.splice(this.i++, 0, e), 1 == g.length && c()), this
        }

        function u() {
            var e = p;
            return e.loader = {
                load: l,
                i: 0
            }, e
        }
        var f, p, d = t.documentElement,
            h = e.setTimeout,
            m = t.getElementsByTagName("script")[0],
            y = {}.toString,
            g = [],
            v = 0,
            b = "MozAppearance" in d.style,
            E = b && !! t.createRange().compareNode,
            j = E ? d : m.parentNode,
            d = e.opera && "[object Opera]" == y.call(e.opera),
            d = !! t.attachEvent && !d,
            S = b ? "object" : d ? "script" : "img",
            C = d ? "script" : S,
            w = Array.isArray || function(e) {
                    return "[object Array]" == y.call(e)
                }, x = [],
            F = {}, N = {
                timeout: function(e, t) {
                    return t.length && (e.timeout = t[0]), e
                }
            };
        p = function(e) {
            function t(e) {
                var t, n, r, e = e.split("!"),
                    o = x.length,
                    i = e.pop(),
                    a = e.length,
                    i = {
                        url: i,
                        origUrl: i,
                        prefixes: e
                    };
                for (n = 0; a > n; n++) r = e[n].split("="), (t = N[r.shift()]) && (i = t(i, r));
                for (n = 0; o > n; n++) i = x[n](i);
                return i
            }

            function a(e, o, i, a, c) {
                var s = t(e),
                    l = s.autoCallback;
                s.url.split(".").pop().split("?").shift(), s.bypass || (o && (o = r(o) ? o : o[e] || o[a] || o[e.split("/").pop().split("?")[0]]), s.instead ? s.instead(e, o, i, a, c) : (F[s.url] ? s.noexec = !0 : F[s.url] = 1, i.load(s.url, s.forceCSS || !s.forceJS && "css" == s.url.split(".").pop().split("?").shift() ? "c" : n, s.noexec, s.attrs, s.timeout), (r(o) || r(l)) && i.load(function() {
                    u(), o && o(s.origUrl, c, a), l && l(s.origUrl, c, a), F[s.url] = 2
                })))
            }

            function c(e, t) {
                function n(e, n) {
                    if (e) {
                        if (o(e)) n || (f = function() {
                            var e = [].slice.call(arguments);
                            p.apply(this, e), d()
                        }), a(e, f, t, 0, l);
                        else if (Object(e) === e)
                            for (s in c = function() {
                                var t, n = 0;
                                for (t in e) e.hasOwnProperty(t) && n++;
                                return n
                            }(), e) e.hasOwnProperty(s) && (!n && !--c && (r(f) ? f = function() {
                                var e = [].slice.call(arguments);
                                p.apply(this, e), d()
                            } : f[s] = function(e) {
                                return function() {
                                    var t = [].slice.call(arguments);
                                    e && e.apply(this, t), d()
                                }
                            }(p[s])), a(e[s], f, t, s, l))
                    } else !n && d()
                }
                var c, s, l = !! e.test,
                    u = e.load || e.both,
                    f = e.callback || i,
                    p = f,
                    d = e.complete || i;
                n(l ? e.yep : e.nope, !! u), u && n(u)
            }
            var s, l, f = this.yepnope.loader;
            if (o(e)) a(e, 0, f, 0);
            else if (w(e))
                for (s = 0; s < e.length; s++) l = e[s], o(l) ? a(l, 0, f, 0) : w(l) ? p(l) : Object(l) === l && c(l, f);
            else Object(e) === e && c(e, f)
        }, p.addPrefix = function(e, t) {
            N[e] = t
        }, p.addFilter = function(e) {
            x.push(e)
        }, p.errorTimeout = 1e4, null == t.readyState && t.addEventListener && (t.readyState = "loading", t.addEventListener("DOMContentLoaded", f = function() {
            t.removeEventListener("DOMContentLoaded", f, 0), t.readyState = "complete"
        }, 0)), e.yepnope = u(), e.yepnope.executeStack = c, e.yepnope.injectJs = function(e, n, r, o, s, l) {
            var u, f, d = t.createElement("script"),
                o = o || p.errorTimeout;
            d.src = e;
            for (f in r) d.setAttribute(f, r[f]);
            n = l ? c : n || i, d.onreadystatechange = d.onload = function() {
                !u && a(d.readyState) && (u = 1, n(), d.onload = d.onreadystatechange = null)
            }, h(function() {
                u || (u = 1, n(1))
            }, o), s ? d.onload() : m.parentNode.insertBefore(d, m)
        }, e.yepnope.injectCss = function(e, n, r, o, a, s) {
            var l, o = t.createElement("link"),
                n = s ? c : n || i;
            o.href = e, o.rel = "stylesheet", o.type = "text/css";
            for (l in r) o.setAttribute(l, r[l]);
            a || (m.parentNode.insertBefore(o, m), h(n, 0))
        }
    }(this, document), Modernizr.load = function() {
    yepnope.apply(window, [].slice.call(arguments, 0))
};
! function(t, e) {
    "use strict";
    t.HoverDir = function(e, o) {
        this.$el = t(o), this._init(e)
    }, t.HoverDir.defaults = {
        speed: 300,
        easing: "ease",
        hoverDelay: 0,
        inverse: !1,
        hoverElem: "div"
    }, t.HoverDir.prototype = {
        _init: function(e) {
            this.options = t.extend(!0, {}, t.HoverDir.defaults, e), this.transitionProp = "all " + this.options.speed + "ms " + this.options.easing, this.support = Modernizr.csstransitions, this._loadEvents()
        },
        _loadEvents: function() {
            var e = this;
            this.$el.on("mouseenter.hoverdir, mouseleave.hoverdir", function(o) {
                var i = t(this),
                    n = i.find(e.options.hoverElem),
                    s = e._getDir(i, {
                        x: o.pageX,
                        y: o.pageY
                    }),
                    r = e._getStyle(s);
                "mouseenter" === o.type ? (n.hide().css(r.from), clearTimeout(e.tmhover), e.tmhover = setTimeout(function() {
                    n.show(0, function() {
                        var o = t(this);
                        e.support && o.css("transition", e.transitionProp), e._applyAnimation(o, r.to, e.options.speed)
                    })
                }, e.options.hoverDelay)) : (e.support && n.css("transition", e.transitionProp), clearTimeout(e.tmhover), e._applyAnimation(n, r.from, e.options.speed))
            })
        },
        _getDir: function(t, e) {
            var o = t.width(),
                i = t.height(),
                n = (e.x - t.offset().left - o / 2) * (o > i ? i / o : 1),
                s = (e.y - t.offset().top - i / 2) * (i > o ? o / i : 1),
                r = Math.round((Math.atan2(s, n) * (180 / Math.PI) + 180) / 90 + 3) % 4;
            return r
        },
        _getStyle: function(t) {
            var e, o, i = {
                left: "0px",
                top: "-100%"
            }, n = {
                left: "0px",
                top: "100%"
            }, s = {
                left: "-100%",
                top: "0px"
            }, r = {
                left: "100%",
                top: "0px"
            }, a = {
                top: "0px"
            }, p = {
                left: "0px"
            };
            switch (t) {
                case 0:
                    e = this.options.inverse ? n : i, o = a;
                    break;
                case 1:
                    e = this.options.inverse ? s : r, o = p;
                    break;
                case 2:
                    e = this.options.inverse ? i : n, o = a;
                    break;
                case 3:
                    e = this.options.inverse ? r : s, o = p
            }
            return {
                from: e,
                to: o
            }
        },
        _applyAnimation: function(e, o, i) {
            t.fn.applyStyle = this.support ? t.fn.css : t.fn.animate, e.stop().applyStyle(o, t.extend(!0, [], {
                duration: i + "ms"
            }))
        }
    };
    var o = function(t) {
        e.console && e.console.error(t)
    };
    t.fn.hoverdir = function(e) {
        var i = t.data(this, "hoverdir");
        if ("string" == typeof e) {
            var n = Array.prototype.slice.call(arguments, 1);
            this.each(function() {
                return i ? t.isFunction(i[e]) && "_" !== e.charAt(0) ? (i[e].apply(i, n), void 0) : (o("no such method '" + e + "' for hoverdir instance"), void 0) : (o("cannot call methods on hoverdir prior to initialization; attempted to call method '" + e + "'"), void 0)
            })
        } else this.each(function() {
            i ? i._init() : i = t.data(this, "hoverdir", new t.HoverDir(e, this))
        });
        return i
    }
}(jQuery, window);
! function(e, a, t) {
    function l(e) {
        var a = {}, l = /^jQuery\d+$/;
        return t.each(e.attributes, function(e, t) {
            t.specified && !l.test(t.name) && (a[t.name] = t.value)
        }), a
    }

    function r(e, a) {
        var l = this,
            r = t(l);
        if (l.value == r.attr("placeholder") && r.hasClass("placeholder"))
            if (r.data("placeholder-password")) {
                if (r = r.hide().next().show().attr("id", r.removeAttr("id").data("placeholder-id")), e === !0) return r[0].value = a;
                r.focus()
            } else l.value = "", r.removeClass("placeholder"), l == d() && l.select()
    }

    function o() {
        var e, a = this,
            o = t(a),
            d = this.id;
        if ("" == a.value) {
            if ("password" == a.type) {
                if (!o.data("placeholder-textinput")) {
                    try {
                        e = o.clone().attr({
                            type: "text"
                        })
                    } catch (c) {
                        e = t("<input>").attr(t.extend(l(this), {
                            type: "text"
                        }))
                    }
                    e.removeAttr("name").data({
                        "placeholder-password": o,
                        "placeholder-id": d
                    }).bind("focus.placeholder", r), o.data({
                        "placeholder-textinput": e,
                        "placeholder-id": d
                    }).before(e)
                }
                o = o.removeAttr("id").hide().prev().attr("id", d).show()
            }
            o.addClass("placeholder"), o[0].value = o.attr("placeholder")
        } else o.removeClass("placeholder")
    }

    function d() {
        try {
            return a.activeElement
        } catch (e) {}
    }
    var c, n, i = "placeholder" in a.createElement("input"),
        u = "placeholder" in a.createElement("textarea"),
        h = t.fn,
        p = t.valHooks,
        s = t.propHooks;
    i && u ? (n = h.placeholder = function() {
        return this
    }, n.input = n.textarea = !0) : (n = h.placeholder = function() {
        var e = this;
        return e.filter((i ? "textarea" : ":input") + "[placeholder]").not(".placeholder").bind({
            "focus.placeholder": r,
            "blur.placeholder": o
        }).data("placeholder-enabled", !0).trigger("blur.placeholder"), e
    }, n.input = i, n.textarea = u, c = {
        get: function(e) {
            var a = t(e),
                l = a.data("placeholder-password");
            return l ? l[0].value : a.data("placeholder-enabled") && a.hasClass("placeholder") ? "" : e.value
        },
        set: function(e, a) {
            var l = t(e),
                c = l.data("placeholder-password");
            return c ? c[0].value = a : l.data("placeholder-enabled") ? ("" == a ? (e.value = a, e != d() && o.call(e)) : l.hasClass("placeholder") ? r.call(e, !0, a) || (e.value = a) : e.value = a, l) : e.value = a
        }
    }, i || (p.input = c, s.value = c), u || (p.textarea = c, s.value = c), t(function() {
        t(a).delegate("form", "submit.placeholder", function() {
            var e = t(".placeholder", this).each(r);
            setTimeout(function() {
                e.each(o)
            }, 10)
        })
    }), t(e).bind("beforeunload.placeholder", function() {
        t(".placeholder").each(function() {
            this.value = ""
        })
    }))
}(this, document, jQuery);
(function() {
    function e() {}

    function t(e, t) {
        for (var n = e.length; n--;)
            if (e[n].listener === t) return n;
        return -1
    }

    function n(e) {
        return function() {
            return this[e].apply(this, arguments)
        }
    }
    var i = e.prototype,
        r = this,
        o = r.EventEmitter;
    i.getListeners = function(e) {
        var t, n, i = this._getEvents();
        if ("object" == typeof e) {
            t = {};
            for (n in i) i.hasOwnProperty(n) && e.test(n) && (t[n] = i[n])
        } else t = i[e] || (i[e] = []);
        return t
    }, i.flattenListeners = function(e) {
        var t, n = [];
        for (t = 0; t < e.length; t += 1) n.push(e[t].listener);
        return n
    }, i.getListenersAsObject = function(e) {
        var t, n = this.getListeners(e);
        return n instanceof Array && (t = {}, t[e] = n), t || n
    }, i.addListener = function(e, n) {
        var i, r = this.getListenersAsObject(e),
            o = "object" == typeof n;
        for (i in r) r.hasOwnProperty(i) && -1 === t(r[i], n) && r[i].push(o ? n : {
            listener: n,
            once: !1
        });
        return this
    }, i.on = n("addListener"), i.addOnceListener = function(e, t) {
        return this.addListener(e, {
            listener: t,
            once: !0
        })
    }, i.once = n("addOnceListener"), i.defineEvent = function(e) {
        return this.getListeners(e), this
    }, i.defineEvents = function(e) {
        for (var t = 0; t < e.length; t += 1) this.defineEvent(e[t]);
        return this
    }, i.removeListener = function(e, n) {
        var i, r, o = this.getListenersAsObject(e);
        for (r in o) o.hasOwnProperty(r) && (i = t(o[r], n), -1 !== i && o[r].splice(i, 1));
        return this
    }, i.off = n("removeListener"), i.addListeners = function(e, t) {
        return this.manipulateListeners(!1, e, t)
    }, i.removeListeners = function(e, t) {
        return this.manipulateListeners(!0, e, t)
    }, i.manipulateListeners = function(e, t, n) {
        var i, r, o = e ? this.removeListener : this.addListener,
            s = e ? this.removeListeners : this.addListeners;
        if ("object" != typeof t || t instanceof RegExp)
            for (i = n.length; i--;) o.call(this, t, n[i]);
        else
            for (i in t) t.hasOwnProperty(i) && (r = t[i]) && ("function" == typeof r ? o.call(this, i, r) : s.call(this, i, r));
        return this
    }, i.removeEvent = function(e) {
        var t, n = typeof e,
            i = this._getEvents();
        if ("string" === n) delete i[e];
        else if ("object" === n)
            for (t in i) i.hasOwnProperty(t) && e.test(t) && delete i[t];
        else delete this._events;
        return this
    }, i.removeAllListeners = n("removeEvent"), i.emitEvent = function(e, t) {
        var n, i, r, o, s = this.getListenersAsObject(e);
        for (r in s)
            if (s.hasOwnProperty(r))
                for (i = s[r].length; i--;) n = s[r][i], n.once === !0 && this.removeListener(e, n.listener), o = n.listener.apply(this, t || []), o === this._getOnceReturnValue() && this.removeListener(e, n.listener);
        return this
    }, i.trigger = n("emitEvent"), i.emit = function(e) {
        var t = Array.prototype.slice.call(arguments, 1);
        return this.emitEvent(e, t)
    }, i.setOnceReturnValue = function(e) {
        return this._onceReturnValue = e, this
    }, i._getOnceReturnValue = function() {
        return this.hasOwnProperty("_onceReturnValue") ? this._onceReturnValue : !0
    }, i._getEvents = function() {
        return this._events || (this._events = {})
    }, e.noConflict = function() {
        return r.EventEmitter = o, e
    }, "function" == typeof define && define.amd ? define("eventEmitter/EventEmitter", [], function() {
        return e
    }) : "object" == typeof module && module.exports ? module.exports = e : this.EventEmitter = e
}).call(this),
    function(e) {
        function t(t) {
            var n = e.event;
            return n.target = n.target || n.srcElement || t, n
        }
        var n = document.documentElement,
            i = function() {};
        n.addEventListener ? i = function(e, t, n) {
            e.addEventListener(t, n, !1)
        } : n.attachEvent && (i = function(e, n, i) {
            e[n + i] = i.handleEvent ? function() {
                var n = t(e);
                i.handleEvent.call(i, n)
            } : function() {
                var n = t(e);
                i.call(e, n)
            }, e.attachEvent("on" + n, e[n + i])
        });
        var r = function() {};
        n.removeEventListener ? r = function(e, t, n) {
            e.removeEventListener(t, n, !1)
        } : n.detachEvent && (r = function(e, t, n) {
            e.detachEvent("on" + t, e[t + n]);
            try {
                delete e[t + n]
            } catch (i) {
                e[t + n] = void 0
            }
        });
        var o = {
            bind: i,
            unbind: r
        };
        "function" == typeof define && define.amd ? define("eventie/eventie", o) : e.eventie = o
    }(this),
    function(e) {
        function t(e, t) {
            for (var n in t) e[n] = t[n];
            return e
        }

        function n(e) {
            return "[object Array]" === f.call(e)
        }

        function i(e) {
            var t = [];
            if (n(e)) t = e;
            else if ("number" == typeof e.length)
                for (var i = 0, r = e.length; r > i; i++) t.push(e[i]);
            else t.push(e);
            return t
        }

        function r(e, n) {
            function r(e, n, s) {
                if (!(this instanceof r)) return new r(e, n);
                "string" == typeof e && (e = document.querySelectorAll(e)), this.elements = i(e), this.options = t({}, this.options), "function" == typeof n ? s = n : t(this.options, n), s && this.on("always", s), this.getImages(), o && (this.jqDeferred = new o.Deferred);
                var c = this;
                setTimeout(function() {
                    c.check()
                })
            }

            function f(e) {
                this.img = e
            }

            function a(e) {
                this.src = e, h[e] = this
            }
            r.prototype = new e, r.prototype.options = {}, r.prototype.getImages = function() {
                this.images = [];
                for (var e = 0, t = this.elements.length; t > e; e++) {
                    var n = this.elements[e];
                    "IMG" === n.nodeName && this.addImage(n);
                    for (var i = n.querySelectorAll("img"), r = 0, o = i.length; o > r; r++) {
                        var s = i[r];
                        this.addImage(s)
                    }
                }
            }, r.prototype.addImage = function(e) {
                var t = new f(e);
                this.images.push(t)
            }, r.prototype.check = function() {
                function e(e, r) {
                    return t.options.debug && c && s.log("confirm", e, r), t.progress(e), n++, n === i && t.complete(), !0
                }
                var t = this,
                    n = 0,
                    i = this.images.length;
                if (this.hasAnyBroken = !1, !i) return this.complete(), void 0;
                for (var r = 0; i > r; r++) {
                    var o = this.images[r];
                    o.on("confirm", e), o.check()
                }
            }, r.prototype.progress = function(e) {
                this.hasAnyBroken = this.hasAnyBroken || !e.isLoaded;
                var t = this;
                setTimeout(function() {
                    t.emit("progress", t, e), t.jqDeferred && t.jqDeferred.notify(t, e)
                })
            }, r.prototype.complete = function() {
                var e = this.hasAnyBroken ? "fail" : "done";
                this.isComplete = !0;
                var t = this;
                setTimeout(function() {
                    if (t.emit(e, t), t.emit("always", t), t.jqDeferred) {
                        var n = t.hasAnyBroken ? "reject" : "resolve";
                        t.jqDeferred[n](t)
                    }
                })
            }, o && (o.fn.imagesLoaded = function(e, t) {
                var n = new r(this, e, t);
                return n.jqDeferred.promise(o(this))
            }), f.prototype = new e, f.prototype.check = function() {
                var e = h[this.img.src] || new a(this.img.src);
                if (e.isConfirmed) return this.confirm(e.isLoaded, "cached was confirmed"), void 0;
                if (this.img.complete && void 0 !== this.img.naturalWidth) return this.confirm(0 !== this.img.naturalWidth, "naturalWidth"), void 0;
                var t = this;
                e.on("confirm", function(e, n) {
                    return t.confirm(e.isLoaded, n), !0
                }), e.check()
            }, f.prototype.confirm = function(e, t) {
                this.isLoaded = e, this.emit("confirm", this, t)
            };
            var h = {};
            return a.prototype = new e, a.prototype.check = function() {
                if (!this.isChecked) {
                    var e = new Image;
                    n.bind(e, "load", this), n.bind(e, "error", this), e.src = this.src, this.isChecked = !0
                }
            }, a.prototype.handleEvent = function(e) {
                var t = "on" + e.type;
                this[t] && this[t](e)
            }, a.prototype.onload = function(e) {
                this.confirm(!0, "onload"), this.unbindProxyEvents(e)
            }, a.prototype.onerror = function(e) {
                this.confirm(!1, "onerror"), this.unbindProxyEvents(e)
            }, a.prototype.confirm = function(e, t) {
                this.isConfirmed = !0, this.isLoaded = e, this.emit("confirm", this, t)
            }, a.prototype.unbindProxyEvents = function(e) {
                n.unbind(e.target, "load", this), n.unbind(e.target, "error", this)
            }, r
        }
        var o = e.jQuery,
            s = e.console,
            c = "undefined" != typeof s,
            f = Object.prototype.toString;
        "function" == typeof define && define.amd ? define(["eventEmitter/EventEmitter", "eventie/eventie"], r) : e.imagesLoaded = r(e.EventEmitter, e.eventie)
    }(window);
! function(i, t, o) {
    function e(t, o) {
        this.el = t, this.$el = i(this.el), this.options = i.extend({}, l, o), this._defaults = l, this._name = n, this.init()
    }
    var n = "nivoLightbox",
        l = {
            effect: "fade",
            theme: "default",
            keyboardNav: !0,
            clickOverlayToClose: !0,
            onInit: function() {},
            beforeShowLightbox: function() {},
            afterShowLightbox: function() {},
            beforeHideLightbox: function() {},
            afterHideLightbox: function() {},
            onPrev: function() {},
            onNext: function() {},
            errorMessage: "The requested content cannot be loaded. Please try again later."
        };
    e.prototype = {
        init: function() {
            var t = this;
            i("html").hasClass("nivo-lightbox-notouch") || i("html").addClass("nivo-lightbox-notouch"), "ontouchstart" in o && i("html").removeClass("nivo-lightbox-notouch"), this.$el.on("click", function(i) {
                i.preventDefault(), t.showLightbox()
            }), this.options.keyboardNav && i("body").off("keyup").on("keyup", function(o) {
                var e = o.keyCode ? o.keyCode : o.which;
                27 == e && t.destructLightbox(), 37 == e && i(".nivo-lightbox-prev").trigger("click"), 39 == e && i(".nivo-lightbox-next").trigger("click")
            }), this.options.onInit.call(this)
        },
        showLightbox: function() {
            var t = this;
            this.options.beforeShowLightbox.call(this);
            var o = this.constructLightbox();
            if (o) {
                var e = o.find(".nivo-lightbox-content");
                if (e) {
                    var n = this.$el;
                    if (i("body").addClass("nivo-lightbox-body-effect-" + this.options.effect), this.processContent(e, n), this.$el.attr("data-lightbox-gallery")) {
                        var t = this,
                            l = i('[data-lightbox-gallery="' + this.$el.attr("data-lightbox-gallery") + '"]');
                        i(".nivo-lightbox-nav").show(), i(".nivo-lightbox-prev").off("click").on("click", function(o) {
                            o.preventDefault();
                            var a = l.index(n);
                            n = l.eq(a - 1), i(n).length || (n = l.last()), t.processContent(e, n), t.options.onPrev.call(this, [n])
                        }), i(".nivo-lightbox-next").off("click").on("click", function(o) {
                            o.preventDefault();
                            var a = l.index(n);
                            n = l.eq(a + 1), i(n).length || (n = l.first()), t.processContent(e, n), t.options.onNext.call(this, [n])
                        })
                    }
                    setTimeout(function() {
                        o.addClass("nivo-lightbox-open"), t.options.afterShowLightbox.call(this, [o])
                    }, 1)
                }
            }
        },
        processContent: function(o, e) {
            var n = this,
                l = e.attr("href");
            if (o.html("").addClass("nivo-lightbox-loading"), this.isHidpi() && e.attr("data-lightbox-hidpi") && (l = e.attr("data-lightbox-hidpi")), null != l.match(/\.(jpeg|jpg|gif|png)$/i)) {
                var a = i("<img>", {
                    src: l
                });
                a.one("load", function() {
                    var e = i('<div class="nivo-lightbox-image" />');
                    e.append(a), o.html(e).removeClass("nivo-lightbox-loading"), e.css({
                        "line-height": i(".nivo-lightbox-content").height() + "px",
                        height: i(".nivo-lightbox-content").height() + "px"
                    }), i(t).resize(function() {
                        e.css({
                            "line-height": i(".nivo-lightbox-content").height() + "px",
                            height: i(".nivo-lightbox-content").height() + "px"
                        })
                    })
                }).each(function() {
                    this.complete && i(this).load()
                }), a.error(function() {
                    var t = i('<div class="nivo-lightbox-error"><p>' + n.options.errorMessage + "</p></div>");
                    o.html(t).removeClass("nivo-lightbox-loading")
                })
            } else if (video = l.match(/(youtube|youtu|vimeo)\.(com|be)\/(watch\?v=([\w-]+)|([\w-]+))/)) {
                var h = "",
                    s = "nivo-lightbox-video";
                if ("youtube" == video[1] && (h = "http://www.youtube.com/v/" + video[4], s = "nivo-lightbox-youtube"), "youtu" == video[1] && (h = "http://www.youtube.com/v/" + video[3], s = "nivo-lightbox-youtube"), "vimeo" == video[1] && (h = "http://player.vimeo.com/video/" + video[3], s = "nivo-lightbox-vimeo"), h) {
                    var r = i("<iframe>", {
                        src: h,
                        "class": s,
                        frameborder: 0,
                        vspace: 0,
                        hspace: 0,
                        scrolling: "auto"
                    });
                    o.html(r), r.load(function() {
                        o.removeClass("nivo-lightbox-loading")
                    })
                }
            } else if ("ajax" == e.attr("data-lightbox-type")) {
                var n = this;
                i.ajax({
                    url: l,
                    cache: !1,
                    success: function(e) {
                        var n = i('<div class="nivo-lightbox-ajax" />');
                        n.append(e), o.html(n).removeClass("nivo-lightbox-loading"), n.outerHeight() < o.height() && n.css({
                            position: "relative",
                            top: "50%",
                            "margin-top": -(n.outerHeight() / 2) + "px"
                        }), i(t).resize(function() {
                            n.outerHeight() < o.height() && n.css({
                                position: "relative",
                                top: "50%",
                                "margin-top": -(n.outerHeight() / 2) + "px"
                            })
                        })
                    },
                    error: function() {
                        var t = i('<div class="nivo-lightbox-error"><p>' + n.options.errorMessage + "</p></div>");
                        o.html(t).removeClass("nivo-lightbox-loading")
                    }
                })
            } else if ("#" == l.substring(0, 1))
                if (i(l).length) {
                    var v = i('<div class="nivo-lightbox-inline" />');
                    v.append(i(l).clone().show()), o.html(v).removeClass("nivo-lightbox-loading"), v.outerHeight() < o.height() && v.css({
                        position: "relative",
                        top: "50%",
                        "margin-top": -(v.outerHeight() / 2) + "px"
                    }), i(t).resize(function() {
                        v.outerHeight() < o.height() && v.css({
                            position: "relative",
                            top: "50%",
                            "margin-top": -(v.outerHeight() / 2) + "px"
                        })
                    })
                } else {
                    var v = i('<div class="nivo-lightbox-error"><p>' + n.options.errorMessage + "</p></div>");
                    o.html(v).removeClass("nivo-lightbox-loading")
                } else {
                var r = i("<iframe>", {
                    src: l,
                    "class": "nivo-lightbox-item",
                    frameborder: 0,
                    vspace: 0,
                    hspace: 0,
                    scrolling: "auto"
                });
                o.html(r), r.load(function() {
                    o.removeClass("nivo-lightbox-loading")
                })
            }
            if (e.attr("title")) {
                var c = i("<span>", {
                    "class": "nivo-lightbox-title"
                });
                c.text(e.attr("title")), i(".nivo-lightbox-title-wrap").html(c)
            } else i(".nivo-lightbox-title-wrap").html("")
        },
        constructLightbox: function() {
            if (i(".nivo-lightbox-overlay").length) return i(".nivo-lightbox-overlay");
            var t = i("<div>", {
                    "class": "nivo-lightbox-overlay nivo-lightbox-theme-" + this.options.theme + " nivo-lightbox-effect-" + this.options.effect
                }),
                o = i("<div>", {
                    "class": "nivo-lightbox-wrap"
                }),
                e = i("<div>", {
                    "class": "nivo-lightbox-content"
                }),
                n = i('<a href="#" class="nivo-lightbox-nav nivo-lightbox-prev">Previous</a><a href="#" class="nivo-lightbox-nav nivo-lightbox-next">Next</a>'),
                l = i('<a href="#" class="nivo-lightbox-close" title="Close">Close</a>'),
                a = i("<div>", {
                    "class": "nivo-lightbox-title-wrap"
                }),
                h = 0;
            h && t.addClass("nivo-lightbox-ie"), o.append(e), o.append(a), t.append(o), t.append(n), t.append(l), i("body").append(t);
            var s = this;
            return s.options.clickOverlayToClose && t.on("click", function(t) {
                (t.target === this || i(t.target).hasClass("nivo-lightbox-content") || i(t.target).hasClass("nivo-lightbox-image")) && s.destructLightbox()
            }), l.on("click", function(i) {
                i.preventDefault(), s.destructLightbox()
            }), t
        },
        destructLightbox: function() {
            var t = this;
            this.options.beforeHideLightbox.call(this), i(".nivo-lightbox-overlay").removeClass("nivo-lightbox-open"), i(".nivo-lightbox-nav").hide(), i("body").removeClass("nivo-lightbox-body-effect-" + t.options.effect);
            var o = 0;
            o && (i(".nivo-lightbox-overlay iframe").attr("src", " "), i(".nivo-lightbox-overlay iframe").remove()), i(".nivo-lightbox-prev").off("click"), i(".nivo-lightbox-next").off("click"), i(".nivo-lightbox-content").empty(), this.options.afterHideLightbox.call(this)
        },
        isHidpi: function() {
            var i = "(-webkit-min-device-pixel-ratio: 1.5),							  (min--moz-device-pixel-ratio: 1.5),							  (-o-min-device-pixel-ratio: 3/2),							  (min-resolution: 1.5dppx)";
            return t.devicePixelRatio > 1 ? !0 : t.matchMedia && t.matchMedia(i).matches ? !0 : !1
        }
    }, i.fn[n] = function(t) {
        return this.each(function() {
            i.data(this, n) || i.data(this, n, new e(this, t))
        })
    }
}(jQuery, window, document);
! function(e) {
    e.fn.marquee = function(a) {
        return this.each(function() {
            function t(e) {
                var a = [];
                for (var t in e) e.hasOwnProperty(t) && a.push(t + ":" + e[t]);
                return a.push(), "{" + a.join(",") + "}"
            }

            function r() {
                return c && u.allowCss3Support ? i.css(f, "paused") : (e.fn.pause && (i.pause(), l.trigger("paused")), void 0)
            }

            function n() {
                return c && u.allowCss3Support ? i.css(f, "running") : (e.fn.resume && (i.resume(), l.trigger("resumed")), void 0)
            }
            var i, s, o, d, p, u = e.extend({}, e.fn.marquee.defaults, a),
                l = e(this),
                f = "animation-play-state",
                c = !1;
            "undefined" != typeof l.data().delaybeforestart && (l.data().delayBeforeStart = l.data().delaybeforestart, delete l.data().delaybeforestart), "undefined" != typeof l.data().pauseonhover && (l.data().pauseOnHover = l.data().pauseonhover, delete l.data().pauseonhover), "undefined" != typeof l.data().pauseoncycle && (l.data().pauseOnCycle = l.data().pauseoncycle, delete l.data().pauseoncycle), "undefined" != typeof l.data().allowcss3support && (l.data().allowCss3Support = l.data().allowcss3support, delete l.data().allowcss3support), u = e.extend({}, u, l.data()), u.duration = u.speed || u.duration, d = "up" == u.direction || "down" == u.direction, u.gap = u.duplicated ? u.gap : 0, l.wrapInner('<div class="js-marquee"></div>');
            var m = l.find(".js-marquee").css({
                "margin-right": u.gap,
                "float": "left"
            });
            if (u.duplicated && m.clone().appendTo(l), l.wrapInner('<div style="width:100000px" class="js-marquee-wrapper"></div>'), i = l.find(".js-marquee-wrapper"), d) {
                var g = l.height();
                i.removeAttr("style"), l.height(g), l.find(".js-marquee").css({
                    "float": "none",
                    "margin-bottom": u.gap,
                    "margin-right": 0
                }), u.duplicated && l.find(".js-marquee:last").css({
                    "margin-bottom": 0
                });
                var h = l.find(".js-marquee:first").height() + u.gap;
                u.duration = (parseInt(h, 10) + parseInt(g, 10)) / parseInt(g, 10) * u.duration
            } else p = l.find(".js-marquee:first").width() + u.gap, s = l.width(), u.duration = (parseInt(p, 10) + parseInt(s, 10)) / parseInt(s, 10) * u.duration; if (u.duplicated && (u.duration = u.duration / 2), u.allowCss3Support) {
                var y = document.createElement("div"),
                    v = "animation",
                    w = "marqueeAnimation-" + Math.floor(1e7 * Math.random()),
                    x = "Webkit Moz O ms Khtml".split(" "),
                    q = "",
                    S = "",
                    b = e("style"),
                    j = "";
                if (y.style[v] && (c = !0), c === !1)
                    for (var C = 0; C < x.length; C++)
                        if (void 0 !== y.style[x[C] + "AnimationName"]) {
                            var I = "-" + x[C].toLowerCase() + "-";
                            q = I + "animation", f = I + f, j = "@" + I + "keyframes " + w + " ", c = !0;
                            break
                        }
                c && (S = w + " " + u.duration / 1e3 + "s " + u.delayBeforeStart / 1e3 + "s infinite " + u.css3easing)
            }
            var O = function() {
                if (d ? u.duplicated ? (i.css("margin-top", "up" == u.direction ? 0 : "-" + h + "px"), o = {
                        "margin-top": "up" == u.direction ? "-" + h + "px" : 0
                    }) : (i.css("margin-top", "up" == u.direction ? g + "px" : "-" + h + "px"), o = {
                        "margin-top": "up" == u.direction ? "-" + i.height() + "px" : g + "px"
                    }) : u.duplicated ? (i.css("margin-left", "left" == u.direction ? 0 : "-" + p + "px"), o = {
                        "margin-left": "left" == u.direction ? "-" + p + "px" : 0
                    }) : (i.css("margin-left", "left" == u.direction ? s + "px" : "-" + p + "px"), o = {
                        "margin-left": "left" == u.direction ? "-" + p + "px" : s + "px"
                    }), l.trigger("beforeStarting"), c) {
                    i.css(q, S);
                    var a = j + " { 100%  " + t(o) + "}";
                    0 != b.length ? b.last().append(a) : e("head").append("<style>" + a + "</style>")
                } else i.animate(o, u.duration, u.easing, function() {
                    l.trigger("finished"), u.pauseOnCycle ? setTimeout(O, u.delayBeforeStart) : O()
                })
            };
            l.bind("pause", r), l.bind("resume", n), u.pauseOnHover && l.hover(r, n), c && u.allowCss3Support ? O() : setTimeout(O, u.delayBeforeStart)
        })
    }, e.fn.marquee.defaults = {
        allowCss3Support: !0,
        css3easing: "linear",
        easing: "linear",
        delayBeforeStart: 0,
        direction: "left",
        duplicated: !1,
        duration: 5e3,
        gap: 20,
        pauseOnCycle: !1,
        pauseOnHover: !1
    }
}(jQuery);
! function(o) {
    var t = {
        url: !1,
        callback: !1,
        target: !1,
        duration: 120,
        on: "mouseover",
        touch: !0,
        onZoomIn: !1,
        onZoomOut: !1,
        magnify: 1
    };
    o.zoom = function(t, n, e, i) {
        var u, c, a, m, r, l, s, f = o(t).css("position");
        return o(t).css({
            position: /(absolute|fixed)/.test(f) ? f : "relative",
            overflow: "hidden"
        }), e.style.width = e.style.height = "", o(e).addClass("zoomImg").css({
            position: "absolute",
            top: 0,
            left: 0,
            opacity: 0,
            width: e.width * i,
            height: e.height * i,
            border: "none",
            maxWidth: "none"
        }).appendTo(t), {
            init: function() {
                c = o(t).outerWidth(), u = o(t).outerHeight(), n === t ? (m = c, a = u) : (m = o(n).outerWidth(), a = o(n).outerHeight()), r = (e.width - c) / m, l = (e.height - u) / a, s = o(n).offset()
            },
            move: function(o) {
                var t = o.pageX - s.left,
                    n = o.pageY - s.top;
                n = Math.max(Math.min(n, a), 0), t = Math.max(Math.min(t, m), 0), e.style.left = t * -r + "px", e.style.top = n * -l + "px"
            }
        }
    }, o.fn.zoom = function(n) {
        return this.each(function() {
            var e, i = o.extend({}, t, n || {}),
                u = i.target || this,
                c = this,
                a = document.createElement("img"),
                m = o(a),
                r = "mousemove.zoom",
                l = !1,
                s = !1;
            (i.url || (e = o(c).find("img"), e[0] && (i.url = e.data("src") || e.attr("src")), i.url)) && (a.onload = function() {
                function t(t) {
                    e.init(), e.move(t), m.stop().fadeTo(o.support.opacity ? i.duration : 0, 1, o.isFunction(i.onZoomIn) ? i.onZoomIn.call(a) : !1)
                }

                function n() {
                    m.stop().fadeTo(i.duration, 0, o.isFunction(i.onZoomOut) ? i.onZoomOut.call(a) : !1)
                }
                var e = o.zoom(u, c, a, i.magnify);
                "grab" === i.on ? o(c).on("mousedown.zoom", function(i) {
                    1 === i.which && (o(document).one("mouseup.zoom", function() {
                        n(), o(document).off(r, e.move)
                    }), t(i), o(document).on(r, e.move), i.preventDefault())
                }) : "click" === i.on ? o(c).on("click.zoom", function(i) {
                    return l ? void 0 : (l = !0, t(i), o(document).on(r, e.move), o(document).one("click.zoom", function() {
                        n(), l = !1, o(document).off(r, e.move)
                    }), !1)
                }) : "toggle" === i.on ? o(c).on("click.zoom", function(o) {
                    l ? n() : t(o), l = !l
                }) : "mouseover" === i.on && (e.init(), o(c).on("mouseenter.zoom", t).on("mouseleave.zoom", n).on(r, e.move)), i.touch && o(c).on("touchstart.zoom", function(o) {
                    o.preventDefault(), s ? (s = !1, n()) : (s = !0, t(o.originalEvent.touches[0] || o.originalEvent.changedTouches[0]))
                }).on("touchmove.zoom", function(o) {
                    o.preventDefault(), e.move(o.originalEvent.touches[0] || o.originalEvent.changedTouches[0])
                }), o.isFunction(i.callback) && i.callback.call(a)
            }, a.src = i.url, o(c).one("zoom.destroy", function() {
                o(c).off(".zoom"), m.remove()
            }))
        })
    }, o.fn.zoom.defaults = t
}(window.jQuery); + function(a) {
    "use strict";
    var t = a(".no-mobile");
    a(window).width() > 768 ? t.find("[data-src], [data-alt], [data-small], [data-medium], [data-large]").each(function() {
        var d = a(this);
        a("<img>", {
            src: d.data("src"),
            alt: d.data("alt"),
            "data-small": d.data("small"),
            "data-medium": d.data("medium"),
            "data-large": d.data("large")
        }).replaceAll(d).imagesLoaded(function() {
            t.css("display", "block")
        })
    }) : t.remove()
}(jQuery); + function(i) {
    "use strict";

    function e() {
        i(".article-medium .image img").resizeHeight(".image"), i(".article-small .image img").resizeHeight(".image"), i(".carousel-small .carousel-inner .item.active img").resizeHeight(".carousel-inner")
    }
    i.fn.resizeHeight = function(e) {
        var t = i(this);
        return t.each(function() {
            var t = i(this),
                n = t.closest(e);
            i(this).imagesLoaded(function() {
                setTimeout(function() {
                    var i = n.width() * t[0].height / t[0].width;
                    n.height(i)
                }, 400)
            })
        }), i(this)
    };
    var t;
    e(), i(window).on("resize", function() {
        clearTimeout(t), t = setTimeout(e, 300)
    })
}(jQuery); + function(i) {
    "use strict";
    i(window).width() >= 768 && (i.fn.zoomImg = function(t, n) {
        var o = i(this);
        return o.imagesLoaded(function() {
            o.closest(n || ".image").hover(function() {
                var n = i(this).find("img"),
                    o = n.height(),
                    e = n.width(),
                    h = 2 * e,
                    m = h * o / e;
                n.stop().animate({
                    height: m,
                    width: h,
                    top: -(o / 2),
                    left: -(e / 2)
                }, t || 300)
            }, function() {
                i(this).find("img").stop().animate({
                    height: "100%",
                    width: "100%",
                    top: 0,
                    left: 0
                }, t || 300)
            })
        }), i(this)
    }, i(window).width() >= 768 && i(".image img").zoomImg())
}(jQuery); + function(i) {
    "use strict";

    function n() {
        this.container = i("#main-nav .container"), this.navHeader = this.container.find(".navbar-header"), this.nav = this.container.find(".navbar-nav"), this.setPosition()
    }
    n.prototype.setPosition = function() {
        var i = this.container.width(),
            n = this.navHeader.width(),
            t = this.nav.width();
        i > 750 && t + n > i ? (this.navHeader.hide(), this.nav.removeClass("navbar-right").css("margin-left", -15)) : (this.navHeader.show(), this.nav.addClass("navbar-right").css("margin-left", 0))
    };
    var t, a = new n;
    i(window).on("resize", function() {
        clearTimeout(t), t = setTimeout(function() {
            a.setPosition()
        }, 400)
    })
}(jQuery); + function(t) {
    "use strict";
    var i = t(window),
        e = t(".carousel-large");
    if (i.width() >= 768) {
        var n = function() {
            this.images = e.find(".carousel-inner img"), this.init()
        };
        n.prototype.changeImages = function() {
            this.images.each(function() {
                var e = t(this),
                    n = e.attr("src"),
                    a = e.data("small"),
                    o = e.data("medium"),
                    s = e.data("large"),
                    r = i.width();
                a && 768 >= r && n !== a ? e.attr("src", a) : o && 1366 >= r && n !== o ? e.attr("src", o) : s && r > 1366 && n !== s && e.attr("src", s)
            })
        }, n.prototype.defineMaxHeight = function() {
            this.containerHeight = i.width() < 992 ? i.height() - 60 : i.height() - 90
        }, n.prototype.setImagePosition = function(i, e) {
            t(this).css("top", (i - e) / 2 * -1 + "px")
        }, n.prototype.setContainerHeight = function() {
            var t = this;
            e.imagesLoaded(function() {
                t.images.each(function() {
                    var i = this.width,
                        n = this.height,
                        a = e.width() / i * n;
                    a < t.containerHeight && (t.containerHeight = a), t.setImagePosition.call(this, a, t.containerHeight)
                }), e.height(t.containerHeight), e.find(".item").height(t.containerHeight)
            })
        }, n.prototype.init = function() {
            this.changeImages(), this.defineMaxHeight(), this.setContainerHeight()
        }, t.CarouselLarge = new n;
        var a;
        t(window).on("resize", function() {
            clearTimeout(a), a = setTimeout(function() {
                t.CarouselLarge.init()
            }, 100)
        }), Modernizr.csstransitions || t(".carousel:not(.gallery-small)").each(function() {
            t(this).hover(function() {
                t(this).stop(!0, !0).toggleClass("hover", {
                    children: !0,
                    duration: 400
                })
            })
        })
    } else e.remove()
}(jQuery); + function(a) {
    "use strict";
    a.CarouselAnimation = function(a) {
        this.container = a, this.attachEventHandler()
    }, a.CarouselAnimation.prototype.hide = function() {
        var t = this;
        a(this.container).find(".carousel-caption").each(function() {
            var i = a(this).find("div").find("h1, p").css("position", "relative"),
                e = a(t.container).width(),
                n = a(t.container).height(),
                o = a(this).data("animation");
            switch (o) {
                case "fade":
                    i.animate({
                        opacity: 0
                    });
                    break;
                case "bounce":
                    i.animate({
                        opacity: 0,
                        top: "-" + n
                    });
                    break;
                default:
                case "slide":
                    var c = {
                            opacity: 0
                        }, s = e / 2,
                        r = -1 * e / 2;
                    i.each(function() {
                        switch (Math.round(Math.random())) {
                            case 0:
                                c.left = s;
                                break;
                            case 1:
                                c.left = r
                        }
                        a(this).animate(c)
                    })
            }
        })
    }, a.CarouselAnimation.prototype.show = function() {
        var t = a(this.container).find(".active .carousel-caption"),
            i = t.find("h1:visible, p:visible"),
            e = t.data("animation"),
            n = t.data("speed") || 1e3;
        switch (e) {
            case "fade":
                i.each(function() {
                    a(this).delay(Math.random() * n / 2).animate({
                        opacity: 1
                    })
                });
                break;
            case "bounce":
                i.each(function() {
                    a(this).delay(Math.random() * n / 2).animate({
                        opacity: 1,
                        top: 0
                    }, n, "easeOutBounce")
                });
                break;
            case "slide":
            default:
                i.each(function() {
                    a(this).delay(Math.random() * n / 2).animate({
                        opacity: 1,
                        top: 0,
                        left: 0
                    }, n, "easeOutExpo")
                })
        }
    }, a.CarouselAnimation.prototype.attachEventHandler = function() {
        var t = this;
        a(this.container).off("slid.bs.carousel").on("slid.bs.carousel", function() {
            t.show.call(t)
        }), a(this.container).off("slide.bs.carousel").on("slide.bs.carousel", function() {
            t.hide.call(t)
        })
    }
}(jQuery); + function(t) {
    "use strict";
    t.Slider = function(i) {
        var s, o = this;
        t.extend(this, i), this.position = 0, this.activateControl(), this.init(), t(window).on("resize", function() {
            clearTimeout(s), s = setTimeout(function() {
                o.init()
            }, 500)
        })
    }, t.Slider.prototype.activateControl = function() {
        var i = this;
        t(this.widget).find('a[data-toggle="tab"]').off("show.bs.tab").on("show.bs.tab", function(s) {
            var o = t(i.widget).find("li.control"),
                e = t(s.target).attr("href");
            o.removeClass("current"), o.has("a[href=" + e + "]").addClass("current")
        })
    }, t.Slider.prototype.resizeContent = function() {
        var t = 113 / this.maxItems * this.totalItems,
            i = 83 / this.totalItems;
        this.ul.css("width", t + "%"), this.li.css("width", i + "%")
    }, t.Slider.prototype.slideControl = function() {
        var i = this,
            s = Math.ceil(this.totalItems / this.maxItems) - 1,
            o = this.totalItems % this.maxItems,
            e = o ? -(100 * (s - 1) + 100 * o / this.maxItems) : -(100 * s + 100 * o / this.maxItems);
        this.position = 0, this.ul.css("left", 0), this.control.off("click").on("click", function() {
            "next" === t(this).data("slide") ? i.position++ : i.position--;
            var o = 100 * -i.position;
            i.position === s || i.position < 0 ? (o = e, i.position = s) : i.position > s && (o = 0, i.position = 0), i.ul.animate({
                left: o + "%"
            }, 1e3, "easeOutExpo")
        })
    }, t.Slider.prototype.init = function() {
        var i = t(window).width();
        this.ul = t(this.tab).find("ul"), this.li = this.ul.find("li"), this.totalItems = this.li.length, this.control = t(this.widget).find(".control a").filter("[href=" + this.tab + "]"), this.maxItems = 512 > i ? 2 : 768 > i ? 3 : 992 > i ? 3 : 4, this.resizeContent(), this.slideControl()
    }
}(jQuery); + function(t) {
    "use strict";
    t('a[data-toggle="tab"]').on("shown.bs.tab", function() {
        t(t(this).attr("href")).find("img").resizeHeight(".image")
    })
}(jQuery); + function(i) {
    "use strict";
    Modernizr.csstransitions || i(".image").hover(function() {
        i(this).stop(!0, !0).toggleClass("hover", {
            children: !0,
            duration: 400
        })
    })
}/*(jQuery); + function(i) {
    "use strict";
    i.FlickrFeed = function(t) {
        var e, s = this;
        i.extend(this, t), this.getImgs(), i(window).on("resize", function() {
            clearTimeout(e), e = setTimeout(function() {
                s.resizeAs(), s.resizeImgs()
            }, 200)
        })
    }, i.FlickrFeed.prototype.getImgs = function() {
        var t = this,
            e = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?",
            s = i(this.element).find("script").html(),
            h = "";
        i.getJSON(e, {
            id: this.id,
            ids: this.ids,
            tags: this.tags,
            tagmode: this.tagmode,
            format: "json"
        }, function(e) {
            i.each(e.items, function(i, e) {
                return i === (t.items || 9) ? !1 : (h += s.replace(/{{link}}/gi, e.link).replace(/{{thumbnail}}/gi, e.media.m).replace(/{{title}}/gi, e.title), void 0)
            }), i(t.element).html(h)
        }).done(function() {
            t.resizeAs(), t.resizeImgs()
        })
    }, i.FlickrFeed.prototype.resizeAs = function() {
        this.a = i(this.element).find("a"), this.a.height(this.a.width())
    }, i.FlickrFeed.prototype.resizeImgs = function() {
        var t = this,
            e = this.a.width();
        i(this.element).imagesLoaded(function() {
            t.a.find("img").each(function() {
                var t = this.height,
                    s = this.width;
                s > t ? i(this).height(e).css("left", (e - i(this).width()) / 2) : i(this).width(e).css("top", (e - i(this).height()) / 2)
            })
        })
    }
}*/
(jQuery); + function(t) {
    "use strict";
    t("iframe").each(function() {
        var r = t(this).attr("src");
        r.search(/youtube/i) >= 0 && t(this).attr("src", r + "?wmode=transparent")
    })
}(jQuery); + function(e) {
    "use strict";
    e("input, textarea").placeholder()
}(jQuery);
