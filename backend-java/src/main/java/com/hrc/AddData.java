package com.hrc;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/addData")
public class AddData extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public AddData() {
		super();
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		try {
			Connection conn = Connector.getConnection();

			String business_code = request.getParameter("business_code");
			int cust_number = Integer.parseInt(request.getParameter("cust_number"));
			String clear_date = request.getParameter("clear_date");
			int buisness_year = Integer.parseInt(request.getParameter("buisness_year"));
			String doc_id = request.getParameter("doc_id");
			String posting_date = request.getParameter("posting_date");
			String document_create_date = request.getParameter("document_create_date");
			String due_in_date = request.getParameter("due_in_date");
			String invoice_currency = request.getParameter("invoice_currency");
			String document_type = request.getParameter("document_type");
			int posting_id = Integer.parseInt(request.getParameter("posting_id"));
			double total_open_amount = Double.parseDouble(request.getParameter("total_open_amount"));
			String baseline_create_date = request.getParameter("baseline_create_date");
			String cust_payment_terms = request.getParameter("cust_payment_terms");
			int invoice_id = Integer.parseInt(request.getParameter("invoice_id"));

			String colName = "business_code, cust_number, clear_date, buisness_year, doc_id, posting_date ,document_create_date, due_in_date, invoice_currency, document_type, posting_id, total_open_amount, baseline_create_date, cust_payment_terms, invoice_id";
			String query = "INSERT INTO winter_internship (" + colName + ") VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
			PreparedStatement ps = conn.prepareStatement(query);
			ps.setString(1, business_code);
			ps.setInt(2, cust_number);
			ps.setString(3, clear_date);
			ps.setInt(4, buisness_year);
			ps.setString(5, doc_id);
			ps.setString(6, posting_date);
			ps.setString(7, document_create_date);
			ps.setString(8, due_in_date);
			ps.setString(9, invoice_currency);
			ps.setString(10, document_type);
			ps.setInt(11, posting_id);
			ps.setDouble(12, total_open_amount);
			ps.setString(13, baseline_create_date);
			ps.setString(14, cust_payment_terms);
			ps.setInt(15, invoice_id);

			int count = ps.executeUpdate();
			if (count == 1) {
				response.getWriter().append("Customer added successfully");
			} else {
				response.getWriter().append("Failed to add new customer");
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
