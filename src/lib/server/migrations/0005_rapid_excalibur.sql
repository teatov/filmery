CREATE UNIQUE INDEX `movieCompany_unique_movie_company` ON `movieCompany` (`movieId`,`companyId`);--> statement-breakpoint
CREATE UNIQUE INDEX `movieStaff_unique_credit_movie_staff` ON `movieStaff` (`credit`,`movieId`,`staffId`);--> statement-breakpoint
CREATE UNIQUE INDEX `movie_unique_title_date` ON `movie` (`title`,`releaseDate`);