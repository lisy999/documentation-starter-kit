import React from "react";
import { encrypt, decrypt } from "./tool"; // 替换为实际路径
import { Button } from "antd";
export default function Encryption() {
  const handleClick = async () => {
    try {
      // 原始数据
      const originalText =
        "SELECT LEFT(WORK_DATE,6) AS 统计日EFT(W 'B104' GROUP BY LEFT(WORK_DATE,6) ORDER BY LEFT(WORK_DATE,6) DESC";
      // 加密数据
      const encryptedData = encrypt(originalText);
      console.log("加密数据:", encryptedData);
      // 解密数据
      const decryptedData = decrypt(encryptedData);
      console.log("解密数据:", decryptedData);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return <Button onClick={handleClick}>加密解密</Button>;
}
