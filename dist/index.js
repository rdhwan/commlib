var __create = Object.create;
var __defProp = Object.defineProperty;
var __getProtoOf = Object.getPrototypeOf;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __toESM = (mod, isNodeMode, target) => {
  target = mod != null ? __create(__getProtoOf(mod)) : {};
  const to = isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target;
  for (let key of __getOwnPropNames(mod))
    if (!__hasOwnProp.call(to, key))
      __defProp(to, key, {
        get: () => mod[key],
        enumerable: true
      });
  return to;
};
var __commonJS = (cb, mod) => () => (mod || cb((mod = { exports: {} }).exports, mod), mod.exports);

// node_modules/eventemitter3/index.js
var require_eventemitter3 = __commonJS((exports, module) => {
  var Events = function() {
  };
  var EE2 = function(fn2, context, once) {
    this.fn = fn2;
    this.context = context;
    this.once = once || false;
  };
  var addListener = function(emitter, event, fn2, context, once) {
    if (typeof fn2 !== "function") {
      throw new TypeError("The listener must be a function");
    }
    var listener = new EE2(fn2, context || emitter, once), evt = prefix ? prefix + event : event;
    if (!emitter._events[evt])
      emitter._events[evt] = listener, emitter._eventsCount++;
    else if (!emitter._events[evt].fn)
      emitter._events[evt].push(listener);
    else
      emitter._events[evt] = [emitter._events[evt], listener];
    return emitter;
  };
  var clearEvent = function(emitter, evt) {
    if (--emitter._eventsCount === 0)
      emitter._events = new Events;
    else
      delete emitter._events[evt];
  };
  var EventEmitter = function() {
    this._events = new Events;
    this._eventsCount = 0;
  };
  var has = Object.prototype.hasOwnProperty;
  var prefix = "~";
  if (Object.create) {
    Events.prototype = Object.create(null);
    if (!new Events().__proto__)
      prefix = false;
  }
  EventEmitter.prototype.eventNames = function eventNames() {
    var names = [], events, name2;
    if (this._eventsCount === 0)
      return names;
    for (name2 in events = this._events) {
      if (has.call(events, name2))
        names.push(prefix ? name2.slice(1) : name2);
    }
    if (Object.getOwnPropertySymbols) {
      return names.concat(Object.getOwnPropertySymbols(events));
    }
    return names;
  };
  EventEmitter.prototype.listeners = function listeners(event) {
    var evt = prefix ? prefix + event : event, handlers = this._events[evt];
    if (!handlers)
      return [];
    if (handlers.fn)
      return [handlers.fn];
    for (var i = 0, l = handlers.length, ee = new Array(l);i < l; i++) {
      ee[i] = handlers[i].fn;
    }
    return ee;
  };
  EventEmitter.prototype.listenerCount = function listenerCount(event) {
    var evt = prefix ? prefix + event : event, listeners = this._events[evt];
    if (!listeners)
      return 0;
    if (listeners.fn)
      return 1;
    return listeners.length;
  };
  EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
    var evt = prefix ? prefix + event : event;
    if (!this._events[evt])
      return false;
    var listeners = this._events[evt], len = arguments.length, args, i;
    if (listeners.fn) {
      if (listeners.once)
        this.removeListener(event, listeners.fn, undefined, true);
      switch (len) {
        case 1:
          return listeners.fn.call(listeners.context), true;
        case 2:
          return listeners.fn.call(listeners.context, a1), true;
        case 3:
          return listeners.fn.call(listeners.context, a1, a2), true;
        case 4:
          return listeners.fn.call(listeners.context, a1, a2, a3), true;
        case 5:
          return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
        case 6:
          return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
      }
      for (i = 1, args = new Array(len - 1);i < len; i++) {
        args[i - 1] = arguments[i];
      }
      listeners.fn.apply(listeners.context, args);
    } else {
      var length = listeners.length, j;
      for (i = 0;i < length; i++) {
        if (listeners[i].once)
          this.removeListener(event, listeners[i].fn, undefined, true);
        switch (len) {
          case 1:
            listeners[i].fn.call(listeners[i].context);
            break;
          case 2:
            listeners[i].fn.call(listeners[i].context, a1);
            break;
          case 3:
            listeners[i].fn.call(listeners[i].context, a1, a2);
            break;
          case 4:
            listeners[i].fn.call(listeners[i].context, a1, a2, a3);
            break;
          default:
            if (!args)
              for (j = 1, args = new Array(len - 1);j < len; j++) {
                args[j - 1] = arguments[j];
              }
            listeners[i].fn.apply(listeners[i].context, args);
        }
      }
    }
    return true;
  };
  EventEmitter.prototype.on = function on(event, fn2, context) {
    return addListener(this, event, fn2, context, false);
  };
  EventEmitter.prototype.once = function once(event, fn2, context) {
    return addListener(this, event, fn2, context, true);
  };
  EventEmitter.prototype.removeListener = function removeListener(event, fn2, context, once) {
    var evt = prefix ? prefix + event : event;
    if (!this._events[evt])
      return this;
    if (!fn2) {
      clearEvent(this, evt);
      return this;
    }
    var listeners = this._events[evt];
    if (listeners.fn) {
      if (listeners.fn === fn2 && (!once || listeners.once) && (!context || listeners.context === context)) {
        clearEvent(this, evt);
      }
    } else {
      for (var i = 0, events = [], length = listeners.length;i < length; i++) {
        if (listeners[i].fn !== fn2 || once && !listeners[i].once || context && listeners[i].context !== context) {
          events.push(listeners[i]);
        }
      }
      if (events.length)
        this._events[evt] = events.length === 1 ? events[0] : events;
      else
        clearEvent(this, evt);
    }
    return this;
  };
  EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
    var evt;
    if (event) {
      evt = prefix ? prefix + event : event;
      if (this._events[evt])
        clearEvent(this, evt);
    } else {
      this._events = new Events;
      this._eventsCount = 0;
    }
    return this;
  };
  EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
  EventEmitter.prototype.addListener = EventEmitter.prototype.on;
  EventEmitter.prefixed = prefix;
  EventEmitter.EventEmitter = EventEmitter;
  if (typeof module !== "undefined") {
    module.exports = EventEmitter;
  }
});

// node_modules/mqtt/dist/mqtt.esm.js
var _s = function(t) {
  throw new Error("Node.js process " + t + " is not supported by JSPM core outside of Node.js");
};
var Jg = function() {
  !Lr || !Xt || (Lr = false, Xt.length ? bt = Xt.concat(bt) : Fi = -1, bt.length && Bl());
};
var Bl = function() {
  if (!Lr) {
    var t = setTimeout(Jg, 0);
    Lr = true;
    for (var e = bt.length;e; ) {
      for (Xt = bt, bt = [];++Fi < e; )
        Xt && Xt[Fi].run();
      Fi = -1, e = bt.length;
    }
    Xt = null, Lr = false, clearTimeout(t);
  }
};
var Pl = function(t) {
  var e = new Array(arguments.length - 1);
  if (arguments.length > 1)
    for (var r = 1;r < arguments.length; r++)
      e[r - 1] = arguments[r];
  bt.push(new kl(t, e)), bt.length === 1 && !Lr && setTimeout(Bl, 0);
};
var kl = function(t, e) {
  this.fun = t, this.array = e;
};
var Ee = function() {
};
var Gl = function(t) {
  _s("_linkedBinding");
};
var Xl = function(t) {
  _s("dlopen");
};
var Zl = function() {
  return [];
};
var eu = function() {
  return [];
};
var uu = function(t, e) {
  if (!t)
    throw new Error(e || "assertion error");
};
var du = function() {
  return false;
};
var Pu = function() {
  return Lt.now() / 1000;
};
var Wi = function(t) {
  var e = Math.floor((Date.now() - Lt.now()) * 0.001), r = Lt.now() * 0.001, i = Math.floor(r) + e, n = Math.floor(r % 1 * 1e9);
  return t && (i = i - t[0], n = n - t[1], n < 0 && (i--, n += ws)), [i, n];
};
var wt = function() {
  return $u;
};
var Wu = function(t) {
  return [];
};
var Xg = function() {
  if (Vu)
    return ci;
  Vu = true, ci.byteLength = a, ci.toByteArray = c, ci.fromByteArray = g;
  for (var t = [], e = [], r = typeof Uint8Array < "u" ? Uint8Array : Array, i = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", n = 0, o = i.length;n < o; ++n)
    t[n] = i[n], e[i.charCodeAt(n)] = n;
  e["-".charCodeAt(0)] = 62, e["_".charCodeAt(0)] = 63;
  function s(y) {
    var w = y.length;
    if (w % 4 > 0)
      throw new Error("Invalid string. Length must be a multiple of 4");
    var S = y.indexOf("=");
    S === -1 && (S = w);
    var E = S === w ? 0 : 4 - S % 4;
    return [S, E];
  }
  function a(y) {
    var w = s(y), S = w[0], E = w[1];
    return (S + E) * 3 / 4 - E;
  }
  function l(y, w, S) {
    return (w + S) * 3 / 4 - S;
  }
  function c(y) {
    var w, S = s(y), E = S[0], I = S[1], C = new r(l(y, E, I)), R = 0, U = I > 0 ? E - 4 : E, N;
    for (N = 0;N < U; N += 4)
      w = e[y.charCodeAt(N)] << 18 | e[y.charCodeAt(N + 1)] << 12 | e[y.charCodeAt(N + 2)] << 6 | e[y.charCodeAt(N + 3)], C[R++] = w >> 16 & 255, C[R++] = w >> 8 & 255, C[R++] = w & 255;
    return I === 2 && (w = e[y.charCodeAt(N)] << 2 | e[y.charCodeAt(N + 1)] >> 4, C[R++] = w & 255), I === 1 && (w = e[y.charCodeAt(N)] << 10 | e[y.charCodeAt(N + 1)] << 4 | e[y.charCodeAt(N + 2)] >> 2, C[R++] = w >> 8 & 255, C[R++] = w & 255), C;
  }
  function h(y) {
    return t[y >> 18 & 63] + t[y >> 12 & 63] + t[y >> 6 & 63] + t[y & 63];
  }
  function d(y, w, S) {
    for (var E, I = [], C = w;C < S; C += 3)
      E = (y[C] << 16 & 16711680) + (y[C + 1] << 8 & 65280) + (y[C + 2] & 255), I.push(h(E));
    return I.join("");
  }
  function g(y) {
    for (var w, S = y.length, E = S % 3, I = [], C = 16383, R = 0, U = S - E;R < U; R += C)
      I.push(d(y, R, R + C > U ? U : R + C));
    return E === 1 ? (w = y[S - 1], I.push(t[w >> 2] + t[w << 4 & 63] + "==")) : E === 2 && (w = (y[S - 2] << 8) + y[S - 1], I.push(t[w >> 10] + t[w >> 4 & 63] + t[w << 2 & 63] + "=")), I.join("");
  }
  return ci;
};
var Zg = function() {
  if (zu)
    return Hi;
  zu = true;
  return Hi.read = function(t, e, r, i, n) {
    var o, s, a = n * 8 - i - 1, l = (1 << a) - 1, c = l >> 1, h = -7, d = r ? n - 1 : 0, g = r ? -1 : 1, y = t[e + d];
    for (d += g, o = y & (1 << -h) - 1, y >>= -h, h += a;h > 0; o = o * 256 + t[e + d], d += g, h -= 8)
      ;
    for (s = o & (1 << -h) - 1, o >>= -h, h += i;h > 0; s = s * 256 + t[e + d], d += g, h -= 8)
      ;
    if (o === 0)
      o = 1 - c;
    else {
      if (o === l)
        return s ? NaN : (y ? -1 : 1) * (1 / 0);
      s = s + Math.pow(2, i), o = o - c;
    }
    return (y ? -1 : 1) * s * Math.pow(2, o - i);
  }, Hi.write = function(t, e, r, i, n, o) {
    var s, a, l, c = o * 8 - n - 1, h = (1 << c) - 1, d = h >> 1, g = n === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, y = i ? 0 : o - 1, w = i ? 1 : -1, S = e < 0 || e === 0 && 1 / e < 0 ? 1 : 0;
    for (e = Math.abs(e), isNaN(e) || e === 1 / 0 ? (a = isNaN(e) ? 1 : 0, s = h) : (s = Math.floor(Math.log(e) / Math.LN2), e * (l = Math.pow(2, -s)) < 1 && (s--, l *= 2), s + d >= 1 ? e += g / l : e += g * Math.pow(2, 1 - d), e * l >= 2 && (s++, l /= 2), s + d >= h ? (a = 0, s = h) : s + d >= 1 ? (a = (e * l - 1) * Math.pow(2, n), s = s + d) : (a = e * Math.pow(2, d - 1) * Math.pow(2, n), s = 0));n >= 8; t[r + y] = a & 255, y += w, a /= 256, n -= 8)
      ;
    for (s = s << n | a, c += n;c > 0; t[r + y] = s & 255, y += w, s /= 256, c -= 8)
      ;
    t[r + y - w] |= S * 128;
  }, Hi;
};
var ey = function() {
  if (Ku)
    return Zt;
  Ku = true;
  let t = Xg(), e = Zg(), r = typeof Symbol == "function" && typeof Symbol.for == "function" ? Symbol.for("nodejs.util.inspect.custom") : null;
  Zt.Buffer = s, Zt.SlowBuffer = I, Zt.INSPECT_MAX_BYTES = 50;
  let i = 2147483647;
  Zt.kMaxLength = i, s.TYPED_ARRAY_SUPPORT = n(), !s.TYPED_ARRAY_SUPPORT && typeof console < "u" && typeof console.error == "function" && console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.");
  function n() {
    try {
      let p = new Uint8Array(1), u = { foo: function() {
        return 42;
      } };
      return Object.setPrototypeOf(u, Uint8Array.prototype), Object.setPrototypeOf(p, u), p.foo() === 42;
    } catch {
      return false;
    }
  }
  Object.defineProperty(s.prototype, "parent", { enumerable: true, get: function() {
    if (s.isBuffer(this))
      return this.buffer;
  } }), Object.defineProperty(s.prototype, "offset", { enumerable: true, get: function() {
    if (s.isBuffer(this))
      return this.byteOffset;
  } });
  function o(p) {
    if (p > i)
      throw new RangeError('The value "' + p + '" is invalid for option "size"');
    let u = new Uint8Array(p);
    return Object.setPrototypeOf(u, s.prototype), u;
  }
  function s(p, u, f) {
    if (typeof p == "number") {
      if (typeof u == "string")
        throw new TypeError('The "string" argument must be of type string. Received type number');
      return h(p);
    }
    return a(p, u, f);
  }
  s.poolSize = 8192;
  function a(p, u, f) {
    if (typeof p == "string")
      return d(p, u);
    if (ArrayBuffer.isView(p))
      return y(p);
    if (p == null)
      throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof p);
    if (Ye(p, ArrayBuffer) || p && Ye(p.buffer, ArrayBuffer) || typeof SharedArrayBuffer < "u" && (Ye(p, SharedArrayBuffer) || p && Ye(p.buffer, SharedArrayBuffer)))
      return w(p, u, f);
    if (typeof p == "number")
      throw new TypeError('The "value" argument must not be of type number. Received type number');
    let b = p.valueOf && p.valueOf();
    if (b != null && b !== p)
      return s.from(b, u, f);
    let A = S(p);
    if (A)
      return A;
    if (typeof Symbol < "u" && Symbol.toPrimitive != null && typeof p[Symbol.toPrimitive] == "function")
      return s.from(p[Symbol.toPrimitive]("string"), u, f);
    throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof p);
  }
  s.from = function(p, u, f) {
    return a(p, u, f);
  }, Object.setPrototypeOf(s.prototype, Uint8Array.prototype), Object.setPrototypeOf(s, Uint8Array);
  function l(p) {
    if (typeof p != "number")
      throw new TypeError('"size" argument must be of type number');
    if (p < 0)
      throw new RangeError('The value "' + p + '" is invalid for option "size"');
  }
  function c(p, u, f) {
    return l(p), p <= 0 ? o(p) : u !== undefined ? typeof f == "string" ? o(p).fill(u, f) : o(p).fill(u) : o(p);
  }
  s.alloc = function(p, u, f) {
    return c(p, u, f);
  };
  function h(p) {
    return l(p), o(p < 0 ? 0 : E(p) | 0);
  }
  s.allocUnsafe = function(p) {
    return h(p);
  }, s.allocUnsafeSlow = function(p) {
    return h(p);
  };
  function d(p, u) {
    if ((typeof u != "string" || u === "") && (u = "utf8"), !s.isEncoding(u))
      throw new TypeError("Unknown encoding: " + u);
    let f = C(p, u) | 0, b = o(f), A = b.write(p, u);
    return A !== f && (b = b.slice(0, A)), b;
  }
  function g(p) {
    let u = p.length < 0 ? 0 : E(p.length) | 0, f = o(u);
    for (let b = 0;b < u; b += 1)
      f[b] = p[b] & 255;
    return f;
  }
  function y(p) {
    if (Ye(p, Uint8Array)) {
      let u = new Uint8Array(p);
      return w(u.buffer, u.byteOffset, u.byteLength);
    }
    return g(p);
  }
  function w(p, u, f) {
    if (u < 0 || p.byteLength < u)
      throw new RangeError('"offset" is outside of buffer bounds');
    if (p.byteLength < u + (f || 0))
      throw new RangeError('"length" is outside of buffer bounds');
    let b;
    return u === undefined && f === undefined ? b = new Uint8Array(p) : f === undefined ? b = new Uint8Array(p, u) : b = new Uint8Array(p, u, f), Object.setPrototypeOf(b, s.prototype), b;
  }
  function S(p) {
    if (s.isBuffer(p)) {
      let u = E(p.length) | 0, f = o(u);
      return f.length === 0 || p.copy(f, 0, 0, u), f;
    }
    if (p.length !== undefined)
      return typeof p.length != "number" || gs(p.length) ? o(0) : g(p);
    if (p.type === "Buffer" && Array.isArray(p.data))
      return g(p.data);
  }
  function E(p) {
    if (p >= i)
      throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + i.toString(16) + " bytes");
    return p | 0;
  }
  function I(p) {
    return +p != p && (p = 0), s.alloc(+p);
  }
  s.isBuffer = function(u) {
    return u != null && u._isBuffer === true && u !== s.prototype;
  }, s.compare = function(u, f) {
    if (Ye(u, Uint8Array) && (u = s.from(u, u.offset, u.byteLength)), Ye(f, Uint8Array) && (f = s.from(f, f.offset, f.byteLength)), !s.isBuffer(u) || !s.isBuffer(f))
      throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
    if (u === f)
      return 0;
    let b = u.length, A = f.length;
    for (let T = 0, P = Math.min(b, A);T < P; ++T)
      if (u[T] !== f[T]) {
        b = u[T], A = f[T];
        break;
      }
    return b < A ? -1 : A < b ? 1 : 0;
  }, s.isEncoding = function(u) {
    switch (String(u).toLowerCase()) {
      case "hex":
      case "utf8":
      case "utf-8":
      case "ascii":
      case "latin1":
      case "binary":
      case "base64":
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return true;
      default:
        return false;
    }
  }, s.concat = function(u, f) {
    if (!Array.isArray(u))
      throw new TypeError('"list" argument must be an Array of Buffers');
    if (u.length === 0)
      return s.alloc(0);
    let b;
    if (f === undefined)
      for (f = 0, b = 0;b < u.length; ++b)
        f += u[b].length;
    let A = s.allocUnsafe(f), T = 0;
    for (b = 0;b < u.length; ++b) {
      let P = u[b];
      if (Ye(P, Uint8Array))
        T + P.length > A.length ? (s.isBuffer(P) || (P = s.from(P)), P.copy(A, T)) : Uint8Array.prototype.set.call(A, P, T);
      else if (s.isBuffer(P))
        P.copy(A, T);
      else
        throw new TypeError('"list" argument must be an Array of Buffers');
      T += P.length;
    }
    return A;
  };
  function C(p, u) {
    if (s.isBuffer(p))
      return p.length;
    if (ArrayBuffer.isView(p) || Ye(p, ArrayBuffer))
      return p.byteLength;
    if (typeof p != "string")
      throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof p);
    let f = p.length, b = arguments.length > 2 && arguments[2] === true;
    if (!b && f === 0)
      return 0;
    let A = false;
    for (;; )
      switch (u) {
        case "ascii":
        case "latin1":
        case "binary":
          return f;
        case "utf8":
        case "utf-8":
          return ps(p).length;
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return f * 2;
        case "hex":
          return f >>> 1;
        case "base64":
          return Cl(p).length;
        default:
          if (A)
            return b ? -1 : ps(p).length;
          u = ("" + u).toLowerCase(), A = true;
      }
  }
  s.byteLength = C;
  function R(p, u, f) {
    let b = false;
    if ((u === undefined || u < 0) && (u = 0), u > this.length || ((f === undefined || f > this.length) && (f = this.length), f <= 0) || (f >>>= 0, u >>>= 0, f <= u))
      return "";
    for (p || (p = "utf8");; )
      switch (p) {
        case "hex":
          return qg(this, u, f);
        case "utf8":
        case "utf-8":
          return Pr(this, u, f);
        case "ascii":
          return hs(this, u, f);
        case "latin1":
        case "binary":
          return Ng(this, u, f);
        case "base64":
          return ge(this, u, f);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return Dg(this, u, f);
        default:
          if (b)
            throw new TypeError("Unknown encoding: " + p);
          p = (p + "").toLowerCase(), b = true;
      }
  }
  s.prototype._isBuffer = true;
  function U(p, u, f) {
    let b = p[u];
    p[u] = p[f], p[f] = b;
  }
  s.prototype.swap16 = function() {
    let u = this.length;
    if (u % 2 !== 0)
      throw new RangeError("Buffer size must be a multiple of 16-bits");
    for (let f = 0;f < u; f += 2)
      U(this, f, f + 1);
    return this;
  }, s.prototype.swap32 = function() {
    let u = this.length;
    if (u % 4 !== 0)
      throw new RangeError("Buffer size must be a multiple of 32-bits");
    for (let f = 0;f < u; f += 4)
      U(this, f, f + 3), U(this, f + 1, f + 2);
    return this;
  }, s.prototype.swap64 = function() {
    let u = this.length;
    if (u % 8 !== 0)
      throw new RangeError("Buffer size must be a multiple of 64-bits");
    for (let f = 0;f < u; f += 8)
      U(this, f, f + 7), U(this, f + 1, f + 6), U(this, f + 2, f + 5), U(this, f + 3, f + 4);
    return this;
  }, s.prototype.toString = function() {
    let u = this.length;
    return u === 0 ? "" : arguments.length === 0 ? Pr(this, 0, u) : R.apply(this, arguments);
  }, s.prototype.toLocaleString = s.prototype.toString, s.prototype.equals = function(u) {
    if (!s.isBuffer(u))
      throw new TypeError("Argument must be a Buffer");
    return this === u ? true : s.compare(this, u) === 0;
  }, s.prototype.inspect = function() {
    let u = "", f = Zt.INSPECT_MAX_BYTES;
    return u = this.toString("hex", 0, f).replace(/(.{2})/g, "$1 ").trim(), this.length > f && (u += " ... "), "<Buffer " + u + ">";
  }, r && (s.prototype[r] = s.prototype.inspect), s.prototype.compare = function(u, f, b, A, T) {
    if (Ye(u, Uint8Array) && (u = s.from(u, u.offset, u.byteLength)), !s.isBuffer(u))
      throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof u);
    if (f === undefined && (f = 0), b === undefined && (b = u ? u.length : 0), A === undefined && (A = 0), T === undefined && (T = this.length), f < 0 || b > u.length || A < 0 || T > this.length)
      throw new RangeError("out of range index");
    if (A >= T && f >= b)
      return 0;
    if (A >= T)
      return -1;
    if (f >= b)
      return 1;
    if (f >>>= 0, b >>>= 0, A >>>= 0, T >>>= 0, this === u)
      return 0;
    let P = T - A, $ = b - f, se = Math.min(P, $), te = this.slice(A, T), oe = u.slice(f, b);
    for (let J = 0;J < se; ++J)
      if (te[J] !== oe[J]) {
        P = te[J], $ = oe[J];
        break;
      }
    return P < $ ? -1 : $ < P ? 1 : 0;
  };
  function N(p, u, f, b, A) {
    if (p.length === 0)
      return -1;
    if (typeof f == "string" ? (b = f, f = 0) : f > 2147483647 ? f = 2147483647 : f < -2147483648 && (f = -2147483648), f = +f, gs(f) && (f = A ? 0 : p.length - 1), f < 0 && (f = p.length + f), f >= p.length) {
      if (A)
        return -1;
      f = p.length - 1;
    } else if (f < 0)
      if (A)
        f = 0;
      else
        return -1;
    if (typeof u == "string" && (u = s.from(u, b)), s.isBuffer(u))
      return u.length === 0 ? -1 : W(p, u, f, b, A);
    if (typeof u == "number")
      return u = u & 255, typeof Uint8Array.prototype.indexOf == "function" ? A ? Uint8Array.prototype.indexOf.call(p, u, f) : Uint8Array.prototype.lastIndexOf.call(p, u, f) : W(p, [u], f, b, A);
    throw new TypeError("val must be string, number or Buffer");
  }
  function W(p, u, f, b, A) {
    let T = 1, P = p.length, $ = u.length;
    if (b !== undefined && (b = String(b).toLowerCase(), b === "ucs2" || b === "ucs-2" || b === "utf16le" || b === "utf-16le")) {
      if (p.length < 2 || u.length < 2)
        return -1;
      T = 2, P /= 2, $ /= 2, f /= 2;
    }
    function se(oe, J) {
      return T === 1 ? oe[J] : oe.readUInt16BE(J * T);
    }
    let te;
    if (A) {
      let oe = -1;
      for (te = f;te < P; te++)
        if (se(p, te) === se(u, oe === -1 ? 0 : te - oe)) {
          if (oe === -1 && (oe = te), te - oe + 1 === $)
            return oe * T;
        } else
          oe !== -1 && (te -= te - oe), oe = -1;
    } else
      for (f + $ > P && (f = P - $), te = f;te >= 0; te--) {
        let oe = true;
        for (let J = 0;J < $; J++)
          if (se(p, te + J) !== se(u, J)) {
            oe = false;
            break;
          }
        if (oe)
          return te;
      }
    return -1;
  }
  s.prototype.includes = function(u, f, b) {
    return this.indexOf(u, f, b) !== -1;
  }, s.prototype.indexOf = function(u, f, b) {
    return N(this, u, f, b, true);
  }, s.prototype.lastIndexOf = function(u, f, b) {
    return N(this, u, f, b, false);
  };
  function K(p, u, f, b) {
    f = Number(f) || 0;
    let A = p.length - f;
    b ? (b = Number(b), b > A && (b = A)) : b = A;
    let T = u.length;
    b > T / 2 && (b = T / 2);
    let P;
    for (P = 0;P < b; ++P) {
      let $ = parseInt(u.substr(P * 2, 2), 16);
      if (gs($))
        return P;
      p[f + P] = $;
    }
    return P;
  }
  function z(p, u, f, b) {
    return ji(ps(u, p.length - f), p, f, b);
  }
  function Q(p, u, f, b) {
    return ji($g(u), p, f, b);
  }
  function pe(p, u, f, b) {
    return ji(Cl(u), p, f, b);
  }
  function Yt(p, u, f, b) {
    return ji(Hg(u, p.length - f), p, f, b);
  }
  s.prototype.write = function(u, f, b, A) {
    if (f === undefined)
      A = "utf8", b = this.length, f = 0;
    else if (b === undefined && typeof f == "string")
      A = f, b = this.length, f = 0;
    else if (isFinite(f))
      f = f >>> 0, isFinite(b) ? (b = b >>> 0, A === undefined && (A = "utf8")) : (A = b, b = undefined);
    else
      throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
    let T = this.length - f;
    if ((b === undefined || b > T) && (b = T), u.length > 0 && (b < 0 || f < 0) || f > this.length)
      throw new RangeError("Attempt to write outside buffer bounds");
    A || (A = "utf8");
    let P = false;
    for (;; )
      switch (A) {
        case "hex":
          return K(this, u, f, b);
        case "utf8":
        case "utf-8":
          return z(this, u, f, b);
        case "ascii":
        case "latin1":
        case "binary":
          return Q(this, u, f, b);
        case "base64":
          return pe(this, u, f, b);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return Yt(this, u, f, b);
        default:
          if (P)
            throw new TypeError("Unknown encoding: " + A);
          A = ("" + A).toLowerCase(), P = true;
      }
  }, s.prototype.toJSON = function() {
    return { type: "Buffer", data: Array.prototype.slice.call(this._arr || this, 0) };
  };
  function ge(p, u, f) {
    return u === 0 && f === p.length ? t.fromByteArray(p) : t.fromByteArray(p.slice(u, f));
  }
  function Pr(p, u, f) {
    f = Math.min(p.length, f);
    let b = [], A = u;
    for (;A < f; ) {
      let T = p[A], P = null, $ = T > 239 ? 4 : T > 223 ? 3 : T > 191 ? 2 : 1;
      if (A + $ <= f) {
        let se, te, oe, J;
        switch ($) {
          case 1:
            T < 128 && (P = T);
            break;
          case 2:
            se = p[A + 1], (se & 192) === 128 && (J = (T & 31) << 6 | se & 63, J > 127 && (P = J));
            break;
          case 3:
            se = p[A + 1], te = p[A + 2], (se & 192) === 128 && (te & 192) === 128 && (J = (T & 15) << 12 | (se & 63) << 6 | te & 63, J > 2047 && (J < 55296 || J > 57343) && (P = J));
            break;
          case 4:
            se = p[A + 1], te = p[A + 2], oe = p[A + 3], (se & 192) === 128 && (te & 192) === 128 && (oe & 192) === 128 && (J = (T & 15) << 18 | (se & 63) << 12 | (te & 63) << 6 | oe & 63, J > 65535 && J < 1114112 && (P = J));
        }
      }
      P === null ? (P = 65533, $ = 1) : P > 65535 && (P -= 65536, b.push(P >>> 10 & 1023 | 55296), P = 56320 | P & 1023), b.push(P), A += $;
    }
    return Or(b);
  }
  let kr = 4096;
  function Or(p) {
    let u = p.length;
    if (u <= kr)
      return String.fromCharCode.apply(String, p);
    let f = "", b = 0;
    for (;b < u; )
      f += String.fromCharCode.apply(String, p.slice(b, b += kr));
    return f;
  }
  function hs(p, u, f) {
    let b = "";
    f = Math.min(p.length, f);
    for (let A = u;A < f; ++A)
      b += String.fromCharCode(p[A] & 127);
    return b;
  }
  function Ng(p, u, f) {
    let b = "";
    f = Math.min(p.length, f);
    for (let A = u;A < f; ++A)
      b += String.fromCharCode(p[A]);
    return b;
  }
  function qg(p, u, f) {
    let b = p.length;
    (!u || u < 0) && (u = 0), (!f || f < 0 || f > b) && (f = b);
    let A = "";
    for (let T = u;T < f; ++T)
      A += Vg[p[T]];
    return A;
  }
  function Dg(p, u, f) {
    let b = p.slice(u, f), A = "";
    for (let T = 0;T < b.length - 1; T += 2)
      A += String.fromCharCode(b[T] + b[T + 1] * 256);
    return A;
  }
  s.prototype.slice = function(u, f) {
    let b = this.length;
    u = ~~u, f = f === undefined ? b : ~~f, u < 0 ? (u += b, u < 0 && (u = 0)) : u > b && (u = b), f < 0 ? (f += b, f < 0 && (f = 0)) : f > b && (f = b), f < u && (f = u);
    let A = this.subarray(u, f);
    return Object.setPrototypeOf(A, s.prototype), A;
  };
  function ye(p, u, f) {
    if (p % 1 !== 0 || p < 0)
      throw new RangeError("offset is not uint");
    if (p + u > f)
      throw new RangeError("Trying to access beyond buffer length");
  }
  s.prototype.readUintLE = s.prototype.readUIntLE = function(u, f, b) {
    u = u >>> 0, f = f >>> 0, b || ye(u, f, this.length);
    let A = this[u], T = 1, P = 0;
    for (;++P < f && (T *= 256); )
      A += this[u + P] * T;
    return A;
  }, s.prototype.readUintBE = s.prototype.readUIntBE = function(u, f, b) {
    u = u >>> 0, f = f >>> 0, b || ye(u, f, this.length);
    let A = this[u + --f], T = 1;
    for (;f > 0 && (T *= 256); )
      A += this[u + --f] * T;
    return A;
  }, s.prototype.readUint8 = s.prototype.readUInt8 = function(u, f) {
    return u = u >>> 0, f || ye(u, 1, this.length), this[u];
  }, s.prototype.readUint16LE = s.prototype.readUInt16LE = function(u, f) {
    return u = u >>> 0, f || ye(u, 2, this.length), this[u] | this[u + 1] << 8;
  }, s.prototype.readUint16BE = s.prototype.readUInt16BE = function(u, f) {
    return u = u >>> 0, f || ye(u, 2, this.length), this[u] << 8 | this[u + 1];
  }, s.prototype.readUint32LE = s.prototype.readUInt32LE = function(u, f) {
    return u = u >>> 0, f || ye(u, 4, this.length), (this[u] | this[u + 1] << 8 | this[u + 2] << 16) + this[u + 3] * 16777216;
  }, s.prototype.readUint32BE = s.prototype.readUInt32BE = function(u, f) {
    return u = u >>> 0, f || ye(u, 4, this.length), this[u] * 16777216 + (this[u + 1] << 16 | this[u + 2] << 8 | this[u + 3]);
  }, s.prototype.readBigUInt64LE = Mt(function(u) {
    u = u >>> 0, Mr(u, "offset");
    let f = this[u], b = this[u + 7];
    (f === undefined || b === undefined) && fi(u, this.length - 8);
    let A = f + this[++u] * 2 ** 8 + this[++u] * 2 ** 16 + this[++u] * 2 ** 24, T = this[++u] + this[++u] * 2 ** 8 + this[++u] * 2 ** 16 + b * 2 ** 24;
    return BigInt(A) + (BigInt(T) << BigInt(32));
  }), s.prototype.readBigUInt64BE = Mt(function(u) {
    u = u >>> 0, Mr(u, "offset");
    let f = this[u], b = this[u + 7];
    (f === undefined || b === undefined) && fi(u, this.length - 8);
    let A = f * 2 ** 24 + this[++u] * 2 ** 16 + this[++u] * 2 ** 8 + this[++u], T = this[++u] * 2 ** 24 + this[++u] * 2 ** 16 + this[++u] * 2 ** 8 + b;
    return (BigInt(A) << BigInt(32)) + BigInt(T);
  }), s.prototype.readIntLE = function(u, f, b) {
    u = u >>> 0, f = f >>> 0, b || ye(u, f, this.length);
    let A = this[u], T = 1, P = 0;
    for (;++P < f && (T *= 256); )
      A += this[u + P] * T;
    return T *= 128, A >= T && (A -= Math.pow(2, 8 * f)), A;
  }, s.prototype.readIntBE = function(u, f, b) {
    u = u >>> 0, f = f >>> 0, b || ye(u, f, this.length);
    let A = f, T = 1, P = this[u + --A];
    for (;A > 0 && (T *= 256); )
      P += this[u + --A] * T;
    return T *= 128, P >= T && (P -= Math.pow(2, 8 * f)), P;
  }, s.prototype.readInt8 = function(u, f) {
    return u = u >>> 0, f || ye(u, 1, this.length), this[u] & 128 ? (255 - this[u] + 1) * -1 : this[u];
  }, s.prototype.readInt16LE = function(u, f) {
    u = u >>> 0, f || ye(u, 2, this.length);
    let b = this[u] | this[u + 1] << 8;
    return b & 32768 ? b | 4294901760 : b;
  }, s.prototype.readInt16BE = function(u, f) {
    u = u >>> 0, f || ye(u, 2, this.length);
    let b = this[u + 1] | this[u] << 8;
    return b & 32768 ? b | 4294901760 : b;
  }, s.prototype.readInt32LE = function(u, f) {
    return u = u >>> 0, f || ye(u, 4, this.length), this[u] | this[u + 1] << 8 | this[u + 2] << 16 | this[u + 3] << 24;
  }, s.prototype.readInt32BE = function(u, f) {
    return u = u >>> 0, f || ye(u, 4, this.length), this[u] << 24 | this[u + 1] << 16 | this[u + 2] << 8 | this[u + 3];
  }, s.prototype.readBigInt64LE = Mt(function(u) {
    u = u >>> 0, Mr(u, "offset");
    let f = this[u], b = this[u + 7];
    (f === undefined || b === undefined) && fi(u, this.length - 8);
    let A = this[u + 4] + this[u + 5] * 2 ** 8 + this[u + 6] * 2 ** 16 + (b << 24);
    return (BigInt(A) << BigInt(32)) + BigInt(f + this[++u] * 2 ** 8 + this[++u] * 2 ** 16 + this[++u] * 2 ** 24);
  }), s.prototype.readBigInt64BE = Mt(function(u) {
    u = u >>> 0, Mr(u, "offset");
    let f = this[u], b = this[u + 7];
    (f === undefined || b === undefined) && fi(u, this.length - 8);
    let A = (f << 24) + this[++u] * 2 ** 16 + this[++u] * 2 ** 8 + this[++u];
    return (BigInt(A) << BigInt(32)) + BigInt(this[++u] * 2 ** 24 + this[++u] * 2 ** 16 + this[++u] * 2 ** 8 + b);
  }), s.prototype.readFloatLE = function(u, f) {
    return u = u >>> 0, f || ye(u, 4, this.length), e.read(this, u, true, 23, 4);
  }, s.prototype.readFloatBE = function(u, f) {
    return u = u >>> 0, f || ye(u, 4, this.length), e.read(this, u, false, 23, 4);
  }, s.prototype.readDoubleLE = function(u, f) {
    return u = u >>> 0, f || ye(u, 8, this.length), e.read(this, u, true, 52, 8);
  }, s.prototype.readDoubleBE = function(u, f) {
    return u = u >>> 0, f || ye(u, 8, this.length), e.read(this, u, false, 52, 8);
  };
  function Ce(p, u, f, b, A, T) {
    if (!s.isBuffer(p))
      throw new TypeError('"buffer" argument must be a Buffer instance');
    if (u > A || u < T)
      throw new RangeError('"value" argument is out of bounds');
    if (f + b > p.length)
      throw new RangeError("Index out of range");
  }
  s.prototype.writeUintLE = s.prototype.writeUIntLE = function(u, f, b, A) {
    if (u = +u, f = f >>> 0, b = b >>> 0, !A) {
      let $ = Math.pow(2, 8 * b) - 1;
      Ce(this, u, f, b, $, 0);
    }
    let T = 1, P = 0;
    for (this[f] = u & 255;++P < b && (T *= 256); )
      this[f + P] = u / T & 255;
    return f + b;
  }, s.prototype.writeUintBE = s.prototype.writeUIntBE = function(u, f, b, A) {
    if (u = +u, f = f >>> 0, b = b >>> 0, !A) {
      let $ = Math.pow(2, 8 * b) - 1;
      Ce(this, u, f, b, $, 0);
    }
    let T = b - 1, P = 1;
    for (this[f + T] = u & 255;--T >= 0 && (P *= 256); )
      this[f + T] = u / P & 255;
    return f + b;
  }, s.prototype.writeUint8 = s.prototype.writeUInt8 = function(u, f, b) {
    return u = +u, f = f >>> 0, b || Ce(this, u, f, 1, 255, 0), this[f] = u & 255, f + 1;
  }, s.prototype.writeUint16LE = s.prototype.writeUInt16LE = function(u, f, b) {
    return u = +u, f = f >>> 0, b || Ce(this, u, f, 2, 65535, 0), this[f] = u & 255, this[f + 1] = u >>> 8, f + 2;
  }, s.prototype.writeUint16BE = s.prototype.writeUInt16BE = function(u, f, b) {
    return u = +u, f = f >>> 0, b || Ce(this, u, f, 2, 65535, 0), this[f] = u >>> 8, this[f + 1] = u & 255, f + 2;
  }, s.prototype.writeUint32LE = s.prototype.writeUInt32LE = function(u, f, b) {
    return u = +u, f = f >>> 0, b || Ce(this, u, f, 4, 4294967295, 0), this[f + 3] = u >>> 24, this[f + 2] = u >>> 16, this[f + 1] = u >>> 8, this[f] = u & 255, f + 4;
  }, s.prototype.writeUint32BE = s.prototype.writeUInt32BE = function(u, f, b) {
    return u = +u, f = f >>> 0, b || Ce(this, u, f, 4, 4294967295, 0), this[f] = u >>> 24, this[f + 1] = u >>> 16, this[f + 2] = u >>> 8, this[f + 3] = u & 255, f + 4;
  };
  function vl(p, u, f, b, A) {
    Rl(u, b, A, p, f, 7);
    let T = Number(u & BigInt(4294967295));
    p[f++] = T, T = T >> 8, p[f++] = T, T = T >> 8, p[f++] = T, T = T >> 8, p[f++] = T;
    let P = Number(u >> BigInt(32) & BigInt(4294967295));
    return p[f++] = P, P = P >> 8, p[f++] = P, P = P >> 8, p[f++] = P, P = P >> 8, p[f++] = P, f;
  }
  function El(p, u, f, b, A) {
    Rl(u, b, A, p, f, 7);
    let T = Number(u & BigInt(4294967295));
    p[f + 7] = T, T = T >> 8, p[f + 6] = T, T = T >> 8, p[f + 5] = T, T = T >> 8, p[f + 4] = T;
    let P = Number(u >> BigInt(32) & BigInt(4294967295));
    return p[f + 3] = P, P = P >> 8, p[f + 2] = P, P = P >> 8, p[f + 1] = P, P = P >> 8, p[f] = P, f + 8;
  }
  s.prototype.writeBigUInt64LE = Mt(function(u, f = 0) {
    return vl(this, u, f, BigInt(0), BigInt("0xffffffffffffffff"));
  }), s.prototype.writeBigUInt64BE = Mt(function(u, f = 0) {
    return El(this, u, f, BigInt(0), BigInt("0xffffffffffffffff"));
  }), s.prototype.writeIntLE = function(u, f, b, A) {
    if (u = +u, f = f >>> 0, !A) {
      let se = Math.pow(2, 8 * b - 1);
      Ce(this, u, f, b, se - 1, -se);
    }
    let T = 0, P = 1, $ = 0;
    for (this[f] = u & 255;++T < b && (P *= 256); )
      u < 0 && $ === 0 && this[f + T - 1] !== 0 && ($ = 1), this[f + T] = (u / P >> 0) - $ & 255;
    return f + b;
  }, s.prototype.writeIntBE = function(u, f, b, A) {
    if (u = +u, f = f >>> 0, !A) {
      let se = Math.pow(2, 8 * b - 1);
      Ce(this, u, f, b, se - 1, -se);
    }
    let T = b - 1, P = 1, $ = 0;
    for (this[f + T] = u & 255;--T >= 0 && (P *= 256); )
      u < 0 && $ === 0 && this[f + T + 1] !== 0 && ($ = 1), this[f + T] = (u / P >> 0) - $ & 255;
    return f + b;
  }, s.prototype.writeInt8 = function(u, f, b) {
    return u = +u, f = f >>> 0, b || Ce(this, u, f, 1, 127, -128), u < 0 && (u = 255 + u + 1), this[f] = u & 255, f + 1;
  }, s.prototype.writeInt16LE = function(u, f, b) {
    return u = +u, f = f >>> 0, b || Ce(this, u, f, 2, 32767, -32768), this[f] = u & 255, this[f + 1] = u >>> 8, f + 2;
  }, s.prototype.writeInt16BE = function(u, f, b) {
    return u = +u, f = f >>> 0, b || Ce(this, u, f, 2, 32767, -32768), this[f] = u >>> 8, this[f + 1] = u & 255, f + 2;
  }, s.prototype.writeInt32LE = function(u, f, b) {
    return u = +u, f = f >>> 0, b || Ce(this, u, f, 4, 2147483647, -2147483648), this[f] = u & 255, this[f + 1] = u >>> 8, this[f + 2] = u >>> 16, this[f + 3] = u >>> 24, f + 4;
  }, s.prototype.writeInt32BE = function(u, f, b) {
    return u = +u, f = f >>> 0, b || Ce(this, u, f, 4, 2147483647, -2147483648), u < 0 && (u = 4294967295 + u + 1), this[f] = u >>> 24, this[f + 1] = u >>> 16, this[f + 2] = u >>> 8, this[f + 3] = u & 255, f + 4;
  }, s.prototype.writeBigInt64LE = Mt(function(u, f = 0) {
    return vl(this, u, f, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
  }), s.prototype.writeBigInt64BE = Mt(function(u, f = 0) {
    return El(this, u, f, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
  });
  function Sl(p, u, f, b, A, T) {
    if (f + b > p.length)
      throw new RangeError("Index out of range");
    if (f < 0)
      throw new RangeError("Index out of range");
  }
  function Al(p, u, f, b, A) {
    return u = +u, f = f >>> 0, A || Sl(p, u, f, 4), e.write(p, u, f, b, 23, 4), f + 4;
  }
  s.prototype.writeFloatLE = function(u, f, b) {
    return Al(this, u, f, true, b);
  }, s.prototype.writeFloatBE = function(u, f, b) {
    return Al(this, u, f, false, b);
  };
  function Il(p, u, f, b, A) {
    return u = +u, f = f >>> 0, A || Sl(p, u, f, 8), e.write(p, u, f, b, 52, 8), f + 8;
  }
  s.prototype.writeDoubleLE = function(u, f, b) {
    return Il(this, u, f, true, b);
  }, s.prototype.writeDoubleBE = function(u, f, b) {
    return Il(this, u, f, false, b);
  }, s.prototype.copy = function(u, f, b, A) {
    if (!s.isBuffer(u))
      throw new TypeError("argument should be a Buffer");
    if (b || (b = 0), !A && A !== 0 && (A = this.length), f >= u.length && (f = u.length), f || (f = 0), A > 0 && A < b && (A = b), A === b || u.length === 0 || this.length === 0)
      return 0;
    if (f < 0)
      throw new RangeError("targetStart out of bounds");
    if (b < 0 || b >= this.length)
      throw new RangeError("Index out of range");
    if (A < 0)
      throw new RangeError("sourceEnd out of bounds");
    A > this.length && (A = this.length), u.length - f < A - b && (A = u.length - f + b);
    let T = A - b;
    return this === u && typeof Uint8Array.prototype.copyWithin == "function" ? this.copyWithin(f, b, A) : Uint8Array.prototype.set.call(u, this.subarray(b, A), f), T;
  }, s.prototype.fill = function(u, f, b, A) {
    if (typeof u == "string") {
      if (typeof f == "string" ? (A = f, f = 0, b = this.length) : typeof b == "string" && (A = b, b = this.length), A !== undefined && typeof A != "string")
        throw new TypeError("encoding must be a string");
      if (typeof A == "string" && !s.isEncoding(A))
        throw new TypeError("Unknown encoding: " + A);
      if (u.length === 1) {
        let P = u.charCodeAt(0);
        (A === "utf8" && P < 128 || A === "latin1") && (u = P);
      }
    } else
      typeof u == "number" ? u = u & 255 : typeof u == "boolean" && (u = Number(u));
    if (f < 0 || this.length < f || this.length < b)
      throw new RangeError("Out of range index");
    if (b <= f)
      return this;
    f = f >>> 0, b = b === undefined ? this.length : b >>> 0, u || (u = 0);
    let T;
    if (typeof u == "number")
      for (T = f;T < b; ++T)
        this[T] = u;
    else {
      let P = s.isBuffer(u) ? u : s.from(u, A), $ = P.length;
      if ($ === 0)
        throw new TypeError('The value "' + u + '" is invalid for argument "value"');
      for (T = 0;T < b - f; ++T)
        this[T + f] = P[T % $];
    }
    return this;
  };
  let xr = {};
  function ds(p, u, f) {
    xr[p] = class extends f {
      constructor() {
        super(), Object.defineProperty(this, "message", { value: u.apply(this, arguments), writable: true, configurable: true }), this.name = `${this.name} [${p}]`, this.stack, delete this.name;
      }
      get code() {
        return p;
      }
      set code(A) {
        Object.defineProperty(this, "code", { configurable: true, enumerable: true, value: A, writable: true });
      }
      toString() {
        return `${this.name} [${p}]: ${this.message}`;
      }
    };
  }
  ds("ERR_BUFFER_OUT_OF_BOUNDS", function(p) {
    return p ? `${p} is outside of buffer bounds` : "Attempt to access memory outside buffer bounds";
  }, RangeError), ds("ERR_INVALID_ARG_TYPE", function(p, u) {
    return `The "${p}" argument must be of type number. Received type ${typeof u}`;
  }, TypeError), ds("ERR_OUT_OF_RANGE", function(p, u, f) {
    let b = `The value of "${p}" is out of range.`, A = f;
    return Number.isInteger(f) && Math.abs(f) > 2 ** 32 ? A = Tl(String(f)) : typeof f == "bigint" && (A = String(f), (f > BigInt(2) ** BigInt(32) || f < -(BigInt(2) ** BigInt(32))) && (A = Tl(A)), A += "n"), b += ` It must be ${u}. Received ${A}`, b;
  }, RangeError);
  function Tl(p) {
    let u = "", f = p.length, b = p[0] === "-" ? 1 : 0;
    for (;f >= b + 4; f -= 3)
      u = `_${p.slice(f - 3, f)}${u}`;
    return `${p.slice(0, f)}${u}`;
  }
  function jg(p, u, f) {
    Mr(u, "offset"), (p[u] === undefined || p[u + f] === undefined) && fi(u, p.length - (f + 1));
  }
  function Rl(p, u, f, b, A, T) {
    if (p > f || p < u) {
      let P = typeof u == "bigint" ? "n" : "", $;
      throw T > 3 ? u === 0 || u === BigInt(0) ? $ = `>= 0${P} and < 2${P} ** ${(T + 1) * 8}${P}` : $ = `>= -(2${P} ** ${(T + 1) * 8 - 1}${P}) and < 2 ** ${(T + 1) * 8 - 1}${P}` : $ = `>= ${u}${P} and <= ${f}${P}`, new xr.ERR_OUT_OF_RANGE("value", $, p);
    }
    jg(b, A, T);
  }
  function Mr(p, u) {
    if (typeof p != "number")
      throw new xr.ERR_INVALID_ARG_TYPE(u, "number", p);
  }
  function fi(p, u, f) {
    throw Math.floor(p) !== p ? (Mr(p, f), new xr.ERR_OUT_OF_RANGE(f || "offset", "an integer", p)) : u < 0 ? new xr.ERR_BUFFER_OUT_OF_BOUNDS : new xr.ERR_OUT_OF_RANGE(f || "offset", `>= ${f ? 1 : 0} and <= ${u}`, p);
  }
  let Fg = /[^+/0-9A-Za-z-_]/g;
  function Wg(p) {
    if (p = p.split("=")[0], p = p.trim().replace(Fg, ""), p.length < 2)
      return "";
    for (;p.length % 4 !== 0; )
      p = p + "=";
    return p;
  }
  function ps(p, u) {
    u = u || 1 / 0;
    let f, b = p.length, A = null, T = [];
    for (let P = 0;P < b; ++P) {
      if (f = p.charCodeAt(P), f > 55295 && f < 57344) {
        if (!A) {
          if (f > 56319) {
            (u -= 3) > -1 && T.push(239, 191, 189);
            continue;
          } else if (P + 1 === b) {
            (u -= 3) > -1 && T.push(239, 191, 189);
            continue;
          }
          A = f;
          continue;
        }
        if (f < 56320) {
          (u -= 3) > -1 && T.push(239, 191, 189), A = f;
          continue;
        }
        f = (A - 55296 << 10 | f - 56320) + 65536;
      } else
        A && (u -= 3) > -1 && T.push(239, 191, 189);
      if (A = null, f < 128) {
        if ((u -= 1) < 0)
          break;
        T.push(f);
      } else if (f < 2048) {
        if ((u -= 2) < 0)
          break;
        T.push(f >> 6 | 192, f & 63 | 128);
      } else if (f < 65536) {
        if ((u -= 3) < 0)
          break;
        T.push(f >> 12 | 224, f >> 6 & 63 | 128, f & 63 | 128);
      } else if (f < 1114112) {
        if ((u -= 4) < 0)
          break;
        T.push(f >> 18 | 240, f >> 12 & 63 | 128, f >> 6 & 63 | 128, f & 63 | 128);
      } else
        throw new Error("Invalid code point");
    }
    return T;
  }
  function $g(p) {
    let u = [];
    for (let f = 0;f < p.length; ++f)
      u.push(p.charCodeAt(f) & 255);
    return u;
  }
  function Hg(p, u) {
    let f, b, A, T = [];
    for (let P = 0;P < p.length && !((u -= 2) < 0); ++P)
      f = p.charCodeAt(P), b = f >> 8, A = f % 256, T.push(A), T.push(b);
    return T;
  }
  function Cl(p) {
    return t.toByteArray(Wg(p));
  }
  function ji(p, u, f, b) {
    let A;
    for (A = 0;A < b && !(A + f >= u.length || A >= p.length); ++A)
      u[A + f] = p[A];
    return A;
  }
  function Ye(p, u) {
    return p instanceof u || p != null && p.constructor != null && p.constructor.name != null && p.constructor.name === u.name;
  }
  function gs(p) {
    return p !== p;
  }
  let Vg = function() {
    let p = "0123456789abcdef", u = new Array(256);
    for (let f = 0;f < 16; ++f) {
      let b = f * 16;
      for (let A = 0;A < 16; ++A)
        u[b + A] = p[f] + p[A];
    }
    return u;
  }();
  function Mt(p) {
    return typeof BigInt > "u" ? zg : p;
  }
  function zg() {
    throw new Error("BigInt not supported");
  }
  return Zt;
};
var Y = function() {
  Y.init.call(this);
};
var en = function(t) {
  if (typeof t != "function")
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof t);
};
var nc = function(t) {
  return t._maxListeners === undefined ? Y.defaultMaxListeners : t._maxListeners;
};
var Xf = function(t, e, r, i) {
  var n, o, s, a;
  if (en(r), (o = t._events) === undefined ? (o = t._events = Object.create(null), t._eventsCount = 0) : (o.newListener !== undefined && (t.emit("newListener", e, r.listener ? r.listener : r), o = t._events), s = o[e]), s === undefined)
    s = o[e] = r, ++t._eventsCount;
  else if (typeof s == "function" ? s = o[e] = i ? [r, s] : [s, r] : i ? s.unshift(r) : s.push(r), (n = nc(t)) > 0 && s.length > n && !s.warned) {
    s.warned = true;
    var l = new Error("Possible EventEmitter memory leak detected. " + s.length + " " + String(e) + " listeners added. Use emitter.setMaxListeners() to increase limit");
    l.name = "MaxListenersExceededWarning", l.emitter = t, l.type = e, l.count = s.length, a = l, console && console.warn && console.warn(a);
  }
  return t;
};
var Gb = function() {
  if (!this.fired)
    return this.target.removeListener(this.type, this.wrapFn), this.fired = true, arguments.length === 0 ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
};
var Zf = function(t, e, r) {
  var i = { fired: false, wrapFn: undefined, target: t, type: e, listener: r }, n = Gb.bind(i);
  return n.listener = r, i.wrapFn = n, n;
};
var ec = function(t, e, r) {
  var i = t._events;
  if (i === undefined)
    return [];
  var n = i[e];
  return n === undefined ? [] : typeof n == "function" ? r ? [n.listener || n] : [n] : r ? function(o) {
    for (var s = new Array(o.length), a = 0;a < s.length; ++a)
      s[a] = o[a].listener || o[a];
    return s;
  }(n) : sc(n, n.length);
};
var tc = function(t) {
  var e = this._events;
  if (e !== undefined) {
    var r = e[t];
    if (typeof r == "function")
      return 1;
    if (r !== undefined)
      return r.length;
  }
  return 0;
};
var sc = function(t, e) {
  for (var r = new Array(e), i = 0;i < e; ++i)
    r[i] = t[i];
  return r;
};
var wc = function(t) {
  var e = t.length;
  if (e % 4 > 0)
    throw new Error("Invalid string. Length must be a multiple of 4");
  var r = t.indexOf("=");
  return r === -1 && (r = e), [r, r === e ? 0 : 4 - r % 4];
};
var gw = function(t, e, r) {
  for (var i, n, o = [], s = e;s < r; s += 3)
    i = (t[s] << 16 & 16711680) + (t[s + 1] << 8 & 65280) + (255 & t[s + 2]), o.push($e[(n = i) >> 18 & 63] + $e[n >> 12 & 63] + $e[n >> 6 & 63] + $e[63 & n]);
  return o.join("");
};
var Et = function(t) {
  if (t > 2147483647)
    throw new RangeError('The value "' + t + '" is invalid for option "size"');
  var e = new Uint8Array(t);
  return Object.setPrototypeOf(e, O.prototype), e;
};
var O = function(t, e, r) {
  if (typeof t == "number") {
    if (typeof e == "string")
      throw new TypeError('The "string" argument must be of type string. Received type number');
    return Ks(t);
  }
  return Cc(t, e, r);
};
var Cc = function(t, e, r) {
  if (typeof t == "string")
    return function(o, s) {
      if (typeof s == "string" && s !== "" || (s = "utf8"), !O.isEncoding(s))
        throw new TypeError("Unknown encoding: " + s);
      var a = 0 | Pc(o, s), l = Et(a), c = l.write(o, s);
      return c !== a && (l = l.slice(0, c)), l;
    }(t, e);
  if (ArrayBuffer.isView(t))
    return Hs(t);
  if (t == null)
    throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof t);
  if (St(t, ArrayBuffer) || t && St(t.buffer, ArrayBuffer) || typeof SharedArrayBuffer < "u" && (St(t, SharedArrayBuffer) || t && St(t.buffer, SharedArrayBuffer)))
    return mc(t, e, r);
  if (typeof t == "number")
    throw new TypeError('The "value" argument must not be of type number. Received type number');
  var i = t.valueOf && t.valueOf();
  if (i != null && i !== t)
    return O.from(i, e, r);
  var n = function(o) {
    if (O.isBuffer(o)) {
      var s = 0 | Ys(o.length), a = Et(s);
      return a.length === 0 || o.copy(a, 0, 0, s), a;
    }
    if (o.length !== undefined)
      return typeof o.length != "number" || Js(o.length) ? Et(0) : Hs(o);
    if (o.type === "Buffer" && Array.isArray(o.data))
      return Hs(o.data);
  }(t);
  if (n)
    return n;
  if (typeof Symbol < "u" && Symbol.toPrimitive != null && typeof t[Symbol.toPrimitive] == "function")
    return O.from(t[Symbol.toPrimitive]("string"), e, r);
  throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof t);
};
var Bc = function(t) {
  if (typeof t != "number")
    throw new TypeError('"size" argument must be of type number');
  if (t < 0)
    throw new RangeError('The value "' + t + '" is invalid for option "size"');
};
var Ks = function(t) {
  return Bc(t), Et(t < 0 ? 0 : 0 | Ys(t));
};
var Hs = function(t) {
  for (var e = t.length < 0 ? 0 : 0 | Ys(t.length), r = Et(e), i = 0;i < e; i += 1)
    r[i] = 255 & t[i];
  return r;
};
var mc = function(t, e, r) {
  if (e < 0 || t.byteLength < e)
    throw new RangeError('"offset" is outside of buffer bounds');
  if (t.byteLength < e + (r || 0))
    throw new RangeError('"length" is outside of buffer bounds');
  var i;
  return i = e === undefined && r === undefined ? new Uint8Array(t) : r === undefined ? new Uint8Array(t, e) : new Uint8Array(t, e, r), Object.setPrototypeOf(i, O.prototype), i;
};
var Ys = function(t) {
  if (t >= 2147483647)
    throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + 2147483647 .toString(16) + " bytes");
  return 0 | t;
};
var Pc = function(t, e) {
  if (O.isBuffer(t))
    return t.length;
  if (ArrayBuffer.isView(t) || St(t, ArrayBuffer))
    return t.byteLength;
  if (typeof t != "string")
    throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof t);
  var r = t.length, i = arguments.length > 2 && arguments[2] === true;
  if (!i && r === 0)
    return 0;
  for (var n = false;; )
    switch (e) {
      case "ascii":
      case "latin1":
      case "binary":
        return r;
      case "utf8":
      case "utf-8":
        return Gs(t).length;
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return 2 * r;
      case "hex":
        return r >>> 1;
      case "base64":
        return Mc(t).length;
      default:
        if (n)
          return i ? -1 : Gs(t).length;
        e = ("" + e).toLowerCase(), n = true;
    }
};
var bw = function(t, e, r) {
  var i = false;
  if ((e === undefined || e < 0) && (e = 0), e > this.length || ((r === undefined || r > this.length) && (r = this.length), r <= 0) || (r >>>= 0) <= (e >>>= 0))
    return "";
  for (t || (t = "utf8");; )
    switch (t) {
      case "hex":
        return Tw(this, e, r);
      case "utf8":
      case "utf-8":
        return Oc(this, e, r);
      case "ascii":
        return Aw(this, e, r);
      case "latin1":
      case "binary":
        return Iw(this, e, r);
      case "base64":
        return Sw(this, e, r);
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return Rw(this, e, r);
      default:
        if (i)
          throw new TypeError("Unknown encoding: " + t);
        t = (t + "").toLowerCase(), i = true;
    }
};
var ar = function(t, e, r) {
  var i = t[e];
  t[e] = t[r], t[r] = i;
};
var vc = function(t, e, r, i, n) {
  if (t.length === 0)
    return -1;
  if (typeof r == "string" ? (i = r, r = 0) : r > 2147483647 ? r = 2147483647 : r < -2147483648 && (r = -2147483648), Js(r = +r) && (r = n ? 0 : t.length - 1), r < 0 && (r = t.length + r), r >= t.length) {
    if (n)
      return -1;
    r = t.length - 1;
  } else if (r < 0) {
    if (!n)
      return -1;
    r = 0;
  }
  if (typeof e == "string" && (e = O.from(e, i)), O.isBuffer(e))
    return e.length === 0 ? -1 : Ec(t, e, r, i, n);
  if (typeof e == "number")
    return e &= 255, typeof Uint8Array.prototype.indexOf == "function" ? n ? Uint8Array.prototype.indexOf.call(t, e, r) : Uint8Array.prototype.lastIndexOf.call(t, e, r) : Ec(t, [e], r, i, n);
  throw new TypeError("val must be string, number or Buffer");
};
var Ec = function(t, e, r, i, n) {
  var o, s = 1, a = t.length, l = e.length;
  if (i !== undefined && ((i = String(i).toLowerCase()) === "ucs2" || i === "ucs-2" || i === "utf16le" || i === "utf-16le")) {
    if (t.length < 2 || e.length < 2)
      return -1;
    s = 2, a /= 2, l /= 2, r /= 2;
  }
  function c(y, w) {
    return s === 1 ? y[w] : y.readUInt16BE(w * s);
  }
  if (n) {
    var h = -1;
    for (o = r;o < a; o++)
      if (c(t, o) === c(e, h === -1 ? 0 : o - h)) {
        if (h === -1 && (h = o), o - h + 1 === l)
          return h * s;
      } else
        h !== -1 && (o -= o - h), h = -1;
  } else
    for (r + l > a && (r = a - l), o = r;o >= 0; o--) {
      for (var d = true, g = 0;g < l; g++)
        if (c(t, o + g) !== c(e, g)) {
          d = false;
          break;
        }
      if (d)
        return o;
    }
  return -1;
};
var ww = function(t, e, r, i) {
  r = Number(r) || 0;
  var n = t.length - r;
  i ? (i = Number(i)) > n && (i = n) : i = n;
  var o = e.length;
  i > o / 2 && (i = o / 2);
  for (var s = 0;s < i; ++s) {
    var a = parseInt(e.substr(2 * s, 2), 16);
    if (Js(a))
      return s;
    t[r + s] = a;
  }
  return s;
};
var _w = function(t, e, r, i) {
  return cn(Gs(e, t.length - r), t, r, i);
};
var kc = function(t, e, r, i) {
  return cn(function(n) {
    for (var o = [], s = 0;s < n.length; ++s)
      o.push(255 & n.charCodeAt(s));
    return o;
  }(e), t, r, i);
};
var mw = function(t, e, r, i) {
  return kc(t, e, r, i);
};
var vw = function(t, e, r, i) {
  return cn(Mc(e), t, r, i);
};
var Ew = function(t, e, r, i) {
  return cn(function(n, o) {
    for (var s, a, l, c = [], h = 0;h < n.length && !((o -= 2) < 0); ++h)
      s = n.charCodeAt(h), a = s >> 8, l = s % 256, c.push(l), c.push(a);
    return c;
  }(e, t.length - r), t, r, i);
};
var Sw = function(t, e, r) {
  return e === 0 && r === t.length ? zs.fromByteArray(t) : zs.fromByteArray(t.slice(e, r));
};
var Oc = function(t, e, r) {
  r = Math.min(t.length, r);
  for (var i = [], n = e;n < r; ) {
    var o, s, a, l, c = t[n], h = null, d = c > 239 ? 4 : c > 223 ? 3 : c > 191 ? 2 : 1;
    if (n + d <= r)
      switch (d) {
        case 1:
          c < 128 && (h = c);
          break;
        case 2:
          (192 & (o = t[n + 1])) == 128 && (l = (31 & c) << 6 | 63 & o) > 127 && (h = l);
          break;
        case 3:
          o = t[n + 1], s = t[n + 2], (192 & o) == 128 && (192 & s) == 128 && (l = (15 & c) << 12 | (63 & o) << 6 | 63 & s) > 2047 && (l < 55296 || l > 57343) && (h = l);
          break;
        case 4:
          o = t[n + 1], s = t[n + 2], a = t[n + 3], (192 & o) == 128 && (192 & s) == 128 && (192 & a) == 128 && (l = (15 & c) << 18 | (63 & o) << 12 | (63 & s) << 6 | 63 & a) > 65535 && l < 1114112 && (h = l);
      }
    h === null ? (h = 65533, d = 1) : h > 65535 && (h -= 65536, i.push(h >>> 10 & 1023 | 55296), h = 56320 | 1023 & h), i.push(h), n += d;
  }
  return function(g) {
    var y = g.length;
    if (y <= 4096)
      return String.fromCharCode.apply(String, g);
    for (var w = "", S = 0;S < y; )
      w += String.fromCharCode.apply(String, g.slice(S, S += 4096));
    return w;
  }(i);
};
var Aw = function(t, e, r) {
  var i = "";
  r = Math.min(t.length, r);
  for (var n = e;n < r; ++n)
    i += String.fromCharCode(127 & t[n]);
  return i;
};
var Iw = function(t, e, r) {
  var i = "";
  r = Math.min(t.length, r);
  for (var n = e;n < r; ++n)
    i += String.fromCharCode(t[n]);
  return i;
};
var Tw = function(t, e, r) {
  var i = t.length;
  (!e || e < 0) && (e = 0), (!r || r < 0 || r > i) && (r = i);
  for (var n = "", o = e;o < r; ++o)
    n += Bw[t[o]];
  return n;
};
var Rw = function(t, e, r) {
  for (var i = t.slice(e, r), n = "", o = 0;o < i.length; o += 2)
    n += String.fromCharCode(i[o] + 256 * i[o + 1]);
  return n;
};
var we = function(t, e, r) {
  if (t % 1 != 0 || t < 0)
    throw new RangeError("offset is not uint");
  if (t + e > r)
    throw new RangeError("Trying to access beyond buffer length");
};
var Pe = function(t, e, r, i, n, o) {
  if (!O.isBuffer(t))
    throw new TypeError('"buffer" argument must be a Buffer instance');
  if (e > n || e < o)
    throw new RangeError('"value" argument is out of bounds');
  if (r + i > t.length)
    throw new RangeError("Index out of range");
};
var xc = function(t, e, r, i, n, o) {
  if (r + i > t.length)
    throw new RangeError("Index out of range");
  if (r < 0)
    throw new RangeError("Index out of range");
};
var Sc = function(t, e, r, i, n) {
  return e = +e, r >>>= 0, n || xc(t, 0, r, 4), Dr.write(t, e, r, i, 23, 4), r + 4;
};
var Ac = function(t, e, r, i, n) {
  return e = +e, r >>>= 0, n || xc(t, 0, r, 8), Dr.write(t, e, r, i, 52, 8), r + 8;
};
var Gs = function(t, e) {
  var r;
  e = e || 1 / 0;
  for (var i = t.length, n = null, o = [], s = 0;s < i; ++s) {
    if ((r = t.charCodeAt(s)) > 55295 && r < 57344) {
      if (!n) {
        if (r > 56319) {
          (e -= 3) > -1 && o.push(239, 191, 189);
          continue;
        }
        if (s + 1 === i) {
          (e -= 3) > -1 && o.push(239, 191, 189);
          continue;
        }
        n = r;
        continue;
      }
      if (r < 56320) {
        (e -= 3) > -1 && o.push(239, 191, 189), n = r;
        continue;
      }
      r = 65536 + (n - 55296 << 10 | r - 56320);
    } else
      n && (e -= 3) > -1 && o.push(239, 191, 189);
    if (n = null, r < 128) {
      if ((e -= 1) < 0)
        break;
      o.push(r);
    } else if (r < 2048) {
      if ((e -= 2) < 0)
        break;
      o.push(r >> 6 | 192, 63 & r | 128);
    } else if (r < 65536) {
      if ((e -= 3) < 0)
        break;
      o.push(r >> 12 | 224, r >> 6 & 63 | 128, 63 & r | 128);
    } else {
      if (!(r < 1114112))
        throw new Error("Invalid code point");
      if ((e -= 4) < 0)
        break;
      o.push(r >> 18 | 240, r >> 12 & 63 | 128, r >> 6 & 63 | 128, 63 & r | 128);
    }
  }
  return o;
};
var Mc = function(t) {
  return zs.toByteArray(function(e) {
    if ((e = (e = e.split("=")[0]).trim().replace(Cw, "")).length < 2)
      return "";
    for (;e.length % 4 != 0; )
      e += "=";
    return e;
  }(t));
};
var cn = function(t, e, r, i) {
  for (var n = 0;n < i && !(n + r >= e.length || n >= t.length); ++n)
    e[n + r] = t[n];
  return n;
};
var St = function(t, e) {
  return t instanceof e || t != null && t.constructor != null && t.constructor.name != null && t.constructor.name === e.name;
};
var Js = function(t) {
  return t != t;
};
var Ic = function(t, e) {
  for (var r in t)
    e[r] = t[r];
};
var lr = function(t, e, r) {
  return it(t, e, r);
};
var pi = function(t) {
  var e;
  switch (this.encoding = function(r) {
    var i = function(n) {
      if (!n)
        return "utf8";
      for (var o;; )
        switch (n) {
          case "utf8":
          case "utf-8":
            return "utf8";
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return "utf16le";
          case "latin1":
          case "binary":
            return "latin1";
          case "base64":
          case "ascii":
          case "hex":
            return n;
          default:
            if (o)
              return;
            n = ("" + n).toLowerCase(), o = true;
        }
    }(r);
    if (typeof i != "string" && (Qs.isEncoding === Tc || !Tc(r)))
      throw new Error("Unknown encoding: " + r);
    return i || r;
  }(t), this.encoding) {
    case "utf16le":
      this.text = Ow, this.end = xw, e = 4;
      break;
    case "utf8":
      this.fillLast = kw, e = 4;
      break;
    case "base64":
      this.text = Mw, this.end = Lw, e = 3;
      break;
    default:
      return this.write = Uw, this.end = Nw, undefined;
  }
  this.lastNeed = 0, this.lastTotal = 0, this.lastChar = Qs.allocUnsafe(e);
};
var Vs = function(t) {
  return t <= 127 ? 0 : t >> 5 == 6 ? 2 : t >> 4 == 14 ? 3 : t >> 3 == 30 ? 4 : t >> 6 == 2 ? -1 : -2;
};
var kw = function(t) {
  var e = this.lastTotal - this.lastNeed, r = function(i, n, o) {
    if ((192 & n[0]) != 128)
      return i.lastNeed = 0, "\uFFFD";
    if (i.lastNeed > 1 && n.length > 1) {
      if ((192 & n[1]) != 128)
        return i.lastNeed = 1, "\uFFFD";
      if (i.lastNeed > 2 && n.length > 2 && (192 & n[2]) != 128)
        return i.lastNeed = 2, "\uFFFD";
    }
  }(this, t);
  return r !== undefined ? r : this.lastNeed <= t.length ? (t.copy(this.lastChar, e, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal)) : (t.copy(this.lastChar, e, 0, t.length), this.lastNeed -= t.length, undefined);
};
var Ow = function(t, e) {
  if ((t.length - e) % 2 == 0) {
    var r = t.toString("utf16le", e);
    if (r) {
      var i = r.charCodeAt(r.length - 1);
      if (i >= 55296 && i <= 56319)
        return this.lastNeed = 2, this.lastTotal = 4, this.lastChar[0] = t[t.length - 2], this.lastChar[1] = t[t.length - 1], r.slice(0, -1);
    }
    return r;
  }
  return this.lastNeed = 1, this.lastTotal = 2, this.lastChar[0] = t[t.length - 1], t.toString("utf16le", e, t.length - 1);
};
var xw = function(t) {
  var e = t && t.length ? this.write(t) : "";
  if (this.lastNeed) {
    var r = this.lastTotal - this.lastNeed;
    return e + this.lastChar.toString("utf16le", 0, r);
  }
  return e;
};
var Mw = function(t, e) {
  var r = (t.length - e) % 3;
  return r === 0 ? t.toString("base64", e) : (this.lastNeed = 3 - r, this.lastTotal = 3, r === 1 ? this.lastChar[0] = t[t.length - 1] : (this.lastChar[0] = t[t.length - 2], this.lastChar[1] = t[t.length - 1]), t.toString("base64", e, t.length - r));
};
var Lw = function(t) {
  var e = t && t.length ? this.write(t) : "";
  return this.lastNeed ? e + this.lastChar.toString("base64", 0, 3 - this.lastNeed) : e;
};
var Uw = function(t) {
  return t.toString(this.encoding);
};
var Nw = function(t) {
  return t && t.length ? this.write(t) : "";
};
var Rr = function(t) {
  throw new RangeError(sE[t]);
};
var zp = function(t, e) {
  let r = t.split("@"), i = "";
  r.length > 1 && (i = r[0] + "@", t = r[1]);
  let n = function(o, s) {
    let a = [], l = o.length;
    for (;l--; )
      a[l] = s(o[l]);
    return a;
  }((t = t.replace(nE, ".")).split("."), e).join(".");
  return i + n;
};
var Yp = function(t) {
  let e = [], r = 0, i = t.length;
  for (;r < i; ) {
    let n = t.charCodeAt(r++);
    if (n >= 55296 && n <= 56319 && r < i) {
      let o = t.charCodeAt(r++);
      (64512 & o) == 56320 ? e.push(((1023 & n) << 10) + (1023 & o) + 65536) : (e.push(n), r--);
    } else
      e.push(n);
  }
  return e;
};
var oE = function(t, e) {
  return Object.prototype.hasOwnProperty.call(t, e);
};
var Ga = function() {
  throw new Error("setTimeout has not been defined");
};
var Qa = function() {
  throw new Error("clearTimeout has not been defined");
};
var rg = function(t) {
  if (Pt === setTimeout)
    return setTimeout(t, 0);
  if ((Pt === Ga || !Pt) && setTimeout)
    return Pt = setTimeout, setTimeout(t, 0);
  try {
    return Pt(t, 0);
  } catch {
    try {
      return Pt.call(null, t, 0);
    } catch {
      return Pt.call(this || si, t, 0);
    }
  }
};
var uE = function() {
  ni && Cr && (ni = false, Cr.length ? Ot = Cr.concat(Ot) : as = -1, Ot.length && ig());
};
var ig = function() {
  if (!ni) {
    var t = rg(uE);
    ni = true;
    for (var e = Ot.length;e; ) {
      for (Cr = Ot, Ot = [];++as < e; )
        Cr && Cr[as].run();
      as = -1, e = Ot.length;
    }
    Cr = null, ni = false, function(r) {
      if (kt === clearTimeout)
        return clearTimeout(r);
      if ((kt === Qa || !kt) && clearTimeout)
        return kt = clearTimeout, clearTimeout(r);
      try {
        kt(r);
      } catch {
        try {
          return kt.call(null, r);
        } catch {
          return kt.call(this || si, r);
        }
      }
    }(t);
  }
};
var eg = function(t, e) {
  (this || si).fun = t, (this || si).array = e;
};
var Bt = function() {
};
var fE = function() {
  if (sg)
    return Ya;
  sg = true;
  var t = Ya = {}, e, r;
  function i() {
    throw new Error("setTimeout has not been defined");
  }
  function n() {
    throw new Error("clearTimeout has not been defined");
  }
  (function() {
    try {
      typeof setTimeout == "function" ? e = setTimeout : e = i;
    } catch {
      e = i;
    }
    try {
      typeof clearTimeout == "function" ? r = clearTimeout : r = n;
    } catch {
      r = n;
    }
  })();
  function o(S) {
    if (e === setTimeout)
      return setTimeout(S, 0);
    if ((e === i || !e) && setTimeout)
      return e = setTimeout, setTimeout(S, 0);
    try {
      return e(S, 0);
    } catch {
      try {
        return e.call(null, S, 0);
      } catch {
        return e.call(this || oi, S, 0);
      }
    }
  }
  function s(S) {
    if (r === clearTimeout)
      return clearTimeout(S);
    if ((r === n || !r) && clearTimeout)
      return r = clearTimeout, clearTimeout(S);
    try {
      return r(S);
    } catch {
      try {
        return r.call(null, S);
      } catch {
        return r.call(this || oi, S);
      }
    }
  }
  var a = [], l = false, c, h = -1;
  function d() {
    !l || !c || (l = false, c.length ? a = c.concat(a) : h = -1, a.length && g());
  }
  function g() {
    if (!l) {
      var S = o(d);
      l = true;
      for (var E = a.length;E; ) {
        for (c = a, a = [];++h < E; )
          c && c[h].run();
        h = -1, E = a.length;
      }
      c = null, l = false, s(S);
    }
  }
  t.nextTick = function(S) {
    var E = new Array(arguments.length - 1);
    if (arguments.length > 1)
      for (var I = 1;I < arguments.length; I++)
        E[I - 1] = arguments[I];
    a.push(new y(S, E)), a.length === 1 && !l && o(g);
  };
  function y(S, E) {
    (this || oi).fun = S, (this || oi).array = E;
  }
  y.prototype.run = function() {
    (this || oi).fun.apply(null, (this || oi).array);
  }, t.title = "browser", t.browser = true, t.env = {}, t.argv = [], t.version = "", t.versions = {};
  function w() {
  }
  return t.on = w, t.addListener = w, t.once = w, t.off = w, t.removeListener = w, t.removeAllListeners = w, t.emit = w, t.prependListener = w, t.prependOnceListener = w, t.listeners = function(S) {
    return [];
  }, t.binding = function(S) {
    throw new Error("process.binding is not supported");
  }, t.cwd = function() {
    return "/";
  }, t.chdir = function(S) {
    throw new Error("process.chdir is not supported");
  }, t.umask = function() {
    return 0;
  }, Ya;
};
var cE = function() {
  if (og)
    return Xa;
  og = true;
  var t = re;
  function e(o) {
    if (typeof o != "string")
      throw new TypeError("Path must be a string. Received " + JSON.stringify(o));
  }
  function r(o, s) {
    for (var a = "", l = 0, c = -1, h = 0, d, g = 0;g <= o.length; ++g) {
      if (g < o.length)
        d = o.charCodeAt(g);
      else {
        if (d === 47)
          break;
        d = 47;
      }
      if (d === 47) {
        if (!(c === g - 1 || h === 1))
          if (c !== g - 1 && h === 2) {
            if (a.length < 2 || l !== 2 || a.charCodeAt(a.length - 1) !== 46 || a.charCodeAt(a.length - 2) !== 46) {
              if (a.length > 2) {
                var y = a.lastIndexOf("/");
                if (y !== a.length - 1) {
                  y === -1 ? (a = "", l = 0) : (a = a.slice(0, y), l = a.length - 1 - a.lastIndexOf("/")), c = g, h = 0;
                  continue;
                }
              } else if (a.length === 2 || a.length === 1) {
                a = "", l = 0, c = g, h = 0;
                continue;
              }
            }
            s && (a.length > 0 ? a += "/.." : a = "..", l = 2);
          } else
            a.length > 0 ? a += "/" + o.slice(c + 1, g) : a = o.slice(c + 1, g), l = g - c - 1;
        c = g, h = 0;
      } else
        d === 46 && h !== -1 ? ++h : h = -1;
    }
    return a;
  }
  function i(o, s) {
    var a = s.dir || s.root, l = s.base || (s.name || "") + (s.ext || "");
    return a ? a === s.root ? a + l : a + o + l : l;
  }
  var n = { resolve: function() {
    for (var s = "", a = false, l, c = arguments.length - 1;c >= -1 && !a; c--) {
      var h;
      c >= 0 ? h = arguments[c] : (l === undefined && (l = t.cwd()), h = l), e(h), h.length !== 0 && (s = h + "/" + s, a = h.charCodeAt(0) === 47);
    }
    return s = r(s, !a), a ? s.length > 0 ? "/" + s : "/" : s.length > 0 ? s : ".";
  }, normalize: function(s) {
    if (e(s), s.length === 0)
      return ".";
    var a = s.charCodeAt(0) === 47, l = s.charCodeAt(s.length - 1) === 47;
    return s = r(s, !a), s.length === 0 && !a && (s = "."), s.length > 0 && l && (s += "/"), a ? "/" + s : s;
  }, isAbsolute: function(s) {
    return e(s), s.length > 0 && s.charCodeAt(0) === 47;
  }, join: function() {
    if (arguments.length === 0)
      return ".";
    for (var s, a = 0;a < arguments.length; ++a) {
      var l = arguments[a];
      e(l), l.length > 0 && (s === undefined ? s = l : s += "/" + l);
    }
    return s === undefined ? "." : n.normalize(s);
  }, relative: function(s, a) {
    if (e(s), e(a), s === a || (s = n.resolve(s), a = n.resolve(a), s === a))
      return "";
    for (var l = 1;l < s.length && s.charCodeAt(l) === 47; ++l)
      ;
    for (var c = s.length, h = c - l, d = 1;d < a.length && a.charCodeAt(d) === 47; ++d)
      ;
    for (var g = a.length, y = g - d, w = h < y ? h : y, S = -1, E = 0;E <= w; ++E) {
      if (E === w) {
        if (y > w) {
          if (a.charCodeAt(d + E) === 47)
            return a.slice(d + E + 1);
          if (E === 0)
            return a.slice(d + E);
        } else
          h > w && (s.charCodeAt(l + E) === 47 ? S = E : E === 0 && (S = 0));
        break;
      }
      var I = s.charCodeAt(l + E), C = a.charCodeAt(d + E);
      if (I !== C)
        break;
      I === 47 && (S = E);
    }
    var R = "";
    for (E = l + S + 1;E <= c; ++E)
      (E === c || s.charCodeAt(E) === 47) && (R.length === 0 ? R += ".." : R += "/..");
    return R.length > 0 ? R + a.slice(d + S) : (d += S, a.charCodeAt(d) === 47 && ++d, a.slice(d));
  }, _makeLong: function(s) {
    return s;
  }, dirname: function(s) {
    if (e(s), s.length === 0)
      return ".";
    for (var a = s.charCodeAt(0), l = a === 47, c = -1, h = true, d = s.length - 1;d >= 1; --d)
      if (a = s.charCodeAt(d), a === 47) {
        if (!h) {
          c = d;
          break;
        }
      } else
        h = false;
    return c === -1 ? l ? "/" : "." : l && c === 1 ? "//" : s.slice(0, c);
  }, basename: function(s, a) {
    if (a !== undefined && typeof a != "string")
      throw new TypeError('"ext" argument must be a string');
    e(s);
    var l = 0, c = -1, h = true, d;
    if (a !== undefined && a.length > 0 && a.length <= s.length) {
      if (a.length === s.length && a === s)
        return "";
      var g = a.length - 1, y = -1;
      for (d = s.length - 1;d >= 0; --d) {
        var w = s.charCodeAt(d);
        if (w === 47) {
          if (!h) {
            l = d + 1;
            break;
          }
        } else
          y === -1 && (h = false, y = d + 1), g >= 0 && (w === a.charCodeAt(g) ? --g === -1 && (c = d) : (g = -1, c = y));
      }
      return l === c ? c = y : c === -1 && (c = s.length), s.slice(l, c);
    } else {
      for (d = s.length - 1;d >= 0; --d)
        if (s.charCodeAt(d) === 47) {
          if (!h) {
            l = d + 1;
            break;
          }
        } else
          c === -1 && (h = false, c = d + 1);
      return c === -1 ? "" : s.slice(l, c);
    }
  }, extname: function(s) {
    e(s);
    for (var a = -1, l = 0, c = -1, h = true, d = 0, g = s.length - 1;g >= 0; --g) {
      var y = s.charCodeAt(g);
      if (y === 47) {
        if (!h) {
          l = g + 1;
          break;
        }
        continue;
      }
      c === -1 && (h = false, c = g + 1), y === 46 ? a === -1 ? a = g : d !== 1 && (d = 1) : a !== -1 && (d = -1);
    }
    return a === -1 || c === -1 || d === 0 || d === 1 && a === c - 1 && a === l + 1 ? "" : s.slice(a, c);
  }, format: function(s) {
    if (s === null || typeof s != "object")
      throw new TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof s);
    return i("/", s);
  }, parse: function(s) {
    e(s);
    var a = { root: "", dir: "", base: "", ext: "", name: "" };
    if (s.length === 0)
      return a;
    var l = s.charCodeAt(0), c = l === 47, h;
    c ? (a.root = "/", h = 1) : h = 0;
    for (var d = -1, g = 0, y = -1, w = true, S = s.length - 1, E = 0;S >= h; --S) {
      if (l = s.charCodeAt(S), l === 47) {
        if (!w) {
          g = S + 1;
          break;
        }
        continue;
      }
      y === -1 && (w = false, y = S + 1), l === 46 ? d === -1 ? d = S : E !== 1 && (E = 1) : d !== -1 && (E = -1);
    }
    return d === -1 || y === -1 || E === 0 || E === 1 && d === y - 1 && d === g + 1 ? y !== -1 && (g === 0 && c ? a.base = a.name = s.slice(1, y) : a.base = a.name = s.slice(g, y)) : (g === 0 && c ? (a.name = s.slice(1, d), a.base = s.slice(1, y)) : (a.name = s.slice(g, d), a.base = s.slice(g, y)), a.ext = s.slice(d, y)), g > 0 ? a.dir = s.slice(0, g - 1) : c && (a.dir = "/"), a;
  }, sep: "/", delimiter: ":", win32: null, posix: null };
  return n.posix = n, Xa = n, Xa;
};
var Fe = function() {
  this.protocol = null, this.slashes = null, this.auth = null, this.host = null, this.port = null, this.hostname = null, this.hash = null, this.search = null, this.query = null, this.pathname = null, this.path = null, this.href = null;
};
var Li = function(t, e, r) {
  if (t && gt.isObject(t) && t instanceof Fe)
    return t;
  var i = new Fe;
  return i.parse(t, e, r), i;
};
var _E = function() {
  if (cg)
    return rl;
  cg = true;
  var t = ne;
  function e(o) {
    if (typeof o != "string")
      throw new TypeError("Path must be a string. Received " + JSON.stringify(o));
  }
  function r(o, s) {
    for (var a = "", l = 0, c = -1, h = 0, d, g = 0;g <= o.length; ++g) {
      if (g < o.length)
        d = o.charCodeAt(g);
      else {
        if (d === 47)
          break;
        d = 47;
      }
      if (d === 47) {
        if (!(c === g - 1 || h === 1))
          if (c !== g - 1 && h === 2) {
            if (a.length < 2 || l !== 2 || a.charCodeAt(a.length - 1) !== 46 || a.charCodeAt(a.length - 2) !== 46) {
              if (a.length > 2) {
                var y = a.lastIndexOf("/");
                if (y !== a.length - 1) {
                  y === -1 ? (a = "", l = 0) : (a = a.slice(0, y), l = a.length - 1 - a.lastIndexOf("/")), c = g, h = 0;
                  continue;
                }
              } else if (a.length === 2 || a.length === 1) {
                a = "", l = 0, c = g, h = 0;
                continue;
              }
            }
            s && (a.length > 0 ? a += "/.." : a = "..", l = 2);
          } else
            a.length > 0 ? a += "/" + o.slice(c + 1, g) : a = o.slice(c + 1, g), l = g - c - 1;
        c = g, h = 0;
      } else
        d === 46 && h !== -1 ? ++h : h = -1;
    }
    return a;
  }
  function i(o, s) {
    var a = s.dir || s.root, l = s.base || (s.name || "") + (s.ext || "");
    return a ? a === s.root ? a + l : a + o + l : l;
  }
  var n = { resolve: function() {
    for (var s = "", a = false, l, c = arguments.length - 1;c >= -1 && !a; c--) {
      var h;
      c >= 0 ? h = arguments[c] : (l === undefined && (l = t.cwd()), h = l), e(h), h.length !== 0 && (s = h + "/" + s, a = h.charCodeAt(0) === 47);
    }
    return s = r(s, !a), a ? s.length > 0 ? "/" + s : "/" : s.length > 0 ? s : ".";
  }, normalize: function(s) {
    if (e(s), s.length === 0)
      return ".";
    var a = s.charCodeAt(0) === 47, l = s.charCodeAt(s.length - 1) === 47;
    return s = r(s, !a), s.length === 0 && !a && (s = "."), s.length > 0 && l && (s += "/"), a ? "/" + s : s;
  }, isAbsolute: function(s) {
    return e(s), s.length > 0 && s.charCodeAt(0) === 47;
  }, join: function() {
    if (arguments.length === 0)
      return ".";
    for (var s, a = 0;a < arguments.length; ++a) {
      var l = arguments[a];
      e(l), l.length > 0 && (s === undefined ? s = l : s += "/" + l);
    }
    return s === undefined ? "." : n.normalize(s);
  }, relative: function(s, a) {
    if (e(s), e(a), s === a || (s = n.resolve(s), a = n.resolve(a), s === a))
      return "";
    for (var l = 1;l < s.length && s.charCodeAt(l) === 47; ++l)
      ;
    for (var c = s.length, h = c - l, d = 1;d < a.length && a.charCodeAt(d) === 47; ++d)
      ;
    for (var g = a.length, y = g - d, w = h < y ? h : y, S = -1, E = 0;E <= w; ++E) {
      if (E === w) {
        if (y > w) {
          if (a.charCodeAt(d + E) === 47)
            return a.slice(d + E + 1);
          if (E === 0)
            return a.slice(d + E);
        } else
          h > w && (s.charCodeAt(l + E) === 47 ? S = E : E === 0 && (S = 0));
        break;
      }
      var I = s.charCodeAt(l + E), C = a.charCodeAt(d + E);
      if (I !== C)
        break;
      I === 47 && (S = E);
    }
    var R = "";
    for (E = l + S + 1;E <= c; ++E)
      (E === c || s.charCodeAt(E) === 47) && (R.length === 0 ? R += ".." : R += "/..");
    return R.length > 0 ? R + a.slice(d + S) : (d += S, a.charCodeAt(d) === 47 && ++d, a.slice(d));
  }, _makeLong: function(s) {
    return s;
  }, dirname: function(s) {
    if (e(s), s.length === 0)
      return ".";
    for (var a = s.charCodeAt(0), l = a === 47, c = -1, h = true, d = s.length - 1;d >= 1; --d)
      if (a = s.charCodeAt(d), a === 47) {
        if (!h) {
          c = d;
          break;
        }
      } else
        h = false;
    return c === -1 ? l ? "/" : "." : l && c === 1 ? "//" : s.slice(0, c);
  }, basename: function(s, a) {
    if (a !== undefined && typeof a != "string")
      throw new TypeError('"ext" argument must be a string');
    e(s);
    var l = 0, c = -1, h = true, d;
    if (a !== undefined && a.length > 0 && a.length <= s.length) {
      if (a.length === s.length && a === s)
        return "";
      var g = a.length - 1, y = -1;
      for (d = s.length - 1;d >= 0; --d) {
        var w = s.charCodeAt(d);
        if (w === 47) {
          if (!h) {
            l = d + 1;
            break;
          }
        } else
          y === -1 && (h = false, y = d + 1), g >= 0 && (w === a.charCodeAt(g) ? --g === -1 && (c = d) : (g = -1, c = y));
      }
      return l === c ? c = y : c === -1 && (c = s.length), s.slice(l, c);
    } else {
      for (d = s.length - 1;d >= 0; --d)
        if (s.charCodeAt(d) === 47) {
          if (!h) {
            l = d + 1;
            break;
          }
        } else
          c === -1 && (h = false, c = d + 1);
      return c === -1 ? "" : s.slice(l, c);
    }
  }, extname: function(s) {
    e(s);
    for (var a = -1, l = 0, c = -1, h = true, d = 0, g = s.length - 1;g >= 0; --g) {
      var y = s.charCodeAt(g);
      if (y === 47) {
        if (!h) {
          l = g + 1;
          break;
        }
        continue;
      }
      c === -1 && (h = false, c = g + 1), y === 46 ? a === -1 ? a = g : d !== 1 && (d = 1) : a !== -1 && (d = -1);
    }
    return a === -1 || c === -1 || d === 0 || d === 1 && a === c - 1 && a === l + 1 ? "" : s.slice(a, c);
  }, format: function(s) {
    if (s === null || typeof s != "object")
      throw new TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof s);
    return i("/", s);
  }, parse: function(s) {
    e(s);
    var a = { root: "", dir: "", base: "", ext: "", name: "" };
    if (s.length === 0)
      return a;
    var l = s.charCodeAt(0), c = l === 47, h;
    c ? (a.root = "/", h = 1) : h = 0;
    for (var d = -1, g = 0, y = -1, w = true, S = s.length - 1, E = 0;S >= h; --S) {
      if (l = s.charCodeAt(S), l === 47) {
        if (!w) {
          g = S + 1;
          break;
        }
        continue;
      }
      y === -1 && (w = false, y = S + 1), l === 46 ? d === -1 ? d = S : E !== 1 && (E = 1) : d !== -1 && (E = -1);
    }
    return d === -1 || y === -1 || E === 0 || E === 1 && d === y - 1 && d === g + 1 ? y !== -1 && (g === 0 && c ? a.base = a.name = s.slice(1, y) : a.base = a.name = s.slice(g, y)) : (g === 0 && c ? (a.name = s.slice(1, d), a.base = s.slice(1, y)) : (a.name = s.slice(g, d), a.base = s.slice(g, y)), a.ext = s.slice(d, y)), g > 0 ? a.dir = s.slice(0, g - 1) : c && (a.dir = "/"), a;
  }, sep: "/", delimiter: ":", win32: null, posix: null };
  return n.posix = n, rl = n, rl;
};
var kE = function(t) {
  if (typeof t == "string")
    t = new URL(t);
  else if (!(t instanceof URL))
    throw new Deno.errors.InvalidData("invalid argument path , must be a string or URL");
  if (t.protocol !== "file:")
    throw new Deno.errors.InvalidData("invalid url scheme");
  return nl ? OE(t) : xE(t);
};
var OE = function(t) {
  let { hostname: e, pathname: r } = t;
  for (let i = 0;i < r.length; i++)
    if (r[i] === "%") {
      let n = r.codePointAt(i + 2) || 32;
      if (r[i + 1] === "2" && n === 102 || r[i + 1] === "5" && n === 99)
        throw new Deno.errors.InvalidData("must not include encoded \\ or / characters");
    }
  if (r = r.replace(IE, "\\"), r = decodeURIComponent(r), e !== "")
    return `\\\\${e}${r}`;
  {
    let i = r.codePointAt(1) | 32, n = r[2];
    if (i < SE || i > AE || n !== ":")
      throw new Deno.errors.InvalidData("file url path must be absolute");
    return r.slice(1);
  }
};
var xE = function(t) {
  if (t.hostname !== "")
    throw new Deno.errors.InvalidData("invalid file url hostname");
  let e = t.pathname;
  for (let r = 0;r < e.length; r++)
    if (e[r] === "%") {
      let i = e.codePointAt(r + 2) || 32;
      if (e[r + 1] === "2" && i === 102)
        throw new Deno.errors.InvalidData("must not include encoded / characters");
    }
  return decodeURIComponent(e);
};
var ME = function(t) {
  let e = hg.resolve(t), r = t.charCodeAt(t.length - 1);
  (r === EE || nl && r === vE) && e[e.length - 1] !== hg.sep && (e += "/");
  let i = new URL("file://");
  return e.includes("%") && (e = e.replace(TE, "%25")), !nl && e.includes("\\") && (e = e.replace(RE, "%5C")), e.includes(`
`) && (e = e.replace(CE, "%0A")), e.includes("\r") && (e = e.replace(BE, "%0D")), e.includes("	") && (e = e.replace(PE, "%09")), i.pathname = e, i;
};
var dg = function(t) {
  if (typeof t == "string")
    t = new URL(t);
  else if (!(t instanceof URL))
    throw new Deno.errors.InvalidData("invalid argument path , must be a string or URL");
  if (t.protocol !== "file:")
    throw new Deno.errors.InvalidData("invalid url scheme");
  return sl ? XE(t) : ZE(t);
};
var XE = function(t) {
  let { hostname: e, pathname: r } = t;
  for (let i = 0;i < r.length; i++)
    if (r[i] === "%") {
      let n = r.codePointAt(i + 2) || 32;
      if (r[i + 1] === "2" && n === 102 || r[i + 1] === "5" && n === 99)
        throw new Deno.errors.InvalidData("must not include encoded \\ or / characters");
    }
  if (r = r.replace(zE, "\\"), r = decodeURIComponent(r), e !== "")
    return `\\\\${e}${r}`;
  {
    let i = r.codePointAt(1) | 32, n = r[2];
    if (i < HE || i > VE || n !== ":")
      throw new Deno.errors.InvalidData("file url path must be absolute");
    return r.slice(1);
  }
};
var ZE = function(t) {
  if (t.hostname !== "")
    throw new Deno.errors.InvalidData("invalid file url hostname");
  let e = t.pathname;
  for (let r = 0;r < e.length; r++)
    if (e[r] === "%") {
      let i = e.codePointAt(r + 2) || 32;
      if (e[r + 1] === "2" && i === 102)
        throw new Deno.errors.InvalidData("must not include encoded / characters");
    }
  return decodeURIComponent(e);
};
var pg = function(t) {
  let e = Za.resolve(t), r = t.charCodeAt(t.length - 1);
  (r === $E || sl && r === WE) && e[e.length - 1] !== Za.sep && (e += "/");
  let i = new URL("file://");
  return e.includes("%") && (e = e.replace(KE, "%25")), !sl && e.includes("\\") && (e = e.replace(GE, "%5C")), e.includes(`
`) && (e = e.replace(QE, "%0A")), e.includes("\r") && (e = e.replace(YE, "%0D")), e.includes("	") && (e = e.replace(JE, "%09")), i.pathname = e, i;
};
var Me = function() {
  throw new Error("Node.js net module is not supported by JSPM core outside of Node.js");
};
var ys = Object.defineProperty;
var Kg = Object.getOwnPropertyDescriptor;
var Gg = Object.getOwnPropertyNames;
var Qg = Object.prototype.hasOwnProperty;
var _e = (t, e) => () => (t && (e = t(t = 0)), e);
var M = (t, e) => () => (e || t((e = { exports: {} }).exports, e), e.exports);
var Jt = (t, e) => {
  for (var r in e)
    ys(t, r, { get: e[r], enumerable: true });
};
var Yg = (t, e, r, i) => {
  if (e && typeof e == "object" || typeof e == "function")
    for (let n of Gg(e))
      !Qg.call(t, n) && n !== r && ys(t, n, { get: () => e[n], enumerable: !(i = Kg(e, n)) || i.enumerable });
  return t;
};
var X = (t) => Yg(ys({}, "__esModule", { value: true }), t);
var _ = _e(() => {
});
var B = {};
Jt(B, { _debugEnd: () => yu, _debugProcess: () => gu, _events: () => Ou, _eventsCount: () => xu, _exiting: () => Yl, _fatalExceptions: () => cu, _getActiveHandles: () => eu, _getActiveRequests: () => Zl, _kill: () => ru, _linkedBinding: () => Gl, _maxListeners: () => ku, _preload_modules: () => Cu, _rawDebug: () => zl, _startProfilerIdleNotifier: () => bu, _stopProfilerIdleNotifier: () => wu, _tickCallback: () => pu, abort: () => Eu, addListener: () => Mu, allowedNodeEnvironmentFlags: () => lu, arch: () => xl, argv: () => Ul, argv0: () => Ru, assert: () => uu, binding: () => Fl, chdir: () => Hl, config: () => Jl, cpuUsage: () => $i, cwd: () => $l, debugPort: () => Tu, default: () => $u, dlopen: () => Xl, domain: () => Ql, emit: () => Du, emitWarning: () => jl, env: () => Ll, execArgv: () => Nl, execPath: () => Iu, exit: () => ou, features: () => fu, hasUncaughtExceptionCaptureCallback: () => du, hrtime: () => Wi, kill: () => su, listeners: () => Wu, memoryUsage: () => nu, moduleLoadList: () => Kl, nextTick: () => Pl, off: () => Uu, on: () => wt, once: () => Lu, openStdin: () => au, pid: () => Su, platform: () => Ml, ppid: () => Au, prependListener: () => ju, prependOnceListener: () => Fu, reallyExit: () => tu, release: () => Vl, removeAllListeners: () => qu, removeListener: () => Nu, resourceUsage: () => iu, setSourceMapsEnabled: () => Bu, setUncaughtExceptionCaptureCallback: () => hu, stderr: () => mu, stdin: () => vu, stdout: () => _u, title: () => Ol, umask: () => Wl, uptime: () => Pu, version: () => ql, versions: () => Dl });
var bt;
var Lr;
var Xt;
var Fi;
var Ol;
var xl;
var Ml;
var Ll;
var Ul;
var Nl;
var ql;
var Dl;
var jl;
var Fl;
var Wl;
var $l;
var Hl;
var Vl;
var zl;
var Kl;
var Ql;
var Yl;
var Jl;
var tu;
var ru;
var $i;
var iu;
var nu;
var su;
var ou;
var au;
var lu;
var fu;
var cu;
var hu;
var pu;
var gu;
var yu;
var bu;
var wu;
var _u;
var mu;
var vu;
var Eu;
var Su;
var Au;
var Iu;
var Tu;
var Ru;
var Cu;
var Bu;
var Lt;
var bs;
var ws;
var ku;
var Ou;
var xu;
var Mu;
var Lu;
var Uu;
var Nu;
var qu;
var Du;
var ju;
var Fu;
var $u;
var Hu = _e(() => {
  _();
  v();
  m();
  bt = [], Lr = false, Fi = -1;
  kl.prototype.run = function() {
    this.fun.apply(null, this.array);
  };
  Ol = "browser", xl = "x64", Ml = "browser", Ll = { PATH: "/usr/bin", LANG: navigator.language + ".UTF-8", PWD: "/", HOME: "/home", TMP: "/tmp" }, Ul = ["/usr/bin/node"], Nl = [], ql = "v16.8.0", Dl = {}, jl = function(t, e) {
    console.warn((e ? e + ": " : "") + t);
  }, Fl = function(t) {
    _s("binding");
  }, Wl = function(t) {
    return 0;
  }, $l = function() {
    return "/";
  }, Hl = function(t) {
  }, Vl = { name: "node", sourceUrl: "", headersUrl: "", libUrl: "" };
  zl = Ee, Kl = [];
  Ql = {}, Yl = false, Jl = {};
  tu = Ee, ru = Ee, $i = function() {
    return {};
  }, iu = $i, nu = $i, su = Ee, ou = Ee, au = Ee, lu = {};
  fu = { inspector: false, debug: false, uv: false, ipv6: false, tls_alpn: false, tls_sni: false, tls_ocsp: false, tls: false, cached_builtins: true }, cu = Ee, hu = Ee;
  pu = Ee, gu = Ee, yu = Ee, bu = Ee, wu = Ee, _u = undefined, mu = undefined, vu = undefined, Eu = Ee, Su = 2, Au = 1, Iu = "/bin/usr/node", Tu = 9229, Ru = "node", Cu = [], Bu = Ee, Lt = { now: typeof performance < "u" ? performance.now.bind(performance) : undefined, timing: typeof performance < "u" ? performance.timing : undefined };
  Lt.now === undefined && (bs = Date.now(), Lt.timing && Lt.timing.navigationStart && (bs = Lt.timing.navigationStart), Lt.now = () => Date.now() - bs);
  ws = 1e9;
  Wi.bigint = function(t) {
    var e = Wi(t);
    return typeof BigInt > "u" ? e[0] * ws + e[1] : BigInt(e[0] * ws) + BigInt(e[1]);
  };
  ku = 10, Ou = {}, xu = 0;
  Mu = wt, Lu = wt, Uu = wt, Nu = wt, qu = wt, Du = Ee, ju = wt, Fu = wt;
  $u = { version: ql, versions: Dl, arch: xl, platform: Ml, release: Vl, _rawDebug: zl, moduleLoadList: Kl, binding: Fl, _linkedBinding: Gl, _events: Ou, _eventsCount: xu, _maxListeners: ku, on: wt, addListener: Mu, once: Lu, off: Uu, removeListener: Nu, removeAllListeners: qu, emit: Du, prependListener: ju, prependOnceListener: Fu, listeners: Wu, domain: Ql, _exiting: Yl, config: Jl, dlopen: Xl, uptime: Pu, _getActiveRequests: Zl, _getActiveHandles: eu, reallyExit: tu, _kill: ru, cpuUsage: $i, resourceUsage: iu, memoryUsage: nu, kill: su, exit: ou, openStdin: au, allowedNodeEnvironmentFlags: lu, assert: uu, features: fu, _fatalExceptions: cu, setUncaughtExceptionCaptureCallback: hu, hasUncaughtExceptionCaptureCallback: du, emitWarning: jl, nextTick: Pl, _tickCallback: pu, _debugProcess: gu, _debugEnd: yu, _startProfilerIdleNotifier: bu, _stopProfilerIdleNotifier: wu, stdout: _u, stdin: vu, stderr: mu, abort: Eu, umask: Wl, chdir: Hl, cwd: $l, env: Ll, title: Ol, argv: Ul, execArgv: Nl, pid: Su, ppid: Au, execPath: Iu, debugPort: Tu, hrtime: Wi, argv0: Ru, _preload_modules: Cu, setSourceMapsEnabled: Bu };
});
var m = _e(() => {
  Hu();
});
var me = {};
Jt(me, { Buffer: () => x, INSPECT_MAX_BYTES: () => ty, default: () => Ut, kMaxLength: () => ry });
var ci;
var Vu;
var Hi;
var zu;
var Zt;
var Ku;
var Ut;
var x;
var ty;
var ry;
var be = _e(() => {
  _();
  v();
  m();
  ci = {}, Vu = false;
  Hi = {}, zu = false;
  Zt = {}, Ku = false;
  Ut = ey();
  Ut.Buffer;
  Ut.SlowBuffer;
  Ut.INSPECT_MAX_BYTES;
  Ut.kMaxLength;
  x = Ut.Buffer, ty = Ut.INSPECT_MAX_BYTES, ry = Ut.kMaxLength;
});
var v = _e(() => {
  be();
});
var Gu = M((vs) => {
  _();
  v();
  m();
  Object.defineProperty(vs, "__esModule", { value: true });
  var ms = class {
    constructor(e) {
      this.aliasToTopic = {}, this.max = e;
    }
    put(e, r) {
      return r === 0 || r > this.max ? false : (this.aliasToTopic[r] = e, this.length = Object.keys(this.aliasToTopic).length, true);
    }
    getTopicByAlias(e) {
      return this.aliasToTopic[e];
    }
    clear() {
      this.aliasToTopic = {};
    }
  };
  vs.default = ms;
});
var ce = M((xA, Qu) => {
  _();
  v();
  m();
  Qu.exports = { ArrayIsArray(t) {
    return Array.isArray(t);
  }, ArrayPrototypeIncludes(t, e) {
    return t.includes(e);
  }, ArrayPrototypeIndexOf(t, e) {
    return t.indexOf(e);
  }, ArrayPrototypeJoin(t, e) {
    return t.join(e);
  }, ArrayPrototypeMap(t, e) {
    return t.map(e);
  }, ArrayPrototypePop(t, e) {
    return t.pop(e);
  }, ArrayPrototypePush(t, e) {
    return t.push(e);
  }, ArrayPrototypeSlice(t, e, r) {
    return t.slice(e, r);
  }, Error, FunctionPrototypeCall(t, e, ...r) {
    return t.call(e, ...r);
  }, FunctionPrototypeSymbolHasInstance(t, e) {
    return Function.prototype[Symbol.hasInstance].call(t, e);
  }, MathFloor: Math.floor, Number, NumberIsInteger: Number.isInteger, NumberIsNaN: Number.isNaN, NumberMAX_SAFE_INTEGER: Number.MAX_SAFE_INTEGER, NumberMIN_SAFE_INTEGER: Number.MIN_SAFE_INTEGER, NumberParseInt: Number.parseInt, ObjectDefineProperties(t, e) {
    return Object.defineProperties(t, e);
  }, ObjectDefineProperty(t, e, r) {
    return Object.defineProperty(t, e, r);
  }, ObjectGetOwnPropertyDescriptor(t, e) {
    return Object.getOwnPropertyDescriptor(t, e);
  }, ObjectKeys(t) {
    return Object.keys(t);
  }, ObjectSetPrototypeOf(t, e) {
    return Object.setPrototypeOf(t, e);
  }, Promise, PromisePrototypeCatch(t, e) {
    return t.catch(e);
  }, PromisePrototypeThen(t, e, r) {
    return t.then(e, r);
  }, PromiseReject(t) {
    return Promise.reject(t);
  }, ReflectApply: Reflect.apply, RegExpPrototypeTest(t, e) {
    return t.test(e);
  }, SafeSet: Set, String, StringPrototypeSlice(t, e, r) {
    return t.slice(e, r);
  }, StringPrototypeToLowerCase(t) {
    return t.toLowerCase();
  }, StringPrototypeToUpperCase(t) {
    return t.toUpperCase();
  }, StringPrototypeTrim(t) {
    return t.trim();
  }, Symbol, SymbolFor: Symbol.for, SymbolAsyncIterator: Symbol.asyncIterator, SymbolHasInstance: Symbol.hasInstance, SymbolIterator: Symbol.iterator, TypedArrayPrototypeSet(t, e, r) {
    return t.set(e, r);
  }, Uint8Array };
});
var Je = M(($A, Ss) => {
  _();
  v();
  m();
  var iy = (be(), X(me)), ny = Object.getPrototypeOf(async function() {
  }).constructor, Yu = globalThis.Blob || iy.Blob, sy = typeof Yu < "u" ? function(e) {
    return e instanceof Yu;
  } : function(e) {
    return false;
  }, Es = class extends Error {
    constructor(e) {
      if (!Array.isArray(e))
        throw new TypeError(`Expected input to be an Array, got ${typeof e}`);
      let r = "";
      for (let i = 0;i < e.length; i++)
        r += `    ${e[i].stack}
`;
      super(r), this.name = "AggregateError", this.errors = e;
    }
  };
  Ss.exports = { AggregateError: Es, kEmptyObject: Object.freeze({}), once(t) {
    let e = false;
    return function(...r) {
      e || (e = true, t.apply(this, r));
    };
  }, createDeferredPromise: function() {
    let t, e;
    return { promise: new Promise((i, n) => {
      t = i, e = n;
    }), resolve: t, reject: e };
  }, promisify(t) {
    return new Promise((e, r) => {
      t((i, ...n) => i ? r(i) : e(...n));
    });
  }, debuglog() {
    return function() {
    };
  }, format(t, ...e) {
    return t.replace(/%([sdifj])/g, function(...[r, i]) {
      let n = e.shift();
      return i === "f" ? n.toFixed(6) : i === "j" ? JSON.stringify(n) : i === "s" && typeof n == "object" ? `${n.constructor !== Object ? n.constructor.name : ""} {}`.trim() : n.toString();
    });
  }, inspect(t) {
    switch (typeof t) {
      case "string":
        if (t.includes("'"))
          if (t.includes('"')) {
            if (!t.includes("`") && !t.includes("${"))
              return `\`${t}\``;
          } else
            return `"${t}"`;
        return `'${t}'`;
      case "number":
        return isNaN(t) ? "NaN" : Object.is(t, -0) ? String(t) : t;
      case "bigint":
        return `${String(t)}n`;
      case "boolean":
      case "undefined":
        return String(t);
      case "object":
        return "{}";
    }
  }, types: { isAsyncFunction(t) {
    return t instanceof ny;
  }, isArrayBufferView(t) {
    return ArrayBuffer.isView(t);
  } }, isBlob: sy };
  Ss.exports.promisify.custom = Symbol.for("nodejs.util.promisify.custom");
});
var zi = M((ZA, Vi) => {
  _();
  v();
  m();
  var { AbortController: Ju, AbortSignal: oy } = typeof self < "u" ? self : typeof window < "u" ? window : undefined;
  Vi.exports = Ju;
  Vi.exports.AbortSignal = oy;
  Vi.exports.default = Ju;
});
var Ae = M((uI, ef) => {
  _();
  v();
  m();
  var { format: ay, inspect: Ki, AggregateError: ly } = Je(), uy = globalThis.AggregateError || ly, fy = Symbol("kIsNodeError"), cy = ["string", "function", "number", "object", "Function", "Object", "boolean", "bigint", "symbol"], hy = /^([A-Z][a-z0-9]*)+$/, dy = "__node_internal_", Gi = {};
  function er(t, e) {
    if (!t)
      throw new Gi.ERR_INTERNAL_ASSERTION(e);
  }
  function Xu(t) {
    let e = "", r = t.length, i = t[0] === "-" ? 1 : 0;
    for (;r >= i + 4; r -= 3)
      e = `_${t.slice(r - 3, r)}${e}`;
    return `${t.slice(0, r)}${e}`;
  }
  function py(t, e, r) {
    if (typeof e == "function")
      return er(e.length <= r.length, `Code: ${t}; The provided arguments length (${r.length}) does not match the required ones (${e.length}).`), e(...r);
    let i = (e.match(/%[dfijoOs]/g) || []).length;
    return er(i === r.length, `Code: ${t}; The provided arguments length (${r.length}) does not match the required ones (${i}).`), r.length === 0 ? e : ay(e, ...r);
  }
  function ve(t, e, r) {
    r || (r = Error);

    class i extends r {
      constructor(...o) {
        super(py(t, e, o));
      }
      toString() {
        return `${this.name} [${t}]: ${this.message}`;
      }
    }
    Object.defineProperties(i.prototype, { name: { value: r.name, writable: true, enumerable: false, configurable: true }, toString: { value() {
      return `${this.name} [${t}]: ${this.message}`;
    }, writable: true, enumerable: false, configurable: true } }), i.prototype.code = t, i.prototype[fy] = true, Gi[t] = i;
  }
  function Zu(t) {
    let e = dy + t.name;
    return Object.defineProperty(t, "name", { value: e }), t;
  }
  function gy(t, e) {
    if (t && e && t !== e) {
      if (Array.isArray(e.errors))
        return e.errors.push(t), e;
      let r = new uy([e, t], e.message);
      return r.code = e.code, r;
    }
    return t || e;
  }
  var As = class extends Error {
    constructor(e = "The operation was aborted", r = undefined) {
      if (r !== undefined && typeof r != "object")
        throw new Gi.ERR_INVALID_ARG_TYPE("options", "Object", r);
      super(e, r), this.code = "ABORT_ERR", this.name = "AbortError";
    }
  };
  ve("ERR_ASSERTION", "%s", Error);
  ve("ERR_INVALID_ARG_TYPE", (t, e, r) => {
    er(typeof t == "string", "'name' must be a string"), Array.isArray(e) || (e = [e]);
    let i = "The ";
    t.endsWith(" argument") ? i += `${t} ` : i += `"${t}" ${t.includes(".") ? "property" : "argument"} `, i += "must be ";
    let n = [], o = [], s = [];
    for (let l of e)
      er(typeof l == "string", "All expected entries have to be of type string"), cy.includes(l) ? n.push(l.toLowerCase()) : hy.test(l) ? o.push(l) : (er(l !== "object", 'The value "object" should be written as "Object"'), s.push(l));
    if (o.length > 0) {
      let l = n.indexOf("object");
      l !== -1 && (n.splice(n, l, 1), o.push("Object"));
    }
    if (n.length > 0) {
      switch (n.length) {
        case 1:
          i += `of type ${n[0]}`;
          break;
        case 2:
          i += `one of type ${n[0]} or ${n[1]}`;
          break;
        default: {
          let l = n.pop();
          i += `one of type ${n.join(", ")}, or ${l}`;
        }
      }
      (o.length > 0 || s.length > 0) && (i += " or ");
    }
    if (o.length > 0) {
      switch (o.length) {
        case 1:
          i += `an instance of ${o[0]}`;
          break;
        case 2:
          i += `an instance of ${o[0]} or ${o[1]}`;
          break;
        default: {
          let l = o.pop();
          i += `an instance of ${o.join(", ")}, or ${l}`;
        }
      }
      s.length > 0 && (i += " or ");
    }
    switch (s.length) {
      case 0:
        break;
      case 1:
        s[0].toLowerCase() !== s[0] && (i += "an "), i += `${s[0]}`;
        break;
      case 2:
        i += `one of ${s[0]} or ${s[1]}`;
        break;
      default: {
        let l = s.pop();
        i += `one of ${s.join(", ")}, or ${l}`;
      }
    }
    if (r == null)
      i += `. Received ${r}`;
    else if (typeof r == "function" && r.name)
      i += `. Received function ${r.name}`;
    else if (typeof r == "object") {
      var a;
      if ((a = r.constructor) !== null && a !== undefined && a.name)
        i += `. Received an instance of ${r.constructor.name}`;
      else {
        let l = Ki(r, { depth: -1 });
        i += `. Received ${l}`;
      }
    } else {
      let l = Ki(r, { colors: false });
      l.length > 25 && (l = `${l.slice(0, 25)}...`), i += `. Received type ${typeof r} (${l})`;
    }
    return i;
  }, TypeError);
  ve("ERR_INVALID_ARG_VALUE", (t, e, r = "is invalid") => {
    let i = Ki(e);
    return i.length > 128 && (i = i.slice(0, 128) + "..."), `The ${t.includes(".") ? "property" : "argument"} '${t}' ${r}. Received ${i}`;
  }, TypeError);
  ve("ERR_INVALID_RETURN_VALUE", (t, e, r) => {
    var i;
    let n = r != null && (i = r.constructor) !== null && i !== undefined && i.name ? `instance of ${r.constructor.name}` : `type ${typeof r}`;
    return `Expected ${t} to be returned from the "${e}" function but got ${n}.`;
  }, TypeError);
  ve("ERR_MISSING_ARGS", (...t) => {
    er(t.length > 0, "At least one arg needs to be specified");
    let e, r = t.length;
    switch (t = (Array.isArray(t) ? t : [t]).map((i) => `"${i}"`).join(" or "), r) {
      case 1:
        e += `The ${t[0]} argument`;
        break;
      case 2:
        e += `The ${t[0]} and ${t[1]} arguments`;
        break;
      default:
        {
          let i = t.pop();
          e += `The ${t.join(", ")}, and ${i} arguments`;
        }
        break;
    }
    return `${e} must be specified`;
  }, TypeError);
  ve("ERR_OUT_OF_RANGE", (t, e, r) => {
    er(e, 'Missing "range" argument');
    let i;
    return Number.isInteger(r) && Math.abs(r) > 2 ** 32 ? i = Xu(String(r)) : typeof r == "bigint" ? (i = String(r), (r > 2n ** 32n || r < -(2n ** 32n)) && (i = Xu(i)), i += "n") : i = Ki(r), `The value of "${t}" is out of range. It must be ${e}. Received ${i}`;
  }, RangeError);
  ve("ERR_MULTIPLE_CALLBACK", "Callback called multiple times", Error);
  ve("ERR_METHOD_NOT_IMPLEMENTED", "The %s method is not implemented", Error);
  ve("ERR_STREAM_ALREADY_FINISHED", "Cannot call %s after a stream was finished", Error);
  ve("ERR_STREAM_CANNOT_PIPE", "Cannot pipe, not readable", Error);
  ve("ERR_STREAM_DESTROYED", "Cannot call %s after a stream was destroyed", Error);
  ve("ERR_STREAM_NULL_VALUES", "May not write null values to stream", TypeError);
  ve("ERR_STREAM_PREMATURE_CLOSE", "Premature close", Error);
  ve("ERR_STREAM_PUSH_AFTER_EOF", "stream.push() after EOF", Error);
  ve("ERR_STREAM_UNSHIFT_AFTER_END_EVENT", "stream.unshift() after end event", Error);
  ve("ERR_STREAM_WRITE_AFTER_END", "write after end", Error);
  ve("ERR_UNKNOWN_ENCODING", "Unknown encoding: %s", TypeError);
  ef.exports = { AbortError: As, aggregateTwoErrors: Zu(gy), hideStackFrames: Zu, codes: Gi };
});
var hi = M((_I, ff) => {
  _();
  v();
  m();
  var { ArrayIsArray: Ts, ArrayPrototypeIncludes: sf, ArrayPrototypeJoin: of, ArrayPrototypeMap: yy, NumberIsInteger: Rs, NumberIsNaN: by, NumberMAX_SAFE_INTEGER: wy, NumberMIN_SAFE_INTEGER: _y, NumberParseInt: my, ObjectPrototypeHasOwnProperty: vy, RegExpPrototypeExec: af, String: Ey, StringPrototypeToUpperCase: Sy, StringPrototypeTrim: Ay } = ce(), { hideStackFrames: Ue, codes: { ERR_SOCKET_BAD_PORT: Iy, ERR_INVALID_ARG_TYPE: Ie, ERR_INVALID_ARG_VALUE: Ur, ERR_OUT_OF_RANGE: tr, ERR_UNKNOWN_SIGNAL: tf } } = Ae(), { normalizeEncoding: Ty } = Je(), { isAsyncFunction: Ry, isArrayBufferView: Cy } = Je().types, rf = {};
  function By(t) {
    return t === (t | 0);
  }
  function Py(t) {
    return t === t >>> 0;
  }
  var ky = /^[0-7]+$/, Oy = "must be a 32-bit unsigned integer or an octal string";
  function xy(t, e, r) {
    if (typeof t > "u" && (t = r), typeof t == "string") {
      if (af(ky, t) === null)
        throw new Ur(e, t, Oy);
      t = my(t, 8);
    }
    return lf(t, e), t;
  }
  var My = Ue((t, e, r = _y, i = wy) => {
    if (typeof t != "number")
      throw new Ie(e, "number", t);
    if (!Rs(t))
      throw new tr(e, "an integer", t);
    if (t < r || t > i)
      throw new tr(e, `>= ${r} && <= ${i}`, t);
  }), Ly = Ue((t, e, r = -2147483648, i = 2147483647) => {
    if (typeof t != "number")
      throw new Ie(e, "number", t);
    if (!Rs(t))
      throw new tr(e, "an integer", t);
    if (t < r || t > i)
      throw new tr(e, `>= ${r} && <= ${i}`, t);
  }), lf = Ue((t, e, r = false) => {
    if (typeof t != "number")
      throw new Ie(e, "number", t);
    if (!Rs(t))
      throw new tr(e, "an integer", t);
    let i = r ? 1 : 0, n = 4294967295;
    if (t < i || t > n)
      throw new tr(e, `>= ${i} && <= ${n}`, t);
  });
  function Cs(t, e) {
    if (typeof t != "string")
      throw new Ie(e, "string", t);
  }
  function Uy(t, e, r = undefined, i) {
    if (typeof t != "number")
      throw new Ie(e, "number", t);
    if (r != null && t < r || i != null && t > i || (r != null || i != null) && by(t))
      throw new tr(e, `${r != null ? `>= ${r}` : ""}${r != null && i != null ? " && " : ""}${i != null ? `<= ${i}` : ""}`, t);
  }
  var Ny = Ue((t, e, r) => {
    if (!sf(r, t)) {
      let n = "must be one of: " + of(yy(r, (o) => typeof o == "string" ? `'${o}'` : Ey(o)), ", ");
      throw new Ur(e, t, n);
    }
  });
  function uf(t, e) {
    if (typeof t != "boolean")
      throw new Ie(e, "boolean", t);
  }
  function Is(t, e, r) {
    return t == null || !vy(t, e) ? r : t[e];
  }
  var qy = Ue((t, e, r = null) => {
    let i = Is(r, "allowArray", false), n = Is(r, "allowFunction", false);
    if (!Is(r, "nullable", false) && t === null || !i && Ts(t) || typeof t != "object" && (!n || typeof t != "function"))
      throw new Ie(e, "Object", t);
  }), Dy = Ue((t, e) => {
    if (t != null && typeof t != "object" && typeof t != "function")
      throw new Ie(e, "a dictionary", t);
  }), Bs = Ue((t, e, r = 0) => {
    if (!Ts(t))
      throw new Ie(e, "Array", t);
    if (t.length < r) {
      let i = `must be longer than ${r}`;
      throw new Ur(e, t, i);
    }
  });
  function jy(t, e) {
    Bs(t, e);
    for (let r = 0;r < t.length; r++)
      Cs(t[r], `${e}[${r}]`);
  }
  function Fy(t, e) {
    Bs(t, e);
    for (let r = 0;r < t.length; r++)
      uf(t[r], `${e}[${r}]`);
  }
  function Wy(t, e = "signal") {
    if (Cs(t, e), rf[t] === undefined)
      throw rf[Sy(t)] !== undefined ? new tf(t + " (signals must use all capital letters)") : new tf(t);
  }
  var $y = Ue((t, e = "buffer") => {
    if (!Cy(t))
      throw new Ie(e, ["Buffer", "TypedArray", "DataView"], t);
  });
  function Hy(t, e) {
    let r = Ty(e), i = t.length;
    if (r === "hex" && i % 2 !== 0)
      throw new Ur("encoding", e, `is invalid for data of length ${i}`);
  }
  function Vy(t, e = "Port", r = true) {
    if (typeof t != "number" && typeof t != "string" || typeof t == "string" && Ay(t).length === 0 || +t !== +t >>> 0 || t > 65535 || t === 0 && !r)
      throw new Iy(e, t, r);
    return t | 0;
  }
  var zy = Ue((t, e) => {
    if (t !== undefined && (t === null || typeof t != "object" || !("aborted" in t)))
      throw new Ie(e, "AbortSignal", t);
  }), Ky = Ue((t, e) => {
    if (typeof t != "function")
      throw new Ie(e, "Function", t);
  }), Gy = Ue((t, e) => {
    if (typeof t != "function" || Ry(t))
      throw new Ie(e, "Function", t);
  }), Qy = Ue((t, e) => {
    if (t !== undefined)
      throw new Ie(e, "undefined", t);
  });
  function Yy(t, e, r) {
    if (!sf(r, t))
      throw new Ie(e, `('${of(r, "|")}')`, t);
  }
  var Jy = /^(?:<[^>]*>)(?:\s*;\s*[^;"\s]+(?:=(")?[^;"\s]*\1)?)*$/;
  function nf(t, e) {
    if (typeof t > "u" || !af(Jy, t))
      throw new Ur(e, t, 'must be an array or string of format "</styles.css>; rel=preload; as=style"');
  }
  function Xy(t) {
    if (typeof t == "string")
      return nf(t, "hints"), t;
    if (Ts(t)) {
      let e = t.length, r = "";
      if (e === 0)
        return r;
      for (let i = 0;i < e; i++) {
        let n = t[i];
        nf(n, "hints"), r += n, i !== e - 1 && (r += ", ");
      }
      return r;
    }
    throw new Ur("hints", t, 'must be an array or string of format "</styles.css>; rel=preload; as=style"');
  }
  ff.exports = { isInt32: By, isUint32: Py, parseFileMode: xy, validateArray: Bs, validateStringArray: jy, validateBooleanArray: Fy, validateBoolean: uf, validateBuffer: $y, validateDictionary: Dy, validateEncoding: Hy, validateFunction: Ky, validateInt32: Ly, validateInteger: My, validateNumber: Uy, validateObject: qy, validateOneOf: Ny, validatePlainFunction: Gy, validatePort: Vy, validateSignalName: Wy, validateString: Cs, validateUint32: lf, validateUndefined: Qy, validateUnion: Yy, validateAbortSignal: zy, validateLinkHeaderValue: Xy };
});
var Nt = M((BI, pf) => {
  _();
  v();
  m();
  var ae = pf.exports = {}, Xe, Ze;
  function Ps() {
    throw new Error("setTimeout has not been defined");
  }
  function ks() {
    throw new Error("clearTimeout has not been defined");
  }
  (function() {
    try {
      typeof setTimeout == "function" ? Xe = setTimeout : Xe = Ps;
    } catch {
      Xe = Ps;
    }
    try {
      typeof clearTimeout == "function" ? Ze = clearTimeout : Ze = ks;
    } catch {
      Ze = ks;
    }
  })();
  function cf(t) {
    if (Xe === setTimeout)
      return setTimeout(t, 0);
    if ((Xe === Ps || !Xe) && setTimeout)
      return Xe = setTimeout, setTimeout(t, 0);
    try {
      return Xe(t, 0);
    } catch {
      try {
        return Xe.call(null, t, 0);
      } catch {
        return Xe.call(this, t, 0);
      }
    }
  }
  function Zy(t) {
    if (Ze === clearTimeout)
      return clearTimeout(t);
    if ((Ze === ks || !Ze) && clearTimeout)
      return Ze = clearTimeout, clearTimeout(t);
    try {
      return Ze(t);
    } catch {
      try {
        return Ze.call(null, t);
      } catch {
        return Ze.call(this, t);
      }
    }
  }
  var _t = [], Nr = false, rr, Qi = -1;
  function eb() {
    !Nr || !rr || (Nr = false, rr.length ? _t = rr.concat(_t) : Qi = -1, _t.length && hf());
  }
  function hf() {
    if (!Nr) {
      var t = cf(eb);
      Nr = true;
      for (var e = _t.length;e; ) {
        for (rr = _t, _t = [];++Qi < e; )
          rr && rr[Qi].run();
        Qi = -1, e = _t.length;
      }
      rr = null, Nr = false, Zy(t);
    }
  }
  ae.nextTick = function(t) {
    var e = new Array(arguments.length - 1);
    if (arguments.length > 1)
      for (var r = 1;r < arguments.length; r++)
        e[r - 1] = arguments[r];
    _t.push(new df(t, e)), _t.length === 1 && !Nr && cf(hf);
  };
  function df(t, e) {
    this.fun = t, this.array = e;
  }
  df.prototype.run = function() {
    this.fun.apply(null, this.array);
  };
  ae.title = "browser";
  ae.browser = true;
  ae.env = {};
  ae.argv = [];
  ae.version = "";
  ae.versions = {};
  function mt() {
  }
  ae.on = mt;
  ae.addListener = mt;
  ae.once = mt;
  ae.off = mt;
  ae.removeListener = mt;
  ae.removeAllListeners = mt;
  ae.emit = mt;
  ae.prependListener = mt;
  ae.prependOnceListener = mt;
  ae.listeners = function(t) {
    return [];
  };
  ae.binding = function(t) {
    throw new Error("process.binding is not supported");
  };
  ae.cwd = function() {
    return "/";
  };
  ae.chdir = function(t) {
    throw new Error("process.chdir is not supported");
  };
  ae.umask = function() {
    return 0;
  };
});
var tt = M((DI, Pf) => {
  _();
  v();
  m();
  var { Symbol: Yi, SymbolAsyncIterator: gf, SymbolIterator: yf, SymbolFor: bf } = ce(), wf = Yi("kDestroyed"), _f = Yi("kIsErrored"), Os = Yi("kIsReadable"), mf = Yi("kIsDisturbed"), tb = bf("nodejs.webstream.isClosedPromise"), rb = bf("nodejs.webstream.controllerErrorFunction");
  function Ji(t, e = false) {
    var r;
    return !!(t && typeof t.pipe == "function" && typeof t.on == "function" && (!e || typeof t.pause == "function" && typeof t.resume == "function") && (!t._writableState || ((r = t._readableState) === null || r === undefined ? undefined : r.readable) !== false) && (!t._writableState || t._readableState));
  }
  function Xi(t) {
    var e;
    return !!(t && typeof t.write == "function" && typeof t.on == "function" && (!t._readableState || ((e = t._writableState) === null || e === undefined ? undefined : e.writable) !== false));
  }
  function ib(t) {
    return !!(t && typeof t.pipe == "function" && t._readableState && typeof t.on == "function" && typeof t.write == "function");
  }
  function et(t) {
    return t && (t._readableState || t._writableState || typeof t.write == "function" && typeof t.on == "function" || typeof t.pipe == "function" && typeof t.on == "function");
  }
  function vf(t) {
    return !!(t && !et(t) && typeof t.pipeThrough == "function" && typeof t.getReader == "function" && typeof t.cancel == "function");
  }
  function Ef(t) {
    return !!(t && !et(t) && typeof t.getWriter == "function" && typeof t.abort == "function");
  }
  function Sf(t) {
    return !!(t && !et(t) && typeof t.readable == "object" && typeof t.writable == "object");
  }
  function nb(t) {
    return vf(t) || Ef(t) || Sf(t);
  }
  function sb(t, e) {
    return t == null ? false : e === true ? typeof t[gf] == "function" : e === false ? typeof t[yf] == "function" : typeof t[gf] == "function" || typeof t[yf] == "function";
  }
  function Zi(t) {
    if (!et(t))
      return null;
    let { _writableState: e, _readableState: r } = t, i = e || r;
    return !!(t.destroyed || t[wf] || i != null && i.destroyed);
  }
  function Af(t) {
    if (!Xi(t))
      return null;
    if (t.writableEnded === true)
      return true;
    let e = t._writableState;
    return e != null && e.errored ? false : typeof e?.ended != "boolean" ? null : e.ended;
  }
  function ob(t, e) {
    if (!Xi(t))
      return null;
    if (t.writableFinished === true)
      return true;
    let r = t._writableState;
    return r != null && r.errored ? false : typeof r?.finished != "boolean" ? null : !!(r.finished || e === false && r.ended === true && r.length === 0);
  }
  function ab(t) {
    if (!Ji(t))
      return null;
    if (t.readableEnded === true)
      return true;
    let e = t._readableState;
    return !e || e.errored ? false : typeof e?.ended != "boolean" ? null : e.ended;
  }
  function If(t, e) {
    if (!Ji(t))
      return null;
    let r = t._readableState;
    return r != null && r.errored ? false : typeof r?.endEmitted != "boolean" ? null : !!(r.endEmitted || e === false && r.ended === true && r.length === 0);
  }
  function Tf(t) {
    return t && t[Os] != null ? t[Os] : typeof t?.readable != "boolean" ? null : Zi(t) ? false : Ji(t) && t.readable && !If(t);
  }
  function Rf(t) {
    return typeof t?.writable != "boolean" ? null : Zi(t) ? false : Xi(t) && t.writable && !Af(t);
  }
  function lb(t, e) {
    return et(t) ? Zi(t) ? true : !(e?.readable !== false && Tf(t) || e?.writable !== false && Rf(t)) : null;
  }
  function ub(t) {
    var e, r;
    return et(t) ? t.writableErrored ? t.writableErrored : (e = (r = t._writableState) === null || r === undefined ? undefined : r.errored) !== null && e !== undefined ? e : null : null;
  }
  function fb(t) {
    var e, r;
    return et(t) ? t.readableErrored ? t.readableErrored : (e = (r = t._readableState) === null || r === undefined ? undefined : r.errored) !== null && e !== undefined ? e : null : null;
  }
  function cb(t) {
    if (!et(t))
      return null;
    if (typeof t.closed == "boolean")
      return t.closed;
    let { _writableState: e, _readableState: r } = t;
    return typeof e?.closed == "boolean" || typeof r?.closed == "boolean" ? e?.closed || r?.closed : typeof t._closed == "boolean" && Cf(t) ? t._closed : null;
  }
  function Cf(t) {
    return typeof t._closed == "boolean" && typeof t._defaultKeepAlive == "boolean" && typeof t._removedConnection == "boolean" && typeof t._removedContLen == "boolean";
  }
  function Bf(t) {
    return typeof t._sent100 == "boolean" && Cf(t);
  }
  function hb(t) {
    var e;
    return typeof t._consuming == "boolean" && typeof t._dumped == "boolean" && ((e = t.req) === null || e === undefined ? undefined : e.upgradeOrConnect) === undefined;
  }
  function db(t) {
    if (!et(t))
      return null;
    let { _writableState: e, _readableState: r } = t, i = e || r;
    return !i && Bf(t) || !!(i && i.autoDestroy && i.emitClose && i.closed === false);
  }
  function pb(t) {
    var e;
    return !!(t && ((e = t[mf]) !== null && e !== undefined ? e : t.readableDidRead || t.readableAborted));
  }
  function gb(t) {
    var e, r, i, n, o, s, a, l, c, h;
    return !!(t && ((e = (r = (i = (n = (o = (s = t[_f]) !== null && s !== undefined ? s : t.readableErrored) !== null && o !== undefined ? o : t.writableErrored) !== null && n !== undefined ? n : (a = t._readableState) === null || a === undefined ? undefined : a.errorEmitted) !== null && i !== undefined ? i : (l = t._writableState) === null || l === undefined ? undefined : l.errorEmitted) !== null && r !== undefined ? r : (c = t._readableState) === null || c === undefined ? undefined : c.errored) !== null && e !== undefined ? e : !((h = t._writableState) === null || h === undefined) && h.errored));
  }
  Pf.exports = { kDestroyed: wf, isDisturbed: pb, kIsDisturbed: mf, isErrored: gb, kIsErrored: _f, isReadable: Tf, kIsReadable: Os, kIsClosedPromise: tb, kControllerErrorFunction: rb, isClosed: cb, isDestroyed: Zi, isDuplexNodeStream: ib, isFinished: lb, isIterable: sb, isReadableNodeStream: Ji, isReadableStream: vf, isReadableEnded: ab, isReadableFinished: If, isReadableErrored: fb, isNodeStream: et, isWebStream: nb, isWritable: Rf, isWritableNodeStream: Xi, isWritableStream: Ef, isWritableEnded: Af, isWritableFinished: ob, isWritableErrored: ub, isServerRequest: hb, isServerResponse: Bf, willEmitClose: db, isTransformStream: Sf };
});
var vt = M((QI, Ns) => {
  _();
  v();
  m();
  var qt = Nt(), { AbortError: Df, codes: yb } = Ae(), { ERR_INVALID_ARG_TYPE: bb, ERR_STREAM_PREMATURE_CLOSE: kf } = yb, { kEmptyObject: Ms, once: Ls } = Je(), { validateAbortSignal: wb, validateFunction: _b, validateObject: mb, validateBoolean: vb } = hi(), { Promise: Eb, PromisePrototypeThen: Sb } = ce(), { isClosed: Ab, isReadable: Of, isReadableNodeStream: xs, isReadableStream: Ib, isReadableFinished: xf, isReadableErrored: Mf, isWritable: Lf, isWritableNodeStream: Uf, isWritableStream: Tb, isWritableFinished: Nf, isWritableErrored: qf, isNodeStream: Rb, willEmitClose: Cb, kIsClosedPromise: Bb } = tt();
  function Pb(t) {
    return t.setHeader && typeof t.abort == "function";
  }
  var Us = () => {
  };
  function jf(t, e, r) {
    var i, n;
    if (arguments.length === 2 ? (r = e, e = Ms) : e == null ? e = Ms : mb(e, "options"), _b(r, "callback"), wb(e.signal, "options.signal"), r = Ls(r), Ib(t) || Tb(t))
      return kb(t, e, r);
    if (!Rb(t))
      throw new bb("stream", ["ReadableStream", "WritableStream", "Stream"], t);
    let o = (i = e.readable) !== null && i !== undefined ? i : xs(t), s = (n = e.writable) !== null && n !== undefined ? n : Uf(t), a = t._writableState, l = t._readableState, c = () => {
      t.writable || g();
    }, h = Cb(t) && xs(t) === o && Uf(t) === s, d = Nf(t, false), g = () => {
      d = true, t.destroyed && (h = false), !(h && (!t.readable || o)) && (!o || y) && r.call(t);
    }, y = xf(t, false), w = () => {
      y = true, t.destroyed && (h = false), !(h && (!t.writable || s)) && (!s || d) && r.call(t);
    }, S = (N) => {
      r.call(t, N);
    }, E = Ab(t), I = () => {
      E = true;
      let N = qf(t) || Mf(t);
      if (N && typeof N != "boolean")
        return r.call(t, N);
      if (o && !y && xs(t, true) && !xf(t, false))
        return r.call(t, new kf);
      if (s && !d && !Nf(t, false))
        return r.call(t, new kf);
      r.call(t);
    }, C = () => {
      E = true;
      let N = qf(t) || Mf(t);
      if (N && typeof N != "boolean")
        return r.call(t, N);
      r.call(t);
    }, R = () => {
      t.req.on("finish", g);
    };
    Pb(t) ? (t.on("complete", g), h || t.on("abort", I), t.req ? R() : t.on("request", R)) : s && !a && (t.on("end", c), t.on("close", c)), !h && typeof t.aborted == "boolean" && t.on("aborted", I), t.on("end", w), t.on("finish", g), e.error !== false && t.on("error", S), t.on("close", I), E ? qt.nextTick(I) : a != null && a.errorEmitted || l != null && l.errorEmitted ? h || qt.nextTick(C) : (!o && (!h || Of(t)) && (d || Lf(t) === false) || !s && (!h || Lf(t)) && (y || Of(t) === false) || l && t.req && t.aborted) && qt.nextTick(C);
    let U = () => {
      r = Us, t.removeListener("aborted", I), t.removeListener("complete", g), t.removeListener("abort", I), t.removeListener("request", R), t.req && t.req.removeListener("finish", g), t.removeListener("end", c), t.removeListener("close", c), t.removeListener("finish", g), t.removeListener("end", w), t.removeListener("error", S), t.removeListener("close", I);
    };
    if (e.signal && !E) {
      let N = () => {
        let W = r;
        U(), W.call(t, new Df(undefined, { cause: e.signal.reason }));
      };
      if (e.signal.aborted)
        qt.nextTick(N);
      else {
        let W = r;
        r = Ls((...K) => {
          e.signal.removeEventListener("abort", N), W.apply(t, K);
        }), e.signal.addEventListener("abort", N);
      }
    }
    return U;
  }
  function kb(t, e, r) {
    let i = false, n = Us;
    if (e.signal)
      if (n = () => {
        i = true, r.call(t, new Df(undefined, { cause: e.signal.reason }));
      }, e.signal.aborted)
        qt.nextTick(n);
      else {
        let s = r;
        r = Ls((...a) => {
          e.signal.removeEventListener("abort", n), s.apply(t, a);
        }), e.signal.addEventListener("abort", n);
      }
    let o = (...s) => {
      i || qt.nextTick(() => r.apply(t, s));
    };
    return Sb(t[Bb].promise, o, o), Us;
  }
  function Ob(t, e) {
    var r;
    let i = false;
    return e === null && (e = Ms), (r = e) !== null && r !== undefined && r.cleanup && (vb(e.cleanup, "cleanup"), i = e.cleanup), new Eb((n, o) => {
      let s = jf(t, e, (a) => {
        i && s(), a ? o(a) : n();
      });
    });
  }
  Ns.exports = jf;
  Ns.exports.finished = Ob;
});
var ir = M((sT, Gf) => {
  _();
  v();
  m();
  var rt = Nt(), { aggregateTwoErrors: xb, codes: { ERR_MULTIPLE_CALLBACK: Mb }, AbortError: Lb } = Ae(), { Symbol: $f } = ce(), { kDestroyed: Ub, isDestroyed: Nb, isFinished: qb, isServerRequest: Db } = tt(), Hf = $f("kDestroy"), qs = $f("kConstruct");
  function Vf(t, e, r) {
    t && (t.stack, e && !e.errored && (e.errored = t), r && !r.errored && (r.errored = t));
  }
  function jb(t, e) {
    let r = this._readableState, i = this._writableState, n = i || r;
    return i != null && i.destroyed || r != null && r.destroyed ? (typeof e == "function" && e(), this) : (Vf(t, i, r), i && (i.destroyed = true), r && (r.destroyed = true), n.constructed ? Ff(this, t, e) : this.once(Hf, function(o) {
      Ff(this, xb(o, t), e);
    }), this);
  }
  function Ff(t, e, r) {
    let i = false;
    function n(o) {
      if (i)
        return;
      i = true;
      let { _readableState: s, _writableState: a } = t;
      Vf(o, a, s), a && (a.closed = true), s && (s.closed = true), typeof r == "function" && r(o), o ? rt.nextTick(Fb, t, o) : rt.nextTick(zf, t);
    }
    try {
      t._destroy(e || null, n);
    } catch (o) {
      n(o);
    }
  }
  function Fb(t, e) {
    Ds(t, e), zf(t);
  }
  function zf(t) {
    let { _readableState: e, _writableState: r } = t;
    r && (r.closeEmitted = true), e && (e.closeEmitted = true), (r != null && r.emitClose || e != null && e.emitClose) && t.emit("close");
  }
  function Ds(t, e) {
    let { _readableState: r, _writableState: i } = t;
    i != null && i.errorEmitted || r != null && r.errorEmitted || (i && (i.errorEmitted = true), r && (r.errorEmitted = true), t.emit("error", e));
  }
  function Wb() {
    let t = this._readableState, e = this._writableState;
    t && (t.constructed = true, t.closed = false, t.closeEmitted = false, t.destroyed = false, t.errored = null, t.errorEmitted = false, t.reading = false, t.ended = t.readable === false, t.endEmitted = t.readable === false), e && (e.constructed = true, e.destroyed = false, e.closed = false, e.closeEmitted = false, e.errored = null, e.errorEmitted = false, e.finalCalled = false, e.prefinished = false, e.ended = e.writable === false, e.ending = e.writable === false, e.finished = e.writable === false);
  }
  function js(t, e, r) {
    let { _readableState: i, _writableState: n } = t;
    if (n != null && n.destroyed || i != null && i.destroyed)
      return this;
    i != null && i.autoDestroy || n != null && n.autoDestroy ? t.destroy(e) : e && (e.stack, n && !n.errored && (n.errored = e), i && !i.errored && (i.errored = e), r ? rt.nextTick(Ds, t, e) : Ds(t, e));
  }
  function $b(t, e) {
    if (typeof t._construct != "function")
      return;
    let { _readableState: r, _writableState: i } = t;
    r && (r.constructed = false), i && (i.constructed = false), t.once(qs, e), !(t.listenerCount(qs) > 1) && rt.nextTick(Hb, t);
  }
  function Hb(t) {
    let e = false;
    function r(i) {
      if (e) {
        js(t, i ?? new Mb);
        return;
      }
      e = true;
      let { _readableState: n, _writableState: o } = t, s = o || n;
      n && (n.constructed = true), o && (o.constructed = true), s.destroyed ? t.emit(Hf, i) : i ? js(t, i, true) : rt.nextTick(Vb, t);
    }
    try {
      t._construct((i) => {
        rt.nextTick(r, i);
      });
    } catch (i) {
      rt.nextTick(r, i);
    }
  }
  function Vb(t) {
    t.emit(qs);
  }
  function Wf(t) {
    return t?.setHeader && typeof t.abort == "function";
  }
  function Kf(t) {
    t.emit("close");
  }
  function zb(t, e) {
    t.emit("error", e), rt.nextTick(Kf, t);
  }
  function Kb(t, e) {
    !t || Nb(t) || (!e && !qb(t) && (e = new Lb), Db(t) ? (t.socket = null, t.destroy(e)) : Wf(t) ? t.abort() : Wf(t.req) ? t.req.abort() : typeof t.destroy == "function" ? t.destroy(e) : typeof t.close == "function" ? t.close() : e ? rt.nextTick(zb, t, e) : rt.nextTick(Kf, t), t.destroyed || (t[Ub] = true));
  }
  Gf.exports = { construct: $b, destroyer: Kb, destroy: jb, undestroy: Wb, errorOrDestroy: js };
});
var rc;
var ic;
var qr;
var Qf;
var Yf;
var Jf;
var Be;
var Fs = _e(() => {
  _();
  v();
  m();
  qr = typeof Reflect == "object" ? Reflect : null, Qf = qr && typeof qr.apply == "function" ? qr.apply : function(t, e, r) {
    return Function.prototype.apply.call(t, e, r);
  };
  ic = qr && typeof qr.ownKeys == "function" ? qr.ownKeys : Object.getOwnPropertySymbols ? function(t) {
    return Object.getOwnPropertyNames(t).concat(Object.getOwnPropertySymbols(t));
  } : function(t) {
    return Object.getOwnPropertyNames(t);
  };
  Yf = Number.isNaN || function(t) {
    return t != t;
  };
  rc = Y, Y.EventEmitter = Y, Y.prototype._events = undefined, Y.prototype._eventsCount = 0, Y.prototype._maxListeners = undefined;
  Jf = 10;
  Object.defineProperty(Y, "defaultMaxListeners", { enumerable: true, get: function() {
    return Jf;
  }, set: function(t) {
    if (typeof t != "number" || t < 0 || Yf(t))
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + t + ".");
    Jf = t;
  } }), Y.init = function() {
    this._events !== undefined && this._events !== Object.getPrototypeOf(this)._events || (this._events = Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || undefined;
  }, Y.prototype.setMaxListeners = function(t) {
    if (typeof t != "number" || t < 0 || Yf(t))
      throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + t + ".");
    return this._maxListeners = t, this;
  }, Y.prototype.getMaxListeners = function() {
    return nc(this);
  }, Y.prototype.emit = function(t) {
    for (var e = [], r = 1;r < arguments.length; r++)
      e.push(arguments[r]);
    var i = t === "error", n = this._events;
    if (n !== undefined)
      i = i && n.error === undefined;
    else if (!i)
      return false;
    if (i) {
      var o;
      if (e.length > 0 && (o = e[0]), o instanceof Error)
        throw o;
      var s = new Error("Unhandled error." + (o ? " (" + o.message + ")" : ""));
      throw s.context = o, s;
    }
    var a = n[t];
    if (a === undefined)
      return false;
    if (typeof a == "function")
      Qf(a, this, e);
    else {
      var l = a.length, c = sc(a, l);
      for (r = 0;r < l; ++r)
        Qf(c[r], this, e);
    }
    return true;
  }, Y.prototype.addListener = function(t, e) {
    return Xf(this, t, e, false);
  }, Y.prototype.on = Y.prototype.addListener, Y.prototype.prependListener = function(t, e) {
    return Xf(this, t, e, true);
  }, Y.prototype.once = function(t, e) {
    return en(e), this.on(t, Zf(this, t, e)), this;
  }, Y.prototype.prependOnceListener = function(t, e) {
    return en(e), this.prependListener(t, Zf(this, t, e)), this;
  }, Y.prototype.removeListener = function(t, e) {
    var r, i, n, o, s;
    if (en(e), (i = this._events) === undefined)
      return this;
    if ((r = i[t]) === undefined)
      return this;
    if (r === e || r.listener === e)
      --this._eventsCount == 0 ? this._events = Object.create(null) : (delete i[t], i.removeListener && this.emit("removeListener", t, r.listener || e));
    else if (typeof r != "function") {
      for (n = -1, o = r.length - 1;o >= 0; o--)
        if (r[o] === e || r[o].listener === e) {
          s = r[o].listener, n = o;
          break;
        }
      if (n < 0)
        return this;
      n === 0 ? r.shift() : function(a, l) {
        for (;l + 1 < a.length; l++)
          a[l] = a[l + 1];
        a.pop();
      }(r, n), r.length === 1 && (i[t] = r[0]), i.removeListener !== undefined && this.emit("removeListener", t, s || e);
    }
    return this;
  }, Y.prototype.off = Y.prototype.removeListener, Y.prototype.removeAllListeners = function(t) {
    var e, r, i;
    if ((r = this._events) === undefined)
      return this;
    if (r.removeListener === undefined)
      return arguments.length === 0 ? (this._events = Object.create(null), this._eventsCount = 0) : r[t] !== undefined && (--this._eventsCount == 0 ? this._events = Object.create(null) : delete r[t]), this;
    if (arguments.length === 0) {
      var n, o = Object.keys(r);
      for (i = 0;i < o.length; ++i)
        (n = o[i]) !== "removeListener" && this.removeAllListeners(n);
      return this.removeAllListeners("removeListener"), this._events = Object.create(null), this._eventsCount = 0, this;
    }
    if (typeof (e = r[t]) == "function")
      this.removeListener(t, e);
    else if (e !== undefined)
      for (i = e.length - 1;i >= 0; i--)
        this.removeListener(t, e[i]);
    return this;
  }, Y.prototype.listeners = function(t) {
    return ec(this, t, true);
  }, Y.prototype.rawListeners = function(t) {
    return ec(this, t, false);
  }, Y.listenerCount = function(t, e) {
    return typeof t.listenerCount == "function" ? t.listenerCount(e) : tc.call(t, e);
  }, Y.prototype.listenerCount = tc, Y.prototype.eventNames = function() {
    return this._eventsCount > 0 ? ic(this._events) : [];
  };
  Be = rc;
  Be.EventEmitter;
  Be.defaultMaxListeners;
  Be.init;
  Be.listenerCount;
  Be.EventEmitter;
  Be.defaultMaxListeners;
  Be.init;
  Be.listenerCount;
});
var nr = {};
Jt(nr, { EventEmitter: () => Qb, default: () => Be, defaultMaxListeners: () => Yb, init: () => Jb, listenerCount: () => Xb, on: () => Zb, once: () => ew });
var Qb;
var Yb;
var Jb;
var Xb;
var Zb;
var ew;
var sr = _e(() => {
  _();
  v();
  m();
  Fs();
  Fs();
  Be.once = function(t, e) {
    return new Promise((r, i) => {
      function n(...s) {
        o !== undefined && t.removeListener("error", o), r(s);
      }
      let o;
      e !== "error" && (o = (s) => {
        t.removeListener(name, n), i(s);
      }, t.once("error", o)), t.once(e, n);
    });
  };
  Be.on = function(t, e) {
    let r = [], i = [], n = null, o = false, s = { async next() {
      let c = r.shift();
      if (c)
        return createIterResult(c, false);
      if (n) {
        let h = Promise.reject(n);
        return n = null, h;
      }
      return o ? createIterResult(undefined, true) : new Promise((h, d) => i.push({ resolve: h, reject: d }));
    }, async return() {
      t.removeListener(e, a), t.removeListener("error", l), o = true;
      for (let c of i)
        c.resolve(createIterResult(undefined, true));
      return createIterResult(undefined, true);
    }, throw(c) {
      n = c, t.removeListener(e, a), t.removeListener("error", l);
    }, [Symbol.asyncIterator]() {
      return this;
    } };
    return t.on(e, a), t.on("error", l), s;
    function a(...c) {
      let h = i.shift();
      h ? h.resolve(createIterResult(c, false)) : r.push(c);
    }
    function l(c) {
      o = true;
      let h = i.shift();
      h ? h.reject(c) : n = c, s.return();
    }
  };
  ({ EventEmitter: Qb, defaultMaxListeners: Yb, init: Jb, listenerCount: Xb, on: Zb, once: ew } = Be);
});
var nn = M((UT, ac) => {
  _();
  v();
  m();
  var { ArrayIsArray: tw, ObjectSetPrototypeOf: oc } = ce(), { EventEmitter: tn } = (sr(), X(nr));
  function rn(t) {
    tn.call(this, t);
  }
  oc(rn.prototype, tn.prototype);
  oc(rn, tn);
  rn.prototype.pipe = function(t, e) {
    let r = this;
    function i(h) {
      t.writable && t.write(h) === false && r.pause && r.pause();
    }
    r.on("data", i);
    function n() {
      r.readable && r.resume && r.resume();
    }
    t.on("drain", n), !t._isStdio && (!e || e.end !== false) && (r.on("end", s), r.on("close", a));
    let o = false;
    function s() {
      o || (o = true, t.end());
    }
    function a() {
      o || (o = true, typeof t.destroy == "function" && t.destroy());
    }
    function l(h) {
      c(), tn.listenerCount(this, "error") === 0 && this.emit("error", h);
    }
    Ws(r, "error", l), Ws(t, "error", l);
    function c() {
      r.removeListener("data", i), t.removeListener("drain", n), r.removeListener("end", s), r.removeListener("close", a), r.removeListener("error", l), t.removeListener("error", l), r.removeListener("end", c), r.removeListener("close", c), t.removeListener("close", c);
    }
    return r.on("end", c), r.on("close", c), t.on("close", c), t.emit("pipe", r), t;
  };
  function Ws(t, e, r) {
    if (typeof t.prependListener == "function")
      return t.prependListener(e, r);
    !t._events || !t._events[e] ? t.on(e, r) : tw(t._events[e]) ? t._events[e].unshift(r) : t._events[e] = [r, t._events[e]];
  }
  ac.exports = { Stream: rn, prependListener: Ws };
});
var di = M((zT, sn) => {
  _();
  v();
  m();
  var { AbortError: lc, codes: rw } = Ae(), { isNodeStream: uc, isWebStream: iw, kControllerErrorFunction: nw } = tt(), sw = vt(), { ERR_INVALID_ARG_TYPE: fc } = rw, ow = (t, e) => {
    if (typeof t != "object" || !("aborted" in t))
      throw new fc(e, "AbortSignal", t);
  };
  sn.exports.addAbortSignal = function(e, r) {
    if (ow(e, "signal"), !uc(r) && !iw(r))
      throw new fc("stream", ["ReadableStream", "WritableStream", "Stream"], r);
    return sn.exports.addAbortSignalNoValidate(e, r);
  };
  sn.exports.addAbortSignalNoValidate = function(t, e) {
    if (typeof t != "object" || !("aborted" in t))
      return e;
    let r = uc(e) ? () => {
      e.destroy(new lc(undefined, { cause: t.reason }));
    } : () => {
      e[nw](new lc(undefined, { cause: t.reason }));
    };
    return t.aborted ? r() : (t.addEventListener("abort", r), sw(e, () => t.removeEventListener("abort", r))), e;
  };
});
var dc = M((i2, hc) => {
  _();
  v();
  m();
  var { StringPrototypeSlice: cc, SymbolIterator: aw, TypedArrayPrototypeSet: on, Uint8Array: lw } = ce(), { Buffer: $s } = (be(), X(me)), { inspect: uw } = Je();
  hc.exports = class {
    constructor() {
      this.head = null, this.tail = null, this.length = 0;
    }
    push(e) {
      let r = { data: e, next: null };
      this.length > 0 ? this.tail.next = r : this.head = r, this.tail = r, ++this.length;
    }
    unshift(e) {
      let r = { data: e, next: this.head };
      this.length === 0 && (this.tail = r), this.head = r, ++this.length;
    }
    shift() {
      if (this.length === 0)
        return;
      let e = this.head.data;
      return this.length === 1 ? this.head = this.tail = null : this.head = this.head.next, --this.length, e;
    }
    clear() {
      this.head = this.tail = null, this.length = 0;
    }
    join(e) {
      if (this.length === 0)
        return "";
      let r = this.head, i = "" + r.data;
      for (;(r = r.next) !== null; )
        i += e + r.data;
      return i;
    }
    concat(e) {
      if (this.length === 0)
        return $s.alloc(0);
      let r = $s.allocUnsafe(e >>> 0), i = this.head, n = 0;
      for (;i; )
        on(r, i.data, n), n += i.data.length, i = i.next;
      return r;
    }
    consume(e, r) {
      let i = this.head.data;
      if (e < i.length) {
        let n = i.slice(0, e);
        return this.head.data = i.slice(e), n;
      }
      return e === i.length ? this.shift() : r ? this._getString(e) : this._getBuffer(e);
    }
    first() {
      return this.head.data;
    }
    *[aw]() {
      for (let e = this.head;e; e = e.next)
        yield e.data;
    }
    _getString(e) {
      let r = "", i = this.head, n = 0;
      do {
        let o = i.data;
        if (e > o.length)
          r += o, e -= o.length;
        else {
          e === o.length ? (r += o, ++n, i.next ? this.head = i.next : this.head = this.tail = null) : (r += cc(o, 0, e), this.head = i, i.data = cc(o, e));
          break;
        }
        ++n;
      } while ((i = i.next) !== null);
      return this.length -= n, r;
    }
    _getBuffer(e) {
      let r = $s.allocUnsafe(e), i = e, n = this.head, o = 0;
      do {
        let s = n.data;
        if (e > s.length)
          on(r, s, i - e), e -= s.length;
        else {
          e === s.length ? (on(r, s, i - e), ++o, n.next ? this.head = n.next : this.head = this.tail = null) : (on(r, new lw(s.buffer, s.byteOffset, e), i - e), this.head = n, n.data = s.slice(e));
          break;
        }
        ++o;
      } while ((n = n.next) !== null);
      return this.length -= o, r;
    }
    [Symbol.for("nodejs.util.inspect.custom")](e, r) {
      return uw(this, { ...r, depth: 0, customInspect: false });
    }
  };
});
var an = M((d2, gc) => {
  _();
  v();
  m();
  var { MathFloor: fw, NumberIsInteger: cw } = ce(), { ERR_INVALID_ARG_VALUE: hw } = Ae().codes;
  function dw(t, e, r) {
    return t.highWaterMark != null ? t.highWaterMark : e ? t[r] : null;
  }
  function pc(t) {
    return t ? 16 : 16 * 1024;
  }
  function pw(t, e, r, i) {
    let n = dw(e, i, r);
    if (n != null) {
      if (!cw(n) || n < 0) {
        let o = i ? `options.${r}` : "options.highWaterMark";
        throw new hw(o, n);
      }
      return fw(n);
    }
    return pc(t.objectMode);
  }
  gc.exports = { getHighWaterMark: pw, getDefaultHighWaterMark: pc };
});
var Rc;
var $e;
var Oe;
var yc;
var ln;
var or;
var bc;
var yw;
var At;
var zs;
var Dr;
var _c;
var Cw;
var Bw;
var un;
var fn;
var it;
var Pw;
var ur;
var Qs;
var Tc;
var Xs = _e(() => {
  _();
  v();
  m();
  for (Rc = { byteLength: function(t) {
    var e = wc(t), r = e[0], i = e[1];
    return 3 * (r + i) / 4 - i;
  }, toByteArray: function(t) {
    var e, r, i = wc(t), n = i[0], o = i[1], s = new yc(function(c, h, d) {
      return 3 * (h + d) / 4 - d;
    }(0, n, o)), a = 0, l = o > 0 ? n - 4 : n;
    for (r = 0;r < l; r += 4)
      e = Oe[t.charCodeAt(r)] << 18 | Oe[t.charCodeAt(r + 1)] << 12 | Oe[t.charCodeAt(r + 2)] << 6 | Oe[t.charCodeAt(r + 3)], s[a++] = e >> 16 & 255, s[a++] = e >> 8 & 255, s[a++] = 255 & e;
    return o === 2 && (e = Oe[t.charCodeAt(r)] << 2 | Oe[t.charCodeAt(r + 1)] >> 4, s[a++] = 255 & e), o === 1 && (e = Oe[t.charCodeAt(r)] << 10 | Oe[t.charCodeAt(r + 1)] << 4 | Oe[t.charCodeAt(r + 2)] >> 2, s[a++] = e >> 8 & 255, s[a++] = 255 & e), s;
  }, fromByteArray: function(t) {
    for (var e, r = t.length, i = r % 3, n = [], o = 0, s = r - i;o < s; o += 16383)
      n.push(gw(t, o, o + 16383 > s ? s : o + 16383));
    return i === 1 ? (e = t[r - 1], n.push($e[e >> 2] + $e[e << 4 & 63] + "==")) : i === 2 && (e = (t[r - 2] << 8) + t[r - 1], n.push($e[e >> 10] + $e[e >> 4 & 63] + $e[e << 2 & 63] + "=")), n.join("");
  } }, $e = [], Oe = [], yc = typeof Uint8Array < "u" ? Uint8Array : Array, ln = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", or = 0, bc = ln.length;or < bc; ++or)
    $e[or] = ln[or], Oe[ln.charCodeAt(or)] = or;
  Oe["-".charCodeAt(0)] = 62, Oe["_".charCodeAt(0)] = 63;
  yw = { read: function(t, e, r, i, n) {
    var o, s, a = 8 * n - i - 1, l = (1 << a) - 1, c = l >> 1, h = -7, d = r ? n - 1 : 0, g = r ? -1 : 1, y = t[e + d];
    for (d += g, o = y & (1 << -h) - 1, y >>= -h, h += a;h > 0; o = 256 * o + t[e + d], d += g, h -= 8)
      ;
    for (s = o & (1 << -h) - 1, o >>= -h, h += i;h > 0; s = 256 * s + t[e + d], d += g, h -= 8)
      ;
    if (o === 0)
      o = 1 - c;
    else {
      if (o === l)
        return s ? NaN : 1 / 0 * (y ? -1 : 1);
      s += Math.pow(2, i), o -= c;
    }
    return (y ? -1 : 1) * s * Math.pow(2, o - i);
  }, write: function(t, e, r, i, n, o) {
    var s, a, l, c = 8 * o - n - 1, h = (1 << c) - 1, d = h >> 1, g = n === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, y = i ? 0 : o - 1, w = i ? 1 : -1, S = e < 0 || e === 0 && 1 / e < 0 ? 1 : 0;
    for (e = Math.abs(e), isNaN(e) || e === 1 / 0 ? (a = isNaN(e) ? 1 : 0, s = h) : (s = Math.floor(Math.log(e) / Math.LN2), e * (l = Math.pow(2, -s)) < 1 && (s--, l *= 2), (e += s + d >= 1 ? g / l : g * Math.pow(2, 1 - d)) * l >= 2 && (s++, l /= 2), s + d >= h ? (a = 0, s = h) : s + d >= 1 ? (a = (e * l - 1) * Math.pow(2, n), s += d) : (a = e * Math.pow(2, d - 1) * Math.pow(2, n), s = 0));n >= 8; t[r + y] = 255 & a, y += w, a /= 256, n -= 8)
      ;
    for (s = s << n | a, c += n;c > 0; t[r + y] = 255 & s, y += w, s /= 256, c -= 8)
      ;
    t[r + y - w] |= 128 * S;
  } }, At = {}, zs = Rc, Dr = yw, _c = typeof Symbol == "function" && typeof Symbol.for == "function" ? Symbol.for("nodejs.util.inspect.custom") : null;
  At.Buffer = O, At.SlowBuffer = function(t) {
    return +t != t && (t = 0), O.alloc(+t);
  }, At.INSPECT_MAX_BYTES = 50;
  At.kMaxLength = 2147483647, O.TYPED_ARRAY_SUPPORT = function() {
    try {
      var t = new Uint8Array(1), e = { foo: function() {
        return 42;
      } };
      return Object.setPrototypeOf(e, Uint8Array.prototype), Object.setPrototypeOf(t, e), t.foo() === 42;
    } catch {
      return false;
    }
  }(), O.TYPED_ARRAY_SUPPORT || typeof console > "u" || typeof console.error != "function" || console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."), Object.defineProperty(O.prototype, "parent", { enumerable: true, get: function() {
    if (O.isBuffer(this))
      return this.buffer;
  } }), Object.defineProperty(O.prototype, "offset", { enumerable: true, get: function() {
    if (O.isBuffer(this))
      return this.byteOffset;
  } }), O.poolSize = 8192, O.from = function(t, e, r) {
    return Cc(t, e, r);
  }, Object.setPrototypeOf(O.prototype, Uint8Array.prototype), Object.setPrototypeOf(O, Uint8Array), O.alloc = function(t, e, r) {
    return function(i, n, o) {
      return Bc(i), i <= 0 ? Et(i) : n !== undefined ? typeof o == "string" ? Et(i).fill(n, o) : Et(i).fill(n) : Et(i);
    }(t, e, r);
  }, O.allocUnsafe = function(t) {
    return Ks(t);
  }, O.allocUnsafeSlow = function(t) {
    return Ks(t);
  }, O.isBuffer = function(t) {
    return t != null && t._isBuffer === true && t !== O.prototype;
  }, O.compare = function(t, e) {
    if (St(t, Uint8Array) && (t = O.from(t, t.offset, t.byteLength)), St(e, Uint8Array) && (e = O.from(e, e.offset, e.byteLength)), !O.isBuffer(t) || !O.isBuffer(e))
      throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
    if (t === e)
      return 0;
    for (var r = t.length, i = e.length, n = 0, o = Math.min(r, i);n < o; ++n)
      if (t[n] !== e[n]) {
        r = t[n], i = e[n];
        break;
      }
    return r < i ? -1 : i < r ? 1 : 0;
  }, O.isEncoding = function(t) {
    switch (String(t).toLowerCase()) {
      case "hex":
      case "utf8":
      case "utf-8":
      case "ascii":
      case "latin1":
      case "binary":
      case "base64":
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return true;
      default:
        return false;
    }
  }, O.concat = function(t, e) {
    if (!Array.isArray(t))
      throw new TypeError('"list" argument must be an Array of Buffers');
    if (t.length === 0)
      return O.alloc(0);
    var r;
    if (e === undefined)
      for (e = 0, r = 0;r < t.length; ++r)
        e += t[r].length;
    var i = O.allocUnsafe(e), n = 0;
    for (r = 0;r < t.length; ++r) {
      var o = t[r];
      if (St(o, Uint8Array) && (o = O.from(o)), !O.isBuffer(o))
        throw new TypeError('"list" argument must be an Array of Buffers');
      o.copy(i, n), n += o.length;
    }
    return i;
  }, O.byteLength = Pc, O.prototype._isBuffer = true, O.prototype.swap16 = function() {
    var t = this.length;
    if (t % 2 != 0)
      throw new RangeError("Buffer size must be a multiple of 16-bits");
    for (var e = 0;e < t; e += 2)
      ar(this, e, e + 1);
    return this;
  }, O.prototype.swap32 = function() {
    var t = this.length;
    if (t % 4 != 0)
      throw new RangeError("Buffer size must be a multiple of 32-bits");
    for (var e = 0;e < t; e += 4)
      ar(this, e, e + 3), ar(this, e + 1, e + 2);
    return this;
  }, O.prototype.swap64 = function() {
    var t = this.length;
    if (t % 8 != 0)
      throw new RangeError("Buffer size must be a multiple of 64-bits");
    for (var e = 0;e < t; e += 8)
      ar(this, e, e + 7), ar(this, e + 1, e + 6), ar(this, e + 2, e + 5), ar(this, e + 3, e + 4);
    return this;
  }, O.prototype.toString = function() {
    var t = this.length;
    return t === 0 ? "" : arguments.length === 0 ? Oc(this, 0, t) : bw.apply(this, arguments);
  }, O.prototype.toLocaleString = O.prototype.toString, O.prototype.equals = function(t) {
    if (!O.isBuffer(t))
      throw new TypeError("Argument must be a Buffer");
    return this === t || O.compare(this, t) === 0;
  }, O.prototype.inspect = function() {
    var t = "", e = At.INSPECT_MAX_BYTES;
    return t = this.toString("hex", 0, e).replace(/(.{2})/g, "$1 ").trim(), this.length > e && (t += " ... "), "<Buffer " + t + ">";
  }, _c && (O.prototype[_c] = O.prototype.inspect), O.prototype.compare = function(t, e, r, i, n) {
    if (St(t, Uint8Array) && (t = O.from(t, t.offset, t.byteLength)), !O.isBuffer(t))
      throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof t);
    if (e === undefined && (e = 0), r === undefined && (r = t ? t.length : 0), i === undefined && (i = 0), n === undefined && (n = this.length), e < 0 || r > t.length || i < 0 || n > this.length)
      throw new RangeError("out of range index");
    if (i >= n && e >= r)
      return 0;
    if (i >= n)
      return -1;
    if (e >= r)
      return 1;
    if (this === t)
      return 0;
    for (var o = (n >>>= 0) - (i >>>= 0), s = (r >>>= 0) - (e >>>= 0), a = Math.min(o, s), l = this.slice(i, n), c = t.slice(e, r), h = 0;h < a; ++h)
      if (l[h] !== c[h]) {
        o = l[h], s = c[h];
        break;
      }
    return o < s ? -1 : s < o ? 1 : 0;
  }, O.prototype.includes = function(t, e, r) {
    return this.indexOf(t, e, r) !== -1;
  }, O.prototype.indexOf = function(t, e, r) {
    return vc(this, t, e, r, true);
  }, O.prototype.lastIndexOf = function(t, e, r) {
    return vc(this, t, e, r, false);
  }, O.prototype.write = function(t, e, r, i) {
    if (e === undefined)
      i = "utf8", r = this.length, e = 0;
    else if (r === undefined && typeof e == "string")
      i = e, r = this.length, e = 0;
    else {
      if (!isFinite(e))
        throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
      e >>>= 0, isFinite(r) ? (r >>>= 0, i === undefined && (i = "utf8")) : (i = r, r = undefined);
    }
    var n = this.length - e;
    if ((r === undefined || r > n) && (r = n), t.length > 0 && (r < 0 || e < 0) || e > this.length)
      throw new RangeError("Attempt to write outside buffer bounds");
    i || (i = "utf8");
    for (var o = false;; )
      switch (i) {
        case "hex":
          return ww(this, t, e, r);
        case "utf8":
        case "utf-8":
          return _w(this, t, e, r);
        case "ascii":
          return kc(this, t, e, r);
        case "latin1":
        case "binary":
          return mw(this, t, e, r);
        case "base64":
          return vw(this, t, e, r);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return Ew(this, t, e, r);
        default:
          if (o)
            throw new TypeError("Unknown encoding: " + i);
          i = ("" + i).toLowerCase(), o = true;
      }
  }, O.prototype.toJSON = function() {
    return { type: "Buffer", data: Array.prototype.slice.call(this._arr || this, 0) };
  };
  O.prototype.slice = function(t, e) {
    var r = this.length;
    (t = ~~t) < 0 ? (t += r) < 0 && (t = 0) : t > r && (t = r), (e = e === undefined ? r : ~~e) < 0 ? (e += r) < 0 && (e = 0) : e > r && (e = r), e < t && (e = t);
    var i = this.subarray(t, e);
    return Object.setPrototypeOf(i, O.prototype), i;
  }, O.prototype.readUIntLE = function(t, e, r) {
    t >>>= 0, e >>>= 0, r || we(t, e, this.length);
    for (var i = this[t], n = 1, o = 0;++o < e && (n *= 256); )
      i += this[t + o] * n;
    return i;
  }, O.prototype.readUIntBE = function(t, e, r) {
    t >>>= 0, e >>>= 0, r || we(t, e, this.length);
    for (var i = this[t + --e], n = 1;e > 0 && (n *= 256); )
      i += this[t + --e] * n;
    return i;
  }, O.prototype.readUInt8 = function(t, e) {
    return t >>>= 0, e || we(t, 1, this.length), this[t];
  }, O.prototype.readUInt16LE = function(t, e) {
    return t >>>= 0, e || we(t, 2, this.length), this[t] | this[t + 1] << 8;
  }, O.prototype.readUInt16BE = function(t, e) {
    return t >>>= 0, e || we(t, 2, this.length), this[t] << 8 | this[t + 1];
  }, O.prototype.readUInt32LE = function(t, e) {
    return t >>>= 0, e || we(t, 4, this.length), (this[t] | this[t + 1] << 8 | this[t + 2] << 16) + 16777216 * this[t + 3];
  }, O.prototype.readUInt32BE = function(t, e) {
    return t >>>= 0, e || we(t, 4, this.length), 16777216 * this[t] + (this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3]);
  }, O.prototype.readIntLE = function(t, e, r) {
    t >>>= 0, e >>>= 0, r || we(t, e, this.length);
    for (var i = this[t], n = 1, o = 0;++o < e && (n *= 256); )
      i += this[t + o] * n;
    return i >= (n *= 128) && (i -= Math.pow(2, 8 * e)), i;
  }, O.prototype.readIntBE = function(t, e, r) {
    t >>>= 0, e >>>= 0, r || we(t, e, this.length);
    for (var i = e, n = 1, o = this[t + --i];i > 0 && (n *= 256); )
      o += this[t + --i] * n;
    return o >= (n *= 128) && (o -= Math.pow(2, 8 * e)), o;
  }, O.prototype.readInt8 = function(t, e) {
    return t >>>= 0, e || we(t, 1, this.length), 128 & this[t] ? -1 * (255 - this[t] + 1) : this[t];
  }, O.prototype.readInt16LE = function(t, e) {
    t >>>= 0, e || we(t, 2, this.length);
    var r = this[t] | this[t + 1] << 8;
    return 32768 & r ? 4294901760 | r : r;
  }, O.prototype.readInt16BE = function(t, e) {
    t >>>= 0, e || we(t, 2, this.length);
    var r = this[t + 1] | this[t] << 8;
    return 32768 & r ? 4294901760 | r : r;
  }, O.prototype.readInt32LE = function(t, e) {
    return t >>>= 0, e || we(t, 4, this.length), this[t] | this[t + 1] << 8 | this[t + 2] << 16 | this[t + 3] << 24;
  }, O.prototype.readInt32BE = function(t, e) {
    return t >>>= 0, e || we(t, 4, this.length), this[t] << 24 | this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3];
  }, O.prototype.readFloatLE = function(t, e) {
    return t >>>= 0, e || we(t, 4, this.length), Dr.read(this, t, true, 23, 4);
  }, O.prototype.readFloatBE = function(t, e) {
    return t >>>= 0, e || we(t, 4, this.length), Dr.read(this, t, false, 23, 4);
  }, O.prototype.readDoubleLE = function(t, e) {
    return t >>>= 0, e || we(t, 8, this.length), Dr.read(this, t, true, 52, 8);
  }, O.prototype.readDoubleBE = function(t, e) {
    return t >>>= 0, e || we(t, 8, this.length), Dr.read(this, t, false, 52, 8);
  }, O.prototype.writeUIntLE = function(t, e, r, i) {
    t = +t, e >>>= 0, r >>>= 0, i || Pe(this, t, e, r, Math.pow(2, 8 * r) - 1, 0);
    var n = 1, o = 0;
    for (this[e] = 255 & t;++o < r && (n *= 256); )
      this[e + o] = t / n & 255;
    return e + r;
  }, O.prototype.writeUIntBE = function(t, e, r, i) {
    t = +t, e >>>= 0, r >>>= 0, i || Pe(this, t, e, r, Math.pow(2, 8 * r) - 1, 0);
    var n = r - 1, o = 1;
    for (this[e + n] = 255 & t;--n >= 0 && (o *= 256); )
      this[e + n] = t / o & 255;
    return e + r;
  }, O.prototype.writeUInt8 = function(t, e, r) {
    return t = +t, e >>>= 0, r || Pe(this, t, e, 1, 255, 0), this[e] = 255 & t, e + 1;
  }, O.prototype.writeUInt16LE = function(t, e, r) {
    return t = +t, e >>>= 0, r || Pe(this, t, e, 2, 65535, 0), this[e] = 255 & t, this[e + 1] = t >>> 8, e + 2;
  }, O.prototype.writeUInt16BE = function(t, e, r) {
    return t = +t, e >>>= 0, r || Pe(this, t, e, 2, 65535, 0), this[e] = t >>> 8, this[e + 1] = 255 & t, e + 2;
  }, O.prototype.writeUInt32LE = function(t, e, r) {
    return t = +t, e >>>= 0, r || Pe(this, t, e, 4, 4294967295, 0), this[e + 3] = t >>> 24, this[e + 2] = t >>> 16, this[e + 1] = t >>> 8, this[e] = 255 & t, e + 4;
  }, O.prototype.writeUInt32BE = function(t, e, r) {
    return t = +t, e >>>= 0, r || Pe(this, t, e, 4, 4294967295, 0), this[e] = t >>> 24, this[e + 1] = t >>> 16, this[e + 2] = t >>> 8, this[e + 3] = 255 & t, e + 4;
  }, O.prototype.writeIntLE = function(t, e, r, i) {
    if (t = +t, e >>>= 0, !i) {
      var n = Math.pow(2, 8 * r - 1);
      Pe(this, t, e, r, n - 1, -n);
    }
    var o = 0, s = 1, a = 0;
    for (this[e] = 255 & t;++o < r && (s *= 256); )
      t < 0 && a === 0 && this[e + o - 1] !== 0 && (a = 1), this[e + o] = (t / s >> 0) - a & 255;
    return e + r;
  }, O.prototype.writeIntBE = function(t, e, r, i) {
    if (t = +t, e >>>= 0, !i) {
      var n = Math.pow(2, 8 * r - 1);
      Pe(this, t, e, r, n - 1, -n);
    }
    var o = r - 1, s = 1, a = 0;
    for (this[e + o] = 255 & t;--o >= 0 && (s *= 256); )
      t < 0 && a === 0 && this[e + o + 1] !== 0 && (a = 1), this[e + o] = (t / s >> 0) - a & 255;
    return e + r;
  }, O.prototype.writeInt8 = function(t, e, r) {
    return t = +t, e >>>= 0, r || Pe(this, t, e, 1, 127, -128), t < 0 && (t = 255 + t + 1), this[e] = 255 & t, e + 1;
  }, O.prototype.writeInt16LE = function(t, e, r) {
    return t = +t, e >>>= 0, r || Pe(this, t, e, 2, 32767, -32768), this[e] = 255 & t, this[e + 1] = t >>> 8, e + 2;
  }, O.prototype.writeInt16BE = function(t, e, r) {
    return t = +t, e >>>= 0, r || Pe(this, t, e, 2, 32767, -32768), this[e] = t >>> 8, this[e + 1] = 255 & t, e + 2;
  }, O.prototype.writeInt32LE = function(t, e, r) {
    return t = +t, e >>>= 0, r || Pe(this, t, e, 4, 2147483647, -2147483648), this[e] = 255 & t, this[e + 1] = t >>> 8, this[e + 2] = t >>> 16, this[e + 3] = t >>> 24, e + 4;
  }, O.prototype.writeInt32BE = function(t, e, r) {
    return t = +t, e >>>= 0, r || Pe(this, t, e, 4, 2147483647, -2147483648), t < 0 && (t = 4294967295 + t + 1), this[e] = t >>> 24, this[e + 1] = t >>> 16, this[e + 2] = t >>> 8, this[e + 3] = 255 & t, e + 4;
  }, O.prototype.writeFloatLE = function(t, e, r) {
    return Sc(this, t, e, true, r);
  }, O.prototype.writeFloatBE = function(t, e, r) {
    return Sc(this, t, e, false, r);
  }, O.prototype.writeDoubleLE = function(t, e, r) {
    return Ac(this, t, e, true, r);
  }, O.prototype.writeDoubleBE = function(t, e, r) {
    return Ac(this, t, e, false, r);
  }, O.prototype.copy = function(t, e, r, i) {
    if (!O.isBuffer(t))
      throw new TypeError("argument should be a Buffer");
    if (r || (r = 0), i || i === 0 || (i = this.length), e >= t.length && (e = t.length), e || (e = 0), i > 0 && i < r && (i = r), i === r || t.length === 0 || this.length === 0)
      return 0;
    if (e < 0)
      throw new RangeError("targetStart out of bounds");
    if (r < 0 || r >= this.length)
      throw new RangeError("Index out of range");
    if (i < 0)
      throw new RangeError("sourceEnd out of bounds");
    i > this.length && (i = this.length), t.length - e < i - r && (i = t.length - e + r);
    var n = i - r;
    if (this === t && typeof Uint8Array.prototype.copyWithin == "function")
      this.copyWithin(e, r, i);
    else if (this === t && r < e && e < i)
      for (var o = n - 1;o >= 0; --o)
        t[o + e] = this[o + r];
    else
      Uint8Array.prototype.set.call(t, this.subarray(r, i), e);
    return n;
  }, O.prototype.fill = function(t, e, r, i) {
    if (typeof t == "string") {
      if (typeof e == "string" ? (i = e, e = 0, r = this.length) : typeof r == "string" && (i = r, r = this.length), i !== undefined && typeof i != "string")
        throw new TypeError("encoding must be a string");
      if (typeof i == "string" && !O.isEncoding(i))
        throw new TypeError("Unknown encoding: " + i);
      if (t.length === 1) {
        var n = t.charCodeAt(0);
        (i === "utf8" && n < 128 || i === "latin1") && (t = n);
      }
    } else
      typeof t == "number" ? t &= 255 : typeof t == "boolean" && (t = Number(t));
    if (e < 0 || this.length < e || this.length < r)
      throw new RangeError("Out of range index");
    if (r <= e)
      return this;
    var o;
    if (e >>>= 0, r = r === undefined ? this.length : r >>> 0, t || (t = 0), typeof t == "number")
      for (o = e;o < r; ++o)
        this[o] = t;
    else {
      var s = O.isBuffer(t) ? t : O.from(t, i), a = s.length;
      if (a === 0)
        throw new TypeError('The value "' + t + '" is invalid for argument "value"');
      for (o = 0;o < r - e; ++o)
        this[o + e] = s[o % a];
    }
    return this;
  };
  Cw = /[^+/0-9A-Za-z-_]/g;
  Bw = function() {
    for (var t = new Array(256), e = 0;e < 16; ++e)
      for (var r = 16 * e, i = 0;i < 16; ++i)
        t[r + i] = "0123456789abcdef"[e] + "0123456789abcdef"[i];
    return t;
  }();
  At.Buffer;
  At.INSPECT_MAX_BYTES;
  At.kMaxLength;
  un = {}, fn = At, it = fn.Buffer;
  it.from && it.alloc && it.allocUnsafe && it.allocUnsafeSlow ? un = fn : (Ic(fn, un), un.Buffer = lr), lr.prototype = Object.create(it.prototype), Ic(it, lr), lr.from = function(t, e, r) {
    if (typeof t == "number")
      throw new TypeError("Argument must not be a number");
    return it(t, e, r);
  }, lr.alloc = function(t, e, r) {
    if (typeof t != "number")
      throw new TypeError("Argument must be a number");
    var i = it(t);
    return e !== undefined ? typeof r == "string" ? i.fill(e, r) : i.fill(e) : i.fill(0), i;
  }, lr.allocUnsafe = function(t) {
    if (typeof t != "number")
      throw new TypeError("Argument must be a number");
    return it(t);
  }, lr.allocUnsafeSlow = function(t) {
    if (typeof t != "number")
      throw new TypeError("Argument must be a number");
    return fn.SlowBuffer(t);
  };
  Pw = un, ur = {}, Qs = Pw.Buffer, Tc = Qs.isEncoding || function(t) {
    switch ((t = "" + t) && t.toLowerCase()) {
      case "hex":
      case "utf8":
      case "utf-8":
      case "ascii":
      case "binary":
      case "base64":
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
      case "raw":
        return true;
      default:
        return false;
    }
  };
  ur.StringDecoder = pi, pi.prototype.write = function(t) {
    if (t.length === 0)
      return "";
    var e, r;
    if (this.lastNeed) {
      if ((e = this.fillLast(t)) === undefined)
        return "";
      r = this.lastNeed, this.lastNeed = 0;
    } else
      r = 0;
    return r < t.length ? e ? e + this.text(t, r) : this.text(t, r) : e || "";
  }, pi.prototype.end = function(t) {
    var e = t && t.length ? this.write(t) : "";
    return this.lastNeed ? e + "\uFFFD" : e;
  }, pi.prototype.text = function(t, e) {
    var r = function(n, o, s) {
      var a = o.length - 1;
      if (a < s)
        return 0;
      var l = Vs(o[a]);
      return l >= 0 ? (l > 0 && (n.lastNeed = l - 1), l) : --a < s || l === -2 ? 0 : (l = Vs(o[a])) >= 0 ? (l > 0 && (n.lastNeed = l - 2), l) : --a < s || l === -2 ? 0 : (l = Vs(o[a])) >= 0 ? (l > 0 && (l === 2 ? l = 0 : n.lastNeed = l - 3), l) : 0;
    }(this, t, e);
    if (!this.lastNeed)
      return t.toString("utf8", e);
    this.lastTotal = r;
    var i = t.length - (r - this.lastNeed);
    return t.copy(this.lastChar, 0, i), t.toString("utf8", e, i);
  }, pi.prototype.fillLast = function(t) {
    if (this.lastNeed <= t.length)
      return t.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal);
    t.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, t.length), this.lastNeed -= t.length;
  };
  ur.StringDecoder;
  ur.StringDecoder;
});
var Lc = {};
Jt(Lc, { StringDecoder: () => qw, default: () => ur });
var qw;
var Uc = _e(() => {
  _();
  v();
  m();
  Xs();
  Xs();
  qw = ur.StringDecoder;
});
var Zs = M((H2, jc) => {
  _();
  v();
  m();
  var Nc = Nt(), { PromisePrototypeThen: Dw, SymbolAsyncIterator: qc, SymbolIterator: Dc } = ce(), { Buffer: jw } = (be(), X(me)), { ERR_INVALID_ARG_TYPE: Fw, ERR_STREAM_NULL_VALUES: Ww } = Ae().codes;
  function $w(t, e, r) {
    let i;
    if (typeof e == "string" || e instanceof jw)
      return new t({ objectMode: true, ...r, read() {
        this.push(e), this.push(null);
      } });
    let n;
    if (e && e[qc])
      n = true, i = e[qc]();
    else if (e && e[Dc])
      n = false, i = e[Dc]();
    else
      throw new Fw("iterable", ["Iterable"], e);
    let o = new t({ objectMode: true, highWaterMark: 1, ...r }), s = false;
    o._read = function() {
      s || (s = true, l());
    }, o._destroy = function(c, h) {
      Dw(a(c), () => Nc.nextTick(h, c), (d) => Nc.nextTick(h, d || c));
    };
    async function a(c) {
      let h = c != null, d = typeof i.throw == "function";
      if (h && d) {
        let { value: g, done: y } = await i.throw(c);
        if (await g, y)
          return;
      }
      if (typeof i.return == "function") {
        let { value: g } = await i.return();
        await g;
      }
    }
    async function l() {
      for (;; ) {
        try {
          let { value: c, done: h } = n ? await i.next() : i.next();
          if (h)
            o.push(null);
          else {
            let d = c && typeof c.then == "function" ? await c : c;
            if (d === null)
              throw s = false, new Ww;
            if (o.push(d))
              continue;
            s = false;
          }
        } catch (c) {
          o.destroy(c);
        }
        break;
      }
    }
    return o;
  }
  jc.exports = $w;
});
var gi = M((eR, Zc) => {
  _();
  v();
  m();
  var He = Nt(), { ArrayPrototypeIndexOf: Hw, NumberIsInteger: Vw, NumberIsNaN: zw, NumberParseInt: Kw, ObjectDefineProperties: $c, ObjectKeys: Gw, ObjectSetPrototypeOf: Hc, Promise: Qw, SafeSet: Yw, SymbolAsyncIterator: Jw, Symbol: Xw } = ce();
  Zc.exports = F;
  F.ReadableState = so;
  var { EventEmitter: Zw } = (sr(), X(nr)), { Stream: Dt, prependListener: e_ } = nn(), { Buffer: eo } = (be(), X(me)), { addAbortSignal: t_ } = di(), r_ = vt(), H = Je().debuglog("stream", (t) => {
    H = t;
  }), i_ = dc(), Fr = ir(), { getHighWaterMark: n_, getDefaultHighWaterMark: s_ } = an(), { aggregateTwoErrors: Fc, codes: { ERR_INVALID_ARG_TYPE: o_, ERR_METHOD_NOT_IMPLEMENTED: a_, ERR_OUT_OF_RANGE: l_, ERR_STREAM_PUSH_AFTER_EOF: u_, ERR_STREAM_UNSHIFT_AFTER_END_EVENT: f_ } } = Ae(), { validateObject: c_ } = hi(), fr = Xw("kPaused"), { StringDecoder: Vc } = (Uc(), X(Lc)), h_ = Zs();
  Hc(F.prototype, Dt.prototype);
  Hc(F, Dt);
  var to = () => {
  }, { errorOrDestroy: jr } = Fr;
  function so(t, e, r) {
    typeof r != "boolean" && (r = e instanceof nt()), this.objectMode = !!(t && t.objectMode), r && (this.objectMode = this.objectMode || !!(t && t.readableObjectMode)), this.highWaterMark = t ? n_(this, t, "readableHighWaterMark", r) : s_(false), this.buffer = new i_, this.length = 0, this.pipes = [], this.flowing = null, this.ended = false, this.endEmitted = false, this.reading = false, this.constructed = true, this.sync = true, this.needReadable = false, this.emittedReadable = false, this.readableListening = false, this.resumeScheduled = false, this[fr] = null, this.errorEmitted = false, this.emitClose = !t || t.emitClose !== false, this.autoDestroy = !t || t.autoDestroy !== false, this.destroyed = false, this.errored = null, this.closed = false, this.closeEmitted = false, this.defaultEncoding = t && t.defaultEncoding || "utf8", this.awaitDrainWriters = null, this.multiAwaitDrain = false, this.readingMore = false, this.dataEmitted = false, this.decoder = null, this.encoding = null, t && t.encoding && (this.decoder = new Vc(t.encoding), this.encoding = t.encoding);
  }
  function F(t) {
    if (!(this instanceof F))
      return new F(t);
    let e = this instanceof nt();
    this._readableState = new so(t, this, e), t && (typeof t.read == "function" && (this._read = t.read), typeof t.destroy == "function" && (this._destroy = t.destroy), typeof t.construct == "function" && (this._construct = t.construct), t.signal && !e && t_(t.signal, this)), Dt.call(this, t), Fr.construct(this, () => {
      this._readableState.needReadable && hn(this, this._readableState);
    });
  }
  F.prototype.destroy = Fr.destroy;
  F.prototype._undestroy = Fr.undestroy;
  F.prototype._destroy = function(t, e) {
    e(t);
  };
  F.prototype[Zw.captureRejectionSymbol] = function(t) {
    this.destroy(t);
  };
  F.prototype.push = function(t, e) {
    return zc(this, t, e, false);
  };
  F.prototype.unshift = function(t, e) {
    return zc(this, t, e, true);
  };
  function zc(t, e, r, i) {
    H("readableAddChunk", e);
    let n = t._readableState, o;
    if (n.objectMode || (typeof e == "string" ? (r = r || n.defaultEncoding, n.encoding !== r && (i && n.encoding ? e = eo.from(e, r).toString(n.encoding) : (e = eo.from(e, r), r = ""))) : e instanceof eo ? r = "" : Dt._isUint8Array(e) ? (e = Dt._uint8ArrayToBuffer(e), r = "") : e != null && (o = new o_("chunk", ["string", "Buffer", "Uint8Array"], e))), o)
      jr(t, o);
    else if (e === null)
      n.reading = false, g_(t, n);
    else if (n.objectMode || e && e.length > 0)
      if (i)
        if (n.endEmitted)
          jr(t, new f_);
        else {
          if (n.destroyed || n.errored)
            return false;
          ro(t, n, e, true);
        }
      else if (n.ended)
        jr(t, new u_);
      else {
        if (n.destroyed || n.errored)
          return false;
        n.reading = false, n.decoder && !r ? (e = n.decoder.write(e), n.objectMode || e.length !== 0 ? ro(t, n, e, false) : hn(t, n)) : ro(t, n, e, false);
      }
    else
      i || (n.reading = false, hn(t, n));
    return !n.ended && (n.length < n.highWaterMark || n.length === 0);
  }
  function ro(t, e, r, i) {
    e.flowing && e.length === 0 && !e.sync && t.listenerCount("data") > 0 ? (e.multiAwaitDrain ? e.awaitDrainWriters.clear() : e.awaitDrainWriters = null, e.dataEmitted = true, t.emit("data", r)) : (e.length += e.objectMode ? 1 : r.length, i ? e.buffer.unshift(r) : e.buffer.push(r), e.needReadable && dn(t)), hn(t, e);
  }
  F.prototype.isPaused = function() {
    let t = this._readableState;
    return t[fr] === true || t.flowing === false;
  };
  F.prototype.setEncoding = function(t) {
    let e = new Vc(t);
    this._readableState.decoder = e, this._readableState.encoding = this._readableState.decoder.encoding;
    let r = this._readableState.buffer, i = "";
    for (let n of r)
      i += e.write(n);
    return r.clear(), i !== "" && r.push(i), this._readableState.length = i.length, this;
  };
  var d_ = 1073741824;
  function p_(t) {
    if (t > d_)
      throw new l_("size", "<= 1GiB", t);
    return t--, t |= t >>> 1, t |= t >>> 2, t |= t >>> 4, t |= t >>> 8, t |= t >>> 16, t++, t;
  }
  function Wc(t, e) {
    return t <= 0 || e.length === 0 && e.ended ? 0 : e.objectMode ? 1 : zw(t) ? e.flowing && e.length ? e.buffer.first().length : e.length : t <= e.length ? t : e.ended ? e.length : 0;
  }
  F.prototype.read = function(t) {
    H("read", t), t === undefined ? t = NaN : Vw(t) || (t = Kw(t, 10));
    let e = this._readableState, r = t;
    if (t > e.highWaterMark && (e.highWaterMark = p_(t)), t !== 0 && (e.emittedReadable = false), t === 0 && e.needReadable && ((e.highWaterMark !== 0 ? e.length >= e.highWaterMark : e.length > 0) || e.ended))
      return H("read: emitReadable", e.length, e.ended), e.length === 0 && e.ended ? io(this) : dn(this), null;
    if (t = Wc(t, e), t === 0 && e.ended)
      return e.length === 0 && io(this), null;
    let i = e.needReadable;
    if (H("need readable", i), (e.length === 0 || e.length - t < e.highWaterMark) && (i = true, H("length less than watermark", i)), e.ended || e.reading || e.destroyed || e.errored || !e.constructed)
      i = false, H("reading, ended or constructing", i);
    else if (i) {
      H("do read"), e.reading = true, e.sync = true, e.length === 0 && (e.needReadable = true);
      try {
        this._read(e.highWaterMark);
      } catch (o) {
        jr(this, o);
      }
      e.sync = false, e.reading || (t = Wc(r, e));
    }
    let n;
    return t > 0 ? n = Jc(t, e) : n = null, n === null ? (e.needReadable = e.length <= e.highWaterMark, t = 0) : (e.length -= t, e.multiAwaitDrain ? e.awaitDrainWriters.clear() : e.awaitDrainWriters = null), e.length === 0 && (e.ended || (e.needReadable = true), r !== t && e.ended && io(this)), n !== null && !e.errorEmitted && !e.closeEmitted && (e.dataEmitted = true, this.emit("data", n)), n;
  };
  function g_(t, e) {
    if (H("onEofChunk"), !e.ended) {
      if (e.decoder) {
        let r = e.decoder.end();
        r && r.length && (e.buffer.push(r), e.length += e.objectMode ? 1 : r.length);
      }
      e.ended = true, e.sync ? dn(t) : (e.needReadable = false, e.emittedReadable = true, Kc(t));
    }
  }
  function dn(t) {
    let e = t._readableState;
    H("emitReadable", e.needReadable, e.emittedReadable), e.needReadable = false, e.emittedReadable || (H("emitReadable", e.flowing), e.emittedReadable = true, He.nextTick(Kc, t));
  }
  function Kc(t) {
    let e = t._readableState;
    H("emitReadable_", e.destroyed, e.length, e.ended), !e.destroyed && !e.errored && (e.length || e.ended) && (t.emit("readable"), e.emittedReadable = false), e.needReadable = !e.flowing && !e.ended && e.length <= e.highWaterMark, Qc(t);
  }
  function hn(t, e) {
    !e.readingMore && e.constructed && (e.readingMore = true, He.nextTick(y_, t, e));
  }
  function y_(t, e) {
    for (;!e.reading && !e.ended && (e.length < e.highWaterMark || e.flowing && e.length === 0); ) {
      let r = e.length;
      if (H("maybeReadMore read 0"), t.read(0), r === e.length)
        break;
    }
    e.readingMore = false;
  }
  F.prototype._read = function(t) {
    throw new a_("_read()");
  };
  F.prototype.pipe = function(t, e) {
    let r = this, i = this._readableState;
    i.pipes.length === 1 && (i.multiAwaitDrain || (i.multiAwaitDrain = true, i.awaitDrainWriters = new Yw(i.awaitDrainWriters ? [i.awaitDrainWriters] : []))), i.pipes.push(t), H("pipe count=%d opts=%j", i.pipes.length, e);
    let o = (!e || e.end !== false) && t !== He.stdout && t !== He.stderr ? a : E;
    i.endEmitted ? He.nextTick(o) : r.once("end", o), t.on("unpipe", s);
    function s(I, C) {
      H("onunpipe"), I === r && C && C.hasUnpiped === false && (C.hasUnpiped = true, h());
    }
    function a() {
      H("onend"), t.end();
    }
    let l, c = false;
    function h() {
      H("cleanup"), t.removeListener("close", w), t.removeListener("finish", S), l && t.removeListener("drain", l), t.removeListener("error", y), t.removeListener("unpipe", s), r.removeListener("end", a), r.removeListener("end", E), r.removeListener("data", g), c = true, l && i.awaitDrainWriters && (!t._writableState || t._writableState.needDrain) && l();
    }
    function d() {
      c || (i.pipes.length === 1 && i.pipes[0] === t ? (H("false write response, pause", 0), i.awaitDrainWriters = t, i.multiAwaitDrain = false) : i.pipes.length > 1 && i.pipes.includes(t) && (H("false write response, pause", i.awaitDrainWriters.size), i.awaitDrainWriters.add(t)), r.pause()), l || (l = b_(r, t), t.on("drain", l));
    }
    r.on("data", g);
    function g(I) {
      H("ondata");
      let C = t.write(I);
      H("dest.write", C), C === false && d();
    }
    function y(I) {
      if (H("onerror", I), E(), t.removeListener("error", y), t.listenerCount("error") === 0) {
        let C = t._writableState || t._readableState;
        C && !C.errorEmitted ? jr(t, I) : t.emit("error", I);
      }
    }
    e_(t, "error", y);
    function w() {
      t.removeListener("finish", S), E();
    }
    t.once("close", w);
    function S() {
      H("onfinish"), t.removeListener("close", w), E();
    }
    t.once("finish", S);
    function E() {
      H("unpipe"), r.unpipe(t);
    }
    return t.emit("pipe", r), t.writableNeedDrain === true ? i.flowing && d() : i.flowing || (H("pipe resume"), r.resume()), t;
  };
  function b_(t, e) {
    return function() {
      let i = t._readableState;
      i.awaitDrainWriters === e ? (H("pipeOnDrain", 1), i.awaitDrainWriters = null) : i.multiAwaitDrain && (H("pipeOnDrain", i.awaitDrainWriters.size), i.awaitDrainWriters.delete(e)), (!i.awaitDrainWriters || i.awaitDrainWriters.size === 0) && t.listenerCount("data") && t.resume();
    };
  }
  F.prototype.unpipe = function(t) {
    let e = this._readableState, r = { hasUnpiped: false };
    if (e.pipes.length === 0)
      return this;
    if (!t) {
      let n = e.pipes;
      e.pipes = [], this.pause();
      for (let o = 0;o < n.length; o++)
        n[o].emit("unpipe", this, { hasUnpiped: false });
      return this;
    }
    let i = Hw(e.pipes, t);
    return i === -1 ? this : (e.pipes.splice(i, 1), e.pipes.length === 0 && this.pause(), t.emit("unpipe", this, r), this);
  };
  F.prototype.on = function(t, e) {
    let r = Dt.prototype.on.call(this, t, e), i = this._readableState;
    return t === "data" ? (i.readableListening = this.listenerCount("readable") > 0, i.flowing !== false && this.resume()) : t === "readable" && !i.endEmitted && !i.readableListening && (i.readableListening = i.needReadable = true, i.flowing = false, i.emittedReadable = false, H("on readable", i.length, i.reading), i.length ? dn(this) : i.reading || He.nextTick(w_, this)), r;
  };
  F.prototype.addListener = F.prototype.on;
  F.prototype.removeListener = function(t, e) {
    let r = Dt.prototype.removeListener.call(this, t, e);
    return t === "readable" && He.nextTick(Gc, this), r;
  };
  F.prototype.off = F.prototype.removeListener;
  F.prototype.removeAllListeners = function(t) {
    let e = Dt.prototype.removeAllListeners.apply(this, arguments);
    return (t === "readable" || t === undefined) && He.nextTick(Gc, this), e;
  };
  function Gc(t) {
    let e = t._readableState;
    e.readableListening = t.listenerCount("readable") > 0, e.resumeScheduled && e[fr] === false ? e.flowing = true : t.listenerCount("data") > 0 ? t.resume() : e.readableListening || (e.flowing = null);
  }
  function w_(t) {
    H("readable nexttick read 0"), t.read(0);
  }
  F.prototype.resume = function() {
    let t = this._readableState;
    return t.flowing || (H("resume"), t.flowing = !t.readableListening, __(this, t)), t[fr] = false, this;
  };
  function __(t, e) {
    e.resumeScheduled || (e.resumeScheduled = true, He.nextTick(m_, t, e));
  }
  function m_(t, e) {
    H("resume", e.reading), e.reading || t.read(0), e.resumeScheduled = false, t.emit("resume"), Qc(t), e.flowing && !e.reading && t.read(0);
  }
  F.prototype.pause = function() {
    return H("call pause flowing=%j", this._readableState.flowing), this._readableState.flowing !== false && (H("pause"), this._readableState.flowing = false, this.emit("pause")), this._readableState[fr] = true, this;
  };
  function Qc(t) {
    let e = t._readableState;
    for (H("flow", e.flowing);e.flowing && t.read() !== null; )
      ;
  }
  F.prototype.wrap = function(t) {
    let e = false;
    t.on("data", (i) => {
      !this.push(i) && t.pause && (e = true, t.pause());
    }), t.on("end", () => {
      this.push(null);
    }), t.on("error", (i) => {
      jr(this, i);
    }), t.on("close", () => {
      this.destroy();
    }), t.on("destroy", () => {
      this.destroy();
    }), this._read = () => {
      e && t.resume && (e = false, t.resume());
    };
    let r = Gw(t);
    for (let i = 1;i < r.length; i++) {
      let n = r[i];
      this[n] === undefined && typeof t[n] == "function" && (this[n] = t[n].bind(t));
    }
    return this;
  };
  F.prototype[Jw] = function() {
    return Yc(this);
  };
  F.prototype.iterator = function(t) {
    return t !== undefined && c_(t, "options"), Yc(this, t);
  };
  function Yc(t, e) {
    typeof t.read != "function" && (t = F.wrap(t, { objectMode: true }));
    let r = v_(t, e);
    return r.stream = t, r;
  }
  async function* v_(t, e) {
    let r = to;
    function i(s) {
      this === t ? (r(), r = to) : r = s;
    }
    t.on("readable", i);
    let n, o = r_(t, { writable: false }, (s) => {
      n = s ? Fc(n, s) : null, r(), r = to;
    });
    try {
      for (;; ) {
        let s = t.destroyed ? null : t.read();
        if (s !== null)
          yield s;
        else {
          if (n)
            throw n;
          if (n === null)
            return;
          await new Qw(i);
        }
      }
    } catch (s) {
      throw n = Fc(n, s), n;
    } finally {
      (n || e?.destroyOnReturn !== false) && (n === undefined || t._readableState.autoDestroy) ? Fr.destroyer(t, null) : (t.off("readable", i), o());
    }
  }
  $c(F.prototype, { readable: { __proto__: null, get() {
    let t = this._readableState;
    return !!t && t.readable !== false && !t.destroyed && !t.errorEmitted && !t.endEmitted;
  }, set(t) {
    this._readableState && (this._readableState.readable = !!t);
  } }, readableDidRead: { __proto__: null, enumerable: false, get: function() {
    return this._readableState.dataEmitted;
  } }, readableAborted: { __proto__: null, enumerable: false, get: function() {
    return !!(this._readableState.readable !== false && (this._readableState.destroyed || this._readableState.errored) && !this._readableState.endEmitted);
  } }, readableHighWaterMark: { __proto__: null, enumerable: false, get: function() {
    return this._readableState.highWaterMark;
  } }, readableBuffer: { __proto__: null, enumerable: false, get: function() {
    return this._readableState && this._readableState.buffer;
  } }, readableFlowing: { __proto__: null, enumerable: false, get: function() {
    return this._readableState.flowing;
  }, set: function(t) {
    this._readableState && (this._readableState.flowing = t);
  } }, readableLength: { __proto__: null, enumerable: false, get() {
    return this._readableState.length;
  } }, readableObjectMode: { __proto__: null, enumerable: false, get() {
    return this._readableState ? this._readableState.objectMode : false;
  } }, readableEncoding: { __proto__: null, enumerable: false, get() {
    return this._readableState ? this._readableState.encoding : null;
  } }, errored: { __proto__: null, enumerable: false, get() {
    return this._readableState ? this._readableState.errored : null;
  } }, closed: { __proto__: null, get() {
    return this._readableState ? this._readableState.closed : false;
  } }, destroyed: { __proto__: null, enumerable: false, get() {
    return this._readableState ? this._readableState.destroyed : false;
  }, set(t) {
    this._readableState && (this._readableState.destroyed = t);
  } }, readableEnded: { __proto__: null, enumerable: false, get() {
    return this._readableState ? this._readableState.endEmitted : false;
  } } });
  $c(so.prototype, { pipesCount: { __proto__: null, get() {
    return this.pipes.length;
  } }, paused: { __proto__: null, get() {
    return this[fr] !== false;
  }, set(t) {
    this[fr] = !!t;
  } } });
  F._fromList = Jc;
  function Jc(t, e) {
    if (e.length === 0)
      return null;
    let r;
    return e.objectMode ? r = e.buffer.shift() : !t || t >= e.length ? (e.decoder ? r = e.buffer.join("") : e.buffer.length === 1 ? r = e.buffer.first() : r = e.buffer.concat(e.length), e.buffer.clear()) : r = e.buffer.consume(t, e.decoder), r;
  }
  function io(t) {
    let e = t._readableState;
    H("endReadable", e.endEmitted), e.endEmitted || (e.ended = true, He.nextTick(E_, e, t));
  }
  function E_(t, e) {
    if (H("endReadableNT", t.endEmitted, t.length), !t.errored && !t.closeEmitted && !t.endEmitted && t.length === 0) {
      if (t.endEmitted = true, e.emit("end"), e.writable && e.allowHalfOpen === false)
        He.nextTick(S_, e);
      else if (t.autoDestroy) {
        let r = e._writableState;
        (!r || r.autoDestroy && (r.finished || r.writable === false)) && e.destroy();
      }
    }
  }
  function S_(t) {
    t.writable && !t.writableEnded && !t.destroyed && t.end();
  }
  F.from = function(t, e) {
    return h_(F, t, e);
  };
  var no;
  function Xc() {
    return no === undefined && (no = {}), no;
  }
  F.fromWeb = function(t, e) {
    return Xc().newStreamReadableFromReadableStream(t, e);
  };
  F.toWeb = function(t, e) {
    return Xc().newReadableStreamFromStreamReadable(t, e);
  };
  F.wrap = function(t, e) {
    var r, i;
    return new F({ objectMode: (r = (i = t.readableObjectMode) !== null && i !== undefined ? i : t.objectMode) !== null && r !== undefined ? r : true, ...e, destroy(n, o) {
      Fr.destroyer(t, n), o(n);
    } }).wrap(t);
  };
});
var ho = M((fR, ch) => {
  _();
  v();
  m();
  var cr = Nt(), { ArrayPrototypeSlice: rh, Error: A_, FunctionPrototypeSymbolHasInstance: ih, ObjectDefineProperty: nh, ObjectDefineProperties: I_, ObjectSetPrototypeOf: sh, StringPrototypeToLowerCase: T_, Symbol: R_, SymbolHasInstance: C_ } = ce();
  ch.exports = ie;
  ie.WritableState = wi;
  var { EventEmitter: B_ } = (sr(), X(nr)), yi = nn().Stream, { Buffer: pn } = (be(), X(me)), bn = ir(), { addAbortSignal: P_ } = di(), { getHighWaterMark: k_, getDefaultHighWaterMark: O_ } = an(), { ERR_INVALID_ARG_TYPE: x_, ERR_METHOD_NOT_IMPLEMENTED: M_, ERR_MULTIPLE_CALLBACK: oh, ERR_STREAM_CANNOT_PIPE: L_, ERR_STREAM_DESTROYED: bi, ERR_STREAM_ALREADY_FINISHED: U_, ERR_STREAM_NULL_VALUES: N_, ERR_STREAM_WRITE_AFTER_END: q_, ERR_UNKNOWN_ENCODING: ah } = Ae().codes, { errorOrDestroy: Wr } = bn;
  sh(ie.prototype, yi.prototype);
  sh(ie, yi);
  function lo() {
  }
  var $r = R_("kOnFinished");
  function wi(t, e, r) {
    typeof r != "boolean" && (r = e instanceof nt()), this.objectMode = !!(t && t.objectMode), r && (this.objectMode = this.objectMode || !!(t && t.writableObjectMode)), this.highWaterMark = t ? k_(this, t, "writableHighWaterMark", r) : O_(false), this.finalCalled = false, this.needDrain = false, this.ending = false, this.ended = false, this.finished = false, this.destroyed = false;
    let i = !!(t && t.decodeStrings === false);
    this.decodeStrings = !i, this.defaultEncoding = t && t.defaultEncoding || "utf8", this.length = 0, this.writing = false, this.corked = 0, this.sync = true, this.bufferProcessing = false, this.onwrite = j_.bind(undefined, e), this.writecb = null, this.writelen = 0, this.afterWriteTickInfo = null, yn(this), this.pendingcb = 0, this.constructed = true, this.prefinished = false, this.errorEmitted = false, this.emitClose = !t || t.emitClose !== false, this.autoDestroy = !t || t.autoDestroy !== false, this.errored = null, this.closed = false, this.closeEmitted = false, this[$r] = [];
  }
  function yn(t) {
    t.buffered = [], t.bufferedIndex = 0, t.allBuffers = true, t.allNoop = true;
  }
  wi.prototype.getBuffer = function() {
    return rh(this.buffered, this.bufferedIndex);
  };
  nh(wi.prototype, "bufferedRequestCount", { __proto__: null, get() {
    return this.buffered.length - this.bufferedIndex;
  } });
  function ie(t) {
    let e = this instanceof nt();
    if (!e && !ih(ie, this))
      return new ie(t);
    this._writableState = new wi(t, this, e), t && (typeof t.write == "function" && (this._write = t.write), typeof t.writev == "function" && (this._writev = t.writev), typeof t.destroy == "function" && (this._destroy = t.destroy), typeof t.final == "function" && (this._final = t.final), typeof t.construct == "function" && (this._construct = t.construct), t.signal && P_(t.signal, this)), yi.call(this, t), bn.construct(this, () => {
      let r = this._writableState;
      r.writing || fo(this, r), co(this, r);
    });
  }
  nh(ie, C_, { __proto__: null, value: function(t) {
    return ih(this, t) ? true : this !== ie ? false : t && t._writableState instanceof wi;
  } });
  ie.prototype.pipe = function() {
    Wr(this, new L_);
  };
  function lh(t, e, r, i) {
    let n = t._writableState;
    if (typeof r == "function")
      i = r, r = n.defaultEncoding;
    else {
      if (!r)
        r = n.defaultEncoding;
      else if (r !== "buffer" && !pn.isEncoding(r))
        throw new ah(r);
      typeof i != "function" && (i = lo);
    }
    if (e === null)
      throw new N_;
    if (!n.objectMode)
      if (typeof e == "string")
        n.decodeStrings !== false && (e = pn.from(e, r), r = "buffer");
      else if (e instanceof pn)
        r = "buffer";
      else if (yi._isUint8Array(e))
        e = yi._uint8ArrayToBuffer(e), r = "buffer";
      else
        throw new x_("chunk", ["string", "Buffer", "Uint8Array"], e);
    let o;
    return n.ending ? o = new q_ : n.destroyed && (o = new bi("write")), o ? (cr.nextTick(i, o), Wr(t, o, true), o) : (n.pendingcb++, D_(t, n, e, r, i));
  }
  ie.prototype.write = function(t, e, r) {
    return lh(this, t, e, r) === true;
  };
  ie.prototype.cork = function() {
    this._writableState.corked++;
  };
  ie.prototype.uncork = function() {
    let t = this._writableState;
    t.corked && (t.corked--, t.writing || fo(this, t));
  };
  ie.prototype.setDefaultEncoding = function(e) {
    if (typeof e == "string" && (e = T_(e)), !pn.isEncoding(e))
      throw new ah(e);
    return this._writableState.defaultEncoding = e, this;
  };
  function D_(t, e, r, i, n) {
    let o = e.objectMode ? 1 : r.length;
    e.length += o;
    let s = e.length < e.highWaterMark;
    return s || (e.needDrain = true), e.writing || e.corked || e.errored || !e.constructed ? (e.buffered.push({ chunk: r, encoding: i, callback: n }), e.allBuffers && i !== "buffer" && (e.allBuffers = false), e.allNoop && n !== lo && (e.allNoop = false)) : (e.writelen = o, e.writecb = n, e.writing = true, e.sync = true, t._write(r, i, e.onwrite), e.sync = false), s && !e.errored && !e.destroyed;
  }
  function eh(t, e, r, i, n, o, s) {
    e.writelen = i, e.writecb = s, e.writing = true, e.sync = true, e.destroyed ? e.onwrite(new bi("write")) : r ? t._writev(n, e.onwrite) : t._write(n, o, e.onwrite), e.sync = false;
  }
  function th(t, e, r, i) {
    --e.pendingcb, i(r), uo(e), Wr(t, r);
  }
  function j_(t, e) {
    let r = t._writableState, i = r.sync, n = r.writecb;
    if (typeof n != "function") {
      Wr(t, new oh);
      return;
    }
    r.writing = false, r.writecb = null, r.length -= r.writelen, r.writelen = 0, e ? (e.stack, r.errored || (r.errored = e), t._readableState && !t._readableState.errored && (t._readableState.errored = e), i ? cr.nextTick(th, t, r, e, n) : th(t, r, e, n)) : (r.buffered.length > r.bufferedIndex && fo(t, r), i ? r.afterWriteTickInfo !== null && r.afterWriteTickInfo.cb === n ? r.afterWriteTickInfo.count++ : (r.afterWriteTickInfo = { count: 1, cb: n, stream: t, state: r }, cr.nextTick(F_, r.afterWriteTickInfo)) : uh(t, r, 1, n));
  }
  function F_({ stream: t, state: e, count: r, cb: i }) {
    return e.afterWriteTickInfo = null, uh(t, e, r, i);
  }
  function uh(t, e, r, i) {
    for (!e.ending && !t.destroyed && e.length === 0 && e.needDrain && (e.needDrain = false, t.emit("drain"));r-- > 0; )
      e.pendingcb--, i();
    e.destroyed && uo(e), co(t, e);
  }
  function uo(t) {
    if (t.writing)
      return;
    for (let n = t.bufferedIndex;n < t.buffered.length; ++n) {
      var e;
      let { chunk: o, callback: s } = t.buffered[n], a = t.objectMode ? 1 : o.length;
      t.length -= a, s((e = t.errored) !== null && e !== undefined ? e : new bi("write"));
    }
    let r = t[$r].splice(0);
    for (let n = 0;n < r.length; n++) {
      var i;
      r[n]((i = t.errored) !== null && i !== undefined ? i : new bi("end"));
    }
    yn(t);
  }
  function fo(t, e) {
    if (e.corked || e.bufferProcessing || e.destroyed || !e.constructed)
      return;
    let { buffered: r, bufferedIndex: i, objectMode: n } = e, o = r.length - i;
    if (!o)
      return;
    let s = i;
    if (e.bufferProcessing = true, o > 1 && t._writev) {
      e.pendingcb -= o - 1;
      let a = e.allNoop ? lo : (c) => {
        for (let h = s;h < r.length; ++h)
          r[h].callback(c);
      }, l = e.allNoop && s === 0 ? r : rh(r, s);
      l.allBuffers = e.allBuffers, eh(t, e, true, e.length, l, "", a), yn(e);
    } else {
      do {
        let { chunk: a, encoding: l, callback: c } = r[s];
        r[s++] = null;
        let h = n ? 1 : a.length;
        eh(t, e, false, h, a, l, c);
      } while (s < r.length && !e.writing);
      s === r.length ? yn(e) : s > 256 ? (r.splice(0, s), e.bufferedIndex = 0) : e.bufferedIndex = s;
    }
    e.bufferProcessing = false;
  }
  ie.prototype._write = function(t, e, r) {
    if (this._writev)
      this._writev([{ chunk: t, encoding: e }], r);
    else
      throw new M_("_write()");
  };
  ie.prototype._writev = null;
  ie.prototype.end = function(t, e, r) {
    let i = this._writableState;
    typeof t == "function" ? (r = t, t = null, e = null) : typeof e == "function" && (r = e, e = null);
    let n;
    if (t != null) {
      let o = lh(this, t, e);
      o instanceof A_ && (n = o);
    }
    return i.corked && (i.corked = 1, this.uncork()), n || (!i.errored && !i.ending ? (i.ending = true, co(this, i, true), i.ended = true) : i.finished ? n = new U_("end") : i.destroyed && (n = new bi("end"))), typeof r == "function" && (n || i.finished ? cr.nextTick(r, n) : i[$r].push(r)), this;
  };
  function gn(t) {
    return t.ending && !t.destroyed && t.constructed && t.length === 0 && !t.errored && t.buffered.length === 0 && !t.finished && !t.writing && !t.errorEmitted && !t.closeEmitted;
  }
  function W_(t, e) {
    let r = false;
    function i(n) {
      if (r) {
        Wr(t, n ?? oh());
        return;
      }
      if (r = true, e.pendingcb--, n) {
        let o = e[$r].splice(0);
        for (let s = 0;s < o.length; s++)
          o[s](n);
        Wr(t, n, e.sync);
      } else
        gn(e) && (e.prefinished = true, t.emit("prefinish"), e.pendingcb++, cr.nextTick(ao, t, e));
    }
    e.sync = true, e.pendingcb++;
    try {
      t._final(i);
    } catch (n) {
      i(n);
    }
    e.sync = false;
  }
  function $_(t, e) {
    !e.prefinished && !e.finalCalled && (typeof t._final == "function" && !e.destroyed ? (e.finalCalled = true, W_(t, e)) : (e.prefinished = true, t.emit("prefinish")));
  }
  function co(t, e, r) {
    gn(e) && ($_(t, e), e.pendingcb === 0 && (r ? (e.pendingcb++, cr.nextTick((i, n) => {
      gn(n) ? ao(i, n) : n.pendingcb--;
    }, t, e)) : gn(e) && (e.pendingcb++, ao(t, e))));
  }
  function ao(t, e) {
    e.pendingcb--, e.finished = true;
    let r = e[$r].splice(0);
    for (let i = 0;i < r.length; i++)
      r[i]();
    if (t.emit("finish"), e.autoDestroy) {
      let i = t._readableState;
      (!i || i.autoDestroy && (i.endEmitted || i.readable === false)) && t.destroy();
    }
  }
  I_(ie.prototype, { closed: { __proto__: null, get() {
    return this._writableState ? this._writableState.closed : false;
  } }, destroyed: { __proto__: null, get() {
    return this._writableState ? this._writableState.destroyed : false;
  }, set(t) {
    this._writableState && (this._writableState.destroyed = t);
  } }, writable: { __proto__: null, get() {
    let t = this._writableState;
    return !!t && t.writable !== false && !t.destroyed && !t.errored && !t.ending && !t.ended;
  }, set(t) {
    this._writableState && (this._writableState.writable = !!t);
  } }, writableFinished: { __proto__: null, get() {
    return this._writableState ? this._writableState.finished : false;
  } }, writableObjectMode: { __proto__: null, get() {
    return this._writableState ? this._writableState.objectMode : false;
  } }, writableBuffer: { __proto__: null, get() {
    return this._writableState && this._writableState.getBuffer();
  } }, writableEnded: { __proto__: null, get() {
    return this._writableState ? this._writableState.ending : false;
  } }, writableNeedDrain: { __proto__: null, get() {
    let t = this._writableState;
    return t ? !t.destroyed && !t.ending && t.needDrain : false;
  } }, writableHighWaterMark: { __proto__: null, get() {
    return this._writableState && this._writableState.highWaterMark;
  } }, writableCorked: { __proto__: null, get() {
    return this._writableState ? this._writableState.corked : 0;
  } }, writableLength: { __proto__: null, get() {
    return this._writableState && this._writableState.length;
  } }, errored: { __proto__: null, enumerable: false, get() {
    return this._writableState ? this._writableState.errored : null;
  } }, writableAborted: { __proto__: null, enumerable: false, get: function() {
    return !!(this._writableState.writable !== false && (this._writableState.destroyed || this._writableState.errored) && !this._writableState.finished);
  } } });
  var H_ = bn.destroy;
  ie.prototype.destroy = function(t, e) {
    let r = this._writableState;
    return !r.destroyed && (r.bufferedIndex < r.buffered.length || r[$r].length) && cr.nextTick(uo, r), H_.call(this, t, e), this;
  };
  ie.prototype._undestroy = bn.undestroy;
  ie.prototype._destroy = function(t, e) {
    e(t);
  };
  ie.prototype[B_.captureRejectionSymbol] = function(t) {
    this.destroy(t);
  };
  var oo;
  function fh() {
    return oo === undefined && (oo = {}), oo;
  }
  ie.fromWeb = function(t, e) {
    return fh().newStreamWritableFromWritableStream(t, e);
  };
  ie.toWeb = function(t) {
    return fh().newWritableStreamFromStreamWritable(t);
  };
});
var Sh = M((mR, Eh) => {
  _();
  v();
  m();
  var po = Nt(), V_ = (be(), X(me)), { isReadable: z_, isWritable: K_, isIterable: hh, isNodeStream: G_, isReadableNodeStream: dh, isWritableNodeStream: ph, isDuplexNodeStream: Q_ } = tt(), gh = vt(), { AbortError: vh, codes: { ERR_INVALID_ARG_TYPE: Y_, ERR_INVALID_RETURN_VALUE: yh } } = Ae(), { destroyer: Hr } = ir(), J_ = nt(), X_ = gi(), { createDeferredPromise: bh } = Je(), wh = Zs(), _h = globalThis.Blob || V_.Blob, Z_ = typeof _h < "u" ? function(e) {
    return e instanceof _h;
  } : function(e) {
    return false;
  }, e0 = globalThis.AbortController || zi().AbortController, { FunctionPrototypeCall: mh } = ce(), hr = class extends J_ {
    constructor(e) {
      super(e), e?.readable === false && (this._readableState.readable = false, this._readableState.ended = true, this._readableState.endEmitted = true), e?.writable === false && (this._writableState.writable = false, this._writableState.ending = true, this._writableState.ended = true, this._writableState.finished = true);
    }
  };
  Eh.exports = function t(e, r) {
    if (Q_(e))
      return e;
    if (dh(e))
      return wn({ readable: e });
    if (ph(e))
      return wn({ writable: e });
    if (G_(e))
      return wn({ writable: false, readable: false });
    if (typeof e == "function") {
      let { value: n, write: o, final: s, destroy: a } = t0(e);
      if (hh(n))
        return wh(hr, n, { objectMode: true, write: o, final: s, destroy: a });
      let l = n?.then;
      if (typeof l == "function") {
        let c, h = mh(l, n, (d) => {
          if (d != null)
            throw new yh("nully", "body", d);
        }, (d) => {
          Hr(c, d);
        });
        return c = new hr({ objectMode: true, readable: false, write: o, final(d) {
          s(async () => {
            try {
              await h, po.nextTick(d, null);
            } catch (g) {
              po.nextTick(d, g);
            }
          });
        }, destroy: a });
      }
      throw new yh("Iterable, AsyncIterable or AsyncFunction", r, n);
    }
    if (Z_(e))
      return t(e.arrayBuffer());
    if (hh(e))
      return wh(hr, e, { objectMode: true, writable: false });
    if (typeof e?.writable == "object" || typeof e?.readable == "object") {
      let n = e != null && e.readable ? dh(e?.readable) ? e?.readable : t(e.readable) : undefined, o = e != null && e.writable ? ph(e?.writable) ? e?.writable : t(e.writable) : undefined;
      return wn({ readable: n, writable: o });
    }
    let i = e?.then;
    if (typeof i == "function") {
      let n;
      return mh(i, e, (o) => {
        o != null && n.push(o), n.push(null);
      }, (o) => {
        Hr(n, o);
      }), n = new hr({ objectMode: true, writable: false, read() {
      } });
    }
    throw new Y_(r, ["Blob", "ReadableStream", "WritableStream", "Stream", "Iterable", "AsyncIterable", "Function", "{ readable, writable } pair", "Promise"], e);
  };
  function t0(t) {
    let { promise: e, resolve: r } = bh(), i = new e0, n = i.signal;
    return { value: t(async function* () {
      for (;; ) {
        let s = e;
        e = null;
        let { chunk: a, done: l, cb: c } = await s;
        if (po.nextTick(c), l)
          return;
        if (n.aborted)
          throw new vh(undefined, { cause: n.reason });
        ({ promise: e, resolve: r } = bh()), yield a;
      }
    }(), { signal: n }), write(s, a, l) {
      let c = r;
      r = null, c({ chunk: s, done: false, cb: l });
    }, final(s) {
      let a = r;
      r = null, a({ done: true, cb: s });
    }, destroy(s, a) {
      i.abort(), a(s);
    } };
  }
  function wn(t) {
    let e = t.readable && typeof t.readable.read != "function" ? X_.wrap(t.readable) : t.readable, r = t.writable, i = !!z_(e), n = !!K_(r), o, s, a, l, c;
    function h(d) {
      let g = l;
      l = null, g ? g(d) : d && c.destroy(d);
    }
    return c = new hr({ readableObjectMode: !!(e != null && e.readableObjectMode), writableObjectMode: !!(r != null && r.writableObjectMode), readable: i, writable: n }), n && (gh(r, (d) => {
      n = false, d && Hr(e, d), h(d);
    }), c._write = function(d, g, y) {
      r.write(d, g) ? y() : o = y;
    }, c._final = function(d) {
      r.end(), s = d;
    }, r.on("drain", function() {
      if (o) {
        let d = o;
        o = null, d();
      }
    }), r.on("finish", function() {
      if (s) {
        let d = s;
        s = null, d();
      }
    })), i && (gh(e, (d) => {
      i = false, d && Hr(e, d), h(d);
    }), e.on("readable", function() {
      if (a) {
        let d = a;
        a = null, d();
      }
    }), e.on("end", function() {
      c.push(null);
    }), c._read = function() {
      for (;; ) {
        let d = e.read();
        if (d === null) {
          a = c._read;
          return;
        }
        if (!c.push(d))
          return;
      }
    }), c._destroy = function(d, g) {
      !d && l !== null && (d = new vh), a = null, o = null, s = null, l === null ? g(d) : (l = g, Hr(r, d), Hr(e, d));
    }, c;
  }
});
var nt = M((PR, Th) => {
  _();
  v();
  m();
  var { ObjectDefineProperties: r0, ObjectGetOwnPropertyDescriptor: It, ObjectKeys: i0, ObjectSetPrototypeOf: Ah } = ce();
  Th.exports = Ve;
  var bo = gi(), Ne = ho();
  Ah(Ve.prototype, bo.prototype);
  Ah(Ve, bo);
  {
    let t = i0(Ne.prototype);
    for (let e = 0;e < t.length; e++) {
      let r = t[e];
      Ve.prototype[r] || (Ve.prototype[r] = Ne.prototype[r]);
    }
  }
  function Ve(t) {
    if (!(this instanceof Ve))
      return new Ve(t);
    bo.call(this, t), Ne.call(this, t), t ? (this.allowHalfOpen = t.allowHalfOpen !== false, t.readable === false && (this._readableState.readable = false, this._readableState.ended = true, this._readableState.endEmitted = true), t.writable === false && (this._writableState.writable = false, this._writableState.ending = true, this._writableState.ended = true, this._writableState.finished = true)) : this.allowHalfOpen = true;
  }
  r0(Ve.prototype, { writable: { __proto__: null, ...It(Ne.prototype, "writable") }, writableHighWaterMark: { __proto__: null, ...It(Ne.prototype, "writableHighWaterMark") }, writableObjectMode: { __proto__: null, ...It(Ne.prototype, "writableObjectMode") }, writableBuffer: { __proto__: null, ...It(Ne.prototype, "writableBuffer") }, writableLength: { __proto__: null, ...It(Ne.prototype, "writableLength") }, writableFinished: { __proto__: null, ...It(Ne.prototype, "writableFinished") }, writableCorked: { __proto__: null, ...It(Ne.prototype, "writableCorked") }, writableEnded: { __proto__: null, ...It(Ne.prototype, "writableEnded") }, writableNeedDrain: { __proto__: null, ...It(Ne.prototype, "writableNeedDrain") }, destroyed: { __proto__: null, get() {
    return this._readableState === undefined || this._writableState === undefined ? false : this._readableState.destroyed && this._writableState.destroyed;
  }, set(t) {
    this._readableState && this._writableState && (this._readableState.destroyed = t, this._writableState.destroyed = t);
  } } });
  var go;
  function Ih() {
    return go === undefined && (go = {}), go;
  }
  Ve.fromWeb = function(t, e) {
    return Ih().newStreamDuplexFromReadableWritablePair(t, e);
  };
  Ve.toWeb = function(t) {
    return Ih().newReadableWritablePairFromDuplex(t);
  };
  var yo;
  Ve.from = function(t) {
    return yo || (yo = Sh()), yo(t, "body");
  };
});
var mo = M((jR, Ch) => {
  _();
  v();
  m();
  var { ObjectSetPrototypeOf: Rh, Symbol: n0 } = ce();
  Ch.exports = Tt;
  var { ERR_METHOD_NOT_IMPLEMENTED: s0 } = Ae().codes, _o = nt(), { getHighWaterMark: o0 } = an();
  Rh(Tt.prototype, _o.prototype);
  Rh(Tt, _o);
  var _i = n0("kCallback");
  function Tt(t) {
    if (!(this instanceof Tt))
      return new Tt(t);
    let e = t ? o0(this, t, "readableHighWaterMark", true) : null;
    e === 0 && (t = { ...t, highWaterMark: null, readableHighWaterMark: e, writableHighWaterMark: t.writableHighWaterMark || 0 }), _o.call(this, t), this._readableState.sync = false, this[_i] = null, t && (typeof t.transform == "function" && (this._transform = t.transform), typeof t.flush == "function" && (this._flush = t.flush)), this.on("prefinish", a0);
  }
  function wo(t) {
    typeof this._flush == "function" && !this.destroyed ? this._flush((e, r) => {
      if (e) {
        t ? t(e) : this.destroy(e);
        return;
      }
      r != null && this.push(r), this.push(null), t && t();
    }) : (this.push(null), t && t());
  }
  function a0() {
    this._final !== wo && wo.call(this);
  }
  Tt.prototype._final = wo;
  Tt.prototype._transform = function(t, e, r) {
    throw new s0("_transform()");
  };
  Tt.prototype._write = function(t, e, r) {
    let i = this._readableState, n = this._writableState, o = i.length;
    this._transform(t, e, (s, a) => {
      if (s) {
        r(s);
        return;
      }
      a != null && this.push(a), n.ended || o === i.length || i.length < i.highWaterMark ? r() : this[_i] = r;
    });
  };
  Tt.prototype._read = function() {
    if (this[_i]) {
      let t = this[_i];
      this[_i] = null, t();
    }
  };
});
var Eo = M((YR, Ph) => {
  _();
  v();
  m();
  var { ObjectSetPrototypeOf: Bh } = ce();
  Ph.exports = Vr;
  var vo = mo();
  Bh(Vr.prototype, vo.prototype);
  Bh(Vr, vo);
  function Vr(t) {
    if (!(this instanceof Vr))
      return new Vr(t);
    vo.call(this, t);
  }
  Vr.prototype._transform = function(t, e, r) {
    r(null, t);
  };
});
var En = M((oC, Lh) => {
  _();
  v();
  m();
  var mi = Nt(), { ArrayIsArray: l0, Promise: u0, SymbolAsyncIterator: f0 } = ce(), vn = vt(), { once: c0 } = Je(), h0 = ir(), kh = nt(), { aggregateTwoErrors: d0, codes: { ERR_INVALID_ARG_TYPE: Po, ERR_INVALID_RETURN_VALUE: So, ERR_MISSING_ARGS: p0, ERR_STREAM_DESTROYED: g0, ERR_STREAM_PREMATURE_CLOSE: y0 }, AbortError: b0 } = Ae(), { validateFunction: w0, validateAbortSignal: _0 } = hi(), { isIterable: dr, isReadable: Ao, isReadableNodeStream: mn, isNodeStream: Oh, isTransformStream: zr, isWebStream: m0, isReadableStream: Io, isReadableEnded: v0 } = tt(), E0 = globalThis.AbortController || zi().AbortController, To, Ro;
  function xh(t, e, r) {
    let i = false;
    t.on("close", () => {
      i = true;
    });
    let n = vn(t, { readable: e, writable: r }, (o) => {
      i = !o;
    });
    return { destroy: (o) => {
      i || (i = true, h0.destroyer(t, o || new g0("pipe")));
    }, cleanup: n };
  }
  function S0(t) {
    return w0(t[t.length - 1], "streams[stream.length - 1]"), t.pop();
  }
  function Co(t) {
    if (dr(t))
      return t;
    if (mn(t))
      return A0(t);
    throw new Po("val", ["Readable", "Iterable", "AsyncIterable"], t);
  }
  async function* A0(t) {
    Ro || (Ro = gi()), yield* Ro.prototype[f0].call(t);
  }
  async function _n(t, e, r, { end: i }) {
    let n, o = null, s = (c) => {
      if (c && (n = c), o) {
        let h = o;
        o = null, h();
      }
    }, a = () => new u0((c, h) => {
      n ? h(n) : o = () => {
        n ? h(n) : c();
      };
    });
    e.on("drain", s);
    let l = vn(e, { readable: false }, s);
    try {
      e.writableNeedDrain && await a();
      for await (let c of t)
        e.write(c) || await a();
      i && e.end(), await a(), r();
    } catch (c) {
      r(n !== c ? d0(n, c) : c);
    } finally {
      l(), e.off("drain", s);
    }
  }
  async function Bo(t, e, r, { end: i }) {
    zr(e) && (e = e.writable);
    let n = e.getWriter();
    try {
      for await (let o of t)
        await n.ready, n.write(o).catch(() => {
        });
      await n.ready, i && await n.close(), r();
    } catch (o) {
      try {
        await n.abort(o), r(o);
      } catch (s) {
        r(s);
      }
    }
  }
  function I0(...t) {
    return Mh(t, c0(S0(t)));
  }
  function Mh(t, e, r) {
    if (t.length === 1 && l0(t[0]) && (t = t[0]), t.length < 2)
      throw new p0("streams");
    let i = new E0, n = i.signal, o = r?.signal, s = [];
    _0(o, "options.signal");
    function a() {
      y(new b0);
    }
    o?.addEventListener("abort", a);
    let l, c, h = [], d = 0;
    function g(C) {
      y(C, --d === 0);
    }
    function y(C, R) {
      if (C && (!l || l.code === "ERR_STREAM_PREMATURE_CLOSE") && (l = C), !(!l && !R)) {
        for (;h.length; )
          h.shift()(l);
        o?.removeEventListener("abort", a), i.abort(), R && (l || s.forEach((U) => U()), mi.nextTick(e, l, c));
      }
    }
    let w;
    for (let C = 0;C < t.length; C++) {
      let R = t[C], U = C < t.length - 1, N = C > 0, W = U || r?.end !== false, K = C === t.length - 1;
      if (Oh(R)) {
        let z = function(Q) {
          Q && Q.name !== "AbortError" && Q.code !== "ERR_STREAM_PREMATURE_CLOSE" && g(Q);
        };
        var I = z;
        if (W) {
          let { destroy: Q, cleanup: pe } = xh(R, U, N);
          h.push(Q), Ao(R) && K && s.push(pe);
        }
        R.on("error", z), Ao(R) && K && s.push(() => {
          R.removeListener("error", z);
        });
      }
      if (C === 0)
        if (typeof R == "function") {
          if (w = R({ signal: n }), !dr(w))
            throw new So("Iterable, AsyncIterable or Stream", "source", w);
        } else
          dr(R) || mn(R) || zr(R) ? w = R : w = kh.from(R);
      else if (typeof R == "function") {
        if (zr(w)) {
          var S;
          w = Co((S = w) === null || S === undefined ? undefined : S.readable);
        } else
          w = Co(w);
        if (w = R(w, { signal: n }), U) {
          if (!dr(w, true))
            throw new So("AsyncIterable", `transform[${C - 1}]`, w);
        } else {
          var E;
          To || (To = Eo());
          let z = new To({ objectMode: true }), Q = (E = w) === null || E === undefined ? undefined : E.then;
          if (typeof Q == "function")
            d++, Q.call(w, (ge) => {
              c = ge, ge != null && z.write(ge), W && z.end(), mi.nextTick(g);
            }, (ge) => {
              z.destroy(ge), mi.nextTick(g, ge);
            });
          else if (dr(w, true))
            d++, _n(w, z, g, { end: W });
          else if (Io(w) || zr(w)) {
            let ge = w.readable || w;
            d++, _n(ge, z, g, { end: W });
          } else
            throw new So("AsyncIterable or Promise", "destination", w);
          w = z;
          let { destroy: pe, cleanup: Yt } = xh(w, false, true);
          h.push(pe), K && s.push(Yt);
        }
      } else if (Oh(R)) {
        if (mn(w)) {
          d += 2;
          let z = T0(w, R, g, { end: W });
          Ao(R) && K && s.push(z);
        } else if (zr(w) || Io(w)) {
          let z = w.readable || w;
          d++, _n(z, R, g, { end: W });
        } else if (dr(w))
          d++, _n(w, R, g, { end: W });
        else
          throw new Po("val", ["Readable", "Iterable", "AsyncIterable", "ReadableStream", "TransformStream"], w);
        w = R;
      } else if (m0(R)) {
        if (mn(w))
          d++, Bo(Co(w), R, g, { end: W });
        else if (Io(w) || dr(w))
          d++, Bo(w, R, g, { end: W });
        else if (zr(w))
          d++, Bo(w.readable, R, g, { end: W });
        else
          throw new Po("val", ["Readable", "Iterable", "AsyncIterable", "ReadableStream", "TransformStream"], w);
        w = R;
      } else
        w = kh.from(R);
    }
    return (n != null && n.aborted || o != null && o.aborted) && mi.nextTick(a), w;
  }
  function T0(t, e, r, { end: i }) {
    let n = false;
    if (e.on("close", () => {
      n || r(new y0);
    }), t.pipe(e, { end: false }), i) {
      let s = function() {
        n = true, e.end();
      };
      var o = s;
      v0(t) ? mi.nextTick(s) : t.once("end", s);
    } else
      r();
    return vn(t, { readable: true, writable: false }, (s) => {
      let a = t._readableState;
      s && s.code === "ERR_STREAM_PREMATURE_CLOSE" && a && a.ended && !a.errored && !a.errorEmitted ? t.once("end", r).once("error", r) : r(s);
    }), vn(e, { readable: false, writable: true }, r);
  }
  Lh.exports = { pipelineImpl: Mh, pipeline: I0 };
});
var Oo = M((yC, Fh) => {
  _();
  v();
  m();
  var { pipeline: R0 } = En(), Sn = nt(), { destroyer: C0 } = ir(), { isNodeStream: An, isReadable: Uh, isWritable: Nh, isWebStream: ko, isTransformStream: pr, isWritableStream: qh, isReadableStream: Dh } = tt(), { AbortError: B0, codes: { ERR_INVALID_ARG_VALUE: jh, ERR_MISSING_ARGS: P0 } } = Ae(), k0 = vt();
  Fh.exports = function(...e) {
    if (e.length === 0)
      throw new P0("streams");
    if (e.length === 1)
      return Sn.from(e[0]);
    let r = [...e];
    if (typeof e[0] == "function" && (e[0] = Sn.from(e[0])), typeof e[e.length - 1] == "function") {
      let y = e.length - 1;
      e[y] = Sn.from(e[y]);
    }
    for (let y = 0;y < e.length; ++y)
      if (!(!An(e[y]) && !ko(e[y]))) {
        if (y < e.length - 1 && !(Uh(e[y]) || Dh(e[y]) || pr(e[y])))
          throw new jh(`streams[${y}]`, r[y], "must be readable");
        if (y > 0 && !(Nh(e[y]) || qh(e[y]) || pr(e[y])))
          throw new jh(`streams[${y}]`, r[y], "must be writable");
      }
    let i, n, o, s, a;
    function l(y) {
      let w = s;
      s = null, w ? w(y) : y ? a.destroy(y) : !g && !d && a.destroy();
    }
    let c = e[0], h = R0(e, l), d = !!(Nh(c) || qh(c) || pr(c)), g = !!(Uh(h) || Dh(h) || pr(h));
    if (a = new Sn({ writableObjectMode: !!(c != null && c.writableObjectMode), readableObjectMode: !!(h != null && h.writableObjectMode), writable: d, readable: g }), d) {
      if (An(c))
        a._write = function(w, S, E) {
          c.write(w, S) ? E() : i = E;
        }, a._final = function(w) {
          c.end(), n = w;
        }, c.on("drain", function() {
          if (i) {
            let w = i;
            i = null, w();
          }
        });
      else if (ko(c)) {
        let S = (pr(c) ? c.writable : c).getWriter();
        a._write = async function(E, I, C) {
          try {
            await S.ready, S.write(E).catch(() => {
            }), C();
          } catch (R) {
            C(R);
          }
        }, a._final = async function(E) {
          try {
            await S.ready, S.close().catch(() => {
            }), n = E;
          } catch (I) {
            E(I);
          }
        };
      }
      let y = pr(h) ? h.readable : h;
      k0(y, () => {
        if (n) {
          let w = n;
          n = null, w();
        }
      });
    }
    if (g) {
      if (An(h))
        h.on("readable", function() {
          if (o) {
            let y = o;
            o = null, y();
          }
        }), h.on("end", function() {
          a.push(null);
        }), a._read = function() {
          for (;; ) {
            let y = h.read();
            if (y === null) {
              o = a._read;
              return;
            }
            if (!a.push(y))
              return;
          }
        };
      else if (ko(h)) {
        let w = (pr(h) ? h.readable : h).getReader();
        a._read = async function() {
          for (;; )
            try {
              let { value: S, done: E } = await w.read();
              if (!a.push(S))
                return;
              if (E) {
                a.push(null);
                return;
              }
            } catch {
              return;
            }
        };
      }
    }
    return a._destroy = function(y, w) {
      !y && s !== null && (y = new B0), o = null, i = null, n = null, s === null ? w(y) : (s = w, An(h) && C0(h, y));
    }, a;
  };
});
var Qh = M((TC, Lo) => {
  _();
  v();
  m();
  var Vh = globalThis.AbortController || zi().AbortController, { codes: { ERR_INVALID_ARG_VALUE: O0, ERR_INVALID_ARG_TYPE: vi, ERR_MISSING_ARGS: x0, ERR_OUT_OF_RANGE: M0 }, AbortError: st } = Ae(), { validateAbortSignal: gr, validateInteger: L0, validateObject: yr } = hi(), U0 = ce().Symbol("kWeak"), { finished: N0 } = vt(), q0 = Oo(), { addAbortSignalNoValidate: D0 } = di(), { isWritable: j0, isNodeStream: F0 } = tt(), { ArrayPrototypePush: W0, MathFloor: $0, Number: H0, NumberIsNaN: V0, Promise: Wh, PromiseReject: $h, PromisePrototypeThen: z0, Symbol: zh } = ce(), In = zh("kEmpty"), Hh = zh("kEof");
  function K0(t, e) {
    if (e != null && yr(e, "options"), e?.signal != null && gr(e.signal, "options.signal"), F0(t) && !j0(t))
      throw new O0("stream", t, "must be writable");
    let r = q0(this, t);
    return e != null && e.signal && D0(e.signal, r), r;
  }
  function Tn(t, e) {
    if (typeof t != "function")
      throw new vi("fn", ["Function", "AsyncFunction"], t);
    e != null && yr(e, "options"), e?.signal != null && gr(e.signal, "options.signal");
    let r = 1;
    return e?.concurrency != null && (r = $0(e.concurrency)), L0(r, "concurrency", 1), async function* () {
      var n, o;
      let s = new Vh, a = this, l = [], c = s.signal, h = { signal: c }, d = () => s.abort();
      e != null && (n = e.signal) !== null && n !== undefined && n.aborted && d(), e == null || (o = e.signal) === null || o === undefined || o.addEventListener("abort", d);
      let g, y, w = false;
      function S() {
        w = true;
      }
      async function E() {
        try {
          for await (let R of a) {
            var I;
            if (w)
              return;
            if (c.aborted)
              throw new st;
            try {
              R = t(R, h);
            } catch (U) {
              R = $h(U);
            }
            R !== In && (typeof ((I = R) === null || I === undefined ? undefined : I.catch) == "function" && R.catch(S), l.push(R), g && (g(), g = null), !w && l.length && l.length >= r && await new Wh((U) => {
              y = U;
            }));
          }
          l.push(Hh);
        } catch (R) {
          let U = $h(R);
          z0(U, undefined, S), l.push(U);
        } finally {
          var C;
          w = true, g && (g(), g = null), e == null || (C = e.signal) === null || C === undefined || C.removeEventListener("abort", d);
        }
      }
      E();
      try {
        for (;; ) {
          for (;l.length > 0; ) {
            let I = await l[0];
            if (I === Hh)
              return;
            if (c.aborted)
              throw new st;
            I !== In && (yield I), l.shift(), y && (y(), y = null);
          }
          await new Wh((I) => {
            g = I;
          });
        }
      } finally {
        s.abort(), w = true, y && (y(), y = null);
      }
    }.call(this);
  }
  function G0(t = undefined) {
    return t != null && yr(t, "options"), t?.signal != null && gr(t.signal, "options.signal"), async function* () {
      let r = 0;
      for await (let n of this) {
        var i;
        if (t != null && (i = t.signal) !== null && i !== undefined && i.aborted)
          throw new st({ cause: t.signal.reason });
        yield [r++, n];
      }
    }.call(this);
  }
  async function Kh(t, e = undefined) {
    for await (let r of Mo.call(this, t, e))
      return true;
    return false;
  }
  async function Q0(t, e = undefined) {
    if (typeof t != "function")
      throw new vi("fn", ["Function", "AsyncFunction"], t);
    return !await Kh.call(this, async (...r) => !await t(...r), e);
  }
  async function Y0(t, e) {
    for await (let r of Mo.call(this, t, e))
      return r;
  }
  async function J0(t, e) {
    if (typeof t != "function")
      throw new vi("fn", ["Function", "AsyncFunction"], t);
    async function r(i, n) {
      return await t(i, n), In;
    }
    for await (let i of Tn.call(this, r, e))
      ;
  }
  function Mo(t, e) {
    if (typeof t != "function")
      throw new vi("fn", ["Function", "AsyncFunction"], t);
    async function r(i, n) {
      return await t(i, n) ? i : In;
    }
    return Tn.call(this, r, e);
  }
  var xo = class extends x0 {
    constructor() {
      super("reduce"), this.message = "Reduce of an empty stream requires an initial value";
    }
  };
  async function X0(t, e, r) {
    var i;
    if (typeof t != "function")
      throw new vi("reducer", ["Function", "AsyncFunction"], t);
    r != null && yr(r, "options"), r?.signal != null && gr(r.signal, "options.signal");
    let n = arguments.length > 1;
    if (r != null && (i = r.signal) !== null && i !== undefined && i.aborted) {
      let c = new st(undefined, { cause: r.signal.reason });
      throw this.once("error", () => {
      }), await N0(this.destroy(c)), c;
    }
    let o = new Vh, s = o.signal;
    if (r != null && r.signal) {
      let c = { once: true, [U0]: this };
      r.signal.addEventListener("abort", () => o.abort(), c);
    }
    let a = false;
    try {
      for await (let c of this) {
        var l;
        if (a = true, r != null && (l = r.signal) !== null && l !== undefined && l.aborted)
          throw new st;
        n ? e = await t(e, c, { signal: s }) : (e = c, n = true);
      }
      if (!a && !n)
        throw new xo;
    } finally {
      o.abort();
    }
    return e;
  }
  async function Z0(t) {
    t != null && yr(t, "options"), t?.signal != null && gr(t.signal, "options.signal");
    let e = [];
    for await (let i of this) {
      var r;
      if (t != null && (r = t.signal) !== null && r !== undefined && r.aborted)
        throw new st(undefined, { cause: t.signal.reason });
      W0(e, i);
    }
    return e;
  }
  function em(t, e) {
    let r = Tn.call(this, t, e);
    return async function* () {
      for await (let n of r)
        yield* n;
    }.call(this);
  }
  function Gh(t) {
    if (t = H0(t), V0(t))
      return 0;
    if (t < 0)
      throw new M0("number", ">= 0", t);
    return t;
  }
  function tm(t, e = undefined) {
    return e != null && yr(e, "options"), e?.signal != null && gr(e.signal, "options.signal"), t = Gh(t), async function* () {
      var i;
      if (e != null && (i = e.signal) !== null && i !== undefined && i.aborted)
        throw new st;
      for await (let o of this) {
        var n;
        if (e != null && (n = e.signal) !== null && n !== undefined && n.aborted)
          throw new st;
        t-- <= 0 && (yield o);
      }
    }.call(this);
  }
  function rm(t, e = undefined) {
    return e != null && yr(e, "options"), e?.signal != null && gr(e.signal, "options.signal"), t = Gh(t), async function* () {
      var i;
      if (e != null && (i = e.signal) !== null && i !== undefined && i.aborted)
        throw new st;
      for await (let o of this) {
        var n;
        if (e != null && (n = e.signal) !== null && n !== undefined && n.aborted)
          throw new st;
        if (t-- > 0)
          yield o;
        else
          return;
      }
    }.call(this);
  }
  Lo.exports.streamReturningOperators = { asIndexedPairs: G0, drop: tm, filter: Mo, flatMap: em, map: Tn, take: rm, compose: K0 };
  Lo.exports.promiseReturningOperators = { every: Q0, forEach: J0, reduce: X0, toArray: Z0, some: Kh, find: Y0 };
});
var Uo = M((UC, Yh) => {
  _();
  v();
  m();
  var { ArrayPrototypePop: im, Promise: nm } = ce(), { isIterable: sm, isNodeStream: om, isWebStream: am } = tt(), { pipelineImpl: lm } = En(), { finished: um } = vt();
  No();
  function fm(...t) {
    return new nm((e, r) => {
      let i, n, o = t[t.length - 1];
      if (o && typeof o == "object" && !om(o) && !sm(o) && !am(o)) {
        let s = im(t);
        i = s.signal, n = s.end;
      }
      lm(t, (s, a) => {
        s ? r(s) : e(a);
      }, { signal: i, end: n });
    });
  }
  Yh.exports = { finished: um, pipeline: fm };
});
var No = M((zC, sd) => {
  _();
  v();
  m();
  var { Buffer: cm } = (be(), X(me)), { ObjectDefineProperty: Rt, ObjectKeys: Zh, ReflectApply: ed } = ce(), { promisify: { custom: td } } = Je(), { streamReturningOperators: Jh, promiseReturningOperators: Xh } = Qh(), { codes: { ERR_ILLEGAL_CONSTRUCTOR: rd } } = Ae(), hm = Oo(), { pipeline: id } = En(), { destroyer: dm } = ir(), nd = vt(), qo = Uo(), Do = tt(), le = sd.exports = nn().Stream;
  le.isDisturbed = Do.isDisturbed;
  le.isErrored = Do.isErrored;
  le.isReadable = Do.isReadable;
  le.Readable = gi();
  for (let t of Zh(Jh)) {
    let r = function(...i) {
      if (new.target)
        throw rd();
      return le.Readable.from(ed(e, this, i));
    };
    jo = r;
    let e = Jh[t];
    Rt(r, "name", { __proto__: null, value: e.name }), Rt(r, "length", { __proto__: null, value: e.length }), Rt(le.Readable.prototype, t, { __proto__: null, value: r, enumerable: false, configurable: true, writable: true });
  }
  var jo;
  for (let t of Zh(Xh)) {
    let r = function(...n) {
      if (new.target)
        throw rd();
      return ed(e, this, n);
    };
    jo = r;
    let e = Xh[t];
    Rt(r, "name", { __proto__: null, value: e.name }), Rt(r, "length", { __proto__: null, value: e.length }), Rt(le.Readable.prototype, t, { __proto__: null, value: r, enumerable: false, configurable: true, writable: true });
  }
  var jo;
  le.Writable = ho();
  le.Duplex = nt();
  le.Transform = mo();
  le.PassThrough = Eo();
  le.pipeline = id;
  var { addAbortSignal: pm } = di();
  le.addAbortSignal = pm;
  le.finished = nd;
  le.destroy = dm;
  le.compose = hm;
  Rt(le, "promises", { __proto__: null, configurable: true, enumerable: true, get() {
    return qo;
  } });
  Rt(id, td, { __proto__: null, enumerable: true, get() {
    return qo.pipeline;
  } });
  Rt(nd, td, { __proto__: null, enumerable: true, get() {
    return qo.finished;
  } });
  le.Stream = le;
  le._isUint8Array = function(e) {
    return e instanceof Uint8Array;
  };
  le._uint8ArrayToBuffer = function(e) {
    return cm.from(e.buffer, e.byteOffset, e.byteLength);
  };
});
var jt = M((rB, ue) => {
  _();
  v();
  m();
  var he = No(), gm = Uo(), ym = he.Readable.destroy;
  ue.exports = he.Readable;
  ue.exports._uint8ArrayToBuffer = he._uint8ArrayToBuffer;
  ue.exports._isUint8Array = he._isUint8Array;
  ue.exports.isDisturbed = he.isDisturbed;
  ue.exports.isErrored = he.isErrored;
  ue.exports.isReadable = he.isReadable;
  ue.exports.Readable = he.Readable;
  ue.exports.Writable = he.Writable;
  ue.exports.Duplex = he.Duplex;
  ue.exports.Transform = he.Transform;
  ue.exports.PassThrough = he.PassThrough;
  ue.exports.addAbortSignal = he.addAbortSignal;
  ue.exports.finished = he.finished;
  ue.exports.destroy = he.destroy;
  ue.exports.destroy = ym;
  ue.exports.pipeline = he.pipeline;
  ue.exports.compose = he.compose;
  Object.defineProperty(he, "promises", { configurable: true, enumerable: true, get() {
    return gm;
  } });
  ue.exports.Stream = he.Stream;
  ue.exports.default = ue.exports;
});
var od = M((hB, Fo) => {
  _();
  v();
  m();
  typeof Object.create == "function" ? Fo.exports = function(e, r) {
    r && (e.super_ = r, e.prototype = Object.create(r.prototype, { constructor: { value: e, enumerable: false, writable: true, configurable: true } }));
  } : Fo.exports = function(e, r) {
    if (r) {
      e.super_ = r;
      var i = function() {
      };
      i.prototype = r.prototype, e.prototype = new i, e.prototype.constructor = e;
    }
  };
});
var ud = M((EB, ld) => {
  _();
  v();
  m();
  var { Buffer: ze } = (be(), X(me)), ad = Symbol.for("BufferList");
  function ee(t) {
    if (!(this instanceof ee))
      return new ee(t);
    ee._init.call(this, t);
  }
  ee._init = function(e) {
    Object.defineProperty(this, ad, { value: true }), this._bufs = [], this.length = 0, e && this.append(e);
  };
  ee.prototype._new = function(e) {
    return new ee(e);
  };
  ee.prototype._offset = function(e) {
    if (e === 0)
      return [0, 0];
    let r = 0;
    for (let i = 0;i < this._bufs.length; i++) {
      let n = r + this._bufs[i].length;
      if (e < n || i === this._bufs.length - 1)
        return [i, e - r];
      r = n;
    }
  };
  ee.prototype._reverseOffset = function(t) {
    let e = t[0], r = t[1];
    for (let i = 0;i < e; i++)
      r += this._bufs[i].length;
    return r;
  };
  ee.prototype.get = function(e) {
    if (e > this.length || e < 0)
      return;
    let r = this._offset(e);
    return this._bufs[r[0]][r[1]];
  };
  ee.prototype.slice = function(e, r) {
    return typeof e == "number" && e < 0 && (e += this.length), typeof r == "number" && r < 0 && (r += this.length), this.copy(null, 0, e, r);
  };
  ee.prototype.copy = function(e, r, i, n) {
    if ((typeof i != "number" || i < 0) && (i = 0), (typeof n != "number" || n > this.length) && (n = this.length), i >= this.length || n <= 0)
      return e || ze.alloc(0);
    let o = !!e, s = this._offset(i), a = n - i, l = a, c = o && r || 0, h = s[1];
    if (i === 0 && n === this.length) {
      if (!o)
        return this._bufs.length === 1 ? this._bufs[0] : ze.concat(this._bufs, this.length);
      for (let d = 0;d < this._bufs.length; d++)
        this._bufs[d].copy(e, c), c += this._bufs[d].length;
      return e;
    }
    if (l <= this._bufs[s[0]].length - h)
      return o ? this._bufs[s[0]].copy(e, r, h, h + l) : this._bufs[s[0]].slice(h, h + l);
    o || (e = ze.allocUnsafe(a));
    for (let d = s[0];d < this._bufs.length; d++) {
      let g = this._bufs[d].length - h;
      if (l > g)
        this._bufs[d].copy(e, c, h), c += g;
      else {
        this._bufs[d].copy(e, c, h, h + l), c += g;
        break;
      }
      l -= g, h && (h = 0);
    }
    return e.length > c ? e.slice(0, c) : e;
  };
  ee.prototype.shallowSlice = function(e, r) {
    if (e = e || 0, r = typeof r != "number" ? this.length : r, e < 0 && (e += this.length), r < 0 && (r += this.length), e === r)
      return this._new();
    let i = this._offset(e), n = this._offset(r), o = this._bufs.slice(i[0], n[0] + 1);
    return n[1] === 0 ? o.pop() : o[o.length - 1] = o[o.length - 1].slice(0, n[1]), i[1] !== 0 && (o[0] = o[0].slice(i[1])), this._new(o);
  };
  ee.prototype.toString = function(e, r, i) {
    return this.slice(r, i).toString(e);
  };
  ee.prototype.consume = function(e) {
    if (e = Math.trunc(e), Number.isNaN(e) || e <= 0)
      return this;
    for (;this._bufs.length; )
      if (e >= this._bufs[0].length)
        e -= this._bufs[0].length, this.length -= this._bufs[0].length, this._bufs.shift();
      else {
        this._bufs[0] = this._bufs[0].slice(e), this.length -= e;
        break;
      }
    return this;
  };
  ee.prototype.duplicate = function() {
    let e = this._new();
    for (let r = 0;r < this._bufs.length; r++)
      e.append(this._bufs[r]);
    return e;
  };
  ee.prototype.append = function(e) {
    if (e == null)
      return this;
    if (e.buffer)
      this._appendBuffer(ze.from(e.buffer, e.byteOffset, e.byteLength));
    else if (Array.isArray(e))
      for (let r = 0;r < e.length; r++)
        this.append(e[r]);
    else if (this._isBufferList(e))
      for (let r = 0;r < e._bufs.length; r++)
        this.append(e._bufs[r]);
    else
      typeof e == "number" && (e = e.toString()), this._appendBuffer(ze.from(e));
    return this;
  };
  ee.prototype._appendBuffer = function(e) {
    this._bufs.push(e), this.length += e.length;
  };
  ee.prototype.indexOf = function(t, e, r) {
    if (r === undefined && typeof e == "string" && (r = e, e = undefined), typeof t == "function" || Array.isArray(t))
      throw new TypeError('The "value" argument must be one of type string, Buffer, BufferList, or Uint8Array.');
    if (typeof t == "number" ? t = ze.from([t]) : typeof t == "string" ? t = ze.from(t, r) : this._isBufferList(t) ? t = t.slice() : Array.isArray(t.buffer) ? t = ze.from(t.buffer, t.byteOffset, t.byteLength) : ze.isBuffer(t) || (t = ze.from(t)), e = Number(e || 0), isNaN(e) && (e = 0), e < 0 && (e = this.length + e), e < 0 && (e = 0), t.length === 0)
      return e > this.length ? this.length : e;
    let i = this._offset(e), n = i[0], o = i[1];
    for (;n < this._bufs.length; n++) {
      let s = this._bufs[n];
      for (;o < s.length; )
        if (s.length - o >= t.length) {
          let l = s.indexOf(t, o);
          if (l !== -1)
            return this._reverseOffset([n, l]);
          o = s.length - t.length + 1;
        } else {
          let l = this._reverseOffset([n, o]);
          if (this._match(l, t))
            return l;
          o++;
        }
      o = 0;
    }
    return -1;
  };
  ee.prototype._match = function(t, e) {
    if (this.length - t < e.length)
      return false;
    for (let r = 0;r < e.length; r++)
      if (this.get(t + r) !== e[r])
        return false;
    return true;
  };
  (function() {
    let t = { readDoubleBE: 8, readDoubleLE: 8, readFloatBE: 4, readFloatLE: 4, readBigInt64BE: 8, readBigInt64LE: 8, readBigUInt64BE: 8, readBigUInt64LE: 8, readInt32BE: 4, readInt32LE: 4, readUInt32BE: 4, readUInt32LE: 4, readInt16BE: 2, readInt16LE: 2, readUInt16BE: 2, readUInt16LE: 2, readInt8: 1, readUInt8: 1, readIntBE: null, readIntLE: null, readUIntBE: null, readUIntLE: null };
    for (let e in t)
      (function(r) {
        t[r] === null ? ee.prototype[r] = function(i, n) {
          return this.slice(i, i + n)[r](0, n);
        } : ee.prototype[r] = function(i = 0) {
          return this.slice(i, i + t[r])[r](0);
        };
      })(e);
  })();
  ee.prototype._isBufferList = function(e) {
    return e instanceof ee || ee.isBufferList(e);
  };
  ee.isBufferList = function(e) {
    return e != null && e[ad];
  };
  ld.exports = ee;
});
var fd = M((OB, Rn) => {
  _();
  v();
  m();
  var Wo = jt().Duplex, bm = od(), Ei = ud();
  function Se(t) {
    if (!(this instanceof Se))
      return new Se(t);
    if (typeof t == "function") {
      this._callback = t;
      let e = function(i) {
        this._callback && (this._callback(i), this._callback = null);
      }.bind(this);
      this.on("pipe", function(i) {
        i.on("error", e);
      }), this.on("unpipe", function(i) {
        i.removeListener("error", e);
      }), t = null;
    }
    Ei._init.call(this, t), Wo.call(this);
  }
  bm(Se, Wo);
  Object.assign(Se.prototype, Ei.prototype);
  Se.prototype._new = function(e) {
    return new Se(e);
  };
  Se.prototype._write = function(e, r, i) {
    this._appendBuffer(e), typeof i == "function" && i();
  };
  Se.prototype._read = function(e) {
    if (!this.length)
      return this.push(null);
    e = Math.min(e, this.length), this.push(this.slice(0, e)), this.consume(e);
  };
  Se.prototype.end = function(e) {
    Wo.prototype.end.call(this, e), this._callback && (this._callback(null, this.slice()), this._callback = null);
  };
  Se.prototype._destroy = function(e, r) {
    this._bufs.length = 0, this.length = 0, r(e);
  };
  Se.prototype._isBufferList = function(e) {
    return e instanceof Se || e instanceof Ei || Se.isBufferList(e);
  };
  Se.isBufferList = Ei.isBufferList;
  Rn.exports = Se;
  Rn.exports.BufferListStream = Se;
  Rn.exports.BufferList = Ei;
});
var hd = M((WB, cd) => {
  _();
  v();
  m();
  var $o = class {
    constructor() {
      this.cmd = null, this.retain = false, this.qos = 0, this.dup = false, this.length = -1, this.topic = null, this.payload = null;
    }
  };
  cd.exports = $o;
});
var Ho = M((XB, dd) => {
  _();
  v();
  m();
  var L = dd.exports, { Buffer: ke } = (be(), X(me));
  L.types = { 0: "reserved", 1: "connect", 2: "connack", 3: "publish", 4: "puback", 5: "pubrec", 6: "pubrel", 7: "pubcomp", 8: "subscribe", 9: "suback", 10: "unsubscribe", 11: "unsuback", 12: "pingreq", 13: "pingresp", 14: "disconnect", 15: "auth" };
  L.requiredHeaderFlags = { 1: 0, 2: 0, 4: 0, 5: 0, 6: 2, 7: 0, 8: 2, 9: 0, 10: 2, 11: 0, 12: 0, 13: 0, 14: 0, 15: 0 };
  L.requiredHeaderFlagsErrors = {};
  for (let t in L.requiredHeaderFlags) {
    let e = L.requiredHeaderFlags[t];
    L.requiredHeaderFlagsErrors[t] = "Invalid header flag bits, must be 0x" + e.toString(16) + " for " + L.types[t] + " packet";
  }
  L.codes = {};
  for (let t in L.types) {
    let e = L.types[t];
    L.codes[e] = t;
  }
  L.CMD_SHIFT = 4;
  L.CMD_MASK = 240;
  L.DUP_MASK = 8;
  L.QOS_MASK = 3;
  L.QOS_SHIFT = 1;
  L.RETAIN_MASK = 1;
  L.VARBYTEINT_MASK = 127;
  L.VARBYTEINT_FIN_MASK = 128;
  L.VARBYTEINT_MAX = 268435455;
  L.SESSIONPRESENT_MASK = 1;
  L.SESSIONPRESENT_HEADER = ke.from([L.SESSIONPRESENT_MASK]);
  L.CONNACK_HEADER = ke.from([L.codes.connack << L.CMD_SHIFT]);
  L.USERNAME_MASK = 128;
  L.PASSWORD_MASK = 64;
  L.WILL_RETAIN_MASK = 32;
  L.WILL_QOS_MASK = 24;
  L.WILL_QOS_SHIFT = 3;
  L.WILL_FLAG_MASK = 4;
  L.CLEAN_SESSION_MASK = 2;
  L.CONNECT_HEADER = ke.from([L.codes.connect << L.CMD_SHIFT]);
  L.properties = { sessionExpiryInterval: 17, willDelayInterval: 24, receiveMaximum: 33, maximumPacketSize: 39, topicAliasMaximum: 34, requestResponseInformation: 25, requestProblemInformation: 23, userProperties: 38, authenticationMethod: 21, authenticationData: 22, payloadFormatIndicator: 1, messageExpiryInterval: 2, contentType: 3, responseTopic: 8, correlationData: 9, maximumQoS: 36, retainAvailable: 37, assignedClientIdentifier: 18, reasonString: 31, wildcardSubscriptionAvailable: 40, subscriptionIdentifiersAvailable: 41, sharedSubscriptionAvailable: 42, serverKeepAlive: 19, responseInformation: 26, serverReference: 28, topicAlias: 35, subscriptionIdentifier: 11 };
  L.propertiesCodes = {};
  for (let t in L.properties) {
    let e = L.properties[t];
    L.propertiesCodes[e] = t;
  }
  L.propertiesTypes = { sessionExpiryInterval: "int32", willDelayInterval: "int32", receiveMaximum: "int16", maximumPacketSize: "int32", topicAliasMaximum: "int16", requestResponseInformation: "byte", requestProblemInformation: "byte", userProperties: "pair", authenticationMethod: "string", authenticationData: "binary", payloadFormatIndicator: "byte", messageExpiryInterval: "int32", contentType: "string", responseTopic: "string", correlationData: "binary", maximumQoS: "int8", retainAvailable: "byte", assignedClientIdentifier: "string", reasonString: "string", wildcardSubscriptionAvailable: "byte", subscriptionIdentifiersAvailable: "byte", sharedSubscriptionAvailable: "byte", serverKeepAlive: "int16", responseInformation: "string", serverReference: "string", topicAlias: "int16", subscriptionIdentifier: "var" };
  function Ft(t) {
    return [0, 1, 2].map((e) => [0, 1].map((r) => [0, 1].map((i) => {
      let n = ke.alloc(1);
      return n.writeUInt8(L.codes[t] << L.CMD_SHIFT | (r ? L.DUP_MASK : 0) | e << L.QOS_SHIFT | i, 0, true), n;
    })));
  }
  L.PUBLISH_HEADER = Ft("publish");
  L.SUBSCRIBE_HEADER = Ft("subscribe");
  L.SUBSCRIBE_OPTIONS_QOS_MASK = 3;
  L.SUBSCRIBE_OPTIONS_NL_MASK = 1;
  L.SUBSCRIBE_OPTIONS_NL_SHIFT = 2;
  L.SUBSCRIBE_OPTIONS_RAP_MASK = 1;
  L.SUBSCRIBE_OPTIONS_RAP_SHIFT = 3;
  L.SUBSCRIBE_OPTIONS_RH_MASK = 3;
  L.SUBSCRIBE_OPTIONS_RH_SHIFT = 4;
  L.SUBSCRIBE_OPTIONS_RH = [0, 16, 32];
  L.SUBSCRIBE_OPTIONS_NL = 4;
  L.SUBSCRIBE_OPTIONS_RAP = 8;
  L.SUBSCRIBE_OPTIONS_QOS = [0, 1, 2];
  L.UNSUBSCRIBE_HEADER = Ft("unsubscribe");
  L.ACKS = { unsuback: Ft("unsuback"), puback: Ft("puback"), pubcomp: Ft("pubcomp"), pubrel: Ft("pubrel"), pubrec: Ft("pubrec") };
  L.SUBACK_HEADER = ke.from([L.codes.suback << L.CMD_SHIFT]);
  L.VERSION3 = ke.from([3]);
  L.VERSION4 = ke.from([4]);
  L.VERSION5 = ke.from([5]);
  L.VERSION131 = ke.from([131]);
  L.VERSION132 = ke.from([132]);
  L.QOS = [0, 1, 2].map((t) => ke.from([t]));
  L.EMPTY = { pingreq: ke.from([L.codes.pingreq << 4, 0]), pingresp: ke.from([L.codes.pingresp << 4, 0]), disconnect: ke.from([L.codes.disconnect << 4, 0]) };
  L.MQTT5_PUBACK_PUBREC_CODES = { 0: "Success", 16: "No matching subscribers", 128: "Unspecified error", 131: "Implementation specific error", 135: "Not authorized", 144: "Topic Name invalid", 145: "Packet identifier in use", 151: "Quota exceeded", 153: "Payload format invalid" };
  L.MQTT5_PUBREL_PUBCOMP_CODES = { 0: "Success", 146: "Packet Identifier not found" };
  L.MQTT5_SUBACK_CODES = { 0: "Granted QoS 0", 1: "Granted QoS 1", 2: "Granted QoS 2", 128: "Unspecified error", 131: "Implementation specific error", 135: "Not authorized", 143: "Topic Filter invalid", 145: "Packet Identifier in use", 151: "Quota exceeded", 158: "Shared Subscriptions not supported", 161: "Subscription Identifiers not supported", 162: "Wildcard Subscriptions not supported" };
  L.MQTT5_UNSUBACK_CODES = { 0: "Success", 17: "No subscription existed", 128: "Unspecified error", 131: "Implementation specific error", 135: "Not authorized", 143: "Topic Filter invalid", 145: "Packet Identifier in use" };
  L.MQTT5_DISCONNECT_CODES = { 0: "Normal disconnection", 4: "Disconnect with Will Message", 128: "Unspecified error", 129: "Malformed Packet", 130: "Protocol Error", 131: "Implementation specific error", 135: "Not authorized", 137: "Server busy", 139: "Server shutting down", 141: "Keep Alive timeout", 142: "Session taken over", 143: "Topic Filter invalid", 144: "Topic Name invalid", 147: "Receive Maximum exceeded", 148: "Topic Alias invalid", 149: "Packet too large", 150: "Message rate too high", 151: "Quota exceeded", 152: "Administrative action", 153: "Payload format invalid", 154: "Retain not supported", 155: "QoS not supported", 156: "Use another server", 157: "Server moved", 158: "Shared Subscriptions not supported", 159: "Connection rate exceeded", 160: "Maximum connect time", 161: "Subscription Identifiers not supported", 162: "Wildcard Subscriptions not supported" };
  L.MQTT5_AUTH_CODES = { 0: "Success", 24: "Continue authentication", 25: "Re-authenticate" };
});
var gd = M((lP, pd) => {
  _();
  v();
  m();
  var Kr = 1000, Gr = Kr * 60, Qr = Gr * 60, br = Qr * 24, wm = br * 7, _m = br * 365.25;
  pd.exports = function(t, e) {
    e = e || {};
    var r = typeof t;
    if (r === "string" && t.length > 0)
      return mm(t);
    if (r === "number" && isFinite(t))
      return e.long ? Em(t) : vm(t);
    throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(t));
  };
  function mm(t) {
    if (t = String(t), !(t.length > 100)) {
      var e = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(t);
      if (e) {
        var r = parseFloat(e[1]), i = (e[2] || "ms").toLowerCase();
        switch (i) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return r * _m;
          case "weeks":
          case "week":
          case "w":
            return r * wm;
          case "days":
          case "day":
          case "d":
            return r * br;
          case "hours":
          case "hour":
          case "hrs":
          case "hr":
          case "h":
            return r * Qr;
          case "minutes":
          case "minute":
          case "mins":
          case "min":
          case "m":
            return r * Gr;
          case "seconds":
          case "second":
          case "secs":
          case "sec":
          case "s":
            return r * Kr;
          case "milliseconds":
          case "millisecond":
          case "msecs":
          case "msec":
          case "ms":
            return r;
          default:
            return;
        }
      }
    }
  }
  function vm(t) {
    var e = Math.abs(t);
    return e >= br ? Math.round(t / br) + "d" : e >= Qr ? Math.round(t / Qr) + "h" : e >= Gr ? Math.round(t / Gr) + "m" : e >= Kr ? Math.round(t / Kr) + "s" : t + "ms";
  }
  function Em(t) {
    var e = Math.abs(t);
    return e >= br ? Cn(t, e, br, "day") : e >= Qr ? Cn(t, e, Qr, "hour") : e >= Gr ? Cn(t, e, Gr, "minute") : e >= Kr ? Cn(t, e, Kr, "second") : t + " ms";
  }
  function Cn(t, e, r, i) {
    var n = e >= r * 1.5;
    return Math.round(t / r) + " " + i + (n ? "s" : "");
  }
});
var bd = M((wP, yd) => {
  _();
  v();
  m();
  function Sm(t) {
    r.debug = r, r.default = r, r.coerce = l, r.disable = o, r.enable = n, r.enabled = s, r.humanize = gd(), r.destroy = c, Object.keys(t).forEach((h) => {
      r[h] = t[h];
    }), r.names = [], r.skips = [], r.formatters = {};
    function e(h) {
      let d = 0;
      for (let g = 0;g < h.length; g++)
        d = (d << 5) - d + h.charCodeAt(g), d |= 0;
      return r.colors[Math.abs(d) % r.colors.length];
    }
    r.selectColor = e;
    function r(h) {
      let d, g = null, y, w;
      function S(...E) {
        if (!S.enabled)
          return;
        let I = S, C = Number(new Date), R = C - (d || C);
        I.diff = R, I.prev = d, I.curr = C, d = C, E[0] = r.coerce(E[0]), typeof E[0] != "string" && E.unshift("%O");
        let U = 0;
        E[0] = E[0].replace(/%([a-zA-Z%])/g, (W, K) => {
          if (W === "%%")
            return "%";
          U++;
          let z = r.formatters[K];
          if (typeof z == "function") {
            let Q = E[U];
            W = z.call(I, Q), E.splice(U, 1), U--;
          }
          return W;
        }), r.formatArgs.call(I, E), (I.log || r.log).apply(I, E);
      }
      return S.namespace = h, S.useColors = r.useColors(), S.color = r.selectColor(h), S.extend = i, S.destroy = r.destroy, Object.defineProperty(S, "enabled", { enumerable: true, configurable: false, get: () => g !== null ? g : (y !== r.namespaces && (y = r.namespaces, w = r.enabled(h)), w), set: (E) => {
        g = E;
      } }), typeof r.init == "function" && r.init(S), S;
    }
    function i(h, d) {
      let g = r(this.namespace + (typeof d > "u" ? ":" : d) + h);
      return g.log = this.log, g;
    }
    function n(h) {
      r.save(h), r.namespaces = h, r.names = [], r.skips = [];
      let d, g = (typeof h == "string" ? h : "").split(/[\s,]+/), y = g.length;
      for (d = 0;d < y; d++)
        g[d] && (h = g[d].replace(/\*/g, ".*?"), h[0] === "-" ? r.skips.push(new RegExp("^" + h.slice(1) + "$")) : r.names.push(new RegExp("^" + h + "$")));
    }
    function o() {
      let h = [...r.names.map(a), ...r.skips.map(a).map((d) => "-" + d)].join(",");
      return r.enable(""), h;
    }
    function s(h) {
      if (h[h.length - 1] === "*")
        return true;
      let d, g;
      for (d = 0, g = r.skips.length;d < g; d++)
        if (r.skips[d].test(h))
          return false;
      for (d = 0, g = r.names.length;d < g; d++)
        if (r.names[d].test(h))
          return true;
      return false;
    }
    function a(h) {
      return h.toString().substring(2, h.toString().length - 2).replace(/\.\*\?$/, "*");
    }
    function l(h) {
      return h instanceof Error ? h.stack || h.message : h;
    }
    function c() {
      console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
    }
    return r.enable(r.load()), r;
  }
  yd.exports = Sm;
});
var ot = M((xe, Bn) => {
  _();
  v();
  m();
  xe.formatArgs = Im;
  xe.save = Tm;
  xe.load = Rm;
  xe.useColors = Am;
  xe.storage = Cm();
  xe.destroy = (() => {
    let t = false;
    return () => {
      t || (t = true, console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."));
    };
  })();
  xe.colors = ["#0000CC", "#0000FF", "#0033CC", "#0033FF", "#0066CC", "#0066FF", "#0099CC", "#0099FF", "#00CC00", "#00CC33", "#00CC66", "#00CC99", "#00CCCC", "#00CCFF", "#3300CC", "#3300FF", "#3333CC", "#3333FF", "#3366CC", "#3366FF", "#3399CC", "#3399FF", "#33CC00", "#33CC33", "#33CC66", "#33CC99", "#33CCCC", "#33CCFF", "#6600CC", "#6600FF", "#6633CC", "#6633FF", "#66CC00", "#66CC33", "#9900CC", "#9900FF", "#9933CC", "#9933FF", "#99CC00", "#99CC33", "#CC0000", "#CC0033", "#CC0066", "#CC0099", "#CC00CC", "#CC00FF", "#CC3300", "#CC3333", "#CC3366", "#CC3399", "#CC33CC", "#CC33FF", "#CC6600", "#CC6633", "#CC9900", "#CC9933", "#CCCC00", "#CCCC33", "#FF0000", "#FF0033", "#FF0066", "#FF0099", "#FF00CC", "#FF00FF", "#FF3300", "#FF3333", "#FF3366", "#FF3399", "#FF33CC", "#FF33FF", "#FF6600", "#FF6633", "#FF9900", "#FF9933", "#FFCC00", "#FFCC33"];
  function Am() {
    return typeof window < "u" && window.process && (window.process.type === "renderer" || window.process.__nwjs) ? true : typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/) ? false : typeof document < "u" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || typeof window < "u" && window.console && (window.console.firebug || window.console.exception && window.console.table) || typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
  }
  function Im(t) {
    if (t[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + t[0] + (this.useColors ? "%c " : " ") + "+" + Bn.exports.humanize(this.diff), !this.useColors)
      return;
    let e = "color: " + this.color;
    t.splice(1, 0, e, "color: inherit");
    let r = 0, i = 0;
    t[0].replace(/%[a-zA-Z%]/g, (n) => {
      n !== "%%" && (r++, n === "%c" && (i = r));
    }), t.splice(i, 0, e);
  }
  xe.log = console.debug || console.log || (() => {
  });
  function Tm(t) {
    try {
      t ? xe.storage.setItem("debug", t) : xe.storage.removeItem("debug");
    } catch {
    }
  }
  function Rm() {
    let t;
    try {
      t = xe.storage.getItem("debug");
    } catch {
    }
    return !t && typeof B < "u" && "env" in B && (t = B.env.DEBUG), t;
  }
  function Cm() {
    try {
      return localStorage;
    } catch {
    }
  }
  Bn.exports = bd()(xe);
  var { formatters: Bm } = Bn.exports;
  Bm.j = function(t) {
    try {
      return JSON.stringify(t);
    } catch (e) {
      return "[UnexpectedJSONParseError]: " + e.message;
    }
  };
});
var md = M((NP, _d) => {
  _();
  v();
  m();
  var Pm = fd(), { EventEmitter: km } = (sr(), X(nr)), wd = hd(), V = Ho(), D = ot()("mqtt-packet:parser"), Vo = class t extends km {
    constructor() {
      super(), this.parser = this.constructor.parser;
    }
    static parser(e) {
      return this instanceof t ? (this.settings = e || {}, this._states = ["_parseHeader", "_parseLength", "_parsePayload", "_newPacket"], this._resetState(), this) : new t().parser(e);
    }
    _resetState() {
      D("_resetState: resetting packet, error, _list, and _stateCounter"), this.packet = new wd, this.error = null, this._list = Pm(), this._stateCounter = 0;
    }
    parse(e) {
      for (this.error && this._resetState(), this._list.append(e), D("parse: current state: %s", this._states[this._stateCounter]);(this.packet.length !== -1 || this._list.length > 0) && this[this._states[this._stateCounter]]() && !this.error; )
        this._stateCounter++, D("parse: state complete. _stateCounter is now: %d", this._stateCounter), D("parse: packet.length: %d, buffer list length: %d", this.packet.length, this._list.length), this._stateCounter >= this._states.length && (this._stateCounter = 0);
      return D("parse: exited while loop. packet: %d, buffer list length: %d", this.packet.length, this._list.length), this._list.length;
    }
    _parseHeader() {
      let e = this._list.readUInt8(0), r = e >> V.CMD_SHIFT;
      this.packet.cmd = V.types[r];
      let i = e & 15, n = V.requiredHeaderFlags[r];
      return n != null && i !== n ? this._emitError(new Error(V.requiredHeaderFlagsErrors[r])) : (this.packet.retain = (e & V.RETAIN_MASK) !== 0, this.packet.qos = e >> V.QOS_SHIFT & V.QOS_MASK, this.packet.qos > 2 ? this._emitError(new Error("Packet must not have both QoS bits set to 1")) : (this.packet.dup = (e & V.DUP_MASK) !== 0, D("_parseHeader: packet: %o", this.packet), this._list.consume(1), true));
    }
    _parseLength() {
      let e = this._parseVarByteNum(true);
      return e && (this.packet.length = e.value, this._list.consume(e.bytes)), D("_parseLength %d", e.value), !!e;
    }
    _parsePayload() {
      D("_parsePayload: payload %O", this._list);
      let e = false;
      if (this.packet.length === 0 || this._list.length >= this.packet.length) {
        switch (this._pos = 0, this.packet.cmd) {
          case "connect":
            this._parseConnect();
            break;
          case "connack":
            this._parseConnack();
            break;
          case "publish":
            this._parsePublish();
            break;
          case "puback":
          case "pubrec":
          case "pubrel":
          case "pubcomp":
            this._parseConfirmation();
            break;
          case "subscribe":
            this._parseSubscribe();
            break;
          case "suback":
            this._parseSuback();
            break;
          case "unsubscribe":
            this._parseUnsubscribe();
            break;
          case "unsuback":
            this._parseUnsuback();
            break;
          case "pingreq":
          case "pingresp":
            break;
          case "disconnect":
            this._parseDisconnect();
            break;
          case "auth":
            this._parseAuth();
            break;
          default:
            this._emitError(new Error("Not supported"));
        }
        e = true;
      }
      return D("_parsePayload complete result: %s", e), e;
    }
    _parseConnect() {
      D("_parseConnect");
      let e, r, i, n, o = {}, s = this.packet, a = this._parseString();
      if (a === null)
        return this._emitError(new Error("Cannot parse protocolId"));
      if (a !== "MQTT" && a !== "MQIsdp")
        return this._emitError(new Error("Invalid protocolId"));
      if (s.protocolId = a, this._pos >= this._list.length)
        return this._emitError(new Error("Packet too short"));
      if (s.protocolVersion = this._list.readUInt8(this._pos), s.protocolVersion >= 128 && (s.bridgeMode = true, s.protocolVersion = s.protocolVersion - 128), s.protocolVersion !== 3 && s.protocolVersion !== 4 && s.protocolVersion !== 5)
        return this._emitError(new Error("Invalid protocol version"));
      if (this._pos++, this._pos >= this._list.length)
        return this._emitError(new Error("Packet too short"));
      if (this._list.readUInt8(this._pos) & 1)
        return this._emitError(new Error("Connect flag bit 0 must be 0, but got 1"));
      o.username = this._list.readUInt8(this._pos) & V.USERNAME_MASK, o.password = this._list.readUInt8(this._pos) & V.PASSWORD_MASK, o.will = this._list.readUInt8(this._pos) & V.WILL_FLAG_MASK;
      let l = !!(this._list.readUInt8(this._pos) & V.WILL_RETAIN_MASK), c = (this._list.readUInt8(this._pos) & V.WILL_QOS_MASK) >> V.WILL_QOS_SHIFT;
      if (o.will)
        s.will = {}, s.will.retain = l, s.will.qos = c;
      else {
        if (l)
          return this._emitError(new Error("Will Retain Flag must be set to zero when Will Flag is set to 0"));
        if (c)
          return this._emitError(new Error("Will QoS must be set to zero when Will Flag is set to 0"));
      }
      if (s.clean = (this._list.readUInt8(this._pos) & V.CLEAN_SESSION_MASK) !== 0, this._pos++, s.keepalive = this._parseNum(), s.keepalive === -1)
        return this._emitError(new Error("Packet too short"));
      if (s.protocolVersion === 5) {
        let d = this._parseProperties();
        Object.getOwnPropertyNames(d).length && (s.properties = d);
      }
      let h = this._parseString();
      if (h === null)
        return this._emitError(new Error("Packet too short"));
      if (s.clientId = h, D("_parseConnect: packet.clientId: %s", s.clientId), o.will) {
        if (s.protocolVersion === 5) {
          let d = this._parseProperties();
          Object.getOwnPropertyNames(d).length && (s.will.properties = d);
        }
        if (e = this._parseString(), e === null)
          return this._emitError(new Error("Cannot parse will topic"));
        if (s.will.topic = e, D("_parseConnect: packet.will.topic: %s", s.will.topic), r = this._parseBuffer(), r === null)
          return this._emitError(new Error("Cannot parse will payload"));
        s.will.payload = r, D("_parseConnect: packet.will.paylaod: %s", s.will.payload);
      }
      if (o.username) {
        if (n = this._parseString(), n === null)
          return this._emitError(new Error("Cannot parse username"));
        s.username = n, D("_parseConnect: packet.username: %s", s.username);
      }
      if (o.password) {
        if (i = this._parseBuffer(), i === null)
          return this._emitError(new Error("Cannot parse password"));
        s.password = i;
      }
      return this.settings = s, D("_parseConnect: complete"), s;
    }
    _parseConnack() {
      D("_parseConnack");
      let e = this.packet;
      if (this._list.length < 1)
        return null;
      let r = this._list.readUInt8(this._pos++);
      if (r > 1)
        return this._emitError(new Error("Invalid connack flags, bits 7-1 must be set to 0"));
      if (e.sessionPresent = !!(r & V.SESSIONPRESENT_MASK), this.settings.protocolVersion === 5)
        this._list.length >= 2 ? e.reasonCode = this._list.readUInt8(this._pos++) : e.reasonCode = 0;
      else {
        if (this._list.length < 2)
          return null;
        e.returnCode = this._list.readUInt8(this._pos++);
      }
      if (e.returnCode === -1 || e.reasonCode === -1)
        return this._emitError(new Error("Cannot parse return code"));
      if (this.settings.protocolVersion === 5) {
        let i = this._parseProperties();
        Object.getOwnPropertyNames(i).length && (e.properties = i);
      }
      D("_parseConnack: complete");
    }
    _parsePublish() {
      D("_parsePublish");
      let e = this.packet;
      if (e.topic = this._parseString(), e.topic === null)
        return this._emitError(new Error("Cannot parse topic"));
      if (!(e.qos > 0 && !this._parseMessageId())) {
        if (this.settings.protocolVersion === 5) {
          let r = this._parseProperties();
          Object.getOwnPropertyNames(r).length && (e.properties = r);
        }
        e.payload = this._list.slice(this._pos, e.length), D("_parsePublish: payload from buffer list: %o", e.payload);
      }
    }
    _parseSubscribe() {
      D("_parseSubscribe");
      let e = this.packet, r, i, n, o, s, a, l;
      if (e.subscriptions = [], !!this._parseMessageId()) {
        if (this.settings.protocolVersion === 5) {
          let c = this._parseProperties();
          Object.getOwnPropertyNames(c).length && (e.properties = c);
        }
        if (e.length <= 0)
          return this._emitError(new Error("Malformed subscribe, no payload specified"));
        for (;this._pos < e.length; ) {
          if (r = this._parseString(), r === null)
            return this._emitError(new Error("Cannot parse topic"));
          if (this._pos >= e.length)
            return this._emitError(new Error("Malformed Subscribe Payload"));
          if (i = this._parseByte(), this.settings.protocolVersion === 5) {
            if (i & 192)
              return this._emitError(new Error("Invalid subscribe topic flag bits, bits 7-6 must be 0"));
          } else if (i & 252)
            return this._emitError(new Error("Invalid subscribe topic flag bits, bits 7-2 must be 0"));
          if (n = i & V.SUBSCRIBE_OPTIONS_QOS_MASK, n > 2)
            return this._emitError(new Error("Invalid subscribe QoS, must be <= 2"));
          if (a = (i >> V.SUBSCRIBE_OPTIONS_NL_SHIFT & V.SUBSCRIBE_OPTIONS_NL_MASK) !== 0, s = (i >> V.SUBSCRIBE_OPTIONS_RAP_SHIFT & V.SUBSCRIBE_OPTIONS_RAP_MASK) !== 0, o = i >> V.SUBSCRIBE_OPTIONS_RH_SHIFT & V.SUBSCRIBE_OPTIONS_RH_MASK, o > 2)
            return this._emitError(new Error("Invalid retain handling, must be <= 2"));
          l = { topic: r, qos: n }, this.settings.protocolVersion === 5 ? (l.nl = a, l.rap = s, l.rh = o) : this.settings.bridgeMode && (l.rh = 0, l.rap = true, l.nl = true), D("_parseSubscribe: push subscription `%s` to subscription", l), e.subscriptions.push(l);
        }
      }
    }
    _parseSuback() {
      D("_parseSuback");
      let e = this.packet;
      if (this.packet.granted = [], !!this._parseMessageId()) {
        if (this.settings.protocolVersion === 5) {
          let r = this._parseProperties();
          Object.getOwnPropertyNames(r).length && (e.properties = r);
        }
        if (e.length <= 0)
          return this._emitError(new Error("Malformed suback, no payload specified"));
        for (;this._pos < this.packet.length; ) {
          let r = this._list.readUInt8(this._pos++);
          if (this.settings.protocolVersion === 5) {
            if (!V.MQTT5_SUBACK_CODES[r])
              return this._emitError(new Error("Invalid suback code"));
          } else if (r > 2 && r !== 128)
            return this._emitError(new Error("Invalid suback QoS, must be 0, 1, 2 or 128"));
          this.packet.granted.push(r);
        }
      }
    }
    _parseUnsubscribe() {
      D("_parseUnsubscribe");
      let e = this.packet;
      if (e.unsubscriptions = [], !!this._parseMessageId()) {
        if (this.settings.protocolVersion === 5) {
          let r = this._parseProperties();
          Object.getOwnPropertyNames(r).length && (e.properties = r);
        }
        if (e.length <= 0)
          return this._emitError(new Error("Malformed unsubscribe, no payload specified"));
        for (;this._pos < e.length; ) {
          let r = this._parseString();
          if (r === null)
            return this._emitError(new Error("Cannot parse topic"));
          D("_parseUnsubscribe: push topic `%s` to unsubscriptions", r), e.unsubscriptions.push(r);
        }
      }
    }
    _parseUnsuback() {
      D("_parseUnsuback");
      let e = this.packet;
      if (!this._parseMessageId())
        return this._emitError(new Error("Cannot parse messageId"));
      if ((this.settings.protocolVersion === 3 || this.settings.protocolVersion === 4) && e.length !== 2)
        return this._emitError(new Error("Malformed unsuback, payload length must be 2"));
      if (e.length <= 0)
        return this._emitError(new Error("Malformed unsuback, no payload specified"));
      if (this.settings.protocolVersion === 5) {
        let r = this._parseProperties();
        for (Object.getOwnPropertyNames(r).length && (e.properties = r), e.granted = [];this._pos < this.packet.length; ) {
          let i = this._list.readUInt8(this._pos++);
          if (!V.MQTT5_UNSUBACK_CODES[i])
            return this._emitError(new Error("Invalid unsuback code"));
          this.packet.granted.push(i);
        }
      }
    }
    _parseConfirmation() {
      D("_parseConfirmation: packet.cmd: `%s`", this.packet.cmd);
      let e = this.packet;
      if (this._parseMessageId(), this.settings.protocolVersion === 5) {
        if (e.length > 2) {
          switch (e.reasonCode = this._parseByte(), this.packet.cmd) {
            case "puback":
            case "pubrec":
              if (!V.MQTT5_PUBACK_PUBREC_CODES[e.reasonCode])
                return this._emitError(new Error("Invalid " + this.packet.cmd + " reason code"));
              break;
            case "pubrel":
            case "pubcomp":
              if (!V.MQTT5_PUBREL_PUBCOMP_CODES[e.reasonCode])
                return this._emitError(new Error("Invalid " + this.packet.cmd + " reason code"));
              break;
          }
          D("_parseConfirmation: packet.reasonCode `%d`", e.reasonCode);
        } else
          e.reasonCode = 0;
        if (e.length > 3) {
          let r = this._parseProperties();
          Object.getOwnPropertyNames(r).length && (e.properties = r);
        }
      }
      return true;
    }
    _parseDisconnect() {
      let e = this.packet;
      if (D("_parseDisconnect"), this.settings.protocolVersion === 5) {
        this._list.length > 0 ? (e.reasonCode = this._parseByte(), V.MQTT5_DISCONNECT_CODES[e.reasonCode] || this._emitError(new Error("Invalid disconnect reason code"))) : e.reasonCode = 0;
        let r = this._parseProperties();
        Object.getOwnPropertyNames(r).length && (e.properties = r);
      }
      return D("_parseDisconnect result: true"), true;
    }
    _parseAuth() {
      D("_parseAuth");
      let e = this.packet;
      if (this.settings.protocolVersion !== 5)
        return this._emitError(new Error("Not supported auth packet for this version MQTT"));
      if (e.reasonCode = this._parseByte(), !V.MQTT5_AUTH_CODES[e.reasonCode])
        return this._emitError(new Error("Invalid auth reason code"));
      let r = this._parseProperties();
      return Object.getOwnPropertyNames(r).length && (e.properties = r), D("_parseAuth: result: true"), true;
    }
    _parseMessageId() {
      let e = this.packet;
      return e.messageId = this._parseNum(), e.messageId === null ? (this._emitError(new Error("Cannot parse messageId")), false) : (D("_parseMessageId: packet.messageId %d", e.messageId), true);
    }
    _parseString(e) {
      let r = this._parseNum(), i = r + this._pos;
      if (r === -1 || i > this._list.length || i > this.packet.length)
        return null;
      let n = this._list.toString("utf8", this._pos, i);
      return this._pos += r, D("_parseString: result: %s", n), n;
    }
    _parseStringPair() {
      return D("_parseStringPair"), { name: this._parseString(), value: this._parseString() };
    }
    _parseBuffer() {
      let e = this._parseNum(), r = e + this._pos;
      if (e === -1 || r > this._list.length || r > this.packet.length)
        return null;
      let i = this._list.slice(this._pos, r);
      return this._pos += e, D("_parseBuffer: result: %o", i), i;
    }
    _parseNum() {
      if (this._list.length - this._pos < 2)
        return -1;
      let e = this._list.readUInt16BE(this._pos);
      return this._pos += 2, D("_parseNum: result: %s", e), e;
    }
    _parse4ByteNum() {
      if (this._list.length - this._pos < 4)
        return -1;
      let e = this._list.readUInt32BE(this._pos);
      return this._pos += 4, D("_parse4ByteNum: result: %s", e), e;
    }
    _parseVarByteNum(e) {
      D("_parseVarByteNum");
      let r = 4, i = 0, n = 1, o = 0, s = false, a, l = this._pos ? this._pos : 0;
      for (;i < r && l + i < this._list.length; ) {
        if (a = this._list.readUInt8(l + i++), o += n * (a & V.VARBYTEINT_MASK), n *= 128, !(a & V.VARBYTEINT_FIN_MASK)) {
          s = true;
          break;
        }
        if (this._list.length <= i)
          break;
      }
      return !s && i === r && this._list.length >= i && this._emitError(new Error("Invalid variable byte integer")), l && (this._pos += i), s ? e ? s = { bytes: i, value: o } : s = o : s = false, D("_parseVarByteNum: result: %o", s), s;
    }
    _parseByte() {
      let e;
      return this._pos < this._list.length && (e = this._list.readUInt8(this._pos), this._pos++), D("_parseByte: result: %o", e), e;
    }
    _parseByType(e) {
      switch (D("_parseByType: type: %s", e), e) {
        case "byte":
          return this._parseByte() !== 0;
        case "int8":
          return this._parseByte();
        case "int16":
          return this._parseNum();
        case "int32":
          return this._parse4ByteNum();
        case "var":
          return this._parseVarByteNum();
        case "string":
          return this._parseString();
        case "pair":
          return this._parseStringPair();
        case "binary":
          return this._parseBuffer();
      }
    }
    _parseProperties() {
      D("_parseProperties");
      let e = this._parseVarByteNum(), i = this._pos + e, n = {};
      for (;this._pos < i; ) {
        let o = this._parseByte();
        if (!o)
          return this._emitError(new Error("Cannot parse property code type")), false;
        let s = V.propertiesCodes[o];
        if (!s)
          return this._emitError(new Error("Unknown property")), false;
        if (s === "userProperties") {
          n[s] || (n[s] = Object.create(null));
          let a = this._parseByType(V.propertiesTypes[s]);
          if (n[s][a.name])
            if (Array.isArray(n[s][a.name]))
              n[s][a.name].push(a.value);
            else {
              let l = n[s][a.name];
              n[s][a.name] = [l], n[s][a.name].push(a.value);
            }
          else
            n[s][a.name] = a.value;
          continue;
        }
        n[s] ? Array.isArray(n[s]) ? n[s].push(this._parseByType(V.propertiesTypes[s])) : (n[s] = [n[s]], n[s].push(this._parseByType(V.propertiesTypes[s]))) : n[s] = this._parseByType(V.propertiesTypes[s]);
      }
      return n;
    }
    _newPacket() {
      return D("_newPacket"), this.packet && (this._list.consume(this.packet.length), D("_newPacket: parser emit packet: packet.cmd: %s, packet.payload: %s, packet.length: %d", this.packet.cmd, this.packet.payload, this.packet.length), this.emit("packet", this.packet)), D("_newPacket: new packet"), this.packet = new wd, this._pos = 0, true;
    }
    _emitError(e) {
      D("_emitError", e), this.error = e, this.emit("error", e);
    }
  };
  _d.exports = Vo;
});
var Ad = M((KP, Sd) => {
  _();
  v();
  m();
  var { Buffer: Si } = (be(), X(me)), Om = 65536, vd = {}, xm = Si.isBuffer(Si.from([1, 2]).subarray(0, 1));
  function Ed(t) {
    let e = Si.allocUnsafe(2);
    return e.writeUInt8(t >> 8, 0), e.writeUInt8(t & 255, 0 + 1), e;
  }
  function Mm() {
    for (let t = 0;t < Om; t++)
      vd[t] = Ed(t);
  }
  function Lm(t) {
    let r = 0, i = 0, n = Si.allocUnsafe(4);
    do
      r = t % 128 | 0, t = t / 128 | 0, t > 0 && (r = r | 128), n.writeUInt8(r, i++);
    while (t > 0 && i < 4);
    return t > 0 && (i = 0), xm ? n.subarray(0, i) : n.slice(0, i);
  }
  function Um(t) {
    let e = Si.allocUnsafe(4);
    return e.writeUInt32BE(t, 0), e;
  }
  Sd.exports = { cache: vd, generateCache: Mm, generateNumber: Ed, genBufVariableByteInt: Lm, generate4ByteBuffer: Um };
});
var Id = M((ik, zo) => {
  _();
  v();
  m();
  typeof B > "u" || !B.version || B.version.indexOf("v0.") === 0 || B.version.indexOf("v1.") === 0 && B.version.indexOf("v1.8.") !== 0 ? zo.exports = { nextTick: Nm } : zo.exports = B;
  function Nm(t, e, r, i) {
    if (typeof t != "function")
      throw new TypeError('"callback" argument must be a function');
    var n = arguments.length, o, s;
    switch (n) {
      case 0:
      case 1:
        return B.nextTick(t);
      case 2:
        return B.nextTick(function() {
          t.call(null, e);
        });
      case 3:
        return B.nextTick(function() {
          t.call(null, e, r);
        });
      case 4:
        return B.nextTick(function() {
          t.call(null, e, r, i);
        });
      default:
        for (o = new Array(n - 1), s = 0;s < o.length; )
          o[s++] = arguments[s];
        return B.nextTick(function() {
          t.apply(null, o);
        });
    }
  }
});
var Qo = M((dk, xd) => {
  _();
  v();
  m();
  var j = Ho(), { Buffer: q } = (be(), X(me)), qm = q.allocUnsafe(0), Dm = q.from([0]), Ai = Ad(), jm = Id().nextTick, qe = ot()("mqtt-packet:writeToStream"), Pn = Ai.cache, Fm = Ai.generateNumber, Wm = Ai.generateCache, Ko = Ai.genBufVariableByteInt, $m = Ai.generate4ByteBuffer, Te = Go, kn = true;
  function kd(t, e, r) {
    switch (qe("generate called"), e.cork && (e.cork(), jm(Hm, e)), kn && (kn = false, Wm()), qe("generate: packet.cmd: %s", t.cmd), t.cmd) {
      case "connect":
        return Vm(t, e, r);
      case "connack":
        return zm(t, e, r);
      case "publish":
        return Km(t, e, r);
      case "puback":
      case "pubrec":
      case "pubrel":
      case "pubcomp":
        return Gm(t, e, r);
      case "subscribe":
        return Qm(t, e, r);
      case "suback":
        return Ym(t, e, r);
      case "unsubscribe":
        return Jm(t, e, r);
      case "unsuback":
        return Xm(t, e, r);
      case "pingreq":
      case "pingresp":
        return Zm(t, e, r);
      case "disconnect":
        return e1(t, e, r);
      case "auth":
        return t1(t, e, r);
      default:
        return e.destroy(new Error("Unknown command")), false;
    }
  }
  Object.defineProperty(kd, "cacheNumbers", { get() {
    return Te === Go;
  }, set(t) {
    t ? ((!Pn || Object.keys(Pn).length === 0) && (kn = true), Te = Go) : (kn = false, Te = r1);
  } });
  function Hm(t) {
    t.uncork();
  }
  function Vm(t, e, r) {
    let i = t || {}, n = i.protocolId || "MQTT", o = i.protocolVersion || 4, s = i.will, a = i.clean, l = i.keepalive || 0, c = i.clientId || "", h = i.username, d = i.password, g = i.properties;
    a === undefined && (a = true);
    let y = 0;
    if (!n || typeof n != "string" && !q.isBuffer(n))
      return e.destroy(new Error("Invalid protocolId")), false;
    if (y += n.length + 2, o !== 3 && o !== 4 && o !== 5)
      return e.destroy(new Error("Invalid protocol version")), false;
    if (y += 1, (typeof c == "string" || q.isBuffer(c)) && (c || o >= 4) && (c || a))
      y += q.byteLength(c) + 2;
    else {
      if (o < 4)
        return e.destroy(new Error("clientId must be supplied before 3.1.1")), false;
      if (a * 1 === 0)
        return e.destroy(new Error("clientId must be given if cleanSession set to 0")), false;
    }
    if (typeof l != "number" || l < 0 || l > 65535 || l % 1 !== 0)
      return e.destroy(new Error("Invalid keepalive")), false;
    y += 2, y += 1;
    let w, S;
    if (o === 5) {
      if (w = Wt(e, g), !w)
        return false;
      y += w.length;
    }
    if (s) {
      if (typeof s != "object")
        return e.destroy(new Error("Invalid will")), false;
      if (!s.topic || typeof s.topic != "string")
        return e.destroy(new Error("Invalid will topic")), false;
      if (y += q.byteLength(s.topic) + 2, y += 2, s.payload)
        if (s.payload.length >= 0)
          typeof s.payload == "string" ? y += q.byteLength(s.payload) : y += s.payload.length;
        else
          return e.destroy(new Error("Invalid will payload")), false;
      if (S = {}, o === 5) {
        if (S = Wt(e, s.properties), !S)
          return false;
        y += S.length;
      }
    }
    let E = false;
    if (h != null)
      if (Pd(h))
        E = true, y += q.byteLength(h) + 2;
      else
        return e.destroy(new Error("Invalid username")), false;
    if (d != null) {
      if (!E)
        return e.destroy(new Error("Username is required to use password")), false;
      if (Pd(d))
        y += Od(d) + 2;
      else
        return e.destroy(new Error("Invalid password")), false;
    }
    e.write(j.CONNECT_HEADER), De(e, y), Yr(e, n), i.bridgeMode && (o += 128), e.write(o === 131 ? j.VERSION131 : o === 132 ? j.VERSION132 : o === 4 ? j.VERSION4 : o === 5 ? j.VERSION5 : j.VERSION3);
    let I = 0;
    return I |= h != null ? j.USERNAME_MASK : 0, I |= d != null ? j.PASSWORD_MASK : 0, I |= s && s.retain ? j.WILL_RETAIN_MASK : 0, I |= s && s.qos ? s.qos << j.WILL_QOS_SHIFT : 0, I |= s ? j.WILL_FLAG_MASK : 0, I |= a ? j.CLEAN_SESSION_MASK : 0, e.write(q.from([I])), Te(e, l), o === 5 && w.write(), Yr(e, c), s && (o === 5 && S.write(), wr(e, s.topic), Yr(e, s.payload)), h != null && Yr(e, h), d != null && Yr(e, d), true;
  }
  function zm(t, e, r) {
    let i = r ? r.protocolVersion : 4, n = t || {}, o = i === 5 ? n.reasonCode : n.returnCode, s = n.properties, a = 2;
    if (typeof o != "number")
      return e.destroy(new Error("Invalid return code")), false;
    let l = null;
    if (i === 5) {
      if (l = Wt(e, s), !l)
        return false;
      a += l.length;
    }
    return e.write(j.CONNACK_HEADER), De(e, a), e.write(n.sessionPresent ? j.SESSIONPRESENT_HEADER : Dm), e.write(q.from([o])), l?.write(), true;
  }
  function Km(t, e, r) {
    qe("publish: packet: %o", t);
    let i = r ? r.protocolVersion : 4, n = t || {}, o = n.qos || 0, s = n.retain ? j.RETAIN_MASK : 0, a = n.topic, l = n.payload || qm, c = n.messageId, h = n.properties, d = 0;
    if (typeof a == "string")
      d += q.byteLength(a) + 2;
    else if (q.isBuffer(a))
      d += a.length + 2;
    else
      return e.destroy(new Error("Invalid topic")), false;
    if (q.isBuffer(l) ? d += l.length : d += q.byteLength(l), o && typeof c != "number")
      return e.destroy(new Error("Invalid messageId")), false;
    o && (d += 2);
    let g = null;
    if (i === 5) {
      if (g = Wt(e, h), !g)
        return false;
      d += g.length;
    }
    return e.write(j.PUBLISH_HEADER[o][n.dup ? 1 : 0][s ? 1 : 0]), De(e, d), Te(e, Od(a)), e.write(a), o > 0 && Te(e, c), g?.write(), qe("publish: payload: %o", l), e.write(l);
  }
  function Gm(t, e, r) {
    let i = r ? r.protocolVersion : 4, n = t || {}, o = n.cmd || "puback", s = n.messageId, a = n.dup && o === "pubrel" ? j.DUP_MASK : 0, l = 0, c = n.reasonCode, h = n.properties, d = i === 5 ? 3 : 2;
    if (o === "pubrel" && (l = 1), typeof s != "number")
      return e.destroy(new Error("Invalid messageId")), false;
    let g = null;
    if (i === 5 && typeof h == "object") {
      if (g = Ii(e, h, r, d), !g)
        return false;
      d += g.length;
    }
    return e.write(j.ACKS[o][l][a][0]), d === 3 && (d += c !== 0 ? 1 : -1), De(e, d), Te(e, s), i === 5 && d !== 2 && e.write(q.from([c])), g !== null ? g.write() : d === 4 && e.write(q.from([0])), true;
  }
  function Qm(t, e, r) {
    qe("subscribe: packet: ");
    let i = r ? r.protocolVersion : 4, n = t || {}, o = n.dup ? j.DUP_MASK : 0, s = n.messageId, a = n.subscriptions, l = n.properties, c = 0;
    if (typeof s != "number")
      return e.destroy(new Error("Invalid messageId")), false;
    c += 2;
    let h = null;
    if (i === 5) {
      if (h = Wt(e, l), !h)
        return false;
      c += h.length;
    }
    if (typeof a == "object" && a.length)
      for (let g = 0;g < a.length; g += 1) {
        let y = a[g].topic, w = a[g].qos;
        if (typeof y != "string")
          return e.destroy(new Error("Invalid subscriptions - invalid topic")), false;
        if (typeof w != "number")
          return e.destroy(new Error("Invalid subscriptions - invalid qos")), false;
        if (i === 5) {
          if (typeof (a[g].nl || false) != "boolean")
            return e.destroy(new Error("Invalid subscriptions - invalid No Local")), false;
          if (typeof (a[g].rap || false) != "boolean")
            return e.destroy(new Error("Invalid subscriptions - invalid Retain as Published")), false;
          let I = a[g].rh || 0;
          if (typeof I != "number" || I > 2)
            return e.destroy(new Error("Invalid subscriptions - invalid Retain Handling")), false;
        }
        c += q.byteLength(y) + 2 + 1;
      }
    else
      return e.destroy(new Error("Invalid subscriptions")), false;
    qe("subscribe: writing to stream: %o", j.SUBSCRIBE_HEADER), e.write(j.SUBSCRIBE_HEADER[1][o ? 1 : 0][0]), De(e, c), Te(e, s), h !== null && h.write();
    let d = true;
    for (let g of a) {
      let { topic: y, qos: w } = g, S = +g.nl, E = +g.rap, I = g.rh, C;
      wr(e, y), C = j.SUBSCRIBE_OPTIONS_QOS[w], i === 5 && (C |= S ? j.SUBSCRIBE_OPTIONS_NL : 0, C |= E ? j.SUBSCRIBE_OPTIONS_RAP : 0, C |= I ? j.SUBSCRIBE_OPTIONS_RH[I] : 0), d = e.write(q.from([C]));
    }
    return d;
  }
  function Ym(t, e, r) {
    let i = r ? r.protocolVersion : 4, n = t || {}, o = n.messageId, s = n.granted, a = n.properties, l = 0;
    if (typeof o != "number")
      return e.destroy(new Error("Invalid messageId")), false;
    if (l += 2, typeof s == "object" && s.length)
      for (let h = 0;h < s.length; h += 1) {
        if (typeof s[h] != "number")
          return e.destroy(new Error("Invalid qos vector")), false;
        l += 1;
      }
    else
      return e.destroy(new Error("Invalid qos vector")), false;
    let c = null;
    if (i === 5) {
      if (c = Ii(e, a, r, l), !c)
        return false;
      l += c.length;
    }
    return e.write(j.SUBACK_HEADER), De(e, l), Te(e, o), c !== null && c.write(), e.write(q.from(s));
  }
  function Jm(t, e, r) {
    let i = r ? r.protocolVersion : 4, n = t || {}, o = n.messageId, s = n.dup ? j.DUP_MASK : 0, a = n.unsubscriptions, l = n.properties, c = 0;
    if (typeof o != "number")
      return e.destroy(new Error("Invalid messageId")), false;
    if (c += 2, typeof a == "object" && a.length)
      for (let g = 0;g < a.length; g += 1) {
        if (typeof a[g] != "string")
          return e.destroy(new Error("Invalid unsubscriptions")), false;
        c += q.byteLength(a[g]) + 2;
      }
    else
      return e.destroy(new Error("Invalid unsubscriptions")), false;
    let h = null;
    if (i === 5) {
      if (h = Wt(e, l), !h)
        return false;
      c += h.length;
    }
    e.write(j.UNSUBSCRIBE_HEADER[1][s ? 1 : 0][0]), De(e, c), Te(e, o), h !== null && h.write();
    let d = true;
    for (let g = 0;g < a.length; g++)
      d = wr(e, a[g]);
    return d;
  }
  function Xm(t, e, r) {
    let i = r ? r.protocolVersion : 4, n = t || {}, o = n.messageId, s = n.dup ? j.DUP_MASK : 0, a = n.granted, l = n.properties, c = n.cmd, h = 0, d = 2;
    if (typeof o != "number")
      return e.destroy(new Error("Invalid messageId")), false;
    if (i === 5)
      if (typeof a == "object" && a.length)
        for (let y = 0;y < a.length; y += 1) {
          if (typeof a[y] != "number")
            return e.destroy(new Error("Invalid qos vector")), false;
          d += 1;
        }
      else
        return e.destroy(new Error("Invalid qos vector")), false;
    let g = null;
    if (i === 5) {
      if (g = Ii(e, l, r, d), !g)
        return false;
      d += g.length;
    }
    return e.write(j.ACKS[c][h][s][0]), De(e, d), Te(e, o), g !== null && g.write(), i === 5 && e.write(q.from(a)), true;
  }
  function Zm(t, e, r) {
    return e.write(j.EMPTY[t.cmd]);
  }
  function e1(t, e, r) {
    let i = r ? r.protocolVersion : 4, n = t || {}, o = n.reasonCode, s = n.properties, a = i === 5 ? 1 : 0, l = null;
    if (i === 5) {
      if (l = Ii(e, s, r, a), !l)
        return false;
      a += l.length;
    }
    return e.write(q.from([j.codes.disconnect << 4])), De(e, a), i === 5 && e.write(q.from([o])), l !== null && l.write(), true;
  }
  function t1(t, e, r) {
    let i = r ? r.protocolVersion : 4, n = t || {}, o = n.reasonCode, s = n.properties, a = i === 5 ? 1 : 0;
    i !== 5 && e.destroy(new Error("Invalid mqtt version for auth packet"));
    let l = Ii(e, s, r, a);
    return l ? (a += l.length, e.write(q.from([j.codes.auth << 4])), De(e, a), e.write(q.from([o])), l !== null && l.write(), true) : false;
  }
  var Td = {};
  function De(t, e) {
    if (e > j.VARBYTEINT_MAX)
      return t.destroy(new Error(`Invalid variable byte integer: ${e}`)), false;
    let r = Td[e];
    return r || (r = Ko(e), e < 16384 && (Td[e] = r)), qe("writeVarByteInt: writing to stream: %o", r), t.write(r);
  }
  function wr(t, e) {
    let r = q.byteLength(e);
    return Te(t, r), qe("writeString: %s", e), t.write(e, "utf8");
  }
  function Rd(t, e, r) {
    wr(t, e), wr(t, r);
  }
  function Go(t, e) {
    return qe("writeNumberCached: number: %d", e), qe("writeNumberCached: %o", Pn[e]), t.write(Pn[e]);
  }
  function r1(t, e) {
    let r = Fm(e);
    return qe("writeNumberGenerated: %o", r), t.write(r);
  }
  function i1(t, e) {
    let r = $m(e);
    return qe("write4ByteNumber: %o", r), t.write(r);
  }
  function Yr(t, e) {
    typeof e == "string" ? wr(t, e) : e ? (Te(t, e.length), t.write(e)) : Te(t, 0);
  }
  function Wt(t, e) {
    if (typeof e != "object" || e.length != null)
      return { length: 1, write() {
        Bd(t, {}, 0);
      } };
    let r = 0;
    function i(o, s) {
      let a = j.propertiesTypes[o], l = 0;
      switch (a) {
        case "byte": {
          if (typeof s != "boolean")
            return t.destroy(new Error(`Invalid ${o}: ${s}`)), false;
          l += 1 + 1;
          break;
        }
        case "int8": {
          if (typeof s != "number" || s < 0 || s > 255)
            return t.destroy(new Error(`Invalid ${o}: ${s}`)), false;
          l += 1 + 1;
          break;
        }
        case "binary": {
          if (s && s === null)
            return t.destroy(new Error(`Invalid ${o}: ${s}`)), false;
          l += 1 + q.byteLength(s) + 2;
          break;
        }
        case "int16": {
          if (typeof s != "number" || s < 0 || s > 65535)
            return t.destroy(new Error(`Invalid ${o}: ${s}`)), false;
          l += 1 + 2;
          break;
        }
        case "int32": {
          if (typeof s != "number" || s < 0 || s > 4294967295)
            return t.destroy(new Error(`Invalid ${o}: ${s}`)), false;
          l += 1 + 4;
          break;
        }
        case "var": {
          if (typeof s != "number" || s < 0 || s > 268435455)
            return t.destroy(new Error(`Invalid ${o}: ${s}`)), false;
          l += 1 + q.byteLength(Ko(s));
          break;
        }
        case "string": {
          if (typeof s != "string")
            return t.destroy(new Error(`Invalid ${o}: ${s}`)), false;
          l += 1 + 2 + q.byteLength(s.toString());
          break;
        }
        case "pair": {
          if (typeof s != "object")
            return t.destroy(new Error(`Invalid ${o}: ${s}`)), false;
          l += Object.getOwnPropertyNames(s).reduce((c, h) => {
            let d = s[h];
            return Array.isArray(d) ? c += d.reduce((g, y) => (g += 1 + 2 + q.byteLength(h.toString()) + 2 + q.byteLength(y.toString()), g), 0) : c += 1 + 2 + q.byteLength(h.toString()) + 2 + q.byteLength(s[h].toString()), c;
          }, 0);
          break;
        }
        default:
          return t.destroy(new Error(`Invalid property ${o}: ${s}`)), false;
      }
      return l;
    }
    if (e)
      for (let o in e) {
        let s = 0, a = 0, l = e[o];
        if (Array.isArray(l))
          for (let c = 0;c < l.length; c++) {
            if (a = i(o, l[c]), !a)
              return false;
            s += a;
          }
        else {
          if (a = i(o, l), !a)
            return false;
          s = a;
        }
        if (!s)
          return false;
        r += s;
      }
    return { length: q.byteLength(Ko(r)) + r, write() {
      Bd(t, e, r);
    } };
  }
  function Ii(t, e, r, i) {
    let n = ["reasonString", "userProperties"], o = r && r.properties && r.properties.maximumPacketSize ? r.properties.maximumPacketSize : 0, s = Wt(t, e);
    if (o)
      for (;i + s.length > o; ) {
        let a = n.shift();
        if (a && e[a])
          delete e[a], s = Wt(t, e);
        else
          return false;
      }
    return s;
  }
  function Cd(t, e, r) {
    switch (j.propertiesTypes[e]) {
      case "byte": {
        t.write(q.from([j.properties[e]])), t.write(q.from([+r]));
        break;
      }
      case "int8": {
        t.write(q.from([j.properties[e]])), t.write(q.from([r]));
        break;
      }
      case "binary": {
        t.write(q.from([j.properties[e]])), Yr(t, r);
        break;
      }
      case "int16": {
        t.write(q.from([j.properties[e]])), Te(t, r);
        break;
      }
      case "int32": {
        t.write(q.from([j.properties[e]])), i1(t, r);
        break;
      }
      case "var": {
        t.write(q.from([j.properties[e]])), De(t, r);
        break;
      }
      case "string": {
        t.write(q.from([j.properties[e]])), wr(t, r);
        break;
      }
      case "pair": {
        Object.getOwnPropertyNames(r).forEach((n) => {
          let o = r[n];
          Array.isArray(o) ? o.forEach((s) => {
            t.write(q.from([j.properties[e]])), Rd(t, n.toString(), s.toString());
          }) : (t.write(q.from([j.properties[e]])), Rd(t, n.toString(), o.toString()));
        });
        break;
      }
      default:
        return t.destroy(new Error(`Invalid property ${e} value: ${r}`)), false;
    }
  }
  function Bd(t, e, r) {
    De(t, r);
    for (let i in e)
      if (Object.prototype.hasOwnProperty.call(e, i) && e[i] !== null) {
        let n = e[i];
        if (Array.isArray(n))
          for (let o = 0;o < n.length; o++)
            Cd(t, i, n[o]);
        else
          Cd(t, i, n);
      }
  }
  function Od(t) {
    return t ? t instanceof q ? t.length : q.byteLength(t) : 0;
  }
  function Pd(t) {
    return typeof t == "string" || t instanceof q;
  }
  xd.exports = kd;
});
var Ud = M((Sk, Ld) => {
  _();
  v();
  m();
  var n1 = Qo(), { EventEmitter: s1 } = (sr(), X(nr)), { Buffer: Md } = (be(), X(me));
  function o1(t, e) {
    let r = new Yo;
    return n1(t, r, e), r.concat();
  }
  var Yo = class extends s1 {
    constructor() {
      super(), this._array = new Array(20), this._i = 0;
    }
    write(e) {
      return this._array[this._i++] = e, true;
    }
    concat() {
      let e = 0, r = new Array(this._array.length), i = this._array, n = 0, o;
      for (o = 0;o < i.length && i[o] !== undefined; o++)
        typeof i[o] != "string" ? r[o] = i[o].length : r[o] = Md.byteLength(i[o]), e += r[o];
      let s = Md.allocUnsafe(e);
      for (o = 0;o < i.length && i[o] !== undefined; o++)
        typeof i[o] != "string" ? (i[o].copy(s, n), n += r[o]) : (s.write(i[o], n), n += r[o]);
      return s;
    }
    destroy(e) {
      e && this.emit("error", e);
    }
  };
  Ld.exports = o1;
});
var Nd = M((On) => {
  _();
  v();
  m();
  On.parser = md().parser;
  On.generate = Ud();
  On.writeToStream = Qo();
});
var Zo = M((Xo) => {
  _();
  v();
  m();
  Object.defineProperty(Xo, "__esModule", { value: true });
  var Jo = class {
    constructor() {
      this.nextId = Math.max(1, Math.floor(Math.random() * 65535));
    }
    allocate() {
      let e = this.nextId++;
      return this.nextId === 65536 && (this.nextId = 1), e;
    }
    getLastAllocated() {
      return this.nextId === 1 ? 65535 : this.nextId - 1;
    }
    register(e) {
      return true;
    }
    deallocate(e) {
    }
    clear() {
    }
  };
  Xo.default = Jo;
});
var Dd = M((Zk, qd) => {
  _();
  v();
  m();
  qd.exports = a1;
  function Jr(t) {
    return t instanceof x ? x.from(t) : new t.constructor(t.buffer.slice(), t.byteOffset, t.length);
  }
  function a1(t) {
    if (t = t || {}, t.circles)
      return l1(t);
    return t.proto ? i : r;
    function e(n, o) {
      for (var s = Object.keys(n), a = new Array(s.length), l = 0;l < s.length; l++) {
        var c = s[l], h = n[c];
        typeof h != "object" || h === null ? a[c] = h : h instanceof Date ? a[c] = new Date(h) : ArrayBuffer.isView(h) ? a[c] = Jr(h) : a[c] = o(h);
      }
      return a;
    }
    function r(n) {
      if (typeof n != "object" || n === null)
        return n;
      if (n instanceof Date)
        return new Date(n);
      if (Array.isArray(n))
        return e(n, r);
      if (n instanceof Map)
        return new Map(e(Array.from(n), r));
      if (n instanceof Set)
        return new Set(e(Array.from(n), r));
      var o = {};
      for (var s in n)
        if (Object.hasOwnProperty.call(n, s) !== false) {
          var a = n[s];
          typeof a != "object" || a === null ? o[s] = a : a instanceof Date ? o[s] = new Date(a) : a instanceof Map ? o[s] = new Map(e(Array.from(a), r)) : a instanceof Set ? o[s] = new Set(e(Array.from(a), r)) : ArrayBuffer.isView(a) ? o[s] = Jr(a) : o[s] = r(a);
        }
      return o;
    }
    function i(n) {
      if (typeof n != "object" || n === null)
        return n;
      if (n instanceof Date)
        return new Date(n);
      if (Array.isArray(n))
        return e(n, i);
      if (n instanceof Map)
        return new Map(e(Array.from(n), i));
      if (n instanceof Set)
        return new Set(e(Array.from(n), i));
      var o = {};
      for (var s in n) {
        var a = n[s];
        typeof a != "object" || a === null ? o[s] = a : a instanceof Date ? o[s] = new Date(a) : a instanceof Map ? o[s] = new Map(e(Array.from(a), i)) : a instanceof Set ? o[s] = new Set(e(Array.from(a), i)) : ArrayBuffer.isView(a) ? o[s] = Jr(a) : o[s] = i(a);
      }
      return o;
    }
  }
  function l1(t) {
    var e = [], r = [];
    return t.proto ? o : n;
    function i(s, a) {
      for (var l = Object.keys(s), c = new Array(l.length), h = 0;h < l.length; h++) {
        var d = l[h], g = s[d];
        if (typeof g != "object" || g === null)
          c[d] = g;
        else if (g instanceof Date)
          c[d] = new Date(g);
        else if (ArrayBuffer.isView(g))
          c[d] = Jr(g);
        else {
          var y = e.indexOf(g);
          y !== -1 ? c[d] = r[y] : c[d] = a(g);
        }
      }
      return c;
    }
    function n(s) {
      if (typeof s != "object" || s === null)
        return s;
      if (s instanceof Date)
        return new Date(s);
      if (Array.isArray(s))
        return i(s, n);
      if (s instanceof Map)
        return new Map(i(Array.from(s), n));
      if (s instanceof Set)
        return new Set(i(Array.from(s), n));
      var a = {};
      e.push(s), r.push(a);
      for (var l in s)
        if (Object.hasOwnProperty.call(s, l) !== false) {
          var c = s[l];
          if (typeof c != "object" || c === null)
            a[l] = c;
          else if (c instanceof Date)
            a[l] = new Date(c);
          else if (c instanceof Map)
            a[l] = new Map(i(Array.from(c), n));
          else if (c instanceof Set)
            a[l] = new Set(i(Array.from(c), n));
          else if (ArrayBuffer.isView(c))
            a[l] = Jr(c);
          else {
            var h = e.indexOf(c);
            h !== -1 ? a[l] = r[h] : a[l] = n(c);
          }
        }
      return e.pop(), r.pop(), a;
    }
    function o(s) {
      if (typeof s != "object" || s === null)
        return s;
      if (s instanceof Date)
        return new Date(s);
      if (Array.isArray(s))
        return i(s, o);
      if (s instanceof Map)
        return new Map(i(Array.from(s), o));
      if (s instanceof Set)
        return new Set(i(Array.from(s), o));
      var a = {};
      e.push(s), r.push(a);
      for (var l in s) {
        var c = s[l];
        if (typeof c != "object" || c === null)
          a[l] = c;
        else if (c instanceof Date)
          a[l] = new Date(c);
        else if (c instanceof Map)
          a[l] = new Map(i(Array.from(c), o));
        else if (c instanceof Set)
          a[l] = new Set(i(Array.from(c), o));
        else if (ArrayBuffer.isView(c))
          a[l] = Jr(c);
        else {
          var h = e.indexOf(c);
          h !== -1 ? a[l] = r[h] : a[l] = o(c);
        }
      }
      return e.pop(), r.pop(), a;
    }
  }
});
var Fd = M((uO, jd) => {
  _();
  v();
  m();
  jd.exports = Dd()();
});
var $d = M((Xr) => {
  _();
  v();
  m();
  Object.defineProperty(Xr, "__esModule", { value: true });
  Xr.validateTopics = Xr.validateTopic = undefined;
  function Wd(t) {
    let e = t.split("/");
    for (let r = 0;r < e.length; r++)
      if (e[r] !== "+") {
        if (e[r] === "#")
          return r === e.length - 1;
        if (e[r].indexOf("+") !== -1 || e[r].indexOf("#") !== -1)
          return false;
      }
    return true;
  }
  Xr.validateTopic = Wd;
  function u1(t) {
    if (t.length === 0)
      return "empty_topic_list";
    for (let e = 0;e < t.length; e++)
      if (!Wd(t[e]))
        return t[e];
    return null;
  }
  Xr.validateTopics = u1;
});
var ra = M((ta) => {
  _();
  v();
  m();
  Object.defineProperty(ta, "__esModule", { value: true });
  var f1 = jt(), c1 = { objectMode: true }, h1 = { clean: true }, ea = class {
    constructor(e) {
      this.options = e || {}, this.options = Object.assign(Object.assign({}, h1), e), this._inflights = new Map;
    }
    put(e, r) {
      return this._inflights.set(e.messageId, e), r && r(), this;
    }
    createStream() {
      let e = new f1.Readable(c1), r = [], i = false, n = 0;
      return this._inflights.forEach((o, s) => {
        r.push(o);
      }), e._read = () => {
        !i && n < r.length ? e.push(r[n++]) : e.push(null);
      }, e.destroy = (o) => {
        if (!i)
          return i = true, setTimeout(() => {
            e.emit("close");
          }, 0), e;
      }, e;
    }
    del(e, r) {
      let i = this._inflights.get(e.messageId);
      return i ? (this._inflights.delete(e.messageId), r(null, i)) : r && r(new Error("missing packet")), this;
    }
    get(e, r) {
      let i = this._inflights.get(e.messageId);
      return i ? r(null, i) : r && r(new Error("missing packet")), this;
    }
    close(e) {
      this.options.clean && (this._inflights = null), e && e();
    }
  };
  ta.default = ea;
});
var Vd = M((ia) => {
  _();
  v();
  m();
  Object.defineProperty(ia, "__esModule", { value: true });
  var Hd = [0, 16, 128, 131, 135, 144, 145, 151, 153], d1 = (t, e, r) => {
    t.log("handlePublish: packet %o", e), r = typeof r < "u" ? r : t.noop;
    let i = e.topic.toString(), n = e.payload, { qos: o } = e, { messageId: s } = e, { options: a } = t;
    if (t.options.protocolVersion === 5) {
      let l;
      if (e.properties && (l = e.properties.topicAlias), typeof l < "u")
        if (i.length === 0)
          if (l > 0 && l <= 65535) {
            let c = t.topicAliasRecv.getTopicByAlias(l);
            if (c)
              i = c, t.log("handlePublish :: topic complemented by alias. topic: %s - alias: %d", i, l);
            else {
              t.log("handlePublish :: unregistered topic alias. alias: %d", l), t.emit("error", new Error("Received unregistered Topic Alias"));
              return;
            }
          } else {
            t.log("handlePublish :: topic alias out of range. alias: %d", l), t.emit("error", new Error("Received Topic Alias is out of range"));
            return;
          }
        else if (t.topicAliasRecv.put(i, l))
          t.log("handlePublish :: registered topic: %s - alias: %d", i, l);
        else {
          t.log("handlePublish :: topic alias out of range. alias: %d", l), t.emit("error", new Error("Received Topic Alias is out of range"));
          return;
        }
    }
    switch (t.log("handlePublish: qos %d", o), o) {
      case 2: {
        a.customHandleAcks(i, n, e, (l, c) => {
          if (typeof l == "number" && (c = l, l = null), l)
            return t.emit("error", l);
          if (Hd.indexOf(c) === -1)
            return t.emit("error", new Error("Wrong reason code for pubrec"));
          c ? t._sendPacket({ cmd: "pubrec", messageId: s, reasonCode: c }, r) : t.incomingStore.put(e, () => {
            t._sendPacket({ cmd: "pubrec", messageId: s }, r);
          });
        });
        break;
      }
      case 1: {
        a.customHandleAcks(i, n, e, (l, c) => {
          if (typeof l == "number" && (c = l, l = null), l)
            return t.emit("error", l);
          if (Hd.indexOf(c) === -1)
            return t.emit("error", new Error("Wrong reason code for puback"));
          c || t.emit("message", i, n, e), t.handleMessage(e, (h) => {
            if (h)
              return r && r(h);
            t._sendPacket({ cmd: "puback", messageId: s, reasonCode: c }, r);
          });
        });
        break;
      }
      case 0:
        t.emit("message", i, n, e), t.handleMessage(e, r);
        break;
      default:
        t.log("handlePublish: unknown QoS. Doing nothing.");
        break;
    }
  };
  ia.default = d1;
});
var zd = M((QO, p1) => {
  p1.exports = { version: "5.10.1" };
});
var _r = M((at) => {
  _();
  v();
  m();
  Object.defineProperty(at, "__esModule", { value: true });
  at.MQTTJS_VERSION = at.nextTick = at.applyMixin = at.ErrorWithReasonCode = undefined;
  var na = class t extends Error {
    constructor(e, r) {
      super(e), this.code = r, Object.setPrototypeOf(this, t.prototype), Object.getPrototypeOf(this).name = "ErrorWithReasonCode";
    }
  };
  at.ErrorWithReasonCode = na;
  function g1(t, e, r = false) {
    var i;
    let n = [e];
    for (;; ) {
      let o = n[0], s = Object.getPrototypeOf(o);
      if (s?.prototype)
        n.unshift(s);
      else
        break;
    }
    for (let o of n)
      for (let s of Object.getOwnPropertyNames(o.prototype))
        (r || s !== "constructor") && Object.defineProperty(t.prototype, s, (i = Object.getOwnPropertyDescriptor(o.prototype, s)) !== null && i !== undefined ? i : Object.create(null));
  }
  at.applyMixin = g1;
  at.nextTick = typeof (B === null || B === undefined ? undefined : B.nextTick) == "function" ? B.nextTick : (t) => {
    setTimeout(t, 0);
  };
  at.MQTTJS_VERSION = zd().version;
});
var Ti = M(($t) => {
  _();
  v();
  m();
  Object.defineProperty($t, "__esModule", { value: true });
  $t.ReasonCodes = undefined;
  var Kd = _r();
  $t.ReasonCodes = { 0: "", 1: "Unacceptable protocol version", 2: "Identifier rejected", 3: "Server unavailable", 4: "Bad username or password", 5: "Not authorized", 16: "No matching subscribers", 17: "No subscription existed", 128: "Unspecified error", 129: "Malformed Packet", 130: "Protocol Error", 131: "Implementation specific error", 132: "Unsupported Protocol Version", 133: "Client Identifier not valid", 134: "Bad User Name or Password", 135: "Not authorized", 136: "Server unavailable", 137: "Server busy", 138: "Banned", 139: "Server shutting down", 140: "Bad authentication method", 141: "Keep Alive timeout", 142: "Session taken over", 143: "Topic Filter invalid", 144: "Topic Name invalid", 145: "Packet identifier in use", 146: "Packet Identifier not found", 147: "Receive Maximum exceeded", 148: "Topic Alias invalid", 149: "Packet too large", 150: "Message rate too high", 151: "Quota exceeded", 152: "Administrative action", 153: "Payload format invalid", 154: "Retain not supported", 155: "QoS not supported", 156: "Use another server", 157: "Server moved", 158: "Shared Subscriptions not supported", 159: "Connection rate exceeded", 160: "Maximum connect time", 161: "Subscription Identifiers not supported", 162: "Wildcard Subscriptions not supported" };
  var y1 = (t, e) => {
    let { messageId: r } = e, i = e.cmd, n = null, o = t.outgoing[r] ? t.outgoing[r].cb : null, s = null;
    if (!o) {
      t.log("_handleAck :: Server sent an ack in error. Ignoring.");
      return;
    }
    switch (t.log("_handleAck :: packet type", i), i) {
      case "pubcomp":
      case "puback": {
        let a = e.reasonCode;
        a && a > 0 && a !== 16 ? (s = new Kd.ErrorWithReasonCode(`Publish error: ${$t.ReasonCodes[a]}`, a), t._removeOutgoingAndStoreMessage(r, () => {
          o(s, e);
        })) : t._removeOutgoingAndStoreMessage(r, o);
        break;
      }
      case "pubrec": {
        n = { cmd: "pubrel", qos: 2, messageId: r };
        let a = e.reasonCode;
        a && a > 0 && a !== 16 ? (s = new Kd.ErrorWithReasonCode(`Publish error: ${$t.ReasonCodes[a]}`, a), t._removeOutgoingAndStoreMessage(r, () => {
          o(s, e);
        })) : t._sendPacket(n);
        break;
      }
      case "suback": {
        delete t.outgoing[r], t.messageIdProvider.deallocate(r);
        let a = e.granted;
        for (let l = 0;l < a.length; l++) {
          let c = a[l];
          if (c & 128) {
            s = new Error(`Subscribe error: ${$t.ReasonCodes[c]}`), s.code = c;
            let h = t.messageIdToTopic[r];
            h && h.forEach((d) => {
              delete t._resubscribeTopics[d];
            });
          }
        }
        delete t.messageIdToTopic[r], t._invokeStoreProcessingQueue(), o(s, e);
        break;
      }
      case "unsuback": {
        delete t.outgoing[r], t.messageIdProvider.deallocate(r), t._invokeStoreProcessingQueue(), o(null, e);
        break;
      }
      default:
        t.emit("error", new Error("unrecognized packet type"));
    }
    t.disconnecting && Object.keys(t.outgoing).length === 0 && t.emit("outgoingEmpty");
  };
  $t.default = y1;
});
var Qd = M((sa) => {
  _();
  v();
  m();
  Object.defineProperty(sa, "__esModule", { value: true });
  var Gd = _r(), b1 = Ti(), w1 = (t, e) => {
    let { options: r } = t, i = r.protocolVersion, n = i === 5 ? e.reasonCode : e.returnCode;
    if (i !== 5) {
      let o = new Gd.ErrorWithReasonCode(`Protocol error: Auth packets are only supported in MQTT 5. Your version:${i}`, n);
      t.emit("error", o);
      return;
    }
    t.handleAuth(e, (o, s) => {
      if (o) {
        t.emit("error", o);
        return;
      }
      if (n === 24)
        t.reconnecting = false, t._sendPacket(s);
      else {
        let a = new Gd.ErrorWithReasonCode(`Connection refused: ${b1.ReasonCodes[n]}`, n);
        t.emit("error", a);
      }
    });
  };
  sa.default = w1;
});
var ep = M((Mn) => {
  _();
  v();
  m();
  Object.defineProperty(Mn, "__esModule", { value: true });
  Mn.LRUCache = undefined;
  var Ri = typeof performance == "object" && performance && typeof performance.now == "function" ? performance : Date, Jd = new Set, oa = typeof B == "object" && B ? B : {}, Xd = (t, e, r, i) => {
    typeof oa.emitWarning == "function" ? oa.emitWarning(t, e, r, i) : console.error(`[${r}] ${e}: ${t}`);
  }, xn = globalThis.AbortController, Yd = globalThis.AbortSignal;
  if (typeof xn > "u") {
    Yd = class {
      onabort;
      _onabort = [];
      reason;
      aborted = false;
      addEventListener(i, n) {
        this._onabort.push(n);
      }
    }, xn = class {
      constructor() {
        e();
      }
      signal = new Yd;
      abort(i) {
        if (!this.signal.aborted) {
          this.signal.reason = i, this.signal.aborted = true;
          for (let n of this.signal._onabort)
            n(i);
          this.signal.onabort?.(i);
        }
      }
    };
    let t = oa.env?.LRU_CACHE_IGNORE_AC_WARNING !== "1", e = () => {
      t && (t = false, Xd("AbortController is not defined. If using lru-cache in node 14, load an AbortController polyfill from the `node-abort-controller` package. A minimal polyfill is provided for use by LRUCache.fetch(), but it should not be relied upon in other contexts (eg, passing it to other APIs that use AbortController/AbortSignal might have undesirable effects). You may disable this with LRU_CACHE_IGNORE_AC_WARNING=1 in the env.", "NO_ABORT_CONTROLLER", "ENOTSUP", e));
    };
  }
  var _1 = (t) => !Jd.has(t), Bx = Symbol("type"), Ht = (t) => t && t === Math.floor(t) && t > 0 && isFinite(t), Zd = (t) => Ht(t) ? t <= Math.pow(2, 8) ? Uint8Array : t <= Math.pow(2, 16) ? Uint16Array : t <= Math.pow(2, 32) ? Uint32Array : t <= Number.MAX_SAFE_INTEGER ? Zr : null : null, Zr = class extends Array {
    constructor(e) {
      super(e), this.fill(0);
    }
  }, aa = class t {
    heap;
    length;
    static #l = false;
    static create(e) {
      let r = Zd(e);
      if (!r)
        return [];
      t.#l = true;
      let i = new t(e, r);
      return t.#l = false, i;
    }
    constructor(e, r) {
      if (!t.#l)
        throw new TypeError("instantiate Stack using Stack.create(n)");
      this.heap = new r(e), this.length = 0;
    }
    push(e) {
      this.heap[this.length++] = e;
    }
    pop() {
      return this.heap[--this.length];
    }
  }, la = class t {
    #l;
    #c;
    #p;
    #g;
    #B;
    ttl;
    ttlResolution;
    ttlAutopurge;
    updateAgeOnGet;
    updateAgeOnHas;
    allowStale;
    noDisposeOnSet;
    noUpdateTTL;
    maxEntrySize;
    sizeCalculation;
    noDeleteOnFetchRejection;
    noDeleteOnStaleGet;
    allowStaleOnFetchAbort;
    allowStaleOnFetchRejection;
    ignoreFetchAbort;
    #i;
    #y;
    #n;
    #r;
    #e;
    #u;
    #h;
    #a;
    #s;
    #b;
    #o;
    #E;
    #S;
    #w;
    #_;
    #I;
    #f;
    static unsafeExposeInternals(e) {
      return { starts: e.#S, ttls: e.#w, sizes: e.#E, keyMap: e.#n, keyList: e.#r, valList: e.#e, next: e.#u, prev: e.#h, get head() {
        return e.#a;
      }, get tail() {
        return e.#s;
      }, free: e.#b, isBackgroundFetch: (r) => e.#t(r), backgroundFetch: (r, i, n, o) => e.#O(r, i, n, o), moveToTail: (r) => e.#C(r), indexes: (r) => e.#m(r), rindexes: (r) => e.#v(r), isStale: (r) => e.#d(r) };
    }
    get max() {
      return this.#l;
    }
    get maxSize() {
      return this.#c;
    }
    get calculatedSize() {
      return this.#y;
    }
    get size() {
      return this.#i;
    }
    get fetchMethod() {
      return this.#B;
    }
    get dispose() {
      return this.#p;
    }
    get disposeAfter() {
      return this.#g;
    }
    constructor(e) {
      let { max: r = 0, ttl: i, ttlResolution: n = 1, ttlAutopurge: o, updateAgeOnGet: s, updateAgeOnHas: a, allowStale: l, dispose: c, disposeAfter: h, noDisposeOnSet: d, noUpdateTTL: g, maxSize: y = 0, maxEntrySize: w = 0, sizeCalculation: S, fetchMethod: E, noDeleteOnFetchRejection: I, noDeleteOnStaleGet: C, allowStaleOnFetchRejection: R, allowStaleOnFetchAbort: U, ignoreFetchAbort: N } = e;
      if (r !== 0 && !Ht(r))
        throw new TypeError("max option must be a nonnegative integer");
      let W = r ? Zd(r) : Array;
      if (!W)
        throw new Error("invalid max value: " + r);
      if (this.#l = r, this.#c = y, this.maxEntrySize = w || this.#c, this.sizeCalculation = S, this.sizeCalculation) {
        if (!this.#c && !this.maxEntrySize)
          throw new TypeError("cannot set sizeCalculation without setting maxSize or maxEntrySize");
        if (typeof this.sizeCalculation != "function")
          throw new TypeError("sizeCalculation set to non-function");
      }
      if (E !== undefined && typeof E != "function")
        throw new TypeError("fetchMethod must be a function if specified");
      if (this.#B = E, this.#I = !!E, this.#n = new Map, this.#r = new Array(r).fill(undefined), this.#e = new Array(r).fill(undefined), this.#u = new W(r), this.#h = new W(r), this.#a = 0, this.#s = 0, this.#b = aa.create(r), this.#i = 0, this.#y = 0, typeof c == "function" && (this.#p = c), typeof h == "function" ? (this.#g = h, this.#o = []) : (this.#g = undefined, this.#o = undefined), this.#_ = !!this.#p, this.#f = !!this.#g, this.noDisposeOnSet = !!d, this.noUpdateTTL = !!g, this.noDeleteOnFetchRejection = !!I, this.allowStaleOnFetchRejection = !!R, this.allowStaleOnFetchAbort = !!U, this.ignoreFetchAbort = !!N, this.maxEntrySize !== 0) {
        if (this.#c !== 0 && !Ht(this.#c))
          throw new TypeError("maxSize must be a positive integer if specified");
        if (!Ht(this.maxEntrySize))
          throw new TypeError("maxEntrySize must be a positive integer if specified");
        this.#q();
      }
      if (this.allowStale = !!l, this.noDeleteOnStaleGet = !!C, this.updateAgeOnGet = !!s, this.updateAgeOnHas = !!a, this.ttlResolution = Ht(n) || n === 0 ? n : 1, this.ttlAutopurge = !!o, this.ttl = i || 0, this.ttl) {
        if (!Ht(this.ttl))
          throw new TypeError("ttl must be a positive integer if specified");
        this.#x();
      }
      if (this.#l === 0 && this.ttl === 0 && this.#c === 0)
        throw new TypeError("At least one of max, maxSize, or ttl is required");
      if (!this.ttlAutopurge && !this.#l && !this.#c) {
        let K = "LRU_CACHE_UNBOUNDED";
        _1(K) && (Jd.add(K), Xd("TTL caching without ttlAutopurge, max, or maxSize can result in unbounded memory consumption.", "UnboundedCacheWarning", K, t));
      }
    }
    getRemainingTTL(e) {
      return this.#n.has(e) ? 1 / 0 : 0;
    }
    #x() {
      let e = new Zr(this.#l), r = new Zr(this.#l);
      this.#w = e, this.#S = r, this.#M = (o, s, a = Ri.now()) => {
        if (r[o] = s !== 0 ? a : 0, e[o] = s, s !== 0 && this.ttlAutopurge) {
          let l = setTimeout(() => {
            this.#d(o) && this.delete(this.#r[o]);
          }, s + 1);
          l.unref && l.unref();
        }
      }, this.#T = (o) => {
        r[o] = e[o] !== 0 ? Ri.now() : 0;
      }, this.#A = (o, s) => {
        if (e[s]) {
          let a = e[s], l = r[s];
          o.ttl = a, o.start = l, o.now = i || n();
          let c = o.now - l;
          o.remainingTTL = a - c;
        }
      };
      let i = 0, n = () => {
        let o = Ri.now();
        if (this.ttlResolution > 0) {
          i = o;
          let s = setTimeout(() => i = 0, this.ttlResolution);
          s.unref && s.unref();
        }
        return o;
      };
      this.getRemainingTTL = (o) => {
        let s = this.#n.get(o);
        if (s === undefined)
          return 0;
        let a = e[s], l = r[s];
        if (a === 0 || l === 0)
          return 1 / 0;
        let c = (i || n()) - l;
        return a - c;
      }, this.#d = (o) => e[o] !== 0 && r[o] !== 0 && (i || n()) - r[o] > e[o];
    }
    #T = () => {
    };
    #A = () => {
    };
    #M = () => {
    };
    #d = () => false;
    #q() {
      let e = new Zr(this.#l);
      this.#y = 0, this.#E = e, this.#R = (r) => {
        this.#y -= e[r], e[r] = 0;
      }, this.#L = (r, i, n, o) => {
        if (this.#t(i))
          return 0;
        if (!Ht(n))
          if (o) {
            if (typeof o != "function")
              throw new TypeError("sizeCalculation must be a function");
            if (n = o(i, r), !Ht(n))
              throw new TypeError("sizeCalculation return invalid (expect positive integer)");
          } else
            throw new TypeError("invalid size value (must be positive integer). When maxSize or maxEntrySize is used, sizeCalculation or size must be set.");
        return n;
      }, this.#P = (r, i, n) => {
        if (e[r] = i, this.#c) {
          let o = this.#c - e[r];
          for (;this.#y > o; )
            this.#k(true);
        }
        this.#y += e[r], n && (n.entrySize = i, n.totalCalculatedSize = this.#y);
      };
    }
    #R = (e) => {
    };
    #P = (e, r, i) => {
    };
    #L = (e, r, i, n) => {
      if (i || n)
        throw new TypeError("cannot set size without setting maxSize or maxEntrySize on cache");
      return 0;
    };
    *#m({ allowStale: e = this.allowStale } = {}) {
      if (this.#i)
        for (let r = this.#s;!(!this.#U(r) || ((e || !this.#d(r)) && (yield r), r === this.#a)); )
          r = this.#h[r];
    }
    *#v({ allowStale: e = this.allowStale } = {}) {
      if (this.#i)
        for (let r = this.#a;!(!this.#U(r) || ((e || !this.#d(r)) && (yield r), r === this.#s)); )
          r = this.#u[r];
    }
    #U(e) {
      return e !== undefined && this.#n.get(this.#r[e]) === e;
    }
    *entries() {
      for (let e of this.#m())
        this.#e[e] !== undefined && this.#r[e] !== undefined && !this.#t(this.#e[e]) && (yield [this.#r[e], this.#e[e]]);
    }
    *rentries() {
      for (let e of this.#v())
        this.#e[e] !== undefined && this.#r[e] !== undefined && !this.#t(this.#e[e]) && (yield [this.#r[e], this.#e[e]]);
    }
    *keys() {
      for (let e of this.#m()) {
        let r = this.#r[e];
        r !== undefined && !this.#t(this.#e[e]) && (yield r);
      }
    }
    *rkeys() {
      for (let e of this.#v()) {
        let r = this.#r[e];
        r !== undefined && !this.#t(this.#e[e]) && (yield r);
      }
    }
    *values() {
      for (let e of this.#m())
        this.#e[e] !== undefined && !this.#t(this.#e[e]) && (yield this.#e[e]);
    }
    *rvalues() {
      for (let e of this.#v())
        this.#e[e] !== undefined && !this.#t(this.#e[e]) && (yield this.#e[e]);
    }
    [Symbol.iterator]() {
      return this.entries();
    }
    find(e, r = {}) {
      for (let i of this.#m()) {
        let n = this.#e[i], o = this.#t(n) ? n.__staleWhileFetching : n;
        if (o !== undefined && e(o, this.#r[i], this))
          return this.get(this.#r[i], r);
      }
    }
    forEach(e, r = this) {
      for (let i of this.#m()) {
        let n = this.#e[i], o = this.#t(n) ? n.__staleWhileFetching : n;
        o !== undefined && e.call(r, o, this.#r[i], this);
      }
    }
    rforEach(e, r = this) {
      for (let i of this.#v()) {
        let n = this.#e[i], o = this.#t(n) ? n.__staleWhileFetching : n;
        o !== undefined && e.call(r, o, this.#r[i], this);
      }
    }
    purgeStale() {
      let e = false;
      for (let r of this.#v({ allowStale: true }))
        this.#d(r) && (this.delete(this.#r[r]), e = true);
      return e;
    }
    dump() {
      let e = [];
      for (let r of this.#m({ allowStale: true })) {
        let i = this.#r[r], n = this.#e[r], o = this.#t(n) ? n.__staleWhileFetching : n;
        if (o === undefined || i === undefined)
          continue;
        let s = { value: o };
        if (this.#w && this.#S) {
          s.ttl = this.#w[r];
          let a = Ri.now() - this.#S[r];
          s.start = Math.floor(Date.now() - a);
        }
        this.#E && (s.size = this.#E[r]), e.unshift([i, s]);
      }
      return e;
    }
    load(e) {
      this.clear();
      for (let [r, i] of e) {
        if (i.start) {
          let n = Date.now() - i.start;
          i.start = Ri.now() - n;
        }
        this.set(r, i.value, i);
      }
    }
    set(e, r, i = {}) {
      if (r === undefined)
        return this.delete(e), this;
      let { ttl: n = this.ttl, start: o, noDisposeOnSet: s = this.noDisposeOnSet, sizeCalculation: a = this.sizeCalculation, status: l } = i, { noUpdateTTL: c = this.noUpdateTTL } = i, h = this.#L(e, r, i.size || 0, a);
      if (this.maxEntrySize && h > this.maxEntrySize)
        return l && (l.set = "miss", l.maxEntrySizeExceeded = true), this.delete(e), this;
      let d = this.#i === 0 ? undefined : this.#n.get(e);
      if (d === undefined)
        d = this.#i === 0 ? this.#s : this.#b.length !== 0 ? this.#b.pop() : this.#i === this.#l ? this.#k(false) : this.#i, this.#r[d] = e, this.#e[d] = r, this.#n.set(e, d), this.#u[this.#s] = d, this.#h[d] = this.#s, this.#s = d, this.#i++, this.#P(d, h, l), l && (l.set = "add"), c = false;
      else {
        this.#C(d);
        let g = this.#e[d];
        if (r !== g) {
          if (this.#I && this.#t(g)) {
            g.__abortController.abort(new Error("replaced"));
            let { __staleWhileFetching: y } = g;
            y !== undefined && !s && (this.#_ && this.#p?.(y, e, "set"), this.#f && this.#o?.push([y, e, "set"]));
          } else
            s || (this.#_ && this.#p?.(g, e, "set"), this.#f && this.#o?.push([g, e, "set"]));
          if (this.#R(d), this.#P(d, h, l), this.#e[d] = r, l) {
            l.set = "replace";
            let y = g && this.#t(g) ? g.__staleWhileFetching : g;
            y !== undefined && (l.oldValue = y);
          }
        } else
          l && (l.set = "update");
      }
      if (n !== 0 && !this.#w && this.#x(), this.#w && (c || this.#M(d, n, o), l && this.#A(l, d)), !s && this.#f && this.#o) {
        let g = this.#o, y;
        for (;y = g?.shift(); )
          this.#g?.(...y);
      }
      return this;
    }
    pop() {
      try {
        for (;this.#i; ) {
          let e = this.#e[this.#a];
          if (this.#k(true), this.#t(e)) {
            if (e.__staleWhileFetching)
              return e.__staleWhileFetching;
          } else if (e !== undefined)
            return e;
        }
      } finally {
        if (this.#f && this.#o) {
          let e = this.#o, r;
          for (;r = e?.shift(); )
            this.#g?.(...r);
        }
      }
    }
    #k(e) {
      let r = this.#a, i = this.#r[r], n = this.#e[r];
      return this.#I && this.#t(n) ? n.__abortController.abort(new Error("evicted")) : (this.#_ || this.#f) && (this.#_ && this.#p?.(n, i, "evict"), this.#f && this.#o?.push([n, i, "evict"])), this.#R(r), e && (this.#r[r] = undefined, this.#e[r] = undefined, this.#b.push(r)), this.#i === 1 ? (this.#a = this.#s = 0, this.#b.length = 0) : this.#a = this.#u[r], this.#n.delete(i), this.#i--, r;
    }
    has(e, r = {}) {
      let { updateAgeOnHas: i = this.updateAgeOnHas, status: n } = r, o = this.#n.get(e);
      if (o !== undefined) {
        let s = this.#e[o];
        if (this.#t(s) && s.__staleWhileFetching === undefined)
          return false;
        if (this.#d(o))
          n && (n.has = "stale", this.#A(n, o));
        else
          return i && this.#T(o), n && (n.has = "hit", this.#A(n, o)), true;
      } else
        n && (n.has = "miss");
      return false;
    }
    peek(e, r = {}) {
      let { allowStale: i = this.allowStale } = r, n = this.#n.get(e);
      if (n !== undefined && (i || !this.#d(n))) {
        let o = this.#e[n];
        return this.#t(o) ? o.__staleWhileFetching : o;
      }
    }
    #O(e, r, i, n) {
      let o = r === undefined ? undefined : this.#e[r];
      if (this.#t(o))
        return o;
      let s = new xn, { signal: a } = i;
      a?.addEventListener("abort", () => s.abort(a.reason), { signal: s.signal });
      let l = { signal: s.signal, options: i, context: n }, c = (S, E = false) => {
        let { aborted: I } = s.signal, C = i.ignoreFetchAbort && S !== undefined;
        if (i.status && (I && !E ? (i.status.fetchAborted = true, i.status.fetchError = s.signal.reason, C && (i.status.fetchAbortIgnored = true)) : i.status.fetchResolved = true), I && !C && !E)
          return d(s.signal.reason);
        let R = y;
        return this.#e[r] === y && (S === undefined ? R.__staleWhileFetching ? this.#e[r] = R.__staleWhileFetching : this.delete(e) : (i.status && (i.status.fetchUpdated = true), this.set(e, S, l.options))), S;
      }, h = (S) => (i.status && (i.status.fetchRejected = true, i.status.fetchError = S), d(S)), d = (S) => {
        let { aborted: E } = s.signal, I = E && i.allowStaleOnFetchAbort, C = I || i.allowStaleOnFetchRejection, R = C || i.noDeleteOnFetchRejection, U = y;
        if (this.#e[r] === y && (!R || U.__staleWhileFetching === undefined ? this.delete(e) : I || (this.#e[r] = U.__staleWhileFetching)), C)
          return i.status && U.__staleWhileFetching !== undefined && (i.status.returnedStale = true), U.__staleWhileFetching;
        if (U.__returned === U)
          throw S;
      }, g = (S, E) => {
        let I = this.#B?.(e, o, l);
        I && I instanceof Promise && I.then((C) => S(C === undefined ? undefined : C), E), s.signal.addEventListener("abort", () => {
          (!i.ignoreFetchAbort || i.allowStaleOnFetchAbort) && (S(undefined), i.allowStaleOnFetchAbort && (S = (C) => c(C, true)));
        });
      };
      i.status && (i.status.fetchDispatched = true);
      let y = new Promise(g).then(c, h), w = Object.assign(y, { __abortController: s, __staleWhileFetching: o, __returned: undefined });
      return r === undefined ? (this.set(e, w, { ...l.options, status: undefined }), r = this.#n.get(e)) : this.#e[r] = w, w;
    }
    #t(e) {
      if (!this.#I)
        return false;
      let r = e;
      return !!r && r instanceof Promise && r.hasOwnProperty("__staleWhileFetching") && r.__abortController instanceof xn;
    }
    async fetch(e, r = {}) {
      let { allowStale: i = this.allowStale, updateAgeOnGet: n = this.updateAgeOnGet, noDeleteOnStaleGet: o = this.noDeleteOnStaleGet, ttl: s = this.ttl, noDisposeOnSet: a = this.noDisposeOnSet, size: l = 0, sizeCalculation: c = this.sizeCalculation, noUpdateTTL: h = this.noUpdateTTL, noDeleteOnFetchRejection: d = this.noDeleteOnFetchRejection, allowStaleOnFetchRejection: g = this.allowStaleOnFetchRejection, ignoreFetchAbort: y = this.ignoreFetchAbort, allowStaleOnFetchAbort: w = this.allowStaleOnFetchAbort, context: S, forceRefresh: E = false, status: I, signal: C } = r;
      if (!this.#I)
        return I && (I.fetch = "get"), this.get(e, { allowStale: i, updateAgeOnGet: n, noDeleteOnStaleGet: o, status: I });
      let R = { allowStale: i, updateAgeOnGet: n, noDeleteOnStaleGet: o, ttl: s, noDisposeOnSet: a, size: l, sizeCalculation: c, noUpdateTTL: h, noDeleteOnFetchRejection: d, allowStaleOnFetchRejection: g, allowStaleOnFetchAbort: w, ignoreFetchAbort: y, status: I, signal: C }, U = this.#n.get(e);
      if (U === undefined) {
        I && (I.fetch = "miss");
        let N = this.#O(e, U, R, S);
        return N.__returned = N;
      } else {
        let N = this.#e[U];
        if (this.#t(N)) {
          let pe = i && N.__staleWhileFetching !== undefined;
          return I && (I.fetch = "inflight", pe && (I.returnedStale = true)), pe ? N.__staleWhileFetching : N.__returned = N;
        }
        let W = this.#d(U);
        if (!E && !W)
          return I && (I.fetch = "hit"), this.#C(U), n && this.#T(U), I && this.#A(I, U), N;
        let K = this.#O(e, U, R, S), Q = K.__staleWhileFetching !== undefined && i;
        return I && (I.fetch = W ? "stale" : "refresh", Q && W && (I.returnedStale = true)), Q ? K.__staleWhileFetching : K.__returned = K;
      }
    }
    get(e, r = {}) {
      let { allowStale: i = this.allowStale, updateAgeOnGet: n = this.updateAgeOnGet, noDeleteOnStaleGet: o = this.noDeleteOnStaleGet, status: s } = r, a = this.#n.get(e);
      if (a !== undefined) {
        let l = this.#e[a], c = this.#t(l);
        return s && this.#A(s, a), this.#d(a) ? (s && (s.get = "stale"), c ? (s && i && l.__staleWhileFetching !== undefined && (s.returnedStale = true), i ? l.__staleWhileFetching : undefined) : (o || this.delete(e), s && i && (s.returnedStale = true), i ? l : undefined)) : (s && (s.get = "hit"), c ? l.__staleWhileFetching : (this.#C(a), n && this.#T(a), l));
      } else
        s && (s.get = "miss");
    }
    #N(e, r) {
      this.#h[r] = e, this.#u[e] = r;
    }
    #C(e) {
      e !== this.#s && (e === this.#a ? this.#a = this.#u[e] : this.#N(this.#h[e], this.#u[e]), this.#N(this.#s, e), this.#s = e);
    }
    delete(e) {
      let r = false;
      if (this.#i !== 0) {
        let i = this.#n.get(e);
        if (i !== undefined)
          if (r = true, this.#i === 1)
            this.clear();
          else {
            this.#R(i);
            let n = this.#e[i];
            this.#t(n) ? n.__abortController.abort(new Error("deleted")) : (this.#_ || this.#f) && (this.#_ && this.#p?.(n, e, "delete"), this.#f && this.#o?.push([n, e, "delete"])), this.#n.delete(e), this.#r[i] = undefined, this.#e[i] = undefined, i === this.#s ? this.#s = this.#h[i] : i === this.#a ? this.#a = this.#u[i] : (this.#u[this.#h[i]] = this.#u[i], this.#h[this.#u[i]] = this.#h[i]), this.#i--, this.#b.push(i);
          }
      }
      if (this.#f && this.#o?.length) {
        let i = this.#o, n;
        for (;n = i?.shift(); )
          this.#g?.(...n);
      }
      return r;
    }
    clear() {
      for (let e of this.#v({ allowStale: true })) {
        let r = this.#e[e];
        if (this.#t(r))
          r.__abortController.abort(new Error("deleted"));
        else {
          let i = this.#r[e];
          this.#_ && this.#p?.(r, i, "delete"), this.#f && this.#o?.push([r, i, "delete"]);
        }
      }
      if (this.#n.clear(), this.#e.fill(undefined), this.#r.fill(undefined), this.#w && this.#S && (this.#w.fill(0), this.#S.fill(0)), this.#E && this.#E.fill(0), this.#a = 0, this.#s = 0, this.#b.length = 0, this.#y = 0, this.#i = 0, this.#f && this.#o) {
        let e = this.#o, r;
        for (;r = e?.shift(); )
          this.#g?.(...r);
      }
    }
  };
  Mn.LRUCache = la;
});
var lt = M((Vt) => {
  _();
  v();
  m();
  Object.defineProperty(Vt, "t", { value: true });
  Vt.ContainerIterator = Vt.Container = Vt.Base = undefined;
  var ua = class {
    constructor(e = 0) {
      this.iteratorType = e;
    }
    equals(e) {
      return this.o === e.o;
    }
  };
  Vt.ContainerIterator = ua;
  var Ln = class {
    constructor() {
      this.i = 0;
    }
    get length() {
      return this.i;
    }
    size() {
      return this.i;
    }
    empty() {
      return this.i === 0;
    }
  };
  Vt.Base = Ln;
  var fa = class extends Ln {
  };
  Vt.Container = fa;
});
var tp = M((Un) => {
  _();
  v();
  m();
  Object.defineProperty(Un, "t", { value: true });
  Un.default = undefined;
  var m1 = lt(), ca = class extends m1.Base {
    constructor(e = []) {
      super(), this.S = [];
      let r = this;
      e.forEach(function(i) {
        r.push(i);
      });
    }
    clear() {
      this.i = 0, this.S = [];
    }
    push(e) {
      return this.S.push(e), this.i += 1, this.i;
    }
    pop() {
      if (this.i !== 0)
        return this.i -= 1, this.S.pop();
    }
    top() {
      return this.S[this.i - 1];
    }
  }, v1 = ca;
  Un.default = v1;
});
var rp = M((Nn) => {
  _();
  v();
  m();
  Object.defineProperty(Nn, "t", { value: true });
  Nn.default = undefined;
  var E1 = lt(), ha = class extends E1.Base {
    constructor(e = []) {
      super(), this.j = 0, this.q = [];
      let r = this;
      e.forEach(function(i) {
        r.push(i);
      });
    }
    clear() {
      this.q = [], this.i = this.j = 0;
    }
    push(e) {
      let r = this.q.length;
      if (this.j / r > 0.5 && this.j + this.i >= r && r > 4096) {
        let i = this.i;
        for (let n = 0;n < i; ++n)
          this.q[n] = this.q[this.j + n];
        this.j = 0, this.q[this.i] = e;
      } else
        this.q[this.j + this.i] = e;
      return ++this.i;
    }
    pop() {
      if (this.i === 0)
        return;
      let e = this.q[this.j++];
      return this.i -= 1, e;
    }
    front() {
      if (this.i !== 0)
        return this.q[this.j];
    }
  }, S1 = ha;
  Nn.default = S1;
});
var ip = M((qn) => {
  _();
  v();
  m();
  Object.defineProperty(qn, "t", { value: true });
  qn.default = undefined;
  var A1 = lt(), da = class extends A1.Base {
    constructor(e = [], r = function(n, o) {
      return n > o ? -1 : n < o ? 1 : 0;
    }, i = true) {
      if (super(), this.v = r, Array.isArray(e))
        this.C = i ? [...e] : e;
      else {
        this.C = [];
        let o = this;
        e.forEach(function(s) {
          o.C.push(s);
        });
      }
      this.i = this.C.length;
      let n = this.i >> 1;
      for (let o = this.i - 1 >> 1;o >= 0; --o)
        this.k(o, n);
    }
    m(e) {
      let r = this.C[e];
      for (;e > 0; ) {
        let i = e - 1 >> 1, n = this.C[i];
        if (this.v(n, r) <= 0)
          break;
        this.C[e] = n, e = i;
      }
      this.C[e] = r;
    }
    k(e, r) {
      let i = this.C[e];
      for (;e < r; ) {
        let n = e << 1 | 1, o = n + 1, s = this.C[n];
        if (o < this.i && this.v(s, this.C[o]) > 0 && (n = o, s = this.C[o]), this.v(s, i) >= 0)
          break;
        this.C[e] = s, e = n;
      }
      this.C[e] = i;
    }
    clear() {
      this.i = 0, this.C.length = 0;
    }
    push(e) {
      this.C.push(e), this.m(this.i), this.i += 1;
    }
    pop() {
      if (this.i === 0)
        return;
      let e = this.C[0], r = this.C.pop();
      return this.i -= 1, this.i && (this.C[0] = r, this.k(0, this.i >> 1)), e;
    }
    top() {
      return this.C[0];
    }
    find(e) {
      return this.C.indexOf(e) >= 0;
    }
    remove(e) {
      let r = this.C.indexOf(e);
      return r < 0 ? false : (r === 0 ? this.pop() : r === this.i - 1 ? (this.C.pop(), this.i -= 1) : (this.C.splice(r, 1, this.C.pop()), this.i -= 1, this.m(r), this.k(r, this.i >> 1)), true);
    }
    updateItem(e) {
      let r = this.C.indexOf(e);
      return r < 0 ? false : (this.m(r), this.k(r, this.i >> 1), true);
    }
    toArray() {
      return [...this.C];
    }
  }, I1 = da;
  qn.default = I1;
});
var jn = M((Dn) => {
  _();
  v();
  m();
  Object.defineProperty(Dn, "t", { value: true });
  Dn.default = undefined;
  var T1 = lt(), pa = class extends T1.Container {
  }, R1 = pa;
  Dn.default = R1;
});
var ut = M((ga) => {
  _();
  v();
  m();
  Object.defineProperty(ga, "t", { value: true });
  ga.throwIteratorAccessError = C1;
  function C1() {
    throw new RangeError("Iterator access denied!");
  }
});
var ba = M((Wn) => {
  _();
  v();
  m();
  Object.defineProperty(Wn, "t", { value: true });
  Wn.RandomIterator = undefined;
  var B1 = lt(), Fn = ut(), ya = class extends B1.ContainerIterator {
    constructor(e, r) {
      super(r), this.o = e, this.iteratorType === 0 ? (this.pre = function() {
        return this.o === 0 && (0, Fn.throwIteratorAccessError)(), this.o -= 1, this;
      }, this.next = function() {
        return this.o === this.container.size() && (0, Fn.throwIteratorAccessError)(), this.o += 1, this;
      }) : (this.pre = function() {
        return this.o === this.container.size() - 1 && (0, Fn.throwIteratorAccessError)(), this.o += 1, this;
      }, this.next = function() {
        return this.o === -1 && (0, Fn.throwIteratorAccessError)(), this.o -= 1, this;
      });
    }
    get pointer() {
      return this.container.getElementByPos(this.o);
    }
    set pointer(e) {
      this.container.setElementByPos(this.o, e);
    }
  };
  Wn.RandomIterator = ya;
});
var np = M(($n) => {
  _();
  v();
  m();
  Object.defineProperty($n, "t", { value: true });
  $n.default = undefined;
  var P1 = O1(jn()), k1 = ba();
  function O1(t) {
    return t && t.t ? t : { default: t };
  }
  var mr = class t extends k1.RandomIterator {
    constructor(e, r, i) {
      super(e, i), this.container = r;
    }
    copy() {
      return new t(this.o, this.container, this.iteratorType);
    }
  }, wa = class extends P1.default {
    constructor(e = [], r = true) {
      if (super(), Array.isArray(e))
        this.J = r ? [...e] : e, this.i = e.length;
      else {
        this.J = [];
        let i = this;
        e.forEach(function(n) {
          i.pushBack(n);
        });
      }
    }
    clear() {
      this.i = 0, this.J.length = 0;
    }
    begin() {
      return new mr(0, this);
    }
    end() {
      return new mr(this.i, this);
    }
    rBegin() {
      return new mr(this.i - 1, this, 1);
    }
    rEnd() {
      return new mr(-1, this, 1);
    }
    front() {
      return this.J[0];
    }
    back() {
      return this.J[this.i - 1];
    }
    getElementByPos(e) {
      if (e < 0 || e > this.i - 1)
        throw new RangeError;
      return this.J[e];
    }
    eraseElementByPos(e) {
      if (e < 0 || e > this.i - 1)
        throw new RangeError;
      return this.J.splice(e, 1), this.i -= 1, this.i;
    }
    eraseElementByValue(e) {
      let r = 0;
      for (let i = 0;i < this.i; ++i)
        this.J[i] !== e && (this.J[r++] = this.J[i]);
      return this.i = this.J.length = r, this.i;
    }
    eraseElementByIterator(e) {
      let r = e.o;
      return e = e.next(), this.eraseElementByPos(r), e;
    }
    pushBack(e) {
      return this.J.push(e), this.i += 1, this.i;
    }
    popBack() {
      if (this.i !== 0)
        return this.i -= 1, this.J.pop();
    }
    setElementByPos(e, r) {
      if (e < 0 || e > this.i - 1)
        throw new RangeError;
      this.J[e] = r;
    }
    insert(e, r, i = 1) {
      if (e < 0 || e > this.i)
        throw new RangeError;
      return this.J.splice(e, 0, ...new Array(i).fill(r)), this.i += i, this.i;
    }
    find(e) {
      for (let r = 0;r < this.i; ++r)
        if (this.J[r] === e)
          return new mr(r, this);
      return this.end();
    }
    reverse() {
      this.J.reverse();
    }
    unique() {
      let e = 1;
      for (let r = 1;r < this.i; ++r)
        this.J[r] !== this.J[r - 1] && (this.J[e++] = this.J[r]);
      return this.i = this.J.length = e, this.i;
    }
    sort(e) {
      this.J.sort(e);
    }
    forEach(e) {
      for (let r = 0;r < this.i; ++r)
        e(this.J[r], r, this);
    }
    [Symbol.iterator]() {
      return function* () {
        yield* this.J;
      }.bind(this)();
    }
  }, x1 = wa;
  $n.default = x1;
});
var sp = M((Hn) => {
  _();
  v();
  m();
  Object.defineProperty(Hn, "t", { value: true });
  Hn.default = undefined;
  var M1 = U1(jn()), L1 = lt(), vr = ut();
  function U1(t) {
    return t && t.t ? t : { default: t };
  }
  var Er = class t extends L1.ContainerIterator {
    constructor(e, r, i, n) {
      super(n), this.o = e, this.h = r, this.container = i, this.iteratorType === 0 ? (this.pre = function() {
        return this.o.L === this.h && (0, vr.throwIteratorAccessError)(), this.o = this.o.L, this;
      }, this.next = function() {
        return this.o === this.h && (0, vr.throwIteratorAccessError)(), this.o = this.o.B, this;
      }) : (this.pre = function() {
        return this.o.B === this.h && (0, vr.throwIteratorAccessError)(), this.o = this.o.B, this;
      }, this.next = function() {
        return this.o === this.h && (0, vr.throwIteratorAccessError)(), this.o = this.o.L, this;
      });
    }
    get pointer() {
      return this.o === this.h && (0, vr.throwIteratorAccessError)(), this.o.l;
    }
    set pointer(e) {
      this.o === this.h && (0, vr.throwIteratorAccessError)(), this.o.l = e;
    }
    copy() {
      return new t(this.o, this.h, this.container, this.iteratorType);
    }
  }, _a = class extends M1.default {
    constructor(e = []) {
      super(), this.h = {}, this.p = this._ = this.h.L = this.h.B = this.h;
      let r = this;
      e.forEach(function(i) {
        r.pushBack(i);
      });
    }
    V(e) {
      let { L: r, B: i } = e;
      r.B = i, i.L = r, e === this.p && (this.p = i), e === this._ && (this._ = r), this.i -= 1;
    }
    G(e, r) {
      let i = r.B, n = { l: e, L: r, B: i };
      r.B = n, i.L = n, r === this.h && (this.p = n), i === this.h && (this._ = n), this.i += 1;
    }
    clear() {
      this.i = 0, this.p = this._ = this.h.L = this.h.B = this.h;
    }
    begin() {
      return new Er(this.p, this.h, this);
    }
    end() {
      return new Er(this.h, this.h, this);
    }
    rBegin() {
      return new Er(this._, this.h, this, 1);
    }
    rEnd() {
      return new Er(this.h, this.h, this, 1);
    }
    front() {
      return this.p.l;
    }
    back() {
      return this._.l;
    }
    getElementByPos(e) {
      if (e < 0 || e > this.i - 1)
        throw new RangeError;
      let r = this.p;
      for (;e--; )
        r = r.B;
      return r.l;
    }
    eraseElementByPos(e) {
      if (e < 0 || e > this.i - 1)
        throw new RangeError;
      let r = this.p;
      for (;e--; )
        r = r.B;
      return this.V(r), this.i;
    }
    eraseElementByValue(e) {
      let r = this.p;
      for (;r !== this.h; )
        r.l === e && this.V(r), r = r.B;
      return this.i;
    }
    eraseElementByIterator(e) {
      let r = e.o;
      return r === this.h && (0, vr.throwIteratorAccessError)(), e = e.next(), this.V(r), e;
    }
    pushBack(e) {
      return this.G(e, this._), this.i;
    }
    popBack() {
      if (this.i === 0)
        return;
      let e = this._.l;
      return this.V(this._), e;
    }
    pushFront(e) {
      return this.G(e, this.h), this.i;
    }
    popFront() {
      if (this.i === 0)
        return;
      let e = this.p.l;
      return this.V(this.p), e;
    }
    setElementByPos(e, r) {
      if (e < 0 || e > this.i - 1)
        throw new RangeError;
      let i = this.p;
      for (;e--; )
        i = i.B;
      i.l = r;
    }
    insert(e, r, i = 1) {
      if (e < 0 || e > this.i)
        throw new RangeError;
      if (i <= 0)
        return this.i;
      if (e === 0)
        for (;i--; )
          this.pushFront(r);
      else if (e === this.i)
        for (;i--; )
          this.pushBack(r);
      else {
        let n = this.p;
        for (let s = 1;s < e; ++s)
          n = n.B;
        let o = n.B;
        for (this.i += i;i--; )
          n.B = { l: r, L: n }, n.B.L = n, n = n.B;
        n.B = o, o.L = n;
      }
      return this.i;
    }
    find(e) {
      let r = this.p;
      for (;r !== this.h; ) {
        if (r.l === e)
          return new Er(r, this.h, this);
        r = r.B;
      }
      return this.end();
    }
    reverse() {
      if (this.i <= 1)
        return;
      let e = this.p, r = this._, i = 0;
      for (;i << 1 < this.i; ) {
        let n = e.l;
        e.l = r.l, r.l = n, e = e.B, r = r.L, i += 1;
      }
    }
    unique() {
      if (this.i <= 1)
        return this.i;
      let e = this.p;
      for (;e !== this.h; ) {
        let r = e;
        for (;r.B !== this.h && r.l === r.B.l; )
          r = r.B, this.i -= 1;
        e.B = r.B, e.B.L = e, e = e.B;
      }
      return this.i;
    }
    sort(e) {
      if (this.i <= 1)
        return;
      let r = [];
      this.forEach(function(n) {
        r.push(n);
      }), r.sort(e);
      let i = this.p;
      r.forEach(function(n) {
        i.l = n, i = i.B;
      });
    }
    merge(e) {
      let r = this;
      if (this.i === 0)
        e.forEach(function(i) {
          r.pushBack(i);
        });
      else {
        let i = this.p;
        e.forEach(function(n) {
          for (;i !== r.h && i.l <= n; )
            i = i.B;
          r.G(n, i.L);
        });
      }
      return this.i;
    }
    forEach(e) {
      let r = this.p, i = 0;
      for (;r !== this.h; )
        e(r.l, i++, this), r = r.B;
    }
    [Symbol.iterator]() {
      return function* () {
        if (this.i === 0)
          return;
        let e = this.p;
        for (;e !== this.h; )
          yield e.l, e = e.B;
      }.bind(this)();
    }
  }, N1 = _a;
  Hn.default = N1;
});
var op = M((Vn) => {
  _();
  v();
  m();
  Object.defineProperty(Vn, "t", { value: true });
  Vn.default = undefined;
  var q1 = j1(jn()), D1 = ba();
  function j1(t) {
    return t && t.t ? t : { default: t };
  }
  var Sr = class t extends D1.RandomIterator {
    constructor(e, r, i) {
      super(e, i), this.container = r;
    }
    copy() {
      return new t(this.o, this.container, this.iteratorType);
    }
  }, ma = class extends q1.default {
    constructor(e = [], r = 4096) {
      super(), this.j = 0, this.D = 0, this.R = 0, this.N = 0, this.P = 0, this.A = [];
      let i = (() => {
        if (typeof e.length == "number")
          return e.length;
        if (typeof e.size == "number")
          return e.size;
        if (typeof e.size == "function")
          return e.size();
        throw new TypeError("Cannot get the length or size of the container");
      })();
      this.F = r, this.P = Math.max(Math.ceil(i / this.F), 1);
      for (let s = 0;s < this.P; ++s)
        this.A.push(new Array(this.F));
      let n = Math.ceil(i / this.F);
      this.j = this.R = (this.P >> 1) - (n >> 1), this.D = this.N = this.F - i % this.F >> 1;
      let o = this;
      e.forEach(function(s) {
        o.pushBack(s);
      });
    }
    T() {
      let e = [], r = Math.max(this.P >> 1, 1);
      for (let i = 0;i < r; ++i)
        e[i] = new Array(this.F);
      for (let i = this.j;i < this.P; ++i)
        e[e.length] = this.A[i];
      for (let i = 0;i < this.R; ++i)
        e[e.length] = this.A[i];
      e[e.length] = [...this.A[this.R]], this.j = r, this.R = e.length - 1;
      for (let i = 0;i < r; ++i)
        e[e.length] = new Array(this.F);
      this.A = e, this.P = e.length;
    }
    O(e) {
      let r = this.D + e + 1, i = r % this.F, n = i - 1, o = this.j + (r - i) / this.F;
      return i === 0 && (o -= 1), o %= this.P, n < 0 && (n += this.F), { curNodeBucketIndex: o, curNodePointerIndex: n };
    }
    clear() {
      this.A = [new Array(this.F)], this.P = 1, this.j = this.R = this.i = 0, this.D = this.N = this.F >> 1;
    }
    begin() {
      return new Sr(0, this);
    }
    end() {
      return new Sr(this.i, this);
    }
    rBegin() {
      return new Sr(this.i - 1, this, 1);
    }
    rEnd() {
      return new Sr(-1, this, 1);
    }
    front() {
      if (this.i !== 0)
        return this.A[this.j][this.D];
    }
    back() {
      if (this.i !== 0)
        return this.A[this.R][this.N];
    }
    pushBack(e) {
      return this.i && (this.N < this.F - 1 ? this.N += 1 : this.R < this.P - 1 ? (this.R += 1, this.N = 0) : (this.R = 0, this.N = 0), this.R === this.j && this.N === this.D && this.T()), this.i += 1, this.A[this.R][this.N] = e, this.i;
    }
    popBack() {
      if (this.i === 0)
        return;
      let e = this.A[this.R][this.N];
      return this.i !== 1 && (this.N > 0 ? this.N -= 1 : this.R > 0 ? (this.R -= 1, this.N = this.F - 1) : (this.R = this.P - 1, this.N = this.F - 1)), this.i -= 1, e;
    }
    pushFront(e) {
      return this.i && (this.D > 0 ? this.D -= 1 : this.j > 0 ? (this.j -= 1, this.D = this.F - 1) : (this.j = this.P - 1, this.D = this.F - 1), this.j === this.R && this.D === this.N && this.T()), this.i += 1, this.A[this.j][this.D] = e, this.i;
    }
    popFront() {
      if (this.i === 0)
        return;
      let e = this.A[this.j][this.D];
      return this.i !== 1 && (this.D < this.F - 1 ? this.D += 1 : this.j < this.P - 1 ? (this.j += 1, this.D = 0) : (this.j = 0, this.D = 0)), this.i -= 1, e;
    }
    getElementByPos(e) {
      if (e < 0 || e > this.i - 1)
        throw new RangeError;
      let { curNodeBucketIndex: r, curNodePointerIndex: i } = this.O(e);
      return this.A[r][i];
    }
    setElementByPos(e, r) {
      if (e < 0 || e > this.i - 1)
        throw new RangeError;
      let { curNodeBucketIndex: i, curNodePointerIndex: n } = this.O(e);
      this.A[i][n] = r;
    }
    insert(e, r, i = 1) {
      if (e < 0 || e > this.i)
        throw new RangeError;
      if (e === 0)
        for (;i--; )
          this.pushFront(r);
      else if (e === this.i)
        for (;i--; )
          this.pushBack(r);
      else {
        let n = [];
        for (let o = e;o < this.i; ++o)
          n.push(this.getElementByPos(o));
        this.cut(e - 1);
        for (let o = 0;o < i; ++o)
          this.pushBack(r);
        for (let o = 0;o < n.length; ++o)
          this.pushBack(n[o]);
      }
      return this.i;
    }
    cut(e) {
      if (e < 0)
        return this.clear(), 0;
      let { curNodeBucketIndex: r, curNodePointerIndex: i } = this.O(e);
      return this.R = r, this.N = i, this.i = e + 1, this.i;
    }
    eraseElementByPos(e) {
      if (e < 0 || e > this.i - 1)
        throw new RangeError;
      if (e === 0)
        this.popFront();
      else if (e === this.i - 1)
        this.popBack();
      else {
        let r = [];
        for (let n = e + 1;n < this.i; ++n)
          r.push(this.getElementByPos(n));
        this.cut(e), this.popBack();
        let i = this;
        r.forEach(function(n) {
          i.pushBack(n);
        });
      }
      return this.i;
    }
    eraseElementByValue(e) {
      if (this.i === 0)
        return 0;
      let r = [];
      for (let n = 0;n < this.i; ++n) {
        let o = this.getElementByPos(n);
        o !== e && r.push(o);
      }
      let i = r.length;
      for (let n = 0;n < i; ++n)
        this.setElementByPos(n, r[n]);
      return this.cut(i - 1);
    }
    eraseElementByIterator(e) {
      let r = e.o;
      return this.eraseElementByPos(r), e = e.next(), e;
    }
    find(e) {
      for (let r = 0;r < this.i; ++r)
        if (this.getElementByPos(r) === e)
          return new Sr(r, this);
      return this.end();
    }
    reverse() {
      let e = 0, r = this.i - 1;
      for (;e < r; ) {
        let i = this.getElementByPos(e);
        this.setElementByPos(e, this.getElementByPos(r)), this.setElementByPos(r, i), e += 1, r -= 1;
      }
    }
    unique() {
      if (this.i <= 1)
        return this.i;
      let e = 1, r = this.getElementByPos(0);
      for (let i = 1;i < this.i; ++i) {
        let n = this.getElementByPos(i);
        n !== r && (r = n, this.setElementByPos(e++, n));
      }
      for (;this.i > e; )
        this.popBack();
      return this.i;
    }
    sort(e) {
      let r = [];
      for (let i = 0;i < this.i; ++i)
        r.push(this.getElementByPos(i));
      r.sort(e);
      for (let i = 0;i < this.i; ++i)
        this.setElementByPos(i, r[i]);
    }
    shrinkToFit() {
      if (this.i === 0)
        return;
      let e = [];
      this.forEach(function(r) {
        e.push(r);
      }), this.P = Math.max(Math.ceil(this.i / this.F), 1), this.i = this.j = this.R = this.D = this.N = 0, this.A = [];
      for (let r = 0;r < this.P; ++r)
        this.A.push(new Array(this.F));
      for (let r = 0;r < e.length; ++r)
        this.pushBack(e[r]);
    }
    forEach(e) {
      for (let r = 0;r < this.i; ++r)
        e(this.getElementByPos(r), r, this);
    }
    [Symbol.iterator]() {
      return function* () {
        for (let e = 0;e < this.i; ++e)
          yield this.getElementByPos(e);
      }.bind(this)();
    }
  }, F1 = ma;
  Vn.default = F1;
});
var ap = M((ei) => {
  _();
  v();
  m();
  Object.defineProperty(ei, "t", { value: true });
  ei.TreeNodeEnableIndex = ei.TreeNode = undefined;
  var zn = class {
    constructor(e, r) {
      this.ee = 1, this.u = undefined, this.l = undefined, this.U = undefined, this.W = undefined, this.tt = undefined, this.u = e, this.l = r;
    }
    L() {
      let e = this;
      if (e.ee === 1 && e.tt.tt === e)
        e = e.W;
      else if (e.U)
        for (e = e.U;e.W; )
          e = e.W;
      else {
        let r = e.tt;
        for (;r.U === e; )
          e = r, r = e.tt;
        e = r;
      }
      return e;
    }
    B() {
      let e = this;
      if (e.W) {
        for (e = e.W;e.U; )
          e = e.U;
        return e;
      } else {
        let r = e.tt;
        for (;r.W === e; )
          e = r, r = e.tt;
        return e.W !== r ? r : e;
      }
    }
    te() {
      let e = this.tt, r = this.W, i = r.U;
      return e.tt === this ? e.tt = r : e.U === this ? e.U = r : e.W = r, r.tt = e, r.U = this, this.tt = r, this.W = i, i && (i.tt = this), r;
    }
    se() {
      let e = this.tt, r = this.U, i = r.W;
      return e.tt === this ? e.tt = r : e.U === this ? e.U = r : e.W = r, r.tt = e, r.W = this, this.tt = r, this.U = i, i && (i.tt = this), r;
    }
  };
  ei.TreeNode = zn;
  var va = class extends zn {
    constructor() {
      super(...arguments), this.rt = 1;
    }
    te() {
      let e = super.te();
      return this.ie(), e.ie(), e;
    }
    se() {
      let e = super.se();
      return this.ie(), e.ie(), e;
    }
    ie() {
      this.rt = 1, this.U && (this.rt += this.U.rt), this.W && (this.rt += this.W.rt);
    }
  };
  ei.TreeNodeEnableIndex = va;
});
var Sa = M((Kn) => {
  _();
  v();
  m();
  Object.defineProperty(Kn, "t", { value: true });
  Kn.default = undefined;
  var lp = ap(), W1 = lt(), up = ut(), Ea = class extends W1.Container {
    constructor(e = function(i, n) {
      return i < n ? -1 : i > n ? 1 : 0;
    }, r = false) {
      super(), this.Y = undefined, this.v = e, r ? (this.re = lp.TreeNodeEnableIndex, this.M = function(i, n, o) {
        let s = this.ne(i, n, o);
        if (s) {
          let a = s.tt;
          for (;a !== this.h; )
            a.rt += 1, a = a.tt;
          let l = this.he(s);
          if (l) {
            let { parentNode: c, grandParent: h, curNode: d } = l;
            c.ie(), h.ie(), d.ie();
          }
        }
        return this.i;
      }, this.V = function(i) {
        let n = this.fe(i);
        for (;n !== this.h; )
          n.rt -= 1, n = n.tt;
      }) : (this.re = lp.TreeNode, this.M = function(i, n, o) {
        let s = this.ne(i, n, o);
        return s && this.he(s), this.i;
      }, this.V = this.fe), this.h = new this.re;
    }
    X(e, r) {
      let i = this.h;
      for (;e; ) {
        let n = this.v(e.u, r);
        if (n < 0)
          e = e.W;
        else if (n > 0)
          i = e, e = e.U;
        else
          return e;
      }
      return i;
    }
    Z(e, r) {
      let i = this.h;
      for (;e; )
        this.v(e.u, r) <= 0 ? e = e.W : (i = e, e = e.U);
      return i;
    }
    $(e, r) {
      let i = this.h;
      for (;e; ) {
        let n = this.v(e.u, r);
        if (n < 0)
          i = e, e = e.W;
        else if (n > 0)
          e = e.U;
        else
          return e;
      }
      return i;
    }
    rr(e, r) {
      let i = this.h;
      for (;e; )
        this.v(e.u, r) < 0 ? (i = e, e = e.W) : e = e.U;
      return i;
    }
    ue(e) {
      for (;; ) {
        let r = e.tt;
        if (r === this.h)
          return;
        if (e.ee === 1) {
          e.ee = 0;
          return;
        }
        if (e === r.U) {
          let i = r.W;
          if (i.ee === 1)
            i.ee = 0, r.ee = 1, r === this.Y ? this.Y = r.te() : r.te();
          else if (i.W && i.W.ee === 1) {
            i.ee = r.ee, r.ee = 0, i.W.ee = 0, r === this.Y ? this.Y = r.te() : r.te();
            return;
          } else
            i.U && i.U.ee === 1 ? (i.ee = 1, i.U.ee = 0, i.se()) : (i.ee = 1, e = r);
        } else {
          let i = r.U;
          if (i.ee === 1)
            i.ee = 0, r.ee = 1, r === this.Y ? this.Y = r.se() : r.se();
          else if (i.U && i.U.ee === 1) {
            i.ee = r.ee, r.ee = 0, i.U.ee = 0, r === this.Y ? this.Y = r.se() : r.se();
            return;
          } else
            i.W && i.W.ee === 1 ? (i.ee = 1, i.W.ee = 0, i.te()) : (i.ee = 1, e = r);
        }
      }
    }
    fe(e) {
      if (this.i === 1)
        return this.clear(), this.h;
      let r = e;
      for (;r.U || r.W; ) {
        if (r.W)
          for (r = r.W;r.U; )
            r = r.U;
        else
          r = r.U;
        [e.u, r.u] = [r.u, e.u], [e.l, r.l] = [r.l, e.l], e = r;
      }
      this.h.U === r ? this.h.U = r.tt : this.h.W === r && (this.h.W = r.tt), this.ue(r);
      let i = r.tt;
      return r === i.U ? i.U = undefined : i.W = undefined, this.i -= 1, this.Y.ee = 0, i;
    }
    oe(e, r) {
      return e === undefined ? false : this.oe(e.U, r) || r(e) ? true : this.oe(e.W, r);
    }
    he(e) {
      for (;; ) {
        let r = e.tt;
        if (r.ee === 0)
          return;
        let i = r.tt;
        if (r === i.U) {
          let n = i.W;
          if (n && n.ee === 1) {
            if (n.ee = r.ee = 0, i === this.Y)
              return;
            i.ee = 1, e = i;
            continue;
          } else if (e === r.W) {
            if (e.ee = 0, e.U && (e.U.tt = r), e.W && (e.W.tt = i), r.W = e.U, i.U = e.W, e.U = r, e.W = i, i === this.Y)
              this.Y = e, this.h.tt = e;
            else {
              let o = i.tt;
              o.U === i ? o.U = e : o.W = e;
            }
            return e.tt = i.tt, r.tt = e, i.tt = e, i.ee = 1, { parentNode: r, grandParent: i, curNode: e };
          } else
            r.ee = 0, i === this.Y ? this.Y = i.se() : i.se(), i.ee = 1;
        } else {
          let n = i.U;
          if (n && n.ee === 1) {
            if (n.ee = r.ee = 0, i === this.Y)
              return;
            i.ee = 1, e = i;
            continue;
          } else if (e === r.U) {
            if (e.ee = 0, e.U && (e.U.tt = i), e.W && (e.W.tt = r), i.W = e.U, r.U = e.W, e.U = i, e.W = r, i === this.Y)
              this.Y = e, this.h.tt = e;
            else {
              let o = i.tt;
              o.U === i ? o.U = e : o.W = e;
            }
            return e.tt = i.tt, r.tt = e, i.tt = e, i.ee = 1, { parentNode: r, grandParent: i, curNode: e };
          } else
            r.ee = 0, i === this.Y ? this.Y = i.te() : i.te(), i.ee = 1;
        }
        return;
      }
    }
    ne(e, r, i) {
      if (this.Y === undefined) {
        this.i += 1, this.Y = new this.re(e, r), this.Y.ee = 0, this.Y.tt = this.h, this.h.tt = this.Y, this.h.U = this.Y, this.h.W = this.Y;
        return;
      }
      let n, o = this.h.U, s = this.v(o.u, e);
      if (s === 0) {
        o.l = r;
        return;
      } else if (s > 0)
        o.U = new this.re(e, r), o.U.tt = o, n = o.U, this.h.U = n;
      else {
        let a = this.h.W, l = this.v(a.u, e);
        if (l === 0) {
          a.l = r;
          return;
        } else if (l < 0)
          a.W = new this.re(e, r), a.W.tt = a, n = a.W, this.h.W = n;
        else {
          if (i !== undefined) {
            let c = i.o;
            if (c !== this.h) {
              let h = this.v(c.u, e);
              if (h === 0) {
                c.l = r;
                return;
              } else if (h > 0) {
                let d = c.L(), g = this.v(d.u, e);
                if (g === 0) {
                  d.l = r;
                  return;
                } else
                  g < 0 && (n = new this.re(e, r), d.W === undefined ? (d.W = n, n.tt = d) : (c.U = n, n.tt = c));
              }
            }
          }
          if (n === undefined)
            for (n = this.Y;; ) {
              let c = this.v(n.u, e);
              if (c > 0) {
                if (n.U === undefined) {
                  n.U = new this.re(e, r), n.U.tt = n, n = n.U;
                  break;
                }
                n = n.U;
              } else if (c < 0) {
                if (n.W === undefined) {
                  n.W = new this.re(e, r), n.W.tt = n, n = n.W;
                  break;
                }
                n = n.W;
              } else {
                n.l = r;
                return;
              }
            }
        }
      }
      return this.i += 1, n;
    }
    I(e, r) {
      for (;e; ) {
        let i = this.v(e.u, r);
        if (i < 0)
          e = e.W;
        else if (i > 0)
          e = e.U;
        else
          return e;
      }
      return e || this.h;
    }
    clear() {
      this.i = 0, this.Y = undefined, this.h.tt = undefined, this.h.U = this.h.W = undefined;
    }
    updateKeyByIterator(e, r) {
      let i = e.o;
      if (i === this.h && (0, up.throwIteratorAccessError)(), this.i === 1)
        return i.u = r, true;
      if (i === this.h.U)
        return this.v(i.B().u, r) > 0 ? (i.u = r, true) : false;
      if (i === this.h.W)
        return this.v(i.L().u, r) < 0 ? (i.u = r, true) : false;
      let n = i.L().u;
      if (this.v(n, r) >= 0)
        return false;
      let o = i.B().u;
      return this.v(o, r) <= 0 ? false : (i.u = r, true);
    }
    eraseElementByPos(e) {
      if (e < 0 || e > this.i - 1)
        throw new RangeError;
      let r = 0, i = this;
      return this.oe(this.Y, function(n) {
        return e === r ? (i.V(n), true) : (r += 1, false);
      }), this.i;
    }
    eraseElementByKey(e) {
      if (this.i === 0)
        return false;
      let r = this.I(this.Y, e);
      return r === this.h ? false : (this.V(r), true);
    }
    eraseElementByIterator(e) {
      let r = e.o;
      r === this.h && (0, up.throwIteratorAccessError)();
      let i = r.W === undefined;
      return e.iteratorType === 0 ? i && e.next() : (!i || r.U === undefined) && e.next(), this.V(r), e;
    }
    forEach(e) {
      let r = 0;
      for (let i of this)
        e(i, r++, this);
    }
    getElementByPos(e) {
      if (e < 0 || e > this.i - 1)
        throw new RangeError;
      let r, i = 0;
      for (let n of this) {
        if (i === e) {
          r = n;
          break;
        }
        i += 1;
      }
      return r;
    }
    getHeight() {
      if (this.i === 0)
        return 0;
      let e = function(r) {
        return r ? Math.max(e(r.U), e(r.W)) + 1 : 0;
      };
      return e(this.Y);
    }
  }, $1 = Ea;
  Kn.default = $1;
});
var Ia = M((Qn) => {
  _();
  v();
  m();
  Object.defineProperty(Qn, "t", { value: true });
  Qn.default = undefined;
  var H1 = lt(), Gn = ut(), Aa = class extends H1.ContainerIterator {
    constructor(e, r, i) {
      super(i), this.o = e, this.h = r, this.iteratorType === 0 ? (this.pre = function() {
        return this.o === this.h.U && (0, Gn.throwIteratorAccessError)(), this.o = this.o.L(), this;
      }, this.next = function() {
        return this.o === this.h && (0, Gn.throwIteratorAccessError)(), this.o = this.o.B(), this;
      }) : (this.pre = function() {
        return this.o === this.h.W && (0, Gn.throwIteratorAccessError)(), this.o = this.o.B(), this;
      }, this.next = function() {
        return this.o === this.h && (0, Gn.throwIteratorAccessError)(), this.o = this.o.L(), this;
      });
    }
    get index() {
      let e = this.o, r = this.h.tt;
      if (e === this.h)
        return r ? r.rt - 1 : 0;
      let i = 0;
      for (e.U && (i += e.U.rt);e !== r; ) {
        let n = e.tt;
        e === n.W && (i += 1, n.U && (i += n.U.rt)), e = n;
      }
      return i;
    }
  }, V1 = Aa;
  Qn.default = V1;
});
var cp = M((Yn) => {
  _();
  v();
  m();
  Object.defineProperty(Yn, "t", { value: true });
  Yn.default = undefined;
  var z1 = fp(Sa()), K1 = fp(Ia()), G1 = ut();
  function fp(t) {
    return t && t.t ? t : { default: t };
  }
  var Ke = class t extends K1.default {
    constructor(e, r, i, n) {
      super(e, r, n), this.container = i;
    }
    get pointer() {
      return this.o === this.h && (0, G1.throwIteratorAccessError)(), this.o.u;
    }
    copy() {
      return new t(this.o, this.h, this.container, this.iteratorType);
    }
  }, Ta = class extends z1.default {
    constructor(e = [], r, i) {
      super(r, i);
      let n = this;
      e.forEach(function(o) {
        n.insert(o);
      });
    }
    *K(e) {
      e !== undefined && (yield* this.K(e.U), yield e.u, yield* this.K(e.W));
    }
    begin() {
      return new Ke(this.h.U || this.h, this.h, this);
    }
    end() {
      return new Ke(this.h, this.h, this);
    }
    rBegin() {
      return new Ke(this.h.W || this.h, this.h, this, 1);
    }
    rEnd() {
      return new Ke(this.h, this.h, this, 1);
    }
    front() {
      return this.h.U ? this.h.U.u : undefined;
    }
    back() {
      return this.h.W ? this.h.W.u : undefined;
    }
    insert(e, r) {
      return this.M(e, undefined, r);
    }
    find(e) {
      let r = this.I(this.Y, e);
      return new Ke(r, this.h, this);
    }
    lowerBound(e) {
      let r = this.X(this.Y, e);
      return new Ke(r, this.h, this);
    }
    upperBound(e) {
      let r = this.Z(this.Y, e);
      return new Ke(r, this.h, this);
    }
    reverseLowerBound(e) {
      let r = this.$(this.Y, e);
      return new Ke(r, this.h, this);
    }
    reverseUpperBound(e) {
      let r = this.rr(this.Y, e);
      return new Ke(r, this.h, this);
    }
    union(e) {
      let r = this;
      return e.forEach(function(i) {
        r.insert(i);
      }), this.i;
    }
    [Symbol.iterator]() {
      return this.K(this.Y);
    }
  }, Q1 = Ta;
  Yn.default = Q1;
});
var dp = M((Jn) => {
  _();
  v();
  m();
  Object.defineProperty(Jn, "t", { value: true });
  Jn.default = undefined;
  var Y1 = hp(Sa()), J1 = hp(Ia()), X1 = ut();
  function hp(t) {
    return t && t.t ? t : { default: t };
  }
  var Ge = class t extends J1.default {
    constructor(e, r, i, n) {
      super(e, r, n), this.container = i;
    }
    get pointer() {
      this.o === this.h && (0, X1.throwIteratorAccessError)();
      let e = this;
      return new Proxy([], { get(r, i) {
        if (i === "0")
          return e.o.u;
        if (i === "1")
          return e.o.l;
      }, set(r, i, n) {
        if (i !== "1")
          throw new TypeError("props must be 1");
        return e.o.l = n, true;
      } });
    }
    copy() {
      return new t(this.o, this.h, this.container, this.iteratorType);
    }
  }, Ra = class extends Y1.default {
    constructor(e = [], r, i) {
      super(r, i);
      let n = this;
      e.forEach(function(o) {
        n.setElement(o[0], o[1]);
      });
    }
    *K(e) {
      e !== undefined && (yield* this.K(e.U), yield [e.u, e.l], yield* this.K(e.W));
    }
    begin() {
      return new Ge(this.h.U || this.h, this.h, this);
    }
    end() {
      return new Ge(this.h, this.h, this);
    }
    rBegin() {
      return new Ge(this.h.W || this.h, this.h, this, 1);
    }
    rEnd() {
      return new Ge(this.h, this.h, this, 1);
    }
    front() {
      if (this.i === 0)
        return;
      let e = this.h.U;
      return [e.u, e.l];
    }
    back() {
      if (this.i === 0)
        return;
      let e = this.h.W;
      return [e.u, e.l];
    }
    lowerBound(e) {
      let r = this.X(this.Y, e);
      return new Ge(r, this.h, this);
    }
    upperBound(e) {
      let r = this.Z(this.Y, e);
      return new Ge(r, this.h, this);
    }
    reverseLowerBound(e) {
      let r = this.$(this.Y, e);
      return new Ge(r, this.h, this);
    }
    reverseUpperBound(e) {
      let r = this.rr(this.Y, e);
      return new Ge(r, this.h, this);
    }
    setElement(e, r, i) {
      return this.M(e, r, i);
    }
    find(e) {
      let r = this.I(this.Y, e);
      return new Ge(r, this.h, this);
    }
    getElementByKey(e) {
      return this.I(this.Y, e).l;
    }
    union(e) {
      let r = this;
      return e.forEach(function(i) {
        r.setElement(i[0], i[1]);
      }), this.i;
    }
    [Symbol.iterator]() {
      return this.K(this.Y);
    }
  }, Z1 = Ra;
  Jn.default = Z1;
});
var Ba = M((Ca) => {
  _();
  v();
  m();
  Object.defineProperty(Ca, "t", { value: true });
  Ca.default = ev;
  function ev(t) {
    let e = typeof t;
    return e === "object" && t !== null || e === "function";
  }
});
var xa = M((ti) => {
  _();
  v();
  m();
  Object.defineProperty(ti, "t", { value: true });
  ti.HashContainerIterator = ti.HashContainer = undefined;
  var pp = lt(), Pa = tv(Ba()), Ci = ut();
  function tv(t) {
    return t && t.t ? t : { default: t };
  }
  var ka = class extends pp.ContainerIterator {
    constructor(e, r, i) {
      super(i), this.o = e, this.h = r, this.iteratorType === 0 ? (this.pre = function() {
        return this.o.L === this.h && (0, Ci.throwIteratorAccessError)(), this.o = this.o.L, this;
      }, this.next = function() {
        return this.o === this.h && (0, Ci.throwIteratorAccessError)(), this.o = this.o.B, this;
      }) : (this.pre = function() {
        return this.o.B === this.h && (0, Ci.throwIteratorAccessError)(), this.o = this.o.B, this;
      }, this.next = function() {
        return this.o === this.h && (0, Ci.throwIteratorAccessError)(), this.o = this.o.L, this;
      });
    }
  };
  ti.HashContainerIterator = ka;
  var Oa = class extends pp.Container {
    constructor() {
      super(), this.H = [], this.g = {}, this.HASH_TAG = Symbol("@@HASH_TAG"), Object.setPrototypeOf(this.g, null), this.h = {}, this.h.L = this.h.B = this.p = this._ = this.h;
    }
    V(e) {
      let { L: r, B: i } = e;
      r.B = i, i.L = r, e === this.p && (this.p = i), e === this._ && (this._ = r), this.i -= 1;
    }
    M(e, r, i) {
      i === undefined && (i = (0, Pa.default)(e));
      let n;
      if (i) {
        let o = e[this.HASH_TAG];
        if (o !== undefined)
          return this.H[o].l = r, this.i;
        Object.defineProperty(e, this.HASH_TAG, { value: this.H.length, configurable: true }), n = { u: e, l: r, L: this._, B: this.h }, this.H.push(n);
      } else {
        let o = this.g[e];
        if (o)
          return o.l = r, this.i;
        n = { u: e, l: r, L: this._, B: this.h }, this.g[e] = n;
      }
      return this.i === 0 ? (this.p = n, this.h.B = n) : this._.B = n, this._ = n, this.h.L = n, ++this.i;
    }
    I(e, r) {
      if (r === undefined && (r = (0, Pa.default)(e)), r) {
        let i = e[this.HASH_TAG];
        return i === undefined ? this.h : this.H[i];
      } else
        return this.g[e] || this.h;
    }
    clear() {
      let e = this.HASH_TAG;
      this.H.forEach(function(r) {
        delete r.u[e];
      }), this.H = [], this.g = {}, Object.setPrototypeOf(this.g, null), this.i = 0, this.p = this._ = this.h.L = this.h.B = this.h;
    }
    eraseElementByKey(e, r) {
      let i;
      if (r === undefined && (r = (0, Pa.default)(e)), r) {
        let n = e[this.HASH_TAG];
        if (n === undefined)
          return false;
        delete e[this.HASH_TAG], i = this.H[n], delete this.H[n];
      } else {
        if (i = this.g[e], i === undefined)
          return false;
        delete this.g[e];
      }
      return this.V(i), true;
    }
    eraseElementByIterator(e) {
      let r = e.o;
      return r === this.h && (0, Ci.throwIteratorAccessError)(), this.V(r), e.next();
    }
    eraseElementByPos(e) {
      if (e < 0 || e > this.i - 1)
        throw new RangeError;
      let r = this.p;
      for (;e--; )
        r = r.B;
      return this.V(r), this.i;
    }
  };
  ti.HashContainer = Oa;
});
var yp = M((Xn) => {
  _();
  v();
  m();
  Object.defineProperty(Xn, "t", { value: true });
  Xn.default = undefined;
  var gp = xa(), rv = ut(), Ar = class t extends gp.HashContainerIterator {
    constructor(e, r, i, n) {
      super(e, r, n), this.container = i;
    }
    get pointer() {
      return this.o === this.h && (0, rv.throwIteratorAccessError)(), this.o.u;
    }
    copy() {
      return new t(this.o, this.h, this.container, this.iteratorType);
    }
  }, Ma = class extends gp.HashContainer {
    constructor(e = []) {
      super();
      let r = this;
      e.forEach(function(i) {
        r.insert(i);
      });
    }
    begin() {
      return new Ar(this.p, this.h, this);
    }
    end() {
      return new Ar(this.h, this.h, this);
    }
    rBegin() {
      return new Ar(this._, this.h, this, 1);
    }
    rEnd() {
      return new Ar(this.h, this.h, this, 1);
    }
    front() {
      return this.p.u;
    }
    back() {
      return this._.u;
    }
    insert(e, r) {
      return this.M(e, undefined, r);
    }
    getElementByPos(e) {
      if (e < 0 || e > this.i - 1)
        throw new RangeError;
      let r = this.p;
      for (;e--; )
        r = r.B;
      return r.u;
    }
    find(e, r) {
      let i = this.I(e, r);
      return new Ar(i, this.h, this);
    }
    forEach(e) {
      let r = 0, i = this.p;
      for (;i !== this.h; )
        e(i.u, r++, this), i = i.B;
    }
    [Symbol.iterator]() {
      return function* () {
        let e = this.p;
        for (;e !== this.h; )
          yield e.u, e = e.B;
      }.bind(this)();
    }
  }, iv = Ma;
  Xn.default = iv;
});
var wp = M((Zn) => {
  _();
  v();
  m();
  Object.defineProperty(Zn, "t", { value: true });
  Zn.default = undefined;
  var bp = xa(), nv = ov(Ba()), sv = ut();
  function ov(t) {
    return t && t.t ? t : { default: t };
  }
  var Ir = class t extends bp.HashContainerIterator {
    constructor(e, r, i, n) {
      super(e, r, n), this.container = i;
    }
    get pointer() {
      this.o === this.h && (0, sv.throwIteratorAccessError)();
      let e = this;
      return new Proxy([], { get(r, i) {
        if (i === "0")
          return e.o.u;
        if (i === "1")
          return e.o.l;
      }, set(r, i, n) {
        if (i !== "1")
          throw new TypeError("props must be 1");
        return e.o.l = n, true;
      } });
    }
    copy() {
      return new t(this.o, this.h, this.container, this.iteratorType);
    }
  }, La = class extends bp.HashContainer {
    constructor(e = []) {
      super();
      let r = this;
      e.forEach(function(i) {
        r.setElement(i[0], i[1]);
      });
    }
    begin() {
      return new Ir(this.p, this.h, this);
    }
    end() {
      return new Ir(this.h, this.h, this);
    }
    rBegin() {
      return new Ir(this._, this.h, this, 1);
    }
    rEnd() {
      return new Ir(this.h, this.h, this, 1);
    }
    front() {
      if (this.i !== 0)
        return [this.p.u, this.p.l];
    }
    back() {
      if (this.i !== 0)
        return [this._.u, this._.l];
    }
    setElement(e, r, i) {
      return this.M(e, r, i);
    }
    getElementByKey(e, r) {
      if (r === undefined && (r = (0, nv.default)(e)), r) {
        let n = e[this.HASH_TAG];
        return n !== undefined ? this.H[n].l : undefined;
      }
      let i = this.g[e];
      return i ? i.l : undefined;
    }
    getElementByPos(e) {
      if (e < 0 || e > this.i - 1)
        throw new RangeError;
      let r = this.p;
      for (;e--; )
        r = r.B;
      return [r.u, r.l];
    }
    find(e, r) {
      let i = this.I(e, r);
      return new Ir(i, this.h, this);
    }
    forEach(e) {
      let r = 0, i = this.p;
      for (;i !== this.h; )
        e([i.u, i.l], r++, this), i = i.B;
    }
    [Symbol.iterator]() {
      return function* () {
        let e = this.p;
        for (;e !== this.h; )
          yield [e.u, e.l], e = e.B;
      }.bind(this)();
    }
  }, av = La;
  Zn.default = av;
});
var _p = M((je) => {
  _();
  v();
  m();
  Object.defineProperty(je, "t", { value: true });
  Object.defineProperty(je, "Deque", { enumerable: true, get: function() {
    return dv.default;
  } });
  Object.defineProperty(je, "HashMap", { enumerable: true, get: function() {
    return bv.default;
  } });
  Object.defineProperty(je, "HashSet", { enumerable: true, get: function() {
    return yv.default;
  } });
  Object.defineProperty(je, "LinkList", { enumerable: true, get: function() {
    return hv.default;
  } });
  Object.defineProperty(je, "OrderedMap", { enumerable: true, get: function() {
    return gv.default;
  } });
  Object.defineProperty(je, "OrderedSet", { enumerable: true, get: function() {
    return pv.default;
  } });
  Object.defineProperty(je, "PriorityQueue", { enumerable: true, get: function() {
    return fv.default;
  } });
  Object.defineProperty(je, "Queue", { enumerable: true, get: function() {
    return uv.default;
  } });
  Object.defineProperty(je, "Stack", { enumerable: true, get: function() {
    return lv.default;
  } });
  Object.defineProperty(je, "Vector", { enumerable: true, get: function() {
    return cv.default;
  } });
  var lv = ft(tp()), uv = ft(rp()), fv = ft(ip()), cv = ft(np()), hv = ft(sp()), dv = ft(op()), pv = ft(cp()), gv = ft(dp()), yv = ft(yp()), bv = ft(wp());
  function ft(t) {
    return t && t.t ? t : { default: t };
  }
});
var vp = M((AN, mp) => {
  _();
  v();
  m();
  var wv = _p().OrderedSet, ct = ot()("number-allocator:trace"), _v = ot()("number-allocator:error");
  function Re(t, e) {
    this.low = t, this.high = e;
  }
  Re.prototype.equals = function(t) {
    return this.low === t.low && this.high === t.high;
  };
  Re.prototype.compare = function(t) {
    return this.low < t.low && this.high < t.low ? -1 : t.low < this.low && t.high < this.low ? 1 : 0;
  };
  function ht(t, e) {
    if (!(this instanceof ht))
      return new ht(t, e);
    this.min = t, this.max = e, this.ss = new wv([], (r, i) => r.compare(i)), ct("Create"), this.clear();
  }
  ht.prototype.firstVacant = function() {
    return this.ss.size() === 0 ? null : this.ss.front().low;
  };
  ht.prototype.alloc = function() {
    if (this.ss.size() === 0)
      return ct("alloc():empty"), null;
    let t = this.ss.begin(), e = t.pointer.low, r = t.pointer.high, i = e;
    return i + 1 <= r ? this.ss.updateKeyByIterator(t, new Re(e + 1, r)) : this.ss.eraseElementByPos(0), ct("alloc():" + i), i;
  };
  ht.prototype.use = function(t) {
    let e = new Re(t, t), r = this.ss.lowerBound(e);
    if (!r.equals(this.ss.end())) {
      let i = r.pointer.low, n = r.pointer.high;
      return r.pointer.equals(e) ? (this.ss.eraseElementByIterator(r), ct("use():" + t), true) : i > t ? false : i === t ? (this.ss.updateKeyByIterator(r, new Re(i + 1, n)), ct("use():" + t), true) : n === t ? (this.ss.updateKeyByIterator(r, new Re(i, n - 1)), ct("use():" + t), true) : (this.ss.updateKeyByIterator(r, new Re(t + 1, n)), this.ss.insert(new Re(i, t - 1)), ct("use():" + t), true);
    }
    return ct("use():failed"), false;
  };
  ht.prototype.free = function(t) {
    if (t < this.min || t > this.max) {
      _v("free():" + t + " is out of range");
      return;
    }
    let e = new Re(t, t), r = this.ss.upperBound(e);
    if (r.equals(this.ss.end())) {
      if (r.equals(this.ss.begin())) {
        this.ss.insert(e);
        return;
      }
      r.pre();
      let i = r.pointer.high;
      r.pointer.high + 1 === t ? this.ss.updateKeyByIterator(r, new Re(i, t)) : this.ss.insert(e);
    } else if (r.equals(this.ss.begin()))
      if (t + 1 === r.pointer.low) {
        let i = r.pointer.high;
        this.ss.updateKeyByIterator(r, new Re(t, i));
      } else
        this.ss.insert(e);
    else {
      let i = r.pointer.low, n = r.pointer.high;
      r.pre();
      let o = r.pointer.low;
      r.pointer.high + 1 === t ? t + 1 === i ? (this.ss.eraseElementByIterator(r), this.ss.updateKeyByIterator(r, new Re(o, n))) : this.ss.updateKeyByIterator(r, new Re(o, t)) : t + 1 === i ? (this.ss.eraseElementByIterator(r.next()), this.ss.insert(new Re(t, n))) : this.ss.insert(e);
    }
    ct("free():" + t);
  };
  ht.prototype.clear = function() {
    ct("clear()"), this.ss.clear(), this.ss.insert(new Re(this.min, this.max));
  };
  ht.prototype.intervalCount = function() {
    return this.ss.size();
  };
  ht.prototype.dump = function() {
    console.log("length:" + this.ss.size());
    for (let t of this.ss)
      console.log(t);
  };
  mp.exports = ht;
});
var Ua = M((MN, Ep) => {
  _();
  v();
  m();
  var mv = vp();
  Ep.exports.NumberAllocator = mv;
});
var Sp = M((qa) => {
  _();
  v();
  m();
  Object.defineProperty(qa, "__esModule", { value: true });
  var vv = ep(), Ev = Ua(), Na = class {
    constructor(e) {
      e > 0 && (this.aliasToTopic = new vv.LRUCache({ max: e }), this.topicToAlias = {}, this.numberAllocator = new Ev.NumberAllocator(1, e), this.max = e, this.length = 0);
    }
    put(e, r) {
      if (r === 0 || r > this.max)
        return false;
      let i = this.aliasToTopic.get(r);
      return i && delete this.topicToAlias[i], this.aliasToTopic.set(r, e), this.topicToAlias[e] = r, this.numberAllocator.use(r), this.length = this.aliasToTopic.size, true;
    }
    getTopicByAlias(e) {
      return this.aliasToTopic.get(e);
    }
    getAliasByTopic(e) {
      let r = this.topicToAlias[e];
      return typeof r < "u" && this.aliasToTopic.get(r), r;
    }
    clear() {
      this.aliasToTopic.clear(), this.topicToAlias = {}, this.numberAllocator.clear(), this.length = 0;
    }
    getLruAlias() {
      let e = this.numberAllocator.firstVacant();
      return e || [...this.aliasToTopic.keys()][this.aliasToTopic.size - 1];
    }
  };
  qa.default = Na;
});
var Ap = M((Bi) => {
  _();
  v();
  m();
  var Sv = Bi && Bi.__importDefault || function(t) {
    return t && t.__esModule ? t : { default: t };
  };
  Object.defineProperty(Bi, "__esModule", { value: true });
  var Av = Ti(), Iv = Sv(Sp()), Tv = _r(), Rv = (t, e) => {
    t.log("_handleConnack");
    let { options: r } = t, n = r.protocolVersion === 5 ? e.reasonCode : e.returnCode;
    if (clearTimeout(t.connackTimer), delete t.topicAliasSend, e.properties) {
      if (e.properties.topicAliasMaximum) {
        if (e.properties.topicAliasMaximum > 65535) {
          t.emit("error", new Error("topicAliasMaximum from broker is out of range"));
          return;
        }
        e.properties.topicAliasMaximum > 0 && (t.topicAliasSend = new Iv.default(e.properties.topicAliasMaximum));
      }
      e.properties.serverKeepAlive && r.keepalive && (r.keepalive = e.properties.serverKeepAlive), e.properties.maximumPacketSize && (r.properties || (r.properties = {}), r.properties.maximumPacketSize = e.properties.maximumPacketSize);
    }
    if (n === 0)
      t.reconnecting = false, t._onConnect(e);
    else if (n > 0) {
      let o = new Tv.ErrorWithReasonCode(`Connection refused: ${Av.ReasonCodes[n]}`, n);
      t.emit("error", o);
    }
  };
  Bi.default = Rv;
});
var Ip = M((Da) => {
  _();
  v();
  m();
  Object.defineProperty(Da, "__esModule", { value: true });
  var Cv = (t, e, r) => {
    t.log("handling pubrel packet");
    let i = typeof r < "u" ? r : t.noop, { messageId: n } = e, o = { cmd: "pubcomp", messageId: n };
    t.incomingStore.get(e, (s, a) => {
      s ? t._sendPacket(o, i) : (t.emit("message", a.topic, a.payload, a), t.handleMessage(a, (l) => {
        if (l)
          return i(l);
        t.incomingStore.del(a, t.noop), t._sendPacket(o, i);
      }));
    });
  };
  Da.default = Cv;
});
var Tp = M((Pi) => {
  _();
  v();
  m();
  var ki = Pi && Pi.__importDefault || function(t) {
    return t && t.__esModule ? t : { default: t };
  };
  Object.defineProperty(Pi, "__esModule", { value: true });
  var Bv = ki(Vd()), Pv = ki(Qd()), kv = ki(Ap()), Ov = ki(Ti()), xv = ki(Ip()), Mv = (t, e, r) => {
    let { options: i } = t;
    if (i.protocolVersion === 5 && i.properties && i.properties.maximumPacketSize && i.properties.maximumPacketSize < e.length)
      return t.emit("error", new Error(`exceeding packets size ${e.cmd}`)), t.end({ reasonCode: 149, properties: { reasonString: "Maximum packet size was exceeded" } }), t;
    switch (t.log("_handlePacket :: emitting packetreceive"), t.emit("packetreceive", e), e.cmd) {
      case "publish":
        (0, Bv.default)(t, e, r);
        break;
      case "puback":
      case "pubrec":
      case "pubcomp":
      case "suback":
      case "unsuback":
        t.reschedulePing(), (0, Ov.default)(t, e), r();
        break;
      case "pubrel":
        t.reschedulePing(), (0, xv.default)(t, e, r);
        break;
      case "connack":
        (0, kv.default)(t, e), r();
        break;
      case "auth":
        t.reschedulePing(), (0, Pv.default)(t, e), r();
        break;
      case "pingresp":
        t.log("_handlePacket :: received pingresp"), t.reschedulePing(true), r();
        break;
      case "disconnect":
        t.emit("disconnect", e), r();
        break;
      default:
        t.log("_handlePacket :: unknown command"), r();
        break;
    }
  };
  Pi.default = Mv;
});
var Rp = M((ri) => {
  _();
  v();
  m();
  var Lv = ri && ri.__importDefault || function(t) {
    return t && t.__esModule ? t : { default: t };
  };
  Object.defineProperty(ri, "__esModule", { value: true });
  ri.TypedEventEmitter = undefined;
  var Uv = Lv((sr(), X(nr))), Nv = _r(), es = class {
  };
  ri.TypedEventEmitter = es;
  (0, Nv.applyMixin)(es, Uv.default);
});
var Oi = M((Tr) => {
  _();
  v();
  m();
  Object.defineProperty(Tr, "__esModule", { value: true });
  Tr.isReactNativeBrowser = Tr.isWebWorker = undefined;
  var qv = () => {
    var t;
    return typeof window < "u" ? typeof navigator < "u" && ((t = navigator.userAgent) === null || t === undefined ? undefined : t.toLowerCase().indexOf(" electron/")) > -1 && (!(B === null || B === undefined) && B.versions) ? !Object.prototype.hasOwnProperty.call(B.versions, "electron") : typeof window.document < "u" : false;
  }, Cp = () => {
    var t, e;
    return !!(typeof self == "object" && (!((e = (t = self?.constructor) === null || t === undefined ? undefined : t.name) === null || e === undefined) && e.includes("WorkerGlobalScope")));
  }, Bp = () => typeof navigator < "u" && navigator.product === "ReactNative", Dv = qv() || Cp() || Bp();
  Tr.isWebWorker = Cp();
  Tr.isReactNativeBrowser = Bp();
  Tr.default = Dv;
});
var kp = M((ts, Pp) => {
  _();
  v();
  m();
  (function(t, e) {
    typeof ts == "object" && typeof Pp < "u" ? e(ts) : typeof define == "function" && define.amd ? define(["exports"], e) : (t = typeof globalThis < "u" ? globalThis : t || self, e(t.fastUniqueNumbers = {}));
  })(ts, function(t) {
    var e = function(g) {
      return function(y) {
        var w = g(y);
        return y.add(w), w;
      };
    }, r = function(g) {
      return function(y, w) {
        return g.set(y, w), w;
      };
    }, i = Number.MAX_SAFE_INTEGER === undefined ? 9007199254740991 : Number.MAX_SAFE_INTEGER, n = 536870912, o = n * 2, s = function(g, y) {
      return function(w) {
        var S = y.get(w), E = S === undefined ? w.size : S < o ? S + 1 : 0;
        if (!w.has(E))
          return g(w, E);
        if (w.size < n) {
          for (;w.has(E); )
            E = Math.floor(Math.random() * o);
          return g(w, E);
        }
        if (w.size > i)
          throw new Error("Congratulations, you created a collection of unique numbers which uses all available integers!");
        for (;w.has(E); )
          E = Math.floor(Math.random() * i);
        return g(w, E);
      };
    }, a = new WeakMap, l = r(a), c = s(l, a), h = e(c);
    t.addUniqueNumber = h, t.generateUniqueNumber = c;
  });
});
var xp = M((rs, Op) => {
  _();
  v();
  m();
  (function(t, e) {
    typeof rs == "object" && typeof Op < "u" ? e(rs, kp()) : typeof define == "function" && define.amd ? define(["exports", "fast-unique-numbers"], e) : (t = typeof globalThis < "u" ? globalThis : t || self, e(t.workerTimersBroker = {}, t.fastUniqueNumbers));
  })(rs, function(t, e) {
    var r = function(s) {
      return s.method !== undefined && s.method === "call";
    }, i = function(s) {
      return s.error === null && typeof s.id == "number";
    }, n = function(s) {
      var a = new Map([[0, function() {
      }]]), l = new Map([[0, function() {
      }]]), c = new Map, h = new Worker(s);
      h.addEventListener("message", function(S) {
        var E = S.data;
        if (r(E)) {
          var I = E.params, C = I.timerId, R = I.timerType;
          if (R === "interval") {
            var U = a.get(C);
            if (typeof U == "number") {
              var N = c.get(U);
              if (N === undefined || N.timerId !== C || N.timerType !== R)
                throw new Error("The timer is in an undefined state.");
            } else if (typeof U < "u")
              U();
            else
              throw new Error("The timer is in an undefined state.");
          } else if (R === "timeout") {
            var W = l.get(C);
            if (typeof W == "number") {
              var K = c.get(W);
              if (K === undefined || K.timerId !== C || K.timerType !== R)
                throw new Error("The timer is in an undefined state.");
            } else if (typeof W < "u")
              W(), l.delete(C);
            else
              throw new Error("The timer is in an undefined state.");
          }
        } else if (i(E)) {
          var z = E.id, Q = c.get(z);
          if (Q === undefined)
            throw new Error("The timer is in an undefined state.");
          var { timerId: pe, timerType: Yt } = Q;
          c.delete(z), Yt === "interval" ? a.delete(pe) : l.delete(pe);
        } else {
          var ge = E.error.message;
          throw new Error(ge);
        }
      });
      var d = function(E) {
        var I = e.generateUniqueNumber(c);
        c.set(I, { timerId: E, timerType: "interval" }), a.set(E, I), h.postMessage({ id: I, method: "clear", params: { timerId: E, timerType: "interval" } });
      }, g = function(E) {
        var I = e.generateUniqueNumber(c);
        c.set(I, { timerId: E, timerType: "timeout" }), l.set(E, I), h.postMessage({ id: I, method: "clear", params: { timerId: E, timerType: "timeout" } });
      }, y = function(E) {
        var I = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0, C = e.generateUniqueNumber(a);
        return a.set(C, function() {
          E(), typeof a.get(C) == "function" && h.postMessage({ id: null, method: "set", params: { delay: I, now: performance.now(), timerId: C, timerType: "interval" } });
        }), h.postMessage({ id: null, method: "set", params: { delay: I, now: performance.now(), timerId: C, timerType: "interval" } }), C;
      }, w = function(E) {
        var I = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0, C = e.generateUniqueNumber(l);
        return l.set(C, E), h.postMessage({ id: null, method: "set", params: { delay: I, now: performance.now(), timerId: C, timerType: "timeout" } }), C;
      };
      return { clearInterval: d, clearTimeout: g, setInterval: y, setTimeout: w };
    };
    t.load = n;
  });
});
var Lp = M((is, Mp) => {
  _();
  v();
  m();
  (function(t, e) {
    typeof is == "object" && typeof Mp < "u" ? e(is, xp()) : typeof define == "function" && define.amd ? define(["exports", "worker-timers-broker"], e) : (t = typeof globalThis < "u" ? globalThis : t || self, e(t.workerTimers = {}, t.workerTimersBroker));
  })(is, function(t, e) {
    var r = function(h, d) {
      var g = null;
      return function() {
        if (g !== null)
          return g;
        var y = new Blob([d], { type: "application/javascript; charset=utf-8" }), w = URL.createObjectURL(y);
        return g = h(w), setTimeout(function() {
          return URL.revokeObjectURL(w);
        }), g;
      };
    }, i = `(()=>{var e={472:(e,t,r)=>{var o,i;void 0===(i="function"==typeof(o=function(){"use strict";var e=new Map,t=new Map,r=function(t){var r=e.get(t);if(void 0===r)throw new Error('There is no interval scheduled with the given id "'.concat(t,'".'));clearTimeout(r),e.delete(t)},o=function(e){var r=t.get(e);if(void 0===r)throw new Error('There is no timeout scheduled with the given id "'.concat(e,'".'));clearTimeout(r),t.delete(e)},i=function(e,t){var r,o=performance.now();return{expected:o+(r=e-Math.max(0,o-t)),remainingDelay:r}},n=function e(t,r,o,i){var n=performance.now();n>o?postMessage({id:null,method:"call",params:{timerId:r,timerType:i}}):t.set(r,setTimeout(e,o-n,t,r,o,i))},a=function(t,r,o){var a=i(t,o),s=a.expected,d=a.remainingDelay;e.set(r,setTimeout(n,d,e,r,s,"interval"))},s=function(e,r,o){var a=i(e,o),s=a.expected,d=a.remainingDelay;t.set(r,setTimeout(n,d,t,r,s,"timeout"))};addEventListener("message",(function(e){var t=e.data;try{if("clear"===t.method){var i=t.id,n=t.params,d=n.timerId,c=n.timerType;if("interval"===c)r(d),postMessage({error:null,id:i});else{if("timeout"!==c)throw new Error('The given type "'.concat(c,'" is not supported'));o(d),postMessage({error:null,id:i})}}else{if("set"!==t.method)throw new Error('The given method "'.concat(t.method,'" is not supported'));var u=t.params,l=u.delay,p=u.now,m=u.timerId,v=u.timerType;if("interval"===v)a(l,m,p);else{if("timeout"!==v)throw new Error('The given type "'.concat(v,'" is not supported'));s(l,m,p)}}}catch(e){postMessage({error:{message:e.message},id:t.id,result:null})}}))})?o.call(t,r,t,e):o)||(e.exports=i)}},t={};function r(o){var i=t[o];if(void 0!==i)return i.exports;var n=t[o]={exports:{}};return e[o](n,n.exports,r),n.exports}r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t},r.d=(e,t)=>{for(var o in t)r.o(t,o)&&!r.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{"use strict";r(472)})()})();`, n = r(e.load, i), o = function(h) {
      return n().clearInterval(h);
    }, s = function(h) {
      return n().clearTimeout(h);
    }, a = function() {
      var h;
      return (h = n()).setInterval.apply(h, arguments);
    }, l = function() {
      var h;
      return (h = n()).setTimeout.apply(h, arguments);
    };
    t.clearInterval = o, t.clearTimeout = s, t.setInterval = a, t.setTimeout = l;
  });
});
var Dp = M((Ct) => {
  _();
  v();
  m();
  var jv = Ct && Ct.__createBinding || (Object.create ? function(t, e, r, i) {
    i === undefined && (i = r);
    var n = Object.getOwnPropertyDescriptor(e, r);
    (!n || ("get" in n ? !e.__esModule : n.writable || n.configurable)) && (n = { enumerable: true, get: function() {
      return e[r];
    } }), Object.defineProperty(t, i, n);
  } : function(t, e, r, i) {
    i === undefined && (i = r), t[i] = e[r];
  }), Fv = Ct && Ct.__setModuleDefault || (Object.create ? function(t, e) {
    Object.defineProperty(t, "default", { enumerable: true, value: e });
  } : function(t, e) {
    t.default = e;
  }), Wv = Ct && Ct.__importStar || function(t) {
    if (t && t.__esModule)
      return t;
    var e = {};
    if (t != null)
      for (var r in t)
        r !== "default" && Object.prototype.hasOwnProperty.call(t, r) && jv(e, t, r);
    return Fv(e, t), e;
  };
  Object.defineProperty(Ct, "__esModule", { value: true });
  var ja = Wv(Oi()), Up = Lp(), Np = { set: Up.setInterval, clear: Up.clearInterval }, qp = { set: (t, e) => setInterval(t, e), clear: (t) => clearInterval(t) }, $v = (t) => {
    switch (t) {
      case "native":
        return qp;
      case "worker":
        return Np;
      case "auto":
      default:
        return ja.default && !ja.isWebWorker && !ja.isReactNativeBrowser ? Np : qp;
    }
  };
  Ct.default = $v;
});
var Wa = M((xi) => {
  _();
  v();
  m();
  var Hv = xi && xi.__importDefault || function(t) {
    return t && t.__esModule ? t : { default: t };
  };
  Object.defineProperty(xi, "__esModule", { value: true });
  var Vv = Hv(Dp()), Fa = class {
    get keepaliveTimeoutTimestamp() {
      return this._keepaliveTimeoutTimestamp;
    }
    get intervalEvery() {
      return this._intervalEvery;
    }
    get keepalive() {
      return this._keepalive;
    }
    constructor(e, r) {
      this.destroyed = false, this.client = e, this.timer = typeof r == "object" && "set" in r && "clear" in r ? r : (0, Vv.default)(r), this.setKeepalive(e.options.keepalive);
    }
    clear() {
      this.timerId && (this.timer.clear(this.timerId), this.timerId = null);
    }
    setKeepalive(e) {
      if (e *= 1000, isNaN(e) || e <= 0 || e > 2147483647)
        throw new Error(`Keepalive value must be an integer between 0 and 2147483647. Provided value is ${e}`);
      this._keepalive = e, this.reschedule(), this.client.log(`KeepaliveManager: set keepalive to ${e}ms`);
    }
    destroy() {
      this.clear(), this.destroyed = true;
    }
    reschedule() {
      if (this.destroyed)
        return;
      this.clear(), this.counter = 0;
      let e = Math.ceil(this._keepalive * 1.5);
      this._keepaliveTimeoutTimestamp = Date.now() + e, this._intervalEvery = Math.ceil(this._keepalive / 2), this.timerId = this.timer.set(() => {
        this.destroyed || (this.counter += 1, this.counter === 2 ? this.client.sendPing() : this.counter > 2 && this.client.onKeepaliveTimeout());
      }, this._intervalEvery);
    }
  };
  xi.default = Fa;
});
var os = M((Qe) => {
  _();
  v();
  m();
  var zv = Qe && Qe.__createBinding || (Object.create ? function(t, e, r, i) {
    i === undefined && (i = r);
    var n = Object.getOwnPropertyDescriptor(e, r);
    (!n || ("get" in n ? !e.__esModule : n.writable || n.configurable)) && (n = { enumerable: true, get: function() {
      return e[r];
    } }), Object.defineProperty(t, i, n);
  } : function(t, e, r, i) {
    i === undefined && (i = r), t[i] = e[r];
  }), Kv = Qe && Qe.__setModuleDefault || (Object.create ? function(t, e) {
    Object.defineProperty(t, "default", { enumerable: true, value: e });
  } : function(t, e) {
    t.default = e;
  }), Hp = Qe && Qe.__importStar || function(t) {
    if (t && t.__esModule)
      return t;
    var e = {};
    if (t != null)
      for (var r in t)
        r !== "default" && Object.prototype.hasOwnProperty.call(t, r) && zv(e, t, r);
    return Kv(e, t), e;
  }, zt = Qe && Qe.__importDefault || function(t) {
    return t && t.__esModule ? t : { default: t };
  };
  Object.defineProperty(Qe, "__esModule", { value: true });
  var Gv = zt(Gu()), $a = zt(Nd()), Qv = zt(Zo()), Yv = jt(), jp = zt(Fd()), Fp = Hp($d()), Jv = zt(ot()), ii = zt(ra()), Xv = zt(Tp()), ns = _r(), Zv = Rp(), eE = zt(Wa()), Wp = Hp(Oi()), Ha = globalThis.setImmediate || ((...t) => {
    let e = t.shift();
    (0, ns.nextTick)(() => {
      e(...t);
    });
  }), $p = { keepalive: 60, reschedulePings: true, protocolId: "MQTT", protocolVersion: 4, reconnectPeriod: 1000, connectTimeout: 30 * 1000, clean: true, resubscribe: true, writeCache: true, timerVariant: "auto" }, ss = class t extends Zv.TypedEventEmitter {
    static defaultId() {
      return `mqttjs_${Math.random().toString(16).substr(2, 8)}`;
    }
    constructor(e, r) {
      super(), this.options = r || {};
      for (let i in $p)
        typeof this.options[i] > "u" ? this.options[i] = $p[i] : this.options[i] = r[i];
      this.log = this.options.log || (0, Jv.default)("mqttjs:client"), this.noop = this._noop.bind(this), this.log("MqttClient :: version:", t.VERSION), Wp.isWebWorker ? this.log("MqttClient :: environment", "webworker") : this.log("MqttClient :: environment", Wp.default ? "browser" : "node"), this.log("MqttClient :: options.protocol", r.protocol), this.log("MqttClient :: options.protocolVersion", r.protocolVersion), this.log("MqttClient :: options.username", r.username), this.log("MqttClient :: options.keepalive", r.keepalive), this.log("MqttClient :: options.reconnectPeriod", r.reconnectPeriod), this.log("MqttClient :: options.rejectUnauthorized", r.rejectUnauthorized), this.log("MqttClient :: options.properties.topicAliasMaximum", r.properties ? r.properties.topicAliasMaximum : undefined), this.options.clientId = typeof r.clientId == "string" ? r.clientId : t.defaultId(), this.log("MqttClient :: clientId", this.options.clientId), this.options.customHandleAcks = r.protocolVersion === 5 && r.customHandleAcks ? r.customHandleAcks : (...i) => {
        i[3](null, 0);
      }, this.options.writeCache || ($a.default.writeToStream.cacheNumbers = false), this.streamBuilder = e, this.messageIdProvider = typeof this.options.messageIdProvider > "u" ? new Qv.default : this.options.messageIdProvider, this.outgoingStore = r.outgoingStore || new ii.default, this.incomingStore = r.incomingStore || new ii.default, this.queueQoSZero = r.queueQoSZero === undefined ? true : r.queueQoSZero, this._resubscribeTopics = {}, this.messageIdToTopic = {}, this.keepaliveManager = null, this.connected = false, this.disconnecting = false, this.reconnecting = false, this.queue = [], this.connackTimer = null, this.reconnectTimer = null, this._storeProcessing = false, this._packetIdsDuringStoreProcessing = {}, this._storeProcessingQueue = [], this.outgoing = {}, this._firstConnection = true, r.properties && r.properties.topicAliasMaximum > 0 && (r.properties.topicAliasMaximum > 65535 ? this.log("MqttClient :: options.properties.topicAliasMaximum is out of range") : this.topicAliasRecv = new Gv.default(r.properties.topicAliasMaximum)), this.on("connect", () => {
        let { queue: i } = this, n = () => {
          let o = i.shift();
          this.log("deliver :: entry %o", o);
          let s = null;
          if (!o) {
            this._resubscribe();
            return;
          }
          s = o.packet, this.log("deliver :: call _sendPacket for %o", s);
          let a = true;
          s.messageId && s.messageId !== 0 && (this.messageIdProvider.register(s.messageId) || (a = false)), a ? this._sendPacket(s, (l) => {
            o.cb && o.cb(l), n();
          }) : (this.log("messageId: %d has already used. The message is skipped and removed.", s.messageId), n());
        };
        this.log("connect :: sending queued packets"), n();
      }), this.on("close", () => {
        this.log("close :: connected set to `false`"), this.connected = false, this.log("close :: clearing connackTimer"), clearTimeout(this.connackTimer), this._destroyKeepaliveManager(), this.topicAliasRecv && this.topicAliasRecv.clear(), this.log("close :: calling _setupReconnect"), this._setupReconnect();
      }), this.options.manualConnect || (this.log("MqttClient :: setting up stream"), this.connect());
    }
    handleAuth(e, r) {
      r();
    }
    handleMessage(e, r) {
      r();
    }
    _nextId() {
      return this.messageIdProvider.allocate();
    }
    getLastMessageId() {
      return this.messageIdProvider.getLastAllocated();
    }
    connect() {
      var e;
      let r = new Yv.Writable, i = $a.default.parser(this.options), n = null, o = [];
      this.log("connect :: calling method to clear reconnect"), this._clearReconnect(), this.disconnected && !this.reconnecting && (this.incomingStore = this.options.incomingStore || new ii.default, this.outgoingStore = this.options.outgoingStore || new ii.default, this.disconnecting = false, this.disconnected = false), this.log("connect :: using streamBuilder provided to client to create stream"), this.stream = this.streamBuilder(this), i.on("packet", (h) => {
        this.log("parser :: on packet push to packets array."), o.push(h);
      });
      let s = () => {
        this.log("work :: getting next packet in queue");
        let h = o.shift();
        if (h)
          this.log("work :: packet pulled from queue"), (0, Xv.default)(this, h, a);
        else {
          this.log("work :: no packets in queue");
          let d = n;
          n = null, this.log("work :: done flag is %s", !!d), d && d();
        }
      }, a = () => {
        if (o.length)
          (0, ns.nextTick)(s);
        else {
          let h = n;
          n = null, h();
        }
      };
      r._write = (h, d, g) => {
        n = g, this.log("writable stream :: parsing buffer"), i.parse(h), s();
      };
      let l = (h) => {
        this.log("streamErrorHandler :: error", h.message), h.code ? (this.log("streamErrorHandler :: emitting error"), this.emit("error", h)) : this.noop(h);
      };
      this.log("connect :: pipe stream to writable stream"), this.stream.pipe(r), this.stream.on("error", l), this.stream.on("close", () => {
        this.log("(%s)stream :: on close", this.options.clientId), this._flushVolatile(), this.log("stream: emit close to MqttClient"), this.emit("close");
      }), this.log("connect: sending packet `connect`");
      let c = { cmd: "connect", protocolId: this.options.protocolId, protocolVersion: this.options.protocolVersion, clean: this.options.clean, clientId: this.options.clientId, keepalive: this.options.keepalive, username: this.options.username, password: this.options.password, properties: this.options.properties };
      if (this.options.will && (c.will = Object.assign(Object.assign({}, this.options.will), { payload: (e = this.options.will) === null || e === undefined ? undefined : e.payload })), this.topicAliasRecv && (c.properties || (c.properties = {}), this.topicAliasRecv && (c.properties.topicAliasMaximum = this.topicAliasRecv.max)), this._writePacket(c), i.on("error", this.emit.bind(this, "error")), this.options.properties) {
        if (!this.options.properties.authenticationMethod && this.options.properties.authenticationData)
          return this.end(() => this.emit("error", new Error("Packet has no Authentication Method"))), this;
        if (this.options.properties.authenticationMethod && this.options.authPacket && typeof this.options.authPacket == "object") {
          let h = Object.assign({ cmd: "auth", reasonCode: 0 }, this.options.authPacket);
          this._writePacket(h);
        }
      }
      return this.stream.setMaxListeners(1000), clearTimeout(this.connackTimer), this.connackTimer = setTimeout(() => {
        this.log("!!connectTimeout hit!! Calling _cleanUp with force `true`"), this.emit("error", new Error("connack timeout")), this._cleanUp(true);
      }, this.options.connectTimeout), this;
    }
    publish(e, r, i, n) {
      this.log("publish :: message `%s` to topic `%s`", r, e);
      let { options: o } = this;
      typeof i == "function" && (n = i, i = null), i = i || {}, i = Object.assign(Object.assign({}, { qos: 0, retain: false, dup: false }), i);
      let { qos: a, retain: l, dup: c, properties: h, cbStorePut: d } = i;
      if (this._checkDisconnecting(n))
        return this;
      let g = () => {
        let y = 0;
        if ((a === 1 || a === 2) && (y = this._nextId(), y === null))
          return this.log("No messageId left"), false;
        let w = { cmd: "publish", topic: e, payload: r, qos: a, retain: l, messageId: y, dup: c };
        switch (o.protocolVersion === 5 && (w.properties = h), this.log("publish :: qos", a), a) {
          case 1:
          case 2:
            this.outgoing[w.messageId] = { volatile: false, cb: n || this.noop }, this.log("MqttClient:publish: packet cmd: %s", w.cmd), this._sendPacket(w, undefined, d);
            break;
          default:
            this.log("MqttClient:publish: packet cmd: %s", w.cmd), this._sendPacket(w, n, d);
            break;
        }
        return true;
      };
      return (this._storeProcessing || this._storeProcessingQueue.length > 0 || !g()) && this._storeProcessingQueue.push({ invoke: g, cbStorePut: i.cbStorePut, callback: n }), this;
    }
    publishAsync(e, r, i) {
      return new Promise((n, o) => {
        this.publish(e, r, i, (s, a) => {
          s ? o(s) : n(a);
        });
      });
    }
    subscribe(e, r, i) {
      let n = this.options.protocolVersion;
      typeof r == "function" && (i = r), i = i || this.noop;
      let o = false, s = [];
      typeof e == "string" ? (e = [e], s = e) : Array.isArray(e) ? s = e : typeof e == "object" && (o = e.resubscribe, delete e.resubscribe, s = Object.keys(e));
      let a = Fp.validateTopics(s);
      if (a !== null)
        return Ha(i, new Error(`Invalid topic ${a}`)), this;
      if (this._checkDisconnecting(i))
        return this.log("subscribe: discconecting true"), this;
      let l = { qos: 0 };
      n === 5 && (l.nl = false, l.rap = false, l.rh = 0), r = Object.assign(Object.assign({}, l), r);
      let c = r.properties, h = [], d = (y, w) => {
        if (w = w || r, !Object.prototype.hasOwnProperty.call(this._resubscribeTopics, y) || this._resubscribeTopics[y].qos < w.qos || o) {
          let S = { topic: y, qos: w.qos };
          n === 5 && (S.nl = w.nl, S.rap = w.rap, S.rh = w.rh, S.properties = c), this.log("subscribe: pushing topic `%s` and qos `%s` to subs list", S.topic, S.qos), h.push(S);
        }
      };
      if (Array.isArray(e) ? e.forEach((y) => {
        this.log("subscribe: array topic %s", y), d(y);
      }) : Object.keys(e).forEach((y) => {
        this.log("subscribe: object topic %s, %o", y, e[y]), d(y, e[y]);
      }), !h.length)
        return i(null, []), this;
      let g = () => {
        let y = this._nextId();
        if (y === null)
          return this.log("No messageId left"), false;
        let w = { cmd: "subscribe", subscriptions: h, messageId: y };
        if (c && (w.properties = c), this.options.resubscribe) {
          this.log("subscribe :: resubscribe true");
          let S = [];
          h.forEach((E) => {
            if (this.options.reconnectPeriod > 0) {
              let I = { qos: E.qos };
              n === 5 && (I.nl = E.nl || false, I.rap = E.rap || false, I.rh = E.rh || 0, I.properties = E.properties), this._resubscribeTopics[E.topic] = I, S.push(E.topic);
            }
          }), this.messageIdToTopic[w.messageId] = S;
        }
        return this.outgoing[w.messageId] = { volatile: true, cb(S, E) {
          if (!S) {
            let { granted: I } = E;
            for (let C = 0;C < I.length; C += 1)
              h[C].qos = I[C];
          }
          i(S, h, E);
        } }, this.log("subscribe :: call _sendPacket"), this._sendPacket(w), true;
      };
      return (this._storeProcessing || this._storeProcessingQueue.length > 0 || !g()) && this._storeProcessingQueue.push({ invoke: g, callback: i }), this;
    }
    subscribeAsync(e, r) {
      return new Promise((i, n) => {
        this.subscribe(e, r, (o, s) => {
          o ? n(o) : i(s);
        });
      });
    }
    unsubscribe(e, r, i) {
      typeof e == "string" && (e = [e]), typeof r == "function" && (i = r), i = i || this.noop;
      let n = Fp.validateTopics(e);
      if (n !== null)
        return Ha(i, new Error(`Invalid topic ${n}`)), this;
      if (this._checkDisconnecting(i))
        return this;
      let o = () => {
        let s = this._nextId();
        if (s === null)
          return this.log("No messageId left"), false;
        let a = { cmd: "unsubscribe", messageId: s, unsubscriptions: [] };
        return typeof e == "string" ? a.unsubscriptions = [e] : Array.isArray(e) && (a.unsubscriptions = e), this.options.resubscribe && a.unsubscriptions.forEach((l) => {
          delete this._resubscribeTopics[l];
        }), typeof r == "object" && r.properties && (a.properties = r.properties), this.outgoing[a.messageId] = { volatile: true, cb: i }, this.log("unsubscribe: call _sendPacket"), this._sendPacket(a), true;
      };
      return (this._storeProcessing || this._storeProcessingQueue.length > 0 || !o()) && this._storeProcessingQueue.push({ invoke: o, callback: i }), this;
    }
    unsubscribeAsync(e, r) {
      return new Promise((i, n) => {
        this.unsubscribe(e, r, (o, s) => {
          o ? n(o) : i(s);
        });
      });
    }
    end(e, r, i) {
      this.log("end :: (%s)", this.options.clientId), (e == null || typeof e != "boolean") && (i = i || r, r = e, e = false), typeof r != "object" && (i = i || r, r = null), this.log("end :: cb? %s", !!i), (!i || typeof i != "function") && (i = this.noop);
      let n = () => {
        this.log("end :: closeStores: closing incoming and outgoing stores"), this.disconnected = true, this.incomingStore.close((s) => {
          this.outgoingStore.close((a) => {
            if (this.log("end :: closeStores: emitting end"), this.emit("end"), i) {
              let l = s || a;
              this.log("end :: closeStores: invoking callback with args"), i(l);
            }
          });
        }), this._deferredReconnect ? this._deferredReconnect() : (this.options.reconnectPeriod === 0 || this.options.manualConnect) && (this.disconnecting = false);
      }, o = () => {
        this.log("end :: (%s) :: finish :: calling _cleanUp with force %s", this.options.clientId, e), this._cleanUp(e, () => {
          this.log("end :: finish :: calling process.nextTick on closeStores"), (0, ns.nextTick)(n);
        }, r);
      };
      return this.disconnecting ? (i(), this) : (this._clearReconnect(), this.disconnecting = true, !e && Object.keys(this.outgoing).length > 0 ? (this.log("end :: (%s) :: calling finish in 10ms once outgoing is empty", this.options.clientId), this.once("outgoingEmpty", setTimeout.bind(null, o, 10))) : (this.log("end :: (%s) :: immediately calling finish", this.options.clientId), o()), this);
    }
    endAsync(e, r) {
      return new Promise((i, n) => {
        this.end(e, r, (o) => {
          o ? n(o) : i();
        });
      });
    }
    removeOutgoingMessage(e) {
      if (this.outgoing[e]) {
        let { cb: r } = this.outgoing[e];
        this._removeOutgoingAndStoreMessage(e, () => {
          r(new Error("Message removed"));
        });
      }
      return this;
    }
    reconnect(e) {
      this.log("client reconnect");
      let r = () => {
        e ? (this.options.incomingStore = e.incomingStore, this.options.outgoingStore = e.outgoingStore) : (this.options.incomingStore = null, this.options.outgoingStore = null), this.incomingStore = this.options.incomingStore || new ii.default, this.outgoingStore = this.options.outgoingStore || new ii.default, this.disconnecting = false, this.disconnected = false, this._deferredReconnect = null, this._reconnect();
      };
      return this.disconnecting && !this.disconnected ? this._deferredReconnect = r : r(), this;
    }
    _flushVolatile() {
      this.outgoing && (this.log("_flushVolatile :: deleting volatile messages from the queue and setting their callbacks as error function"), Object.keys(this.outgoing).forEach((e) => {
        this.outgoing[e].volatile && typeof this.outgoing[e].cb == "function" && (this.outgoing[e].cb(new Error("Connection closed")), delete this.outgoing[e]);
      }));
    }
    _flush() {
      this.outgoing && (this.log("_flush: queue exists? %b", !!this.outgoing), Object.keys(this.outgoing).forEach((e) => {
        typeof this.outgoing[e].cb == "function" && (this.outgoing[e].cb(new Error("Connection closed")), delete this.outgoing[e]);
      }));
    }
    _removeTopicAliasAndRecoverTopicName(e) {
      let r;
      e.properties && (r = e.properties.topicAlias);
      let i = e.topic.toString();
      if (this.log("_removeTopicAliasAndRecoverTopicName :: alias %d, topic %o", r, i), i.length === 0) {
        if (typeof r > "u")
          return new Error("Unregistered Topic Alias");
        if (i = this.topicAliasSend.getTopicByAlias(r), typeof i > "u")
          return new Error("Unregistered Topic Alias");
        e.topic = i;
      }
      r && delete e.properties.topicAlias;
    }
    _checkDisconnecting(e) {
      return this.disconnecting && (e && e !== this.noop ? e(new Error("client disconnecting")) : this.emit("error", new Error("client disconnecting"))), this.disconnecting;
    }
    _reconnect() {
      this.log("_reconnect: emitting reconnect to client"), this.emit("reconnect"), this.connected ? (this.end(() => {
        this.connect();
      }), this.log("client already connected. disconnecting first.")) : (this.log("_reconnect: calling connect"), this.connect());
    }
    _setupReconnect() {
      !this.disconnecting && !this.reconnectTimer && this.options.reconnectPeriod > 0 ? (this.reconnecting || (this.log("_setupReconnect :: emit `offline` state"), this.emit("offline"), this.log("_setupReconnect :: set `reconnecting` to `true`"), this.reconnecting = true), this.log("_setupReconnect :: setting reconnectTimer for %d ms", this.options.reconnectPeriod), this.reconnectTimer = setInterval(() => {
        this.log("reconnectTimer :: reconnect triggered!"), this._reconnect();
      }, this.options.reconnectPeriod)) : this.log("_setupReconnect :: doing nothing...");
    }
    _clearReconnect() {
      this.log("_clearReconnect : clearing reconnect timer"), this.reconnectTimer && (clearInterval(this.reconnectTimer), this.reconnectTimer = null);
    }
    _cleanUp(e, r, i = {}) {
      if (r && (this.log("_cleanUp :: done callback provided for on stream close"), this.stream.on("close", r)), this.log("_cleanUp :: forced? %s", e), e)
        this.options.reconnectPeriod === 0 && this.options.clean && this._flush(), this.log("_cleanUp :: (%s) :: destroying stream", this.options.clientId), this.stream.destroy();
      else {
        let n = Object.assign({ cmd: "disconnect" }, i);
        this.log("_cleanUp :: (%s) :: call _sendPacket with disconnect packet", this.options.clientId), this._sendPacket(n, () => {
          this.log("_cleanUp :: (%s) :: destroying stream", this.options.clientId), Ha(() => {
            this.stream.end(() => {
              this.log("_cleanUp :: (%s) :: stream destroyed", this.options.clientId);
            });
          });
        });
      }
      !this.disconnecting && !this.reconnecting && (this.log("_cleanUp :: client not disconnecting/reconnecting. Clearing and resetting reconnect."), this._clearReconnect(), this._setupReconnect()), this._destroyKeepaliveManager(), r && !this.connected && (this.log("_cleanUp :: (%s) :: removing stream `done` callback `close` listener", this.options.clientId), this.stream.removeListener("close", r), r());
    }
    _storeAndSend(e, r, i) {
      this.log("storeAndSend :: store packet with cmd %s to outgoingStore", e.cmd);
      let n = e, o;
      if (n.cmd === "publish" && (n = (0, jp.default)(e), o = this._removeTopicAliasAndRecoverTopicName(n), o))
        return r && r(o);
      this.outgoingStore.put(n, (s) => {
        if (s)
          return r && r(s);
        i(), this._writePacket(e, r);
      });
    }
    _applyTopicAlias(e) {
      if (this.options.protocolVersion === 5 && e.cmd === "publish") {
        let r;
        e.properties && (r = e.properties.topicAlias);
        let i = e.topic.toString();
        if (this.topicAliasSend)
          if (r) {
            if (i.length !== 0 && (this.log("applyTopicAlias :: register topic: %s - alias: %d", i, r), !this.topicAliasSend.put(i, r)))
              return this.log("applyTopicAlias :: error out of range. topic: %s - alias: %d", i, r), new Error("Sending Topic Alias out of range");
          } else
            i.length !== 0 && (this.options.autoAssignTopicAlias ? (r = this.topicAliasSend.getAliasByTopic(i), r ? (e.topic = "", e.properties = Object.assign(Object.assign({}, e.properties), { topicAlias: r }), this.log("applyTopicAlias :: auto assign(use) topic: %s - alias: %d", i, r)) : (r = this.topicAliasSend.getLruAlias(), this.topicAliasSend.put(i, r), e.properties = Object.assign(Object.assign({}, e.properties), { topicAlias: r }), this.log("applyTopicAlias :: auto assign topic: %s - alias: %d", i, r))) : this.options.autoUseTopicAlias && (r = this.topicAliasSend.getAliasByTopic(i), r && (e.topic = "", e.properties = Object.assign(Object.assign({}, e.properties), { topicAlias: r }), this.log("applyTopicAlias :: auto use topic: %s - alias: %d", i, r))));
        else if (r)
          return this.log("applyTopicAlias :: error out of range. topic: %s - alias: %d", i, r), new Error("Sending Topic Alias out of range");
      }
    }
    _noop(e) {
      this.log("noop ::", e);
    }
    _writePacket(e, r) {
      this.log("_writePacket :: packet: %O", e), this.log("_writePacket :: emitting `packetsend`"), this.emit("packetsend", e), this.log("_writePacket :: writing to stream");
      let i = $a.default.writeToStream(e, this.stream, this.options);
      this.log("_writePacket :: writeToStream result %s", i), !i && r && r !== this.noop ? (this.log("_writePacket :: handle events on `drain` once through callback."), this.stream.once("drain", r)) : r && (this.log("_writePacket :: invoking cb"), r());
    }
    _sendPacket(e, r, i, n) {
      this.log("_sendPacket :: (%s) ::  start", this.options.clientId), i = i || this.noop, r = r || this.noop;
      let o = this._applyTopicAlias(e);
      if (o) {
        r(o);
        return;
      }
      if (!this.connected) {
        if (e.cmd === "auth") {
          this._writePacket(e, r);
          return;
        }
        this.log("_sendPacket :: client not connected. Storing packet offline."), this._storePacket(e, r, i);
        return;
      }
      if (n) {
        this._writePacket(e, r);
        return;
      }
      switch (e.cmd) {
        case "publish":
          break;
        case "pubrel":
          this._storeAndSend(e, r, i);
          return;
        default:
          this._writePacket(e, r);
          return;
      }
      switch (e.qos) {
        case 2:
        case 1:
          this._storeAndSend(e, r, i);
          break;
        case 0:
        default:
          this._writePacket(e, r);
          break;
      }
      this.log("_sendPacket :: (%s) ::  end", this.options.clientId);
    }
    _storePacket(e, r, i) {
      this.log("_storePacket :: packet: %o", e), this.log("_storePacket :: cb? %s", !!r), i = i || this.noop;
      let n = e;
      if (n.cmd === "publish") {
        n = (0, jp.default)(e);
        let s = this._removeTopicAliasAndRecoverTopicName(n);
        if (s)
          return r && r(s);
      }
      let o = n.qos || 0;
      o === 0 && this.queueQoSZero || n.cmd !== "publish" ? this.queue.push({ packet: n, cb: r }) : o > 0 ? (r = this.outgoing[n.messageId] ? this.outgoing[n.messageId].cb : null, this.outgoingStore.put(n, (s) => {
        if (s)
          return r && r(s);
        i();
      })) : r && r(new Error("No connection to broker"));
    }
    _setupKeepaliveManager() {
      this.log("_setupKeepaliveManager :: keepalive %d (seconds)", this.options.keepalive), !this.keepaliveManager && this.options.keepalive && (this.keepaliveManager = new eE.default(this, this.options.timerVariant));
    }
    _destroyKeepaliveManager() {
      this.keepaliveManager && (this.log("_destroyKeepaliveManager :: destroying keepalive manager"), this.keepaliveManager.destroy(), this.keepaliveManager = null);
    }
    reschedulePing(e = false) {
      this.keepaliveManager && this.options.keepalive && (e || this.options.reschedulePings) && this._reschedulePing();
    }
    _reschedulePing() {
      this.log("_reschedulePing :: rescheduling ping"), this.keepaliveManager.reschedule();
    }
    sendPing() {
      this.log("_sendPing :: sending pingreq"), this._sendPacket({ cmd: "pingreq" });
    }
    onKeepaliveTimeout() {
      this.emit("error", new Error("Keepalive timeout")), this.log("onKeepaliveTimeout :: calling _cleanUp with force true"), this._cleanUp(true);
    }
    _resubscribe() {
      this.log("_resubscribe");
      let e = Object.keys(this._resubscribeTopics);
      if (!this._firstConnection && (this.options.clean || this.options.protocolVersion >= 4 && !this.connackPacket.sessionPresent) && e.length > 0)
        if (this.options.resubscribe)
          if (this.options.protocolVersion === 5) {
            this.log("_resubscribe: protocolVersion 5");
            for (let r = 0;r < e.length; r++) {
              let i = {};
              i[e[r]] = this._resubscribeTopics[e[r]], i.resubscribe = true, this.subscribe(i, { properties: i[e[r]].properties });
            }
          } else
            this._resubscribeTopics.resubscribe = true, this.subscribe(this._resubscribeTopics);
        else
          this._resubscribeTopics = {};
      this._firstConnection = false;
    }
    _onConnect(e) {
      if (this.disconnected) {
        this.emit("connect", e);
        return;
      }
      this.connackPacket = e, this.messageIdProvider.clear(), this._setupKeepaliveManager(), this.connected = true;
      let r = () => {
        let i = this.outgoingStore.createStream(), n = () => {
          i.destroy(), i = null, this._flushStoreProcessingQueue(), o();
        }, o = () => {
          this._storeProcessing = false, this._packetIdsDuringStoreProcessing = {};
        };
        this.once("close", n), i.on("error", (a) => {
          o(), this._flushStoreProcessingQueue(), this.removeListener("close", n), this.emit("error", a);
        });
        let s = () => {
          if (!i)
            return;
          let a = i.read(1), l;
          if (!a) {
            i.once("readable", s);
            return;
          }
          if (this._storeProcessing = true, this._packetIdsDuringStoreProcessing[a.messageId]) {
            s();
            return;
          }
          !this.disconnecting && !this.reconnectTimer ? (l = this.outgoing[a.messageId] ? this.outgoing[a.messageId].cb : null, this.outgoing[a.messageId] = { volatile: false, cb(c, h) {
            l && l(c, h), s();
          } }, this._packetIdsDuringStoreProcessing[a.messageId] = true, this.messageIdProvider.register(a.messageId) ? this._sendPacket(a, undefined, undefined, true) : this.log("messageId: %d has already used.", a.messageId)) : i.destroy && i.destroy();
        };
        i.on("end", () => {
          let a = true;
          for (let l in this._packetIdsDuringStoreProcessing)
            if (!this._packetIdsDuringStoreProcessing[l]) {
              a = false;
              break;
            }
          this.removeListener("close", n), a ? (o(), this._invokeAllStoreProcessingQueue(), this.emit("connect", e)) : r();
        }), s();
      };
      r();
    }
    _invokeStoreProcessingQueue() {
      if (!this._storeProcessing && this._storeProcessingQueue.length > 0) {
        let e = this._storeProcessingQueue[0];
        if (e && e.invoke())
          return this._storeProcessingQueue.shift(), true;
      }
      return false;
    }
    _invokeAllStoreProcessingQueue() {
      for (;this._invokeStoreProcessingQueue(); )
        ;
    }
    _flushStoreProcessingQueue() {
      for (let e of this._storeProcessingQueue)
        e.cbStorePut && e.cbStorePut(new Error("Connection closed")), e.callback && e.callback(new Error("Connection closed"));
      this._storeProcessingQueue.splice(0);
    }
    _removeOutgoingAndStoreMessage(e, r) {
      delete this.outgoing[e], this.outgoingStore.del({ messageId: e }, (i, n) => {
        r(i, n), this.messageIdProvider.deallocate(e), this._invokeStoreProcessingQueue();
      });
    }
  };
  ss.VERSION = ns.MQTTJS_VERSION;
  Qe.default = ss;
});
var Vp = M((za) => {
  _();
  v();
  m();
  Object.defineProperty(za, "__esModule", { value: true });
  var tE = Ua(), Va = class {
    constructor() {
      this.numberAllocator = new tE.NumberAllocator(1, 65535);
    }
    allocate() {
      return this.lastId = this.numberAllocator.alloc(), this.lastId;
    }
    getLastAllocated() {
      return this.lastId;
    }
    register(e) {
      return this.numberAllocator.use(e);
    }
    deallocate(e) {
      this.numberAllocator.free(e);
    }
    clear() {
      this.numberAllocator.clear();
    }
  };
  za.default = Va;
});
var rE;
var iE;
var nE;
var sE;
var dt;
var Ka;
var Kp;
var Jp;
var Gp;
var Qp;
var Kt;
var Xp = _e(() => {
  _();
  v();
  m();
  rE = /^xn--/, iE = /[^\0-\x7E]/, nE = /[\x2E\u3002\uFF0E\uFF61]/g, sE = { overflow: "Overflow: input needs wider integers to process", "not-basic": "Illegal input >= 0x80 (not a basic code point)", "invalid-input": "Invalid input" }, dt = Math.floor, Ka = String.fromCharCode;
  Kp = function(t, e) {
    return t + 22 + 75 * (t < 26) - ((e != 0) << 5);
  }, Jp = function(t, e, r) {
    let i = 0;
    for (t = r ? dt(t / 700) : t >> 1, t += dt(t / e);t > 455; i += 36)
      t = dt(t / 35);
    return dt(i + 36 * t / (t + 38));
  }, Gp = function(t) {
    let e = [], r = t.length, i = 0, n = 128, o = 72, s = t.lastIndexOf("-");
    s < 0 && (s = 0);
    for (let l = 0;l < s; ++l)
      t.charCodeAt(l) >= 128 && Rr("not-basic"), e.push(t.charCodeAt(l));
    for (let l = s > 0 ? s + 1 : 0;l < r; ) {
      let c = i;
      for (let d = 1, g = 36;; g += 36) {
        l >= r && Rr("invalid-input");
        let y = (a = t.charCodeAt(l++)) - 48 < 10 ? a - 22 : a - 65 < 26 ? a - 65 : a - 97 < 26 ? a - 97 : 36;
        (y >= 36 || y > dt((2147483647 - i) / d)) && Rr("overflow"), i += y * d;
        let w = g <= o ? 1 : g >= o + 26 ? 26 : g - o;
        if (y < w)
          break;
        let S = 36 - w;
        d > dt(2147483647 / S) && Rr("overflow"), d *= S;
      }
      let h = e.length + 1;
      o = Jp(i - c, h, c == 0), dt(i / h) > 2147483647 - n && Rr("overflow"), n += dt(i / h), i %= h, e.splice(i++, 0, n);
    }
    var a;
    return String.fromCodePoint(...e);
  }, Qp = function(t) {
    let e = [], r = (t = Yp(t)).length, i = 128, n = 0, o = 72;
    for (let l of t)
      l < 128 && e.push(Ka(l));
    let s = e.length, a = s;
    for (s && e.push("-");a < r; ) {
      let l = 2147483647;
      for (let h of t)
        h >= i && h < l && (l = h);
      let c = a + 1;
      l - i > dt((2147483647 - n) / c) && Rr("overflow"), n += (l - i) * c, i = l;
      for (let h of t)
        if (h < i && ++n > 2147483647 && Rr("overflow"), h == i) {
          let d = n;
          for (let g = 36;; g += 36) {
            let y = g <= o ? 1 : g >= o + 26 ? 26 : g - o;
            if (d < y)
              break;
            let w = d - y, S = 36 - y;
            e.push(Ka(Kp(y + w % S, 0))), d = dt(w / S);
          }
          e.push(Ka(Kp(d, 0))), o = Jp(n, c, a == s), n = 0, ++a;
        }
      ++n, ++i;
    }
    return e.join("");
  }, Kt = { version: "2.1.0", ucs2: { decode: Yp, encode: (t) => String.fromCodePoint(...t) }, decode: Gp, encode: Qp, toASCII: function(t) {
    return zp(t, function(e) {
      return iE.test(e) ? "xn--" + Qp(e) : e;
    });
  }, toUnicode: function(t) {
    return zp(t, function(e) {
      return rE.test(e) ? Gp(e.slice(4).toLowerCase()) : e;
    });
  } };
  Kt.decode;
  Kt.encode;
  Kt.toASCII;
  Kt.toUnicode;
  Kt.ucs2;
  Kt.version;
});
var aE;
var Mi;
var lE;
var pt;
var Zp = _e(() => {
  _();
  v();
  m();
  aE = function(t, e, r, i) {
    e = e || "&", r = r || "=";
    var n = {};
    if (typeof t != "string" || t.length === 0)
      return n;
    var o = /\+/g;
    t = t.split(e);
    var s = 1000;
    i && typeof i.maxKeys == "number" && (s = i.maxKeys);
    var a = t.length;
    s > 0 && a > s && (a = s);
    for (var l = 0;l < a; ++l) {
      var c, h, d, g, y = t[l].replace(o, "%20"), w = y.indexOf(r);
      w >= 0 ? (c = y.substr(0, w), h = y.substr(w + 1)) : (c = y, h = ""), d = decodeURIComponent(c), g = decodeURIComponent(h), oE(n, d) ? Array.isArray(n[d]) ? n[d].push(g) : n[d] = [n[d], g] : n[d] = g;
    }
    return n;
  }, Mi = function(t) {
    switch (typeof t) {
      case "string":
        return t;
      case "boolean":
        return t ? "true" : "false";
      case "number":
        return isFinite(t) ? t : "";
      default:
        return "";
    }
  }, lE = function(t, e, r, i) {
    return e = e || "&", r = r || "=", t === null && (t = undefined), typeof t == "object" ? Object.keys(t).map(function(n) {
      var o = encodeURIComponent(Mi(n)) + r;
      return Array.isArray(t[n]) ? t[n].map(function(s) {
        return o + encodeURIComponent(Mi(s));
      }).join(e) : o + encodeURIComponent(Mi(t[n]));
    }).join(e) : i ? encodeURIComponent(Mi(i)) + r + encodeURIComponent(Mi(t)) : "";
  }, pt = {};
  pt.decode = pt.parse = aE, pt.encode = pt.stringify = lE;
  pt.decode;
  pt.encode;
  pt.parse;
  pt.stringify;
});
var tg;
var Pt;
var kt;
var si;
var fe;
var Cr;
var Ot;
var ni;
var as;
var ne;
var ng = _e(() => {
  _();
  v();
  m();
  si = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : global, fe = tg = {};
  (function() {
    try {
      Pt = typeof setTimeout == "function" ? setTimeout : Ga;
    } catch {
      Pt = Ga;
    }
    try {
      kt = typeof clearTimeout == "function" ? clearTimeout : Qa;
    } catch {
      kt = Qa;
    }
  })();
  Ot = [], ni = false, as = -1;
  fe.nextTick = function(t) {
    var e = new Array(arguments.length - 1);
    if (arguments.length > 1)
      for (var r = 1;r < arguments.length; r++)
        e[r - 1] = arguments[r];
    Ot.push(new eg(t, e)), Ot.length !== 1 || ni || rg(ig);
  }, eg.prototype.run = function() {
    (this || si).fun.apply(null, (this || si).array);
  }, fe.title = "browser", fe.browser = true, fe.env = {}, fe.argv = [], fe.version = "", fe.versions = {}, fe.on = Bt, fe.addListener = Bt, fe.once = Bt, fe.off = Bt, fe.removeListener = Bt, fe.removeAllListeners = Bt, fe.emit = Bt, fe.prependListener = Bt, fe.prependOnceListener = Bt, fe.listeners = function(t) {
    return [];
  }, fe.binding = function(t) {
    throw new Error("process.binding is not supported");
  }, fe.cwd = function() {
    return "/";
  }, fe.chdir = function(t) {
    throw new Error("process.chdir is not supported");
  }, fe.umask = function() {
    return 0;
  };
  ne = tg;
  ne.addListener;
  ne.argv;
  ne.binding;
  ne.browser;
  ne.chdir;
  ne.cwd;
  ne.emit;
  ne.env;
  ne.listeners;
  ne.nextTick;
  ne.off;
  ne.on;
  ne.once;
  ne.prependListener;
  ne.prependOnceListener;
  ne.removeAllListeners;
  ne.removeListener;
  ne.title;
  ne.umask;
  ne.version;
  ne.versions;
});
var Ya;
var sg;
var oi;
var re;
var Ja = _e(() => {
  _();
  v();
  m();
  Ya = {}, sg = false, oi = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : global;
  re = fE();
  re.platform = "browser";
  re.addListener;
  re.argv;
  re.binding;
  re.browser;
  re.chdir;
  re.cwd;
  re.emit;
  re.env;
  re.listeners;
  re.nextTick;
  re.off;
  re.on;
  re.once;
  re.prependListener;
  re.prependOnceListener;
  re.removeAllListeners;
  re.removeListener;
  re.title;
  re.umask;
  re.version;
  re.versions;
});
var Xa;
var og;
var Za;
var ag = _e(() => {
  _();
  v();
  m();
  Ja();
  Xa = {}, og = false;
  Za = cE();
});
var gg = {};
Jt(gg, { URL: () => FE, Url: () => UE, default: () => Z, fileURLToPath: () => dg, format: () => NE, parse: () => jE, pathToFileURL: () => pg, resolve: () => qE, resolveObject: () => DE });
var Z;
var hE;
var gt;
var dE;
var pE;
var gE;
var yE;
var il;
var lg;
var ug;
var fg;
var bE;
var wE;
var el;
var ai;
var tl;
var rl;
var cg;
var hg;
var mE;
var vE;
var EE;
var SE;
var AE;
var nl;
var IE;
var TE;
var RE;
var CE;
var BE;
var PE;
var LE;
var UE;
var NE;
var qE;
var DE;
var jE;
var FE;
var WE;
var $E;
var HE;
var VE;
var sl;
var zE;
var KE;
var GE;
var QE;
var YE;
var JE;
var yg = _e(() => {
  _();
  v();
  m();
  Xp();
  Zp();
  ng();
  ag();
  Ja();
  Z = {}, hE = Kt, gt = { isString: function(t) {
    return typeof t == "string";
  }, isObject: function(t) {
    return typeof t == "object" && t !== null;
  }, isNull: function(t) {
    return t === null;
  }, isNullOrUndefined: function(t) {
    return t == null;
  } };
  Z.parse = Li, Z.resolve = function(t, e) {
    return Li(t, false, true).resolve(e);
  }, Z.resolveObject = function(t, e) {
    return t ? Li(t, false, true).resolveObject(e) : e;
  }, Z.format = function(t) {
    return gt.isString(t) && (t = Li(t)), t instanceof Fe ? t.format() : Fe.prototype.format.call(t);
  }, Z.Url = Fe;
  dE = /^([a-z0-9.+-]+:)/i, pE = /:[0-9]*$/, gE = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/, yE = ["{", "}", "|", "\\", "^", "`"].concat(["<", ">", '"', "`", " ", "\r", `
`, "	"]), il = ["'"].concat(yE), lg = ["%", "/", "?", ";", "#"].concat(il), ug = ["/", "?", "#"], fg = /^[+a-z0-9A-Z_-]{0,63}$/, bE = /^([+a-z0-9A-Z_-]{0,63})(.*)$/, wE = { javascript: true, "javascript:": true }, el = { javascript: true, "javascript:": true }, ai = { http: true, https: true, ftp: true, gopher: true, file: true, "http:": true, "https:": true, "ftp:": true, "gopher:": true, "file:": true }, tl = pt;
  Fe.prototype.parse = function(t, e, r) {
    if (!gt.isString(t))
      throw new TypeError("Parameter 'url' must be a string, not " + typeof t);
    var i = t.indexOf("?"), n = i !== -1 && i < t.indexOf("#") ? "?" : "#", o = t.split(n);
    o[0] = o[0].replace(/\\/g, "/");
    var s = t = o.join(n);
    if (s = s.trim(), !r && t.split("#").length === 1) {
      var a = gE.exec(s);
      if (a)
        return this.path = s, this.href = s, this.pathname = a[1], a[2] ? (this.search = a[2], this.query = e ? tl.parse(this.search.substr(1)) : this.search.substr(1)) : e && (this.search = "", this.query = {}), this;
    }
    var l = dE.exec(s);
    if (l) {
      var c = (l = l[0]).toLowerCase();
      this.protocol = c, s = s.substr(l.length);
    }
    if (r || l || s.match(/^\/\/[^@\/]+@[^@\/]+/)) {
      var h = s.substr(0, 2) === "//";
      !h || l && el[l] || (s = s.substr(2), this.slashes = true);
    }
    if (!el[l] && (h || l && !ai[l])) {
      for (var d, g, y = -1, w = 0;w < ug.length; w++)
        (S = s.indexOf(ug[w])) !== -1 && (y === -1 || S < y) && (y = S);
      for ((g = y === -1 ? s.lastIndexOf("@") : s.lastIndexOf("@", y)) !== -1 && (d = s.slice(0, g), s = s.slice(g + 1), this.auth = decodeURIComponent(d)), y = -1, w = 0;w < lg.length; w++) {
        var S;
        (S = s.indexOf(lg[w])) !== -1 && (y === -1 || S < y) && (y = S);
      }
      y === -1 && (y = s.length), this.host = s.slice(0, y), s = s.slice(y), this.parseHost(), this.hostname = this.hostname || "";
      var E = this.hostname[0] === "[" && this.hostname[this.hostname.length - 1] === "]";
      if (!E)
        for (var I = this.hostname.split(/\./), C = (w = 0, I.length);w < C; w++) {
          var R = I[w];
          if (R && !R.match(fg)) {
            for (var U = "", N = 0, W = R.length;N < W; N++)
              R.charCodeAt(N) > 127 ? U += "x" : U += R[N];
            if (!U.match(fg)) {
              var K = I.slice(0, w), z = I.slice(w + 1), Q = R.match(bE);
              Q && (K.push(Q[1]), z.unshift(Q[2])), z.length && (s = "/" + z.join(".") + s), this.hostname = K.join(".");
              break;
            }
          }
        }
      this.hostname.length > 255 ? this.hostname = "" : this.hostname = this.hostname.toLowerCase(), E || (this.hostname = hE.toASCII(this.hostname));
      var pe = this.port ? ":" + this.port : "", Yt = this.hostname || "";
      this.host = Yt + pe, this.href += this.host, E && (this.hostname = this.hostname.substr(1, this.hostname.length - 2), s[0] !== "/" && (s = "/" + s));
    }
    if (!wE[c])
      for (w = 0, C = il.length;w < C; w++) {
        var ge = il[w];
        if (s.indexOf(ge) !== -1) {
          var Pr = encodeURIComponent(ge);
          Pr === ge && (Pr = escape(ge)), s = s.split(ge).join(Pr);
        }
      }
    var kr = s.indexOf("#");
    kr !== -1 && (this.hash = s.substr(kr), s = s.slice(0, kr));
    var Or = s.indexOf("?");
    if (Or !== -1 ? (this.search = s.substr(Or), this.query = s.substr(Or + 1), e && (this.query = tl.parse(this.query)), s = s.slice(0, Or)) : e && (this.search = "", this.query = {}), s && (this.pathname = s), ai[c] && this.hostname && !this.pathname && (this.pathname = "/"), this.pathname || this.search) {
      pe = this.pathname || "";
      var hs = this.search || "";
      this.path = pe + hs;
    }
    return this.href = this.format(), this;
  }, Fe.prototype.format = function() {
    var t = this.auth || "";
    t && (t = (t = encodeURIComponent(t)).replace(/%3A/i, ":"), t += "@");
    var e = this.protocol || "", r = this.pathname || "", i = this.hash || "", n = false, o = "";
    this.host ? n = t + this.host : this.hostname && (n = t + (this.hostname.indexOf(":") === -1 ? this.hostname : "[" + this.hostname + "]"), this.port && (n += ":" + this.port)), this.query && gt.isObject(this.query) && Object.keys(this.query).length && (o = tl.stringify(this.query));
    var s = this.search || o && "?" + o || "";
    return e && e.substr(-1) !== ":" && (e += ":"), this.slashes || (!e || ai[e]) && n !== false ? (n = "//" + (n || ""), r && r.charAt(0) !== "/" && (r = "/" + r)) : n || (n = ""), i && i.charAt(0) !== "#" && (i = "#" + i), s && s.charAt(0) !== "?" && (s = "?" + s), e + n + (r = r.replace(/[?#]/g, function(a) {
      return encodeURIComponent(a);
    })) + (s = s.replace("#", "%23")) + i;
  }, Fe.prototype.resolve = function(t) {
    return this.resolveObject(Li(t, false, true)).format();
  }, Fe.prototype.resolveObject = function(t) {
    if (gt.isString(t)) {
      var e = new Fe;
      e.parse(t, false, true), t = e;
    }
    for (var r = new Fe, i = Object.keys(this), n = 0;n < i.length; n++) {
      var o = i[n];
      r[o] = this[o];
    }
    if (r.hash = t.hash, t.href === "")
      return r.href = r.format(), r;
    if (t.slashes && !t.protocol) {
      for (var s = Object.keys(t), a = 0;a < s.length; a++) {
        var l = s[a];
        l !== "protocol" && (r[l] = t[l]);
      }
      return ai[r.protocol] && r.hostname && !r.pathname && (r.path = r.pathname = "/"), r.href = r.format(), r;
    }
    if (t.protocol && t.protocol !== r.protocol) {
      if (!ai[t.protocol]) {
        for (var c = Object.keys(t), h = 0;h < c.length; h++) {
          var d = c[h];
          r[d] = t[d];
        }
        return r.href = r.format(), r;
      }
      if (r.protocol = t.protocol, t.host || el[t.protocol])
        r.pathname = t.pathname;
      else {
        for (var g = (t.pathname || "").split("/");g.length && !(t.host = g.shift()); )
          ;
        t.host || (t.host = ""), t.hostname || (t.hostname = ""), g[0] !== "" && g.unshift(""), g.length < 2 && g.unshift(""), r.pathname = g.join("/");
      }
      if (r.search = t.search, r.query = t.query, r.host = t.host || "", r.auth = t.auth, r.hostname = t.hostname || t.host, r.port = t.port, r.pathname || r.search) {
        var y = r.pathname || "", w = r.search || "";
        r.path = y + w;
      }
      return r.slashes = r.slashes || t.slashes, r.href = r.format(), r;
    }
    var S = r.pathname && r.pathname.charAt(0) === "/", E = t.host || t.pathname && t.pathname.charAt(0) === "/", I = E || S || r.host && t.pathname, C = I, R = r.pathname && r.pathname.split("/") || [], U = (g = t.pathname && t.pathname.split("/") || [], r.protocol && !ai[r.protocol]);
    if (U && (r.hostname = "", r.port = null, r.host && (R[0] === "" ? R[0] = r.host : R.unshift(r.host)), r.host = "", t.protocol && (t.hostname = null, t.port = null, t.host && (g[0] === "" ? g[0] = t.host : g.unshift(t.host)), t.host = null), I = I && (g[0] === "" || R[0] === "")), E)
      r.host = t.host || t.host === "" ? t.host : r.host, r.hostname = t.hostname || t.hostname === "" ? t.hostname : r.hostname, r.search = t.search, r.query = t.query, R = g;
    else if (g.length)
      R || (R = []), R.pop(), R = R.concat(g), r.search = t.search, r.query = t.query;
    else if (!gt.isNullOrUndefined(t.search))
      return U && (r.hostname = r.host = R.shift(), (Q = !!(r.host && r.host.indexOf("@") > 0) && r.host.split("@")) && (r.auth = Q.shift(), r.host = r.hostname = Q.shift())), r.search = t.search, r.query = t.query, gt.isNull(r.pathname) && gt.isNull(r.search) || (r.path = (r.pathname ? r.pathname : "") + (r.search ? r.search : "")), r.href = r.format(), r;
    if (!R.length)
      return r.pathname = null, r.search ? r.path = "/" + r.search : r.path = null, r.href = r.format(), r;
    for (var N = R.slice(-1)[0], W = (r.host || t.host || R.length > 1) && (N === "." || N === "..") || N === "", K = 0, z = R.length;z >= 0; z--)
      (N = R[z]) === "." ? R.splice(z, 1) : N === ".." ? (R.splice(z, 1), K++) : K && (R.splice(z, 1), K--);
    if (!I && !C)
      for (;K--; K)
        R.unshift("..");
    !I || R[0] === "" || R[0] && R[0].charAt(0) === "/" || R.unshift(""), W && R.join("/").substr(-1) !== "/" && R.push("");
    var Q, pe = R[0] === "" || R[0] && R[0].charAt(0) === "/";
    return U && (r.hostname = r.host = pe ? "" : R.length ? R.shift() : "", (Q = !!(r.host && r.host.indexOf("@") > 0) && r.host.split("@")) && (r.auth = Q.shift(), r.host = r.hostname = Q.shift())), (I = I || r.host && R.length) && !pe && R.unshift(""), R.length ? r.pathname = R.join("/") : (r.pathname = null, r.path = null), gt.isNull(r.pathname) && gt.isNull(r.search) || (r.path = (r.pathname ? r.pathname : "") + (r.search ? r.search : "")), r.auth = t.auth || r.auth, r.slashes = r.slashes || t.slashes, r.href = r.format(), r;
  }, Fe.prototype.parseHost = function() {
    var t = this.host, e = pE.exec(t);
    e && ((e = e[0]) !== ":" && (this.port = e.substr(1)), t = t.substr(0, t.length - e.length)), t && (this.hostname = t);
  };
  Z.Url;
  Z.format;
  Z.resolve;
  Z.resolveObject;
  rl = {}, cg = false;
  hg = _E(), mE = typeof Deno < "u" ? Deno.build.os === "windows" ? "win32" : Deno.build.os : undefined;
  Z.URL = typeof URL < "u" ? URL : null;
  Z.pathToFileURL = ME;
  Z.fileURLToPath = kE;
  Z.Url;
  Z.format;
  Z.resolve;
  Z.resolveObject;
  Z.URL;
  vE = 92, EE = 47, SE = 97, AE = 122, nl = mE === "win32", IE = /\//g, TE = /%/g, RE = /\\/g, CE = /\n/g, BE = /\r/g, PE = /\t/g;
  LE = typeof Deno < "u" ? Deno.build.os === "windows" ? "win32" : Deno.build.os : undefined;
  Z.URL = typeof URL < "u" ? URL : null;
  Z.pathToFileURL = pg;
  Z.fileURLToPath = dg;
  UE = Z.Url, NE = Z.format, qE = Z.resolve, DE = Z.resolveObject, jE = Z.parse, FE = Z.URL, WE = 92, $E = 47, HE = 97, VE = 122, sl = LE === "win32", zE = /\//g, KE = /%/g, GE = /\\/g, QE = /\n/g, YE = /\r/g, JE = /\t/g;
});
var wg = M((m8, bg) => {
  _();
  v();
  m();
  bg.exports = function() {
    throw new Error("ws does not work in the browser. Browser clients must use the native WebSocket object");
  };
});
var ls = M((li) => {
  _();
  v();
  m();
  Object.defineProperty(li, "__esModule", { value: true });
  li.BufferedDuplex = li.writev = undefined;
  var eS = jt(), _g = (be(), X(me));
  function mg(t, e) {
    let r = new Array(t.length);
    for (let i = 0;i < t.length; i++)
      typeof t[i].chunk == "string" ? r[i] = _g.Buffer.from(t[i].chunk, "utf8") : r[i] = t[i].chunk;
    this._write(_g.Buffer.concat(r), "binary", e);
  }
  li.writev = mg;
  var ol = class extends eS.Duplex {
    constructor(e, r, i) {
      super({ objectMode: true }), this.proxy = r, this.socket = i, this.writeQueue = [], e.objectMode || (this._writev = mg.bind(this)), this.isSocketOpen = false, this.proxy.on("data", (n) => {
        this.destroyed || this.push(n);
      });
    }
    _read(e) {
      this.proxy.read(e);
    }
    _write(e, r, i) {
      this.isSocketOpen ? this.writeToProxy(e, r, i) : this.writeQueue.push({ chunk: e, encoding: r, cb: i });
    }
    _final(e) {
      this.writeQueue = [], this.proxy.end(e);
    }
    _destroy(e, r) {
      this.writeQueue = [], this.proxy.destroy(), r(e);
    }
    socketReady() {
      this.emit("connect"), this.isSocketOpen = true, this.processWriteQueue();
    }
    writeToProxy(e, r, i) {
      this.proxy.write(e, r) === false ? this.proxy.once("drain", i) : i();
    }
    processWriteQueue() {
      for (;this.writeQueue.length > 0; ) {
        let { chunk: e, encoding: r, cb: i } = this.writeQueue.shift();
        this.writeToProxy(e, r, i);
      }
    }
  };
  li.BufferedDuplex = ol;
});
var Ui = M((Qt) => {
  _();
  v();
  m();
  var ll = Qt && Qt.__importDefault || function(t) {
    return t && t.__esModule ? t : { default: t };
  };
  Object.defineProperty(Qt, "__esModule", { value: true });
  Qt.streamBuilder = Qt.browserStreamBuilder = undefined;
  var us = (be(), X(me)), vg = ll(wg()), tS = ll(ot()), rS = jt(), iS = ll(Oi()), al = ls(), Gt = (0, tS.default)("mqttjs:ws"), nS = ["rejectUnauthorized", "ca", "cert", "key", "pfx", "passphrase"];
  function Eg(t, e) {
    let r = `${t.protocol}://${t.hostname}:${t.port}${t.path}`;
    return typeof t.transformWsUrl == "function" && (r = t.transformWsUrl(r, t, e)), r;
  }
  function Sg(t) {
    let e = t;
    return t.port || (t.protocol === "wss" ? e.port = 443 : e.port = 80), t.path || (e.path = "/"), t.wsOptions || (e.wsOptions = {}), !iS.default && !t.forceNativeWebSocket && t.protocol === "wss" && nS.forEach((r) => {
      Object.prototype.hasOwnProperty.call(t, r) && !Object.prototype.hasOwnProperty.call(t.wsOptions, r) && (e.wsOptions[r] = t[r]);
    }), e;
  }
  function sS(t) {
    let e = Sg(t);
    if (e.hostname || (e.hostname = e.host), !e.hostname) {
      if (typeof document > "u")
        throw new Error("Could not determine host. Specify host manually.");
      let r = new URL(document.URL);
      e.hostname = r.hostname, e.port || (e.port = Number(r.port));
    }
    return e.objectMode === undefined && (e.objectMode = !(e.binary === true || e.binary === undefined)), e;
  }
  function oS(t, e, r) {
    Gt("createWebSocket"), Gt(`protocol: ${r.protocolId} ${r.protocolVersion}`);
    let i = r.protocolId === "MQIsdp" && r.protocolVersion === 3 ? "mqttv3.1" : "mqtt";
    Gt(`creating new Websocket for url: ${e} and protocol: ${i}`);
    let n;
    return r.createWebsocket ? n = r.createWebsocket(e, [i], r) : n = new vg.default(e, [i], r.wsOptions), n;
  }
  function aS(t, e) {
    let r = e.protocolId === "MQIsdp" && e.protocolVersion === 3 ? "mqttv3.1" : "mqtt", i = Eg(e, t), n;
    return e.createWebsocket ? n = e.createWebsocket(i, [r], e) : n = new WebSocket(i, [r]), n.binaryType = "arraybuffer", n;
  }
  var lS = (t, e) => {
    Gt("streamBuilder");
    let r = Sg(e);
    r.hostname = r.hostname || r.host || "localhost";
    let i = Eg(r, t), n = oS(t, i, r), o = vg.default.createWebSocketStream(n, r.wsOptions);
    return o.url = i, n.on("close", () => {
      o.destroy();
    }), o;
  };
  Qt.streamBuilder = lS;
  var uS = (t, e) => {
    Gt("browserStreamBuilder");
    let r, n = sS(e).browserBufferSize || 1024 * 512, o = e.browserBufferTimeout || 1000, s = !e.objectMode, a = aS(t, e), l = h(e, S, E);
    e.objectMode || (l._writev = al.writev.bind(l)), l.on("close", () => {
      a.close();
    });
    let c = typeof a.addEventListener < "u";
    a.readyState === a.OPEN ? (r = l, r.socket = a) : (r = new al.BufferedDuplex(e, l, a), c ? a.addEventListener("open", d) : a.onopen = d), c ? (a.addEventListener("close", g), a.addEventListener("error", y), a.addEventListener("message", w)) : (a.onclose = g, a.onerror = y, a.onmessage = w);
    function h(I, C, R) {
      let U = new rS.Transform({ objectMode: I.objectMode });
      return U._write = C, U._flush = R, U;
    }
    function d() {
      Gt("WebSocket onOpen"), r instanceof al.BufferedDuplex && r.socketReady();
    }
    function g(I) {
      Gt("WebSocket onClose", I), r.end(), r.destroy();
    }
    function y(I) {
      Gt("WebSocket onError", I);
      let C = new Error("WebSocket error");
      C.event = I, r.destroy(C);
    }
    async function w(I) {
      let { data: C } = I;
      C instanceof ArrayBuffer ? C = us.Buffer.from(C) : C instanceof Blob ? C = us.Buffer.from(await new Response(C).arrayBuffer()) : C = us.Buffer.from(C, "utf8"), l && !l.destroyed && l.push(C);
    }
    function S(I, C, R) {
      if (a.bufferedAmount > n) {
        setTimeout(S, o, I, C, R);
        return;
      }
      s && typeof I == "string" && (I = us.Buffer.from(I, "utf8"));
      try {
        a.send(I);
      } catch (U) {
        return R(U);
      }
      R();
    }
    function E(I) {
      a.close(), I();
    }
    return r;
  };
  Qt.browserStreamBuilder = uS;
});
var ul = {};
Jt(ul, { Server: () => Me, Socket: () => Me, Stream: () => Me, _createServerHandle: () => Me, _normalizeArgs: () => Me, _setSimultaneousAccepts: () => Me, connect: () => Me, createConnection: () => Me, createServer: () => Me, default: () => fS, isIP: () => Me, isIPv4: () => Me, isIPv6: () => Me });
var fS;
var fl = _e(() => {
  _();
  v();
  m();
  fS = { _createServerHandle: Me, _normalizeArgs: Me, _setSimultaneousAccepts: Me, connect: Me, createConnection: Me, createServer: Me, isIP: Me, isIPv4: Me, isIPv6: Me, Server: Me, Socket: Me, Stream: Me };
});
var cl = M((Ni) => {
  _();
  v();
  m();
  var Ag = Ni && Ni.__importDefault || function(t) {
    return t && t.__esModule ? t : { default: t };
  };
  Object.defineProperty(Ni, "__esModule", { value: true });
  var cS = Ag((fl(), X(ul))), hS = Ag(ot()), dS = (0, hS.default)("mqttjs:tcp"), pS = (t, e) => {
    e.port = e.port || 1883, e.hostname = e.hostname || e.host || "localhost";
    let { port: r, path: i } = e, n = e.hostname;
    return dS("port %d and host %s", r, n), cS.default.createConnection({ port: r, host: n, path: i });
  };
  Ni.default = pS;
});
var Ig = {};
Jt(Ig, { default: () => gS });
var gS;
var Tg = _e(() => {
  _();
  v();
  m();
  gS = {};
});
var dl = M((qi) => {
  _();
  v();
  m();
  var hl = qi && qi.__importDefault || function(t) {
    return t && t.__esModule ? t : { default: t };
  };
  Object.defineProperty(qi, "__esModule", { value: true });
  var yS = hl((Tg(), X(Ig))), bS = hl((fl(), X(ul))), wS = hl(ot()), _S = (0, wS.default)("mqttjs:tls"), mS = (t, e) => {
    e.port = e.port || 8883, e.host = e.hostname || e.host || "localhost", bS.default.isIP(e.host) === 0 && (e.servername = e.host), e.rejectUnauthorized = e.rejectUnauthorized !== false, delete e.path, _S("port %d host %s rejectUnauthorized %b", e.port, e.host, e.rejectUnauthorized);
    let r = yS.default.connect(e);
    r.on("secureConnect", () => {
      e.rejectUnauthorized && !r.authorized ? r.emit("error", new Error("TLS not authorized")) : r.removeListener("error", i);
    });
    function i(n) {
      e.rejectUnauthorized && t.emit("error", n), r.end();
    }
    return r.on("error", i), r;
  };
  qi.default = mS;
});
var yl = M((gl) => {
  _();
  v();
  m();
  Object.defineProperty(gl, "__esModule", { value: true });
  var Rg = (be(), X(me)), vS = jt(), ES = ls(), yt, pl, Le;
  function SS() {
    let t = new vS.Transform;
    return t._write = (e, r, i) => {
      yt.send({ data: e.buffer, success() {
        i();
      }, fail(n) {
        i(new Error(n));
      } });
    }, t._flush = (e) => {
      yt.close({ success() {
        e();
      } });
    }, t;
  }
  function AS(t) {
    t.hostname || (t.hostname = "localhost"), t.path || (t.path = "/"), t.wsOptions || (t.wsOptions = {});
  }
  function IS(t, e) {
    let r = t.protocol === "wxs" ? "wss" : "ws", i = `${r}://${t.hostname}${t.path}`;
    return t.port && t.port !== 80 && t.port !== 443 && (i = `${r}://${t.hostname}:${t.port}${t.path}`), typeof t.transformWsUrl == "function" && (i = t.transformWsUrl(i, t, e)), i;
  }
  function TS() {
    yt.onOpen(() => {
      Le.socketReady();
    }), yt.onMessage((t) => {
      let { data: e } = t;
      e instanceof ArrayBuffer ? e = Rg.Buffer.from(e) : e = Rg.Buffer.from(e, "utf8"), pl.push(e);
    }), yt.onClose(() => {
      Le.emit("close"), Le.end(), Le.destroy();
    }), yt.onError((t) => {
      let e = new Error(t.errMsg);
      Le.destroy(e);
    });
  }
  var RS = (t, e) => {
    if (e.hostname = e.hostname || e.host, !e.hostname)
      throw new Error("Could not determine host. Specify host manually.");
    let r = e.protocolId === "MQIsdp" && e.protocolVersion === 3 ? "mqttv3.1" : "mqtt";
    AS(e);
    let i = IS(e, t);
    yt = wx.connectSocket({ url: i, protocols: [r] }), pl = SS(), Le = new ES.BufferedDuplex(e, pl, yt), Le._destroy = (o, s) => {
      yt.close({ success() {
        s && s(o);
      } });
    };
    let n = Le.destroy;
    return Le.destroy = (o, s) => (Le.destroy = n, setTimeout(() => {
      yt.close({ fail() {
        Le._destroy(o, s);
      } });
    }, 0), Le), TS(), Le;
  };
  gl.default = RS;
});
var _l = M((wl) => {
  _();
  v();
  m();
  Object.defineProperty(wl, "__esModule", { value: true });
  var bl = (be(), X(me)), CS = jt(), BS = ls(), xt, fs, ui, Cg = false;
  function PS() {
    let t = new CS.Transform;
    return t._write = (e, r, i) => {
      xt.sendSocketMessage({ data: e.buffer, success() {
        i();
      }, fail() {
        i(new Error);
      } });
    }, t._flush = (e) => {
      xt.closeSocket({ success() {
        e();
      } });
    }, t;
  }
  function kS(t) {
    t.hostname || (t.hostname = "localhost"), t.path || (t.path = "/"), t.wsOptions || (t.wsOptions = {});
  }
  function OS(t, e) {
    let r = t.protocol === "alis" ? "wss" : "ws", i = `${r}://${t.hostname}${t.path}`;
    return t.port && t.port !== 80 && t.port !== 443 && (i = `${r}://${t.hostname}:${t.port}${t.path}`), typeof t.transformWsUrl == "function" && (i = t.transformWsUrl(i, t, e)), i;
  }
  function xS() {
    Cg || (Cg = true, xt.onSocketOpen(() => {
      ui.socketReady();
    }), xt.onSocketMessage((t) => {
      if (typeof t.data == "string") {
        let e = bl.Buffer.from(t.data, "base64");
        fs.push(e);
      } else {
        let e = new FileReader;
        e.addEventListener("load", () => {
          let r = e.result;
          r instanceof ArrayBuffer ? r = bl.Buffer.from(r) : r = bl.Buffer.from(r, "utf8"), fs.push(r);
        }), e.readAsArrayBuffer(t.data);
      }
    }), xt.onSocketClose(() => {
      ui.end(), ui.destroy();
    }), xt.onSocketError((t) => {
      ui.destroy(t);
    }));
  }
  var MS = (t, e) => {
    if (e.hostname = e.hostname || e.host, !e.hostname)
      throw new Error("Could not determine host. Specify host manually.");
    let r = e.protocolId === "MQIsdp" && e.protocolVersion === 3 ? "mqttv3.1" : "mqtt";
    kS(e);
    let i = OS(e, t);
    return xt = e.my, xt.connectSocket({ url: i, protocols: r }), fs = PS(), ui = new BS.BufferedDuplex(e, fs, xt), xS(), ui;
  };
  wl.default = MS;
});
var kg = M((Br) => {
  _();
  v();
  m();
  var cs = Br && Br.__importDefault || function(t) {
    return t && t.__esModule ? t : { default: t };
  };
  Object.defineProperty(Br, "__esModule", { value: true });
  Br.connectAsync = undefined;
  var LS = cs(ot()), US = cs((yg(), X(gg))), NS = cs(os()), qS = cs(Oi());
  typeof (B === null || B === undefined ? undefined : B.nextTick) != "function" && (B.nextTick = setImmediate);
  var Bg = (0, LS.default)("mqttjs"), de = null;
  function DS(t) {
    let e;
    t.auth && (e = t.auth.match(/^(.+):(.+)$/), e ? (t.username = e[1], t.password = e[2]) : t.username = t.auth);
  }
  function Pg(t, e) {
    var r, i, n, o;
    if (Bg("connecting to an MQTT broker..."), typeof t == "object" && !e && (e = t, t = ""), e = e || {}, t && typeof t == "string") {
      let l = US.default.parse(t, true), c = {};
      if (l.port != null && (c.port = Number(l.port)), c.host = l.hostname, c.query = l.query, c.auth = l.auth, c.protocol = l.protocol, c.path = l.path, c.protocol = (r = c.protocol) === null || r === undefined ? undefined : r.replace(/:$/, ""), e = Object.assign(Object.assign({}, c), e), !e.protocol)
        throw new Error("Missing protocol");
    }
    if (e.unixSocket = e.unixSocket || ((i = e.protocol) === null || i === undefined ? undefined : i.includes("+unix")), e.unixSocket ? e.protocol = e.protocol.replace("+unix", "") : !(!((n = e.protocol) === null || n === undefined) && n.startsWith("ws")) && !(!((o = e.protocol) === null || o === undefined) && o.startsWith("wx")) && delete e.path, DS(e), e.query && typeof e.query.clientId == "string" && (e.clientId = e.query.clientId), e.cert && e.key)
      if (e.protocol) {
        if (["mqtts", "wss", "wxs", "alis"].indexOf(e.protocol) === -1)
          switch (e.protocol) {
            case "mqtt":
              e.protocol = "mqtts";
              break;
            case "ws":
              e.protocol = "wss";
              break;
            case "wx":
              e.protocol = "wxs";
              break;
            case "ali":
              e.protocol = "alis";
              break;
            default:
              throw new Error(`Unknown protocol for secure connection: "${e.protocol}"!`);
          }
      } else
        throw new Error("Missing secure protocol key");
    if (de || (de = {}, !qS.default && !e.forceNativeWebSocket ? (de.ws = Ui().streamBuilder, de.wss = Ui().streamBuilder, de.mqtt = cl().default, de.tcp = cl().default, de.ssl = dl().default, de.tls = de.ssl, de.mqtts = dl().default) : (de.ws = Ui().browserStreamBuilder, de.wss = Ui().browserStreamBuilder, de.wx = yl().default, de.wxs = yl().default, de.ali = _l().default, de.alis = _l().default)), !de[e.protocol]) {
      let l = ["mqtts", "wss"].indexOf(e.protocol) !== -1;
      e.protocol = ["mqtt", "mqtts", "ws", "wss", "wx", "wxs", "ali", "alis"].filter((c, h) => l && h % 2 === 0 ? false : typeof de[c] == "function")[0];
    }
    if (e.clean === false && !e.clientId)
      throw new Error("Missing clientId for unclean clients");
    e.protocol && (e.defaultProtocol = e.protocol);
    function s(l) {
      return e.servers && ((!l._reconnectCount || l._reconnectCount === e.servers.length) && (l._reconnectCount = 0), e.host = e.servers[l._reconnectCount].host, e.port = e.servers[l._reconnectCount].port, e.protocol = e.servers[l._reconnectCount].protocol ? e.servers[l._reconnectCount].protocol : e.defaultProtocol, e.hostname = e.host, l._reconnectCount++), Bg("calling streambuilder for", e.protocol), de[e.protocol](l, e);
    }
    let a = new NS.default(s, e);
    return a.on("error", () => {
    }), a;
  }
  function jS(t, e, r = true) {
    return new Promise((i, n) => {
      let o = Pg(t, e), s = { connect: (l) => {
        a(), i(o);
      }, end: () => {
        a(), i(o);
      }, error: (l) => {
        a(), o.end(), n(l);
      } };
      r === false && (s.close = () => {
        s.error(new Error("Couldn't connect to server"));
      });
      function a() {
        Object.keys(s).forEach((l) => {
          o.off(l, s[l]);
        });
      }
      Object.keys(s).forEach((l) => {
        o.on(l, s[l]);
      });
    });
  }
  Br.connectAsync = jS;
  Br.default = Pg;
});
var ml = M((G) => {
  _();
  v();
  m();
  var Og = G && G.__createBinding || (Object.create ? function(t, e, r, i) {
    i === undefined && (i = r);
    var n = Object.getOwnPropertyDescriptor(e, r);
    (!n || ("get" in n ? !e.__esModule : n.writable || n.configurable)) && (n = { enumerable: true, get: function() {
      return e[r];
    } }), Object.defineProperty(t, i, n);
  } : function(t, e, r, i) {
    i === undefined && (i = r), t[i] = e[r];
  }), FS = G && G.__setModuleDefault || (Object.create ? function(t, e) {
    Object.defineProperty(t, "default", { enumerable: true, value: e });
  } : function(t, e) {
    t.default = e;
  }), WS = G && G.__importStar || function(t) {
    if (t && t.__esModule)
      return t;
    var e = {};
    if (t != null)
      for (var r in t)
        r !== "default" && Object.prototype.hasOwnProperty.call(t, r) && Og(e, t, r);
    return FS(e, t), e;
  }, xg = G && G.__exportStar || function(t, e) {
    for (var r in t)
      r !== "default" && !Object.prototype.hasOwnProperty.call(e, r) && Og(e, t, r);
  }, Di = G && G.__importDefault || function(t) {
    return t && t.__esModule ? t : { default: t };
  };
  Object.defineProperty(G, "__esModule", { value: true });
  G.ReasonCodes = G.KeepaliveManager = G.UniqueMessageIdProvider = G.DefaultMessageIdProvider = G.Store = G.MqttClient = G.connectAsync = G.connect = G.Client = undefined;
  var Mg = Di(os());
  G.MqttClient = Mg.default;
  var $S = Di(Zo());
  G.DefaultMessageIdProvider = $S.default;
  var HS = Di(Vp());
  G.UniqueMessageIdProvider = HS.default;
  var VS = Di(ra());
  G.Store = VS.default;
  var Lg = WS(kg());
  G.connect = Lg.default;
  Object.defineProperty(G, "connectAsync", { enumerable: true, get: function() {
    return Lg.connectAsync;
  } });
  var zS = Di(Wa());
  G.KeepaliveManager = zS.default;
  G.Client = Mg.default;
  xg(os(), G);
  xg(_r(), G);
  var KS = Ti();
  Object.defineProperty(G, "ReasonCodes", { enumerable: true, get: function() {
    return KS.ReasonCodes;
  } });
});
var XS = M((We) => {
  _();
  v();
  m();
  var Ug = We && We.__createBinding || (Object.create ? function(t, e, r, i) {
    i === undefined && (i = r);
    var n = Object.getOwnPropertyDescriptor(e, r);
    (!n || ("get" in n ? !e.__esModule : n.writable || n.configurable)) && (n = { enumerable: true, get: function() {
      return e[r];
    } }), Object.defineProperty(t, i, n);
  } : function(t, e, r, i) {
    i === undefined && (i = r), t[i] = e[r];
  }), GS = We && We.__setModuleDefault || (Object.create ? function(t, e) {
    Object.defineProperty(t, "default", { enumerable: true, value: e });
  } : function(t, e) {
    t.default = e;
  }), QS = We && We.__importStar || function(t) {
    if (t && t.__esModule)
      return t;
    var e = {};
    if (t != null)
      for (var r in t)
        r !== "default" && Object.prototype.hasOwnProperty.call(t, r) && Ug(e, t, r);
    return GS(e, t), e;
  }, YS = We && We.__exportStar || function(t, e) {
    for (var r in t)
      r !== "default" && !Object.prototype.hasOwnProperty.call(e, r) && Ug(e, t, r);
  };
  Object.defineProperty(We, "__esModule", { value: true });
  var JS = QS(ml());
  We.default = JS;
  YS(ml(), We);
});
var mqtt_esm_default = XS();
/*! Bundled license information:

@jspm/core/nodelibs/browser/buffer.js:
  (*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> *)
*/

// node_modules/eventemitter3/index.mjs
var import_ = __toESM(require_eventemitter3(), 1);
var eventemitter3_default = import_.default;

// src/lib/parser.ts
function parse(payload) {
  try {
    if (!payload) {
      throw new ParseError("payload must not be empty");
    }
    const [src, dst, data] = payload.split("@@");
    if (isNaN(+src) || isNaN(+dst)) {
      throw new ParseError("src and dst must be a number");
    }
    if (!data) {
      throw new ParseError("data must not be empty");
    }
    const jsonData = JSON.parse(data);
    return {
      src: +src,
      dst: +dst,
      data: jsonData
    };
  } catch (err) {
    if (err instanceof ParseError) {
      throw err;
    }
    throw new ParseError("payload format is invalid");
  }
}
function stringify(src, dst, data) {
  if (typeof data !== "object") {
    throw new ParseError("data must be a javascript object");
  }
  return `${src}@@${dst}@@${JSON.stringify(data)}`;
}

class ParseError extends Error {
  constructor(message) {
    super(message);
    this.name = "ParseError";
  }
}

// src/lib/connector.ts
class ConnectorError extends Error {
  constructor(message) {
    super(message);
    this.name = "ConnectorError";
  }
}

class Connector extends eventemitter3_default {
  client;
  topic;
  selfAddress;
  constructor(options) {
    if (options.selfAddress === 0) {
      throw new Error("selfAddress cannot be broadcast");
    }
    super();
    this.client = mqtt_esm_default.connect(`mqtt://${options.host}:${options.port}`);
    this.topic = options.topic;
    this.selfAddress = options.selfAddress;
    this.client.on("connect", () => {
      this.client.subscribe(this.topic);
    });
    this.client.on("message", (topic, payload) => {
      try {
        const raw = payload.toString();
        const { src, data, dst } = parse(raw);
        const isBroadcast = dst === 0;
        if (!isBroadcast && dst !== this.selfAddress) {
          return;
        }
        if (isBroadcast) {
          return this.emit("broadcast", {
            src,
            dst,
            data,
            topic,
            raw
          });
        }
        return this.emit("message", {
          src,
          dst,
          data,
          topic,
          raw
        });
      } catch (err) {
        if (err instanceof ParseError) {
          console.error(err.message);
          return;
        }
        console.error("unknown error");
      }
    });
  }
  send(dst, data) {
    const payload = stringify(this.selfAddress, dst, data);
    this.client.publish(this.topic, payload);
  }
}
export {
  ConnectorError,
  Connector
};