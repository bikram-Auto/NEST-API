// mongodb.service.ts
import { Injectable } from '@nestjs/common';
import { MongoClient, Db } from 'mongodb';
import { Collection } from 'mongoose';

@Injectable()
export class MongoDBService {
  private db: Db;
    private client: MongoClient;
    constructor() {
        this.client = new MongoClient("mongodb://localhost:27017");
        this.connect().then(() => {
            this.db = this.client.db("users");
        });
    }

  async connect(): Promise<void> {
    try {
        await this.client.connect();
        this.db = this.client.db("users");
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
}

  getDatabase(): Db {
    return this.db;
  }
  async create (collectionname:string, value : any){
    try{
      console.log(this.db)
      const collection = this.db.collection(collectionname);
      const response = await collection.insertOne(value);
      return response;
    }
    catch(error){
      return error
    }
  }
}
