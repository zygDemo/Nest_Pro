import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator'

export class CreateUserDto {
  // @ApiProperty({ description: '标题', example: '博客' })
  // title: string;
  // @ApiProperty({ description: '内容', example: 'aaaa' })
  // content: string;
  @ApiProperty({ description: '用户名', example: '朱雨贵' })
  @IsNotEmpty({ message: '用户名不能为空' })
  name: string;
  
  @IsNotEmpty({ message: '密码不能为空' })
  @ApiProperty({ description: '密码', example: '123456' })
  readonly password: string;

  //   @IsNumber()
  @IsNotEmpty({ message: '角色不能为空' })
  @ApiProperty({ description: '角色', example: '管理员' })
  readonly role: string;
  //   readonly cover_url: string;
  //   readonly type: number;
  
  // @IsNotEmpty({ message: '创建时间不能为空' })
  // readonly create_time: string;
}
