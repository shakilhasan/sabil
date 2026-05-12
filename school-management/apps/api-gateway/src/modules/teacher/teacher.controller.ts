import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  Headers,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiHeader,
} from '@nestjs/swagger';
import { Roles, Role, PaginationDto, CurrentUser, IAuthUser } from '@app/common';
import { TeacherGatewayService } from './teacher.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';

@ApiTags('Teachers')
@ApiBearerAuth()
@ApiHeader({ name: 'X-Tenant-ID', required: true, description: 'Tenant slug identifying the school' })
@Controller('teachers')
export class TeacherGatewayController {
  constructor(private readonly teacherService: TeacherGatewayService) {}

  @Post()
  @Roles(Role.SCHOOL_ADMIN)
  @ApiOperation({ summary: 'Create a new teacher' })
  create(
    @Body() dto: CreateTeacherDto,
    @CurrentUser() user: IAuthUser,
    @Headers('x-tenant-id') tenantSlug: string,
  ) {
    return this.teacherService.create(dto, tenantSlug || user.tenantSlug);
  }

  @Get()
  @Roles(Role.SCHOOL_ADMIN, Role.TEACHER)
  @ApiOperation({ summary: 'List all teachers with pagination' })
  findAll(
    @Query() query: PaginationDto,
    @CurrentUser() user: IAuthUser,
    @Headers('x-tenant-id') tenantSlug: string,
  ) {
    return this.teacherService.findAll(query, tenantSlug || user.tenantSlug);
  }

  @Get(':id')
  @Roles(Role.SCHOOL_ADMIN, Role.TEACHER, Role.STUDENT)
  @ApiOperation({ summary: 'Get a teacher by ID' })
  findOne(
    @Param('id') id: string,
    @CurrentUser() user: IAuthUser,
    @Headers('x-tenant-id') tenantSlug: string,
  ) {
    return this.teacherService.findOne(id, tenantSlug || user.tenantSlug);
  }

  @Put(':id')
  @Roles(Role.SCHOOL_ADMIN)
  @ApiOperation({ summary: 'Update a teacher' })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateTeacherDto,
    @CurrentUser() user: IAuthUser,
    @Headers('x-tenant-id') tenantSlug: string,
  ) {
    return this.teacherService.update(id, dto, tenantSlug || user.tenantSlug);
  }

  @Delete(':id')
  @Roles(Role.SCHOOL_ADMIN)
  @ApiOperation({ summary: 'Delete a teacher' })
  remove(
    @Param('id') id: string,
    @CurrentUser() user: IAuthUser,
    @Headers('x-tenant-id') tenantSlug: string,
  ) {
    return this.teacherService.remove(id, tenantSlug || user.tenantSlug);
  }
}
