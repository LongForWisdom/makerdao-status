/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import { Contract } from 'ethcall';
import { ethers } from 'ethers';
import catAbi from './abi/maker/cat.json';
import DssDirectDepositAaveDai from './abi/maker/DssDirectDepositAaveDai.json';
import dssFlashAbi from './abi/maker/dssFlash.json';
import endAbi from './abi/maker/end.json';
import ERC20 from './abi/maker/ERC20.json';
import esmAbi from './abi/maker/esm.json';
import flapAbi from './abi/maker/flap.json';
import flopAbi from './abi/maker/flop.json';
import jugAbi from './abi/maker/jug.json';
import pauseAbi from './abi/maker/pause.json';
import potAbi from './abi/maker/pot.json';
import spotAbi from './abi/maker/spot.json';
import vatAbi from './abi/maker/vat.json';
import vowAbi from './abi/maker/vow.json';
import { addressMap } from './addresses/addresses';
import { infuraCurrentProvider } from './infura';
import changelog from './addresses/changelog.json';

export const vatContract = new Contract(changelog.MCD_VAT, vatAbi);
export const jugContract = new Contract(changelog.MCD_JUG, jugAbi);
export const spotContract = new Contract(changelog.MCD_SPOT, spotAbi);
export const potContract = new Contract(changelog.MCD_POT, potAbi);
export const catContract = new Contract(changelog.MCD_CAT, catAbi);
export const flapContract = new Contract(changelog.MCD_FLAP, flapAbi);
export const flopContract = new Contract(changelog.MCD_FLOP, flopAbi);
export const vowContract = new Contract(changelog.MCD_VOW, vowAbi);
export const pauseContract = new Contract(changelog.MCD_PAUSE, pauseAbi);
export const esmContract = new Contract(addressMap.GENERALS.ESM, esmAbi);
export const endContract = new Contract(addressMap.GENERALS.END, endAbi);
export const dssFlashContract = new Contract(changelog.MCD_FLASH, dssFlashAbi);

export const weth = new Contract(changelog.ETH, ERC20);

export const d3mAdaiContract = new Contract(
  changelog.MCD_JOIN_DIRECT_AAVEV2_DAI,
  DssDirectDepositAaveDai,
);

export const buildContract = (address: string, nameAbiJson: string) => {
  const contract = require(`./abi/maker/${nameAbiJson}.json`);
  return new ethers.Contract(address, contract, infuraCurrentProvider);
};
