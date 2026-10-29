import { createContext, useContext } from 'react';
import type { TipoAviso } from '../dados/tipos';

export interface Aviso {
  texto: string;
  tipo: TipoAviso;
}

export interface AvisoContextoValor {
  aviso: Aviso | null;
  mostrarAviso: (texto: string, tipo?: TipoAviso) => void;
  fecharAviso: () => void;
}

export const AvisoContexto = createContext<AvisoContextoValor | null>(null);

export function useAviso() {
  const contexto = useContext(AvisoContexto);
  if (!contexto) {
    throw new Error('useAviso precisa estar dentro de <AvisoProvider>.');
  }
  return contexto;
}
