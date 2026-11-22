# liangyi-gates 两仪 · 红蓝双引擎校准网关

> 分歧即校准项：预期拦截却放行是盲区，预期放行却拦截是误伤。

同一发弹药过「红方预期」与「蓝方引擎」双通道，逐发比对，输出拦截率、误伤与盲区清单。引擎以模块注入、弹药库为 JSON，任何规则引擎都能接。

```bash
node calibrate.js ./demo/engine.js ./demo/ammo.json
```

实战示例见 [taiji-loop](https://github.com/tanbopiao/taiji-loop)（六引擎 + 70 发弹药）。

License: Apache-2.0
