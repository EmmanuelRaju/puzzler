<script lang="ts">
	import CustomImage from './CustomImage.svelte';
	import { fade } from 'svelte/transition';
	import { puzzleStore } from '$lib/stores/puzzleStore';

	export let show: boolean,
		classes: string = '',
		submitFn = () => {},
		backFn = () => {};

	let availableImages: string[] = [
		'/scenery-1.webp',
		'/scenery-2.webp',
		'/scenery-3.webp',
		'/scenery-4.webp',
		'/scenery-5.webp',
		'/scenery-6.webp',
		'/scenery-7.webp',
		'/scenery-8.webp'
	];
</script>

{#if show}
	<form
		class="{classes} flex flex-col gap-10"
		transition:fade={{ duration: 500 }}
		on:submit|preventDefault={() => submitFn()}
	>
		<div class="mt-5 grid grid-cols-3 gap-10 flex-wrap p-2 justify-around items-end">
			{#each availableImages as image, i (image)}
				<label
					for="availableImage-{i + 1}"
					class="relative border-2 p-2 flex flex-col justify-between rounded-md bg-gray-200 {$puzzleStore.selectedImage ===
					image
						? 'border-blue-600'
						: 'border-transparent'} hover:scale-110 duration-100"
				>
					<CustomImage src={image} alt="availableImage-{i + 1}" classes="rounded-md" />
					<span class="flex justify-center mt-2 font-medium">Puzzle {i + 1}</span>
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
		<div class="flex gap-5 justify-center">
			<button class="btn" on:click|preventDefault={() => backFn()}>Back</button>
			<button type="submit" class="btn">Next</button>
		</div>
	</form>
{/if}
