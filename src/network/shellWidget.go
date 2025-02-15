package network

import (
	"AxiomOS/src/utility"
	"fmt"
	"net/http"
	"strings"
)

func HandleShellWidget(w http.ResponseWriter, r *http.Request) {
	setupAllowlist()

	rawCommand := r.URL.Query().Get("command")
	parsedCommand := strings.Trim(rawCommand, "'")

	result := utility.Shell(parsedCommand)

	_, err := w.Write([]byte(result))
	if err != nil {
		fmt.Printf("!! SHELL !! Error writing to response: %v\n", err)
		return
	}
}

func setupAllowlist() {
	utility.AllowShellCommand("ps", "all")
	utility.AllowShellCommand("ls", "all")
	utility.AllowShellCommand("echo", "all")
	utility.AllowShellCommand("help", "all")
	utility.AllowShellCommand("man", "all")
}
