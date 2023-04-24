DROP DATABASE free_games;
CREATE DATABASE free_games;

USE free_games;

CREATE TABLE articles (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(255),
  descript TEXT,
  link VARCHAR(255),
  imgsrc VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

DELIMITER $
CREATE PROCEDURE getarticle (_title VARCHAR(255))
BEGIN
	SELECT title, descript, link, imgsrc, created_at
    FROM articles
    WHERE title = _title;
END$

DELIMITER $
CREATE PROCEDURE deletearticle (_title VARCHAR(255))
BEGIN
	DELETE
    FROM articles
    WHERE title = _title;
END$

DELIMITER $
CREATE PROCEDURE insertarticle (
  _title VARCHAR(255),
  _descript TEXT,
  _link VARCHAR(255),
  _imgsrc VARCHAR(255))
BEGIN
	INSERT
    INTO articles (title, descript, link, imgsrc)
    VALUES (_title, _descript, _link, _imgsrc);
END$