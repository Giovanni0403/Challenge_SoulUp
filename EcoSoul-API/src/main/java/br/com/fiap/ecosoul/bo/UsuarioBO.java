package br.com.fiap.ecosoul.bo;

import br.com.fiap.ecosoul.dao.UsuarioDAO;
import br.com.fiap.ecosoul.dao.ViagemDAO;
import br.com.fiap.ecosoul.exception.ConflitoException;
import br.com.fiap.ecosoul.exception.RecursoNaoEncontradoException;
import br.com.fiap.ecosoul.exception.ValidacaoException;
import br.com.fiap.ecosoul.model.Usuario;
import br.com.fiap.ecosoul.model.Viagem;

import java.time.LocalDate;
import java.util.List;
import java.util.regex.Pattern;

/**
 * Regras de negócio dos usuários.
 */
public class UsuarioBO {

    private static final Pattern FORMATO_EMAIL = Pattern.compile("^[\\w.+-]+@[\\w-]+(\\.[\\w-]+)+$");

    private final UsuarioDAO usuarioDAO = new UsuarioDAO();
    private final ViagemDAO viagemDAO = new ViagemDAO();

    public List<Usuario> listar() {
        return usuarioDAO.listar();
    }

    public Usuario buscarPorId(Long id) {
        validarId(id);
        Usuario usuario = usuarioDAO.buscarPorId(id);
        if (usuario == null) {
            throw new RecursoNaoEncontradoException("Usuário " + id + " não encontrado.");
        }
        return usuario;
    }

    public List<Viagem> listarViagens(Long id) {
        buscarPorId(id);
        return viagemDAO.listarPorUsuario(id);
    }

    public Usuario cadastrar(Usuario usuario) {
        validar(usuario);
        verificarEmailDisponivel(usuario.getEmail(), null);
        usuario.setId(null);
        usuario.setDataCadastro(LocalDate.now());
        return usuarioDAO.inserir(usuario);
    }

    public Usuario atualizar(Long id, Usuario usuario) {
        Usuario atual = buscarPorId(id);
        validar(usuario);
        verificarEmailDisponivel(usuario.getEmail(), id);
        usuario.setId(id);
        usuario.setDataCadastro(atual.getDataCadastro());
        usuarioDAO.atualizar(usuario);
        return usuario;
    }

    public void excluir(Long id) {
        buscarPorId(id);
        int viagens = viagemDAO.contarPorUsuario(id);
        if (viagens > 0) {
            throw new ConflitoException("Não é possível excluir: o usuário tem " + viagens
                    + " viagem(ns) registrada(s). Exclua as viagens antes.");
        }
        usuarioDAO.excluir(id);
    }

    private void verificarEmailDisponivel(String email, Long idAtual) {
        Usuario existente = usuarioDAO.buscarPorEmail(email);
        if (existente != null && !existente.getId().equals(idAtual)) {
            throw new ConflitoException("Já existe um usuário com o e-mail " + email + ".");
        }
    }

    private void validarId(Long id) {
        if (id == null || id <= 0) {
            throw new ValidacaoException("O id do usuário deve ser um número positivo.");
        }
    }

    private void validar(Usuario usuario) {
        if (usuario == null) {
            throw new ValidacaoException("Envie os dados do usuário.");
        }

        String nome = usuario.getNome() == null ? "" : usuario.getNome().trim();
        if (nome.length() < 3 || nome.length() > 100) {
            throw new ValidacaoException("O nome deve ter de 3 a 100 caracteres.");
        }

        String email = usuario.getEmail() == null ? "" : usuario.getEmail().trim().toLowerCase();
        if (email.length() > 120 || !FORMATO_EMAIL.matcher(email).matches()) {
            throw new ValidacaoException("Informe um e-mail válido.");
        }

        usuario.setNome(nome);
        usuario.setEmail(email);
    }
}
