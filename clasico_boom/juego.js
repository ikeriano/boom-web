/* ¡Boom! clásico · recreación HTML5 (ES5) de la app oficial de 2015/2016 con sus gráficos, sonidos y fuentes. Sin splash. */
(function () {
var LS = { g: function (k, d) { try { var v = localStorage.getItem(k); return v === null ? d : v; } catch (e) { return d; } }, s: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} } };
var qs = location.search; var LANG = /lang=en/.test(qs) ? 'en' : /lang=es/.test(qs) ? 'es' : LS.g('boom_cl_lang', 'es'); var T = TX[LANG];
var SOUND = LS.g('boom_cl_snd', '1') === '1';
var ph = document.getElementById('ph');
function fit() { var w = window.innerWidth, h = window.innerHeight, s = Math.min(w / 360, h / 640); ph.style.transform = ph.style.webkitTransform = 'scale(' + s + ') translate(-50%,-50%)'; ph.style.left = '50%'; ph.style.top = '50%'; ph.style.marginLeft = (-180 * s + 180 * s) + 'px'; }
// scale + translate: usamos posición absoluta calculada
function fit2() { var w = window.innerWidth, h = window.innerHeight, s = Math.min(w / 360, h / 640); ph.style.left = ((w - 360 * s) / 2) + 'px'; ph.style.top = ((h - 640 * s) / 2) + 'px'; ph.style.transform = ph.style.webkitTransform = 'scale(' + s + ')'; }
window.addEventListener('resize', fit2); fit2();
function el(tag, cls, css, txt, par) { var e = document.createElement(tag); if (cls) e.className = cls; if (css) e.style.cssText = css; if (txt != null) e.textContent = txt; (par || ph).appendChild(e); return e; }
var SND = {}; function snd(n, loop) { if (!SOUND) return null; try { var a = SND[n] && !loop ? SND[n].cloneNode() : new Audio('snd/' + n + '.mp3'); if (!SND[n]) SND[n] = a; a.loop = !!loop; var p = a.play(); if (p && p['catch']) p['catch'](function () {}); return a; } catch (e) { return null; } }
var bed = null; function stopBed() { if (bed) { try { bed.pause(); } catch (e) {} bed = null; } }
var cur = null; function show(n) { var s = ph.querySelectorAll('.scr'); for (var i = 0; i < s.length; i++) s[i].className = 'scr' + (s[i].id === n ? ' on' : ''); cur = n; window.__boomCl = n; }
function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
function money(n) { var s = String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, LANG === 'es' ? '.' : ','); return LANG === 'es' ? s + ' $' : '$' + s; }
function kfmt(n) { return n ? (LANG === 'es' ? (n / 1000) + 'K $' : '$' + (n / 1000) + 'K') : (LANG === 'es' ? '0 $' : '$0'); }
// ---------- MENÚ PRINCIPAL ----------
var M = el('div', 'scr', 'background-image:url(img/bg_main.png)'); M.id = 'menu';
el('img', '', 'position:absolute;left:30px;top:8px;width:300px', null, M).src = 'img/logo_HD.png';
var mb = el('div', '', 'position:absolute;left:40px;top:150px;width:280px;height:290px;background:url(img/bomb_big.png);background-size:100% 100%', null, M);
el('div', 'lbl', 'top:98px;font-size:11px;color:#9cf', T.next, mb); var cd = el('div', 'lbl dig', 'top:112px;font-size:28px', '00:00:00:00', mb);
var b1 = el('button', 'btn', 'left:30px;top:405px;width:300px;height:56px;background-image:url(img/btn_play_now.png)', T.play, M);
var b2 = el('button', 'btn', 'left:30px;top:468px;width:300px;height:56px;background-image:url(img/btn_play_24_7.png)', T.practice, M);
var b3 = el('button', 'btn', 'left:30px;top:531px;width:300px;height:56px;background-image:url(img/btn_leaderboards.png)', T.lead, M);
var b4 = el('button', 'btn', 'left:100px;top:594px;width:160px;height:40px;font-size:16px;background-image:url(img/btn_login.png)', T.connect, M);
var bo = el('button', 'btn', 'left:318px;top:8px;width:36px;height:36px;background-image:url(img/btn_options.png)', '', M);
var ver = el('div', '', 'position:absolute;left:6px;top:6px;font-size:11px;color:#fff8', 'v1.0', M);
function nextShow() { var d = new Date(), t = new Date(d.getTime()); t.setHours(21, 45, 0, 0); if (t <= d) t.setDate(t.getDate() + 1); return t; }
setInterval(function () { var ms = nextShow() - new Date(), s = Math.floor(ms / 1000); var p = function (n) { return (n < 10 ? '0' : '') + n; }; cd.textContent = p(Math.floor(s / 86400)) + ':' + p(Math.floor(s / 3600) % 24) + ':' + p(Math.floor(s / 60) % 60) + ':' + p(s % 60); }, 500);
b1.onclick = function () { snd('Answer_Choice'); start(true); }; b2.onclick = function () { snd('Answer_Choice'); start(false); }; b3.onclick = function () { snd('Answer_Choice'); leaders(); show('lb'); };
b4.onclick = function () { alert(T.connectMsg); var n = prompt(T.name, LS.g('boom_cl_name', '')); if (n) LS.s('boom_cl_name', n.slice(0, 18)); }; bo.onclick = function () { snd('Answer_Choice'); show('opt'); };
// ---------- AJUSTES ----------
var O = el('div', 'scr', 'background-image:url(img/bg_main.png)'); O.id = 'opt';
el('div', 'lbl', 'top:40px;font-size:30px', T.settings, O);
var os = el('button', 'btn', 'left:30px;top:130px;width:300px;height:68px;background-image:url(img/btn_settings_sound_' + (SOUND ? 'on' : 'off') + '.png)', T.sound, O);
os.onclick = function () { SOUND = !SOUND; LS.s('boom_cl_snd', SOUND ? '1' : '0'); os.style.backgroundImage = 'url(img/btn_settings_sound_' + (SOUND ? 'on' : 'off') + '.png)'; };
var ol = el('button', 'btn', 'left:30px;top:220px;width:300px;height:68px;background-image:url(img/btn_settings.png)', T.lang + ': ' + (LANG === 'es' ? 'Español' : 'English'), O);
ol.onclick = function () { LS.s('boom_cl_lang', LANG === 'es' ? 'en' : 'es'); location.replace(location.pathname + location.search.replace(/[?&]lang=\w+/, '')); };
el('button', 'btn', 'left:80px;top:540px;width:200px;height:60px;background-image:url(img/btn_login.png)', T.back, O).onclick = function () { show('menu'); };
// ---------- CLASIFICACIÓN ----------
var L = el('div', 'scr', 'background-image:url(img/bg_main.png)'); L.id = 'lb';
el('div', 'lbl', 'top:40px;font-size:26px', T.lb, L); var lst = el('div', 'lst', '', null, L);
el('button', 'btn', 'left:80px;top:560px;width:200px;height:56px;background-image:url(img/btn_login.png)', T.back, L).onclick = function () { show('menu'); };
function leaders() { var a = []; try { a = JSON.parse(LS.g('boom_cl_lb', '[]')); } catch (e) {} lst.innerHTML = ''; if (!a.length) el('div', '', '', T.none, lst); a.slice(0, 10).forEach(function (r, i) { var d = el('div', '', '', (i + 1) + '. ' + r.n, lst); el('span', '', '', money(r.m), d); }); }
// ---------- PARTIDA ----------
var G = el('div', 'scr', 'background-image:url(img/inGame_BG.png)'); G.id = 'game';
var hdr = el('div', '', '', null, G); hdr.id = 'hdr'; var bk = el('div', '', '', null, G); bk.id = 'bank'; el('b', '', '', T.bank, bk); var bankS = el('span', '', '', money(0), bk);
el('button', 'btn', 'left:8px;top:6px;width:36px;height:31px;background-image:url(img/btn_exit.png)', '', G).onclick = function () { fin(true); };
var sb = el('button', 'btn', 'left:316px;top:8px;width:36px;height:27px;background-image:url(img/btn_sound' + (SOUND ? '' : '_off') + '.png)', '', G); sb.onclick = function () { SOUND = !SOUND; LS.s('boom_cl_snd', SOUND ? '1' : '0'); sb.style.backgroundImage = 'url(img/btn_sound' + (SOUND ? '' : '_off') + '.png)'; if (!SOUND) stopBed(); };
var qd = el('div', '', '', null, G); qd.id = 'q'; var qt = el('div', '', '', '', qd); var amt = el('div', '', '', '', G); amt.id = 'amt';
var cv = el('canvas', '', '', null, G); cv.id = 'wires'; cv.width = 720; cv.height = 1280; var cx = cv.getContext('2d');
var cutL = el('div', '', '', '', G); cutL.id = 'cut';
var bomb = el('div', '', '', null, G); bomb.id = 'bomb'; var btime = el('div', 'dig', '', '00:30:00', bomb); btime.id = 'btime'; var bnum = el('div', '', '', '1', bomb); bnum.id = 'bnum';
var live = el('div', '', 'position:absolute;left:250px;top:150px;font-size:11px;color:#f44;display:none', '● LIVE', G);
var slime = el('div', '', '', null, G); slime.id = 'slime';
var COLS = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'white', 'pink', 'silver', 'gold'], HEX = { red: '#e8262a', blue: '#2a5cff', green: '#22c24a', yellow: '#ffd21a', purple: '#9a3cff', orange: '#ff8a1a', white: '#eee', pink: '#ff5aa8', silver: '#bbb', gold: '#d8b048' };
var st = null;
var VAL = [5000, 10000, 15000, 20000, 25000, 30000];
var WIRES = [3, 3, 5, 5, 7, 7, 7], SECS = [30, 30, 45, 45, 60, 60, 60];
function start(tv) { st = { tv: tv, bank: 0, i: 0, res: [], t0: Date.now(), used: {} }; bankS.textContent = money(0); live.style.display = tv ? 'block' : 'none'; show('game'); stopBed(); bed = snd('Bomb_FX_Bed', true); nextBomb(); }
function pickQ(n) { var b = BANCO[n], c = []; for (var i = 0; i < b.length; i++) if (!st.used[n + '_' + i]) c.push(i); if (!c.length) { c = [0]; } var k = c[Math.floor(Math.random() * c.length)]; st.used[n + '_' + k] = 1; return b[k]; }
var tmr = null, answers = [];
function nextBomb() {
  var i = st.i, n = WIRES[i], mega = i === 6, q = pickQ(n); st.q = q; st.left = n; st.mega = mega; st.val = mega ? 0 : VAL[i];
  qt.textContent = q.q[LANG === 'es' ? 0 : 1]; amt.textContent = mega ? T.x4 : money(st.val); cutL.textContent = T.cut.replace('{n}', n);
  answers.forEach(function (a) { a.parentNode && a.parentNode.removeChild(a); }); answers = [];
  var items = shuffle(q.ok.map(function (x) { return { t: x, ok: 1 }; }).concat(q.no.map(function (x) { return { t: x, ok: 0 }; }))); var cols = shuffle(COLS);
  var rows = Math.ceil(items.length / 2), y0 = 186;
  items.forEach(function (it, k) { var a = el('div', 'ans', 'left:' + (k % 2 ? 186 : 14) + 'px;top:' + (y0 + Math.floor(k / 2) * 43) + 'px;background-image:url(img/answerFrame_' + cols[k] + '.png)', it.t[LANG === 'es' ? 0 : 1], G); a.col = cols[k]; a.it = it; a.onclick = function () { tap(a); }; answers.push(a); });
  var by = y0 + rows * 43 + 30; cutL.style.top = (by - 24) + 'px'; bomb.style.top = (by + 6) + 'px'; bomb.style.backgroundImage = 'url(img/' + (mega ? 'bomb_giant' : 'bomb_medium') + '.png)'; bnum.textContent = mega ? '×4' : String(i + 1);
  G.insertBefore(cv, answers[0]); G.appendChild(bomb); G.appendChild(cutL); G.appendChild(slime); slime.style.display = 'none'; drawWires(by + 6); snd('Answers_Reveal_1'); setTimeout(function () { snd('Bomb_Rise'); }, 300);
  var end = Date.now() + SECS[i] * 1000 * (window.__clFast ? .05 : 1); clearInterval(tmr);
  tmr = setInterval(function () { var r = Math.max(0, end - Date.now()), s = r / 1000; btime.textContent = '00:' + (s < 10 ? '0' : '') + Math.floor(s) + ':' + ('0' + Math.floor(r % 1000 / 10)).slice(-2); if (r <= 0) { clearInterval(tmr); explode(); } }, 50);
}
function drawWires(by) { cx.clearRect(0, 0, 720, 1280); answers.forEach(function (a, k) { if (a.cutDone) return; var x = (parseInt(a.style.left) + (k % 2 ? 160 : 0)) * 2, y = (parseInt(a.style.top) + 19) * 2, tx = (180 + (k - answers.length / 2) * 4) * 2, ty = (by + 8) * 2;
  cx.strokeStyle = HEX[a.col]; cx.lineWidth = 7; cx.lineCap = 'round'; cx.beginPath(); cx.moveTo(x, y); cx.bezierCurveTo(x + (k % 2 ? 50 : -50), y + 90, tx + (k % 2 ? 60 : -60), ty - 140, tx, ty); cx.stroke(); cx.strokeStyle = 'rgba(255,255,255,.35)'; cx.lineWidth = 2; cx.stroke(); }); }
function tap(a) {
  if (a.cutDone || !st || st.busy) return; a.cutDone = 1; a.className += ' cut'; snd('Answer_Choice'); drawWires(parseInt(bomb.style.top));
  if (!a.it.ok) { a.className += ' bad'; snd('Wrong_Answer'); clearInterval(tmr); setTimeout(explode, 350); return; }
  a.className += ' ok'; snd(Math.random() < .5 ? 'Correct_Answer_1' : 'Correct_Answer_2'); st.left--; cutL.textContent = T.cut.replace('{n}', st.left);
  if (!st.left) { clearInterval(tmr); st.busy = 1; snd('Bomb_Final_Lock'); setTimeout(function () { snd('Money_Reveal'); if (st.mega) st.bank *= 4; else st.bank += st.val; bankS.textContent = money(st.bank); st.res.push({ ok: 1, v: st.mega ? 0 : st.val }); setTimeout(results, 900); }, 600); }
}
function explode() {
  st.busy = 1; snd('BoomBreaking_Back_Panel'); snd('Boom_Money_Going_Down'); window.__boomCl = 'explosion'; slime.innerHTML = ''; slime.style.display = 'block';
  var P = [[-200, -120], [80, -200], [-160, 180], [100, 120], [-60, 360], [60, -40]]; P.forEach(function (p, k) { var b = el('i', '', 'left:' + p[0] + 'px;top:' + p[1] + 'px;transform:scale(.1) rotate(' + k * 60 + 'deg);-webkit-transform:scale(.1) rotate(' + k * 60 + 'deg)', null, slime); setTimeout(function () { b.style.transform = b.style.webkitTransform = 'scale(1.25) rotate(' + k * 60 + 'deg)'; }, 30 + k * 60); });
  el('p', '', '', T.boom, slime); el('p', '', 'top:310px;font-size:20px;color:#fff', T.covered, slime);
  st.res.push({ ok: 0, v: 0 }); setTimeout(results, 2600);
}
// ---------- RESULTADOS ENTRE BOMBAS / FIN ----------
var R = el('div', 'scr', 'background:#bdbdbd'); R.id = 'res';
el('div', '', 'position:absolute;left:0;top:0;width:360px;height:44px;background:url(img/game_header_bg.png);background-size:100% 100%', null, R);
var rT = el('div', 'lbl', 'top:70px;font-size:28px;color:#eee;text-shadow:0 2px 4px #000', '', R);
var rB = el('div', '', 'position:absolute;left:70px;top:115px;width:220px;height:228px;background:url(img/bomb_medium.png);background-size:100% 100%', null, R);
var rM = el('div', 'lbl', 'top:40px;font-size:12px;color:#fff', '', rB), rV = el('div', 'lbl', 'top:84px;font-size:40px;color:#f0e040;text-shadow:0 2px 2px #000', '', rB), rTm = el('div', 'lbl dig', 'top:136px;font-size:16px;color:#fff;text-shadow:none', '', rB);
var rC = el('button', 'btn', 'left:85px;top:300px;width:190px;height:58px;background-image:url(img/btn_end_continue.png)', T.cont, R);
var row = el('div', 'row7', 'top:400px;background:#8888', null, R); var rW = el('div', 'lbl', 'top:560px;height:40px;line-height:40px;background:#111;font-size:18px', T.wait, R);
function results() {
  stopBed(); show('res'); var done = st.i >= 6 || false; row.innerHTML = '';
  for (var k = 0; k < 7; k++) { var r = st.res[k], img = k === 6 ? 'results_megabomb' : !r ? 'results_bomb_normal' : r.ok ? 'results_bomb_defused' : 'results_bomb_exploded'; var b = el('div', 'rb', 'left:' + (6 + k * 49) + 'px;top:10px;background-image:url(img/' + img + '.png)', null, row);
    if (k < 6) { el('span', '', 'color:' + (!r ? '#fff' : r.ok ? '#2c2' : '#e22'), String(k + 1), b); el('em', '', 'color:' + (!r ? '#fff' : r.ok ? '#2c2' : '#e22'), r ? kfmt(r.v) : kfmt(VAL[k]), b); } else el('em', '', 'margin-top:58px;color:#eee', T.x4, b); }
  var last = st.res[st.res.length - 1]; rT.textContent = done ? T.over : last.ok ? T.defused : T.boom; rM.textContent = done ? (st.bank >= 100000 ? T.amazing + ' ' + T.banked : T.good) : '';
  rV.textContent = money(st.bank); var s = Math.floor((Date.now() - st.t0) / 1000); rTm.textContent = T.overall + ('0' + Math.floor(s / 60)).slice(-2) + ':' + ('0' + s % 60).slice(-2); rW.style.display = st.tv ? 'block' : 'none';
  rC.onclick = function () { snd('Answer_Choice'); if (done) fin(false); else { st.i++; st.busy = 0; show('game'); bed = snd('Bomb_FX_Bed', true); nextBomb(); } };
  if (done) { var a = []; try { a = JSON.parse(LS.g('boom_cl_lb', '[]')); } catch (e) {} a.push({ n: LS.g('boom_cl_name', LANG === 'es' ? 'Jugador' : 'Player'), m: st.bank }); a.sort(function (x, y) { return y.m - x.m; }); LS.s('boom_cl_lb', JSON.stringify(a.slice(0, 20))); }
}
function fin(abort) { clearInterval(tmr); stopBed(); st = null; show('menu'); }
window.__boomClStart = start; window.__boomClTap = function (ok) { for (var i = 0; i < answers.length; i++) if (!answers[i].cutDone && !!answers[i].it.ok === ok) return tap(answers[i]); };
show('menu');
})();
