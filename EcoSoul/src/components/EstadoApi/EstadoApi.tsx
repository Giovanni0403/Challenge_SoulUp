import { Botao } from '../Botao/Botao';

// Mensagens padrão para os estados de carregamento e erro das telas que usam a API.
export function Carregando({ texto = 'Carregando…' }: { texto?: string }) {
  return (
    <div role="status" aria-live="polite" className="flex items-center gap-3 py-6 text-slate-700">
      <span
        aria-hidden="true"
        className="size-5 animate-spin rounded-full border-2 border-teal-700 border-t-transparent"
      />
      <div>
        <p className="font-semibold">{texto}</p>
        <p className="text-sm text-slate-500">
          A API fica hospedada no Render e pode levar até 1 minuto para responder na primeira vez.
        </p>
      </div>
    </div>
  );
}

type ErroCarregamentoProps = {
  mensagem: string;
  onTentarNovamente: () => void;
};

export function ErroCarregamento({ mensagem, onTentarNovamente }: ErroCarregamentoProps) {
  return (
    <div role="alert" className="rounded-lg bg-red-50 p-5 text-red-900">
      <p className="font-semibold">Não foi possível carregar os dados.</p>
      <p className="mt-1 text-sm">{mensagem}</p>
      <Botao variant="secondary" className="mt-4" onClick={onTentarNovamente}>
        Tentar novamente
      </Botao>
    </div>
  );
}
