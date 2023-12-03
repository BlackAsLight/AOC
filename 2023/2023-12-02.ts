const games = (await Deno.readTextFile('./inputs/2023-12-02.txt'))
	.trim()
	.split('\n')
	.map(line => line
		.split(':')[ 1 ]
		.split(';')
		.map(hand => hand
			.split(',')
			.reduce(
				(cubes, type) => {
					const [ amount, colour ] = type.trim().split(' ')
					cubes[ colour as 'red' ] = parseInt(amount)
					return cubes
				},
				{} as { red: number, green: number, blue: number }
			)))

console.log(games.reduce((sum, game, i) => {
	let hand
	for (hand of game)
		if (hand.red > 12 || hand.green > 13 || hand.blue > 14)
			return sum
	return sum + i + 1
}, 0))

console.log(games.reduce((sum, game) => {
	const bag = { red: 0, green: 0, blue: 0 }
	let hand
	for (hand of game) {
		if (hand.red > bag.red)
			bag.red = hand.red
		if (hand.green > bag.green)
			bag.green = hand.green
		if (hand.blue > bag.blue)
			bag.blue = hand.blue
	}
	return sum + bag.red * bag.green * bag.blue
}, 0))
