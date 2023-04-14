<script lang="ts">
	import { onMount } from 'svelte';
	import Initial from './initial.svelte';
	import Cropper from 'cropperjs';
	import 'cropperjs/dist/cropper.css';

	let playerName: string = '';
	let nameDialogBox: HTMLDialogElement;
	let imageDialogBox: HTMLDialogElement;
	let cropImageDialogBox: HTMLDialogElement;
	let cropper: Cropper;
	let cropperInputImage: HTMLImageElement;

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
	let pieceSize: number = 100,
		rows: number = 5,
		columns: number = 5;

	const callCropper = () => {
		cropper = new Cropper(cropperInputImage, {
			dragMode: 'move',
			modal: true,
			restore: false,
			guides: false,
			center: false,
			highlight: false,
			cropBoxMovable: true,
			cropBoxResizable: false,
			toggleDragModeOnDblclick: false,
			ready() {
				cropper.setCropBoxData({ height: pieceSize * rows, width: pieceSize * columns });
			}
		});

		console.log('CALLED');
		return;
	};
	const cropImage = () => {
		let dataUrl = cropper
			.getCroppedCanvas({ height: pieceSize * rows, width: pieceSize * columns })
			.toDataURL('image/webp', 1);
		const newImg = document.createElement('img');
		// const url = URL.createObjectURL(blob);

		newImg.src = dataUrl;
		document.body.appendChild(newImg);
	};

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
	class="backdrop:bg-black p-10 rounded-md"
	on:submit={() => {
		cropImageDialogBox.showModal();
		callCropper();
	}}
>
	<form method="dialog" class="flex flex-col gap-10">
		<div class="border-2 p-2 rounded-md">
			<h2>Select image</h2>
			<div class="mt-5 flex gap-5 flex-wrap">
				{#each availableImages as image, i (image)}
					<label
						for="availableImage-{i + 1}"
						class="relative border-2 p-2 rounded-md {selectedImage === image
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
							required
						/>
					</label>
				{/each}
			</div>
		</div>
		<div class="flex justify-between flex-wrap gap-5">
			<div class="selectPuzzle-form-elements">
				<label for="pieceSize">Puzzle piece size</label>
				<input
					type="range"
					name="pieceSize"
					id="pieceSize"
					min="50"
					max="150"
					step="10"
					bind:value={pieceSize}
				/>
				<span>{pieceSize}</span>
			</div>
			<div class="selectPuzzle-form-elements">
				<label for="rows">Number of rows</label>
				<input type="range" step="1" min="5" max="10" bind:value={rows} />
				<span>{rows}</span>
			</div>
			<div class="selectPuzzle-form-elements">
				<label for="colums">Number of columns</label>
				<input type="range" step="1" min="5" max="10" bind:value={columns} />
				<span>{columns}</span>
			</div>
		</div>
		<button type="submit" class="block mt-5 btn mx-auto">Next</button>
	</form>
</dialog>

<dialog bind:this={cropImageDialogBox}>
	<div class="max-w-5xl mx-auto">
		<img
			bind:this={cropperInputImage}
			src={selectedImage}
			alt="puzzleImage"
			class="block max-w-full cropper-hidden"
		/>
	</div>
	<button
		on:click={() => {
			cropImage();
			cropImageDialogBox.close();
		}}>Crop</button
	>
</dialog>

<!-- {#if showPuzzle}
	<Initial bind:imageInput={selectedImage} />
{/if} -->

<style lang="postcss">
	.btn {
		@apply p-2 border-2 border-blue-600 rounded-md disabled:bg-slate-500 disabled:border-none;
	}

	.selectPuzzle-form-elements {
		@apply border-2 p-2 rounded-md flex gap-5 items-center;
	}
</style>
