import { ApolloServer } from "@apollo/server"
import { prisma } from "../lib/db"
import { User } from "./user/user";
interface UserType{
    firstName: string;
    lastName : string;
    email : string;
    password: string;
    salt?: string;
}
async function createGraphqlServer(){
    const apolloServer =new ApolloServer({
        typeDefs : `
            ${User.typeDefs}
            type Query{
                ${User.queries}
            }
            type Mutation{
                ${User.mutations}
            }
        `,
        resolvers : {
            Query : {
                ...User.resolvers.queries
            } ,
            Mutation: {
                ...User.resolvers.mutations
            }
            
        }
    })
    await apolloServer.start()
    return apolloServer
}

export default createGraphqlServer