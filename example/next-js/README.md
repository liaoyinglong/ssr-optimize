## ssr optimize example

常规配置运行：

- `pnpm dev`
- `pnpm build`
- `node --heap-prof ./node_modules/next/dist/bin/next build` 生成 `heapprofile`

优化配置运行：

- `pnpm dev:optimize`
- `pnpm build:optimize`
- `optimize=1 node --heap-prof ./node_modules/next/dist/bin/next build` 生成 `heapprofile`


### 测试热更新的影响

多次编辑 `web3modal.tsx` 即可