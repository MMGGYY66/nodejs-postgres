drop database IF exists location;
create database location;

/*\c location;*/

create table address (
  ID SERIAL PRIMARY KEY,
  physical_address TEXT,
  date VARCHAR
);


insert into address (physical_address)
  VALUES ('12, Kimberley Road');