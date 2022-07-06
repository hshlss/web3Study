import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import { default as Abi } from './web3/abi/box.json';
import type { AbiItem } from 'web3-utils';
import React, { useState } from 'react';
import Web3 from 'web3';
import { Button, InputAdornment, TextField } from '@mui/material';
import { fromWei, toWei } from '@/utils';

export type IDemoTwoProps = {};

const demoTwo: React.FC<IDemoTwoProps> = ({}) => {
  const [tokenBalance, setTokenBalance] = useState('');
  const [address, setAddress] = useState<string>('');
  const [token, setToken] = useState('');
  const [allowanceToken, setAllowanceToken] = useState('');
  const [name, setName] = useState<string>('');
  const [symbol, setSymbol] = useState<string>('');
  const [spenderAddress, setSpenderAddress] = useState<string>('');
  const [uintTokens, setUintTokens] = useState('');
  const [allowanceAddress, setAllowanceAddress] = useState<string>('');
  const [fromAddress, setFromAddress] = useState<string>('');
  const [toAddress, setToAddress] = useState<string>('');
  const [valueTokens, setValueTokens] = useState('');
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
    const decimals = await contract.methods.decimals().call();
    setTokenBalance(fromWei(token, decimals).toString());
  };
  const getName = async () => {
    const _name = await contract.methods.name().call();
    setName(_name);
    // debugger;
  };

  const getSymbolName = async () => {
    const symbolName = await contract.methods.symbol().call();
    setSymbol(symbolName);
  };

  const allowance = async () => {
    const decimals = await contract.methods.decimals().call();
    const tokenOwner = await contract.methods
      .allowance(account, allowanceAddress)
      .call();
    setAllowanceToken(fromWei(tokenOwner, decimals).toString());
  };

  const approve = async () => {
    try {
      const decimals = await contract.methods.decimals().call();
      const res = await contract.methods
        .approve(spenderAddress, toWei(uintTokens, decimals))
        .send({ from: account });
      if (res.status) {
        alert('授权成功!');
      }
    } catch (error) {
      if (error) {
        alert('授权失败，请重新填写');
      }
    }
  };

  const transferForm = async () => {
    try {
      const decimals = await contract.methods.decimals().call();
      console.log(fromAddress, '---', toAddress);
      console.log(account);

      const res = await contract.methods
        .transferFrom(fromAddress, toAddress, toWei(valueTokens, decimals))
        .send({ from: account });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const transfer = async () => {
    try {
      const decimals = await contract.methods.decimals().call();
      const res = await contract.methods
        .transfer(address, toWei(token, decimals))
        .send({ from: account });
      if (res.status) {
        alert('交易成功!');
      }
    } catch (error) {
      if (error) {
        alert('请重新填写');
      }
    }
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
      <br />
      <br />
      <TextField
        id="address"
        label="address"
        variant="outlined"
        onChange={(e) => {
          setAddress(e.target.value);
        }}
      />
      <TextField
        id="Token"
        label="Token"
        type="number"
        InputProps={{
          startAdornment: <InputAdornment position="start">wei</InputAdornment>,
        }}
        onChange={(e) => {
          setToken(e.target.value);
        }}
      />
      &nbsp;&nbsp;&nbsp;&nbsp;
      <Button variant="contained" onClick={transfer}>
        Transfer
      </Button>
      <br />
      <br />
      <TextField
        id="spenderAddress"
        label="spenderAddress"
        variant="outlined"
        onChange={(e) => {
          setSpenderAddress(e.target.value);
        }}
      />
      <TextField
        id="uintTokens"
        label="uintTokens"
        type="number"
        InputProps={{
          startAdornment: <InputAdornment position="start">wei</InputAdornment>,
        }}
        onChange={(e) => {
          setUintTokens(e.target.value);
        }}
      />
      &nbsp;&nbsp;&nbsp;&nbsp;
      <Button variant="contained" onClick={approve}>
        approve
      </Button>
      <br />
      <br />
      <TextField
        id="allowanceAddress"
        label="allowanceAddress"
        variant="outlined"
        onChange={(e) => {
          setAllowanceAddress(e.target.value);
        }}
      />
      &nbsp;&nbsp;&nbsp;&nbsp;
      <Button variant="contained" onClick={allowance}>
        allowance
      </Button>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <b>{allowanceToken}</b>
      <br />
      <br />
      <TextField
        id="fromAddress"
        label="fromAddress"
        variant="outlined"
        onChange={(e) => {
          setFromAddress(e.target.value);
        }}
      />
      <TextField
        id="toAddress"
        label="toAddress"
        variant="outlined"
        onChange={(e) => {
          setToAddress(e.target.value);
        }}
      />
      <TextField
        id="valueTokens"
        label="valueTokens"
        type="number"
        InputProps={{
          startAdornment: <InputAdornment position="start">wei</InputAdornment>,
        }}
        onChange={(e) => {
          setValueTokens(e.target.value);
        }}
      />
      &nbsp;&nbsp;&nbsp;&nbsp;
      <Button variant="contained" onClick={transferForm}>
        transferForm
      </Button>
    </div>
  );
};

export default demoTwo;
