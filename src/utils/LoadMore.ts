type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };

type LoadMoreRequiredOptions = 'id' | 'all' | 'none';

type LoadMoreActionParameters = {
	offset: number;
	id: number | string;
};

export type LoadMoreAction<T extends LoadMoreRequiredOptions, K extends Object[] = Object[]> = (
	// parameters: Partial<LoadMoreActionParameters>
	parameters: T extends 'id'
		? WithRequired<LoadMoreActionParameters, 'id'>
		: T extends 'none'
		? Partial<LoadMoreActionParameters>
		: LoadMoreActionParameters
) => Promise<{
	data: K;
	hasMoreData: boolean;
}>;
