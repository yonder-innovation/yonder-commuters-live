import * as distanceInWordsToNow from 'date-fns/distance_in_words_to_now';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { interval } from 'rxjs/observable/interval';
import { map } from 'rxjs/operators/map';
import { take } from 'rxjs/operators/take';
import { startWith } from 'rxjs/operators/startWith';

import * as $ from 'jquery';
import 'slick-carousel';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { Article } from './model';

export class Carousel {
    private readonly element = $('#feeds');

    private readonly currentArticles: Article[] = [];

    constructor(private cycleInterval: number) {
        this.element.slick({
            dots: true,
            speed: 500,
            autoplay: true,
            // autoplay: false,
            autoplaySpeed: this.cycleInterval * 1000,
        });
    }

    setArticles(articles: Article[]): void {
        this.element.slick('slickPause');

        const articlesToRemove: number[] = [];
        this.currentArticles.forEach((article: Article, index: number) => {
            if (!articles.find((x) => x.id === article.id)) {
                articlesToRemove.push(index);
            }
        });
        articlesToRemove.forEach((index) => {
            this.element.slick('slickRemove', index);
            this.currentArticles.splice(index, 1);
        });

        const articlesToAdd: Article[] = [];
        articles.forEach((article: Article) => {
            if (!this.currentArticles.find((x) => x.id === article.id)) {
                this.currentArticles.push(article);
                this.addArticle(article);
            }
        });

        this.element.slick('slickPlay');
    }

    private addArticle(article: Article): void {
        this.element.slick('slickAdd',`
            <div class="article">
                <h2 class="title">${article.title}</h2>
                <div class="article-content">
                    <img class="author-picture" onload="this.style.display='block'" src=${article.author.pictureUrl} />

                    <div class="author-text">
                        <span class="recommended-by">recommended by</span>
                        <span class="username">${article.author.username}</span>
                        <span class="date">${distanceInWordsToNow(article.date, { addSuffix: true })}</span>
                    </div>
                </div>
            </div>
        `);
    }
}
