module.exports = {
  "env": {
      "node": true,
      "es2021": true
  },
  "extends": "eslint:recommended",
  "parserOptions": {
      "ecmaVersion": 13,
      "sourceType": "module"
  },
  "rules": {
      "semi": ["error", "never"],
      "quotes": ["error", "single"],
      "no-console": "warn",
      "sort-imports": ["error", {
          "ignoreCase": false,
          "ignoreDeclarationSort": false,
          "ignoreMemberSort": false,
          "memberSyntaxSortOrder": ["none", "all", "multiple", "single"],
          "allowSeparatedGroups": true
      }],
      "dot-location": ["warn", "property"],
      "newline-per-chained-call": ["warn", { "ignoreChainWithDepth": 2 }],
      "indent": ["error", 2],
      "space-before-blocks": ["warn"],
      "object-curly-spacing": ["warn", "always", { "arraysInObjects": true }],
      "keyword-spacing": ["warn", { "before": true, "after": true }],
      "space-infix-ops": ["warn", { "int32Hint": false }],
  }
};
