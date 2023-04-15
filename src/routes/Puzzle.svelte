<script lang="ts">
	// import headbreaker from 'headbreaker';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	export let imageInput: any,
		rows: number,
		columns: number,
		pieceSize: number,
		strokeColor: string,
		pieceOutline: string;

	let canvasWidth: number, canvasHeight: number;

	onMount(() => {
		canvasWidth = window.innerWidth - 100;
		canvasHeight = rows * pieceSize + 100;
		createPuzzle(imageInput);
	});

	let createPuzzle = (imgSrc: any = '') => {
		let img = new Image();

		if (!imgSrc) {
			img.src = '/scenery-1.webp';
		} else {
			img.src = imgSrc;
		}

		let puzzleDiameter: number;

		if (columns >= 8 && rows < 7) {
			if (columns === 10) {
				puzzleDiameter = 7 * pieceSize + 10;
			} else {
				puzzleDiameter = 6 * pieceSize + 15;
			}
		} else {
			puzzleDiameter = rows * pieceSize + 15;
		}

		img.onload = () => {
			//@ts-ignore
			const puzzleInstance = new headbreaker.Canvas('puzzle', {
				width: canvasWidth,
				height: canvasHeight,
				pieceSize: pieceSize,
				proximity: 20,
				borderFill: 10,
				strokeWidth: 1.0,
				lineSoftness: 0.18,
				image: img,
				strokeColor: strokeColor,
				//@ts-ignore
				outline: pieceOutline === 'rounded' ? new headbreaker.outline.Rounded() : '',
				preventOffstageDrag: true,
				fixed: true,
				puzzleDiameter: puzzleDiameter
			});
			puzzleInstance.adjustImagesToPuzzleHeight();

			puzzleInstance.autogenerate({
				//@ts-ignore
				insertsGenerator: headbreaker.generators.flipflop,
				horizontalPiecesCount: columns,
				verticalPiecesCount: rows
			});

			puzzleInstance.shuffle(0.7);
			puzzleInstance.draw();
			puzzleInstance.attachSolvedValidator();
			puzzleInstance.onValid(() => {
				setTimeout(() => {
					alert('completed');
				}, 1000);
			});
		};
	};
</script>

<div id="puzzle" class="border-4 my-10 mx-auto w-max" transition:fade={{ duration: 500 }} />
