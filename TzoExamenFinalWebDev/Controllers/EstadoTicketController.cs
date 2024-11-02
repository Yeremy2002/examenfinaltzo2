using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;
using TzoExamenFinalWebDev.Models;

[Route("EstadoTicket")]
[ApiController]
public class EstadoTicketController : ControllerBase
{
    private readonly DatabaseHelper _dbHelper;

    public EstadoTicketController(DatabaseHelper dbHelper)
    {
        _dbHelper = dbHelper;
    }

    [HttpGet("AddEstadoTicket")]
    public ActionResult<object> AddEstadoTicket(string nombreEstado)
    {
        using (var connection = _dbHelper.GetConnection())
        {
            var command = new SqlCommand("CIS_InsertEstadoTicket", connection)
            {
                CommandType = CommandType.StoredProcedure
            };
            command.Parameters.AddWithValue("@NombreEstado", nombreEstado);

            connection.Open();
            command.ExecuteNonQuery();
            return Ok("Estado insertado correctamente");
        }
    }


    [HttpGet("GetAllEstadosTicket")]
    public IActionResult GetAllEstadosTicket()
    {
        using (var connection = _dbHelper.GetConnection())
        {
            var command = new SqlCommand("CIS_GetAllEstadosTicket", connection)
            {
                CommandType = CommandType.StoredProcedure
            };

            connection.Open();
            var reader = command.ExecuteReader();
            var estados = new List<object>();

            while (reader.Read())
            {
                estados.Add(new
                {
                    Id = reader.GetInt32(0),
                    NombreEstado = reader.GetString(1)
                });
            }
            return Ok(estados);
        }
    }

    // Similarmente, agrega métodos para actualizar y eliminar estados
}
