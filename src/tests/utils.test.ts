import { Request } from "express";
import config from "@/config";
import { getErrorMessage, getPaginationParameters } from "@/utils";

describe("getErrorMessage", () => {
  test("should return message from an Error instance", () => {
    const error = new Error("Something went wrong");
    const result = getErrorMessage(error);
    expect(result).toBe("Something went wrong");
  });

  test("should return a message from an object with a message property", () => {
    const error = { message: "Custom error message" };
    const result = getErrorMessage(error);
    expect(result).toBe("Custom error message");
  });

  test("should return the string itself if the error is a string", () => {
    const error = "This is a string error";
    const result = getErrorMessage(error);
    expect(result).toBe("This is a string error");
  });

  test("should return a default message for unknown error types", () => {
    const error = { someProperty: "someValue" };
    const result = getErrorMessage(error);
    expect(result).toBe("An error occurred");

    const numberError = 42;
    const resultNumber = getErrorMessage(numberError);
    expect(resultNumber).toBe("An error occurred");
  });
});

describe("getPaginationParameters", () => {
  test("should return default values when page and perPage are missing", () => {
    const req = { query: {} } as Request;
    const result = getPaginationParameters(req);
    expect(result).toEqual({
      page: 1,
      perPage: config.defaultPageSize,
      limit: config.defaultPageSize,
      offset: 0,
    });
  });

  test("should return pagination parameters when page and perPage are provided", () => {
    const req = { query: { page: "2", perPage: "10" } } as unknown as Request;
    const result = getPaginationParameters(req);
    expect(result).toEqual({
      page: 2,
      perPage: 10,
      limit: 10,
      offset: 10,
    });
  });

  test("should handle invalid page and perPage values", () => {
    const req = { query: { page: "invalid", perPage: "invalid" } } as unknown as Request;
    const result = getPaginationParameters(req);
    expect(result).toEqual({
      page: 1,
      perPage: config.defaultPageSize,
      limit: config.defaultPageSize,
      offset: 0,
    });
  });

  test("should handle negative page and perPage values", () => {
    const req = { query: { page: "-1", perPage: "-5" } } as unknown as Request;
    const result = getPaginationParameters(req);
    expect(result).toEqual({
      page: 1,
      perPage: config.defaultPageSize,
      limit: config.defaultPageSize,
      offset: 0,
    });
  });

  test("should handle zero page and perPage values", () => {
    const req = { query: { page: "0", perPage: "0" } } as unknown as Request;
    const result = getPaginationParameters(req);
    expect(result).toEqual({
      page: 1,
      perPage: config.defaultPageSize,
      limit: config.defaultPageSize,
      offset: 0,
    });
  });
});
