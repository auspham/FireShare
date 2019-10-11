package main

import (
	"fmt"
	"math"
	"strconv"
)

func main() {
	var input string
	_, err := fmt.Scanf("%s", &input)

	if err != nil {
		fmt.Println(err)
	}

	numberOfTest, e := strconv.Atoi(input)
	if e != nil {
		fmt.Println(e)
	}

	maxFollowingLines := numberOfTest * 2
	takeInput(maxFollowingLines, 1, 0)

}

func takeInput(maxFollowingLines int, currentLine int, numberOfInteger int) {
	if currentLine <= maxFollowingLines {
		var number string
		_, err := fmt.Scanf("%s", &number)

		if err != nil {
			fmt.Println(err)
		}

		if math.Mod(currentLine, 2, int) == 0 && numberOfInteger != 0 {
			currentLine++
			takeInput(maxFollowingLines, currentLine, strconv.Atoi(number))
		} else if math.Mod(currentLine, 2, int) != 0 && numberOfInteger != 0 {
			fmt.Println(number)
		}
	}
}
