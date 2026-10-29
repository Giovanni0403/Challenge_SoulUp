export interface Pessoa {
  name: string;
  rm: string;
  image: string;
}
export interface RedesSociais {
  github: string;
  linkedin: string;
}
// Intersection type: um integrante junta os dados pessoais, as redes e o telefone.
export type Member = Pessoa & RedesSociais & { phone: string };

export interface Feature {
  slug: string;
  title: string;
  image: string;
  description: string;
  steps: string[];
}
export interface FaqGroup {
  title: string;
  questions: { question: string; answer: string }[];
}
export interface ContactValues {
  nome: string;
  email: string;
  telefone: string;
  mensagem: string;
  satisfacao: number;
}

// Union types
export type VarianteBotao = 'primary' | 'secondary';
export type TipoAviso = 'sucesso' | 'erro' | 'info';
export type EstadoRequisicao<T> =
  | { status: 'carregando' }
  | { status: 'erro'; mensagem: string; codigo?: number }
  | { status: 'sucesso'; dados: T };

// Tipos da API Java (Calculadora CO2)
export type TipoTransporte = 'ONIBUS' | 'METRO' | 'TREM';

// Corpo enviado no POST e no PUT de /calculos
export interface DadosCalculo {
  nome: string;
  tipoTransporte: TipoTransporte;
  distanciaKm: number;
}

// Intersection type: o cálculo devolvido junta os dados enviados e os resultados da API.
export type Calculo = DadosCalculo & {
  id: number;
  co2Economizado: number;
  pontos: number;
  cashback: number;
};
