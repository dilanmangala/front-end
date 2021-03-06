export const DMSSAPReconciliation = {
  templateData: [
    {
      formControlName: "taskName",
      readOnly: false,
      label: "Task Name",
      controlType: "TextBox",
      inputType: "text",
      show: true,
      classes: "col-lg-4",
      data: "",
      default: "",
      validations: {
        min: 0,
        max: 0,
        minLength: 3,
        maxLength: 50,
        required: true,
        regex: ""
      },
      errorMessages: {
        min: "",
        max: "",
        minLength: "Must be at Least 3 Characters",
        maxLength: " Maximum Characters Allowed is 50",
        required: "Task Name is required",
        regex: ""
      }
    },
    {
      formControlName: "invoiceType",
      readOnly: true,
      label: "Invoice  Type",
      controlType: "Dropdown",
      inputType: "",
      show: true,
      classes: "col-lg-4",
      data: "",
      default: 0,
      validations: {
        min: 0,
        max: 0,
        minLength:0,
        maxLength:0,
        required: true,
        regex: ""
      },
      errorMessages: {
        min: "",
        max: "",
        minLength: "",
        maxLength: "",
        required: "Invoice Type is required",
        regex: ""
      }
    },
    {
      formControlName: "bankStatment",
      readOnly: false,
      label: "Bank Statement",
      controlType: "FileUploader",
      accept:
        "application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      inputType: "file",
      show: true,
      classes: "col-lg-4",
      data: "",
      default: "",
      validations: {
        min: 0,
        max: 1048576,
        minLength: 0,
        maxLength: 0,
        required: true,
        format: [".xlsx"],
        name: "Bank Statement.xlsx",
        regex: ""
      },
      errorMessages: {
        min: "",
        max: "Maximum File Size Exceeded",
        minLength: "",
        maxLength: "",
        required: "File Required",
        format: "Invalid File Type",
        regex: "",
        name: "Invalid File Name"
      }
    },
    {
      formControlName: "creditLimit",
      readOnly: false,
      label: "Credit Limit",
      controlType: "FileUploader",
      accept:
        "application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      inputType: "file",
      show: true,
      classes: "col-lg-4",
      data: "",
      default: "",
      validations: {
        min: 0,
        max: 524288,
        minLength: 0,
        maxLength: 0,
        required: true,
        format: [".xlsx"],
        name: "Credit Limit.xlsx",
        regex: ""
      },
      errorMessages: {
        min: "",
        max: "Maximum File Size Exceeded",
        minLength: "",
        maxLength: "",
        required: "File Required",
        format: "Invalid File Type",
        name: "Invalid File Name",
        regex: ""
      }
    },
    {
      formControlName: "",
      readOnly: false,
      label: "",
      controlType: "Empty",
      inputType: "text",
      show: true,
      classes: "col-lg-8",
      data: "",
      icon: "",
      url: "",
      default: "",
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
      label: "",
      controlType: "Br",
      inputType: "text",
      show: true,
      classes: "",
      data: "",
      icon: "",
      url: "",
      default: 4,
      validations: null,
      errorMessages: null
    },
    {
      formControlName: "",
      readOnly: false,
      label: "",
      controlType: "Br",
      inputType: "text",
      show: true,
      classes: "",
      data: "",
      icon: "",
      url: "",
      default: 4,
      validations: null,
      errorMessages: null
    },
    {
      formControlName: "",
      readOnly: false,
      label: "",
      controlType: "Br",
      inputType: "text",
      show: true,
      classes: "",
      data: "",
      icon: "",
      url: "",
      default: 4,
      validations: null,
      errorMessages: null
    },
    {
      formControlName: "",
      readOnly: false,
      label: "",
      controlType: "Br",
      inputType: "text",
      show: true,
      classes: "",
      data: "",
      icon: "",
      url: "",
      default: 4,
      validations: null,
      errorMessages: null
    },
    {
      formControlName: "",
      readOnly: false,
      label: "",
      controlType: "Br",
      inputType: "text",
      show: true,
      classes: "",
      data: "",
      icon: "",
      url: "",
      default: 4,
      validations: null,
      errorMessages: null
    },
    {
      formControlName: "",
      readOnly: false,
      label: "",
      controlType: "Empty",
      inputType: "text",
      show: true,
      classes: "col-lg-7",
      data: "",
      icon: "",
      url: "",
      default: "",
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
      label: "Start Bill Checking Process",
      id: "ProcessStart",
      isPassFormData: false,
      controlType: "ActionButton",
      validateAllFormFields: true,
      Serviceurl: "/dms-sap",
      Navigateurl: "",
      inputType: "text",
      show: true,
      classes: "col-lg-4",
      data: "",
      icon: "",
      url: "",
      default: "",
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
      label: "Cancel",
      id: "cancel",
      isPassFormData: false,
      controlType: "CancelButton",
      validateAllFormFields: false,
      Serviceurl: "",
      Navigateurl: "/dashboard/dashboard",
      inputType: "text",
      show: true,
      classes: "col-lg-1",
      data: "",
      icon: "",
      url: "",
      default: "",
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
    }
  ],
  dependOn: [
    {
      formControlName: "invoiceType",
      dependancies: [
        {
          formControlName: "creditLimit",
          hide: ["EZ_CASH"],
          show: ["CASH_CREDIT"],
          validation: [],
          errorMessages: []
        }
      ]
    }
  ]
};
