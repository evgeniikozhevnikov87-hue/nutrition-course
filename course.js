(function(){
  var M=window.M||{};
  var cards=M.cards||[], i=0, card=document.getElementById('card');
  function showCard(){document.getElementById('cardQ').textContent=cards[i][0];document.getElementById('cardA').textContent=cards[i][1];card.setAttribute('aria-pressed','false');document.getElementById('cardPos').textContent=(i+1)+' / '+cards.length;}
  if(card&&cards.length){
    card.addEventListener('click',function(){card.setAttribute('aria-pressed',card.getAttribute('aria-pressed')==='true'?'false':'true');});
    document.getElementById('nextCard').addEventListener('click',function(){i=(i+1)%cards.length;showCard();});
    document.getElementById('prevCard').addEventListener('click',function(){i=(i-1+cards.length)%cards.length;showCard();});
    showCard();
  }
  var qs=M.quiz||[], box=document.getElementById('quizBox'), answered=0, correct=0;
  function upd(){var s=document.getElementById('score');if(s)s.textContent=answered<qs.length?('Ответов: '+answered+' из '+qs.length):('Результат: '+correct+' из '+qs.length+(correct>=qs.length-1?' — отлично':' — перечитайте шпаргалку'));}
  function render(){
    if(!box)return;box.innerHTML='';answered=0;correct=0;upd();
    qs.forEach(function(item,qi){
      var w=document.createElement('div');w.className='screen q';
      var h=document.createElement('h3');h.textContent=(qi+1)+'. '+item.q;w.appendChild(h);
      var opts=document.createElement('div');opts.className='opts';
      var ex=document.createElement('p');ex.className='expl';ex.hidden=true;
      item.o.forEach(function(t,oi){
        var b=document.createElement('button');b.type='button';b.className='opt';b.id='q'+qi+'o'+oi;b.textContent=t;
        b.addEventListener('click',function(){
          var all=opts.querySelectorAll('.opt');all.forEach(function(x){x.disabled=true;});
          all[item.a].classList.add('right');var ok=oi===item.a;if(!ok)b.classList.add('wrong');
          answered++;if(ok)correct++;upd();
          ex.innerHTML='';var v=document.createElement('b');v.className=ok?'ok':'no';v.textContent=ok?'Верно. ':'Не совсем. ';ex.appendChild(v);ex.appendChild(document.createTextNode(item.e));ex.hidden=false;
        });
        opts.appendChild(b);
      });
      w.appendChild(opts);w.appendChild(ex);box.appendChild(w);
    });
  }
  var r=document.getElementById('resetQuiz');if(r)r.addEventListener('click',render);
  render();
  document.querySelectorAll('.check input[type=checkbox]').forEach(function(el){
    var k=(M.key||'m')+'-'+el.id;
    try{el.checked=localStorage.getItem(k)==='1';}catch(e){}
    el.addEventListener('change',function(){try{localStorage.setItem(k,el.checked?'1':'0');}catch(e){}});
  });
})();
