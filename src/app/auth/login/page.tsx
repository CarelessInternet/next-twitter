import { CSRF_experimental } from '@/utils';
import { Button } from '@nextui-org/button';
import { IconBrandGoogle } from '@tabler/icons-react';

export default function Login() {
	return (
		<form
			action="/api/auth/signin/google"
			method="post"
			className="h-[80vh] flex flex-col justify-center items-center"
		>
			<Button
				type="submit"
				color="danger"
				variant="ghost"
				size="lg"
				startContent={<IconBrandGoogle />}
			>
				Sign in with Google
			</Button>
			<CSRF_experimental />
		</form>
	);
}
