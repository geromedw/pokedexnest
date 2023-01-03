import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { PokedexService } from 'src/pokedex/pokedex.service';
import Pokemon from 'types';

@Controller('pokemon')
export class PokemonController {

    constructor(private pokedex : PokedexService){

    }

    @Get()
    public getallpokemons(){
        return this.pokedex.getpokemons()
    }

    @Get(':id')
    getpokemonnbyid(@Param('id') id:string){
        return this.pokedex.getpokemonbyid(id)
    }

    @Post()
    create(@Body() pokemon:Pokemon){
        return this.pokedex.addpokemon(pokemon)
    }

    @Put(':id')
    update(@Body() pokemon: Pokemon, @Param('id') id:string){
        return this.pokedex.updatepokemon(id,pokemon)
    }

    @Delete(':id')
    deletepokemon(@Param('id') id : string){
        return this.pokedex.deletepokemon(id)
    }
}
