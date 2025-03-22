<script setup lang="ts">
import classicScript from './classic.clajs';
</script>

<template>
	<p id="main"></p>
	<component is="script" :src="classicScript"></component>
</template>
