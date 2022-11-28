-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 24, 2022 at 01:25 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `test`
--

-- --------------------------------------------------------

--
-- Table structure for table `ucm_aw_cau_avi_avisos`
--

CREATE TABLE `ucm_aw_cau_avi_avisos` (
  `idAviso` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `tipo` int(1) NOT NULL,-- 0: felicitacion   1: sugerencia     2: Incidencia   -1: borrado
  `fecha` date NOT NULL,
  `texto` varchar(1000) NOT NULL,
  `tecnico` varchar(50) DEFAULT NULL,
  `comentarios` varchar(1000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ucm_aw_cau_avi_avisos`
--

INSERT INTO `ucm_aw_cau_avi_avisos` (`idAviso`, `idUsuario`, `tipo`, `fecha`, `texto`, `tecnico`, `comentarios`) VALUES
(1, 3, 1, '0000-00-00', 'Preparar prácticas AW', '2', 'Aun te falta hacer la BD bobo'),
(2, 5, 1, '0000-00-00', 'Mirar fechas de congreso', NULL, NULL),
(3, 4, 1, '0000-00-00', 'Ir al Supermercado', NULL, NULL),
(4, 1, 2, '0000-00-00', 'Jugar al Fútbol', '1', 'Empieza a calentar que sales'),
(5, 2, 0, '0000-00-00', 'Hablar con el profesor', '2', NULL),
(7, 1, 1, '0000-00-00', 'Entregar Practica Vountaria 4', '1', 'no lo has entregado parguela'),
(8, 6, 0, '0000-00-00', 'Jugar ligoleyen', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table ` ucm_aw_cau_usu_usuarios`
--

CREATE TABLE `ucm_aw_cau_usu_usuarios` (
  `idUser` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(45) NOT NULL,
  `perfil` varchar(45) NOT NULL,
  `tecnico` int(1) NOT NULL,
  `nEmpleado` varchar(8) DEFAULT NULL,
  `img` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table ` ucm_aw_cau_usu_usuarios`
--

INSERT INTO `ucm_aw_cau_usu_usuarios` (`idUser`, `nombre`, `email`, `password`, `perfil`, `tecnico`, `nEmpleado`, `img`) VALUES
(1, 'aitor', 'aitor.tilla@ucm.es', 'aitor', 'pas', 1, '1234-abc', 'aitor.png'),
(2, 'felipe', 'felipe.lotas@ucm.es', 'felipe', 'pas', 1, '5678-def', 'felipe.png'),
(3, 'steve', 'steve.curros@ucm.es', 'steve', 'oldS', 0, NULL, 'steve.png'),
(4, 'bill', 'bill.puertas@ucm.es', 'bill', 'pdi', 0, NULL, 'bill.png'),
(5, 'alberto', 'albarto.lopez@ucm.es', 'alberto', 'alumno', 0, NULL, NULL),
(6, 'usuario', 'usuario@ucm.es', 'usuario', 'alumno', 0, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ucm_aw_cau_avi_avisos`
--
ALTER TABLE `ucm_aw_cau_avi_avisos`
  ADD PRIMARY KEY (`idAviso`),
  ADD UNIQUE KEY `texto` (`texto`) USING HASH;

--
-- Indexes for table ` ucm_aw_cau_usu_usuarios`
--
ALTER TABLE `ucm_aw_cau_usu_usuarios`
  ADD PRIMARY KEY (`idUser`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `ucm_aw_cau_avi_avisos`
--
ALTER TABLE `ucm_aw_cau_avi_avisos`
  MODIFY `idAviso` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table ` ucm_aw_cau_usu_usuarios`
--
ALTER TABLE `ucm_aw_cau_usu_usuarios`
  MODIFY `idUser` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
