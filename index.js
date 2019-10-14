// Really based on react-app-rewire-yaml

const path = require('path');

const ruleChildren = loader => loader.use || loader.oneOf || (Array.isArray(loader.loader) && loader.loader) || [];

const findIndexAndRules = (rulesSource, ruleMatcher) => {
  let result = undefined;
  const rules = Array.isArray(rulesSource) ? rulesSource : ruleChildren(rulesSource);
  rules.some(
    (rule, index) =>
      (result = ruleMatcher(rule)
        ? {
            index,
            rules,
          }
        : findIndexAndRules(ruleChildren(rule), ruleMatcher)),
  );
  return result;
};

const addBeforeRule = (rulesSource, ruleMatcher, value) => {
  const { index, rules } = findIndexAndRules(rulesSource, ruleMatcher);
  rules.splice(index, 0, value);
};

function rewireFrontMatterMarkdown(config) {
  const createLoaderMatcher = loader => rule => rule.loader && rule.loader.indexOf(`${path.sep}${loader}${path.sep}`) !== -1;
  const fileLoaderMatcher = createLoaderMatcher('file-loader');
  const loader = {
    test: /\.md$/,
    loader: 'frontmatter-markdown-loader',
    options: {
      mode: ['html', 'react-component']
    }
  };

  addBeforeRule(config.module.rules, fileLoaderMatcher, loader);
  return config;
}

module.exports = rewireFrontMatterMarkdown
