const makeRequest = require('./scraper');
const db = require('./database/init_db.js');
const db_cmd = require('./database/db_cmds.js')
var mysql = require('mysql2');

const main = () => {
    db.initialize_db();
    scrape();
}

const scrape = () => {
    makeRequest().then( (result) => {
        articleList = result;
        console.log("Scraped website and got" + articleList.length + " articles.");

        for(let i = 0; i < articleList.length; i++)
        {
            title = articleList[i].getTitle();
            res = db_cmd.get_article(title).then((res) => {
            if(res == 0)
            {
                console.log("does not exist, inserting");
                title = articleList[i].getTitle() ? articleList[i].getTitle() : "No title";
                desc = articleList[i].getDesc() ? articleList[i].getDesc() : "No description";
                link = articleList[i].getLink() ? articleList[i].getLink() : "No link";
                imgsrc = articleList[i].getImgsrc() ? articleList[i].getImgsrc() : "No image source";

                db_cmd.insert_article(title, desc, link, imgsrc);
            }
            else
            {
                console.log("article exists");
            }
        });
        }
    });
}

main()