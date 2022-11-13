/*!
 * jQuery JavaScript Library v1.7.1
 * http://jquery.com/
 *
 * Copyright 2011, John Resig
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 * Copyright 2011, The Dojo Foundation
 * Released under the MIT, BSD, and GPL Licenses.
 *
 * Date: Mon Nov 21 21:11:03 2011 -0500
 */










function cleanWordPaste(e) {
    var t = document.createElement("DIV");
    t.innerHTML = e;
    var n = t.textContent || t.innerText;
    n = n.replace(/\n{2,}/g, "<br />").replace(/.*<!--.*-->/g, "").replace(/\n/g, " ");
    for (i = 0; i < 10; i++)
        n.substr(0, 6) == "<br />" && (n = n.replace("<br />", ""));
    return n = n.replace(/\s{2,}/, " "),
    n.replace(/<br \/>\s*/g, "\n")
}
function getURLParameterByName(e) {
    var t = RegExp("[?&]" + e + "=([^&]*)").exec(window.location.search);
    return t && decodeURIComponent(t[1].replace(/\+/g, " "))
}
function wordCountOf(e) {
    if (e) {
        var t = e.match(/\S+/g);
        if (t)
            return t.length
    }
    return 0
}
function commadString(e) {
    return e.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}
function rotate(e, t) {
    e.css({
        "-webkit-transform": "rotate(" + t + "rad)",
        "-moz-transform": "rotate(" + t + "rad)",
        "-ms-transform": "rotate(" + t + "rad)",
        "-o-transform": "rotate(" + t + "rad)",
        transform: "rotate(" + t + "rad)",
        zoom: 1
    })
}
function toObject(e) {
    return Object.prototype.toString.call(e) == "[object String]" && (e = jQuery.parseJSON(e)),
    e
}
function convertStringToBooleanIfAppropriate(e) {
    return e === "true" ? !0 : e === "false" ? !1 : e
}
function createTriSymbol() {
    navigator.appName == "Microsoft Internet Explorer" && (trisymbol = ">")
}
function styleWithoutCss() {
    try {
        document.execCommand("styleWithCSS", 0, !1)
    } catch (e) {
        try {
            document.execCommand("useCSS", 0, !0)
        } catch (e) {
            try {
                document.execCommand("styleWithCSS", !1, !1)
            } catch (e) {}
        }
    }
}
function topBannerHeight() {
    return $("#account_container").height() + $("#branding").height()
}
function sizeEditorCorrectly() {
    $("#editor_container").height($(window).height() - topBannerHeight()),
    $("#player_container").height($(window).height() - topBannerHeight()),
    $("#stitch_list_scrolling").height($("#editor_container").height() - $("#stitch_list_area .header").height() - 10),
    Player.readOnly && ($(window).width() < 900 ? ($("#sidebar-ads").hide(),
    $(window).width() < 600 ? $("#player_container").addClass("narrow") : $("#player_container").removeClass("narrow")) : ($("#sidebar-ads").show(),
    $("#player_container").removeClass("narrow")))
}
function selectElement(e) {
    var t = rangy.getSelection()
      , n = rangy.createRange();
    n.selectNodeContents(e),
    t.setSingleRange(n)
}
function moveCaretToStartOf(e) {
    var t = rangy.getSelection()
      , n = rangy.createRange();
    n.selectNodeContents(e),
    n.collapse(!0),
    t.setSingleRange(n)
}
function moveCaretToEndOf(e) {
    var t = rangy.getSelection()
      , n = rangy.createRange();
    n.selectNodeContents(e),
    n.collapse(!1),
    t.setSingleRange(n)
}
function containsCursor(e) {
    var t = rangy.getSelection();
    if (t.rangeCount == 0)
        return !1;
    var n = t.getRangeAt(0)
      , r = !1;
    return n.compareNode(e[0]) == n.NODE_BEFORE_AND_AFTER && (r = !0),
    r
}
function resurrectRange(e, t) {
    var n = rangy.createRange();
    return n.setStart(e.startContainer, e.start),
    n.setEnd(e.endContainer, e.end),
    n
}
function selectText(e) {
    var t = resurrectRange(e)
      , n = rangy.getSelection();
    n.setSingleRange(t)
}
function NumToWords() {
    function e(r, i) {
        var s = t(r % 1e3);
        return s != "" && i > 0 && (s += " " + n.illions[i - 1]),
        r < 1e3 ? s : e(Math.floor(r / 1e3), i + 1) + (s == "" ? "" : ", " + s)
    }
    function t(e) {
        return e == 0 ? "" : e < 10 ? n.digits[e - 1] : e < 20 ? n.teens[e - 10] : e < 100 ? n.tens[Math.floor(e / 10) - 1] + (e % 10 == 0 ? "" : "-" + n.digits[e % 10 - 1]) : e < 1e3 ? n.digits[Math.floor(e / 100) - 1] + " hundred" + (e % 100 == 0 ? "" : " and " + t(e % 100)) : e
    }
    this.convert = function(t) {
        var n = "";
        t < 0 && (n = "minus ",
        t = -t);
        if (t == 0)
            return "zero";
        var r = e(t, 0)
          , i = r.lastIndexOf(",")
          , s = r.lastIndexOf("hundred");
        return s < i && (r = r.substring(0, i) + " and " + r.substring(i + 2)),
        n + r
    }
    ;
    var n = {
        digits: ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"],
        tens: ["ten", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"],
        teens: ["ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"],
        illions: ["thousand", "million", "billion", "trillion"]
    }
}
(function(e, t) {
    function u(e) {
        var t = o[e] = {}, n, r;
        e = e.split(/\s+/);
        for (n = 0,
        r = e.length; n < r; n++)
            t[e[n]] = !0;
        return t
    }
    function c(e, n, r) {
        if (r === t && e.nodeType === 1) {
            var i = "data-" + n.replace(l, "-$1").toLowerCase();
            r = e.getAttribute(i);
            if (typeof r == "string") {
                try {
                    r = r === "true" ? !0 : r === "false" ? !1 : r === "null" ? null : s.isNumeric(r) ? parseFloat(r) : f.test(r) ? s.parseJSON(r) : r
                } catch (o) {}
                s.data(e, n, r)
            } else
                r = t
        }
        return r
    }
    function h(e) {
        for (var t in e) {
            if (t === "data" && s.isEmptyObject(e[t]))
                continue;
            if (t !== "toJSON")
                return !1
        }
        return !0
    }
    function p(e, t, n) {
        var r = t + "defer"
          , i = t + "queue"
          , o = t + "mark"
          , u = s._data(e, r);
        u && (n === "queue" || !s._data(e, i)) && (n === "mark" || !s._data(e, o)) && setTimeout(function() {
            !s._data(e, i) && !s._data(e, o) && (s.removeData(e, r, !0),
            u.fire())
        }, 0)
    }
    function H() {
        return !1
    }
    function B() {
        return !0
    }
    function W(e) {
        return !e || !e.parentNode || e.parentNode.nodeType === 11
    }
    function X(e, t, n) {
        t = t || 0;
        if (s.isFunction(t))
            return s.grep(e, function(e, r) {
                var i = !!t.call(e, r, e);
                return i === n
            });
        if (t.nodeType)
            return s.grep(e, function(e, r) {
                return e === t === n
            });
        if (typeof t == "string") {
            var r = s.grep(e, function(e) {
                return e.nodeType === 1
            });
            if (q.test(t))
                return s.filter(t, r, !n);
            t = s.filter(t, r)
        }
        return s.grep(e, function(e, r) {
            return s.inArray(e, t) >= 0 === n
        })
    }
    function V(e) {
        var t = $.split("|")
          , n = e.createDocumentFragment();
        if (n.createElement)
            while (t.length)
                n.createElement(t.pop());
        return n
    }
    function at(e, t) {
        return s.nodeName(e, "table") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e
    }
    function ft(e, t) {
        if (t.nodeType !== 1 || !s.hasData(e))
            return;
        var n, r, i, o = s._data(e), u = s._data(t, o), a = o.events;
        if (a) {
            delete u.handle,
            u.events = {};
            for (n in a)
                for (r = 0,
                i = a[n].length; r < i; r++)
                    s.event.add(t, n + (a[n][r].namespace ? "." : "") + a[n][r].namespace, a[n][r], a[n][r].data)
        }
        u.data && (u.data = s.extend({}, u.data))
    }
    function lt(e, t) {
        var n;
        if (t.nodeType !== 1)
            return;
        t.clearAttributes && t.clearAttributes(),
        t.mergeAttributes && t.mergeAttributes(e),
        n = t.nodeName.toLowerCase();
        if (n === "object")
            t.outerHTML = e.outerHTML;
        else if (n !== "input" || e.type !== "checkbox" && e.type !== "radio") {
            if (n === "option")
                t.selected = e.defaultSelected;
            else if (n === "input" || n === "textarea")
                t.defaultValue = e.defaultValue
        } else
            e.checked && (t.defaultChecked = t.checked = e.checked),
            t.value !== e.value && (t.value = e.value);
        t.removeAttribute(s.expando)
    }
    function ct(e) {
        return typeof e.getElementsByTagName != "undefined" ? e.getElementsByTagName("*") : typeof e.querySelectorAll != "undefined" ? e.querySelectorAll("*") : []
    }
    function ht(e) {
        if (e.type === "checkbox" || e.type === "radio")
            e.defaultChecked = e.checked
    }
    function pt(e) {
        var t = (e.nodeName || "").toLowerCase();
        t === "input" ? ht(e) : t !== "script" && typeof e.getElementsByTagName != "undefined" && s.grep(e.getElementsByTagName("input"), ht)
    }
    function dt(e) {
        var t = n.createElement("div");
        return ut.appendChild(t),
        t.innerHTML = e.outerHTML,
        t.firstChild
    }
    function vt(e, t) {
        t.src ? s.ajax({
            url: t.src,
            async: !1,
            dataType: "script"
        }) : s.globalEval((t.text || t.textContent || t.innerHTML || "").replace(st, "/*$0*/")),
        t.parentNode && t.parentNode.removeChild(t)
    }
    function Lt(e, t, n) {
        var r = t === "width" ? e.offsetWidth : e.offsetHeight
          , i = t === "width" ? xt : Tt
          , o = 0
          , u = i.length;
        if (r > 0) {
            if (n !== "border")
                for (; o < u; o++)
                    n || (r -= parseFloat(s.css(e, "padding" + i[o])) || 0),
                    n === "margin" ? r += parseFloat(s.css(e, n + i[o])) || 0 : r -= parseFloat(s.css(e, "border" + i[o] + "Width")) || 0;
            return r + "px"
        }
        r = Nt(e, t, t);
        if (r < 0 || r == null)
            r = e.style[t] || 0;
        r = parseFloat(r) || 0;
        if (n)
            for (; o < u; o++)
                r += parseFloat(s.css(e, "padding" + i[o])) || 0,
                n !== "padding" && (r += parseFloat(s.css(e, "border" + i[o] + "Width")) || 0),
                n === "margin" && (r += parseFloat(s.css(e, n + i[o])) || 0);
        return r + "px"
    }
    function Gt(e) {
        return function(t, n) {
            typeof t != "string" && (n = t,
            t = "*");
            if (s.isFunction(n)) {
                var r = t.toLowerCase().split(Rt), i = 0, o = r.length, u, a, f;
                for (; i < o; i++)
                    u = r[i],
                    f = /^\+/.test(u),
                    f && (u = u.substr(1) || "*"),
                    a = e[u] = e[u] || [],
                    a[f ? "unshift" : "push"](n)
            }
        }
    }
    function Yt(e, n, r, i, s, o) {
        s = s || n.dataTypes[0],
        o = o || {},
        o[s] = !0;
        var u = e[s], a = 0, f = u ? u.length : 0, l = e === Xt, c;
        for (; a < f && (l || !c); a++)
            c = u[a](n, r, i),
            typeof c == "string" && (!l || o[c] ? c = t : (n.dataTypes.unshift(c),
            c = Yt(e, n, r, i, c, o)));
        return (l || !c) && !o["*"] && (c = Yt(e, n, r, i, "*", o)),
        c
    }
    function Zt(e, n) {
        var r, i, o = s.ajaxSettings.flatOptions || {};
        for (r in n)
            n[r] !== t && ((o[r] ? e : i || (i = {}))[r] = n[r]);
        i && s.extend(!0, e, i)
    }
    function en(e, t, n, r) {
        if (s.isArray(t))
            s.each(t, function(t, i) {
                n || Ot.test(e) ? r(e, i) : en(e + "[" + (typeof i == "object" || s.isArray(i) ? t : "") + "]", i, n, r)
            });
        else if (!n && t != null && typeof t == "object")
            for (var i in t)
                en(e + "[" + i + "]", t[i], n, r);
        else
            r(e, t)
    }
    function tn(e, n, r) {
        var i = e.contents, s = e.dataTypes, o = e.responseFields, u, a, f, l;
        for (a in o)
            a in r && (n[o[a]] = r[a]);
        while (s[0] === "*")
            s.shift(),
            u === t && (u = e.mimeType || n.getResponseHeader("content-type"));
        if (u)
            for (a in i)
                if (i[a] && i[a].test(u)) {
                    s.unshift(a);
                    break
                }
        if (s[0]in r)
            f = s[0];
        else {
            for (a in r) {
                if (!s[0] || e.converters[a + " " + s[0]]) {
                    f = a;
                    break
                }
                l || (l = a)
            }
            f = f || l
        }
        if (f)
            return f !== s[0] && s.unshift(f),
            r[f]
    }
    function nn(e, n) {
        e.dataFilter && (n = e.dataFilter(n, e.dataType));
        var r = e.dataTypes, i = {}, o, u, a = r.length, f, l = r[0], c, h, p, d, v;
        for (o = 1; o < a; o++) {
            if (o === 1)
                for (u in e.converters)
                    typeof u == "string" && (i[u.toLowerCase()] = e.converters[u]);
            c = l,
            l = r[o];
            if (l === "*")
                l = c;
            else if (c !== "*" && c !== l) {
                h = c + " " + l,
                p = i[h] || i["* " + l];
                if (!p) {
                    v = t;
                    for (d in i) {
                        f = d.split(" ");
                        if (f[0] === c || f[0] === "*") {
                            v = i[f[1] + " " + l];
                            if (v) {
                                d = i[d],
                                d === !0 ? p = v : v === !0 && (p = d);
                                break
                            }
                        }
                    }
                }
                !p && !v && s.error("No conversion from " + h.replace(" ", " to ")),
                p !== !0 && (n = p ? p(n) : v(d(n)))
            }
        }
        return n
    }
    function fn() {
        try {
            return new e.XMLHttpRequest
        } catch (t) {}
    }
    function ln() {
        try {
            return new e.ActiveXObject("Microsoft.XMLHTTP")
        } catch (t) {}
    }
    function bn() {
        return setTimeout(wn, 0),
        yn = s.now()
    }
    function wn() {
        yn = t
    }
    function En(e, t) {
        var n = {};
        return s.each(gn.concat.apply([], gn.slice(0, t)), function() {
            n[this] = e
        }),
        n
    }
    function Sn(e) {
        if (!cn[e]) {
            var t = n.body
              , r = s("<" + e + ">").appendTo(t)
              , i = r.css("display");
            r.remove();
            if (i === "none" || i === "") {
                hn || (hn = n.createElement("iframe"),
                hn.frameBorder = hn.width = hn.height = 0),
                t.appendChild(hn);
                if (!pn || !hn.createElement)
                    pn = (hn.contentWindow || hn.contentDocument).document,
                    pn.write((n.compatMode === "CSS1Compat" ? "<!doctype html>" : "") + "<html><body>"),
                    pn.close();
                r = pn.createElement(e),
                pn.body.appendChild(r),
                i = s.css(r, "display"),
                t.removeChild(hn)
            }
            cn[e] = i
        }
        return cn[e]
    }
    function Nn(e) {
        return s.isWindow(e) ? e : e.nodeType === 9 ? e.defaultView || e.parentWindow : !1
    }
    var n = e.document
      , r = e.navigator
      , i = e.location
      , s = function() {
        function H() {
            if (i.isReady)
                return;
            try {
                n.documentElement.doScroll("left")
            } catch (e) {
                setTimeout(H, 1);
                return
            }
            i.ready()
        }
        var i = function(e, t) {
            return new i.fn.init(e,t,u)
        }, s = e.jQuery, o = e.$, u, a = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/, f = /\S/, l = /^\s+/, c = /\s+$/, h = /^<(\w+)\s*\/?>(?:<\/\1>)?$/, p = /^[\],:{}\s]*$/, d = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, v = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, m = /(?:^|:|,)(?:\s*\[)+/g, g = /(webkit)[ \/]([\w.]+)/, y = /(opera)(?:.*version)?[ \/]([\w.]+)/, b = /(msie) ([\w.]+)/, w = /(mozilla)(?:.*? rv:([\w.]+))?/, E = /-([a-z]|[0-9])/ig, S = /^-ms-/, x = function(e, t) {
            return (t + "").toUpperCase()
        }, T = r.userAgent, N, C, k, L = Object.prototype.toString, A = Object.prototype.hasOwnProperty, O = Array.prototype.push, M = Array.prototype.slice, _ = String.prototype.trim, D = Array.prototype.indexOf, P = {};
        return i.fn = i.prototype = {
            constructor: i,
            init: function(e, r, s) {
                var o, u, f, l;
                if (!e)
                    return this;
                if (e.nodeType)
                    return this.context = this[0] = e,
                    this.length = 1,
                    this;
                if (e === "body" && !r && n.body)
                    return this.context = n,
                    this[0] = n.body,
                    this.selector = e,
                    this.length = 1,
                    this;
                if (typeof e == "string") {
                    e.charAt(0) === "<" && e.charAt(e.length - 1) === ">" && e.length >= 3 ? o = [null, e, null] : o = a.exec(e);
                    if (o && (o[1] || !r)) {
                        if (o[1])
                            return r = r instanceof i ? r[0] : r,
                            l = r ? r.ownerDocument || r : n,
                            f = h.exec(e),
                            f ? i.isPlainObject(r) ? (e = [n.createElement(f[1])],
                            i.fn.attr.call(e, r, !0)) : e = [l.createElement(f[1])] : (f = i.buildFragment([o[1]], [l]),
                            e = (f.cacheable ? i.clone(f.fragment) : f.fragment).childNodes),
                            i.merge(this, e);
                        u = n.getElementById(o[2]);
                        if (u && u.parentNode) {
                            if (u.id !== o[2])
                                return s.find(e);
                            this.length = 1,
                            this[0] = u
                        }
                        return this.context = n,
                        this.selector = e,
                        this
                    }
                    return !r || r.jquery ? (r || s).find(e) : this.constructor(r).find(e)
                }
                return i.isFunction(e) ? s.ready(e) : (e.selector !== t && (this.selector = e.selector,
                this.context = e.context),
                i.makeArray(e, this))
            },
            selector: "",
            jquery: "1.7.1",
            length: 0,
            size: function() {
                return this.length
            },
            toArray: function() {
                return M.call(this, 0)
            },
            get: function(e) {
                return e == null ? this.toArray() : e < 0 ? this[this.length + e] : this[e]
            },
            pushStack: function(e, t, n) {
                var r = this.constructor();
                return i.isArray(e) ? O.apply(r, e) : i.merge(r, e),
                r.prevObject = this,
                r.context = this.context,
                t === "find" ? r.selector = this.selector + (this.selector ? " " : "") + n : t && (r.selector = this.selector + "." + t + "(" + n + ")"),
                r
            },
            each: function(e, t) {
                return i.each(this, e, t)
            },
            ready: function(e) {
                return i.bindReady(),
                C.add(e),
                this
            },
            eq: function(e) {
                return e = +e,
                e === -1 ? this.slice(e) : this.slice(e, e + 1)
            },
            first: function() {
                return this.eq(0)
            },
            last: function() {
                return this.eq(-1)
            },
            slice: function() {
                return this.pushStack(M.apply(this, arguments), "slice", M.call(arguments).join(","))
            },
            map: function(e) {
                return this.pushStack(i.map(this, function(t, n) {
                    return e.call(t, n, t)
                }))
            },
            end: function() {
                return this.prevObject || this.constructor(null)
            },
            push: O,
            sort: [].sort,
            splice: [].splice
        },
        i.fn.init.prototype = i.fn,
        i.extend = i.fn.extend = function() {
            var e, n, r, s, o, u, a = arguments[0] || {}, f = 1, l = arguments.length, c = !1;
            typeof a == "boolean" && (c = a,
            a = arguments[1] || {},
            f = 2),
            typeof a != "object" && !i.isFunction(a) && (a = {}),
            l === f && (a = this,
            --f);
            for (; f < l; f++)
                if ((e = arguments[f]) != null)
                    for (n in e) {
                        r = a[n],
                        s = e[n];
                        if (a === s)
                            continue;
                        c && s && (i.isPlainObject(s) || (o = i.isArray(s))) ? (o ? (o = !1,
                        u = r && i.isArray(r) ? r : []) : u = r && i.isPlainObject(r) ? r : {},
                        a[n] = i.extend(c, u, s)) : s !== t && (a[n] = s)
                    }
            return a
        }
        ,
        i.extend({
            noConflict: function(t) {
                return e.$ === i && (e.$ = o),
                t && e.jQuery === i && (e.jQuery = s),
                i
            },
            isReady: !1,
            readyWait: 1,
            holdReady: function(e) {
                e ? i.readyWait++ : i.ready(!0)
            },
            ready: function(e) {
                if (e === !0 && !--i.readyWait || e !== !0 && !i.isReady) {
                    if (!n.body)
                        return setTimeout(i.ready, 1);
                    i.isReady = !0;
                    if (e !== !0 && --i.readyWait > 0)
                        return;
                    C.fireWith(n, [i]),
                    i.fn.trigger && i(n).trigger("ready").off("ready")
                }
            },
            bindReady: function() {
                if (C)
                    return;
                C = i.Callbacks("once memory");
                if (n.readyState === "complete")
                    return setTimeout(i.ready, 1);
                if (n.addEventListener)
                    n.addEventListener("DOMContentLoaded", k, !1),
                    e.addEventListener("load", i.ready, !1);
                else if (n.attachEvent) {
                    n.attachEvent("onreadystatechange", k),
                    e.attachEvent("onload", i.ready);
                    var t = !1;
                    try {
                        t = e.frameElement == null
                    } catch (r) {}
                    n.documentElement.doScroll && t && H()
                }
            },
            isFunction: function(e) {
                return i.type(e) === "function"
            },
            isArray: Array.isArray || function(e) {
                return i.type(e) === "array"
            }
            ,
            isWindow: function(e) {
                return e && typeof e == "object" && "setInterval"in e
            },
            isNumeric: function(e) {
                return !isNaN(parseFloat(e)) && isFinite(e)
            },
            type: function(e) {
                return e == null ? String(e) : P[L.call(e)] || "object"
            },
            isPlainObject: function(e) {
                if (!e || i.type(e) !== "object" || e.nodeType || i.isWindow(e))
                    return !1;
                try {
                    if (e.constructor && !A.call(e, "constructor") && !A.call(e.constructor.prototype, "isPrototypeOf"))
                        return !1
                } catch (n) {
                    return !1
                }
                var r;
                for (r in e)
                    ;
                return r === t || A.call(e, r)
            },
            isEmptyObject: function(e) {
                for (var t in e)
                    return !1;
                return !0
            },
            error: function(e) {
                throw new Error(e)
            },
            parseJSON: function(t) {
                if (typeof t != "string" || !t)
                    return null;
                t = i.trim(t);
                if (e.JSON && e.JSON.parse)
                    return e.JSON.parse(t);
                if (p.test(t.replace(d, "@").replace(v, "]").replace(m, "")))
                    return (new Function("return " + t))();
                i.error("Invalid JSON: " + t)
            },
            parseXML: function(n) {
                var r, s;
                try {
                    e.DOMParser ? (s = new DOMParser,
                    r = s.parseFromString(n, "text/xml")) : (r = new ActiveXObject("Microsoft.XMLDOM"),
                    r.async = "false",
                    r.loadXML(n))
                } catch (o) {
                    r = t
                }
                return (!r || !r.documentElement || r.getElementsByTagName("parsererror").length) && i.error("Invalid XML: " + n),
                r
            },
            noop: function() {},
            globalEval: function(t) {
                t && f.test(t) && (e.execScript || function(t) {
                    e.eval.call(e, t)
                }
                )(t)
            },
            camelCase: function(e) {
                return e.replace(S, "ms-").replace(E, x)
            },
            nodeName: function(e, t) {
                return e.nodeName && e.nodeName.toUpperCase() === t.toUpperCase()
            },
            each: function(e, n, r) {
                var s, o = 0, u = e.length, a = u === t || i.isFunction(e);
                if (r) {
                    if (a) {
                        for (s in e)
                            if (n.apply(e[s], r) === !1)
                                break
                    } else
                        for (; o < u; )
                            if (n.apply(e[o++], r) === !1)
                                break
                } else if (a) {
                    for (s in e)
                        if (n.call(e[s], s, e[s]) === !1)
                            break
                } else
                    for (; o < u; )
                        if (n.call(e[o], o, e[o++]) === !1)
                            break;
                return e
            },
            trim: _ ? function(e) {
                return e == null ? "" : _.call(e)
            }
            : function(e) {
                return e == null ? "" : e.toString().replace(l, "").replace(c, "")
            }
            ,
            makeArray: function(e, t) {
                var n = t || [];
                if (e != null) {
                    var r = i.type(e);
                    e.length == null || r === "string" || r === "function" || r === "regexp" || i.isWindow(e) ? O.call(n, e) : i.merge(n, e)
                }
                return n
            },
            inArray: function(e, t, n) {
                var r;
                if (t) {
                    if (D)
                        return D.call(t, e, n);
                    r = t.length,
                    n = n ? n < 0 ? Math.max(0, r + n) : n : 0;
                    for (; n < r; n++)
                        if (n in t && t[n] === e)
                            return n
                }
                return -1
            },
            merge: function(e, n) {
                var r = e.length
                  , i = 0;
                if (typeof n.length == "number")
                    for (var s = n.length; i < s; i++)
                        e[r++] = n[i];
                else
                    while (n[i] !== t)
                        e[r++] = n[i++];
                return e.length = r,
                e
            },
            grep: function(e, t, n) {
                var r = [], i;
                n = !!n;
                for (var s = 0, o = e.length; s < o; s++)
                    i = !!t(e[s], s),
                    n !== i && r.push(e[s]);
                return r
            },
            map: function(e, n, r) {
                var s, o, u = [], a = 0, f = e.length, l = e instanceof i || f !== t && typeof f == "number" && (f > 0 && e[0] && e[f - 1] || f === 0 || i.isArray(e));
                if (l)
                    for (; a < f; a++)
                        s = n(e[a], a, r),
                        s != null && (u[u.length] = s);
                else
                    for (o in e)
                        s = n(e[o], o, r),
                        s != null && (u[u.length] = s);
                return u.concat.apply([], u)
            },
            guid: 1,
            proxy: function(e, n) {
                if (typeof n == "string") {
                    var r = e[n];
                    n = e,
                    e = r
                }
                if (!i.isFunction(e))
                    return t;
                var s = M.call(arguments, 2)
                  , o = function() {
                    return e.apply(n, s.concat(M.call(arguments)))
                };
                return o.guid = e.guid = e.guid || o.guid || i.guid++,
                o
            },
            access: function(e, n, r, s, o, u) {
                var a = e.length;
                if (typeof n == "object") {
                    for (var f in n)
                        i.access(e, f, n[f], s, o, r);
                    return e
                }
                if (r !== t) {
                    s = !u && s && i.isFunction(r);
                    for (var l = 0; l < a; l++)
                        o(e[l], n, s ? r.call(e[l], l, o(e[l], n)) : r, u);
                    return e
                }
                return a ? o(e[0], n) : t
            },
            now: function() {
                return (new Date).getTime()
            },
            uaMatch: function(e) {
                e = e.toLowerCase();
                var t = g.exec(e) || y.exec(e) || b.exec(e) || e.indexOf("compatible") < 0 && w.exec(e) || [];
                return {
                    browser: t[1] || "",
                    version: t[2] || "0"
                }
            },
            sub: function() {
                function e(t, n) {
                    return new e.fn.init(t,n)
                }
                i.extend(!0, e, this),
                e.superclass = this,
                e.fn = e.prototype = this(),
                e.fn.constructor = e,
                e.sub = this.sub,
                e.fn.init = function(r, s) {
                    return s && s instanceof i && !(s instanceof e) && (s = e(s)),
                    i.fn.init.call(this, r, s, t)
                }
                ,
                e.fn.init.prototype = e.fn;
                var t = e(n);
                return e
            },
            browser: {}
        }),
        i.each("Boolean Number String Function Array Date RegExp Object".split(" "), function(e, t) {
            P["[object " + t + "]"] = t.toLowerCase()
        }),
        N = i.uaMatch(T),
        N.browser && (i.browser[N.browser] = !0,
        i.browser.version = N.version),
        i.browser.webkit && (i.browser.safari = !0),
        f.test(" ") && (l = /^[\s\xA0]+/,
        c = /[\s\xA0]+$/),
        u = i(n),
        n.addEventListener ? k = function() {
            n.removeEventListener("DOMContentLoaded", k, !1),
            i.ready()
        }
        : n.attachEvent && (k = function() {
            n.readyState === "complete" && (n.detachEvent("onreadystatechange", k),
            i.ready())
        }
        ),
        i
    }()
      , o = {};
    s.Callbacks = function(e) {
        e = e ? o[e] || u(e) : {};
        var n = [], r = [], i, a, f, l, c, h = function(t) {
            var r, i, o, u, a;
            for (r = 0,
            i = t.length; r < i; r++)
                o = t[r],
                u = s.type(o),
                u === "array" ? h(o) : u === "function" && (!e.unique || !d.has(o)) && n.push(o)
        }, p = function(t, s) {
            s = s || [],
            i = !e.memory || [t, s],
            a = !0,
            c = f || 0,
            f = 0,
            l = n.length;
            for (; n && c < l; c++)
                if (n[c].apply(t, s) === !1 && e.stopOnFalse) {
                    i = !0;
                    break
                }
            a = !1,
            n && (e.once ? i === !0 ? d.disable() : n = [] : r && r.length && (i = r.shift(),
            d.fireWith(i[0], i[1])))
        }, d = {
            add: function() {
                if (n) {
                    var e = n.length;
                    h(arguments),
                    a ? l = n.length : i && i !== !0 && (f = e,
                    p(i[0], i[1]))
                }
                return this
            },
            remove: function() {
                if (n) {
                    var t = arguments
                      , r = 0
                      , i = t.length;
                    for (; r < i; r++)
                        for (var s = 0; s < n.length; s++)
                            if (t[r] === n[s]) {
                                a && s <= l && (l--,
                                s <= c && c--),
                                n.splice(s--, 1);
                                if (e.unique)
                                    break
                            }
                }
                return this
            },
            has: function(e) {
                if (n) {
                    var t = 0
                      , r = n.length;
                    for (; t < r; t++)
                        if (e === n[t])
                            return !0
                }
                return !1
            },
            empty: function() {
                return n = [],
                this
            },
            disable: function() {
                return n = r = i = t,
                this
            },
            disabled: function() {
                return !n
            },
            lock: function() {
                return r = t,
                (!i || i === !0) && d.disable(),
                this
            },
            locked: function() {
                return !r
            },
            fireWith: function(t, n) {
                return r && (a ? e.once || r.push([t, n]) : (!e.once || !i) && p(t, n)),
                this
            },
            fire: function() {
                return d.fireWith(this, arguments),
                this
            },
            fired: function() {
                return !!i
            }
        };
        return d
    }
    ;
    var a = [].slice;
    s.extend({
        Deferred: function(e) {
            var t = s.Callbacks("once memory"), n = s.Callbacks("once memory"), r = s.Callbacks("memory"), i = "pending", o = {
                resolve: t,
                reject: n,
                notify: r
            }, u = {
                done: t.add,
                fail: n.add,
                progress: r.add,
                state: function() {
                    return i
                },
                isResolved: t.fired,
                isRejected: n.fired,
                then: function(e, t, n) {
                    return a.done(e).fail(t).progress(n),
                    this
                },
                always: function() {
                    return a.done.apply(a, arguments).fail.apply(a, arguments),
                    this
                },
                pipe: function(e, t, n) {
                    return s.Deferred(function(r) {
                        s.each({
                            done: [e, "resolve"],
                            fail: [t, "reject"],
                            progress: [n, "notify"]
                        }, function(e, t) {
                            var n = t[0], i = t[1], o;
                            s.isFunction(n) ? a[e](function() {
                                o = n.apply(this, arguments),
                                o && s.isFunction(o.promise) ? o.promise().then(r.resolve, r.reject, r.notify) : r[i + "With"](this === a ? r : this, [o])
                            }) : a[e](r[i])
                        })
                    }).promise()
                },
                promise: function(e) {
                    if (e == null)
                        e = u;
                    else
                        for (var t in u)
                            e[t] = u[t];
                    return e
                }
            }, a = u.promise({}), f;
            for (f in o)
                a[f] = o[f].fire,
                a[f + "With"] = o[f].fireWith;
            return a.done(function() {
                i = "resolved"
            }, n.disable, r.lock).fail(function() {
                i = "rejected"
            }, t.disable, r.lock),
            e && e.call(a, a),
            a
        },
        when: function(e) {
            function c(e) {
                return function(n) {
                    t[e] = arguments.length > 1 ? a.call(arguments, 0) : n,
                    --o || f.resolveWith(f, t)
                }
            }
            function h(e) {
                return function(t) {
                    i[e] = arguments.length > 1 ? a.call(arguments, 0) : t,
                    f.notifyWith(l, i)
                }
            }
            var t = a.call(arguments, 0)
              , n = 0
              , r = t.length
              , i = new Array(r)
              , o = r
              , u = r
              , f = r <= 1 && e && s.isFunction(e.promise) ? e : s.Deferred()
              , l = f.promise();
            if (r > 1) {
                for (; n < r; n++)
                    t[n] && t[n].promise && s.isFunction(t[n].promise) ? t[n].promise().then(c(n), f.reject, h(n)) : --o;
                o || f.resolveWith(f, t)
            } else
                f !== e && f.resolveWith(f, r ? [e] : []);
            return l
        }
    }),
    s.support = function() {
        var t, r, i, o, u, a, f, l, c, h, p, d, v, m = n.createElement("div"), g = n.documentElement;
        m.setAttribute("className", "t"),
        m.innerHTML = "   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>",
        r = m.getElementsByTagName("*"),
        i = m.getElementsByTagName("a")[0];
        if (!r || !r.length || !i)
            return {};
        o = n.createElement("select"),
        u = o.appendChild(n.createElement("option")),
        a = m.getElementsByTagName("input")[0],
        t = {
            leadingWhitespace: m.firstChild.nodeType === 3,
            tbody: !m.getElementsByTagName("tbody").length,
            htmlSerialize: !!m.getElementsByTagName("link").length,
            style: /top/.test(i.getAttribute("style")),
            hrefNormalized: i.getAttribute("href") === "/a",
            opacity: /^0.55/.test(i.style.opacity),
            cssFloat: !!i.style.cssFloat,
            checkOn: a.value === "on",
            optSelected: u.selected,
            getSetAttribute: m.className !== "t",
            enctype: !!n.createElement("form").enctype,
            html5Clone: n.createElement("nav").cloneNode(!0).outerHTML !== "<:nav></:nav>",
            submitBubbles: !0,
            changeBubbles: !0,
            focusinBubbles: !1,
            deleteExpando: !0,
            noCloneEvent: !0,
            inlineBlockNeedsLayout: !1,
            shrinkWrapBlocks: !1,
            reliableMarginRight: !0
        },
        a.checked = !0,
        t.noCloneChecked = a.cloneNode(!0).checked,
        o.disabled = !0,
        t.optDisabled = !u.disabled;
        try {
            delete m.test
        } catch (y) {
            t.deleteExpando = !1
        }
        !m.addEventListener && m.attachEvent && m.fireEvent && (m.attachEvent("onclick", function() {
            t.noCloneEvent = !1
        }),
        m.cloneNode(!0).fireEvent("onclick")),
        a = n.createElement("input"),
        a.value = "t",
        a.setAttribute("type", "radio"),
        t.radioValue = a.value === "t",
        a.setAttribute("checked", "checked"),
        m.appendChild(a),
        l = n.createDocumentFragment(),
        l.appendChild(m.lastChild),
        t.checkClone = l.cloneNode(!0).cloneNode(!0).lastChild.checked,
        t.appendChecked = a.checked,
        l.removeChild(a),
        l.appendChild(m),
        m.innerHTML = "",
        e.getComputedStyle && (f = n.createElement("div"),
        f.style.width = "0",
        f.style.marginRight = "0",
        m.style.width = "2px",
        m.appendChild(f),
        t.reliableMarginRight = (parseInt((e.getComputedStyle(f, null) || {
            marginRight: 0
        }).marginRight, 10) || 0) === 0);
        if (m.attachEvent)
            for (d in {
                submit: 1,
                change: 1,
                focusin: 1
            })
                p = "on" + d,
                v = p in m,
                v || (m.setAttribute(p, "return;"),
                v = typeof m[p] == "function"),
                t[d + "Bubbles"] = v;
        return l.removeChild(m),
        l = o = u = f = m = a = null,
        s(function() {
            var e, r, i, o, u, a, f, l, h, p, d, g = n.getElementsByTagName("body")[0];
            if (!g)
                return;
            f = 1,
            l = "position:absolute;top:0;left:0;width:1px;height:1px;margin:0;",
            h = "visibility:hidden;border:0;",
            p = "style='" + l + "border:5px solid #000;padding:0;'",
            d = "<div " + p + "><div></div></div>" + "<table " + p + " cellpadding='0' cellspacing='0'>" + "<tr><td></td></tr></table>",
            e = n.createElement("div"),
            e.style.cssText = h + "width:0;height:0;position:static;top:0;margin-top:" + f + "px",
            g.insertBefore(e, g.firstChild),
            m = n.createElement("div"),
            e.appendChild(m),
            m.innerHTML = "<table><tr><td style='padding:0;border:0;display:none'></td><td>t</td></tr></table>",
            c = m.getElementsByTagName("td"),
            v = c[0].offsetHeight === 0,
            c[0].style.display = "",
            c[1].style.display = "none",
            t.reliableHiddenOffsets = v && c[0].offsetHeight === 0,
            m.innerHTML = "",
            m.style.width = m.style.paddingLeft = "1px",
            s.boxModel = t.boxModel = m.offsetWidth === 2,
            typeof m.style.zoom != "undefined" && (m.style.display = "inline",
            m.style.zoom = 1,
            t.inlineBlockNeedsLayout = m.offsetWidth === 2,
            m.style.display = "",
            m.innerHTML = "<div style='width:4px;'></div>",
            t.shrinkWrapBlocks = m.offsetWidth !== 2),
            m.style.cssText = l + h,
            m.innerHTML = d,
            r = m.firstChild,
            i = r.firstChild,
            u = r.nextSibling.firstChild.firstChild,
            a = {
                doesNotAddBorder: i.offsetTop !== 5,
                doesAddBorderForTableAndCells: u.offsetTop === 5
            },
            i.style.position = "fixed",
            i.style.top = "20px",
            a.fixedPosition = i.offsetTop === 20 || i.offsetTop === 15,
            i.style.position = i.style.top = "",
            r.style.overflow = "hidden",
            r.style.position = "relative",
            a.subtractsBorderForOverflowNotVisible = i.offsetTop === -5,
            a.doesNotIncludeMarginInBodyOffset = g.offsetTop !== f,
            g.removeChild(e),
            m = e = null,
            s.extend(t, a)
        }),
        t
    }();
    var f = /^(?:\{.*\}|\[.*\])$/
      , l = /([A-Z])/g;
    s.extend({
        cache: {},
        uuid: 0,
        expando: "jQuery" + (s.fn.jquery + Math.random()).replace(/\D/g, ""),
        noData: {
            embed: !0,
            object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
            applet: !0
        },
        hasData: function(e) {
            return e = e.nodeType ? s.cache[e[s.expando]] : e[s.expando],
            !!e && !h(e)
        },
        data: function(e, n, r, i) {
            if (!s.acceptData(e))
                return;
            var o, u, a, f = s.expando, l = typeof n == "string", c = e.nodeType, h = c ? s.cache : e, p = c ? e[f] : e[f] && f, d = n === "events";
            if ((!p || !h[p] || !d && !i && !h[p].data) && l && r === t)
                return;
            p || (c ? e[f] = p = ++s.uuid : p = f),
            h[p] || (h[p] = {},
            c || (h[p].toJSON = s.noop));
            if (typeof n == "object" || typeof n == "function")
                i ? h[p] = s.extend(h[p], n) : h[p].data = s.extend(h[p].data, n);
            return o = u = h[p],
            i || (u.data || (u.data = {}),
            u = u.data),
            r !== t && (u[s.camelCase(n)] = r),
            d && !u[n] ? o.events : (l ? (a = u[n],
            a == null && (a = u[s.camelCase(n)])) : a = u,
            a)
        },
        removeData: function(e, t, n) {
            if (!s.acceptData(e))
                return;
            var r, i, o, u = s.expando, a = e.nodeType, f = a ? s.cache : e, l = a ? e[u] : u;
            if (!f[l])
                return;
            if (t) {
                r = n ? f[l] : f[l].data;
                if (r) {
                    s.isArray(t) || (t in r ? t = [t] : (t = s.camelCase(t),
                    t in r ? t = [t] : t = t.split(" ")));
                    for (i = 0,
                    o = t.length; i < o; i++)
                        delete r[t[i]];
                    if (!(n ? h : s.isEmptyObject)(r))
                        return
                }
            }
            if (!n) {
                delete f[l].data;
                if (!h(f[l]))
                    return
            }
            s.support.deleteExpando || !f.setInterval ? delete f[l] : f[l] = null,
            a && (s.support.deleteExpando ? delete e[u] : e.removeAttribute ? e.removeAttribute(u) : e[u] = null)
        },
        _data: function(e, t, n) {
            return s.data(e, t, n, !0)
        },
        acceptData: function(e) {
            if (e.nodeName) {
                var t = s.noData[e.nodeName.toLowerCase()];
                if (t)
                    return t !== !0 && e.getAttribute("classid") === t
            }
            return !0
        }
    }),
    s.fn.extend({
        data: function(e, n) {
            var r, i, o, u = null;
            if (typeof e == "undefined") {
                if (this.length) {
                    u = s.data(this[0]);
                    if (this[0].nodeType === 1 && !s._data(this[0], "parsedAttrs")) {
                        i = this[0].attributes;
                        for (var a = 0, f = i.length; a < f; a++)
                            o = i[a].name,
                            o.indexOf("data-") === 0 && (o = s.camelCase(o.substring(5)),
                            c(this[0], o, u[o]));
                        s._data(this[0], "parsedAttrs", !0)
                    }
                }
                return u
            }
            return typeof e == "object" ? this.each(function() {
                s.data(this, e)
            }) : (r = e.split("."),
            r[1] = r[1] ? "." + r[1] : "",
            n === t ? (u = this.triggerHandler("getData" + r[1] + "!", [r[0]]),
            u === t && this.length && (u = s.data(this[0], e),
            u = c(this[0], e, u)),
            u === t && r[1] ? this.data(r[0]) : u) : this.each(function() {
                var t = s(this)
                  , i = [r[0], n];
                t.triggerHandler("setData" + r[1] + "!", i),
                s.data(this, e, n),
                t.triggerHandler("changeData" + r[1] + "!", i)
            }))
        },
        removeData: function(e) {
            return this.each(function() {
                s.removeData(this, e)
            })
        }
    }),
    s.extend({
        _mark: function(e, t) {
            e && (t = (t || "fx") + "mark",
            s._data(e, t, (s._data(e, t) || 0) + 1))
        },
        _unmark: function(e, t, n) {
            e !== !0 && (n = t,
            t = e,
            e = !1);
            if (t) {
                n = n || "fx";
                var r = n + "mark"
                  , i = e ? 0 : (s._data(t, r) || 1) - 1;
                i ? s._data(t, r, i) : (s.removeData(t, r, !0),
                p(t, n, "mark"))
            }
        },
        queue: function(e, t, n) {
            var r;
            if (e)
                return t = (t || "fx") + "queue",
                r = s._data(e, t),
                n && (!r || s.isArray(n) ? r = s._data(e, t, s.makeArray(n)) : r.push(n)),
                r || []
        },
        dequeue: function(e, t) {
            t = t || "fx";
            var n = s.queue(e, t)
              , r = n.shift()
              , i = {};
            r === "inprogress" && (r = n.shift()),
            r && (t === "fx" && n.unshift("inprogress"),
            s._data(e, t + ".run", i),
            r.call(e, function() {
                s.dequeue(e, t)
            }, i)),
            n.length || (s.removeData(e, t + "queue " + t + ".run", !0),
            p(e, t, "queue"))
        }
    }),
    s.fn.extend({
        queue: function(e, n) {
            return typeof e != "string" && (n = e,
            e = "fx"),
            n === t ? s.queue(this[0], e) : this.each(function() {
                var t = s.queue(this, e, n);
                e === "fx" && t[0] !== "inprogress" && s.dequeue(this, e)
            })
        },
        dequeue: function(e) {
            return this.each(function() {
                s.dequeue(this, e)
            })
        },
        delay: function(e, t) {
            return e = s.fx ? s.fx.speeds[e] || e : e,
            t = t || "fx",
            this.queue(t, function(t, n) {
                var r = setTimeout(t, e);
                n.stop = function() {
                    clearTimeout(r)
                }
            })
        },
        clearQueue: function(e) {
            return this.queue(e || "fx", [])
        },
        promise: function(e, n) {
            function h() {
                --u || r.resolveWith(i, [i])
            }
            typeof e != "string" && (n = e,
            e = t),
            e = e || "fx";
            var r = s.Deferred(), i = this, o = i.length, u = 1, a = e + "defer", f = e + "queue", l = e + "mark", c;
            while (o--)
                if (c = s.data(i[o], a, t, !0) || (s.data(i[o], f, t, !0) || s.data(i[o], l, t, !0)) && s.data(i[o], a, s.Callbacks("once memory"), !0))
                    u++,
                    c.add(h);
            return h(),
            r.promise()
        }
    });
    var d = /[\n\t\r]/g, v = /\s+/, m = /\r/g, g = /^(?:button|input)$/i, y = /^(?:button|input|object|select|textarea)$/i, b = /^a(?:rea)?$/i, w = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i, E = s.support.getSetAttribute, S, x, T;
    s.fn.extend({
        attr: function(e, t) {
            return s.access(this, e, t, !0, s.attr)
        },
        removeAttr: function(e) {
            return this.each(function() {
                s.removeAttr(this, e)
            })
        },
        prop: function(e, t) {
            return s.access(this, e, t, !0, s.prop)
        },
        removeProp: function(e) {
            return e = s.propFix[e] || e,
            this.each(function() {
                try {
                    this[e] = t,
                    delete this[e]
                } catch (n) {}
            })
        },
        addClass: function(e) {
            var t, n, r, i, o, u, a;
            if (s.isFunction(e))
                return this.each(function(t) {
                    s(this).addClass(e.call(this, t, this.className))
                });
            if (e && typeof e == "string") {
                t = e.split(v);
                for (n = 0,
                r = this.length; n < r; n++) {
                    i = this[n];
                    if (i.nodeType === 1)
                        if (!i.className && t.length === 1)
                            i.className = e;
                        else {
                            o = " " + i.className + " ";
                            for (u = 0,
                            a = t.length; u < a; u++)
                                ~o.indexOf(" " + t[u] + " ") || (o += t[u] + " ");
                            i.className = s.trim(o)
                        }
                }
            }
            return this
        },
        removeClass: function(e) {
            var n, r, i, o, u, a, f;
            if (s.isFunction(e))
                return this.each(function(t) {
                    s(this).removeClass(e.call(this, t, this.className))
                });
            if (e && typeof e == "string" || e === t) {
                n = (e || "").split(v);
                for (r = 0,
                i = this.length; r < i; r++) {
                    o = this[r];
                    if (o.nodeType === 1 && o.className)
                        if (e) {
                            u = (" " + o.className + " ").replace(d, " ");
                            for (a = 0,
                            f = n.length; a < f; a++)
                                u = u.replace(" " + n[a] + " ", " ");
                            o.className = s.trim(u)
                        } else
                            o.className = ""
                }
            }
            return this
        },
        toggleClass: function(e, t) {
            var n = typeof e
              , r = typeof t == "boolean";
            return s.isFunction(e) ? this.each(function(n) {
                s(this).toggleClass(e.call(this, n, this.className, t), t)
            }) : this.each(function() {
                if (n === "string") {
                    var i, o = 0, u = s(this), a = t, f = e.split(v);
                    while (i = f[o++])
                        a = r ? a : !u.hasClass(i),
                        u[a ? "addClass" : "removeClass"](i)
                } else if (n === "undefined" || n === "boolean")
                    this.className && s._data(this, "__className__", this.className),
                    this.className = this.className || e === !1 ? "" : s._data(this, "__className__") || ""
            })
        },
        hasClass: function(e) {
            var t = " " + e + " "
              , n = 0
              , r = this.length;
            for (; n < r; n++)
                if (this[n].nodeType === 1 && (" " + this[n].className + " ").replace(d, " ").indexOf(t) > -1)
                    return !0;
            return !1
        },
        val: function(e) {
            var n, r, i, o = this[0];
            if (!arguments.length) {
                if (o)
                    return n = s.valHooks[o.nodeName.toLowerCase()] || s.valHooks[o.type],
                    n && "get"in n && (r = n.get(o, "value")) !== t ? r : (r = o.value,
                    typeof r == "string" ? r.replace(m, "") : r == null ? "" : r);
                return
            }
            return i = s.isFunction(e),
            this.each(function(r) {
                var o = s(this), u;
                if (this.nodeType !== 1)
                    return;
                i ? u = e.call(this, r, o.val()) : u = e,
                u == null ? u = "" : typeof u == "number" ? u += "" : s.isArray(u) && (u = s.map(u, function(e) {
                    return e == null ? "" : e + ""
                })),
                n = s.valHooks[this.nodeName.toLowerCase()] || s.valHooks[this.type];
                if (!n || !("set"in n) || n.set(this, u, "value") === t)
                    this.value = u
            })
        }
    }),
    s.extend({
        valHooks: {
            option: {
                get: function(e) {
                    var t = e.attributes.value;
                    return !t || t.specified ? e.value : e.text
                }
            },
            select: {
                get: function(e) {
                    var t, n, r, i, o = e.selectedIndex, u = [], a = e.options, f = e.type === "select-one";
                    if (o < 0)
                        return null;
                    n = f ? o : 0,
                    r = f ? o + 1 : a.length;
                    for (; n < r; n++) {
                        i = a[n];
                        if (i.selected && (s.support.optDisabled ? !i.disabled : i.getAttribute("disabled") === null) && (!i.parentNode.disabled || !s.nodeName(i.parentNode, "optgroup"))) {
                            t = s(i).val();
                            if (f)
                                return t;
                            u.push(t)
                        }
                    }
                    return f && !u.length && a.length ? s(a[o]).val() : u
                },
                set: function(e, t) {
                    var n = s.makeArray(t);
                    return s(e).find("option").each(function() {
                        this.selected = s.inArray(s(this).val(), n) >= 0
                    }),
                    n.length || (e.selectedIndex = -1),
                    n
                }
            }
        },
        attrFn: {
            val: !0,
            css: !0,
            html: !0,
            text: !0,
            data: !0,
            width: !0,
            height: !0,
            offset: !0
        },
        attr: function(e, n, r, i) {
            var o, u, a, f = e.nodeType;
            if (!e || f === 3 || f === 8 || f === 2)
                return;
            if (i && n in s.attrFn)
                return s(e)[n](r);
            if (typeof e.getAttribute == "undefined")
                return s.prop(e, n, r);
            a = f !== 1 || !s.isXMLDoc(e),
            a && (n = n.toLowerCase(),
            u = s.attrHooks[n] || (w.test(n) ? x : S));
            if (r !== t) {
                if (r === null) {
                    s.removeAttr(e, n);
                    return
                }
                return u && "set"in u && a && (o = u.set(e, r, n)) !== t ? o : (e.setAttribute(n, "" + r),
                r)
            }
            return u && "get"in u && a && (o = u.get(e, n)) !== null ? o : (o = e.getAttribute(n),
            o === null ? t : o)
        },
        removeAttr: function(e, t) {
            var n, r, i, o, u = 0;
            if (t && e.nodeType === 1) {
                r = t.toLowerCase().split(v),
                o = r.length;
                for (; u < o; u++)
                    i = r[u],
                    i && (n = s.propFix[i] || i,
                    s.attr(e, i, ""),
                    e.removeAttribute(E ? i : n),
                    w.test(i) && n in e && (e[n] = !1))
            }
        },
        attrHooks: {
            type: {
                set: function(e, t) {
                    if (g.test(e.nodeName) && e.parentNode)
                        s.error("type property can't be changed");
                    else if (!s.support.radioValue && t === "radio" && s.nodeName(e, "input")) {
                        var n = e.value;
                        return e.setAttribute("type", t),
                        n && (e.value = n),
                        t
                    }
                }
            },
            value: {
                get: function(e, t) {
                    return S && s.nodeName(e, "button") ? S.get(e, t) : t in e ? e.value : null
                },
                set: function(e, t, n) {
                    if (S && s.nodeName(e, "button"))
                        return S.set(e, t, n);
                    e.value = t
                }
            }
        },
        propFix: {
            tabindex: "tabIndex",
            readonly: "readOnly",
            "for": "htmlFor",
            "class": "className",
            maxlength: "maxLength",
            cellspacing: "cellSpacing",
            cellpadding: "cellPadding",
            rowspan: "rowSpan",
            colspan: "colSpan",
            usemap: "useMap",
            frameborder: "frameBorder",
            contenteditable: "contentEditable"
        },
        prop: function(e, n, r) {
            var i, o, u, a = e.nodeType;
            if (!e || a === 3 || a === 8 || a === 2)
                return;
            return u = a !== 1 || !s.isXMLDoc(e),
            u && (n = s.propFix[n] || n,
            o = s.propHooks[n]),
            r !== t ? o && "set"in o && (i = o.set(e, r, n)) !== t ? i : e[n] = r : o && "get"in o && (i = o.get(e, n)) !== null ? i : e[n]
        },
        propHooks: {
            tabIndex: {
                get: function(e) {
                    var n = e.getAttributeNode("tabindex");
                    return n && n.specified ? parseInt(n.value, 10) : y.test(e.nodeName) || b.test(e.nodeName) && e.href ? 0 : t
                }
            }
        }
    }),
    s.attrHooks.tabindex = s.propHooks.tabIndex,
    x = {
        get: function(e, n) {
            var r, i = s.prop(e, n);
            return i === !0 || typeof i != "boolean" && (r = e.getAttributeNode(n)) && r.nodeValue !== !1 ? n.toLowerCase() : t
        },
        set: function(e, t, n) {
            var r;
            return t === !1 ? s.removeAttr(e, n) : (r = s.propFix[n] || n,
            r in e && (e[r] = !0),
            e.setAttribute(n, n.toLowerCase())),
            n
        }
    },
    E || (T = {
        name: !0,
        id: !0
    },
    S = s.valHooks.button = {
        get: function(e, n) {
            var r;
            return r = e.getAttributeNode(n),
            r && (T[n] ? r.nodeValue !== "" : r.specified) ? r.nodeValue : t
        },
        set: function(e, t, r) {
            var i = e.getAttributeNode(r);
            return i || (i = n.createAttribute(r),
            e.setAttributeNode(i)),
            i.nodeValue = t + ""
        }
    },
    s.attrHooks.tabindex.set = S.set,
    s.each(["width", "height"], function(e, t) {
        s.attrHooks[t] = s.extend(s.attrHooks[t], {
            set: function(e, n) {
                if (n === "")
                    return e.setAttribute(t, "auto"),
                    n
            }
        })
    }),
    s.attrHooks.contenteditable = {
        get: S.get,
        set: function(e, t, n) {
            t === "" && (t = "false"),
            S.set(e, t, n)
        }
    }),
    s.support.hrefNormalized || s.each(["href", "src", "width", "height"], function(e, n) {
        s.attrHooks[n] = s.extend(s.attrHooks[n], {
            get: function(e) {
                var r = e.getAttribute(n, 2);
                return r === null ? t : r
            }
        })
    }),
    s.support.style || (s.attrHooks.style = {
        get: function(e) {
            return e.style.cssText.toLowerCase() || t
        },
        set: function(e, t) {
            return e.style.cssText = "" + t
        }
    }),
    s.support.optSelected || (s.propHooks.selected = s.extend(s.propHooks.selected, {
        get: function(e) {
            var t = e.parentNode;
            return t && (t.selectedIndex,
            t.parentNode && t.parentNode.selectedIndex),
            null
        }
    })),
    s.support.enctype || (s.propFix.enctype = "encoding"),
    s.support.checkOn || s.each(["radio", "checkbox"], function() {
        s.valHooks[this] = {
            get: function(e) {
                return e.getAttribute("value") === null ? "on" : e.value
            }
        }
    }),
    s.each(["radio", "checkbox"], function() {
        s.valHooks[this] = s.extend(s.valHooks[this], {
            set: function(e, t) {
                if (s.isArray(t))
                    return e.checked = s.inArray(s(e).val(), t) >= 0
            }
        })
    });
    var N = /^(?:textarea|input|select)$/i
      , C = /^([^\.]*)?(?:\.(.+))?$/
      , k = /\bhover(\.\S+)?\b/
      , L = /^key/
      , A = /^(?:mouse|contextmenu)|click/
      , O = /^(?:focusinfocus|focusoutblur)$/
      , M = /^(\w*)(?:#([\w\-]+))?(?:\.([\w\-]+))?$/
      , _ = function(e) {
        var t = M.exec(e);
        return t && (t[1] = (t[1] || "").toLowerCase(),
        t[3] = t[3] && new RegExp("(?:^|\\s)" + t[3] + "(?:\\s|$)")),
        t
    }
      , D = function(e, t) {
        var n = e.attributes || {};
        return (!t[1] || e.nodeName.toLowerCase() === t[1]) && (!t[2] || (n.id || {}).value === t[2]) && (!t[3] || t[3].test((n["class"] || {}).value))
    }
      , P = function(e) {
        return s.event.special.hover ? e : e.replace(k, "mouseenter$1 mouseleave$1")
    };
    s.event = {
        add: function(e, n, r, i, o) {
            var u, a, f, l, c, h, p, d, v, m, g, y;
            if (e.nodeType === 3 || e.nodeType === 8 || !n || !r || !(u = s._data(e)))
                return;
            r.handler && (v = r,
            r = v.handler),
            r.guid || (r.guid = s.guid++),
            f = u.events,
            f || (u.events = f = {}),
            a = u.handle,
            a || (u.handle = a = function(e) {
                return typeof s == "undefined" || !!e && s.event.triggered === e.type ? t : s.event.dispatch.apply(a.elem, arguments)
            }
            ,
            a.elem = e),
            n = s.trim(P(n)).split(" ");
            for (l = 0; l < n.length; l++) {
                c = C.exec(n[l]) || [],
                h = c[1],
                p = (c[2] || "").split(".").sort(),
                y = s.event.special[h] || {},
                h = (o ? y.delegateType : y.bindType) || h,
                y = s.event.special[h] || {},
                d = s.extend({
                    type: h,
                    origType: c[1],
                    data: i,
                    handler: r,
                    guid: r.guid,
                    selector: o,
                    quick: _(o),
                    namespace: p.join(".")
                }, v),
                g = f[h];
                if (!g) {
                    g = f[h] = [],
                    g.delegateCount = 0;
                    if (!y.setup || y.setup.call(e, i, p, a) === !1)
                        e.addEventListener ? e.addEventListener(h, a, !1) : e.attachEvent && e.attachEvent("on" + h, a)
                }
                y.add && (y.add.call(e, d),
                d.handler.guid || (d.handler.guid = r.guid)),
                o ? g.splice(g.delegateCount++, 0, d) : g.push(d),
                s.event.global[h] = !0
            }
            e = null
        },
        global: {},
        remove: function(e, t, n, r, i) {
            var o = s.hasData(e) && s._data(e), u, a, f, l, c, h, p, d, v, m, g, y;
            if (!o || !(d = o.events))
                return;
            t = s.trim(P(t || "")).split(" ");
            for (u = 0; u < t.length; u++) {
                a = C.exec(t[u]) || [],
                f = l = a[1],
                c = a[2];
                if (!f) {
                    for (f in d)
                        s.event.remove(e, f + t[u], n, r, !0);
                    continue
                }
                v = s.event.special[f] || {},
                f = (r ? v.delegateType : v.bindType) || f,
                g = d[f] || [],
                h = g.length,
                c = c ? new RegExp("(^|\\.)" + c.split(".").sort().join("\\.(?:.*\\.)?") + "(\\.|$)") : null;
                for (p = 0; p < g.length; p++)
                    y = g[p],
                    (i || l === y.origType) && (!n || n.guid === y.guid) && (!c || c.test(y.namespace)) && (!r || r === y.selector || r === "**" && y.selector) && (g.splice(p--, 1),
                    y.selector && g.delegateCount--,
                    v.remove && v.remove.call(e, y));
                g.length === 0 && h !== g.length && ((!v.teardown || v.teardown.call(e, c) === !1) && s.removeEvent(e, f, o.handle),
                delete d[f])
            }
            s.isEmptyObject(d) && (m = o.handle,
            m && (m.elem = null),
            s.removeData(e, ["events", "handle"], !0))
        },
        customEvent: {
            getData: !0,
            setData: !0,
            changeData: !0
        },
        trigger: function(n, r, i, o) {
            if (!i || i.nodeType !== 3 && i.nodeType !== 8) {
                var u = n.type || n, a = [], f, l, c, h, p, d, v, m, g, y;
                if (O.test(u + s.event.triggered))
                    return;
                u.indexOf("!") >= 0 && (u = u.slice(0, -1),
                l = !0),
                u.indexOf(".") >= 0 && (a = u.split("."),
                u = a.shift(),
                a.sort());
                if ((!i || s.event.customEvent[u]) && !s.event.global[u])
                    return;
                n = typeof n == "object" ? n[s.expando] ? n : new s.Event(u,n) : new s.Event(u),
                n.type = u,
                n.isTrigger = !0,
                n.exclusive = l,
                n.namespace = a.join("."),
                n.namespace_re = n.namespace ? new RegExp("(^|\\.)" + a.join("\\.(?:.*\\.)?") + "(\\.|$)") : null,
                d = u.indexOf(":") < 0 ? "on" + u : "";
                if (!i) {
                    f = s.cache;
                    for (c in f)
                        f[c].events && f[c].events[u] && s.event.trigger(n, r, f[c].handle.elem, !0);
                    return
                }
                n.result = t,
                n.target || (n.target = i),
                r = r != null ? s.makeArray(r) : [],
                r.unshift(n),
                v = s.event.special[u] || {};
                if (v.trigger && v.trigger.apply(i, r) === !1)
                    return;
                g = [[i, v.bindType || u]];
                if (!o && !v.noBubble && !s.isWindow(i)) {
                    y = v.delegateType || u,
                    h = O.test(y + u) ? i : i.parentNode,
                    p = null;
                    for (; h; h = h.parentNode)
                        g.push([h, y]),
                        p = h;
                    p && p === i.ownerDocument && g.push([p.defaultView || p.parentWindow || e, y])
                }
                for (c = 0; c < g.length && !n.isPropagationStopped(); c++)
                    h = g[c][0],
                    n.type = g[c][1],
                    m = (s._data(h, "events") || {})[n.type] && s._data(h, "handle"),
                    m && m.apply(h, r),
                    m = d && h[d],
                    m && s.acceptData(h) && m.apply(h, r) === !1 && n.preventDefault();
                return n.type = u,
                !o && !n.isDefaultPrevented() && (!v._default || v._default.apply(i.ownerDocument, r) === !1) && (u !== "click" || !s.nodeName(i, "a")) && s.acceptData(i) && d && i[u] && (u !== "focus" && u !== "blur" || n.target.offsetWidth !== 0) && !s.isWindow(i) && (p = i[d],
                p && (i[d] = null),
                s.event.triggered = u,
                i[u](),
                s.event.triggered = t,
                p && (i[d] = p)),
                n.result
            }
            return
        },
        dispatch: function(n) {
            n = s.event.fix(n || e.event);
            var r = (s._data(this, "events") || {})[n.type] || [], i = r.delegateCount, o = [].slice.call(arguments, 0), u = !n.exclusive && !n.namespace, a = [], f, l, c, h, p, d, v, m, g, y, b;
            o[0] = n,
            n.delegateTarget = this;
            if (i && !n.target.disabled && (!n.button || n.type !== "click")) {
                h = s(this),
                h.context = this.ownerDocument || this;
                for (c = n.target; c != this; c = c.parentNode || this) {
                    d = {},
                    m = [],
                    h[0] = c;
                    for (f = 0; f < i; f++)
                        g = r[f],
                        y = g.selector,
                        d[y] === t && (d[y] = g.quick ? D(c, g.quick) : h.is(y)),
                        d[y] && m.push(g);
                    m.length && a.push({
                        elem: c,
                        matches: m
                    })
                }
            }
            r.length > i && a.push({
                elem: this,
                matches: r.slice(i)
            });
            for (f = 0; f < a.length && !n.isPropagationStopped(); f++) {
                v = a[f],
                n.currentTarget = v.elem;
                for (l = 0; l < v.matches.length && !n.isImmediatePropagationStopped(); l++) {
                    g = v.matches[l];
                    if (u || !n.namespace && !g.namespace || n.namespace_re && n.namespace_re.test(g.namespace))
                        n.data = g.data,
                        n.handleObj = g,
                        p = ((s.event.special[g.origType] || {}).handle || g.handler).apply(v.elem, o),
                        p !== t && (n.result = p,
                        p === !1 && (n.preventDefault(),
                        n.stopPropagation()))
                }
            }
            return n.result
        },
        props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function(e, t) {
                return e.which == null && (e.which = t.charCode != null ? t.charCode : t.keyCode),
                e
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(e, r) {
                var i, s, o, u = r.button, a = r.fromElement;
                return e.pageX == null && r.clientX != null && (i = e.target.ownerDocument || n,
                s = i.documentElement,
                o = i.body,
                e.pageX = r.clientX + (s && s.scrollLeft || o && o.scrollLeft || 0) - (s && s.clientLeft || o && o.clientLeft || 0),
                e.pageY = r.clientY + (s && s.scrollTop || o && o.scrollTop || 0) - (s && s.clientTop || o && o.clientTop || 0)),
                !e.relatedTarget && a && (e.relatedTarget = a === e.target ? r.toElement : a),
                !e.which && u !== t && (e.which = u & 1 ? 1 : u & 2 ? 3 : u & 4 ? 2 : 0),
                e
            }
        },
        fix: function(e) {
            if (e[s.expando])
                return e;
            var r, i, o = e, u = s.event.fixHooks[e.type] || {}, a = u.props ? this.props.concat(u.props) : this.props;
            e = s.Event(o);
            for (r = a.length; r; )
                i = a[--r],
                e[i] = o[i];
            return e.target || (e.target = o.srcElement || n),
            e.target.nodeType === 3 && (e.target = e.target.parentNode),
            e.metaKey === t && (e.metaKey = e.ctrlKey),
            u.filter ? u.filter(e, o) : e
        },
        special: {
            ready: {
                setup: s.bindReady
            },
            load: {
                noBubble: !0
            },
            focus: {
                delegateType: "focusin"
            },
            blur: {
                delegateType: "focusout"
            },
            beforeunload: {
                setup: function(e, t, n) {
                    s.isWindow(this) && (this.onbeforeunload = n)
                },
                teardown: function(e, t) {
                    this.onbeforeunload === t && (this.onbeforeunload = null)
                }
            }
        },
        simulate: function(e, t, n, r) {
            var i = s.extend(new s.Event, n, {
                type: e,
                isSimulated: !0,
                originalEvent: {}
            });
            r ? s.event.trigger(i, null, t) : s.event.dispatch.call(t, i),
            i.isDefaultPrevented() && n.preventDefault()
        }
    },
    s.event.handle = s.event.dispatch,
    s.removeEvent = n.removeEventListener ? function(e, t, n) {
        e.removeEventListener && e.removeEventListener(t, n, !1)
    }
    : function(e, t, n) {
        e.detachEvent && e.detachEvent("on" + t, n)
    }
    ,
    s.Event = function(e, t) {
        if (!(this instanceof s.Event))
            return new s.Event(e,t);
        e && e.type ? (this.originalEvent = e,
        this.type = e.type,
        this.isDefaultPrevented = e.defaultPrevented || e.returnValue === !1 || e.getPreventDefault && e.getPreventDefault() ? B : H) : this.type = e,
        t && s.extend(this, t),
        this.timeStamp = e && e.timeStamp || s.now(),
        this[s.expando] = !0
    }
    ,
    s.Event.prototype = {
        preventDefault: function() {
            this.isDefaultPrevented = B;
            var e = this.originalEvent;
            if (!e)
                return;
            e.preventDefault ? e.preventDefault() : e.returnValue = !1
        },
        stopPropagation: function() {
            this.isPropagationStopped = B;
            var e = this.originalEvent;
            if (!e)
                return;
            e.stopPropagation && e.stopPropagation(),
            e.cancelBubble = !0
        },
        stopImmediatePropagation: function() {
            this.isImmediatePropagationStopped = B,
            this.stopPropagation()
        },
        isDefaultPrevented: H,
        isPropagationStopped: H,
        isImmediatePropagationStopped: H
    },
    s.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    }, function(e, t) {
        s.event.special[e] = {
            delegateType: t,
            bindType: t,
            handle: function(e) {
                var n = this, r = e.relatedTarget, i = e.handleObj, o = i.selector, u;
                if (!r || r !== n && !s.contains(n, r))
                    e.type = i.origType,
                    u = i.handler.apply(this, arguments),
                    e.type = t;
                return u
            }
        }
    }),
    s.support.submitBubbles || (s.event.special.submit = {
        setup: function() {
            if (s.nodeName(this, "form"))
                return !1;
            s.event.add(this, "click._submit keypress._submit", function(e) {
                var n = e.target
                  , r = s.nodeName(n, "input") || s.nodeName(n, "button") ? n.form : t;
                r && !r._submit_attached && (s.event.add(r, "submit._submit", function(e) {
                    this.parentNode && !e.isTrigger && s.event.simulate("submit", this.parentNode, e, !0)
                }),
                r._submit_attached = !0)
            })
        },
        teardown: function() {
            if (s.nodeName(this, "form"))
                return !1;
            s.event.remove(this, "._submit")
        }
    }),
    s.support.changeBubbles || (s.event.special.change = {
        setup: function() {
            if (N.test(this.nodeName)) {
                if (this.type === "checkbox" || this.type === "radio")
                    s.event.add(this, "propertychange._change", function(e) {
                        e.originalEvent.propertyName === "checked" && (this._just_changed = !0)
                    }),
                    s.event.add(this, "click._change", function(e) {
                        this._just_changed && !e.isTrigger && (this._just_changed = !1,
                        s.event.simulate("change", this, e, !0))
                    });
                return !1
            }
            s.event.add(this, "beforeactivate._change", function(e) {
                var t = e.target;
                N.test(t.nodeName) && !t._change_attached && (s.event.add(t, "change._change", function(e) {
                    this.parentNode && !e.isSimulated && !e.isTrigger && s.event.simulate("change", this.parentNode, e, !0)
                }),
                t._change_attached = !0)
            })
        },
        handle: function(e) {
            var t = e.target;
            if (this !== t || e.isSimulated || e.isTrigger || t.type !== "radio" && t.type !== "checkbox")
                return e.handleObj.handler.apply(this, arguments)
        },
        teardown: function() {
            return s.event.remove(this, "._change"),
            N.test(this.nodeName)
        }
    }),
    s.support.focusinBubbles || s.each({
        focus: "focusin",
        blur: "focusout"
    }, function(e, t) {
        var r = 0
          , i = function(e) {
            s.event.simulate(t, e.target, s.event.fix(e), !0)
        };
        s.event.special[t] = {
            setup: function() {
                r++ === 0 && n.addEventListener(e, i, !0)
            },
            teardown: function() {
                --r === 0 && n.removeEventListener(e, i, !0)
            }
        }
    }),
    s.fn.extend({
        on: function(e, n, r, i, o) {
            var u, a;
            if (typeof e == "object") {
                typeof n != "string" && (r = n,
                n = t);
                for (a in e)
                    this.on(a, n, r, e[a], o);
                return this
            }
            r == null && i == null ? (i = n,
            r = n = t) : i == null && (typeof n == "string" ? (i = r,
            r = t) : (i = r,
            r = n,
            n = t));
            if (i === !1)
                i = H;
            else if (!i)
                return this;
            return o === 1 && (u = i,
            i = function(e) {
                return s().off(e),
                u.apply(this, arguments)
            }
            ,
            i.guid = u.guid || (u.guid = s.guid++)),
            this.each(function() {
                s.event.add(this, e, i, r, n)
            })
        },
        one: function(e, t, n, r) {
            return this.on.call(this, e, t, n, r, 1)
        },
        off: function(e, n, r) {
            if (e && e.preventDefault && e.handleObj) {
                var i = e.handleObj;
                return s(e.delegateTarget).off(i.namespace ? i.type + "." + i.namespace : i.type, i.selector, i.handler),
                this
            }
            if (typeof e == "object") {
                for (var o in e)
                    this.off(o, n, e[o]);
                return this
            }
            if (n === !1 || typeof n == "function")
                r = n,
                n = t;
            return r === !1 && (r = H),
            this.each(function() {
                s.event.remove(this, e, r, n)
            })
        },
        bind: function(e, t, n) {
            return this.on(e, null, t, n)
        },
        unbind: function(e, t) {
            return this.off(e, null, t)
        },
        live: function(e, t, n) {
            return s(this.context).on(e, this.selector, t, n),
            this
        },
        die: function(e, t) {
            return s(this.context).off(e, this.selector || "**", t),
            this
        },
        delegate: function(e, t, n, r) {
            return this.on(t, e, n, r)
        },
        undelegate: function(e, t, n) {
            return arguments.length == 1 ? this.off(e, "**") : this.off(t, e, n)
        },
        trigger: function(e, t) {
            return this.each(function() {
                s.event.trigger(e, t, this)
            })
        },
        triggerHandler: function(e, t) {
            if (this[0])
                return s.event.trigger(e, t, this[0], !0)
        },
        toggle: function(e) {
            var t = arguments
              , n = e.guid || s.guid++
              , r = 0
              , i = function(n) {
                var i = (s._data(this, "lastToggle" + e.guid) || 0) % r;
                return s._data(this, "lastToggle" + e.guid, i + 1),
                n.preventDefault(),
                t[i].apply(this, arguments) || !1
            };
            i.guid = n;
            while (r < t.length)
                t[r++].guid = n;
            return this.click(i)
        },
        hover: function(e, t) {
            return this.mouseenter(e).mouseleave(t || e)
        }
    }),
    s.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(e, t) {
        s.fn[t] = function(e, n) {
            return n == null && (n = e,
            e = null),
            arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
        }
        ,
        s.attrFn && (s.attrFn[t] = !0),
        L.test(t) && (s.event.fixHooks[t] = s.event.keyHooks),
        A.test(t) && (s.event.fixHooks[t] = s.event.mouseHooks)
    }),
    function() {
        function S(e, t, n, i, s, o) {
            for (var u = 0, a = i.length; u < a; u++) {
                var f = i[u];
                if (f) {
                    var l = !1;
                    f = f[e];
                    while (f) {
                        if (f[r] === n) {
                            l = i[f.sizset];
                            break
                        }
                        f.nodeType === 1 && !o && (f[r] = n,
                        f.sizset = u);
                        if (f.nodeName.toLowerCase() === t) {
                            l = f;
                            break
                        }
                        f = f[e]
                    }
                    i[u] = l
                }
            }
        }
        function x(e, t, n, i, s, o) {
            for (var u = 0, a = i.length; u < a; u++) {
                var f = i[u];
                if (f) {
                    var l = !1;
                    f = f[e];
                    while (f) {
                        if (f[r] === n) {
                            l = i[f.sizset];
                            break
                        }
                        if (f.nodeType === 1) {
                            o || (f[r] = n,
                            f.sizset = u);
                            if (typeof t != "string") {
                                if (f === t) {
                                    l = !0;
                                    break
                                }
                            } else if (h.filter(t, [f]).length > 0) {
                                l = f;
                                break
                            }
                        }
                        f = f[e]
                    }
                    i[u] = l
                }
            }
        }
        var e = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g
          , r = "sizcache" + (Math.random() + "").replace(".", "")
          , i = 0
          , o = Object.prototype.toString
          , u = !1
          , a = !0
          , f = /\\/g
          , l = /\r\n/g
          , c = /\W/;
        [0, 0].sort(function() {
            return a = !1,
            0
        });
        var h = function(t, r, i, s) {
            i = i || [],
            r = r || n;
            var u = r;
            if (r.nodeType !== 1 && r.nodeType !== 9)
                return [];
            if (!t || typeof t != "string")
                return i;
            var a, f, l, c, p, m, g, b, w = !0, E = h.isXML(r), S = [], x = t;
            do {
                e.exec(""),
                a = e.exec(x);
                if (a) {
                    x = a[3],
                    S.push(a[1]);
                    if (a[2]) {
                        c = a[3];
                        break
                    }
                }
            } while (a);if (S.length > 1 && v.exec(t))
                if (S.length === 2 && d.relative[S[0]])
                    f = T(S[0] + S[1], r, s);
                else {
                    f = d.relative[S[0]] ? [r] : h(S.shift(), r);
                    while (S.length)
                        t = S.shift(),
                        d.relative[t] && (t += S.shift()),
                        f = T(t, f, s)
                }
            else {
                !s && S.length > 1 && r.nodeType === 9 && !E && d.match.ID.test(S[0]) && !d.match.ID.test(S[S.length - 1]) && (p = h.find(S.shift(), r, E),
                r = p.expr ? h.filter(p.expr, p.set)[0] : p.set[0]);
                if (r) {
                    p = s ? {
                        expr: S.pop(),
                        set: y(s)
                    } : h.find(S.pop(), S.length !== 1 || S[0] !== "~" && S[0] !== "+" || !r.parentNode ? r : r.parentNode, E),
                    f = p.expr ? h.filter(p.expr, p.set) : p.set,
                    S.length > 0 ? l = y(f) : w = !1;
                    while (S.length)
                        m = S.pop(),
                        g = m,
                        d.relative[m] ? g = S.pop() : m = "",
                        g == null && (g = r),
                        d.relative[m](l, g, E)
                } else
                    l = S = []
            }
            l || (l = f),
            l || h.error(m || t);
            if (o.call(l) === "[object Array]")
                if (!w)
                    i.push.apply(i, l);
                else if (r && r.nodeType === 1)
                    for (b = 0; l[b] != null; b++)
                        l[b] && (l[b] === !0 || l[b].nodeType === 1 && h.contains(r, l[b])) && i.push(f[b]);
                else
                    for (b = 0; l[b] != null; b++)
                        l[b] && l[b].nodeType === 1 && i.push(f[b]);
            else
                y(l, i);
            return c && (h(c, u, i, s),
            h.uniqueSort(i)),
            i
        };
        h.uniqueSort = function(e) {
            if (w) {
                u = a,
                e.sort(w);
                if (u)
                    for (var t = 1; t < e.length; t++)
                        e[t] === e[t - 1] && e.splice(t--, 1)
            }
            return e
        }
        ,
        h.matches = function(e, t) {
            return h(e, null, null, t)
        }
        ,
        h.matchesSelector = function(e, t) {
            return h(t, null, null, [e]).length > 0
        }
        ,
        h.find = function(e, t, n) {
            var r, i, s, o, u, a;
            if (!e)
                return [];
            for (i = 0,
            s = d.order.length; i < s; i++) {
                u = d.order[i];
                if (o = d.leftMatch[u].exec(e)) {
                    a = o[1],
                    o.splice(1, 1);
                    if (a.substr(a.length - 1) !== "\\") {
                        o[1] = (o[1] || "").replace(f, ""),
                        r = d.find[u](o, t, n);
                        if (r != null) {
                            e = e.replace(d.match[u], "");
                            break
                        }
                    }
                }
            }
            return r || (r = typeof t.getElementsByTagName != "undefined" ? t.getElementsByTagName("*") : []),
            {
                set: r,
                expr: e
            }
        }
        ,
        h.filter = function(e, n, r, i) {
            var s, o, u, a, f, l, c, p, v, m = e, g = [], y = n, b = n && n[0] && h.isXML(n[0]);
            while (e && n.length) {
                for (u in d.filter)
                    if ((s = d.leftMatch[u].exec(e)) != null && s[2]) {
                        l = d.filter[u],
                        c = s[1],
                        o = !1,
                        s.splice(1, 1);
                        if (c.substr(c.length - 1) === "\\")
                            continue;
                        y === g && (g = []);
                        if (d.preFilter[u]) {
                            s = d.preFilter[u](s, y, r, g, i, b);
                            if (!s)
                                o = a = !0;
                            else if (s === !0)
                                continue
                        }
                        if (s)
                            for (p = 0; (f = y[p]) != null; p++)
                                f && (a = l(f, s, p, y),
                                v = i ^ a,
                                r && a != null ? v ? o = !0 : y[p] = !1 : v && (g.push(f),
                                o = !0));
                        if (a !== t) {
                            r || (y = g),
                            e = e.replace(d.match[u], "");
                            if (!o)
                                return [];
                            break
                        }
                    }
                if (e === m) {
                    if (o != null)
                        break;
                    h.error(e)
                }
                m = e
            }
            return y
        }
        ,
        h.error = function(e) {
            throw new Error("Syntax error, unrecognized expression: " + e)
        }
        ;
        var p = h.getText = function(e) {
            var t, n, r = e.nodeType, i = "";
            if (r) {
                if (r === 1 || r === 9) {
                    if (typeof e.textContent == "string")
                        return e.textContent;
                    if (typeof e.innerText == "string")
                        return e.innerText.replace(l, "");
                    for (e = e.firstChild; e; e = e.nextSibling)
                        i += p(e)
                } else if (r === 3 || r === 4)
                    return e.nodeValue
            } else
                for (t = 0; n = e[t]; t++)
                    n.nodeType !== 8 && (i += p(n));
            return i
        }
          , d = h.selectors = {
            order: ["ID", "NAME", "TAG"],
            match: {
                ID: /#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
                CLASS: /\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
                NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,
                ATTR: /\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,
                TAG: /^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,
                CHILD: /:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,
                POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,
                PSEUDO: /:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
            },
            leftMatch: {},
            attrMap: {
                "class": "className",
                "for": "htmlFor"
            },
            attrHandle: {
                href: function(e) {
                    return e.getAttribute("href")
                },
                type: function(e) {
                    return e.getAttribute("type")
                }
            },
            relative: {
                "+": function(e, t) {
                    var n = typeof t == "string"
                      , r = n && !c.test(t)
                      , i = n && !r;
                    r && (t = t.toLowerCase());
                    for (var s = 0, o = e.length, u; s < o; s++)
                        if (u = e[s]) {
                            while ((u = u.previousSibling) && u.nodeType !== 1)
                                ;
                            e[s] = i || u && u.nodeName.toLowerCase() === t ? u || !1 : u === t
                        }
                    i && h.filter(t, e, !0)
                },
                ">": function(e, t) {
                    var n, r = typeof t == "string", i = 0, s = e.length;
                    if (r && !c.test(t)) {
                        t = t.toLowerCase();
                        for (; i < s; i++) {
                            n = e[i];
                            if (n) {
                                var o = n.parentNode;
                                e[i] = o.nodeName.toLowerCase() === t ? o : !1
                            }
                        }
                    } else {
                        for (; i < s; i++)
                            n = e[i],
                            n && (e[i] = r ? n.parentNode : n.parentNode === t);
                        r && h.filter(t, e, !0)
                    }
                },
                "": function(e, t, n) {
                    var r, s = i++, o = x;
                    typeof t == "string" && !c.test(t) && (t = t.toLowerCase(),
                    r = t,
                    o = S),
                    o("parentNode", t, s, e, r, n)
                },
                "~": function(e, t, n) {
                    var r, s = i++, o = x;
                    typeof t == "string" && !c.test(t) && (t = t.toLowerCase(),
                    r = t,
                    o = S),
                    o("previousSibling", t, s, e, r, n)
                }
            },
            find: {
                ID: function(e, t, n) {
                    if (typeof t.getElementById != "undefined" && !n) {
                        var r = t.getElementById(e[1]);
                        return r && r.parentNode ? [r] : []
                    }
                },
                NAME: function(e, t) {
                    if (typeof t.getElementsByName != "undefined") {
                        var n = []
                          , r = t.getElementsByName(e[1]);
                        for (var i = 0, s = r.length; i < s; i++)
                            r[i].getAttribute("name") === e[1] && n.push(r[i]);
                        return n.length === 0 ? null : n
                    }
                },
                TAG: function(e, t) {
                    if (typeof t.getElementsByTagName != "undefined")
                        return t.getElementsByTagName(e[1])
                }
            },
            preFilter: {
                CLASS: function(e, t, n, r, i, s) {
                    e = " " + e[1].replace(f, "") + " ";
                    if (s)
                        return e;
                    for (var o = 0, u; (u = t[o]) != null; o++)
                        u && (i ^ (u.className && (" " + u.className + " ").replace(/[\t\n\r]/g, " ").indexOf(e) >= 0) ? n || r.push(u) : n && (t[o] = !1));
                    return !1
                },
                ID: function(e) {
                    return e[1].replace(f, "")
                },
                TAG: function(e, t) {
                    return e[1].replace(f, "").toLowerCase()
                },
                CHILD: function(e) {
                    if (e[1] === "nth") {
                        e[2] || h.error(e[0]),
                        e[2] = e[2].replace(/^\+|\s*/g, "");
                        var t = /(-?)(\d*)(?:n([+\-]?\d*))?/.exec(e[2] === "even" && "2n" || e[2] === "odd" && "2n+1" || !/\D/.test(e[2]) && "0n+" + e[2] || e[2]);
                        e[2] = t[1] + (t[2] || 1) - 0,
                        e[3] = t[3] - 0
                    } else
                        e[2] && h.error(e[0]);
                    return e[0] = i++,
                    e
                },
                ATTR: function(e, t, n, r, i, s) {
                    var o = e[1] = e[1].replace(f, "");
                    return !s && d.attrMap[o] && (e[1] = d.attrMap[o]),
                    e[4] = (e[4] || e[5] || "").replace(f, ""),
                    e[2] === "~=" && (e[4] = " " + e[4] + " "),
                    e
                },
                PSEUDO: function(t, n, r, i, s) {
                    if (t[1] === "not") {
                        if (!((e.exec(t[3]) || "").length > 1 || /^\w/.test(t[3]))) {
                            var o = h.filter(t[3], n, r, !0 ^ s);
                            return r || i.push.apply(i, o),
                            !1
                        }
                        t[3] = h(t[3], null, null, n)
                    } else if (d.match.POS.test(t[0]) || d.match.CHILD.test(t[0]))
                        return !0;
                    return t
                },
                POS: function(e) {
                    return e.unshift(!0),
                    e
                }
            },
            filters: {
                enabled: function(e) {
                    return e.disabled === !1 && e.type !== "hidden"
                },
                disabled: function(e) {
                    return e.disabled === !0
                },
                checked: function(e) {
                    return e.checked === !0
                },
                selected: function(e) {
                    return e.parentNode && e.parentNode.selectedIndex,
                    e.selected === !0
                },
                parent: function(e) {
                    return !!e.firstChild
                },
                empty: function(e) {
                    return !e.firstChild
                },
                has: function(e, t, n) {
                    return !!h(n[3], e).length
                },
                header: function(e) {
                    return /h\d/i.test(e.nodeName)
                },
                text: function(e) {
                    var t = e.getAttribute("type")
                      , n = e.type;
                    return e.nodeName.toLowerCase() === "input" && "text" === n && (t === n || t === null)
                },
                radio: function(e) {
                    return e.nodeName.toLowerCase() === "input" && "radio" === e.type
                },
                checkbox: function(e) {
                    return e.nodeName.toLowerCase() === "input" && "checkbox" === e.type
                },
                file: function(e) {
                    return e.nodeName.toLowerCase() === "input" && "file" === e.type
                },
                password: function(e) {
                    return e.nodeName.toLowerCase() === "input" && "password" === e.type
                },
                submit: function(e) {
                    var t = e.nodeName.toLowerCase();
                    return (t === "input" || t === "button") && "submit" === e.type
                },
                image: function(e) {
                    return e.nodeName.toLowerCase() === "input" && "image" === e.type
                },
                reset: function(e) {
                    var t = e.nodeName.toLowerCase();
                    return (t === "input" || t === "button") && "reset" === e.type
                },
                button: function(e) {
                    var t = e.nodeName.toLowerCase();
                    return t === "input" && "button" === e.type || t === "button"
                },
                input: function(e) {
                    return /input|select|textarea|button/i.test(e.nodeName)
                },
                focus: function(e) {
                    return e === e.ownerDocument.activeElement
                }
            },
            setFilters: {
                first: function(e, t) {
                    return t === 0
                },
                last: function(e, t, n, r) {
                    return t === r.length - 1
                },
                even: function(e, t) {
                    return t % 2 === 0
                },
                odd: function(e, t) {
                    return t % 2 === 1
                },
                lt: function(e, t, n) {
                    return t < n[3] - 0
                },
                gt: function(e, t, n) {
                    return t > n[3] - 0
                },
                nth: function(e, t, n) {
                    return n[3] - 0 === t
                },
                eq: function(e, t, n) {
                    return n[3] - 0 === t
                }
            },
            filter: {
                PSEUDO: function(e, t, n, r) {
                    var i = t[1]
                      , s = d.filters[i];
                    if (s)
                        return s(e, n, t, r);
                    if (i === "contains")
                        return (e.textContent || e.innerText || p([e]) || "").indexOf(t[3]) >= 0;
                    if (i === "not") {
                        var o = t[3];
                        for (var u = 0, a = o.length; u < a; u++)
                            if (o[u] === e)
                                return !1;
                        return !0
                    }
                    h.error(i)
                },
                CHILD: function(e, t) {
                    var n, i, s, o, u, a, f, l = t[1], c = e;
                    switch (l) {
                    case "only":
                    case "first":
                        while (c = c.previousSibling)
                            if (c.nodeType === 1)
                                return !1;
                        if (l === "first")
                            return !0;
                        c = e;
                    case "last":
                        while (c = c.nextSibling)
                            if (c.nodeType === 1)
                                return !1;
                        return !0;
                    case "nth":
                        n = t[2],
                        i = t[3];
                        if (n === 1 && i === 0)
                            return !0;
                        s = t[0],
                        o = e.parentNode;
                        if (o && (o[r] !== s || !e.nodeIndex)) {
                            a = 0;
                            for (c = o.firstChild; c; c = c.nextSibling)
                                c.nodeType === 1 && (c.nodeIndex = ++a);
                            o[r] = s
                        }
                        return f = e.nodeIndex - i,
                        n === 0 ? f === 0 : f % n === 0 && f / n >= 0
                    }
                },
                ID: function(e, t) {
                    return e.nodeType === 1 && e.getAttribute("id") === t
                },
                TAG: function(e, t) {
                    return t === "*" && e.nodeType === 1 || !!e.nodeName && e.nodeName.toLowerCase() === t
                },
                CLASS: function(e, t) {
                    return (" " + (e.className || e.getAttribute("class")) + " ").indexOf(t) > -1
                },
                ATTR: function(e, t) {
                    var n = t[1]
                      , r = h.attr ? h.attr(e, n) : d.attrHandle[n] ? d.attrHandle[n](e) : e[n] != null ? e[n] : e.getAttribute(n)
                      , i = r + ""
                      , s = t[2]
                      , o = t[4];
                    return r == null ? s === "!=" : !s && h.attr ? r != null : s === "=" ? i === o : s === "*=" ? i.indexOf(o) >= 0 : s === "~=" ? (" " + i + " ").indexOf(o) >= 0 : o ? s === "!=" ? i !== o : s === "^=" ? i.indexOf(o) === 0 : s === "$=" ? i.substr(i.length - o.length) === o : s === "|=" ? i === o || i.substr(0, o.length + 1) === o + "-" : !1 : i && r !== !1
                },
                POS: function(e, t, n, r) {
                    var i = t[2]
                      , s = d.setFilters[i];
                    if (s)
                        return s(e, n, t, r)
                }
            }
        }
          , v = d.match.POS
          , m = function(e, t) {
            return "\\" + (t - 0 + 1)
        };
        for (var g in d.match)
            d.match[g] = new RegExp(d.match[g].source + /(?![^\[]*\])(?![^\(]*\))/.source),
            d.leftMatch[g] = new RegExp(/(^(?:.|\r|\n)*?)/.source + d.match[g].source.replace(/\\(\d+)/g, m));
        var y = function(e, t) {
            return e = Array.prototype.slice.call(e, 0),
            t ? (t.push.apply(t, e),
            t) : e
        };
        try {
            Array.prototype.slice.call(n.documentElement.childNodes, 0)[0].nodeType
        } catch (b) {
            y = function(e, t) {
                var n = 0
                  , r = t || [];
                if (o.call(e) === "[object Array]")
                    Array.prototype.push.apply(r, e);
                else if (typeof e.length == "number")
                    for (var i = e.length; n < i; n++)
                        r.push(e[n]);
                else
                    for (; e[n]; n++)
                        r.push(e[n]);
                return r
            }
        }
        var w, E;
        n.documentElement.compareDocumentPosition ? w = function(e, t) {
            return e === t ? (u = !0,
            0) : !e.compareDocumentPosition || !t.compareDocumentPosition ? e.compareDocumentPosition ? -1 : 1 : e.compareDocumentPosition(t) & 4 ? -1 : 1
        }
        : (w = function(e, t) {
            if (e === t)
                return u = !0,
                0;
            if (e.sourceIndex && t.sourceIndex)
                return e.sourceIndex - t.sourceIndex;
            var n, r, i = [], s = [], o = e.parentNode, a = t.parentNode, f = o;
            if (o === a)
                return E(e, t);
            if (!o)
                return -1;
            if (!a)
                return 1;
            while (f)
                i.unshift(f),
                f = f.parentNode;
            f = a;
            while (f)
                s.unshift(f),
                f = f.parentNode;
            n = i.length,
            r = s.length;
            for (var l = 0; l < n && l < r; l++)
                if (i[l] !== s[l])
                    return E(i[l], s[l]);
            return l === n ? E(e, s[l], -1) : E(i[l], t, 1)
        }
        ,
        E = function(e, t, n) {
            if (e === t)
                return n;
            var r = e.nextSibling;
            while (r) {
                if (r === t)
                    return -1;
                r = r.nextSibling
            }
            return 1
        }
        ),
        function() {
            var e = n.createElement("div")
              , r = "script" + (new Date).getTime()
              , i = n.documentElement;
            e.innerHTML = "<a name='" + r + "'/>",
            i.insertBefore(e, i.firstChild),
            n.getElementById(r) && (d.find.ID = function(e, n, r) {
                if (typeof n.getElementById != "undefined" && !r) {
                    var i = n.getElementById(e[1]);
                    return i ? i.id === e[1] || typeof i.getAttributeNode != "undefined" && i.getAttributeNode("id").nodeValue === e[1] ? [i] : t : []
                }
            }
            ,
            d.filter.ID = function(e, t) {
                var n = typeof e.getAttributeNode != "undefined" && e.getAttributeNode("id");
                return e.nodeType === 1 && n && n.nodeValue === t
            }
            ),
            i.removeChild(e),
            i = e = null
        }(),
        function() {
            var e = n.createElement("div");
            e.appendChild(n.createComment("")),
            e.getElementsByTagName("*").length > 0 && (d.find.TAG = function(e, t) {
                var n = t.getElementsByTagName(e[1]);
                if (e[1] === "*") {
                    var r = [];
                    for (var i = 0; n[i]; i++)
                        n[i].nodeType === 1 && r.push(n[i]);
                    n = r
                }
                return n
            }
            ),
            e.innerHTML = "<a href='#'></a>",
            e.firstChild && typeof e.firstChild.getAttribute != "undefined" && e.firstChild.getAttribute("href") !== "#" && (d.attrHandle.href = function(e) {
                return e.getAttribute("href", 2)
            }
            ),
            e = null
        }(),
        n.querySelectorAll && function() {
            var e = h
              , t = n.createElement("div")
              , r = "__sizzle__";
            t.innerHTML = "<p class='TEST'></p>";
            if (t.querySelectorAll && t.querySelectorAll(".TEST").length === 0)
                return;
            h = function(t, i, s, o) {
                i = i || n;
                if (!o && !h.isXML(i)) {
                    var u = /^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(t);
                    if (u && (i.nodeType === 1 || i.nodeType === 9)) {
                        if (u[1])
                            return y(i.getElementsByTagName(t), s);
                        if (u[2] && d.find.CLASS && i.getElementsByClassName)
                            return y(i.getElementsByClassName(u[2]), s)
                    }
                    if (i.nodeType === 9) {
                        if (t === "body" && i.body)
                            return y([i.body], s);
                        if (u && u[3]) {
                            var a = i.getElementById(u[3]);
                            if (!a || !a.parentNode)
                                return y([], s);
                            if (a.id === u[3])
                                return y([a], s)
                        }
                        try {
                            return y(i.querySelectorAll(t), s)
                        } catch (f) {}
                    } else if (i.nodeType === 1 && i.nodeName.toLowerCase() !== "object") {
                        var l = i
                          , c = i.getAttribute("id")
                          , p = c || r
                          , v = i.parentNode
                          , m = /^\s*[+~]/.test(t);
                        c ? p = p.replace(/'/g, "\\$&") : i.setAttribute("id", p),
                        m && v && (i = i.parentNode);
                        try {
                            if (!m || v)
                                return y(i.querySelectorAll("[id='" + p + "'] " + t), s)
                        } catch (g) {} finally {
                            c || l.removeAttribute("id")
                        }
                    }
                }
                return e(t, i, s, o)
            }
            ;
            for (var i in e)
                h[i] = e[i];
            t = null
        }(),
        function() {
            var e = n.documentElement
              , t = e.matchesSelector || e.mozMatchesSelector || e.webkitMatchesSelector || e.msMatchesSelector;
            if (t) {
                var r = !t.call(n.createElement("div"), "div")
                  , i = !1;
                try {
                    t.call(n.documentElement, "[test!='']:sizzle")
                } catch (s) {
                    i = !0
                }
                h.matchesSelector = function(e, n) {
                    n = n.replace(/\=\s*([^'"\]]*)\s*\]/g, "='$1']");
                    if (!h.isXML(e))
                        try {
                            if (i || !d.match.PSEUDO.test(n) && !/!=/.test(n)) {
                                var s = t.call(e, n);
                                if (s || !r || e.document && e.document.nodeType !== 11)
                                    return s
                            }
                        } catch (o) {}
                    return h(n, null, null, [e]).length > 0
                }
            }
        }(),
        function() {
            var e = n.createElement("div");
            e.innerHTML = "<div class='test e'></div><div class='test'></div>";
            if (!e.getElementsByClassName || e.getElementsByClassName("e").length === 0)
                return;
            e.lastChild.className = "e";
            if (e.getElementsByClassName("e").length === 1)
                return;
            d.order.splice(1, 0, "CLASS"),
            d.find.CLASS = function(e, t, n) {
                if (typeof t.getElementsByClassName != "undefined" && !n)
                    return t.getElementsByClassName(e[1])
            }
            ,
            e = null
        }(),
        n.documentElement.contains ? h.contains = function(e, t) {
            return e !== t && (e.contains ? e.contains(t) : !0)
        }
        : n.documentElement.compareDocumentPosition ? h.contains = function(e, t) {
            return !!(e.compareDocumentPosition(t) & 16)
        }
        : h.contains = function() {
            return !1
        }
        ,
        h.isXML = function(e) {
            var t = (e ? e.ownerDocument || e : 0).documentElement;
            return t ? t.nodeName !== "HTML" : !1
        }
        ;
        var T = function(e, t, n) {
            var r, i = [], s = "", o = t.nodeType ? [t] : t;
            while (r = d.match.PSEUDO.exec(e))
                s += r[0],
                e = e.replace(d.match.PSEUDO, "");
            e = d.relative[e] ? e + "*" : e;
            for (var u = 0, a = o.length; u < a; u++)
                h(e, o[u], i, n);
            return h.filter(s, i)
        };
        h.attr = s.attr,
        h.selectors.attrMap = {},
        s.find = h,
        s.expr = h.selectors,
        s.expr[":"] = s.expr.filters,
        s.unique = h.uniqueSort,
        s.text = h.getText,
        s.isXMLDoc = h.isXML,
        s.contains = h.contains
    }();
    var j = /Until$/
      , F = /^(?:parents|prevUntil|prevAll)/
      , I = /,/
      , q = /^.[^:#\[\.,]*$/
      , R = Array.prototype.slice
      , U = s.expr.match.POS
      , z = {
        children: !0,
        contents: !0,
        next: !0,
        prev: !0
    };
    s.fn.extend({
        find: function(e) {
            var t = this, n, r;
            if (typeof e != "string")
                return s(e).filter(function() {
                    for (n = 0,
                    r = t.length; n < r; n++)
                        if (s.contains(t[n], this))
                            return !0
                });
            var i = this.pushStack("", "find", e), o, u, a;
            for (n = 0,
            r = this.length; n < r; n++) {
                o = i.length,
                s.find(e, this[n], i);
                if (n > 0)
                    for (u = o; u < i.length; u++)
                        for (a = 0; a < o; a++)
                            if (i[a] === i[u]) {
                                i.splice(u--, 1);
                                break
                            }
            }
            return i
        },
        has: function(e) {
            var t = s(e);
            return this.filter(function() {
                for (var e = 0, n = t.length; e < n; e++)
                    if (s.contains(this, t[e]))
                        return !0
            })
        },
        not: function(e) {
            return this.pushStack(X(this, e, !1), "not", e)
        },
        filter: function(e) {
            return this.pushStack(X(this, e, !0), "filter", e)
        },
        is: function(e) {
            return !!e && (typeof e == "string" ? U.test(e) ? s(e, this.context).index(this[0]) >= 0 : s.filter(e, this).length > 0 : this.filter(e).length > 0)
        },
        closest: function(e, t) {
            var n = [], r, i, o = this[0];
            if (s.isArray(e)) {
                var u = 1;
                while (o && o.ownerDocument && o !== t) {
                    for (r = 0; r < e.length; r++)
                        s(o).is(e[r]) && n.push({
                            selector: e[r],
                            elem: o,
                            level: u
                        });
                    o = o.parentNode,
                    u++
                }
                return n
            }
            var a = U.test(e) || typeof e != "string" ? s(e, t || this.context) : 0;
            for (r = 0,
            i = this.length; r < i; r++) {
                o = this[r];
                while (o) {
                    if (a ? a.index(o) > -1 : s.find.matchesSelector(o, e)) {
                        n.push(o);
                        break
                    }
                    o = o.parentNode;
                    if (!o || !o.ownerDocument || o === t || o.nodeType === 11)
                        break
                }
            }
            return n = n.length > 1 ? s.unique(n) : n,
            this.pushStack(n, "closest", e)
        },
        index: function(e) {
            return e ? typeof e == "string" ? s.inArray(this[0], s(e)) : s.inArray(e.jquery ? e[0] : e, this) : this[0] && this[0].parentNode ? this.prevAll().length : -1
        },
        add: function(e, t) {
            var n = typeof e == "string" ? s(e, t) : s.makeArray(e && e.nodeType ? [e] : e)
              , r = s.merge(this.get(), n);
            return this.pushStack(W(n[0]) || W(r[0]) ? r : s.unique(r))
        },
        andSelf: function() {
            return this.add(this.prevObject)
        }
    }),
    s.each({
        parent: function(e) {
            var t = e.parentNode;
            return t && t.nodeType !== 11 ? t : null
        },
        parents: function(e) {
            return s.dir(e, "parentNode")
        },
        parentsUntil: function(e, t, n) {
            return s.dir(e, "parentNode", n)
        },
        next: function(e) {
            return s.nth(e, 2, "nextSibling")
        },
        prev: function(e) {
            return s.nth(e, 2, "previousSibling")
        },
        nextAll: function(e) {
            return s.dir(e, "nextSibling")
        },
        prevAll: function(e) {
            return s.dir(e, "previousSibling")
        },
        nextUntil: function(e, t, n) {
            return s.dir(e, "nextSibling", n)
        },
        prevUntil: function(e, t, n) {
            return s.dir(e, "previousSibling", n)
        },
        siblings: function(e) {
            return s.sibling(e.parentNode.firstChild, e)
        },
        children: function(e) {
            return s.sibling(e.firstChild)
        },
        contents: function(e) {
            return s.nodeName(e, "iframe") ? e.contentDocument || e.contentWindow.document : s.makeArray(e.childNodes)
        }
    }, function(e, t) {
        s.fn[e] = function(n, r) {
            var i = s.map(this, t, n);
            return j.test(e) || (r = n),
            r && typeof r == "string" && (i = s.filter(r, i)),
            i = this.length > 1 && !z[e] ? s.unique(i) : i,
            (this.length > 1 || I.test(r)) && F.test(e) && (i = i.reverse()),
            this.pushStack(i, e, R.call(arguments).join(","))
        }
    }),
    s.extend({
        filter: function(e, t, n) {
            return n && (e = ":not(" + e + ")"),
            t.length === 1 ? s.find.matchesSelector(t[0], e) ? [t[0]] : [] : s.find.matches(e, t)
        },
        dir: function(e, n, r) {
            var i = []
              , o = e[n];
            while (o && o.nodeType !== 9 && (r === t || o.nodeType !== 1 || !s(o).is(r)))
                o.nodeType === 1 && i.push(o),
                o = o[n];
            return i
        },
        nth: function(e, t, n, r) {
            t = t || 1;
            var i = 0;
            for (; e; e = e[n])
                if (e.nodeType === 1 && ++i === t)
                    break;
            return e
        },
        sibling: function(e, t) {
            var n = [];
            for (; e; e = e.nextSibling)
                e.nodeType === 1 && e !== t && n.push(e);
            return n
        }
    });
    var $ = "abbr|article|aside|audio|canvas|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video"
      , J = / jQuery\d+="(?:\d+|null)"/g
      , K = /^\s+/
      , Q = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig
      , G = /<([\w:]+)/
      , Y = /<tbody/i
      , Z = /<|&#?\w+;/
      , et = /<(?:script|style)/i
      , tt = /<(?:script|object|embed|option|style)/i
      , nt = new RegExp("<(?:" + $ + ")","i")
      , rt = /checked\s*(?:[^=]|=\s*.checked.)/i
      , it = /\/(java|ecma)script/i
      , st = /^\s*<!(?:\[CDATA\[|\-\-)/
      , ot = {
        option: [1, "<select multiple='multiple'>", "</select>"],
        legend: [1, "<fieldset>", "</fieldset>"],
        thead: [1, "<table>", "</table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
        col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
        area: [1, "<map>", "</map>"],
        _default: [0, "", ""]
    }
      , ut = V(n);
    ot.optgroup = ot.option,
    ot.tbody = ot.tfoot = ot.colgroup = ot.caption = ot.thead,
    ot.th = ot.td,
    s.support.htmlSerialize || (ot._default = [1, "div<div>", "</div>"]),
    s.fn.extend({
        text: function(e) {
            return s.isFunction(e) ? this.each(function(t) {
                var n = s(this);
                n.text(e.call(this, t, n.text()))
            }) : typeof e != "object" && e !== t ? this.empty().append((this[0] && this[0].ownerDocument || n).createTextNode(e)) : s.text(this)
        },
        wrapAll: function(e) {
            if (s.isFunction(e))
                return this.each(function(t) {
                    s(this).wrapAll(e.call(this, t))
                });
            if (this[0]) {
                var t = s(e, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && t.insertBefore(this[0]),
                t.map(function() {
                    var e = this;
                    while (e.firstChild && e.firstChild.nodeType === 1)
                        e = e.firstChild;
                    return e
                }).append(this)
            }
            return this
        },
        wrapInner: function(e) {
            return s.isFunction(e) ? this.each(function(t) {
                s(this).wrapInner(e.call(this, t))
            }) : this.each(function() {
                var t = s(this)
                  , n = t.contents();
                n.length ? n.wrapAll(e) : t.append(e)
            })
        },
        wrap: function(e) {
            var t = s.isFunction(e);
            return this.each(function(n) {
                s(this).wrapAll(t ? e.call(this, n) : e)
            })
        },
        unwrap: function() {
            return this.parent().each(function() {
                s.nodeName(this, "body") || s(this).replaceWith(this.childNodes)
            }).end()
        },
        append: function() {
            return this.domManip(arguments, !0, function(e) {
                this.nodeType === 1 && this.appendChild(e)
            })
        },
        prepend: function() {
            return this.domManip(arguments, !0, function(e) {
                this.nodeType === 1 && this.insertBefore(e, this.firstChild)
            })
        },
        before: function() {
            if (this[0] && this[0].parentNode)
                return this.domManip(arguments, !1, function(e) {
                    this.parentNode.insertBefore(e, this)
                });
            if (arguments.length) {
                var e = s.clean(arguments);
                return e.push.apply(e, this.toArray()),
                this.pushStack(e, "before", arguments)
            }
        },
        after: function() {
            if (this[0] && this[0].parentNode)
                return this.domManip(arguments, !1, function(e) {
                    this.parentNode.insertBefore(e, this.nextSibling)
                });
            if (arguments.length) {
                var e = this.pushStack(this, "after", arguments);
                return e.push.apply(e, s.clean(arguments)),
                e
            }
        },
        remove: function(e, t) {
            for (var n = 0, r; (r = this[n]) != null; n++)
                if (!e || s.filter(e, [r]).length)
                    !t && r.nodeType === 1 && (s.cleanData(r.getElementsByTagName("*")),
                    s.cleanData([r])),
                    r.parentNode && r.parentNode.removeChild(r);
            return this
        },
        empty: function() {
            for (var e = 0, t; (t = this[e]) != null; e++) {
                t.nodeType === 1 && s.cleanData(t.getElementsByTagName("*"));
                while (t.firstChild)
                    t.removeChild(t.firstChild)
            }
            return this
        },
        clone: function(e, t) {
            return e = e == null ? !1 : e,
            t = t == null ? e : t,
            this.map(function() {
                return s.clone(this, e, t)
            })
        },
        html: function(e) {
            if (e === t)
                return this[0] && this[0].nodeType === 1 ? this[0].innerHTML.replace(J, "") : null;
            if (typeof e == "string" && !et.test(e) && (s.support.leadingWhitespace || !K.test(e)) && !ot[(G.exec(e) || ["", ""])[1].toLowerCase()]) {
                e = e.replace(Q, "<$1></$2>");
                try {
                    for (var n = 0, r = this.length; n < r; n++)
                        this[n].nodeType === 1 && (s.cleanData(this[n].getElementsByTagName("*")),
                        this[n].innerHTML = e)
                } catch (i) {
                    this.empty().append(e)
                }
            } else
                s.isFunction(e) ? this.each(function(t) {
                    var n = s(this);
                    n.html(e.call(this, t, n.html()))
                }) : this.empty().append(e);
            return this
        },
        replaceWith: function(e) {
            return this[0] && this[0].parentNode ? s.isFunction(e) ? this.each(function(t) {
                var n = s(this)
                  , r = n.html();
                n.replaceWith(e.call(this, t, r))
            }) : (typeof e != "string" && (e = s(e).detach()),
            this.each(function() {
                var t = this.nextSibling
                  , n = this.parentNode;
                s(this).remove(),
                t ? s(t).before(e) : s(n).append(e)
            })) : this.length ? this.pushStack(s(s.isFunction(e) ? e() : e), "replaceWith", e) : this
        },
        detach: function(e) {
            return this.remove(e, !0)
        },
        domManip: function(e, n, r) {
            var i, o, u, a, f = e[0], l = [];
            if (!s.support.checkClone && arguments.length === 3 && typeof f == "string" && rt.test(f))
                return this.each(function() {
                    s(this).domManip(e, n, r, !0)
                });
            if (s.isFunction(f))
                return this.each(function(i) {
                    var o = s(this);
                    e[0] = f.call(this, i, n ? o.html() : t),
                    o.domManip(e, n, r)
                });
            if (this[0]) {
                a = f && f.parentNode,
                s.support.parentNode && a && a.nodeType === 11 && a.childNodes.length === this.length ? i = {
                    fragment: a
                } : i = s.buildFragment(e, this, l),
                u = i.fragment,
                u.childNodes.length === 1 ? o = u = u.firstChild : o = u.firstChild;
                if (o) {
                    n = n && s.nodeName(o, "tr");
                    for (var c = 0, h = this.length, p = h - 1; c < h; c++)
                        r.call(n ? at(this[c], o) : this[c], i.cacheable || h > 1 && c < p ? s.clone(u, !0, !0) : u)
                }
                l.length && s.each(l, vt)
            }
            return this
        }
    }),
    s.buildFragment = function(e, t, r) {
        var i, o, u, a, f = e[0];
        return t && t[0] && (a = t[0].ownerDocument || t[0]),
        a.createDocumentFragment || (a = n),
        e.length === 1 && typeof f == "string" && f.length < 512 && a === n && f.charAt(0) === "<" && !tt.test(f) && (s.support.checkClone || !rt.test(f)) && (s.support.html5Clone || !nt.test(f)) && (o = !0,
        u = s.fragments[f],
        u && u !== 1 && (i = u)),
        i || (i = a.createDocumentFragment(),
        s.clean(e, a, i, r)),
        o && (s.fragments[f] = u ? i : 1),
        {
            fragment: i,
            cacheable: o
        }
    }
    ,
    s.fragments = {},
    s.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(e, t) {
        s.fn[e] = function(n) {
            var r = []
              , i = s(n)
              , o = this.length === 1 && this[0].parentNode;
            if (o && o.nodeType === 11 && o.childNodes.length === 1 && i.length === 1)
                return i[t](this[0]),
                this;
            for (var u = 0, a = i.length; u < a; u++) {
                var f = (u > 0 ? this.clone(!0) : this).get();
                s(i[u])[t](f),
                r = r.concat(f)
            }
            return this.pushStack(r, e, i.selector)
        }
    }),
    s.extend({
        clone: function(e, t, n) {
            var r, i, o, u = s.support.html5Clone || !nt.test("<" + e.nodeName) ? e.cloneNode(!0) : dt(e);
            if ((!s.support.noCloneEvent || !s.support.noCloneChecked) && (e.nodeType === 1 || e.nodeType === 11) && !s.isXMLDoc(e)) {
                lt(e, u),
                r = ct(e),
                i = ct(u);
                for (o = 0; r[o]; ++o)
                    i[o] && lt(r[o], i[o])
            }
            if (t) {
                ft(e, u);
                if (n) {
                    r = ct(e),
                    i = ct(u);
                    for (o = 0; r[o]; ++o)
                        ft(r[o], i[o])
                }
            }
            return r = i = null,
            u
        },
        clean: function(e, t, r, i) {
            var o;
            t = t || n,
            typeof t.createElement == "undefined" && (t = t.ownerDocument || t[0] && t[0].ownerDocument || n);
            var u = [], a;
            for (var f = 0, l; (l = e[f]) != null; f++) {
                typeof l == "number" && (l += "");
                if (!l)
                    continue;
                if (typeof l == "string")
                    if (!Z.test(l))
                        l = t.createTextNode(l);
                    else {
                        l = l.replace(Q, "<$1></$2>");
                        var c = (G.exec(l) || ["", ""])[1].toLowerCase()
                          , h = ot[c] || ot._default
                          , p = h[0]
                          , d = t.createElement("div");
                        t === n ? ut.appendChild(d) : V(t).appendChild(d),
                        d.innerHTML = h[1] + l + h[2];
                        while (p--)
                            d = d.lastChild;
                        if (!s.support.tbody) {
                            var v = Y.test(l)
                              , m = c === "table" && !v ? d.firstChild && d.firstChild.childNodes : h[1] === "<table>" && !v ? d.childNodes : [];
                            for (a = m.length - 1; a >= 0; --a)
                                s.nodeName(m[a], "tbody") && !m[a].childNodes.length && m[a].parentNode.removeChild(m[a])
                        }
                        !s.support.leadingWhitespace && K.test(l) && d.insertBefore(t.createTextNode(K.exec(l)[0]), d.firstChild),
                        l = d.childNodes
                    }
                var g;
                if (!s.support.appendChecked)
                    if (l[0] && typeof (g = l.length) == "number")
                        for (a = 0; a < g; a++)
                            pt(l[a]);
                    else
                        pt(l);
                l.nodeType ? u.push(l) : u = s.merge(u, l)
            }
            if (r) {
                o = function(e) {
                    return !e.type || it.test(e.type)
                }
                ;
                for (f = 0; u[f]; f++)
                    if (i && s.nodeName(u[f], "script") && (!u[f].type || u[f].type.toLowerCase() === "text/javascript"))
                        i.push(u[f].parentNode ? u[f].parentNode.removeChild(u[f]) : u[f]);
                    else {
                        if (u[f].nodeType === 1) {
                            var y = s.grep(u[f].getElementsByTagName("script"), o);
                            u.splice.apply(u, [f + 1, 0].concat(y))
                        }
                        r.appendChild(u[f])
                    }
            }
            return u
        },
        cleanData: function(e) {
            var t, n, r = s.cache, i = s.event.special, o = s.support.deleteExpando;
            for (var u = 0, a; (a = e[u]) != null; u++) {
                if (a.nodeName && s.noData[a.nodeName.toLowerCase()])
                    continue;
                n = a[s.expando];
                if (n) {
                    t = r[n];
                    if (t && t.events) {
                        for (var f in t.events)
                            i[f] ? s.event.remove(a, f) : s.removeEvent(a, f, t.handle);
                        t.handle && (t.handle.elem = null)
                    }
                    o ? delete a[s.expando] : a.removeAttribute && a.removeAttribute(s.expando),
                    delete r[n]
                }
            }
        }
    });
    var mt = /alpha\([^)]*\)/i, gt = /opacity=([^)]*)/, yt = /([A-Z]|^ms)/g, bt = /^-?\d+(?:px)?$/i, wt = /^-?\d/, Et = /^([\-+])=([\-+.\de]+)/, St = {
        position: "absolute",
        visibility: "hidden",
        display: "block"
    }, xt = ["Left", "Right"], Tt = ["Top", "Bottom"], Nt, Ct, kt;
    s.fn.css = function(e, n) {
        return arguments.length === 2 && n === t ? this : s.access(this, e, n, !0, function(e, n, r) {
            return r !== t ? s.style(e, n, r) : s.css(e, n)
        })
    }
    ,
    s.extend({
        cssHooks: {
            opacity: {
                get: function(e, t) {
                    if (t) {
                        var n = Nt(e, "opacity", "opacity");
                        return n === "" ? "1" : n
                    }
                    return e.style.opacity
                }
            }
        },
        cssNumber: {
            fillOpacity: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": s.support.cssFloat ? "cssFloat" : "styleFloat"
        },
        style: function(e, n, r, i) {
            if (!e || e.nodeType === 3 || e.nodeType === 8 || !e.style)
                return;
            var o, u, a = s.camelCase(n), f = e.style, l = s.cssHooks[a];
            n = s.cssProps[a] || a;
            if (r === t)
                return l && "get"in l && (o = l.get(e, !1, i)) !== t ? o : f[n];
            u = typeof r,
            u === "string" && (o = Et.exec(r)) && (r = +(o[1] + 1) * +o[2] + parseFloat(s.css(e, n)),
            u = "number");
            if (r == null || u === "number" && isNaN(r))
                return;
            u === "number" && !s.cssNumber[a] && (r += "px");
            if (!l || !("set"in l) || (r = l.set(e, r)) !== t)
                try {
                    f[n] = r
                } catch (c) {}
        },
        css: function(e, n, r) {
            var i, o;
            n = s.camelCase(n),
            o = s.cssHooks[n],
            n = s.cssProps[n] || n,
            n === "cssFloat" && (n = "float");
            if (o && "get"in o && (i = o.get(e, !0, r)) !== t)
                return i;
            if (Nt)
                return Nt(e, n)
        },
        swap: function(e, t, n) {
            var r = {};
            for (var i in t)
                r[i] = e.style[i],
                e.style[i] = t[i];
            n.call(e);
            for (i in t)
                e.style[i] = r[i]
        }
    }),
    s.curCSS = s.css,
    s.each(["height", "width"], function(e, t) {
        s.cssHooks[t] = {
            get: function(e, n, r) {
                var i;
                if (n)
                    return e.offsetWidth !== 0 ? Lt(e, t, r) : (s.swap(e, St, function() {
                        i = Lt(e, t, r)
                    }),
                    i)
            },
            set: function(e, t) {
                if (!bt.test(t))
                    return t;
                t = parseFloat(t);
                if (t >= 0)
                    return t + "px"
            }
        }
    }),
    s.support.opacity || (s.cssHooks.opacity = {
        get: function(e, t) {
            return gt.test((t && e.currentStyle ? e.currentStyle.filter : e.style.filter) || "") ? parseFloat(RegExp.$1) / 100 + "" : t ? "1" : ""
        },
        set: function(e, t) {
            var n = e.style
              , r = e.currentStyle
              , i = s.isNumeric(t) ? "alpha(opacity=" + t * 100 + ")" : ""
              , o = r && r.filter || n.filter || "";
            n.zoom = 1;
            if (t >= 1 && s.trim(o.replace(mt, "")) === "") {
                n.removeAttribute("filter");
                if (r && !r.filter)
                    return
            }
            n.filter = mt.test(o) ? o.replace(mt, i) : o + " " + i
        }
    }),
    s(function() {
        s.support.reliableMarginRight || (s.cssHooks.marginRight = {
            get: function(e, t) {
                var n;
                return s.swap(e, {
                    display: "inline-block"
                }, function() {
                    t ? n = Nt(e, "margin-right", "marginRight") : n = e.style.marginRight
                }),
                n
            }
        })
    }),
    n.defaultView && n.defaultView.getComputedStyle && (Ct = function(e, t) {
        var n, r, i;
        return t = t.replace(yt, "-$1").toLowerCase(),
        (r = e.ownerDocument.defaultView) && (i = r.getComputedStyle(e, null)) && (n = i.getPropertyValue(t),
        n === "" && !s.contains(e.ownerDocument.documentElement, e) && (n = s.style(e, t))),
        n
    }
    ),
    n.documentElement.currentStyle && (kt = function(e, t) {
        var n, r, i, s = e.currentStyle && e.currentStyle[t], o = e.style;
        return s === null && o && (i = o[t]) && (s = i),
        !bt.test(s) && wt.test(s) && (n = o.left,
        r = e.runtimeStyle && e.runtimeStyle.left,
        r && (e.runtimeStyle.left = e.currentStyle.left),
        o.left = t === "fontSize" ? "1em" : s || 0,
        s = o.pixelLeft + "px",
        o.left = n,
        r && (e.runtimeStyle.left = r)),
        s === "" ? "auto" : s
    }
    ),
    Nt = Ct || kt,
    s.expr && s.expr.filters && (s.expr.filters.hidden = function(e) {
        var t = e.offsetWidth
          , n = e.offsetHeight;
        return t === 0 && n === 0 || !s.support.reliableHiddenOffsets && (e.style && e.style.display || s.css(e, "display")) === "none"
    }
    ,
    s.expr.filters.visible = function(e) {
        return !s.expr.filters.hidden(e)
    }
    );
    var At = /%20/g, Ot = /\[\]$/, Mt = /\r?\n/g, _t = /#.*$/, Dt = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, Pt = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i, Ht = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/, Bt = /^(?:GET|HEAD)$/, jt = /^\/\//, Ft = /\?/, It = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, qt = /^(?:select|textarea)/i, Rt = /\s+/, Ut = /([?&])_=[^&]*/, zt = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/, Wt = s.fn.load, Xt = {}, Vt = {}, $t, Jt, Kt = ["*/"] + ["*"];
    try {
        $t = i.href
    } catch (Qt) {
        $t = n.createElement("a"),
        $t.href = "",
        $t = $t.href
    }
    Jt = zt.exec($t.toLowerCase()) || [],
    s.fn.extend({
        load: function(e, n, r) {
            if (typeof e != "string" && Wt)
                return Wt.apply(this, arguments);
            if (!this.length)
                return this;
            var i = e.indexOf(" ");
            if (i >= 0) {
                var o = e.slice(i, e.length);
                e = e.slice(0, i)
            }
            var u = "GET";
            n && (s.isFunction(n) ? (r = n,
            n = t) : typeof n == "object" && (n = s.param(n, s.ajaxSettings.traditional),
            u = "POST"));
            var a = this;
            return s.ajax({
                url: e,
                type: u,
                dataType: "html",
                data: n,
                complete: function(e, t, n) {
                    n = e.responseText,
                    e.isResolved() && (e.done(function(e) {
                        n = e
                    }),
                    a.html(o ? s("<div>").append(n.replace(It, "")).find(o) : n)),
                    r && a.each(r, [n, t, e])
                }
            }),
            this
        },
        serialize: function() {
            return s.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                return this.elements ? s.makeArray(this.elements) : this
            }).filter(function() {
                return this.name && !this.disabled && (this.checked || qt.test(this.nodeName) || Pt.test(this.type))
            }).map(function(e, t) {
                var n = s(this).val();
                return n == null ? null : s.isArray(n) ? s.map(n, function(e, n) {
                    return {
                        name: t.name,
                        value: e.replace(Mt, "\r\n")
                    }
                }) : {
                    name: t.name,
                    value: n.replace(Mt, "\r\n")
                }
            }).get()
        }
    }),
    s.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function(e, t) {
        s.fn[t] = function(e) {
            return this.on(t, e)
        }
    }),
    s.each(["get", "post"], function(e, n) {
        s[n] = function(e, r, i, o) {
            return s.isFunction(r) && (o = o || i,
            i = r,
            r = t),
            s.ajax({
                type: n,
                url: e,
                data: r,
                success: i,
                dataType: o
            })
        }
    }),
    s.extend({
        getScript: function(e, n) {
            return s.get(e, t, n, "script")
        },
        getJSON: function(e, t, n) {
            return s.get(e, t, n, "json")
        },
        ajaxSetup: function(e, t) {
            return t ? Zt(e, s.ajaxSettings) : (t = e,
            e = s.ajaxSettings),
            Zt(e, t),
            e
        },
        ajaxSettings: {
            url: $t,
            isLocal: Ht.test(Jt[1]),
            global: !0,
            type: "GET",
            contentType: "application/x-www-form-urlencoded",
            processData: !0,
            async: !0,
            accepts: {
                xml: "application/xml, text/xml",
                html: "text/html",
                text: "text/plain",
                json: "application/json, text/javascript",
                "*": Kt
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText"
            },
            converters: {
                "* text": e.String,
                "text html": !0,
                "text json": s.parseJSON,
                "text xml": s.parseXML
            },
            flatOptions: {
                context: !0,
                url: !0
            }
        },
        ajaxPrefilter: Gt(Xt),
        ajaxTransport: Gt(Vt),
        ajax: function(e, n) {
            function S(e, n, c, h) {
                if (y === 2)
                    return;
                y = 2,
                m && clearTimeout(m),
                v = t,
                p = h || "",
                E.readyState = e > 0 ? 4 : 0;
                var d, g, w, S = n, x = c ? tn(r, E, c) : t, T, N;
                if (e >= 200 && e < 300 || e === 304) {
                    if (r.ifModified) {
                        if (T = E.getResponseHeader("Last-Modified"))
                            s.lastModified[l] = T;
                        if (N = E.getResponseHeader("Etag"))
                            s.etag[l] = N
                    }
                    if (e === 304)
                        S = "notmodified",
                        d = !0;
                    else
                        try {
                            g = nn(r, x),
                            S = "success",
                            d = !0
                        } catch (C) {
                            S = "parsererror",
                            w = C
                        }
                } else {
                    w = S;
                    if (!S || e)
                        S = "error",
                        e < 0 && (e = 0)
                }
                E.status = e,
                E.statusText = "" + (n || S),
                d ? u.resolveWith(i, [g, S, E]) : u.rejectWith(i, [E, S, w]),
                E.statusCode(f),
                f = t,
                b && o.trigger("ajax" + (d ? "Success" : "Error"), [E, r, d ? g : w]),
                a.fireWith(i, [E, S]),
                b && (o.trigger("ajaxComplete", [E, r]),
                --s.active || s.event.trigger("ajaxStop"))
            }
            typeof e == "object" && (n = e,
            e = t),
            n = n || {};
            var r = s.ajaxSetup({}, n), i = r.context || r, o = i !== r && (i.nodeType || i instanceof s) ? s(i) : s.event, u = s.Deferred(), a = s.Callbacks("once memory"), f = r.statusCode || {}, l, c = {}, h = {}, p, d, v, m, g, y = 0, b, w, E = {
                readyState: 0,
                setRequestHeader: function(e, t) {
                    if (!y) {
                        var n = e.toLowerCase();
                        e = h[n] = h[n] || e,
                        c[e] = t
                    }
                    return this
                },
                getAllResponseHeaders: function() {
                    return y === 2 ? p : null
                },
                getResponseHeader: function(e) {
                    var n;
                    if (y === 2) {
                        if (!d) {
                            d = {};
                            while (n = Dt.exec(p))
                                d[n[1].toLowerCase()] = n[2]
                        }
                        n = d[e.toLowerCase()]
                    }
                    return n === t ? null : n
                },
                overrideMimeType: function(e) {
                    return y || (r.mimeType = e),
                    this
                },
                abort: function(e) {
                    return e = e || "abort",
                    v && v.abort(e),
                    S(0, e),
                    this
                }
            };
            u.promise(E),
            E.success = E.done,
            E.error = E.fail,
            E.complete = a.add,
            E.statusCode = function(e) {
                if (e) {
                    var t;
                    if (y < 2)
                        for (t in e)
                            f[t] = [f[t], e[t]];
                    else
                        t = e[E.status],
                        E.then(t, t)
                }
                return this
            }
            ,
            r.url = ((e || r.url) + "").replace(_t, "").replace(jt, Jt[1] + "//"),
            r.dataTypes = s.trim(r.dataType || "*").toLowerCase().split(Rt),
            r.crossDomain == null && (g = zt.exec(r.url.toLowerCase()),
            r.crossDomain = !(!g || g[1] == Jt[1] && g[2] == Jt[2] && (g[3] || (g[1] === "http:" ? 80 : 443)) == (Jt[3] || (Jt[1] === "http:" ? 80 : 443)))),
            r.data && r.processData && typeof r.data != "string" && (r.data = s.param(r.data, r.traditional)),
            Yt(Xt, r, n, E);
            if (y === 2)
                return !1;
            b = r.global,
            r.type = r.type.toUpperCase(),
            r.hasContent = !Bt.test(r.type),
            b && s.active++ === 0 && s.event.trigger("ajaxStart");
            if (!r.hasContent) {
                r.data && (r.url += (Ft.test(r.url) ? "&" : "?") + r.data,
                delete r.data),
                l = r.url;
                if (r.cache === !1) {
                    var x = s.now()
                      , T = r.url.replace(Ut, "$1_=" + x);
                    r.url = T + (T === r.url ? (Ft.test(r.url) ? "&" : "?") + "_=" + x : "")
                }
            }
            (r.data && r.hasContent && r.contentType !== !1 || n.contentType) && E.setRequestHeader("Content-Type", r.contentType),
            r.ifModified && (l = l || r.url,
            s.lastModified[l] && E.setRequestHeader("If-Modified-Since", s.lastModified[l]),
            s.etag[l] && E.setRequestHeader("If-None-Match", s.etag[l])),
            E.setRequestHeader("Accept", r.dataTypes[0] && r.accepts[r.dataTypes[0]] ? r.accepts[r.dataTypes[0]] + (r.dataTypes[0] !== "*" ? ", " + Kt + "; q=0.01" : "") : r.accepts["*"]);
            for (w in r.headers)
                E.setRequestHeader(w, r.headers[w]);
            if (!r.beforeSend || r.beforeSend.call(i, E, r) !== !1 && y !== 2) {
                for (w in {
                    success: 1,
                    error: 1,
                    complete: 1
                })
                    E[w](r[w]);
                v = Yt(Vt, r, n, E);
                if (!v)
                    S(-1, "No Transport");
                else {
                    E.readyState = 1,
                    b && o.trigger("ajaxSend", [E, r]),
                    r.async && r.timeout > 0 && (m = setTimeout(function() {
                        E.abort("timeout")
                    }, r.timeout));
                    try {
                        y = 1,
                        v.send(c, S)
                    } catch (N) {
                        if (!(y < 2))
                            throw N;
                        S(-1, N)
                    }
                }
                return E
            }
            return E.abort(),
            !1
        },
        param: function(e, n) {
            var r = []
              , i = function(e, t) {
                t = s.isFunction(t) ? t() : t,
                r[r.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
            };
            n === t && (n = s.ajaxSettings.traditional);
            if (s.isArray(e) || e.jquery && !s.isPlainObject(e))
                s.each(e, function() {
                    i(this.name, this.value)
                });
            else
                for (var o in e)
                    en(o, e[o], n, i);
            return r.join("&").replace(At, "+")
        }
    }),
    s.extend({
        active: 0,
        lastModified: {},
        etag: {}
    });
    var rn = s.now()
      , sn = /(\=)\?(&|$)|\?\?/i;
    s.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            return s.expando + "_" + rn++
        }
    }),
    s.ajaxPrefilter("json jsonp", function(t, n, r) {
        var i = t.contentType === "application/x-www-form-urlencoded" && typeof t.data == "string";
        if (t.dataTypes[0] === "jsonp" || t.jsonp !== !1 && (sn.test(t.url) || i && sn.test(t.data))) {
            var o, u = t.jsonpCallback = s.isFunction(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback, a = e[u], f = t.url, l = t.data, c = "$1" + u + "$2";
            return t.jsonp !== !1 && (f = f.replace(sn, c),
            t.url === f && (i && (l = l.replace(sn, c)),
            t.data === l && (f += (/\?/.test(f) ? "&" : "?") + t.jsonp + "=" + u))),
            t.url = f,
            t.data = l,
            e[u] = function(e) {
                o = [e]
            }
            ,
            r.always(function() {
                e[u] = a,
                o && s.isFunction(a) && e[u](o[0])
            }),
            t.converters["script json"] = function() {
                return o || s.error(u + " was not called"),
                o[0]
            }
            ,
            t.dataTypes[0] = "json",
            "script"
        }
    }),
    s.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /javascript|ecmascript/
        },
        converters: {
            "text script": function(e) {
                return s.globalEval(e),
                e
            }
        }
    }),
    s.ajaxPrefilter("script", function(e) {
        e.cache === t && (e.cache = !1),
        e.crossDomain && (e.type = "GET",
        e.global = !1)
    }),
    s.ajaxTransport("script", function(e) {
        if (e.crossDomain) {
            var r, i = n.head || n.getElementsByTagName("head")[0] || n.documentElement;
            return {
                send: function(s, o) {
                    r = n.createElement("script"),
                    r.async = "async",
                    e.scriptCharset && (r.charset = e.scriptCharset),
                    r.src = e.url,
                    r.onload = r.onreadystatechange = function(e, n) {
                        if (n || !r.readyState || /loaded|complete/.test(r.readyState))
                            r.onload = r.onreadystatechange = null,
                            i && r.parentNode && i.removeChild(r),
                            r = t,
                            n || o(200, "success")
                    }
                    ,
                    i.insertBefore(r, i.firstChild)
                },
                abort: function() {
                    r && r.onload(0, 1)
                }
            }
        }
    });
    var on = e.ActiveXObject ? function() {
        for (var e in an)
            an[e](0, 1)
    }
    : !1, un = 0, an;
    s.ajaxSettings.xhr = e.ActiveXObject ? function() {
        return !this.isLocal && fn() || ln()
    }
    : fn,
    function(e) {
        s.extend(s.support, {
            ajax: !!e,
            cors: !!e && "withCredentials"in e
        })
    }(s.ajaxSettings.xhr()),
    s.support.ajax && s.ajaxTransport(function(n) {
        if (!n.crossDomain || s.support.cors) {
            var r;
            return {
                send: function(i, o) {
                    var u = n.xhr(), a, f;
                    n.username ? u.open(n.type, n.url, n.async, n.username, n.password) : u.open(n.type, n.url, n.async);
                    if (n.xhrFields)
                        for (f in n.xhrFields)
                            u[f] = n.xhrFields[f];
                    n.mimeType && u.overrideMimeType && u.overrideMimeType(n.mimeType),
                    !n.crossDomain && !i["X-Requested-With"] && (i["X-Requested-With"] = "XMLHttpRequest");
                    try {
                        for (f in i)
                            u.setRequestHeader(f, i[f])
                    } catch (l) {}
                    u.send(n.hasContent && n.data || null),
                    r = function(e, i) {
                        var f, l, c, h, p;
                        try {
                            if (r && (i || u.readyState === 4)) {
                                r = t,
                                a && (u.onreadystatechange = s.noop,
                                on && delete an[a]);
                                if (i)
                                    u.readyState !== 4 && u.abort();
                                else {
                                    f = u.status,
                                    c = u.getAllResponseHeaders(),
                                    h = {},
                                    p = u.responseXML,
                                    p && p.documentElement && (h.xml = p),
                                    h.text = u.responseText;
                                    try {
                                        l = u.statusText
                                    } catch (d) {
                                        l = ""
                                    }
                                    !f && n.isLocal && !n.crossDomain ? f = h.text ? 200 : 404 : f === 1223 && (f = 204)
                                }
                            }
                        } catch (v) {
                            i || o(-1, v)
                        }
                        h && o(f, l, h, c)
                    }
                    ,
                    !n.async || u.readyState === 4 ? r() : (a = ++un,
                    on && (an || (an = {},
                    s(e).unload(on)),
                    an[a] = r),
                    u.onreadystatechange = r)
                },
                abort: function() {
                    r && r(0, 1)
                }
            }
        }
    });
    var cn = {}, hn, pn, dn = /^(?:toggle|show|hide)$/, vn = /^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i, mn, gn = [["height", "marginTop", "marginBottom", "paddingTop", "paddingBottom"], ["width", "marginLeft", "marginRight", "paddingLeft", "paddingRight"], ["opacity"]], yn;
    s.fn.extend({
        show: function(e, t, n) {
            var r, i;
            if (e || e === 0)
                return this.animate(En("show", 3), e, t, n);
            for (var o = 0, u = this.length; o < u; o++)
                r = this[o],
                r.style && (i = r.style.display,
                !s._data(r, "olddisplay") && i === "none" && (i = r.style.display = ""),
                i === "" && s.css(r, "display") === "none" && s._data(r, "olddisplay", Sn(r.nodeName)));
            for (o = 0; o < u; o++) {
                r = this[o];
                if (r.style) {
                    i = r.style.display;
                    if (i === "" || i === "none")
                        r.style.display = s._data(r, "olddisplay") || ""
                }
            }
            return this
        },
        hide: function(e, t, n) {
            if (e || e === 0)
                return this.animate(En("hide", 3), e, t, n);
            var r, i, o = 0, u = this.length;
            for (; o < u; o++)
                r = this[o],
                r.style && (i = s.css(r, "display"),
                i !== "none" && !s._data(r, "olddisplay") && s._data(r, "olddisplay", i));
            for (o = 0; o < u; o++)
                this[o].style && (this[o].style.display = "none");
            return this
        },
        _toggle: s.fn.toggle,
        toggle: function(e, t, n) {
            var r = typeof e == "boolean";
            return s.isFunction(e) && s.isFunction(t) ? this._toggle.apply(this, arguments) : e == null || r ? this.each(function() {
                var t = r ? e : s(this).is(":hidden");
                s(this)[t ? "show" : "hide"]()
            }) : this.animate(En("toggle", 3), e, t, n),
            this
        },
        fadeTo: function(e, t, n, r) {
            return this.filter(":hidden").css("opacity", 0).show().end().animate({
                opacity: t
            }, e, n, r)
        },
        animate: function(e, t, n, r) {
            function o() {
                i.queue === !1 && s._mark(this);
                var t = s.extend({}, i), n = this.nodeType === 1, r = n && s(this).is(":hidden"), o, u, a, f, l, c, h, p, d;
                t.animatedProperties = {};
                for (a in e) {
                    o = s.camelCase(a),
                    a !== o && (e[o] = e[a],
                    delete e[a]),
                    u = e[o],
                    s.isArray(u) ? (t.animatedProperties[o] = u[1],
                    u = e[o] = u[0]) : t.animatedProperties[o] = t.specialEasing && t.specialEasing[o] || t.easing || "swing";
                    if (u === "hide" && r || u === "show" && !r)
                        return t.complete.call(this);
                    n && (o === "height" || o === "width") && (t.overflow = [this.style.overflow, this.style.overflowX, this.style.overflowY],
                    s.css(this, "display") === "inline" && s.css(this, "float") === "none" && (!s.support.inlineBlockNeedsLayout || Sn(this.nodeName) === "inline" ? this.style.display = "inline-block" : this.style.zoom = 1))
                }
                t.overflow != null && (this.style.overflow = "hidden");
                for (a in e)
                    f = new s.fx(this,t,a),
                    u = e[a],
                    dn.test(u) ? (d = s._data(this, "toggle" + a) || (u === "toggle" ? r ? "show" : "hide" : 0),
                    d ? (s._data(this, "toggle" + a, d === "show" ? "hide" : "show"),
                    f[d]()) : f[u]()) : (l = vn.exec(u),
                    c = f.cur(),
                    l ? (h = parseFloat(l[2]),
                    p = l[3] || (s.cssNumber[a] ? "" : "px"),
                    p !== "px" && (s.style(this, a, (h || 1) + p),
                    c = (h || 1) / f.cur() * c,
                    s.style(this, a, c + p)),
                    l[1] && (h = (l[1] === "-=" ? -1 : 1) * h + c),
                    f.custom(c, h, p)) : f.custom(c, u, ""));
                return !0
            }
            var i = s.speed(t, n, r);
            return s.isEmptyObject(e) ? this.each(i.complete, [!1]) : (e = s.extend({}, e),
            i.queue === !1 ? this.each(o) : this.queue(i.queue, o))
        },
        stop: function(e, n, r) {
            return typeof e != "string" && (r = n,
            n = e,
            e = t),
            n && e !== !1 && this.queue(e || "fx", []),
            this.each(function() {
                function u(e, t, n) {
                    var i = t[n];
                    s.removeData(e, n, !0),
                    i.stop(r)
                }
                var t, n = !1, i = s.timers, o = s._data(this);
                r || s._unmark(!0, this);
                if (e == null)
                    for (t in o)
                        o[t] && o[t].stop && t.indexOf(".run") === t.length - 4 && u(this, o, t);
                else
                    o[t = e + ".run"] && o[t].stop && u(this, o, t);
                for (t = i.length; t--; )
                    i[t].elem === this && (e == null || i[t].queue === e) && (r ? i[t](!0) : i[t].saveState(),
                    n = !0,
                    i.splice(t, 1));
                (!r || !n) && s.dequeue(this, e)
            })
        }
    }),
    s.each({
        slideDown: En("show", 1),
        slideUp: En("hide", 1),
        slideToggle: En("toggle", 1),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(e, t) {
        s.fn[e] = function(e, n, r) {
            return this.animate(t, e, n, r)
        }
    }),
    s.extend({
        speed: function(e, t, n) {
            var r = e && typeof e == "object" ? s.extend({}, e) : {
                complete: n || !n && t || s.isFunction(e) && e,
                duration: e,
                easing: n && t || t && !s.isFunction(t) && t
            };
            r.duration = s.fx.off ? 0 : typeof r.duration == "number" ? r.duration : r.duration in s.fx.speeds ? s.fx.speeds[r.duration] : s.fx.speeds._default;
            if (r.queue == null || r.queue === !0)
                r.queue = "fx";
            return r.old = r.complete,
            r.complete = function(e) {
                s.isFunction(r.old) && r.old.call(this),
                r.queue ? s.dequeue(this, r.queue) : e !== !1 && s._unmark(this)
            }
            ,
            r
        },
        easing: {
            linear: function(e, t, n, r) {
                return n + r * e
            },
            swing: function(e, t, n, r) {
                return (-Math.cos(e * Math.PI) / 2 + .5) * r + n
            }
        },
        timers: [],
        fx: function(e, t, n) {
            this.options = t,
            this.elem = e,
            this.prop = n,
            t.orig = t.orig || {}
        }
    }),
    s.fx.prototype = {
        update: function() {
            this.options.step && this.options.step.call(this.elem, this.now, this),
            (s.fx.step[this.prop] || s.fx.step._default)(this)
        },
        cur: function() {
            if (this.elem[this.prop] == null || !!this.elem.style && this.elem.style[this.prop] != null) {
                var e, t = s.css(this.elem, this.prop);
                return isNaN(e = parseFloat(t)) ? !t || t === "auto" ? 0 : t : e
            }
            return this.elem[this.prop]
        },
        custom: function(e, n, r) {
            function u(e) {
                return i.step(e)
            }
            var i = this
              , o = s.fx;
            this.startTime = yn || bn(),
            this.end = n,
            this.now = this.start = e,
            this.pos = this.state = 0,
            this.unit = r || this.unit || (s.cssNumber[this.prop] ? "" : "px"),
            u.queue = this.options.queue,
            u.elem = this.elem,
            u.saveState = function() {
                i.options.hide && s._data(i.elem, "fxshow" + i.prop) === t && s._data(i.elem, "fxshow" + i.prop, i.start)
            }
            ,
            u() && s.timers.push(u) && !mn && (mn = setInterval(o.tick, o.interval))
        },
        show: function() {
            var e = s._data(this.elem, "fxshow" + this.prop);
            this.options.orig[this.prop] = e || s.style(this.elem, this.prop),
            this.options.show = !0,
            e !== t ? this.custom(this.cur(), e) : this.custom(this.prop === "width" || this.prop === "height" ? 1 : 0, this.cur()),
            s(this.elem).show()
        },
        hide: function() {
            this.options.orig[this.prop] = s._data(this.elem, "fxshow" + this.prop) || s.style(this.elem, this.prop),
            this.options.hide = !0,
            this.custom(this.cur(), 0)
        },
        step: function(e) {
            var t, n, r, i = yn || bn(), o = !0, u = this.elem, a = this.options;
            if (e || i >= a.duration + this.startTime) {
                this.now = this.end,
                this.pos = this.state = 1,
                this.update(),
                a.animatedProperties[this.prop] = !0;
                for (t in a.animatedProperties)
                    a.animatedProperties[t] !== !0 && (o = !1);
                if (o) {
                    a.overflow != null && !s.support.shrinkWrapBlocks && s.each(["", "X", "Y"], function(e, t) {
                        u.style["overflow" + t] = a.overflow[e]
                    }),
                    a.hide && s(u).hide();
                    if (a.hide || a.show)
                        for (t in a.animatedProperties)
                            s.style(u, t, a.orig[t]),
                            s.removeData(u, "fxshow" + t, !0),
                            s.removeData(u, "toggle" + t, !0);
                    r = a.complete,
                    r && (a.complete = !1,
                    r.call(u))
                }
                return !1
            }
            return a.duration == Infinity ? this.now = i : (n = i - this.startTime,
            this.state = n / a.duration,
            this.pos = s.easing[a.animatedProperties[this.prop]](this.state, n, 0, 1, a.duration),
            this.now = this.start + (this.end - this.start) * this.pos),
            this.update(),
            !0
        }
    },
    s.extend(s.fx, {
        tick: function() {
            var e, t = s.timers, n = 0;
            for (; n < t.length; n++)
                e = t[n],
                !e() && t[n] === e && t.splice(n--, 1);
            t.length || s.fx.stop()
        },
        interval: 13,
        stop: function() {
            clearInterval(mn),
            mn = null
        },
        speeds: {
            slow: 600,
            fast: 200,
            _default: 400
        },
        step: {
            opacity: function(e) {
                s.style(e.elem, "opacity", e.now)
            },
            _default: function(e) {
                e.elem.style && e.elem.style[e.prop] != null ? e.elem.style[e.prop] = e.now + e.unit : e.elem[e.prop] = e.now
            }
        }
    }),
    s.each(["width", "height"], function(e, t) {
        s.fx.step[t] = function(e) {
            s.style(e.elem, t, Math.max(0, e.now) + e.unit)
        }
    }),
    s.expr && s.expr.filters && (s.expr.filters.animated = function(e) {
        return s.grep(s.timers, function(t) {
            return e === t.elem
        }).length
    }
    );
    var xn = /^t(?:able|d|h)$/i
      , Tn = /^(?:body|html)$/i;
    "getBoundingClientRect"in n.documentElement ? s.fn.offset = function(e) {
        var t = this[0], n;
        if (e)
            return this.each(function(t) {
                s.offset.setOffset(this, e, t)
            });
        if (!t || !t.ownerDocument)
            return null;
        if (t === t.ownerDocument.body)
            return s.offset.bodyOffset(t);
        try {
            n = t.getBoundingClientRect()
        } catch (r) {}
        var i = t.ownerDocument
          , o = i.documentElement;
        if (!n || !s.contains(o, t))
            return n ? {
                top: n.top,
                left: n.left
            } : {
                top: 0,
                left: 0
            };
        var u = i.body
          , a = Nn(i)
          , f = o.clientTop || u.clientTop || 0
          , l = o.clientLeft || u.clientLeft || 0
          , c = a.pageYOffset || s.support.boxModel && o.scrollTop || u.scrollTop
          , h = a.pageXOffset || s.support.boxModel && o.scrollLeft || u.scrollLeft
          , p = n.top + c - f
          , d = n.left + h - l;
        return {
            top: p,
            left: d
        }
    }
    : s.fn.offset = function(e) {
        var t = this[0];
        if (e)
            return this.each(function(t) {
                s.offset.setOffset(this, e, t)
            });
        if (!t || !t.ownerDocument)
            return null;
        if (t === t.ownerDocument.body)
            return s.offset.bodyOffset(t);
        var n, r = t.offsetParent, i = t, o = t.ownerDocument, u = o.documentElement, a = o.body, f = o.defaultView, l = f ? f.getComputedStyle(t, null) : t.currentStyle, c = t.offsetTop, h = t.offsetLeft;
        while ((t = t.parentNode) && t !== a && t !== u) {
            if (s.support.fixedPosition && l.position === "fixed")
                break;
            n = f ? f.getComputedStyle(t, null) : t.currentStyle,
            c -= t.scrollTop,
            h -= t.scrollLeft,
            t === r && (c += t.offsetTop,
            h += t.offsetLeft,
            s.support.doesNotAddBorder && (!s.support.doesAddBorderForTableAndCells || !xn.test(t.nodeName)) && (c += parseFloat(n.borderTopWidth) || 0,
            h += parseFloat(n.borderLeftWidth) || 0),
            i = r,
            r = t.offsetParent),
            s.support.subtractsBorderForOverflowNotVisible && n.overflow !== "visible" && (c += parseFloat(n.borderTopWidth) || 0,
            h += parseFloat(n.borderLeftWidth) || 0),
            l = n
        }
        if (l.position === "relative" || l.position === "static")
            c += a.offsetTop,
            h += a.offsetLeft;
        return s.support.fixedPosition && l.position === "fixed" && (c += Math.max(u.scrollTop, a.scrollTop),
        h += Math.max(u.scrollLeft, a.scrollLeft)),
        {
            top: c,
            left: h
        }
    }
    ,
    s.offset = {
        bodyOffset: function(e) {
            var t = e.offsetTop
              , n = e.offsetLeft;
            return s.support.doesNotIncludeMarginInBodyOffset && (t += parseFloat(s.css(e, "marginTop")) || 0,
            n += parseFloat(s.css(e, "marginLeft")) || 0),
            {
                top: t,
                left: n
            }
        },
        setOffset: function(e, t, n) {
            var r = s.css(e, "position");
            r === "static" && (e.style.position = "relative");
            var i = s(e), o = i.offset(), u = s.css(e, "top"), a = s.css(e, "left"), f = (r === "absolute" || r === "fixed") && s.inArray("auto", [u, a]) > -1, l = {}, c = {}, h, p;
            f ? (c = i.position(),
            h = c.top,
            p = c.left) : (h = parseFloat(u) || 0,
            p = parseFloat(a) || 0),
            s.isFunction(t) && (t = t.call(e, n, o)),
            t.top != null && (l.top = t.top - o.top + h),
            t.left != null && (l.left = t.left - o.left + p),
            "using"in t ? t.using.call(e, l) : i.css(l)
        }
    },
    s.fn.extend({
        position: function() {
            if (!this[0])
                return null;
            var e = this[0]
              , t = this.offsetParent()
              , n = this.offset()
              , r = Tn.test(t[0].nodeName) ? {
                top: 0,
                left: 0
            } : t.offset();
            return n.top -= parseFloat(s.css(e, "marginTop")) || 0,
            n.left -= parseFloat(s.css(e, "marginLeft")) || 0,
            r.top += parseFloat(s.css(t[0], "borderTopWidth")) || 0,
            r.left += parseFloat(s.css(t[0], "borderLeftWidth")) || 0,
            {
                top: n.top - r.top,
                left: n.left - r.left
            }
        },
        offsetParent: function() {
            return this.map(function() {
                var e = this.offsetParent || n.body;
                while (e && !Tn.test(e.nodeName) && s.css(e, "position") === "static")
                    e = e.offsetParent;
                return e
            })
        }
    }),
    s.each(["Left", "Top"], function(e, n) {
        var r = "scroll" + n;
        s.fn[r] = function(n) {
            var i, o;
            return n === t ? (i = this[0],
            i ? (o = Nn(i),
            o ? "pageXOffset"in o ? o[e ? "pageYOffset" : "pageXOffset"] : s.support.boxModel && o.document.documentElement[r] || o.document.body[r] : i[r]) : null) : this.each(function() {
                o = Nn(this),
                o ? o.scrollTo(e ? s(o).scrollLeft() : n, e ? n : s(o).scrollTop()) : this[r] = n
            })
        }
    }),
    s.each(["Height", "Width"], function(e, n) {
        var r = n.toLowerCase();
        s.fn["inner" + n] = function() {
            var e = this[0];
            return e ? e.style ? parseFloat(s.css(e, r, "padding")) : this[r]() : null
        }
        ,
        s.fn["outer" + n] = function(e) {
            var t = this[0];
            return t ? t.style ? parseFloat(s.css(t, r, e ? "margin" : "border")) : this[r]() : null
        }
        ,
        s.fn[r] = function(e) {
            var i = this[0];
            if (!i)
                return e == null ? null : this;
            if (s.isFunction(e))
                return this.each(function(t) {
                    var n = s(this);
                    n[r](e.call(this, t, n[r]()))
                });
            if (s.isWindow(i)) {
                var o = i.document.documentElement["client" + n]
                  , u = i.document.body;
                return i.document.compatMode === "CSS1Compat" && o || u && u["client" + n] || o
            }
            if (i.nodeType === 9)
                return Math.max(i.documentElement["client" + n], i.body["scroll" + n], i.documentElement["scroll" + n], i.body["offset" + n], i.documentElement["offset" + n]);
            if (e === t) {
                var a = s.css(i, r)
                  , f = parseFloat(a);
                return s.isNumeric(f) ? f : a
            }
            return this.css(r, typeof e == "string" ? e : e + "px")
        }
    }),
    e.jQuery = e.$ = s,
    typeof define == "function" && define.amd && define.amd.jQuery && define("jquery", [], function() {
        return s
    })
})(window),
function(e) {
    function r(e) {
        return '"' + e.replace(t, function(e) {
            var t = n[e];
            return typeof t == "string" ? t : "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
        }) + '"'
    }
    function i(e) {
        return e < 10 ? "0" + e : e
    }
    function s(e, t) {
        var n, o, u, a, l = t[e], c = typeof l;
        l && typeof l == "object" && typeof l.toJSON == "function" && (l = l.toJSON(e),
        c = typeof l);
        switch (c) {
        case "string":
            return r(l);
        case "number":
            return isFinite(l) ? String(l) : "null";
        case "boolean":
            return String(l);
        case "object":
            if (!l)
                return "null";
            switch (Object.prototype.toString.call(l)) {
            case "[object Date]":
                return isFinite(l.valueOf()) ? '"' + l.getUTCFullYear() + "-" + i(l.getUTCMonth() + 1) + "-" + i(l.getUTCDate()) + "T" + i(l.getUTCHours()) + ":" + i(l.getUTCMinutes()) + ":" + i(l.getUTCSeconds()) + "Z" + '"' : "null";
            case "[object Array]":
                u = l.length,
                a = [];
                for (n = 0; n < u; n++)
                    a.push(s(n, l) || "null");
                return "[" + a.join(",") + "]";
            default:
                a = [];
                for (n in l)
                    Object.prototype.hasOwnProperty.call(l, n) && (o = s(n, l),
                    o && a.push(r(n) + ":" + o));
                return "{" + a.join(",") + "}"
            }
        }
    }
    var t = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g
      , n = {
        "\b": "\\b",
        "	": "\\t",
        "\n": "\\n",
        "\f": "\\f",
        "\r": "\\r",
        '"': '\\"',
        "\\": "\\\\"
    };
    e.stringifyJSON = function(e) {
        return window.JSON && window.JSON.stringify ? window.JSON.stringify(e) : s("", {
            "": e
        })
    }
}(jQuery),
function() {
    var e = this;
    if (!e.localStorage) {
        if (e.globalStorage) {
            try {
                e.localStorage = e.globalStorage
            } catch (t) {}
            return
        }
        var n = document.createElement("div")
          , r = "localStorage";
        n.style.display = "none",
        document.getElementsByTagName("head")[0].appendChild(n);
        if (n.addBehavior) {
            n.addBehavior("#default#userdata");
            var i = e.localStorage = {
                length: 0,
                setItem: function(e, t) {
                    n.load(r),
                    e = s(e),
                    n.getAttribute(e) || this.length++,
                    n.setAttribute(e, t),
                    n.save(r)
                },
                getItem: function(e) {
                    return n.load(r),
                    e = s(e),
                    n.getAttribute(e)
                },
                removeItem: function(e) {
                    n.load(r),
                    e = s(e),
                    n.removeAttribute(e),
                    n.save(r),
                    this.length--,
                    this.length < 0 && (this.length = 0)
                },
                clear: function() {
                    n.load(r);
                    var e = 0;
                    while (attr = n.XMLDocument.documentElement.attributes[e++])
                        n.removeAttribute(attr.name);
                    n.save(r),
                    this.length = 0
                },
                key: function(e) {
                    return n.load(r),
                    n.XMLDocument.documentElement.attributes[e]
                }
            }
              , s = function(e) {
                return e.replace(/[^-._0-9A-Za-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u37f-\u1fff\u200c-\u200d\u203f\u2040\u2070-\u218f]/g, "-")
            };
            n.load(r),
            i.length = n.XMLDocument.documentElement.attributes.length
        }
    }
}(),
Array.prototype.indexOf || (Array.prototype.indexOf = function(e) {
    "use strict";
    if (this == null)
        throw new TypeError;
    var t = Object(this)
      , n = t.length >>> 0;
    if (n === 0)
        return -1;
    var r = 0;
    arguments.length > 0 && (r = Number(arguments[1]),
    r != r ? r = 0 : r != 0 && r != Infinity && r != -Infinity && (r = (r > 0 || -1) * Math.floor(Math.abs(r))));
    if (r >= n)
        return -1;
    var i = r >= 0 ? r : Math.max(n - Math.abs(r), 0);
    for (; i < n; i++)
        if (i in t && t[i] === e)
            return i;
    return -1
}
);

        
getFirstBrowserLanguage = function () {
    var nav = window.navigator,
    browserLanguagePropertyKeys = ['language', 'browserLanguage', 'systemLanguage', 'userLanguage'],
    i,
    language;

    // support for HTML 5.1 "navigator.languages"
    if (Array.isArray(nav.languages)) {
      for (i = 0; i < nav.languages.length; i++) {
        language = nav.languages[i];
        if (language && language.length) {
          return language;
        }
      }
    }

    // support for other well known properties in browsers
    for (i = 0; i < browserLanguagePropertyKeys.length; i++) {
      language = nav[browserLanguagePropertyKeys[i]];
      if (language && language.length) {
        return language;
      }
    }

    return null;
  };
/**
 * @file jquery.tr.js
 * @brief Support for internationalization.
 * @author Jonathan Giroux (Bloutiouf)
 * @site https://github.com/Bloutiouf/jquery.tr
 * @version 1.1
 * @license MIT license <http://www.opensource.org/licenses/MIT>
 * 
 * jquery.tr is a jQuery plugin which enables you to translate text on the
 * client side.
 * 
 * Features:
 * - uses a predefined dictionary.
 * - translates into languages with several plurals.
 * - replaces parameters in translations.
 * - uses cookie information if jQuery.cookie is available.
 * - designed to be used by CouchApps.
 */

(function($) {

	// configuration, feel free to edit the following lines

	/**
	 * Language at the start of the application.
	 * If you use the jQuery's Cookie plugin, then the language will be stored
	 * in a cookie.
	 */
	var language = 'en';

	/**
	 * Name of cookie storing language. Change it if it conflicts.
	 * If you don't use the jQuery's Cookie plugin, it doesn't matter.
	 */
	var cookieName = 'language';

	// end of configuration

	/**
	 * Intern dictionary.
	 */
	var dictionary;

	/**
	 * Standard replace function.
	 */
	var replace = function(str, opt) {
		var args = (typeof opt === 'object' && opt != null) ? opt : arguments;
		return str.replace(/&(\w+)/g, function(match, n) {
			var value = args[n];
			if (value === undefined) {
				return match;
			}
			return value;
		});
	};

	/**
	 * Default translator in case of error or unavailability...
	 */
	var lambda = function(key, opt) {
		var args = (typeof opt === 'object' && opt != null) ? opt : arguments;
		return replace(key, args);
	};

	// load language from cookie
	if ($.cookie) {
		language = $.cookie(cookieName) || language;
	}

    // Store missing keys for translation purpose
    var missing_keys = [];

	$.tr = {
      
        missing_keys: missing_keys,
      
		/**
		 * @name $.tr.dictionary
		 * @brief Get the current dictionary.
		 * @returns object dictionary.
		 * 
		 * Example: Gets the current dictionary.
		 * @code
		 * var dict = $.tr.dictionary();
		 * @endcode
		 */
		/**
		 * @name $.tr.dictionary
		 * @brief Set the current dictionary.
		 * @param object newDictionary new dictionary.
		 * 
		 * Example: Sets the current dictionary.
		 * @code
		 * $.tr.dictionary(dict);
		 * @endcode
		 */
		dictionary : function(newDictionary) {
			if (newDictionary !== undefined) {
				dictionary = newDictionary;
			}
			return dictionary;
		},

		/**
		 * @name $.tr.language
		 * @brief Get the current language.
		 * @returns string language.
		 * 
		 * Example: Gets the current language.
		 * @code
		 * var lg = $.tr.language();
		 * @endcode
		 */
		/**
		 * @name $.tr.language
		 * @brief Set the current language.
		 * @param string newLanguage new language.
		 * @param bool useCookie optional if true and cookie plugin is
		 * available, do nothing (allows to use a default language)
		 * @returns string language.
		 * 
		 * Example: Sets the current language.
		 * @code
		 * $.tr.language('fr');
		 * @endcode
		 */
		language : function(newLanguage, useCookie) {
			if (newLanguage !== undefined) {
				if (useCookie && $.cookie) {
					var cookieLanguage = $.cookie(cookieName);
					if (cookieLanguage) {
						return cookieLanguage;	
					}
				}
				language = newLanguage;
				if ($.cookie) {
					$.cookie(cookieName, language);
				}
			}
			return language;
		},

		/**
		 * @name $.tr.translator
		 * @brief Get a translator function.
		 * @param object customDictionary optional associative array replacing the
		 * library dictionary.
		 * @param mixed ... list of keys to traverse the dictionary.
		 * @returns function
		 */
		translator : function(customDictionary) {
			
			// varargs
			var args = $.makeArray(arguments);
			
			// which dictionary to use
			var dict = dictionary;
			if (typeof customDictionary == 'object') {
				args.shift();
				dict = customDictionary;
			}

			// if the chosen dictionary is not available...
			if (!dict) {
				return lambda;
			}
			
			// parse through the hierarchy
			var langSet = dict;
			for (var i in args) {
				langSet = langSet[args[i]];
				if (!langSet) {
					return lambda;
				}
			}

			// dictionary for the chosen language
			var lang = langSet[language];

			// if lang is an associative map encoded as a string, parse the map
			if (typeof lang == 'function') {
				lang = lang();
			}

			// if the chosen language is not available...
			if (!lang) {
				return lambda;
			}

			// time to get the real translator
			return function(key, opt) {
				var value = lang[key];
                if ( ! value && -1 === missing_keys.indexOf(key)){
                  missing_keys.push(key)
                }
				var args = (typeof opt === 'object' && opt != null) ? opt : arguments;
				if (typeof value === 'string') {
					return replace(value, args);
				} else if (typeof value === 'function') {
					return value(args, replace);
				} else if (typeof value === 'number') {
					return value;
				} else {
					return replace(key, args);
				}
			};
		}

	};

})(jQuery);

// Translation logic
var available_languages = ["fr"]
var browser_language = getFirstBrowserLanguage();
var tr = $.tr.translator();
document.tr = tr
// Only available translations are loaded
if( -1 !== available_languages.indexOf(browser_language)){
  $.tr.language(browser_language, true);  
  $.ajax(
    {
      dataType: "json",
      url: '/translations/dictionary.'+browser_language+".json",
      async: false,
      success: function(data) {
        $.tr.dictionary(data);
        tr = $.tr.translator();
      },
      error: function(a,b){
        console.log("Failed to load dictionary",a,b)
      }
    }
  );

}

var hasStorage = function() {
    try {
        return localStorage.setItem("inklewriter_storage_feature_detect", "feature_test"),
        localStorage.removeItem("inklewriter_storage_feature_detect"),
        !0
    } catch (e) {
        return !1
    }
}()
  , ensureVisibilityOfPopup = function(e, t) {
    var n = t.scrollTop()
      , r = e.offset().top - t.offset().top
      , i = n + r + e.height()
      , s = t.height() + n;
    i > s && t.scrollTop(i - s + n + 20),
    r < 0 && t.scrollTop(n + r)
};
Array.prototype.contains = function(e) {
    var t = this.indexOf(e);
    return t >= 0 ? !0 : !1
}
,
Array.prototype.first = function() {
    return this.length > 0 ? this[0] : null
}
,
Array.prototype.last = function() {
    return this.length > 0 ? this[this.length - 1] : null
}
,
Array.prototype.prev = function(e) {
    var t = this.indexOf(e);
    return t > 0 ? this[t - 1] : null
}
,
Array.prototype.next = function(e) {
    var t = this.indexOf(e);
    return t < this.length - 1 && t >= 0 ? this[t + 1] : null
}
,
Array.prototype.add = function(e) {
    this.contains(e) || this.push(e)
}
,
Array.prototype.remove = function(e) {
    var t = this.indexOf(e);
    t >= 0 && this.splice(t, 1)
}
,
Array.prototype.each = function(e) {
    var t = this.slice(0);
    for (var n = 0; n < t.length; ++n)
        e.call(t[n])
}
,
Array.prototype.clean = function(e) {
    for (var t = 0; t < this.length; t++)
        this[t] == e && (this.splice(t, 1),
        t--);
    return this
}
,
String.prototype.camelCase = function() {
    return this.replace(/[^A-Za-z\s]/g, "").replace(/(?:^\w|[A-Z]|\b\w)/g, function(e, t) {
        return t == 0 ? e.toLowerCase() : e.toUpperCase()
    }).replace(/\s+/g, "")
}
;
var Bind = function(e) {
    var t = {}
      , n = function(e, n) {
        n ? t[e] = n : t[e] && delete t[e]
    };
    return n.handle = function(n) {
        t[n] && t[n].call(e)
    }
    ,
    n
}
  , getContentFromCursor = function(e) {
    var t = {}
      , n = rangy.getSelection()
      , r = n.getRangeAt(0)
      , i = r.cloneRange()
      , s = r.endOffset
      , o = r.endContainer
      , u = r.startOffset
      , a = r.startContainer;
    return r.selectNodeContents(e.jqStitchBoxText[0]),
    i.selectNodeContents(e.jqStitchBoxText[0]),
    i.setStart(o, s),
    r.setEnd(a, u),
    t.left = r.toHtml().replace("<br>", ""),
    t.right = i.toHtml().replace("<br>", ""),
    t
}
  , doesSelectionStartAtEdgeOfJqItem = function(e, t, n) {
    var r = rangy.createRange();
    r.selectNodeContents(e[0]),
    n ? r.setStart(t.startContainer, t.startOffset) : r.setEnd(t.endContainer, t.endOffset);
    var i = r.toString() == e.text();
    return i
}
  , StoryModel = function() {};
StoryModel.loading = !1,
StoryModel.watchRefCounts = !1,
StoryModel._defaultStoryName = tr("Untitled Story"),
StoryModel._defaultAuthorName = tr("Anonymous"),
StoryModel._storyName = StoryModel._defaultStoryName,
StoryModel._authorName = StoryModel._defaultAuthorName,
StoryModel.stitches = [],
StoryModel.flagIndex = [],
StoryModel.initialStitch = null,
StoryModel.maxPage = 0,
StoryModel.maxPreferredPageLength = 8,
StoryModel.optionMirroring = !0,
StoryModel.allowCheckpoints = !1,
StoryModel.endCount = 0,
StoryModel.looseEndCount = 0,
StoryModel.storyName = function() {
    return StoryModel._storyName
}
,
StoryModel.authorName = function() {
    return StoryModel._authorName
}
,
StoryModel.setStoryName = function(e) {
    StoryModel._storyName = e
}
,
StoryModel.setAuthorName = function(e) {
    StoryModel._authorName = e
}
,
StoryModel.clear = function() {
    StoryModel.stitches = [],
    StoryModel.flagIndex = [],
    StoryModel.setStoryName(StoryModel._defaultStoryName),
    StoryModel.setAuthorName(StoryModel._defaultAuthorName)
}
,
StoryModel.updateGraphModel = function() {
    StoryModel.loading || (StoryModel.rebuildBacklinks(),
    StoryModel.computePageNumbers(),
    StoryModel.stitches.sort(function(e, t) {
        return e.pageNumber() - t.pageNumber() == 0 ? e.verticalDistanceFromHeader() - t.verticalDistanceFromHeader() : e.pageNumber() - t.pageNumber()
    }))
}
,
StoryModel.rebuildBacklinks = function() {
    StoryModel.endCount = 0;
    for (var e = 0; e < StoryModel.stitches.length; e++)
        StoryModel.stitches[e]._backlinks = [];
    for (var e = 0; e < StoryModel.stitches.length; e++)
        if (StoryModel.stitches[e].options.length > 0)
            for (var t = 0; t < StoryModel.stitches[e].options.length; t++)
                StoryModel.stitches[e].options[t]._linkStitch ? StoryModel.stitches[e].options[t]._linkStitch._backlinks.push(StoryModel.stitches[e]) : StoryModel.looseEndCount++;
        else
            StoryModel.stitches[e].divertStitch ? StoryModel.stitches[e].divertStitch._backlinks.push(StoryModel.stitches[e]) : StoryModel.endCount++;
    if (StoryModel.watchRefCounts)
        for (var e = 0; e < StoryModel.stitches.length; e++)
            StoryModel.stitches[e]._backlinks.length !== StoryModel.stitches[e].refCount && alert("Stitch with text '" + StoryModel.stitches[e].text() + "' has invalid ref-count!")
}
,
StoryModel.repointStitchToStitch = function(e, t) {
    if (e) {
        StoryModel.watchRefCounts && (console.log("Repointing stitch links from " + e.name()),
        t ? console.log(" to " + t.name()) : console.log("to null."));
        for (var n = 0; n < StoryModel.stitches.length; n++) {
            var r = StoryModel.stitches[n];
            r.divertStitch == e && (r.undivert(!0),
            t && r.divert(t, !0));
            for (var i = 0; i < r.options.length; i++)
                r.options[i]._linkStitch == e && (r.options[i].unlink(!0),
                t && r.options[i].linkStitch(t, !0))
        }
    } else
        alert("Attempting to repoint a null stitch...");
    StoryModel.updateGraphModel()
}
,
StoryModel.headerWithinDistanceOfStitch = function(e, t) {
    var n = []
      , r = [];
    n.push(t);
    for (var i = 0; i <= e; i++) {
        for (var s = 0; s < n.length; s++) {
            var o = n[s];
            if (o) {
                if (o.pageNumberLabel() > 0)
                    return !0;
                r.push(o.divertStitch);
                for (var u = 0; u < o.options.length; u++)
                    r.push(o.options[u]._linkStitch)
            }
        }
        n = r,
        r = []
    }
    return !1
}
,
StoryModel.insertPageNumber = function(e, t) {
    if (!t && (StoryModel.loading || e.verticalDistanceFromHeader() < 2 || StoryModel.pageSize(e.pageNumber()) < StoryModel.maxPreferredPageLength / 2 || StoryModel.headerWithinDistanceOfStitch(3, e)))
        return;
    if (e.pageNumberLabel() !== 0 && !t)
        return;
    var n = e.pageNumber() + 1;
    for (var r = 0; r < StoryModel.stitches.length; r++) {
        var i = StoryModel.stitches[r].pageNumberLabel();
        i >= n && StoryModel.stitches[r].pageNumberLabel(i + 1)
    }
    e.pageNumberLabel(n),
    StoryModel.computePageNumbers()
}
,
StoryModel.removePageNumber = function(e, t) {
    var n = e.pageNumberLabel();
    if (n <= 0)
        return;
    e.pageNumberLabel(-1);
    for (var r = 0; r < StoryModel.stitches.length; r++) {
        var i = StoryModel.stitches[r].pageNumberLabel();
        i > n && StoryModel.stitches[r].pageNumberLabel(i - 1)
    }
    t || StoryModel.computePageNumbers()
}
,
StoryModel.computePageNumbers = function() {
    var e = []
      , t = 0
      , n = {}
      , r = {};
    for (var i = 0; i < StoryModel.stitches.length; i++) {
        var s = StoryModel.stitches[i].pageNumberLabel();
        s > 0 ? (e.push(StoryModel.stitches[i]),
        s > t && (t = s),
        StoryModel.stitches[i].pageNumber(s),
        n[s] = [],
        r[s] = !0) : StoryModel.stitches[i].pageNumber(0),
        StoryModel.stitches[i].sectionStitches = []
    }
    e.sort(function(e, t) {
        return e.pageNumberLabel() - t.pageNumberLabel()
    });
    for (var i = e.length - 1; i >= 0; i--) {
        var o = function(t, r, s) {
            if (!t)
                return;
            if (!r && t.pageNumber() > 0) {
                t.verticalDistanceFromHeader() > s && t.pageNumber() == e[i].pageNumber() && t.verticalDistanceFromHeader(s),
                n[e[i].pageNumber()].push(t.pageNumber());
                return
            }
            t.pageNumber(e[i].pageNumber()),
            t.headerStitch(e[i]),
            e[i].sectionStitches.push(t),
            t.verticalDistanceFromHeader(s),
            o(t.divertStitch, !1, s + .01);
            for (var u = 0; u < t.options.length; u++)
                o(t.options[u].linkStitch(), !1, s + 1 + .1 * u)
        };
        o(e[i], !0, 0)
    }
    var u = [];
    u.push(StoryModel.initialStitch.pageNumber());
    while (u.length > 0) {
        var a = [];
        for (var i = 0; i < u.length; i++)
            if (r[u[i]]) {
                r[u[i]] = !1;
                for (var f = 0; f < n[u[i]].length; f++)
                    a.push(n[u[i]][f])
            }
        u = a
    }
    for (var i = 0; i < StoryModel.stitches.length; i++) {
        var l = StoryModel.stitches[i].pageNumber();
        l && r[l] && (StoryModel.stitches[i].pageNumber(0),
        StoryModel.stitches[i].sectionStitches = [])
    }
}
,
StoryModel.pageSize = function(e) {
    var t = 0;
    for (var n = 0; n < StoryModel.stitches.length; n++)
        StoryModel.stitches[n].pageNumber() == e && t++;
    return t
}
,
StoryModel.computeVerticalHeuristic = function() {
    if (!StoryModel.initialStitch)
        return;
    var e = []
      , t = [];
    for (var n = 0; n < StoryModel.stitches.length; n++) {
        var r = StoryModel.stitches[n];
        r.verticalDistance(-1)
    }
    e.push(StoryModel.initialStitch),
    StoryModel.initialStitch.verticalDistance(1);
    while (e.length > 0) {
        for (var n = 0; n < e.length; n++) {
            var r = e[n];
            if (r.divertStitch) {
                var i = r.divertStitch;
                i.verticalDistance() == -1 && (i.verticalDistance(r.verticalDistance() + .01),
                t.push(i))
            } else
                for (var s = 0; s < r.options.length; s++)
                    if (r.options[s].linkStitch()) {
                        var i = r.options[s].linkStitch();
                        i.verticalDistance() == -1 && (i.verticalDistance(r.verticalDistance() + 1 + .1 * s),
                        t.push(i))
                    }
        }
        e = t,
        t = []
    }
    for (var n = 0; n < StoryModel.stitches.length; n++) {
        var r = StoryModel.stitches[n];
        r.verticalDistance() == -1 && r.verticalDistance(StoryModel.stitches.length + 1)
    }
}
,
StoryModel.Stitch = function(e) {
    this.refCount = 0,
    this._text = e,
    this.wordCount = wordCountOf(e),
    this.options = [],
    this._ifConditions = [],
    this._notIfConditions = [],
    this.divertStitch = null,
    this._flags = new Array,
    this._backlinks = new Array,
    this._pageNumberHeader = 0,
    this._pageLabelText = "",
    this.statsObj = {},
    this._runOn = !1,
    this._image = !1,
    this.forwardLinkStitch = null,
    this.distanceFromTarget = -1,
    this._verticalDistanceFromStart = 0,
    this._computedPageNumber = 0,
    this._verticalDistanceFromPageNumberHeader = 0,
    this._headerStitch = null,
    this.sectionStitches = [],
    this._stitchBox = null
}
,
StoryModel.Stitch.prototype.verticalDistanceFromHeader = function(e) {
    return e != null && (this._verticalDistanceFromPageNumberHeader = e),
    this._verticalDistanceFromPageNumberHeader
}
,
StoryModel.Stitch.prototype.pageNumber = function(e) {
    return e !== undefined && (this._computedPageNumber = e),
    this._computedPageNumber
}
,
StoryModel.Stitch.prototype.headerStitch = function(e) {
    return e !== undefined && (this._headerStitch = e),
    this._headerStitch
}
,
StoryModel.Stitch.prototype.pageLabelText = function(e) {
    return e !== undefined && (this._pageLabelText = e),
    this._pageLabelText ? this._pageLabelText : "Section " + this.pageNumberLabel()
}
,
StoryModel.Stitch.prototype.pageNumberLabel = function(e) {
    return e && (e < this._pageNumberHeader && StoryModel.maxPage == this._pageNumberHeader && StoryModel.maxPage--,
    this._pageNumberHeader = e,
    e > StoryModel.maxPage && (StoryModel.maxPage = e)),
    this._pageNumberHeader
}
,
StoryModel.Stitch.prototype.verticalDistance = function(e) {
    return e && (this._verticalDistanceFromStart = e),
    this._verticalDistanceFromStart
}
,
StoryModel.Stitch.prototype.getBacklinks = function() {
    return this._backlinks
}
,
StoryModel.Stitch.prototype.decRefCount = function() {
    this.refCount--
}
,
StoryModel.Stitch.prototype.incRefCount = function() {
    this.refCount++
}
,
StoryModel.Stitch.prototype.text = function(e) {
    return e != null && (this._text = e,
    this.wordCount = wordCountOf(e)),
    this._text === undefined ? (this.wordCount = 0,
    "") : this._text
}
,
StoryModel.Stitch.prototype.name = function(e) {
    return e != null && (this._name = e),
    this._name
}
,
StoryModel.Stitch.prototype.createShortName = function() {
    if (!this.text())
        return "blankStitch";
    var e = this.text().camelCase().substring(0, 16);
    return e === "" ? "punctuatedStitch" : e
}
,
StoryModel.Stitch.prototype.divert = function(e, t) {
    if (e != null) {
        if (e == this) {
            alert("Trying to divert a stitch back to itself! Infinite loopyness!");
            return
        }
        this.divertStitch != e && (this.divertStitch && this.divertStitch.decRefCount(),
        this.divertStitch = e,
        this.divertStitch.incRefCount(),
        t || StoryModel.updateGraphModel())
    }
    return this.divertStitch
}
,
StoryModel.Stitch.prototype.undivert = function(e) {
    this.divertStitch && (StoryModel.watchRefCounts && console.log("Undiverting " + this.name()),
    this.divertStitch.decRefCount()),
    this.divertStitch = null,
    e || StoryModel.updateGraphModel()
}
,
StoryModel.Stitch.prototype.addOption = function() {
    var e = new StoryModel.Option(this);
    return this.options.push(e),
    e
}
,
StoryModel.Stitch.prototype.removeOption = function(e) {
    e.unlink(),
    this.options.remove(e)
}
,
StoryModel.Stitch.prototype.dead = function() {
    var e = $.trim(this.text()).length == 0 && this.numberOfFlags() === 0;
    return e && this.refCount == 0 && this !== StoryModel.initialStitch ? !0 : !1
}
,
StoryModel.Stitch.prototype.runOn = function(e) {
    if (e === !1 || e === !0)
        this._runOn = e;
    return this._runOn
}
,
StoryModel.Stitch.prototype.image = function(e) {
    return e !== undefined && (this._image = e),
    this._image
}
,
StoryModel.Stitch.prototype.stats = function() {
    var e = {};
    e.deadEnd = !1,
    e.numOptions = this.options.length,
    e.looseEnds = [],
    e.numLooseEnds = 0;
    if (this.options.length > 0) {
        e.numLinked = 0;
        for (var t = 0; t < e.numOptions; ++t) {
            var n = this.options[t];
            n.linkStitch() ? e.numLinked++ : e.looseEnds.push(n)
        }
        e.numLooseEnds = e.numOptions - e.numLinked
    } else
        this.divertStitch || (e.deadEnd = !0);
    return this.statsObj = e,
    e
}
,
StoryModel.Stitch.prototype.numberOfFlags = function() {
    return this._flags.length
}
,
StoryModel.Stitch.prototype.flagIsUsed = function(e, t) {
    t || (e = StoryModel.extractFlagNameFromExpression(e));
    for (var n = 0; n < this._flags.length; n++) {
        var r = this._flags[n];
        t || (r = StoryModel.extractFlagNameFromExpression(r));
        if (r == e)
            return !0
    }
    return !1
}
,
StoryModel.Stitch.prototype.flagByIndex = function(e) {
    return e < 0 || e >= this.numberOfFlags() ? "" : this._flags[e]
}
,
StoryModel.Stitch.prototype.editFlag = function(e, t) {
    if (e) {
        var n = this._flags.indexOf(e);
        t && n == -1 ? (this._flags.push(e),
        StoryModel.addFlagToIndex(e)) : (this._flags.splice(n, 1),
        StoryModel.collateFlags())
    }
}
,
StoryModel.Option = function(e) {
    this._text = "",
    this._linkStitch = null,
    this._parentStitch = e,
    this._ifConditions = new Array,
    this._notIfConditions = new Array
}
,
StoryModel.Option.prototype.text = function(e, t) {
    if (e || t)
        this._text = e;
    return this._text
}
,
StoryModel.Option.prototype.linkStitch = function(e, t) {
    return e && this._linkStitch != e && (this._linkStitch && this._linkStitch.decRefCount(),
    this._linkStitch = e,
    this._linkStitch.incRefCount(),
    t || StoryModel.updateGraphModel()),
    this._linkStitch
}
,
StoryModel.Option.prototype.unlink = function(e) {
    this._linkStitch && this._linkStitch.decRefCount(),
    StoryModel.watchRefCounts && console.log("Unlinking " + this.text() + " - option on " + this._parentStitch.name()),
    this._linkStitch = null,
    e || StoryModel.updateGraphModel()
}
,
StoryModel.numberOfConditionals = function(e, t) {
    return t ? e._ifConditions.length : e._notIfConditions.length
}
,
StoryModel.conditionedOnThis = function(e, t, n) {
    return n ? e._ifConditions.indexOf(t) > -1 : e._notIfConditions.indexOf(t) > -1
}
,
StoryModel.conditionalByIndex = function(e, t, n) {
    return n < 0 || n >= StoryModel.numberOfConditionals(e, t) ? "" : t ? e._ifConditions[n] : e._notIfConditions[n]
}
,
StoryModel.writeConditionals = function(e, t, n) {
    if (t)
        if (n) {
            var r = e._ifConditions.indexOf(t);
            r == -1 ? (e._ifConditions.push(t),
            StoryModel.addFlagToIndex(t)) : (e._ifConditions.splice(r, 1),
            StoryModel.collateFlags())
        } else {
            var r = e._notIfConditions.indexOf(t);
            r == -1 ? (e._notIfConditions.push(t),
            StoryModel.addFlagToIndex(t)) : (e._notIfConditions.splice(r, 1),
            StoryModel.collateFlags())
        }
}
,
StoryModel.extractFlagNameFromExpression = function(e) {
    var t = /^(.*?)\s*(\=|\+|\-|\>|\<|\!\=|$)/;
    return e.match(t)[1]
}
,
StoryModel.addFlagToIndex = function(e) {
    console.log("Adding flag string " + e),
    e = StoryModel.extractFlagNameFromExpression(e),
    StoryModel.flagIndex.contains(e) || (console.log("-> " + e),
    StoryModel.flagIndex.push(e))
}
,
StoryModel.collateFlags = function() {
    StoryModel.flagIndex = [];
    for (var e = 0; e < StoryModel.stitches.length; e++) {
        var t = StoryModel.stitches[e];
        for (var n = 0; n < t._flags.length; n++)
            StoryModel.addFlagToIndex(t._flags[n]);
        for (var r = 0; r < t.options.length; r++) {
            for (var n = 0; n < t.options[r]._ifConditions.length; n++)
                StoryModel.addFlagToIndex(t.options[r]._ifConditions[n]);
            for (var n = 0; n < t.options[r]._notIfConditions.length; n++)
                StoryModel.addFlagToIndex(t.options[r]._notIfConditions[n])
        }
        for (var n = 0; n < t._ifConditions.length; n++)
            StoryModel.addFlagToIndex(t._ifConditions[n]);
        for (var n = 0; n < t._notIfConditions.length; n++)
            StoryModel.addFlagToIndex(t._notIfConditions[n])
    }
}
,
StoryModel.getIdxOfFlag = function(e, t) {
    for (var n = 0; n < t.length; n++)
        if (t[n].flagName == e)
            return n;
    return -1
}
,
StoryModel.getValueOfFlag = function(e, t) {
    var n = StoryModel.getIdxOfFlag(e, t);
    return n >= 0 ? t[n].value : !1
}
,
StoryModel.processFlagSetting = function(e, t) {
    if (e)
        for (var n = 0; n < e.numberOfFlags(); n++) {
            var r = e.flagByIndex(n), i = !0, s;
            console.log("Flag directive: " + r);
            var o = /^(.*?)\s*(\=|\+|\-)\s*(\b.*\b)\s*$/;
            if (s = r.match(o)) {
                r = s[1];
                var u = StoryModel.getIdxOfFlag(r, t);
                s[3].match(/\d+/) ? s[2] == "=" ? i = parseInt(s[3]) : (u < 0 ? i = 0 : i = t[u].value,
                s[2] == "+" ? i += parseInt(s[3]) : i -= parseInt(s[3])) : s[2] == "=" ? i = convertStringToBooleanIfAppropriate(s[3]) : console.log("Can't add/subtract a boolean.")
            } else
                var u = StoryModel.getIdxOfFlag(r, t);
            console.log("Assigning value: " + i),
            u >= 0 && t.splice(u, 1);
            var a = {
                flagName: r,
                value: i
            };
            t.push(a)
        }
    return t
}
,
StoryModel.test = function(e, t) {
    var n, r = /^(.*?)\s*(\<|\>|\<\=|\>\=|\=|\!\=|\=\=)\s*(\b.*\b)\s*$/, i = !1;
    if (e)
        if (n = e.match(r)) {
            var s = StoryModel.getValueOfFlag(n[1], t);
            console.log("Testing " + s + " " + n[2] + " " + n[3]),
            n[2] == "==" || n[2] == "=" ? i = s == n[3] : n[2] == "!=" || n[2] == "<>" ? i = s !== n[3] : (n[3].match(/\d+/) || console.log("Error - Can't perform an order-test on a boolean."),
            n[2] == "<" ? i = s < n[3] : n[2] == "<=" ? i = s <= n[3] : n[2] == ">" ? i = s > n[3] : n[2] == ">=" && (i = s >= n[3])),
            i ? console.log("Result is a SUCCESS") : console.log("Result is a FAIL")
        } else {
            i = StoryModel.getValueOfFlag(e, t),
            i = convertStringToBooleanIfAppropriate(i);
            if (i === 0 || i === -1)
                i = !1;
            i !== !0 && i !== !1 && (i = !0)
        }
    return i
}
,
StoryModel.doesArrayMeetConditions = function(e, t, n) {
    var r = new Array
      , i = !1;
    for (var s = 0; s < e.length && !i; s++)
        i = !StoryModel.test(e[s], n);
    for (var s = 0; s < t.length && !i; s++)
        i = StoryModel.test(t[s], n);
    return !i
}
,
StoryModel.createStitch = function(e) {
    var t = new StoryModel.Stitch(e);
    return this.stitches.push(t),
    t
}
,
StoryModel.removeStitch = function(e) {
    StoryModel.watchRefCounts && console.log("Removing " + e.name() + " entirely.");
    if (e.refCount != 0) {
        StoryModel.repointStitchToStitch(e, null),
        console.log("Deleting stitch with references, so first unpointing stitches from this stitch.");
        if (e.refCount != 0) {
            alert("Fixing ref-count on stitch removal failed.");
            return
        }
    }
    e.undivert();
    for (var t = e.options.length - 1; t >= 0; t--)
        e.removeOption(e.options[t]);
    StoryModel.removePageNumber(e, !0);
    for (var t = 0; t < this.stitches.length; ++t)
        if (this.stitches[t] === e) {
            this.stitches.splice(t, 1),
            StoryModel.updateGraphModel();
            return
        }
}
,
StoryModel.createOption = function(e) {
    var t = e.addOption();
    return t
}
,
StoryModel.removeOption = function(e, t) {
    e.removeOption(t)
}
,
StoryModel.purge = function() {
    if (StoryModel.stitches.length == 0)
        return;
    var e = [];
    for (var t = 0; t < StoryModel.stitches.length; ++t) {
        var n = StoryModel.stitches[t];
        n.dead() && e.push(n)
    }
    for (var t = 0; t < e.length; t++)
        StoryModel.removeStitch(e[t])
}
,
StoryModel.importStory = function(e, t) {
    StoryModel.loading = !0,
    StoryModel.clear(),
    StoryModel.setStoryName(e);
    var n = {}
      , r = {};
    for (var i in t.stitches) {
        var s = t.stitches[i]
          , o = ""
          , u = null
          , a = null
          , f = ""
          , l = []
          , c = []
          , h = []
          , p = []
          , d = !1
          , v = null;
        for (var m = 0; m < s.content.length; ++m) {
            var g = s.content[m];
            g.divert !== undefined ? u = g.divert : g.option !== undefined ? l.push(g) : g.pageNum !== undefined ? a = g.pageNum : g.pageLabel !== undefined ? f = g.pageLabel : g.flagName !== undefined ? c.push(g.flagName) : g.ifCondition !== undefined ? h.push(g.ifCondition) : g.notIfCondition !== undefined ? p.push(g.notIfCondition) : g.runOn ? d = !0 : g.image ? v = g.image : (g.indexOf("[...]") > -1 && (g = g.replace(/\[\.\.\.\]/, ""),
            d = !0),
            o += g)
        }
        r[i] = {
            storyStitch: StoryModel.createStitch(o),
            divert: u,
            options: l,
            flags: c,
            ifs: h,
            notIfs: p,
            runOn: d,
            pageNumHeader: a,
            pageLabel: f,
            image: v
        }
    }
    for (var i in r) {
        var y = r[i];
        if (y.divert) {
            var b = r[y.divert].storyStitch;
            y.storyStitch.divert(b)
        }
        y.pageNumHeader && y.storyStitch.pageNumberLabel(y.pageNumHeader),
        y.pageLabel && y.storyStitch.pageLabelText(y.pageLabel),
        y.image && y.storyStitch.image(y.image);
        for (var w = 0; w < y.flags.length; ++w)
            y.storyStitch._flags.push(y.flags[w]);
        y.runOn && y.storyStitch.runOn(!0);
        for (var E = 0; E < y.ifs.length; ++E)
            y.storyStitch._ifConditions.push(y.ifs[E]);
        for (var E = 0; E < y.notIfs.length; ++E)
            y.storyStitch._notIfConditions.push(y.notIfs[E]);
        for (var S = 0; S < y.options.length; ++S) {
            var x = y.options[S]
              , T = StoryModel.createOption(y.storyStitch);
            T.text(x.option),
            T.writeModeOnly = x.writeModeOnly,
            x.linkPath && T.linkStitch(r[x.linkPath].storyStitch),
            T._parentStitch = y.storyStitch;
            if (x.ifConditions)
                for (var E = 0; E < x.ifConditions.length; ++E)
                    T._ifConditions.push(x.ifConditions[E].ifCondition);
            if (x.notIfConditions)
                for (var N = 0; N < x.notIfConditions.length; ++N)
                    T._notIfConditions.push(x.notIfConditions[N].notIfCondition)
        }
    }
    if (r[t.initial])
        StoryModel.initialStitch = r[t.initial].storyStitch;
    else {
        StoryModel.initialStitch = StoryModel.stitches[0];
        for (var C = 0; C < StoryModel.stitches.length; C++) {
            var k = StoryModel.stitches[C].pageNumberLabel();
            k > 0 && StoryModel.stitches[C].pageNumberLabel(k + 1)
        }
        StoryModel.initialStitch.pageNumberLabel(1)
    }
    return StoryModel.optionMirroring = t.optionMirroring !== undefined ? t.optionMirroring : !0,
    StoryModel.allowCheckpoints = t.allowCheckpoints !== undefined ? t.allowCheckpoints : !1,
    t.editorData && (t.editorData.playPoint && r[t.editorData.playPoint] ? n.playPoint = r[t.editorData.playPoint].storyStitch : n.playPoint = StoryModel.initialStitch,
    n.libraryVisible = t.editorData.libraryVisible,
    t.editorData.textSize !== undefined ? n.textSize = t.editorData.textSize : n.textSize = 0,
    t.editorData.authorName && StoryModel.setAuthorName(t.editorData.authorName)),
    StoryModel.loading = !1,
    StoryModel.updateGraphModel(),
    StoryModel.collateFlags(),
    n
}
,
StoryModel.nameStitches = function() {
    var e = {};
    for (var t = 0; t < StoryModel.stitches.length; ++t) {
        var n = StoryModel.stitches[t]
          , r = n.createShortName()
          , i = r;
        for (var s = 1; e[i] != null; s++)
            i = r + s;
        r = i,
        e[r] = !0,
        n.name(r)
    }
}
,
StoryModel.exportStory = function() {
    var e = {
        stitches: {}
    };
    StoryModel.nameStitches();
    for (var t = 0; t < StoryModel.stitches.length; ++t) {
        var n = StoryModel.stitches[t]
          , r = {
            content: []
        };
        r.content.push(n.text()),
        n.runOn() && r.content.push({
            runOn: !0
        }),
        n.image() && r.content.push({
            image: n.image()
        });
        if (n.divert() != null) {
            var i = {
                divert: n.divert().name()
            };
            r.content.push(i)
        } else if (n.options.length > 0)
            for (var s = 0; s < n.options.length; ++s) {
                var o = n.options[s].linkStitch()
                  , u = n.options[s]._parentStitch
                  , a = []
                  , f = [];
                for (var l = 0; l < n.options[s]._ifConditions.length; ++l) {
                    var c = {
                        ifCondition: n.options[s]._ifConditions[l]
                    };
                    a.push(c)
                }
                for (var l = 0; l < n.options[s]._notIfConditions.length; ++l) {
                    var c = {
                        notIfCondition: n.options[s]._notIfConditions[l]
                    };
                    f.push(c)
                }
                var h = {
                    option: n.options[s].text(),
                    linkPath: o ? o.name() : null,
                    ifConditions: a.length > 0 ? a : null,
                    notIfConditions: f.length > 0 ? f : null
                };
                r.content.push(h)
            }
        if (n._flags.length > 0)
            for (var p = 0; p < n._flags.length; ++p) {
                var d = {
                    flagName: n._flags[p]
                };
                r.content.push(d)
            }
        if (n._ifConditions.length > 0)
            for (var p = 0; p < n._ifConditions.length; ++p) {
                var v = {
                    ifCondition: n._ifConditions[p]
                };
                r.content.push(v)
            }
        if (n._notIfConditions.length > 0)
            for (var p = 0; p < n._notIfConditions.length; ++p) {
                var v = {
                    notIfCondition: n._notIfConditions[p]
                };
                r.content.push(v)
            }
        if (n._pageNumberHeader != 0) {
            var m = {
                pageNum: n._pageNumberHeader
            };
            r.content.push(m)
        }
        if (n._pageLabelText != 0) {
            var g = {
                pageLabel: n._pageLabelText
            };
            r.content.push(g)
        }
        e.stitches[n.name()] = r
    }
    return StoryModel.initialStitch && (e.initial = StoryModel.initialStitch.name()),
    e.optionMirroring = StoryModel.optionMirroring,
    e.allowCheckpoints = StoryModel.allowCheckpoints,
    e.editorData = Editor.editorData(),
    e
}
;
var GraphModel = function(e) {
    StoryModel.updateGraphModel();
    var t = this;
    t.zoomedIn = !0,
    t.zoomLevel = 3;
    var n = function(e) {
        return e = Math.min(e, t.possibleFontHeights.length - 1),
        t.possibleFontHeights[e]
    };
    this.nodeWidth = 200,
    this.nodeHeight = 80,
    this.possibleFontHeights = [4, 6, 7, 8],
    this.fontHeight = n(t.zoomLevel),
    this.nodePadding = 12,
    this.maxRowWidth = 1,
    this.jqRootNode = null,
    this.jqGraphWindow = $("<div id='graphContainer'><div id='title'></div></div>"),
    this.jqGraphScreen = $("<div class='graph'></div>"),
    this.jqGraphWindow.append(this.jqGraphScreen),
    this.jqDel = $("<div class='graphControl del'></div>"),
    this.jqGraphWindow.append(this.jqDel),
    this.jqDel.bind("click", function() {
        t.close()
    }),
    this.jqZoomIn = $("<div class='graphControl plus'></div>"),
    this.jqGraphWindow.append(this.jqZoomIn),
    this.jqZoomOut = $("<div class='graphControl minus'>-</div>"),
    this.jqGraphWindow.append(this.jqZoomOut),
    this.jqZoomOut.bind("click", function() {
        t.zoomLevel > 0 && (t.zoomLevel--,
        t.nodeWidth = .8 * t.nodeWidth,
        t.nodeHeight = .8 * t.nodeHeight,
        t.nodePadding = .8 * t.nodePadding,
        t.fontHeight = n(t.zoomLevel),
        t.drawGraph(),
        t.scrollToFocus(!0))
    }),
    this.jqZoomIn.bind("click", function() {
        t.zoomLevel++,
        t.nodeWidth = 1.25 * t.nodeWidth,
        t.nodeHeight = 1.25 * t.nodeHeight,
        t.nodePadding = 1.25 * t.nodePadding,
        t.fontHeight = n(t.zoomLevel),
        t.drawGraph(),
        t.scrollToFocus(!0)
    }),
    $("body").append("<div class='eventAbsorber'></div>"),
    $("body").append(this.jqGraphWindow),
    t.buildGraph(e)
};
GraphModel.prototype.close = function() {
    this.jqGraphWindow.remove(),
    $("body").find(".eventAbsorber").remove()
}
,
GraphModel.prototype.buildGraph = function(e) {
    var t = this;
    this.jqGraphWindow.find("#title").text("Map - " + e.headerStitch().pageLabelText()),
    t.jqGraphScreen.empty(),
    this.editorRootStitch = e,
    this.rootStitch = e,
    this.knotNum = e.pageNumber(),
    this.knotStitches = [],
    this.underConstruction = [],
    this.nodes = [],
    this.arrows = [],
    t.loadInNodes();
    var n = t.roughOutGraph(e);
    t.renderGraphByWidthBlocks(n),
    t.adjustOcclusions(),
    t.drawGraph(),
    t.scrollToFocus()
}
,
GraphModel.prototype.loadInNodes = function() {
    var e = this;
    e.underConstruction = [];
    var t = function(n, r) {
        if (e.underConstruction.contains(n))
            return;
        e.underConstruction.push(n);
        var i = []
          , s = []
          , o = e.inKnot(n);
        o && (r = !1);
        var u = function(e, t) {
            e && t.push(e)
        };
        if (o || r) {
            for (var a = 0; a < n.options.length; a++) {
                var f = n.options[a].linkStitch();
                if (e.inKnot(f) || e.inKnot(n))
                    u(f, i),
                    f && !e.inKnot(f) && t(f)
            }
            n.divertStitch && (e.inKnot(n.divertStitch) || e.inKnot(n)) && (u(n.divertStitch, i),
            e.inKnot(n.divertStitch) || t(n.divertStitch))
        }
        if (o)
            for (var a = 0; a < n._backlinks.length; a++)
                u(n._backlinks[a], s),
                t(n._backlinks[a], !0);
        var l = {
            stitch: n,
            stitchHTML: Editor.FormattingToHTML(n.text()),
            backLinks: s.slice(0),
            backLinksRemaining: s,
            linksIn: s.length,
            links: i,
            totalLinkage: i.length + s.length,
            x: 0,
            xCount: 0,
            y: 0,
            width: 1,
            offset: 0,
            verticalDistance: n.verticalDistanceFromHeader(),
            considered: !1,
            inThisKnot: o,
            preKnot: r,
            traceLinks: o || r,
            label: !o || !n.verticalDistanceFromHeader() ? n.headerStitch().pageLabelText() : ""
        };
        e.knotStitches.push(l)
    };
    for (var n = 0; n < e.rootStitch.headerStitch()._backlinks.length; n++)
        t(e.rootStitch.headerStitch()._backlinks[n], !0);
    for (var n = 0; n < e.rootStitch.headerStitch().sectionStitches.length; n++)
        t(e.rootStitch.headerStitch().sectionStitches[n])
}
,
GraphModel.prototype.inKnot = function(e) {
    return e ? e.pageNumber() === this.knotNum : !1
}
;
var findStitchIdx = function(e, t) {
    for (var n = 0; n < e.knotStitches.length; n++)
        if (e.knotStitches[n].stitch == t)
            return n;
    return -1
};
GraphModel.prototype.getStitch = function(e) {
    var t = findStitchIdx(this, e);
    return t === -1 ? null : this.knotStitches[t]
}
,
GraphModel.prototype.adjustGraphMargins = function() {
    var e = this
      , t = e.maxRowWidth
      , n = 0;
    for (var r = 0; r < e.knotStitches.length; r++) {
        var i = e.knotStitches[r].x;
        t = Math.min(i - .5, t),
        n = Math.max(i + .5, n)
    }
    for (var r = 0; r < e.knotStitches.length; r++)
        e.knotStitches[r].x += -t;
    for (var r = 0; r < e.rows.length; r++)
        e.rows[r].rowLeft += -t,
        e.rows[r].rowRight += -t;
    e.maxRowWidth = n + -t
}
,
GraphModel.prototype.calculateHardLimitsOnNode = function(e, t) {
    var n = this
      , r = t ? -0.5 : 0
      , i = t ? n.maxRowWidth + .5 : n.maxRowWidth;
    for (var s = 0; s < n.rows.length; s++)
        if (n.rows[s].y == e.y) {
            rowNum = s;
            break
        }
    for (var o = 0; o < n.rows[rowNum].rowNodes.length; o++) {
        var u = n.rows[rowNum].rowNodes[o];
        if (u !== e) {
            var a = u.x + .5
              , f = u.x - .5;
            a > r && a <= e.x - .5 && (r = a),
            f < i && f >= e.x + .5 && (i = f)
        }
    }
    return {
        left: r,
        right: i,
        width: i - r
    }
}
;
var doesStitchBlockLink = function(e, t, n) {
    var r = (t.y - e.y) / (t.x - e.x)
      , i = (t.y - n.y) / (t.x - n.x);
    return r === i
}
  , blockScore = function(e, t, n) {
    var r = (t.y - n.y) / (t.x - n.x)
      , i = function(e) {
        return (e - t.y) / r + t.x
    };
    return occlusionScoreFromCoordinates(e.x, i(e.y - .5), i(e.y + .5))
}
  , occlusionScoreFromCoordinates = function(e, t, n) {
    var r = e - .6
      , i = e + .6;
    if (t > n) {
        var s = n;
        n = t,
        t = s
    }
    var o = Math.abs(Math.max(t - r, 0) - Math.max(i - n, 0))
      , u = Math.max(1 - o, 0);
    return u
};
GraphModel.prototype.occlusionOfStitches = function(e, t) {
    var n = this;
    if (e.y > t.y) {
        var r = e;
        e = t,
        t = r
    }
    if (t.y - e.y == 1)
        return 1;
    var i = 0;
    for (var s = 0; s < n.rows.length; s++)
        if (n.rows[s].y > e.y && n.rows[s].y < t.y)
            for (var o = 0; o < n.rows[s].rowNodes.length; o++) {
                var u = blockScore(n.rows[s].rowNodes[o], e, t);
                u > i && (i = u)
            }
    return i
}
,
GraphModel.prototype.occlusionCausedByStitch = function(e) {
    var t = this
      , n = 0;
    for (var r = 0; r < t.knotStitches.length; r++)
        if (t.knotStitches[r] != e) {
            var i = t.knotStitches[r];
            if (i.y < e.y)
                for (var s = 0; s < i.links.length; s++) {
                    var o = t.getStitch(i.links[s]);
                    o.y > e.y && (n += blockScore(e, i, o))
                }
        }
    return n
}
,
GraphModel.prototype.roughOutGraph = function(e) {
    var t = this
      , n = function() {
        t.knotStitches.sort(function(e, t) {
            return !e.traceLinks || !t.traceLinks ? e.traceLinks ? -1 : 1 : e.considered !== t.considered ? e.considered ? 1 : -1 : e.preKnot ? -1 : t.preKnot ? 1 : e.verticalDistance == 0 && e.inThisKnot ? -1 : t.verticalDistance == 0 && t.inThisKnot ? 1 : e.backLinksRemaining.length == 0 || t.backLinksRemaining.length == 0 ? e.backLinksRemaining.length == 0 && t.backLinksRemaining.length == 0 ? e.verticalDistance - t.verticalDistance : e.backLinksRemaining.length == 0 ? -1 : 1 : e.verticalDistance - t.verticalDistance
        })
    }
      , r = -1;
    n();
    var i = 0;
    while (i < this.knotStitches.length && !this.knotStitches[i].considered) {
        this.knotStitches[i].backLinksRemaining.length > 0 && (n(),
        i = 0);
        var s = this.knotStitches[i];
        s.considered = !0;
        if (s.traceLinks)
            for (var o = 0; o < s.links.length; o++) {
                var u = t.getStitch(s.links[o]);
                if (!u.considered) {
                    u.y = Math.max(u.y, s.y + 1),
                    u.y > r && (r = u.y),
                    u.x += s.x;
                    var a = 1 / (s.y + 1)
                      , f = 1 / s.links.length
                      , l = o - (s.links.length - 1) / 2
                      , c = a * f * l;
                    u.x += c,
                    u.backLinksRemaining.remove(s.stitch)
                }
            }
        i++
    }
    for (var h = 0; h < this.knotStitches.length; h++)
        this.knotStitches[h].linksIn > 0 && (this.knotStitches[h].x = this.knotStitches[h].x / this.knotStitches[h].linksIn);
    return r
}
,
GraphModel.prototype.renderGraphByWidthBlocks = function(e) {
    var t = this;
    t.rows = [],
    t.maxRowWidth = -1,
    this.knotStitches.sort(function(e, t) {
        return e.y != t.y ? e.y - t.y : -(e.totalLinkage - t.totalLinkage)
    });
    for (var n = 0; n < this.knotStitches.length; n++) {
        var r = this.knotStitches[n]
          , i = t.rows.last();
        if (!i || i.y != r.y)
            t.rows.push({}),
            i = t.rows.last(),
            i.y = r.y,
            i.rowNodes = [],
            i.rowScore = 0;
        i.rowNodes.push(r),
        i.rowNodes.length > t.maxRowWidth && (t.maxRowWidth = i.rowNodes.length)
    }
    for (var n = 0; n < t.rows.length; n++) {
        var s = t.rows[n]
          , o = 0;
        s.rowLeft = t.maxRowWidth,
        s.rowRight = 0;
        for (var u = 0; u < s.rowNodes.length; u++) {
            var a = s.rowNodes[u];
            o += a.totalLinkage;
            for (var f = 0; f < a.backLinks.length; f++) {
                var l = this.getStitch(a.backLinks[f]);
                l.x - l.width / 2 < s.rowLeft && (s.rowLeft = l.x - l.width / 2),
                l.x + l.width / 2 > s.rowRight && (s.rowRight = l.x + l.width / 2)
            }
        }
        s.rowRight < s.rowLeft && (s.rowLeft = t.maxRowWidth / 2 - .5,
        s.rowRight = t.maxRowWidth / 2 + .5);
        if (s.rowRight - s.rowLeft < s.rowNodes.length)
            s.rowLeft -= (s.rowNodes.length - (s.rowRight - s.rowLeft)) / 2,
            s.rowRight += (s.rowNodes.length + (s.rowRight - s.rowLeft)) / 2;
        else {
            s.rowScore = s.rowRight - s.rowLeft - s.rowNodes.length;
            for (var u = 0; u < s.rowNodes.length; u++) {
                var a = s.rowNodes[u]
                  , c = 0;
                o > 0 && (c = Math.max(s.rowScore * a.totalLinkage / o, 0)),
                a.width += c,
                s.rowScore -= c
            }
        }
        s.rowNodes.sort(function(e, t) {
            return e.x - t.x
        });
        var h = s.rowLeft;
        for (var u = 0; u < s.rowNodes.length; u++) {
            var a = s.rowNodes[u];
            a.x = a.width / 2 + h,
            h += a.width
        }
    }
    t.adjustGraphMargins(),
    t.rows.sort(function(e, t) {
        return -(e.y - t.y)
    });
    for (var n = 0; n < t.rows.length; n++) {
        t.rows[n].rowNodes.sort(function(e, n) {
            return -(Math.abs(e.x - t.maxRowWidth / 2) - Math.abs(n.x - t.maxRowWidth / 2))
        });
        for (var u = 0; u < t.rows[n].rowNodes.length; u++) {
            var a = t.rows[n].rowNodes[u]
              , p = t.maxRowWidth
              , d = 0;
            for (var f = 0; f < a.links.length; f++) {
                var v = this.getStitch(a.links[f]);
                v.x - .5 < p && (p = v.x - .5),
                v.x + .5 > d && (d = v.x + .5)
            }
            d < p && (d = t.rows[n].rowRight,
            p = t.rows[n].rowLeft),
            hardLimits = t.calculateHardLimitsOnNode(a),
            t.rows[n].rowLeft >= t.maxRowWidth / 2 && t.rows[n].rowLeft > hardLimits.left && t.rows[n].rowLeft + 1 <= hardLimits.right && (hardLimits.left = t.rows[n].rowLeft),
            t.rows[n].rowRight <= t.maxRowWidth / 2 && t.rows[n].rowRight < hardLimits.right && t.rows[n].rowRight - 1 >= hardLimits.left && (hardLimits.right = t.rows[n].rowRight),
            p < hardLimits.left ? a.x = hardLimits.left + .5 : d > hardLimits.right ? a.x = hardLimits.right - .5 : a.x = (p + d) / 2
        }
    }
    t.adjustGraphMargins(),
    t.adjustOcclusions()
}
,
GraphModel.prototype.adjustOcclusions = function() {
    var e = this
      , t = !0
      , n = 4
      , r = 0;
    while (t && r < n) {
        t = !1,
        r++;
        for (var i = 0; i < this.knotStitches.length; i++) {
            var s = this.knotStitches[i]
              , o = e.occlusionCausedByStitch(s);
            if (o > 0) {
                var u = 0
                  , a = e.calculateHardLimitsOnNode(s, !0)
                  , f = {
                    y: this.knotStitches[i].y,
                    bestX: null
                };
                for (f.x = a.left + .5; f.x <= a.right - .5; f.x += .25) {
                    var l = e.occlusionCausedByStitch(f)
                      , c = Math.abs(f.x - s.x);
                    if (l < o || l == o && c < u)
                        f.bestX = f.x,
                        o = l,
                        u = c
                }
                f.bestX !== null && (s.x = f.bestX,
                t = !0),
                t && e.drawGraph()
            }
        }
        e.adjustGraphMargins()
    }
}
,
GraphModel.prototype.adjustOcclusionsViaLinks = function() {
    var e = this
      , t = !0
      , n = 0;
    while (t && n < 8) {
        t = !1,
        n++;
        for (var r = 0; r < this.knotStitches.length; r++)
            if (this.knotStitches[r].links.length > 1)
                for (var i = 0; i < this.knotStitches[r].links.length; i++) {
                    var s = this.getStitch(this.knotStitches[r].links[i])
                      , o = e.occlusionOfStitches(this.knotStitches[r], s);
                    if (o == 1) {
                        var u = !1
                          , a = e.calculateHardLimitsOnNode(this.knotStitches[r], !0)
                          , f = e.calculateHardLimitsOnNode(s, !0)
                          , l = {
                            y: this.knotStitches[r].y,
                            bestX: null
                        }
                          , c = {
                            y: s.y,
                            bestX: null
                        }
                          , h = 1e4;
                        for (l.x = a.right - .5; l.x >= a.left + .5; l.x -= .5)
                            for (c.x = f.right - .5; c.x >= f.left + .5; c.x -= .5)
                                if (e.occlusionOfStitches(l, c) == 0 && e.occlusionCausedByStitch(l) == 0 && e.occlusionCausedByStitch(c) == 0) {
                                    var p = Math.pow(s.x - c.x, 2) + Math.pow(this.knotStitches[r].x - l.x, 2) + Math.pow(2 * (l.x - c.x), 2);
                                    p < h && (l.bestX = l.x,
                                    c.bestX = c.x,
                                    h = p)
                                }
                        l.bestX !== null && (this.knotStitches[r].x = l.bestX,
                        s.x = c.bestX,
                        u = !0,
                        t = !0)
                    }
                }
        e.adjustGraphMargins()
    }
}
;
var stitchLink = function(e, t) {
    return Editor.stitchGoesToStitch(e.stitch, t.stitch)
}
  , stitchInFlow = function(e) {
    return Editor.stitchBoxContainingStitch(e)
};
GraphModel.prototype.drawGraph = function() {
    var e = this;
    e.jqGraphScreen.empty();
    var t = (e.nodeWidth + 2 * e.nodePadding) / 2
      , n = (e.nodeHeight + 2 * e.nodePadding) / 2
      , r = 1.1
      , i = 1.15
      , s = 120
      , o = e.jqGraphScreen.width() / 2
      , u = o - (e.maxRowWidth / 2 + .5) * r * 2 * t + t;
    u < 20 && (u = 20);
    for (var a = 0; a < this.knotStitches.length; a++)
        this.knotStitches[a].plotY = this.knotStitches[a].y * i * 2 * n + s + n,
        this.knotStitches[a].plotX = this.knotStitches[a].x * r * 2 * t + u,
        this.nodes.push(new GraphNode(this,a,n,t)),
        this.jqGraphScreen.append(this.nodes.last().jqStitchNode);
    this.arrows = [];
    for (var a = 0; a < this.knotStitches.length; a++) {
        var f = this.knotStitches[a]
          , l = f.stitch.divertStitch
          , c = f.plotX
          , h = f.plotY;
        for (var p = 0; p < this.knotStitches[a].links.length; p++) {
            var d = this.getStitch(f.links[p])
              , v = d.plotX
              , m = d.plotY;
            jqArrow = $('<div class="arrow"></div>'),
            d.inThisKnot ? l && jqArrow.addClass("divertType") : jqArrow.addClass("externalType"),
            stitchLink(f, d) && jqArrow.addClass("travelled"),
            m < h && (v > e.jqGraphScreen.width() / 2 ? (c += t / 2,
            v += t / 2) : (c -= t / 2,
            v -= t / 2),
            jqArrow.addClass("goingUp"));
            if (!l)
                for (var g = 0; g < f.stitch.options.length; g++)
                    if (f.stitch.options[g].linkStitch() == d.stitch) {
                        jqArrow.attr("tooltip", f.stitch.options[g].text());
                        break
                    }
            var y = Math.sqrt(Math.pow(c - v, 2) + Math.pow(h - m, 2));
            jqArrow.css("width", y),
            jqArrow.css("top", (h + m) / 2 - jqArrow.height() / 2),
            jqArrow.css("left", (c + v) / 2 - y / 2),
            rotate(jqArrow, Math.atan2(h - m, c - v)),
            this.jqGraphScreen.append(jqArrow),
            this.arrows.push({
                fromStitch: f,
                toStitch: d,
                jqArrow: jqArrow
            })
        }
    }
}
,
GraphModel.prototype.scrollToFocus = function(e) {
    var t = $(".focusStitch");
    t.length == 0 && (t = $(".selected"));
    if (t.length > 0) {
        var n = t.position().left + this.nodeWidth / 2 + this.jqGraphScreen.scrollLeft() - this.jqGraphScreen.width() / 2
          , r = t.position().top + this.nodeHeight / 2 + this.jqGraphScreen.scrollTop() - this.jqGraphScreen.height() / 2
          , i = 1e3;
        e && (i = 0),
        this.jqGraphScreen.animate({
            scrollLeft: n,
            scrollTop: r
        }, i)
    }
}
;
var GraphNode = function(e, t, n, r) {
    var i = this
      , s = e.knotStitches[t];
    this.stitch = s,
    this.jqStitchNode = $('<div class="node">' + s.stitchHTML + "</div>"),
    this.jqStitchNode.css("width", e.nodeWidth),
    this.jqStitchNode.css("height", e.nodeHeight),
    this.jqStitchNode.css("top", s.plotY - n),
    this.jqStitchNode.css("left", s.plotX - r),
    this.jqStitchNode.css("padding", e.nodePadding),
    this.jqStitchNode.css("font-size", Math.round(e.fontHeight) + "pt");
    var o = Editor.statsLabelForStitch(s.stitch, !0);
    o.text() && (this.jqStitchNode.append('<div class="stats"><span class="important"></span></div>'),
    this.jqStitchNode.find(".important").append(o)),
    o.css("font-size", Math.round(e.fontHeight) - 1 + "pt"),
    s.inThisKnot || (s.preKnot ? this.jqStitchNode.addClass("prenode") : this.jqStitchNode.addClass("postnode"),
    this.jqStitchNode.attr("tooltip", tr("Proceed to this section"))),
    s.label && this.jqStitchNode.prepend('<div class="nodeLabel">' + s.label + "</div>");
    var u = function(e) {
        stitchInFlow(e.stitch.stitch) ? e.jqStitchNode.addClass("selected") : e.jqStitchNode.removeClass("selected")
    };
    u(i),
    e.rootStitch == s.stitch && stitchInFlow(s.stitch) && (this.jqStitchNode.addClass("focusStitch"),
    e.jqRootNode = this.jqStitchNode);
    var a = function(t, n, r) {
        if (e.rootStitch == r && stitchInFlow(r))
            return;
        if (!n)
            e.buildGraph(r);
        else {
            Editor.navigateToStitch(r);
            for (var i = 0; i < e.nodes.length; i++)
                u(e.nodes[i]),
                e.nodes[i].jqStitchNode.removeClass("focusStitch");
            for (var s = 0; s < e.arrows.length; s++)
                stitchLink(e.arrows[s].fromStitch, e.arrows[s].toStitch) ? e.arrows[s].jqArrow.addClass("travelled") : e.arrows[s].jqArrow.removeClass("travelled");
            e.jqRootNode = t.jqStitchNode,
            t.jqStitchNode.addClass("focusStitch"),
            e.rootStitch = r,
            e.scrollToFocus()
        }
    };
    this.jqStitchNode.bind("dblclick", function() {
        a(i, s.inThisKnot, s.stitch),
        e.close()
    }),
    this.jqStitchNode.bind("click", function() {
        return a(i, s.inThisKnot, s.stitch),
        !1
    })
}
  , Dialogue = function(e) {
    var t = $(window)
      , n = null
      , r = null
      , i = null
      , s = null
      , o = null
      , u = null
      , a = null
      , f = !1;
    e.title = e.title || "",
    e.message = e.message || "",
    e.footer = e.footer || "";
    var l = function(e) {
        if (f)
            return e.preventDefault(),
            !1;
        if (e.which === 13) {
            var t = u.find(".button");
            if (t.length > 0) {
                e.preventDefault();
                var n = t.last();
                return n.click(),
                !1
            }
        } else if (e.which === 27) {
            var t = u.find(".button");
            t.each(function() {
                var t = $(this);
                if (t.text().match(/cancel/i))
                    return t.click(),
                    e.preventDefault(),
                    !1
            })
        }
        return !0
    }
      , c = function() {
        n = $("<div class='eventAbsorber'></div>"),
        $("body").append(n),
        r = $("<div class='dialogue'><div id='bg'></div>                             <div id='content'>                                 <h1>" + e.title + "</h1>                                 <p>" + e.message + "</p>                             </div>                             <div id='footer'></div>                             <div id='buttons'></div>                         </div>"),
        $("body").append(r),
        r.focus(),
        i = r.find("#content"),
        u = r.find("#buttons"),
        s = r.find("#footer"),
        e.footer && s.append(e.footer),
        Dialogue.keypressBoundFunction && $("body").unbind("keyup", Dialogue.keypressBoundFunction),
        $("body").bind("keyup", l),
        Dialogue.keypressBoundFunction = l,
        p()
    }
      , h = function(e) {
        f || ($("body").unbind("keyup", l),
        Dialogue.keypressBoundFunction === l && (Dialogue.keypressBoundFunction = null),
        n.remove(),
        r.css("pointer-events", "none").animate({
            opacity: 0
        }, {
            complete: function() {
                $(this).remove()
            }
        }),
        f = !0,
        !e && StoryModel.stitches.length == 0 && (EditorAccount.signedIn() ? EditorMenu.createNew() : new Splash))
    }
      , p = function() {
        if (i) {
            var e = i.outerHeight()
              , n = u.height()
              , o = s.height();
            r.height(e + n + o + 10)
        }
        r.css({
            left: .5 * t.width() - .5 * r.width(),
            top: .5 * t.height() - .5 * r.height()
        })
    }
      , d = function(e) {
        o || (o = $('<div class="fields"></div>'),
        i.append(o)),
        o.append(e),
        p()
    }
      , v = function(e) {
        return {
            value: function(t) {
                if (t === undefined)
                    return e.find("input").val();
                e.find("input").val(t)
            },
            $: e,
            focus: function() {
                e.find("input").focus()
            },
            select: function() {
                e.find("input").select()
            }
        }
    }
      , m = function(e) {
        var t;
        return e ? t = $('<div class="field"><div id="label">' + e + ':</div><span class="A"><input type="text" label="' + e + '"/></span></div>') : t = $('<div class="field"><span class="A"><input type="text"/></span></div>'),
        d(t),
        v(t)
    }
      , g = function(e) {
        var t = $('<div class="field"><div id="label">' + e + ':</div><span class="A"><input type="password" label="' + e + '"></span></div>');
        return d(t),
        v(t)
    }
      , y = function(e) {
        var t = $("<p></p>");
        return t.append(e),
        i.append(t),
        p(),
        t
    }
      , b = function(e) {
        i.find(".message").remove(),
        y('<div class="message">' + e + "</div>")
    }
      , w = function(e, t) {
        e = e || "",
        t = t || h;
        var n = $('<div class="button">' + e + "</div>");
        u.append(n);
        var r = function(e) {
            n.unbind("click tap"),
            e && n.bind("click tap", function() {
                t.apply(i)
            })
        }
          , i = {
            disable: function() {
                n.addClass("disabled"),
                r(!1)
            },
            enable: function() {
                n.removeClass("disabled"),
                r(!0)
            },
            $: n
        };
        return r(!0),
        i
    };
    return c(),
    a = {
        addField: m,
        addSecureField: g,
        addButton: w,
        addContent: y,
        setMessage: b,
        sizeToFit: p,
        close: h,
        $: r
    },
    a
};
$(window).on("resize", (a,b,c) => { 
  $([".splash", ".dialogue"]).each( (key,element) => { 
      $(element).css("top",  ($(window).innerHeight() - $(element).height() ) / 2 ); 
      $(element).css("left", ( $(window).innerWidth() - $(element).width() ) / 2 );
  })
})

Dialogue.keypressBoundFunction = null,
activeTooltip = null;
var ToolTip = function(e, t, n) {
    var r = this;
    activeTooltip && activeTooltip.removeTip(),
    activeTooltip = r;
    var i = $("#main_viewport")
      , s = i.height()
      , o = i.width();
    r.jqToolTip = $("<div id='tooltip'>" + e + "</div>");
    var u = t.offset();
    t.after(r.jqToolTip),
    r.jqToolTip.hide();
    var a = r.jqToolTip.height()
      , f = r.jqToolTip.width()
      , l = u.top + t.height() + 3
      , c = n.pageX - f / 2;
    l + a > s - 10 && (l = s - 10 - a,
    c < o / 2 ? c += 2 * f / 3 : c -= 2 * f / 3),
    c < 5 && (c = 10),
    c + f > o - 10 && (c = o - 10 - f),
    r.jqToolTip.css("top", l),
    r.jqToolTip.css("left", c),
    this.stillRequired = !0,
    setTimeout(function() {
        r.stillRequired && r.jqToolTip.fadeIn("slow")
    }, 500),
    t.bind("mouseleave", function() {
        r.removeTip()
    }),
    t.bind("click", function() {
        r.removeTip()
    })
};
ToolTip.prototype.removeTip = function() {
    return this.jqToolTip.fadeOut("slow").remove(),
    this.stillRequired = !1,
    activeTooltip = null,
    !0
}
,
$("[tooltip]").live("mouseenter", function(e) {
    var t = $(this);
    if (t.attr("id") != "tooltip")
        var n = new ToolTip(t.attr("tooltip"),t,e)
});
var Editor = function() {
    this.joinButton = null,
    this.newOptionButton = null,
    this.joiningMode = !1,
    this.editorSizes = ["normal", "compact", "dense"];
    var e = 0
      , t = {
        conditionals: !0,
        animations: !0,
        graphing: !0,
        images: !0,
        find: !0
    }
      , n = []
      , r = []
      , i = null
      , s = null
      , o = []
      , u = !1
      , a = function(e) {
        e === null && i && (i.cursorPos = {}),
        e != i && (i && i.setCurrent(!1),
        e && e.setCurrent(!0),
        i = e)
    }
      , f = function(e, t) {
        var r = $("<div class='important'></div>");
        if (e) {
            var i = e.stats();
            if (i.numOptions > 0) {
                if (!t) {
                    var s = i.numLinked == 1 ? "link" : "links";
                    i.numLinked > 0 && r.append(i.numLinked + " " + s + ".")
                }
                var o = 0;
                if (i.numLooseEnds > 0) {
                    var u = i.numLooseEnds > 1 ? "ends " : "end ";
                    r.append(" " + i.numLooseEnds + " loose " + u + "(");
                    var a = "";
                    i.looseEnds.each(function() {
                        var t = $("<span optIdx = " + o + " class='shortcut' tooltip='"+ tr("Write from here")+"'></span>");
                        this.text() !== "" ? t.text(a + this.text()) : t.text(a + "..."),
                        t.bind("click tap", function() {
                            var t = i.looseEnds[$(this).attr("optIdx")];
                            if (n.last().sourceOption == t)
                                return;
                            $("#graphContainer").remove(),
                            $(".eventAbsorber").remove(),
                            j(e),
                            P(t)
                        }),
                        r.append(t),
                        a = ", ",
                        o++
                    }),
                    r.append("<span>)</span>")
                }
            }
            if (i.deadEnd) {
                var f = $("<span class='shortcut' tooltip='"+ tr("Continue from here") +"'>End.</span>");
                f.bind("click tap", function() {
                    $("#graphContainer").remove(),
                    j(e),
                    vt()
                }),
                r.append(f)
            }
        }
        return r
    }
      , l = function(e, t) {
        var r = this;
        this.stitch = null,
        this.ownerChunk = t,
        this.textChanged = !1,
        this.bind = new Bind(this),
        this.cursorPos = {};
        var o = "";
        e && (o = b(e.text()),
        this.stitch = e,
        this.stitch._stitchBox = this),
        this.jqStitchBox = $('<div class="stitchBox">                                  <div class="stitchBoxBackground">                                     <div class="paper-top"></div>                                     <div class="paper-mid"></div>                                     <div class="paper-bottom"></div>                                  </div>                                  <div class="pageBox" tooltip="Click to edit the section name"> </div>                                  <div class="flagBox">                                     <div id="flagBoxBackgroundLeft">                                         <img src="/img/bookmark-left.png"></img>                                     </div>                                     <div id="flagBoxBackgroundRight">                                         <img src="/img/bookmark-end.png"></img>                                     </div>                                     <ul id="flags">                                     </ul>                                  </div>                                  <div class="stitchImage" tooltip="Click to edit this image"><img/></div/>                                  <div class="stitchText" contentEditable="true">' + o + "</div>" + W() + "</div>"),
        this.jqStitchBoxText = this.jqStitchBox.find(".stitchText"),
        this.jqImageRegion = this.jqStitchBox.find(".stitchImage"),
        this.jqImage = this.jqImageRegion.find("img"),
        this.jqImage.bind("click tap", function() {
            r.focus(),
            S.insertImage()
        }),
        X(this, this.jqStitchBox, e),
        e || this.updateBlankProperty(),
        this.jqStitchBoxText.bind("paste", function(e) {
            setTimeout(function() {
                var e = y(cleanWordPaste(r.jqStitchBoxText.html()))
                  , t = e.split(/\n/).clean("")
                  , n = r;
                for (var i = 0; i < t.length - 1; i++)
                    n = n.insertBelow({
                        left: t[i],
                        right: ""
                    });
                n.jqStitchBoxText.html(b(t.last()))
            }, 4)
        }),
        this.jqStitchBoxText.bind("keydown", function(e) {
            var t = e.altKey || e.ctrlKey || e.shiftKey || e.metaKey;
            e.which == 66 && t && !e.shiftKey && (document.execCommand("bold", !1, null),
            e.preventDefault()),
            e.which == 73 && t && !e.shiftKey && (document.execCommand("italic", !1, null),
            e.preventDefault());
            if (e.which === 13) {
                e.preventDefault();
                if (t) {
                    r.ownerChunk != n.last() && H(r.ownerChunk),
                    vt();
                    return
                }
                if (!r.hasContent() && !r.numberOfFlags())
                    return;
                r.stitch || (r.createStitch(),
                k.update()),
                U(),
                r.bind.handle("returnPressed"),
                e.preventDefault()
            } else if (e.which == 37 && t) {
                if (r.ownerChunk != n.last())
                    return H(r.ownerChunk),
                    r.jqStitchBoxText.focus(),
                    e.preventDefault(),
                    !1
            } else {
                if (e.which == 38 && r.cursorPos.farLeft && r != n[0].stitchBoxes[0])
                    return r.bind.handle("upKeyPressed"),
                    e.preventDefault(),
                    !1;
                if (e.which == 40 && r.cursorPos.farRight)
                    return r.bind.handle("downKeyPressed"),
                    e.preventDefault(),
                    !1;
                if (e.which == 8) {
                    if (r.stitch && r.stitch.image() && (!r.hasContent() || r.cursorPos.farLeft && r.cursorPos.collapsed))
                        return T(r.stitch, null),
                        e.preventDefault(),
                        !1;
                    if (!r.hasContent())
                        return r.bind.handle("finalBackspace"),
                        e.preventDefault(),
                        !1;
                    if (r.cursorPos.farLeft && r.cursorPos.collapsed && r != r.ownerChunk.stitchBoxes[0]) {
                        var s = r.jqStitchBoxText.html();
                        return r.bind.handle("finalBackspace"),
                        i && (i.jqStitchBoxText.append(s),
                        i.reflectToModel()),
                        r.reflectToModel(),
                        e.preventDefault(),
                        !1
                    }
                }
            }
        }),
        this.jqStitchBoxText.bind("keyup", function(e) {
            r.captureCursor(),
            e.which != 13 && r.reflectToModel(),
            e.which >= 37 && e.which <= 40 || (r.textChanged = !0),
            r.updateBlankProperty()
        }),
        this.jqStitchBoxText.bind("focus", function() {
            i && p(r, i.ownerChunk),
            a(r),
            r.updateBlankProperty(),
            s = null,
            k.update(),
            moveCaretToEndOf(this),
            ct(this),
            r.bind.handle("focus"),
            r.jqStitchBox.addClass("selected"),
            U(),
            I(),
            r.captureCursor(),
            r.stitch ? x(r.stitch.image()) : x(!1)
        }),
        this.jqStitchBoxText.bind("focusout", function(e) {
            x(!1),
            r.jqStitchBox.removeClass("selected");
            if (r.stitch) {
                r.jqStitchBoxText.html(g($(this).html()));
                var t = r.ownerChunk.jqChunk.find(".rewindButton");
                t.addClass("noText"),
                t.empty()
            }
            r.updateBlankProperty(),
            !u && r.textChanged && (r.textChanged = !1,
            EditorMenu.requireSave())
        }),
        this.jqStitchBoxText.bind("mousedown", function() {
            $(document).bind("mouseup", function() {
                r.captureCursor(),
                $(document).unbind("mouseup")
            })
        }),
        e && this.jqStitchBox.data("stitch", e),
        this.jqStitchBox.data("stitchBox", this),
        r.setUpFlagBox(),
        e ? (r.setUpPageButton(),
        e._backlinks.length > 1 && this.jqStitchBox.prepend("<div class='backlinks'>" + tr("&count links in", {count:e._backlinks.length}) + "</div>"),
        e.runOn() && r.displayEllipsisSymbol(!0),
        r.displayImage(e.image())) : (this.jqStitchBox.find(".pageBox").hide(),
        r.jqImageRegion.hide())
    };
    l.prototype.createStitch = function(e) {
        return this.stitch = StoryModel.createStitch(e),
        this.stitch._stitchBox = this,
        X(this, this.jqStitchBox, this.stitch),
        this.bind.handle("stitchAdded"),
        this.updateBlankProperty(),
        this.setLeadingEdge(),
        EditorMenu.requireSave(),
        this.stitch
    }
    ,
    l.prototype.reflectToModel = function() {
        var e = y(this.jqStitchBoxText.html());
        this.stitch ? this.stitch.text(e) : $.trim(e).length > 0 && (this.createStitch(e),
        k.update(),
        this.setUpPageButton()),
        k.expanded && k.jqActiveStitchRowText.html(this.jqStitchBoxText.html())
    }
    ,
    l.prototype.setStitch = function(e) {
        this.stitch = e,
        this.jqStitchBoxText.text(this.stitch.text()),
        this.updateBlankProperty()
    }
    ,
    l.prototype.focus = function() {
        this.jqStitchBoxText.focus()
    }
    ,
    l.prototype.displayEllipsisSymbol = function(e) {
        e ? this.jqStitchBoxText.after('<div id="ellipsis">[...]</div>') : this.jqStitchBox.find("#ellipsis").remove()
    }
    ,
    l.prototype.displayImage = function(e) {
        e ? (this.jqImage.attr("src", e),
        this.jqImageRegion.show()) : this.jqImageRegion.hide()
    }
    ,
    l.prototype.remove = function() {
        var e = this;
        if (e.stitch) {
            e.stitch._stitchBox = null;
            for (var r = n.length; r >= 0 && !this.stitch._stitchBox; r--)
                n[r] && n[r].stitchBoxes.each(function() {
                    this.stitch === e.stitch && this !== e && (this.stitch._stitchBox = this)
                })
        }
        t.animations ? this.jqStitchBox.slideUp("slow", function() {
            $(this).remove()
        }) : this.jqStitchBox.remove()
    }
    ,
    l.prototype.allowDetach = function(e) {
        var t = this
          , r = this.jqStitchBox.find(".unjoinButton");
        if (e && r.length == 0) {
            var i = $('<div class="unjoinButton" tooltip="' + tr("Unlink these two paragraphs") + '>' + tr("Unlink") + '</div>')
              , s = this.ownerChunk.stitchBoxes.prev(t);
            this != this.ownerChunk.stitchBoxes.first() ? i.addClass("directlinked") : (i.addClass("optionlinked"),
            s = n.prev(this.ownerChunk).stitchBoxes.last()),
            this.jqStitchBox.append(i),
            i.bind("click tap", function() {
                if (!confirm(tr("Unlink these two paragraphs? This will create a new loose end here. Unattached paragraphs will still appear in the contents list.")))
                    return !1;
                var e = null
                  , r = null;
                n.each(function() {
                    this.stitchBoxes.each(function() {
                        !r && this.stitch == s.stitch && (e = this.ownerChunk.stitchBoxes.next(this),
                        e || (e = n.next(this.ownerChunk).stitchBoxes.first()),
                        e.stitch == t.stitch && (r = this.ownerChunk))
                    })
                }),
                e.ownerChunk.detachStitchBoxAndChildren(e),
                H(r),
                r.stitchBoxes.last().setLeadingEdge(),
                StoryModel.updateGraphModel(),
                k.update()
            })
        } else
            !e && r.length > 0 && r.remove()
    }
    ,
    l.prototype.trimmedText = function() {
        return this.stitch ? $.trim(this.stitch.text()) : ""
    }
    ,
    l.prototype.hasContent = function() {
        return this.trimmedText().length > 0
    }
    ,
    l.prototype.insertBelow = function(e) {
        var t = this
          , n = t.ownerChunk;
        t.jqStitchBoxText.empty(),
        t.jqStitchBoxText.append(e.left),
        t.reflectToModel();
        if (t == n.stitchBoxes.last()) {
            var r = n.addNewBlankStitchBox();
            e.right.length > 0 && (r.createStitch(e.right),
            r.jqStitchBoxText.append(e.right))
        } else {
            var i = t.stitch
              , s = StoryModel.createStitch(e.right)
              , o = n.stitchBoxes.next(t).stitch;
            t.stitch.undivert(),
            t.stitch.divert(s),
            s.divert(o),
            r = new l(s,n),
            n.addStitchBox(r, t)
        }
        return StoryModel.updateGraphModel(),
        k.update(),
        t.hasContent() || t.numberOfFlags() ? (r.focus(),
        moveCaretToStartOf(r.jqStitchBoxText[0])) : t.focus(),
        r
    }
    ,
    l.prototype.updateBlankProperty = function() {
        if (this == n.first().stitchBoxes[0])
            return;
        this.hasContent() ? (this.jqStitchBox.removeClass("blank"),
        this.jqStitchBoxText && this.jqStitchBoxText.removeClass("blank")) : (this.jqStitchBox.addClass("blank"),
        this.jqStitchBoxText && this.jqStitchBoxText.addClass("blank")),
        U()
    }
    ,
    l.prototype.numberOfFlags = function() {
        return this.stitch ? this.stitch.numberOfFlags() : 0
    }
    ,
    l.prototype.flagByIndex = function(e) {
        return this.stitch ? this.stitch.flagByIndex(e) : ""
    }
    ,
    l.prototype.editFlag = function(e, t) {
        return this.stitch || this.createStitch(),
        this.stitch.editFlag(e, t)
    }
    ,
    l.prototype.flagIsUsed = function(e, t) {
        return this.stitch ? this.stitch.flagIsUsed(e, t) : !1
    }
    ,
    l.prototype.setUpFlagBox = function() {
        var e = this
          , r = this.jqStitchBox.find(".flagBox");
        navigator.appName == "Microsoft Internet Explorer" && r.addClass("usingIE");
        var i = function(t, n) {
            r.removeClass("unused"),
            K(),
            new it(t,n,e.stitch,function(e, t) {
                return !e.flagIsUsed(t)
            }
            ,function(n, i) {
                if (n != "" && n && !e.flagIsUsed(n, !0)) {
                    if (!i) {
                        var s = o(n);
                        s.insertBefore(t)
                    } else
                        i != n && (t.text(n),
                        e.editFlag(i, !1));
                    e.editFlag(n, !0),
                    EditorMenu.requireSave(),
                    h(),
                    k.update()
                } else
                    e.numberOfFlags() == 0 && r.addClass("unused")
            }
            )
        }
          , s = function() {
            return "<div class='icon'></div><span class='entertext add'>" + tr("Add marker") + "</span>"
        }
          , o = function(t) {
            var n = $("<li class='flag'><div class='remove icon'></div><span class='entertext'>" + t + "</span></li>");
            return n.bind("click tap", function() {
                a(e);
                var t = $(this);
                i(t, t.text())
            }),
            n.find(".remove").bind("click tap", function() {
                return e.editFlag(t, !1),
                n.remove(),
                e.numberOfFlags() == 0 && r.addClass("unused"),
                EditorMenu.requireSave(),
                h(),
                k.update(),
                !1
            }),
            n
        };
        if (!t.conditionals) {
            r.remove();
            return
        }
        if (this.ownerChunk == n.first())
            r.remove();
        else {
            var u = r.find("#flags");
            u.empty(),
            r.click(function() {
                a(e)
            });
            var f = this.numberOfFlags();
            if (f > 0)
                for (var l = 0; l < f; l++) {
                    var c = o(e.flagByIndex(l));
                    u.append(c)
                }
            else
                r.addClass("unused");
            var p = $('<li class="addFlag">' + s() + "</li>");
            u.append(p),
            p.bind("click tap", function() {
                e.stitch || e.createStitch(""),
                i(p, "")
            }),
            e.enableFlagEditing(!1)
        }
    }
    ,
    l.prototype.enableFlagEditing = function(e) {
        var t = this.jqStitchBox.find(".flagBox")
          , n = t.find(".addFlag")
          , r = t.find(".remove.icon");
        if (e)
            t.show(),
            n.show(),
            r.show();
        else {
            var i = t.find(".flag").length > 0;
            i ? (n.hide(),
            r.hide()) : t.hide()
        }
    }
    ;
    var c = function() {
        for (var e = 0; e < n.length; e++)
            for (var t = 0; t < n[e].stitchBoxes.length; t++) {
                var r = n[e].stitchBoxes[t].stitch.pageNumberLabel();
                r > 0 && n[e].stitchBoxes[t].jqStitchBox.find(".page_label").text(n[e].stitchBoxes[t].stitch.pageLabelText())
            }
    };
    l.prototype.setUpPageButton = function() {
        $(".pageBox").each(function() {
            $(this).hasClass("labelled") || ($(this).empty(),
            $(this).hide())
        });
        var e = this
          , t = e.jqStitchBox.find(".pageBox");
        t.empty();
        if (e.stitch.pageNumberLabel() > 0) {
            var n = !1
              , r = e.stitch.pageLabelText()
              , s = $("<div><div class='page_button minus' tooltip='"+tr("Remove this label")+"'></div><div class='page_label' contenteditable='true'> " + r + "</div></div>")
              , o = s.find(".page_label");
            o.bind("keydown", function(e) {
                e.which == 13 && e.preventDefault()
            }),
            o.bind("keyup", function() {
                var t = $(this).text();
                t.match(/^\s*Section\s+\d+\s*$/) && (t = ""),
                e.stitch.pageLabelText(t),
                event.which >= 37 && event.which <= 40 || (n = !0)
            }),
            o.bind("focusout", function() {
                var t = $(this);
                t.text(e.stitch.pageLabelText()),
                n && (EditorMenu.requireSave(),
                n = !1)
            }),
            s.bind("dblclick", function() {
                if (i && e.ownerChunk == i.ownerChunk)
                    return !0;
                H(e.ownerChunk),
                e.focus()
            }),
            s.bind("click tap", function() {
                selectElement(o[0])
            });
            var u = s.find(".minus");
            e.stitch.pageNumberLabel() == 1 ? u.remove() : (u.hide(),
            t.bind("mouseenter", function() {
                u.show(),
                t.css("min-width", t.width() + 10)
            }),
            t.bind("mouseleave", function() {
                u.hide(),
                t.css("min-width", "")
            }),
            u.bind("click tap", function() {
                return StoryModel.removePageNumber(e.stitch),
                StoryModel.updateGraphModel(),
                k.update(),
                t.hide(),
                c(),
                EditorMenu.requireSave(),
                !1
            })),
            t.addClass("labelled")
        } else {
            if (StoryModel.pageSize(e.stitch.pageNumber()) <= StoryModel.maxPreferredPageLength / 2 || e.stitch.verticalDistanceFromHeader() < 2)
                return;
            var s = $("<div><div class='page_button plus'> + </div><div class='page_label'>New Section?</div></div>");
            t.removeClass("labelled"),
            s.bind("click tap", function() {
                return e.createPageNumber(),
                !1
            })
        }
        t.append(s),
        t.show()
    }
    ,
    l.prototype.createPageNumber = function() {
        StoryModel.insertPageNumber(this.stitch, !0),
        this.setUpPageButton(),
        StoryModel.updateGraphModel(),
        k.update()
    }
    ,
    l.prototype.setCurrent = function(e) {
        this.enableFlagEditing(e)
    }
    ,
    l.prototype.setLeadingEdge = function() {
        $(".stitchBox.leading-edge").removeClass("leading-edge"),
        this.jqStitchBox.addClass("leading-edge")
    }
    ;
    var h = function() {
        for (var e = 0; e < r.length; ++e)
            G(r[e].jqOption, r[e].storyOption)
    }
      , p = function(e, t) {
        t || (t = n.last()),
        t.stitchBoxes.length > 1 && t.stitchBoxes.each(function() {
            var t = !1;
            this.stitch ? t = this.stitch != StoryModel.initialStitch && !this.hasContent() && !this.stitch.image() && !et(this.stitch) && this.stitch.numberOfFlags() == 0 : t = !0,
            t && this != e && this.bind.handle("finalBackspace")
        }),
        n.each(function() {
            this.stitchBoxes.each(function() {
                this != e && (et(this.stitch) || (this.jqCondElement.hide(),
                this.jqStitchBox.removeClass("conditionalised")))
            })
        }),
        r.each(function() {
            this != e && (this.storyOption.text() === "" && this.linkStitch() === null ? this.deleteOption() : et(this.storyOption) || (this.jqCondElement.hide(),
            this.jqOption.removeClass("conditionalised")))
        })
    };
    l.prototype.captureCursor = function() {
        var e = rangy.getSelection();
        if (e.rangeCount > 0) {
            var t = e.getRangeAt(0);
            this.cursorPos.start = t.startOffset,
            this.cursorPos.startContainer = t.startContainer,
            this.cursorPos.end = t.endOffset,
            this.cursorPos.endContainer = t.endContainer,
            this.cursorPos.collapsed = t.collapsed,
            this.cursorPos.farLeft = doesSelectionStartAtEdgeOfJqItem(this.jqStitchBoxText, t, !0),
            this.cursorPos.farRight = doesSelectionStartAtEdgeOfJqItem(this.jqStitchBoxText, t, !1)
        }
    }
    ;
    var d = function() {
        this.stitchBoxes = [],
        this.jqRewindButton = null,
        this.jqChunk = $('<div class="chunk">                             <div class="chunkStatsLabel">End.</div>                           </div>'),
        this.jqChunk.data("Chunk", this),
        $(".options").before(this.jqChunk),
        this.jqStatsLabel = this.jqChunk.find(".chunkStatsLabel");
        var e = this
    };
    d.prototype.addRewindButton = function() {
        var e = this;
        this.jqRewindButton = $('<div class="rewindButton noText" tooltip="'+tr("Rewind to here")+'"></div>'),
        this.stitchBoxes.first().jqStitchBox.append(this.jqRewindButton),
        this.jqRewindButton.bind("mousedown", function() {
            H(e)
        }),
        this.jqRewindButton.hide()
    }
    ,
    d.prototype.addStitchBox = function(e, t) {
        var i = this;
        t === undefined ? (this.stitchBoxes.push(e),
        this.jqChunk.append(e.jqStitchBox)) : (t.jqStitchBox.after(e.jqStitchBox),
        i.stitchBoxes.splice(i.stitchBoxes.indexOf(t) + 1, 0, e)),
        e.stitch && e.setUpPageButton(),
        e.bind("focus", function() {
            K();
            var t = i.jqChunk.find(".rewindButton");
            t.removeClass("noText"),
            t.text("shift-left"),
            $(".unjoinButton").remove(),
            (i != n.first() || e != i.stitchBoxes.first()) && i == n.last() && (e.allowDetach(!0),
            U())
        }),
        e.bind("returnPressed", function() {
            if (e.cursorPos.farLeft && e == n.first().stitchBoxes.first())
                return;
            var t = getContentFromCursor(e);
            e.insertBelow(t)
        }),
        e.bind("upKeyPressed", function() {
            var e = i.stitchBoxes.prev(this);
            if (e == null && i == n.first())
                return;
            e ? e.focus() : n.prev(i).stitchBoxes.last().focus()
        }),
        e.bind("downKeyPressed", function() {
            var e = i.stitchBoxes.next(this);
            if (e)
                e.focus(),
                moveCaretToStartOf(e.jqStitchBoxText[0]);
            else if (n.next(i)) {
                var e = n.next(i).stitchBoxes[0];
                e.focus(),
                moveCaretToStartOf(e.jqStitchBoxText[0])
            } else
                r.length == 0 ? vt() : r.first().focus()
        }),
        e.bind("finalBackspace", function() {
            var e = i.stitchBoxes.prev(this);
            if (e == null && i == n.first())
                return;
            i.removeStitchBoxAndRelink(this, !0),
            e ? (e.focus(),
            e.setLeadingEdge()) : i.stitchBoxes.length == 0 ? r.last().focus() : i.stitchBoxes.first().focus(),
            U()
        }),
        U()
    }
    ,
    d.prototype.addNewBlankStitchBox = function(e) {
        var t = this
          , r = new l(undefined,t);
        return this.addStitchBox(r),
        r.bind("stitchAdded", function() {
            var e = this;
            if (t.stitchBoxes.length == 1) {
                t.sourceOption.linkStitch(e.stitch);
                var r = n.prev(t);
                r && r.updateStatsLabel(),
                t.updateStatsLabel()
            } else if (t.stitchBoxes.length > 1) {
                var i = t.stitchBoxes.length - 2
                  , s = t.stitchBoxes[i]
                  , o = s.stitch
                  , u = e.stitch;
                O(o, u),
                o.divert(e.stitch)
            }
            U(),
            I()
        }),
        r.setLeadingEdge(),
        r
    }
    ,
    d.prototype.removeStitchBoxAndRelink = function(e, t) {
        var r = this;
        if (r.stitchBoxes.length > 0) {
            var i = this.stitchBoxes.prev(e)
              , s = this.stitchBoxes.next(e);
            s && !s.stitch && s.createStitch(""),
            e == this.stitchBoxes.first() ? (e.stitch && e.stitch.undivert(),
            r.sourceOption && (s ? r.sourceOption.linkStitch(s.stitch) : r.sourceOption.unlink())) : (e == this.stitchBoxes.last() ? e.stitch && (i.stitch.undivert(),
            O(e.stitch, i.stitch)) : (e.stitch && e.stitch.undivert(),
            i.stitch.divert(s.stitch)),
            e.stitch && StoryModel.repointStitchToStitch(e.stitch, i.stitch)),
            t && e.stitch && StoryModel.removeStitch(e.stitch),
            r.stitchBoxes.remove(e),
            e.remove(),
            r.stitchBoxes.length == 0 && H(n.prev(r)),
            StoryModel.updateGraphModel(),
            k.update(),
            U(),
            I(),
            EditorMenu.requireSave()
        }
    }
    ,
    d.prototype.detachStitchBoxAndChildren = function(e) {
        var t = this
          , r = t.stitchBoxes.indexOf(e);
        if (r >= 0) {
            if (e == this.stitchBoxes.first())
                t.sourceOption && t.sourceOption.unlink();
            else {
                var i = this.stitchBoxes.prev(e);
                i.stitch.undivert()
            }
            var s = t.stitchBoxes.length - r
              , o = t.stitchBoxes.splice(r, s);
            o.each(function() {
                this.remove()
            }),
            t.stitchBoxes.length == 0 ? H(n.prev(t)) : M(),
            k.update(),
            U(),
            EditorMenu.requireSave()
        }
    }
    ,
    d.prototype.joinStitchBoxToStitch = function(e, t) {
        var n = this;
        e.stitch || e.createStitch(),
        e.stitch.divert(t),
        this.fillFromStitch(t);
        var r;
        return r = n.stitchBoxes.next(e),
        n.updateStatsLabel(),
        r
    }
    ,
    d.prototype.remove = function() {
        t.animations ? this.jqChunk.slideUp("slow", function() {
            $(this).remove()
        }) : this.jqChunk.remove()
    }
    ,
    d.prototype.fillFromStitch = function(e) {
        var t = 0
          , r = []
          , i = e;
        while (i) {
            t++;
            if (t > 15 && r.contains(i)) {
                alert("infinite loop detected, starting from '" + e.text() + "'' (fillFromStitch).");
                return
            }
            r.push(i),
            this.addStitchBox(new l(i,this)),
            i = i.divert()
        }
        a(n.last().stitchBoxes.last()),
        n.last().stitchBoxes.last().setLeadingEdge()
    }
    ,
    d.prototype.fillFromOption = function(e) {
        this.sourceOption = e;
        var t = e.linkStitch()
          , n = e.text();
        n == "" && (n = "unlabelled option");
        if (t)
            this.fillFromStitch(t);
        else
            var r = this.addNewBlankStitchBox()
    }
    ,
    d.prototype.lastStitchBox = function() {
        return this.stitchBoxes.last()
    }
    ,
    d.prototype.lastStitch = function() {
        var e = this.lastStitchBox();
        if (!e)
            return null;
        if (e.stitch)
            return e.stitch;
        var t = this.stitchBoxes.prev(e);
        if (t && t.stitch)
            return t.stitch
    }
    ,
    d.prototype.createOptions = function() {
        var e = this.lastStitch();
        if (e)
            for (var t = 0; t < e.options.length; ++t) {
                var n = e.options[t];
                r.push(new v(n,e))
            }
        this.updateStatsLabel(),
        this.setLeadingEdge()
    }
    ,
    d.prototype.updateStatsLabel = function() {
        this.jqStatsLabel.empty(),
        this.jqStatsLabel.append(f(this.lastStitch()))
    }
    ,
    d.prototype.setLeadingEdge = function() {
        $(".chunk.leading-edge").removeClass("leading-edge"),
        this.jqChunk.addClass("leading-edge")
    }
    ;
    var v = function(e, t) {
        var i = this;
        this.storyOption = e,
        this.ownerStitch = t,
        i.textChanged = !1,
        this.jqOption = $('<div class="option"><div contentEditable="true" class="optionText">' + e.text() + "</div>" + '<div class="linkDeleteButton" tooltip="Delete this option"></div>' + '<div class="followLinkButton disabled" tooltip="Follow this option"></div>' + W() + "</div>"),
        this.jqOption.data("option", this),
        $(".options").append(this.jqOption),
        this.jqOptionText = this.jqOption.find(".optionText"),
        this.jqOptionText.bind("keydown", function(e) {
            var t = !1;
            e.which == 27 && i.text().length == 0 && (t = !0);
            if (e.which == 13) {
                e.preventDefault(),
                m(i);
                if (e.altKey || e.ctrlKey || e.shiftKey) {
                    i == r.last() ? vt() : r.next(i).jqOptionText.focus();
                    return
                }
                i.jqOptionText.text() && P(i),
                e.preventDefault()
            } else {
                if (e.which == 8 && i.text().length == 0) {
                    var s = r.indexOf(i) - 1;
                    return i.deleteOption(),
                    s >= 0 ? r[s].jqOptionText.focus() : n.last().lastStitchBox().focus(),
                    e.preventDefault(),
                    !1
                }
                if (e.which == 38 || t)
                    return r.prev(i) ? r.prev(i).jqOptionText.focus() : n.last().lastStitchBox().focus(),
                    e.preventDefault(),
                    !1;
                if (e.which == 40)
                    return r.next(i) ? r.next(i).jqOptionText.focus() : vt(),
                    e.preventDefault(),
                    !1
            }
        }),
        this.jqOptionText.bind("keyup", function(e) {
            e.which != 13 && (m(i),
            i.reflectToModel(),
            n.last().updateStatsLabel(),
            e.which >= 37 && e.which <= 40 || (i.textChanged = !0))
        }),
        this.jqOptionText.bind("focus", function() {
            K(),
            s = i,
            i.showOptionUIElements(!0),
            p(i),
            moveCaretToEndOf(this),
            ct(this),
            U(),
            a(null)
        }),
        this.jqOptionText.bind("focusout", function() {
            i.showOptionUIElements(!1),
            i.textChanged && (EditorMenu.requireSave(),
            i.textChanged = !1)
        }),
        this.jqFollowLinkButton = this.jqOption.find(".followLinkButton"),
        this.jqFollowLinkButton.updateLink = function() {
            e.linkStitch() ? i.jqFollowLinkButton.removeClass("unlinked") : i.jqFollowLinkButton.addClass("unlinked")
        }
        ,
        this.jqFollowLinkButton.updateLink(),
        m(this),
        this.jqDeleteButton = this.jqOption.find(".linkDeleteButton"),
        this.jqDeleteButton.bind("mousedown", function() {
            i.deleteOption()
        }),
        X(this, this.jqOption, this.storyOption),
        this.jqOption.bind("mouseover", function() {
            i.showOptionUIElements(!0)
        }),
        this.jqOption.bind("mouseout", function() {
            containsCursor(i.jqOptionText) || i.showOptionUIElements(!1)
        }),
        U(),
        G(this.jqOption, this.storyOption)
    }
      , m = function(e) {
        e.jqOptionText.text() ? e.jqFollowLinkButton.hasClass("disabled") && (e.jqFollowLinkButton.removeClass("disabled"),
        e.jqFollowLinkButton.bind("click tap", function() {
            P(e)
        })) : (e.jqFollowLinkButton.addClass("disabled"),
        e.jqFollowLinkButton.unbind("click tap"))
    };
    v.prototype.showOptionUIElements = function(e) {
        e ? this.jqDeleteButton.css("display", "block") : this.jqDeleteButton.css("display", "none")
    }
    ,
    v.prototype.deleteOption = function() {
        StoryModel.removeOption(this.ownerStitch, this.storyOption),
        s = null,
        r.remove(this),
        this.remove(),
        StoryModel.updateGraphModel(),
        k.update(),
        U(),
        EditorMenu.requireSave()
    }
    ,
    v.prototype.remove = function() {
        this.jqOption.remove(),
        n.length > 0 && n.last().updateStatsLabel(),
        k.update()
    }
    ,
    v.prototype.reflectToModel = function() {
        this.storyOption.text(this.jqOptionText.text(), !0)
    }
    ,
    v.prototype.focus = function() {
        this.jqOptionText.focus()
    }
    ,
    v.prototype.text = function() {
        return this.storyOption.text()
    }
    ,
    v.prototype.linkStitch = function(e) {
        var t = this.storyOption.linkStitch(e);
        return this.jqFollowLinkButton.updateLink(),
        t
    }
    ,
    v.prototype.unlink = function() {
        this.storyOption.unlink(),
        this.jqFollowLinkButton.updateLink()
    }
    ;
    var g = function(e) {
        return b(y(e))
    }
      , y = function(e) {
        return e = e.replace(/(<B>|<STRONG>)/gi, "*-"),
        e = e.replace(/(<\/B>|<\/STRONG>)/gi, "-*"),
        e = e.replace(/(<I>|<EM>)/gi, "/="),
        e = e.replace(/(<\/I>|<\/EM>)/gi, "=/"),
        e = e.replace(/\[\.\.\.\](.+)$/, "$1[...]"),
        e = e.replace(/\<\/?span(.*?)\>|/g, ""),
        $("<div>" + e + "</div>").text()
    }
      , b = function(e) {
        e = e.replace(/\-\*/g, "</b>"),
        e = e.replace(/\=\//g, "</i>"),
        e = e.replace(/\*\-/g, "<b>"),
        e = e.replace(/\/\=/g, "<i>"),
        e = e.replace(/\[(.*?)\|(.*?)\]/g, "<span id='logic'>[</span><span id='embeddedlink'>$1</span><span id='midlink'>|</span>$2<span id='logic'>]</span>"),
        e = e.replace(/\[\s*(number|value)\s*\:\s*(.*?)\s*\]/g, "<span id='logic'>[</span><span id='sayfunction'>$1</span><span id='midlink'>:</span>$2<span id='logic'>]</span>"),
        e = e.replace(/\[\.\.\.\]\s*$/, '<span id="ellipsis" contenteditable="false" class="markup">[...]</span>');
        var t = [], n = function(e, n) {
            return n ? t.push(n(e)) : t.push(e),
            "%" + (t.length - 1) + "%"
        }, r = /\{([^\:\~]*?)\:([^\{\}\|]*)(\|([^\{\}]*))?\}/, i = /\{\~(([^\{\}]*?)(\|)([^\{\}]*?))(\|[^\{\}]*?)?\}/, s = /\{\~([^\{\}]*?)\}/, o;
        while (r.test(e) || i.test(e) || s.test(e))
            if (o = e.match(r))
                e = e.replace(r, n(o[0], o[3] ? function(e) {
                    return e.replace(/\{(.*?)\:(.*?)\|(.*?)\}/g, '<span id="logic">{$1:</span>$2<span id="midlink">|</span>$3<span id="logic">}</span>')
                }
                : function(e) {
                    return e.replace(/\{([^\|]*?)\:([^\|]*?)\}/g, '<span id="logic">{$1:</span>$2<span id="logic">}</span>')
                }
                ));
            else if (o = e.match(i)) {
                var u = "}";
                o[5] && (u = o[5] + u),
                e = e.replace(i, "{~" + n(o[1], function(e) {
                    return e.replace(/(.*?)(\|)(.*)/, '$1<span id="midlink">|</span>$3')
                }) + u)
            } else if (o = e.match(s))
                e = e.replace(s, n('<span id="logic">{~</span>' + o[1] + '<span id="logic">}</span>'));
        while (o = e.match(/\%(\d+)\%/))
            e = e.replace(/\%(\d+)\%/, t[o[1]]);
        return e
    }
      , w = {}
      , E = function() {
        w.boldWidget = new S("bold","boldType",tr("Bold")),
        w.italicWidget = new S("italic","italicType",tr("Italic")),
        w.runOnWidget = new S("runOn","appendEllipsis",tr("Run paragraphs together")),
        w.pageNumberWidget = new S("newSection","pageNumber",tr("Insert new section")),
        t.conditionals && (w.addConditionalToWhatever = new S("addCondition","conditionalElement",tr("Insert a condition to test"))),
        t.images && (w.imageWidget = new S("insertImage","insertImage",tr("Insert an image")))
    }
      , S = function(e, t, n) {
        jqWidgetElement = $('<div class="widget" id=' + e + ' tooltip="' + n + '"></div>'),
        jqWidgetElement.bind("mousedown tap", function() {
            S[t]()
        }),
        $("#widgets").append(jqWidgetElement)
    };
    S.boldType = function() {
        document.execCommand("bold", !1, null),
        i.reflectToModel()
    }
    ,
    S.italicType = function() {
        document.execCommand("italic", !1, null),
        i.reflectToModel()
    }
    ,
    S.pageNumber = function() {
        i && (i.stitch || i.createStitch()),
        i.stitch.pageNumberLabel() <= 0 && (i.createPageNumber(),
        c(),
        EditorMenu.requireSave())
    }
    ,
    S.appendEllipsis = function() {
        i && (i.stitch.runOn() ? i.stitch.runOn(!1) : i.stitch.runOn(!0),
        i.displayEllipsisSymbol(i.stitch.runOn()),
        i.reflectToModel(),
        EditorMenu.requireSave())
    }
    ;
    var x = function(e) {
        e ? $("#insertImage.widget").addClass("enabled") : $("#insertImage.widget").removeClass("enabled")
    }
      , T = function(e, t) {
        e.image(t);
        var r = !1;
        n.each(function() {
            this.stitchBoxes.each(function() {
                this.stitch === e && (this.displayImage(t),
                r || (r = !0,
                this.reflectToModel()))
            })
        }),
        x(t),
        EditorMenu.requireSave()
    };
    S.insertImage = function() {
        if (i) {
            i.stitch || i.createStitch();
            var e = i.stitch.image()
              , t = new Dialogue({
                title: tr("Choose Image"),
                message: tr("Please enter the web address of your image.")
            });
            t.$.append("<img id='imagepreview'/>");
            var n = t.$.find("img")
              , r = t.addField("Image");
            e && r.value(e);
            var s = function(e) {
                n.show(),
                r.value(e),
                n.attr("src", e),
                o.enable()
            }
              , o = t.addButton("Use", function() {
                if (r.value() === "")
                    return;
                T(i.stitch, r.value()),
                t.close()
            });
            r.value() === "" ? (o.disable(),
            n.hide()) : (s(r.value()),
            t.addButton("Remove", function() {
                T(i.stitch, null),
                t.close()
            })),
            r.$.bind("keyup paste", function() {
                setTimeout(function() {
                    var e = r.value();
                    e.match(/^http\:\/\/www\.google\.com/) && (e = e.replace(/^.*imgurl\=(.*?)\&.*$/, "$1"));
                    var t = /^\S+\.(png|jpg|jpeg|gif)$/i;
                    if (e.match(t))
                        s(e);
                    else {
                        if (!e.match(/^data\:image/)) {
                            n.hide(),
                            o.disable();
                            return
                        }
                        s(e)
                    }
                }, 0)
            }),
            t.addButton(tr("Cancel"))
        }
    }
    ,
    S.conditionalElement = function() {
        s ? (s.jqCondElement.show(),
        s.jqOption.addClass("conditionalised")) : i && (i.stitch || n.last().stitchBoxes.last().createStitch(),
        i.jqCondElement.show(),
        i.jqStitchBox.addClass("conditionalised"))
    }
    ;
    var N = function() {
        R();
        var e = B();
        i && (e = i.stitch),
        e || (e = n.last().stitchBoxes.last().createStitch());
        var t = new GraphModel(e)
    }
      , C = function(e) {
        var t = this;
        this.stitch = e;
        var r = "";
        this.unused = !e.pageNumber(),
        this.unused && (r += '<div class="deleteButton stitchButton" tooltip="' + tr("Delete this paragraph") + '></div>'),
        r += '<div class="rewindStitchListButton stitchButton" tooltip="'+tr("Rewind to here")+'"></div>',
        r += "<span id='content'>" + b(e.text()) + "</span>";
        var o = "";
        for (var u = 0; u < e.numberOfFlags(); ++u)
            o += "<span class='flag'>" + e.flagByIndex(u) + "</span>";
        e.numberOfFlags() > 0 && (r += "<div id='flags'>" + o + "</div>"),
        this.unused || (r += '<div class="stats"></div>'),
        this.unused && (r += '<div class="stats"><strong class="important">Unused</strong></div> '),
        this.jqStitchRow = $("<tr><td>" + r + "</td></tr>"),
        this.jqContent = this.jqStitchRow.find("span#content"),
        k.jqStitchList.append(this.jqStitchRow),
        this.jqSearchButton = this.jqStitchRow.find(".rewindStitchListButton"),
        this.jqStitchRow.find(".deleteButton").bind("click tap", function() {
            return StoryModel.removeStitch(e),
            StoryModel.updateGraphModel(),
            k.update(),
            EditorMenu.requireSave(),
            !1
        });
        if (!this.unused) {
            var a = f(e);
            a && this.jqStitchRow.find(".stats").append(a)
        }
        var l = ft(e);
        i ? this.stitch == i.stitch && (this.jqStitchRow.addClass("selected"),
        k.jqActiveStitchRow = this.jqStitchRow,
        k.jqActiveStitchRowText = this.jqContent) : s && this.stitch == n.last().stitchBoxes.last().stitch && this.jqStitchRow.addClass("selected"),
        l && this.jqStitchRow.addClass("visible");
        if (Editor.joiningMode) {
            this.jqSearchButton.css("opacity", 0);
            var c = B(!0)
              , h = this.stitch
              , p = !0;
            while (h && p)
                h === c && (p = !1),
                h = h.divertStitch;
            p ? this.enableJoin() : this.jqStitchRow.addClass("disabled")
        } else
            this.unused || (l ? (this.jqStitchRow.attr("tooltip", tr("Edit this paragraph")),
            this.jqStitchRow.bind("click tap", function(e) {
                var n = at(t.stitch);
                return n && n.jqStitchBoxText.focus(),
                k.update(),
                !1
            })) : (this.jqStitchRow.attr("tooltip", tr("Jump to this paragraph")),
            this.jqStitchRow.bind("click tap", function(t) {
                return searchForStitch(e)
            }))),
            !this.unused && l && l != n.last() ? (this.jqSearchButton.removeClass("disabled"),
            this.jqSearchButton.bind("click tap", function() {
                H(l),
                toStitchBox = at(t.stitch),
                toStitchBox && toStitchBox.jqStitchBoxText.focus()
            })) : this.jqSearchButton.addClass("disabled")
    };
    C.prototype.enableJoin = function() {
        var e = this.jqStitchRow
          , t = this.stitch
          , r = null
          , s = function(e) {
            var t = $("#read_area")
              , n = $(window).height() * .3;
            e ? t.scrollTop(t.scrollTop() + n) : t.animate({
                scrollTop: t.scrollTop() + n
            }, "slow")
        };
        e.bind("mouseenter.join", function() {
            var e = t
              , o = null
              , u = "";
            r = "";
            while (e) {
                var a = b(e.text());
                r += '<div class="stitchBox ghost">                                  <div class="stitchBoxBackground">                                     <div class="paper-top"></div>                                     <div class="paper-mid"></div>                                     <div class="paper-bottom"></div>                                  </div>                                  <div class="stitchText" contentEditable="false">' + a + "</div>                               </div>";
                for (var l = 0; l < e.options.length; l++)
                    u += '<div class="option ghost"><div contentEditable="true" class="optionText">' + e.options[l].text() + "</div>" + '<div class="followLinkButton disabled" tooltip="Follow this option"></div>' + "</div>";
                o = e,
                e = e.divertStitch
            }
            i && i.jqStitchBox.hasClass("blank") && (i.jqStitchBox.hide(),
            n.last().stitchBoxes.length == 1 && (i.jqStitchBox.addClass("hiddenStitchBox"),
            i.jqStitchBox.removeClass("stitchBox"))),
            n.last().jqChunk.append(r),
            n.last().jqChunk.after(u),
            s(),
            n.last().jqStatsLabel.empty(),
            n.last().jqStatsLabel.append(f(o)),
            Editor.joinButton.hide()
        });
        var o = function() {
            i && (i.jqStitchBox.show(),
            i.jqStitchBox.removeClass("hiddenStitchBox"),
            i.jqStitchBox.addClass("stitchBox")),
            $(".ghost").remove(),
            n.last().updateStatsLabel(),
            Editor.joinButton.show()
        };
        e.bind("mouseleave.join", function() {
            o()
        }),
        e.bind("tap.join mousedown.join", function() {
            if (ft(t) && !confirm("Linking to this paragraph will form a loop. Are you sure you want to do this?"))
                return !1;
            o();
            var e = n.last().lastStitchBox();
            return z(e, t),
            s(!0),
            R(),
            !1
        })
    }
    ,
    StitchListPageHeader = function(e, t, n, r) {
        var i = this;
        this.stitch = e,
        this.pNumLabel = t,
        n && t != r && r > 0 && k.closedPages.add(t);
        var s = e.pageLabelText();
        k.closedPages.contains(t) ? (this.jqStitchRow = $('<tr class="page"><td><div class="collapser"><div class="tri_button">' + trisymbol + "</div> " + s + '<div class="important inline"></div></div><div class="searchButton stitchButton" tooltip="'+tr("Jump to this section")+'"></div></td></tr>'),
        this.jqStitchRow.bind("click tap", function() {
            k.closedPages.remove(i.pNumLabel),
            k.update(!1, !0)
        }),
        Editor.joiningMode ? this.jqStitchRow.find(".searchButton").hide() : this.jqStitchRow.find(".searchButton").bind("click tap", function() {
            return searchForStitch(i.stitch)
        })) : (this.jqStitchRow = $('<tr class="page"><td><div class="collapser"><div class="tri_button">&#9660;</div> ' + s + '<div class="important inline"></div></div></td></tr>'),
        this.jqStitchRow.bind("click tap", function() {
            k.closedPages.add(i.pNumLabel),
            k.update(!1, !0)
        }));
        var o = 0
          , u = 0;
        for (var a = 0; a < i.stitch.sectionStitches.length; a++) {
            var f = i.stitch.sectionStitches[a].stats();
            o += f.numLooseEnds,
            f.deadEnd && u++
        }
        if (o + u > 0) {
            var l = "";
            o > 0 && (l += o + " loose ",
            l += o == 1 ? "end" : "ends",
            u > 0 && (l += ", ")),
            u > 0 && (l += u + " ",
            l += u == 1 ? "end" : "ends"),
            this.jqStitchRow.find(".important").text(l)
        }
        k.jqStitchList.append(this.jqStitchRow)
    }
    ,
    searchForStitch = function(e) {
        var t = new Dialogue({
            title: "Searching",
            message: "Please wait a moment..."
        });
        return setTimeout(function() {
            j(e)
        }, 2),
        t.close(),
        !1
    }
    ;
    var k = function() {};
    k.closedPages = [],
    k.rows = [],
    k.headers = [],
    k.jqStitchList = null,
    k.expanded = !1,
    k.broughtInAutomatically = !1,
    k.setup = function() {
        k.jqStitchList = $("#stitch_list"),
        k.expanded = !1,
        k.searching = null,
        k.jqHeader = $(".header");
        if (t.find) {
            var e = $('<div id="find_box" tooltip="' + tr("search the story") + '"><span class="icon search"></span><div contenteditable="true" id="searchTerm"/></div>');
            k.jqHeader.prepend(e),
            e.hide();
            var n = e.find(".icon")
              , r = function(e) {
                e.length == 0 ? (n.addClass("search"),
                n.removeClass("clear"),
                k.searching = null,
                k.update()) : (n.removeClass("search"),
                n.addClass("clear"),
                k.searching = e.toLowerCase(),
                k.update())
            };
            n.bind("click tap", function() {
                $(this).hasClass("search") ? e.find("#searchTerm").focus() : (e.find("#searchTerm").text(""),
                r(""))
            }),
            e.bind("click tap", function() {
                e.find("#searchTerm").focus()
            }),
            e.bind("keydown", function(e) {
                e.which == 13 && e.preventDefault()
            }),
            e.bind("keyup", function(e) {
                e.which == 27 && $(this).find("#searchTerm").text(""),
                r($(this).find("#searchTerm").text())
            }),
            k.jqHeader.find(".text").attr("tooltip", "Click to collapse all sections."),
            k.jqHeader.find(".text").bind("click tap", function() {
                k.closedPages = [];
                for (var e = 0; e < StoryModel.stitches.length; e++) {
                    var t = StoryModel.stitches[e].pageNumberLabel();
                    t && k.closedPages.push(t)
                }
                k.update(!1, !0)
            })
        }
    }
    ,
    k.expand = function() {
        k.expanded = !0,
        $("#read_area").addClass("split-screen"),
        $("#stitch_list_area").removeClass("collapsed"),
        $("#read_area").removeClass("full-screen"),
        $("#stitch_list_area").addClass("expanded"),
        $("#find_box").show(),
        k.update()
    }
    ,
    k.collapse = function() {
        k.expanded = !1,
        k.broughtInAutomatically = !1,
        $("#read_area").removeClass("split-screen"),
        $("#stitch_list_area").addClass("collapsed"),
        $("#read_area").addClass("full-screen"),
        $("#stitch_list_area").removeClass("expanded"),
        $("#find_box").hide()
    }
    ,
    k.update = function(e, t) {
        StoryModel.purge();
        var n = 0;
        for (var r = 0; r < StoryModel.stitches.length; ++r)
            n += StoryModel.stitches[r].wordCount;
        $(".wc").text(commadString(n) + " words");
        if (!k.expanded)
            return;
        $("#stitch_list tr").not(".header").addClass("to_be_removed"),
        $("#stitch_list #tooltip").remove(),
        this.jqActiveStitchRow = null,
        k.rows = [],
        k.headers = [];
        var s = 0;
        i && i.stitch && (s = i.stitch.pageNumber()),
        t || k.closedPages.remove(s);
        for (var r = 0; r < StoryModel.stitches.length; ++r) {
            var o = StoryModel.stitches[r];
            if (k.searching !== null)
                if (o.text().toLowerCase().indexOf(k.searching) > -1)
                    k.rows.push(new C(o));
                else if (k.searching == "end".substring(0, k.searching.length) && o.statsObj.deadEnd)
                    k.rows.push(new C(o));
                else if (k.searching == "loose end".substring(0, k.searching.length) && o.statsObj.numLooseEnds)
                    k.rows.push(new C(o));
                else {
                    var u = !1;
                    if (o.numberOfFlags() > 0)
                        for (var a = 0; a < o.numberOfFlags() && !u; a++)
                            o.flagByIndex(a).toLowerCase().indexOf(k.searching) > -1 && (k.rows.push(new C(o)),
                            u = !0);
                    var f = function(e, t) {
                        if (StoryModel.numberOfConditionals(e, t) > 0)
                            for (var n = 0; n < StoryModel.numberOfConditionals(e, t) && !u; n++)
                                StoryModel.conditionalByIndex(e, t, n).toLowerCase().indexOf(k.searching) > -1 && (k.rows.push(new C(o)),
                                u = !0)
                    };
                    f(o, !0),
                    f(o, !1);
                    for (var l = 0; l < o.options.length; l++)
                        f(o.options[l], !0),
                        f(o.options[l], !1)
                }
            else {
                var c = o.pageNumberLabel();
                c > 0 && o.pageNumber() > 0 && k.headers.push(new StitchListPageHeader(o,c,e,s)),
                k.closedPages.contains(o.pageNumber()) || k.rows.push(new C(o))
            }
        }
        $(".to_be_removed").remove(),
        this.jqActiveStitchRow && !t && ct(this.jqActiveStitchRow, $("#stitch_list_area"))
    }
    ;
    var L = function() {
        var e = "";
        StoryModel.looseEndCount > 0 && (e += StoryModel.looseEndCount + " loose end",
        StoryModel.looseEndCount > 1 && (e += "s"),
        StoryModel.endCount > 0 && (e += " and ")),
        StoryModel.endCount > 0 && (e += StoryModel.endCount + " end",
        StoryModel.endCount > 1 && (e += "s")),
        $(".header .important").text(e)
    }
      , A = function() {
        i && selectText(i.cursorPos)
    }
      , O = function(e, t) {
        t.options = e.options,
        t.options.each(function() {
            var e = this;
            e.ownerStitch = t,
            e._parentStitch = t
        }),
        e.options = []
    }
      , M = function() {
        r.each(function() {
            this.remove()
        }),
        r = []
    }
      , _ = function() {
        M(),
        n.last().createOptions()
    }
      , D = function(e, t, n) {
        this.jqFakeOption = $('<div class="fake_option"><div class="optionText" contenteditable="true">' + e.text() + '</div><div class="followLinkButton disabled"></div></div>'),
        this.jqFakeOption.bind("keydown", function(e) {
            e.which == 13 && e.preventDefault(),
            e.which == 40 && (n.stitchBoxes[0].jqStitchBoxText.focus(),
            e.preventDefault()),
            e.which == 38 && (t && t.stitchBoxes[0].jqStitchBoxText.focus(),
            e.preventDefault())
        }),
        this.jqFakeOption.bind("keyup", function() {
            event.which != 13 && (e.storyOption.text($(this).text(), !0),
            EditorMenu.requireSave())
        })
    }
      , P = function(e) {
        var r = new d
          , i = new D(e,n.last(),r);
        n.push(r),
        n.last().jqChunk.prepend(i.jqFakeOption),
        r.fillFromOption(e),
        r.addRewindButton(),
        _(),
        t.animations && !u && (r.jqChunk.css("left", "-800px"),
        $(".options").css("left", "-800px"),
        $(".button").css("left", "-800px"),
        i.jqFakeOption.css("left", "+800px"),
        r.jqChunk.animate({
            left: "0px"
        }, 1e3),
        $(".options").animate({
            left: "0px"
        }, 1e3),
        $(".button").animate({
            left: "0px"
        }, 1e3),
        i.jqFakeOption.animate({
            left: "0px"
        }, 1e3)),
        u || n.last().stitchBoxes.first().jqStitchBoxText.focus()
    }
      , H = function(e) {
        var t = n.indexOf(e);
        for (var r = t + 1; r < n.length; r++) {
            n[r].jqFakeOption && n[r].jqFakeOption.slideUp("slow", function() {
                $(this).remove()
            });
            for (var i = n[r].stitchBoxes.length - 1; i >= 0; i--) {
                var s = n[r].stitchBoxes[i];
                s && s.remove()
            }
            n[r].remove(),
            n[r] = null
        }
        n = n.slice(0, t + 1),
        _(),
        I(),
        U(),
        u || e.stitchBoxes[0].jqStitchBoxText.focus(),
        n.last().stitchBoxes.last().setLeadingEdge(),
        k.update(!0)
    }
      , B = function(e) {
        var t = n.last().lastStitchBox().stitch;
        return t || (n.last().stitchBoxes.length > 1 ? t = n.last().stitchBoxes[n.last().stitchBoxes.length - 2].stitch : e || (t = n[n.length - 2].lastStitchBox().stitch)),
        t
    }
      , j = function(e, t) {
        t || (t = e,
        e = B());
        if (ot(e, t) > -1) {
            p(),
            u = !0,
            H(ft(o[0]));
            for (var n = 0; n < o.length; n++)
                ft(o[n]) || F(o[n]);
            u = !1,
            at(t).focus(),
            k.update(!0)
        }
    }
      , F = function(e) {
        for (var t = 0; t < r.length; t++)
            if (r[t].linkStitch() == e)
                return P(r[t]),
                !0;
        return !1
    }
      , I = function() {
        n.each(function() {
            this.jqRewindButton.show()
        }),
        n.last().jqRewindButton.hide()
    }
      , q = function() {
        Editor.joiningMode = !0,
        k.broughtInAutomatically = !k.expanded,
        k.expand(),
        Editor.joinButton.text(tr("Choose the paragraph you want next by clicking it in the contents.")),
        Editor.joinButton.addClass("larger"),
        Editor.joinButton.unbind("click tap"),
        Editor.joinButton.bind("click tap", function() {
            return n.last().stitchBoxes.last().focus(),
            !1
        }),
        delButton = $('<div class="linkDeleteButton"></div>'),
        Editor.joinButton.prepend(delButton),
        delButton.show(),
        Editor.newOptionButton.hide();
        var e = $("<div class='instructionArrow'></div>");
        Editor.joinButton.after(e),
        e.css("top", Editor.joinButton.position().top + $("#read_area").scrollTop() - 40),
        e.css("left", $("#read_area").width() / 2 + Editor.joinButton.width() / 2 + 20),
        k.update()
    }
      , R = function() {
        return Editor.joiningMode && (Editor.joiningMode = !1,
        Editor.joinButton.text(tr("Join to an existing paragraph")),
        Editor.joinButton.unbind("click tap"),
        $("#read_area").find(".instructionArrow").remove(),
        Editor.joinButton.bind("click tap", q),
        k.rows.each(function() {
            this.jqStitchRow.unbind(".join"),
            this.jqStitchRow.removeClass("disabled")
        }),
        Editor.joinButton.removeClass("larger"),
        Editor.newOptionButton.show(),
        k.rows.each(function() {
            this.jqSearchButton.css("opacity", 1)
        }),
        U(),
        k.broughtInAutomatically ? k.collapse() : (k.broughtInAutomatically = !1,
        k.update())),
        !1
    }
      , U = function() {
        R(),
        r.length == 0 && StoryModel.stitches.length > Math.max(2, n[0].stitchBoxes.length) ? Editor.joinButton.show() : Editor.joinButton.hide()
    }
      , z = function(e, t) {
        var r = n.last()
          , i = r.joinStitchBoxToStitch(e, t);
        t._stitchBox.jqStitchBox.find(".backlinks").remove(),
        t._backlinks.length > 1 && t._stitchBox.jqStitchBox.prepend("<div class='backlinks'>" + tr("&count links in", {count:e._backlinks.length}) + "</div>"),
        i.stitch && i.setUpPageButton(),
        p(),
        EditorMenu.requireSave(),
        _(),
        U(),
        k.update()
    }
      , W = function() {
        return "<div class='conditionalText' tooltip='" + tr("Edit logic") + "'><div class='collapser'></div><div class='message'></div></div>"
    }
      , X = function(e, t, n) {
        e.jqCondElement = t.find(".conditionalText"),
        n && (V(e, t, n, et(n)),
        e.jqCondElement.find(".message,.collapser").bind("click tap", function() {
            K(e, t, n)
        }))
    }
      , V = function(e, n, r, i) {
        t.conditionals ? i ? (n.addClass("conditionalised"),
        e.jqCondElement.addClass("active"),
        e.jqCondElement.find(".message").html(" " + J(e, r) + " ")) : (n.removeClass("conditionalised"),
        e.jqCondElement.removeClass("active"),
        e.jqCondElement.find(".message").text(tr(" Add conditions "))) : (e.jqCondElement.hide(),
        n.removeClass("conditionalised"))
    }
      , J = function(e, t) {
        var n = ""
          , r = " only show if ";
        for (var i = 0; i < Z(t, !0); i++)
            r += n + "<span class='logic'>" + nt(t, !0, i) + "</span>",
            n = " and ";
        n += "not ";
        for (var i = 0; i < Z(t, !1); i++)
            r += n + "<span class='logic'>" + nt(t, !1, i) + "</span>",
            n = " and not ";
        return r
    }
      , K = function(e, t, n) {
        if (t)
            var r = t.find(".conditionalText")
              , i = r.find(".conditionsBlock");
        var s = $(".conditionalText");
        $(".conditionsBlock").remove(),
        s.css({
            bottom: "",
            top: "",
            height: ""
        }),
        s.removeClass("expanded"),
        $(".unjoinButton").show();
        var o = function() {
            var e = t.find(".left .newFlag")
              , n = t.find(".right .newFlag")
              , i = Math.max(e.position().top + e.height(), n.position().top + n.height())
              , s = 12
              , o = 10;
            r.css("height", i + r.find(".message").height() + s),
            r.find(".flagListBlock").css("height", i + (s - o))
        };
        if (t && i.length == 0) {
            var u = r.position().top
              , i = $('<div class="conditionsBlock"></div>');
            i.find(".collapser").bind("click tap", function() {
                K(e, t, n)
            }),
            i.append(Q(e, t, n, "Passed these markers", !0, "left", o)),
            i.append(Q(e, t, n, "Not passed these markers", !1, "right", o)),
            r.append(i),
            r.addClass("expanded"),
            $(".unjoinButton").hide(),
            i.show(),
            r.css("top", u),
            o(),
            ensureVisibilityOfPopup(r, $("#read_area"))
        }
    }
      , Q = function(e, t, n, r, i, s, o) {
        var u = function(r, s, u) {
            new it(r,u,n,function(e, t) {
                return !tt(e, t, -1)
            }
            ,function(u, a) {
                if (u) {
                    if (!a) {
                        var l = f(u);
                        l.insertBefore(s)
                    } else
                        a != u && (r.text(u),
                        Y(n, a, i, !1));
                    o(),
                    Y(n, u, i, !0),
                    r.removeClass("unused"),
                    EditorMenu.requireSave(),
                    V(e, t, n, et(n)),
                    G(t, n)
                }
            }
            )
        }
          , a = $("<div class='flagListBlock'></div>");
        a.addClass(s),
        a.append($('<div class="title"> ' + r + ":</div>"));
        var f = function(r) {
            return jqFlagLine = $("<div class='flag_name'><div class='entertext'><div class='flag_button minus'></div><span id='actualFlag'>" + r + "</span></div></div>"),
            jqFlagLine.find(".entertext").bind("click tap", function() {
                var e = $(this).find("#actualFlag");
                u(e, null, e.text())
            }),
            jqFlagLine.find(".minus").bind("click tap", function() {
                Y(n, r, i, !1),
                $(this.parentNode.parentNode).remove(),
                o(),
                EditorMenu.requireSave(),
                V(e, t, n, et(n)),
                G(t, n)
            }),
            jqFlagLine
        };
        for (var l = 0; l < Z(n, i); l++)
            a.append(f(nt(n, i, l)));
        var c = $("<div class='flag_name newFlag'><div class='add entertext'><div class='flag_button plus'></div><span id='actualFlag'>" + tr("Add marker") + "</span></div></div>");
        return a.append(c),
        c.bind("click tap", function() {
            u(c.find("#actualFlag"), c, "")
        }),
        a
    }
      , G = function(e, t) {
        rt(t) ? e.removeClass("disabled") : e.addClass("disabled")
    }
      , Y = function(e, t, n, r) {
        if (r && tt(e, t, n) || !r && !tt(e, t, n))
            return;
        return StoryModel.writeConditionals(e, t, n)
    }
      , Z = function(e, t) {
        return StoryModel.numberOfConditionals(e, t)
    }
      , et = function(e) {
        return e ? StoryModel.numberOfConditionals(e, !0) > 0 || StoryModel.numberOfConditionals(e, !1) > 0 : !1
    }
      , tt = function(e, t, n) {
        return n == -1 ? StoryModel.conditionedOnThis(e, t, !0) || StoryModel.conditionedOnThis(e, t, !1) : StoryModel.conditionedOnThis(e, t, n)
    }
      , nt = function(e, t, n) {
        return StoryModel.conditionalByIndex(e, t, n)
    }
      , rt = function(e) {
        var t = [];
        for (var r = 0; r < n.length; r++)
            for (var i = 0; i < n[r].stitchBoxes.length; i++)
                StoryModel.processFlagSetting(n[r].stitchBoxes[i], t);
        return StoryModel.doesArrayMeetConditions(e._ifConditions, e._notIfConditions, t)
    }
      , it = function(e, t, n, r, i) {
        var s = this;
        s.originalText = t,
        $("#read_area").append("<div class='eventAbsorber'></div>");
        var o = $("#read_area").find(".eventAbsorber")
          , u = t == "" ? tr("Add marker") : tr("Edit marker");
        this.jqPopup = $('<div id="flagEntryPopup"><div class="title">' + u + '</div><div class="entry" contentEditable="true"></div><div class="suggestions"></div><div class="nubbin"></div></div>'),
        $("#read_area").append(this.jqPopup),
        this.jqSuggestions = this.jqPopup.find(".suggestions"),
        this.jqPopup.css("top", e.offset().top + $("#read_area").scrollTop() - topBannerHeight() + e.height() / 2 - this.jqPopup.height() / 2 + 4);
        var a = e.offset().left;
        $("#read_area").width() - (a + e.width() + 25) > this.jqPopup.width() + 10 ? this.jqPopup.css("left", a + e.width() + 25) : (this.jqPopup.addClass("leftHanded"),
        this.jqPopup.css("left", a - 205)),
        ensureVisibilityOfPopup(this.jqPopup, $("#read_area")),
        this.jqPopupEntry = this.jqPopup.find(".entry"),
        this.jqPopupEntry.text(t),
        moveCaretToEndOf(this.jqPopupEntry[0]);
        var f = function() {
            i(s.jqPopupEntry.text().toLowerCase(), s.originalText),
            s.jqPopup.remove(),
            o.remove()
        };
        o.bind("click tap", function() {
            f()
        }),
        this.suggestionSet = [];
        for (var l = 0; l < StoryModel.flagIndex.length; l++)
            if (r(n, StoryModel.flagIndex[l])) {
                var c = {
                    text: StoryModel.flagIndex[l].toLowerCase(),
                    match: -1,
                    lineObject: null
                };
                s.suggestionSet.push(c)
            }
        var h = function() {
            s.navigateSuggestions = {
                lineObject: null,
                idx: -1
            }
        }
          , p = function(e) {
            s.navigateSuggestions.lineObject && s.navigateSuggestions.lineObject.jqLine.removeClass("highlight");
            if (e == -1)
                var t = null;
            else
                t = s.suggestionSet[e].lineObject,
                t.jqLine.addClass("highlight");
            s.navigateSuggestions.lineObject = t,
            ensureVisibilityOfPopup(t.jqLine, s.jqSuggestions)
        }
          , d = function(e) {
            s.jqSuggestions.empty(),
            h();
            if (s.suggestionSet.length > 0) {
                for (var t = 0; t < s.suggestionSet.length; t++)
                    s.suggestionSet[t].match = -1;
                var n = function(e, t) {
                    var n = e.indexOf(t);
                    return n == -1 && (n = 1e3),
                    n
                };
                e != "" && s.suggestionSet.sort(function(t, r) {
                    return t.match == -1 && (t.match = n(t.text, e)),
                    r.match == -1 && (r.match = n(r.text, e)),
                    t.match - r.match
                });
                for (var t = 0; t < s.suggestionSet.length; t++)
                    s.suggestionSet[t].lineObject = new st(s.suggestionSet[t].text,t,function(e, t) {
                        s.jqPopupEntry.text(e),
                        moveCaretToEndOf(s.jqPopupEntry[0]),
                        t && f()
                    }
                    ,function(e) {
                        p(e.idx),
                        s.navigateSuggestions.idx = e.idx
                    }
                    ),
                    s.jqSuggestions.append(s.suggestionSet[t].lineObject.jqLine)
            } else
                s.jqSuggestions.append('<div class="hint"><p>' + tr("Enter a name for a new marker.") + '</p><p>' + tr("You will then be able to test for this marker later on in the story.") + '</p></div>')
        };
        this.jqPopupEntry.bind("keydown", function(e) {
            e.which == 27 && (s.jqPopupEntry.text(""),
            f());
            if (!(e.which != 9 && e.which != 13 || !s.navigateSuggestions.lineObject))
                return s.jqPopupEntry.text(s.navigateSuggestions.lineObject.text),
                moveCaretToEndOf(s.jqPopupEntry[0]),
                d(s.navigateSuggestions.lineObject.text),
                e.preventDefault(),
                !1;
            if (e.which == 13)
                return f(),
                e.preventDefault(),
                !1;
            if (e.which == 40) {
                if (s.navigateSuggestions.idx == s.suggestionSet.length - 1)
                    return e.preventDefault(),
                    !1;
                p(++s.navigateSuggestions.idx)
            }
            if (e.which == 38) {
                if (s.navigateSuggestions.idx == -1)
                    return e.preventDefault(),
                    !1;
                p(--s.navigateSuggestions.idx)
            }
        }),
        this.jqPopupEntry.bind("keyup", function(e) {
            e.which != 38 && e.which != 40 && d(s.jqPopupEntry.text().toLowerCase())
        }),
        d("")
    }
      , st = function(e, t, n, r) {
        this.text = e;
        var i = this;
        this.idx = t,
        this.jqLine = $("<div class='suggestion'><div class='flag_button plus'></div>" + e + "</div>"),
        this.jqLine.find(".plus").bind("click tap", function() {
            n(e, !0)
        }),
        this.jqLine.bind("click tap", function() {
            n(e),
            r(i)
        }),
        this.jqLine.bind("dblclick", function() {
            n(e, !0)
        }),
        this.jqLine.bind("mouseenter", function() {
            r(i)
        })
    }
      , ot = function(e, t) {
        o = [];
        for (var r = 0; r < StoryModel.stitches.length; r++)
            StoryModel.stitches[r].distanceToTarget = -1;
        var i = [t]
          , s = []
          , u = 0
          , a = null
          , f = null;
        if (lt(t))
            a = t;
        else
            while (i.length > 0 && n.indexOf(f) != n.length - 1) {
                u++;
                for (var l = 0; l < i.length; l++) {
                    var c = i[l]
                      , h = c.getBacklinks();
                    for (var p = 0; p < h.length; p++) {
                        var d = h[p];
                        if (d.distanceToTarget == -1) {
                            var v = ft(d);
                            if (v) {
                                n.indexOf(v) > n.indexOf(f) && (a = d,
                                f = v,
                                d.forwardLinkStitch = c);
                                if (n.indexOf(f) == n.length - 1)
                                    break
                            } else
                                d.forwardLinkStitch = c,
                                d.distanceToTarget = u,
                                s.push(d)
                        }
                    }
                }
                i = [],
                i = s,
                s = []
            }
        if (!a)
            return -1;
        var m = 0
          , g = a;
        while (g != t)
            o[m] = g,
            m++,
            g = g.forwardLinkStitch;
        return o[m] = t,
        m + 1
    }
      , ut = function(e, t) {
        var r = !1
          , i = !1;
        return n.each(function() {
            if (!i) {
                var n = this;
                n.stitchBoxes.each(function() {
                    if (!i) {
                        var n = this;
                        r ? (n.stitch == t && (i = !0),
                        r = !1) : n.stitch == e && (r = !0)
                    }
                })
            }
        }),
        i
    }
      , at = function(e) {
        return e._stitchBox ? e._stitchBox : !1
    }
      , ft = function(e) {
        var t = at(e);
        return t ? t.ownerChunk : !1
    }
      , lt = function(e) {
        var t = ft(e);
        return t ? t.stitchBoxes[0].stitch == e : !1
    }
      , ct = function(e, t) {
        t || (t = $("#read_area"));
        var n = $(e)
          , r = t.scrollTop() + n.offset().top - .5 * t.innerHeight() + .5 * n.outerHeight();
        t.stop().animate({
            scrollTop: r
        })
    }
      , ht = function() {
        var e = new d;
        n.push(e),
        e.fillFromStitch(StoryModel.initialStitch),
        a(n[0].stitchBoxes[0]),
        e.addRewindButton(),
        jqOptions = $(".options"),
        _(),
        U(),
        I(),
        k.update(!0)
    }
      , pt = function() {
        var e = [];
        n.length > 0 && n.each(function() {
            e.push(this.stitchBoxes.first().stitch)
        }),
        M();
        for (var t = 0; t < n.length; ++t) {
            var r = n[t];
            r.stitchBoxes.each(function() {
                this.stitch && (this.stitch._stitchBox = null)
            }),
            r.remove()
        }
        return n = [],
        $("#editor_container").remove(),
        e
    }
      , dt = function() {
        pt();
        var e = '<div contentEditable=true tooltip="Your story title goes here" id="storyNameField" class="titleField">' + StoryModel.storyName() + "</div>"
          , t = '<div contentEditable=true tooltip="Your name goes here" id="authorNameField" class="titleField">' + StoryModel.authorName() + "</div>";
        $("#storyNameField").live("blur", function() {
            var e = $(this).text().replace(/\n/g, "");
            e !== StoryModel.storyName() && (StoryModel.setStoryName(e),
            EditorMenu.requireSave())
        }).live("keydown", function(e) {
            return e.which === 13 || e.which === 27 ? (e.preventDefault(),
            e.which === 27 ? $(this).text(StoryModel.storyName()) : $(this).blur(),
            !1) : !0
        }),
        $("#authorNameField").live("blur", function() {
            var e = $(this).text();
            e !== StoryModel.authorName() && (StoryModel.setAuthorName(e),
            EditorMenu.requireSave())
        }).live("keydown", function(e) {
            return e.which === 13 || e.which === 27 ? (e.preventDefault(),
            e.which === 27 ? $(this).text(StoryModel.authorName()) : $(this).blur(),
            !1) : !0
        });
        var n = $('<div id="editor_container">  <div id="widgets"></div>  <div id="read_area"  class="full-screen">' + e + "<br>" + t + '<div class="options"></div>  <div class="button stitchLinkButton newJoinButton" tooltip="' + tr("Join this paragraph to another") + '">  initial text goes unseen  </div>  <div class="button stitchLinkButton newOptionButton" tooltip="' + tr("Add a new option to this paragraph (shift-return)") + '">  ' + tr("Add option") + '  </div>  <div id="paddingDiv"></div>  </div>  <div id="stitch_list_area"  class="collapsed">  <div class="header"><span class="text">' + tr("Contents") + '</span>  <div class="wc"></div>  </div>  <div id="stitch_list_scrolling">  <table id="stitch_list">  </div>  </table>  </div>  </div>');
        $("#main_viewport").append(n),
        E(),
        k.setup(),
        Editor.newOptionButton = $(".newOptionButton"),
        $(".newOptionButton:not(.disabled)").unbind("click tap"),
        $(".newOptionButton:not(.disabled)").bind("click tap", function() {
            vt(),
            a(null)
        }),
        Editor.joinButton = $(".newJoinButton"),
        Editor.joiningMode = !0,
        sizeEditorCorrectly(),
        styleWithoutCss()
    }
      , vt = function() {
        var e = n.last().lastStitch();
        e || (e = n.last().stitchBoxes.last().createStitch());
        var t = StoryModel.createOption(e)
          , i = new v(t,e);
        i.focus(),
        r.push(i),
        n.last().updateStatsLabel(),
        U(),
        I()
    }
      , mt = function() {
        StoryModel.clear(),
        StoryModel.setStoryName("Untitled Story"),
        StoryModel.initialStitch = StoryModel.createStitch("Once upon a time..."),
        StoryModel.initialStitch.pageNumberLabel(1),
        StoryModel.updateGraphModel(),
        pt(),
        dt(),
        ht()
    }
      , gt = function() {
        pt(),
        StoryModel.importStory(tutorialStory.name, tutorialStory.story),
        dt(),
        ht()
    }
      , yt = function(e) {
        u = !0,
        pt(),
        dt(),
        ht();
        if (e.length > 0)
            for (var t = 1; t < e.length; t++)
                F(e[t]);
        u = !1,
        n.last().stitchBoxes.first().jqStitchBoxText.focus()
    }
      , bt = function(e) {
        u = !0,
        pt();
        var t = StoryModel.importStory(e.title, e.data);
        dt(),
        ht(),
        t && (t.playPoint && j(StoryModel.initialStitch, t.playPoint),
        t.libraryVisible && k.expand(),
        changeTextSize(t.textSize)),
        u = !1
    };
    return toggleLibrary = function(e) {
        return k.expanded ? e || k.collapse() : e || k.expand(),
        k.expanded
    }
    ,
    changeTextSize = function(e, t) {
        if (e !== Editor.currentSize || t) {
            if (!EditorMenu.inPlayMode()) {
                var n = $("#read_area");
                for (var r = 0; r < editorSizes.length; r++)
                    e === r ? n.addClass(editorSizes[r]) : n.removeClass(editorSizes[r])
            }
            Editor.currentSize = e
        }
    }
    ,
    editorData = function() {
        var e = {};
        return n.length > 0 && (e.playPoint = B().name()),
        e.libraryVisible = k.expanded,
        e.authorName = StoryModel.authorName(),
        e.textSize = Editor.currentSize,
        e
    }
    ,
    $(document).bind("keyup", function(e) {
        e.which == 70 && e.ctrlKey && (k.expand(),
        $("#searchTerm").focus())
    }),
    {
        setup: dt,
        toggleLibrary: toggleLibrary,
        editorSizes: editorSizes,
        clear: pt,
        loadDefaultStory: mt,
        loadTutorialStory: gt,
        reloadCurrentStory: yt,
        createFromModel: ht,
        load: bt,
        FormattingToHTML: b,
        navigateToStitch: j,
        stitchBoxContainingStitch: at,
        launchGraph: N,
        settings: t,
        currentSize: e,
        changeTextSize: changeTextSize,
        editorData: editorData,
        statsLabelForStitch: f,
        stitchGoesToStitch: ut
    }
}()
  , EditorAccount = function() {
    var e = 0
      , t = "inklewriter_story"
      , n = "inklewriter_session"
      , r = ""
      , i = {}
      , s = null
      , o = function() {
        hasStorage && i.stories.local && (i.stories.local.updated_at = (new Date).toDateString(),
        localStorage.setItem(t, jQuery.stringifyJSON(i.stories.local)))
    }
      , u = function() {
        i = {
            userId: null,
            username: null,
            currentStoryId: "local",
            stories: {}
        }
    };
    u();
    var a = function(e) {
        i.userId = e.id,
        i.username = e.email
    }
      , f = function(e) {
        document.cookie = e + "=; expires=Thu, 01-Jan-70 00:00:01 GMT;"
    }
      , l = function() {
        localStorage.removeItem(t)
    }
      , c = function() {
        u(),
        hasStorage && localStorage.removeItem(t),
        f("_inklewriter_session"),
        l()
    }
      , h = !1;
    if (hasStorage) {
        var p = localStorage.getItem(t);
        if (p)
            i.stories.local = jQuery.parseJSON(p);
        else {
            var d = localStorage.getItem(n);
            d && (localStorage.removeItem(n),
            d = jQuery.parseJSON(d),
            d.currentStoryId && (i.stories.local = d.stories[d.currentStoryId]))
        }
    }
    var v = function(e) {
        var t = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
          , n = /^[a-zA-Z0-9._-]+@inklewriter$/;
        return t.test(e) || n.test(e)
    }
      , m = function(e) {
        return e.length >= 6 ? !0 : !1
    }
      , g = function(e) {
        $.ajax({
            type: "GET",
            url: r + "/users/" + i.userId + "/stories.json",
            contentType: "application/json",
            success: function(t, n, r) {
                for (var s = 0; s < t.length; ++s) {
                    var o = t[s];
                    i.stories[o.url_key] = o,
                    console.log("loaded story, modified " + new Date(o.updated_at))
                }
                console.log("Successfully fetched " + t.length + " stories."),
                b(),
                e && e.success && e.success()
            },
            error: function(t, n, r) {
                if (e && e.failure)
                    if (t.responseText) {
                        var i = jQuery.parseJSON(t.responseText)
                          , s = "could not fetch story data";
                        i && (s += ": " + i.error),
                        e.failure(s)
                    } else
                        e.failure("could fetch story data.")
            }
        })
    }
      , y = function() {
        var e = null;
        for (var t in i.stories) {
            var n = i.stories[t];
            n.update_at_date || (n.update_at_date = new Date(n.updated_at));
            if (!e || n.update_at_date > i.stories[e].update_at_date)
                e = t
        }
        return e
    }
      , b = function() {
        var e = getURLParameterByName("storyID");
        return e && i.stories[e] ? _(e) : _(y())
    }
      , w = function(e, t, n) {
        var i = {
            user: {
                email: e,
                password: t
            }
        };
        $.ajax({
            type: "POST",
            url: r + "/users/sign_in.json",
            contentType: "application/json",
            processData: !0,
            data: jQuery.stringifyJSON(i),
            success: function(e, t, r) {
                e = toObject(e),
                a(e),
                n || (n = {}),
                n.progress && n.progress("Signed in. Retrieving stories..."),
                g(n)
            },
            error: function(e, t, r) {
                if (n && n.failure)
                    if (e.responseText) {
                        var i = jQuery.parseJSON(e.responseText);
                        if (i)
                            var s = i.error || "could not sign in";
                        else
                            var s = "could not sign in";
                          
                        // Add a reference to old version
                        s += "<br /><b>If your account was created before March 11th, go read <a href=\"https://www.inklestudios.com/2019/03/11/inklewriter-is-back-online.html\" target=\"blank\">this blog post</a>.</b>"
                        n.failure(s)
                    } else
                        n.failure("could not sign in.")
            }
        })
    }
      , E = function(e, t, n) {
        console.log("Creating new user...");
        var i = {
            user: {
                email: e,
                password: t
            }
        };
        $.ajax({
            type: "POST",
            url: r + "/users.json",
            contentType: "application/json",
            processData: !0,
            data: jQuery.stringifyJSON(i),
            error: function(e, t, r) {
                if (n && n.failure)
                    if (e.responseText) {
                        var i = jQuery.parseJSON(e.responseText);
                        if (i) {
                            var s = i.error || "could not register";
                            i.errors.email && (s = "email " + i.errors.email[0])
                        } else
                            var s = "could not register";
                        n.failure(s)
                    } else
                        n.failure("could not reach inklewriter server.")
            },
            success: function(e, t, r) {
                e = toObject(e),
                console.log("Successfully registered"),
                a(e),
                n && n.success && n.success()
            }
        })
    }
      , S = function() {
        s && s.close(!0);
        var e = new Dialogue({
            title: tr("Create new account"),
            message: tr("Please enter your email address, and your desired password."),
            footer: "<a href='javascript:EditorAccount.popupLoginHelp()'>" + tr("Don't have an email address?") + "</a>\n"
        });
        s = e;
        var t = e.addField(tr("Email"))
          , n = e.addSecureField(tr("Password"));
        t.focus();
        var r = e.addButton(tr("Cancel"));
        e.addButton(tr("Register"), function() {
            var r = this;
            v(t.value()) ? m(n.value()) ? (e.setMessage(tr("Creating account...")),
            r.disable(),
            E(t.value(), n.value(), {
                success: function() {
                    EditorMenu.update(),
                    e.close();
                    var t = new Dialogue({
                        title: tr("Thank you"),
                        message: tr("We hope you enjoy writing in inklewriter!")
                    });
                    t.addButton(tr("Okay")),
                    EditorMenu.processSignedInTasks()
                },
                failure: function(t) {
                    e.setMessage("Sorry, " + t.replace("username", "email") + " (<a href='http://inklewriter.com/users/password/new'>Reset?<a>)"),
                    r.enable()
                }
            })) : e.setMessage(tr("Please enter a valid password - must be at least 6 characters long!")) : e.setMessage(tr("Please enter a valid email address!"))
        })
    }
      , x = function(e) {
        s && s.close(!0);
        if (!navigator.cookieEnabled) {
            var t = new Dialogue({
                title: tr("Cookies Are Disabled!"),
                message: tr("We've detected that cookies are disabled for your browser. To sign in, you will need to enable cookies, either in general, or for this site specifically.")
            })
              , n = t.addButton(tr("Okay"));
            return
        }
        var r = new Dialogue({
            title: tr("Sign in"),
            message: tr("Welcome! Please enter your sign in details."),
            footer: "<br><a href='javascript:EditorAccount.popupPasswordRecovery()' style='' class='aside_help'>" + tr("Forgotten password?") + "</a>\n"
        });
        s = r,
        r.addContent("(" + tr("or") + "<a href='javascript:EditorAccount.openRegisterDialogue()'>" + tr("Create New Account") + "</a>)");
        var i = r.addField(tr("Email"))
          , o = r.addSecureField(tr("Password"));
        i.focus();
        var n = r.addButton(tr("Cancel"));
        r.addButton(tr("Sign in"), function() {
            var t = this;
            v(i.value()) ? m(o.value()) ? (r.setMessage(tr("Signing in...")),
            t.disable(),
            w(i.value(), o.value(), {
                success: function() {
                    r.setMessage(tr("Success!")),
                    EditorMenu.processSignedInTasks(),
                    r.close(),
                    e && e()
                },
                progress: function(e) {
                    r.setMessage(e)
                },
                failure: function(e) {
                    t.enable(),
                    e === "invalid login parameters" ? r.setMessage(tr("Could not sign you in. Please check your email and password...")) : r.setMessage(tr("Sorry, &error",{error:e}))
                }
            })) : r.setMessage(tr("Please check that you've entered your password correctly!")) : r.setMessage(tr("Please enter a valid email address!"))
        })
    }
      , T = function() {
        var e = new Dialogue({
            title: tr("No Email?"),
            message: tr("Don't worry! You can still sign up for <b>inklewriter</b>: just choose a username and enter <b>username@inklewriter</b> in the email box.") + "</p><p>" + tr("You'll still be able to share your stories, but don't forget your password, as we won't be able to send a reminder.")
        });
        s = e;
        var t = e.addButton(tr("Okay"), function() {
            e.close(!0)
        })
    }
      , N = function() {
        $.ajax({
            type: "DELETE",
            url: r + "/users/sign_out.json",
            contentType: "application/json",
            processData: !0,
            error: function(e, t, n) {
                console.log(t)
            },
            success: function(e, t, n) {
                console.log(t),
                window.location = r
            }
        }),
        c()
    }
      , C = function() {
        return i.username ? !0 : !1
    }
      , k = function(e) {
        !i.currentStoryId || i.currentStoryId === "local" ? (i.currentStoryId = "local",
        i.stories.local = e) : (i.stories[i.currentStoryId] = e,
        i.currentStoryId != "local" && (e.url_key = i.currentStoryId)),
        o()
    }
      , L = function() {
        return i.stories.local ? !0 : !1
    }
      , A = function() {
        i.currentStoryId = null
    }
      , O = function() {
        if (C())
            if (EditorMenu.unsavedChanges()) {
                var e = navigator.cookieEnabled ? "<p>" + tr("You have been disconnected from inklewriter, perhaps because of an extended period of inactivity.") + "</p><p>" + tr("Please sign in again to save your unsaved changes.") + "</p>" : "<p>" + tr("You have been disconnected from inklewriter because your browser has cookies disabled. Please enable cookies for this site to sign in") + "</p>";
                //_gaq.push(["_trackEvent", "Lost Connection to Server", "Signed out"]);
                var t = new Dialogue({
                    title: tr("Signed out"),
                    message: e
                });
                t.addButton(tr("Sign in"), function() {
                    EditorMenu.requireSave(),
                    i.stories.local = i.stories[i.currentStoryId],
                    i.currentStoryId = "local",
                    o(),
                    a({
                        id: null,
                        email: null
                    }),
                    EditorMenu.setup(),
                    t.close(),
                    x()
                })
            } else {
                var t = new Dialogue({
                    title: tr("Disconnected"),
                    message: tr("You have been disconnected from inklewriter, perhaps because of an extended period of inactivity.")
                });
                t.addButton(tr("Okay"), function() {
                    c(),
                    window.location = r
                })
            }
    }
      , saveStoryData = function(t, n, s) {
        var o = !1;
        if (!i.currentStoryId || i.currentStoryId === "local")
            t.url_key && t.url_key != "local" ? i.currentStoryId = t.url_key : (o = !0,
            i.currentStoryId = "local");
        var u = jQuery.stringifyJSON(t);
        if (o)
            $.ajax({
                type: "POST",
                url: r  + "/stories.json",
                contentType: "application/json",
                processData: !0,
                data: u,
                success: function() {
                    console.log("Successfully sent data (update)."),
                    e = 0,
                    n()
                },
                error: function(t, n, r) {
                    console.log("Could not save new story. Recovering..."),
                    e++,
                    e > 20 ? O() : s && s()
                }
            }).done(function(e) {
                console.log("Sending (updating) done."),
                i.currentStoryId = e.url_key,
                i.stories[i.currentStoryId] = t,
                delete i.stories.local,
                l()
            });
        else {
            var a = r + "/stories/" + i.currentStoryId + ".json";
            $.ajax({
                type: "PUT",
                url: a,
                contentType: "application/json",
                dataType: "text",
                processData: !0,
                data: u,
                success: function(t, r, i) {
                    e = 0,
                    n()
                },
                error: function(t, n, r) {
                    console.log("Could not save update to story. Recovering..."),
                    e++,
                    e > 10 ? O() : s && s()
                }
            }).done(function(e) {
                l(),
                console.log("Sending (updating) done.")
            })
        }
    }
      , _ = function(e) {
        return i.currentStoryId = e,
        o(),
        i.stories[e]
    }
      , D = function(e, t) {
        $.ajax({
            type: "GET",
            url: r + "/stories/" + e + ".json",
            contentType: "application/json",
            processData: !0,
            success: function(e, n, r) {
                t(e)
            },
            error: function(e, t, n) {}
        })
    }
      , P = function() {
        if (i.currentStoryId)
            return i.stories[i.currentStoryId]
    }
      , H = function() {
        return i.stories.local
    }
      , B = function(e) {
        delete i.stories[e];
        var t = r + "/stories/" + e + ".json";
        $.ajax({
            type: "DELETE",
            url: t,
            contentType: "application/json",
            success: function() {
                console.log("Deleted story id " + e)
            }
        }),
        i.currentStoryId === e && (A(),
        l())
    },
      popupPasswordRecovery = function() {
        var dialogue = new Dialogue({
            title: tr("Forgotten your password?"),
            message: tr("Don't worry! We will send you a link with instructions on how to reset it. ") +
              tr("In case you subscribed with a <b>username@inklewriter</b> email address, you will have to create a new account and reimport your stories.")
        });
        var emailField = dialogue.addField(tr("Your email"));
        dialogue.addButton(tr(tr("Cancel")));
        var validate_button = dialogue.addButton(tr("Submit"), function() {
          if (!(emailField.value())) {
              dialogue.setMessage(tr("Please provide your email"));
              return;
          }
          validate_button.disable();
          var data = {
            "utf8" : "✓", 
            "user" : 
              {"email" : emailField.value(), "commit" : tr("Send me reset password instructions")}
          };
          $.ajax({
              type: "POST",
              url: "/users/password",
              contentType: "application/json",
              processData: !0,
              data: jQuery.stringifyJSON(data),
              success: function(jqXHR, textStatus, errorThrown) {
                
                  if ( "errors" in jqXHR ) {
                    errMsg = tr("The email you provided is not in the database or is invalid.");
                    dialogue.setMessage(errMsg);
                    validate_button.enable();
                    return;
                  }
                  dialogue.close();
                  var okayDialogue = new Dialogue({
                      title: tr("Check your email"),
                      message: tr("We have sent you the informations and a confirmation link.")
                  });
                  okayDialogue.addButton(tr("Okay"), function() {
                      okayDialogue.close()
                  })              },
              error: function(jqXHR, textStatus, errorThrown, data) {
                  console.log( jqXHR, textStatus, errorThrown, data)
                  alert(tr("An error occured... Something might be wrong with the server."));
                  validate_button.enable();
              }
          });
        })   
        
    }
    ;
    return $(document).ajaxSend(function(e, t, n) {
        if (typeof AUTH_TOKEN == "undefined")
            return;
        n.data = n.data || "";
        if (n.contentType == "application/json") {
            var r;
            n.data.length > 0 ? r = jQuery.parseJSON(n.data) : r = {},
            r.authenticity_token = AUTH_TOKEN,
            n.data = jQuery.stringifyJSON(r)
        } else
            n.data += (n.data ? "&" : "") + "authenticity_token=" + encodeURIComponent(AUTH_TOKEN)
    }),
    {
        signIn: x,
        signOut: N,
        signedIn: C,
        openRegisterDialogue: S,
        saveStoryData: saveStoryData,
        localSave: k,
        hasLocalStoryData: L,
        clearSession: c,
        setUserSession: a,
        closeCurrentStory: A,
        loadCurrentStory: P,
        loadLocalStory: H,
        loadStoryId: _,
        loadExternalStoryId: D,
        startNewStory: function() {
            i.currentStoryId = "local"
        },
        deleteStory: B,
        username: function() {
            return i.username
        },
        allStories: function() {
            return i.stories
        },
        currentStoryId: function() {
            return i.currentStoryId
        },
        popupLoginHelp: T,
        popupPasswordRecovery: popupPasswordRecovery,
        fetchStories: g
    }
}()
  , EditorMenu = function() {
    var e = 0
      , t = 5
      , n = 10
      , r = 20
      , i = 30
      , s = 40
      , o = 50
      , u = e
      , a = 6e3
      , f = !1
      , l = null
      , c = !1
      , h = function(e) {
        return e.length > 0 ? !0 : !1
    }
      , p = h
      , d = h
      , v = h
      , m = /^(\d{1,2})\/(\d{1,2})\/(\d\d|19\d\d|20\d\d)$/
      , g = function(e) {
        return m.test(e) ? !0 : !1
    }
      , y = 13
      , b = 21
      , w = new Date("April 15, 2012")
      , E = "Sorry, you must be aged between " + y + " and " + b + " on the competition deadline date to enter!"
      , S = function(e) {
        var t = e.match(m);
        if (t.length === 4) {
            var n = parseInt(t[3], 10);
            n < 50 ? n += 2e3 : n < 100 && (n += 1900);
            var r = parseInt(t[2], 10)
              , i = parseInt(t[1], 10)
              , s = new Date(n + y,r - 1,i)
              , o = new Date(n + b,r - 1,i);
            if (w.getTime() > s.getTime() && w.getTime() < o.getTime())
                return !0
        }
        return !1
    }
      , x = function() {
        c = !1,
        Player.clear(),
        Editor.loadDefaultStory(),
        R(e),
        T(),
        U()
    }
      , T = function() {
        EditorAccount.signedIn() ? EditorAccount.startNewStory() : EditorAccount.clearSession()
    }
      , OpenStory = function(e) {
        var t = new Dialogue({
            title: e.title,
            message: e.message
        })
          , n = e.mainButtonTitle || "Open"
          , r = $('<ul id="fileList"></ul>');
        t.addContent(r);
        var i = function() {
            var n = [];
            EditorAccount.signedIn() && (n = EditorAccount.allStories());
            var o = e.hasDelete ? '<div class="delete button">X</div>' : "";
            for (var u in n) {
                var a = n[u];
                if (a) {
                    var f = a.title
                      , l = $("<li>" + f + o + "</li>");
                    l.data("storyId", u),
                    r.append(l)
                }
            }
            r.find("li").bind("click tap", function() {
                $(this).hasClass("selected") ? ($(this).removeClass("selected"),
                s.disable()) : (r.find(".selected").removeClass("selected"),
                $(this).addClass("selected"),
                s.enable())
            }),
            r.find("li").bind("dblclick", function() {
                var n = $(this).data("storyId");
                n && (e.choose(n),
                t.close())
            }),
            e.hasDelete && r.find(".delete.button").bind("click tap", function() {
                var e = $(this).closest("li")
                  , t = e.data("storyId")
                  , n = EditorAccount.allStories()[t]
                  , o = tr("Untitled");
                n && (o = n.title);
                var u = new Dialogue({
                    title: tr("Delete story"),
                    message: tr("Are you sure you wish to delete the story ") + o + "?"
                });
                u.addButton(tr("Cancel")),
                u.addButton(tr("Delete"), function() {
                    EditorAccount.currentStoryId() == t && x(),
                    EditorAccount.deleteStory(t),
                    r.find("li").remove(),
                    i(),
                    s.disable(),
                    u.close()
                })
            })
        };
        i(),
        t.addButton(tr("Cancel"));
        var s = t.addButton(n, function() {
            var n = r.find(".selected")
              , i = n.data("storyId");
            e.choose(i),
            t.close()
        });
        return s.disable(),
        t
    }
      , C = function() {
        var e = function() {
            var e = OpenStory({
                title: tr("Open"),
                message: tr("Choose the story to open"),
                hasDelete: !0,
                choose: function(e) {
                    u = s,
                    c = !1,
                    Player.clear(),
                    Editor.load(EditorAccount.loadStoryId(e)),
                    U()
                }
            })
        };
        if (u >= n && u < s) {
            var t = new Dialogue({
                title: tr("Unsaved changes"),
                message: tr("Saving is in progress. Are you sure you wish to continue and open a different story anyway?")
            });
            t.addButton(tr("Cancel")),
            t.addButton(tr("Continue..."), function() {
                t.close(),
                e()
            })
        } else
            e()
    }
      , k = function() {
        var e = new Dialogue({
            title: "inkle writing competition",
            message: "inkle is running an interactive fiction writing competition, open between                       blah and blah. If you're aged between " + y + " and " + b + " you're very welcome to enter!                       For more information, go to <a href='http://www.inklestudios.com/competition'>our                       main competition page</a>.<br/><br/>If you're ready to submit your entry, click enter!"
        });
        e.addButton("Cancel"),
        e.addButton("Enter", function() {
            e.close();
            var t = OpenStory({
                title: "Competition entry",
                message: "Choose the story you'd like to enter in the competition",
                mainButtonTitle: "Submit",
                choose: function(e) {
                    var t = EditorAccount.allStories()[e]
                      , n = new Dialogue({
                        title: "Entry form",
                        message: "Your details"
                    })
                      , r = n.addField("First name")
                      , i = n.addField("Last name")
                      , s = n.addField("Date of birth (DD/MM/YYYY)");
                    n.addButton("Cancel"),
                    n.addButton("Submit", function() {
                        if (!d(r.value())) {
                            n.setMessage("Please enter your first name");
                            return
                        }
                        if (!v(i.value())) {
                            n.setMessage("Please enter your last name");
                            return
                        }
                        if (!g(s.value())) {
                            n.setMessage("Please specify the date in the format DD/MM/YYYY");
                            return
                        }
                        if (!S(s.value())) {
                            n.setMessage(E);
                            return
                        }
                        var e = new Dialogue({
                            title: "Submit entry",
                            message: 'Are you sure you wish to submit "' + t.title + "\" into inkle's competition?"
                        });
                        e.addButton("Cancel"),
                        e.addButton("Submit", function() {
                            n.close(),
                            e.close();
                            var t = new Dialogue({
                                title: "Thank you!",
                                message: "Your story has been successfully entered into the competition. Good luck!"
                            });
                            t.addButton("Okay")
                        })
                    })
                }
            })
        })
    }
      , L = function(e) {
        if (u == t) {
            var n = new Dialogue({
                title: tr("Save changes?"),
                message: tr("Would you like to log in and save changes to your work in progress before continuing?")
            });
            n.addButton(tr("Don't save"), function() {
                n.close(),
                e()
            }),
            n.addButton(tr("Cancel")),
            n.addButton(tr("Save"), function() {
                n.close(),
                EditorAccount.signIn()
            })
        } else if (u >= r && u < s) {
            var n = new Dialogue({
                title: tr("Unsaved changes"),
                message: tr("Saving is in progress. Are you sure you wish to continue anyway?")
            });
            n.addButton(tr("Continue"), function() {
                n.close(),
                e()
            }),
            n.addButton(tr("Cancel"))
        } else
            e()
    }
      , A = function() {
        L(function() {
            R(o),
            T(),
            Editor.loadTutorialStory(),
            H()
        })
    }
      , O = function() {
        var e = $("#libraryButton");
        Editor.toggleLibrary() ? (e.addClass("toggledto"),
        e.attr("tooltip", tr("Close the contents list"))) : (e.removeClass("toggledto"),
        e.attr("tooltip", tr("Open the contents list")))
    }
      , M = function() {
        Editor.launchGraph()
    }
      , _ = function() {
        L(x)
    }
      , D = function() {
        
        const htmlURL = window.location.protocol+"//"+window.location.host+"/stories/" + EditorAccount.currentStoryId();
        const jsonURL = htmlURL + ".json";
        const inkURL = htmlURL + ".ink";
        
        const content = `
        <p><a href="${htmlURL}" target="_blank">${tr("Play the story in a browser")}</a>.</p>
        <input type="text" onClick="this.select();" class="selectInput" value="${htmlURL}" />
        <p><a href="${jsonURL}" target="_blank">${tr("Get the story in JSON format")}</a></p>
        <input type="text" onClick="this.select();" class="selectInput" value="${jsonURL}" />
        <p><a href="${inkURL}" target="_blank">${tr("Get the story in Inklestudio's Ink format")}</a></p>
        <input type="text" onClick="this.select();" class="selectInput" value="${inkURL}" />
        <br><br>
        `;
        var shareDialogue = new Dialogue({
            title: tr("Share '&name'",{name:StoryModel.storyName() }),
            message: content,
            footer: tr("Caution! the JSON format exported here is not usable in Ink.")
//            footer: "<br/>Choose the <b>Release</b> option below to publish your story online at <a href='http://www.textadventures.co.uk'><b>textadventures.co.uk</b></a>."
        })
        
        $("input.selectInput").css({
            borderRadius: 20,
            fontSize: 14,
            textDecoration: "underline",
            padding: 10,
            width: "95%",
            margin: "0px 0px 20px"
        }),

        shareDialogue.addButton(tr("Okay"));
        /*
        e.addButton("Release", function() {
            window.open("http://textadventures.co.uk/create/submitlink/?url=http%3A%2F%2Fwriter.inklestudios.com%2Fstories%2F" + EditorAccount.currentStoryId())
        })
        */


    }
      , P = function() {
        var e = {
            scaleSize: Editor.currentSize,
            optionMirroring: StoryModel.optionMirroring,
            allowCheckpoints: StoryModel.allowCheckpoints
        }
          , t = new Dialogue({
            title: tr("Settings"),
            message: tr("Scale of the editor:")
        })
          , n = $('<div class="optionSet"></div>');
        t.addContent(n);
        var r = function(e, t, n) {
            return $('<div class="dialogueBoxOption"><input type="' + t + '" name="' + e + '"/><label>' + n + "</label></div>")
        }
          , i = function() {
            for (var t = 0; t < Editor.editorSizes.length; t++) {
                var i = r("scale", "radio", Editor.editorSizes[t]);
                i.find("input").data("sizeID", t),
                t === e.scaleSize && i.find("input").attr("checked", !0),
                n.append(i)
            }
            n.find("input").bind("change", function() {
                var e = $(this);
                Editor.changeTextSize(e.data("sizeID"))
            })
        };
        i(),
        t.addContent("<p>" + tr("Read settings:") + "</p>");
        var s = $("<div class='optionSet'></div>");
        t.addContent(s);
        var o = function(t, n, i) {
            var o = r(t, "checkbox", n);
            s.append(o),
            o.find("input").attr("checked", e[i]),
            o.find("input").bind("change", function() {
                StoryModel[i] = $(this).is(":checked")
            })
        };
        o("mirroring", tr("display option once chosen"), "optionMirroring"),
        o("checkpoints", tr("provide more rewind points"), "allowCheckpoints"),
        t.addButton("Okay", function() {
            EditorMenu.requireSave(),
            t.close()
        }),
        t.addButton("Cancel", function() {
            Editor.changeTextSize(e.scaleSize),
            StoryModel.optionMirroring = e.optionMirroring,
            EditorMenu.requireSave(),
            t.close()
        }),
        t.sizeToFit()
    }
      , H = function() {
        var e = Editor.clear();
        Player.setup(e),
        c = !0,
        U()
    }
      , B = function() {
        var e = new Dialogue({
            title: "Working",
            message: "Please wait a moment..."
        });
        setTimeout(function() {
            var t = Player.clear();
            Editor.reloadCurrentStory(t),
            c = !1,
            e.close(),
            Editor.changeTextSize(Editor.currentSize, !0),
            U()
        }, 2)
    }
      , j = function(e) {
        e.empty()
    }
      , F = function(e, t, n, r) {
        var i = t.children();
        i.length > 0 && !i.last().hasClass("separator") && t.append('<div class="separator"></div>');
        var s = $('<div class="menuOption">' + e + "</div>");
        n && s.bind("click tap", function() {
            n()
        }),
        r && s.attr("tooltip", r),
        t.append(s)
    }
      , I = function() {
        var e = $("#account_container #editMenu");
        j(e),
        c || (Editor.settings.graphing && F(tr("map"), e, EditorMenu.launchMapView, tr("Open the map")),
        Editor.toggleLibrary(!0) ? F("<span id='libraryButton' class='toggledto'>" + tr("contents") + "</span>", e, EditorMenu.toggleLibraryView, tr("Close contents list")) : F("<span id='libraryButton'>" + tr("contents") + "</span>", e, EditorMenu.toggleLibraryView, tr("Open contents list"))),
        c ? (F(tr("write"), e, EditorMenu.enterEditMode, tr("Write your story")),
        F("<span class='toggledto'>read</span>", e)) : (F("<span class='toggledto'>write</span>", e),
        F(tr("read"), e, EditorMenu.enterPlayMode, tr("Read your story"))),
        $.browser.msie && parseInt($.browser.version, 10) <= 8 || F("<span style='font-size:24px;'>&#9881;</span>", e, EditorMenu.showSettingsDialogue, tr("Settings")),
        R(u)
    }
      , q = function() {
        var e = $("#account_container #fileMenu");
        j(e),
        EditorAccount.signedIn() ? F(tr("sign out"), e, J, tr("Sign out")) : F(tr("sign in"), e, EditorAccount.signIn, tr("Sign in to your account")),
        F(tr("new"), e, EditorMenu.createNew, tr("Start a new story")),
        EditorAccount.signedIn() && F(tr("open"), e, EditorMenu.open, tr("Open one of your saved stories")),
        EditorAccount.signedIn() && F(tr("import"), e, EditorMenu.importStory, tr("Import a story from another instance")),
        u != o ? (F(tr("tutorial"), e, EditorMenu.loadTutorial, tr("Load the tutorial")),
        EditorAccount.signedIn() ? u > t && F(tr("share"), e, EditorMenu.showShareDialogue, tr("Share your story")) : F(tr("share"), e, EditorAccount.signIn, tr("Sign in to share your story"))) : F(tr("restart tutorial"), e, EditorMenu.loadTutorial, tr("Restart the tutorial")),
        u != o && F(tr("community"), e, function() {
            window.open("/community")
        }, tr("Community and story parameters"))
    }
      , R = function(a) {
        u = a;
        var f = $("#saveStateMessage");
        a === t ? f.text(tr("Sign in to save")) : a >= n && a <= r ? f.text(tr("Saving soon...")) : a === i ? f.text(tr("Saving...")) : a === s ? f.text(tr("Saved.")) : a == e ? f.text("") : a == o ? f.text(tr("Tutorial in progress...")) : f.text(tr("Error. Save state unknown.")),
        EditorAccount.username() && 
          f.prepend( 
            tr("Logged in as &name -- ",{name: EditorAccount.username()})
            ),
        !EditorAccount.signedIn() || a === o || a === s || a === e ? window.onbeforeunload = null : window.onbeforeunload = function() {
            var e = tr("inklewriter has unsaved changes");
            return e
        }
    }
      , U = function() {
        I(),
        q()
    }
      , requireSave = function() {
        if (u == o)
            return;
        u == e && R(t),
        u <= s && u > t && R(n);
        var l = {
            title: StoryModel.storyName(),
            data: StoryModel.exportStory()
        };
        EditorAccount.localSave(l);
        var c = jQuery.stringifyJSON(EditorAccount.loadCurrentStory());
        if (!EditorAccount.signedIn()) {
            console.log("Not signed in, can't save yet.");
            return
        }
        u < r && (console.log("Save pending..."),
        R(r),
        setTimeout(function() {
            if (EditorAccount.signedIn())
                if (u <= r) {
                    console.log("Sending save data to server..."),
                    R(i);
                    var e = c + ""
                      , o = jQuery.parseJSON(e);
                    EditorAccount.saveStoryData(o, function() {
                        u == i ? (R(s),
                        console.log("Saved: " + o.title + ":" + e),
                        U()) : console.log("Although save was just completed, it seems another has been requested.")
                    }, function() {
                        console.log("Save failed. Retrying..."),
                        R(n),
                        requireSave()
                    })
                } else
                    console.log("Skipping save since a save is already in progress (or it's already up to date).");
            else
                R(t);
            f = !1
        }, a))
    }
      , W = function() {
        return u >= t && u <= i ? !0 : !1
    }
      , X = function() {
        if (u > e && u < s)
            console.log("Newly edited file requires save since now logged in."),
            EditorAccount.closeCurrentStory(),
            U(),
            requireSave();
        else if (u === e) {
            var t = EditorAccount.loadCurrentStory();
            t && (u = s,
            U(),
            Editor.load(t),
            console.log("Loaded latest story."))
        }
    }
      , setup = function() {
        U(),
        EditorAccount.signedIn() || u >= n && u < s && R(t),        
        // Allow users to click on the "saved" element to trigger a new save
        $("#saveStateMessage").on("click",function(event){ EditorMenu.requireSave(); })
    }
      , J = function() {
        EditorAccount.signedIn() && L(function() {
            var t = new Dialogue({
                title: tr("Sign out"),
                message: tr("Are you sure you wish to sign out &name ?",{name:EditorAccount.username() }) 
            });
            t.addButton(tr("Cancel")),
            t.addButton(tr("Sign out"), function() {
                EditorAccount.signOut(),
                Editor.loadDefaultStory(),
                R(e),
                EditorMenu.update(),
                t.close(),
                new Splash
            })
        })
    }
      , K = function() {
        var e = EditorAccount.loadLocalStory();
        e && (Editor.load(e),requireSave())
        }
      , importStory = function(){

        // Copy from N
        var t = new Dialogue({
            title: tr("Import"),
            message: tr("Paste your story to import in JSON format."),
            footer: tr("After import, your story will be added to your account. Use the <b>Open</b> button to select it from the list and edit it."),
        })
          , n = tr("Import story")
          , r = $('<form><textarea rows=20 cols=45></textarea></form>');

        t.addContent(r);
        t.addButton(tr("Cancel"));
        t.addButton(tr("Import story"), function() {

            // Based on saveStoryData
            var story = $(".dialogue textarea").val();
            try { 
              JSON.parse(story); 
            } catch(e){
              console.log("Invalid JSON format:",e);
              alert(tr("Oops, your JSON format is invalid!"));
            }
            $.ajax({
                type: "POST",
                url: "/stories.json",
                contentType: "application/json",
                processData: !0,
                data: story,
                success: function(jqXHR, textStatus, errorThrown) {
                    console.log("Successfully sent data (import)."),
                    e=0,
                    t.close()
                },
                error: function(t, n, r) {
                    e++
                    alert(tr("Could not save new story. Try again ?"))
                }
            }).done(function(e) {
                console.log("Sending (importing) done."),
                EditorAccount.fetchStories()
            });
            
            
          })




        return t
      };
    return {
        eraseAndStartNew: x,
        createNew: _,
        loadTutorial: A,
        toggleLibraryView: O,
        launchMapView: M,
        open: C,
        competition: k,
        showShareDialogue: D,
        showSettingsDialogue: P,
        enterPlayMode: H,
        enterEditMode: B,
        inPlayMode: function() {
            return c
        },
        requireSave: requireSave,
        unsavedChanges: W,
        setup: setup,
        update: U,
        processSignedInTasks: X,
        loadLocalStory: K,
        importStory: importStory,
    }
}()
  , Player = function() {
    var e = []
      , t = !1
      , n = function() {
        $(".expired").remove()
    }
      , r = function(r) {
        var i = this;
        this.jqPlayChunk = $('<div class="chunk"><div class="stitch_block"></div><div class="flags"><ul></ul></div></div>'),
        this.stitches = [],
        this.optionBoxes = [],
        this.flagsCollected = [],
        this.wordCount = 0,
        this.hadSectionHeading = !1,
        this.jqFlags = this.jqPlayChunk.find(".flags"),
        this.jqFlags.hide(),
        this.prevChunk = e.last();
        if (this.prevChunk)
            for (var s = 0; s < this.prevChunk.flagsCollected.length; s++)
                i.flagsCollected.push(this.prevChunk.flagsCollected[s]);
        if (!r) {
            t ? this.jqPlayChunk.html("<div class='the_end'>End</div>") : (n(),
            this.jqPlayChunk.html(tr("This page intentionally left blank.") + " <br>(<a href='javascript:EditorMenu.enterEditMode();'>"+tr("Continue the story from here")+"</a>.)")),
            $("#read_area").append(this.jqPlayChunk);
            return
        }
        var o = r;
        this.jqTextBlock = this.jqPlayChunk.find(".stitch_block");
        var a = ""
          , f = "";
        while (o) {
            this.stitches.push(o),
            o.pageNumberLabel() >= 1 && (this.hadSectionHeading = !0);
            if (StoryModel.doesArrayMeetConditions(o._ifConditions, o._notIfConditions, this.flagsCollected)) {
                o.image() && (a += "\n%|%|%" + o.image() + "$|$|$\n"),
                f += o.text().replace(/\n/g, " ") + " ";
                if (!o.text().match(/\[\.\.\.\]/) && !o.runOn() || !o.divert())
                    a += c(f, this.flagsCollected) + "\n",
                    f = "";
                if (o.numberOfFlags() > 0) {
                    StoryModel.processFlagSetting(o, this.flagsCollected);
                    if (!t) {
                        var l = this.jqFlags.find("ul");
                        for (var s = 0; s < o.numberOfFlags(); s++) {
                            var h = o.flagByIndex(s)
                              , p = /^(.*?)\s*(\+|\-)\s*(\b.*\b)\s*$/;
                            if (matchSet = h.match(p))
                                h += " (now " + StoryModel.getValueOfFlag(matchSet[1], this.flagsCollected) + ")";
                            l.append("<li>" + h + "</li>")
                        }
                        this.jqFlags.show()
                    }
                }
            }
            o = o.divert()
        }
        this.wordCount += wordCountOf(a),
        this.jqTextBlock.html(u(a)),
        this.jqPlayChunk.append(this.jqTextBlock),
        $("#read_area").append(this.jqPlayChunk),
        this.createOptionBlock(),
        this.jqRewindButton = $('<div class="rewindButton" tooltip="'+ tr("Rewind to here") + '></div>'),
        this.jqPlayChunk.append(this.jqRewindButton),
        this.jqRewindButton.bind("mousedown tap", function() {
            i.rewindToHere(),
            k()
        }),
        this.jqRewindButton.hide(),
        e.length >= 1 ? (b(this.jqPlayChunk),
        t && this.jqRewindButton.addClass("noText")) : (this.jqRewindButton.addClass("initial"),
        t && this.jqRewindButton.text(tr("Start again")))
    };
    r.prototype.remove = function() {
        this.jqPlayChunk.remove()
    }
    ,
    r.prototype.createOptionBlock = function() {
        var r = "<div class='option-divider'></div>";
        this.jqOptBlock = $("<div class='option_block'>" + r + "</div>");
        if (this.stitches.last().options.length == 0)
            this.jqTextBlock.append('<div class="the_end">End</div>'),
            t ? (this.jqTextBlock.find(".the_end").append("<div class='back_to_top'></div>"),
            this.jqTextBlock.find(".back_to_top").bind("click tap", function() {
                b(e.first().jqPlayChunk)
            }),
            $("#read_area").append("<div id='madeby'>Text &copy; the author. <a href='http://www.inklestudios.com/inklewriter'><strong>inklewriter</strong></a> &copy; <a href='http://www.inklestudios.com'><strong>inkle</strong></a></div>")) : this.jqTextBlock.append('<br>(<a href="javascript:EditorMenu.enterEditMode();">' + tr("Go back to Write mode to continue") + '</a>.)</div>');
        else {
            var i = this.stitches.last().options;
            for (var o = 0; o < i.length; o++) {
                var u = i[o]
                  , a = StoryModel.doesArrayMeetConditions(u._ifConditions, u._notIfConditions, this.flagsCollected);
                if (a || !t) {
                    var f = new s(u,a);
                    this.optionBoxes.push(f),
                    this.jqOptBlock.append(f.jqPlayOption),
                    this.jqOptBlock.append(r)
                }
            }
            this.jqPlayChunk.append(this.jqOptBlock)
        }
        n()
    }
    ,
    r.prototype.rewindToHere = function() {
        var t = e.indexOf(this);
        for (var n = t + 1; n < e.length; n++)
            e[n].jqPlayChunk.remove(),
            e[n].remove();
        e = e.slice(0, t + 1),
        this.createOptionBlock(),
        this.jqRewindButton.hide(),
        $("#madeby").remove(),
        y()
    }
    ;
    var s = function(n, i) {
        this.jqPlayOption = $('<div class="option_button">' + p(n.text()) + "</div>"),
        this.linkTo = n.linkStitch();
        var s = this.linkTo;
        !n.writeModeOnly && i ? this.jqPlayOption.bind("click tap", function() {
            !t || e.last().hadSectionHeading && StoryModel.allowCheckpoints ? e.last().jqRewindButton.show() : e.first().jqRewindButton.show();
            var i = s;
            $(".option_block").addClass("expired"),
            e.push(new r(i)),
            k(),
            y(),
            o(n)
        }) : (this.jqPlayOption.addClass("disabled"),
        n.writeModeOnly ? this.jqPlayOption.attr("tooltip", tr("Switch to write mode to continue.")) : this.jqPlayOption.attr("tooltip", tr("This option has been disallowed by conditions.")))
    }
      , o = function(t) {
        t.text() != "..." && StoryModel.optionMirroring && e.last().jqPlayChunk.prepend('<div class="option_chosen">' + p(t.text()) + "</div>")
    }
      , u = function(e) {
        return e = p(e),
        e = e.replace(/\n+/g, "</div><div class='stitch'>"),
        e = l(e),
        e = a(e),
        e = f(e),
        "<div class='stitch'>" + e + "</div>"
    }
      , a = function(e) {
        return e = e.replace(/\[(.*?)\|(.*?)\]/g, '<a href="$1">$2</a>'),
        e
    }
      , f = function(e) {
        return e = e.replace(/\%\|\%\|\%(.*?)\$\|\$\|\$/g, '<div id="illustration"><img class="pic" src="$1"/></div>'),
        e
    }
      , l = function(e) {
        return e = e.replace(/(\&nbsp\;|\s)+/g, " "),
        e = e.replace(/(\&nbsp\;|\s)+(\.|\,|\;|\:|\?|\!|\”|\’)/g, "$2"),
        e = e.replace(/(\“|\‘)(\&nbsp\;|\s)+/g, "$1"),
        e
    }
      , c = function(e, t) {
        e = d(e),
        e = h(e, t);
        var n = "";
        while (n !== e)
            n = e,
            e = g(e, t),
            e = m(e);
        return e = v(e),
        e
    }
      , h = function(e, t) {
        var n = /\[\s*(number|value)\s*\:\s*(.*?)\s*\]/;
        while (matchSet = e.match(n)) {
            var r = StoryModel.getValueOfFlag(matchSet[2], t);
            r || (r = 0);
            if (matchSet[1] == "value") {
                var i = new NumToWords;
                r = i.convert(r)
            }
            e = e.replace(n, r)
        }
        return e
    }
      , p = function(e) {
        return e = e.replace(/\"([^\n]*?)\"/g, "“$1”"),
        e = e.replace(/(\s|^|\n|<b>|<i>|\(|\“)\'/g, "$1‘"),
        e = e.replace(/\'/g, "’"),
        e = e.replace(/(^|\n)\"/g, "$1“"),
        e
    }
      , d = function(e) {
        return e.replace(/\[\.\.\.\]/g, " ")
    }
      , v = function(e) {
        return e = e.replace(/\*\-(.*?)\-\*/g, "<b>$1</b>"),
        e = e.replace(/\/\=(.*?)\=\//g, "<i>$1</i>"),
        e = e.replace(/(\/\=|\=\/|\*\-|\-\*)/g, ""),
        e
    }
      , m = function(e) {
        var t = /\{\~([^\{\}]*?)\}/, n;
        while (n = e.match(t)) {
            var r = n[1].split("|")
              , i = parseInt(Math.random() * r.length);
            e = e.replace(t, r[i])
        }
        return e
    }
      , g = function(e, t) {
        var n = /\{([^\~\{]*?)\:([^\{]*?)(\|([^\{]*?))?\}/, r = /(^\s*|\s*$)/g, i = /\s*(&&|\band\b)\s*/, s = /\s*(\!|\bnot\b)\s*(.+?)\s*$/, o, u = 0;
        while (o = e.match(n)) {
            u++;
            if (u > 1e3) {
                alert("Error in conditional!");
                break
            }
            if (o.length > 0) {
                var a = ""
                  , f = []
                  , l = []
                  , c = o[1].split(i);
                for (var h = 0; h < c.length; h++)
                    if (c[h] != "&&" && c[h] != "and") {
                        var p = c[h].match(s);
                        p ? l.push(p[2].replace(r, "")) : f.push(c[h].replace(r, ""))
                    }
                StoryModel.doesArrayMeetConditions(f, l, t) ? a = o[2] : o[4] !== undefined && (a = o[4]),
                e = e.replace(n, " " + a + " ")
            }
        }
        return e
    }
      , y = function() {
        if (t)
            return !1;
        var n = 0;
        for (i = 0; i < e.length; i++)
            n += e[i].wordCount;
        n <= 100 ? n = n - n % 10 + 10 : n = n - n % 100 + 100,
        $("#wordcount").text(tr("About &count words",{count: commadString(n) }))
    }
      , b = function(e) {
        var n = $(e);
        if (t)
            var r = $("body")
              , i = n.offset().top - 20;
        else
            var r = $("#read_area")
              , i = r.scrollTop() + n.position().top - 20;
        r.stop().animate({
            scrollTop: i
        }, 1e3)
    }
      , w = function() {
        var t = new GraphModel(e.last().stitches.last())
    }
      , E = function(n) {
        var i = null;
        for (var s = 0; s < n.length; s++) {
            $(".option_block").remove();
            var u = new r(n[s]);
            e.push(u);
            if (i)
                for (var a = 0; a < i.options.length; a++)
                    if (i.options[a].linkStitch() === n[s]) {
                        o(i.options[a]);
                        break
                    }
            (!t || e.last().hadSectionHeading && StoryModel.allowCheckpoints) && e.last().jqRewindButton.show(),
            i = u.stitches.last()
        }
        e.last().jqRewindButton.hide(),
        e.first().jqRewindButton.show(),
        k(),
        y()
    }
      , S = function() {
        var t = [];
        for (var n = 0; n < e.length; ++n) {
            var r = e[n];
            t.push(r.stitches[0]),
            r.remove()
        }
        return e = [],
        $("#player_container").remove(),
        t
    }
      , x = function(e) {
        S();
        var t = $('<div id="player_container">                              <div id="read_area">                              </div>                              <div id="wordcount"></div>                          </div>');
        $("#main_viewport").append(t),
        E(e);
        var n = $("#read_area .chunk").first();
        n.prepend("<h1>" + StoryModel.storyName() + "</h1>" + "<h2>by " + StoryModel.authorName() + "</h2>");
        var r = n.find(".stitch").first();
        r.addClass("openingStitch"),
        sizeEditorCorrectly()
    }
      , T = function(e) {
        t = e
    }
      , N = function() {
        return "inklewriter_saved_game" + StoryModel.storyName().camelCase().substring(0, 16)
    }
      , C = function() {
        var e = [StoryModel.initialStitch]
          , t = null
          , n = [];
        if (hasStorage) {
            StoryModel.nameStitches();
            if (localStorage[N()]) {
                t = JSON.parse(localStorage[N()]);
                var r = t.length > 0;
                for (var i = 0; i < t.length && r; i++) {
                    r = !1;
                    for (var s = 0; !r && s < StoryModel.stitches.length; s++)
                        StoryModel.stitches[s].name() == t[i] && (n.push(StoryModel.stitches[s]),
                        r = !0)
                }
                r || (n = [])
            }
        }
        return n.length > 0 ? n : e
    }
      , k = function() {
        if (!hasStorage || !t)
            return;
        var n = [];
        for (var r = 0; r < e.length; r++)
            n.push(e[r].stitches.first().name());
        localStorage[N()] = JSON.stringify(n)
    };
    return {
        setup: x,
        clear: S,
        createFromModel: E,
        getSavedGame: C,
        setReadOnlyMode: T,
        launchGraph: w,
        readOnly: function() {
            return t
        }
    }
}()
  // The long tutorial
  , tutorialStory = {
    name: "A Tutorial Story",
    story: {
        stitches: {
            welcomeToInklewr: {
                content: ["Welcome to *-inklewriter-*!", {
                    option: "Click here to continue",
                    linkPath: "wellItsAToolForW",
                    ifConditions: null,
                    notIfConditions: null
                }, {
                    option: "(I just want to pick a tutorial.)",
                    linkPath: "noProblemMakeSur",
                    ifConditions: null,
                    notIfConditions: null
                }, {
                    option: "(I want to ask a quick question.)",
                    linkPath: "FAQs"
                }, {
                    pageNum: 1
                }, {
                    pageLabel: "The beginning"
                }]
            },
            FAQs: {
                content: ["Here are some *-Frequently Asked Questions-*:", {
                    option: "How do I find text in my story?",
                    linkPath: "HowToFind"
                }, {
                    option: "How do I find a place to start writing?",
                    linkPath: "FindingLooseEnds"
                }, {
                    option: "How can I create a loop?",
                    linkPath: "HowToLoop"
                }, {
                    option: "How can I stop my loop repeating the same text?",
                    linkPath: "varyTextInALoop"
                }, {
                    option: "How do I use counters?",
                    linkPath: "counterSyntax",
                    writeModeOnly: !0
                }, {
                    option: "How do I use inline conditions?",
                    linkPath: "inlineSyntax",
                    writeModeOnly: !0
                }, {
                    option: "How do I print the value of a counter?",
                    linkPath: "counterPrint",
                    writeModeOnly: !0
                }, {
                    option: "How do I make text change randomly?",
                    linkPath: "randomText",
                    writeModeOnly: !0
                }, {
                    option: "Can I link to another website?",
                    linkPath: "hyperlinks",
                    writeModeOnly: !0
                }, {
                    pageNum: 34
                }, {
                    pageLabel: "Frequently Asked Questions"
                }]
            },
            counterSyntax: {
                content: ["Define a counter using a marker like the one on the right.", {
                    divert: "counterSyntax2"
                }, {
                    flagName: "counter = 4"
                }]
            },
            counterSyntax2: {
                content: ["Add to it, or subtract by using a marker like these ones. If the marker hasn't been defined before you alter it, it'll start from zero.", {
                    flagName: "counter + 2"
                }, {
                    flagName: "counter - 3"
                }, {
                    option: "And what tests can I perform?",
                    linkPath: "counterSyntax3"
                }, {
                    option: "That's all I needed to know.",
                    linkPath: "FAQs"
                }]
            },
            counterSyntax3: {
                content: ["You can test using equals (=), greater than (>), less than (<), at least (>=) and at most (<=). See the condition bar on this paragraph for examples.", {
                    ifCondition: "counter < 4"
                }, {
                    notIfCondition: "other counter >= 7"
                }, {
                    option: "Okay, thanks.",
                    linkPath: "FAQs"
                }, {
                    option: "How do I write the value of a counter in the story?",
                    linkPath: "counterPrint"
                }]
            },
            hyperlinks: {
                content: ["Linking is easy: just put the URL in square brackets, like this: [http://www.inklestudios.com]. You can also provide a nice link, by adding some text after a vertical bar: [http://www.inklestudios.com|inkle's website]. You can even link to other *-inklewriter-* stories! Take a look at this in both *-write-* mode and *-read-* mode!", {
                    option: "That seems to work!",
                    linkPath: "FAQs"
                }]
            },
            counterPrint: {
                content: ["You can write out the value of a counter as a number or as words, using [number:numberToPrint] or [value:numberToPrint]. (Try this in *-write-* mode and in *-read-* mode.)", {
                    flagName: "numberToPrint + 1"
                }, {
                    option: "Let's see that counter go up...",
                    linkPath: "counterPrint"
                }, {
                    option: "I get it!",
                    linkPath: "FAQs"
                }]
            },
            inlineSyntax: {
                content: ["Inline conditionals are written into the text by hand. They start with a curled bracket and a flag to test, then a colon, and then some text. You can add alternative text by adding a vertical stroke character (|). The conditional ends with a closing curled bracket.", {
                    divert: "inlineSyntax2"
                }]
            },
            inlineSyntax2: {
                content: ["For example, { Flag A: this only prints if Flag A is true,}  { Flag A: while this has alternatives | this prints if Flag A isn't true}.", {
                    option: "Can I do more complex tests?",
                    linkPath: "inlineSyntax3"
                }, {
                    option: "Okay, got it.",
                    linkPath: "FAQs"
                }]
            },
            inlineSyntax3: {
                content: ["You can use the keywords *-not-* and *-and-* in your test. So you could write {first flag and second flag and not third flag:a very specific bit of text | and a more common alternative}.", {
                    option: "Okay, got it.",
                    linkPath: "FAQs"
                }]
            },
            varyTextInALoop: {
                content: ["Loops are useful for letting the player explore, but they can cause the same text to repeat over and over. We can fix that using counters.", {
                    option: "Read the full tutorial on counters",
                    linkPath: "variables"
                }, {
                    option: "Show me how",
                    linkPath: "varyText2"
                }]
            },
            varyText2: {
                content: ["Let's make the next paragraph the top of a loop. We add a marker to it, which will counts how many times the reader has been here. We'll keep it blank; and then add some alternative paragraphs below it.", {
                    divert: "varyTextLoopTop"
                }, {
                    pageNum: 36
                }, {
                    pageLabel: "Varying Looped Text"
                }]
            },
            varyTextLoopTop: {
                content: ["", {
                    flagName: "example loop counter + 1"
                }, {
                    divert: "varyTextLoop1"
                }]
            },
            varyTextLoop1: {
                content: ["This text we'd see first time into the loop. (Remember, you'll only see the effect in *-read-* mode.)", {
                    ifCondition: "example loop counter = 1"
                }, {
                    divert: "varyTextLoop2"
                }]
            },
            varyTextLoop2: {
                content: ["And this would be produced on the second time.", {
                    ifCondition: "example loop counter = 2"
                }, {
                    divert: "varyTextLoop3"
                }]
            },
            varyTextLoop3: {
                content: ["And this one every time after that. (Or you could miss out this paragraph, and have no text appear at all, just the options.", {
                    ifCondition: "example loop counter > 2"
                }, {
                    option: "Let's loop around",
                    linkPath: "varyTextLoopTop"
                }, {
                    option: "Enough looping!",
                    linkPath: "randomTextToo",
                    ifConditions: [{
                        ifCondition: "example loop counter > 1"
                    }]
                }]
            },
            randomTextToo: {
                content: ["You could also use random text, by putting different options into curly braces, and adding a ~ mark at the start to turn on 'shuffle mode'.", {
                    divert: "randomTextToo2"
                }]
            },
            randomText: {
                content: ["You can make *-inklewriter-* choose from a list of of alternative things to print using curly braces and a ~ mark. You can even put these inside each other! Here's an example.", {
                    divert: "randomTextToo2"
                }]
            },
            randomTextToo2: {
                content: ["{~For example, you might|So you could, maybe|So one thing you could do is} {~change|vary|alter} the text {~a {~little|bit}|lots and lots}!", {
                    divert: "randomTextToo3"
                }]
            },
            randomTextToo3: {
                content: ["(Take a look at this in both *-write-* mode and *-read-* mode to see what it does.)", {
                    option: "Let's see this a different way...",
                    linkPath: "randomTextToo2"
                }, {
                    option: "Enough randomness!",
                    linkPath: "FAQs"
                }]
            },
            FindingLooseEnds: {
                content: ["If you've written your story, you may still have extra branches to add. These are called 'loose ends', and if you've written the options for them, they'll appear in red in the *-Contents-* pane. This should make them easy to find.", {
                    divert: "FindingLooseEnds2"
                }]
            },
            FindingLooseEnds2: {
                content: ["You can even click on them in the *-Contents-* pane, and this will take you directly to where you need to start writing!", {
                    divert: "FindingLooseEnds3"
                }]
            },
            FindingLooseEnds3: {
                content: ["So it's a good idea when writing to make all the options as you go; then they're easier to go back and fill in.", {
                    option: "Okay, thanks.",
                    linkPath: "FAQs"
                }]
            },
            HowToLoop: {
                content: ["Loops are often useful for creating 'hubs' in the story, that the reader can revisit to review information, or re-read something. To make a loop, you'll need to use the *-Join-* feature.", {
                    divert: "HowToLoop2"
                }]
            },
            HowToLoop2: {
                content: ["Write the story as normal until you want to create the loop. Then make a new blank paragraph and click the *-Join-* button below. (This will only appear if there are no options from this paragraph.)", {
                    divert: "HowToLoop3"
                }]
            },
            HowToLoop3: {
                content: ["Clicking *-Join-* will bring out the contents window, if it's not already visible. Scroll through and click the paragraph to join to. Try it now - join this paragraph back up to the Frequently Asked Questions paragraph."]
            },
            HowToFind: {
                content: ["As your story gets longer, navigating it can become more difficult. So *-inklewriter-* provides lots of ways of getting around.", {
                    divert: "HowToFind2"
                }]
            },
            HowToFind2: {
                content: ["Firstly, there's the *-Contents-* pane. You can open this using the button in the toolbar. This lists all the paragraphs you've written, and you can click on any to jump straight there.", {
                    divert: "HowToFind3"
                }]
            },
            HowToFind3: {
                content: ["If you can't find the paragraph you want, use the search box at the top of the *-Contents-* pane. Typing here will filter the list to just those containing the text you want.", {
                    option: "I've got more questions.",
                    linkPath: "FAQs"
                }, {
                    option: "I want to see a full tutorial.",
                    linkPath: "noProblemMakeSur"
                }]
            },
            noProblemMakeSur: {
                content: ["No problem. Make sure you're in *-write-* mode, then click the arrow to continue.", {
                    option: "Choose a tutorial",
                    linkPath: "ifYouveNeverUsed",
                    writeModeOnly: !0,
                    ifConditions: null,
                    notIfConditions: null
                }]
            },
            wellItsAToolForW: {
                content: ["*-inklewriter-* is a tool for writing interactive stories. ", {
                    option: "What's an interactive story?",
                    linkPath: "youreReadingOne",
                    ifConditions: null,
                    notIfConditions: null
                }, {
                    option: "I get it. Let's get started.",
                    linkPath: "noProblemThisTut",
                    ifConditions: null,
                    notIfConditions: null
                }, {
                    pageNum: 2
                }, {
                    pageLabel: "Introduction"
                }]
            },
            youreReadingOne: {
                content: ["What is an interactive story? Well, you're reading one!", {
                    divert: "wellThisIsAnUnus"
                }, {
                    pageNum: 3
                }, {
                    pageLabel: "Interactive what?"
                }]
            },
            wellThisIsAnUnus: {
                content: ["Except of course, this isn't really a story. This is a tutorial. In most interactive stories, you - the reader - would be telling the story what you want the main character to do, by making choices.", {
                    divert: "butForNowWereTry"
                }]
            },
            butForNowWereTry: {
                content: ["But for now, we're trying to learn how it works. So let's get going.", {
                    option: "Okay",
                    linkPath: "noProblemThisTut",
                    ifConditions: null,
                    notIfConditions: null
                }, {
                    option: "I still don't get it. An example, please?",
                    linkPath: "ohOkayHereGoesUm",
                    ifConditions: null,
                    notIfConditions: null
                }]
            },
            ohOkayHereGoesUm: {
                content: ["Oh, okay. Here goes. Um...", {
                    divert: "theInspectorLook"
                }]
            },
            theInspectorLook: {
                content: ["/=The Inspector looks around the room with a cold eye. He's quite sure one of them is hiding something. But which one?=/", {
                    option: "The young man with the limp",
                    linkPath: "theYoungManWithT",
                    ifConditions: null,
                    notIfConditions: null
                }, {
                    option: "The lady. She's not what she seems.",
                    linkPath: "theLadySometimes",
                    ifConditions: null,
                    notIfConditions: null
                }, {
                    pageNum: 4
                }, {
                    pageLabel: "Example story"
                }]
            },
            theYoungManWithT: {
                content: ["/=The young man with the limp. He says he has a war wound but he's far too young. More likely, he fell from a high window or a balcony doing something he shouldn't.=/", {
                    divert: "somethingLikeMur"
                }]
            },
            somethingLikeMur: {
                content: ["/=Something like murder, perhaps?=/", {
                    option: '"How\'s the leg?"',
                    linkPath: "howsTheLegTheIns",
                    ifConditions: null,
                    notIfConditions: null
                }, {
                    option: '"I didn\'t catch your name."',
                    linkPath: "iDidntCatchYourN",
                    ifConditions: null,
                    notIfConditions: null
                }]
            },
            theLadySometimes: {
                content: ["/=The lady. Sometimes intuition is all you have to go on. The Inspector saunters over to her, and places a hand gently on her elbow.=/", {
                    divert: "mrsDeWinterIfIMa"
                }]
            },
            mrsDeWinterIfIMa: {
                content: ['/="Mrs DeWinter. If I may call you that."=/', {
                    divert: "ofCourseYouMaySh"
                }]
            },
            ofCourseYouMaySh: {
                content: ['/="Of course you may," she replies, with gentle surprise.=/', {
                    option: '"I ask, because it isn\'t your name."',
                    linkPath: "noPointBeatingAr",
                    ifConditions: null,
                    notIfConditions: null
                }, {
                    option: '"Tell me about yourself."',
                    linkPath: "tellMeAboutYours",
                    ifConditions: null,
                    notIfConditions: null
                }]
            },
            howsTheLegTheIns: {
                content: ['/="How\'s the leg?" the Inspector asks, casually.=/', {
                    divert: "howDyouThinkTheB"
                }]
            },
            howDyouThinkTheB: {
                content: ['/="How d\'you think?" the boy replies, with a sullen smile. =/', {
                    divert: "theInspectorIsnt"
                }]
            },
            theInspectorIsnt: {
                content: ["/=The Inspector isn't fooled for a second.=/", {
                    option: "So what happens next?",
                    linkPath: "iDontKnowItWasOn",
                    ifConditions: null,
                    notIfConditions: null
                }]
            },
            iDidntCatchYourN: {
                content: ['/="I didn\'t catch your name," the Inspector begins.=/', {
                    divert: "cosIDidntGiveItT"
                }]
            },
            cosIDidntGiveItT: {
                content: ['/="\'Cos I didn\'t give it," the boy answers, sullenly. "Why should I?"=/', {
                    divert: "theInspectorIsnt"
                }]
            },
            noPointBeatingAr: {
                content: ['/=No point beating around the bush. "I ask," he replies, "simply because it isn\'t your name."=/', {
                    divert: "sheSmilesWeaklyI"
                }]
            },
            sheSmilesWeaklyI: {
                content: ['/=She smiles weakly. "Inspector? Don\'t be ridiculous."=/', {
                    divert: "theInspectorIsnt"
                }]
            },
            tellMeAboutYours: {
                content: ['/="Tell me about yourself," he begins, choosing his words carefully.=/', {
                    divert: "theresNotALotToT"
                }]
            },
            theresNotALotToT: {
                content: ['/="There\'s not a lot to tell," she replies. "Not a lot that this house doesn\'t tell you for itself." And she simpers a dreadful laugh.=/', {
                    option: "What happens next?",
                    linkPath: "iDontKnowItWasOn",
                    ifConditions: null,
                    notIfConditions: null
                }]
            },
            iDontKnowItWasOn: {
                content: ["I don't know -- it was only an example. I guess what happens next is that you write your own! So let's have some tutorials.", {
                    option: "Fair enough. Less yak, more action.",
                    linkPath: "noProblemThisTut",
                    ifConditions: null,
                    notIfConditions: null
                }]
            },
            noProblemThisTut: {
                content: ["This tutorial starts off in *-Read-* mode. This is how readers will see your story. But to edit it, you need to be in *-Write-* mode. Switch over now, using the button on the right-hand side of the menu bar.", {
                    option: "Click the arrow on this tab when ready",
                    writeModeOnly: !0,
                    linkPath: "youreNowInWriteM",
                    ifConditions: null,
                    notIfConditions: null
                }]
            },
            youreNowInWriteM: {
                content: ["You're now ready to start working through the tutorials. You'll only need to read the first two to get started - later tutorials demonstrate some more powerful features.", {
                    divert: "ifYouveNeverUsed"
                }]
            },
            ifYouveNeverUsed: {
                content: ["If you've never used *-inklewriter -*before, start with the top option.", {
                    option: "Let's begin at the beginning...",
                    linkPath: "interactiveStori",
                    ifConditions: null,
                    notIfConditions: null
                }, {
                    option: "Tell me about joining and jumping to...",
                    linkPath: "inThisTutorialWe",
                    ifConditions: null,
                    notIfConditions: null
                }, {
                    option: "Tell me about sections and loose ends...",
                    linkPath: "thisTutorialIsAb",
                    ifConditions: null,
                    notIfConditions: null
                }, {
                    option: "Tell me about markers...",
                    linkPath: "nextLetsTalkAbou",
                    ifConditions: null,
                    notIfConditions: null
                }, {
                    option: "Tell me about widgets...",
                    linkPath: "nowItsTimeToTalk",
                    ifConditions: null,
                    notIfConditions: null
                }, {
                    option: "How do I change the story flow?",
                    linkPath: "changingTheStory",
                    ifConditions: null,
                    notIfConditions: null
                }, {
                    option: "Wait: one last thing. How do I share?",
                    linkPath: "youCanShareYourS",
                    ifConditions: null,
                    notIfConditions: null
                }, {
                    pageNum: 5
                }, {
                    pageLabel: "Choose a tutorial"
                }]
            },
            youCanShareYourS: {
                content: ["You can share your stories with anyone you like. Just click *-share-* and use the links *-inklewriter-* will show to you.", {
                    divert: "thisAddressIsUni"
                }, {
                    pageNum: 6
                }, {
                    pageLabel: "Sharing stories"
                }]
            },
            thisAddressIsUni: {
                content: ["This address is unique to you. People using it will be able to read your story, but they won't be able to edit it.", {
                    divert: "inTheFutureWeHop"
                }]
            },
            inTheFutureWeHop: {
                content: ["In the future, we hope they'll be able to give you feedback too! But for now, you'll just have to talk about it over *-Twitter-* or something instead.", {
                    option: "Right. Time to write, then",
                    linkPath: "toStartWritingJu",
                    ifConditions: null,
                    notIfConditions: null
                }]
            },
            nowDontClickTheS: {
                content: ["Let's join to the paragraph that begins, 'As if by magic'. It should be almost the top one visible on the screen.", {
                    divert: "clickThatPlusSym"
                }]
            },
            clickThatPlusSym: {
                content: ["If you point to it with your mouse, you'll see a 'ghost' version of the join you're about to make. And if you click, the join will be made. Do that now, and..."]
            },
            changingTheStory: {
                content: ["Changing the story flow is often important. You might want to add new branches, or extend a part of the story.", {
                    divert: "theMostImportant"
                }, {
                    pageNum: 8
                }, {
                    pageLabel: "Changing the flow"
                }]
            },
            theMostImportant: {
                content: ['The most important thing here is the "unlink" button. ', {
                    divert: "youllHaveSeenThe"
                }]
            },
            youllHaveSeenThe: {
                content: ['You\'ll have seen the "unlink" button popping up now and again. Unlinking is what you do if you want to change your mind about where a paragraph should be in the story.', {
                    divert: "ifYouUnlinkAStit"
                }]
            },
            ifYouUnlinkAStit: {
                content: ["If you unlink a paragraph, it'll be taken out of the story, but it won't get deleted. Instead, it'll be kept in the *-Contents-* so you can attach it somewhere else, and it'll also get a delete button, in case you want to get rid of it completely.", {
                    option: "If you want to try it...",
                    linkPath: "thenClickTheUnli",
                    ifConditions: null,
                    notIfConditions: null
                }, {
                    option: "Otherwise...",
                    linkPath: "byUnlinkingStitc",
                    ifConditions: null,
                    notIfConditions: null
                }]
            },
            thenClickTheUnli: {
                content: ["... click the unlink button above this paragraph. The story will scroll back to the last paragraph, and the option that took you to this paragraph will now be unattached. Finally, this paragraph will be moved to the top of the *-Contents-* and marked as 'unused'. (You can always put it back again using joins.)"]
            },
            byUnlinkingStitc: {
                content: ["By unlinking paragraphs and using joins, you can move a paragraph from one part of the story to another. And that's how you change the flow!", {
                    option: "Right. Any more tutorials?",
                    linkPath: "justOne",
                    ifConditions: null,
                    notIfConditions: null
                }, {
                    flagName: "unlinking!"
                }]
            },
            justOne: {
                content: ["Just one. ", {
                    divert: "youCanShareYourS"
                }]
            },
            nextLetsTalkAbou: {
                content: ["Next let's talk about the tab on the right of this paper. This is a *-marker-*. Markers are used to keep track of which branches the reader has read, so you can change what happens later in the story based on what happened earlier.", {
                    option: "Let's see how that works",
                    linkPath: "letsTryItOutBelo",
                    ifConditions: null,
                    notIfConditions: null
                }, {
                    flagName: "A marker!"
                }, {
                    pageNum: 10
                }, {
                    pageLabel: "Markers"
                }]
            },
            letsTryItOutBelo: {
                content: ["Let's try it out. Below are two options that lead to two different paragraphs, which then join back together. Each one sets a different marker. Try both options (rewinding back to this section to change your route), and see how the options change when the story joins back together.", {
                    option: "Here's one route...",
                    linkPath: "onThisRouteWellS",
                    ifConditions: null,
                    notIfConditions: null
                }, {
                    option: "Here's the other route...",
                    linkPath: "thisIsTheOtherRo",
                    ifConditions: null,
                    notIfConditions: null
                }]
            },
            onThisRouteWellS: {
                content: ['On this route, we\'ll set the marker called "the first route".', {
                    divert: "thenWellJoinBack"
                }, {
                    flagName: "the first route"
                }]
            },
            thenWellJoinBack: {
                content: ["Then we'll join back together. (You'll need to rewind to the previous section, and try the other route, to complete this tutorial correctly.)", {
                    divert: "lookInReadMode"
                }, {
                    pageNum: -1
                }]
            },
            thisIsTheOtherRo: {
                content: ['This is the other route. I want you to set the marker on this route. Click the "add marker" symbol on the right of this paragraph, and enter the marker name "the second route".', {
                    divert: "lookInReadMode"
                }]
            },
            lookInReadMode: {
                content: ["Now take a look in *-read-* mode. The marker passed appears on the right. This is to help you test your story, but your readers won't be able to see these markers when you share the story.", {
                    option: "Now go back to write mode and continue",
                    linkPath: "nowLetsLookAtThe",
                    writeModeOnly: !0
                }]
            },
            nowLetsLookAtThe: {
                content: ["Now let's look at the options below. They both have conditions on them, which control when the reader will see them.", {
                    divert: "theConditionsTes"
                }, {
                    pageNum: 11
                }, {
                    pageLabel: "Conditional options"
                }]
            },
            theConditionsTes: {
                content: ["The conditions test whether certain markers have been read, or not.", {
                    option: "This option requires the first marker",
                    linkPath: "ConditionalsBackUp",
                    ifConditions: [{
                        ifCondition: "the first route"
                    }],
                    notIfConditions: null
                }, {
                    option: "This option requires the second marker",
                    linkPath: "whenYouRewind",
                    ifConditions: [{
                        ifCondition: "the second route"
                    }],
                    notIfConditions: null
                }]
            },
            ConditionalsBackUp: {
                content: ["You took the first route. So now I'll loop, so you can take the other route instead. But first we'd better unset that first route marker.", {
                    divert: "letsTryItOutBelo"
                }, {
                    flagName: "the first route = false"
                }]
            },
            whenYouRewind: {
                content: ["We can remove a marker again by setting it to 'false'. (Rewinding also removes markers, but remember, your readers won't be able to rewind the story.)", {
                    option: "So markers track choices?",
                    linkPath: "youCanHaveAsMany"
                }, {
                    flagName: "a marker = false"
                }]
            },
            youCanHaveAsMany: {
                content: ["Exactly. You can have as many markers as you like, so they can be used to keep track of what the reader has seen in the story so far, and so control what options they get given.", {
                    option: "And how do I test for markers?",
                    linkPath: "youCanDoALotOfLo",
                    ifConditions: null,
                    notIfConditions: null
                }]
            },
            youCanDoALotOfLo: {
                content: ["Use the conditional widget (the /=if=/ button) to add logic to a paragraph or option. Let's try it now. Make a new option and click that widget to add a logic bar.", {
                    divert: "LogicNextStep"
                }]
            },
            LogicNextStep: {
                content: ['Click where it says "Add conditions" and it will bring up an interface for adding tests, which have to either be passed - or /=not=/ be passed - for the option to appear. Try it now - and try it in *-read-* mode too!', {
                    option: "Okay, I get it",
                    linkPath: "inlineTests",
                    ifConditions: null,
                    notIfConditions: null
                }]
            },
            inlineTests: {
                content: ["You can also add logic to a paragraph, and that paragraph will only appear if the logic is passed. Try it now: add a condition to this paragraph that isn't true (like passing a marker that is never set) and switch to the *-read-* mode to see it vanish.", {
                    option: "So logic can alter text and options",
                    linkPath: "inlineTests2"
                }]
            },
            inlineTests2: {
                content: ["There's one more powerful trick we can pull as well. Remember before, when we passed either the first route or the second route markers? Well, you took {the first route: the first | the second }.", {
                    divert: "tryThatInReadModeInline"
                }, {
                    pageNum: 35
                }, {
                    pageLabel: "Inline Logic"
                }]
            },
            tryThatInReadModeInline: {
                content: ["That thing in curly brackets is an *-inline conditional-*. That lets you alter the text /=inside=/ a paragraph based on logic. Take a look in *-read-* mode now.", {
                    option: "Only one of the alternatives appears.",
                    linkPath: "ExactlyInline"
                }]
            },
            ExactlyInline: {
                content: ['Exactly. This is great for "colour text", like changing how a character speaks or what pronoun to use for the player.', {
                    option: "I get it.",
                    linkPath: "variables"
                }, {
                    option: "Example, please?",
                    linkPath: "inlineExample"
                }]
            },
            inlineExample: {
                content: ["Firstly, are you a boy or a girl?", {
                    option: "Boy!",
                    linkPath: "IEboy"
                }, {
                    option: "Girl!",
                    linkPath: "IEgirl"
                }, {
                    option: "I prefer not to say...",
                    linkPath: "IEmystery"
                }, {
                    pageNum: 37
                }, {
                    pageLabel: "Inline logic example"
                }]
            },
            IEboy: {
                content: ["A male of the human species. Noted.", {
                    flagName: "boy"
                }, {
                    divert: "IEnext"
                }]
            },
            IEgirl: {
                content: ["A female of the human species. Noted.", {
                    flagName: "girl"
                }, {
                    divert: "IEnext"
                }]
            },
            IEmystery: {
                content: ["Ah, a figure of mystery. Noted.", {
                    flagName: "mystery"
                }, {
                    divert: "IEnext"
                }]
            },
            IEnext: {
                content: ["Secondly, do you eat beans?", {
                    option: "Er, yes?",
                    linkPath: "IEbeans"
                }, {
                    option: "No. Yuk.",
                    linkPath: "IEbeansno"
                }]
            },
            IEbeans: {
                content: ["Good thing, old bean. Very good.", {
                    flagName: "likes beans"
                }, {
                    divert: "IEdone"
                }]
            },
            IEbeansno: {
                content: ["Not a bean fan. Very good.", {
                    divert: "IEdone"
                }]
            },
            IEdone: {
                content: ["So, you're a {boy:man|{girl:girl|mysterious figure}} who thinks beans are {likes beans:, at least, okay | nasty }. Good to meet you.", {
                    divert: "IEdone2"
                }]
            },
            IEdone2: {
                content: ["(Read this in *-read-* mode!)", {
                    option: "I get it. Let's move on.",
                    linkPath: "variables"
                }]
            },
            variables: {
                content: ["There's one last type of marker and test, and that's using counters. This keeps track of a number: maybe how many times the reader has seen a certain character, or how many clues they're collected.", {
                    divert: "variables2"
                }, {
                    pageNum: 38
                }, {
                    pageLabel: "Counters"
                }]
            },
            variables2: {
                content: ["Setting up a counter is easy: just make a marker and give it a value. There's an example on the right of this paragraph.", {
                    flagName: "my counter = 1"
                }, {
                    flagName: "my other counter = 10"
                }, {
                    option: "You can test the value of a counter",
                    linkPath: "variables3",
                    ifConditions: [{
                        ifCondition: "my counter = 1"
                    }]
                }, {
                    option: "This option uses a not condition",
                    linkPath: "variables3",
                    notIfConditions: [{
                        notIfCondition: "my other counter = 5"
                    }]
                }]
            },
            variables3: {
                content: ["You can also increase or decrease a counter's value.", {
                    flagName: "my counter + 1"
                }, {
                    flagName: "my other counter - 2"
                }, {
                    option: "And you can test for inequalities",
                    linkPath: "logicDone",
                    ifConditions: [{
                        ifCondition: "my counter >= 2"
                    }]
                }, {
                    option: "And that's it for conditionals?",
                    linkPath: "logicDone",
                    notIfConditions: [{
                        notIfCondition: "my other counter <= 9"
                    }]
                }]
            },
            logicDone: {
                content: ["And that's how you use logic!", {
                    option: "Great. Next!",
                    linkPath: "nowItsTimeToTalk",
                    ifConditions: null,
                    notIfConditions: null
                }, {
                    option: "Start writing a story",
                    linkPath: "toStartWritingJu",
                    ifConditions: null,
                    notIfConditions: null
                }, {
                    flagName: "Markers done!"
                }]
            },
            interactiveStori: {
                content: ["Interactive stories are made up of paragraphs of text, like this one, and options, which let the reader choose what to read next. ", {
                    option: "This is an option",
                    linkPath: "inInklewriterPar",
                    ifConditions: null,
                    notIfConditions: null
                }]
            },
            inInklewriterPar: {
                content: ["In *-inklewriter-*, paragraphs of text appear on scraps of paper like this, and you can type into them directly.", {
                    divert: "tryItNowClickOnT"
                }]
            },
            tryItNowClickOnT: {
                content: ["Try it now. Click on this box, and edit the text. You can even press Return, and add another paragraph onto the end of this one. ", {
                    option: "When you're ready, click to continue",
                    linkPath: "afterEachParagra",
                    ifConditions: null,
                    notIfConditions: null
                }]
            },
            afterEachParagra: {
                content: ["After each paragraph, there are options, to decide where the reader will go next. Sometimes a paragraph will only have one option, but sometimes, there will be several options. Choosing a different option will cause something different to happen in the story.", {
                    divert: "forInstanceThisP"
                }, {
                    pageNum: 13
                }, {
                    pageLabel: "Options"
                }]
            },
            forInstanceThisP: {
                content: ["For instance, this paragraph has two options. Let's click the first one for now - and leave the second one for later.", {
                    option: "So first, let's take this option.",
                    linkPath: "thisParagraphIsC",
                    ifConditions: null,
                    notIfConditions: null
                }, {
                    option: "If you've come back here, click this",
                    linkPath: "soNowWereWriting",
                    ifConditions: null,
                    notIfConditions: null
                }]
            },
            thisParagraphIsC: {
                content: ['This paragraph is connected to the previous one by the option you chose, and if you look back at the previous paragraph, you can see it says it has "2 links". That\'s to help you keep track of where the story branches.', {
                    divert: "whenYoureWriting"
                }]
            },
            whenYoureWriting: {
                content: ["When you're writing a branching story, you'll have to write what happens in each branch. Some readers will choose one option, and other readers will choose the other!", {
                    divert: "soWeNeedToBeAble"
                }]
            },
            soWeNeedToBeAble: {
                content: ['So we need to be able to move between the different paths that the story can take. The way we do this is by "rewinding".', {
                    divert: "scrollUpTheScree"
                }]
            },
            scrollUpTheScree: {
                content: ["Scroll up the screen to the previous block of text and click the grey arrow symbol in the top right corner. This will rewind the story to that point, so you can make a different choice."]
            },
            soNowWereWriting: {
                content: ["So now we're writing the other branch of the story. Perhaps the protagonist in your story took a different route, or said a different thing to another character. Branches let you make what happens in the story change depending on what the reader does.", {
                    option: "Show me an example",
                    linkPath: "handMeTheMoneySa",
                    ifConditions: null,
                    notIfConditions: null
                }, {
                    option: "I get it. What's next?",
                    linkPath: "takeALookAtTheRi",
                    ifConditions: null,
                    notIfConditions: null
                }]
            },
            takeALookAtTheRi: {
                content: ["Next, let's explore the *-Contents-*. The *-Contents-* is where every bit of text you write is stored away, ready for when you might need it. The *-Contents-* helps you find your way around the story, join up its branches, and keep organised.", {
                    divert: "theStitchLibrary"
                }, {
                    pageNum: 14
                }, {
                    pageLabel: "The Contents List"
                }]
            },
            theStitchLibrary: {
                content: ["By default, the contents pane is hidden, but you can display it by clicking the *-Contents-* button in top right of the menu bar. Click it now.", {
                    option: "It's a list. I get it. What now?",
                    linkPath: "theLastThingYouN",
                    ifConditions: null,
                    notIfConditions: null
                }]
            },
            theLastThingYouN: {
                content: ["The last thing you need to know to get started is how to make options and new paragraphs yourself. This is really easy.", {
                    divert: "seeBelowWhereItS"
                }]
            },
            seeBelowWhereItS: {
                content: ["See below, where it says \"Add option\"? Just click that and it'll make a new blank option for you. Type in the option's text, and then press the arrow to start a new paragraph.", {
                    divert: "tryItBelowAndWhe"
                }]
            },
            tryItBelowAndWhe: {
                content: ["Try it below, and when you're done, rewind back to here and choose the Continue option.", {
                    option: "Continue",
                    linkPath: "soNowYouCouldSta",
                    ifConditions: null,
                    notIfConditions: null
                }]
            },
            soNowYouCouldSta: {
                content: ["So now you could start writing a story, or read the next tutorial, which is about all the ways that inklewriter will help you bring your story back together after it branches.", {
                    option: "Read that tutorial",
                    linkPath: "noProblem",
                    ifConditions: null,
                    notIfConditions: null
                }, {
                    option: "Start writing!",
                    linkPath: "toStartWritingJu",
                    ifConditions: null,
                    notIfConditions: null
                }, {
                    flagName: "first tutorial completed!"
                }]
            },
            noProblem: {
                content: ["No problem.", {
                    divert: "inThisTutorialWe"
                }]
            },
            handMeTheMoneySa: {
                content: ["/='Hand me the money,' says the man in the mask. This is my first day as a bank-clerk. I don't even know where the money is kept! What should I do?=/", {
                    option: "Tell the robber I can't",
                    linkPath: "imSorryYouReplyI",
                    ifConditions: null,
                    notIfConditions: null
                }, {
                    option: "Phone my manager and ask",
                    linkPath: "illJustCallMyMan",
                    ifConditions: null,
                    notIfConditions: null
                }, {
                    pageNum: 16
                }, {
                    pageLabel: "Branch example"
                }]
            },
            imSorryYouReplyI: {
                content: ["/=\"'I'm sorry,' you reply. 'I can't give you the money because I don't know where it is.'\"=/", {
                    divert: "theRobberLooksFu"
                }]
            },
            theRobberLooksFu: {
                content: ["/=The robber looks furious. 'You don't know? Do you know how much trouble I've gone to, in order to stage this robbery? If you don't know, then we'll just have to find someone who does!'=/", {
                    divert: "thisDoesntSoundG"
                }]
            },
            thisDoesntSoundG: {
                content: ["/=This doesn't sound good...=/", {
                    divert: "SoLooksLikeYourC"
                }]
            },
            SoLooksLikeYourC: {
                content: ["... so it looks like your choice has made things worse?", {
                    option: "Oh, dear",
                    linkPath: "wellThatsTheFunO",
                    ifConditions: null,
                    notIfConditions: null
                }, {
                    pageNum: -1
                }]
            },
            illJustCallMyMan: {
                content: ["/='I'll just call my manager and ask where the money is,' I say, lifting the phone.=/", {
                    divert: "itSeemsToMakeThe"
                }]
            },
            itSeemsToMakeThe: {
                content: ["/=It seems to make the robber very angry, though. His face boils. 'Don't touch that phone!' he shouts.=/", {
                    divert: "SoLooksLikeYourC"
                }]
            },
            wellThatsTheFunO: {
                content: ["Well, that's the fun of interactive stories. Everything that happens is down to the reader. So in the example, you might have chosen the other option - and maybe that would have turned out better... or maybe not.", {
                    option: "It's up to the writer, too.",
                    linkPath: "exactlyTheReader",
                    ifConditions: null,
                    notIfConditions: null
                }]
            },
            exactlyTheReader: {
                content: ["Exactly. The reader and writer work together to tell a story.", {
                    option: "Okay, so, what now?",
                    linkPath: "takeALookAtTheRi",
                    ifConditions: null,
                    notIfConditions: null
                }]
            },
            inThisTutorialWe: {
                content: ["In this tutorial, we're going to look at how to join different branches of a story back together again, and how to navigate around larger stories.", {
                    divert: "firstLetsLookAtH"
                }, {
                    pageNum: 17
                }, {
                    pageLabel: "Join and jump"
                }]
            },
            firstLetsLookAtH: {
                content: ["First let's look at how we join together two branches of a story. ", {
                    option: "What does that even mean?",
                    linkPath: "wellHeresAnExamp",
                    ifConditions: null,
                    notIfConditions: null
                }, {
                    option: "Okay, show me how",
                    linkPath: "firstWeNeedAPara",
                    ifConditions: null,
                    notIfConditions: null
                }, {
                    option: "Ignore this option for now!",
                    linkPath: "thereYouAre",
                    ifConditions: null,
                    notIfConditions: null
                }]
            },
            wellHeresAnExamp: {
                content: ["Well, here's an example from a story.", {
                    divert: "jimWasntReallySu"
                }]
            },
            jimWasntReallySu: {
                content: ["/=Jim wasn't really sure what to do next. He went over to his friend and said, 'Hullo, Michael.' Michael looked up.=/", {
                    option: "Ask Michael what to do.",
                    linkPath: "heyMichaelJimAsk",
                    ifConditions: null,
                    notIfConditions: null
                }, {
                    option: "Ask Michael what he's doing.",
                    linkPath: "hiMichaelWhatAre",
                    ifConditions: null,
                    notIfConditions: null
                }, {
                    pageNum: 18
                }, {
                    pageLabel: "Join example"
                }]
            },
            heyMichaelJimAsk: {
                content: ["/='Hey Michael,' Jim asked. 'What should I do?'=/", {
                    divert: "michaelShruggedI"
                }]
            },
            michaelShruggedI: {
                content: ["/=Michael shrugged. 'I don't know, Jim. I think we just have to wait until this war is over, and then we can go back home.'=/", {
                    divert: "michaelAndJimWer"
                }]
            },
            hiMichaelWhatAre: {
                content: ["/='Hi, Michael. What are you doing?'=/", {
                    divert: "imJustHangingAro"
                }]
            },
            imJustHangingAro: {
                content: ["/='I'm just hanging around here until this war is over, and I can go back home.'=/", {
                    divert: "michaelAndJimWer"
                }]
            },
            michaelAndJimWer: {
                content: ["/='Michael and Jim were evacuees, which meant they'd been moved out to London to avoid the devastating bombing raids on the city.'=/", {
                    option: "Did you see what happened?",
                    linkPath: "tryRewindingBack",
                    ifConditions: null,
                    notIfConditions: null
                }]
            },
            tryRewindingBack: {
                content: ["Try rewinding back through the story and taking the other path. You should see that whatever you chose, the paths branched, and then joined back together.", {
                    divert: "letsSeeHowThatWa"
                }]
            },
            letsSeeHowThatWa: {
                content: ["Let's see how that was done.", {
                    divert: "firstWeNeedAPara"
                }, {
                    pageNum: -1
                }]
            },
            firstWeNeedAPara: {
                content: ["First, we need a paragraph with two options.", {
                    option: "Here's one - click this",
                    linkPath: "thisIsTheFirstPa",
                    ifConditions: null,
                    notIfConditions: null
                }, {
                    option: "Click this when you've come back",
                    linkPath: "thisIsTheSecondP",
                    ifConditions: null,
                    notIfConditions: null
                }, {
                    pageNum: 20
                }, {
                    pageLabel: "How to join"
                }]
            },
            thisIsTheFirstPa: {
                content: ["This is the first path the story might take. Now you've seen it, rewind back to the section above and choose the other option. ", {
                    divert: "ignoreTheRestOfT"
                }]
            },
            ignoreTheRestOfT: {
                content: ["Ignore the rest of this section, okay? Rewind now!", {
                    divert: "asIfByMagicThisS"
                }]
            },
            asIfByMagicThisS: {
                content: ["As if by magic, this text should appear..!", {
                    option: "That worked!",
                    linkPath: "excellentYouveJu",
                    ifConditions: null,
                    notIfConditions: null
                }, {
                    pageNum: -1
                }]
            },
            thisIsTheSecondP: {
                content: ["This is the second path for the story. Now we want to join it up with the first path.", {
                    divert: "letsBringTheTwoB"
                }]
            },
            letsBringTheTwoB: {
                content: ['First, click the tab below this section that reads "Join up to an existing paragraph". Then, look in the *-Contents-* for the paragraph you want.', {
                    divert: "nowDontClickTheS"
                }]
            },
            excellentYouveJu: {
                content: ["Excellent. You've just created your first branched story that rejoins.", {
                    divert: "inklewriterHasLo"
                }, {
                    pageNum: -1
                }]
            },
            thereYouAre: {
                content: ["There you are!", {
                    option: "Where's the story gone?",
                    linkPath: "youreNowReadingA",
                    ifConditions: null,
                    notIfConditions: null
                }, {
                    pageNum: 23
                }, {
                    pageLabel: "Jumping continued"
                }]
            },
            youreNowReadingA: {
                content: ["You're now reading a completely different branch of the story. So the old story has been put away, and a new story has been laid out automatically.", {
                    divert: "youCanUseTheJump"
                }]
            },
            youCanUseTheJump: {
                content: ["You can use the *-jump-* feature to flick rapidly between different story-paths. This can be really useful for editing all the different paths your story can take.", {
                    divert: "butRememberAllYo"
                }]
            },
            butRememberAllYo: {
                content: ["But remember, all your paths can be joined back together using the *-Join-* function. You can join any paragraph to any paragraph you like. (You can even make loops, if you want to!)", {
                    option: "Okay. What's next?",
                    linkPath: "theNextTutorialW",
                    ifConditions: null,
                    notIfConditions: null
                }]
            },
            theNextTutorialW: {
                content: ["The next tutorial, which is about organising long stories! Or you could start writing.", {
                    option: "Start writing",
                    linkPath: "toStartWritingJu",
                    ifConditions: null,
                    notIfConditions: null
                }, {
                    option: "Read about loose ends and sections",
                    linkPath: "thisTutorialIsAb",
                    ifConditions: null,
                    notIfConditions: null
                }, {
                    flagName: "Join and jumps completed!"
                }]
            },
            thisTutorialIsAb: {
                content: ["This tutorial is about *-sections-* and *-loose ends-*. It's pretty short!", {
                    divert: "whenWritingInter"
                }, {
                    pageNum: 24
                }, {
                    pageLabel: "Loose ends and sections"
                }]
            },
            whenWritingInter: {
                content: ["When writing interactive stories, it's easy to forget which parts you've written, and which you haven't. *-inklewriter-* tries to help by telling you in the *-Contents-* if you've left any loose ends.", {
                    option: "Sounds simple enough",
                    linkPath: "youShouldBeAbleT",
                    ifConditions: null,
                    notIfConditions: null
                }, {
                    option: "Ignore this for now..!",
                    linkPath: null,
                    ifConditions: null,
                    notIfConditions: null
                }]
            },
            youShouldBeAbleT: {
                content: ['You should be able to see that the section above has "1 loose end". You can even see the name of the option ("ignore this for now..!")', {
                    divert: "theseLooseEndsAr"
                }, {
                    pageNum: -1
                }]
            },
            theseLooseEndsAr: {
                content: ["These loose ends are actually links - if you hover the mouse over them and click, it'll take you to that option, so you can write it. Try it now, and when you're done, use the \"jump to\" system to find your way back here so you can continue.", {
                    divert: "soJumpBackHereOk"
                }]
            },
            soJumpBackHereOk: {
                content: ["So jump back here, okay?", {
                    option: "Okay. What's next?",
                    linkPath: "seeOnTheLeftOfTh",
                    ifConditions: null,
                    notIfConditions: null
                }]
            },
            toStartWritingJu: {
                content: ["To start writing, just click the *-new -*button in the header. And off you go!", {
                    divert: "ifYouWantToSeeMo"
                }, {
                    pageNum: 25
                }, {
                    pageLabel: "Start writing"
                }]
            },
            ifYouWantToSeeMo: {
                content: ["If you want to see more tutorials, just click the *-tutorial-* button at any time."]
            },
            nowItsTimeToTalk: {
                content: ["Now it's time to talk about the Widget menu. The widgets are those buttons on the bottom left of the screen. There's *-bold-* and /=italic=/, and they work the same way as a word-processor: just select some text, and click the button.", {
                    divert: "someWebbrowsersW"
                }, {
                    pageNum: 26
                }, {
                    pageLabel: "Widgets"
                }]
            },
            someWebbrowsersW: {
                content: ["You can also press Ctrl+B for bold and Ctrl+I for italics!", {
                    divert: "theNextWidgetIsA"
                }]
            },
            theNextWidgetIsA: {
                content: ['The next widget is a clever one. The symbol is "...". Try putting the cursor into this paragraph and then clicking the "..." widget. [...]', {
                    divert: "toSeeWhatThatsDo"
                }, {
                    pageNum: 27
                }, {
                    pageLabel: "The ... widget"
                }]
            },
            toSeeWhatThatsDo: {
                content: ['To see what that\'s done, you\'ll have to read the story. You can do that at any time by clicking the "read" button in the top bar. Try it now, and when you\'re done, click the "write" button again.', {
                    divert: "didYouSeeWhatThe"
                }]
            },
            didYouSeeWhatThe: {
                content: ['Did you see what the "..." widget did?', {
                    option: "Yes!",
                    linkPath: "goodWellDoneItCa",
                    ifConditions: null,
                    notIfConditions: null
                }, {
                    option: "No?",
                    linkPath: "takeAnotherLookT",
                    ifConditions: null,
                    notIfConditions: null
                }]
            },
            goodWellDoneItCa: {
                content: ['Good. Well done! It causes the paragraphs of text to "stick together". [...]', {
                    divert: "ThisMightNotSeem"
                }]
            },
            ThisMightNotSeem: {
                content: [" This might not seem very useful at first, but remember - if we're joining together different branches of a story, this widget lets us stick text together in a continuous way, so it's impossible to tell there was a join.", {
                    option: "So the join is invisible: crafty",
                    linkPath: "exactlyThatMeans",
                    ifConditions: null,
                    notIfConditions: null
                }, {
                    pageNum: -1
                }]
            },
            takeAnotherLookT: {
                content: ['Take another look. The "..." widget sticks the text of one paragraph together with the paragraph that comes next. [...]', {
                    divert: "ThisMightNotSeem"
                }]
            },
            exactlyThatMeans: {
                content: ['Exactly! That means your story will feel more "branchy" than it is. ', {
                    divert: "theresOneLastWid"
                }]
            },
            theresOneLastWid: {
                content: ["There's one last widget to mention.", {
                    option: "What does the + widget do?",
                    linkPath: "thatWidgetStarts",
                    ifConditions: null,
                    notIfConditions: null
                }, {
                    pageNum: -1
                }]
            },
            thatWidgetStarts: {
                content: ["That widget starts a new section wherever you're currently editing. It's there so you can organise your story the way you want to.", {
                    option: "Great. I'd better write a story.",
                    linkPath: "toStartWritingJu",
                    ifConditions: null,
                    notIfConditions: null
                }, {
                    option: "Show me the next tutorial.",
                    linkPath: "thisOnesAboutCha",
                    ifConditions: null,
                    notIfConditions: null
                }, {
                    flagName: "Widgets learned!"
                }, {
                    pageNum: 30
                }, {
                    pageLabel: "The + widget"
                }]
            },
            thisOnesAboutCha: {
                content: ["This one's about changing the story flow.", {
                    divert: "changingTheStory"
                }]
            },
            seeOnTheLeftOfTh: {
                content: ['See on the left of this paper where it says "About Sections"? Sections are a way of grouping paragraphs together. Sections are added automatically, but you can add your own by clicking the tab on the left when it appears.', {
                    divert: "ifInklewriterSta"
                }, {
                    pageNum: 31
                }, {
                    pageLabel: "About Sections"
                }]
            },
            ifInklewriterSta: {
                content: ["If *-inklewriter-* starts a new section somewhere you don't like, you can just delete it. (If you point your mouse cursor at a section, there's a little cross for doing that.)", {
                    divert: "youMightNoticeTh"
                }]
            },
            youMightNoticeTh: {
                content: ['You might notice that when new sections appear they have ugly names like "Section 1" or "Section 53". You can change these names: just select the text, and type what you want them to be called. Remember, these names won\'t be visible to your readers; they\'re just to help you keep your story organised.', {
                    divert: "youllSeeThatTheS"
                }]
            },
            youllSeeThatTheS: {
                content: ["You'll see that the *-Contents-* on the right of the screen updates.", {
                    option: "What else can I do with sections?",
                    linkPath: "youllProbablyNot",
                    ifConditions: null,
                    notIfConditions: null
                }]
            },
            youllProbablyNot: {
                content: ["You'll probably notice that the *-Contents-* shows the sections you're working on but tidies other ones away. If you click the little grey triangle next to the name of a section, it'll show or hide those paragraphs.", {
                    divert: "alsoWhenAKnotIsH"
                }]
            },
            alsoWhenAKnotIsH: {
                content: ["Also, when a section is hidden away, there's an arrow symbol. If you click that, you'll jump to the start of that section.", {
                    divert: "youCouldUseThatN"
                }]
            },
            youCouldUseThatN: {
                content: ['You could use that now to jump back to the "Choose a Tutorial" section, to read the next section, if you wanted to.', {
                    option: "Or I could just start writing",
                    linkPath: "toStartWritingJu",
                    ifConditions: null,
                    notIfConditions: null
                }, {
                    flagName: "Sections and loose ends done!"
                }]
            },
            inklewriterHasLo: {
                content: ['*-inklewriter-* has lots of other features to help you write your stories. But the most powerful is the "jump to" feature. We\'ll try that now.', {
                    divert: "itsReallySimpleA"
                }, {
                    pageNum: 33
                }, {
                    pageLabel: "Jumping"
                }]
            },
            itsReallySimpleA: {
                content: ["It's really simple: all it means is, if you click on any paragraph in the *-Contents-*, the editor will take you there! ", {
                    divert: "toTryItOutLetsOp"
                }]
            },
            toTryItOutLetsOp: {
                content: ['To try it out, display the *-Contents-* using the option in the menu bar. Now open the "Jumping continued" section, by clicking on the black triangle beside the name. It\'s just below the highlighted paragraph. Finally, select the paragraph called "There you are!"']
            }
        },
        initial: "welcomeToInklewr",
        editorData: {
            playPoint: "welcomeToInklewr",
            libraryVisible: !1,
            authorName: "inkle"
        }
    }
}
  , Splash = function() {
    var e = $(window)
      , t = null
      , n = null
      , r = null
      , i = !1
      , s = function(e) {
        return i ? (e.preventDefault(),
        !1) : (e.which !== 13 && e.which === 27,
        !0)
    }
      , o = function() {
        t = $("<div class='eventAbsorber'></div>"),
        $("body").append(t),
        n = $("\
          <div class='splash'>\n\
            <div id='bg'></div>\n\
            <div id='content'>\n\
              <div id='header'>\n\
                <p id='welcome-message'>" + tr("Welcome to") + "</p>\n\
                <img draggable=false id='splash-logo' src='/img/splash-logo-free.png'></img>\n\
              </div>\n\
              <div id='menu'>\n\
                <p style='padding-top: 10px; color: red; font-weight: bold;'>" + tr("Inklewriter is free software thanks to Inklestudio!")  + "</p>\n\
                <ul>\n\
                  <li>\n\
                  <div class='button' id='tutorial'>" + tr("get started") + "</div>\n\
                  </li>\n\
                  <li>\n\
                  <div class='button' id='new'>" + tr("new account") + "</div>\n\
                  </li>\n\
                  <li>\n\
                  <div class='button' id='sign-in'>" + tr("sign in") + "</div>\n\
                  </li>\n\
                </ul>\n\
                <img draggable=false id='splash-splats' src='/img/splash-splats.png'></img>\n\
              </div>\n\
            </div>\n\
          </div>"),
        $("body").append(n),
        n.focus(),
        jqContent = n.find("#content"),
        n.find("#new").click(function() {
            u(),
            EditorMenu.createNew()
        }),
        n.find("#sign-in").click(function() {
            u(),
            EditorAccount.signIn()
        }),
        n.find(".button#tutorial").click(function() {
            u(),
            EditorMenu.loadTutorial()
        }),
        a()
    }
      , u = function() {
        i || (t.remove(),
        n.css("pointer-events", "none").animate({
            opacity: 0
        }, {
            complete: function() {
                $(this).remove()
            }
        }),
        i = !0)
    }
      , a = function() {
        n.css({
            left: .5 * e.width() - .5 * n.width(),
            top: .5 * e.height() - .5 * n.height()
        })
    };
    return o(),
    r = {
        close: u
    },
    r
};
window.rangy = function() {
    function e(e, t) {
        var n = typeof e[t];
        return n == "function" || n == "object" && !!e[t] || n == "unknown"
    }
    function t(e, t) {
        return typeof e[t] == "object" && !!e[t]
    }
    function n(e, t) {
        return typeof e[t] != "undefined"
    }
    function r(e) {
        return function(t, n) {
            for (var r = n.length; r--; )
                if (!e(t, n[r]))
                    return !1;
            return !0
        }
    }
    function i(e) {
        return e && h(e, c) && d(e, l)
    }
    function s(e) {
        window.alert("Rangy not supported in your browser. Reason: " + e),
        v.initialized = !0,
        v.supported = !1
    }
    function o() {
        if (!v.initialized) {
            var n, r = !1, o = !1;
            e(document, "createRange") && (n = document.createRange(),
            h(n, f) && d(n, a) && (r = !0),
            n.detach()),
            (n = t(document, "body") ? document.body : document.getElementsByTagName("body")[0]) && e(n, "createTextRange") && (n = n.createTextRange(),
            i(n) && (o = !0)),
            !r && !o && s("Neither Range nor TextRange are implemented"),
            v.initialized = !0,
            v.features = {
                implementsDomRange: r,
                implementsTextRange: o
            },
            r = g.concat(m),
            o = 0;
            for (n = r.length; o < n; ++o)
                try {
                    r[o](v)
                } catch (u) {
                    t(window, "console") && e(window.console, "log") && window.console.log("Init listener threw an exception. Continuing.", u)
                }
        }
    }
    function u(e) {
        this.name = e,
        this.supported = this.initialized = !1
    }
    var a = ["startContainer", "startOffset", "endContainer", "endOffset", "collapsed", "commonAncestorContainer", "START_TO_START", "START_TO_END", "END_TO_START", "END_TO_END"]
      , f = ["setStart", "setStartBefore", "setStartAfter", "setEnd", "setEndBefore", "setEndAfter", "collapse", "selectNode", "selectNodeContents", "compareBoundaryPoints", "deleteContents", "extractContents", "cloneContents", "insertNode", "surroundContents", "cloneRange", "toString", "detach"]
      , l = ["boundingHeight", "boundingLeft", "boundingTop", "boundingWidth", "htmlText", "text"]
      , c = ["collapse", "compareEndPoints", "duplicate", "getBookmark", "moveToBookmark", "moveToElementText", "parentElement", "pasteHTML", "select", "setEndPoint", "getBoundingClientRect"]
      , h = r(e)
      , p = r(t)
      , d = r(n)
      , v = {
        version: "1.2.2",
        initialized: !1,
        supported: !0,
        util: {
            isHostMethod: e,
            isHostObject: t,
            isHostProperty: n,
            areHostMethods: h,
            areHostObjects: p,
            areHostProperties: d,
            isTextRange: i
        },
        features: {},
        modules: {},
        config: {
            alertOnWarn: !1,
            preferTextRange: !1
        }
    };
    v.fail = s,
    v.warn = function(e) {
        e = "Rangy warning: " + e,
        v.config.alertOnWarn ? window.alert(e) : typeof window.console != "undefined" && typeof window.console.log != "undefined" && window.console.log(e)
    }
    ,
    {}.hasOwnProperty ? v.util.extend = function(e, t) {
        for (var n in t)
            t.hasOwnProperty(n) && (e[n] = t[n])
    }
    : s("hasOwnProperty not supported");
    var m = []
      , g = [];
    v.init = o,
    v.addInitListener = function(e) {
        v.initialized ? e(v) : m.push(e)
    }
    ;
    var y = [];
    v.addCreateMissingNativeApiListener = function(e) {
        y.push(e)
    }
    ,
    v.createMissingNativeApi = function(e) {
        e = e || window,
        o();
        for (var t = 0, n = y.length; t < n; ++t)
            y[t](e)
    }
    ,
    u.prototype.fail = function(e) {
        throw this.initialized = !0,
        this.supported = !1,
        Error("Module '" + this.name + "' failed to load: " + e)
    }
    ,
    u.prototype.warn = function(e) {
        v.warn("Module " + this.name + ": " + e)
    }
    ,
    u.prototype.createError = function(e) {
        return Error("Error in Rangy " + this.name + " module: " + e)
    }
    ,
    v.createModule = function(e, t) {
        var n = new u(e);
        v.modules[e] = n,
        g.push(function(e) {
            t(e, n),
            n.initialized = !0,
            n.supported = !0
        })
    }
    ,
    v.requireModules = function(e) {
        for (var t = 0, n = e.length, r, i; t < n; ++t) {
            i = e[t],
            r = v.modules[i];
            if (!r || !(r instanceof u))
                throw Error("Module '" + i + "' not found");
            if (!r.supported)
                throw Error("Module '" + i + "' not supported")
        }
    }
    ;
    var b = !1;
    p = function() {
        b || (b = !0,
        v.initialized || o())
    }
    ;
    if (typeof window == "undefined")
        s("No window found");
    else {
        if (typeof document != "undefined")
            return e(document, "addEventListener") && document.addEventListener("DOMContentLoaded", p, !1),
            e(window, "addEventListener") ? window.addEventListener("load", p, !1) : e(window, "attachEvent") ? window.attachEvent("onload", p) : s("Window does not have required addEventListener or attachEvent method"),
            v;
        s("No document found")
    }
}(),
rangy.createModule("DomUtil", function(e, t) {
    function n(e) {
        for (var t = 0; e = e.previousSibling; )
            t++;
        return t
    }
    function r(e, t) {
        var n = [], r;
        for (r = e; r; r = r.parentNode)
            n.push(r);
        for (r = t; r; r = r.parentNode)
            if (d(n, r))
                return r;
        return null
    }
    function i(e, t, n) {
        for (n = n ? e : e.parentNode; n; ) {
            e = n.parentNode;
            if (e === t)
                return n;
            n = e
        }
        return null
    }
    function s(e) {
        return e = e.nodeType,
        e == 3 || e == 4 || e == 8
    }
    function o(e, t) {
        var n = t.nextSibling
          , r = t.parentNode;
        return n ? r.insertBefore(e, n) : r.appendChild(e),
        e
    }
    function u(e) {
        if (e.nodeType == 9)
            return e;
        if (typeof e.ownerDocument != "undefined")
            return e.ownerDocument;
        if (typeof e.document != "undefined")
            return e.document;
        if (e.parentNode)
            return u(e.parentNode);
        throw Error("getDocument: no document found for node")
    }
    function a(e) {
        return e ? s(e) ? '"' + e.data + '"' : e.nodeType == 1 ? "<" + e.nodeName + (e.id ? ' id="' + e.id + '"' : "") + ">[" + e.childNodes.length + "]" : e.nodeName : "[No node]"
    }
    function f(e) {
        this._next = this.root = e
    }
    function l(e, t) {
        this.node = e,
        this.offset = t
    }
    function c(e) {
        this.code = this[e],
        this.codeName = e,
        this.message = "DOMException: " + this.codeName
    }
    var h = e.util;
    h.areHostMethods(document, ["createDocumentFragment", "createElement", "createTextNode"]) || t.fail("document missing a Node creation method"),
    h.isHostMethod(document, "getElementsByTagName") || t.fail("document missing getElementsByTagName method");
    var p = document.createElement("div");
    h.areHostMethods(p, ["insertBefore", "appendChild", "cloneNode"]) || t.fail("Incomplete Element implementation"),
    h.isHostProperty(p, "innerHTML") || t.fail("Element is missing innerHTML property"),
    p = document.createTextNode("test"),
    h.areHostMethods(p, ["splitText", "deleteData", "insertData", "appendData", "cloneNode"]) || t.fail("Incomplete Text Node implementation");
    var d = function(e, t) {
        for (var n = e.length; n--; )
            if (e[n] === t)
                return !0;
        return !1
    };
    f.prototype = {
        _current: null,
        hasNext: function() {
            return !!this._next
        },
        next: function() {
            var e = this._current = this._next, t;
            if (this._current)
                if (t = e.firstChild)
                    this._next = t;
                else {
                    for (t = null; e !== this.root && !(t = e.nextSibling); )
                        e = e.parentNode;
                    this._next = t
                }
            return this._current
        },
        detach: function() {
            this._current = this._next = this.root = null
        }
    },
    l.prototype = {
        equals: function(e) {
            return this.node === e.node & this.offset == e.offset
        },
        inspect: function() {
            return "[DomPosition(" + a(this.node) + ":" + this.offset + ")]"
        }
    },
    c.prototype = {
        INDEX_SIZE_ERR: 1,
        HIERARCHY_REQUEST_ERR: 3,
        WRONG_DOCUMENT_ERR: 4,
        NO_MODIFICATION_ALLOWED_ERR: 7,
        NOT_FOUND_ERR: 8,
        NOT_SUPPORTED_ERR: 9,
        INVALID_STATE_ERR: 11
    },
    c.prototype.toString = function() {
        return this.message
    }
    ,
    e.dom = {
        arrayContains: d,
        isHtmlNamespace: function(e) {
            var t;
            return typeof e.namespaceURI == "undefined" || (t = e.namespaceURI) === null || t == "http://www.w3.org/1999/xhtml"
        },
        parentElement: function(e) {
            return e = e.parentNode,
            e.nodeType == 1 ? e : null
        },
        getNodeIndex: n,
        getNodeLength: function(e) {
            var t;
            return s(e) ? e.length : (t = e.childNodes) ? t.length : 0
        },
        getCommonAncestor: r,
        isAncestorOf: function(e, t, n) {
            for (t = n ? t : t.parentNode; t; ) {
                if (t === e)
                    return !0;
                t = t.parentNode
            }
            return !1
        },
        getClosestAncestorIn: i,
        isCharacterDataNode: s,
        insertAfter: o,
        splitDataNode: function(e, t) {
            var n = e.cloneNode(!1);
            return n.deleteData(0, t),
            e.deleteData(t, e.length - t),
            o(n, e),
            n
        },
        getDocument: u,
        getWindow: function(e) {
            e = u(e);
            if (typeof e.defaultView != "undefined")
                return e.defaultView;
            if (typeof e.parentWindow != "undefined")
                return e.parentWindow;
            throw Error("Cannot get a window object for node")
        },
        getIframeWindow: function(e) {
            if (typeof e.contentWindow != "undefined")
                return e.contentWindow;
            if (typeof e.contentDocument != "undefined")
                return e.contentDocument.defaultView;
            throw Error("getIframeWindow: No Window object found for iframe element")
        },
        getIframeDocument: function(e) {
            if (typeof e.contentDocument != "undefined")
                return e.contentDocument;
            if (typeof e.contentWindow != "undefined")
                return e.contentWindow.document;
            throw Error("getIframeWindow: No Document object found for iframe element")
        },
        getBody: function(e) {
            return h.isHostObject(e, "body") ? e.body : e.getElementsByTagName("body")[0]
        },
        getRootContainer: function(e) {
            for (var t; t = e.parentNode; )
                e = t;
            return e
        },
        comparePoints: function(e, t, s, o) {
            var u;
            if (e == s)
                return t === o ? 0 : t < o ? -1 : 1;
            if (u = i(s, e, !0))
                return t <= n(u) ? -1 : 1;
            if (u = i(e, s, !0))
                return n(u) < o ? -1 : 1;
            t = r(e, s),
            e = e === t ? t : i(e, t, !0),
            s = s === t ? t : i(s, t, !0);
            if (e === s)
                throw Error("comparePoints got to case 4 and childA and childB are the same!");
            if (!t)
                return -1;
            for (t = t.firstChild; t; ) {
                if (t === e)
                    return -1;
                if (t === s)
                    return 1;
                t = t.nextSibling
            }
            throw Error("Should not be here!")
        },
        inspectNode: a,
        fragmentFromNodeChildren: function(e) {
            for (var t = u(e).createDocumentFragment(), n; n = e.firstChild; )
                t.appendChild(n);
            return t
        },
        createIterator: function(e) {
            return new f(e)
        },
        DomPosition: l
    },
    e.DOMException = c
}),
rangy.createModule("DomRange", function(e) {
    function t(e, t) {
        return e.nodeType != 3 && (D.isAncestorOf(e, t.startContainer, !0) || D.isAncestorOf(e, t.endContainer, !0))
    }
    function n(e) {
        return D.getDocument(e.startContainer)
    }
    function r(e, t, n) {
        if (t = e._listeners[t])
            for (var r = 0, i = t.length; r < i; ++r)
                t[r].call(e, {
                    target: e,
                    args: n
                })
    }
    function i(e) {
        return new P(e.parentNode,D.getNodeIndex(e))
    }
    function s(e) {
        return new P(e.parentNode,D.getNodeIndex(e) + 1)
    }
    function o(e, t, n) {
        var r = e.nodeType == 11 ? e.firstChild : e;
        return D.isCharacterDataNode(t) ? n == t.length ? D.insertAfter(e, t) : t.parentNode.insertBefore(e, n == 0 ? t : D.splitDataNode(t, n)) : n >= t.childNodes.length ? t.appendChild(e) : t.insertBefore(e, t.childNodes[n]),
        r
    }
    function u(e) {
        for (var t, r, i = n(e.range).createDocumentFragment(); r = e.next(); ) {
            t = e.isPartiallySelectedSubtree(),
            r = r.cloneNode(!t),
            t && (t = e.getSubtreeIterator(),
            r.appendChild(u(t)),
            t.detach(!0));
            if (r.nodeType == 10)
                throw new H("HIERARCHY_REQUEST_ERR");
            i.appendChild(r)
        }
        return i
    }
    function a(e, t, n) {
        var r, i;
        for (n = n || {
            stop: !1
        }; r = e.next(); )
            if (e.isPartiallySelectedSubtree()) {
                if (t(r) === !1) {
                    n.stop = !0;
                    return
                }
                r = e.getSubtreeIterator(),
                a(r, t, n),
                r.detach(!0);
                if (n.stop)
                    return
            } else
                for (r = D.createIterator(r); i = r.next(); )
                    if (t(i) === !1) {
                        n.stop = !0;
                        return
                    }
    }
    function f(e) {
        for (var t; e.next(); )
            e.isPartiallySelectedSubtree() ? (t = e.getSubtreeIterator(),
            f(t),
            t.detach(!0)) : e.remove()
    }
    function l(e) {
        for (var t, r = n(e.range).createDocumentFragment(), i; t = e.next(); ) {
            e.isPartiallySelectedSubtree() ? (t = t.cloneNode(!1),
            i = e.getSubtreeIterator(),
            t.appendChild(l(i)),
            i.detach(!0)) : e.remove();
            if (t.nodeType == 10)
                throw new H("HIERARCHY_REQUEST_ERR");
            r.appendChild(t)
        }
        return r
    }
    function c(e, t, n) {
        var r = !!t && !!t.length, i, s = !!n;
        r && (i = RegExp("^(" + t.join("|") + ")$"));
        var o = [];
        return a(new p(e,!1), function(e) {
            (!r || i.test(e.nodeType)) && (!s || n(e)) && o.push(e)
        }),
        o
    }
    function h(e) {
        return "[" + (typeof e.getName == "undefined" ? "Range" : e.getName()) + "(" + D.inspectNode(e.startContainer) + ":" + e.startOffset + ", " + D.inspectNode(e.endContainer) + ":" + e.endOffset + ")]"
    }
    function p(e, t) {
        this.range = e,
        this.clonePartiallySelectedTextNodes = t;
        if (!e.collapsed) {
            this.sc = e.startContainer,
            this.so = e.startOffset,
            this.ec = e.endContainer,
            this.eo = e.endOffset;
            var n = e.commonAncestorContainer;
            this.sc === this.ec && D.isCharacterDataNode(this.sc) ? (this.isSingleCharacterDataNode = !0,
            this._first = this._last = this._next = this.sc) : (this._first = this._next = this.sc === n && !D.isCharacterDataNode(this.sc) ? this.sc.childNodes[this.so] : D.getClosestAncestorIn(this.sc, n, !0),
            this._last = this.ec === n && !D.isCharacterDataNode(this.ec) ? this.ec.childNodes[this.eo - 1] : D.getClosestAncestorIn(this.ec, n, !0))
        }
    }
    function d(e) {
        this.code = this[e],
        this.codeName = e,
        this.message = "RangeException: " + this.codeName
    }
    function v(e, t, n) {
        this.nodes = c(e, t, n),
        this._next = this.nodes[0],
        this._position = 0
    }
    function m(e) {
        return function(t, n) {
            for (var r, i = n ? t : t.parentNode; i; ) {
                r = i.nodeType;
                if (D.arrayContains(e, r))
                    return i;
                i = i.parentNode
            }
            return null
        }
    }
    function g(e, t) {
        if (z(e, t))
            throw new d("INVALID_NODE_TYPE_ERR")
    }
    function y(e) {
        if (!e.startContainer)
            throw new H("INVALID_STATE_ERR")
    }
    function b(e, t) {
        if (!D.arrayContains(t, e.nodeType))
            throw new d("INVALID_NODE_TYPE_ERR")
    }
    function w(e, t) {
        if (t < 0 || t > (D.isCharacterDataNode(e) ? e.length : e.childNodes.length))
            throw new H("INDEX_SIZE_ERR")
    }
    function E(e, t) {
        if (R(e, !0) !== R(t, !0))
            throw new H("WRONG_DOCUMENT_ERR")
    }
    function S(e) {
        if (U(e, !0))
            throw new H("NO_MODIFICATION_ALLOWED_ERR")
    }
    function x(e, t) {
        if (!e)
            throw new H(t)
    }
    function T(e) {
        y(e);
        if (!D.arrayContains(j, e.startContainer.nodeType) && !R(e.startContainer, !0) || !D.arrayContains(j, e.endContainer.nodeType) && !R(e.endContainer, !0) || !(e.startOffset <= (D.isCharacterDataNode(e.startContainer) ? e.startContainer.length : e.startContainer.childNodes.length)) || !(e.endOffset <= (D.isCharacterDataNode(e.endContainer) ? e.endContainer.length : e.endContainer.childNodes.length)))
            throw Error("Range error: Range is no longer valid after DOM mutation (" + e.inspect() + ")")
    }
    function N() {}
    function C(e) {
        e.START_TO_START = J,
        e.START_TO_END = K,
        e.END_TO_END = Q,
        e.END_TO_START = G,
        e.NODE_BEFORE = Y,
        e.NODE_AFTER = Z,
        e.NODE_BEFORE_AND_AFTER = et,
        e.NODE_INSIDE = tt
    }
    function k(e) {
        C(e),
        C(e.prototype)
    }
    function L(e, t) {
        return function() {
            T(this);
            var n = this.startContainer
              , r = this.startOffset
              , i = this.commonAncestorContainer
              , o = new p(this,!0);
            return n !== i && (n = D.getClosestAncestorIn(n, i, !0),
            r = s(n),
            n = r.node,
            r = r.offset),
            a(o, S),
            o.reset(),
            i = e(o),
            o.detach(),
            t(this, n, r, n, r),
            i
        }
    }
    function A(n, r, o) {
        function u(e, t) {
            return function(n) {
                y(this),
                b(n, B),
                b(q(n), j),
                n = (e ? i : s)(n),
                (t ? a : c)(this, n.node, n.offset)
            }
        }
        function a(e, t, n) {
            var i = e.endContainer
              , s = e.endOffset;
            if (t !== e.startContainer || n !== e.startOffset) {
                if (q(t) != q(i) || D.comparePoints(t, n, i, s) == 1)
                    i = t,
                    s = n;
                r(e, t, n, i, s)
            }
        }
        function c(e, t, n) {
            var i = e.startContainer
              , s = e.startOffset;
            if (t !== e.endContainer || n !== e.endOffset) {
                if (q(t) != q(i) || D.comparePoints(t, n, i, s) == -1)
                    i = t,
                    s = n;
                r(e, i, s, t, n)
            }
        }
        n.prototype = new N,
        e.util.extend(n.prototype, {
            setStart: function(e, t) {
                y(this),
                g(e, !0),
                w(e, t),
                a(this, e, t)
            },
            setEnd: function(e, t) {
                y(this),
                g(e, !0),
                w(e, t),
                c(this, e, t)
            },
            setStartBefore: u(!0, !0),
            setStartAfter: u(!1, !0),
            setEndBefore: u(!0, !1),
            setEndAfter: u(!1, !1),
            collapse: function(e) {
                T(this),
                e ? r(this, this.startContainer, this.startOffset, this.startContainer, this.startOffset) : r(this, this.endContainer, this.endOffset, this.endContainer, this.endOffset)
            },
            selectNodeContents: function(e) {
                y(this),
                g(e, !0),
                r(this, e, 0, e, D.getNodeLength(e))
            },
            selectNode: function(e) {
                y(this),
                g(e, !1),
                b(e, B);
                var t = i(e);
                e = s(e),
                r(this, t.node, t.offset, e.node, e.offset)
            },
            extractContents: L(l, r),
            deleteContents: L(f, r),
            canSurroundContents: function() {
                T(this),
                S(this.startContainer),
                S(this.endContainer);
                var e = new p(this,!0)
                  , n = e._first && t(e._first, this) || e._last && t(e._last, this);
                return e.detach(),
                !n
            },
            detach: function() {
                o(this)
            },
            splitBoundaries: function() {
                T(this);
                var e = this.startContainer
                  , t = this.startOffset
                  , n = this.endContainer
                  , i = this.endOffset
                  , s = e === n;
                D.isCharacterDataNode(n) && i > 0 && i < n.length && D.splitDataNode(n, i),
                D.isCharacterDataNode(e) && t > 0 && t < e.length && (e = D.splitDataNode(e, t),
                s ? (i -= t,
                n = e) : n == e.parentNode && i >= D.getNodeIndex(e) && i++,
                t = 0),
                r(this, e, t, n, i)
            },
            normalizeBoundaries: function() {
                T(this);
                var e = this.startContainer
                  , t = this.startOffset
                  , n = this.endContainer
                  , i = this.endOffset
                  , s = function(e) {
                    var t = e.nextSibling;
                    t && t.nodeType == e.nodeType && (n = e,
                    i = e.length,
                    e.appendData(t.data),
                    t.parentNode.removeChild(t))
                }
                  , o = function(r) {
                    var s = r.previousSibling;
                    if (s && s.nodeType == r.nodeType) {
                        e = r;
                        var o = r.length;
                        t = s.length,
                        r.insertData(0, s.data),
                        s.parentNode.removeChild(s),
                        e == n ? (i += t,
                        n = e) : n == r.parentNode && (s = D.getNodeIndex(r),
                        i == s ? (n = r,
                        i = o) : i > s && i--)
                    }
                }
                  , u = !0;
                D.isCharacterDataNode(n) ? n.length == i && s(n) : (i > 0 && (u = n.childNodes[i - 1]) && D.isCharacterDataNode(u) && s(u),
                u = !this.collapsed),
                u ? D.isCharacterDataNode(e) ? t == 0 && o(e) : t < e.childNodes.length && (s = e.childNodes[t]) && D.isCharacterDataNode(s) && o(s) : (e = n,
                t = i),
                r(this, e, t, n, i)
            },
            collapseToPoint: function(e, t) {
                y(this),
                g(e, !0),
                w(e, t),
                (e !== this.startContainer || t !== this.startOffset || e !== this.endContainer || t !== this.endOffset) && r(this, e, t, e, t)
            }
        }),
        k(n)
    }
    function O(e) {
        e.collapsed = e.startContainer === e.endContainer && e.startOffset === e.endOffset,
        e.commonAncestorContainer = e.collapsed ? e.startContainer : D.getCommonAncestor(e.startContainer, e.endContainer)
    }
    function M(e, t, n, i, s) {
        var o = e.startContainer !== t || e.startOffset !== n
          , u = e.endContainer !== i || e.endOffset !== s;
        e.startContainer = t,
        e.startOffset = n,
        e.endContainer = i,
        e.endOffset = s,
        O(e),
        r(e, "boundarychange", {
            startMoved: o,
            endMoved: u
        })
    }
    function _(e) {
        this.startContainer = e,
        this.startOffset = 0,
        this.endContainer = e,
        this.endOffset = 0,
        this._listeners = {
            boundarychange: [],
            detach: []
        },
        O(this)
    }
    e.requireModules(["DomUtil"]);
    var D = e.dom
      , P = D.DomPosition
      , H = e.DOMException;
    p.prototype = {
        _current: null,
        _next: null,
        _first: null,
        _last: null,
        isSingleCharacterDataNode: !1,
        reset: function() {
            this._current = null,
            this._next = this._first
        },
        hasNext: function() {
            return !!this._next
        },
        next: function() {
            var e = this._current = this._next;
            return e && (this._next = e !== this._last ? e.nextSibling : null,
            D.isCharacterDataNode(e) && this.clonePartiallySelectedTextNodes && (e === this.ec && (e = e.cloneNode(!0)).deleteData(this.eo, e.length - this.eo),
            this._current === this.sc && (e = e.cloneNode(!0)).deleteData(0, this.so))),
            e
        },
        remove: function() {
            var e = this._current, t, n;
            !D.isCharacterDataNode(e) || e !== this.sc && e !== this.ec ? e.parentNode && e.parentNode.removeChild(e) : (t = e === this.sc ? this.so : 0,
            n = e === this.ec ? this.eo : e.length,
            t != n && e.deleteData(t, n - t))
        },
        isPartiallySelectedSubtree: function() {
            return t(this._current, this.range)
        },
        getSubtreeIterator: function() {
            var e;
            if (this.isSingleCharacterDataNode)
                e = this.range.cloneRange(),
                e.collapse();
            else {
                e = new _(n(this.range));
                var t = this._current
                  , r = t
                  , i = 0
                  , s = t
                  , o = D.getNodeLength(t);
                D.isAncestorOf(t, this.sc, !0) && (r = this.sc,
                i = this.so),
                D.isAncestorOf(t, this.ec, !0) && (s = this.ec,
                o = this.eo),
                M(e, r, i, s, o)
            }
            return new p(e,this.clonePartiallySelectedTextNodes)
        },
        detach: function(e) {
            e && this.range.detach(),
            this.range = this._current = this._next = this._first = this._last = this.sc = this.so = this.ec = this.eo = null
        }
    },
    d.prototype = {
        BAD_BOUNDARYPOINTS_ERR: 1,
        INVALID_NODE_TYPE_ERR: 2
    },
    d.prototype.toString = function() {
        return this.message
    }
    ,
    v.prototype = {
        _current: null,
        hasNext: function() {
            return !!this._next
        },
        next: function() {
            return this._current = this._next,
            this._next = this.nodes[++this._position],
            this._current
        },
        detach: function() {
            this._current = this._next = this.nodes = null
        }
    };
    var B = [1, 3, 4, 5, 7, 8, 10]
      , j = [2, 9, 11]
      , F = [1, 3, 4, 5, 7, 8, 10, 11]
      , I = [1, 3, 4, 5, 7, 8]
      , q = D.getRootContainer
      , R = m([9, 11])
      , U = m([5, 6, 10, 12])
      , z = m([6, 10, 12])
      , W = document.createElement("style")
      , X = !1;
    try {
        W.innerHTML = "<b>x</b>",
        X = W.firstChild.nodeType == 3
    } catch (V) {}
    e.features.htmlParsingConforms = X;
    var $ = ["startContainer", "startOffset", "endContainer", "endOffset", "collapsed", "commonAncestorContainer"]
      , J = 0
      , K = 1
      , Q = 2
      , G = 3
      , Y = 0
      , Z = 1
      , et = 2
      , tt = 3;
    N.prototype = {
        attachListener: function(e, t) {
            this._listeners[e].push(t)
        },
        compareBoundaryPoints: function(e, t) {
            T(this),
            E(this.startContainer, t.startContainer);
            var n = e == G || e == J ? "start" : "end"
              , r = e == K || e == J ? "start" : "end";
            return D.comparePoints(this[n + "Container"], this[n + "Offset"], t[r + "Container"], t[r + "Offset"])
        },
        insertNode: function(e) {
            T(this),
            b(e, F),
            S(this.startContainer);
            if (D.isAncestorOf(e, this.startContainer, !0))
                throw new H("HIERARCHY_REQUEST_ERR");
            this.setStartBefore(o(e, this.startContainer, this.startOffset))
        },
        cloneContents: function() {
            T(this);
            var e, t;
            return this.collapsed ? n(this).createDocumentFragment() : this.startContainer === this.endContainer && D.isCharacterDataNode(this.startContainer) ? (e = this.startContainer.cloneNode(!0),
            e.data = e.data.slice(this.startOffset, this.endOffset),
            t = n(this).createDocumentFragment(),
            t.appendChild(e),
            t) : (t = new p(this,!0),
            e = u(t),
            t.detach(),
            e)
        },
        canSurroundContents: function() {
            T(this),
            S(this.startContainer),
            S(this.endContainer);
            var e = new p(this,!0)
              , n = e._first && t(e._first, this) || e._last && t(e._last, this);
            return e.detach(),
            !n
        },
        surroundContents: function(e) {
            b(e, I);
            if (!this.canSurroundContents())
                throw new d("BAD_BOUNDARYPOINTS_ERR");
            var t = this.extractContents();
            if (e.hasChildNodes())
                for (; e.lastChild; )
                    e.removeChild(e.lastChild);
            o(e, this.startContainer, this.startOffset),
            e.appendChild(t),
            this.selectNode(e)
        },
        cloneRange: function() {
            T(this);
            for (var e = new _(n(this)), t = $.length, r; t--; )
                r = $[t],
                e[r] = this[r];
            return e
        },
        toString: function() {
            T(this);
            var e = this.startContainer;
            if (e === this.endContainer && D.isCharacterDataNode(e))
                return e.nodeType == 3 || e.nodeType == 4 ? e.data.slice(this.startOffset, this.endOffset) : "";
            var t = [];
            return e = new p(this,!0),
            a(e, function(e) {
                (e.nodeType == 3 || e.nodeType == 4) && t.push(e.data)
            }),
            e.detach(),
            t.join("")
        },
        compareNode: function(e) {
            T(this);
            var t = e.parentNode
              , n = D.getNodeIndex(e);
            if (!t)
                throw new H("NOT_FOUND_ERR");
            return e = this.comparePoint(t, n),
            t = this.comparePoint(t, n + 1),
            e < 0 ? t > 0 ? et : Y : t > 0 ? Z : tt
        },
        comparePoint: function(e, t) {
            return T(this),
            x(e, "HIERARCHY_REQUEST_ERR"),
            E(e, this.startContainer),
            D.comparePoints(e, t, this.startContainer, this.startOffset) < 0 ? -1 : D.comparePoints(e, t, this.endContainer, this.endOffset) > 0 ? 1 : 0
        },
        createContextualFragment: X ? function(e) {
            var t = this.startContainer
              , n = D.getDocument(t);
            if (!t)
                throw new H("INVALID_STATE_ERR");
            var r = null;
            return t.nodeType == 1 ? r = t : D.isCharacterDataNode(t) && (r = D.parentElement(t)),
            r = r === null || r.nodeName == "HTML" && D.isHtmlNamespace(D.getDocument(r).documentElement) && D.isHtmlNamespace(r) ? n.createElement("body") : r.cloneNode(!1),
            r.innerHTML = e,
            D.fragmentFromNodeChildren(r)
        }
        : function(e) {
            y(this);
            var t = n(this).createElement("body");
            return t.innerHTML = e,
            D.fragmentFromNodeChildren(t)
        }
        ,
        toHtml: function() {
            T(this);
            var e = n(this).createElement("div");
            return e.appendChild(this.cloneContents()),
            e.innerHTML
        },
        intersectsNode: function(e, t) {
            T(this),
            x(e, "NOT_FOUND_ERR");
            if (D.getDocument(e) !== n(this))
                return !1;
            var r = e.parentNode
              , i = D.getNodeIndex(e);
            x(r, "NOT_FOUND_ERR");
            var s = D.comparePoints(r, i, this.endContainer, this.endOffset);
            return r = D.comparePoints(r, i + 1, this.startContainer, this.startOffset),
            t ? s <= 0 && r >= 0 : s < 0 && r > 0
        },
        isPointInRange: function(e, t) {
            return T(this),
            x(e, "HIERARCHY_REQUEST_ERR"),
            E(e, this.startContainer),
            D.comparePoints(e, t, this.startContainer, this.startOffset) >= 0 && D.comparePoints(e, t, this.endContainer, this.endOffset) <= 0
        },
        intersectsRange: function(e, t) {
            T(this);
            if (n(e) != n(this))
                throw new H("WRONG_DOCUMENT_ERR");
            var r = D.comparePoints(this.startContainer, this.startOffset, e.endContainer, e.endOffset)
              , i = D.comparePoints(this.endContainer, this.endOffset, e.startContainer, e.startOffset);
            return t ? r <= 0 && i >= 0 : r < 0 && i > 0
        },
        intersection: function(e) {
            if (this.intersectsRange(e)) {
                var t = D.comparePoints(this.startContainer, this.startOffset, e.startContainer, e.startOffset)
                  , n = D.comparePoints(this.endContainer, this.endOffset, e.endContainer, e.endOffset)
                  , r = this.cloneRange();
                return t == -1 && r.setStart(e.startContainer, e.startOffset),
                n == 1 && r.setEnd(e.endContainer, e.endOffset),
                r
            }
            return null
        },
        union: function(e) {
            if (this.intersectsRange(e, !0)) {
                var t = this.cloneRange();
                return D.comparePoints(e.startContainer, e.startOffset, this.startContainer, this.startOffset) == -1 && t.setStart(e.startContainer, e.startOffset),
                D.comparePoints(e.endContainer, e.endOffset, this.endContainer, this.endOffset) == 1 && t.setEnd(e.endContainer, e.endOffset),
                t
            }
            throw new d("Ranges do not intersect")
        },
        containsNode: function(e, t) {
            return t ? this.intersectsNode(e, !1) : this.compareNode(e) == tt
        },
        containsNodeContents: function(e) {
            return this.comparePoint(e, 0) >= 0 && this.comparePoint(e, D.getNodeLength(e)) <= 0
        },
        containsRange: function(e) {
            return this.intersection(e).equals(e)
        },
        containsNodeText: function(e) {
            var t = this.cloneRange();
            t.selectNode(e);
            var n = t.getNodes([3]);
            return n.length > 0 ? (t.setStart(n[0], 0),
            e = n.pop(),
            t.setEnd(e, e.length),
            e = this.containsRange(t),
            t.detach(),
            e) : this.containsNodeContents(e)
        },
        createNodeIterator: function(e, t) {
            return T(this),
            new v(this,e,t)
        },
        getNodes: function(e, t) {
            return T(this),
            c(this, e, t)
        },
        getDocument: function() {
            return n(this)
        },
        collapseBefore: function(e) {
            y(this),
            this.setEndBefore(e),
            this.collapse(!1)
        },
        collapseAfter: function(e) {
            y(this),
            this.setStartAfter(e),
            this.collapse(!0)
        },
        getName: function() {
            return "DomRange"
        },
        equals: function(e) {
            return _.rangesEqual(this, e)
        },
        inspect: function() {
            return h(this)
        }
    },
    A(_, M, function(e) {
        y(e),
        e.startContainer = e.startOffset = e.endContainer = e.endOffset = null,
        e.collapsed = e.commonAncestorContainer = null,
        r(e, "detach", null),
        e._listeners = null
    }),
    e.rangePrototype = N.prototype,
    _.rangeProperties = $,
    _.RangeIterator = p,
    _.copyComparisonConstants = k,
    _.createPrototypeRange = A,
    _.inspect = h,
    _.getRangeDocument = n,
    _.rangesEqual = function(e, t) {
        return e.startContainer === t.startContainer && e.startOffset === t.startOffset && e.endContainer === t.endContainer && e.endOffset === t.endOffset
    }
    ,
    e.DomRange = _,
    e.RangeException = d
}),
rangy.createModule("WrappedRange", function(e) {
    function t(e, t, n, r) {
        var o = e.duplicate();
        o.collapse(n);
        var u = o.parentElement();
        i.isAncestorOf(t, u, !0) || (u = t);
        if (!u.canHaveHTML)
            return new s(u.parentNode,i.getNodeIndex(u));
        t = i.getDocument(u).createElement("span");
        var a, f = n ? "StartToStart" : "StartToEnd";
        do
            u.insertBefore(t, t.previousSibling),
            o.moveToElementText(t);
        while ((a = o.compareEndPoints(f, e)) > 0 && t.previousSibling);f = t.nextSibling;
        if (a == -1 && f && i.isCharacterDataNode(f)) {
            o.setEndPoint(n ? "EndToStart" : "EndToEnd", e);
            if (/[\r\n]/.test(f.data)) {
                u = o.duplicate(),
                n = u.text.replace(/\r\n/g, "\r").length;
                for (n = u.moveStart("character", n); u.compareEndPoints("StartToEnd", u) == -1; )
                    n++,
                    u.moveStart("character", 1)
            } else
                n = o.text.length;
            u = new s(f,n)
        } else
            f = (r || !n) && t.previousSibling,
            u = (n = (r || n) && t.nextSibling) && i.isCharacterDataNode(n) ? new s(n,0) : f && i.isCharacterDataNode(f) ? new s(f,f.length) : new s(u,i.getNodeIndex(t));
        return t.parentNode.removeChild(t),
        u
    }
    function n(e, t) {
        var n, r, s = e.offset, o = i.getDocument(e.node), u = o.body.createTextRange(), a = i.isCharacterDataNode(e.node);
        return a ? (n = e.node,
        r = n.parentNode) : (n = e.node.childNodes,
        n = s < n.length ? n[s] : null,
        r = e.node),
        o = o.createElement("span"),
        o.innerHTML = "&#feff;",
        n ? r.insertBefore(o, n) : r.appendChild(o),
        u.moveToElementText(o),
        u.collapse(!t),
        r.removeChild(o),
        a && u[t ? "moveStart" : "moveEnd"]("character", s),
        u
    }
    e.requireModules(["DomUtil", "DomRange"]);
    var r, i = e.dom, s = i.DomPosition, o = e.DomRange;
    if (e.features.implementsDomRange && (!e.features.implementsTextRange || !e.config.preferTextRange))
        (function() {
            function t(e) {
                for (var t = s.length, n; t--; )
                    n = s[t],
                    e[n] = e.nativeRange[n]
            }
            var n, s = o.rangeProperties, u, a;
            r = function(e) {
                if (!e)
                    throw Error("Range must be specified");
                this.nativeRange = e,
                t(this)
            }
            ,
            o.createPrototypeRange(r, function(e, t, n, r, i) {
                var s = e.endContainer !== r || e.endOffset != i;
                if (e.startContainer !== t || e.startOffset != n || s)
                    e.setEnd(r, i),
                    e.setStart(t, n)
            }, function(e) {
                e.nativeRange.detach(),
                e.detached = !0;
                for (var t = s.length, n; t--; )
                    n = s[t],
                    e[n] = null
            }),
            n = r.prototype,
            n.selectNode = function(e) {
                this.nativeRange.selectNode(e),
                t(this)
            }
            ,
            n.deleteContents = function() {
                this.nativeRange.deleteContents(),
                t(this)
            }
            ,
            n.extractContents = function() {
                var e = this.nativeRange.extractContents();
                return t(this),
                e
            }
            ,
            n.cloneContents = function() {
                return this.nativeRange.cloneContents()
            }
            ,
            n.surroundContents = function(e) {
                this.nativeRange.surroundContents(e),
                t(this)
            }
            ,
            n.collapse = function(e) {
                this.nativeRange.collapse(e),
                t(this)
            }
            ,
            n.cloneRange = function() {
                return new r(this.nativeRange.cloneRange())
            }
            ,
            n.refresh = function() {
                t(this)
            }
            ,
            n.toString = function() {
                return this.nativeRange.toString()
            }
            ;
            var f = document.createTextNode("test");
            i.getBody(document).appendChild(f);
            var l = document.createRange();
            l.setStart(f, 0),
            l.setEnd(f, 0);
            try {
                l.setStart(f, 1),
                u = !0,
                n.setStart = function(e, n) {
                    this.nativeRange.setStart(e, n),
                    t(this)
                }
                ,
                n.setEnd = function(e, n) {
                    this.nativeRange.setEnd(e, n),
                    t(this)
                }
                ,
                a = function(e) {
                    return function(n) {
                        this.nativeRange[e](n),
                        t(this)
                    }
                }
            } catch (c) {
                u = !1,
                n.setStart = function(e, n) {
                    try {
                        this.nativeRange.setStart(e, n)
                    } catch (r) {
                        this.nativeRange.setEnd(e, n),
                        this.nativeRange.setStart(e, n)
                    }
                    t(this)
                }
                ,
                n.setEnd = function(e, n) {
                    try {
                        this.nativeRange.setEnd(e, n)
                    } catch (r) {
                        this.nativeRange.setStart(e, n),
                        this.nativeRange.setEnd(e, n)
                    }
                    t(this)
                }
                ,
                a = function(e, n) {
                    return function(r) {
                        try {
                            this.nativeRange[e](r)
                        } catch (i) {
                            this.nativeRange[n](r),
                            this.nativeRange[e](r)
                        }
                        t(this)
                    }
                }
            }
            n.setStartBefore = a("setStartBefore", "setEndBefore"),
            n.setStartAfter = a("setStartAfter", "setEndAfter"),
            n.setEndBefore = a("setEndBefore", "setStartBefore"),
            n.setEndAfter = a("setEndAfter", "setStartAfter"),
            l.selectNodeContents(f),
            n.selectNodeContents = l.startContainer == f && l.endContainer == f && l.startOffset == 0 && l.endOffset == f.length ? function(e) {
                this.nativeRange.selectNodeContents(e),
                t(this)
            }
            : function(e) {
                this.setStart(e, 0),
                this.setEnd(e, o.getEndOffset(e))
            }
            ,
            l.selectNodeContents(f),
            l.setEnd(f, 3),
            u = document.createRange(),
            u.selectNodeContents(f),
            u.setEnd(f, 4),
            u.setStart(f, 2),
            n.compareBoundaryPoints = l.compareBoundaryPoints(l.START_TO_END, u) == -1 & l.compareBoundaryPoints(l.END_TO_START, u) == 1 ? function(e, t) {
                return t = t.nativeRange || t,
                e == t.START_TO_END ? e = t.END_TO_START : e == t.END_TO_START && (e = t.START_TO_END),
                this.nativeRange.compareBoundaryPoints(e, t)
            }
            : function(e, t) {
                return this.nativeRange.compareBoundaryPoints(e, t.nativeRange || t)
            }
            ,
            e.util.isHostMethod(l, "createContextualFragment") && (n.createContextualFragment = function(e) {
                return this.nativeRange.createContextualFragment(e)
            }
            ),
            i.getBody(document).removeChild(f),
            l.detach(),
            u.detach()
        })(),
        e.createNativeRange = function(e) {
            return e = e || document,
            e.createRange()
        }
        ;
    else if (e.features.implementsTextRange) {
        r = function(e) {
            this.textRange = e,
            this.refresh()
        }
        ,
        r.prototype = new o(document),
        r.prototype.refresh = function() {
            var e, n, r = this.textRange;
            e = r.parentElement();
            var s = r.duplicate();
            s.collapse(!0),
            n = s.parentElement(),
            s = r.duplicate(),
            s.collapse(!1),
            r = s.parentElement(),
            n = n == r ? n : i.getCommonAncestor(n, r),
            n = n == e ? n : i.getCommonAncestor(e, n),
            this.textRange.compareEndPoints("StartToEnd", this.textRange) == 0 ? n = e = t(this.textRange, n, !0, !0) : (e = t(this.textRange, n, !0, !1),
            n = t(this.textRange, n, !1, !1)),
            this.setStart(e.node, e.offset),
            this.setEnd(n.node, n.offset)
        }
        ,
        o.copyComparisonConstants(r);
        var u = function() {
            return this
        }();
        typeof u.Range == "undefined" && (u.Range = r),
        e.createNativeRange = function(e) {
            return e = e || document,
            e.body.createTextRange()
        }
    }
    e.features.implementsTextRange && (r.rangeToTextRange = function(e) {
        if (e.collapsed)
            return n(new s(e.startContainer,e.startOffset), !0);
        var t = n(new s(e.startContainer,e.startOffset), !0)
          , r = n(new s(e.endContainer,e.endOffset), !1);
        return e = i.getDocument(e.startContainer).body.createTextRange(),
        e.setEndPoint("StartToStart", t),
        e.setEndPoint("EndToEnd", r),
        e
    }
    ),
    r.prototype.getName = function() {
        return "WrappedRange"
    }
    ,
    e.WrappedRange = r,
    e.createRange = function(t) {
        return t = t || document,
        new r(e.createNativeRange(t))
    }
    ,
    e.createRangyRange = function(e) {
        return e = e || document,
        new o(e)
    }
    ,
    e.createIframeRange = function(t) {
        return e.createRange(i.getIframeDocument(t))
    }
    ,
    e.createIframeRangyRange = function(t) {
        return e.createRangyRange(i.getIframeDocument(t))
    }
    ,
    e.addCreateMissingNativeApiListener(function(t) {
        t = t.document,
        typeof t.createRange == "undefined" && (t.createRange = function() {
            return e.createRange(this)
        }
        ),
        t = t = null
    })
}),
rangy.createModule("WrappedSelection", function(e, t) {
    function n(e) {
        return (e || window).getSelection()
    }
    function r(e) {
        return (e || window).document.selection
    }
    function i(e, t, n) {
        var r = n ? "end" : "start";
        n = n ? "start" : "end",
        e.anchorNode = t[r + "Container"],
        e.anchorOffset = t[r + "Offset"],
        e.focusNode = t[n + "Container"],
        e.focusOffset = t[n + "Offset"]
    }
    function s(e) {
        e.anchorNode = e.focusNode = null,
        e.anchorOffset = e.focusOffset = 0,
        e.rangeCount = 0,
        e.isCollapsed = !0,
        e._ranges.length = 0
    }
    function o(t) {
        var n;
        return t instanceof g ? (n = t._selectionNativeRange,
        n || (n = e.createNativeRange(v.getDocument(t.startContainer)),
        n.setEnd(t.endContainer, t.endOffset),
        n.setStart(t.startContainer, t.startOffset),
        t._selectionNativeRange = n,
        t.attachListener("detach", function() {
            this._selectionNativeRange = null
        }))) : t instanceof y ? n = t.nativeRange : e.features.implementsDomRange && t instanceof v.getWindow(t.startContainer).Range && (n = t),
        n
    }
    function u(e) {
        var t = e.getNodes(), n;
        e: if (!t.length || t[0].nodeType != 1)
            n = !1;
        else {
            n = 1;
            for (var r = t.length; n < r; ++n)
                if (!v.isAncestorOf(t[0], t[n])) {
                    n = !1;
                    break e
                }
            n = !0
        }
        if (!n)
            throw Error("getSingleElementFromRange: range " + e.inspect() + " did not consist of a single element");
        return t[0]
    }
    function a(e, t) {
        var n = new y(t);
        e._ranges = [n],
        i(e, n, !1),
        e.rangeCount = 1,
        e.isCollapsed = n.collapsed
    }
    function f(t) {
        t._ranges.length = 0;
        if (t.docSelection.type == "None")
            s(t);
        else {
            var n = t.docSelection.createRange();
            if (n && typeof n.text != "undefined")
                a(t, n);
            else {
                t.rangeCount = n.length;
                for (var r, o = v.getDocument(n.item(0)), u = 0; u < t.rangeCount; ++u)
                    r = e.createRange(o),
                    r.selectNode(n.item(u)),
                    t._ranges.push(r);
                t.isCollapsed = t.rangeCount == 1 && t._ranges[0].collapsed,
                i(t, t._ranges[t.rangeCount - 1], !1)
            }
        }
    }
    function l(e, t) {
        var n = e.docSelection.createRange()
          , r = u(t)
          , i = v.getDocument(n.item(0));
        i = v.getBody(i).createControlRange();
        for (var s = 0, o = n.length; s < o; ++s)
            i.add(n.item(s));
        try {
            i.add(r)
        } catch (a) {
            throw Error("addRange(): Element within the specified Range could not be added to control selection (does it have layout?)")
        }
        i.select(),
        f(e)
    }
    function c(e, t, n) {
        this.nativeSelection = e,
        this.docSelection = t,
        this._ranges = [],
        this.win = n,
        this.refresh()
    }
    function h(e, t) {
        var n = v.getDocument(t[0].startContainer);
        n = v.getBody(n).createControlRange();
        for (var r = 0, i; r < rangeCount; ++r) {
            i = u(t[r]);
            try {
                n.add(i)
            } catch (s) {
                throw Error("setRanges(): Element within the one of the specified Ranges could not be added to control selection (does it have layout?)")
            }
        }
        n.select(),
        f(e)
    }
    function p(e, t) {
        if (e.anchorNode && v.getDocument(e.anchorNode) !== v.getDocument(t))
            throw new b("WRONG_DOCUMENT_ERR")
    }
    function d(e) {
        var t = []
          , n = new w(e.anchorNode,e.anchorOffset)
          , r = new w(e.focusNode,e.focusOffset)
          , i = typeof e.getName == "function" ? e.getName() : "Selection";
        if (typeof e.rangeCount != "undefined")
            for (var s = 0, o = e.rangeCount; s < o; ++s)
                t[s] = g.inspect(e.getRangeAt(s));
        return "[" + i + "(Ranges: " + t.join(", ") + ")(anchor: " + n.inspect() + ", focus: " + r.inspect() + "]"
    }
    e.requireModules(["DomUtil", "DomRange", "WrappedRange"]),
    e.config.checkSelectionRanges = !0;
    var v = e.dom, m = e.util, g = e.DomRange, y = e.WrappedRange, b = e.DOMException, w = v.DomPosition, E, S, x = e.util.isHostMethod(window, "getSelection"), T = e.util.isHostObject(document, "selection"), N = T && (!x || e.config.preferTextRange);
    N ? (E = r,
    e.isSelectionValid = function(e) {
        e = (e || window).document;
        var t = e.selection;
        return t.type != "None" || v.getDocument(t.createRange().parentElement()) == e
    }
    ) : x ? (E = n,
    e.isSelectionValid = function() {
        return !0
    }
    ) : t.fail("Neither document.selection or window.getSelection() detected."),
    e.getNativeSelection = E,
    x = E();
    var C = e.createNativeRange(document)
      , k = v.getBody(document)
      , L = m.areHostObjects(x, m.areHostProperties(x, ["anchorOffset", "focusOffset"]));
    e.features.selectionHasAnchorAndFocus = L;
    var A = m.isHostMethod(x, "extend");
    e.features.selectionHasExtend = A;
    var O = typeof x.rangeCount == "number";
    e.features.selectionHasRangeCount = O;
    var M = !1
      , _ = !0;
    m.areHostMethods(x, ["addRange", "getRangeAt", "removeAllRanges"]) && typeof x.rangeCount == "number" && e.features.implementsDomRange && function() {
        var e = document.createElement("iframe");
        k.appendChild(e);
        var t = v.getIframeDocument(e);
        t.open(),
        t.write("<html><head></head><body>12</body></html>"),
        t.close();
        var n = v.getIframeWindow(e).getSelection()
          , r = t.documentElement.lastChild.firstChild;
        t = t.createRange(),
        t.setStart(r, 1),
        t.collapse(!0),
        n.addRange(t),
        _ = n.rangeCount == 1,
        n.removeAllRanges();
        var i = t.cloneRange();
        t.setStart(r, 0),
        i.setEnd(r, 2),
        n.addRange(t),
        n.addRange(i),
        M = n.rangeCount == 2,
        t.detach(),
        i.detach(),
        k.removeChild(e)
    }(),
    e.features.selectionSupportsMultipleRanges = M,
    e.features.collapsedNonEditableSelectionsSupported = _;
    var D = !1, P;
    k && m.isHostMethod(k, "createControlRange") && (P = k.createControlRange(),
    m.areHostProperties(P, ["item", "add"]) && (D = !0)),
    e.features.implementsControlRange = D,
    S = L ? function(e) {
        return e.anchorNode === e.focusNode && e.anchorOffset === e.focusOffset
    }
    : function(e) {
        return e.rangeCount ? e.getRangeAt(e.rangeCount - 1).collapsed : !1
    }
    ;
    var H;
    m.isHostMethod(x, "getRangeAt") ? H = function(e, t) {
        try {
            return e.getRangeAt(t)
        } catch (n) {
            return null
        }
    }
    : L && (H = function(t) {
        var n = v.getDocument(t.anchorNode);
        return n = e.createRange(n),
        n.setStart(t.anchorNode, t.anchorOffset),
        n.setEnd(t.focusNode, t.focusOffset),
        n.collapsed !== this.isCollapsed && (n.setStart(t.focusNode, t.focusOffset),
        n.setEnd(t.anchorNode, t.anchorOffset)),
        n
    }
    ),
    e.getSelection = function(e) {
        e = e || window;
        var t = e._rangySelection
          , n = E(e)
          , i = T ? r(e) : null;
        return t ? (t.nativeSelection = n,
        t.docSelection = i,
        t.refresh(e)) : (t = new c(n,i,e),
        e._rangySelection = t),
        t
    }
    ,
    e.getIframeSelection = function(t) {
        return e.getSelection(v.getIframeWindow(t))
    }
    ,
    P = c.prototype;
    if (!N && L && m.areHostMethods(x, ["removeAllRanges", "addRange"])) {
        P.removeAllRanges = function() {
            this.nativeSelection.removeAllRanges(),
            s(this)
        }
        ;
        var B = function(t, n) {
            var r = g.getRangeDocument(n);
            r = e.createRange(r),
            r.collapseToPoint(n.endContainer, n.endOffset),
            t.nativeSelection.addRange(o(r)),
            t.nativeSelection.extend(n.startContainer, n.startOffset),
            t.refresh()
        };
        P.addRange = O ? function(t, n) {
            if (D && T && this.docSelection.type == "Control")
                l(this, t);
            else if (n && A)
                B(this, t);
            else {
                var r;
                M ? r = this.rangeCount : (this.removeAllRanges(),
                r = 0),
                this.nativeSelection.addRange(o(t)),
                this.rangeCount = this.nativeSelection.rangeCount,
                this.rangeCount == r + 1 ? (e.config.checkSelectionRanges && (r = H(this.nativeSelection, this.rangeCount - 1)) && !g.rangesEqual(r, t) && (t = new y(r)),
                this._ranges[this.rangeCount - 1] = t,
                i(this, t, I(this.nativeSelection)),
                this.isCollapsed = S(this)) : this.refresh()
            }
        }
        : function(e, t) {
            t && A ? B(this, e) : (this.nativeSelection.addRange(o(e)),
            this.refresh())
        }
        ,
        P.setRanges = function(e) {
            if (D && e.length > 1)
                h(this, e);
            else {
                this.removeAllRanges();
                for (var t = 0, n = e.length; t < n; ++t)
                    this.addRange(e[t])
            }
        }
    } else {
        if (!(m.isHostMethod(x, "empty") && m.isHostMethod(C, "select") && D && N))
            return t.fail("No means of selecting a Range or TextRange was found"),
            !1;
        P.removeAllRanges = function() {
            try {
                this.docSelection.empty();
                if (this.docSelection.type != "None") {
                    var e;
                    if (this.anchorNode)
                        e = v.getDocument(this.anchorNode);
                    else if (this.docSelection.type == "Control") {
                        var t = this.docSelection.createRange();
                        t.length && (e = v.getDocument(t.item(0)).body.createTextRange())
                    }
                    e && (e.body.createTextRange().select(),
                    this.docSelection.empty())
                }
            } catch (n) {}
            s(this)
        }
        ,
        P.addRange = function(e) {
            this.docSelection.type == "Control" ? l(this, e) : (y.rangeToTextRange(e).select(),
            this._ranges[0] = e,
            this.rangeCount = 1,
            this.isCollapsed = this._ranges[0].collapsed,
            i(this, e, !1))
        }
        ,
        P.setRanges = function(e) {
            this.removeAllRanges();
            var t = e.length;
            t > 1 ? h(this, e) : t && this.addRange(e[0])
        }
    }
    P.getRangeAt = function(e) {
        if (e < 0 || e >= this.rangeCount)
            throw new b("INDEX_SIZE_ERR");
        return this._ranges[e]
    }
    ;
    var j;
    if (N)
        j = function(t) {
            var n;
            e.isSelectionValid(t.win) ? n = t.docSelection.createRange() : (n = v.getBody(t.win.document).createTextRange(),
            n.collapse(!0)),
            t.docSelection.type == "Control" ? f(t) : n && typeof n.text != "undefined" ? a(t, n) : s(t)
        }
        ;
    else if (m.isHostMethod(x, "getRangeAt") && typeof x.rangeCount == "number")
        j = function(t) {
            if (D && T && t.docSelection.type == "Control")
                f(t);
            else {
                t._ranges.length = t.rangeCount = t.nativeSelection.rangeCount;
                if (t.rangeCount) {
                    for (var n = 0, r = t.rangeCount; n < r; ++n)
                        t._ranges[n] = new e.WrappedRange(t.nativeSelection.getRangeAt(n));
                    i(t, t._ranges[t.rangeCount - 1], I(t.nativeSelection)),
                    t.isCollapsed = S(t)
                } else
                    s(t)
            }
        }
        ;
    else {
        if (!L || typeof x.isCollapsed != "boolean" || typeof C.collapsed != "boolean" || !e.features.implementsDomRange)
            return t.fail("No means of obtaining a Range or TextRange from the user's selection was found"),
            !1;
        j = function(e) {
            var t;
            t = e.nativeSelection,
            t.anchorNode ? (t = H(t, 0),
            e._ranges = [t],
            e.rangeCount = 1,
            t = e.nativeSelection,
            e.anchorNode = t.anchorNode,
            e.anchorOffset = t.anchorOffset,
            e.focusNode = t.focusNode,
            e.focusOffset = t.focusOffset,
            e.isCollapsed = S(e)) : s(e)
        }
    }
    P.refresh = function(e) {
        var t = e ? this._ranges.slice(0) : null;
        j(this);
        if (e) {
            e = t.length;
            if (e != this._ranges.length)
                return !1;
            for (; e--; )
                if (!g.rangesEqual(t[e], this._ranges[e]))
                    return !1;
            return !0
        }
    }
    ;
    var F = function(e, t) {
        var n = e.getAllRanges()
          , r = !1;
        e.removeAllRanges();
        for (var i = 0, o = n.length; i < o; ++i)
            r || t !== n[i] ? e.addRange(n[i]) : r = !0;
        e.rangeCount || s(e)
    };
    P.removeRange = D ? function(e) {
        if (this.docSelection.type == "Control") {
            var t = this.docSelection.createRange();
            e = u(e);
            var n = v.getDocument(t.item(0));
            n = v.getBody(n).createControlRange();
            for (var r, i = !1, s = 0, o = t.length; s < o; ++s)
                r = t.item(s),
                r !== e || i ? n.add(t.item(s)) : i = !0;
            n.select(),
            f(this)
        } else
            F(this, e)
    }
    : function(e) {
        F(this, e)
    }
    ;
    var I;
    !N && L && e.features.implementsDomRange ? (I = function(e) {
        var t = !1;
        return e.anchorNode && (t = v.comparePoints(e.anchorNode, e.anchorOffset, e.focusNode, e.focusOffset) == 1),
        t
    }
    ,
    P.isBackwards = function() {
        return I(this)
    }
    ) : I = P.isBackwards = function() {
        return !1
    }
    ,
    P.toString = function() {
        for (var e = [], t = 0, n = this.rangeCount; t < n; ++t)
            e[t] = "" + this._ranges[t];
        return e.join("")
    }
    ,
    P.collapse = function(t, n) {
        p(this, t);
        var r = e.createRange(v.getDocument(t));
        r.collapseToPoint(t, n),
        this.removeAllRanges(),
        this.addRange(r),
        this.isCollapsed = !0
    }
    ,
    P.collapseToStart = function() {
        if (!this.rangeCount)
            throw new b("INVALID_STATE_ERR");
        var e = this._ranges[0];
        this.collapse(e.startContainer, e.startOffset)
    }
    ,
    P.collapseToEnd = function() {
        if (!this.rangeCount)
            throw new b("INVALID_STATE_ERR");
        var e = this._ranges[this.rangeCount - 1];
        this.collapse(e.endContainer, e.endOffset)
    }
    ,
    P.selectAllChildren = function(t) {
        p(this, t);
        var n = e.createRange(v.getDocument(t));
        n.selectNodeContents(t),
        this.removeAllRanges(),
        this.addRange(n)
    }
    ,
    P.deleteFromDocument = function() {
        if (D && T && this.docSelection.type == "Control") {
            for (var e = this.docSelection.createRange(), t; e.length; )
                t = e.item(0),
                e.remove(t),
                t.parentNode.removeChild(t);
            this.refresh()
        } else if (this.rangeCount) {
            e = this.getAllRanges(),
            this.removeAllRanges(),
            t = 0;
            for (var n = e.length; t < n; ++t)
                e[t].deleteContents();
            this.addRange(e[n - 1])
        }
    }
    ,
    P.getAllRanges = function() {
        return this._ranges.slice(0)
    }
    ,
    P.setSingleRange = function(e) {
        this.setRanges([e])
    }
    ,
    P.containsNode = function(e, t) {
        for (var n = 0, r = this._ranges.length; n < r; ++n)
            if (this._ranges[n].containsNode(e, t))
                return !0;
        return !1
    }
    ,
    P.toHtml = function() {
        var e = "";
        if (this.rangeCount) {
            e = g.getRangeDocument(this._ranges[0]).createElement("div");
            for (var t = 0, n = this._ranges.length; t < n; ++t)
                e.appendChild(this._ranges[t].cloneContents());
            e = e.innerHTML
        }
        return e
    }
    ,
    P.getName = function() {
        return "WrappedSelection"
    }
    ,
    P.inspect = function() {
        return d(this)
    }
    ,
    P.detach = function() {
        this.win = this.anchorNode = this.focusNode = this.win._rangySelection = null
    }
    ,
    c.inspect = d,
    e.Selection = c,
    e.selectionPrototype = P,
    e.addCreateMissingNativeApiListener(function(t) {
        typeof t.getSelection == "undefined" && (t.getSelection = function() {
            return e.getSelection(this)
        }
        ),
        t = null
    })
}),
rangy.createModule("CssClassApplier", function(e, t) {
    function n(e, t) {
        return e.className && RegExp("(?:^|\\s)" + t + "(?:\\s|$)").test(e.className)
    }
    function r(e, t) {
        e.className ? n(e, t) || (e.className += " " + t) : e.className = t
    }
    function i(e) {
        return e.split(/\s+/).sort().join(" ")
    }
    function s(e, t) {
        return i(e.className) == i(t.className)
    }
    function o(e) {
        for (var t = e.parentNode; e.hasChildNodes(); )
            t.insertBefore(e.firstChild, e);
        t.removeChild(e)
    }
    function u(e, t) {
        var n = e.cloneRange();
        n.selectNodeContents(t);
        var r = n.intersection(e);
        return r = r ? r.toString() : "",
        n.detach(),
        r != ""
    }
    function a(e) {
        return e.getNodes([3], function(t) {
            return u(e, t)
        })
    }
    function f(e, t) {
        if (e.attributes.length != t.attributes.length)
            return !1;
        for (var n = 0, r = e.attributes.length, i, s; n < r; ++n) {
            i = e.attributes[n],
            s = i.name;
            if (s != "class") {
                s = t.attributes.getNamedItem(s);
                if (i.specified != s.specified)
                    return !1;
                if (i.specified && i.nodeValue !== s.nodeValue)
                    return !1
            }
        }
        return !0
    }
    function l(e, t) {
        for (var n = 0, r = e.attributes.length, i; n < r; ++n) {
            i = e.attributes[n].name;
            if ((!t || !b.arrayContains(t, i)) && e.attributes[n].specified && i != "class")
                return !0
        }
        return !1
    }
    function c(e) {
        var t;
        return e && e.nodeType == 1 && ((t = e.parentNode) && t.nodeType == 9 && t.designMode == "on" || S(e) && !S(e.parentNode))
    }
    function h(e) {
        return (S(e) || e.nodeType != 1 && S(e.parentNode)) && !c(e)
    }
    function p(e) {
        return e && e.nodeType == 1 && !x.test(E(e, "display"))
    }
    function d(e) {
        if (e.data.length == 0)
            return !0;
        if (T.test(e.data))
            return !1;
        switch (E(e.parentNode, "whiteSpace")) {
        case "pre":
        case "pre-wrap":
        case "-moz-pre-wrap":
            return !1;
        case "pre-line":
            if (/[\r\n]/.test(e.data))
                return !1
        }
        return p(e.previousSibling) || p(e.nextSibling)
    }
    function v(e, n, r, i) {
        var s, o = r == 0;
        if (b.isAncestorOf(n, e))
            return e;
        if (b.isCharacterDataNode(n))
            if (r == 0)
                r = b.getNodeIndex(n),
                n = n.parentNode;
            else {
                if (r != n.length)
                    throw t.createError("splitNodeAt should not be called with offset in the middle of a data node (" + r + " in " + n.data);
                r = b.getNodeIndex(n) + 1,
                n = n.parentNode
            }
        var u;
        u = n;
        var a = r;
        u = b.isCharacterDataNode(u) ? a == 0 ? !!u.previousSibling : a == u.length ? !!u.nextSibling : !0 : a > 0 && a < u.childNodes.length;
        if (u) {
            if (!s) {
                s = n.cloneNode(!1);
                for (s.id && s.removeAttribute("id"); o = n.childNodes[r]; )
                    s.appendChild(o);
                b.insertAfter(s, n)
            }
            return n == e ? s : v(e, s.parentNode, b.getNodeIndex(s), i)
        }
        return e != n ? (s = n.parentNode,
        n = b.getNodeIndex(n),
        o || n++,
        v(e, s, n, i)) : e
    }
    function m(e) {
        var t = e ? "nextSibling" : "previousSibling";
        return function(n, r) {
            var i = n.parentNode
              , o = n[t];
            if (o) {
                if (o && o.nodeType == 3)
                    return o
            } else if (r && (o = i[t]) && o.nodeType == 1 && i.tagName == o.tagName && s(i, o) && f(i, o))
                return o[e ? "firstChild" : "lastChild"];
            return null
        }
    }
    function g(e) {
        this.firstTextNode = (this.isElementMerge = e.nodeType == 1) ? e.lastChild : e,
        this.textNodes = [this.firstTextNode]
    }
    function y(e, t, n) {
        this.cssClass = e;
        var r, s, o = null;
        if (typeof t == "object" && t !== null) {
            n = t.tagNames,
            o = t.elementProperties;
            for (r = 0; s = k[r++]; )
                t.hasOwnProperty(s) && (this[s] = t[s]);
            r = t.normalize
        } else
            r = t;
        this.normalize = typeof r == "undefined" ? !0 : r,
        this.attrExceptions = [],
        r = document.createElement(this.elementTagName),
        this.elementProperties = {};
        for (var u in o)
            o.hasOwnProperty(u) && (L.hasOwnProperty(u) && (u = L[u]),
            r[u] = o[u],
            this.elementProperties[u] = r[u],
            this.attrExceptions.push(u));
        this.elementSortedClassName = this.elementProperties.hasOwnProperty("className") ? i(this.elementProperties.className + " " + e) : e,
        this.applyToAnyTagName = !1,
        e = typeof n;
        if (e == "string")
            n == "*" ? this.applyToAnyTagName = !0 : this.tagNames = n.toLowerCase().replace(/^\s\s*/, "").replace(/\s\s*$/, "").split(/\s*,\s*/);
        else if (e == "object" && typeof n.length == "number") {
            this.tagNames = [],
            r = 0;
            for (e = n.length; r < e; ++r)
                n[r] == "*" ? this.applyToAnyTagName = !0 : this.tagNames.push(n[r].toLowerCase())
        } else
            this.tagNames = [this.elementTagName]
    }
    e.requireModules(["WrappedSelection", "WrappedRange"]);
    var b = e.dom, w = function() {
        function e(e, t, n) {
            return t && n ? " " : ""
        }
        return function(t, n) {
            t.className && (t.className = t.className.replace(RegExp("(?:^|\\s)" + n + "(?:\\s|$)"), e))
        }
    }(), E;
    typeof window.getComputedStyle != "undefined" ? E = function(e, t) {
        return b.getWindow(e).getComputedStyle(e, null)[t]
    }
    : typeof document.documentElement.currentStyle != "undefined" ? E = function(e, t) {
        return e.currentStyle[t]
    }
    : t.fail("No means of obtaining computed style properties found");
    var S;
    (function() {
        S = typeof document.createElement("div").isContentEditable == "boolean" ? function(e) {
            return e && e.nodeType == 1 && e.isContentEditable
        }
        : function(e) {
            return !e || e.nodeType != 1 || e.contentEditable == "false" ? !1 : e.contentEditable == "true" || S(e.parentNode)
        }
    })();
    var x = /^inline(-block|-table)?$/i
      , T = /[^\r\n\t\f \u200B]/
      , N = m(!1)
      , C = m(!0);
    g.prototype = {
        doMerge: function() {
            for (var e = [], t, n, r = 0, i = this.textNodes.length; r < i; ++r)
                t = this.textNodes[r],
                n = t.parentNode,
                e[r] = t.data,
                r && (n.removeChild(t),
                n.hasChildNodes() || n.parentNode.removeChild(n));
            return this.firstTextNode.data = e = e.join("")
        },
        getLength: function() {
            for (var e = this.textNodes.length, t = 0; e--; )
                t += this.textNodes[e].length;
            return t
        },
        toString: function() {
            for (var e = [], t = 0, n = this.textNodes.length; t < n; ++t)
                e[t] = "'" + this.textNodes[t].data + "'";
            return "[Merge(" + e.join(",") + ")]"
        }
    };
    var k = ["elementTagName", "ignoreWhiteSpace", "applyToEditableOnly"]
      , L = {
        "class": "className"
    };
    y.prototype = {
        elementTagName: "span",
        elementProperties: {},
        ignoreWhiteSpace: !0,
        applyToEditableOnly: !1,
        hasClass: function(e) {
            return e.nodeType == 1 && b.arrayContains(this.tagNames, e.tagName.toLowerCase()) && n(e, this.cssClass)
        },
        getSelfOrAncestorWithClass: function(e) {
            for (; e; ) {
                if (this.hasClass(e, this.cssClass))
                    return e;
                e = e.parentNode
            }
            return null
        },
        isModifiable: function(e) {
            return !this.applyToEditableOnly || h(e)
        },
        isIgnorableWhiteSpaceNode: function(e) {
            return this.ignoreWhiteSpace && e && e.nodeType == 3 && d(e)
        },
        postApply: function(e, t, n) {
            for (var r = e[0], i = e[e.length - 1], s = [], o, u = r, a = i, f = 0, l = i.length, c, h, p = 0, d = e.length; p < d; ++p)
                c = e[p],
                (h = N(c, !n)) ? (o || (o = new g(h),
                s.push(o)),
                o.textNodes.push(c),
                c === r && (u = o.firstTextNode,
                f = u.length),
                c === i && (a = o.firstTextNode,
                l = o.getLength())) : o = null;
            if (e = C(i, !n))
                o || (o = new g(i),
                s.push(o)),
                o.textNodes.push(e);
            if (s.length) {
                p = 0;
                for (d = s.length; p < d; ++p)
                    s[p].doMerge();
                t.setStart(u, f),
                t.setEnd(a, l)
            }
        },
        createContainer: function(t) {
            return t = t.createElement(this.elementTagName),
            e.util.extend(t, this.elementProperties),
            r(t, this.cssClass),
            t
        },
        applyToTextNode: function(e) {
            var t = e.parentNode;
            t.childNodes.length == 1 && b.arrayContains(this.tagNames, t.tagName.toLowerCase()) ? r(t, this.cssClass) : (t = this.createContainer(b.getDocument(e)),
            e.parentNode.insertBefore(t, e),
            t.appendChild(e))
        },
        isRemovable: function(e) {
            var t;
            if (t = e.tagName.toLowerCase() == this.elementTagName) {
                if (t = i(e.className) == this.elementSortedClassName) {
                    var n;
                    e: {
                        t = this.elementProperties;
                        for (n in t)
                            if (t.hasOwnProperty(n) && e[n] !== t[n]) {
                                n = !1;
                                break e
                            }
                        n = !0
                    }
                    t = n && !l(e, this.attrExceptions) && this.isModifiable(e)
                }
                t = t
            }
            return t
        },
        undoToTextNode: function(e, t, n) {
            t.containsNode(n) || (e = t.cloneRange(),
            e.selectNode(n),
            e.isPointInRange(t.endContainer, t.endOffset) && (v(n, t.endContainer, t.endOffset, [t]),
            t.setEndAfter(n)),
            e.isPointInRange(t.startContainer, t.startOffset) && (n = v(n, t.startContainer, t.startOffset, [t]))),
            this.isRemovable(n) ? o(n) : w(n, this.cssClass)
        },
        applyToRange: function(e) {
            e.splitBoundaries();
            var t = a(e);
            if (t.length) {
                for (var n, r = 0, i = t.length; r < i; ++r)
                    n = t[r],
                    !this.isIgnorableWhiteSpaceNode(n) && !this.getSelfOrAncestorWithClass(n) && this.isModifiable(n) && this.applyToTextNode(n);
                e.setStart(t[0], 0),
                n = t[t.length - 1],
                e.setEnd(n, n.length),
                this.normalize && this.postApply(t, e, !1)
            }
        },
        applyToSelection: function(t) {
            t = t || window,
            t = e.getSelection(t);
            var n, r = t.getAllRanges();
            t.removeAllRanges();
            for (var i = r.length; i--; )
                n = r[i],
                this.applyToRange(n),
                t.addRange(n)
        },
        undoToRange: function(e) {
            e.splitBoundaries();
            var t = a(e), n, r, i = t[t.length - 1];
            if (t.length) {
                for (var s = 0, o = t.length; s < o; ++s)
                    n = t[s],
                    (r = this.getSelfOrAncestorWithClass(n)) && this.isModifiable(n) && this.undoToTextNode(n, e, r),
                    e.setStart(t[0], 0),
                    e.setEnd(i, i.length);
                this.normalize && this.postApply(t, e, !0)
            }
        },
        undoToSelection: function(t) {
            t = t || window,
            t = e.getSelection(t);
            var n = t.getAllRanges(), r;
            t.removeAllRanges();
            for (var i = 0, s = n.length; i < s; ++i)
                r = n[i],
                this.undoToRange(r),
                t.addRange(r)
        },
        getTextSelectedByRange: function(e, t) {
            var n = t.cloneRange();
            n.selectNodeContents(e);
            var r = n.intersection(t);
            return r = r ? r.toString() : "",
            n.detach(),
            r
        },
        isAppliedToRange: function(e) {
            if (e.collapsed)
                return !!this.getSelfOrAncestorWithClass(e.commonAncestorContainer);
            for (var t = e.getNodes([3]), n = 0, r; r = t[n++]; )
                if (!this.isIgnorableWhiteSpaceNode(r) && u(e, r) && this.isModifiable(r) && !this.getSelfOrAncestorWithClass(r))
                    return !1;
            return !0
        },
        isAppliedToSelection: function(t) {
            t = t || window,
            t = e.getSelection(t).getAllRanges();
            for (var n = t.length; n--; )
                if (!this.isAppliedToRange(t[n]))
                    return !1;
            return !0
        },
        toggleRange: function(e) {
            this.isAppliedToRange(e) ? this.undoToRange(e) : this.applyToRange(e)
        },
        toggleSelection: function(e) {
            this.isAppliedToSelection(e) ? this.undoToSelection(e) : this.applyToSelection(e)
        },
        detach: function() {}
    },
    y.util = {
        hasClass: n,
        addClass: r,
        removeClass: w,
        hasSameClasses: s,
        replaceWithOwnChildren: o,
        elementsHaveSameNonClassAttributes: f,
        elementHasNonClassAttributes: l,
        splitNodeAt: v,
        isEditableElement: S,
        isEditingHost: c,
        isEditable: h
    },
    e.CssClassApplier = y,
    e.createCssClassApplier = function(e, t, n) {
        return new y(e,t,n)
    }
}),
rangy.createModule("SaveRestore", function(e, t) {
    function n(e, t) {
        var n = "selectionBoundary_" + +(new Date) + "_" + ("" + Math.random()).slice(2), r, i = o.getDocument(e.startContainer), s = e.cloneRange();
        return s.collapse(t),
        r = i.createElement("span"),
        r.id = n,
        r.style.lineHeight = "0",
        r.style.display = "none",
        r.className = "rangySelectionBoundary",
        r.appendChild(i.createTextNode(u)),
        s.insertNode(r),
        s.detach(),
        r
    }
    function r(e, n, r, i) {
        (e = (e || document).getElementById(r)) ? (n[i ? "setStartBefore" : "setEndBefore"](e),
        e.parentNode.removeChild(e)) : t.warn("Marker element has been removed. Cannot restore selection.")
    }
    function i(e, t) {
        return t.compareBoundaryPoints(e.START_TO_START, e)
    }
    function s(e, t) {
        var n = (e || document).getElementById(t);
        n && n.parentNode.removeChild(n)
    }
    e.requireModules(["DomUtil", "DomRange", "WrappedRange"]);
    var o = e.dom
      , u = "﻿";
    e.saveSelection = function(r) {
        r = r || window;
        var s = r.document;
        if (e.isSelectionValid(r)) {
            var o = e.getSelection(r), u = o.getAllRanges(), a = [], f, l;
            u.sort(i);
            for (var c = 0, p = u.length; c < p; ++c)
                f = u[c],
                f.collapsed ? (l = n(f, !1),
                a.push({
                    markerId: l.id,
                    collapsed: !0
                })) : (l = n(f, !1),
                f = n(f, !0),
                a[c] = {
                    startMarkerId: f.id,
                    endMarkerId: l.id,
                    collapsed: !1,
                    backwards: u.length == 1 && o.isBackwards()
                });
            for (c = p - 1; c >= 0; --c)
                f = u[c],
                f.collapsed ? f.collapseBefore((s || document).getElementById(a[c].markerId)) : (f.setEndBefore((s || document).getElementById(a[c].endMarkerId)),
                f.setStartAfter((s || document).getElementById(a[c].startMarkerId)));
            return o.setRanges(u),
            {
                win: r,
                doc: s,
                rangeInfos: a,
                restored: !1
            }
        }
        t.warn("Cannot save selection. This usually happens when the selection is collapsed and the selection document has lost focus.")
    }
    ,
    e.restoreSelection = function(n, i) {
        if (!n.restored) {
            for (var s = n.rangeInfos, o = e.getSelection(n.win), u = [], a = s.length, f = a - 1, l, c; f >= 0; --f) {
                l = s[f],
                c = e.createRange(n.doc);
                if (l.collapsed)
                    if (l = (n.doc || document).getElementById(l.markerId)) {
                        l.style.display = "inline";
                        var p = l.previousSibling;
                        p && p.nodeType == 3 ? (l.parentNode.removeChild(l),
                        c.collapseToPoint(p, p.length)) : (c.collapseBefore(l),
                        l.parentNode.removeChild(l))
                    } else
                        t.warn("Marker element has been removed. Cannot restore selection.");
                else
                    r(n.doc, c, l.startMarkerId, !0),
                    r(n.doc, c, l.endMarkerId, !1);
                a == 1 && c.normalizeBoundaries(),
                u[f] = c
            }
            a == 1 && i && e.features.selectionHasExtend && s[0].backwards ? (o.removeAllRanges(),
            o.addRange(u[0], !0)) : o.setRanges(u),
            n.restored = !0
        }
    }
    ,
    e.removeMarkerElement = s,
    e.removeMarkers = function(e) {
        for (var t = e.rangeInfos, n = 0, r = t.length, i; n < r; ++n)
            i = t[n],
            i.collapsed ? s(e.doc, i.markerId) : (s(e.doc, i.startMarkerId),
            s(e.doc, i.endMarkerId))
    }
}),
rangy.createModule("Serializer", function(e, t) {
    function n(e, t) {
        t = t || [];
        var r = e.nodeType
          , i = e.childNodes
          , s = i.length
          , o = [r, e.nodeName, s].join(":")
          , u = ""
          , a = "";
        switch (r) {
        case 3:
            u = e.nodeValue.replace(/</g, "&lt;").replace(/>/g, "&gt;");
            break;
        case 8:
            u = "<!--" + e.nodeValue.replace(/</g, "&lt;").replace(/>/g, "&gt;") + "-->";
            break;
        default:
            u = "<" + o + ">",
            a = "</>"
        }
        u && t.push(u);
        for (r = 0; r < s; ++r)
            n(i[r], t);
        return a && t.push(a),
        t
    }
    function r(e) {
        return e = n(e).join(""),
        c(e).toString(16)
    }
    function i(e, t, n) {
        var r = []
          , i = e;
        for (n = n || h.getDocument(e).documentElement; i && i != n; )
            r.push(h.getNodeIndex(i, !0)),
            i = i.parentNode;
        return r.join("/") + ":" + t
    }
    function s(e, n, r) {
        n ? r || h.getDocument(n) : (r = r || document,
        n = r.documentElement),
        e = e.split(":"),
        n = n,
        r = e[0] ? e[0].split("/") : [];
        for (var i = r.length, s; i--; ) {
            s = parseInt(r[i], 10);
            if (!(s < n.childNodes.length))
                throw t.createError("deserializePosition failed: node " + h.inspectNode(n) + " has no child with index " + s + ", " + i);
            n = n.childNodes[parseInt(r[i], 10)]
        }
        return new h.DomPosition(n,parseInt(e[1], 10))
    }
    function o(t, n, s) {
        s = s || e.DomRange.getRangeDocument(t).documentElement;
        if (!h.isAncestorOf(s, t.commonAncestorContainer, !0))
            throw Error("serializeRange: range is not wholly contained within specified root node");
        return t = i(t.startContainer, t.startOffset, s) + "," + i(t.endContainer, t.endOffset, s),
        n || (t += "{" + r(s) + "}"),
        t
    }
    function u(t, n, i) {
        n ? i = i || h.getDocument(n) : (i = i || document,
        n = i.documentElement),
        t = /^([^,]+),([^,\{]+)({([^}]+)})?$/.exec(t);
        var o = t[4]
          , u = r(n);
        if (o && o !== r(n))
            throw Error("deserializeRange: checksums of serialized range root node (" + o + ") and target root node (" + u + ") do not match");
        return o = s(t[1], n, i),
        n = s(t[2], n, i),
        i = e.createRange(i),
        i.setStart(o.node, o.offset),
        i.setEnd(n.node, n.offset),
        i
    }
    function a(e, t, n) {
        return t ? n || h.getDocument(t) : (n = n || document,
        t = n.documentElement),
        e = /^([^,]+),([^,]+)({([^}]+)})?$/.exec(e)[3],
        !e || e === r(t)
    }
    function f(t, n, r) {
        t = t || e.getSelection(),
        t = t.getAllRanges();
        for (var i = [], s = 0, u = t.length; s < u; ++s)
            i[s] = o(t[s], n, r);
        return i.join("|")
    }
    function l(t, n, r) {
        n ? r = r || h.getWindow(n) : (r = r || window,
        n = r.document.documentElement),
        t = t.split("|");
        for (var i = e.getSelection(r), s = [], o = 0, a = t.length; o < a; ++o)
            s[o] = u(t[o], n, r.document);
        return i.setRanges(s),
        i
    }
    e.requireModules(["WrappedSelection", "WrappedRange"]),
    (typeof encodeURIComponent == "undefined" || typeof decodeURIComponent == "undefined") && t.fail("Global object is missing encodeURIComponent and/or decodeURIComponent method");
    var c = function() {
        var e = null;
        return function(t) {
            for (var n = [], r = 0, i = t.length, s; r < i; ++r)
                s = t.charCodeAt(r),
                s < 128 ? n.push(s) : s < 2048 ? n.push(s >> 6 | 192, s & 63 | 128) : n.push(s >> 12 | 224, s >> 6 & 63 | 128, s & 63 | 128);
            t = -1;
            if (!e) {
                r = [],
                i = 0;
                for (var o; i < 256; ++i) {
                    o = i;
                    for (s = 8; s--; )
                        (o & 1) == 1 ? o = o >>> 1 ^ 3988292384 : o >>>= 1;
                    r[i] = o >>> 0
                }
                e = r
            }
            r = e,
            i = 0;
            for (s = n.length; i < s; ++i)
                o = (t ^ n[i]) & 255,
                t = t >>> 8 ^ r[o];
            return (t ^ -1) >>> 0
        }
    }()
      , h = e.dom;
    e.serializePosition = i,
    e.deserializePosition = s,
    e.serializeRange = o,
    e.deserializeRange = u,
    e.canDeserializeRange = a,
    e.serializeSelection = f,
    e.deserializeSelection = l,
    e.canDeserializeSelection = function(e, t, n) {
        var r;
        t ? r = n ? n.document : h.getDocument(t) : (n = n || window,
        t = n.document.documentElement),
        e = e.split("|"),
        n = 0;
        for (var i = e.length; n < i; ++n)
            if (!a(e[n], t, r))
                return !1;
        return !0
    }
    ,
    e.restoreSelectionFromCookie = function(e) {
        e = e || window;
        var t;
        e: {
            t = e.document.cookie.split(/[;,]/);
            for (var n = 0, r = t.length, i; n < r; ++n) {
                i = t[n].split("=");
                if (i[0].replace(/^\s+/, "") == "rangySerializedSelection")
                    if (i = i[1]) {
                        t = decodeURIComponent(i.replace(/\s+$/, ""));
                        break e
                    }
            }
            t = null
        }
        t && l(t, e.doc)
    }
    ,
    e.saveSelectionCookie = function(t, n) {
        t = t || window,
        n = typeof n == "object" ? n : {};
        var r = n.expires ? ";expires=" + n.expires.toUTCString() : ""
          , i = n.path ? ";path=" + n.path : ""
          , s = n.domain ? ";domain=" + n.domain : ""
          , o = n.secure ? ";secure" : ""
          , u = f(e.getSelection(t));
        t.document.cookie = encodeURIComponent("rangySerializedSelection") + "=" + encodeURIComponent(u) + r + i + s + o
    }
    ,
    e.getElementChecksum = r
}),
window.rangy = function() {
    function u(n, r) {
        var i = typeof n[r];
        return i == t || i == e && !!n[r] || i == "unknown"
    }
    function a(t, n) {
        return typeof t[n] == e && !!t[n]
    }
    function f(e, t) {
        return typeof e[t] != n
    }
    function l(e) {
        return function(t, n) {
            var r = n.length;
            while (r--)
                if (!e(t, n[r]))
                    return !1;
            return !0
        }
    }
    function d(e) {
        return e && c(e, o) && p(e, s)
    }
    function m(e) {
        window.alert("Rangy not supported in your browser. Reason: " + e),
        v.initialized = !0,
        v.supported = !1
    }
    function g(e) {
        var t = "Rangy warning: " + e;
        v.config.alertOnWarn ? window.alert(t) : typeof window.console != n && typeof window.console.log != n && window.console.log(t)
    }
    function w() {
        if (v.initialized)
            return;
        var e, t = !1, n = !1;
        u(document, "createRange") && (e = document.createRange(),
        c(e, i) && p(e, r) && (t = !0),
        e.detach());
        var s = a(document, "body") ? document.body : document.getElementsByTagName("body")[0];
        s && u(s, "createTextRange") && (e = s.createTextRange(),
        d(e) && (n = !0)),
        !t && !n && m("Neither Range nor TextRange are implemented"),
        v.initialized = !0,
        v.features = {
            implementsDomRange: t,
            implementsTextRange: n
        };
        var o = b.concat(y);
        for (var f = 0, l = o.length; f < l; ++f)
            try {
                o[f](v)
            } catch (h) {
                a(window, "console") && u(window.console, "log") && window.console.log("Init listener threw an exception. Continuing.", h)
            }
    }
    function S(e) {
        e = e || window,
        w();
        for (var t = 0, n = E.length; t < n; ++t)
            E[t](e)
    }
    function x(e) {
        this.name = e,
        this.initialized = !1,
        this.supported = !1
    }
    var e = "object"
      , t = "function"
      , n = "undefined"
      , r = ["startContainer", "startOffset", "endContainer", "endOffset", "collapsed", "commonAncestorContainer", "START_TO_START", "START_TO_END", "END_TO_START", "END_TO_END"]
      , i = ["setStart", "setStartBefore", "setStartAfter", "setEnd", "setEndBefore", "setEndAfter", "collapse", "selectNode", "selectNodeContents", "compareBoundaryPoints", "deleteContents", "extractContents", "cloneContents", "insertNode", "surroundContents", "cloneRange", "toString", "detach"]
      , s = ["boundingHeight", "boundingLeft", "boundingTop", "boundingWidth", "htmlText", "text"]
      , o = ["collapse", "compareEndPoints", "duplicate", "getBookmark", "moveToBookmark", "moveToElementText", "parentElement", "pasteHTML", "select", "setEndPoint", "getBoundingClientRect"]
      , c = l(u)
      , h = l(a)
      , p = l(f)
      , v = {
        version: "1.2.2",
        initialized: !1,
        supported: !0,
        util: {
            isHostMethod: u,
            isHostObject: a,
            isHostProperty: f,
            areHostMethods: c,
            areHostObjects: h,
            areHostProperties: p,
            isTextRange: d
        },
        features: {},
        modules: {},
        config: {
            alertOnWarn: !1,
            preferTextRange: !1
        }
    };
    v.fail = m,
    v.warn = g,
    {}.hasOwnProperty ? v.util.extend = function(e, t) {
        for (var n in t)
            t.hasOwnProperty(n) && (e[n] = t[n])
    }
    : m("hasOwnProperty not supported");
    var y = []
      , b = [];
    v.init = w,
    v.addInitListener = function(e) {
        v.initialized ? e(v) : y.push(e)
    }
    ;
    var E = [];
    v.addCreateMissingNativeApiListener = function(e) {
        E.push(e)
    }
    ,
    v.createMissingNativeApi = S,
    x.prototype.fail = function(e) {
        throw this.initialized = !0,
        this.supported = !1,
        new Error("Module '" + this.name + "' failed to load: " + e)
    }
    ,
    x.prototype.warn = function(e) {
        v.warn("Module " + this.name + ": " + e)
    }
    ,
    x.prototype.createError = function(e) {
        return new Error("Error in Rangy " + this.name + " module: " + e)
    }
    ,
    v.createModule = function(e, t) {
        var n = new x(e);
        v.modules[e] = n,
        b.push(function(e) {
            t(e, n),
            n.initialized = !0,
            n.supported = !0
        })
    }
    ,
    v.requireModules = function(e) {
        for (var t = 0, n = e.length, r, i; t < n; ++t) {
            i = e[t],
            r = v.modules[i];
            if (!r || !(r instanceof x))
                throw new Error("Module '" + i + "' not found");
            if (!r.supported)
                throw new Error("Module '" + i + "' not supported")
        }
    }
    ;
    var T = !1
      , N = function(e) {
        T || (T = !0,
        v.initialized || w())
    };
    if (typeof window == n) {
        m("No window found");
        return
    }
    if (typeof document == n) {
        m("No document found");
        return
    }
    return u(document, "addEventListener") && document.addEventListener("DOMContentLoaded", N, !1),
    u(window, "addEventListener") ? window.addEventListener("load", N, !1) : u(window, "attachEvent") ? window.attachEvent("onload", N) : m("Window does not have required addEventListener or attachEvent method"),
    v
}(),
rangy.createModule("DomUtil", function(e, t) {
    function u(e) {
        var t;
        return typeof e.namespaceURI == n || (t = e.namespaceURI) === null || t == "http://www.w3.org/1999/xhtml"
    }
    function a(e) {
        var t = e.parentNode;
        return t.nodeType == 1 ? t : null
    }
    function f(e) {
        var t = 0;
        while (e = e.previousSibling)
            t++;
        return t
    }
    function l(e) {
        var t;
        return d(e) ? e.length : (t = e.childNodes) ? t.length : 0
    }
    function c(e, t) {
        var n = [], r;
        for (r = e; r; r = r.parentNode)
            n.push(r);
        for (r = t; r; r = r.parentNode)
            if (o(n, r))
                return r;
        return null
    }
    function h(e, t, n) {
        var r = n ? t : t.parentNode;
        while (r) {
            if (r === e)
                return !0;
            r = r.parentNode
        }
        return !1
    }
    function p(e, t, n) {
        var r, i = n ? e : e.parentNode;
        while (i) {
            r = i.parentNode;
            if (r === t)
                return i;
            i = r
        }
        return null
    }
    function d(e) {
        var t = e.nodeType;
        return t == 3 || t == 4 || t == 8
    }
    function v(e, t) {
        var n = t.nextSibling
          , r = t.parentNode;
        return n ? r.insertBefore(e, n) : r.appendChild(e),
        e
    }
    function m(e, t) {
        var n = e.cloneNode(!1);
        return n.deleteData(0, t),
        e.deleteData(t, e.length - t),
        v(n, e),
        n
    }
    function g(e) {
        if (e.nodeType == 9)
            return e;
        if (typeof e.ownerDocument != n)
            return e.ownerDocument;
        if (typeof e.document != n)
            return e.document;
        if (e.parentNode)
            return g(e.parentNode);
        throw new Error("getDocument: no document found for node")
    }
    function y(e) {
        var t = g(e);
        if (typeof t.defaultView != n)
            return t.defaultView;
        if (typeof t.parentWindow != n)
            return t.parentWindow;
        throw new Error("Cannot get a window object for node")
    }
    function b(e) {
        if (typeof e.contentDocument != n)
            return e.contentDocument;
        if (typeof e.contentWindow != n)
            return e.contentWindow.document;
        throw new Error("getIframeWindow: No Document object found for iframe element")
    }
    function w(e) {
        if (typeof e.contentWindow != n)
            return e.contentWindow;
        if (typeof e.contentDocument != n)
            return e.contentDocument.defaultView;
        throw new Error("getIframeWindow: No Window object found for iframe element")
    }
    function E(e) {
        return r.isHostObject(e, "body") ? e.body : e.getElementsByTagName("body")[0]
    }
    function S(e) {
        var t;
        while (t = e.parentNode)
            e = t;
        return e
    }
    function x(e, t, n, r) {
        var i, s, o, u, a;
        if (e == n)
            return t === r ? 0 : t < r ? -1 : 1;
        if (i = p(n, e, !0))
            return t <= f(i) ? -1 : 1;
        if (i = p(e, n, !0))
            return f(i) < r ? -1 : 1;
        s = c(e, n),
        o = e === s ? s : p(e, s, !0),
        u = n === s ? s : p(n, s, !0);
        if (o === u)
            throw new Error("comparePoints got to case 4 and childA and childB are the same!");
        if (!s)
            return console.log("Rangy null exception by Jon's hack."),
            -1;
        a = s.firstChild;
        while (a) {
            if (a === o)
                return -1;
            if (a === u)
                return 1;
            a = a.nextSibling
        }
        throw new Error("Should not be here!")
    }
    function T(e) {
        var t = g(e).createDocumentFragment(), n;
        while (n = e.firstChild)
            t.appendChild(n);
        return t
    }
    function N(e) {
        if (!e)
            return "[No node]";
        if (d(e))
            return '"' + e.data + '"';
        if (e.nodeType == 1) {
            var t = e.id ? ' id="' + e.id + '"' : "";
            return "<" + e.nodeName + t + ">[" + e.childNodes.length + "]"
        }
        return e.nodeName
    }
    function C(e) {
        this.root = e,
        this._next = e
    }
    function k(e) {
        return new C(e)
    }
    function L(e, t) {
        this.node = e,
        this.offset = t
    }
    function A(e) {
        this.code = this[e],
        this.codeName = e,
        this.message = "DOMException: " + this.codeName
    }
    var n = "undefined"
      , r = e.util;
    r.areHostMethods(document, ["createDocumentFragment", "createElement", "createTextNode"]) || t.fail("document missing a Node creation method"),
    r.isHostMethod(document, "getElementsByTagName") || t.fail("document missing getElementsByTagName method");
    var i = document.createElement("div");
    r.areHostMethods(i, ["insertBefore", "appendChild", "cloneNode"] || !r.areHostObjects(i, ["previousSibling", "nextSibling", "childNodes", "parentNode"])) || t.fail("Incomplete Element implementation"),
    r.isHostProperty(i, "innerHTML") || t.fail("Element is missing innerHTML property");
    var s = document.createTextNode("test");
    r.areHostMethods(s, ["splitText", "deleteData", "insertData", "appendData", "cloneNode"] || !r.areHostObjects(i, ["previousSibling", "nextSibling", "childNodes", "parentNode"]) || !r.areHostProperties(s, ["data"])) || t.fail("Incomplete Text Node implementation");
    var o = function(e, t) {
        var n = e.length;
        while (n--)
            if (e[n] === t)
                return !0;
        return !1
    };
    C.prototype = {
        _current: null,
        hasNext: function() {
            return !!this._next
        },
        next: function() {
            var e = this._current = this._next, t, n;
            if (this._current) {
                t = e.firstChild;
                if (t)
                    this._next = t;
                else {
                    n = null;
                    while (e !== this.root && !(n = e.nextSibling))
                        e = e.parentNode;
                    this._next = n
                }
            }
            return this._current
        },
        detach: function() {
            this._current = this._next = this.root = null
        }
    },
    L.prototype = {
        equals: function(e) {
            return this.node === e.node & this.offset == e.offset
        },
        inspect: function() {
            return "[DomPosition(" + N(this.node) + ":" + this.offset + ")]"
        }
    },
    A.prototype = {
        INDEX_SIZE_ERR: 1,
        HIERARCHY_REQUEST_ERR: 3,
        WRONG_DOCUMENT_ERR: 4,
        NO_MODIFICATION_ALLOWED_ERR: 7,
        NOT_FOUND_ERR: 8,
        NOT_SUPPORTED_ERR: 9,
        INVALID_STATE_ERR: 11
    },
    A.prototype.toString = function() {
        return this.message
    }
    ,
    e.dom = {
        arrayContains: o,
        isHtmlNamespace: u,
        parentElement: a,
        getNodeIndex: f,
        getNodeLength: l,
        getCommonAncestor: c,
        isAncestorOf: h,
        getClosestAncestorIn: p,
        isCharacterDataNode: d,
        insertAfter: v,
        splitDataNode: m,
        getDocument: g,
        getWindow: y,
        getIframeWindow: w,
        getIframeDocument: b,
        getBody: E,
        getRootContainer: S,
        comparePoints: x,
        inspectNode: N,
        fragmentFromNodeChildren: T,
        createIterator: k,
        DomPosition: L
    },
    e.DOMException = A
}),
rangy.createModule("DomRange", function(e, t) {
    function s(e, t) {
        return e.nodeType != 3 && (n.isAncestorOf(e, t.startContainer, !0) || n.isAncestorOf(e, t.endContainer, !0))
    }
    function o(e) {
        return n.getDocument(e.startContainer)
    }
    function u(e, t, n) {
        var r = e._listeners[t];
        if (r)
            for (var i = 0, s = r.length; i < s; ++i)
                r[i].call(e, {
                    target: e,
                    args: n
                })
    }
    function a(e) {
        return new r(e.parentNode,n.getNodeIndex(e))
    }
    function f(e) {
        return new r(e.parentNode,n.getNodeIndex(e) + 1)
    }
    function l(e, t, r) {
        var i = e.nodeType == 11 ? e.firstChild : e;
        return n.isCharacterDataNode(t) ? r == t.length ? n.insertAfter(e, t) : t.parentNode.insertBefore(e, r == 0 ? t : n.splitDataNode(t, r)) : r >= t.childNodes.length ? t.appendChild(e) : t.insertBefore(e, t.childNodes[r]),
        i
    }
    function c(e) {
        var t;
        for (var n, r = o(e.range).createDocumentFragment(), s; n = e.next(); ) {
            t = e.isPartiallySelectedSubtree(),
            n = n.cloneNode(!t),
            t && (s = e.getSubtreeIterator(),
            n.appendChild(c(s)),
            s.detach(!0));
            if (n.nodeType == 10)
                throw new i("HIERARCHY_REQUEST_ERR");
            r.appendChild(n)
        }
        return r
    }
    function h(e, t, r) {
        var i, s;
        r = r || {
            stop: !1
        };
        for (var o, u; o = e.next(); )
            if (e.isPartiallySelectedSubtree()) {
                if (t(o) === !1) {
                    r.stop = !0;
                    return
                }
                u = e.getSubtreeIterator(),
                h(u, t, r),
                u.detach(!0);
                if (r.stop)
                    return
            } else {
                i = n.createIterator(o);
                while (s = i.next())
                    if (t(s) === !1) {
                        r.stop = !0;
                        return
                    }
            }
    }
    function p(e) {
        var t;
        while (e.next())
            e.isPartiallySelectedSubtree() ? (t = e.getSubtreeIterator(),
            p(t),
            t.detach(!0)) : e.remove()
    }
    function d(e) {
        for (var t, n = o(e.range).createDocumentFragment(), r; t = e.next(); ) {
            e.isPartiallySelectedSubtree() ? (t = t.cloneNode(!1),
            r = e.getSubtreeIterator(),
            t.appendChild(d(r)),
            r.detach(!0)) : e.remove();
            if (t.nodeType == 10)
                throw new i("HIERARCHY_REQUEST_ERR");
            n.appendChild(t)
        }
        return n
    }
    function v(e, t, n) {
        var r = !!t && !!t.length, i, s = !!n;
        r && (i = new RegExp("^(" + t.join("|") + ")$"));
        var o = [];
        return h(new g(e,!1), function(e) {
            (!r || i.test(e.nodeType)) && (!s || n(e)) && o.push(e)
        }),
        o
    }
    function m(e) {
        var t = typeof e.getName == "undefined" ? "Range" : e.getName();
        return "[" + t + "(" + n.inspectNode(e.startContainer) + ":" + e.startOffset + ", " + n.inspectNode(e.endContainer) + ":" + e.endOffset + ")]"
    }
    function g(e, t) {
        this.range = e,
        this.clonePartiallySelectedTextNodes = t;
        if (!e.collapsed) {
            this.sc = e.startContainer,
            this.so = e.startOffset,
            this.ec = e.endContainer,
            this.eo = e.endOffset;
            var r = e.commonAncestorContainer;
            this.sc === this.ec && n.isCharacterDataNode(this.sc) ? (this.isSingleCharacterDataNode = !0,
            this._first = this._last = this._next = this.sc) : (this._first = this._next = this.sc === r && !n.isCharacterDataNode(this.sc) ? this.sc.childNodes[this.so] : n.getClosestAncestorIn(this.sc, r, !0),
            this._last = this.ec === r && !n.isCharacterDataNode(this.ec) ? this.ec.childNodes[this.eo - 1] : n.getClosestAncestorIn(this.ec, r, !0))
        }
    }
    function y(e) {
        this.code = this[e],
        this.codeName = e,
        this.message = "RangeException: " + this.codeName
    }
    function b(e, t, n) {
        this.nodes = v(e, t, n),
        this._next = this.nodes[0],
        this._position = 0
    }
    function N(e) {
        return function(t, r) {
            var i, s = r ? t : t.parentNode;
            while (s) {
                i = s.nodeType;
                if (n.arrayContains(e, i))
                    return s;
                s = s.parentNode
            }
            return null
        }
    }
    function O(e, t) {
        if (A(e, t))
            throw new y("INVALID_NODE_TYPE_ERR")
    }
    function M(e) {
        if (!e.startContainer)
            throw new i("INVALID_STATE_ERR")
    }
    function _(e, t) {
        if (!n.arrayContains(t, e.nodeType))
            throw new y("INVALID_NODE_TYPE_ERR")
    }
    function D(e, t) {
        if (t < 0 || t > (n.isCharacterDataNode(e) ? e.length : e.childNodes.length))
            throw new i("INDEX_SIZE_ERR")
    }
    function P(e, t) {
        if (k(e, !0) !== k(t, !0))
            throw new i("WRONG_DOCUMENT_ERR")
    }
    function H(e) {
        if (L(e, !0))
            throw new i("NO_MODIFICATION_ALLOWED_ERR")
    }
    function B(e, t) {
        if (!e)
            throw new i(t)
    }
    function j(e) {
        return !n.arrayContains(E, e.nodeType) && !k(e, !0)
    }
    function F(e, t) {
        return t <= (n.isCharacterDataNode(e) ? e.length : e.childNodes.length)
    }
    function I(e) {
        M(e);
        if (j(e.startContainer) || j(e.endContainer) || !F(e.startContainer, e.startOffset) || !F(e.endContainer, e.endOffset))
            throw new Error("Range error: Range is no longer valid after DOM mutation (" + e.inspect() + ")")
    }
    function Z() {}
    function et(e) {
        e.START_TO_START = X,
        e.START_TO_END = V,
        e.END_TO_END = $,
        e.END_TO_START = J,
        e.NODE_BEFORE = K,
        e.NODE_AFTER = Q,
        e.NODE_BEFORE_AND_AFTER = G,
        e.NODE_INSIDE = Y
    }
    function tt(e) {
        et(e),
        et(e.prototype)
    }
    function nt(e, t) {
        return function() {
            I(this);
            var r = this.startContainer, i = this.startOffset, s = this.commonAncestorContainer, o = new g(this,!0), u, a;
            r !== s && (u = n.getClosestAncestorIn(r, s, !0),
            a = f(u),
            r = a.node,
            i = a.offset),
            h(o, H),
            o.reset();
            var l = e(o);
            return o.detach(),
            t(this, r, i, r, i),
            l
        }
    }
    function rt(t, r, i) {
        function o(e, t) {
            return function(n) {
                M(this),
                _(n, w),
                _(C(n), E);
                var r = (e ? a : f)(n);
                (t ? u : l)(this, r.node, r.offset)
            }
        }
        function u(e, t, i) {
            var s = e.endContainer
              , o = e.endOffset;
            if (t !== e.startContainer || i !== e.startOffset) {
                if (C(t) != C(s) || n.comparePoints(t, i, s, o) == 1)
                    s = t,
                    o = i;
                r(e, t, i, s, o)
            }
        }
        function l(e, t, i) {
            var s = e.startContainer
              , o = e.startOffset;
            if (t !== e.endContainer || i !== e.endOffset) {
                if (C(t) != C(s) || n.comparePoints(t, i, s, o) == -1)
                    s = t,
                    o = i;
                r(e, s, o, t, i)
            }
        }
        function c(e, t, n) {
            (t !== e.startContainer || n !== e.startOffset || t !== e.endContainer || n !== e.endOffset) && r(e, t, n, t, n)
        }
        t.prototype = new Z,
        e.util.extend(t.prototype, {
            setStart: function(e, t) {
                M(this),
                O(e, !0),
                D(e, t),
                u(this, e, t)
            },
            setEnd: function(e, t) {
                M(this),
                O(e, !0),
                D(e, t),
                l(this, e, t)
            },
            setStartBefore: o(!0, !0),
            setStartAfter: o(!1, !0),
            setEndBefore: o(!0, !1),
            setEndAfter: o(!1, !1),
            collapse: function(e) {
                I(this),
                e ? r(this, this.startContainer, this.startOffset, this.startContainer, this.startOffset) : r(this, this.endContainer, this.endOffset, this.endContainer, this.endOffset)
            },
            selectNodeContents: function(e) {
                M(this),
                O(e, !0),
                r(this, e, 0, e, n.getNodeLength(e))
            },
            selectNode: function(e) {
                M(this),
                O(e, !1),
                _(e, w);
                var t = a(e)
                  , n = f(e);
                r(this, t.node, t.offset, n.node, n.offset)
            },
            extractContents: nt(d, r),
            deleteContents: nt(p, r),
            canSurroundContents: function() {
                I(this),
                H(this.startContainer),
                H(this.endContainer);
                var e = new g(this,!0)
                  , t = e._first && s(e._first, this) || e._last && s(e._last, this);
                return e.detach(),
                !t
            },
            detach: function() {
                i(this)
            },
            splitBoundaries: function() {
                I(this);
                var e = this.startContainer
                  , t = this.startOffset
                  , i = this.endContainer
                  , s = this.endOffset
                  , o = e === i;
                n.isCharacterDataNode(i) && s > 0 && s < i.length && n.splitDataNode(i, s),
                n.isCharacterDataNode(e) && t > 0 && t < e.length && (e = n.splitDataNode(e, t),
                o ? (s -= t,
                i = e) : i == e.parentNode && s >= n.getNodeIndex(e) && s++,
                t = 0),
                r(this, e, t, i, s)
            },
            normalizeBoundaries: function() {
                I(this);
                var e = this.startContainer
                  , t = this.startOffset
                  , i = this.endContainer
                  , s = this.endOffset
                  , o = function(e) {
                    var t = e.nextSibling;
                    t && t.nodeType == e.nodeType && (i = e,
                    s = e.length,
                    e.appendData(t.data),
                    t.parentNode.removeChild(t))
                }
                  , u = function(r) {
                    var o = r.previousSibling;
                    if (o && o.nodeType == r.nodeType) {
                        e = r;
                        var u = r.length;
                        t = o.length,
                        r.insertData(0, o.data),
                        o.parentNode.removeChild(o);
                        if (e == i)
                            s += t,
                            i = e;
                        else if (i == r.parentNode) {
                            var a = n.getNodeIndex(r);
                            s == a ? (i = r,
                            s = u) : s > a && s--
                        }
                    }
                }
                  , a = !0;
                if (n.isCharacterDataNode(i))
                    i.length == s && o(i);
                else {
                    if (s > 0) {
                        var f = i.childNodes[s - 1];
                        f && n.isCharacterDataNode(f) && o(f)
                    }
                    a = !this.collapsed
                }
                if (a) {
                    if (n.isCharacterDataNode(e))
                        t == 0 && u(e);
                    else if (t < e.childNodes.length) {
                        var l = e.childNodes[t];
                        l && n.isCharacterDataNode(l) && u(l)
                    }
                } else
                    e = i,
                    t = s;
                r(this, e, t, i, s)
            },
            collapseToPoint: function(e, t) {
                M(this),
                O(e, !0),
                D(e, t),
                c(this, e, t)
            }
        }),
        tt(t)
    }
    function it(e) {
        e.collapsed = e.startContainer === e.endContainer && e.startOffset === e.endOffset,
        e.commonAncestorContainer = e.collapsed ? e.startContainer : n.getCommonAncestor(e.startContainer, e.endContainer)
    }
    function st(e, t, n, r, i) {
        var s = e.startContainer !== t || e.startOffset !== n
          , o = e.endContainer !== r || e.endOffset !== i;
        e.startContainer = t,
        e.startOffset = n,
        e.endContainer = r,
        e.endOffset = i,
        it(e),
        u(e, "boundarychange", {
            startMoved: s,
            endMoved: o
        })
    }
    function ot(e) {
        M(e),
        e.startContainer = e.startOffset = e.endContainer = e.endOffset = null,
        e.collapsed = e.commonAncestorContainer = null,
        u(e, "detach", null),
        e._listeners = null
    }
    function ut(e) {
        this.startContainer = e,
        this.startOffset = 0,
        this.endContainer = e,
        this.endOffset = 0,
        this._listeners = {
            boundarychange: [],
            detach: []
        },
        it(this)
    }
    e.requireModules(["DomUtil"]);
    var n = e.dom
      , r = n.DomPosition
      , i = e.DOMException;
    g.prototype = {
        _current: null,
        _next: null,
        _first: null,
        _last: null,
        isSingleCharacterDataNode: !1,
        reset: function() {
            this._current = null,
            this._next = this._first
        },
        hasNext: function() {
            return !!this._next
        },
        next: function() {
            var e = this._current = this._next;
            return e && (this._next = e !== this._last ? e.nextSibling : null,
            n.isCharacterDataNode(e) && this.clonePartiallySelectedTextNodes && (e === this.ec && (e = e.cloneNode(!0)).deleteData(this.eo, e.length - this.eo),
            this._current === this.sc && (e = e.cloneNode(!0)).deleteData(0, this.so))),
            e
        },
        remove: function() {
            var e = this._current, t, r;
            !n.isCharacterDataNode(e) || e !== this.sc && e !== this.ec ? e.parentNode && e.parentNode.removeChild(e) : (t = e === this.sc ? this.so : 0,
            r = e === this.ec ? this.eo : e.length,
            t != r && e.deleteData(t, r - t))
        },
        isPartiallySelectedSubtree: function() {
            var e = this._current;
            return s(e, this.range)
        },
        getSubtreeIterator: function() {
            var e;
            if (this.isSingleCharacterDataNode)
                e = this.range.cloneRange(),
                e.collapse();
            else {
                e = new ut(o(this.range));
                var t = this._current
                  , r = t
                  , i = 0
                  , s = t
                  , u = n.getNodeLength(t);
                n.isAncestorOf(t, this.sc, !0) && (r = this.sc,
                i = this.so),
                n.isAncestorOf(t, this.ec, !0) && (s = this.ec,
                u = this.eo),
                st(e, r, i, s, u)
            }
            return new g(e,this.clonePartiallySelectedTextNodes)
        },
        detach: function(e) {
            e && this.range.detach(),
            this.range = this._current = this._next = this._first = this._last = this.sc = this.so = this.ec = this.eo = null
        }
    },
    y.prototype = {
        BAD_BOUNDARYPOINTS_ERR: 1,
        INVALID_NODE_TYPE_ERR: 2
    },
    y.prototype.toString = function() {
        return this.message
    }
    ,
    b.prototype = {
        _current: null,
        hasNext: function() {
            return !!this._next
        },
        next: function() {
            return this._current = this._next,
            this._next = this.nodes[++this._position],
            this._current
        },
        detach: function() {
            this._current = this._next = this.nodes = null
        }
    };
    var w = [1, 3, 4, 5, 7, 8, 10]
      , E = [2, 9, 11]
      , S = [5, 6, 10, 12]
      , x = [1, 3, 4, 5, 7, 8, 10, 11]
      , T = [1, 3, 4, 5, 7, 8]
      , C = n.getRootContainer
      , k = N([9, 11])
      , L = N(S)
      , A = N([6, 10, 12])
      , q = document.createElement("style")
      , R = !1;
    try {
        q.innerHTML = "<b>x</b>",
        R = q.firstChild.nodeType == 3
    } catch (U) {}
    e.features.htmlParsingConforms = R;
    var z = R ? function(e) {
        var t = this.startContainer
          , r = n.getDocument(t);
        if (!t)
            throw new i("INVALID_STATE_ERR");
        var s = null;
        return t.nodeType == 1 ? s = t : n.isCharacterDataNode(t) && (s = n.parentElement(t)),
        s === null || s.nodeName == "HTML" && n.isHtmlNamespace(n.getDocument(s).documentElement) && n.isHtmlNamespace(s) ? s = r.createElement("body") : s = s.cloneNode(!1),
        s.innerHTML = e,
        n.fragmentFromNodeChildren(s)
    }
    : function(e) {
        M(this);
        var t = o(this)
          , r = t.createElement("body");
        return r.innerHTML = e,
        n.fragmentFromNodeChildren(r)
    }
      , W = ["startContainer", "startOffset", "endContainer", "endOffset", "collapsed", "commonAncestorContainer"]
      , X = 0
      , V = 1
      , $ = 2
      , J = 3
      , K = 0
      , Q = 1
      , G = 2
      , Y = 3;
    Z.prototype = {
        attachListener: function(e, t) {
            this._listeners[e].push(t)
        },
        compareBoundaryPoints: function(e, t) {
            I(this),
            P(this.startContainer, t.startContainer);
            var r, i, s, o, u = e == J || e == X ? "start" : "end", a = e == V || e == X ? "start" : "end";
            return r = this[u + "Container"],
            i = this[u + "Offset"],
            s = t[a + "Container"],
            o = t[a + "Offset"],
            n.comparePoints(r, i, s, o)
        },
        insertNode: function(e) {
            I(this),
            _(e, x),
            H(this.startContainer);
            if (n.isAncestorOf(e, this.startContainer, !0))
                throw new i("HIERARCHY_REQUEST_ERR");
            var t = l(e, this.startContainer, this.startOffset);
            this.setStartBefore(t)
        },
        cloneContents: function() {
            I(this);
            var e, t;
            if (this.collapsed)
                return o(this).createDocumentFragment();
            if (this.startContainer === this.endContainer && n.isCharacterDataNode(this.startContainer))
                return e = this.startContainer.cloneNode(!0),
                e.data = e.data.slice(this.startOffset, this.endOffset),
                t = o(this).createDocumentFragment(),
                t.appendChild(e),
                t;
            var r = new g(this,!0);
            return e = c(r),
            r.detach(),
            e
        },
        canSurroundContents: function() {
            I(this),
            H(this.startContainer),
            H(this.endContainer);
            var e = new g(this,!0)
              , t = e._first && s(e._first, this) || e._last && s(e._last, this);
            return e.detach(),
            !t
        },
        surroundContents: function(e) {
            _(e, T);
            if (!this.canSurroundContents())
                throw new y("BAD_BOUNDARYPOINTS_ERR");
            var t = this.extractContents();
            if (e.hasChildNodes())
                while (e.lastChild)
                    e.removeChild(e.lastChild);
            l(e, this.startContainer, this.startOffset),
            e.appendChild(t),
            this.selectNode(e)
        },
        cloneRange: function() {
            I(this);
            var e = new ut(o(this)), t = W.length, n;
            while (t--)
                n = W[t],
                e[n] = this[n];
            return e
        },
        toString: function() {
            I(this);
            var e = this.startContainer;
            if (e === this.endContainer && n.isCharacterDataNode(e))
                return e.nodeType == 3 || e.nodeType == 4 ? e.data.slice(this.startOffset, this.endOffset) : "";
            var t = []
              , r = new g(this,!0);
            return h(r, function(e) {
                (e.nodeType == 3 || e.nodeType == 4) && t.push(e.data)
            }),
            r.detach(),
            t.join("")
        },
        compareNode: function(e) {
            I(this);
            var t = e.parentNode
              , r = n.getNodeIndex(e);
            if (!t)
                throw new i("NOT_FOUND_ERR");
            var s = this.comparePoint(t, r)
              , o = this.comparePoint(t, r + 1);
            return s < 0 ? o > 0 ? G : K : o > 0 ? Q : Y
        },
        comparePoint: function(e, t) {
            return I(this),
            B(e, "HIERARCHY_REQUEST_ERR"),
            P(e, this.startContainer),
            n.comparePoints(e, t, this.startContainer, this.startOffset) < 0 ? -1 : n.comparePoints(e, t, this.endContainer, this.endOffset) > 0 ? 1 : 0
        },
        createContextualFragment: z,
        toHtml: function() {
            I(this);
            var e = o(this).createElement("div");
            return e.appendChild(this.cloneContents()),
            e.innerHTML
        },
        intersectsNode: function(e, t) {
            I(this),
            B(e, "NOT_FOUND_ERR");
            if (n.getDocument(e) !== o(this))
                return !1;
            var r = e.parentNode
              , i = n.getNodeIndex(e);
            B(r, "NOT_FOUND_ERR");
            var s = n.comparePoints(r, i, this.endContainer, this.endOffset)
              , u = n.comparePoints(r, i + 1, this.startContainer, this.startOffset);
            return t ? s <= 0 && u >= 0 : s < 0 && u > 0
        },
        isPointInRange: function(e, t) {
            return I(this),
            B(e, "HIERARCHY_REQUEST_ERR"),
            P(e, this.startContainer),
            n.comparePoints(e, t, this.startContainer, this.startOffset) >= 0 && n.comparePoints(e, t, this.endContainer, this.endOffset) <= 0
        },
        intersectsRange: function(e, t) {
            I(this);
            if (o(e) != o(this))
                throw new i("WRONG_DOCUMENT_ERR");
            var r = n.comparePoints(this.startContainer, this.startOffset, e.endContainer, e.endOffset)
              , s = n.comparePoints(this.endContainer, this.endOffset, e.startContainer, e.startOffset);
            return t ? r <= 0 && s >= 0 : r < 0 && s > 0
        },
        intersection: function(e) {
            if (this.intersectsRange(e)) {
                var t = n.comparePoints(this.startContainer, this.startOffset, e.startContainer, e.startOffset)
                  , r = n.comparePoints(this.endContainer, this.endOffset, e.endContainer, e.endOffset)
                  , i = this.cloneRange();
                return t == -1 && i.setStart(e.startContainer, e.startOffset),
                r == 1 && i.setEnd(e.endContainer, e.endOffset),
                i
            }
            return null
        },
        union: function(e) {
            if (this.intersectsRange(e, !0)) {
                var t = this.cloneRange();
                return n.comparePoints(e.startContainer, e.startOffset, this.startContainer, this.startOffset) == -1 && t.setStart(e.startContainer, e.startOffset),
                n.comparePoints(e.endContainer, e.endOffset, this.endContainer, this.endOffset) == 1 && t.setEnd(e.endContainer, e.endOffset),
                t
            }
            throw new y("Ranges do not intersect")
        },
        containsNode: function(e, t) {
            return t ? this.intersectsNode(e, !1) : this.compareNode(e) == Y
        },
        containsNodeContents: function(e) {
            return this.comparePoint(e, 0) >= 0 && this.comparePoint(e, n.getNodeLength(e)) <= 0
        },
        containsRange: function(e) {
            return this.intersection(e).equals(e)
        },
        containsNodeText: function(e) {
            var t = this.cloneRange();
            t.selectNode(e);
            var n = t.getNodes([3]);
            if (n.length > 0) {
                t.setStart(n[0], 0);
                var r = n.pop();
                t.setEnd(r, r.length);
                var i = this.containsRange(t);
                return t.detach(),
                i
            }
            return this.containsNodeContents(e)
        },
        createNodeIterator: function(e, t) {
            return I(this),
            new b(this,e,t)
        },
        getNodes: function(e, t) {
            return I(this),
            v(this, e, t)
        },
        getDocument: function() {
            return o(this)
        },
        collapseBefore: function(e) {
            M(this),
            this.setEndBefore(e),
            this.collapse(!1)
        },
        collapseAfter: function(e) {
            M(this),
            this.setStartAfter(e),
            this.collapse(!0)
        },
        getName: function() {
            return "DomRange"
        },
        equals: function(e) {
            return ut.rangesEqual(this, e)
        },
        inspect: function() {
            return m(this)
        }
    },
    rt(ut, st, ot),
    e.rangePrototype = Z.prototype,
    ut.rangeProperties = W,
    ut.RangeIterator = g,
    ut.copyComparisonConstants = tt,
    ut.createPrototypeRange = rt,
    ut.inspect = m,
    ut.getRangeDocument = o,
    ut.rangesEqual = function(e, t) {
        return e.startContainer === t.startContainer && e.startOffset === t.startOffset && e.endContainer === t.endContainer && e.endOffset === t.endOffset
    }
    ,
    e.DomRange = ut,
    e.RangeException = y
}),
rangy.createModule("WrappedRange", function(e, t) {
    function o(e) {
        var t = e.parentElement()
          , n = e.duplicate();
        n.collapse(!0);
        var i = n.parentElement();
        n = e.duplicate(),
        n.collapse(!1);
        var s = n.parentElement()
          , o = i == s ? i : r.getCommonAncestor(i, s);
        return o == t ? o : r.getCommonAncestor(t, o)
    }
    function u(e) {
        return e.compareEndPoints("StartToEnd", e) == 0
    }
    function a(e, t, n, s) {
        var o = e.duplicate();
        o.collapse(n);
        var u = o.parentElement();
        r.isAncestorOf(t, u, !0) || (u = t);
        if (!u.canHaveHTML)
            return new i(u.parentNode,r.getNodeIndex(u));
        var a = r.getDocument(u).createElement("span"), f, l = n ? "StartToStart" : "StartToEnd", c, h, p, d;
        do
            u.insertBefore(a, a.previousSibling),
            o.moveToElementText(a);
        while ((f = o.compareEndPoints(l, e)) > 0 && a.previousSibling);d = a.nextSibling;
        if (f == -1 && d && r.isCharacterDataNode(d)) {
            o.setEndPoint(n ? "EndToStart" : "EndToEnd", e);
            var v;
            if (/[\r\n]/.test(d.data)) {
                var m = o.duplicate()
                  , g = m.text.replace(/\r\n/g, "\r").length;
                v = m.moveStart("character", g);
                while ((f = m.compareEndPoints("StartToEnd", m)) == -1)
                    v++,
                    m.moveStart("character", 1)
            } else
                v = o.text.length;
            p = new i(d,v)
        } else
            c = (s || !n) && a.previousSibling,
            h = (s || n) && a.nextSibling,
            h && r.isCharacterDataNode(h) ? p = new i(h,0) : c && r.isCharacterDataNode(c) ? p = new i(c,c.length) : p = new i(u,r.getNodeIndex(a));
        return a.parentNode.removeChild(a),
        p
    }
    function f(e, t) {
        var n, i, s = e.offset, o = r.getDocument(e.node), u, a, f = o.body.createTextRange(), l = r.isCharacterDataNode(e.node);
        return l ? (n = e.node,
        i = n.parentNode) : (a = e.node.childNodes,
        n = s < a.length ? a[s] : null,
        i = e.node),
        u = o.createElement("span"),
        u.innerHTML = "&#feff;",
        n ? i.insertBefore(u, n) : i.appendChild(u),
        f.moveToElementText(u),
        f.collapse(!t),
        i.removeChild(u),
        l && f[t ? "moveStart" : "moveEnd"]("character", s),
        f
    }
    e.requireModules(["DomUtil", "DomRange"]);
    var n, r = e.dom, i = r.DomPosition, s = e.DomRange;
    if (e.features.implementsDomRange && (!e.features.implementsTextRange || !e.config.preferTextRange))
        (function() {
            function u(e) {
                var t = i.length, n;
                while (t--)
                    n = i[t],
                    e[n] = e.nativeRange[n]
            }
            function a(e, t, n, r, i) {
                var s = e.startContainer !== t || e.startOffset != n
                  , o = e.endContainer !== r || e.endOffset != i;
                if (s || o)
                    e.setEnd(r, i),
                    e.setStart(t, n)
            }
            function f(e) {
                e.nativeRange.detach(),
                e.detached = !0;
                var t = i.length, n;
                while (t--)
                    n = i[t],
                    e[n] = null
            }
            var t, i = s.rangeProperties, o, l;
            n = function(e) {
                if (!e)
                    throw new Error("Range must be specified");
                this.nativeRange = e,
                u(this)
            }
            ,
            s.createPrototypeRange(n, a, f),
            t = n.prototype,
            t.selectNode = function(e) {
                this.nativeRange.selectNode(e),
                u(this)
            }
            ,
            t.deleteContents = function() {
                this.nativeRange.deleteContents(),
                u(this)
            }
            ,
            t.extractContents = function() {
                var e = this.nativeRange.extractContents();
                return u(this),
                e
            }
            ,
            t.cloneContents = function() {
                return this.nativeRange.cloneContents()
            }
            ,
            t.surroundContents = function(e) {
                this.nativeRange.surroundContents(e),
                u(this)
            }
            ,
            t.collapse = function(e) {
                this.nativeRange.collapse(e),
                u(this)
            }
            ,
            t.cloneRange = function() {
                return new n(this.nativeRange.cloneRange())
            }
            ,
            t.refresh = function() {
                u(this)
            }
            ,
            t.toString = function() {
                return this.nativeRange.toString()
            }
            ;
            var c = document.createTextNode("test");
            r.getBody(document).appendChild(c);
            var h = document.createRange();
            h.setStart(c, 0),
            h.setEnd(c, 0);
            try {
                h.setStart(c, 1),
                o = !0,
                t.setStart = function(e, t) {
                    this.nativeRange.setStart(e, t),
                    u(this)
                }
                ,
                t.setEnd = function(e, t) {
                    this.nativeRange.setEnd(e, t),
                    u(this)
                }
                ,
                l = function(e) {
                    return function(t) {
                        this.nativeRange[e](t),
                        u(this)
                    }
                }
            } catch (p) {
                o = !1,
                t.setStart = function(e, t) {
                    try {
                        this.nativeRange.setStart(e, t)
                    } catch (n) {
                        this.nativeRange.setEnd(e, t),
                        this.nativeRange.setStart(e, t)
                    }
                    u(this)
                }
                ,
                t.setEnd = function(e, t) {
                    try {
                        this.nativeRange.setEnd(e, t)
                    } catch (n) {
                        this.nativeRange.setStart(e, t),
                        this.nativeRange.setEnd(e, t)
                    }
                    u(this)
                }
                ,
                l = function(e, t) {
                    return function(n) {
                        try {
                            this.nativeRange[e](n)
                        } catch (r) {
                            this.nativeRange[t](n),
                            this.nativeRange[e](n)
                        }
                        u(this)
                    }
                }
            }
            t.setStartBefore = l("setStartBefore", "setEndBefore"),
            t.setStartAfter = l("setStartAfter", "setEndAfter"),
            t.setEndBefore = l("setEndBefore", "setStartBefore"),
            t.setEndAfter = l("setEndAfter", "setStartAfter"),
            h.selectNodeContents(c),
            h.startContainer == c && h.endContainer == c && h.startOffset == 0 && h.endOffset == c.length ? t.selectNodeContents = function(e) {
                this.nativeRange.selectNodeContents(e),
                u(this)
            }
            : t.selectNodeContents = function(e) {
                this.setStart(e, 0),
                this.setEnd(e, s.getEndOffset(e))
            }
            ,
            h.selectNodeContents(c),
            h.setEnd(c, 3);
            var d = document.createRange();
            d.selectNodeContents(c),
            d.setEnd(c, 4),
            d.setStart(c, 2),
            h.compareBoundaryPoints(h.START_TO_END, d) == -1 & h.compareBoundaryPoints(h.END_TO_START, d) == 1 ? t.compareBoundaryPoints = function(e, t) {
                return t = t.nativeRange || t,
                e == t.START_TO_END ? e = t.END_TO_START : e == t.END_TO_START && (e = t.START_TO_END),
                this.nativeRange.compareBoundaryPoints(e, t)
            }
            : t.compareBoundaryPoints = function(e, t) {
                return this.nativeRange.compareBoundaryPoints(e, t.nativeRange || t)
            }
            ,
            e.util.isHostMethod(h, "createContextualFragment") && (t.createContextualFragment = function(e) {
                return this.nativeRange.createContextualFragment(e)
            }
            ),
            r.getBody(document).removeChild(c),
            h.detach(),
            d.detach()
        })(),
        e.createNativeRange = function(e) {
            return e = e || document,
            e.createRange()
        }
        ;
    else if (e.features.implementsTextRange) {
        n = function(e) {
            this.textRange = e,
            this.refresh()
        }
        ,
        n.prototype = new s(document),
        n.prototype.refresh = function() {
            var e, t, n = o(this.textRange);
            u(this.textRange) ? t = e = a(this.textRange, n, !0, !0) : (e = a(this.textRange, n, !0, !1),
            t = a(this.textRange, n, !1, !1)),
            this.setStart(e.node, e.offset),
            this.setEnd(t.node, t.offset)
        }
        ,
        s.copyComparisonConstants(n);
        var l = function() {
            return this
        }();
        typeof l.Range == "undefined" && (l.Range = n),
        e.createNativeRange = function(e) {
            return e = e || document,
            e.body.createTextRange()
        }
    }
    e.features.implementsTextRange && (n.rangeToTextRange = function(e) {
        if (e.collapsed) {
            var t = f(new i(e.startContainer,e.startOffset), !0);
            return t
        }
        var n = f(new i(e.startContainer,e.startOffset), !0)
          , s = f(new i(e.endContainer,e.endOffset), !1)
          , o = r.getDocument(e.startContainer).body.createTextRange();
        return o.setEndPoint("StartToStart", n),
        o.setEndPoint("EndToEnd", s),
        o
    }
    ),
    n.prototype.getName = function() {
        return "WrappedRange"
    }
    ,
    e.WrappedRange = n,
    e.createRange = function(t) {
        return t = t || document,
        new n(e.createNativeRange(t))
    }
    ,
    e.createRangyRange = function(e) {
        return e = e || document,
        new s(e)
    }
    ,
    e.createIframeRange = function(t) {
        return e.createRange(r.getIframeDocument(t))
    }
    ,
    e.createIframeRangyRange = function(t) {
        return e.createRangyRange(r.getIframeDocument(t))
    }
    ,
    e.addCreateMissingNativeApiListener(function(t) {
        var n = t.document;
        typeof n.createRange == "undefined" && (n.createRange = function() {
            return e.createRange(this)
        }
        ),
        n = t = null
    })
}),
rangy.createModule("WrappedSelection", function(e, t) {
    function p(e) {
        return (e || window).getSelection()
    }
    function d(e) {
        return (e || window).document.selection
    }
    function L(e, t, n) {
        var r = n ? "end" : "start"
          , i = n ? "start" : "end";
        e.anchorNode = t[r + "Container"],
        e.anchorOffset = t[r + "Offset"],
        e.focusNode = t[i + "Container"],
        e.focusOffset = t[i + "Offset"]
    }
    function A(e) {
        var t = e.nativeSelection;
        e.anchorNode = t.anchorNode,
        e.anchorOffset = t.anchorOffset,
        e.focusNode = t.focusNode,
        e.focusOffset = t.focusOffset
    }
    function O(e) {
        e.anchorNode = e.focusNode = null,
        e.anchorOffset = e.focusOffset = 0,
        e.rangeCount = 0,
        e.isCollapsed = !0,
        e._ranges.length = 0
    }
    function M(t) {
        var n;
        return t instanceof o ? (n = t._selectionNativeRange,
        n || (n = e.createNativeRange(i.getDocument(t.startContainer)),
        n.setEnd(t.endContainer, t.endOffset),
        n.setStart(t.startContainer, t.startOffset),
        t._selectionNativeRange = n,
        t.attachListener("detach", function() {
            this._selectionNativeRange = null
        }))) : t instanceof u ? n = t.nativeRange : e.features.implementsDomRange && t instanceof i.getWindow(t.startContainer).Range && (n = t),
        n
    }
    function _(e) {
        if (!e.length || e[0].nodeType != 1)
            return !1;
        for (var t = 1, n = e.length; t < n; ++t)
            if (!i.isAncestorOf(e[0], e[t]))
                return !1;
        return !0
    }
    function D(e) {
        var t = e.getNodes();
        if (!_(t))
            throw new Error("getSingleElementFromRange: range " + e.inspect() + " did not consist of a single element");
        return t[0]
    }
    function P(e) {
        return !!e && typeof e.text != "undefined"
    }
    function H(e, t) {
        var n = new u(t);
        e._ranges = [n],
        L(e, n, !1),
        e.rangeCount = 1,
        e.isCollapsed = n.collapsed
    }
    function B(t) {
        t._ranges.length = 0;
        if (t.docSelection.type == "None")
            O(t);
        else {
            var n = t.docSelection.createRange();
            if (P(n))
                H(t, n);
            else {
                t.rangeCount = n.length;
                var r, s = i.getDocument(n.item(0));
                for (var o = 0; o < t.rangeCount; ++o)
                    r = e.createRange(s),
                    r.selectNode(n.item(o)),
                    t._ranges.push(r);
                t.isCollapsed = t.rangeCount == 1 && t._ranges[0].collapsed,
                L(t, t._ranges[t.rangeCount - 1], !1)
            }
        }
    }
    function j(e, t) {
        var n = e.docSelection.createRange()
          , r = D(t)
          , s = i.getDocument(n.item(0))
          , o = i.getBody(s).createControlRange();
        for (var u = 0, a = n.length; u < a; ++u)
            o.add(n.item(u));
        try {
            o.add(r)
        } catch (f) {
            throw new Error("addRange(): Element within the specified Range could not be added to control selection (does it have layout?)")
        }
        o.select(),
        B(e)
    }
    function I(e, t, n) {
        this.nativeSelection = e,
        this.docSelection = t,
        this._ranges = [],
        this.win = n,
        this.refresh()
    }
    function R(e, t) {
        var n = i.getDocument(t[0].startContainer)
          , r = i.getBody(n).createControlRange();
        for (var s = 0, o; s < rangeCount; ++s) {
            o = D(t[s]);
            try {
                r.add(o)
            } catch (u) {
                throw new Error("setRanges(): Element within the one of the specified Ranges could not be added to control selection (does it have layout?)")
            }
        }
        r.select(),
        B(e)
    }
    function V(e, t) {
        if (e.anchorNode && i.getDocument(e.anchorNode) !== i.getDocument(t))
            throw new a("WRONG_DOCUMENT_ERR")
    }
    function $(e) {
        var t = []
          , n = new f(e.anchorNode,e.anchorOffset)
          , r = new f(e.focusNode,e.focusOffset)
          , i = typeof e.getName == "function" ? e.getName() : "Selection";
        if (typeof e.rangeCount != "undefined")
            for (var s = 0, u = e.rangeCount; s < u; ++s)
                t[s] = o.inspect(e.getRangeAt(s));
        return "[" + i + "(Ranges: " + t.join(", ") + ")(anchor: " + n.inspect() + ", focus: " + r.inspect() + "]"
    }
    e.requireModules(["DomUtil", "DomRange", "WrappedRange"]),
    e.config.checkSelectionRanges = !0;
    var n = "boolean", r = "_rangySelection", i = e.dom, s = e.util, o = e.DomRange, u = e.WrappedRange, a = e.DOMException, f = i.DomPosition, l, c, h = "Control", v = e.util.isHostMethod(window, "getSelection"), m = e.util.isHostObject(document, "selection"), g = m && (!v || e.config.preferTextRange);
    g ? (l = d,
    e.isSelectionValid = function(e) {
        var t = (e || window).document
          , n = t.selection;
        return n.type != "None" || i.getDocument(n.createRange().parentElement()) == t
    }
    ) : v ? (l = p,
    e.isSelectionValid = function() {
        return !0
    }
    ) : t.fail("Neither document.selection or window.getSelection() detected."),
    e.getNativeSelection = l;
    var y = l()
      , b = e.createNativeRange(document)
      , w = i.getBody(document)
      , E = s.areHostObjects(y, ["anchorNode", "focusNode"] && s.areHostProperties(y, ["anchorOffset", "focusOffset"]));
    e.features.selectionHasAnchorAndFocus = E;
    var S = s.isHostMethod(y, "extend");
    e.features.selectionHasExtend = S;
    var x = typeof y.rangeCount == "number";
    e.features.selectionHasRangeCount = x;
    var T = !1
      , N = !0;
    s.areHostMethods(y, ["addRange", "getRangeAt", "removeAllRanges"]) && typeof y.rangeCount == "number" && e.features.implementsDomRange && function() {
        var e = document.createElement("iframe");
        w.appendChild(e);
        var t = i.getIframeDocument(e);
        t.open(),
        t.write("<html><head></head><body>12</body></html>"),
        t.close();
        var n = i.getIframeWindow(e).getSelection()
          , r = t.documentElement
          , s = r.lastChild
          , o = s.firstChild
          , u = t.createRange();
        u.setStart(o, 1),
        u.collapse(!0),
        n.addRange(u),
        N = n.rangeCount == 1,
        n.removeAllRanges();
        var a = u.cloneRange();
        u.setStart(o, 0),
        a.setEnd(o, 2),
        n.addRange(u),
        n.addRange(a),
        T = n.rangeCount == 2,
        u.detach(),
        a.detach(),
        w.removeChild(e)
    }(),
    e.features.selectionSupportsMultipleRanges = T,
    e.features.collapsedNonEditableSelectionsSupported = N;
    var C = !1, k;
    w && s.isHostMethod(w, "createControlRange") && (k = w.createControlRange(),
    s.areHostProperties(k, ["item", "add"]) && (C = !0)),
    e.features.implementsControlRange = C,
    E ? c = function(e) {
        return e.anchorNode === e.focusNode && e.anchorOffset === e.focusOffset
    }
    : c = function(e) {
        return e.rangeCount ? e.getRangeAt(e.rangeCount - 1).collapsed : !1
    }
    ;
    var F;
    s.isHostMethod(y, "getRangeAt") ? F = function(e, t) {
        try {
            return e.getRangeAt(t)
        } catch (n) {
            return null
        }
    }
    : E && (F = function(t) {
        var n = i.getDocument(t.anchorNode)
          , r = e.createRange(n);
        return r.setStart(t.anchorNode, t.anchorOffset),
        r.setEnd(t.focusNode, t.focusOffset),
        r.collapsed !== this.isCollapsed && (r.setStart(t.focusNode, t.focusOffset),
        r.setEnd(t.anchorNode, t.anchorOffset)),
        r
    }
    ),
    e.getSelection = function(e) {
        e = e || window;
        var t = e[r]
          , n = l(e)
          , i = m ? d(e) : null;
        return t ? (t.nativeSelection = n,
        t.docSelection = i,
        t.refresh(e)) : (t = new I(n,i,e),
        e[r] = t),
        t
    }
    ,
    e.getIframeSelection = function(t) {
        return e.getSelection(i.getIframeWindow(t))
    }
    ;
    var q = I.prototype;
    if (!g && E && s.areHostMethods(y, ["removeAllRanges", "addRange"])) {
        q.removeAllRanges = function() {
            this.nativeSelection.removeAllRanges(),
            O(this)
        }
        ;
        var U = function(t, n) {
            var r = o.getRangeDocument(n)
              , i = e.createRange(r);
            i.collapseToPoint(n.endContainer, n.endOffset),
            t.nativeSelection.addRange(M(i)),
            t.nativeSelection.extend(n.startContainer, n.startOffset),
            t.refresh()
        };
        x ? q.addRange = function(t, n) {
            if (C && m && this.docSelection.type == h)
                j(this, t);
            else if (n && S)
                U(this, t);
            else {
                var r;
                T ? r = this.rangeCount : (this.removeAllRanges(),
                r = 0),
                this.nativeSelection.addRange(M(t)),
                this.rangeCount = this.nativeSelection.rangeCount;
                if (this.rangeCount == r + 1) {
                    if (e.config.checkSelectionRanges) {
                        var i = F(this.nativeSelection, this.rangeCount - 1);
                        i && !o.rangesEqual(i, t) && (t = new u(i))
                    }
                    this._ranges[this.rangeCount - 1] = t,
                    L(this, t, X(this.nativeSelection)),
                    this.isCollapsed = c(this)
                } else
                    this.refresh()
            }
        }
        : q.addRange = function(e, t) {
            t && S ? U(this, e) : (this.nativeSelection.addRange(M(e)),
            this.refresh())
        }
        ,
        q.setRanges = function(e) {
            if (C && e.length > 1)
                R(this, e);
            else {
                this.removeAllRanges();
                for (var t = 0, n = e.length; t < n; ++t)
                    this.addRange(e[t])
            }
        }
    } else {
        if (!(s.isHostMethod(y, "empty") && s.isHostMethod(b, "select") && C && g))
            return t.fail("No means of selecting a Range or TextRange was found"),
            !1;
        q.removeAllRanges = function() {
            try {
                this.docSelection.empty();
                if (this.docSelection.type != "None") {
                    var e;
                    if (this.anchorNode)
                        e = i.getDocument(this.anchorNode);
                    else if (this.docSelection.type == h) {
                        var t = this.docSelection.createRange();
                        t.length && (e = i.getDocument(t.item(0)).body.createTextRange())
                    }
                    if (e) {
                        var n = e.body.createTextRange();
                        n.select(),
                        this.docSelection.empty()
                    }
                }
            } catch (r) {}
            O(this)
        }
        ,
        q.addRange = function(e) {
            this.docSelection.type == h ? j(this, e) : (u.rangeToTextRange(e).select(),
            this._ranges[0] = e,
            this.rangeCount = 1,
            this.isCollapsed = this._ranges[0].collapsed,
            L(this, e, !1))
        }
        ,
        q.setRanges = function(e) {
            this.removeAllRanges();
            var t = e.length;
            t > 1 ? R(this, e) : t && this.addRange(e[0])
        }
    }
    q.getRangeAt = function(e) {
        if (e < 0 || e >= this.rangeCount)
            throw new a("INDEX_SIZE_ERR");
        return this._ranges[e]
    }
    ;
    var z;
    if (g)
        z = function(t) {
            var n;
            e.isSelectionValid(t.win) ? n = t.docSelection.createRange() : (n = i.getBody(t.win.document).createTextRange(),
            n.collapse(!0)),
            t.docSelection.type == h ? B(t) : P(n) ? H(t, n) : O(t)
        }
        ;
    else if (s.isHostMethod(y, "getRangeAt") && typeof y.rangeCount == "number")
        z = function(t) {
            if (C && m && t.docSelection.type == h)
                B(t);
            else {
                t._ranges.length = t.rangeCount = t.nativeSelection.rangeCount;
                if (t.rangeCount) {
                    for (var n = 0, r = t.rangeCount; n < r; ++n)
                        t._ranges[n] = new e.WrappedRange(t.nativeSelection.getRangeAt(n));
                    L(t, t._ranges[t.rangeCount - 1], X(t.nativeSelection)),
                    t.isCollapsed = c(t)
                } else
                    O(t)
            }
        }
        ;
    else {
        if (!E || typeof y.isCollapsed != n || typeof b.collapsed != n || !e.features.implementsDomRange)
            return t.fail("No means of obtaining a Range or TextRange from the user's selection was found"),
            !1;
        z = function(e) {
            var t, n = e.nativeSelection;
            n.anchorNode ? (t = F(n, 0),
            e._ranges = [t],
            e.rangeCount = 1,
            A(e),
            e.isCollapsed = c(e)) : O(e)
        }
    }
    q.refresh = function(e) {
        var t = e ? this._ranges.slice(0) : null;
        z(this);
        if (e) {
            var n = t.length;
            if (n != this._ranges.length)
                return !1;
            while (n--)
                if (!o.rangesEqual(t[n], this._ranges[n]))
                    return !1;
            return !0
        }
    }
    ;
    var W = function(e, t) {
        var n = e.getAllRanges()
          , r = !1;
        e.removeAllRanges();
        for (var i = 0, s = n.length; i < s; ++i)
            r || t !== n[i] ? e.addRange(n[i]) : r = !0;
        e.rangeCount || O(e)
    };
    C ? q.removeRange = function(e) {
        if (this.docSelection.type == h) {
            var t = this.docSelection.createRange(), n = D(e), r = i.getDocument(t.item(0)), s = i.getBody(r).createControlRange(), o, u = !1;
            for (var a = 0, f = t.length; a < f; ++a)
                o = t.item(a),
                o !== n || u ? s.add(t.item(a)) : u = !0;
            s.select(),
            B(this)
        } else
            W(this, e)
    }
    : q.removeRange = function(e) {
        W(this, e)
    }
    ;
    var X;
    !g && E && e.features.implementsDomRange ? (X = function(e) {
        var t = !1;
        return e.anchorNode && (t = i.comparePoints(e.anchorNode, e.anchorOffset, e.focusNode, e.focusOffset) == 1),
        t
    }
    ,
    q.isBackwards = function() {
        return X(this)
    }
    ) : X = q.isBackwards = function() {
        return !1
    }
    ,
    q.toString = function() {
        var e = [];
        for (var t = 0, n = this.rangeCount; t < n; ++t)
            e[t] = "" + this._ranges[t];
        return e.join("")
    }
    ,
    q.collapse = function(t, n) {
        V(this, t);
        var r = e.createRange(i.getDocument(t));
        r.collapseToPoint(t, n),
        this.removeAllRanges(),
        this.addRange(r),
        this.isCollapsed = !0
    }
    ,
    q.collapseToStart = function() {
        if (!this.rangeCount)
            throw new a("INVALID_STATE_ERR");
        var e = this._ranges[0];
        this.collapse(e.startContainer, e.startOffset)
    }
    ,
    q.collapseToEnd = function() {
        if (!this.rangeCount)
            throw new a("INVALID_STATE_ERR");
        var e = this._ranges[this.rangeCount - 1];
        this.collapse(e.endContainer, e.endOffset)
    }
    ,
    q.selectAllChildren = function(t) {
        V(this, t);
        var n = e.createRange(i.getDocument(t));
        n.selectNodeContents(t),
        this.removeAllRanges(),
        this.addRange(n)
    }
    ,
    q.deleteFromDocument = function() {
        if (C && m && this.docSelection.type == h) {
            var e = this.docSelection.createRange(), t;
            while (e.length)
                t = e.item(0),
                e.remove(t),
                t.parentNode.removeChild(t);
            this.refresh()
        } else if (this.rangeCount) {
            var n = this.getAllRanges();
            this.removeAllRanges();
            for (var r = 0, i = n.length; r < i; ++r)
                n[r].deleteContents();
            this.addRange(n[i - 1])
        }
    }
    ,
    q.getAllRanges = function() {
        return this._ranges.slice(0)
    }
    ,
    q.setSingleRange = function(e) {
        this.setRanges([e])
    }
    ,
    q.containsNode = function(e, t) {
        for (var n = 0, r = this._ranges.length; n < r; ++n)
            if (this._ranges[n].containsNode(e, t))
                return !0;
        return !1
    }
    ,
    q.toHtml = function() {
        var e = "";
        if (this.rangeCount) {
            var t = o.getRangeDocument(this._ranges[0]).createElement("div");
            for (var n = 0, r = this._ranges.length; n < r; ++n)
                t.appendChild(this._ranges[n].cloneContents());
            e = t.innerHTML
        }
        return e
    }
    ,
    q.getName = function() {
        return "WrappedSelection"
    }
    ,
    q.inspect = function() {
        return $(this)
    }
    ,
    q.detach = function() {
        this.win[r] = null,
        this.win = this.anchorNode = this.focusNode = null
    }
    ,
    I.inspect = $,
    e.Selection = I,
    e.selectionPrototype = q,
    e.addCreateMissingNativeApiListener(function(t) {
        typeof t.getSelection == "undefined" && (t.getSelection = function() {
            return e.getSelection(this)
        }
        ),
        t = null
    })
}),
rangy.createModule("CssClassApplier", function(e, t) {
    function i(e) {
        return e.replace(/^\s\s*/, "").replace(/\s\s*$/, "")
    }
    function s(e, t) {
        return e.className && (new RegExp("(?:^|\\s)" + t + "(?:\\s|$)")).test(e.className)
    }
    function o(e, t) {
        e.className ? s(e, t) || (e.className += " " + t) : e.className = t
    }
    function a(e) {
        return e.split(/\s+/).sort().join(" ")
    }
    function f(e) {
        return a(e.className)
    }
    function l(e, t) {
        return f(e) == f(t)
    }
    function c(e) {
        var t = e.parentNode;
        while (e.hasChildNodes())
            t.insertBefore(e.firstChild, e);
        t.removeChild(e)
    }
    function h(e, t) {
        var n = e.cloneRange();
        n.selectNodeContents(t);
        var r = n.intersection(e)
          , i = r ? r.toString() : "";
        return n.detach(),
        i != ""
    }
    function p(e) {
        return e.getNodes([3], function(t) {
            return h(e, t)
        })
    }
    function d(e, t) {
        if (e.attributes.length != t.attributes.length)
            return !1;
        for (var n = 0, r = e.attributes.length, i, s, o; n < r; ++n) {
            i = e.attributes[n],
            o = i.name;
            if (o != "class") {
                s = t.attributes.getNamedItem(o);
                if (i.specified != s.specified)
                    return !1;
                if (i.specified && i.nodeValue !== s.nodeValue)
                    return !1
            }
        }
        return !0
    }
    function v(e, t) {
        for (var r = 0, i = e.attributes.length, s; r < i; ++r) {
            s = e.attributes[r].name;
            if ((!t || !n.arrayContains(t, s)) && e.attributes[r].specified && s != "class")
                return !0
        }
        return !1
    }
    function m(e, t) {
        for (var n in t)
            if (t.hasOwnProperty(n) && e[n] !== t[n])
                return !1;
        return !0
    }
    function b(e) {
        var t;
        return e && e.nodeType == 1 && ((t = e.parentNode) && t.nodeType == 9 && t.designMode == "on" || y(e) && !y(e.parentNode))
    }
    function w(e) {
        return (y(e) || e.nodeType != 1 && y(e.parentNode)) && !b(e)
    }
    function S(e) {
        return e && e.nodeType == 1 && !E.test(g(e, "display"))
    }
    function T(e) {
        if (e.data.length == 0)
            return !0;
        if (x.test(e.data))
            return !1;
        var t = g(e.parentNode, "whiteSpace");
        switch (t) {
        case "pre":
        case "pre-wrap":
        case "-moz-pre-wrap":
            return !1;
        case "pre-line":
            if (/[\r\n]/.test(e.data))
                return !1
        }
        return S(e.previousSibling) || S(e.nextSibling)
    }
    function N(e, t) {
        return n.isCharacterDataNode(e) ? t == 0 ? !!e.previousSibling : t == e.length ? !!e.nextSibling : !0 : t > 0 && t < e.childNodes.length
    }
    function C(e, r, i, s) {
        var o, u = i == 0;
        if (n.isAncestorOf(r, e))
            return e;
        if (n.isCharacterDataNode(r))
            if (i == 0)
                i = n.getNodeIndex(r),
                r = r.parentNode;
            else {
                if (i != r.length)
                    throw t.createError("splitNodeAt should not be called with offset in the middle of a data node (" + i + " in " + r.data);
                i = n.getNodeIndex(r) + 1,
                r = r.parentNode
            }
        if (N(r, i)) {
            if (!o) {
                o = r.cloneNode(!1),
                o.id && o.removeAttribute("id");
                var a;
                while (a = r.childNodes[i])
                    o.appendChild(a);
                n.insertAfter(o, r)
            }
            return r == e ? o : C(e, o.parentNode, n.getNodeIndex(o), s)
        }
        if (e != r) {
            o = r.parentNode;
            var f = n.getNodeIndex(r);
            return u || f++,
            C(e, o, f, s)
        }
        return e
    }
    function k(e, t) {
        return e.tagName == t.tagName && l(e, t) && d(e, t)
    }
    function L(e) {
        var t = e ? "nextSibling" : "previousSibling";
        return function(n, r) {
            var i = n.parentNode
              , s = n[t];
            if (s) {
                if (s && s.nodeType == 3)
                    return s
            } else if (r) {
                s = i[t];
                if (s && s.nodeType == 1 && k(i, s))
                    return s[e ? "firstChild" : "lastChild"]
            }
            return null
        }
    }
    function M(e) {
        this.isElementMerge = e.nodeType == 1,
        this.firstTextNode = this.isElementMerge ? e.lastChild : e,
        this.textNodes = [this.firstTextNode]
    }
    function P(e, t, n) {
        this.cssClass = e;
        var r, s, o, u, f = null;
        if (typeof t == "object" && t !== null) {
            n = t.tagNames,
            f = t.elementProperties;
            for (s = 0; u = _[s++]; )
                t.hasOwnProperty(u) && (this[u] = t[u]);
            r = t.normalize
        } else
            r = t;
        this.normalize = typeof r == "undefined" ? !0 : r,
        this.attrExceptions = [];
        var l = document.createElement(this.elementTagName);
        this.elementProperties = {};
        for (var c in f)
            f.hasOwnProperty(c) && (D.hasOwnProperty(c) && (c = D[c]),
            l[c] = f[c],
            this.elementProperties[c] = l[c],
            this.attrExceptions.push(c));
        this.elementSortedClassName = this.elementProperties.hasOwnProperty("className") ? a(this.elementProperties.className + " " + e) : e,
        this.applyToAnyTagName = !1;
        var h = typeof n;
        if (h == "string")
            n == "*" ? this.applyToAnyTagName = !0 : this.tagNames = i(n.toLowerCase()).split(/\s*,\s*/);
        else if (h == "object" && typeof n.length == "number") {
            this.tagNames = [];
            for (s = 0,
            o = n.length; s < o; ++s)
                n[s] == "*" ? this.applyToAnyTagName = !0 : this.tagNames.push(n[s].toLowerCase())
        } else
            this.tagNames = [this.elementTagName]
    }
    function H(e, t, n) {
        return new P(e,t,n)
    }
    e.requireModules(["WrappedSelection", "WrappedRange"]);
    var n = e.dom, r = "span", u = function() {
        function e(e, t, n) {
            return t && n ? " " : ""
        }
        return function(t, n) {
            t.className && (t.className = t.className.replace(new RegExp("(?:^|\\s)" + n + "(?:\\s|$)"), e))
        }
    }(), g;
    typeof window.getComputedStyle != "undefined" ? g = function(e, t) {
        return n.getWindow(e).getComputedStyle(e, null)[t]
    }
    : typeof document.documentElement.currentStyle != "undefined" ? g = function(e, t) {
        return e.currentStyle[t]
    }
    : t.fail("No means of obtaining computed style properties found");
    var y;
    (function() {
        var e = document.createElement("div");
        typeof e.isContentEditable == "boolean" ? y = function(e) {
            return e && e.nodeType == 1 && e.isContentEditable
        }
        : y = function(e) {
            return !e || e.nodeType != 1 || e.contentEditable == "false" ? !1 : e.contentEditable == "true" || y(e.parentNode)
        }
    })();
    var E = /^inline(-block|-table)?$/i
      , x = /[^\r\n\t\f \u200B]/
      , A = L(!1)
      , O = L(!0);
    M.prototype = {
        doMerge: function() {
            var e = [], t, n, r;
            for (var i = 0, s = this.textNodes.length; i < s; ++i)
                t = this.textNodes[i],
                n = t.parentNode,
                e[i] = t.data,
                i && (n.removeChild(t),
                n.hasChildNodes() || n.parentNode.removeChild(n));
            return this.firstTextNode.data = r = e.join(""),
            r
        },
        getLength: function() {
            var e = this.textNodes.length
              , t = 0;
            while (e--)
                t += this.textNodes[e].length;
            return t
        },
        toString: function() {
            var e = [];
            for (var t = 0, n = this.textNodes.length; t < n; ++t)
                e[t] = "'" + this.textNodes[t].data + "'";
            return "[Merge(" + e.join(",") + ")]"
        }
    };
    var _ = ["elementTagName", "ignoreWhiteSpace", "applyToEditableOnly"]
      , D = {
        "class": "className"
    };
    P.prototype = {
        elementTagName: r,
        elementProperties: {},
        ignoreWhiteSpace: !0,
        applyToEditableOnly: !1,
        hasClass: function(e) {
            return e.nodeType == 1 && n.arrayContains(this.tagNames, e.tagName.toLowerCase()) && s(e, this.cssClass)
        },
        getSelfOrAncestorWithClass: function(e) {
            while (e) {
                if (this.hasClass(e, this.cssClass))
                    return e;
                e = e.parentNode
            }
            return null
        },
        isModifiable: function(e) {
            return !this.applyToEditableOnly || w(e)
        },
        isIgnorableWhiteSpaceNode: function(e) {
            return this.ignoreWhiteSpace && e && e.nodeType == 3 && T(e)
        },
        postApply: function(e, t, n) {
            var r = e[0], i = e[e.length - 1], s = [], o, u = r, a = i, f = 0, l = i.length, c, h;
            for (var p = 0, d = e.length; p < d; ++p)
                c = e[p],
                h = A(c, !n),
                h ? (o || (o = new M(h),
                s.push(o)),
                o.textNodes.push(c),
                c === r && (u = o.firstTextNode,
                f = u.length),
                c === i && (a = o.firstTextNode,
                l = o.getLength())) : o = null;
            var v = O(i, !n);
            v && (o || (o = new M(i),
            s.push(o)),
            o.textNodes.push(v));
            if (s.length) {
                for (p = 0,
                d = s.length; p < d; ++p)
                    s[p].doMerge();
                t.setStart(u, f),
                t.setEnd(a, l)
            }
        },
        createContainer: function(t) {
            var n = t.createElement(this.elementTagName);
            return e.util.extend(n, this.elementProperties),
            o(n, this.cssClass),
            n
        },
        applyToTextNode: function(e) {
            var t = e.parentNode;
            if (t.childNodes.length == 1 && n.arrayContains(this.tagNames, t.tagName.toLowerCase()))
                o(t, this.cssClass);
            else {
                var r = this.createContainer(n.getDocument(e));
                e.parentNode.insertBefore(r, e),
                r.appendChild(e)
            }
        },
        isRemovable: function(e) {
            return e.tagName.toLowerCase() == this.elementTagName && f(e) == this.elementSortedClassName && m(e, this.elementProperties) && !v(e, this.attrExceptions) && this.isModifiable(e)
        },
        undoToTextNode: function(e, t, n) {
            if (!t.containsNode(n)) {
                var r = t.cloneRange();
                r.selectNode(n),
                r.isPointInRange(t.endContainer, t.endOffset) && (C(n, t.endContainer, t.endOffset, [t]),
                t.setEndAfter(n)),
                r.isPointInRange(t.startContainer, t.startOffset) && (n = C(n, t.startContainer, t.startOffset, [t]))
            }
            this.isRemovable(n) ? c(n) : u(n, this.cssClass)
        },
        applyToRange: function(e) {
            e.splitBoundaries();
            var t = p(e);
            if (t.length) {
                var n;
                for (var r = 0, i = t.length; r < i; ++r)
                    n = t[r],
                    !this.isIgnorableWhiteSpaceNode(n) && !this.getSelfOrAncestorWithClass(n) && this.isModifiable(n) && this.applyToTextNode(n);
                e.setStart(t[0], 0),
                n = t[t.length - 1],
                e.setEnd(n, n.length),
                this.normalize && this.postApply(t, e, !1)
            }
        },
        applyToSelection: function(t) {
            t = t || window;
            var n = e.getSelection(t), r, i = n.getAllRanges();
            n.removeAllRanges();
            var s = i.length;
            while (s--)
                r = i[s],
                this.applyToRange(r),
                n.addRange(r)
        },
        undoToRange: function(e) {
            e.splitBoundaries();
            var t = p(e), n, r, i = t[t.length - 1];
            if (t.length) {
                for (var s = 0, o = t.length; s < o; ++s)
                    n = t[s],
                    r = this.getSelfOrAncestorWithClass(n),
                    r && this.isModifiable(n) && this.undoToTextNode(n, e, r),
                    e.setStart(t[0], 0),
                    e.setEnd(i, i.length);
                this.normalize && this.postApply(t, e, !0)
            }
        },
        undoToSelection: function(t) {
            t = t || window;
            var n = e.getSelection(t), r = n.getAllRanges(), i;
            n.removeAllRanges();
            for (var s = 0, o = r.length; s < o; ++s)
                i = r[s],
                this.undoToRange(i),
                n.addRange(i)
        },
        getTextSelectedByRange: function(e, t) {
            var n = t.cloneRange();
            n.selectNodeContents(e);
            var r = n.intersection(t)
              , i = r ? r.toString() : "";
            return n.detach(),
            i
        },
        isAppliedToRange: function(e) {
            if (e.collapsed)
                return !!this.getSelfOrAncestorWithClass(e.commonAncestorContainer);
            var t = e.getNodes([3]);
            for (var n = 0, r; r = t[n++]; )
                if (!this.isIgnorableWhiteSpaceNode(r) && h(e, r) && this.isModifiable(r) && !this.getSelfOrAncestorWithClass(r))
                    return !1;
            return !0
        },
        isAppliedToSelection: function(t) {
            t = t || window;
            var n = e.getSelection(t)
              , r = n.getAllRanges()
              , i = r.length;
            while (i--)
                if (!this.isAppliedToRange(r[i]))
                    return !1;
            return !0
        },
        toggleRange: function(e) {
            this.isAppliedToRange(e) ? this.undoToRange(e) : this.applyToRange(e)
        },
        toggleSelection: function(e) {
            this.isAppliedToSelection(e) ? this.undoToSelection(e) : this.applyToSelection(e)
        },
        detach: function() {}
    },
    P.util = {
        hasClass: s,
        addClass: o,
        removeClass: u,
        hasSameClasses: l,
        replaceWithOwnChildren: c,
        elementsHaveSameNonClassAttributes: d,
        elementHasNonClassAttributes: v,
        splitNodeAt: C,
        isEditableElement: y,
        isEditingHost: b,
        isEditable: w
    },
    e.CssClassApplier = P,
    e.createCssClassApplier = H
}),
rangy.createModule("SaveRestore", function(e, t) {
    function i(e, t) {
        return (t || document).getElementById(e)
    }
    function s(e, t) {
        var i = "selectionBoundary_" + +(new Date) + "_" + ("" + Math.random()).slice(2), s, o = n.getDocument(e.startContainer), u = e.cloneRange();
        return u.collapse(t),
        s = o.createElement("span"),
        s.id = i,
        s.style.lineHeight = "0",
        s.style.display = "none",
        s.className = "rangySelectionBoundary",
        s.appendChild(o.createTextNode(r)),
        u.insertNode(s),
        u.detach(),
        s
    }
    function o(e, n, r, s) {
        var o = i(r, e);
        o ? (n[s ? "setStartBefore" : "setEndBefore"](o),
        o.parentNode.removeChild(o)) : t.warn("Marker element has been removed. Cannot restore selection.")
    }
    function u(e, t) {
        return t.compareBoundaryPoints(e.START_TO_START, e)
    }
    function a(n) {
        n = n || window;
        var r = n.document;
        if (!e.isSelectionValid(n)) {
            t.warn("Cannot save selection. This usually happens when the selection is collapsed and the selection document has lost focus.");
            return
        }
        var o = e.getSelection(n), a = o.getAllRanges(), f = [], l, c, h;
        a.sort(u);
        for (var p = 0, d = a.length; p < d; ++p)
            h = a[p],
            h.collapsed ? (c = s(h, !1),
            f.push({
                markerId: c.id,
                collapsed: !0
            })) : (c = s(h, !1),
            l = s(h, !0),
            f[p] = {
                startMarkerId: l.id,
                endMarkerId: c.id,
                collapsed: !1,
                backwards: a.length == 1 && o.isBackwards()
            });
        for (p = d - 1; p >= 0; --p)
            h = a[p],
            h.collapsed ? h.collapseBefore(i(f[p].markerId, r)) : (h.setEndBefore(i(f[p].endMarkerId, r)),
            h.setStartAfter(i(f[p].startMarkerId, r)));
        return o.setRanges(a),
        {
            win: n,
            doc: r,
            rangeInfos: f,
            restored: !1
        }
    }
    function f(n, r) {
        if (!n.restored) {
            var s = n.rangeInfos
              , u = e.getSelection(n.win)
              , a = [];
            for (var f = s.length, l = f - 1, c, h; l >= 0; --l) {
                c = s[l],
                h = e.createRange(n.doc);
                if (c.collapsed) {
                    var p = i(c.markerId, n.doc);
                    if (p) {
                        p.style.display = "inline";
                        var d = p.previousSibling;
                        d && d.nodeType == 3 ? (p.parentNode.removeChild(p),
                        h.collapseToPoint(d, d.length)) : (h.collapseBefore(p),
                        p.parentNode.removeChild(p))
                    } else
                        t.warn("Marker element has been removed. Cannot restore selection.")
                } else
                    o(n.doc, h, c.startMarkerId, !0),
                    o(n.doc, h, c.endMarkerId, !1);
                f == 1 && h.normalizeBoundaries(),
                a[l] = h
            }
            f == 1 && r && e.features.selectionHasExtend && s[0].backwards ? (u.removeAllRanges(),
            u.addRange(a[0], !0)) : u.setRanges(a),
            n.restored = !0
        }
    }
    function l(e, t) {
        var n = i(t, e);
        n && n.parentNode.removeChild(n)
    }
    function c(e) {
        var t = e.rangeInfos;
        for (var n = 0, r = t.length, i; n < r; ++n)
            i = t[n],
            i.collapsed ? l(e.doc, i.markerId) : (l(e.doc, i.startMarkerId),
            l(e.doc, i.endMarkerId))
    }
    e.requireModules(["DomUtil", "DomRange", "WrappedRange"]);
    var n = e.dom
      , r = "﻿";
    e.saveSelection = a,
    e.restoreSelection = f,
    e.removeMarkerElement = l,
    e.removeMarkers = c
}),
rangy.createModule("Serializer", function(e, t) {
    function s(e) {
        return e.replace(/</g, "&lt;").replace(/>/g, "&gt;")
    }
    function o(e, t) {
        t = t || [];
        var n = e.nodeType
          , r = e.childNodes
          , i = r.length
          , u = [n, e.nodeName, i].join(":")
          , a = ""
          , f = "";
        switch (n) {
        case 3:
            a = s(e.nodeValue);
            break;
        case 8:
            a = "<!--" + s(e.nodeValue) + "-->";
            break;
        default:
            a = "<" + u + ">",
            f = "</>"
        }
        a && t.push(a);
        for (var l = 0; l < i; ++l)
            o(r[l], t);
        return f && t.push(f),
        t
    }
    function u(e) {
        var t = o(e).join("");
        return r(t).toString(16)
    }
    function a(e, t, n) {
        var r = []
          , s = e;
        n = n || i.getDocument(e).documentElement;
        while (s && s != n)
            r.push(i.getNodeIndex(s, !0)),
            s = s.parentNode;
        return r.join("/") + ":" + t
    }
    function f(e, n, r) {
        n ? r = r || i.getDocument(n) : (r = r || document,
        n = r.documentElement);
        var s = e.split(":"), o = n, u = s[0] ? s[0].split("/") : [], a = u.length, f;
        while (a--) {
            f = parseInt(u[a], 10);
            if (!(f < o.childNodes.length))
                throw t.createError("deserializePosition failed: node " + i.inspectNode(o) + " has no child with index " + f + ", " + a);
            o = o.childNodes[parseInt(u[a], 10)]
        }
        return new i.DomPosition(o,parseInt(s[1], 10))
    }
    function l(t, n, r) {
        r = r || e.DomRange.getRangeDocument(t).documentElement;
        if (!i.isAncestorOf(r, t.commonAncestorContainer, !0))
            throw new Error("serializeRange: range is not wholly contained within specified root node");
        var s = a(t.startContainer, t.startOffset, r) + "," + a(t.endContainer, t.endOffset, r);
        return n || (s += "{" + u(r) + "}"),
        s
    }
    function c(t, n, r) {
        n ? r = r || i.getDocument(n) : (r = r || document,
        n = r.documentElement);
        var s = /^([^,]+),([^,\{]+)({([^}]+)})?$/.exec(t)
          , o = s[4]
          , a = u(n);
        if (o && o !== u(n))
            throw new Error("deserializeRange: checksums of serialized range root node (" + o + ") and target root node (" + a + ") do not match");
        var l = f(s[1], n, r)
          , c = f(s[2], n, r)
          , h = e.createRange(r);
        return h.setStart(l.node, l.offset),
        h.setEnd(c.node, c.offset),
        h
    }
    function h(e, t, n) {
        t ? n = n || i.getDocument(t) : (n = n || document,
        t = n.documentElement);
        var r = /^([^,]+),([^,]+)({([^}]+)})?$/.exec(e)
          , s = r[3];
        return !s || s === u(t)
    }
    function p(t, n, r) {
        t = t || e.getSelection();
        var i = t.getAllRanges()
          , s = [];
        for (var o = 0, u = i.length; o < u; ++o)
            s[o] = l(i[o], n, r);
        return s.join("|")
    }
    function d(t, n, r) {
        n ? r = r || i.getWindow(n) : (r = r || window,
        n = r.document.documentElement);
        var s = t.split("|")
          , o = e.getSelection(r)
          , u = [];
        for (var a = 0, f = s.length; a < f; ++a)
            u[a] = c(s[a], n, r.document);
        return o.setRanges(u),
        o
    }
    function v(e, t, n) {
        var r;
        t ? r = n ? n.document : i.getDocument(t) : (n = n || window,
        t = n.document.documentElement);
        var s = e.split("|");
        for (var o = 0, u = s.length; o < u; ++o)
            if (!h(s[o], t, r))
                return !1;
        return !0
    }
    function g(e) {
        var t = e.split(/[;,]/);
        for (var n = 0, r = t.length, i, s; n < r; ++n) {
            i = t[n].split("=");
            if (i[0].replace(/^\s+/, "") == m) {
                s = i[1];
                if (s)
                    return decodeURIComponent(s.replace(/\s+$/, ""))
            }
        }
        return null
    }
    function y(e) {
        e = e || window;
        var t = g(e.document.cookie);
        t && d(t, e.doc)
    }
    function b(t, n) {
        t = t || window,
        n = typeof n == "object" ? n : {};
        var r = n.expires ? ";expires=" + n.expires.toUTCString() : ""
          , i = n.path ? ";path=" + n.path : ""
          , s = n.domain ? ";domain=" + n.domain : ""
          , o = n.secure ? ";secure" : ""
          , u = p(e.getSelection(t));
        t.document.cookie = encodeURIComponent(m) + "=" + encodeURIComponent(u) + r + i + s + o
    }
    e.requireModules(["WrappedSelection", "WrappedRange"]);
    var n = "undefined";
    (typeof encodeURIComponent == n || typeof decodeURIComponent == n) && t.fail("Global object is missing encodeURIComponent and/or decodeURIComponent method");
    var r = function() {
        function e(e) {
            var t = [];
            for (var n = 0, r = e.length, i; n < r; ++n)
                i = e.charCodeAt(n),
                i < 128 ? t.push(i) : i < 2048 ? t.push(i >> 6 | 192, i & 63 | 128) : t.push(i >> 12 | 224, i >> 6 & 63 | 128, i & 63 | 128);
            return t
        }
        function n() {
            var e = [];
            for (var t = 0, n, r; t < 256; ++t) {
                r = t,
                n = 8;
                while (n--)
                    (r & 1) == 1 ? r = r >>> 1 ^ 3988292384 : r >>>= 1;
                e[t] = r >>> 0
            }
            return e
        }
        function r() {
            return t || (t = n()),
            t
        }
        var t = null;
        return function(t) {
            var n = e(t)
              , i = -1
              , s = r();
            for (var o = 0, u = n.length, a; o < u; ++o)
                a = (i ^ n[o]) & 255,
                i = i >>> 8 ^ s[a];
            return (i ^ -1) >>> 0
        }
    }()
      , i = e.dom
      , m = "rangySerializedSelection";
    e.serializePosition = a,
    e.deserializePosition = f,
    e.serializeRange = l,
    e.deserializeRange = c,
    e.canDeserializeRange = h,
    e.serializeSelection = p,
    e.deserializeSelection = d,
    e.canDeserializeSelection = v,
    e.restoreSelectionFromCookie = y,
    e.saveSelectionCookie = b,
    e.getElementChecksum = u
});
