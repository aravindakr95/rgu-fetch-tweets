import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { TextToExcelService } from './text-to-excel.service';
import { TextToExcelController } from './text-to-excel.controller';

@Module({
  imports: [HttpModule],
  controllers: [TextToExcelController],
  providers: [TextToExcelService]
})
export class TextToExcelModule {}
