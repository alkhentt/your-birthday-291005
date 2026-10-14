(function () {
'use strict';
var C = window.CFG || {}, Q = new URLSearchParams(location.search);
var N = Q.get('nama') || C.nama || 'Sayang';
var D = Q.get('dari') || C.dari || 'Aku';
var S = Q.get('sejak') || C.sejak || '';
var $ = function (s, r) { return (r || document).querySelector(s); };
var sleep = function (ms) { return new Promise(function (r) { setTimeout(r, ms); }); };
var esc = function (t) { return String(t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
var fmt = function (t) { return String(t).replace(/\{nama\}/g, N).replace(/\{dari\}/g, D); };
function vib(p) { try { navigator.vibrate && navigator.vibrate(p); } catch (e) {} }
function shuffle(a) { return a.sort(function () { return Math.random() - .5; }); }

/* ---------- identitas ---------- */
$('#nn').textContent = D;
$('#hnm').textContent = D;
$('#avl').textContent = (D[0] || 'A').toUpperCase();
if (C.avatar) {
  var ai = $('#avi');
  ai.onload = function () { ai.hidden = false; };
  ai.src = C.avatar;
}

/* ---------- video background ---------- */
var v = $('#bgv');
function pl() { try { var p = v.play(); if (p && p.catch) p.catch(function () {}); } catch (e) {} }
v.addEventListener('loadeddata', function () { v.style.display = 'block'; pl(); });
v.addEventListener('error', function () { v.style.display = 'none'; });
if (C.video) v.src = C.video;
if (Q.get('edit')) {
  $('#ed').hidden = false;
  $('#ed').onclick = function () { $('#fi').click(); };
  $('#fi').onchange = function (e) { var f = e.target.files[0]; if (f) v.src = URL.createObjectURL(f); };
}

/* ---------- confetti ---------- */
var cv = $('#fx'), cx = cv.getContext('2d'), ps = [];
var cl = ['#ff6fa5', '#ffd479', '#fff', '#ffb6cb', '#ff9a8b', '#c8a2ff'];
function rs() { cv.width = innerWidth; cv.height = innerHeight; }
rs(); addEventListener('resize', rs);
function burst(x, y, n) {
  for (var i = 0; i < (n || 100); i++) {
    var a = Math.random() * 6.28, s = 3 + Math.random() * 9;
    ps.push({ x: x, y: y, vx: Math.cos(a) * s, vy: Math.sin(a) * s - 5, r: 2.5 + Math.random() * 4, c: cl[i % 6], l: 110 + Math.random() * 50, t: Math.random() * 6 });
  }
}
function rain(n) {
  for (var i = 0; i < (n || 120); i++) ps.push({ x: Math.random() * cv.width, y: -20 - Math.random() * 400, vx: Math.random() * 2 - 1, vy: 2 + Math.random() * 3, r: 3 + Math.random() * 4, c: cl[i % 6], l: 320, t: Math.random() * 6 });
}
function mid(n) { burst(innerWidth / 2, innerHeight / 2, n || 220); }
(function lp() {
  cx.clearRect(0, 0, cv.width, cv.height);
  ps = ps.filter(function (p) { return p.l > 0; });
  ps.forEach(function (p) {
    p.x += p.vx; p.y += p.vy; p.vy += .17; p.vx *= .99; p.l--; p.t += .2;
    cx.save(); cx.globalAlpha = Math.min(1, p.l / 40); cx.translate(p.x, p.y); cx.rotate(p.t);
    cx.fillStyle = p.c; cx.fillRect(-p.r, -p.r / 2, p.r * 2, p.r); cx.restore();
  });
  requestAnimationFrame(lp);
})();

/* ---------- musik (Happy Birthday, WebAudio) ---------- */
var ac;
var M = [[392,.75],[392,.25],[440,1],[392,1],[523,1],[494,2],[392,.75],[392,.25],[440,1],[392,1],[587,1],[523,2],[392,.75],[392,.25],[784,1],[659,1],[523,1],[494,1],[440,2],[698,.75],[698,.25],[659,1],[523,1],[587,1],[523,2]];
function unlock() { try { ac = ac || new (window.AudioContext || window.webkitAudioContext)(); ac.resume(); } catch (e) {} }
function music() {
  unlock(); if (!ac) return 11;
  var t = ac.currentTime + .1, b = .45, st = t;
  M.forEach(function (n) {
    [['triangle', 1, .15], ['sine', .5, .08]].forEach(function (w) {
      var o = ac.createOscillator(), g = ac.createGain();
      o.type = w[0]; o.frequency.value = n[0] * w[1];
      g.gain.setValueAtTime(.0001, t);
      g.gain.exponentialRampToValueAtTime(w[2], t + .03);
      g.gain.exponentialRampToValueAtTime(.0001, t + n[1] * b);
      o.connect(g); g.connect(ac.destination); o.start(t); o.stop(t + n[1] * b + .05);
    });
    t += n[1] * b;
  });
  return t - st;
}

/* ---------- lock screen ---------- */
var lk = $('#lock'), opened = 0, y0 = null, dy = 0;
function clock() {
  var d = new Date();
  $('#lc').textContent = d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
  $('#ld').textContent = d.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' });
}
clock(); setInterval(clock, 10000);
function open() {
  if (opened) return; opened = 1; unlock(); vib([30, 30, 30]);
  if (v.src) pl();
  lk.style.transform = ''; lk.classList.add('gone'); document.body.classList.add('chat');
  setTimeout(run, 900);
}
lk.addEventListener('pointerdown', function (e) { y0 = e.clientY; dy = 0; lk.style.transition = 'none'; });
lk.addEventListener('pointermove', function (e) { if (y0 === null) return; dy = Math.min(0, e.clientY - y0); lk.style.transform = 'translateY(' + dy + 'px)'; });
function lu() { if (y0 === null) return; lk.style.transition = ''; if (dy < -110) open(); else lk.style.transform = ''; y0 = null; }
lk.addEventListener('pointerup', lu); lk.addEventListener('pointercancel', lu);
$('#nt').addEventListener('click', open);

/* ---------- chat engine ---------- */
var th = $('#th'), ch = $('#ch'), fk = $('#fk'), hst = $('#hst');
function scroll() { setTimeout(function () { th.scrollTo({ top: th.scrollHeight, behavior: 'smooth' }); }, 30); }
function row(cls) { var r = document.createElement('div'); r.className = 'm ' + cls; th.appendChild(r); return r; }
function now() { return new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }); }
function bubble(cls, html) {
  var r = row(cls), b = document.createElement('div');
  b.className = 'b'; b.innerHTML = html + '<span class="tm">' + now() + (cls === 'out' ? ' ✓✓' : '') + '</span>';
  r.appendChild(b); scroll(); return b;
}
async function say(t) {
  t = fmt(t); hst.textContent = 'sedang mengetik…';
  var r = row('in'), b = document.createElement('div');
  b.className = 'b ty'; b.innerHTML = '<i></i><i></i><i></i>'; r.appendChild(b); scroll();
  await sleep(Math.min(1800, 500 + t.length * 28));
  r.remove(); hst.textContent = 'online'; bubble('in', esc(t)); vib(12); await sleep(350);
}
function ask(opts) {
  return new Promise(function (res) {
    fk.hidden = true; ch.innerHTML = ''; ch.classList.add('on');
    opts.forEach(function (t, i) {
      var b = document.createElement('button'); b.textContent = t;
      b.onclick = function () { ch.classList.remove('on'); ch.innerHTML = ''; fk.hidden = false; bubble('out', esc(t)); vib(15); res(i); };
      ch.appendChild(b);
    });
  });
}
function card(fn, cls) {
  var r = row('in'), c = document.createElement('div');
  c.className = 'cardx ' + (cls || ''); r.appendChild(c);
  return new Promise(function (res) { fn(c, res); scroll(); }).then(function () { scroll(); });
}
/* double-tap bubble = reaksi hati */
var lt = 0, lb = null;
th.addEventListener('pointerup', function (e) {
  var b = e.target.closest && e.target.closest('.b'), n = Date.now();
  if (b && b === lb && n - lt < 320) {
    if (!$('.rx', b)) { var x = document.createElement('span'); x.className = 'rx'; x.textContent = '❤️'; b.appendChild(x); }
    burst(e.clientX, e.clientY, 30); vib(15); lb = null;
  } else { lb = b; lt = n; }
});

/* ---------- kartu-kartu ---------- */
function voice(c, done) {
  var bars = ''; for (var i = 0; i < 30; i++) bars += '<i style="height:' + (8 + Math.abs(Math.sin(i * 1.3)) * 20 + Math.random() * 6) + 'px"></i>';
  c.innerHTML = '<button class="vp">▶</button><div class="wv">' + bars + '</div><small>0:11</small>';
  var bt = $('.vp', c), on = 0;
  bt.onclick = function () {
    if (on) return; on = 1; bt.textContent = '❚❚'; vib(20);
    var d = music(), is = c.querySelectorAll('.wv i'), k = 0;
    var iv = setInterval(function () { if (k < is.length) is[k++].classList.add('on'); else { clearInterval(iv); bt.textContent = '✓'; } }, d * 1000 / is.length);
    setTimeout(done, 3000);
  };
}
function cake(c, done) {
  c.innerHTML = '<div class="ey">Make a wish</div><h3>Tiup lilinnya 🕯️</h3><div class="cake"><div class="l2"></div><div class="l1"></div><div class="pl"></div></div><div class="wi"></div><div class="mic"><button class="bmic">🎤 Tiup beneran</button><button class="o btap">Ketuk saja</button></div><small>Mic hanya mendeteksi tiupan, tidak merekam.</small>';
  var k = $('.cake', c), lit = 5, ms = null, fin = 0, w = $('.wi', c);
  function stop() { if (ms) { ms.getTracks().forEach(function (t) { t.stop(); }); ms = null; } }
  function snuff() {
    var d = $('.cd:not(.o)', c); if (!d) return;
    d.classList.add('o'); vib(20);
    if (!--lit && !fin) { fin = 1; stop(); $('.mic', c).hidden = true; w.textContent = 'Semoga semua doamu terkabul ✨'; mid(260); vib([80, 40, 80]); setTimeout(done, 1300); }
  }
  [34, 70, 106, 142, 178].forEach(function (x) { var d = document.createElement('div'); d.className = 'cd'; d.style.left = (x + 3) + 'px'; d.onclick = snuff; k.appendChild(d); });
  $('.btap', c).onclick = function () { $('.mic', c).hidden = true; for (var i = 0; i < lit; i++) setTimeout(snuff, i * 380); };
  $('.bmic', c).onclick = function () {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) { w.textContent = 'Mic tidak tersedia, ketuk lilinnya ya'; return; }
    navigator.mediaDevices.getUserMedia({ audio: true }).then(function (s) {
      ms = s; w.textContent = 'Tiup ke arah mic… 🌬️';
      var a = new (window.AudioContext || window.webkitAudioContext)(), an = a.createAnalyser(); an.fftSize = 512;
      a.createMediaStreamSource(s).connect(an);
      var d = new Uint8Array(512), n = 0;
      (function l() {
        if (!ms) { a.close(); return; }
        an.getByteTimeDomainData(d); var m = 0;
        for (var i = 0; i < 512; i++) m += Math.abs(d[i] - 128); m /= 512;
        if (m > 16) { n++; if (n % 10 === 0) snuff(); }
        requestAnimationFrame(l);
      })();
    }).catch(function () { w.textContent = 'Mic tidak aktif, ketuk lilinnya ya'; });
  };
}
function banner() {
  return card(function (c, done) {
    c.innerHTML = '<div class="ey">Selamat ulang tahun</div><div class="bn">' + esc(N) + '</div><div class="bt">Happy Birthday 🎂</div>';
    mid(320); rain(120); vib([60, 40, 60]); done();
  });
}
function heart(c, done) {
  var path = 'M50 85C10 55 0 35 0 22 0 8 12 0 25 0 37 0 46 7 50 15 54 7 63 0 75 0 88 0 100 8 100 22 100 35 90 55 50 85Z';
  c.innerHTML = '<div class="ey">Game 1</div><h3>Tempelkan jarimu</h3><p>Tahan jarimu di hati ini. Anggap aku lagi menggenggam tanganmu.</p><div class="hw"><svg viewBox="-4 -4 108 98"><defs><linearGradient id="hg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe3e9"/><stop offset=".6" stop-color="#ff6fa5"/><stop offset="1" stop-color="#d63a78"/></linearGradient><clipPath id="cp"><rect id="cr" x="-4" y="94" width="110" height="98"/></clipPath></defs><path d="' + path + '" fill="rgba(255,255,255,.07)" stroke="#ff9ec0" stroke-width="1.5"/><path d="' + path + '" fill="url(#hg)" clip-path="url(#cp)"/></svg></div><div class="pct">0%</div>';
  var w = $('.hw', c), r = $('#cr', c), pc = $('.pct', c), p = 0, hd = 0, dn = 0;
  var iv = setInterval(function () {
    if (dn || !document.body.contains(c)) { clearInterval(iv); return; }
    if (hd) { p = Math.min(100, p + 1.5); if (Math.floor(p) % 8 === 0) vib(10); } else p = Math.max(0, p - 1.2);
    r.setAttribute('y', 94 - 98 * p / 100); pc.textContent = Math.floor(p) + '%';
    if (p >= 100) { dn = 1; clearInterval(iv); pc.textContent = '💞 Nyambung!'; mid(300); vib([100, 50, 100, 50, 200]); setTimeout(done, 1300); }
  }, 30);
  w.onpointerdown = function () { hd = 1; };
  w.onpointerup = w.onpointercancel = w.onpointerleave = function () { hd = 0; };
}
function scratch(c, done) {
  c.innerHTML = '<div class="ey">Game 2</div><h3>Gosok kartunya</h3><div class="sw2"><div class="sb"></div><canvas></canvas></div>';
  var w = $('.sw2', c); $('.sb', w).textContent = fmt(C.kartu || 'Kamu adalah hadiah terbaik yang pernah aku punya.');
  var cn = $('canvas', w), W = w.offsetWidth, H = w.offsetHeight; cn.width = W; cn.height = H;
  var x = cn.getContext('2d'), g = x.createLinearGradient(0, 0, W, H);
  g.addColorStop(0, '#c9b3bd'); g.addColorStop(.5, '#f4e6ea'); g.addColorStop(1, '#a88f9a');
  x.fillStyle = g; x.fillRect(0, 0, W, H); x.fillStyle = '#6b5560';
  x.font = 'italic 600 20px "Playfair Display",Georgia,serif'; x.textAlign = 'center'; x.fillText('✨ Gosok di sini ✨', W / 2, H / 2 + 6);
  x.globalCompositeOperation = 'destination-out';
  var dn = 0, dw = 0, k = 0;
  function sc(e) {
    var b = cn.getBoundingClientRect();
    x.beginPath(); x.arc((e.clientX - b.left) * W / b.width, (e.clientY - b.top) * H / b.height, 24, 0, 6.3); x.fill();
    if (++k % 8 || dn) return;
    var d = x.getImageData(0, 0, W, H).data, n = 0, t = 0;
    for (var i = 3; i < d.length; i += 160) { t++; if (!d[i]) n++; }
    if (n / t > .5) { dn = 1; cn.style.opacity = 0; cn.style.pointerEvents = 'none'; mid(220); vib([50, 30, 50]); setTimeout(done, 1300); }
  }
  cn.onpointerdown = function (e) { dw = 1; cn.setPointerCapture(e.pointerId); sc(e); };
  cn.onpointermove = function (e) { if (dw) sc(e); };
  cn.onpointerup = function () { dw = 0; };
}
function memory(c, done) {
  var E = ['🌹', '💍', '🧸', '🍫', '💌', '🌙'], a = shuffle(E.concat(E)), op = [], mt = 0, mv = 0, lk2 = 0;
  c.innerHTML = '<div class="ey">Game 3</div><h3>Cari pasangannya</h3><p>Langkah: <b class="mv">0</b></p><div class="mg"></div>';
  var g = $('.mg', c);
  a.forEach(function (e) {
    var d = document.createElement('div'); d.className = 'mc';
    d.innerHTML = '<div class="mi"><div class="ma">♡</div><div class="mf">' + e + '</div></div>';
    d.onclick = function () {
      if (lk2 || d.classList.contains('f')) return;
      d.classList.add('f'); vib(15); op.push(d);
      if (op.length === 2) {
        mv++; $('.mv', c).textContent = mv;
        if (op[0].textContent === op[1].textContent) {
          op.forEach(function (o) { o.classList.add('m'); });
          var r = op[1].getBoundingClientRect(); burst(r.left + 30, r.top + 30, 30); op = [];
          if (++mt === 6) setTimeout(function () { mid(240); setTimeout(done, 900); }, 500);
        } else {
          lk2 = 1; setTimeout(function () { op.forEach(function (o) { o.classList.remove('f'); }); op = []; lk2 = 0; }, 800);
        }
      }
    };
    g.appendChild(d);
  });
}
var P = C.hadiah && C.hadiah.length === 6 ? C.hadiah : [['🍽️','Dinner berdua','pas ketemu'],['🎬','Nonton bareng,','kamu pilih film'],['🤗','Peluk 10 menit','tanpa protes'],['🎶','Aku nyanyiin','1 lagu'],['✈️','Tiket ketemu','secepatnya'],['💬','Curhat 1 jam,','aku dengerin']];
function wheel(c, done) {
  var WC = ['#e0527a', '#e9a23b', '#8b5cd6', '#3f8ee0', '#2fb386', '#e86a6a'], rot = 0, spin = 0;
  c.innerHTML = '<div class="ey">Hadiah untukmu</div><h3>Putar rodanya 🎡</h3><div class="ww"><div class="wp"></div><canvas class="wh" width="600" height="600"></canvas></div><div class="rs gl" hidden></div><button class="sp">PUTAR</button>';
  var cn = $('.wh', c), x = cn.getContext('2d'), a = 6.2832 / 6;
  P.forEach(function (t, i) {
    x.beginPath(); x.moveTo(300, 300); x.arc(300, 300, 300, i * a - 1.5708, (i + 1) * a - 1.5708); x.fillStyle = WC[i]; x.fill();
    x.strokeStyle = 'rgba(255,255,255,.35)'; x.lineWidth = 3; x.stroke();
    x.save(); x.translate(300, 300); x.rotate(i * a + a / 2 - 1.5708); x.textAlign = 'right'; x.fillStyle = '#fff';
    x.font = '34px sans-serif'; x.fillText(t[0], 262, -18);
    x.font = '600 22px sans-serif'; x.fillText(t[1], 262, 14); x.fillText(t[2], 262, 40); x.restore();
  });
  $('.sp', c).onclick = function () {
    if (spin) return; spin = 1; $('.sp', c).hidden = true;
    var i = Math.floor(Math.random() * 6);
    rot += 360 * 6 + (360 - rot % 360) + (360 - (i + .5) * 60);
    cn.style.transform = 'rotate(' + rot + 'deg)';
    var tk = setInterval(function () { vib(8); }, 180);
    setTimeout(function () {
      clearInterval(tk); mid(260); vib([80, 40, 80]);
      var r = $('.rs', c); r.hidden = false;
      r.innerHTML = '<span class="ey">Kamu dapat</span><br><b style="font-family:\'Playfair Display\',Georgia,serif;font-style:italic;font-size:21px">' + esc(P[i][0] + ' ' + P[i][1] + ' ' + P[i][2]) + '</b>';
      scroll(); setTimeout(done, 1800);
    }, 4800);
  };
}
function photos(c, done) {
  var F = C.foto || [], n = F.length;
  c.innerHTML = '<div class="ey">Kenangan kita</div><p>Geser fotonya ke kiri atau kanan</p><div class="ps"></div>';
  var box = $('.ps', c);
  F.slice().reverse().forEach(function (f, k) {
    var i = n - 1 - k, d = document.createElement('div'), x0 = null, dx = 0, rt = 'rotate(' + ((i % 3 - 1) * 3) + 'deg)';
    d.className = 'pc'; d.style.transform = rt;
    d.innerHTML = '<img src="' + esc(f.src) + '" alt=""><div class="cp">' + esc(fmt(f.teks || '')) + '</div>';
    box.appendChild(d);
    d.onpointerdown = function (e) { x0 = e.clientX; dx = 0; d.setPointerCapture(e.pointerId); d.style.transition = 'none'; };
    d.onpointermove = function (e) { if (x0 === null) return; dx = e.clientX - x0; d.style.transform = 'translateX(' + dx + 'px) rotate(' + dx / 12 + 'deg)'; };
    d.onpointerup = function () {
      if (x0 === null) return; x0 = null; d.style.transition = '.4s';
      if (Math.abs(dx) > 70) {
        d.style.transform = 'translateX(' + (dx > 0 ? 500 : -500) + 'px) rotate(' + (dx > 0 ? 40 : -40) + 'deg)'; d.style.opacity = 0; vib(15);
        setTimeout(function () { d.remove(); if (!--n) { mid(200); setTimeout(done, 700); } }, 350);
      } else d.style.transform = rt;
    };
  });
}
function trick() {
  return new Promise(function (res) {
    fk.hidden = true; ch.innerHTML = ''; ch.classList.add('on');
    var y = document.createElement('button'), n = document.createElement('button'), k = 0;
    var L = ['Nggak 😈', 'Yakin? 🥺', 'Coba lagi 😝', 'Ayolah 🙈', 'Pencet yang satunya 💖'];
    y.textContent = 'Sayang banget 💖'; n.className = 'o'; n.textContent = L[0];
    ch.appendChild(y); ch.appendChild(n);
    function run(e) {
      e.preventDefault(); k++; vib(25);
      n.style.position = 'fixed'; n.style.zIndex = 60;
      n.style.left = (10 + Math.random() * Math.max(10, innerWidth - n.offsetWidth - 20)) + 'px';
      n.style.top = (110 + Math.random() * Math.max(10, innerHeight - n.offsetHeight - 240)) + 'px';
      n.textContent = L[Math.min(k, 4)];
    }
    n.addEventListener('touchstart', run, { passive: false }); n.addEventListener('click', run);
    y.onclick = function () { ch.classList.remove('on'); ch.innerHTML = ''; fk.hidden = false; bubble('out', 'Sayang banget 💖'); vib([60, 40, 60]); res(); };
  });
}

/* ---------- layar penutup ---------- */
function end() {
  var e = $('#end'); $('#ft').hidden = true;
  $('#et').textContent = fmt(C.penutup || 'Sejauh apa pun kita, hatiku selalu pulang ke kamu.');
  $('#ef').textContent = '— ' + D;
  if (S) { var d = Math.floor((Date.now() - new Date(S)) / 864e5); if (d > 0) { var y = $('#dy'); y.hidden = false; y.innerHTML = 'Sudah <b>' + d + ' hari</b> kita bersama'; } }
  e.hidden = false; void e.offsetWidth; e.classList.add('on'); rain(240); mid(300); vib([80, 40, 80, 40, 200]);
  e.addEventListener('pointerdown', function (ev) { if (ev.target.tagName !== 'BUTTON') burst(ev.clientX, ev.clientY, 90); });
  $('#rp').onclick = function () { location.reload(); };
}

/* ---------- alur cerita ---------- */
async function run() {
  await sleep(300);
  var A = C.pesanAwal || ['Hai {nama} 👋', 'Ada yang mau aku kasih nih…'];
  var H = C.pesanHati || ['Selamat ulang tahun, sayang. 🤍'];
  for (var i = 0; i < A.length; i++) await say(A[i]);
  await ask(['Apa nih? 👀']);
  await say('Pertama, dengerin ini dulu 🎶');
  await card(voice, 'vn');
  await ask(['Aww, makasih 🥹']);
  await say('Sekarang make a wish, terus tiup lilinnya 🕯️');
  await card(cake);
  await banner();
  await say('Selamat ulang tahun, sayang 🥳');
  for (i = 0; i < H.length; i++) await say(H[i]);
  await ask(['Aku juga sayang kamu 🥺']);
  await say('Eh, tunggu… masih ada permainannya lho 😏');
  await ask(['Ayo, apa?']);
  await card(heart); await say('Yeay, nyambung! 💞');
  await card(scratch); await say('Tuh kan, kamu emang hadiah terbaik 😘');
  await card(memory); await say('Ingatanmu tajam juga ya 🧠');
  await say('Satu lagi, hadiahnya beneran lho 🎁');
  await card(wheel); await say('Janji ya, nanti aku tepatin! 🤝');
  if ((C.foto || []).length) { await say('Terakhir, ini kenangan kita 📸'); await card(photos); }
  await say('Satu pertanyaan terakhir…');
  await say('Masih sayang aku nggak? 🥺');
  await trick();
  await say('Aku juga, banget. 💖');
  await sleep(1400); end();
}
})();
