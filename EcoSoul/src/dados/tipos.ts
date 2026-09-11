export type Member = {
  name: string;
  rm: string;
  image: string;
  github: string;
  linkedin: string;
  phone: string;
};
export type Feature = {
  slug: string;
  title: string;
  image: string;
  description: string;
  steps: string[];
};
export type FaqGroup = {
  title: string;
  questions: { question: string; answer: string }[];
};
export type ContactValues = {
  nome: string;
  email: string;
  telefone: string;
  mensagem: string;
  satisfacao: number;
};
