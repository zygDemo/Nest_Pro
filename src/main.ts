import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { HttpExceptionFilter } from './core/filter/http-exception/http-exception.filter';
import { TransformInterceptor } from './core/interceptor/transform/transform.interceptor';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api'); // 设置全局路由前缀
  app.enableCors();//解决跨域
  app.useGlobalFilters(new HttpExceptionFilter()); // 注册全局错误的过滤器
  app.useGlobalInterceptors(new TransformInterceptor()); //注册全局的拦截器
  app.useGlobalPipes(new ValidationPipe()); //注册全局的管道

  const options = new DocumentBuilder()
    .setTitle('nestJs博客API') //标题
    .setDescription('第一个NestJs项目') //描述
    .setVersion('1.0')
    .addTag('cats') //  添加标签
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document); //挂载路径
  
  await app.listen(5000);
}
bootstrap();
