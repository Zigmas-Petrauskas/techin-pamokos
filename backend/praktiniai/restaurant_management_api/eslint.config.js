import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import globals from "globals";
import prettierPlugin from "eslint-plugin-prettier";

export default [
  {
    ignores: ["node_modules/**"],
  },

  js.configs.recommended,

  {
    files: ["**/*.js"],

    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.node,
      },
    },

    plugins: {
      prettier: prettierPlugin,
    },

    rules: {
      ...prettier.rules,

      "prettier/prettier": "error",

      "no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
        },
      ],

      // Reikalaujami griežti palyginimai, išskyrus null tikrinimą
      eqeqeq: [
        "error",
        "always",
        {
          null: "ignore",
        },
      ],

      // Reikalaujami riestiniai skliaustai if, else ir cikluose
      curly: "error",
    },
  },
];
