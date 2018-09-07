/*Create database and define tables*/

CREATE DATABASE simpo;

USE simpo;

CREATE TABLE usernames(
    id INT(6) auto_increment,
    username VARCHAR(30),
    pass VARCHAR(10),
    PRIMARY KEY (id),
    UNIQUE(username)
);

CREATE TABLE vendors(
    id INT(6) auto_increment,
    username_id INT(6),
    vendor VARCHAR(30),
    vendor_address VARCHAR(100),
    phone VARCHAR(13),
    email VARCHAR(40),
    PRIMARY KEY (id),
    FOREIGN KEY (username_id) REFERENCES usernames(id)
);

CREATE TABLE projects(
    id INT(6) auto_increment,
    project VARCHAR(30),
    username_id INT(6),
    PRIMARY KEY (id),
    FOREIGN KEY (username_id) REFERENCES usernames(id)
);

CREATE TABLE purchase_orders(
    id INT(6) auto_increment,
    po_num INT(6),
    username_id INT(6),
    date_created VARCHAR(10),
    total INT(6),
    sub INT(6), 
    tax INT(6),
    shipping_cost INT(6),
    discount INT(6),
    notes VARCHAR(250),
    ship_to VARCHAR(100),
    vendor_id INT(6),
    project_id INT(6),
    PRIMARY KEY (id),
    FOREIGN KEY (username_id) REFERENCES usernames(id),
    FOREIGN KEY (vendor_id) REFERENCES vendors(id),
    FOREIGN KEY (project_id) REFERENCES projects(id)
);

CREATE TABLE line_items(
    id INT(6) auto_increment,
    po_id INT(6),
    item VARCHAR(20),
    item_details VARCHAR(250),
    qty INT(6),
    unit_price INT(6),
    amount INT(6),
    PRIMARY KEY (id),
    FOREIGN KEY (po_id) REFERENCES purchase_orders(id)
);

/* Data */

INSERT INTO usernames (username, pass) VALUES ('Moonrise LLC', 'surycole');
INSERT INTO usernames (username, pass) VALUES ('Sad Girl Inc', 'sadgirls');
INSERT INTO usernames (username, pass) VALUES ('Designer Life', 'design');
INSERT INTO usernames (username, pass) VALUES ('Namja Corp', 'datboy');
INSERT INTO usernames (username, pass) VALUES ('Yeoja and Co', 'datgirl');



INSERT INTO vendors (username_id, vendor, vendor_address, phone, email) VALUES (1, 'Surya', '666 Surya Street, Washington DC, VA 666666', '(666)666-6666', 'info@surya.com');
INSERT INTO vendors (username_id, vendor, vendor_address, phone, email) VALUES (1, 'Urban Outfitters', '123 Pluto Ave, Orlando, FL 123455', '(666)666-6666', 'uohome@urbanoutfitters.com');
INSERT INTO vendors (username_id, vendor, vendor_address, phone, email) VALUES (2, 'Lulu and Georgia', '123 Raw Court, Los Angeles, CA 666666', '(666)666-6666', 'home@luluandgeorgia.com');
INSERT INTO vendors (username_id, vendor, vendor_address, phone, email) VALUES (2, 'The Mine', '333 Noir Lane, Los Angeles, CA 666666', '(666)666-6666', 'design@themine.com');
INSERT INTO vendors (username_id, vendor, vendor_address, phone, email) VALUES (3, 'Restoration Hardware', '876 Looney Place, Burbank, CA 666666', '(666)666-6666', 'order@restorationhardware.com');
INSERT INTO vendors (username_id, vendor, vendor_address, phone, email) VALUES (3, 'Urban Home', '123 Venti Road, Seattle, OR 666666', '(666)666-6666', 'coffee@urbanhome.com');
INSERT INTO vendors (username_id, vendor, vendor_address, phone, email) VALUES (4, 'Free People', '456 Mountain Pass, Olympia, WA 666666', '(666)666-6666', 'home@freepeople.com');
INSERT INTO vendors (username_id, vendor, vendor_address, phone, email) VALUES (4, 'Loveseat', '987 Hops Street, New York, NY 666666', '(666)666-6666', 'info@loveseat.com');
INSERT INTO vendors (username_id, vendor, vendor_address, phone, email) VALUES (5, 'Sun Beam Vintage', '686 Capri Avenue, Chicago, IL 666666', '(666)666-6666', 'order@sunbeam.com');
INSERT INTO vendors (username_id, vendor, vendor_address, phone, email) VALUES (5, 'Safavieh', '601 Big Paws Road, Humboldt, CA 666666', '(666)666-6666', 'customer@safavieh.com');


INSERT INTO projects (project, username_id) VALUES ('Helen Bathroom', 1);
INSERT INTO projects (project, username_id) VALUES ('Gordon Living Room', 1);
INSERT INTO projects (project, username_id) VALUES ('Soko Guest Room', 1);
INSERT INTO projects (project, username_id) VALUES ('Susan Home', 2);
INSERT INTO projects (project, username_id) VALUES ('Kevin Bedroom', 2);
INSERT INTO projects (project, username_id) VALUES ('Tina Foyer', 2);
INSERT INTO projects (project, username_id) VALUES ('Carla Kitchen', 3);
INSERT INTO projects (project, username_id) VALUES ('Bobbi Closet', 3);
INSERT INTO projects (project, username_id) VALUES ('Melanie Office', 3);
INSERT INTO projects (project, username_id) VALUES ('Cristy Bedroom', 4);
INSERT INTO projects (project, username_id) VALUES ('Jim Guestroom', 4);
INSERT INTO projects (project, username_id) VALUES ('Silvia Kitchen', 4);
INSERT INTO projects (project, username_id) VALUES ('Alba Living Room', 5);
INSERT INTO projects (project, username_id) VALUES ('Jeanne Home', 5);
INSERT INTO projects (project, username_id) VALUES ('Sarah Bathroom', 5);


INSERT INTO purchase_orders (po_num, username_id, date_created, total, sub, tax, shipping_cost, discount, notes, ship_to, vendor_id, project_id) VALUES (1, 1, '06/06/2018',1999999,1999900,0,99,0, 'Fix Helens Bathroom', 'Helens Address', 1, 1);
INSERT INTO purchase_orders (po_num, username_id, date_created, total, sub, tax, shipping_cost, discount, notes, ship_to, vendor_id, project_id) VALUES (1, 2, '06/07/2018',1999999,1999900,0,99,0, 'Kevin Bedroom Notes', 'Kevins Address', 3, 5);
INSERT INTO purchase_orders (po_num, username_id, date_created, total, sub, tax, shipping_cost, discount, notes, ship_to, vendor_id, project_id) VALUES (1, 3, '06/08/2018',1999999,1999900,0,99,0, 'Office Project', 'Melanie Address', 5, 9);
INSERT INTO purchase_orders (po_num, username_id, date_created, total, sub, tax, shipping_cost, discount, notes, ship_to, vendor_id, project_id) VALUES (1, 4, '06/09/2018',1999999,1999900,0,99,0, 'Jims Bedroom', 'Jim Address', 8, 11);
INSERT INTO purchase_orders (po_num, username_id, date_created, total, sub, tax, shipping_cost, discount, notes, ship_to, vendor_id, project_id) VALUES (1, 5, '06/10/2018',1999999,1999900,0,99,0, 'Sarah Bath', 'Sarah Address', 9, 15);

INSERT INTO line_items (po_id, item, item_details, qty, unit_price, amount) VALUES (1, 'Towels', 'Baby Blue Towels', 2, 10, 20);
INSERT INTO line_items (po_id, item, item_details, qty, unit_price, amount) VALUES (1, 'Dish', 'Ceramic', 1, 20, 20);
INSERT INTO line_items (po_id, item, item_details, qty, unit_price, amount) VALUES (1, 'Mat', 'Woven Mat', 1, 100, 100);
INSERT INTO line_items (po_id, item, item_details, qty, unit_price, amount) VALUES (2, 'Duvet', 'King Size Duvet', 1, 200, 200);
INSERT INTO line_items (po_id, item, item_details, qty, unit_price, amount) VALUES (2, 'Shams', 'Euro Shams', 2, 100, 200);
INSERT INTO line_items (po_id, item, item_details, qty, unit_price, amount) VALUES (2, 'Table', 'Oak night stand', 1, 2000, 2000);
INSERT INTO line_items (po_id, item, item_details, qty, unit_price, amount) VALUES (2, 'Lamp', 'Salmon Shade Lamp', 1, 100, 100);
INSERT INTO line_items (po_id, item, item_details, qty, unit_price, amount) VALUES (3, 'Floor Lamp', 'Brushed Brass', 1, 300, 300);
INSERT INTO line_items (po_id, item, item_details, qty, unit_price, amount) VALUES (3, 'Desk', 'Small writing desk', 1, 1000, 1000);
INSERT INTO line_items (po_id, item, item_details, qty, unit_price, amount) VALUES (4, 'Duvet', 'Queem Size Duvet', 1, 200, 200);
INSERT INTO line_items (po_id, item, item_details, qty, unit_price, amount) VALUES (4, 'Shams', 'Standard Shams', 2, 100, 200);
INSERT INTO line_items (po_id, item, item_details, qty, unit_price, amount) VALUES (4, 'Table', 'Vintage night stand', 1, 2000, 2000);
INSERT INTO line_items (po_id, item, item_details, qty, unit_price, amount) VALUES (4, 'Lamp', 'Minimal Shade Lamp', 1, 100, 100);
INSERT INTO line_items (po_id, item, item_details, qty, unit_price, amount) VALUES (5, 'Towels', 'Black Hand Towels', 2, 10, 20);
INSERT INTO line_items (po_id, item, item_details, qty, unit_price, amount) VALUES (5, 'Candles', 'Lemongrass', 3, 20, 60);
INSERT INTO line_items (po_id, item, item_details, qty, unit_price, amount) VALUES (5, 'Mat', 'Woven Mat', 1, 100, 100);