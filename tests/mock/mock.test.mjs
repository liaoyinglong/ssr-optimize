import { ok } from "node:assert";
import { describe, it } from "node:test";

import pkg from "../../src/defaultMock.js";
const { abc, anyProp1, anyProp2, fn, qwe, useState, zxc } = pkg;
const defaultMock = pkg;

// The two tests marked with concurrent will be run in parallel
describe("faker mjs", () => {
  it("import not null", async () => {
    ok(defaultMock);
    ok(anyProp1);
  });

  it("read prop", () => {
    ok(anyProp2);
    ok(abc.efg);
    ok(anyProp1.anyProp3);
    ok(anyProp1.qwe.asd);
  });

  it("read fn", () => {
    ok(fn() == undefined);
    ok(qwe.fn() == undefined);
    ok(anyProp1.fn() == undefined);
    ok(anyProp1.efg.fn() == undefined);
  });

  it("use as react hooks", () => {
    ok(useState());
    ok(zxc.useState());
    ok(anyProp1.useState());
    ok(anyProp1.cxz.useState());
  });
});