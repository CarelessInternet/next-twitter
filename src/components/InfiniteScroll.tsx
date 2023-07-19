// https://github.com/gabrielelpidio/next-infinite-scroll-server-actions
// https://stackoverflow.com/a/76267950/12425926

'use client';

import { useRef, useEffect, useCallback, useState } from 'react';
import { Spinner } from '@nextui-org/spinner';

export function InfiniteScroll({
	children,
	hasMore,
	loadMoreAction
}: React.PropsWithChildren<{
	hasMore: boolean;
	loadMoreAction: (offset: number) => Promise<void>;
}>) {
	const ref = useRef<HTMLDivElement>(null);
	const pageNum = useRef(1);
	const [loading, setLoading] = useState(false);

	const loadMore = useCallback(
		(abortController: AbortController) => {
			if (!abortController.signal.aborted && hasMore && !loading) {
				setLoading(true);

				loadMoreAction(pageNum.current).finally(() => setLoading(false));
				pageNum.current += 1;
			}
		},
		[loadMoreAction, hasMore, loading, pageNum]
	);

	useEffect(() => {
		const signal = new AbortController();
		const element = ref.current;

		const observer = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting && !loading) {
				loadMore(signal);
			}
		});

		if (element) {
			observer.observe(element);
		}

		return () => {
			signal.abort();

			if (element) {
				observer.unobserve(element);
			}
		};
	}, [loadMore, loading]);

	return (
		<>
			{children}
			<div className="flex justify-center my-6">
				<Spinner
					color="success"
					label="Loading..."
					className={loading ? 'opacity-100' : 'opacity-0'}
					ref={ref}
				/>
			</div>
		</>
	);
}
