USE fragrance;

DROP TABLE IF EXISTS designers;

CREATE TABLE designers (
    id SMALLINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL UNIQUE KEY,
    designer VARCHAR(20) NULL, 
    main_accords VARCHAR(50) NULL,
    image VARCHAR(250) NOT NULL,
    price SMALLINT NULL,
    top_notes VARCHAR(50) NOT NULL, 
    middle_notes VARCHAR(50) NOT NULL,
    base_notes VARCHAR(50) NULL 
);

INSERT INTO designers (name, designer, main_accords, image, price, top_notes, middle_notes, base_notes)
VALUES 
   ('Acqua di Giò Profumo','Giorgio Armani','aromatic, marine, fresh spicy','ADG.profumo.jpg',135,'Sea Notes, Bergamot','Rosemary, Sage, Geranium','Incense, Patchouli'),
   ('Ultra Male','Jean Paul Gaultier','vanilla, fruity, sweet','JPG.ultraMale.jpg',90,'Pear, Lavender, mint, Lemon, Bergamot','Cinnamon, Clary Sage, Caraway','Black Vanila Hush, Amber, Patchouli, Cedar'),
   ('Spicebomb Extreme','Viktor&Rolf','vanilla, tobacco, sweet','spicebombExtreme.jpg',95,'Vanilla, Tobacco','Cinnamon, Cumin','Bourbon Whiskey, Saffron'),
   ('Stronger With You Absolutely','Giorgio Armani','vanilla, woody, balsamic','SWY.absolutely.jpg',95,'Rum, elemi, bergamot','Lavender, Davana','Madagascar Vanilla, Chestnut, Cedar, Patchouli');