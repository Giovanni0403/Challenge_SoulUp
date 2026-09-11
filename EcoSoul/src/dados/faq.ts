import type { FaqGroup } from './tipos';

export const faqGroups: FaqGroup[] = [
  {
    questions: [
      {
        question:
          'Como o app sabe que estou no transporte público e não no carro?',
        answer:
          'O app usa GPS, velocidade e padrão de deslocamento para identificar o tipo de transporte. Ônibus e metrô têm comportamentos muito diferentes de um carro — como paradas frequentes, rotas fixas e velocidades específicas. A nossa Inteligência Artificial analisa tudo isso automaticamente.'
      },
      {
        question: 'Preciso fazer alguma coisa durante a viagem?',
        answer:
          'Não! Basta abrir o app, tocar em "Iniciar trajeto sustentável" e guardar o celular. O sistema monitora tudo em segundo plano.'
      },
      {
        question: 'O app funciona sem internet durante o trajeto?',
        answer:
          'O app precisa de conexão para validar a viagem. Recomendamos ter dados móveis ativados durante o trajeto para garantir que os pontos sejam computados corretamente.'
      },
      {
        question: 'O app gasta muita bateria?',
        answer:
          'O consumo de bateria é moderado, pois o GPS fica ativo durante o trajeto. Recomendamos manter o celular carregado antes de iniciar uma viagem longa.'
      }
    ],
    title: 'Uso do aplicativo'
  },
  {
    questions: [
      {
        question: 'Como os pontos são calculados?',
        answer:
          'Os pontos são baseados na distância percorrida, no tipo de transporte utilizado e na frequência de uso. Quanto mais você usa transporte público, mais pontos acumula. Há também bônus por uso em dias consecutivos e em horários de pico.'
      },
      {
        question: 'Quando os pontos caem na minha conta?',
        answer:
          'Os pontos são creditados assim que a viagem é validada pelo sistema, geralmente logo após o término do trajeto.'
      },
      {
        question: 'Os pontos expiram?',
        answer:
          'Sim. Pontos não utilizados expiram após 12 meses. Fique de olho no seu saldo para não perder suas recompensas.'
      },
      {
        question: 'Por que não ganhei pontos na minha viagem?',
        answer:
          'Isso pode acontecer se o sistema não conseguiu validar o tipo de transporte, se o GPS estava desativado, ou se a viagem foi muito curta. Verifique se o app estava aberto e com permissão de localização ativa.'
      }
    ],
    title: 'ECO Points'
  },
  {
    questions: [
      {
        question: 'Por que o app pediu uma foto durante a viagem?',
        answer:
          'Em algumas viagens, o sistema solicita uma foto do ambiente interno do veículo como validação adicional. Isso faz parte do nosso sistema antifraude de 5 camadas e garante que apenas viagens reais sejam recompensadas.'
      },
      {
        question: 'O que acontece se eu tentar enganar o sistema?',
        answer:
          'O sistema detecta comportamentos suspeitos automaticamente. Tentativas de fraude resultam em suspensão dos pontos e bloqueio da conta. A EcoSoul preza pela transparência e recompensa apenas trajetos reais.'
      },
      {
        question: 'O que é o índice de confiabilidade?',
        answer:
          'É uma pontuação que mede o seu histórico de uso. Quanto maior o seu índice, menos validações manuais você precisa fazer e mais fácil fica acumular benefícios. Ele cresce com o uso honesto e frequente do app.'
      }
    ],
    title: 'Validação e segurança'
  },
  {
    questions: [
      {
        question: 'Como o app calcula o CO₂ que evitei?',
        answer:
          'O sistema compara a distância percorrida em transporte público com a emissão média de um carro particular no mesmo trajeto. A diferença é o CO₂ que você ajudou a evitar.'
      },
      {
        question: 'Meu impacto ambiental fica registrado?',
        answer:
          'Sim! Você pode acompanhar todo o seu histórico de impacto ambiental dentro do app, incluindo total de CO₂ evitado, quilômetros percorridos e equivalências sustentáveis.'
      }
    ],
    title: 'Impacto ambiental'
  },
  {
    questions: [
      {
        question: 'O app é gratuito?',
        answer: 'Sim, o download e o uso do app são totalmente gratuitos.'
      },
      {
        question: 'Quais dados pessoais o app coleta?',
        answer:
          'Coletamos localização durante os trajetos, histórico de viagens e dados de uso do app. Todas as informações são tratadas de acordo com a LGPD e utilizadas apenas para validar viagens e calcular recompensas.'
      },
      {
        question: 'Posso usar o app em qualquer cidade do Brasil?',
        answer:
          'Sim! A EcoSoul funciona em qualquer cidade, pois o sistema de validação é feito pelo próprio smartphone, sem depender de integração com as empresas de transporte locais.'
      }
    ],
    title: 'Cadastro e acesso'
  }
];
