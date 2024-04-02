const { describe, it } = require("node:test");
const assert = require("node:assert");
const { ok } = require("node:assert");

const { anyProp1, AnyClass } = require("../../src/mock");
const defaultMock = require("../../src/mock");

// The two tests marked with concurrent will be run in parallel
describe("mock cjs", () => {
  it("import not null", async () => {
    assert.ok(defaultMock);
    assert.ok(anyProp1);
  });

  it("read prop", () => {
    assert.ok(defaultMock.anyProp2);
    assert.ok(defaultMock.abc.efg);
    assert.ok(anyProp1.anyProp3);
    assert.ok(anyProp1.qwe.asd);
  });

  it("read fn", () => {
    assert.ok(defaultMock.fn() == undefined);
    assert.ok(defaultMock.qwe.fn() == undefined);
    assert.ok(anyProp1.fn() == undefined);
    assert.ok(anyProp1.efg.fn() == undefined);
  });

  it("use as react hooks", () => {
    assert.ok(defaultMock.useState());
    assert.ok(defaultMock.zxc.useState());
    assert.ok(anyProp1.useState());
    assert.ok(anyProp1.cxz.useState());
  });

  it("use as class", () => {
    ok(AnyClass);
    ok(new AnyClass());
    ok(new defaultMock());
  });
});
