---
layout: "@layouts/PostLayout.astro"
title: "PHP Support for Zed"
description: Adding PHP formatting support for phpcbf.
pubDate: 2026-02-24
author: Andrin
---

## Why I switched to Zed

VSCode served me well for a long time, but at some point the cracks started showing. It felt sluggish, slow to open, slow to index, slow to respond. Extensions bloat quickly, and Microsoft has a habit of quietly nudging things in directions that do not always align with what I want from a code editor. Between the telemetry, the Copilot push, and the general heaviness of an Electron app carrying years of legacy decisions, I started looking for something better.

[Zed](https://zed.dev) caught my attention. It is written in Rust, starts instantly, and feels genuinely snappy compared to anything Electron-based. The editing experience is clean and distraction-free. It was an easy switch.

## Adding PHP support

Zed has a PHP extension and it works well enough out of the box. The catch is formatting. By default it leans on Prettier, which is fine for TypeScript but has no real understanding of PHP coding standards. If your projects follow PSR-12 or a custom `phpcs.xml` ruleset, Prettier will happily reformat your code in ways that break your standards.

The right tool for the job is `phpcbf` — the auto-fixer that ships with [PHP_CodeSniffer](https://github.com/squizlabs/PHP_CodeSniffer). Zed does support external formatters, so in theory you just point it at `phpcbf` and you are done.

## The problem with PHP_CodeSniffer Auto-Fixer

In practice, wiring up `phpcbf` as a Zed external formatter is not straightforward. There are two issues.

The first is exit codes. `phpcbf` returns `1` when it successfully makes fixes, and `2` or higher for actual errors. Most tools treat a non-zero exit code as failure, and Zed is no different. It sees the `1` and assumes something went wrong, discarding the output entirely.

The second is how Zed pipes the file content. It passes the buffer through stdin rather than operating on a real file path, but `phpcbf` needs an actual file to work against. Without a real file it gets confused and either errors out or produces no useful output.

The fix for both is a small wrapper script that handles the plumbing: write the buffer content to a temporary file, run `phpcbf` against that file, print the result to stdout, and exit cleanly regardless of what `phpcbf` returned. Setting that up manually on every PHP project is tedious, so I automated it.

## Try it

The [repo](https://github.com/AHaldner/zed-phpcbf-setup) contains an installer and a Lua script that does the setup for you. It was my first experiment with Lua and I have been enjoying it. The language is small, embeds well, and gets out of your way.

Clone the repo, make the installer executable, and run it:

```sh
chmod +x install.sh
./install.sh
source ~/.zshrc
```

Then navigate to any PHP project and run:

```sh
setup-phpcbf
```

This creates a `tools/phpcbf` wrapper script in your project and adds `.tmp/` to your `.gitignore`. Finally, add the following to your Zed `settings.json`:

```json
"PHP": {
  "formatter": {
    "external": {
      "command": "tools/phpcbf",
      "arguments": ["{buffer_path}"]
    }
  }
}
```

From that point on, saving a PHP file will run `phpcbf` through the wrapper, apply your `phpcs.xml` ruleset, and write the corrected code back. No Prettier, no exit code confusion.
