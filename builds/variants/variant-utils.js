/*
 * There might be several versions of CV processed in parallel
 *
 * To make it work there will be config file that takes different CV variants and generates build configs for them.
 *
 * This will allow to dynamically maintain and build several CV variants conveniently extending them while keeping
 * old versions.
 */

const path = require('path');
const fs = require('fs');

const VARIANTS_PATH = path.join(__dirname, '../../src/variants/')

const getVariantNamesList = (dir)=>
  fs.readdirSync(dir)
    .filter(filename => fs.statSync(path.join(dir, filename)).isDirectory())

const verifyVariantStructure = (dir, name) =>
    fs.existsSync(path.join(dir, name, "index.html"))
    && fs.existsSync(path.join(dir, name, "index.ts"));

function extractCvVariants() {

  console.log('Variant list dir:', VARIANTS_PATH);

  const variantList = getVariantNamesList(VARIANTS_PATH);

  variantList.forEach(variantName => {
    const valid = verifyVariantStructure(VARIANTS_PATH, variantName);

    if (!valid) {
      console.warn(`Variant [${variantName}] structure is invalid. Variant is required to have index.html and index.ts files.`);
    }
  });

  return variantList
    .filter(variantName => verifyVariantStructure(VARIANTS_PATH, variantName))
}


module.exports = {
  extractCvVariants
}
