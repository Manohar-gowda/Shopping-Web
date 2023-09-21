CREATE DATABASE IF NOT EXISTS shopweb;

USE shopweb;
 
CREATE TABLE IF NOT EXISTS user (

  name varchar(25) NOT NULL,
  email varchar(25) NOT NULL,
  password varchar(300) NOT NULL,
  number BIGINT NOT NULL
  
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
 


/*seller data*/


CREATE TABLE if NOT EXISTS seller (

  name varchar(25) NOT NULL,
  about char(200) NOT NULL ,
  address char(100) NOT NULL,
  number BIGINT NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

SELECT * FROM seller;




 

 
 

