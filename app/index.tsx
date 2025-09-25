import { Redirect } from 'expo-router';

export default function Index() {
  // Use Redirect to navigate immediately once the router is mounted
  return <Redirect href="/login" />;
}
