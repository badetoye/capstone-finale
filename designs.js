

// When size is submitted by the user, call makeGrid() function
$("input[type='submit']").on('click',function(event){
	event.preventDefault();
	const heigth = $('#inputHeight').val();
	const width = $('#inputWeight').val();

	$('#pixelCanvas').empty();//select the table and empty it's child elements before makeGrid() is called.
	makeGrid(heigth,width);

})
//Implement the makeGrid() function and create a grid of squares
function makeGrid(n,m) {

	for(let i=1; i<=n; i++) {
		//create a row
		$('#pixelCanvas').append('<tr id=table' + i + '></tr>');

		for(let j=1; j<=m; j++) {
			//add a td or cell to row
			$('#table' + i).append('<td></td>');
		}
	}

	//add color to cell when clicked
	$('td').click(function addColor() {
		let color = $('#colorPicker').val();

		if($(this).attr('style')) {
			$(this).removeAttr('style')
		} else {
			$(this).attr('style', 'background-color:' + color);

		}
	})
}
