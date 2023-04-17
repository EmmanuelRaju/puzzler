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

	let playerName: string = '';
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

	let finalImageDialogBox: HTMLDialogElement;

	let initialValues = {
		selectedImage: '',
		pieceSize: 100,
		rows: 5,
		columns: 5,
		strokeColor: 'black',
		pieceOutline: 'rounded'
	};

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
			modal: true,
			ready() {
				window.scrollTo(0, 0);
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

		cropper.destroy();
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

<h1 class="text-8xl text-center font-black text-amarnath font-rapier_hollow_italic">PUZZLER</h1>

<dialog
	bind:this={nameDialogBox}
	class="backdrop:bg-black p-10 bg-black text-white"
	on:cancel|preventDefault
>
	<Playername bind:playerName />
</dialog>

{#if showOptions}
	<section class="flex flex-col items-center mt-10 gap-5" transition:fade={{ duration: 500 }}>
		<h2 class="text-4xl capitalize">Hello {playerName || 'stranger'}!</h2>
		<h3 class="text-3xl">Ready to play?</h3>
		<div class="flex gap-5 p-5 mt-5">
			<div class="option-container">
				<button
					class="btn"
					on:click={() => {
						showOptions = false;
						staggeredCall(() => (showSelectPuzzle = true), 500);
					}}>Choose puzzle</button
				>
				<!-- <p class="option-description">
					Choose from various images and craft it as per your quotient
				</p> -->
			</div>
			<!-- <div class="option-container">
				<button class="btn">Create</button>
				<p class="option-description">
					Upload your own image or create one using DALL-E (AI image generation from prompts)
				</p>
			</div>
			<div class="option-container">
				<button class="btn">Contend</button>
				<p class="option-description">
					Contend with challengers and rise above ranks (Keep the CODE handy)
				</p>
			</div>
		</div> -->
		</div>
	</section>
{/if}

{#if showSelectPuzzle}
	<section class="flex flex-col items-center mt-10 gap-5" transition:fade={{ duration: 500 }}>
		<h2 class="text-4xl capitalize">Pick one</h2>
		<!-- <h3 class="text-3xl">Select puzzle</h3> -->
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
	</section>
{/if}

{#if showPuzzleConfigForm}
	<section class="flex flex-col items-center mt-10 gap-10" transition:fade={{ duration: 500 }}>
		<h2 class="text-4xl">Configure your puzzle</h2>
		<PuzzleConfigForm
			bind:show={showPuzzleConfigForm}
			submitFn={() => {
				callCropper();
				showPuzzleConfigForm = false;
				cropImageDialogBox.show();
				staggeredCall(() => (showCropImage = true), 500);
			}}
			backFn={() => {
				showPuzzleConfigForm = false;
				showSelectPuzzle = true;
			}}
		/>
	</section>
{/if}

<div class={showCropImage ? '' : 'opacity-0'}>
	<dialog bind:this={cropImageDialogBox} class="bg-black">
		<CropImage
			bind:cropperInputImage
			submitFn={() => {
				cropImage();
				cropImageDialogBox.close();
				staggeredCall(() => (showPuzzle = true), 500);
			}}
			backFn={() => {
				cropper.destroy();
				cropImageDialogBox.close();
				staggeredCall(() => (showPuzzleConfigForm = true), 500);
			}}
		/>
	</dialog>
</div>

{#if showPuzzle}
	<section class="flex flex-col items-center mt-10 gap-10" transition:fade={{ duration: 500 }}>
		<h2 class="text-4xl">Let's play</h2>
		<div class="flex gap-5 my-5 justify-center">
			<button on:click={() => finalImageDialogBox.showModal()} class="btn">Peek at solution</button>
			<button
				on:click={() => {
					showPuzzle = false;
					staggeredCall(() => (showOptions = true), 500);
					puzzleStore.set(initialValues);
				}}
				class="btn">Back to menu</button
			>
		</div>

		<Puzzle
			imageInput={croppedImage}
			rows={$puzzleStore.rows}
			columns={$puzzleStore.columns}
			pieceSize={$puzzleStore.pieceSize}
			strokeColor={$puzzleStore.strokeColor}
			pieceOutline={$puzzleStore.pieceOutline}
		/>

		<dialog
			bind:this={finalImageDialogBox}
			class="bg-black absolute inset-0 drop-shadow-[0px_50px_45px_rgba(92,15,39,0.9)] p-10 rounded-md w-[100vh] h-[100vh]"
		>
			<img src={croppedImage} alt="final" class="mx-auto" />
			<button on:click={() => finalImageDialogBox.close()} class="btn flex mx-auto mt-14"
				>Close</button
			>
		</dialog>
	</section>
{/if}

<style lang="postcss">
	.option-container {
		@apply p-3 flex flex-col items-center gap-5 border-x-4 border-dotted;
	}

	.option-container:first-child {
		@apply border-l-0;
	}

	.option-container:last-child {
		@apply border-r-0;
	}

	.option-description {
		@apply italic max-w-sm text-center;
	}
</style>
