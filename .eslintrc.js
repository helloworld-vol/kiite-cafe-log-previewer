// eslint-disable-next-line no-undef
module.exports = {
  env: {
    es6: true,
    node: true,
    browser: true,
  },

  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "prettier",
  ],

  settings: {
    react: {
      version: "detect",
    },

    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },

    "import/resolver": {
      typescript: {},
    },
  },

  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },

  parser: "@typescript-eslint/parser",

  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: "module",
  },

  plugins: ["react", "@typescript-eslint"],

  rules: {
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/explicit-module-boundary-types": "off",
  },

  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      rules: {
        "@typescript-eslint/no-unused-vars": [2, { args: "none" }],
      },
    },
    {
      files: ["src/**/*.{js,jsx,ts,tsx}"],
      rules: {
        "import/order": [
          "error",
          {
            groups: [
              "type",
              "builtin",
              "external",
              "internal",
              "parent",
              "sibling",
              "index",
              "object",
              "unknown",
            ],
            alphabetize: {
              order: "asc",
            },
            "newlines-between": "always",
            warnOnUnassignedImports: true,
            pathGroups: [
              {
                pattern: "*.scss",
                group: "object",
                position: "after",
                patternOptions: { matchBase: true },
              },
            ],
            pathGroupsExcludedImportTypes: [],
          },
        ],
      },
    },
  ],
};
