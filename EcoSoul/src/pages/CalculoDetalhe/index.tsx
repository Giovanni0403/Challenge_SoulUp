import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Botao, LinkBotao } from '../../components/Botao/Botao';
import Card from '../../components/Card/Card';
import { Carregando, ErroCarregamento } from '../../components/EstadoApi/EstadoApi';
import FormularioCalculo from '../../components/FormularioCalculo/FormularioCalculo';
import TituloPagina from '../../components/TituloPagina/TituloPagina';
import { useAviso } from '../../contexto/AvisoContexto';
import { formatarDinheiro, formatarNumero, nomesTransporte } from '../../dados/calculos';
import type { DadosCalculo } from '../../dados/tipos';
import { useRequisicao } from '../../hooks/useRequisicao';
import { atualizarCalculo, buscarCalculo, excluirCalculo } from '../../services/calculos';

export default function CalculoDetalhe() {
  const { id } = useParams<{ id: string }>();
  const idValido = /^\d+$/.test(id ?? '');
  const navigate = useNavigate();
  const { mostrarAviso } = useAviso();
  const [editando, setEditando] = useState(false);
  const [excluindo, setExcluindo] = useState(false);

  const buscar = useCallback(() => buscarCalculo(Number(id)), [id]);
  const { estado, recarregar } = useRequisicao(buscar);
  const naoEncontrado = !idValido || (estado.status === 'erro' && estado.codigo === 404);

  // Id inexistente: volta para a lista e explica o motivo.
  useEffect(() => {
    if (naoEncontrado) {
      mostrarAviso(`O cálculo "${id}" não existe ou já foi excluído.`, 'erro');
      navigate('/calculadora', { replace: true });
    }
  }, [naoEncontrado, id, navigate, mostrarAviso]);

  async function salvar(dados: DadosCalculo) {
    await atualizarCalculo(Number(id), dados);
    mostrarAviso('Cálculo atualizado com sucesso.', 'sucesso');
    setEditando(false);
    recarregar();
  }

  async function excluir() {
    if (!window.confirm('Tem certeza que deseja excluir este cálculo?')) return;
    setExcluindo(true);
    try {
      await excluirCalculo(Number(id));
      mostrarAviso('Cálculo excluído.', 'sucesso');
      navigate('/calculadora');
    } catch (erro) {
      mostrarAviso(erro instanceof Error ? erro.message : 'Erro ao excluir.', 'erro');
      setExcluindo(false);
    }
  }

  if (naoEncontrado) return null;
  return (
    <>
      <TituloPagina
        title={`Cálculo #${id}`}
        description="Veja o resultado salvo na API, edite os dados do trajeto ou exclua o registro."
        eyebrow="CALCULADORA / DETALHES DO CÁLCULO"
      />
      <Card className="mx-auto max-w-3xl">
        {estado.status === 'carregando' && <Carregando texto="Buscando cálculo…" />}
        {estado.status === 'erro' && (
          <ErroCarregamento mensagem={estado.mensagem} onTentarNovamente={recarregar} />
        )}
        {estado.status === 'sucesso' && editando && (
          <>
            <h2 className="mb-5 text-2xl font-bold">Editar cálculo</h2>
            <FormularioCalculo
              valoresIniciais={{
                nome: estado.dados.nome,
                tipoTransporte: estado.dados.tipoTransporte,
                distanciaKm: estado.dados.distanciaKm
              }}
              textoBotao="Salvar alterações"
              onSalvar={salvar}
              onCancelar={() => setEditando(false)}
            />
          </>
        )}
        {estado.status === 'sucesso' && !editando && (
          <>
            <h2 className="text-2xl font-bold break-words">{estado.dados.nome}</h2>
            <p className="mt-1 text-slate-600">
              {nomesTransporte[estado.dados.tipoTransporte]} ·{' '}
              {formatarNumero(estado.dados.distanciaKm)} km
            </p>
            <dl className="my-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-lg bg-teal-50 p-4">
                <dt className="text-sm text-teal-900">CO₂ economizado</dt>
                <dd className="text-2xl font-bold text-teal-800">
                  {formatarNumero(estado.dados.co2Economizado, 3)} kg
                </dd>
              </div>
              <div className="rounded-lg bg-teal-50 p-4">
                <dt className="text-sm text-teal-900">Pontos</dt>
                <dd className="text-2xl font-bold text-teal-800">{estado.dados.pontos}</dd>
              </div>
              <div className="rounded-lg bg-teal-50 p-4">
                <dt className="text-sm text-teal-900">Cashback</dt>
                <dd className="text-2xl font-bold text-teal-800">
                  {formatarDinheiro(estado.dados.cashback)}
                </dd>
              </div>
            </dl>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Botao onClick={() => setEditando(true)}>Editar</Botao>
              <Botao
                variant="secondary"
                className="text-red-700 ring-red-700/30 hover:bg-red-50"
                onClick={excluir}
                disabled={excluindo}
              >
                {excluindo ? 'Excluindo…' : 'Excluir'}
              </Botao>
              <LinkBotao to="/calculadora" variant="secondary" className="sm:ml-auto">
                ← Voltar
              </LinkBotao>
            </div>
          </>
        )}
      </Card>
    </>
  );
}
