const { describe, it } = require("node:test");
const assert = require("node:assert");

const { anyProp1 } = require("../../src/defaultMock");
const defaultFaker = require("../../src/defaultMock");

// The two tests marked with concurrent will be run in parallel
describe("faker cjs", () => {
  it("import not null", async () => {
    assert.ok(defaultFaker);
    assert.ok(anyProp1);
  });

  it("read prop", () => {
    assert.ok(defaultFaker.anyProp2);
    assert.ok(defaultFaker.abc.efg);
    assert.ok(anyProp1.anyProp3);
    assert.ok(anyProp1.qwe.asd);
  });

  it("read fn", () => {
    assert.ok(defaultFaker.fn() == undefined);
    assert.ok(defaultFaker.qwe.fn() == undefined);
    assert.ok(anyProp1.fn() == undefined);
    assert.ok(anyProp1.efg.fn() == undefined);
  });

  it("use as react hooks", () => {
    assert.ok(defaultFaker.useState());
    assert.ok(defaultFaker.zxc.useState());
    assert.ok(anyProp1.useState());
    assert.ok(anyProp1.cxz.useState());
  });
});
