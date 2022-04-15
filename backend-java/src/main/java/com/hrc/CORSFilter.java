package com.hrc;

import java.io.IOException;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebFilter(
    asyncSupported = true,
    urlPatterns = {"/CORSFilter"})
public class CORSFilter extends HttpFilter implements Filter {
  private static final long serialVersionUID = 1L;

  public CORSFilter() {
    super();
  }

  public void destroy() {}

  public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
      throws IOException, ServletException {

    HttpServletRequest req = (HttpServletRequest) request;
    System.out.println("CORSFilter HTTP Request: " + req.getMethod());

    ((HttpServletResponse) response).addHeader("Access-Control-Allow-Origin", "*");
    ((HttpServletResponse) response)
        .addHeader("Access-Control-Allow-Methods", "GET, DELETE, PUT, POST");
    ((HttpServletResponse) response).addHeader("Content-Type", "application/json");

    // pass the request along the filter chain
    chain.doFilter(request, response);
  }
}
