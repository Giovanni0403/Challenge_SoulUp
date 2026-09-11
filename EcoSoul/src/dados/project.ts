import type { Feature, Member } from './tipos';

export const members: Member[] = [
  {
    name: 'Giovanni Lopez Zavam',
    rm: '571403',
    image: 'giovanni.jpg',
    github: 'Giovanni0403',
    linkedin: 'giovanni-lopez-zavam',
    phone: '(11) 99554-3365'
  },
  {
    name: 'Murilo Martins de Campos',
    rm: '572674',
    image: 'murilo.jpg',
    github: 'Muale-0',
    linkedin: 'murilo-martins-de-campos-573727410',
    phone: '(11) 99760-0533'
  },
  {
    name: 'Arthur Palacio',
    rm: '573441',
    image: 'arthur.jpg',
    github: 'ruhtradev10',
    linkedin: 'arthur-palacio-alves-3911a13b3',
    phone: '(11) 98882-7148'
  },
  {
    name: 'Thiago Andrade Silva Piedade',
    rm: '569741',
    image: 'thiago.jpg',
    github: 'Euthiaguera',
    linkedin: 'thiago-andrade-08b2b6321',
    phone: '(11) 96088-8170'
  }
];
export const features: Feature[] = [
  {
    slug: 'tela-inicial',
    title: 'Tela inicial',
    image: 'pagina_inicial.png',
    description:
      'Boas-vindas, pontos acumulados e CO₂ evitado em um só lugar. O ponto de partida para uma rotina mais sustentável.',
    steps: [
      'Consulte o resumo dos seus ECO Points e do impacto ambiental.',
      'Toque em “Iniciar trajeto sustentável”.',
      'Acompanhe sua evolução a cada nova jornada.'
    ]
  },
  {
    slug: 'trajeto-ativo',
    title: 'Trajeto ativo',
    image: 'trajeto.png',
    description:
      'A proposta acompanha o deslocamento e valida o transporte por camadas: GPS, velocidade, padrão de rota e inteligência artificial.',
    steps: [
      'Inicie o trajeto antes de embarcar no ônibus, metrô ou trem.',
      'A validação proposta analisa o deslocamento e identifica o transporte.',
      'Ao finalizar, a distância percorrida será usada para calcular os pontos.'
    ]
  },
  {
    slug: 'impacto-ambiental',
    title: 'Impacto ambiental',
    image: 'impacto.png',
    description:
      'Um resumo da semana com CO₂ evitado, quilômetros percorridos, dias consecutivos de uso e bônus. Cada viagem ajuda a contar sua história.',
    steps: [
      'Veja o total de quilômetros e viagens sustentáveis.',
      'Consulte o CO₂ evitado estimado em relação ao mesmo trajeto de carro.',
      'Acompanhe a frequência de uso e as conquistas.'
    ]
  },
  {
    slug: 'beneficios',
    title: 'Benefícios',
    image: 'perfil.png',
    description:
      'A proposta transforma ECO Points em recarga de transporte, cashback, desconto na conta de luz e ofertas de parceiros.',
    steps: [
      'Confira o saldo de ECO Points disponíveis.',
      'Escolha uma recompensa e consulte os pontos necessários.',
      'Na versão futura, confirme o resgate e acompanhe seu histórico.'
    ]
  }
];
export const benefits = [
  '🚌 Recarga de transporte público',
  '💵 Cashback',
  '💡 Desconto na conta de luz',
  '🎟 Cupons e ofertas',
  '🤝 Benefícios de parceiros',
  '🌱 Créditos sustentáveis'
];
