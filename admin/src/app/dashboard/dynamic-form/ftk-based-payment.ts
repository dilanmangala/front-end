export const FTKBasedPayment = {
  templateData: [
    {
      formControlName: "vendor",
      readOnly: false,
      label: "File Type",
      controlType: "Dropdown",
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
        required: "File Type is required",
        regex: ""
      }
    },
    {
      formControlName: "task",
      readOnly: false,
      label: "Task Name",
      controlType: "TextBox",
      inputType: "text",
     show:true, classes: "col-lg-4",
      data: "",
      default:"",
      validations: {
        min: 0,
        max: 0,
        minLength: 3,
        maxLength: 50,
        required: true,
        regex: ""
      },  errorMessages: {
        min: "",
        max: "",
        minLength: "Must be at Least 3 Characters",
        maxLength: " Maximum Characters Allowed is 50",
        required: "Task Name is required",
        regex: ""
      }
    },
    {
      formControlName: "Master",
      readOnly: false,
      label: "Master File Upload",
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
      Serviceurl: "/Upload_And_Proceed",
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
