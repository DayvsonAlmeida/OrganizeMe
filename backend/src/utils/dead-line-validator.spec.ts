import { DeadLineValidator } from "./dead-line-validator";

const makeSut = (): DeadLineValidator => new DeadLineValidator();

describe("DeadLineValidator Adapter", () => {
  beforeAll(() => {
    jest.useFakeTimers({
      now: new Date("2023-01-01"),
    });
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it("should return false if deadLine is not a valid date", () => {
    const sut = makeSut();
    const invalidDate = "13/13/2023";

    const result = sut.isValid(invalidDate);
    expect(result).toBeFalsy();
  });

  it("should return false if deadLine is before the current date", () => {
    const sut = makeSut();
    const invalidDate = "31/12/2022";

    const result = sut.isValid(invalidDate);
    expect(result).toBeFalsy();
  });

  it("should return true if a valid deadLine after the current date", () => {
    const sut = makeSut();
    const invalidDate = "31/01/2023";

    const result = sut.isValid(invalidDate);
    expect(result).toBeTruthy();
  });

  it("should return true if a valid deadLine is same as the current date", () => {
    const sut = makeSut();
    const invalidDate = "01/01/2023";

    const result = sut.isValid(invalidDate);
    expect(result).toBeTruthy();
  });
});
