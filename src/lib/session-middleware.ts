"use server"

import { AUTH_COOKIE } from "@/features/auth/constants";
import { getCookie } from "hono/cookie";
import { createMiddleware} from "hono/factory";
import {
    Account,
    Client,
    Databases, 
    Storage,
    Models,
    type Account as AccountType,
    type Databases as DatabasesType,
    type Storage as StorageType,
    type Users as UsersType,

} from "node-appwrite";

type AdditionalContext = {
    Variables: {
       account : AccountType,
       databases : DatabasesType,
       storage: StorageType,
       users: UsersType,
       user: Models.User<Models.Preferences>

    }
}



export const sessionMiddleware =  createMiddleware<AdditionalContext>(
    async(c, next) => {
        // obtain the client
        const client = new Client()
        .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
        .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)
 
     // get the cookie
        const session = getCookie(c, AUTH_COOKIE);

        // chek is session is there
        if(!session){
            return c.json({ error: "Unauthorized"}, 401)
        }
       // if it is , then set the session
        client.setSession(session);

        // set account , database and storage
        const account = new Account(client);
        const databases = new Databases(client);
        const storage = new Storage(client);

        // get the user from the account
        const user = await account.get();

        c.set("account", account);
        c.set("databases", databases);
        c.set("storage", storage);
        c.set("user", user);

        // after the middleware run the next function
        await next();
    }
)