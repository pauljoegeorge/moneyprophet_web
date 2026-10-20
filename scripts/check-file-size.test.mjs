import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const checker = fileURLToPath(
  new URL("./check-file-size.mjs", import.meta.url),
);

function audit(files, tracked = []) {
  const cwd = mkdtempSync(join(tmpdir(), "web-source-size-"));
  try {
    execFileSync("git", ["init", "--quiet"], { cwd });
    Object.entries(files).forEach(([file, content]) => {
      const path = join(cwd, file);
      mkdirSync(dirname(path), { recursive: true });
      writeFileSync(path, content);
    });
    if (tracked.length) execFileSync("git", ["add", "--", ...tracked], { cwd });
    return spawnSync(process.execPath, [checker], { cwd, encoding: "utf8" });
  } finally {
    rmSync(cwd, { recursive: true, force: true });
  }
}

test("allows exactly 200 lines and rejects 201 lines in existing tracked code", () => {
  const allowed = audit({ "src/existing.jsx": "// comment\n".repeat(200) }, [
    "src/existing.jsx",
  ]);
  assert.equal(allowed.status, 0);
  const blocked = audit({ "src/existing.jsx": "// comment\n".repeat(201) }, [
    "src/existing.jsx",
  ]);
  assert.equal(blocked.status, 1);
  assert.match(blocked.stderr, /src\/existing.jsx: 201 lines/);
});

test("counts blank lines and rejects oversized untracked files", () => {
  const result = audit({ "src/new.css": "\n".repeat(201) });
  assert.equal(result.status, 1);
  assert.match(result.stderr, /src\/new.css: 201 lines/);
});

test("excludes generated output and dependency lockfiles", () => {
  const files = {
    "build/output.js": "// generated\n".repeat(201),
    "coverage/report.html": "<!-- generated -->\n".repeat(201),
    "node_modules/package/index.js": "// dependency\n".repeat(201),
    "package-lock.json": "\n".repeat(201),
    "src/small.js": "export default 1;\n",
  };
  const result = audit(files, Object.keys(files));
  assert.equal(result.status, 0);
  assert.match(result.stdout, /1 source files/);
});
