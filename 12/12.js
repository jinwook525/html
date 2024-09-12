// 오픈 API 데이터 가져오기
const getData = (setDt, ul, gubun)=> {
  console.log(setDt)
  const testAPI = '82ca741a2844c5c180a208137bb92bd7';
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
      `<li class='mvli'>
        <span class='rank'>${item.rank}</span>
        <span class='movieNm'>${item.movieNm}</span>
        <span class='openDt'> ${item.openDt}</span>
        <span class='rankInten'> 
        ${item.rankInten > 0 ? 
          '<span class = "spRed">▲</span>' : item.rankInten < 0 ? 
              '<span class ="spBlue">▼</span>' : '-'}
        ${item.rankInten !=0 ? Math.abs(item.rankInten) : ''}
        </span>
      </li>`
      
    );
    ul.innerHTML = tm.join('');

    console.log(dailyBoxOfficeList)


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

//Dom 생성 후
document.addEventListener('DOMContentLoaded',  ()=>{
  //요소 가져오기
  const dt= document.querySelector('#dt');
  const ul= document.querySelector('.sec > ul')
  const sel1 = document.querySelector('#sel1');
  let yesterday= getYesterday();
  //어제 날짜 구하기
    console.log('yesterday: ', yesterday);
    
  //date 요소에 최대값 결정
  dt.max = yesterday;
  // date  기본값
  dt.value = yesterday;

  //기본 첫페이지 보이기
  getData(dt.value.replaceAll('-',''), ul, sel1.value);
  //데이터 가져오기
  dt.addEventListener('change',()=>{
    getData(dt.value.replaceAll('-',''), ul, sel1.value);

  
  })
  sel1.addEventListener('change', ()=> {
    getData(dt.value.replaceAll('-',''), ul, sel1.value);

  })
})