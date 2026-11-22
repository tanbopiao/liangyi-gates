#!/usr/bin/env node
/* 两仪 · 校准网关：同一发弹药过「红方预期」与「蓝方引擎」双通道，
 * 分歧即校准项——预期拦截却放行是盲区，预期放行却拦截是误伤。
 * 引擎以模块路径注入，弹药库为 JSON：{ "<岗位>": [ {id, expect, text?, rows?} ] } */
function calibrate(engine, corpus) {
  const blind = [], falseHits = [];
  let attack = 0, caught = 0, controls = 0;
  for (const [pos, rounds] of Object.entries(corpus)) {
    const e = engine[pos];
    if (!e) continue;
    for (const c of rounds) {
      const v = e.judge(c.text ?? null, c.rows).v;
      if (c.expect === "green") { controls++; if (v !== "green") falseHits.push(`${pos}/${c.id}`); }
      else { attack++; if (v !== "green") caught++; else blind.push(`${pos}/${c.id}(${c.tech || ""})`); }
    }
  }
  return { attack, caught, controls, blind, falseHits, rate: attack ? +(100 * caught / attack).toFixed(1) : 0 };
}
module.exports = { calibrate };
if (require.main === module) {
  const enginePath = process.argv[2], ammoPath = process.argv[3];
  if (!enginePath || !ammoPath) { console.error("用法: node calibrate.js <引擎模块> <弹药库JSON>"); process.exit(1); }
  const r = calibrate(require(enginePath), require(ammoPath));
  console.log(`—— 两仪校准 ——\n攻击 ${r.attack} 拦截 ${r.caught} 拦截率 ${r.rate}%\n对照 ${r.controls} 误伤 ${r.falseHits.length}`);
  console.log(`盲区(${r.blind.length}): ${r.blind.join(", ") || "无"}`);
}
