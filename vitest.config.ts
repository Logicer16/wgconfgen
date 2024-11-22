/**
 * @file The vitest config.
 */

import {defineConfig} from "vitest/config";
// import process from "node:process";

export default defineConfig({
  test: {
    // Done by default.
    // reporters:
    //   process.env.GITHUB_ACTIONS === undefined
    //     ? ["dot"]
    //     : ["dot", "github-actions"]
  }
});
