import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { test } from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ts from "typescript";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(resolve(root, "package.json"));

// ponytail: synchronous local TSX only; use a test runner if async components are added.
function modules(portfolio) {
  const cache = new Map();
  function load(id) {
    if (id === "@/data/portfolio" && portfolio) return portfolio;
    if (id === "next/font/google") return { Inter: () => ({ variable: "font-inter" }) };
    if (id.endsWith(".css")) return {};
    if (!id.startsWith("@/")) return require(id);
    const base = resolve(root, "src", id.slice(2));
    const path = [base + ".ts", base + ".tsx"].find(existsSync);
    assert.ok(path, `Local module exists: ${id}`);
    if (cache.has(path)) return cache.get(path);
    const { outputText } = ts.transpileModule(readFileSync(path, "utf8"), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
    });
    const module = { exports: {} };
    cache.set(path, module.exports);
    new Function("require", "module", "exports", outputText)(load, module, module.exports);
    return module.exports;
  }
  return load;
}

const load = modules();
const data = load("@/data/portfolio");
const render = (loader = load) => renderToStaticMarkup(createElement(loader("@/app/page").default));
const template = /Asanka|Wijesooriya|ramwijesooriya|Colombo|Sri Lanka|Sabaragamuwa|CodeLink|TripMate|ResearchPro|Smart Shop|House Price Predictor|asanka-ai/i;

test("lists exactly the five reviewed projects without unapproved public links", () => {
  assert.deepEqual(data.projects.map((project) => project.slug), [
    "knowledge-wiki-ai", "document-control-ai", "dashboard-query-assistant", "kworks-ai", "reporter-ai",
  ]);
  assert.equal(new Set(data.projects.map((project) => project.slug)).size, 5);
  for (const project of data.projects) {
    assert.equal(project.highlights.length, 3);
    assert.ok(project.tech.length > 0);
    assert.ok(!project.demoUrl && !project.repoUrl);
  }
  assert.match(data.projects.find((project) => project.slug === "kworks-ai").description, /static/i);
  assert.match(data.projects.find((project) => project.slug === "reporter-ai").status, /development/i);
});

test("does not invent personal details or reuse the template identity", () => {
  assert.equal(data.site.name, "");
  assert.equal(data.site.resumeUrl, "");
  assert.equal(data.site.avatar, "/profile.jpg");
  assert.equal(data.site.avatarAlt, "Profile portrait");
  assert.ok(existsSync(resolve(root, "public/profile.jpg")));
  assert.equal(data.site.url, "");
  assert.equal(data.site.availability, "");
  assert.equal(data.contact.email, "");
  assert.equal(data.contact.phone, "");
  assert.equal(data.contact.location, "");
  assert.deepEqual(data.socials, []);
  assert.deepEqual(data.education, []);
  assert.deepEqual(data.experiences, []);
  assert.deepEqual(data.certifications, []);
  assert.deepEqual(data.about.stats, []);
  assert.doesNotMatch(JSON.stringify(data), template);
});

test("renders five project cards and hides absent profile sections and broken actions", () => {
  const html = render();
  for (const project of data.projects) assert.ok(html.includes(project.title));
  for (const id of ["certifications", "experience", "contact"]) {
    assert.ok(!html.includes(`id="${id}"`));
    assert.ok(!html.includes(`href="#${id}"`));
  }
  for (const anchor of html.matchAll(/href="#([^"]+)"/g)) {
    assert.ok(html.includes(`id="${anchor[1]}"`), `Anchor exists: ${anchor[1]}`);
  }
  assert.match(html, /alt="Profile portrait"/);
  assert.match(html, /src="\/profile\.jpg"/);
  assert.doesNotMatch(html, /%2Fprofile\.jpg/);
  const withoutPortrait = render(modules({ ...data, site: { ...data.site, avatar: "", avatarAlt: "" } }));
  assert.doesNotMatch(withoutPortrait, /alt="Profile portrait"|src="\/profile\.jpg"|lg:grid-cols-\[1\.2fr_0\.8fr\]/);
  assert.doesNotMatch(html, /<form|mailto:|tel:|download=""|Deployed systems, not demos/);
  assert.doesNotMatch(html, template);
});

test("renders an accessible black mode toggle and restores only a valid saved theme", () => {
  const html = render();
  assert.match(html, /aria-label="Black mode" aria-pressed="false"/);
  const layout = load("@/app/layout").default;
  const documentHtml = renderToStaticMarkup(createElement(layout, null, createElement("main")));
  const script = documentHtml.match(/<script id="theme-init">([\s\S]*?)<\/script>/)?.[1];
  assert.ok(script, "Theme is restored before the page content");
  assert.ok(documentHtml.indexOf('id="theme-init"') < documentHtml.indexOf("<main"));
  const restore = (stored, blocked = false) => {
    const document = { documentElement: { dataset: {} } };
    const warnings = [];
    const localStorage = { getItem: () => { if (blocked) throw new Error("Storage blocked"); return stored; } };
    new Function("document", "localStorage", "console", script)(document, localStorage, { warn: (message) => warnings.push(message) });
    return { theme: document.documentElement.dataset.theme, warnings };
  };
  assert.equal(restore("black").theme, "black");
  for (const value of [null, "dark", "light", "invalid"]) assert.equal(restore(value).theme, undefined);
  assert.equal(restore(null, true).theme, undefined);
  assert.equal(restore(null, true).warnings.length, 1);
  const css = readFileSync(resolve(root, "src/app/globals.css"), "utf8");
  assert.match(css, /:root\[data-theme="black"\]\s*\{[^}]*--background:\s*0 0% 0%;/);
});

test("uses neutral metadata without a made-up author or website", () => {
  const { metadata } = load("@/app/layout");
  assert.ok(!metadata.metadataBase);
  assert.ok(!metadata.openGraph.url);
  assert.ok(!metadata.authors?.length);
  assert.doesNotMatch(JSON.stringify(metadata), /undefined|null|Asanka|asanka-ai/i);
});

test("all project thumbnails exist and match their project", () => {
  for (const project of data.projects) {
    const path = resolve(root, "public", project.thumbnail.slice(1));
    assert.ok(existsSync(path), project.thumbnail);
    assert.ok(readFileSync(path, "utf8").includes(project.title));
  }
});

test("renders optional profile details when supplied, including social-only contact", () => {
  const filled = {
    ...data,
    site: { ...data.site, name: "Example Person", avatar: "/portrait.jpg", avatarAlt: "Example portrait", resumeUrl: "/resume.pdf", url: "https://example.org", availability: "Available" },
    siteLabel: "Example Person",
    siteInitials: "EP",
    contact: { email: "person@example.org", phone: "+123456789", phoneHref: "tel:+123456789", location: "Example city" },
    hasContact: true,
    contactChannels: [{ label: "Email", value: "person@example.org", href: "mailto:person@example.org", icon: data.skillCategories[0].icon }],
    certifications: [{ title: "Example certification", issuer: "Example issuer", date: "2026", image: "/cert.jpg", accent: "cyan" }],
    experiences: [{ role: "Example role", company: "Example company", period: "2026", summary: "Example work", points: ["Example contribution"], tech: ["Python"] }],
    education: [{ degree: "Example degree", institution: "Example institution", detail: "Example study" }],
    about: { ...data.about, stats: [{ value: "Example", label: "Verified detail" }] },
    projects: data.projects.map((project, index) => index === 0 ? { ...project, demoUrl: "https://example.org/demo", repoUrl: "https://example.org/code" } : project),
  };
  const html = render(modules(filled));
  for (const value of ["Example Person", "Example portrait", "/resume.pdf", "person@example.org", "Example city", "Example certification", "Example company", "Example degree", "Verified detail", "Live Demo", "View Code"]) {
    assert.ok(html.includes(value), value);
  }
  assert.match(html, /<form/);
  const metadata = modules(filled)("@/app/layout").metadata;
  assert.equal(metadata.metadataBase.href, "https://example.org/");
  assert.deepEqual(metadata.authors, [{ name: "Example Person" }]);
  const socialOnly = render(modules({ ...data, hasContact: true, socials: [{ label: "GitHub", href: "https://example.org/profile", icon: data.skillCategories[0].icon }] }));
  assert.match(socialOnly, /id="contact"/);
  assert.doesNotMatch(socialOnly, /<form|mailto:/);
});
