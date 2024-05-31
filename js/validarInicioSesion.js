document.getElementById('loginForm').addEventListener('submit', function(event) {
    // Verificar si los campos son válidos
    if (!this.checkValidity()) {
        // Prevenir el comportamiento por defecto del formulario si no es válido
        event.preventDefault();
        // Mostrar los mensajes de error del navegador
        this.reportValidity();
    }
    // Si es válido, el formulario se enviará y redirigirá a /index.html automáticamente
});
