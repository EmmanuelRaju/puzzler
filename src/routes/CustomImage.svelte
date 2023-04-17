<script lang="ts">
	import { fade } from 'svelte/transition';
	export let src: string,
		classes: string = '',
		alt: string = '';

	let loading: boolean = true;
</script>

<div class="{classes} {loading ? 'loader' : ''} ">
	<img
		transition:fade
		{src}
		class="{loading ? 'opacity-0' : ''} duration-100"
		{alt}
		on:load={() => (loading = false)}
	/>
</div>

<style>
	.loader {
		width: 80px;
		height: 80px;
		margin: 0 auto;
		border: 8px solid #f3f3f3;
		border-radius: 50%;
		border-top: 8px solid #eb2563;
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
