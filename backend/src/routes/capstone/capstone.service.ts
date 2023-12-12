import { Injectable } from '@nestjs/common';
import { GraphDbConnectionService } from '../../util/GraphDbConnection.service';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class CapstoneService {

    constructor(
        private graphKBConnectionService: GraphDbConnectionService,
        private httpService: HttpService){
    }
    async getTag(title){
      const queryString = `PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
      PREFIX : <http://www.semanticweb.org/untitled/ontologies/2023/10/untitled-ontology-41#>
      SELECT ?태그
      WHERE { 
          :${title} :has_Tag_type ?태그 
      }
      `;
      try {
        const tags = [];
        const result = await this.graphKBConnectionService.executeQuery(queryString);
        return result.results.bindings.map(data=> data['태그'].value.split('#')[1].split('Tag_')[1]);
      } catch (e){
        console.log(e);
      }

    }


    //질문지 태그 추출
    async extractionTag(){

    }

    //관광지 추천
    async recommendDestination(){
      const queryString = `PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
      PREFIX : <http://www.semanticweb.org/untitled/ontologies/2023/10/untitled-ontology-41#>
      SELECT ?관광지 ?소개 ?이미지 ?주소
      WHERE { 
          ?관광지 rdf:type :Destination .
          ?관광지 :has_Tag_type :Tag_커플 .
          ?관광지 :has_Tag_type :Tag_걷기 .
          
          ?관광지 :has_Introduction ?소개 .
          ?관광지 :has_Image ?이미지 .
          ?관광지 :has_LoadAddress ?주소
      }`
      try {
        const destination = []
        const result = await this.graphKBConnectionService.executeQuery(queryString);
        const data = result.results.bindings;
        for(let i = 0; i < data.length; i++){
          const temp ={};
          temp['id'] = i + 1;
          temp['title'] = data[i]["관광지"].value.split("#")[1];
          temp['URL'] = data[i]["이미지"].value;
          temp['intrudcution'] = data[i]["소개"].value;
          temp['address'] = data[i]["주소"].value;
          temp['tag'] = await this.getTag(temp['title']);
          destination.push(temp);
        }
        return destination;
      } catch (e){
        console.log(e);
      }
    }

    //음식점 추천
    async recommendFoodStore(){
      const queryString = `PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
      PREFIX : <http://www.semanticweb.org/untitled/ontologies/2023/10/untitled-ontology-41#>
      
      SELECT ?음식점 ?소개 ?이미지 ?주소
      WHERE { 
          ?음식점 rdf:type :FoodStore .
      
          {
              ?음식점 :has_Tag_type :Tag_갈비찜 
          }
          UNION
          {
              ?음식점 :has_Tag_type :Tag_고등어
          }
          ?음식점 :has_Introduction ?소개 .
          ?음식점 :has_Image ?이미지 .
          ?음식점 :has_LoadAddress ?주소
      }`
      try {
        const foodStore = []
        const result = await this.graphKBConnectionService.executeQuery(queryString);
        const data = result.results.bindings
        for(let i = 0; i < data.length; i++){
          const temp ={};
          temp['id'] = i + 1;
          temp['title'] = data[i]["음식점"].value.split("#")[1];
          temp['URL'] = data[i]["이미지"].value;
          temp['intrudcution'] = data[i]["소개"].value;
          temp['address'] = data[i]["주소"].value;
          temp['tag'] = await this.getTag(temp['title']);
          foodStore.push(temp);
        }
        return foodStore
      } catch (e){
        console.log(e)
      }
    }

    //숙소 추천
    async recommendLodging(){
      const queryString = `PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
      PREFIX : <http://www.semanticweb.org/untitled/ontologies/2023/10/untitled-ontology-41#>
      SELECT ?숙소 ?소개 ?이미지 ?주소
      WHERE { 
          ?숙소 rdf:type :Lodging .
          ?숙소 :has_Tag_type :Tag_커플 .
          ?숙소 :has_Tag_type :Tag_호텔 .
          
          ?숙소 :has_Introduction ?소개 .
          ?숙소 :has_Image ?이미지 .
          ?숙소 :has_LoadAddress ?주소
      }`
      try {
        const lodging = [];
        const result = await this.graphKBConnectionService.executeQuery(queryString);
        const data = result.results.bindings
        for(let i = 0; i < data.length; i++){
          const temp ={};
          temp['id'] = i + 1;
          temp['title'] = data[i]["숙소"].value.split("#")[1];
          temp['URL'] = data[i]["이미지"].value;
          temp['intrudcution'] = data[i]["소개"].value;
          temp['address'] = data[i]["주소"].value;
          temp['tag'] = await this.getTag(temp['title']);
          lodging.push(temp);
        }
        return lodging;
      } catch (e){
        console.log(e);
      }
    }

    async querySearch() {
        const queryString = `select * where { 
            ?s ?p ?o .
        } limit 100 
        `;
        
        try {
            const result = await this.graphKBConnectionService.executeQuery(queryString);
            return result
        } catch (e){
            console.log(e)
        }
    }


    async queryUpdate() {
        const queryString = ``;
        try {
          await this.graphKBConnectionService.executeUpdate(queryString);
        } catch (e) {
          console.log(e);
        }
      }
    }


