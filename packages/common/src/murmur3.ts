const __encoder = new TextEncoder();

function __rotl32(x: number, r: number) {
  return (x << r) | (x >>> (32 - r));
}

function __rotr32(x: number, r: number) {
  return (x >>> r) | (x << (32 - r));
}

function __fmix32(h: number) {
  h ^= h >>> 16;
  h = Math.imul(h, 0x85ebca6b);
  h ^= h >>> 13;
  h = Math.imul(h, 0xc2b2ae35);
  h ^= h >>> 16;

  return h;
}

export function murmur3base(data: Uint8Array, seed: number = 0) {
  const len = data.length;
  const nblocks = len >> 2;

  let h1 = seed >>> 0; // Ensure unsigned 32-bit

  const c1 = 0xcc9e2d51;
  const c2 = 0x1b873593;

  // Process 4-byte blocks
  for (let i = 0; i < nblocks; i++) {
    let k1 =
      (data[i * 4]! & 0xff) |
      ((data[i * 4 + 1]! & 0xff) << 8) |
      ((data[i * 4 + 2]! & 0xff) << 16) |
      ((data[i * 4 + 3]! & 0xff) << 24);

    k1 = Math.imul(k1, c1);
    k1 = __rotl32(k1, 15);
    k1 = Math.imul(k1, c2);

    h1 ^= k1;
    h1 = __rotl32(h1, 13);
    h1 = Math.imul(h1, 5) + 0xe6546b64;
  }

  // Process remaining bytes
  let k1 = 0;
  const rem = len & 3;
  const offset = nblocks * 4;

  switch (rem) {
    case 3:
      k1 ^= (data[offset + 2]! & 0xff) << 16;
    case 2:
      k1 ^= (data[offset + 1]! & 0xff) << 8;
    case 1:
      k1 ^= data[offset]! & 0xff;
      k1 = Math.imul(k1, c1);
      k1 = __rotl32(k1, 15);
      k1 = Math.imul(k1, c2);
      h1 ^= k1;
  }

  // Finalization
  h1 ^= len;
  h1 = __fmix32(h1);

  return h1 >>> 0; // Ensure unsigned 32-bit
}

export function murmur3(key: string, seed: number = 0): number {
  const data = __encoder.encode(key);
  return murmur3base(data, seed);
}
