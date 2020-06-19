import assert from "assert";

import { calculate } from "../components/calculator";

describe("calculator", function () {
  describe("calculate", function () {
    it("should return no risk", function () {
      assert.equal(calculate(), "no risk");
    });
  });
});
