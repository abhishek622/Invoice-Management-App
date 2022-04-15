package com.hrc;

import com.google.gson.Gson;
import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.*;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/analytics")
public class Analytics extends HttpServlet {
  private static final long serialVersionUID = 1L;

  public Analytics() {
    super();
  }

  protected void doGet(HttpServletRequest request, HttpServletResponse response)
      throws ServletException, IOException {

    String start_clear_date = request.getParameter("start_clear_date");
    String end_clear_date = request.getParameter("end_clear_date");
    String start_due_date = request.getParameter("start_due_date");
    String end_due_date = request.getParameter("end_due_date");
    String start_baseline_create_date = request.getParameter("start_baseline_create_date");
    String end_baseline_create_date = request.getParameter("end_baseline_create_date");
    String invoice_currency = request.getParameter("invoice_currency");

    List<String> whereCause = new ArrayList<>();
    StringBuilder queryBuilder = new StringBuilder();

    queryBuilder.append(
        "SELECT business_name, SUM(total_open_amount) AS total_open_amount, invoice_currency,"
            + " COUNT(invoice_currency) AS no_of_customers FROM business, winter_internship AS wi");
    if (isNotEmpty(start_clear_date)) {
      whereCause.add(
          "(wi.clear_date BETWEEN '" + start_clear_date + "' AND '" + end_clear_date + "')");
    }

    if (isNotEmpty(start_due_date)) {
      whereCause.add(
          "(wi.due_in_date BETWEEN '" + start_due_date + "' AND '" + end_due_date + "')");
    }
    if (isNotEmpty(start_baseline_create_date)) {
      whereCause.add(
          "(wi.baseline_create_date BETWEEN '"
              + start_baseline_create_date
              + "' AND '"
              + end_baseline_create_date
              + "')");
    }
    if (isNotEmpty(invoice_currency)) {
      whereCause.add("(wi.invoice_currency = '" + invoice_currency + "')");
    }

    queryBuilder.append(
        " WHERE "
            + String.join(" AND ", whereCause)
            + " AND business.business_code = wi.business_code GROUP BY wi.business_code");

    //		System.out.println(queryBuilder);

    ArrayList<String> labels = new ArrayList<>();
    ArrayList<Double> totalOpenAmount = new ArrayList<>();
    ArrayList<Integer> noOfCustomers = new ArrayList<>();
    int[] invoiceCurrency = new int[2];
    int usd = 0, cad = 0;

    HashMap<String, Object> map = new HashMap<>();

    Connection conn = null;

    try {
      conn = Connector.getConnection();

      PreparedStatement ps = conn.prepareStatement(queryBuilder.toString());

      ResultSet rs = ps.executeQuery();

      while (rs.next()) {

        labels.add(rs.getString("business_name"));
        double amt = rs.getDouble("total_open_amount") / 100000;
        totalOpenAmount.add(amt);
        if (rs.getString("invoice_currency").equals("CAD")) {
          cad += rs.getInt("no_of_customers");
        } else {
          usd += rs.getInt("no_of_customers");
        }
        noOfCustomers.add(rs.getInt("no_of_customers"));
      }

      invoiceCurrency[0] = usd;
      invoiceCurrency[1] = cad;

      map.put("labels", labels);
      map.put("total_open_amount", totalOpenAmount);
      map.put("invoice_currency", invoiceCurrency);
      map.put("no_of_customers", noOfCustomers);

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
    if (str == null | str.equals("")) {
      return false;
    }
    return true;
  }
}
