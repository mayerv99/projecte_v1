package br.com.projecte.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.Data;

@Data
@Entity
public class Interferencia {
	
	@Id
	private String cod_interferencia;
	
	@Column(name = "cod_empreendimento")
	private String codEmpreendimento;
	
	private String unidade_consumidora;
	private String nome_inscrito;
	private String int_cd_regla;
	private String int_tin_ds;
	private String int_tsu_ds;
	private String int_nm_corpohidrico;
	private String int_tch_ds;
	private String int_nu_latitude;
	private String int_nu_longitude;
	private String ing_sg_ufmunicipio;
	private String ing_nm_municipio;
	private String int_tdm_ds;
	private String fonte_energia;
	private String int_tsi_ds;
	private String fin_tfn_ds;
	private String fin_secundaria;
	private String fin_terciaria;
	private Long numero_tanques;
	private Float fes_nu_profundidademediatanque;
	private Float fes_nu_areatotaltanque;
	private String ttc_tcu_ds;
	private String cte_tca_ds_1;
	private String cte_tsc_ds_1;
	private Long cte_nu_cabecas_1;
	private String cte_tca_ds_2;
	private String cte_tsc_ds_2;
	private Long cte_nu_cabecas_2;
	
	private Long nu_pessoas;
	private String observacao_finalidade;
	
	
	
}
