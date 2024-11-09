package com.example.demo.Entity;



import jakarta.persistence.*;

@Entity
@Table(name = "tblUser")
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private int id;

    @Lob
    @Column(name = "user_picture",columnDefinition = "LONGBLOB")
    private byte[]profilePicture;



    @Column(name = "id_Number")
    private String idNumber;






    @Column(name = "user_firstName")
    private String firstName;


    @Column(name = "user_lastName")
    private String lastName;




    @Column(name = "user_email")
    private String email;



    @Column(name = "user_password")
    private String password;




    @Column(name = "user_Role")
    private String userRole = "Student";






    public UserEntity(){

    }





    public UserEntity(int id,String email,String idNumber,String password){
        this.id = id;
        this.email = email;
        this.idNumber = idNumber;
        this.password = password;
    }

    public UserEntity(String email, String idNumber,String password){
        this.email = email;
        this.idNumber = idNumber;
        this.password = password;
    }


    public String getUserRole() {
        return userRole;
    }

    public void setUserRole(String userRole) {
        this.userRole = userRole;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public byte[] getProfilePicture() {
        return profilePicture;
    }

    public void setProfilePicture(byte[] profilePicture) {
        this.profilePicture = profilePicture;
    }

    public String getIdNumber() {
        return idNumber;
    }

    public void setIdNumber(String idNumber) {
        this.idNumber = idNumber;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }





    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}

