<script lang="ts">
	import { onMount } from 'svelte';
	import Cropper from 'cropperjs';
	import 'cropperjs/dist/cropper.css';
	import Puzzle from './Puzzle.svelte';
	import { puzzleStore } from '$lib/stores/puzzleStore';
	import PuzzleConfigForm from './PuzzleConfigForm.svelte';
	import { fade } from 'svelte/transition';
	import Playername from './Playername.svelte';
	import SelectPuzzleForm from './SelectPuzzleForm.svelte';
	import CropImage from './CropImage.svelte';

	let playerName: string = 'stranger';
	let nameDialogBox: HTMLDialogElement;
	let cropImageDialogBox: HTMLDialogElement;
	let cropper: Cropper;
	let croppedImage: string;
	let cropperInputImage: HTMLImageElement;

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

		if (!playerName || playerName === 'stranger') {
			nameDialogBox.showModal();
		}
	});
</script>

<dialog bind:this={nameDialogBox} class="backdrop:bg-black p-10" on:cancel|preventDefault>
	<Playername bind:playerName />
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

<SelectPuzzleForm
	bind:show={showSelectPuzzle}
	submitFn={() => {
		showSelectPuzzle = false;
		staggeredCall(() => (showPuzzleConfigForm = true), 500);
	}}
	backFn={() => {
		showSelectPuzzle = false;
		staggeredCall(() => (showOptions = true), 500);
	}}
/>

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
	<CropImage
		bind:cropperInputImage
		submitFn={() => {
			cropImage();
			cropImageDialogBox.close();
			showPuzzle = true;
		}}
		backFn={() => {
			showCropImage = false;
			showPuzzleConfigForm = true;
		}}
	/>
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
