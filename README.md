
# beshai-web-quickstart-full

This repo provides a starting point for spinning up quick web-based prototypes using modern javascript and webpack. It builds upon [beshai-web-quickstart-basic](https://github.com/pbeshai/beshai-web-quickstart-basic) by adding in [Tailwind CSS](https://tailwindcss.com/) and a few convenient webpack loaders.

## Features

* basic webpack configuration with HTML template and public files copied over
* webpack-dev-server with easy configuration of hot module reloading
* barebones eslint configuration that defers to prettier
* prettier configured
* jsconfig provided to integrate better with [VS Code](https://code.visualstudio.com/)
* optional absolute imports by prefixing with `src`. e.g. `import bar from 'src/foo/bar'`
* css is extracted into its own file, autoprefixed, purged down to only what has been used
* [tailwindcss](https://tailwindcss.com/) is set-up
* css modules are supported by importing `foo.module.css` or similar
* loaders for images, fonts, CSVs have been added so you can import them directly in the js


## Installation

[Download a zip of this repo](https://github.com/pbeshai/beshai-web-quickstart-full/archive/master.zip) then run `npm install`

```shell
curl -Lk https://github.com/pbeshai/beshai-web-quickstart-full/archive/master.zip -o beshai-web-quickstart-full.zip && \
  unzip beshai-web-quickstart-full.zip && \
  rm beshai-web-quickstart-full.zip
mv beshai-web-quickstart-full-master prototype137
cd prototype137
npm install
```

## Run the dev server

```shell
npm run start
```


## Build for production

```shell
npm run build
```

You can then check out the production build by running a web server in the build directory. A simple way to do so is to use the provided `start:prod` script:

```shell
npm run start:prod
```

## Deploying

There are many options to easily deploy your prototype including [Surge](https://surge.sh/) and [Netlify](https://www.netlify.com/), but this repo comes configured for easy deploys to github pages. After pushing your repo to GitHub, just run

```shell
npm run deploy
```

Your app will be available at `https://username.github.io/repo`.


## Linting and Code Formatting

Linting and code formatting is provided via the `lint` and `prettier` scripts. I have my editor configured to automatically run prettier on save, but if you want to run it manually you can run:

```shell
npm run prettier
```

You may also consider [setting up a git hook with husky](https://prettier.io/docs/en/precommit.html) to make eslint and prettier run automatically on commits.


