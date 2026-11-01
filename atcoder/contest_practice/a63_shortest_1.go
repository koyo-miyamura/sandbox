package main

import "fmt"

func main() {
	var n, m int
	fmt.Scan(&n, &m)

	// 隣接リスト
	graph := make([][]int, n+1)
	for i := 1; i <= m; i++ {
		var from, to int
		fmt.Scan(&from, &to)

		graph[from] = append(graph[from], to)
		graph[to] = append(graph[to], from)
	}

	// 1からkまでの距離管理
	dist := make([]int, n+1)
	for i := 1; i <= n; i++ {
		dist[i] = -1
	}
	dist[1] = 0

	// BFS
	queue := []int{1}
	for len(queue) > 0 {
		v := queue[0]
		queue = queue[1:]
		for _, nv := range graph[v] {
			if dist[nv] == -1 {
				dist[nv] = dist[v] + 1
				queue = append(queue, nv)
			}
		}
	}

	// 結果出力
	for i := 1; i <= n; i++ {
		fmt.Println(dist[i])
	}
}
