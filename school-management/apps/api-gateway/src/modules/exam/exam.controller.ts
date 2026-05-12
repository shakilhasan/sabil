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
import { ExamGatewayService } from './exam.service';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';

@ApiTags('Exams')
@ApiBearerAuth()
@ApiHeader({ name: 'X-Tenant-ID', required: true, description: 'Tenant slug identifying the school' })
@Controller('exams')
export class ExamGatewayController {
  constructor(private readonly examService: ExamGatewayService) {}

  @Post()
  @Roles(Role.SCHOOL_ADMIN, Role.TEACHER)
  @ApiOperation({ summary: 'Create a new exam' })
  create(
    @Body() dto: CreateExamDto,
    @CurrentUser() user: IAuthUser,
    @Headers('x-tenant-id') tenantSlug: string,
  ) {
    return this.examService.create(dto, tenantSlug || user.tenantSlug);
  }

  @Get()
  @Roles(Role.SCHOOL_ADMIN, Role.TEACHER)
  @ApiOperation({ summary: 'List all exams with pagination' })
  findAll(
    @Query() query: PaginationDto,
    @CurrentUser() user: IAuthUser,
    @Headers('x-tenant-id') tenantSlug: string,
  ) {
    return this.examService.findAll(query, tenantSlug || user.tenantSlug);
  }

  @Get(':id')
  @Roles(Role.SCHOOL_ADMIN, Role.TEACHER, Role.STUDENT)
  @ApiOperation({ summary: 'Get an exam by ID' })
  findOne(
    @Param('id') id: string,
    @CurrentUser() user: IAuthUser,
    @Headers('x-tenant-id') tenantSlug: string,
  ) {
    return this.examService.findOne(id, tenantSlug || user.tenantSlug);
  }

  @Put(':id')
  @Roles(Role.SCHOOL_ADMIN, Role.TEACHER)
  @ApiOperation({ summary: 'Update an exam' })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateExamDto,
    @CurrentUser() user: IAuthUser,
    @Headers('x-tenant-id') tenantSlug: string,
  ) {
    return this.examService.update(id, dto, tenantSlug || user.tenantSlug);
  }

  @Delete(':id')
  @Roles(Role.SCHOOL_ADMIN)
  @ApiOperation({ summary: 'Delete an exam' })
  remove(
    @Param('id') id: string,
    @CurrentUser() user: IAuthUser,
    @Headers('x-tenant-id') tenantSlug: string,
  ) {
    return this.examService.remove(id, tenantSlug || user.tenantSlug);
  }
}
