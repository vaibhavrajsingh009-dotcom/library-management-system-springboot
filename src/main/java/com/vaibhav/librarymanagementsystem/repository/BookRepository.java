package com.vaibhav.librarymanagementsystem.repository;

import com.vaibhav.librarymanagementsystem.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<Book,Long>{
}
