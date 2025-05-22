// Import de la bibliothèque Supabase qui nous permettra de communiquer avec notre base de données
import { createClient } from '@supabase/supabase-js';

// URL de notre base de données Supabase
// C'est l'adresse où se trouve notre base de données dans le cloud
const supabaseUrl = 'https://gvmwcbnumuffpkkjehpf.supabase.co';

// Clé d'authentification pour accéder à notre base de données
// C'est comme un mot de passe qui nous permet de communiquer avec Supabase
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd2bXdjYm51bXVmZnBra2plaHBmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY3NzMzODUsImV4cCI6MjA2MjM0OTM4NX0.tAYeiO8BtoDkVUYtzifgnk_lg_hePSI7nusdHwO42N4';

// Création du client Supabase
// C'est comme si on créait un téléphone spécial pour communiquer avec notre base de données
// On lui donne l'URL et la clé pour qu'il puisse se connecter
export const supabase = createClient(supabaseUrl, supabaseKey);
