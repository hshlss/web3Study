import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import { default as Abi } from './web3/abi/box.json';
import type { AbiItem } from 'web3-utils';
import React, { useState } from 'react';
import Web3 from 'web3';
import { Button } from '@mui/material';

export type IDemoTwoProps = {};

const demoTwo: React.FC<IDemoTwoProps> = ({}) => {
  const [tokenBalance, setTokenBalance] = useState('');
  const [name, setName] = useState<string>('');
  const [symbol, setSymbol] = useState<string>('');
  const web3 = new Web3(Web3.givenProvider);
  const context = useWeb3React<Web3Provider>();
  const {
    connector,
    library,
    chainId,
    account,
    activate,
    deactivate,
    active,
    error,
  } = context;
  const abiType = (abi: unknown): AbiItem => abi as AbiItem;
  const contract = new web3.eth.Contract(
    abiType(Abi),
    '0x50FD5631eB2e80B6F21307f276ABd9f9CFdb3372',
  );
  const getToken = async () => {
    const token = await contract.methods.balanceOf(account).call();
    setTokenBalance(token);
  };
  const getName = async () => {
    const _name = await contract.methods.name().call();
    setName(_name);
    // debugger;
    // console.log(_name);
    // alert(_name);
  };

  const getSymbolName = async () => {
    const symbolName = await contract.methods.symbol().call();
    setSymbol(symbolName);
  };
  return (
    <div>
      <Button variant="contained" onClick={getName}>
        获取ERC20的Name
      </Button>
      &nbsp;&nbsp;&nbsp;&nbsp;<b>{name}</b>
      <br />
      <br />
      <Button variant="contained" onClick={getSymbolName}>
        获取ERC20的Symbol
      </Button>
      &nbsp;&nbsp;&nbsp;&nbsp;<b>{symbol}</b>
      <br />
      <br />
      <Button variant="contained" onClick={getToken}>
        获取ERC20的Token余额
      </Button>
      &nbsp;&nbsp;&nbsp;&nbsp;<b>{tokenBalance}</b>
    </div>
  );
};

export default demoTwo;
