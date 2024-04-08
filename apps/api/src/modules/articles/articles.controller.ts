import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
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
  getAll(
    @Query('limit') limit = 10,
    @Query('page') page = 1,
    @Query('pubDate') sortOrder: 'asc' | 'desc' = 'asc',
    @Query('title') title = '',
  ) {
    return this.articlesService.getAll(page, limit, sortOrder, title);
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
