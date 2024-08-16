import { Client, Account, ID , Query} from "appwrite";
import conf from "../conf/conf";


export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
            
    }

    async createAccount({email, password , name}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            return userAccount;
            // console.log(userAccount);
            
            // if (userAccount) {
            //     // call another method
            //     return this.login({email, password});
            // } else {
            //    return  userAccount;
            // }
        } catch (error) {
            throw error;
        }
    }

    async login({email, password}) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
           var z =  await this.account.get('current');
        //    console.log(z);
           return z;
           
        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        }

        return null;
    }

    async logout() {

        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite serive :: logout :: error", error);
        }
    }

    async getallUsers(){
        const result = await this.account.listIdentities(
            Query.select(["name"])
        );
        console.log(result);
        
    }
}

const authService = new AuthService();

export default authService