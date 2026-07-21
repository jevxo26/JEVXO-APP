import { redirect } from 'next/navigation';

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const error = searchParams.get('error');

  if (error) {
    return redirect(`/admin/schedule?error=${error}`);
  }

  if (code) {
    // Redirect to the schedule page with the code
    // The client-side page will verify this code with the backend
    return redirect(`/admin/schedule?google_code=${code}`);
  }

  return redirect('/admin/schedule');
}
