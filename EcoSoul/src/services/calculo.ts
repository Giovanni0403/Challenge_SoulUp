// Endpoints /calculos da API Java Calculadora CO2.
import type { Calculo, DadosCalculo } from '../dados/tipos';
import { requisicao } from './api';

export function listarCalculos() {
  return requisicao<Calculo[]>('/calculos');
}

export function buscarCalculo(id: number) {
  return requisicao<Calculo>(`/calculos/${id}`);
}

export function criarCalculo(dados: DadosCalculo) {
  return requisicao<Calculo>('/calculos', {
    method: 'POST',
    body: JSON.stringify(dados)
  });
}

export function atualizarCalculo(id: number, dados: DadosCalculo) {
  return requisicao<Calculo>(`/calculos/${id}`, {
    method: 'PUT',
    body: JSON.stringify(dados)
  });
}

export function excluirCalculo(id: number) {
  return requisicao<void>(`/calculos/${id}`, { method: 'DELETE' });
}