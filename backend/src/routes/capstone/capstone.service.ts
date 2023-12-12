import { Injectable } from '@nestjs/common';
import { GraphDbConnectionService } from '../../util/GraphDbConnection.service';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class CapstoneService {

    constructor(
        private graphKBConnectionService: GraphDbConnectionService,
        private httpService: HttpService){
    }

    //질문지 태그 추출
    async extractionTag(){

    }

    //관광지 추천
    async recommendDestination(){
      const queryString = `PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
      PREFIX : <http://www.semanticweb.org/untitled/ontologies/2023/10/untitled-ontology-41#>
      SELECT ?관광지 
      WHERE { 
          ?관광지 rdf:type :Destination .
          ?관광지 :has_Tag_type :Tag_커플 .
          ?관광지 :has_Tag_type :Tag_걷기 .
      }`
      try {
        const result = await this.graphKBConnectionService.executeQuery(queryString);
        return result;
      } catch (e){
        console.log(e)
      }
    }

    //음식점 추천
    async recommendFoodStore(){
      const queryString = `PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
      PREFIX : <http://www.semanticweb.org/untitled/ontologies/2023/10/untitled-ontology-41#>
      
      SELECT ?음식점 
      WHERE { 
          ?음식점 rdf:type :FoodStore .
      
          {
              ?음식점 :has_Tag_type :Tag_갈비찜 
          }
          UNION
          {
              ?음식점 :has_Tag_type :Tag_고등어
          }
      }`
      try {
        const result = await this.graphKBConnectionService.executeQuery(queryString);
        return result
      } catch (e){
        console.log(e)
      }
    }

    //숙소 추천
    async recommendLodging(){
      const queryString = `PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
      PREFIX : <http://www.semanticweb.org/untitled/ontologies/2023/10/untitled-ontology-41#>
      SELECT ?숙소 
      WHERE { 
          ?숙소 rdf:type :Lodging .
          ?숙소 :has_Tag_type :Tag_주차장 .
          ?숙소 :has_Tag_type :Tag_가족 .
          ?숙소 :has_Tag_type :Tag_호텔 .
      }`
      try {
        const result = await this.graphKBConnectionService.executeQuery(queryString);
        return result
      } catch (e){
        console.log(e)
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


