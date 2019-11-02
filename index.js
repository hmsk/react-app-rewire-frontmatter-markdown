// The logic to add loader before 'file-loader' is based on react-app-rewire-yaml: https://github.com/hsz/react-app-rewire-yaml
const path = require('path');

const fileLoaderMatcher = rule => rule.loader && rule.loader.indexOf(`${path.sep}file-loader${path.sep}`) !== -1;

const ruleChildren = loader => loader.use || loader.oneOf || (Array.isArray(loader.loader) && loader.loader) || [];

const findIndexAndRules = (currentRules) => {
  let result = undefined;
  const rules = Array.isArray(currentRules) ? currentRules : ruleChildren(currentRules);
  rules.some(
    (rule, index) =>
      (result = fileLoaderMatcher(rule)
        ? {
            index,
            rules,
          }
        : findIndexAndRules(ruleChildren(rule))),
  );
  return result;
};

const addLoaderBeforeFileLoader = (currentRules, newRule) => {
  const { index, rules } = findIndexAndRules(currentRules);
  rules.splice(index, 0, newRule);
};

function rewireFrontMatterMarkdown(config, options = { mode: ['react-component'] }) {
  const frontmatterMarkdownLoaderRule = {
    test: /\.md$/,
    loader: 'frontmatter-markdown-loader',
    options
  };

  addLoaderBeforeFileLoader(config.module.rules, frontmatterMarkdownLoaderRule);
  return config;
}

module.exports = rewireFrontMatterMarkdown;
