import { writable } from 'svelte/store';

const initialValues = {
	selectedImage: '',
	pieceSize: 100,
	rows: 5,
	columns: 5,
	strokeColor: 'black',
	pieceOutline: 'rounded'
};

export const puzzleStore = writable(initialValues);
