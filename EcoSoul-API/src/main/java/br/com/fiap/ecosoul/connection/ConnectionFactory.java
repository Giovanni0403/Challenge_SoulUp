package br.com.fiap.ecosoul.connection;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

/**
 * Cria conexões com o banco Oracle da FIAP.
 * Os dados de acesso vêm de variáveis de ambiente para a senha não ficar no código.
 */
public class ConnectionFactory {

    private static final String URL_PADRAO = "jdbc:oracle:thin:@oracle.fiap.com.br:1521:ORCL";

    private ConnectionFactory() {
    }

    public static Connection getConnection() throws SQLException {
        String url = lerVariavel("DB_URL", URL_PADRAO);
        String usuario = lerVariavel("DB_USER", null);
        String senha = lerVariavel("DB_PASSWORD", null);

        if (usuario == null || senha == null) {
            throw new SQLException("Variáveis DB_USER e DB_PASSWORD não configuradas.");
        }
        return DriverManager.getConnection(url, usuario, senha);
    }

    private static String lerVariavel(String nome, String padrao) {
        String valor = System.getenv(nome);
        return valor == null || valor.isBlank() ? padrao : valor;
    }
}
