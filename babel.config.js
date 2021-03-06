'use strict'

const presets = [
  [
    "@babel/env",
    {
      targets: {
        edge: "17",
        firefox: "60",
        chrome: "67",
        safari: "11.1",
      },
      useBuiltIns: "usage",
    },
  ],
  "@babel/preset-react",
];
const plugins = [
  "@babel/plugin-transform-modules-commonjs",
  "@babel/plugin-proposal-class-properties",
  "babel-plugin-styled-components"
]

module.exports = {presets, plugins}
