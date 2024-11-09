package com.example.demo.Entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CollectionId;

@Entity
@Table(name = "tbl_eventHandler")
public class EventHandlerEntity {


    @Id
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    @Column(name = "Event_Handler ID")
    private int id;


    @Column(name = "student_id")
    private int studentId;


    @Column(name = "event_id")
    private int eventId;



    public EventHandlerEntity(int id, int studentId, int eventId){
        this.id = id;
        this.studentId = studentId;
        this.eventId = eventId;
    }

    public EventHandlerEntity(int studentId, int eventId){
        this.eventId = eventId;
        this.studentId = studentId;
    }

    public EventHandlerEntity(){

    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getStudentId() {
        return studentId;
    }

    public void setStudentId(int studentId) {
        this.studentId = studentId;
    }

    public int getEventId() {
        return eventId;
    }

    public void setEventId(int eventId) {
        this.eventId = eventId;
    }
}
