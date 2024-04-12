import { createClient } from "@supabase/supabase-js";
import { URL, PATH } from '$env/static/private';

export const supabase = createClient(URL, PATH);