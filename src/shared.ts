import type { Configuration } from "webpack";

export interface OptimizeOptions {
  /**
   * `key` is the path of the dependency, will set to `webpack.resolve.alias` key
   * `value` is the mock module implementation path
   * if set `true`, will use default mock, see implementation in `src/mock.ts`
   * if set `false`, will make webpack to import a empty module
   */
  deps: Record<string, string | boolean>;

  /**
   * this is the webpack config
   * will used to set `webpack.resolve.alias`
   */
  config: Configuration;
}

export const optimizeSSRDeps = (options: OptimizeOptions) => {
  const { config, deps } = options;
  const defaultMock = require.resolve("./mock");

  if (!config.resolve) {
    config.resolve = {
      alias: {},
    };
  }

  if (!config.resolve.alias) {
    config.resolve.alias = {};
  }
  const { alias } = config.resolve;

  let pkgs = "";
  // update webpack.resolve.alias
  Object.entries(deps).forEach(([key, value]) => {
    alias[key] = value === true ? defaultMock : value;
    pkgs += `     - ${key}\n`;
  });

  logOnce(`
  ⚡ these package not need import in server, use mocked instead and can make more fast in server:
${pkgs}`);
};

const logOnce = (function () {
  let called = new Set();
  return function (...args) {
    const key = JSON.stringify(args);
    if (called.has(key)) {
      return;
    }
    called.add(key);
    console.log(...args);
  };
})();
