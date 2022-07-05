import { Web3Provider } from '@ethersproject/providers';
import Snackbar from '@mui/material/Snackbar';
import { Alert, Button } from '@mui/material';
import { useWeb3React } from '@web3-react/core';
import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import { AddEthereumChainParams, injected } from './web3';
import { fromWei } from '@/utils';

export type IDemoOneProps = {};

const demoOne: React.FC<IDemoOneProps> = ({}) => {
  const [balance, setBalance] = useState<any>(0);
  const [open, setOpen] = useState<boolean>(false);
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
  const provider = Web3.givenProvider; //当前正在使用的provider

  useEffect(() => {
    if (localStorage.getItem('isActivate')) {
      connect();
    }
  }, []);
  useEffect(() => {
    if (!!account && !!library) {
      gBalance();
    }
    setBalance(0);
  }, [account, library]);

  async function gBalance() {
    try {
      if (account) {
        setBalance(await web3.eth.getBalance(account));
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function connect() {
    try {
      await activate(injected);

      localStorage.setItem('isActivate', 'true');
    } catch (ex) {
      console.log(ex);
    }
  }

  async function disconnect() {
    try {
      deactivate();
    } catch (ex) {
      console.log(ex);
    }
  }

  async function signature() {
    if (!account || !chainId) {
      return setOpen(true);
    }
    try {
      await web3.eth.personal.sign('👋', account, '👋');
    } catch (error) {
      console.log(error);
    }
  }
  //修改连接chainId的节点
  async function addOrChangeNetWork(id: number) {
    if (!account || !chainId) {
      return setOpen(true);
    }
    try {
      //通过当前正在使用的provider去发请求切换chainId
      await provider.request({
        method: 'wallet_switchEthereumChain',
        params: [
          {
            chainId: Web3.utils.numberToHex(id), //链id
          },
        ],
      });
    } catch (error) {
      console.log(error);
    }
  }

  //添加chainId
  async function addChainId(chain: number) {
    if (!account || !chainId) {
      return setOpen(true);
    }
    try {
      return await provider.request({
        method: 'wallet_addEthereumChain',
        params: [AddEthereumChainParams[chain]],
      });
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <Button variant="contained" onClick={connect}>
        Contained
      </Button>{' '}
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      {active ? (
        <span>
          Connected with <b>{account}</b>
        </span>
      ) : (
        <span>Not connected</span>
      )}
      <br />
      <br />
      <Button variant="contained" onClick={disconnect}>
        Disconnect
      </Button>
      <br />
      <br />
      钱包余额:&nbsp;&nbsp;{fromWei(balance, 18).toString()}
      <br />
      <br />
      当前ChinaId:&nbsp;&nbsp;<b>{chainId}</b>
      <br />
      <br />
      <Button variant="contained" onClick={signature}>
        Sign Message
      </Button>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
        onClose={() => {
          setOpen(false);
        }}
      >
        <Alert severity="error" sx={{ width: '100%' }}>
          Please connect to your wallet
        </Alert>
      </Snackbar>
      <br />
      <br />
      <Button
        variant="contained"
        onClick={() => {
          addOrChangeNetWork(chainId === 1 ? 4 : 1);
        }}
      >
        切换Ethereum/Rinkeby节点
      </Button>
      <br />
      <br />
      添加Chain节点&nbsp;&nbsp;
      <Button
        variant="contained"
        onClick={() => {
          addChainId(97);
        }}
      >
        tBNB
      </Button>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <Button
        variant="contained"
        onClick={() => {
          addChainId(56);
        }}
      >
        BNB
      </Button>
    </>
  );
};

export default demoOne;
