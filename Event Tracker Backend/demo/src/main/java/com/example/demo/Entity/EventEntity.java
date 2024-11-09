package com.example.demo.Entity;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "tbl_event")
public class EventEntity {


    @Id
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    @Column(name = "event_id")
    private int id;




    @Column(name = "event_Name")
    private String eventName;





    @Column(name = "event_Description"  )
    private String eventDescription;


    @Column(name = "event_Start")
    private Date eventStarts;


    @Column(name = "event_Ends")
    private Date eventEnds;


    @Column(name = "event_Location")
    private String location;







    @Lob
    @Column(name = "event_Picture", columnDefinition = "LONGBLOB")
    private byte[] eventPicture;





    @Column(name = "organizer_id")
    private int organizerId;



    public EventEntity(int id, String eventName, String eventDescription, Date eventStarts, Date eventEnds,String location, byte[] eventPicture, int organizerId) {
        this.id = id;
        this.eventName = eventName;
        this.eventDescription = eventDescription;
        this.eventStarts = eventStarts;
        this.eventEnds = eventEnds;
        this.location = location;
        this.eventPicture = eventPicture;
        this.organizerId = organizerId;
    }



    public EventEntity(String eventName, String eventDescription, Date eventStarts, Date eventEnds,String location, byte[] eventPicture, int organizerId) {
        this.eventName = eventName;
        this.eventDescription = eventDescription;
        this.eventStarts = eventStarts;
        this.eventEnds = eventEnds;
        this.location = location;
        this.eventPicture = eventPicture;
        this.organizerId = organizerId;
    }

    public EventEntity(){

    }


    public String getLocation(){
        return this.location;
    }

    public void setLocation(String location){
        this.location = location;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getEventName() {
        return eventName;
    }

    public void setEventName(String eventName) {
        this.eventName = eventName;
    }

    public String getEventDescription() {
        return eventDescription;
    }

    public void setEventDescription(String eventDescription) {
        this.eventDescription = eventDescription;
    }

    public Date getEventStarts() {
        return eventStarts;
    }

    public void setEventStarts(Date eventStarts) {
        this.eventStarts = eventStarts;
    }

    public Date getEventEnds() {
        return eventEnds;
    }

    public void setEventEnds(Date eventEnds) {
        this.eventEnds = eventEnds;
    }

    public byte[] getEventPicture() {
        return eventPicture;
    }

    public void setEventPicture(byte[] eventPicture) {
        this.eventPicture = eventPicture;
    }

    public int getOrganizerId() {
        return organizerId;
    }

    public void setOrganizerId(int organizerId) {
        this.organizerId = organizerId;
    }
}

