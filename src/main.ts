import config from './config';
import { FeedSource } from './feed-source';
import { Article } from './model';
import { Carousel } from './carousel';
import './site.css';


class App {
    private feedSource = new FeedSource(config.rssUrl);
    private carousel = new Carousel(config.carouselInterval);

    run(): void {
        this.feedSource.startFetchEvery(config.rssUpdateInterval)
            .subscribe((articles: Article[]) => {
                this.carousel.setArticles(articles);
            });

        this.scheduleReload();
    }

    private scheduleReload() {
        setTimeout(
            () => window.location.reload(),
            config.appReloadInterval * 1000
        );
    }
}

new App().run();
