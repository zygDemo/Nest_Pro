import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { TestModule } from './test/test.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    PostsModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '124.222.102.176',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'nestdb',
      entities: [],
      synchronize: true,
      autoLoadEntities:true,
    }),
    TestModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
