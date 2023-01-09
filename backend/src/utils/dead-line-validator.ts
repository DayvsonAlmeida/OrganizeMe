import { DeadLineValidator as IDeadLineValidator } from "../presentation/protocols/dead-line-validator";

export class DeadLineValidator implements IDeadLineValidator {
  isValid(deadLine: string): boolean {
    const [day, month, year] = deadLine.split("/").map((el) => parseInt(el));
    const deadLineDate = new Date(`${year}-${month}-${day}`);

    const isValidDate = !isNaN(deadLineDate.getDate());

    if (!isValidDate) return false;

    const currentDate = new Date();
    const isBeforeCurrentDate = deadLineDate < currentDate;

    if (isBeforeCurrentDate) return false;

    return true;
  }
}
