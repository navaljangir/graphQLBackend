import { prisma } from "../../lib/db";
import { userLoginPayload, UserService } from "../../services/user";

const queries = {
    login : async(_ : any , payload : userLoginPayload)=>{
        const logginIn = await UserService.userLogin(payload)
        if(logginIn){
            return logginIn
        }
    },
    getUserDetails : async(_: any , parameters : any, context : any) =>{
        const user = await UserService.getUserById(context.user.id)
        return user
    }
}
interface UserType{
    firstName: string;
    lastName : string;
    email : string;
    password: string;
    salt?: string;
}
const mutations = {
    createUser : async(_ :any , payload : UserType)=>{
      const userCreated = await UserService.createNewUser(payload)
        return userCreated
    },
    

}
export const resolvers = {queries , mutations}