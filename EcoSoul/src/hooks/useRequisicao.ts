import { useEffect, useState } from 'react';
import type { EstadoRequisicao } from '../dados/tipos';
import { ErroApi } from '../services/api';

// Executa uma função da camada de serviço e guarda o estado:
// carregando, erro ou sucesso (com os dados tipados).
// A função `buscar` deve ser estável (definida fora do componente ou com useCallback).
export function useRequisicao<T>(buscar: () => Promise<T>) {
  const [estado, setEstado] = useState<EstadoRequisicao<T>>({ status: 'carregando' });
  const [tentativa, setTentativa] = useState(0);

  useEffect(() => {
    // Evita atualizar o estado se o componente sair da tela antes da resposta.
    let ativo = true;
    buscar()
      .then((dados) => {
        if (ativo) setEstado({ status: 'sucesso', dados });
      })
      .catch((erro: unknown) => {
        if (ativo) {
          setEstado({
            status: 'erro',
            mensagem: erro instanceof Error ? erro.message : 'Erro inesperado.',
            codigo: erro instanceof ErroApi ? erro.status : undefined
          });
        }
      });
    return () => {
      ativo = false;
    };
  }, [buscar, tentativa]);

  function recarregar() {
    setEstado({ status: 'carregando' });
    setTentativa((valor) => valor + 1);
  }

  return { estado, recarregar };
}
