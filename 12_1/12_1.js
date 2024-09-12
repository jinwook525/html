//전역변수
const testAPI = '82ca741a2844c5c180a208137bb92bd7';

//상세정보 가져오기
const getDetail = (movieCd) => {
  const mvinfo = document.querySelector('#mvinfo'); // footer 요소 가져오기 ;
  let url = `https://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json?`; 
  url = `${url}&key=${testAPI}&movieCd=${movieCd}`;

  console.log(url);
  fetch(url)
    .then(resp => resp.json())
    .then(data=>{
      let movieinfo = data.movieInfoResult.movieInfo ;
      console.log(movieinfo)

      let actors = data.movieInfoResult.movieInfo.actors;
      let ac= actors.map(item => 
        `
        <span class='peopleNm'>${item.peopleNm}</span>
        
         `
      )
      // let mi = movieinfo.map(item => 
      // `<li class='mvli'>
      //   <span class='movieNmEn'>${item.movieNmEn}</span>
      //   <span class='showTm'>${item.showTm}</span>
      //   `
      // )
      mvinfo.innerHTML = ac.join(',')

    })
    .catch(err => console.error(err))

    ;
}


// 오픈 API 데이터 가져오기
const getData = (setDt, ul, gubun)=> {
  console.log(setDt)
  let url = `https://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?`;
  url = `${url}key=${testAPI}&targetDt=${setDt}`
  if (gubun != 'T') { 
    url= `${url}&repNationCd=${gubun}` ;
  }
  console.log(url)

  fetch(url)
   .then(resp => resp.json())
   .then(data => {
    let dailyBoxOfficeList = data.boxOfficeResult.dailyBoxOfficeList ;
    
    let tm = dailyBoxOfficeList.map(item => 
      `<a href="#" onclick="getDetail(${item.movieCd});">
      <li class='mvli'>
        <span class='rank'>${item.rank}</span>
        <span class='movieNm'>${item.movieNm}</span>
        <span class='openDt'> ${item.openDt}</span>
        <span class='rankInten'> 
        ${item.rankInten > 0 ? 
          '<span class = "spRed">▲</span>' : item.rankInten < 0 ? 
              '<span class ="spBlue">▼</span>' : '-'}
        ${item.rankInten !=0 ? Math.abs(item.rankInten) : ''}
        </span>
      </li>
      </a>`
      
    );ul.innerHTML=tm.join(''); 

   })
  .catch(err => console.error(err)); 
   
}

//어제 날짜 구하기
const getYesterday = ()=> {
  const yesterday = new Date(); 
  //setter 을 이용하여 const 변경하기
  yesterday.setDate(yesterday.getDate()-1)
  
  //yyyy-mm-dd
const year = yesterday.getFullYear();
let month = yesterday.getMonth()+1;
let day= yesterday.getDate();

//월 2자리
month = month < 10 ? "0"+month : month ;
day = day < 10 ? "0"+ day : day ;

//month = `0${month}`.slice(-2);
//month= `${month}`.padStart(2,0);
//console.log('month : ', month)

  //const dateFormat = `${year}-${month}-${day}`;
  //console.log(dateFormat);
  return `${year}-${month}-${day}`; ;
 }

//radio 값 가져오기
const getGubun = ()=>{
  /* const r1 = document.querySelector("#r1");
  const r2 = document.querySelector("#r2");
  const r3 = document.querySelector("#r3");

  console.log("r1= ", r1.checked);
  console.log("r2= ", r2.checked);
  console.log("r3= ", r3.checked);

  if (r1.checked) return r1.value;
  else if (r2.checke) return r2.value;
  else if (r3.checke) return r3.value; */
  // radio버튼의 클릭된 것만 가져오기
  const gubun = document.querySelector('input[name=rad1]:checked') ;  
  console.log('gubun = ', gubun.value) ;
  return gubun.value ;
}

//Dom 생성 후
document.addEventListener('DOMContentLoaded',  ()=>{
  //요소 가져오기
  const dt= document.querySelector('#dt');
  const ul= document.querySelector('.sec > ul');
 // const fieldset = document.querySelector('fieldset') ;
  // const radios = document.querySelectorAll('input[type=radio]') ; 
  // const radios = document.getElementsByName('mvGubun');
  const radios = document.querySelectorAll('input[name=rad1]') ;

  let yesterday= getYesterday();
  //어제 날짜 구하기
    console.log('yesterday: ', yesterday);
    
  //date 요소에 최대값 결정
  dt.max = yesterday;
  // date  기본값
  dt.value = yesterday;

  //기본 첫페이지 보이기
  getData(dt.value.replaceAll('-',''), ul, getGubun());
  //데이터 가져오기
  dt.addEventListener('change',()=>{
    getData(dt.value.replaceAll('-',''), ul, getGubun());
  });

 // fieldset.addEventListener('click', ()=> {
  //   getData(dt.value.replaceAll('-',''), ul, getGubun());
  // });
  
  for(let radio of radios) {
    radio.addEventListener('click' , ()=>{
      if (radio.checked) getData(dt.value.replaceAll('-',''), ul, radio.value);
    })
  }
})