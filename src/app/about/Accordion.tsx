'use client';

import { Accordion, AccordionItem } from '@nextui-org/accordion';
import { IconMessageQuestion } from '@tabler/icons-react';

export default function AccordionComponent() {
	const items: { title: string; content: string }[] = [
		{
			title: 'What is Next Twitter?',
			content: `
          Next Twitter is a project created for the sake of making a project.
          You know, building websites with different technologies and learning along the way, understanding project structure and best practices.
          Not much to it.
        `
		},
		{
			title: 'Is this a serious website?',
			content: `
        Lorem ipsum dolor sit amet... it's not a serious website, but it can be used like one.
      `
		},
		{
			title: 'Is Next Twitter open source?',
			content: `
        Yes! You can click on the GitHub icon at the top right to check out the source code behind this project.
      `
		},
		{
			title: 'How do I host this?',
			content: `
        Not my problem. Good luck with that.
      `
		},
		{
			title: 'May I copy your homework?',
			content: `
        Yeah sure, just make sure you change it up a bit so the teacher doesn't notice.
      `
		}
	];

	return (
		<Accordion selectionMode="multiple" variant="bordered">
			{items.map((item, index) => (
				<AccordionItem
					key={index}
					title={item.title}
					aria-label={item.title}
					startContent={<IconMessageQuestion />}
					className="pb-1"
				>
					{item.content}
				</AccordionItem>
			))}
		</Accordion>
	);
}
