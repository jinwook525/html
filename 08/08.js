document.addEventListener('DOMContentLoaded', () => {
  const img = document.querySelector('#updown');
  const bt1 = document.querySelector('#bt1');
  const txt1 = document.querySelector('#txt1');

  let N;
  let flag = false;


  bt1.addEventListener("click", (e) => {
    e.preventDefault();
    //if (flag == false) {
    if (!flag) {
      N = Math.floor(Math.random() * 100) + 1;
      console.log(N)
      flag = true;

      if (txt1.style.display == "none") {
        img.setAttribute('src','../img/what.png')
        txt1.style.display = "inline";
        txt1.value = "";
        txt1.focus();
        bt1.innerHTML = "확인";
        return;
      }
    }

    if (parseInt(txt1.value) > N) {
      img.setAttribute('src', '../img/down.png')
    } else if (parseInt(txt1.value) < N) {
      img.setAttribute('src', '../img/up.png')
    } else {
      img.setAttribute('src', '../img/good.png')
      txt1.style.display = 'none';
      bt1.innerHTML = "번호를 다시 생성하세요";
      flag = false;
    }


  });
});

