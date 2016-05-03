﻿/*
Copyright (c) 2003-2014, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/
(function () {
    if (!window.CKEDITOR || !window.CKEDITOR.dom) window.CKEDITOR || (window.CKEDITOR = function () {
        var d = {
            timestamp: "ABCD1", version: "4.4.2 DEV", revision: "0", rnd: Math.floor(900 * Math.random()) + 100, _: { pending: [] }, status: "unloaded", basePath: function () {
                var a = window.CKEDITOR_BASEPATH || ""; if (!a) for (var b = document.getElementsByTagName("script"), c = 0; c < b.length; c++) { var d = b[c].src.match(/(^|.*[\\\/])ckeditor(?:_basic)?(?:_source)?.js(?:\?.*)?$/i); if (d) { a = d[1]; break } } -1 == a.indexOf(":/") && "//" != a.slice(0, 2) &&
                (a = 0 === a.indexOf("/") ? location.href.match(/^.*?:\/\/[^\/]*/)[0] + a : location.href.match(/^[^\?]*\/(?:)/)[0] + a); if (!a) throw 'The CKEditor installation path could not be automatically detected. Please set the global variable "CKEDITOR_BASEPATH" before creating editor instances.'; return a
            }(), getUrl: function (a) { -1 == a.indexOf(":/") && 0 !== a.indexOf("/") && (a = this.basePath + a); this.timestamp && ("/" != a.charAt(a.length - 1) && !/[&?]t=/.test(a)) && (a += (0 <= a.indexOf("?") ? "&" : "?") + "t=" + this.timestamp); return a }, domReady: function () {
                function a() {
                    try {
                        document.addEventListener ?
                        (document.removeEventListener("DOMContentLoaded", a, !1), b()) : document.attachEvent && "complete" === document.readyState && (document.detachEvent("onreadystatechange", a), b())
                    } catch (c) { }
                } function b() { for (var b; b = c.shift() ;) b() } var c = []; return function (b) {
                    c.push(b); "complete" === document.readyState && setTimeout(a, 1); if (1 == c.length) if (document.addEventListener) document.addEventListener("DOMContentLoaded", a, !1), window.addEventListener("load", a, !1); else if (document.attachEvent) {
                        document.attachEvent("onreadystatechange",
                        a); window.attachEvent("onload", a); b = !1; try { b = !window.frameElement } catch (d) { } if (document.documentElement.doScroll && b) { var f = function () { try { document.documentElement.doScroll("left") } catch (b) { setTimeout(f, 1); return } a() }; f() }
                    }
                }
            }()
        }, e = window.CKEDITOR_GETURL; if (e) { var c = d.getUrl; d.getUrl = function (a) { return e.call(d, a) || c.call(d, a) } } return d
    }()), CKEDITOR.event || (CKEDITOR.event = function () { }, CKEDITOR.event.implementOn = function (d) { var e = CKEDITOR.event.prototype, c; for (c in e) d[c] == void 0 && (d[c] = e[c]) }, CKEDITOR.event.prototype =
    function () {
        function d(a) { var b = e(this); return b[a] || (b[a] = new c(a)) } var e = function (a) { a = a.getPrivate && a.getPrivate() || a._ || (a._ = {}); return a.events || (a.events = {}) }, c = function (a) { this.name = a; this.listeners = [] }; c.prototype = { getListenerIndex: function (a) { for (var b = 0, c = this.listeners; b < c.length; b++) if (c[b].fn == a) return b; return -1 } }; return {
            define: function (a, b) { var c = d.call(this, a); CKEDITOR.tools.extend(c, b, true) }, on: function (a, b, c, g, h) {
                function f(d, l, f, k) {
                    d = {
                        name: a, sender: this, editor: d, data: l, listenerData: g,
                        stop: f, cancel: k, removeListener: e
                    }; return b.call(c, d) === false ? false : d.data
                } function e() { o.removeListener(a, b) } var k = d.call(this, a); if (k.getListenerIndex(b) < 0) { k = k.listeners; c || (c = this); isNaN(h) && (h = 10); var o = this; f.fn = b; f.priority = h; for (var m = k.length - 1; m >= 0; m--) if (k[m].priority <= h) { k.splice(m + 1, 0, f); return { removeListener: e } } k.unshift(f) } return { removeListener: e }
            }, once: function () {
                var a = arguments[1]; arguments[1] = function (b) { b.removeListener(); return a.apply(this, arguments) }; return this.on.apply(this,
                arguments)
            }, capture: function () { CKEDITOR.event.useCapture = 1; var a = this.on.apply(this, arguments); CKEDITOR.event.useCapture = 0; return a }, fire: function () {
                var a = 0, b = function () { a = 1 }, c = 0, d = function () { c = 1 }; return function (h, f, i) {
                    var k = e(this)[h], h = a, o = c; a = c = 0; if (k) { var m = k.listeners; if (m.length) for (var m = m.slice(0), q, l = 0; l < m.length; l++) { if (k.errorProof) try { q = m[l].call(this, i, f, b, d) } catch (n) { } else q = m[l].call(this, i, f, b, d); q === false ? c = 1 : typeof q != "undefined" && (f = q); if (a || c) break } } f = c ? false : typeof f == "undefined" ?
                    true : f; a = h; c = o; return f
                }
            }(), fireOnce: function (a, b, c) { b = this.fire(a, b, c); delete e(this)[a]; return b }, removeListener: function (a, b) { var c = e(this)[a]; if (c) { var d = c.getListenerIndex(b); d >= 0 && c.listeners.splice(d, 1) } }, removeAllListeners: function () { var a = e(this), b; for (b in a) delete a[b] }, hasListeners: function (a) { return (a = e(this)[a]) && a.listeners.length > 0 }
        }
    }()), CKEDITOR.editor || (CKEDITOR.editor = function () { CKEDITOR._.pending.push([this, arguments]); CKEDITOR.event.call(this) }, CKEDITOR.editor.prototype.fire =
    function (d, e) { d in { instanceReady: 1, loaded: 1 } && (this[d] = true); return CKEDITOR.event.prototype.fire.call(this, d, e, this) }, CKEDITOR.editor.prototype.fireOnce = function (d, e) { d in { instanceReady: 1, loaded: 1 } && (this[d] = true); return CKEDITOR.event.prototype.fireOnce.call(this, d, e, this) }, CKEDITOR.event.implementOn(CKEDITOR.editor.prototype)), CKEDITOR.env || (CKEDITOR.env = function () {
        var d = navigator.userAgent.toLowerCase(), e = window.opera, c = {
            ie: d.indexOf("trident/") > -1, opera: !!e && e.version, webkit: d.indexOf(" applewebkit/") >
            -1, air: d.indexOf(" adobeair/") > -1, mac: d.indexOf("macintosh") > -1, quirks: document.compatMode == "BackCompat" && (!document.documentMode || document.documentMode < 10), mobile: d.indexOf("mobile") > -1, iOS: /(ipad|iphone|ipod)/.test(d), isCustomDomain: function () { if (!this.ie) return false; var b = document.domain, a = window.location.hostname; return b != a && b != "[" + a + "]" }, secure: location.protocol == "https:"
        }; c.gecko = navigator.product == "Gecko" && !c.webkit && !c.opera && !c.ie; if (c.webkit) d.indexOf("chrome") > -1 ? c.chrome = true : c.safari =
        true; var a = 0; if (c.ie) { a = c.quirks || !document.documentMode ? parseFloat(d.match(/msie (\d+)/)[1]) : document.documentMode; c.ie9Compat = a == 9; c.ie8Compat = a == 8; c.ie7Compat = a == 7; c.ie6Compat = a < 7 || c.quirks } if (c.gecko) { var b = d.match(/rv:([\d\.]+)/); if (b) { b = b[1].split("."); a = b[0] * 1E4 + (b[1] || 0) * 100 + (b[2] || 0) * 1 } } c.opera && (a = parseFloat(e.version())); c.air && (a = parseFloat(d.match(/ adobeair\/(\d+)/)[1])); c.webkit && (a = parseFloat(d.match(/ applewebkit\/(\d+)/)[1])); c.version = a; c.isCompatible = c.iOS && a >= 534 || !c.mobile &&
        (c.ie && a > 6 || c.gecko && a >= 10801 || c.opera && a >= 9.5 || c.air && a >= 1 || c.webkit && a >= 522 || false); c.hidpi = window.devicePixelRatio >= 2; c.needsBrFiller = c.gecko || c.webkit || c.ie && a > 10; c.needsNbspFiller = c.ie && a < 11; c.cssClass = "cke_browser_" + (c.ie ? "ie" : c.gecko ? "gecko" : c.opera ? "opera" : c.webkit ? "webkit" : "unknown"); if (c.quirks) c.cssClass = c.cssClass + " cke_browser_quirks"; if (c.ie) { c.cssClass = c.cssClass + (" cke_browser_ie" + (c.quirks || c.version < 7 ? "6" : c.version)); if (c.quirks) c.cssClass = c.cssClass + " cke_browser_iequirks" } if (c.gecko) if (a <
        10900) c.cssClass = c.cssClass + " cke_browser_gecko18"; else if (a <= 11E3) c.cssClass = c.cssClass + " cke_browser_gecko19"; if (c.air) c.cssClass = c.cssClass + " cke_browser_air"; if (c.iOS) c.cssClass = c.cssClass + " cke_browser_ios"; if (c.hidpi) c.cssClass = c.cssClass + " cke_hidpi"; return c
    }()), "unloaded" == CKEDITOR.status && function () {
        CKEDITOR.event.implementOn(CKEDITOR); CKEDITOR.loadFullCore = function () {
            if (CKEDITOR.status != "basic_ready") CKEDITOR.loadFullCore._load = 1; else {
                delete CKEDITOR.loadFullCore; var d = document.createElement("script");
                d.type = "text/javascript"; d.src = CKEDITOR.basePath + "ckeditor.js"; document.getElementsByTagName("head")[0].appendChild(d)
            }
        }; CKEDITOR.loadFullCoreTimeout = 0; CKEDITOR.add = function (d) { (this._.pending || (this._.pending = [])).push(d) }; (function () { CKEDITOR.domReady(function () { var d = CKEDITOR.loadFullCore, e = CKEDITOR.loadFullCoreTimeout; if (d) { CKEDITOR.status = "basic_ready"; d && d._load ? d() : e && setTimeout(function () { CKEDITOR.loadFullCore && CKEDITOR.loadFullCore() }, e * 1E3) } }) })(); CKEDITOR.status = "basic_loaded"
    }(), CKEDITOR.dom =
    {}, function () {
        var d = [], e = CKEDITOR.env.gecko ? "-moz-" : CKEDITOR.env.webkit ? "-webkit-" : CKEDITOR.env.opera ? "-o-" : CKEDITOR.env.ie ? "-ms-" : ""; CKEDITOR.on("reset", function () { d = [] }); CKEDITOR.tools = {
            arrayCompare: function (c, a) { if (!c && !a) return true; if (!c || !a || c.length != a.length) return false; for (var b = 0; b < c.length; b++) if (c[b] != a[b]) return false; return true }, clone: function (c) {
                var a; if (c && c instanceof Array) { a = []; for (var b = 0; b < c.length; b++) a[b] = CKEDITOR.tools.clone(c[b]); return a } if (c === null || typeof c != "object" ||
                c instanceof String || c instanceof Number || c instanceof Boolean || c instanceof Date || c instanceof RegExp) return c; a = new c.constructor; for (b in c) a[b] = CKEDITOR.tools.clone(c[b]); return a
            }, capitalize: function (c, a) { return c.charAt(0).toUpperCase() + (a ? c.slice(1) : c.slice(1).toLowerCase()) }, extend: function (c) {
                var a = arguments.length, b, d; if (typeof (b = arguments[a - 1]) == "boolean") a--; else if (typeof (b = arguments[a - 2]) == "boolean") { d = arguments[a - 1]; a = a - 2 } for (var g = 1; g < a; g++) {
                    var h = arguments[g], f; for (f in h) if (b ===
                    true || c[f] == void 0) if (!d || f in d) c[f] = h[f]
                } return c
            }, prototypedCopy: function (c) { var a = function () { }; a.prototype = c; return new a }, copy: function (c) { var a = {}, b; for (b in c) a[b] = c[b]; return a }, isArray: function (c) { return Object.prototype.toString.call(c) == "[object Array]" }, isEmpty: function (c) { for (var a in c) if (c.hasOwnProperty(a)) return false; return true }, cssVendorPrefix: function (c, a, b) { if (b) return e + c + ":" + a + ";" + c + ":" + a; b = {}; b[c] = a; b[e + c] = a; return b }, cssStyleToDomStyle: function () {
                var c = document.createElement("div").style,
                a = typeof c.cssFloat != "undefined" ? "cssFloat" : typeof c.styleFloat != "undefined" ? "styleFloat" : "float"; return function (b) { return b == "float" ? a : b.replace(/-./g, function (b) { return b.substr(1).toUpperCase() }) }
            }(), buildStyleHtml: function (c) { for (var c = [].concat(c), a, b = [], d = 0; d < c.length; d++) if (a = c[d]) /@import|[{ }]/.test(a) ? b.push("<style>" + a + "</style>") : b.push('<link type="text/css" rel=stylesheet href="' + a + '">'); return b.join("") }, htmlEncode: function (c) {
                return ("" + c).replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g,
                "&lt;")
            }, htmlEncodeAttr: function (c) { return c.replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;") }, htmlDecodeAttr: function (c) { return c.replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">") }, getNextNumber: function () { var c = 0; return function () { return ++c } }(), getNextId: function () { return "cke_" + this.getNextNumber() }, override: function (c, a) { var b = a(c); b.prototype = c.prototype; return b }, setTimeout: function (c, a, b, d, g) {
                g || (g = window); b || (b = g); return g.setTimeout(function () {
                    d ? c.apply(b, [].concat(d)) :
                    c.apply(b)
                }, a || 0)
            }, trim: function () { var c = /(?:^[ \t\n\r]+)|(?:[ \t\n\r]+$)/g; return function (a) { return a.replace(c, "") } }(), ltrim: function () { var c = /^[ \t\n\r]+/g; return function (a) { return a.replace(c, "") } }(), rtrim: function () { var c = /[ \t\n\r]+$/g; return function (a) { return a.replace(c, "") } }(), indexOf: function (c, a) { if (typeof a == "function") for (var b = 0, d = c.length; b < d; b++) { if (a(c[b])) return b } else { if (c.indexOf) return c.indexOf(a); b = 0; for (d = c.length; b < d; b++) if (c[b] === a) return b } return -1 }, search: function (c,
            a) { var b = CKEDITOR.tools.indexOf(c, a); return b >= 0 ? c[b] : null }, bind: function (c, a) { return function () { return c.apply(a, arguments) } }, createClass: function (c) {
                var a = c.$, b = c.base, d = c.privates || c._, g = c.proto, c = c.statics; !a && (a = function () { b && this.base.apply(this, arguments) }); if (d) var h = a, a = function () { var b = this._ || (this._ = {}), a; for (a in d) { var c = d[a]; b[a] = typeof c == "function" ? CKEDITOR.tools.bind(c, this) : c } h.apply(this, arguments) }; if (b) {
                    a.prototype = this.prototypedCopy(b.prototype); a.prototype.constructor = a; a.base =
                    b; a.baseProto = b.prototype; a.prototype.base = function () { this.base = b.prototype.base; b.apply(this, arguments); this.base = arguments.callee }
                } g && this.extend(a.prototype, g, true); c && this.extend(a, c, true); return a
            }, addFunction: function (c, a) { return d.push(function () { return c.apply(a || this, arguments) }) - 1 }, removeFunction: function (c) { d[c] = null }, callFunction: function (c) { var a = d[c]; return a && a.apply(window, Array.prototype.slice.call(arguments, 1)) }, cssLength: function () {
                var c = /^-?\d+\.?\d*px$/, a; return function (b) {
                    a =
                    CKEDITOR.tools.trim(b + "") + "px"; return c.test(a) ? a : b || ""
                }
            }(), convertToPx: function () { var c; return function (a) { if (!c) { c = CKEDITOR.dom.element.createFromHtml('<div style="position:absolute;left:-9999px;top:-9999px;margin:0px;padding:0px;border:0px;"></div>', CKEDITOR.document); CKEDITOR.document.getBody().append(c) } if (!/%$/.test(a)) { c.setStyle("width", a); return c.$.clientWidth } return a } }(), repeat: function (c, a) { return Array(a + 1).join(c) }, tryThese: function () {
                for (var c, a = 0, b = arguments.length; a < b; a++) {
                    var d =
                    arguments[a]; try { c = d(); break } catch (g) { }
                } return c
            }, genKey: function () { return Array.prototype.slice.call(arguments).join("-") }, defer: function (c) { return function () { var a = arguments, b = this; window.setTimeout(function () { c.apply(b, a) }, 0) } }, normalizeCssText: function (c, a) { var b = [], d, g = CKEDITOR.tools.parseCssText(c, true, a); for (d in g) b.push(d + ":" + g[d]); b.sort(); return b.length ? b.join(";") + ";" : "" }, convertRgbToHex: function (c) {
                return c.replace(/(?:rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\))/gi, function (a, b, c, d) {
                    a =
                    [b, c, d]; for (b = 0; b < 3; b++) a[b] = ("0" + parseInt(a[b], 10).toString(16)).slice(-2); return "#" + a.join("")
                })
            }, parseCssText: function (c, a, b) {
                var d = {}; if (b) { b = new CKEDITOR.dom.element("span"); b.setAttribute("style", c); c = CKEDITOR.tools.convertRgbToHex(b.getAttribute("style") || "") } if (!c || c == ";") return d; c.replace(/&quot;/g, '"').replace(/\s*([^:;\s]+)\s*:\s*([^;]+)\s*(?=;|$)/g, function (b, c, f) {
                    if (a) { c = c.toLowerCase(); c == "font-family" && (f = f.toLowerCase().replace(/["']/g, "").replace(/\s*,\s*/g, ",")); f = CKEDITOR.tools.trim(f) } d[c] =
                    f
                }); return d
            }, writeCssText: function (c, a) { var b, d = []; for (b in c) d.push(b + ":" + c[b]); a && d.sort(); return d.join("; ") }, objectCompare: function (c, a, b) { var d; if (!c && !a) return true; if (!c || !a) return false; for (d in c) if (c[d] != a[d]) return false; if (!b) for (d in a) if (c[d] != a[d]) return false; return true }, objectKeys: function (c) { var a = [], b; for (b in c) a.push(b); return a }, convertArrayToObject: function (c, a) { var b = {}; arguments.length == 1 && (a = true); for (var d = 0, g = c.length; d < g; ++d) b[c[d]] = a; return b }, fixDomain: function () {
                for (var c; ;) try {
                    c =
                    window.parent.document.domain; break
                } catch (a) { c = c ? c.replace(/.+?(?:\.|$)/, "") : document.domain; if (!c) break; document.domain = c } return !!c
            }, eventsBuffer: function (c, a) { function b() { g = (new Date).getTime(); d = false; a() } var d, g = 0; return { input: function () { if (!d) { var a = (new Date).getTime() - g; a < c ? d = setTimeout(b, c - a) : b() } }, reset: function () { d && clearTimeout(d); d = g = 0 } } }, enableHtml5Elements: function (c, a) {
                for (var b = ["abbr", "article", "aside", "audio", "bdi", "canvas", "data", "datalist", "details", "figcaption", "figure", "footer",
                "header", "hgroup", "mark", "meter", "nav", "output", "progress", "section", "summary", "time", "video"], d = b.length, g; d--;) { g = c.createElement(b[d]); a && c.appendChild(g) }
            }
        }
    }(), CKEDITOR.dtd = function () {
        var d = CKEDITOR.tools.extend, e = function (b, a) { for (var c = CKEDITOR.tools.clone(b), d = 1; d < arguments.length; d++) { var a = arguments[d], j; for (j in a) delete c[j] } return c }, c = {}, a = {}, b = {
            address: 1, article: 1, aside: 1, blockquote: 1, details: 1, div: 1, dl: 1, fieldset: 1, figure: 1, footer: 1, form: 1, h1: 1, h2: 1, h3: 1, h4: 1, h5: 1, h6: 1, header: 1, hgroup: 1,
            hr: 1, menu: 1, nav: 1, ol: 1, p: 1, pre: 1, section: 1, table: 1, ul: 1
        }, j = { command: 1, link: 1, meta: 1, noscript: 1, script: 1, style: 1 }, g = {}, h = { "#": 1 }, f = { center: 1, dir: 1, noframes: 1 }; d(c, {
            a: 1, abbr: 1, area: 1, audio: 1, b: 1, bdi: 1, bdo: 1, br: 1, button: 1, canvas: 1, cite: 1, code: 1, command: 1, datalist: 1, del: 1, dfn: 1, em: 1, embed: 1, i: 1, iframe: 1, img: 1, input: 1, ins: 1, kbd: 1, keygen: 1, label: 1, map: 1, mark: 1, meter: 1, noscript: 1, object: 1, output: 1, progress: 1, q: 1, ruby: 1, s: 1, samp: 1, script: 1, select: 1, small: 1, span: 1, strong: 1, sub: 1, sup: 1, textarea: 1, time: 1, u: 1,
            "var": 1, video: 1, wbr: 1
        }, h, { acronym: 1, applet: 1, basefont: 1, big: 1, font: 1, isindex: 1, strike: 1, style: 1, tt: 1 }); d(a, b, c, f); e = {
            a: e(c, { a: 1, button: 1 }), abbr: c, address: a, area: g, article: d({ style: 1 }, a), aside: d({ style: 1 }, a), audio: d({ source: 1, track: 1 }, a), b: c, base: g, bdi: c, bdo: c, blockquote: a, body: a, br: g, button: e(c, { a: 1, button: 1 }), canvas: c, caption: a, cite: c, code: c, col: g, colgroup: { col: 1 }, command: g, datalist: d({ option: 1 }, c), dd: a, del: c, details: d({ summary: 1 }, a), dfn: c, div: d({ style: 1 }, a), dl: { dt: 1, dd: 1 }, dt: a, em: c, embed: g, fieldset: d({ legend: 1 },
            a), figcaption: a, figure: d({ figcaption: 1 }, a), footer: a, form: a, h1: c, h2: c, h3: c, h4: c, h5: c, h6: c, head: d({ title: 1, base: 1 }, j), header: a, hgroup: { h1: 1, h2: 1, h3: 1, h4: 1, h5: 1, h6: 1 }, hr: g, html: d({ head: 1, body: 1 }, a, j), i: c, iframe: h, img: g, input: g, ins: c, kbd: c, keygen: g, label: c, legend: c, li: a, link: g, map: a, mark: c, menu: d({ li: 1 }, a), meta: g, meter: e(c, { meter: 1 }), nav: a, noscript: d({ link: 1, meta: 1, style: 1 }, c), object: d({ param: 1 }, c), ol: { li: 1 }, optgroup: { option: 1 }, option: h, output: c, p: c, param: g, pre: c, progress: e(c, { progress: 1 }), q: c, rp: c, rt: c,
            ruby: d({ rp: 1, rt: 1 }, c), s: c, samp: c, script: h, section: d({ style: 1 }, a), select: { optgroup: 1, option: 1 }, small: c, source: g, span: c, strong: c, style: h, sub: c, summary: c, sup: c, table: { caption: 1, colgroup: 1, thead: 1, tfoot: 1, tbody: 1, tr: 1 }, tbody: { tr: 1 }, td: a, textarea: h, tfoot: { tr: 1 }, th: a, thead: { tr: 1 }, time: e(c, { time: 1 }), title: h, tr: { th: 1, td: 1 }, track: g, u: c, ul: { li: 1 }, "var": c, video: d({ source: 1, track: 1 }, a), wbr: g, acronym: c, applet: d({ param: 1 }, a), basefont: g, big: c, center: a, dialog: g, dir: { li: 1 }, font: c, isindex: g, noframes: a, strike: c, tt: c
        };
        d(e, {
            $block: d({ audio: 1, dd: 1, dt: 1, figcaption: 1, li: 1, video: 1 }, b, f), $blockLimit: { article: 1, aside: 1, audio: 1, body: 1, caption: 1, details: 1, dir: 1, div: 1, dl: 1, fieldset: 1, figcaption: 1, figure: 1, footer: 1, form: 1, header: 1, hgroup: 1, menu: 1, nav: 1, ol: 1, section: 1, table: 1, td: 1, th: 1, tr: 1, ul: 1, video: 1 }, $cdata: { script: 1, style: 1 }, $editable: { address: 1, article: 1, aside: 1, blockquote: 1, body: 1, details: 1, div: 1, fieldset: 1, figcaption: 1, footer: 1, form: 1, h1: 1, h2: 1, h3: 1, h4: 1, h5: 1, h6: 1, header: 1, hgroup: 1, nav: 1, p: 1, pre: 1, section: 1 }, $empty: {
                area: 1,
                base: 1, basefont: 1, br: 1, col: 1, command: 1, dialog: 1, embed: 1, hr: 1, img: 1, input: 1, isindex: 1, keygen: 1, link: 1, meta: 1, param: 1, source: 1, track: 1, wbr: 1
            }, $inline: c, $list: { dl: 1, ol: 1, ul: 1 }, $listItem: { dd: 1, dt: 1, li: 1 }, $nonBodyContent: d({ body: 1, head: 1, html: 1 }, e.head), $nonEditable: { applet: 1, audio: 1, button: 1, embed: 1, iframe: 1, map: 1, object: 1, option: 1, param: 1, script: 1, textarea: 1, video: 1 }, $object: { applet: 1, audio: 1, button: 1, hr: 1, iframe: 1, img: 1, input: 1, object: 1, select: 1, table: 1, textarea: 1, video: 1 }, $removeEmpty: {
                abbr: 1, acronym: 1,
                b: 1, bdi: 1, bdo: 1, big: 1, cite: 1, code: 1, del: 1, dfn: 1, em: 1, font: 1, i: 1, ins: 1, label: 1, kbd: 1, mark: 1, meter: 1, output: 1, q: 1, ruby: 1, s: 1, samp: 1, small: 1, span: 1, strike: 1, strong: 1, sub: 1, sup: 1, time: 1, tt: 1, u: 1, "var": 1
            }, $tabIndex: { a: 1, area: 1, button: 1, input: 1, object: 1, select: 1, textarea: 1 }, $tableContent: { caption: 1, col: 1, colgroup: 1, tbody: 1, td: 1, tfoot: 1, th: 1, thead: 1, tr: 1 }, $transparent: { a: 1, audio: 1, canvas: 1, del: 1, ins: 1, map: 1, noscript: 1, object: 1, video: 1 }, $intermediate: {
                caption: 1, colgroup: 1, dd: 1, dt: 1, figcaption: 1, legend: 1,
                li: 1, optgroup: 1, option: 1, rp: 1, rt: 1, summary: 1, tbody: 1, td: 1, tfoot: 1, th: 1, thead: 1, tr: 1
            }
        }); return e
    }(), CKEDITOR.dom.event = function (d) { this.$ = d }, CKEDITOR.dom.event.prototype = {
        getKey: function () { return this.$.keyCode || this.$.which }, getKeystroke: function () { var d = this.getKey(); if (this.$.ctrlKey || this.$.metaKey) d = d + CKEDITOR.CTRL; this.$.shiftKey && (d = d + CKEDITOR.SHIFT); this.$.altKey && (d = d + CKEDITOR.ALT); return d }, preventDefault: function (d) {
            var e = this.$; e.preventDefault ? e.preventDefault() : e.returnValue = false; d &&
            this.stopPropagation()
        }, stopPropagation: function () { var d = this.$; d.stopPropagation ? d.stopPropagation() : d.cancelBubble = true }, getTarget: function () { var d = this.$.target || this.$.srcElement; return d ? new CKEDITOR.dom.node(d) : null }, getPhase: function () { return this.$.eventPhase || 2 }, getPageOffset: function () { var d = this.getTarget().getDocument().$; return { x: this.$.pageX || this.$.clientX + (d.documentElement.scrollLeft || d.body.scrollLeft), y: this.$.pageY || this.$.clientY + (d.documentElement.scrollTop || d.body.scrollTop) } }
    },
    CKEDITOR.CTRL = 1114112, CKEDITOR.SHIFT = 2228224, CKEDITOR.ALT = 4456448, CKEDITOR.EVENT_PHASE_CAPTURING = 1, CKEDITOR.EVENT_PHASE_AT_TARGET = 2, CKEDITOR.EVENT_PHASE_BUBBLING = 3, CKEDITOR.dom.domObject = function (d) { if (d) this.$ = d }, CKEDITOR.dom.domObject.prototype = function () {
        var d = function (d, c) { return function (a) { typeof CKEDITOR != "undefined" && d.fire(c, new CKEDITOR.dom.event(a)) } }; return {
            getPrivate: function () { var d; if (!(d = this.getCustomData("_"))) this.setCustomData("_", d = {}); return d }, on: function (e) {
                var c = this.getCustomData("_cke_nativeListeners");
                if (!c) { c = {}; this.setCustomData("_cke_nativeListeners", c) } if (!c[e]) { c = c[e] = d(this, e); this.$.addEventListener ? this.$.addEventListener(e, c, !!CKEDITOR.event.useCapture) : this.$.attachEvent && this.$.attachEvent("on" + e, c) } return CKEDITOR.event.prototype.on.apply(this, arguments)
            }, removeListener: function (d) {
                CKEDITOR.event.prototype.removeListener.apply(this, arguments); if (!this.hasListeners(d)) {
                    var c = this.getCustomData("_cke_nativeListeners"), a = c && c[d]; if (a) {
                        this.$.removeEventListener ? this.$.removeEventListener(d,
                        a, false) : this.$.detachEvent && this.$.detachEvent("on" + d, a); delete c[d]
                    }
                }
            }, removeAllListeners: function () { var d = this.getCustomData("_cke_nativeListeners"), c; for (c in d) { var a = d[c]; this.$.detachEvent ? this.$.detachEvent("on" + c, a) : this.$.removeEventListener && this.$.removeEventListener(c, a, false); delete d[c] } }
        }
    }(), function (d) {
        var e = {}; CKEDITOR.on("reset", function () { e = {} }); d.equals = function (c) { try { return c && c.$ === this.$ } catch (a) { return false } }; d.setCustomData = function (c, a) {
            var b = this.getUniqueId(); (e[b] ||
            (e[b] = {}))[c] = a; return this
        }; d.getCustomData = function (c) { var a = this.$["data-cke-expando"]; return (a = a && e[a]) && c in a ? a[c] : null }; d.removeCustomData = function (c) { var a = this.$["data-cke-expando"], a = a && e[a], b, d; if (a) { b = a[c]; d = c in a; delete a[c] } return d ? b : null }; d.clearCustomData = function () { this.removeAllListeners(); var c = this.$["data-cke-expando"]; c && delete e[c] }; d.getUniqueId = function () { return this.$["data-cke-expando"] || (this.$["data-cke-expando"] = CKEDITOR.tools.getNextNumber()) }; CKEDITOR.event.implementOn(d)
    }(CKEDITOR.dom.domObject.prototype),
    CKEDITOR.dom.node = function (d) { return d ? new CKEDITOR.dom[d.nodeType == CKEDITOR.NODE_DOCUMENT ? "document" : d.nodeType == CKEDITOR.NODE_ELEMENT ? "element" : d.nodeType == CKEDITOR.NODE_TEXT ? "text" : d.nodeType == CKEDITOR.NODE_COMMENT ? "comment" : d.nodeType == CKEDITOR.NODE_DOCUMENT_FRAGMENT ? "documentFragment" : "domObject"](d) : this }, CKEDITOR.dom.node.prototype = new CKEDITOR.dom.domObject, CKEDITOR.NODE_ELEMENT = 1, CKEDITOR.NODE_DOCUMENT = 9, CKEDITOR.NODE_TEXT = 3, CKEDITOR.NODE_COMMENT = 8, CKEDITOR.NODE_DOCUMENT_FRAGMENT = 11, CKEDITOR.POSITION_IDENTICAL =
    0, CKEDITOR.POSITION_DISCONNECTED = 1, CKEDITOR.POSITION_FOLLOWING = 2, CKEDITOR.POSITION_PRECEDING = 4, CKEDITOR.POSITION_IS_CONTAINED = 8, CKEDITOR.POSITION_CONTAINS = 16, CKEDITOR.tools.extend(CKEDITOR.dom.node.prototype, {
        appendTo: function (d, e) { d.append(this, e); return d }, clone: function (d, e) {
            var c = this.$.cloneNode(d), a = function (b) { b["data-cke-expando"] && (b["data-cke-expando"] = false); if (b.nodeType == CKEDITOR.NODE_ELEMENT) { e || b.removeAttribute("id", false); if (d) for (var b = b.childNodes, c = 0; c < b.length; c++) a(b[c]) } }; a(c);
            return new CKEDITOR.dom.node(c)
        }, hasPrevious: function () { return !!this.$.previousSibling }, hasNext: function () { return !!this.$.nextSibling }, insertAfter: function (d) { d.$.parentNode.insertBefore(this.$, d.$.nextSibling); return d }, insertBefore: function (d) { d.$.parentNode.insertBefore(this.$, d.$); return d }, insertBeforeMe: function (d) { this.$.parentNode.insertBefore(d.$, this.$); return d }, getAddress: function (d) {
            for (var e = [], c = this.getDocument().$.documentElement, a = this.$; a && a != c;) {
                var b = a.parentNode; b && e.unshift(this.getIndex.call({ $: a },
                d)); a = b
            } return e
        }, getDocument: function () { return new CKEDITOR.dom.document(this.$.ownerDocument || this.$.parentNode.ownerDocument) }, getIndex: function (d) { var e = this.$, c = -1, a; if (!this.$.parentNode) return c; do if (!d || !(e != this.$ && e.nodeType == CKEDITOR.NODE_TEXT && (a || !e.nodeValue))) { c++; a = e.nodeType == CKEDITOR.NODE_TEXT } while (e = e.previousSibling); return c }, getNextSourceNode: function (d, e, c) {
            if (c && !c.call) var a = c, c = function (b) { return !b.equals(a) }; var d = !d && this.getFirst && this.getFirst(), b; if (!d) {
                if (this.type ==
                CKEDITOR.NODE_ELEMENT && c && c(this, true) === false) return null; d = this.getNext()
            } for (; !d && (b = (b || this).getParent()) ;) { if (c && c(b, true) === false) return null; d = b.getNext() } return !d || c && c(d) === false ? null : e && e != d.type ? d.getNextSourceNode(false, e, c) : d
        }, getPreviousSourceNode: function (d, e, c) {
            if (c && !c.call) var a = c, c = function (b) { return !b.equals(a) }; var d = !d && this.getLast && this.getLast(), b; if (!d) { if (this.type == CKEDITOR.NODE_ELEMENT && c && c(this, true) === false) return null; d = this.getPrevious() } for (; !d && (b = (b || this).getParent()) ;) {
                if (c &&
                c(b, true) === false) return null; d = b.getPrevious()
            } return !d || c && c(d) === false ? null : e && d.type != e ? d.getPreviousSourceNode(false, e, c) : d
        }, getPrevious: function (d) { var e = this.$, c; do c = (e = e.previousSibling) && e.nodeType != 10 && new CKEDITOR.dom.node(e); while (c && d && !d(c)); return c }, getNext: function (d) { var e = this.$, c; do c = (e = e.nextSibling) && new CKEDITOR.dom.node(e); while (c && d && !d(c)); return c }, getParent: function (d) {
            var e = this.$.parentNode; return e && (e.nodeType == CKEDITOR.NODE_ELEMENT || d && e.nodeType == CKEDITOR.NODE_DOCUMENT_FRAGMENT) ?
            new CKEDITOR.dom.node(e) : null
        }, getParents: function (d) { var e = this, c = []; do c[d ? "push" : "unshift"](e); while (e = e.getParent()); return c }, getCommonAncestor: function (d) { if (d.equals(this)) return this; if (d.contains && d.contains(this)) return d; var e = this.contains ? this : this.getParent(); do if (e.contains(d)) return e; while (e = e.getParent()); return null }, getPosition: function (d) {
            var e = this.$, c = d.$; if (e.compareDocumentPosition) return e.compareDocumentPosition(c); if (e == c) return CKEDITOR.POSITION_IDENTICAL; if (this.type ==
            CKEDITOR.NODE_ELEMENT && d.type == CKEDITOR.NODE_ELEMENT) { if (e.contains) { if (e.contains(c)) return CKEDITOR.POSITION_CONTAINS + CKEDITOR.POSITION_PRECEDING; if (c.contains(e)) return CKEDITOR.POSITION_IS_CONTAINED + CKEDITOR.POSITION_FOLLOWING } if ("sourceIndex" in e) return e.sourceIndex < 0 || c.sourceIndex < 0 ? CKEDITOR.POSITION_DISCONNECTED : e.sourceIndex < c.sourceIndex ? CKEDITOR.POSITION_PRECEDING : CKEDITOR.POSITION_FOLLOWING } for (var e = this.getAddress(), d = d.getAddress(), c = Math.min(e.length, d.length), a = 0; a <= c - 1; a++) if (e[a] !=
            d[a]) { if (a < c) return e[a] < d[a] ? CKEDITOR.POSITION_PRECEDING : CKEDITOR.POSITION_FOLLOWING; break } return e.length < d.length ? CKEDITOR.POSITION_CONTAINS + CKEDITOR.POSITION_PRECEDING : CKEDITOR.POSITION_IS_CONTAINED + CKEDITOR.POSITION_FOLLOWING
        }, getAscendant: function (d, e) { var c = this.$, a; if (!e) c = c.parentNode; for (; c;) { if (c.nodeName && (a = c.nodeName.toLowerCase(), typeof d == "string" ? a == d : a in d)) return new CKEDITOR.dom.node(c); try { c = c.parentNode } catch (b) { c = null } } return null }, hasAscendant: function (d, e) {
            var c = this.$; if (!e) c =
            c.parentNode; for (; c;) { if (c.nodeName && c.nodeName.toLowerCase() == d) return true; c = c.parentNode } return false
        }, move: function (d, e) { d.append(this.remove(), e) }, remove: function (d) { var e = this.$, c = e.parentNode; if (c) { if (d) for (; d = e.firstChild;) c.insertBefore(e.removeChild(d), e); c.removeChild(e) } return this }, replace: function (d) { this.insertBefore(d); d.remove() }, trim: function () { this.ltrim(); this.rtrim() }, ltrim: function () {
            for (var d; this.getFirst && (d = this.getFirst()) ;) {
                if (d.type == CKEDITOR.NODE_TEXT) {
                    var e = CKEDITOR.tools.ltrim(d.getText()),
                    c = d.getLength(); if (e) { if (e.length < c) { d.split(c - e.length); this.$.removeChild(this.$.firstChild) } } else { d.remove(); continue }
                } break
            }
        }, rtrim: function () {
            for (var d; this.getLast && (d = this.getLast()) ;) { if (d.type == CKEDITOR.NODE_TEXT) { var e = CKEDITOR.tools.rtrim(d.getText()), c = d.getLength(); if (e) { if (e.length < c) { d.split(e.length); this.$.lastChild.parentNode.removeChild(this.$.lastChild) } } else { d.remove(); continue } } break } if (CKEDITOR.env.needsBrFiller) (d = this.$.lastChild) && (d.type == 1 && d.nodeName.toLowerCase() == "br") &&
            d.parentNode.removeChild(d)
        }, isReadOnly: function () { var d = this; this.type != CKEDITOR.NODE_ELEMENT && (d = this.getParent()); if (d && typeof d.$.isContentEditable != "undefined") return !(d.$.isContentEditable || d.data("cke-editable")); for (; d;) { if (d.data("cke-editable")) break; if (d.getAttribute("contentEditable") == "false") return true; if (d.getAttribute("contentEditable") == "true") break; d = d.getParent() } return !d }
    }), CKEDITOR.dom.window = function (d) { CKEDITOR.dom.domObject.call(this, d) }, CKEDITOR.dom.window.prototype = new CKEDITOR.dom.domObject,
    CKEDITOR.tools.extend(CKEDITOR.dom.window.prototype, {
        focus: function () { this.$.focus() }, getViewPaneSize: function () { var d = this.$.document, e = d.compatMode == "CSS1Compat"; return { width: (e ? d.documentElement.clientWidth : d.body.clientWidth) || 0, height: (e ? d.documentElement.clientHeight : d.body.clientHeight) || 0 } }, getScrollPosition: function () {
            var d = this.$; if ("pageXOffset" in d) return { x: d.pageXOffset || 0, y: d.pageYOffset || 0 }; d = d.document; return {
                x: d.documentElement.scrollLeft || d.body.scrollLeft || 0, y: d.documentElement.scrollTop ||
                d.body.scrollTop || 0
            }
        }, getFrame: function () { var d = this.$.frameElement; return d ? new CKEDITOR.dom.element.get(d) : null }
    }), CKEDITOR.dom.document = function (d) { CKEDITOR.dom.domObject.call(this, d) }, CKEDITOR.dom.document.prototype = new CKEDITOR.dom.domObject, CKEDITOR.tools.extend(CKEDITOR.dom.document.prototype, {
        type: CKEDITOR.NODE_DOCUMENT, appendStyleSheet: function (d) {
            if (this.$.createStyleSheet) this.$.createStyleSheet(d); else {
                var e = new CKEDITOR.dom.element("link"); e.setAttributes({
                    rel: "stylesheet", type: "text/css",
                    href: d
                }); this.getHead().append(e)
            }
        }, appendStyleText: function (d) { if (this.$.createStyleSheet) { var e = this.$.createStyleSheet(""); e.cssText = d } else { var c = new CKEDITOR.dom.element("style", this); c.append(new CKEDITOR.dom.text(d, this)); this.getHead().append(c) } return e || c.$.sheet }, createElement: function (d, e) { var c = new CKEDITOR.dom.element(d, this); if (e) { e.attributes && c.setAttributes(e.attributes); e.styles && c.setStyles(e.styles) } return c }, createText: function (d) { return new CKEDITOR.dom.text(d, this) }, focus: function () { this.getWindow().focus() },
        getActive: function () { return new CKEDITOR.dom.element(this.$.activeElement) }, getById: function (d) { return (d = this.$.getElementById(d)) ? new CKEDITOR.dom.element(d) : null }, getByAddress: function (d, e) { for (var c = this.$.documentElement, a = 0; c && a < d.length; a++) { var b = d[a]; if (e) for (var j = -1, g = 0; g < c.childNodes.length; g++) { var h = c.childNodes[g]; if (!(e === true && h.nodeType == 3 && h.previousSibling && h.previousSibling.nodeType == 3)) { j++; if (j == b) { c = h; break } } } else c = c.childNodes[b] } return c ? new CKEDITOR.dom.node(c) : null }, getElementsByTag: function (d,
        e) { if ((!CKEDITOR.env.ie || document.documentMode > 8) && e) d = e + ":" + d; return new CKEDITOR.dom.nodeList(this.$.getElementsByTagName(d)) }, getHead: function () { var d = this.$.getElementsByTagName("head")[0]; return d = d ? new CKEDITOR.dom.element(d) : this.getDocumentElement().append(new CKEDITOR.dom.element("head"), true) }, getBody: function () { return new CKEDITOR.dom.element(this.$.body) }, getDocumentElement: function () { return new CKEDITOR.dom.element(this.$.documentElement) }, getWindow: function () {
            return new CKEDITOR.dom.window(this.$.parentWindow ||
            this.$.defaultView)
        }, write: function (d) { this.$.open("text/html", "replace"); CKEDITOR.env.ie && (d = d.replace(/(?:^\s*<!DOCTYPE[^>]*?>)|^/i, '$&\n<script data-cke-temp="1">(' + CKEDITOR.tools.fixDomain + ")();<\/script>")); this.$.write(d); this.$.close() }, find: function (d) { return new CKEDITOR.dom.nodeList(this.$.querySelectorAll(d)) }, findOne: function (d) { return (d = this.$.querySelector(d)) ? new CKEDITOR.dom.element(d) : null }, _getHtml5ShivFrag: function () {
            var d = this.getCustomData("html5ShivFrag"); if (!d) {
                d = this.$.createDocumentFragment();
                CKEDITOR.tools.enableHtml5Elements(d, true); this.setCustomData("html5ShivFrag", d)
            } return d
        }
    }), CKEDITOR.dom.nodeList = function (d) { this.$ = d }, CKEDITOR.dom.nodeList.prototype = { count: function () { return this.$.length }, getItem: function (d) { if (d < 0 || d >= this.$.length) return null; return (d = this.$[d]) ? new CKEDITOR.dom.node(d) : null } }, CKEDITOR.dom.element = function (d, e) { typeof d == "string" && (d = (e ? e.$ : document).createElement(d)); CKEDITOR.dom.domObject.call(this, d) }, CKEDITOR.dom.element.get = function (d) {
        return (d = typeof d ==
        "string" ? document.getElementById(d) || document.getElementsByName(d)[0] : d) && (d.$ ? d : new CKEDITOR.dom.element(d))
    }, CKEDITOR.dom.element.prototype = new CKEDITOR.dom.node, CKEDITOR.dom.element.createFromHtml = function (d, e) { var c = new CKEDITOR.dom.element("div", e); c.setHtml(d); return c.getFirst().remove() }, CKEDITOR.dom.element.setMarker = function (d, e, c, a) {
        var b = e.getCustomData("list_marker_id") || e.setCustomData("list_marker_id", CKEDITOR.tools.getNextNumber()).getCustomData("list_marker_id"), j = e.getCustomData("list_marker_names") ||
        e.setCustomData("list_marker_names", {}).getCustomData("list_marker_names"); d[b] = e; j[c] = 1; return e.setCustomData(c, a)
    }, CKEDITOR.dom.element.clearAllMarkers = function (d) { for (var e in d) CKEDITOR.dom.element.clearMarkers(d, d[e], 1) }, CKEDITOR.dom.element.clearMarkers = function (d, e, c) { var a = e.getCustomData("list_marker_names"), b = e.getCustomData("list_marker_id"), j; for (j in a) e.removeCustomData(j); e.removeCustomData("list_marker_names"); if (c) { e.removeCustomData("list_marker_id"); delete d[b] } }, function () {
        function d(b) {
            var a =
            true; if (!b.$.id) { b.$.id = "cke_tmp_" + CKEDITOR.tools.getNextNumber(); a = false } return function () { a || b.removeAttribute("id") }
        } function e(b, a) { return "#" + b.$.id + " " + a.split(/,\s*/).join(", #" + b.$.id + " ") } function c(b) { for (var c = 0, d = 0, h = a[b].length; d < h; d++) c = c + (parseInt(this.getComputedStyle(a[b][d]) || 0, 10) || 0); return c } CKEDITOR.tools.extend(CKEDITOR.dom.element.prototype, {
            type: CKEDITOR.NODE_ELEMENT, addClass: function (b) {
                var a = this.$.className; a && (RegExp("(?:^|\\s)" + b + "(?:\\s|$)", "").test(a) || (a = a + (" " + b)));
                this.$.className = a || b
            }, removeClass: function (b) { var a = this.getAttribute("class"); if (a) { b = RegExp("(?:^|\\s+)" + b + "(?=\\s|$)", "i"); if (b.test(a)) (a = a.replace(b, "").replace(/^\s+/, "")) ? this.setAttribute("class", a) : this.removeAttribute("class") } return this }, hasClass: function (b) { return RegExp("(?:^|\\s+)" + b + "(?=\\s|$)", "").test(this.getAttribute("class")) }, append: function (b, a) {
                typeof b == "string" && (b = this.getDocument().createElement(b)); a ? this.$.insertBefore(b.$, this.$.firstChild) : this.$.appendChild(b.$);
                return b
            }, appendHtml: function (b) { if (this.$.childNodes.length) { var a = new CKEDITOR.dom.element("div", this.getDocument()); a.setHtml(b); a.moveChildren(this) } else this.setHtml(b) }, appendText: function (b) { this.$.text != void 0 ? this.$.text = this.$.text + b : this.append(new CKEDITOR.dom.text(b)) }, appendBogus: function (b) {
                if (b || CKEDITOR.env.needsBrFiller || CKEDITOR.env.opera) {
                    for (b = this.getLast() ; b && b.type == CKEDITOR.NODE_TEXT && !CKEDITOR.tools.rtrim(b.getText()) ;) b = b.getPrevious(); if (!b || !b.is || !b.is("br")) {
                        b = CKEDITOR.env.opera ?
                        this.getDocument().createText("") : this.getDocument().createElement("br"); CKEDITOR.env.gecko && b.setAttribute("type", "_moz"); this.append(b)
                    }
                }
            }, breakParent: function (b) { var a = new CKEDITOR.dom.range(this.getDocument()); a.setStartAfter(this); a.setEndAfter(b); b = a.extractContents(); a.insertNode(this.remove()); b.insertAfterNode(this) }, contains: CKEDITOR.env.ie || CKEDITOR.env.webkit ? function (b) { var a = this.$; return b.type != CKEDITOR.NODE_ELEMENT ? a.contains(b.getParent().$) : a != b.$ && a.contains(b.$) } : function (b) {
                return !!(this.$.compareDocumentPosition(b.$) &
                16)
            }, focus: function () { function b() { try { this.$.focus() } catch (b) { } } return function (a) { a ? CKEDITOR.tools.setTimeout(b, 100, this) : b.call(this) } }(), getHtml: function () { var b = this.$.innerHTML; return CKEDITOR.env.ie ? b.replace(/<\?[^>]*>/g, "") : b }, getOuterHtml: function () { if (this.$.outerHTML) return this.$.outerHTML.replace(/<\?[^>]*>/, ""); var b = this.$.ownerDocument.createElement("div"); b.appendChild(this.$.cloneNode(true)); return b.innerHTML }, getClientRect: function () {
                var b = CKEDITOR.tools.extend({}, this.$.getBoundingClientRect());
                !b.width && (b.width = b.right - b.left); !b.height && (b.height = b.bottom - b.top); return b
            }, setHtml: CKEDITOR.env.ie && CKEDITOR.env.version < 9 ? function (b) { try { var a = this.$; if (this.getParent()) return a.innerHTML = b; var c = this.getDocument()._getHtml5ShivFrag(); c.appendChild(a); a.innerHTML = b; c.removeChild(a); return b } catch (d) { this.$.innerHTML = ""; a = new CKEDITOR.dom.element("body", this.getDocument()); a.$.innerHTML = b; for (a = a.getChildren() ; a.count() ;) this.append(a.getItem(0)); return b } } : function (b) {
                return this.$.innerHTML =
                b
            }, setText: function (b) { CKEDITOR.dom.element.prototype.setText = this.$.innerText != void 0 ? function (b) { return this.$.innerText = b } : function (b) { return this.$.textContent = b }; return this.setText(b) }, getAttribute: function () {
                var b = function (b) { return this.$.getAttribute(b, 2) }; return CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.ie6Compat) ? function (b) {
                    switch (b) {
                        case "class": b = "className"; break; case "http-equiv": b = "httpEquiv"; break; case "name": return this.$.name; case "tabindex": b = this.$.getAttribute(b,
                        2); b !== 0 && this.$.tabIndex === 0 && (b = null); return b; case "checked": b = this.$.attributes.getNamedItem(b); return (b.specified ? b.nodeValue : this.$.checked) ? "checked" : null; case "hspace": case "value": return this.$[b]; case "style": return this.$.style.cssText; case "contenteditable": case "contentEditable": return this.$.attributes.getNamedItem("contentEditable").specified ? this.$.getAttribute("contentEditable") : null
                    } return this.$.getAttribute(b, 2)
                } : b
            }(), getChildren: function () { return new CKEDITOR.dom.nodeList(this.$.childNodes) },
            getComputedStyle: CKEDITOR.env.ie ? function (b) { return this.$.currentStyle[CKEDITOR.tools.cssStyleToDomStyle(b)] } : function (b) { var a = this.getWindow().$.getComputedStyle(this.$, null); return a ? a.getPropertyValue(b) : "" }, getDtd: function () { var b = CKEDITOR.dtd[this.getName()]; this.getDtd = function () { return b }; return b }, getElementsByTag: CKEDITOR.dom.document.prototype.getElementsByTag, getTabIndex: CKEDITOR.env.ie ? function () {
                var b = this.$.tabIndex; b === 0 && (!CKEDITOR.dtd.$tabIndex[this.getName()] && parseInt(this.getAttribute("tabindex"),
                10) !== 0) && (b = -1); return b
            } : CKEDITOR.env.webkit ? function () { var b = this.$.tabIndex; if (b == void 0) { b = parseInt(this.getAttribute("tabindex"), 10); isNaN(b) && (b = -1) } return b } : function () { return this.$.tabIndex }, getText: function () { return this.$.textContent || this.$.innerText || "" }, getWindow: function () { return this.getDocument().getWindow() }, getId: function () { return this.$.id || null }, getNameAtt: function () { return this.$.name || null }, getName: function () {
                var b = this.$.nodeName.toLowerCase(); if (CKEDITOR.env.ie && !(document.documentMode >
                8)) { var a = this.$.scopeName; a != "HTML" && (b = a.toLowerCase() + ":" + b) } return (this.getName = function () { return b })()
            }, getValue: function () { return this.$.value }, getFirst: function (b) { var a = this.$.firstChild; (a = a && new CKEDITOR.dom.node(a)) && (b && !b(a)) && (a = a.getNext(b)); return a }, getLast: function (b) { var a = this.$.lastChild; (a = a && new CKEDITOR.dom.node(a)) && (b && !b(a)) && (a = a.getPrevious(b)); return a }, getStyle: function (b) { return this.$.style[CKEDITOR.tools.cssStyleToDomStyle(b)] }, is: function () {
                var b = this.getName();
                if (typeof arguments[0] == "object") return !!arguments[0][b]; for (var a = 0; a < arguments.length; a++) if (arguments[a] == b) return true; return false
            }, isEditable: function (b) {
                var a = this.getName(); if (this.isReadOnly() || this.getComputedStyle("display") == "none" || this.getComputedStyle("visibility") == "hidden" || CKEDITOR.dtd.$nonEditable[a] || CKEDITOR.dtd.$empty[a] || this.is("a") && (this.data("cke-saved-name") || this.hasAttribute("name")) && !this.getChildCount()) return false; if (b !== false) {
                    b = CKEDITOR.dtd[a] || CKEDITOR.dtd.span;
                    return !(!b || !b["#"])
                } return true
            }, isIdentical: function (b) {
                var a = this.clone(0, 1), b = b.clone(0, 1); a.removeAttributes(["_moz_dirty", "data-cke-expando", "data-cke-saved-href", "data-cke-saved-name"]); b.removeAttributes(["_moz_dirty", "data-cke-expando", "data-cke-saved-href", "data-cke-saved-name"]); if (a.$.isEqualNode) { a.$.style.cssText = CKEDITOR.tools.normalizeCssText(a.$.style.cssText); b.$.style.cssText = CKEDITOR.tools.normalizeCssText(b.$.style.cssText); return a.$.isEqualNode(b.$) } a = a.getOuterHtml(); b = b.getOuterHtml();
                if (CKEDITOR.env.ie && CKEDITOR.env.version < 9 && this.is("a")) { var c = this.getParent(); if (c.type == CKEDITOR.NODE_ELEMENT) { c = c.clone(); c.setHtml(a); a = c.getHtml(); c.setHtml(b); b = c.getHtml() } } return a == b
            }, isVisible: function () { var b = (this.$.offsetHeight || this.$.offsetWidth) && this.getComputedStyle("visibility") != "hidden", a, c; if (b && (CKEDITOR.env.webkit || CKEDITOR.env.opera)) { a = this.getWindow(); if (!a.equals(CKEDITOR.document.getWindow()) && (c = a.$.frameElement)) b = (new CKEDITOR.dom.element(c)).isVisible() } return !!b },
            isEmptyInlineRemoveable: function () { if (!CKEDITOR.dtd.$removeEmpty[this.getName()]) return false; for (var b = this.getChildren(), a = 0, c = b.count() ; a < c; a++) { var d = b.getItem(a); if (!(d.type == CKEDITOR.NODE_ELEMENT && d.data("cke-bookmark")) && (d.type == CKEDITOR.NODE_ELEMENT && !d.isEmptyInlineRemoveable() || d.type == CKEDITOR.NODE_TEXT && CKEDITOR.tools.trim(d.getText()))) return false } return true }, hasAttributes: CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.ie6Compat) ? function () {
                for (var b = this.$.attributes, a = 0; a <
                b.length; a++) { var c = b[a]; switch (c.nodeName) { case "class": if (this.getAttribute("class")) return true; case "data-cke-expando": continue; default: if (c.specified) return true } } return false
            } : function () { var b = this.$.attributes, a = b.length, c = { "data-cke-expando": 1, _moz_dirty: 1 }; return a > 0 && (a > 2 || !c[b[0].nodeName] || a == 2 && !c[b[1].nodeName]) }, hasAttribute: function () {
                function b(b) { b = this.$.attributes.getNamedItem(b); return !(!b || !b.specified) } return CKEDITOR.env.ie && CKEDITOR.env.version < 8 ? function (a) {
                    return a == "name" ?
                    !!this.$.name : b.call(this, a)
                } : b
            }(), hide: function () { this.setStyle("display", "none") }, moveChildren: function (b, a) { var c = this.$, b = b.$; if (c != b) { var d; if (a) for (; d = c.lastChild;) b.insertBefore(c.removeChild(d), b.firstChild); else for (; d = c.firstChild;) b.appendChild(c.removeChild(d)) } }, mergeSiblings: function () {
                function b(b, a, c) {
                    if (a && a.type == CKEDITOR.NODE_ELEMENT) {
                        for (var d = []; a.data("cke-bookmark") || a.isEmptyInlineRemoveable() ;) { d.push(a); a = c ? a.getNext() : a.getPrevious(); if (!a || a.type != CKEDITOR.NODE_ELEMENT) return } if (b.isIdentical(a)) {
                            for (var e =
                            c ? b.getLast() : b.getFirst() ; d.length;) d.shift().move(b, !c); a.moveChildren(b, !c); a.remove(); e && e.type == CKEDITOR.NODE_ELEMENT && e.mergeSiblings()
                        }
                    }
                } return function (a) { if (a === false || CKEDITOR.dtd.$removeEmpty[this.getName()] || this.is("a")) { b(this, this.getNext(), true); b(this, this.getPrevious()) } }
            }(), show: function () { this.setStyles({ display: "", visibility: "" }) }, setAttribute: function () {
                var b = function (b, a) { this.$.setAttribute(b, a); return this }; return CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.ie6Compat) ?
                function (a, c) { a == "class" ? this.$.className = c : a == "style" ? this.$.style.cssText = c : a == "tabindex" ? this.$.tabIndex = c : a == "checked" ? this.$.checked = c : a == "contenteditable" ? b.call(this, "contentEditable", c) : b.apply(this, arguments); return this } : CKEDITOR.env.ie8Compat && CKEDITOR.env.secure ? function (a, c) { if (a == "src" && c.match(/^http:\/\//)) try { b.apply(this, arguments) } catch (d) { } else b.apply(this, arguments); return this } : b
            }(), setAttributes: function (b) { for (var a in b) this.setAttribute(a, b[a]); return this }, setValue: function (b) {
                this.$.value =
                b; return this
            }, removeAttribute: function () { var b = function (b) { this.$.removeAttribute(b) }; return CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.ie6Compat) ? function (b) { b == "class" ? b = "className" : b == "tabindex" ? b = "tabIndex" : b == "contenteditable" && (b = "contentEditable"); this.$.removeAttribute(b) } : b }(), removeAttributes: function (b) { if (CKEDITOR.tools.isArray(b)) for (var a = 0; a < b.length; a++) this.removeAttribute(b[a]); else for (a in b) b.hasOwnProperty(a) && this.removeAttribute(a) }, removeStyle: function (b) {
                var a =
                this.$.style; if (!a.removeProperty && (b == "border" || b == "margin" || b == "padding")) { var c = ["top", "left", "right", "bottom"], d; b == "border" && (d = ["color", "style", "width"]); for (var a = [], f = 0; f < c.length; f++) if (d) for (var e = 0; e < d.length; e++) a.push([b, c[f], d[e]].join("-")); else a.push([b, c[f]].join("-")); for (b = 0; b < a.length; b++) this.removeStyle(a[b]) } else { a.removeProperty ? a.removeProperty(b) : a.removeAttribute(CKEDITOR.tools.cssStyleToDomStyle(b)); this.$.style.cssText || this.removeAttribute("style") }
            }, setStyle: function (b,
            a) { this.$.style[CKEDITOR.tools.cssStyleToDomStyle(b)] = a; return this }, setStyles: function (b) { for (var a in b) this.setStyle(a, b[a]); return this }, setOpacity: function (b) { if (CKEDITOR.env.ie && CKEDITOR.env.version < 9) { b = Math.round(b * 100); this.setStyle("filter", b >= 100 ? "" : "progid:DXImageTransform.Microsoft.Alpha(opacity=" + b + ")") } else this.setStyle("opacity", b) }, unselectable: function () {
                this.setStyles(CKEDITOR.tools.cssVendorPrefix("user-select", "none")); if (CKEDITOR.env.ie || CKEDITOR.env.opera) {
                    this.setAttribute("unselectable",
                    "on"); for (var b, a = this.getElementsByTag("*"), c = 0, d = a.count() ; c < d; c++) { b = a.getItem(c); b.setAttribute("unselectable", "on") }
                }
            }, getPositionedAncestor: function () { for (var b = this; b.getName() != "html";) { if (b.getComputedStyle("position") != "static") return b; b = b.getParent() } return null }, getDocumentPosition: function (b) {
                var a = 0, c = 0, d = this.getDocument(), f = d.getBody(), e = d.$.compatMode == "BackCompat"; if (document.documentElement.getBoundingClientRect) {
                    var k = this.$.getBoundingClientRect(), o = d.$.documentElement, m = o.clientTop ||
                    f.$.clientTop || 0, q = o.clientLeft || f.$.clientLeft || 0, l = true; if (CKEDITOR.env.ie) { l = d.getDocumentElement().contains(this); d = d.getBody().contains(this); l = e && d || !e && l } if (l) { a = k.left + (!e && o.scrollLeft || f.$.scrollLeft); a = a - q; c = k.top + (!e && o.scrollTop || f.$.scrollTop); c = c - m }
                } else {
                    f = this; for (d = null; f && !(f.getName() == "body" || f.getName() == "html") ;) {
                        a = a + (f.$.offsetLeft - f.$.scrollLeft); c = c + (f.$.offsetTop - f.$.scrollTop); if (!f.equals(this)) { a = a + (f.$.clientLeft || 0); c = c + (f.$.clientTop || 0) } for (; d && !d.equals(f) ;) {
                            a = a -
                            d.$.scrollLeft; c = c - d.$.scrollTop; d = d.getParent()
                        } d = f; f = (k = f.$.offsetParent) ? new CKEDITOR.dom.element(k) : null
                    }
                } if (b) { f = this.getWindow(); d = b.getWindow(); if (!f.equals(d) && f.$.frameElement) { b = (new CKEDITOR.dom.element(f.$.frameElement)).getDocumentPosition(b); a = a + b.x; c = c + b.y } } if (!document.documentElement.getBoundingClientRect && CKEDITOR.env.gecko && !e) { a = a + (this.$.clientLeft ? 1 : 0); c = c + (this.$.clientTop ? 1 : 0) } return { x: a, y: c }
            }, scrollIntoView: function (b) {
                var a = this.getParent(); if (a) {
                    do {
                        (a.$.clientWidth && a.$.clientWidth <
                        a.$.scrollWidth || a.$.clientHeight && a.$.clientHeight < a.$.scrollHeight) && !a.is("body") && this.scrollIntoParent(a, b, 1); if (a.is("html")) { var c = a.getWindow(); try { var d = c.$.frameElement; d && (a = new CKEDITOR.dom.element(d)) } catch (f) { } }
                    } while (a = a.getParent())
                }
            }, scrollIntoParent: function (a, c, d) {
                var h, f, e, k; function o(c, d) { if (/body|html/.test(a.getName())) a.getWindow().$.scrollBy(c, d); else { a.$.scrollLeft = a.$.scrollLeft + c; a.$.scrollTop = a.$.scrollTop + d } } function m(a, b) {
                    var c = { x: 0, y: 0 }; if (!a.is(l ? "body" : "html")) {
                        var d =
                        a.$.getBoundingClientRect(); c.x = d.left; c.y = d.top
                    } d = a.getWindow(); if (!d.equals(b)) { d = m(CKEDITOR.dom.element.get(d.$.frameElement), b); c.x = c.x + d.x; c.y = c.y + d.y } return c
                } function q(a, b) { return parseInt(a.getComputedStyle("margin-" + b) || 0, 10) || 0 } !a && (a = this.getWindow()); e = a.getDocument(); var l = e.$.compatMode == "BackCompat"; a instanceof CKEDITOR.dom.window && (a = l ? e.getBody() : e.getDocumentElement()); e = a.getWindow(); f = m(this, e); var n = m(a, e), r = this.$.offsetHeight; h = this.$.offsetWidth; var p = a.$.clientHeight, w =
                a.$.clientWidth; e = f.x - q(this, "left") - n.x || 0; k = f.y - q(this, "top") - n.y || 0; h = f.x + h + q(this, "right") - (n.x + w) || 0; f = f.y + r + q(this, "bottom") - (n.y + p) || 0; if (k < 0 || f > 0) o(0, c === true ? k : c === false ? f : k < 0 ? k : f); if (d && (e < 0 || h > 0)) o(e < 0 ? e : h, 0)
            }, setState: function (a, c, d) {
                c = c || "cke"; switch (a) {
                    case CKEDITOR.TRISTATE_ON: this.addClass(c + "_on"); this.removeClass(c + "_off"); this.removeClass(c + "_disabled"); d && this.setAttribute("aria-pressed", true); d && this.removeAttribute("aria-disabled"); break; case CKEDITOR.TRISTATE_DISABLED: this.addClass(c +
                    "_disabled"); this.removeClass(c + "_off"); this.removeClass(c + "_on"); d && this.setAttribute("aria-disabled", true); d && this.removeAttribute("aria-pressed"); break; default: this.addClass(c + "_off"); this.removeClass(c + "_on"); this.removeClass(c + "_disabled"); d && this.removeAttribute("aria-pressed"); d && this.removeAttribute("aria-disabled")
                }
            }, getFrameDocument: function () { var a = this.$; try { a.contentWindow.document } catch (c) { a.src = a.src } return a && new CKEDITOR.dom.document(a.contentWindow.document) }, copyAttributes: function (a,
            c) { for (var d = this.$.attributes, c = c || {}, h = 0; h < d.length; h++) { var f = d[h], e = f.nodeName.toLowerCase(), k; if (!(e in c)) if (e == "checked" && (k = this.getAttribute(e))) a.setAttribute(e, k); else if (f.specified || CKEDITOR.env.ie && f.nodeValue && e == "value") { k = this.getAttribute(e); if (k === null) k = f.nodeValue; a.setAttribute(e, k) } } if (this.$.style.cssText !== "") a.$.style.cssText = this.$.style.cssText }, renameNode: function (a) {
                if (this.getName() != a) {
                    var c = this.getDocument(), a = new CKEDITOR.dom.element(a, c); this.copyAttributes(a);
                    this.moveChildren(a); this.getParent() && this.$.parentNode.replaceChild(a.$, this.$); a.$["data-cke-expando"] = this.$["data-cke-expando"]; this.$ = a.$
                }
            }, getChild: function () { function a(b, c) { var d = b.childNodes; if (c >= 0 && c < d.length) return d[c] } return function (c) { var d = this.$; if (c.slice) for (; c.length > 0 && d;) d = a(d, c.shift()); else d = a(d, c); return d ? new CKEDITOR.dom.node(d) : null } }(), getChildCount: function () { return this.$.childNodes.length }, disableContextMenu: function () {
                this.on("contextmenu", function (a) {
                    a.data.getTarget().hasClass("cke_enable_context_menu") ||
                    a.data.preventDefault()
                })
            }, getDirection: function (a) { return a ? this.getComputedStyle("direction") || this.getDirection() || this.getParent() && this.getParent().getDirection(1) || this.getDocument().$.dir || "ltr" : this.getStyle("direction") || this.getAttribute("dir") }, data: function (a, c) { a = "data-" + a; if (c === void 0) return this.getAttribute(a); c === false ? this.removeAttribute(a) : this.setAttribute(a, c); return null }, getEditor: function () {
                var a = CKEDITOR.instances, c, d; for (c in a) {
                    d = a[c]; if (d.element.equals(this) && d.elementMode !=
                    CKEDITOR.ELEMENT_MODE_APPENDTO) return d
                } return null
            }, find: function (a) { var c = d(this), a = new CKEDITOR.dom.nodeList(this.$.querySelectorAll(e(this, a))); c(); return a }, findOne: function (a) { var c = d(this), a = this.$.querySelector(e(this, a)); c(); return a ? new CKEDITOR.dom.element(a) : null }, forEach: function (a, c, d) { if (!d && (!c || this.type == c)) var h = a(this); if (h !== false) for (var d = this.getChildren(), f = 0; f < d.count() ; f++) { h = d.getItem(f); h.type == CKEDITOR.NODE_ELEMENT ? h.forEach(a, c) : (!c || h.type == c) && a(h) } }
        }); var a = {
            width: ["border-left-width",
            "border-right-width", "padding-left", "padding-right"], height: ["border-top-width", "border-bottom-width", "padding-top", "padding-bottom"]
        }; CKEDITOR.dom.element.prototype.setSize = function (a, d, g) { if (typeof d == "number") { if (g && (!CKEDITOR.env.ie || !CKEDITOR.env.quirks)) d = d - c.call(this, a); this.setStyle(a, d + "px") } }; CKEDITOR.dom.element.prototype.getSize = function (a, d) { var g = Math.max(this.$["offset" + CKEDITOR.tools.capitalize(a)], this.$["client" + CKEDITOR.tools.capitalize(a)]) || 0; d && (g = g - c.call(this, a)); return g }
    }(),
    CKEDITOR.dom.documentFragment = function (d) { d = d || CKEDITOR.document; this.$ = d.type == CKEDITOR.NODE_DOCUMENT ? d.$.createDocumentFragment() : d }, CKEDITOR.tools.extend(CKEDITOR.dom.documentFragment.prototype, CKEDITOR.dom.element.prototype, { type: CKEDITOR.NODE_DOCUMENT_FRAGMENT, insertAfterNode: function (d) { d = d.$; d.parentNode.insertBefore(this.$, d.nextSibling) } }, !0, {
        append: 1, appendBogus: 1, getFirst: 1, getLast: 1, getParent: 1, getNext: 1, getPrevious: 1, appendTo: 1, moveChildren: 1, insertBefore: 1, insertAfterNode: 1, replace: 1,
        trim: 1, type: 1, ltrim: 1, rtrim: 1, getDocument: 1, getChildCount: 1, getChild: 1, getChildren: 1
    }), function () {
        function d(a, b) {
            var c = this.range; if (this._.end) return null; if (!this._.start) { this._.start = 1; if (c.collapsed) { this.end(); return null } c.optimize() } var d, f = c.startContainer; d = c.endContainer; var k = c.startOffset, g = c.endOffset, h, e = this.guard, j = this.type, i = a ? "getPreviousSourceNode" : "getNextSourceNode"; if (!a && !this._.guardLTR) {
                var u = d.type == CKEDITOR.NODE_ELEMENT ? d : d.getParent(), s = d.type == CKEDITOR.NODE_ELEMENT ?
                d.getChild(g) : d.getNext(); this._.guardLTR = function (a, b) { return (!b || !u.equals(a)) && (!s || !a.equals(s)) && (a.type != CKEDITOR.NODE_ELEMENT || !b || !a.equals(c.root)) }
            } if (a && !this._.guardRTL) { var x = f.type == CKEDITOR.NODE_ELEMENT ? f : f.getParent(), t = f.type == CKEDITOR.NODE_ELEMENT ? k ? f.getChild(k - 1) : null : f.getPrevious(); this._.guardRTL = function (a, b) { return (!b || !x.equals(a)) && (!t || !a.equals(t)) && (a.type != CKEDITOR.NODE_ELEMENT || !b || !a.equals(c.root)) } } var z = a ? this._.guardRTL : this._.guardLTR; h = e ? function (a, b) {
                return z(a,
                b) === false ? false : e(a, b)
            } : z; if (this.current) d = this.current[i](false, j, h); else { if (a) d.type == CKEDITOR.NODE_ELEMENT && (d = g > 0 ? d.getChild(g - 1) : h(d, true) === false ? null : d.getPreviousSourceNode(true, j, h)); else { d = f; if (d.type == CKEDITOR.NODE_ELEMENT && !(d = d.getChild(k))) d = h(f, true) === false ? null : f.getNextSourceNode(true, j, h) } d && h(d) === false && (d = null) } for (; d && !this._.end;) { this.current = d; if (!this.evaluator || this.evaluator(d) !== false) { if (!b) return d } else if (b && this.evaluator) return false; d = d[i](false, j, h) } this.end();
            return this.current = null
        } function e(a) { for (var b, c = null; b = d.call(this, a) ;) c = b; return c } function c(a) { if (i(a)) return false; if (a.type == CKEDITOR.NODE_TEXT) return true; if (a.type == CKEDITOR.NODE_ELEMENT) { if (a.is(CKEDITOR.dtd.$inline) || a.getAttribute("contenteditable") == "false") return true; var b; if (b = !CKEDITOR.env.needsBrFiller) if (b = a.is(k)) a: { b = 0; for (var c = a.getChildCount() ; b < c; ++b) if (!i(a.getChild(b))) { b = false; break a } b = true } if (b) return true } return false } CKEDITOR.dom.walker = CKEDITOR.tools.createClass({
            $: function (a) {
                this.range =
                a; this._ = {}
            }, proto: { end: function () { this._.end = 1 }, next: function () { return d.call(this) }, previous: function () { return d.call(this, 1) }, checkForward: function () { return d.call(this, 0, 1) !== false }, checkBackward: function () { return d.call(this, 1, 1) !== false }, lastForward: function () { return e.call(this) }, lastBackward: function () { return e.call(this, 1) }, reset: function () { delete this.current; this._ = {} } }
        }); var a = {
            block: 1, "list-item": 1, table: 1, "table-row-group": 1, "table-header-group": 1, "table-footer-group": 1, "table-row": 1,
            "table-column-group": 1, "table-column": 1, "table-cell": 1, "table-caption": 1
        }, b = { absolute: 1, fixed: 1 }; CKEDITOR.dom.element.prototype.isBlockBoundary = function (c) { return this.getComputedStyle("float") == "none" && !(this.getComputedStyle("position") in b) && a[this.getComputedStyle("display")] ? true : !!(this.is(CKEDITOR.dtd.$block) || c && this.is(c)) }; CKEDITOR.dom.walker.blockBoundary = function (a) { return function (b) { return !(b.type == CKEDITOR.NODE_ELEMENT && b.isBlockBoundary(a)) } }; CKEDITOR.dom.walker.listItemBoundary = function () { return this.blockBoundary({ br: 1 }) };
        CKEDITOR.dom.walker.bookmark = function (a, b) { function c(a) { return a && a.getName && a.getName() == "span" && a.data("cke-bookmark") } return function (d) { var f, k; f = d && d.type != CKEDITOR.NODE_ELEMENT && (k = d.getParent()) && c(k); f = a ? f : f || c(d); return !!(b ^ f) } }; CKEDITOR.dom.walker.whitespaces = function (a) { return function (b) { var c; b && b.type == CKEDITOR.NODE_TEXT && (c = !CKEDITOR.tools.trim(b.getText()) || CKEDITOR.env.webkit && b.getText() == "​"); return !!(a ^ c) } }; CKEDITOR.dom.walker.invisible = function (a) {
            var b = CKEDITOR.dom.walker.whitespaces();
            return function (c) { if (b(c)) c = 1; else { c.type == CKEDITOR.NODE_TEXT && (c = c.getParent()); c = !c.$.offsetHeight } return !!(a ^ c) }
        }; CKEDITOR.dom.walker.nodeType = function (a, b) { return function (c) { return !!(b ^ c.type == a) } }; CKEDITOR.dom.walker.bogus = function (a) {
            function b(a) { return !g(a) && !h(a) } return function (c) {
                var d = CKEDITOR.env.needsBrFiller ? c.is && c.is("br") : c.getText && j.test(c.getText()); if (d) { d = c.getParent(); c = c.getNext(b); d = d.isBlockBoundary() && (!c || c.type == CKEDITOR.NODE_ELEMENT && c.isBlockBoundary()) } return !!(a ^
                d)
            }
        }; CKEDITOR.dom.walker.temp = function (a) { return function (b) { b.type != CKEDITOR.NODE_ELEMENT && (b = b.getParent()); b = b && b.hasAttribute("data-cke-temp"); return !!(a ^ b) } }; var j = /^[\t\r\n ]*(?:&nbsp;|\xa0)$/, g = CKEDITOR.dom.walker.whitespaces(), h = CKEDITOR.dom.walker.bookmark(), f = CKEDITOR.dom.walker.temp(); CKEDITOR.dom.walker.ignored = function (a) { return function (b) { b = g(b) || h(b) || f(b); return !!(a ^ b) } }; var i = CKEDITOR.dom.walker.ignored(), k = function (a) { var b = {}, c; for (c in a) CKEDITOR.dtd[c]["#"] && (b[c] = 1); return b }(CKEDITOR.dtd.$block);
        CKEDITOR.dom.walker.editable = function (a) { return function (b) { return !!(a ^ c(b)) } }; CKEDITOR.dom.element.prototype.getBogus = function () { var a = this; do a = a.getPreviousSourceNode(); while (h(a) || g(a) || a.type == CKEDITOR.NODE_ELEMENT && a.is(CKEDITOR.dtd.$inline) && !a.is(CKEDITOR.dtd.$empty)); return a && (CKEDITOR.env.needsBrFiller ? a.is && a.is("br") : a.getText && j.test(a.getText())) ? a : false }
    }(), CKEDITOR.dom.range = function (d) {
        this.endOffset = this.endContainer = this.startOffset = this.startContainer = null; this.collapsed = true;
        var e = d instanceof CKEDITOR.dom.document; this.document = e ? d : d.getDocument(); this.root = e ? d.getBody() : d
    }, function () {
        function d() { var a = false, b = CKEDITOR.dom.walker.whitespaces(), c = CKEDITOR.dom.walker.bookmark(true), d = CKEDITOR.dom.walker.bogus(); return function (l) { if (c(l) || b(l)) return true; if (d(l) && !a) return a = true; return l.type == CKEDITOR.NODE_TEXT && (l.hasAscendant("pre") || CKEDITOR.tools.trim(l.getText()).length) || l.type == CKEDITOR.NODE_ELEMENT && !l.is(j) ? false : true } } function e(a) {
            var b = CKEDITOR.dom.walker.whitespaces(),
            c = CKEDITOR.dom.walker.bookmark(1); return function (d) { return c(d) || b(d) ? true : !a && g(d) || d.type == CKEDITOR.NODE_ELEMENT && d.is(CKEDITOR.dtd.$removeEmpty) }
        } function c(a) { return function () { var b; return this[a ? "getPreviousNode" : "getNextNode"](function (a) { !b && i(a) && (b = a); return f(a) && !(g(a) && a.equals(b)) }) } } var a = function (a) { a.collapsed = a.startContainer && a.endContainer && a.startContainer.equals(a.endContainer) && a.startOffset == a.endOffset }, b = function (a, b, c, d) {
            a.optimizeBookmark(); var l = a.startContainer, f = a.endContainer,
            g = a.startOffset, h = a.endOffset, j, e; if (f.type == CKEDITOR.NODE_TEXT) f = f.split(h); else if (f.getChildCount() > 0) if (h >= f.getChildCount()) { f = f.append(a.document.createText("")); e = true } else f = f.getChild(h); if (l.type == CKEDITOR.NODE_TEXT) { l.split(g); l.equals(f) && (f = l.getNext()) } else if (g) if (g >= l.getChildCount()) { l = l.append(a.document.createText("")); j = true } else l = l.getChild(g).getPrevious(); else { l = l.append(a.document.createText(""), 1); j = true } var g = l.getParents(), h = f.getParents(), i, v, u; for (i = 0; i < g.length; i++) {
                v =
                g[i]; u = h[i]; if (!v.equals(u)) break
            } for (var s = c, x, t, z, B = i; B < g.length; B++) { x = g[B]; s && !x.equals(l) && (t = s.append(x.clone())); for (x = x.getNext() ; x;) { if (x.equals(h[B]) || x.equals(f)) break; z = x.getNext(); if (b == 2) s.append(x.clone(true)); else { x.remove(); b == 1 && s.append(x) } x = z } s && (s = t) } s = c; for (c = i; c < h.length; c++) {
                x = h[c]; b > 0 && !x.equals(f) && (t = s.append(x.clone())); if (!g[c] || x.$.parentNode != g[c].$.parentNode) for (x = x.getPrevious() ; x;) {
                    if (x.equals(g[c]) || x.equals(l)) break; z = x.getPrevious(); if (b == 2) s.$.insertBefore(x.$.cloneNode(true),
                    s.$.firstChild); else { x.remove(); b == 1 && s.$.insertBefore(x.$, s.$.firstChild) } x = z
                } s && (s = t)
            } if (b == 2) { v = a.startContainer; if (v.type == CKEDITOR.NODE_TEXT) { v.$.data = v.$.data + v.$.nextSibling.data; v.$.parentNode.removeChild(v.$.nextSibling) } a = a.endContainer; if (a.type == CKEDITOR.NODE_TEXT && a.$.nextSibling) { a.$.data = a.$.data + a.$.nextSibling.data; a.$.parentNode.removeChild(a.$.nextSibling) } } else {
                if (v && u && (l.$.parentNode != v.$.parentNode || f.$.parentNode != u.$.parentNode)) {
                    b = u.getIndex(); j && u.$.parentNode == l.$.parentNode &&
                    b--; if (d && v.type == CKEDITOR.NODE_ELEMENT) { d = CKEDITOR.dom.element.createFromHtml('<span data-cke-bookmark="1" style="display:none">&nbsp;</span>', a.document); d.insertAfter(v); v.mergeSiblings(false); a.moveToBookmark({ startNode: d }) } else a.setStart(u.getParent(), b)
                } a.collapse(true)
            } j && l.remove(); e && f.$.parentNode && f.remove()
        }, j = { abbr: 1, acronym: 1, b: 1, bdo: 1, big: 1, cite: 1, code: 1, del: 1, dfn: 1, em: 1, font: 1, i: 1, ins: 1, label: 1, kbd: 1, q: 1, samp: 1, small: 1, span: 1, strike: 1, strong: 1, sub: 1, sup: 1, tt: 1, u: 1, "var": 1 }, g = CKEDITOR.dom.walker.bogus(),
        h = /^[\t\r\n ]*(?:&nbsp;|\xa0)$/, f = CKEDITOR.dom.walker.editable(), i = CKEDITOR.dom.walker.ignored(true); CKEDITOR.dom.range.prototype = {
            clone: function () { var a = new CKEDITOR.dom.range(this.root); a.startContainer = this.startContainer; a.startOffset = this.startOffset; a.endContainer = this.endContainer; a.endOffset = this.endOffset; a.collapsed = this.collapsed; return a }, collapse: function (a) {
                if (a) { this.endContainer = this.startContainer; this.endOffset = this.startOffset } else {
                    this.startContainer = this.endContainer; this.startOffset =
                    this.endOffset
                } this.collapsed = true
            }, cloneContents: function () { var a = new CKEDITOR.dom.documentFragment(this.document); this.collapsed || b(this, 2, a); return a }, deleteContents: function (a) { this.collapsed || b(this, 0, null, a) }, extractContents: function (a) { var c = new CKEDITOR.dom.documentFragment(this.document); this.collapsed || b(this, 1, c, a); return c }, createBookmark: function (a) {
                var b, c, d, l, f = this.collapsed; b = this.document.createElement("span"); b.data("cke-bookmark", 1); b.setStyle("display", "none"); b.setHtml("&nbsp;");
                if (a) { d = "cke_bm_" + CKEDITOR.tools.getNextNumber(); b.setAttribute("id", d + (f ? "C" : "S")) } if (!f) { c = b.clone(); c.setHtml("&nbsp;"); a && c.setAttribute("id", d + "E"); l = this.clone(); l.collapse(); l.insertNode(c) } l = this.clone(); l.collapse(true); l.insertNode(b); if (c) { this.setStartAfter(b); this.setEndBefore(c) } else this.moveToPosition(b, CKEDITOR.POSITION_AFTER_END); return { startNode: a ? d + (f ? "C" : "S") : b, endNode: a ? d + "E" : c, serializable: a, collapsed: f }
            }, createBookmark2: function () {
                function a(b) {
                    var c = b.container, d = b.offset,
                    l; l = c; var f = d; l = l.type != CKEDITOR.NODE_ELEMENT || f === 0 || f == l.getChildCount() ? 0 : l.getChild(f - 1).type == CKEDITOR.NODE_TEXT && l.getChild(f).type == CKEDITOR.NODE_TEXT; if (l) { c = c.getChild(d - 1); d = c.getLength() } c.type == CKEDITOR.NODE_ELEMENT && d > 1 && (d = c.getChild(d - 1).getIndex(true) + 1); if (c.type == CKEDITOR.NODE_TEXT) { l = c; for (f = 0; (l = l.getPrevious()) && l.type == CKEDITOR.NODE_TEXT;) f = f + l.getLength(); d = d + f } b.container = c; b.offset = d
                } return function (b) {
                    var c = this.collapsed, d = { container: this.startContainer, offset: this.startOffset },
                    l = { container: this.endContainer, offset: this.endOffset }; if (b) { a(d); c || a(l) } return { start: d.container.getAddress(b), end: c ? null : l.container.getAddress(b), startOffset: d.offset, endOffset: l.offset, normalized: b, collapsed: c, is2: true }
                }
            }(), moveToBookmark: function (a) {
                if (a.is2) { var b = this.document.getByAddress(a.start, a.normalized), c = a.startOffset, d = a.end && this.document.getByAddress(a.end, a.normalized), a = a.endOffset; this.setStart(b, c); d ? this.setEnd(d, a) : this.collapse(true) } else {
                    b = (c = a.serializable) ? this.document.getById(a.startNode) :
                    a.startNode; a = c ? this.document.getById(a.endNode) : a.endNode; this.setStartBefore(b); b.remove(); if (a) { this.setEndBefore(a); a.remove() } else this.collapse(true)
                }
            }, getBoundaryNodes: function () {
                var a = this.startContainer, b = this.endContainer, c = this.startOffset, d = this.endOffset, l; if (a.type == CKEDITOR.NODE_ELEMENT) { l = a.getChildCount(); if (l > c) a = a.getChild(c); else if (l < 1) a = a.getPreviousSourceNode(); else { for (a = a.$; a.lastChild;) a = a.lastChild; a = new CKEDITOR.dom.node(a); a = a.getNextSourceNode() || a } } if (b.type == CKEDITOR.NODE_ELEMENT) {
                    l =
                    b.getChildCount(); if (l > d) b = b.getChild(d).getPreviousSourceNode(true); else if (l < 1) b = b.getPreviousSourceNode(); else { for (b = b.$; b.lastChild;) b = b.lastChild; b = new CKEDITOR.dom.node(b) }
                } a.getPosition(b) & CKEDITOR.POSITION_FOLLOWING && (a = b); return { startNode: a, endNode: b }
            }, getCommonAncestor: function (a, b) {
                var c = this.startContainer, d = this.endContainer, c = c.equals(d) ? a && c.type == CKEDITOR.NODE_ELEMENT && this.startOffset == this.endOffset - 1 ? c.getChild(this.startOffset) : c : c.getCommonAncestor(d); return b && !c.is ? c.getParent() :
                c
            }, optimize: function () { var a = this.startContainer, b = this.startOffset; a.type != CKEDITOR.NODE_ELEMENT && (b ? b >= a.getLength() && this.setStartAfter(a) : this.setStartBefore(a)); a = this.endContainer; b = this.endOffset; a.type != CKEDITOR.NODE_ELEMENT && (b ? b >= a.getLength() && this.setEndAfter(a) : this.setEndBefore(a)) }, optimizeBookmark: function () {
                var a = this.startContainer, b = this.endContainer; a.is && (a.is("span") && a.data("cke-bookmark")) && this.setStartAt(a, CKEDITOR.POSITION_BEFORE_START); b && (b.is && b.is("span") && b.data("cke-bookmark")) &&
                this.setEndAt(b, CKEDITOR.POSITION_AFTER_END)
            }, trim: function (a, b) {
                var c = this.startContainer, d = this.startOffset, l = this.collapsed; if ((!a || l) && c && c.type == CKEDITOR.NODE_TEXT) {
                    if (d) if (d >= c.getLength()) { d = c.getIndex() + 1; c = c.getParent() } else { var f = c.split(d), d = c.getIndex() + 1, c = c.getParent(); if (this.startContainer.equals(this.endContainer)) this.setEnd(f, this.endOffset - this.startOffset); else if (c.equals(this.endContainer)) this.endOffset = this.endOffset + 1 } else { d = c.getIndex(); c = c.getParent() } this.setStart(c, d);
                    if (l) { this.collapse(true); return }
                } c = this.endContainer; d = this.endOffset; if (!b && !l && c && c.type == CKEDITOR.NODE_TEXT) { if (d) { d >= c.getLength() || c.split(d); d = c.getIndex() + 1 } else d = c.getIndex(); c = c.getParent(); this.setEnd(c, d) }
            }, enlarge: function (a, b) {
                function c(a) { return a && a.type == CKEDITOR.NODE_ELEMENT && a.hasAttribute("contenteditable") ? null : a } var d = RegExp(/[^\s\ufeff]/); switch (a) {
                    case CKEDITOR.ENLARGE_INLINE: var l = 1; case CKEDITOR.ENLARGE_ELEMENT: if (this.collapsed) break; var f = this.getCommonAncestor(), g = this.root,
                    h, j, e, i, v, u = false, s, x; s = this.startContainer; var t = this.startOffset; if (s.type == CKEDITOR.NODE_TEXT) { if (t) { s = !CKEDITOR.tools.trim(s.substring(0, t)).length && s; u = !!s } if (s && !(i = s.getPrevious())) e = s.getParent() } else { t && (i = s.getChild(t - 1) || s.getLast()); i || (e = s) } for (e = c(e) ; e || i;) {
                        if (e && !i) { !v && e.equals(f) && (v = true); if (l ? e.isBlockBoundary() : !g.contains(e)) break; if (!u || e.getComputedStyle("display") != "inline") { u = false; v ? h = e : this.setStartBefore(e) } i = e.getPrevious() } for (; i;) {
                            s = false; if (i.type == CKEDITOR.NODE_COMMENT) i =
                            i.getPrevious(); else {
                                if (i.type == CKEDITOR.NODE_TEXT) { x = i.getText(); d.test(x) && (i = null); s = /[\s\ufeff]$/.test(x) } else if ((i.$.offsetWidth > 0 || b && i.is("br")) && !i.data("cke-bookmark")) if (u && CKEDITOR.dtd.$removeEmpty[i.getName()]) { x = i.getText(); if (d.test(x)) i = null; else for (var t = i.$.getElementsByTagName("*"), z = 0, B; B = t[z++];) if (!CKEDITOR.dtd.$removeEmpty[B.nodeName.toLowerCase()]) { i = null; break } i && (s = !!x.length) } else i = null; s && (u ? v ? h = e : e && this.setStartBefore(e) : u = true); if (i) {
                                    s = i.getPrevious(); if (!e && !s) {
                                        e =
                                        i; i = null; break
                                    } i = s
                                } else e = null
                            }
                        } e && (e = c(e.getParent()))
                    } s = this.endContainer; t = this.endOffset; e = i = null; v = u = false; var F = function (a, b) { var c = new CKEDITOR.dom.range(g); c.setStart(a, b); c.setEndAt(g, CKEDITOR.POSITION_BEFORE_END); var c = new CKEDITOR.dom.walker(c), f; for (c.guard = function (a) { return !(a.type == CKEDITOR.NODE_ELEMENT && a.isBlockBoundary()) }; f = c.next() ;) { if (f.type != CKEDITOR.NODE_TEXT) return false; x = f != a ? f.getText() : f.substring(b); if (d.test(x)) return false } return true }; if (s.type == CKEDITOR.NODE_TEXT) if (CKEDITOR.tools.trim(s.substring(t)).length) u =
                    true; else { u = !s.getLength(); if (t == s.getLength()) { if (!(i = s.getNext())) e = s.getParent() } else F(s, t) && (e = s.getParent()) } else (i = s.getChild(t)) || (e = s); for (; e || i;) {
                        if (e && !i) { !v && e.equals(f) && (v = true); if (l ? e.isBlockBoundary() : !g.contains(e)) break; if (!u || e.getComputedStyle("display") != "inline") { u = false; v ? j = e : e && this.setEndAfter(e) } i = e.getNext() } for (; i;) {
                            s = false; if (i.type == CKEDITOR.NODE_TEXT) { x = i.getText(); F(i, 0) || (i = null); s = /^[\s\ufeff]/.test(x) } else if (i.type == CKEDITOR.NODE_ELEMENT) {
                                if ((i.$.offsetWidth > 0 ||
                                b && i.is("br")) && !i.data("cke-bookmark")) if (u && CKEDITOR.dtd.$removeEmpty[i.getName()]) { x = i.getText(); if (d.test(x)) i = null; else { t = i.$.getElementsByTagName("*"); for (z = 0; B = t[z++];) if (!CKEDITOR.dtd.$removeEmpty[B.nodeName.toLowerCase()]) { i = null; break } } i && (s = !!x.length) } else i = null
                            } else s = 1; s && u && (v ? j = e : this.setEndAfter(e)); if (i) { s = i.getNext(); if (!e && !s) { e = i; i = null; break } i = s } else e = null
                        } e && (e = c(e.getParent()))
                    } if (h && j) { f = h.contains(j) ? j : h; this.setStartBefore(f); this.setEndAfter(f) } break; case CKEDITOR.ENLARGE_BLOCK_CONTENTS: case CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS: e =
                    new CKEDITOR.dom.range(this.root); g = this.root; e.setStartAt(g, CKEDITOR.POSITION_AFTER_START); e.setEnd(this.startContainer, this.startOffset); e = new CKEDITOR.dom.walker(e); var C, D, E = CKEDITOR.dom.walker.blockBoundary(a == CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS ? { br: 1 } : null), I = null, J = function (a) { if (a.type == CKEDITOR.NODE_ELEMENT && a.getAttribute("contenteditable") == "false") if (I) { if (I.equals(a)) { I = null; return } } else I = a; else if (I) return; var b = E(a); b || (C = a); return b }, l = function (a) {
                        var b = J(a); !b && (a.is && a.is("br")) &&
                        (D = a); return b
                    }; e.guard = J; e = e.lastBackward(); C = C || g; this.setStartAt(C, !C.is("br") && (!e && this.checkStartOfBlock() || e && C.contains(e)) ? CKEDITOR.POSITION_AFTER_START : CKEDITOR.POSITION_AFTER_END); if (a == CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS) { e = this.clone(); e = new CKEDITOR.dom.walker(e); var G = CKEDITOR.dom.walker.whitespaces(), P = CKEDITOR.dom.walker.bookmark(); e.evaluator = function (a) { return !G(a) && !P(a) }; if ((e = e.previous()) && e.type == CKEDITOR.NODE_ELEMENT && e.is("br")) break } e = this.clone(); e.collapse(); e.setEndAt(g,
                    CKEDITOR.POSITION_BEFORE_END); e = new CKEDITOR.dom.walker(e); e.guard = a == CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS ? l : J; C = null; e = e.lastForward(); C = C || g; this.setEndAt(C, !e && this.checkEndOfBlock() || e && C.contains(e) ? CKEDITOR.POSITION_BEFORE_END : CKEDITOR.POSITION_BEFORE_START); D && this.setEndAfter(D)
                }
            }, shrink: function (a, b, c) {
                if (!this.collapsed) {
                    var a = a || CKEDITOR.SHRINK_TEXT, d = this.clone(), f = this.startContainer, g = this.endContainer, e = this.startOffset, h = this.endOffset, j = 1, i = 1; if (f && f.type == CKEDITOR.NODE_TEXT) if (e) if (e >=
                    f.getLength()) d.setStartAfter(f); else { d.setStartBefore(f); j = 0 } else d.setStartBefore(f); if (g && g.type == CKEDITOR.NODE_TEXT) if (h) if (h >= g.getLength()) d.setEndAfter(g); else { d.setEndAfter(g); i = 0 } else d.setEndBefore(g); var d = new CKEDITOR.dom.walker(d), A = CKEDITOR.dom.walker.bookmark(); d.evaluator = function (b) { return b.type == (a == CKEDITOR.SHRINK_ELEMENT ? CKEDITOR.NODE_ELEMENT : CKEDITOR.NODE_TEXT) }; var v; d.guard = function (b, d) {
                        if (A(b)) return true; if (a == CKEDITOR.SHRINK_ELEMENT && b.type == CKEDITOR.NODE_TEXT || d && b.equals(v) ||
                        c === false && b.type == CKEDITOR.NODE_ELEMENT && b.isBlockBoundary() || b.type == CKEDITOR.NODE_ELEMENT && b.hasAttribute("contenteditable")) return false; !d && b.type == CKEDITOR.NODE_ELEMENT && (v = b); return true
                    }; if (j) (f = d[a == CKEDITOR.SHRINK_ELEMENT ? "lastForward" : "next"]()) && this.setStartAt(f, b ? CKEDITOR.POSITION_AFTER_START : CKEDITOR.POSITION_BEFORE_START); if (i) { d.reset(); (d = d[a == CKEDITOR.SHRINK_ELEMENT ? "lastBackward" : "previous"]()) && this.setEndAt(d, b ? CKEDITOR.POSITION_BEFORE_END : CKEDITOR.POSITION_AFTER_END) } return !(!j &&
                    !i)
                }
            }, insertNode: function (a) { this.optimizeBookmark(); this.trim(false, true); var b = this.startContainer, c = b.getChild(this.startOffset); c ? a.insertBefore(c) : b.append(a); a.getParent() && a.getParent().equals(this.endContainer) && this.endOffset++; this.setStartBefore(a) }, moveToPosition: function (a, b) { this.setStartAt(a, b); this.collapse(true) }, moveToRange: function (a) { this.setStart(a.startContainer, a.startOffset); this.setEnd(a.endContainer, a.endOffset) }, selectNodeContents: function (a) {
                this.setStart(a, 0); this.setEnd(a,
                a.type == CKEDITOR.NODE_TEXT ? a.getLength() : a.getChildCount())
            }, setStart: function (b, c) { if (b.type == CKEDITOR.NODE_ELEMENT && CKEDITOR.dtd.$empty[b.getName()]) { c = b.getIndex(); b = b.getParent() } this.startContainer = b; this.startOffset = c; if (!this.endContainer) { this.endContainer = b; this.endOffset = c } a(this) }, setEnd: function (b, c) {
                if (b.type == CKEDITOR.NODE_ELEMENT && CKEDITOR.dtd.$empty[b.getName()]) { c = b.getIndex() + 1; b = b.getParent() } this.endContainer = b; this.endOffset = c; if (!this.startContainer) {
                    this.startContainer = b; this.startOffset =
                    c
                } a(this)
            }, setStartAfter: function (a) { this.setStart(a.getParent(), a.getIndex() + 1) }, setStartBefore: function (a) { this.setStart(a.getParent(), a.getIndex()) }, setEndAfter: function (a) { this.setEnd(a.getParent(), a.getIndex() + 1) }, setEndBefore: function (a) { this.setEnd(a.getParent(), a.getIndex()) }, setStartAt: function (b, c) {
                switch (c) {
                    case CKEDITOR.POSITION_AFTER_START: this.setStart(b, 0); break; case CKEDITOR.POSITION_BEFORE_END: b.type == CKEDITOR.NODE_TEXT ? this.setStart(b, b.getLength()) : this.setStart(b, b.getChildCount());
                        break; case CKEDITOR.POSITION_BEFORE_START: this.setStartBefore(b); break; case CKEDITOR.POSITION_AFTER_END: this.setStartAfter(b)
                } a(this)
            }, setEndAt: function (b, c) { switch (c) { case CKEDITOR.POSITION_AFTER_START: this.setEnd(b, 0); break; case CKEDITOR.POSITION_BEFORE_END: b.type == CKEDITOR.NODE_TEXT ? this.setEnd(b, b.getLength()) : this.setEnd(b, b.getChildCount()); break; case CKEDITOR.POSITION_BEFORE_START: this.setEndBefore(b); break; case CKEDITOR.POSITION_AFTER_END: this.setEndAfter(b) } a(this) }, fixBlock: function (a, b) {
                var c =
                this.createBookmark(), d = this.document.createElement(b); this.collapse(a); this.enlarge(CKEDITOR.ENLARGE_BLOCK_CONTENTS); this.extractContents().appendTo(d); d.trim(); d.appendBogus(); this.insertNode(d); this.moveToBookmark(c); return d
            }, splitBlock: function (a) {
                var b = new CKEDITOR.dom.elementPath(this.startContainer, this.root), c = new CKEDITOR.dom.elementPath(this.endContainer, this.root), d = b.block, f = c.block, g = null; if (!b.blockLimit.equals(c.blockLimit)) return null; if (a != "br") {
                    if (!d) {
                        d = this.fixBlock(true, a); f =
                        (new CKEDITOR.dom.elementPath(this.endContainer, this.root)).block
                    } f || (f = this.fixBlock(false, a))
                } a = d && this.checkStartOfBlock(); b = f && this.checkEndOfBlock(); this.deleteContents(); if (d && d.equals(f)) if (b) { g = new CKEDITOR.dom.elementPath(this.startContainer, this.root); this.moveToPosition(f, CKEDITOR.POSITION_AFTER_END); f = null } else if (a) { g = new CKEDITOR.dom.elementPath(this.startContainer, this.root); this.moveToPosition(d, CKEDITOR.POSITION_BEFORE_START); d = null } else { f = this.splitElement(d); d.is("ul", "ol") || d.appendBogus() } return {
                    previousBlock: d,
                    nextBlock: f, wasStartOfBlock: a, wasEndOfBlock: b, elementPath: g
                }
            }, splitElement: function (a) { if (!this.collapsed) return null; this.setEndAt(a, CKEDITOR.POSITION_BEFORE_END); var b = this.extractContents(), c = a.clone(false); b.appendTo(c); c.insertAfter(a); this.moveToPosition(a, CKEDITOR.POSITION_AFTER_END); return c }, removeEmptyBlocksAtEnd: function () {
                function a(d) { return function (a) { return b(a) || (c(a) || a.type == CKEDITOR.NODE_ELEMENT && a.isEmptyInlineRemoveable()) || d.is("table") && a.is("caption") ? false : true } } var b = CKEDITOR.dom.walker.whitespaces(),
                c = CKEDITOR.dom.walker.bookmark(false); return function (b) { for (var c = this.createBookmark(), d = this[b ? "endPath" : "startPath"](), f = d.block || d.blockLimit, g; f && !f.equals(d.root) && !f.getFirst(a(f)) ;) { g = f.getParent(); this[b ? "setEndAt" : "setStartAt"](f, CKEDITOR.POSITION_AFTER_END); f.remove(1); f = g } this.moveToBookmark(c) }
            }(), startPath: function () { return new CKEDITOR.dom.elementPath(this.startContainer, this.root) }, endPath: function () { return new CKEDITOR.dom.elementPath(this.endContainer, this.root) }, checkBoundaryOfElement: function (a,
            b) { var c = b == CKEDITOR.START, d = this.clone(); d.collapse(c); d[c ? "setStartAt" : "setEndAt"](a, c ? CKEDITOR.POSITION_AFTER_START : CKEDITOR.POSITION_BEFORE_END); d = new CKEDITOR.dom.walker(d); d.evaluator = e(c); return d[c ? "checkBackward" : "checkForward"]() }, checkStartOfBlock: function () {
                var a = this.startContainer, b = this.startOffset; if (CKEDITOR.env.ie && b && a.type == CKEDITOR.NODE_TEXT) { a = CKEDITOR.tools.ltrim(a.substring(0, b)); h.test(a) && this.trim(0, 1) } this.trim(); a = new CKEDITOR.dom.elementPath(this.startContainer, this.root);
                b = this.clone(); b.collapse(true); b.setStartAt(a.block || a.blockLimit, CKEDITOR.POSITION_AFTER_START); a = new CKEDITOR.dom.walker(b); a.evaluator = d(); return a.checkBackward()
            }, checkEndOfBlock: function () {
                var a = this.endContainer, b = this.endOffset; if (CKEDITOR.env.ie && a.type == CKEDITOR.NODE_TEXT) { a = CKEDITOR.tools.rtrim(a.substring(b)); h.test(a) && this.trim(1, 0) } this.trim(); a = new CKEDITOR.dom.elementPath(this.endContainer, this.root); b = this.clone(); b.collapse(false); b.setEndAt(a.block || a.blockLimit, CKEDITOR.POSITION_BEFORE_END);
                a = new CKEDITOR.dom.walker(b); a.evaluator = d(); return a.checkForward()
            }, getPreviousNode: function (a, b, c) { var d = this.clone(); d.collapse(1); d.setStartAt(c || this.root, CKEDITOR.POSITION_AFTER_START); c = new CKEDITOR.dom.walker(d); c.evaluator = a; c.guard = b; return c.previous() }, getNextNode: function (a, b, c) { var d = this.clone(); d.collapse(); d.setEndAt(c || this.root, CKEDITOR.POSITION_BEFORE_END); c = new CKEDITOR.dom.walker(d); c.evaluator = a; c.guard = b; return c.next() }, checkReadOnly: function () {
                function a(b, c) {
                    for (; b;) {
                        if (b.type ==
                        CKEDITOR.NODE_ELEMENT) { if (b.getAttribute("contentEditable") == "false" && !b.data("cke-editable")) return 0; if (b.is("html") || b.getAttribute("contentEditable") == "true" && (b.contains(c) || b.equals(c))) break } b = b.getParent()
                    } return 1
                } return function () { var b = this.startContainer, c = this.endContainer; return !(a(b, c) && a(c, b)) }
            }(), moveToElementEditablePosition: function (a, b) {
                if (a.type == CKEDITOR.NODE_ELEMENT && !a.isEditable(false)) { this.moveToPosition(a, b ? CKEDITOR.POSITION_AFTER_END : CKEDITOR.POSITION_BEFORE_START); return true } for (var c =
                0; a;) {
                    if (a.type == CKEDITOR.NODE_TEXT) { b && this.endContainer && this.checkEndOfBlock() && h.test(a.getText()) ? this.moveToPosition(a, CKEDITOR.POSITION_BEFORE_START) : this.moveToPosition(a, b ? CKEDITOR.POSITION_AFTER_END : CKEDITOR.POSITION_BEFORE_START); c = 1; break } if (a.type == CKEDITOR.NODE_ELEMENT) if (a.isEditable()) { this.moveToPosition(a, b ? CKEDITOR.POSITION_BEFORE_END : CKEDITOR.POSITION_AFTER_START); c = 1 } else if (b && a.is("br") && this.endContainer && this.checkEndOfBlock()) this.moveToPosition(a, CKEDITOR.POSITION_BEFORE_START);
                    else if (a.getAttribute("contenteditable") == "false" && a.is(CKEDITOR.dtd.$block)) { this.setStartBefore(a); this.setEndAfter(a); return true } var d = a, f = c, g = void 0; d.type == CKEDITOR.NODE_ELEMENT && d.isEditable(false) && (g = d[b ? "getLast" : "getFirst"](i)); !f && !g && (g = d[b ? "getPrevious" : "getNext"](i)); a = g
                } return !!c
            }, moveToClosestEditablePosition: function (a, b) {
                var c = new CKEDITOR.dom.range(this.root), d = 0, f, g = [CKEDITOR.POSITION_AFTER_END, CKEDITOR.POSITION_BEFORE_START]; c.moveToPosition(a, g[b ? 0 : 1]); if (a.is(CKEDITOR.dtd.$block)) {
                    if (f =
                    c[b ? "getNextEditableNode" : "getPreviousEditableNode"]()) { d = 1; if (f.type == CKEDITOR.NODE_ELEMENT && f.is(CKEDITOR.dtd.$block) && f.getAttribute("contenteditable") == "false") { c.setStartAt(f, CKEDITOR.POSITION_BEFORE_START); c.setEndAt(f, CKEDITOR.POSITION_AFTER_END) } else c.moveToPosition(f, g[b ? 1 : 0]) }
                } else d = 1; d && this.moveToRange(c); return !!d
            }, moveToElementEditStart: function (a) { return this.moveToElementEditablePosition(a) }, moveToElementEditEnd: function (a) { return this.moveToElementEditablePosition(a, true) }, getEnclosedNode: function () {
                var a =
                this.clone(); a.optimize(); if (a.startContainer.type != CKEDITOR.NODE_ELEMENT || a.endContainer.type != CKEDITOR.NODE_ELEMENT) return null; var a = new CKEDITOR.dom.walker(a), b = CKEDITOR.dom.walker.bookmark(false, true), c = CKEDITOR.dom.walker.whitespaces(true); a.evaluator = function (a) { return c(a) && b(a) }; var d = a.next(); a.reset(); return d && d.equals(a.previous()) ? d : null
            }, getTouchedStartNode: function () { var a = this.startContainer; return this.collapsed || a.type != CKEDITOR.NODE_ELEMENT ? a : a.getChild(this.startOffset) || a }, getTouchedEndNode: function () {
                var a =
                this.endContainer; return this.collapsed || a.type != CKEDITOR.NODE_ELEMENT ? a : a.getChild(this.endOffset - 1) || a
            }, getNextEditableNode: c(), getPreviousEditableNode: c(1), scrollIntoView: function () {
                var a = new CKEDITOR.dom.element.createFromHtml("<span>&nbsp;</span>", this.document), b, c, d, f = this.clone(); f.optimize(); if (d = f.startContainer.type == CKEDITOR.NODE_TEXT) { c = f.startContainer.getText(); b = f.startContainer.split(f.startOffset); a.insertAfter(f.startContainer) } else f.insertNode(a); a.scrollIntoView(); if (d) {
                    f.startContainer.setText(c);
                    b.remove()
                } a.remove()
            }
        }
    }(), CKEDITOR.POSITION_AFTER_START = 1, CKEDITOR.POSITION_BEFORE_END = 2, CKEDITOR.POSITION_BEFORE_START = 3, CKEDITOR.POSITION_AFTER_END = 4, CKEDITOR.ENLARGE_ELEMENT = 1, CKEDITOR.ENLARGE_BLOCK_CONTENTS = 2, CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS = 3, CKEDITOR.ENLARGE_INLINE = 4, CKEDITOR.START = 1, CKEDITOR.END = 2, CKEDITOR.SHRINK_ELEMENT = 1, CKEDITOR.SHRINK_TEXT = 2, "use strict", function () {
        function d(a) {
            if (!(arguments.length < 1)) {
                this.range = a; this.forceBrBreak = 0; this.enlargeBr = 1; this.enforceRealBlocks = 0; this._ ||
                (this._ = {})
            }
        } function e(a, b, c) { for (a = a.getNextSourceNode(b, null, c) ; !j(a) ;) a = a.getNextSourceNode(b, null, c); return a } function c(a) { var b = []; a.forEach(function (a) { if (a.getAttribute("contenteditable") == "true") { b.push(a); return false } }, CKEDITOR.NODE_ELEMENT, true); return b } function a(b, d, g, e) {
            a: { e == void 0 && (e = c(g)); for (var h; h = e.shift() ;) if (h.getDtd().p) { e = { element: h, remaining: e }; break a } e = null } if (!e) return 0; if ((h = CKEDITOR.filter.instances[e.element.data("cke-filter")]) && !h.check(d)) return a(b, d, g, e.remaining);
            d = new CKEDITOR.dom.range(e.element); d.selectNodeContents(e.element); d = d.createIterator(); d.enlargeBr = b.enlargeBr; d.enforceRealBlocks = b.enforceRealBlocks; d.activeFilter = d.filter = h; b._.nestedEditable = { element: e.element, container: g, remaining: e.remaining, iterator: d }; return 1
        } var b = /^[\r\n\t ]+$/, j = CKEDITOR.dom.walker.bookmark(false, true), g = CKEDITOR.dom.walker.whitespaces(true), h = function (a) { return j(a) && g(a) }; d.prototype = {
            getNextParagraph: function (c) {
                var d, g, o, m, q, c = c || "p"; if (this._.nestedEditable) {
                    if (d =
                    this._.nestedEditable.iterator.getNextParagraph(c)) { this.activeFilter = this._.nestedEditable.iterator.activeFilter; return d } this.activeFilter = this.filter; if (a(this, c, this._.nestedEditable.container, this._.nestedEditable.remaining)) { this.activeFilter = this._.nestedEditable.iterator.activeFilter; return this._.nestedEditable.iterator.getNextParagraph(c) } this._.nestedEditable = null
                } if (!this.range.root.getDtd()[c]) return null; if (!this._.started) {
                    var l = this.range.clone(); l.shrink(CKEDITOR.SHRINK_ELEMENT, true);
                    g = l.endContainer.hasAscendant("pre", true) || l.startContainer.hasAscendant("pre", true); l.enlarge(this.forceBrBreak && !g || !this.enlargeBr ? CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS : CKEDITOR.ENLARGE_BLOCK_CONTENTS); if (!l.collapsed) {
                        g = new CKEDITOR.dom.walker(l.clone()); var n = CKEDITOR.dom.walker.bookmark(true, true); g.evaluator = n; this._.nextNode = g.next(); g = new CKEDITOR.dom.walker(l.clone()); g.evaluator = n; g = g.previous(); this._.lastNode = g.getNextSourceNode(true); if (this._.lastNode && this._.lastNode.type == CKEDITOR.NODE_TEXT &&
                        !CKEDITOR.tools.trim(this._.lastNode.getText()) && this._.lastNode.getParent().isBlockBoundary()) { n = this.range.clone(); n.moveToPosition(this._.lastNode, CKEDITOR.POSITION_AFTER_END); if (n.checkEndOfBlock()) { n = new CKEDITOR.dom.elementPath(n.endContainer, n.root); this._.lastNode = (n.block || n.blockLimit).getNextSourceNode(true) } } if (!this._.lastNode || !l.root.contains(this._.lastNode)) { this._.lastNode = this._.docEndMarker = l.document.createText(""); this._.lastNode.insertAfter(g) } l = null
                    } this._.started = 1; g = l
                } n =
                this._.nextNode; l = this._.lastNode; for (this._.nextNode = null; n;) {
                    var r = 0, p = n.hasAscendant("pre"), w = n.type != CKEDITOR.NODE_ELEMENT, y = 0; if (w) n.type == CKEDITOR.NODE_TEXT && b.test(n.getText()) && (w = 0); else {
                        var A = n.getName(); if (CKEDITOR.dtd.$block[A] && n.getAttribute("contenteditable") == "false") { d = n; a(this, c, d); break } else if (n.isBlockBoundary(this.forceBrBreak && !p && { br: 1 })) {
                            if (A == "br") w = 1; else if (!g && !n.getChildCount() && A != "hr") { d = n; o = n.equals(l); break } if (g) {
                                g.setEndAt(n, CKEDITOR.POSITION_BEFORE_START); if (A !=
                                "br") this._.nextNode = n
                            } r = 1
                        } else { if (n.getFirst()) { if (!g) { g = this.range.clone(); g.setStartAt(n, CKEDITOR.POSITION_BEFORE_START) } n = n.getFirst(); continue } w = 1 }
                    } if (w && !g) { g = this.range.clone(); g.setStartAt(n, CKEDITOR.POSITION_BEFORE_START) } o = (!r || w) && n.equals(l); if (g && !r) for (; !n.getNext(h) && !o;) { A = n.getParent(); if (A.isBlockBoundary(this.forceBrBreak && !p && { br: 1 })) { r = 1; w = 0; o || A.equals(l); g.setEndAt(A, CKEDITOR.POSITION_BEFORE_END); break } n = A; w = 1; o = n.equals(l); y = 1 } w && g.setEndAt(n, CKEDITOR.POSITION_AFTER_END); n =
                    e(n, y, l); if ((o = !n) || r && g) break
                } if (!d) {
                    if (!g) { this._.docEndMarker && this._.docEndMarker.remove(); return this._.nextNode = null } d = new CKEDITOR.dom.elementPath(g.startContainer, g.root); n = d.blockLimit; r = { div: 1, th: 1, td: 1 }; d = d.block; if (!d && n && !this.enforceRealBlocks && r[n.getName()] && g.checkStartOfBlock() && g.checkEndOfBlock() && !n.equals(g.root)) d = n; else if (!d || this.enforceRealBlocks && d.getName() == "li") { d = this.range.document.createElement(c); g.extractContents().appendTo(d); d.trim(); g.insertNode(d); m = q = true } else if (d.getName() !=
                    "li") { if (!g.checkStartOfBlock() || !g.checkEndOfBlock()) { d = d.clone(false); g.extractContents().appendTo(d); d.trim(); q = g.splitBlock(); m = !q.wasStartOfBlock; q = !q.wasEndOfBlock; g.insertNode(d) } } else if (!o) this._.nextNode = d.equals(l) ? null : e(g.getBoundaryNodes().endNode, 1, l)
                } if (m) (m = d.getPrevious()) && m.type == CKEDITOR.NODE_ELEMENT && (m.getName() == "br" ? m.remove() : m.getLast() && m.getLast().$.nodeName.toLowerCase() == "br" && m.getLast().remove()); if (q) (m = d.getLast()) && m.type == CKEDITOR.NODE_ELEMENT && m.getName() == "br" &&
                (!CKEDITOR.env.needsBrFiller || m.getPrevious(j) || m.getNext(j)) && m.remove(); if (!this._.nextNode) this._.nextNode = o || d.equals(l) || !l ? null : e(d, 1, l); return d
            }
        }; CKEDITOR.dom.range.prototype.createIterator = function () { return new d(this) }
    }(), CKEDITOR.command = function (d, e) {
        this.uiItems = []; this.exec = function (a) { if (this.state == CKEDITOR.TRISTATE_DISABLED || !this.checkAllowed()) return false; this.editorFocus && d.focus(); return this.fire("exec") === false ? true : e.exec.call(this, d, a) !== false }; this.refresh = function (a, b) {
            if (!this.readOnly &&
            a.readOnly) return true; if (this.context && !b.isContextFor(this.context)) { this.disable(); return true } if (!this.checkAllowed(true)) { this.disable(); return true } this.startDisabled || this.enable(); this.modes && !this.modes[a.mode] && this.disable(); return this.fire("refresh", { editor: a, path: b }) === false ? true : e.refresh && e.refresh.apply(this, arguments) !== false
        }; var c; this.checkAllowed = function (a) { return !a && typeof c == "boolean" ? c : c = d.activeFilter.checkFeature(this) }; CKEDITOR.tools.extend(this, e, {
            modes: { wysiwyg: 1 }, editorFocus: 1,
            contextSensitive: !!e.context, state: CKEDITOR.TRISTATE_DISABLED
        }); CKEDITOR.event.call(this)
    }, CKEDITOR.command.prototype = {
        enable: function () { this.state == CKEDITOR.TRISTATE_DISABLED && this.checkAllowed() && this.setState(!this.preserveState || typeof this.previousState == "undefined" ? CKEDITOR.TRISTATE_OFF : this.previousState) }, disable: function () { this.setState(CKEDITOR.TRISTATE_DISABLED) }, setState: function (d) {
            if (this.state == d || d != CKEDITOR.TRISTATE_DISABLED && !this.checkAllowed()) return false; this.previousState = this.state;
            this.state = d; this.fire("state"); return true
        }, toggleState: function () { this.state == CKEDITOR.TRISTATE_OFF ? this.setState(CKEDITOR.TRISTATE_ON) : this.state == CKEDITOR.TRISTATE_ON && this.setState(CKEDITOR.TRISTATE_OFF) }
    }, CKEDITOR.event.implementOn(CKEDITOR.command.prototype), CKEDITOR.ENTER_P = 1, CKEDITOR.ENTER_BR = 2, CKEDITOR.ENTER_DIV = 3, CKEDITOR.config = {
        customConfig: "config.js", autoUpdateElement: !0, language: "", defaultLanguage: "en", contentsLangDirection: "", enterMode: CKEDITOR.ENTER_P, forceEnterMode: !1, shiftEnterMode: CKEDITOR.ENTER_BR,
        docType: "<!DOCTYPE html>", bodyId: "", bodyClass: "", fullPage: !1, height: 200, extraPlugins: "", removePlugins: "", protectedSource: [], tabIndex: 0, width: "", baseFloatZIndex: 1E4, blockedKeystrokes: [CKEDITOR.CTRL + 66, CKEDITOR.CTRL + 73, CKEDITOR.CTRL + 85, CKEDITOR.CTRL + 89, CKEDITOR.CTRL + 90, CKEDITOR.CTRL + CKEDITOR.SHIFT + 90]
    }, function () {
        function d(a, c, d, f, g) {
            var l = c.name; if ((f || typeof a.elements != "function" || a.elements(l)) && (!a.match || a.match(c))) {
                if (f = !g) {
                    a: if (a.nothingRequired) f = true; else {
                        if (g = a.requiredClasses) {
                            l = c.classes;
                            for (f = 0; f < g.length; ++f) if (CKEDITOR.tools.indexOf(l, g[f]) == -1) { f = false; break a }
                        } f = b(c.styles, a.requiredStyles) && b(c.attributes, a.requiredAttributes)
                    } f = !f
                } if (!f) {
                    if (!a.propertiesOnly) d.valid = true; if (!d.allAttributes) d.allAttributes = e(a.attributes, c.attributes, d.validAttributes); if (!d.allStyles) d.allStyles = e(a.styles, c.styles, d.validStyles); if (!d.allClasses) {
                        a = a.classes; c = c.classes; f = d.validClasses; if (a) if (a === true) c = true; else { for (var g = 0, l = c.length, h; g < l; ++g) { h = c[g]; f[h] || (f[h] = a(h)) } c = false } else c =
                        false; d.allClasses = c
                    }
                }
            }
        } function e(a, b, c) { if (!a) return false; if (a === true) return true; for (var d in b) c[d] || (c[d] = a(d, b[d])); return false } function c(a, b) { if (!a) return false; if (a === true) return a; if (typeof a == "string") { a = u(a); return a == "*" ? true : CKEDITOR.tools.convertArrayToObject(a.split(b)) } if (CKEDITOR.tools.isArray(a)) return a.length ? CKEDITOR.tools.convertArrayToObject(a) : false; var c = {}, d = 0, f; for (f in a) { c[f] = a[f]; d++ } return d ? c : false } function a(a) {
            if (a._.filterFunction) return a._.filterFunction; var b =
            /^cke:(object|embed|param)$/, c = /^(object|embed|param)$/; return a._.filterFunction = function (g, l, e, h, j, p, y) {
                var w = g.name, r, A = false; if (j) g.name = w = w.replace(b, "$1"); if (e = e && e[w]) { f(g); for (w = 0; w < e.length; ++w) n(a, g, e[w]); i(g) } if (l) {
                    var w = g.name, e = l.elements[w], o = l.generic, l = { valid: false, validAttributes: {}, validClasses: {}, validStyles: {}, allAttributes: false, allClasses: false, allStyles: false }; if (!e && !o) { h.push(g); return true } f(g); if (e) { w = 0; for (r = e.length; w < r; ++w) d(e[w], g, l, true, p) } if (o) {
                        w = 0; for (r = o.length; w <
                        r; ++w) d(o[w], g, l, false, p)
                    } if (!l.valid) { h.push(g); return true } p = l.validAttributes; w = l.validStyles; e = l.validClasses; r = g.attributes; var o = g.styles, u = r["class"], m = r.style, q, v, s = [], t = [], z = /^data-cke-/, x = false; delete r.style; delete r["class"]; if (!l.allAttributes) for (q in r) if (!p[q]) if (z.test(q)) { if (q != (v = q.replace(/^data-cke-saved-/, "")) && !p[v]) { delete r[q]; x = true } } else { delete r[q]; x = true } if (l.allStyles) { if (m) r.style = m } else { for (q in o) w[q] ? s.push(q + ":" + o[q]) : x = true; if (s.length) r.style = s.sort().join("; ") } if (l.allClasses) u &&
                    (r["class"] = u); else { for (q in e) e[q] && t.push(q); t.length && (r["class"] = t.sort().join(" ")); u && t.length < u.split(/\s+/).length && (x = true) } x && (A = true); if (!y && !k(g)) { h.push(g); return true }
                } if (j) g.name = g.name.replace(c, "cke:$1"); return A
            }
        } function b(a, b) { if (!b) return true; for (var c = 0; c < b.length; ++c) if (!(b[c] in a)) return false; return true } function j(a) { if (!a) return {}; for (var a = a.split(/\s*,\s*/).sort(), b = {}; a.length;) b[a.shift()] = s; return b } function g(a) {
            for (var b, c, d, f, g = {}, l = 1, a = u(a) ; b = a.match(B) ;) {
                if (c =
                b[2]) { d = h(c, "styles"); f = h(c, "attrs"); c = h(c, "classes") } else d = f = c = null; g["$" + l++] = { elements: b[1], classes: c, styles: d, attributes: f }; a = a.slice(b[0].length)
            } return g
        } function h(a, b) { var c = a.match(F[b]); return c ? u(c[1]) : null } function f(a) { if (!a.styles) a.styles = CKEDITOR.tools.parseCssText(a.attributes.style || "", 1); if (!a.classes) a.classes = a.attributes["class"] ? a.attributes["class"].split(/\s+/) : [] } function i(a) {
            var b = a.attributes, c; delete b.style; delete b["class"]; if (c = CKEDITOR.tools.writeCssText(a.styles,
            true)) b.style = c; a.classes.length && (b["class"] = a.classes.sort().join(" "))
        } function k(a) { switch (a.name) { case "a": if (!a.children.length && !a.attributes.name) return false; break; case "img": if (!a.attributes.src) return false } return true } function o(a) { return !a ? false : a === true ? true : function (b) { return b in a } } function m() { return new CKEDITOR.htmlParser.element("br") } function q(a) { return a.type == CKEDITOR.NODE_ELEMENT && (a.name == "br" || A.$block[a.name]) } function l(a, b, c) {
            var d = a.name; if (A.$empty[d] || !a.children.length) if (d ==
            "hr" && b == "br") a.replaceWith(m()); else { a.parent && c.push({ check: "it", el: a.parent }); a.remove() } else if (A.$block[d] || d == "tr") if (b == "br") { if (a.previous && !q(a.previous)) { b = m(); b.insertBefore(a) } if (a.next && !q(a.next)) { b = m(); b.insertAfter(a) } a.replaceWithChildren() } else {
                var d = a.children, f; b: { f = A[b]; for (var g = 0, l = d.length, e; g < l; ++g) { e = d[g]; if (e.type == CKEDITOR.NODE_ELEMENT && !f[e.name]) { f = false; break b } } f = true } if (f) { a.name = b; a.attributes = {}; c.push({ check: "parent-down", el: a }) } else {
                    f = a.parent; for (var g = f.type ==
                    CKEDITOR.NODE_DOCUMENT_FRAGMENT || f.name == "body", h, l = d.length; l > 0;) { e = d[--l]; if (g && (e.type == CKEDITOR.NODE_TEXT || e.type == CKEDITOR.NODE_ELEMENT && A.$inline[e.name])) { if (!h) { h = new CKEDITOR.htmlParser.element(b); h.insertAfter(a); c.push({ check: "parent-down", el: h }) } h.add(e, 0) } else { h = null; e.insertAfter(a); f.type != CKEDITOR.NODE_DOCUMENT_FRAGMENT && (e.type == CKEDITOR.NODE_ELEMENT && !A[f.name][e.name]) && c.push({ check: "el-up", el: e }) } } a.remove()
                }
            } else if (d == "style") a.remove(); else {
                a.parent && c.push({ check: "it", el: a.parent });
                a.replaceWithChildren()
            }
        } function n(a, b, c) { var d, f; for (d = 0; d < c.length; ++d) { f = c[d]; if ((!f.check || a.check(f.check, false)) && (!f.left || f.left(b))) { f.right(b, C); break } } } function r(a, b) { var c = b.getDefinition(), d = c.attributes, f = c.styles, g, l, e, h; if (a.name != c.element) return false; for (g in d) if (g == "class") { c = d[g].split(/\s+/); for (e = a.classes.join("|") ; h = c.pop() ;) if (e.indexOf(h) == -1) return false } else if (a.attributes[g] != d[g]) return false; for (l in f) if (a.styles[l] != f[l]) return false; return true } function p(a,
        b) { var c, d; if (typeof a == "string") c = a; else if (a instanceof CKEDITOR.style) d = a; else { c = a[0]; d = a[1] } return [{ element: c, left: d, right: function (a, c) { c.transform(a, b) } }] } function w(a) { return function (b) { return r(b, a) } } function y(a) { return function (b, c) { c[a](b) } } var A = CKEDITOR.dtd, v = CKEDITOR.tools.copy, u = CKEDITOR.tools.trim, s = "cke-test", x = ["", "p", "br", "div"]; CKEDITOR.filter = function (a) {
            this.allowedContent = []; this.disabled = false; this.editor = null; this.id = CKEDITOR.tools.getNextNumber(); this._ = {
                rules: {}, transformations: {},
                cachedTests: {}
            }; CKEDITOR.filter.instances[this.id] = this; if (a instanceof CKEDITOR.editor) { a = this.editor = a; this.customConfig = true; var b = a.config.allowedContent; if (b === true) this.disabled = true; else { if (!b) this.customConfig = false; this.allow(b, "config", 1); this.allow(a.config.extraAllowedContent, "extra", 1); this.allow(x[a.enterMode] + " " + x[a.shiftEnterMode], "default", 1) } } else { this.customConfig = false; this.allow(a, "default", 1) }
        }; CKEDITOR.filter.instances = {}; CKEDITOR.filter.prototype = {
            allow: function (a, b, d) {
                if (this.disabled ||
                this.customConfig && !d || !a) return false; this._.cachedChecks = {}; var f, l; if (typeof a == "string") a = g(a); else if (a instanceof CKEDITOR.style) { l = a.getDefinition(); d = {}; a = l.attributes; d[l.element] = l = { styles: l.styles, requiredStyles: l.styles && CKEDITOR.tools.objectKeys(l.styles) }; if (a) { a = v(a); l.classes = a["class"] ? a["class"].split(/\s+/) : null; l.requiredClasses = l.classes; delete a["class"]; l.attributes = a; l.requiredAttributes = a && CKEDITOR.tools.objectKeys(a) } a = d } else if (CKEDITOR.tools.isArray(a)) {
                    for (f = 0; f < a.length; ++f) l =
                    this.allow(a[f], b, d); return l
                } var e, d = []; for (e in a) {
                    l = a[e]; l = typeof l == "boolean" ? {} : typeof l == "function" ? { match: l } : v(l); if (e.charAt(0) != "$") l.elements = e; if (b) l.featureName = b.toLowerCase(); var h = l; h.elements = c(h.elements, /\s+/) || null; h.propertiesOnly = h.propertiesOnly || h.elements === true; var j = /\s*,\s*/, n = void 0; for (n in t) {
                        h[n] = c(h[n], j) || null; var p = h, i = z[n], k = c(h[z[n]], j), w = h[n], y = [], r = true, A = void 0; k ? r = false : k = {}; for (A in w) if (A.charAt(0) == "!") { A = A.slice(1); y.push(A); k[A] = true; r = false } for (; A = y.pop() ;) {
                            w[A] =
                            w["!" + A]; delete w["!" + A]
                        } p[i] = (r ? false : k) || null
                    } h.match = h.match || null; this.allowedContent.push(l); d.push(l)
                } b = this._.rules; e = b.elements || {}; a = b.generic || []; l = 0; for (h = d.length; l < h; ++l) {
                    j = v(d[l]); n = j.classes === true || j.styles === true || j.attributes === true; p = j; i = void 0; for (i in t) p[i] = o(p[i]); k = true; for (i in z) { i = z[i]; p[i] = CKEDITOR.tools.objectKeys(p[i]); p[i] && (k = false) } p.nothingRequired = k; if (j.elements === true || j.elements === null) { j.elements = o(j.elements); a[n ? "unshift" : "push"](j) } else {
                        p = j.elements; delete j.elements;
                        for (f in p) if (e[f]) e[f][n ? "unshift" : "push"](j); else e[f] = [j]
                    }
                } b.elements = e; b.generic = a.length ? a : null; return true
            }, applyTo: function (b, c, d, f) {
                if (this.disabled) return false; var g = [], e = !d && this._.rules, h = this._.transformations, j = a(this), n = this.editor && this.editor.config.protectedSource, p = false; b.forEach(function (a) {
                    if (a.type == CKEDITOR.NODE_ELEMENT) {
                        if (a.attributes["data-cke-filter"] == "off") return false; if (!c || !(a.name == "span" && ~CKEDITOR.tools.objectKeys(a.attributes).join("|").indexOf("data-cke-"))) j(a,
                        e, h, g, c) && (p = true)
                    } else if (a.type == CKEDITOR.NODE_COMMENT && a.value.match(/^\{cke_protected\}(?!\{C\})/)) { var b; a: { var d = decodeURIComponent(a.value.replace(/^\{cke_protected\}/, "")); b = []; var f, l, i; if (n) for (l = 0; l < n.length; ++l) if ((i = d.match(n[l])) && i[0].length == d.length) { b = true; break a } d = CKEDITOR.htmlParser.fragment.fromHtml(d); d.children.length == 1 && (f = d.children[0]).type == CKEDITOR.NODE_ELEMENT && j(f, e, h, b, c); b = !b.length } b || g.push(a) }
                }, null, true); g.length && (p = true); for (var i, b = [], f = x[f || (this.editor ? this.editor.enterMode :
                CKEDITOR.ENTER_P)]; d = g.pop() ;) d.type == CKEDITOR.NODE_ELEMENT ? l(d, f, b) : d.remove(); for (; i = b.pop() ;) { d = i.el; if (d.parent) switch (i.check) { case "it": A.$removeEmpty[d.name] && !d.children.length ? l(d, f, b) : k(d) || l(d, f, b); break; case "el-up": d.parent.type != CKEDITOR.NODE_DOCUMENT_FRAGMENT && !A[d.parent.name][d.name] && l(d, f, b); break; case "parent-down": d.parent.type != CKEDITOR.NODE_DOCUMENT_FRAGMENT && !A[d.parent.name][d.name] && l(d.parent, f, b) } } return p
            }, checkFeature: function (a) {
                if (this.disabled || !a) return true; a.toFeature &&
                (a = a.toFeature(this.editor)); return !a.requiredContent || this.check(a.requiredContent)
            }, disable: function () { this.disabled = true }, addContentForms: function (a) { if (!this.disabled && a) { var b, c, d = [], f; for (b = 0; b < a.length && !f; ++b) { c = a[b]; if ((typeof c == "string" || c instanceof CKEDITOR.style) && this.check(c)) f = c } if (f) { for (b = 0; b < a.length; ++b) d.push(p(a[b], f)); this.addTransformations(d) } } }, addFeature: function (a) {
                if (this.disabled || !a) return true; a.toFeature && (a = a.toFeature(this.editor)); this.allow(a.allowedContent, a.name);
                this.addTransformations(a.contentTransformations); this.addContentForms(a.contentForms); return this.customConfig && a.requiredContent ? this.check(a.requiredContent) : true
            }, addTransformations: function (a) {
                var b, c; if (!this.disabled && a) {
                    var d = this._.transformations, f; for (f = 0; f < a.length; ++f) {
                        b = a[f]; var g = void 0, l = void 0, e = void 0, h = void 0, j = void 0, i = void 0; c = []; for (l = 0; l < b.length; ++l) {
                            e = b[l]; if (typeof e == "string") { e = e.split(/\s*:\s*/); h = e[0]; j = null; i = e[1] } else { h = e.check; j = e.left; i = e.right } if (!g) {
                                g = e; g = g.element ?
                                g.element : h ? h.match(/^([a-z0-9]+)/i)[0] : g.left.getDefinition().element
                            } j instanceof CKEDITOR.style && (j = w(j)); c.push({ check: h == g ? null : h, left: j, right: typeof i == "string" ? y(i) : i })
                        } b = g; d[b] || (d[b] = []); d[b].push(c)
                    }
                }
            }, check: function (b, c, d) {
                if (this.disabled) return true; if (CKEDITOR.tools.isArray(b)) { for (var f = b.length; f--;) if (this.check(b[f], c, d)) return true; return false } var l, e; if (typeof b == "string") {
                    e = b + "<" + (c === false ? "0" : "1") + (d ? "1" : "0") + ">"; if (e in this._.cachedChecks) return this._.cachedChecks[e]; f =
                    g(b).$1; l = f.styles; var h = f.classes; f.name = f.elements; f.classes = h = h ? h.split(/\s*,\s*/) : []; f.styles = j(l); f.attributes = j(f.attributes); f.children = []; h.length && (f.attributes["class"] = h.join(" ")); if (l) f.attributes.style = CKEDITOR.tools.writeCssText(f.styles); l = f
                } else { f = b.getDefinition(); l = f.styles; h = f.attributes || {}; if (l) { l = v(l); h.style = CKEDITOR.tools.writeCssText(l, true) } else l = {}; l = { name: f.element, attributes: h, classes: h["class"] ? h["class"].split(/\s+/) : [], styles: l, children: [] } } var h = CKEDITOR.tools.clone(l),
                p = [], k; if (c !== false && (k = this._.transformations[l.name])) { for (f = 0; f < k.length; ++f) n(this, l, k[f]); i(l) } a(this)(h, this._.rules, c === false ? false : this._.transformations, p, false, !d, !d); c = p.length > 0 ? false : CKEDITOR.tools.objectCompare(l.attributes, h.attributes, true) ? true : false; typeof b == "string" && (this._.cachedChecks[e] = c); return c
            }, getAllowedEnterMode: function () {
                var a = ["p", "div", "br"], b = { p: CKEDITOR.ENTER_P, div: CKEDITOR.ENTER_DIV, br: CKEDITOR.ENTER_BR }; return function (c, d) {
                    var f = a.slice(), g; if (this.check(x[c])) return c;
                    for (d || (f = f.reverse()) ; g = f.pop() ;) if (this.check(g)) return b[g]; return CKEDITOR.ENTER_BR
                }
            }()
        }; var t = { styles: 1, attributes: 1, classes: 1 }, z = { styles: "requiredStyles", attributes: "requiredAttributes", classes: "requiredClasses" }, B = /^([a-z0-9*\s]+)((?:\s*\{[!\w\-,\s\*]+\}\s*|\s*\[[!\w\-,\s\*]+\]\s*|\s*\([!\w\-,\s\*]+\)\s*){0,3})(?:;\s*|$)/i, F = { styles: /{([^}]+)}/, attrs: /\[([^\]]+)\]/, classes: /\(([^\)]+)\)/ }, C = CKEDITOR.filter.transformationsTools = {
            sizeToStyle: function (a) {
                this.lengthToStyle(a, "width"); this.lengthToStyle(a,
                "height")
            }, sizeToAttribute: function (a) { this.lengthToAttribute(a, "width"); this.lengthToAttribute(a, "height") }, lengthToStyle: function (a, b, c) { c = c || b; if (!(c in a.styles)) { var d = a.attributes[b]; if (d) { /^\d+$/.test(d) && (d = d + "px"); a.styles[c] = d } } delete a.attributes[b] }, lengthToAttribute: function (a, b, c) { c = c || b; if (!(c in a.attributes)) { var d = a.styles[b], f = d && d.match(/^(\d+)(?:\.\d*)?px$/); f ? a.attributes[c] = f[1] : d == s && (a.attributes[c] = s) } delete a.styles[b] }, alignmentToStyle: function (a) {
                if (!("float" in a.styles)) {
                    var b =
                    a.attributes.align; if (b == "left" || b == "right") a.styles["float"] = b
                } delete a.attributes.align
            }, alignmentToAttribute: function (a) { if (!("align" in a.attributes)) { var b = a.styles["float"]; if (b == "left" || b == "right") a.attributes.align = b } delete a.styles["float"] }, matchesStyle: r, transform: function (a, b) {
                if (typeof b == "string") a.name = b; else {
                    var c = b.getDefinition(), d = c.styles, f = c.attributes, g, l, e, h; a.name = c.element; for (g in f) if (g == "class") {
                        c = a.classes.join("|"); for (e = f[g].split(/\s+/) ; h = e.pop() ;) c.indexOf(h) == -1 &&
                        a.classes.push(h)
                    } else a.attributes[g] = f[g]; for (l in d) a.styles[l] = d[l]
                }
            }
        }
    }(), function () {
        CKEDITOR.focusManager = function (d) { if (d.focusManager) return d.focusManager; this.hasFocus = false; this.currentActive = null; this._ = { editor: d }; return this }; CKEDITOR.focusManager._ = { blurDelay: 200 }; CKEDITOR.focusManager.prototype = {
            focus: function (d) {
                this._.timer && clearTimeout(this._.timer); if (d) this.currentActive = d; if (!this.hasFocus && !this._.locked) {
                    (d = CKEDITOR.currentInstance) && d.focusManager.blur(1); this.hasFocus = true;
                    (d = this._.editor.container) && d.addClass("cke_focus"); this._.editor.fire("focus")
                }
            }, lock: function () { this._.locked = 1 }, unlock: function () { delete this._.locked }, blur: function (d) {
                function e() { if (this.hasFocus) { this.hasFocus = false; var a = this._.editor.container; a && a.removeClass("cke_focus"); this._.editor.fire("blur") } } if (!this._.locked) {
                    this._.timer && clearTimeout(this._.timer); var c = CKEDITOR.focusManager._.blurDelay; d || !c ? e.call(this) : this._.timer = CKEDITOR.tools.setTimeout(function () {
                        delete this._.timer;
                        e.call(this)
                    }, c, this)
                }
            }, add: function (d, e) { var c = d.getCustomData("focusmanager"); if (!c || c != this) { c && c.remove(d); var c = "focus", a = "blur"; if (e) if (CKEDITOR.env.ie) { c = "focusin"; a = "focusout" } else CKEDITOR.event.useCapture = 1; var b = { blur: function () { d.equals(this.currentActive) && this.blur() }, focus: function () { this.focus(d) } }; d.on(c, b.focus, this); d.on(a, b.blur, this); if (e) CKEDITOR.event.useCapture = 0; d.setCustomData("focusmanager", this); d.setCustomData("focusmanager_handlers", b) } }, remove: function (d) {
                d.removeCustomData("focusmanager");
                var e = d.removeCustomData("focusmanager_handlers"); d.removeListener("blur", e.blur); d.removeListener("focus", e.focus)
            }
        }
    }(), CKEDITOR.keystrokeHandler = function (d) { if (d.keystrokeHandler) return d.keystrokeHandler; this.keystrokes = {}; this.blockedKeystrokes = {}; this._ = { editor: d }; return this }, function () {
        var d, e = function (a) {
            var a = a.data, b = a.getKeystroke(), c = this.keystrokes[b], g = this._.editor; d = g.fire("key", { keyCode: b }) === false; if (!d) { c && (d = g.execCommand(c, { from: "keystrokeHandler" }) !== false); d || (d = !!this.blockedKeystrokes[b]) } d &&
            a.preventDefault(true); return !d
        }, c = function (a) { if (d) { d = false; a.data.preventDefault(true) } }; CKEDITOR.keystrokeHandler.prototype = { attach: function (a) { a.on("keydown", e, this); if (CKEDITOR.env.opera || CKEDITOR.env.gecko && CKEDITOR.env.mac) a.on("keypress", c, this) } }
    }(), function () {
        CKEDITOR.lang = {
            languages: {
                af: 1, ar: 1, bg: 1, bn: 1, bs: 1, ca: 1, cs: 1, cy: 1, da: 1, de: 1, el: 1, "en-au": 1, "en-ca": 1, "en-gb": 1, en: 1, eo: 1, es: 1, et: 1, eu: 1, fa: 1, fi: 1, fo: 1, "fr-ca": 1, fr: 1, gl: 1, gu: 1, he: 1, hi: 1, hr: 1, hu: 1, id: 1, is: 1, it: 1, ja: 1, ka: 1, km: 1, ko: 1,
                ku: 1, lt: 1, lv: 1, mk: 1, mn: 1, ms: 1, nb: 1, nl: 1, no: 1, pl: 1, "pt-br": 1, pt: 1, ro: 1, ru: 1, si: 1, sk: 1, sl: 1, sq: 1, "sr-latn": 1, sr: 1, sv: 1, th: 1, tr: 1, ug: 1, uk: 1, vi: 1, "zh-cn": 1, zh: 1
            }, rtl: { ar: 1, fa: 1, he: 1, ku: 1, ug: 1 }, load: function (d, e, c) { if (!d || !CKEDITOR.lang.languages[d]) d = this.detect(e, d); this[d] ? c(d, this[d]) : CKEDITOR.scriptLoader.load(CKEDITOR.getUrl("lang/" + d + ".js"), function () { this[d].dir = this.rtl[d] ? "rtl" : "ltr"; c(d, this[d]) }, this) }, detect: function (d, e) {
                var c = this.languages, e = e || navigator.userLanguage || navigator.language ||
                d, a = e.toLowerCase().match(/([a-z]+)(?:-([a-z]+))?/), b = a[1], a = a[2]; c[b + "-" + a] ? b = b + "-" + a : c[b] || (b = null); CKEDITOR.lang.detect = b ? function () { return b } : function (a) { return a }; return b || d
            }
        }
    }(), CKEDITOR.scriptLoader = function () {
        var d = {}, e = {}; return {
            load: function (c, a, b, j) {
                var g = typeof c == "string"; g && (c = [c]); b || (b = CKEDITOR); var h = c.length, f = [], i = [], k = function (c) { a && (g ? a.call(b, c) : a.call(b, f, i)) }; if (h === 0) k(true); else {
                    var o = function (a, b) {
                        (b ? f : i).push(a); if (--h <= 0) {
                            j && CKEDITOR.document.getDocumentElement().removeStyle("cursor");
                            k(b)
                        }
                    }, m = function (a, b) { d[a] = 1; var c = e[a]; delete e[a]; for (var f = 0; f < c.length; f++) c[f](a, b) }, q = function (b) {
                        if (d[b]) o(b, true); else {
                            var c = e[b] || (e[b] = []); c.push(o); if (!(c.length > 1)) {
                                var f = new CKEDITOR.dom.element("script"); f.setAttributes({ type: "text/javascript", src: b }); if (a) if (CKEDITOR.env.ie && CKEDITOR.env.version < 11) f.$.onreadystatechange = function () { if (f.$.readyState == "loaded" || f.$.readyState == "complete") { f.$.onreadystatechange = null; m(b, true) } }; else {
                                    f.$.onload = function () {
                                        setTimeout(function () { m(b, true) },
                                        0)
                                    }; f.$.onerror = function () { m(b, false) }
                                } f.appendTo(CKEDITOR.document.getHead())
                            }
                        }
                    }; j && CKEDITOR.document.getDocumentElement().setStyle("cursor", "wait"); for (var l = 0; l < h; l++) q(c[l])
                }
            }, queue: function () { function c() { var b; (b = a[0]) && this.load(b.scriptUrl, b.callback, CKEDITOR, 0) } var a = []; return function (b, d) { var g = this; a.push({ scriptUrl: b, callback: function () { d && d.apply(this, arguments); a.shift(); c.call(g) } }); a.length == 1 && c.call(this) } }()
        }
    }(), CKEDITOR.resourceManager = function (d, e) {
        this.basePath = d; this.fileName =
        e; this.registered = {}; this.loaded = {}; this.externals = {}; this._ = { waitingList: {} }
    }, CKEDITOR.resourceManager.prototype = {
        add: function (d, e) { if (this.registered[d]) throw '[CKEDITOR.resourceManager.add] The resource name "' + d + '" is already registered.'; var c = this.registered[d] = e || {}; c.name = d; c.path = this.getPath(d); CKEDITOR.fire(d + CKEDITOR.tools.capitalize(this.fileName) + "Ready", c); return this.get(d) }, get: function (d) { return this.registered[d] || null }, getPath: function (d) {
            var e = this.externals[d]; return CKEDITOR.getUrl(e &&
            e.dir || this.basePath + d + "/")
        }, getFilePath: function (d) { var e = this.externals[d]; return CKEDITOR.getUrl(this.getPath(d) + (e ? e.file : this.fileName + ".js")) }, addExternal: function (d, e, c) { for (var d = d.split(","), a = 0; a < d.length; a++) { var b = d[a]; c || (e = e.replace(/[^\/]+$/, function (a) { c = a; return "" })); this.externals[b] = { dir: e, file: c || this.fileName + ".js" } } }, load: function (d, e, c) {
            CKEDITOR.tools.isArray(d) || (d = d ? [d] : []); for (var a = this.loaded, b = this.registered, j = [], g = {}, h = {}, f = 0; f < d.length; f++) {
                var i = d[f]; if (i) if (!a[i] &&
                !b[i]) { var k = this.getFilePath(i); j.push(k); k in g || (g[k] = []); g[k].push(i) } else h[i] = this.get(i)
            } CKEDITOR.scriptLoader.load(j, function (b, d) { if (d.length) throw '[CKEDITOR.resourceManager.load] Resource name "' + g[d[0]].join(",") + '" was not found at "' + d[0] + '".'; for (var f = 0; f < b.length; f++) for (var l = g[b[f]], j = 0; j < l.length; j++) { var i = l[j]; h[i] = this.get(i); a[i] = 1 } e.call(c, h) }, this)
        }
    }, CKEDITOR.plugins = new CKEDITOR.resourceManager("plugins/", "plugin"), CKEDITOR.plugins.load = CKEDITOR.tools.override(CKEDITOR.plugins.load,
    function (d) {
        var e = {}; return function (c, a, b) {
            var j = {}, g = function (c) {
                d.call(this, c, function (c) {
                    CKEDITOR.tools.extend(j, c); var d = [], h; for (h in c) { var o = c[h], m = o && o.requires; if (!e[h]) { if (o.icons) for (var q = o.icons.split(","), l = q.length; l--;) CKEDITOR.skin.addIcon(q[l], o.path + "icons/" + (CKEDITOR.env.hidpi && o.hidpi ? "hidpi/" : "") + q[l] + ".png"); e[h] = 1 } if (m) { m.split && (m = m.split(",")); for (o = 0; o < m.length; o++) j[m[o]] || d.push(m[o]) } } if (d.length) g.call(this, d); else {
                        for (h in j) {
                            o = j[h]; if (o.onLoad && !o.onLoad._called) {
                                o.onLoad() ===
                                false && delete j[h]; o.onLoad._called = 1
                            }
                        } a && a.call(b || window, j)
                    }
                }, this)
            }; g.call(this, c)
        }
    }), CKEDITOR.plugins.setLang = function (d, e, c) { var a = this.get(d), d = a.langEntries || (a.langEntries = {}), a = a.lang || (a.lang = []); a.split && (a = a.split(",")); CKEDITOR.tools.indexOf(a, e) == -1 && a.push(e); d[e] = c }, CKEDITOR.ui = function (d) { if (d.ui) return d.ui; this.items = {}; this.instances = {}; this.editor = d; this._ = { handlers: {} }; return this }, CKEDITOR.ui.prototype = {
        add: function (d, e, c) {
            c.name = d.toLowerCase(); var a = this.items[d] = {
                type: e,
                command: c.command || null, args: Array.prototype.slice.call(arguments, 2)
            }; CKEDITOR.tools.extend(a, c)
        }, get: function (d) { return this.instances[d] }, create: function (d) { var e = this.items[d], c = e && this._.handlers[e.type], a = e && e.command && this.editor.getCommand(e.command), c = c && c.create.apply(this, e.args); this.instances[d] = c; a && a.uiItems.push(c); if (c && !c.type) c.type = e.type; return c }, addHandler: function (d, e) { this._.handlers[d] = e }, space: function (d) { return CKEDITOR.document.getById(this.spaceId(d)) }, spaceId: function (d) {
            return this.editor.id +
            "_" + d
        }
    }, CKEDITOR.event.implementOn(CKEDITOR.ui), function () {
        function d(a, d, f) {
            CKEDITOR.event.call(this); a = a && CKEDITOR.tools.clone(a); if (d !== void 0) {
                if (d instanceof CKEDITOR.dom.element) { if (!f) throw Error("One of the element modes must be specified."); } else throw Error("Expect element of type CKEDITOR.dom.element."); if (CKEDITOR.env.ie && CKEDITOR.env.quirks && f == CKEDITOR.ELEMENT_MODE_INLINE) throw Error("Inline element mode is not supported on IE quirks."); if (!(f == CKEDITOR.ELEMENT_MODE_INLINE ? d.is(CKEDITOR.dtd.$editable) ||
                d.is("textarea") : f == CKEDITOR.ELEMENT_MODE_REPLACE ? !d.is(CKEDITOR.dtd.$nonBodyContent) : 1)) throw Error('The specified element mode is not supported on element: "' + d.getName() + '".'); this.element = d; this.elementMode = f; this.name = this.elementMode != CKEDITOR.ELEMENT_MODE_APPENDTO && (d.getId() || d.getNameAtt())
            } else this.elementMode = CKEDITOR.ELEMENT_MODE_NONE; this._ = {}; this.commands = {}; this.templates = {}; this.name = this.name || e(); this.id = CKEDITOR.tools.getNextId(); this.status = "unloaded"; this.config = CKEDITOR.tools.prototypedCopy(CKEDITOR.config);
            this.ui = new CKEDITOR.ui(this); this.focusManager = new CKEDITOR.focusManager(this); this.keystrokeHandler = new CKEDITOR.keystrokeHandler(this); this.on("readOnly", c); this.on("selectionChange", function (a) { b(this, a.data.path) }); this.on("activeFilterChange", function () { b(this, this.elementPath(), true) }); this.on("mode", c); this.on("instanceReady", function () { this.config.startupFocus && this.focus() }); CKEDITOR.fire("instanceCreated", null, this); CKEDITOR.add(this); CKEDITOR.tools.setTimeout(function () { g(this, a) }, 0, this)
        }
        function e() { do var a = "editor" + ++m; while (CKEDITOR.instances[a]); return a } function c() { var b = this.commands, c; for (c in b) a(this, b[c]) } function a(a, b) { b[b.startDisabled ? "disable" : a.readOnly && !b.readOnly ? "disable" : b.modes[a.mode] ? "enable" : "disable"]() } function b(a, b, c) { if (b) { var d, f, g = a.commands; for (f in g) { d = g[f]; (c || d.contextSensitive) && d.refresh(a, b) } } } function j(a) {
            var b = a.config.customConfig; if (!b) return false; var b = CKEDITOR.getUrl(b), c = q[b] || (q[b] = {}); if (c.fn) {
                c.fn.call(a, a.config); (CKEDITOR.getUrl(a.config.customConfig) ==
                b || !j(a)) && a.fireOnce("customConfigLoaded")
            } else CKEDITOR.scriptLoader.queue(b, function () { c.fn = CKEDITOR.editorConfig ? CKEDITOR.editorConfig : function () { }; j(a) }); return true
        } function g(a, b) {
            a.on("customConfigLoaded", function () {
                if (b) { if (b.on) for (var c in b.on) a.on(c, b.on[c]); CKEDITOR.tools.extend(a.config, b, true); delete a.config.on } c = a.config; a.readOnly = !(!c.readOnly && !(a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? a.element.is("textarea") ? a.element.hasAttribute("disabled") : a.element.isReadOnly() : a.elementMode ==
                CKEDITOR.ELEMENT_MODE_REPLACE && a.element.hasAttribute("disabled"))); a.blockless = a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? !(a.element.is("textarea") || CKEDITOR.dtd[a.element.getName()].p) : false; a.tabIndex = c.tabIndex || a.element && a.element.getAttribute("tabindex") || 0; a.activeEnterMode = a.enterMode = a.blockless ? CKEDITOR.ENTER_BR : c.enterMode; a.activeShiftEnterMode = a.shiftEnterMode = a.blockless ? CKEDITOR.ENTER_BR : c.shiftEnterMode; if (c.skin) CKEDITOR.skinName = c.skin; a.fireOnce("configLoaded"); a.dataProcessor =
                new CKEDITOR.htmlDataProcessor(a); a.filter = a.activeFilter = new CKEDITOR.filter(a); h(a)
            }); if (b && b.customConfig != void 0) a.config.customConfig = b.customConfig; j(a) || a.fireOnce("customConfigLoaded")
        } function h(a) { CKEDITOR.skin.loadPart("editor", function () { f(a) }) } function f(a) {
            CKEDITOR.lang.load(a.config.language, a.config.defaultLanguage, function (b, c) {
                var d = a.config.title; a.langCode = b; a.lang = CKEDITOR.tools.prototypedCopy(c); a.title = typeof d == "string" || d === false ? d : [a.lang.editor, a.name].join(", "); if (CKEDITOR.env.gecko &&
                CKEDITOR.env.version < 10900 && a.lang.dir == "rtl") a.lang.dir = "ltr"; if (!a.config.contentsLangDirection) a.config.contentsLangDirection = a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? a.element.getDirection(1) : a.lang.dir; a.fire("langLoaded"); i(a)
            })
        } function i(a) { a.getStylesSet(function (b) { a.once("loaded", function () { a.fire("stylesSet", { styles: b }) }, null, null, 1); k(a) }) } function k(a) {
            var b = a.config, c = b.plugins, d = b.extraPlugins, f = b.removePlugins; if (d) var g = RegExp("(?:^|,)(?:" + d.replace(/\s*,\s*/g, "|") + ")(?=,|$)",
            "g"), c = c.replace(g, ""), c = c + ("," + d); if (f) var e = RegExp("(?:^|,)(?:" + f.replace(/\s*,\s*/g, "|") + ")(?=,|$)", "g"), c = c.replace(e, ""); CKEDITOR.env.air && (c = c + ",adobeair"); CKEDITOR.plugins.load(c.split(","), function (c) {
                var d = [], f = [], g = []; a.plugins = c; for (var h in c) {
                    var j = c[h], i = j.lang, p = null, k = j.requires, w; CKEDITOR.tools.isArray(k) && (k = k.join(",")); if (k && (w = k.match(e))) for (; k = w.pop() ;) CKEDITOR.tools.setTimeout(function (a, b) {
                        throw Error('Plugin "' + a.replace(",", "") + '" cannot be removed from the plugins list, because it\'s required by "' +
                        b + '" plugin.');
                    }, 0, null, [k, h]); if (i && !a.lang[h]) { i.split && (i = i.split(",")); if (CKEDITOR.tools.indexOf(i, a.langCode) >= 0) p = a.langCode; else { p = a.langCode.replace(/-.*/, ""); p = p != a.langCode && CKEDITOR.tools.indexOf(i, p) >= 0 ? p : CKEDITOR.tools.indexOf(i, "en") >= 0 ? "en" : i[0] } if (!j.langEntries || !j.langEntries[p]) g.push(CKEDITOR.getUrl(j.path + "lang/" + p + ".js")); else { a.lang[h] = j.langEntries[p]; p = null } } f.push(p); d.push(j)
                } CKEDITOR.scriptLoader.load(g, function () {
                    for (var c = ["beforeInit", "init", "afterInit"], g = 0; g < c.length; g++) for (var e =
                    0; e < d.length; e++) { var h = d[e]; g === 0 && (f[e] && h.lang && h.langEntries) && (a.lang[h.name] = h.langEntries[f[e]]); if (h[c[g]]) h[c[g]](a) } a.fireOnce("pluginsLoaded"); b.keystrokes && a.setKeystroke(a.config.keystrokes); for (e = 0; e < a.config.blockedKeystrokes.length; e++) a.keystrokeHandler.blockedKeystrokes[a.config.blockedKeystrokes[e]] = 1; a.status = "loaded"; a.fireOnce("loaded"); CKEDITOR.fire("instanceLoaded", null, a)
                })
            })
        } function o() {
            var a = this.element; if (a && this.elementMode != CKEDITOR.ELEMENT_MODE_APPENDTO) {
                var b = this.getData();
                this.config.htmlEncodeOutput && (b = CKEDITOR.tools.htmlEncode(b)); a.is("textarea") ? a.setValue(b) : a.setHtml(b); return true
            } return false
        } d.prototype = CKEDITOR.editor.prototype; CKEDITOR.editor = d; var m = 0, q = {}; CKEDITOR.tools.extend(CKEDITOR.editor.prototype, {
            addCommand: function (b, c) { c.name = b.toLowerCase(); var d = new CKEDITOR.command(this, c); this.mode && a(this, d); return this.commands[b] = d }, _attachToForm: function () {
                var a = this, b = a.element, c = new CKEDITOR.dom.element(b.$.form); if (b.is("textarea") && c) {
                    var d = function (c) {
                        a.updateElement();
                        a._.required && (!b.getValue() && a.fire("required") === false) && c.data.preventDefault()
                    }; c.on("submit", d); if (c.$.submit && c.$.submit.call && c.$.submit.apply) c.$.submit = CKEDITOR.tools.override(c.$.submit, function (a) { return function () { d(); a.apply ? a.apply(this) : a() } }); a.on("destroy", function () { c.removeListener("submit", d) })
                }
            }, destroy: function (a) {
                this.fire("beforeDestroy"); !a && o.call(this); this.editable(null); this.status = "destroyed"; this.fire("destroy"); this.removeAllListeners(); CKEDITOR.remove(this); CKEDITOR.fire("instanceDestroyed",
                null, this)
            }, elementPath: function (a) { return (a = a || this.getSelection().getStartElement()) ? new CKEDITOR.dom.elementPath(a, this.editable()) : null }, createRange: function () { var a = this.editable(); return a ? new CKEDITOR.dom.range(a) : null }, execCommand: function (a, b) { var c = this.getCommand(a), d = { name: a, commandData: b, command: c }; if (c && c.state != CKEDITOR.TRISTATE_DISABLED && this.fire("beforeCommandExec", d) !== true) { d.returnValue = c.exec(d.commandData); if (!c.async && this.fire("afterCommandExec", d) !== true) return d.returnValue } return false },
            getCommand: function (a) { return this.commands[a] }, getData: function (a) { !a && this.fire("beforeGetData"); var b = this._.data; if (typeof b != "string") b = (b = this.element) && this.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE ? b.is("textarea") ? b.getValue() : b.getHtml() : ""; b = { dataValue: b }; !a && this.fire("getData", b); return b.dataValue }, getSnapshot: function () { var a = this.fire("getSnapshot"); if (typeof a != "string") { var b = this.element; b && this.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE && (a = b.is("textarea") ? b.getValue() : b.getHtml()) } return a },
            loadSnapshot: function (a) { this.fire("loadSnapshot", a) }, setData: function (a, b, c) { if (b) this.on("dataReady", function (a) { a.removeListener(); b.call(a.editor) }); a = { dataValue: a }; !c && this.fire("setData", a); this._.data = a.dataValue; !c && this.fire("afterSetData", a) }, setReadOnly: function (a) { a = a == void 0 || a; if (this.readOnly != a) { this.readOnly = a; this.keystrokeHandler.blockedKeystrokes[8] = +a; this.editable().setReadOnly(a); this.fire("readOnly") } }, insertHtml: function (a, b) { this.fire("insertHtml", { dataValue: a, mode: b }) },
            insertText: function (a) { this.fire("insertText", a) }, insertElement: function (a) { this.fire("insertElement", a) }, focus: function () { this.fire("beforeFocus") }, checkDirty: function () { return this.status == "ready" && this._.previousValue !== this.getSnapshot() }, resetDirty: function () { this._.previousValue = this.getSnapshot() }, updateElement: function () { return o.call(this) }, setKeystroke: function () {
                for (var a = this.keystrokeHandler.keystrokes, b = CKEDITOR.tools.isArray(arguments[0]) ? arguments[0] : [[].slice.call(arguments, 0)], c,
                d, f = b.length; f--;) { c = b[f]; d = 0; if (CKEDITOR.tools.isArray(c)) { d = c[1]; c = c[0] } d ? a[c] = d : delete a[c] }
            }, addFeature: function (a) { return this.filter.addFeature(a) }, setActiveFilter: function (a) { if (!a) a = this.filter; if (this.activeFilter !== a) { this.activeFilter = a; this.fire("activeFilterChange"); a === this.filter ? this.setActiveEnterMode(null, null) : this.setActiveEnterMode(a.getAllowedEnterMode(this.enterMode), a.getAllowedEnterMode(this.shiftEnterMode, true)) } }, setActiveEnterMode: function (a, b) {
                a = a ? this.blockless ? CKEDITOR.ENTER_BR :
                    a : this.enterMode; b = b ? this.blockless ? CKEDITOR.ENTER_BR : b : this.shiftEnterMode; if (this.activeEnterMode != a || this.activeShiftEnterMode != b) { this.activeEnterMode = a; this.activeShiftEnterMode = b; this.fire("activeEnterModeChange") }
            }
        })
    }(), CKEDITOR.ELEMENT_MODE_NONE = 0, CKEDITOR.ELEMENT_MODE_REPLACE = 1, CKEDITOR.ELEMENT_MODE_APPENDTO = 2, CKEDITOR.ELEMENT_MODE_INLINE = 3, CKEDITOR.htmlParser = function () {
        this._ = {
            htmlPartsRegex: RegExp("<(?:(?:\\/([^>]+)>)|(?:!--([\\S|\\s]*?)--\>)|(?:([^\\s>]+)\\s*((?:(?:\"[^\"]*\")|(?:'[^']*')|[^\"'>])*)\\/?>))",
            "g")
        }
    }, function () {
        var d = /([\w\-:.]+)(?:(?:\s*=\s*(?:(?:"([^"]*)")|(?:'([^']*)')|([^\s>]+)))|(?=\s|$))/g, e = { checked: 1, compact: 1, declare: 1, defer: 1, disabled: 1, ismap: 1, multiple: 1, nohref: 1, noresize: 1, noshade: 1, nowrap: 1, readonly: 1, selected: 1 }; CKEDITOR.htmlParser.prototype = {
            onTagOpen: function () { }, onTagClose: function () { }, onText: function () { }, onCDATA: function () { }, onComment: function () { }, parse: function (c) {
                for (var a, b, j = 0, g; a = this._.htmlPartsRegex.exec(c) ;) {
                    b = a.index; if (b > j) {
                        j = c.substring(j, b); if (g) g.push(j);
                        else this.onText(j)
                    } j = this._.htmlPartsRegex.lastIndex; if (b = a[1]) { b = b.toLowerCase(); if (g && CKEDITOR.dtd.$cdata[b]) { this.onCDATA(g.join("")); g = null } if (!g) { this.onTagClose(b); continue } } if (g) g.push(a[0]); else if (b = a[3]) { b = b.toLowerCase(); if (!/="/.test(b)) { var h = {}, f; a = a[4]; var i = !!(a && a.charAt(a.length - 1) == "/"); if (a) for (; f = d.exec(a) ;) { var k = f[1].toLowerCase(); f = f[2] || f[3] || f[4] || ""; h[k] = !f && e[k] ? k : CKEDITOR.tools.htmlDecodeAttr(f) } this.onTagOpen(b, h, i); !g && CKEDITOR.dtd.$cdata[b] && (g = []) } } else if (b = a[2]) this.onComment(b)
                } if (c.length >
                j) this.onText(c.substring(j, c.length))
            }
        }
    }(), CKEDITOR.htmlParser.basicWriter = CKEDITOR.tools.createClass({
        $: function () { this._ = { output: [] } }, proto: {
            openTag: function (d) { this._.output.push("<", d) }, openTagClose: function (d, e) { e ? this._.output.push(" />") : this._.output.push(">") }, attribute: function (d, e) { typeof e == "string" && (e = CKEDITOR.tools.htmlEncodeAttr(e)); this._.output.push(" ", d, '="', e, '"') }, closeTag: function (d) { this._.output.push("</", d, ">") }, text: function (d) { this._.output.push(d) }, comment: function (d) {
                this._.output.push("<\!--",
                d, "--\>")
            }, write: function (d) { this._.output.push(d) }, reset: function () { this._.output = []; this._.indent = false }, getHtml: function (d) { var e = this._.output.join(""); d && this.reset(); return e }
        }
    }), "use strict", function () {
        CKEDITOR.htmlParser.node = function () { }; CKEDITOR.htmlParser.node.prototype = {
            remove: function () { var d = this.parent.children, e = CKEDITOR.tools.indexOf(d, this), c = this.previous, a = this.next; c && (c.next = a); a && (a.previous = c); d.splice(e, 1); this.parent = null }, replaceWith: function (d) {
                var e = this.parent.children,
                c = CKEDITOR.tools.indexOf(e, this), a = d.previous = this.previous, b = d.next = this.next; a && (a.next = d); b && (b.previous = d); e[c] = d; d.parent = this.parent; this.parent = null
            }, insertAfter: function (d) { var e = d.parent.children, c = CKEDITOR.tools.indexOf(e, d), a = d.next; e.splice(c + 1, 0, this); this.next = d.next; this.previous = d; d.next = this; a && (a.previous = this); this.parent = d.parent }, insertBefore: function (d) {
                var e = d.parent.children, c = CKEDITOR.tools.indexOf(e, d); e.splice(c, 0, this); this.next = d; (this.previous = d.previous) && (d.previous.next =
                this); d.previous = this; this.parent = d.parent
            }, getAscendant: function (d) { var e = typeof d == "function" ? d : typeof d == "string" ? function (a) { return a.name == d } : function (a) { return a.name in d }, c = this.parent; for (; c && c.type == CKEDITOR.NODE_ELEMENT;) { if (e(c)) return c; c = c.parent } return null }, wrapWith: function (d) { this.replaceWith(d); d.add(this); return d }, getIndex: function () { return CKEDITOR.tools.indexOf(this.parent.children, this) }, getFilterContext: function (d) { return d || {} }
        }
    }(), "use strict", CKEDITOR.htmlParser.comment =
    function (d) { this.value = d; this._ = { isBlockLike: false } }, CKEDITOR.htmlParser.comment.prototype = CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node, { type: CKEDITOR.NODE_COMMENT, filter: function (d, e) { var c = this.value; if (!(c = d.onComment(e, c, this))) { this.remove(); return false } if (typeof c != "string") { this.replaceWith(c); return false } this.value = c; return true }, writeHtml: function (d, e) { e && this.filter(e); d.comment(this.value) } }), "use strict", function () {
        CKEDITOR.htmlParser.text = function (d) { this.value = d; this._ = { isBlockLike: false } };
        CKEDITOR.htmlParser.text.prototype = CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node, { type: CKEDITOR.NODE_TEXT, filter: function (d, e) { if (!(this.value = d.onText(e, this.value, this))) { this.remove(); return false } }, writeHtml: function (d, e) { e && this.filter(e); d.text(this.value) } })
    }(), "use strict", function () { CKEDITOR.htmlParser.cdata = function (d) { this.value = d }; CKEDITOR.htmlParser.cdata.prototype = CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node, { type: CKEDITOR.NODE_TEXT, filter: function () { }, writeHtml: function (d) { d.write(this.value) } }) }(),
    "use strict", CKEDITOR.htmlParser.fragment = function () { this.children = []; this.parent = null; this._ = { isBlockLike: true, hasInlineStarted: false } }, function () {
        function d(a) { return a.attributes["data-cke-survive"] ? false : a.name == "a" && a.attributes.href || CKEDITOR.dtd.$removeEmpty[a.name] } var e = CKEDITOR.tools.extend({ table: 1, ul: 1, ol: 1, dl: 1 }, CKEDITOR.dtd.table, CKEDITOR.dtd.ul, CKEDITOR.dtd.ol, CKEDITOR.dtd.dl), c = { ol: 1, ul: 1 }, a = CKEDITOR.tools.extend({}, { html: 1 }, CKEDITOR.dtd.html, CKEDITOR.dtd.body, CKEDITOR.dtd.head, {
            style: 1,
            script: 1
        }); CKEDITOR.htmlParser.fragment.fromHtml = function (b, j, g) {
            function h(a) { var b; if (n.length > 0) for (var c = 0; c < n.length; c++) { var d = n[c], g = d.name, e = CKEDITOR.dtd[g], h = p.name && CKEDITOR.dtd[p.name]; if ((!h || h[g]) && (!a || !e || e[a] || !CKEDITOR.dtd[a])) { if (!b) { f(); b = 1 } d = d.clone(); d.parent = p; p = d; n.splice(c, 1); c-- } else if (g == p.name) { k(p, p.parent, 1); c-- } } } function f() { for (; r.length;) k(r.shift(), p) } function i(a) {
                if (a._.isBlockLike && a.name != "pre" && a.name != "textarea") {
                    var b = a.children.length, c = a.children[b - 1], d;
                    if (c && c.type == CKEDITOR.NODE_TEXT) (d = CKEDITOR.tools.rtrim(c.value)) ? c.value = d : a.children.length = b - 1
                }
            } function k(a, b, c) { var b = b || p || l, f = p; if (a.previous === void 0) { if (o(b, a)) { p = b; q.onTagOpen(g, {}); a.returnPoint = b = p } i(a); (!d(a) || a.children.length) && b.add(a); a.name == "pre" && (y = false); a.name == "textarea" && (w = false) } if (a.returnPoint) { p = a.returnPoint; delete a.returnPoint } else p = c ? b : f } function o(a, b) {
                if ((a == l || a.name == "body") && g && (!a.name || CKEDITOR.dtd[a.name][g])) {
                    var c, d; return (c = b.attributes && (d = b.attributes["data-cke-real-element-type"]) ?
                        d : b.name) && c in CKEDITOR.dtd.$inline && !(c in CKEDITOR.dtd.head) && !b.isOrphan || b.type == CKEDITOR.NODE_TEXT
                }
            } function m(a, b) { return a in CKEDITOR.dtd.$listItem || a in CKEDITOR.dtd.$tableContent ? a == b || a == "dt" && b == "dd" || a == "dd" && b == "dt" : false } var q = new CKEDITOR.htmlParser, l = j instanceof CKEDITOR.htmlParser.element ? j : typeof j == "string" ? new CKEDITOR.htmlParser.element(j) : new CKEDITOR.htmlParser.fragment, n = [], r = [], p = l, w = l.name == "textarea", y = l.name == "pre"; q.onTagOpen = function (b, g, l, j) {
                g = new CKEDITOR.htmlParser.element(b,
                g); if (g.isUnknown && l) g.isEmpty = true; g.isOptionalClose = j; if (d(g)) n.push(g); else {
                    if (b == "pre") y = true; else { if (b == "br" && y) { p.add(new CKEDITOR.htmlParser.text("\n")); return } b == "textarea" && (w = true) } if (b == "br") r.push(g); else {
                        for (; ;) {
                            j = (l = p.name) ? CKEDITOR.dtd[l] || (p._.isBlockLike ? CKEDITOR.dtd.div : CKEDITOR.dtd.span) : a; if (!g.isUnknown && !p.isUnknown && !j[b]) if (p.isOptionalClose) q.onTagClose(l); else if (b in c && l in c) {
                                l = p.children; (l = l[l.length - 1]) && l.name == "li" || k(l = new CKEDITOR.htmlParser.element("li"), p); !g.returnPoint &&
                                (g.returnPoint = p); p = l
                            } else if (b in CKEDITOR.dtd.$listItem && !m(b, l)) q.onTagOpen(b == "li" ? "ul" : "dl", {}, 0, 1); else if (l in e && !m(b, l)) { !g.returnPoint && (g.returnPoint = p); p = p.parent } else { l in CKEDITOR.dtd.$inline && n.unshift(p); if (p.parent) k(p, p.parent, 1); else { g.isOrphan = 1; break } } else break
                        } h(b); f(); g.parent = p; g.isEmpty ? k(g) : p = g
                    }
                }
            }; q.onTagClose = function (a) {
                for (var b = n.length - 1; b >= 0; b--) if (a == n[b].name) { n.splice(b, 1); return } for (var c = [], d = [], e = p; e != l && e.name != a;) {
                    e._.isBlockLike || d.unshift(e); c.push(e); e =
                    e.returnPoint || e.parent
                } if (e != l) { for (b = 0; b < c.length; b++) { var h = c[b]; k(h, h.parent) } p = e; e._.isBlockLike && f(); k(e, e.parent); if (e == p) p = p.parent; n = n.concat(d) } a == "body" && (g = false)
            }; q.onText = function (b) {
                if ((!p._.hasInlineStarted || r.length) && !y && !w) { b = CKEDITOR.tools.ltrim(b); if (b.length === 0) return } var d = p.name, l = d ? CKEDITOR.dtd[d] || (p._.isBlockLike ? CKEDITOR.dtd.div : CKEDITOR.dtd.span) : a; if (!w && !l["#"] && d in e) { q.onTagOpen(d in c ? "li" : d == "dl" ? "dd" : d == "table" ? "tr" : d == "tr" ? "td" : ""); q.onText(b) } else {
                    f(); h(); !y &&
                    !w && (b = b.replace(/[\t\r\n ]{2,}|[\t\r\n]/g, " ")); b = new CKEDITOR.htmlParser.text(b); if (o(p, b)) this.onTagOpen(g, {}, 0, 1); p.add(b)
                }
            }; q.onCDATA = function (a) { p.add(new CKEDITOR.htmlParser.cdata(a)) }; q.onComment = function (a) { f(); h(); p.add(new CKEDITOR.htmlParser.comment(a)) }; q.parse(b); for (f() ; p != l;) k(p, p.parent, 1); i(l); return l
        }; CKEDITOR.htmlParser.fragment.prototype = {
            type: CKEDITOR.NODE_DOCUMENT_FRAGMENT, add: function (a, c) {
                isNaN(c) && (c = this.children.length); var d = c > 0 ? this.children[c - 1] : null; if (d) {
                    if (a._.isBlockLike &&
                    d.type == CKEDITOR.NODE_TEXT) { d.value = CKEDITOR.tools.rtrim(d.value); if (d.value.length === 0) { this.children.pop(); this.add(a); return } } d.next = a
                } a.previous = d; a.parent = this; this.children.splice(c, 0, a); if (!this._.hasInlineStarted) this._.hasInlineStarted = a.type == CKEDITOR.NODE_TEXT || a.type == CKEDITOR.NODE_ELEMENT && !a._.isBlockLike
            }, filter: function (a, c) { c = this.getFilterContext(c); a.onRoot(c, this); this.filterChildren(a, false, c) }, filterChildren: function (a, c, d) {
                if (this.childrenFilteredBy != a.id) {
                    d = this.getFilterContext(d);
                    if (c && !this.parent) a.onRoot(d, this); this.childrenFilteredBy = a.id; for (c = 0; c < this.children.length; c++) this.children[c].filter(a, d) === false && c--
                }
            }, writeHtml: function (a, c) { c && this.filter(c); this.writeChildrenHtml(a) }, writeChildrenHtml: function (a, c, d) { var e = this.getFilterContext(); if (d && !this.parent && c) c.onRoot(e, this); c && this.filterChildren(c, false, e); c = 0; d = this.children; for (e = d.length; c < e; c++) d[c].writeHtml(a) }, forEach: function (a, c, d) {
                if (!d && (!c || this.type == c)) var e = a(this); if (e !== false) for (var d = this.children,
                f = 0; f < d.length; f++) { e = d[f]; e.type == CKEDITOR.NODE_ELEMENT ? e.forEach(a, c) : (!c || e.type == c) && a(e) }
            }, getFilterContext: function (a) { return a || {} }
        }
    }(), "use strict", function () {
        function d() { this.rules = [] } function e(c, a, b, e) { var g, h; for (g in a) { (h = c[g]) || (h = c[g] = new d); h.add(a[g], b, e) } } CKEDITOR.htmlParser.filter = CKEDITOR.tools.createClass({
            $: function (c) {
                this.id = CKEDITOR.tools.getNextNumber(); this.elementNameRules = new d; this.attributeNameRules = new d; this.elementsRules = {}; this.attributesRules = {}; this.textRules =
                new d; this.commentRules = new d; this.rootRules = new d; c && this.addRules(c, 10)
            }, proto: {
                addRules: function (c, a) {
                    var b; if (typeof a == "number") b = a; else if (a && "priority" in a) b = a.priority; typeof b != "number" && (b = 10); typeof a != "object" && (a = {}); c.elementNames && this.elementNameRules.addMany(c.elementNames, b, a); c.attributeNames && this.attributeNameRules.addMany(c.attributeNames, b, a); c.elements && e(this.elementsRules, c.elements, b, a); c.attributes && e(this.attributesRules, c.attributes, b, a); c.text && this.textRules.add(c.text,
                    b, a); c.comment && this.commentRules.add(c.comment, b, a); c.root && this.rootRules.add(c.root, b, a)
                }, applyTo: function (c) { c.filter(this) }, onElementName: function (c, a) { return this.elementNameRules.execOnName(c, a) }, onAttributeName: function (c, a) { return this.attributeNameRules.execOnName(c, a) }, onText: function (c, a) { return this.textRules.exec(c, a) }, onComment: function (c, a, b) { return this.commentRules.exec(c, a, b) }, onRoot: function (c, a) { return this.rootRules.exec(c, a) }, onElement: function (c, a) {
                    for (var b = [this.elementsRules["^"],
                    this.elementsRules[a.name], this.elementsRules.$], d, g = 0; g < 3; g++) if (d = b[g]) { d = d.exec(c, a, this); if (d === false) return null; if (d && d != a) return this.onNode(c, d); if (a.parent && !a.name) break } return a
                }, onNode: function (c, a) { var b = a.type; return b == CKEDITOR.NODE_ELEMENT ? this.onElement(c, a) : b == CKEDITOR.NODE_TEXT ? new CKEDITOR.htmlParser.text(this.onText(c, a.value)) : b == CKEDITOR.NODE_COMMENT ? new CKEDITOR.htmlParser.comment(this.onComment(c, a.value)) : null }, onAttribute: function (c, a, b, d) {
                    return (b = this.attributesRules[b]) ?
                    b.exec(c, d, a, this) : d
                }
            }
        }); CKEDITOR.htmlParser.filterRulesGroup = d; d.prototype = {
            add: function (c, a, b) { this.rules.splice(this.findIndex(a), 0, { value: c, priority: a, options: b }) }, addMany: function (c, a, b) { for (var d = [this.findIndex(a), 0], g = 0, e = c.length; g < e; g++) d.push({ value: c[g], priority: a, options: b }); this.rules.splice.apply(this.rules, d) }, findIndex: function (c) { for (var a = this.rules, b = a.length - 1; b >= 0 && c < a[b].priority;) b--; return b + 1 }, exec: function (c, a) {
                var b = a instanceof CKEDITOR.htmlParser.node || a instanceof CKEDITOR.htmlParser.fragment,
                d = Array.prototype.slice.call(arguments, 1), g = this.rules, e = g.length, f, i, k, o; for (o = 0; o < e; o++) { if (b) { f = a.type; i = a.name } k = g[o]; if (!(c.nonEditable && !k.options.applyToAll || c.nestedEditable && k.options.excludeNestedEditable)) { k = k.value.apply(null, d); if (k === false || b && k && (k.name != i || k.type != f)) return k; k != void 0 && (d[0] = a = k) } } return a
            }, execOnName: function (c, a) {
                for (var b = 0, d = this.rules, g = d.length, e; a && b < g; b++) {
                    e = d[b]; !(c.nonEditable && !e.options.applyToAll || c.nestedEditable && e.options.excludeNestedEditable) && (a =
                    a.replace(e.value[0], e.value[1]))
                } return a
            }
        }
    }(), function () {
        function d(d, f) {
            function e(a) { return a || CKEDITOR.env.needsNbspFiller ? new CKEDITOR.htmlParser.text(" ") : new CKEDITOR.htmlParser.element("br", { "data-cke-bogus": 1 }) } function h(b, d) {
                return function (f) {
                    if (f.type != CKEDITOR.NODE_DOCUMENT_FRAGMENT) {
                        var g = [], h = c(f), i, n; if (h) for (l(h, 1) && g.push(h) ; h;) { if (j(h) && (i = a(h)) && l(i)) if ((n = a(i)) && !j(n)) g.push(i); else { e(p).insertAfter(i); i.remove() } h = h.previous } for (h = 0; h < g.length; h++) g[h].remove(); if (g = CKEDITOR.env.opera &&
                        !b || (typeof d == "function" ? d(f) !== false : d)) if (!p && !CKEDITOR.env.needsBrFiller && f.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT) g = false; else if (!p && !CKEDITOR.env.needsBrFiller && (document.documentMode > 7 || f.name in CKEDITOR.dtd.tr || f.name in CKEDITOR.dtd.$listItem)) g = false; else { g = c(f); g = !g || f.name == "form" && g.name == "input" } g && f.add(e(b))
                    }
                }
            } function l(a, b) {
                if ((!p || CKEDITOR.env.needsBrFiller) && a.type == CKEDITOR.NODE_ELEMENT && a.name == "br" && !a.attributes["data-cke-eol"]) return true; var c; if (a.type == CKEDITOR.NODE_TEXT &&
                (c = a.value.match(r))) { if (c.index) { (new CKEDITOR.htmlParser.text(a.value.substring(0, c.index))).insertBefore(a); a.value = c[0] } if (!CKEDITOR.env.needsBrFiller && p && (!b || a.parent.name in n)) return true; if (!p) if ((c = a.previous) && c.name == "br" || !c || j(c)) return true } return false
            } var i = { elements: {} }, p = f == "html", n = CKEDITOR.tools.extend({}, A), k; for (k in n) "#" in w[k] || delete n[k]; for (k in n) i.elements[k] = h(p, d.config.fillEmptyBlocks !== false); i.root = h(p); i.elements.br = function (c) {
                return function (d) {
                    if (d.parent.type !=
                    CKEDITOR.NODE_DOCUMENT_FRAGMENT) { var f = d.attributes; if ("data-cke-bogus" in f || "data-cke-eol" in f) delete f["data-cke-bogus"]; else { for (f = d.next; f && b(f) ;) f = f.next; var h = a(d); !f && j(d.parent) ? g(d.parent, e(c)) : j(f) && (h && !j(h)) && e(c).insertBefore(f) } }
                }
            }(p); return i
        } function e(a, b) { return a != CKEDITOR.ENTER_BR && b !== false ? a == CKEDITOR.ENTER_DIV ? "div" : "p" : false } function c(a) { for (a = a.children[a.children.length - 1]; a && b(a) ;) a = a.previous; return a } function a(a) { for (a = a.previous; a && b(a) ;) a = a.previous; return a } function b(a) {
            return a.type ==
            CKEDITOR.NODE_TEXT && !CKEDITOR.tools.trim(a.value) || a.type == CKEDITOR.NODE_ELEMENT && a.attributes["data-cke-bookmark"]
        } function j(a) { return a && (a.type == CKEDITOR.NODE_ELEMENT && a.name in A || a.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT) } function g(a, b) { var c = a.children[a.children.length - 1]; a.children.push(b); b.parent = a; if (c) { c.next = b; b.previous = c } } function h(a) { a = a.attributes; a.contenteditable != "false" && (a["data-cke-editable"] = a.contenteditable ? "true" : 1); a.contenteditable = "false" } function f(a) {
            a = a.attributes;
            switch (a["data-cke-editable"]) { case "true": a.contenteditable = "true"; break; case "1": delete a.contenteditable }
        } function i(a) { return a.replace(t, function (a, b, c) { return "<" + b + c.replace(z, function (a, b) { if (!/^on/.test(b) && c.indexOf("data-cke-saved-" + b) == -1) { a = a.slice(1); return " data-cke-saved-" + a + " data-cke-" + CKEDITOR.rnd + "-" + a } return a }) + ">" }) } function k(a, b) {
            return a.replace(b, function (a, b, c) {
                a.indexOf("<textarea") === 0 && (a = b + q(c).replace(/</g, "&lt;").replace(/>/g, "&gt;") + "</textarea>"); return "<cke:encoded>" +
                encodeURIComponent(a) + "</cke:encoded>"
            })
        } function o(a) { return a.replace(C, function (a, b) { return decodeURIComponent(b) }) } function m(a) { return a.replace(/<\!--(?!{cke_protected})[\s\S]+?--\>/g, function (a) { return "<\!--" + p + "{C}" + encodeURIComponent(a).replace(/--/g, "%2D%2D") + "--\>" }) } function q(a) { return a.replace(/<\!--\{cke_protected\}\{C\}([\s\S]+?)--\>/g, function (a, b) { return decodeURIComponent(b) }) } function l(a, b) {
            var c = b._.dataStore; return a.replace(/<\!--\{cke_protected\}([\s\S]+?)--\>/g, function (a,
            b) { return decodeURIComponent(b) }).replace(/\{cke_protected_(\d+)\}/g, function (a, b) { return c && c[b] || "" })
        } function n(a, b) {
            for (var c = [], d = b.config.protectedSource, f = b._.dataStore || (b._.dataStore = { id: 1 }), g = /<\!--\{cke_temp(comment)?\}(\d*?)--\>/g, d = [/<script[\s\S]*?<\/script>/gi, /<noscript[\s\S]*?<\/noscript>/gi].concat(d), a = a.replace(/<\!--[\s\S]*?--\>/g, function (a) { return "<\!--{cke_tempcomment}" + (c.push(a) - 1) + "--\>" }), e = 0; e < d.length; e++) a = a.replace(d[e], function (a) {
                a = a.replace(g, function (a, b, d) { return c[d] });
                return /cke_temp(comment)?/.test(a) ? a : "<\!--{cke_temp}" + (c.push(a) - 1) + "--\>"
            }); a = a.replace(g, function (a, b, d) { return "<\!--" + p + (b ? "{C}" : "") + encodeURIComponent(c[d]).replace(/--/g, "%2D%2D") + "--\>" }); return a.replace(/(['"]).*?\1/g, function (a) { return a.replace(/<\!--\{cke_protected\}([\s\S]+?)--\>/g, function (a, b) { f[f.id] = decodeURIComponent(b); return "{cke_protected_" + f.id++ + "}" }) })
        } CKEDITOR.htmlDataProcessor = function (a) {
            var b, c, f = this; this.editor = a; this.dataFilter = b = new CKEDITOR.htmlParser.filter; this.htmlFilter =
            c = new CKEDITOR.htmlParser.filter; this.writer = new CKEDITOR.htmlParser.basicWriter; b.addRules(v); b.addRules(u, { applyToAll: true }); b.addRules(d(a, "data"), { applyToAll: true }); c.addRules(s); c.addRules(x, { applyToAll: true }); c.addRules(d(a, "html"), { applyToAll: true }); a.on("toHtml", function (b) {
                var b = b.data, c = b.dataValue, c = n(c, a), c = k(c, F), c = i(c), c = k(c, B), c = c.replace(D, "$1cke:$2"), c = c.replace(I, "<cke:$1$2></cke:$1>"), c = CKEDITOR.env.opera ? c : c.replace(/(<pre\b[^>]*>)(\r\n|\n)/g, "$1$2$2"), d = b.context || a.editable().getName(),
                f; if (CKEDITOR.env.ie && CKEDITOR.env.version < 9 && d == "pre") { d = "div"; c = "<pre>" + c + "</pre>"; f = 1 } d = a.document.createElement(d); d.setHtml("a" + c); c = d.getHtml().substr(1); c = c.replace(RegExp(" data-cke-" + CKEDITOR.rnd + "-", "ig"), " "); f && (c = c.replace(/^<pre>|<\/pre>$/gi, "")); c = c.replace(E, "$1$2"); c = o(c); c = q(c); b.dataValue = CKEDITOR.htmlParser.fragment.fromHtml(c, b.context, b.fixForBody === false ? false : e(b.enterMode, a.config.autoParagraph))
            }, null, null, 5); a.on("toHtml", function (b) {
                b.data.filter.applyTo(b.data.dataValue,
                true, b.data.dontFilter, b.data.enterMode) && a.fire("dataFiltered")
            }, null, null, 6); a.on("toHtml", function (a) { a.data.dataValue.filterChildren(f.dataFilter, true) }, null, null, 10); a.on("toHtml", function (a) { var a = a.data, b = a.dataValue, c = new CKEDITOR.htmlParser.basicWriter; b.writeChildrenHtml(c); b = c.getHtml(true); a.dataValue = m(b) }, null, null, 15); a.on("toDataFormat", function (b) {
                var c = b.data.dataValue; b.data.enterMode != CKEDITOR.ENTER_BR && (c = c.replace(/^<br *\/?>/i, "")); b.data.dataValue = CKEDITOR.htmlParser.fragment.fromHtml(c,
                b.data.context, e(b.data.enterMode, a.config.autoParagraph))
            }, null, null, 5); a.on("toDataFormat", function (a) { a.data.dataValue.filterChildren(f.htmlFilter, true) }, null, null, 10); a.on("toDataFormat", function (a) { a.data.filter.applyTo(a.data.dataValue, false, true) }, null, null, 11); a.on("toDataFormat", function (b) { var c = b.data.dataValue, d = f.writer; d.reset(); c.writeChildrenHtml(d); c = d.getHtml(true); c = q(c); c = l(c, a); b.data.dataValue = c }, null, null, 15)
        }; CKEDITOR.htmlDataProcessor.prototype = {
            toHtml: function (a, b, c, d) {
                var f =
                this.editor, g, e, h; if (b && typeof b == "object") { g = b.context; c = b.fixForBody; d = b.dontFilter; e = b.filter; h = b.enterMode } else g = b; !g && g !== null && (g = f.editable().getName()); return f.fire("toHtml", { dataValue: a, context: g, fixForBody: c, dontFilter: d, filter: e || f.filter, enterMode: h || f.enterMode }).dataValue
            }, toDataFormat: function (a, b) {
                var c, d, f; if (b) { c = b.context; d = b.filter; f = b.enterMode } !c && c !== null && (c = this.editor.editable().getName()); return this.editor.fire("toDataFormat", {
                    dataValue: a, filter: d || this.editor.filter,
                    context: c, enterMode: f || this.editor.enterMode
                }).dataValue
            }
        }; var r = /(?:&nbsp;|\xa0)$/, p = "{cke_protected}", w = CKEDITOR.dtd, y = ["caption", "colgroup", "col", "thead", "tfoot", "tbody"], A = CKEDITOR.tools.extend({}, w.$blockLimit, w.$block), v = { elements: { input: h, textarea: h } }, u = { attributeNames: [[/^on/, "data-cke-pa-on"], [/^data-cke-expando$/, ""]] }, s = {
            elements: {
                embed: function (a) { var b = a.parent; if (b && b.name == "object") { var c = b.attributes.width, b = b.attributes.height; if (c) a.attributes.width = c; if (b) a.attributes.height = b } },
                a: function (a) { if (!a.children.length && !a.attributes.name && !a.attributes["data-cke-saved-name"]) return false }
            }
        }, x = {
            elementNames: [[/^cke:/, ""], [/^\?xml:namespace$/, ""]], attributeNames: [[/^data-cke-(saved|pa)-/, ""], [/^data-cke-.*/, ""], ["hidefocus", ""]], elements: {
                $: function (a) { var b = a.attributes; if (b) { if (b["data-cke-temp"]) return false; for (var c = ["name", "href", "src"], d, f = 0; f < c.length; f++) { d = "data-cke-saved-" + c[f]; d in b && delete b[c[f]] } } return a }, table: function (a) {
                    a.children.slice(0).sort(function (a, b) {
                        var c,
                        d; if (a.type == CKEDITOR.NODE_ELEMENT && b.type == a.type) { c = CKEDITOR.tools.indexOf(y, a.name); d = CKEDITOR.tools.indexOf(y, b.name) } if (!(c > -1 && d > -1 && c != d)) { c = a.parent ? a.getIndex() : -1; d = b.parent ? b.getIndex() : -1 } return c > d ? 1 : -1
                    })
                }, param: function (a) { a.children = []; a.isEmpty = true; return a }, span: function (a) { a.attributes["class"] == "Apple-style-span" && delete a.name }, html: function (a) { delete a.attributes.contenteditable; delete a.attributes["class"] }, body: function (a) { delete a.attributes.spellcheck; delete a.attributes.contenteditable },
                style: function (a) { var b = a.children[0]; if (b && b.value) b.value = CKEDITOR.tools.trim(b.value); if (!a.attributes.type) a.attributes.type = "text/css" }, title: function (a) { var b = a.children[0]; !b && g(a, b = new CKEDITOR.htmlParser.text); b.value = a.attributes["data-cke-title"] || "" }, input: f, textarea: f
            }, attributes: { "class": function (a) { return CKEDITOR.tools.ltrim(a.replace(/(?:^|\s+)cke_[^\s]*/g, "")) || false } }
        }; if (CKEDITOR.env.ie) x.attributes.style = function (a) { return a.replace(/(^|;)([^\:]+)/g, function (a) { return a.toLowerCase() }) };
        var t = /<(a|area|img|input|source)\b([^>]*)>/gi, z = /\s(on\w+|href|src|name)\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|(?:[^ "'>]+))/gi, B = /(?:<style(?=[ >])[^>]*>[\s\S]*?<\/style>)|(?:<(:?link|meta|base)[^>]*>)/gi, F = /(<textarea(?=[ >])[^>]*>)([\s\S]*?)(?:<\/textarea>)/gi, C = /<cke:encoded>([^<]*)<\/cke:encoded>/gi, D = /(<\/?)((?:object|embed|param|html|body|head|title)[^>]*>)/gi, E = /(<\/?)cke:((?:html|body|head|title)[^>]*>)/gi, I = /<cke:(param|embed)([^>]*?)\/?>(?!\s*<\/cke:\1)/gi
    }(), "use strict", CKEDITOR.htmlParser.element =
    function (d, e) { this.name = d; this.attributes = e || {}; this.children = []; var c = d || "", a = c.match(/^cke:(.*)/); a && (c = a[1]); c = !(!CKEDITOR.dtd.$nonBodyContent[c] && !CKEDITOR.dtd.$block[c] && !CKEDITOR.dtd.$listItem[c] && !CKEDITOR.dtd.$tableContent[c] && !(CKEDITOR.dtd.$nonEditable[c] || c == "br")); this.isEmpty = !!CKEDITOR.dtd.$empty[d]; this.isUnknown = !CKEDITOR.dtd[d]; this._ = { isBlockLike: c, hasInlineStarted: this.isEmpty || !c } }, CKEDITOR.htmlParser.cssStyle = function (d) {
        var e = {}; ((d instanceof CKEDITOR.htmlParser.element ? d.attributes.style :
        d) || "").replace(/&quot;/g, '"').replace(/\s*([^ :;]+)\s*:\s*([^;]+)\s*(?=;|$)/g, function (c, a, b) { a == "font-family" && (b = b.replace(/["']/g, "")); e[a.toLowerCase()] = b }); return { rules: e, populate: function (c) { var a = this.toString(); if (a) c instanceof CKEDITOR.dom.element ? c.setAttribute("style", a) : c instanceof CKEDITOR.htmlParser.element ? c.attributes.style = a : c.style = a }, toString: function () { var c = [], a; for (a in e) e[a] && c.push(a, ":", e[a], ";"); return c.join("") } }
    }, function () {
        function d(a) {
            return function (b) {
                return b.type ==
                CKEDITOR.NODE_ELEMENT && (typeof a == "string" ? b.name == a : b.name in a)
            }
        } var e = function (a, b) { a = a[0]; b = b[0]; return a < b ? -1 : a > b ? 1 : 0 }, c = CKEDITOR.htmlParser.fragment.prototype; CKEDITOR.htmlParser.element.prototype = CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node, {
            type: CKEDITOR.NODE_ELEMENT, add: c.add, clone: function () { return new CKEDITOR.htmlParser.element(this.name, this.attributes) }, filter: function (a, b) {
                var c = this, d, e, b = c.getFilterContext(b); if (b.off) return true; if (!c.parent) a.onRoot(b, c); for (; ;) {
                    d = c.name;
                    if (!(e = a.onElementName(b, d))) { this.remove(); return false } c.name = e; if (!(c = a.onElement(b, c))) { this.remove(); return false } if (c !== this) { this.replaceWith(c); return false } if (c.name == d) break; if (c.type != CKEDITOR.NODE_ELEMENT) { this.replaceWith(c); return false } if (!c.name) { this.replaceWithChildren(); return false }
                } d = c.attributes; var f, i; for (f in d) { i = f; for (e = d[f]; ;) if (i = a.onAttributeName(b, f)) if (i != f) { delete d[f]; f = i } else break; else { delete d[f]; break } i && ((e = a.onAttribute(b, c, i, e)) === false ? delete d[i] : d[i] = e) } c.isEmpty ||
                this.filterChildren(a, false, b); return true
            }, filterChildren: c.filterChildren, writeHtml: function (a, b) { b && this.filter(b); var c = this.name, d = [], h = this.attributes, f, i; a.openTag(c, h); for (f in h) d.push([f, h[f]]); a.sortAttributes && d.sort(e); f = 0; for (i = d.length; f < i; f++) { h = d[f]; a.attribute(h[0], h[1]) } a.openTagClose(c, this.isEmpty); this.writeChildrenHtml(a); this.isEmpty || a.closeTag(c) }, writeChildrenHtml: c.writeChildrenHtml, replaceWithChildren: function () {
                for (var a = this.children, b = a.length; b;) a[--b].insertAfter(this);
                this.remove()
            }, forEach: c.forEach, getFirst: function (a) { if (!a) return this.children.length ? this.children[0] : null; typeof a != "function" && (a = d(a)); for (var b = 0, c = this.children.length; b < c; ++b) if (a(this.children[b])) return this.children[b]; return null }, getHtml: function () { var a = new CKEDITOR.htmlParser.basicWriter; this.writeChildrenHtml(a); return a.getHtml() }, setHtml: function (a) { for (var a = this.children = CKEDITOR.htmlParser.fragment.fromHtml(a).children, b = 0, c = a.length; b < c; ++b) a[b].parent = this }, getOuterHtml: function () {
                var a =
                new CKEDITOR.htmlParser.basicWriter; this.writeHtml(a); return a.getHtml()
            }, split: function (a) { for (var b = this.children.splice(a, this.children.length - a), c = this.clone(), d = 0; d < b.length; ++d) b[d].parent = c; c.children = b; if (b[0]) b[0].previous = null; if (a > 0) this.children[a - 1].next = null; this.parent.add(c, this.getIndex() + 1); return c }, removeClass: function (a) { var b = this.attributes["class"]; if (b) (b = CKEDITOR.tools.trim(b.replace(RegExp("(?:\\s+|^)" + a + "(?:\\s+|$)"), " "))) ? this.attributes["class"] = b : delete this.attributes["class"] },
            hasClass: function (a) { var b = this.attributes["class"]; return !b ? false : RegExp("(?:^|\\s)" + a + "(?=\\s|$)").test(b) }, getFilterContext: function (a) {
                var b = []; a || (a = { off: false, nonEditable: false, nestedEditable: false }); !a.off && this.attributes["data-cke-processor"] == "off" && b.push("off", true); !a.nonEditable && this.attributes.contenteditable == "false" ? b.push("nonEditable", true) : !a.nestedEditable && this.attributes.contenteditable == "true" && b.push("nestedEditable", true); if (b.length) for (var a = CKEDITOR.tools.copy(a), c = 0; c <
                b.length; c = c + 2) a[b[c]] = b[c + 1]; return a
            }
        }, true)
    }(), function () { var d = {}, e = /{([^}]+)}/g, c = /([\\'])/g, a = /\n/g, b = /\r/g; CKEDITOR.template = function (j) { if (d[j]) this.output = d[j]; else { var g = j.replace(c, "\\$1").replace(a, "\\n").replace(b, "\\r").replace(e, function (a, b) { return "',data['" + b + "']==undefined?'{" + b + "}':data['" + b + "'],'" }); this.output = d[j] = Function("data", "buffer", "return buffer?buffer.push('" + g + "'):['" + g + "'].join('');") } } }(), delete CKEDITOR.loadFullCore, CKEDITOR.instances = {}, CKEDITOR.document = new CKEDITOR.dom.document(document),
    CKEDITOR.add = function (d) { CKEDITOR.instances[d.name] = d; d.on("focus", function () { if (CKEDITOR.currentInstance != d) { CKEDITOR.currentInstance = d; CKEDITOR.fire("currentInstance") } }); d.on("blur", function () { if (CKEDITOR.currentInstance == d) { CKEDITOR.currentInstance = null; CKEDITOR.fire("currentInstance") } }); CKEDITOR.fire("instance", null, d) }, CKEDITOR.remove = function (d) { delete CKEDITOR.instances[d.name] }, function () {
        var d = {}; CKEDITOR.addTemplate = function (e, c) {
            var a = d[e]; if (a) return a; a = { name: e, source: c }; CKEDITOR.fire("template",
            a); return d[e] = new CKEDITOR.template(a.source)
        }; CKEDITOR.getTemplate = function (e) { return d[e] }
    }(), function () { var d = []; CKEDITOR.addCss = function (e) { d.push(e) }; CKEDITOR.getCss = function () { return d.join("\n") } }(), CKEDITOR.on("instanceDestroyed", function () { CKEDITOR.tools.isEmpty(this.instances) && CKEDITOR.fire("reset") }), CKEDITOR.TRISTATE_ON = 1, CKEDITOR.TRISTATE_OFF = 2, CKEDITOR.TRISTATE_DISABLED = 0, function () {
        CKEDITOR.inline = function (d, e) {
            if (!CKEDITOR.env.isCompatible) return null; d = CKEDITOR.dom.element.get(d);
            if (d.getEditor()) throw 'The editor instance "' + d.getEditor().name + '" is already attached to the provided element.'; var c = new CKEDITOR.editor(e, d, CKEDITOR.ELEMENT_MODE_INLINE), a = d.is("textarea") ? d : null; if (a) { c.setData(a.getValue(), null, true); d = CKEDITOR.dom.element.createFromHtml('<div contenteditable="' + !!c.readOnly + '" class="cke_textarea_inline">' + a.getValue() + "</div>", CKEDITOR.document); d.insertAfter(a); a.hide(); a.$.form && c._attachToForm() } else c.setData(d.getHtml(), null, true); c.on("loaded", function () {
                c.fire("uiReady");
                c.editable(d); c.container = d; c.setData(c.getData(1)); c.resetDirty(); c.fire("contentDom"); c.mode = "wysiwyg"; c.fire("mode"); c.status = "ready"; c.fireOnce("instanceReady"); CKEDITOR.fire("instanceReady", null, c)
            }, null, null, 1E4); c.on("destroy", function () { if (a) { c.container.clearCustomData(); c.container.remove(); a.show() } c.element.clearCustomData(); delete c.element }); return c
        }; CKEDITOR.inlineAll = function () {
            var d, e, c; for (c in CKEDITOR.dtd.$editable) for (var a = CKEDITOR.document.getElementsByTag(c), b = 0, j = a.count() ; b <
            j; b++) { d = a.getItem(b); if (d.getAttribute("contenteditable") == "true") { e = { element: d, config: {} }; CKEDITOR.fire("inline", e) !== false && CKEDITOR.inline(d, e.config) } }
        }; CKEDITOR.domReady(function () { !CKEDITOR.disableAutoInline && CKEDITOR.inlineAll() })
    }(), CKEDITOR.replaceClass = "ckeditor", function () {
        function d(a, d, g, h) {
            if (!CKEDITOR.env.isCompatible) return null; a = CKEDITOR.dom.element.get(a); if (a.getEditor()) throw 'The editor instance "' + a.getEditor().name + '" is already attached to the provided element.'; var f = new CKEDITOR.editor(d,
            a, h); if (h == CKEDITOR.ELEMENT_MODE_REPLACE) { a.setStyle("visibility", "hidden"); f._.required = a.hasAttribute("required"); a.removeAttribute("required") } g && f.setData(g, null, true); f.on("loaded", function () { c(f); h == CKEDITOR.ELEMENT_MODE_REPLACE && (f.config.autoUpdateElement && a.$.form) && f._attachToForm(); f.setMode(f.config.startupMode, function () { f.resetDirty(); f.status = "ready"; f.fireOnce("instanceReady"); CKEDITOR.fire("instanceReady", null, f) }) }); f.on("destroy", e); return f
        } function e() {
            var a = this.container, c =
            this.element; if (a) { a.clearCustomData(); a.remove() } if (c) { c.clearCustomData(); if (this.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE) { c.show(); this._.required && c.setAttribute("required", "required") } delete this.element }
        } function c(b) {
            var c = b.name, d = b.element, e = b.elementMode, f = b.fire("uiSpace", { space: "top", html: "" }).html, i = b.fire("uiSpace", { space: "bottom", html: "" }).html; a || (a = CKEDITOR.addTemplate("maincontainer", '<{outerEl} id="cke_{name}" class="{id} cke cke_reset cke_chrome cke_editor_{name} cke_{langDir} ' +
            CKEDITOR.env.cssClass + '"  dir="{langDir}" lang="{langCode}" role="application" aria-labelledby="cke_{name}_arialbl"><span id="cke_{name}_arialbl" class="cke_voice_label">{voiceLabel}</span><{outerEl} class="cke_inner cke_reset" role="presentation">{topHtml}<{outerEl} id="{contentId}" class="cke_contents cke_reset" role="presentation"></{outerEl}>{bottomHtml}</{outerEl}></{outerEl}>')); c = CKEDITOR.dom.element.createFromHtml(a.output({
                id: b.id, name: c, langDir: b.lang.dir, langCode: b.langCode, voiceLabel: [b.lang.editor,
                b.name].join(", "), topHtml: f ? '<span id="' + b.ui.spaceId("top") + '" class="cke_top cke_reset_all" role="presentation" style="height:auto">' + f + "</span>" : "", contentId: b.ui.spaceId("contents"), bottomHtml: i ? '<span id="' + b.ui.spaceId("bottom") + '" class="cke_bottom cke_reset_all" role="presentation">' + i + "</span>" : "", outerEl: CKEDITOR.env.ie ? "span" : "div"
            })); if (e == CKEDITOR.ELEMENT_MODE_REPLACE) { d.hide(); c.insertAfter(d) } else d.append(c); b.container = c; f && b.ui.space("top").unselectable(); i && b.ui.space("bottom").unselectable();
            d = b.config.width; e = b.config.height; d && c.setStyle("width", CKEDITOR.tools.cssLength(d)); e && b.ui.space("contents").setStyle("height", CKEDITOR.tools.cssLength(e)); c.disableContextMenu(); CKEDITOR.env.webkit && c.on("focus", function () { b.focus() }); b.fireOnce("uiReady")
        } CKEDITOR.replace = function (a, c) { return d(a, c, null, CKEDITOR.ELEMENT_MODE_REPLACE) }; CKEDITOR.appendTo = function (a, c, g) { return d(a, c, g, CKEDITOR.ELEMENT_MODE_APPENDTO) }; CKEDITOR.replaceAll = function () {
            for (var a = document.getElementsByTagName("textarea"),
            c = 0; c < a.length; c++) { var d = null, e = a[c]; if (e.name || e.id) { if (typeof arguments[0] == "string") { if (!RegExp("(?:^|\\s)" + arguments[0] + "(?:$|\\s)").test(e.className)) continue } else if (typeof arguments[0] == "function") { d = {}; if (arguments[0](e, d) === false) continue } this.replace(e, d) } }
        }; CKEDITOR.editor.prototype.addMode = function (a, c) { (this._.modes || (this._.modes = {}))[a] = c }; CKEDITOR.editor.prototype.setMode = function (a, c) {
            var d = this, e = this._.modes; if (!(a == d.mode || !e || !e[a])) {
                d.fire("beforeSetMode", a); if (d.mode) {
                    var f =
                    d.checkDirty(); d._.previousMode = d.mode; d.fire("beforeModeUnload"); d.editable(0); d.ui.space("contents").setHtml(""); d.mode = ""
                } this._.modes[a](function () { d.mode = a; f !== void 0 && !f && d.resetDirty(); setTimeout(function () { d.fire("mode"); c && c.call(d) }, 0) })
            }
        }; CKEDITOR.editor.prototype.resize = function (a, c, d, e) {
            var f = this.container, i = this.ui.space("contents"), k = CKEDITOR.env.webkit && this.document && this.document.getWindow().$.frameElement, e = e ? f.getChild(1) : f; e.setSize("width", a, true); k && (k.style.width = "1%"); i.setStyle("height",
            Math.max(c - (d ? 0 : (e.$.offsetHeight || 0) - (i.$.clientHeight || 0)), 0) + "px"); k && (k.style.width = "100%"); this.fire("resize")
        }; CKEDITOR.editor.prototype.getResizable = function (a) { return a ? this.ui.space("contents") : this.container }; var a; CKEDITOR.domReady(function () { CKEDITOR.replaceClass && CKEDITOR.replaceAll(CKEDITOR.replaceClass) })
    }(), CKEDITOR.config.startupMode = "wysiwyg", function () {
        function d(b) {
            var c = b.editor, d = b.data.path, f = d.blockLimit, g = b.data.selection, h = g.getRanges()[0], i; if (CKEDITOR.env.gecko || CKEDITOR.env.ie &&
            CKEDITOR.env.needsBrFiller) if (g = e(g, d)) { g.appendBogus(); i = CKEDITOR.env.ie } if (c.config.autoParagraph !== false && c.activeEnterMode != CKEDITOR.ENTER_BR && c.editable().equals(f) && !d.block && h.collapsed && !h.getCommonAncestor().isReadOnly()) {
                d = h.clone(); d.enlarge(CKEDITOR.ENLARGE_BLOCK_CONTENTS); f = new CKEDITOR.dom.walker(d); f.guard = function (b) { return !a(b) || b.type == CKEDITOR.NODE_COMMENT || b.isReadOnly() }; if (!f.checkForward() || d.checkStartOfBlock() && d.checkEndOfBlock()) {
                    c = h.fixBlock(true, c.activeEnterMode == CKEDITOR.ENTER_DIV ?
                    "div" : "p"); if (!CKEDITOR.env.needsBrFiller) (c = c.getFirst(a)) && (c.type == CKEDITOR.NODE_TEXT && CKEDITOR.tools.trim(c.getText()).match(/^(?:&nbsp;|\xa0)$/)) && c.remove(); i = 1; b.cancel()
                }
            } i && h.select()
        } function e(b, c) { if (b.isFake) return 0; var d = c.block || c.blockLimit, f = d && d.getLast(a); if (d && d.isBlockBoundary() && (!f || !(f.type == CKEDITOR.NODE_ELEMENT && f.isBlockBoundary())) && !d.is("pre") && !d.getBogus()) return d } function c(a) {
            var b = a.data.getTarget(); if (b.is("input")) {
                b = b.getAttribute("type"); (b == "submit" || b == "reset") &&
                a.data.preventDefault()
            }
        } function a(a) { return k(a) && o(a) } function b(a, b) { return function (c) { var d = CKEDITOR.dom.element.get(c.data.$.toElement || c.data.$.fromElement || c.data.$.relatedTarget); (!d || !b.equals(d) && !b.contains(d)) && a.call(this, c) } } function j(b) {
            var c, d = b.getRanges()[0], g = b.root, e = { table: 1, ul: 1, ol: 1, dl: 1 }; if (d.startPath().contains(e)) {
                var b = function (b) { return function (d, g) { g && (d.type == CKEDITOR.NODE_ELEMENT && d.is(e)) && (c = d); if (!g && a(d) && (!b || !f(d))) return false } }, h = d.clone(); h.collapse(1);
                h.setStartAt(g, CKEDITOR.POSITION_AFTER_START); g = new CKEDITOR.dom.walker(h); g.guard = b(); g.checkBackward(); if (c) { h = d.clone(); h.collapse(); h.setEndAt(c, CKEDITOR.POSITION_AFTER_END); g = new CKEDITOR.dom.walker(h); g.guard = b(true); c = false; g.checkForward(); return c }
            } return null
        } function g(a) { a.editor.focus(); a.editor.fire("saveSnapshot") } function h(a, b) { var c = a.editor; !b && c.getSelection().scrollIntoView(); setTimeout(function () { c.fire("saveSnapshot") }, 0) } CKEDITOR.editable = CKEDITOR.tools.createClass({
            base: CKEDITOR.dom.element,
            $: function (a, b) { this.base(b.$ || b); this.editor = a; this.hasFocus = false; this.setup() }, proto: {
                focus: function () {
                    var a; if (CKEDITOR.env.webkit && !this.hasFocus) { a = this.editor._.previousActive || this.getDocument().getActive(); if (this.contains(a)) { a.focus(); return } } try { this.$[CKEDITOR.env.ie && this.getDocument().equals(CKEDITOR.document) ? "setActive" : "focus"]() } catch (b) { if (!CKEDITOR.env.ie) throw b; } if (CKEDITOR.env.safari && !this.isInline()) {
                        a = CKEDITOR.document.getActive(); a.equals(this.getWindow().getFrame()) ||
                        this.getWindow().focus()
                    }
                }, on: function (a, c) { var d = Array.prototype.slice.call(arguments, 0); if (CKEDITOR.env.ie && /^focus|blur$/.exec(a)) { a = a == "focus" ? "focusin" : "focusout"; c = b(c, this); d[0] = a; d[1] = c } return CKEDITOR.dom.element.prototype.on.apply(this, d) }, attachListener: function (a, b, c, d, f, g) { !this._.listeners && (this._.listeners = []); var e = Array.prototype.slice.call(arguments, 1), e = a.on.apply(a, e); this._.listeners.push(e); return e }, clearListeners: function () { var a = this._.listeners; try { for (; a.length;) a.pop().removeListener() } catch (b) { } },
                restoreAttrs: function () { var a = this._.attrChanges, b, c; for (c in a) if (a.hasOwnProperty(c)) { b = a[c]; b !== null ? this.setAttribute(c, b) : this.removeAttribute(c) } }, attachClass: function (a) { var b = this.getCustomData("classes"); if (!this.hasClass(a)) { !b && (b = []); b.push(a); this.setCustomData("classes", b); this.addClass(a) } }, changeAttr: function (a, b) { var c = this.getAttribute(a); if (b !== c) { !this._.attrChanges && (this._.attrChanges = {}); a in this._.attrChanges || (this._.attrChanges[a] = c); this.setAttribute(a, b) } }, insertHtml: function (a,
                b) { g(this); m(this, b || "html", a) }, insertText: function (a) {
                    g(this); var b = this.editor, c = b.getSelection().getStartElement().hasAscendant("pre", true) ? CKEDITOR.ENTER_BR : b.activeEnterMode, b = c == CKEDITOR.ENTER_BR, d = CKEDITOR.tools, a = d.htmlEncode(a.replace(/\r\n/g, "\n")), a = a.replace(/\t/g, "&nbsp;&nbsp; &nbsp;"), c = c == CKEDITOR.ENTER_P ? "p" : "div"; if (!b) { var f = /\n{2}/g; if (f.test(a)) var e = "<" + c + ">", h = "</" + c + ">", a = e + a.replace(f, function () { return h + e }) + h } a = a.replace(/\n/g, "<br>"); b || (a = a.replace(RegExp("<br>(?=</" + c +
                    ">)"), function (a) { return d.repeat(a, 2) })); a = a.replace(/^ | $/g, "&nbsp;"); a = a.replace(/(>|\s) /g, function (a, b) { return b + "&nbsp;" }).replace(/ (?=<)/g, "&nbsp;"); m(this, "text", a)
                }, insertElement: function (a, b) { b ? this.insertElementIntoRange(a, b) : this.insertElementIntoSelection(a) }, insertElementIntoRange: function (a, b) {
                    var c = this.editor, d = c.config.enterMode, f = a.getName(), g = CKEDITOR.dtd.$block[f]; if (b.checkReadOnly()) return false; b.deleteContents(1); b.startContainer.type == CKEDITOR.NODE_ELEMENT && b.startContainer.is({
                        tr: 1,
                        table: 1, tbody: 1, thead: 1, tfoot: 1
                    }) && q(b); var e, h; if (g) for (; (e = b.getCommonAncestor(0, 1)) && (h = CKEDITOR.dtd[e.getName()]) && (!h || !h[f]) ;) if (e.getName() in CKEDITOR.dtd.span) b.splitElement(e); else if (b.checkStartOfBlock() && b.checkEndOfBlock()) { b.setStartBefore(e); b.collapse(true); e.remove() } else b.splitBlock(d == CKEDITOR.ENTER_DIV ? "div" : "p", c.editable()); b.insertNode(a); return true
                }, insertElementIntoSelection: function (b) {
                    var c = this.editor, d = c.activeEnterMode, c = c.getSelection(), e = c.getRanges()[0], i = b.getName(),
                    i = CKEDITOR.dtd.$block[i]; g(this); if (this.insertElementIntoRange(b, e)) { e.moveToPosition(b, CKEDITOR.POSITION_AFTER_END); if (i) if ((i = b.getNext(function (b) { return a(b) && !f(b) })) && i.type == CKEDITOR.NODE_ELEMENT && i.is(CKEDITOR.dtd.$block)) i.getDtd()["#"] ? e.moveToElementEditStart(i) : e.moveToElementEditEnd(b); else if (!i && d != CKEDITOR.ENTER_BR) { i = e.fixBlock(true, d == CKEDITOR.ENTER_DIV ? "div" : "p"); e.moveToElementEditStart(i) } } c.selectRanges([e]); h(this, CKEDITOR.env.opera)
                }, setData: function (a, b) {
                    b || (a = this.editor.dataProcessor.toHtml(a));
                    this.setHtml(a); this.editor.fire("dataReady")
                }, getData: function (a) { var b = this.getHtml(); a || (b = this.editor.dataProcessor.toDataFormat(b)); return b }, setReadOnly: function (a) { this.setAttribute("contenteditable", !a) }, detach: function () { this.removeClass("cke_editable"); var a = this.editor; this._.detach(); delete a.document; delete a.window }, isInline: function () { return this.getDocument().equals(CKEDITOR.document) }, setup: function () {
                    var b = this.editor; this.attachListener(b, "beforeGetData", function () {
                        var a = this.getData();
                        this.is("textarea") || b.config.ignoreEmptyParagraph !== false && (a = a.replace(i, function (a, b) { return b })); b.setData(a, null, 1)
                    }, this); this.attachListener(b, "getSnapshot", function (a) { a.data = this.getData(1) }, this); this.attachListener(b, "afterSetData", function () { this.setData(b.getData(1)) }, this); this.attachListener(b, "loadSnapshot", function (a) { this.setData(a.data, 1) }, this); this.attachListener(b, "beforeFocus", function () { var a = b.getSelection(); (a = a && a.getNative()) && a.type == "Control" || this.focus() }, this); this.attachListener(b,
                    "insertHtml", function (a) { this.insertHtml(a.data.dataValue, a.data.mode) }, this); this.attachListener(b, "insertElement", function (a) { this.insertElement(a.data) }, this); this.attachListener(b, "insertText", function (a) { this.insertText(a.data) }, this); this.setReadOnly(b.readOnly); this.attachClass("cke_editable"); this.attachClass(b.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? "cke_editable_inline" : b.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE || b.elementMode == CKEDITOR.ELEMENT_MODE_APPENDTO ? "cke_editable_themed" : "");
                    this.attachClass("cke_contents_" + b.config.contentsLangDirection); b.keystrokeHandler.blockedKeystrokes[8] = +b.readOnly; b.keystrokeHandler.attach(this); this.on("blur", function (a) { CKEDITOR.env.opera && CKEDITOR.document.getActive().equals(this.isInline() ? this : this.getWindow().getFrame()) ? a.cancel() : this.hasFocus = false }, null, null, -1); this.on("focus", function () { this.hasFocus = true }, null, null, -1); b.focusManager.add(this); if (this.equals(CKEDITOR.document.getActive())) {
                        this.hasFocus = true; b.once("contentDom",
                        function () { b.focusManager.focus() })
                    } this.isInline() && this.changeAttr("tabindex", b.tabIndex); if (!this.is("textarea")) {
                        b.document = this.getDocument(); b.window = this.getWindow(); var d = b.document; this.changeAttr("spellcheck", !b.config.disableNativeSpellChecker); var f = b.config.contentsLangDirection; this.getDirection(1) != f && this.changeAttr("dir", f); var g = CKEDITOR.getCss(); if (g) {
                            f = d.getHead(); if (!f.getCustomData("stylesheet")) {
                                g = d.appendStyleText(g); g = new CKEDITOR.dom.element(g.ownerNode || g.owningElement);
                                f.setCustomData("stylesheet", g); g.data("cke-temp", 1)
                            }
                        } f = d.getCustomData("stylesheet_ref") || 0; d.setCustomData("stylesheet_ref", f + 1); this.setCustomData("cke_includeReadonly", !b.config.disableReadonlyStyling); this.attachListener(this, "click", function (a) { var a = a.data, b = (new CKEDITOR.dom.elementPath(a.getTarget(), this)).contains("a"); b && (a.$.button != 2 && b.isReadOnly()) && a.preventDefault() }); var e = { 8: 1, 46: 1 }; this.attachListener(b, "key", function (a) {
                            if (b.readOnly) return true; var c = a.data.keyCode, d; if (c in
                            e) {
                                var a = b.getSelection(), f, g = a.getRanges()[0], h = g.startPath(), i, p, n, c = c == 8; if (CKEDITOR.env.ie && CKEDITOR.env.version < 11 && (f = a.getSelectedElement()) || (f = j(a))) { b.fire("saveSnapshot"); g.moveToPosition(f, CKEDITOR.POSITION_BEFORE_START); f.remove(); g.select(); b.fire("saveSnapshot"); d = 1 } else if (g.collapsed) if ((i = h.block) && (n = i[c ? "getPrevious" : "getNext"](k)) && n.type == CKEDITOR.NODE_ELEMENT && n.is("table") && g[c ? "checkStartOfBlock" : "checkEndOfBlock"]()) {
                                    b.fire("saveSnapshot"); g[c ? "checkEndOfBlock" : "checkStartOfBlock"]() &&
                                    i.remove(); g["moveToElementEdit" + (c ? "End" : "Start")](n); g.select(); b.fire("saveSnapshot"); d = 1
                                } else if (h.blockLimit && h.blockLimit.is("td") && (p = h.blockLimit.getAscendant("table")) && g.checkBoundaryOfElement(p, c ? CKEDITOR.START : CKEDITOR.END) && (n = p[c ? "getPrevious" : "getNext"](k))) { b.fire("saveSnapshot"); g["moveToElementEdit" + (c ? "End" : "Start")](n); g.checkStartOfBlock() && g.checkEndOfBlock() ? n.remove() : g.select(); b.fire("saveSnapshot"); d = 1 } else if ((p = h.contains(["td", "th", "caption"])) && g.checkBoundaryOfElement(p,
                                c ? CKEDITOR.START : CKEDITOR.END)) d = 1
                            } return !d
                        }); b.blockless && (CKEDITOR.env.ie && CKEDITOR.env.needsBrFiller) && this.attachListener(this, "keyup", function (c) { if (c.data.getKeystroke() in e && !this.getFirst(a)) { this.appendBogus(); c = b.createRange(); c.moveToPosition(this, CKEDITOR.POSITION_AFTER_START); c.select() } }); this.attachListener(this, "dblclick", function (a) { if (b.readOnly) return false; a = { element: a.data.getTarget() }; b.fire("doubleclick", a) }); CKEDITOR.env.ie && this.attachListener(this, "click", c); !CKEDITOR.env.ie &&
                        !CKEDITOR.env.opera && this.attachListener(this, "mousedown", function (a) { var c = a.data.getTarget(); if (c.is("img", "hr", "input", "textarea", "select")) { b.getSelection().selectElement(c); c.is("input", "textarea", "select") && a.data.preventDefault() } }); CKEDITOR.env.gecko && this.attachListener(this, "mouseup", function (a) { if (a.data.$.button == 2) { a = a.data.getTarget(); if (!a.getOuterHtml().replace(i, "")) { var c = b.createRange(); c.moveToElementEditStart(a); c.select(true) } } }); if (CKEDITOR.env.webkit) {
                            this.attachListener(this,
                            "click", function (a) { a.data.getTarget().is("input", "select") && a.data.preventDefault() }); this.attachListener(this, "mouseup", function (a) { a.data.getTarget().is("input", "textarea") && a.data.preventDefault() })
                        }
                    }
                }
            }, _: {
                detach: function () {
                    this.editor.setData(this.editor.getData(), 0, 1); this.clearListeners(); this.restoreAttrs(); var a; if (a = this.removeCustomData("classes")) for (; a.length;) this.removeClass(a.pop()); a = this.getDocument(); var b = a.getHead(); if (b.getCustomData("stylesheet")) {
                        var c = a.getCustomData("stylesheet_ref");
                        if (--c) a.setCustomData("stylesheet_ref", c); else { a.removeCustomData("stylesheet_ref"); b.removeCustomData("stylesheet").remove() }
                    } this.editor.fire("contentDomUnload"); delete this.editor
                }
            }
        }); CKEDITOR.editor.prototype.editable = function (a) { var b = this._.editable; if (b && a) return 0; if (arguments.length) b = this._.editable = a ? a instanceof CKEDITOR.editable ? a : new CKEDITOR.editable(this, a) : (b && b.detach(), null); return b }; var f = CKEDITOR.dom.walker.bogus(), i = /(^|<body\b[^>]*>)\s*<(p|div|address|h\d|center|pre)[^>]*>\s*(?:<br[^>]*>|&nbsp;|\u00A0|&#160;)?\s*(:?<\/\2>)?\s*(?=$|<\/body>)/gi,
        k = CKEDITOR.dom.walker.whitespaces(true), o = CKEDITOR.dom.walker.bookmark(false, true); CKEDITOR.on("instanceLoaded", function (a) {
            var b = a.editor; b.on("insertElement", function (a) { a = a.data; if (a.type == CKEDITOR.NODE_ELEMENT && (a.is("input") || a.is("textarea"))) { a.getAttribute("contentEditable") != "false" && a.data("cke-editable", a.hasAttribute("contenteditable") ? "true" : "1"); a.setAttribute("contentEditable", false) } }); b.on("selectionChange", function (a) {
                if (!b.readOnly) {
                    var c = b.getSelection(); if (c && !c.isLocked) {
                        c = b.checkDirty();
                        b.fire("lockSnapshot"); d(a); b.fire("unlockSnapshot"); !c && b.resetDirty()
                    }
                }
            })
        }); CKEDITOR.on("instanceCreated", function (a) {
            var b = a.editor; b.on("mode", function () {
                var a = b.editable(); if (a && a.isInline()) {
                    var c = b.title; a.changeAttr("role", "textbox"); a.changeAttr("aria-label", c); c && a.changeAttr("title", c); if (c = this.ui.space(this.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? "top" : "contents")) {
                        var d = CKEDITOR.tools.getNextId(), f = CKEDITOR.dom.element.createFromHtml('<span id="' + d + '" class="cke_voice_label">' + this.lang.common.editorHelp +
                        "</span>"); c.append(f); a.changeAttr("aria-describedby", d)
                    }
                }
            })
        }); CKEDITOR.addCss(".cke_editable{cursor:text}.cke_editable img,.cke_editable input,.cke_editable textarea{cursor:default}"); var m = function () {
            function b(a) { return a.type == CKEDITOR.NODE_ELEMENT } function c(a, d) {
                var f, g, e, h, j = [], p = d.range.startContainer; f = d.range.startPath(); for (var p = i[p.getName()], k = 0, w = a.getChildren(), y = w.count(), o = -1, m = -1, u = 0, r = f.contains(i.$list) ; k < y; ++k) {
                    f = w.getItem(k); if (b(f)) {
                        e = f.getName(); if (r && e in CKEDITOR.dtd.$list) j =
                        j.concat(c(f, d)); else { h = !!p[e]; if (e == "br" && f.data("cke-eol") && (!k || k == y - 1)) { u = (g = k ? j[k - 1].node : w.getItem(k + 1)) && (!b(g) || !g.is("br")); g = g && b(g) && i.$block[g.getName()] } o == -1 && !h && (o = k); h || (m = k); j.push({ isElement: 1, isLineBreak: u, isBlock: f.isBlockBoundary(), hasBlockSibling: g, node: f, name: e, allowed: h }); g = u = 0 }
                    } else j.push({ isElement: 0, node: f, allowed: 1 })
                } if (o > -1) j[o].firstNotAllowed = 1; if (m > -1) j[m].lastNotAllowed = 1; return j
            } function d(a, c) {
                var f = [], g = a.getChildren(), e = g.count(), h, j = 0, p = i[c], k = !a.is(i.$inline) ||
                a.is("br"); for (k && f.push(" ") ; j < e; j++) { h = g.getItem(j); b(h) && !h.is(p) ? f = f.concat(d(h, c)) : f.push(h) } k && f.push(" "); return f
            } function f(a) { return a && b(a) && (a.is(i.$removeEmpty) || a.is("a") && !a.isBlockBoundary()) } function g(a, c, d, f) {
                var e = a.clone(), h, i; e.setEndAt(c, CKEDITOR.POSITION_BEFORE_END); if ((h = (new CKEDITOR.dom.walker(e)).next()) && b(h) && j[h.getName()] && (i = h.getPrevious()) && b(i) && !i.getParent().equals(a.startContainer) && d.contains(i) && f.contains(h) && h.isIdentical(i)) {
                    h.moveChildren(i); h.remove();
                    g(a, c, d, f)
                }
            } function e(a, c) { function d(a, c) { if (c.isBlock && c.isElement && !c.node.is("br") && b(a) && a.is("br")) { a.remove(); return 1 } } var f = c.endContainer.getChild(c.endOffset), g = c.endContainer.getChild(c.endOffset - 1); f && d(f, a[a.length - 1]); if (g && d(g, a[0])) { c.setEnd(c.endContainer, c.endOffset - 1); c.collapse() } } var i = CKEDITOR.dtd, j = { p: 1, div: 1, h1: 1, h2: 1, h3: 1, h4: 1, h5: 1, h6: 1, ul: 1, ol: 1, li: 1, pre: 1, dl: 1, blockquote: 1 }, k = { p: 1, div: 1, h1: 1, h2: 1, h3: 1, h4: 1, h5: 1, h6: 1 }, o = CKEDITOR.tools.extend({}, i.$inline); delete o.br; return function (j,
            m, q) {
                var v = j.editor; j.getDocument(); var F = v.getSelection().getRanges()[0], C = false; if (m == "unfiltered_html") { m = "html"; C = true } if (!F.checkReadOnly()) {
                    var D = (new CKEDITOR.dom.elementPath(F.startContainer, F.root)).blockLimit || F.root, m = { type: m, dontFilter: C, editable: j, editor: v, range: F, blockLimit: D, mergeCandidates: [], zombies: [] }, v = m.range, C = m.mergeCandidates, E, I, J, G; if (m.type == "text" && v.shrink(CKEDITOR.SHRINK_ELEMENT, true, false)) {
                        E = CKEDITOR.dom.element.createFromHtml("<span>&nbsp;</span>", v.document); v.insertNode(E);
                        v.setStartAfter(E)
                    } I = new CKEDITOR.dom.elementPath(v.startContainer); m.endPath = J = new CKEDITOR.dom.elementPath(v.endContainer); if (!v.collapsed) { var D = J.block || J.blockLimit, P = v.getCommonAncestor(); D && (!D.equals(P) && !D.contains(P) && v.checkEndOfBlock()) && m.zombies.push(D); v.deleteContents() } for (; (G = b(v.startContainer) && v.startContainer.getChild(v.startOffset - 1)) && b(G) && G.isBlockBoundary() && I.contains(G) ;) v.moveToPosition(G, CKEDITOR.POSITION_BEFORE_END); g(v, m.blockLimit, I, J); if (E) {
                        v.setEndBefore(E); v.collapse();
                        E.remove()
                    } E = v.startPath(); if (D = E.contains(f, false, 1)) { v.splitElement(D); m.inlineStylesRoot = D; m.inlineStylesPeak = E.lastElement } E = v.createBookmark(); (D = E.startNode.getPrevious(a)) && b(D) && f(D) && C.push(D); (D = E.startNode.getNext(a)) && b(D) && f(D) && C.push(D); for (D = E.startNode; (D = D.getParent()) && f(D) ;) C.push(D); v.moveToBookmark(E); if (E = q) {
                        E = m.range; if (m.type == "text" && m.inlineStylesRoot) {
                            G = m.inlineStylesPeak; v = G.getDocument().createText("{cke-peak}"); for (C = m.inlineStylesRoot.getParent() ; !G.equals(C) ;) {
                                v = v.appendTo(G.clone());
                                G = G.getParent()
                            } q = v.getOuterHtml().split("{cke-peak}").join(q)
                        } G = m.blockLimit.getName(); if (/^\s+|\s+$/.test(q) && "span" in CKEDITOR.dtd[G]) var L = '<span data-cke-marker="1">&nbsp;</span>', q = L + q + L; q = m.editor.dataProcessor.toHtml(q, { context: null, fixForBody: false, dontFilter: m.dontFilter, filter: m.editor.activeFilter, enterMode: m.editor.activeEnterMode }); G = E.document.createElement("body"); G.setHtml(q); if (L) { G.getFirst().remove(); G.getLast().remove() } if ((L = E.startPath().block) && !(L.getChildCount() == 1 && L.getBogus())) a: {
                            var K;
                            if (G.getChildCount() == 1 && b(K = G.getFirst()) && K.is(k)) { L = K.getElementsByTag("*"); E = 0; for (C = L.count() ; E < C; E++) { v = L.getItem(E); if (!v.is(o)) break a } K.moveChildren(K.getParent(1)); K.remove() }
                        } m.dataWrapper = G; E = q
                    } if (E) {
                        K = m.range; var L = K.document, H, q = m.blockLimit; E = 0; var N; G = []; var M, S, C = v = 0, O, U; I = K.startContainer; var D = m.endPath.elements[0], T; J = D.getPosition(I); P = !!D.getCommonAncestor(I) && J != CKEDITOR.POSITION_IDENTICAL && !(J & CKEDITOR.POSITION_CONTAINS + CKEDITOR.POSITION_IS_CONTAINED); I = c(m.dataWrapper, m);
                        for (e(I, K) ; E < I.length; E++) {
                            J = I[E]; if (H = J.isLineBreak) { H = K; O = q; var Q = void 0, W = void 0; if (J.hasBlockSibling) H = 1; else { Q = H.startContainer.getAscendant(i.$block, 1); if (!Q || !Q.is({ div: 1, p: 1 })) H = 0; else { W = Q.getPosition(O); if (W == CKEDITOR.POSITION_IDENTICAL || W == CKEDITOR.POSITION_CONTAINS) H = 0; else { O = H.splitElement(Q); H.moveToPosition(O, CKEDITOR.POSITION_AFTER_START); H = 1 } } } } if (H) C = E > 0; else {
                                H = K.startPath(); if (!J.isBlock && m.editor.config.autoParagraph !== false && (m.editor.activeEnterMode != CKEDITOR.ENTER_BR && m.editor.editable().equals(H.blockLimit) &&
                                !H.block) && (S = m.editor.activeEnterMode != CKEDITOR.ENTER_BR && m.editor.config.autoParagraph !== false ? m.editor.activeEnterMode == CKEDITOR.ENTER_DIV ? "div" : "p" : false)) { S = L.createElement(S); S.appendBogus(); K.insertNode(S); CKEDITOR.env.needsBrFiller && (N = S.getBogus()) && N.remove(); K.moveToPosition(S, CKEDITOR.POSITION_BEFORE_END) } if ((H = K.startPath().block) && !H.equals(M)) { if (N = H.getBogus()) { N.remove(); G.push(H) } M = H } J.firstNotAllowed && (v = 1); if (v && J.isElement) {
                                    H = K.startContainer; for (O = null; H && !i[H.getName()][J.name];) {
                                        if (H.equals(q)) {
                                            H =
                                            null; break
                                        } O = H; H = H.getParent()
                                    } if (H) { if (O) { U = K.splitElement(O); m.zombies.push(U); m.zombies.push(O) } } else { O = q.getName(); T = !E; H = E == I.length - 1; O = d(J.node, O); for (var Q = [], W = O.length, Z = 0, X = void 0, Y = 0, aa = -1; Z < W; Z++) { X = O[Z]; if (X == " ") { if (!Y && (!T || Z)) { Q.push(new CKEDITOR.dom.text(" ")); aa = Q.length } Y = 1 } else { Q.push(X); Y = 0 } } H && aa == Q.length && Q.pop(); T = Q }
                                } if (T) { for (; H = T.pop() ;) K.insertNode(H); T = 0 } else K.insertNode(J.node); if (J.lastNotAllowed && E < I.length - 1) {
                                    (U = P ? D : U) && K.setEndAt(U, CKEDITOR.POSITION_AFTER_START);
                                    v = 0
                                } K.collapse()
                            }
                        } m.dontMoveCaret = C; m.bogusNeededBlocks = G
                    } N = m.range; var R; U = m.bogusNeededBlocks; for (T = N.createBookmark() ; M = m.zombies.pop() ;) if (M.getParent()) { S = N.clone(); S.moveToElementEditStart(M); S.removeEmptyBlocksAtEnd() } if (U) for (; M = U.pop() ;) CKEDITOR.env.needsBrFiller ? M.appendBogus() : M.append(N.document.createText(" ")); for (; M = m.mergeCandidates.pop() ;) M.mergeSiblings(); N.moveToBookmark(T); if (!m.dontMoveCaret) {
                        for (M = b(N.startContainer) && N.startContainer.getChild(N.startOffset - 1) ; M && b(M) && !M.is(i.$empty) ;) {
                            if (M.isBlockBoundary()) N.moveToPosition(M,
                            CKEDITOR.POSITION_BEFORE_END); else { if (f(M) && M.getHtml().match(/(\s|&nbsp;)$/g)) { R = null; break } R = N.clone(); R.moveToPosition(M, CKEDITOR.POSITION_BEFORE_END) } M = M.getLast(a)
                        } R && N.moveToRange(R)
                    } F.select(); h(j)
                }
            }
        }(), q = function () {
            function a(b) { b = new CKEDITOR.dom.walker(b); b.guard = function (a, b) { if (b) return false; if (a.type == CKEDITOR.NODE_ELEMENT) return a.is(CKEDITOR.dtd.$tableContent) }; b.evaluator = function (a) { return a.type == CKEDITOR.NODE_ELEMENT }; return b } function b(a, c, d) {
                c = a.getDocument().createElement(c);
                a.append(c, d); return c
            } function c(a) { var b = a.count(), d; for (b; b-- > 0;) { d = a.getItem(b); if (!CKEDITOR.tools.trim(d.getHtml())) { d.appendBogus(); CKEDITOR.env.ie && (CKEDITOR.env.version < 9 && d.getChildCount()) && d.getFirst().remove() } } } return function (d) {
                var f = d.startContainer, g = f.getAscendant("table", 1), e = false; c(g.getElementsByTag("td")); c(g.getElementsByTag("th")); g = d.clone(); g.setStart(f, 0); g = a(g).lastBackward(); if (!g) { g = d.clone(); g.setEndAt(f, CKEDITOR.POSITION_BEFORE_END); g = a(g).lastForward(); e = true } g ||
                (g = f); if (g.is("table")) { d.setStartAt(g, CKEDITOR.POSITION_BEFORE_START); d.collapse(true); g.remove() } else { g.is({ tbody: 1, thead: 1, tfoot: 1 }) && (g = b(g, "tr", e)); g.is("tr") && (g = b(g, g.getParent().is("thead") ? "th" : "td", e)); (f = g.getBogus()) && f.remove(); d.moveToPosition(g, e ? CKEDITOR.POSITION_AFTER_START : CKEDITOR.POSITION_BEFORE_END) }
            }
        }()
    }(), function () {
        function d() {
            var a = this._.fakeSelection, b; if (a) { b = this.getSelection(1); if (!b || !b.isHidden()) { a.reset(); a = 0 } } if (!a) {
                a = b || this.getSelection(1); if (!a || a.getType() ==
                CKEDITOR.SELECTION_NONE) return
            } this.fire("selectionCheck", a); b = this.elementPath(); if (!b.compare(this._.selectionPreviousPath)) { if (CKEDITOR.env.webkit) this._.previousActive = this.document.getActive(); this._.selectionPreviousPath = b; this.fire("selectionChange", { selection: a, path: b }) }
        } function e() { o = true; if (!k) { c.call(this); k = CKEDITOR.tools.setTimeout(c, 200, this) } } function c() { k = null; if (o) { CKEDITOR.tools.setTimeout(d, 0, this); o = false } } function a(a) {
            function b(c, d) {
                return !c || c.type == CKEDITOR.NODE_TEXT ? false :
                a.clone()["moveToElementEdit" + (d ? "End" : "Start")](c)
            } if (!(a.root instanceof CKEDITOR.editable)) return false; var c = a.startContainer, d = a.getPreviousNode(m, null, c), f = a.getNextNode(m, null, c); return b(d) || b(f, 1) || !d && !f && !(c.type == CKEDITOR.NODE_ELEMENT && c.isBlockBoundary() && c.getBogus()) ? true : false
        } function b(a) { return a.getCustomData("cke-fillingChar") } function j(a, b) {
            var c = a && a.removeCustomData("cke-fillingChar"); if (c) {
                if (b !== false) {
                    var d, f = a.getDocument().getSelection().getNative(), e = f && f.type != "None" &&
                    f.getRangeAt(0); if (c.getLength() > 1 && e && e.intersectsNode(c.$)) { d = [f.anchorOffset, f.focusOffset]; e = f.focusNode == c.$ && f.focusOffset > 0; f.anchorNode == c.$ && f.anchorOffset > 0 && d[0]--; e && d[1]--; var h; e = f; if (!e.isCollapsed) { h = e.getRangeAt(0); h.setStart(e.anchorNode, e.anchorOffset); h.setEnd(e.focusNode, e.focusOffset); h = h.collapsed } h && d.unshift(d.pop()) }
                } c.setText(g(c.getText())); if (d) { c = f.getRangeAt(0); c.setStart(c.startContainer, d[0]); c.setEnd(c.startContainer, d[1]); f.removeAllRanges(); f.addRange(c) }
            }
        } function g(a) {
            return a.replace(/\u200B( )?/g,
            function (a) { return a[1] ? " " : "" })
        } function h(a, b, c) { var d = a.on("focus", function (a) { a.cancel() }, null, null, -100); if (CKEDITOR.env.ie) var f = a.getDocument().on("selectionchange", function (a) { a.cancel() }, null, null, -100); else { var g = new CKEDITOR.dom.range(a); g.moveToElementEditStart(a); var e = a.getDocument().$.createRange(); e.setStart(g.startContainer.$, g.startOffset); e.collapse(1); b.removeAllRanges(); b.addRange(e) } c && a.focus(); d.removeListener(); f && f.removeListener() } function f(a) {
            var b = CKEDITOR.dom.element.createFromHtml('<div data-cke-hidden-sel="1" data-cke-temp="1" style="' +
            (CKEDITOR.env.ie ? "display:none" : "position:fixed;top:0;left:-1000px") + '">&nbsp;</div>', a.document); a.fire("lockSnapshot"); a.editable().append(b); var c = a.getSelection(), d = a.createRange(), f = c.root.on("selectionchange", function (a) { a.cancel() }, null, null, 0); d.setStartAt(b, CKEDITOR.POSITION_AFTER_START); d.setEndAt(b, CKEDITOR.POSITION_BEFORE_END); c.selectRanges([d]); f.removeListener(); a.fire("unlockSnapshot"); a._.hiddenSelectionContainer = b
        } function i(a) {
            var b = { 37: 1, 39: 1, 8: 1, 46: 1 }; return function (c) {
                var d =
                c.data.getKeystroke(); if (b[d]) { var f = a.getSelection().getRanges(), g = f[0]; if (f.length == 1 && g.collapsed) if ((d = g[d < 38 ? "getPreviousEditableNode" : "getNextEditableNode"]()) && d.type == CKEDITOR.NODE_ELEMENT && d.getAttribute("contenteditable") == "false") { a.getSelection().fake(d); c.data.preventDefault(); c.cancel() } }
            }
        } var k, o, m = CKEDITOR.dom.walker.invisible(1), q = function () {
            function a(b) {
                return function (a) {
                    var c = a.editor.createRange(); c.moveToClosestEditablePosition(a.selected, b) && a.editor.getSelection().selectRanges([c]);
                    return false
                }
            } function b(a) { return function (b) { var c = b.editor, d = c.createRange(), f; if (!(f = d.moveToClosestEditablePosition(b.selected, a))) f = d.moveToClosestEditablePosition(b.selected, !a); f && c.getSelection().selectRanges([d]); c.fire("saveSnapshot"); b.selected.remove(); if (!f) { d.moveToElementEditablePosition(c.editable()); c.getSelection().selectRanges([d]) } c.fire("saveSnapshot"); return false } } var c = a(), d = a(1); return { 37: c, 38: c, 39: d, 40: d, 8: b(), 46: b(1) }
        }(); CKEDITOR.on("instanceCreated", function (a) {
            function b() {
                var a =
                c.getSelection(); a && a.removeAllRanges()
            } var c = a.editor; c.on("contentDom", function () {
                var a = c.document, b = CKEDITOR.document, f = c.editable(), g = a.getBody(), h = a.getDocumentElement(), k = f.isInline(), p, n; CKEDITOR.env.gecko && f.attachListener(f, "focus", function (a) { a.removeListener(); if (p !== 0) if ((a = c.getSelection().getNative()) && a.isCollapsed && a.anchorNode == f.$) { a = c.createRange(); a.moveToElementEditStart(f); a.select() } }, null, null, -2); f.attachListener(f, CKEDITOR.env.webkit ? "DOMFocusIn" : "focus", function () {
                    p && CKEDITOR.env.webkit &&
                    (p = c._.previousActive && c._.previousActive.equals(a.getActive())); c.unlockSelection(p); p = 0
                }, null, null, -1); f.attachListener(f, "mousedown", function () { p = 0 }); if (CKEDITOR.env.ie || CKEDITOR.env.opera || k) {
                    var w = function () { n = new CKEDITOR.dom.selection(c.getSelection()); n.lock() }; l ? f.attachListener(f, "beforedeactivate", w, null, null, -1) : f.attachListener(c, "selectionCheck", w, null, null, -1); f.attachListener(f, CKEDITOR.env.webkit ? "DOMFocusOut" : "blur", function () { c.lockSelection(n); p = 1 }, null, null, -1); f.attachListener(f,
                    "mousedown", function () { p = 0 })
                } if (CKEDITOR.env.ie && !k) {
                    var m; f.attachListener(f, "mousedown", function (a) { if (a.data.$.button == 2) { a = c.document.getSelection(); if (!a || a.getType() == CKEDITOR.SELECTION_NONE) m = c.window.getScrollPosition() } }); f.attachListener(f, "mouseup", function (a) { if (a.data.$.button == 2 && m) { c.document.$.documentElement.scrollLeft = m.x; c.document.$.documentElement.scrollTop = m.y } m = null }); if (a.$.compatMode != "BackCompat") {
                        if (CKEDITOR.env.ie7Compat || CKEDITOR.env.ie6Compat) h.on("mousedown", function (a) {
                            function c(a) {
                                a =
                                a.data.$; if (f) { var b = g.$.createTextRange(); try { b.moveToPoint(a.x, a.y) } catch (d) { } f.setEndPoint(i.compareEndPoints("StartToStart", b) < 0 ? "EndToEnd" : "StartToStart", b); f.select() }
                            } function d() { h.removeListener("mousemove", c); b.removeListener("mouseup", d); h.removeListener("mouseup", d); f.select() } a = a.data; if (a.getTarget().is("html") && a.$.y < h.$.clientHeight && a.$.x < h.$.clientWidth) {
                                var f = g.$.createTextRange(); try { f.moveToPoint(a.$.x, a.$.y) } catch (e) { } var i = f.duplicate(); h.on("mousemove", c); b.on("mouseup", d);
                                h.on("mouseup", d)
                            }
                        }); if (CKEDITOR.env.version > 7 && CKEDITOR.env.version < 11) { h.on("mousedown", function (a) { if (a.data.getTarget().is("html")) { b.on("mouseup", o); h.on("mouseup", o) } }); var o = function () { b.removeListener("mouseup", o); h.removeListener("mouseup", o); var c = CKEDITOR.document.$.selection, d = c.createRange(); c.type != "None" && d.parentElement().ownerDocument == a.$ && d.select() } }
                    }
                } f.attachListener(f, "selectionchange", d, c); f.attachListener(f, "keyup", e, c); f.attachListener(f, CKEDITOR.env.webkit ? "DOMFocusIn" : "focus",
                function () { c.forceNextSelectionCheck(); c.selectionChange(1) }); if (k ? CKEDITOR.env.webkit || CKEDITOR.env.gecko : CKEDITOR.env.opera) { var E; f.attachListener(f, "mousedown", function () { E = 1 }); f.attachListener(a.getDocumentElement(), "mouseup", function () { E && e.call(c); E = 0 }) } else f.attachListener(CKEDITOR.env.ie ? f : a.getDocumentElement(), "mouseup", e, c); CKEDITOR.env.webkit && f.attachListener(a, "keydown", function (a) { switch (a.data.getKey()) { case 13: case 33: case 34: case 35: case 36: case 37: case 39: case 8: case 45: case 46: j(f) } },
                null, null, -1); f.attachListener(f, "keydown", i(c), null, null, -1)
            }); c.on("contentDomUnload", c.forceNextSelectionCheck, c); c.on("dataReady", function () { delete c._.fakeSelection; delete c._.hiddenSelectionContainer; c.selectionChange(1) }); c.on("loadSnapshot", function () { var a = c.editable().getLast(function (a) { return a.type == CKEDITOR.NODE_ELEMENT }); a && a.hasAttribute("data-cke-hidden-sel") && a.remove() }, null, null, 100); CKEDITOR.env.ie9Compat && c.on("beforeDestroy", b, null, null, 9); CKEDITOR.env.webkit && c.on("setData",
            b); c.on("contentDomUnload", function () { c.unlockSelection() }); c.on("key", function (a) { if (c.mode == "wysiwyg") { var b = c.getSelection(); if (b.isFake) { var d = q[a.data.keyCode]; if (d) return d({ editor: c, selected: b.getSelectedElement(), selection: b, keyEvent: a }) } } })
        }); CKEDITOR.on("instanceReady", function (a) {
            var c = a.editor; if (CKEDITOR.env.webkit) {
                c.on("selectionChange", function () { var a = c.editable(), d = b(a); d && (d.getCustomData("ready") ? j(a) : d.setCustomData("ready", 1)) }, null, null, -1); c.on("beforeSetMode", function () { j(c.editable()) },
                null, null, -1); var d, f, a = function () { var a = c.editable(); if (a) if (a = b(a)) { var e = c.document.$.defaultView.getSelection(); e.type == "Caret" && e.anchorNode == a.$ && (f = 1); d = a.getText(); a.setText(g(d)) } }, e = function () { var a = c.editable(); if (a) if (a = b(a)) { a.setText(d); if (f) { c.document.$.defaultView.getSelection().setPosition(a.$, a.getLength()); f = 0 } } }; c.on("beforeUndoImage", a); c.on("afterUndoImage", e); c.on("beforeGetData", a, null, null, 0); c.on("getData", e)
            }
        }); CKEDITOR.editor.prototype.selectionChange = function (a) {
            (a ? d :
            e).call(this)
        }; CKEDITOR.editor.prototype.getSelection = function (a) { if ((this._.savedSelection || this._.fakeSelection) && !a) return this._.savedSelection || this._.fakeSelection; return (a = this.editable()) && this.mode == "wysiwyg" ? new CKEDITOR.dom.selection(a) : null }; CKEDITOR.editor.prototype.lockSelection = function (a) { a = a || this.getSelection(1); if (a.getType() != CKEDITOR.SELECTION_NONE) { !a.isLocked && a.lock(); this._.savedSelection = a; return true } return false }; CKEDITOR.editor.prototype.unlockSelection = function (a) {
            var b =
            this._.savedSelection; if (b) { b.unlock(a); delete this._.savedSelection; return true } return false
        }; CKEDITOR.editor.prototype.forceNextSelectionCheck = function () { delete this._.selectionPreviousPath }; CKEDITOR.dom.document.prototype.getSelection = function () { return new CKEDITOR.dom.selection(this) }; CKEDITOR.dom.range.prototype.select = function () { var a = this.root instanceof CKEDITOR.editable ? this.root.editor.getSelection() : new CKEDITOR.dom.selection(this.root); a.selectRanges([this]); return a }; CKEDITOR.SELECTION_NONE =
        1; CKEDITOR.SELECTION_TEXT = 2; CKEDITOR.SELECTION_ELEMENT = 3; var l = typeof window.getSelection != "function", n = 1; CKEDITOR.dom.selection = function (a) {
            if (a instanceof CKEDITOR.dom.selection) var b = a, a = a.root; var c = a instanceof CKEDITOR.dom.element; this.rev = b ? b.rev : n++; this.document = a instanceof CKEDITOR.dom.document ? a : a.getDocument(); this.root = a = c ? a : this.document.getBody(); this.isLocked = 0; this._ = { cache: {} }; if (b) { CKEDITOR.tools.extend(this._.cache, b._.cache); this.isFake = b.isFake; this.isLocked = b.isLocked; return this } b =
            l ? this.document.$.selection : this.document.getWindow().$.getSelection(); if (CKEDITOR.env.webkit) (b.type == "None" && this.document.getActive().equals(a) || b.type == "Caret" && b.anchorNode.nodeType == CKEDITOR.NODE_DOCUMENT) && h(a, b); else if (CKEDITOR.env.gecko) b && (this.document.getActive().equals(a) && b.anchorNode && b.anchorNode.nodeType == CKEDITOR.NODE_DOCUMENT) && h(a, b, true); else if (CKEDITOR.env.ie) {
                var d; try { d = this.document.getActive() } catch (f) { } if (l) b.type == "None" && (d && d.equals(this.document.getDocumentElement())) &&
                h(a, null, true); else { (b = b && b.anchorNode) && (b = new CKEDITOR.dom.node(b)); d && (d.equals(this.document.getDocumentElement()) && b && (a.equals(b) || a.contains(b))) && h(a, null, true) }
            } d = this.getNative(); var g, e; if (d) if (d.getRangeAt) g = (e = d.rangeCount && d.getRangeAt(0)) && new CKEDITOR.dom.node(e.commonAncestorContainer); else { try { e = d.createRange() } catch (i) { } g = e && CKEDITOR.dom.element.get(e.item && e.item(0) || e.parentElement()) } if (!g || !(g.type == CKEDITOR.NODE_ELEMENT || g.type == CKEDITOR.NODE_TEXT) || !this.root.equals(g) && !this.root.contains(g)) {
                this._.cache.type =
                CKEDITOR.SELECTION_NONE; this._.cache.startElement = null; this._.cache.selectedElement = null; this._.cache.selectedText = ""; this._.cache.ranges = new CKEDITOR.dom.rangeList
            } return this
        }; var r = { img: 1, hr: 1, li: 1, table: 1, tr: 1, td: 1, th: 1, embed: 1, object: 1, ol: 1, ul: 1, a: 1, input: 1, form: 1, select: 1, textarea: 1, button: 1, fieldset: 1, thead: 1, tfoot: 1 }; CKEDITOR.dom.selection.prototype = {
            getNative: function () { return this._.cache.nativeSel !== void 0 ? this._.cache.nativeSel : this._.cache.nativeSel = l ? this.document.$.selection : this.document.getWindow().$.getSelection() },
            getType: l ? function () { var a = this._.cache; if (a.type) return a.type; var b = CKEDITOR.SELECTION_NONE; try { var c = this.getNative(), d = c.type; if (d == "Text") b = CKEDITOR.SELECTION_TEXT; if (d == "Control") b = CKEDITOR.SELECTION_ELEMENT; if (c.createRange().parentElement()) b = CKEDITOR.SELECTION_TEXT } catch (f) { } return a.type = b } : function () {
                var a = this._.cache; if (a.type) return a.type; var b = CKEDITOR.SELECTION_TEXT, c = this.getNative(); if (!c || !c.rangeCount) b = CKEDITOR.SELECTION_NONE; else if (c.rangeCount == 1) {
                    var c = c.getRangeAt(0), d =
                    c.startContainer; if (d == c.endContainer && d.nodeType == 1 && c.endOffset - c.startOffset == 1 && r[d.childNodes[c.startOffset].nodeName.toLowerCase()]) b = CKEDITOR.SELECTION_ELEMENT
                } return a.type = b
            }, getRanges: function () {
                var a = l ? function () {
                    function a(b) { return (new CKEDITOR.dom.node(b)).getIndex() } var b = function (b, c) {
                        b = b.duplicate(); b.collapse(c); var d = b.parentElement(); if (!d.hasChildNodes()) return { container: d, offset: 0 }; for (var f = d.children, g, e, h = b.duplicate(), i = 0, j = f.length - 1, l = -1, k, p; i <= j;) {
                            l = Math.floor((i + j) / 2);
                            g = f[l]; h.moveToElementText(g); k = h.compareEndPoints("StartToStart", b); if (k > 0) j = l - 1; else if (k < 0) i = l + 1; else return { container: d, offset: a(g) }
                        } if (l == -1 || l == f.length - 1 && k < 0) {
                            h.moveToElementText(d); h.setEndPoint("StartToStart", b); h = h.text.replace(/(\r\n|\r)/g, "\n").length; f = d.childNodes; if (!h) { g = f[f.length - 1]; return g.nodeType != CKEDITOR.NODE_TEXT ? { container: d, offset: f.length } : { container: g, offset: g.nodeValue.length } } for (d = f.length; h > 0 && d > 0;) { e = f[--d]; if (e.nodeType == CKEDITOR.NODE_TEXT) { p = e; h = h - e.nodeValue.length } } return {
                                container: p,
                                offset: -h
                            }
                        } h.collapse(k > 0 ? true : false); h.setEndPoint(k > 0 ? "StartToStart" : "EndToStart", b); h = h.text.replace(/(\r\n|\r)/g, "\n").length; if (!h) return { container: d, offset: a(g) + (k > 0 ? 0 : 1) }; for (; h > 0;) try { e = g[k > 0 ? "previousSibling" : "nextSibling"]; if (e.nodeType == CKEDITOR.NODE_TEXT) { h = h - e.nodeValue.length; p = e } g = e } catch (n) { return { container: d, offset: a(g) } } return { container: p, offset: k > 0 ? -h : p.nodeValue.length + h }
                    }; return function () {
                        var a = this.getNative(), c = a && a.createRange(), d = this.getType(); if (!a) return []; if (d == CKEDITOR.SELECTION_TEXT) {
                            a =
                            new CKEDITOR.dom.range(this.root); d = b(c, true); a.setStart(new CKEDITOR.dom.node(d.container), d.offset); d = b(c); a.setEnd(new CKEDITOR.dom.node(d.container), d.offset); a.endContainer.getPosition(a.startContainer) & CKEDITOR.POSITION_PRECEDING && a.endOffset <= a.startContainer.getIndex() && a.collapse(); return [a]
                        } if (d == CKEDITOR.SELECTION_ELEMENT) {
                            for (var d = [], f = 0; f < c.length; f++) {
                                for (var g = c.item(f), e = g.parentNode, h = 0, a = new CKEDITOR.dom.range(this.root) ; h < e.childNodes.length && e.childNodes[h] != g; h++); a.setStart(new CKEDITOR.dom.node(e),
                                h); a.setEnd(new CKEDITOR.dom.node(e), h + 1); d.push(a)
                            } return d
                        } return []
                    }
                }() : function () { var a = [], b, c = this.getNative(); if (!c) return a; for (var d = 0; d < c.rangeCount; d++) { var f = c.getRangeAt(d); b = new CKEDITOR.dom.range(this.root); b.setStart(new CKEDITOR.dom.node(f.startContainer), f.startOffset); b.setEnd(new CKEDITOR.dom.node(f.endContainer), f.endOffset); a.push(b) } return a }; return function (b) {
                    var c = this._.cache; if (c.ranges && !b) return c.ranges; if (!c.ranges) c.ranges = new CKEDITOR.dom.rangeList(a.call(this)); if (b) for (var d =
                    c.ranges, f = 0; f < d.length; f++) {
                        var g = d[f]; g.getCommonAncestor().isReadOnly() && d.splice(f, 1); if (!g.collapsed) {
                            if (g.startContainer.isReadOnly()) for (var b = g.startContainer, e; b;) { if ((e = b.type == CKEDITOR.NODE_ELEMENT) && b.is("body") || !b.isReadOnly()) break; e && b.getAttribute("contentEditable") == "false" && g.setStartAfter(b); b = b.getParent() } b = g.startContainer; e = g.endContainer; var h = g.startOffset, i = g.endOffset, j = g.clone(); b && b.type == CKEDITOR.NODE_TEXT && (h >= b.getLength() ? j.setStartAfter(b) : j.setStartBefore(b)); e &&
                            e.type == CKEDITOR.NODE_TEXT && (i ? j.setEndAfter(e) : j.setEndBefore(e)); b = new CKEDITOR.dom.walker(j); b.evaluator = function (a) { if (a.type == CKEDITOR.NODE_ELEMENT && a.isReadOnly()) { var b = g.clone(); g.setEndBefore(a); g.collapsed && d.splice(f--, 1); if (!(a.getPosition(j.endContainer) & CKEDITOR.POSITION_CONTAINS)) { b.setStartAfter(a); b.collapsed || d.splice(f + 1, 0, b) } return true } return false }; b.next()
                        }
                    } return c.ranges
                }
            }(), getStartElement: function () {
                var a = this._.cache; if (a.startElement !== void 0) return a.startElement; var b;
                switch (this.getType()) {
                    case CKEDITOR.SELECTION_ELEMENT: return this.getSelectedElement(); case CKEDITOR.SELECTION_TEXT: var c = this.getRanges()[0]; if (c) {
                        if (c.collapsed) { b = c.startContainer; b.type != CKEDITOR.NODE_ELEMENT && (b = b.getParent()) } else {
                            for (c.optimize() ; ;) { b = c.startContainer; if (c.startOffset == (b.getChildCount ? b.getChildCount() : b.getLength()) && !b.isBlockBoundary()) c.setStartAfter(b); else break } b = c.startContainer; if (b.type != CKEDITOR.NODE_ELEMENT) return b.getParent(); b = b.getChild(c.startOffset); if (!b ||
                            b.type != CKEDITOR.NODE_ELEMENT) b = c.startContainer; else for (c = b.getFirst() ; c && c.type == CKEDITOR.NODE_ELEMENT;) { b = c; c = c.getFirst() }
                        } b = b.$
                    }
                } return a.startElement = b ? new CKEDITOR.dom.element(b) : null
            }, getSelectedElement: function () {
                var a = this._.cache; if (a.selectedElement !== void 0) return a.selectedElement; var b = this, c = CKEDITOR.tools.tryThese(function () { return b.getNative().createRange().item(0) }, function () {
                    for (var a = b.getRanges()[0].clone(), c, d, f = 2; f && (!(c = a.getEnclosedNode()) || !(c.type == CKEDITOR.NODE_ELEMENT &&
                    r[c.getName()] && (d = c))) ; f--) a.shrink(CKEDITOR.SHRINK_ELEMENT); return d && d.$
                }); return a.selectedElement = c ? new CKEDITOR.dom.element(c) : null
            }, getSelectedText: function () { var a = this._.cache; if (a.selectedText !== void 0) return a.selectedText; var b = this.getNative(), b = l ? b.type == "Control" ? "" : b.createRange().text : b.toString(); return a.selectedText = b }, lock: function () { this.getRanges(); this.getStartElement(); this.getSelectedElement(); this.getSelectedText(); this._.cache.nativeSel = null; this.isLocked = 1 }, unlock: function (a) {
                if (this.isLocked) {
                    if (a) var b =
                    this.getSelectedElement(), c = !b && this.getRanges(), d = this.isFake; this.isLocked = 0; this.reset(); if (a) (a = b || c[0] && c[0].getCommonAncestor()) && a.getAscendant("body", 1) && (d ? this.fake(b) : b ? this.selectElement(b) : this.selectRanges(c))
                }
            }, reset: function () {
                this._.cache = {}; this.isFake = 0; var a = this.root.editor; if (a && a._.fakeSelection && this.rev == a._.fakeSelection.rev) { delete a._.fakeSelection; var b = a._.hiddenSelectionContainer; if (b) { a.fire("lockSnapshot"); b.remove(); a.fire("unlockSnapshot") } delete a._.hiddenSelectionContainer } this.rev =
                n++
            }, selectElement: function (a) { var b = new CKEDITOR.dom.range(this.root); b.setStartBefore(a); b.setEndAfter(a); this.selectRanges([b]) }, selectRanges: function (b) {
                var c = this.root.editor, c = c && c._.hiddenSelectionContainer; this.reset(); if (c) for (var c = this.root, d, f = 0; f < b.length; ++f) { d = b[f]; if (d.endContainer.equals(c)) d.endOffset = Math.min(d.endOffset, c.getChildCount()) } if (b.length) if (this.isLocked) { var g = CKEDITOR.document.getActive(); this.unlock(); this.selectRanges(b); this.lock(); !g.equals(this.root) && g.focus() } else {
                    var e;
                    a: { var h, i; if (b.length == 1 && !(i = b[0]).collapsed && (e = i.getEnclosedNode()) && e.type == CKEDITOR.NODE_ELEMENT) { i = i.clone(); i.shrink(CKEDITOR.SHRINK_ELEMENT, true); if ((h = i.getEnclosedNode()) && h.type == CKEDITOR.NODE_ELEMENT) e = h; if (e.getAttribute("contenteditable") == "false") break a } e = void 0 } if (e) this.fake(e); else {
                        if (l) {
                            i = CKEDITOR.dom.walker.whitespaces(true); h = /\ufeff|\u00a0/; c = { table: 1, tbody: 1, tr: 1 }; if (b.length > 1) { e = b[b.length - 1]; b[0].setEnd(e.endContainer, e.endOffset) } e = b[0]; var b = e.collapsed, k, n, m; if ((d = e.getEnclosedNode()) &&
                            d.type == CKEDITOR.NODE_ELEMENT && d.getName() in r && (!d.is("a") || !d.getText())) try { m = d.$.createControlRange(); m.addElement(d.$); m.select(); return } catch (o) { } (e.startContainer.type == CKEDITOR.NODE_ELEMENT && e.startContainer.getName() in c || e.endContainer.type == CKEDITOR.NODE_ELEMENT && e.endContainer.getName() in c) && e.shrink(CKEDITOR.NODE_ELEMENT, true); m = e.createBookmark(); c = m.startNode; if (!b) g = m.endNode; m = e.document.$.body.createTextRange(); m.moveToElementText(c.$); m.moveStart("character", 1); if (g) {
                                h = e.document.$.body.createTextRange();
                                h.moveToElementText(g.$); m.setEndPoint("EndToEnd", h); m.moveEnd("character", -1)
                            } else { k = c.getNext(i); n = c.hasAscendant("pre"); k = !(k && k.getText && k.getText().match(h)) && (n || !c.hasPrevious() || c.getPrevious().is && c.getPrevious().is("br")); n = e.document.createElement("span"); n.setHtml("&#65279;"); n.insertBefore(c); k && e.document.createText("﻿").insertBefore(c) } e.setStartBefore(c); c.remove(); if (b) {
                                if (k) { m.moveStart("character", -1); m.select(); e.document.$.selection.clear() } else m.select(); e.moveToPosition(n,
                                CKEDITOR.POSITION_BEFORE_START); n.remove()
                            } else { e.setEndBefore(g); g.remove(); m.select() }
                        } else {
                            g = this.getNative(); if (!g) return; if (CKEDITOR.env.opera) { m = this.document.$.createRange(); m.selectNodeContents(this.root.$); g.addRange(m) } this.removeAllRanges(); for (m = 0; m < b.length; m++) {
                                if (m < b.length - 1) {
                                    e = b[m]; k = b[m + 1]; h = e.clone(); h.setStart(e.endContainer, e.endOffset); h.setEnd(k.startContainer, k.startOffset); if (!h.collapsed) {
                                        h.shrink(CKEDITOR.NODE_ELEMENT, true); n = h.getCommonAncestor(); h = h.getEnclosedNode();
                                        if (n.isReadOnly() || h && h.isReadOnly()) { k.setStart(e.startContainer, e.startOffset); b.splice(m--, 1); continue }
                                    }
                                } e = b[m]; n = this.document.$.createRange(); k = e.startContainer; if (CKEDITOR.env.opera && e.collapsed && k.type == CKEDITOR.NODE_ELEMENT) { h = k.getChild(e.startOffset - 1); i = k.getChild(e.startOffset); if (!h && !i && k.is(CKEDITOR.dtd.$removeEmpty) || h && h.type == CKEDITOR.NODE_ELEMENT || i && i.type == CKEDITOR.NODE_ELEMENT) { e.insertNode(this.document.createText("")); e.collapse(1) } } if (e.collapsed && CKEDITOR.env.webkit && a(e)) {
                                    k =
                                    this.root; j(k, false); h = k.getDocument().createText("​"); k.setCustomData("cke-fillingChar", h); e.insertNode(h); if ((k = h.getNext()) && !h.getPrevious() && k.type == CKEDITOR.NODE_ELEMENT && k.getName() == "br") { j(this.root); e.moveToPosition(k, CKEDITOR.POSITION_BEFORE_START) } else e.moveToPosition(h, CKEDITOR.POSITION_AFTER_END)
                                } n.setStart(e.startContainer.$, e.startOffset); try { n.setEnd(e.endContainer.$, e.endOffset) } catch (q) {
                                    if (q.toString().indexOf("NS_ERROR_ILLEGAL_VALUE") >= 0) {
                                        e.collapse(1); n.setEnd(e.endContainer.$,
                                        e.endOffset)
                                    } else throw q;
                                } g.addRange(n)
                            }
                        } this.reset(); this.root.fire("selectionchange")
                    }
                }
            }, fake: function (a) { var b = this.root.editor; this.reset(); f(b); var c = this._.cache, d = new CKEDITOR.dom.range(this.root); d.setStartBefore(a); d.setEndAfter(a); c.ranges = new CKEDITOR.dom.rangeList(d); c.selectedElement = c.startElement = a; c.type = CKEDITOR.SELECTION_ELEMENT; c.selectedText = c.nativeSel = null; this.isFake = 1; this.rev = n++; b._.fakeSelection = this; this.root.fire("selectionchange") }, isHidden: function () {
                var a = this.getCommonAncestor();
                a && a.type == CKEDITOR.NODE_TEXT && (a = a.getParent()); return !(!a || !a.data("cke-hidden-sel"))
            }, createBookmarks: function (a) { a = this.getRanges().createBookmarks(a); this.isFake && (a.isFake = 1); return a }, createBookmarks2: function (a) { a = this.getRanges().createBookmarks2(a); this.isFake && (a.isFake = 1); return a }, selectBookmarks: function (a) { for (var b = [], c = 0; c < a.length; c++) { var d = new CKEDITOR.dom.range(this.root); d.moveToBookmark(a[c]); b.push(d) } a.isFake ? this.fake(b[0].getEnclosedNode()) : this.selectRanges(b); return this },
            getCommonAncestor: function () { var a = this.getRanges(); return !a.length ? null : a[0].startContainer.getCommonAncestor(a[a.length - 1].endContainer) }, scrollIntoView: function () { this.type != CKEDITOR.SELECTION_NONE && this.getRanges()[0].scrollIntoView() }, removeAllRanges: function () { var a = this.getNative(); try { a && a[l ? "empty" : "removeAllRanges"]() } catch (b) { } this.reset() }
        }
    }(), "use strict", CKEDITOR.editor.prototype.attachStyleStateChange = function (d, e) {
        var c = this._.styleStateChangeCallbacks; if (!c) {
            c = this._.styleStateChangeCallbacks =
            []; this.on("selectionChange", function (a) { for (var b = 0; b < c.length; b++) { var d = c[b], g = d.style.checkActive(a.data.path) ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF; d.fn.call(this, g) } })
        } c.push({ style: d, fn: e })
    }, CKEDITOR.STYLE_BLOCK = 1, CKEDITOR.STYLE_INLINE = 2, CKEDITOR.STYLE_OBJECT = 3, function () {
        function d(a, b) { for (var c, d; a = a.getParent() ;) { if (a.equals(b)) break; if (a.getAttribute("data-nostyle")) c = a; else if (!d) { var f = a.getAttribute("contentEditable"); f == "false" ? c = a : f == "true" && (d = 1) } } return c } function e(b) {
            var c =
            b.document; if (b.collapsed) { c = r(this, c); b.insertNode(c); b.moveToPosition(c, CKEDITOR.POSITION_BEFORE_END) } else {
                var f = this.element, g = this._.definition, h, i = g.ignoreReadonly, j = i || g.includeReadonly; j == void 0 && (j = b.root.getCustomData("cke_includeReadonly")); var l = CKEDITOR.dtd[f]; if (!l) { h = true; l = CKEDITOR.dtd.span } b.enlarge(CKEDITOR.ENLARGE_INLINE, 1); b.trim(); var k = b.createBookmark(), n = k.startNode, p = k.endNode, m = n, o; if (!i) {
                    var w = b.getCommonAncestor(), i = d(n, w), w = d(p, w); i && (m = i.getNextSourceNode(true)); w && (p =
                    w)
                } for (m.getPosition(p) == CKEDITOR.POSITION_FOLLOWING && (m = 0) ; m;) {
                    i = false; if (m.equals(p)) { m = null; i = true } else {
                        var y = m.type == CKEDITOR.NODE_ELEMENT ? m.getName() : null, w = y && m.getAttribute("contentEditable") == "false", v = y && m.getAttribute("data-nostyle"); if (y && m.data("cke-bookmark")) { m = m.getNextSourceNode(true); continue } if (w && j && CKEDITOR.dtd.$block[y]) for (var A = m, u = a(A), t = void 0, s = u.length, x = 0, A = s && new CKEDITOR.dom.range(A.getDocument()) ; x < s; ++x) {
                            var t = u[x], B = CKEDITOR.filter.instances[t.data("cke-filter")];
                            if (B ? B.check(this) : 1) { A.selectNodeContents(t); e.call(this, A) }
                        } u = y ? !l[y] || v ? 0 : w && !j ? 0 : (m.getPosition(p) | F) == F && (!g.childRule || g.childRule(m)) : 1; if (u) if ((u = m.getParent()) && ((u.getDtd() || CKEDITOR.dtd.span)[f] || h) && (!g.parentRule || g.parentRule(u))) {
                            if (!o && (!y || !CKEDITOR.dtd.$removeEmpty[y] || (m.getPosition(p) | F) == F)) { o = b.clone(); o.setStartBefore(m) } y = m.type; if (y == CKEDITOR.NODE_TEXT || w || y == CKEDITOR.NODE_ELEMENT && !m.getChildCount()) {
                                for (var y = m, ba; (i = !y.getNext(z)) && (ba = y.getParent(), l[ba.getName()]) && (ba.getPosition(n) |
                                C) == C && (!g.childRule || g.childRule(ba)) ;) y = ba; o.setEndAfter(y)
                            }
                        } else i = true; else i = true; m = m.getNextSourceNode(v || w)
                    } if (i && o && !o.collapsed) {
                        for (var i = r(this, c), w = i.hasAttributes(), v = o.getCommonAncestor(), y = {}, u = {}, t = {}, s = {}, $, V, ca; i && v;) { if (v.getName() == f) { for ($ in g.attributes) if (!s[$] && (ca = v.getAttribute(V))) i.getAttribute($) == ca ? u[$] = 1 : s[$] = 1; for (V in g.styles) if (!t[V] && (ca = v.getStyle(V))) i.getStyle(V) == ca ? y[V] = 1 : t[V] = 1 } v = v.getParent() } for ($ in u) i.removeAttribute($); for (V in y) i.removeStyle(V);
                        w && !i.hasAttributes() && (i = null); if (i) { o.extractContents().appendTo(i); o.insertNode(i); q.call(this, i); i.mergeSiblings(); CKEDITOR.env.ie || i.$.normalize() } else { i = new CKEDITOR.dom.element("span"); o.extractContents().appendTo(i); o.insertNode(i); q.call(this, i); i.remove(true) } o = null
                    }
                } b.moveToBookmark(k); b.shrink(CKEDITOR.SHRINK_TEXT); b.shrink(CKEDITOR.NODE_ELEMENT, true)
            }
        } function c(a) {
            function b() {
                for (var a = new CKEDITOR.dom.elementPath(d.getParent()), c = new CKEDITOR.dom.elementPath(j.getParent()), f = null,
                g = null, e = 0; e < a.elements.length; e++) { var h = a.elements[e]; if (h == a.block || h == a.blockLimit) break; k.checkElementRemovable(h) && (f = h) } for (e = 0; e < c.elements.length; e++) { h = c.elements[e]; if (h == c.block || h == c.blockLimit) break; k.checkElementRemovable(h) && (g = h) } g && j.breakParent(g); f && d.breakParent(f)
            } a.enlarge(CKEDITOR.ENLARGE_INLINE, 1); var c = a.createBookmark(), d = c.startNode; if (a.collapsed) {
                for (var f = new CKEDITOR.dom.elementPath(d.getParent(), a.root), g, e = 0, h; e < f.elements.length && (h = f.elements[e]) ; e++) {
                    if (h == f.block ||
                    h == f.blockLimit) break; if (this.checkElementRemovable(h)) { var i; if (a.collapsed && (a.checkBoundaryOfElement(h, CKEDITOR.END) || (i = a.checkBoundaryOfElement(h, CKEDITOR.START)))) { g = h; g.match = i ? "start" : "end" } else { h.mergeSiblings(); h.is(this.element) ? m.call(this, h) : l(h, y(this)[h.getName()]) } }
                } if (g) { h = d; for (e = 0; ; e++) { i = f.elements[e]; if (i.equals(g)) break; else if (i.match) continue; else i = i.clone(); i.append(h); h = i } h[g.match == "start" ? "insertBefore" : "insertAfter"](g) }
            } else {
                var j = c.endNode, k = this; b(); for (f = d; !f.equals(j) ;) {
                    g =
                    f.getNextSourceNode(); if (f.type == CKEDITOR.NODE_ELEMENT && this.checkElementRemovable(f)) { f.getName() == this.element ? m.call(this, f) : l(f, y(this)[f.getName()]); if (g.type == CKEDITOR.NODE_ELEMENT && g.contains(d)) { b(); g = d.getNext() } } f = g
                }
            } a.moveToBookmark(c); a.shrink(CKEDITOR.NODE_ELEMENT, true)
        } function a(a) { var b = []; a.forEach(function (a) { if (a.getAttribute("contenteditable") == "true") { b.push(a); return false } }, CKEDITOR.NODE_ELEMENT, true); return b } function b(a) {
            var b = a.getEnclosedNode() || a.getCommonAncestor(false,
            true); (a = (new CKEDITOR.dom.elementPath(b, a.root)).contains(this.element, 1)) && !a.isReadOnly() && p(a, this)
        } function j(a) { var b = a.getCommonAncestor(true, true); if (a = (new CKEDITOR.dom.elementPath(b, a.root)).contains(this.element, 1)) { var b = this._.definition, c = b.attributes; if (c) for (var d in c) a.removeAttribute(d, c[d]); if (b.styles) for (var f in b.styles) b.styles.hasOwnProperty(f) && a.removeStyle(f) } } function g(a) {
            var b = a.createBookmark(true), c = a.createIterator(); c.enforceRealBlocks = true; if (this._.enterMode) c.enlargeBr =
            this._.enterMode != CKEDITOR.ENTER_BR; for (var d, g = a.document, e; d = c.getNextParagraph() ;) if (!d.isReadOnly() && (c.activeFilter ? c.activeFilter.check(this) : 1)) { e = r(this, g, d); f(d, e) } a.moveToBookmark(b)
        } function h(a) {
            var b = a.createBookmark(1), c = a.createIterator(); c.enforceRealBlocks = true; c.enlargeBr = this._.enterMode != CKEDITOR.ENTER_BR; for (var d, g; d = c.getNextParagraph() ;) if (this.checkElementRemovable(d)) if (d.is("pre")) {
                (g = this._.enterMode == CKEDITOR.ENTER_BR ? null : a.document.createElement(this._.enterMode == CKEDITOR.ENTER_P ?
                "p" : "div")) && d.copyAttributes(g); f(d, g)
            } else m.call(this, d); a.moveToBookmark(b)
        } function f(a, b) {
            var c = !b; if (c) { b = a.getDocument().createElement("div"); a.copyAttributes(b) } var d = b && b.is("pre"), f = a.is("pre"), g = !d && f; if (d && !f) {
                f = b; (g = a.getBogus()) && g.remove(); g = a.getHtml(); g = k(g, /(?:^[ \t\n\r]+)|(?:[ \t\n\r]+$)/g, ""); g = g.replace(/[ \t\r\n]*(<br[^>]*>)[ \t\r\n]*/gi, "$1"); g = g.replace(/([ \t\n\r]+|&nbsp;)/g, " "); g = g.replace(/<br\b[^>]*>/gi, "\n"); if (CKEDITOR.env.ie) {
                    var e = a.getDocument().createElement("div");
                    e.append(f); f.$.outerHTML = "<pre>" + g + "</pre>"; f.copyAttributes(e.getFirst()); f = e.getFirst().remove()
                } else f.setHtml(g); b = f
            } else g ? b = o(c ? [a.getHtml()] : i(a), b) : a.moveChildren(b); b.replace(a); if (d) { var c = b, h; if ((h = c.getPrevious(B)) && h.type == CKEDITOR.NODE_ELEMENT && h.is("pre")) { d = k(h.getHtml(), /\n$/, "") + "\n\n" + k(c.getHtml(), /^\n/, ""); CKEDITOR.env.ie ? c.$.outerHTML = "<pre>" + d + "</pre>" : c.setHtml(d); h.remove() } } else c && n(b)
        } function i(a) {
            a.getName(); var b = []; k(a.getOuterHtml(), /(\S\s*)\n(?:\s|(<span[^>]+data-cke-bookmark.*?\/span>))*\n(?!$)/gi,
            function (a, b, c) { return b + "</pre>" + c + "<pre>" }).replace(/<pre\b.*?>([\s\S]*?)<\/pre>/gi, function (a, c) { b.push(c) }); return b
        } function k(a, b, c) { var d = "", f = "", a = a.replace(/(^<span[^>]+data-cke-bookmark.*?\/span>)|(<span[^>]+data-cke-bookmark.*?\/span>$)/gi, function (a, b, c) { b && (d = b); c && (f = c); return "" }); return d + a.replace(b, c) + f } function o(a, b) {
            var c; a.length > 1 && (c = new CKEDITOR.dom.documentFragment(b.getDocument())); for (var d = 0; d < a.length; d++) {
                var f = a[d], f = f.replace(/(\r\n|\r)/g, "\n"), f = k(f, /^[ \t]*\n/, ""),
                f = k(f, /\n$/, ""), f = k(f, /^[ \t]+|[ \t]+$/g, function (a, b) { return a.length == 1 ? "&nbsp;" : b ? " " + CKEDITOR.tools.repeat("&nbsp;", a.length - 1) : CKEDITOR.tools.repeat("&nbsp;", a.length - 1) + " " }), f = f.replace(/\n/g, "<br>"), f = f.replace(/[ \t]{2,}/g, function (a) { return CKEDITOR.tools.repeat("&nbsp;", a.length - 1) + " " }); if (c) { var g = b.clone(); g.setHtml(f); c.append(g) } else b.setHtml(f)
            } return c || b
        } function m(a, b) {
            var c = this._.definition, d = c.attributes, c = c.styles, f = y(this)[a.getName()], g = CKEDITOR.tools.isEmpty(d) && CKEDITOR.tools.isEmpty(c),
            e; for (e in d) if (!((e == "class" || this._.definition.fullMatch) && a.getAttribute(e) != A(e, d[e])) && !(b && e.slice(0, 5) == "data-")) { g = a.hasAttribute(e); a.removeAttribute(e) } for (var h in c) if (!(this._.definition.fullMatch && a.getStyle(h) != A(h, c[h], true))) { g = g || !!a.getStyle(h); a.removeStyle(h) } l(a, f, u[a.getName()]); g && (this._.definition.alwaysRemoveElement ? n(a, 1) : !CKEDITOR.dtd.$block[a.getName()] || this._.enterMode == CKEDITOR.ENTER_BR && !a.hasAttributes() ? n(a) : a.renameNode(this._.enterMode == CKEDITOR.ENTER_P ? "p" : "div"))
        }
        function q(a) { for (var b = y(this), c = a.getElementsByTag(this.element), d, f = c.count() ; --f >= 0;) { d = c.getItem(f); d.isReadOnly() || m.call(this, d, true) } for (var g in b) if (g != this.element) { c = a.getElementsByTag(g); for (f = c.count() - 1; f >= 0; f--) { d = c.getItem(f); d.isReadOnly() || l(d, b[g]) } } } function l(a, b, c) { if (b = b && b.attributes) for (var d = 0; d < b.length; d++) { var f = b[d][0], g; if (g = a.getAttribute(f)) { var e = b[d][1]; (e === null || e.test && e.test(g) || typeof e == "string" && g == e) && a.removeAttribute(f) } } c || n(a) } function n(a, b) {
            if (!a.hasAttributes() ||
            b) if (CKEDITOR.dtd.$block[a.getName()]) { var c = a.getPrevious(B), d = a.getNext(B); c && (c.type == CKEDITOR.NODE_TEXT || !c.isBlockBoundary({ br: 1 })) && a.append("br", 1); d && (d.type == CKEDITOR.NODE_TEXT || !d.isBlockBoundary({ br: 1 })) && a.append("br"); a.remove(true) } else { c = a.getFirst(); d = a.getLast(); a.remove(true); if (c) { c.type == CKEDITOR.NODE_ELEMENT && c.mergeSiblings(); d && (!c.equals(d) && d.type == CKEDITOR.NODE_ELEMENT) && d.mergeSiblings() } }
        } function r(a, b, c) {
            var d; d = a.element; d == "*" && (d = "span"); d = new CKEDITOR.dom.element(d,
            b); c && c.copyAttributes(d); d = p(d, a); b.getCustomData("doc_processing_style") && d.hasAttribute("id") ? d.removeAttribute("id") : b.setCustomData("doc_processing_style", 1); return d
        } function p(a, b) { var c = b._.definition, d = c.attributes, c = CKEDITOR.style.getStyleText(c); if (d) for (var f in d) a.setAttribute(f, d[f]); c && a.setAttribute("style", c); return a } function w(a, b) { for (var c in a) a[c] = a[c].replace(t, function (a, c) { return b[c] }) } function y(a) {
            if (a._.overrides) return a._.overrides; var b = a._.overrides = {}, c = a._.definition.overrides;
            if (c) { CKEDITOR.tools.isArray(c) || (c = [c]); for (var d = 0; d < c.length; d++) { var f = c[d], g, e; if (typeof f == "string") g = f.toLowerCase(); else { g = f.element ? f.element.toLowerCase() : a.element; e = f.attributes } f = b[g] || (b[g] = {}); if (e) { var f = f.attributes = f.attributes || [], h; for (h in e) f.push([h.toLowerCase(), e[h]]) } } } return b
        } function A(a, b, c) { var d = new CKEDITOR.dom.element("span"); d[c ? "setStyle" : "setAttribute"](a, b); return d[c ? "getStyle" : "getAttribute"](a) } function v(a, b) {
            for (var c = a.document, d = a.getRanges(), f = b ? this.removeFromRange :
            this.applyToRange, g, e = d.createIterator() ; g = e.getNextRange() ;) f.call(this, g); a.selectRanges(d); c.removeCustomData("doc_processing_style")
        } var u = { address: 1, div: 1, h1: 1, h2: 1, h3: 1, h4: 1, h5: 1, h6: 1, p: 1, pre: 1, section: 1, header: 1, footer: 1, nav: 1, article: 1, aside: 1, figure: 1, dialog: 1, hgroup: 1, time: 1, meter: 1, menu: 1, command: 1, keygen: 1, output: 1, progress: 1, details: 1, datagrid: 1, datalist: 1 }, s = { a: 1, embed: 1, hr: 1, img: 1, li: 1, object: 1, ol: 1, table: 1, td: 1, tr: 1, th: 1, ul: 1, dl: 1, dt: 1, dd: 1, form: 1, audio: 1, video: 1 }, x = /\s*(?:;\s*|$)/,
        t = /#\((.+?)\)/g, z = CKEDITOR.dom.walker.bookmark(0, 1), B = CKEDITOR.dom.walker.whitespaces(1); CKEDITOR.style = function (a, b) {
            var c = a.attributes; if (c && c.style) { a.styles = CKEDITOR.tools.extend({}, a.styles, CKEDITOR.tools.parseCssText(c.style)); delete c.style } if (b) { a = CKEDITOR.tools.clone(a); w(a.attributes, b); w(a.styles, b) } c = this.element = a.element ? typeof a.element == "string" ? a.element.toLowerCase() : a.element : "*"; this.type = a.type || (u[c] ? CKEDITOR.STYLE_BLOCK : s[c] ? CKEDITOR.STYLE_OBJECT : CKEDITOR.STYLE_INLINE); if (typeof this.element ==
            "object") this.type = CKEDITOR.STYLE_OBJECT; this._ = { definition: a }
        }; CKEDITOR.editor.prototype.applyStyle = function (a) { a.checkApplicable(this.elementPath()) && v.call(a, this.getSelection()) }; CKEDITOR.editor.prototype.removeStyle = function (a) { a.checkApplicable(this.elementPath()) && v.call(a, this.getSelection(), 1) }; CKEDITOR.style.prototype = {
            apply: function (a) { v.call(this, a.getSelection()) }, remove: function (a) { v.call(this, a.getSelection(), 1) }, applyToRange: function (a) {
                return (this.applyToRange = this.type == CKEDITOR.STYLE_INLINE ?
                    e : this.type == CKEDITOR.STYLE_BLOCK ? g : this.type == CKEDITOR.STYLE_OBJECT ? b : null).call(this, a)
            }, removeFromRange: function (a) { return (this.removeFromRange = this.type == CKEDITOR.STYLE_INLINE ? c : this.type == CKEDITOR.STYLE_BLOCK ? h : this.type == CKEDITOR.STYLE_OBJECT ? j : null).call(this, a) }, applyToObject: function (a) { p(a, this) }, checkActive: function (a) {
                switch (this.type) {
                    case CKEDITOR.STYLE_BLOCK: return this.checkElementRemovable(a.block || a.blockLimit, true); case CKEDITOR.STYLE_OBJECT: case CKEDITOR.STYLE_INLINE: for (var b =
                    a.elements, c = 0, d; c < b.length; c++) { d = b[c]; if (!(this.type == CKEDITOR.STYLE_INLINE && (d == a.block || d == a.blockLimit))) { if (this.type == CKEDITOR.STYLE_OBJECT) { var f = d.getName(); if (!(typeof this.element == "string" ? f == this.element : f in this.element)) continue } if (this.checkElementRemovable(d, true)) return true } }
                } return false
            }, checkApplicable: function (a, b) { if (b && !b.check(this)) return false; switch (this.type) { case CKEDITOR.STYLE_OBJECT: return !!a.contains(this.element); case CKEDITOR.STYLE_BLOCK: return !!a.blockLimit.getDtd()[this.element] } return true },
            checkElementMatch: function (a, b) {
                var c = this._.definition; if (!a || !c.ignoreReadonly && a.isReadOnly()) return false; var d = a.getName(); if (typeof this.element == "string" ? d == this.element : d in this.element) {
                    if (!b && !a.hasAttributes()) return true; if (d = c._AC) c = d; else { var d = {}, f = 0, g = c.attributes; if (g) for (var e in g) { f++; d[e] = g[e] } if (e = CKEDITOR.style.getStyleText(c)) { d.style || f++; d.style = e } d._length = f; c = c._AC = d } if (c._length) {
                        for (var h in c) if (h != "_length") {
                            f = a.getAttribute(h) || ""; if (h == "style") a: {
                                d = c[h]; typeof d ==
                                "string" && (d = CKEDITOR.tools.parseCssText(d)); typeof f == "string" && (f = CKEDITOR.tools.parseCssText(f, true)); e = void 0; for (e in d) if (!(e in f && (f[e] == d[e] || d[e] == "inherit" || f[e] == "inherit"))) { d = false; break a } d = true
                            } else d = c[h] == f; if (d) { if (!b) return true } else if (b) return false
                        } if (b) return true
                    } else return true
                } return false
            }, checkElementRemovable: function (a, b) {
                if (this.checkElementMatch(a, b)) return true; var c = y(this)[a.getName()]; if (c) {
                    var d; if (!(c = c.attributes)) return true; for (var f = 0; f < c.length; f++) {
                        d =
                        c[f][0]; if (d = a.getAttribute(d)) { var g = c[f][1]; if (g === null || typeof g == "string" && d == g || g.test(d)) return true }
                    }
                } return false
            }, buildPreview: function (a) { var b = this._.definition, c = [], d = b.element; d == "bdo" && (d = "span"); var c = ["<", d], f = b.attributes; if (f) for (var g in f) c.push(" ", g, '="', f[g], '"'); (f = CKEDITOR.style.getStyleText(b)) && c.push(' style="', f, '"'); c.push(">", a || b.name, "</", d, ">"); return c.join("") }, getDefinition: function () { return this._.definition }
        }; CKEDITOR.style.getStyleText = function (a) {
            var b = a._ST;
            if (b) return b; var b = a.styles, c = a.attributes && a.attributes.style || "", d = ""; c.length && (c = c.replace(x, ";")); for (var f in b) { var g = b[f], e = (f + ":" + g).replace(x, ";"); g == "inherit" ? d = d + e : c = c + e } c.length && (c = CKEDITOR.tools.normalizeCssText(c, true)); return a._ST = c + d
        }; var F = CKEDITOR.POSITION_PRECEDING | CKEDITOR.POSITION_IDENTICAL | CKEDITOR.POSITION_IS_CONTAINED, C = CKEDITOR.POSITION_FOLLOWING | CKEDITOR.POSITION_IDENTICAL | CKEDITOR.POSITION_IS_CONTAINED
    }(), CKEDITOR.styleCommand = function (d, e) {
        this.requiredContent = this.allowedContent =
        this.style = d; CKEDITOR.tools.extend(this, e, true)
    }, CKEDITOR.styleCommand.prototype.exec = function (d) { d.focus(); this.state == CKEDITOR.TRISTATE_OFF ? d.applyStyle(this.style) : this.state == CKEDITOR.TRISTATE_ON && d.removeStyle(this.style) }, CKEDITOR.stylesSet = new CKEDITOR.resourceManager("", "stylesSet"), CKEDITOR.addStylesSet = CKEDITOR.tools.bind(CKEDITOR.stylesSet.add, CKEDITOR.stylesSet), CKEDITOR.loadStylesSet = function (d, e, c) { CKEDITOR.stylesSet.addExternal(d, e, ""); CKEDITOR.stylesSet.load(d, c) }, CKEDITOR.editor.prototype.getStylesSet =
    function (d) { if (this._.stylesDefinitions) d(this._.stylesDefinitions); else { var e = this, c = e.config.stylesCombo_stylesSet || e.config.stylesSet; if (c === false) d(null); else if (c instanceof Array) { e._.stylesDefinitions = c; d(c) } else { c || (c = "default"); var c = c.split(":"), a = c[0]; CKEDITOR.stylesSet.addExternal(a, c[1] ? c.slice(1).join(":") : CKEDITOR.getUrl("styles.js"), ""); CKEDITOR.stylesSet.load(a, function (b) { e._.stylesDefinitions = b[a]; d(e._.stylesDefinitions) }) } } }, CKEDITOR.dom.comment = function (d, e) {
        typeof d == "string" &&
        (d = (e ? e.$ : document).createComment(d)); CKEDITOR.dom.domObject.call(this, d)
    }, CKEDITOR.dom.comment.prototype = new CKEDITOR.dom.node, CKEDITOR.tools.extend(CKEDITOR.dom.comment.prototype, { type: CKEDITOR.NODE_COMMENT, getOuterHtml: function () { return "<\!--" + this.$.nodeValue + "--\>" } }), "use strict", function () {
        var d = {}, e = {}, c; for (c in CKEDITOR.dtd.$blockLimit) c in CKEDITOR.dtd.$list || (d[c] = 1); for (c in CKEDITOR.dtd.$block) c in CKEDITOR.dtd.$blockLimit || c in CKEDITOR.dtd.$empty || (e[c] = 1); CKEDITOR.dom.elementPath =
        function (a, b) {
            var c = null, g = null, h = [], f = a, i, b = b || a.getDocument().getBody(); do if (f.type == CKEDITOR.NODE_ELEMENT) {
                h.push(f); if (!this.lastElement) { this.lastElement = f; if (f.is(CKEDITOR.dtd.$object) || f.getAttribute("contenteditable") == "false") continue } if (f.equals(b)) break; if (!g) {
                    i = f.getName(); f.getAttribute("contenteditable") == "true" ? g = f : !c && e[i] && (c = f); if (d[i]) {
                        var k; if (k = !c) {
                            if (i = i == "div") {
                                a: {
                                    i = f.getChildren(); k = 0; for (var o = i.count() ; k < o; k++) {
                                        var m = i.getItem(k); if (m.type == CKEDITOR.NODE_ELEMENT && CKEDITOR.dtd.$block[m.getName()]) {
                                            i =
                                            true; break a
                                        }
                                    } i = false
                                } i = !i
                            } k = i
                        } k ? c = f : g = f
                    }
                }
            } while (f = f.getParent()); g || (g = b); this.block = c; this.blockLimit = g; this.root = b; this.elements = h
        }
    }(), CKEDITOR.dom.elementPath.prototype = {
        compare: function (d) { var e = this.elements, d = d && d.elements; if (!d || e.length != d.length) return false; for (var c = 0; c < e.length; c++) if (!e[c].equals(d[c])) return false; return true }, contains: function (d, e, c) {
            var a; typeof d == "string" && (a = function (a) { return a.getName() == d }); d instanceof CKEDITOR.dom.element ? a = function (a) { return a.equals(d) } :
            CKEDITOR.tools.isArray(d) ? a = function (a) { return CKEDITOR.tools.indexOf(d, a.getName()) > -1 } : typeof d == "function" ? a = d : typeof d == "object" && (a = function (a) { return a.getName() in d }); var b = this.elements, j = b.length; e && j--; if (c) { b = Array.prototype.slice.call(b, 0); b.reverse() } for (e = 0; e < j; e++) if (a(b[e])) return b[e]; return null
        }, isContextFor: function (d) { var e; if (d in CKEDITOR.dtd.$block) { e = this.contains(CKEDITOR.dtd.$intermediate) || this.root.equals(this.block) && this.block || this.blockLimit; return !!e.getDtd()[d] } return true },
        direction: function () { return (this.block || this.blockLimit || this.root).getDirection(1) }
    }, CKEDITOR.dom.text = function (d, e) { typeof d == "string" && (d = (e ? e.$ : document).createTextNode(d)); this.$ = d }, CKEDITOR.dom.text.prototype = new CKEDITOR.dom.node, CKEDITOR.tools.extend(CKEDITOR.dom.text.prototype, {
        type: CKEDITOR.NODE_TEXT, getLength: function () { return this.$.nodeValue.length }, getText: function () { return this.$.nodeValue }, setText: function (d) { this.$.nodeValue = d }, split: function (d) {
            var e = this.$.parentNode, c = e.childNodes.length,
            a = this.getLength(), b = this.getDocument(), j = new CKEDITOR.dom.text(this.$.splitText(d), b); if (e.childNodes.length == c) if (d >= a) { j = b.createText(""); j.insertAfter(this) } else { d = b.createText(""); d.insertAfter(j); d.remove() } return j
        }, substring: function (d, e) { return typeof e != "number" ? this.$.nodeValue.substr(d) : this.$.nodeValue.substring(d, e) }
    }), function () {
        function d(c, a, b) {
            var d = c.serializable, g = a[b ? "endContainer" : "startContainer"], e = b ? "endOffset" : "startOffset", f = d ? a.document.getById(c.startNode) : c.startNode,
            c = d ? a.document.getById(c.endNode) : c.endNode; if (g.equals(f.getPrevious())) { a.startOffset = a.startOffset - g.getLength() - c.getPrevious().getLength(); g = c.getNext() } else if (g.equals(c.getPrevious())) { a.startOffset = a.startOffset - g.getLength(); g = c.getNext() } g.equals(f.getParent()) && a[e]++; g.equals(c.getParent()) && a[e]++; a[b ? "endContainer" : "startContainer"] = g; return a
        } CKEDITOR.dom.rangeList = function (c) {
            if (c instanceof CKEDITOR.dom.rangeList) return c; c ? c instanceof CKEDITOR.dom.range && (c = [c]) : c = []; return CKEDITOR.tools.extend(c,
            e)
        }; var e = {
            createIterator: function () {
                var c = this, a = CKEDITOR.dom.walker.bookmark(), b = [], d; return {
                    getNextRange: function (g) {
                        d = d == void 0 ? 0 : d + 1; var e = c[d]; if (e && c.length > 1) {
                            if (!d) for (var f = c.length - 1; f >= 0; f--) b.unshift(c[f].createBookmark(true)); if (g) for (var i = 0; c[d + i + 1];) { for (var k = e.document, g = 0, f = k.getById(b[i].endNode), k = k.getById(b[i + 1].startNode) ; ;) { f = f.getNextSourceNode(false); if (k.equals(f)) g = 1; else if (a(f) || f.type == CKEDITOR.NODE_ELEMENT && f.isBlockBoundary()) continue; break } if (!g) break; i++ } for (e.moveToBookmark(b.shift()) ; i--;) {
                                f =
                                c[++d]; f.moveToBookmark(b.shift()); e.setEnd(f.endContainer, f.endOffset)
                            }
                        } return e
                    }
                }
            }, createBookmarks: function (c) { for (var a = [], b, e = 0; e < this.length; e++) { a.push(b = this[e].createBookmark(c, true)); for (var g = e + 1; g < this.length; g++) { this[g] = d(b, this[g]); this[g] = d(b, this[g], true) } } return a }, createBookmarks2: function (c) { for (var a = [], b = 0; b < this.length; b++) a.push(this[b].createBookmark2(c)); return a }, moveToBookmarks: function (c) { for (var a = 0; a < this.length; a++) this[a].moveToBookmark(c[a]) }
        }
    }(), function () {
        function d() {
            return CKEDITOR.getUrl(CKEDITOR.skinName.split(",")[1] ||
            "skins/" + CKEDITOR.skinName.split(",")[0] + "/")
        } function e(a) { var b = CKEDITOR.skin["ua_" + a], c = CKEDITOR.env; if (b) for (var b = b.split(",").sort(function (a, b) { return a > b ? -1 : 1 }), f = 0, g; f < b.length; f++) { g = b[f]; if (c.ie && (g.replace(/^ie/, "") == c.version || c.quirks && g == "iequirks")) g = "ie"; if (c[g]) { a = a + ("_" + b[f]); break } } return CKEDITOR.getUrl(d() + a + ".css") } function c(a, b) { if (!j[a]) { CKEDITOR.document.appendStyleSheet(e(a)); j[a] = 1 } b && b() } function a(a) {
            var b = a.getById(g); if (!b) {
                b = a.getHead().append("style"); b.setAttribute("id",
                g); b.setAttribute("type", "text/css")
            } return b
        } function b(a, b, c) {
            var d, f, g; if (CKEDITOR.env.webkit) { b = b.split("}").slice(0, -1); for (f = 0; f < b.length; f++) b[f] = b[f].split("{") } for (var e = 0; e < a.length; e++) if (CKEDITOR.env.webkit) for (f = 0; f < b.length; f++) { g = b[f][1]; for (d = 0; d < c.length; d++) g = g.replace(c[d][0], c[d][1]); a[e].$.sheet.addRule(b[f][0], g) } else {
                g = b; for (d = 0; d < c.length; d++) g = g.replace(c[d][0], c[d][1]); CKEDITOR.env.ie && CKEDITOR.env.version < 11 ? a[e].$.styleSheet.cssText = a[e].$.styleSheet.cssText + g : a[e].$.innerHTML =
                a[e].$.innerHTML + g
            }
        } var j = {}; CKEDITOR.skin = {
            path: d, loadPart: function (a, b) { CKEDITOR.skin.name != CKEDITOR.skinName.split(",")[0] ? CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(d() + "skin.js"), function () { c(a, b) }) : c(a, b) }, getPath: function (a) { return CKEDITOR.getUrl(e(a)) }, icons: {}, addIcon: function (a, b, c, d) { a = a.toLowerCase(); this.icons[a] || (this.icons[a] = { path: b, offset: c || 0, bgsize: d || "16px" }) }, getIconStyle: function (a, b, c, d, f) {
                var g; if (a) { a = a.toLowerCase(); b && (g = this.icons[a + "-rtl"]); g || (g = this.icons[a]) } a = c ||
                g && g.path || ""; d = d || g && g.offset; f = f || g && g.bgsize || "16px"; return a && "background-image:url(" + CKEDITOR.getUrl(a) + ");background-position:0 " + d + "px;background-size:" + f + ";"
            }
        }; CKEDITOR.tools.extend(CKEDITOR.editor.prototype, { getUiColor: function () { return this.uiColor }, setUiColor: function (c) { var d = a(CKEDITOR.document); return (this.setUiColor = function (a) { var c = CKEDITOR.skin.chameleon, g = [[f, a]]; this.uiColor = a; b([d], c(this, "editor"), g); b(h, c(this, "panel"), g) }).call(this, c) } }); var g = "cke_ui_color", h = [], f = /\$color/g;
        CKEDITOR.on("instanceLoaded", function (c) { if (!CKEDITOR.env.ie || !CKEDITOR.env.quirks) { var d = c.editor, c = function (c) { c = (c.data[0] || c.data).element.getElementsByTag("iframe").getItem(0).getFrameDocument(); if (!c.getById("cke_ui_color")) { c = a(c); h.push(c); var g = d.getUiColor(); g && b([c], CKEDITOR.skin.chameleon(d, "panel"), [[f, g]]) } }; d.on("panelShow", c); d.on("menuShow", c); d.config.uiColor && d.setUiColor(d.config.uiColor) } })
    }(), function () {
        if (CKEDITOR.env.webkit) CKEDITOR.env.hc = false; else {
            var d = CKEDITOR.dom.element.createFromHtml('<div style="width:0;height:0;position:absolute;left:-10000px;border:1px solid;border-color:red blue"></div>',
            CKEDITOR.document); d.appendTo(CKEDITOR.document.getHead()); try { var e = d.getComputedStyle("border-top-color"), c = d.getComputedStyle("border-right-color"); CKEDITOR.env.hc = !!(e && e == c) } catch (a) { CKEDITOR.env.hc = false } d.remove()
        } if (CKEDITOR.env.hc) CKEDITOR.env.cssClass = CKEDITOR.env.cssClass + " cke_hc"; CKEDITOR.document.appendStyleText(".cke{visibility:hidden;}"); CKEDITOR.status = "loaded"; CKEDITOR.fireOnce("loaded"); if (d = CKEDITOR._.pending) {
            delete CKEDITOR._.pending; for (e = 0; e < d.length; e++) {
                CKEDITOR.editor.prototype.constructor.apply(d[e][0],
                d[e][1]); CKEDITOR.add(d[e][0])
            }
        }
    }(), CKEDITOR.skin.name = "moono", CKEDITOR.skin.ua_editor = "ie,iequirks,ie7,ie8,gecko", CKEDITOR.skin.ua_dialog = "ie,iequirks,ie7,ie8,opera", CKEDITOR.skin.chameleon = function () {
        var d = function () { return function (a, b) { for (var c = a.match(/[^#]./g), d = 0; d < 3; d++) { var e = c, f = d, i; i = parseInt(c[d], 16); i = ("0" + (b < 0 ? 0 | i * (1 + b) : 0 | i + (255 - i) * b).toString(16)).slice(-2); e[f] = i } return "#" + c.join("") } }(), e = function () {
            var a = new CKEDITOR.template("background:#{to};background-image:-webkit-gradient(linear,lefttop,leftbottom,from({from}),to({to}));background-image:-moz-linear-gradient(top,{from},{to});background-image:-webkit-linear-gradient(top,{from},{to});background-image:-o-linear-gradient(top,{from},{to});background-image:-ms-linear-gradient(top,{from},{to});background-image:linear-gradient(top,{from},{to});filter:progid:DXImageTransform.Microsoft.gradient(gradientType=0,startColorstr='{from}',endColorstr='{to}');");
            return function (b, c) { return a.output({ from: b, to: c }) }
        }(), c = {
            editor: new CKEDITOR.template("{id}.cke_chrome [border-color:{defaultBorder};] {id} .cke_top [ {defaultGradient}border-bottom-color:{defaultBorder};] {id} .cke_bottom [{defaultGradient}border-top-color:{defaultBorder};] {id} .cke_resizer [border-right-color:{ckeResizer}] {id} .cke_dialog_title [{defaultGradient}border-bottom-color:{defaultBorder};] {id} .cke_dialog_footer [{defaultGradient}outline-color:{defaultBorder};border-top-color:{defaultBorder};] {id} .cke_dialog_tab [{lightGradient}border-color:{defaultBorder};] {id} .cke_dialog_tab:hover [{mediumGradient}] {id} .cke_dialog_contents [border-top-color:{defaultBorder};] {id} .cke_dialog_tab_selected, {id} .cke_dialog_tab_selected:hover [background:{dialogTabSelected};border-bottom-color:{dialogTabSelectedBorder};] {id} .cke_dialog_body [background:{dialogBody};border-color:{defaultBorder};] {id} .cke_toolgroup [{lightGradient}border-color:{defaultBorder};] {id} a.cke_button_off:hover, {id} a.cke_button_off:focus, {id} a.cke_button_off:active [{mediumGradient}] {id} .cke_button_on [{ckeButtonOn}] {id} .cke_toolbar_separator [background-color: {ckeToolbarSeparator};] {id} .cke_combo_button [border-color:{defaultBorder};{lightGradient}] {id} a.cke_combo_button:hover, {id} a.cke_combo_button:focus, {id} .cke_combo_on a.cke_combo_button [border-color:{defaultBorder};{mediumGradient}] {id} .cke_path_item [color:{elementsPathColor};] {id} a.cke_path_item:hover, {id} a.cke_path_item:focus, {id} a.cke_path_item:active [background-color:{elementsPathBg};] {id}.cke_panel [border-color:{defaultBorder};] "),
            panel: new CKEDITOR.template(".cke_panel_grouptitle [{lightGradient}border-color:{defaultBorder};] .cke_menubutton_icon [background-color:{menubuttonIcon};] .cke_menubutton:hover .cke_menubutton_icon, .cke_menubutton:focus .cke_menubutton_icon, .cke_menubutton:active .cke_menubutton_icon [background-color:{menubuttonIconHover};] .cke_menuseparator [background-color:{menubuttonIcon};] a:hover.cke_colorbox, a:focus.cke_colorbox, a:active.cke_colorbox [border-color:{defaultBorder};] a:hover.cke_colorauto, a:hover.cke_colormore, a:focus.cke_colorauto, a:focus.cke_colormore, a:active.cke_colorauto, a:active.cke_colormore [background-color:{ckeColorauto};border-color:{defaultBorder};] ")
        };
        return function (a, b) {
            var j = a.uiColor, j = { id: "." + a.id, defaultBorder: d(j, -0.1), defaultGradient: e(d(j, 0.9), j), lightGradient: e(d(j, 1), d(j, 0.7)), mediumGradient: e(d(j, 0.8), d(j, 0.5)), ckeButtonOn: e(d(j, 0.6), d(j, 0.7)), ckeResizer: d(j, -0.4), ckeToolbarSeparator: d(j, 0.5), ckeColorauto: d(j, 0.8), dialogBody: d(j, 0.7), dialogTabSelected: e("#FFFFFF", "#FFFFFF"), dialogTabSelectedBorder: "#FFF", elementsPathColor: d(j, -0.6), elementsPathBg: j, menubuttonIcon: d(j, 0.5), menubuttonIconHover: d(j, 0.3) }; return c[b].output(j).replace(/\[/g,
            "{").replace(/\]/g, "}")
        }
    }(), CKEDITOR.plugins.add("dialogui", {
        onLoad: function () {
            var d = function (a) { this._ || (this._ = {}); this._["default"] = this._.initValue = a["default"] || ""; this._.required = a.required || false; for (var b = [this._], c = 1; c < arguments.length; c++) b.push(arguments[c]); b.push(true); CKEDITOR.tools.extend.apply(CKEDITOR.tools, b); return this._ }, e = { build: function (a, b, c) { return new CKEDITOR.ui.dialog.textInput(a, b, c) } }, c = { build: function (a, b, c) { return new CKEDITOR.ui.dialog[b.type](a, b, c) } }, a = {
                isChanged: function () {
                    return this.getValue() !=
                    this.getInitValue()
                }, reset: function (a) { this.setValue(this.getInitValue(), a) }, setInitValue: function () { this._.initValue = this.getValue() }, resetInitValue: function () { this._.initValue = this._["default"] }, getInitValue: function () { return this._.initValue }
            }, b = CKEDITOR.tools.extend({}, CKEDITOR.ui.dialog.uiElement.prototype.eventProcessors, {
                onChange: function (a, b) {
                    if (!this._.domOnChangeRegistered) {
                        a.on("load", function () {
                            this.getInputElement().on("change", function () {
                                a.parts.dialog.isVisible() && this.fire("change",
                                { value: this.getValue() })
                            }, this)
                        }, this); this._.domOnChangeRegistered = true
                    } this.on("change", b)
                }
            }, true), j = /^on([A-Z]\w+)/, g = function (a) { for (var b in a) (j.test(b) || b == "title" || b == "type") && delete a[b]; return a }; CKEDITOR.tools.extend(CKEDITOR.ui.dialog, {
                labeledElement: function (a, b, c, g) {
                    if (!(arguments.length < 4)) {
                        var e = d.call(this, b); e.labelId = CKEDITOR.tools.getNextId() + "_label"; this._.children = []; CKEDITOR.ui.dialog.uiElement.call(this, a, b, c, "div", null, { role: "presentation" }, function () {
                            var c = [], d = b.required ?
                            " cke_required" : ""; if (b.labelLayout != "horizontal") c.push('<label class="cke_dialog_ui_labeled_label' + d + '" ', ' id="' + e.labelId + '"', e.inputId ? ' for="' + e.inputId + '"' : "", (b.labelStyle ? ' style="' + b.labelStyle + '"' : "") + ">", b.label, "</label>", '<div class="cke_dialog_ui_labeled_content"', b.controlStyle ? ' style="' + b.controlStyle + '"' : "", ' role="radiogroup" aria-labelledby="' + e.labelId + '">', g.call(this, a, b), "</div>"); else {
                                d = {
                                    type: "hbox", widths: b.widths, padding: 0, children: [{
                                        type: "html", html: '<label class="cke_dialog_ui_labeled_label' +
                                        d + '" id="' + e.labelId + '" for="' + e.inputId + '"' + (b.labelStyle ? ' style="' + b.labelStyle + '"' : "") + ">" + CKEDITOR.tools.htmlEncode(b.label) + "</span>"
                                    }, { type: "html", html: '<span class="cke_dialog_ui_labeled_content"' + (b.controlStyle ? ' style="' + b.controlStyle + '"' : "") + ">" + g.call(this, a, b) + "</span>" }]
                                }; CKEDITOR.dialog._.uiElementBuilders.hbox.build(a, d, c)
                            } return c.join("")
                        })
                    }
                }, textInput: function (a, b, c) {
                    if (!(arguments.length < 3)) {
                        d.call(this, b); var g = this._.inputId = CKEDITOR.tools.getNextId() + "_textInput", e = {
                            "class": "cke_dialog_ui_input_" +
                            b.type, id: g, type: b.type
                        }; if (b.validate) this.validate = b.validate; if (b.maxLength) e.maxlength = b.maxLength; if (b.size) e.size = b.size; if (b.inputStyle) e.style = b.inputStyle; var j = this, q = false; a.on("load", function () { j.getInputElement().on("keydown", function (a) { a.data.getKeystroke() == 13 && (q = true) }); j.getInputElement().on("keyup", function (b) { if (b.data.getKeystroke() == 13 && q) { a.getButton("ok") && setTimeout(function () { a.getButton("ok").click() }, 0); q = false } }, null, null, 1E3) }); CKEDITOR.ui.dialog.labeledElement.call(this,
                        a, b, c, function () { var a = ['<div class="cke_dialog_ui_input_', b.type, '" role="presentation"']; b.width && a.push('style="width:' + b.width + '" '); a.push("><input "); e["aria-labelledby"] = this._.labelId; this._.required && (e["aria-required"] = this._.required); for (var c in e) a.push(c + '="' + e[c] + '" '); a.push(" /></div>"); return a.join("") })
                    }
                }, textarea: function (a, b, c) {
                    if (!(arguments.length < 3)) {
                        d.call(this, b); var g = this, e = this._.inputId = CKEDITOR.tools.getNextId() + "_textarea", j = {}; if (b.validate) this.validate = b.validate;
                        j.rows = b.rows || 5; j.cols = b.cols || 20; j["class"] = "cke_dialog_ui_input_textarea " + (b["class"] || ""); if (typeof b.inputStyle != "undefined") j.style = b.inputStyle; if (b.dir) j.dir = b.dir; CKEDITOR.ui.dialog.labeledElement.call(this, a, b, c, function () {
                            j["aria-labelledby"] = this._.labelId; this._.required && (j["aria-required"] = this._.required); var a = ['<div class="cke_dialog_ui_input_textarea" role="presentation"><textarea id="', e, '" '], b; for (b in j) a.push(b + '="' + CKEDITOR.tools.htmlEncode(j[b]) + '" '); a.push(">", CKEDITOR.tools.htmlEncode(g._["default"]),
                            "</textarea></div>"); return a.join("")
                        })
                    }
                }, checkbox: function (a, b, c) {
                    if (!(arguments.length < 3)) {
                        var e = d.call(this, b, { "default": !!b["default"] }); if (b.validate) this.validate = b.validate; CKEDITOR.ui.dialog.uiElement.call(this, a, b, c, "span", null, null, function () {
                            var c = CKEDITOR.tools.extend({}, b, { id: b.id ? b.id + "_checkbox" : CKEDITOR.tools.getNextId() + "_checkbox" }, true), d = [], i = CKEDITOR.tools.getNextId() + "_label", j = { "class": "cke_dialog_ui_checkbox_input", type: "checkbox", "aria-labelledby": i }; g(c); if (b["default"]) j.checked =
                            "checked"; if (typeof c.inputStyle != "undefined") c.style = c.inputStyle; e.checkbox = new CKEDITOR.ui.dialog.uiElement(a, c, d, "input", null, j); d.push(' <label id="', i, '" for="', j.id, '"' + (b.labelStyle ? ' style="' + b.labelStyle + '"' : "") + ">", CKEDITOR.tools.htmlEncode(b.label), "</label>"); return d.join("")
                        })
                    }
                }, radio: function (a, b, c) {
                    if (!(arguments.length < 3)) {
                        d.call(this, b); if (!this._["default"]) this._["default"] = this._.initValue = b.items[0][1]; if (b.validate) this.validate = b.valdiate; var e = [], j = this; CKEDITOR.ui.dialog.labeledElement.call(this,
                        a, b, c, function () {
                            for (var c = [], d = [], i = (b.id ? b.id : CKEDITOR.tools.getNextId()) + "_radio", n = 0; n < b.items.length; n++) {
                                var r = b.items[n], p = r[2] !== void 0 ? r[2] : r[0], w = r[1] !== void 0 ? r[1] : r[0], y = CKEDITOR.tools.getNextId() + "_radio_input", A = y + "_label", y = CKEDITOR.tools.extend({}, b, { id: y, title: null, type: null }, true), p = CKEDITOR.tools.extend({}, y, { title: p }, true), v = { type: "radio", "class": "cke_dialog_ui_radio_input", name: i, value: w, "aria-labelledby": A }, u = []; if (j._["default"] == w) v.checked = "checked"; g(y); g(p); if (typeof y.inputStyle !=
                                "undefined") y.style = y.inputStyle; y.keyboardFocusable = true; e.push(new CKEDITOR.ui.dialog.uiElement(a, y, u, "input", null, v)); u.push(" "); new CKEDITOR.ui.dialog.uiElement(a, p, u, "label", null, { id: A, "for": v.id }, r[0]); c.push(u.join(""))
                            } new CKEDITOR.ui.dialog.hbox(a, e, c, d); return d.join("")
                        }); this._.children = e
                    }
                }, button: function (a, b, c) {
                    if (arguments.length) {
                        typeof b == "function" && (b = b(a.getParentEditor())); d.call(this, b, { disabled: b.disabled || false }); CKEDITOR.event.implementOn(this); var g = this; a.on("load", function () {
                            var a =
                            this.getElement(); (function () { a.on("click", function (a) { g.click(); a.data.preventDefault() }); a.on("keydown", function (a) { if (a.data.getKeystroke() in { 32: 1 }) { g.click(); a.data.preventDefault() } }) })(); a.unselectable()
                        }, this); var e = CKEDITOR.tools.extend({}, b); delete e.style; var j = CKEDITOR.tools.getNextId() + "_label"; CKEDITOR.ui.dialog.uiElement.call(this, a, e, c, "a", null, { style: b.style, href: "javascript:void(0)", title: b.label, hidefocus: "true", "class": b["class"], role: "button", "aria-labelledby": j }, '<span id="' +
                        j + '" class="cke_dialog_ui_button">' + CKEDITOR.tools.htmlEncode(b.label) + "</span>")
                    }
                }, select: function (a, b, c) {
                    if (!(arguments.length < 3)) {
                        var e = d.call(this, b); if (b.validate) this.validate = b.validate; e.inputId = CKEDITOR.tools.getNextId() + "_select"; CKEDITOR.ui.dialog.labeledElement.call(this, a, b, c, function () {
                            var c = CKEDITOR.tools.extend({}, b, { id: b.id ? b.id + "_select" : CKEDITOR.tools.getNextId() + "_select" }, true), d = [], i = [], j = { id: e.inputId, "class": "cke_dialog_ui_input_select", "aria-labelledby": this._.labelId }; d.push('<div class="cke_dialog_ui_input_',
                            b.type, '" role="presentation"'); b.width && d.push('style="width:' + b.width + '" '); d.push(">"); if (b.size != void 0) j.size = b.size; if (b.multiple != void 0) j.multiple = b.multiple; g(c); for (var n = 0, r; n < b.items.length && (r = b.items[n]) ; n++) i.push('<option value="', CKEDITOR.tools.htmlEncode(r[1] !== void 0 ? r[1] : r[0]).replace(/"/g, "&quot;"), '" /> ', CKEDITOR.tools.htmlEncode(r[0])); if (typeof c.inputStyle != "undefined") c.style = c.inputStyle; e.select = new CKEDITOR.ui.dialog.uiElement(a, c, d, "select", null, j, i.join("")); d.push("</div>");
                            return d.join("")
                        })
                    }
                }, file: function (a, b, c) {
                    if (!(arguments.length < 3)) {
                        b["default"] === void 0 && (b["default"] = ""); var g = CKEDITOR.tools.extend(d.call(this, b), { definition: b, buttons: [] }); if (b.validate) this.validate = b.validate; a.on("load", function () { CKEDITOR.document.getById(g.frameId).getParent().addClass("cke_dialog_ui_input_file") }); CKEDITOR.ui.dialog.labeledElement.call(this, a, b, c, function () {
                            g.frameId = CKEDITOR.tools.getNextId() + "_fileInput"; var a = ['<iframe frameborder="0" allowtransparency="0" class="cke_dialog_ui_input_file" role="presentation" id="',
                            g.frameId, '" title="', b.label, '" src="javascript:void(']; a.push(CKEDITOR.env.ie ? "(function(){" + encodeURIComponent("document.open();(" + CKEDITOR.tools.fixDomain + ")();document.close();") + "})()" : "0"); a.push(')"></iframe>'); return a.join("")
                        })
                    }
                }, fileButton: function (a, b, c) {
                    if (!(arguments.length < 3)) {
                        d.call(this, b); var g = this; if (b.validate) this.validate = b.validate; var e = CKEDITOR.tools.extend({}, b), j = e.onClick; e.className = (e.className ? e.className + " " : "") + "cke_dialog_ui_button"; e.onClick = function (c) {
                            var d =
                            b["for"]; if (!j || j.call(this, c) !== false) { a.getContentElement(d[0], d[1]).submit(); this.disable() }
                        }; a.on("load", function () { a.getContentElement(b["for"][0], b["for"][1])._.buttons.push(g) }); CKEDITOR.ui.dialog.button.call(this, a, e, c)
                    }
                }, html: function () {
                    var a = /^\s*<[\w:]+\s+([^>]*)?>/, b = /^(\s*<[\w:]+(?:\s+[^>]*)?)((?:.|\r|\n)+)$/, c = /\/$/; return function (d, g, e) {
                        if (!(arguments.length < 3)) {
                            var j = [], l = g.html; l.charAt(0) != "<" && (l = "<span>" + l + "</span>"); var n = g.focus; if (n) {
                                var r = this.focus; this.focus = function () {
                                    (typeof n ==
                                    "function" ? n : r).call(this); this.fire("focus")
                                }; if (g.isFocusable) this.isFocusable = this.isFocusable; this.keyboardFocusable = true
                            } CKEDITOR.ui.dialog.uiElement.call(this, d, g, j, "span", null, null, ""); j = j.join("").match(a); l = l.match(b) || ["", "", ""]; if (c.test(l[1])) { l[1] = l[1].slice(0, -1); l[2] = "/" + l[2] } e.push([l[1], " ", j[1] || "", l[2]].join(""))
                        }
                    }
                }(), fieldset: function (a, b, c, d, g) {
                    var e = g.label; this._ = { children: b }; CKEDITOR.ui.dialog.uiElement.call(this, a, g, d, "fieldset", null, null, function () {
                        var a = []; e && a.push("<legend" +
                        (g.labelStyle ? ' style="' + g.labelStyle + '"' : "") + ">" + e + "</legend>"); for (var b = 0; b < c.length; b++) a.push(c[b]); return a.join("")
                    })
                }
            }, true); CKEDITOR.ui.dialog.html.prototype = new CKEDITOR.ui.dialog.uiElement; CKEDITOR.ui.dialog.labeledElement.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement, {
                setLabel: function (a) { var b = CKEDITOR.document.getById(this._.labelId); b.getChildCount() < 1 ? (new CKEDITOR.dom.text(a, CKEDITOR.document)).appendTo(b) : b.getChild(0).$.nodeValue = a; return this }, getLabel: function () {
                    var a =
                    CKEDITOR.document.getById(this._.labelId); return !a || a.getChildCount() < 1 ? "" : a.getChild(0).getText()
                }, eventProcessors: b
            }, true); CKEDITOR.ui.dialog.button.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement, {
                click: function () { return !this._.disabled ? this.fire("click", { dialog: this._.dialog }) : false }, enable: function () { this._.disabled = false; var a = this.getElement(); a && a.removeClass("cke_disabled") }, disable: function () { this._.disabled = true; this.getElement().addClass("cke_disabled") }, isVisible: function () { return this.getElement().getFirst().isVisible() },
                isEnabled: function () { return !this._.disabled }, eventProcessors: CKEDITOR.tools.extend({}, CKEDITOR.ui.dialog.uiElement.prototype.eventProcessors, { onClick: function (a, b) { this.on("click", function () { b.apply(this, arguments) }) } }, true), accessKeyUp: function () { this.click() }, accessKeyDown: function () { this.focus() }, keyboardFocusable: true
            }, true); CKEDITOR.ui.dialog.textInput.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.labeledElement, {
                getInputElement: function () { return CKEDITOR.document.getById(this._.inputId) },
                focus: function () { var a = this.selectParentTab(); setTimeout(function () { var b = a.getInputElement(); b && b.$.focus() }, 0) }, select: function () { var a = this.selectParentTab(); setTimeout(function () { var b = a.getInputElement(); if (b) { b.$.focus(); b.$.select() } }, 0) }, accessKeyUp: function () { this.select() }, setValue: function (a) { !a && (a = ""); return CKEDITOR.ui.dialog.uiElement.prototype.setValue.apply(this, arguments) }, keyboardFocusable: true
            }, a, true); CKEDITOR.ui.dialog.textarea.prototype = new CKEDITOR.ui.dialog.textInput; CKEDITOR.ui.dialog.select.prototype =
            CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.labeledElement, {
                getInputElement: function () { return this._.select.getElement() }, add: function (a, b, c) { var d = new CKEDITOR.dom.element("option", this.getDialog().getParentEditor().document), g = this.getInputElement().$; d.$.text = a; d.$.value = b === void 0 || b === null ? a : b; c === void 0 || c === null ? CKEDITOR.env.ie ? g.add(d.$) : g.add(d.$, null) : g.add(d.$, c); return this }, remove: function (a) { this.getInputElement().$.remove(a); return this }, clear: function () {
                    for (var a = this.getInputElement().$; a.length >
                    0;) a.remove(0); return this
                }, keyboardFocusable: true
            }, a, true); CKEDITOR.ui.dialog.checkbox.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement, {
                getInputElement: function () { return this._.checkbox.getElement() }, setValue: function (a, b) { this.getInputElement().$.checked = a; !b && this.fire("change", { value: a }) }, getValue: function () { return this.getInputElement().$.checked }, accessKeyUp: function () { this.setValue(!this.getValue()) }, eventProcessors: {
                    onChange: function (a, c) {
                        if (!CKEDITOR.env.ie || CKEDITOR.env.version >
                        8) return b.onChange.apply(this, arguments); a.on("load", function () { var a = this._.checkbox.getElement(); a.on("propertychange", function (b) { b = b.data.$; b.propertyName == "checked" && this.fire("change", { value: a.$.checked }) }, this) }, this); this.on("change", c); return null
                    }
                }, keyboardFocusable: true
            }, a, true); CKEDITOR.ui.dialog.radio.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement, {
                setValue: function (a, b) {
                    for (var c = this._.children, d, g = 0; g < c.length && (d = c[g]) ; g++) d.getElement().$.checked = d.getValue() ==
                    a; !b && this.fire("change", { value: a })
                }, getValue: function () { for (var a = this._.children, b = 0; b < a.length; b++) if (a[b].getElement().$.checked) return a[b].getValue(); return null }, accessKeyUp: function () { var a = this._.children, b; for (b = 0; b < a.length; b++) if (a[b].getElement().$.checked) { a[b].getElement().focus(); return } a[0].getElement().focus() }, eventProcessors: {
                    onChange: function (a, c) {
                        if (CKEDITOR.env.ie) {
                            a.on("load", function () {
                                for (var a = this._.children, b = this, c = 0; c < a.length; c++) a[c].getElement().on("propertychange",
                                function (a) { a = a.data.$; a.propertyName == "checked" && this.$.checked && b.fire("change", { value: this.getAttribute("value") }) })
                            }, this); this.on("change", c)
                        } else return b.onChange.apply(this, arguments); return null
                    }
                }
            }, a, true); CKEDITOR.ui.dialog.file.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.labeledElement, a, {
                getInputElement: function () { var a = CKEDITOR.document.getById(this._.frameId).getFrameDocument(); return a.$.forms.length > 0 ? new CKEDITOR.dom.element(a.$.forms[0].elements[0]) : this.getElement() },
                submit: function () { this.getInputElement().getParent().$.submit(); return this }, getAction: function () { return this.getInputElement().getParent().$.action }, registerEvents: function (a) { var b = /^on([A-Z]\w+)/, c, d = function (a, b, c, d) { a.on("formLoaded", function () { a.getInputElement().on(c, d, a) }) }, g; for (g in a) if (c = g.match(b)) this.eventProcessors[g] ? this.eventProcessors[g].call(this, this._.dialog, a[g]) : d(this, this._.dialog, c[1].toLowerCase(), a[g]); return this }, reset: function () {
                    function a() {
                        c.$.open(); var h = ""; d.size &&
                        (h = d.size - (CKEDITOR.env.ie ? 7 : 0)); var p = b.frameId + "_input"; c.$.write(['<html dir="' + l + '" lang="' + n + '"><head><title></title></head><body style="margin: 0; overflow: hidden; background: transparent;">', '<form enctype="multipart/form-data" method="POST" dir="' + l + '" lang="' + n + '" action="', CKEDITOR.tools.htmlEncode(d.action), '"><label id="', b.labelId, '" for="', p, '" style="display:none">', CKEDITOR.tools.htmlEncode(d.label), '</label><input id="', p, '" aria-labelledby="', b.labelId, '" type="file" name="', CKEDITOR.tools.htmlEncode(d.id ||
                        "cke_upload"), '" size="', CKEDITOR.tools.htmlEncode(h > 0 ? h : ""), '" /></form></body></html><script>', CKEDITOR.env.ie ? "(" + CKEDITOR.tools.fixDomain + ")();" : "", "window.parent.CKEDITOR.tools.callFunction(" + e + ");", "window.onbeforeunload = function() {window.parent.CKEDITOR.tools.callFunction(" + j + ")}", "<\/script>"].join("")); c.$.close(); for (h = 0; h < g.length; h++) g[h].enable()
                    } var b = this._, c = CKEDITOR.document.getById(b.frameId).getFrameDocument(), d = b.definition, g = b.buttons, e = this.formLoadedNumber, j = this.formUnloadNumber,
                    l = b.dialog._.editor.lang.dir, n = b.dialog._.editor.langCode; if (!e) { e = this.formLoadedNumber = CKEDITOR.tools.addFunction(function () { this.fire("formLoaded") }, this); j = this.formUnloadNumber = CKEDITOR.tools.addFunction(function () { this.getInputElement().clearCustomData() }, this); this.getDialog()._.editor.on("destroy", function () { CKEDITOR.tools.removeFunction(e); CKEDITOR.tools.removeFunction(j) }) } CKEDITOR.env.gecko ? setTimeout(a, 500) : a()
                }, getValue: function () { return this.getInputElement().$.value || "" }, setInitValue: function () {
                    this._.initValue =
                    ""
                }, eventProcessors: { onChange: function (a, b) { if (!this._.domOnChangeRegistered) { this.on("formLoaded", function () { this.getInputElement().on("change", function () { this.fire("change", { value: this.getValue() }) }, this) }, this); this._.domOnChangeRegistered = true } this.on("change", b) } }, keyboardFocusable: true
            }, true); CKEDITOR.ui.dialog.fileButton.prototype = new CKEDITOR.ui.dialog.button; CKEDITOR.ui.dialog.fieldset.prototype = CKEDITOR.tools.clone(CKEDITOR.ui.dialog.hbox.prototype); CKEDITOR.dialog.addUIElement("text", e);
            CKEDITOR.dialog.addUIElement("password", e); CKEDITOR.dialog.addUIElement("textarea", c); CKEDITOR.dialog.addUIElement("checkbox", c); CKEDITOR.dialog.addUIElement("radio", c); CKEDITOR.dialog.addUIElement("button", c); CKEDITOR.dialog.addUIElement("select", c); CKEDITOR.dialog.addUIElement("file", c); CKEDITOR.dialog.addUIElement("fileButton", c); CKEDITOR.dialog.addUIElement("html", c); CKEDITOR.dialog.addUIElement("fieldset", {
                build: function (a, b, c) {
                    for (var d = b.children, g, e = [], j = [], l = 0; l < d.length && (g = d[l]) ; l++) {
                        var n =
                        []; e.push(n); j.push(CKEDITOR.dialog._.uiElementBuilders[g.type].build(a, g, n))
                    } return new CKEDITOR.ui.dialog[b.type](a, j, e, c, b)
                }
            })
        }
    }), CKEDITOR.DIALOG_RESIZE_NONE = 0, CKEDITOR.DIALOG_RESIZE_WIDTH = 1, CKEDITOR.DIALOG_RESIZE_HEIGHT = 2, CKEDITOR.DIALOG_RESIZE_BOTH = 3, function () {
        function d() { for (var a = this._.tabIdList.length, b = CKEDITOR.tools.indexOf(this._.tabIdList, this._.currentTabId) + a, c = b - 1; c > b - a; c--) if (this._.tabs[this._.tabIdList[c % a]][0].$.offsetHeight) return this._.tabIdList[c % a]; return null } function e() {
            for (var a =
            this._.tabIdList.length, b = CKEDITOR.tools.indexOf(this._.tabIdList, this._.currentTabId), c = b + 1; c < b + a; c++) if (this._.tabs[this._.tabIdList[c % a]][0].$.offsetHeight) return this._.tabIdList[c % a]; return null
        } function c(a, b) {
            for (var c = a.$.getElementsByTagName("input"), d = 0, g = c.length; d < g; d++) {
                var f = new CKEDITOR.dom.element(c[d]); if (f.getAttribute("type").toLowerCase() == "text") if (b) { f.setAttribute("value", f.getCustomData("fake_value") || ""); f.removeCustomData("fake_value") } else {
                    f.setCustomData("fake_value", f.getAttribute("value"));
                    f.setAttribute("value", "")
                }
            }
        } function a(a, b) { var c = this.getInputElement(); c && (a ? c.removeAttribute("aria-invalid") : c.setAttribute("aria-invalid", true)); a || (this.select ? this.select() : this.focus()); b && alert(b); this.fire("validated", { valid: a, msg: b }) } function b() { var a = this.getInputElement(); a && a.removeAttribute("aria-invalid") } function j(a) {
            var a = CKEDITOR.dom.element.createFromHtml(CKEDITOR.addTemplate("dialog", n).output({
                id: CKEDITOR.tools.getNextNumber(), editorId: a.id, langDir: a.lang.dir, langCode: a.langCode,
                editorDialogClass: "cke_editor_" + a.name.replace(/\./g, "\\.") + "_dialog", closeTitle: a.lang.common.close, hidpi: CKEDITOR.env.hidpi ? "cke_hidpi" : ""
            })), b = a.getChild([0, 0, 0, 0, 0]), c = b.getChild(0), d = b.getChild(1); if (CKEDITOR.env.ie && !CKEDITOR.env.ie6Compat) { var g = "javascript:void(function(){" + encodeURIComponent("document.open();(" + CKEDITOR.tools.fixDomain + ")();document.close();") + "}())"; CKEDITOR.dom.element.createFromHtml('<iframe frameBorder="0" class="cke_iframe_shim" src="' + g + '" tabIndex="-1"></iframe>').appendTo(b.getParent()) } c.unselectable();
            d.unselectable(); return { element: a, parts: { dialog: a.getChild(0), title: c, close: d, tabs: b.getChild(2), contents: b.getChild([3, 0, 0, 0]), footer: b.getChild([3, 0, 1, 0]) } }
        } function g(a, b, c) {
            this.element = b; this.focusIndex = c; this.tabIndex = 0; this.isFocusable = function () { return !b.getAttribute("disabled") && b.isVisible() }; this.focus = function () { a._.currentFocusIndex = this.focusIndex; this.element.focus() }; b.on("keydown", function (a) { a.data.getKeystroke() in { 32: 1, 13: 1 } && this.fire("click") }); b.on("focus", function () { this.fire("mouseover") });
            b.on("blur", function () { this.fire("mouseout") })
        } function h(a) { function b() { a.layout() } var c = CKEDITOR.document.getWindow(); c.on("resize", b); a.on("hide", function () { c.removeListener("resize", b) }) } function f(a, b) { this._ = { dialog: a }; CKEDITOR.tools.extend(this, b) } function i(a) {
            function b(c) {
                var j = a.getSize(), i = CKEDITOR.document.getWindow().getViewPaneSize(), l = c.data.$.screenX, k = c.data.$.screenY, n = l - d.x, p = k - d.y; d = { x: l, y: k }; g.x = g.x + n; g.y = g.y + p; a.move(g.x + h[3] < e ? -h[3] : g.x - h[1] > i.width - j.width - e ? i.width - j.width +
                (f.lang.dir == "rtl" ? 0 : h[1]) : g.x, g.y + h[0] < e ? -h[0] : g.y - h[2] > i.height - j.height - e ? i.height - j.height + h[2] : g.y, 1); c.data.preventDefault()
            } function c() { CKEDITOR.document.removeListener("mousemove", b); CKEDITOR.document.removeListener("mouseup", c); if (CKEDITOR.env.ie6Compat) { var a = s.getChild(0).getFrameDocument(); a.removeListener("mousemove", b); a.removeListener("mouseup", c) } } var d = null, g = null; a.getElement().getFirst(); var f = a.getParentEditor(), e = f.config.dialog_magnetDistance, h = CKEDITOR.skin.margins || [0, 0, 0,
            0]; typeof e == "undefined" && (e = 20); a.parts.title.on("mousedown", function (f) { d = { x: f.data.$.screenX, y: f.data.$.screenY }; CKEDITOR.document.on("mousemove", b); CKEDITOR.document.on("mouseup", c); g = a.getPosition(); if (CKEDITOR.env.ie6Compat) { var e = s.getChild(0).getFrameDocument(); e.on("mousemove", b); e.on("mouseup", c) } f.data.preventDefault() }, a)
        } function k(a) {
            var b, c; function d(g) {
                var n = h.lang.dir == "rtl", p = k.width, m = k.height, r = p + (g.data.$.screenX - b) * (n ? -1 : 1) * (a._.moved ? 1 : 2), o = m + (g.data.$.screenY - c) * (a._.moved ?
                1 : 2), w = a._.element.getFirst(), w = n && w.getComputedStyle("right"), q = a.getPosition(); q.y + o > l.height && (o = l.height - q.y); if ((n ? w : q.x) + r > l.width) r = l.width - (n ? w : q.x); if (e == CKEDITOR.DIALOG_RESIZE_WIDTH || e == CKEDITOR.DIALOG_RESIZE_BOTH) p = Math.max(f.minWidth || 0, r - j); if (e == CKEDITOR.DIALOG_RESIZE_HEIGHT || e == CKEDITOR.DIALOG_RESIZE_BOTH) m = Math.max(f.minHeight || 0, o - i); a.resize(p, m); a._.moved || a.layout(); g.data.preventDefault()
            } function g() {
                CKEDITOR.document.removeListener("mouseup", g); CKEDITOR.document.removeListener("mousemove",
                d); if (n) { n.remove(); n = null } if (CKEDITOR.env.ie6Compat) { var a = s.getChild(0).getFrameDocument(); a.removeListener("mouseup", g); a.removeListener("mousemove", d) }
            } var f = a.definition, e = f.resizable; if (e != CKEDITOR.DIALOG_RESIZE_NONE) {
                var h = a.getParentEditor(), j, i, l, k, n, p = CKEDITOR.tools.addFunction(function (f) {
                    k = a.getSize(); var e = a.parts.contents; if (e.$.getElementsByTagName("iframe").length) {
                        n = CKEDITOR.dom.element.createFromHtml('<div class="cke_dialog_resize_cover" style="height: 100%; position: absolute; width: 100%;"></div>');
                        e.append(n)
                    } i = k.height - a.parts.contents.getSize("height", !(CKEDITOR.env.gecko || CKEDITOR.env.opera || CKEDITOR.env.ie && CKEDITOR.env.quirks)); j = k.width - a.parts.contents.getSize("width", 1); b = f.screenX; c = f.screenY; l = CKEDITOR.document.getWindow().getViewPaneSize(); CKEDITOR.document.on("mousemove", d); CKEDITOR.document.on("mouseup", g); if (CKEDITOR.env.ie6Compat) { e = s.getChild(0).getFrameDocument(); e.on("mousemove", d); e.on("mouseup", g) } f.preventDefault && f.preventDefault()
                }); a.on("load", function () {
                    var b = ""; e ==
                    CKEDITOR.DIALOG_RESIZE_WIDTH ? b = " cke_resizer_horizontal" : e == CKEDITOR.DIALOG_RESIZE_HEIGHT && (b = " cke_resizer_vertical"); b = CKEDITOR.dom.element.createFromHtml('<div class="cke_resizer' + b + " cke_resizer_" + h.lang.dir + '" title="' + CKEDITOR.tools.htmlEncode(h.lang.common.resize) + '" onmousedown="CKEDITOR.tools.callFunction(' + p + ', event )">' + (h.lang.dir == "ltr" ? "◢" : "◣") + "</div>"); a.parts.footer.append(b, 1)
                }); h.on("destroy", function () { CKEDITOR.tools.removeFunction(p) })
            }
        } function o(a) { a.data.preventDefault(1) }
        function m(a) {
            var b = CKEDITOR.document.getWindow(), c = a.config, d = c.dialog_backgroundCoverColor || "white", g = c.dialog_backgroundCoverOpacity, f = c.baseFloatZIndex, c = CKEDITOR.tools.genKey(d, g, f), e = u[c]; if (e) e.show(); else {
                f = ['<div tabIndex="-1" style="position: ', CKEDITOR.env.ie6Compat ? "absolute" : "fixed", "; z-index: ", f, "; top: 0px; left: 0px; ", !CKEDITOR.env.ie6Compat ? "background-color: " + d : "", '" class="cke_dialog_background_cover">']; if (CKEDITOR.env.ie6Compat) {
                    d = "<html><body style=\\'background-color:" +
                    d + ";\\'></body></html>"; f.push('<iframe hidefocus="true" frameborder="0" id="cke_dialog_background_iframe" src="javascript:'); f.push("void((function(){" + encodeURIComponent("document.open();(" + CKEDITOR.tools.fixDomain + ")();document.write( '" + d + "' );document.close();") + "})())"); f.push('" style="position:absolute;left:0;top:0;width:100%;height: 100%;filter: progid:DXImageTransform.Microsoft.Alpha(opacity=0)"></iframe>')
                } f.push("</div>"); e = CKEDITOR.dom.element.createFromHtml(f.join("")); e.setOpacity(g !=
                void 0 ? g : 0.5); e.on("keydown", o); e.on("keypress", o); e.on("keyup", o); e.appendTo(CKEDITOR.document.getBody()); u[c] = e
            } a.focusManager.add(e); s = e; var a = function () { var a = b.getViewPaneSize(); e.setStyles({ width: a.width + "px", height: a.height + "px" }) }, h = function () { var a = b.getScrollPosition(), c = CKEDITOR.dialog._.currentTop; e.setStyles({ left: a.x + "px", top: a.y + "px" }); if (c) { do { a = c.getPosition(); c.move(a.x, a.y) } while (c = c._.parentDialog) } }; v = a; b.on("resize", a); a(); (!CKEDITOR.env.mac || !CKEDITOR.env.webkit) && e.focus();
            if (CKEDITOR.env.ie6Compat) { var j = function () { h(); arguments.callee.prevScrollHandler.apply(this, arguments) }; b.$.setTimeout(function () { j.prevScrollHandler = window.onscroll || function () { }; window.onscroll = j }, 0); h() }
        } function q(a) { if (s) { a.focusManager.remove(s); a = CKEDITOR.document.getWindow(); s.hide(); a.removeListener("resize", v); CKEDITOR.env.ie6Compat && a.$.setTimeout(function () { window.onscroll = window.onscroll && window.onscroll.prevScrollHandler || null }, 0); v = null } } var l = CKEDITOR.tools.cssLength, n = '<div class="cke_reset_all {editorId} {editorDialogClass} {hidpi}" dir="{langDir}" lang="{langCode}" role="dialog" aria-labelledby="cke_dialog_title_{id}"><table class="cke_dialog ' +
        CKEDITOR.env.cssClass + ' cke_{langDir}" style="position:absolute" role="presentation"><tr><td role="presentation"><div class="cke_dialog_body" role="presentation"><div id="cke_dialog_title_{id}" class="cke_dialog_title" role="presentation"></div><a id="cke_dialog_close_button_{id}" class="cke_dialog_close_button" href="javascript:void(0)" title="{closeTitle}" role="button"><span class="cke_label">X</span></a><div id="cke_dialog_tabs_{id}" class="cke_dialog_tabs" role="tablist"></div><table class="cke_dialog_contents" role="presentation"><tr><td id="cke_dialog_contents_{id}" class="cke_dialog_contents_body" role="presentation"></td></tr><tr><td id="cke_dialog_footer_{id}" class="cke_dialog_footer" role="presentation"></td></tr></table></div></td></tr></table></div>';
        CKEDITOR.dialog = function (c, g) {
            function f() { var a = t._.focusList; a.sort(function (a, b) { return a.tabIndex != b.tabIndex ? b.tabIndex - a.tabIndex : a.focusIndex - b.focusIndex }); for (var b = a.length, c = 0; c < b; c++) a[c].focusIndex = c } function h(a) { var b = t._.focusList, a = a || 0; if (!(b.length < 1)) { var c = t._.currentFocusIndex; try { b[c].getInputElement().$.blur() } catch (d) { } for (var g = c = (c + a + b.length) % b.length; a && !b[g].isFocusable() ;) { g = (g + a + b.length) % b.length; if (g == c) break } b[g].focus(); b[g].type == "text" && b[g].select() } } function l(a) {
                if (t ==
                CKEDITOR.dialog._.currentTop) {
                    var b = a.data.getKeystroke(), g = c.lang.dir == "rtl"; y = v = 0; if (b == 9 || b == CKEDITOR.SHIFT + 9) { b = b == CKEDITOR.SHIFT + 9; if (t._.tabBarMode) { b = b ? d.call(t) : e.call(t); t.selectPage(b); t._.tabs[b][0].focus() } else h(b ? -1 : 1); y = 1 } else if (b == CKEDITOR.ALT + 121 && !t._.tabBarMode && t.getPageCount() > 1) { t._.tabBarMode = true; t._.tabs[t._.currentTabId][0].focus(); y = 1 } else if ((b == 37 || b == 39) && t._.tabBarMode) { b = b == (g ? 39 : 37) ? d.call(t) : e.call(t); t.selectPage(b); t._.tabs[b][0].focus(); y = 1 } else if ((b == 13 || b ==
                    32) && t._.tabBarMode) { this.selectPage(this._.currentTabId); this._.tabBarMode = false; this._.currentFocusIndex = -1; h(1); y = 1 } else if (b == 13) { b = a.data.getTarget(); if (!b.is("a", "button", "select", "textarea") && (!b.is("input") || b.$.type != "button")) { (b = this.getButton("ok")) && CKEDITOR.tools.setTimeout(b.click, 0, b); y = 1 } v = 1 } else if (b == 27) { (b = this.getButton("cancel")) ? CKEDITOR.tools.setTimeout(b.click, 0, b) : this.fire("cancel", { hide: true }).hide !== false && this.hide(); v = 1 } else return; n(a)
                }
            } function n(a) {
                y ? a.data.preventDefault(1) :
                v && a.data.stopPropagation()
            } var p = CKEDITOR.dialog._.dialogDefinitions[g], m = CKEDITOR.tools.clone(r), o = c.config.dialog_buttonsOrder || "OS", w = c.lang.dir, q = {}, y, v; (o == "OS" && CKEDITOR.env.mac || o == "rtl" && w == "ltr" || o == "ltr" && w == "rtl") && m.buttons.reverse(); p = CKEDITOR.tools.extend(p(c), m); p = CKEDITOR.tools.clone(p); p = new A(this, p); m = j(c); this._ = {
                editor: c, element: m.element, name: g, contentSize: { width: 0, height: 0 }, size: { width: 0, height: 0 }, contents: {}, buttons: {}, accessKeyMap: {}, tabs: {}, tabIdList: [], currentTabId: null,
                currentTabIndex: null, pageCount: 0, lastTab: null, tabBarMode: false, focusList: [], currentFocusIndex: 0, hasFocus: false
            }; this.parts = m.parts; CKEDITOR.tools.setTimeout(function () { c.fire("ariaWidget", this.parts.contents) }, 0, this); m = { position: CKEDITOR.env.ie6Compat ? "absolute" : "fixed", top: 0, visibility: "hidden" }; m[w == "rtl" ? "right" : "left"] = 0; this.parts.dialog.setStyles(m); CKEDITOR.event.call(this); this.definition = p = CKEDITOR.fire("dialogDefinition", { name: g, definition: p }, c).definition; if (!("removeDialogTabs" in c._) &&
            c.config.removeDialogTabs) { m = c.config.removeDialogTabs.split(";"); for (w = 0; w < m.length; w++) { o = m[w].split(":"); if (o.length == 2) { var u = o[0]; q[u] || (q[u] = []); q[u].push(o[1]) } } c._.removeDialogTabs = q } if (c._.removeDialogTabs && (q = c._.removeDialogTabs[g])) for (w = 0; w < q.length; w++) p.removeContents(q[w]); if (p.onLoad) this.on("load", p.onLoad); if (p.onShow) this.on("show", p.onShow); if (p.onHide) this.on("hide", p.onHide); if (p.onOk) this.on("ok", function (a) {
                c.fire("saveSnapshot"); setTimeout(function () { c.fire("saveSnapshot") },
                0); if (p.onOk.call(this, a) === false) a.data.hide = false
            }); if (p.onCancel) this.on("cancel", function (a) { if (p.onCancel.call(this, a) === false) a.data.hide = false }); var t = this, s = function (a) { var b = t._.contents, c = false, d; for (d in b) for (var g in b[d]) if (c = a.call(this, b[d][g])) return }; this.on("ok", function (b) { s(function (c) { if (c.validate) { var d = c.validate(this), g = typeof d == "string" || d === false; if (g) { b.data.hide = false; b.stop() } a.call(c, !g, typeof d == "string" ? d : void 0); return g } }) }, this, null, 0); this.on("cancel", function (a) {
                s(function (b) {
                    if (b.isChanged()) {
                        if (!c.config.dialog_noConfirmCancel &&
                        !confirm(c.lang.common.confirmCancel)) a.data.hide = false; return true
                    }
                })
            }, this, null, 0); this.parts.close.on("click", function (a) { this.fire("cancel", { hide: true }).hide !== false && this.hide(); a.data.preventDefault() }, this); this.changeFocus = h; var z = this._.element; c.focusManager.add(z, 1); this.on("show", function () { z.on("keydown", l, this); if (CKEDITOR.env.opera || CKEDITOR.env.gecko) z.on("keypress", n, this) }); this.on("hide", function () {
                z.removeListener("keydown", l); (CKEDITOR.env.opera || CKEDITOR.env.gecko) && z.removeListener("keypress",
                n); s(function (a) { b.apply(a) })
            }); this.on("iframeAdded", function (a) { (new CKEDITOR.dom.document(a.data.iframe.$.contentWindow.document)).on("keydown", l, this, null, 0) }); this.on("show", function () { f(); if (c.config.dialog_startupFocusTab && t._.pageCount > 1) { t._.tabBarMode = true; t._.tabs[t._.currentTabId][0].focus() } else if (!this._.hasFocus) { this._.currentFocusIndex = -1; if (p.onFocus) { var a = p.onFocus.call(this); a && a.focus() } else h(1) } }, this, null, 4294967295); if (CKEDITOR.env.ie6Compat) this.on("load", function () {
                var a =
                this.getElement(), b = a.getFirst(); b.remove(); b.appendTo(a)
            }, this); i(this); k(this); (new CKEDITOR.dom.text(p.title, CKEDITOR.document)).appendTo(this.parts.title); for (w = 0; w < p.contents.length; w++) (q = p.contents[w]) && this.addPage(q); this.parts.tabs.on("click", function (a) { var b = a.data.getTarget(); if (b.hasClass("cke_dialog_tab")) { b = b.$.id; this.selectPage(b.substring(4, b.lastIndexOf("_"))); if (this._.tabBarMode) { this._.tabBarMode = false; this._.currentFocusIndex = -1; h(1) } a.data.preventDefault() } }, this); w = []; q =
            CKEDITOR.dialog._.uiElementBuilders.hbox.build(this, { type: "hbox", className: "cke_dialog_footer_buttons", widths: [], children: p.buttons }, w).getChild(); this.parts.footer.setHtml(w.join("")); for (w = 0; w < q.length; w++) this._.buttons[q[w].id] = q[w]
        }; CKEDITOR.dialog.prototype = {
            destroy: function () { this.hide(); this._.element.remove() }, resize: function () {
                return function (a, b) {
                    if (!this._.contentSize || !(this._.contentSize.width == a && this._.contentSize.height == b)) {
                        CKEDITOR.dialog.fire("resize", { dialog: this, width: a, height: b },
                        this._.editor); this.fire("resize", { width: a, height: b }, this._.editor); this.parts.contents.setStyles({ width: a + "px", height: b + "px" }); if (this._.editor.lang.dir == "rtl" && this._.position) this._.position.x = CKEDITOR.document.getWindow().getViewPaneSize().width - this._.contentSize.width - parseInt(this._.element.getFirst().getStyle("right"), 10); this._.contentSize = { width: a, height: b }
                    }
                }
            }(), getSize: function () { var a = this._.element.getFirst(); return { width: a.$.offsetWidth || 0, height: a.$.offsetHeight || 0 } }, move: function (a,
            b, c) {
                var d = this._.element.getFirst(), g = this._.editor.lang.dir == "rtl", f = d.getComputedStyle("position") == "fixed"; CKEDITOR.env.ie && d.setStyle("zoom", "100%"); if (!f || !this._.position || !(this._.position.x == a && this._.position.y == b)) {
                    this._.position = { x: a, y: b }; if (!f) { f = CKEDITOR.document.getWindow().getScrollPosition(); a = a + f.x; b = b + f.y } if (g) { f = this.getSize(); a = CKEDITOR.document.getWindow().getViewPaneSize().width - f.width - a } b = { top: (b > 0 ? b : 0) + "px" }; b[g ? "right" : "left"] = (a > 0 ? a : 0) + "px"; d.setStyles(b); c && (this._.moved =
                    1)
                }
            }, getPosition: function () { return CKEDITOR.tools.extend({}, this._.position) }, show: function () {
                var a = this._.element, b = this.definition; !a.getParent() || !a.getParent().equals(CKEDITOR.document.getBody()) ? a.appendTo(CKEDITOR.document.getBody()) : a.setStyle("display", "block"); if (CKEDITOR.env.gecko && CKEDITOR.env.version < 10900) { var c = this.parts.dialog; c.setStyle("position", "absolute"); setTimeout(function () { c.setStyle("position", "fixed") }, 0) } this.resize(this._.contentSize && this._.contentSize.width || b.width ||
                b.minWidth, this._.contentSize && this._.contentSize.height || b.height || b.minHeight); this.reset(); this.selectPage(this.definition.contents[0].id); if (CKEDITOR.dialog._.currentZIndex === null) CKEDITOR.dialog._.currentZIndex = this._.editor.config.baseFloatZIndex; this._.element.getFirst().setStyle("z-index", CKEDITOR.dialog._.currentZIndex = CKEDITOR.dialog._.currentZIndex + 10); if (CKEDITOR.dialog._.currentTop === null) { CKEDITOR.dialog._.currentTop = this; this._.parentDialog = null; m(this._.editor) } else {
                    this._.parentDialog =
                    CKEDITOR.dialog._.currentTop; this._.parentDialog.getElement().getFirst().$.style.zIndex -= Math.floor(this._.editor.config.baseFloatZIndex / 2); CKEDITOR.dialog._.currentTop = this
                } a.on("keydown", t); a.on(CKEDITOR.env.opera ? "keypress" : "keyup", z); this._.hasFocus = false; for (var d in b.contents) if (b.contents[d]) {
                    var a = b.contents[d], g = this._.tabs[a.id], f = a.requiredContent, e = 0; if (g) {
                        for (var j in this._.contents[a.id]) {
                            var i = this._.contents[a.id][j]; if (!(i.type == "hbox" || i.type == "vbox" || !i.getInputElement())) if (i.requiredContent &&
                            !this._.editor.activeFilter.check(i.requiredContent)) i.disable(); else { i.enable(); e++ }
                        } !e || f && !this._.editor.activeFilter.check(f) ? g[0].addClass("cke_dialog_tab_disabled") : g[0].removeClass("cke_dialog_tab_disabled")
                    }
                } CKEDITOR.tools.setTimeout(function () {
                    this.layout(); h(this); this.parts.dialog.setStyle("visibility", ""); this.fireOnce("load", {}); CKEDITOR.ui.fire("ready", this); this.fire("show", {}); this._.editor.fire("dialogShow", this); this._.parentDialog || this._.editor.focusManager.lock(); this.foreach(function (a) {
                        a.setInitValue &&
                        a.setInitValue()
                    })
                }, 100, this)
            }, layout: function () { var a = this.parts.dialog, b = this.getSize(), c = CKEDITOR.document.getWindow().getViewPaneSize(), d = (c.width - b.width) / 2, g = (c.height - b.height) / 2; CKEDITOR.env.ie6Compat || (b.height + (g > 0 ? g : 0) > c.height || b.width + (d > 0 ? d : 0) > c.width ? a.setStyle("position", "absolute") : a.setStyle("position", "fixed")); this.move(this._.moved ? this._.position.x : d, this._.moved ? this._.position.y : g) }, foreach: function (a) {
                for (var b in this._.contents) for (var c in this._.contents[b]) a.call(this,
                this._.contents[b][c]); return this
            }, reset: function () { var a = function (a) { a.reset && a.reset(1) }; return function () { this.foreach(a); return this } }(), setupContent: function () { var a = arguments; this.foreach(function (b) { b.setup && b.setup.apply(b, a) }) }, commitContent: function () { var a = arguments; this.foreach(function (b) { CKEDITOR.env.ie && this._.currentFocusIndex == b.focusIndex && b.getInputElement().$.blur(); b.commit && b.commit.apply(b, a) }) }, hide: function () {
                if (this.parts.dialog.isVisible()) {
                    this.fire("hide", {}); this._.editor.fire("dialogHide",
                    this); this.selectPage(this._.tabIdList[0]); var a = this._.element; a.setStyle("display", "none"); this.parts.dialog.setStyle("visibility", "hidden"); for (F(this) ; CKEDITOR.dialog._.currentTop != this;) CKEDITOR.dialog._.currentTop.hide(); if (this._.parentDialog) { var b = this._.parentDialog.getElement().getFirst(); b.setStyle("z-index", parseInt(b.$.style.zIndex, 10) + Math.floor(this._.editor.config.baseFloatZIndex / 2)) } else q(this._.editor); if (CKEDITOR.dialog._.currentTop = this._.parentDialog) CKEDITOR.dialog._.currentZIndex =
                    CKEDITOR.dialog._.currentZIndex - 10; else { CKEDITOR.dialog._.currentZIndex = null; a.removeListener("keydown", t); a.removeListener(CKEDITOR.env.opera ? "keypress" : "keyup", z); var c = this._.editor; c.focus(); setTimeout(function () { c.focusManager.unlock() }, 0) } delete this._.parentDialog; this.foreach(function (a) { a.resetInitValue && a.resetInitValue() })
                }
            }, addPage: function (a) {
                if (!a.requiredContent || this._.editor.filter.check(a.requiredContent)) {
                    for (var b = [], c = a.label ? ' title="' + CKEDITOR.tools.htmlEncode(a.label) + '"' :
                    "", d = CKEDITOR.dialog._.uiElementBuilders.vbox.build(this, { type: "vbox", className: "cke_dialog_page_contents", children: a.elements, expand: !!a.expand, padding: a.padding, style: a.style || "width: 100%;" }, b), g = this._.contents[a.id] = {}, f = d.getChild(), e = 0; d = f.shift() ;) { !d.notAllowed && (d.type != "hbox" && d.type != "vbox") && e++; g[d.id] = d; typeof d.getChild == "function" && f.push.apply(f, d.getChild()) } if (!e) a.hidden = true; b = CKEDITOR.dom.element.createFromHtml(b.join("")); b.setAttribute("role", "tabpanel"); d = CKEDITOR.env; g =
                    "cke_" + a.id + "_" + CKEDITOR.tools.getNextNumber(); c = CKEDITOR.dom.element.createFromHtml(['<a class="cke_dialog_tab"', this._.pageCount > 0 ? " cke_last" : "cke_first", c, a.hidden ? ' style="display:none"' : "", ' id="', g, '"', d.gecko && d.version >= 10900 && !d.hc ? "" : ' href="javascript:void(0)"', ' tabIndex="-1" hidefocus="true" role="tab">', a.label, "</a>"].join("")); b.setAttribute("aria-labelledby", g); this._.tabs[a.id] = [c, b]; this._.tabIdList.push(a.id); !a.hidden && this._.pageCount++; this._.lastTab = c; this.updateStyle(); b.setAttribute("name",
                    a.id); b.appendTo(this.parts.contents); c.unselectable(); this.parts.tabs.append(c); if (a.accessKey) { B(this, this, "CTRL+" + a.accessKey, D, C); this._.accessKeyMap["CTRL+" + a.accessKey] = a.id }
                }
            }, selectPage: function (a) {
                if (this._.currentTabId != a && !this._.tabs[a][0].hasClass("cke_dialog_tab_disabled") && this.fire("selectPage", { page: a, currentPage: this._.currentTabId }) !== true) {
                    for (var b in this._.tabs) {
                        var d = this._.tabs[b][0], g = this._.tabs[b][1]; if (b != a) { d.removeClass("cke_dialog_tab_selected"); g.hide() } g.setAttribute("aria-hidden",
                        b != a)
                    } var f = this._.tabs[a]; f[0].addClass("cke_dialog_tab_selected"); if (CKEDITOR.env.ie6Compat || CKEDITOR.env.ie7Compat) { c(f[1]); f[1].show(); setTimeout(function () { c(f[1], 1) }, 0) } else f[1].show(); this._.currentTabId = a; this._.currentTabIndex = CKEDITOR.tools.indexOf(this._.tabIdList, a)
                }
            }, updateStyle: function () { this.parts.dialog[(this._.pageCount === 1 ? "add" : "remove") + "Class"]("cke_single_page") }, hidePage: function (a) {
                var b = this._.tabs[a] && this._.tabs[a][0]; if (b && this._.pageCount != 1 && b.isVisible()) {
                    a == this._.currentTabId &&
                    this.selectPage(d.call(this)); b.hide(); this._.pageCount--; this.updateStyle()
                }
            }, showPage: function (a) { if (a = this._.tabs[a] && this._.tabs[a][0]) { a.show(); this._.pageCount++; this.updateStyle() } }, getElement: function () { return this._.element }, getName: function () { return this._.name }, getContentElement: function (a, b) { var c = this._.contents[a]; return c && c[b] }, getValueOf: function (a, b) { return this.getContentElement(a, b).getValue() }, setValueOf: function (a, b, c) { return this.getContentElement(a, b).setValue(c) }, getButton: function (a) { return this._.buttons[a] },
            click: function (a) { return this._.buttons[a].click() }, disableButton: function (a) { return this._.buttons[a].disable() }, enableButton: function (a) { return this._.buttons[a].enable() }, getPageCount: function () { return this._.pageCount }, getParentEditor: function () { return this._.editor }, getSelectedElement: function () { return this.getParentEditor().getSelection().getSelectedElement() }, addFocusable: function (a, b) {
                if (typeof b == "undefined") { b = this._.focusList.length; this._.focusList.push(new g(this, a, b)) } else {
                    this._.focusList.splice(b,
                    0, new g(this, a, b)); for (var c = b + 1; c < this._.focusList.length; c++) this._.focusList[c].focusIndex++
                }
            }
        }; CKEDITOR.tools.extend(CKEDITOR.dialog, {
            add: function (a, b) { if (!this._.dialogDefinitions[a] || typeof b == "function") this._.dialogDefinitions[a] = b }, exists: function (a) { return !!this._.dialogDefinitions[a] }, getCurrent: function () { return CKEDITOR.dialog._.currentTop }, isTabEnabled: function (a, b, c) { a = a.config.removeDialogTabs; return !(a && a.match(RegExp("(?:^|;)" + b + ":" + c + "(?:$|;)", "i"))) }, okButton: function () {
                var a =
                function (a, b) { b = b || {}; return CKEDITOR.tools.extend({ id: "ok", type: "button", label: a.lang.common.ok, "class": "cke_dialog_ui_button_ok", onClick: function (a) { a = a.data.dialog; a.fire("ok", { hide: true }).hide !== false && a.hide() } }, b, true) }; a.type = "button"; a.override = function (b) { return CKEDITOR.tools.extend(function (c) { return a(c, b) }, { type: "button" }, true) }; return a
            }(), cancelButton: function () {
                var a = function (a, b) {
                    b = b || {}; return CKEDITOR.tools.extend({
                        id: "cancel", type: "button", label: a.lang.common.cancel, "class": "cke_dialog_ui_button_cancel",
                        onClick: function (a) { a = a.data.dialog; a.fire("cancel", { hide: true }).hide !== false && a.hide() }
                    }, b, true)
                }; a.type = "button"; a.override = function (b) { return CKEDITOR.tools.extend(function (c) { return a(c, b) }, { type: "button" }, true) }; return a
            }(), addUIElement: function (a, b) { this._.uiElementBuilders[a] = b }
        }); CKEDITOR.dialog._ = { uiElementBuilders: {}, dialogDefinitions: {}, currentTop: null, currentZIndex: null }; CKEDITOR.event.implementOn(CKEDITOR.dialog); CKEDITOR.event.implementOn(CKEDITOR.dialog.prototype); var r = {
            resizable: CKEDITOR.DIALOG_RESIZE_BOTH,
            minWidth: 600, minHeight: 400, buttons: [CKEDITOR.dialog.okButton, CKEDITOR.dialog.cancelButton]
        }, p = function (a, b, c) { for (var d = 0, g; g = a[d]; d++) { if (g.id == b) return g; if (c && g[c]) if (g = p(g[c], b, c)) return g } return null }, w = function (a, b, c, d, g) { if (c) { for (var f = 0, e; e = a[f]; f++) { if (e.id == c) { a.splice(f, 0, b); return b } if (d && e[d]) if (e = w(e[d], b, c, d, true)) return e } if (g) return null } a.push(b); return b }, y = function (a, b, c) { for (var d = 0, g; g = a[d]; d++) { if (g.id == b) return a.splice(d, 1); if (c && g[c]) if (g = y(g[c], b, c)) return g } return null },
        A = function (a, b) { this.dialog = a; for (var c = b.contents, d = 0, g; g = c[d]; d++) c[d] = g && new f(a, g); CKEDITOR.tools.extend(this, b) }; A.prototype = { getContents: function (a) { return p(this.contents, a) }, getButton: function (a) { return p(this.buttons, a) }, addContents: function (a, b) { return w(this.contents, a, b) }, addButton: function (a, b) { return w(this.buttons, a, b) }, removeContents: function (a) { y(this.contents, a) }, removeButton: function (a) { y(this.buttons, a) } }; f.prototype = {
            get: function (a) { return p(this.elements, a, "children") }, add: function (a,
            b) { return w(this.elements, a, b, "children") }, remove: function (a) { y(this.elements, a, "children") }
        }; var v, u = {}, s, x = {}, t = function (a) { var b = a.data.$.ctrlKey || a.data.$.metaKey, c = a.data.$.altKey, d = a.data.$.shiftKey, g = String.fromCharCode(a.data.$.keyCode); if ((b = x[(b ? "CTRL+" : "") + (c ? "ALT+" : "") + (d ? "SHIFT+" : "") + g]) && b.length) { b = b[b.length - 1]; b.keydown && b.keydown.call(b.uiElement, b.dialog, b.key); a.data.preventDefault() } }, z = function (a) {
            var b = a.data.$.ctrlKey || a.data.$.metaKey, c = a.data.$.altKey, d = a.data.$.shiftKey,
            g = String.fromCharCode(a.data.$.keyCode); if ((b = x[(b ? "CTRL+" : "") + (c ? "ALT+" : "") + (d ? "SHIFT+" : "") + g]) && b.length) { b = b[b.length - 1]; if (b.keyup) { b.keyup.call(b.uiElement, b.dialog, b.key); a.data.preventDefault() } }
        }, B = function (a, b, c, d, g) { (x[c] || (x[c] = [])).push({ uiElement: a, dialog: b, key: c, keyup: g || a.accessKeyUp, keydown: d || a.accessKeyDown }) }, F = function (a) { for (var b in x) { for (var c = x[b], d = c.length - 1; d >= 0; d--) (c[d].dialog == a || c[d].uiElement == a) && c.splice(d, 1); c.length === 0 && delete x[b] } }, C = function (a, b) {
            a._.accessKeyMap[b] &&
            a.selectPage(a._.accessKeyMap[b])
        }, D = function () { }; (function () {
            CKEDITOR.ui.dialog = {
                uiElement: function (a, b, c, d, g, f, e) {
                    if (!(arguments.length < 4)) {
                        var h = (d.call ? d(b) : d) || "div", j = ["<", h, " "], i = (g && g.call ? g(b) : g) || {}, l = (f && f.call ? f(b) : f) || {}, k = (e && e.call ? e.call(this, a, b) : e) || "", n = this.domId = l.id || CKEDITOR.tools.getNextId() + "_uiElement"; this.id = b.id; if (b.requiredContent && !a.getParentEditor().filter.check(b.requiredContent)) { i.display = "none"; this.notAllowed = true } l.id = n; var p = {}; b.type && (p["cke_dialog_ui_" +
                        b.type] = 1); b.className && (p[b.className] = 1); b.disabled && (p.cke_disabled = 1); for (var m = l["class"] && l["class"].split ? l["class"].split(" ") : [], n = 0; n < m.length; n++) m[n] && (p[m[n]] = 1); m = []; for (n in p) m.push(n); l["class"] = m.join(" "); if (b.title) l.title = b.title; p = (b.style || "").split(";"); if (b.align) { m = b.align; i["margin-left"] = m == "left" ? 0 : "auto"; i["margin-right"] = m == "right" ? 0 : "auto" } for (n in i) p.push(n + ":" + i[n]); b.hidden && p.push("display:none"); for (n = p.length - 1; n >= 0; n--) p[n] === "" && p.splice(n, 1); if (p.length > 0) l.style =
                        (l.style ? l.style + "; " : "") + p.join("; "); for (n in l) j.push(n + '="' + CKEDITOR.tools.htmlEncode(l[n]) + '" '); j.push(">", k, "</", h, ">"); c.push(j.join("")); (this._ || (this._ = {})).dialog = a; if (typeof b.isChanged == "boolean") this.isChanged = function () { return b.isChanged }; if (typeof b.isChanged == "function") this.isChanged = b.isChanged; if (typeof b.setValue == "function") this.setValue = CKEDITOR.tools.override(this.setValue, function (a) { return function (c) { a.call(this, b.setValue.call(this, c)) } }); if (typeof b.getValue == "function") this.getValue =
                        CKEDITOR.tools.override(this.getValue, function (a) { return function () { return b.getValue.call(this, a.call(this)) } }); CKEDITOR.event.implementOn(this); this.registerEvents(b); this.accessKeyUp && (this.accessKeyDown && b.accessKey) && B(this, a, "CTRL+" + b.accessKey); var r = this; a.on("load", function () {
                            var b = r.getInputElement(); if (b) {
                                var c = r.type in { checkbox: 1, ratio: 1 } && CKEDITOR.env.ie && CKEDITOR.env.version < 8 ? "cke_dialog_ui_focused" : ""; b.on("focus", function () {
                                    a._.tabBarMode = false; a._.hasFocus = true; r.fire("focus");
                                    c && this.addClass(c)
                                }); b.on("blur", function () { r.fire("blur"); c && this.removeClass(c) })
                            }
                        }); CKEDITOR.tools.extend(this, b); if (this.keyboardFocusable) { this.tabIndex = b.tabIndex || 0; this.focusIndex = a._.focusList.push(this) - 1; this.on("focus", function () { a._.currentFocusIndex = r.focusIndex }) }
                    }
                }, hbox: function (a, b, c, d, g) {
                    if (!(arguments.length < 4)) {
                        this._ || (this._ = {}); var f = this._.children = b, e = g && g.widths || null, h = g && g.height || null, i, j = { role: "presentation" }; g && g.align && (j.align = g.align); CKEDITOR.ui.dialog.uiElement.call(this,
                        a, g || { type: "hbox" }, d, "table", {}, j, function () {
                            var a = ['<tbody><tr class="cke_dialog_ui_hbox">']; for (i = 0; i < c.length; i++) {
                                var b = "cke_dialog_ui_hbox_child", d = []; i === 0 && (b = "cke_dialog_ui_hbox_first"); i == c.length - 1 && (b = "cke_dialog_ui_hbox_last"); a.push('<td class="', b, '" role="presentation" '); e ? e[i] && d.push("width:" + l(e[i])) : d.push("width:" + Math.floor(100 / c.length) + "%"); h && d.push("height:" + l(h)); g && g.padding != void 0 && d.push("padding:" + l(g.padding)); CKEDITOR.env.ie && (CKEDITOR.env.quirks && f[i].align) && d.push("text-align:" +
                                f[i].align); d.length > 0 && a.push('style="' + d.join("; ") + '" '); a.push(">", c[i], "</td>")
                            } a.push("</tr></tbody>"); return a.join("")
                        })
                    }
                }, vbox: function (a, b, c, d, g) {
                    if (!(arguments.length < 3)) {
                        this._ || (this._ = {}); var f = this._.children = b, e = g && g.width || null, h = g && g.heights || null; CKEDITOR.ui.dialog.uiElement.call(this, a, g || { type: "vbox" }, d, "div", null, { role: "presentation" }, function () {
                            var b = ['<table role="presentation" cellspacing="0" border="0" ']; b.push('style="'); g && g.expand && b.push("height:100%;"); b.push("width:" +
                            l(e || "100%"), ";"); CKEDITOR.env.webkit && b.push("float:none;"); b.push('"'); b.push('align="', CKEDITOR.tools.htmlEncode(g && g.align || (a.getParentEditor().lang.dir == "ltr" ? "left" : "right")), '" '); b.push("><tbody>"); for (var d = 0; d < c.length; d++) {
                                var i = []; b.push('<tr><td role="presentation" '); e && i.push("width:" + l(e || "100%")); h ? i.push("height:" + l(h[d])) : g && g.expand && i.push("height:" + Math.floor(100 / c.length) + "%"); g && g.padding != void 0 && i.push("padding:" + l(g.padding)); CKEDITOR.env.ie && (CKEDITOR.env.quirks && f[d].align) &&
                                i.push("text-align:" + f[d].align); i.length > 0 && b.push('style="', i.join("; "), '" '); b.push(' class="cke_dialog_ui_vbox_child">', c[d], "</td></tr>")
                            } b.push("</tbody></table>"); return b.join("")
                        })
                    }
                }
            }
        })(); CKEDITOR.ui.dialog.uiElement.prototype = {
            getElement: function () { return CKEDITOR.document.getById(this.domId) }, getInputElement: function () { return this.getElement() }, getDialog: function () { return this._.dialog }, setValue: function (a, b) { this.getInputElement().setValue(a); !b && this.fire("change", { value: a }); return this },
            getValue: function () { return this.getInputElement().getValue() }, isChanged: function () { return false }, selectParentTab: function () { for (var a = this.getInputElement() ; (a = a.getParent()) && a.$.className.search("cke_dialog_page_contents") == -1;); if (!a) return this; a = a.getAttribute("name"); this._.dialog._.currentTabId != a && this._.dialog.selectPage(a); return this }, focus: function () { this.selectParentTab().getInputElement().focus(); return this }, registerEvents: function (a) {
                var b = /^on([A-Z]\w+)/, c, d = function (a, b, c, d) {
                    b.on("load",
                    function () { a.getInputElement().on(c, d, a) })
                }, g; for (g in a) if (c = g.match(b)) this.eventProcessors[g] ? this.eventProcessors[g].call(this, this._.dialog, a[g]) : d(this, this._.dialog, c[1].toLowerCase(), a[g]); return this
            }, eventProcessors: { onLoad: function (a, b) { a.on("load", b, this) }, onShow: function (a, b) { a.on("show", b, this) }, onHide: function (a, b) { a.on("hide", b, this) } }, accessKeyDown: function () { this.focus() }, accessKeyUp: function () { }, disable: function () {
                var a = this.getElement(); this.getInputElement().setAttribute("disabled",
                "true"); a.addClass("cke_disabled")
            }, enable: function () { var a = this.getElement(); this.getInputElement().removeAttribute("disabled"); a.removeClass("cke_disabled") }, isEnabled: function () { return !this.getElement().hasClass("cke_disabled") }, isVisible: function () { return this.getInputElement().isVisible() }, isFocusable: function () { return !this.isEnabled() || !this.isVisible() ? false : true }
        }; CKEDITOR.ui.dialog.hbox.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement, {
            getChild: function (a) {
                if (arguments.length <
                1) return this._.children.concat(); a.splice || (a = [a]); return a.length < 2 ? this._.children[a[0]] : this._.children[a[0]] && this._.children[a[0]].getChild ? this._.children[a[0]].getChild(a.slice(1, a.length)) : null
            }
        }, true); CKEDITOR.ui.dialog.vbox.prototype = new CKEDITOR.ui.dialog.hbox; (function () {
            var a = {
                build: function (a, b, c) {
                    for (var d = b.children, g, f = [], e = [], h = 0; h < d.length && (g = d[h]) ; h++) { var i = []; f.push(i); e.push(CKEDITOR.dialog._.uiElementBuilders[g.type].build(a, g, i)) } return new CKEDITOR.ui.dialog[b.type](a,
                    e, f, c, b)
                }
            }; CKEDITOR.dialog.addUIElement("hbox", a); CKEDITOR.dialog.addUIElement("vbox", a)
        })(); CKEDITOR.dialogCommand = function (a, b) { this.dialogName = a; CKEDITOR.tools.extend(this, b, true) }; CKEDITOR.dialogCommand.prototype = { exec: function (a) { CKEDITOR.env.opera ? CKEDITOR.tools.setTimeout(function () { a.openDialog(this.dialogName) }, 0, this) : a.openDialog(this.dialogName) }, canUndo: false, editorFocus: 1 }; (function () {
            var a = /^([a]|[^a])+$/, b = /^\d*$/, c = /^\d*(?:\.\d+)?$/, d = /^(((\d*(\.\d+))|(\d*))(px|\%)?)?$/, g = /^(((\d*(\.\d+))|(\d*))(px|em|ex|in|cm|mm|pt|pc|\%)?)?$/i,
            f = /^(\s*[\w-]+\s*:\s*[^:;]+(?:;|$))*$/; CKEDITOR.VALIDATE_OR = 1; CKEDITOR.VALIDATE_AND = 2; CKEDITOR.dialog.validate = {
                functions: function () {
                    var a = arguments; return function () {
                        var b = this && this.getValue ? this.getValue() : a[0], c = void 0, d = CKEDITOR.VALIDATE_AND, g = [], f; for (f = 0; f < a.length; f++) if (typeof a[f] == "function") g.push(a[f]); else break; if (f < a.length && typeof a[f] == "string") { c = a[f]; f++ } f < a.length && typeof a[f] == "number" && (d = a[f]); var e = d == CKEDITOR.VALIDATE_AND ? true : false; for (f = 0; f < g.length; f++) e = d == CKEDITOR.VALIDATE_AND ?
                        e && g[f](b) : e || g[f](b); return !e ? c : true
                    }
                }, regex: function (a, b) { return function (c) { c = this && this.getValue ? this.getValue() : c; return !a.test(c) ? b : true } }, notEmpty: function (b) { return this.regex(a, b) }, integer: function (a) { return this.regex(b, a) }, number: function (a) { return this.regex(c, a) }, cssLength: function (a) { return this.functions(function (a) { return g.test(CKEDITOR.tools.trim(a)) }, a) }, htmlLength: function (a) { return this.functions(function (a) { return d.test(CKEDITOR.tools.trim(a)) }, a) }, inlineStyle: function (a) {
                    return this.functions(function (a) { return f.test(CKEDITOR.tools.trim(a)) },
                    a)
                }, equals: function (a, b) { return this.functions(function (b) { return b == a }, b) }, notEqual: function (a, b) { return this.functions(function (b) { return b != a }, b) }
            }; CKEDITOR.on("instanceDestroyed", function (a) { if (CKEDITOR.tools.isEmpty(CKEDITOR.instances)) { for (var b; b = CKEDITOR.dialog._.currentTop;) b.hide(); for (var c in u) u[c].remove(); u = {} } var a = a.editor._.storedDialogs, d; for (d in a) a[d].destroy() })
        })(); CKEDITOR.tools.extend(CKEDITOR.editor.prototype, {
            openDialog: function (a, b) {
                var c = null, d = CKEDITOR.dialog._.dialogDefinitions[a];
                CKEDITOR.dialog._.currentTop === null && m(this); if (typeof d == "function") { c = this._.storedDialogs || (this._.storedDialogs = {}); c = c[a] || (c[a] = new CKEDITOR.dialog(this, a)); b && b.call(c, c); c.show() } else {
                    if (d == "failed") { q(this); throw Error('[CKEDITOR.dialog.openDialog] Dialog "' + a + '" failed when loading definition.'); } typeof d == "string" && CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(d), function () {
                        typeof CKEDITOR.dialog._.dialogDefinitions[a] != "function" && (CKEDITOR.dialog._.dialogDefinitions[a] = "failed"); this.openDialog(a,
                        b)
                    }, this, 0, 1)
                } CKEDITOR.skin.loadPart("dialog"); return c
            }
        })
    }(), CKEDITOR.plugins.add("dialog", { requires: "dialogui", init: function (d) { d.on("doubleclick", function (e) { e.data.dialog && d.openDialog(e.data.dialog) }, null, null, 999) } }), function () {
        CKEDITOR.plugins.add("a11yhelp", {
            requires: "dialog", availableLangs: {
                ar: 1, bg: 1, ca: 1, cs: 1, cy: 1, da: 1, de: 1, el: 1, en: 1, eo: 1, es: 1, et: 1, fa: 1, fi: 1, fr: 1, "fr-ca": 1, gl: 1, gu: 1, he: 1, hi: 1, hr: 1, hu: 1, id: 1, it: 1, ja: 1, km: 1, ko: 1, ku: 1, lt: 1, lv: 1, mk: 1, mn: 1, nb: 1, nl: 1, no: 1, pl: 1, pt: 1, "pt-br": 1,
                ro: 1, ru: 1, si: 1, sk: 1, sl: 1, sq: 1, sr: 1, "sr-latn": 1, sv: 1, th: 1, tr: 1, ug: 1, uk: 1, vi: 1, zh: 1, "zh-cn": 1
            }, init: function (d) {
                var e = this; d.addCommand("a11yHelp", { exec: function () { var c = d.langCode, c = e.availableLangs[c] ? c : e.availableLangs[c.replace(/-.*/, "")] ? c.replace(/-.*/, "") : "en"; CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(e.path + "dialogs/lang/" + c + ".js"), function () { d.lang.a11yhelp = e.langEntries[c]; d.openDialog("a11yHelp") }) }, modes: { wysiwyg: 1, source: 1 }, readOnly: 1, canUndo: false }); d.setKeystroke(CKEDITOR.ALT + 48, "a11yHelp");
                CKEDITOR.dialog.add("a11yHelp", this.path + "dialogs/a11yhelp.js")
            }
        })
    }(), CKEDITOR.plugins.add("about", { requires: "dialog", init: function (d) { var e = d.addCommand("about", new CKEDITOR.dialogCommand("about")); e.modes = { wysiwyg: 1, source: 1 }; e.canUndo = false; e.readOnly = 1; d.ui.addButton && d.ui.addButton("About", { label: d.lang.about.title, command: "about", toolbar: "about" }); CKEDITOR.dialog.add("about", this.path + "dialogs/about.js") } }), CKEDITOR.plugins.add("basicstyles", {
        init: function (d) {
            var e = 0, c = function (b, c, f, i) {
                if (i) {
                    var i =
                    new CKEDITOR.style(i), j = a[f]; j.unshift(i); d.attachStyleStateChange(i, function (a) { !d.readOnly && d.getCommand(f).setState(a) }); d.addCommand(f, new CKEDITOR.styleCommand(i, { contentForms: j })); d.ui.addButton && d.ui.addButton(b, { label: c, command: f, toolbar: "basicstyles," + (e = e + 10) })
                }
            }, a = {
                bold: ["strong", "b", ["span", function (a) { a = a.styles["font-weight"]; return a == "bold" || +a >= 700 }]], italic: ["em", "i", ["span", function (a) { return a.styles["font-style"] == "italic" }]], underline: ["u", ["span", function (a) {
                    return a.styles["text-decoration"] ==
                    "underline"
                }]], strike: ["s", "strike", ["span", function (a) { return a.styles["text-decoration"] == "line-through" }]], subscript: ["sub"], superscript: ["sup"]
            }, b = d.config, j = d.lang.basicstyles; c("Bold", j.bold, "bold", b.coreStyles_bold); c("Italic", j.italic, "italic", b.coreStyles_italic); c("Underline", j.underline, "underline", b.coreStyles_underline); c("Strike", j.strike, "strike", b.coreStyles_strike); c("Subscript", j.subscript, "subscript", b.coreStyles_subscript); c("Superscript", j.superscript, "superscript", b.coreStyles_superscript);
            d.setKeystroke([[CKEDITOR.CTRL + 66, "bold"], [CKEDITOR.CTRL + 73, "italic"], [CKEDITOR.CTRL + 85, "underline"]])
        }
    }), CKEDITOR.config.coreStyles_bold = { element: "strong", overrides: "b" }, CKEDITOR.config.coreStyles_italic = { element: "em", overrides: "i" }, CKEDITOR.config.coreStyles_underline = { element: "u" }, CKEDITOR.config.coreStyles_strike = { element: "s", overrides: "strike" }, CKEDITOR.config.coreStyles_subscript = { element: "sub" }, CKEDITOR.config.coreStyles_superscript = { element: "sup" }, function () {
        var d = {
            exec: function (d) {
                var c =
                d.getCommand("blockquote").state, a = d.getSelection(), b = a && a.getRanges()[0]; if (b) {
                    var j = a.createBookmarks(); if (CKEDITOR.env.ie) { var g = j[0].startNode, h = j[0].endNode, f; if (g && g.getParent().getName() == "blockquote") for (f = g; f = f.getNext() ;) if (f.type == CKEDITOR.NODE_ELEMENT && f.isBlockBoundary()) { g.move(f, true); break } if (h && h.getParent().getName() == "blockquote") for (f = h; f = f.getPrevious() ;) if (f.type == CKEDITOR.NODE_ELEMENT && f.isBlockBoundary()) { h.move(f); break } } var i = b.createIterator(); i.enlargeBr = d.config.enterMode !=
                    CKEDITOR.ENTER_BR; if (c == CKEDITOR.TRISTATE_OFF) {
                        for (g = []; c = i.getNextParagraph() ;) g.push(c); if (g.length < 1) { c = d.document.createElement(d.config.enterMode == CKEDITOR.ENTER_P ? "p" : "div"); h = j.shift(); b.insertNode(c); c.append(new CKEDITOR.dom.text("﻿", d.document)); b.moveToBookmark(h); b.selectNodeContents(c); b.collapse(true); h = b.createBookmark(); g.push(c); j.unshift(h) } f = g[0].getParent(); b = []; for (h = 0; h < g.length; h++) { c = g[h]; f = f.getCommonAncestor(c.getParent()) } for (c = { table: 1, tbody: 1, tr: 1, ol: 1, ul: 1 }; c[f.getName()];) f =
                        f.getParent(); for (h = null; g.length > 0;) { for (c = g.shift() ; !c.getParent().equals(f) ;) c = c.getParent(); c.equals(h) || b.push(c); h = c } for (; b.length > 0;) { c = b.shift(); if (c.getName() == "blockquote") { for (h = new CKEDITOR.dom.documentFragment(d.document) ; c.getFirst() ;) { h.append(c.getFirst().remove()); g.push(h.getLast()) } h.replace(c) } else g.push(c) } b = d.document.createElement("blockquote"); for (b.insertBefore(g[0]) ; g.length > 0;) { c = g.shift(); b.append(c) }
                    } else if (c == CKEDITOR.TRISTATE_ON) {
                        h = []; for (f = {}; c = i.getNextParagraph() ;) {
                            for (g =
                            b = null; c.getParent() ;) { if (c.getParent().getName() == "blockquote") { b = c.getParent(); g = c; break } c = c.getParent() } if (b && g && !g.getCustomData("blockquote_moveout")) { h.push(g); CKEDITOR.dom.element.setMarker(f, g, "blockquote_moveout", true) }
                        } CKEDITOR.dom.element.clearAllMarkers(f); c = []; g = []; for (f = {}; h.length > 0;) {
                            i = h.shift(); b = i.getParent(); if (i.getPrevious()) if (i.getNext()) { i.breakParent(i.getParent()); g.push(i.getNext()) } else i.remove().insertAfter(b); else i.remove().insertBefore(b); if (!b.getCustomData("blockquote_processed")) {
                                g.push(b);
                                CKEDITOR.dom.element.setMarker(f, b, "blockquote_processed", true)
                            } c.push(i)
                        } CKEDITOR.dom.element.clearAllMarkers(f); for (h = g.length - 1; h >= 0; h--) { b = g[h]; a: { f = b; for (var i = 0, k = f.getChildCount(), o = void 0; i < k && (o = f.getChild(i)) ; i++) if (o.type == CKEDITOR.NODE_ELEMENT && o.isBlockBoundary()) { f = false; break a } f = true } f && b.remove() } if (d.config.enterMode == CKEDITOR.ENTER_BR) for (b = true; c.length;) {
                            i = c.shift(); if (i.getName() == "div") {
                                h = new CKEDITOR.dom.documentFragment(d.document); b && (i.getPrevious() && !(i.getPrevious().type ==
                                CKEDITOR.NODE_ELEMENT && i.getPrevious().isBlockBoundary())) && h.append(d.document.createElement("br")); for (b = i.getNext() && !(i.getNext().type == CKEDITOR.NODE_ELEMENT && i.getNext().isBlockBoundary()) ; i.getFirst() ;) i.getFirst().remove().appendTo(h); b && h.append(d.document.createElement("br")); h.replace(i); b = false
                            }
                        }
                    } a.selectBookmarks(j); d.focus()
                }
            }, refresh: function (d, c) { this.setState(d.elementPath(c.block || c.blockLimit).contains("blockquote", 1) ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF) }, context: "blockquote",
            allowedContent: "blockquote", requiredContent: "blockquote"
        }; CKEDITOR.plugins.add("blockquote", { init: function (e) { if (!e.blockless) { e.addCommand("blockquote", d); e.ui.addButton && e.ui.addButton("Blockquote", { label: e.lang.blockquote.toolbar, command: "blockquote", toolbar: "blocks,10" }) } } })
    }(), "use strict", function () {
        function d(a) {
            function b() {
                var c = a.editable(); c.on(x, function (a) { (!CKEDITOR.env.ie || !v) && w(a) }); CKEDITOR.env.ie && c.on("paste", function (b) { if (!u) { e(); b.data.preventDefault(); w(b); m("paste") || a.openDialog("paste") } });
                if (CKEDITOR.env.ie) { c.on("contextmenu", j, null, null, 0); c.on("beforepaste", function (a) { a.data && !a.data.$.ctrlKey && j() }, null, null, 0) } c.on("beforecut", function () { !v && l(a) }); var d; c.attachListener(CKEDITOR.env.ie ? c : a.document.getDocumentElement(), "mouseup", function () { d = setTimeout(function () { y() }, 0) }); a.on("destroy", function () { clearTimeout(d) }); c.on("keyup", y)
            } function c(b) {
                return {
                    type: b, canUndo: b == "cut", startDisabled: true, exec: function () {
                        this.type == "cut" && l(); var b; var c = this.type; if (CKEDITOR.env.ie) b =
                        m(c); else try { b = a.document.$.execCommand(c, false, null) } catch (d) { b = false } b || alert(a.lang.clipboard[this.type + "Error"]); return b
                    }
                }
            } function d() { return { canUndo: false, async: true, exec: function (a, b) { var c = function (b, c) { b && q(b.type, b.dataValue, !!c); a.fire("afterCommandExec", { name: "paste", command: d, returnValue: !!b }) }, d = this; typeof b == "string" ? c({ type: "auto", dataValue: b }, 1) : a.getClipboardData(c) } } } function e() { u = 1; setTimeout(function () { u = 0 }, 100) } function j() { v = 1; setTimeout(function () { v = 0 }, 10) } function m(b) {
                var c =
                a.document, d = c.getBody(), f = false, e = function () { f = true }; d.on(b, e); (CKEDITOR.env.version > 7 ? c.$ : c.$.selection.createRange()).execCommand(b); d.removeListener(b, e); return f
            } function q(b, c, d) { b = { type: b }; if (d && !a.fire("beforePaste", b) || !c) return false; b.dataValue = c; return a.fire("paste", b) } function l() {
                if (CKEDITOR.env.ie && !CKEDITOR.env.quirks) {
                    var b = a.getSelection(), c, d, f; if (b.getType() == CKEDITOR.SELECTION_ELEMENT && (c = b.getSelectedElement())) {
                        d = b.getRanges()[0]; f = a.document.createText(""); f.insertBefore(c);
                        d.setStartBefore(f); d.setEndAfter(c); b.selectRanges([d]); setTimeout(function () { if (c.getParent()) { f.remove(); b.selectElement(c) } }, 0)
                    }
                }
            } function n(b, c) {
                var d = a.document, f = a.editable(), e = function (a) { a.cancel() }, h = CKEDITOR.env.gecko && CKEDITOR.env.version <= 10902, i; if (!d.getById("cke_pastebin")) {
                    var j = a.getSelection(), l = j.createBookmarks(), k = new CKEDITOR.dom.element((CKEDITOR.env.webkit || f.is("body")) && !CKEDITOR.env.ie && !CKEDITOR.env.opera ? "body" : "div", d); k.setAttributes({ id: "cke_pastebin", "data-cke-temp": "1" });
                    CKEDITOR.env.opera && k.appendBogus(); var n = 0, d = d.getWindow(); if (h) { k.insertAfter(l[0].startNode); k.setStyle("display", "inline") } else {
                        if (CKEDITOR.env.webkit) { f.append(k); k.addClass("cke_editable"); if (!f.is("body")) { h = f.getComputedStyle("position") != "static" ? f : CKEDITOR.dom.element.get(f.$.offsetParent); n = h.getDocumentPosition().y } } else f.getAscendant(CKEDITOR.env.ie || CKEDITOR.env.opera ? "body" : "html", 1).append(k); k.setStyles({
                            position: "absolute", top: d.getScrollPosition().y - n + 10 + "px", width: "1px", height: Math.max(1,
                            d.getViewPaneSize().height - 20) + "px", overflow: "hidden", margin: 0, padding: 0
                        })
                    } if (h = k.getParent().isReadOnly()) { k.setOpacity(0); k.setAttribute("contenteditable", true) } else k.setStyle(a.config.contentsLangDirection == "ltr" ? "left" : "right", "-1000px"); a.on("selectionChange", e, null, null, 0); if (CKEDITOR.env.webkit || CKEDITOR.env.gecko) i = f.once("blur", e, null, null, -100); h && k.focus(); h = new CKEDITOR.dom.range(k); h.selectNodeContents(k); var p = h.select(); CKEDITOR.env.ie && (i = f.once("blur", function () { a.lockSelection(p) }));
                    var m = CKEDITOR.document.getWindow().getScrollPosition().y; setTimeout(function () { if (CKEDITOR.env.webkit || CKEDITOR.env.opera) CKEDITOR.document[CKEDITOR.env.webkit ? "getBody" : "getDocumentElement"]().$.scrollTop = m; i && i.removeListener(); CKEDITOR.env.ie && f.focus(); j.selectBookmarks(l); k.remove(); var b; if (CKEDITOR.env.webkit && (b = k.getFirst()) && b.is && b.hasClass("Apple-style-span")) k = b; a.removeListener("selectionChange", e); c(k.getHtml()) }, 0)
                }
            } function r() {
                if (CKEDITOR.env.ie) {
                    a.focus(); e(); var b = a.focusManager;
                    b.lock(); if (a.editable().fire(x) && !m("paste")) { b.unlock(); return false } b.unlock()
                } else try { if (a.editable().fire(x) && !a.document.$.execCommand("Paste", false, null)) throw 0; } catch (c) { return false } return true
            } function p(b) {
                if (a.mode == "wysiwyg") switch (b.data.keyCode) {
                    case CKEDITOR.CTRL + 86: case CKEDITOR.SHIFT + 45: b = a.editable(); e(); !CKEDITOR.env.ie && b.fire("beforepaste"); (CKEDITOR.env.opera || CKEDITOR.env.gecko && CKEDITOR.env.version < 10900) && b.fire("paste"); break; case CKEDITOR.CTRL + 88: case CKEDITOR.SHIFT +
                    46: a.fire("saveSnapshot"); setTimeout(function () { a.fire("saveSnapshot") }, 50)
                }
            } function w(b) { var c = { type: "auto" }, d = a.fire("beforePaste", c); n(b, function (a) { a = a.replace(/<span[^>]+data-cke-bookmark[^<]*?<\/span>/ig, ""); d && q(c.type, a, 0, 1) }) } function y() { if (a.mode == "wysiwyg") { var b = A("paste"); a.getCommand("cut").setState(A("cut")); a.getCommand("copy").setState(A("copy")); a.getCommand("paste").setState(b); a.fire("pasteState", b) } } function A(b) {
                if (s && b in { paste: 1, cut: 1 }) return CKEDITOR.TRISTATE_DISABLED; if (b ==
                "paste") return CKEDITOR.TRISTATE_OFF; var b = a.getSelection(), c = b.getRanges(); return b.getType() == CKEDITOR.SELECTION_NONE || c.length == 1 && c[0].collapsed ? CKEDITOR.TRISTATE_DISABLED : CKEDITOR.TRISTATE_OFF
            } var v = 0, u = 0, s = 0, x = CKEDITOR.env.ie ? "beforepaste" : "paste"; (function () {
                a.on("key", p); a.on("contentDom", b); a.on("selectionChange", function (a) { s = a.data.selection.getRanges()[0].checkReadOnly(); y() }); a.contextMenu && a.contextMenu.addListener(function (a, b) {
                    s = b.getRanges()[0].checkReadOnly(); return {
                        cut: A("cut"),
                        copy: A("copy"), paste: A("paste")
                    }
                })
            })(); (function () { function b(c, d, f, e, h) { var i = a.lang.clipboard[d]; a.addCommand(d, f); a.ui.addButton && a.ui.addButton(c, { label: i, command: d, toolbar: "clipboard," + e }); a.addMenuItems && a.addMenuItem(d, { label: i, command: d, group: "clipboard", order: h }) } b("Cut", "cut", c("cut"), 10, 1); b("Copy", "copy", c("copy"), 20, 4); b("Paste", "paste", d(), 30, 8) })(); a.getClipboardData = function (b, c) {
                function d(a) { a.removeListener(); a.cancel(); c(a.data) } function f(a) {
                    a.removeListener(); a.cancel(); j = true;
                    c({ type: i, dataValue: a.data })
                } function e() { this.customTitle = b && b.title } var h = false, i = "auto", j = false; if (!c) { c = b; b = null } a.on("paste", d, null, null, 0); a.on("beforePaste", function (a) { a.removeListener(); h = true; i = a.data.type }, null, null, 1E3); if (r() === false) { a.removeListener("paste", d); if (h && a.fire("pasteDialog", e)) { a.on("pasteDialogCommit", f); a.on("dialogHide", function (a) { a.removeListener(); a.data.removeListener("pasteDialogCommit", f); setTimeout(function () { j || c(null) }, 10) }) } else c(null) }
            }
        } function e(a) {
            if (CKEDITOR.env.webkit) {
                if (!a.match(/^[^<]*$/g) &&
                !a.match(/^(<div><br( ?\/)?><\/div>|<div>[^<]*<\/div>)*$/gi)) return "html"
            } else if (CKEDITOR.env.ie) { if (!a.match(/^([^<]|<br( ?\/)?>)*$/gi) && !a.match(/^(<p>([^<]|<br( ?\/)?>)*<\/p>|(\r\n))*$/gi)) return "html" } else if (CKEDITOR.env.gecko || CKEDITOR.env.opera) { if (!a.match(/^([^<]|<br( ?\/)?>)*$/gi)) return "html" } else return "html"; return "htmlifiedtext"
        } function c(a, b) {
            function c(a) { return CKEDITOR.tools.repeat("</p><p>", ~~(a / 2)) + (a % 2 == 1 ? "<br>" : "") } b = b.replace(/\s+/g, " ").replace(/> +</g, "><").replace(/<br ?\/>/gi,
            "<br>"); b = b.replace(/<\/?[A-Z]+>/g, function (a) { return a.toLowerCase() }); if (b.match(/^[^<]$/)) return b; if (CKEDITOR.env.webkit && b.indexOf("<div>") > -1) { b = b.replace(/^(<div>(<br>|)<\/div>)(?!$|(<div>(<br>|)<\/div>))/g, "<br>").replace(/^(<div>(<br>|)<\/div>){2}(?!$)/g, "<div></div>"); b.match(/<div>(<br>|)<\/div>/) && (b = "<p>" + b.replace(/(<div>(<br>|)<\/div>)+/g, function (a) { return c(a.split("</div><div>").length + 1) }) + "</p>"); b = b.replace(/<\/div><div>/g, "<br>"); b = b.replace(/<\/?div>/g, "") } if ((CKEDITOR.env.gecko ||
            CKEDITOR.env.opera) && a.enterMode != CKEDITOR.ENTER_BR) { CKEDITOR.env.gecko && (b = b.replace(/^<br><br>$/, "<br>")); b.indexOf("<br><br>") > -1 && (b = "<p>" + b.replace(/(<br>){2,}/g, function (a) { return c(a.length / 4) }) + "</p>") } return j(a, b)
        } function a() {
            var a = new CKEDITOR.htmlParser.filter, b = { blockquote: 1, dl: 1, fieldset: 1, h1: 1, h2: 1, h3: 1, h4: 1, h5: 1, h6: 1, ol: 1, p: 1, table: 1, ul: 1 }, c = CKEDITOR.tools.extend({ br: 0 }, CKEDITOR.dtd.$inline), d = { p: 1, br: 1, "cke:br": 1 }, e = CKEDITOR.dtd, j = CKEDITOR.tools.extend({
                area: 1, basefont: 1, embed: 1,
                iframe: 1, map: 1, object: 1, param: 1
            }, CKEDITOR.dtd.$nonBodyContent, CKEDITOR.dtd.$cdata), m = function (a) { delete a.name; a.add(new CKEDITOR.htmlParser.text(" ")) }, q = function (a) { for (var b = a, c; (b = b.next) && b.name && b.name.match(/^h\d$/) ;) { c = new CKEDITOR.htmlParser.element("cke:br"); c.isEmpty = true; for (a.add(c) ; c = b.children.shift() ;) a.add(c) } }; a.addRules({
                elements: {
                    h1: q, h2: q, h3: q, h4: q, h5: q, h6: q, img: function (a) {
                        var a = CKEDITOR.tools.trim(a.attributes.alt || ""), b = " "; a && !a.match(/(^http|\.(jpe?g|gif|png))/i) && (b = " [" +
                        a + "] "); return new CKEDITOR.htmlParser.text(b)
                    }, td: m, th: m, $: function (a) { var g = a.name, m; if (j[g]) return false; a.attributes = {}; if (g == "br") return a; if (b[g]) a.name = "p"; else if (c[g]) delete a.name; else if (e[g]) { m = new CKEDITOR.htmlParser.element("cke:br"); m.isEmpty = true; if (CKEDITOR.dtd.$empty[g]) return m; a.add(m, 0); m = m.clone(); m.isEmpty = true; a.add(m); delete a.name } d[a.name] || delete a.name; return a }
                }
            }, { applyToAll: true }); return a
        } function b(a, b, c) {
            var b = new CKEDITOR.htmlParser.fragment.fromHtml(b), d = new CKEDITOR.htmlParser.basicWriter;
            b.writeHtml(d, c); var b = d.getHtml(), b = b.replace(/\s*(<\/?[a-z:]+ ?\/?>)\s*/g, "$1").replace(/(<cke:br \/>){2,}/g, "<cke:br />").replace(/(<cke:br \/>)(<\/?p>|<br \/>)/g, "$2").replace(/(<\/?p>|<br \/>)(<cke:br \/>)/g, "$1").replace(/<(cke:)?br( \/)?>/g, "<br>").replace(/<p><\/p>/g, ""), e = 0, b = b.replace(/<\/?p>/g, function (a) { if (a == "<p>") { if (++e > 1) return "</p><p>" } else if (--e > 0) return "</p><p>"; return a }).replace(/<p><\/p>/g, ""); return j(a, b)
        } function j(a, b) {
            a.enterMode == CKEDITOR.ENTER_BR ? b = b.replace(/(<\/p><p>)+/g,
            function (a) { return CKEDITOR.tools.repeat("<br>", a.length / 7 * 2) }).replace(/<\/?p>/g, "") : a.enterMode == CKEDITOR.ENTER_DIV && (b = b.replace(/<(\/)?p>/g, "<$1div>")); return b
        } CKEDITOR.plugins.add("clipboard", {
            requires: "dialog", init: function (g) {
                var h; d(g); CKEDITOR.dialog.add("paste", CKEDITOR.getUrl(this.path + "dialogs/paste.js")); g.on("paste", function (a) {
                    var b = a.data.dataValue, c = CKEDITOR.dtd.$block; if (b.indexOf("Apple-") > -1) {
                        b = b.replace(/<span class="Apple-converted-space">&nbsp;<\/span>/gi, " "); a.data.type !=
                        "html" && (b = b.replace(/<span class="Apple-tab-span"[^>]*>([^<]*)<\/span>/gi, function (a, b) { return b.replace(/\t/g, "&nbsp;&nbsp; &nbsp;") })); if (b.indexOf('<br class="Apple-interchange-newline">') > -1) { a.data.startsWithEOL = 1; a.data.preSniffing = "html"; b = b.replace(/<br class="Apple-interchange-newline">/, "") } b = b.replace(/(<[^>]+) class="Apple-[^"]*"/gi, "$1")
                    } if (b.match(/^<[^<]+cke_(editable|contents)/i)) {
                        var d, g, e = new CKEDITOR.dom.element("div"); for (e.setHtml(b) ; e.getChildCount() == 1 && (d = e.getFirst()) && d.type ==
                        CKEDITOR.NODE_ELEMENT && (d.hasClass("cke_editable") || d.hasClass("cke_contents")) ;) e = g = d; g && (b = g.getHtml().replace(/<br>$/i, ""))
                    } CKEDITOR.env.ie ? b = b.replace(/^&nbsp;(?: |\r\n)?<(\w+)/g, function (b, d) { if (d.toLowerCase() in c) { a.data.preSniffing = "html"; return "<" + d } return b }) : CKEDITOR.env.webkit ? b = b.replace(/<\/(\w+)><div><br><\/div>$/, function (b, d) { if (d in c) { a.data.endsWithEOL = 1; return "</" + d + ">" } return b }) : CKEDITOR.env.gecko && (b = b.replace(/(\s)<br>$/, "$1")); a.data.dataValue = b
                }, null, null, 3); g.on("paste",
                function (d) { var d = d.data, j = d.type, k = d.dataValue, o, m = g.config.clipboard_defaultContentType || "html"; o = j == "html" || d.preSniffing == "html" ? "html" : e(k); o == "htmlifiedtext" ? k = c(g.config, k) : j == "text" && o == "html" && (k = b(g.config, k, h || (h = a(g)))); d.startsWithEOL && (k = '<br data-cke-eol="1">' + k); d.endsWithEOL && (k = k + '<br data-cke-eol="1">'); j == "auto" && (j = o == "html" || m == "html" ? "html" : "text"); d.type = j; d.dataValue = k; delete d.preSniffing; delete d.startsWithEOL; delete d.endsWithEOL }, null, null, 6); g.on("paste", function (a) {
                    a =
                    a.data; g.insertHtml(a.dataValue, a.type); setTimeout(function () { g.fire("afterPaste") }, 0)
                }, null, null, 1E3); g.on("pasteDialog", function (a) { setTimeout(function () { g.openDialog("paste", a.data) }, 0) })
            }
        })
    }(), function () {
        var d = '<a id="{id}" class="cke_button cke_button__{name} cke_button_{state} {cls}"' + (CKEDITOR.env.gecko && CKEDITOR.env.version >= 10900 && !CKEDITOR.env.hc ? "" : " href=\"javascript:void('{titleJs}')\"") + ' title="{title}" tabindex="-1" hidefocus="true" role="button" aria-labelledby="{id}_label" aria-haspopup="{hasArrow}" aria-disabled="{ariaDisabled}"';
        if (CKEDITOR.env.opera || CKEDITOR.env.gecko && CKEDITOR.env.mac) d = d + ' onkeypress="return false;"'; CKEDITOR.env.gecko && (d = d + ' onblur="this.style.cssText = this.style.cssText;"'); var d = d + (' onkeydown="return CKEDITOR.tools.callFunction({keydownFn},event);" onfocus="return CKEDITOR.tools.callFunction({focusFn},event);"  onmousedown="return CKEDITOR.tools.callFunction({mousedownFn},event);" ' + (CKEDITOR.env.ie ? 'onclick="return false;" onmouseup' : "onclick") + '="CKEDITOR.tools.callFunction({clickFn},this);return false;"><span class="cke_button_icon cke_button__{iconName}_icon" style="{style}"'),
        d = d + '>&nbsp;</span><span id="{id}_label" class="cke_button_label cke_button__{name}_label" aria-hidden="false">{label}</span>{arrowHtml}</a>', e = CKEDITOR.addTemplate("buttonArrow", '<span class="cke_button_arrow">' + (CKEDITOR.env.hc ? "&#9660;" : "") + "</span>"), c = CKEDITOR.addTemplate("button", d); CKEDITOR.plugins.add("button", { beforeInit: function (a) { a.ui.addHandler(CKEDITOR.UI_BUTTON, CKEDITOR.ui.button.handler) } }); CKEDITOR.UI_BUTTON = "button"; CKEDITOR.ui.button = function (a) {
            CKEDITOR.tools.extend(this, a, {
                title: a.label,
                click: a.click || function (b) { b.execCommand(a.command) }
            }); this._ = {}
        }; CKEDITOR.ui.button.handler = { create: function (a) { return new CKEDITOR.ui.button(a) } }; CKEDITOR.ui.button.prototype = {
            render: function (a, b) {
                var d = CKEDITOR.env, g = this._.id = CKEDITOR.tools.getNextId(), h = "", f = this.command, i; this._.editor = a; var k = { id: g, button: this, editor: a, focus: function () { CKEDITOR.document.getById(g).focus() }, execute: function () { this.button.click(a) }, attach: function (a) { this.button.attach(a) } }, o = CKEDITOR.tools.addFunction(function (a) {
                    if (k.onkey) {
                        a =
                        new CKEDITOR.dom.event(a); return k.onkey(k, a.getKeystroke()) !== false
                    }
                }), m = CKEDITOR.tools.addFunction(function (a) { var b; k.onfocus && (b = k.onfocus(k, new CKEDITOR.dom.event(a)) !== false); CKEDITOR.env.gecko && CKEDITOR.env.version < 10900 && a.preventBubble(); return b }), q = 0, l = CKEDITOR.tools.addFunction(function () { if (CKEDITOR.env.opera) { var b = a.editable(); if (b.isInline() && b.hasFocus) { a.lockSelection(); q = 1 } } }); k.clickFn = i = CKEDITOR.tools.addFunction(function () { if (q) { a.unlockSelection(1); q = 0 } k.execute() }); if (this.modes) {
                    var n =
                    {}, r = function () { var b = a.mode; if (b) { b = this.modes[b] ? n[b] != void 0 ? n[b] : CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED; b = a.readOnly && !this.readOnly ? CKEDITOR.TRISTATE_DISABLED : b; this.setState(b); this.refresh && this.refresh() } }; a.on("beforeModeUnload", function () { if (a.mode && this._.state != CKEDITOR.TRISTATE_DISABLED) n[a.mode] = this._.state }, this); a.on("activeFilterChange", r, this); a.on("mode", r, this); !this.readOnly && a.on("readOnly", r, this)
                } else if (f) if (f = a.getCommand(f)) {
                    f.on("state", function () { this.setState(f.state) },
                    this); h = h + (f.state == CKEDITOR.TRISTATE_ON ? "on" : f.state == CKEDITOR.TRISTATE_DISABLED ? "disabled" : "off")
                } if (this.directional) a.on("contentDirChanged", function (b) { var c = CKEDITOR.document.getById(this._.id), d = c.getFirst(), b = b.data; b != a.lang.dir ? c.addClass("cke_" + b) : c.removeClass("cke_ltr").removeClass("cke_rtl"); d.setAttribute("style", CKEDITOR.skin.getIconStyle(p, b == "rtl", this.icon, this.iconOffset)) }, this); f || (h = h + "off"); var p = r = this.name || this.command; if (this.icon && !/\./.test(this.icon)) {
                    p = this.icon; this.icon =
                    null
                } d = { id: g, name: r, iconName: p, label: this.label, cls: this.className || "", state: h, ariaDisabled: h == "disabled" ? "true" : "false", title: this.title, titleJs: d.gecko && d.version >= 10900 && !d.hc ? "" : (this.title || "").replace("'", ""), hasArrow: this.hasArrow ? "true" : "false", keydownFn: o, mousedownFn: l, focusFn: m, clickFn: i, style: CKEDITOR.skin.getIconStyle(p, a.lang.dir == "rtl", this.icon, this.iconOffset), arrowHtml: this.hasArrow ? e.output() : "" }; c.output(d, b); if (this.onRender) this.onRender(); return k
            }, setState: function (a) {
                if (this._.state ==
                a) return false; this._.state = a; var b = CKEDITOR.document.getById(this._.id); if (b) { b.setState(a, "cke_button"); a == CKEDITOR.TRISTATE_DISABLED ? b.setAttribute("aria-disabled", true) : b.removeAttribute("aria-disabled"); if (this.hasArrow) { a = a == CKEDITOR.TRISTATE_ON ? this._.editor.lang.button.selectedLabel.replace(/%1/g, this.label) : this.label; CKEDITOR.document.getById(this._.id + "_label").setText(a) } else a == CKEDITOR.TRISTATE_ON ? b.setAttribute("aria-pressed", true) : b.removeAttribute("aria-pressed"); return true } return false
            },
            getState: function () { return this._.state }, toFeature: function (a) { if (this._.feature) return this._.feature; var b = this; !this.allowedContent && (!this.requiredContent && this.command) && (b = a.getCommand(this.command) || b); return this._.feature = b }
        }; CKEDITOR.ui.prototype.addButton = function (a, b) { this.add(a, CKEDITOR.UI_BUTTON, b) }
    }(), CKEDITOR.plugins.add("panelbutton", {
        requires: "button", onLoad: function () {
            function d(d) {
                var c = this._; if (c.state != CKEDITOR.TRISTATE_DISABLED) {
                    this.createPanel(d); c.on ? c.panel.hide() : c.panel.showBlock(this._.id,
                    this.document.getById(this._.id), 4)
                }
            } CKEDITOR.ui.panelButton = CKEDITOR.tools.createClass({
                base: CKEDITOR.ui.button, $: function (e) { var c = e.panel || {}; delete e.panel; this.base(e); this.document = c.parent && c.parent.getDocument() || CKEDITOR.document; c.block = { attributes: c.attributes }; this.hasArrow = c.toolbarRelated = true; this.click = d; this._ = { panelDefinition: c } }, statics: { handler: { create: function (d) { return new CKEDITOR.ui.panelButton(d) } } }, proto: {
                    createPanel: function (d) {
                        var c = this._; if (!c.panel) {
                            var a = this._.panelDefinition,
                            b = this._.panelDefinition.block, j = a.parent || CKEDITOR.document.getBody(), g = this._.panel = new CKEDITOR.ui.floatPanel(d, j, a), a = g.addBlock(c.id, b), h = this; g.onShow = function () { h.className && this.element.addClass(h.className + "_panel"); h.setState(CKEDITOR.TRISTATE_ON); c.on = 1; h.editorFocus && d.focus(); if (h.onOpen) h.onOpen() }; g.onHide = function (a) {
                                h.className && this.element.getFirst().removeClass(h.className + "_panel"); h.setState(h.modes && h.modes[d.mode] ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED); c.on = 0; if (!a &&
                                h.onClose) h.onClose()
                            }; g.onEscape = function () { g.hide(1); h.document.getById(c.id).focus() }; if (this.onBlock) this.onBlock(g, a); a.onHide = function () { c.on = 0; h.setState(CKEDITOR.TRISTATE_OFF) }
                        }
                    }
                }
            })
        }, beforeInit: function (d) { d.ui.addHandler(CKEDITOR.UI_PANELBUTTON, CKEDITOR.ui.panelButton.handler) }
    }), CKEDITOR.UI_PANELBUTTON = "panelbutton", function () {
        CKEDITOR.plugins.add("panel", { beforeInit: function (a) { a.ui.addHandler(CKEDITOR.UI_PANEL, CKEDITOR.ui.panel.handler) } }); CKEDITOR.UI_PANEL = "panel"; CKEDITOR.ui.panel = function (a,
        b) { b && CKEDITOR.tools.extend(this, b); CKEDITOR.tools.extend(this, { className: "", css: [] }); this.id = CKEDITOR.tools.getNextId(); this.document = a; this.isFramed = this.forceIFrame || this.css.length; this._ = { blocks: {} } }; CKEDITOR.ui.panel.handler = { create: function (a) { return new CKEDITOR.ui.panel(a) } }; var d = CKEDITOR.addTemplate("panel", '<div lang="{langCode}" id="{id}" dir={dir} class="cke cke_reset_all {editorId} cke_panel cke_panel {cls} cke_{dir}" style="z-index:{z-index}" role="presentation">{frame}</div>'), e =
        CKEDITOR.addTemplate("panel-frame", '<iframe id="{id}" class="cke_panel_frame" role="presentation" frameborder="0" src="{src}"></iframe>'), c = CKEDITOR.addTemplate("panel-frame-inner", '<!DOCTYPE html><html class="cke_panel_container {env}" dir="{dir}" lang="{langCode}"><head>{css}</head><body class="cke_{dir}" style="margin:0;padding:0" onload="{onload}"></body></html>'); CKEDITOR.ui.panel.prototype = {
            render: function (a, b) {
                this.getHolderElement = function () {
                    var a = this._.holder; if (!a) {
                        if (this.isFramed) {
                            var a =
                            this.document.getById(this.id + "_frame"), b = a.getParent(), a = a.getFrameDocument(); CKEDITOR.env.iOS && b.setStyles({ overflow: "scroll", "-webkit-overflow-scrolling": "touch" }); b = CKEDITOR.tools.addFunction(CKEDITOR.tools.bind(function () { this.isLoaded = true; if (this.onLoad) this.onLoad() }, this)); a.write(c.output(CKEDITOR.tools.extend({ css: CKEDITOR.tools.buildStyleHtml(this.css), onload: "window.parent.CKEDITOR.tools.callFunction(" + b + ");" }, j))); a.getWindow().$.CKEDITOR = CKEDITOR; a.on("key" + (CKEDITOR.env.opera ? "press" :
                            "down"), function (a) { var b = a.data.getKeystroke(), c = this.document.getById(this.id).getAttribute("dir"); this._.onKeyDown && this._.onKeyDown(b) === false ? a.data.preventDefault() : (b == 27 || b == (c == "rtl" ? 39 : 37)) && this.onEscape && this.onEscape(b) === false && a.data.preventDefault() }, this); a = a.getBody(); a.unselectable(); CKEDITOR.env.air && CKEDITOR.tools.callFunction(b)
                        } else a = this.document.getById(this.id); this._.holder = a
                    } return a
                }; var j = {
                    editorId: a.id, id: this.id, langCode: a.langCode, dir: a.lang.dir, cls: this.className,
                    frame: "", env: CKEDITOR.env.cssClass, "z-index": a.config.baseFloatZIndex + 1
                }; if (this.isFramed) { var g = CKEDITOR.env.air ? "javascript:void(0)" : CKEDITOR.env.ie ? "javascript:void(function(){" + encodeURIComponent("document.open();(" + CKEDITOR.tools.fixDomain + ")();document.close();") + "}())" : ""; j.frame = e.output({ id: this.id + "_frame", src: g }) } g = d.output(j); b && b.push(g); return g
            }, addBlock: function (a, b) {
                b = this._.blocks[a] = b instanceof CKEDITOR.ui.panel.block ? b : new CKEDITOR.ui.panel.block(this.getHolderElement(), b); this._.currentBlock ||
                this.showBlock(a); return b
            }, getBlock: function (a) { return this._.blocks[a] }, showBlock: function (a) { var a = this._.blocks[a], b = this._.currentBlock, c = !this.forceIFrame || CKEDITOR.env.ie ? this._.holder : this.document.getById(this.id + "_frame"); b && b.hide(); this._.currentBlock = a; CKEDITOR.fire("ariaWidget", c); a._.focusIndex = -1; this._.onKeyDown = a.onKeyDown && CKEDITOR.tools.bind(a.onKeyDown, a); a.show(); return a }, destroy: function () { this.element && this.element.remove() }
        }; CKEDITOR.ui.panel.block = CKEDITOR.tools.createClass({
            $: function (a,
            b) { this.element = a.append(a.getDocument().createElement("div", { attributes: { tabindex: -1, "class": "cke_panel_block" }, styles: { display: "none" } })); b && CKEDITOR.tools.extend(this, b); this.element.setAttributes({ role: this.attributes.role || "presentation", "aria-label": this.attributes["aria-label"], title: this.attributes.title || this.attributes["aria-label"] }); this.keys = {}; this._.focusIndex = -1; this.element.disableContextMenu() }, _: {
                markItem: function (a) {
                    if (a != -1) {
                        a = this.element.getElementsByTag("a").getItem(this._.focusIndex =
                        a); (CKEDITOR.env.webkit || CKEDITOR.env.opera) && a.getDocument().getWindow().focus(); a.focus(); this.onMark && this.onMark(a)
                    }
                }
            }, proto: {
                show: function () { this.element.setStyle("display", "") }, hide: function () { (!this.onHide || this.onHide.call(this) !== true) && this.element.setStyle("display", "none") }, onKeyDown: function (a, b) {
                    var c = this.keys[a]; switch (c) {
                        case "next": for (var d = this._.focusIndex, c = this.element.getElementsByTag("a"), e; e = c.getItem(++d) ;) if (e.getAttribute("_cke_focus") && e.$.offsetWidth) {
                            this._.focusIndex =
                            d; e.focus(); break
                        } if (!e && !b) { this._.focusIndex = -1; return this.onKeyDown(a, 1) } return false; case "prev": d = this._.focusIndex; for (c = this.element.getElementsByTag("a") ; d > 0 && (e = c.getItem(--d)) ;) { if (e.getAttribute("_cke_focus") && e.$.offsetWidth) { this._.focusIndex = d; e.focus(); break } e = null } if (!e && !b) { this._.focusIndex = c.count(); return this.onKeyDown(a, 1) } return false; case "click": case "mouseup": d = this._.focusIndex; (e = d >= 0 && this.element.getElementsByTag("a").getItem(d)) && (e.$[c] ? e.$[c]() : e.$["on" + c]()); return false
                    } return true
                }
            }
        })
    }(),
    CKEDITOR.plugins.add("floatpanel", { requires: "panel" }), function () {
        function d(c, a, b, d, g) { var g = CKEDITOR.tools.genKey(a.getUniqueId(), b.getUniqueId(), c.lang.dir, c.uiColor || "", d.css || "", g || ""), h = e[g]; if (!h) { h = e[g] = new CKEDITOR.ui.panel(a, d); h.element = b.append(CKEDITOR.dom.element.createFromHtml(h.render(c), a)); h.element.setStyles({ display: "none", position: "absolute" }) } return h } var e = {}; CKEDITOR.ui.floatPanel = CKEDITOR.tools.createClass({
            $: function (c, a, b, e) {
                function g() { k.hide() } b.forceIFrame = 1; b.toolbarRelated &&
                c.elementMode == CKEDITOR.ELEMENT_MODE_INLINE && (a = CKEDITOR.document.getById("cke_" + c.name)); var h = a.getDocument(), e = d(c, h, a, b, e || 0), f = e.element, i = f.getFirst(), k = this; f.disableContextMenu(); this.element = f; this._ = { editor: c, panel: e, parentElement: a, definition: b, document: h, iframe: i, children: [], dir: c.lang.dir }; c.on("mode", g); c.on("resize", g); h.getWindow().on("resize", g)
            }, proto: {
                addBlock: function (c, a) { return this._.panel.addBlock(c, a) }, addListBlock: function (c, a) { return this._.panel.addListBlock(c, a) }, getBlock: function (c) { return this._.panel.getBlock(c) },
                showBlock: function (c, a, b, d, g, e) {
                    var f = this._.panel, i = f.showBlock(c); this.allowBlur(false); c = this._.editor.editable(); this._.returnFocus = c.hasFocus ? c : new CKEDITOR.dom.element(CKEDITOR.document.$.activeElement); var k = this.element, c = this._.iframe, c = CKEDITOR.env.ie ? c : new CKEDITOR.dom.window(c.$.contentWindow), o = k.getDocument(), m = this._.parentElement.getPositionedAncestor(), q = a.getDocumentPosition(o), o = m ? m.getDocumentPosition(o) : { x: 0, y: 0 }, l = this._.dir == "rtl", n = q.x + (d || 0) - o.x, r = q.y + (g || 0) - o.y; if (l && (b ==
                    1 || b == 4)) n = n + a.$.offsetWidth; else if (!l && (b == 2 || b == 3)) n = n + (a.$.offsetWidth - 1); if (b == 3 || b == 4) r = r + (a.$.offsetHeight - 1); this._.panel._.offsetParentId = a.getId(); k.setStyles({ top: r + "px", left: 0, display: "" }); k.setOpacity(0); k.getFirst().removeStyle("width"); this._.editor.focusManager.add(c); if (!this._.blurSet) {
                        CKEDITOR.event.useCapture = true; c.on("blur", function (a) { if (this.allowBlur() && a.data.getPhase() == CKEDITOR.EVENT_PHASE_AT_TARGET && this.visible && !this._.activeChild) { delete this._.returnFocus; this.hide() } },
                        this); c.on("focus", function () { this._.focused = true; this.hideChild(); this.allowBlur(true) }, this); CKEDITOR.event.useCapture = false; this._.blurSet = 1
                    } f.onEscape = CKEDITOR.tools.bind(function (a) { if (this.onEscape && this.onEscape(a) === false) return false }, this); CKEDITOR.tools.setTimeout(function () {
                        var a = CKEDITOR.tools.bind(function () {
                            k.removeStyle("width"); if (i.autoSize) {
                                var a = i.element.getDocument(), a = (CKEDITOR.env.webkit ? i.element : a.getBody()).$.scrollWidth; CKEDITOR.env.ie && (CKEDITOR.env.quirks && a > 0) && (a = a +
                                ((k.$.offsetWidth || 0) - (k.$.clientWidth || 0) + 3)); k.setStyle("width", a + 10 + "px"); a = i.element.$.scrollHeight; CKEDITOR.env.ie && (CKEDITOR.env.quirks && a > 0) && (a = a + ((k.$.offsetHeight || 0) - (k.$.clientHeight || 0) + 3)); k.setStyle("height", a + "px"); f._.currentBlock.element.setStyle("display", "none").removeStyle("display")
                            } else k.removeStyle("height"); l && (n = n - k.$.offsetWidth); k.setStyle("left", n + "px"); var b = f.element.getWindow(), a = k.$.getBoundingClientRect(), b = b.getViewPaneSize(), c = a.width || a.right - a.left, d = a.height ||
                            a.bottom - a.top, g = l ? a.right : b.width - a.left, j = l ? b.width - a.right : a.left; l ? g < c && (n = j > c ? n + c : b.width > c ? n - a.left : n - a.right + b.width) : g < c && (n = j > c ? n - c : b.width > c ? n - a.right + b.width : n - a.left); c = a.top; b.height - a.top < d && (r = c > d ? r - d : b.height > d ? r - a.bottom + b.height : r - a.top); if (CKEDITOR.env.ie) {
                                b = a = new CKEDITOR.dom.element(k.$.offsetParent); b.getName() == "html" && (b = b.getDocument().getBody()); b.getComputedStyle("direction") == "rtl" && (n = CKEDITOR.env.ie8Compat ? n - k.getDocument().getDocumentElement().$.scrollLeft * 2 : n - (a.$.scrollWidth -
                                a.$.clientWidth))
                            } var a = k.getFirst(), p; (p = a.getCustomData("activePanel")) && p.onHide && p.onHide.call(this, 1); a.setCustomData("activePanel", this); k.setStyles({ top: r + "px", left: n + "px" }); k.setOpacity(1); e && e()
                        }, this); f.isLoaded ? a() : f.onLoad = a; CKEDITOR.tools.setTimeout(function () {
                            var a = CKEDITOR.env.webkit && CKEDITOR.document.getWindow().getScrollPosition().y; this.focus(); i.element.focus(); if (CKEDITOR.env.webkit) CKEDITOR.document.getBody().$.scrollTop = a; this.allowBlur(true); this._.editor.fire("panelShow",
                            this)
                        }, 0, this)
                    }, CKEDITOR.env.air ? 200 : 0, this); this.visible = 1; this.onShow && this.onShow.call(this)
                }, focus: function () { if (CKEDITOR.env.webkit) { var c = CKEDITOR.document.getActive(); !c.equals(this._.iframe) && c.$.blur() } (this._.lastFocused || this._.iframe.getFrameDocument().getWindow()).focus() }, blur: function () { var c = this._.iframe.getFrameDocument().getActive(); c.is("a") && (this._.lastFocused = c) }, hide: function (c) {
                    if (this.visible && (!this.onHide || this.onHide.call(this) !== true)) {
                        this.hideChild(); CKEDITOR.env.gecko &&
                        this._.iframe.getFrameDocument().$.activeElement.blur(); this.element.setStyle("display", "none"); this.visible = 0; this.element.getFirst().removeCustomData("activePanel"); if (c = c && this._.returnFocus) { CKEDITOR.env.webkit && c.type && c.getWindow().$.focus(); c.focus() } delete this._.lastFocused; this._.editor.fire("panelHide", this)
                    }
                }, allowBlur: function (c) { var a = this._.panel; if (c != void 0) a.allowBlur = c; return a.allowBlur }, showAsChild: function (c, a, b, d, g, e) {
                    if (!(this._.activeChild == c && c._.panel._.offsetParentId ==
                    b.getId())) { this.hideChild(); c.onHide = CKEDITOR.tools.bind(function () { CKEDITOR.tools.setTimeout(function () { this._.focused || this.hide() }, 0, this) }, this); this._.activeChild = c; this._.focused = false; c.showBlock(a, b, d, g, e); this.blur(); (CKEDITOR.env.ie7Compat || CKEDITOR.env.ie6Compat) && setTimeout(function () { c.element.getChild(0).$.style.cssText += "" }, 100) }
                }, hideChild: function (c) { var a = this._.activeChild; if (a) { delete a.onHide; delete this._.activeChild; a.hide(); c && this.focus() } }
            }
        }); CKEDITOR.on("instanceDestroyed",
        function () { var c = CKEDITOR.tools.isEmpty(CKEDITOR.instances), a; for (a in e) { var b = e[a]; c ? b.destroy() : b.element.hide() } c && (e = {}) })
    }(), CKEDITOR.plugins.add("colorbutton", {
        requires: "panelbutton,floatpanel", init: function (d) {
            function e(a, e, f, i) {
                var k = new CKEDITOR.style(b["colorButton_" + e + "Style"]), o = CKEDITOR.tools.getNextId() + "_colorBox"; d.ui.add(a, CKEDITOR.UI_PANELBUTTON, {
                    label: f, title: f, modes: { wysiwyg: 1 }, editorFocus: 0, toolbar: "colors," + i, allowedContent: k, requiredContent: k, panel: {
                        css: CKEDITOR.skin.getPath("editor"),
                        attributes: { role: "listbox", "aria-label": j.panelTitle }
                    }, onBlock: function (a, b) { b.autoSize = true; b.element.addClass("cke_colorblock"); b.element.setHtml(c(a, e, o)); b.element.getDocument().getBody().setStyle("overflow", "hidden"); CKEDITOR.ui.fire("ready", this); var g = b.keys, f = d.lang.dir == "rtl"; g[f ? 37 : 39] = "next"; g[40] = "next"; g[9] = "next"; g[f ? 39 : 37] = "prev"; g[38] = "prev"; g[CKEDITOR.SHIFT + 9] = "prev"; g[32] = "click" }, refresh: function () { d.activeFilter.check(k) || this.setState(CKEDITOR.TRISTATE_DISABLED) }, onOpen: function () {
                        var a =
                        d.getSelection(), a = a && a.getStartElement(), a = d.elementPath(a), b; if (a) { a = a.block || a.blockLimit || d.document.getBody(); do b = a && a.getComputedStyle(e == "back" ? "background-color" : "color") || "transparent"; while (e == "back" && b == "transparent" && a && (a = a.getParent())); if (!b || b == "transparent") b = "#ffffff"; this._.panel._.iframe.getFrameDocument().getById(o).setStyle("background-color", b); return b }
                    }
                })
            } function c(c, e, f) {
                var i = [], k = b.colorButton_colors.split(","), o = CKEDITOR.tools.addFunction(function (e, f) {
                    if (e == "?") {
                        var h =
                        arguments.callee, j = function (a) { this.removeListener("ok", j); this.removeListener("cancel", j); a.name == "ok" && h(this.getContentElement("picker", "selectedColor").getValue(), f) }; d.openDialog("colordialog", function () { this.on("ok", j); this.on("cancel", j) })
                    } else {
                        d.focus(); c.hide(); d.fire("saveSnapshot"); d.removeStyle(new CKEDITOR.style(b["colorButton_" + f + "Style"], { color: "inherit" })); if (e) {
                            var i = b["colorButton_" + f + "Style"]; i.childRule = f == "back" ? function (b) { return a(b) } : function (b) {
                                return !(b.is("a") || b.getElementsByTag("a").count()) ||
                                a(b)
                            }; d.applyStyle(new CKEDITOR.style(i, { color: e }))
                        } d.fire("saveSnapshot")
                    }
                }); i.push('<a class="cke_colorauto" _cke_focus=1 hidefocus=true title="', j.auto, '" onclick="CKEDITOR.tools.callFunction(', o, ",null,'", e, "');return false;\" href=\"javascript:void('", j.auto, '\')" role="option"><table role="presentation" cellspacing=0 cellpadding=0 width="100%"><tr><td><span class="cke_colorbox" id="', f, '"></span></td><td colspan=7 align=center>', j.auto, '</td></tr></table></a><table role="presentation" cellspacing=0 cellpadding=0 width="100%">');
                for (f = 0; f < k.length; f++) { f % 8 === 0 && i.push("</tr><tr>"); var m = k[f].split("/"), q = m[0], l = m[1] || q; m[1] || (q = "#" + q.replace(/^(.)(.)(.)$/, "$1$1$2$2$3$3")); m = d.lang.colorbutton.colors[l] || l; i.push('<td><a class="cke_colorbox" _cke_focus=1 hidefocus=true title="', m, '" onclick="CKEDITOR.tools.callFunction(', o, ",'", q, "','", e, "'); return false;\" href=\"javascript:void('", m, '\')" role="option"><span class="cke_colorbox" style="background-color:#', l, '"></span></a></td>') } (d.plugins.colordialog && b.colorButton_enableMore ===
                void 0 || b.colorButton_enableMore) && i.push('</tr><tr><td colspan=8 align=center><a class="cke_colormore" _cke_focus=1 hidefocus=true title="', j.more, '" onclick="CKEDITOR.tools.callFunction(', o, ",'?','", e, "');return false;\" href=\"javascript:void('", j.more, "')\"", ' role="option">', j.more, "</a></td>"); i.push("</tr></table>"); return i.join("")
            } function a(a) { return a.getAttribute("contentEditable") == "false" || a.getAttribute("data-nostyle") } var b = d.config, j = d.lang.colorbutton; if (!CKEDITOR.env.hc) {
                e("TextColor",
                "fore", j.textColorTitle, 10); e("BGColor", "back", j.bgColorTitle, 20)
            }
        }
    }), CKEDITOR.config.colorButton_colors = "000,800000,8B4513,2F4F4F,008080,000080,4B0082,696969,B22222,A52A2A,DAA520,006400,40E0D0,0000CD,800080,808080,F00,FF8C00,FFD700,008000,0FF,00F,EE82EE,A9A9A9,FFA07A,FFA500,FFFF00,00FF00,AFEEEE,ADD8E6,DDA0DD,D3D3D3,FFF0F5,FAEBD7,FFFFE0,F0FFF0,F0FFFF,F0F8FF,E6E6FA,FFF", CKEDITOR.config.colorButton_foreStyle = { element: "span", styles: { color: "#(color)" }, overrides: [{ element: "font", attributes: { color: null } }] },
    CKEDITOR.config.colorButton_backStyle = { element: "span", styles: { "background-color": "#(color)" } }, CKEDITOR.plugins.add("menu", {
        requires: "floatpanel", beforeInit: function (d) {
            for (var e = d.config.menu_groups.split(","), c = d._.menuGroups = {}, a = d._.menuItems = {}, b = 0; b < e.length; b++) c[e[b]] = b + 1; d.addMenuGroup = function (a, b) { c[a] = b || 100 }; d.addMenuItem = function (b, d) { c[d.group] && (a[b] = new CKEDITOR.menuItem(this, b, d)) }; d.addMenuItems = function (a) { for (var b in a) this.addMenuItem(b, a[b]) }; d.getMenuItem = function (b) { return a[b] };
            d.removeMenuItem = function (b) { delete a[b] }
        }
    }), function () {
        function d(a) { a.sort(function (a, b) { return a.group < b.group ? -1 : a.group > b.group ? 1 : a.order < b.order ? -1 : a.order > b.order ? 1 : 0 }) } var e = '<span class="cke_menuitem"><a id="{id}" class="cke_menubutton cke_menubutton__{name} cke_menubutton_{state} {cls}" href="{href}" title="{title}" tabindex="-1"_cke_focus=1 hidefocus="true" role="{role}" aria-haspopup="{hasPopup}" aria-disabled="{disabled}" {ariaChecked}'; if (CKEDITOR.env.opera || CKEDITOR.env.gecko && CKEDITOR.env.mac) e =
        e + ' onkeypress="return false;"'; CKEDITOR.env.gecko && (e = e + ' onblur="this.style.cssText = this.style.cssText;"'); var e = e + (' onmouseover="CKEDITOR.tools.callFunction({hoverFn},{index});" onmouseout="CKEDITOR.tools.callFunction({moveOutFn},{index});" ' + (CKEDITOR.env.ie ? 'onclick="return false;" onmouseup' : "onclick") + '="CKEDITOR.tools.callFunction({clickFn},{index}); return false;">'), c = CKEDITOR.addTemplate("menuItem", e + '<span class="cke_menubutton_inner"><span class="cke_menubutton_icon"><span class="cke_button_icon cke_button__{iconName}_icon" style="{iconStyle}"></span></span><span class="cke_menubutton_label">{label}</span>{arrowHtml}</span></a></span>'),
        a = CKEDITOR.addTemplate("menuArrow", '<span class="cke_menuarrow"><span>{label}</span></span>'); CKEDITOR.menu = CKEDITOR.tools.createClass({
            $: function (a, c) { c = this._.definition = c || {}; this.id = CKEDITOR.tools.getNextId(); this.editor = a; this.items = []; this._.listeners = []; this._.level = c.level || 1; var d = CKEDITOR.tools.extend({}, c.panel, { css: [CKEDITOR.skin.getPath("editor")], level: this._.level - 1, block: {} }), e = d.block.attributes = d.attributes || {}; !e.role && (e.role = "menu"); this._.panelDefinition = d }, _: {
                onShow: function () {
                    var a =
                    this.editor.getSelection(), c = a && a.getStartElement(), d = this.editor.elementPath(), e = this._.listeners; this.removeAll(); for (var f = 0; f < e.length; f++) { var i = e[f](c, a, d); if (i) for (var k in i) { var o = this.editor.getMenuItem(k); if (o && (!o.command || this.editor.getCommand(o.command).state)) { o.state = i[k]; this.add(o) } } }
                }, onClick: function (a) { this.hide(); if (a.onClick) a.onClick(); else a.command && this.editor.execCommand(a.command) }, onEscape: function (a) { var c = this.parent; c ? c._.panel.hideChild(1) : a == 27 && this.hide(1); return false },
                onHide: function () { this.onHide && this.onHide() }, showSubMenu: function (a) {
                    var c = this._.subMenu, d = this.items[a]; if (d = d.getItems && d.getItems()) {
                        if (c) c.removeAll(); else { c = this._.subMenu = new CKEDITOR.menu(this.editor, CKEDITOR.tools.extend({}, this._.definition, { level: this._.level + 1 }, true)); c.parent = this; c._.onClick = CKEDITOR.tools.bind(this._.onClick, this) } for (var e in d) { var f = this.editor.getMenuItem(e); if (f) { f.state = d[e]; c.add(f) } } var i = this._.panel.getBlock(this.id).element.getDocument().getById(this.id +
                        ("" + a)); setTimeout(function () { c.show(i, 2) }, 0)
                    } else this._.panel.hideChild(1)
                }
            }, proto: {
                add: function (a) { if (!a.order) a.order = this.items.length; this.items.push(a) }, removeAll: function () { this.items = [] }, show: function (a, c, e, h) {
                    if (!this.parent) { this._.onShow(); if (!this.items.length) return } var c = c || (this.editor.lang.dir == "rtl" ? 2 : 1), f = this.items, i = this.editor, k = this._.panel, o = this._.element; if (!k) {
                        k = this._.panel = new CKEDITOR.ui.floatPanel(this.editor, CKEDITOR.document.getBody(), this._.panelDefinition, this._.level);
                        k.onEscape = CKEDITOR.tools.bind(function (a) { if (this._.onEscape(a) === false) return false }, this); k.onShow = function () { k._.panel.getHolderElement().getParent().addClass("cke cke_reset_all") }; k.onHide = CKEDITOR.tools.bind(function () { this._.onHide && this._.onHide() }, this); o = k.addBlock(this.id, this._.panelDefinition.block); o.autoSize = true; var m = o.keys; m[40] = "next"; m[9] = "next"; m[38] = "prev"; m[CKEDITOR.SHIFT + 9] = "prev"; m[i.lang.dir == "rtl" ? 37 : 39] = CKEDITOR.env.ie ? "mouseup" : "click"; m[32] = CKEDITOR.env.ie ? "mouseup" :
                        "click"; CKEDITOR.env.ie && (m[13] = "mouseup"); o = this._.element = o.element; m = o.getDocument(); m.getBody().setStyle("overflow", "hidden"); m.getElementsByTag("html").getItem(0).setStyle("overflow", "hidden"); this._.itemOverFn = CKEDITOR.tools.addFunction(function (a) { clearTimeout(this._.showSubTimeout); this._.showSubTimeout = CKEDITOR.tools.setTimeout(this._.showSubMenu, i.config.menu_subMenuDelay || 400, this, [a]) }, this); this._.itemOutFn = CKEDITOR.tools.addFunction(function () { clearTimeout(this._.showSubTimeout) }, this);
                        this._.itemClickFn = CKEDITOR.tools.addFunction(function (a) { var b = this.items[a]; if (b.state == CKEDITOR.TRISTATE_DISABLED) this.hide(1); else if (b.getItems) this._.showSubMenu(a); else this._.onClick(b) }, this)
                    } d(f); for (var m = i.elementPath(), m = ['<div class="cke_menu' + (m && m.direction() != i.lang.dir ? " cke_mixed_dir_content" : "") + '" role="presentation">'], q = f.length, l = q && f[0].group, n = 0; n < q; n++) { var r = f[n]; if (l != r.group) { m.push('<div class="cke_menuseparator" role="separator"></div>'); l = r.group } r.render(this, n, m) } m.push("</div>");
                    o.setHtml(m.join("")); CKEDITOR.ui.fire("ready", this); this.parent ? this.parent._.panel.showAsChild(k, this.id, a, c, e, h) : k.showBlock(this.id, a, c, e, h); i.fire("menuShow", [k])
                }, addListener: function (a) { this._.listeners.push(a) }, hide: function (a) { this._.onHide && this._.onHide(); this._.panel && this._.panel.hide(a) }
            }
        }); CKEDITOR.menuItem = CKEDITOR.tools.createClass({
            $: function (a, c, d) {
                CKEDITOR.tools.extend(this, d, { order: 0, className: "cke_menubutton__" + c }); this.group = a._.menuGroups[this.group]; this.editor = a; this.name =
                c
            }, proto: {
                render: function (b, d, e) {
                    var h = b.id + ("" + d), f = typeof this.state == "undefined" ? CKEDITOR.TRISTATE_OFF : this.state, i = "", k = f == CKEDITOR.TRISTATE_ON ? "on" : f == CKEDITOR.TRISTATE_DISABLED ? "disabled" : "off"; this.role in { menuitemcheckbox: 1, menuitemradio: 1 } && (i = ' aria-checked="' + (f == CKEDITOR.TRISTATE_ON ? "true" : "false") + '"'); var o = this.getItems, m = "&#" + (this.editor.lang.dir == "rtl" ? "9668" : "9658") + ";", q = this.name; if (this.icon && !/\./.test(this.icon)) q = this.icon; b = {
                        id: h, name: this.name, iconName: q, label: this.label,
                        cls: this.className || "", state: k, hasPopup: o ? "true" : "false", disabled: f == CKEDITOR.TRISTATE_DISABLED, title: this.label, href: "javascript:void('" + (this.label || "").replace("'") + "')", hoverFn: b._.itemOverFn, moveOutFn: b._.itemOutFn, clickFn: b._.itemClickFn, index: d, iconStyle: CKEDITOR.skin.getIconStyle(q, this.editor.lang.dir == "rtl", q == this.icon ? null : this.icon, this.iconOffset), arrowHtml: o ? a.output({ label: m }) : "", role: this.role ? this.role : "menuitem", ariaChecked: i
                    }; c.output(b, e)
                }
            }
        })
    }(), CKEDITOR.config.menu_groups = "clipboard,form,tablecell,tablecellproperties,tablerow,tablecolumn,table,anchor,link,image,flash,checkbox,radio,textfield,hiddenfield,imagebutton,button,select,textarea,div",
    CKEDITOR.plugins.add("contextmenu", {
        requires: "menu", onLoad: function () {
            CKEDITOR.plugins.contextMenu = CKEDITOR.tools.createClass({
                base: CKEDITOR.menu, $: function (d) { this.base.call(this, d, { panel: { className: "cke_menu_panel", attributes: { "aria-label": d.lang.contextmenu.options } } }) }, proto: {
                    addTarget: function (d, e) {
                        d.on("contextmenu", function (a) {
                            var a = a.data, d = CKEDITOR.env.webkit ? c : CKEDITOR.env.mac ? a.$.metaKey : a.$.ctrlKey; if (!e || !d) {
                                a.preventDefault(); var g = a.getTarget().getDocument(), h = a.getTarget().getDocument().getDocumentElement(),
                                d = !g.equals(CKEDITOR.document), g = g.getWindow().getScrollPosition(), f = d ? a.$.clientX : a.$.pageX || g.x + a.$.clientX, i = d ? a.$.clientY : a.$.pageY || g.y + a.$.clientY; CKEDITOR.tools.setTimeout(function () { this.open(h, null, f, i) }, CKEDITOR.env.ie ? 200 : 0, this)
                            }
                        }, this); if (CKEDITOR.env.webkit) { var c, a = function () { c = 0 }; d.on("keydown", function (a) { c = CKEDITOR.env.mac ? a.data.$.metaKey : a.data.$.ctrlKey }); d.on("keyup", a); d.on("contextmenu", a) }
                    }, open: function (d, e, c, a) {
                        this.editor.focus(); d = d || CKEDITOR.document.getDocumentElement();
                        this.editor.selectionChange(1); this.show(d, e, c, a)
                    }
                }
            })
        }, beforeInit: function (d) { var e = d.contextMenu = new CKEDITOR.plugins.contextMenu(d); d.on("contentDom", function () { e.addTarget(d.editable(), d.config.browserContextMenuOnCtrl !== false) }); d.addCommand("contextMenu", { exec: function () { d.contextMenu.open(d.document.getBody()) } }); d.setKeystroke(CKEDITOR.SHIFT + 121, "contextMenu"); d.setKeystroke(CKEDITOR.CTRL + CKEDITOR.SHIFT + 121, "contextMenu") }
    }), function () {
        CKEDITOR.plugins.add("div", {
            requires: "dialog", init: function (d) {
                if (!d.blockless) {
                    var e =
                    d.lang.div, c = "div(*)"; CKEDITOR.dialog.isTabEnabled(d, "editdiv", "advanced") && (c = c + ";div[dir,id,lang,title]{*}"); d.addCommand("creatediv", new CKEDITOR.dialogCommand("creatediv", { allowedContent: c, requiredContent: "div", contextSensitive: true, refresh: function (a, b) { this.setState("div" in (a.config.div_wrapTable ? b.root : b.blockLimit).getDtd() ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED) } })); d.addCommand("editdiv", new CKEDITOR.dialogCommand("editdiv", { requiredContent: "div" })); d.addCommand("removediv", {
                        requiredContent: "div",
                        exec: function (a) { function b(b) { if ((b = CKEDITOR.plugins.div.getSurroundDiv(a, b)) && !b.data("cke-div-added")) { i.push(b); b.data("cke-div-added") } } for (var c = a.getSelection(), d = c && c.getRanges(), e, f = c.createBookmarks(), i = [], k = 0; k < d.length; k++) { e = d[k]; if (e.collapsed) b(c.getStartElement()); else { e = new CKEDITOR.dom.walker(e); e.evaluator = b; e.lastForward() } } for (k = 0; k < i.length; k++) i[k].remove(true); c.selectBookmarks(f) }
                    }); d.ui.addButton && d.ui.addButton("CreateDiv", { label: e.toolbar, command: "creatediv", toolbar: "blocks,50" });
                    if (d.addMenuItems) { d.addMenuItems({ editdiv: { label: e.edit, command: "editdiv", group: "div", order: 1 }, removediv: { label: e.remove, command: "removediv", group: "div", order: 5 } }); d.contextMenu && d.contextMenu.addListener(function (a) { return !a || a.isReadOnly() ? null : CKEDITOR.plugins.div.getSurroundDiv(d) ? { editdiv: CKEDITOR.TRISTATE_OFF, removediv: CKEDITOR.TRISTATE_OFF } : null }) } CKEDITOR.dialog.add("creatediv", this.path + "dialogs/div.js"); CKEDITOR.dialog.add("editdiv", this.path + "dialogs/div.js")
                }
            }
        }); CKEDITOR.plugins.div =
        { getSurroundDiv: function (d, e) { var c = d.elementPath(e); return d.elementPath(c.blockLimit).contains(function (a) { return a.is("div") && !a.isReadOnly() }, 1) } }
    }(), function () {
        var d; function e(a, e) {
            function h(b) { b = o.list[b]; if (b.equals(a.editable()) || b.getAttribute("contenteditable") == "true") { var c = a.createRange(); c.selectNodeContents(b); c.select() } else a.getSelection().selectElement(b); a.focus() } function f() { k && k.setHtml(c); delete o.list } var i = a.ui.spaceId("path"), k, o = a._.elementsPath, m = o.idBase; e.html = e.html +
            ('<span id="' + i + '_label" class="cke_voice_label">' + a.lang.elementspath.eleLabel + '</span><span id="' + i + '" class="cke_path" role="group" aria-labelledby="' + i + '_label">' + c + "</span>"); a.on("uiReady", function () { var b = a.ui.space("path"); b && a.focusManager.add(b, 1) }); o.onClick = h; var q = CKEDITOR.tools.addFunction(h), l = CKEDITOR.tools.addFunction(function (b, c) {
                var d = o.idBase, e, c = new CKEDITOR.dom.event(c); e = a.lang.dir == "rtl"; switch (c.getKeystroke()) {
                    case e ? 39 : 37: case 9: (e = CKEDITOR.document.getById(d + (b + 1))) ||
                    (e = CKEDITOR.document.getById(d + "0")); e.focus(); return false; case e ? 37 : 39: case CKEDITOR.SHIFT + 9: (e = CKEDITOR.document.getById(d + (b - 1))) || (e = CKEDITOR.document.getById(d + (o.list.length - 1))); e.focus(); return false; case 27: a.focus(); return false; case 13: case 32: h(b); return false
                } return true
            }); a.on("selectionChange", function () {
                a.editable(); for (var d = [], e = o.list = [], f = [], g = o.filters, h = true, A = a.elementPath().elements, v, u = A.length; u--;) {
                    var s = A[u], x = 0; v = s.data("cke-display-name") ? s.data("cke-display-name") :
                    s.data("cke-real-element-type") ? s.data("cke-real-element-type") : s.getName(); h = s.hasAttribute("contenteditable") ? s.getAttribute("contenteditable") == "true" : h; !h && !s.hasAttribute("contenteditable") && (x = 1); for (var t = 0; t < g.length; t++) { var z = g[t](s, v); if (z === false) { x = 1; break } v = z || v } if (!x) { e.unshift(s); f.unshift(v) }
                } e = e.length; for (g = 0; g < e; g++) { v = f[g]; h = a.lang.elementspath.eleTitle.replace(/%1/, v); v = b.output({ id: m + g, label: h, text: v, jsTitle: "javascript:void('" + v + "')", index: g, keyDownFn: l, clickFn: q }); d.unshift(v) } k ||
                (k = CKEDITOR.document.getById(i)); f = k; f.setHtml(d.join("") + c); a.fire("elementsPathUpdate", { space: f })
            }); a.on("readOnly", f); a.on("contentDomUnload", f); a.addCommand("elementsPathFocus", d); a.setKeystroke(CKEDITOR.ALT + 122, "elementsPathFocus")
        } d = { editorFocus: false, readOnly: 1, exec: function (a) { (a = CKEDITOR.document.getById(a._.elementsPath.idBase + "0")) && a.focus(CKEDITOR.env.ie || CKEDITOR.env.air) } }; var c = '<span class="cke_path_empty">&nbsp;</span>', a = ""; if (CKEDITOR.env.opera || CKEDITOR.env.gecko && CKEDITOR.env.mac) a =
        a + ' onkeypress="return false;"'; CKEDITOR.env.gecko && (a = a + ' onblur="this.style.cssText = this.style.cssText;"'); var b = CKEDITOR.addTemplate("pathItem", '<a id="{id}" href="{jsTitle}" tabindex="-1" class="cke_path_item" title="{label}"' + (CKEDITOR.env.gecko && CKEDITOR.env.version < 10900 ? ' onfocus="event.preventBubble();"' : "") + a + ' hidefocus="true"  onkeydown="return CKEDITOR.tools.callFunction({keyDownFn},{index}, event );" onclick="CKEDITOR.tools.callFunction({clickFn},{index}); return false;" role="button" aria-label="{label}">{text}</a>');
        CKEDITOR.plugins.add("elementspath", { init: function (a) { a._.elementsPath = { idBase: "cke_elementspath_" + CKEDITOR.tools.getNextNumber() + "_", filters: [] }; a.on("uiSpace", function (b) { b.data.space == "bottom" && e(a, b.data) }) } })
    }(), function () {
        function d(a, b, c) { c = a.config.forceEnterMode || c; if (a.mode == "wysiwyg") { if (!b) b = a.activeEnterMode; if (!a.elementPath().isContextFor("p")) { b = CKEDITOR.ENTER_BR; c = 1 } a.fire("saveSnapshot"); b == CKEDITOR.ENTER_BR ? j(a, b, null, c) : g(a, b, null, c); a.fire("saveSnapshot") } } function e(a) {
            for (var a =
            a.getSelection().getRanges(true), b = a.length - 1; b > 0; b--) a[b].deleteContents(); return a[0]
        } CKEDITOR.plugins.add("enterkey", { init: function (a) { a.addCommand("enter", { modes: { wysiwyg: 1 }, editorFocus: false, exec: function (a) { d(a) } }); a.addCommand("shiftEnter", { modes: { wysiwyg: 1 }, editorFocus: false, exec: function (a) { d(a, a.activeShiftEnterMode, 1) } }); a.setKeystroke([[13, "enter"], [CKEDITOR.SHIFT + 13, "shiftEnter"]]) } }); var c = CKEDITOR.dom.walker.whitespaces(), a = CKEDITOR.dom.walker.bookmark(); CKEDITOR.plugins.enterkey = {
            enterBlock: function (b,
            d, g, o) {
                if (g = g || e(b)) {
                    var m = g.document, q = g.checkStartOfBlock(), l = g.checkEndOfBlock(), n = b.elementPath(g.startContainer).block, r = d == CKEDITOR.ENTER_DIV ? "div" : "p", p; if (q && l) {
                        if (n && (n.is("li") || n.getParent().is("li"))) {
                            g = n.getParent(); p = g.getParent(); var o = !n.hasPrevious(), w = !n.hasNext(), r = b.getSelection(), y = r.createBookmarks(), q = n.getDirection(1), l = n.getAttribute("class"), A = n.getAttribute("style"), v = p.getDirection(1) != q, b = b.enterMode != CKEDITOR.ENTER_BR || v || A || l; if (p.is("li")) if (o || w) n[o ? "insertBefore" :
                            "insertAfter"](p); else n.breakParent(p); else { if (b) { p = m.createElement(d == CKEDITOR.ENTER_P ? "p" : "div"); v && p.setAttribute("dir", q); A && p.setAttribute("style", A); l && p.setAttribute("class", l); n.moveChildren(p); if (o || w) p[o ? "insertBefore" : "insertAfter"](g); else { n.breakParent(g); p.insertAfter(g) } } else { n.appendBogus(true); if (o || w) for (; m = n[o ? "getFirst" : "getLast"]() ;) m[o ? "insertBefore" : "insertAfter"](g); else for (n.breakParent(g) ; m = n.getLast() ;) m.insertAfter(g) } n.remove() } r.selectBookmarks(y); return
                        } if (n && n.getParent().is("blockquote")) {
                            n.breakParent(n.getParent());
                            n.getPrevious().getFirst(CKEDITOR.dom.walker.invisible(1)) || n.getPrevious().remove(); n.getNext().getFirst(CKEDITOR.dom.walker.invisible(1)) || n.getNext().remove(); g.moveToElementEditStart(n); g.select(); return
                        }
                    } else if (n && n.is("pre") && !l) { j(b, d, g, o); return } if (l = g.splitBlock(r)) {
                        d = l.previousBlock; n = l.nextBlock; b = l.wasStartOfBlock; q = l.wasEndOfBlock; if (n) { y = n.getParent(); if (y.is("li")) { n.breakParent(y); n.move(n.getNext(), 1) } } else if (d && (y = d.getParent()) && y.is("li")) {
                            d.breakParent(y); y = d.getNext(); g.moveToElementEditStart(y);
                            d.move(d.getPrevious())
                        } if (!b && !q) { if (n.is("li")) { p = g.clone(); p.selectNodeContents(n); p = new CKEDITOR.dom.walker(p); p.evaluator = function (b) { return !(a(b) || c(b) || b.type == CKEDITOR.NODE_ELEMENT && b.getName() in CKEDITOR.dtd.$inline && !(b.getName() in CKEDITOR.dtd.$empty)) }; (y = p.next()) && (y.type == CKEDITOR.NODE_ELEMENT && y.is("ul", "ol")) && (CKEDITOR.env.needsBrFiller ? m.createElement("br") : m.createText(" ")).insertBefore(y) } n && g.moveToElementEditStart(n) } else {
                            if (d) {
                                if (d.is("li") || !h.test(d.getName()) && !d.is("pre")) p =
                                d.clone()
                            } else n && (p = n.clone()); if (p) o && !p.is("li") && p.renameNode(r); else if (y && y.is("li")) p = y; else { p = m.createElement(r); d && (w = d.getDirection()) && p.setAttribute("dir", w) } if (m = l.elementPath) { o = 0; for (r = m.elements.length; o < r; o++) { y = m.elements[o]; if (y.equals(m.block) || y.equals(m.blockLimit)) break; if (CKEDITOR.dtd.$removeEmpty[y.getName()]) { y = y.clone(); p.moveChildren(y); p.append(y) } } } p.appendBogus(); p.getParent() || g.insertNode(p); p.is("li") && p.removeAttribute("value"); if (CKEDITOR.env.ie && b && (!q || !d.getChildCount())) {
                                g.moveToElementEditStart(q ?
                                    d : p); g.select()
                            } g.moveToElementEditStart(b && !q ? n : p)
                        } g.select(); g.scrollIntoView()
                    }
                }
            }, enterBr: function (a, b, c, d) {
                if (c = c || e(a)) {
                    var j = c.document, q = c.checkEndOfBlock(), l = new CKEDITOR.dom.elementPath(a.getSelection().getStartElement()), n = l.block, l = n && l.block.getName(); if (!d && l == "li") g(a, b, c, d); else {
                        if (!d && q && h.test(l)) if (q = n.getDirection()) { j = j.createElement("div"); j.setAttribute("dir", q); j.insertAfter(n); c.setStart(j, 0) } else {
                            j.createElement("br").insertAfter(n); CKEDITOR.env.gecko && j.createText("").insertAfter(n);
                            c.setStartAt(n.getNext(), CKEDITOR.env.ie ? CKEDITOR.POSITION_BEFORE_START : CKEDITOR.POSITION_AFTER_START)
                        } else { n = l == "pre" && CKEDITOR.env.ie && CKEDITOR.env.version < 8 ? j.createText("\r") : j.createElement("br"); c.deleteContents(); c.insertNode(n); if (CKEDITOR.env.needsBrFiller) { j.createText("﻿").insertAfter(n); q && n.getParent().appendBogus(); n.getNext().$.nodeValue = ""; c.setStartAt(n.getNext(), CKEDITOR.POSITION_AFTER_START) } else c.setStartAt(n, CKEDITOR.POSITION_AFTER_END) } c.collapse(true); c.select(); c.scrollIntoView()
                    }
                }
            }
        };
        var b = CKEDITOR.plugins.enterkey, j = b.enterBr, g = b.enterBlock, h = /^h[1-6]$/
    }(), function () {
        function d(d, c) {
            var a = {}, b = [], j = { nbsp: " ", shy: "­", gt: ">", lt: "<", amp: "&", apos: "'", quot: '"' }, d = d.replace(/\b(nbsp|shy|gt|lt|amp|apos|quot)(?:,|$)/g, function (d, e) { var g = c ? "&" + e + ";" : j[e]; a[g] = c ? j[e] : "&" + e + ";"; b.push(g); return "" }); if (!c && d) { var d = d.split(","), g = document.createElement("div"), h; g.innerHTML = "&" + d.join(";&") + ";"; h = g.innerHTML; g = null; for (g = 0; g < h.length; g++) { var f = h.charAt(g); a[f] = "&" + d[g] + ";"; b.push(f) } } a.regex =
            b.join(c ? "|" : ""); return a
        } CKEDITOR.plugins.add("entities", {
            afterInit: function (e) {
                var c = e.config; if (e = (e = e.dataProcessor) && e.htmlFilter) {
                    var a = []; c.basicEntities !== false && a.push("nbsp,gt,lt,amp"); if (c.entities) {
                        a.length && a.push("quot,iexcl,cent,pound,curren,yen,brvbar,sect,uml,copy,ordf,laquo,not,shy,reg,macr,deg,plusmn,sup2,sup3,acute,micro,para,middot,cedil,sup1,ordm,raquo,frac14,frac12,frac34,iquest,times,divide,fnof,bull,hellip,prime,Prime,oline,frasl,weierp,image,real,trade,alefsym,larr,uarr,rarr,darr,harr,crarr,lArr,uArr,rArr,dArr,hArr,forall,part,exist,empty,nabla,isin,notin,ni,prod,sum,minus,lowast,radic,prop,infin,ang,and,or,cap,cup,int,there4,sim,cong,asymp,ne,equiv,le,ge,sub,sup,nsub,sube,supe,oplus,otimes,perp,sdot,lceil,rceil,lfloor,rfloor,lang,rang,loz,spades,clubs,hearts,diams,circ,tilde,ensp,emsp,thinsp,zwnj,zwj,lrm,rlm,ndash,mdash,lsquo,rsquo,sbquo,ldquo,rdquo,bdquo,dagger,Dagger,permil,lsaquo,rsaquo,euro");
                        c.entities_latin && a.push("Agrave,Aacute,Acirc,Atilde,Auml,Aring,AElig,Ccedil,Egrave,Eacute,Ecirc,Euml,Igrave,Iacute,Icirc,Iuml,ETH,Ntilde,Ograve,Oacute,Ocirc,Otilde,Ouml,Oslash,Ugrave,Uacute,Ucirc,Uuml,Yacute,THORN,szlig,agrave,aacute,acirc,atilde,auml,aring,aelig,ccedil,egrave,eacute,ecirc,euml,igrave,iacute,icirc,iuml,eth,ntilde,ograve,oacute,ocirc,otilde,ouml,oslash,ugrave,uacute,ucirc,uuml,yacute,thorn,yuml,OElig,oelig,Scaron,scaron,Yuml"); c.entities_greek && a.push("Alpha,Beta,Gamma,Delta,Epsilon,Zeta,Eta,Theta,Iota,Kappa,Lambda,Mu,Nu,Xi,Omicron,Pi,Rho,Sigma,Tau,Upsilon,Phi,Chi,Psi,Omega,alpha,beta,gamma,delta,epsilon,zeta,eta,theta,iota,kappa,lambda,mu,nu,xi,omicron,pi,rho,sigmaf,sigma,tau,upsilon,phi,chi,psi,omega,thetasym,upsih,piv");
                        c.entities_additional && a.push(c.entities_additional)
                    } var b = d(a.join(",")), j = b.regex ? "[" + b.regex + "]" : "a^"; delete b.regex; c.entities && c.entities_processNumerical && (j = "[^ -~]|" + j); var j = RegExp(j, "g"), g = function (a) { return c.entities_processNumerical == "force" || !b[a] ? "&#" + a.charCodeAt(0) + ";" : b[a] }, h = d("nbsp,gt,lt,amp,shy", true), f = RegExp(h.regex, "g"), i = function (a) { return h[a] }; e.addRules({ text: function (a) { return a.replace(f, i).replace(j, g) } }, { applyToAll: true, excludeNestedEditable: true })
                }
            }
        })
    }(), CKEDITOR.config.basicEntities =
    !0, CKEDITOR.config.entities = !0, CKEDITOR.config.entities_latin = !0, CKEDITOR.config.entities_greek = !0, CKEDITOR.config.entities_additional = "#39", CKEDITOR.plugins.add("popup"), CKEDITOR.tools.extend(CKEDITOR.editor.prototype, {
        popup: function (d, e, c, a) {
            e = e || "80%"; c = c || "70%"; typeof e == "string" && (e.length > 1 && e.substr(e.length - 1, 1) == "%") && (e = parseInt(window.screen.width * parseInt(e, 10) / 100, 10)); typeof c == "string" && (c.length > 1 && c.substr(c.length - 1, 1) == "%") && (c = parseInt(window.screen.height * parseInt(c, 10) / 100, 10));
            e < 640 && (e = 640); c < 420 && (c = 420); var b = parseInt((window.screen.height - c) / 2, 10), j = parseInt((window.screen.width - e) / 2, 10), a = (a || "location=no,menubar=no,toolbar=no,dependent=yes,minimizable=no,modal=yes,alwaysRaised=yes,resizable=yes,scrollbars=yes") + ",width=" + e + ",height=" + c + ",top=" + b + ",left=" + j, g = window.open("", null, a, true); if (!g) return false; try { if (navigator.userAgent.toLowerCase().indexOf(" chrome/") == -1) { g.moveTo(j, b); g.resizeTo(e, c) } g.focus(); g.location.href = d } catch (h) { window.open(d, null, a, true) } return true
        }
    }),
    function () {
        function d(a, b) { var c = []; if (b) for (var d in b) c.push(d + "=" + encodeURIComponent(b[d])); else return a; return a + (a.indexOf("?") != -1 ? "&" : "?") + c.join("&") } function e(a) { a = a + ""; return a.charAt(0).toUpperCase() + a.substr(1) } function c() {
            var a = this.getDialog(), b = a.getParentEditor(); b._.filebrowserSe = this; var c = b.config["filebrowser" + e(a.getName()) + "WindowWidth"] || b.config.filebrowserWindowWidth || "80%", a = b.config["filebrowser" + e(a.getName()) + "WindowHeight"] || b.config.filebrowserWindowHeight || "70%",
            g = this.filebrowser.params || {}; g.CKEditor = b.name; g.CKEditorFuncNum = b._.filebrowserFn; if (!g.langCode) g.langCode = b.langCode; g = d(this.filebrowser.url, g); b.popup(g, c, a, b.config.filebrowserWindowFeatures || b.config.fileBrowserWindowFeatures)
        } function a() { var a = this.getDialog(); a.getParentEditor()._.filebrowserSe = this; return !a.getContentElement(this["for"][0], this["for"][1]).getInputElement().$.value || !a.getContentElement(this["for"][0], this["for"][1]).getAction() ? false : true } function b(a, b, c) {
            var e = c.params ||
            {}; e.CKEditor = a.name; e.CKEditorFuncNum = a._.filebrowserFn; if (!e.langCode) e.langCode = a.langCode; b.action = d(c.url, e); b.filebrowser = c
        } function j(d, g, h, o) {
            if (o && o.length) for (var m, q = o.length; q--;) {
                m = o[q]; (m.type == "hbox" || m.type == "vbox" || m.type == "fieldset") && j(d, g, h, m.children); if (m.filebrowser) {
                    if (typeof m.filebrowser == "string") m.filebrowser = { action: m.type == "fileButton" ? "QuickUpload" : "Browse", target: m.filebrowser }; if (m.filebrowser.action == "Browse") {
                        var l = m.filebrowser.url; if (l === void 0) {
                            l = d.config["filebrowser" +
                            e(g) + "BrowseUrl"]; if (l === void 0) l = d.config.filebrowserBrowseUrl
                        } if (l) { m.onClick = c; m.filebrowser.url = l; m.hidden = false }
                    } else if (m.filebrowser.action == "QuickUpload" && m["for"]) { l = m.filebrowser.url; if (l === void 0) { l = d.config["filebrowser" + e(g) + "UploadUrl"]; if (l === void 0) l = d.config.filebrowserUploadUrl } if (l) { var n = m.onClick; m.onClick = function (b) { var c = b.sender; return n && n.call(c, b) === false ? false : a.call(c, b) }; m.filebrowser.url = l; m.hidden = false; b(d, h.getContents(m["for"][0]).get(m["for"][1]), m.filebrowser) } }
                }
            }
        }
        function g(a, b, c) { if (c.indexOf(";") !== -1) { for (var c = c.split(";"), d = 0; d < c.length; d++) if (g(a, b, c[d])) return true; return false } return (a = a.getContents(b).get(c).filebrowser) && a.url } function h(a, b) {
            var c = this._.filebrowserSe.getDialog(), d = this._.filebrowserSe["for"], e = this._.filebrowserSe.filebrowser.onSelect; d && c.getContentElement(d[0], d[1]).reset(); if (!(typeof b == "function" && b.call(this._.filebrowserSe) === false) && !(e && e.call(this._.filebrowserSe, a, b) === false)) {
                typeof b == "string" && b && alert(b); if (a) {
                    d =
                    this._.filebrowserSe; c = d.getDialog(); if (d = d.filebrowser.target || null) { d = d.split(":"); if (e = c.getContentElement(d[0], d[1])) { e.setValue(a); c.selectPage(d[0]) } }
                }
            }
        } CKEDITOR.plugins.add("filebrowser", { requires: "popup", init: function (a) { a._.filebrowserFn = CKEDITOR.tools.addFunction(h, a); a.on("destroy", function () { CKEDITOR.tools.removeFunction(this._.filebrowserFn) }) } }); CKEDITOR.on("dialogDefinition", function (a) {
            if (a.editor.plugins.filebrowser) for (var b = a.data.definition, c, d = 0; d < b.contents.length; ++d) if (c = b.contents[d]) {
                j(a.editor,
                a.data.name, b, c.elements); if (c.hidden && c.filebrowser) c.hidden = !g(b, c.id, c.filebrowser)
            }
        })
    }(), CKEDITOR.plugins.add("find", {
        requires: "dialog", init: function (d) {
            var e = d.addCommand("find", new CKEDITOR.dialogCommand("find")); e.canUndo = false; e.readOnly = 1; d.addCommand("replace", new CKEDITOR.dialogCommand("replace")).canUndo = false; if (d.ui.addButton) { d.ui.addButton("Find", { label: d.lang.find.find, command: "find", toolbar: "find,10" }); d.ui.addButton("Replace", { label: d.lang.find.replace, command: "replace", toolbar: "find,20" }) } CKEDITOR.dialog.add("find",
            this.path + "dialogs/find.js"); CKEDITOR.dialog.add("replace", this.path + "dialogs/find.js")
        }
    }), CKEDITOR.config.find_highlight = { element: "span", styles: { "background-color": "#004", color: "#fff" } }, function () {
        function d(b, c) { var d = a.exec(b), e = a.exec(c); if (d) { if (!d[2] && e[2] == "px") return e[1]; if (d[2] == "px" && !e[2]) return e[1] + "px" } return c } var e = CKEDITOR.htmlParser.cssStyle, c = CKEDITOR.tools.cssLength, a = /^((?:\d*(?:\.\d+))|(?:\d+))(.*)?$/i, b = {
            elements: {
                $: function (a) {
                    var b = a.attributes; if ((b = (b = (b = b && b["data-cke-realelement"]) &&
                    new CKEDITOR.htmlParser.fragment.fromHtml(decodeURIComponent(b))) && b.children[0]) && a.attributes["data-cke-resizable"]) { var c = (new e(a)).rules, a = b.attributes, j = c.width, c = c.height; j && (a.width = d(a.width, j)); c && (a.height = d(a.height, c)) } return b
                }
            }
        }, j = CKEDITOR.plugins.add("fakeobjects", { init: function (a) { a.filter.allow("img[!data-cke-realelement,src,alt,title](*){*}", "fakeobjects") }, afterInit: function (a) { (a = (a = a.dataProcessor) && a.htmlFilter) && a.addRules(b) } }); CKEDITOR.editor.prototype.createFakeElement =
        function (a, b, d, i) {
            var k = this.lang.fakeobjects, k = k[d] || k.unknown, b = { "class": b, "data-cke-realelement": encodeURIComponent(a.getOuterHtml()), "data-cke-real-node-type": a.type, alt: k, title: k, align: a.getAttribute("align") || "" }; if (!CKEDITOR.env.hc) b.src = CKEDITOR.getUrl(j.path + "images/spacer.gif"); d && (b["data-cke-real-element-type"] = d); if (i) { b["data-cke-resizable"] = i; d = new e; i = a.getAttribute("width"); a = a.getAttribute("height"); i && (d.rules.width = c(i)); a && (d.rules.height = c(a)); d.populate(b) } return this.document.createElement("img",
            { attributes: b })
        }; CKEDITOR.editor.prototype.createFakeParserElement = function (a, b, d, i) {
            var k = this.lang.fakeobjects, k = k[d] || k.unknown, o; o = new CKEDITOR.htmlParser.basicWriter; a.writeHtml(o); o = o.getHtml(); b = { "class": b, "data-cke-realelement": encodeURIComponent(o), "data-cke-real-node-type": a.type, alt: k, title: k, align: a.attributes.align || "" }; if (!CKEDITOR.env.hc) b.src = CKEDITOR.getUrl(j.path + "images/spacer.gif"); d && (b["data-cke-real-element-type"] = d); if (i) {
                b["data-cke-resizable"] = i; i = a.attributes; a = new e; d =
                i.width; i = i.height; d != void 0 && (a.rules.width = c(d)); i != void 0 && (a.rules.height = c(i)); a.populate(b)
            } return new CKEDITOR.htmlParser.element("img", b)
        }; CKEDITOR.editor.prototype.restoreRealElement = function (a) {
            if (a.data("cke-real-node-type") != CKEDITOR.NODE_ELEMENT) return null; var b = CKEDITOR.dom.element.createFromHtml(decodeURIComponent(a.data("cke-realelement")), this.document); if (a.data("cke-resizable")) {
                var c = a.getStyle("width"), a = a.getStyle("height"); c && b.setAttribute("width", d(b.getAttribute("width"),
                c)); a && b.setAttribute("height", d(b.getAttribute("height"), a))
            } return b
        }
    }(), function () {
        function d(a) { a = a.attributes; return a.type == "application/x-shockwave-flash" || c.test(a.src || "") } function e(a, b) { return a.createFakeParserElement(b, "cke_flash", "flash", true) } var c = /\.swf(?:$|\?)/i; CKEDITOR.plugins.add("flash", {
            requires: "dialog,fakeobjects", onLoad: function () { CKEDITOR.addCss("img.cke_flash{background-image: url(" + CKEDITOR.getUrl(this.path + "images/placeholder.png") + ");background-position: center center;background-repeat: no-repeat;border: 1px solid #a9a9a9;width: 80px;height: 80px;}") },
            init: function (a) {
                var b = "object[classid,codebase,height,hspace,vspace,width];param[name,value];embed[height,hspace,pluginspage,src,type,vspace,width]"; CKEDITOR.dialog.isTabEnabled(a, "flash", "properties") && (b = b + ";object[align]; embed[allowscriptaccess,quality,scale,wmode]"); CKEDITOR.dialog.isTabEnabled(a, "flash", "advanced") && (b = b + ";object[id]{*}; embed[bgcolor]{*}(*)"); a.addCommand("flash", new CKEDITOR.dialogCommand("flash", { allowedContent: b, requiredContent: "embed" })); a.ui.addButton && a.ui.addButton("Flash",
                { label: a.lang.common.flash, command: "flash", toolbar: "insert,20" }); CKEDITOR.dialog.add("flash", this.path + "dialogs/flash.js"); a.addMenuItems && a.addMenuItems({ flash: { label: a.lang.flash.properties, command: "flash", group: "flash" } }); a.on("doubleclick", function (a) { var b = a.data.element; if (b.is("img") && b.data("cke-real-element-type") == "flash") a.data.dialog = "flash" }); a.contextMenu && a.contextMenu.addListener(function (a) { if (a && a.is("img") && !a.isReadOnly() && a.data("cke-real-element-type") == "flash") return { flash: CKEDITOR.TRISTATE_OFF } })
            },
            afterInit: function (a) { var b = a.dataProcessor; (b = b && b.dataFilter) && b.addRules({ elements: { "cke:object": function (b) { var c = b.attributes; if ((!c.classid || !("" + c.classid).toLowerCase()) && !d(b)) { for (c = 0; c < b.children.length; c++) if (b.children[c].name == "cke:embed") { if (!d(b.children[c])) break; return e(a, b) } return null } return e(a, b) }, "cke:embed": function (b) { return !d(b) ? null : e(a, b) } } }, 5) }
        })
    }(), CKEDITOR.tools.extend(CKEDITOR.config, { flashEmbedTagOnly: !1, flashAddEmbedTag: !0, flashConvertOnEdit: !1 }), function () {
        function d(b) {
            var d =
            b.config, g = b.fire("uiSpace", { space: "top", html: "" }).html, h = function () {
                function e(b, c, d) { f.setStyle(c, a(d)); f.setStyle("position", b) } function g(a) { var b = l.getDocumentPosition(); switch (a) { case "top": e("absolute", "top", b.y - w - u); break; case "pin": e("fixed", "top", x + A); break; case "bottom": e("absolute", "top", b.y + (k.height || k.bottom - k.top) + u) } i = a } var i, l, n, k, p, w, y, A = $cmsj("#CMSHeaderDiv").outerHeight(), v = d.floatSpaceDockedOffsetX || 0, u = d.floatSpaceDockedOffsetY || 0, s = d.floatSpacePinnedOffsetX || 0, x = d.floatSpacePinnedOffsetY ||
                0; return function (d) {
                    if (l = b.editable()) {
                        d && d.name == "focus" && f.show(); f.removeStyle("left"); f.removeStyle("right"); n = f.getClientRect(); k = l.getClientRect(); p = c.getViewPaneSize(); w = n.height; y = "pageXOffset" in c.$ ? c.$.pageXOffset : CKEDITOR.document.$.documentElement.scrollLeft; if (i) {
                            w + u <= k.top - A ? g("top") : w + u > p.height - k.bottom - A ? g("pin") : g("bottom"); var d = p.width / 2, d = k.left > 0 && k.right < p.width && k.width > n.width ? b.config.contentsLangDirection == "rtl" ? "right" : "left" : d - k.left > k.right - d ? "left" : "right", e; if (n.width >
                            p.width) { d = "left"; e = 0 } else { e = d == "left" ? k.left > 0 ? k.left : 0 : k.right < p.width ? p.width - k.right : 0; if (e + n.width > p.width) { d = d == "left" ? "right" : "left"; e = 0 } } f.setStyle(d, a((i == "pin" ? s : v) + e + (i == "pin" ? 0 : d == "left" ? y : -y)))
                        } else { i = "pin"; g("pin"); h(d) }
                    }
                }
            }(); if (g) {
                var f = CKEDITOR.document.getBody().append(CKEDITOR.dom.element.createFromHtml(e.output({
                    content: g, id: b.id, langDir: b.lang.dir, langCode: b.langCode, name: b.name, style: "display:none;z-index:" + (d.baseFloatZIndex - 1), topId: b.ui.spaceId("top"), voiceLabel: b.lang.editorPanel +
                    ", " + b.name
                }))), i = CKEDITOR.tools.eventsBuffer(500, h), k = CKEDITOR.tools.eventsBuffer(100, h); f.unselectable(); f.on("mousedown", function (a) { a = a.data; a.getTarget().hasAscendant("a", 1) || a.preventDefault() }); b.on("focus", function (a) { h(a); b.on("change", i.input); c.on("scroll", k.input); c.on("resize", k.input) }); b.on("blur", function () { f.hide(); b.removeListener("change", i.input); c.removeListener("scroll", k.input); c.removeListener("resize", k.input) }); b.on("destroy", function () {
                    c.removeListener("scroll", k.input);
                    c.removeListener("resize", k.input); f.clearCustomData(); f.remove()
                }); b.focusManager.hasFocus && f.show(); b.focusManager.add(f, 1)
            }
        } var e = CKEDITOR.addTemplate("floatcontainer", '<div id="cke_{name}" class="cke {id} cke_reset_all cke_chrome cke_editor_{name} cke_float cke_{langDir} ' + CKEDITOR.env.cssClass + '" dir="{langDir}" title="' + (CKEDITOR.env.gecko ? " " : "") + '" lang="{langCode}" role="application" style="{style}" aria-labelledby="cke_{name}_arialbl"><span id="cke_{name}_arialbl" class="cke_voice_label">{voiceLabel}</span><div class="cke_inner"><div id="{topId}" class="cke_top" role="presentation">{content}</div></div></div>'),
        c = CKEDITOR.document.getWindow(), a = CKEDITOR.tools.cssLength; CKEDITOR.plugins.add("floatingspace", { init: function (a) { a.on("loaded", function () { d(this) }, null, null, 20) } })
    }(), CKEDITOR.plugins.add("listblock", {
        requires: "panel", onLoad: function () {
            var d = CKEDITOR.addTemplate("panel-list", '<ul role="presentation" class="cke_panel_list">{items}</ul>'), e = CKEDITOR.addTemplate("panel-list-item", '<li id="{id}" class="cke_panel_listItem" role=presentation><a id="{id}_option" _cke_focus=1 hidefocus=true title="{title}" href="javascript:void(\'{val}\')"  {onclick}="CKEDITOR.tools.callFunction({clickFn},\'{val}\'); return false;" role="option">{text}</a></li>'),
            c = CKEDITOR.addTemplate("panel-list-group", '<h1 id="{id}" class="cke_panel_grouptitle" role="presentation" >{label}</h1>'), a = /\'/g; CKEDITOR.ui.panel.prototype.addListBlock = function (a, c) { return this.addBlock(a, new CKEDITOR.ui.listBlock(this.getHolderElement(), c)) }; CKEDITOR.ui.listBlock = CKEDITOR.tools.createClass({
                base: CKEDITOR.ui.panel.block, $: function (a, c) {
                    var c = c || {}, d = c.attributes || (c.attributes = {}); (this.multiSelect = !!c.multiSelect) && (d["aria-multiselectable"] = true); !d.role && (d.role = "listbox");
                    this.base.apply(this, arguments); this.element.setAttribute("role", d.role); d = this.keys; d[40] = "next"; d[9] = "next"; d[38] = "prev"; d[CKEDITOR.SHIFT + 9] = "prev"; d[32] = CKEDITOR.env.ie ? "mouseup" : "click"; CKEDITOR.env.ie && (d[13] = "mouseup"); this._.pendingHtml = []; this._.pendingList = []; this._.items = {}; this._.groups = {}
                }, _: {
                    close: function () { if (this._.started) { var a = d.output({ items: this._.pendingList.join("") }); this._.pendingList = []; this._.pendingHtml.push(a); delete this._.started } }, getClick: function () {
                        if (!this._.click) this._.click =
                        CKEDITOR.tools.addFunction(function (a) { var c = this.toggle(a); if (this.onClick) this.onClick(a, c) }, this); return this._.click
                    }
                }, proto: {
                    add: function (b, c, d) { var h = CKEDITOR.tools.getNextId(); if (!this._.started) { this._.started = 1; this._.size = this._.size || 0 } this._.items[b] = h; var f; f = CKEDITOR.tools.htmlEncodeAttr(b).replace(a, "\\'"); b = { id: h, val: f, onclick: CKEDITOR.env.ie ? 'onclick="return false;" onmouseup' : "onclick", clickFn: this._.getClick(), title: CKEDITOR.tools.htmlEncodeAttr(d || b), text: c || b }; this._.pendingList.push(e.output(b)) },
                    startGroup: function (a) { this._.close(); var d = CKEDITOR.tools.getNextId(); this._.groups[a] = d; this._.pendingHtml.push(c.output({ id: d, label: a })) }, commit: function () { this._.close(); this.element.appendHtml(this._.pendingHtml.join("")); delete this._.size; this._.pendingHtml = [] }, toggle: function (a) { var c = this.isMarked(a); c ? this.unmark(a) : this.mark(a); return !c }, hideGroup: function (a) {
                        var c = (a = this.element.getDocument().getById(this._.groups[a])) && a.getNext(); if (a) {
                            a.setStyle("display", "none"); c && c.getName() == "ul" &&
                            c.setStyle("display", "none")
                        }
                    }, hideItem: function (a) { this.element.getDocument().getById(this._.items[a]).setStyle("display", "none") }, showAll: function () { var a = this._.items, c = this._.groups, d = this.element.getDocument(), e; for (e in a) d.getById(a[e]).setStyle("display", ""); for (var f in c) { a = d.getById(c[f]); e = a.getNext(); a.setStyle("display", ""); e && e.getName() == "ul" && e.setStyle("display", "") } }, mark: function (a) {
                        this.multiSelect || this.unmarkAll(); var a = this._.items[a], c = this.element.getDocument().getById(a);
                        c.addClass("cke_selected"); this.element.getDocument().getById(a + "_option").setAttribute("aria-selected", true); this.onMark && this.onMark(c)
                    }, unmark: function (a) { var c = this.element.getDocument(), a = this._.items[a], d = c.getById(a); d.removeClass("cke_selected"); c.getById(a + "_option").removeAttribute("aria-selected"); this.onUnmark && this.onUnmark(d) }, unmarkAll: function () {
                        var a = this._.items, c = this.element.getDocument(), d; for (d in a) { var e = a[d]; c.getById(e).removeClass("cke_selected"); c.getById(e + "_option").removeAttribute("aria-selected") } this.onUnmark &&
                        this.onUnmark()
                    }, isMarked: function (a) { return this.element.getDocument().getById(this._.items[a]).hasClass("cke_selected") }, focus: function (a) { this._.focusIndex = -1; var c = this.element.getElementsByTag("a"), d, e = -1; if (a) for (d = this.element.getDocument().getById(this._.items[a]).getFirst() ; a = c.getItem(++e) ;) { if (a.equals(d)) { this._.focusIndex = e; break } } else this.element.focus(); d && setTimeout(function () { d.focus() }, 0) }
                }
            })
        }
    }), CKEDITOR.plugins.add("richcombo", {
        requires: "floatpanel,listblock,button", beforeInit: function (d) {
            d.ui.addHandler(CKEDITOR.UI_RICHCOMBO,
            CKEDITOR.ui.richCombo.handler)
        }
    }), function () {
        var d = '<span id="{id}" class="cke_combo cke_combo__{name} {cls}" role="presentation"><span id="{id}_label" class="cke_combo_label">{label}</span><a class="cke_combo_button" hidefocus=true title="{title}" tabindex="-1"' + (CKEDITOR.env.gecko && CKEDITOR.env.version >= 10900 && !CKEDITOR.env.hc ? "" : '" href="javascript:void(\'{titleJs}\')"') + ' hidefocus="true" role="button" aria-labelledby="{id}_label" aria-haspopup="true"'; if (CKEDITOR.env.opera || CKEDITOR.env.gecko &&
        CKEDITOR.env.mac) d = d + ' onkeypress="return false;"'; CKEDITOR.env.gecko && (d = d + ' onblur="this.style.cssText = this.style.cssText;"'); var d = d + (' onkeydown="return CKEDITOR.tools.callFunction({keydownFn},event,this);" onmousedown="return CKEDITOR.tools.callFunction({mousedownFn},event);"  onfocus="return CKEDITOR.tools.callFunction({focusFn},event);" ' + (CKEDITOR.env.ie ? 'onclick="return false;" onmouseup' : "onclick") + '="CKEDITOR.tools.callFunction({clickFn},this);return false;"><span id="{id}_text" class="cke_combo_text cke_combo_inlinelabel">{label}</span><span class="cke_combo_open"><span class="cke_combo_arrow">' +
        (CKEDITOR.env.hc ? "&#9660;" : CKEDITOR.env.air ? "&nbsp;" : "") + "</span></span></a></span>"), e = CKEDITOR.addTemplate("combo", d); CKEDITOR.UI_RICHCOMBO = "richcombo"; CKEDITOR.ui.richCombo = CKEDITOR.tools.createClass({
            $: function (c) {
                CKEDITOR.tools.extend(this, c, { canGroup: false, title: c.label, modes: { wysiwyg: 1 }, editorFocus: 1 }); c = this.panel || {}; delete this.panel; this.id = CKEDITOR.tools.getNextNumber(); this.document = c.parent && c.parent.getDocument() || CKEDITOR.document; c.className = "cke_combopanel"; c.block = {
                    multiSelect: c.multiSelect,
                    attributes: c.attributes
                }; c.toolbarRelated = true; this._ = { panelDefinition: c, items: {} }
            }, proto: {
                renderHtml: function (c) { var a = []; this.render(c, a); return a.join("") }, render: function (c, a) {
                    function b() { var a = this.modes[c.mode] ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED; if (c.readOnly && !this.readOnly) a = CKEDITOR.TRISTATE_DISABLED; this.setState(a); this.setValue(""); a != CKEDITOR.TRISTATE_DISABLED && this.refresh && this.refresh() } var d = CKEDITOR.env, g = "cke_" + this.id, h = CKEDITOR.tools.addFunction(function (a) {
                        if (m) {
                            c.unlockSelection(1);
                            m = 0
                        } i.execute(a)
                    }, this), f = this, i = { id: g, combo: this, focus: function () { CKEDITOR.document.getById(g).getChild(1).focus() }, execute: function (a) { var b = f._; if (b.state != CKEDITOR.TRISTATE_DISABLED) { f.createPanel(c); if (b.on) b.panel.hide(); else { f.commit(); var d = f.getValue(); d ? b.list.mark(d) : b.list.unmarkAll(); b.panel.showBlock(f.id, new CKEDITOR.dom.element(a), 4) } } }, clickFn: h }; c.on("activeFilterChange", b, this); c.on("mode", b, this); !this.readOnly && c.on("readOnly", b, this); var k = CKEDITOR.tools.addFunction(function (a,
                    b) { var a = new CKEDITOR.dom.event(a), d = a.getKeystroke(); if (d == 40) c.once("panelShow", function (a) { a.data._.panel._.currentBlock.onKeyDown(40) }); switch (d) { case 13: case 32: case 40: CKEDITOR.tools.callFunction(h, b); break; default: i.onkey(i, d) } a.preventDefault() }), o = CKEDITOR.tools.addFunction(function () { i.onfocus && i.onfocus() }), m = 0, q = CKEDITOR.tools.addFunction(function () { if (CKEDITOR.env.opera) { var a = c.editable(); if (a.isInline() && a.hasFocus) { c.lockSelection(); m = 1 } } }); i.keyDownFn = k; d = {
                        id: g, name: this.name || this.command,
                        label: this.label, title: this.title, cls: this.className || "", titleJs: d.gecko && d.version >= 10900 && !d.hc ? "" : (this.title || "").replace("'", ""), keydownFn: k, mousedownFn: q, focusFn: o, clickFn: h
                    }; e.output(d, a); if (this.onRender) this.onRender(); return i
                }, createPanel: function (c) {
                    if (!this._.panel) {
                        var a = this._.panelDefinition, b = this._.panelDefinition.block, d = a.parent || CKEDITOR.document.getBody(), e = "cke_combopanel__" + this.name, h = new CKEDITOR.ui.floatPanel(c, d, a), f = h.addListBlock(this.id, b), i = this; h.onShow = function () {
                            this.element.addClass(e);
                            i.setState(CKEDITOR.TRISTATE_ON); i._.on = 1; i.editorFocus && !c.focusManager.hasFocus && c.focus(); if (i.onOpen) i.onOpen(); c.once("panelShow", function () { f.focus(!f.multiSelect && i.getValue()) })
                        }; h.onHide = function (a) { this.element.removeClass(e); i.setState(i.modes && i.modes[c.mode] ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED); i._.on = 0; if (!a && i.onClose) i.onClose() }; h.onEscape = function () { h.hide(1) }; f.onClick = function (a, b) { i.onClick && i.onClick.call(i, a, b); h.hide() }; this._.panel = h; this._.list = f; h.getBlock(this.id).onHide =
                        function () { i._.on = 0; i.setState(CKEDITOR.TRISTATE_OFF) }; this.init && this.init()
                    }
                }, setValue: function (c, a) { this._.value = c; var b = this.document.getById("cke_" + this.id + "_text"); if (b) { if (!c && !a) { a = this.label; b.addClass("cke_combo_inlinelabel") } else b.removeClass("cke_combo_inlinelabel"); b.setText(typeof a != "undefined" ? a : c) } }, getValue: function () { return this._.value || "" }, unmarkAll: function () { this._.list.unmarkAll() }, mark: function (c) { this._.list.mark(c) }, hideItem: function (c) { this._.list.hideItem(c) }, hideGroup: function (c) { this._.list.hideGroup(c) },
                showAll: function () { this._.list.showAll() }, add: function (c, a, b) { this._.items[c] = b || c; this._.list.add(c, a, b) }, startGroup: function (c) { this._.list.startGroup(c) }, commit: function () { if (!this._.committed) { this._.list.commit(); this._.committed = 1; CKEDITOR.ui.fire("ready", this) } this._.committed = 1 }, setState: function (c) {
                    if (this._.state != c) {
                        var a = this.document.getById("cke_" + this.id); a.setState(c, "cke_combo"); c == CKEDITOR.TRISTATE_DISABLED ? a.setAttribute("aria-disabled", true) : a.removeAttribute("aria-disabled");
                        this._.state = c
                    }
                }, getState: function () { return this._.state }, enable: function () { this._.state == CKEDITOR.TRISTATE_DISABLED && this.setState(this._.lastState) }, disable: function () { if (this._.state != CKEDITOR.TRISTATE_DISABLED) { this._.lastState = this._.state; this.setState(CKEDITOR.TRISTATE_DISABLED) } }
            }, statics: { handler: { create: function (c) { return new CKEDITOR.ui.richCombo(c) } } }
        }); CKEDITOR.ui.prototype.addRichCombo = function (c, a) { this.add(c, CKEDITOR.UI_RICHCOMBO, a) }
    }(), function () {
        function d(d, c, a, b, j, g, h, f) {
            for (var i =
            d.config, k = new CKEDITOR.style(h), o = j.split(";"), j = [], m = {}, q = 0; q < o.length; q++) { var l = o[q]; if (l) { var l = l.split("/"), n = {}, r = o[q] = l[0]; n[a] = j[q] = l[1] || r; m[r] = new CKEDITOR.style(h, n); m[r]._.definition.name = r } else o.splice(q--, 1) } d.ui.addRichCombo(c, {
                label: b.label, title: b.panelTitle, toolbar: "styles," + f, allowedContent: k, requiredContent: k, panel: { css: [CKEDITOR.skin.getPath("editor")].concat(i.contentsCss), multiSelect: false, attributes: { "aria-label": b.panelTitle } }, init: function () {
                    this.startGroup(b.panelTitle);
                    for (var a = 0; a < o.length; a++) { var c = o[a]; this.add(c, m[c].buildPreview(), c) }
                }, onClick: function (a) { d.focus(); d.fire("saveSnapshot"); var b = m[a]; d[this.getValue() == a ? "removeStyle" : "applyStyle"](b); d.fire("saveSnapshot") }, onRender: function () { d.on("selectionChange", function (a) { for (var b = this.getValue(), a = a.data.path.elements, c = 0, d; c < a.length; c++) { d = a[c]; for (var e in m) if (m[e].checkElementMatch(d, true)) { e != b && this.setValue(e); return } } this.setValue("", g) }, this) }, refresh: function () {
                    d.activeFilter.check(k) ||
                    this.setState(CKEDITOR.TRISTATE_DISABLED)
                }
            })
        } CKEDITOR.plugins.add("font", { requires: "richcombo", init: function (e) { var c = e.config; d(e, "Font", "family", e.lang.font, c.font_names, c.font_defaultLabel, c.font_style, 30); d(e, "FontSize", "size", e.lang.font.fontSize, c.fontSize_sizes, c.fontSize_defaultLabel, c.fontSize_style, 40) } })
    }(), CKEDITOR.config.font_names = "Arial/Arial, Helvetica, sans-serif;Comic Sans MS/Comic Sans MS, cursive;Courier New/Courier New, Courier, monospace;Georgia/Georgia, serif;Lucida Sans Unicode/Lucida Sans Unicode, Lucida Grande, sans-serif;Tahoma/Tahoma, Geneva, sans-serif;Times New Roman/Times New Roman, Times, serif;Trebuchet MS/Trebuchet MS, Helvetica, sans-serif;Verdana/Verdana, Geneva, sans-serif",
    CKEDITOR.config.font_defaultLabel = "", CKEDITOR.config.font_style = { element: "span", styles: { "font-family": "#(family)" }, overrides: [{ element: "font", attributes: { face: null } }] }, CKEDITOR.config.fontSize_sizes = "8/8px;9/9px;10/10px;11/11px;12/12px;14/14px;16/16px;18/18px;20/20px;22/22px;24/24px;26/26px;28/28px;36/36px;48/48px;72/72px", CKEDITOR.config.fontSize_defaultLabel = "", CKEDITOR.config.fontSize_style = { element: "span", styles: { "font-size": "#(size)" }, overrides: [{ element: "font", attributes: { size: null } }] }, CKEDITOR.plugins.add("format",
    {
        requires: "richcombo", init: function (d) {
            if (!d.blockless) {
                for (var e = d.config, c = d.lang.format, a = e.format_tags.split(";"), b = {}, j = 0, g = [], h = 0; h < a.length; h++) { var f = a[h], i = new CKEDITOR.style(e["format_" + f]); if (!d.filter.customConfig || d.filter.check(i)) { j++; b[f] = i; b[f]._.enterMode = d.config.enterMode; g.push(i) } } j !== 0 && d.ui.addRichCombo("Format", {
                    label: c.label, title: c.panelTitle, toolbar: "styles,20", allowedContent: g, panel: { css: [CKEDITOR.skin.getPath("editor")].concat(e.contentsCss), multiSelect: false, attributes: { "aria-label": c.panelTitle } },
                    init: function () { this.startGroup(c.panelTitle); for (var a in b) { var d = c["tag_" + a]; this.add(a, b[a].buildPreview(d), d) } }, onClick: function (a) { d.focus(); d.fire("saveSnapshot"); var a = b[a], c = d.elementPath(); d[a.checkActive(c) ? "removeStyle" : "applyStyle"](a); setTimeout(function () { d.fire("saveSnapshot") }, 0) }, onRender: function () {
                        d.on("selectionChange", function (a) { var c = this.getValue(), a = a.data.path; this.refresh(); for (var e in b) if (b[e].checkActive(a)) { e != c && this.setValue(e, d.lang.format["tag_" + e]); return } this.setValue("") },
                        this)
                    }, onOpen: function () { this.showAll(); for (var a in b) d.activeFilter.check(b[a]) || this.hideItem(a) }, refresh: function () { var a = d.elementPath(); if (a) { if (a.isContextFor("p")) for (var c in b) if (d.activeFilter.check(b[c])) return; this.setState(CKEDITOR.TRISTATE_DISABLED) } }
                })
            }
        }
    }), CKEDITOR.config.format_tags = "p;h1;h2;h3;h4;h5;h6;pre;address;div", CKEDITOR.config.format_p = { element: "p" }, CKEDITOR.config.format_div = { element: "div" }, CKEDITOR.config.format_pre = { element: "pre" }, CKEDITOR.config.format_address = { element: "address" },
    CKEDITOR.config.format_h1 = { element: "h1" }, CKEDITOR.config.format_h2 = { element: "h2" }, CKEDITOR.config.format_h3 = { element: "h3" }, CKEDITOR.config.format_h4 = { element: "h4" }, CKEDITOR.config.format_h5 = { element: "h5" }, CKEDITOR.config.format_h6 = { element: "h6" }, function () {
        var d = { canUndo: false, exec: function (d) { var c = d.document.createElement("hr"); d.insertElement(c) }, allowedContent: "hr", requiredContent: "hr" }; CKEDITOR.plugins.add("horizontalrule", {
            init: function (e) {
                if (!e.blockless) {
                    e.addCommand("horizontalrule", d); e.ui.addButton &&
                    e.ui.addButton("HorizontalRule", { label: e.lang.horizontalrule.toolbar, command: "horizontalrule", toolbar: "insert,40" })
                }
            }
        })
    }(), CKEDITOR.plugins.add("htmlwriter", { init: function (d) { var e = new CKEDITOR.htmlWriter; e.forceSimpleAmpersand = d.config.forceSimpleAmpersand; e.indentationChars = d.config.dataIndentationChars || "\t"; d.dataProcessor.writer = e } }), CKEDITOR.htmlWriter = CKEDITOR.tools.createClass({
        base: CKEDITOR.htmlParser.basicWriter, $: function () {
            this.base(); this.indentationChars = "\t"; this.selfClosingEnd = " />";
            this.lineBreakChars = "\n"; this.sortAttributes = 1; this._.indent = 0; this._.indentation = ""; this._.inPre = 0; this._.rules = {}; var d = CKEDITOR.dtd, e; for (e in CKEDITOR.tools.extend({}, d.$nonBodyContent, d.$block, d.$listItem, d.$tableContent)) this.setRules(e, { indent: !d[e]["#"], breakBeforeOpen: 1, breakBeforeClose: !d[e]["#"], breakAfterClose: 1, needsSpace: e in d.$block && !(e in { li: 1, dt: 1, dd: 1 }) }); this.setRules("br", { breakAfterOpen: 1 }); this.setRules("title", { indent: 0, breakAfterOpen: 0 }); this.setRules("style", { indent: 0, breakBeforeClose: 1 });
            this.setRules("pre", { breakAfterOpen: 1, indent: 0 })
        }, proto: {
            openTag: function (d) { var e = this._.rules[d]; this._.afterCloser && (e && e.needsSpace && this._.needsSpace) && this._.output.push("\n"); if (this._.indent) this.indentation(); else if (e && e.breakBeforeOpen) { this.lineBreak(); this.indentation() } this._.output.push("<", d); this._.afterCloser = 0 }, openTagClose: function (d, e) {
                var c = this._.rules[d]; if (e) { this._.output.push(this.selfClosingEnd); if (c && c.breakAfterClose) this._.needsSpace = c.needsSpace } else {
                    this._.output.push(">");
                    if (c && c.indent) this._.indentation = this._.indentation + this.indentationChars
                } c && c.breakAfterOpen && this.lineBreak(); d == "pre" && (this._.inPre = 1)
            }, attribute: function (d, e) { if (typeof e == "string") { this.forceSimpleAmpersand && (e = e.replace(/&amp;/g, "&")); e = CKEDITOR.tools.htmlEncodeAttr(e) } this._.output.push(" ", d, '="', e, '"') }, closeTag: function (d) {
                var e = this._.rules[d]; if (e && e.indent) this._.indentation = this._.indentation.substr(this.indentationChars.length); if (this._.indent) this.indentation(); else if (e && e.breakBeforeClose) {
                    this.lineBreak();
                    this.indentation()
                } this._.output.push("</", d, ">"); d == "pre" && (this._.inPre = 0); if (e && e.breakAfterClose) { this.lineBreak(); this._.needsSpace = e.needsSpace } this._.afterCloser = 1
            }, text: function (d) { if (this._.indent) { this.indentation(); !this._.inPre && (d = CKEDITOR.tools.ltrim(d)) } this._.output.push(d) }, comment: function (d) { this._.indent && this.indentation(); this._.output.push("<\!--", d, "--\>") }, lineBreak: function () { !this._.inPre && this._.output.length > 0 && this._.output.push(this.lineBreakChars); this._.indent = 1 },
            indentation: function () { !this._.inPre && this._.indentation && this._.output.push(this._.indentation); this._.indent = 0 }, reset: function () { this._.output = []; this._.indent = 0; this._.indentation = ""; this._.afterCloser = 0; this._.inPre = 0 }, setRules: function (d, e) { var c = this._.rules[d]; c ? CKEDITOR.tools.extend(c, e, true) : this._.rules[d] = e }
        }
    }), function () {
        function d(c, a) { a || (a = c.getSelection().getSelectedElement()); if (a && a.is("img") && !a.data("cke-realelement") && !a.isReadOnly()) return a } function e(c) {
            var a = c.getStyle("float");
            if (a == "inherit" || a == "none") a = 0; a || (a = c.getAttribute("align")); return a
        } CKEDITOR.plugins.add("image", {
            requires: "dialog", init: function (c) {
                if (!c.plugins.image2) {
                    CKEDITOR.dialog.add("image", this.path + "dialogs/image.js"); var a = "img[alt,!src]{border-style,border-width,float,height,margin,margin-bottom,margin-left,margin-right,margin-top,width}"; CKEDITOR.dialog.isTabEnabled(c, "image", "advanced") && (a = "img[alt,dir,id,lang,longdesc,!src,title]{*}(*)"); c.addCommand("image", new CKEDITOR.dialogCommand("image",
                    { allowedContent: a, requiredContent: "img[alt,src]", contentTransformations: [["img{width}: sizeToStyle", "img[width]: sizeToAttribute"], ["img{float}: alignmentToStyle", "img[align]: alignmentToAttribute"]] })); c.ui.addButton && c.ui.addButton("Image", { label: c.lang.common.image, command: "image", toolbar: "insert,10" }); c.on("doubleclick", function (a) { var c = a.data.element; if (c.is("img") && !c.data("cke-realelement") && !c.isReadOnly()) a.data.dialog = "image" }); c.addMenuItems && c.addMenuItems({
                        image: {
                            label: c.lang.image.menu,
                            command: "image", group: "image"
                        }
                    }); c.contextMenu && c.contextMenu.addListener(function (a) { if (d(c, a)) return { image: CKEDITOR.TRISTATE_OFF } })
                }
            }, afterInit: function (c) {
                function a(a) {
                    var j = c.getCommand("justify" + a); if (j) {
                        if (a == "left" || a == "right") j.on("exec", function (g) { var h = d(c), f; if (h) { f = e(h); if (f == a) { h.removeStyle("float"); a == e(h) && h.removeAttribute("align") } else h.setStyle("float", a); g.cancel() } }); j.on("refresh", function (g) {
                            var h = d(c); if (h) {
                                h = e(h); this.setState(h == a ? CKEDITOR.TRISTATE_ON : a == "right" || a == "left" ?
                                CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED); g.cancel()
                            }
                        })
                    }
                } if (!c.plugins.image2) { a("left"); a("right"); a("center"); a("block") }
            }
        })
    }(), CKEDITOR.config.image_removeLinkByEmptyURL = !0, function () {
        function d(a, b) {
            var d, g; b.on("refresh", function (a) { var b = [e], d; for (d in a.data.states) b.push(a.data.states[d]); this.setState(CKEDITOR.tools.search(b, c) ? c : e) }, b, null, 100); b.on("exec", function (b) { d = a.getSelection(); g = d.createBookmarks(1); if (!b.data) b.data = {}; b.data.done = false }, b, null, 0); b.on("exec", function () {
                a.forceNextSelectionCheck();
                d.selectBookmarks(g)
            }, b, null, 100)
        } var e = CKEDITOR.TRISTATE_DISABLED, c = CKEDITOR.TRISTATE_OFF; CKEDITOR.plugins.add("indent", {
            init: function (a) {
                var b = CKEDITOR.plugins.indent.genericDefinition; d(a, a.addCommand("indent", new b(true))); d(a, a.addCommand("outdent", new b)); if (a.ui.addButton) { a.ui.addButton("Indent", { label: a.lang.indent.indent, command: "indent", directional: true, toolbar: "indent,20" }); a.ui.addButton("Outdent", { label: a.lang.indent.outdent, command: "outdent", directional: true, toolbar: "indent,10" }) } a.on("dirChanged",
                function (b) {
                    var c = a.createRange(), d = b.data.node; c.setStartBefore(d); c.setEndAfter(d); for (var e = new CKEDITOR.dom.walker(c), i; i = e.next() ;) if (i.type == CKEDITOR.NODE_ELEMENT) if (!i.equals(d) && i.getDirection()) { c.setStartAfter(i); e = new CKEDITOR.dom.walker(c) } else {
                        var k = a.config.indentClasses; if (k) for (var o = b.data.dir == "ltr" ? ["_rtl", ""] : ["", "_rtl"], m = 0; m < k.length; m++) if (i.hasClass(k[m] + o[0])) { i.removeClass(k[m] + o[0]); i.addClass(k[m] + o[1]) } k = i.getStyle("margin-right"); o = i.getStyle("margin-left"); k ? i.setStyle("margin-left",
                        k) : i.removeStyle("margin-left"); o ? i.setStyle("margin-right", o) : i.removeStyle("margin-right")
                    }
                })
            }
        }); CKEDITOR.plugins.indent = {
            genericDefinition: function (a) { this.isIndent = !!a; this.startDisabled = !this.isIndent }, specificDefinition: function (a, b, c) { this.name = b; this.editor = a; this.jobs = {}; this.enterBr = a.config.enterMode == CKEDITOR.ENTER_BR; this.isIndent = !!c; this.relatedGlobal = c ? "indent" : "outdent"; this.indentKey = c ? 9 : CKEDITOR.SHIFT + 9; this.database = {} }, registerCommands: function (a, b) {
                a.on("pluginsLoaded", function () {
                    for (var a in b) (function (a,
                    b) { var c = a.getCommand(b.relatedGlobal), d; for (d in b.jobs) { c.on("exec", function (c) { if (!c.data.done) { a.fire("lockSnapshot"); if (b.execJob(a, d)) c.data.done = true; a.fire("unlockSnapshot"); CKEDITOR.dom.element.clearAllMarkers(b.database) } }, this, null, d); c.on("refresh", function (c) { if (!c.data.states) c.data.states = {}; c.data.states[b.name + "@" + d] = b.refreshJob(a, d, c.data.path) }, this, null, d) } a.addFeature(b) })(this, b[a])
                })
            }
        }; CKEDITOR.plugins.indent.genericDefinition.prototype = { context: "p", exec: function () { } }; CKEDITOR.plugins.indent.specificDefinition.prototype =
        { execJob: function (a, b) { var c = this.jobs[b]; if (c.state != e) return c.exec.call(this, a) }, refreshJob: function (a, b, c) { b = this.jobs[b]; b.state = a.activeFilter.checkFeature(this) ? b.refresh.call(this, a, c) : e; return b.state }, getContext: function (a) { return a.contains(this.context) } }
    }(), function () {
        function d(b) {
            function d(c) {
                for (var i = l.startContainer, j = l.endContainer; i && !i.getParent().equals(c) ;) i = i.getParent(); for (; j && !j.getParent().equals(c) ;) j = j.getParent(); if (!i || !j) return false; for (var n = i, i = [], r = false; !r;) {
                    n.equals(j) &&
                    (r = true); i.push(n); n = n.getNext()
                } if (i.length < 1) return false; n = c.getParents(true); for (j = 0; j < n.length; j++) if (n[j].getName && h[n[j].getName()]) { c = n[j]; break } for (var n = e.isIndent ? 1 : -1, j = i[0], i = i[i.length - 1], r = CKEDITOR.plugins.list.listToArray(c, g), q = r[i.getCustomData("listarray_index")].indent, j = j.getCustomData("listarray_index") ; j <= i.getCustomData("listarray_index") ; j++) { r[j].indent = r[j].indent + n; if (n > 0) { var s = r[j].parent; r[j].parent = new CKEDITOR.dom.element(s.getName(), s.getDocument()) } } for (j = i.getCustomData("listarray_index") +
                1; j < r.length && r[j].indent > q; j++) r[j].indent = r[j].indent + n; i = CKEDITOR.plugins.list.arrayToList(r, g, null, b.config.enterMode, c.getDirection()); if (!e.isIndent) { var x; if ((x = c.getParent()) && x.is("li")) for (var n = i.listNode.getChildren(), t = [], z, j = n.count() - 1; j >= 0; j--) (z = n.getItem(j)) && (z.is && z.is("li")) && t.push(z) } i && i.listNode.replace(c); if (t && t.length) for (j = 0; j < t.length; j++) {
                    for (z = c = t[j]; (z = z.getNext()) && z.is && z.getName() in h;) {
                        CKEDITOR.env.needsNbspFiller && !c.getFirst(a) && c.append(l.document.createText(" "));
                        c.append(z)
                    } c.insertAfter(x)
                } i && b.fire("contentDomInvalidated"); return true
            } for (var e = this, g = this.database, h = this.context, j = b.getSelection(), j = (j && j.getRanges()).createIterator(), l; l = j.getNextRange() ;) {
                for (var n = l.getCommonAncestor() ; n && !(n.type == CKEDITOR.NODE_ELEMENT && h[n.getName()]) ;) n = n.getParent(); n || (n = l.startPath().contains(h)) && l.setEndAt(n, CKEDITOR.POSITION_BEFORE_END); if (!n) {
                    var r = l.getEnclosedNode(); if (r && r.type == CKEDITOR.NODE_ELEMENT && r.getName() in h) {
                        l.setStartAt(r, CKEDITOR.POSITION_AFTER_START);
                        l.setEndAt(r, CKEDITOR.POSITION_BEFORE_END); n = r
                    }
                } if (n && l.startContainer.type == CKEDITOR.NODE_ELEMENT && l.startContainer.getName() in h) { r = new CKEDITOR.dom.walker(l); r.evaluator = c; l.startContainer = r.next() } if (n && l.endContainer.type == CKEDITOR.NODE_ELEMENT && l.endContainer.getName() in h) { r = new CKEDITOR.dom.walker(l); r.evaluator = c; l.endContainer = r.previous() } if (n) return d(n)
            } return 0
        } function e(a, b) { b || (b = a.contains(this.context)); return b && a.block && a.block.equals(b.getFirst(c)) } function c(a) {
            return a.type ==
            CKEDITOR.NODE_ELEMENT && a.is("li")
        } function a(a) { return b(a) && j(a) } var b = CKEDITOR.dom.walker.whitespaces(true), j = CKEDITOR.dom.walker.bookmark(false, true), g = CKEDITOR.TRISTATE_DISABLED, h = CKEDITOR.TRISTATE_OFF; CKEDITOR.plugins.add("indentlist", {
            requires: "indent", init: function (a) {
                function b(a, f) {
                    c.specificDefinition.apply(this, arguments); this.requiredContent = ["ul", "ol"]; a.on("key", function (b) {
                        if (a.mode == "wysiwyg" && b.data.keyCode == this.indentKey) {
                            var c = this.getContext(a.elementPath()); if (c && (!this.isIndent ||
                            !e.call(this, a.elementPath(), c))) { a.execCommand(this.relatedGlobal); b.cancel() }
                        }
                    }, this); this.jobs[this.isIndent ? 10 : 30] = { refresh: this.isIndent ? function (a, b) { var c = this.getContext(b), d = e.call(this, b, c); return !c || !this.isIndent || d ? g : h } : function (a, b) { return !this.getContext(b) || this.isIndent ? g : h }, exec: CKEDITOR.tools.bind(d, this) }
                } var c = CKEDITOR.plugins.indent; c.registerCommands(a, { indentlist: new b(a, "indentlist", true), outdentlist: new b(a, "outdentlist") }); CKEDITOR.tools.extend(b.prototype, c.specificDefinition.prototype,
                { context: { ol: 1, ul: 1 } })
            }
        })
    }(), function () {
        function d(a, b) { var b = b === void 0 || b, c; if (b) c = a.getComputedStyle("text-align"); else { for (; !a.hasAttribute || !a.hasAttribute("align") && !a.getStyle("text-align") ;) { c = a.getParent(); if (!c) break; a = c } c = a.getStyle("text-align") || a.getAttribute("align") || "" } c && (c = c.replace(/(?:-(?:moz|webkit)-)?(?:start|auto)/i, "")); !c && b && (c = a.getComputedStyle("direction") == "rtl" ? "right" : "left"); return c } function e(a, b, c) {
            this.editor = a; this.name = b; this.value = c; this.context = "p"; var b =
            a.config.justifyClasses, d = a.config.enterMode == CKEDITOR.ENTER_P ? "p" : "div"; if (b) { switch (c) { case "left": this.cssClassName = b[0]; break; case "center": this.cssClassName = b[1]; break; case "right": this.cssClassName = b[2]; break; case "justify": this.cssClassName = b[3] } this.cssClassRegex = RegExp("(?:^|\\s+)(?:" + b.join("|") + ")(?=$|\\s)"); this.requiredContent = d + "(" + this.cssClassName + ")" } else this.requiredContent = d + "{text-align}"; this.allowedContent = {
                "caption div h1 h2 h3 h4 h5 h6 p pre td th li": {
                    propertiesOnly: true,
                    styles: this.cssClassName ? null : "text-align", classes: this.cssClassName || null
                }
            }; if (a.config.enterMode == CKEDITOR.ENTER_BR) this.allowedContent.div = true
        } function c(a) {
            var b = a.editor, c = b.createRange(); c.setStartBefore(a.data.node); c.setEndAfter(a.data.node); for (var d = new CKEDITOR.dom.walker(c), e; e = d.next() ;) if (e.type == CKEDITOR.NODE_ELEMENT) if (!e.equals(a.data.node) && e.getDirection()) { c.setStartAfter(e); d = new CKEDITOR.dom.walker(c) } else {
                var f = b.config.justifyClasses; if (f) if (e.hasClass(f[0])) {
                    e.removeClass(f[0]);
                    e.addClass(f[2])
                } else if (e.hasClass(f[2])) { e.removeClass(f[2]); e.addClass(f[0]) } f = e.getStyle("text-align"); f == "left" ? e.setStyle("text-align", "right") : f == "right" && e.setStyle("text-align", "left")
            }
        } e.prototype = {
            exec: function (a) {
                var b = a.getSelection(), c = a.config.enterMode; if (b) {
                    for (var e = b.createBookmarks(), h = b.getRanges(), f = this.cssClassName, i, k, o = a.config.useComputedState, o = o === void 0 || o, m = h.length - 1; m >= 0; m--) {
                        i = h[m].createIterator(); for (i.enlargeBr = c != CKEDITOR.ENTER_BR; k = i.getNextParagraph(c == CKEDITOR.ENTER_P ?
                        "p" : "div") ;) if (!k.isReadOnly()) { k.removeAttribute("align"); k.removeStyle("text-align"); var q = f && (k.$.className = CKEDITOR.tools.ltrim(k.$.className.replace(this.cssClassRegex, ""))), l = this.state == CKEDITOR.TRISTATE_OFF && (!o || d(k, true) != this.value); f ? l ? k.addClass(f) : q || k.removeAttribute("class") : l && k.setStyle("text-align", this.value) }
                    } a.focus(); a.forceNextSelectionCheck(); b.selectBookmarks(e)
                }
            }, refresh: function (a, b) {
                var c = b.block || b.blockLimit; this.setState(c.getName() != "body" && d(c, this.editor.config.useComputedState) ==
                this.value ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF)
            }
        }; CKEDITOR.plugins.add("justify", {
            init: function (a) {
                if (!a.blockless) {
                    var b = new e(a, "justifyleft", "left"), d = new e(a, "justifycenter", "center"), g = new e(a, "justifyright", "right"), h = new e(a, "justifyblock", "justify"); a.addCommand("justifyleft", b); a.addCommand("justifycenter", d); a.addCommand("justifyright", g); a.addCommand("justifyblock", h); if (a.ui.addButton) {
                        a.ui.addButton("JustifyLeft", { label: a.lang.justify.left, command: "justifyleft", toolbar: "align,10" });
                        a.ui.addButton("JustifyCenter", { label: a.lang.justify.center, command: "justifycenter", toolbar: "align,20" }); a.ui.addButton("JustifyRight", { label: a.lang.justify.right, command: "justifyright", toolbar: "align,30" }); a.ui.addButton("JustifyBlock", { label: a.lang.justify.block, command: "justifyblock", toolbar: "align,40" })
                    } a.on("dirChanged", c)
                }
            }
        })
    }(), CKEDITOR.plugins.add("link", {
        requires: "dialog,fakeobjects", onLoad: function () {
            function d(a) {
                return c.replace(/%1/g, a == "rtl" ? "right" : "left").replace(/%2/g, "cke_contents_" +
                a)
            } var e = "background:url(" + CKEDITOR.getUrl(this.path + "images" + (CKEDITOR.env.hidpi ? "/hidpi" : "") + "/anchor.png") + ") no-repeat %1 center;border:1px dotted #00f;background-size:16px;", c = ".%2 a.cke_anchor,.%2 a.cke_anchor_empty,.cke_editable.%2 a[name],.cke_editable.%2 a[data-cke-saved-name]{" + e + "padding-%1:18px;cursor:auto;}" + (CKEDITOR.plugins.link.synAnchorSelector ? "a.cke_anchor_empty{display:inline-block;" + (CKEDITOR.env.ie && CKEDITOR.env.version > 10 ? "min-height:16px;vertical-align:middle" : "") + "}" : "") +
            ".%2 img.cke_anchor{" + e + "width:16px;min-height:15px;height:1.15em;vertical-align:" + (CKEDITOR.env.opera ? "middle" : "text-bottom") + ";}"; CKEDITOR.addCss(d("ltr") + d("rtl"))
        }, init: function (d) {
            var e = "a[!href]"; CKEDITOR.dialog.isTabEnabled(d, "link", "advanced") && (e = e.replace("]", ",accesskey,charset,dir,id,lang,name,rel,tabindex,title,type]{*}(*)")); CKEDITOR.dialog.isTabEnabled(d, "link", "target") && (e = e.replace("]", ",target,onclick]")); d.addCommand("link", new CKEDITOR.dialogCommand("link", { allowedContent: e, requiredContent: "a[href]" }));
            d.addCommand("anchor", new CKEDITOR.dialogCommand("anchor", { allowedContent: "a[!name,id]", requiredContent: "a[name]" })); d.addCommand("unlink", new CKEDITOR.unlinkCommand); d.addCommand("removeAnchor", new CKEDITOR.removeAnchorCommand); d.setKeystroke(CKEDITOR.CTRL + 76, "link"); if (d.ui.addButton) {
                d.ui.addButton("Link", { label: d.lang.link.toolbar, command: "link", toolbar: "links,10" }); d.ui.addButton("Unlink", { label: d.lang.link.unlink, command: "unlink", toolbar: "links,20" }); d.ui.addButton("Anchor", {
                    label: d.lang.link.anchor.toolbar,
                    command: "anchor", toolbar: "links,30"
                })
            } CKEDITOR.dialog.add("link", this.path + "dialogs/link.js"); CKEDITOR.dialog.add("anchor", this.path + "dialogs/anchor.js"); d.on("doubleclick", function (c) { var a = CKEDITOR.plugins.link.getSelectedLink(d) || c.data.element; if (!a.isReadOnly()) if (a.is("a")) { c.data.dialog = a.getAttribute("name") && (!a.getAttribute("href") || !a.getChildCount()) ? "anchor" : "link"; d.getSelection().selectElement(a) } else if (CKEDITOR.plugins.link.tryRestoreFakeAnchor(d, a)) c.data.dialog = "anchor" }); d.addMenuItems &&
            d.addMenuItems({ anchor: { label: d.lang.link.anchor.menu, command: "anchor", group: "anchor", order: 1 }, removeAnchor: { label: d.lang.link.anchor.remove, command: "removeAnchor", group: "anchor", order: 5 }, link: { label: d.lang.link.menu, command: "link", group: "link", order: 1 }, unlink: { label: d.lang.link.unlink, command: "unlink", group: "link", order: 5 } }); d.contextMenu && d.contextMenu.addListener(function (c) {
                if (!c || c.isReadOnly()) return null; c = CKEDITOR.plugins.link.tryRestoreFakeAnchor(d, c); if (!c && !(c = CKEDITOR.plugins.link.getSelectedLink(d))) return null;
                var a = {}; c.getAttribute("href") && c.getChildCount() && (a = { link: CKEDITOR.TRISTATE_OFF, unlink: CKEDITOR.TRISTATE_OFF }); if (c && c.hasAttribute("name")) a.anchor = a.removeAnchor = CKEDITOR.TRISTATE_OFF; return a
            })
        }, afterInit: function (d) {
            var e = d.dataProcessor, c = e && e.dataFilter, e = e && e.htmlFilter, a = d._.elementsPath && d._.elementsPath.filters; c && c.addRules({
                elements: {
                    a: function (a) {
                        var c = a.attributes; if (!c.name) return null; var e = !a.children.length; if (CKEDITOR.plugins.link.synAnchorSelector) {
                            var a = e ? "cke_anchor_empty" :
                            "cke_anchor", h = c["class"]; if (c.name && (!h || h.indexOf(a) < 0)) c["class"] = (h || "") + " " + a; if (e && CKEDITOR.plugins.link.emptyAnchorFix) { c.contenteditable = "false"; c["data-cke-editable"] = 1 }
                        } else if (CKEDITOR.plugins.link.fakeAnchor && e) return d.createFakeParserElement(a, "cke_anchor", "anchor"); return null
                    }
                }
            }); CKEDITOR.plugins.link.emptyAnchorFix && e && e.addRules({ elements: { a: function (a) { delete a.attributes.contenteditable } } }); a && a.push(function (a, c) {
                if (c == "a" && (CKEDITOR.plugins.link.tryRestoreFakeAnchor(d, a) || a.getAttribute("name") &&
                (!a.getAttribute("href") || !a.getChildCount()))) return "anchor"
            })
        }
    }), CKEDITOR.plugins.link = {
        getSelectedLink: function (d) { var e = d.getSelection(), c = e.getSelectedElement(); if (c && c.is("a")) return c; if (e = e.getRanges()[0]) { e.shrink(CKEDITOR.SHRINK_TEXT); return d.elementPath(e.getCommonAncestor()).contains("a", 1) } return null }, fakeAnchor: CKEDITOR.env.opera || CKEDITOR.env.webkit, synAnchorSelector: CKEDITOR.env.ie, emptyAnchorFix: CKEDITOR.env.ie && 8 > CKEDITOR.env.version, tryRestoreFakeAnchor: function (d, e) {
            if (e && e.data("cke-real-element-type") &&
            e.data("cke-real-element-type") == "anchor") { var c = d.restoreRealElement(e); if (c.data("cke-saved-name")) return c }
        }
    }, CKEDITOR.unlinkCommand = function () { }, CKEDITOR.unlinkCommand.prototype = {
        exec: function (d) { var e = new CKEDITOR.style({ element: "a", type: CKEDITOR.STYLE_INLINE, alwaysRemoveElement: 1 }); d.removeStyle(e) }, refresh: function (d, e) { var c = e.lastElement && e.lastElement.getAscendant("a", true); c && c.getName() == "a" && c.getAttribute("href") && c.getChildCount() ? this.setState(CKEDITOR.TRISTATE_OFF) : this.setState(CKEDITOR.TRISTATE_DISABLED) },
        contextSensitive: 1, startDisabled: 1, requiredContent: "a[href]"
    }, CKEDITOR.removeAnchorCommand = function () { }, CKEDITOR.removeAnchorCommand.prototype = {
        exec: function (d) {
            var e = d.getSelection(), c = e.createBookmarks(), a; if (e && (a = e.getSelectedElement()) && (CKEDITOR.plugins.link.fakeAnchor && !a.getChildCount() ? CKEDITOR.plugins.link.tryRestoreFakeAnchor(d, a) : a.is("a"))) a.remove(1); else if (a = CKEDITOR.plugins.link.getSelectedLink(d)) if (a.hasAttribute("href")) { a.removeAttributes({ name: 1, "data-cke-saved-name": 1 }); a.removeClass("cke_anchor") } else a.remove(1);
            e.selectBookmarks(c)
        }, requiredContent: "a[name]"
    }, CKEDITOR.tools.extend(CKEDITOR.config, { linkShowAdvancedTab: !0, linkShowTargetTab: !0 }), function () {
        function d(a, b, c) {
            function d(c) { if ((j = i[c ? "getFirst" : "getLast"]()) && (!j.is || !j.isBlockBoundary()) && (k = b.root[c ? "getPrevious" : "getNext"](CKEDITOR.dom.walker.invisible(true))) && (!k.is || !k.isBlockBoundary({ br: 1 }))) a.document.createElement("br")[c ? "insertBefore" : "insertAfter"](j) } for (var e = CKEDITOR.plugins.list.listToArray(b.root, c), g = [], f = 0; f < b.contents.length; f++) {
                var h =
                b.contents[f]; if ((h = h.getAscendant("li", true)) && !h.getCustomData("list_item_processed")) { g.push(h); CKEDITOR.dom.element.setMarker(c, h, "list_item_processed", true) }
            } h = null; for (f = 0; f < g.length; f++) { h = g[f].getCustomData("listarray_index"); e[h].indent = -1 } for (f = h + 1; f < e.length; f++) if (e[f].indent > e[f - 1].indent + 1) { g = e[f - 1].indent + 1 - e[f].indent; for (h = e[f].indent; e[f] && e[f].indent >= h;) { e[f].indent = e[f].indent + g; f++ } f-- } var i = CKEDITOR.plugins.list.arrayToList(e, c, null, a.config.enterMode, b.root.getAttribute("dir")).listNode,
            j, k; d(true); d(); i.replace(b.root); a.fire("contentDomInvalidated")
        } function e(a, b) { this.name = a; this.context = this.type = b; this.allowedContent = b + " li"; this.requiredContent = b } function c(a, b, c, d) { for (var e, g; e = a[d ? "getLast" : "getFirst"](q) ;) { (g = e.getDirection(1)) !== b.getDirection(1) && e.setAttribute("dir", g); e.remove(); c ? e[d ? "insertBefore" : "insertAfter"](c) : b.append(e, d) } } function a(a) {
            var b; (b = function (b) {
                var d = a[b ? "getPrevious" : "getNext"](k); if (d && d.type == CKEDITOR.NODE_ELEMENT && d.is(a.getName())) {
                    c(a, d,
                    null, !b); a.remove(); a = d
                }
            })(); b(1)
        } function b(a) { return a.type == CKEDITOR.NODE_ELEMENT && (a.getName() in CKEDITOR.dtd.$block || a.getName() in CKEDITOR.dtd.$listItem) && CKEDITOR.dtd[a.getName()]["#"] } function j(b, d, e) {
            b.fire("saveSnapshot"); e.enlarge(CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS); var f = e.extractContents(); d.trim(false, true); var h = d.createBookmark(), i = new CKEDITOR.dom.elementPath(d.startContainer), j = i.block, i = i.lastElement.getAscendant("li", 1) || j, m = new CKEDITOR.dom.elementPath(e.startContainer), q = m.contains(CKEDITOR.dtd.$listItem),
            m = m.contains(CKEDITOR.dtd.$list); if (j) (j = j.getBogus()) && j.remove(); else if (m) (j = m.getPrevious(k)) && o(j) && j.remove(); (j = f.getLast()) && (j.type == CKEDITOR.NODE_ELEMENT && j.is("br")) && j.remove(); (j = d.startContainer.getChild(d.startOffset)) ? f.insertBefore(j) : d.startContainer.append(f); if (q) if (f = g(q)) if (i.contains(q)) { c(f, q.getParent(), q); f.remove() } else i.append(f); for (; e.checkStartOfBlock() && e.checkEndOfBlock() ;) {
                m = e.startPath(); f = m.block; if (!f) break; if (f.is("li")) {
                    i = f.getParent(); f.equals(i.getLast(k)) &&
                    f.equals(i.getFirst(k)) && (f = i)
                } e.moveToPosition(f, CKEDITOR.POSITION_BEFORE_START); f.remove()
            } e = e.clone(); f = b.editable(); e.setEndAt(f, CKEDITOR.POSITION_BEFORE_END); e = new CKEDITOR.dom.walker(e); e.evaluator = function (a) { return k(a) && !o(a) }; (e = e.next()) && (e.type == CKEDITOR.NODE_ELEMENT && e.getName() in CKEDITOR.dtd.$list) && a(e); d.moveToBookmark(h); d.select(); b.fire("saveSnapshot")
        } function g(a) { return (a = a.getLast(k)) && a.type == CKEDITOR.NODE_ELEMENT && a.getName() in h ? a : null } var h = { ol: 1, ul: 1 }, f = CKEDITOR.dom.walker.whitespaces(),
        i = CKEDITOR.dom.walker.bookmark(), k = function (a) { return !(f(a) || i(a)) }, o = CKEDITOR.dom.walker.bogus(); CKEDITOR.plugins.list = {
            listToArray: function (a, b, c, d, e) {
                if (!h[a.getName()]) return []; d || (d = 0); c || (c = []); for (var g = 0, f = a.getChildCount() ; g < f; g++) {
                    var i = a.getChild(g); i.type == CKEDITOR.NODE_ELEMENT && i.getName() in CKEDITOR.dtd.$list && CKEDITOR.plugins.list.listToArray(i, b, c, d + 1); if (i.$.nodeName.toLowerCase() == "li") {
                        var j = { parent: a, indent: d, element: i, contents: [] }; if (e) j.grandparent = e; else {
                            j.grandparent = a.getParent();
                            if (j.grandparent && j.grandparent.$.nodeName.toLowerCase() == "li") j.grandparent = j.grandparent.getParent()
                        } b && CKEDITOR.dom.element.setMarker(b, i, "listarray_index", c.length); c.push(j); for (var k = 0, m = i.getChildCount(), q; k < m; k++) { q = i.getChild(k); q.type == CKEDITOR.NODE_ELEMENT && h[q.getName()] ? CKEDITOR.plugins.list.listToArray(q, b, c, d + 1, j.grandparent) : j.contents.push(q) }
                    }
                } return c
            }, arrayToList: function (a, b, c, d, e) {
                c || (c = 0); if (!a || a.length < c + 1) return null; for (var g, f = a[c].parent.getDocument(), j = new CKEDITOR.dom.documentFragment(f),
                m = null, q = c, o = Math.max(a[c].indent, 0), t = null, z, B, F = d == CKEDITOR.ENTER_P ? "p" : "div"; ;) {
                    var C = a[q]; g = C.grandparent; z = C.element.getDirection(1); if (C.indent == o) { if (!m || a[q].parent.getName() != m.getName()) { m = a[q].parent.clone(false, 1); e && m.setAttribute("dir", e); j.append(m) } t = m.append(C.element.clone(0, 1)); z != m.getDirection(1) && t.setAttribute("dir", z); for (g = 0; g < C.contents.length; g++) t.append(C.contents[g].clone(1, 1)); q++ } else if (C.indent == Math.max(o, 0) + 1) {
                        C = a[q - 1].element.getDirection(1); q = CKEDITOR.plugins.list.arrayToList(a,
                        null, q, d, C != z ? z : null); !t.getChildCount() && (CKEDITOR.env.needsNbspFiller && !(f.$.documentMode > 7)) && t.append(f.createText(" ")); t.append(q.listNode); q = q.nextIndex
                    } else if (C.indent == -1 && !c && g) {
                        if (h[g.getName()]) { t = C.element.clone(false, true); z != g.getDirection(1) && t.setAttribute("dir", z) } else t = new CKEDITOR.dom.documentFragment(f); var m = g.getDirection(1) != z, D = C.element, E = D.getAttribute("class"), I = D.getAttribute("style"), J = t.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT && (d != CKEDITOR.ENTER_BR || m || I || E), G, P = C.contents.length,
                        L; for (g = 0; g < P; g++) {
                            G = C.contents[g]; if (i(G) && P > 1) J ? L = G.clone(1, 1) : t.append(G.clone(1, 1)); else if (G.type == CKEDITOR.NODE_ELEMENT && G.isBlockBoundary()) { m && !G.getDirection() && G.setAttribute("dir", z); B = G; var K = D.getAttribute("style"); K && B.setAttribute("style", K.replace(/([^;])$/, "$1;") + (B.getAttribute("style") || "")); E && G.addClass(E); B = null; if (L) { t.append(L); L = null } t.append(G.clone(1, 1)) } else if (J) {
                                if (!B) { B = f.createElement(F); t.append(B); m && B.setAttribute("dir", z) } I && B.setAttribute("style", I); E && B.setAttribute("class",
                                E); if (L) { B.append(L); L = null } B.append(G.clone(1, 1))
                            } else t.append(G.clone(1, 1))
                        } if (L) { (B || t).append(L); L = null } if (t.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT && q != a.length - 1) { if (CKEDITOR.env.needsBrFiller) (z = t.getLast()) && (z.type == CKEDITOR.NODE_ELEMENT && z.is("br")) && z.remove(); z = t.getLast(k); (!z || !(z.type == CKEDITOR.NODE_ELEMENT && z.is(CKEDITOR.dtd.$block))) && t.append(f.createElement("br")) } z = t.$.nodeName.toLowerCase(); (z == "div" || z == "p") && t.appendBogus(); j.append(t); m = null; q++
                    } else return null; B = null; if (a.length <=
                    q || Math.max(a[q].indent, 0) < o) break
                } if (b) for (a = j.getFirst() ; a;) { if (a.type == CKEDITOR.NODE_ELEMENT) { CKEDITOR.dom.element.clearMarkers(b, a); if (a.getName() in CKEDITOR.dtd.$listItem) { c = a; f = e = d = void 0; if (d = c.getDirection()) { for (e = c.getParent() ; e && !(f = e.getDirection()) ;) e = e.getParent(); d == f && c.removeAttribute("dir") } } } a = a.getNextSourceNode() } return { listNode: j, nextIndex: q }
            }
        }; var m = /^h[1-6]$/, q = CKEDITOR.dom.walker.nodeType(CKEDITOR.NODE_ELEMENT); e.prototype = {
            exec: function (b) {
                this.refresh(b, b.elementPath());
                var c = b.config, e = b.getSelection(), g = e && e.getRanges(); if (this.state == CKEDITOR.TRISTATE_OFF) { var f = b.editable(); if (f.getFirst(k)) { var i = g.length == 1 && g[0]; (c = i && i.getEnclosedNode()) && (c.is && this.type == c.getName()) && this.setState(CKEDITOR.TRISTATE_ON) } else { c.enterMode == CKEDITOR.ENTER_BR ? f.appendBogus() : g[0].fixBlock(1, c.enterMode == CKEDITOR.ENTER_P ? "p" : "div"); e.selectRanges(g) } } for (var c = e.createBookmarks(true), f = [], j = {}, g = g.createIterator(), q = 0; (i = g.getNextRange()) && ++q;) {
                    var o = i.getBoundaryNodes(), s =
                    o.startNode, x = o.endNode; s.type == CKEDITOR.NODE_ELEMENT && s.getName() == "td" && i.setStartAt(o.startNode, CKEDITOR.POSITION_AFTER_START); x.type == CKEDITOR.NODE_ELEMENT && x.getName() == "td" && i.setEndAt(o.endNode, CKEDITOR.POSITION_BEFORE_END); i = i.createIterator(); for (i.forceBrBreak = this.state == CKEDITOR.TRISTATE_OFF; o = i.getNextParagraph() ;) if (!o.getCustomData("list_block")) {
                        CKEDITOR.dom.element.setMarker(j, o, "list_block", 1); for (var t = b.elementPath(o), s = t.elements, x = 0, t = t.blockLimit, z, B = s.length - 1; B >= 0 && (z = s[B]) ; B--) if (h[z.getName()] &&
                        t.contains(z)) { t.removeCustomData("list_group_object_" + q); if (s = z.getCustomData("list_group_object")) s.contents.push(o); else { s = { root: z, contents: [o] }; f.push(s); CKEDITOR.dom.element.setMarker(j, z, "list_group_object", s) } x = 1; break } if (!x) { x = t; if (x.getCustomData("list_group_object_" + q)) x.getCustomData("list_group_object_" + q).contents.push(o); else { s = { root: x, contents: [o] }; CKEDITOR.dom.element.setMarker(j, x, "list_group_object_" + q, s); f.push(s) } }
                    }
                } for (z = []; f.length > 0;) {
                    s = f.shift(); if (this.state == CKEDITOR.TRISTATE_OFF) if (h[s.root.getName()]) {
                        g =
                        b; q = s; s = j; i = z; x = CKEDITOR.plugins.list.listToArray(q.root, s); t = []; for (o = 0; o < q.contents.length; o++) { B = q.contents[o]; if ((B = B.getAscendant("li", true)) && !B.getCustomData("list_item_processed")) { t.push(B); CKEDITOR.dom.element.setMarker(s, B, "list_item_processed", true) } } for (var B = q.root.getDocument(), F = void 0, C = void 0, o = 0; o < t.length; o++) {
                            var D = t[o].getCustomData("listarray_index"), F = x[D].parent; if (!F.is(this.type)) {
                                C = B.createElement(this.type); F.copyAttributes(C, { start: 1, type: 1 }); C.removeStyle("list-style-type");
                                x[D].parent = C
                            }
                        } s = CKEDITOR.plugins.list.arrayToList(x, s, null, g.config.enterMode); x = void 0; t = s.listNode.getChildCount(); for (o = 0; o < t && (x = s.listNode.getChild(o)) ; o++) x.getName() == this.type && i.push(x); s.listNode.replace(q.root); g.fire("contentDomInvalidated")
                    } else {
                        x = b; o = s; i = z; t = o.contents; g = o.root.getDocument(); q = []; if (t.length == 1 && t[0].equals(o.root)) { s = g.createElement("div"); t[0].moveChildren && t[0].moveChildren(s); t[0].append(s); t[0] = s } o = o.contents[0].getParent(); for (B = 0; B < t.length; B++) o = o.getCommonAncestor(t[B].getParent());
                        F = x.config.useComputedState; x = s = void 0; F = F === void 0 || F; for (B = 0; B < t.length; B++) for (C = t[B]; D = C.getParent() ;) { if (D.equals(o)) { q.push(C); !x && C.getDirection() && (x = 1); C = C.getDirection(F); s !== null && (s = s && s != C ? null : C); break } C = D } if (!(q.length < 1)) {
                            t = q[q.length - 1].getNext(); B = g.createElement(this.type); i.push(B); for (F = i = void 0; q.length;) {
                                i = q.shift(); F = g.createElement("li"); if (i.is("pre") || m.test(i.getName()) || i.getAttribute("contenteditable") == "false") i.appendTo(F); else {
                                    i.copyAttributes(F); if (s && i.getDirection()) {
                                        F.removeStyle("direction");
                                        F.removeAttribute("dir")
                                    } i.moveChildren(F); i.remove()
                                } F.appendTo(B)
                            } s && x && B.setAttribute("dir", s); t ? B.insertBefore(t) : B.appendTo(o)
                        }
                    } else this.state == CKEDITOR.TRISTATE_ON && h[s.root.getName()] && d.call(this, b, s, j)
                } for (B = 0; B < z.length; B++) a(z[B]); CKEDITOR.dom.element.clearAllMarkers(j); e.selectBookmarks(c); b.focus()
            }, refresh: function (a, b) { var c = b.contains(h, 1), d = b.blockLimit || b.root; c && d.contains(c) ? this.setState(c.is(this.type) ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF) : this.setState(CKEDITOR.TRISTATE_OFF) }
        };
        CKEDITOR.plugins.add("list", {
            requires: "indentlist", init: function (a) {
                if (!a.blockless) {
                    a.addCommand("numberedlist", new e("numberedlist", "ol")); a.addCommand("bulletedlist", new e("bulletedlist", "ul")); if (a.ui.addButton) { a.ui.addButton("NumberedList", { label: a.lang.list.numberedlist, command: "numberedlist", directional: true, toolbar: "list,10" }); a.ui.addButton("BulletedList", { label: a.lang.list.bulletedlist, command: "bulletedlist", directional: true, toolbar: "list,20" }) } a.on("key", function (c) {
                        var d = c.data.keyCode;
                        if (a.mode == "wysiwyg" && d in { 8: 1, 46: 1 }) {
                            var e = a.getSelection().getRanges()[0], f = e && e.startPath(); if (e && e.collapsed) {
                                var f = new CKEDITOR.dom.elementPath(e.startContainer), i = d == 8, m = a.editable(), q = new CKEDITOR.dom.walker(e.clone()); q.evaluator = function (a) { return k(a) && !o(a) }; q.guard = function (a, b) { return !(b && a.type == CKEDITOR.NODE_ELEMENT && a.is("table")) }; d = e.clone(); if (i) {
                                    var u, s; if ((u = f.contains(h)) && e.checkBoundaryOfElement(u, CKEDITOR.START) && (u = u.getParent()) && u.is("li") && (u = g(u))) {
                                        s = u; u = u.getPrevious(k);
                                        d.moveToPosition(u && o(u) ? u : s, CKEDITOR.POSITION_BEFORE_START)
                                    } else { q.range.setStartAt(m, CKEDITOR.POSITION_AFTER_START); q.range.setEnd(e.startContainer, e.startOffset); if ((u = q.previous()) && u.type == CKEDITOR.NODE_ELEMENT && (u.getName() in h || u.is("li"))) { if (!u.is("li")) { q.range.selectNodeContents(u); q.reset(); q.evaluator = b; u = q.previous() } s = u; d.moveToElementEditEnd(s) } } if (s) { j(a, d, e); c.cancel() } else if ((d = f.contains(h)) && e.checkBoundaryOfElement(d, CKEDITOR.START)) {
                                        s = d.getFirst(k); if (e.checkBoundaryOfElement(s,
                                        CKEDITOR.START)) { u = d.getPrevious(k); if (g(s)) { if (u) { e.moveToElementEditEnd(u); e.select() } } else a.execCommand("outdent"); c.cancel() }
                                    }
                                } else if (s = f.contains("li")) { q.range.setEndAt(m, CKEDITOR.POSITION_BEFORE_END); m = (f = s.getLast(k)) && b(f) ? f : s; s = 0; if ((u = q.next()) && u.type == CKEDITOR.NODE_ELEMENT && u.getName() in h && u.equals(f)) { s = 1; u = q.next() } else e.checkBoundaryOfElement(m, CKEDITOR.END) && (s = 1); if (s && u) { e = e.clone(); e.moveToElementEditStart(u); j(a, d, e); c.cancel() } } else {
                                    q.range.setEndAt(m, CKEDITOR.POSITION_BEFORE_END);
                                    if ((u = q.next()) && u.type == CKEDITOR.NODE_ELEMENT && u.is(h)) { u = u.getFirst(k); if (f.block && e.checkStartOfBlock() && e.checkEndOfBlock()) { f.block.remove(); e.moveToElementEditStart(u); e.select() } else if (g(u)) { e.moveToElementEditStart(u); e.select() } else { e = e.clone(); e.moveToElementEditStart(u); j(a, d, e) } c.cancel() }
                                } setTimeout(function () { a.selectionChange(1) })
                            }
                        }
                    })
                }
            }
        })
    }(), "use strict", function () {
        function d(a, b, c) { return k(b) && k(c) && c.equals(b.getNext(function (a) { return !(X(a) || Y(a) || o(a)) })) } function e(a) {
            this.upper =
            a[0]; this.lower = a[1]; this.set.apply(this, a.slice(2))
        } function c(a) { var b = a.element; if (b && k(b)) if ((b = b.getAscendant(a.triggers, true)) && a.editable.contains(b)) { var c = j(b, true); if (c.getAttribute("contenteditable") == "true") return b; if (c.is(a.triggers)) return c } return null } function a(a, b, c) { y(a, b); y(a, c); a = b.size.bottom; c = c.size.top; return a && c ? 0 | (a + c) / 2 : a || c } function b(a, b, c) { return b = b[c ? "getPrevious" : "getNext"](function (b) { return b && b.type == CKEDITOR.NODE_TEXT && !X(b) || k(b) && !o(b) && !i(a, b) }) } function j(a,
        b) { if (a.data("cke-editable")) return null; for (b || (a = a.getParent()) ; a;) { if (a.data("cke-editable")) break; if (a.hasAttribute("contenteditable")) return a; a = a.getParent() } return null } function g(a) {
            var b = a.doc, c = t('<span contenteditable="false" style="' + T + "position:absolute;border-top:1px dashed " + a.boxColor + '"></span>', b), d = this.path + "images/" + (z.hidpi ? "hidpi/" : "") + "icon.png"; s(c, {
                attach: function () { this.wrap.getParent() || this.wrap.appendTo(a.editable, true); return this }, lineChildren: [s(t('<span title="' +
                a.editor.lang.magicline.title + '" contenteditable="false">&#8629;</span>', b), {
                    base: T + "height:17px;width:17px;" + (a.rtl ? "left" : "right") + ":17px;background:url(" + d + ") center no-repeat " + a.boxColor + ";cursor:pointer;" + (z.hc ? "font-size: 15px;line-height:14px;border:1px solid #fff;text-align:center;" : "") + (z.hidpi ? "background-size: 9px 10px;" : ""), looks: ["top:-8px;" + CKEDITOR.tools.cssVendorPrefix("border-radius", "2px", 1), "top:-17px;" + CKEDITOR.tools.cssVendorPrefix("border-radius", "2px 2px 0px 0px", 1), "top:-1px;" +
                    CKEDITOR.tools.cssVendorPrefix("border-radius", "0px 0px 2px 2px", 1)]
                }), s(t(W, b), { base: Q + "left:0px;border-left-color:" + a.boxColor + ";", looks: ["border-width:8px 0 8px 8px;top:-8px", "border-width:8px 0 0 8px;top:-8px", "border-width:0 0 8px 8px;top:0px"] }), s(t(W, b), { base: Q + "right:0px;border-right-color:" + a.boxColor + ";", looks: ["border-width:8px 8px 8px 0;top:-8px", "border-width:8px 8px 0 0;top:-8px", "border-width:0 8px 8px 0;top:0px"] })], detach: function () { this.wrap.getParent() && this.wrap.remove(); return this },
                mouseNear: function () { y(a, this); var b = a.holdDistance, c = this.size; return c && a.mouse.y > c.top - b && a.mouse.y < c.bottom + b && a.mouse.x > c.left - b && a.mouse.x < c.right + b ? true : false }, place: function () {
                    var b = a.view, c = a.editable, d = a.trigger, e = d.upper, g = d.lower, f = e || g, h = f.getParent(), i = {}; this.trigger = d; e && y(a, e, true); g && y(a, g, true); y(a, h, true); a.inInlineMode && A(a, true); if (h.equals(c)) { i.left = b.scroll.x; i.right = -b.scroll.x; i.width = "" } else {
                        i.left = f.size.left - f.size.margin.left + b.scroll.x - (a.inInlineMode ? b.editable.left +
                        b.editable.border.left : 0); i.width = f.size.outerWidth + f.size.margin.left + f.size.margin.right + b.scroll.x; i.right = ""
                    } if (e && g) i.top = e.size.margin.bottom === g.size.margin.top ? 0 | e.size.bottom + e.size.margin.bottom / 2 : e.size.margin.bottom < g.size.margin.top ? e.size.bottom + e.size.margin.bottom : e.size.bottom + e.size.margin.bottom - g.size.margin.top; else if (e) { if (!g) i.top = e.size.bottom + e.size.margin.bottom } else i.top = g.size.top - g.size.margin.top; if (d.is(P) || i.top > b.scroll.y - 15 && i.top < b.scroll.y + 5) {
                        i.top = a.inInlineMode ?
                        0 : b.scroll.y; this.look(P)
                    } else if (d.is(L) || i.top > b.pane.bottom - 5 && i.top < b.pane.bottom + 15) { i.top = a.inInlineMode ? b.editable.height + b.editable.padding.top + b.editable.padding.bottom : b.pane.bottom - 1; this.look(L) } else { if (a.inInlineMode) i.top = i.top - (b.editable.top + b.editable.border.top); this.look(K) } if (a.inInlineMode) { i.top--; i.top = i.top + b.editable.scroll.top; i.left = i.left + b.editable.scroll.left } for (var j in i) i[j] = CKEDITOR.tools.cssLength(i[j]); this.setStyles(i)
                }, look: function (a) {
                    if (this.oldLook != a) {
                        for (var b =
                        this.lineChildren.length, c; b--;) (c = this.lineChildren[b]).setAttribute("style", c.base + c.looks[0 | a / 2]); this.oldLook = a
                    }
                }, wrap: new x("span", a.doc)
            }); for (b = c.lineChildren.length; b--;) c.lineChildren[b].appendTo(c); c.look(K); c.appendTo(c.wrap); c.unselectable(); c.lineChildren[0].on("mouseup", function (b) { c.detach(); h(a, function (b) { var c = a.line.trigger; b[c.is(D) ? "insertBefore" : "insertAfter"](c.is(D) ? c.lower : c.upper) }, true); a.editor.focus(); !z.ie && a.enterMode != CKEDITOR.ENTER_BR && a.hotNode.scrollIntoView(); b.data.preventDefault(true) });
            c.on("mousedown", function (a) { a.data.preventDefault(true) }); a.line = c
        } function h(a, b, c) { var d = new CKEDITOR.dom.range(a.doc), e = a.editor, g; if (z.ie && a.enterMode == CKEDITOR.ENTER_BR) g = a.doc.createText(H); else { g = (g = j(a.element, true)) && g.data("cke-enter-mode") || a.enterMode; g = new x(C[g], a.doc); g.is("br") || a.doc.createText(H).appendTo(g) } c && e.fire("saveSnapshot"); b(g); d.moveToPosition(g, CKEDITOR.POSITION_AFTER_START); e.getSelection().selectRanges([d]); a.hotNode = g; c && e.fire("saveSnapshot") } function f(a, d) {
            return {
                canUndo: true,
                modes: { wysiwyg: 1 }, exec: function () {
                    function e(b) { var c = z.ie && z.version < 9 ? " " : H, g = a.hotNode && a.hotNode.getText() == c && a.element.equals(a.hotNode) && a.lastCmdDirection === !!d; h(a, function (c) { g && a.hotNode && a.hotNode.remove(); c[d ? "insertAfter" : "insertBefore"](b); c.setAttributes({ "data-cke-magicline-hot": 1, "data-cke-magicline-dir": !!d }); a.lastCmdDirection = !!d }); !z.ie && a.enterMode != CKEDITOR.ENTER_BR && a.hotNode.scrollIntoView(); a.line.detach() } return function (g) {
                        var g = g.getSelection().getStartElement(), f, g =
                        g.getAscendant(O, 1); if (!l(a, g) && g && !g.equals(a.editable) && !g.contains(a.editable)) { if ((f = j(g)) && f.getAttribute("contenteditable") == "false") g = f; a.element = g; f = b(a, g, !d); var h; if (k(f) && f.is(a.triggers) && f.is(S) && (!b(a, f, !d) || (h = b(a, f, !d)) && k(h) && h.is(a.triggers))) e(f); else { h = c(a, g); if (k(h)) if (b(a, h, !d)) (g = b(a, h, !d)) && (k(g) && g.is(a.triggers)) && e(h); else e(h) } }
                    }
                }()
            }
        } function i(a, b) { if (!b || !(b.type == CKEDITOR.NODE_ELEMENT && b.$)) return false; var c = a.line; return c.wrap.equals(b) || c.wrap.contains(b) } function k(a) {
            return a &&
            a.type == CKEDITOR.NODE_ELEMENT && a.$
        } function o(a) { if (!k(a)) return false; var b; if (!(b = m(a))) if (k(a)) { b = { left: 1, right: 1, center: 1 }; b = !(!b[a.getComputedStyle("float")] && !b[a.getAttribute("align")]) } else b = false; return b } function m(a) { return !!{ absolute: 1, fixed: 1 }[a.getComputedStyle("position")] } function q(a, b) { return k(b) ? b.is(a.triggers) : null } function l(a, b) { if (!b) return false; for (var c = b.getParents(1), d = c.length; d--;) for (var e = a.tabuList.length; e--;) if (c[d].hasAttribute(a.tabuList[e])) return true; return false }
        function n(a, b, c) { b = b[c ? "getLast" : "getFirst"](function (b) { return a.isRelevant(b) && !b.is(M) }); if (!b) return false; y(a, b); return c ? b.size.top > a.mouse.y : b.size.bottom < a.mouse.y } function r(a) {
            var b = a.editable, c = a.mouse, d = a.view, g = a.triggerOffset; A(a); var f = c.y > (a.inInlineMode ? d.editable.top + d.editable.height / 2 : Math.min(d.editable.height, d.pane.height) / 2), b = b[f ? "getLast" : "getFirst"](function (a) { return !(X(a) || Y(a)) }); if (!b) return null; i(a, b) && (b = a.line.wrap[f ? "getPrevious" : "getNext"](function (a) {
                return !(X(a) ||
                Y(a))
            })); if (!k(b) || o(b) || !q(a, b)) return null; y(a, b); if (!f && b.size.top >= 0 && c.y > 0 && c.y < b.size.top + g) { a = a.inInlineMode || d.scroll.y === 0 ? P : K; return new e([null, b, D, J, a]) } if (f && b.size.bottom <= d.pane.height && c.y > b.size.bottom - g && c.y < d.pane.height) { a = a.inInlineMode || b.size.bottom > d.pane.height - g && b.size.bottom < d.pane.height ? L : K; return new e([b, null, E, J, a]) } return null
        } function p(a) {
            var d = a.mouse, g = a.view, f = a.triggerOffset, h = c(a); if (!h) return null; y(a, h); var f = Math.min(f, 0 | h.size.outerHeight / 2), i = [], j, l; if (d.y >
            h.size.top - 1 && d.y < h.size.top + f) l = false; else if (d.y > h.size.bottom - f && d.y < h.size.bottom + 1) l = true; else return null; if (o(h) || n(a, h, l) || h.getParent().is(N)) return null; var m = b(a, h, !l); if (m) { if (m && m.type == CKEDITOR.NODE_TEXT) return null; if (k(m)) { if (o(m) || !q(a, m) || m.getParent().is(N)) return null; i = [m, h][l ? "reverse" : "concat"]().concat([I, J]) } } else {
                if (h.equals(a.editable[l ? "getLast" : "getFirst"](a.isRelevant))) {
                    A(a); l && d.y > h.size.bottom - f && d.y < g.pane.height && h.size.bottom > g.pane.height - f && h.size.bottom < g.pane.height ?
                    j = L : d.y > 0 && d.y < h.size.top + f && (j = P)
                } else j = K; i = [null, h][l ? "reverse" : "concat"]().concat([l ? E : D, J, j, h.equals(a.editable[l ? "getLast" : "getFirst"](a.isRelevant)) ? l ? L : P : K])
            } return 0 in i ? new e(i) : null
        } function w(a, b, c, d) {
            for (var e = function () { var c = z.ie ? b.$.currentStyle : a.win.$.getComputedStyle(b.$, ""); return z.ie ? function (a) { return c[CKEDITOR.tools.cssStyleToDomStyle(a)] } : function (a) { return c.getPropertyValue(a) } }(), g = b.getDocumentPosition(), f = {}, h = {}, i = {}, j = {}, l = R.length; l--;) {
                f[R[l]] = parseInt(e("border-" +
                R[l] + "-width"), 10) || 0; i[R[l]] = parseInt(e("padding-" + R[l]), 10) || 0; h[R[l]] = parseInt(e("margin-" + R[l]), 10) || 0
            } (!c || d) && v(a, d); j.top = g.y - (c ? 0 : a.view.scroll.y); j.left = g.x - (c ? 0 : a.view.scroll.x); j.outerWidth = b.$.offsetWidth; j.outerHeight = b.$.offsetHeight; j.height = j.outerHeight - (i.top + i.bottom + f.top + f.bottom); j.width = j.outerWidth - (i.left + i.right + f.left + f.right); j.bottom = j.top + j.outerHeight; j.right = j.left + j.outerWidth; if (a.inInlineMode) j.scroll = { top: b.$.scrollTop, left: b.$.scrollLeft }; return s({
                border: f, padding: i,
                margin: h, ignoreScroll: c
            }, j, true)
        } function y(a, b, c) { if (!k(b)) return b.size = null; if (b.size) { if (b.size.ignoreScroll == c && b.size.date > new Date - U) return null } else b.size = {}; return s(b.size, w(a, b, c), { date: +new Date }, true) } function A(a, b) { a.view.editable = w(a, a.editable, b, true) } function v(a, b) {
            if (!a.view) a.view = {}; var c = a.view; if (b || !(c && c.date > new Date - U)) {
                var d = a.win, c = d.getScrollPosition(), d = d.getViewPaneSize(); s(a.view, {
                    scroll: {
                        x: c.x, y: c.y, width: a.doc.$.documentElement.scrollWidth - d.width, height: a.doc.$.documentElement.scrollHeight -
                        d.height
                    }, pane: { width: d.width, height: d.height, bottom: d.height + c.y }, date: +new Date
                }, true)
            }
        } function u(a, b, c, d) { for (var g = d, f = d, h = 0, i = false, j = false, l = a.view.pane.height, k = a.mouse; k.y + h < l && k.y - h > 0;) { i || (i = b(g, d)); j || (j = b(f, d)); !i && k.y - h > 0 && (g = c(a, { x: k.x, y: k.y - h })); !j && k.y + h < l && (f = c(a, { x: k.x, y: k.y + h })); if (i && j) break; h = h + 2 } return new e([g, f, null, null]) } CKEDITOR.plugins.add("magicline", {
            init: function (a) {
                var d = a.config, j = d.magicline_triggerOffset || 30, n = {
                    editor: a, enterMode: d.enterMode, triggerOffset: j, holdDistance: 0 |
                    j * (d.magicline_holdDistance || 0.5), boxColor: d.magicline_color || "#ff0000", rtl: d.contentsLangDirection == "rtl", tabuList: ["data-cke-hidden-sel"].concat(d.magicline_tabuList || []), triggers: d.magicline_everywhere ? O : { table: 1, hr: 1, div: 1, ul: 1, ol: 1, dl: 1, form: 1, blockquote: 1 }
                }, q, y, u; n.isRelevant = function (a) { return k(a) && !i(n, a) && !o(a) }; a.on("contentDom", function () {
                    var j = a.editable(), k = a.document, o = a.window; s(n, { editable: j, inInlineMode: j.isInline(), doc: k, win: o, hotNode: null }, true); n.boundary = n.inInlineMode ? n.editable :
                    n.doc.getDocumentElement(); if (!j.is(F.$inline)) {
                        n.inInlineMode && !m(j) && j.setStyles({ position: "relative", top: null, left: null }); g.call(this, n); v(n); j.attachListener(a, "beforeUndoImage", function () { n.line.detach() }); j.attachListener(a, "beforeGetData", function () { if (n.line.wrap.getParent()) { n.line.detach(); a.once("getData", function () { n.line.attach() }, null, null, 1E3) } }, null, null, 0); j.attachListener(n.inInlineMode ? k : k.getWindow().getFrame(), "mouseout", function (b) {
                            if (a.mode == "wysiwyg") if (n.inInlineMode) {
                                var c =
                                b.data.$.clientX, b = b.data.$.clientY; v(n); A(n, true); var d = n.view.editable, e = n.view.scroll; if (!(c > d.left - e.x && c < d.right - e.x) || !(b > d.top - e.y && b < d.bottom - e.y)) { clearTimeout(u); u = null; n.line.detach() }
                            } else { clearTimeout(u); u = null; n.line.detach() }
                        }); j.attachListener(j, "keyup", function () { n.hiddenMode = 0 }); j.attachListener(j, "keydown", function (b) { if (a.mode == "wysiwyg") { b = b.data.getKeystroke(); a.getSelection().getStartElement(); switch (b) { case 2228240: case 16: n.hiddenMode = 1; n.line.detach() } } }); j.attachListener(n.inInlineMode ?
                            j : k, "mousemove", function (b) { y = true; if (!(a.mode != "wysiwyg" || a.readOnly || u)) { var c = { x: b.data.$.clientX, y: b.data.$.clientY }; u = setTimeout(function () { n.mouse = c; u = n.trigger = null; v(n); if (y && !n.hiddenMode && a.focusManager.hasFocus && !n.line.mouseNear() && (n.element = Z(n, true))) { if ((n.trigger = r(n) || p(n) || aa(n)) && !l(n, n.trigger.upper || n.trigger.lower)) n.line.attach().place(); else { n.trigger = null; n.line.detach() } y = false } }, 30) } }); j.attachListener(o, "scroll", function () {
                                if (a.mode == "wysiwyg") {
                                    n.line.detach(); if (z.webkit) {
                                        n.hiddenMode =
                                        1; clearTimeout(q); q = setTimeout(function () { if (!n.mouseDown) n.hiddenMode = 0 }, 50)
                                    }
                                }
                            }); j.attachListener(B ? k : o, "mousedown", function () { if (a.mode == "wysiwyg") { n.line.detach(); n.hiddenMode = 1; n.mouseDown = 1 } }); j.attachListener(B ? k : o, "mouseup", function () { n.hiddenMode = 0; n.mouseDown = 0 }); a.addCommand("accessPreviousSpace", f(n)); a.addCommand("accessNextSpace", f(n, true)); a.setKeystroke([[d.magicline_keystrokePrevious, "accessPreviousSpace"], [d.magicline_keystrokeNext, "accessNextSpace"]]); a.on("loadSnapshot", function () {
                                var b,
                                c, d, e; for (e in { p: 1, br: 1, div: 1 }) { b = a.document.getElementsByTag(e); for (d = b.count() ; d--;) if ((c = b.getItem(d)).data("cke-magicline-hot")) { n.hotNode = c; n.lastCmdDirection = c.data("cke-magicline-dir") === "true" ? true : false; return } }
                            }); this.backdoor = { accessFocusSpace: h, boxTrigger: e, isLine: i, getAscendantTrigger: c, getNonEmptyNeighbour: b, getSize: w, that: n, triggerEdge: p, triggerEditable: r, triggerExpand: aa }
                    }
                }, this)
            }
        }); var s = CKEDITOR.tools.extend, x = CKEDITOR.dom.element, t = x.createFromHtml, z = CKEDITOR.env, B = CKEDITOR.env.ie &&
        CKEDITOR.env.version < 9, F = CKEDITOR.dtd, C = {}, D = 128, E = 64, I = 32, J = 16, G = 8, P = 4, L = 2, K = 1, H = " ", N = F.$listItem, M = F.$tableContent, S = s({}, F.$nonEditable, F.$empty), O = F.$block, U = 100, T = "width:0px;height:0px;padding:0px;margin:0px;display:block;z-index:9999;color:#fff;position:absolute;font-size: 0px;line-height:0px;", Q = T + "border-color:transparent;display:block;border-style:solid;", W = "<span>" + H + "</span>"; C[CKEDITOR.ENTER_BR] = "br"; C[CKEDITOR.ENTER_P] = "p"; C[CKEDITOR.ENTER_DIV] = "div"; e.prototype = {
            set: function (a, b, c) {
                this.properties =
                a + b + (c || K); return this
            }, is: function (a) { return (this.properties & a) == a }
        }; var Z = function () { return function (a, b, c) { if (!a.mouse) return null; var d = a.doc, e = a.line.wrap, c = c || a.mouse, g = new CKEDITOR.dom.element(d.$.elementFromPoint(c.x, c.y)); if (b && i(a, g)) { e.hide(); g = new CKEDITOR.dom.element(d.$.elementFromPoint(c.x, c.y)); e.show() } return !g || !(g.type == CKEDITOR.NODE_ELEMENT && g.$) || z.ie && z.version < 9 && !a.boundary.equals(g) && !a.boundary.contains(g) ? null : g } }(), X = CKEDITOR.dom.walker.whitespaces(), Y = CKEDITOR.dom.walker.nodeType(CKEDITOR.NODE_COMMENT),
        aa = function () {
            function b(e) {
                var g = e.element, f, h, i; if (!k(g) || g.contains(e.editable) || g.isReadOnly()) return null; i = u(e, function (a, b) { return !b.equals(a) }, function (a, b) { return Z(a, true, b) }, g); f = i.upper; h = i.lower; if (d(e, f, h)) return i.set(I, G); if (f && g.contains(f)) for (; !f.getParent().equals(g) ;) f = f.getParent(); else f = g.getFirst(function (a) { return c(e, a) }); if (h && g.contains(h)) for (; !h.getParent().equals(g) ;) h = h.getParent(); else h = g.getLast(function (a) { return c(e, a) }); if (!f || !h) return null; y(e, f); y(e, h); if (!(e.mouse.y >
                f.size.top && e.mouse.y < h.size.bottom)) return null; for (var g = Number.MAX_VALUE, j, l, n, m; h && !h.equals(f) ;) { if (!(l = f.getNext(e.isRelevant))) break; j = Math.abs(a(e, f, l) - e.mouse.y); if (j < g) { g = j; n = f; m = l } f = l; y(e, f) } if (!n || !m || !(e.mouse.y > n.size.top && e.mouse.y < m.size.bottom)) return null; i.upper = n; i.lower = m; return i.set(I, G)
            } function c(a, b) { return !(b && b.type == CKEDITOR.NODE_TEXT || Y(b) || o(b) || i(a, b) || b.type == CKEDITOR.NODE_ELEMENT && b.$ && b.is("br")) } return function (a) {
                var c = b(a), e; if (e = c) {
                    e = c.upper; var g = c.lower; e =
                    !e || !g || o(g) || o(e) || g.equals(e) || e.equals(g) || g.contains(e) || e.contains(g) ? false : q(a, e) && q(a, g) && d(a, e, g) ? true : false
                } return e ? c : null
            }
        }(), R = ["top", "left", "right", "bottom"]
    }(), CKEDITOR.config.magicline_keystrokePrevious = CKEDITOR.CTRL + CKEDITOR.SHIFT + 51, CKEDITOR.config.magicline_keystrokeNext = CKEDITOR.CTRL + CKEDITOR.SHIFT + 52, function () {
        function d(a) {
            if (!a || a.type != CKEDITOR.NODE_ELEMENT || a.getName() != "form") return []; for (var b = [], c = ["style", "className"], d = 0; d < c.length; d++) {
                var e = a.$.elements.namedItem(c[d]);
                if (e) { e = new CKEDITOR.dom.element(e); b.push([e, e.nextSibling]); e.remove() }
            } return b
        } function e(a, b) { if (a && !(a.type != CKEDITOR.NODE_ELEMENT || a.getName() != "form") && b.length > 0) for (var c = b.length - 1; c >= 0; c--) { var d = b[c][0], e = b[c][1]; e ? d.insertBefore(e) : d.appendTo(a) } } function c(a, b) { var c = d(a), f = {}, i = a.$; if (!b) { f["class"] = i.className || ""; i.className = "" } f.inline = i.style.cssText || ""; if (!b) i.style.cssText = "position: static; overflow: visible"; e(c); return f } function a(a, b) {
            var c = d(a), f = a.$; if ("class" in b) f.className =
            b["class"]; if ("inline" in b) f.style.cssText = b.inline; e(c)
        } function b(a) { if (!a.editable().isInline()) { var b = CKEDITOR.instances, c; for (c in b) { var d = b[c]; if (d.mode == "wysiwyg" && !d.readOnly) { d = d.document.getBody(); d.setAttribute("contentEditable", false); d.setAttribute("contentEditable", true) } } if (a.editable().hasFocus) { a.toolbox.focus(); a.focus() } } } CKEDITOR.plugins.add("maximize", {
            init: function (d) {
                function e() { var a = i.getViewPaneSize(); d.resize(a.width, a.height, null, true) } if (d.elementMode != CKEDITOR.ELEMENT_MODE_INLINE) {
                    var h =
                    d.lang, f = CKEDITOR.document, i = f.getWindow(), k, o, m, q = CKEDITOR.TRISTATE_OFF; d.addCommand("maximize", {
                        modes: { wysiwyg: !CKEDITOR.env.iOS, source: !CKEDITOR.env.iOS }, readOnly: 1, editorFocus: false, exec: function () {
                            var l = d.container.getChild(1), n = d.ui.space("contents"); if (d.mode == "wysiwyg") { var r = d.getSelection(); k = r && r.getRanges(); o = i.getScrollPosition() } else { var p = d.editable().$; k = !CKEDITOR.env.ie && [p.selectionStart, p.selectionEnd]; o = [p.scrollLeft, p.scrollTop] } if (this.state == CKEDITOR.TRISTATE_OFF) {
                                i.on("resize",
                                e); m = i.getScrollPosition(); for (r = d.container; r = r.getParent() ;) { r.setCustomData("maximize_saved_styles", c(r)); r.setStyle("z-index", d.config.baseFloatZIndex - 5) } n.setCustomData("maximize_saved_styles", c(n, true)); l.setCustomData("maximize_saved_styles", c(l, true)); n = { overflow: CKEDITOR.env.webkit ? "" : "hidden", width: 0, height: 0 }; f.getDocumentElement().setStyles(n); !CKEDITOR.env.gecko && f.getDocumentElement().setStyle("position", "fixed"); (!CKEDITOR.env.gecko || !CKEDITOR.env.quirks) && f.getBody().setStyles(n);
                                CKEDITOR.env.ie ? setTimeout(function () { i.$.scrollTo(0, 0) }, 0) : i.$.scrollTo(0, 0); l.setStyle("position", CKEDITOR.env.gecko && CKEDITOR.env.quirks ? "fixed" : "absolute"); l.$.offsetLeft; l.setStyles({ "z-index": d.config.baseFloatZIndex - 5, left: "0px", top: "0px" }); l.addClass("cke_maximized"); e(); n = l.getDocumentPosition(); l.setStyles({ left: -1 * n.x + "px", top: -1 * n.y + "px" }); CKEDITOR.env.gecko && b(d)
                            } else if (this.state == CKEDITOR.TRISTATE_ON) {
                                i.removeListener("resize", e); n = [n, l]; for (r = 0; r < n.length; r++) {
                                    a(n[r], n[r].getCustomData("maximize_saved_styles"));
                                    n[r].removeCustomData("maximize_saved_styles")
                                } for (r = d.container; r = r.getParent() ;) { a(r, r.getCustomData("maximize_saved_styles")); r.removeCustomData("maximize_saved_styles") } CKEDITOR.env.ie ? setTimeout(function () { i.$.scrollTo(m.x, m.y) }, 0) : i.$.scrollTo(m.x, m.y); l.removeClass("cke_maximized"); if (CKEDITOR.env.webkit) { l.setStyle("display", "inline"); setTimeout(function () { l.setStyle("display", "block") }, 0) } d.fire("resize")
                            } this.toggleState(); if (r = this.uiItems[0]) {
                                n = this.state == CKEDITOR.TRISTATE_OFF ? h.maximize.maximize :
                                h.maximize.minimize; r = CKEDITOR.document.getById(r._.id); r.getChild(1).setHtml(n); r.setAttribute("title", n); r.setAttribute("href", 'javascript:void("' + n + '");')
                            } if (d.mode == "wysiwyg") if (k) { CKEDITOR.env.gecko && b(d); d.getSelection().selectRanges(k); (p = d.getSelection().getStartElement()) && p.scrollIntoView(true) } else i.$.scrollTo(o.x, o.y); else { if (k) { p.selectionStart = k[0]; p.selectionEnd = k[1] } p.scrollLeft = o[0]; p.scrollTop = o[1] } k = o = null; q = this.state; d.fire("maximize", this.state)
                        }, canUndo: false
                    }); d.ui.addButton &&
                    d.ui.addButton("Maximize", { label: h.maximize.maximize, command: "maximize", toolbar: "tools,10" }); d.on("mode", function () { var a = d.getCommand("maximize"); a.setState(a.state == CKEDITOR.TRISTATE_DISABLED ? CKEDITOR.TRISTATE_DISABLED : q) }, null, null, 100)
                }
            }
        })
    }(), function () {
        function d(c, a, b) { var d = CKEDITOR.cleanWord; if (d) b(); else { c = CKEDITOR.getUrl(c.config.pasteFromWordCleanupFile || a + "filter/default.js"); CKEDITOR.scriptLoader.load(c, b, null, true) } return !d } function e(c) { c.data.type = "html" } CKEDITOR.plugins.add("pastefromword",
        {
            requires: "clipboard", init: function (c) {
                var a = 0, b = this.path; c.addCommand("pastefromword", { canUndo: false, async: true, exec: function (b) { var c = this; a = 1; b.once("beforePaste", e); b.getClipboardData({ title: b.lang.pastefromword.title }, function (a) { a && b.fire("paste", { type: "html", dataValue: a.dataValue }); b.fire("afterCommandExec", { name: "pastefromword", command: c, returnValue: !!a }) }) } }); c.ui.addButton && c.ui.addButton("PasteFromWord", { label: c.lang.pastefromword.toolbar, command: "pastefromword", toolbar: "clipboard,50" });
                c.on("pasteState", function (a) { c.getCommand("pastefromword").setState(a.data) }); c.on("paste", function (e) { var g = e.data, h = g.dataValue; if (h && (a || /(class=\"?Mso|style=\"[^\"]*\bmso\-|w:WordDocument)/.test(h))) { var f = d(c, b, function () { if (f) c.fire("paste", g); else if (!c.config.pasteFromWordPromptCleanup || a || confirm(c.lang.pastefromword.confirmCleanup)) g.dataValue = CKEDITOR.cleanWord(h, c) }); f && e.cancel() } }, null, null, 3)
            }
        })
    }(), function () {
        var d = {
            canUndo: false, async: true, exec: function (e) {
                e.getClipboardData({ title: e.lang.pastetext.title },
                function (c) { c && e.fire("paste", { type: "text", dataValue: c.dataValue }); e.fire("afterCommandExec", { name: "pastetext", command: d, returnValue: !!c }) })
            }
        }; CKEDITOR.plugins.add("pastetext", { requires: "clipboard", init: function (e) { e.addCommand("pastetext", d); e.ui.addButton && e.ui.addButton("PasteText", { label: e.lang.pastetext.button, command: "pastetext", toolbar: "clipboard,40" }); if (e.config.forcePasteAsPlainText) e.on("beforePaste", function (c) { if (c.data.type != "html") c.data.type = "text" }); e.on("pasteState", function (c) { e.getCommand("pastetext").setState(c.data) }) } })
    }(),
    CKEDITOR.plugins.add("removeformat", { init: function (d) { d.addCommand("removeFormat", CKEDITOR.plugins.removeformat.commands.removeformat); d.ui.addButton && d.ui.addButton("RemoveFormat", { label: d.lang.removeformat.toolbar, command: "removeFormat", toolbar: "cleanup,10" }) } }), CKEDITOR.plugins.removeformat = {
        commands: {
            removeformat: {
                exec: function (d) {
                    for (var e = d._.removeFormatRegex || (d._.removeFormatRegex = RegExp("^(?:" + d.config.removeFormatTags.replace(/,/g, "|") + ")$", "i")), c = d._.removeAttributes || (d._.removeAttributes =
                    d.config.removeFormatAttributes.split(",")), a = CKEDITOR.plugins.removeformat.filter, b = d.getSelection().getRanges(1), j = b.createIterator(), g; g = j.getNextRange() ;) {
                        g.collapsed || g.enlarge(CKEDITOR.ENLARGE_ELEMENT); var h = g.createBookmark(), f = h.startNode, i = h.endNode, k = function (b) { for (var c = d.elementPath(b), g = c.elements, f = 1, h; h = g[f]; f++) { if (h.equals(c.block) || h.equals(c.blockLimit)) break; e.test(h.getName()) && a(d, h) && b.breakParent(h) } }; k(f); if (i) {
                            k(i); for (f = f.getNextSourceNode(true, CKEDITOR.NODE_ELEMENT) ; f;) {
                                if (f.equals(i)) break;
                                k = f.getNextSourceNode(false, CKEDITOR.NODE_ELEMENT); if (!(f.getName() == "img" && f.data("cke-realelement")) && a(d, f)) if (e.test(f.getName())) f.remove(1); else { f.removeAttributes(c); d.fire("removeFormatCleanup", f) } f = k
                            }
                        } g.moveToBookmark(h)
                    } d.forceNextSelectionCheck(); d.getSelection().selectRanges(b)
                }
            }
        }, filter: function (d, e) { for (var c = d._.removeFormatFilters || [], a = 0; a < c.length; a++) if (c[a](e) === false) return false; return true }
    }, CKEDITOR.editor.prototype.addRemoveFormatFilter = function (d) {
        if (!this._.removeFormatFilters) this._.removeFormatFilters =
        []; this._.removeFormatFilters.push(d)
    }, CKEDITOR.config.removeFormatTags = "b,big,code,del,dfn,em,font,i,ins,kbd,q,s,samp,small,span,strike,strong,sub,sup,tt,u,var", CKEDITOR.config.removeFormatAttributes = "class,style,lang,width,height,align,hspace,valign", CKEDITOR.plugins.add("resize", {
        init: function (d) {
            var e, c, a, b, j = d.config, g = d.ui.spaceId("resizer"), h = d.element ? d.element.getDirection(1) : "ltr"; !j.resize_dir && (j.resize_dir = "vertical"); j.resize_maxWidth == void 0 && (j.resize_maxWidth = 3E3); j.resize_maxHeight ==
            void 0 && (j.resize_maxHeight = 3E3); j.resize_minWidth == void 0 && (j.resize_minWidth = 750); j.resize_minHeight == void 0 && (j.resize_minHeight = 250); if (j.resize_enabled !== false) {
                var f = null, i = (j.resize_dir == "both" || j.resize_dir == "horizontal") && j.resize_minWidth != j.resize_maxWidth, k = (j.resize_dir == "both" || j.resize_dir == "vertical") && j.resize_minHeight != j.resize_maxHeight, o = function (g) {
                    var f = e, m = c, p = f + (g.data.$.screenX - a) * (h == "rtl" ? -1 : 1), g = m + (g.data.$.screenY - b); i && (f = Math.max(j.resize_minWidth, Math.min(p, j.resize_maxWidth)));
                    k && (m = Math.max(j.resize_minHeight, Math.min(g, j.resize_maxHeight))); d.resize(i ? f : null, m)
                }, m = function () { CKEDITOR.document.removeListener("mousemove", o); CKEDITOR.document.removeListener("mouseup", m); if (d.document) { d.document.removeListener("mousemove", o); d.document.removeListener("mouseup", m) } }, q = CKEDITOR.tools.addFunction(function (g) {
                    f || (f = d.getResizable()); e = f.$.offsetWidth || 0; c = f.$.offsetHeight || 0; a = g.screenX; b = g.screenY; j.resize_minWidth > e && (j.resize_minWidth = e); j.resize_minHeight > c && (j.resize_minHeight =
                    c); CKEDITOR.document.on("mousemove", o); CKEDITOR.document.on("mouseup", m); if (d.document) { d.document.on("mousemove", o); d.document.on("mouseup", m) } g.preventDefault && g.preventDefault()
                }); d.on("destroy", function () { CKEDITOR.tools.removeFunction(q) }); d.on("uiSpace", function (a) {
                    if (a.data.space == "bottom") {
                        var b = ""; i && !k && (b = " cke_resizer_horizontal"); !i && k && (b = " cke_resizer_vertical"); var c = '<span id="' + g + '" class="cke_resizer' + b + " cke_resizer_" + h + '" title="' + CKEDITOR.tools.htmlEncode(d.lang.common.resize) +
                        '" onmousedown="CKEDITOR.tools.callFunction(' + q + ', event)">' + (h == "ltr" ? "◢" : "◣") + "</span>"; h == "ltr" && b == "ltr" ? a.data.html = a.data.html + c : a.data.html = c + a.data.html
                    }
                }, d, null, 100); d.on("maximize", function (a) { d.ui.space("resizer")[a.data == CKEDITOR.TRISTATE_ON ? "hide" : "show"]() })
            }
        }
    }), CKEDITOR.plugins.add("menubutton", {
        requires: "button,menu", onLoad: function () {
            var d = function (d) {
                var c = this._, a = c.menu; if (c.state !== CKEDITOR.TRISTATE_DISABLED) if (c.on && a) a.hide(); else {
                    c.previousState = c.state; if (!a) {
                        a = c.menu = new CKEDITOR.menu(d,
                        { panel: { className: "cke_menu_panel", attributes: { "aria-label": d.lang.common.options } } }); a.onHide = CKEDITOR.tools.bind(function () { var a = this.command ? d.getCommand(this.command).modes : this.modes; this.setState(!a || a[d.mode] ? c.previousState : CKEDITOR.TRISTATE_DISABLED); c.on = 0 }, this); this.onMenu && a.addListener(this.onMenu)
                    } this.setState(CKEDITOR.TRISTATE_ON); c.on = 1; setTimeout(function () { a.show(CKEDITOR.document.getById(c.id), 4) }, 0)
                }
            }; CKEDITOR.ui.menuButton = CKEDITOR.tools.createClass({
                base: CKEDITOR.ui.button,
                $: function (e) { delete e.panel; this.base(e); this.hasArrow = true; this.click = d }, statics: { handler: { create: function (d) { return new CKEDITOR.ui.menuButton(d) } } }
            })
        }, beforeInit: function (d) { d.ui.addHandler(CKEDITOR.UI_MENUBUTTON, CKEDITOR.ui.menuButton.handler) }
    }), CKEDITOR.UI_MENUBUTTON = "menubutton", function () {
        function d(a, b) { var c = 0, d; for (d in b) if (b[d] == a) { c = 1; break } return c } var e = "", c = function () {
            function b() { d.once("focus", i); d.once("blur", c) } function c(d) {
                var d = d.editor, e = a.getScayt(d), f = d.elementMode == CKEDITOR.ELEMENT_MODE_INLINE;
                if (e) { a.setPaused(d, !e.disabled); a.setControlId(d, e.id); e.destroy(true); delete a.instances[d.name]; f && b() }
            } var d = this, i = function () {
                if (!(typeof a.instances[d.name] != "undefined" || a.instances[d.name] != null)) {
                    var b = d.config, c = {}; c.srcNodeRef = d.editable().$.nodeName == "BODY" ? d.document.getWindow().$.frameElement : d.editable().$; c.assocApp = "CKEDITOR." + CKEDITOR.version + "@" + CKEDITOR.revision; c.customerid = b.scayt_customerid || "1:WvF0D4-UtPqN1-43nkD4-NKvUm2-daQqk3-LmNiI-z7Ysb4-mwry24-T8YrS3-Q2tpq2"; c.customDictionaryIds =
                    b.scayt_customDictionaryIds || ""; c.userDictionaryName = b.scayt_userDictionaryName || ""; c.sLang = b.scayt_sLang || "en_US"; c.onLoad = function () { CKEDITOR.env.ie && CKEDITOR.env.version < 8 || this.addStyle(this.selectorCss(), "padding-bottom: 2px !important;"); d.editable().hasFocus && !a.isControlRestored(d) && this.focus() }; b = window.scayt_custom_params; if (typeof b == "object") for (var e in b) c[e] = b[e]; if (a.getControlId(d)) c.id = a.getControlId(d); var g = new window.scayt(c); g.afterMarkupRemove.push(function (a) {
                        (new CKEDITOR.dom.element(a,
                        g.document)).mergeSiblings()
                    }); if (c = a.instances[d.name]) { g.sLang = c.sLang; g.option(c.option()); g.paused = c.paused } a.instances[d.name] = g; try { g.setDisabled(a.isPaused(d) === false) } catch (h) { } d.fire("showScaytState")
                }
            }; d.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? b() : d.on("contentDom", i); d.on("contentDomUnload", function () {
                for (var a = CKEDITOR.document.getElementsByTag("script"), b = /^dojoIoScript(\d+)$/i, c = /^https?:\/\/svc\.webspellchecker\.net\/spellcheck\/script\/ssrv\.cgi/i, d = 0; d < a.count() ; d++) {
                    var e = a.getItem(d),
                    g = e.getId(), f = e.getAttribute("src"); g && (f && g.match(b) && f.match(c)) && e.remove()
                }
            }); d.on("beforeCommandExec", function (b) { b.data.name == "source" && d.mode == "source" && a.markControlRestore(d) }); d.on("afterCommandExec", function (b) {
                if (a.isScaytEnabled(d) && d.mode == "wysiwyg" && (b.data.name == "undo" || b.data.name == "redo")) {
                    a.getScayt(d).setDisabled(true); a.refresh_timeout && window.clearTimeout(a.refresh_timeout); a.refresh_timeout = window.setTimeout(function () {
                        a.getScayt(d).setDisabled(false); a.getScayt(d).focus();
                        a.getScayt(d).refresh()
                    }, 10)
                }
            }); d.on("destroy", c); d.on("setData", c); d.on("insertElement", function () { var b = a.getScayt(d); if (a.isScaytEnabled(d)) { CKEDITOR.env.ie && d.getSelection().unlock(true); window.setTimeout(function () { b.focus(); b.refresh() }, 10) } }, this, null, 50); d.on("insertHtml", function () { var b = a.getScayt(d); if (a.isScaytEnabled(d)) { CKEDITOR.env.ie && d.getSelection().unlock(true); window.setTimeout(function () { b.focus(); b.refresh() }, 10) } }, this, null, 50); d.on("scaytDialog", function (b) {
                b.data.djConfig =
                window.djConfig; b.data.scayt_control = a.getScayt(d); b.data.tab = e; b.data.scayt = window.scayt
            }); var j = d.dataProcessor; (j = j && j.htmlFilter) && j.addRules({ elements: { span: function (a) { if (a.attributes["data-scayt_word"] && a.attributes["data-scaytid"]) { delete a.name; return a } } } }); var j = CKEDITOR.plugins.undo.Image.prototype, o = typeof j.equalsContent == "function" ? "equalsContent" : "equals"; j[o] = CKEDITOR.tools.override(j[o], function (b) {
                return function (c) {
                    var d = this.contents, e = c.contents, g = a.getScayt(this.editor); if (g &&
                    a.isScaytReady(this.editor)) { this.contents = g.reset(d) || ""; c.contents = g.reset(e) || "" } g = b.apply(this, arguments); this.contents = d; c.contents = e; return g
                }
            }); j = CKEDITOR.editor.prototype; j.checkDirty = CKEDITOR.tools.override(j.checkDirty, function (b) { return function () { var c = null, d = a.getScayt(this); if (d && a.isScaytReady(this)) { c = d.reset(this.getSnapshot()); d = d.reset(this._.previousValue); c = c !== d } else c = b.apply(this); return c } }); d.document && (d.elementMode != CKEDITOR.ELEMENT_MODE_INLINE || d.focusManager.hasFocus) &&
            i()
        }; CKEDITOR.plugins.scayt = {
            engineLoaded: false, instances: {}, controlInfo: {}, setControlInfo: function (a, b) { a && (a.name && typeof this.controlInfo[a.name] != "object") && (this.controlInfo[a.name] = {}); for (var c in b) this.controlInfo[a.name][c] = b[c] }, isControlRestored: function (a) { return a && a.name && this.controlInfo[a.name] ? this.controlInfo[a.name].restored : false }, markControlRestore: function (a) { this.setControlInfo(a, { restored: true }) }, setControlId: function (a, b) { this.setControlInfo(a, { id: b }) }, getControlId: function (a) {
                return a &&
                a.name && this.controlInfo[a.name] && this.controlInfo[a.name].id ? this.controlInfo[a.name].id : null
            }, setPaused: function (a, b) { this.setControlInfo(a, { paused: b }) }, isPaused: function (a) { if (a && a.name && this.controlInfo[a.name]) return this.controlInfo[a.name].paused }, getScayt: function (a) { return this.instances[a.name] }, isScaytReady: function (a) { return this.engineLoaded === true && "undefined" !== typeof window.scayt && this.getScayt(a) }, isScaytEnabled: function (a) { return (a = this.getScayt(a)) ? a.disabled === false : false }, getUiTabs: function (a) {
                var b =
                [], c = a.config.scayt_uiTabs || "1,1,1", c = c.split(","); c[3] = "1"; for (var d = 0; d < 4; d++) b[d] = typeof window.scayt != "undefined" && typeof window.scayt.uiTags != "undefined" ? parseInt(c[d], 10) && window.scayt.uiTags[d] : parseInt(c[d], 10); typeof a.plugins.wsc == "object" ? b.push(1) : b.push(0); return b
            }, loadEngine: function (b) {
                if (CKEDITOR.env.gecko && CKEDITOR.env.version < 10900 || CKEDITOR.env.opera || CKEDITOR.env.air) return b.fire("showScaytState"); if (this.engineLoaded === true) return c.apply(b); if (this.engineLoaded == -1) return CKEDITOR.on("scaytReady",
                function () { c.apply(b) }); CKEDITOR.on("scaytReady", c, b); CKEDITOR.on("scaytReady", function () { this.engineLoaded = true }, this, null, 0); this.engineLoaded = -1; var d = document.location.protocol, d = d.search(/https?:/) != -1 ? d : "http:", d = b.config.scayt_srcUrl || d + "//svc.webspellchecker.net/scayt26/loader__base.js", e = a.parseUrl(d).path + "/"; if (window.scayt == void 0) {
                    CKEDITOR._djScaytConfig = { baseUrl: e, addOnLoad: [function () { CKEDITOR.fireOnce("scaytReady") }], isDebug: false }; CKEDITOR.document.getHead().append(CKEDITOR.document.createElement("script",
                    { attributes: { type: "text/javascript", async: "true", src: d } }))
                } else CKEDITOR.fireOnce("scaytReady"); return null
            }, parseUrl: function (a) { var b; return a.match && (b = a.match(/(.*)[\/\\](.*?\.\w+)$/)) ? { path: b[1], file: b[2] } : a }
        }; var a = CKEDITOR.plugins.scayt, b = function (a, b, c, d, e, j, m) { a.addCommand(d, e); a.addMenuItem(d, { label: c, command: d, group: j, order: m }) }, j = {
            preserveState: true, editorFocus: false, canUndo: false, exec: function (b) {
                if (a.isScaytReady(b)) {
                    var c = a.isScaytEnabled(b); this.setState(c ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_ON);
                    b = a.getScayt(b); b.focus(); b.setDisabled(c)
                } else if (!b.config.scayt_autoStartup && a.engineLoaded >= 0) { b.focus(); this.setState(CKEDITOR.TRISTATE_DISABLED); a.loadEngine(b) }
            }
        }; CKEDITOR.plugins.add("scayt", {
            requires: "menubutton,dialog", beforeInit: function (a) { var b = a.config.scayt_contextMenuItemsOrder || "suggest|moresuggest|control", c = ""; if ((b = b.split("|")) && b.length) for (var d = 0; d < b.length; d++) c = c + ("scayt_" + b[d] + (b.length != parseInt(d, 10) + 1 ? "," : "")); a.config.menu_groups = c + "," + a.config.menu_groups }, checkEnvironment: function () {
                return CKEDITOR.env.opera ||
                CKEDITOR.env.air ? 0 : 1
            }, init: function (c) {
                var h = c.dataProcessor && c.dataProcessor.dataFilter, f = { elements: { span: function (a) { var b = a.attributes; b && b["data-scaytid"] && delete a.name } } }; h && h.addRules(f); var i = {}, k = {}, o = c.addCommand("scaytcheck", j); CKEDITOR.dialog.add("scaytcheck", CKEDITOR.getUrl(this.path + "dialogs/options.js")); h = a.getUiTabs(c); c.addMenuGroup("scaytButton"); c.addMenuGroup("scayt_suggest", -10); c.addMenuGroup("scayt_moresuggest", -9); c.addMenuGroup("scayt_control", -8); var f = {}, m = c.lang.scayt;
                f.scaytToggle = { label: m.enable, command: "scaytcheck", group: "scaytButton" }; if (h[0] == 1) f.scaytOptions = { label: m.options, group: "scaytButton", onClick: function () { e = "options"; c.openDialog("scaytcheck") } }; if (h[1] == 1) f.scaytLangs = { label: m.langs, group: "scaytButton", onClick: function () { e = "langs"; c.openDialog("scaytcheck") } }; if (h[2] == 1) f.scaytDict = { label: m.dictionariesTab, group: "scaytButton", onClick: function () { e = "dictionaries"; c.openDialog("scaytcheck") } }; f.scaytAbout = {
                    label: c.lang.scayt.about, group: "scaytButton",
                    onClick: function () { e = "about"; c.openDialog("scaytcheck") }
                }; if (h[4] == 1) f.scaytWSC = { label: c.lang.wsc.toolbar, group: "scaytButton", command: "checkspell" }; c.addMenuItems(f); c.ui.add("Scayt", CKEDITOR.UI_MENUBUTTON, {
                    label: m.title, title: CKEDITOR.env.opera ? m.opera_title : m.title, modes: { wysiwyg: this.checkEnvironment() }, toolbar: "spellchecker,20", onRender: function () { o.on("state", function () { this.setState(o.state) }, this) }, onMenu: function () {
                        var b = a.isScaytEnabled(c); c.getMenuItem("scaytToggle").label = m[b ? "disable" :
                        "enable"]; var d = a.getUiTabs(c); return { scaytToggle: CKEDITOR.TRISTATE_OFF, scaytOptions: b && d[0] ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED, scaytLangs: b && d[1] ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED, scaytDict: b && d[2] ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED, scaytAbout: b && d[3] ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED, scaytWSC: d[4] ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED }
                    }
                }); c.contextMenu && c.addMenuItems && c.contextMenu.addListener(function (e, f) {
                    if (!a.isScaytEnabled(c) ||
                    f.getRanges()[0].checkReadOnly()) return null; var h = a.getScayt(c), j = h.getScaytNode(); if (!j) return null; var p = h.getWord(j); if (!p) return null; var o = h.getLang(), y = c.config.scayt_contextCommands || "all", p = window.scayt.getSuggestion(p, o), y = y.split("|"), A; for (A in i) { delete c._.menuItems[A]; delete c.commands[A] } for (A in k) { delete c._.menuItems[A]; delete c.commands[A] } if (!p || !p.length) { b(c, "no_sugg", m.noSuggestions, "scayt_no_sugg", { exec: function () { } }, "scayt_control", 1, true); k.scayt_no_sugg = CKEDITOR.TRISTATE_OFF } else {
                        i =
                        {}; k = {}; A = c.config.scayt_moreSuggestions || "on"; var o = false, v = c.config.scayt_maxSuggestions; typeof v != "number" && (v = 5); !v && (v = p.length); for (var u = 0, s = p.length; u < s; u = u + 1) { var x = "scayt_suggestion_" + p[u].replace(" ", "_"), t = function (a, b) { return { exec: function () { h.replace(a, b) } } }(j, p[u]); if (u < v) { b(c, "button_" + x, p[u], x, t, "scayt_suggest", u + 1); k[x] = CKEDITOR.TRISTATE_OFF } else if (A == "on") { b(c, "button_" + x, p[u], x, t, "scayt_moresuggest", u + 1); i[x] = CKEDITOR.TRISTATE_OFF; o = true } } if (o) {
                            c.addMenuItem("scayt_moresuggest",
                            { label: m.moreSuggestions, group: "scayt_moresuggest", order: 10, getItems: function () { return i } }); k.scayt_moresuggest = CKEDITOR.TRISTATE_OFF
                        }
                    } if (d("all", y) || d("ignore", y)) { b(c, "ignore", m.ignore, "scayt_ignore", { exec: function () { h.ignore(j) } }, "scayt_control", 2); k.scayt_ignore = CKEDITOR.TRISTATE_OFF } if (d("all", y) || d("ignoreall", y)) { b(c, "ignore_all", m.ignoreAll, "scayt_ignore_all", { exec: function () { h.ignoreAll(j) } }, "scayt_control", 3); k.scayt_ignore_all = CKEDITOR.TRISTATE_OFF } if (d("all", y) || d("add", y)) {
                        b(c, "add_word",
                        m.addWord, "scayt_add_word", { exec: function () { window.scayt.addWordToUserDictionary(j) } }, "scayt_control", 4); k.scayt_add_word = CKEDITOR.TRISTATE_OFF
                    } h.fireOnContextMenu && h.fireOnContextMenu(c); return k
                }); h = function (b) { b.removeListener(); CKEDITOR.env.opera || CKEDITOR.env.air ? o.setState(CKEDITOR.TRISTATE_DISABLED) : o.setState(a.isScaytEnabled(c) ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF) }; c.on("showScaytState", h); c.on("instanceReady", h); if (c.config.scayt_autoStartup) c.on("instanceReady", function () { a.loadEngine(c) })
            },
            afterInit: function (a) { var b, c = function (a) { if (a.hasAttribute("data-scaytid")) return false }; a._.elementsPath && (b = a._.elementsPath.filters) && b.push(c); a.addRemoveFormatFilter && a.addRemoveFormatFilter(c) }
        })
    }(), function () {
        function d(c, a, b) {
            var d = CKEDITOR.document.getById(b), g; if (d) if (b = c.fire("uiSpace", { space: a, html: "" }).html) {
                c.on("uiSpace", function (b) { b.data.space == a && b.cancel() }, null, null, 1); g = d.append(CKEDITOR.dom.element.createFromHtml(e.output({
                    id: c.id, name: c.name, langDir: c.lang.dir, langCode: c.langCode,
                    space: a, spaceId: c.ui.spaceId(a), content: b
                }))); d.getCustomData("cke_hasshared") ? g.hide() : d.setCustomData("cke_hasshared", 1); g.unselectable(); g.on("mousedown", function (a) { a = a.data; a.getTarget().hasAscendant("a", 1) || a.preventDefault() }); c.focusManager.add(g, 1); c.on("focus", function () { for (var a = 0, b, c = d.getChildren() ; b = c.getItem(a) ; a++) b.type == CKEDITOR.NODE_ELEMENT && (!b.equals(g) && b.hasClass("cke_shared")) && b.hide(); g.show() }); c.on("destroy", function () { g.remove() })
            }
        } var e = CKEDITOR.addTemplate("sharedcontainer",
        '<div id="cke_{name}" class="cke {id} cke_reset_all cke_chrome cke_editor_{name} cke_shared cke_detached cke_{langDir} ' + CKEDITOR.env.cssClass + '" dir="{langDir}" title="' + (CKEDITOR.env.gecko ? " " : "") + '" lang="{langCode}" role="presentation"><div class="cke_inner"><div id="{spaceId}" class="cke_{space}" role="presentation">{content}</div></div></div>'); CKEDITOR.plugins.add("sharedspace", {
            init: function (c) {
                c.on("loaded", function () { var a = c.config.sharedSpaces; if (a) for (var b in a) d(c, b, a[b]) }, null, null,
                9)
            }
        })
    }(), function () {
        var d = { readOnly: 1, preserveState: true, editorFocus: false, exec: function (d) { this.toggleState(); this.refresh(d) }, refresh: function (d) { if (d.document) { var c = this.state == CKEDITOR.TRISTATE_ON && (d.elementMode != CKEDITOR.ELEMENT_MODE_INLINE || d.focusManager.hasFocus) ? "attachClass" : "removeClass"; d.editable()[c]("cke_show_blocks") } } }; CKEDITOR.plugins.add("showblocks", {
            onLoad: function () {
                var d = ["p", "div", "pre", "address", "blockquote", "h1", "h2", "h3", "h4", "h5", "h6"], c, a, b, j, g = CKEDITOR.getUrl(this.path),
                h = !(CKEDITOR.env.ie && CKEDITOR.env.version < 9), f = h ? ":not([contenteditable=false]):not(.cke_show_blocks_off)" : "", i, k; for (c = a = b = j = ""; i = d.pop() ;) { k = d.length ? "," : ""; c = c + (".cke_show_blocks " + i + f + k); b = b + (".cke_show_blocks.cke_contents_ltr " + i + f + k); j = j + (".cke_show_blocks.cke_contents_rtl " + i + f + k); a = a + (".cke_show_blocks " + i + f + "{background-image:url(" + g + "images/block_" + i + ".png)}") } CKEDITOR.addCss((c + "{background-repeat:no-repeat;border:1px dotted gray;padding-top:8px}").concat(a, b + "{background-position:top left;padding-left:8px}",
                j + "{background-position:top right;padding-right:8px}")); h || CKEDITOR.addCss(".cke_show_blocks [contenteditable=false],.cke_show_blocks .cke_show_blocks_off{border:none;padding-top:0;background-image:none}.cke_show_blocks.cke_contents_rtl [contenteditable=false],.cke_show_blocks.cke_contents_rtl .cke_show_blocks_off{padding-right:0}.cke_show_blocks.cke_contents_ltr [contenteditable=false],.cke_show_blocks.cke_contents_ltr .cke_show_blocks_off{padding-left:0}")
            }, init: function (e) {
                function c() { a.refresh(e) }
                if (!e.blockless) { var a = e.addCommand("showblocks", d); a.canUndo = false; e.config.startupOutlineBlocks && a.setState(CKEDITOR.TRISTATE_ON); e.ui.addButton && e.ui.addButton("ShowBlocks", { label: e.lang.showblocks.toolbar, command: "showblocks", toolbar: "tools,20" }); e.on("mode", function () { a.state != CKEDITOR.TRISTATE_DISABLED && a.refresh(e) }); if (e.elementMode == CKEDITOR.ELEMENT_MODE_INLINE) { e.on("focus", c); e.on("blur", c) } e.on("contentDom", function () { a.state != CKEDITOR.TRISTATE_DISABLED && a.refresh(e) }) }
            }
        })
    }(), CKEDITOR.plugins.add("smiley",
    { requires: "dialog", init: function (d) { d.config.smiley_path = d.config.smiley_path || this.path + "images/"; d.addCommand("smiley", new CKEDITOR.dialogCommand("smiley", { allowedContent: "img[alt,height,!src,title,width]", requiredContent: "img" })); d.ui.addButton && d.ui.addButton("Smiley", { label: d.lang.smiley.toolbar, command: "smiley", toolbar: "insert,50" }); CKEDITOR.dialog.add("smiley", this.path + "dialogs/smiley.js") } }), CKEDITOR.config.smiley_images = "regular_smile.png sad_smile.png wink_smile.png teeth_smile.png confused_smile.png tongue_smile.png embarrassed_smile.png omg_smile.png whatchutalkingabout_smile.png angry_smile.png angel_smile.png shades_smile.png devil_smile.png cry_smile.png lightbulb.png thumbs_down.png thumbs_up.png heart.png broken_heart.png kiss.png envelope.png".split(" "),
    CKEDITOR.config.smiley_descriptions = "smiley;sad;wink;laugh;frown;cheeky;blush;surprise;indecision;angry;angel;cool;devil;crying;enlightened;no;yes;heart;broken heart;kiss;mail".split(";"), CKEDITOR.plugins.add("sourcedialog", { init: function (d) { d.addCommand("sourcedialog", new CKEDITOR.dialogCommand("sourcedialog")); CKEDITOR.dialog.add("sourcedialog", this.path + "dialogs/sourcedialog.js"); d.ui.addButton && d.ui.addButton("Sourcedialog", { label: d.lang.sourcedialog.toolbar, command: "sourcedialog", toolbar: "mode,10" }) } }),
    function () {
        CKEDITOR.plugins.add("sourcearea", {
            init: function (e) {
                function c() { this.hide(); this.setStyle("height", this.getParent().$.clientHeight + "px"); this.setStyle("width", this.getParent().$.clientWidth + "px"); this.show() } if (e.elementMode != CKEDITOR.ELEMENT_MODE_INLINE) {
                    var a = CKEDITOR.plugins.sourcearea; e.addMode("source", function (a) {
                        var j = e.ui.space("contents").getDocument().createElement("textarea"); j.setStyles(CKEDITOR.tools.extend({
                            width: CKEDITOR.env.ie7Compat ? "99%" : "100%", height: "100%", resize: "none",
                            outline: "none", "text-align": "left"
                        }, CKEDITOR.tools.cssVendorPrefix("tab-size", e.config.sourceAreaTabSize || 4))); j.setAttribute("dir", "ltr"); j.addClass("cke_source cke_reset cke_enable_context_menu"); e.ui.space("contents").append(j); j = e.editable(new d(e, j)); j.setData(e.getData(1)); if (CKEDITOR.env.ie) { j.attachListener(e, "resize", c, j); j.attachListener(CKEDITOR.document.getWindow(), "resize", c, j); CKEDITOR.tools.setTimeout(c, 0, j) } e.fire("ariaWidget", this); a()
                    }); e.addCommand("source", a.commands.source); e.ui.addButton &&
                    e.ui.addButton("Source", { label: e.lang.sourcearea.toolbar, command: "source", toolbar: "mode,10" }); e.on("mode", function () { e.getCommand("source").setState(e.mode == "source" ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF) })
                }
            }
        }); var d = CKEDITOR.tools.createClass({
            base: CKEDITOR.editable, proto: {
                setData: function (d) { this.setValue(d); this.editor.fire("dataReady") }, getData: function () { return this.getValue() }, insertHtml: function () { }, insertElement: function () { }, insertText: function () { }, setReadOnly: function (d) {
                    this[(d ? "set" :
                    "remove") + "Attribute"]("readOnly", "readonly")
                }, detach: function () { d.baseProto.detach.call(this); this.clearCustomData(); this.remove() }
            }
        })
    }(), CKEDITOR.plugins.sourcearea = { commands: { source: { modes: { wysiwyg: 1, source: 1 }, editorFocus: !1, readOnly: 1, exec: function (d) { d.mode == "wysiwyg" && d.fire("saveSnapshot"); d.getCommand("source").setState(CKEDITOR.TRISTATE_DISABLED); d.setMode(d.mode == "source" ? "wysiwyg" : "source") }, canUndo: !1 } } }, CKEDITOR.plugins.add("specialchar", {
        availableLangs: {
            ar: 1, bg: 1, ca: 1, cs: 1, cy: 1, de: 1,
            el: 1, en: 1, eo: 1, es: 1, et: 1, fa: 1, fi: 1, fr: 1, "fr-ca": 1, gl: 1, he: 1, hr: 1, hu: 1, id: 1, it: 1, ja: 1, km: 1, ku: 1, lv: 1, nb: 1, nl: 1, no: 1, pl: 1, pt: 1, "pt-br": 1, ru: 1, si: 1, sk: 1, sl: 1, sq: 1, sv: 1, th: 1, tr: 1, ug: 1, uk: 1, vi: 1, zh: 1, "zh-cn": 1
        }, requires: "dialog", init: function (d) {
            var e = this; CKEDITOR.dialog.add("specialchar", this.path + "dialogs/specialchar.js"); d.addCommand("specialchar", {
                exec: function () {
                    var c = d.langCode, c = e.availableLangs[c] ? c : e.availableLangs[c.replace(/-.*/, "")] ? c.replace(/-.*/, "") : "en"; CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(e.path +
                    "dialogs/lang/" + c + ".js"), function () { CKEDITOR.tools.extend(d.lang.specialchar, e.langEntries[c]); d.openDialog("specialchar") })
                }, modes: { wysiwyg: 1 }, canUndo: false
            }); d.ui.addButton && d.ui.addButton("SpecialChar", { label: d.lang.specialchar.toolbar, command: "specialchar", toolbar: "insert,50" })
        }
    }), CKEDITOR.config.specialChars = "! &quot; # $ % &amp; ' ( ) * + - . / 0 1 2 3 4 5 6 7 8 9 : ; &lt; = &gt; ? @ A B C D E F G H I J K L M N O P Q R S T U V W X Y Z [ ] ^ _ ` a b c d e f g h i j k l m n o p q r s t u v w x y z { | } ~ &euro; &lsquo; &rsquo; &ldquo; &rdquo; &ndash; &mdash; &iexcl; &cent; &pound; &curren; &yen; &brvbar; &sect; &uml; &copy; &ordf; &laquo; &not; &reg; &macr; &deg; &sup2; &sup3; &acute; &micro; &para; &middot; &cedil; &sup1; &ordm; &raquo; &frac14; &frac12; &frac34; &iquest; &Agrave; &Aacute; &Acirc; &Atilde; &Auml; &Aring; &AElig; &Ccedil; &Egrave; &Eacute; &Ecirc; &Euml; &Igrave; &Iacute; &Icirc; &Iuml; &ETH; &Ntilde; &Ograve; &Oacute; &Ocirc; &Otilde; &Ouml; &times; &Oslash; &Ugrave; &Uacute; &Ucirc; &Uuml; &Yacute; &THORN; &szlig; &agrave; &aacute; &acirc; &atilde; &auml; &aring; &aelig; &ccedil; &egrave; &eacute; &ecirc; &euml; &igrave; &iacute; &icirc; &iuml; &eth; &ntilde; &ograve; &oacute; &ocirc; &otilde; &ouml; &divide; &oslash; &ugrave; &uacute; &ucirc; &uuml; &yacute; &thorn; &yuml; &OElig; &oelig; &#372; &#374 &#373 &#375; &sbquo; &#8219; &bdquo; &hellip; &trade; &#9658; &bull; &rarr; &rArr; &hArr; &diams; &asymp;".split(" "),
    function () {
        CKEDITOR.plugins.add("stylescombo", {
            requires: "richcombo", init: function (d) {
                var e = d.config, c = d.lang.stylescombo, a = {}, b = [], j = []; d.on("stylesSet", function (c) {
                    if (c = c.data.styles) {
                        for (var h, f, i = 0, k = c.length; i < k; i++) { h = c[i]; if (!(d.blockless && h.element in CKEDITOR.dtd.$block)) { f = h.name; h = new CKEDITOR.style(h); if (!d.filter.customConfig || d.filter.check(h)) { h._name = f; h._.enterMode = e.enterMode; h._.weight = i + (h.type == CKEDITOR.STYLE_OBJECT ? 1 : h.type == CKEDITOR.STYLE_BLOCK ? 2 : 3) * 1E3; a[f] = h; b.push(h); j.push(h) } } } b.sort(function (a,
                        b) { return a._.weight - b._.weight })
                    }
                }); d.ui.addRichCombo("Styles", {
                    label: c.label, title: c.panelTitle, toolbar: "styles,10", allowedContent: j, panel: { css: [CKEDITOR.skin.getPath("editor")].concat(e.contentsCss), multiSelect: true, attributes: { "aria-label": c.panelTitle } }, init: function () { var a, d, e, i, j, o; j = 0; for (o = b.length; j < o; j++) { a = b[j]; d = a._name; i = a.type; if (i != e) { this.startGroup(c["panelTitle" + i]); e = i } this.add(d, a.type == CKEDITOR.STYLE_OBJECT ? d : a.buildPreview(), d) } this.commit() }, onClick: function (b) {
                        d.focus();
                        d.fire("saveSnapshot"); var b = a[b], c = d.elementPath(); d[b.checkActive(c) ? "removeStyle" : "applyStyle"](b); d.fire("saveSnapshot")
                    }, onRender: function () { d.on("selectionChange", function (b) { for (var c = this.getValue(), b = b.data.path.elements, d = 0, e = b.length, j; d < e; d++) { j = b[d]; for (var o in a) if (a[o].checkElementRemovable(j, true)) { o != c && this.setValue(o); return } } this.setValue("") }, this) }, onOpen: function () {
                        var b = d.getSelection().getSelectedElement(), b = d.elementPath(b), e = [0, 0, 0, 0]; this.showAll(); this.unmarkAll(); for (var f in a) {
                            var i =
                            a[f], j = i.type; i.checkApplicable(b, d.activeFilter) ? e[j]++ : this.hideItem(f); i.checkActive(b) && this.mark(f)
                        } e[CKEDITOR.STYLE_BLOCK] || this.hideGroup(c["panelTitle" + CKEDITOR.STYLE_BLOCK]); e[CKEDITOR.STYLE_INLINE] || this.hideGroup(c["panelTitle" + CKEDITOR.STYLE_INLINE]); e[CKEDITOR.STYLE_OBJECT] || this.hideGroup(c["panelTitle" + CKEDITOR.STYLE_OBJECT])
                    }, refresh: function () { var b = d.elementPath(); if (b) { for (var c in a) if (a[c].checkApplicable(b, d.activeFilter)) return; this.setState(CKEDITOR.TRISTATE_DISABLED) } }, reset: function () {
                        a =
                        {}; b = []
                    }
                })
            }
        })
    }(), function () {
        function d(a) {
            return {
                editorFocus: false, canUndo: false, modes: { wysiwyg: 1 }, exec: function (c) {
                    if (c.editable().hasFocus) {
                        var d = c.getSelection(), e; if (e = (new CKEDITOR.dom.elementPath(d.getCommonAncestor(), d.root)).contains({ td: 1, th: 1 }, 1)) {
                            var d = c.createRange(), f = CKEDITOR.tools.tryThese(function () { var c = e.getParent().$.cells[e.$.cellIndex + (a ? -1 : 1)]; c.parentNode.parentNode; return c }, function () {
                                var c = e.getParent(), c = c.getAscendant("table").$.rows[c.$.rowIndex + (a ? -1 : 1)]; return c.cells[a ?
                                c.cells.length - 1 : 0]
                            }); if (!f && !a) { for (var i = e.getAscendant("table").$, f = e.getParent().$.cells, i = new CKEDITOR.dom.element(i.insertRow(-1), c.document), k = 0, o = f.length; k < o; k++) i.append((new CKEDITOR.dom.element(f[k], c.document)).clone(false, false)).appendBogus(); d.moveToElementEditStart(i) } else if (f) { f = new CKEDITOR.dom.element(f); d.moveToElementEditStart(f); (!d.checkStartOfBlock() || !d.checkEndOfBlock()) && d.selectNodeContents(f) } else return true; d.select(true); return true
                        }
                    } return false
                }
            }
        } var e = {
            editorFocus: false,
            modes: { wysiwyg: 1, source: 1 }
        }, c = { exec: function (a) { a.container.focusNext(true, a.tabIndex) } }, a = { exec: function (a) { a.container.focusPrevious(true, a.tabIndex) } }; CKEDITOR.plugins.add("tab", {
            init: function (b) {
                for (var j = b.config.enableTabKeyTools !== false, g = b.config.tabSpaces || 0, h = ""; g--;) h = h + " "; if (h) b.on("key", function (a) { if (a.data.keyCode == 9) { b.insertHtml(h); a.cancel() } }); if (j) b.on("key", function (a) {
                    (a.data.keyCode == 9 && b.execCommand("selectNextCell") || a.data.keyCode == CKEDITOR.SHIFT + 9 && b.execCommand("selectPreviousCell")) &&
                    a.cancel()
                }); b.addCommand("blur", CKEDITOR.tools.extend(c, e)); b.addCommand("blurBack", CKEDITOR.tools.extend(a, e)); b.addCommand("selectNextCell", d()); b.addCommand("selectPreviousCell", d(true))
            }
        })
    }(), CKEDITOR.dom.element.prototype.focusNext = function (d, e) {
        var c = e === void 0 ? this.getTabIndex() : e, a, b, j, g, h, f; if (c <= 0) for (h = this.getNextSourceNode(d, CKEDITOR.NODE_ELEMENT) ; h;) { if (h.isVisible() && h.getTabIndex() === 0) { j = h; break } h = h.getNextSourceNode(false, CKEDITOR.NODE_ELEMENT) } else for (h = this.getDocument().getBody().getFirst() ; h =
        h.getNextSourceNode(false, CKEDITOR.NODE_ELEMENT) ;) { if (!a) if (!b && h.equals(this)) { b = true; if (d) { if (!(h = h.getNextSourceNode(true, CKEDITOR.NODE_ELEMENT))) break; a = 1 } } else b && !this.contains(h) && (a = 1); if (h.isVisible() && !((f = h.getTabIndex()) < 0)) { if (a && f == c) { j = h; break } if (f > c && (!j || !g || f < g)) { j = h; g = f } else if (!j && f === 0) { j = h; g = f } } } j && j.focus()
    }, CKEDITOR.dom.element.prototype.focusPrevious = function (d, e) {
        for (var c = e === void 0 ? this.getTabIndex() : e, a, b, j, g = 0, h, f = this.getDocument().getBody().getLast() ; f = f.getPreviousSourceNode(false,
        CKEDITOR.NODE_ELEMENT) ;) { if (!a) if (!b && f.equals(this)) { b = true; if (d) { if (!(f = f.getPreviousSourceNode(true, CKEDITOR.NODE_ELEMENT))) break; a = 1 } } else b && !this.contains(f) && (a = 1); if (f.isVisible() && !((h = f.getTabIndex()) < 0)) if (c <= 0) { if (a && h === 0) { j = f; break } if (h > g) { j = f; g = h } } else { if (a && h == c) { j = f; break } if (h < c && (!j || h > g)) { j = f; g = h } } } j && j.focus()
    }, CKEDITOR.plugins.add("table", {
        requires: "dialog", init: function (d) {
            function e(a) {
                return CKEDITOR.tools.extend(a || {}, {
                    contextSensitive: 1, refresh: function (a, c) {
                        this.setState(c.contains("table",
                        1) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED)
                    }
                })
            } if (!d.blockless) {
                var c = d.lang.table; d.addCommand("table", new CKEDITOR.dialogCommand("table", { context: "table", allowedContent: "table{width,height}[align,border,cellpadding,cellspacing,summary];caption tbody thead tfoot;th td tr[scope];" + (d.plugins.dialogadvtab ? "table" + d.plugins.dialogadvtab.allowedContent() : ""), requiredContent: "table", contentTransformations: [["table{width}: sizeToStyle", "table[width]: sizeToAttribute"]] })); d.addCommand("tableProperties",
                new CKEDITOR.dialogCommand("tableProperties", e())); d.addCommand("tableDelete", e({ exec: function (a) { var b = a.elementPath().contains("table", 1); if (b) { var c = b.getParent(); c.getChildCount() == 1 && !c.is("body", "td", "th") && (b = c); a = a.createRange(); a.moveToPosition(b, CKEDITOR.POSITION_BEFORE_START); b.remove(); a.select() } } })); d.ui.addButton && d.ui.addButton("Table", { label: c.toolbar, command: "table", toolbar: "insert,30" }); CKEDITOR.dialog.add("table", this.path + "dialogs/table.js"); CKEDITOR.dialog.add("tableProperties",
                this.path + "dialogs/table.js"); d.addMenuItems && d.addMenuItems({ table: { label: c.menu, command: "tableProperties", group: "table", order: 5 }, tabledelete: { label: c.deleteTable, command: "tableDelete", group: "table", order: 1 } }); d.on("doubleclick", function (a) { if (a.data.element.is("table")) a.data.dialog = "tableProperties" }); d.contextMenu && d.contextMenu.addListener(function () { return { tabledelete: CKEDITOR.TRISTATE_OFF, table: CKEDITOR.TRISTATE_OFF } })
            }
        }
    }), function () {
        function d(a) {
            function b(a) {
                if (!(c.length > 0) && a.type == CKEDITOR.NODE_ELEMENT &&
                m.test(a.getName()) && !a.getCustomData("selected_cell")) { CKEDITOR.dom.element.setMarker(d, a, "selected_cell", true); c.push(a) }
            } for (var a = a.getRanges(), c = [], d = {}, e = 0; e < a.length; e++) {
                var f = a[e]; if (f.collapsed) { f = f.getCommonAncestor(); (f = f.getAscendant("td", true) || f.getAscendant("th", true)) && c.push(f) } else {
                    var f = new CKEDITOR.dom.walker(f), g; for (f.guard = b; g = f.next() ;) if (g.type != CKEDITOR.NODE_ELEMENT || !g.is(CKEDITOR.dtd.table)) if ((g = g.getAscendant("td", true) || g.getAscendant("th", true)) && !g.getCustomData("selected_cell")) {
                        CKEDITOR.dom.element.setMarker(d,
                        g, "selected_cell", true); c.push(g)
                    }
                }
            } CKEDITOR.dom.element.clearAllMarkers(d); return c
        } function e(a, b) {
            for (var c = d(a), e = c[0], f = e.getAscendant("table"), e = e.getDocument(), g = c[0].getParent(), h = g.$.rowIndex, c = c[c.length - 1], i = c.getParent().$.rowIndex + c.$.rowSpan - 1, c = new CKEDITOR.dom.element(f.$.rows[i]), h = b ? h : i, g = b ? g : c, c = CKEDITOR.tools.buildTableMap(f), f = c[h], h = b ? c[h - 1] : c[h + 1], c = c[0].length, e = e.createElement("tr"), i = 0; f[i] && i < c; i++) {
                var j; if (f[i].rowSpan > 1 && h && f[i] == h[i]) { j = f[i]; j.rowSpan = j.rowSpan + 1 } else {
                    j =
                    (new CKEDITOR.dom.element(f[i])).clone(); j.removeAttribute("rowSpan"); j.appendBogus(); e.append(j); j = j.$
                } i = i + (j.colSpan - 1)
            } b ? e.insertBefore(g) : e.insertAfter(g)
        } function c(a) {
            if (a instanceof CKEDITOR.dom.selection) {
                for (var b = d(a), e = b[0].getAscendant("table"), f = CKEDITOR.tools.buildTableMap(e), a = b[0].getParent().$.rowIndex, b = b[b.length - 1], g = b.getParent().$.rowIndex + b.$.rowSpan - 1, b = [], h = a; h <= g; h++) {
                    for (var i = f[h], j = new CKEDITOR.dom.element(e.$.rows[h]), k = 0; k < i.length; k++) {
                        var m = new CKEDITOR.dom.element(i[k]),
                        o = m.getParent().$.rowIndex; if (m.$.rowSpan == 1) m.remove(); else { m.$.rowSpan = m.$.rowSpan - 1; if (o == h) { o = f[h + 1]; o[k - 1] ? m.insertAfter(new CKEDITOR.dom.element(o[k - 1])) : (new CKEDITOR.dom.element(e.$.rows[h + 1])).append(m, 1) } } k = k + (m.$.colSpan - 1)
                    } b.push(j)
                } f = e.$.rows; e = new CKEDITOR.dom.element(f[g + 1] || (a > 0 ? f[a - 1] : null) || e.$.parentNode); for (h = b.length; h >= 0; h--) c(b[h]); return e
            } if (a instanceof CKEDITOR.dom.element) { e = a.getAscendant("table"); e.$.rows.length == 1 ? e.remove() : a.remove() } return null
        } function a(a, b) {
            for (var c =
            b ? Infinity : 0, d = 0; d < a.length; d++) { var e; e = a[d]; for (var f = b, g = e.getParent().$.cells, h = 0, i = 0; i < g.length; i++) { var j = g[i], h = h + (f ? 1 : j.colSpan); if (j == e.$) break } e = h - 1; if (b ? e < c : e > c) c = e } return c
        } function b(b, c) {
            for (var e = d(b), f = e[0].getAscendant("table"), g = a(e, 1), e = a(e), g = c ? g : e, h = CKEDITOR.tools.buildTableMap(f), f = [], e = [], i = h.length, j = 0; j < i; j++) { f.push(h[j][g]); e.push(c ? h[j][g - 1] : h[j][g + 1]) } for (j = 0; j < i; j++) if (f[j]) {
                if (f[j].colSpan > 1 && e[j] == f[j]) { g = f[j]; g.colSpan = g.colSpan + 1 } else {
                    g = (new CKEDITOR.dom.element(f[j])).clone();
                    g.removeAttribute("colSpan"); g.appendBogus(); g[c ? "insertBefore" : "insertAfter"].call(g, new CKEDITOR.dom.element(f[j])); g = g.$
                } j = j + (g.rowSpan - 1)
            }
        } function j(a, b) { var c = a.getStartElement(); if (c = c.getAscendant("td", 1) || c.getAscendant("th", 1)) { var d = c.clone(); d.appendBogus(); b ? d.insertBefore(c) : d.insertAfter(c) } } function g(a) {
            if (a instanceof CKEDITOR.dom.selection) {
                var a = d(a), b = a[0] && a[0].getAscendant("table"), c; a: {
                    var e = 0; c = a.length - 1; for (var f = {}, i, j; i = a[e++];) CKEDITOR.dom.element.setMarker(f, i, "delete_cell",
                    true); for (e = 0; i = a[e++];) if ((j = i.getPrevious()) && !j.getCustomData("delete_cell") || (j = i.getNext()) && !j.getCustomData("delete_cell")) { CKEDITOR.dom.element.clearAllMarkers(f); c = j; break a } CKEDITOR.dom.element.clearAllMarkers(f); j = a[0].getParent(); if (j = j.getPrevious()) c = j.getLast(); else { j = a[c].getParent(); c = (j = j.getNext()) ? j.getChild(0) : null }
                } for (j = a.length - 1; j >= 0; j--) g(a[j]); c ? h(c, true) : b && b.remove()
            } else if (a instanceof CKEDITOR.dom.element) { b = a.getParent(); b.getChildCount() == 1 ? b.remove() : a.remove() }
        }
        function h(a, b) { var c = a.getDocument(), d = CKEDITOR.document; if (CKEDITOR.env.ie && CKEDITOR.env.version < 11) { d.focus(); c.focus() } c = new CKEDITOR.dom.range(c); if (!c["moveToElementEdit" + (b ? "End" : "Start")](a)) { c.selectNodeContents(a); c.collapse(b ? false : true) } c.select(true) } function f(a, b, c) { a = a[b]; if (typeof c == "undefined") return a; for (b = 0; a && b < a.length; b++) { if (c.is && a[b] == c.$) return b; if (b == c) return new CKEDITOR.dom.element(a[b]) } return c.is ? -1 : null } function i(a, b, c) {
            var e = d(a), g; if ((b ? e.length != 1 : e.length <
            2) || (g = a.getCommonAncestor()) && g.type == CKEDITOR.NODE_ELEMENT && g.is("table")) return false; var h, a = e[0]; g = a.getAscendant("table"); var i = CKEDITOR.tools.buildTableMap(g), j = i.length, k = i[0].length, m = a.getParent().$.rowIndex, o = f(i, m, a); if (b) { var x; try { var t = parseInt(a.getAttribute("rowspan"), 10) || 1; h = parseInt(a.getAttribute("colspan"), 10) || 1; x = i[b == "up" ? m - t : b == "down" ? m + t : m][b == "left" ? o - h : b == "right" ? o + h : o] } catch (z) { return false } if (!x || a.$ == x) return false; e[b == "up" || b == "left" ? "unshift" : "push"](new CKEDITOR.dom.element(x)) } for (var b =
            a.getDocument(), B = m, t = x = 0, F = !c && new CKEDITOR.dom.documentFragment(b), C = 0, b = 0; b < e.length; b++) {
                h = e[b]; var D = h.getParent(), E = h.getFirst(), I = h.$.colSpan, J = h.$.rowSpan, D = D.$.rowIndex, G = f(i, D, h), C = C + I * J, t = Math.max(t, G - o + I); x = Math.max(x, D - m + J); if (!c) { I = h; (J = I.getBogus()) && J.remove(); I.trim(); if (h.getChildren().count()) { if (D != B && E && (!E.isBlockBoundary || !E.isBlockBoundary({ br: 1 }))) (B = F.getLast(CKEDITOR.dom.walker.whitespaces(true))) && (!B.is || !B.is("br")) && F.append("br"); h.moveChildren(F) } b ? h.remove() : h.setHtml("") } B =
                D
            } if (c) return x * t == C; F.moveChildren(a); a.appendBogus(); t >= k ? a.removeAttribute("rowSpan") : a.$.rowSpan = x; x >= j ? a.removeAttribute("colSpan") : a.$.colSpan = t; c = new CKEDITOR.dom.nodeList(g.$.rows); e = c.count(); for (b = e - 1; b >= 0; b--) { g = c.getItem(b); if (!g.$.cells.length) { g.remove(); e++ } } return a
        } function k(a, b) {
            var c = d(a); if (c.length > 1) return false; if (b) return true; var c = c[0], e = c.getParent(), g = e.getAscendant("table"), h = CKEDITOR.tools.buildTableMap(g), i = e.$.rowIndex, j = f(h, i, c), k = c.$.rowSpan, m; if (k > 1) {
                m = Math.ceil(k /
                2); for (var k = Math.floor(k / 2), e = i + m, g = new CKEDITOR.dom.element(g.$.rows[e]), h = f(h, e), o, e = c.clone(), i = 0; i < h.length; i++) { o = h[i]; if (o.parentNode == g.$ && i > j) { e.insertBefore(new CKEDITOR.dom.element(o)); break } else o = null } o || g.append(e, true)
            } else { k = m = 1; g = e.clone(); g.insertAfter(e); g.append(e = c.clone()); o = f(h, i); for (j = 0; j < o.length; j++) o[j].rowSpan++ } e.appendBogus(); c.$.rowSpan = m; e.$.rowSpan = k; m == 1 && c.removeAttribute("rowSpan"); k == 1 && e.removeAttribute("rowSpan"); return e
        } function o(a, b) {
            var c = d(a); if (c.length >
            1) return false; if (b) return true; var c = c[0], e = c.getParent(), g = e.getAscendant("table"), g = CKEDITOR.tools.buildTableMap(g), h = f(g, e.$.rowIndex, c), i = c.$.colSpan; if (i > 1) { e = Math.ceil(i / 2); i = Math.floor(i / 2) } else { for (var i = e = 1, j = [], k = 0; k < g.length; k++) { var m = g[k]; j.push(m[h]); m[h].rowSpan > 1 && (k = k + (m[h].rowSpan - 1)) } for (g = 0; g < j.length; g++) j[g].colSpan++ } g = c.clone(); g.insertAfter(c); g.appendBogus(); c.$.colSpan = e; g.$.colSpan = i; e == 1 && c.removeAttribute("colSpan"); i == 1 && g.removeAttribute("colSpan"); return g
        } var m =
        /^(?:td|th)$/; CKEDITOR.plugins.tabletools = {
            requires: "table,dialog,contextmenu", init: function (a) {
                function f(a) { return CKEDITOR.tools.extend(a || {}, { contextSensitive: 1, refresh: function (a, b) { this.setState(b.contains({ td: 1, th: 1 }, 1) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED) } }) } function m(b, c) { var d = a.addCommand(b, c); a.addFeature(d) } var r = a.lang.table; m("cellProperties", new CKEDITOR.dialogCommand("cellProperties", f({
                    allowedContent: "td th{width,height,border-color,background-color,white-space,vertical-align,text-align}[colspan,rowspan]",
                    requiredContent: "table"
                }))); CKEDITOR.dialog.add("cellProperties", this.path + "dialogs/tableCell.js"); m("rowDelete", f({ requiredContent: "table", exec: function (a) { a = a.getSelection(); h(c(a)) } })); m("rowInsertBefore", f({ requiredContent: "table", exec: function (a) { a = a.getSelection(); e(a, true) } })); m("rowInsertAfter", f({ requiredContent: "table", exec: function (a) { a = a.getSelection(); e(a) } })); m("columnDelete", f({
                    requiredContent: "table", exec: function (a) {
                        for (var a = a.getSelection(), a = d(a), b = a[0], c = a[a.length - 1], a = b.getAscendant("table"),
                        e = CKEDITOR.tools.buildTableMap(a), f, g, i = [], j = 0, k = e.length; j < k; j++) for (var l = 0, m = e[j].length; l < m; l++) { e[j][l] == b.$ && (f = l); e[j][l] == c.$ && (g = l) } for (j = f; j <= g; j++) for (l = 0; l < e.length; l++) { c = e[l]; b = new CKEDITOR.dom.element(a.$.rows[l]); c = new CKEDITOR.dom.element(c[j]); if (c.$) { c.$.colSpan == 1 ? c.remove() : c.$.colSpan = c.$.colSpan - 1; l = l + (c.$.rowSpan - 1); b.$.cells.length || i.push(b) } } g = a.$.rows[0] && a.$.rows[0].cells; f = new CKEDITOR.dom.element(g[f] || (f ? g[f - 1] : a.$.parentNode)); i.length == k && a.remove(); f && h(f, true)
                    }
                }));
                m("columnInsertBefore", f({ requiredContent: "table", exec: function (a) { a = a.getSelection(); b(a, true) } })); m("columnInsertAfter", f({ requiredContent: "table", exec: function (a) { a = a.getSelection(); b(a) } })); m("cellDelete", f({ requiredContent: "table", exec: function (a) { a = a.getSelection(); g(a) } })); m("cellMerge", f({ allowedContent: "td[colspan,rowspan]", requiredContent: "td[colspan,rowspan]", exec: function (a) { h(i(a.getSelection()), true) } })); m("cellMergeRight", f({
                    allowedContent: "td[colspan]", requiredContent: "td[colspan]",
                    exec: function (a) { h(i(a.getSelection(), "right"), true) }
                })); m("cellMergeDown", f({ allowedContent: "td[rowspan]", requiredContent: "td[rowspan]", exec: function (a) { h(i(a.getSelection(), "down"), true) } })); m("cellVerticalSplit", f({ allowedContent: "td[rowspan]", requiredContent: "td[rowspan]", exec: function (a) { h(k(a.getSelection())) } })); m("cellHorizontalSplit", f({ allowedContent: "td[colspan]", requiredContent: "td[colspan]", exec: function (a) { h(o(a.getSelection())) } })); m("cellInsertBefore", f({
                    requiredContent: "table", exec: function (a) {
                        a =
                        a.getSelection(); j(a, true)
                    }
                })); m("cellInsertAfter", f({ requiredContent: "table", exec: function (a) { a = a.getSelection(); j(a) } })); a.addMenuItems && a.addMenuItems({
                    tablecell: {
                        label: r.cell.menu, group: "tablecell", order: 1, getItems: function () {
                            var b = a.getSelection(), c = d(b); return {
                                tablecell_insertBefore: CKEDITOR.TRISTATE_OFF, tablecell_insertAfter: CKEDITOR.TRISTATE_OFF, tablecell_delete: CKEDITOR.TRISTATE_OFF, tablecell_merge: i(b, null, true) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED, tablecell_merge_right: i(b,
                                "right", true) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED, tablecell_merge_down: i(b, "down", true) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED, tablecell_split_vertical: k(b, true) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED, tablecell_split_horizontal: o(b, true) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED, tablecell_properties: c.length > 0 ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED
                            }
                        }
                    }, tablecell_insertBefore: { label: r.cell.insertBefore, group: "tablecell", command: "cellInsertBefore", order: 5 },
                    tablecell_insertAfter: { label: r.cell.insertAfter, group: "tablecell", command: "cellInsertAfter", order: 10 }, tablecell_delete: { label: r.cell.deleteCell, group: "tablecell", command: "cellDelete", order: 15 }, tablecell_merge: { label: r.cell.merge, group: "tablecell", command: "cellMerge", order: 16 }, tablecell_merge_right: { label: r.cell.mergeRight, group: "tablecell", command: "cellMergeRight", order: 17 }, tablecell_merge_down: { label: r.cell.mergeDown, group: "tablecell", command: "cellMergeDown", order: 18 }, tablecell_split_horizontal: {
                        label: r.cell.splitHorizontal,
                        group: "tablecell", command: "cellHorizontalSplit", order: 19
                    }, tablecell_split_vertical: { label: r.cell.splitVertical, group: "tablecell", command: "cellVerticalSplit", order: 20 }, tablecell_properties: { label: r.cell.title, group: "tablecellproperties", command: "cellProperties", order: 21 }, tablerow: { label: r.row.menu, group: "tablerow", order: 1, getItems: function () { return { tablerow_insertBefore: CKEDITOR.TRISTATE_OFF, tablerow_insertAfter: CKEDITOR.TRISTATE_OFF, tablerow_delete: CKEDITOR.TRISTATE_OFF } } }, tablerow_insertBefore: {
                        label: r.row.insertBefore,
                        group: "tablerow", command: "rowInsertBefore", order: 5
                    }, tablerow_insertAfter: { label: r.row.insertAfter, group: "tablerow", command: "rowInsertAfter", order: 10 }, tablerow_delete: { label: r.row.deleteRow, group: "tablerow", command: "rowDelete", order: 15 }, tablecolumn: { label: r.column.menu, group: "tablecolumn", order: 1, getItems: function () { return { tablecolumn_insertBefore: CKEDITOR.TRISTATE_OFF, tablecolumn_insertAfter: CKEDITOR.TRISTATE_OFF, tablecolumn_delete: CKEDITOR.TRISTATE_OFF } } }, tablecolumn_insertBefore: {
                        label: r.column.insertBefore,
                        group: "tablecolumn", command: "columnInsertBefore", order: 5
                    }, tablecolumn_insertAfter: { label: r.column.insertAfter, group: "tablecolumn", command: "columnInsertAfter", order: 10 }, tablecolumn_delete: { label: r.column.deleteColumn, group: "tablecolumn", command: "columnDelete", order: 15 }
                }); a.contextMenu && a.contextMenu.addListener(function (a, b, c) { return (a = c.contains({ td: 1, th: 1 }, 1)) && !a.isReadOnly() ? { tablecell: CKEDITOR.TRISTATE_OFF, tablerow: CKEDITOR.TRISTATE_OFF, tablecolumn: CKEDITOR.TRISTATE_OFF } : null })
            }, getSelectedCells: d
        };
        CKEDITOR.plugins.add("tabletools", CKEDITOR.plugins.tabletools)
    }(), CKEDITOR.tools.buildTableMap = function (d) { for (var d = d.$.rows, e = -1, c = [], a = 0; a < d.length; a++) { e++; !c[e] && (c[e] = []); for (var b = -1, j = 0; j < d[a].cells.length; j++) { var g = d[a].cells[j]; for (b++; c[e][b];) b++; for (var h = isNaN(g.colSpan) ? 1 : g.colSpan, g = isNaN(g.rowSpan) ? 1 : g.rowSpan, f = 0; f < g; f++) { c[e + f] || (c[e + f] = []); for (var i = 0; i < h; i++) c[e + f][b + i] = d[a].cells[j] } b = b + (h - 1) } } return c }, function () {
        function d(a) {
            function c() {
                for (var f = d(), i = CKEDITOR.tools.clone(a.config.toolbarGroups) ||
                e(a), j = 0; j < i.length; j++) { var k = i[j]; if (k != "/") { typeof k == "string" && (k = i[j] = { name: k }); var n, r = k.groups; if (r) for (var p = 0; p < r.length; p++) { n = r[p]; (n = f[n]) && h(k, n) } (n = f[k.name]) && h(k, n) } } return i
            } function d() { var c = {}, e, f, g; for (e in a.ui.items) { f = a.ui.items[e]; g = f.toolbar || "others"; g = g.split(","); f = g[0]; g = parseInt(g[1] || -1, 10); c[f] || (c[f] = []); c[f].push({ name: e, order: g }) } for (f in c) c[f] = c[f].sort(function (a, b) { return a.order == b.order ? 0 : b.order < 0 ? -1 : a.order < 0 ? 1 : a.order < b.order ? -1 : 1 }); return c } function h(c,
            d) { if (d.length) { c.items ? c.items.push(a.ui.create("-")) : c.items = []; for (var e; e = d.shift() ;) { e = typeof e == "string" ? e : e.name; if (!i || CKEDITOR.tools.indexOf(i, e) == -1) (e = a.ui.create(e)) && a.addFeature(e) && c.items.push(e) } } } function f(a) { var b = [], c, d, e; for (c = 0; c < a.length; ++c) { d = a[c]; e = {}; if (d == "/") b.push(d); else if (CKEDITOR.tools.isArray(d)) { h(e, CKEDITOR.tools.clone(d)); b.push(e) } else if (d.items) { h(e, CKEDITOR.tools.clone(d.items)); e.name = d.name; b.push(e) } } return b } var i = a.config.removeButtons, i = i && i.split(","),
            k = a.config.toolbar; typeof k == "string" && (k = a.config["toolbar_" + k]); return a.toolbar = k ? f(k) : c()
        } function e(a) {
            return a._.toolbarGroups || (a._.toolbarGroups = [{ name: "document", groups: ["mode", "document", "doctools"] }, { name: "clipboard", groups: ["clipboard", "undo"] }, { name: "editing", groups: ["find", "selection", "spellchecker"] }, { name: "forms" }, "/", { name: "basicstyles", groups: ["basicstyles", "cleanup"] }, { name: "paragraph", groups: ["list", "indent", "blocks", "align", "bidi"] }, { name: "links" }, { name: "insert" }, "/", { name: "styles" },
            { name: "colors" }, { name: "tools" }, { name: "others" }, { name: "about" }])
        } var c = function () { this.toolbars = []; this.focusCommandExecuted = false }; c.prototype.focus = function () { for (var a = 0, c; c = this.toolbars[a++];) for (var d = 0, e; e = c.items[d++];) if (e.focus) { e.focus(); return } }; var a = { modes: { wysiwyg: 1, source: 1 }, readOnly: 1, exec: function (a) { if (a.toolbox) { a.toolbox.focusCommandExecuted = true; CKEDITOR.env.ie || CKEDITOR.env.air ? setTimeout(function () { a.toolbox.focus() }, 100) : a.toolbox.focus() } } }; CKEDITOR.plugins.add("toolbar",
        {
            requires: "button", init: function (b) {
                var e, g = function (a, c) {
                    var d, k = b.lang.dir == "rtl", o = b.config.toolbarGroupCycling, m = k ? 37 : 39, k = k ? 39 : 37, o = o === void 0 || o; switch (c) {
                        case 9: case CKEDITOR.SHIFT + 9: for (; !d || !d.items.length;) { d = c == 9 ? (d ? d.next : a.toolbar.next) || b.toolbox.toolbars[0] : (d ? d.previous : a.toolbar.previous) || b.toolbox.toolbars[b.toolbox.toolbars.length - 1]; if (d.items.length) for (a = d.items[e ? d.items.length - 1 : 0]; a && !a.focus;) (a = e ? a.previous : a.next) || (d = 0) } a && a.focus(); return false; case m: d = a; do {
                            d = d.next;
                            !d && o && (d = a.toolbar.items[0])
                        } while (d && !d.focus); d ? d.focus() : g(a, 9); return false; case 40: if (a.button && a.button.hasArrow) { b.once("panelShow", function (a) { a.data._.panel._.currentBlock.onKeyDown(40) }); a.execute() } else g(a, c == 40 ? m : k); return false; case k: case 38: d = a; do { d = d.previous; !d && o && (d = a.toolbar.items[a.toolbar.items.length - 1]) } while (d && !d.focus); if (d) d.focus(); else { e = 1; g(a, CKEDITOR.SHIFT + 9); e = 0 } return false; case 27: b.focus(); return false; case 13: case 32: a.execute(); return false
                    } return true
                }; b.on("uiSpace",
                function (a) {
                    if (a.data.space == b.config.toolbarLocation) {
                        a.removeListener(); b.toolbox = new c; var e = CKEDITOR.tools.getNextId(), i = ['<span id="', e, '" class="cke_voice_label">', b.lang.toolbar.toolbars, "</span>", '<span id="' + b.ui.spaceId("toolbox") + '" class="cke_toolbox" role="group" aria-labelledby="', e, '" onmousedown="return false;">'], e = b.config.toolbarStartupExpanded !== false, j, o; b.config.toolbarCanCollapse && b.elementMode != CKEDITOR.ELEMENT_MODE_INLINE && i.push('<span class="cke_toolbox_main"' + (e ? ">" : ' style="display:none">'));
                        for (var m = b.toolbox.toolbars, q = d(b), l = 0; l < q.length; l++) {
                            var n, r = 0, p, w = q[l], y; if (w) {
                                if (j) { i.push("</span>"); o = j = 0 } if (w === "/") i.push('<span class="cke_toolbar_break"></span>'); else {
                                    y = w.items || w; for (var A = 0; A < y.length; A++) {
                                        var v = y[A], u; if (v) if (v.type == CKEDITOR.UI_SEPARATOR) o = j && v; else {
                                            u = v.canGroup !== false; if (!r) {
                                                n = CKEDITOR.tools.getNextId(); r = { id: n, items: [] }; p = w.name && (b.lang.toolbar.toolbarGroups[w.name] || w.name); i.push('<span id="', n, '" class="cke_toolbar"', p ? ' aria-labelledby="' + n + '_label"' : "", ' role="toolbar">');
                                                p && i.push('<span id="', n, '_label" class="cke_voice_label">', p, "</span>"); i.push('<span class="cke_toolbar_start"></span>'); var s = m.push(r) - 1; if (s > 0) { r.previous = m[s - 1]; r.previous.next = r }
                                            } if (u) { if (!j) { i.push('<span class="cke_toolgroup" role="presentation">'); j = 1 } } else if (j) { i.push("</span>"); j = 0 } n = function (a) { a = a.render(b, i); s = r.items.push(a) - 1; if (s > 0) { a.previous = r.items[s - 1]; a.previous.next = a } a.toolbar = r; a.onkey = g; a.onfocus = function () { b.toolbox.focusCommandExecuted || b.focus() } }; if (o) { n(o); o = 0 } n(v)
                                        }
                                    } if (j) {
                                        i.push("</span>");
                                        o = j = 0
                                    } r && i.push('<span class="cke_toolbar_end"></span></span>')
                                }
                            }
                        } b.config.toolbarCanCollapse && i.push("</span>"); if (b.config.toolbarCanCollapse && b.elementMode != CKEDITOR.ELEMENT_MODE_INLINE) {
                            var x = CKEDITOR.tools.addFunction(function () { b.execCommand("toolbarCollapse") }); b.on("destroy", function () { CKEDITOR.tools.removeFunction(x) }); b.addCommand("toolbarCollapse", {
                                readOnly: 1, exec: function (a) {
                                    var b = a.ui.space("toolbar_collapser"), c = b.getPrevious(), d = a.ui.space("contents"), e = c.getParent(), f = parseInt(d.$.style.height,
                                    10), g = e.$.offsetHeight, h = b.hasClass("cke_toolbox_collapser_min"); if (h) { c.show(); b.removeClass("cke_toolbox_collapser_min"); b.setAttribute("title", a.lang.toolbar.toolbarCollapse) } else { c.hide(); b.addClass("cke_toolbox_collapser_min"); b.setAttribute("title", a.lang.toolbar.toolbarExpand) } b.getFirst().setText(h ? "▲" : "◀"); d.setStyle("height", f - (e.$.offsetHeight - g) + "px"); a.fire("resize")
                                }, modes: { wysiwyg: 1, source: 1 }
                            }); b.setKeystroke(CKEDITOR.ALT + (CKEDITOR.env.ie || CKEDITOR.env.webkit ? 189 : 109), "toolbarCollapse");
                            i.push('<a title="' + (e ? b.lang.toolbar.toolbarCollapse : b.lang.toolbar.toolbarExpand) + '" id="' + b.ui.spaceId("toolbar_collapser") + '" tabIndex="-1" class="cke_toolbox_collapser'); e || i.push(" cke_toolbox_collapser_min"); i.push('" onclick="CKEDITOR.tools.callFunction(' + x + ')">', '<span class="cke_arrow">&#9650;</span>', "</a>")
                        } i.push("</span>"); a.data.html = a.data.html + i.join("")
                    }
                }); b.on("destroy", function () {
                    if (this.toolbox) {
                        var a, b = 0, c, d, e; for (a = this.toolbox.toolbars; b < a.length; b++) {
                            d = a[b].items; for (c = 0; c <
                            d.length; c++) { e = d[c]; e.clickFn && CKEDITOR.tools.removeFunction(e.clickFn); e.keyDownFn && CKEDITOR.tools.removeFunction(e.keyDownFn) }
                        }
                    }
                }); b.on("uiReady", function () { var a = b.ui.space("toolbox"); a && b.focusManager.add(a, 1) }); b.addCommand("toolbarFocus", a); b.setKeystroke(CKEDITOR.ALT + 121, "toolbarFocus"); b.ui.add("-", CKEDITOR.UI_SEPARATOR, {}); b.ui.addHandler(CKEDITOR.UI_SEPARATOR, { create: function () { return { render: function (a, b) { b.push('<span class="cke_toolbar_separator" role="separator"></span>'); return {} } } } })
            }
        });
        CKEDITOR.ui.prototype.addToolbarGroup = function (a, c, d) { var h = e(this.editor), f = c === 0, i = { name: a }; if (d) { if (d = CKEDITOR.tools.search(h, function (a) { return a.name == d })) { !d.groups && (d.groups = []); if (c) { c = CKEDITOR.tools.indexOf(d.groups, c); if (c >= 0) { d.groups.splice(c + 1, 0, a); return } } f ? d.groups.splice(0, 0, a) : d.groups.push(a); return } c = null } c && (c = CKEDITOR.tools.indexOf(h, function (a) { return a.name == c })); f ? h.splice(0, 0, a) : typeof c == "number" ? h.splice(c + 1, 0, i) : h.push(a) }
    }(), CKEDITOR.UI_SEPARATOR = "separator", CKEDITOR.config.toolbarLocation =
    "top", function () {
        function d(a) { this.editor = a; this.reset() } CKEDITOR.plugins.add("undo", {
            init: function (a) {
                function b(a) { e.enabled && a.data.command.canUndo !== false && e.save() } function c() { e.enabled = a.readOnly ? false : a.mode == "wysiwyg"; e.onChange() } var e = a.undoManager = new d(a), h = a.addCommand("undo", { exec: function () { if (e.undo()) { a.selectionChange(); this.fire("afterUndo") } }, startDisabled: true, canUndo: false }), f = a.addCommand("redo", {
                    exec: function () { if (e.redo()) { a.selectionChange(); this.fire("afterRedo") } }, startDisabled: true,
                    canUndo: false
                }); a.setKeystroke([[CKEDITOR.CTRL + 90, "undo"], [CKEDITOR.CTRL + 89, "redo"], [CKEDITOR.CTRL + CKEDITOR.SHIFT + 90, "redo"]]); e.onChange = function () { h.setState(e.undoable() ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED); f.setState(e.redoable() ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED) }; a.on("beforeCommandExec", b); a.on("afterCommandExec", b); a.on("saveSnapshot", function (a) { e.save(a.data && a.data.contentOnly) }); a.on("contentDom", function () {
                    a.editable().on("keydown", function (a) {
                        a = a.data.getKey();
                        (a == 8 || a == 46) && e.type(a, 0)
                    }); a.editable().on("keypress", function (a) { e.type(a.data.getKey(), 1) })
                }); a.on("beforeModeUnload", function () { a.mode == "wysiwyg" && e.save(true) }); a.on("mode", c); a.on("readOnly", c); if (a.ui.addButton) { a.ui.addButton("Undo", { label: a.lang.undo.undo, command: "undo", toolbar: "undo,10" }); a.ui.addButton("Redo", { label: a.lang.undo.redo, command: "redo", toolbar: "undo,20" }) } a.resetUndo = function () { e.reset(); a.fire("saveSnapshot") }; a.on("updateSnapshot", function () { e.currentImage && e.update() });
                a.on("lockSnapshot", function (a) { e.lock(a.data && a.data.dontUpdate) }); a.on("unlockSnapshot", e.unlock, e)
            }
        }); CKEDITOR.plugins.undo = {}; var e = CKEDITOR.plugins.undo.Image = function (a, b) { this.editor = a; a.fire("beforeUndoImage"); var c = a.getSnapshot(); CKEDITOR.env.ie && c && (c = c.replace(/\s+data-cke-expando=".*?"/g, "")); this.contents = c; if (!b) this.bookmarks = (c = c && a.getSelection()) && c.createBookmarks2(true); a.fire("afterUndoImage") }, c = /\b(?:href|src|name)="[^"]*?"/gi; e.prototype = {
            equalsContent: function (a) {
                var b = this.contents,
                a = a.contents; if (CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.ie6Compat)) { b = b.replace(c, ""); a = a.replace(c, "") } return b != a ? false : true
            }, equalsSelection: function (a) { var b = this.bookmarks, a = a.bookmarks; if (b || a) { if (!b || !a || b.length != a.length) return false; for (var c = 0; c < b.length; c++) { var d = b[c], e = a[c]; if (d.startOffset != e.startOffset || d.endOffset != e.endOffset || !CKEDITOR.tools.arrayCompare(d.start, e.start) || !CKEDITOR.tools.arrayCompare(d.end, e.end)) return false } } return true }
        }; d.prototype = {
            type: function (a,
            b) {
                var c = !b && a != this.lastKeystroke, d = this.editor; if (!this.typing || b && !this.wasCharacter || c) {
                    var h = new e(d), f = this.snapshots.length; CKEDITOR.tools.setTimeout(function () { var a = d.getSnapshot(); CKEDITOR.env.ie && (a = a.replace(/\s+data-cke-expando=".*?"/g, "")); if (h.contents != a && f == this.snapshots.length) { this.typing = true; this.save(false, h, false) || this.snapshots.splice(this.index + 1, this.snapshots.length - this.index - 1); this.hasUndo = true; this.hasRedo = false; this.modifiersCount = this.typesCount = 1; this.onChange() } },
                    0, this)
                } this.lastKeystroke = a; if (this.wasCharacter = b) { this.modifiersCount = 0; this.typesCount++; if (this.typesCount > 25) { this.save(false, null, false); this.typesCount = 1 } else setTimeout(function () { d.fire("change") }, 0) } else { this.typesCount = 0; this.modifiersCount++; if (this.modifiersCount > 25) { this.save(false, null, false); this.modifiersCount = 1 } else setTimeout(function () { d.fire("change") }, 0) }
            }, reset: function () {
                this.lastKeystroke = 0; this.snapshots = []; this.index = -1; this.limit = this.editor.config.undoStackSize || 20; this.currentImage =
                null; this.hasRedo = this.hasUndo = false; this.locked = null; this.resetType()
            }, resetType: function () { this.typing = false; delete this.lastKeystroke; this.modifiersCount = this.typesCount = 0 }, fireChange: function () { this.hasUndo = !!this.getNextImage(true); this.hasRedo = !!this.getNextImage(false); this.resetType(); this.onChange() }, save: function (a, b, c) {
                if (this.locked) return false; var d = this.snapshots; b || (b = new e(this.editor)); if (b.contents === false) return false; if (this.currentImage) if (b.equalsContent(this.currentImage)) {
                    if (a ||
                    b.equalsSelection(this.currentImage)) return false
                } else this.editor.fire("change"); d.splice(this.index + 1, d.length - this.index - 1); d.length == this.limit && d.shift(); this.index = d.push(b) - 1; this.currentImage = b; c !== false && this.fireChange(); return true
            }, restoreImage: function (a) {
                var b = this.editor, c; if (a.bookmarks) { b.focus(); c = b.getSelection() } this.locked = 1; this.editor.loadSnapshot(a.contents); if (a.bookmarks) c.selectBookmarks(a.bookmarks); else if (CKEDITOR.env.ie) {
                    c = this.editor.document.getBody().$.createTextRange();
                    c.collapse(true); c.select()
                } this.locked = 0; this.index = a.index; this.currentImage = this.snapshots[this.index]; this.update(); this.fireChange(); b.fire("change")
            }, getNextImage: function (a) { var b = this.snapshots, c = this.currentImage, d; if (c) if (a) for (d = this.index - 1; d >= 0; d--) { a = b[d]; if (!c.equalsContent(a)) { a.index = d; return a } } else for (d = this.index + 1; d < b.length; d++) { a = b[d]; if (!c.equalsContent(a)) { a.index = d; return a } } return null }, redoable: function () { return this.enabled && this.hasRedo }, undoable: function () {
                return this.enabled &&
                this.hasUndo
            }, undo: function () { if (this.undoable()) { this.save(true); var a = this.getNextImage(true); if (a) return this.restoreImage(a), true } return false }, redo: function () { if (this.redoable()) { this.save(true); if (this.redoable()) { var a = this.getNextImage(false); if (a) return this.restoreImage(a), true } } return false }, update: function (a) {
                if (!this.locked) {
                    a || (a = new e(this.editor)); for (var b = this.index, c = this.snapshots; b > 0 && this.currentImage.equalsContent(c[b - 1]) ;) b = b - 1; c.splice(b, this.index - b + 1, a); this.index = b; this.currentImage =
                    a
                }
            }, lock: function (a) { if (this.locked) this.locked.level++; else if (a) this.locked = { level: 1 }; else { a = new e(this.editor, true); this.locked = { update: this.currentImage && this.currentImage.equalsContent(a) ? a : null, level: 1 } } }, unlock: function () { if (this.locked && !--this.locked.level) { var a = this.locked.update, b = a && new e(this.editor, true); this.locked = null; a && !a.equalsContent(b) && this.update() } }
        }
    }(), CKEDITOR.config.wsc_removeGlobalVariable = !0, CKEDITOR.plugins.add("wsc", {
        requires: "dialog", parseApi: function (d) {
            d.config.wsc_onFinish =
            typeof d.config.wsc_onFinish === "function" ? d.config.wsc_onFinish : function () { }; d.config.wsc_onClose = typeof d.config.wsc_onClose === "function" ? d.config.wsc_onClose : function () { }
        }, parseConfig: function (d) {
            d.config.wsc_customerId = d.config.wsc_customerId || CKEDITOR.config.wsc_customerId || "1:ua3xw1-2XyGJ3-GWruD3-6OFNT1-oXcuB1-nR6Bp4-hgQHc-EcYng3-sdRXG3-NOfFk"; d.config.wsc_customDictionaryIds = d.config.wsc_customDictionaryIds || CKEDITOR.config.wsc_customDictionaryIds || ""; d.config.wsc_userDictionaryName = d.config.wsc_userDictionaryName ||
            CKEDITOR.config.wsc_userDictionaryName || ""; d.config.wsc_customLoaderScript = d.config.wsc_customLoaderScript || CKEDITOR.config.wsc_customLoaderScript; CKEDITOR.config.wsc_cmd = d.config.wsc_cmd || CKEDITOR.config.wsc_cmd || "spell"; CKEDITOR.config.wsc_version = "v4.3.0-1e748a6"
        }, init: function (d) {
            this.parseConfig(d); this.parseApi(d); d.addCommand("checkspell", new CKEDITOR.dialogCommand("checkspell")).modes = { wysiwyg: !CKEDITOR.env.opera && !CKEDITOR.env.air && document.domain == window.location.hostname }; typeof d.plugins.scayt ==
            "undefined" && d.ui.addButton && d.ui.addButton("SpellChecker", { label: d.lang.wsc.toolbar, command: "checkspell", toolbar: "spellchecker,10" }); CKEDITOR.dialog.add("checkspell", this.path + (CKEDITOR.env.ie && CKEDITOR.env.version <= 8 ? "dialogs/wsc_ie.js" : window.postMessage ? "dialogs/wsc.js" : "dialogs/wsc_ie.js"))
        }
    }), function () {
        function d(a) {
            var b = this.editor, c = a.document, d = c.body; (a = c.getElementById("cke_actscrpt")) && a.parentNode.removeChild(a); (a = c.getElementById("cke_shimscrpt")) && a.parentNode.removeChild(a); if (CKEDITOR.env.gecko) {
                d.contentEditable =
                false; if (CKEDITOR.env.version < 2E4) { d.innerHTML = d.innerHTML.replace(/^.*<\!-- cke-content-start --\>/, ""); setTimeout(function () { var a = new CKEDITOR.dom.range(new CKEDITOR.dom.document(c)); a.setStart(new CKEDITOR.dom.node(d), 0); b.getSelection().selectRanges([a]) }, 0) }
            } d.contentEditable = true; if (CKEDITOR.env.ie) { d.hideFocus = true; d.disabled = true; d.removeAttribute("disabled") } delete this._.isLoadingData; this.$ = d; c = new CKEDITOR.dom.document(c); this.setup(); if (CKEDITOR.env.ie) {
                c.getDocumentElement().addClass(c.$.compatMode);
                b.config.enterMode != CKEDITOR.ENTER_P && this.attachListener(c, "selectionchange", function () { var a = c.getBody(), d = b.getSelection(), e = d && d.getRanges()[0]; e && (a.getHtml().match(/^<p>(?:&nbsp;|<br>)<\/p>$/i) && e.startContainer.equals(a)) && setTimeout(function () { e = b.getSelection().getRanges()[0]; if (!e.startContainer.equals("body")) { a.getFirst().remove(1); e.moveToElementEditEnd(a); e.select() } }, 0) })
            } if (CKEDITOR.env.webkit || CKEDITOR.env.ie && CKEDITOR.env.version > 10) c.getDocumentElement().on("mousedown", function (a) {
                a.data.getTarget().is("html") &&
                setTimeout(function () { b.editable().focus() })
            }); try { b.document.$.execCommand("2D-position", false, true) } catch (e) { } try { b.document.$.execCommand("enableInlineTableEditing", false, !b.config.disableNativeTableHandles) } catch (f) { } if (b.config.disableObjectResizing) try { this.getDocument().$.execCommand("enableObjectResizing", false, false) } catch (i) { this.attachListener(this, CKEDITOR.env.ie ? "resizestart" : "resize", function (a) { a.data.preventDefault() }) } (CKEDITOR.env.gecko || CKEDITOR.env.ie && b.document.$.compatMode ==
            "CSS1Compat") && this.attachListener(this, "keydown", function (a) { var c = a.data.getKeystroke(); if (c == 33 || c == 34) if (CKEDITOR.env.ie) setTimeout(function () { b.getSelection().scrollIntoView() }, 0); else if (b.window.$.innerHeight > this.$.offsetHeight) { var d = b.createRange(); d[c == 33 ? "moveToElementEditStart" : "moveToElementEditEnd"](this); d.select(); a.data.preventDefault() } }); CKEDITOR.env.ie && this.attachListener(c, "blur", function () { try { c.$.selection.empty() } catch (a) { } }); b.document.getElementsByTag("title").getItem(0).data("cke-title",
            b.document.$.title); if (CKEDITOR.env.ie) b.document.$.title = this._.docTitle; CKEDITOR.tools.setTimeout(function () { b.fire("contentDom"); if (this._.isPendingFocus) { b.focus(); this._.isPendingFocus = false } setTimeout(function () { b.fire("dataReady") }, 0); CKEDITOR.env.ie && setTimeout(function () { if (b.document) { var a = b.document.$.body; a.runtimeStyle.marginBottom = "0px"; a.runtimeStyle.marginBottom = "" } }, 1E3) }, 0, this)
        } function e() {
            var a = []; if (CKEDITOR.document.$.documentMode >= 8) {
                a.push("html.CSS1Compat [contenteditable=false]{min-height:0 !important}");
                var b = [], c; for (c in CKEDITOR.dtd.$removeEmpty) b.push("html.CSS1Compat " + c + "[contenteditable=false]"); a.push(b.join(",") + "{display:inline-block}")
            } else if (CKEDITOR.env.gecko) { a.push("html{height:100% !important}"); a.push("img:-moz-broken{-moz-force-broken-image-icon:1;min-width:24px;min-height:24px}") } a.push("html{cursor:text;*cursor:auto}"); a.push("img,input,textarea{cursor:default}"); return a.join("\n")
        } CKEDITOR.plugins.add("wysiwygarea", {
            init: function (a) {
                a.config.fullPage && a.addFeature({
                    allowedContent: "html head title; style [media,type]; body (*)[id]; meta link [*]",
                    requiredContent: "body"
                }); a.addMode("wysiwyg", function (b) {
                    function d(e) { e && e.removeListener(); a.editable(new c(a, h.$.contentWindow.document.body)); a.setData(a.getData(1), b) } var e = "document.open();" + (CKEDITOR.env.ie ? "(" + CKEDITOR.tools.fixDomain + ")();" : "") + "document.close();", e = CKEDITOR.env.air ? "javascript:void(0)" : CKEDITOR.env.ie ? "javascript:void(function(){" + encodeURIComponent(e) + "}())" : "", h = CKEDITOR.dom.element.createFromHtml('<iframe src="' + e + '" frameBorder="0"></iframe>'); h.setStyles({
                        width: "100%",
                        height: "100%"
                    }); h.addClass("cke_wysiwyg_frame cke_reset"); var f = a.ui.space("contents"); f.append(h); if (e = CKEDITOR.env.ie || CKEDITOR.env.gecko) h.on("load", d); var i = a.title, k = a.lang.common.editorHelp; if (i) { CKEDITOR.env.ie && (i = i + (", " + k)); h.setAttribute("title", i) } var i = CKEDITOR.tools.getNextId(), o = CKEDITOR.dom.element.createFromHtml('<span id="' + i + '" class="cke_voice_label">' + k + "</span>"); f.append(o, 1); a.on("beforeModeUnload", function (a) { a.removeListener(); o.remove() }); h.setAttributes({
                        "aria-describedby": i,
                        tabIndex: a.tabIndex, allowTransparency: "true"
                    }); !e && d(); if (CKEDITOR.env.webkit) { e = function () { f.setStyle("width", "100%"); h.hide(); h.setSize("width", f.getSize("width")); f.removeStyle("width"); h.show() }; h.setCustomData("onResize", e); CKEDITOR.document.getWindow().on("resize", e) } a.fire("ariaWidget", h)
                })
            }
        }); var c = CKEDITOR.tools.createClass({
            $: function (a) {
                this.base.apply(this, arguments); this._.frameLoadedHandler = CKEDITOR.tools.addFunction(function (a) { CKEDITOR.tools.setTimeout(d, 0, this, a) }, this); this._.docTitle =
                this.getWindow().getFrame().getAttribute("title")
            }, base: CKEDITOR.editable, proto: {
                setData: function (a, b) {
                    var c = this.editor; if (b) { this.setHtml(a); c.fire("dataReady") } else {
                        this._.isLoadingData = true; c._.dataStore = { id: 1 }; var d = c.config, h = d.fullPage, f = d.docType, i = CKEDITOR.tools.buildStyleHtml(e()).replace(/<style>/, '<style data-cke-temp="1">'); h || (i = i + CKEDITOR.tools.buildStyleHtml(c.config.contentsCss)); var k = d.baseHref ? '<base href="' + d.baseHref + '" data-cke-temp="1" />' : ""; h && (a = a.replace(/<!DOCTYPE[^>]*>/i,
                        function (a) { c.docType = f = a; return "" }).replace(/<\?xml\s[^\?]*\?>/i, function (a) { c.xmlDeclaration = a; return "" })); a = c.dataProcessor.toHtml(a); if (h) { /<body[\s|>]/.test(a) || (a = "<body>" + a); /<html[\s|>]/.test(a) || (a = "<html>" + a + "</html>"); /<head[\s|>]/.test(a) ? /<title[\s|>]/.test(a) || (a = a.replace(/<head[^>]*>/, "$&<title></title>")) : a = a.replace(/<html[^>]*>/, "$&<head><title></title></head>"); k && (a = a.replace(/<head>/, "$&" + k)); a = a.replace(/<\/head\s*>/, i + "$&"); a = f + a } else a = d.docType + '<html dir="' + d.contentsLangDirection +
                        '" lang="' + (d.contentsLanguage || c.langCode) + '"><head><title>' + this._.docTitle + "</title>" + k + i + "</head><body" + (d.bodyId ? ' id="' + d.bodyId + '"' : "") + (d.bodyClass ? ' class="' + d.bodyClass + '"' : "") + ">" + a + "</body></html>"; if (CKEDITOR.env.gecko) { a = a.replace(/<body/, '<body contenteditable="true" '); CKEDITOR.env.version < 2E4 && (a = a.replace(/<body[^>]*>/, "$&<\!-- cke-content-start --\>")) } d = '<script id="cke_actscrpt" type="text/javascript"' + (CKEDITOR.env.ie ? ' defer="defer" ' : "") + ">var wasLoaded=0;function onload(){if(!wasLoaded)window.parent.CKEDITOR.tools.callFunction(" +
                        this._.frameLoadedHandler + ",window);wasLoaded=1;}" + (CKEDITOR.env.ie ? "onload();" : 'document.addEventListener("DOMContentLoaded", onload, false );') + "<\/script>"; CKEDITOR.env.ie && CKEDITOR.env.version < 9 && (d = d + '<script id="cke_shimscrpt">window.parent.CKEDITOR.tools.enableHtml5Elements(document)<\/script>'); a = a.replace(/(?=\s*<\/(:?head)>)/, d); this.clearCustomData(); this.clearListeners(); c.fire("contentDomUnload"); var o = this.getDocument(); try { o.write(a) } catch (m) { setTimeout(function () { o.write(a) }, 0) }
                    }
                },
                getData: function (a) { if (a) return this.getHtml(); var a = this.editor, b = a.config, c = b.fullPage, d = c && a.docType, e = c && a.xmlDeclaration, f = this.getDocument(), c = c ? f.getDocumentElement().getOuterHtml() : f.getBody().getHtml(); CKEDITOR.env.gecko && b.enterMode != CKEDITOR.ENTER_BR && (c = c.replace(/<br>(?=\s*(:?$|<\/body>))/, "")); c = a.dataProcessor.toDataFormat(c); e && (c = e + "\n" + c); d && (c = d + "\n" + c); return c }, focus: function () { this._.isLoadingData ? this._.isPendingFocus = true : c.baseProto.focus.call(this) }, detach: function () {
                    var a =
                    this.editor, b = a.document, a = a.window.getFrame(); c.baseProto.detach.call(this); this.clearCustomData(); b.getDocumentElement().clearCustomData(); a.clearCustomData(); CKEDITOR.tools.removeFunction(this._.frameLoadedHandler); (b = a.removeCustomData("onResize")) && b.removeListener(); a.remove()
                }
            }
        })
    }(), CKEDITOR.config.disableObjectResizing = !1, CKEDITOR.config.disableNativeTableHandles = !0, CKEDITOR.config.disableNativeSpellChecker = !0, CKEDITOR.config.contentsCss = CKEDITOR.getUrl("contents.css"), CKEDITOR.config.plugins =
    "dialogui,dialog,a11yhelp,about,basicstyles,blockquote,clipboard,button,panelbutton,panel,floatpanel,colorbutton,menu,contextmenu,div,elementspath,enterkey,entities,popup,filebrowser,find,fakeobjects,flash,floatingspace,listblock,richcombo,font,format,horizontalrule,htmlwriter,image,indent,indentlist,justify,link,list,magicline,maximize,pastefromword,pastetext,removeformat,resize,menubutton,scayt,sharedspace,showblocks,smiley,sourcedialog,sourcearea,specialchar,stylescombo,tab,table,tabletools,toolbar,undo,wsc,wysiwygarea",
    CKEDITOR.config.skin = "moono", function () {
        var d = function (d, c) { for (var a = CKEDITOR.getUrl("plugins/" + c), d = d.split(","), b = 0; b < d.length; b++) CKEDITOR.skin.icons[d[b]] = { path: a, offset: -d[++b], bgsize: d[++b] } }; CKEDITOR.env.hidpi ? d("about,0,,bold,24,,italic,48,,strike,72,,subscript,96,,superscript,120,,underline,144,,blockquote,168,,copy-rtl,192,,copy,216,,cut-rtl,240,,cut,264,,paste-rtl,288,,paste,312,,bgcolor,336,,textcolor,360,,creatediv,384,,find-rtl,408,,find,432,,replace,456,,flash,480,,horizontalrule,504,,image,528,,indent-rtl,552,,indent,576,,outdent-rtl,600,,outdent,624,,justifyblock,648,,justifycenter,672,,justifyleft,696,,justifyright,720,,anchor-rtl,744,,anchor,768,,link,792,,unlink,816,,bulletedlist-rtl,840,,bulletedlist,864,,numberedlist-rtl,888,,numberedlist,912,,maximize,936,,pastefromword-rtl,960,,pastefromword,984,,pastetext-rtl,1008,,pastetext,1032,,removeformat,1056,,scayt,1080,,showblocks-rtl,1104,,showblocks,1128,,smiley,1152,,source-rtl,1176,,source,1200,,sourcedialog-rtl,1224,,sourcedialog,1248,,specialchar,1272,,table,1296,,redo-rtl,1320,,redo,1344,,undo-rtl,1368,,undo,1392,,spellchecker,1416,",
        "icons_hidpi.png") : d("about,0,auto,bold,24,auto,italic,48,auto,strike,72,auto,subscript,96,auto,superscript,120,auto,underline,144,auto,blockquote,168,auto,copy-rtl,192,auto,copy,216,auto,cut-rtl,240,auto,cut,264,auto,paste-rtl,288,auto,paste,312,auto,bgcolor,336,auto,textcolor,360,auto,creatediv,384,auto,find-rtl,408,auto,find,432,auto,replace,456,auto,flash,480,auto,horizontalrule,504,auto,image,528,auto,indent-rtl,552,auto,indent,576,auto,outdent-rtl,600,auto,outdent,624,auto,justifyblock,648,auto,justifycenter,672,auto,justifyleft,696,auto,justifyright,720,auto,anchor-rtl,744,auto,anchor,768,auto,link,792,auto,unlink,816,auto,bulletedlist-rtl,840,auto,bulletedlist,864,auto,numberedlist-rtl,888,auto,numberedlist,912,auto,maximize,936,auto,pastefromword-rtl,960,auto,pastefromword,984,auto,pastetext-rtl,1008,auto,pastetext,1032,auto,removeformat,1056,auto,scayt,1080,auto,showblocks-rtl,1104,auto,showblocks,1128,auto,smiley,1152,auto,source-rtl,1176,auto,source,1200,auto,sourcedialog-rtl,1224,auto,sourcedialog,1248,auto,specialchar,1272,auto,table,1296,auto,redo-rtl,1320,auto,redo,1344,auto,undo-rtl,1368,auto,undo,1392,auto,spellchecker,1416,auto",
        "icons.png")
    }(), CKEDITOR.lang.languages = { af: 1, ar: 1, bg: 1, bn: 1, bs: 1, ca: 1, cs: 1, cy: 1, da: 1, de: 1, el: 1, en: 1, "en-au": 1, "en-ca": 1, "en-gb": 1, eo: 1, es: 1, et: 1, eu: 1, fa: 1, fi: 1, fo: 1, fr: 1, "fr-ca": 1, gl: 1, gu: 1, he: 1, hi: 1, hr: 1, hu: 1, id: 1, is: 1, it: 1, ja: 1, ka: 1, km: 1, ko: 1, ku: 1, lt: 1, lv: 1, mk: 1, mn: 1, ms: 1, nb: 1, nl: 1, no: 1, pl: 1, pt: 1, "pt-br": 1, ro: 1, ru: 1, si: 1, sk: 1, sl: 1, sq: 1, sr: 1, "sr-latn": 1, sv: 1, th: 1, tr: 1, ug: 1, uk: 1, vi: 1, zh: 1, "zh-cn": 1 }
})();