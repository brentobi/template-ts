# template-ts - Template repository for TypeScript projects

## Template usage
- Clone template files into your new repo.
- Update [/package.json](/package.json). 
  - Update package name. Replace `template-ts` with a new name.
  - Update dependency version ranges if needed.
- Check if new major versions of dependencies are available and install if needed.
- Run `npm update` to 
  - update package name in [package-lock.json](/package-lock.json) and
  - update dependencies.
- Adjust files in [/src/](/src/) and [/test/](/test/) as needed.
  - Update app name in [/src/AppInfo.ts](/src/AppInfo.ts).
  - Consider removing [/src/Dummy.ts](/src/Dummy.ts) 
    and the related test from [/test/index.test.ts](/test/index.test.ts).
- Update [/README.md](/README.md) as needed.

## Project usage

Development:
```sh
npm run test  # run tests (tsc --noEmit, jest tests)
npm run watch # run tests when src changes
npm run build # build for production to /dist/
```

Production:
```sh
npm run build
node dist/bin.js # execute bin
```

Build executables:
```
npx pkg --out-path ./dist-exe/ -t node16-linux,node16-win,node16-mac .
```


## Project setup details
[tbd]