import type { TipoTransporte } from './tipos';

export const nomesTransporte: Record<TipoTransporte, string> = {
  ONIBUS: 'Ônibus',
  METRO: 'Metrô',
  TREM: 'Trem'
};

export function formatarNumero(valor: number, casas = 2) {
  return valor.toLocaleString('pt-BR', { maximumFractionDigits: casas });
}

export function formatarDinheiro(valor: number) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}
