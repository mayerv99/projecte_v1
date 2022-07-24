package br.com.projecte.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.projecte.model.UsuarioSecundario;

@Repository
public interface UsuarioSecundarioRepository extends JpaRepository<UsuarioSecundario, Long>{

	List<UsuarioSecundario> findByCodEmpreendimento(String codEmpreendimento);
	
}
