import { Injectable, HttpException,HttpStatus } from '@nestjs/common';
import pokedex from 'pokemon.json'
import { Pokemon } from 'types'

@Injectable()
export class PokedexService {
    private pokemon : Pokemon[] = pokedex;

    getpokemons() : Pokemon[]{
        return this.pokemon
    }

    private assertExists(id: string) {
        let pokemon = this.pokemon.find(p => p.id === id);
        if (!pokemon) {
            throw new HttpException("Pokemon not found", HttpStatus.NOT_FOUND);
        }
    }

    getpokemonbyid(id:string): Pokemon{
        this.assertExists(id)
        return this.pokemon.find(p => p.id === id)
    }

    addpokemon(pokemon : Pokemon){
        pokemon.id = (Math.max(...this.pokemon.map(p => parseInt(p.id)))+1).toString();
        this.pokemon.push(pokemon);
        return pokemon;
    }

    updatepokemon(id:string, pokemon:Pokemon){
        this.assertExists(id)
        let index = this.pokemon.findIndex(p => p.id === id)
        pokemon.id = id
        this.pokemon[index] = pokemon
        return pokemon
    }

    deletepokemon(id:string){
        this.assertExists(id)
        let index = this.pokemon.findIndex(p => p.id === id)
        this.pokemon.splice(index,1)
    }
}
