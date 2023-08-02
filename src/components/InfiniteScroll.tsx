// https://github.com/gabrielelpidio/next-infinite-scroll-server-actions
// https://stackoverflow.com/a/76267950/12425926

'use client';

import { useRef, useEffect, useCallback, useState } from 'react';
import { Spinner } from '@nextui-org/spinner';

export function InfiniteScroll({
	children,
	hasMore,
	loadMoreAction,
	loaderMargin = true
}: React.PropsWithChildren<{
	hasMore: boolean;
	loadMoreAction: () => Promise<void>;
	loaderMargin?: boolean;
}>) {
	const ref = useRef<HTMLInputElement>(null);
	const [loading, setLoading] = useState(false);

	const loadMore = useCallback(
		(abortController: AbortController) => {
			if (!abortController.signal.aborted && hasMore && !loading) {
				setLoading(true);
				loadMoreAction().finally(() => setLoading(false));
			}
		},
		[loadMoreAction, hasMore, loading]
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
		<div>
			{children}
			<div className={`flex justify-center ${loaderMargin ? 'mb-6 mt-2' : ''}`}>
				<Spinner
					color="success"
					label="Loading..."
					className={loading ? 'inline-flex' : 'hidden'}
				/>
				<input type="button" className="w-0 h-0" ref={ref} />
			</div>
		</div>
	);
}
