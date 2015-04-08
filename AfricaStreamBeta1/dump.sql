-- MySQL dump 10.13  Distrib 5.5.41, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: Africa
-- ------------------------------------------------------
-- Server version	5.5.41-0+wheezy1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `Africa`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `Africa` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `Africa`;

--
-- Table structure for table `Actors`
--

DROP TABLE IF EXISTS `Actors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Actors` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(25) DEFAULT NULL,
  `LastName` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Actors`
--

LOCK TABLES `Actors` WRITE;
/*!40000 ALTER TABLE `Actors` DISABLE KEYS */;
INSERT INTO `Actors` VALUES (1,'Souleymane','Ndiaye'),(2,'Malamine','Drame'),(3,'Manie','Malone'),(4,'Hoji','Fortuna'),(5,'Eriya ','Ndayambaje'),(6,'Roger',' Nsengiyumva'),(7,'Clarisse','Tabsoba'),(8,'Fabio','Zenoni'),(9,'Christophe','Sermet'),(10,'Sharon','Hope'),(11,'Sotigui','Kouyaté'),(12,'Roschdy','Zem'),(13,'Oumou','Diarra'),(14,'Boubacar ','Keita'),(15,'Moussa','Balla');
/*!40000 ALTER TABLE `Actors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Comments`
--

DROP TABLE IF EXISTS `Comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Comments` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Wording` varchar(255) DEFAULT NULL,
  `Id_Video` int(11) DEFAULT NULL,
  `Poster` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `FK_Comments_Id_Video` (`Id_Video`),
  CONSTRAINT `FK_Comments_Id_Video` FOREIGN KEY (`Id_Video`) REFERENCES `Video` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Comments`
--

LOCK TABLES `Comments` WRITE;
/*!40000 ALTER TABLE `Comments` DISABLE KEYS */;
/*!40000 ALTER TABLE `Comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Director`
--

DROP TABLE IF EXISTS `Director`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Director` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(100) NOT NULL,
  `Lastname` varchar(100) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Director`
--

LOCK TABLES `Director` WRITE;
/*!40000 ALTER TABLE `Director` DISABLE KEYS */;
INSERT INTO `Director` VALUES (1,'Moussa','Toure'),(2,'Djo Tunda','Munga'),(3,'Debs ','Gardner-Paterson'),(4,'Vivian','Goffette'),(5,'Rachid','Bouchareb'),(6,'Souleymane ','Cissé');
/*!40000 ALTER TABLE `Director` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Genres`
--

DROP TABLE IF EXISTS `Genres`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Genres` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Wording` varchar(25) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Genres`
--

LOCK TABLES `Genres` WRITE;
/*!40000 ALTER TABLE `Genres` DISABLE KEYS */;
INSERT INTO `Genres` VALUES (1,'Drame'),(2,'Drame'),(3,'Comedie'),(4,'Romance');
/*!40000 ALTER TABLE `Genres` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Pictures`
--

DROP TABLE IF EXISTS `Pictures`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Pictures` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Link` varchar(255) DEFAULT NULL,
  `Slide` tinyint(1) DEFAULT NULL,
  `Id_Video` int(11) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `FK_Pictures_Id_Video` (`Id_Video`),
  CONSTRAINT `FK_Pictures_Id_Video` FOREIGN KEY (`Id_Video`) REFERENCES `Video` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Pictures`
--

LOCK TABLES `Pictures` WRITE;
/*!40000 ALTER TABLE `Pictures` DISABLE KEYS */;
INSERT INTO `Pictures` VALUES (1,'/images/14de1ee0-a146-4745-8f45-232d5929f141.jpg',0,1),(2,'/images/9a6c8858-7d82-483f-aeee-f085852c492f.jpg',1,1),(3,'/images/d8502e55-b501-4e8e-9730-1cd974255ef2.jpg',0,2),(4,'/images/3b9ccb34-88a1-4f26-8ff4-7ca3eb8f8df2.jpg',1,2),(5,'/images/987409c9-2969-44a4-96f3-dfe0f2676869.jpg',0,3),(6,'/images/9067d302-b3b4-44de-bca3-f4a8f0a9e038.jpg',1,3),(7,'/images/5b6033fa-84fe-40e4-99be-1bb71f0485eb.jpg',0,4),(8,'/images/212829cf-f6eb-4cbe-bd06-0c3d8674ca2d.jpg',1,4),(9,'/images/dd529588-7a32-4047-a2e6-db737a9ba088.jpg',0,5),(10,'/images/131fdf59-992a-4ee4-97c6-a1062bc40e46.jpg',1,5),(11,'/images/8f310241-354e-413f-a647-6fcd8eedc8df.jpg',0,6),(12,'/images/e75bd762-8c1f-4ca7-a940-f146d1fa6a83.jpg',1,6);
/*!40000 ALTER TABLE `Pictures` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Play`
--

DROP TABLE IF EXISTS `Play`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Play` (
  `Id` int(11) NOT NULL,
  `Id_Video` int(11) NOT NULL,
  PRIMARY KEY (`Id`,`Id_Video`),
  KEY `FK_Play_Id_Video` (`Id_Video`),
  CONSTRAINT `FK_Play_Id` FOREIGN KEY (`Id`) REFERENCES `Actors` (`Id`),
  CONSTRAINT `FK_Play_Id_Video` FOREIGN KEY (`Id_Video`) REFERENCES `Video` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Play`
--

LOCK TABLES `Play` WRITE;
/*!40000 ALTER TABLE `Play` DISABLE KEYS */;
INSERT INTO `Play` VALUES (1,1),(2,1),(3,2),(4,2),(5,3),(6,3),(7,4),(8,4),(9,4),(10,5),(11,5),(12,5),(13,6),(14,6),(15,6);
/*!40000 ALTER TABLE `Play` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Types`
--

DROP TABLE IF EXISTS `Types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Types` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Wording` varchar(25) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Types`
--

LOCK TABLES `Types` WRITE;
/*!40000 ALTER TABLE `Types` DISABLE KEYS */;
INSERT INTO `Types` VALUES (1,'Series'),(2,'Film'),(3,'Documentaire');
/*!40000 ALTER TABLE `Types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Users` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(25) DEFAULT NULL,
  `LastName` varchar(25) DEFAULT NULL,
  `Email` varchar(25) DEFAULT NULL,
  `DateBirth` date DEFAULT NULL,
  `Online` tinyint(1) DEFAULT NULL,
  `Admin` tinyint(1) DEFAULT NULL,
  `Pseudo` varchar(25) DEFAULT NULL,
  `Password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (1,'Eddy','Tokpa','g.eddy@live.fr',NULL,1,0,'azouu','$2a$10$UZUUB/6.xlhXcgi8MBFyJOv1ajr4d1j8hsrOrZb8mky0QPOQwuqQW'),(2,'sava','wesh','tamer@ellesuce.com',NULL,0,0,'refre','$2a$10$QWnUFa9PFvQynGZ2U7bl4etZzxf0/RkRBpjByDJtuT.BYT1GDZQKO'),(3,'jerome','taggle','test@mail.com',NULL,0,0,'tnul','$2a$10$NxvD.RHwSZN1yTxuDiNhmOjodzcKUiSjpE037W3Y1EeModBf/A5lq');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Video`
--

DROP TABLE IF EXISTS `Video`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Video` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Title` varchar(100) NOT NULL,
  `ReleaseDate` date NOT NULL,
  `Description` varchar(1200) NOT NULL,
  `Season` int(11) DEFAULT NULL,
  `Episode` int(11) DEFAULT NULL,
  `SeriesTitle` varchar(100) DEFAULT NULL,
  `Link` varchar(255) NOT NULL,
  `Views` int(11) DEFAULT '0',
  `Rating` smallint(6) DEFAULT '0',
  `Id_Types` int(11) NOT NULL,
  `Id_Director` int(11) DEFAULT NULL,
  `Uploaded` smallint(6) DEFAULT '0',
  PRIMARY KEY (`Id`),
  KEY `FK_Video_Id_Types` (`Id_Types`),
  KEY `Id_Director_idx` (`Id_Director`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Video`
--

LOCK TABLES `Video` WRITE;
/*!40000 ALTER TABLE `Video` DISABLE KEYS */;
INSERT INTO `Video` VALUES (1,'La pirogue','2012-08-02','Un village de pêcheurs dans la grande banlieue de Dakar, d’où partent de nombreuses pirogues. Au terme d’une traversée souvent meurtrière, elles vont rejoindre les îles Canaries en territoire espagnol.',NULL,NULL,NULL,'//www.youtube.com/embed/kCplSewei90',0,0,2,1,0),(2,'Viva Riva','2010-11-02','Kinshasa, où la vie nocturne voluptueuse et trépidante semble toujours prête à engloutir le temps. Quelques rares privilégiés y mènent la grande vie, au mépris de tous les laissés-pour-compte. ',NULL,NULL,NULL,'//www.youtube.com/embed/YXwfTwam1Fs',0,0,2,2,0),(3,'Africa United','2011-01-19','\"Africa United\" raconte l’histoire extraordinaire de trois enfants rwandais qui tentent de réaliser le rêve de leur vie : assister à la cérémonie d’ouverture de la Coupe du Monde de Football 2010 à Johannesburg. ',NULL,NULL,NULL,'//www.youtube.com/embed/HC192mtXdt8',0,0,2,3,0),(4,'YAM DAM','2014-11-11','Christian mène une vie bourgeoise et sans relief de vétérinaire de province. Marié, sans enfants, il a créé avec sa femme une petite association d\'aide à l\'Afrique dont il est le président.',NULL,NULL,NULL,'//www.youtube.com/embed/SqcsfcBfRcw',0,0,2,4,0),(5,'Little Senegal','2001-04-18','Passionné par l\'histoire de son peuple, Alloune, un vieux guide du musée africain \"La Maison des Esclaves\" à Gorée, part en pèlerinage pour retrouver les descendants de ses ancêtres aux Etats-Unis. ',NULL,NULL,NULL,'//www.youtube.com/embed/6OUUW35xra4',0,0,2,5,0),(6,'Baara','1983-11-01','Un jeune travailleur quitte la campagne pour Bamako, la capitale. Il y rencontre un ami, mais surtout y découvre la vie d\'une ville du tiers-monde en pleine mutation.',NULL,NULL,NULL,'//www.youtube.com/embed/E40ilt7V3Zo',0,0,2,6,0);
/*!40000 ALTER TABLE `Video` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `VideoGenre`
--

DROP TABLE IF EXISTS `VideoGenre`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `VideoGenre` (
  `Id` int(11) NOT NULL,
  `Id_Genres` int(11) NOT NULL,
  PRIMARY KEY (`Id`,`Id_Genres`),
  KEY `FK_VideoGenre_Id_Genres` (`Id_Genres`),
  CONSTRAINT `FK_VideoGenre_Id` FOREIGN KEY (`Id`) REFERENCES `Video` (`Id`),
  CONSTRAINT `FK_VideoGenre_Id_Genres` FOREIGN KEY (`Id_Genres`) REFERENCES `Genres` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `VideoGenre`
--

LOCK TABLES `VideoGenre` WRITE;
/*!40000 ALTER TABLE `VideoGenre` DISABLE KEYS */;
INSERT INTO `VideoGenre` VALUES (1,1),(2,1),(5,1),(6,1),(2,2),(3,3),(4,3),(6,3),(3,4),(4,4),(5,4);
/*!40000 ALTER TABLE `VideoGenre` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-04-08  0:35:16
