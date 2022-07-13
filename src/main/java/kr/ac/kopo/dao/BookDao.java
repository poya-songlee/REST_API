package kr.ac.kopo.dao;

import java.util.List;

import kr.ac.kopo.model.Book;

public interface BookDao {

	List<Book> list();

	Book item(int code);

	void add(Book book);

	void update(Book book);

	void delete(int code);

}
