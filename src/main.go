package main

import (
	"AxiomOS/src/utility"
	"fmt"
	"html/template"
	"net/http"
)

func main() {
	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("static"))))
	http.HandleFunc("/", handleHome)

	ip := utility.GetOutboundIP()
	addr := fmt.Sprintf("%s:8080", ip)

	fmt.Printf("AxiomOS running @ http://%s\n", addr)
	err := http.ListenAndServe(addr, nil)
	if err != nil {
		fmt.Printf("Server error: %v\n", err)
	}
}

func handleHome(w http.ResponseWriter, _ *http.Request) {
	tmpl, err := template.ParseFiles(
		"templates/index.html",
		"templates/components/header.html",
		"templates/components/timeWidget.html",
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
