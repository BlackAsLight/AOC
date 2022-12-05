const assignments = (await Deno.readTextFile('./inputs/2022-12-04.txt'))
	.trim()
	.split('\n')

console.log(assignments
	.reduce((sum, line) => {
		const [ [ min1, max1 ], [ min2, max2 ] ] = line.split(',').map(range => range.split('-').map(num => parseInt(num)))
		return sum + (((min1 <= min2 && max2 <= max1) || (min2 <= min1 && max1 <= max2)) as unknown as number)
	}, 0))

console.log(assignments
	.reduce((sum, line) => {
		const [ [ min1, max1 ], [ min2, max2 ] ] = line.split(',').map(range => range.split('-').map(num => parseInt(num)))
		return sum + (((min2 <= max1 && min1 <= max2)|| (min1 <= max2 && min2 <= max1)) as unknown as number)
	}, 0))
