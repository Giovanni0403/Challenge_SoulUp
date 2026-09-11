import Card from '../../components/Card/Card';
import CardFuncionalidade from '../../components/CardFuncionalidade/CardFuncionalidade';
import TituloPagina from '../../components/TituloPagina/TituloPagina';
import { features } from '../../dados/project';

export default function Solucao() {
  return (
    <>
      <TituloPagina
        title="O app da EcoSoul"
        description="Conheça as telas e o caminho que transforma uma viagem em novas possibilidades."
        eyebrow="NOSSA SOLUÇÃO / APP"
      />
      <div className="mb-9 grid gap-4 md:grid-cols-3">
        {[
          [
            '01',
            'Problema',
            'Quem usa transporte público reduz emissões, mas quase nunca recebe incentivo por essa escolha.'
          ],
          [
            '02',
            'Solução',
            'Validar trajetos pelo celular, calcular o impacto ambiental e transformar viagens em pontos.'
          ],
          [
            '03',
            'Resultado',
            'Acompanhar CO₂ evitado e trocar ECO Points por benefícios como cashback e recarga.'
          ]
        ].map(([number, title, text]) => (
          <Card key={title}>
            <span className="font-bold text-teal-700">{number}</span>
            <h2 className="mt-3 text-xl font-bold">{title}</h2>
            <p className="mt-2 leading-relaxed text-slate-600">{text}</p>
          </Card>
        ))}
      </div>
      <p className="mb-7 rounded-lg border border-white/40 bg-white/20 p-4 text-sm leading-relaxed text-[#043e42]">
        Demonstração acadêmica: as imagens representam funcionalidades
        planejadas. Esta versão apresenta a solução; não monitora GPS, valida
        viagens ou realiza resgates.
      </p>
      <div className="grid gap-6 md:grid-cols-2">
        {features.map((feature) => (
          <CardFuncionalidade key={feature.slug} feature={feature} />
        ))}
      </div>
    </>
  );
}
