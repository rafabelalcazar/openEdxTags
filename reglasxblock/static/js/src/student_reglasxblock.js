/* Javascript for ReglasXBlock. */
function StudentReglasXBlock(runtime, element) {
    var handlerUrl = runtime.handlerUrl(element, 'show_resources');

    $('#send_aprendizaje', element).click(function(eventObject) {
        // var file = document.getElementById("myfile").value
        var selector_aprendizaje = document.getElementById("selector_aprendizaje")
        for(var i=0; i< selector_aprendizaje.length;i++){
            if (selector_aprendizaje[i].selected===true){
                var tag = selector_aprendizaje[i].value
                console.log('Seleccionaste: ',tag);
            }
        }
        $.ajax({
            type: "POST",
            url: handlerUrl,
            data: "null",
            dataType: 'json',
            success: function(data){
                var resources_list = document.getElementById('resources_allowed')
                resources_list.innerHTML = ''
                resources_allowed = data.filter(resources =>  resources.tag == tag  )
                console.log(resources_allowed);
                resources_list.innerHTML = "Tus recursos disponibles son :"+resources_allowed.map(item => item.resource )
            }
        });
    });
}