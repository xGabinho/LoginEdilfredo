// 1. Configuración de Supabase
const SUPABASE_URL = 'https://smpinwhinltoozbvymvu.supabase.co';
const SUPABASE_KEY = 'sb_publishable_K1kfid4VYAMB8V8irrYs5w_GAuwdpt0';
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// 2. Elementos del DOM
const authForm = document.getElementById('auth-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const submitBtn = document.getElementById('submit-btn');
const toggleLink = document.getElementById('toggle-link');
const toggleMsg = document.getElementById('toggle-msg');
const formTitle = document.getElementById('form-title');
const messageDiv = document.getElementById('message');
const dashboardDiv = document.getElementById('dashboard');
const loginContainer = document.querySelector('.container:not(#dashboard)');
const logoutBtn = document.getElementById('logout-btn');
const userEmailSpan = document.getElementById('user-email');

let isLogin = true; // Variable de estado para saber si estamos en Login o Registro

// 3. Alternar entre Login y Registro
toggleLink.addEventListener('click', (e) => {
    e.preventDefault();
    isLogin = !isLogin;
    formTitle.textContent = isLogin ? 'Iniciar Sesión' : 'Registro';
    submitBtn.textContent = isLogin ? 'Entrar' : 'Registrarse';
    toggleMsg.textContent = isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?';
    toggleLink.textContent = isLogin ? 'Regístrate aquí' : 'Inicia sesión aquí';
    messageDiv.textContent = '';
});

// 4. Procesar el Formulario
authForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = emailInput.value;
    const password = passwordInput.value;
    
    submitBtn.disabled = true;
    submitBtn.textContent = 'Cargando...';
    messageDiv.textContent = '';

    if (isLogin) {
        // Lógica de Login
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) mostrarMensaje(error.message, 'error');
        else checkSession();
    } else {
        // Lógica de Registro
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) {
            mostrarMensaje(error.message, 'error');
        } else {
            mostrarMensaje('Registro exitoso. Revisa tu email o inicia sesión.', 'success');
            isLogin = true; // Volver a login
            toggleLink.click(); // Simular click para cambiar UI
        }
    }
    
    submitBtn.disabled = false;
    submitBtn.textContent = isLogin ? 'Entrar' : 'Registrarse';
});

// 5. Cerrar Sesión
logoutBtn.addEventListener('click', async () => {
    await supabase.auth.signOut();
    checkSession();
});

// 6. Verificar si el usuario ya tiene la sesión activa
async function checkSession() {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (session) {
        // Ocultar form, mostrar dashboard
        loginContainer.classList.add('hidden');
        dashboardDiv.classList.remove('hidden');
        userEmailSpan.textContent = session.user.email;
    } else {
        // Mostrar form, ocultar dashboard
        loginContainer.classList.remove('hidden');
        dashboardDiv.classList.add('hidden');
        authForm.reset();
        messageDiv.textContent = '';
    }
}

function mostrarMensaje(texto, tipo) {
    messageDiv.textContent = texto;
    messageDiv.className = tipo;
}

// Inicializar verificando la sesión al cargar la página
checkSession();