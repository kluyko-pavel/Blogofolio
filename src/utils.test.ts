import { getDate } from "./utils";

describe("date converting", () => {
  test("date converting", () => {
    expect(getDate("2021-10-06")).toBe("October 06, 2021");
  });
});
