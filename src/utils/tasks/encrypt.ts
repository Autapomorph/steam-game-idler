import crypto from 'node:crypto';

export function encrypt(string: string): string {
  try {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-gcm', '7k9m2n8q4r6t1u3w5y7z9a2c4e6g8h0j', iv);
    let encrypted = cipher.update(string, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    const authTag = cipher.getAuthTag();
    return `${iv.toString('hex')}:${authTag.toString('hex')}:${encrypted}`;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error in encrypt function:', error);
    return '';
  }
}
