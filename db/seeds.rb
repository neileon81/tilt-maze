[
  ["John", 123],
  ["Jane", 200],
  ["Sarah", 300],
  ["Bob", 400],
  ["Brian", 700],
].each do |rec|
  Score.create(name: rec[0], centiseconds: rec[1])
end

[
  ["Robert", 400],
  ["Karen", 10],
  ["Philip", 100],
].each do |rec|
  Score.create(name: rec[0], centiseconds: rec[1])
end

Score.create(name: "Joe", centiseconds: 1239)