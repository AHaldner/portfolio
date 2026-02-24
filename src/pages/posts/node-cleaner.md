---
layout: "@layouts/PostLayout.astro"
title: "Node Cleaner"
description: A simple tool written in Rust and using Ratatui for the TUI.
pubDate: 2026-02-23
author: Andrin
---

## The Problem with old node_modules folders

If you work with Node.js projects long enough, you end up with a pile of old projects sitting on your disk. Each one comes with a `node_modules` folder that can easily reach 500MB to 1GB on its own. A handful of abandoned side projects later and you have quietly eaten through several gigabytes without even realising it.

The annoying part is that there is no built-in way to get an overview of where all that space is going. You either dig through directories manually or reach for a third-party GUI tool. Neither feels great.

## Why I built Node Cleaner

I wanted something fast, minimal, and terminal-native. The tool needed to scan a directory tree, surface every `node_modules` folder it found along with its size and how recently it was touched, and then let me delete the ones I no longer needed, all without leaving the terminal.

I wrote it in Rust and used [walkdir](https://crates.io/crates/walkdir) for the directory traversal. Walkdir is purpose-built for recursive filesystem walks and handles the heavy lifting quickly. The scanning runs asynchronously so the UI stays responsive even while it is still discovering folders deeper in the tree.

For the interface I used [Ratatui](https://ratatui.rs/), a Rust library for building terminal UIs. It comes with a solid set of ready-made widgets that were a perfect fit for what I needed here. The result is a clean list view with keyboard navigation, a confirmation popup before any deletion, and a live `(deleting...)` status indicator so you always know what is happening.

## Try it

Clone the [repo](https://github.com/AHaldner/node-cleaner) and install it with Cargo:

```bash
cargo install --path .
```

Then run it from any folder you want to clean:

```bash
node-cleaner
```

The scan starts in the current working directory. Use **Up / Down** to move through the list, **Enter** to confirm removal of the selected folder, **Esc** or **n** to cancel the popup, and **q** to quit.

Deletions run in a background thread, so the UI never freezes mid-cleanup. Safety checks are in place to make sure only `node_modules` folders under the chosen root can be removed.
