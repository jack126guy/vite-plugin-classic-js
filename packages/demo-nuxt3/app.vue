<script setup lang="ts">
import classicScript from './classic.cljs';

const isDev = import.meta.env.DEV;
</script>

<template>
	<p v-if="isDev">
		<strong>Note</strong>: The classic script is not loaded in dev because
		Nuxt uses a different path for filesystem ("/@fs/") URLs that is not
		compatible with the plugin. However, it will be loaded in a production
		build.
	</p>
	<p id="main"></p>
	<component is="script" :src="classicScript"></component>
</template>
