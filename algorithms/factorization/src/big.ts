import { ExponentialForm, u64 } from ".";

export function gcdU64(a: u64, b: u64): u64 {
  // Euclidean algorithm
  while (b !== 0n) {
    [a, b] = [b, a % b];
  }
  return a;
}

export function abs(a: u64): u64 {
  return a < 0n ? -a : a;
}

// Miller-Rabin primality test
export function isPrimeU64(n: u64, iterations: number = 5): boolean {
  if (n < 2n || n % 2n === 0n) return n === 2n;

  let s = 0n;
  let d = n - 1n;
  while (d % 2n === 0n) {
    s++;
    d /= 2n;
  }

  const a_max = n - 2n;
  for (let i = 0; i < iterations; i++) {
    const a = BigInt(Math.floor(Math.random() * Number(a_max - 2n))) + 2n;
    let x = modPowU64(a, d, n);
    if (x === 1n || x === n - 1n) continue;
    let composite = true;
    for (let r = 0n; r < s; r++) {
      x = (x * x) % n;
      if (x === n - 1n) {
        composite = false;
        break;
      }
    }
    if (composite) return false;
  }
  return true;
}

// Modular exponentiation
export function modPowU64(base: u64, exponent: u64, modulus: u64): u64 {
  if (modulus === 1n) return 0n;
  let result = 1n;
  base = base % modulus;
  while (exponent > 0n) {
    if (exponent % 2n === 1n) {
      result = (result * base) % modulus;
    }
    exponent = exponent / 2n;
    base = (base * base) % modulus;
  }
  return result;
}

export function pollardRhoU64(n: u64): u64 {
  if (n % 2n === 0n) return 2n;

  let x = 2n;
  let y = 2n;
  let d = 1n;

  const f = (x: u64) => (x * x + 1n) % n;

  while (d === 1n) {
    x = f(x);
    y = f(f(y));
    d = gcdU64(abs(x - y), n);
  }
  return d;
}

export function factorizeU64(n: u64): ExponentialForm<u64> {
  const factors = new Map<u64, number>();

  // trial division
  for (let i = 2n; i * i <= n && i <= 1000n; i++) {
    while (n % i === 0n) {
      n /= i;
      factors.set(i, (factors.get(i) || 0) + 1);
    }
  }

  // if n is a prime already, were done
  if (n < 2n) return Array.from(factors.entries()).sort((a, b) => Number(a[0] - b[0]));
  if (isPrimeU64(n)) {
    factors.set(n, 1);
    return Array.from(factors.entries()).sort((a, b) => Number(a[0] - b[0]));
  }

  // pollard rho for larger factors
  while (n > 1n && !isPrimeU64(n)) {
    const factor = pollardRhoU64(n);
    while (n % factor === 0n) {
      factors.set(factor, (factors.get(factor) || 0) + 1);
      n /= factor;
    }
  }

  // remainder is a prime
  if (n > 1n) factors.set(n, 1);

  return Array.from(factors.entries()).sort((a, b) => Number(a[0] - b[0]));
}
