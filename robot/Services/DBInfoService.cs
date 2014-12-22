using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Linq.Expressions;
using robot.Models;

namespace robot.Services
{
    public class DBInfoService
    {
        public Dictionary<string, string> DBs { get; set; }
        public List<StoredProcDetail> StoredProcs { get; set; }

        ///////////////////////////////////////////////////////////////////////////////////////////

        public DBInfoService Init()
        {
            DBConnectionStringsToDictionary();
            LoadStoredProcDetails();
            return this;
        }

        ///////////////////////////////////////////////////////////////////////////////////////////

        protected void LoadStoredProcDetails()
        {
            StoredProcs = new List<StoredProcDetail>();

            foreach (var db in DBs.Keys)
            {
                using (var sqlConnection = new SqlConnection(DBs[db]))
                {
                    sqlConnection.Open();
                    var storedProcs = sqlConnection.GetSchema("Procedures", new string[] { db });
                    var storedProcParams = sqlConnection.GetSchema("ProcedureParameters", new string[] { db });

                    foreach (DataRow storedProc in storedProcs.Rows)
                    {
                        var spName = storedProc["SPECIFIC_CATALOG"].ToString() + "." + storedProc["SPECIFIC_SCHEMA"].ToString() + "." + storedProc["SPECIFIC_NAME"].ToString();

                        var spParams = new List<Column>();
                        foreach (DataRow param in storedProcParams.Rows)
                            if (param["SPECIFIC_NAME"].ToString() == storedProc["SPECIFIC_NAME"].ToString())
                                spParams.Add(new Column() { Name = param["PARAMETER_NAME"].ToString(), Type = param["DATA_TYPE"].ToString(), Nullable = true });

                        StoredProcs.Add(new StoredProcDetail() { DB = db, Name = spName, Input = spParams, Output = new List<Column>() });
                    }
                }
            }
        }

        ///////////////////////////////////////////////////////////////////////////////////////////

        protected void DBConnectionStringsToDictionary()
        {
            DBs = new Dictionary<string, string>();

            foreach (var connectionString in ConfigurationManager.ConnectionStrings)
            {
                var db = CalcDBFromConnectionString(connectionString.ToString());
                if (db != "")
                    DBs.Add(db, connectionString.ToString());
            }
        }

        protected string CalcDBFromConnectionString(string connectionString)
        {
            var db = "";
            connectionString = connectionString.ToLower();
            var searchTerm = "initial catalog=";
            var i = connectionString.IndexOf(searchTerm);
            if (i >= 0)
            {
                connectionString = connectionString.Substring(i + searchTerm.Length);
                i = connectionString.IndexOf(";");
                if (i >= 0)
                    db = connectionString.Substring(0, i).Trim();
            }

            return db;
        }

        ///////////////////////////////////////////////////////////////////////////////////////////

        public StoredProcDetail GetDetail(StoredProcDetail storedProcDetail)
        {
            using (var sqlConnection = new SqlConnection(DBs[storedProcDetail.DB]))
            {
                sqlConnection.Open();
                storedProcDetail.Output = StoredProcDetail(sqlConnection, storedProcDetail.Name, storedProcDetail.Input);
            }

            return storedProcDetail;
        }

        public List<Column> StoredProcDetail(SqlConnection sqlConnection, string sp, List<Column> spParams)
        {
            var result = new List<Column>();

            try
            {
                SqlCommand cmd = new SqlCommand(sp, sqlConnection);
                cmd.CommandType = CommandType.StoredProcedure;
                spParams.ForEach(param => cmd.Parameters.AddWithValue(param.Name, null));
                DataTable schema = null;
                using (SqlDataReader reader = cmd.ExecuteReader(CommandBehavior.SchemaOnly))
                {
                    schema = reader.GetSchemaTable();
                    reader.Close();
                }

                if (schema != null)
                    foreach (DataRow row in schema.Rows)
                        result.Add(new Column() { Name = row["ColumnName"].ToString(), Type = row["DataType"].ToString(), Nullable = (bool)row["AllowDBNull"] });
            }
            catch (Exception ex) { }

            return result;
        }
    }
}