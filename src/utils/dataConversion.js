export  function tenThousand(num) {
	let num1
	if(num < 100000) {
		num1 = num
	}else if(num > 100000 && num < 100000000) {
		num1 = Math.floor(num/10000) + '万'
	}else if(num > 100000000) {
		num1 = Math.floor(num/100000000) + '亿'
	}
	return num1
}



export  function timestampToTime(timestamp) {
	// var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
	var date = new Date(timestamp);
	var Y = date.getFullYear() + '-';
	var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
	var D = date.getDate() + ' ';
	// var h = date.getHours() + ':';
	// var m = date.getMinutes() + ':';
	// var s = date.getSeconds();
	// return Y+M+D+h+m+s;
	return Y+M+D;
}

export function conversionTime(num) {
	var minute = num/60;
	var second = num%60;
	if(minute<10){
		minute = '0'+minute
	}
	if(second<10){
		second = '0'+second
	}
	return minute + ':' + second;
}


