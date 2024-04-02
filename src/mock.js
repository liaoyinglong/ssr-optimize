// this file is not needed compile
// use cjs to exports members is easier
function f() {}
function mockHooks() {
  return {};
}

const mock = new Proxy(f, {
  get(target, p, receiver) {
    if (typeof p === "string") {
      // 当做 react hooks 使用，确保返回值不是空的
      if (p.startsWith("use")) {
        return mockHooks;
      }
      if (p === "__esModule") {
        return false;
      }
    }
    // 默认返回自身，确保可以循环引用
    return mock;
  },
  construct(target, argArray, newTarget) {
    return mock;
  },
});

// 只会在 server 中被导入，使用 cjs 导出
// 并且 es module 不支持 动态导出，需要声明清楚需要导出的 member
// 这里用 cjs 能很好的完成 mock module 这个任务
exports = mock;
module.exports = exports;
