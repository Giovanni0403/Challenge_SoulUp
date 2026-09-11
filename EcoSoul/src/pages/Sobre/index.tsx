import TituloPagina from '../../components/TituloPagina/TituloPagina';
import Card from '../../components/Card/Card';
import { LinkBotao } from '../../components/Botao/Botao';

export default function Sobre() {
  return (
    <>
      <TituloPagina
        title="Sobre a EcoSoul"
        description="Um projeto que nasceu de uma ideia simples: e se você pudesse ser recompensado por fazer bem ao planeta?"
      />
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <h2 className="text-2xl font-bold">Por que a EcoSoul existe?</h2>
          <p className="mt-4 leading-relaxed text-slate-600">
            O transporte público é um caminho para reduzir emissões nas cidades.
            Mesmo assim, poucas pessoas recebem incentivo por utilizá-lo.
          </p>
          <p className="mt-4 leading-relaxed text-slate-600">
            A proposta conecta comportamento sustentável e benefícios
            financeiros. Programas tradicionais de recompensa nem sempre medem
            impacto ambiental e podem ser vulneráveis a fraudes.
          </p>
          <p className="mt-4 font-semibold text-teal-800">
            A EcoSoul nasceu para mudar isso.
          </p>
        </Card>
        <Card>
          <h2 className="text-2xl font-bold">
            Mobilidade e recompensas inteligentes
          </h2>
          <p className="mt-4 leading-relaxed text-slate-600">
            A EcoSoul é uma proposta para o desafio SoulUp que transforma
            trajetos em transporte público em pontos, cashback e créditos
            sustentáveis.
          </p>
          <p className="mt-4 leading-relaxed text-slate-600">
            Com GPS, inteligência artificial e validação inteligente, a solução
            prevê identificar viagens de ônibus, metrô ou trem e calcular o
            impacto ambiental positivo. Tudo pelo smartphone.
          </p>
        </Card>
      </div>
      <section className="mt-10" aria-labelledby="diferenciais">
        <h2 id="diferenciais" className="mb-6 text-3xl font-bold text-white">
          O que nos torna diferentes?
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {[
            [
              '🌱',
              'Sustentabilidade',
              'Incentivar a redução de emissão de carbono de forma prática e acessível.'
            ],
            [
              '🎮',
              'Gamificação',
              'Transformar mobilidade em uma experiência com pontos, bônus e conquistas.'
            ],
            [
              '🤖',
              'Inteligência artificial',
              'Validar viagens para que o sistema proposto seja justo e seguro.'
            ],
            [
              '📍',
              'Escalabilidade',
              'Uma proposta pensada para diferentes cidades, sem depender inicialmente de integração com governos.'
            ]
          ].map(([icon, title, text]) => (
            <Card key={title}>
              <h3 className="text-xl font-bold">
                {icon} {title}
              </h3>
              <p className="mt-3 leading-relaxed text-slate-600">{text}</p>
            </Card>
          ))}
        </div>
      </section>
      <section className="mt-10 rounded-2xl bg-[#0f3034] p-7 text-white md:p-9">
        <h2 className="text-3xl font-bold">Segurança em camadas</h2>
        <p className="mt-4 leading-relaxed text-teal-100">
          O projeto prevê validação em cinco camadas, combinando sinais do
          deslocamento e verificações adicionais para que apenas viagens reais
          sejam recompensadas.
        </p>
        <h3 className="mt-7 text-xl font-bold">
          Como a solução funciona na prática?
        </h3>
        <ol className="mt-4 list-decimal space-y-3 pl-5 text-teal-50">
          <li>O usuário inicia um trajeto sustentável pelo app.</li>
          <li>O sistema analisa rota, velocidade e padrão de deslocamento.</li>
          <li>A IA valida se a viagem foi feita em transporte público.</li>
          <li>
            O app calcula o CO₂ evitado e converte o resultado em ECO Points.
          </li>
          <li>Os pontos podem ser trocados por recompensas.</li>
        </ol>
        <p className="mt-6 text-sm text-teal-100">
          Essas capacidades fazem parte da proposta. A Sprint 3 apresenta a
          interface, sem integração com serviços externos.
        </p>
      </section>
      <section className="mt-10 rounded-xl bg-white p-7">
        <h2 className="text-2xl font-bold">Como a EcoSoul se sustenta?</h2>
        <p className="mt-4 mb-6 leading-relaxed text-slate-600">
          Mais que um app de cashback, a proposta é uma plataforma de
          transformação urbana que conecta pessoas, sustentabilidade e
          benefícios por meio de parcerias ESG e iniciativas sustentáveis.
        </p>
        <LinkBotao to="/app">Explore a solução →</LinkBotao>
      </section>
    </>
  );
}
