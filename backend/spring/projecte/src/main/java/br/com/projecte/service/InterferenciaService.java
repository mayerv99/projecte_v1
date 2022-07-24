package br.com.projecte.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.stereotype.Service;

import br.com.projecte.model.Interferencia;
import br.com.projecte.repository.InterferenciaRepository;

@Service
public class InterferenciaService {
	
	@Autowired
	InterferenciaRepository repository;
	
	public List<Interferencia> listar(String codEmpreendimento) {
		return repository.findByCodEmpreendimento(codEmpreendimento);
	}
	
	public Interferencia consultar(String id) throws NotFoundException {
		return repository.findById(id).orElseThrow(NotFoundException::new);
	}
	
	public Interferencia salvar(Interferencia interferencia) {
		return repository.save(interferencia);
	}
	
	public Interferencia editar(Interferencia interferencia) {
		return repository.save(interferencia);
	}
	
	public void excluir(String id) {
		repository.deleteById(id);
	}
 }
