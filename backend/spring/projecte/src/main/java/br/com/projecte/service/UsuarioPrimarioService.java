package br.com.projecte.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.projecte.model.UsuarioPrincipal;
import br.com.projecte.repository.UsuarioPrincipalRepository;

@Service
public class UsuarioPrimarioService {

	@Autowired
	UsuarioPrincipalRepository repository;
	
	public List<UsuarioPrincipal> listar(String codEmpreendimento) {
		return repository.findByCodEmpreendimento(codEmpreendimento);
	}
	
	public UsuarioPrincipal salvar(UsuarioPrincipal usuario) {
		return repository.save(usuario);
	}
	
	public UsuarioPrincipal editar(UsuarioPrincipal usuario) {
		return repository.save(usuario);
	}
	
	public void excluir(Long id) {
		repository.deleteById(id);
	}
}
