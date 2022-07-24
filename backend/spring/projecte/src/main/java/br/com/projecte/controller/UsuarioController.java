package br.com.projecte.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.projecte.model.Usuario;
import br.com.projecte.service.UsuarioService;

@RestController
@RequestMapping("/usuario")
public class UsuarioController {
	
	@Autowired
	UsuarioService service;
	
	@GetMapping
	public List<Usuario> listar() {
		return service.listar();
	}
	
	@GetMapping("/{id}")
	public Usuario Consultar(@PathVariable String id) throws NotFoundException {
		return service.consultar(id);
	}
	
	@PostMapping
	public Usuario salvar(@RequestBody Usuario usuario) {
		return service.salvar(usuario);
	}
	
	@PutMapping
	public Usuario editar(@RequestBody Usuario usuario) {
		return service.editar(usuario);
	}
	
	@DeleteMapping("/{id}")
	public void excluir(@PathVariable String id) {
		service.excluir(id);
	}

}
