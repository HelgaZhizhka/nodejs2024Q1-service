import { Artist } from "../interface/artist.interface";

export class ArtistEntity implements Artist {
  id: string;
  name: string;
  grammy: boolean;
}
