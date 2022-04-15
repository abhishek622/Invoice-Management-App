import { convert_date_to_string } from "./generalFn";

const today_date = convert_date_to_string(new Date());

export const add_customer_initials = {
  business_code: "",
  cust_number: "",
  clear_date: today_date,
  buisness_year: new Date().getFullYear(),
  doc_id: "",
  posting_date: today_date,
  document_create_date: today_date,
  due_in_date: today_date,
  invoice_currency: "USD",
  document_type: "RV",
  posting_id: 1,
  total_open_amount: "",
  baseline_create_date: today_date,
  cust_payment_terms: "",
  invoice_id: "",
};

export const analytics_initials = {
  start_clear_date: "",
  end_clear_date: "",
  start_due_date: "",
  end_due_date: "",
  start_baseline_create_date: "",
  end_baseline_create_date: "",
  invoice_currency: "",
};

export const search_initials = {
  doc_id: "",
  invoice_id: "",
  cust_number: "",
  buisness_year: "",
};
