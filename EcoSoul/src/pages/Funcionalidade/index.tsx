import { useNavigate, useParams } from 'react-router-dom';
import { Botao } from '../../components/Botao/Botao';
import Card from '../../components/Card/Card';
import TituloPagina from '../../components/TituloPagina/TituloPagina';
import { features } from '../../dados/project';
import NaoEncontrada from '../NaoEncontrada/index';

export default function Funcionalidade() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const feature = features.find((item) => item.slug === slug);
  if (!feature) return <NaoEncontrada />;
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
            Tela ilustrativa da Sprint 2, integrada à apresentação em React. As
            operações do app ainda não estão disponíveis.
          </p>
          <Botao onClick={() => navigate('/app')}>
            ← Voltar para o aplicativo
          </Botao>
        </div>
      </Card>
    </>
  );
}
