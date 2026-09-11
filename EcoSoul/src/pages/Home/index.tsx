import { useEffect } from 'react';
import { LinkBotao } from '../../components/Botao/Botao';
import Card from '../../components/Card/Card';
import { benefits } from '../../dados/project';

const highlights = [
  [
    'CO₂',
    'Impacto ambiental',
    'Emissões evitadas por viagem usando transporte público.'
  ],
  [
    '5×',
    'Validação em camadas',
    'Uma proposta de validação com GPS, velocidade, padrão de rota e IA.'
  ],
  [
    'APP',
    '100% digital',
    'Trajetos, pontuação e recompensas direto pelo smartphone.'
  ],
  [
    'ESG',
    'Parcerias sustentáveis',
    'Benefícios conectados a empresas e iniciativas sustentáveis.'
  ]
];
const steps = [
  [
    'Inicie o trajeto',
    'Abra o app e toque em “Iniciar trajeto sustentável”. O sistema proposto acompanha localização, velocidade e deslocamento.'
  ],
  [
    'Valide sua viagem',
    'A inteligência artificial prevista analisa os dados para identificar ônibus, metrô ou trem.'
  ],
  [
    'Acompanhe seu impacto',
    'Depois da viagem, veja o CO₂ evitado e a conversão do trajeto em ECO Points.'
  ],
  [
    'Resgate benefícios',
    'Troque seus pontos por recarga de transporte, cashback, descontos e muito mais na proposta do aplicativo.'
  ]
];
export default function Home() {
  useEffect(() => {
    document.title = 'Cada quilômetro sustentável vira recompensa. | EcoSoul';
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.getElementById('conteudo')?.focus({ preventScroll: true });
  }, []);

  return (
    <>
      <section className="grid items-center gap-10 py-2 md:grid-cols-[1.4fr_1fr] md:py-6">
        <div>
          <p className="mb-5 text-xs font-bold tracking-[0.16em] text-[#043e42]">
            SEU CAMINHO. UM FUTURO MELHOR.
          </p>
          <h1 className="max-w-2xl text-4xl leading-tight font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
            Cada quilômetro sustentável vira recompensa.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#043e42]">
            Use transporte público, ganhe pontos, cashback e benefícios reais. A
            EcoSoul transforma seu trajeto do dia a dia em impacto ambiental
            positivo.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <LinkBotao to="/app">Conheça o aplicativo →</LinkBotao>
            <LinkBotao to="/sobre" variant="secondary">
              Nossa proposta
            </LinkBotao>
          </div>
          <p className="mt-5 text-sm text-[#043e42]">
            Projeto acadêmico · Protótipo de mobilidade sustentável
          </p>
        </div>
        <div className="relative mx-auto w-full max-w-sm rounded-3xl border border-white/35 bg-white/15 p-7">
          <img
            src="/img/pagina_inicial.png"
            alt="Protótipo da tela inicial EcoSoul com saldo de pontos e início de trajeto"
            className="mx-auto max-h-96 max-w-full rounded-xl object-contain shadow-xl"
          />
          <div className="relative -mt-5 ml-5 rounded-xl bg-white p-4 shadow-md">
            <p className="text-sm font-bold text-teal-800">
              🌱 Cada viagem conta.
            </p>
            <p className="mt-1 text-xs text-slate-600">
              Pequenas escolhas, novas possibilidades.
            </p>
          </div>
        </div>
      </section>
      <section className="mt-14" aria-labelledby="destaques">
        <h2 id="destaques" className="mb-6 text-3xl font-bold text-white">
          O que move a EcoSoul
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {highlights.map(([icon, title, text]) => (
            <Card key={title}>
              <span className="inline-flex h-12 min-w-12 items-center justify-center rounded-full bg-teal-50 px-2 font-bold text-teal-800">
                {icon}
              </span>
              <h3 className="mt-5 text-lg font-bold">{title}</h3>
              <p className="mt-2 leading-relaxed text-slate-600">{text}</p>
            </Card>
          ))}
        </div>
      </section>
      <section
        className="mt-14 rounded-2xl bg-white/15 p-6 md:p-8"
        aria-labelledby="como-funciona"
      >
        <h2 id="como-funciona" className="text-3xl font-bold text-white">
          Simples como abrir um app.
        </h2>
        <p className="mt-3 text-[#043e42]">
          Você não precisa de nada além do seu celular para começar.
        </p>
        <ol className="mt-7 grid gap-6 md:grid-cols-2">
          {steps.map(([title, text], index) => (
            <li key={title} className="flex gap-4">
              <span className="text-3xl font-bold text-[#043e42]">
                0{index + 1}
              </span>
              <div>
                <h3 className="text-xl font-bold text-[#043e42]">{title}</h3>
                <p className="mt-2 leading-relaxed text-[#043e42]">{text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
      <section className="mt-14" aria-labelledby="beneficios">
        <h2 id="beneficios" className="text-3xl font-bold text-white">
          O que você pode ganhar?
        </h2>
        <p className="mt-3 text-[#043e42]">
          Benefícios previstos para recompensar escolhas sustentáveis.
        </p>
        <ul className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit) => (
            <li
              key={benefit}
              className="rounded-xl bg-white p-5 font-semibold text-[#0d2225] shadow-sm"
            >
              {benefit}
            </li>
          ))}
        </ul>
      </section>
      <section className="mt-14 flex flex-col items-start justify-between gap-7 rounded-2xl bg-[#0f3034] p-8 text-white md:flex-row md:items-center">
        <div>
          <h2 className="text-3xl font-bold">
            Pronto para transformar seus trajetos?
          </h2>
          <p className="mt-3 max-w-xl leading-relaxed text-teal-100">
            Pequenas escolhas do dia a dia somam um impacto real para o planeta.
            Conheça a proposta e faça parte dessa conversa.
          </p>
        </div>
        <LinkBotao to="/contato" variant="secondary" className="shrink-0">
          Fale com a EcoSoul →
        </LinkBotao>
      </section>
    </>
  );
}
