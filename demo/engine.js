/* 演示用迷你双引擎：一条硬规则 + 一条软规则 */
const RULES = [{ id: "D1", name: "绝对化", pats: [/最(好|强)|第一/g], hard: 1 }, { id: "D2", name: "紧迫", pats: [/马上|最后一天/g], hard: 0 }];
function judge(text) {
  const hits = [];
  RULES.forEach(r => r.pats.forEach(p => { p.lastIndex = 0; if (p.test(text)) hits.push(r); }));
  return { v: hits.length ? (hits.some(h => h.hard) ? "red" : "amber") : "green", hits };
}
module.exports = { demo: { name: "演示岗", judge } };
