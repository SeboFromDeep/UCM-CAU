-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 13-11-2022 a las 22:47:31
-- Versión del servidor: 10.4.25-MariaDB
-- Versión de PHP: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `practica_voluntaria`
--

--
-- Estructura de tabla para la tabla `avisos`
--

CREATE TABLE `UCM_AW_CAU_AVI_Avisos` (
  `idAviso` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `tipo` int(1) NOT NULL,
  `fecha` date NOT NULL,
  `texto` varchar(100) NOT NULL,
  `tecnico` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `avisos`
--

INSERT INTO `UCM_AW_CAU_AVI_Avisos` (`idAviso`, `idUsuario` , `tipo`, `fecha`, `texto`, `tecnico`) VALUES
(7, 1, 1, '16/10/2022','Entregar Practica Vountaria 4', 1),
(5, 2, 0, '2/11/2022','Hablar con el profesor', 2),
(3, 4, 1, '2/9/2022','Ir al Supermercado',NULL),
(4, 1, 2, '10/11/2022','Jugar al Fútbol', 1),
(8, 6, 0, '27/10/2022','Jugar ligoleyen', NULL),
(2, 5, 1, '8/9/2022','Mirar fechas de congreso', NULL),
(1, 3, 1, '2/11/2022', 'Preparar prácticas AW', 2);


-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE ` UCM_AW_CAU_USU_Usuarios` (
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
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO ` UCM_AW_CAU_USU_Usuarios` (`idUser`,`nombre`, `email`, `password`, `perfil`, `tecnico` , `nEmpleado`, `img`) VALUES
(1,'aitor', 'aitor.tilla@ucm.es', 'aitor', 'pas' , 1 , '1234-abc' , 'aitor.png'),
(2,'felipe', 'felipe.lotas@ucm.es', 'felipe' , 'pas' , 1 , '5678-def' , 'felipe.png'),
(3,'steve', 'steve.curros@ucm.es', 'steve','oldS', 0 , NULL , 'steve.png'),
(4,'bill', 'bill.puertas@ucm.es', 'bill', 'pdi' , 0 , NULL , 'bill.png'),
(5,'alberto','albarto.lopez@ucm.es','alberto', 'alumno', 0, NULL, NULL),
(6, 'usuario', 'usuario@ucm.es', 'usuario', 'alumno', 0, NULL, NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `avisos`
--
ALTER TABLE `UCM_AW_CAU_AVI_Avisos`
  ADD PRIMARY KEY (`idAviso`),
  ADD UNIQUE KEY `texto` (`texto`);


--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `UCM_AW_CAU_USU_Usuarios`
  ADD PRIMARY KEY (`idUser`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--


--
-- AUTO_INCREMENT de la tabla `UCM_AW_CAU_AVI_Avisos`
--
ALTER TABLE `UCM_AW_CAU_AVI_Avisos`
  MODIFY `idAviso` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `UCM_AW_CAU_USU_Usuarios`
--
ALTER TABLE `UCM_AW_CAU_USU_Usuarios`
  MODIFY `idUser` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;


/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
