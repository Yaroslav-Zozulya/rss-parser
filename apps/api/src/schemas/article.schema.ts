import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ArticleDocument = HydratedDocument<Article>;

@Schema()
export class Article {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  contentSnippet: string;

  @Prop({ required: true })
  link: string;

  @Prop({ required: true })
  categories: string[];

  @Prop({ required: true, default: new Date().toUTCString() })
  pubDate: string;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
