# react-app-rewire-frontmatter-markdown

[![npm](https://img.shields.io/npm/v/react-app-rewire-frontmatter-markdown.svg?style=for-the-badge)](https://www.npmjs.com/package/react-app-rewire-frontmatter-markdown)

Add [frontmatter-markdown-loader](https://github.com/hmsk/frontmatter-markdown-loader) to [create-react-app](https://github.com/facebook/create-react-app) with [react-app-rewired](https://github.com/timarney/react-app-rewired). You create-react-app project can import FrontMatter Markdown as React Component/HTML + FrontMatter Atrributes 🔌

## Usage

```
yarn add -D react-app-rewire-frontmatter-markdown
```

### Configuration

In `config-overrides.js` for [react-app-rewired](https://github.com/timarney/react-app-rewired):

```js
const rewireFrontmatterMarkdown = require("react-app-rewire-frontmatter-markdown");

module.exports = function override(config, env) {
  rewireFrontmatterMarkdown(config); // <-- THIS
  return config;
}
```

This inserts the loader config for `/\.md$/`.

### Options

Default option for `frontmatter-markdown-loader` is

```json
{
  mode: ['react']
}
```

You can give your own option through the second argument.

```js
const rewireFrontmatterMarkdown = require("react-app-rewire-frontmatter-markdown");

module.exports = function override(config, env) {
  // THIS
  rewireFrontmatterMarkdown(
    config,
    {
      mode: ['html', 'react'],
      markdownIt: {
        html: true,
        linkify: true,
        breaks: true
      }
    }
  );
  return config;
}
```

Full documentation for frontmatter-markdown-loader is in: https://hmsk.github.io/frontmatter-markdown-loader/options

# License

MIT License, Copyright 2019-present Kengo Hamasaki
