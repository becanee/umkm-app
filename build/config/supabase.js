"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.supabase = void 0;
const supabase_js_1 = require("@supabase/supabase-js");
const supabaseUrl = "https://xqqhjynvlzoxqjuuzwlg.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhxcWhqeW52bHpveHFqdXV6d2xnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ2NTQzMTIsImV4cCI6MjAzMDIzMDMxMn0.ciHXHmlzdKEq083dNbeVMnY8iYlomAX1sm7zL_Bb6d4";
exports.supabase = (0, supabase_js_1.createClient)(supabaseUrl, supabaseKey);
