<script lang="ts">
	import { fade } from 'svelte/transition';
	export let src: string,
		classes: string = '',
		alt: string = '';

	let loading: boolean = true;
</script>

<div class="w-20 h-20 mx-auto mt-5 loader {loading ? '' : 'hidden'}" />

<img
	transition:fade
	{src}
	class="{classes} {loading ? 'opacity-0' : ''}"
	{alt}
	on:load={() => (loading = false)}
/>

<style>
	.loader {
		border: 8px solid #f3f3f3;
		border-radius: 50%;
		border-top: 8px solid #3498db;
		-webkit-animation: spin 1s linear infinite; /* Safari */
		animation: spin 1s linear infinite;
	}

	/* Safari */
	@-webkit-keyframes spin {
		0% {
			-webkit-transform: rotate(0deg);
		}
		100% {
			-webkit-transform: rotate(360deg);
		}
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
