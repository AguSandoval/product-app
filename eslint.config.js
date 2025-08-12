const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");

module.exports = defineConfig([
    {
        ...expoConfig,
        settings: {
            ...expoConfig.settings,
            "import/resolver": {
                typescript: {
                    project: "./tsconfig.json",
                },
            },
        },
        ignores: ["dist/*"],
    },
]);
