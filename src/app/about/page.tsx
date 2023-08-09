import Accordion from './Accordion';

export default function About() {
	return (
		<main>
			<section className="mt-6 mb-10 flex flex-col">
				<h1 className="my-8 text-center text-5xl font-bold underline decoration-wavy decoration-4 decoration-pink-500">
					Twitter For You
				</h1>
				<h2 className="text-lg text-center px-2">
					Sometimes, the biggest platforms are not the best ones. They are good, but lead by people
					not suited for the job.
				</h2>
			</section>
			<section className="mx-auto max-w-xs sm:max-w-lg md:max-w-xl lg:max-w-2xl">
				<Accordion />
			</section>
		</main>
	);
}
