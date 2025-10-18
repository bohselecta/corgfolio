import { redirect } from 'next/navigation';

export default function ResumePage() {
  // Redirect to the static resume.html file
  redirect('/resume.html');
}
