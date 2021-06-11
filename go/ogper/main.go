package main

import (
	"context"
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
		url = "https://example.com"
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

	metaNodes := walk(node, make(map[string][]*html.Node))

	result := &OgpContent{}
	for _, meta := range metaNodes["meta"] {
		for _, attr := range meta.Attr {
			switch attr.Val {
			case "og:title":
				result.Title = attr.Val
			case "og:type":
				result.Type = attr.Val
			case "og:Url":
				result.Url = attr.Val
			case "og:image":
				result.Image = attr.Val
			case "og:site_name":
				result.SiteName = attr.Val
			case "og:description":
				result.Description = attr.Val
			}
		}
	}

	fmt.Printf("%+v\n", result)
}

func walk(node *html.Node, res map[string][]*html.Node) map[string][]*html.Node {
	if node.Type == html.ElementNode {
		switch node.Data {
		case HTMLMetaTag:
			res[node.Data] = append(res[node.Data], node)
		}
	}

	for child := node.FirstChild; child != nil; child = child.NextSibling {
		walk(child, res)
	}

	return res
}
