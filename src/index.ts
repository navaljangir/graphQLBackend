import { ApolloServer } from '@apollo/server'
import {expressMiddleware} from '@apollo/server/express4'
import express, { Application } from 'express'
import { prisma } from './lib/db'
import createGraphqlServer from './graphql/graphql'
import { User } from './graphql/user/user'
import { UserService } from './services/user'
const app = express()

const main =async ()=>{
    const apolloServer = await createGraphqlServer();
    app.use(express.json())
    app.use('/graphql' , expressMiddleware(apolloServer , {
        context :async({req})=>{
                const token =  req.headers['authorization']  as string
                try{
                    const user = UserService.decodeToken(token)
                    return {user};
                }catch(e){
                    return {}
                }
        
        }
    }) )
}
main()
app.listen(process.env.PORT , ()=>{
    console.log(`server is running on http://localhost:${process.env.PORT}`)
})