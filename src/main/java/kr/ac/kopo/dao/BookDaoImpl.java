package kr.ac.kopo.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import kr.ac.kopo.model.Book;

@Repository
public class BookDaoImpl implements BookDao {
	
	@Autowired
	SqlSession sql;
	
	@Override
	public List<Book> list() {
		return sql.selectList("book.list");
	}

	@Override
	public Book item(int code) {
		return sql.selectOne("book.item", code);
	}

	@Override
	public void add(Book book) {
		sql.insert("book.add", book);
	}

	@Override
	public void update(Book book) {
		sql.update("book.update", book);
	}

	@Override
	public void delete(int code) {
		sql.delete("book.delete", code);
	}

}
