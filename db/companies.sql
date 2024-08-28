USE fragrance;

DROP TABLE IF EXISTS companies;

CREATE TABLE cuisine (
    id TINYINT NOT NULL PRIMARY KEY,
    name VARCHAR(60) NOT NULL UNIQUE KEY,
    founded VARCHAR(15) NOT NULL,
    headquarters VARCHAR(250) NULL,
    description VARCHAR(500) NULL
);

INSERT INTO cuisine (id,name,continent)
VALUES (0, 'Dior','1946, Paris, France'),
 (1, 'Dolce & Gabbana','1985, Legnano, Italy'),
 (2, 'Giorgio Armani','1975, Italia, Milan'),
 (3, 'Jean Paul Gaultier','1982, Paris, France'),
 (4, 'Chanel','1910, Paris, France'),
 (5, 'Viktor&Rolf','1993, Paris, France');

