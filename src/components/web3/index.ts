import { InjectedConnector } from '@web3-react/injected-connector';
export const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42],
});

export const AddEthereumChainParams: { [key: number]: any } = {
  97: {
    chainId: '0x61',
    chainName: 'Binance Smart Chain Testnet',
    rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545'],
    blockExplorerUrls: ['https://testnet.bscscan.com'],
    nativeCurrency: {
      name: 'Binance Smart Chain Testnet',
      symbol: 'tBNB',
      decimals: 18,
    },
  },
  56: {
    chainId: '0x38',
    chainName: 'Binance Smart Chain Mainnet',
    nativeCurrency: {
      name: 'BNB',
      symbol: 'bnb',
      decimals: 18,
    },
    rpcUrls: [
      'https://bsc-dataseed1.ninicoin.io',
      'https://bsc-dataseed1.defibit.io',
      'https://bsc-dataseed.binance.org',
    ],
    blockExplorerUrls: ['https://bscscan.com/'],
  },
};
