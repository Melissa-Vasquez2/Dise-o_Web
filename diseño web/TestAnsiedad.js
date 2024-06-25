const preguntas = [
    {
        pregunta: "¿Con qué frecuencia te sientes nervioso/a o ansioso/a?",
        opciones: ["Nunca", "A veces", "A menudo", "Siempre"],
        tipo: "radio",
        nombre: "q1",
        obligatoria: true
    },
    {
        pregunta: "¿Experimentas dificultad para controlar tus preocupaciones?",
        opciones: ["Sí", "No"],
        tipo: "radio",
        nombre: "q2",
        obligatoria: true
    },
    {
        pregunta: "Describe brevemente las situaciones que te provocan ansiedad:",
        tipo: "textarea",
        nombre: "q3"
    },
    {
        pregunta: "¿Cómo crees que la ansiedad afecta tu vida diaria?",
        tipo: "text",
        nombre: "q4"
    },
    {
        pregunta: "¿Sientes tensión muscular frecuente?",
        opciones: ["Sí", "No"],
        tipo: "radio",
        nombre: "q5"
    },
    {
        pregunta: "¿Has notado cambios en tu apetito debido a la ansiedad?",
        opciones: ["Sí", "No"],
        tipo: "radio",
        nombre: "q6"
    },
    {
        pregunta: "¿Hay algún evento o situación reciente que haya desencadenado tu ansiedad?",
        tipo: "text",
        nombre: "q7"
    },
    {
        pregunta: "¿Experimentas dificultad para conciliar el sueño debido a la ansiedad?",
        opciones: ["Sí", "No"],
        tipo: "radio",
        nombre: "q8"
    },
    {
        pregunta: "¿Tienes pensamientos recurrentes o preocupaciones excesivas?",
        opciones: ["Sí", "No"],
        tipo: "radio",
        nombre: "q9"
    },
    {
        pregunta: "¿Te sientes cansado/a o con falta de energía debido a la ansiedad?",
        opciones: ["Sí", "No"],
        tipo: "radio",
        nombre: "q10"
    }
];

// Función para cargar las preguntas en el formulario
function cargarPreguntasEnFormulario() {
    const form = document.getElementById('ansiedadForm');

    preguntas.forEach((pregunta, index) => {
        const fieldset = document.createElement('fieldset');
        const legend = document.createElement('legend');
        legend.textContent = `Pregunta ${index + 1}: ${pregunta.pregunta}`;
        fieldset.appendChild(legend);

        if (pregunta.tipo === "radio") {
            pregunta.opciones.forEach((opcion) => {
                const input = document.createElement('input');
                input.type = "radio";
                input.name = pregunta.nombre;
                input.value = opcion;
                const label = document.createElement('label');
                label.textContent = opcion;
                fieldset.appendChild(input);
                fieldset.appendChild(label);
                fieldset.appendChild(document.createElement('br'));
            });
        } else if (pregunta.tipo === "textarea") {
            const textarea = document.createElement('textarea');
            textarea.name = pregunta.nombre;
            textarea.placeholder = "Escribe aquí...";
            textarea.style.width = "100%";
            textarea.rows = 4;
            fieldset.appendChild(textarea);
        } else if (pregunta.tipo === "text") {
            const input = document.createElement('input');
            input.type = "text";
            input.name = pregunta.nombre;
            input.placeholder = "Escribe aquí...";
            input.style.width = "100%";
            fieldset.appendChild(input);
        }

        form.appendChild(fieldset);
    });
}

// Función para validar que todas las preguntas obligatorias hayan sido respondidas
function validarRespuestas() {
    let respuestasCompletas = true;
    let preguntasPendientes = 0;

    preguntas.forEach((pregunta) => {
        if (pregunta.obligatoria) {
            const respuesta = obtenerRespuesta(pregunta.nombre);

            if (!respuesta) {
                respuestasCompletas = false;
                preguntasPendientes++;
            }
        }
    });

    // Mostrar mensaje si faltan muchas preguntas por contestar
    if (preguntasPendientes >= 2) {
        const resultadoDiv = document.getElementById('resultado');
        resultadoDiv.textContent = "Lo siento, no se puede calcular el resultado. Debes contestar todas las preguntas obligatorias.";
        resultadoDiv.style.display = 'block';
        return false;
    }

    return respuestasCompletas;
}

// Función para obtener la respuesta a una pregunta
function obtenerRespuesta(nombre) {
    const inputs = document.querySelectorAll(`input[name="${nombre}"]`);
    const textarea = document.querySelector(`textarea[name="${nombre}"]`);
    const inputText = document.querySelector(`input[name="${nombre}"]`);

    let respuesta = null;

    if (inputs.length > 0) {
        inputs.forEach((input) => {
            if (input.checked) {
                respuesta = input.value;
            }
        });
    } else if (textarea) {
        respuesta = textarea.value;
    } else if (inputText) {
        respuesta = inputText.value;
    }

    return respuesta;
}

// Función para calcular el puntaje y obtener el mensaje de resultado
function calcularResultado() {
    if (!validarRespuestas()) {
        return; // No calcular si faltan preguntas por contestar
    }

    let respuestasNegativas = 0;

    preguntas.forEach((pregunta) => {
        const respuesta = obtenerRespuesta(pregunta.nombre);

        // Contar respuestas negativas
        if (pregunta.tipo === "radio" && respuesta) {
            if (respuesta === "No") {
                respuestasNegativas++;
            }
        }
    });

    const resultadoDiv = document.getElementById('resultado');
    // Determinar el mensaje de resultado según la cantidad de respuestas negativas
    if (respuestasNegativas >= 6) {
        resultadoDiv.textContent = "Tus respuestas indican que es poco probable que sufras de ansiedad. Pero siempre es importante hablar con un profesional si tienes preocupaciones.";
    } else {
        resultadoDiv.textContent = "Tus respuestas sugieren que podría haber síntomas de ansiedad. Te recomendamos consultar con un profesional para obtener más información.";
    }
    resultadoDiv.style.display = 'block'; // Mostrar el resultado
}

// Asociar eventos a los botones
document.getElementById('comenzarBtn').addEventListener('click', function() {
    document.getElementById('comenzarBtn').style.display = 'none';
    document.getElementById('formContainer').style.display = 'block';
    cargarPreguntasEnFormulario(); // Cargar las preguntas en el formulario
});

document.getElementById('calcularBtn').addEventListener('click', function() {
    calcularResultado(); // Calcular el resultado del cuestionario
});
