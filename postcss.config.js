const postcssImport = require('postcss-import')
const postcssNesting = require('postcss-nesting');
const tailwindcssNesting = require('tailwindcss/nesting');
const tailwindcssPostcssNesting = tailwindcssNesting(postcssNesting);
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');

module.exports = {
  plugins: [
    postcssImport,
    tailwindcssPostcssNesting,
    tailwindcss,
    autoprefixer
  ],
};
