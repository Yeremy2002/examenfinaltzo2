function addDetalle() {
    const v_descripcionDetalle = $('#descripcionDetalle').val();
    const v_ticketId = $('#ticketId').val();
    if (document.getElementById("flexRadioDefault1").checked) {
        console.log("Crear Funciona")

        $.ajax({
            url: '/DetalleTicket/AddDetalleTicket',
            type: 'GET',
            data: { ticketId: v_ticketId, descripcionDetalle: v_descripcionDetalle }, // Coincidir nombres de campos
            success: function () {
                fetchDetalles(v_ticketId);
                $('#detalleForm').trigger('reset');
            }
        });
    }
    else if (document.getElementById("flexRadioDefault2").checked) {
        console.log("Editar Funciona")
        $.ajax({
            url: '/DetalleTicket/UpdateDetallesByTicket',
            type: 'GET',
            data: { Id: document.getElementById('btn-guardar').value, descripcionDetalle: v_descripcionDetalle }, // Coincidir nombres de campos
            success: function () {
                fetchDetalles(v_ticketId);
                $('#detalleForm').trigger('reset');
            }
        });
    }
}

function fetchDetalles(v_ticketId) {
    console.log(ticketId)
    document.getElementById('ticketId').value = v_ticketId
    document.getElementById("flexRadioDefault1").checked = true;
    document.getElementById("flexRadioDefault2").disabled = true;
    document.getElementById("descripcionDetalle").value = '';
    document.getElementById('btn-guardar').value =
    $.ajax({
        url: '/DetalleTicket/GetDetallesByTicket',
        type: 'GET',
        data: { ticketId: v_ticketId },
        success: function (detalles) {
            console.log(detalles)
            $('#detallesList').empty();
            detalles.forEach(detalle => {
                $('#detallesList').append(`
                    <tr>
                        <td>${detalle.Id}</td>
                        <td>${detalle.TicketId}</td>
                        <td>${detalle.DescripcionDetalle}</td>
                        <td>
                            <button class="btn btn-warning btn-sm" onclick="cargarEditar(${detalle.Id},'${detalle.DescripcionDetalle}')"> 
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                  <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z"/>
                                </svg></button>
                            <button class="btn btn-danger btn-sm" onclick="deleteDetalle(${detalle.Id})">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                                   <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
                               </svg>
                            </button>
                        </td>
                    </tr>
                `);
            });
        }
    });
}

function cargarEditar(Id,valor) {
    document.getElementById("flexRadioDefault2").checked = true;
    document.getElementById("flexRadioDefault2").disabled = false;
    document.getElementById("btn-guardar").value = Id;
    document.getElementById("descripcionDetalle").value = valor

}
function cargarCrear() {
    document.getElementById("flexRadioDefault1").checked = true;
    document.getElementById("flexRadioDefault2").disabled = true;
    document.getElementById("btn-guardar").value = '';
    document.getElementById("descripcionDetalle").value = '';

}


function deleteDetalle(id) {
    $.ajax({
        url: `DetalleTicket/DeleteDetallesByTicket`,
        type: 'GET',
        data: { Id: id },
        success: function () {
            fetchDetalles($('#ticketId').val()); // Llama a fetchDetalles con el ticketId que desees mostrar
        }
    });
}



// Llama a fetchDetalles con el ID del ticket que desees mostrar detalles
