export const TaskSummaryDtvBillChecktemplate = {
  templateData: [
    {
      formControlName: "taskId",
      readOnly: true,
      label: "Task Id",
      controlType: "TextBox",
      inputType: "text",
      show: true,
      classes: "col-lg-1",
      data: "",
      default: "",
      validations: null,
      errorMessages: null
    },
    {
      formControlName: "description",
      readOnly: true,
      label: "Description",
      controlType: "TextBox",
      inputType: "text",
      show: true,
      classes: "col-lg-2",
      data: "",
      default: "",
      validations: null,
      errorMessages: null
    },
    {
      formControlName: "status",
      readOnly: true,
      label: "Status",
      controlType: "TextBox",
      inputType: "text",
      show: true,
      classes: "col-lg-2",
      data: "",
      default: "",
      validations: null,
      errorMessages: null
    },
    {
      formControlName: "completedDate",
      readOnly: true,
      label: "Completed Date",
      controlType: "TextBox",
      inputType: "date",
      show: true,
      classes: "col-lg-3",
      data: "",
      default: "",
      validations: null,
      errorMessages: null
    },
    {
      formControlName: "PDFExcelToggle",
      readOnly: false,
      label: "",
      controlType: "toggleButton",
      inputType: "text",
      show: true,
      classes: "col-lg-2",
      data: "",
      default: "Details_pdf",
      icon: "fa fa-download",
      validations: {
        min: 0,
        max: 100,
        minLength: 0,
        maxLength: 0,
        required: true,
        regex: ""
      },
      errorMessages: {
        min: "",
        max: "",
        minLength: "",
        maxLength: "",
        required: "",
        regex: ""
      }
    },
    {
      formControlName: "",
      readOnly: false,
      label: "Download",
      controlType: "PrimaryButton",
      id: "PdfExcelDownload",
      parameter: "PDFExcelToggle",
      serviceInput:["taskId"],
      inputType: "text",
      show: true,
      serviceurl: "/taskdetail/",
      isDownload: true,
      classes: "col-lg-1",
      type:[{
        name:"Details_pdf", format:"application/pdf", ext:'pdf'},{
          name:"Details_Excel",
          format:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          ext:'xlsx'
        }],
      data: "",
      default: "",
      icon: "fa fa-download",
      validations: {
        min: 0,
        max: 100,
        minLength: 0,
        maxLength: 0,
        required: true,
        regex: ""
      },
      errorMessages: {
        min: "",
        max: "",
        minLength: "",
        maxLength: "",
        required: "",
        regex: ""
      }
    },
    {
      formControlName: "recordCount",
      readOnly: true,
      label: "Total Number of Records  :",
      controlType: "DetailLabel",
      inputType: "text",
      show: true,
      classes: "col-lg-6",
      data: "",
      default: "",
      validations: null,
      errorMessages: null
    },
    {
      formControlName: "successCount",
      readOnly: true,
      label: "Total Number of Successful Records     :",
      controlType: "DetailLabel",
      inputType: "text",
      show: true,
      classes: "col-lg-6",
      data: "",
      default: "",
      validations: null,
      errorMessages: null
    },
    {
      formControlName: "errorCount",
      readOnly: true,
      label: "Total Number of Erroneous Records    :",
      controlType: "DetailLabel",
      inputType: "text",
      show: true,
      classes: "col-lg-6",
      data: "",
      default: "",
      validations: null,
      errorMessages: null
    },
    {
      formControlName: "failedCount",
      readOnly: true,
      label: "Total Number of Failed Records                    :",
      controlType: "DetailLabel",
      inputType: "text",
      show: true,
      classes: "col-lg-6",
      data: "",
      default: "",
      validations: null,
      errorMessages: null
    }
  ],
  dependOn: [
    {
      formControlName: "status",
      dependancies: [
        {
          formControlName: "completedDate",
          hide: ["Pending", "Processing","PROCESSING","PENDING"],
          show: ["Completed","COMPLETED"],
          validation: [],
          errorMessages: []
        }
      ]
    }
  ]
};
