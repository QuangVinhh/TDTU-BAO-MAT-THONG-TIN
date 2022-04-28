-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th4 29, 2022 lúc 12:19 AM
-- Phiên bản máy phục vụ: 10.4.22-MariaDB
-- Phiên bản PHP: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `bmtt`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `aes`
--

CREATE TABLE `aes` (
  `id` int(11) NOT NULL,
  `content` varchar(255) NOT NULL,
  `encrypt` varchar(255) NOT NULL,
  `decrypt` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `aes`
--

INSERT INTO `aes` (`id`, `content`, `encrypt`, `decrypt`) VALUES
(1, 'test-00-51900781', '3b33af26260929c31d4dd51bf8a5b068b752f0f8dda693f07be569de68966f66', 'test-00-51900781'),
(2, 'test-01-51900781', '1f463450aadf4c33b54e161f869dd2da6495a8e0107f63ca60986029eadb7aea', 'test-01-51900781'),
(20, 'test.txt', 'test.txt_Encrypt', ''),
(21, 'test12312313', '7148bb443f9cb4536302ceef148de6d7', 'test12312313'),
(23, 'testContent', '31bd87a9c06caa89d20cf0b2c5500282', 'testContent'),
(27, 'AES là một thuật toán mã hóa khối', 'bf50cd87792731072310b4b7b78f7c40262806a38d8d2fdfcb207861c4b71f7139875d5c690b67b95d1ca73600a4cfe5', 'AES là một thuật toán mã hóa khối'),
(28, 'test.txt', 'test.txt_Encrypt', 'test.txt_Decrypt'),
(65, 'test-51900781-001', 'QTVxUFV2aUIvcUdlbFJITExMOFY3aXBsL1NyZkxaTlhmWkZUc3JiaGM3dz0=', ''),
(66, 'QTVxUFV2aUIvcUdlbFJITExMOFY3aXBsL1NyZkxaTlhmWkZUc3JiaGM3dz0', '', 'test-51900781-001'),
(67, 'The first text to server A', 'ckJLNTd0bERjS0s3elRFd1ZaVnR6YXNFL1I2Y3RxQ1pnZEJuNndPV1djZz0=', '');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `server_a`
--

CREATE TABLE `server_a` (
  `id` int(11) NOT NULL,
  `status` varchar(255) NOT NULL,
  `content` varchar(255) NOT NULL,
  `result` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `server_a`
--

INSERT INTO `server_a` (`id`, `status`, `content`, `result`) VALUES
(8, 'Sent To Server B', 'The first text sent to server B !', 'Success !!!'),
(9, 'Sent To Server B', 'The second text sent to server B !	', 'Success !'),
(10, 'Received From Server B', 'Rmx4UUNleHI3MmtvNzNMWW1aUDRrQ3c1N0tCdzY1RC85VzdiRHZ0ZUxSQT0=', 'Success !'),
(11, 'Decrypting', 'Rmx4UUNleHI3MmtvNzNMWW1aUDRrQ3c1N0tCdzY1RC85VzdiRHZ0ZUxSQT0', 'Hello A ! Nice to meet you.'),
(12, 'Decrypting', 'Rmx4UUNleHI3MmtvNzNMWW1aUDRrQ3c1N0tCdzY1RC85VzdiRHZ0ZUxSQT0', 'Error !');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `server_b`
--

CREATE TABLE `server_b` (
  `id` int(11) NOT NULL,
  `status` varchar(255) NOT NULL,
  `content` varchar(255) NOT NULL,
  `result` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `server_b`
--

INSERT INTO `server_b` (`id`, `status`, `content`, `result`) VALUES
(8, 'Received From Server A', 'aDYyb0c4Qnp4aGQ0WFk1djBnTU1YMVhCNkRUR3JmUFBSanRtR3lLaDlDOUVnWG13YlNSSk5ubE1vZ0RRbEVyMQ==', 'Success !!!'),
(9, 'Received From Server A', 'elc1alQ0RVJ3UXFoNzRvOFlWbXpoSitGcmU4Ti92bkhkOHhWK3Z1SjdqOHdUdlVqVVoxWmljaWhDVVVVQzF4MQ==', 'Success !'),
(10, 'Decrypting', 'aDYyb0c4Qnp4aGQ0WFk1djBnTU1YMVhCNkRUR3JmUFBSanRtR3lLaDlDOUVnWG13YlNSSk5ubE1vZ0RRbEVyMQ', 'Error !'),
(11, 'Decrypting', 'aDYyb0c4Qnp4aGQ0WFk1djBnTU1YMVhCNkRUR3JmUFBSanRtR3lLaDlDOUVnWG13YlNSSk5ubE1vZ0RRbEVyMQ', 'The first text sent to server B !'),
(12, 'Sent To Server A', 'Hello A ! Nice to meet you.', 'Success !');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `aes`
--
ALTER TABLE `aes`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `server_a`
--
ALTER TABLE `server_a`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `server_b`
--
ALTER TABLE `server_b`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `aes`
--
ALTER TABLE `aes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=68;

--
-- AUTO_INCREMENT cho bảng `server_a`
--
ALTER TABLE `server_a`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT cho bảng `server_b`
--
ALTER TABLE `server_b`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
