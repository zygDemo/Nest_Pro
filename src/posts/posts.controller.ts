import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';

class CreatePostDto {
  @ApiProperty({ description: '标题', example: '博客' })
  title: string;
  @ApiProperty({ description: '内容', example: 'aaaa' })
  content: string;
}

class UpdataPostDto {
  @ApiProperty({ description: '标题', example: '博客' })
  title: string;
  @ApiProperty({ description: '内容', example: 'aaaa' })
  content: string;
}

@Controller('posts')
@ApiTags('帖子') //标签
export class PostsController {
  @Get()
  @ApiOperation({ summary: '显示博客列表' }) //列表接口描述
  index() {
    return [
      { id: 1, title: '博客1' },
      { id: 2, title: '博客2' },
      { id: 3, title: '博客3' },
      { id: 4, title: '博客4' },
    ];
  }

  @Post()
  @ApiOperation({ summary: '创建' })
  create(@Body() body: CreatePostDto) {
    //类CreatePostDto约束body

    return body;
  }

  @Get(':id')
  @ApiOperation({ summary: '详情' })
  detail(@Param('id') id: string) {
    return {
      id: id,
      title: '标题',
    };
  }

  @Put(':id')
  @ApiOperation({ summary: '修改' })
  updata(@Param('id') id: string, @Body() body: UpdataPostDto) {
    return {
      succes: true,
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除' })
  remove(@Param('id') id: string) {
    return {
      succes: true,
    };
  }
  //   @Put(':id')
  //   @ApiOperation({ summary: '修改' })
  //   edit() {
  //     return {
  //       id: 1,
  //       title: '标题',
  //     };
  //   }
}
