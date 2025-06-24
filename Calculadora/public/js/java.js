// Definimos nuestra clase CalculadoraBasica que se extiende HTMLElement
class CalculadoraBasica extends HTMLElement {
    constructor() {
        super();

        // Creamos el Shadow DOM
        this.shadow = this.attachShadow({ mode: 'open' });

        // Creamos el elemento del componente
        this.render();

        // Obtenemos referencias a los elementos
        this.num1Input = this.shadow.getElementById('num1');
        this.num2Input = this.shadow.getElementById('num2');
        this.operacionSelect = this.shadow.getElementById('operacion');
        this.btnCalcular = this.shadow.getElementById('calcular');
        this.resultadoDiv = this.shadow.getElementById('resultado');
        
        // Agregamos el evento al boton
        this.btnCalcular.addEventListener('click', () => this.calcular());
    }

    // Metodo para renderizar el componente
    render() {
        this.shadow.innerHTML = `
            <style>
                /*Agregamos estilos para nuestro componente */
                .card {
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                }
                .error {
                    color: #dc3545;
                    font-size: 0.875em;
                }
            </style>
            
            <div class="card">
                <div class="card-body">
                    <h2 class="card-title">Calculadora</h2>

                    <div class="mb-3">
                        <label for="num1" class="form-label">Primer numero</label>
                        <input type="number" class="form-control" id="num1" placeholder="Ingrese un numero">
                    </div>
                    
                    <div class="mb-3">
                        <label for="operacion" class="form-label">Operacion</label>
                        <select class="form-select" id="operacion">
                            <option value="Seleccione">Seleccione una operacion</option>
                            <option value="suma">Suma (+)</option>
                            <option value="resta">Resta (-)</option>
                            <option value="multiplicacion">Multiplicacion (×)</option>
                            <option value="division">Division (÷)</option>
                        </select>
                    </div>
                    
                    <div class="mb-3">
                        <label for="num2" class="form-label">Segundo numero</label>
                        <input type="number" class="form-control" id="num2" placeholder="Ingrese un numero">
                    </div>

                    <div class="d-flex justify-content-center mb-3">
                        <button id="calcular" class="btn btn-primary">Calcular</button>
                    </div>

                    <div id="resultado" class="mt-3 p-3 bg-light rounded"></div>
                    
                    <hr>
                    
                </div>
            </div>
        `;
    }

    // Metodo para realizar el cálculo
    calcular() {
        // Obtenemos los valores de los inputs
        const num1 = parseFloat(this.num1Input.value);
        const num2 = parseFloat(this.num2Input.value);
        const operacion = this.operacionSelect.value;
        
        let resultado;
        let simbolo;

        // Operaciones matematicas
        // Usamos un switch para determinar la operacion a realizar
        switch (operacion) {
            case 'suma':
                resultado = num1 + num2;
                simbolo = '+';
                break;
            case 'resta':
                resultado = num1 - num2;
                simbolo = '-';
                break;
            case 'multiplicacion':
                resultado = num1 * num2;
                simbolo = '×';
                break;
            case 'division':
                if (num2 === 0) {
                    this.mostrarResultado('No se puede dividir por cero', true);
                    return;
                }
                resultado = num1 / num2;
                simbolo = '÷';
                break;
            default:
                resultado = 'Operacion no válida';
        }
        
        // Mostramos el resultado
            this.mostrarResultado(`<strong>Resultado:</strong> ${num1} ${simbolo} ${num2} = ${resultado}`);
        }
    
        mostrarResultado(mensaje, esError = false) {
            if (esError) {
                this.resultadoDiv.innerHTML = `<div class="error">${mensaje}</div>`;
            } else {
                this.resultadoDiv.innerHTML = mensaje;
            }
        }
        
}

// Definimos nuestro componente personalizado
customElements.define('calculadora-basica', CalculadoraBasica);