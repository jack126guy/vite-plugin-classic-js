import { type Plugin } from 'vite';
import { transform } from 'esbuild';
import { basename, dirname, join, resolve } from 'node:path';
import { readFile } from 'node:fs/promises';

const esbuildOptions = {
	minify: true,
};

const clajsExtension = /\.(clajs|cljs)$/;

export default function (): Plugin {
	let command: string = null!;
	let base: string = null!;

	return {
		name: 'vite-plugin-classic-js',
		configResolved(config) {
			command = config.command;
			base = config.base;
		},
		resolveId(source, importer) {
			if (!importer) {
				return null;
			}
			if (clajsExtension.test(source)) {
				return resolve(dirname(importer), source).replace(/\\/g, '/');
			}
			return null;
		},
		async load(id) {
			if (clajsExtension.test(id)) {
				if (command === 'build') {
					const referenceId = this.emitFile({
						type: 'asset',
						name: basename(id).replace(clajsExtension, '.js'),
						needsCodeReference: true,
						source: (
							await transform(await readFile(id), esbuildOptions)
						).code,
					});
					return `export default import.meta.ROLLUP_FILE_URL_${referenceId};`;
				} else {
					const scriptSrc = `${base}@fs${id[0] === '/' ? '' : '/'}${id}?no-inline`;
					return `export default ${JSON.stringify(scriptSrc)};`;
				}
			}
			return null;
		},
		resolveFileUrl({ moduleId, fileName }) {
			if (clajsExtension.test(moduleId)) {
				return JSON.stringify(join(base, fileName));
			}
			return null;
		},
	};
}
