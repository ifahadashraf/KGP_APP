using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KhalidPetroleum.Models
{
    public class CheckListArray
    {
        public int questionID { get; set; }
        public string question { get; set; }
        public bool status { get; set; }
    }

    public class CheckListModel
    {
        public long FilledBy { get; set; }
        public String VehicleNumber { get; set; }
        public System.DateTime Date { get; set; }
        public string DriverName { get; set; }
        public Nullable<long> OpeningReading { get; set; }
        public List<CheckListArray> list { get; set; }
        public List<String> ListOfImages { get; set; }
        public List<String> tasks { get; set; }
    }
}