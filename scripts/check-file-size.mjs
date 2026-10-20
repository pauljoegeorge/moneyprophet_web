import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";

// Audit all tracked and untracked source files, including unchanged legacy code.
const inventory = execFileSync(
  "git",
  ["ls-files", "--cached", "--others", "--exclude-standard", "-z"],
  { encoding: "utf8" },
);
const files = [...new Set(inventory.split("\0"))].filter(
  (file) =>
    /\.(?:[cm]?js|jsx|tsx?|css|scss|html)$/.test(file) &&
    !/^(?:build|coverage|node_modules)\//.test(file) &&
    existsSync(file),
);
const oversized = files.flatMap((file) => {
  const content = readFileSync(file, "utf8");
  const lines = content.split("\n").length - Number(content.endsWith("\n"));
  return lines > 200 ? [`${file}: ${lines} lines (maximum 200)`] : [];
});
if (oversized.length) {
  console.error(oversized.join("\n"));
  process.exitCode = 1;
} else {
  console.log(
    `File-size check passed: ${files.length} source files, maximum 200 lines each.`,
  );
}
