package main

import (
	"fmt"
	"net/http"
	"text/template"

	"github.com/go-chi/chi/v5"
)

func main() {

	PORT := ":3000"
	router := chi.NewRouter()

	router.Get("/", indexHandler)

	fmt.Printf("Server listening on http://localhost%v", PORT)
	http.ListenAndServe(PORT, router)
}

func indexHandler(w http.ResponseWriter, r *http.Request) {
	templ := template.Must(template.ParseFiles("./template/index.html"))
	templ.Execute(w, nil)
}
