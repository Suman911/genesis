/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE TABLE IF NOT EXISTS `admins` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `admins` (`id`, `username`, `password`, `created_at`) VALUES
	(1, 'admintest', '$2y$10$J/LAia3LTfC0NU6FrqH4OuLixpMhMZ2GESDnMIARl9YsU44rAiuZy', '2025-03-26 05:09:31');

CREATE TABLE IF NOT EXISTS `journals` (
  `journal_ID` int NOT NULL AUTO_INCREMENT,
  `UserID` int NOT NULL,
  `first_name` varchar(20) NOT NULL,
  `last_name` varchar(20) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `address` varchar(255) NOT NULL,
  `manu` varchar(30) NOT NULL,
  `journal_title` varchar(255) NOT NULL,
  `abstracts` varchar(255) NOT NULL,
  `key_words` varchar(255) NOT NULL,
  `file_name` varchar(100) NOT NULL,
  PRIMARY KEY (`journal_ID`),
  UNIQUE KEY `journal_title` (`journal_title`),
  UNIQUE KEY `file_name` (`file_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE IF NOT EXISTS `published` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `date` date NOT NULL,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `visible` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `published` (`id`, `name`, `date`, `image`, `path`, `visible`, `created_at`) VALUES
	(1, 'test', '2025-03-01', '../uploads/images/test_20250301_81833893ff8ff13f.jpg', '../uploads/pdf/test_20250301_81833893ff8ff13f.pdf', 1, '2025-03-26 06:01:39'),
	(2, 'test2', '2026-05-15', '../uploads/images/test2_20260515_69ae2829e210bb8f.jpg', '../uploads/pdf/test2_20260515_69ae2829e210bb8f.pdf', 1, '2025-03-26 06:02:31'),
	(3, 'test3', '2024-05-15', '../uploads/images/test3_20240515_f9b452a4de283718.jpg', '../uploads/pdf/test3_20240515_f9b452a4de283718.pdf', 1, '2025-03-26 06:03:36');

CREATE TABLE IF NOT EXISTS `userinfo` (
  `UserID` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(20) NOT NULL,
  `last_name` varchar(20) NOT NULL,
  `email` varchar(50) NOT NULL,
  `phn` varchar(15) NOT NULL,
  `password` varchar(255) NOT NULL,
  `date` datetime NOT NULL,
  PRIMARY KEY (`UserID`),
  UNIQUE KEY `address` (`email`),
  UNIQUE KEY `phn0` (`phn`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `userinfo` (`UserID`, `first_name`, `last_name`, `email`, `phn`, `password`, `date`) VALUES
	(1, 'Suman', 'Mondal', 'suman.drago@gmail.com', '7865833872', '$2y$10$J/LAia3LTfC0NU6FrqH4OuLixpMhMZ2GESDnMIARl9YsU44rAiuZy', '2025-03-26 10:38:29');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
