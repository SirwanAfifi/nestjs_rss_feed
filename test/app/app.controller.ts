import { Controller, Get, UseInterceptors, Ip } from "@nestjs/common";
import { RssInterceptor } from "../../src/rss.interceptor";

@Controller()
export class AppController {
  @UseInterceptors(
    new RssInterceptor({
      link: "https://example.com",
    })
  )
  @Get()
  posts() {
    return [
      {
        title: "Post One",
        authorName: "Sirwan",
        content: "This is a sample content",
        categories: ["JS", "React"],
        url: "",
        lastUpdatedTime: new Date(),
        publishDate: new Date(),
      },
    ];
  }
}
