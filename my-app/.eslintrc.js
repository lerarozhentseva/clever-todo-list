module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:react/recommended", "airbnb", "prettier"],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "prettier"],
  rules: {
    "prettier/prettier": "off",
    "import/prefer-default-export": "off",
    "react/jsx-filename-extension": [1, {extensions: [".js", ".jsx"]}],
    "react/prop-types": 0,
    "import/no-cycle": [2, {maxDepth: 2}],
    "consistent-return": "off",
    "array-callback-return": "off",
    "react/no-array-index-key": "off",
    "no-shadow": "off",
    "no-param-reassign": "off",
    "jsx-a11y/no-static-element-interactions": "off",
    "react/button-has-type": "off",
    "default-param-last": "off",
    "jsx-a11y/click-events-have-key-events": "off",
    "jsx-a11y/label-has-associated-control": [
      "error",
      {
        required: {
          some: ["nesting", "id"],
        },
      },
    ],
    "jsx-a11y/label-has-for": [
      "error",
      {
        required: {
          some: ["nesting", "id"],
        },
      },
    ],
  },
};
