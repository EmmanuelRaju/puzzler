<script lang="ts">
	import { puzzleStore } from '$lib/stores/puzzleStore';

	export let cropperInputImage: HTMLImageElement,
		submitFn = () => {},
		backFn = () => {};
</script>

<form method="dialog" on:submit|preventDefault={() => submitFn()}>
	<div class="max-w-4xl mx-auto">
		<img
			bind:this={cropperInputImage}
			src={$puzzleStore.selectedImage}
			alt="puzzleImage"
			class="block max-w-full cropper-hidden"
		/>
	</div>
	<div class="flex gap-5 mt-5 justify-center">
		<button on:click|preventDefault={() => backFn()}> Back </button>
		<button class="btn">Crop</button>
	</div>
</form>
