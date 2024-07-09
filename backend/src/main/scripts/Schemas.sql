DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(21) NOT NULL auto_increment,
  `name` varchar(255) character set utf8 collate utf8_unicode_ci NOT NULL default '',
  `password` varchar(255) character set utf8 collate utf8_unicode_ci NOT NULL default '',
  'login_type' varchar(25),
  'date_created' datetime NOT NULL default '0000-00-00 00:00:00',
  `descript` text character set utf8 collate utf8_unicode_ci NOT NULL,
  `last_mod` datetime NOT NULL default '0000-00-00 00:00:00',
--   `srm` float NOT NULL default '0',
--   `upc` int(40) NOT NULL default '0',
  `pem_setting_id` int(21) default '0',
  `receipt_id` int(21) default '0',
  `hotmail_id` int(11) default '0',
  `gphoto_id` int(11) default '0',
  `uploads_id` int(21) default '0',

  PRIMARY KEY  (`id`),
  	foreign key(`pem_setting_id`) references pem_setting(`id`),
	foreign key(`receipts_id`) references receipts(`id`),
	foreign key(`hotmail_id`) references hotmail(`id`)
	foreign key(`gphoto_id`) references gphoto(`id`),
	foreign key(`uploads_id`) references uploads(`id`)
 );

DROP TABLE IF EXISTS 'pem_settings';
CREATE TABLE 'pem_settings'(
  `id` int(21) NOT NULL auto_increment,
  `user_id` int(21) NOT NULL ,
  'keyword_array' JSON NOT NULL,
  PRIMARY KEY  (`id`),
	foreign key(`user_id`) references users(`id`),
);

DROP TABLE IF EXISTS 'receipts';
CREATE TABLE 'receipts'(
  `id` int(21) NOT NULL auto_increment,
  `user_id` int(21) NOT NULL ,
  'upload_date' datetime NOT NULL default '0000-00-00 00:00:00',
  'payer' varchar(255) character set utf8 collate utf8_unicode_ci NOT NULL default '',
  'pay_date' datetime NOT NULL default '0000-00-00 00:00:00',
  'total' float NOT NULL default '0',
  'category_id' int(21),
  'platform_id' int(21),
  'merchant_id' int(21),
  'consumer_id' int(21),  -- address where purchase was consumed or account to which payment was paid/transferred to
  'payment_type_id' int(21),

  PRIMARY KEY  (`id`),
	foreign key(`user_id`) references users(`id`),
  	foreign key(`category_id`) references category(`id`),
	foreign key(`platform_id`) references platforms(`id`),
	foreign key(`merchant_id`) references merchants(`id`)
	foreign key(`consumer_id`) references consumers(`id`),
	foreign key(`payment_type_id`) references payment_types(`id`)
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
