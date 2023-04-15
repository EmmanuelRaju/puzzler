<script lang="ts">
	import { onMount } from 'svelte';
	import Cropper from 'cropperjs';
	import 'cropperjs/dist/cropper.css';
	import Puzzle from './Puzzle.svelte';
	import { puzzleStore } from '$lib/stores/puzzleStore';
	import PuzzleConfigForm from './PuzzleConfigForm.svelte';
	import { fade } from 'svelte/transition';
	import CustomImage from './CustomImage.svelte';

	let playerName: string = 'stranger';
	let nameDialogBox: HTMLDialogElement;
	let cropImageDialogBox: HTMLDialogElement;
	let cropper: Cropper;
	let croppedImage: string;
	let cropperInputImage: HTMLImageElement;

	let availableImages: string[] = [
		'/scenery-1.webp',
		'/scenery-2.webp',
		'/scenery-3.webp',
		'/scenery-4.webp',
		'/scenery-5.webp',
		'/scenery-6.webp',
		'/emm.webp'
	];

	let showOptions: boolean = true;
	let showPuzzle: boolean = false;
	let showSelectPuzzle: boolean = false;
	let showPuzzleConfigForm: boolean = false;
	let showCropImage: boolean = false;

	const callCropper = () => {
		cropper = new Cropper(cropperInputImage, {
			dragMode: 'move',
			restore: false,
			guides: false,
			center: false,
			highlight: false,
			cropBoxMovable: true,
			cropBoxResizable: false,
			toggleDragModeOnDblclick: false,
			ready() {
				cropper.setCropBoxData({
					height: $puzzleStore.pieceSize * $puzzleStore.rows,
					width: $puzzleStore.pieceSize * $puzzleStore.columns
				});
			}
		});

		return;
	};
	const cropImage = () => {
		croppedImage = cropper
			.getCroppedCanvas({
				height: $puzzleStore.pieceSize * $puzzleStore.rows,
				width: $puzzleStore.pieceSize * $puzzleStore.columns
			})
			.toDataURL('image/webp', 1);
		return;
	};

	const staggeredCall = (func: Function, timeout: number) => {
		setTimeout(func, timeout);
	};

	onMount(() => {
		let puzzler = localStorage.getItem('puzzler');
		if (puzzler) {
			puzzler = JSON.parse(puzzler);
			//@ts-ignore
			if (puzzler?.name) {
				//@ts-ignore
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

{#if showOptions}
	<section class="p-10" transition:fade={{ duration: 500 }}>
		<h1>Hello <span class="capitalize">{playerName}!</span> <br /> What are you upto today?</h1>
		<div class="flex gap-5 mt-5">
			<button
				class="btn"
				on:click={() => {
					showOptions = false;
					staggeredCall(() => (showSelectPuzzle = true), 500);
				}}>Choose</button
			>
			<button class="btn">Create</button>
			<button class="btn">Contend</button>
		</div>
	</section>
{/if}

{#if showSelectPuzzle}
	<form
		class="flex flex-col gap-10"
		transition:fade={{ duration: 500 }}
		on:submit|preventDefault={() => {
			showSelectPuzzle = false;
			staggeredCall(() => (showPuzzleConfigForm = true), 500);
		}}
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
			<button
				class="btn"
				on:click|preventDefault={() => {
					showSelectPuzzle = false;
					staggeredCall(() => (showOptions = true), 500);
				}}>Back</button
			>
			<button type="submit" class="btn">Next</button>
		</div>
	</form>
{/if}

<PuzzleConfigForm
	bind:show={showPuzzleConfigForm}
	submitFn={() => {
		callCropper();
		showPuzzleConfigForm = false;
		showCropImage = true;
		cropImageDialogBox.show();
	}}
	backFn={() => {
		showPuzzleConfigForm = false;
		showSelectPuzzle = true;
	}}
/>

<dialog bind:this={cropImageDialogBox} transition:fade={{ duration: 500 }}>
	<form
		method="dialog"
		on:submit|preventDefault={() => {
			cropImage();
			cropImageDialogBox.close();
			showPuzzle = true;
		}}
	>
		<div class="max-w-4xl mx-auto">
			<img
				bind:this={cropperInputImage}
				src={$puzzleStore.selectedImage}
				alt="puzzleImage"
				class="block max-w-full cropper-hidden"
			/>
		</div>
		<div class="flex gap-5 mt-5 justify-center">
			<button
				on:click|preventDefault={() => {
					showCropImage = false;
					showPuzzleConfigForm = true;
				}}
			>
				Back
			</button>
			<button class="btn">Crop</button>
		</div>
	</form>
</dialog>

{#if showPuzzle}
	<Puzzle
		imageInput={croppedImage}
		rows={$puzzleStore.rows}
		columns={$puzzleStore.columns}
		pieceSize={$puzzleStore.pieceSize}
		strokeColor={$puzzleStore.strokeColor}
		pieceOutline={$puzzleStore.pieceOutline}
	/>
{/if}
