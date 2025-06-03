const baseConfig = require("./base");

module.exports = {
  ...baseConfig,
  importOrder: [
    "^(react|react-dom|@hookform|axios|zod|@tanstack/*|react-number-format|zod|react-hook-form)$",
    "<THIRD_PARTY_MODULES>",
    "^@/(.*)$",
    "^[./]",
  ],
  importOrderSeparation: true,
  importOrderGroupNamespaceSpecifiers: true,
  importOrderSortSpecifiers: true,
  tailwindFunctions: ["cn", "cva"],
  plugins: [
    "prettier-plugin-tailwindcss",
    "@trivago/prettier-plugin-sort-imports",
  ],
};
