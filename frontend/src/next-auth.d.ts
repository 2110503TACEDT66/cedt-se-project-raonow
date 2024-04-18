import NextAuth from 'next-auth'
import { User } from '../interface'

declare module "next-auth" {
    interface Session {
        user: {
            _id: string,
            token: string,
            user: User.data
        }
    }
}