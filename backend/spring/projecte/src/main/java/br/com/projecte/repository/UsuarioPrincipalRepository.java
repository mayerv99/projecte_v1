package br.com.projecte.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.projecte.model.UsuarioPrincipal;

@Repository
public interface UsuarioPrincipalRepository extends JpaRepository<UsuarioPrincipal, Long>{

	List<UsuarioPrincipal> findByCodEmpreendimento(String codEmpreendimento);
	
}
