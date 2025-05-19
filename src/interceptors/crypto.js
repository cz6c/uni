import CryptoJS from 'crypto-js'
import { md5 } from '@/utils/md5'

// GONGSI
export function FilterIv(s) {
  if (!s) return ''
  let str = s
  if (typeof s !== 'string') {
    str = String(s)
  }
  const n = str.substring(str.length - 1)
  const md1 = md5(str)
  const str1 = md1.substring(0, n)
  const md2 = md5(md1)
  const str2 = md2.substring(n)
  const str3 = str1 + str2
  return str3
}

const KEY = CryptoJS.enc.Utf8.parse('265BADE28680BD7632B5011B63FFF24D') // 16位
const IV = CryptoJS.enc.Utf8.parse('47674A13AD9095A7')

// AES加密
export function Encrypt(word, keyStr, ivStr) {
  let key, iv, systemDate
  let data = word
  if (typeof data === 'object') {
    // 对象格式的转成json字符串
    systemDate = data.systemDate
    delete data.systemDate
    data = JSON.stringify(data)
  }
  if (keyStr) {
    key = CryptoJS.enc.Utf8.parse(keyStr)
    iv = CryptoJS.enc.Utf8.parse(ivStr)
  } else {
    key = CryptoJS.enc.Utf8.parse(systemDate)
    iv = CryptoJS.enc.Utf8.parse(systemDate?.substring(systemDate.length - 16))
  }
  const srcs = CryptoJS.enc.Utf8.parse(data)
  const encrypted = CryptoJS.AES.encrypt(srcs, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  })
  return encrypted.ciphertext.toString()
}
// AES解密
export function Decrypt(word, keyStr, ivStr) {
  let key = KEY
  let iv = IV
  let srcs = ''
  let encryptedHexStr = ''

  if (keyStr) {
    key = CryptoJS.enc.Utf8.parse(keyStr)
    iv = CryptoJS.enc.Utf8.parse(ivStr)
  }
  encryptedHexStr = CryptoJS.enc.Hex.parse(word)
  srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr)
  const decrypt = CryptoJS.AES.decrypt(srcs, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  })
  const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
  return decryptedStr.toString()
}

// 随机生产数字、小写/大写字母
export function generateRand() {
  const randNumber = Math.floor(Math.random() * 10)
  const str = []
  for (let i = 65; i < 91; i++) {
    str.push(String.fromCharCode(i))
  }
  const capitalLetters = str[Math.floor(Math.random() * 26) + 0]
  const str2 = []
  for (let i = 97; i < 123; i++) {
    str2.push(String.fromCharCode(i))
  }
  const LowercaseLetters = str2[Math.floor(Math.random() * 26) + 0]
  return randNumber + LowercaseLetters + capitalLetters
}

// JIEMI
export function DESDecrypt(str, md5) {
  const key = CryptoJS.enc.Utf8.parse(md5?.substring(0, 8)) // 密钥
  const iv = CryptoJS.enc.Utf8.parse(md5?.substring(md5.length - 8)) // 密钥偏移量
  let decrypted = CryptoJS.DES.decrypt(str, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  })
  decrypted = CryptoJS.enc.Utf8.stringify(decrypted)
  return decrypted
}

export function GetTM() {
  let str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  const str1 = uni.getStorageSync('systemCode')
  if (!str1) {
    return ''
  }
  const sNum = Math.floor(Math.random() * 10)
  const eNum = [2, 3, 4, 5, 6][Math.floor(Math.random() * 5)]
  const len = Math.floor(Math.random() * 10)
  const str2 = str1.slice(sNum, sNum + eNum)
  for (let i = 0; i < str2.length; i++) {
    str = str.replace(str2[i], '')
  }
  const arr = []
  while (arr.length < 15) {
    const rNumber = Math.floor(Math.random() * str.length)
    const child = str[rNumber]
    str = str.replace(child, '')
    arr.push(child)
  }
  const str3 = arr.join('')
  const str4 = str3.slice(len, len + str2.length)
  const res = `${str3.replace(str4, str2)}${sNum}${eNum}${len}`
  const k = 'BA9188088351243E7421F764307E2152'
  // return Encrypt(res, k, k.slice(-16));
  const res2 = `${res}${Encrypt(res.slice(13), k, k.slice(-16))}`
  return Encrypt(res2, k, k.slice(-16))
}
