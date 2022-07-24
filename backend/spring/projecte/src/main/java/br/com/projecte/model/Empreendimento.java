package br.com.projecte.model;

import java.time.LocalDate;

import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.Data;

@Data
@Entity
public class Empreendimento {

	@Id
	private String cod_empreendimento;
	
	private String emp_nm_empreeendimento;
	private String nome_proprietario;
	private String cpf_cnpj_proprietario;
	private LocalDate data_cadastro;
	private String endereco;
	private String complemento_endereco;
	private String referencia_endereco;
	private Boolean ha_uso_de_agua;
	
	
}
