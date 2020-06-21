import assert from "assert";
import { makeGetNewCases, getCasesPer100kResidents } from "../components/cases";

describe("cases", function () {
  describe("getNewCases", function () {
    it("should return 10 new cases", async function () {
      const httpClientMock = (url) => {
        return {
          data: [{ Cases: 10 }, { Cases: 20 }],
        };
      };
      const getCases = makeGetNewCases(httpClientMock);

      assert.equal(await getCases(new Date(), new Date()), 10);
    });

    it("should return a validation error", async function () {
      const httpClientMock = (url) => {
        return {
          data: [{ Cases: 101 }, { Cases: 202 }, { Cases: 202 }],
        };
      };
      const getCases = makeGetNewCases(httpClientMock);
      var caseResult = await getCases(new Date(), new Date());
      assert.deepEqual(caseResult, {
        error: "No data. No new cases reported.",
      });
    });
  });

  describe("getCasesPer100kResidents", function () {
    it("should return 100", async function () {
      assert.equal(getCasesPer100kResidents(10000, 10000000), 100);
    });
  });
});
