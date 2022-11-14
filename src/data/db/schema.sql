-- import to SQLite by running: sqlite3.exe db.sqlite3 -init sqlite.sql

PRAGMA journal_mode = MEMORY;
PRAGMA synchronous = OFF;
PRAGMA foreign_keys = OFF;
PRAGMA ignore_check_constraints = OFF;
PRAGMA auto_vacuum = NONE;
PRAGMA secure_delete = OFF;
BEGIN TRANSACTION;


CREATE TABLE `user` (
`user_id` TEXT PRIMARY KEY,
`name` TEXT NOT NULL,
);

CREATE TABLE `room` (
`room_id` TEXT PRIMARY KEY,
`max_users` INT NOT NULL,
`game` TEXT
);

CREATE  TABLE "room_users" 
(
    "LESSONID"  INTEGER PRIMARY KEY NOT NULL,
    "MODULEID"  INTEGER FOREIGN KEY (MODULEID)  REFERENCES MODULES(MODULEID),
    "STUDENTID" INTEGER FOREIGN KEY (STUDENTID) REFERENCES STUDENTS(STUDENTID)
)


COMMIT;
PRAGMA ignore_check_constraints = ON;
PRAGMA journal_mode = WAL;
PRAGMA synchronous = NORMAL;
