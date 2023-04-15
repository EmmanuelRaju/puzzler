<script lang="ts">
	import { puzzleStore } from '$lib/stores/puzzleStore';
	export let show: boolean,
		submitFn = () => {},
		backFn = () => {};
</script>

<form class={show ? '' : 'hidden'}>
	<div class="flex flex-wrap gap-5">
		<div class="form-elements">
			<label for="pieceSize">Puzzle piece size</label>
			<input
				type="range"
				name="pieceSize"
				id="pieceSize"
				min="50"
				max="150"
				step="10"
				bind:value={$puzzleStore.pieceSize}
			/>
			<span>{$puzzleStore.pieceSize}px</span>
		</div>
		<div class="form-elements">
			<label for="rows">Number of rows</label>
			<input type="range" step="1" min="5" max="10" bind:value={$puzzleStore.rows} />
			<span>{$puzzleStore.rows}</span>
		</div>
		<div class="form-elements">
			<label for="colums">Number of columns</label>
			<input type="range" step="1" min="5" max="10" bind:value={$puzzleStore.columns} />
			<span>{$puzzleStore.columns}</span>
		</div>
		<div class="form-elements">
			<label for="strokeColor">Puzzle piece border color</label>
			<input type="color" bind:value={$puzzleStore.strokeColor} />
			<span>{$puzzleStore.strokeColor}</span>
		</div>
		<div class="form-elements">
			<h2>Puzzle piece border style</h2>
			<label
				for="roundedOutline"
				class="relative border-2 p-2 rounded-md {$puzzleStore.pieceOutline === 'rounded'
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
				Rounded</label
			>
			<label
				for="triangleOutline"
				class="relative border-2 p-2 rounded-md {$puzzleStore.pieceOutline === 'triangle'
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
				Triangle</label
			>
		</div>
	</div>
	<div class="flex gap-5 mt-5 justify-center">
		<button class="btn" on:click={() => backFn()}>Back</button>
		<button class="btn" on:click={() => submitFn()}>Next</button>
	</div>
</form>

<style lang="postcss">
	.form-elements {
		@apply border-2 p-2 rounded-md flex gap-5 items-center;
	}
</style>
