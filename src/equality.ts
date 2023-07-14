export function arraysEqual<TLhs, Trhs>(
	lhs: Readonly<ArrayLike<TLhs>>,
	rhs: Readonly<ArrayLike<Trhs>>,
) {
	if (lhs.length !== rhs.length) return false;
	for (let index = 0; index < lhs.length; index++) {
		if ((lhs[index] as any) !== (rhs[index] as any)) return false;
	}
	return true;
}
