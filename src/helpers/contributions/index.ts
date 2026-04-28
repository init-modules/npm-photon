export * from "./types";
export * from "./define-slot";
export * from "./define-contribution";
export * from "./registry";
export * from "./resolve";
export * from "./core-slots";
// Hooks live in `./client` so this barrel stays free of "use client"
// boundaries — server modules can import factories/slots/registry safely.
