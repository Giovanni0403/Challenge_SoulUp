package br.com.fiap.ecosoul.model;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDate;

/**
 * Pessoa que registra viagens na EcoSoul (tabela T_ECO_USUARIO).
 * Um usuário pode ter várias viagens.
 */
public class Usuario {

    private Long id;
    private String nome;
    private String email;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate dataCadastro;

    public Usuario() {
    }

    public Usuario(Long id, String nome, String email, LocalDate dataCadastro) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.dataCadastro = dataCadastro;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public LocalDate getDataCadastro() {
        return dataCadastro;
    }

    public void setDataCadastro(LocalDate dataCadastro) {
        this.dataCadastro = dataCadastro;
    }
}
