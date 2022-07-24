package br.com.projecte.model;

import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.Data;

@Data
@Entity
public class Usuario {

	@Id
	private String emp_nu_cpfcnpj;
	
	private String emp_nm_usuario;
	private Long emp_nu_ddd;
	private Long emp_nu_telefone;
	private String emp_ds_emailresponsavel;
	private String emp_ds_logradouro;
	private String emp_ds_complementoendereco;
	private Long emp_nu_logradouro;
	private String emp_ds_bairro;
	private String emp_nm_municipio;
	private String emp_sg_uf;
	private String emp_nu_cependereco;
	private Long emp_nu_caixapostal;
}