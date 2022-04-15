package com.hrc;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

@WebServlet("/getData")
public class GetData extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		
		String filed = request.getParameter("filed");
		String sort = request.getParameter("sort");
		int limit = Integer.parseInt(request.getParameter("page_size"));
		int page = Integer.parseInt(request.getParameter("page"));
		String doc_id = request.getParameter("doc_id");
		String invoice_id = request.getParameter("invoice_id");
		String cust_number = request.getParameter("cust_number");
		String buisness_year = request.getParameter("buisness_year");

		int offset = limit * page;
		List<String> whereCause = new ArrayList<>();
		StringBuilder queryBuilder = new StringBuilder();
		String whereSt = "";

		queryBuilder.append("SELECT * FROM winter_internship AS wi, customer");
		if (isNotEmpty(doc_id)) {
			whereCause.add("wi.doc_id = " + doc_id);
		}
		if (isNotEmpty(invoice_id)) {
			whereCause.add("wi.invoice_id = " + invoice_id);
		}
		if (isNotEmpty(buisness_year)) {
			whereCause.add("wi.buisness_year = " + buisness_year);
		}
		if (isNotEmpty(cust_number)) {
			whereCause.add("wi.cust_number LIKE '%" + cust_number + "%'");
		}
		if (isNotEmpty(doc_id) || isNotEmpty(invoice_id) || isNotEmpty(buisness_year) || isNotEmpty(cust_number))
			whereSt = " WHERE " + String.join(" AND ", whereCause);

		String cdnSt = whereSt.equals("") ? " WHERE customer.cust_number = wi.cust_number"
				: whereSt + " AND customer.cust_number = wi.cust_number";
		
		String query2 = "SELECT COUNT(*) AS rows_count FROM winter_internship AS wi" + whereSt;

		queryBuilder.append(cdnSt);

		String col_name = isNotEmpty(filed) ? filed.equals("id") ? "sl_no" : filed : "sl_no";
		String order = isNotEmpty(filed) ? sort : "ASC";
		
//		if(isNotEmpty(filed)) {
//			if(filed.equals("id")) {
//				filed = "sl_no";
//			}
//			queryBuilder.append(" ORDER BY wi." + col_name + " " + order);
//		}

		queryBuilder.append(" ORDER BY wi." + col_name + " " + order + " LIMIT " + limit + " OFFSET " + offset);

//		System.out.println(queryBuilder + "\n" + query2);

		Connection conn = null;

		try {
			conn = Connector.getConnection();

			PreparedStatement ps1 = conn.prepareStatement(queryBuilder.toString());
			PreparedStatement ps2 = conn.prepareStatement(query2);
			ResultSet rs1 = ps1.executeQuery();
			ResultSet rs2 = ps2.executeQuery();

			int row_count = rs2.next() ? rs2.getInt("rows_count") : 0;

			List<RegisterPojo> Customers = new ArrayList<>();
			HashMap<String, Object> map = new HashMap<>();
			int ctr = 0, ids = 0;

			while (rs1.next()) {

				if (isNotEmpty(sort) && sort.equals("desc"))
					ids = row_count - ctr - offset;
				else
					ids = ctr + 1 + offset;

				String aging_bucket = isNotEmpty(rs1.getString("aging_bucket")) ? rs1.getString("aging_bucket") : "";

				RegisterPojo customer = new RegisterPojo(ids, rs1.getInt("sl_no"), rs1.getString("business_code"),
						rs1.getInt("cust_number"), rs1.getString("clear_date"), rs1.getInt("buisness_year"),
						rs1.getString("doc_id"), rs1.getString("posting_date"), rs1.getString("document_create_date"),
						rs1.getString("due_in_date"), rs1.getString("invoice_currency"), rs1.getString("document_type"),
						rs1.getInt("posting_id"), rs1.getDouble("total_open_amount"),
						rs1.getString("baseline_create_date"), rs1.getString("cust_payment_terms"),
						rs1.getInt("invoice_id"), aging_bucket, rs1.getString("name_customer"));

				Customers.add(customer);
				ctr++;
			}

			map.put("rows", Customers);
			map.put("count", row_count);

			Gson gson = new Gson();
			String respData = gson.toJson(map);

			response.getWriter().append(respData);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				conn.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
	}

	private boolean isNotEmpty(String str) {
		if (str == null || str.equals("")) {
			return false;
		}
		return true;
	}

}
