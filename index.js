module.exports = function (bundler) {
  bundler.addAssetType("moon", require.resolve("./src/MoonAsset.js"));
};
