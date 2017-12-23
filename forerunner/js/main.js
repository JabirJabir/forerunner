var fdb = new ForerunnerDB();
var db = fdb.db("school");
var studentCollection = db.collection("students");

$(document).ready(function() {
	studentCollection.load(dataLoad);
	$("#table-tb").on("click",".dataID",colIDClick);
	$("#table-tb").on("click",".btn-danger",btnDeleteClick);
	$("#btnInsertData").on("click",Alert);
	$("#table-tb").on("click",".btn-warning",btnEditClick);
	$("#saveChanges").on("click",saveUpdateData);
	$("#btnLimitSearch").on("click",limitSearch);
	$("#btnCertainSearch").on("click",certainSearch);
	
})

function dataLoad() {
	console.log(studentCollection.find());
	updateTable(studentCollection.find());
}

function cb() {
	createData()
}
function dataSave() {
	console.log("dataSave");
	updateTable(studentCollection.find());
}

function createData() {
	for(i = 0;i < 20;i++){
		studentCollection.insert({
		name : String.fromCharCode(Math.floor((Math.random()*26) + 65),
			Math.floor((Math.random()*26)+97),
			Math.floor((Math.random()*26) + 97)),
		age : Math.floor((Math.random()*4) + 8)
		});
	}
	studentCollection.save(dataSave);
}

function updateTable(datas) {
	$("#table-tb").remove("tr")
	for (var i = 0; i < datas.length; i++) {
		$("#table-tb").append(
			"<tr class = 'col'>" +
			"<td>" + (i+1) + "</td>"+
			"<td class = 'dataID'>" + datas[i]._id + "</td>"+
			"<td>" + datas[i].name + "</td>"+
			"<td><button class = 'btn btn-warning'>修改</button>" + "	" +
			"<button class = 'btn btn-danger'>刪除</button></td>" +
			"</tr>"
		);
	}
}

function colIDClick() {
	$("#modal-body").find("p").remove(); 
	var ID = $(this).text();
	var query = {
	    _id: ID
	};
	var studentData = studentCollection.find(query);
	$("#modal-body").append(
		"<p>ID : " + studentData[0]._id + "</p>" +
		"<p>Name : " + studentData[0].name + "</p>" +
		"<p>Age : " + studentData[0].age + "</p>"
		);
	$("#modal").modal("show");
}

function Alert() {
	var name = $("#name").val();
	var age = $("#age").val();
	if(name != "undefind" || age !="undefind"){
		studentCollection.insert({
			name : name,
			age : age
		});
	}
	studentCollection.save(dataSave);
	// alert("Hello," + age + "歲的" + name);
	$("#name").val("名字");
	$("#age").val("年齡");
}	

function btnDeleteClick(){
	if (confirm("確定要刪除嗎?") == false) {
		return;
	}
	var ID = $(this).closest("tr").find(".dataID").text();
	studentCollection.remove({
	    _id: ID
	});
	studentCollection.save(dataSave);
}

function btnEditClick() {
	var ID = $(this).closest("tr").find(".dataID").text();
	var query = {
	    _id: ID
	};
	var studentData = studentCollection.find(query);
	$("#modalAge").val(studentData[0].age);
	$("#modalName").val(studentData[0].name);
	$("#editModal").attr("studentID",ID);
	$("#editModal").modal("show");
}

function saveUpdateData() {
	var ID = $("#editModal").attr("studentID");
	var name = $("#modalName").val();
	var age = $("#modalAge").val();
	var newData = {
	    name: name,
	    age: age
	};
	studentCollection.updateById(ID,newData);
	$("#editModal").modal("hide");
	studentCollection.save(dataSave);
}

function limitSearch(){
	console.log($("#edtGT").val());
	console.log($("#edtLT").val());
	var GT = $("#edtGT").val();
	var LT = $("#edtLT").val();
	var search = studentCollection.find({
    	age : {
        	"$gt" : GT,
        	"$lt" : LT
    	}
	});
	updateTable(search);
	$("#edtLT").val("");
	$("#edtGT").val("");
}

function certainSearch(){
	var checkbox = $(".cbAge");
	var checked = [];
	for(var i = 0;i < checkbox.length;i++){
		if(checkbox[i].checked){
			checked.push(checkbox[i].value*1);
		}
	}
	console.log(checked.length);
	var query = {
    	age:{
        	$in:checked
    	}
	}
	var search = studentCollection.find(query);
	console.log(search);
	updateTable(search);
}
