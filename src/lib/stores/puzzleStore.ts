import { writable } from 'svelte/store';

export const puzzleStore = writable({
	selectedImage: '',
	pieceSize: 100,
	rows: 5,
	columns: 5,
	strokeColor: '#000',
	pieceOutline: 'rounded'
});
