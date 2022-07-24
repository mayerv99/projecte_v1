package br.com.projecte.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.projecte.model.Empreendimento;

@Repository
public interface EmpreendimentoRepository extends JpaRepository<Empreendimento, String>{

}
