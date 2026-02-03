const SECRET_KEY = '7k9m2n8q4r6t1u3w5y7z9a2c4e6g8h0j';

const encoder = new TextEncoder();
const decoder = new TextDecoder();

async function getKey() {
  const keyBytes = encoder.encode(SECRET_KEY);
  return crypto.subtle.importKey('raw', keyBytes, { name: 'AES-GCM' }, false, [
    'encrypt',
    'decrypt',
  ]);
}

function bufToHex(buf: Uint8Array) {
  return Array.from(buf)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

function hexToBuf(hex: string) {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < bytes.length; i += 1) {
    bytes[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
  }
  return bytes;
}

export async function encrypt(text: string): Promise<string> {
  try {
    const key = await getKey();
    const iv = crypto.getRandomValues(new Uint8Array(16)); // как в Node

    const encrypted = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv },
      key,
      encoder.encode(text),
    );

    const encryptedBytes = new Uint8Array(encrypted);
    return `${bufToHex(iv)}:${bufToHex(encryptedBytes)}`;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Error in encrypt:', e);
    return '';
  }
}

export async function decrypt(payload: string): Promise<string> {
  try {
    const [ivHex, encryptedHex] = payload.split(':');
    const iv = hexToBuf(ivHex);
    const encrypted = hexToBuf(encryptedHex);
    const key = await getKey();

    const decrypted = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, encrypted);
    return decoder.decode(decrypted);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Error in decrypt:', e);
    return '';
  }
}
