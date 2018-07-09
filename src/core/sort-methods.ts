export class SortMethods {
	static sortByDateAsc(lhs, rhs): number {
		return lhs > rhs ? 1 : lhs < rhs ? -1 : 0;
	}
	static sortByDateDesc(lhs, rhs): number {
		return lhs < rhs ? 1 : lhs > rhs ? -1 : 0;
	}
}
