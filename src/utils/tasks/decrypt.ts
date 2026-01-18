import crypto from 'node:crypto';

export function decrypt(string: string): string {
  try {
    const parts = string.split(':');
    const iv = Buffer.from(parts[0], 'hex');
    const authTag = Buffer.from(parts[1], 'hex');
    const encrypted = parts[2];
    const decipher = crypto.createDecipheriv('aes-256-gcm', '7k9m2n8q4r6t1u3w5y7z9a2c4e6g8h0j', iv);
    decipher.setAuthTag(authTag);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error in decrypt function:', error);
    return '';
  }
}
