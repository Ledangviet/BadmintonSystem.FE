import e from "express";

export default class RegisterModel {

    constructor(email: string, password: string, phoneNumber: string, dateOfBirth: string,gender: number){
        this.email = email;
        this.userName = email;
        this.password = password;
        this.phoneNumber = phoneNumber;
        this.dateOfBirth = dateOfBirth;
        this.gender = gender;
    }
    unit: string = "";
    street: string = "";
    adressLine1: string = "";
    adressLine2: string = "";
    city : string = "";
    province : string = "";
    userName: string = "";
    email : string = "";
    firstName: string = "";
    lastName : string = "";
    password: string = "";
    phoneNumber : string = "";
    gender: number = 0;
    dateOfBirth: string = "";
    avatarUrl: string = "";
}