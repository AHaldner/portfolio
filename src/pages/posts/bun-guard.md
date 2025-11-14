---
layout: "@layouts/PostLayout.astro"
title: "Bun Guard"
description: A tiny Bun security scanner powered by the osv.dev database.
pubDate: 2025-11-14
author: Andrin
---

## What is Bun Guard?

**Bun Guard** is a small security scanner for Bun projects. It reads your dependencies, checks them
against the [`osv.dev`](https://osv.dev) vulnerability database, and prints a simple report you can
run locally or in CI.

## Why I built it

I use Bun a lot and wanted a focused way to spot known vulnerabilities in my dependencies, without
signing up for a platform or wiring in a huge toolchain.

## Try it

The npm package is called [`@tihn/bun-guard`](https://www.npmjs.com/package/@tihn/bun-guard) if
you want to try it out.
