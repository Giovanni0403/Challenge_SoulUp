package br.com.fiap.ecosoul.model;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDate;

/**
 * Representa uma viagem feita de transporte público (tabela T_ECO_VIAGEM).
 * Cada viagem pertence a um usuário.
 */
public class Viagem {

    private Long id;
    private Usuario usuario;
    private String origem;
    private String destino;
    private TipoTransporte transporte;
    private Double distanciaKm;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate data;

    public Viagem() {
    }

    public Viagem(Long id, Usuario usuario, String origem, String destino,
                  TipoTransporte transporte, Double distanciaKm, LocalDate data) {
        this.id = id;
        this.usuario = usuario;
        this.origem = origem;
        this.destino = destino;
        this.transporte = transporte;
        this.distanciaKm = distanciaKm;
        this.data = data;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public String getOrigem() {
        return origem;
    }

    public void setOrigem(String origem) {
        this.origem = origem;
    }

    public String getDestino() {
        return destino;
    }

    public void setDestino(String destino) {
        this.destino = destino;
    }

    public TipoTransporte getTransporte() {
        return transporte;
    }

    public void setTransporte(TipoTransporte transporte) {
        this.transporte = transporte;
    }

    public Double getDistanciaKm() {
        return distanciaKm;
    }

    public void setDistanciaKm(Double distanciaKm) {
        this.distanciaKm = distanciaKm;
    }

    public LocalDate getData() {
        return data;
    }

    public void setData(LocalDate data) {
        this.data = data;
    }
}
