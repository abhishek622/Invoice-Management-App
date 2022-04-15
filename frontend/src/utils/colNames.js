
const defaultColumns = [
	{ field: "id", headerName: "Sl No", width: 70 },
	{
		field: "business_code",
		headerName: "Business Code",
		align: "center",
	},
	{
		field: "cust_number",
		headerName: "Customer Number",
		width: 115,
	},
	{
		field: "clear_date",
		headerName: "Clear Date",
		width: 115,
		type: "date",
		headerAlign: "center",
		align: "center",
	},
	{
		field: "buisness_year",
		headerName: "Business Year",
		align: "center",
	},
	{ field: "doc_id", headerName: "Document Id", width: 115 },
	{
		field: "posting_date",
		headerName: "Posting Date",
		width: 115,
		type: "date",
		headerAlign: "center",
		align: "center",
	},
	{
		field: "document_create_date",
		headerName: "Document Create Date",
		width: 130,
		type: "date",
		headerAlign: "center",
		align: "center",
	},
	{
		field: "due_in_date",
		headerName: "Due Date",
		width: 115,
		type: "date",
		headerAlign: "center",
		align: "center",
	},
	{
		field: "invoice_currency",
		headerName: "Invoice Currency",
		align: "center",
	},
	{
		field: "document_type",
		headerName: "Document Type",
		align: "center",
	},
	{
		field: "posting_id",
		headerName: "Posting Id",
		align: "center",
		width: 80,
	},
	{
		field: "total_open_amount",
		headerName: "Total Open Amount",
		type: "number",
		width: 130,
	},
	{
		field: "baseline_create_date",
		headerName: "Baseline Create Date",
		width: 130,
		type: "date",
		headerAlign: "center",
		align: "center",
	},
	{
		field: "cust_payment_terms",
		headerName: "Customer Payment Terms",
		align: "center",
		width: 130,
	},
	{
		field: "invoice_id",
		headerName: "Invoice Id",
		width: 115,
		headerAlign: "center",
	},
	{
		field: "aging_bucket",
		headerName: "Aging Bucket",
		headerAlign: "right",
		align: "right",
		width: 140,
	},
];

export { defaultColumns };
