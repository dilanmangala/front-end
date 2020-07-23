export const PrepaidPaymentReversal = {
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
        max: 999999999999999999999999999999999999999999999999999999999,
        minLength: 3,
        maxLength: 50,
        required: true,
        regex: "[a-zA-Z0-9-_]*"
      },
      errorMessages: {
        min: "",
        max: "",
        minLength: "Must be at Least 3 Characters",
        maxLength: " Maximum Characters Allowed is 50",
        required: "Task Name Required",
        regex: "Task Name Invalid"
      }
    },
    {
      formControlName: "fromDate",
      readOnly: true,
      label: "Begin Date",
      controlType: "Calender",
      default:'current',
      inputType: "",
      show: true,
      classes: "col-lg-4",
      data: "",
      validations: {
        min: 0,
        max: 0,
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
        required: "Begin Date Required",
        regex: ""
      }
    },
    {
      formControlName: "toDate",
      readOnly: true,
      label: "End Date",
      controlType: "Calender",
      default:'current',
      accept: "",
      inputType: "",
      show: true,
      classes: "col-lg-4",
      data: "",
      validations: {
        min: 0,
        max: 1048576,
        minLength: 0,
        maxLength: 0,
        required: true,
        regex: ""
      },
      errorMessages: {
        min: "",
        max: "Maximum File Size Exceeded",
        minLength: "",
        maxLength: "",
        required: "File Required",
        format: "Invalid File Type",
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
      label: "Initiate Process",
      id: "ProcessStart",
      isPassFormData: false,
      controlType: "ActionButton",
      validateAllFormFields: true,
      Serviceurl: "/prepaid-reversal",
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
  dependOn: []
};
