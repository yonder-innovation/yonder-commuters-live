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
            autoplaySpeed: this.cycleInterval * 1000,
        });
    }

    setArticles(articles: Article[]): void {
        this.element.slick('slickPause');

        const articlesToRemove: number[] = [];
        const articlesToAdd: Article[] = [];

        this.currentArticles.forEach((article: Article, index: number) => {
            if (articles.find((x) => x.id === article.id)) {
                return;
            }

            articlesToRemove.push(index);
        });

        articlesToRemove.forEach((index) => {
            console.log('removing at index', index);
            this.element.slick('slickRemove', index);
            this.currentArticles.splice(index, 1);
        });

        articles.forEach((article: Article) => {
            if (this.currentArticles.find((x) => x.id === article.id)) {
                return;
            }

            this.currentArticles.push(article);
            this.addArticle(article);
        });

        this.element.slick('slickPlay');
    }

    private addArticle(article: Article): void {
        this.element.slick('slickAdd',`
            <div class="article">
                <h2 class="title">${article.title}</h2>
                <div class="article-content">
                    <span>recommended by <em>${article.author.username}</em></span>
                </div>
            </div>
        `);
    }
}
