export default {
    appReloadInterval: 60 * 60 * 2, // seconds to wait before reloading the app.
                           // This is needed because the app is targeted towards
                           // large monitors which are unattended.
                           // Reloading the app every x seconds allows it to
                           // pick up the latest deployment source files.

    // Carousel
    carouselInterval: 10, // cycle through feeds on the UI every x seconds.
    maxCarouselItems: 20, // only cycle through the latest x feeds

    // RSS
    rssUrl: 'https://www.reddit.com/r/yondercommuters/.rss',
    rssUpdateInterval: 600, // check for rss updates every x seconds.
};
