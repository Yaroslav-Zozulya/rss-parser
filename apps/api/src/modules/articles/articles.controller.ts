import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/createArticle.dto';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
// import { ValidationPipe } from 'src/pipes/ValidationPipe.pipe';

@Controller('articles')
export class ArticlesController {
  constructor(private articlesService: ArticlesService) {}

  @Get()
  getAll() {
    return this.articlesService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  // @UsePipes(ValidationPipe)
  @Post()
  add(@Body() articleDto: CreateArticleDto) {
    return this.articlesService.createArticle(articleDto);
  }

  @UseGuards(JwtAuthGuard)
  // @UsePipes(ValidationPipe)
  @Put('/:id')
  update(@Body() articleDto: CreateArticleDto, @Param('id') id: string) {
    return this.articlesService.updateArticleById(id, articleDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.articlesService.deleteArticleById(id);
  }
}
