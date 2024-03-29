//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace KhalidPetroleum.Models
{
    using System;
    
    public partial class GET_DAILY_REPORT_BY_DATE_Result
    {
        public long DailyReportID { get; set; }
        public System.DateTime Date { get; set; }
        public string VehicleNumber { get; set; }
        public long DriverID { get; set; }
        public string VCM { get; set; }
        public long DepotID { get; set; }
        public Nullable<int> PurchasedSUP { get; set; }
        public Nullable<int> PurchasedHSD { get; set; }
        public string SUPDropOff { get; set; }
        public Nullable<double> SUPDifferenceRate { get; set; }
        public Nullable<double> SUPDifferenceQuantity { get; set; }
        public string HSDDropOff { get; set; }
        public Nullable<double> HSDDifferenceRate { get; set; }
        public Nullable<double> HSDDifferenceQuantity { get; set; }
        public Nullable<int> ToolExpense { get; set; }
        public Nullable<int> MunshiExpense { get; set; }
        public Nullable<int> ParkingExpense { get; set; }
        public Nullable<int> GuardExpense { get; set; }
        public Nullable<int> MealExpense { get; set; }
        public Nullable<int> OtherExpense { get; set; }
        public Nullable<double> FilledFuelRate { get; set; }
        public Nullable<double> FilledFuelQuantity { get; set; }
        public Nullable<int> OpeningMeter { get; set; }
        public Nullable<int> ClosingMeter { get; set; }
        public Nullable<double> PetrolAverage { get; set; }
        public Nullable<bool> IsVerified { get; set; }
        public string UserName { get; set; }
        public long DepotCode { get; set; }
        public string DepotName { get; set; }
        public string DepotLocation { get; set; }
        public Nullable<bool> DepotStatus { get; set; }
    }
}
