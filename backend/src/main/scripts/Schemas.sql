
DROP TABLE IF EXISTS 'receipts';
CREATE TABLE Receipt (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    file_url VARCHAR(255),
    upload_time TIMESTAMP,
    payer VARCHAR(255),
    trx_time TIMESTAMP,
    total DECIMAL(10, 2) NOT NULL,
    category VARCHAR(255),
    platform VARCHAR(255),
    merchant VARCHAR(255),
    consumer VARCHAR(255),
    payment_type VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES User(id) ON DELETE CASCADE
);


CREATE TABLE UserData (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255),
    token VARCHAR(255),
    secret VARCHAR(255),
    given_name VARCHAR(255),
    last_name VARCHAR(255),
    last_mod TIMESTAMP,
    date_created TIMESTAMP,
    login_type VARCHAR(50),
    descript TEXT,
    mobile VARCHAR(20),
    notif_telegram BOOLEAN,
    notif_email BOOLEAN,
    scan_email BOOLEAN,
    exp BIGINT,
    UNIQUE (email)
);

DROP TABLE IF EXISTS 'pem_settings';
CREATE TABLE 'pem_settings'(
  `id` int(21) NOT NULL auto_increment,
  `user_id` int(21) NOT NULL ,
  'keyword_array' JSON NOT NULL,
  PRIMARY KEY  (`id`),
	foreign key(`user_id`) references users(`id`),
);


DROP TABLE IF EXISTS 'uploads';
CREATE TABLE 'uploads'(
  `id` int(21) NOT NULL auto_increment,
    `user_id` int(21) NOT NULL ,

  PRIMARY KEY  (`id`),
	foreign key(`user_id`) references users(`id`),

);

DROP TABLE IF EXISTS 'hotmails';
CREATE TABLE 'hotmails'(
  `id` int(21) NOT NULL auto_increment,
    `user_id` int(21) NOT NULL ,

  PRIMARY KEY  (`id`),
	foreign key(`user_id`) references users(`id`),


);

DROP TABLE IF EXISTS 'gphotos';
CREATE TABLE 'gphotos'(
  `id` int(21) NOT NULL auto_increment,
  `filepath` varchar(255) character set utf8 collate utf8_unicode_ci NOT NULL default '',
  `user_id` int(21) NOT NULL ,

  PRIMARY KEY  (`id`),
	foreign key(`user_id`) references users(`id`),

);
