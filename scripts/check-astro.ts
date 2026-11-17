import '@scripts/astro-typescript.ts';

const { AstroCheck } = await import('@astrojs/language-server');

const checker = new AstroCheck(process.cwd(), undefined, undefined);
const result = await checker.lint({ logErrors: { level: 'hint' } });

console.info(
    `Astro diagnostics (${result.fileChecked} files): ` +
        `${result.errors} errors, ${result.warnings} warnings, ${result.hints} hints`,
);

process.exitCode = result.errors > 0 || result.status !== 'completed' ? 1 : 0;
