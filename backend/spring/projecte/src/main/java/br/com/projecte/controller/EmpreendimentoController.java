package br.com.projecte.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.projecte.model.Empreendimento;
import br.com.projecte.service.EmpreendimentoService;

@RestController	
@CrossOrigin
@RequestMapping("/empreendimento")
public class EmpreendimentoController {
	
	@Autowired
	EmpreendimentoService service;
	
	@GetMapping
	public List<Empreendimento> listar() {
		return service.listar();
	}
	
	@GetMapping("/{id}")
	public Empreendimento Consultar(@PathVariable String id) throws NotFoundException {
		return service.consultar(id);
	}
	
	@PostMapping
	public Empreendimento salvar(@RequestBody Empreendimento empreendimento) {
		return service.salvar(empreendimento);
	}
	
	@PutMapping
	public Empreendimento editar(@RequestBody Empreendimento empreendimento) {
		return service.editar(empreendimento);
	}
	
	@DeleteMapping("/{id}")
	public void excluir(@PathVariable String id) {
		service.excluir(id);
	}
}
