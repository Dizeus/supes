CREATE DATABASE supes;

CREATE TABLE heroes (
  id VARCHAR(255) PRIMARY KEY,
  nickname VARCHAR(100),
  real_name VARCHAR(100),
  origin VARCHAR(300),
  superpowers VARCHAR(300),
  phrase VARCHAR(300),
  images VARCHAR(255)[]
);

SELECT * FROM heroes;