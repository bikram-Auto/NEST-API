// mongodb.service.ts
import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import { MongoClient, Db } from 'mongodb';

@Injectable()
export class MongoDBService implements OnApplicationShutdown {
  private db: Db;
  private client: MongoClient;
  private mongoURL = 'mongodb+srv://bikramnanda:biki1996@cluster0.ejoawjh.mongodb.net';

  /**
   * Constructs the MongoDBService instance and initializes the MongoDB client.
   * Connects to the MongoDB server and sets up the database.
   */
  constructor() { 
    this.client = new MongoClient(this.mongoURL,{
      tls: true,
      minPoolSize: 2,
      maxPoolSize: 10,
    });
    this.connect();
    this.client.close();
  }

  

  /**
   * Establishes a connection to the MongoDB server and initializes the database.
   * Throws an error if the connection cannot be established.
   */
  async connect(): Promise<void> {
    try {
      await this.client.connect();
      this.db = this.client.db('testData');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      throw error;
    }
  }

  /**
   * Lifecycle hook invoked when the NestJS application is shutting down.
   * Closes the MongoDB client connection gracefully.
   * @param signal - The signal that triggered the application shutdown.
   */
  async onApplicationShutdown(signal?: string): Promise<void> {
    await this.client.close();
  }

  /**
   * Retrieves the MongoDB database instance.
   * @returns The MongoDB database instance.
   */
  getDatabase(): Db {
    return this.db;
  }

  /**
   * Creates a new document in the specified collection.
   * @param collectionName - Name of the collection.
   * @param value - Document to be inserted.
   * @returns A promise that resolves with the result of the insertion operation.
   */
  async create(collectionName: string, value: any) {
    try {
      const collection = this.db.collection(collectionName);
      const response = await collection.insertOne(value);
      return response;
    } catch (error) {
      return error;
    }
  }

  /**
   * Finds documents in the specified collection based on the provided query.
   * @param collectionName - Name of the collection.
   * @param query - Query criteria.
   * @returns A promise that resolves with an array of documents matching the query.
   * @throws If an error occurs during the query execution.
   */
  async findAll(collectionName: string, query: any) {
    try {
      const collection = this.db.collection(collectionName);
      const result = await collection.find(query).toArray();
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
