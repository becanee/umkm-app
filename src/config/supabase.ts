
import { createClient } from '@supabase/supabase-js'

const supabaseUrl: any = "https://xqqhjynvlzoxqjuuzwlg.supabase.co"
const supabaseKey: any = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhxcWhqeW52bHpveHFqdXV6d2xnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ2NTQzMTIsImV4cCI6MjAzMDIzMDMxMn0.ciHXHmlzdKEq083dNbeVMnY8iYlomAX1sm7zL_Bb6d4"
export const supabase = createClient(supabaseUrl, supabaseKey)