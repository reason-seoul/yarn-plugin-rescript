# yarn-plugin-rescript


[Yarn (berry)](https://github.com/yarnpkg/berry) based 3rd-party toolchain for [ReScript](https://rescript-lang.org) projects

----

**🚧 This plugin is quite experimental. Be careful to use in real projects.**

Any feedbacks are welcome!

----

## Features

- Easy to go ReScript project setup
- Interoperability with Plug'n'Play modules (auto unplug for ReScript dependencies)
- Automatic bsconfig management
- Workspaces support

## Installation

Berry requires per-project activation. Please see the [guide](https://yarnpkg.com/getting-started/install#per-project-install) for detail

```bash
# To bootstrap a new project (e.g. my-rescript-project)
mkdir my-rescript-project

# Init Yarn & Berry
yarn init -y
yarn set version berry

# Import yarn-plugin-rescript
# See the releases page
yarn plugin import https://github.com/reason-seoul/yarn-plugin-rescript/releases/download/v0.0.0-da87589/plugin-rescript.js

# Init ReScript using command
yarn res init
```

See the [releases](https://github.com/reason-seoul/yarn-plugin-rescript/releases) page to check available versions

## Usage

Run `yarn res [command] --help` for more detail.

### Initialize project

Initialize ReScript for the current workspace. It will automatically install 'rescript' package, and generate `bsconfig.json`. It will also install React and genType as you specify.

Examples:
```txt
Install rescript, generate bsconfig.json
  $ yarn res init

Install rescript, generate bsconfig.json, prefer ES Modules output
  $ yarn res init --module=es6

Install rescript and @rescript/react, generate bsconfig.json with jsx setting
  $ yarn res init --with-react

Install rescript and gentype, generate bsconfig.json with gentype setting
  $ yarn res init --with-gentype

Install rescript and gentype, generate bsconfig.json with gentype (TypeScript) setting
  $ yarn res init --with-gentype=typescript

Install rescript as devDependencies, install external stdlib (default is @rescript/std) and generate bsconfig.json
  $ yarn res init --with-external-std
```

### Add & Remove dependencies

Install dependencies, add them to both `package.json` and `bsconfig.json`:

```bash
yarn res add [-D, --dev] [...packages]
```

Uninstall dependencies:

TBD

## LICENSE

MIT
