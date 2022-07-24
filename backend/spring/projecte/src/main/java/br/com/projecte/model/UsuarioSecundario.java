package br.com.projecte.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Data;

@Data
@Entity
public class UsuarioSecundario {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String cpf_cnpj_usuario;
	
	@Column(name = "cod_empreendimento")
	private String codEmpreendimento;
	
	private String relacao_usuario_principal_secundario;
	private String int_nu_cnarg;
	private String int_cd_regla;
	private Boolean situacao_irrigacao;
	private Boolean regularizado;
	private Boolean presente_no_local;
	private String outras_informacoes;

}
