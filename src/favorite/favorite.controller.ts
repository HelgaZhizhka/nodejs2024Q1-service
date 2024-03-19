import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  HttpCode,
  ParseUUIDPipe,
} from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';

import { FavoriteService } from './favorite.service';

@Controller('favs')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Get()
  @HttpCode(200)
  findAll() {
    return this.favoriteService.findAll();
  }

  @Post('track/:id')
  @HttpCode(StatusCodes.CREATED)
  addTrackToFavorites(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoriteService.addTrack(id);
  }

  @Delete('track/:id')
  @HttpCode(StatusCodes.NO_CONTENT)
  removeTrackFromFavorites(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoriteService.removeTrack(id);
  }

  @Post('album/:id')
  @HttpCode(StatusCodes.CREATED)
  addAlbumToFavorites(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoriteService.addAlbum(id);
  }

  @Delete('album/:id')
  @HttpCode(StatusCodes.NO_CONTENT)
  removeAlbumFromFavorites(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoriteService.removeAlbum(id);
  }

  @Post('artist/:id')
  @HttpCode(StatusCodes.CREATED)
  addArtistToFavorites(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoriteService.addArtist(id);
  }

  @Delete('artist/:id')
  @HttpCode(StatusCodes.NO_CONTENT)
  removeArtistFromFavorites(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoriteService.removeArtist(id);
  }
}
