<script lang="ts">
	import CustomImage from './CustomImage.svelte';
	import { fade } from 'svelte/transition';
	import { puzzleStore } from '$lib/stores/puzzleStore';

	export let show: boolean,
		submitFn = () => {},
		backFn = () => {};

	let availableImages: string[] = [
		'/scenery-1.webp',
		'/scenery-2.webp',
		'/scenery-3.webp',
		'/scenery-4.webp',
		'/scenery-5.webp',
		'/scenery-6.webp',
		'/emm.webp'
	];
</script>

{#if show}
	<form
		class="flex flex-col gap-10"
		transition:fade={{ duration: 500 }}
		on:submit|preventDefault={() => submitFn()}
	>
		<div>
			<h2>Select puzzle</h2>
			<div class="mt-5 flex gap-5 flex-wrap">
				{#each availableImages as image, i (image)}
					<label
						for="availableImage-{i + 1}"
						class="relative border-2 p-2 rounded-md {$puzzleStore.selectedImage === image
							? 'border-blue-600'
							: 'border-transparent'}"
					>
						<span class="flex justify-center">Puzzle {i + 1}</span>
						<CustomImage src={image} alt="availableImage-{i + 1}" classes="h-28" />
						<input
							type="radio"
							name="selectedImage"
							id="availableImage-{i + 1}"
							class="absolute inset-0 opacity-0 cursor-pointer"
							value={image}
							bind:group={$puzzleStore.selectedImage}
							required
						/>
					</label>
				{/each}
			</div>
		</div>
		<div class="flex gap-5 mt-5 justify-center">
			<button class="btn" on:click|preventDefault={() => backFn()}>Back</button>
			<button type="submit" class="btn">Next</button>
		</div>
	</form>
{/if}
