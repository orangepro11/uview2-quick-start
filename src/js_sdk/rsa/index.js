import JSEncrypt from './encrypt';
import key from './id_rsa_pub';
class RSA {
  context;

  /**
   * 构造函数，传入公钥即可。
   * @param {string} public_key 公钥
   */
  constructor(public_key) {
    this.context = new JSEncrypt();
    this.context.setPublicKey(public_key);
  }

  /**
   * 根据密文解析明文，支持超过128位的密文的处理。
   * @param {string} data 被私钥加密的密文传，超长密文串使用 . 分割
   * @returns 被解密后的明文
   */
  decrypt = (data) => {
    return JSON.parse(this.context.decryptLong(data));
  };

  /**
   * 根据公钥对数据进行加密
   * @param {string} data 要加密的明文
   * @returns 被公钥加密的密文
   */
  encrypt = (data) => {
    return this.context.encryptLong(JSON.stringify(data));
  };
}

export default new RSA(key);
