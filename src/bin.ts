#!/usr/bin/env node

import { CLI } from "./CLI";

(async () => {
    await CLI.exec(process.argv);
})();
