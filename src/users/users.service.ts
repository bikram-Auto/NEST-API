// users.service.ts
import { Injectable } from '@nestjs/common';
import { MongoDBService } from 'src/function/mongodb.service';
import { CreateUserDto } from './users.dto';


@Injectable()
export class UsersService {
  constructor(private readonly mongoDBService: MongoDBService) {}

  async create(createUserDto: CreateUserDto): Promise<string> {
    const collection = this.mongoDBService.getDatabase().collection('users');

    
    await collection.insertOne(createUserDto);

    return 'User created successfully';
  }

  async findAll(): Promise<any[]> {
    const collection = this.mongoDBService.getDatabase().collection('users');
    return collection.find().toArray();
  }
}
