/**See http://casual-effects.com/markdeep for @license and documentation.
markdeep.min.js (C) 2016 Morgan McGuire
highlight.min.js  (C) 2016 Ivan Sagalaev https://highlightjs.org/*/
! function() {
    "use strict";

    function e(e, t, r) {
        return "<" + e + (r ? " " + r : "") + ">" + t + "</" + e + ">"
    }

    function t(e) {
        var t = document.createElement("canvas"),
            r = t.getContext("2d");
        return r.font = "10pt " + e, r.measureText("M").width
    }

    function r(e) {
        return window.markdeepOptions && void 0 !== window.markdeepOptions[e] ? window.markdeepOptions[e] : void 0 !== q[e] ? q[e] : void 0
    }

    function n(e) {
        return r("lang").keyword[e] || e
    }

    function a(e) {
        return (e + "").rp(/&/g, "&amp;").rp(/</g, "&lt;").rp(/>/g, "&gt;").rp(/"/g, "&quot;")
    }

    function i(e) {
        return e.rp(/&lt;/g, "<").rp(/&gt;/g, ">").rp(/&quot;/g, '"').rp(/&#39;/g, "'").rp(/&ndash;/g, "--").rp(/&mdash;/g, "---").rp(/&amp;/g, "&")
    }

    function s(e) {
        return e.rp(/<.*?>/g, "")
    }

    function o(e) {
        return encodeURI(e.rp(/\s/g, "").toLowerCase())
    }

    function c() {
        for (var t = "", r = 1; 6 >= r; ++r) {
            t += "h" + r + "::before {\ncontent:";
            for (var n = 1; r >= n; ++n) t += "counter(h" + n + ') "' + (r > n ? "." : " ") + '"';
            t += ";\ncounter-increment: h" + r + ";margin-right:10px}"
        }
        return e("style", t)
    }

    function l(e, t) {
        var r = e.innerHTML;
        return r = r.rp(/(?:<style class="fallback">[\s\S]*?<\/style>[\s\S]*)<\/\S+@\S+\.\S+?>/gim, ""), r = r.rp(/<\/h?ttps?:.*>/gi, ""), r = r.rp(/<(https?): (.*?)>/gi, function(e, t, r) {
            var n = "<" + t + "://" + r.rp(/=""\s/g, "/");
            return '=""' === n.ss(n.length - 3) && (n = n.ss(0, n.length - 3)), n = n.rp(/"/g, ""), n + ">"
        }), r = r.rp(/<style class=["']fallback["']>.*?<\/style>/gim, ""), r = i(r)
    }

    function u(e) {
        function t() {
            l = e.indexOf("\n", i) + 1, u = u || /\S/.test(e.ss(i, i + s)), d = d || /\S/.test(e.ss(i + o + 1, l))
        }
        for (var r = {
                h: e,
                j: "",
                m: "",
                o: ""
            }, n = e.indexOf(B); n >= 0; n = e.indexOf(B, n + B.length)) {
            var a, i = V(0, e.lastIndexOf("\n", n)) + 1,
                s = n - i;
            for (a = n + B.length; e[a] === S; ++a);
            var o = a - i - 1,
                c = {
                    h: e.ss(0, i),
                    j: "",
                    m: "center",
                    o: e.ss(i, n).rp(/[ \t]+$/, " ")
                },
                l = 0,
                u = !1,
                d = !1;
            t();
            for (var p = !0, m = a; p;) {
                if (i = l, t(), 0 === i) return r;
                if (u ? c.m = "floatright" : d && (c.m = "floatleft"), e[i + s] === S && e[i + o] === S) {
                    for (var g = s; o > g && e[i + g] === S; ++g);
                    var f = i + s,
                        h = i + o;
                    if (c.o += e.ss(m, f).rp(/^[ \t]*[ \t]/, " ").rp(/[ \t][ \t]*$/, " "), g === o) return c.o += e.ss(i + o + 1), c;
                    c.j += e.ss(f + 1, h) + "\n", m = h + 1
                } else p = !1
            }
        }
        return r
    }

    function d(e, t, r, n) {
        var a = t.source,
            i = "[^ \\t\\n" + a + "]",
            s = "(" + a + ")(" + i + ".*?(\\n.+?)*?)" + a + "(?![A-Za-z0-9])";
        return e.rp(RegExp(s, "g"), "<" + r + (n ? " " + n : "") + ">$2</" + r + ">")
    }

    function p(t, r) {
        function n(e) {
            return e.trim().rp(/^\||\|$/g, "")
        }
        var a = /(?:\n\|?[ \t\S]+?(?:\|[ \t\S]+?)+\|?(?=\n))/.source,
            i = /\n\|? *\:?-+\:?(?: *\| *\:?-+\:?)+ *\|?(?=\n)/.source,
            s = /\n[ \t]*\[[^\n\|]+\][ \t]*(?=\n)/.source,
            o = RegExp(a + i + a + "+(" + s + ")?", "g");
        return t = t.rp(o, function(t) {
            var a = t.split("\n"),
                i = "",
                s = "" === a[0] ? 1 : 0,
                o = a[a.length - 1].trim();
            o.length > 3 && "[" === o[0] && "]" === o[o.length - 1] ? (a.pop(), o = o.ss(1, o.length - 1)) : o = void 0;
            var c = [];
            n(a[s + 1]).rp(/:?-+:?/g, function(e) {
                var t = ":" === e[0],
                    n = ":" === e[e.length - 1];
                c.push(r(' style="text-align:' + (t && n ? "center" : n ? "right" : "left") + '"'))
            });
            for (var l = "th", u = s; a.length > u; ++u) {
                var d = n(a[u].trim()),
                    p = 0;
                i += e("tr", "<" + l + c[0] + ">" + d.rp(/\|/g, function() {
                    return ++p, "</" + l + "><" + l + c[p] + ">"
                }) + "</" + l + ">") + "\n", u == s && (++u, l = "td")
            }
            return i = e("table", i, r('class="table"')), o && (i = e("div", o, r('class="tablecaption"')) + i), i
        })
    }

    function m(e, t) {
        for (var r = /^\s*\n/.source, n = /[:,]\s*\n/.source, a = RegExp("(" + n + "|" + r + ")" + /((?:[ \t]*(?:\d+\.|-|\+|\*)(?:[ \t]+.+\n\n?)+)+)/.source, "gm"), i = !0, s = {
                "+": t('class="plus"'),
                "-": t('class="minus"'),
                "*": t('class="asterisk"')
            }, o = t('class="number"'); i;) i = !1, e = e.rp(a, function(e, t, r) {
            var n = t,
                a = [],
                c = {
                    p: -1
                };
            for (r.split("\n").forEach(function(e) {
                    var t = e.rp(/^\s*/, ""),
                        r = e.length - t.length,
                        l = s[t[0]],
                        u = !!l;
                    l = l || o;
                    var d = /^\d+\.[ \t]/.test(t);
                    if (c)
                        if (d || u) {
                            if (r !== c.p)
                                if (-1 !== c.p && c.p > r)
                                    for (; c && c.p > r;) a.pop(), n += "</li></" + c.tag + ">", c = a[a.length - 1];
                                else c = {
                                    p: r,
                                    tag: d ? "ol" : "ul",
                                    q: e.ss(0, r)
                                }, a.push(c), n += "<" + c.tag + ">";
                            else -1 !== c.p && (n += "</li>");
                            c ? n += "\n" + c.q + "<li " + l + ">" + t.rp(/^(\d+\.|-|\+|\*) /, "") : (n += "\n" + e, i = !0)
                        } else n += "\n" + c.q + e;
                    else n += "\n" + e
                }), c = a.pop(); c; c = a.pop()) n += "</li></" + c.tag + ">\n";
            return n
        });
        return e
    }

    function g(t, a) {
        var i = /^(?:[^\|<>\s-\+\*\d].*[12]\d{3}(?!\d).*?|(?:[12]\d{3}(?!\.).*\d.*?)|(?:\d{1,3}(?!\.).*[12]\d{3}(?!\d).*?))/.source,
            s = "(" + i + "):" + /[ \t]+([^ \t\n].*)\n/.source,
            o = /(?:[ \t]*\n)?((?:[ \t]+.+\n(?:[ \t]*\n){0,3})*)/.source,
            c = s + o,
            l = RegExp(c, "gm"),
            u = a('valign="top"'),
            d = a('style="width:100px;padding-right:15px" rowspan="2"'),
            p = a('style="padding-bottom:25px"'),
            m = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map(n),
            g = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"].map(n),
            f = g.join("|"),
            h = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map(n),
            b = 9;
        try {
            var x = 0;
            t = t.rp(RegExp("(" + c + "){2,}", "gm"), function(t) {
                ++x;
                var n = [],
                    i = !1;
                t.rp(l, function(t, r, s, o) {
                    var c = "",
                        l = "",
                        h = "",
                        y = !1;
                    r = r.trim(), "(" === r[0] && ")" === r.slice(-1) && (r = r.slice(1, -1), y = !0);
                    var v = r.match(RegExp("([0123]?\\d)\\D+([01]?\\d|" + f + ")\\D+([12]\\d{3})", "i"));
                    if (v) h = v[1], l = v[2], c = v[3];
                    else if (v = r.match(RegExp("([12]\\d{3})\\D+([01]?\\d|" + f + ")\\D+([0123]?\\d)", "i"))) h = v[3], l = v[2], c = v[1];
                    else {
                        if (v = r.match(RegExp("(" + f + ")\\D+([0123]?\\d)\\D+([12]\\d{3})", "i")), !v) throw "Could not parse date";
                        h = v[2], l = v[1], c = v[3]
                    }
                    r = h + " " + l + " " + c;
                    var _ = parseInt(l) - 1;
                    isNaN(_) && (_ = g.indexOf(l.toLowerCase()));
                    var w = new Date(Date.UTC(parseInt(c), _, parseInt(h), b)),
                        C = w.getUTCDay();
                    return r = m[C] + "<br/>" + r, i = i || 0 === C || 6 === C, n.push({
                        date: w,
                        title: s,
                        sourceOrder: n.length,
                        parenthesized: y,
                        text: y ? "" : e("tr", e("td", "<a " + a('name="schedule' + x + "_" + w.getUTCFullYear() + "-" + (w.getUTCMonth() + 1) + "-" + w.getUTCDate() + '"') + "></a>" + r, d) + e("td", e("b", s)), u) + e("tr", e("td", "\n\n" + o, p), u)
                    }), ""
                }), n.sort(function(e, t) {
                    var r = e.date.getTime(),
                        n = t.date.getTime();
                    return r === n ? e.sourceOrder - t.sourceOrder : r - n
                });
                var s = 864e5,
                    o = (n[n.length - 1].date.getTime() - n[0].date.getTime()) / s,
                    c = new Date;
                c = new Date(Date.UTC(c.getUTCFullYear(), c.getUTCMonth(), c.getUTCDate(), b));
                var y = "";
                if (o > 14 && 16 > o / n.length) {
                    var v = a('colspan="2" width="14%" style="padding-top:5px;text-align:center;font-style:italic"'),
                        _ = a('width="1%" height="30px" style="text-align:right;border:1px solid #EEE;border-right:none;"'),
                        w = a('width="1%" height="30px" style="color:#BBB;text-align:right;"'),
                        C = a('width="14%" style="border:1px solid #EEE;border-left:none;"'),
                        M = a('class="parenthesized"'),
                        N = n[0].date,
                        k = 0,
                        T = !i && r("hideEmptyWeekends"),
                        A = T ? function(e) {
                            return e.getUTCDay() > 0 && e.getUTCDay() < 6
                        } : function() {
                            return !0
                        },
                        E = function(e, t) {
                            return W(e.getTime() - t.getTime()) < s / 2
                        };
                    for (N = new Date(N.getUTCFullYear(), N.getUTCMonth(), 1, b); N.getTime() < n[n.length - 1].date.getTime();) {
                        for (y += "<table " + a('class="calendar"') + ">\n" + e("tr", e("th", h[N.getUTCMonth()] + " " + N.getUTCFullYear(), a('colspan="14"'))) + "<tr>", (T ? m.slice(1, 6) : m).forEach(function(t) {
                                y += e("td", t, v)
                            }), y += "</tr>"; 0 !== N.getUTCDay();) N = new Date(N.getTime() - s);
                        if (1 !== N.getDate())
                            for (y += "<tr " + u + ">"; 1 !== N.getDate();) A(N) && (y += "<td " + w + ">" + N.getUTCDate() + "</td><td>&nbsp;</td>"), N = new Date(N.getTime() + s);
                        do {
                            if (0 === N.getUTCDay() && (y += "<tr " + u + ">"), A(N)) {
                                var j = "";
                                E(N, c) && (j = a('class="today"'));
                                for (var S = "", B = n[k]; B && E(B.date, N); ++k, B = n[k]) S && (S += "<br/>"), S += B.parenthesized ? e("span", B.title, M) : e("a", B.title, a('href="#schedule' + x + "_" + N.getUTCFullYear() + "-" + (N.getUTCMonth() + 1) + "-" + N.getUTCDate() + '"'));
                                y += S ? e("td", e("b", N.getUTCDate()), _ + j) + e("td", S, C + j) : "<td " + _ + j + "></a>" + N.getUTCDate() + "</td><td " + C + j + "> &nbsp; </td>"
                            }
                            6 === N.getUTCDay() && (y += "</tr>"), N = new Date(N.getTime() + s)
                        } while (N.getUTCDate() > 1);
                        if (0 !== N.getUTCDay()) {
                            for (; 0 !== N.getUTCDay();) A(N) && (y += "<td " + w + ">" + N.getUTCDate() + "</td><td>&nbsp</td>"), N = new Date(N.getTime() + s);
                            y += "</tr>"
                        }
                        y += "</table><br/>\n", N = new Date(Date.UTC(N.getUTCFullYear(), N.getUTCMonth(), 1, b))
                    }
                }
                return t = "", n.forEach(function(e) {
                    t += e.text
                }), y + e("table", t, a('class="schedule"')) + "\n\n"
            })
        } catch (y) {}
        return t
    }

    function f(t, r) {
        var n = /^.+\n:(?=[ \t])/.source,
            a = "(s*\n|[: 	].+\n)+";
        return t = t.rp(RegExp("(" + n + a + ")+", "gm"), function(t) {
            var n = [],
                a = null;
            t.split("\n").forEach(function(e, t) {
                0 === e.trim().length ? a && (a.definition += "\n") : /\s/.test(e[0]) || ":" === e[0] ? (":" === e[0] && (e = " " + e.ss(1)), a.definition += e + "\n") : (a = {
                    term: e,
                    definition: ""
                }, n.push(a))
            });
            var o = 0;
            n.forEach(function(e) {
                o = /\n\s*\n/.test(e.definition.trim()) ? 1 / 0 : V(o, i(s(e.definition)).length)
            });
            var c = "";
            if (128 > o) {
                var l = r("valign=top");
                n.forEach(function(t) {
                    c += e("tr", e("td", e("dt", t.term)) + e("td", e("dd", t.definition)), l)
                }), c = e("table", c)
            } else n.forEach(function(t) {
                c += e("dt", t.term) + e("dd", "\n\n" + t.definition)
            });
            return e("dl", c)
        })
    }

    function h(t, n) {
        var a = "",
            i = "",
            o = [0],
            c = 0,
            l = 0,
            u = {};
        t = t.rp(/<h([1-6])>(.*?)<\/h\1>/gi, function(t, r, d) {
            r = parseInt(r), d = d.trim();
            for (var p = c; r > p; ++p) o[p] = 0;
            o.splice(r, c - r), c = r, ++o[c - 1];
            var m = o.join("."),
                g = "toc" + m;
            return u[s(d).trim().toLowerCase()] = m, 3 >= r && (a += Array(r).join("&nbsp;&nbsp;") + '<a href="#' + g + '" class="level' + r + '">' + m + "&nbsp; " + d + "</a><br/>\n", 1 === r ? i += ' &middot; <a href="#' + g + '">' + d + "</a>" : ++l), e("a", "", n('name="' + g + '"')) + t
        }), i.length > 0 && (i = i.ss(10));
        var d = o[0],
            p = d + l,
            m = t.regexIndexOf(/((<a\s+\S+><\/a>)\s*)*<h1>/i); - 1 === m && (m = 0);
        var g = '<div class="afterTitles"></div>',
            f = t.indexOf(g); - 1 === f ? f = 0 : f += g.length;
        var h = r("tocStyle"),
            b = "";
        switch ("auto" !== h && "" !== h || (h = 4 > p && 1 >= d || 2048 > t.length ? "none" : 7 > d && 2.5 > p / d ? "short" : -1 === m || m / 55 > p ? "medium" : "long"), h) {
            case "none":
            case "":
                break;
            case "short":
                b = '<div class="shortTOC">' + i + "</div>";
                break;
            case "medium":
                b = '<div class="mediumTOC"><center><b>Contents</b></center><p>' + a + "</p></div>";
                break;
            case "long":
                f = m, b = '<div class="longTOC"><div class="tocHeader">Contents</div><p>' + a + "</p></div>"
        }
        return t = t.ss(0, f) + b + t.ss(f), [t, u]
    }

    function b(e) {
        return e.rp(/([\.\[\]\(\)\*\+\?\^\$\\\{\}\|])/g, "\\$1")
    }

    function x(e, t) {
        return e && t ? (e = e.match(/\n/g), t = t.match(/\n/g), e && e.length > 1 && t && t.length > 1) : !1
    }

    function y(t, r) {
        function i(e) {
            for (var t = (A.push(e) - 1).toString(T); E > t.length;) t = "0" + t;
            return k + t
        }

        function c(e) {
            var e = parseInt(e.ss(1), T);
            return A[e]
        }

        function l(e, t) {
            return i(t)
        }

        function y(e, t, r) {
            return t + i(r)
        }

        function v(t) {
            return function(r, n) {
                return "\n<a " + i('name="' + o(s(n)) + '"') + "></a>" + e("h" + t, n) + "\n\n"
            }
        }

        function _(t) {
            var r = u(t);
            if (r.j) {
                var n = /^\n*[ \t]*\[[^\n]+\][ \t]*(?=\n)/;
                r.o = r.o.rp(n, function(t) {
                    return t = t.trim(), t = t.ss(1, t.length - 1), e("center", e("div", t, i('class="imagecaption"')))
                });
                var a = C(r.j, r.m);
                return r.h + a + "\n" + _(r.o)
            }
            return t
        }
        var w = {},
            M = 0,
            N = {},
            k = "\ue010",
            T = 36,
            A = [],
            E = 4,
            j = RegExp(k + "[0-9a-z]{" + E + "," + E + "}", "g");
        void 0 === r && (r = !0), void 0 !== t.innerHTML && (t = t.innerHTML), t = t.rp(/<script\s+type\s*=\s*['"]preformatted['"]\s*>([\s\S]*?)<\/script>/gi, "$1"), t = "\n\n" + t;
        var S = function(r, n) {
            var a = RegExp("\n" + n + "{3,}(.*)\n([\\s\\S]+?)\n" + n + "{3,}\n([ 	]*\\[.*\\])?", "g");
            t = t.rp(a, function(t, n, a, s) {
                var o = "\n";
                s && (s = s.trim(), o += "<div " + i('class="listingcaption ' + r + '"') + ">" + s.ss(1, s.length - 1) + "</div>\n"), n = n ? n.trim() : n, n = n ? [n] : void 0;
                var c = hljs.highlightAuto(a, n);
                return o + i(e("pre", e("code", c.value), 'class="listing ' + r + '"')) + "\n"
            })
        };
        S("tilde", "~"), S("backtick", "`"), t = t.rp(/(<code\b.*?<\/code>)/gi, l), t = _(t), t = t.rp(/<svg( .*?)?>([\s\S]*?)<\/svg>/gi, function(e, t, r) {
            return "<svg" + i(t) + ">" + i(r) + "</svg>"
        }), t = t.rp(/<style>([\s\S]*?)<\/style>/gi, function(t, r) {
            return e("style", i(r))
        }), t = t.rp(/<img\s+src=(["'])[\s\S]*?\1\s*>/gi, function(e, t) {
            return "<img " + i(e.ss(5, e.length - 1)) + ">"
        }), t = t.rp(/(`)(.+?(?:\n.+?)?)`(?!\d)/g, e("code", "$2")), t = t.rp(/(<code(?: .*?)?>)([\s\S]*?)<\/code>/gi, function(e, t, r) {
            return i(t + a(r) + "</code>")
        }), t = t.rp(/(<pre\b[\s\S]*?<\/pre>)/gi, l), t = t.rp(/(<\w[^ \n<>]*?[ \t]+)(.*?)(?=\/?>)/g, y), t = t.rp(/(\$\$[\s\S]+?\$\$)/g, l), t = t.rp(/((?:[^\w\d]))\$([ \t][^\$]+?[ \t])\$(?![\w\d])/g, "$1\\($2\\)"), t = t.rp(/((?:[^\w\d]))\$(\S(?:[^\$]*?\S(?!US))??)\$(?![\w\d])/g, "$1\\($2\\)"), t = t.rp(/(\\\([\s\S]+?\\\))/g, l), t = t.rp(/(\\begin\{equation\}[\s\S]*?\\end\{equation\})/g, l), t = t.rp(/(\\begin\{eqnarray\}[\s\S]*?\\end\{eqnarray\})/g, l), t = t.rp(/(\\begin\{equation\*\}[\s\S]*?\\end\{equation\*\})/g, l), t = t.rp(/(?:^|\n)(.+?)\n[ \t]*={3,}[ \t]*\n/g, v(1)), t = t.rp(/(?:^|\n)(.+?)\n[ \t]*-{3,}[ \t]*\n/g, v(2));
        for (var B = 6; B > 0; --B) t = t.rp(RegExp(/^[ \t]*/.source + "#{" + B + "," + B + "}(?:[ 	])([^\n#]+)#*[ 	]*\n", "gm"), v(B)), t = t.rp(RegExp(/^[ \t]*/.source + "\\(#{" + B + "," + B + "}\\)(?:[ 	])([^\n#]+)\\(?#*\\)?\\n[ 	]*\n", "gm"), e("div", "$1", i('class="nonumberh' + B + '"')));
        t = t.rp(/\n((?:_[ \t]*){3,}|(?:-[ \t]*){3,}|(?:\*[ \t]*){3,})\s*?\n/g, "\n<hr/>\n");
        var D = i('class="fancyquote"');
        t = t.rp(/\n>[ \t]*"(.*(?:\n>.*)*)"[ \t]*(?:\n>[ \t]*)?(\n>[ \t]{2,}\S.*)?\n/g, function(t, r, n) {
            return e("blockquote", e("span", r.rp(/\n>/g, "\n"), D) + (n ? e("span", n.rp(/\n>/g, "\n"), i('class="author"')) : ""), D)
        }), t = t.rp(/(?:\n>.*){2,}/g, function(t) {
            return e("blockquote", t.rp(/\n>/g, "\n"))
        }), t = t.rp(/\s*\[\^(.*?)\](?!:)/g, function(e, t) {
            return t = t.toLowerCase().trim(), t in w || (++M, w[t] = M), "<sup><a " + i('href="#endnote-' + t + '"') + ">" + w[t] + "</a></sup>"
        }), t = t.rp(/\[#(.*?)\](?!:)/g, function(e, t) {
            return t = t.trim(), "[<a " + i('href="#citation-' + t.toLowerCase() + '"') + ">" + t + "</a>]"
        }), t = t.rp(/\n\[#(.*?)\]:((?:.+?\n?)*)/g, function(e, t, r) {
            return t = t.trim(), "<div " + i('class="bib"') + ">[<a " + i('name="citation-' + t.toLowerCase() + '"') + "></a><b>" + t + "</b>] " + r + "</div>"
        }), t = p(t, i), t = t.rp(/^\[([^\^#].*?)\]:(.*?)$/gm, function(e, t, r) {
            return N[t.toLowerCase().trim()] = r.trim(), ""
        }), t = t.rp(/(?:<|(?!<)\b)(\S+@(\S+\.)+?\S{3,}?)(?:$|>|(?=<)|(?=\s)(?!>))/g, function(e, t) {
            return "<a " + i('href="mailto:' + t + '"') + ">" + t + "</a>"
        });
        var $ = function(t, r, n) {
            n = n || "";
            var a, s;
            return /(.mp4|.m4v|.avi|.mpg|.mov)$/i.test(r) ? a = "<video " + i('class="markdeep" src="' + r + '"' + n + ' width="480px" controls="true"') + "/>" : (s = r.match(/^https:\/\/(?:www\.)?(?:youtube\.com\/\S*?v=|youtu\.be\/)([\w\d-]+)(&.*)?$/i)) ? a = "<iframe " + i('class="markdeep" src="https://www.youtube.com/embed/' + s[1] + '"' + n + ' width="480px" height="300px" frameborder="0" allowfullscreen webkitallowfullscreen mozallowfullscreen') + "></iframe>" : (s = r.match(/^https:\/\/(?:www\.)?vimeo.com\/\S*?\/([\w\d-]+)$/i)) ? a = "<iframe " + i('class="markdeep" src="https://player.vimeo.com/video/' + s[1] + '"' + n + ' width="480px" height="300px" frameborder="0" allowfullscreen webkitallowfullscreen mozallowfullscreen') + "></iframe>" : (a = "<img " + i('class="markdeep" src="' + r + '"' + n) + "/>", /\b(width|height)\b/i.test(n) && (a = e("a ", a, i('href="' + r + '" target="_blank"')))), a
        };
        t = t.rp(/\(http:\/\/g.gravizo.com\/g\?((?:[^\(\)]|\([^\(\)]*\))*)\)/gi, function(e, t) {
            return "(http://g.gravizo.com/g?" + encodeURIComponent(t) + ")"
        }), t = t.rp(/(^|[^!])\[([^\[\]]+?)\]\(([^\)]+?)(\s+[^\)]*?)?\)/g, function(e, t, r, n, a) {
            return a = a || "", t + "<a " + i('href="' + n + '"' + a) + ">" + r + "</a>"
        }), t = t.rp(/(^|[^!])\[[ \t]*?\]\(([^\)]+?)\)/g, function(e, t, r) {
            return t + "<a " + i('href="' + r + '"') + ">" + r + "</a>"
        }), t = t.rp(/(\s*)!\[\]\(([^\)\s]+)([^\)]*?)?\)(\s*)/g, function(t, r, n, a, i) {
            var s = $(t, n, a);
            return x(r, i) && (s = e("center", s)), r + s + i
        });
        for (var L = !0; L;) L = !1, t = t.rp(/(\s*)!\[([\s\S]+?)?\]\(([^\)\s]+)([^\)]*?)?\)(\s*)/, function(t, r, n, a, s, o) {
            L = !0;
            var c = "";
            s && (s = s.rp(/((?:max-)?width)\s*:\s*[^;'"]*/g, function(e, t) {
                return c = e + ";", t + ":100%"
            }), s = s.rp(/((?:max-)?width)\s*=\s*('\S+?'|"\S+?")/g, function(e, t, r) {
                return c = t + ":" + r.ss(1, r.length - 1) + ";", 'style="width:100%" '
            }));
            var l = $(t, a, s);
            return x(r, o) ? (r += "<center>", o = "</center>" + o) : c += "float:right;margin:4px 0px 0px 25px;", r + e("div", l + e("div", n, i('class="imagecaption"')), i('class="image" style="' + c + '"')) + o
        });
        t = d(t, /\*\*/, "strong", i('class="asterisk"')), t = d(t, /__/, "strong", i('class="underscore"')), t = d(t, /\*/, "em", i('class="asterisk"')), t = d(t, /_/, "em", i('class="underscore"')), t = t.rp(/\~\~([^~].*?)\~\~/g, e("del", "$1")), t = t.rp(/(^|[ \t->])(")(?=\w)/gm, "$1&ldquo;"), t = t.rp(/([A-Za-z\.,:;\?!=<])(")(?=$|\W)/gm, "$1&rdquo;"), t = t.rp(/(\s)==>(\s)/g, "$1&rarr;$2"), t = t.rp(/(\s)<==(\s)/g, "$1&larr;$2"), t = t.rp(/([^-!\:\|])---([^->\:\|])/g, "$1&mdash;$2"), t = t.rp(/([^-!\:\|])--([^->\:\|])/g, "$1&ndash;$2"), t = t.rp(/(\d+\s?)x(\s?\d+)/g, "$1&times;$2"), t = t.rp(/([\s\(\[<\|])-(\d)/g, "$1&minus;$2"), t = t.rp(/(\d) - (\d)/g, "$1 &minus; $2"), t = t.rp(/\^([-+]?\d+)\b/g, "<sup>$1</sup>"), t = g(t, i), t = f(t, i), t = m(t, i), t = t.rp(/(\d+?)[ \t-]degree(?:s?)/g, "$1&deg;"), t = t.rp(/\n[\s\n]*?\n/g, "\n\n</p><p>\n\n"), t = t.rp(/\[(.+?)\]\[(.*?)\]/g, function(e, t, r) {
            return r.trim() || (r = t), r = r.toLowerCase().trim(), "<a " + i('href="' + N[r] + '"') + ">" + t + "</a>"
        }), t = t.rp(/\n\[\^(.*?)\]:((?:.+?\n?)*)/g, function(e, t, r) {
            return t = t.toLowerCase().trim(), t in w ? "\n<div " + i('class="endnote"') + "><a " + i('name="endnote-' + t + '"') + "></a><sup>" + w[t] + "</sup> " + r + "</div>" : "\n"
        });
        var I = t.match(/<h([1-6])>(.*?)<\/h\1>/gi);
        I && I.forEach(function(e) {
            e = s(e.ss(4, e.length - 5)).trim();
            var r = "<a " + i('href="#' + o(e) + '"') + ">";
            t = t.rp(RegExp("(\\b" + b(e) + ")(?=\\s" + n("subsection") + "|\\s" + n("section") + ")", "gi"), r + "$1</a>")
        });
        var R = {},
            U = {};
        if (t = t.rp(RegExp(/($|>)\s*/.source + "(" + n("figure") + "|" + n("table") + "|" + n("listing") + "|" + n("diagram") + ")" + /\s+\[(.+?)\]:/.source, "gim"), function(t, r, n, a) {
                n = n.toLowerCase();
                var s = R[n] = (0 | R[n]) + 1,
                    a = n + "_" + o(a.toLowerCase().trim());
                return U[a] = s, r + e("a", "", i('name="' + a + '"')) + e("b", n[0].toUpperCase() + n.ss(1) + "&nbsp;" + s + ":", i('style="font-style:normal;"'))
            }), t = t.rp(/\b(figure|fig\.|table|tbl\.|listing|lst.)\s+\[(.+?)\]/gi, function(e, t, r) {
                var n = t.toLowerCase();
                switch (n) {
                    case "fig.":
                        n = "figure";
                        break;
                    case "tbl.":
                        n = "table";
                        break;
                    case "lst.":
                        n = "listing"
                }
                var r = n + "_" + o(r.toLowerCase().trim()),
                    a = U[r];
                return a ? "<a " + i('href="#' + r + '"') + ">" + t + "&nbsp;" + a + "</a>" : t + " ?"
            }), t = t.rp(/(?:<|(?!<)\b)(\w{3,6}:\/\/.+?)(?:$|>|(?=<)|(?=\s)(?!<))/g, function(e, t) {
                return "<a " + i('href="' + t + '" class="url"') + ">" + t + "</a>"
            }), !r) {
            var z = /^\s*(?:<\/p><p>\s*)<strong.*?>([^ \t\*].*?[^ \t\*])<\/strong>[ \t]*\n/.source,
                O = /([ {4,}\t][ \t]*\S.*\n)*/.source;
            t = t.rp(RegExp(z + O, "g"), function(t, r) {
                r = r.trim();
                var n = t.ss(t.indexOf("\n", t.indexOf("</strong>")));
                return n = n ? n.rp(/[ \t]*(\S.*?)\n/g, '<div class="subtitle"> $1 </div>\n') : "", e("title", s(r)) + '<div class="title"> ' + r + " </div>\n" + n + '<div class="afterTitles"></div>\n'
            })
        }
        if (t = t.rp(/^\s*<\/p>/, ""), !r) {
            var F = h(t, i);
            t = F[0];
            var q = F[1];
            t = t.rp(RegExp("\\b(" + n("sec") + "\\.|" + n("section") + "|" + n("subsection") + ")\\s\\[(.+?)\\]", "gi"), function(e, t, r) {
                var n = q[r.toLowerCase().trim()];
                return n ? t + "  <a " + i('href="#toc' + n + '"') + ">" + n + "</a>" : t + " ?"
            })
        }
        for (; t.indexOf(k) + 1;) t = t.rp(j, c);
        return '<span class="md">' + e("p", t) + "</span>"
    }

    function v(e) {
        var t = e.split("\n"),
            r = 0;
        t.forEach(function(e) {
            r = V(r, e.length)
        });
        var n = Array(r + 1).join(" "),
            a = "";
        return t.forEach(function(e) {
            a += e + n.ss(e.length) + "\n"
        }), a
    }

    function _(e) {
        var t = e.split("\n"),
            r = 1 / 0;
        if (t.forEach(function(e) {
                if ("" !== e.trim()) {
                    var t = e.match(/^([ \t]*)/);
                    t && (r = H(r, t[0].length))
                }
            }), 0 === r) return e;
        var n = "";
        return t.forEach(function(e) {
            n += e.ss(r) + "\n"
        }), n
    }

    function w(e) {
        var t = e.charCodeAt(0);
        return t >= 65 && 90 >= t || t >= 97 && 122 >= t
    }

    function C(e, t) {
        function r(e) {
            return F.indexOf(e) + 1
        }

        function n(e) {
            return -1 !== q.indexOf(e)
        }

        function i(e) {
            return r(e) || "." === e
        }

        function s(e) {
            return r(e) || "'" === e
        }

        function o(e) {
            return n(e) || "<" === e || b(e)
        }

        function c(e) {
            return n(e) || ">" === e || b(e)
        }

        function l(e) {
            return P.indexOf(e) + 1
        }

        function u(e) {
            return Z.indexOf(e) + 1
        }

        function d(e) {
            return "-" === e || r(e) || h(e)
        }

        function p(e) {
            return m(e) || h(e) || b(e)
        }

        function m(e) {
            return "|" === e || r(e)
        }

        function g(e) {
            return "/" === e || r(e)
        }

        function f(e) {
            return "\\" === e || r(e)
        }

        function h(e) {
            return O.indexOf(e) + 1
        }

        function b(e) {
            return z.indexOf(e) + 1
        }

        function x(e) {
            return K.indexOf(e) + 1
        }

        function y(e, t) {
            return this instanceof y ? (void 0 === t && (void 0 === e ? e = t = 0 : e instanceof y && (t = e.y, e = e.x)), this.x = e, this.y = t, void Object.seal(this)) : new y(e, t)
        }

        function _(e) {
            var t = function(r, n) {
                return void 0 === n && r instanceof y && (n = r.y, r = r.x), r >= 0 && t.width > r && n >= 0 && t.height > n ? e[n * (t.width + 1) + r] : " "
            };
            return t._used = [], t.width = e.indexOf("\n"), t.height = e.split("\n").length, "\n" === e[e.length - 1] && --t.height, t.s = function(e, r) {
                void 0 === r && e instanceof y && (r = e.y, e = e.x), e >= 0 && t.width > e && r >= 0 && t.height > r && (t._used[r * (t.width + 1) + e] = !0)
            }, t.u = function(e, t) {
                return void 0 === t && e instanceof y && (t = e.y, e = e.x), this._used[t * (this.width + 1) + e] === !0
            }, t.F = function(e, r) {
                void 0 === r && (r = e.x, e = e.x);
                var n = t(e, r - 1),
                    a = t(e, r),
                    o = t(e, r + 1),
                    c = t(e + 1, r - 1),
                    l = t(e - 1, r - 1);
                return m(a) ? i(n) || "^" === n || m(n) || h(n) || s(o) || "v" === o || m(o) || h(o) || b(n) || b(o) || "_" === t(e, r - 1) || "_" === l || "_" === c || (i(l) || i(c)) && (s(t(e - 1, r + 1)) || s(t(e + 1, r + 1))) : i(a) || "^" === a ? m(o) || h(o) && "." !== a : s(a) || "v" === a ? m(n) || h(n) && "'" !== a : b(a) ? m(n) || m(o) : !1
            }, t.G = function(e, r) {
                void 0 === r && (r = e.x, e = e.x);
                var a = t(e - 2, r),
                    i = t(e - 1, r),
                    s = t(e + 0, r),
                    l = t(e + 1, r),
                    u = t(e + 2, r);
                return d(s) || d(i) && h(s) ? d(i) ? d(l) || c(l) || d(a) || o(a) : o(i) ? d(l) : d(l) && (d(u) || c(u)) : "<" === s ? d(l) && d(u) : ">" === s ? d(i) && d(a) : n(s) ? d(i) && d(a) || d(l) && d(u) : !1
            }, t.H = function(e, r) {
                void 0 === r && (r = e.x, e = e.x);
                var a = t(e, r),
                    o = t(e - 1, r - 1),
                    c = t(e + 1, r + 1);
                return "\\" === a ? f(c) || s(c) || b(c) || "v" === c || f(o) || i(o) || b(o) || "^" === o || "/" === t(e, r - 1) || "/" === t(e, r + 1) || "_" === c || "_" === o : "." === a ? "\\" === c : "'" === a ? "\\" === o : "^" === a ? "\\" === c : "v" === a ? "\\" === o : n(a) || b(a) || "|" === a ? f(o) || f(c) : void 0
            }, t.I = function(e, r) {
                void 0 === r && (r = e.x, e = e.x);
                var a = t(e, r),
                    o = t(e - 1, r + 1),
                    c = t(e + 1, r - 1);
                return "/" !== a || "\\" !== t(e, r - 1) && "\\" !== t(e, r + 1) ? g(a) ? g(c) || i(c) || b(c) || "^" === c || "_" === c || g(o) || s(o) || b(o) || "v" === o || "_" === o : "." === a ? "/" === o : "'" === a ? "/" === c : "^" === a ? "/" === o : "v" === a ? "/" === c : n(a) || b(a) || "|" === a ? g(o) || g(c) : !1 : !0
            }, t.toString = function() {
                return e
            }, Object.freeze(t)
        }

        function C(e, t, r, n, a) {
            this.A = e, this.B = t, r && (this.C = r, this.D = n ? n : r), this.dashed = a || !1, Object.freeze(this)
        }

        function M() {
            this.$ = []
        }

        function N(e) {
            return function(t, r) {
                for (var n = 0; this.$.length > n; ++n)
                    if (e.call(this.$[n], t, r)) return !0;
                return !1
            }
        }

        function k() {
            this.ba = []
        }

        function S(e, t) {
            function r(t, r, n) {
                var a, i, s = G(r.x - t.x),
                    o = G(r.y - t.y);
                for (a = t.x, i = t.y; a !== r.x || i !== r.y; a += s, i += o)
                    if (e(a, i) === n) return !0;
                return e(a, i) === n
            }
            for (var a = 0; e.width > a; ++a)
                for (var o = 0; e.height > o; ++o)
                    if (e.F(a, o)) {
                        var c = y(a, o);
                        do e.s(a, o), ++o; while (e.F(a, o));
                        var l = y(a, o - 1),
                            u = e(c),
                            g = e(c.x, c.y - 1);
                        (!n(u) && ("-" === g || "_" === g || "_" === e(c.x - 1, c.y - 1) || "_" === e(c.x + 1, c.y - 1) || s(g)) || h(g)) && (c.y -= .5);
                        var f = e(l),
                            x = e(l.x, l.y + 1);
                        (!n(f) && ("-" === x || i(x)) || h(x) || "_" === e(l.x - 1, l.y) || "_" === e(l.x + 1, l.y)) && (l.y += .5), c.x === l.x && c.y === l.y || t.aa(new C(c, l))
                    } else "'" === e(a, o) && ("-" === e(a - 1, o) && "_" === e(a + 1, o - 1) && !p(e(a - 1, o - 1)) || "_" === e(a - 1, o - 1) && "-" === e(a + 1, o) && !p(e(a + 1, o - 1))) ? t.aa(new C(y(a, o - .5), y(a, o))) : "." === e(a, o) && ("_" === e(a - 1, o) && "-" === e(a + 1, o) && !p(e(a + 1, o + 1)) || "-" === e(a - 1, o) && "_" === e(a + 1, o) && !p(e(a - 1, o + 1))) && t.aa(new C(y(a, o), y(a, o + .5)));
            for (var o = 0; e.height > o; ++o)
                for (var a = 0; e.width > a; ++a)
                    if (e.G(a, o)) {
                        var c = y(a, o);
                        do e.s(a, o), ++a; while (e.G(a, o));
                        var l = y(a - 1, o);
                        !n(e(c.x - 1, c.y)) && (i(e(c)) && p(e(c.x - 1, c.y + 1)) || s(e(c)) && p(e(c.x - 1, c.y - 1))) && ++c.x, !n(e(l.x + 1, l.y)) && (i(e(l)) && p(e(l.x + 1, l.y + 1)) || s(e(l)) && p(e(l.x + 1, l.y - 1))) && --l.x, c.x === l.x && c.y === l.y || t.aa(new C(c, l))
                    }
            for (var v = -e.height; e.width > v; ++v)
                for (var a = v, o = 0; e.height > o; ++o, ++a)
                    if (e.H(a, o)) {
                        var c = y(a, o);
                        do ++a, ++o; while (e.H(a, o));
                        var l = y(a - 1, o - 1);
                        if (r(c, l, "\\")) {
                            for (var _ = c.x; l.x >= _; ++_) e.s(_, c.y + (_ - c.x));
                            var M = e(c),
                                u = e(c.x, c.y - 1),
                                N = e(c.x - 1, c.y - 1);
                            "/" === u || "_" === N || "_" === u || !n(M) && (d(N) || m(N)) ? (c.x -= .5, c.y -= .5) : b(N) && (c.x -= .25, c.y -= .25);
                            var k = (e(l), e(l.x + 1, l.y + 1));
                            "/" === e(l.x, l.y + 1) || "_" === e(l.x + 1, l.y) || "_" === e(l.x - 1, l.y) || !n(e(l)) && (d(k) || m(k)) ? (l.x += .5, l.y += .5) : b(k) && (l.x += .25, l.y += .25), t.aa(new C(c, l))
                        }
                    }
            for (var v = -e.height; e.width > v; ++v)
                for (var a = v, o = e.height - 1; o >= 0; --o, ++a)
                    if (e.I(a, o)) {
                        var c = y(a, o);
                        do ++a, --o; while (e.I(a, o));
                        var l = y(a - 1, o + 1);
                        if (r(c, l, "/")) {
                            for (var _ = c.x; l.x >= _; ++_) e.s(_, c.y - (_ - c.x));
                            var u = e(l.x, l.y - 1),
                                T = e(l.x + 1, l.y - 1);
                            e(l);
                            "\\" === u || "_" === u || "_" === T || !n(e(l)) && (d(T) || m(T)) ? (l.x += .5, l.y -= .5) : b(T) && (l.x += .25, l.y -= .25);
                            var A = e(c.x - 1, c.y + 1),
                                M = e(c);
                            "\\" === e(c.x, c.y + 1) || "_" === e(c.x - 1, c.y) || "_" === e(c.x + 1, c.y) || !n(e(c)) && (d(A) || m(A)) ? (c.x -= .5, c.y += .5) : b(A) && (c.x -= .25, c.y += .25), t.aa(new C(c, l))
                        }
                    }
            for (var o = 0; e.height > o; ++o)
                for (var a = 0; e.width > a; ++a) {
                    var E = e(a, o);
                    i(E) && (d(e(a - 1, o)) && m(e(a + 1, o + 1)) && (e.s(a - 1, o), e.s(a, o), e.s(a + 1, o + 1), t.aa(new C(y(a - 1, o), y(a + 1, o + 1), y(a + 1.1, o), y(a + 1, o + 1)))), d(e(a + 1, o)) && m(e(a - 1, o + 1)) && (e.s(a - 1, o + 1), e.s(a, o), e.s(a + 1, o), t.aa(new C(y(a + 1, o), y(a - 1, o + 1), y(a - 1.1, o), y(a - 1, o + 1))))), ")" !== E && !b(E) || "." !== e(a - 1, o - 1) || "'" !== e(a - 1, o + 1) || (e.s(a, o), e.s(a - 1, o - 1), e.s(a - 1, o + 1), t.aa(new C(y(a - 2, o - 1), y(a - 2, o + 1), y(a + .6, o - 1), y(a + .6, o + 1)))), "(" !== E && !b(E) || "." !== e(a + 1, o - 1) || "'" !== e(a + 1, o + 1) || (e.s(a, o), e.s(a + 1, o - 1), e.s(a + 1, o + 1), t.aa(new C(y(a + 2, o - 1), y(a + 2, o + 1), y(a - .6, o - 1), y(a - .6, o + 1)))), s(E) && (d(e(a - 1, o)) && m(e(a + 1, o - 1)) && (e.s(a - 1, o), e.s(a, o), e.s(a + 1, o - 1), t.aa(new C(y(a - 1, o), y(a + 1, o - 1), y(a + 1.1, o), y(a + 1, o - 1)))), d(e(a + 1, o)) && m(e(a - 1, o - 1)) && (e.s(a - 1, o - 1), e.s(a, o), e.s(a + 1, o), t.aa(new C(y(a + 1, o), y(a - 1, o - 1), y(a - 1.1, o), y(a - 1, o - 1)))))
                }
            for (var o = 0; e.height > o; ++o)
                for (var a = 0; e.width - 2 > a; ++a) {
                    var j = e(a - 1, o);
                    if (!("_" !== e(a, o) || "_" !== e(a + 1, o) || w(e(a + 2, o)) && "_" !== j || w(j) && "_" !== e(a + 2, o))) {
                        var S = e(a - 2, o),
                            c = y(a - .5, o + .5);
                        "|" === j || "|" === e(a - 1, o + 1) || "." === j || "'" === e(a - 1, o + 1) ? (c.x -= .5, "." !== j || "-" !== S && "." !== S || "(" !== e(a - 2, o + 1) || (c.x -= .5)) : "/" === j && (c.x -= 1), "(" === j && "(" === S && "'" === e(a, o + 1) && "." === e(a, o - 1) && (c.x += .5), j = S = void 0;
                        do e.s(a, o), ++a; while ("_" === e(a, o));
                        var l = y(a - .5, o + .5),
                            E = e(a, o),
                            B = e(a + 1, o),
                            f = e(a, o + 1);
                        "|" === E || "|" === f || "." === E || "'" === f ? (l.x += .5, "." !== E || "-" !== B && "." !== B || ")" !== e(a + 1, o + 1) || (l.x += .5)) : "\\" === E && (l.x += 1), ")" === E && ")" === B && "'" === e(a - 1, o + 1) && "." === e(a - 1, o - 1) && (l.x += -.5), t.aa(new C(c, l))
                    }
                }
        }

        function B(e, t, r) {
            function n(e) {
                return " " === e || /[^a-zA-Z0-9]|[ov]/.test(e)
            }

            function a(e, t, r, a) {
                return (n(t) || b(t)) && (n(e) || b(e)) && n(a) && n(r)
            }
            for (var i = 0; e.width > i; ++i)
                for (var s = 0; e.height > s; ++s) {
                    var o = e(i, s),
                        c = s;
                    if (h(o)) t.V(i, c - .5) && t.P(i, c + .5) && (r.aa(i, c, o), e.s(i, c));
                    else if (b(o)) {
                        var d = e(i, c - 1),
                            p = e(i, c + 1),
                            m = e(i - 1, c),
                            g = e(i + 1, c);
                        (t.X(i - 1, c) || t.W(i + 1, c) || t.V(i, c - 1) || t.P(i, c + 1) || t.P(i, c) || t.V(i, c) || a(d, p, m, g)) && (r.aa(i, c, o), e.s(i, c))
                    } else if (l(o)) r.aa(i, c, o), e.s(i, c);
                    else if (u(o)) r.aa(i, c, o), e.s(i, c);
                    else {
                        var f = 0;
                        ">" === o && (t.X(i, c) || t.Z(i, c)) ? (b(e(i + 1, c)) && (f = -.5), r.aa(i + f, c, ">", 0), e.s(i, c)) : "<" === o && (t.W(i, c) || t.Z(i, c)) ? (b(e(i - 1, c)) && (f = .5), r.aa(i + f, c, ">", 180), e.s(i, c)) : "^" === o ? t.P(i, c - .5) ? (r.aa(i, c - .5, ">", 270), e.s(i, c)) : t.P(i, c) ? (r.aa(i, c, ">", 270), e.s(i, c)) : t.R(i + .5, c - .5) ? (r.aa(i + .5, c - .5, ">", 270 + I), e.s(i, c)) : t.R(i + .25, c - .25) ? (r.aa(i + .25, c - .25, ">", 270 + I), e.s(i, c)) : t.R(i, c) ? (r.aa(i, c, ">", 270 + I), e.s(i, c)) : t.T(i, c) ? (r.aa(i, c, o, 270 - I), e.s(i, c)) : t.T(i - .5, c - .5) ? (r.aa(i - .5, c - .5, o, 270 - I), e.s(i, c)) : t.T(i - .25, c - .25) ? (r.aa(i - .25, c - .25, o, 270 - I), e.s(i, c)) : t.Y(i, c) && (r.aa(i, c - .5, ">", 270), e.s(i, c)) : "v" === o && (t.V(i, c + .5) ? (r.aa(i, c + .5, ">", 90), e.s(i, c)) : t.V(i, c) ? (r.aa(i, c, ">", 90), e.s(i, c)) : t.S(i, c) ? (r.aa(i, c, ">", 90 + I), e.s(i, c)) : t.S(i - .5, c + .5) ? (r.aa(i - .5, c + .5, ">", 90 + I), e.s(i, c)) : t.S(i - .25, c + .25) ? (r.aa(i - .25, c + .25, ">", 90 + I), e.s(i, c)) : t.U(i, c) ? (r.aa(i, c, ">", 90 - I), e.s(i, c)) : t.U(i + .5, c + .5) ? (r.aa(i + .5, c + .5, ">", 90 - I), e.s(i, c)) : t.U(i + .25, c + .25) ? (r.aa(i + .25, c + .25, ">", 90 - I), e.s(i, c)) : t.Y(i, c) && (r.aa(i, c + .5, ">", 90), e.s(i, c)))
                    }
                }
        }
        e = v(e);
        var D = "\ue004";
        e = e.rp(/([a-z]|[A-Z])o([a-z]|[A-Z])/g, "$1" + D + "$2");
        var $ = 8,
            L = 2,
            I = 180 * Math.atan(1 / L) / Math.PI,
            R = 1e-6,
            U = ">v<^",
            z = "o*",
            O = "()",
            F = "+",
            q = F + ".'",
            P = "\u2591\u2592\u2593\u2594\u2589",
            Z = "\u25e2\u25e3\u25e4\u25e5",
            K = U + z + O + P + Z;
        y.prototype.toString = y.prototype.toSVG = function() {
            return "" + this.x * $ + "," + this.y * $ * L + " "
        };
        var Q = C.prototype;
        Q.J = function() {
            return this.B.x === this.A.x
        }, Q.K = function() {
            return this.B.y === this.A.y
        }, Q.L = function() {
            var e = this.B.x - this.A.x,
                t = this.B.y - this.A.y;
            return W(t + e) < R
        }, Q.M = function() {
            var e = this.B.x - this.A.x,
                t = this.B.y - this.A.y;
            return W(t - e) < R
        }, Q.N = function() {
            return void 0 !== this.C
        }, Q.O = function(e, t) {
            return void 0 === t && (t = e.y, e = e.x), this.A.x === e && this.A.y === t || this.B.x === e && this.B.y === t
        }, Q.P = function(e, t) {
            return void 0 === t && (t = e.y, e = e.x), this.J() && this.A.x === e && H(this.A.y, this.B.y) === t
        }, Q.R = function(e, t) {
            return this.L() ? (void 0 === t && (t = e.y, e = e.x), this.B.y > this.A.y ? this.A.x === e && this.A.y === t : this.B.x === e && this.B.y === t) : !1
        }, Q.S = function(e, t) {
            return this.L() ? (void 0 === t && (t = e.y, e = e.x), this.A.y > this.B.y ? this.A.x === e && this.A.y === t : this.B.x === e && this.B.y === t) : !1
        }, Q.T = function(e, t) {
            return this.M() ? (void 0 === t && (t = e.y, e = e.x), this.B.y > this.A.y ? this.A.x === e && this.A.y === t : this.B.x === e && this.B.y === t) : !1
        }, Q.U = function(e, t) {
            return this.M() ? (void 0 === t && (t = e.y, e = e.x), this.A.y > this.B.y ? this.A.x === e && this.A.y === t : this.B.x === e && this.B.y === t) : !1
        }, Q.V = function(e, t) {
            return void 0 === t && (t = e.y, e = e.x), this.J() && this.A.x === e && V(this.A.y, this.B.y) === t
        }, Q.W = function(e, t) {
            return void 0 === t && (t = e.y, e = e.x), this.K() && this.A.y === t && H(this.A.x, this.B.x) === e
        }, Q.X = function(e, t) {
            return void 0 === t && (t = e.y, e = e.x), this.K() && this.A.y === t && V(this.A.x, this.B.x) === e
        }, Q.Y = function(e, t) {
            return void 0 === t && (t = e.y, e = e.x), this.J() && this.A.x === e && H(this.A.y, this.B.y) <= t && V(this.A.y, this.B.y) >= t
        }, Q.Z = function(e, t) {
            return void 0 === t && (t = e.y, e = e.x), this.K() && this.A.y === t && H(this.A.x, this.B.x) <= e && V(this.A.x, this.B.x) >= e
        }, Q.toSVG = function() {
            var e = '<path d="M ' + this.A;
            return e += this.N() ? "C " + this.C + this.D + this.B : "L " + this.B, e += '" style="fill:none;"', this.dashed && (e += ' stroke-dasharray="3,6"'), e += "/>"
        };
        var J = M.prototype;
        J.aa = function(e) {
            this.$.push(e)
        }, J.P = N(Q.P), J.R = N(Q.R), J.T = N(Q.T), J.S = N(Q.S), J.U = N(Q.U), J.V = N(Q.V), J.W = N(Q.W), J.X = N(Q.X), J.O = N(Q.O), J.Y = N(Q.Y), J.Z = N(Q.Z), J.toSVG = function() {
            for (var e = "", t = 0; this.$.length > t; ++t) e += this.$[t].toSVG() + "\n";
            return e
        };
        var X = k.prototype;
        X.aa = function(e, t, r, n) {
            void 0 === r && (r = t, t = e.y, e = e.x), !x(r);
            var a = {
                C: y(e, t),
                type: r,
                angle: n || 0
            };
            b(r) ? this.ba.push(a) : this.ba.unshift(a)
        }, X.toSVG = function() {
            for (var e = "", t = 0; this.ba.length > t; ++t) {
                var r = this.ba[t],
                    n = r.C;
                if (h(r.type)) {
                    var a = ")" === r.type ? .75 : -.75,
                        i = y(n.x, n.y - .5),
                        s = y(n.x, n.y + .5),
                        o = y(n.x + a, n.y - .5),
                        c = y(n.x + a, n.y + .5);
                    e += '<path d="M ' + s + " C " + c + o + i + '" style="fill:none;"/>'
                } else if (b(r.type)) e += '<circle cx="' + n.x * $ + '" cy="' + n.y * $ * L + '" r="' + ($ - j) + '" class="' + ("*" === r.type ? "closed" : "open") + 'dot"/>';
                else if (l(r.type)) {
                    var d = Math.round(63.75 * (3 - P.indexOf(r.type)));
                    e += '<rect x="' + (n.x - .5) * $ + '" y="' + (n.y - .5) * $ * L + '" width="' + $ + '" height="' + $ * L + '" fill="rgb(' + d + "," + d + "," + d + ')"/>'
                } else if (u(r.type)) {
                    var p = Z.indexOf(r.type),
                        m = .5 - (1 & p),
                        g = .5 - (p >> 1);
                    m *= G(g);
                    var f = y(n.x + m, n.y - g),
                        i = y(n.x + m, n.y + g),
                        s = y(n.x - m, n.y + g);
                    e += '<polygon points="' + f + i + s + '" style="stroke:none"/>\n'
                } else {
                    var f = y(n.x + 1, n.y),
                        i = y(n.x - .5, n.y - .35),
                        s = y(n.x - .5, n.y + .35);
                    e += '<polygon points="' + f + i + s + '"  style="stroke:none" transform="rotate(' + r.angle + "," + n + ')"/>\n'
                }
            }
            return e
        };
        var Y = _(e),
            ee = new M,
            te = new k;
        S(Y, ee), B(Y, ee, te);
        var re = '<svg class="diagram" xmlns="http://www.w3.org/2000/svg" version="1.1" height="' + (Y.height + 1) * $ * L + '" width="' + (Y.width + 1) * $ + '"';
        if ("floatleft" === t ? re += ' style="float:left;margin:15px 30px 15px 0;"' : "floatright" === t ? re += ' style="float:right;margin:15px 0 15px 30px;"' : "center" === t && (re += ' style="margin:0 auto 0 auto;"'), re += '><g transform="translate(' + y(1, 1) + ')">\n', T) {
            re += '<g style="opacity:0.1">\n';
            for (var ne = 0; Y.width > ne; ++ne)
                for (var ae = 0; Y.height > ae; ++ae) re += '<rect x="' + ((ne - .5) * $ + 1) + '" + y="' + ((ae - .5) * $ * L + 2) + '" width="' + ($ - 2) + '" height="' + ($ * L - 2) + '" style="fill:', re += Y.u(ne, ae) ? "red;" : " " === Y(ne, ae) ? "gray;opacity:0.05" : "blue;", re += '"/>\n';
            re += "</g>\n"
        }
        if (re += ee.toSVG(), re += te.toSVG(), !E) {
            re += '<g transform="translate(0,0)">';
            for (var ae = 0; Y.height > ae; ++ae)
                for (var ne = 0; Y.width > ne; ++ne) {
                    var ie = Y(ne, ae);
                    /[\u2B22\u2B21]/.test(ie) ? re += '<text text-anchor="middle" x="' + ne * $ + '" y="' + (4 + ae * $ * L) + '" style="font-size:20.5px">' + a(ie) + "</text>" : " " === ie || Y.u(ne, ae) || (re += '<text text-anchor="middle" x="' + ne * $ + '" y="' + (4 + ae * $ * L) + '">' + a(ie) + "</text>")
                }
            re += "</g>"
        }
        if (A) {
            re += '<g transform="translate(2,2)">\n';
            for (var ne = 0; Y.width > ne; ++ne)
                for (var ae = 0; Y.height > ae; ++ae) {
                    var ie = Y(ne, ae);
                    " " !== ie && (re += '<text text-anchor="middle" x="' + ne * $ + '" y="' + (4 + ae * $ * L) + '" style="fill:#F00;font-family:Menlo,monospace;font-size:12px;text-align:center">' + a(ie) + "</text>")
                }
            re += "</g>"
        }
        return re += "</g></svg>", re = re.rp(RegExp(D, "g"), "o")
    }

    function M(e) {
        return -1 !== e.search(/markdeep\S*?\.js$/i)
    }

    function N(e) {
        return Array.prototype.slice.call(e)
    }
    var k = String.prototype;
    k.rp = k.replace, k.ss = k.substring, k.regexIndexOf = function(e, t) {
        var r = this.ss(t || 0).search(e);
        return r >= 0 ? r + (t || 0) : r
    };
    var T = !1,
        A = T,
        E = A,
        j = 2,
        S = "*",
        B = Array(6).join(S),
        D = "Menlo,'Lucida Console',monospace",
        $ = 105.1316178 / t(D) + "px",
        L = e("style", 'body{max-width:680px;margin:auto;padding:20px;text-align:justify;line-height:140%; -webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;font-smoothing:antialiased;color:#222;font-family:Palatino,Georgia,"Times New Roman",serif}'),
        I = e("style", "body{counter-reset: h1 h2 h3 h4 h5 h6}.md code,pre{font-family:" + D + ";font-size:" + $ + ';line-height:140%}.md div.title{font-size:26px;font-weight:800;line-height:120%;text-align:center}.md div.afterTitles{height:10px}.md div.subtitle{text-align:center}.md .image{display:inline-block}.md div.imagecaption,.md div.tablecaption,.md div.listingcaption{margin:0.2em 0 10px;font-style:italic}.md div.imagecaption{margin-bottom:0}.md img{max-width:100%}li{text-align:left};.md div.tilde{margin:20px 0 -10px;text-align:center}.md blockquote.fancyquote{margin:25px 0 25px;text-align:left;line-height:160%}.md blockquote.fancyquote::before{content:"\u201c";color:#DDD;font-family:Times New Roman;font-size:45px;line-height:0;margin-right:6px;vertical-align:-0.3em}.md span.fancyquote{font-size:118%;color:#777;font-style:italic}.md span.fancyquote::after{content:"\u201d";font-style:normal;color:#DDD;font-family:Times New Roman;font-size:45px;line-height:0;margin-left:6px;vertical-align:-0.3em}.md blockquote.fancyquote .author{width:100%;margin-top:10px;display:inline-block;text-align:right}.md small{font-size:60%}.md div.title,contents,.md .tocHeader,h1,h2,h3,h4,h5,h6,.md .shortTOC,.md .mediumTOC,.nonumberh1,.nonumberh2,.nonumberh3,.nonumberh4,.nonumberh5,.nonumberh6{font-family:Verdana,Helvetica,Arial,sans-serif;margin:13.4px 0 13.4px;padding:15px 0 3px;border-top:none;clear:both}.md svg.diagram{display:block;font-family:' + D + ";font-size:" + $ + ";text-align:center;stroke-linecap:round;stroke-width:" + j + "px;stroke:#000;fill:#000}.md svg.diagram .opendot{fill:#FFF}.md svg.diagram text{stroke:none}.md a:link.url{font-family:Georgia,Palatino,'Times New Roman'}h1,.tocHeader,.nonumberh1{border-bottom:3px solid;font-size:20px;font-weight:bold;}h1,.nonumberh1{counter-reset: h2 h3 h4 h5 h6}h2,.nonumberh2{counter-reset: h3 h4 h5 h6;border-bottom:2px solid #999;color:#555;font-size:18px;}h3,h4,h5,h6,.nonumberh3,.nonumberh4,.nonumberh5,.nonumberh6{font-family:Helvetica,Arial,sans-serif;color:#555;font-size:16px;}h3{counter-reset:h4 h5 h6}h4{counter-reset:h5 h6}h5{counter-reset:h6}.md table{border-collapse:collapse;line-height:140%}.md table.table{margin:auto}.md table.calendar{width:100%;margin:auto;font-size:11px;font-family:Helvetica,Arial,sans-serif}.md table.calendar th{font-size:16px}.md .today{background:#ECF8FA}.md .calendar .parenthesized{color:#999;font-style:italic}.md div.tablecaption{text-align:center}.md table.table th{color:#FFF;background-color:#AAA;border:1px solid #888;padding:8px 15px 8px 15px}.md table.table td{padding:5px 15px 5px 15px;border:1px solid #888}.md table.table tr:nth-child(even){background:#EEE}.md pre.tilde{border-top: 1px solid #CCC;border-bottom: 1px solid #CCC;padding: 5px 0 5px 20px;margin:0 0 30px 0;background:#FCFCFC}.md a:link, .md a:visited{color:#38A;text-decoration:none}.md a:hover{text-decoration:underline}.md dt{font-weight:700}dl>.md dd{padding:0 0 18px}.md dl>table{margin:35px 0 30px}.md code{white-space:pre}.md .endnote{font-size:13px;line-height:15px;padding-left:10px;text-indent:-10px}.md .bib{padding-left:80px;text-indent:-80px;text-align:left}.markdeepFooter{font-size:9px;text-align:right;padding-top:80px;color:#999}.md .mediumTOC{float:right;font-size:12px;line-height:15px;border-left:1px solid #CCC;padding-left:15px;margin:15px 0px 15px 25px}.md .mediumTOC .level1{font-weight:600}.md .longTOC .level1{font-weight:600;display:block;padding-top:12px;margin:0 0 -20px}.md .shortTOC{text-align:center;font-weight:bold;margin-top:15px;font-size:14px}"),
        R = '<!-- Markdeep: --><style class="fallback">body{visibility:hidden;white-space:pre;font-family:monospace}</style><script src="markdeep.min.js"></script><script src="https://casual-effects.com/markdeep/latest/markdeep.min.js"></script><script>window.alreadyProcessedMarkdeep||(document.body.style.visibility="visible")</script>',
        U = '<div class="markdeepFooter"><i>formatted by <a href="http://casual-effects.com/markdeep" style="color:#999">Markdeep&nbsp;&nbsp;&nbsp;</a></i><div style="display:inline-block;font-size:13px;font-family:\'Times New Roman\',serif;vertical-align:middle;transform:translate(-3px,-1px)rotate(135deg);">&#x2712;</div></div>',
        z = {
            keyword: {
                table: "tableau",
                figure: "figure",
                g: "liste",
                diagram: "diagramme",
                sec: "sec",
                section: "section",
                subsection: "paragraphe",
                Monday: "lundi",
                Tuesday: "mardi",
                Wednesday: "mercredi",
                Thursday: "jeudi",
                Friday: "vendredi",
                Saturday: "samedi",
                Sunday: "dimanche",
                January: "Janvier",
                February: "F\xe9vrier",
                March: "Mars",
                April: "Avril",
                May: "Mai",
                June: "Juin",
                July: "Julliet",
                August: "Ao\xfbt",
                September: "Septembre",
                October: "Octobre",
                November: "Novembre",
                December: "D\xe9cembre",
                jan: "janv",
                feb: "f\xe9vr",
                mar: "mars",
                apr: "avril",
                may: "mai",
                jun: "juin",
                jul: "juil",
                aug: "ao\xfbt",
                sep: "sept",
                oct: "oct",
                nov: "nov",
                dec: "d\xe9c"
            }
        },
        O = {
            keyword: {
                table: "\u0442\u0430\u0431\u043b\u0438\u0446\u0430",
                figure: "\u0444\u0438\u0433\u0443\u0440\u0430",
                g: "\u0441\u043f\u0438\u0441\u044a\u043a",
                diagram: "\u0434\u0438\u0430\u0433\u0440\u0430\u043c\u0430",
                sec: "\u0441\u0435\u043a",
                section: "\u0440\u0430\u0437\u0434\u0435\u043b",
                subsection: "\u043f\u043e\u0434\u0440\u0430\u0437\u0434\u0435\u043b",
                Monday: "\u043f\u043e\u043d\u0435\u0434\u0435\u043b\u043d\u0438\u043a",
                Tuesday: "\u0432\u0442\u043e\u0440\u043d\u0438\u043a",
                Wednesday: "\u0441\u0440\u044f\u0434\u0430",
                Thursday: "\u0447\u0435\u0442\u0432\u044a\u0440\u0442\u044a\u043a",
                Friday: "\u043f\u0435\u0442\u044a\u043a",
                Saturday: "\u0441\u044a\u0431\u043e\u0442\u0430",
                Sunday: "\u043d\u0435\u0434\u0435\u043b\u044f",
                January: "\u044f\u043d\u0443\u0430\u0440\u0438",
                February: "\u0444\u0435\u0432\u0440\u0443\u0430\u0440\u0438",
                March: "\u043c\u0430\u0440\u0442",
                April: "\u0430\u043f\u0440\u0438\u043b",
                May: "\u043c\u0430\u0439",
                June: "\u044e\u043d\u0438",
                July: "\u044e\u043b\u0438",
                August: "\u0430\u0432\u0433\u0443\u0441\u0442",
                September: "\u0441\u0435\u043f\u0442\u0435\u043c\u0432\u0440\u0438",
                October: "\u043e\u043a\u0442\u043e\u043c\u0432\u0440\u0438",
                November: "\u043d\u043e\u0435\u043c\u0432\u0440\u0438",
                December: "\u0434\u0435\u043a\u0435\u043c\u0432\u0440\u0438",
                jan: "\u044f\u043d",
                feb: "\u0444\u0435\u0432\u0440",
                mar: "\u043c\u0430\u0440\u0442",
                apr: "\u0430\u043f\u0440",
                may: "\u043c\u0430\u0439",
                jun: "\u044e\u043d\u0438",
                jul: "\u044e\u043b\u0438",
                aug: "\u0430\u0432\u0433",
                sep: "\u0441\u0435\u043f\u0442",
                oct: "\u043e\u043a\u0442",
                nov: "\u043d\u043e\u0435\u043c",
                dec: "\u0434\u0435\u043a"
            }
        },
        F = {
            keyword: {
                table: "\u0442\u0430\u0431\u043b\u0438\u0446\u0430",
                figure: "\u0440\u0438\u0441\u0443\u043d\u043e\u043a",
                g: "\u043b\u0438\u0441\u0442\u0438\u043d\u0433",
                diagram: "\u0434\u0438\u0430\u0433\u0440\u0430\u043c\u043c\u0430",
                sec: "\u0441\u0435\u043a",
                section: "\u0440\u0430\u0437\u0434\u0435\u043b",
                subsection: "\u043f\u043e\u0434\u0440\u0430\u0437\u0434\u0435\u043b",
                Monday: "\u043f\u043e\u043d\u0435\u0434\u0435\u043b\u044c\u043d\u0438\u043a",
                Tuesday: "\u0432\u0442\u043e\u0440\u043d\u0438\u043a",
                Wednesday: "\u0441\u0440\u0435\u0434\u0430",
                Thursday: "\u0447\u0435\u0442\u0432\u0435\u0440\u0433",
                Friday: "\u043f\u044f\u0442\u043d\u0438\u0446\u0430",
                Saturday: "\u0441\u0443\u0431\u0431\u043e\u0442\u0430",
                Sunday: "\u0432\u043e\u0441\u043a\u0440\u0435\u0441\u0435\u043d\u044c\u0435",
                January: "\u044f\u043d\u0432\u0430\u0440\u044cr",
                February: "\u0444\u0435\u0432\u0440\u0430\u043b\u044c",
                March: "\u043c\u0430\u0440\u0442",
                April: "\u0430\u043f\u0440\u0435\u043b\u044c",
                May: "\u043c\u0430\u0439",
                June: "\u0438\u044e\u043d\u044c",
                July: "\u0438\u044e\u043b\u044c",
                August: "\u0430\u0432\u0433\u0443\u0441\u0442",
                September: "\u0441\u0435\u043d\u0442\u044f\u0431\u0440\u044c",
                October: "\u043e\u043a\u0442\u044f\u0431\u0440\u044c",
                November: "\u043d\u043e\u044f\u0431\u0440\u044c",
                December: "\u0434\u0435\u043a\u0430\u0431\u0440\u044c",
                jan: "\u044f\u043d\u0432",
                feb: "\u0444\u0435\u0432\u0440",
                mar: "\u043c\u0430\u0440\u0442",
                apr: "\u0430\u043f\u0440",
                may: "\u043c\u0430\u0439",
                jun: "\u0438\u044e\u043d\u044c",
                jul: "\u0438\u044e\u043b\u044c",
                aug: "\u0430\u0432\u0433",
                sep: "\u0441\u0435\u043d\u0442",
                oct: "\u043e\u043a\u0442",
                nov: "\u043d\u043e\u044f\u0431\u0440\u044c",
                dec: "\u0434\u0435\u043a"
            }
        },
        q = {
            mode: "markdeep",
            detectMath: !0,
            lang: {
                keyword: {}
            },
            tocStyle: "auto",
            hideEmptyWeekends: !0
        },
        P = {
            ru: F,
            fr: z,
            bg: O
        };
    [].slice.call(document.getElementsByTagName("meta")).forEach(function(e) {
        var t = e.getAttribute("lang");
        if (t) {
            var r = P[t];
            r && (q.lang = r)
        }
    });
    var V = Math.max,
        H = Math.min,
        W = Math.abs,
        G = Math.sign || function(e) {
            return +e === e ? 0 === e ? e : e > 0 ? 1 : -1 : NaN
        },
        Z = "<style>.hljs{display:block;overflow-x:auto;padding:0.5em;background:#fff;color:#000;-webkit-text-size-adjust:none}.hljs-comment{color:#006a00}.hljs-keyword{color:#02E}.hljs-literal,.nginx .hljs-title{color:#aa0d91}.method,.hljs-list .hljs-title,.hljs-tag .hljs-title,.setting .hljs-value,.hljs-winutils,.tex .hljs-command,.http .hljs-title,.hljs-request,.hljs-status,.hljs-name{color:#008}.hljs-envvar,.tex .hljs-special{color:#660}.hljs-string{color:#c41a16}.hljs-tag .hljs-value,.hljs-cdata,.hljs-filter .hljs-argument,.hljs-attr_selector,.apache .hljs-cbracket,.hljs-date,.hljs-regexp{color:#080}.hljs-sub .hljs-identifier,.hljs-pi,.hljs-tag,.hljs-tag .hljs-keyword,.hljs-decorator,.ini .hljs-title,.hljs-shebang,.hljs-prompt,.hljs-hexcolor,.hljs-rule .hljs-value,.hljs-symbol,.hljs-symbol .hljs-string,.hljs-number,.css .hljs-function,.hljs-function .hljs-title,.coffeescript .hljs-attribute{color:#A0C}.hljs-function .hljs-title{font-weight:bold;color:#000}.hljs-class .hljs-title,.smalltalk .hljs-class,.hljs-type,.hljs-typename,.hljs-tag .hljs-attribute,.hljs-doctype,.hljs-class .hljs-id,.hljs-built_in,.setting,.hljs-params,.clojure .hljs-attribute{color:#5c2699}.hljs-variable{color:#3f6e74}.css .hljs-tag,.hljs-rule .hljs-property,.hljs-pseudo,.hljs-subst{color:#000}.css .hljs-class,.css .hljs-id{color:#9b703f}.hljs-value .hljs-important{color:#ff7700;font-weight:bold}.hljs-rule .hljs-keyword{color:#c5af75}.hljs-annotation,.apache .hljs-sqbracket,.nginx .hljs-built_in{color:#9b859d}.hljs-preprocessor,.hljs-preprocessor *,.hljs-pragma{color:#643820}.tex .hljs-formula{background-color:#eee;font-style:italic}.diff .hljs-header,.hljs-chunk{color:#808080;font-weight:bold}.diff .hljs-change{background-color:#bccff9}.hljs-addition{background-color:#baeeba}.hljs-deletion{background-color:#ffc8bd}.hljs-comment .hljs-doctag{font-weight:bold}.method .hljs-id{color:#000}</style>";
    if (!window.alreadyProcessedMarkdeep) {
        window.alreadyProcessedMarkdeep = !0;
        var K = -1 !== window.location.href.search(/\?.*noformat.*/i);
        window.markdeep = Object.freeze({
            format: y,
            formatDiagram: C,
            stylesheet: function() {
                return I + c() + Z
            }
        });
        var Q = r("mode");
        switch (Q) {
            case "script":
                return;
            case "html":
            case "doxygen":
                return N(document.getElementsByClassName("diagram")).concat(N(document.getElementsByTagName("diagram"))).forEach(function(e) {
                    var t = i(e.innerHTML);
                    t = t.rp(/(:?^[ \t]*\n)|(:?\n[ \t]*)$/g, ""), "doxygen" === Q && (t = t.rp(RegExp("\u2013", "g"), "--"), t = t.rp(RegExp("\u2014", "g"), "---"), t = t.rp(/<a class="el" .*>(.*)<\/a>/g, "$1")), e.outerHTML = '<center class="md">' + C(_(t), "") + "</center>"
                }), N(document.getElementsByClassName("markdeep")).concat(N(document.getElementsByTagName("markdeep"))).forEach(function(e) {
                    var t = document.createElement("div");
                    t.innerHTML = y(_(i(e.innerHTML)), !0), e.parentNode.replaceChild(t, e)
                }), void(document.head.innerHTML = window.markdeep.stylesheet() + document.head.innerHTML)
        }
        K || (N(document.getElementsByTagName("script")).forEach(function(e) {
            M(e.src) && e.parentNode.removeChild(e)
        }), document.body.style.visibility = "hidden");
        var J = l(document.body);
        if (K) return J = J.rp(/<!-- Markdeep:.+$/gm, "") + R, J = J.rp(/</g, "&lt;").rp(/>/g, "&gt;"), void(document.body.innerHTML = e("pre", J));
        J = i(J), setTimeout(function() {
            var t = y(J, !1),
                n = r("detectMath") && (-1 !== t.search(/(?:\$\$[\s\S]+\$\$)|(?:\\begin{)/m) || -1 !== t.search(/\\\(.*\\\)/));
            if (n) {
                var i = "$$NC{\\n}{\\hat{n}}NC{\\w}{\\hat{\\omega}}NC{\\wi}{\\w_\\mathrm{i}}NC{\\wo}{\\w_\\mathrm{o}}NC{\\wh}{\\w_\\mathrm{h}}NC{\\Li}{L_\\mathrm{i}}NC{\\Lo}{L_\\mathrm{o}}NC{\\Le}{L_\\mathrm{e}}NC{\\Lr}{L_\\mathrm{r}}NC{\\Lt}{L_\\mathrm{t}}NC{\\O}{\\mathrm{O}}NC{\\degrees}{{^\\circ}}NC{\\T}{\\mathsf{T}}NC{\\mathset}[1]{\\mathbb{#1}}NC{\\Real}{\\mathset{R}}NC{\\Integer}{\\mathset{Z}}NC{\\Boolean}{\\mathset{B}}NC{\\Complex}{\\mathset{C}}$$\n".rp(/NC/g, "\\newcommand");
                t = '<script type="text/x-mathjax-config">MathJax.Hub.Config({ TeX: { equationNumbers: {autoNumber: "AMS"} } });</script><span style="display:none">' + i + "</span>\n" + t
            }
            t += U;
            var s = J.length > 1e3,
                o = L + I + c() + Z;
            if (s && (o += e("style", "div.title { padding-top: 40px; } div.afterTitles { height: 15px; }")), -1 !== window.location.href.search(/\?.*export.*/i)) {
                var l = '<meta charset="UTF-8"><meta http-equiv="content-type" content="text/html;charset=UTF-8">' + o + document.head.innerHTML + t;
                n && (l += '<script src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML"></script>'), document.body.innerHTML = e("code", a(l))
            } else if (document.head.innerHTML = '<meta charset="UTF-8"><meta http-equiv="content-type" content="text/html;charset=UTF-8">' + o + document.head.innerHTML, document.body.innerHTML = t, n) {
                var u = document.createElement("script");
                u.type = "text/javascript", u.src = "https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML", document.getElementsByTagName("head")[0].appendChild(u)
            }
            document.body.style.visibility = "visible"
        }, 0)
    }
}(), ! function(e) {
    var t = "object" == typeof window && window || "object" == typeof self && self;
    "undefined" != typeof exports ? e(exports) : t && (t.hljs = e({}), "function" == typeof define && define.amd && define([], function() {
        return t.hljs
    }))
}(function(e) {
    function t(e) {
        return e.replace(/[&<>]/gm, function(e) {
            return j[e]
        })
    }

    function r(e) {
        return e.nodeName.toLowerCase()
    }

    function n(e, t) {
        var r = e && e.exec(t);
        return r && 0 === r.index
    }

    function a(e) {
        return N.test(e)
    }

    function i(e) {
        var t, r, n, i, s = e.className + " ";
        if (s += e.parentNode ? e.parentNode.className : "", r = k.exec(s)) return v(r[1]) ? r[1] : "no-highlight";
        for (s = s.split(/\s+/), t = 0, n = s.length; n > t; t++)
            if (i = s[t], a(i) || v(i)) return i
    }

    function s(e, t) {
        var r, n = {};
        for (r in e) n[r] = e[r];
        if (t)
            for (r in t) n[r] = t[r];
        return n
    }

    function o(e) {
        var t = [];
        return function n(e, a) {
            for (var i = e.firstChild; i; i = i.nextSibling) 3 === i.nodeType ? a += i.nodeValue.length : 1 === i.nodeType && (t.push({
                event: "start",
                offset: a,
                node: i
            }), a = n(i, a), r(i).match(/br|hr|img|input/) || t.push({
                event: "stop",
                offset: a,
                node: i
            }));
            return a
        }(e, 0), t
    }

    function c(e, n, a) {
        function i() {
            return e.length && n.length ? e[0].offset !== n[0].offset ? n[0].offset > e[0].offset ? e : n : "start" === n[0].event ? e : n : e.length ? e : n
        }

        function s(e) {
            function n(e) {
                return " " + e.nodeName + '="' + t(e.value) + '"'
            }
            u += "<" + r(e) + _.map.call(e.attributes, n).join("") + ">"
        }

        function o(e) {
            u += "</" + r(e) + ">"
        }

        function c(e) {
            ("start" === e.event ? s : o)(e.node)
        }
        for (var l = 0, u = "", d = []; e.length || n.length;) {
            var p = i();
            if (u += t(a.substr(l, p[0].offset - l)), l = p[0].offset, p === e) {
                d.reverse().forEach(o);
                do c(p.splice(0, 1)[0]), p = i(); while (p === e && p.length && p[0].offset === l);
                d.reverse().forEach(s)
            } else "start" === p[0].event ? d.push(p[0].node) : d.pop(), c(p.splice(0, 1)[0])
        }
        return u + t(a.substr(l))
    }

    function l(e) {
        function t(e) {
            return e && e.source || e
        }

        function r(r, n) {
            return RegExp(t(r), "m" + (e.cI ? "i" : "") + (n ? "g" : ""))
        }

        function n(a, i) {
            if (!a.compiled) {
                if (a.compiled = !0, a.k = a.k || a.bK) {
                    var o = {},
                        c = function(t, r) {
                            e.cI && (r = r.toLowerCase()), r.split(" ").forEach(function(e) {
                                var r = e.split("|");
                                o[r[0]] = [t, r[1] ? +r[1] : 1]
                            })
                        };
                    "string" == typeof a.k ? c("keyword", a.k) : w(a.k).forEach(function(e) {
                        c(e, a.k[e])
                    }), a.k = o
                }
                a.lR = r(a.l || /\w+/, !0), i && (a.bK && (a.b = "\\b(" + a.bK.split(" ").join("|") + ")\\b"), a.b || (a.b = /\B|\b/), a.bR = r(a.b), a.e || a.eW || (a.e = /\B|\b/), a.e && (a.eR = r(a.e)), a.tE = t(a.e) || "", a.eW && i.tE && (a.tE += (a.e ? "|" : "") + i.tE)), a.i && (a.iR = r(a.i)), null == a.r && (a.r = 1), a.c || (a.c = []);
                var l = [];
                a.c.forEach(function(e) {
                    e.v ? e.v.forEach(function(t) {
                        l.push(s(e, t))
                    }) : l.push("self" === e ? a : e)
                }), a.c = l, a.c.forEach(function(e) {
                    n(e, a)
                }), a.starts && n(a.starts, i);
                var u = a.c.map(function(e) {
                    return e.bK ? "\\.?(" + e.b + ")\\.?" : e.b
                }).concat([a.tE, a.i]).map(t).filter(Boolean);
                a.t = u.length ? r(u.join("|"), !0) : {
                    exec: function() {
                        return null
                    }
                }
            }
        }
        n(e)
    }

    function u(e, r, a, i) {
        function s(e, t) {
            for (var r = 0; t.c.length > r; r++)
                if (n(t.c[r].bR, e)) return t.c[r]
        }

        function o(e, t) {
            if (n(e.eR, t)) {
                for (; e.endsParent && e.parent;) e = e.parent;
                return e
            }
            return e.eW ? o(e.parent, t) : void 0
        }

        function c(e, t) {
            return !a && n(t.iR, e)
        }

        function p(e, t) {
            var r = y.cI ? t[0].toLowerCase() : t[0];
            return e.k.hasOwnProperty(r) && e.k[r]
        }

        function m(e, t, r, n) {
            var a = n ? "" : E.classPrefix,
                i = '<span class="' + a,
                s = r ? "" : A;
            return i += e + '">', i + t + s
        }

        function g() {
            var e, r, n, a;
            if (!w.k) return t(k);
            for (a = "", r = 0, w.lR.lastIndex = 0, n = w.lR.exec(k); n;) a += t(k.substr(r, n.index - r)), e = p(w, n), e ? (T += e[1], a += m(e[0], t(n[0]))) : a += t(n[0]), r = w.lR.lastIndex, n = w.lR.exec(k);
            return a + t(k.substr(r))
        }

        function f() {
            var e = "string" == typeof w.sL;
            if (e && !C[w.sL]) return t(k);
            var r = e ? u(w.sL, k, !0, M[w.sL]) : d(k, w.sL.length ? w.sL : void 0);
            return w.r > 0 && (T += r.r), e && (M[w.sL] = r.top), m(r.language, r.value, !1, !0)
        }

        function h() {
            N += null != w.sL ? f() : g(), k = ""
        }

        function b(e) {
            N += e.cN ? m(e.cN, "", !0) : "", w = Object.create(e, {
                parent: {
                    value: w
                }
            })
        }

        function x(e, t) {
            if (k += e, null == t) return h(), 0;
            var r = s(t, w);
            if (r) return r.skip ? k += t : (r.eB && (k += t), h(), r.rB || r.eB || (k = t)), b(r, t), r.rB ? 0 : t.length;
            var n = o(w, t);
            if (n) {
                var a = w;
                a.skip ? k += t : (a.rE || a.eE || (k += t), h(), a.eE && (k = t));
                do w.cN && (N += A), w.skip || (T += w.r), w = w.parent; while (w !== n.parent);
                return n.starts && b(n.starts, ""), a.rE ? 0 : t.length
            }
            if (c(t, w)) throw Error('Illegal lexeme "' + t + '" for mode "' + (w.cN || "<unnamed>") + '"');
            return k += t, t.length || 1
        }
        var y = v(e);
        if (!y) throw Error('Unknown language: "' + e + '"');
        l(y);
        var _, w = i || y,
            M = {},
            N = "";
        for (_ = w; _ !== y; _ = _.parent) _.cN && (N = m(_.cN, "", !0) + N);
        var k = "",
            T = 0;
        try {
            for (var j, S, B = 0; w.t.lastIndex = B, j = w.t.exec(r), j;) S = x(r.substr(B, j.index - B), j[0]), B = j.index + S;
            for (x(r.substr(B)), _ = w; _.parent; _ = _.parent) _.cN && (N += A);
            return {
                r: T,
                value: N,
                language: e,
                top: w
            }
        } catch (D) {
            if (D.message && -1 !== D.message.indexOf("Illegal")) return {
                r: 0,
                value: t(r)
            };
            throw D
        }
    }

    function d(e, r) {
        r = r || E.languages || w(C);
        var n = {
                r: 0,
                value: t(e)
            },
            a = n;
        return r.filter(v).forEach(function(t) {
            var r = u(t, e, !1);
            r.language = t, r.r > a.r && (a = r), r.r > n.r && (a = n, n = r)
        }), a.language && (n.second_best = a), n
    }

    function p(e) {
        return E.tabReplace || E.useBR ? e.replace(T, function(e, t) {
            return E.useBR && "\n" === e ? "<br>" : E.tabReplace ? t.replace(/\t/g, E.tabReplace) : void 0
        }) : e
    }

    function m(e, t, r) {
        var n = t ? M[t] : r,
            a = [e.trim()];
        return e.match(/\bhljs\b/) || a.push("hljs"), -1 === e.indexOf(n) && a.push(n), a.join(" ").trim()
    }

    function g(e) {
        var t, r, n, s, l, g = i(e);
        a(g) || (E.useBR ? (t = document.createElementNS("http://www.w3.org/1999/xhtml", "div"), t.innerHTML = e.innerHTML.replace(/\n/g, "").replace(/<br[ \/]*>/g, "\n")) : t = e, l = t.textContent, n = g ? u(g, l, !0) : d(l), r = o(t), r.length && (s = document.createElementNS("http://www.w3.org/1999/xhtml", "div"), s.innerHTML = n.value, n.value = c(r, o(s), l)), n.value = p(n.value), e.innerHTML = n.value, e.className = m(e.className, g, n.language), e.result = {
            language: n.language,
            re: n.r
        }, n.second_best && (e.second_best = {
            language: n.second_best.language,
            re: n.second_best.r
        }))
    }

    function f(e) {
        E = s(E, e)
    }

    function h() {
        if (!h.called) {
            h.called = !0;
            var e = document.querySelectorAll("pre code");
            _.forEach.call(e, g)
        }
    }

    function b() {
        addEventListener("DOMContentLoaded", h, !1), addEventListener("load", h, !1)
    }

    function x(t, r) {
        var n = C[t] = r(e);
        n.aliases && n.aliases.forEach(function(e) {
            M[e] = t
        })
    }

    function y() {
        return w(C)
    }

    function v(e) {
        return e = (e || "").toLowerCase(), C[e] || C[M[e]]
    }
    var _ = [],
        w = Object.keys,
        C = {},
        M = {},
        N = /^(no-?highlight|plain|text)$/i,
        k = /\blang(?:uage)?-([\w-]+)\b/i,
        T = /((^(<[^>]+>|\t|)+|(?:\n)))/gm,
        A = "</span>",
        E = {
            classPrefix: "hljs-",
            tabReplace: null,
            useBR: !1,
            languages: void 0
        },
        j = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;"
        };
    return e.highlight = u, e.highlightAuto = d, e.fixMarkup = p, e.highlightBlock = g, e.configure = f, e.initHighlighting = h, e.initHighlightingOnLoad = b, e.ca = x, e.da = y, e.ea = v, e.inherit = s, e.IR = "[a-zA-Z]\\w*", e.UIR = "[a-zA-Z_]\\w*", e.NR = "\\b\\d+(\\.\\d+)?", e.CNR = "(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)", e.BNR = "\\b(0b[01]+)", e.RSR = "!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~", e.BE = {
        b: "\\\\[\\s\\S]",
        r: 0
    }, e.ASM = {
        cN: "string",
        b: "'",
        e: "'",
        i: "\\n",
        c: [e.BE]
    }, e.QSM = {
        cN: "string",
        b: '"',
        e: '"',
        i: "\\n",
        c: [e.BE]
    }, e.PWM = {
        b: /\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|like)\b/
    }, e.C = function(t, r, n) {
        var a = e.inherit({
            cN: "comment",
            b: t,
            e: r,
            c: []
        }, n || {});
        return a.c.push(e.PWM), a.c.push({
            cN: "doctag",
            b: "(?:TODO|FIXME|NOTE|BUG|XXX):",
            r: 0
        }), a
    }, e.CLCM = e.C("//", "$"), e.CBCM = e.C("/\\*", "\\*/"), e.HCM = e.C("#", "$"), e.NM = {
        cN: "number",
        b: e.NR,
        r: 0
    }, e.CNM = {
        cN: "number",
        b: e.CNR,
        r: 0
    }, e.BNM = {
        cN: "number",
        b: e.BNR,
        r: 0
    }, e.CSSNM = {
        cN: "number",
        b: e.NR + "(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",
        r: 0
    }, e.RM = {
        cN: "regexp",
        b: /\//,
        e: /\/[gimuy]*/,
        i: /\n/,
        c: [e.BE, {
            b: /\[/,
            e: /\]/,
            r: 0,
            c: [e.BE]
        }]
    }, e.TM = {
        cN: "title",
        b: e.IR,
        r: 0
    }, e.UTM = {
        cN: "title",
        b: e.UIR,
        r: 0
    }, e.METHOD_GUARD = {
        b: "\\.\\s*" + e.UIR,
        r: 0
    }, e
}), hljs.ca("lisp", function(e) {
    var t = "[a-zA-Z_\\-\\+\\*\\/\\<\\=\\>\\&\\#][a-zA-Z0-9_\\-\\+\\*\\/\\<\\=\\>\\&\\#!]*",
        r = "\\|[^]*?\\|",
        n = "(\\-|\\+)?\\d+(\\.\\d+|\\/\\d+)?((d|e|f|l|s|D|E|F|L|S)(\\+|\\-)?\\d+)?",
        a = {
            cN: "meta",
            b: "^#!",
            e: "$"
        },
        i = {
            cN: "literal",
            b: "\\b(t{1}|nil)\\b"
        },
        s = {
            cN: "number",
            v: [{
                b: n,
                r: 0
            }, {
                b: "#(b|B)[0-1]+(/[0-1]+)?"
            }, {
                b: "#(o|O)[0-7]+(/[0-7]+)?"
            }, {
                b: "#(x|X)[0-9a-fA-F]+(/[0-9a-fA-F]+)?"
            }, {
                b: "#(c|C)\\(" + n + " +" + n,
                e: "\\)"
            }]
        },
        o = e.inherit(e.QSM, {
            i: null
        }),
        c = e.C(";", "$", {
            r: 0
        }),
        l = {
            b: "\\*",
            e: "\\*"
        },
        u = {
            cN: "symbol",
            b: "[:&]" + t
        },
        d = {
            b: t,
            r: 0
        },
        p = {
            b: r
        },
        m = {
            b: "\\(",
            e: "\\)",
            c: ["self", i, o, s, d]
        },
        g = {
            c: [s, o, l, u, m, d],
            v: [{
                b: "['`]\\(",
                e: "\\)"
            }, {
                b: "\\(quote ",
                e: "\\)",
                k: {
                    name: "quote"
                }
            }, {
                b: "'" + r
            }]
        },
        f = {
            v: [{
                b: "'" + t
            }, {
                b: "#'" + t + "(::" + t + ")*"
            }]
        },
        h = {
            b: "\\(\\s*",
            e: "\\)"
        },
        b = {
            eW: !0,
            r: 0
        };
    return h.c = [{
        cN: "name",
        v: [{
            b: t
        }, {
            b: r
        }]
    }, b], b.c = [g, f, h, i, s, o, c, l, u, p, d], {
        i: /\S/,
        c: [s, a, i, o, c, g, f, h, d]
    }
}), hljs.ca("bash", function(e) {
    var t = {
            cN: "variable",
            v: [{
                b: /\$[\w\d#@][\w\d_]*/
            }, {
                b: /\$\{(.*?)}/
            }]
        },
        r = {
            cN: "string",
            b: /"/,
            e: /"/,
            c: [e.BE, t, {
                cN: "variable",
                b: /\$\(/,
                e: /\)/,
                c: [e.BE]
            }]
        },
        n = {
            cN: "string",
            b: /'/,
            e: /'/
        };
    return {
        aliases: ["sh", "zsh"],
        l: /-?[a-z\.]+/,
        k: {
            keyword: "if then else elif fi for while in do done case esac function",
            literal: "true false",
            built_in: "break cd continue eval exec exit export getopts hash pwd readonly return shift test times trap umask unset alias bind builtin caller command declare echo enable help let local logout mapfile printf read readarray source type typeset ulimit unalias set shopt autoload bg bindkey bye cap chdir clone comparguments compcall compctl compdescribe compfiles compgroups compquote comptags comptry compvalues dirs disable disown echotc echoti emulate fc fg float functions getcap getln history integer jobs kill limit log noglob popd print pushd pushln rehash sched setcap setopt stat suspend ttyctl unfunction unhash unlimit unsetopt vared wait whence where which zcompile zformat zftp zle zmodload zparseopts zprof zpty zregexparse zsocket zstyle ztcp",
            _: "-ne -eq -lt -gt -f -d -e -s -l -a"
        },
        c: [{
            cN: "meta",
            b: /^#![^\n]+sh\s*$/,
            r: 10
        }, {
            cN: "function",
            b: /\w[\w\d_]*\s*\(\s*\)\s*\{/,
            rB: !0,
            c: [e.inherit(e.TM, {
                b: /\w[\w\d_]*/
            })],
            r: 0
        }, e.HCM, r, n, t]
    }
}), hljs.ca("markdown", function(e) {
    return {
        aliases: ["md", "mkdown", "mkd"],
        c: [{
            cN: "section",
            v: [{
                b: "^#{1,6}",
                e: "$"
            }, {
                b: "^.+?\\n[=-]{2,}$"
            }]
        }, {
            b: "<",
            e: ">",
            sL: "xml",
            r: 0
        }, {
            cN: "bullet",
            b: "^([*+-]|(\\d+\\.))\\s+"
        }, {
            cN: "strong",
            b: "[*_]{2}.+?[*_]{2}"
        }, {
            cN: "emphasis",
            v: [{
                b: "\\*.+?\\*"
            }, {
                b: "_.+?_",
                r: 0
            }]
        }, {
            cN: "quote",
            b: "^>\\s+",
            e: "$"
        }, {
            cN: "code",
            v: [{
                b: "^```w*s*$",
                e: "^```s*$"
            }, {
                b: "`.+?`"
            }, {
                b: "^( {4}|	)",
                e: "$",
                r: 0
            }]
        }, {
            b: "^[-\\*]{3,}",
            e: "$"
        }, {
            b: "\\[.+?\\][\\(\\[].*?[\\)\\]]",
            rB: !0,
            c: [{
                cN: "string",
                b: "\\[",
                e: "\\]",
                eB: !0,
                rE: !0,
                r: 0
            }, {
                cN: "link",
                b: "\\]\\(",
                e: "\\)",
                eB: !0,
                eE: !0
            }, {
                cN: "symbol",
                b: "\\]\\[",
                e: "\\]",
                eB: !0,
                eE: !0
            }],
            r: 10
        }, {
            b: /^\[[^\n]+\]:/,
            rB: !0,
            c: [{
                cN: "symbol",
                b: /\[/,
                e: /\]/,
                eB: !0,
                eE: !0
            }, {
                cN: "link",
                b: /:\s*/,
                e: /$/,
                eB: !0
            }]
        }]
    }
}), hljs.ca("glsl", function(e) {
    return {
        k: {
            keyword: "break continue discard do else for if return whileattribute binding buffer ccw centroid centroid varying coherent column_major const cw depth_any depth_greater depth_less depth_unchanged early_fragment_tests equal_spacing flat fractional_even_spacing fractional_odd_spacing highp in index inout invariant invocations isolines layout line_strip lines lines_adjacency local_size_x local_size_y local_size_z location lowp max_vertices mediump noperspective offset origin_upper_left out packed patch pixel_center_integer point_mode points precise precision quads r11f_g11f_b10f r16 r16_snorm r16f r16i r16ui r32f r32i r32ui r8 r8_snorm r8i r8ui readonly restrict rg16 rg16_snorm rg16f rg16i rg16ui rg32f rg32i rg32ui rg8 rg8_snorm rg8i rg8ui rgb10_a2 rgb10_a2ui rgba16 rgba16_snorm rgba16f rgba16i rgba16ui rgba32f rgba32i rgba32ui rgba8 rgba8_snorm rgba8i rgba8ui row_major sample shared smooth std140 std430 stream triangle_strip triangles triangles_adjacency uniform varying vertices volatile writeonly",
            type: "atomic_uint bool bvec2 bvec3 bvec4 dmat2 dmat2x2 dmat2x3 dmat2x4 dmat3 dmat3x2 dmat3x3 dmat3x4 dmat4 dmat4x2 dmat4x3 dmat4x4 double dvec2 dvec3 dvec4 float iimage1D iimage1DArray iimage2D iimage2DArray iimage2DMS iimage2DMSArray iimage2DRect iimage3D iimageBufferiimageCube iimageCubeArray image1D image1DArray image2D image2DArray image2DMS image2DMSArray image2DRect image3D imageBuffer imageCube imageCubeArray int isampler1D isampler1DArray isampler2D isampler2DArray isampler2DMS isampler2DMSArray isampler2DRect isampler3D isamplerBuffer isamplerCube isamplerCubeArray ivec2 ivec3 ivec4 mat2 mat2x2 mat2x3 mat2x4 mat3 mat3x2 mat3x3 mat3x4 mat4 mat4x2 mat4x3 mat4x4 sampler1D sampler1DArray sampler1DArrayShadow sampler1DShadow sampler2D sampler2DArray sampler2DArrayShadow sampler2DMS sampler2DMSArray sampler2DRect sampler2DRectShadow sampler2DShadow sampler3D samplerBuffer samplerCube samplerCubeArray samplerCubeArrayShadow samplerCubeShadow image1D uimage1DArray uimage2D uimage2DArray uimage2DMS uimage2DMSArray uimage2DRect uimage3D uimageBuffer uimageCube uimageCubeArray uint usampler1D usampler1DArray usampler2D usampler2DArray usampler2DMS usampler2DMSArray usampler2DRect usampler3D samplerBuffer usamplerCube usamplerCubeArray uvec2 uvec3 uvec4 vec2 vec3 vec4 void",
            built_in: "gl_MaxAtomicCounterBindings gl_MaxAtomicCounterBufferSize gl_MaxClipDistances gl_MaxClipPlanes gl_MaxCombinedAtomicCounterBuffers gl_MaxCombinedAtomicCounters gl_MaxCombinedImageUniforms gl_MaxCombinedImageUnitsAndFragmentOutputs gl_MaxCombinedTextureImageUnits gl_MaxComputeAtomicCounterBuffers gl_MaxComputeAtomicCounters gl_MaxComputeImageUniforms gl_MaxComputeTextureImageUnits gl_MaxComputeUniformComponents gl_MaxComputeWorkGroupCount gl_MaxComputeWorkGroupSize gl_MaxDrawBuffers gl_MaxFragmentAtomicCounterBuffers gl_MaxFragmentAtomicCounters gl_MaxFragmentImageUniforms gl_MaxFragmentInputComponents gl_MaxFragmentInputVectors gl_MaxFragmentUniformComponents gl_MaxFragmentUniformVectors gl_MaxGeometryAtomicCounterBuffers gl_MaxGeometryAtomicCounters gl_MaxGeometryImageUniforms gl_MaxGeometryInputComponents gl_MaxGeometryOutputComponents gl_MaxGeometryOutputVertices gl_MaxGeometryTextureImageUnits gl_MaxGeometryTotalOutputComponents gl_MaxGeometryUniformComponents gl_MaxGeometryVaryingComponents gl_MaxImageSamples gl_MaxImageUnits gl_MaxLights gl_MaxPatchVertices gl_MaxProgramTexelOffset gl_MaxTessControlAtomicCounterBuffers gl_MaxTessControlAtomicCounters gl_MaxTessControlImageUniforms gl_MaxTessControlInputComponents gl_MaxTessControlOutputComponents gl_MaxTessControlTextureImageUnits gl_MaxTessControlTotalOutputComponents gl_MaxTessControlUniformComponents gl_MaxTessEvaluationAtomicCounterBuffers gl_MaxTessEvaluationAtomicCounters gl_MaxTessEvaluationImageUniforms gl_MaxTessEvaluationInputComponents gl_MaxTessEvaluationOutputComponents gl_MaxTessEvaluationTextureImageUnits gl_MaxTessEvaluationUniformComponents gl_MaxTessGenLevel gl_MaxTessPatchComponents gl_MaxTextureCoords gl_MaxTextureImageUnits gl_MaxTextureUnits gl_MaxVaryingComponents gl_MaxVaryingFloats gl_MaxVaryingVectors gl_MaxVertexAtomicCounterBuffers gl_MaxVertexAtomicCounters gl_MaxVertexAttribs gl_MaxVertexImageUniforms gl_MaxVertexOutputComponents gl_MaxVertexOutputVectors gl_MaxVertexTextureImageUnits gl_MaxVertexUniformComponents gl_MaxVertexUniformVectors gl_MaxViewports gl_MinProgramTexelOffset gl_BackColor gl_BackLightModelProduct gl_BackLightProduct gl_BackMaterial gl_BackSecondaryColor gl_ClipDistance gl_ClipPlane gl_ClipVertex gl_Color gl_DepthRange gl_EyePlaneQ gl_EyePlaneR gl_EyePlaneS gl_EyePlaneT gl_Fog gl_FogCoord gl_FogFragCoord gl_FragColor gl_FragCoord gl_FragData gl_FragDepth gl_FrontColor gl_FrontFacing gl_FrontLightModelProduct gl_FrontLightProduct gl_FrontMaterial gl_FrontSecondaryColor gl_GlobalInvocationID gl_InstanceID gl_InvocationID gl_Layer gl_LightModel gl_LightSource gl_LocalInvocationID gl_LocalInvocationIndex gl_ModelViewMatrix gl_ModelViewMatrixInverse gl_ModelViewMatrixInverseTranspose gl_ModelViewMatrixTranspose gl_ModelViewProjectionMatrix gl_ModelViewProjectionMatrixInverse gl_ModelViewProjectionMatrixInverseTranspose gl_ModelViewProjectionMatrixTranspose gl_MultiTexCoord0 gl_MultiTexCoord1 gl_MultiTexCoord2 gl_MultiTexCoord3 gl_MultiTexCoord4 gl_MultiTexCoord5 gl_MultiTexCoord6 gl_MultiTexCoord7 gl_Normal gl_NormalMatrix gl_NormalScale gl_NumSamples gl_NumWorkGroups gl_ObjectPlaneQ gl_ObjectPlaneR gl_ObjectPlaneS gl_ObjectPlaneT gl_PatchVerticesIn gl_Point gl_PointCoord gl_PointSize gl_Position gl_PrimitiveID gl_PrimitiveIDIn gl_ProjectionMatrix gl_ProjectionMatrixInverse gl_ProjectionMatrixInverseTranspose gl_ProjectionMatrixTranspose gl_SampleID gl_SampleMask gl_SampleMaskIn gl_SamplePosition gl_SecondaryColor gl_TessCoord gl_TessLevelInner gl_TessLevelOuter gl_TexCoord gl_TextureEnvColor gl_TextureMatrix gl_TextureMatrixInverse gl_TextureMatrixInverseTranspose gl_TextureMatrixTranspose gl_Vertex gl_VertexID gl_ViewportIndex gl_WorkGroupID gl_WorkGroupSize gl_in gl_out EmitStreamVertex EmitVertex EndPrimitive EndStreamPrimitive abs acos acosh all any asin asinh atan atanh atomicAdd atomicAnd atomicCompSwap atomicCounter atomicCounterDecrement atomicCounterIncrement atomicExchange atomicMax atomicMin atomicOr atomicXor barrier bitCount bitfieldExtract bitfieldInsert bitfieldReverse ceil clamp cos cosh cross dFdx dFdy degrees determinant distance dot equal exp exp2 faceforward findLSB findMSB floatBitsToInt floatBitsToUint floor fma fract frexp ftransform fwidth greaterThan greaterThanEqual groupMemoryBarrier imageAtomicAdd imageAtomicAnd imageAtomicCompSwap imageAtomicExchange imageAtomicMax imageAtomicMin imageAtomicOr imageAtomicXor imageLoad imageSize imageStore imulExtended intBitsToFloat interpolateAtCentroid interpolateAtOffset interpolateAtSample inverse inversesqrt isinf isnan ldexp length lessThan lessThanEqual log log2 matrixCompMult max memoryBarrier memoryBarrierAtomicCounter memoryBarrierBuffer memoryBarrierImage memoryBarrierShared min mix mod modf noise1 noise2 noise3 noise4 normalize not notEqual outerProduct packDouble2x32 packHalf2x16 packSnorm2x16 packSnorm4x8 packUnorm2x16 packUnorm4x8 pow radians reflect refract round roundEven shadow1D shadow1DLod shadow1DProj shadow1DProjLod shadow2D shadow2DLod shadow2DProj shadow2DProjLod sign sin sinh smoothstep sqrt step tan tanh texelFetch texelFetchOffset texture texture1D texture1DLod texture1DProj texture1DProjLod texture2D texture2DLod texture2DProj texture2DProjLod texture3D texture3DLod texture3DProj texture3DProjLod textureCube textureCubeLod textureGather textureGatherOffset textureGatherOffsets textureGrad textureGradOffset textureLod textureLodOffset textureOffset textureProj textureProjGrad textureProjGradOffset textureProjLod textureProjLodOffset textureProjOffset textureQueryLevels textureQueryLod textureSize transpose trunc uaddCarry uintBitsToFloat umulExtended unpackDouble2x32 unpackHalf2x16 unpackSnorm2x16 unpackSnorm4x8 unpackUnorm2x16 unpackUnorm4x8 usubBorrow",
            literal: "true false"
        },
        i: '"',
        c: [e.CLCM, e.CBCM, e.CNM, {
            cN: "meta",
            b: "#",
            e: "$"
        }]
    }
}), hljs.ca("cpp", function(e) {
    var t = {
            cN: "keyword",
            b: "\\b[a-z\\d_]*_t\\b"
        },
        r = {
            cN: "string",
            v: [{
                b: '(u8?|U)?L?"',
                e: '"',
                i: "\\n",
                c: [e.BE]
            }, {
                b: '(u8?|U)?R"',
                e: '"',
                c: [e.BE]
            }, {
                b: "'\\\\?.",
                e: "'",
                i: "."
            }]
        },
        n = {
            cN: "number",
            v: [{
                b: "\\b(0b[01'_]+)"
            }, {
                b: "\\b([\\d'_]+(\\.[\\d'_]*)?|\\.[\\d'_]+)(u|U|l|L|ul|UL|f|F|b|B)"
            }, {
                b: "(-?)(\\b0[xX][a-fA-F0-9'_]+|(\\b[\\d'_]+(\\.[\\d'_]*)?|\\.[\\d'_]+)([eE][-+]?[\\d'_]+)?)"
            }],
            r: 0
        },
        a = {
            cN: "meta",
            b: /#\s*[a-z]+\b/,
            e: /$/,
            k: {
                "meta-keyword": "if else elif endif define undef warning error line pragma ifdef ifndef include"
            },
            c: [{
                b: /\\\n/,
                r: 0
            }, e.inherit(r, {
                cN: "meta-string"
            }), {
                cN: "meta-string",
                b: "<",
                e: ">",
                i: "\\n"
            }, e.CLCM, e.CBCM]
        },
        i = e.IR + "\\s*\\(",
        s = {
            keyword: "int float while private char catch export virtual operator sizeof dynamic_cast|10 typedef const_cast|10 const struct for static_cast|10 union namespace unsigned long volatile static protected bool template mutable if public friend do goto auto void enum else break extern using class asm case typeid short reinterpret_cast|10 default double register explicit signed typename try this switch continue inline delete alignof constexpr decltype noexcept static_assert thread_local restrict _Bool complex _Complex _Imaginary atomic_bool atomic_char atomic_schar atomic_uchar atomic_short atomic_ushort atomic_int atomic_uint atomic_long atomic_ulong atomic_llong atomic_ullong new throw return",
            built_in: "std string cin cout cerr clog stdin stdout stderr stringstream istringstream ostringstream auto_ptr deque list queue stack vector map set bitset multiset multimap unordered_set unordered_map unordered_multiset unordered_multimap array shared_ptr abort abs acos asin atan2 atan calloc ceil cosh cos exit exp fabs floor fmod fprintf fputs free frexp fscanf isalnum isalpha iscntrl isdigit isgraph islower isprint ispunct isspace isupper isxdigit tolower toupper labs ldexp log10 log malloc realloc memchr memcmp memcpy memset modf pow printf putchar puts scanf sinh sin snprintf sprintf sqrt sscanf strcat strchr strcmp strcpy strcspn strlen strncat strncmp strncpy strpbrk strrchr strspn strstr tanh tan vfprintf vprintf vsprintf endl initializer_list unique_ptr",
            literal: "true false nullptr NULL"
        },
        o = [t, e.CLCM, e.CBCM, n, r];
    return {
        aliases: ["c", "cc", "h", "c++", "h++", "hpp"],
        k: s,
        i: "</",
        c: o.concat([a, {
            b: "\\b(deque|list|queue|stack|vector|map|set|bitset|multiset|multimap|unordered_map|unordered_set|unordered_multiset|unordered_multimap|array)\\s*<",
            e: ">",
            k: s,
            c: ["self", t]
        }, {
            b: e.IR + "::",
            k: s
        }, {
            v: [{
                b: /=/,
                e: /;/
            }, {
                b: /\(/,
                e: /\)/
            }, {
                bK: "new throw return else",
                e: /;/
            }],
            k: s,
            c: o.concat([{
                b: /\(/,
                e: /\)/,
                k: s,
                c: o.concat(["self"]),
                r: 0
            }]),
            r: 0
        }, {
            cN: "function",
            b: "(" + e.IR + "[\\*&\\s]+)+" + i,
            rB: !0,
            e: /[{;=]/,
            eE: !0,
            k: s,
            i: /[^\w\s\*&]/,
            c: [{
                b: i,
                rB: !0,
                c: [e.TM],
                r: 0
            }, {
                cN: "params",
                b: /\(/,
                e: /\)/,
                k: s,
                r: 0,
                c: [e.CLCM, e.CBCM, r, n, t]
            }, e.CLCM, e.CBCM, a]
        }]),
        exports: {
            preprocessor: a,
            strings: r,
            k: s
        }
    }
}), hljs.ca("php", function(e) {
    var t = {
            b: "\\$+[a-zA-Z_-\xff][a-zA-Z0-9_-\xff]*"
        },
        r = {
            cN: "meta",
            b: /<\?(php)?|\?>/
        },
        n = {
            cN: "string",
            c: [e.BE, r],
            v: [{
                b: 'b"',
                e: '"'
            }, {
                b: "b'",
                e: "'"
            }, e.inherit(e.ASM, {
                i: null
            }), e.inherit(e.QSM, {
                i: null
            })]
        },
        a = {
            v: [e.BNM, e.CNM]
        };
    return {
        aliases: ["php3", "php4", "php5", "php6"],
        cI: !0,
        k: "and include_once list abstract global private echo interface as static endswitch array null if endwhile or const for endforeach self var while isset public protected exit foreach throw elseif include __FILE__ empty require_once do xor return parent clone use __CLASS__ __LINE__ else break print eval new catch __METHOD__ case exception default die require __FUNCTION__ enddeclare final try switch continue endfor endif declare unset true false trait goto instanceof insteadof __DIR__ __NAMESPACE__ yield finally",
        c: [e.HCM, e.C("//", "$", {
            c: [r]
        }), e.C("/\\*", "\\*/", {
            c: [{
                cN: "doctag",
                b: "@[A-Za-z]+"
            }]
        }), e.C("__halt_compiler.+?;", !1, {
            eW: !0,
            k: "__halt_compiler",
            l: e.UIR
        }), {
            cN: "string",
            b: /<<<['"]?\w+['"]?$/,
            e: /^\w+;?$/,
            c: [e.BE, {
                cN: "subst",
                v: [{
                    b: /\$\w+/
                }, {
                    b: /\{\$/,
                    e: /\}/
                }]
            }]
        }, r, {
            cN: "keyword",
            b: /\$this\b/
        }, t, {
            b: /(::|->)+[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*/
        }, {
            cN: "function",
            bK: "function",
            e: /[;{]/,
            eE: !0,
            i: "\\$|\\[|%",
            c: [e.UTM, {
                cN: "params",
                b: "\\(",
                e: "\\)",
                c: ["self", t, e.CBCM, n, a]
            }]
        }, {
            cN: "class",
            bK: "class interface",
            e: "{",
            eE: !0,
            i: /[:\(\$"]/,
            c: [{
                bK: "extends implements"
            }, e.UTM]
        }, {
            bK: "namespace",
            e: ";",
            i: /[\.']/,
            c: [e.UTM]
        }, {
            bK: "use",
            e: ";",
            c: [e.UTM]
        }, {
            b: "=>"
        }, n, a]
    }
}), hljs.ca("css", function(e) {
    var t = "[a-zA-Z-][a-zA-Z0-9_-]*",
        r = {
            b: /[A-Z\_\.\-]+\s*:/,
            rB: !0,
            e: ";",
            eW: !0,
            c: [{
                cN: "attribute",
                b: /\S/,
                e: ":",
                eE: !0,
                starts: {
                    eW: !0,
                    eE: !0,
                    c: [{
                        b: /[\w-]+\(/,
                        rB: !0,
                        c: [{
                            cN: "built_in",
                            b: /[\w-]+/
                        }, {
                            b: /\(/,
                            e: /\)/,
                            c: [e.ASM, e.QSM]
                        }]
                    }, e.CSSNM, e.QSM, e.ASM, e.CBCM, {
                        cN: "number",
                        b: "#[0-9A-Fa-f]+"
                    }, {
                        cN: "meta",
                        b: "!important"
                    }]
                }
            }]
        };
    return {
        cI: !0,
        i: /[=\/|'\$]/,
        c: [e.CBCM, {
            cN: "selector-id",
            b: /#[A-Za-z0-9_-]+/
        }, {
            cN: "selector-class",
            b: /\.[A-Za-z0-9_-]+/
        }, {
            cN: "selector-attr",
            b: /\[/,
            e: /\]/,
            i: "$"
        }, {
            cN: "selector-pseudo",
            b: /:(:)?[a-zA-Z0-9\_\-\+\(\)"'.]+/
        }, {
            b: "@(font-face|page)",
            l: "[a-z-]+",
            k: "font-face page"
        }, {
            b: "@",
            e: "[{;]",
            i: /:/,
            c: [{
                cN: "keyword",
                b: /\w+/
            }, {
                b: /\s/,
                eW: !0,
                eE: !0,
                r: 0,
                c: [e.ASM, e.QSM, e.CSSNM]
            }]
        }, {
            cN: "selector-tag",
            b: t,
            r: 0
        }, {
            b: "{",
            e: "}",
            i: /\S/,
            c: [e.CBCM, r]
        }]
    }
}), hljs.ca("apache", function(e) {
    var t = {
        cN: "number",
        b: "[\\$%]\\d+"
    };
    return {
        aliases: ["apacheconf"],
        cI: !0,
        c: [e.HCM, {
            cN: "section",
            b: "</?",
            e: ">"
        }, {
            cN: "attribute",
            b: /\w+/,
            r: 0,
            k: {
                nomarkup: "order deny allow setenv rewriterule rewriteengine rewritecond documentroot sethandler errordocument loadmodule options header listen serverroot servername"
            },
            starts: {
                e: /$/,
                r: 0,
                k: {
                    literal: "on off all"
                },
                c: [{
                    cN: "meta",
                    b: "\\s\\[",
                    e: "\\]$"
                }, {
                    cN: "variable",
                    b: "[\\$%]\\{",
                    e: "\\}",
                    c: ["self", t]
                }, t, e.QSM]
            }
        }],
        i: /\S/
    }
}), hljs.ca("xml", function(e) {
    var t = "[A-Za-z0-9\\._:-]+",
        r = {
            eW: !0,
            i: /</,
            r: 0,
            c: [{
                cN: "attr",
                b: t,
                r: 0
            }, {
                b: /=\s*/,
                r: 0,
                c: [{
                    cN: "string",
                    endsParent: !0,
                    v: [{
                        b: /"/,
                        e: /"/
                    }, {
                        b: /'/,
                        e: /'/
                    }, {
                        b: /[^\s"'=<>`]+/
                    }]
                }]
            }]
        };
    return {
        aliases: ["html", "xhtml", "rss", "atom", "xjb", "xsd", "xsl", "plist"],
        cI: !0,
        c: [{
            cN: "meta",
            b: "<!DOCTYPE",
            e: ">",
            r: 10,
            c: [{
                b: "\\[",
                e: "\\]"
            }]
        }, e.C("<!--", "-->", {
            r: 10
        }), {
            b: "<\\!\\[CDATA\\[",
            e: "\\]\\]>",
            r: 10
        }, {
            b: /<\?(php)?/,
            e: /\?>/,
            sL: "php",
            c: [{
                b: "/\\*",
                e: "\\*/",
                skip: !0
            }]
        }, {
            cN: "tag",
            b: "<style(?=\\s|>|$)",
            e: ">",
            k: {
                name: "style"
            },
            c: [r],
            starts: {
                e: "</style>",
                rE: !0,
                sL: ["css", "xml"]
            }
        }, {
            cN: "tag",
            b: "<script(?=\\s|>|$)",
            e: ">",
            k: {
                name: "script"
            },
            c: [r],
            starts: {
                e: "</script>",
                rE: !0,
                sL: ["actionscript", "javascript", "handlebars", "xml"]
            }
        }, {
            cN: "meta",
            v: [{
                b: /<\?xml/,
                e: /\?>/,
                r: 10
            }, {
                b: /<\?\w+/,
                e: /\?>/
            }]
        }, {
            cN: "tag",
            b: "</?",
            e: "/?>",
            c: [{
                cN: "name",
                b: /[^\/><\s]+/,
                r: 0
            }, r]
        }]
    }
}), hljs.ca("objectivec", function(e) {
    var t = {
            cN: "built_in",
            b: "\\b(AV|CA|CF|CG|CI|CL|CM|CN|CT|MK|MP|MTK|MTL|NS|SCN|SK|UI|WK|XC)\\w+"
        },
        r = {
            keyword: "int float while char export sizeof typedef const struct for union unsigned long volatile static bool mutable if do return goto void enum else break extern asm case short default double register explicit signed typename this switch continue wchar_t inline readonly assign readwrite self @synchronized id typeof nonatomic super unichar IBOutlet IBAction strong weak copy in out inout bycopy byref oneway __strong __weak __block __autoreleasing @private @protected @public @try @property @end @throw @catch @finally @autoreleasepool @synthesize @dynamic @selector @optional @required @encode @package @import @defs @compatibility_alias __bridge __bridge_transfer __bridge_retained __bridge_retain __covariant __contravariant __kindof _Nonnull _Nullable _Null_unspecified __FUNCTION__ __PRETTY_FUNCTION__ __attribute__ getter setter retain unsafe_unretained nonnull nullable null_unspecified null_resettable class instancetype NS_DESIGNATED_INITIALIZER NS_UNAVAILABLE NS_REQUIRES_SUPER NS_RETURNS_INNER_POINTER NS_INLINE NS_AVAILABLE NS_DEPRECATED NS_ENUM NS_OPTIONS NS_SWIFT_UNAVAILABLE NS_ASSUME_NONNULL_BEGIN NS_ASSUME_NONNULL_END NS_REFINED_FOR_SWIFT NS_SWIFT_NAME NS_SWIFT_NOTHROW NS_DURING NS_HANDLER NS_ENDHANDLER NS_VALUERETURN NS_VOIDRETURN",
            literal: "false true FALSE TRUE nil YES NO NULL",
            built_in: "BOOL dispatch_once_t dispatch_queue_t dispatch_sync dispatch_async dispatch_once"
        },
        n = /[a-zA-Z@][a-zA-Z0-9_]*/,
        a = "@interface @class @protocol @implementation";
    return {
        aliases: ["mm", "objc", "obj-c"],
        k: r,
        l: n,
        i: "</",
        c: [t, e.CLCM, e.CBCM, e.CNM, e.QSM, {
            cN: "string",
            v: [{
                b: '@"',
                e: '"',
                i: "\\n",
                c: [e.BE]
            }, {
                b: "'",
                e: "[^\\\\]'",
                i: "[^\\\\][^']"
            }]
        }, {
            cN: "meta",
            b: "#",
            e: "$",
            c: [{
                cN: "meta-string",
                v: [{
                    b: '"',
                    e: '"'
                }, {
                    b: "<",
                    e: ">"
                }]
            }]
        }, {
            cN: "class",
            b: "(" + a.split(" ").join("|") + ")\\b",
            e: "({|$)",
            eE: !0,
            k: a,
            l: n,
            c: [e.UTM]
        }, {
            b: "\\." + e.UIR,
            r: 0
        }]
    }
}), hljs.ca("json", function(e) {
    var t = {
            literal: "true false null"
        },
        r = [e.QSM, e.CNM],
        n = {
            e: ",",
            eW: !0,
            eE: !0,
            c: r,
            k: t
        },
        a = {
            b: "{",
            e: "}",
            c: [{
                cN: "attr",
                b: /"/,
                e: /"/,
                c: [e.BE],
                i: "\\n"
            }, e.inherit(n, {
                b: /:/
            })],
            i: "\\S"
        },
        i = {
            b: "\\[",
            e: "\\]",
            c: [e.inherit(n)],
            i: "\\S"
        };
    return r.splice(r.length, 0, a, i), {
        c: r,
        k: t,
        i: "\\S"
    }
}), hljs.ca("coffeescript", function(e) {
    var t = {
            keyword: "in if for while finally new do return else break catch instanceof throw try this switch continue typeof delete debugger super then unless until loop of by when and or is isnt not",
            literal: "true false null undefined yes no on off",
            built_in: "npm require console print module global window document"
        },
        r = "[A-Za-z$_][0-9A-Za-z$_]*",
        n = {
            cN: "subst",
            b: /#\{/,
            e: /}/,
            k: t
        },
        a = [e.BNM, e.inherit(e.CNM, {
            starts: {
                e: "(\\s*/)?",
                r: 0
            }
        }), {
            cN: "string",
            v: [{
                b: /'''/,
                e: /'''/,
                c: [e.BE]
            }, {
                b: /'/,
                e: /'/,
                c: [e.BE]
            }, {
                b: /"""/,
                e: /"""/,
                c: [e.BE, n]
            }, {
                b: /"/,
                e: /"/,
                c: [e.BE, n]
            }]
        }, {
            cN: "regexp",
            v: [{
                b: "///",
                e: "///",
                c: [n, e.HCM]
            }, {
                b: "//[gim]*",
                r: 0
            }, {
                b: /\/(?![ *])(\\\/|.)*?\/[gim]*(?=\W|$)/
            }]
        }, {
            b: "@" + r
        }, {
            b: "`",
            e: "`",
            eB: !0,
            eE: !0,
            sL: "javascript"
        }];
    n.c = a;
    var i = e.inherit(e.TM, {
            b: r
        }),
        s = "(\\(.*\\))?\\s*\\B[-=]>",
        o = {
            cN: "params",
            b: "\\([^\\(]",
            rB: !0,
            c: [{
                b: /\(/,
                e: /\)/,
                k: t,
                c: ["self"].concat(a)
            }]
        };
    return {
        aliases: ["coffee", "cson", "iced"],
        k: t,
        i: /\/\*/,
        c: a.concat([e.C("###", "###"), e.HCM, {
            cN: "function",
            b: "^\\s*" + r + "\\s*=\\s*" + s,
            e: "[-=]>",
            rB: !0,
            c: [i, o]
        }, {
            b: /[:\(,=]\s*/,
            r: 0,
            c: [{
                cN: "function",
                b: s,
                e: "[-=]>",
                rB: !0,
                c: [o]
            }]
        }, {
            cN: "class",
            bK: "class",
            e: "$",
            i: /[:="\[\]]/,
            c: [{
                bK: "extends",
                eW: !0,
                i: /[:="\[\]]/,
                c: [i]
            }, i]
        }, {
            b: r + ":",
            e: ":",
            rB: !0,
            rE: !0,
            r: 0
        }])
    }
}), hljs.ca("javascript", function(e) {
    return {
        aliases: ["js", "jsx"],
        k: {
            keyword: "in of if for while finally var new function do return void else break catch instanceof with throw case default try this switch continue typeof delete let yield const export super debugger as async await static import from as",
            literal: "true false null undefined NaN Infinity",
            built_in: "eval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent encodeURI encodeURIComponent escape unescape Object Function Boolean Error EvalError InternalError RangeError ReferenceError StopIteration SyntaxError TypeError URIError Number Math Date String RegExp Array Float32Array Float64Array Int16Array Int32Array Int8Array Uint16Array Uint32Array Uint8Array Uint8ClampedArray ArrayBuffer DataView JSON Intl arguments require module console window document Symbol Set Map WeakSet WeakMap Proxy Reflect Promise"
        },
        c: [{
            cN: "meta",
            r: 10,
            b: /^\s*['"]use (strict|asm)['"]/
        }, {
            cN: "meta",
            b: /^#!/,
            e: /$/
        }, e.ASM, e.QSM, {
            cN: "string",
            b: "`",
            e: "`",
            c: [e.BE, {
                cN: "subst",
                b: "\\$\\{",
                e: "\\}"
            }]
        }, e.CLCM, e.CBCM, {
            cN: "number",
            v: [{
                b: "\\b(0[bB][01]+)"
            }, {
                b: "\\b(0[oO][0-7]+)"
            }, {
                b: e.CNR
            }],
            r: 0
        }, {
            b: "(" + e.RSR + "|\\b(case|return|throw)\\b)\\s*",
            k: "return throw case",
            c: [e.CLCM, e.CBCM, e.RM, {
                b: /</,
                e: /(\/\w+|\w+\/)>/,
                sL: "xml",
                c: [{
                    b: /<\w+\s*\/>/,
                    skip: !0
                }, {
                    b: /<\w+/,
                    e: /(\/\w+|\w+\/)>/,
                    skip: !0,
                    c: ["self"]
                }]
            }],
            r: 0
        }, {
            cN: "function",
            bK: "function",
            e: /\{/,
            eE: !0,
            c: [e.inherit(e.TM, {
                b: /[A-Za-z$_][0-9A-Za-z$_]*/
            }), {
                cN: "params",
                b: /\(/,
                e: /\)/,
                eB: !0,
                eE: !0,
                c: [e.CLCM, e.CBCM]
            }],
            i: /\[|%/
        }, {
            b: /\$[(.]/
        }, e.METHOD_GUARD, {
            cN: "class",
            bK: "class",
            e: /[{;=]/,
            eE: !0,
            i: /[:"\[\]]/,
            c: [{
                bK: "extends"
            }, e.UTM]
        }, {
            bK: "constructor",
            e: /\{/,
            eE: !0
        }],
        i: /#(?!!)/
    }
}), hljs.ca("java", function(e) {
    var t = e.UIR + "(<" + e.UIR + "(\\s*,\\s*" + e.UIR + ")*>)?",
        r = "false synchronized int abstract float private char boolean static null if const for true while long strictfp finally protected import native final void enum else break transient catch instanceof byte super volatile case assert short package default double public try this switch continue throws protected public private module requires exports",
        n = "\\b(0[bB]([01]+[01_]+[01]+|[01]+)|0[xX]([a-fA-F0-9]+[a-fA-F0-9_]+[a-fA-F0-9]+|[a-fA-F0-9]+)|(([\\d]+[\\d_]+[\\d]+|[\\d]+)(\\.([\\d]+[\\d_]+[\\d]+|[\\d]+))?|\\.([\\d]+[\\d_]+[\\d]+|[\\d]+))([eE][-+]?\\d+)?)[lLfF]?",
        a = {
            cN: "number",
            b: n,
            r: 0
        };
    return {
        aliases: ["jsp"],
        k: r,
        i: /<\/|#/,
        c: [e.C("/\\*\\*", "\\*/", {
            r: 0,
            c: [{
                b: /\w+@/,
                r: 0
            }, {
                cN: "doctag",
                b: "@[A-Za-z]+"
            }]
        }), e.CLCM, e.CBCM, e.ASM, e.QSM, {
            cN: "class",
            bK: "class interface",
            e: /[{;=]/,
            eE: !0,
            k: "class interface",
            i: /[:"\[\]]/,
            c: [{
                bK: "extends implements"
            }, e.UTM]
        }, {
            bK: "new throw return else",
            r: 0
        }, {
            cN: "function",
            b: "(" + t + "\\s+)+" + e.UIR + "\\s*\\(",
            rB: !0,
            e: /[{;=]/,
            eE: !0,
            k: r,
            c: [{
                b: e.UIR + "\\s*\\(",
                rB: !0,
                r: 0,
                c: [e.UTM]
            }, {
                cN: "params",
                b: /\(/,
                e: /\)/,
                k: r,
                r: 0,
                c: [e.ASM, e.QSM, e.CNM, e.CBCM]
            }, e.CLCM, e.CBCM]
        }, a, {
            cN: "meta",
            b: "@[A-Za-z]+"
        }]
    }
}), hljs.ca("tex", function(e) {
    var t = {
        cN: "tag",
        b: /\\/,
        r: 0,
        c: [{
            cN: "name",
            v: [{
                b: /[a-zA-Z\u0430-\u044f\u0410-\u044f]+[*]?/
            }, {
                b: /[^a-zA-Z\u0430-\u044f\u0410-\u044f0-9]/
            }],
            starts: {
                eW: !0,
                r: 0,
                c: [{
                    cN: "string",
                    v: [{
                        b: /\[/,
                        e: /\]/
                    }, {
                        b: /\{/,
                        e: /\}/
                    }]
                }, {
                    b: /\s*=\s*/,
                    eW: !0,
                    r: 0,
                    c: [{
                        cN: "number",
                        b: /-?\d*\.?\d+(pt|pc|mm|cm|in|dd|cc|ex|em)?/
                    }]
                }]
            }
        }]
    };
    return {
        c: [t, {
            cN: "formula",
            c: [t],
            r: 0,
            v: [{
                b: /\$\$/,
                e: /\$\$/
            }, {
                b: /\$/,
                e: /\$/
            }]
        }, e.C("%", "$", {
            r: 0
        })]
    }
}), hljs.ca("python", function(e) {
    var t = {
            cN: "meta",
            b: /^(>>>|\.\.\.) /
        },
        r = {
            cN: "string",
            c: [e.BE],
            v: [{
                b: /(u|b)?r?'''/,
                e: /'''/,
                c: [t],
                r: 10
            }, {
                b: /(u|b)?r?"""/,
                e: /"""/,
                c: [t],
                r: 10
            }, {
                b: /(u|r|ur)'/,
                e: /'/,
                r: 10
            }, {
                b: /(u|r|ur)"/,
                e: /"/,
                r: 10
            }, {
                b: /(b|br)'/,
                e: /'/
            }, {
                b: /(b|br)"/,
                e: /"/
            }, e.ASM, e.QSM]
        },
        n = {
            cN: "number",
            r: 0,
            v: [{
                b: e.BNR + "[lLjJ]?"
            }, {
                b: "\\b(0o[0-7]+)[lLjJ]?"
            }, {
                b: e.CNR + "[lLjJ]?"
            }]
        },
        a = {
            cN: "params",
            b: /\(/,
            e: /\)/,
            c: ["self", t, n, r]
        };
    return {
        aliases: ["py", "gyp"],
        k: {
            keyword: "and elif is global as in if from raise for except finally print import pass return exec else break not with class assert yield try while continue del or def lambda async await nonlocal|10 None True False",
            built_in: "Ellipsis NotImplemented"
        },
        i: /(<\/|->|\?)/,
        c: [t, n, r, e.HCM, {
            v: [{
                cN: "function",
                bK: "def",
                r: 10
            }, {
                cN: "class",
                bK: "class"
            }],
            e: /:/,
            i: /[${=;\n,]/,
            c: [e.UTM, a, {
                b: /->/,
                eW: !0,
                k: "None"
            }]
        }, {
            cN: "meta",
            b: /^[\t ]*@/,
            e: /$/
        }, {
            b: /\b(print|exec)\(/
        }]
    }
}), hljs.ca("ini", function(e) {
    var t = {
        cN: "string",
        c: [e.BE],
        v: [{
            b: "'''",
            e: "'''",
            r: 10
        }, {
            b: '"""',
            e: '"""',
            r: 10
        }, {
            b: '"',
            e: '"'
        }, {
            b: "'",
            e: "'"
        }]
    };
    return {
        aliases: ["toml"],
        cI: !0,
        i: /\S/,
        c: [e.C(";", "$"), e.HCM, {
            cN: "section",
            b: /^\s*\[+/,
            e: /\]+/
        }, {
            b: /^[a-z0-9\[\]_-]+\s*=\s*/,
            e: "$",
            rB: !0,
            c: [{
                cN: "attr",
                b: /[a-z0-9\[\]_-]+/
            }, {
                b: /=/,
                eW: !0,
                r: 0,
                c: [{
                    cN: "literal",
                    b: /\bon|off|true|false|yes|no\b/
                }, {
                    cN: "variable",
                    v: [{
                        b: /\$[\w\d"][\w\d_]*/
                    }, {
                        b: /\$\{(.*?)}/
                    }]
                }, t, {
                    cN: "number",
                    b: /([\+\-]+)?[\d]+_[\d_]+/
                }, e.NM]
            }]
        }]
    }
}), hljs.ca("http", function(e) {
    var t = "HTTP/[0-9\\.]+";
    return {
        aliases: ["https"],
        i: "\\S",
        c: [{
            b: "^" + t,
            e: "$",
            c: [{
                cN: "number",
                b: "\\b\\d{3}\\b"
            }]
        }, {
            b: "^[A-Z]+ (.*?) " + t + "$",
            rB: !0,
            e: "$",
            c: [{
                cN: "string",
                b: " ",
                e: " ",
                eB: !0,
                eE: !0
            }, {
                b: t
            }, {
                cN: "keyword",
                b: "[A-Z]+"
            }]
        }, {
            cN: "attribute",
            b: "^\\w",
            e: ": ",
            eE: !0,
            i: "\\n|\\s|=",
            starts: {
                e: "$",
                r: 0
            }
        }, {
            b: "\\n\\n",
            starts: {
                sL: [],
                eW: !0
            }
        }]
    }
}), hljs.ca("ruby", function(e) {
    var t = "[a-zA-Z_]\\w*[!?=]?|[-+~]\\@|<<|>>|=~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~`|]|\\[\\]=?",
        r = {
            keyword: "and then defined module in return redo if BEGIN retry end for self when next until do begin unless END rescue else break undef not super class case require yield alias while ensure elsif or include attr_reader attr_writer attr_accessor",
            literal: "true false nil"
        },
        n = {
            cN: "doctag",
            b: "@[A-Za-z]+"
        },
        a = {
            b: "#<",
            e: ">"
        },
        i = [e.C("#", "$", {
            c: [n]
        }), e.C("^\\=begin", "^\\=end", {
            c: [n],
            r: 10
        }), e.C("^__END__", "\\n$")],
        s = {
            cN: "subst",
            b: "#\\{",
            e: "}",
            k: r
        },
        o = {
            cN: "string",
            c: [e.BE, s],
            v: [{
                b: /'/,
                e: /'/
            }, {
                b: /"/,
                e: /"/
            }, {
                b: /`/,
                e: /`/
            }, {
                b: "%[qQwWx]?\\(",
                e: "\\)"
            }, {
                b: "%[qQwWx]?\\[",
                e: "\\]"
            }, {
                b: "%[qQwWx]?{",
                e: "}"
            }, {
                b: "%[qQwWx]?<",
                e: ">"
            }, {
                b: "%[qQwWx]?/",
                e: "/"
            }, {
                b: "%[qQwWx]?%",
                e: "%"
            }, {
                b: "%[qQwWx]?-",
                e: "-"
            }, {
                b: "%[qQwWx]?\\|",
                e: "\\|"
            }, {
                b: /\B\?(\\\d{1,3}|\\x[A-Fa-f0-9]{1,2}|\\u[A-Fa-f0-9]{4}|\\?\S)\b/
            }]
        },
        c = {
            cN: "params",
            b: "\\(",
            e: "\\)",
            endsParent: !0,
            k: r
        },
        l = [o, a, {
            cN: "class",
            bK: "class module",
            e: "$|;",
            i: /=/,
            c: [e.inherit(e.TM, {
                b: "[A-Za-z_]\\w*(::\\w+)*(\\?|\\!)?"
            }), {
                b: "<\\s*",
                c: [{
                    b: "(" + e.IR + "::)?" + e.IR
                }]
            }].concat(i)
        }, {
            cN: "function",
            bK: "def",
            e: "$|;",
            c: [e.inherit(e.TM, {
                b: t
            }), c].concat(i)
        }, {
            b: e.IR + "::"
        }, {
            cN: "symbol",
            b: e.UIR + "(\\!|\\?)?:",
            r: 0
        }, {
            cN: "symbol",
            b: ":(?!\\s)",
            c: [o, {
                b: t
            }],
            r: 0
        }, {
            cN: "number",
            b: "(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b",
            r: 0
        }, {
            b: "(\\$\\W)|((\\$|\\@\\@?)(\\w+))"
        }, {
            cN: "params",
            b: /\|/,
            e: /\|/,
            k: r
        }, {
            b: "(" + e.RSR + ")\\s*",
            c: [a, {
                cN: "regexp",
                c: [e.BE, s],
                i: /\n/,
                v: [{
                    b: "/",
                    e: "/[a-z]*"
                }, {
                    b: "%r{",
                    e: "}[a-z]*"
                }, {
                    b: "%r\\(",
                    e: "\\)[a-z]*"
                }, {
                    b: "%r!",
                    e: "![a-z]*"
                }, {
                    b: "%r\\[",
                    e: "\\][a-z]*"
                }]
            }].concat(i),
            r: 0
        }].concat(i);
    s.c = l, c.c = l;
    var u = "[>?]>",
        d = "[\\w#]+\\(\\w+\\):\\d+:\\d+>",
        p = "(\\w+-)?\\d+\\.\\d+\\.\\d(p\\d+)?[^>]+>",
        m = [{
            b: /^\s*=>/,
            starts: {
                e: "$",
                c: l
            }
        }, {
            cN: "meta",
            b: "^(" + u + "|" + d + "|" + p + ")",
            starts: {
                e: "$",
                c: l
            }
        }];
    return {
        aliases: ["rb", "gemspec", "podspec", "thor", "irb"],
        k: r,
        i: /\/\*/,
        c: i.concat(m).concat(l)
    }
}), hljs.ca("sql", function(e) {
    var t = e.C("--", "$");
    return {
        cI: !0,
        i: /[<>{}*#]/,
        c: [{
            bK: "begin end start commit rollback savepoint lock alter create drop rename call delete do handler insert load replace select truncate update set show pragma grant merge describe use explain help declare prepare execute deallocate release unlock purge reset change stop analyze cache flush optimize repair kill install uninstall checksum restore check backup revoke",
            e: /;/,
            eW: !0,
            l: /[\w\.]+/,
            k: {
                keyword: "",
                literal: "true false null",
                built_in: "array bigint binary bit blob boolean char character date dec decimal float int int8 integer interval number numeric real record serial serial8 smallint text varchar varying void"
            },
            c: [{
                cN: "string",
                b: "'",
                e: "'",
                c: [e.BE, {
                    b: "''"
                }]
            }, {
                cN: "string",
                b: '"',
                e: '"',
                c: [e.BE, {
                    b: '""'
                }]
            }, {
                cN: "string",
                b: "`",
                e: "`",
                c: [e.BE]
            }, e.CNM, e.CBCM, t]
        }, e.CBCM, t]
    }
}), hljs.ca("makefile", function(e) {
    var t = {
        cN: "variable",
        b: /\$\(/,
        e: /\)/,
        c: [e.BE]
    };
    return {
        aliases: ["mk", "mak"],
        c: [e.HCM, {
            b: /^\w+\s*\W*=/,
            rB: !0,
            r: 0,
            starts: {
                e: /\s*\W*=/,
                eE: !0,
                starts: {
                    e: /$/,
                    r: 0,
                    c: [t]
                }
            }
        }, {
            cN: "section",
            b: /^[\w]+:\s*$/
        }, {
            cN: "meta",
            b: /^\.PHONY:/,
            e: /$/,
            k: {
                "meta-keyword": ".PHONY"
            },
            l: /[\.\w]+/
        }, {
            b: /^\t+/,
            e: /$/,
            r: 0,
            c: [e.QSM, t]
        }]
    }
}), hljs.ca("perl", function(e) {
    var t = "getpwent getservent quotemeta msgrcv scalar kill dbmclose undef lc ma syswrite tr send umask sysopen shmwrite vec qx utime local oct semctl localtime readpipe do return format read sprintf dbmopen pop getpgrp not getpwnam rewinddir qqfileno qw endprotoent wait sethostent bless s|0 opendir continue each sleep endgrent shutdown dump chomp connect getsockname die socketpair close flock exists index shmgetsub for endpwent redo lstat msgctl setpgrp abs exit select print ref gethostbyaddr unshift fcntl syscall goto getnetbyaddr join gmtime symlink semget splice x|0 getpeername recv log setsockopt cos last reverse gethostbyname getgrnam study formline endhostent times chop length gethostent getnetent pack getprotoent getservbyname rand mkdir pos chmod y|0 substr endnetent printf next open msgsnd readdir use unlink getsockopt getpriority rindex wantarray hex system getservbyport endservent int chr untie rmdir prototype tell listen fork shmread ucfirst setprotoent else sysseek link getgrgid shmctl waitpid unpack getnetbyname reset chdir grep split require caller lcfirst until warn while values shift telldir getpwuid my getprotobynumber delete and sort uc defined srand accept package seekdir getprotobyname semop our rename seek if q|0 chroot sysread setpwent no crypt getc chown sqrt write setnetent setpriority foreach tie sin msgget map stat getlogin unless elsif truncate exec keys glob tied closedirioctl socket readlink eval xor readline binmode setservent eof ord bind alarm pipe atan2 getgrent exp time push setgrent gt lt or ne m|0 break given say state when",
        r = {
            cN: "subst",
            b: "[$@]\\{",
            e: "\\}",
            k: t
        },
        n = {
            b: "->{",
            e: "}"
        },
        a = {
            v: [{
                b: /\$\d/
            }, {
                b: /[\$%@](\^\w\b|#\w+(::\w+)*|{\w+}|\w+(::\w*)*)/
            }, {
                b: /[\$%@][^\s\w{]/,
                r: 0
            }]
        },
        i = [e.BE, r, a],
        s = [a, e.HCM, e.C("^\\=\\w", "\\=cut", {
            eW: !0
        }), n, {
            cN: "string",
            c: i,
            v: [{
                b: "q[qwxr]?\\s*\\(",
                e: "\\)",
                r: 5
            }, {
                b: "q[qwxr]?\\s*\\[",
                e: "\\]",
                r: 5
            }, {
                b: "q[qwxr]?\\s*\\{",
                e: "\\}",
                r: 5
            }, {
                b: "q[qwxr]?\\s*\\|",
                e: "\\|",
                r: 5
            }, {
                b: "q[qwxr]?\\s*\\<",
                e: "\\>",
                r: 5
            }, {
                b: "qw\\s+q",
                e: "q",
                r: 5
            }, {
                b: "'",
                e: "'",
                c: [e.BE]
            }, {
                b: '"',
                e: '"'
            }, {
                b: "`",
                e: "`",
                c: [e.BE]
            }, {
                b: "{\\w+}",
                c: [],
                r: 0
            }, {
                b: "-?\\w+\\s*\\=\\>",
                c: [],
                r: 0
            }]
        }, {
            cN: "number",
            b: "(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b",
            r: 0
        }, {
            b: "(\\/\\/|" + e.RSR + "|\\b(split|return|print|reverse|grep)\\b)\\s*",
            k: "split return print reverse grep",
            r: 0,
            c: [e.HCM, {
                cN: "regexp",
                b: "(s|tr|y)/(\\\\.|[^/])*/(\\\\.|[^/])*/[a-z]*",
                r: 10
            }, {
                cN: "regexp",
                b: "(m|qr)?/",
                e: "/[a-z]*",
                c: [e.BE],
                r: 0
            }]
        }, {
            cN: "function",
            bK: "sub",
            e: "(\\s*\\(.*?\\))?[;{]",
            eE: !0,
            r: 5,
            c: [e.TM]
        }, {
            b: "-\\w\\b",
            r: 0
        }, {
            b: "^__DATA__$",
            e: "^__END__$",
            sL: "mojolicious",
            c: [{
                b: "^@@.*",
                e: "$",
                cN: "comment"
            }]
        }];
    return r.c = s, n.c = s, {
        aliases: ["pl", "pm"],
        l: /[\w\.]+/,
        k: t,
        c: s
    }
}), hljs.ca("cs", function(e) {
    var t = {
            keyword: "abstract as base bool break byte case catch char checked const continue decimal dynamic default delegate do double else enum event explicit extern finally fixed float for foreach goto if implicit in int interface internal is lock long when object operator out override params private protected public readonly ref sbyte sealed short sizeof stackalloc static string struct switch this try typeof uint ulong unchecked unsafe ushort using virtual volatile void while async nameof ascending descending from get group into join let orderby partial select set value var where yield",
            literal: "null false true"
        },
        r = {
            cN: "string",
            b: '@"',
            e: '"',
            c: [{
                b: '""'
            }]
        },
        n = e.inherit(r, {
            i: /\n/
        }),
        a = {
            cN: "subst",
            b: "{",
            e: "}",
            k: t
        },
        i = e.inherit(a, {
            i: /\n/
        }),
        s = {
            cN: "string",
            b: /\$"/,
            e: '"',
            i: /\n/,
            c: [{
                b: "{{"
            }, {
                b: "}}"
            }, e.BE, i]
        },
        o = {
            cN: "string",
            b: /\$@"/,
            e: '"',
            c: [{
                b: "{{"
            }, {
                b: "}}"
            }, {
                b: '""'
            }, a]
        },
        c = e.inherit(o, {
            i: /\n/,
            c: [{
                b: "{{"
            }, {
                b: "}}"
            }, {
                b: '""'
            }, i]
        });
    a.c = [o, s, r, e.ASM, e.QSM, e.CNM, e.CBCM], i.c = [c, s, n, e.ASM, e.QSM, e.CNM, e.inherit(e.CBCM, {
        i: /\n/
    })];
    var l = {
            v: [o, s, r, e.ASM, e.QSM]
        },
        u = e.IR + "(<" + e.IR + ">)?(\\[\\])?";
    return {
        aliases: ["csharp"],
        k: t,
        i: /::/,
        c: [e.C("///", "$", {
            rB: !0,
            c: [{
                cN: "doctag",
                v: [{
                    b: "///",
                    r: 0
                }, {
                    b: "<!--|-->"
                }, {
                    b: "</?",
                    e: ">"
                }]
            }]
        }), e.CLCM, e.CBCM, {
            cN: "meta",
            b: "#",
            e: "$",
            k: {
                "meta-keyword": "if else elif endif define undef warning error line region endregion pragma checksum"
            }
        }, l, e.CNM, {
            bK: "class interface",
            e: /[{;=]/,
            i: /[^\s:]/,
            c: [e.TM, e.CLCM, e.CBCM]
        }, {
            bK: "namespace",
            e: /[{;=]/,
            i: /[^\s:]/,
            c: [e.inherit(e.TM, {
                b: "[a-zA-Z](\\.?\\w)*"
            }), e.CLCM, e.CBCM]
        }, {
            bK: "new return throw await",
            r: 0
        }, {
            cN: "function",
            b: "(" + u + "\\s+)+" + e.IR + "\\s*\\(",
            rB: !0,
            e: /[{;=]/,
            eE: !0,
            k: t,
            c: [{
                b: e.IR + "\\s*\\(",
                rB: !0,
                c: [e.TM],
                r: 0
            }, {
                cN: "params",
                b: /\(/,
                e: /\)/,
                eB: !0,
                eE: !0,
                k: t,
                r: 0,
                c: [l, e.CNM, e.CBCM]
            }, e.CLCM, e.CBCM]
        }]
    }
});
