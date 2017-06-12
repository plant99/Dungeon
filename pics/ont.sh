i=0
for i in 'one' 'two' 'three' 'four'
do
convert $i.jpg -resize 30x30 $i.jpg
done

