package com.example.demo.Service;

import com.example.demo.Classes.Student;
import com.example.demo.Entity.EventHandlerEntity;
import com.example.demo.Entity.UserEntity;
import com.example.demo.Repository.EventHandlerRepository;
import com.example.demo.Repository.EventRepository;
import com.example.demo.Repository.UserRepository;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.datasource.init.ScriptUtils;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;




@Service
public class UserService {


    private final UserRepository userRepository;
    private final EventHandlerRepository eventHandlerRepository;










    @Autowired
    public UserService(UserRepository userRepository, EventHandlerRepository eventHandlerRepository){

        this.userRepository = userRepository;
        this.eventHandlerRepository = eventHandlerRepository;

    }


    public Student makeAccount(Student student) {

        return this.userRepository.save(student);
    }


    public List<UserEntity> getAccounts(){
        return this.userRepository.findAll();
    }



    public String deleteUser(int id){
            if(this.userRepository.existsById(id)){
                List<EventHandlerEntity> eventHandlerEntities = this.eventHandlerRepository.findAll();
                UserEntity user = this.userRepository.findById(id).get();
                for(EventHandlerEntity entity:eventHandlerEntities){
                    if(entity.getStudentId() == user.getId()){
                        this.eventHandlerRepository.delete(entity);
                    }
                }


                this.userRepository.deleteById(id);
                return "Account has been Deleted";
            }

            return "Account not Found";
    }


    public UserEntity getAccountByCredentials(String email, String password){

        List<UserEntity> accounts = this.userRepository.findAll();

        for(UserEntity account:accounts){
            if(account.getEmail().equals(email) && account.getPassword().equals(password)) return account;
        }

        return null;
    }





    public UserEntity getAccountById(int id){
        if(this.userRepository.existsById(id)){

            return this.userRepository.findById(id).get();
        }
        return null;
    }




    public void uploadPicture(int id, MultipartFile picture){
     try{
         UserEntity currentUser = this.userRepository.findById(id).get();
         currentUser.setProfilePicture(picture.getBytes());
         this.userRepository.save(currentUser);
         System.out.println("Successfully Uploaded a Picture");
     }catch(Exception e){
         System.out.println(e);
     }
    }


    public byte[] getProfilePicture(int id){
        UserEntity currentUser = this.userRepository.findById(id).get();
        return currentUser.getProfilePicture();
    }

    public UserEntity updateAccount(int id, UserEntity userEntity){
        UserEntity user = this.userRepository.findById(id).get();

        if (userEntity.getFirstName() != null && !userEntity.getFirstName().isEmpty()) {
            user.setFirstName(userEntity.getFirstName());
        }






        if (userEntity.getLastName() != null && !userEntity.getLastName().isEmpty()) {
            user.setLastName(userEntity.getLastName());
        }

        if (userEntity.getIdNumber() != null && !userEntity.getIdNumber().isEmpty()) {
            user.setIdNumber(userEntity.getIdNumber());
        }

        if (userEntity.getEmail() != null && !userEntity.getEmail().isEmpty()) {
            user.setEmail(userEntity.getEmail());
        }

        if (userEntity.getProfilePicture() != null && userEntity.getProfilePicture().length > 0) {
            user.setProfilePicture(userEntity.getProfilePicture());
        }

        return this.userRepository.save(user);
    }



    public void updateUserRole(int id, String userRole){
        try{ UserEntity currentUser = this.userRepository.findById(id).get();
            currentUser.setUserRole(userRole);
            this.userRepository.save(currentUser);
        System.out.println("Successfully Updated User Role");
        }
        catch(Exception e){
            System.out.println(e);
        }
    }

}

