const _0x2fbf83 = _0x5179;
(function (_0x304a68, _0x504be4) {
  const _0x11221b = _0x5179, _0x477dd2 = _0x304a68();
  while (true) {
    try {
      const _0x1dc0bd = parseInt(_0x11221b(576)) / 1 + parseInt(_0x11221b(369)) / 2 * (parseInt(_0x11221b(299)) / 3) + -parseInt(_0x11221b(474)) / 4 + -parseInt(_0x11221b(413)) / 5 + parseInt(_0x11221b(242)) / 6 * (parseInt(_0x11221b(408)) / 7) + -parseInt(_0x11221b(380)) / 8 + parseInt(_0x11221b(509)) / 9 * (parseInt(_0x11221b(526)) / 10);
      if (_0x1dc0bd === _0x504be4) break; else _0x477dd2.push(_0x477dd2.shift());
    } catch (_0xdbbc6b) {
      _0x477dd2.push(_0x477dd2.shift());
    }
  }
}(_0x29ee, 785715));
const sentNotifications = new Set(JSON[_0x2fbf83(504)](localStorage[_0x2fbf83(297)](_0x2fbf83(281) + _0x2fbf83(433))) || []);
function saveSentNotifications() {
  const _0x9cf773 = _0x2fbf83, _0x3d204c = {UKYqZ: _0x9cf773(281) + _0x9cf773(433)};
  localStorage[_0x9cf773(577)](_0x3d204c[_0x9cf773(463)], JSON[_0x9cf773(397)](Array[_0x9cf773(298)](sentNotifications)));
}
function formatDate(_0x3cbafc) {
  const _0x5ac151 = _0x2fbf83, _0x4c0e59 = {cqXMa: _0x5ac151(391), omDCp: _0x5ac151(567), WCzhr: _0x5ac151(392), sbAJi: _0x5ac151(559), LUyFH: _0x5ac151(364), GpONg: _0x5ac151(326), PwGeZ: _0x5ac151(247), EiGBI: _0x5ac151(379), YfBvM: _0x5ac151(183), mHKub: _0x5ac151(538), RDlnJ: _0x5ac151(262), JEgON: _0x5ac151(344)}, _0x5420a5 = [_0x4c0e59[_0x5ac151(181)], _0x4c0e59[_0x5ac151(275)], _0x4c0e59[_0x5ac151(222)], _0x4c0e59[_0x5ac151(188)], _0x4c0e59[_0x5ac151(329)], _0x4c0e59[_0x5ac151(253)], _0x4c0e59[_0x5ac151(257)], _0x4c0e59[_0x5ac151(235)], _0x4c0e59[_0x5ac151(331)], _0x4c0e59[_0x5ac151(199)], _0x4c0e59[_0x5ac151(386)], _0x4c0e59[_0x5ac151(286)]], _0x5d2500 = new Date(_0x3cbafc), _0x1ac0c8 = _0x5d2500[_0x5ac151(387)](), _0x4205a5 = _0x5420a5[_0x5d2500[_0x5ac151(228)]()], _0x46d034 = _0x5d2500[_0x5ac151(355) + "r"]();
  return _0x1ac0c8 + " " + _0x4205a5 + " " + _0x46d034;
}
async function loadMatches() {
  const _0x2576c0 = _0x2fbf83, _0xe82cd0 = {anIhY: _0x2576c0(269), tRlhY: _0x2576c0(449), pVcBU: function (_0x4946f9) {
    return _0x4946f9();
  }, kEWVN: function (_0x51959b, _0x155d98) {
    return _0x51959b(_0x155d98);
  }, YClvV: function (_0x5c7a8b) {
    return _0x5c7a8b();
  }, GJjmu: function (_0x5c8b16, _0x554a5c, _0x306a82) {
    return _0x5c8b16(_0x554a5c, _0x306a82);
  }, biCcw: _0x2576c0(468) + _0x2576c0(536) + _0x2576c0(311), Toqhb: _0x2576c0(346), Qttcr: _0x2576c0(540), LgDiV: _0x2576c0(486)};
  try {
    document[_0x2576c0(383) + _0x2576c0(485)](_0xe82cd0[_0x2576c0(341)])[_0x2576c0(361)][_0x2576c0(431)] = _0xe82cd0[_0x2576c0(565)];
    const _0x5f2139 = await _0xe82cd0[_0x2576c0(436)](fetchMatches);
    _0xe82cd0[_0x2576c0(208)](renderMatches, _0x5f2139), _0xe82cd0[_0x2576c0(208)](populateFilters, _0x5f2139), _0xe82cd0[_0x2576c0(436)](filterMatches), _0xe82cd0[_0x2576c0(321)](updateCountdown), _0xe82cd0[_0x2576c0(495)](setInterval, updateCountdown, 1e3);
  } catch (_0xa177a6) {
    console[_0x2576c0(343)](_0xe82cd0[_0x2576c0(278)], _0xa177a6), document[_0x2576c0(383) + _0x2576c0(485)](_0xe82cd0[_0x2576c0(338)])[_0x2576c0(515)][_0x2576c0(209)](_0xe82cd0[_0x2576c0(473)]);
  } finally {
    document[_0x2576c0(383) + _0x2576c0(485)](_0xe82cd0[_0x2576c0(341)])[_0x2576c0(361)][_0x2576c0(431)] = _0xe82cd0[_0x2576c0(394)];
  }
}
async function fetchMatches() {
  const _0x5e3523 = _0x2fbf83, _0x195089 = {xsFOF: function (_0x57ca7d, _0x4d63c4) {
    return _0x57ca7d(_0x4d63c4);
  }, lnldw: _0x5e3523(258) + _0x5e3523(569) + _0x5e3523(417) + _0x5e3523(412) + _0x5e3523(452) + _0x5e3523(210), ckKqk: _0x5e3523(451) + _0x5e3523(375) + _0x5e3523(263)}, _0x5890a0 = await _0x195089[_0x5e3523(491)](fetch, _0x195089[_0x5e3523(549)]);
  if (!_0x5890a0.ok) throw new Error(_0x195089[_0x5e3523(213)]);
  const _0x433e8a = await _0x5890a0[_0x5e3523(426)](), _0x3e1722 = await _0x195089[_0x5e3523(491)](fetchLiveUrls, _0x433e8a);
  return _0x433e8a[_0x5e3523(564)](_0x301dba => {
    const _0x2ee8e5 = _0x5e3523;
    _0x301dba[_0x2ee8e5(472)] = _0x3e1722[_0x301dba[_0x2ee8e5(415)]] || _0x301dba[_0x2ee8e5(360)] || _0x301dba[_0x2ee8e5(409)];
  }), _0x433e8a;
}
async function fetchLiveUrls(_0x21e685) {
  const _0x3ec9fe = _0x2fbf83, _0x735ac2 = {IQpaQ: function (_0x238ce6, _0x461a32) {
    return _0x238ce6(_0x461a32);
  }, GjPTa: function (_0x351e44, _0x874983) {
    return _0x351e44 > _0x874983;
  }, dmiBA: function (_0x5122e0, _0x3f5dc3) {
    return _0x5122e0(_0x3f5dc3);
  }, QLwfL: function (_0x41348c, _0x57f004) {
    return _0x41348c === _0x57f004;
  }, SNRji: _0x3ec9fe(510)}, _0x3a1113 = _0x21e685[_0x3ec9fe(357)](_0x15554c => _0x15554c[_0x3ec9fe(415)]), _0x2897dd = {}, _0x43e60d = _0x3a1113[_0x3ec9fe(357)](async _0x1e2eef => {
    const _0x487e1e = _0x3ec9fe;
    try {
      const _0x1d3c37 = await _0x735ac2[_0x487e1e(365)](fetch, _0x487e1e(508) + _0x487e1e(186) + _0x487e1e(489) + _0x487e1e(352) + _0x487e1e(256) + _0x1e2eef);
      if (_0x1d3c37.ok) {
        const _0x2b9596 = await _0x1d3c37[_0x487e1e(426)]();
        _0x2b9596[_0x487e1e(202)] && _0x735ac2[_0x487e1e(322)](_0x2b9596[_0x487e1e(264)][_0x487e1e(530)], 0) && (_0x2897dd[_0x1e2eef] = _0x2b9596[_0x487e1e(264)][0][_0x487e1e(335) + _0x487e1e(547)][0]);
      }
    } catch (_0x1d6329) {
      console[_0x487e1e(343)](_0x487e1e(468) + _0x487e1e(523) + _0x487e1e(196) + _0x487e1e(282) + _0x1e2eef + ":", _0x1d6329);
    }
    try {
      const _0x53a2c0 = await _0x735ac2[_0x487e1e(439)](fetch, _0x487e1e(506) + _0x487e1e(453) + _0x487e1e(340) + _0x487e1e(284) + _0x487e1e(393) + _0x487e1e(339) + _0x1e2eef);
      if (_0x53a2c0.ok) {
        const _0x246f13 = await _0x53a2c0[_0x487e1e(426)]();
        _0x735ac2[_0x487e1e(528)](_0x246f13[_0x487e1e(400)], _0x735ac2[_0x487e1e(493)]) && _0x246f13[_0x487e1e(441)][_0x487e1e(264)][_0x487e1e(555)][_0x487e1e(204)] && (_0x2897dd[_0x1e2eef] = _0x246f13[_0x487e1e(441)][_0x487e1e(264)][_0x487e1e(555)][_0x487e1e(204)]);
      }
    } catch (_0x372285) {
      console[_0x487e1e(343)](_0x487e1e(468) + _0x487e1e(518) + _0x487e1e(363) + _0x487e1e(282) + _0x1e2eef + ":", _0x372285);
    }
  });
  return await Promise[_0x3ec9fe(232)](_0x43e60d), _0x2897dd;
}
function renderMatches(_0x178870) {
  const _0x2f1786 = _0x2fbf83, _0x2f18e2 = {xKhRu: function (_0x3f0de2, _0xe64b00) {
    return _0x3f0de2 >= _0xe64b00;
  }, sLukM: function (_0x45a5b7, _0xadc4d3) {
    return _0x45a5b7 <= _0xadc4d3;
  }, oBhgg: function (_0x1f443e, _0x471d7b) {
    return _0x1f443e + _0x471d7b;
  }, EoKRv: function (_0x5ac629, _0x273c23) {
    return _0x5ac629 * _0x273c23;
  }, qoVYl: function (_0x1cf38c, _0x437245) {
    return _0x1cf38c * _0x437245;
  }, ehemw: function (_0x19cfb9, _0x516135) {
    return _0x19cfb9 >= _0x516135;
  }, niJch: function (_0x35e0bf, _0x1ba99c) {
    return _0x35e0bf <= _0x1ba99c;
  }, jrfJQ: function (_0x4feedf, _0x5867ea) {
    return _0x4feedf * _0x5867ea;
  }, JEMdj: function (_0x366067, _0x56b7f1) {
    return _0x366067 && _0x56b7f1;
  }, UBZzi: function (_0x51c657, _0x119554) {
    return _0x51c657 && _0x119554;
  }, dwkcS: function (_0x55da20, _0x292264) {
    return _0x55da20 >= _0x292264;
  }, uCkzs: function (_0x422a54, _0x4f26a6) {
    return _0x422a54 + _0x4f26a6;
  }, DuwPt: function (_0x3df4cc, _0x87fe36) {
    return _0x3df4cc * _0x87fe36;
  }, IFcJF: function (_0x530175, _0x1d9b91) {
    return _0x530175 * _0x1d9b91;
  }, CloLN: function (_0xfcf6c4, _0x3cca68) {
    return _0xfcf6c4 * _0x3cca68;
  }, vtnWZ: _0x2f1786(182), CphEe: _0x2f1786(464) + _0x2f1786(223), XbRCC: _0x2f1786(274), yUCQq: _0x2f1786(205) + "e", sVTdf: _0x2f1786(184), QVAkD: _0x2f1786(342) + "s", GjDdk: _0x2f1786(477), VaeYL: _0x2f1786(459), zvCix: function (_0x28201c, _0x24cbf1) {
    return _0x28201c(_0x24cbf1);
  }, slBOO: _0x2f1786(479) + _0x2f1786(480) + _0x2f1786(424) + _0x2f1786(571) + _0x2f1786(579) + _0x2f1786(273) + _0x2f1786(498) + _0x2f1786(496), fjkQb: _0x2f1786(497) + _0x2f1786(303)}, _0x228bd8 = document[_0x2f1786(383) + _0x2f1786(485)](_0x2f18e2[_0x2f1786(533)]);
  _0x228bd8[_0x2f1786(514)] = "", _0x178870[_0x2f1786(503)]((_0xfe87be, _0x43a8af) => {
    const _0x24239d = _0x2f1786, _0x44351d = new Date, _0x52fb3c = new Date(_0xfe87be[_0x24239d(460)] + "T" + _0xfe87be[_0x24239d(187)]), _0x147483 = new Date(_0x43a8af[_0x24239d(460)] + "T" + _0x43a8af[_0x24239d(187)]), _0x40e816 = _0x2f18e2[_0x24239d(578)](_0x44351d, _0x52fb3c) && _0x2f18e2[_0x24239d(573)](_0x44351d, new Date(_0x2f18e2[_0x24239d(516)](_0x52fb3c[_0x24239d(316)](), _0x2f18e2[_0x24239d(456)](_0x2f18e2[_0x24239d(456)](_0x2f18e2[_0x24239d(575)](2, 60), 60), 1e3)))), _0x21b8c6 = _0x2f18e2[_0x24239d(390)](_0x44351d, _0x147483) && _0x2f18e2[_0x24239d(543)](_0x44351d, new Date(_0x2f18e2[_0x24239d(516)](_0x147483[_0x24239d(316)](), _0x2f18e2[_0x24239d(337)](_0x2f18e2[_0x24239d(337)](_0x2f18e2[_0x24239d(337)](2, 60), 60), 1e3))));
    if (_0x2f18e2[_0x24239d(420)](_0x40e816, !_0x21b8c6)) return -1;
    if (_0x2f18e2[_0x24239d(407)](!_0x40e816, _0x21b8c6)) return 1;
    return 0;
  }), _0x178870[_0x2f1786(564)](_0x27b6f7 => {
    const _0xcb916d = _0x2f1786, _0x23aac1 = _0x27b6f7[_0xcb916d(472)] || _0x27b6f7[_0xcb916d(360)] || _0x27b6f7[_0xcb916d(409)], _0xd42e52 = new Date, _0x329350 = new Date(_0x27b6f7[_0xcb916d(460)] + "T" + _0x27b6f7[_0xcb916d(187)]), _0x60a9f4 = _0x2f18e2[_0xcb916d(494)](_0xd42e52, _0x329350) && _0x2f18e2[_0xcb916d(573)](_0xd42e52, new Date(_0x2f18e2[_0xcb916d(206)](_0x329350[_0xcb916d(316)](), _0x2f18e2[_0xcb916d(367)](_0x2f18e2[_0xcb916d(179)](_0x2f18e2[_0xcb916d(315)](2, 60), 60), 1e3)))), _0x17c28c = document[_0xcb916d(372) + _0xcb916d(290)](_0x2f18e2[_0xcb916d(332)]);
    _0x17c28c[_0xcb916d(268)] = _0x2f18e2[_0xcb916d(401)], _0x17c28c[_0xcb916d(402) + "te"](_0x2f18e2[_0xcb916d(214)], _0x27b6f7[_0xcb916d(460)][_0xcb916d(421) + "e"]()), _0x17c28c[_0xcb916d(402) + "te"](_0x2f18e2[_0xcb916d(301)], _0x27b6f7[_0xcb916d(291)][_0xcb916d(421) + "e"]()), _0x17c28c[_0xcb916d(402) + "te"](_0x2f18e2[_0xcb916d(527)], _0x27b6f7[_0xcb916d(279)][_0xcb916d(421) + "e"]()), _0x17c28c[_0xcb916d(402) + "te"](_0x2f18e2[_0xcb916d(314)], _0x60a9f4 ? _0x2f18e2[_0xcb916d(411)] : _0x2f18e2[_0xcb916d(513)]);
    const _0xd24a5c = !_0x60a9f4 ? _0xcb916d(479) + _0xcb916d(227) + _0xcb916d(542) + _0xcb916d(211) + _0x27b6f7[_0xcb916d(460)] + "T" + _0x27b6f7[_0xcb916d(187)] + (_0xcb916d(248) + _0xcb916d(230) + _0xcb916d(388)) : "";
    _0x17c28c[_0xcb916d(514)] = _0xcb916d(551) + _0xcb916d(312) + _0xcb916d(469) + _0xcb916d(445) + _0xcb916d(324) + _0xcb916d(312) + _0xcb916d(312) + _0xcb916d(479) + _0xcb916d(462) + _0xcb916d(424) + _0xcb916d(440) + _0xcb916d(207) + _0xcb916d(470) + _0x2f18e2[_0xcb916d(356)](formatDate, _0x27b6f7[_0xcb916d(460)]) + (_0xcb916d(293) + _0xcb916d(312) + _0xcb916d(312) + _0xcb916d(194) + _0xcb916d(525) + _0xcb916d(428) + _0xcb916d(561) + _0xcb916d(377) + " ") + _0x27b6f7[_0xcb916d(279)] + (_0xcb916d(293) + _0xcb916d(312) + _0xcb916d(312) + _0xcb916d(194) + _0xcb916d(244) + _0xcb916d(241) + _0xcb916d(250) + _0xcb916d(191) + _0xcb916d(524)) + _0x27b6f7[_0xcb916d(187)] + _0xcb916d(389) + _0x27b6f7[_0xcb916d(291)] + (_0xcb916d(293) + _0xcb916d(312) + _0xcb916d(312) + "  ") + (_0x60a9f4 ? _0x2f18e2[_0xcb916d(362)] : _0xd24a5c) + (_0xcb916d(551) + _0xcb916d(312) + _0xcb916d(548) + _0xcb916d(312) + _0xcb916d(546) + _0xcb916d(203) + _0xcb916d(280) + _0xcb916d(310) + _0xcb916d(200) + _0xcb916d(351)) + _0x27b6f7[_0xcb916d(415)] + _0xcb916d(501) + _0x27b6f7[_0xcb916d(472)] + _0xcb916d(501) + _0x27b6f7[_0xcb916d(360)] + _0xcb916d(501) + _0x27b6f7[_0xcb916d(409)] + _0xcb916d(501) + _0x27b6f7[_0xcb916d(279)] + (_0xcb916d(465) + _0xcb916d(312) + _0xcb916d(249) + _0xcb916d(424) + _0xcb916d(197) + _0xcb916d(414) + _0xcb916d(556) + _0xcb916d(312) + _0xcb916d(312) + _0xcb916d(317) + _0xcb916d(312) + _0xcb916d(574)), _0x228bd8[_0xcb916d(554) + "d"](_0x17c28c);
  });
}
function updateCountdown() {
  const _0x512252 = _0x2fbf83, _0x4c90df = {iLASC: _0x512252(189), VaEAd: function (_0x2e8479, _0x2e2c9e) {
    return _0x2e8479 - _0x2e2c9e;
  }, hCKXn: function (_0x5b4784, _0x185245) {
    return _0x5b4784 <= _0x185245;
  }, CfRqx: function (_0x39b00e, _0x420bc2) {
    return _0x39b00e / _0x420bc2;
  }, dTrcs: function (_0x51949c, _0x39c79b) {
    return _0x51949c * _0x39c79b;
  }, HLhlI: function (_0x3bd321, _0x2da096) {
    return _0x3bd321 * _0x2da096;
  }, OisbS: function (_0x1810bc, _0xfddbed) {
    return _0x1810bc / _0xfddbed;
  }, vCqUq: function (_0x27703a, _0x19e6b8) {
    return _0x27703a % _0x19e6b8;
  }, ypptA: function (_0x3d3c3a, _0x5162f6) {
    return _0x3d3c3a * _0x5162f6;
  }, GWFLi: function (_0x1b3a06, _0x20d8b9) {
    return _0x1b3a06 * _0x20d8b9;
  }, SOtFa: function (_0x585c8b, _0x63a6e) {
    return _0x585c8b * _0x63a6e;
  }, EdPVH: function (_0x56bda7, _0x3c5710) {
    return _0x56bda7 / _0x3c5710;
  }, FEvYo: function (_0x109e14, _0x1dd64e) {
    return _0x109e14 % _0x1dd64e;
  }, jjDWd: function (_0x55c6b4, _0x2ffa0d) {
    return _0x55c6b4 * _0x2ffa0d;
  }, oPnzk: _0x512252(475) + "r]"}, _0x49c6cc = document[_0x512252(320) + _0x512252(381)](_0x4c90df[_0x512252(323)]), _0x50aed4 = new Date;
  _0x49c6cc[_0x512252(564)](_0x58024f => {
    const _0x193eb2 = _0x512252, _0x2c9af1 = new Date(_0x58024f[_0x193eb2(558) + "te"](_0x4c90df[_0x193eb2(224)])), _0x406ba2 = _0x4c90df[_0x193eb2(507)](_0x2c9af1, _0x50aed4);
    if (_0x4c90df[_0x193eb2(519)](_0x406ba2, 0)) _0x58024f[_0x193eb2(266) + "t"] = ""; else {
      const _0x35ced5 = Math[_0x193eb2(434)](_0x4c90df[_0x193eb2(419)](_0x406ba2, _0x4c90df[_0x193eb2(384)](_0x4c90df[_0x193eb2(295)](1e3, 60), 60))), _0x243c9d = Math[_0x193eb2(434)](_0x4c90df[_0x193eb2(476)](_0x4c90df[_0x193eb2(368)](_0x406ba2, _0x4c90df[_0x193eb2(347)](_0x4c90df[_0x193eb2(328)](1e3, 60), 60)), _0x4c90df[_0x193eb2(240)](1e3, 60))), _0x82fc14 = Math[_0x193eb2(434)](_0x4c90df[_0x193eb2(218)](_0x4c90df[_0x193eb2(309)](_0x406ba2, _0x4c90df[_0x193eb2(545)](1e3, 60)), 1e3));
      _0x58024f[_0x193eb2(266) + "t"] = _0x35ced5 + "h " + _0x243c9d + "m " + _0x82fc14 + "s";
    }
  });
}
function playMatch(_0x1911ab, _0x620e69, _0x46a8a7, _0x1ec5b8, _0x34bf32) {
  const _0x96e072 = _0x2fbf83, _0x243a1f = {gOdct: _0x96e072(246) + _0x96e072(289), nrobj: _0x96e072(468) + _0x96e072(490) + _0x96e072(454), Mlcfd: function (_0x532e85, _0xa85535) {
    return _0x532e85 || _0xa85535;
  }, glkrr: _0x96e072(429) + _0x96e072(303), bcHqE: function (_0x1c8a44, _0x5ccc0b) {
    return _0x1c8a44(_0x5ccc0b);
  }, UwRHv: _0x96e072(193), MqRqj: _0x96e072(245), BGJJp: _0x96e072(277), RckZJ: _0x96e072(552), rAnBo: _0x96e072(531), kncVh: function (_0xfed508, _0xfdf84f) {
    return _0xfed508(_0xfdf84f);
  }};
  let _0x17138e = _0x243a1f[_0x96e072(382)](_0x620e69, _0x46a8a7) || _0x1ec5b8;
  _0x243a1f[_0x96e072(403)](fetch, _0x620e69)[_0x96e072(178)](_0x1a9300 => {
    const _0x24fad9 = _0x96e072;
    if (!_0x1a9300.ok) throw new Error(_0x243a1f[_0x24fad9(488)]);
    return _0x1a9300;
  })[_0x96e072(442)](_0x595ca9 => {
    const _0x1d610a = _0x96e072;
    console[_0x1d610a(343)](_0x243a1f[_0x1d610a(437)], _0x595ca9), _0x17138e = _0x243a1f[_0x1d610a(382)](_0x46a8a7, _0x1ec5b8);
  })[_0x96e072(544)](() => {
    const _0x230bba = _0x96e072;
    _0x1ec5b8 ? document[_0x230bba(383) + _0x230bba(485)](_0x243a1f[_0x230bba(374)])[_0x230bba(514)] = _0x230bba(190) + _0x230bba(521) + _0x1ec5b8 + (_0x230bba(270) + _0x230bba(180) + _0x230bba(349) + _0x230bba(231) + _0x230bba(399) + _0x230bba(260) + _0x230bba(285) + _0x230bba(534) + _0x230bba(446) + _0x230bba(305) + _0x230bba(265) + _0x230bba(234) + _0x230bba(499)) : _0x243a1f[_0x230bba(403)](jwplayer, _0x243a1f[_0x230bba(374)])[_0x230bba(251)]({file: _0x17138e, width: _0x243a1f[_0x230bba(535)], aspectratio: _0x243a1f[_0x230bba(327)], image: " "}), document[_0x230bba(383) + _0x230bba(485)](_0x243a1f[_0x230bba(374)])[_0x230bba(396) + _0x230bba(195)]({behavior: _0x243a1f[_0x230bba(423)], block: _0x243a1f[_0x230bba(560)]}), document[_0x230bba(383) + _0x230bba(485)](_0x243a1f[_0x230bba(358)])[_0x230bba(266) + "t"] = _0x34bf32, _0x243a1f[_0x230bba(296)](loadChannels, _0x1911ab);
  });
}
async function loadChannels(_0x5c3c32) {
  const _0x1ad3f6 = _0x2fbf83, _0x1f8adb = {lJnbS: function (_0x335e81, _0x4d5a52) {
    return _0x335e81(_0x4d5a52);
  }, wPnVz: _0x1ad3f6(451) + _0x1ad3f6(375) + _0x1ad3f6(263), rVupZ: function (_0x133194, _0x549bfc) {
    return _0x133194 > _0x549bfc;
  }, DknFF: function (_0x5f2092, _0x456b54) {
    return _0x5f2092(_0x456b54);
  }, XLzJx: _0x1ad3f6(529) + "st", LKrxY: _0x1ad3f6(486), HsjLG: _0x1ad3f6(505), MKFwR: _0x1ad3f6(468) + _0x1ad3f6(539) + _0x1ad3f6(292)};
  try {
    const _0xeb1231 = await _0x1f8adb[_0x1ad3f6(492)](fetch, _0x1ad3f6(508) + _0x1ad3f6(186) + _0x1ad3f6(489) + _0x1ad3f6(352) + _0x1ad3f6(256) + _0x5c3c32);
    if (!_0xeb1231.ok) throw new Error(_0x1f8adb[_0x1ad3f6(376)]);
    const _0x18e05c = await _0xeb1231[_0x1ad3f6(426)]();
    _0x18e05c[_0x1ad3f6(202)] && _0x1f8adb[_0x1ad3f6(500)](_0x18e05c[_0x1ad3f6(264)][_0x1ad3f6(530)], 0) ? (_0x1f8adb[_0x1ad3f6(568)](renderChannels, _0x18e05c[_0x1ad3f6(264)]), _0x1f8adb[_0x1ad3f6(492)](renderServerMenu, _0x18e05c[_0x1ad3f6(264)])) : (document[_0x1ad3f6(383) + _0x1ad3f6(485)](_0x1f8adb[_0x1ad3f6(450)])[_0x1ad3f6(361)][_0x1ad3f6(431)] = _0x1f8adb[_0x1ad3f6(345)], document[_0x1ad3f6(383) + _0x1ad3f6(485)](_0x1f8adb[_0x1ad3f6(353)])[_0x1ad3f6(361)][_0x1ad3f6(431)] = _0x1f8adb[_0x1ad3f6(345)]);
  } catch (_0xc2b98a) {
    console[_0x1ad3f6(343)](_0x1f8adb[_0x1ad3f6(572)], _0xc2b98a), document[_0x1ad3f6(383) + _0x1ad3f6(485)](_0x1f8adb[_0x1ad3f6(450)])[_0x1ad3f6(361)][_0x1ad3f6(431)] = _0x1f8adb[_0x1ad3f6(345)], document[_0x1ad3f6(383) + _0x1ad3f6(485)](_0x1f8adb[_0x1ad3f6(353)])[_0x1ad3f6(361)][_0x1ad3f6(431)] = _0x1f8adb[_0x1ad3f6(345)];
  }
}
function renderChannels(_0x140874) {
  const _0x2c6753 = _0x2fbf83, _0x39dae8 = {PliyB: _0x2c6753(482) + "ms", EvgNN: _0x2c6753(529) + "st", LgTvq: _0x2c6753(449)}, _0x4c6799 = document[_0x2c6753(383) + _0x2c6753(485)](_0x39dae8[_0x2c6753(318)]);
  _0x4c6799[_0x2c6753(514)] = "", _0x140874[_0x2c6753(564)](_0x5028ac => {
    const _0x556fd7 = _0x2c6753, _0x31286b = document[_0x556fd7(372) + _0x556fd7(290)]("li");
    _0x31286b[_0x556fd7(514)] = _0x556fd7(551) + _0x556fd7(312) + _0x556fd7(398) + _0x556fd7(255) + _0x556fd7(366) + "'" + _0x5028ac[_0x556fd7(335) + _0x556fd7(547)][0] + _0x556fd7(501) + _0x5028ac[_0x556fd7(333)] + _0x556fd7(395) + _0x5028ac[_0x556fd7(466)] + (_0x556fd7(317) + _0x556fd7(312) + _0x556fd7(574)), _0x4c6799[_0x556fd7(554) + "d"](_0x31286b);
  }), document[_0x2c6753(383) + _0x2c6753(485)](_0x39dae8[_0x2c6753(553)])[_0x2c6753(361)][_0x2c6753(431)] = _0x39dae8[_0x2c6753(483)];
}
function playChannel(_0x541dc2, _0x747aa7) {
  const _0xdc6b27 = _0x2fbf83, _0x307475 = {gOmps: _0xdc6b27(429) + _0xdc6b27(303), WsodX: function (_0x2494ce, _0x25d08e) {
    return _0x2494ce(_0x25d08e);
  }, IYdaA: _0xdc6b27(193), xbnhg: _0xdc6b27(245), hwAxL: _0xdc6b27(277), XtsxH: _0xdc6b27(552)};
  _0x747aa7 ? document[_0xdc6b27(383) + _0xdc6b27(485)](_0x307475[_0xdc6b27(350)])[_0xdc6b27(514)] = _0xdc6b27(190) + _0xdc6b27(521) + _0x747aa7 + (_0xdc6b27(270) + _0xdc6b27(180) + _0xdc6b27(349) + _0xdc6b27(231) + _0xdc6b27(399) + _0xdc6b27(260) + _0xdc6b27(285) + _0xdc6b27(534) + _0xdc6b27(446) + _0xdc6b27(305) + _0xdc6b27(265) + _0xdc6b27(234) + _0xdc6b27(499)) : _0x307475[_0xdc6b27(455)](jwplayer, _0x307475[_0xdc6b27(350)])[_0xdc6b27(251)]({file: _0x541dc2, width: _0x307475[_0xdc6b27(215)], aspectratio: _0x307475[_0xdc6b27(216)], image: " "}), document[_0xdc6b27(383) + _0xdc6b27(485)](_0x307475[_0xdc6b27(350)])[_0xdc6b27(396) + _0xdc6b27(195)]({behavior: _0x307475[_0xdc6b27(233)], block: _0x307475[_0xdc6b27(371)]});
}
function renderServerMenu(_0xcea451) {
  const _0x3ae868 = _0x2fbf83, _0x288060 = {MaAGi: _0x3ae868(562), ONDOH: _0x3ae868(505), oaClj: _0x3ae868(449)}, _0xfceb5a = document[_0x3ae868(383) + _0x3ae868(485)](_0x288060[_0x3ae868(410)]);
  _0xfceb5a[_0x3ae868(514)] = "";
  let _0x23db6c = 1;
  _0xcea451[_0x3ae868(564)]((_0x1e6f41, _0x28deed) => {
    const _0x114f3e = _0x3ae868, _0x218198 = {XYJsJ: _0x288060[_0x114f3e(336)]};
    _0x1e6f41[_0x114f3e(335) + _0x114f3e(547)][_0x114f3e(564)]((_0x19c347, _0x2f145f) => {
      const _0x433ff3 = _0x114f3e, _0x56d2be = document[_0x433ff3(372) + _0x433ff3(290)](_0x218198[_0x433ff3(294)]);
      _0x56d2be[_0x433ff3(514)] = _0x433ff3(385) + _0x433ff3(238) + _0x433ff3(373) + _0x433ff3(201) + _0x23db6c, _0x56d2be[_0x433ff3(254)] = () => playChannel(_0x19c347, _0x1e6f41[_0x433ff3(333)]), _0xfceb5a[_0x433ff3(554) + "d"](_0x56d2be), _0x23db6c++;
    });
  }), document[_0x3ae868(383) + _0x3ae868(485)](_0x288060[_0x3ae868(410)])[_0x3ae868(361)][_0x3ae868(431)] = _0x288060[_0x3ae868(444)];
}
function populateFilters(_0x38acd5) {
  const _0x5aaaa3 = _0x2fbf83, _0x1829ef = {FoQWw: _0x5aaaa3(448), qhjMe: function (_0x3e2473, _0x442301) {
    return _0x3e2473(_0x442301);
  }, QduRw: _0x5aaaa3(511), Thglz: _0x5aaaa3(217) + "er", xHGQc: _0x5aaaa3(220) + _0x5aaaa3(348) + _0x5aaaa3(283) + _0x5aaaa3(438), SjEvr: _0x5aaaa3(220) + _0x5aaaa3(348) + _0x5aaaa3(416) + _0x5aaaa3(354) + "n>"}, _0x514580 = document[_0x5aaaa3(383) + _0x5aaaa3(485)](_0x1829ef[_0x5aaaa3(435)]), _0x39b51f = document[_0x5aaaa3(383) + _0x5aaaa3(485)](_0x1829ef[_0x5aaaa3(443)]);
  _0x514580[_0x5aaaa3(514)] = _0x1829ef[_0x5aaaa3(219)], _0x39b51f[_0x5aaaa3(514)] = _0x1829ef[_0x5aaaa3(541)];
  const _0x1048fa = [...new Set(_0x38acd5[_0x5aaaa3(357)](_0x1f0256 => _0x1f0256[_0x5aaaa3(460)]))], _0x123670 = [...new Set(_0x38acd5[_0x5aaaa3(357)](_0x1400e1 => _0x1400e1[_0x5aaaa3(291)]))];
  _0x1048fa[_0x5aaaa3(564)](_0xc5dfe3 => {
    const _0x3366ec = _0x5aaaa3, _0xe1f973 = document[_0x3366ec(372) + _0x3366ec(290)](_0x1829ef[_0x3366ec(304)]);
    _0xe1f973[_0x3366ec(236)] = _0xc5dfe3[_0x3366ec(421) + "e"](), _0xe1f973[_0x3366ec(266) + "t"] = _0x1829ef[_0x3366ec(512)](formatDate, _0xc5dfe3), _0x514580[_0x3366ec(554) + "d"](_0xe1f973);
  }), _0x123670[_0x5aaaa3(564)](_0x3b0da7 => {
    const _0x3b8f93 = _0x5aaaa3, _0x32f660 = document[_0x3b8f93(372) + _0x3b8f93(290)](_0x1829ef[_0x3b8f93(304)]);
    _0x32f660[_0x3b8f93(236)] = _0x3b0da7[_0x3b8f93(421) + "e"](), _0x32f660[_0x3b8f93(266) + "t"] = _0x3b0da7, _0x39b51f[_0x3b8f93(554) + "d"](_0x32f660);
  });
}
function filterMatches() {
  const _0x25a5cc = _0x2fbf83, _0x47cbc5 = {OKuXb: _0x25a5cc(274), TJJYr: _0x25a5cc(205) + "e", dmXOU: _0x25a5cc(184), uvPCd: function (_0x127a08, _0x725019) {
    return _0x127a08 === _0x725019;
  }, HDsVY: function (_0x674927, _0x2e481a) {
    return _0x674927 === _0x2e481a;
  }, iqOUc: function (_0x49eaf9, _0x50136f) {
    return _0x49eaf9 && _0x50136f;
  }, CfFxW: _0x25a5cc(342) + "s", suDEQ: function (_0x81cf7b, _0x385acb) {
    return _0x81cf7b === _0x385acb;
  }, xZxFB: _0x25a5cc(477), aLDLj: function (_0x592408, _0x7270ac) {
    return _0x592408 !== _0x7270ac;
  }, eVLoq: function (_0xc6262e, _0x35298f) {
    return _0xc6262e !== _0x35298f;
  }, PAcEw: function (_0x3fea59, _0x23914e) {
    return _0x3fea59 === _0x23914e;
  }, Uuouu: _0x25a5cc(259), iuiuQ: _0x25a5cc(511), FVjQb: _0x25a5cc(217) + "er", WVLYC: _0x25a5cc(334), COCou: _0x25a5cc(432) + _0x25a5cc(221), aqIyG: _0x25a5cc(346), FfjUU: function (_0x3c1081, _0x22b246) {
    return _0x3c1081 === _0x22b246;
  }, ljTDr: _0x25a5cc(540)}, _0x1c2fe3 = document[_0x25a5cc(383) + _0x25a5cc(485)](_0x47cbc5[_0x25a5cc(550)])[_0x25a5cc(236)][_0x25a5cc(421) + "e"](), _0x5a6e73 = document[_0x25a5cc(383) + _0x25a5cc(485)](_0x47cbc5[_0x25a5cc(487)])[_0x25a5cc(236)][_0x25a5cc(421) + "e"](), _0x5b9848 = document[_0x25a5cc(383) + _0x25a5cc(485)](_0x47cbc5[_0x25a5cc(276)])[_0x25a5cc(236)][_0x25a5cc(421) + "e"](), _0x203214 = document[_0x25a5cc(320) + _0x25a5cc(381)](_0x47cbc5[_0x25a5cc(404)]);
  let _0x5ee41c = 0;
  const _0x156727 = Array[_0x25a5cc(298)](_0x203214)[_0x25a5cc(481)](_0x599399 => {
    const _0x32abd5 = _0x25a5cc, _0x95bef9 = _0x599399[_0x32abd5(558) + "te"](_0x47cbc5[_0x32abd5(517)]), _0xfe588e = _0x599399[_0x32abd5(558) + "te"](_0x47cbc5[_0x32abd5(458)]), _0x57dd33 = _0x599399[_0x32abd5(558) + "te"](_0x47cbc5[_0x32abd5(307)]), _0x5e60be = !_0x1c2fe3 || _0x47cbc5[_0x32abd5(425)](_0x95bef9, _0x1c2fe3), _0x1ced41 = !_0x5a6e73 || _0x47cbc5[_0x32abd5(198)](_0xfe588e, _0x5a6e73), _0x121a32 = !_0x5b9848 || _0x57dd33[_0x32abd5(447)](_0x5b9848);
    return _0x47cbc5[_0x32abd5(422)](_0x5e60be, _0x1ced41) && _0x121a32;
  })[_0x25a5cc(503)]((_0x4ea2ce, _0x18a14c) => {
    const _0x1a128 = _0x25a5cc, _0x3e93b5 = _0x4ea2ce[_0x1a128(558) + "te"](_0x47cbc5[_0x1a128(406)]), _0x910e15 = _0x18a14c[_0x1a128(558) + "te"](_0x47cbc5[_0x1a128(406)]);
    if (_0x47cbc5[_0x1a128(537)](_0x3e93b5, _0x47cbc5[_0x1a128(461)]) && _0x47cbc5[_0x1a128(271)](_0x910e15, _0x47cbc5[_0x1a128(461)])) return -1;
    if (_0x47cbc5[_0x1a128(478)](_0x3e93b5, _0x47cbc5[_0x1a128(461)]) && _0x47cbc5[_0x1a128(566)](_0x910e15, _0x47cbc5[_0x1a128(461)])) return 1;
    return 0;
  });
  _0x203214[_0x25a5cc(564)](_0x4ae856 => _0x4ae856[_0x25a5cc(361)][_0x25a5cc(431)] = _0x25a5cc(486)), _0x156727[_0x25a5cc(564)](_0x1eef81 => {
    const _0xcd2b59 = _0x25a5cc;
    _0x1eef81[_0xcd2b59(361)][_0xcd2b59(431)] = _0x47cbc5[_0xcd2b59(359)], _0x5ee41c++;
  });
  const _0x2aa1c4 = document[_0x25a5cc(383) + _0x25a5cc(485)](_0x47cbc5[_0x25a5cc(484)]);
  _0x47cbc5[_0x25a5cc(418)](_0x5ee41c, 0) ? _0x2aa1c4[_0x25a5cc(515)][_0x25a5cc(209)](_0x47cbc5[_0x25a5cc(288)]) : _0x2aa1c4[_0x25a5cc(515)][_0x25a5cc(405)](_0x47cbc5[_0x25a5cc(288)]);
}
function resetFilters() {
  const _0x23dea2 = _0x2fbf83, _0x16a480 = {akfbU: _0x23dea2(511), TouiX: _0x23dea2(217) + "er", pgNTc: _0x23dea2(334), NJJKX: function (_0x165a50) {
    return _0x165a50();
  }};
  document[_0x23dea2(383) + _0x23dea2(485)](_0x16a480[_0x23dea2(522)])[_0x23dea2(236)] = "", document[_0x23dea2(383) + _0x23dea2(485)](_0x16a480[_0x23dea2(325)])[_0x23dea2(236)] = "", document[_0x23dea2(383) + _0x23dea2(485)](_0x16a480[_0x23dea2(370)])[_0x23dea2(236)] = "", _0x16a480[_0x23dea2(308)](filterMatches);
}
function _0x29ee() {
  const _0x42b3d3 = ["liveUrl", "Qttcr", "5604352vHhvlL", "[data-time", "OisbS", "live", "eVLoq", "<span clas", 's="live"><', "filter", "channelIte", "LgTvq", "aqIyG", "ById", "none", "FVjQb", "gOdct", "/v1/match/", "load live ", "xsFOF", "lJnbS", "SNRji", "dwkcS", "GJjmu", "an>", "scheduleCo", "ve Now</sp", "ame>", "rVupZ", "', '", "target", "sort", "parse", "serverMenu", "https://83", "VaEAd", "https://ap", "63OTuJSL", "0000", "dateFilter", "qhjMe", "VaeYL", "innerHTML", "classList", "oBhgg", "OKuXb", "fetch vide", "hCKXn", "vodEO", 'c="', "akfbU", "fetch live", "i> ", 'ass="teams', "1050590TpFPZx", "sVTdf", "QLwfL", "channelsLi", "length", "matchTitle", "JwMHS", "fjkQb", "ts allow-s", "UwRHv", "load match", "suDEQ", "October", "load chann", "show", "SjEvr", 'wn" data-t', "niJch", "finally", "jjDWd", "        <b", "urls", " </div>\n  ", "lnldw", "iuiuQ", "\n         ", "start", "EvgNN", "appendChil", "match", "/i> Watch\n", "scrollTop", "getAttribu", "April", "RckZJ", '="fas fa-u', "button", "onscroll", "forEach", "tRlhY", "PAcEw", "February", "DknFF", "rtakita.gi", "pButton", "as fa-broa", "MKFwR", "sLukM", "      ", "qoVYl", "1478683loyZSp", "setItem", "xKhRu", "dcast-towe", "then", "IFcJF", '00%" heigh', "cqXMa", "div", "September", "data-teams", "ajIwi", "i.90min.to", "time", "sbAJi", "data-timer", "<iframe sr", '-clock"></', "scrollToTo", "100%", "  <span cl", "View", " URL for m", "as fa-play", "HDsVY", "mHKub", 'lick="play', "Server ", "status", "utton clas", "videoUrl", "data-leagu", "uCkzs", 'ndar-alt">', "kEWVN", "add", "es.json", 'imer="', "input", "ckKqk", "XbRCC", "IYdaA", "xbnhg", "leagueFilt", "EdPVH", "xHGQc", "<option va", "card", "WCzhr", "ard", "iLASC", "body", "stener", 's="countdo', "getMonth", "documentEl", " Soon...</", "rameborder", "all", "hwAxL", 'rue"></ifr', "EiGBI", "value", "Modal", "fas fa-ser", "Loaded", "SOtFa", 'ls"><i cla', "60PiVClw", "ement", 'ass="detai', "16:9", "Live URL f", "July", '">Starting', "         <", 'ss="fas fa', "setup", "gqFmx", "GpONg", "onclick", 'nclick="pl', "atchId=", "PwGeZ", "https://wa", "flex", 'ling="no"a', "addEventLi", "November", " not ok", "result", 'lscreen="t', "textConten", "VlPHu", "className", "loader", '" width="1', "aLDLj", "ESyGj", 'r"></i> Li', "data-date", "omDCp", "WVLYC", "smooth", "biCcw", "teams", 's="watch-b', "sentNotifi", "atchId ", "ter by Dat", "match/matc", "llow-scrip", "JEgON", "bDRvM", "ljTDr", "ailed", "ent", "league", "els:", "</span>\n  ", "XYJsJ", "HLhlI", "kncVh", "getItem", "from", "7995HxoPks", "wfzqJ", "yUCQq", "disclaimer", "ntainer", "FoQWw", '" allowful', "apply", "dmXOU", "NJJKX", "FEvYo", 'utton" onc', "es:", "          ", "wbXom", "QVAkD", "CloLN", "getTime", "</button>\n", "PliyB", "JEckP", "querySelec", "YClvV", "GjPTa", "oPnzk", 'nfo">\n    ', "TouiX", "June", "MqRqj", "GWFLi", "LUyFH", "change", "YfBvM", "vtnWZ", "iframe_url", "teamSearch", "streaming_", "MaAGi", "jrfJQ", "Toqhb", "chId=", "/business/", "anIhY", "data-statu", "error", "December", "LKrxY", "noMatches", "ypptA", 'lue="">Fil', 't="100%" f', "gOmps", "Match('", "channels?m", "HsjLG", "gue</optio", "getFullYea", "zvCix", "map", "rAnBo", "Uuouu", "m3u8Url", "style", "slBOO", "oUrl for m", "May", "IQpaQ", "ayChannel(", "DuwPt", "vCqUq", "880fXOZPD", "pgNTc", "XtsxH", "createElem", 'ver"></i> ', "glkrr", "sponse was", "wPnVz", 'sers"></i>', "tFyQv", "August", "2088656xmPLsS", "torAll", "Mlcfd", "getElement", "dTrcs", '<i class="', "RDlnJ", "getDate", "span>", " | ", "ehemw", "January", "March", "h_info?mat", "LgDiV", "')\">", "scrollInto", "stringify", " <button o", '="0" scrol', "code", "CphEe", "setAttribu", "bcHqE", "COCou", "remove", "CfFxW", "UBZzi", "34510CxIiea", "iframeURL", "ONDOH", "GjDdk", "nton.githu", "4940555OGMjLG", '-circle"><', "videoId", "ter by Lea", "thub.io/mi", "FfjUU", "CfRqx", "JEMdj", "toLowerCas", "iqOUc", "BGJJp", 'i class="f', "uvPCd", "json", "vRroc", '"><i class', "jwplayerCo", "kCmHD", "display", ".schedule-", "cations", "floor", "QduRw", "pVcBU", "nrobj", "e</option>", "dmiBA", "as fa-cale", "data", "catch", "Thglz", "oaClj", 's="match-i', "ame-origin", "includes", "option", "block", "XLzJx", "Network re", "b.io/Match", "3zb296.app", "URL:", "WsodX", "EoKRv", "BXvIz", "TJJYr", "upcoming", "date", "xZxFB", 's="date"><', "UKYqZ", "schedule-c", "')\">\n     ", "name", "XLGsK", "Failed to ", " <div clas", "</i> ", "DOMContent"];
  _0x29ee = function () {
    return _0x42b3d3;
  };
  return _0x29ee();
}
function debounce(_0x287fd4, _0x1d7f75) {
  const _0x5cfe6c = {VlPHu: function (_0x5a2c47, _0x4cb2c7) {
    return _0x5a2c47(_0x4cb2c7);
  }, wfzqJ: function (_0x550fc0, _0x973d9f, _0x47ff8c) {
    return _0x550fc0(_0x973d9f, _0x47ff8c);
  }};
  let _0x538106;
  return function (..._0x5c9f3c) {
    const _0x1fe0f9 = _0x5179;
    _0x5cfe6c[_0x1fe0f9(267)](clearTimeout, _0x538106), _0x538106 = _0x5cfe6c[_0x1fe0f9(300)](setTimeout, () => _0x287fd4[_0x1fe0f9(306)](this, _0x5c9f3c), _0x1d7f75);
  };
}
document[_0x2fbf83(383) + _0x2fbf83(485)](_0x2fbf83(334))[_0x2fbf83(261) + _0x2fbf83(226)](_0x2fbf83(212), debounce(filterMatches, 300)), document[_0x2fbf83(383) + _0x2fbf83(485)](_0x2fbf83(511))[_0x2fbf83(261) + _0x2fbf83(226)](_0x2fbf83(330), filterMatches), document[_0x2fbf83(383) + _0x2fbf83(485)](_0x2fbf83(217) + "er")[_0x2fbf83(261) + _0x2fbf83(226)](_0x2fbf83(330), filterMatches), document[_0x2fbf83(261) + _0x2fbf83(226)](_0x2fbf83(471) + _0x2fbf83(239), loadMatches), window[_0x2fbf83(563)] = function () {
  const _0x4642f7 = _0x2fbf83, _0xabf7fb = {bDRvM: function (_0x3b2fb3) {
    return _0x3b2fb3();
  }};
  _0xabf7fb[_0x4642f7(287)](scrollFunction);
};
function scrollFunction() {
  const _0x2ed7eb = _0x2fbf83, _0x7bac9 = {JEckP: function (_0xf0ff87, _0x38849b) {
    return _0xf0ff87 > _0x38849b;
  }, XLGsK: function (_0x267c6d, _0x2eb1bd) {
    return _0x267c6d > _0x2eb1bd;
  }, JwMHS: _0x2ed7eb(192) + _0x2ed7eb(570), kCmHD: _0x2ed7eb(449), wbXom: _0x2ed7eb(486)};
  _0x7bac9[_0x2ed7eb(319)](document[_0x2ed7eb(225)][_0x2ed7eb(557)], 20) || _0x7bac9[_0x2ed7eb(467)](document[_0x2ed7eb(229) + _0x2ed7eb(243)][_0x2ed7eb(557)], 20) ? document[_0x2ed7eb(383) + _0x2ed7eb(485)](_0x7bac9[_0x2ed7eb(532)])[_0x2ed7eb(361)][_0x2ed7eb(431)] = _0x7bac9[_0x2ed7eb(430)] : document[_0x2ed7eb(383) + _0x2ed7eb(485)](_0x7bac9[_0x2ed7eb(532)])[_0x2ed7eb(361)][_0x2ed7eb(431)] = _0x7bac9[_0x2ed7eb(313)];
}
function scrollToTop() {
  const _0x501a1a = _0x2fbf83;
  document[_0x501a1a(225)][_0x501a1a(557)] = 0, document[_0x501a1a(229) + _0x501a1a(243)][_0x501a1a(557)] = 0;
}
setInterval(loadMatches, 6e4);
function openDisclaimer() {
  const _0x1a5720 = _0x2fbf83, _0x5835ba = {ajIwi: _0x1a5720(302) + _0x1a5720(237), vodEO: _0x1a5720(449)};
  document[_0x1a5720(383) + _0x1a5720(485)](_0x5835ba[_0x1a5720(185)])[_0x1a5720(361)][_0x1a5720(431)] = _0x5835ba[_0x1a5720(520)];
}
function closeDisclaimer() {
  const _0x1a584f = _0x2fbf83, _0x44b730 = {tFyQv: _0x1a584f(302) + _0x1a584f(237), gqFmx: _0x1a584f(486)};
  document[_0x1a584f(383) + _0x1a584f(485)](_0x44b730[_0x1a584f(378)])[_0x1a584f(361)][_0x1a584f(431)] = _0x44b730[_0x1a584f(252)];
}
function _0x5179(_0x4d2752, _0x3263d1) {
  const _0x13eeba = _0x29ee();
  return _0x5179 = function (_0x180f17, _0x43e762) {
    _0x180f17 = _0x180f17 - 178;
    let _0x2c208f = _0x13eeba[_0x180f17];
    return _0x2c208f;
  }, _0x5179(_0x4d2752, _0x3263d1);
}
window[_0x2fbf83(254)] = function (_0x2c9154) {
  const _0x2cba9d = _0x2fbf83, _0x532875 = {ESyGj: function (_0x44472a, _0x77091f) {
    return _0x44472a == _0x77091f;
  }, vRroc: _0x2cba9d(302) + _0x2cba9d(237), BXvIz: function (_0x2ec792) {
    return _0x2ec792();
  }};
  _0x532875[_0x2cba9d(272)](_0x2c9154[_0x2cba9d(502)], document[_0x2cba9d(383) + _0x2cba9d(485)](_0x532875[_0x2cba9d(427)])) && _0x532875[_0x2cba9d(457)](closeDisclaimer);
};
