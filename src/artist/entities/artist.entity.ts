import { v4 as uuidv4 } from 'uuid';

import { Artist } from '../../artist/interface/artist.interface';

export class ArtistEntity implements Artist {
  id: string;
  name: string;
  grammy: boolean;

  constructor(partial: Partial<ArtistEntity>) {
    const { name, grammy } = partial;
    this.id = uuidv4();
    this.name = name;
    this.grammy = grammy;
  }
}
