import {
  HttpException,
  HttpStatus,
  Injectable,
  OnModuleInit,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron } from '@nestjs/schedule';
import { Model, isValidObjectId } from 'mongoose';
import axios from 'axios';
import * as Parser from 'rss-parser';
import { Article } from 'src/schemas/article.schema';
import { CreateArticleDto } from './dto/createArticle.dto';

const parser = new Parser();

@Injectable()
export class ArticlesService implements OnModuleInit {
  constructor(
    @InjectModel(Article.name) private articleRepository: Model<Article>,
  ) {}

  async onModuleInit() {
    await this.addNewArticlesFromRss();
  }

  async getAll() {
    return await this.articleRepository.find();
  }

  async createArticle(articleDto: CreateArticleDto) {
    return await this.articleRepository.create(articleDto);
  }

  async updateArticleById(id: string, articleDto: CreateArticleDto) {
    if (!isValidObjectId(id)) {
      throw new HttpException('Id is invalid', HttpStatus.BAD_REQUEST);
    }

    const updatedArticle = await this.articleRepository.findByIdAndUpdate(
      id,
      articleDto,
      { new: true },
    );

    if (!updatedArticle) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return updatedArticle;
  }

  async deleteArticleById(id: string) {
    if (!isValidObjectId(id)) {
      throw new HttpException('Id is invalid', HttpStatus.BAD_REQUEST);
    }

    const deletedArticle = await this.articleRepository.findByIdAndDelete(id);
    if (!deletedArticle) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return deletedArticle;
  }

  @Cron(process.env.UPDATE_FEEDS_TIME)
  private async addNewArticlesFromRss() {
    console.log('second');
    try {
      const xmlArticles = await axios.get(process.env.RSS_FEED_LINK);
      const xmlArticlesParsed = await parser.parseString(xmlArticles.data);
      const articles = xmlArticlesParsed.items.map(
        ({ categories, contentSnippet, pubDate, link, title }) => ({
          categories,
          contentSnippet,
          pubDate,
          link,
          title,
        }),
      );

      const lastPublishedArticle = await this.articleRepository
        .findOne()
        .sort({ pubDate: -1 });

      if (!lastPublishedArticle) {
        await this.articleRepository.insertMany(articles);
      }

      const oldestDateISO = new Date(lastPublishedArticle.pubDate).getTime();

      const newArticles = articles.filter(
        (item) => new Date(item.pubDate).getTime() > oldestDateISO,
      );

      if (newArticles.length) {
        await this.articleRepository.insertMany(newArticles);
      }
      // await this.articleRepository.deleteMany();
    } catch (error) {
      console.log(error.message);
    }
  }
}
