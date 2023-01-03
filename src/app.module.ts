import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PokemonController } from './pokemon/pokemon.controller';
import { PokedexService } from './pokedex/pokedex.service';

@Module({
  imports: [],
  controllers: [AppController, PokemonController],
  providers: [AppService, PokedexService],
})
export class AppModule {}
