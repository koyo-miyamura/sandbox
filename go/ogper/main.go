package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strings"

	"golang.org/x/net/html"
)

const (
	HTMLMetaTag string = "meta"
)

type OgpContent struct {
	Title       string `json:"title"`
	Type        string `json:"type"`
	Url         string `json:"url"`
	Image       string `json:"image"`
	SiteName    string `json:"site_name"`
	Description string `json:"description"`
}

type Meta struct {
	Name     string
	Property string
	Content  string
}

func main() {
	var (
		ctx = context.Background()
		url = "https://github.com/koyo-miyamura"
	)

	req, err := http.NewRequest(http.MethodGet, url, nil)
	if err != nil {
		log.Println(err)
	}
	req = req.WithContext(ctx)

	res, err := http.DefaultClient.Do(req)
	if err != nil {
		log.Println(err)
	}
	defer res.Body.Close()

	if !strings.HasPrefix(res.Header.Get("Content-Type"), "text/html") {
		log.Println("Content type must be text/html")
	}

	node, err := html.Parse(res.Body)
	if err != nil {
		log.Println(err)
	}

	og := &OgpContent{}
	og.walk(node)

	result, err := json.Marshal(og)
	if err != nil {
		log.Panicln(err)
	}

	fmt.Printf("%+v\n", string(result))
}

func (og *OgpContent) walk(node *html.Node) {
	og.walk_recursion(node)
}

func (og *OgpContent) walk_recursion(node *html.Node) {
	if node.Type == html.ElementNode {
		switch node.Data {
		case HTMLMetaTag:
			meta := Meta{}
			for _, attr := range node.Attr {
				switch attr.Key {
				case "property":
					meta.Property = attr.Val
				case "content":
					meta.Content = attr.Val
				case "name":
					meta.Name = attr.Val
				}
			}

			switch meta.Property {
			case "og:title":
				og.Title = meta.Content
			case "og:type":
				og.Type = meta.Content
			case "og:Url":
				og.Url = meta.Content
			case "og:image":
				og.Image = meta.Content
			case "og:site_name":
				og.SiteName = meta.Content
			case "og:description":
				og.Description = meta.Content
			}
		}
	}

	for child := node.FirstChild; child != nil; child = child.NextSibling {
		og.walk_recursion(child)
	}
}
