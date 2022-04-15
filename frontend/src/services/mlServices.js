import axios from "axios";

const ML_BASE_URL = "http://127.0.0.1:5000/";

const getPrediction = async (doc_ids) => {
  // console.log('getPrediction', {data:[doc_ids]});
  const response = await axios.post(ML_BASE_URL + "get_prediction", {
    data: doc_ids,
  });
  return response.data;
};

const newPrediction = async (data) => {
  const dataToSend = {
    business_code: data.business_code,
    cust_number: data.cust_number,
    name_customer: data.name_customer,
    clear_date: "",
    buisness_year: data.buisness_year,
    doc_id: data.doc_id,
    posting_date: data.posting_date,
    due_in_date: data.due_in_date,
    baseline_create_date: data.baseline_create_date,
    cust_payment_terms: data.cust_payment_terms,
    converted_usd: data.total_open_amount,
  };
  // console.log('newPrediction', dataToSend);
  const response = await axios.post(ML_BASE_URL, dataToSend);
  return response.data;
};

export { getPrediction, newPrediction };
