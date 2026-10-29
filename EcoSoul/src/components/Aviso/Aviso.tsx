import { useEffect } from 'react';
import { useAviso } from '../../contexto/AvisoContexto';
import type { TipoAviso } from '../../dados/tipos';

const estilos: Record<TipoAviso, string> = {
  sucesso: 'border-teal-700 bg-teal-50 text-teal-900',
  erro: 'border-red-700 bg-red-50 text-red-900',
  info: 'border-[#075c62] bg-white text-[#0d2225]'
};

export default function Aviso() {
  const { aviso, fecharAviso } = useAviso();

  // O aviso some sozinho depois de 6 segundos.
  useEffect(() => {
    if (!aviso) return;
    const temporizador = setTimeout(fecharAviso, 6000);
    return () => clearTimeout(temporizador);
  }, [aviso, fecharAviso]);

  return (
    <div role="status" aria-live="polite" className="mx-auto w-full max-w-6xl px-5 md:px-8">
      {aviso && (
        <div
          className={`mt-5 flex items-start justify-between gap-4 rounded-lg border-l-4 p-4 shadow-sm ${estilos[aviso.tipo]}`}
        >
          <p className="leading-relaxed">{aviso.texto}</p>
          <button
            type="button"
            onClick={fecharAviso}
            aria-label="Fechar aviso"
            className="shrink-0 rounded px-2 text-xl leading-none hover:opacity-70 focus-visible:outline-2 focus-visible:outline-teal-800"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}
