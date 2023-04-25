import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  // 依赖注入
  constructor(
    @InjectRepository(User) private readonly user: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    // return 'This action adds a new user';
    const data = new User();
    data.name = createUserDto.name;
    data.password = createUserDto.password;
    data.role = createUserDto.role;
    return this.user.save(data);
  }

  // 分页查询列表
  async findAll(query = {} as any) {
    let { pageSize, pageNum, sort, ...params } = query;
    // orderBy = query.orderBy || 'create_time';
    sort = query.sort || 'DESC';
    pageSize = Number(query.pageSize || 10);
    pageNum = Number(query.pageNum || 1);
    console.log('query', query);

    const queryParams = {} as any;
    Object.keys(params).forEach((key) => {
      if (params[key]) {
        queryParams[key] = Like(`%${params[key]}%`); // 所有字段支持模糊查询、%%之间不能有空格
      }
    });
    const qb = await this.user.createQueryBuilder('post');

    qb.where(queryParams);
    // qb.select(['post.title', 'post.content']); // 查询部分字段返回
    // qb.orderBy(`post.${orderBy}`, sort);
    qb.skip(pageSize * (pageNum - 1));
    qb.take(pageSize);

    return {
      list: await qb.getMany(),
      totalNum: await qb.getCount(), // 按条件查询的数量
      total: await this.user.count(), // 总的数量
      pageSize,
      pageNum,
    };
  }

  // async findAll(query: { keyWord: string; page: number; pageSize: number }) {
  //   // return `This action returns all user`;
  //   const data = await this.user.find({
  //     where: {
  //       name: Like(`%${query.keyWord}%`),
  //     },
  //     order: {
  //       id: 'DESC',
  //     },
  //     skip: (query.page - 1) * query.pageSize,
  //     take: query.pageSize,
  //   });
  //   const total = await this.user.count({
  //     where: {
  //       name: Like(`%${query.keyWord}%`),
  //     },
  //   });
  //   return {
  //     data,
  //     total,
  //   };
  // }

  async findOne(id: number) {
    // return `This action returns a #${id} user`;
    return await this.user.findByIds([id]);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    // return `This action updates a #${id} user`;
    return this.user.update(id, updateUserDto);
  }

  remove(id: number) {
    // return `This action removes a #${id} user`;
    return this.user.delete(id);
  }
}
