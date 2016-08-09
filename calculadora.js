can.Component.extend({
	tag: "boton",
	template: can.stache("<button id={{value}} class='btn btn-sm btn-info' style='width:46px;'>{{value}}</button>"),
	viewModel: {
		agregarCalculo: function (paso) {
			var cadena = $("#display").val();
			cadena = cadena === 0 ? paso : cadena + paso;
			$("#display").val(cadena);
		},
		procesarCalculo: function () {
			var operacion = $("#display").val();
			if (operacion.indexOf("%") !== -1) {
				var terminos = operacion.split('%');
				$("#display").val(( parseFloat(terminos[0]) * parseFloat(terminos[1]) ) / 100);
			}	else {
				$("#display").val(eval(operacion));
			}
		}
	},
	events: {
		click: function () {
			switch (this.element[0].innerText) {
				case "C":
					$("#display").val('');
					break;
				case "=":
					this.viewModel.procesarCalculo();
					break;
				case "◀":
					if ($("#display").val().length > 0)
						$("#display").val($("#display").val().substring(0, $("#display").val().length-1));
					break;
				case "℗":
					$("#display").val("-----> OFF <-----   ");
					setTimeout(function (){
						$("body").hide();
					}, 2000);
					break;
				default:
					this.viewModel.agregarCalculo(this.element[0].innerText);
			}
		}
	}
});

can.Component.extend({
	tag: "display",
	template: can.stache("<input type='text' id='display' disabled='disabled' style='margin-bottom:20px;margin-top:10px;text-align: right;font-family:Courier;width:90%' value=''/>")
});

var tags = "C/*-987+654=3210%.◀℗",
		data = {botones: ''};
data.botones = tags.split('').map(function (item) {
	return {value: item};
});

$("#app").html(can.view("tpl-btn", data));