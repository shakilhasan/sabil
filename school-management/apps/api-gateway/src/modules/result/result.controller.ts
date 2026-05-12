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
import { ResultGatewayService } from './result.service';
import { CreateResultDto } from './dto/create-result.dto';
import { UpdateResultDto } from './dto/update-result.dto';

@ApiTags('Results')
@ApiBearerAuth()
@ApiHeader({ name: 'X-Tenant-ID', required: true, description: 'Tenant slug identifying the school' })
@Controller('results')
export class ResultGatewayController {
  constructor(private readonly resultService: ResultGatewayService) {}

  @Post()
  @Roles(Role.SCHOOL_ADMIN, Role.TEACHER)
  @ApiOperation({ summary: 'Record a student result' })
  create(
    @Body() dto: CreateResultDto,
    @CurrentUser() user: IAuthUser,
    @Headers('x-tenant-id') tenantSlug: string,
  ) {
    return this.resultService.create(dto, tenantSlug || user.tenantSlug);
  }

  @Get()
  @Roles(Role.SCHOOL_ADMIN, Role.TEACHER)
  @ApiOperation({ summary: 'List all results with pagination' })
  findAll(
    @Query() query: PaginationDto,
    @CurrentUser() user: IAuthUser,
    @Headers('x-tenant-id') tenantSlug: string,
  ) {
    return this.resultService.findAll(query, tenantSlug || user.tenantSlug);
  }

  @Get('rankings/:examId')
  @Roles(Role.SCHOOL_ADMIN, Role.TEACHER, Role.STUDENT)
  @ApiOperation({ summary: 'Get student rankings for a specific exam' })
  getRankings(
    @Param('examId') examId: string,
    @CurrentUser() user: IAuthUser,
    @Headers('x-tenant-id') tenantSlug: string,
  ) {
    return this.resultService.getRankings(examId, tenantSlug || user.tenantSlug);
  }

  @Get(':id')
  @Roles(Role.SCHOOL_ADMIN, Role.TEACHER, Role.STUDENT)
  @ApiOperation({ summary: 'Get a result by ID' })
  findOne(
    @Param('id') id: string,
    @CurrentUser() user: IAuthUser,
    @Headers('x-tenant-id') tenantSlug: string,
  ) {
    return this.resultService.findOne(id, tenantSlug || user.tenantSlug);
  }

  @Put(':id')
  @Roles(Role.SCHOOL_ADMIN, Role.TEACHER)
  @ApiOperation({ summary: 'Update a result' })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateResultDto,
    @CurrentUser() user: IAuthUser,
    @Headers('x-tenant-id') tenantSlug: string,
  ) {
    return this.resultService.update(id, dto, tenantSlug || user.tenantSlug);
  }

  @Delete(':id')
  @Roles(Role.SCHOOL_ADMIN)
  @ApiOperation({ summary: 'Delete a result' })
  remove(
    @Param('id') id: string,
    @CurrentUser() user: IAuthUser,
    @Headers('x-tenant-id') tenantSlug: string,
  ) {
    return this.resultService.remove(id, tenantSlug || user.tenantSlug);
  }
}
