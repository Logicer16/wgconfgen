/**
 * @file Vite config.
 */
/// <reference types="vitest/config" />
import {codecovVitePlugin} from "@codecov/vite-plugin";
import {defineConfig} from "vite";
import {externalizeDeps} from "vite-plugin-externalize-deps";
import process from "node:process";
import {resolve} from "node:path";
import vitePluginDTS from "vite-plugin-dts";

export default defineConfig({
  build: {
    lib: {
      entry: [
        resolve(import.meta.dirname, "src/index.ts"),
        resolve(import.meta.dirname, "src/cli.ts")
      ],
      name: "wgconfgen"
    },
    rollupOptions: {
      // Set by `externalizeDeps`
      // external: ["..."],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: "Vue"
        }
      }
    },
    sourcemap: true
  },
  plugins: [
    externalizeDeps(),
    vitePluginDTS({
      compilerOptions: {
        declaration: true,
        declarationMap: true
      },
      exclude: "**/*.test.*"
    }),
    codecovVitePlugin({
      bundleName: "wgconfgen",
      enableBundleAnalysis: process.env.CODECOV_TOKEN !== undefined,
      uploadToken: process.env.CODECOV_TOKEN
    })
  ],
  test: {
    // Done by default.
    // reporters:
    //   process.env.GITHUB_ACTIONS === undefined
    //     ? ["dot"]
    //     : ["dot", "github-actions"]
  }
});
