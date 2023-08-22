require("isomorphic-fetch");
const { writeFileSync, mkdirSync } = require("node:fs");
const { resolve } = require("node:path");

async function main() {
  console.log("Downloading wapi.js");
  const wapiScript = await fetch("https://raw.githubusercontent.com/open-wa/wa-automate-nodejs/master/src/lib/wapi.js").then((res) => res.text());
  const indexOfWAPIGlobal = wapiScript.indexOf("window.WAPI = {};");
  const customWapiScript = wapiScript.substring(0, indexOfWAPIGlobal);
  const path = resolve(__dirname, "../page/features/wapi/downloaded");
  const scriptPath = resolve(path, "wapi.js");
  mkdirSync(path, { recursive: true });
  writeFileSync(scriptPath, customWapiScript, "utf8");
}

main();
