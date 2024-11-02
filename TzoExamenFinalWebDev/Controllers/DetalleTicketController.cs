using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Data;
using System.Data.SqlClient;
using TzoExamenFinalWebDev.Models;

[Route("DetalleTicket")]
[ApiController]
public class DetalleTicketController : ControllerBase
{
    private readonly DatabaseHelper _dbHelper;

    public DetalleTicketController(DatabaseHelper dbHelper)
    {
        _dbHelper = dbHelper;
    }

    [HttpGet("AddDetalleTicket")]
    public async Task<IActionResult> AddDetalleTicket(int ticketId, string descripcionDetalle)
    {
        DataTable dt = new DataTable();
        using (var connection = _dbHelper.GetConnection())
        {
            try
            {
                using (SqlConnection conn = _dbHelper.GetConnection())
                {
                    conn.Open();
                    SqlDataAdapter da = new SqlDataAdapter();
                    dt = new DataTable();
                    da.SelectCommand = new SqlCommand("CIS_InsertDetalleTicket", conn);
                    da.SelectCommand.CommandTimeout = 30;
                    da.SelectCommand.CommandType = CommandType.StoredProcedure;
                    da.SelectCommand.Parameters.AddWithValue("@TicketId", ticketId);
                    da.SelectCommand.Parameters.AddWithValue("@DescripcionDetalle", descripcionDetalle);
                    da.Fill(dt);
                    conn.Dispose();
                    conn.Close();
                }
            }
            catch (Exception e)
            {

            }
        }
        return this.Content(JsonConvert.SerializeObject(dt), "application/json", System.Text.Encoding.UTF8);
    }

    [HttpGet("GetDetallesByTicket")]
    public async Task<IActionResult> GetDetallesByTicket(int ticketId)
    {
        DataTable dt = new DataTable();
        using (var connection = _dbHelper.GetConnection())
        {
            try
            {
                using (SqlConnection conn = _dbHelper.GetConnection())
                {
                    conn.Open();
                    SqlDataAdapter da = new SqlDataAdapter();
                    dt = new DataTable();
                    da.SelectCommand = new SqlCommand("CIS_GetDetallesByTicket", conn);
                    da.SelectCommand.CommandTimeout = 30;
                    da.SelectCommand.CommandType = CommandType.StoredProcedure;
                    da.SelectCommand.Parameters.AddWithValue("@TicketId", ticketId);
                    da.Fill(dt);
                    conn.Dispose();
                    conn.Close();
                }
            }
            catch (Exception e)
            {

            }
        }
        return this.Content(JsonConvert.SerializeObject(dt), "application/json", System.Text.Encoding.UTF8);
    }


    [HttpGet("UpdateDetallesByTicket")]
    public async Task<IActionResult> UpdateDetallesByTicket(int Id,string DescripcionDetalle)
    {
        DataTable dt = new DataTable();
        using (var connection = _dbHelper.GetConnection())
        {
            try
            {
                using (SqlConnection conn = _dbHelper.GetConnection())
                {
                    conn.Open();
                    SqlDataAdapter da = new SqlDataAdapter();
                    dt = new DataTable();
                    da.SelectCommand = new SqlCommand("CIS_UpdateDetalleTicket", conn);
                    da.SelectCommand.CommandTimeout = 30;
                    da.SelectCommand.CommandType = CommandType.StoredProcedure;
                    da.SelectCommand.Parameters.AddWithValue("@Id", Id);
                    da.SelectCommand.Parameters.AddWithValue("@DescripcionDetalle", DescripcionDetalle);
                    da.Fill(dt);
                    conn.Dispose();
                    conn.Close();
                }
            }
            catch (Exception e)
            {

            }
        }
        return this.Content(JsonConvert.SerializeObject(dt), "application/json", System.Text.Encoding.UTF8);
    }

    [HttpGet("DeleteDetallesByTicket")]
    public async Task<IActionResult> DeleteDetallesByTicket(int Id)
    {
        DataTable dt = new DataTable();
        using (var connection = _dbHelper.GetConnection())
        {
            try
            {
                using (SqlConnection conn = _dbHelper.GetConnection())
                {
                    conn.Open();
                    SqlDataAdapter da = new SqlDataAdapter();
                    dt = new DataTable();
                    da.SelectCommand = new SqlCommand("CIS_DeleteDetalleTicket", conn);
                    da.SelectCommand.CommandTimeout = 30;
                    da.SelectCommand.CommandType = CommandType.StoredProcedure;
                    da.SelectCommand.Parameters.AddWithValue("@Id", Id);
                    da.Fill(dt);
                    conn.Dispose();
                    conn.Close();
                }
            }
            catch (Exception e)
            {

            }
        }
        return this.Content(JsonConvert.SerializeObject(dt), "application/json", System.Text.Encoding.UTF8);
    }
}
