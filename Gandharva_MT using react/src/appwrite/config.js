import conf from '../conf/conf.js';
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket;
    
    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createdoc(  { UserId, name, email,  ImgId }){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                UserId,
                {
                    name,
                    email,
                    ImgId,
                }
            )
        } catch (error) {
            console.log("Appwrite serive :: createdoc :: error", error);
        }
    }

    async create_appointments(   {UserId} ){
        try {
            const a = await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId_appointments,
                ID.unique(),
                {UserId }
            )
            // console.log(a);
            return a;
            
        } catch (error) {
            console.log("Appwrite serive :: createdoc :: error", error);
        }
    }

    async updateAppointment( UserId , {Schedule_appointments}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId_appointments,
                "66be0a66002fff516d51",
                {
                    Schedule_appointments
                }
            )
        } catch (error) {
            console.log("Appwrite serive :: updatePost :: error", error);
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deletePost :: error", error);
            return false
        }
    }

    async getdoc(name){
        try {
            const d =  await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                name            
            )
            console.log(d);           
            return d;
        } catch (error) {
            console.log("Appwrite serive :: getPost :: error", error);
            return false
        }
    }

    async get_appointments(){
        try {
            const d =  await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId_appointments,
                "66be0a66002fff516d51"          
            )
            console.log(d);           
            return d;
        } catch (error) {
            console.log("Appwrite serive :: get_appointments :: error", error);
            return false
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
                

            )
        } catch (error) {
            console.log("Appwrite serive :: getPosts :: error", error);
            return false
        }
    }

    // file upload service

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite serive :: uploadFile :: error", error);
            return false
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deleteFile :: error", error);
            return false
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }

    async getalldocs(){
        try {
        const res =   await this.databases.listDocuments(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
                [
                    Query.select(["name", "email"])
                ]
            );

            console.log(res);
           const arr = (res.documents);
           arr.map((it)=>{
               console.log(it.name);             
           })

           return res;
            
        } catch (error) {
            console.log(error);
            
        }
    }
}


const service = new Service()
export default service