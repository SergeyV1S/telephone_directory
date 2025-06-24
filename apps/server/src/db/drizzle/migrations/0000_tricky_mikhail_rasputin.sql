CREATE TABLE IF NOT EXISTS "phonebook-record" (
	"uid" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" date DEFAULT now() NOT NULL,
	"updated_at" date NOT NULL,
	"id" text,
	"firstname" text,
	"lastname" text,
	"middlename" text,
	"gasPhone" text,
	"urbanPhone" text,
	"email" text,
	"address" text,
	"post" text,
	"organization" text,
	"subdivision" text,
	"subdivisionId" text
);
