/**
 * RSVP Service Module
 * Separated architecture for future Supabase or backend API integration.
 */

export interface RSVPPayload {
  guestName: string;
  phoneNumber: string;
  numberOfGuests: number;
  attendance: 'attending' | 'declined';
  message: string;
  createdAt?: string;
}

/**
 * Submit RSVP details.
 * Replace internal simulation with Supabase client when VITE_SUPABASE_URL is defined.
 * 
 * Example Supabase code:
 * const { data, error } = await supabase.from('rsvps').insert([payload]);
 */
export async function submitRSVP(payload: RSVPPayload): Promise<{ success: boolean; message: string }> {
  console.log('Submitting RSVP payload:', payload);

  // Simulate network request timing for realistic smooth UX
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // If Supabase environment variables are present, you can connect here:
  // if (import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY) { ... }

  return {
    success: true,
    message: payload.attendance === 'attending' 
      ? `Thank you ${payload.guestName}! We cannot wait to celebrate with you.`
      : `Thank you ${payload.guestName} for letting us know. You will be missed!`,
  };
}
