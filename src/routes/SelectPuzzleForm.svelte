<script lang="ts">
	import CustomImage from './CustomImage.svelte';
	import { fade } from 'svelte/transition';
	import { puzzleStore } from '$lib/stores/puzzleStore';

	export let show: boolean,
		classes: string = '',
		submitFn = () => {},
		backFn = () => {};

	let availableImages: string[] = [
		'/puzzleImages/scenery-1.webp',
		'/puzzleImages/scenery-2.webp',
		'/puzzleImages/scenery-3.webp',
		'/puzzleImages/scenery-4.webp',
		'/puzzleImages/scenery-5.webp',
		'/puzzleImages/scenery-6.webp',
		'/puzzleImages/scenery-7.webp',
		'/puzzleImages/scenery-8.webp'
	];
</script>

{#if show}
	<form
		class="{classes} flex flex-col gap-10"
		transition:fade={{ duration: 500 }}
		on:submit|preventDefault={() => submitFn()}
	>
		<div
			class="mt-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 p-2 justify-around items-end"
		>
			<label
				for=""
				class="relative p-2 border-2 rounded-md h-full {$puzzleStore.uploadedImage &&
				$puzzleStore.selectedImage === $puzzleStore.uploadedImage
					? 'border-amarnath'
					: 'border-transparent'} hover:scale-110 duration-100"
			>
				{#if $puzzleStore.uploadedImage}
					<div class="relative">
						<img
							src={$puzzleStore.uploadedImage}
							alt="uploaded"
							class="rounded-md mx-auto max-h-[320px] object-contain object-center w-full h-full"
						/>
						<input
							type="radio"
							name="selectedImage"
							id="uploadedImage"
							class="absolute inset-0 opacity-0 cursor-pointer"
							value={$puzzleStore.uploadedImage}
							bind:group={$puzzleStore.selectedImage}
							required
						/>
					</div>
					<button
						on:click|preventDefault={() => {
							$puzzleStore.uploadedImage = '';
						}}
						class="block w-max mx-auto px-4 py-3 mt-2 bg-amarnath rounded-md z-10">Remove</button
					>
				{:else}
					<div
						class="flex flex-col gap-5 w-full h-full justify-center items-center relative drop-shadow-[0px_50px_45px_rgba(92,15,39,0.9)]"
					>
						<img src="/upload.svg" alt="upload" class="w-[30%]" />
						<p class="relative -left-2">Upload you own image</p>
						<input
							type="file"
							accept="image/*"
							name="uploadImage"
							class="absolute inset-0 opacity-0 cursor-pointer"
							on:change={(e) => {
								$puzzleStore.uploadedImage = URL.createObjectURL(e.target?.files[0]);
								$puzzleStore.selectedImage = $puzzleStore.uploadedImage;
							}}
						/>
					</div>
				{/if}
			</label>
			{#each availableImages as image, i (image)}
				<label
					for="availableImage-{i + 1}"
					class="relative p-2 border-2 flex flex-col justify-between rounded-md {$puzzleStore.selectedImage ===
					image
						? 'border-amarnath'
						: 'border-transparent'} hover:scale-110 duration-100 drop-shadow-[0px_50px_45px_rgba(92,15,39,0.9)]"
				>
					<CustomImage src={image} alt="availableImage-{i + 1}" classes="rounded-md" />
					<span class="flex justify-center mt-2 font-medium text-3xl text-amarnath">{i + 1}</span>
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
