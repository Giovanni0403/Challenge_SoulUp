package br.com.fiap.ecosoul.exception;

/**
 * Lançada quando a operação conflita com dados existentes (HTTP 409),
 * como e-mail repetido ou excluir usuário que ainda tem viagens.
 */
public class ConflitoException extends RuntimeException {

    public ConflitoException(String mensagem) {
        super(mensagem);
    }
}
