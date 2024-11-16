import path from 'node:path'
import { cwd } from 'node:process'
import { NodePlopAPI } from 'plop'

export default function (plop: NodePlopAPI) {
  plop.setGenerator('unproject-plugin', {
    description: 'Create a new unproject plugin',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of the plugin?',
      },
    ],
    actions: [
      {
        type: 'addMany',
        base: './generators/plugin',
        templateFiles: './generators/plugin/**/*.hbs',
        destination: path.join(cwd(), 'packages/{{name}}'),
      },
    ],
  })
}
