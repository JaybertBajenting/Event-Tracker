package com.example.demo.Service;

import com.example.demo.Entity.EventEntity;
import com.example.demo.Entity.EventHandlerEntity;
import com.example.demo.Repository.EventHandlerRepository;
import com.example.demo.Repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class EventHandlerService {




    private final EventHandlerRepository eventHandlerRepository;
    private  final EventRepository eventRepository;

    @Autowired
    public EventHandlerService(EventHandlerRepository eventHandlerRepository,EventRepository eventRepository){
        this.eventHandlerRepository = eventHandlerRepository;
        this.eventRepository = eventRepository;
    }


    public EventHandlerEntity joinEvent(EventHandlerEntity eventHandlerEntity){
    return this.eventHandlerRepository.save(eventHandlerEntity);
    // this works because when a student joins an event his/her student id will be passed alongside the event id in the parameters
        // saving it to the database making it possible to see who joined the event

    }



    public List<EventHandlerEntity> getEventsJoined(){
        return this.eventHandlerRepository.findAll();
    }



       public List<EventEntity> getEventsJoinedByStudentId(int studentId){
        List<EventEntity> events = this.eventRepository.findAll();
        List<EventHandlerEntity> eventHandle = this.eventHandlerRepository.findAll();

        List<EventEntity> studentEvents = new ArrayList<>();

        for(EventHandlerEntity eventHandlerEntity:eventHandle){
                if(eventHandlerEntity.getStudentId() == studentId){
                    EventEntity event = this.eventRepository.findById(eventHandlerEntity.getEventId()).get();
                    studentEvents.add(event);
                }
        }


        return  studentEvents;
    }







    public String withDrawEvent(EventHandlerEntity eventHandler){

        int eventId = eventHandler.getEventId();
        int studentId = eventHandler.getStudentId();



        List<EventHandlerEntity> eventsHandle = this.eventHandlerRepository.findAll();

        for(EventHandlerEntity eventHandlerEntity: eventsHandle){
            if(eventHandlerEntity.getEventId() == eventId && eventHandlerEntity.getStudentId() == studentId){
                this.eventHandlerRepository.delete(eventHandlerEntity);
                return "You have successfully Withdrawn from an Event!";
            }
        }


       return "Failed to Withdraw from an Event";
    }





}
