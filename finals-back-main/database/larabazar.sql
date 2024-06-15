-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 19, 2022 at 10:08 AM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 7.4.23

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `larabazar`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Md. Arif Hossan', 'admin@admin.com', '2022-02-02 11:57:40', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'vkppuhlz18tovHh0OLlR8IwUjGkHo301LGHWglrnKvlY4g8TiwLsSYyUZTel', '2022-02-02 11:57:40', '2022-02-02 11:57:40');

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `product_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `qty` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`id`, `product_id`, `user_id`, `qty`, `created_at`, `updated_at`) VALUES
(3, 5, 2, 4, '2022-02-11 12:42:38', '2022-02-11 13:52:04'),
(4, 8, 2, 1, '2022-02-11 12:42:46', '2022-02-11 12:42:46');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(8, '2022_02_02_173539_create_admins_table', 5),
(9, '2022_01_24_200420_create_products_table', 6),
(10, '2022_01_26_194258_create_cart_table', 7),
(11, '2022_01_28_174744_create_orders_table', 8);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `product_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `qty` int(11) NOT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payment_method` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payment_status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `product_id`, `user_id`, `qty`, `address`, `status`, `payment_method`, `payment_status`, `created_at`, `updated_at`) VALUES
(1, 2, 2, 2, 'narayanganj', 'pending', 'cash', 'pending', '2022-02-11 12:30:13', '2022-02-11 12:30:13'),
(2, 1, 2, 2, 'narayanganj', 'complete', 'cash', 'pending', '2022-02-11 12:30:13', '2022-02-11 12:58:58'),
(3, 11, 6, 1, 'Dhaka', 'pending', 'cash', 'pending', '2022-02-11 12:57:07', '2022-02-11 12:57:07');

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `gallery` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `price`, `category`, `gallery`, `description`, `created_at`, `updated_at`) VALUES
(1, 'Washing Machine', '35000', 'Home Applience', 'Cb38WpZo0i6oNFzT77WPyMVEfYxYSy3HcEsJzvhf.jpg', 'Save a huge amount of energy* by washing large loads at low temperatures using Eco Bubble™ technology. Bubbles activate detergent, so it quickly penetrates fabric and removes dirt easily – even in cool water (15 °C)\r\n\r\nWD80J6410AS/TL\r\n\r\nWash Cool, Save Energy\r\nPowerful Cleaning in Less Than an Hour\r\nSanitize Your Clothes with Air\r\nWashing Capacity (kg): 8 Kg\r\nNet Dimension (WxHxD): 600 x 850 x 600 mm\r\nNet Weight: 71 Kg\r\nVoltage/Frequency: 220/50', '2022-02-07 05:49:42', '2022-02-07 05:49:42'),
(2, 'Motorcycle', '120000', 'Automobile', 'bTOHthya9wst8b9thTv4TDrwflFe7eqyBXGkkLd3.png', 'The Hero Achiever is one of very simple standard commuter bikes with a heavy engine. Hero continues to be a great success, but this model has not yet reached that level in Bangladesh as well as India. But recently Hero bought some changes to this bike. Hopefully this also comes to the track as a Hero bike.\r\n\r\n- Hero has added some new color variants, which is now a more attractive look than before.\r\n\r\n- As a 150 cc bike, ‘Hero Achiever’ is less expensive in Bangladesh. The bike is cheap compared to the other 150cc bikes in Bangladesh.\r\n\r\n- Refined engine, it is powerful even being a fuel efficient motorbike.\r\n\r\n- There is no noticeable change to this bike at the beginning of 2021. Its retail price has changed in the Bangladeshi market at the beginning of 2021.\r\n\r\nA 149.1cc engine has been used for these bikes, which is air-cooled, 4-stroke, single cylinder, OHC. Its maximum power is 13.4 Bhp @ 8000 rpm and maximum torque 12.80 Nm @ 5000 rpm. It has 5-speed manual gears and it can run at a maximum speed of 101 kilometers per hour. The bike can cross an average of 50 kilometers per liter of fuel. More details about the bike in the following statement.', '2022-02-07 06:02:21', '2022-02-07 06:02:21'),
(3, 'iphone 6', '95000', 'Mobile & Computer', 'ygkJwaswXa8XuWFlaIkOrVSC37opTH791yviDXQy.jpg', 'Apple finally gave the iPhone a much-needed rethink, and the result is a product that is more like its competition than ever before, but also stands out just as well, if not better, in a seriously overcrowded market. \r\n\r\nDisplay: 4.70-inch (750x1334)\r\nProcessor: Apple A8\r\nFront Camera: 1.2MP\r\nRear Camera: 8MP\r\nRAM: 1GB\r\nStorage: 16GB\r\nBattery Capacity: 1810mAh\r\nOS: iOS 8.0', '2022-02-07 06:07:31', '2022-02-07 06:07:31'),
(4, 'lenovo yoga', '120000', 'Mobile & Computer', 'BCLTyN6i1Fv0cDvZGgscn2mPlb5xdsI1M35CKdZq.jpg', 'Purposeful design & performance:\r\n10th Gen Intel® Core™ H series processors offer commanding performance\r\n\r\nVibrant 15.6 inch DisplayHDR display will make the absolute most of your visuals\r\n\r\nCreate, game & entertain with enhanced graphics from NVIDIA®\r\n\r\nStay productive & recharge quickly with Rapid Charge Express\r\n\r\nFlagship 2 in 1 design that includes garaged pen & Dolby Atmos® Speaker System', '2022-02-07 06:41:19', '2022-02-07 06:41:19'),
(5, 'Aosake Wheels', '2500', 'Automobile', 'MmDAXvra2hu3VEjcrkJvqGzhDgObPKJqvsG8clou.jpg', 'AOSAKE Leather Steering Wheels Cover Universal with Non-Slip Handle Car Steering Cover for 15 inches Steering Wheels (Green)\r\n\r\nMade of Pu leather, high quality heavy duty steering cover, smooth and durable\r\nSteering wheels cover with non-slip handle design in the two sides, increased the safety and give you the better sense of control\r\nUniversal size, fit any steering wheels from 14.5 inches to 15 inches in diameter\r\n4 Colors for choice, more choices for match your car’s interior accessories color\r\nPerfect automotive accessories for your car, protect your steering wheels', '2022-02-07 06:44:52', '2022-02-07 06:44:52'),
(6, 'Samsung Refrigerator', '134900', 'Home Applience', 'ZRdgqKBWK0xWD2pXcLlAq7NJbXD9ry3YsKP4pr1H.jpg', 'REFRIGERATOR – SAMSUNG | : RS72R5011B4/D2 – 700L\r\nSpaceMax™ Technology\r\nDigital Inverter\r\nAll-Around Cooling\r\nDeodorizing Filter\r\nSleek & Seamless Design', '2022-02-07 06:49:43', '2022-02-07 06:49:43'),
(7, 'Healmate', '833', 'Automobile', 'bs4x4N5AXi5vjTTS1xGI9cVXs8Pqko4JdBbc7y2d.jpg', 'BIKE HELMETS SFM HIGH SPEED Helmet Full Face Helmets- BLACK.SFM Full Face -Helmet Open Face Helmets Light in weight Detachable neck guard Comfortable to use.Also, the helmet is anti-odour The neck protector is attached with a zip and can be removed when not in use. The helmet has nice safety design.It has a chin strap with clip lock mechanism and adjustable sliders The clip mechanism helps to fit the helmet perfectly. The outer shell of the helmet is made from high-grade ABS materialIt can also withstand the heavy collision Also, the helmet comes with three-layer protection for strength and sturdiness.', '2022-02-07 06:54:50', '2022-02-07 06:54:50'),
(8, 'Gamer Mouse', '2000', 'Mobile & Computer', 'dQroPJL7cXdaqs53YsZpau1DuMA7ZDyWbhxSOlfF.jpg', 'Features:\r\n1. Material: this wireless mouse is made of good material, which is durable.\r\n2. Design: charging port, power switch, optical engine, USB receiver.\r\n3. Fine workmanship: this wireless mouse with fine workmanship, it has good appearance.\r\n4. Convenient to use: with lightweight and portable size, this wireless mouse is easy and convenient to carry and use.\r\n5. The superior choice: the superior choice for internet surfers, gamer and people who work at length at the computer.\r\n\r\nDescription:\r\nComfortable texture, ergonomic design, this wireless mouse is convenient to use.\r\n\r\nSpecifications:\r\nType: battery type, charging type (optional)\r\nSize: 6.7*6.3*12.5cm\r\nType: photoelectric mouse\r\nPhotoelectric resolution: 1600dpi (DPI)\r\nNumber of keys: 6 (key)\r\nInterface: USB\r\nWireless transmission frequency: 2.4GHz\r\n\r\nPackage Included:\r\n1* Wireless mouse', '2022-02-07 07:01:35', '2022-02-07 07:01:35'),
(9, 'SanDisk Memory Card', '400', 'Mobile & Computer', 'Is0ts2dWYIzziPIvzDbLGPSpKQrGdba1dB5uN69a.jpg', 'The SanDisk Ultra 32GB Class-10 120Mbps Micro SDHC UHS-I Memory Card provides you good performance in recording and watching Full HD video with room for even more hours of video. you can transfer up to 1000 photos in just one minute.6 Ideal for Android-based smartphones and tablets, this card’s A1 rating means that you can load apps faster too. These micro SD cards are compatible with Android smartphones and tablets. With a breakthrough capacity of up to 512GB, you can store even more hours of Full HD video on the card without worrying about running out of room for the videos, photos, music, movies, and other files you want to shoot, save and share. This Micro SD card is optimized for apps, delivering faster app launch and performance that provides a better smartphone experience. In this Micro SD UHS-I Card, Class-10 speed rating allows you to shoot Full HD2 video and high-quality photos. The SanDisk Ultra 32GB comes with a lifetime warranty.', '2022-02-08 04:18:03', '2022-02-08 04:18:03'),
(10, 'Toyota Noah X Led', '2300000', 'Automobile', 'tTMBKuHzRKiQII3wMEuokQtKXHphzY7fUPcPj5NU.jpg', 'TOYOTA NOAH X LED PKG 2014 HYBRID\r\nRECONDITION MICROBUS , CHASSIS : ZWR80, Silver COLOR, BLACK COLOR INTERIOR, DVD,TV-NAVI, AUDIO-BLUETOOTH-CAMERA VIEW STEERING CONTROLLER, CRUISE CONTROL, 2 SRS AIRBAG, PUSH START, ABS, OPTIC METER, DUAL AC, TINTED GLASS, WINDOW CERTAIN SYSTEM, 5 DOOR, One Door Power, POWER WINDOW, HID PROJECTION HEAD LIGHT, LED LIGHT , BACK CAM, 8 PASSENGER SEAT, RAIN GUARD, REAR WIPER, FOG LIGHT,FRONT BODY SENSOR, WINKER MIRROR, SPOILER,FULL LOAD, 16\" TYRE ..ETC\r\nFACILITIES AVAILABLE FROM REEDOY & UDOY MOTORS:\r\n- BRTA REGISTRATION AND INSURANCE FACILITIES.\r\n- SERVICE WARRANTY.\r\n- CNG CONVERSION FACILITIES .\r\n- BANK LOAN FACILITIES (We provide car loan on the spot with condition.)\r\n-Test Drive Facility.\r\nFOR DETAIL IN FORMATIONS, PLEASE FEEL FREE TO VISIT OUR SHOWROOM OR CALL : +8801907853660\r\nWe are Authorized (CCS) Car Loan Agent of The Premier Bank Ltd.', '2022-02-08 04:22:38', '2022-02-08 04:22:38'),
(11, 'AKG K240 STUDIO Headphone', '9900', 'Mobile & Computer', 'Ojki11kHGrvpHHLf7GD5OKIEZlbXaRFob3y6B7AI.jpg', 'AKG K240 STUDIO professional semi-open headphones are designed for professional applications such as mixing, mastering and playback. In this headphone, The AKG K240 Studio over-ear, Their advanced 30 mm XXL transducers with patented Varimotion diaphragms deliver a wide dynamic range, increased sensitivity and high sound levels, while their semi-open design provides a solid bass range and extremely clear highs. This headphone featured with great sound quality, the headphones are extremely durable and comfortable. It is not only built to withstand the demands of countless hours in the studio. The AKG K240 Studio headphones also feature a professional mini XLR connector and come with a 3 meter cable and convertible jack plug for connecting portable equipment easily. Altogether, from performance and ease of use to comfort and reliability, the AKG K240 Studio is a powerful tool for production environments. This latest AKG K240 STUDIO Professional Headphone has no warranty.', '2022-02-08 04:25:12', '2022-02-08 04:25:12'),
(12, 'Mueller Juicer Ultra', '7990', 'Home Applience', 'tHFEUeIDOd3ulcv1T9LG5cGbPb9NcYFYRy3niFkr.jpg', 'Why the Mueller Ultra Juicer - Under its sleek modern stainless-steel design and low countertop footprint, it packs the punch of a much larger, bulkier and more expensive juicer, at a fraction of the size and cost. Create a 16 oz cup of juice in seconds, with less clogging and less foaming.\r\nDual-speed Versatility - \"1\" low speed runs from 12000 to 15000 RPM for softer fruits like oranges, apples, grapes or tomatoes; \"2\" high speed runs from 15000 to 18000 RPM for harder fruits like carrots, celery, beets, kale, ginger and more.\r\nClean-ups are a Snap - Our Ultra Juicer’s culinary grade stainless steel cutting disc is surrounded by a micro mesh filter to extract more juice, vitamins and minerals, all while being easy to clean and assemble in seconds.\r\nMade in China with Extra Large Feed Chute - Features an anti-drip function and 3” chute to avoid spillage. A safety locking arm makes sure the cover stays on tight during operation. The overload protection system shuts off the juicer automatically to prevent overheating from an unstable power supply, improper assembly, idle run, etc.', '2022-02-08 04:30:42', '2022-02-08 04:30:42'),
(13, 'NEO QLED 8K Smart TV', '260000', 'Home Applience', 'UIWmTysHxJ8MoVIdomRIH3Y8RtsUCIKEouZiKpGB.jpg', 'Samsung 55Q900R 55-Inch Smart TV comes with 55” 8K UHD (7680 × 4320) QLED Smart, Motion Rate 240 Smart,with Quantum Dot, UltraWide Viewing Angle and Bezel-free Design. Here, Wi-Fi. Bluetooth, 3 USB Connections are availble. This new Samsung 55Q900R 55-Inch 8K QLED Smart TV is designed with Bezel-free Design, Bluetooth, RS232 Control (EX-Link), IP Control Support, Optical Audio Output Port, Picture, Real 8K Resolution, 8K AI Upscaling with Quantum Processor 8K. This Television is also featured with 100% Color Volume, with Quantum Dot, Real Game Enhancer, Motion Rate 240 Smart, Smart TV with Universal Guide, Bixby on TV, Ambient Mode, Samsung OneRemote. This television also has SmartThings Compatible Audio, Dolby Digital Plus 60 Watt 4.2 Channel Style, One Invisible Connection. This television has 4 x HDMI Connections, 3 x USB Connections, LAN Port 802.11AC built-in Wi-Fi. The latest Samsung 55Q900R 55-Inch 8K QLED Smart TV has No Parts Warranty.', '2022-02-08 04:46:30', '2022-02-08 04:46:30'),
(14, 'Flagship Camera Drone', '139000', 'Automobile', 'wNUTvNoRJuu3Vlpg1APZC5T8MTpERrofkfvgv6kI.jpg', 'DJI Mavic 3 is a powerful flagship drone loaded with some of DJI\'s most advanced imaging and flight technologies. Its dual-camera system features a 4/3 CMOS Hasselblad camera and a 1/2-inch-sensor tele camera, giving creators access to professional-level imaging and unrivaled versatility. It also offers up to 46 minutes of flight time, a 15km max transmission range, and robust safety features like omnidirectional obstacle sensing and Advanced Return to Home. DJI Mavic 3 was designed and built for those who put imaging above everything.', '2022-02-08 06:42:45', '2022-02-08 06:42:45'),
(15, 'Google Pixel 2', '79000', 'Mobile & Computer', 'i3PnIWa8KCjJ0SOtfdDV3SX32JmdMbwgCIBZo2hI.jpg', '5.0-inch AMOLED Capacitive Touchscreen, 1080 x 1920 pixels with Corning Gorilla Glass 5\r\nAndroid OS\r\n12.2MP Camera with f/1.8, 27mm, 1/2.6\" Sensor Size + 8MP Front Camera with f/2.4, 27mm, 1/3.2\" Sensor Size\r\nInternal Memory: 64GB, 4GB RAM\r\nNon-Removable Lithium Ion 2700 mAh Battery', '2022-02-08 06:50:11', '2022-02-08 06:50:11'),
(16, 'Sony Alpha A6400 Camera', '99500', 'Home Applience', 'VHjFQyCwwk8UiC5FgGQTRIOk8pnMUp4IfmWSwJJx.jpg', 'Sony Alpha A6400 Mirrorless Digital Camera with 16-50mm Lens is comes with 24.2MP APS-C Exmor CMOS Sensor, BIONZ X Image Processor, Real-Time Eye AF & Real-Time Tracking XGA Tru-Finder 2.36m-Dot OLED EVF. This camera is stable, fast, versatile, and compact, the Alpha a6400 from Sony is an APS-C-format mirrorless camera that adopts many of the features normally reserved for their full-frame lineup. This includes an autofocus acquisition of 0.02 seconds, Real-time Eye AF and Real-time Tracking capabilities, high-speed shooting up to 11 fps and silent shooting up to 8 fps. This camera has Sony E Lens Mount, APS-C (1.5x Crop Factor) Camera Format, 6000 x 4000 Maximum Resolution, 3:2, 16:9 Aspect Ratio. from this camera you get JPEG, RAW image file formate. Here the Shutter Speed about 1/4000 to 30 Seconds Bulb Mode (Electronic Front Curtain Shutter). This camera has Average, Center-Weighted Average, Highlight Weighted, Multi-Zone, Spot Metering Method, Aperture Priority, Auto, Manual, Program, Shutter Priority Exposure Modes. This Alpha camera is complementing the imaging assets, the a6400 sports a robust magnesium-alloy body with sealed buttons and dials to help keep out dust and moisture, plus anti-dust functionality that protects the optical filter. In this camera, the compact profile incorporates a high-resolution XGA Tru-Finder 2.36m-dot OLED electronic viewfinder for bright, clear, eye-level viewing, and this EVF features a 120 fps viewing mode for smooth tracking of fast-moving subjects. A rear 3.0\" 921.6k-dot touchscreen TFT LCD monitor is also available and tilts 180° up and 74° down to benefit shooting from high and low working angles. The touchscreen design also allows for intuitive touch-to-focus control. Additionally, for wireless remote control over the camera, or for just sharing imagery online, built-in Wi-Fi with NFC permits linking with a mobile device for intuitive wireless control.', '2022-02-08 06:52:19', '2022-02-08 06:52:19');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `created_at`, `updated_at`) VALUES
(2, 'arif', 'arif@gmail.com', '$2y$10$ZPfX007TZ1PbU37wm6l6LO7nTiR7Q01mgNoUastfBYwK.WMltCDKK', NULL, NULL),
(6, 'piash', 'piash@gamil.com', '$2y$10$JcGNf./pXvvjlpAPJBQXt.YzDPGrNSokSdEoVIyHTLF4Om6aVTiJy', '2022-02-11 12:43:30', '2022-02-11 12:43:30');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `admins_email_unique` (`email`);

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
