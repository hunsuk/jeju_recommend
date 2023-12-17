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
      }`;
      try {
        const tags = [];
        const result = await this.graphKBConnectionService.executeQuery(queryString);
        return result.results.bindings.map(data=> data['태그'].value.split('#')[1].split('Tag_')[1]);
      } catch (e){
        console.log(e);
      }

    }

    //질문지 태그 추출
    async extractionTag(index){
      const queryString = `PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
      PREFIX : <http://www.semanticweb.org/untitled/ontologies/2023/10/untitled-ontology-41#>
      PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
      SELECT ?태그 ?타입
      WHERE { 
          ?질문지 rdf:type :Question .
          ?질문지 :has_Index "${index}"^^xsd:decimal .
         ?질문지 :has_Attribute ?태그.
          ?질문지 :has_Question_type ?타입.
      }`;

      try {
        const result = await this.graphKBConnectionService.executeQuery(queryString);
        const data = result.results.bindings;
        return data;
      } catch (e){
        console.log("error");
      }

    }

    //관광지 추천
    async recommendDestination(addTags, deleteTags){
      let queryString = `PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
      PREFIX : <http://www.semanticweb.org/untitled/ontologies/2023/10/untitled-ontology-41#>
      SELECT DISTINCT ?관광지 ?소개 ?이미지 ?주소 ?Lat ?Lon
      WHERE { 
          ?관광지 rdf:type :Destination .`;
      for (let i = 0; i < addTags.length; i++){
        queryString += '{';
        queryString += `?관광지 :has_Tag_type :${addTags[i]} .`;
        if (i !== addTags.length - 1){
          queryString +='} UNION';
        } else{
          queryString += '}';
        }
      }

      for (let i = 0; i < deleteTags.length; i++){
        queryString +='FILTER NOT EXISTS {';
        queryString +=`?관광지 :has_Tag_type :${deleteTags[i]}`;
        queryString +='}';
      }

      queryString += `          
          ?관광지 :has_Introduction ?소개 .
          ?관광지 :has_Image ?이미지 .
          ?관광지 :has_LoadAddress ?주소 .
    	    ?관광지 :has_Lat ?Lat .
    	    ?관광지 :has_Lon ?Lon 
        }`;
      try {
        const destination = [];
        console.log(queryString);
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
          temp['lat'] = data[i]["Lat"].value;
          temp['lon'] = data[i]['Lon'].value;
          destination.push(temp);
        }
        return destination;
      } catch (e){
        console.log(e);
      }
    }

    //음식점 추천
    async recommendFoodStore(addTags, deleteTags){
      let queryString = `PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
      PREFIX : <http://www.semanticweb.org/untitled/ontologies/2023/10/untitled-ontology-41#>
      SELECT DISTINCT ?음식점 ?소개 ?이미지 ?주소 ?Lat ?Lon
      WHERE { 
          ?음식점 rdf:type :FoodStore .`;
      for (let i = 0; i < addTags.length; i++){
        queryString += '{';
        queryString += `?음식점 :has_Tag_type :${addTags[i]} .`;
        if (i !== addTags.length - 1){
          queryString +='} UNION';
        } else{
          queryString += '}';
        }
      }

      for (let i = 0; i < deleteTags.length; i++){
        queryString +='FILTER NOT EXISTS {';
        queryString +=`?음식점 :has_Tag_type :${deleteTags[i]}`;
        queryString +='}';
      }

      queryString += `          
          ?음식점 :has_Introduction ?소개 .
          ?음식점 :has_Image ?이미지 .
          ?음식점 :has_LoadAddress ?주소 .
    	    ?음식점 :has_Lat ?Lat .
    	    ?음식점 :has_Lon ?Lon 
        }`;
      try {
        const foodStore = [];
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
          temp['lat'] = data[i]["Lat"].value;
          temp['lon'] = data[i]['Lon'].value;
          foodStore.push(temp);
        }
        return foodStore;
      } catch (e){
        console.log(e);
      }
    }

    //숙소 추천
    async recommendLodging(addTags, deleteTags){
      let queryString = `PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
      PREFIX : <http://www.semanticweb.org/untitled/ontologies/2023/10/untitled-ontology-41#>
      SELECT DISTINCT ?숙소 ?소개 ?이미지 ?주소 ?Lat ?Lon
      WHERE { 
          ?숙소 rdf:type :Lodging .`;
      for (let i = 0; i < addTags.length; i++){
        queryString += '{';
        queryString += `?숙소 :has_Tag_type :${addTags[i]} .`;
        if (i !== addTags.length - 1){
          queryString +='} UNION';
        } else{
          queryString += '}';
        }
      }

      for (let i = 0; i < deleteTags.length; i++){
        queryString +='FILTER NOT EXISTS {';
        queryString +=`?숙소 :has_Tag_type :${deleteTags[i]}`;
        queryString +='}';
      }

      queryString += `          
          ?숙소 :has_Introduction ?소개 .
          ?숙소 :has_Image ?이미지 .
          ?숙소 :has_LoadAddress ?주소 .
    	    ?숙소 :has_Lat ?Lat .
    	    ?숙소 :has_Lon ?Lon 
        }`;
      try {
        const lodging = [];
        const result = await this.graphKBConnectionService.executeQuery(queryString);
        const data = result.results.bindings;
        for(let i = 0; i < data.length; i++){
          const temp ={};
          temp['id'] = i + 1;
          temp['title'] = data[i]["숙소"].value.split("#")[1];
          temp['URL'] = data[i]["이미지"].value;
          temp['intrudcution'] = data[i]["소개"].value;
          temp['address'] = data[i]["주소"].value;
          temp['tag'] = await this.getTag(temp['title']);
          temp['lat'] = data[i]["Lat"].value;
          temp['lon'] = data[i]['Lon'].value;
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
            return result;
        } catch (e){
            console.log(e);
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


