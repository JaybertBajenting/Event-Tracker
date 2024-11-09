package com.example.demo.Controller;


import com.example.demo.Service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("admin")
@CrossOrigin(origins = "*")
public class AdminController {


    private final AdminService adminService;


    @Autowired
    public AdminController(AdminService adminService){
        this.adminService = adminService;
    }



    @GetMapping("getAttendanceCount/")
    public int getAttendanceCount(@RequestParam int eventId){
        return this.adminService.getAttendanceCount(eventId);
    }



    @GetMapping("getEventsJoinedCount/")
    public int getEventsJoinedCount(@RequestParam int studentId){
        return this.adminService.getEventsJoinedCount(studentId);
    }




    @GetMapping("getAllData")
    public String getAllData() throws IOException {
        return this.adminService.getAllData();
    }



}
