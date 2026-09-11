import { useState } from 'react';
import PerguntaFaq from '../../components/PerguntaFaq/PerguntaFaq';
import TituloPagina from '../../components/TituloPagina/TituloPagina';
import { LinkBotao } from '../../components/Botao/Botao';
import { faqGroups } from '../../dados/faq';

export default function Faq() {
  // Como no exemplo enviado, a primeira resposta começa aberta.
  const [perguntaAberta, setPerguntaAberta] = useState('faq-0-0');

  function alternarPergunta(id: string) {
    if (perguntaAberta === id) {
      setPerguntaAberta('');
    } else {
      setPerguntaAberta(id);
    }
  }

  return (
    <>
      <TituloPagina
        title="Perguntas frequentes"
        description="Tire suas dúvidas sobre a proposta EcoSoul e descubra como seus trajetos podem se transformar em recompensas."
        eyebrow="FAQ / SUAS DÚVIDAS"
      />
      <p className="mx-auto mb-8 max-w-3xl rounded-lg bg-white/20 p-4 text-sm leading-relaxed text-[#043e42]">
        As respostas descrevem as regras e funcionalidades planejadas na Sprint
        2. O aplicativo ainda é um protótipo acadêmico; GPS, IA, contas e
        resgates não estão implementados nesta versão.
      </p>
      <div className="mx-auto max-w-3xl space-y-9">
        {faqGroups.map((grupo, indiceGrupo) => (
          <section key={grupo.title}>
            <h2 className="mb-4 text-2xl font-bold text-white">
              {grupo.title}
            </h2>
            <div className="space-y-3">
              {grupo.questions.map((pergunta, indicePergunta) => {
                const id = 'faq-' + indiceGrupo + '-' + indicePergunta;
                return (
                  <PerguntaFaq
                    key={id}
                    id={id}
                    question={pergunta.question}
                    answer={pergunta.answer}
                    aberta={perguntaAberta === id}
                    alternar={() => alternarPergunta(id)}
                  />
                );
              })}
            </div>
          </section>
        ))}
      </div>
      <div className="mt-10 text-center">
        <p className="mb-4 font-semibold text-[#043e42]">
          Ainda ficou alguma dúvida?
        </p>
        <LinkBotao to="/contato">Fale com a equipe</LinkBotao>
      </div>
    </>
  );
}
