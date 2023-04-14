<script lang="ts">
	import Cropper from 'cropperjs';
	import 'cropperjs/dist/cropper.css';
	import { onMount } from 'svelte';

	let image: HTMLImageElement;
	let cropper: Cropper;
	onMount(() => {
		callCropper();
	});
	const callCropper = () => {
		// setTimeout(() => {
		// }, 1000);
		cropper = new Cropper(image, {
			dragMode: 'move',
			restore: false,
			guides: false,
			center: false,
			highlight: false,
			cropBoxMovable: true,
			cropBoxResizable: false,
			toggleDragModeOnDblclick: false,
			ready() {
				cropper.setCropBoxData({ height: 500, width: 500 });
			}
		});

		console.log('CALLED');
		return;
	};

	const cropImage = () => {
		let dataUrl = cropper.getCroppedCanvas().toDataURL('image/webp', 1);
		const newImg = document.createElement('img');
		// const url = URL.createObjectURL(blob);

		newImg.src = dataUrl;
		document.body.appendChild(newImg);
	};
</script>

<div class="max-w-5xl mx-auto">
	<img
		bind:this={image}
		src="/scenery-1.webp"
		alt="scenery"
		class="block max-w-full cropper-hidden"
	/>
</div>

<button on:click={() => cropImage()}>download</button>
