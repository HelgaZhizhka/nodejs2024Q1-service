import { v4 as uuidv4 } from 'uuid';

import { Album } from '../../album/interface/album.interface';

export class AlbumEntity implements Album {
  id: string;
  name: string;
  year: number;
  artistId: string | null;

  constructor(partial: Partial<AlbumEntity>) {
    const { name, year, artistId } = partial;
    this.id = uuidv4();
    this.name = name;
    this.year = year;
    this.artistId = artistId;
  }
}
