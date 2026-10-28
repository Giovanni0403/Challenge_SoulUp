package br.com.fiap.ecosoul.dao;

import br.com.fiap.ecosoul.connection.ConnectionFactory;
import br.com.fiap.ecosoul.exception.BancoDeDadosException;
import br.com.fiap.ecosoul.model.Usuario;

import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

/**
 * Acesso à tabela T_ECO_USUARIO (CRUD com JDBC).
 */
public class UsuarioDAO {

    private static final String COLUNAS = "ID_USUARIO, NM_USUARIO, DS_EMAIL, DT_CADASTRO";

    public List<Usuario> listar() {
        String sql = "SELECT " + COLUNAS + " FROM T_ECO_USUARIO ORDER BY NM_USUARIO";
        List<Usuario> usuarios = new ArrayList<>();

        try (Connection conexao = ConnectionFactory.getConnection();
             PreparedStatement stmt = conexao.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {
            while (rs.next()) {
                usuarios.add(montarUsuario(rs));
            }
            return usuarios;
        } catch (SQLException e) {
            throw new BancoDeDadosException("Erro ao listar os usuários.", e);
        }
    }

    public Usuario buscarPorId(Long id) {
        String sql = "SELECT " + COLUNAS + " FROM T_ECO_USUARIO WHERE ID_USUARIO = ?";

        try (Connection conexao = ConnectionFactory.getConnection();
             PreparedStatement stmt = conexao.prepareStatement(sql)) {
            stmt.setLong(1, id);
            try (ResultSet rs = stmt.executeQuery()) {
                return rs.next() ? montarUsuario(rs) : null;
            }
        } catch (SQLException e) {
            throw new BancoDeDadosException("Erro ao buscar o usuário.", e);
        }
    }

    public Usuario buscarPorEmail(String email) {
        String sql = "SELECT " + COLUNAS + " FROM T_ECO_USUARIO WHERE LOWER(DS_EMAIL) = LOWER(?)";

        try (Connection conexao = ConnectionFactory.getConnection();
             PreparedStatement stmt = conexao.prepareStatement(sql)) {
            stmt.setString(1, email);
            try (ResultSet rs = stmt.executeQuery()) {
                return rs.next() ? montarUsuario(rs) : null;
            }
        } catch (SQLException e) {
            throw new BancoDeDadosException("Erro ao buscar o usuário pelo e-mail.", e);
        }
    }

    public Usuario inserir(Usuario usuario) {
        String sql = "INSERT INTO T_ECO_USUARIO (NM_USUARIO, DS_EMAIL, DT_CADASTRO) VALUES (?, ?, ?)";

        try (Connection conexao = ConnectionFactory.getConnection();
             PreparedStatement stmt = conexao.prepareStatement(sql, new String[]{"ID_USUARIO"})) {
            stmt.setString(1, usuario.getNome());
            stmt.setString(2, usuario.getEmail());
            stmt.setDate(3, Date.valueOf(usuario.getDataCadastro()));
            stmt.executeUpdate();

            try (ResultSet chaves = stmt.getGeneratedKeys()) {
                if (chaves.next()) {
                    usuario.setId(chaves.getLong(1));
                }
            }
            return usuario;
        } catch (SQLException e) {
            throw new BancoDeDadosException("Erro ao cadastrar o usuário.", e);
        }
    }

    public boolean atualizar(Usuario usuario) {
        String sql = "UPDATE T_ECO_USUARIO SET NM_USUARIO = ?, DS_EMAIL = ? WHERE ID_USUARIO = ?";

        try (Connection conexao = ConnectionFactory.getConnection();
             PreparedStatement stmt = conexao.prepareStatement(sql)) {
            stmt.setString(1, usuario.getNome());
            stmt.setString(2, usuario.getEmail());
            stmt.setLong(3, usuario.getId());
            return stmt.executeUpdate() > 0;
        } catch (SQLException e) {
            throw new BancoDeDadosException("Erro ao atualizar o usuário.", e);
        }
    }

    public boolean excluir(Long id) {
        String sql = "DELETE FROM T_ECO_USUARIO WHERE ID_USUARIO = ?";

        try (Connection conexao = ConnectionFactory.getConnection();
             PreparedStatement stmt = conexao.prepareStatement(sql)) {
            stmt.setLong(1, id);
            return stmt.executeUpdate() > 0;
        } catch (SQLException e) {
            throw new BancoDeDadosException("Erro ao excluir o usuário.", e);
        }
    }

    private Usuario montarUsuario(ResultSet rs) throws SQLException {
        return new Usuario(
                rs.getLong("ID_USUARIO"),
                rs.getString("NM_USUARIO"),
                rs.getString("DS_EMAIL"),
                rs.getDate("DT_CADASTRO").toLocalDate()
        );
    }
}
