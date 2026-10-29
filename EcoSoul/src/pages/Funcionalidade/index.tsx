import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Botao } from '../../components/Botao/Botao';
import Card from '../../components/Card/Card';
import TituloPagina from '../../components/TituloPagina/TituloPagina';
import { useAviso } from '../../contexto/AvisoContexto';
import { features } from '../../dados/project';

export default function Funcionalidade() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { mostrarAviso } = useAviso();
  const feature = features.find((item) => item.slug === slug);

  // Se o endereço não existir, volta para a lista e explica o motivo.
  useEffect(() => {
    if (!feature) {
      mostrarAviso(
        `Não encontramos a funcionalidade "${slug}". Escolha uma das telas abaixo.`,
        'erro'
      );
      navigate('/app', { replace: true });
    }
  }, [feature, slug, navigate, mostrarAviso]);

  if (!feature) return null;
  return (
    <>
      <TituloPagina
        title={feature.title}
        description={feature.description}
        eyebrow="APP / DETALHES DA FUNCIONALIDADE"
      />
      <Card className="grid items-center gap-8 md:grid-cols-2">
        <div className="rounded-xl bg-teal-50 p-6">
          <img
            src={`/img/${feature.image}`}
            alt={`Protótipo: ${feature.title}`}
            className="mx-auto max-h-[520px] max-w-full object-contain"
          />
        </div>
        <div>
          <p className="text-xs font-bold tracking-widest text-teal-700">
            COMO FUNCIONA NA PROPOSTA
          </p>
          <h2 className="mt-3 text-2xl font-bold">Seu próximo passo</h2>
          <ol className="my-6 space-y-5">
            {feature.steps.map((step, index) => (
              <li key={step} className="flex gap-3 leading-relaxed">
                <span className="font-bold text-teal-700">0{index + 1}.</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
          <p className="mb-6 text-sm text-slate-600">
            Tela ilustrativa do protótipo do aplicativo EcoSoul.
          </p>
          <Botao onClick={() => navigate('/app')}>
            ← Voltar para o aplicativo
          </Botao>
        </div>
      </Card>
    </>
  );
}
