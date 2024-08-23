import { ExponentialForm } from ".";

export function gcd(a: number, b: number): number {
  // Euclidean algorithm
  while (b !== 0) {
    [a, b] = [b, a % b];
  }
  return a;
}

export function abs(a: number): number {
  return a < 0 ? -a : a;
}

// Miller-Rabin primality test
export function isPrime(n: number, iterations: number = 5): boolean {
  if (n < 2 || n % 2 === 0) return n === 2;

  let s = 0;
  let d = n - 1;
  while (d % 2 === 0) {
    s++;
    d /= 2;
  }

  const a_max = n - 2;
  for (let i = 0; i < iterations; i++) {
    const a = Math.floor(Math.random() * Number(a_max - 2)) + 2;
    let x = modPow(a, d, n);
    if (x === 1 || x === n - 1) continue;
    let composite = true;
    for (let r = 0; r < s; r++) {
      x = (x * x) % n;
      if (x === n - 1) {
        composite = false;
        break;
      }
    }
    if (composite) return false;
  }
  return true;
}

// Modular exponentiation
export function modPow(base: number, exponent: number, modulus: number): number {
  if (modulus === 1) return 0;
  let result = 1;
  base = base % modulus;
  while (exponent > 0) {
    if (exponent % 2 === 1) {
      result = (result * base) % modulus;
    }
    exponent = exponent / 2;
    base = (base * base) % modulus;
  }
  return result;
}

export function pollardRho(n: number): number {
  if (n % 2 === 0) return 2;

  let x = 2;
  let y = 2;
  let d = 1;

  const f = (x: number) => (x * x + 1) % n;

  while (d === 1) {
    x = f(x);
    y = f(f(y));
    d = gcd(abs(x - y), n);
  }
  return d;
}

export function factorize(n: number): ExponentialForm<number> {
  const factors = new Map<number, number>();

  // trial division
  for (let i = 2; i * i <= n && i <= 1000n; i++) {
    while (n % i === 0) {
      n /= i;
      factors.set(i, (factors.get(i) || 0) + 1);
    }
  }

  // if n is a prime already, were done
  if (n < 2) return Array.from(factors.entries()).sort((a, b) => Number(a[0] - b[0]));
  if (isPrime(n)) {
    factors.set(n, 1);
    return Array.from(factors.entries()).sort((a, b) => Number(a[0] - b[0]));
  }

  // pollard rho for larger factors
  while (n > 1 && !isPrime(n)) {
    const factor = pollardRho(n);
    while (n % factor === 0) {
      factors.set(factor, (factors.get(factor) || 0) + 1);
      n /= factor;
    }
  }

  // remainder is a prime
  if (n > 1) factors.set(n, 1);

  return Array.from(factors.entries()).sort((a, b) => Number(a[0] - b[0]));
}
