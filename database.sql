-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 28-11-2022 a las 18:06:49
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
-- Base de datos: `practica_obligatoria`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ucm_aw_cau_avi_avisos`
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
-- Volcado de datos para la tabla `ucm_aw_cau_avi_avisos`
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
-- Estructura de tabla para la tabla `ucm_aw_cau_cat_categorias`
--

CREATE TABLE `ucm_aw_cau_cat_categorias` (
  `CATEGORIA` varchar(20) NOT NULL,
  `GRUPO` varchar(30) NOT NULL,
  `SUBGRUPO` varchar(50) NOT NULL,
  `PERFIL` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `ucm_aw_cau_cat_categorias`
--

INSERT INTO `ucm_aw_cau_cat_categorias` (`CATEGORIA`, `GRUPO`, `SUBGRUPO`, `PERFIL`) VALUES
('Sugerencia/Incidenci', 'Web', 'Analítica Web', 'PAS'),
('Sugerencia/Incidenci', 'Web', 'Analítica Web', 'PDI'),
('Felicitaciones', '', 'Archivo Universitario', 'Alumno'),
('Felicitaciones', '', 'Archivo Universitario', 'Antiguo Alumno'),
('Felicitaciones', '', 'Archivo Universitario', 'PAS'),
('Felicitaciones', '', 'Archivo Universitario', 'PDI'),
('Felicitaciones', '', 'Asesoría Jurídica', 'Alumno'),
('Felicitaciones', '', 'Asesoría Jurídica', 'Antiguo Alumno'),
('Felicitaciones', '', 'Asesoría Jurídica', 'PAS'),
('Felicitaciones', '', 'Asesoría JurídicaAsesoría Jurídica', 'PDI'),
('Sugerencia/Incidenci', 'Docencia', 'Aula Virtual', 'Alumno'),
('Sugerencia/Incidenci', 'Docencia', 'Aula Virtual', 'PDI'),
('Felicitaciones', '', 'Biblioteca', 'Alumno'),
('Felicitaciones', '', 'Biblioteca', 'Antiguo Alumno'),
('Felicitaciones', '', 'Biblioteca', 'PAS'),
('Felicitaciones', '', 'Biblioteca', 'PDI'),
('Sugerencia/Incidenci', 'Docencia', 'Blackboard Collaborate', 'PAS'),
('Sugerencia/Incidenci', 'Docencia', 'Blackboard Collaborate', 'PDI'),
('Felicitaciones', '', 'Centro de Información', 'Alumno'),
('Felicitaciones', '', 'Centro de Información', 'Antiguo Alumno'),
('Felicitaciones', '', 'Centro de Información', 'PAS'),
('Felicitaciones', '', 'Centro de Información', 'PDI'),
('Sugerencia/Incidenci', 'Administración digital', 'Certificado digital de persona física', 'Alumno'),
('Sugerencia/Incidenci', 'Administración digital', 'Certificado digital de persona física', 'PAS'),
('Sugerencia/Incidenci', 'Administración digital', 'Certificado digital de persona física', 'PDI'),
('Sugerencia/Incidenci', 'Administración digital', 'Certificado electrónico de empleado público', 'PAS'),
('Sugerencia/Incidenci', 'Administración digital', 'Certificado electrónico de empleado público', 'PDI'),
('Sugerencia/Incidenci', 'Conectividad', 'Conexión por cable en despachos', 'PAS'),
('Sugerencia/Incidenci', 'Conectividad', 'Conexión por cable en despachos', 'PDI'),
('Sugerencia/Incidenci', 'Comunicaciones', 'Correo electrónico', 'Alumno'),
('Sugerencia/Incidenci', 'Comunicaciones', 'Correo electrónico', 'Antiguo Alumno'),
('Sugerencia/Incidenci', 'Comunicaciones', 'Correo electrónico', 'PAS'),
('Sugerencia/Incidenci', 'Comunicaciones', 'Correo electrónico', 'PDI'),
('Sugerencia/Incidenci', 'Conectividad', 'Cortafuegos corporativo', 'Alumno'),
('Sugerencia/Incidenci', 'Conectividad', 'Cortafuegos corporativo', 'PAS'),
('Sugerencia/Incidenci', 'Conectividad', 'Cortafuegos corporativo', 'PDI'),
('Sugerencia/Incidenci', 'Comunicaciones', 'Cuenta de Alumno', 'Alumno'),
('Sugerencia/Incidenci', 'Comunicaciones', 'Cuenta de Alumno', 'Antiguo Alumno'),
('Sugerencia/Incidenci', 'Conectividad', 'Cuenta de la Red SARA', 'PAS'),
('Sugerencia/Incidenci', 'Comunicaciones', 'Cuenta de personal', 'PAS'),
('Sugerencia/Incidenci', 'Comunicaciones', 'Cuenta de personal', 'PDI'),
('Sugerencia/Incidenci', 'Comunicaciones', 'Cuenta genérica', 'PAS'),
('Sugerencia/Incidenci', 'Comunicaciones', 'Cuenta genérica', 'PDI'),
('Felicitaciones', '', 'Departamentos docentes', 'Alumno'),
('Felicitaciones', '', 'Departamentos docentes', 'Antiguo Alumno'),
('Felicitaciones', '', 'Departamentos docentes', 'PAS'),
('Felicitaciones', '', 'Departamentos docentes', 'PDI'),
('Sugerencia/Incidenci', 'Web', 'Emisión de certificados SSL', 'PAS'),
('Sugerencia/Incidenci', 'Web', 'Emisión de certificados SSL', 'PDI'),
('Sugerencia/Incidenci', 'Comunicaciones', 'Google Meet', 'Alumno'),
('Sugerencia/Incidenci', 'Comunicaciones', 'Google Meet', 'Antiguo Alumno'),
('Sugerencia/Incidenci', 'Comunicaciones', 'Google Meet', 'PAS'),
('Sugerencia/Incidenci', 'Comunicaciones', 'Google Meet', 'PDI'),
('Sugerencia/Incidenci', 'Web', 'Hosting: alojamiento de páginas web', 'PAS'),
('Sugerencia/Incidenci', 'Web', 'Hosting: alojamiento de páginas web', 'PDI'),
('Felicitaciones', '', 'Inspección de Servicios', 'Alumno'),
('Felicitaciones', '', 'Inspección de Servicios', 'Antiguo Alumno'),
('Felicitaciones', '', 'Inspección de Servicios', 'PAS'),
('Felicitaciones', '', 'Inspección de Servicios', 'PDI'),
('Sugerencia/Incidenci', 'Docencia', 'Listados de clase', 'PAS'),
('Sugerencia/Incidenci', 'Docencia', 'Listados de clase', 'PDI'),
('Sugerencia/Incidenci', 'Docencia', 'Moodle: Aula Global', 'Alumno'),
('Sugerencia/Incidenci', 'Docencia', 'Moodle: Aula Global', 'PAS'),
('Sugerencia/Incidenci', 'Docencia', 'Moodle: Aula Global', 'PDI'),
('Felicitaciones', '', 'Oficina de Gestión de Infraestructuras y Mantenimi', 'Alumno'),
('Felicitaciones', '', 'Oficina de Gestión de Infraestructuras y Mantenimi', 'Antiguo Alumno'),
('Felicitaciones', '', 'Oficina de Gestión de Infraestructuras y Mantenimi', 'PAS'),
('Felicitaciones', '', 'Oficina de Gestión de Infraestructuras y Mantenimi', 'PDI'),
('Sugerencia/Incidenci', 'Docencia', 'Plataforma de cursos online Privados', 'Alumno'),
('Sugerencia/Incidenci', 'Docencia', 'Plataforma de cursos online Privados', 'PDI'),
('Sugerencia/Incidenci', 'Administración digital', 'Portafirmas', 'PAS'),
('Sugerencia/Incidenci', 'Administración digital', 'Portafirmas', 'PDI'),
('Sugerencia/Incidenci', 'Web', 'Portal de eventos', 'Alumno'),
('Sugerencia/Incidenci', 'Web', 'Portal de eventos', 'Antiguo Alumno'),
('Sugerencia/Incidenci', 'Web', 'Portal de eventos', 'PAS'),
('Sugerencia/Incidenci', 'Web', 'Portal de eventos', 'PDI'),
('Sugerencia/Incidenci', 'Web', 'Redirecciones web', 'PAS'),
('Sugerencia/Incidenci', 'Web', 'Redirecciones web', 'PDI'),
('Sugerencia/Incidenci', 'Administración digital', 'Registro electrónico', 'Alumno'),
('Sugerencia/Incidenci', 'Administración digital', 'Registro electrónico', 'Antiguo Alumno'),
('Sugerencia/Incidenci', 'Administración digital', 'Registro electrónico', 'PAS'),
('Sugerencia/Incidenci', 'Administración digital', 'Registro electrónico', 'PDI'),
('Sugerencia/Incidenci', 'Conectividad', 'Resolución de nombres de dominio (DNS)', 'PAS'),
('Sugerencia/Incidenci', 'Administración digital', 'Sede electrónica', 'Alumno'),
('Sugerencia/Incidenci', 'Administración digital', 'Sede electrónica', 'Antiguo Alumno'),
('Sugerencia/Incidenci', 'Administración digital', 'Sede electrónica', 'PAS'),
('Sugerencia/Incidenci', 'Administración digital', 'Sede electrónica', 'PDI'),
('Felicitaciones', '', 'Servicio de Administración', 'Alumno'),
('Felicitaciones', '', 'Servicio de Administración', 'Antiguo Alumno'),
('Felicitaciones', '', 'Servicio de Administración', 'PAS'),
('Felicitaciones', '', 'Servicio de Administración', 'PDI'),
('Felicitaciones', '', 'Servicio de Cafetería', 'Alumno'),
('Felicitaciones', '', 'Servicio de Cafetería', 'Antiguo Alumno'),
('Felicitaciones', '', 'Servicio de Cafetería', 'PAS'),
('Felicitaciones', '', 'Servicio de Cafetería', 'PDI'),
('Felicitaciones', '', 'Servicio de Documentación', 'Alumno'),
('Felicitaciones', '', 'Servicio de Documentación', 'Antiguo Alumno'),
('Felicitaciones', '', 'Servicio de Documentación', 'PAS'),
('Felicitaciones', '', 'Servicio de Documentación', 'PDI'),
('Felicitaciones', '', 'Servicio de Imprenta', 'Alumno'),
('Felicitaciones', '', 'Servicio de Imprenta', 'Antiguo Alumno'),
('Felicitaciones', '', 'Servicio de Imprenta', 'PAS'),
('Felicitaciones', '', 'Servicio de Imprenta', 'PDI'),
('Felicitaciones', '', 'Servicios Informáticos', 'Alumno'),
('Felicitaciones', '', 'Servicios Informáticos', 'Antiguo Alumno'),
('Felicitaciones', '', 'Servicios Informáticos', 'PAS'),
('Felicitaciones', '', 'Servicios Informáticos', 'PDI'),
('Felicitaciones', '', 'Toda la Universidad', 'Alumno'),
('Felicitaciones', '', 'Toda la Universidad', 'Antiguo Alumno'),
('Felicitaciones', '', 'Toda la Universidad', 'PAS'),
('Felicitaciones', '', 'Toda la Universidad', 'PDI'),
('Sugerencia/Incidenci', 'Conectividad', 'VPN Acceso remoto', 'Alumno'),
('Sugerencia/Incidenci', 'Conectividad', 'VPN Acceso remoto', 'PAS'),
('Sugerencia/Incidenci', 'Conectividad', 'VPN Acceso remoto', 'PDI'),
('Sugerencia/Incidenci', 'Conectividad', 'Wifi Eduroam (ssid: eduroam)', 'Alumno'),
('Sugerencia/Incidenci', 'Conectividad', 'Wifi Eduroam (ssid: eduroam)', 'PAS'),
('Sugerencia/Incidenci', 'Conectividad', 'Wifi Eduroam (ssid: eduroam)', 'PDI'),
('Sugerencia/Incidenci', 'Conectividad', 'Wifi Eduroam (ssid: UCM-Visitantes)', 'PAS'),
('Sugerencia/Incidenci', 'Conectividad', 'Wifi Eduroam (ssid: UCM-Visitantes)', 'PDI');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ucm_aw_cau_usu_usuarios`
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
-- Volcado de datos para la tabla `ucm_aw_cau_usu_usuarios`
--

INSERT INTO `ucm_aw_cau_usu_usuarios` (`idUser`, `nombre`, `email`, `password`, `perfil`, `tecnico`, `nEmpleado`, `img`) VALUES
(1, 'aitor', 'aitor.tilla@ucm.es', 'aitor', 'pas', 1, '1234-abc', 'aitor.png'),
(2, 'felipe', 'felipe.lotas@ucm.es', 'felipe', 'pas', 1, '5678-def', 'felipe.png'),
(3, 'steve', 'steve.curros@ucm.es', 'steve', 'oldS', 0, NULL, 'steve.png'),
(4, 'bill', 'bill.puertas@ucm.es', 'bill', 'pdi', 0, NULL, 'bill.png'),
(5, 'alberto', 'albarto.lopez@ucm.es', 'alberto', 'alumno', 0, NULL, NULL),
(6, 'usuario', 'usuario@ucm.es', 'usuario', 'alumno', 0, NULL, NULL),
(7, 'Sebo', 'sebpinto@ucm.es', '123456aA*', 'PAS', 0, NULL, 'steve.png');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- Indices de la tabla `ucm_aw_cau_avi_avisos`
--
ALTER TABLE `ucm_aw_cau_avi_avisos`
  ADD PRIMARY KEY (`idAviso`),
  ADD UNIQUE KEY `texto` (`texto`) USING HASH;

--
-- Indices de la tabla `ucm_aw_cau_cat_categorias`
--
ALTER TABLE `ucm_aw_cau_cat_categorias`
  ADD PRIMARY KEY (`SUBGRUPO`,`PERFIL`) USING BTREE;

--
-- Indices de la tabla `ucm_aw_cau_usu_usuarios`
--
ALTER TABLE `ucm_aw_cau_usu_usuarios`
  ADD PRIMARY KEY (`idUser`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `ucm_aw_cau_avi_avisos`
--
ALTER TABLE `ucm_aw_cau_avi_avisos`
  MODIFY `idAviso` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `ucm_aw_cau_usu_usuarios`
--
ALTER TABLE `ucm_aw_cau_usu_usuarios`
  MODIFY `idUser` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
