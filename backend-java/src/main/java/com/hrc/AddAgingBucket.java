package com.hrc;

import java.io.IOException;
import java.sql.Connection;
import java.sql.Statement;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/addAgingBucket")
public class AddAgingBucket extends HttpServlet {
  private static final long serialVersionUID = 1L;

  protected void doPut(HttpServletRequest request, HttpServletResponse response)
      throws ServletException, IOException {

    String doc_id = request.getParameter("doc_id");
    String aging_bucket = request.getParameter("aging_bucket");
    String[] doc_idSplit = doc_id.split(",");
    String[] aging_bucketSplit = aging_bucket.split(",");

    try {
      Connection conn = Connector.getConnection();
      Statement stmt = conn.createStatement();
      conn.setAutoCommit(false);

      for (int i = 0; i < doc_idSplit.length; i++) {
        String query =
            "UPDATE winter_internship SET aging_bucket = \""
                + aging_bucketSplit[i]
                + "\" WHERE doc_id = "
                + doc_idSplit[i];
        System.out.println(query);
        stmt.addBatch(query);
      }

      int[] count = stmt.executeBatch();
      conn.commit();

      if (count.length == doc_idSplit.length) {
        response.getWriter().append("Predicted successfully");
      } else {
        response.getWriter().append("Failed to Predict");
      }
    } catch (Exception e) {
      e.printStackTrace();
    }
  }
}
