const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			fontFamily: {
				warfare: ['warfare', 'sans-serif'],
				rapier: ['rapier', 'sans-serif'],
				rapier_hollow: ['rapier-hollow', 'sans-serif'],
				rapier_hollow_italic: ['rapier-hollow-italic', 'sans-serif'],
				tamba: ['tamba', 'sans-serif']
			},
			colors: {
				amarnath: '#EB2563'
			}
		}
	},

	plugins: []
};

module.exports = config;
