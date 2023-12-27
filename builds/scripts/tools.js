#!/usr/bin/env node

const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')

const variantUtils = require('../variants/variant-utils');

const dev = require('./dev.js');
const prod = require('./prod.js');

yargs(hideBin(process.argv))

  .command('dev', 'start the server',
    (yargs) => {
      return yargs
        .option('variant', {
          alias: 'v',
          type: 'string',
          description: 'Variant of CV that should be used'
        })
        .demandOption(['variant'])
    },
    ({ variant }) => {

      const variants = variantUtils.extractCvVariants();

      const isValidVariant = variants.includes(variant);
      if (!isValidVariant) {
        console.error(`Unknown or miss-configured variant [${variant}]`);
        return;
      }

      dev(variant);
    }
  )

  .command('prod', 'build production version',
    (yargs) => {
      return yargs;
    },
    () => {

      const variant = require('../../src/variants/hosted-variant.config.js');

      const variants = variantUtils.extractCvVariants();

      const isValidVariant = variants.includes(variant);
      if (!isValidVariant) {
        console.error(`Unknown or miss-configured variant [${variant}] in hosted-variant.config.js`);
        return;
      }

      prod(variant);
    }
  )

  .parse()
