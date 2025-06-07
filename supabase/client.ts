import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import { Database } from "./database.types";

// TODO: obtener desde variables de ambiente o configurar row access policies
const supabaseUrl = "https://rjbbjalnvknogofwwbks.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJqYmJqYWxudmtub2dvZnd3YmtzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkxNjIxNjUsImV4cCI6MjA2NDczODE2NX0.uwdw5ZEuLUFuAHyn4EzoNRJvJOKudx50aJ3EWznVuuU";

export const client = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
