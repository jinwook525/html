//object 생성
let obj ={
  apple:'🍎',
  carrot:'🥕',
  banana:'🍌' , 
}

//object 접근
console.log(obj['apple']);
console.log(obj.apple);

//object 순회
for(let k in obj){
  console.log(`${k}=> ${obj[k]}`);
}

for(let k of Object.keys(obj)){
  console.log(`${k}=> ${obj[k]}`);
}

for(let k of Object.values(obj)){
  console.log(`${k}`);
}
for(let [k, item] of Object.entries(obj)){
  console.log(`${k}=> ${item}`);
}

// 자료 추가 및 삭제
obj['수박']= '🍉';
console.log(obj);

obj['수박']='🍈'
console.log(obj);

delete obj['수박'];
console.log(obj);

//object 병합
obj2= {orange: '🍊'}
obj = {...obj , ...obj2};
console.log(obj);