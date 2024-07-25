import forge from "node-forge";
const keyStr = "1111222233334444"; // 128 位密钥的十六进制表示
export function encrypt(word: string) {
  const iv = forge.random.getBytesSync(12); // 生成随机iv 12字节
  const cipher = forge.cipher.createCipher("AES-GCM", keyStr); // 生成AES-GCM模式的cipher对象 并传入密钥
  cipher.start({
    iv,
  });
  cipher.update(forge.util.createBuffer(forge.util.encodeUtf8(word)));
  cipher.finish();
  const encrypted = cipher.output;
  const tag = cipher.mode.tag;
  return window.btoa(iv + encrypted.data + tag.data);
}

export function decrypt(dataMsg: string) {
  if (dataMsg) {
    dataMsg = window.atob(dataMsg);
    const iv = dataMsg.slice(0, 12);
    const tag = dataMsg.slice(-16);
    const data = dataMsg.slice(12, dataMsg.length - 16);
    const decipher = forge.cipher.createDecipher("AES-GCM", keyStr);
    decipher.start({
      iv,
      tag,
    });
    decipher.update(forge.util.createBuffer(data));
    const pass = decipher.finish();
    if (pass) {
      return decipher.output.toString();
    }
  } else {
    return dataMsg;
  }
}
