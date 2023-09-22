var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? undefined : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator;i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};

// scripts/node_modules/@lit/reactive-element/css-tag.js
var t = window;
var e = t.ShadowRoot && (t.ShadyCSS === undefined || t.ShadyCSS.nativeShadow) && ("adoptedStyleSheets" in Document.prototype) && ("replace" in CSSStyleSheet.prototype);
var s = Symbol();
var n = new WeakMap;

class o {
  constructor(t2, e2, n2) {
    if (this._$cssResult$ = true, n2 !== s)
      throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t2, this.t = e2;
  }
  get styleSheet() {
    let t2 = this.o;
    const s2 = this.t;
    if (e && t2 === undefined) {
      const e2 = s2 !== undefined && s2.length === 1;
      e2 && (t2 = n.get(s2)), t2 === undefined && ((this.o = t2 = new CSSStyleSheet).replaceSync(this.cssText), e2 && n.set(s2, t2));
    }
    return t2;
  }
  toString() {
    return this.cssText;
  }
}
var r = (t2) => new o(typeof t2 == "string" ? t2 : t2 + "", undefined, s);
var S = (s2, n2) => {
  e ? s2.adoptedStyleSheets = n2.map((t2) => t2 instanceof CSSStyleSheet ? t2 : t2.styleSheet) : n2.forEach((e2) => {
    const n3 = document.createElement("style"), o2 = t.litNonce;
    o2 !== undefined && n3.setAttribute("nonce", o2), n3.textContent = e2.cssText, s2.appendChild(n3);
  });
};
var c = e ? (t2) => t2 : (t2) => t2 instanceof CSSStyleSheet ? ((t3) => {
  let e2 = "";
  for (const s2 of t3.cssRules)
    e2 += s2.cssText;
  return r(e2);
})(t2) : t2;

// scripts/node_modules/@lit/reactive-element/reactive-element.js
var s2;
var e2 = window;
var r2 = e2.trustedTypes;
var h = r2 ? r2.emptyScript : "";
var o2 = e2.reactiveElementPolyfillSupport;
var n2 = { toAttribute(t2, i2) {
  switch (i2) {
    case Boolean:
      t2 = t2 ? h : null;
      break;
    case Object:
    case Array:
      t2 = t2 == null ? t2 : JSON.stringify(t2);
  }
  return t2;
}, fromAttribute(t2, i2) {
  let s3 = t2;
  switch (i2) {
    case Boolean:
      s3 = t2 !== null;
      break;
    case Number:
      s3 = t2 === null ? null : Number(t2);
      break;
    case Object:
    case Array:
      try {
        s3 = JSON.parse(t2);
      } catch (t3) {
        s3 = null;
      }
  }
  return s3;
} };
var a = (t2, i2) => i2 !== t2 && (i2 == i2 || t2 == t2);
var l = { attribute: true, type: String, converter: n2, reflect: false, hasChanged: a };
var d = "finalized";

class u extends HTMLElement {
  constructor() {
    super(), this._$Ei = new Map, this.isUpdatePending = false, this.hasUpdated = false, this._$El = null, this._$Eu();
  }
  static addInitializer(t2) {
    var i2;
    this.finalize(), ((i2 = this.h) !== null && i2 !== undefined ? i2 : this.h = []).push(t2);
  }
  static get observedAttributes() {
    this.finalize();
    const t2 = [];
    return this.elementProperties.forEach((i2, s3) => {
      const e3 = this._$Ep(s3, i2);
      e3 !== undefined && (this._$Ev.set(e3, s3), t2.push(e3));
    }), t2;
  }
  static createProperty(t2, i2 = l) {
    if (i2.state && (i2.attribute = false), this.finalize(), this.elementProperties.set(t2, i2), !i2.noAccessor && !this.prototype.hasOwnProperty(t2)) {
      const s3 = typeof t2 == "symbol" ? Symbol() : "__" + t2, e3 = this.getPropertyDescriptor(t2, s3, i2);
      e3 !== undefined && Object.defineProperty(this.prototype, t2, e3);
    }
  }
  static getPropertyDescriptor(t2, i2, s3) {
    return { get() {
      return this[i2];
    }, set(e3) {
      const r3 = this[t2];
      this[i2] = e3, this.requestUpdate(t2, r3, s3);
    }, configurable: true, enumerable: true };
  }
  static getPropertyOptions(t2) {
    return this.elementProperties.get(t2) || l;
  }
  static finalize() {
    if (this.hasOwnProperty(d))
      return false;
    this[d] = true;
    const t2 = Object.getPrototypeOf(this);
    if (t2.finalize(), t2.h !== undefined && (this.h = [...t2.h]), this.elementProperties = new Map(t2.elementProperties), this._$Ev = new Map, this.hasOwnProperty("properties")) {
      const t3 = this.properties, i2 = [...Object.getOwnPropertyNames(t3), ...Object.getOwnPropertySymbols(t3)];
      for (const s3 of i2)
        this.createProperty(s3, t3[s3]);
    }
    return this.elementStyles = this.finalizeStyles(this.styles), true;
  }
  static finalizeStyles(i2) {
    const s3 = [];
    if (Array.isArray(i2)) {
      const e3 = new Set(i2.flat(1 / 0).reverse());
      for (const i3 of e3)
        s3.unshift(c(i3));
    } else
      i2 !== undefined && s3.push(c(i2));
    return s3;
  }
  static _$Ep(t2, i2) {
    const s3 = i2.attribute;
    return s3 === false ? undefined : typeof s3 == "string" ? s3 : typeof t2 == "string" ? t2.toLowerCase() : undefined;
  }
  _$Eu() {
    var t2;
    this._$E_ = new Promise((t3) => this.enableUpdating = t3), this._$AL = new Map, this._$Eg(), this.requestUpdate(), (t2 = this.constructor.h) === null || t2 === undefined || t2.forEach((t3) => t3(this));
  }
  addController(t2) {
    var i2, s3;
    ((i2 = this._$ES) !== null && i2 !== undefined ? i2 : this._$ES = []).push(t2), this.renderRoot !== undefined && this.isConnected && ((s3 = t2.hostConnected) === null || s3 === undefined || s3.call(t2));
  }
  removeController(t2) {
    var i2;
    (i2 = this._$ES) === null || i2 === undefined || i2.splice(this._$ES.indexOf(t2) >>> 0, 1);
  }
  _$Eg() {
    this.constructor.elementProperties.forEach((t2, i2) => {
      this.hasOwnProperty(i2) && (this._$Ei.set(i2, this[i2]), delete this[i2]);
    });
  }
  createRenderRoot() {
    var t2;
    const s3 = (t2 = this.shadowRoot) !== null && t2 !== undefined ? t2 : this.attachShadow(this.constructor.shadowRootOptions);
    return S(s3, this.constructor.elementStyles), s3;
  }
  connectedCallback() {
    var t2;
    this.renderRoot === undefined && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(true), (t2 = this._$ES) === null || t2 === undefined || t2.forEach((t3) => {
      var i2;
      return (i2 = t3.hostConnected) === null || i2 === undefined ? undefined : i2.call(t3);
    });
  }
  enableUpdating(t2) {
  }
  disconnectedCallback() {
    var t2;
    (t2 = this._$ES) === null || t2 === undefined || t2.forEach((t3) => {
      var i2;
      return (i2 = t3.hostDisconnected) === null || i2 === undefined ? undefined : i2.call(t3);
    });
  }
  attributeChangedCallback(t2, i2, s3) {
    this._$AK(t2, s3);
  }
  _$EO(t2, i2, s3 = l) {
    var e3;
    const r3 = this.constructor._$Ep(t2, s3);
    if (r3 !== undefined && s3.reflect === true) {
      const h2 = (((e3 = s3.converter) === null || e3 === undefined ? undefined : e3.toAttribute) !== undefined ? s3.converter : n2).toAttribute(i2, s3.type);
      this._$El = t2, h2 == null ? this.removeAttribute(r3) : this.setAttribute(r3, h2), this._$El = null;
    }
  }
  _$AK(t2, i2) {
    var s3;
    const e3 = this.constructor, r3 = e3._$Ev.get(t2);
    if (r3 !== undefined && this._$El !== r3) {
      const t3 = e3.getPropertyOptions(r3), h2 = typeof t3.converter == "function" ? { fromAttribute: t3.converter } : ((s3 = t3.converter) === null || s3 === undefined ? undefined : s3.fromAttribute) !== undefined ? t3.converter : n2;
      this._$El = r3, this[r3] = h2.fromAttribute(i2, t3.type), this._$El = null;
    }
  }
  requestUpdate(t2, i2, s3) {
    let e3 = true;
    t2 !== undefined && (((s3 = s3 || this.constructor.getPropertyOptions(t2)).hasChanged || a)(this[t2], i2) ? (this._$AL.has(t2) || this._$AL.set(t2, i2), s3.reflect === true && this._$El !== t2 && (this._$EC === undefined && (this._$EC = new Map), this._$EC.set(t2, s3))) : e3 = false), !this.isUpdatePending && e3 && (this._$E_ = this._$Ej());
  }
  async _$Ej() {
    this.isUpdatePending = true;
    try {
      await this._$E_;
    } catch (t3) {
      Promise.reject(t3);
    }
    const t2 = this.scheduleUpdate();
    return t2 != null && await t2, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var t2;
    if (!this.isUpdatePending)
      return;
    this.hasUpdated, this._$Ei && (this._$Ei.forEach((t3, i3) => this[i3] = t3), this._$Ei = undefined);
    let i2 = false;
    const s3 = this._$AL;
    try {
      i2 = this.shouldUpdate(s3), i2 ? (this.willUpdate(s3), (t2 = this._$ES) === null || t2 === undefined || t2.forEach((t3) => {
        var i3;
        return (i3 = t3.hostUpdate) === null || i3 === undefined ? undefined : i3.call(t3);
      }), this.update(s3)) : this._$Ek();
    } catch (t3) {
      throw i2 = false, this._$Ek(), t3;
    }
    i2 && this._$AE(s3);
  }
  willUpdate(t2) {
  }
  _$AE(t2) {
    var i2;
    (i2 = this._$ES) === null || i2 === undefined || i2.forEach((t3) => {
      var i3;
      return (i3 = t3.hostUpdated) === null || i3 === undefined ? undefined : i3.call(t3);
    }), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t2)), this.updated(t2);
  }
  _$Ek() {
    this._$AL = new Map, this.isUpdatePending = false;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$E_;
  }
  shouldUpdate(t2) {
    return true;
  }
  update(t2) {
    this._$EC !== undefined && (this._$EC.forEach((t3, i2) => this._$EO(i2, this[i2], t3)), this._$EC = undefined), this._$Ek();
  }
  updated(t2) {
  }
  firstUpdated(t2) {
  }
}
u[d] = true, u.elementProperties = new Map, u.elementStyles = [], u.shadowRootOptions = { mode: "open" }, o2 == null || o2({ ReactiveElement: u }), ((s2 = e2.reactiveElementVersions) !== null && s2 !== undefined ? s2 : e2.reactiveElementVersions = []).push("1.6.3");

// scripts/node_modules/lit-html/lit-html.js
var P = function(t2, i2) {
  if (!Array.isArray(t2) || !t2.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return e3 !== undefined ? e3.createHTML(i2) : i2;
};
var S2 = function(t2, i2, s3 = t2, e3) {
  var o3, n3, l2, h2;
  if (i2 === T)
    return i2;
  let r3 = e3 !== undefined ? (o3 = s3._$Co) === null || o3 === undefined ? undefined : o3[e3] : s3._$Cl;
  const u2 = d2(i2) ? undefined : i2._$litDirective$;
  return (r3 == null ? undefined : r3.constructor) !== u2 && ((n3 = r3 == null ? undefined : r3._$AO) === null || n3 === undefined || n3.call(r3, false), u2 === undefined ? r3 = undefined : (r3 = new u2(t2), r3._$AT(t2, s3, e3)), e3 !== undefined ? ((l2 = (h2 = s3)._$Co) !== null && l2 !== undefined ? l2 : h2._$Co = [])[e3] = r3 : s3._$Cl = r3), r3 !== undefined && (i2 = S2(t2, r3._$AS(t2, i2.values), r3, e3)), i2;
};
var t2;
var i2 = window;
var s3 = i2.trustedTypes;
var e3 = s3 ? s3.createPolicy("lit-html", { createHTML: (t3) => t3 }) : undefined;
var o3 = "$lit$";
var n3 = `lit\$${(Math.random() + "").slice(9)}\$`;
var l2 = "?" + n3;
var h2 = `<${l2}>`;
var r3 = document;
var u2 = () => r3.createComment("");
var d2 = (t3) => t3 === null || typeof t3 != "object" && typeof t3 != "function";
var c2 = Array.isArray;
var v = (t3) => c2(t3) || typeof (t3 == null ? undefined : t3[Symbol.iterator]) == "function";
var a2 = "[ \t\n\f\r]";
var f = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
var _ = /-->/g;
var m = />/g;
var p = RegExp(`>|${a2}(?:([^\\s"'>=/]+)(${a2}*=${a2}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|\$)`, "g");
var g = /'/g;
var $ = /"/g;
var y = /^(?:script|style|textarea|title)$/i;
var w = (t3) => (i3, ...s4) => ({ _$litType$: t3, strings: i3, values: s4 });
var x = w(1);
var b = w(2);
var T = Symbol.for("lit-noChange");
var A = Symbol.for("lit-nothing");
var E = new WeakMap;
var C = r3.createTreeWalker(r3, 129, null, false);
var V = (t3, i3) => {
  const s4 = t3.length - 1, e4 = [];
  let l3, r4 = i3 === 2 ? "<svg>" : "", u3 = f;
  for (let i4 = 0;i4 < s4; i4++) {
    const s5 = t3[i4];
    let d3, c3, v2 = -1, a3 = 0;
    for (;a3 < s5.length && (u3.lastIndex = a3, c3 = u3.exec(s5), c3 !== null); )
      a3 = u3.lastIndex, u3 === f ? c3[1] === "!--" ? u3 = _ : c3[1] !== undefined ? u3 = m : c3[2] !== undefined ? (y.test(c3[2]) && (l3 = RegExp("</" + c3[2], "g")), u3 = p) : c3[3] !== undefined && (u3 = p) : u3 === p ? c3[0] === ">" ? (u3 = l3 != null ? l3 : f, v2 = -1) : c3[1] === undefined ? v2 = -2 : (v2 = u3.lastIndex - c3[2].length, d3 = c3[1], u3 = c3[3] === undefined ? p : c3[3] === '"' ? $ : g) : u3 === $ || u3 === g ? u3 = p : u3 === _ || u3 === m ? u3 = f : (u3 = p, l3 = undefined);
    const w2 = u3 === p && t3[i4 + 1].startsWith("/>") ? " " : "";
    r4 += u3 === f ? s5 + h2 : v2 >= 0 ? (e4.push(d3), s5.slice(0, v2) + o3 + s5.slice(v2) + n3 + w2) : s5 + n3 + (v2 === -2 ? (e4.push(undefined), i4) : w2);
  }
  return [P(t3, r4 + (t3[s4] || "<?>") + (i3 === 2 ? "</svg>" : "")), e4];
};

class N {
  constructor({ strings: t3, _$litType$: i3 }, e4) {
    let h3;
    this.parts = [];
    let r4 = 0, d3 = 0;
    const c3 = t3.length - 1, v2 = this.parts, [a3, f2] = V(t3, i3);
    if (this.el = N.createElement(a3, e4), C.currentNode = this.el.content, i3 === 2) {
      const t4 = this.el.content, i4 = t4.firstChild;
      i4.remove(), t4.append(...i4.childNodes);
    }
    for (;(h3 = C.nextNode()) !== null && v2.length < c3; ) {
      if (h3.nodeType === 1) {
        if (h3.hasAttributes()) {
          const t4 = [];
          for (const i4 of h3.getAttributeNames())
            if (i4.endsWith(o3) || i4.startsWith(n3)) {
              const s4 = f2[d3++];
              if (t4.push(i4), s4 !== undefined) {
                const t5 = h3.getAttribute(s4.toLowerCase() + o3).split(n3), i5 = /([.?@])?(.*)/.exec(s4);
                v2.push({ type: 1, index: r4, name: i5[2], strings: t5, ctor: i5[1] === "." ? H : i5[1] === "?" ? L : i5[1] === "@" ? z : k });
              } else
                v2.push({ type: 6, index: r4 });
            }
          for (const i4 of t4)
            h3.removeAttribute(i4);
        }
        if (y.test(h3.tagName)) {
          const t4 = h3.textContent.split(n3), i4 = t4.length - 1;
          if (i4 > 0) {
            h3.textContent = s3 ? s3.emptyScript : "";
            for (let s4 = 0;s4 < i4; s4++)
              h3.append(t4[s4], u2()), C.nextNode(), v2.push({ type: 2, index: ++r4 });
            h3.append(t4[i4], u2());
          }
        }
      } else if (h3.nodeType === 8)
        if (h3.data === l2)
          v2.push({ type: 2, index: r4 });
        else {
          let t4 = -1;
          for (;(t4 = h3.data.indexOf(n3, t4 + 1)) !== -1; )
            v2.push({ type: 7, index: r4 }), t4 += n3.length - 1;
        }
      r4++;
    }
  }
  static createElement(t3, i3) {
    const s4 = r3.createElement("template");
    return s4.innerHTML = t3, s4;
  }
}

class M {
  constructor(t3, i3) {
    this._$AV = [], this._$AN = undefined, this._$AD = t3, this._$AM = i3;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t3) {
    var i3;
    const { el: { content: s4 }, parts: e4 } = this._$AD, o4 = ((i3 = t3 == null ? undefined : t3.creationScope) !== null && i3 !== undefined ? i3 : r3).importNode(s4, true);
    C.currentNode = o4;
    let n4 = C.nextNode(), l3 = 0, h3 = 0, u3 = e4[0];
    for (;u3 !== undefined; ) {
      if (l3 === u3.index) {
        let i4;
        u3.type === 2 ? i4 = new R(n4, n4.nextSibling, this, t3) : u3.type === 1 ? i4 = new u3.ctor(n4, u3.name, u3.strings, this, t3) : u3.type === 6 && (i4 = new Z(n4, this, t3)), this._$AV.push(i4), u3 = e4[++h3];
      }
      l3 !== (u3 == null ? undefined : u3.index) && (n4 = C.nextNode(), l3++);
    }
    return C.currentNode = r3, o4;
  }
  v(t3) {
    let i3 = 0;
    for (const s4 of this._$AV)
      s4 !== undefined && (s4.strings !== undefined ? (s4._$AI(t3, s4, i3), i3 += s4.strings.length - 2) : s4._$AI(t3[i3])), i3++;
  }
}

class R {
  constructor(t3, i3, s4, e4) {
    var o4;
    this.type = 2, this._$AH = A, this._$AN = undefined, this._$AA = t3, this._$AB = i3, this._$AM = s4, this.options = e4, this._$Cp = (o4 = e4 == null ? undefined : e4.isConnected) === null || o4 === undefined || o4;
  }
  get _$AU() {
    var t3, i3;
    return (i3 = (t3 = this._$AM) === null || t3 === undefined ? undefined : t3._$AU) !== null && i3 !== undefined ? i3 : this._$Cp;
  }
  get parentNode() {
    let t3 = this._$AA.parentNode;
    const i3 = this._$AM;
    return i3 !== undefined && (t3 == null ? undefined : t3.nodeType) === 11 && (t3 = i3.parentNode), t3;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t3, i3 = this) {
    t3 = S2(this, t3, i3), d2(t3) ? t3 === A || t3 == null || t3 === "" ? (this._$AH !== A && this._$AR(), this._$AH = A) : t3 !== this._$AH && t3 !== T && this._(t3) : t3._$litType$ !== undefined ? this.g(t3) : t3.nodeType !== undefined ? this.$(t3) : v(t3) ? this.T(t3) : this._(t3);
  }
  k(t3) {
    return this._$AA.parentNode.insertBefore(t3, this._$AB);
  }
  $(t3) {
    this._$AH !== t3 && (this._$AR(), this._$AH = this.k(t3));
  }
  _(t3) {
    this._$AH !== A && d2(this._$AH) ? this._$AA.nextSibling.data = t3 : this.$(r3.createTextNode(t3)), this._$AH = t3;
  }
  g(t3) {
    var i3;
    const { values: s4, _$litType$: e4 } = t3, o4 = typeof e4 == "number" ? this._$AC(t3) : (e4.el === undefined && (e4.el = N.createElement(P(e4.h, e4.h[0]), this.options)), e4);
    if (((i3 = this._$AH) === null || i3 === undefined ? undefined : i3._$AD) === o4)
      this._$AH.v(s4);
    else {
      const t4 = new M(o4, this), i4 = t4.u(this.options);
      t4.v(s4), this.$(i4), this._$AH = t4;
    }
  }
  _$AC(t3) {
    let i3 = E.get(t3.strings);
    return i3 === undefined && E.set(t3.strings, i3 = new N(t3)), i3;
  }
  T(t3) {
    c2(this._$AH) || (this._$AH = [], this._$AR());
    const i3 = this._$AH;
    let s4, e4 = 0;
    for (const o4 of t3)
      e4 === i3.length ? i3.push(s4 = new R(this.k(u2()), this.k(u2()), this, this.options)) : s4 = i3[e4], s4._$AI(o4), e4++;
    e4 < i3.length && (this._$AR(s4 && s4._$AB.nextSibling, e4), i3.length = e4);
  }
  _$AR(t3 = this._$AA.nextSibling, i3) {
    var s4;
    for ((s4 = this._$AP) === null || s4 === undefined || s4.call(this, false, true, i3);t3 && t3 !== this._$AB; ) {
      const i4 = t3.nextSibling;
      t3.remove(), t3 = i4;
    }
  }
  setConnected(t3) {
    var i3;
    this._$AM === undefined && (this._$Cp = t3, (i3 = this._$AP) === null || i3 === undefined || i3.call(this, t3));
  }
}

class k {
  constructor(t3, i3, s4, e4, o4) {
    this.type = 1, this._$AH = A, this._$AN = undefined, this.element = t3, this.name = i3, this._$AM = e4, this.options = o4, s4.length > 2 || s4[0] !== "" || s4[1] !== "" ? (this._$AH = Array(s4.length - 1).fill(new String), this.strings = s4) : this._$AH = A;
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t3, i3 = this, s4, e4) {
    const o4 = this.strings;
    let n4 = false;
    if (o4 === undefined)
      t3 = S2(this, t3, i3, 0), n4 = !d2(t3) || t3 !== this._$AH && t3 !== T, n4 && (this._$AH = t3);
    else {
      const e5 = t3;
      let l3, h3;
      for (t3 = o4[0], l3 = 0;l3 < o4.length - 1; l3++)
        h3 = S2(this, e5[s4 + l3], i3, l3), h3 === T && (h3 = this._$AH[l3]), n4 || (n4 = !d2(h3) || h3 !== this._$AH[l3]), h3 === A ? t3 = A : t3 !== A && (t3 += (h3 != null ? h3 : "") + o4[l3 + 1]), this._$AH[l3] = h3;
    }
    n4 && !e4 && this.j(t3);
  }
  j(t3) {
    t3 === A ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t3 != null ? t3 : "");
  }
}

class H extends k {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t3) {
    this.element[this.name] = t3 === A ? undefined : t3;
  }
}
var I = s3 ? s3.emptyScript : "";

class L extends k {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t3) {
    t3 && t3 !== A ? this.element.setAttribute(this.name, I) : this.element.removeAttribute(this.name);
  }
}

class z extends k {
  constructor(t3, i3, s4, e4, o4) {
    super(t3, i3, s4, e4, o4), this.type = 5;
  }
  _$AI(t3, i3 = this) {
    var s4;
    if ((t3 = (s4 = S2(this, t3, i3, 0)) !== null && s4 !== undefined ? s4 : A) === T)
      return;
    const e4 = this._$AH, o4 = t3 === A && e4 !== A || t3.capture !== e4.capture || t3.once !== e4.once || t3.passive !== e4.passive, n4 = t3 !== A && (e4 === A || o4);
    o4 && this.element.removeEventListener(this.name, this, e4), n4 && this.element.addEventListener(this.name, this, t3), this._$AH = t3;
  }
  handleEvent(t3) {
    var i3, s4;
    typeof this._$AH == "function" ? this._$AH.call((s4 = (i3 = this.options) === null || i3 === undefined ? undefined : i3.host) !== null && s4 !== undefined ? s4 : this.element, t3) : this._$AH.handleEvent(t3);
  }
}

class Z {
  constructor(t3, i3, s4) {
    this.element = t3, this.type = 6, this._$AN = undefined, this._$AM = i3, this.options = s4;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t3) {
    S2(this, t3);
  }
}
var B = i2.litHtmlPolyfillSupport;
B == null || B(N, R), ((t2 = i2.litHtmlVersions) !== null && t2 !== undefined ? t2 : i2.litHtmlVersions = []).push("2.8.0");
var D = (t3, i3, s4) => {
  var e4, o4;
  const n4 = (e4 = s4 == null ? undefined : s4.renderBefore) !== null && e4 !== undefined ? e4 : i3;
  let l3 = n4._$litPart$;
  if (l3 === undefined) {
    const t4 = (o4 = s4 == null ? undefined : s4.renderBefore) !== null && o4 !== undefined ? o4 : null;
    n4._$litPart$ = l3 = new R(i3.insertBefore(u2(), t4), t4, undefined, s4 != null ? s4 : {});
  }
  return l3._$AI(t3), l3;
};
// scripts/node_modules/lit-element/lit-element.js
var l3;
var o4;
class s4 extends u {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = undefined;
  }
  createRenderRoot() {
    var t3, e4;
    const i3 = super.createRenderRoot();
    return (t3 = (e4 = this.renderOptions).renderBefore) !== null && t3 !== undefined || (e4.renderBefore = i3.firstChild), i3;
  }
  update(t3) {
    const i3 = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t3), this._$Do = D(i3, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t3;
    super.connectedCallback(), (t3 = this._$Do) === null || t3 === undefined || t3.setConnected(true);
  }
  disconnectedCallback() {
    var t3;
    super.disconnectedCallback(), (t3 = this._$Do) === null || t3 === undefined || t3.setConnected(false);
  }
  render() {
    return T;
  }
}
s4.finalized = true, s4._$litElement$ = true, (l3 = globalThis.litElementHydrateSupport) === null || l3 === undefined || l3.call(globalThis, { LitElement: s4 });
var n4 = globalThis.litElementPolyfillSupport;
n4 == null || n4({ LitElement: s4 });
((o4 = globalThis.litElementVersions) !== null && o4 !== undefined ? o4 : globalThis.litElementVersions = []).push("3.3.3");
// scripts/node_modules/@lit/reactive-element/decorators/custom-element.js
var e4 = (e5) => (n5) => typeof n5 == "function" ? ((e6, n6) => (customElements.define(e6, n6), n6))(e5, n5) : ((e6, n6) => {
  const { kind: t3, elements: s5 } = n6;
  return { kind: t3, elements: s5, finisher(n7) {
    customElements.define(e6, n7);
  } };
})(e5, n5);
// scripts/node_modules/@lit/reactive-element/decorators/property.js
var n5 = function(n6) {
  return (t3, o5) => o5 !== undefined ? e5(n6, t3, o5) : i3(n6, t3);
};
var i3 = (i4, e5) => e5.kind === "method" && e5.descriptor && !("value" in e5.descriptor) ? { ...e5, finisher(n6) {
  n6.createProperty(e5.key, i4);
} } : { kind: "field", key: Symbol(), placement: "own", descriptor: {}, originalKey: e5.key, initializer() {
  typeof e5.initializer == "function" && (this[e5.key] = e5.initializer.call(this));
}, finisher(n6) {
  n6.createProperty(e5.key, i4);
} };
var e5 = (i4, e6, n6) => {
  e6.constructor.createProperty(n6, i4);
};
// scripts/node_modules/@lit/reactive-element/decorators/query-assigned-elements.js
var n6;
var e6 = ((n6 = window.HTMLSlotElement) === null || n6 === undefined ? undefined : n6.prototype.assignedElements) != null ? (o6, n7) => o6.assignedElements(n7) : (o6, n7) => o6.assignedNodes(n7).filter((o7) => o7.nodeType === Node.ELEMENT_NODE);
// scripts/src/components/test.ts
class TestComponent extends s4 {
  constructor() {
    super(...arguments);
    this.name = "Worldlinessly";
  }
  render() {
    return x`<p>Hello, ${this.name}!</p>`;
  }
}
__decorateClass([
  n5()
], TestComponent.prototype, "name", 2);
TestComponent = __decorateClass([
  e4("test-component")
], TestComponent);

// scripts/src/index.ts
console.log("loaded the script-a-roo");

//# debugId=2E0AE85F9B9F5DBF64756e2164756e21
