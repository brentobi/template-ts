#!/usr/bin/env node

import App from "./App";

const args = process.argv.slice(2);
const app = new App();
app.run(...args);