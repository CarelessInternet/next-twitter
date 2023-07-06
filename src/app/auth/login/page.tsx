import { CSRF_experimental } from '@/utils';
import { Button } from '@nextui-org/button';

export default function Login() {
	return (
		<form action="/api/auth/signin/google" method="post">
			<Button type="submit" color="danger" variant="ghost">
				Sign in with Google
			</Button>
			<CSRF_experimental />
		</form>
	);
}
