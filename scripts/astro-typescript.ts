import { registerHooks } from 'node:module';

const legacyCompiler = import.meta.resolve('typescript-astro');

registerHooks({
    resolve(specifier, context, nextResolve) {
        if (specifier === 'typescript') {
            return { url: legacyCompiler, shortCircuit: true };
        }
        return nextResolve(specifier, context);
    },
});
