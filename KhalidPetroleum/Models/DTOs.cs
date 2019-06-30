using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KhalidPetroleum.Models
{
    public class GroupDetails
    {
        public long GroupId { get; set; }
        public string GroupName { get; set; }
        public List<int> Users { get; set; }
    }
}