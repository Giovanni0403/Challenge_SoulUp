package br.com.fiap.ecosoul.exception;

/**
 * Lançada quando os dados enviados quebram uma regra de negócio (HTTP 400).
 */
public class ValidacaoException extends RuntimeException {

    public ValidacaoException(String mensagem) {
        super(mensagem);
    }
}
