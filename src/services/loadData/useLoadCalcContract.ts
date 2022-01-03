import { ethers } from 'ethers';
import { useMemo } from 'react';
import { addressMap } from '../addresses/addresses';
import changelog from '../addresses/changelog.json';
import { useEthCall } from '../utils/contracts';

const { formatUnits } = ethers.utils;

const useLoadCalcContract = (ilksKeys?: string[]) => {
  const defaultIlks = useMemo(
    () => ilksKeys || Object.keys(addressMap.ILKS),
    [ilksKeys],
  );
  const contractsParams = useMemo(
    () => getContractsParams(defaultIlks),
    [defaultIlks],
  );
  const { dataMap: ethCallMap, loading, error } = useEthCall(contractsParams);
  const calcMap = useMemo(() => {
    const newMap = new Map();
    defaultIlks?.forEach((ilk) => {
      const cut = ethCallMap.get(`${ilk}--cut`);
      const step = ethCallMap.get(`${ilk}--step`);
      newMap.set(`${ilk}--cut`, cut ? formatUnits(cut, 27) : '');
      newMap.set(
        `${ilk}--step`,
        step ? (step as ethers.BigNumber).toString() : '',
      );
    });
    return newMap;
  }, [defaultIlks, ethCallMap]);
  return { calcMap, loading, error };
};

const getContractsParams = (ilks: string[]) =>
  ilks.map((ilk) => {
    const clipName = 'MCD_CLIP_CALC_ETH_A';
    const address = (changelog as Record<string, string>)[clipName];
    return {
      id: ilk,
      address,
      abi: 'StairstepExponentialDecrease',
      params: [{ name: 'cut' }, { name: 'step' }],
    };
  });

export default useLoadCalcContract;
