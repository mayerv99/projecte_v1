package br.com.projecte.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.stereotype.Service;

import br.com.projecte.model.Usuario;
import br.com.projecte.repository.UsuarioRepository;

@Service
public class UsuarioService {

	@Autowired
	UsuarioRepository repository;
	
	public List<Usuario> listar() {
		return repository.findAll();
	}
	
	public Usuario consultar(String id) throws NotFoundException {
		return repository.findById(id).orElseThrow(NotFoundException::new);
	}
	
	public Usuario salvar(Usuario usuario) {
		return repository.save(usuario);
	}
	
	public Usuario editar(Usuario usuario) {
		return repository.save(usuario);
	}
	
	public void excluir(String id) {
		repository.deleteById(id);
	}
	
}
