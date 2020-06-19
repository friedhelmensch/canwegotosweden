import assert from "assert";
import { makeGetNewCases, getCasesPer100kResidents } from "../components/cases";

describe("cases", function () {
  describe("getNewCases", function () {
    const httpClientMock = (url) => {
      return {
        data: [{ Cases: 10 }, { Cases: 20 }],
      };
    };
    const getCases = makeGetNewCases(httpClientMock);

    it("should return 10 new cases", async function () {
      assert.equal(await getCases(new Date(), new Date()), 10);
    });
  });

  describe("getCasesPer100kResidents", function () {
    it("should return 100", async function () {
      assert.equal(getCasesPer100kResidents(10000, 10000000), 100);
    });
  });
});
