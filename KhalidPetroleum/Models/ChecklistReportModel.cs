using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KhalidPetroleum.Models
{
    public class ChecklistReportModel
    {
        public DateTime ChecklistDate { get; set; }
        public List<GET_VEHICLE_CHECKLISTS_Result> Checklist { get; set; }
    }
}