package com.hrc;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/editData")
public class EditData extends HttpServlet {
  private static final long serialVersionUID = 1L;

  protected void doPut(HttpServletRequest request, HttpServletResponse response)
      throws ServletException, IOException {

    String sl_no = request.getParameter("sl_no");
    String invoice_currency = request.getParameter("invoice_currency");
    String cust_payment_terms = request.getParameter("cust_payment_terms");
    String total_open_amount = request.getParameter("total_open_amount");

    try {
      Connection conn = Connector.getConnection();

      String query =
          "UPDATE winter_internship SET invoice_currency = ?, cust_payment_terms = ?,"
              + " total_open_amount = ?, aging_bucket = \"\" WHERE sl_no = ?";
      PreparedStatement ps = conn.prepareStatement(query);
      ps.setString(1, invoice_currency);
      ps.setString(2, cust_payment_terms);
      ps.setString(3, total_open_amount);
      ps.setString(4, sl_no);

      int count = ps.executeUpdate();
      if (count == 1) {
        response.getWriter().append("Customer updated successfully");
      } else {
        response.getWriter().append("Failed to update customer");
      }
    } catch (Exception e) {
      e.printStackTrace();
    }
  }
}
