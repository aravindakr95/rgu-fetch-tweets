import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { TextToConvertService } from './text-to-convert.service';
import { TextToConvertController } from './text-to-convert.controller';

@Module({
  imports: [HttpModule],
  controllers: [TextToConvertController],
  providers: [TextToConvertService],
  exports: [TextToConvertService]
})
export class TextToConvertModule {}
