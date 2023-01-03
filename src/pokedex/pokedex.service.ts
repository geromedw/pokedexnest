import { Injectable, HttpException,HttpStatus, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import pokedex from 'pokemon.json'
import { Pokemon } from 'types'
import { MongoClient } from "mongodb"

const url = 'mongodb://localhost:27017'
const dbname = 'PokemonDB'

@Injectable()
export class PokedexService {
    private client = new MongoClient(url)

    constructor(){
        this.datadb()
    }
    
    OnModuleInit(){
        this.client.connect()
    }
    OnModuleDestroy(){
        this.client.close()
    }


    private async datadb(){
        let pokemon = await this.client.db(dbname).collection("pokemons").find<Pokemon>({}).toArray();
        if(pokemon.length === 0){
            console.log("leeg")
            await this.client.db(dbname).collection("pokemons").insertMany(pokedex);
        }
        else{
            console.log("waardes in db")
        }
    }

    async getpokemons() /*: Pokemon[]*/{
        //return this.pokemon
        let pokemon = await this.client.db(dbname).collection("pokemons").find<Pokemon>({}).toArray()
        return pokemon
    }

    private async assertExists(id: string) {
        //let pokemon = this.pokemon.find(p => p.id === id);
        let pokemon = await this.client.db(dbname).collection("pokemons").findOne<Pokemon>({id: id})
        if (!pokemon) {
            throw new HttpException("Pokemon not found", HttpStatus.NOT_FOUND);
        }
    }

    async getpokemonbyid(id:string) /*: Pokemon*/{
        await this.assertExists(id)
        //return this.pokemon.find(p => p.id === id)
        let pokemon = await this.client.db(dbname).collection("pokemons").findOne<Pokemon>({id: id})
        return pokemon
    }

    async addpokemon(pokemon : Pokemon){
        let allpokemon = await this.getpokemons()
        pokemon.id = (Math.max(...allpokemon.map(p => parseInt(p.id)))+1).toString();
        await this.client.db(dbname).collection("pokemons").insertOne(pokemon)
        return this.getpokemonbyid(pokemon.id);
    }

    async updatepokemon(id:string, pokemon:Pokemon){
        await this.assertExists(id)
        let changepokemon = await this.getpokemonbyid(id)
        await this.client.db(dbname).collection("pokemons").updateOne({id: changepokemon.id},{$set: {
                name : pokemon.name,
                height : pokemon.height,
                weight : pokemon.weight,
                favorite : pokemon.favorite
        }})
        return pokemon
        //let index = this.pokemon.findIndex(p => p.id === id)
        //pokemon.id = id
        //this.pokemon[index] = pokemon
        //return pokemon

    }

    async deletepokemon(id:string){
        this.assertExists(id)
        await this.client.db(dbname).collection("pokemons").deleteOne({id: id})
        //let index = this.pokemon.findIndex(p => p.id === id)
        //this.pokemon.splice(index,1)
    }

    async cleardatabase(){
        await this.client.db(dbname).collection("pokemons").drop()
    }
}
