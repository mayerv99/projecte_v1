package br.com.projecte.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.stereotype.Service;

import br.com.projecte.model.Empreendimento;
import br.com.projecte.repository.EmpreendimentoRepository;

@Service
public class EmpreendimentoService {

	@Autowired
	EmpreendimentoRepository repository;
	
	
	public List<Empreendimento> listar() {
		return repository.findAll();
	}
	
	public Empreendimento consultar(String id) throws NotFoundException {
		return repository.findById(id).orElseThrow(NotFoundException::new);
	}
	
	public Empreendimento salvar(Empreendimento empreendimento) {
		return repository.saveAndFlush(empreendimento);
	}
	
	public Empreendimento editar(Empreendimento empreendimento) {
		return repository.save(empreendimento);
	}
	
	public void excluir(String id) {
		repository.deleteById(id);
	}
}
