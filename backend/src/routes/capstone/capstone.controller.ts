import { Controller, Get, Post,Body } from '@nestjs/common';
import { HttpService } from "@nestjs/axios";
import { CapstoneService } from './capstone.service';

@Controller('/capstone')
export class CapstoneController {
    constructor(private capstoneService : CapstoneService){

    }
    @Get('/test')
    async checkWorkAndPostion(){
        const result = await this.capstoneService.querySearch();
        return result;
    }

    @Post('/getResult')
    async sendResult(@Body() body: string){
        console.log(body);
        const destination = await this.capstoneService.recommendDestination;
        const foodStore   = await this.capstoneService.recommendDestination;
        const destination = await this.capstoneService.recommendDestination;  
    }
}
