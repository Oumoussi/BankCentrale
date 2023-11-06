CREATE TABLE "Accounts" (
  "id" integer PRIMARY KEY,
  "Balance" float,
  "Customer" integer,
  "Agency" integer
);

CREATE TABLE "Agency" (
  "id" integer PRIMARY KEY,
  "City" varchar
);

CREATE TABLE "Customer" (
  "id" integer PRIMARY KEY,
  "Firstname" varchar,
  "Lastname" varchar,
  "PasswordHash" varchar,
  "Email" varchar,
  "PhoneNumber" varchar,
  "Address" varchar,
  "Agency" integer
);

CREATE TABLE "Directors" (
  "id" integer PRIMARY KEY,
  "Firstname" varchar,
  "Lastname" varchar,
  "PasswordHash" varchar,
  "Email" varchar
);

CREATE TABLE "Managers" (
  "id" integer PRIMARY KEY,
  "Firstname" varchar,
  "Lastname" varchar,
  "PasswordHash" varchar,
  "Email" varchar,
  "Agency" integer
);

CREATE TABLE "Transactions" (
  "id" integer PRIMARY KEY,
  "Amount" float,
  "Date" Date,
  "SourceAccount" integer,
  "DestinationAccount" integer,
  "Type" integer,
  "Status" integer,
  "Agency" integer
);

ALTER TABLE "Accounts" ADD FOREIGN KEY ("Agency") REFERENCES "Agency" ("id");

ALTER TABLE "Accounts" ADD FOREIGN KEY ("Customer") REFERENCES "Customer" ("id");

ALTER TABLE "Managers" ADD FOREIGN KEY ("Agency") REFERENCES "Agency" ("id");

ALTER TABLE "Agency" ADD FOREIGN KEY ("id") REFERENCES "Transactions" ("Agency");

ALTER TABLE "Agency" ADD FOREIGN KEY ("id") REFERENCES "Customer" ("Agency");

ALTER TABLE "Managers" ADD FOREIGN KEY ("id") REFERENCES "Directors" ("id");

ALTER TABLE "Accounts" ADD FOREIGN KEY ("id") REFERENCES "Transactions" ("SourceAccount");

ALTER TABLE "Accounts" ADD FOREIGN KEY ("id") REFERENCES "Transactions" ("DestinationAccount");
