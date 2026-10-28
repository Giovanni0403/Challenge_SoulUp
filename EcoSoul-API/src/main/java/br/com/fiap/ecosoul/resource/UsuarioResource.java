package br.com.fiap.ecosoul.resource;

import br.com.fiap.ecosoul.bo.UsuarioBO;
import br.com.fiap.ecosoul.model.Usuario;
import br.com.fiap.ecosoul.model.Viagem;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;
import java.util.List;

/**
 * Endpoints REST de usuários consumidos pelo front-end.
 */
@RestController
@RequestMapping("/usuarios")
public class UsuarioResource {

    private final UsuarioBO usuarioBO = new UsuarioBO();

    // GET /usuarios -> 200
    @GetMapping
    public List<Usuario> listar() {
        return usuarioBO.listar();
    }

    // GET /usuarios/{id} -> 200 ou 404
    @GetMapping("/{id}")
    public Usuario buscar(@PathVariable Long id) {
        return usuarioBO.buscarPorId(id);
    }

    // GET /usuarios/{id}/viagens -> 200 ou 404
    @GetMapping("/{id}/viagens")
    public List<Viagem> listarViagens(@PathVariable Long id) {
        return usuarioBO.listarViagens(id);
    }

    // POST /usuarios -> 201, 400 ou 409
    @PostMapping
    public ResponseEntity<Usuario> cadastrar(@RequestBody Usuario usuario) {
        Usuario criado = usuarioBO.cadastrar(usuario);
        return ResponseEntity.created(URI.create("/usuarios/" + criado.getId())).body(criado);
    }

    // PUT /usuarios/{id} -> 200, 400, 404 ou 409
    @PutMapping("/{id}")
    public Usuario atualizar(@PathVariable Long id, @RequestBody Usuario usuario) {
        return usuarioBO.atualizar(id, usuario);
    }

    // DELETE /usuarios/{id} -> 204, 404 ou 409
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        usuarioBO.excluir(id);
        return ResponseEntity.noContent().build();
    }
}
