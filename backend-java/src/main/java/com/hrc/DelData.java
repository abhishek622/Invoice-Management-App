package com.hrc;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/delData")
public class DelData extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public DelData() {
		super();
	}

	protected void doDelete(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		String sl_no = request.getParameter("sl_no");
		StringBuilder queryBuilder = new StringBuilder();
		String[] strSplit = sl_no.split(",");
		int strLen = strSplit.length;

		queryBuilder.append("DELETE FROM winter_internship WHERE sl_no in (");

		for (int i = 0; i < strLen-1; i++) {
			queryBuilder.append(strSplit[i] + ",");
		}

		queryBuilder.append(strSplit[strLen-1]+")");
//		System.out.println(queryBuilder);

		try {
			Connection conn = Connector.getConnection();

			PreparedStatement ps = conn.prepareStatement(queryBuilder.toString());
			int count = ps.executeUpdate();
			
			if (count == strLen) {
				response.getWriter().append("Customer deleted successfully");
			} else {
				response.getWriter().append("Failed to delete customer");
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
