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
                    UserId,
                    ImgId,
                }
            )
        } catch (error) {
            console.log("Appwrite serive :: createdoc :: error", error);
        }
    }

    async getdoc(UserId){
        try {
            const d =  await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                UserId           
            )
            // console.log(d);           
            return d;
        } catch (error) {
            console.log("Appwrite serive :: getdoc :: error", error);
            return false
        }
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

    async get_patient_doc(name){
        try {
            const a = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                [Query.equal("name" , name.name )]
            )
            console.log(a);
            console.log(a.documents[0].$id);
            
            return a.documents[0].$id;            

        } catch (error) {
            console.log("Appwrite serive :: get_patient_doc :: error", error);
            
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


    // Appointment services ----------------------------------------------------------------------------------
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


    async updateAppointment( {Schedule_appointments , AppointmentID}){
        try {
            console.log("I am inside update appointment");
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId_appointments,
                AppointmentID ,
                {
                    Schedule_appointments
                }
            )
            
            
        } catch (error) {
            console.log("Appwrite serive :: updatePost :: error", error);
        }
    }


    async get_appointments(AppointmentID){
        try {
            const d =  await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId_appointments,
                AppointmentID         
            )
            console.log(d);           
            return d;
        } catch (error) {
            console.log("Appwrite serive :: get_appointments :: error", error);
            return false
        }
    }

    async get_appoint_data(UserId){
        //   console.log(UserId);
          
        try {
            const a = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId_appointments,
                [Query.equal("UserId" , UserId.UserId )]
            )
            console.log(a);
            console.log(a.documents[0].$id);
            
            return a.documents[0].$id;            

        } catch (error) {
            console.log(error);
            
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

    // file upload service --------------------------------------------------------------------------------

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

    getFilePreview(ImgId){  
        // console.log(ImgId);
        
        // {console.log(`getPreview fileId : ${fileId} `) }
        
        const prewiew =  this.bucket.getFilePreview(conf.appwriteBucketId, ImgId )
        const result = prewiew.href
        // {console.log(`preview value is : ${prewiew}`) }
        return result;
        
    }


    // Feedback services  ----------------------------------------------------------------------------------
    async create_feedback(   {UserId , Feedback } ){
        try {
            const a = await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId_feedback,
                ID.unique(),
                {
                UserId , 
                Feedback
                }
            )
            return a;
            
        } catch (error) {
            console.log("Appwrite serive :: createdoc :: error", error);
        }
    }

    async get_feedback_data(UserId){
      console.log(UserId);
      
        try {
            const a = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId_feedback,
                [Query.equal("UserId" , UserId.UserId )]
            )
            console.log(a); 
            console.log(a.documents[1].Feedback) 
            return String(a.documents[1].Feedback);

        } catch (error) {
            console.log(error);
            
        }
    }

    
    // Music services  ----------------------------------------------------------------------------------
    async create_music( {UserId , Link } ){
        try {
            const a = await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId_music,
                ID.unique(),
                {
                UserId , 
                }
            )
            return a;
            
        } catch (error) {
            console.log("Appwrite serive :: createdoc :: error", error);
        }
    }


}


const service = new Service()
export default service