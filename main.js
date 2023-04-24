const { scraper } = require('./scraper');
const db = require('./database/init_db.js');
const db_cmd = require('./database/db_cmds.js')

const main = () => {
    db.initialize_db();
    scrape();
}

const scrape = async () => {
    scraper.makeRequest( (result) => {
        articleList = result;
        console.log("Scraped website and got" + articleList.length + " articles.");

        for(item in articleList)
            console.log(articleList)

        for(var i = 0; i < articleList.length; i++)
        {
            db_cmd.get_article(articleList[i].title).then( (res) => {
                console.log(res)
                if(res == 0)
                {
                    console.log("does not exist, inserting");
                    title = articleList[i].title;
                    desc = articleList[i].desc;
                    link = articleList[i].link;
                    imgsrc = articleList[i].imgsrc;
    
                    db_cmd.insert_article(title, desc, link, imgsrc);
                }
            })
        }
    });
}

main()