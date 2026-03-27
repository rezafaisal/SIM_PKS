-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Apr 25, 2024 at 02:02 PM
-- Server version: 8.0.30
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kerjasama`
--

-- --------------------------------------------------------

--
-- Table structure for table `access_pages`
--

CREATE TABLE `access_pages` (
  `id` int NOT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `access_pages`
--

INSERT INTO `access_pages` (`id`, `name`) VALUES
(1, 'dashboard'),
(2, 'kerjasama'),
(4, 'user'),
(5, 'role'),
(6, 'fakultas'),
(7, 'prodi'),
(8, 'dekan'),
(9, 'penghubung'),
(10, 'jenis');

-- --------------------------------------------------------

--
-- Table structure for table `access_page_role`
--

CREATE TABLE `access_page_role` (
  `role_id` int DEFAULT NULL,
  `access_page_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `access_page_role`
--

INSERT INTO `access_page_role` (`role_id`, `access_page_id`) VALUES
(2, 1),
(12, 1),
(12, 2),
(19, 1),
(19, 2),
(21, 1),
(21, 2),
(11, 1),
(11, 2),
(1, 1),
(1, 2),
(1, 4),
(1, 5),
(1, 6),
(1, 7),
(1, 8),
(1, 9),
(1, 10);

-- --------------------------------------------------------

--
-- Table structure for table `contact`
--

CREATE TABLE `contact` (
  `id` int NOT NULL,
  `id_faculty` int NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `position` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `handphone_no` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `status` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `contact`
--

INSERT INTO `contact` (`id`, `id_faculty`, `name`, `position`, `address`, `handphone_no`, `email`, `status`) VALUES
(5, 2, 'wesker wew', 'Wakil Dekan 3', 'Persada Permai', '087830397106', 'diakendiaken@gmail.com', 1),
(7, 2, 'diaken', 'Wakil Dekan 3', 'Persada Permai', '087830397106', 'diakendiaken@gmail.com', 0),
(9, 1, 'Rizky Wesker', 'Boss', 'pembatangan', '41567232', 'diakendiaken@gmail.com', 1);

-- --------------------------------------------------------

--
-- Table structure for table `cooperations`
--

CREATE TABLE `cooperations` (
  `id` int NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `scope` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `letter_no` varchar(255) DEFAULT NULL,
  `expired_date` date DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `cooperations`
--

INSERT INTO `cooperations` (`id`, `title`, `scope`, `letter_no`, `expired_date`, `created_at`, `updated_at`) VALUES
(3, 'Festival Wow', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'fwfjn, fnvna', '2024-05-21', '2024-03-31 02:43:08', '2024-03-31 02:43:08'),
(4, 'Perpindahan Pelajara Antar ULM dan GJMS', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'WWWER12, EEEEWR32', '2024-06-27', '2024-04-01 22:44:41', '2024-04-01 22:44:41'),
(5, 'wesre', 'Fvwvawggwfwa', 'WWWER12, fFWFWF', '2024-04-24', '2024-04-21 23:05:42', '2024-04-21 23:05:42');

-- --------------------------------------------------------

--
-- Table structure for table `cooperation_contact`
--

CREATE TABLE `cooperation_contact` (
  `cooperation_id` int DEFAULT NULL,
  `contact_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `cooperation_contact`
--

INSERT INTO `cooperation_contact` (`cooperation_id`, `contact_id`) VALUES
(4, 9),
(5, 5),
(3, 5);

-- --------------------------------------------------------

--
-- Table structure for table `cooperation_dean`
--

CREATE TABLE `cooperation_dean` (
  `cooperation_id` int DEFAULT NULL,
  `dean_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `cooperation_dean`
--

INSERT INTO `cooperation_dean` (`cooperation_id`, `dean_id`) VALUES
(4, 6),
(5, 7),
(3, 3);

-- --------------------------------------------------------

--
-- Table structure for table `cooperation_faculty`
--

CREATE TABLE `cooperation_faculty` (
  `faculty_id` int DEFAULT NULL,
  `cooperation_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `cooperation_faculty`
--

INSERT INTO `cooperation_faculty` (`faculty_id`, `cooperation_id`) VALUES
(1, 4),
(2, 5),
(1, 3);

-- --------------------------------------------------------

--
-- Table structure for table `cooperation_prodi`
--

CREATE TABLE `cooperation_prodi` (
  `cooperation_id` int NOT NULL,
  `prodi_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `cooperation_prodi`
--

INSERT INTO `cooperation_prodi` (`cooperation_id`, `prodi_id`) VALUES
(4, 8),
(4, 9),
(5, 11),
(5, 12),
(3, 8),
(3, 9);

-- --------------------------------------------------------

--
-- Table structure for table `deans`
--

CREATE TABLE `deans` (
  `id` int NOT NULL,
  `id_faculty` int NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `position` varchar(255) DEFAULT NULL,
  `period` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `status` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `deans`
--

INSERT INTO `deans` (`id`, `id_faculty`, `name`, `position`, `period`, `status`) VALUES
(3, 2, 'Diaken Ramadhani', 'wakil dekan OOO', 'Thu Jan 01 2026 00:00:00 GMT+0800 (Central Indonesia Time), Thu Jan 01 2026 00:00:00 GMT+0800 (Central Indonesia Time)', 0),
(6, 1, 'Muhamad Reza Syahputra', 'Wakil Dekan III', '2019-12-31T16:00:00.000Z, 2023-12-31T16:00:00.000Z', 1),
(7, 2, 'Iman', 'Sekretaris', '2009-12-31T16:00:00.000Z, 2014-12-31T16:00:00.000Z', 1),
(8, 2, 'Santoso', 'Wakil Dekan III', '2015-12-31T16:00:00.000Z, 2019-12-31T16:00:00.000Z', 0),
(9, 3, 'Siapa', 'dimana', '2027-12-31T16:00:00.000Z, 2029-12-31T16:00:00.000Z', 0),
(12, 1, 'test', 'tset', '2025-12-31T16:00:00.000Z, 2026-12-31T16:00:00.000Z', 0);

-- --------------------------------------------------------

--
-- Table structure for table `documentation`
--

CREATE TABLE `documentation` (
  `id` int NOT NULL,
  `id_cooperation` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `attachment` varchar(255) DEFAULT NULL,
  `attachment_file` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `documentation`
--

INSERT INTO `documentation` (`id`, `id_cooperation`, `name`, `attachment`, `attachment_file`) VALUES
(2, 3, 'diaken', 'lomba', '1711865657_d361a7ecb19f288a13b5.pdf'),
(4, 3, 'adit', 'proposal', '1711865859_f8bbffaf6846e2aecf87.pdf'),
(6, 3, 'Ini Google', 'www.google.com', NULL),
(7, 3, 'File Pemenang', 'File', '1712001581_6018bd9120a034fce38c.pdf'),
(8, 3, 'Ini Google', 'www.google.com', NULL),
(9, 3, 'Youtube', 'https://www.youtube.com/watch?v=KewvgapdEEI', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `facultys`
--

CREATE TABLE `facultys` (
  `id` int NOT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `facultys`
--

INSERT INTO `facultys` (`id`, `name`) VALUES
(1, 'FMIPA'),
(2, 'FIPS'),
(3, 'Pertanian');

-- --------------------------------------------------------

--
-- Table structure for table `implementation`
--

CREATE TABLE `implementation` (
  `id` int NOT NULL,
  `id_cooperation` int NOT NULL,
  `id_type` int NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `file_image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `implementation`
--

INSERT INTO `implementation` (`id`, `id_cooperation`, `id_type`, `name`, `title`, `file_image`) VALUES
(2, 3, 1, 'diaken', 'lomba', '1711831473_ed27b34492e28de690c4.png'),
(4, 3, 1, 'Rizky', 'Gambaran galaksi', '1711906587_866602031fa851ec888e.jpg'),
(7, 3, 1, 'tes', 'tes', '1711998593_a73744da78c8c8619a9c.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `partners`
--

CREATE TABLE `partners` (
  `id` int NOT NULL,
  `id_cooperation` int NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `signatory_name` varchar(255) DEFAULT NULL,
  `signatory_position` varchar(255) DEFAULT NULL,
  `contact_name` varchar(255) DEFAULT NULL,
  `contact_position` varchar(255) DEFAULT NULL,
  `contact_handphone_no` varchar(255) DEFAULT NULL,
  `contact_address` varchar(255) DEFAULT NULL,
  `contact_email` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `partners`
--

INSERT INTO `partners` (`id`, `id_cooperation`, `name`, `signatory_name`, `signatory_position`, `contact_name`, `contact_position`, `contact_handphone_no`, `contact_address`, `contact_email`) VALUES
(2, 3, 'Yamaha', 'Rizky Ramadhani', 'dekan', 'diaken', 'wakil dekan UUU', '087830397106', 'Persada Permai', 'diakendiaekn@gmail.com'),
(3, 4, 'Unviversitas Gajah Mada', 'Adit', 'Wakil Dekan II', 'Rizky', 'Sekretaris', '08783397106', 'Persada Tabunganen Tengah', 'rizky44@gmail.com'),
(4, 5, 'Unviversitas Gajah Mada', 'Adit', 'Wakil Dekan II', 'Rizky', 'Sekretaris', '08783397106', 'Persada Tabunganen Tengah', 'rizky44@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `prodi`
--

CREATE TABLE `prodi` (
  `id` int NOT NULL,
  `id_faculty` int NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `prodi`
--

INSERT INTO `prodi` (`id`, `id_faculty`, `name`) VALUES
(8, 1, 'Ilmu Komputer'),
(9, 1, 'Matematika'),
(10, 1, 'Fisika'),
(11, 2, 'Guru'),
(12, 2, 'Hukum'),
(13, 3, 'Lautan'),
(14, 3, 'Lahan Basah');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int NOT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`) VALUES
(1, 'admin'),
(2, 'user'),
(11, 'penggati dirinya'),
(12, 'pelangi'),
(19, 'wfwafw'),
(21, 'gbbb');

-- --------------------------------------------------------

--
-- Table structure for table `type`
--

CREATE TABLE `type` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `type`
--

INSERT INTO `type` (`id`, `name`) VALUES
(1, 'Penelitian'),
(2, 'test coba');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`) VALUES
(0, 'arkz', 'masuk123'),
(1, 'rekaito', 'masuk123'),
(5, 'SATOSs', '$2y$10$yf7QT1ZaDC8d/IMrD3ORTeoNoy40xg.8d3iVo2lCr7j/2fzgSximi'),
(7, 'maskapai', '$2y$10$aBg4ae84P5fKhIeEdEaB4.DV8OnI6FkC2/vrRG8X65cuVCn0zgC6W'),
(8, 'hebatkali', '$2y$10$GW24.jEMDQNWuDmGH5d73OAIOQ6/CMofi.opH53.umUJwNS6f/yfS'),
(9, 'test', '$2y$10$5GeHu82yQfRar4BXuyXNfu2EnDV3uM1x0e8iKyWWC02AQVlTlmyV2'),
(11, 'iqiri', '$2y$10$JP4Hdwj30OOafzvUf9K0Buk170A.F92q2KD1iJekWzfBFPt1cTHL.'),
(12, 'peserta', '$2y$10$F74MxbktVEoOS0hvg2YNgOLKvmEgxt0i1H6P7dvB7tTJOQW69YThy');

-- --------------------------------------------------------

--
-- Table structure for table `user_role`
--

CREATE TABLE `user_role` (
  `user_id` int DEFAULT NULL,
  `role_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `user_role`
--

INSERT INTO `user_role` (`user_id`, `role_id`) VALUES
(0, 1),
(0, 2),
(1, 2),
(8, 11),
(8, 12),
(9, 1),
(9, 2),
(9, 11),
(11, 19),
(11, 11),
(11, 12),
(5, 1),
(5, 2),
(7, 1),
(7, 2),
(12, 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `access_pages`
--
ALTER TABLE `access_pages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `access_page_role`
--
ALTER TABLE `access_page_role`
  ADD KEY `role_id` (`role_id`),
  ADD KEY `access_page_id` (`access_page_id`);

--
-- Indexes for table `contact`
--
ALTER TABLE `contact`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_id_faculty` (`id_faculty`);

--
-- Indexes for table `cooperations`
--
ALTER TABLE `cooperations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cooperation_contact`
--
ALTER TABLE `cooperation_contact`
  ADD KEY `cooperation_fk` (`cooperation_id`) USING BTREE,
  ADD KEY `contact_fk` (`contact_id`) USING BTREE;

--
-- Indexes for table `cooperation_dean`
--
ALTER TABLE `cooperation_dean`
  ADD KEY `cooperation_fk` (`cooperation_id`),
  ADD KEY `dean_fk` (`dean_id`);

--
-- Indexes for table `cooperation_faculty`
--
ALTER TABLE `cooperation_faculty`
  ADD KEY `cooperation_id` (`cooperation_id`),
  ADD KEY `faculty_id` (`faculty_id`);

--
-- Indexes for table `cooperation_prodi`
--
ALTER TABLE `cooperation_prodi`
  ADD KEY `cooperation_id` (`cooperation_id`),
  ADD KEY `prodi_id` (`prodi_id`);

--
-- Indexes for table `deans`
--
ALTER TABLE `deans`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_id_faculty2` (`id_faculty`);

--
-- Indexes for table `documentation`
--
ALTER TABLE `documentation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_cooperation` (`id_cooperation`) USING BTREE;

--
-- Indexes for table `facultys`
--
ALTER TABLE `facultys`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `implementation`
--
ALTER TABLE `implementation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_cooperation` (`id_cooperation`) USING BTREE,
  ADD KEY `id_type` (`id_type`);

--
-- Indexes for table `partners`
--
ALTER TABLE `partners`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_cooperation` (`id_cooperation`);

--
-- Indexes for table `prodi`
--
ALTER TABLE `prodi`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_faculty_fk` (`id_faculty`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `type`
--
ALTER TABLE `type`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_role`
--
ALTER TABLE `user_role`
  ADD KEY `role_id` (`role_id`),
  ADD KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `access_pages`
--
ALTER TABLE `access_pages`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `contact`
--
ALTER TABLE `contact`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `cooperations`
--
ALTER TABLE `cooperations`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `deans`
--
ALTER TABLE `deans`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `documentation`
--
ALTER TABLE `documentation`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `facultys`
--
ALTER TABLE `facultys`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `implementation`
--
ALTER TABLE `implementation`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `partners`
--
ALTER TABLE `partners`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `prodi`
--
ALTER TABLE `prodi`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `type`
--
ALTER TABLE `type`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `access_page_role`
--
ALTER TABLE `access_page_role`
  ADD CONSTRAINT `access_page_role_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`),
  ADD CONSTRAINT `access_page_role_ibfk_2` FOREIGN KEY (`access_page_id`) REFERENCES `access_pages` (`id`);

--
-- Constraints for table `contact`
--
ALTER TABLE `contact`
  ADD CONSTRAINT `fk_id_faculty` FOREIGN KEY (`id_faculty`) REFERENCES `facultys` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `cooperation_contact`
--
ALTER TABLE `cooperation_contact`
  ADD CONSTRAINT `cooperation_contact_ibfk_1` FOREIGN KEY (`cooperation_id`) REFERENCES `cooperations` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `cooperation_contact_ibfk_2` FOREIGN KEY (`contact_id`) REFERENCES `contact` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `cooperation_dean`
--
ALTER TABLE `cooperation_dean`
  ADD CONSTRAINT `cooperation_dean_ibfk_1` FOREIGN KEY (`cooperation_id`) REFERENCES `cooperations` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `cooperation_dean_ibfk_2` FOREIGN KEY (`dean_id`) REFERENCES `deans` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `cooperation_faculty`
--
ALTER TABLE `cooperation_faculty`
  ADD CONSTRAINT `cooperation_faculty_ibfk_1` FOREIGN KEY (`cooperation_id`) REFERENCES `cooperations` (`id`),
  ADD CONSTRAINT `cooperation_faculty_ibfk_2` FOREIGN KEY (`faculty_id`) REFERENCES `facultys` (`id`);

--
-- Constraints for table `cooperation_prodi`
--
ALTER TABLE `cooperation_prodi`
  ADD CONSTRAINT `cooperation_prodi_ibfk_1` FOREIGN KEY (`cooperation_id`) REFERENCES `cooperations` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `cooperation_prodi_ibfk_2` FOREIGN KEY (`prodi_id`) REFERENCES `prodi` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `deans`
--
ALTER TABLE `deans`
  ADD CONSTRAINT `fk_id_faculty2` FOREIGN KEY (`id_faculty`) REFERENCES `facultys` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `implementation`
--
ALTER TABLE `implementation`
  ADD CONSTRAINT `type_implementation_ibfk_1` FOREIGN KEY (`id_type`) REFERENCES `type` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `partners`
--
ALTER TABLE `partners`
  ADD CONSTRAINT `cooperation_partner_ibfk` FOREIGN KEY (`id_cooperation`) REFERENCES `cooperations` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `prodi`
--
ALTER TABLE `prodi`
  ADD CONSTRAINT `faculty_prodi_ibfk_1` FOREIGN KEY (`id_faculty`) REFERENCES `facultys` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `user_role`
--
ALTER TABLE `user_role`
  ADD CONSTRAINT `user_role_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `user_role_ibfk_2` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
