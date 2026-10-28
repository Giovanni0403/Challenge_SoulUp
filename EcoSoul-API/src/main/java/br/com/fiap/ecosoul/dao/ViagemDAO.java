package br.com.fiap.ecosoul.dao;

import br.com.fiap.ecosoul.connection.ConnectionFactory;
import br.com.fiap.ecosoul.exception.BancoDeDadosException;
import br.com.fiap.ecosoul.model.TipoTransporte;
import br.com.fiap.ecosoul.model.Usuario;
import br.com.fiap.ecosoul.model.Viagem;

import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

/**
 * Acesso à tabela T_ECO_VIAGEM (CRUD com JDBC).
 * As consultas fazem JOIN com T_ECO_USUARIO para trazer o dono da viagem.
 */
public class ViagemDAO {

    private static final String SELECT_BASE =
            "SELECT V.ID_VIAGEM, V.DS_ORIGEM, V.DS_DESTINO, V.TP_TRANSPORTE, V.NR_DISTANCIA_KM, "
                    + "V.DT_VIAGEM, U.ID_USUARIO, U.NM_USUARIO, U.DS_EMAIL, U.DT_CADASTRO "
                    + "FROM T_ECO_VIAGEM V "
                    + "INNER JOIN T_ECO_USUARIO U ON U.ID_USUARIO = V.ID_USUARIO ";

    private static final String ORDEM = " ORDER BY V.DT_VIAGEM DESC, V.ID_VIAGEM DESC";

    public List<Viagem> listar() {
        try (Connection conexao = ConnectionFactory.getConnection();
             PreparedStatement stmt = conexao.prepareStatement(SELECT_BASE + ORDEM)) {
            return montarLista(stmt);
        } catch (SQLException e) {
            throw new BancoDeDadosException("Erro ao listar as viagens.", e);
        }
    }

    public List<Viagem> listarPorUsuario(Long idUsuario) {
        try (Connection conexao = ConnectionFactory.getConnection();
             PreparedStatement stmt = conexao.prepareStatement(
                     SELECT_BASE + "WHERE V.ID_USUARIO = ?" + ORDEM)) {
            stmt.setLong(1, idUsuario);
            return montarLista(stmt);
        } catch (SQLException e) {
            throw new BancoDeDadosException("Erro ao listar as viagens do usuário.", e);
        }
    }

    public int contarPorUsuario(Long idUsuario) {
        String sql = "SELECT COUNT(*) FROM T_ECO_VIAGEM WHERE ID_USUARIO = ?";

        try (Connection conexao = ConnectionFactory.getConnection();
             PreparedStatement stmt = conexao.prepareStatement(sql)) {
            stmt.setLong(1, idUsuario);
            try (ResultSet rs = stmt.executeQuery()) {
                rs.next();
                return rs.getInt(1);
            }
        } catch (SQLException e) {
            throw new BancoDeDadosException("Erro ao contar as viagens do usuário.", e);
        }
    }

    public Viagem buscarPorId(Long id) {
        try (Connection conexao = ConnectionFactory.getConnection();
             PreparedStatement stmt = conexao.prepareStatement(SELECT_BASE + "WHERE V.ID_VIAGEM = ?")) {
            stmt.setLong(1, id);
            try (ResultSet rs = stmt.executeQuery()) {
                return rs.next() ? montarViagem(rs) : null;
            }
        } catch (SQLException e) {
            throw new BancoDeDadosException("Erro ao buscar a viagem.", e);
        }
    }

    public Viagem inserir(Viagem viagem) {
        String sql = "INSERT INTO T_ECO_VIAGEM "
                + "(DS_ORIGEM, DS_DESTINO, TP_TRANSPORTE, NR_DISTANCIA_KM, DT_VIAGEM, ID_USUARIO) "
                + "VALUES (?, ?, ?, ?, ?, ?)";

        try (Connection conexao = ConnectionFactory.getConnection();
             PreparedStatement stmt = conexao.prepareStatement(sql, new String[]{"ID_VIAGEM"})) {
            preencherCampos(stmt, viagem);
            stmt.executeUpdate();

            try (ResultSet chaves = stmt.getGeneratedKeys()) {
                if (chaves.next()) {
                    viagem.setId(chaves.getLong(1));
                }
            }
            return viagem;
        } catch (SQLException e) {
            throw new BancoDeDadosException("Erro ao cadastrar a viagem.", e);
        }
    }

    public boolean atualizar(Viagem viagem) {
        String sql = "UPDATE T_ECO_VIAGEM SET DS_ORIGEM = ?, DS_DESTINO = ?, TP_TRANSPORTE = ?, "
                + "NR_DISTANCIA_KM = ?, DT_VIAGEM = ?, ID_USUARIO = ? WHERE ID_VIAGEM = ?";

        try (Connection conexao = ConnectionFactory.getConnection();
             PreparedStatement stmt = conexao.prepareStatement(sql)) {
            preencherCampos(stmt, viagem);
            stmt.setLong(7, viagem.getId());
            return stmt.executeUpdate() > 0;
        } catch (SQLException e) {
            throw new BancoDeDadosException("Erro ao atualizar a viagem.", e);
        }
    }

    public boolean excluir(Long id) {
        String sql = "DELETE FROM T_ECO_VIAGEM WHERE ID_VIAGEM = ?";

        try (Connection conexao = ConnectionFactory.getConnection();
             PreparedStatement stmt = conexao.prepareStatement(sql)) {
            stmt.setLong(1, id);
            return stmt.executeUpdate() > 0;
        } catch (SQLException e) {
            throw new BancoDeDadosException("Erro ao excluir a viagem.", e);
        }
    }

    private void preencherCampos(PreparedStatement stmt, Viagem viagem) throws SQLException {
        stmt.setString(1, viagem.getOrigem());
        stmt.setString(2, viagem.getDestino());
        stmt.setString(3, viagem.getTransporte().name());
        stmt.setDouble(4, viagem.getDistanciaKm());
        stmt.setDate(5, Date.valueOf(viagem.getData()));
        stmt.setLong(6, viagem.getUsuario().getId());
    }

    private List<Viagem> montarLista(PreparedStatement stmt) throws SQLException {
        List<Viagem> viagens = new ArrayList<>();
        try (ResultSet rs = stmt.executeQuery()) {
            while (rs.next()) {
                viagens.add(montarViagem(rs));
            }
        }
        return viagens;
    }

    private Viagem montarViagem(ResultSet rs) throws SQLException {
        Usuario usuario = new Usuario(
                rs.getLong("ID_USUARIO"),
                rs.getString("NM_USUARIO"),
                rs.getString("DS_EMAIL"),
                rs.getDate("DT_CADASTRO").toLocalDate()
        );
        return new Viagem(
                rs.getLong("ID_VIAGEM"),
                usuario,
                rs.getString("DS_ORIGEM"),
                rs.getString("DS_DESTINO"),
                TipoTransporte.valueOf(rs.getString("TP_TRANSPORTE")),
                rs.getDouble("NR_DISTANCIA_KM"),
                rs.getDate("DT_VIAGEM").toLocalDate()
        );
    }
}
