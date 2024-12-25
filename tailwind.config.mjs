/** @type {import('tailwindcss').Config} */
module.exports = {
	theme: {
	  extend: {
		colors: {
		  background: '#f7f7f7', // Light gray background
		  buttonOrange: '#ff7f0e', // Custom orange
		  buttonOrangeHover: '#e67300', // Darker orange for hover
		},
	  },
	},
	content: ['./src/**/*.{js,ts,jsx,tsx}'],
	plugins: [],
  };
	  