import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Feed } from "feed";
import { FeedItem } from "./feed-item.interface";
import { Options } from "./option-interface";

@Injectable()
export class RssInterceptor implements NestInterceptor {
  constructor(
    private readonly options: Options = {
      title: "Feed Title",
      description: "Feed Description",
      copyright: "Copyright",
      image: "/image.png",
      favicon: "/favicon.ico",
      language: "en",
    }
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const httpContext = context.switchToHttp();
    const response = httpContext.getResponse();
    response.set("Content-Type", "application/rss+xml");

    const feed = new Feed({
      title: this.options.title,
      description: this.options.description,
      id: this.options.link,
      link: this.options.link,
      image: this.options.image,
      favicon: this.options.favicon,
      copyright: this.options.copyright,
      language: this.options.language,
    });

    return next.handle().pipe(
      map((posts: FeedItem[]) => {
        posts.forEach((post) => {
          feed.addItem({
            title: post.title,
            id: post.url,
            link: post.url,
            content: post.content,
            author: [
              {
                name: post.authorName,
              },
            ],
            date: post.publishDate,
            category: post.categories.map((category) => ({
              name: category,
            })),
          });
        });

        return feed.rss2();
      })
    );
  }
}
