CREATE TABLE "Users" (
  "user_id" SERIAL PRIMARY KEY,
  "username" VARCHAR,
  "email" VARCHAR,
  "password_hash" VARCHAR,
  "created_at" TIMESTAMP,
  "updated_at" TIMESTAMP
);

CREATE TABLE "Profiles" (
  "profile_id" SERIAL PRIMARY KEY,
  "user_id" INT,
  "first_name" VARCHAR,
  "last_name" VARCHAR,
  "phone_number" VARCHAR,
  "address" VARCHAR,
  "city" VARCHAR,
  "state" VARCHAR,
  "country" VARCHAR,
  "postal_code" VARCHAR,
  "refresh_token" VARCHAR
);

CREATE TABLE "Roles" (
  "role_id" SERIAL PRIMARY KEY,
  "role_name" VARCHAR
);

CREATE TABLE "UserRoles" (
  "user_id" INT,
  "role_id" INT,
  PRIMARY KEY ("user_id", "role_id")
);

CREATE TABLE "Competitions" (
  "competition_id" SERIAL PRIMARY KEY,
  "title" VARCHAR,
  "description" TEXT,
  "start_date" TIMESTAMP,
  "end_date" TIMESTAMP,
  "ticket_price" DECIMAL,
  "total_tickets" INT,
  "tickets_sold" INT,
  "image_url" VARCHAR
);

CREATE TABLE "Tickets" (
  "ticket_id" SERIAL PRIMARY KEY,
  "competition_id" INT,
  "user_id" INT,
  "purchase_date" TIMESTAMP,
  PRIMARY KEY ("competition_id", "user_id")
);

CREATE TABLE "Winners" (
  "winner_id" SERIAL PRIMARY KEY,
  "competition_id" INT,
  "user_id" INT,
  "win_date" TIMESTAMP,
  "prize_description" TEXT
);

CREATE TABLE "Payments" (
  "payment_id" SERIAL PRIMARY KEY,
  "user_id" INT,
  "amount" DECIMAL,
  "payment_date" TIMESTAMP,
  "payment_method" VARCHAR,
  "status" VARCHAR
);

CREATE TABLE "AuditLog" (
  "log_id" SERIAL PRIMARY KEY,
  "user_id" INT,
  "action" TEXT,
  "timestamp" TIMESTAMP,
  "ip_address" VARCHAR
);

ALTER TABLE "Profiles" ADD FOREIGN KEY ("user_id") REFERENCES "Users" ("user_id");

ALTER TABLE "UserRoles" ADD FOREIGN KEY ("user_id") REFERENCES "Users" ("user_id");

ALTER TABLE "UserRoles" ADD FOREIGN KEY ("role_id") REFERENCES "Roles" ("role_id");

ALTER TABLE "Tickets" ADD FOREIGN KEY ("competition_id") REFERENCES "Competitions" ("competition_id");

ALTER TABLE "Tickets" ADD FOREIGN KEY ("user_id") REFERENCES "Users" ("user_id");

ALTER TABLE "Winners" ADD FOREIGN KEY ("competition_id") REFERENCES "Competitions" ("competition_id");

ALTER TABLE "Winners" ADD FOREIGN KEY ("user_id") REFERENCES "Users" ("user_id");

ALTER TABLE "Payments" ADD FOREIGN KEY ("user_id") REFERENCES "Users" ("user_id");

INSERT INTO "Roles" ("role_name") VALUES ('admin');
INSERT INTO "Roles" ("role_name") VALUES ('user');
INSERT INTO "Roles" ("role_name") VALUES ('moderator');
