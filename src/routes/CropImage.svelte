<script lang="ts">
	import { puzzleStore } from '$lib/stores/puzzleStore';
	import { fade } from 'svelte/transition';

	export let cropperInputImage: HTMLImageElement,
		submitFn = () => {},
		backFn = () => {};
</script>

<section
	class="flex flex-col items-center mt-10 gap-5 pb-10 text-white text-center"
	transition:fade={{ duration: 500 }}
>
	<h2 class="text-3xl md:text-4xl capitalize">Final step!</h2>
	<h3 class="text-2xl md:text-3xl">Adjust image in the bounding box</h3>
	<i class="text-sm md:text-base"
		>(Bounding box is created based on the configuration options set in the previous step.
		Scroll/Pinch/Drag to adjust)</i
	>
	<form method="dialog" on:submit|preventDefault={() => submitFn()}>
		<div class="flex gap-5 mt-5 mb-10 justify-center">
			<button class="btn" on:click|preventDefault={() => backFn()}> Back </button>
			<button class="btn">Crop & Play</button>
		</div>
		<div class="max-w-4xl mx-auto">
			<img
				bind:this={cropperInputImage}
				src={$puzzleStore.selectedImage}
				alt="puzzleImage"
				class="block max-w-full cropper-hidden"
			/>
		</div>
	</form>
</section>
