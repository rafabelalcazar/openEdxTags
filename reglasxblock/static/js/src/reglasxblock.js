/* Javascript for ReglasXBlock. */
function ReglasXBlock(runtime, element) {


    var handlerUrl = runtime.handlerUrl(element, 'tag_resource');

    $('#send', element).click(function(eventObject) {
        var file = document.getElementById("myfile").value
        var selector = document.getElementById("selector")
        for(var i=0; i< selector.length;i++){
            if (selector[i].selected===true){
                var tag = selector[i].value
                console.log('btn clicked',tag);
            }
        }
        
        $.ajax({
            type: "POST",
            url: handlerUrl,
            data: JSON.stringify({
                "tag": tag,
                "resource":file
        }),
            success: function(data){
                var showInfoResource = document.getElementById('info-resource')
                showInfoResource.innerHTML = ''
                showInfoResource.innerHTML =JSON.stringify(data.tag)

            }
        });
    });

    $(function ($) {
        /* Here's where you'd do things on page load. */
    });
}

function agregarcontenido(a){
    tipoagregacion = a;
    var btn = document.getElementById("send")
    btn.removeAttribute("disabled")
    document.getElementById("tipo_contenido").innerHTML = "";
    if(tipoagregacion=="pdf"){
        
        codigo="<h3>Agregar pdf</h3>"+
        "<form action=\'\'>"+ 
        "<label for=\'myfile\'>Seleccionar pdf:</label>"+
        "<input type=\'file\' id=\'myfile\' name=\'myfile\'><br><br>"+
        "<label for='identifier'>Identificador de recurso</label>"+
        "<input type='text' name='identifier' id='identifier' placeholder='Identificador de recurso'>"+
        "<p>Por favor etiqueta el tipo de contenido:</p>"+
        "<div>"+
        "    <select name='select' id='selector' >"+
        "        <option value='convergente' selected>Convergente</option>"+
        "        <option value='divergente'>Divergente</option>"+
        "        <option value='asimilador'>Asimilador</option>"+
        "        <option value='acomodador'>Acomodador</option>"+
        "    </select>"+
        "</div>"+
        "</form>";

        console.log(codigo)
        
         document.getElementById("agregarcontenido").innerHTML = codigo;

    }
    if(tipoagregacion=="video"){
        document.getElementById("agregarcontenido").innerHTML = "<h3>Agregar video</h3>";
        

    }
    if(tipoagregacion=="html"){}
    if(tipoagregacion=="discusion"){}
    
}
