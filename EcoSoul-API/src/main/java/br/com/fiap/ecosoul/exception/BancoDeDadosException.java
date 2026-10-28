package br.com.fiap.ecosoul.exception;

/**
 * Envolve erros de SQL para a camada Resource responder com HTTP 500.
 */
public class BancoDeDadosException extends RuntimeException {

    public BancoDeDadosException(String mensagem, Throwable causa) {
        super(mensagem, causa);
    }
}
