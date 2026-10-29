import { useCallback, useState } from 'react';
import type { ReactNode } from 'react';
import type { TipoAviso } from '../dados/tipos';
import { AvisoContexto } from './AvisoContexto';
import type { Aviso } from './AvisoContexto';

export default function AvisoProvider({ children }: { children: ReactNode }) {
  const [aviso, setAviso] = useState<Aviso | null>(null);

  // useCallback mantém as funções iguais entre renderizações,
  // assim os useEffect que dependem delas não rodam à toa.
  const mostrarAviso = useCallback((texto: string, tipo: TipoAviso = 'info') => {
    setAviso({ texto, tipo });
  }, []);

  const fecharAviso = useCallback(() => {
    setAviso(null);
  }, []);

  return (
    <AvisoContexto.Provider value={{ aviso, mostrarAviso, fecharAviso }}>
      {children}
    </AvisoContexto.Provider>
  );
}
