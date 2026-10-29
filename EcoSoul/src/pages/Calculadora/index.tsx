import { Link } from 'react-router-dom';
import Card from '../../components/Card/Card';
import { Carregando, ErroCarregamento } from '../../components/EstadoApi/EstadoApi';
import FormularioCalculo from '../../components/FormularioCalculo/FormularioCalculo';
import TituloPagina from '../../components/TituloPagina/TituloPagina';
import { useAviso } from '../../contexto/AvisoContexto';
import { formatarDinheiro, formatarNumero, nomesTransporte } from '../../dados/calculo';
import type { DadosCalculo } from '../../dados/tipos';
import { useRequisicao } from '../../hooks/useRequisicao';
import { criarCalculo, listarCalculos } from '../../services/calculo';

export default function Calculadora() {
  const { estado, recarregar } = useRequisicao(listarCalculos);
  const { mostrarAviso } = useAviso();

  async function salvar(dados: DadosCalculo) {
    const calculo = await criarCalculo(dados);
    mostrarAviso(
      `Cálculo salvo! Você deixou de emitir ${formatarNumero(calculo.co2Economizado, 3)} kg de CO₂ e ganhou ${calculo.pontos} pontos.`,
      'sucesso'
    );
    recarregar();
  }

  return (
    <>
      <TituloPagina
        title="Calculadora de CO₂"
        description="Informe um trajeto de transporte público e descubra quanto CO₂ você deixou de emitir, os pontos e o cashback que ganhou."
        eyebrow="CALCULADORA / INTEGRAÇÃO COM A API JAVA"
      />
      <div className="grid items-start gap-7 lg:grid-cols-[1fr_1.3fr]">
        <Card>
          <h2 className="mb-5 text-2xl font-bold">Novo cálculo</h2>
          <FormularioCalculo textoBotao="Calcular e salvar →" onSalvar={salvar} limparAoSalvar />
        </Card>

        <Card>
          <h2 className="mb-5 text-2xl font-bold">Cálculos salvos</h2>
          {estado.status === 'carregando' && <Carregando texto="Buscando cálculos…" />}
          {estado.status === 'erro' && (
            <ErroCarregamento mensagem={estado.mensagem} onTentarNovamente={recarregar} />
          )}
          {estado.status === 'sucesso' && estado.dados.length === 0 && (
            <p className="rounded-lg bg-teal-50 p-5 text-teal-900">
              Nenhum cálculo salvo ainda. Use o formulário para fazer o primeiro.
            </p>
          )}
          {estado.status === 'sucesso' && estado.dados.length > 0 && (
            <ul className="grid gap-3 sm:grid-cols-2">
              {estado.dados.map((calculo) => (
                <li key={calculo.id}>
                  <Link
                    to={`/calculadora/${calculo.id}`}
                    className="block h-full rounded-lg border border-slate-200 p-4 transition-colors hover:border-teal-700 hover:bg-teal-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-800"
                  >
                    <p className="truncate font-bold">{calculo.nome}</p>
                    <p className="text-sm text-slate-600">
                      {nomesTransporte[calculo.tipoTransporte]} · {formatarNumero(calculo.distanciaKm)} km
                    </p>
                    <p className="mt-2 text-sm font-semibold text-teal-800">
                      {formatarNumero(calculo.co2Economizado, 3)} kg CO₂ ·{' '}
                      {formatarDinheiro(calculo.cashback)}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </>
  );
}
