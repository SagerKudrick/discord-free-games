const request = require('request');
const cheerio = require('cheerio');
const Article = require("./article.js");

let articles = [];

function makeRequest()  {
    
    return new Promise((resolve, reject) => {
        request({
            method: 'GET',
            url: 'https://www.epicbundle.com/'
        }, (err, res, body) => {
        
            let titles = [];
            let descs = [];
            let links = [];
            let imgsrcs = [];
        
            if (err) return console.error(err);
        
            let $ = cheerio.load(body);
        
            $(".camya-post-content .entry-title").each((i, e) => {
                titles[i] = e.children[1].attribs.title
            })
        
            $(".camya-post-content-excerpt").each((i, e) => {
                descs[i] = e.children[0].data
            })
        
            $(".camya-post-content a").each((i, e) => {
                links[i] = e.attribs.href
            })
        
            $(".camya-post-image img").each((i, e) => {
                lazysrc = e.attribs['data-lazy-src']
                if(typeof lazysrc !== 'undefined' && lazysrc !== null)
                {
                    imgsrcs[i] = lazysrc
                }
            })
            imgsrcs = imgsrcs.filter((a) => a)
            for(i = 0; i < titles.length; i++)
            {
                articles[i] = new Article(titles[i], descs[i], links[i], imgsrcs[i]);
            }
        
            resolve(articles);
        
        });
    });
    
}

exports.scraper = makeRequest;