package kr.ac.kopo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.ac.kopo.dao.BookDao;
import kr.ac.kopo.model.Book;

@Service
public class BookServiceImpl implements BookService {

	@Autowired BookDao dao;
	
	@Override
	public List<Book> list() {
		return dao.list();
	}

	@Override
	public Book item(int code) {
		return dao.item(code);
	}

	@Override
	public void add(Book book) {
		dao.add(book);
	}

	@Override
	public void update(Book book) {
		dao.update(book);
	}

	@Override
	public void delete(int code) {
		dao.delete(code);
	}

}
