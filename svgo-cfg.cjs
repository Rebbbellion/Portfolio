module.exports = {
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          removeViewBox: false,
        },
      },
    },
	'removeOffCanvasPaths',
	'removeRasterImages',
	'removeScriptElement',
	'removeStyleElement',
	'reusePaths',
    'convertStyleToAttrs',
    'removeDimensions',
    {
      name: 'removeAttrs',
      params: {
        attrs: '(fill.*|stroke.*|clip.*)',
      },
    },
    {
      name: 'addAttributesToSVGElement',
      params: {
        attribute: 'preserveAspectRatio="xMidYMid slice"',
      },
    },
  ],
};
