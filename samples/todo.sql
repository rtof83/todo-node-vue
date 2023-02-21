/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Copiando estrutura do banco de dados para todo
DROP DATABASE IF EXISTS `todo`;
CREATE DATABASE IF NOT EXISTS `todo` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `todo`;

-- Copiando estrutura para tabela todo.configs
DROP TABLE IF EXISTS `configs`;
CREATE TABLE IF NOT EXISTS `configs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `pageSize` int NOT NULL,
  `dateSize` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Copiando dados para a tabela todo.configs: ~1 rows (aproximadamente)
DELETE FROM `configs`;
INSERT INTO `configs` (`id`, `pageSize`, `dateSize`, `createdAt`, `updatedAt`) VALUES
	(1, 10, 3, '2023-02-20 17:49:38', '2023-02-21 15:55:40');

-- Copiando estrutura para tabela todo.tags
DROP TABLE IF EXISTS `tags`;
CREATE TABLE IF NOT EXISTS `tags` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `color` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Copiando dados para a tabela todo.tags: ~3 rows (aproximadamente)
DELETE FROM `tags`;
INSERT INTO `tags` (`id`, `name`, `color`, `createdAt`, `updatedAt`) VALUES
	(1, 'em progresso', '#EDE04D', '2023-02-20 17:49:38', '2023-02-21 15:55:40'),
	(2, 'pendente', '#ED4F32', '2023-02-20 17:49:38', '2023-02-21 11:25:13'),
	(3, 'finalizado', '#15CD72', '2023-02-20 17:49:38', '2023-02-20 21:58:51');

-- Copiando estrutura para tabela todo.tasks
DROP TABLE IF EXISTS `tasks`;
CREATE TABLE IF NOT EXISTS `tasks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `deadline` date DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `tagId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `tagId` (`tagId`),
  CONSTRAINT `tasks_ibfk_1` FOREIGN KEY (`tagId`) REFERENCES `tags` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Copiando dados para a tabela todo.tasks: ~3 rows (aproximadamente)
DELETE FROM `tasks`;
INSERT INTO `tasks` (`id`, `name`, `deadline`, `createdAt`, `updatedAt`, `tagId`) VALUES
	(44, 'Tarefa 1', '2023-02-24', '2023-02-21 15:55:58', '2023-02-21 15:55:58', 1),
	(45, 'Tarefa 2', '2023-02-14', '2023-02-21 15:56:00', '2023-02-21 15:56:10', 2),
	(46, 'Tarefa 3', '2023-02-24', '2023-02-21 15:56:03', '2023-02-21 15:56:13', 3);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
