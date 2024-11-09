package com.example.demo.Service;
import com.example.demo.Entity.EventEntity;
import com.example.demo.Entity.EventHandlerEntity;
import com.example.demo.Entity.UserEntity;
import com.example.demo.Repository.EventHandlerRepository;
import com.example.demo.Repository.EventRepository;
import com.example.demo.Repository.UserRepository;
import jdk.jfr.Event;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

import java.util.List;
import java.util.Optional;

@Service
public class EventService {





    private final EventRepository eventRepository;

    private final EventHandlerRepository eventHandlerRepository;

    @Autowired
    public EventService(EventRepository eventRepository, EventHandlerRepository eventHandlerRepository){
        this.eventRepository = eventRepository;
        this.eventHandlerRepository = eventHandlerRepository;
    }


    public EventEntity makeEvent(EventEntity eventEntity){
        return this.eventRepository.save(eventEntity);
    }

    public String deleteEvent(int id){
        if(this.eventRepository.existsById(id)){
            List<EventHandlerEntity> eventHandlerEntities = this.eventHandlerRepository.findAll();
            EventEntity event = this.eventRepository.findById(id).get();
            for(EventHandlerEntity entity:eventHandlerEntities){
                if(entity.getEventId() == event.getId()){
                    this.eventHandlerRepository.delete(entity);
                }
            }

            this.eventRepository.deleteById(id);
            return "Event has been Deleted";
        }

        return "Event not Found";


    }









    public EventEntity updateEvent(int id, EventEntity eventEntity){
        EventEntity newEvent = this.eventRepository.findById(id).orElse(null);


        if (eventEntity.getEventName() != null && !eventEntity.getEventName().isEmpty()) {
            newEvent.setEventName(eventEntity.getEventName());
        }

        if (eventEntity.getEventDescription() != null && !eventEntity.getEventDescription().isEmpty()) {
            newEvent.setEventDescription(eventEntity.getEventDescription());
        }

        if (eventEntity.getEventStarts() != null) {
            newEvent.setEventStarts(eventEntity.getEventStarts());
        }

        if (eventEntity.getEventEnds() != null) {
            newEvent.setEventEnds(eventEntity.getEventEnds());
        }

        if(eventEntity.getLocation() != null && !eventEntity.getLocation().isEmpty()){
            newEvent.setLocation(eventEntity.getLocation());
        }


        if (eventEntity.getEventPicture() != null && eventEntity.getEventPicture().length > 0) {
            newEvent.setEventPicture(eventEntity.getEventPicture());
        }

        return this.eventRepository.save(newEvent);


    }


    public List<EventEntity> getEvents(){
        return this.eventRepository.findAll();
    }



    public byte[] getEventPicture(int id){
        return this.eventRepository.findById(id).get().getEventPicture();
    }

    public EventEntity getEventById(int id){
        return this.eventRepository.findById(id).get();// This will find the event in the event repository based on the id that
        // has been passed
        //if naa bay event ang kana nga id
    }



    public void uploadPicture(int id, MultipartFile picture){
        try{
            EventEntity currentUser = this.eventRepository.findById(id).get();
           currentUser.setEventPicture(picture.getBytes());
            this.eventRepository.save(currentUser);
            System.out.println("Successfully Uploaded a Picture");
        }catch(Exception e){
            System.out.println(e);
        }

    }





}
