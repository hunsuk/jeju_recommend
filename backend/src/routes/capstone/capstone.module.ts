import { Module } from '@nestjs/common';
import { CapstoneController } from './capstone.controller';
import { CapstoneService } from './capstone.service';
import { HttpModule } from '@nestjs/axios';

@Module({
    imports :[HttpModule],
    controllers: [CapstoneController],
    providers: [CapstoneService],
    exports: [CapstoneService],
})
export class CapstoneModule {}
