import BigNumber from 'bignumber.js';

// account 地址缩写
export function toOmitAccount(account: string) {
  if (account.length <= 10) return account;
  return `${account?.substr(0, 6)}...${account?.substr(
    account?.length - 4,
    4,
  )}`;
}

// 去精度
export const fromWei = (value: string | number, decimals: number = 18) => {
  return new BigNumber(value).dividedBy(new BigNumber(10).pow(decimals));
};
// 加精度
export const toWei = (value: number | string, decimals: number = 18) => {
  return new BigNumber(value).multipliedBy(new BigNumber(10).pow(decimals));
};
