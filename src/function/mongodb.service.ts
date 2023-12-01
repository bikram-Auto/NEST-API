import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import { MongoClient, Db } from 'mongodb';

@Injectable()
export class MongoDBService implements OnApplicationShutdown {
  private db: Db;
  private client: MongoClient;

  constructor() {
    // Initialize MongoDB client and connect to the database
    this.client = new MongoClient("mongodb://localhost:27017");
    this.connect();
  }

  /**
   * Connect to the MongoDB database.
   * Initializes the `db` property with the connected database.
   */
  async connect(): Promise<void> {
    try {
      await this.client.connect();
      this.db = this.client.db("testData");
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      throw error;
    }
  }

  /**
   * Lifecycle hook to close the MongoDB connection when the NestJS application shuts down.
   * @param signal - Signal that triggered the application shutdown.
   */
  async onApplicationShutdown(signal?: string): Promise<void> {
    await this.client.close();
  }

  /**
   * Get the MongoDB database instance.
   * @returns The MongoDB database instance.
   */
  getDatabase(): Db {
    return this.db;
  }

  /**
   * Create a new document in the specified collection.
   * @param collectionname - Name of the collection.
   * @param value - Document to be inserted.
   * @returns A promise that resolves with the result of the insertion operation.
   */
  async create(collectionname: string, value: any) {
    try {
      const collection = this.db.collection(collectionname);
      const response = await collection.insertOne(value);
      return response;
    } catch (error) {
      return error;
    }
  }

  /**
   * Find documents in the specified collection based on the provided query.
   * @param collectionName - Name of the collection.
   * @param query - Query criteria.
   * @returns A promise that resolves with an array of documents matching the query.
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
