var CareCore = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // core.mjs
  var core_exports = {};
  __export(core_exports, {
    KEY: () => KEY,
    MAX_KM: () => MAX_KM,
    addMonths: () => addMonths,
    csv: () => csv,
    due: () => due,
    freshState: () => freshState,
    parseBackup: () => parseBackup,
    save: () => save,
    todayKST: () => todayKST,
    uid: () => uid,
    updateOdometer: () => updateOdometer,
    validDate: () => validDate,
    validate: () => validate
  });
  var KEY = "car-care-log:v1";
  var MAX_KM = 9999999;
  var uid = () => globalThis.crypto.randomUUID();
  var todayKST = (now = /* @__PURE__ */ new Date()) => new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Seoul", year: "numeric", month: "2-digit", day: "2-digit" }).format(now);
  function validDate(s) {
    if (typeof s !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(s) || s < "1900-01-01") return false;
    const d = /* @__PURE__ */ new Date(s + "T00:00:00Z");
    return Number.isFinite(+d) && d.toISOString().slice(0, 10) === s;
  }
  function addMonths(s, months) {
    if (!validDate(s)) throw Error("\uC62C\uBC14\uB978 \uB0A0\uC9DC\uB97C \uC785\uB825\uD558\uC138\uC694.");
    const [y, m, d] = s.split("-").map(Number), target = new Date(Date.UTC(y, m - 1 + months, 1));
    const last = new Date(Date.UTC(target.getUTCFullYear(), target.getUTCMonth() + 1, 0)).getUTCDate();
    target.setUTCDate(Math.min(d, last));
    return target.toISOString().slice(0, 10);
  }
  var defaults = [
    ["\uC5D4\uC9C4\uC624\uC77C \xB7 \uC624\uC77C\uD544\uD130", "\uAD50\uCCB4", "\uC77C\uBC18 \uAD00\uB9AC \uCC38\uACE0 \xB7 AAA \uC77C\uBC18 \uC548\uB0B4\uB97C \uC57D 8,000 km / 6\uAC1C\uC6D4\uB85C \uC7A1\uC740 \uC608\uC2DC\uC785\uB2C8\uB2E4. \uC5D4\uC9C4\uC744 \uBCF4\uD638\uD558\uB294 \uC624\uC77C\uACFC \uD544\uD130\uB97C \uD568\uAED8 \uAD50\uD658\uD574\uC694. \uB0B4 \uCC28 \uC124\uBA85\uC11C\xB7\uC624\uC77C\uC218\uBA85 \uC54C\uB9BC\uACFC \uAC00\uD639\uC870\uAC74 \uAE30\uC900\uC774 \uC6B0\uC120\uC785\uB2C8\uB2E4."],
    ["\uC5D4\uC9C4 \uC5D0\uC5B4\uD544\uD130", "\uAD50\uCCB4", "\uC77C\uBC18 \uAD00\uB9AC \uCC38\uACE0 \xB7 AAA \uC5F0 1\uD68C \uC548\uB0B4. \uC5D4\uC9C4\uC73C\uB85C \uB4E4\uC5B4\uAC00\uB294 \uACF5\uAE30\uC758 \uBA3C\uC9C0\uB97C \uAC78\uB7EC\uC694. \uC624\uC5FC\uACFC \uC6B4\uD589\uD658\uACBD\xB7\uC124\uBA85\uC11C \uAE30\uC900\uC5D0 \uB530\uB77C \uAD50\uCCB4\uD574\uC694."],
    ["\uC2E4\uB0B4 \uC5D0\uC5B4\uCEE8\uD544\uD130", "\uAD50\uCCB4", "\uC77C\uBC18 \uAD00\uB9AC \uCC38\uACE0 \xB7 AAA \uC5F0 1\uD68C \uC548\uB0B4. \uC2E4\uB0B4 \uACF5\uAE30\uC758 \uBA3C\uC9C0\uB97C \uAC78\uB7EC\uC694. \uB0C4\uC0C8\xB7\uD48D\uB7C9\xB7\uC624\uC5FC\uC744 \uD568\uAED8 \uD655\uC778\uD558\uC138\uC694."],
    ["\uD0C0\uC774\uC5B4 \uC0C1\uD0DC \xB7 \uACF5\uAE30\uC555", "\uC810\uAC80", "\uB0C9\uAC04 \uACF5\uAE30\uC555\uC740 \uCC28\uB7C9 \uB77C\uBCA8\uC744 \uD655\uC778\uD558\uC138\uC694. \uB9C8\uBAA8\xB7\uADE0\uC5F4\xB7\uC190\uC0C1\uB3C4 \uD568\uAED8 \uD655\uC778\uD558\uC138\uC694."],
    ["\uD0C0\uC774\uC5B4 \uAD50\uCCB4", "\uAD50\uCCB4", "\uC8FC\uD589\uAC70\uB9AC\uB9CC\uC73C\uB85C \uACB0\uC815\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4. \uB9C8\uBAA8\xB7\uC190\uC0C1\xB7\uB178\uD6C4 \uC0C1\uD0DC\uB97C \uC804\uBB38\uAC00\uC640 \uD655\uC778\uD558\uC138\uC694."],
    ["\uBE0C\uB808\uC774\uD06C \uD328\uB4DC \xB7 \uB514\uC2A4\uD06C", "\uC810\uAC80", "\uB9C8\uBAA8\xB7\uC18C\uC74C\xB7\uC81C\uB3D9 \uC774\uC0C1\uC744 \uD655\uC778\uD558\uC138\uC694. \uC0C1\uD0DC\uC5D0 \uB530\uB77C \uAD50\uCCB4\uD558\uBA70 \uC774\uC0C1\uC774 \uC788\uC73C\uBA74 \uC810\uAC80\uC744 \uBBF8\uB8E8\uC9C0 \uB9C8\uC138\uC694."],
    ["\uBE0C\uB808\uC774\uD06C\uC561", "\uAD50\uCCB4", "\uCC28\uB7C9\uBCC4 \uC561 \uADDC\uACA9\uACFC \uAE30\uAC04 \uAE30\uC900\uC744 \uCDE8\uAE09\uC124\uBA85\uC11C\uC5D0\uC11C \uD655\uC778\uD558\uC138\uC694."],
    ["\uBCC0\uC18D\uAE30 \uC624\uC77C", "\uAD50\uCCB4", "\uBCC0\uC18D\uAE30 \uC885\uB958\xB7\uC5F0\uC2DD\xB7\uC0AC\uC6A9\uC870\uAC74\uC5D0 \uB530\uB77C \uAE30\uC900\uC774 \uB2E4\uB985\uB2C8\uB2E4. \uC815\uD655\uD55C \uC124\uBA85\uC11C \uD655\uC778 \uD6C4 \uC8FC\uAE30\uB97C \uC124\uC815\uD558\uC138\uC694."],
    ["\uB0C9\uAC01\uC218", "\uAD50\uCCB4", "\uB0C9\uAC01\uC218 \uADDC\uACA9\uACFC \uCD5C\uCD08/\uC774\uD6C4 \uAD50\uD658\uC8FC\uAE30\uB97C \uD655\uC778\uD558\uC138\uC694. \uB728\uAC70\uC6B8 \uB54C \uCEA1\uC744 \uC5F4\uC9C0 \uB9C8\uC138\uC694."],
    ["\uBC30\uD130\uB9AC", "\uC810\uAC80", "\uC2DC\uB3D9 \uC131\uB2A5\xB7\uCDA9\uC804\uC0C1\uD0DC\uB97C \uC810\uAC80\uD558\uC138\uC694. \uACE0\uC815 \uC8FC\uD589\uAC70\uB9AC\uB85C \uAD50\uCCB4\uB97C \uB2E8\uC815\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4."],
    ["\uC810\uD654\uD50C\uB7EC\uADF8 \xB7 \uAD6C\uB3D9\uBCA8\uD2B8", "\uC810\uAC80", "\uC801\uC6A9 \uC5EC\uBD80\xB7\uBD80\uD488 \uADDC\uACA9\xB7\uC815\uBE44\uC8FC\uAE30\uB97C \uCC28\uB7C9 \uC124\uBA85\uC11C\uC5D0\uC11C \uD655\uC778\uD558\uC138\uC694."],
    ["\uC5D4\uC9C4\uC624\uC77C\uB7C9", "\uC810\uAC80", "\uC77C\uBC18 \uC810\uAC80 \uCC38\uACE0 \xB7 \uC6D4 1\uD68C. \uD3C9\uC9C0\uC5D0\uC11C \uC124\uBA85\uC11C\uC758 \uCE21\uC815 \uBC29\uBC95\uC744 \uB530\uB974\uC138\uC694. \uC624\uC77C\uB7C9 \uD655\uC778\uC740 \uC624\uC77C \uAD50\uCCB4\uAC00 \uC544\uB2D9\uB2C8\uB2E4."],
    ["\uB0C9\uAC01\uC218\uB7C9", "\uC810\uAC80", "\uC77C\uBC18 \uC810\uAC80 \uCC38\uACE0 \xB7 \uC6D4 1\uD68C. \uC5D4\uC9C4\uC774 \uC644\uC804\uD788 \uC2DD\uC5C8\uC744 \uB54C \uBCF4\uC870\uD0F1\uD06C \uB208\uAE08\uC744 \uD655\uC778\uD558\uC138\uC694. \uB728\uAC70\uC6B8 \uB54C \uCEA1\uC744 \uC5F4\uC9C0 \uB9C8\uC138\uC694."]
  ];
  function freshState() {
    return { schemaVersion: 1, vehicle: { name: "", odometer: null, fuel: "", type: "" }, items: defaults.map(([name, kind, note]) => ({ id: uid(), name, kind, note, intervalKm: name === "\uC5D4\uC9C4\uC624\uC77C \xB7 \uC624\uC77C\uD544\uD130" ? 8e3 : null, intervalMonths: ["\uD0C0\uC774\uC5B4 \uC0C1\uD0DC \xB7 \uACF5\uAE30\uC555", "\uC5D4\uC9C4\uC624\uC77C\uB7C9", "\uB0C9\uAC01\uC218\uB7C9"].includes(name) ? 1 : ["\uBE0C\uB808\uC774\uD06C \uD328\uB4DC \xB7 \uB514\uC2A4\uD06C", "\uC5D4\uC9C4 \uC5D0\uC5B4\uD544\uD130", "\uC2E4\uB0B4 \uC5D0\uC5B4\uCEE8\uD544\uD130"].includes(name) ? 12 : name === "\uC5D4\uC9C4\uC624\uC77C \xB7 \uC624\uC77C\uD544\uD130" ? 6 : null, confirmed: false, baselineId: null })), records: [] };
  }
  function fail(s) {
    throw Error(s);
  }
  function object(v, keys) {
    if (!v || typeof v !== "object" || Array.isArray(v) || Object.keys(v).some((k) => !keys.includes(k)) || keys.some((k) => !Object.hasOwn(v, k))) fail("\uBC31\uC5C5 \uD615\uC2DD \uB610\uB294 \uD544\uB4DC\uAC00 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.");
  }
  function str(s, n) {
    return typeof s === "string" && s.length <= n;
  }
  function integer(n, max, min = 0) {
    return Number.isSafeInteger(n) && n >= min && n <= max;
  }
  function validate(s, today = todayKST()) {
    object(s, ["schemaVersion", "vehicle", "items", "records"]);
    if (s.schemaVersion !== 1) fail("\uC9C0\uC6D0\uD558\uC9C0 \uC54A\uB294 \uBC31\uC5C5 \uBC84\uC804\uC785\uB2C8\uB2E4.");
    object(s.vehicle, ["name", "odometer", "fuel", "type"]);
    const v = s.vehicle;
    if (!str(v.name, 60) || !str(v.fuel, 30) || !str(v.type, 60) || v.odometer !== null && !integer(v.odometer, MAX_KM)) fail("\uCC28\uB7C9 \uC815\uBCF4\uAC00 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.");
    if (!Array.isArray(s.items) || s.items.length > 100 || !Array.isArray(s.records) || s.records.length > 1e4) fail("\uD56D\uBAA9 \uB610\uB294 \uC774\uB825 \uC218\uAC00 \uD5C8\uC6A9 \uBC94\uC704\uB97C \uBC97\uC5B4\uB0A9\uB2C8\uB2E4.");
    const ids = /* @__PURE__ */ new Set(), rids = /* @__PURE__ */ new Set();
    for (const i of s.items) {
      object(i, ["id", "name", "kind", "note", "intervalKm", "intervalMonths", "confirmed", "baselineId"]);
      if (!str(i.id, 80) || !i.id || ids.has(i.id) || !str(i.name, 80) || !i.name.trim() || !["\uC810\uAC80", "\uAD50\uCCB4", "\uC218\uB9AC", "\uC120\uD0DD \uAD00\uB9AC"].includes(i.kind) || !str(i.note, 500) || typeof i.confirmed !== "boolean" || i.baselineId !== null && !str(i.baselineId, 80) || i.intervalKm !== null && !integer(i.intervalKm, 1e6, 1) || i.intervalMonths !== null && !integer(i.intervalMonths, 600, 1)) fail("\uC815\uBE44 \uD56D\uBAA9\uC758 \uAC12\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.");
      if (i.confirmed && i.intervalKm === null && i.intervalMonths === null) fail("\uD655\uC815\uD560 \uC8FC\uAE30\uB97C \uBA3C\uC800 \uC785\uB825\uD558\uC138\uC694.");
      ids.add(i.id);
    }
    for (const r of s.records) {
      object(r, ["id", "itemId", "date", "km", "note"]);
      if (!str(r.id, 80) || !r.id || rids.has(r.id) || !ids.has(r.itemId) || !str(r.note, 1e3) || r.date !== null && (!validDate(r.date) || r.date > today) || r.km !== null && (!integer(r.km, MAX_KM) || v.odometer === null || r.km > v.odometer) || r.date === null && r.km === null) fail("\uC815\uBE44 \uC774\uB825\uC758 \uB0A0\uC9DC\xB7\uAC70\uB9AC\xB7\uD56D\uBAA9\uC744 \uD655\uC778\uD558\uC138\uC694. \uBBF8\uB798 \uAE30\uB85D\uC740 \uC800\uC7A5\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
      rids.add(r.id);
    }
    for (const i of s.items) {
      const rs = s.records.filter((r) => r.itemId === i.id), base = rs.find((r) => r.id === i.baselineId);
      if (i.baselineId !== null && !base) fail("\uACC4\uC0B0 \uAE30\uC900 \uC774\uB825\uC744 \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
      const dated = rs.filter((r) => r.date !== null && r.km !== null).sort((a, b) => a.date.localeCompare(b.date) || a.km - b.km);
      for (let n = 1; n < dated.length; n++) if (dated[n].km < dated[n - 1].km) fail("\uB0A0\uC9DC\uAC00 \uB4A4\uC778 \uAE30\uB85D\uC758 \uB204\uC801 \uAC70\uB9AC\uAC00 \uB354 \uC791\uC2B5\uB2C8\uB2E4. \uC774\uB825\uC744 \uD655\uC778\uD558\uC138\uC694.");
      const seen = /* @__PURE__ */ new Set();
      for (const r of rs) {
        const key = JSON.stringify([r.date, r.km, r.note]);
        if (seen.has(key)) fail("\uAC19\uC740 \uC815\uBE44 \uAE30\uB85D\uC774 \uC774\uBBF8 \uC788\uC2B5\uB2C8\uB2E4.");
        seen.add(key);
      }
      if (base && rs.some((r) => r.date && base.date && r.date > base.date || r.km !== null && base.km !== null && r.km > base.km)) fail("\uB354 \uCD5C\uADFC \uC774\uB825\uC774 \uC788\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uAE30\uB85D\uC744 \uACC4\uC0B0 \uAE30\uC900\uC73C\uB85C \uC120\uD0DD\uD558\uC138\uC694.");
    }
    return JSON.parse(JSON.stringify(s));
  }
  function save(storage, state) {
    const checked = validate(state);
    try {
      storage.setItem(KEY, JSON.stringify(checked));
    } catch {
      fail("\uC800\uC7A5\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4. \uC800\uC7A5 \uACF5\uAC04 \uB610\uB294 \uBE0C\uB77C\uC6B0\uC800 \uC124\uC815\uC744 \uD655\uC778\uD558\uACE0 JSON \uBC31\uC5C5\uC744 \uBCF4\uAD00\uD558\uC138\uC694.");
    }
    return checked;
  }
  function parseBackup(text) {
    if (typeof text !== "string" || text.length > 3e6) fail("\uBC31\uC5C5 \uD30C\uC77C\uC774 \uB108\uBB34 \uD07D\uB2C8\uB2E4 (\uCD5C\uB300 3 MB).");
    let s;
    try {
      s = JSON.parse(text);
    } catch {
      fail("\uC62C\uBC14\uB978 JSON \uBC31\uC5C5 \uD30C\uC77C\uC774 \uC544\uB2D9\uB2C8\uB2E4.");
    }
    return validate(s);
  }
  function updateOdometer(s, km) {
    if (!integer(km, MAX_KM) || s.vehicle.odometer !== null && km < s.vehicle.odometer) fail("\uD604\uC7AC \uB204\uC801 km\uBCF4\uB2E4 \uC791\uAC8C \uC785\uB825\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uC798\uBABB \uC785\uB825\uD55C \uCC28\uB7C9 \uAC70\uB9AC\uB294 \uCC28\uB7C9 \uC124\uC815\uC5D0\uC11C \uC815\uC815\uD558\uC138\uC694.");
    const next = JSON.parse(JSON.stringify(s));
    next.vehicle.odometer = km;
    return validate(next);
  }
  function due(s, item, today = todayKST()) {
    const r = s.records.find((r2) => r2.id === item.baselineId), result = { state: "unknown", label: "\uBBF8\uAE30\uB85D / \uD655\uC778 \uD544\uC694", nextKm: null, nextDate: null, leftKm: null, leftDays: null, missing: [] };
    if (!r) return result;
    if (item.intervalKm === null && item.intervalMonths === null) return { ...result, state: item.kind === "\uC120\uD0DD \uAD00\uB9AC" ? "optional" : "unset", label: item.kind === "\uC218\uB9AC" ? "\uC218\uB9AC \uAE30\uB85D \uBCF4\uAD00" : item.kind === "\uC120\uD0DD \uAD00\uB9AC" ? "\uC120\uD0DD \uAD00\uB9AC \xB7 \uAC70\uB9AC \uC54C\uB9BC \uC5C6\uC74C" : "\uC8FC\uAE30 \uD655\uC778 \uD544\uC694" };
    if (item.intervalKm !== null) {
      if (r.km === null || s.vehicle.odometer === null) result.missing.push("\uAC70\uB9AC");
      else {
        result.nextKm = r.km + item.intervalKm;
        result.leftKm = result.nextKm - s.vehicle.odometer;
      }
    }
    if (item.intervalMonths !== null) {
      if (!r.date) result.missing.push("\uB0A0\uC9DC");
      else {
        result.nextDate = addMonths(r.date, item.intervalMonths);
        result.leftDays = Math.round((Date.parse(result.nextDate + "T00:00:00Z") - Date.parse(today + "T00:00:00Z")) / 864e5);
      }
    }
    const dueNow = result.leftKm !== null && result.leftKm <= 0 || result.leftDays !== null && result.leftDays <= 0;
    const soon = result.leftKm !== null && result.leftKm <= 500 || result.leftDays !== null && result.leftDays <= 30;
    result.state = dueNow ? "due" : result.missing.length ? "unknown" : soon ? "soon" : "ok";
    result.label = dueNow ? "\uC124\uC815\uD55C \uC810\uAC80 \uC2DC\uC810 \uB3C4\uB798" : result.missing.length ? "\uAE30\uC900 \uC815\uBCF4 \uD655\uC778 \uD544\uC694" : soon ? "\uC810\uAC80 \uC2DC\uC810 \uAC00\uAE4C\uC6C0" : "\uC544\uC9C1 \uC5EC\uC720 \uC788\uC5B4\uC694";
    if (item.kind === "\uC120\uD0DD \uAD00\uB9AC") {
      result.state = "optional";
      result.label = dueNow ? "\uC120\uD0DD \uAD00\uB9AC \uCC38\uACE0 \uC2DC\uC810" : "\uC120\uD0DD \uAD00\uB9AC \xB7 \uC81C\uD488 \uB77C\uBCA8 \uC6B0\uC120";
    }
    return result;
  }
  function csv(s) {
    const cell = (v) => '"' + String(v ?? "").replace(/^[=+\-@\t\r]/, "'$&").replaceAll('"', '""') + '"';
    return "\uFEFF" + [["\uD56D\uBAA9", "\uC720\uD615", "\uC815\uBE44\uC77C", "\uB204\uC801\uAC70\uB9AC (km)", "\uBA54\uBAA8"], ...s.records.map((r) => [s.items.find((i) => i.id === r.itemId).name, s.items.find((i) => i.id === r.itemId).kind, r.date, r.km, r.note])].map((row) => row.map(cell).join(",")).join("\r\n");
  }
  return __toCommonJS(core_exports);
})();
