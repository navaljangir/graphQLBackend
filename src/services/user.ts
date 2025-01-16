import { create } from "domain"
import { prisma } from "../lib/db"
import bcrypt from 'bcrypt'
import JWT from 'jsonwebtoken'
export interface createUserType{
    firstName : string
    lastName? : string
    email : string
    password : string
}

export interface userLoginPayload{
    email : string
    password: string
}
export class UserService{
    private static async userExists(email : string){
        return await prisma.user.findUnique({
            where : {
                email : email
            }
        })
    }
    public static async createNewUser(payload : createUserType){
        const userFind = await UserService.userExists(payload.email)
        if(userFind){
            throw new Error('User already exists')
        }
        const saltRounds = 10;
        const hashedPassword =await bcrypt.hash(payload.password ,10);
        const createUser= await prisma.user.create({
            data : {
                firstName : payload.firstName,
                lastName : payload.lastName,
                email : payload.email, 
                password :  hashedPassword,
            }
        })
        return createUser.id
    }
    public static decodeToken(token : string){
        return JWT.verify(token , process.env.JWT_SECRET || 'mysecret')
    }
    public static async getUserById(id : string){
        const userDetails = await prisma.user.findUnique({
            where : {
                id : id
            }
        })
        console.log('yha aaya' , userDetails)
        return userDetails
    }
    public static async userLogin(payload: userLoginPayload){
        const email = payload.email
        const password = payload.password
        const user =await UserService.userExists(email) 
        if(!user){
            throw new Error('User not found')
        }
        const matchPassword = await bcrypt.compare(password , user.password)
        if(!matchPassword){
            throw new Error('Invalid Email/Password')
        }
        const token = JWT.sign({
            id : user.id,
            email : user.email
        } ,process.env.JWT_SECRET || "mysecret")
        return token
    }
}