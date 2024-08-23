import { gcd } from "@dsa/factorization";

export default function fractionAddition(expression: string): string {
  // boring challenge, just a bit annoying
  let ansNum = 0;
  let ansDen = 1;

  const other = {
    "-": true,
    "+": true,
    "/": true,
  } as Record<string, boolean>;

  const getVal = (idx: number) => {
    let res = "";
    while (idx < expression.length && !other[expression[idx]!]) {
      res += expression[idx];
      idx++;
    }
    return [Number(res), idx] as const;
  };

  let i = 0;
  let sign: 1 | -1 = 1;
  if (expression[i] === "-") {
    sign = -1;
    i++;
  }
  while (i < expression.length) {
    const [num, idx] = getVal(i);
    i = idx;
    i++; // skip the '/'
    const [den, idx2] = getVal(i);
    i = idx2;

    const resDen = ansDen * den;
    const resNum = ansNum * den + sign * num * ansDen;
    const g = gcd(Math.abs(resNum), resDen);
    ansNum = resNum / g;
    ansDen = resDen / g;

    if (i < expression.length) {
      sign = expression[i] === "+" ? 1 : -1;
      i++;
    }
  }

  return `${ansNum}/${ansDen}`;
}
