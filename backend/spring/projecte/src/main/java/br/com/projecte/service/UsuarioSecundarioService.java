package br.com.projecte.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.projecte.model.UsuarioSecundario;
import br.com.projecte.repository.UsuarioSecundarioRepository;

@Service
public class UsuarioSecundarioService {

	@Autowired
	UsuarioSecundarioRepository repository;
	
	public List<UsuarioSecundario> listar(String codEmpreendimento) {
		return repository.findByCodEmpreendimento(codEmpreendimento);
	}
	
	public UsuarioSecundario salvar(UsuarioSecundario usuario) {
		return repository.save(usuario);
	}
	
	public UsuarioSecundario editar(UsuarioSecundario usuario) {
		return repository.save(usuario);
	}
	
	public void excluir(Long id) {
		repository.deleteById(id);
	}
}
