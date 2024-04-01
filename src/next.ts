import type { NextConfig } from "next";
import { optimizeSSRDeps, type OptimizeOptions } from "./shared";

export const withSSROptimize = (options: Omit<OptimizeOptions, "config">) => {
  return (nextConfig: NextConfig) => {
    const newConfig: NextConfig = {
      ...nextConfig,
      webpack(config, ctx) {
        if (ctx.isServer) {
          // just for server build
          optimizeSSRDeps({
            config,
            deps: options.deps,
          });
        }
        if (typeof nextConfig.webpack === "function") {
          return nextConfig.webpack(config, ctx);
        }
        return config;
      },
    };
    return newConfig;
  };
};
