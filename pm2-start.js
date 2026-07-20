const { execSync } = require("child_process");
const path = require("path");

const cwd = path.join(__dirname);

console.log("Starting Next.js dev server...");
console.log("Project:", cwd);

const child = require("child_process").spawn("npx", ["next", "dev"], {
  cwd,
  stdio: "inherit",
  shell: true,
  env: { ...process.env, NODE_ENV: "development" },
});

child.on("exit", (code) => {
  console.log("Server exited with code", code);
});
