package com.example.demo.Classes;

import com.example.demo.Entity.UserEntity;
import jakarta.persistence.Entity;

@Entity
public class Organizer extends UserEntity {






    public Organizer() {
    }

    public Organizer(int id, String email, String idNumber, String password) {
        super(id, email, idNumber, password);
    }

    public Organizer(String email, String idNumber, String password) {
        super(email, idNumber, password);
    }



    public void makeEvent(){

    }

    public void updateEvent(){

    }


    public void deleteEvent(){
    }


}
