CREATE TABLE `task` (
  `id` char(36) PRIMARY KEY,
  `title` varchar(255) NOT NULL,
  `status` ENUM('DONE', 'INCOMPLETE') NOT NULL,
  `created` datetime DEFAULT CURRENT_TIMESTAMP
);
