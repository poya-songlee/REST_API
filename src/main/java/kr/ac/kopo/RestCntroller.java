package kr.ac.kopo;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.ac.kopo.model.Book;
import kr.ac.kopo.service.BookService;

@RequestMapping("/api")
@RestController
public class RestCntroller {
	
	@Autowired BookService service;
	
	@GetMapping
	public List<Book> list() {
		List<Book> list = service.list();
		System.out.println("list");
		return list;
	}
	
	@GetMapping("/{code}")
	public Book item(@PathVariable int code) {
		Book item = service.item(code);
		System.out.println("item");
		return item;
	}
	
	@PostMapping
	public Book add(@RequestBody Book book) {
		System.out.println("add");
		service.add(book);
		return book;
	}
	
	//patch 는 부분적인 수정을 할 때 사용
	//put은 전체 데이터를 보내지않으면 다른 데이터가 null 또는 default 처리되어버리니 전체 데이터를 전송해야 함! 때문에 전체적인 데이터 변경에 사용
	@PatchMapping
	public Book update(@RequestBody Book book) {
		service.update(book);
		System.out.println("update");
		return book;
	}
	
	@DeleteMapping("/{code}")
	public Integer delete(@PathVariable int code) {
		service.delete(code);
		System.out.println("delete");
		return code;
	}


}
