const {scraper} = require('./scraper');

const scrape = () => {
    scraper( (result) => {
        articleList = result;
        console.log("Scraped website and got" + articleList.length + " articles.");
    });
}