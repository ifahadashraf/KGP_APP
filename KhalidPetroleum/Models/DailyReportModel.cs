using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KhalidPetroleum.Models
{
    public class DailyReportModel
    {
        public GET_DAILY_REPORT_BY_DATE_Result report { get; set; }
        public List<GET_SALES_BY_REPORT_ID_Result> sales { get; set; }

        public DailyReportModel(GET_DAILY_REPORT_BY_DATE_Result report, List<GET_SALES_BY_REPORT_ID_Result> sales)
        {
            this.report = report;
            this.sales = sales;
        }

        public DailyReportModel(GET_DAILY_REPORT_BY_DATE_Result report)
        {
            this.report = report;
        }

    }
}