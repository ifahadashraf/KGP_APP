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
    
    public partial class GET_CHECKLISTS_Result
    {
        public long CheckListID { get; set; }
        public string VehicleNumber { get; set; }
        public System.DateTime Date { get; set; }
        public string Reading { get; set; }
        public string Status { get; set; }
        public Nullable<long> FilledBy { get; set; }
        public Nullable<long> ApprovedBy { get; set; }
        public string FillerName { get; set; }
        public string ApproverName { get; set; }
    }
}