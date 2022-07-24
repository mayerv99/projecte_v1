package br.com.projecte.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.projecte.model.UsuarioPrincipal;
import br.com.projecte.service.UsuarioPrimarioService;

@RestController
@CrossOrigin
@RequestMapping("/usuario-primario")
public class UsuarioPrimarioController {
	
	@Autowired
	UsuarioPrimarioService service;
	
	@GetMapping("/{codEmpreendimento}")
	public List<UsuarioPrincipal> listar(@PathVariable String codEmpreendimento) {
		return service.listar(codEmpreendimento);
	}
	
	@PostMapping
	public UsuarioPrincipal salvar(@RequestBody UsuarioPrincipal usuario) {
		return service.salvar(usuario);
	}
	
	@PutMapping
	public UsuarioPrincipal editar(@RequestBody UsuarioPrincipal usuario) {
		return service.editar(usuario);
	}
	
	@DeleteMapping("{id}")
	public void excluir(@PathVariable Long id) {
		service.excluir(id);
	}
}
