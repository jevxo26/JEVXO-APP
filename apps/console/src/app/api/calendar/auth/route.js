import { redirect } from 'next/navigation';

export async function GET() {
  // Redirect to the Backend to initiate auth
  // Ensure your Backend .env has GOOGLE_REDIRECT_URI=http://localhost:3000/api/calendar/callback
  const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
  return redirect(`${backendUrl}/calendar/auth`);
}
