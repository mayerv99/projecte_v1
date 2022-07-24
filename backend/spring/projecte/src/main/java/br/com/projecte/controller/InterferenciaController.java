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

import br.com.projecte.model.Interferencia;
import br.com.projecte.service.InterferenciaService;

@RestController
@RequestMapping("/interferencia")
public class InterferenciaController {

	@Autowired
	InterferenciaService service;
	
	@GetMapping("/lista/{codEmpreendimento}")
	public List<Interferencia> listar(@PathVariable String codEmpreendimento) {
		return service.listar(codEmpreendimento);
	}
	
	@GetMapping("/{id}")
	public Interferencia Consultar(@PathVariable String id) throws NotFoundException {
		return service.consultar(id);
	}
	
	@PostMapping
	public Interferencia salvar(@RequestBody Interferencia interferencia) {
		return service.salvar(interferencia);
	}
	
	@PutMapping
	public Interferencia editar(@RequestBody Interferencia interferencia) {
		return service.editar(interferencia);
	}
	
	@DeleteMapping("/{id}")
	public void excluir(@PathVariable String id) {
		service.excluir(id);
	}
}
