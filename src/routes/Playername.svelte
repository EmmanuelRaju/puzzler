<script lang="ts">
	export let playerName: string;
</script>

<form
	method="dialog"
	on:submit={() => localStorage.setItem('puzzler', JSON.stringify({ name: playerName }))}
	class="flex flex-col gap-10 items-center"
>
	<h2 class="text-6xl">Hello there!</h2>
	<h3 class="text-3xl">What do we call you?</h3>

	<input
		type="text"
		id="playerName"
		placeholder="Enter name"
		bind:value={playerName}
		class="mt-5 p-2 text-white bg-transparent border-4 border-amarnath border-t-0 border-r-0 rounded-md text-xl w-full text-center"
		required
	/>
	<button type="submit" class="block mt-5 btn mx-auto">Let me in</button>
</form>
