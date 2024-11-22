import type { Class, Container, IocPlugin } from '@nailyjs/ioc'
import type { Key, MenuMixedOption } from 'naive-ui/es/menu/src/interface'
import type { RouteRecordRaw } from 'vue-router'
import { Options as VueOptions } from '@vitejs/plugin-vue'
import { Options as VueJsxOptions } from '@vitejs/plugin-vue-jsx'
import { VitePluginConfig } from 'unocss/vite'
import { Plugin, PluginOption } from 'vite'

export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
}

type RouteInfoImpl = Omit<RouteRecordRaw, 'component'> & {
  /** The component `absolute` file path. */
  component: string
}

export type RouteInfo = Omit<RouteInfoImpl, 'children'> & {
  children?: RouteInfo[]
}

export type MenuInfo = Partial<MenuMixedOption> & {
  children?: MenuInfo[]
  /**
   * If `labelType` is `component`, the `label` property must be a absolute `.vue` file path.
   */
  labelType?: 'component'
  /**
   * If `extraType` is `component`, the `extra` property must be a absolute `.vue` file path.
   */
  extraType?: 'component'
  /**
   * If `iconType` is `component`, the `icon` property must be a absolute `.vue` file path.
   */
  iconType?: 'component'
  key: Key
}

export type RpcController = Class
export type HljsLanguages = '1c' | 'abnf' | 'accesslog' | 'actionscript' | 'ada' | 'angelscript' | 'apache' | 'applescript' | 'arcade' | 'arduino' | 'armasm' | 'asciidoc' | 'aspectj' | 'autohotkey' | 'autoit' | 'avrasm' | 'awk' | 'axapta' | 'bash' | 'basic' | 'bnf' | 'brainfuck' | 'c' | 'cal' | 'capnproto' | 'ceylon' | 'clean' | 'clojure-repl' | 'clojure-repl.js' | 'clojure' | 'cmake' | 'coffeescript' | 'coq' | 'cos' | 'cpp' | 'crmsh' | 'crystal' | 'csharp' | 'csp' | 'css' | 'd' | 'dart' | 'delphi' | 'diff' | 'django' | 'dns' | 'dockerfile' | 'dos' | 'dsconfig' | 'dts' | 'dust' | 'ebnf' | 'elixir' | 'elm' | 'erb' | 'erlang-repl' | 'erlang-repl.js' | 'erlang' | 'excel' | 'fix' | 'flix' | 'fortran' | 'fsharp' | 'gams' | 'gauss' | 'gcode' | 'gherkin' | 'glsl' | 'gml' | 'go' | 'golo' | 'gradle' | 'graphql' | 'groovy' | 'haml' | 'handlebars' | 'haskell' | 'haxe' | 'hsp' | 'http' | 'hy' | 'inform7' | 'ini' | 'irpf90' | 'isbl' | 'java' | 'javascript' | 'jboss-cli' | 'jboss-cli.js' | 'json' | 'julia-repl' | 'julia-repl.js' | 'julia' | 'kotlin' | 'lasso' | 'latex' | 'ldif' | 'leaf' | 'less' | 'lisp' | 'livecodeserver' | 'livescript' | 'llvm' | 'lsl' | 'lua' | 'makefile' | 'markdown' | 'mathematica' | 'matlab' | 'maxima' | 'mel' | 'mercury' | 'mipsasm' | 'mizar' | 'mojolicious' | 'monkey' | 'moonscript' | 'n1ql' | 'nestedtext' | 'nginx' | 'nim' | 'nix' | 'node-repl' | 'node-repl.js' | 'nsis' | 'objectivec' | 'ocaml' | 'openscad' | 'oxygene' | 'parser3' | 'perl' | 'pf' | 'pgsql' | 'php-template' | 'php-template.js' | 'php' | 'plaintext' | 'pony' | 'powershell' | 'processing' | 'profile' | 'prolog' | 'properties' | 'protobuf' | 'puppet' | 'purebasic' | 'python-repl' | 'python-repl.js' | 'python' | 'q' | 'qml' | 'r' | 'reasonml' | 'rib' | 'roboconf' | 'routeros' | 'rsl' | 'ruby' | 'ruleslanguage' | 'rust' | 'sas' | 'scala' | 'scheme' | 'scilab' | 'scss' | 'shell' | 'smali' | 'smalltalk' | 'sml' | 'sqf' | 'sql' | 'stan' | 'stata' | 'step21' | 'stylus' | 'subunit' | 'swift' | 'taggerscript' | 'tap' | 'tcl' | 'thrift' | 'tp' | 'twig' | 'typescript' | 'vala' | 'vbnet' | 'vbscript-html' | 'vbscript-html.js' | 'vbscript' | 'verilog' | 'vhdl' | 'vim' | 'wasm' | 'wren' | 'x86asm' | 'xl' | 'xml' | 'xquery' | 'yaml' | 'zephir'
export type I18nLanguage = 'en' | 'zh-CN'

export interface IBeforeStartContext {
  /**
   * Add a vite plugin.
   *
   * @param {(PluginOption | Plugin)} plugin The vite plugin.
   * @return {this} The context.
   * @memberof IBeforeStartContext
   */
  addVitePlugin(plugin: PluginOption | Plugin): this
  /**
   * Add a general route. The route is inside the `Default` layout.
   *
   * @param {RouteInfo} route The route info. Route info `component` is the absolute file path, not the component itself.
   * @return {this} The context.
   * @memberof IBeforeStartContext
   */
  addRoute(route: RouteInfo): this
  /**
   * Add a layout route. It will be used as a layout.
   *
   * @param {RouteInfo} route The route info. Route info `component` is the absolute file path, not the component itself.
   * @return {this}
   * @memberof IBeforeStartContext
   */
  addLayoutRoute(route: RouteInfo): this
  /**
   * Add a menu.
   *
   * @param {MenuInfo} menu The menu info.
   * @return {this}
   * @memberof IBeforeStartContext
   */
  addMenu(menu: MenuInfo): this
  /**
   * Add a RPC route. The route must be marked with `@RpcController` decorator.
   *
   * @param {RpcController} route The RPC controller.
   * @return {this} The context.
   * @memberof IBeforeStartContext
   */
  addRpcRoute(route: RpcController): this
  updateUnoCSSConfig(config: VitePluginConfig): this
  getUnoCSSConfig(): VitePluginConfig
  updateVueConfig(config: VueOptions): this
  getVueConfig(): VueOptions
  updateVueJsxConfig(config: VueJsxOptions): this
  getVueJsxConfig(): VueJsxOptions
  addUnoCSSSafeList(safeList: string[]): this
  getUnoCSSSafeList(): string[]
  /**
   * Get the `naily IOC` container.
   *
   * @return {Container} The ioc container instance.
   * @memberof IBeforeStartContext
   */
  getGlobalContainer(): Container
  /**
   * Register a highlight.js language.
   *
   * Just provides the language name, the actual language module will be loaded by the plugin.
   * Please make sure it is available in the highlight.js package. If not, currently cannot be registered.
   *
   * @param {(HljsLanguages | (string & {}))} language The language name.
   * @param {`highlight.js/lib/languages/${HljsLanguages}` | (string & {})} importSpecifier The import specifier. If not provided, will use `highlight.js/lib/languages/${language}`.
   * @return {this}
   * @memberof IBeforeStartContext
   */
  registerHljsLanguage<Language extends (HljsLanguages | (string & {}))>(
    language: Language,
    importSpecifier?: `highlight.js/lib/languages/${Language}` | (string & {})
  ): this
  /**
   * Get uncli.yml configuration.
   *
   * @param {boolean} [cache=true] Whether to cache the configuration.
   * @return {DeepPartial<Configuration.Config>}
   * @memberof IBeforeStartContext
   */
  getConfiguration(cache?: boolean): DeepPartial<Configuration.Config>
  setI18nMessage<Key extends string>(lang: I18nLanguage | (string & {}), key: Key, value: string): this
  getI18nMessage<Key extends string>(lang: I18nLanguage | (string & {}), key: Key): string | undefined
  mergeI18nMessage(lang: I18nLanguage | (string & {}), messages: Record<string, any>): this
}

export interface UnProjectPlugin extends IocPlugin {
  beforeStartServer?(context: IBeforeStartContext): Promise<void>
}

export namespace Configuration {
  export interface Plugin {
    specifier: string
    options?: any
  }
  export interface Config {
    plugins: Plugin[]
    i18n: Record<I18nLanguage | (string & {}), Record<string, string>>
  }
}
