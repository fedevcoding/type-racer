package main

import (
	"github.com/rivo/tview"
)

func main() {

	newPrimitive := func(text string) tview.Primitive {
		return tview.NewTextView().
			SetTextAlign(tview.AlignCenter).
			SetText(text)
	}

	grid := tview.NewGrid().
		SetRows(10, 0, 10).
		SetColumns(30, 0, 30).
		SetBorders(true).
		AddItem(newPrimitive("Quote"), 0, 0, 1, 3, 0, 0, false).
		AddItem(newPrimitive("Type here"), 1, 0, 2, 3, 0, 0, false).
		AddItem(newPrimitive("Stats"), 1, 0, 2, 3, 0, 0, false)

	if err := tview.NewApplication().SetRoot(grid, true).SetFocus(grid).Run(); err != nil {
		panic(err)
	}
	// app := tview.NewApplication()

	// typeBox := tview.NewBox().SetBorder(true).SetBorderColor(1).SetTitle("Typing output")

	// if err := app.SetRoot(typeBox, true).Run(); err != nil {
	// 	panic(err)
	// }

	// button1 := tview.NewButton("Hit to stop!").SetSelectedFunc(func() {
	// 	app.Stop()
	// })

	// button1.SetBorder(true).SetRect(0, 0, 22, 3)
	// if err := app.SetRoot(button1, false).SetFocus(button1).Run(); err != nil {
	// 	panic(err)
	// }

}
