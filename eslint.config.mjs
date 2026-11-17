import nextVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = [
  ...nextVitals,
  {
    ignores: [
      "dist/**",
      "node_modules/**",
      "qa/**",
      "src/**",
      ".next/**",
      "coverage/**",
    ],
  },
];

export default eslintConfig;
