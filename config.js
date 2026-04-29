// Configuración central de Supabase
const SUPABASE_URL = 'https://smpinwhinltoozbvymvu.supabase.co';
// IMPORTANTE: Esta llave parece ser de Stripe. 
// La de Supabase es un JWT muy largo que empieza por 'eyJ...'
const SUPABASE_KEY = 'sb_publishable_K1kfid4VYAMB8V8irrYs5w_GAuwdpt0'; 

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
