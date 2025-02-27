#!/bin/bash

set -e
set -e pipefail

function check_os {
  if command -v brew >/dev/null 2>&1; then
    echo "Found: brew (Homebrew)"
  else
    echo "brew NOT found, please install homebrew from 'brew.sh'!"
    exit 1
  fi
}

function install_deps {
  echo "Checking for go..."
  if ! command -v go >/dev/null 2>&1; then
    echo "Go not found, installing go..."
    brew install go
  else
    echo "Go found!"
  fi

  echo "Checking for git..."
  if ! command -v go >/dev/null 2>&1; then
      echo "Git not found, installing git..."
      brew install git
    else
      echo "Git found!"
    fi
}

function install_axiom {
  cd $HOME
  if [ ! -d $HOME/.axiom_os ]; then
    git clone https://github.com/Thoq-jar/AxiomOS-NG.git $HOME/.axiom_os
    cd $HOME/.axiom_os
  else
    cd $HOME/.axiom_os
    git pull
  fi

  go build src/main.go

  echo "Almost done! Now we just need sudo to install the command: 'axiom_os' into your terminal!"
  mkdir -p $HOME/bin/
  echo "cd $HOME/.axiom_os; go run $HOME/.axiom_os/src/main.go" > $HOME/bin/axiom_os
  chmod +x $HOME/bin/axiom_os
}

function main {
  echo "Welcome to the AxiomOS installer!"
  echo "This may take a while, feel free to go get a drink, sit back and relax while we work out magic!"
  echo "Installation will being in 3s..."
  sleep 3
  echo "Checking deps..."

  check_os
  install_deps
  install_axiom

  echo "Done! To run, run: '~/bin/axiom_os' in your terminal!"
}

main
