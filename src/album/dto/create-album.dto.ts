import { IsInt, IsNotEmpty, IsString, IsUUID } from 'class-validator';

import { IsNullable } from '../../utils/isNullable.decorator';

export class CreateAlbumDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  year: number;

  @IsNullable()
  @IsString()
  @IsNotEmpty()
  @IsUUID('4')
  artistId: string | null;
}
