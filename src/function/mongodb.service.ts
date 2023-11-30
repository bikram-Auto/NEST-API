// mongodb.service.ts
import { Injectable } from '@nestjs/common';
import { MongoClient, Db } from 'mongodb';

@Injectable()
export class MongoDBService {
  private db: Db;

  async connect(): Promise<void> {
    const uri = 'mongodb://localhost:27017/testData';
    
    const client = new MongoClient(uri);

    try {
      await client.connect();
      this.db = client.db();
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
    }
  }

  getDatabase(): Db {
    return this.db;
  }
}
