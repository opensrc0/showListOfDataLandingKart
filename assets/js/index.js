$(document).ready(function(){
	var modal = document.getElementById('myModal');
	document.getElementById('lists').innerHTML = 'Loading Data...Please wait';
	$.ajax({
		url : 'https://ghibliapi.herokuapp.com/films/',
		method : 'GET',
		success : function (data) {
			var list = '';
			data.forEach(function(value,index){
				list += templete(value); 
			});
			document.getElementById('lists').innerHTML = list;
			$('.list').on('click',function(){
				modal.style.display = "block";
				$('#filmData').html('Loading...Please wait');
				var id = encodeURIComponent($(this).attr('data-id'));
				$.ajax({
					url : `https://ghibliapi.herokuapp.com/films/${id}`,
					method : 'GET',
					success : function (data) {
						$('#filmData').html(templete(data));
					}
				});
			})

			$('.close').on('click', function() {
			    modal.style.display = "none";
			});

			window.onclick = function(event) {
			    if (event.target == modal) {
			        modal.style.display = "none";
			    }
			}

			window.onkeyup = function(event) {
			    if (event.keyCode == 27) {
			        modal.style.display = "none";
			    }
			}
		},
		error : function (err) {
			document.getElementById('lists').innerHTML = 'Server Down...loading Error';
		}
	})
	
	function templete(value) {
		return `
			<div class="list" data-id="${value.id}">
				<b>Movie</b> :- ${value.title}<br>
				<b>Director</b> :- ${value.director}<br>
				<b>Producer</b> :- ${value.producer}<br>
				<b>Release Date</b> :- ${value.release_date}<br>
				<b>Rt Score</b> :- ${value.rt_score}<br>
				<b>Description</b> :- ${value.description}<br>
			</div>`;
	}
});
