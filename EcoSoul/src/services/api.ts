const API_URL: string = (import.meta.env.VITE_API_URL ?? '').replace(/\/$/, '');

export class ErroApi extends Error {
  status: number;

  constructor(mensagem: string, status: number) {
    super(mensagem);
    this.name = 'ErroApi';
    this.status = status;
  }
}

function mensagemPorStatus(status: number): string {
  if (status === 400) return 'Os dados enviados são inválidos. Revise os campos.';
  if (status === 404) return 'Registro não encontrado.';
  if (status === 409) return 'Já existe um registro com esses dados.';
  if (status >= 500) return 'O servidor está com problemas. Tente novamente em instantes.';
  return `Não foi possível concluir a operação (erro ${status}).`;
}

export async function requisicao<T>(caminho: string, opcoes: RequestInit = {}): Promise<T> {
  if (!API_URL) {
    throw new ErroApi('A URL da API não foi configurada (VITE_API_URL).', 0);
  }

  const headers = new Headers(opcoes.headers);
  if (opcoes.body) headers.set('Content-Type', 'application/json');

  let resposta: Response;
  try {
    resposta = await fetch(API_URL + caminho, { ...opcoes, headers });
  } catch {
    throw new ErroApi('Não foi possível conectar à API. Verifique sua conexão e tente novamente.', 0);
  }

  if (!resposta.ok) {
    // A API Java devolve { status, erro, mensagem }; usamos a mensagem dela quando existir.
    const corpo = (await resposta.json().catch(() => null)) as { mensagem?: string } | null;
    throw new ErroApi(corpo?.mensagem || mensagemPorStatus(resposta.status), resposta.status);
  }
  if (resposta.status === 204) return undefined as T;
  return (await resposta.json()) as T;
}