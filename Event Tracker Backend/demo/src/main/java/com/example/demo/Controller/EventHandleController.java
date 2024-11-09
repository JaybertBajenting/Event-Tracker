package com.example.demo.Controller;

import com.example.demo.Entity.EventEntity;
import com.example.demo.Entity.EventHandlerEntity;
import com.example.demo.Service.EventHandlerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("eventHandler")
@CrossOrigin(origins = "*")
public class EventHandleController {



    private final EventHandlerService eventHandlerService;


    @Autowired
    public EventHandleController(EventHandlerService eventHandlerService){
        this.eventHandlerService = eventHandlerService;
    }




    @GetMapping("getEventsJoined")
    public List<EventHandlerEntity> getEventsJoined() {
        return this.eventHandlerService.getEventsJoined();
    }


    @GetMapping("getEventsJoinById/")
    public List<EventEntity> getEventsJoinById(@RequestParam int id){
        return this.eventHandlerService.getEventsJoinedByStudentId(id);
    }


    @PostMapping("joinEvent")
    public EventHandlerEntity joinEvent(@RequestBody EventHandlerEntity eventHandlerEntity){
        return this.eventHandlerService.joinEvent(eventHandlerEntity);
        // The PostMapping annotation means that there will be a post request to the server
        // The RequestBody Annotation means that the value will be passed is an object
    }




    

    @DeleteMapping("withdrawEvent")
    public String withdrawEvent(@RequestBody EventHandlerEntity eventHandler){
        return this.eventHandlerService.withDrawEvent(eventHandler);
    }










}
