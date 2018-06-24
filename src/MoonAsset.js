const JSAsset = require("parcel/src/assets/JSAsset");
const compile = require("moon-component-compiler");
const path = require("path");

class MoonAsset extends JSAsset {
  constructor(name, pkg, options) {
    super(name, pkg, options);
  }
  async getDependencies() {
    await super.getDependencies();
  }
  async generate() {
    let ret = super.generate() || {};
    ret.css = this.compiled.style;
    return ret;
  }
  async parse(code) {
    const base = path.basename(this.name);
    const componentName = base.replace(/\.[^/.]+$/, "");
    this.compiled = compile(componentName, this.contents, {
      development: this.options.hmr,
    });
    return await super.parse(this.compiled.component);
  }
}

module.exports = MoonAsset;
