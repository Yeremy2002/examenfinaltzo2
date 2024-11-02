function addTicket() {
    console.log("addticket")
    const v_usuarioId = 1;
    const v_estadoTicketId = 1;
    const v_descripcion = $('#descripcion').val();
    const v_editar = $('#modal-btn-guardar').val();
    console.log("valor editar"+v_editar)
    if (v_descripcion != null || v_descripcion != '') {
        if (v_editar == null || v_editar == '') {
            $.ajax({
                url: '/Ticket/AddTicket',
                type: 'GET',
                data: { usuarioId: v_usuarioId, estadoTicketId: v_estadoTicketId, descripcion: v_descripcion }, // Coincidir nombres de campos
                success: function () {
                    fetchTickets();
                    $('#ticketForm').trigger('reset');
                    document.getElementById('descripcion').value = ''
                }
            });
        } else {
            UpdateTicket(v_editar)
        }
        
    } else {
        alert('El campo Descripcion esta vacio')
    }

    
    
}

function CargarModalEditar(id,Titulo) {
    document.getElementById('titulomodal').innerHTML = 'Editar Ticket'
    document.getElementById('descripcion').value = Titulo
    document.getElementById('modal-btn-guardar').value = id
}


function CargarModalCrear() {
    document.getElementById('titulomodal').innerHTML = 'Crear Ticket'
    document.getElementById('descripcion').value = ''
    document.getElementById('modal-btn-guardar').value = ''
}



function fetchTickets() {
    $.ajax({
        url: '/Ticket/GetAllTickets',
        type: 'GET',
        success: function (tickets) {
            console.log(tickets)
            $('#ticketsList').empty();
            tickets.forEach(ticket => {
                $('#ticketsList').append(`
                    <tr>
                        <td>${ticket.Id}</td>
                        <td>${ticket.Descripcion}</td>
                        <td>${ticket.UsuarioId}</td>
                        <td>${ticket.Fecha}</td>
                        <td>${ticket.NombreEstado}</td>
                        <td>
                            <div class="btn-group" role="group" aria-label="Basic example">
                              <button type="button" class="btn btn-success btn-sm" onclick="fetchDetalles(${ticket.Id})">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                                    <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/>
                                    <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"/>
                                </svg>
                              </button>
                              <button type="button" class="btn btn-warning btn-sm" data-bs-toggle="modal" data-bs-target="#ModalNuevoTicket" onclick="CargarModalEditar(${ticket.Id},'${ticket.Descripcion}')">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                  <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z"/>
                                </svg>
                              </button>
                              <div class="btn-group" role="group">
                                  <button type="button" class="btn btn-primary btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" >
                                    Estado
                                  </button>
                                  <ul class="dropdown-menu">
                                    <li><a class="dropdown-item" href="#" onclick="UpdateEstadoTicket(${ticket.Id},1)">Abierto</a></li>
                                    <li><a class="dropdown-item" href="#" onclick="UpdateEstadoTicket(${ticket.Id},2)">En Proceso</a></li>
                                    <li><a class="dropdown-item" href="#" onclick="UpdateEstadoTicket(${ticket.Id},3)">Resuelto</a></li>
                                  </ul>
                             </div>
                             <button type="button" class="btn btn-danger btn-sm" onclick="deleteTicket(${ticket.Id})">
                               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                                   <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
                               </svg>
                             </button>
                            </div>
                        </td>
                    </tr>
                `);
            });
        }
    });
}

function deleteTicket(id) {
    console.log("delete: "+id)
    $.ajax({
        url: `/Ticket/DeleteTicket`,
        type: 'GET',
        data: { Id: id},
        success: function () {
            fetchTickets();
        }
    });
}


function UpdateEstadoTicket(id,estado) {
    $.ajax({
        url: `/Ticket/UpdateStatusTicket`,
        type: 'GET',
        data: { Id: id, Estado: estado },
        success: function () {
            fetchTickets();
        }
    });
}

function UpdateTicket(id) {
    console.log("Estay editando el ticket")
    $.ajax({
        url: `/Ticket/UpdateTicket`,
        type: 'GET',
        data: { Id: id, descripcion: $('#descripcion').val() },
        success: function () {
            fetchTickets();
        }
    });
}


fetchTickets();
