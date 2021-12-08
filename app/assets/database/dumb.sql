-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 08. Dez 2021 um 08:23
-- Server-Version: 10.4.22-MariaDB
-- PHP-Version: 8.0.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;



--
-- Datenbank: `mazemaster`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `maps`
--

CREATE TABLE `maps` (
  `id` int(100) NOT NULL,
  `name` varchar(50) NOT NULL,
  `map_object` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`map_object`)),
  `thumbnail` longblob NOT NULL,
  `updated_at` date DEFAULT NULL,
  `created_at` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `maps`
--

INSERT INTO `maps` (`id`, `name`, `map_object`, `thumbnail`, `updated_at`, `created_at`) VALUES
(37, 'Default Map', '[[\"#\",\"#\",\"#\",\"#\",\"#\",\"#\",\"#\",\"#\",\"#\",\"#\"],[\"#\",\" \",\" \",\" \",\" \",\" \",\"#\",\" \",\" \",\"#\"],[\"#\",\" \",\"#\",\" \",\" \",\"#\",\"#\",\"#\",\" \",\"#\"],[\"#\",\" \",\"#\",\" \",\"#\",\"#\",\" \",\" \",\" \",\"#\"],[\"#\",\" \",\"#\",\" \",\" \",\" \",\" \",\"#\",\" \",\"#\"],[\"#\",\" \",\"#\",\"#\",\"#\",\"#\",\"#\",\"#\",\" \",\"#\"],[\"#\",\" \",\" \",\" \",\" \",\"#\",\" \",\" \",\" \",\"#\"],[\"#\",\" \",\"#\",\"#\",\" \",\"#\",\" \",\"#\",\"#\",\"#\"],[\"#\",\" \",\"#\",\"X\",\" \",\"#\",\" \",\" \",\"&\",\"#\"],[\"#\",\"#\",\"#\",\"#\",\"#\",\"#\",\"#\",\"#\",\"#\",\"#\"]]', 0x20, NULL, '2021-12-03');

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `maps`
--
ALTER TABLE `maps`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `maps`
--
ALTER TABLE `maps`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
