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
import { SemesterGatewayService } from './semester.service';
import { CreateSemesterDto } from './dto/create-semester.dto';
import { UpdateSemesterDto } from './dto/update-semester.dto';

@ApiTags('Semesters')
@ApiBearerAuth()
@ApiHeader({ name: 'X-Tenant-ID', required: true, description: 'Tenant slug identifying the school' })
@Controller('semesters')
export class SemesterGatewayController {
  constructor(private readonly semesterService: SemesterGatewayService) {}

  @Post()
  @Roles(Role.SCHOOL_ADMIN)
  @ApiOperation({ summary: 'Create a new semester' })
  create(
    @Body() dto: CreateSemesterDto,
    @CurrentUser() user: IAuthUser,
    @Headers('x-tenant-id') tenantSlug: string,
  ) {
    return this.semesterService.create(dto, tenantSlug || user.tenantSlug);
  }

  @Get()
  @Roles(Role.SCHOOL_ADMIN, Role.TEACHER)
  @ApiOperation({ summary: 'List all semesters with pagination' })
  findAll(
    @Query() query: PaginationDto,
    @CurrentUser() user: IAuthUser,
    @Headers('x-tenant-id') tenantSlug: string,
  ) {
    return this.semesterService.findAll(query, tenantSlug || user.tenantSlug);
  }

  @Get(':id')
  @Roles(Role.SCHOOL_ADMIN, Role.TEACHER, Role.STUDENT)
  @ApiOperation({ summary: 'Get a semester by ID' })
  findOne(
    @Param('id') id: string,
    @CurrentUser() user: IAuthUser,
    @Headers('x-tenant-id') tenantSlug: string,
  ) {
    return this.semesterService.findOne(id, tenantSlug || user.tenantSlug);
  }

  @Put(':id')
  @Roles(Role.SCHOOL_ADMIN)
  @ApiOperation({ summary: 'Update a semester' })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateSemesterDto,
    @CurrentUser() user: IAuthUser,
    @Headers('x-tenant-id') tenantSlug: string,
  ) {
    return this.semesterService.update(id, dto, tenantSlug || user.tenantSlug);
  }

  @Delete(':id')
  @Roles(Role.SCHOOL_ADMIN)
  @ApiOperation({ summary: 'Delete a semester' })
  remove(
    @Param('id') id: string,
    @CurrentUser() user: IAuthUser,
    @Headers('x-tenant-id') tenantSlug: string,
  ) {
    return this.semesterService.remove(id, tenantSlug || user.tenantSlug);
  }
}
