CREATE TABLE `company` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `country` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `genre` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `movieCompany` (
	`id` integer PRIMARY KEY NOT NULL,
	`movieId` integer,
	`companyId` integer,
	FOREIGN KEY (`movieId`) REFERENCES `movie`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`companyId`) REFERENCES `company`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `movieStaff` (
	`id` integer PRIMARY KEY NOT NULL,
	`credit` text NOT NULL,
	`movieId` integer,
	`staffId` integer,
	FOREIGN KEY (`movieId`) REFERENCES `movie`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`staffId`) REFERENCES `staff`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `movie` (
	`id` integer PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`poster` text,
	`releaseDate` text NOT NULL,
	`duration` integer NOT NULL,
	`synopsis` text NOT NULL,
	`countryId` integer,
	`genreId` integer,
	FOREIGN KEY (`countryId`) REFERENCES `country`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`genreId`) REFERENCES `genre`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `staff` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `company_name_unique` ON `company` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `country_name_unique` ON `country` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `genre_name_unique` ON `genre` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `movieCompany_unique_movie_company` ON `movieCompany` (`movieId`,`companyId`);--> statement-breakpoint
CREATE UNIQUE INDEX `movieStaff_unique_credit_movie_staff` ON `movieStaff` (`credit`,`movieId`,`staffId`);--> statement-breakpoint
CREATE UNIQUE INDEX `movie_unique_title_date` ON `movie` (`title`,`releaseDate`);--> statement-breakpoint
CREATE UNIQUE INDEX `staff_name_unique` ON `staff` (`name`);