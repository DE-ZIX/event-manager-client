# Event Manager Client

## Requirements

- node >= 16.10
- corepack enabled

### 1. Install node.js

Windows

```
Download installer at: https://nodejs.org/en/
```

Linux

```
sudo apt install nodejs
```

macOS

```
brew install node
```

Or you can use a version manager for node, like [nvm](https://github.com/nvm-sh/nvm) and use it

### 2. Certify that your Node version is equal to or greater than the minimum required version (16.10)

```
node -v
```

### 3. Then Enable Corepack

```
corepack enable
```

Now you can proceed to project setup and serving

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```

### Run your unit tests

```
yarn test:unit
```

### Run your end-to-end tests

```
yarn test:e2e
```

### Lints and fixes files

```
yarn lint
```

### Run e2e tests with mocks

```
yarn test:e2e --env use_mock=true
```

### Run e2e and record

```
yarn cypress run --record --key 747eced2-a43e-4eb4-9e1e-fcdaf7d57398
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
