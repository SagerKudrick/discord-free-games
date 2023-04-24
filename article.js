class Article {

    constructor(title, desc, link, imgsrc) {
        this.title = title;
        this.desc = desc;
        this.link = link;
        this.imgsrc = imgsrc;
    }

    getTitle()
    {
        return this.title;
    }

    getDesc()
    {
        return this.desc;
    }

    getLink()
    {
        return this.link;
    }

    getImgsrc()
    {
        return this.imgsrc;
    }
}

module.exports = Article;