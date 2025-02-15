package network

import (
	"html/template"
	"net/http"
)

func HandleHome(w http.ResponseWriter, _ *http.Request) {
	tmpl, err := template.ParseFiles(
		"templates/index.html",
		"templates/components/header.html",
		"templates/components/timeWidget.html",
		"templates/components/shellWidget.html",
	)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	err = tmpl.Execute(w, nil)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}
