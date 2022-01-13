// var nama = prompt("Masukkan nama kamu :");
// alert('Selamat Datang ' + nama);

const button = document.getElementById("button");

const puisi = document.querySelector(".puisi");

button.addEventListener("click", function () {
  puisi.classList.toggle("muncul");
  puisi.classList.remove("hilang");
});

const tutup = document.getElementById("tutup");
tutup.addEventListener("click", function () {
  puisi.classList.toggle("hilang");
  puisi.classList.remove("muncul");
});

$(window).scroll(function () {
  var wsScroll = $(this).scrollTop();

  $(".dialog .weiying").each(function (i) {
    if (wsScroll > $(".dialog .weiying").eq(i).offset().top - 310) {
      $(".dialog .weiying").eq(i).addClass("nah");
      $(".dialog .weiying").eq(i).removeClass("remove");
    } 
    // else {
    //   $(".dialog .weiying").eq(i).addClass("remove");
    //   $("dialog .weiying").eq(i).removeClass("nah");
    // }
  });

  $(".dialog .lanzhan").each(function (i) {
    if (wsScroll > $(".dialog .lanzhan").eq(i).offset().top - 310) {
      $(".dialog .lanzhan").eq(i).addClass("nih");
      $(".dialog .lanzhan").eq(i).removeClass("remove");
    } 
    // else {
    //   $(".dialog .lanzhan").eq(i).addClass("remove");
    //   $(".dialog .lanzhan").eq(i).removeClass("nih");
    // }
  });
});
