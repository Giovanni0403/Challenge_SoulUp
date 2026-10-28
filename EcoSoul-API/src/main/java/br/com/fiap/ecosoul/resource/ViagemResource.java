package br.com.fiap.ecosoul.resource;

import br.com.fiap.ecosoul.bo.ViagemBO;
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
 * Endpoints REST de viagens consumidos pelo front-end.
 */
@RestController
@RequestMapping("/viagens")
public class ViagemResource {

    private final ViagemBO viagemBO = new ViagemBO();

    // GET /viagens -> 200
    @GetMapping
    public List<Viagem> listar() {
        return viagemBO.listar();
    }

    // GET /viagens/{id} -> 200 ou 404
    @GetMapping("/{id}")
    public Viagem buscar(@PathVariable Long id) {
        return viagemBO.buscarPorId(id);
    }

    // POST /viagens -> 201 ou 400
    @PostMapping
    public ResponseEntity<Viagem> cadastrar(@RequestBody Viagem viagem) {
        Viagem criada = viagemBO.cadastrar(viagem);
        return ResponseEntity.created(URI.create("/viagens/" + criada.getId())).body(criada);
    }

    // PUT /viagens/{id} -> 200, 400 ou 404
    @PutMapping("/{id}")
    public Viagem atualizar(@PathVariable Long id, @RequestBody Viagem viagem) {
        return viagemBO.atualizar(id, viagem);
    }

    // DELETE /viagens/{id} -> 204 ou 404
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        viagemBO.excluir(id);
        return ResponseEntity.noContent().build();
    }
}
