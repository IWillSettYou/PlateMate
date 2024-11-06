-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 02, 2024 at 03:40 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vizsgaremek`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `name`) VALUES
(1, 'drink'),
(2, 'appetizer'),
(3, 'main course'),
(8, 'dessert');

-- --------------------------------------------------------

--
-- Table structure for table `item`
--

CREATE TABLE `item` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` int(11) NOT NULL,
  `categoryId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- Dumping data for table `item`
--

INSERT INTO `item` (`id`, `name`, `price`, `categoryId`) VALUES
(4, 'pizza', 2222, 3),
(7, 'Gyros', 444, 3),
(8, 'Zserbo', 599, 8),
(9, 'Alamale', 222, 1);

-- --------------------------------------------------------

--
-- Table structure for table `openinghours`
--

CREATE TABLE `openinghours` (
  `id` int(11) NOT NULL,
  `dayName` varchar(255) NOT NULL,
  `fromHour` varchar(255) NOT NULL,
  `untilHour` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- Dumping data for table `openinghours`
--

INSERT INTO `openinghours` (`id`, `dayName`, `fromHour`, `untilHour`) VALUES
(1, 'Hétfő', '9:00', '21:00'),
(2, 'Kedd', '9:00', '21:00'),
(3, 'Szerda', '9:00', '21:00'),
(4, 'Csütörtök', '9:00', '21:00'),
(5, 'Péntek', '9:00', '21:00'),
(6, 'Szombat', '9:00', '22:00'),
(7, 'Vasárnap', '9:00', '22:00');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `tableId` int(11) NOT NULL,
  `itemId` int(11) NOT NULL,
  `isDone` tinyint(1) NOT NULL DEFAULT 0,
  `isServed` tinyint(1) NOT NULL DEFAULT 0,
  `orderedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `tableId`, `itemId`, `isDone`, `isServed`, `orderedAt`) VALUES
(62, 2, 4, 0, 0, '2024-11-02 15:37:39'),
(63, 2, 9, 0, 0, '2024-11-02 15:37:39'),
(64, 2, 9, 0, 0, '2024-11-02 15:37:39'),
(65, 2, 4, 0, 0, '2024-11-02 15:37:39');

-- --------------------------------------------------------

--
-- Table structure for table `paid`
--

CREATE TABLE `paid` (
  `id` int(11) NOT NULL,
  `tableId` int(11) NOT NULL,
  `itemId` int(11) NOT NULL,
  `paymentMethodId` int(11) NOT NULL,
  `paidAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- Dumping data for table `paid`
--

INSERT INTO `paid` (`id`, `tableId`, `itemId`, `paymentMethodId`, `paidAt`) VALUES
(319, 1, 8, 1, '2024-11-02 04:19:48'),
(320, 1, 7, 1, '2024-11-02 04:19:48'),
(321, 1, 4, 1, '2024-11-02 04:19:48'),
(322, 1, 9, 1, '2024-11-02 04:19:48'),
(327, 1, 4, 1, '2024-11-02 15:38:01'),
(328, 1, 7, 1, '2024-11-02 15:38:01'),
(329, 1, 9, 1, '2024-11-02 15:38:01');

-- --------------------------------------------------------

--
-- Table structure for table `paymentmethods`
--

CREATE TABLE `paymentmethods` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- Dumping data for table `paymentmethods`
--

INSERT INTO `paymentmethods` (`id`, `name`) VALUES
(1, 'card'),
(5, 'cash');

-- --------------------------------------------------------

--
-- Table structure for table `permissionsettings`
--

CREATE TABLE `permissionsettings` (
  `id` int(11) NOT NULL,
  `section` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- Dumping data for table `permissionsettings`
--

INSERT INTO `permissionsettings` (`id`, `section`) VALUES
(1, 'admin'),
(2, 'cashier'),
(3, 'chef'),
(4, 'waiter');

-- --------------------------------------------------------

--
-- Table structure for table `reservedtable`
--

CREATE TABLE `reservedtable` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `numberOfCustomers` int(11) NOT NULL,
  `tableId` int(11) NOT NULL,
  `reservedAt` datetime NOT NULL DEFAULT current_timestamp(),
  `reservedUntil` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- Dumping data for table `reservedtable`
--

INSERT INTO `reservedtable` (`id`, `name`, `numberOfCustomers`, `tableId`, `reservedAt`, `reservedUntil`) VALUES
(5, 'Geza', 5, 1, '2024-11-01 20:17:39', '2024-11-01 21:17:07');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `userId` int(11) NOT NULL,
  `ip` varchar(255) NOT NULL,
  `expires` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `userId`, `ip`, `expires`) VALUES
('cbaa2951-6b48-4e96-a039-a663e8f68130', 5, '::1', '2024-11-03 15:39:35');

-- --------------------------------------------------------

--
-- Table structure for table `tables`
--

CREATE TABLE `tables` (
  `id` int(11) NOT NULL,
  `tableNumber` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- Dumping data for table `tables`
--

INSERT INTO `tables` (`id`, `tableNumber`) VALUES
(1, 1),
(2, 2);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `hashedPassword` varchar(255) NOT NULL,
  `permissionId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `email`, `hashedPassword`, `permissionId`, `createdAt`) VALUES
(5, 'Jani Patrik', 'janipatrik138@gmail.com', '$2b$10$bc/JA.8dmsiBDfnsCoY.uOjndd5mqVvaTQjPdF9NfLSx76GIqqmY6', 1, '2024-10-28 13:56:07'),
(6, 'Gere Csanad', 'gerecsani11@gmail.com', '$2b$10$xUN8VGgDb6Pmmf7z.rZKo.7ORG2nkt6X3x7Q2MaixgA9GoSkZP/4i', 1, '2024-10-28 14:28:34');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `item`
--
ALTER TABLE `item`
  ADD PRIMARY KEY (`id`),
  ADD KEY `categoryId` (`categoryId`);

--
-- Indexes for table `openinghours`
--
ALTER TABLE `openinghours`
  ADD PRIMARY KEY (`id`),
  ADD KEY `dayName` (`dayName`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tableId` (`tableId`,`itemId`),
  ADD KEY `itemId` (`itemId`);

--
-- Indexes for table `paid`
--
ALTER TABLE `paid`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tableId` (`tableId`,`itemId`,`paymentMethodId`),
  ADD KEY `itemId` (`itemId`),
  ADD KEY `paymentMethod` (`paymentMethodId`);

--
-- Indexes for table `paymentmethods`
--
ALTER TABLE `paymentmethods`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `permissionsettings`
--
ALTER TABLE `permissionsettings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reservedtable`
--
ALTER TABLE `reservedtable`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tableId` (`tableId`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `tables`
--
ALTER TABLE `tables`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `tableNumber` (`tableNumber`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `permissionLevel` (`permissionId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `item`
--
ALTER TABLE `item`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `openinghours`
--
ALTER TABLE `openinghours`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

--
-- AUTO_INCREMENT for table `paid`
--
ALTER TABLE `paid`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=330;

--
-- AUTO_INCREMENT for table `paymentmethods`
--
ALTER TABLE `paymentmethods`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `permissionsettings`
--
ALTER TABLE `permissionsettings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `reservedtable`
--
ALTER TABLE `reservedtable`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `tables`
--
ALTER TABLE `tables`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `item`
--
ALTER TABLE `item`
  ADD CONSTRAINT `item_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`itemId`) REFERENCES `item` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`tableId`) REFERENCES `tables` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `paid`
--
ALTER TABLE `paid`
  ADD CONSTRAINT `paid_ibfk_1` FOREIGN KEY (`itemId`) REFERENCES `item` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `paid_ibfk_2` FOREIGN KEY (`tableId`) REFERENCES `tables` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `paid_ibfk_3` FOREIGN KEY (`paymentMethodId`) REFERENCES `paymentmethods` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `reservedtable`
--
ALTER TABLE `reservedtable`
  ADD CONSTRAINT `reservedtable_ibfk_1` FOREIGN KEY (`tableId`) REFERENCES `tables` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `sessions`
--
ALTER TABLE `sessions`
  ADD CONSTRAINT `sessions_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`permissionId`) REFERENCES `permissionsettings` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
