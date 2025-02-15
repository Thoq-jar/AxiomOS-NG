package utility

import (
	"fmt"
	"os/exec"
	"strings"
)

type CommandPermission struct {
	Command string
	Args    string
}

var allowedCommands = []CommandPermission{
	{Command: "ls", Args: ""},
	{Command: "pwd", Args: ""},
	{Command: "ps", Args: "all"},
}

func isCommandAllowed(cmd string) (bool, []string) {
	parts := strings.Fields(cmd)
	if len(parts) == 0 {
		return false, nil
	}

	baseCmd := parts[0]
	args := parts[1:]

	for _, allowed := range allowedCommands {
		if allowed.Command == baseCmd {
			if allowed.Args == "all" {
				return true, parts
			}
			if len(args) == 0 {
				return true, parts
			}
			return false, nil
		}
	}
	return false, nil
}

func Shell(cmd string) string {
	disallowedCommandMessage := "!! A disallowed command was used but blocked by Axiom"

	allowed, cmdParts := isCommandAllowed(cmd)
	if !allowed {
		fmt.Printf("%s\n", disallowedCommandMessage)
		return disallowedCommandMessage
	}

	output, err := exec.Command(cmdParts[0], cmdParts[1:]...).Output()
	if err != nil {
		fmt.Printf("Failed to run command: %v\n", err)
		return fmt.Sprintf("Error: %v", err)
	}
	return string(output)
}

func AllowShellCommand(command, args string) {
	allowedCommands = append(allowedCommands, CommandPermission{
		Command: command,
		Args:    args,
	})
}
