# template-ts - TypeScript project template

## Template usage
- Clone template files into your new repo.
- Update [/package.json](/package.json). 
  - Update package name, version and description.
  - Update dependency version ranges if needed.
- Check if new major versions of dependencies are available and install if needed.
- Run `npm update` to 
  - update package name in [package-lock.json](/package-lock.json) and
  - update dependencies.
- Adjust files in [/src/](/src/) and [/test/](/test/) as needed.
  - Consider removing [/src/Dummy.ts](/src/Dummy.ts) 
    and the related test from [/test/index.test.ts](/test/index.test.ts).
- Consider removing webserver related code if not needed.
  - `npm remove express @types/express`
  - remove [/public/](/public/)
  - remove [/src/commands/ServeCommand.ts](/src/commands/ServeCommand.ts) and it's usage
- Consider removing/restricting info command ([/src/commands/InfoCommand.ts](/src/commands/InfoCommand.ts))
- Consider removing single-/multi-threaded command execution demonstration commands.
  - [/src/commands/CountCommand.ts](/src/commands/CountCommand.ts)
  - [/src/commands/WorkCommand.ts](/src/commands/WorkCommand.ts)
  - [/src/commands/WorkParallelCommand.ts](/src/commands/WorkParallelCommand.ts)
  - [/src/commands/WorkSerialCommand.ts](/src/commands/WorkSerialCommand.ts)
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
npm run pkg
```

## Project setup details
[tbd]


### Development environment
Build first:
```sh
npm run build
```

- [/dist/main.js](/dist/main.js) demonstrates lib usage
- [/dist-types/*](/dist-types/) demonstrate ts types usage
- [/dist/bin.js](/dist/bin.js) demonstrates cli usage
  - `node dist/bin.js [help]` demonstrates automatic help command
  - `node dist/bin.js serve <port>` demonstrates webserver
  - `node dist/bin.js work-serial <amount> <workers>` demonstrates serial/single-threaded command execution
  - `node dist/bin.js work-parallel <amount> <workers>` demonstrates parallel/multi-threaded command execution

### Native app
Build first:
```sh
npm run build
npx pkg .
```

Native apps should be built to [/dist-exe/*](/dist-exe/).

E.g. in windows command prompt run `template-ts-win.exe` to access cli.
