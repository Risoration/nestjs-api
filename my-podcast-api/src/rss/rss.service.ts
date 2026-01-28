import { Injectable } from '@nestjs/common';
import Parser from 'rss-parser';

@Injectable()
export class RssService {
  private parser: Parser;

  constructor() {
    this.parser = new Parser({
      customFields: {
        item: [
          ['itunes: duration', 'itunesDuration'],
          ['itunes: summary', 'itunesSummary'],
        ],
      },
    });
  }

  async fetchFeed(rssUrl: string) {
    return this.parser.parseURL(rssUrl);
  }
}
