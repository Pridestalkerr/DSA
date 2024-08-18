export default function lemonadeChange(bills: number[]): boolean {
  // this one is very easy, so i dont think an explanation is needed
  // just run an efficient greedy simulation
  let count5 = 0;
  let count10 = 0;
  // no need to keep track of 20s
  for (const bill of bills) {
    if (bill === 5) {
      count5++; // bank it
    } else if (bill === 10) {
      if (count5 === 0) {
        return false; // cant give change
      }
      count5--; // give change
      count10++; // bank the bill
    } else {
      // wants 15 back
      if (count10 > 0 && count5 > 0) {
        // give 10 and 5
        count10--;
        count5--;
      } else if (count5 >= 3) {
        // give 3x 5
        count5 -= 3;
      } else {
        return false; // cant give change
      }
      // bank it, no need to keep track of them
    }
  }

  return true;
}
