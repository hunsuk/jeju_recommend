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
        const question = body["answers"];
        const addTags = [];
        const deleteTags = [];
        for (let i = 0; i < question.length; i++){
            const questionTags = await this.capstoneService.extractionTag(i);
            const type = questionTags[0]["타입"].value.split("#")[1];
            
            if (type === "긍정"){
                for (let j = 0; j < questionTags.length; j++){
                    addTags.push(questionTags[j]["태그"].value.split("#")[1]);
                }    
            } else{
                for (let j = 0; j < questionTags.length; j++){
                    deleteTags.push(questionTags[j]["태그"].value.split("#")[1]);
                }
            }
        }
        const destination = await this.capstoneService.recommendDestination();
        const foodStore   = await this.capstoneService.recommendFoodStore();
        const lodging = await this.capstoneService.recommendLodging();

        return {"Destinaion":destination, "FoodStore":foodStore, "Lodging":lodging };

    }
}
