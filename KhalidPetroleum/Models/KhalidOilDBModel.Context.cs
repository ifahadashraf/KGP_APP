﻿//------------------------------------------------------------------------------
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
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    using System.Data.Entity.Core.Objects;
    using System.Linq;
    
    public partial class KhalidOilDBEntities : DbContext
    {
        public KhalidOilDBEntities()
            : base("name=KhalidOilDBEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<Attendance> Attendances { get; set; }
        public virtual DbSet<CheckList_Question> CheckList_Question { get; set; }
        public virtual DbSet<DailyReportSale> DailyReportSales { get; set; }
        public virtual DbSet<Depot> Depots { get; set; }
        public virtual DbSet<Question> Questions { get; set; }
        public virtual DbSet<UnloadSite> UnloadSites { get; set; }
        public virtual DbSet<Vehicle> Vehicles { get; set; }
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<DailyCheckListImage> DailyCheckListImages { get; set; }
        public virtual DbSet<DailyCheckList> DailyCheckLists { get; set; }
        public virtual DbSet<Task> Tasks { get; set; }
        public virtual DbSet<DailyReport> DailyReports { get; set; }
        public virtual DbSet<Group> Groups { get; set; }
        public virtual DbSet<GroupUser> GroupUsers { get; set; }
        public virtual DbSet<Role> Roles { get; set; }
    
        public virtual ObjectResult<Nullable<decimal>> ADD_DAILY_CHECKLIST(string vehicleno, Nullable<System.DateTime> date)
        {
            var vehiclenoParameter = vehicleno != null ?
                new ObjectParameter("vehicleno", vehicleno) :
                new ObjectParameter("vehicleno", typeof(string));
    
            var dateParameter = date.HasValue ?
                new ObjectParameter("date", date) :
                new ObjectParameter("date", typeof(System.DateTime));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<Nullable<decimal>>("ADD_DAILY_CHECKLIST", vehiclenoParameter, dateParameter);
        }
    
        public virtual ObjectResult<GET_PARENT_COMPANY_RENT_BY_DATE_Result> GET_PARENT_COMPANY_RENT_BY_DATE(Nullable<System.DateTime> toDate, Nullable<System.DateTime> fromDate)
        {
            var toDateParameter = toDate.HasValue ?
                new ObjectParameter("toDate", toDate) :
                new ObjectParameter("toDate", typeof(System.DateTime));
    
            var fromDateParameter = fromDate.HasValue ?
                new ObjectParameter("fromDate", fromDate) :
                new ObjectParameter("fromDate", typeof(System.DateTime));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<GET_PARENT_COMPANY_RENT_BY_DATE_Result>("GET_PARENT_COMPANY_RENT_BY_DATE", toDateParameter, fromDateParameter);
        }
    
        public virtual ObjectResult<GET_SALES_HISTORY_BY_DATE_Result> GET_SALES_HISTORY_BY_DATE(Nullable<int> parentId, Nullable<System.DateTime> toDate, Nullable<System.DateTime> fromDate)
        {
            var parentIdParameter = parentId.HasValue ?
                new ObjectParameter("parentId", parentId) :
                new ObjectParameter("parentId", typeof(int));
    
            var toDateParameter = toDate.HasValue ?
                new ObjectParameter("toDate", toDate) :
                new ObjectParameter("toDate", typeof(System.DateTime));
    
            var fromDateParameter = fromDate.HasValue ?
                new ObjectParameter("fromDate", fromDate) :
                new ObjectParameter("fromDate", typeof(System.DateTime));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<GET_SALES_HISTORY_BY_DATE_Result>("GET_SALES_HISTORY_BY_DATE", parentIdParameter, toDateParameter, fromDateParameter);
        }
    
        public virtual ObjectResult<GET_ALL_USERS_Result> GET_ALL_USERS()
        {
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<GET_ALL_USERS_Result>("GET_ALL_USERS");
        }
    
        public virtual ObjectResult<GET_DAILY_REPORT_BY_DATE_Result> GET_DAILY_REPORT_BY_DATE(Nullable<System.DateTime> from, Nullable<System.DateTime> to)
        {
            var fromParameter = from.HasValue ?
                new ObjectParameter("from", from) :
                new ObjectParameter("from", typeof(System.DateTime));
    
            var toParameter = to.HasValue ?
                new ObjectParameter("to", to) :
                new ObjectParameter("to", typeof(System.DateTime));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<GET_DAILY_REPORT_BY_DATE_Result>("GET_DAILY_REPORT_BY_DATE", fromParameter, toParameter);
        }
    
        public virtual ObjectResult<GET_SALES_BY_REPORT_ID_Result> GET_SALES_BY_REPORT_ID(Nullable<long> report_id)
        {
            var report_idParameter = report_id.HasValue ?
                new ObjectParameter("report_id", report_id) :
                new ObjectParameter("report_id", typeof(long));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<GET_SALES_BY_REPORT_ID_Result>("GET_SALES_BY_REPORT_ID", report_idParameter);
        }
    
        public virtual ObjectResult<GET_ALL_TASKS_Result> GET_ALL_TASKS()
        {
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<GET_ALL_TASKS_Result>("GET_ALL_TASKS");
        }
    
        public virtual ObjectResult<GET_ALL_TASKS_BY_OWNER_ID_Result> GET_ALL_TASKS_BY_OWNER_ID(Nullable<long> id)
        {
            var idParameter = id.HasValue ?
                new ObjectParameter("id", id) :
                new ObjectParameter("id", typeof(long));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<GET_ALL_TASKS_BY_OWNER_ID_Result>("GET_ALL_TASKS_BY_OWNER_ID", idParameter);
        }
    
        public virtual ObjectResult<GET_CHECKLISTS_Result> GET_CHECKLISTS()
        {
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<GET_CHECKLISTS_Result>("GET_CHECKLISTS");
        }
    
        public virtual ObjectResult<GET_VEHICLE_CHECKLISTS_Result> GET_VEHICLE_CHECKLISTS(string from, string to, string vehicle_number)
        {
            var fromParameter = from != null ?
                new ObjectParameter("from", from) :
                new ObjectParameter("from", typeof(string));
    
            var toParameter = to != null ?
                new ObjectParameter("to", to) :
                new ObjectParameter("to", typeof(string));
    
            var vehicle_numberParameter = vehicle_number != null ?
                new ObjectParameter("vehicle_number", vehicle_number) :
                new ObjectParameter("vehicle_number", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<GET_VEHICLE_CHECKLISTS_Result>("GET_VEHICLE_CHECKLISTS", fromParameter, toParameter, vehicle_numberParameter);
        }
    
        public virtual ObjectResult<GET_USERS_ACTIVE_TASKS_Result> GET_USERS_ACTIVE_TASKS()
        {
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<GET_USERS_ACTIVE_TASKS_Result>("GET_USERS_ACTIVE_TASKS");
        }
    
        public virtual ObjectResult<GET_USER_TASKS_BY_USER_ID_Result> GET_USER_TASKS_BY_USER_ID(Nullable<long> userid)
        {
            var useridParameter = userid.HasValue ?
                new ObjectParameter("userid", userid) :
                new ObjectParameter("userid", typeof(long));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<GET_USER_TASKS_BY_USER_ID_Result>("GET_USER_TASKS_BY_USER_ID", useridParameter);
        }
    
        public virtual ObjectResult<GET_GROUPS_ACTIVE_TASKS_Result> GET_GROUPS_ACTIVE_TASKS()
        {
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<GET_GROUPS_ACTIVE_TASKS_Result>("GET_GROUPS_ACTIVE_TASKS");
        }
    
        public virtual ObjectResult<GET_GROUP_TASKS_BY_GROUP_ID_Result> GET_GROUP_TASKS_BY_GROUP_ID(Nullable<long> groupid)
        {
            var groupidParameter = groupid.HasValue ?
                new ObjectParameter("groupid", groupid) :
                new ObjectParameter("groupid", typeof(long));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<GET_GROUP_TASKS_BY_GROUP_ID_Result>("GET_GROUP_TASKS_BY_GROUP_ID", groupidParameter);
        }
    }
}
