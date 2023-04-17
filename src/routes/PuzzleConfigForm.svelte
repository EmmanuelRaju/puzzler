<script lang="ts">
	import { puzzleStore } from '$lib/stores/puzzleStore';
	import { fade } from 'svelte/transition';

	export let show: boolean,
		classes: string = '',
		submitFn = () => {},
		backFn = () => {};
</script>

{#if show}
	<form transition:fade={{ duration: 500 }} class={classes}>
		<div class="flex flex-col gap-14">
			<div class="form-elements">
				<h2 class="w-72 text-xl">Puzzle piece attachment style</h2>
				<label
					for="roundedOutline"
					class="relative border-2 border-dotted p-1 rounded-md {$puzzleStore.pieceOutline ===
					'rounded'
						? 'border-amarnath'
						: 'border-transparent'}"
				>
					<input
						id="roundedOutline"
						name="pieceOutline"
						type="radio"
						value="rounded"
						class="absolute inset-0 opacity-0 cursor-pointer"
						bind:group={$puzzleStore.pieceOutline}
					/>
					<div class="circle" /></label
				>
				<label
					for="triangleOutline"
					class="relative border-2 border-dotted p-1 rounded-md {$puzzleStore.pieceOutline ===
					'triangle'
						? 'border-amarnath'
						: 'border-transparent'}"
				>
					<input
						id="triangleOutline"
						name="pieceOutline"
						type="radio"
						value="triangle"
						class="absolute inset-0 opacity-0 cursor-pointer"
						bind:group={$puzzleStore.pieceOutline}
					/>
					<div class="triangle" /></label
				>
				<span class="form-element-value">{$puzzleStore.pieceOutline}</span>
			</div>
			<!-- <div class="form-elements">
				<label for="pieceSize" class="w-72">Puzzle piece size</label>
				<input
					type="range"
					name="pieceSize"
					id="pieceSize"
					min="50"
					max="150"
					step="10"
					bind:value={$puzzleStore.pieceSize}
				/>
				<span class="form-element-value">{$puzzleStore.pieceSize}px</span>
			</div> -->
			<div class="form-elements">
				<label for="rows" class="w-72 text-xl">Number of rows</label>
				<input
					type="range"
					step="1"
					min="2"
					max="10"
					bind:value={$puzzleStore.rows}
					class="accent-amarnath"
				/>
				<span class="form-element-value">{$puzzleStore.rows}</span>
			</div>
			<div class="form-elements">
				<label for="colums" class="w-72 text-xl">Number of columns</label>
				<input
					type="range"
					step="1"
					min="2"
					max="10"
					bind:value={$puzzleStore.columns}
					class="accent-amarnath"
				/>
				<span class="form-element-value">{$puzzleStore.columns}</span>
			</div>
			<!-- <div class="form-elements">
				<label for="strokeColor" class="w-72">Puzzle piece border color</label>
				<input type="color" bind:value={$puzzleStore.strokeColor} />
				<span class="form-element-value">{$puzzleStore.strokeColor}</span>
			</div> -->
			<div class="form-elements">
				<h2 class="w-72 text-xl">Puzzle piece border color</h2>
				<label
					for="blackColor"
					class="relative border-2 border-dotted p-1 rounded-md {$puzzleStore.strokeColor ===
					'black'
						? 'border-amarnath'
						: 'border-transparent'}"
				>
					<input
						id="blackColor"
						name="strokeColor"
						type="radio"
						value="black"
						class="absolute inset-0 opacity-0 cursor-pointer"
						bind:group={$puzzleStore.strokeColor}
					/>
					<div class="w-12 h-8 bg-gray-800 rounded-md" /></label
				>
				<label
					for="whiteColor"
					class="relative border-2 border-dotted p-1 rounded-md {$puzzleStore.strokeColor ===
					'white'
						? 'border-amarnath'
						: 'border-transparent'}"
				>
					<input
						id="whiteColor"
						name="strokeColor"
						type="radio"
						value="white"
						class="absolute inset-0 opacity-0 cursor-pointer"
						bind:group={$puzzleStore.strokeColor}
					/>
					<div class="w-12 h-8 bg-slate-100 rounded-md" /></label
				>
				<span class="form-element-value">{$puzzleStore.strokeColor}</span>
			</div>
		</div>
		<div class="flex gap-5 mt-14 justify-center">
			<button class="btn" on:click|preventDefault={() => backFn()}>Back</button>
			<button class="btn" on:click|preventDefault={() => submitFn()}>Next</button>
		</div>
	</form>
{/if}

<style lang="postcss">
	.form-elements {
		@apply w-full p-3 border-4 border-amarnath border-t-0 border-r-0 rounded-md flex gap-7 items-center;
	}

	.form-element-value {
		@apply border-4 border-amarnath border-b-0 border-l-0 text-amarnath p-2 font-medium rounded-md mr-0 ml-auto w-20 text-center capitalize;
	}

	.triangle {
		width: 0;
		height: 0;
		border-left: 20px solid transparent;
		border-right: 20px solid transparent;
		border-bottom: 20px solid #eb2563;
	}

	.circle {
		width: 25px;
		height: 25px;
		border-radius: 50%;
		background-color: #eb2563;
	}
</style>
