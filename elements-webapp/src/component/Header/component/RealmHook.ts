import { useEffect, useState } from 'react';
import { IRealm } from '@type/Realm';
import RealmApi from '@shared/api/RealmApi';
import { SessionUtil } from '@shared/util/SessionUtil';

export type RealmHook = {
  realms: IRealm[],
  current: IRealm,
  load: () => Promise<void>,
  setRealm: (value: IRealm) => void,
}

const useRealms = (): RealmHook => {
  const [realms, setRealms] = useState<IRealm[]>([]);
  const [current, setCurrent] = useState<IRealm>();

  useEffect(() => {
    void initialLoad();
  }, [])

  const initialLoad = async (): Promise<void> => {
    const realms = await RealmApi.getMine() || [];
    setRealms(realms);
    const sessionRealm = SessionUtil.getRealm();
    if (sessionRealm && realms.find(r => r.id === sessionRealm.id)) {
      setCurrent(sessionRealm);
    }
  }

  const setRealm = (newRealm: IRealm): void => {
    SessionUtil.setRealm(newRealm);
    setCurrent(newRealm);
  }

  const load = async (): Promise<void> => {
    const realms = await RealmApi.getMine();
    setRealms(realms);
  }

  return {
    realms,
    current,
    load,
    setRealm,
  };
}

export default useRealms;
