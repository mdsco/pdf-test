import esbuild from "esbuild";
import workerPlugin from "@chialab/esbuild-plugin-worker";

esbuild.build({
  entryPoints: ["app/javascript/application.js"],
  bundle: true,
  sourcemap: true,
  outdir: "app/assets/builds",
  plugins: [workerPlugin()],
  loader: {
    ".js": "js",
    ".mjs": "js"
  },
}).catch(() => process.exit(1));