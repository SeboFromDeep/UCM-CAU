-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 12-12-2022 a las 16:56:26
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
('MHIT6z0MqklP6j2eIgN3NhpMJQki_aNr', 1670939548, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"currentUser\":\"aitor.tilla@ucm.es\"}'),
('Ry516szDWjsNM6QgqPdo0ew64N64RzR4', 1670946953, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"currentUser\":\"aitor.tilla@ucm.es\"}');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ucm_aw_cau_avi_avisos`
--

CREATE TABLE `ucm_aw_cau_avi_avisos` (
  `idAviso` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `tipo` varchar(15) NOT NULL,
  `grupo` varchar(30) NOT NULL,
  `subgrupo` varchar(50) DEFAULT NULL,
  `fecha` date NOT NULL DEFAULT current_timestamp(),
  `texto` varchar(1000) DEFAULT NULL,
  `tecnico` int(50) DEFAULT NULL,
  `comentarios` varchar(1000) DEFAULT NULL,
  `estado` varchar(10) NOT NULL DEFAULT 'ACTIVA'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `ucm_aw_cau_avi_avisos`
--

INSERT INTO `ucm_aw_cau_avi_avisos` (`idAviso`, `idUsuario`, `tipo`, `grupo`, `subgrupo`, `fecha`, `texto`, `tecnico`, `comentarios`, `estado`) VALUES
(1, 3, 'Sugerencia', 'Comunicaciones', 'Google Meet', '2022-12-01', 'Me he reunido con mi profesor en Google Meet pero no me han enviado el enlace para poder reunirme. Solicito el enlace ya que se trata de una reunión muy importante', 2, 'Acabamos de recibir la queja. Hemos arreglado el problema que imposibilitaba el envio de enlaces', 'ACTIVA'),
(2, 5, 'Sugerencia', 'Web', 'Portal de eventos', '2022-12-01', 'Me gustaria saber de que eventos se trata específicamente en el portal de la página web.', NULL, NULL, 'BORRADA'),
(3, 4, 'Sugerencia', 'Docencia', 'Blackboard Collaborate', '1900-01-01', 'Me gustaria que incorporaseis en la UCM una aplicación muy util llamado collaborate ', 1, 'hecho', 'BORRADA'),
(4, 7, 'Incidencia', 'Web', 'Redirecciones web', '2022-12-01', 'Cada vez que entro a mi cuenta, me ridirige a la página principal de la UCM', 1, NULL, 'ACTIVA'),
(5, 2, 'Felicitacion', 'Servicio de Cafeteria', NULL, '2022-12-01', 'Felicitaciones! ha ganado un premio con un cupon en la cafeteria', 2, NULL, 'ACTIVA'),
(7, 7, 'Sugerencia', 'Administración digital', 'Certificado electrónico de empleado público', '2022-12-01', 'necesito el certificado de Aitor Tilla para cumplir con mi trabajo', 1, 'No es necesario', 'BORRADA'),
(8, 6, 'Felicitacion', 'Toda la Universidad', NULL, '2022-12-31', 'Enhorabuena!! ha sido el estudiante con las mayores cualificaciones de toda la Universidad.', 2, NULL, 'ACTIVA'),
(9, 8, 'Incidencia', 'Comunicaciones', 'Correo electrónico', '2022-11-30', 'Me gustaria recibir mi los avisos en mi correo electrónico', NULL, NULL, 'ACTIVA'),
(10, 8, 'Felicitacion', 'Toda la Universidad', NULL, '2022-12-01', 'Hoy acabo el grado de ingenieria informática y me gustaria agradecer a todo el equipo de la UCM por su excelente trabajo', 1, 'Muchísimas gracias. Ha sido un honor tenerte como alumno', 'BORRADA'),
(11, 5, 'Sugerencia', 'Docencia', 'Listado de clase', '2022-11-23', 'Me gustaria recibir un listado de todos los alumnos que se han matriculado en el grado de ingenieria informática', 2, 'Usted no tiene el permiso para recibir la lista que ha solicitado', 'BORRADA'),
(13, 1, 'Felicitacion', 'Servicio de Administración', NULL, '2022-12-10', 'Felicidades por ser admitido en el servicio técnico', 2, NULL, 'BORRADA'),
(14, 8, 'Incidencia', 'Conectividad', 'Wifi Eduroam (ssid: eduroam)', '2022-12-10', 'El wifi se ha caido en toda la universidad', NULL, NULL, 'ACTIVA'),
(15, 8, 'Sugerencia', 'Comunicaciones', 'Cuenta de Alumno', '2022-12-10', 'Se me ha olvidado la contraseña de la cuenta de la universidad', NULL, NULL, 'ACTIVA'),
(16, 8, 'Sugerencia', 'Web', 'Portal de eventos', '2022-12-10', '¿Puede por favor decirme como funcionan los eventos? no he recibido las notificaciones esta semana.', 1, 'Los eventos como su nombre indica, son eventos especiales, no son recordatorios', 'TERMINADA'),
(17, 8, 'Incidencia', 'Administración digital', 'Certificado digital de persona física', '2022-12-12', 'No me acepta el certificado digital que he mandado anteriormente', 1, 'Tu certificado está caducado', 'TERMINADA');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ucm_aw_cau_cat_categorias`
--

CREATE TABLE `ucm_aw_cau_cat_categorias` (
  `categoria` varchar(21) NOT NULL,
  `grupo` varchar(30) NOT NULL,
  `subgrupo` varchar(55) NOT NULL,
  `perfil` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `ucm_aw_cau_cat_categorias`
--

INSERT INTO `ucm_aw_cau_cat_categorias` (`categoria`, `grupo`, `subgrupo`, `perfil`) VALUES
('Sugerencia/Incidencia', 'Web', 'Analítica Web', 'PAS'),
('Sugerencia/Incidencia', 'Web', 'Analítica Web', 'PDI'),
('Felicitacion', 'General', 'Archivo Universitario', 'Alumno'),
('Felicitacion', 'General', 'Archivo Universitario', 'Antiguo Alumno'),
('Felicitacion', 'General', 'Archivo Universitario', 'PAS'),
('Felicitacion', 'General', 'Archivo Universitario', 'PDI'),
('Felicitacion', 'General', 'Asesoría Jurídica', 'Alumno'),
('Felicitacion', 'General', 'Asesoría Jurídica', 'Antiguo Alumno'),
('Felicitacion', 'General', 'Asesoría Jurídica', 'PAS'),
('Felicitacion', 'General', 'Asesoría JurídicaAsesoría Jurídica', 'PDI'),
('Sugerencia/Incidencia', 'Docencia', 'Aula Virtual', 'Alumno'),
('Sugerencia/Incidencia', 'Docencia', 'Aula Virtual', 'PDI'),
('Felicitacion', 'General', 'Biblioteca', 'Alumno'),
('Felicitacion', 'General', 'Biblioteca', 'Antiguo Alumno'),
('Felicitacion', 'General', 'Biblioteca', 'PAS'),
('Felicitacion', 'General', 'Biblioteca', 'PDI'),
('Sugerencia/Incidencia', 'Docencia', 'Blackboard Collaborate', 'PAS'),
('Sugerencia/Incidencia', 'Docencia', 'Blackboard Collaborate', 'PDI'),
('Felicitacion', 'General', 'Centro de Información', 'Alumno'),
('Felicitacion', 'General', 'Centro de Información', 'Antiguo Alumno'),
('Felicitacion', 'General', 'Centro de Información', 'PAS'),
('Felicitacion', 'General', 'Centro de Información', 'PDI'),
('Sugerencia/Incidencia', 'Administración digital', 'Certificado digital de persona física', 'Alumno'),
('Sugerencia/Incidencia', 'Administración digital', 'Certificado digital de persona física', 'PAS'),
('Sugerencia/Incidencia', 'Administración digital', 'Certificado digital de persona física', 'PDI'),
('Sugerencia/Incidencia', 'Administración digital', 'Certificado electrónico de empleado público', 'PAS'),
('Sugerencia/Incidencia', 'Administración digital', 'Certificado electrónico de empleado público', 'PDI'),
('Sugerencia/Incidencia', 'Conectividad', 'Conexión por cable en despachos', 'PAS'),
('Sugerencia/Incidencia', 'Conectividad', 'Conexión por cable en despachos', 'PDI'),
('Sugerencia/Incidencia', 'Comunicaciones', 'Correo electrónico', 'Alumno'),
('Sugerencia/Incidencia', 'Comunicaciones', 'Correo electrónico', 'Antiguo Alumno'),
('Sugerencia/Incidencia', 'Comunicaciones', 'Correo electrónico', 'PAS'),
('Sugerencia/Incidencia', 'Comunicaciones', 'Correo electrónico', 'PDI'),
('Sugerencia/Incidencia', 'Conectividad', 'Cortafuegos corporativo', 'Alumno'),
('Sugerencia/Incidencia', 'Conectividad', 'Cortafuegos corporativo', 'PAS'),
('Sugerencia/Incidencia', 'Conectividad', 'Cortafuegos corporativo', 'PDI'),
('Sugerencia/Incidencia', 'Comunicaciones', 'Cuenta de Alumno', 'Alumno'),
('Sugerencia/Incidencia', 'Comunicaciones', 'Cuenta de Alumno', 'Antiguo Alumno'),
('Sugerencia/Incidencia', 'Conectividad', 'Cuenta de la Red SARA', 'PAS'),
('Sugerencia/Incidencia', 'Comunicaciones', 'Cuenta de personal', 'PAS'),
('Sugerencia/Incidencia', 'Comunicaciones', 'Cuenta de personal', 'PDI'),
('Sugerencia/Incidencia', 'Comunicaciones', 'Cuenta genérica', 'PAS'),
('Sugerencia/Incidencia', 'Comunicaciones', 'Cuenta genérica', 'PDI'),
('Felicitacion', 'General', 'Departamentos docentes', 'Alumno'),
('Felicitacion', 'General', 'Departamentos docentes', 'Antiguo Alumno'),
('Felicitacion', 'General', 'Departamentos docentes', 'PAS'),
('Felicitacion', 'General', 'Departamentos docentes', 'PDI'),
('Sugerencia/Incidencia', 'Web', 'Emisión de certificados SSL', 'PAS'),
('Sugerencia/Incidencia', 'Web', 'Emisión de certificados SSL', 'PDI'),
('Sugerencia/Incidencia', 'Comunicaciones', 'Google Meet', 'Alumno'),
('Sugerencia/Incidencia', 'Comunicaciones', 'Google Meet', 'Antiguo Alumno'),
('Sugerencia/Incidencia', 'Comunicaciones', 'Google Meet', 'PAS'),
('Sugerencia/Incidencia', 'Comunicaciones', 'Google Meet', 'PDI'),
('Sugerencia/Incidencia', 'Web', 'Hosting: alojamiento de páginas web', 'PAS'),
('Sugerencia/Incidencia', 'Web', 'Hosting: alojamiento de páginas web', 'PDI'),
('Felicitacion', 'General', 'Inspección de Servicios', 'Alumno'),
('Felicitacion', 'General', 'Inspección de Servicios', 'Antiguo Alumno'),
('Felicitacion', 'General', 'Inspección de Servicios', 'PAS'),
('Felicitacion', 'General', 'Inspección de Servicios', 'PDI'),
('Sugerencia/Incidencia', 'Docencia', 'Listados de clase', 'PAS'),
('Sugerencia/Incidencia', 'Docencia', 'Listados de clase', 'PDI'),
('Sugerencia/Incidencia', 'Docencia', 'Moodle: Aula Global', 'Alumno'),
('Sugerencia/Incidencia', 'Docencia', 'Moodle: Aula Global', 'PAS'),
('Sugerencia/Incidencia', 'Docencia', 'Moodle: Aula Global', 'PDI'),
('Felicitacion', 'General', 'Oficina de Gestión de Infraestructuras y Mantenimiento', 'Alumno'),
('Felicitacion', 'General', 'Oficina de Gestión de Infraestructuras y Mantenimiento', 'Antiguo Alumno'),
('Felicitacion', 'General', 'Oficina de Gestión de Infraestructuras y Mantenimiento', 'PAS'),
('Felicitacion', 'General', 'Oficina de Gestión de Infraestructuras y Mantenimiento', 'PDI'),
('Sugerencia/Incidencia', 'Docencia', 'Plataforma de cursos online Privados', 'Alumno'),
('Sugerencia/Incidencia', 'Docencia', 'Plataforma de cursos online Privados', 'PDI'),
('Sugerencia/Incidencia', 'Administración digital', 'Portafirmas', 'PAS'),
('Sugerencia/Incidencia', 'Administración digital', 'Portafirmas', 'PDI'),
('Sugerencia/Incidencia', 'Web', 'Portal de eventos', 'Alumno'),
('Sugerencia/Incidencia', 'Web', 'Portal de eventos', 'Antiguo Alumno'),
('Sugerencia/Incidencia', 'Web', 'Portal de eventos', 'PAS'),
('Sugerencia/Incidencia', 'Web', 'Portal de eventos', 'PDI'),
('Sugerencia/Incidencia', 'Web', 'Redirecciones web', 'PAS'),
('Sugerencia/Incidencia', 'Web', 'Redirecciones web', 'PDI'),
('Sugerencia/Incidencia', 'Administración digital', 'Registro electrónico', 'Alumno'),
('Sugerencia/Incidencia', 'Administración digital', 'Registro electrónico', 'Antiguo Alumno'),
('Sugerencia/Incidencia', 'Administración digital', 'Registro electrónico', 'PAS'),
('Sugerencia/Incidencia', 'Administración digital', 'Registro electrónico', 'PDI'),
('Sugerencia/Incidencia', 'Conectividad', 'Resolución de nombres de dominio (DNS)', 'PAS'),
('Sugerencia/Incidencia', 'Administración digital', 'Sede electrónica', 'Alumno'),
('Sugerencia/Incidencia', 'Administración digital', 'Sede electrónica', 'Antiguo Alumno'),
('Sugerencia/Incidencia', 'Administración digital', 'Sede electrónica', 'PAS'),
('Sugerencia/Incidencia', 'Administración digital', 'Sede electrónica', 'PDI'),
('Felicitacion', 'General', 'Servicio de Administración', 'Alumno'),
('Felicitacion', 'General', 'Servicio de Administración', 'Antiguo Alumno'),
('Felicitacion', 'General', 'Servicio de Administración', 'PAS'),
('Felicitacion', 'General', 'Servicio de Administración', 'PDI'),
('Felicitacion', 'General', 'Servicio de Cafetería', 'Alumno'),
('Felicitacion', 'General', 'Servicio de Cafetería', 'Antiguo Alumno'),
('Felicitacion', 'General', 'Servicio de Cafetería', 'PAS'),
('Felicitacion', 'General', 'Servicio de Cafetería', 'PDI'),
('Felicitacion', 'General', 'Servicio de Documentación', 'Alumno'),
('Felicitacion', 'General', 'Servicio de Documentación', 'Antiguo Alumno'),
('Felicitacion', 'General', 'Servicio de Documentación', 'PAS'),
('Felicitacion', 'General', 'Servicio de Documentación', 'PDI'),
('Felicitacion', 'General', 'Servicio de Imprenta', 'Alumno'),
('Felicitacion', 'General', 'Servicio de Imprenta', 'Antiguo Alumno'),
('Felicitacion', 'General', 'Servicio de Imprenta', 'PAS'),
('Felicitacion', 'General', 'Servicio de Imprenta', 'PDI'),
('Felicitacion', 'General', 'Servicios Informáticos', 'Alumno'),
('Felicitacion', 'General', 'Servicios Informáticos', 'Antiguo Alumno'),
('Felicitacion', 'General', 'Servicios Informáticos', 'PAS'),
('Felicitacion', 'General', 'Servicios Informáticos', 'PDI'),
('Felicitacion', 'General', 'Toda la Universidad', 'Alumno'),
('Felicitacion', 'General', 'Toda la Universidad', 'Antiguo Alumno'),
('Felicitacion', 'General', 'Toda la Universidad', 'PAS'),
('Felicitacion', 'General', 'Toda la Universidad', 'PDI'),
('Sugerencia/Incidencia', 'Conectividad', 'VPN Acceso remoto', 'Alumno'),
('Sugerencia/Incidencia', 'Conectividad', 'VPN Acceso remoto', 'PAS'),
('Sugerencia/Incidencia', 'Conectividad', 'VPN Acceso remoto', 'PDI'),
('Sugerencia/Incidencia', 'Conectividad', 'Wifi Eduroam (ssid: eduroam)', 'Alumno'),
('Sugerencia/Incidencia', 'Conectividad', 'Wifi Eduroam (ssid: eduroam)', 'PAS'),
('Sugerencia/Incidencia', 'Conectividad', 'Wifi Eduroam (ssid: eduroam)', 'PDI'),
('Sugerencia/Incidencia', 'Conectividad', 'Wifi Eduroam (ssid: UCM-Visitantes)', 'PAS'),
('Sugerencia/Incidencia', 'Conectividad', 'Wifi Eduroam (ssid: UCM-Visitantes)', 'PDI');

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
  `activo` tinyint(1) NOT NULL DEFAULT 1,
  `fecha_registro` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `ucm_aw_cau_usu_usuarios`
--

INSERT INTO `ucm_aw_cau_usu_usuarios` (`idUsuario`, `nombre`, `correo`, `contrasena`, `perfil`, `tecnico`, `nEmpleado`, `img`, `activo`, `fecha_registro`) VALUES
(1, 'aitor', 'aitor.tilla@ucm.es', 'aitor', 'PAS', 1, '1234-abc', 'aitor.png', 1, '2000-12-12'),
(2, 'felipe', 'felipe.lotas@ucm.es', 'felipe', 'PAS', 1, '5678-def', 'felipe.png', 1, '1999-9-12'),
(3, 'steve', 'steve.curros@ucm.es', 'steve', 'Antiguo Alumno', 0, NULL, 'steve.png', 1, '2019-12-12'),
(4, 'bill', 'bill.puertas@ucm.es', 'bill', 'PDI', 0, NULL, 'bill.png', 1, '2020-12-12'),
(5, 'alberto', 'albarto.lopez@ucm.es', 'alberto', 'Alumno', 0, NULL, NULL, 1, '2014-12-12'),
(6, 'Elena', 'Elena@ucm.es', 'usuario', 'Alumno', 0, NULL, NULL, 1, '2021-12-12'),
(7, 'Sebo', 'sebpinto@ucm.es', '123456aA*', 'PAS', 0, NULL, NULL, 1, '2022-3-6'),
(8, 'Carlo', 'carlo@ucm.es', '54321bB*', 'Alumno', 0, NULL, NULL, 1, '2022-12-12');


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
  ADD PRIMARY KEY (`idAviso`);

--
-- Indices de la tabla `ucm_aw_cau_cat_categorias`
--
ALTER TABLE `ucm_aw_cau_cat_categorias`
  ADD PRIMARY KEY (`subgrupo`,`perfil`) USING BTREE;

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
  MODIFY `idAviso` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de la tabla `ucm_aw_cau_usu_usuarios`
--
ALTER TABLE `ucm_aw_cau_usu_usuarios`
  MODIFY `idUsuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
