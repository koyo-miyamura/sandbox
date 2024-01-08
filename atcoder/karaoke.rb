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

# 別解
# for i in 1..m
#   for j in i..m
#     sum = 0
#     for k in 1..n
#       sum += [aa[k-1][i-1], aa[k-1][j-1]].max
#     end
#     answer = [answer, sum].max
#   end
# end
