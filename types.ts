export interface Pokemon {
    id: string;
    species_id: string;
    height: string;
    weight: string;
    base_experience: string;
    order: string;
    is_default: string;
    name: string;
    sprites: Sprites;
    favorite?: boolean;
  }
  
  export interface Sprites {
    normal: string;
    animated: string;
  }
  
  export default Pokemon;