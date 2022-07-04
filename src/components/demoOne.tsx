import { Web3Provider } from '@ethersproject/providers';
import { Button } from '@mui/material';
import { useWeb3React } from '@web3-react/core';
import React, { useEffect, useState } from 'react';
import { injected } from './web3';

export type IDemoOneProps = {};

const demoOne: React.FC<IDemoOneProps> = ({}) => {
  const [balance, setBalance] = useState<any>(0);

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

  useEffect(() => {
    if (localStorage.getItem('isActivate')) {
      connect();
    }
  }, []);

  async function connect() {
    try {
      await activate(injected);
      localStorage.setItem('isActivate', 'true');
      if (account) {
        setBalance(library?.getBalance(account));
      }
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
      钱包余额:&nbsp;&nbsp;{balance}
      <br />
      <br />
      当前ChinaId:&nbsp;&nbsp;<b>{chainId}</b>
      <br />
      <br />
      <Button
        variant="contained"
        onClick={() => {
          if (account && library) {
            console.log(library);
            library
              .getSigner(account)
              .signMessage('👋')
              .then((signature: any) => {
                window.alert(`Success!\n\n${signature}`);
              })
              .catch((error: any) => {
                window.alert(
                  'Failure!' +
                    (error && error.message ? `\n\n${error.message}` : ''),
                );
              });
          }
        }}
      >
        Sign Message
      </Button>
    </>
  );
};

export default demoOne;
