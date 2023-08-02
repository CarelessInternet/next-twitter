import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';
import { Skeleton } from '@nextui-org/skeleton';
import { Divider } from '@nextui-org/divider';
import { Spacer } from '@nextui-org/spacer';

export default function Loading() {
	return (
		<div className="flex flex-col flex-wrap content-center items-center">
			<div className="max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl">
				<Card className="bg-zinc-400/10">
					<CardHeader className="flex gap-2">
						<Skeleton className="flex rounded-full w-8 h-8" />
						<div className="flex flex-col items-start justify-center">
							<Skeleton className="w-24 h-4 rounded-lg mb-2" />
							<Skeleton className="w-32 h-2 rounded-lg" />
						</div>
					</CardHeader>
					<Divider />
					<CardBody className="p-3">
						<Skeleton className="min-w-[16rem] sm:min-w-[24rem] md:min-w-[28rem] lg:min-w-[32rem] h-24 rounded-lg" />
					</CardBody>
					<Divider />
					<CardFooter>
						<Skeleton className="w-1/2 h-4 rounded-lg" />
					</CardFooter>
				</Card>
				<Spacer y={4} />
			</div>
		</div>
	);
}
