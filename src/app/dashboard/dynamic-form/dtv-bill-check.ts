export const DtvBillChecktemplate = {
  templateData: [
  {
     formControlName: "taskName",
     readOnly: false,
     label: "Task Name",
     controlType: "TextBox",
     inputType: "text",
     classes: "col-lg-4",
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
     formControlName: "monthYear",
     readOnly: true,
     label: "Year/Month",
     controlType: "MonthPicker",
     inputType: "",
     classes: "col-lg-4",
     data: "",
     default:0,
     validations: {
       min: 0,
       max: 0,
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
     formControlName: "file",
     readOnly: false,
     label: "Account Numbers",
     controlType: "FileUploader",
     inputType: "file",
     classes: "col-lg-4",
     accept:"application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
     data: "",
     default:"",
     validations: {
       min: 0,
       max: 1048576,
       minLength: 0,
       maxLength: 0,
       required: true,
       format:".xlsx",
       regex: ""
     },  errorMessages: {
       min: "",
       max: "Maximum File Size Exceeded",
       minLength: "",
       maxLength: "",
       required: "File Required",
       format:"Invalid File Type",
       regex: ""
     }
   },
   {
     formControlName: "",
     readOnly: false,
     label: "",
     controlType: "Empty",
     inputType: "text",
     classes: "col-lg-8",
     data: "",
     icon:"",
     url:"",
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
   } },
    {
     formControlName: "",
     readOnly: false,
     label: "",
     controlType: "Br",
     inputType: "text",
     classes: "",
     data: "",
     icon:"",
     url:"",
     default:4,
     validations:null,  errorMessages: null
   },{
     formControlName: "",
     readOnly: false,
     label: "",
     controlType: "Br",
     inputType: "text",
     classes: "",
     data: "",
     icon:"",
     url:"",
     default:4,
     validations:null,  errorMessages: null
   }, {
        formControlName: "",
        readOnly: false,
        label: "",
        controlType: "Empty",
        inputType: "text",
        classes: "col-lg-7",
        data: "",
        icon:"",
        url:"",
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
      } },
     {
      formControlName: "",
      readOnly: false,
      label: "Start Bill Checking Process",
      id:"ProcessStart",
        isPassFormData:false,
      controlType: "ActionButton",
      validateAllFormFields: true,
       Serviceurl:"http://172.26.30.209:8082/billcheck/dtv",
      Navigateurl:"",
      inputType: "text",
      classes: "col-lg-4",
      data: "",
      icon:"",
      url:"",
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
    }, {
      formControlName: "",
      readOnly: false,
      label: "Cancel",
      id:"cancel",
      isPassFormData:false,
      controlType: "CancelButton",
     validateAllFormFields: false,
      Serviceurl:"",
      Navigateurl:"/dashboard/dashboard",
      inputType: "text",
      classes: "col-lg-1",
      data: "",
      icon:"fa fa-download",
      url:"",
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
    } ]};
