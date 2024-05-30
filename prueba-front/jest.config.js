// jest.config.js
module.exports = {
    setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
    verbose: true,
    transform: {
        "^.+\\.jsx?$": "babel-jest"
    },
    transformIgnorePatterns: [
        "/node_modules/(?!axios).+\\.js$"
    ],
    moduleFileExtensions: ['js', 'jsx'],
    testEnvironment: "jsdom"
};
