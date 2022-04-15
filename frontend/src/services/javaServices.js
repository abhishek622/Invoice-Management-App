import axios from "axios";

const BASE_URL = "http://localhost:8080/hrc/";

const getData = async (data) => {
  const response = await axios.get(BASE_URL + "getData", {
    params: {
      filed: data.filed,
      sort: data.sort,
      page_size: data.page_size,
      page: data.page,
      doc_id: data.doc_id,
      invoice_id: data.invoice_id,
      cust_number: data.cust_number,
      buisness_year: data.business_year,
    },
  });
  return response.data;
};

const addData = async (data) => {
  const response = await axios.post(BASE_URL + "addData", null, {
    params: {
      business_code: data.business_code,
      cust_number: data.cust_number,
      clear_date: data.clear_date,
      buisness_year: data.buisness_year,
      doc_id: data.doc_id,
      posting_date: data.posting_date,
      document_create_date: data.document_create_date,
      due_in_date: data.due_in_date,
      invoice_currency: data.invoice_currency,
      document_type: data.document_type,
      posting_id: data.posting_id,
      total_open_amount: data.total_open_amount,
      baseline_create_date: data.baseline_create_date,
      cust_payment_terms: data.cust_payment_terms,
      invoice_id: data.invoice_id,
    },
  });
  return response.data;
};

const editData = async (data) => {
  const response = await axios.put(BASE_URL + "editData", null, {
    params: {
      sl_no: data.sl_no,
      invoice_currency: data.invoice_currency,
      cust_payment_terms: data.cust_payment_terms,
      total_open_amount: data.total_open_amount,
    },
  });
  return response.data;
};

const delData = async (data) => {
  const response = await axios.delete(BASE_URL + "delData", {
    params: {
      sl_no: data,
    },
  });
  return response.data;
};

const analytics = async (data) => {
  const response = await axios.get(BASE_URL + "analytics", {
    params: {
      start_clear_date: data.start_clear_date,
      end_clear_date: data.end_clear_date,
      start_due_date: data.start_due_date,
      end_due_date: data.end_due_date,
      start_baseline_create_date: data.start_baseline_create_date,
      end_baseline_create_date: data.end_baseline_create_date,
      invoice_currency: data.invoice_currency,
    },
  });
  return response.data;
};

const addAgingBucket = async (data) => {
  const response = await axios.put(BASE_URL + "addAgingBucket", null, {
    params: {
      doc_id: data.doc_ids.join(","),
      aging_bucket: data.aging_buckets.join(","),
    },
  });
  return response.data;
};

export { getData, addData, editData, delData, analytics, addAgingBucket };
