const priority = '_abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

const rucksacks = (await Deno.readTextFile('./input.2022-12-03.txt'))
	.trim()
	.split('\n')

console.log(rucksacks
	.reduce((sum, rucksack) => {
		const compartmentOne = rucksack.slice(0, rucksack.length / 2)
		const compartmentTwo = rucksack.slice(rucksack.length / 2)
		for (let i = 0; i < compartmentOne.length; ++i)
			if (compartmentTwo.includes(compartmentOne[ i ]))
				return sum + priority.indexOf(compartmentOne[ i ])
		throw Error(`${compartmentOne} ${compartmentTwo}`)
	}, 0))

console.log(rucksacks
	.reduce((groups, rucksack) => (
		groups[ groups.length - 1 ].length < 3 ?
			groups[ groups.length - 1 ].push([ ...new Set(rucksack) ]) :
			groups.push([ [ ...new Set(rucksack) ] ]),
		groups), [ [] ] as string[][][])
	.reduce((sum, group) => {
		const common = group[ 0 ]
		for (let i = 1; i < group.length; ++i)
			for (let j = 0; j < common.length; ++j)
				if (!group[ i ].includes(common[ j ]))
					common.splice(j--, 1)
		return sum + priority.indexOf(common[0])
	}, 0))
