module.exports = {
    "rootDir" : "../",
    "testEnvironment": "node",
    "modulePathIgnorePatterns": [
        "<rootDir>/node_modules/"
    ],
    "testPathIgnorePatterns": [
        "<rootDir>/node_modules/"
    ],
    "testURL": "http://localhost/",
    "verbose": true,
    "coverageDirectory": "./test/coverage",
    "coverageReporters": [
        "html", "text-summary"
    ],
    "transform": {
        "^.+\\.tsx?$": "ts-jest"
    },
    "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
    "moduleFileExtensions": [
        "ts",
        "tsx",
        "js",
        "jsx",
        "node"
    ],
    "reporters": [
        "default",
        ["./node_modules/jest-html-reporter", {
            "pageTitle": "Test Report",
            "outputPath":"./test/test-report.html",
            "includeFailureMsg":true,
            "includeConsoleLog":true
        }]
    ],
    "globals":{
        'ts-jest': {  "diagnostics": false}
    }
};
