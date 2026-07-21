
import { Module } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { OurTeam } from '../setting/home/our-team/entities/our-team.entity';
import { Department } from '../setting/department/entities/department.entity';
import { Deduction } from '../payroll/entities/deduction.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        url: config.get<string>('DATABASE_URL'),
        entities: [OurTeam, Department, Deduction],
        synchronize: false,
        ssl: {
          rejectUnauthorized: false, // needed for Railway generally
        },
      }),
    }),
    TypeOrmModule.forFeature([OurTeam]),
  ],
})
class ScriptModule {}

async function updateDemoUsers() {
  const app = await NestFactory.createApplicationContext(ScriptModule);
  const dataSource = app.get(DataSource);
  const repo = dataSource.getRepository(OurTeam);

  console.log('Updating Demo Users...');

  // User 1: Ashikur Rahman Ovi
  const user1 = await repo.findOne({ where: { id: 5 } });
  if (user1) {
    user1.firstName = 'Ashikur Rahman';
    user1.lastName = 'Ovi';
    // Optional: update email/username if needed later
    await repo.save(user1);
    console.log(`Updated User ID 5 to Ashikur Rahman Ovi`);
  } else {
    console.warn('User ID 5 not found');
  }

  // User 2: Aftab Farhan Arko
  const user2 = await repo.findOne({ where: { id: 6 } });
  if (user2) {
    user2.firstName = 'Aftab Farhan';
    user2.lastName = 'Arko';
    await repo.save(user2);
    console.log(`Updated User ID 6 to Aftab Farhan Arko`);
  } else {
    console.warn('User ID 6 not found');
  }

  await app.close();
}

updateDemoUsers();
