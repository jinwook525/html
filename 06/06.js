document.addEventListener('DOMContentLoaded',()=>{
  const img = document.querySelectorAll('.dice > img');
  //이미지 가져오기
  const bts = document.querySelectorAll('button');
  //버튼 가져오기
  const msg = document.querySelector("#result")
  //결과 가져오기
  
  for (let bt of bts)
    bt.addEventListener("click", ()=> {
  //버튼 클릭
  //컴퓨터 랜덤수
    let comN= Math.floor(Math.random()*6)+1;  

  //사용자 선택수
    console.log(bt.textContent.charAt(2));
    let userN = parseInt(bt.textContent.charAt(2));

    img[0].setAttribute('src',`../img/${comN}.png`);
    img[0].setAttribute('alt',`${comN}`);

    
    img[1].setAttribute('src',`../img/${userN}.png`);
    img[1].setAttribute('alt',`${userN}`);
      //결과 출력
    if (comN === userN) {
      msg.innerHTML = "맞음"
      } else {
      msg.textContent = "틀림"
      }

    });
  });

