import { supabase } from "$lib/supabaseClient";

export async function load() {
  const { data } = await supabase.from('bestiary').select();

  return {
    cards: data ?? []
  };
}