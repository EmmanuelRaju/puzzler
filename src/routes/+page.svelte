<script lang="ts">
	import { onMount } from 'svelte';
	import Initial from './initial.svelte';

	let playerName: string = '';
	let nameDialogBox: HTMLDialogElement;
	let imageDialogBox: HTMLDialogElement;

	let availableImages: string[] = [
		'/scenery-1.webp',
		'/scenery-2.webp',
		'/scenery-3.webp',
		'/scenery-4.webp',
		'/scenery-5.webp',
		'/scenery-6.webp'
	];

	let selectedImage: string;
	let showPuzzle: boolean = false;

	onMount(() => {
		let puzzler = localStorage.getItem('puzzler');
		if (puzzler) {
			puzzler = JSON.parse(puzzler);
			if (puzzler?.name) {
				playerName = puzzler?.name;
			}
		}

		if (!playerName) {
			nameDialogBox.showModal();
		}
	});
</script>

<dialog bind:this={nameDialogBox} class="backdrop:bg-black p-10" on:cancel|preventDefault>
	<form
		method="dialog"
		on:submit={() => localStorage.setItem('puzzler', JSON.stringify({ name: playerName }))}
	>
		<h2>Hello there! What do we call you?</h2>
		<input
			type="text"
			id="playerName"
			placeholder="Enter name"
			bind:value={playerName}
			class="mt-5 p-2"
		/>
		<button type="submit" disabled={!playerName} class="block mt-5 btn mx-auto">Let me in</button>
	</form>
</dialog>

{#if playerName}
	<section class="p-10">
		<h1>Hello {playerName}! <br /> What are you upto today?</h1>
		<button class="btn" on:click={() => imageDialogBox.showModal()}>choose puzzle</button>
	</section>
{/if}

<dialog
	bind:this={imageDialogBox}
	class="backdrop:bg-black p-10"
	on:submit={() => (showPuzzle = true)}
>
	<form method="dialog">
		<h2>Select image</h2>
		<div class="flex gap-5 mt-5 flex-wrap">
			{#each availableImages as image, i (image)}
				<label
					for="availableImage-{i + 1}"
					class="relative border-2 p-2 {selectedImage === image
						? 'border-blue-600'
						: 'border-transparent'}"
				>
					<span class="flex justify-center">Scenery {i + 1}</span>
					<img src={image} alt="availableImage-{i + 1}" class="h-28" />
					<input
						type="radio"
						name="selectedImage"
						id="availableImage-{i + 1}"
						class="absolute inset-0 opacity-0 cursor-pointer"
						value={image}
						bind:group={selectedImage}
					/>
				</label>
			{/each}
		</div>
		<button type="submit" disabled={!selectedImage} class="block mt-5 btn mx-auto"
			>Let's play</button
		>
	</form>
</dialog>

{#if showPuzzle}
	<Initial bind:imageInput={selectedImage} />
{/if}

<style lang="postcss">
	.btn {
		@apply p-2 border-2 border-blue-600 rounded-md disabled:bg-slate-500 disabled:border-none;
	}
</style>
