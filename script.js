# Generar script.js
script_js = """// Fecha actual
document.addEventListener('DOMContentLoaded', function() {
    const fechaElement = document.getElementById('fecha');
    if (fechaElement) {
        const fecha = new Date();
        const opciones = { year: 'numeric', month: 'long', day: 'numeric' };
        fechaElement.textContent = fecha.toLocaleDateString('es-ES', opciones);
    }
    
    // Guardar estado de checkboxes en localStorage
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    
    // Cargar estado guardado
    checkboxes.forEach((checkbox, index) => {
        const savedState = localStorage.getItem(`checkbox-${index}`);
        if (savedState === 'true') {
            checkbox.checked = true;
        }
        
        // Guardar cuando cambie
        checkbox.addEventListener('change', function() {
            localStorage.setItem(`checkbox-${index}`, this.checked);
            updateProgress();
        });
    });
    
    // Actualizar progreso
    updateProgress();
    
    // Smooth scroll para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Función para actualizar progreso
function updateProgress() {
    const statusChecks = document.querySelectorAll('.status-check');
    const total = statusChecks.length;
    const checked = Array.from(statusChecks).filter(cb => cb.checked).length;
    const percentage = total > 0 ? Math.round((checked / total) * 100) : 0;
    
    console.log(`Progreso: ${checked}/${total} comandos completados (${percentage}%)`);
}

// Función para resetear todos los checkboxes
function resetAllCheckboxes() {
    if (confirm('¿Estás seguro de que quieres resetear todos los checkboxes?')) {
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach((checkbox, index) => {
            checkbox.checked = false;
            localStorage.setItem(`checkbox-${index}`, false);
        });
        updateProgress();
        alert('Todos los checkboxes han sido reseteados');
    }
}

// Función para exportar estado
function exportProgress() {
    const statusChecks = document.querySelectorAll('.status-check');
    const commandNames = [];
    
    document.querySelectorAll('.command-header h4').forEach((h4, index) => {
        if (statusChecks[index] && statusChecks[index].checked) {
            commandNames.push(h4.textContent.trim());
        }
    });
    
    const data = {
        fecha: new Date().toISOString(),
        completados: commandNames,
        total: statusChecks.length,
        progreso: commandNames.length
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `progreso_comandos_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
}

// Función para imprimir
function printPage() {
    window.print();
}

// Agregar botones de utilidad (opcional)
window.addEventListener('load', function() {
    // Puedes agregar botones adicionales aquí si lo deseas
    console.log('Sistema de comandos NVIH cargado correctamente');
});"""

# Guardar script.js
with open('nvih_commands_website/script.js', 'w', encoding='utf-8') as f:
    f.write(script_js)

print("✅ script.js generado")