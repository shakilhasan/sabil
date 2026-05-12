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
import { StudentGatewayService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@ApiTags('Students')
@ApiBearerAuth()
@ApiHeader({ name: 'X-Tenant-ID', required: true, description: 'Tenant slug identifying the school' })
@Controller('students')
export class StudentGatewayController {
  constructor(private readonly studentService: StudentGatewayService) {}

  @Post()
  @Roles(Role.SCHOOL_ADMIN)
  @ApiOperation({ summary: 'Create a new student' })
  create(
    @Body() dto: CreateStudentDto,
    @CurrentUser() user: IAuthUser,
    @Headers('x-tenant-id') tenantSlug: string,
  ) {
    return this.studentService.create(dto, tenantSlug || user.tenantSlug);
  }

  @Get()
  @Roles(Role.SCHOOL_ADMIN, Role.TEACHER)
  @ApiOperation({ summary: 'List all students with pagination' })
  findAll(
    @Query() query: PaginationDto,
    @CurrentUser() user: IAuthUser,
    @Headers('x-tenant-id') tenantSlug: string,
  ) {
    return this.studentService.findAll(query, tenantSlug || user.tenantSlug);
  }

  @Get(':id')
  @Roles(Role.SCHOOL_ADMIN, Role.TEACHER, Role.STUDENT)
  @ApiOperation({ summary: 'Get a student by ID' })
  findOne(
    @Param('id') id: string,
    @CurrentUser() user: IAuthUser,
    @Headers('x-tenant-id') tenantSlug: string,
  ) {
    return this.studentService.findOne(id, tenantSlug || user.tenantSlug);
  }

  @Put(':id')
  @Roles(Role.SCHOOL_ADMIN)
  @ApiOperation({ summary: 'Update a student' })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateStudentDto,
    @CurrentUser() user: IAuthUser,
    @Headers('x-tenant-id') tenantSlug: string,
  ) {
    return this.studentService.update(id, dto, tenantSlug || user.tenantSlug);
  }

  @Delete(':id')
  @Roles(Role.SCHOOL_ADMIN)
  @ApiOperation({ summary: 'Delete a student' })
  remove(
    @Param('id') id: string,
    @CurrentUser() user: IAuthUser,
    @Headers('x-tenant-id') tenantSlug: string,
  ) {
    return this.studentService.remove(id, tenantSlug || user.tenantSlug);
  }
}
