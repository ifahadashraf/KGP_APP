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
    
    public partial class DailyCheckList
    {
        public DailyCheckList()
        {
            this.CheckList_Question = new HashSet<CheckList_Question>();
        }
    
        public long CheckListID { get; set; }
        public string VehicleNumber { get; set; }
        public System.DateTime Date { get; set; }
        public string Reading { get; set; }
    
        public virtual ICollection<CheckList_Question> CheckList_Question { get; set; }
        public virtual Vehicle Vehicle { get; set; }
    }
}
