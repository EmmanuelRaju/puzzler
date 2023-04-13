<script lang="ts">
	// import headbreaker from 'headbreaker';
	import { onMount } from 'svelte';

	export let imageInput: any;

	onMount(() => {
		createPuzzle(imageInput);
	});

	$: {
		console.log('image input', imageInput);
		if (imageInput) {
			createPuzzle(imageInput);
		}
	}

	let createPuzzle = (imgSrc: any = '') => {
		let img = new Image();

		if (!imgSrc) {
			img.src = '/scenery-1.jpg';
		} else {
			img.src = imgSrc;
		}

		let canvasWidth: number = 500,
			canvasHeight: number = 500;

		let puzzleWidth: number = 400,
			puzzleHeight: number = 400;

		let imgWidth: number,
			imgHeight: number,
			rows: number,
			columns: number,
			pieceSize: number = 100,
			scaleX: number,
			scaleY: number,
			imgType: 'landscape' | 'portrait';

		img.onload = () => {
			imgWidth = img.naturalWidth;
			imgHeight = img.naturalHeight;

			imgWidth >= imgHeight ? (imgType = 'landscape') : (imgType = 'portrait');

			// debugger;

			if (imgType === 'portrait') {
				if (imgHeight > puzzleHeight) {
					scaleY = Math.round(imgHeight / puzzleHeight);
					imgHeight = puzzleHeight;
					imgWidth = Math.round(imgWidth / scaleY);
				}
			} else if (imgType === 'landscape') {
				if (imgWidth > puzzleWidth) {
					scaleX = Math.round(imgWidth / puzzleWidth);
					imgWidth = puzzleWidth;
					imgHeight = Math.round(imgHeight / scaleX);
				}
			}

			const adjustPicture = () => {
				let heightDiff = imgHeight % pieceSize;
				let widthDiff = imgWidth % pieceSize;

				if (heightDiff !== 0) {
					if (imgHeight + heightDiff > puzzleHeight) {
						imgHeight = Math.floor(imgHeight / pieceSize);
						console.log('imgHeight', imgHeight);
					} else {
						imgHeight = imgHeight + heightDiff;
						console.log('imgHeight', imgHeight);
					}
				}

				if (widthDiff !== 0) {
					if (imgWidth + widthDiff > puzzleWidth) {
						imgWidth = Math.floor(imgWidth / pieceSize);
					} else {
						imgWidth = imgWidth + widthDiff;
					}
				}

				rows = Math.floor(imgWidth / pieceSize);
				columns = Math.floor(imgHeight / pieceSize);
				return;
			};

			adjustPicture();

			const autogen = new headbreaker.Canvas('puzzle', {
				width: canvasWidth,
				height: canvasHeight,
				pieceSize: pieceSize,
				proximity: 20,
				borderFill: 10,
				strokeWidth: 1.5,
				lineSoftness: 0.18,
				image: img,
				outline: new headbreaker.outline.Rounded(),
				preventOffstageDrag: true,
				fixed: true
			});

			if (imgType === 'portrait') {
				console.log('here in portrait');
				autogen.adjustImagesToPuzzleHeight();
				// autogen.adjustImagesToPuzzleWidth();
			} else {
				console.log('here in landscape');
				// autogen.adjustImagesToPuzzleWidth();
				autogen.adjustImagesToPuzzleHeight();
			}
			autogen.autogenerate({
				insertsGenerator: headbreaker.generators.flipflop,
				horizontalPiecesCount: 5,
				verticalPiecesCount: 5
			});

			// autogen.shuffle(0.7);
			autogen.draw();
		};
	};
</script>

<div id="puzzle" class="border-4 my-10 mx-auto w-max" />
