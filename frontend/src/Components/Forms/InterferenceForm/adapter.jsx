export const interferenceDataAdapter = ({
  cte_tca_ds_1,
  cte_tsa_ds,
  cte_tsc_ds_1,
  cts_tsc_ds,
  fin_secundaria,
  fin_terciaria,
  fin_tfn_ds,
  fonte_energia,
  int_tch_ds,
  int_tdm_ds,
  int_tin_ds,
  int_tsi_ds,
  int_tsu_ds,
  ttc_tcu_ds,
  cte_tca_ds_2,
  cte_tsc_ds_2,
  ...rest
}) => {
  return {
    ...rest,
    cte_tca_ds_1: cte_tca_ds_1.value,
    cte_tsc_ds_1: cte_tsc_ds_1.value,
    fin_secundaria: fin_secundaria.value,
    fin_terciaria: fin_terciaria.value,
    fin_tfn_ds: fin_tfn_ds.value,
    fonte_energia: fonte_energia.value,
    ...(int_tch_ds && { int_tch_ds: int_tch_ds.value }),
    int_tdm_ds: int_tdm_ds.value,
    int_tin_ds: int_tin_ds.value,
    int_tsi_ds: int_tsi_ds.value,
    int_tsu_ds: int_tsu_ds.value,
    ttc_tcu_ds: ttc_tcu_ds.value,
    cte_tca_ds_2: cte_tca_ds_2.value,
    cte_tsc_ds_2: cte_tsc_ds_2.value,
  };
};

export const getSelectFieldOptions = ({
  cte_tca_ds_1,
  cte_tsa_ds,
  cte_tsc_ds_1,
  cts_tsc_ds,
  fin_secundaria,
  fin_terciaria,
  fin_tfn_ds,
  fonte_energia,
  int_tch_ds,
  int_tdm_ds,
  int_tin_ds,
  int_tsi_ds,
  int_tsu_ds,
  ttc_tcu_ds,
  cte_tca_ds_2,
  cte_tsc_ds_2,
  ...rest
}) => {
  return {
    cte_tca_ds_1: { label: cte_tca_ds_1, value: cte_tca_ds_1 },
    cte_tsa_ds: { label: cte_tsa_ds, value: cte_tsa_ds },
    cte_tsc_ds_1: { label: cte_tsc_ds_1, value: cte_tsc_ds_1 },
    cts_tsc_ds: { label: cts_tsc_ds, value: cts_tsc_ds },
    fin_secundaria: { label: fin_secundaria, value: fin_secundaria },
    fin_terciaria: { label: fin_terciaria, value: fin_terciaria },
    fin_tfn_ds: { label: fin_tfn_ds, value: fin_tfn_ds },
    fonte_energia: { label: fonte_energia, value: fonte_energia },
    int_tch_ds: int_tch_ds ? { label: int_tch_ds, value: int_tch_ds } : "",
    int_tdm_ds: { label: int_tdm_ds, value: int_tdm_ds },
    int_tin_ds: { label: int_tin_ds, value: int_tin_ds },
    int_tsi_ds: { label: int_tsi_ds, value: int_tsi_ds },
    int_tsu_ds: { label: int_tsu_ds, value: int_tsu_ds },
    ttc_tcu_ds: { label: ttc_tcu_ds, value: ttc_tcu_ds },
    cte_tca_ds_2: { label: cte_tca_ds_2, value: cte_tca_ds_2 },
    cte_tsc_ds_2: { label: cte_tsc_ds_2, value: cte_tsc_ds_2 },
  };
};

export const returnOnlyUnformFields = (props) => {
  console.log("unformFields: ", props);
  return {
    cod_interferencia: props.cod_interferencia,
    unidade_consumidora: props.unidade_consumidora,
    nome_inscrito: props.nome_inscrito,
    int_cd_regla: props.int_cd_regla,
    int_nm_corpohidrico: props.int_nm_corpohidrico,
    int_nu_latitude: props.int_nu_latitude,
    int_nu_longitude: props.int_nu_longitude,
    ing_sg_ufmunicipio: props.ing_sg_ufmunicipio,
    ing_nm_municipio: props.ing_nm_municipio,
    numero_tanques: props.numero_tanques,
    fes_nu_profundidademediatanque: props.fes_nu_areatotaltanque,
    fes_nu_areatotaltanque: props.fes_nu_areatotaltanque,
    cte_nu_cabecas_1: props.cte_nu_cabecas_1,
    cte_nu_cabecas_2: props.cte_nu_cabecas_2,
    nu_pessoas: props.nu_pessoas,
    observacao_finalidade: props.observacao_finalidade,
  };
};
