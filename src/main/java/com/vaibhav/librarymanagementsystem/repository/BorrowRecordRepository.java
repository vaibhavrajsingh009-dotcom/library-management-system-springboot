package com.vaibhav.librarymanagementsystem.repository;

import com.vaibhav.librarymanagementsystem.entity.BorrowRecord;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BorrowRecordRepository extends JpaRepository<BorrowRecord , Long> {
}
