import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";

export default defineConfig(({ envMode }) => {
  return {
    output: {
      assetPrefix: "./",
    },
    plugins: [pluginReact()],
  };
});
