/* eslint-disable no-console */
import * as glob from 'glob';
import { copyFileSync, accessSync } from 'fs';
import * as readline from 'readline';
import * as yargs from 'yargs';

const argv = yargs
  .version(false)
  .option('only', {
    type: 'string',
    default: '**',
    describe:
      'A glob where files should be searched within.\n(Note: the script will attach "/*.template" to the given value)',
  })
  .option('overwrite', {
    type: 'boolean',
    default: false,
    describe:
      'Defines whether already existing target files will be overwritten or not.',
  })
  .option('y', {
    type: 'boolean',
    default: false,
    describe:
      'If set to true, the script will not prompt for a user confirmation when overwriting files',
  }).argv;

const path = argv.only + '/*.template';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// console.log(argv, argv.only, argv.overwrite);
if (argv.overwrite && !argv.y) {
  rl.question(
    `WARNING!
This command will overwrite already existing target files in ${argv.only}. To continue press 'y': `,
    answer => {
      if (answer === 'y') {
        applyTemplates();
      }
      rl.close();
    },
  );
} else {
  applyTemplates();
  rl.close();
}

let count = 0;

function applyTemplates(): void {
  glob(
    path,
    { dot: true, ignore: '**/node_modules/**' },
    async (err, files) => {
      if (err) {
        console.log(err);
        process.exit(-1);
      }
      files.forEach(file => {
        const target = file.slice(0, -9);
        if (!argv.overwrite) {
          try {
            accessSync(target);
            console.log(`Skipping ${file} (target file already existing)`);
          } catch (e) {
            // File not existing
            console.log(`Applying ${file} => ${target}`);
            copyFileSync(file, target);
            count++;
          }
        } else {
          console.log(`Applying ${file} => ${target}`);
          copyFileSync(file, target);
          count++;
        }
      });
      console.log(`${count} template(s) applied!`);
    },
  );
}
