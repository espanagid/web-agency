CREATE TABLE `lead_files` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`leadId` bigint unsigned NOT NULL,
	`filename` varchar(255) NOT NULL,
	`mime` varchar(120) NOT NULL,
	`size` int NOT NULL DEFAULT 0,
	`data` longtext NOT NULL,
	CONSTRAINT `lead_files_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `leads` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`lang` varchar(5) NOT NULL DEFAULT 'es',
	`name` varchar(255),
	`contact` varchar(255),
	`businessName` varchar(255),
	`sector` varchar(255),
	`colors` varchar(255),
	`hasLogo` varchar(20),
	`notes` text,
	`transcript` text,
	`summary` text,
	`status` enum('new','contacted','done') NOT NULL DEFAULT 'new',
	CONSTRAINT `leads_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`unionId` varchar(255) NOT NULL,
	`name` varchar(255),
	`email` varchar(320),
	`avatar` text,
	`role` enum('user','admin') NOT NULL DEFAULT 'user',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()),
	`lastSignInAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_unionId_unique` UNIQUE(`unionId`)
);
