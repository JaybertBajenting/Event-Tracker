package com.example.demo.Classes;

import com.example.demo.Entity.UserEntity;
import jakarta.persistence.Entity;


@Entity
public class Student extends UserEntity {


    public Student() {
    }

    public Student(int id, String email, String idNumber, String password) {
        super(id, email, idNumber, password);
    }

    public Student(String email, String idNumber, String password) {
        super(email, idNumber, password);
    }

    public void joinEvent(){

    }

    public void unjoinEvent(){

    }



}
