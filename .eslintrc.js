module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "@typescript-eslint"
    ],
    "rules": {
        "semi": [2, "never"],
        "brace-style": [2, "stroustrup"],
        "quotes": [2, "double"],
        "no-console": [2],
        "curly": [2],
        "eqeqeq": [2],
        "no-new-func": [2],
        "no-undef-init": [2],
        "no-use-before-define": [1, { "functions": false }],
        "no-unused-vars": [2, { "args": "none" }],
        "require-await": [2],
        "no-shadow": [2],
        "camelcase": [2],
        "func-name-matching": [2],
        "func-names": [2],
        "new-cap": [2],
        "no-var": [2],
        "one-var": [2, "never"],
        "object-curly-newline": [2, { "ImportDeclaration": { "multiline": true, "minProperties": 3 } }],
        "object-property-newline": [2],
        "no-lone-blocks": [2],
        "no-new-object": [2],
        "no-eval": [2],
        "no-labels": [2],
        "no-proto": [2],
        "no-multi-spaces": [2],
        "prefer-spread": [0],
        "indent": [2, 4],
        "prefer-rest-params": [0],
        "prefer-const": [0]
    }
}