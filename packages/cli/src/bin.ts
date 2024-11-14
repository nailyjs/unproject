import { argv } from 'node:process'
import { useProgram } from './index'

useProgram().program.parse(argv)
