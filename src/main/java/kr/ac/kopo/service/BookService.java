package kr.ac.kopo.service;

import java.util.List;

import kr.ac.kopo.model.Book;

public interface BookService {

	List<Book> list();

	Book item(int code);

	void add(Book book);

	void update(Book book);

	void delete(int code);


}
