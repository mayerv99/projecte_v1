package br.com.projecte.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.projecte.model.Interferencia;

@Repository
public interface InterferenciaRepository extends JpaRepository<Interferencia, String>{

	List<Interferencia> findByCodEmpreendimento(String codEmpreendimento);
	
}
