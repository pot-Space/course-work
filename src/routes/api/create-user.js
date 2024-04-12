// import { validateEmail } from "$lib/utils/auth";
// import { returnError } from "$lib/utils/api";
// import { supabase } from "$lib/supabaseClient";

// export const RequestHandler = async (event) => {
//   const body = (await event.request.json());

//   if (!body.email || !body.password || !body.username) return returnError(400, 'Invalid request');

//   if (!validateEmail(body.email) || body.username.length < 4 || body.password.length < 6) return returnError(400, 'Bad request');

//   const check_user = await supabase.from('users').select().or(`email.eq.${body.email},username.eq.${body.username}`).maybeSingle();

//   if (check_user.data) return returnError(405, 'User already exists');
// }