export class AppConstent {
  public static HIERACHICAL_LEVELS_LIMIT = 20;

  public static PERMISSION_LIST = [
    {
      id: 0,
      index: "PCAT_RPA",
      name: "Permission"
    }
  ];

  public static DASHBOARD_PERMISSION = 'PERM_VIEW_ALL_DASHBOARD';

  public static UPDATE_ROLE_REASON_ID = 1;
  public static UPDATE_USER_REASON_ID = 2;

  
  public static CUST_ACTIVE = 'ACTIVE';
  public static CUST_TERMINATE = 'TERMINATED';
  public static CUST_FROZEN = 'FROZEN';
  public static UPDATE_CUSTOMER_REASON_ID = 8;
  public static UPDATE_MERCHANT_REASON_ID = 9;
  public static PIN_RESET_CUSTOMER_REASON_ID = 22;
  public static TERMINATE_CUSTOMER_REASON_ID = 23;
  public static UPDATE_AGENT_WALLET_REASON_ID = 11;
  public static PIN_RESET_AGENT_WALLET_REASON_ID = 22;
  public static TERMINATE_AGENT_WALLET_REASON_ID = 35;

}
