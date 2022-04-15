package com.hrc;

import java.sql.Connection;
import java.sql.DriverManager;

public class Connector {
	static final String jdbcDriver = "com.mysql.cj.jdbc.Driver";
	static final String dbUrl = "jdbc:mysql://localhost:3306/grey_goose";
	static final String user = "root";
	static final String pass = "zoro";
	
	private static java.sql.Connection conn;
	
	public static Connection getConnection() throws Exception{
		try {
			Class.forName(jdbcDriver);
			conn = DriverManager.getConnection(dbUrl,user,pass);
			return conn;
		}catch(Exception e) {
			e.printStackTrace();
		}
		return null;
	}
}
