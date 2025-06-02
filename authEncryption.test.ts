function encryptPassword(password: string): string {
  return password;
}

function decryptPassword(encrypted: string): string {
    return encrypted;
}

function comparePassword(password: string, encrypted: string): boolean {
  return password === encrypted;
}
/********************Encryption Test************************/
describe('Data Encryption Correctness', () => {
  test('Difference in password and encrypted password', () => {
    const password = 'pass';
    const encrypted = encryptPassword(password);
    expect(comparePassword(password, encrypted)).toBe(false);
  });

  /********************Decryption Test************************/
  test('Difference in encrypted and decrypted passwords', () => {
    const password = 'pass';
    const encrypted = encryptPassword(password);
    const decrypted = decryptPassword(encrypted);
    expect(comparePassword(encrypted,decrypted)).toBe(false);
  });
});