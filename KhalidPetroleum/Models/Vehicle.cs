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
    using System.Collections.Generic;
    
    public partial class Vehicle
    {
        public Vehicle()
        {
            this.DailyReports = new HashSet<DailyReport>();
            this.DailyCheckLists = new HashSet<DailyCheckList>();
        }
    
        public string VehicleNumber { get; set; }
        public int VehicleModel { get; set; }
        public string VehicleCompany { get; set; }
        public string VehicleType { get; set; }
        public string VehicleCurrentReading { get; set; }
        public string VehicleExpectedChange { get; set; }
        public Nullable<bool> Status { get; set; }
    
        public virtual ICollection<DailyReport> DailyReports { get; set; }
        public virtual ICollection<DailyCheckList> DailyCheckLists { get; set; }
    }
}
