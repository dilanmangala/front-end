export const taskSummaryDataTableDtvBillCheck =  {
    primaryColumn: "accountNo",
    columns: [
 {
      sortable: true,
      resizeable: true,
      property: "accountNo",
      header: "Account Number",
      width: "25%"
    }, {
      sortable: true,
      resizeable: true,
      property: "status",
      header: "Bill Status",
      width: "15%"
    }, {
      sortable: true,
      resizeable: true,
      property: "description",
      header: "Mismatch Fields",
      width: "60%"
    }]
  };
