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
    
    public partial class Role
    {
        public Role()
        {
            this.Users = new HashSet<User>();
        }
    
        public long RoleID { get; set; }
        public string RoleName { get; set; }
        public bool isMNVehicles { get; set; }
        public bool isMNStaff { get; set; }
        public bool isMNDeliverySites { get; set; }
        public bool isHVehicleChecklist { get; set; }
        public bool isHSalePurchase { get; set; }
        public bool isHAttendance { get; set; }
        public bool isHMaintenance { get; set; }
        public bool isHTaskMng { get; set; }
        public bool isHRent { get; set; }
        public bool isHPettyCash { get; set; }
        public bool isHCash { get; set; }
        public bool isHPayments { get; set; }
    
        public virtual ICollection<User> Users { get; set; }
    }
}
