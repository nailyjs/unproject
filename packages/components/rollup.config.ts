import { exec } from 'node:child_process'
import { stderr, stdout } from 'node:process'
import NodeResolve from '@rollup/plugin-node-resolve'
import swc from '@rollup/plugin-swc'
import { defineConfig } from 'rollup'
import PostCSS from 'rollup-plugin-postcss'
import UnoCSS from 'unocss/postcss'
import Vue from 'unplugin-vue/rollup'
import unoConfig from './uno.config.ts'

function generateDts() {
  console.log('Type checking & generate d.ts...')
  const child_process = exec('vue-tsc -p tsconfig.build.json')
  child_process.stdout?.pipe(stdout)
  child_process.stderr?.pipe(stderr)
  child_process.on('exit', () => console.log('Type checking & generate d.ts is done!'))
}
generateDts()

export default defineConfig({
  input: {
    index: 'src/index.ts',
  },

  external: (id) => {
    if (/style-inject/.test(id)) return false
    if (/node_modules/.test(id)) return true
  },

  plugins: [
    NodeResolve({
      extensions: ['.mjs', '.js', '.json', '.node', '.ts', '.tsx', '.vue'],
    }),

    Vue(),

    PostCSS({
      exclude: [],
      extract: true,
      plugins: [
        UnoCSS({
          configOrPath: unoConfig,
        }),
      ],
    }),

    swc({
      swc: {
        jsc: {
          parser: {
            syntax: 'typescript',
            decorators: true,
            tsx: true,
          },
          transform: {
            legacyDecorator: true,
            decoratorMetadata: true,
          },
        },
      },
    }),

    {
      name: 'watch',
      watchChange() {
        generateDts()
      },
    },
  ],

  output: [
    {
      format: 'cjs',
      dir: 'dist',
      sourcemap: true,
      entryFileNames: '[name].cjs',
    },
    {
      format: 'esm',
      dir: 'dist',
      sourcemap: true,
      entryFileNames: '[name].js',
    },
  ],
},
)
