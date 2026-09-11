import type { Feature } from '../../dados/tipos';
import Card from '../Card/Card';
import { LinkBotao } from '../Botao/Botao';

export default function CardFuncionalidade({ feature }: { feature: Feature }) {
  return (
    <Card className="flex flex-col">
      <div className="mb-6 rounded-lg bg-teal-50 p-5">
        <img
          src={`/img/${feature.image}`}
          alt={`Protótipo da ${feature.title.toLowerCase()} do aplicativo EcoSoul`}
          loading="lazy"
          className="mx-auto h-72 max-w-full object-contain"
        />
      </div>
      <h2 className="text-2xl font-bold">{feature.title}</h2>
      <p className="mt-3 mb-6 flex-1 leading-relaxed text-slate-600">
        {feature.description}
      </p>
      <LinkBotao to={`/app/${feature.slug}`} variant="secondary">
        Explorar {feature.title.toLowerCase()} →
      </LinkBotao>
    </Card>
  );
}
