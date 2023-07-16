import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { NaturalLangProcessController } from './natural-lang-process.controller';
import { NlpAdapterService } from './nlp-adapter.service';

@Module({
  imports: [HttpModule],
  controllers: [NaturalLangProcessController],
  providers: [NlpAdapterService]
})
export class NlpModule {}
