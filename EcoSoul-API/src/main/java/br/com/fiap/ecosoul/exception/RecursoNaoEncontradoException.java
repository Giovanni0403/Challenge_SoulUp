package br.com.fiap.ecosoul.exception;

/**
 * Lançada quando o registro procurado não existe (HTTP 404).
 */
public class RecursoNaoEncontradoException extends RuntimeException {

    public RecursoNaoEncontradoException(String mensagem) {
        super(mensagem);
    }
}
