/**
 * Compares two arrays and checks if each element satisfies Javascript strict equality (`===`), and that the two arrays have the same length
 */
export function arraysEqual<TLhs, TRhs>(
	lhs: Readonly<ArrayLike<TLhs>>,
	rhs: Readonly<ArrayLike<TRhs>>,
): boolean {
	if (lhs.length !== rhs.length) return false;
	for (let index = 0; index < lhs.length; index++) {
		if ((lhs[index] as any) !== (rhs[index] as any)) return false;
	}
	return true;
}
