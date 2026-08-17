package com.vaibhav.librarymanagementsystem.controller;

import com.vaibhav.librarymanagementsystem.entity.BorrowRecord;
import com.vaibhav.librarymanagementsystem.service.BorrowRecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/borrow")
public class BorrowRecordController {

    @Autowired
    private BorrowRecordService borrowRecordService;

    @PostMapping("/{bookId}/member/{memberId}")
    public BorrowRecord borrowBook(
            @PathVariable Long bookId,
            @PathVariable Long memberId) {

        return borrowRecordService.borrowBook(bookId, memberId);
    }

    @PutMapping("/return/{recordId}")
    public BorrowRecord returnBook(
            @PathVariable Long recordId) {

        return borrowRecordService.returnBook(recordId);
    }

    @GetMapping
    public List<BorrowRecord> getAllBorrowRecords() {
        return borrowRecordService.getAllBorrowRecords();
    }
}