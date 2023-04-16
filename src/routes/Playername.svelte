<script lang="ts">
	export let playerName: string;
</script>

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
