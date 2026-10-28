package br.com.fiap.ecosoul.bo;

import br.com.fiap.ecosoul.dao.UsuarioDAO;
import br.com.fiap.ecosoul.dao.ViagemDAO;
import br.com.fiap.ecosoul.exception.RecursoNaoEncontradoException;
import br.com.fiap.ecosoul.exception.ValidacaoException;
import br.com.fiap.ecosoul.model.Usuario;
import br.com.fiap.ecosoul.model.Viagem;

import java.time.LocalDate;
import java.util.List;

/**
 * Regras de negócio das viagens. Valida os dados antes de chamar o DAO.
 */
public class ViagemBO {

    private static final int TAMANHO_MAXIMO_TEXTO = 80;
    private static final double DISTANCIA_MAXIMA_KM = 500;

    private final ViagemDAO viagemDAO = new ViagemDAO();
    private final UsuarioDAO usuarioDAO = new UsuarioDAO();

    public List<Viagem> listar() {
        return viagemDAO.listar();
    }

    public Viagem buscarPorId(Long id) {
        validarId(id);
        Viagem viagem = viagemDAO.buscarPorId(id);
        if (viagem == null) {
            throw new RecursoNaoEncontradoException("Viagem " + id + " não encontrada.");
        }
        return viagem;
    }

    public Viagem cadastrar(Viagem viagem) {
        validar(viagem);
        viagem.setId(null);
        viagem.setUsuario(buscarDono(viagem));
        return viagemDAO.inserir(viagem);
    }

    public Viagem atualizar(Long id, Viagem viagem) {
        validarId(id);
        validar(viagem);
        viagem.setId(id);
        viagem.setUsuario(buscarDono(viagem));
        if (!viagemDAO.atualizar(viagem)) {
            throw new RecursoNaoEncontradoException("Viagem " + id + " não encontrada.");
        }
        return viagem;
    }

    // A viagem precisa pertencer a um usuário que já existe
    private Usuario buscarDono(Viagem viagem) {
        Long idUsuario = viagem.getUsuario().getId();
        Usuario usuario = usuarioDAO.buscarPorId(idUsuario);
        if (usuario == null) {
            throw new ValidacaoException("O usuário " + idUsuario + " não existe.");
        }
        return usuario;
    }

    public void excluir(Long id) {
        validarId(id);
        if (!viagemDAO.excluir(id)) {
            throw new RecursoNaoEncontradoException("Viagem " + id + " não encontrada.");
        }
    }

    private void validarId(Long id) {
        if (id == null || id <= 0) {
            throw new ValidacaoException("O id da viagem deve ser um número positivo.");
        }
    }

    private void validar(Viagem viagem) {
        if (viagem == null) {
            throw new ValidacaoException("Envie os dados da viagem.");
        }
        if (viagem.getUsuario() == null || viagem.getUsuario().getId() == null) {
            throw new ValidacaoException("Informe o usuário da viagem.");
        }

        viagem.setOrigem(validarTexto(viagem.getOrigem(), "origem"));
        viagem.setDestino(validarTexto(viagem.getDestino(), "destino"));

        if (viagem.getOrigem().equalsIgnoreCase(viagem.getDestino())) {
            throw new ValidacaoException("A origem e o destino precisam ser diferentes.");
        }
        if (viagem.getTransporte() == null) {
            throw new ValidacaoException("Informe o transporte: ONIBUS, METRO ou TREM.");
        }
        if (viagem.getDistanciaKm() == null
                || viagem.getDistanciaKm() <= 0
                || viagem.getDistanciaKm() > DISTANCIA_MAXIMA_KM) {
            throw new ValidacaoException("A distância deve ser maior que 0 e no máximo "
                    + (int) DISTANCIA_MAXIMA_KM + " km.");
        }
        if (viagem.getData() == null) {
            throw new ValidacaoException("Informe a data da viagem.");
        }
        if (viagem.getData().isAfter(LocalDate.now())) {
            throw new ValidacaoException("A data da viagem não pode estar no futuro.");
        }
    }

    private String validarTexto(String valor, String campo) {
        if (valor == null || valor.trim().length() < 2) {
            throw new ValidacaoException("O campo " + campo + " deve ter pelo menos 2 caracteres.");
        }
        String texto = valor.trim();
        if (texto.length() > TAMANHO_MAXIMO_TEXTO) {
            throw new ValidacaoException("O campo " + campo + " deve ter no máximo "
                    + TAMANHO_MAXIMO_TEXTO + " caracteres.");
        }
        return texto;
    }
}
