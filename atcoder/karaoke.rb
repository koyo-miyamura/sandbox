# https://atcoder.jp/contests/pakencamp-2019-day3/tasks/pakencamp_2019_day3_c

n, m = gets.chomp.split(" ").map(&:to_i)

aa = n.times.map { gets.chomp.split(" ").map(&:to_i) }

answer = 0

(1..m).to_a.combination(2).each do |t1, t2|
  sum = aa.reduce(0) do |acc, a|
    acc += [a[t1-1], a[t2-1]].max
  end

  answer = [answer, sum].max
end

puts answer
