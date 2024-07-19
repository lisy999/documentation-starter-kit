export const TransformData = async (v: string): Promise<string> => {
  const keyData = new TextEncoder().encode("1111222233334444");
  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  const algorithm = {
    name: "AES-GCM",
    iv,
  };
  const key = await window.crypto.subtle.importKey(
    "raw",
    keyData,
    algorithm,
    false,
    ["encrypt"]
  );
  const encoded = new TextEncoder().encode(v);
  const encrypted = await window.crypto.subtle.encrypt(algorithm, key, encoded);

  const ivLength = new Uint8Array(new Uint32Array([iv.length]).buffer);
  const message = new Uint8Array(
    ivLength.length + iv.length + encrypted.byteLength
  );
  message.set(ivLength, 0);
  message.set(iv, ivLength.length);
  message.set(new Uint8Array(encrypted), ivLength.length + iv.length);

  return Buffer.from(message).toString("base64");
};
export const decryptData = async (v: string): Promise<string> => {
  const keyData = new TextEncoder().encode("1111222233334444");
  const encryptedMessage = new Uint8Array(Buffer.from(v, "base64"));
  const iv = encryptedMessage.slice(4, 16);
  const data = encryptedMessage.slice(16);
  const algorithm = {
    name: "AES-GCM",
    iv,
  };
  const key = await window.crypto.subtle.importKey(
    "raw",
    keyData,
    algorithm,
    false,
    ["decrypt"]
  );
  const decrypted = await window.crypto.subtle.decrypt(algorithm, key, data);

  return new TextDecoder().decode(decrypted);
};
