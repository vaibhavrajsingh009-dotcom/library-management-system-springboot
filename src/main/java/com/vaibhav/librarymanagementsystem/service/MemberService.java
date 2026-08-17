package com.vaibhav.librarymanagementsystem.service;

import com.vaibhav.librarymanagementsystem.entity.Member;
import com.vaibhav.librarymanagementsystem.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MemberService {
    @Autowired
    private MemberRepository memberRepository;

    public Member addMember (Member member){
        return memberRepository.save(member);
    }
    public List<Member> getAllMembers(){
        return memberRepository.findAll();
    }
    public Member getMemberById(Long id){
        return memberRepository.findById(id).orElse(null);
    }
    public Member updateMember(Long id, Member updatedMember) {

        Member existingMember = memberRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Member not found"));

        existingMember.setName(updatedMember.getName());
        existingMember.setEmail(updatedMember.getEmail());
        existingMember.setPhoneNumber(updatedMember.getPhoneNumber());

        return memberRepository.save(existingMember);
    }
    public void deleteMember(Long id){
        memberRepository.deleteById(id);
    }

}
