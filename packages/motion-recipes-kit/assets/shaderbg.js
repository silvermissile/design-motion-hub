/* shaderbg.js — design-motion-hub (upgraded from motion-anything)
 * Dependency-free full-screen WebGL1/WebGL2 fragment-shader runner.
 * Supports two clocks:
 *   1. Real-time browser loop (default, requestAnimationFrame)
 *   2. Deterministic external clock for OpenMotion HyperFrames:
 *      pass { manual: true }, then call handle.renderAt(seconds) or handle.attachTimeline(gsapTl, durationSec)
 * Honors prefers-reduced-motion (renders static frame at t=2.0s).
 */
(function (g) {
  'use strict';
  function reduced() {
    return g.matchMedia && g.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
  function compile(gl, type, src) {
    var s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
      console.warn('[shaderbg]', gl.getShaderInfoLog(s));
    }
    return s;
  }

  g.ShaderBG = function (el, FRAG, opts) {
    if (!el || el.__sbg) return el && el.__sbgHandle;
    el.__sbg = 1;
    opts = opts || {};

    var isGL2 = /#version\s+300/.test(FRAG);
    var canvas = document.createElement('canvas');
    canvas.style.cssText = 'width:100%;height:100%;display:block';
    el.appendChild(canvas);

    var gl = isGL2 ? canvas.getContext('webgl2', { alpha: true, premultipliedAlpha: true, antialias: true }) : null;
    if (!gl) gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: true, antialias: true });
    if (!gl) {
      el.style.background = el.getAttribute('data-fallback') || '#0b0b12';
      return null;
    }

    var gl2 = isGL2 && (gl instanceof (g.WebGL2RenderingContext || function () {}));
    var VERT = gl2
      ? '#version 300 es\nin vec2 position;\nin vec2 uv;\nout vec2 vUv;\nvoid main(){ vUv=uv; gl_Position=vec4(position,0.0,1.0); }\n'
      : 'attribute vec2 position;\nattribute vec2 uv;\nvarying vec2 vUv;\nvoid main(){ vUv=uv; gl_Position=vec4(position,0.0,1.0); }\n';

    gl.clearColor(0, 0, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

    var p = gl.createProgram();
    gl.attachShader(p, compile(gl, gl.VERTEX_SHADER, VERT));
    gl.attachShader(p, compile(gl, gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(p);
    if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
      console.warn('[shaderbg] link', gl.getProgramInfoLog(p));
      el.style.background = el.getAttribute('data-fallback') || '#0b0b12';
      return null;
    }
    gl.useProgram(p);

    var pos = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, pos);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    var lp = gl.getAttribLocation(p, 'position');
    gl.enableVertexAttribArray(lp);
    gl.vertexAttribPointer(lp, 2, gl.FLOAT, false, 0, 0);

    var lu = gl.getAttribLocation(p, 'uv');
    if (lu >= 0) {
      var uvb = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, uvb);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0, 0, 2, 0, 0, 2]), gl.STATIC_DRAW);
      gl.enableVertexAttribArray(lu);
      gl.vertexAttribPointer(lu, 2, gl.FLOAT, false, 0, 0);
    }

    var U = {};
    ['uTime', 'iTime', 'uResolution', 'iResolution', 'uMouse'].forEach(function (n) {
      U[n] = gl.getUniformLocation(p, n);
    });
    var resDim3 = /vec3\s+(uResolution|iResolution)/.test(FRAG);

    function setU(c) {
      var t = c.s.t, v = c.s.v;
      if (t === '1f') gl.uniform1f(c.loc, v);
      else if (t === '2f') gl.uniform2f(c.loc, v[0], v[1]);
      else if (t === '3f') gl.uniform3f(c.loc, v[0], v[1], v[2]);
      else if (t === '1i') gl.uniform1i(c.loc, v);
      else if (t === '3fv') gl.uniform3fv(c.loc, new Float32Array(v));
      else if (t === '2fv') gl.uniform2fv(c.loc, new Float32Array(v));
      else if (t === '1fv') gl.uniform1fv(c.loc, new Float32Array(v));
    }

    var uni = opts.uniforms || {};
    Object.keys(uni).forEach(function (n) {
      var loc = gl.getUniformLocation(p, n);
      if (loc != null) setU({ loc: loc, s: uni[n] });
    });

    var mouse = [0.5, 0.5];
    el.addEventListener('pointermove', function (e) {
      var r = el.getBoundingClientRect();
      if (r.width && r.height) {
        mouse = [(e.clientX - r.left) / r.width, 1.0 - (e.clientY - r.top) / r.height];
      }
    });

    var W = 1, H = 1;
    function resize() {
      W = Math.max(1, el.offsetWidth || 600);
      H = Math.max(1, el.offsetHeight || 360);
      canvas.width = W;
      canvas.height = H;
      gl.viewport(0, 0, W, H);
    }
    g.addEventListener('resize', resize);
    resize();

    var red = reduced();
    var ts = opts.timeScale || 1;
    var lastTime = red ? 2.0 : 0;
    var rafId = 0;

    function renderAt(seconds) {
      var time = red ? 2.0 : Number(seconds || 0) * ts;
      lastTime = time;
      if (U.uTime) gl.uniform1f(U.uTime, time);
      if (U.iTime) gl.uniform1f(U.iTime, time);
      if (U.uResolution) { resDim3 ? gl.uniform3f(U.uResolution, W, H, 1) : gl.uniform2f(U.uResolution, W, H); }
      if (U.iResolution) { resDim3 ? gl.uniform3f(U.iResolution, W, H, 1) : gl.uniform2f(U.iResolution, W, H); }
      if (U.uMouse) gl.uniform2f(U.uMouse, mouse[0], mouse[1]);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    }

    function frame(t) {
      renderAt(t * 0.001);
      if (!red && !opts.manual) rafId = requestAnimationFrame(frame);
    }

    if (opts.manual || red) {
      renderAt(red ? 2.0 : 0);
    } else {
      rafId = requestAnimationFrame(frame);
    }

    var handle = {
      gl: gl,
      program: p,
      canvas: canvas,
      el: el,
      time: function () { return lastTime; },
      renderAt: renderAt,
      attachTimeline: function (tl, durationSec) {
        if (rafId) { cancelAnimationFrame(rafId); rafId = 0; }
        opts.manual = true;
        var dur = Math.max(0.1, Number(durationSec || 6));
        var proxy = { t: 0 };
        tl.to(proxy, {
          t: dur,
          duration: dur,
          ease: 'none',
          onUpdate: function () { renderAt(proxy.t); }
        }, 0);
      },
      stop: function () {
        if (rafId) { cancelAnimationFrame(rafId); rafId = 0; }
      },
      set: function (name, spec) {
        var loc = gl.getUniformLocation(p, name);
        if (loc == null) return;
        setU({ loc: loc, s: spec });
      }
    };
    el.__sbgHandle = handle;
    return handle;
  };
})(window);
