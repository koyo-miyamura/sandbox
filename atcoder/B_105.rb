# https://atcoder.jp/contests/abc106/tasks/abc106_b
n = gets.to_i

answer = 0

1.upto(n) do |i|
  next if i.even?

  num = 0

  1.upto(i) do |j|
    num +=1 if i % j == 0
  end

  answer +=1 if num == 8
end

puts answer
