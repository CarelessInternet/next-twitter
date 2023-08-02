// type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };
type OptionalExceptFor<T, TRequired extends keyof T> = Partial<T> & Pick<T, TRequired>;

type LoadMoreRequiredOptions = 'id' | 'all' | 'none';

type LoadMoreActionParameters = {
	offset: number;
	id: number | string;
};

export type LoadMoreAction<T extends LoadMoreRequiredOptions, K extends Object[] = Object[]> = (
	parameters: T extends 'id'
		? OptionalExceptFor<LoadMoreActionParameters, 'id'>
		: T extends 'none'
		? Partial<LoadMoreActionParameters>
		: LoadMoreActionParameters
) => Promise<{
	data: K;
	hasMoreData: boolean;
	count?: number;
}>;
