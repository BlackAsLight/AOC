const forest = (await Deno.readTextFile('./inputs/2022-12-08.txt'))
	.trim()
	.split('\n')
	.map(line => line.split('').map(char => parseInt(char)))

let visibleCount = forest.length * 2 + forest[ 0 ].length * 2 - 4
for (let i = 1; i < forest.length - 1; ++i)
	for (let j = 1; j < forest[ 0 ].length - 1; ++j)
		if (isVisible(forest[ i ].slice(0, j), forest[ i ][ j ]) ||
			isVisible(forest[ i ].slice(j + 1), forest[ i ][ j ]) ||
			isVisible(forest.slice(0, i).reduce((range, row) => (range.push(row[ j ]), range), []), forest[ i ][ j ]) ||
			isVisible(forest.slice(i + 1).reduce((range, row) => (range.push(row[ j ]), range), []), forest[ i ][ j ]))
			++visibleCount

console.log(visibleCount)

function isVisible(range: number[], tree: number) {
	return Math.max(...range) < tree
}

let bestView = 0
for (let i = 0; i < forest.length; ++i)
	for (let j = 0; j < forest[ 0 ].length; ++j) {
		const currentView = viewDistance(forest[ i ].slice(0, j).reverse(), forest[ i ][ j ]) *
			viewDistance(forest[ i ].slice(j + 1), forest[ i ][ j ]) *
			viewDistance(forest.slice(0, i).reduce((range, row) => (range.push(row[ j ]), range), []).reverse(), forest[ i ][ j ]) *
			viewDistance(forest.slice(i + 1).reduce((range, row) => (range.push(row[ j ]), range), []), forest[ i ][ j ])
		if (bestView < currentView)
			bestView = currentView
	}

console.log(bestView)

function viewDistance(range: number[], tree: number) {
	for (let i = 0; i < range.length; ++i)
		if (tree <= range[ i ])
			return i + 1
	return range.length
}
