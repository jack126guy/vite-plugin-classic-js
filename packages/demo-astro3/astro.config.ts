import { defineConfig } from 'astro/config';
import classicJs from '@halfgray/vite-plugin-classic-js';

export default defineConfig({
	vite: {
		plugins: [classicJs()],
	},
});
