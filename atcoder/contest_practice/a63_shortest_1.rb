n, m = gets.split.map(&:to_i)

graph = Array.new(n + 1) { [] }
m.times do
	from, to = gets.split.map(&:to_i)

	graph[from] << to
	graph[to] << from
end

dist = Array.new(n + 1) { -1 }
dist[1] = 0

q = [1]

while q.length != 0 do
	v = q.shift

	graph[v].each do |nv|
		if dist[nv] == -1
			dist[nv] = dist[v] + 1
			q.push(nv)
		end
	end
end

dist[1..].each { |res| puts res }
