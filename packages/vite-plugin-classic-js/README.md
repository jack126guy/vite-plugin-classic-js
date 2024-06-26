# vite-plugin-classic-js

This [Vite](https://vitejs.dev/) plugin enables imports of "classic" (non-module) scripts as static assets, with minification.

**Note**: Although this plugin will work to some extent in a "vanilla" Vite project, it is better used with a framework on top of Vite. (The plugin was originally designed for [Astro](https://astro.build/) projects.) In particular, adding a classic script directly to `index.html` will not work.

## Installation

Add the plugin to the Vite configuration:

```
import { defineConfig } from 'vite';
import classicJs from '@halfgray/vite-plugin-classic-js';

export default defineConfig({
	// ...
	plugins: [classicJs()],
});
```

Currently, no configuration options are provided.

## Usage

Classic scripts are identified with a `.cljs` file extension. Importing a classic script results in a URL which can be used for the `src` attribute of a `<script>` element, similar to other [static assets](https://vitejs.dev/guide/assets.html).

## License

This plugin is available under the MIT License. Refer to `LICENSE.txt` for details.