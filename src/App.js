import React, { useEffect, useState } from "react";

import { InfuraProvider } from "@ethersproject/providers";
// import { formatBytes32String } from '@ethersproject/strings';
import { Contract, Provider } from "ethcall";
// import BigNumber from 'bignumber.js';

// import vatAbi from './abi/maker/vat.json';
// import jugAbi from './abi/maker/jug.json';
// import spotAbi from './abi/maker/spot.json';
// import potAbi from './abi/maker/pot.json';
// import catAbi from './abi/maker/cat.json';
// import flipAbi from './abi/maker/flip.json';
// import flapAbi from './abi/maker/flap.json';
// import flopAbi from './abi/maker/flop.json';
// import vowAbi from './abi/maker/vow.json';
import pauseAbi from "./abi/maker/pause.json";
import esmAbi from "./abi/maker/esm.json";
import endAbi from "./abi/maker/end.json";

 import Formatter from './utils/formatter';
// import Converter from '@/utils/converter';

const infuraKey = "2c010c2fdb8b4ef1a7617571553fc982";
const provider = new InfuraProvider("mainnet", infuraKey);

// const ilkIds = [
// 	'ETH-A',
// 	'ETH-B',
// 	'USDC-A',
// 	'USDC-B',
// 	'TUSD-A',
// 	'USDT-A',
// 	'PAXUSD-A',
// 	'WBTC-A',
// 	'BAT-A',
// 	'KNC-A',
// 	'ZRX-A',
// 	'MANA-A',
// 	'LRC-A',
// 	'COMP-A',
// 	'LINK-A',
// 	'BAL-A',
// 	'YFI-A',
// 	'GUSD-A',
// 	'RENBTC-A',
// 	'UNI-A',
// 	'AAVE-A',
// 	'UNIV2DAIETH-A',
// 	// 'SAI',
// ];

const addresses = {
  vat: "0x35D1b3F3D7966A1DFe207aa4514C12a259A0492B",
  jug: "0x19c0976f590D67707E62397C87829d896Dc0f1F1",
  spot: "0x65C79fcB50Ca1594B025960e539eD7A9a6D434A3",
  pot: "0x197E90f9FAD81970bA7976f33CbD77088E5D7cf7",
  cat: "0xa5679C04fc3d9d8b0AaB1F0ab83555b301cA70Ea",
  flip: {
    "ETH-A": "0xF32836B9E1f47a0515c6Ec431592D5EbC276407f",
    "ETH-B": "0xD499d71bE9e9E5D236A07ac562F7B6CeacCa624c",
    "WBTC-A": "0x58CD24ac7322890382eE45A3E4F903a5B22Ee930",
    "BAT-A": "0xF7C569B2B271354179AaCC9fF1e42390983110BA",
    "KNC-A": "0x57B01F1B3C59e2C0bdfF3EC9563B71EEc99a3f2f",
    "ZRX-A": "0xa4341cAf9F9F098ecb20fb2CeE2a0b8C78A18118",
    "MANA-A": "0x0a1D75B4f49BA80724a214599574080CD6B68357",
    "USDC-A": "0xbe359e53038E41a1ffA47DAE39645756C80e557a",
    "USDC-B": "0x77282aD36aADAfC16bCA42c865c674F108c4a616",
    "TUSD-A": "0x9E4b213C4defbce7564F2Ac20B6E3bF40954C440",
    "USDT-A": "0x667F41d0fDcE1945eE0f56A79dd6c142E37fCC26",
    "PAXUSD-A": "0x52D5D1C05CC79Fc24A629Cb24cB06C5BE5d766E7",
    "LRC-A": "0x7FdDc36dcdC435D8F54FDCB3748adcbBF70f3dAC",
    "COMP-A": "0x524826F84cB3A19B6593370a5889A58c00554739",
    "LINK-A": "0xB907EEdD63a30A3381E6D898e5815Ee8c9fd2c85",
    "BAL-A": "0xb2b9bd446eE5e58036D2876fce62b7Ab7334583e",
    "YFI-A": "0xEe4C9C36257afB8098059a4763A374a4ECFE28A7",
    "GUSD-A": "0xCAa8D152A8b98229fB77A213BE16b234cA4f612f",
    "RENBTC-A": "0x30BC6eBC27372e50606880a36B279240c0bA0758",
    "UNI-A": "0xF5b8cD9dB5a0EC031304A7B815010aa7761BD426",
    "AAVE-A": "0x16e1b844094c885a37509a8f76c533B5fbFED13a",
    "UNIV2DAIETH-A": "0x57dfd99f45747DD55C1c432Db4aEa07FBd5d2B5c",
    // 'SAI': '0x5432b2f3c0DFf95AA191C45E5cbd539E2820aE72',
  },
  flap: "0xC4269cC7acDEdC3794b221aA4D9205F564e27f0d",
  flop: "0xA41B6EF151E06da0e34B009B86E828308986736D",
  vow: "0xA950524441892A31ebddF91d3cEEFa04Bf454466",
  pause: "0xbE286431454714F511008713973d3B053A2d38f3",
  esm: "0x0581A0AbE32AAe9B5f0f68deFab77C6759100085",
  end: "0xaB14d3CE3F733CACB76eC2AbE7d2fcb00c99F3d5",
};

// const vatContract = new Contract(addresses.vat, vatAbi);
// const jugContract = new Contract(addresses.jug, jugAbi);
// const spotContract = new Contract(addresses.spot, spotAbi);
// const potContract = new Contract(addresses.pot, potAbi);
// const catContract = new Contract(addresses.cat, catAbi);
// const flapContract = new Contract(addresses.flap, flapAbi);
// const flopContract = new Contract(addresses.flop, flopAbi);
// const vowContract = new Contract(addresses.vow, vowAbi);
const pauseContract = new Contract(addresses.pause, pauseAbi);
const esmContract = new Contract(addresses.esm, esmAbi);
const endContract = new Contract(addresses.end, endAbi);


function getUtilization(asset, art, rate, line) {
  const artNumber = new BigNumber(art);
  return artNumber.times(rate).div(line).toNumber();
}

function formatAmount(value) {
  return Formatter.formatMultiplier(Converter.fromWad(value), 0);
}

function formatDaiAmount(value) {
  return Formatter.formatMultiplier(Converter.fromWad(Converter.fromRay(value)), 0);
}

function formatRatio(value) {
  return Formatter.formatRatio(value);
}

function formatRayRatio(value) {
  return Formatter.formatRatio(Converter.fromRay(value));
}

function formatRayRate(value) {
  return Formatter.formatRate(Converter.fromRay(value));
}

function formatWadRate(value) {
  return Formatter.formatRate(Converter.fromWad(value));
}

function formatFee(value) {
  return Formatter.formatFee(Converter.fromRay(value));
}

function formatDuration(value) {
  return Formatter.formatDuration(value);
}

function getEtherscanLink(contract) {
  const contractAddress = addresses[contract];
  return `https://etherscan.io/address/${contractAddress}`;
}


function App() {
  const [stateGeneral, setStateGeneral] = useState({});

  async function _loadMisc() {
    const ethcallProvider = new Provider();
    await ethcallProvider.init(provider);

    const pauseDelayCall = pauseContract.delay();
    const esmMinCall = esmContract.min();
    const endWaitCall = endContract.wait();

    const calls = [pauseDelayCall, esmMinCall, endWaitCall];

    const data = await ethcallProvider.all(calls);
    const pauseDelay = data[0];
    const esmMin = data[1];
    const endWait = data[2];
    let state = {};
    state.pauseDelay = formatDuration(pauseDelay.toNumber());
    state.esmMin = formatAmount(esmMin.toString());
    state.endWait =formatDuration(endWait.toNumber());
    setStateGeneral(state);
  }

  useEffect(() => {
    _loadMisc();
  }, []);

  console.log(stateGeneral);

  return (
    <div style={{ background: "gray", padding: "2rem" }}>
      <div style={{ display: "flex" }}>
        <div>
          <span>
            <h3>Misc</h3>
            <h4>Flap,ESM,End</h4>
          </span>
          <div style={{ display: "flex",alignItems:'center' }}>
            Timelock
            <div>(Pause_delay)</div>
            <h3>{stateGeneral.pauseDelay}</h3>
          </div>

           <div style={{ display: "flex",alignItems:'center' }}>
            ES amount
            <div>(ESM_min)</div>
            <h3>{stateGeneral.esMin}</h3>
          </div>

        </div>
        
      </div>


    </div>
  );
}

export default App;
