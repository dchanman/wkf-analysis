package main

import (
	"flag"
	"html/template"
	"log"
	"net/http"
	"strings"
)

type video struct {
	ID   string
	Type string
}

const (
	templatesIndex = "templates/index.html"
)

func templateHandler(h http.Handler) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if r.URL.Path == "/" {
			v := video{"0B7ZcMAAjRGDleXV1TWFJTmJFSHc", "video/mp4"}
			t, err := template.ParseFiles(templatesIndex)
			if err != nil {
				panic(err)
			}
			err = t.Execute(w, v)
			if err != nil {
				panic(err)
			}
			return
		} else if strings.HasSuffix(r.URL.Path, "/") {
			http.NotFound(w, r)
			return
		}
		h.ServeHTTP(w, r)
	}
}

func main() {
	port := flag.String("p", "8080", "port to serve on")
	flag.Parse()

	http.HandleFunc("/", templateHandler(http.FileServer(http.Dir("./public"))))
	log.Printf("Serving on port %s", *port)
	log.Fatal(http.ListenAndServe(":"+*port, nil))
}
