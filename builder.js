const url = require("url");
const esbuild = require("esbuild");
const jest = require("jest");

//const __filename = url.fileURLToPath(import.meta.url);
//const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const mode = process.argv[2] || "";

/** @satisfies {import("esbuild").BuildOptions} */
const devConfig = {
  entryPoints: [
    "src/index.ts",
    "test/index.test.ts",
  ],
  bundle: true,
  minify: false,
  sourcemap: false,
  outdir: "dist-dev"
};

/** @satisfies {import("esbuild").BuildOptions} */
const prodConfig = {
  entryPoints: [
    "src/index.ts",
  ],
  bundle: true,
  minify: true,
  sourcemap: false,
  outdir: "dist",
  platform: "node"
};

/**
 * @param {string} mode
 */
async function run(mode) {
  switch(mode) {
    case "test": return await test();
    case "watch": return await watch();
    case "dev": return await buildDev();
    case "build": return await build();
    default: throw new Error(`Unknown builder mode "${mode}".`);
  }
}

async function test() {
  await buildDev();
  await runJest();
}

async function watch() {
  const ctx = await esbuild.context({
    ...devConfig,
    plugins: [runJestPlugin],
  });

  await ctx.watch();
}

async function buildDev() {
  await esbuild.build({...devConfig});
}

async function runJest() {
  /**@type {Parameters<typeof jest.runCLI>[0]} */
  const options = {
    projects: [__dirname],
    silent: true,
  };
  
  await jest.runCLI(options, options.projects);
}

async function build() {
  await esbuild.build({...prodConfig});
}

const runJestPlugin = {
  name: "runJest",
  setup(build) {
    build.onEnd(async args => {
      if (args.errors.length > 0) {
        console.error("Error building. Skip tests.");
        return;
      }

      await runJest();
    });
  }
};

run(mode);