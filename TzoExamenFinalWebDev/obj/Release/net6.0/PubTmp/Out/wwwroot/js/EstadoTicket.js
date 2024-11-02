function addEstado() {
    $.ajax({
        type: "GET",
        url: "/EstadoTicket/AddEstadoTicket",
        data: { nombreEstado: $('#nombreEstado').val() }, // Asegúrate de que el nombre coincida
        contentType: "application/json; charset=utf-8",
        error: function (jqXHR, textStatus, errorThrown) {
            M.toast({ html: 'Ocurrió un error al agregar el estado', classes: 'rounded black white-text' });
            console.log('status code: ' + jqXHR.status + ' errorThrown: ' + errorThrown + ' jqXHR.responseText:' + jqXHR.responseText);
        },
        success: function () {
            $('#nombreEstado').val('');
            fetchEstados();
        }
    });
}

function fetchEstados() {
    $.ajax({
        type: "GET",
        url: "/EstadoTicket/GetAllEstadosTicket",
        dataType: "json",
        error: function (jqXHR, textStatus, errorThrown) {
            M.toast({ html: 'Ocurrió un error al cargar los estados', classes: 'rounded black white-text' });
            console.log('status code: ' + jqXHR.status + ' errorThrown: ' + errorThrown + ' jqXHR.responseText:' + jqXHR.responseText);
        },
        success: function (estados) {
            console.log(estados)
            $('#estadosList').empty();
            estados.forEach(estado => {

                $('#estadosList').append(`
                    <tr>
                        <td>${estado.id}</td>
                        <td>${estado.nombreEstado}</td>
                    </tr>
                `);
            });
        }
    });
}

function deleteEstado(id) {
    $.ajax({
        type: "DELETE",
        url: `/EstadoTicket/delete/${id}`,
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        error: function (jqXHR, textStatus, errorThrown) {
            M.toast({ html: 'Ocurrió un error al eliminar el estado', classes: 'rounded black white-text' });
            console.log('status code: ' + jqXHR.status + ' errorThrown: ' + errorThrown + ' jqXHR.responseText:' + jqXHR.responseText);
        },
        success: function () {
            fetchEstados();
        }
    });
}

fetchEstados();
