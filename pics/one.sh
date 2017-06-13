i=0
for i in 'left' 'right' 'top' 'bottom'
do 
convert $i'.png' -resize 40x40 $i'.png'
done
