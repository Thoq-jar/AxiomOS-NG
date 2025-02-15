package main

import (
	"AxiomOS/src/network"
	"AxiomOS/src/utility"
	"fmt"
	"net/http"
)

func main() {
	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("static"))))
	http.HandleFunc("/", network.HandleHome)
	http.HandleFunc("/shell", network.HandleShellWidget)

	ip := utility.GetOutboundIP()
	port := 9955
	addr := fmt.Sprintf("%s:%d", ip, port)

	fmt.Printf("AxiomOS running @ http://%s\n", addr)
	err := http.ListenAndServe(addr, nil)
	if err != nil {
		fmt.Printf("Server error: %v\n", err)
	}
}
