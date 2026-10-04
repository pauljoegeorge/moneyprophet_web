import { createServer } from "vite";
import { renderToString } from "react-dom/server";
import React from "react";
import { readFile, writeFile, mkdir } from "node:fs/promises";
const server = await createServer({
  server: { middlewareMode: true },
  appType: "custom",
});
try {
  const { default: Landing } = await server.ssrLoadModule(
    "/src/marketing/Landing.jsx",
  );
  const template = await readFile("build/index.html", "utf8");
  const markup = renderToString(React.createElement(Landing));
  await writeFile(
    "build/index.html",
    template.replace('<div id="root"></div>', `<div id="root">${markup}</div>`),
  );
  const privateTemplate = template
    .replace(
      '<meta name="robots" content="index,follow" />',
      '<meta name="robots" content="noindex,follow" />',
    )
    .replace(/<title>.*?<\/title>/, "<title>Sign in — Money Prophet</title>")
    .replace(
      /<link rel="canonical"[^>]*>/,
      '<link rel="canonical" href="https://moneyprophet.paulworks.online/sign_in" />',
    );
  await mkdir("build/sign_in", { recursive: true });
  await writeFile("build/sign_in/index.html", privateTemplate);
  await writeFile(
    "build/app.html",
    privateTemplate
      .replace("Sign in — Money Prophet", "Your workspace — Money Prophet")
      .replace(/<link rel="canonical"[^>]*>/, ""),
  );
  console.log(
    "Pre-rendered landing HTML and generated noindex sign-in/workspace shells.",
  );
} finally {
  await server.close();
}
