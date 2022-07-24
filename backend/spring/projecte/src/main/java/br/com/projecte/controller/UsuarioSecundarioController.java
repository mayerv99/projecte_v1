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

import br.com.projecte.model.UsuarioSecundario;
import br.com.projecte.service.UsuarioSecundarioService;

@RestController
@CrossOrigin
@RequestMapping("/usuario-secundario")
public class UsuarioSecundarioController {

	@Autowired
	UsuarioSecundarioService service;
	
	@GetMapping("/{codEmpreendimento}")
	public List<UsuarioSecundario> listar(@PathVariable String codEmpreendimento) {
		return service.listar(codEmpreendimento);
	}
	
	@PostMapping
	public UsuarioSecundario salvar(@RequestBody UsuarioSecundario usuario) {
		return service.salvar(usuario);
	}
	
	@PutMapping
	public UsuarioSecundario editar(@RequestBody UsuarioSecundario usuario) {
		return service.editar(usuario);
	}
	
	@DeleteMapping("{id}")
	public void excluir(@PathVariable Long id) {
		service.excluir(id);
	}
}
