using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Data;
using System.Data.SqlClient;
using System.Security.Claims;
using TzoExamenFinalWebDev.Models;

[Route("Ticket")]
[ApiController]
public class TicketController : ControllerBase
{
    private readonly DatabaseHelper _dbHelper;

    public TicketController(DatabaseHelper dbHelper)
    {
        _dbHelper = dbHelper;
    }

    [HttpGet("AddTicket")]
    public IActionResult AddTicket(int usuarioId, int estadoTicketId, string descripcion)
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
                    da.SelectCommand = new SqlCommand("CIS_InsertTicket", conn);
                    da.SelectCommand.CommandTimeout = 30;
                    da.SelectCommand.CommandType = CommandType.StoredProcedure;
                    da.SelectCommand.Parameters.AddWithValue("@UsuarioId", usuarioId);
                    da.SelectCommand.Parameters.AddWithValue("@EstadoTicketId", estadoTicketId);
                    da.SelectCommand.Parameters.AddWithValue("@Descripcion", descripcion);
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

    [HttpGet("GetAllTickets")]
    public async Task<IActionResult> GetAllTickets()
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
                    da.SelectCommand = new SqlCommand("CIS_GetAllTickets", conn);
                    da.SelectCommand.CommandTimeout = 30;
                    da.SelectCommand.CommandType = CommandType.StoredProcedure;
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




    [HttpGet("UpdateTicket")]
    public IActionResult UpdateTicket(int Id, string descripcion)
    {
        using (var connection = _dbHelper.GetConnection())
        {
            var command = new SqlCommand("CIS_UpdateTicket", connection)
            {
                CommandType = CommandType.StoredProcedure
            };
            command.Parameters.AddWithValue("@Id", Id);
            command.Parameters.AddWithValue("@Descripcion", descripcion);

            connection.Open();
            command.ExecuteNonQuery();
            return Ok("Ticket Actualizado correctamente");
        }
    }


    [HttpGet("DeleteTicket")]
    public IActionResult DeleteTicket(int Id)
    {
        using (var connection = _dbHelper.GetConnection())
        {
            var command = new SqlCommand("CIS_DeleteTicket", connection)
            {
                CommandType = CommandType.StoredProcedure
            };
            command.Parameters.AddWithValue("@Id", Id);

            connection.Open();
            command.ExecuteNonQuery();
            return Ok("Ticket Eliminado correctamente");
        }
    }


    [HttpGet("UpdateStatusTicket")]
    public IActionResult UpdateStatusTicket(int Id,int Estado)
    {
        using (var connection = _dbHelper.GetConnection())
        {
            var command = new SqlCommand("CIS_UpdateEstadoTicket", connection)
            {
                CommandType = CommandType.StoredProcedure
            };
            command.Parameters.AddWithValue("@Id", Id);
            command.Parameters.AddWithValue("@Estado", Estado);

            connection.Open();
            command.ExecuteNonQuery();
            return Ok("Ticket Eliminado correctamente");
        }
    }





}
