import { Web3ReactProvider } from '@web3-react/core';
import Web3 from 'web3';

export function rootContainer(container: any) {
  return (
    <Web3ReactProvider getLibrary={(provider: any) => new Web3(provider)}>
      {container}
    </Web3ReactProvider>
  );
}
