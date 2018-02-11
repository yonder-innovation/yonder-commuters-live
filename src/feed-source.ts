import * as Parser from 'rss-parser';
import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { interval } from 'rxjs/observable/interval';
import { startWith } from 'rxjs/operators/startWith';
import { switchMap } from 'rxjs/operators/switchMap';

import { Article, Author } from './model';


// Note: some RSS feeds can't be loaded in the browser due to CORS security.
// To get around this, you can use a proxy.
const CORS_PROXY = "https://cors-anywhere.herokuapp.com/"

export class FeedSource {
    private parser = new Parser();

    constructor(private url: string) { }

    fetch(): Observable<Article[]> {
        return fromPromise(this.downloadFeeds());
    }

    startFetchEvery(seconds: number): Observable<Article[]> {
        console.debug(`[FeedSource:startFetchEvery] Starting download of feeds every ${seconds} seconds`);

        return interval(seconds * 1000).pipe(
            startWith(0),
            switchMap(() => this.fetch())
        );
    }

    private downloadFeeds(): Promise<Article[]> {
        console.debug('[FeedSource:downloadFeeds] Starting download of feeds');

        return new Promise<any[]>((resolve, reject) => {
            this.parser.parseURL(CORS_PROXY + this.url, (err, feed) => {
                if (err) {
                    console.error(`[FeedSource:downloadFeeds] Error downloading feeds - ${err}`);
                    reject(err);
                } else {
                    console.debug(`[FeedSource:downloadFeeds] Feed finished downloading`);
                    const articles = feed.items.map((x) => this.parseArticle(x));
                    console.debug(`[FeedSource:downloadFeeds] Feed data parsed. Found ${articles.length} articles`);
                    resolve(articles);
                }
            });
        });
    }

    private parseArticle(data: { author: string; content: string; id: string; link: string; pubDate: string; title: string; }): Article {
        return {
            id: data.id,
            url: data.link,
            title: data.title,
            content: data.content,
            description: '',
            date: new Date(data.pubDate),
            flair: '',
            author: {
                username: data.author,
                pictureUrl: '',
                name: ''
            }
        };
    }
}
