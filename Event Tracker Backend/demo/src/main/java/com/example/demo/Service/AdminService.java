package com.example.demo.Service;


import com.example.demo.Classes.ConvertToPdf;
import com.example.demo.Entity.EventEntity;
import com.example.demo.Entity.EventHandlerEntity;
import com.example.demo.Entity.UserEntity;
import com.example.demo.Repository.EventHandlerRepository;
import com.example.demo.Repository.EventRepository;
import com.example.demo.Repository.UserRepository;
import jdk.jfr.Event;
import org.apache.catalina.User;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.List;

@Service
public class AdminService {




    private final EventHandlerService eventHandlerService;
    private final EventHandlerRepository eventHandlerRepository;

    private final EventRepository eventRepository;


    private final UserRepository userRepository;


    @Autowired
    public AdminService(EventHandlerRepository eventHandlerRepository, EventRepository eventRepository, EventHandlerService eventHandlerService,
                        UserRepository userRepository){
        this.eventHandlerRepository = eventHandlerRepository;
        this.eventRepository = eventRepository;
        this.eventHandlerService = eventHandlerService;
        this.userRepository = userRepository;
    }



    public int getAttendanceCount(int eventId){
        int count = 0;

        if(this.eventRepository.existsById(eventId)){

            List<EventHandlerEntity> eventHandlerEntityList = this.eventHandlerRepository.findAll();
            EventEntity event = this.eventRepository.findById(eventId).get();

            for(EventHandlerEntity eventHandlerEntity:eventHandlerEntityList){
                if(event.getId() == eventHandlerEntity.getEventId()){
                    count++;
                }
            }

        }else{
            return 0;
        }


        return count;
    }

    public int getEventsJoinedCount(int studentId){
        return this.eventHandlerService.getEventsJoinedByStudentId(studentId).size();
    }



    public String getAllData() throws IOException {

        List<UserEntity> allUsers = this.userRepository.findAll();
        List<EventEntity> allEvents = this.eventRepository.findAll();


        Workbook wb = new XSSFWorkbook();

        Sheet sheet = wb.createSheet("Users");

        List<String> headers = new ArrayList<>(List.of("user_id","first_name","last_name",
                "email","password","id_number","user_role"));

        int rowSize = headers.size();
        Row row = sheet.createRow(0);


        for(int i = 0; i < rowSize; i++){
            row.createCell(i).setCellValue(headers.get(i));
        }


        int usersSize = allUsers.size();



        for(int j = 0; j < usersSize; j++){
            Row rowUsers = sheet.createRow(j+1);

            UserEntity user = allUsers.get(j);
            String userId = String.valueOf(user.getId());
            String firstName = user.getFirstName();
            String lastName = user.getLastName();
            String email = user.getEmail();
            String password = user.getPassword();
            String idNumber = user.getIdNumber();
            String userRole = user.getUserRole();


            String[] userData = {userId, firstName != null ? firstName:"null",
                    lastName != null ? lastName:"null",
                    email != null ? email:"null",
                    password != null ? password:"null",
                    idNumber != null ? idNumber:"null",
                    userRole};

            for(int k = 0; k < rowSize; k++){
             rowUsers.createCell(k).setCellValue(userData[k]);
            }
        }



        Sheet eventSheets = wb.createSheet("Events");

        List<String> eventHeaders = new ArrayList<>(List.of("event_id","event_name","event_description",
                "event_starts","event_ends","event_location","organizer_id"));


        int eventHeaderRowSize = eventHeaders.size();


        Row eventRowHeaders = eventSheets.createRow(0);


        for(int i = 0; i < eventHeaderRowSize; i++){
            eventRowHeaders.createCell(i).setCellValue(eventHeaders.get(i));
        }

        for(int i = 0; i < allEvents.size(); i++){

            Row rowEvents = eventSheets.createRow(i+1);

            EventEntity event = allEvents.get(i);

            String eventId = String.valueOf(event.getId());
            String eventName = event.getEventName();
            String eventDescription = event.getEventDescription();
            String eventStarts = String.valueOf(event.getEventStarts());
            String eventEnds = String.valueOf(event.getEventEnds());
            String eventLocation = event.getLocation();
            String organizerId = String.valueOf(event.getOrganizerId());

            String[] eventData = {eventId,
            eventName != null ? eventName:"null",
            eventDescription != null ? eventDescription:"null",
       eventStarts != null ? eventStarts:"null",
       eventEnds != null ? eventEnds:"null",
                    eventLocation != null ? eventLocation:"null",
                    organizerId != null ? organizerId:"null"
            };

            for(int j = 0; j < eventHeaderRowSize; j++){
                rowEvents.createCell(j).setCellValue(eventData[j]);
            }

        }





        // kol e change imo path dri
        try (OutputStream fileOut = new FileOutputStream("C:\\Users\\Jaybert\\Pogi.xlsx")) {
            wb.write(fileOut);
        }

        // new ConvertToPdf();
        // ako gi comment kol kay gi excel rana nako kay basta e pdf di masakto tanang fields nya bati kaau
        // e change pd imo path didto sa ConvertToPdf class kay mag error nya






        return "Data has been gathered";
    }









}
