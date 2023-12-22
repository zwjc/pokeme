import fs from "fs";
import path from "path";

import { defineConfig } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";

import solidPlugin from "vite-plugin-solid";
import virtualHtml from "vite-plugin-virtual-html";
// import ghPages from "vite-plugin-gh-pages";
// import reactJsxPlugin from '@vitejs/plugin-react';
// if solved-X.js (or .jsx or .vue or .css) exists, then solved-X.js is tested, otherwise  X.js
const prefix = fs.existsSync("./src/solved-utilities.js") ? "solved-" : "";

const virtualModuleId = "virtual:my-module";
const resolvedVirtualModuleId = "\0" + virtualModuleId;
const pages = {
  // map /react.html
  react: {
    entry: "/src/presenter/" + prefix + "index.jsx",
    title: "PokeMe",
    body: '<div id="root"></div>',
  },
};

pages.index = pages.react;

export default defineConfig({
  plugins: [
    //solidPlugin(),
    // reactJsxPlugin(),
    /*        {
            name: 'my-plugin', // required, will show up in warnings and errors
            resolveId(id) {
                console.log(id);
                if (id.startsWith("virtual:dh2642")) {
                    return "\0"+id;
                }
            },
            load(id) {
                if (id.startsWith("\0virtual:dh2642") ) {
                    
                    return `export const msg = "from virtual module"`;
                }
            },
        },*/
    nodePolyfills({ protocolImports: true }), // needed by mocha
    virtualHtml({ pages }), // HTML mappings
    // ViteGHPages(),
  ],
  server: {
    port: 8080,
  },
  define: {
    TEST_PREFIX: JSON.stringify(prefix),
    __VUE_OPTIONS_API__: JSON.stringify(true),
    __VUE_PROD_DEVTOOLS__: JSON.stringify(true),
  },
  build: {
    target: "esnext", // javascript version to target: latest
    chunkSizeWarningLimit: 600,
    sourcemap: true,
    minify: false
  },
});
