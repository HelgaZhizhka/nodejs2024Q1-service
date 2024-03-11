import { Favorite } from '../../favorite/interface/favorite.interface';

export class FavoriteEntity implements Favorite {
  artists: string[];
  albums: string[];
  tracks: string[];
}
