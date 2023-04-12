<script lang="ts">
	import { stringify } from 'postcss';
	import { onMount } from 'svelte';

	let playerName: string = '';
	let dialogBox: HTMLDialogElement;

	onMount(() => {
		let puzzler = localStorage.getItem('puzzler');
		if (puzzler) {
			puzzler = JSON.parse(puzzler);
			if (puzzler?.name) {
				playerName = puzzler?.name;
			}
		}

		if (!playerName) {
			dialogBox.showModal();
		}
	});
</script>

<dialog bind:this={dialogBox} class="backdrop:bg-black p-10" on:cancel|preventDefault>
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
		<button class="btn">Play</button>
		<button class="btn">Create</button>
		<button class="btn">Contend</button>
	</section>
{/if}

<style lang="postcss">
	.btn {
		@apply p-2 border-2 border-blue-600 rounded-md;
	}
</style>
