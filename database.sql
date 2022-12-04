-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 04-12-2022 a las 20:02:44
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

--
-- Volcado de datos para la tabla `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
('EYVTMECWgSUXJdTj8L0NAPHx4S66H-0S', 1670008562, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"currentUser\":\"alumno@ucm.es\"}'),
('mIefZXCP6dToCGJpa74wf0HW1t0LJNPi', 1670266947, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"currentUser\":\"alumno@ucm.es\"}');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ucm_aw_cau_avi_avisos`
--

CREATE TABLE `ucm_aw_cau_avi_avisos` (
  `idAviso` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `tipo` varchar(15) NOT NULL,
  `fecha` date NOT NULL,
  `texto` varchar(1000) NOT NULL,
  `tecnico` int(50) DEFAULT NULL,
  `comentarios` varchar(1000) DEFAULT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `ucm_aw_cau_avi_avisos`
--

INSERT INTO `ucm_aw_cau_avi_avisos` (`idAviso`, `idUsuario`, `tipo`, `fecha`, `texto`, `tecnico`, `comentarios`, `activo`) VALUES
(1, 3, 'Sugerencia', '0000-00-00', 'Preparar prácticas AW', 2, 'Aun te falta hacer la BD bobo', 1),
(2, 5, 'Sugerencia', '0000-00-00', 'Mirar fechas de congreso', NULL, NULL, 1),
(3, 4, 'Sugerencia', '0000-00-00', 'Ir al Supermercado', NULL, NULL, 1),
(4, 1, 'Incidencia', '0000-00-00', 'Jugar al Fútbol', 1, 'Empieza a calentar que sales', 1),
(5, 2, 'Felicitacion', '0000-00-00', 'Hablar con el profesor', 2, NULL, 1),
(7, 1, 'Sugerencia', '0000-00-00', 'Entregar Practica Vountaria 4', 1, 'no lo has entregado parguela', 1),
(8, 6, 'Felicitacion', '0000-00-00', 'Jugar ligoleyen', NULL, NULL, 1),
(9, 8, 'Incidencia', '2022-11-30', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, quaerat aperiam non officia tempore aspernatur tempora dicta minima illum quisquam iure recusandae rerum molestiae sunt totam impedit ad possimus quia ipsum ut voluptate a! Vitae, ipsa? Rerum sint natus porro fuga! Itaque voluptatibus numquam doloribus consequuntur voluptatem dolore voluptates earum!', NULL, NULL, 1),
(10, 8, 'Felicitacion', '2022-12-01', 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sapiente, deleniti.', 1, NULL, 1),
(11, 8, 'Sugerencia', '2022-11-23', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit esse quia quibusdam itaque quo iure. Nostrum qui temporibus asperiores, iste quo nulla recusandae eius quidem quaerat ducimus delectus, quas inventore consequatur voluptatem voluptas laudantium ab suscipit, tempora sit sequi cum pariatur quam eum atque! Dolore voluptatum temporibus itaque accusantium maxime accusamus sint ut? Perferendis vel quia ullam, sapiente aliquid earum dolore nemo, impedit ex vitae, ad modi culpa facere?\r\n', 2, NULL, 1);

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
('Felicitacion', '', 'Archivo Universitario', 'Alumno'),
('Felicitacion', '', 'Archivo Universitario', 'Antiguo Alumno'),
('Felicitacion', '', 'Archivo Universitario', 'PAS'),
('Felicitacion', '', 'Archivo Universitario', 'PDI'),
('Felicitacion', '', 'Asesoría Jurídica', 'Alumno'),
('Felicitacion', '', 'Asesoría Jurídica', 'Antiguo Alumno'),
('Felicitacion', '', 'Asesoría Jurídica', 'PAS'),
('Felicitacion', '', 'Asesoría JurídicaAsesoría Jurídica', 'PDI'),
('Sugerencia/Incidenci', 'Docencia', 'Aula Virtual', 'Alumno'),
('Sugerencia/Incidenci', 'Docencia', 'Aula Virtual', 'PDI'),
('Felicitacion', '', 'Biblioteca', 'Alumno'),
('Felicitacion', '', 'Biblioteca', 'Antiguo Alumno'),
('Felicitacion', '', 'Biblioteca', 'PAS'),
('Felicitacion', '', 'Biblioteca', 'PDI'),
('Sugerencia/Incidenci', 'Docencia', 'Blackboard Collaborate', 'PAS'),
('Sugerencia/Incidenci', 'Docencia', 'Blackboard Collaborate', 'PDI'),
('Felicitacion', '', 'Centro de Información', 'Alumno'),
('Felicitacion', '', 'Centro de Información', 'Antiguo Alumno'),
('Felicitacion', '', 'Centro de Información', 'PAS'),
('Felicitacion', '', 'Centro de Información', 'PDI'),
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
('Felicitacion', '', 'Departamentos docentes', 'Alumno'),
('Felicitacion', '', 'Departamentos docentes', 'Antiguo Alumno'),
('Felicitacion', '', 'Departamentos docentes', 'PAS'),
('Felicitacion', '', 'Departamentos docentes', 'PDI'),
('Sugerencia/Incidenci', 'Web', 'Emisión de certificados SSL', 'PAS'),
('Sugerencia/Incidenci', 'Web', 'Emisión de certificados SSL', 'PDI'),
('Sugerencia/Incidenci', 'Comunicaciones', 'Google Meet', 'Alumno'),
('Sugerencia/Incidenci', 'Comunicaciones', 'Google Meet', 'Antiguo Alumno'),
('Sugerencia/Incidenci', 'Comunicaciones', 'Google Meet', 'PAS'),
('Sugerencia/Incidenci', 'Comunicaciones', 'Google Meet', 'PDI'),
('Sugerencia/Incidenci', 'Web', 'Hosting: alojamiento de páginas web', 'PAS'),
('Sugerencia/Incidenci', 'Web', 'Hosting: alojamiento de páginas web', 'PDI'),
('Felicitacion', '', 'Inspección de Servicios', 'Alumno'),
('Felicitacion', '', 'Inspección de Servicios', 'Antiguo Alumno'),
('Felicitacion', '', 'Inspección de Servicios', 'PAS'),
('Felicitacion', '', 'Inspección de Servicios', 'PDI'),
('Sugerencia/Incidenci', 'Docencia', 'Listados de clase', 'PAS'),
('Sugerencia/Incidenci', 'Docencia', 'Listados de clase', 'PDI'),
('Sugerencia/Incidenci', 'Docencia', 'Moodle: Aula Global', 'Alumno'),
('Sugerencia/Incidenci', 'Docencia', 'Moodle: Aula Global', 'PAS'),
('Sugerencia/Incidenci', 'Docencia', 'Moodle: Aula Global', 'PDI'),
('Felicitacion', '', 'Oficina de Gestión de Infraestructuras y Mantenimi', 'Alumno'),
('Felicitacion', '', 'Oficina de Gestión de Infraestructuras y Mantenimi', 'Antiguo Alumno'),
('Felicitacion', '', 'Oficina de Gestión de Infraestructuras y Mantenimi', 'PAS'),
('Felicitacion', '', 'Oficina de Gestión de Infraestructuras y Mantenimi', 'PDI'),
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
('Felicitacion', '', 'Servicio de Administración', 'Alumno'),
('Felicitacion', '', 'Servicio de Administración', 'Antiguo Alumno'),
('Felicitacion', '', 'Servicio de Administración', 'PAS'),
('Felicitacion', '', 'Servicio de Administración', 'PDI'),
('Felicitacion', '', 'Servicio de Cafetería', 'Alumno'),
('Felicitacion', '', 'Servicio de Cafetería', 'Antiguo Alumno'),
('Felicitacion', '', 'Servicio de Cafetería', 'PAS'),
('Felicitacion', '', 'Servicio de Cafetería', 'PDI'),
('Felicitacion', '', 'Servicio de Documentación', 'Alumno'),
('Felicitacion', '', 'Servicio de Documentación', 'Antiguo Alumno'),
('Felicitacion', '', 'Servicio de Documentación', 'PAS'),
('Felicitacion', '', 'Servicio de Documentación', 'PDI'),
('Felicitacion', '', 'Servicio de Imprenta', 'Alumno'),
('Felicitacion', '', 'Servicio de Imprenta', 'Antiguo Alumno'),
('Felicitacion', '', 'Servicio de Imprenta', 'PAS'),
('Felicitacion', '', 'Servicio de Imprenta', 'PDI'),
('Felicitacion', '', 'Servicios Informáticos', 'Alumno'),
('Felicitacion', '', 'Servicios Informáticos', 'Antiguo Alumno'),
('Felicitacion', '', 'Servicios Informáticos', 'PAS'),
('Felicitacion', '', 'Servicios Informáticos', 'PDI'),
('Felicitacion', '', 'Toda la Universidad', 'Alumno'),
('Felicitacion', '', 'Toda la Universidad', 'Antiguo Alumno'),
('Felicitacion', '', 'Toda la Universidad', 'PAS'),
('Felicitacion', '', 'Toda la Universidad', 'PDI'),
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
  `idUsuario` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `correo` varchar(50) NOT NULL,
  `contrasena` varchar(45) NOT NULL,
  `perfil` varchar(45) NOT NULL,
  `tecnico` int(1) NOT NULL,
  `nEmpleado` varchar(8) DEFAULT NULL,
  `img` varchar(45) DEFAULT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `ucm_aw_cau_usu_usuarios`
--

INSERT INTO `ucm_aw_cau_usu_usuarios` (`idUsuario`, `nombre`, `correo`, `contrasena`, `perfil`, `tecnico`, `nEmpleado`, `img`, `activo`) VALUES
(1, 'aitor', 'aitor.tilla@ucm.es', 'aitor', 'PAS', 1, '1234-abc', 'aitor.png', 1),
(2, 'felipe', 'felipe.lotas@ucm.es', 'felipe', 'PAS', 1, '5678-def', 'felipe.png', 1),
(3, 'steve', 'steve.curros@ucm.es', 'steve', 'Antiguo Alumno', 0, NULL, 'steve.png', 1),
(4, 'bill', 'bill.puertas@ucm.es', 'bill', 'PDI', 0, NULL, 'bill.png', 1),
(5, 'alberto', 'albarto.lopez@ucm.es', 'alberto', 'Alumno', 0, NULL, NULL, 1),
(6, 'usuario', 'usuario@ucm.es', 'usuario', 'Alumno', 0, NULL, NULL, 1),
(7, 'Sebo', 'sebpinto@ucm.es', '123456aA*', 'PAS', 0, NULL, NULL, 1),
(8, 'alumno', 'alumno@ucm.es', '', 'Alumno', 0, NULL, NULL, 1);

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
  ADD PRIMARY KEY (`idUsuario`),
  ADD UNIQUE KEY `email` (`correo`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `ucm_aw_cau_avi_avisos`
--
ALTER TABLE `ucm_aw_cau_avi_avisos`
  MODIFY `idAviso` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `ucm_aw_cau_usu_usuarios`
--
ALTER TABLE `ucm_aw_cau_usu_usuarios`
  MODIFY `idUsuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
