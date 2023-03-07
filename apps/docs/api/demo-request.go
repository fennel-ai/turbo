package handler

import (
	"encoding/json"
	"fmt"
	"net/http"
)

type RequestFormEntry struct {
	Name string `json:"name"`
	Email string `json:"email"`
	Role string `json:"role"`
}

func DemoRequest(w http.ResponseWriter, r *http.Request) {
	// Check the request is POST

	if r.Method != http.MethodPost {
		http.Error(w, fmt.Sprintf("%s Not Allowed", r.Method), http.StatusMethodNotAllowed)
		return
	}

	var req RequestFormEntry
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	jsonData, err := json.Marshal(req)
	if err != nil {
		fmt.Println("Error marshalling JSON:", err)
		return
	}

	fmt.Fprintf(w, "Body: %s", string(jsonData))
}