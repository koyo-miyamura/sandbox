# https://judge.u-aizu.ac.jp/onlinejudge/description.jsp?id=ITP1_7_B&lang=ja
## 全探索
loop do
  n, x = gets.split(" ").map(&:to_i)

  exit if x == 0 && n == 0

  answer = 0
  for i in 1..n
    for j in i+1..n
      for k in j+1..n
        answer += 1 if i + j + k == x
      end
    end
  end

  puts answer
end

## combination
# loop do
#   n, x = gets.split(" ").map(&:to_i)

#   exit if x == 0 && n == 0

#   answer = 0
#   (1..n).to_a.combination(3).each do |array|
#     answer += 1 if array.sum == x
#   end

#   puts answer
# end

## bit 全探索
# loop do
#   n, x = gets.split(" ").map(&:to_i)

#   exit if x == 0 && n == 0

#   answer = 0

#   (1 << n).times do |i|
#     sum = 0
#     (1..n).each do |j|
#       sum += j if i & (1 << j) != 0
#     end

#     answer += 1 if sum == x
#   end

#   puts answer
# end
