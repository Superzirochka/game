function userGame(userName, time, mark) {
  this.userName = userName;
  this.time = time;
  this.mark = mark;
}
let arrUsers = [];
let gamer1 = new userGame("Guest", "0:5:32", "32");
let gamer2 = new userGame("Guest1", "0:7:32", "31");
arrUsers.push(gamer1);
arrUsers.push(gamer2);

let imgArr = [];
let n = 33; //6
// заполняем массив картинками
for (let i = 1; i < n; i++) {
  imgArr.push(i);
}

let userName1 = "no name";
let mark = 0;
let countClick = 0; //Кол-во кликов
let seconds = 0;
let min = 0;
let hours = 0;
let times = " - - : - - : - - ";

$("#timer").text(times);
let timeId = setInterval(function() {
  times = timer(times);
  $("#timer").text(times);
}, 1000);

function timer(times) {
  if (seconds === 59) {
    seconds = 0;
    min++;
    if (min === 59) {
      min = 0;
      hours++;
    }
  } else {
    seconds++;
  }
  return (times = hours + ":" + min + ":" + seconds);
}

let game_array = imgArr.concat(imgArr); //дублируем картинки в массиве
game_array.sort(function() {
  // перемешиваем массив с картинками
  return Math.random() - 0.5;
});

//создаем ячейки
for (let i = 0; i < n * 2 - 2; i++) {
  let div = $("<div></div>");
  $("#pole").append(div);
}

// заполняем картинки

//let img_root = "file:///D:/dzStep/jsJQuery/game/img/";
let img_root = "../game/img/";

$("#pole div").each(function() {
  $(this).attr({
    class: "num" + game_array[countClick],
    "data-index": +game_array[countClick],
    "data-state": "0"
  });

  countClick++;
});

let last_img;
let click_flag = 1;
countClick = 0; //Кол-во кликов

//Делаем задержку
function hide_img() {
  $("#pole div").each(function() {
    if ($(this).data("state") == 1) {
      $(this)
        .data("state", 0)
        .attr("data-state", 0)
        .css("background-image", "url(" + img_root + "bee.jpg)");
    }
  });
  click_flag = 1;
}

//добавляем игрока в таблицу рекордов
// function addUser() {
//   let timers = hours + ":" + min + ":" + seconds;
//   console.log(timers);
//   console.log(userName1);
//   let newUser = new userGame(userName1, timers, mark);
//   arrUsers.push(newUser);

//   let table = "<table><caption>Рейтинг</caption>";
//   table +=
//     "<tr><td>Имя игрока</td><td>Колличество баллов</td><td>Время</td></tr>";
//   for (let i = 0; i < arrUsers.length; i++) {
//     table +=
//       "<tr><td>" +
//       arrUsers[i].userName +
//       "</td><td>" +
//       arrUsers[i].mark +
//       "</td><td>" +
//       arrUsers[i].times +
//       "</td></tr>";
//   }
//   table += "</table>";
//   $("#info").append($("<div></div>").append(table));
// }

//если все поля открыты
function WinCart() {
  if ($("#pole").children().length == $(".win").length) {
    clearInterval(timeId);
    $("#info").removeClass("infoGamer");
    $("#pole").remove();
    $("#pole").addClass("infoGamer");
    $("#btn").on("click", function() {
      let userName1 = $("#namesUser").val();
      let timers = hours + ":" + min + ":" + seconds;
      timers = String(timers);
      console.log(timers);
      console.log(userName1);
      let newUser = new userGame(userName1, timers, mark);
      arrUsers.push(newUser);

      let table = "<table><caption>Рейтинг</caption>";
      table +=
        "<tr><td>Имя игрока</td><td>Колличество баллов</td><td>Время</td></tr>";
      for (let i = 0; i < arrUsers.length; i++) {
        table +=
          "<tr><td>" +
          arrUsers[i].userName +
          "</td><td>" +
          arrUsers[i].mark +
          "</td><td>" +
          arrUsers[i].time +
          "</td></tr>";
      }
      table += "</table>";
      $("#info").append($("<div></div>").append(table));
    });
  } else {
    return;
  }
}

//Клик на игровом поле
$("#pole div").on("click", function() {
  if ($(this).data("state") == 0 && click_flag == 1) {
    //Если ячейка закрыта
    if (countClick == 0) {
      //Если первый клик по закрытому полю
      countClick++;
      last_img = $(this).attr("data-index");
      $(this)
        .data("state", 1)
        .attr("data-state", 1)
        .css("backgroundImage", "url(" + img_root + last_img + ".jpg");
    } else {
      //Если картинки совпадают
      if (last_img == $(this).attr("data-index")) {
        $(".num" + last_img)
          .addClass("win")
          .data("state", 2)
          .attr("data-state", 2)
          .css("backgroundImage", "url(" + img_root + last_img + ".jpg)");
        mark++;
        $("#mark").text(mark);
      } else {
        $(this)
          .data("state", 1)
          .attr("data-state", 1)
          .css(
            "backgroundImage",
            "url(../img/" + img_root + $(this).attr("data-index") + ".jpg)"
          );
        click_flag = 0;

        setTimeout(hide_img, 1000);
      }
      countClick = 0;
    }
  }

  WinCart();
});
