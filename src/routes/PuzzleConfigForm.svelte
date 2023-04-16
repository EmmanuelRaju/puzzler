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
		<div class="flex flex-col gap-10">
			<div class="form-elements">
				<label for="pieceSize" class="w-52">Puzzle piece size</label>
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
			</div>
			<div class="form-elements">
				<label for="rows" class="w-52">Number of rows</label>
				<input type="range" step="1" min="5" max="10" bind:value={$puzzleStore.rows} />
				<span class="form-element-value">{$puzzleStore.rows}</span>
			</div>
			<div class="form-elements">
				<label for="colums" class="w-52">Number of columns</label>
				<input type="range" step="1" min="5" max="10" bind:value={$puzzleStore.columns} />
				<span class="form-element-value">{$puzzleStore.columns}</span>
			</div>
			<div class="form-elements">
				<label for="strokeColor" class="w-52">Puzzle piece border color</label>
				<input type="color" bind:value={$puzzleStore.strokeColor} />
				<span class="form-element-value">{$puzzleStore.strokeColor}</span>
			</div>
			<div class="form-elements">
				<h2 class="w-52">Puzzle piece border style</h2>
				<label
					for="roundedOutline"
					class="relative border-2 p-1 rounded-md {$puzzleStore.pieceOutline === 'rounded'
						? 'border-blue-600'
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
					class="relative border-2 p-1 rounded-md {$puzzleStore.pieceOutline === 'triangle'
						? 'border-blue-600'
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
			</div>
		</div>
		<div class="flex gap-5 mt-10 justify-center">
			<button class="btn" on:click|preventDefault={() => backFn()}>Back</button>
			<button class="btn" on:click|preventDefault={() => submitFn()}>Next</button>
		</div>
	</form>
{/if}

<style lang="postcss">
	.form-elements {
		@apply w-full border-2 p-3 border-dotted rounded-md flex gap-5 items-center;
	}

	.form-element-value {
		@apply bg-gray-200 p-2 font-medium rounded-md mr-0 ml-auto w-20 text-center;
	}

	.triangle {
		width: 0;
		height: 0;
		border-left: 20px solid transparent;
		border-right: 20px solid transparent;

		border-bottom: 20px solid blue;
	}

	.circle {
		width: 25px;
		height: 25px;
		border-radius: 50%;
		background-color: blue;
	}
</style>
