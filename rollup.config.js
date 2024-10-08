import resolve    from '@rollup/plugin-node-resolve'
import commonjs   from '@rollup/plugin-commonjs'
import terser     from '@rollup/plugin-terser';


export default [
	// browser-friendly UMD build
	{
		input: 'src/main.js',
		output: {
			name: 'pager',
			file: 'dist/pager.umd.js',
            globals : { '@peter.naydenov/stack' : 'stack'},
			format: 'umd'
		},
		plugins: [
			resolve(), // so Rollup can find `ms`
			commonjs() // so Rollup can convert `ms` to an ES module
			, terser()
		]
	},

	// CommonJS (for Node) and ES module (for bundlers) build.
	// (We could have three entries in the configuration array
	// instead of two, but it's quicker to generate multiple
	// builds from a single configuration where possible, using
	// an array for the `output` option, where we can specify
	// `file` and `format` for each target)
	{
		input: 'src/main.js',
        external: ['@peter.naydenov/stack'],
		output: [
			{ file: 'dist/pager.cjs'    , format: 'cjs' },
			{ file: 'dist/pager.esm.mjs', format: 'es' }
		],
		plugins: [ terser() ]
	}
];