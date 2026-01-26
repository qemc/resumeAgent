CREATE TABLE `career_paths` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer NOT NULL,
	`name` text NOT NULL,
	`description` text NOT NULL,
	`created_at` integer,
	`updated_at` integer,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `topics` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`career_path_id` integer NOT NULL,
	`experience_id` integer NOT NULL,
	`original_text` text NOT NULL,
	`topic_text` text NOT NULL,
	`approved` integer DEFAULT false NOT NULL,
	`rejection_comment` text,
	`created_at` integer,
	FOREIGN KEY (`career_path_id`) REFERENCES `career_paths`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`experience_id`) REFERENCES `experiences`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `variations` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`topic_id` integer NOT NULL,
	`original_text` text NOT NULL,
	`variation_text` text NOT NULL,
	`approved` integer DEFAULT false NOT NULL,
	`rejection_comment` text,
	`created_at` integer,
	FOREIGN KEY (`topic_id`) REFERENCES `topics`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
ALTER TABLE `resumes` ADD `summary` text;