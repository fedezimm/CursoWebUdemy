function average(grades){
	var sum = 0;
	for(var i=0; i<grades.length; i++){
		sum = sum + grades[i];
	};
	var avg = sum/grades.length;
	return Math.round(avg);
}

var scores = [90, 98, 89, 100, 100, 86, 94];
console.log(average(scores));
var scores2 = [40, 65, 77, 82, 80, 54, 73, 63, 95, 49];
console.log(average(scores2));
