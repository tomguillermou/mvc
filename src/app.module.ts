import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';

import { AuthModule } from './auth';
import { UserModule } from './users';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
    imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService): MongooseModuleOptions => ({
                uri: configService.get<string>('MONGODB_URL'),
                dbName: configService.get<string>('MONGODB_DATABASE'),
                auth: {
                    username: configService.get<string>('MONGODB_USER'),
                    password: configService.get<string>('MONGODB_PASSWORD'),
                },
            }),
        }),
        AuthModule,
        UserModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
