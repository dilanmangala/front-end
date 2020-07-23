export const MyTaskHistoryDtvBillChecktemplate = [
  {
    formControlName: "status",
    readOnly: false,
    label: "",
    controlType: "MultiSelectDropDown",
    inputType: "text",
    classes: "col-lg-5",
    data: "",
    default:[],
    validations: null,
      errorMessages: {
      min: "",
      max: "",
      minLength: "Must be at Least 3 Characters",
      maxLength: " Maximum Characters Allowed is 50",
      required: "Task Name is required",
      regex: ""
    }
  }, {
    formControlName: "",
    readOnly: false,
    label: "",
    controlType: "Empty",
    inputType: "text",
    classes: "col-lg-7",
    data: "",
    default:"",
    validations: {
      min: 0,
      max: 0,
      minLength: 0,
      maxLength: 0,
      required: false,
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
    formControlName: "",
    readOnly: false,
    label: "Added Date",
    controlType: "Label",
    inputType: "text",
    classes: "col-lg-4",
    data: "",
    default:"",
    validations: {
      min: 0,
      max: 0,
      minLength: 0,
      maxLength: 0,
      required: false,
      regex: ""
    },  errorMessages: {
      min: "",
      max: "",
      minLength: "Must be at Least 3 Characters",
      maxLength: " Maximum Characters Allowed is 50",
      required: "Task Name is required",
      regex: ""
    }
  },{
    formControlName: "",
    readOnly: false,
    label: "Completed Date",
    controlType: "Label",
    inputType: "text",
    classes: "col-lg-4",
    data: "",
    default:"",
    validations: {
      min: 0,
      max: 0,
      minLength: 0,
      maxLength: 0,
      required: false,
      regex: ""
    },  errorMessages: {
      min: "",
      max: "",
      minLength: "Must be at Least 3 Characters",
      maxLength: " Maximum Characters Allowed is 50",
      required: "Task Name is required",
      regex: ""
    }
  }, {
    formControlName: "",
    readOnly: false,
    label: "Completed Date",
    controlType: "Empty",
    inputType: "text",
    classes: "col-lg-4",
    data: "",
    default:"",
    validations: {
      min: 0,
      max: 0,
      minLength: 3,
      maxLength: 50,
      required: false,
      regex: ""
    },  errorMessages: {
      min: "",
      max: "",
      minLength: "Must be at Least 3 Characters",
      maxLength: " Maximum Characters Allowed is 50",
      required: "Task Name is required",
      regex: ""
    }
  }, {
    formControlName: "AddedDateFrom",
    readOnly: false,
    label: "From",
    controlType: "DatePicker",
    inputType: "date",
    classes: "col-lg-2",
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
  }, {
    formControlName: "AddedDateTo",
    readOnly: false,
    label: "To",
    controlType: "DatePicker",
    inputType: "date",
    classes: "col-lg-2",
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
  }, {
    formControlName: "CompletedDateFrom",
    readOnly: false,
    label: "From",
    controlType: "DatePicker",
    inputType: "date",
    classes: "col-lg-2",
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
  }, {
    formControlName: "CompletedDateTo",
    readOnly: false,
    label: "To",
    controlType: "DatePicker",
    inputType: "date",
    classes: "col-lg-2",
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
  }, {
    formControlName: "",
    readOnly: false,
    label: "Filter",
    controlType: "ActionButton",
    inputType: "text",
    classes: "col-lg-2",
    data: "",
    default:"",
    validations: {
      min: 0,
      max: 100,
      minLength: 0,
      maxLength: 0,
      required: true,
      regex: ""
    },  errorMessages: {
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
    label: "Clear Filter",
    controlType: "CancelButton",
    inputType: "text",
    classes: "col-lg-2",
    data: "",
    default:"",
    validations: {
      min: 0,
      max: 100,
      minLength: 0,
      maxLength: 0,
      required: true,
      regex: ""
    },  errorMessages: {
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
    inputType: "text",
    classes: "col-lg-1",
    data: "",
    default:"",
    icon:"fa fa-download",
    validations: {
      min: 0,
      max: 100,
      minLength: 0,
      maxLength: 0,
      required: true,
      regex: ""
    },  errorMessages: {
      min: "",
      max: "",
      minLength: "",
      maxLength: "",
      required: "",
      regex: ""
    }
  }
];
