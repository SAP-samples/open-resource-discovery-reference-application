import fs from "fs";
import { pathsToModuleNameMapper } from "ts-jest";

function loadJson(path) {
  return JSON.parse(fs.readFileSync(new URL(path, import.meta.url)));
}

const tsconfig = loadJson("./tsconfig.json");
const { compilerOptions } = tsconfig;

export default {
  preset: "ts-jest",
  coverageDirectory: "reports/jest-coverage",
  moduleFileExtensions: ["js", "json", "ts", "d.ts"],
  reporters: ["default"],
  modulePaths: [compilerOptions.baseUrl],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { useESM: true }),
  testTimeout: 30000,
};
