import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LoansService } from './loans.service';
import { CreateLoanRequestDto } from './dto/create-loan.dto';
import { UpdateLoanDto } from './dto/update-loan.dto';
import { UpdateLoanStatusDto } from './dto/update-loan-status.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { HttpCode } from '@nestjs/common';
import { CheckEligibility } from './dto/check-eligibility.dto';

@ApiBearerAuth()
@ApiTags('Loans')
@Controller('loans')
export class LoansController {
  constructor(private readonly loansService: LoansService) {}

  @Post()
  create(@Body() createLoanDto: CreateLoanRequestDto) {
    return this.loansService.create(createLoanDto);
  }

  @Post('/status/:id')
  updateLoanStatus(
    @Param('id') id: string,
    @Body() loanStatusRequest: UpdateLoanStatusDto,
  ) {
    return this.loansService.updateLoanStatus(+id, loanStatusRequest);
  }

  @Post('/check-eligibility')
  checkEligibility(@Body() checkEligibility: CheckEligibility) {
    return this.loansService.checkEligibility(checkEligibility);
  }

  @Get()
  findAll() {
    return this.loansService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.loansService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLoanDto: UpdateLoanDto) {
    return this.loansService.update(+id, updateLoanDto);
  }

  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.loansService.remove(+id);
  }
}
