import { supabase } from "$lib/supabaseClient";

export async function load({ params }) {
  const { data } = await supabase.from('bestiary').select();

  return {
    npc: data.filter((elem) => {
      return elem.name === params.name
    })
  }
}