import { IsInt, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateAlbumDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  year: number;
  
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsUUID('4')
  artistId: string | null;
}
